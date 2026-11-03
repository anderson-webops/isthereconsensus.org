import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
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
			assert.equal(manifest.packageManager, "npm@12.2.1");
			assert.equal(manifest.engines.node, ">=24.22.1 <25");
			assert.equal(manifest.engines.npm, ">=11.19.0 <13");
		}
	});

	it("retires unauthenticated source-build preparation, promotion and installation", () => {
		for (const [filename, source] of [
			["prepare-release.sh", prepareRelease],
			["promote-release.sh", promoteRelease],
			["install-services.sh", installServices]
		]) {
			assert.match(source, /consensus-native attested-artifact contract/);
			assert.match(source, /exit 78/);
			assert.doesNotMatch(source, /npm ci|systemctl|install -o|activate_target|seal_runtime_artifact/);
			const result = spawnSync(
				"/bin/bash",
				[
					join(repositoryRoot, "deploy/systemd", filename),
					"/nonexistent",
					"0".repeat(40),
					"--dry-run"
				],
				{ encoding: "utf8" }
			);
			assert.equal(result.status, 78, result.stderr);
			assert.equal(result.stdout, "");
			assert.match(result.stderr, /protected adapter acceptance/);
		}
		assert.match(artifactBuilder, /"deploy\/host-contract.json"/);
		assert.match(artifactVerifier, /Runtime artifact inventory or hash mismatch/);
		assert.match(artifactVerifier, /forbidden set-ID or sticky mode bits/);
	});

	it("declares the independent protected host transition without claiming rollback acceptance", () => {
		const contract = JSON.parse(readFileSync(join(repositoryRoot, "deploy/host-contract.json"), "utf8"));
		assert.deepEqual(contract, {
			schema_version: 1,
			site: "isthereconsensus.org",
			adapter: { id: "consensus-native", minimum_version: 1 },
			runtime: { node: "24.22.1", npm: "12.2.1", architecture: "arm64" },
			artifact_format: "ci-attested-tar-v1",
			requires: ["artifact:ci-attested", "rollback:retained-artifact", "acceptance:origin-dual-stack"],
			database: { change: "review-required" },
			rollback: { strategy: "retained-artifact", database_compatible: false }
		});
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

	it("keeps the release identity alias uncached without losing security headers", () => {
		const alias = nginxConfig.match(/location = \/release\.json \{([^}]+)\}/)?.[1] || "";
		assert.match(alias, /return 307 \/deployment\.json;/);
		assert.doesNotMatch(alias, /add_header/);
		assert.match(nginxConfig, /map \$uri \$isthereconsensus_release_cache_control \{\s+default "";\s+\/release\.json "no-store";/);
		assert.match(nginxConfig, /add_header Cache-Control \$isthereconsensus_release_cache_control always;/);
		for (const header of [
			"Referrer-Policy",
			"Strict-Transport-Security",
			"X-Content-Type-Options",
			"X-Frame-Options"
		]) {
			const declaration = nginxConfig.match(new RegExp(`add_header ${header} [^;]+;`))?.[0];
			assert.ok(declaration);
			assert.equal(nginxConfig.split(declaration).length, 2);
		}
		assert.match(nuxtConfig, /"\/deployment\.json": \{\s+cache: false,\s+headers: \{ "Cache-Control": "no-store" \}/);
		assert.match(nuxtConfig, /"\/release\.json": \{\s+cache: false,\s+headers: \{ "Cache-Control": "no-store" \},\s+redirect: \{ to: "\/deployment\.json", statusCode: 307 \}/);
	});

	it("keeps backend secrets out of frontend build artifacts", () => {
		assert.doesNotMatch(nuxtConfig, /back-end\/\.env/);
		assert.doesNotMatch(nuxtConfig, /from "dotenv"/);
		assert.doesNotMatch(nuxtConfig, /process\.env\.INTERNAL_DIAGNOSTICS_KEY/);
		assert.match(nuxtConfig, /internalDiagnosticsKey: ""/);
		assert.match(deploymentGuide, /NUXT_INTERNAL_DIAGNOSTICS_KEY/);
	});
});
