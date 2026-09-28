#!/usr/bin/env bash
set -euo pipefail

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
unset NODE_OPTIONS NODE_PATH
umask 077

installed_promoter=/usr/local/sbin/isthereconsensus-promote-release
installed_verifier=/usr/local/libexec/isthereconsensus/verify-runtime-artifact.mjs
release_root=/srv/isthereconsensus.org/releases
artifact_release_root=/srv/isthereconsensus.org/artifact-releases
current_link=/srv/isthereconsensus.org/current
deploy_lock=/srv/isthereconsensus.org/.promotion.lock
api_service=isthereconsensus-api.service
web_service=isthereconsensus-web.service
api_ready_url=http://127.0.0.1:3011/readyz
web_ready_url=http://127.0.0.1:3000/readyz
site_health_url=https://isthereconsensus.org/deployment.json
site_resolve=isthereconsensus.org:443:127.0.0.1

if [[ $# -ne 5 ]]; then
	echo "Usage: isthereconsensus-promote-release <prepared-release> <candidate-commit> <candidate-manifest-sha256> <current-commit-or-none> <current-manifest-sha256-or-none>" >&2
	exit 2
fi
if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
	echo "Run the installed promotion helper with root privileges." >&2
	exit 1
fi

expected_commit="${2,,}"
expected_manifest_digest="${3,,}"
expected_current_commit="${4,,}"
expected_current_manifest_digest="${5,,}"
if [[ ! "$expected_commit" =~ ^[a-f0-9]{40}$ ]]; then
	echo "Expected commit must be a full lowercase 40-character Git revision." >&2
	exit 2
fi
if [[ ! "$expected_manifest_digest" =~ ^[a-f0-9]{64}$ ]]; then
	echo "Expected runtime-manifest digest must be a full lowercase SHA-256 value." >&2
	exit 2
fi
if [[ "$expected_current_commit" == none && "$expected_current_manifest_digest" == none ]]; then
	:
elif [[ ! "$expected_current_commit" =~ ^[a-f0-9]{40}$ \
	|| ! "$expected_current_manifest_digest" =~ ^[a-f0-9]{64}$ ]]; then
	echo "Current release identity must be 'none none' or a full commit plus manifest SHA-256." >&2
	exit 2
fi

require_root_control_file() {
	local path="$1"
	local expected_mode="$2"
	local label="$3"
	if [[ ! -f "$path" || -L "$path" || "$(stat -c '%u:%g:%a' -- "$path")" != "0:0:$expected_mode" ]]; then
		echo "$label must be a root:root mode $expected_mode regular file." >&2
		exit 1
	fi
}

script_real="$(readlink -f -- "$0")"
if [[ "$script_real" != "$installed_promoter" ]]; then
	echo "Refusing to execute promotion from a release checkout. Install and invoke $installed_promoter." >&2
	exit 1
fi
require_root_control_file "$installed_promoter" 755 "The installed promoter"
require_root_control_file "$installed_verifier" 644 "The installed runtime verifier"
if [[ ! -x /usr/bin/node || "$(/usr/bin/node --version)" != "v24.18.1" ]]; then
	echo "Promotion requires Node 24.18.1 at /usr/bin/node." >&2
	exit 1
fi
if [[ ! -f "$deploy_lock" || -L "$deploy_lock" || "$(stat -c '%u:%g:%a' -- "$deploy_lock")" != "0:0:600" ]]; then
	echo "The promotion lock must be a root:root mode 0600 regular file." >&2
	exit 1
fi
exec 9<>"$deploy_lock"
if ! flock -n 9; then
	echo "Another Is There Consensus promotion is active." >&2
	exit 1
fi

release_root_real="$(realpath -e -- "$release_root")"
artifact_release_root_real="$(realpath -e -- "$artifact_release_root")"
if [[ ! -d "$artifact_release_root_real" || -L "$artifact_release_root" \
	|| "$(stat -c '%u:%g:%a' -- "$artifact_release_root_real")" != "0:0:755" ]]; then
	echo "The immutable artifact-release root must be a root:root mode 0755 real directory." >&2
	exit 1
fi

candidate="$(realpath -e -- "$1")"
case "$candidate/" in
	"$release_root_real/"*) ;;
	*) echo "Candidate must resolve beneath $release_root_real: $candidate" >&2; exit 1 ;;
esac
if [[ "$candidate" == "$release_root_real" ]]; then
	echo "Candidate must be a child of the staging release directory." >&2
	exit 1
fi
candidate_runtime="$(realpath -e -- "$candidate/.runtime-artifact")"
case "$candidate_runtime/" in
	"$candidate/.runtime-artifact/"*) ;;
	*) echo "Runtime artifact must resolve beneath the candidate checkout." >&2; exit 1 ;;
esac
candidate_marker="$candidate/.isthereconsensus-release-prepared.json"
if [[ ! -f "$candidate_marker" || -L "$candidate_marker" ]]; then
	echo "Prepared release is missing its regular source-identity marker." >&2
	exit 1
