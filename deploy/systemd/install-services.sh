#!/usr/bin/env bash
set -euo pipefail
PATH=/usr/sbin:/usr/bin:/sbin:/bin
export PATH

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repository_root="$(cd -- "$script_dir/../.." && pwd)"
api_unit_dest="${API_UNIT_DEST:-/etc/systemd/system/isthereconsensus-api.service}"
web_unit_dest="${WEB_UNIT_DEST:-/etc/systemd/system/isthereconsensus-web.service}"
integrity_unit_dest="${INTEGRITY_UNIT_DEST:-/etc/systemd/system/isthereconsensus-source-integrity.service}"
integrity_timer_dest="${INTEGRITY_TIMER_DEST:-/etc/systemd/system/isthereconsensus-source-integrity.timer}"
api_env_dest="${API_ENV_DEST:-/etc/isthereconsensus/api.env}"
web_env_dest="${WEB_ENV_DEST:-/etc/isthereconsensus/web.env}"
promoter_source="$script_dir/promote-release.sh"
verifier_source="$repository_root/scripts/verify-runtime-artifact.mjs"
promoter_dest=/usr/local/sbin/isthereconsensus-promote-release
verifier_dir=/usr/local/libexec/isthereconsensus
verifier_dest="$verifier_dir/verify-runtime-artifact.mjs"
site_root=/srv/isthereconsensus.org
release_root="$site_root/releases"
artifact_release_root="$site_root/artifact-releases"
promotion_lock="$site_root/.promotion.lock"
dry_run=false
force_env=false
enable_integrity_timer=false

usage() {
  cat <<'USAGE'
Install the direct Is There Consensus services. Application services stay stopped; the optional monitor timer starts only when requested.
The reviewed promoter and artifact verifier are installed as root-owned host controls.

Usage: install-services.sh [--dry-run] [--force-env] [--enable-integrity-timer]

  --dry-run                 Print commands without changing the host.
  --force-env               Replace both target env files with fail-closed examples.
  --enable-integrity-timer  Enable and start the daily bounded Crossref monitor.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) dry_run=true ;;
    --force-env) force_env=true ;;
    --enable-integrity-timer) enable_integrity_timer=true ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

run() {
  if [[ "$dry_run" == true ]]; then
    printf ' %q' "$@"
    printf '\n'
    return 0
  fi
  "$@"
}

if [[ "$dry_run" == false ]]; then
  if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
    echo "Run the service and host-control installer with root privileges." >&2
    exit 1
  fi
  if [[ ! -x /usr/bin/node || "$(/usr/bin/node --version)" != "v24.18.1" ]]; then
    echo "The systemd runtime requires Node 24.18.1 at /usr/bin/node." >&2
    exit 1
  fi
  if ! id isthereconsensus >/dev/null 2>&1; then
    echo "Create the unprivileged isthereconsensus service account before installing units." >&2
    exit 1
  fi
  for source in "$promoter_source" "$verifier_source"; do
    if [[ ! -f "$source" || -L "$source" ]]; then
      echo "Host-control source must be a regular file from the reviewed checkout: $source" >&2
      exit 1
    fi
  done
fi

require_directory_policy() {
  local path="$1"
  local expected_uid="$2"
  local expected_gid="$3"
  local expected_mode="$4"
  local label="$5"
  if [[ ! -d "$path" || -L "$path" || "$(stat -c '%u:%g:%a' -- "$path")" != "$expected_uid:$expected_gid:$expected_mode" ]]; then
    echo "$label must be a real directory with policy $expected_uid:$expected_gid:$expected_mode: $path" >&2
    exit 1
  fi
}

if [[ "$dry_run" == true ]]; then
  run install -o root -g root -d -m 0755 "$site_root" "$artifact_release_root" "$verifier_dir"
  run install -o isthereconsensus -g isthereconsensus -d -m 0750 "$release_root"
  run install -o root -g root -m 0600 /dev/null "$promotion_lock"
else
  service_uid="$(id -u isthereconsensus)"
  service_gid="$(id -g isthereconsensus)"
  if [[ -e "$site_root" || -L "$site_root" ]]; then
    require_directory_policy "$site_root" 0 0 755 "The site root"
  else
    install -o root -g root -d -m 0755 "$site_root"
  fi
  if [[ -e "$release_root" || -L "$release_root" ]]; then
    require_directory_policy "$release_root" "$service_uid" "$service_gid" 750 "The unprivileged staging-release root"
  else
    install -o isthereconsensus -g isthereconsensus -d -m 0750 "$release_root"
  fi
  if [[ -e "$artifact_release_root" || -L "$artifact_release_root" ]]; then
    require_directory_policy "$artifact_release_root" 0 0 755 "The immutable artifact-release root"
  else
    install -o root -g root -d -m 0755 "$artifact_release_root"
  fi
  if [[ -e "$verifier_dir" || -L "$verifier_dir" ]]; then
    require_directory_policy "$verifier_dir" 0 0 755 "The verifier directory"
  else
    install -o root -g root -d -m 0755 "$verifier_dir"
  fi
  if [[ -e "$promotion_lock" || -L "$promotion_lock" ]]; then
    if [[ ! -f "$promotion_lock" || -L "$promotion_lock" || "$(stat -c '%u:%g:%a' -- "$promotion_lock")" != "0:0:600" ]]; then
      echo "The promotion lock must be a root:root mode 0600 regular file." >&2
      exit 1
    fi
  else
    install -o root -g root -m 0600 /dev/null "$promotion_lock"
  fi
  exec 9<>"$promotion_lock"
  if ! flock -n 9; then
    echo "Another Is There Consensus host-control installation or promotion is active." >&2
    exit 1
  fi
fi

for destination in "$promoter_dest" "$verifier_dest"; do
  if [[ "$dry_run" == false && ( -L "$destination" || ( -e "$destination" && ! -f "$destination" ) ) ]]; then
    echo "Refusing to replace a non-regular host-control path: $destination" >&2
    exit 1
  fi
done

run install -o root -g root -m 0644 "$verifier_source" "${verifier_dest}.next"
run mv -Tf "${verifier_dest}.next" "$verifier_dest"
run install -o root -g root -m 0755 "$promoter_source" "${promoter_dest}.next"
run mv -Tf "${promoter_dest}.next" "$promoter_dest"

run install -o root -g root -D -m 0644 "$script_dir/isthereconsensus-api.service" "$api_unit_dest"
run install -o root -g root -D -m 0644 "$script_dir/isthereconsensus-web.service" "$web_unit_dest"
run install -o root -g root -D -m 0644 "$script_dir/isthereconsensus-source-integrity.service" "$integrity_unit_dest"
run install -o root -g root -D -m 0644 "$script_dir/isthereconsensus-source-integrity.timer" "$integrity_timer_dest"
if [[ "$force_env" == true || ! -e "$api_env_dest" ]]; then
  run install -o root -g root -D -m 0600 "$script_dir/isthereconsensus-api.env.example" "$api_env_dest"
else
  echo "Keeping existing $api_env_dest."
fi
if [[ "$force_env" == true || ! -e "$web_env_dest" ]]; then
  run install -o root -g root -D -m 0600 "$script_dir/isthereconsensus-web.env.example" "$web_env_dest"
else
  echo "Keeping existing $web_env_dest."
fi
run systemctl daemon-reload
if [[ "$enable_integrity_timer" == true ]]; then
  run systemctl enable --now isthereconsensus-source-integrity.timer
fi
echo "Review both env files, install the Nginx virtual server, then prepare a release and invoke the installed root-owned promoter."
