import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(testDir, "..", "..");
const rootPackage = JSON.parse(readFileSync(join(repositoryRoot, "package.json"), "utf8"));
const backendPackage = JSON.parse(readFileSync(join(repositoryRoot, "back-end", "package.json"), "utf8"));
const deploymentGuide = readFileSync(join(repositoryRoot, "DEPLOYMENT.md"), "utf8");
const nginxConfig = readFileSync(join(repositoryRoot, "deploy", "nginx", "isthereconsensus.org.conf"), "utf8");
const prepareRelease = readFileSync(join(repositoryRoot, "deploy", "systemd", "prepare-release.sh"), "utf8");
const promoteRelease = readFileSync(join(repositoryRoot, "deploy", "systemd", "promote-release.sh"), "utf8");
const installServices = readFileSync(join(repositoryRoot, "deploy", "systemd", "install-services.sh"), "utf8");
const artifactBuilder = readFileSync(join(repositoryRoot, "scripts", "build-runtime-artifact.mjs"), "utf8");
const artifactVerifier = readFileSync(join(repositoryRoot, "scripts", "verify-runtime-artifact.mjs"), "utf8");
const nuxtConfig = readFileSync(join(repositoryRoot, "front-end", "nuxt.config.ts"), "utf8");
const poweredByPlugin = readFileSync(
	join(repositoryRoot, "front-end", "server", "plugins", "remove-powered-by.ts"),
	"utf8"
);
const systemdUnits = [
	readFileSync(join(repositoryRoot, "deploy", "systemd", "isthereconsensus-api.service"), "utf8"),
	readFileSync(join(repositoryRoot, "deploy", "systemd", "isthereconsensus-web.service"), "utf8")
];