fi

protected_marker="$(mktemp "$artifact_release_root_real/.candidate-marker.XXXXXXXX")"
active_staging=""
next_link=""
response_file=""
# shellcheck disable=SC2329 # Invoked by the EXIT trap.
cleanup() {
	if [[ -n "${next_link:-}" && -L "$next_link" ]]; then unlink -- "$next_link"; fi
	case "${active_staging:-}/" in
		"$artifact_release_root_real/".staging-*/)
			if [[ -d "$active_staging" ]]; then rm -rf -- "$active_staging"; fi
			;;
	esac
	case "${protected_marker:-}" in
		"$artifact_release_root_real/".candidate-marker.*) rm -f -- "$protected_marker" ;;
	esac
	if [[ -n "${response_file:-}" ]]; then rm -f -- "$response_file"; fi
}
trap cleanup EXIT

install -o root -g root -m 0600 -- "$candidate_marker" "$protected_marker"
if ! /usr/bin/node -e '
const fs = require("node:fs");
const marker = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const expected = process.argv[2];
if (marker?.ok !== true || marker?.service !== "front-end" || marker?.runtime !== "nuxt-ssr"
    || typeof marker?.commit !== "string" || !/^[a-f0-9]{40}$/.test(marker.commit)
    || marker.commit !== expected) process.exit(1);
' "$protected_marker" "$expected_commit"; then
	echo "Prepared source identity does not match the reviewed candidate commit." >&2
	exit 1
fi

assert_trusted_tree() {
	local tree="$1"
	local label="$2"
	if [[ ! -d "$tree" || -L "$tree" ]]; then
		echo "$label is not a real directory." >&2
		return 1
	fi
	if [[ -n "$(find "$tree" -xdev \( ! -user root -o ! -group root -o \( ! -type l -perm /022 \) -o \( ! -type l -perm /7000 \) \) -print -quit)" ]]; then
		echo "$label is not entirely root-owned, non-set-ID, and protected from group/world writes." >&2
		return 1
	fi
}

copy_runtime_artifact() {
	local source="$1"
	local destination="$2"
	install -o root -g root -d -m 0700 -- "$destination"
	cp -R --no-dereference --preserve=mode,links,timestamps \
		--no-preserve=ownership,xattr,context -- "$source/." "$destination/"
	chown -hR root:root -- "$destination"
	assert_trusted_tree "$destination" "Copied runtime artifact"
}

manifest_commit() {
	/usr/bin/node -e '
const fs = require("node:fs");
const manifest = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
if (!/^[a-f0-9]{40}$/.test(manifest?.source?.commit || "")) process.exit(1);
process.stdout.write(manifest.source.commit);
' "$1/.runtime-manifest.json"
}

verify_runtime_artifact() {
	local tree="$1"
	local commit="$2"
	env -i PATH="$PATH" RUNTIME_ARTIFACT_EXPECT_COMMIT="$commit" RUNTIME_ARTIFACT_REQUIRE_CLEAN=true \
		/usr/bin/node "$installed_verifier" "$tree"
}

sealed_result=""
seal_runtime_artifact() {
	local source="$1"
	local required_commit="${2:-}"
	local required_manifest_digest="${3:-}"
	local label="${required_commit:0:12}"
	if [[ -z "$label" ]]; then label=legacy; fi
	active_staging="$(mktemp -d "$artifact_release_root_real/.staging-$label.XXXXXXXX")"
	copy_runtime_artifact "$source" "$active_staging"
	local manifest_digest
	manifest_digest="$(sha256sum -- "$active_staging/.runtime-manifest.json" | awk '{print $1}')"
	if [[ -n "$required_manifest_digest" && "$manifest_digest" != "$required_manifest_digest" ]]; then
		echo "Copied runtime manifest does not match the independently reviewed SHA-256." >&2
		exit 1
	fi
	local copied_commit
	copied_commit="$(manifest_commit "$active_staging")"
	if [[ -n "$required_commit" && "$copied_commit" != "$required_commit" ]]; then
		echo "Copied runtime artifact identifies $copied_commit instead of $required_commit." >&2
		exit 1
	fi
	verify_runtime_artifact "$active_staging" "$copied_commit"
	local final_target
	final_target="$artifact_release_root_real/$copied_commit-${manifest_digest:0:16}"
	if [[ -e "$final_target" ]]; then
		assert_trusted_tree "$final_target" "Existing immutable runtime artifact"
		verify_runtime_artifact "$final_target" "$copied_commit"
		if ! cmp -s -- "$active_staging/.runtime-manifest.json" "$final_target/.runtime-manifest.json"; then
			echo "Existing immutable release has different contents for the same identity." >&2
			exit 1
		fi
		rm -rf -- "$active_staging"
		active_staging=""
	else
		chmod 0755 -- "$active_staging"
		mv -- "$active_staging" "$final_target"
		active_staging=""
	fi
	assert_trusted_tree "$final_target" "Sealed runtime artifact"
	sealed_result="$final_target"
}

seal_runtime_artifact "$candidate_runtime" "$expected_commit" "$expected_manifest_digest"
candidate_target="$sealed_result"
if ! cmp -s -- "$candidate_target/front-end/.output/public/deployment.json" "$protected_marker"; then
	echo "Sealed runtime metadata does not match the protected prepared identity." >&2
	exit 1
fi

if [[ -e "$current_link" && ! -L "$current_link" ]]; then
	echo "Refusing to replace non-symlink deployment path: $current_link" >&2
	exit 1
fi
initial_link=""
initial_target=""
previous_target=""
if [[ -L "$current_link" ]]; then
	if [[ "$expected_current_commit" == none ]]; then
		echo "An existing current release requires its independently reviewed commit and manifest SHA-256." >&2
		exit 1
	fi
	initial_link="$(readlink -- "$current_link")"
	initial_target="$(readlink -f -- "$current_link" 2>/dev/null || true)"
	if [[ -z "$initial_target" || ! -d "$initial_target" || -L "$initial_target" ]]; then
		echo "The current release symlink is dangling or unsafe." >&2
		exit 1
	fi
	case "$initial_target/" in
		"$artifact_release_root_real/"*)
			assert_trusted_tree "$initial_target" "Current rollback release"
			previous_commit="$(manifest_commit "$initial_target")"
			if [[ "$previous_commit" != "$expected_current_commit" \
				|| "$(sha256sum -- "$initial_target/.runtime-manifest.json" | awk '{print $1}')" != "$expected_current_manifest_digest" ]]; then
				echo "Current immutable release does not match the independently reviewed rollback identity." >&2
				exit 1
			fi
			verify_runtime_artifact "$initial_target" "$previous_commit"
			previous_target="$initial_target"
			;;
		"$release_root_real/"*)
			seal_runtime_artifact "$initial_target" "$expected_current_commit" "$expected_current_manifest_digest"
			previous_target="$sealed_result"
			;;
		*) echo "Current release resolves outside the staging and immutable release roots." >&2; exit 1 ;;
	esac
elif [[ "$expected_current_commit" != none ]]; then
	echo "No current release exists, so the expected current identity must be 'none none'." >&2
	exit 1
fi

assert_current_unchanged() {
	if [[ -n "$initial_target" ]]; then
		[[ -L "$current_link" \
			&& "$(readlink -- "$current_link")" == "$initial_link" \
			&& "$(readlink -f -- "$current_link" 2>/dev/null || true)" == "$initial_target" ]]
	else
		[[ ! -e "$current_link" && ! -L "$current_link" ]]
	fi
}

next_link="${current_link}.next.$$"
response_file="$(mktemp)"
activate_target() {
	local target="$1"
	if [[ -L "$next_link" ]]; then unlink -- "$next_link"; fi
	ln -s -- "$target" "$next_link"
	mv -Tf -- "$next_link" "$current_link"
}

wait_for_target() {
	local target="$1"
	local attempt
	for attempt in {1..30}; do
		: "$attempt"
		if curl --noproxy '*' --fail --silent --show-error --max-time 5 "$api_ready_url" >/dev/null \
			&& curl --noproxy '*' --fail --silent --show-error --max-time 5 "$web_ready_url" >/dev/null \
			&& curl --noproxy '*' --fail --silent --show-error --max-time 5 \
				--resolve "$site_resolve" "$site_health_url" --output "$response_file" \
			&& cmp -s -- "$target/front-end/.output/public/deployment.json" "$response_file"; then
			return 0
		fi
		sleep 1
	done
	return 1
}

restart_services() {
	systemctl restart "$api_service"
	systemctl restart "$web_service"
}

assert_trusted_tree "$candidate_target" "Selected immutable candidate"
if ! assert_current_unchanged; then
	echo "The active release changed while promotion was being prepared." >&2
	exit 1
fi
if ! nginx -t; then
	echo "Nginx configuration must pass before promotion." >&2
	exit 1
fi

activate_target "$candidate_target"
if restart_services && systemctl reload nginx && wait_for_target "$candidate_target"; then
	echo "Promoted immutable runtime artifact $expected_commit and verified both services plus exact public source identity."
	exit 0
fi

echo "Candidate health failed; restoring the verified immutable previous release." >&2
if [[ -n "$previous_target" ]]; then
	assert_trusted_tree "$previous_target" "Rollback release"
	previous_commit="$(manifest_commit "$previous_target")"
	verify_runtime_artifact "$previous_target" "$previous_commit"
	activate_target "$previous_target"
	restart_services
	nginx -t && systemctl reload nginx
	if ! wait_for_target "$previous_target"; then
		echo "The previous release was restored but did not pass readiness and identity checks." >&2
	fi
else
	unlink -- "$current_link"
	systemctl stop "$web_service" "$api_service"
	nginx -t && systemctl reload nginx
fi
exit 1