describe("deployment hardening", () => {
	it("pins runtime npm while admitting the Dependabot resolver", () => {
		for (const manifest of [rootPackage, backendPackage]) {
			assert.equal(manifest.packageManager, "npm@12.0.2");
			assert.equal(manifest.engines.node, ">=24.18.1 <25");
			assert.equal(manifest.engines.npm, ">=11.19.0 <13");
		}

		assert.match(prepareRelease, /npm --version.*12\.0\.2/s);
	});

	it("prepares and promotes direct releases without a production container contract", () => {
		assert.match(prepareRelease, /node --version.*v24\.18\.1/s);
		assert.match(prepareRelease, /npm --version.*12\.0\.2/s);
		assert.match(prepareRelease, /NODE_BIN_DIR:-\/usr\/bin/);
		assert.match(prepareRelease, /git -C "\$candidate" status --porcelain/);
		assert.match(prepareRelease, /npm ci --include=dev --include=optional --strict-allow-scripts/);
		assert.match(
			prepareRelease,
			/unset NODE_ENV[\s\S]+npm test[\s\S]+export NODE_ENV=production[\s\S]+npm run build/
		);
		assert.match(prepareRelease, /npm run artifact:build/);
		assert.match(prepareRelease, /RUNTIME_ARTIFACT_REQUIRE_CLEAN=true/);
		assert.match(
			artifactBuilder,
			/\["ci", "--omit=dev", "--include=optional", "--strict-allow-scripts", "--no-fund"\]/
		);
		assert.match(artifactVerifier, /Runtime artifact inventory or hash mismatch/);
		assert.doesNotMatch(prepareRelease, /npm prune/);
		assert.match(prepareRelease, /deployment\.commit !== process\.env\.SOURCE_COMMIT/);
		assert.match(prepareRelease, /runtime manifest SHA-256: \$manifest_digest/);
		assert.match(deploymentGuide, /\/usr\/local\/sbin\/isthereconsensus-promote-release/);
		assert.doesNotMatch(deploymentGuide, /sudo \/srv\/isthereconsensus\.org\/releases\/[^\n]+promote-release\.sh/);
		assert.match(installServices, /promoter_dest=\/usr\/local\/sbin\/isthereconsensus-promote-release/);
		assert.match(installServices, /verifier_dest="\$verifier_dir\/verify-runtime-artifact\.mjs"/);
		assert.match(installServices, /install -o root -g root -m 0755 "\$promoter_source"/);
		assert.match(installServices, /install -o root -g root -m 0644 "\$verifier_source"/);
		assert.match(installServices, /artifact_release_root="\$site_root\/artifact-releases"/);
		assert.match(installServices, /promotion_lock="\$site_root\/\.promotion\.lock"/);
		assert.match(promoteRelease, /script_real.*installed_promoter/s);
		assert.match(promoteRelease, /Copied runtime manifest does not match the independently reviewed SHA-256/);
		assert.match(promoteRelease, /current-commit-or-none.*current-manifest-sha256-or-none/);
		assert.match(
			promoteRelease,
			/seal_runtime_artifact "\$initial_target" "\$expected_current_commit" "\$expected_current_manifest_digest"/
		);
		assert.match(promoteRelease, /! -type l -perm \/7000/);
		assert.match(artifactVerifier, /forbidden set-ID or sticky mode bits/);
		assert.match(promoteRelease, /verify_runtime_artifact "\$active_staging"/);
		assert.match(promoteRelease, /assert_trusted_tree "\$candidate_target"/);
		assert.match(promoteRelease, /activate_target "\$candidate_target"/);
		assert.match(promoteRelease, /mv -Tf/);
		assert.match(promoteRelease, /api_ready_url/);
		assert.match(promoteRelease, /web_ready_url/);
		assert.match(promoteRelease, /previous_target/);
		assert.match(promoteRelease, /wait_for_target "\$previous_target"/);
		assert.doesNotMatch(promoteRelease, /"\$candidate\/scripts\/verify-runtime-artifact\.mjs"/);
		assert.doesNotMatch(promoteRelease, /git -C "\$candidate"/);
		assert.doesNotMatch(`${prepareRelease}\n${promoteRelease}`, /\b(?:docker|podman|compose)\b/iu);
	});

	it("keeps both application services private and privilege-restricted", () => {
		for (const unit of systemdUnits) {
			assert.match(unit, /WorkingDirectory=\/srv\/isthereconsensus\.org\/current/);
			assert.match(unit, /Environment=HOST=127\.0\.0\.1/);
			assert.match(unit, /ExecStartPre=\/usr\/bin\/test -f/);
			assert.match(unit, /NoNewPrivileges=true/);
			assert.match(unit, /CapabilityBoundingSet=\n/);
			assert.match(unit, /LockPersonality=true/);
			assert.match(unit, /ProtectProc=invisible/);
			assert.match(unit, /ProtectSystem=strict/);
			assert.match(unit, /PrivateMounts=true/);
			assert.match(unit, /RemoveIPC=true/);
			assert.match(unit, /RestrictNamespaces=true/);
			assert.match(unit, /RestrictSUIDSGID=true/);
			assert.match(unit, /UMask=0077/);
		}
	});

	it("keeps IPv4 and IPv6 TLS listeners while blocking internal diagnostics", () => {
		assert.match(nginxConfig, /listen 80;/);
		assert.match(nginxConfig, /listen \[::\]:80;/);
		assert.match(nginxConfig, /return 308 https:\/\/isthereconsensus\.org\$request_uri;/);
		assert.match(nginxConfig, /listen 443 ssl http2;/);
		assert.match(nginxConfig, /listen \[::\]:443 ssl http2;/);
		assert.match(nginxConfig, /location = \/_dbinfo \{\s+return 404;/);
		assert.match(nginxConfig, /location = \/api\/setup\/status \{\s+return 404;/);
		assert.match(nginxConfig, /location = \/api\/setup-prompt \{\s+return 404;/);
		assert.match(nginxConfig, /if \(\$host !~\* \^\(www\\\.\)\?isthereconsensus\\\.org\$\) \{\s+return 444;/);
		assert.match(nginxConfig, /Strict-Transport-Security "max-age=63072000; includeSubDomains" always;/);
		assert.doesNotMatch(nginxConfig, /X-Forwarded-For \$http_x_forwarded_for/);
	});

	it("removes framework fingerprinting from rendered responses", () => {
		assert.match(poweredByPlugin, /delete response\.headers\["x-powered-by"\]/);
		assert.match(poweredByPlugin, /delete response\.headers\["X-Powered-By"\]/);
	});

	it("keeps backend secrets out of frontend build artifacts", () => {
		assert.doesNotMatch(nuxtConfig, /back-end\/\.env/);
		assert.doesNotMatch(nuxtConfig, /from "dotenv"/);
		assert.doesNotMatch(nuxtConfig, /process\.env\.INTERNAL_DIAGNOSTICS_KEY/);
		assert.match(nuxtConfig, /internalDiagnosticsKey: ""/);
		assert.match(deploymentGuide, /NUXT_INTERNAL_DIAGNOSTICS_KEY/);
	});
});
