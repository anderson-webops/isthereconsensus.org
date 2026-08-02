import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(testDir, "..", "..");
const deploymentGuide = readFileSync(join(repositoryRoot, "DEPLOYMENT.md"), "utf8");
const nginxConfig = readFileSync(join(repositoryRoot, "deploy", "nginx", "isthereconsensus.org.conf"), "utf8");
const prepareRelease = readFileSync(join(repositoryRoot, "deploy", "systemd", "prepare-release.sh"), "utf8");
const promoteRelease = readFileSync(join(repositoryRoot, "deploy", "systemd", "promote-release.sh"), "utf8");
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
		assert.match(prepareRelease, /npm ci --omit=dev --include=optional --ignore-scripts/);
		assert.doesNotMatch(prepareRelease, /npm prune/);
		assert.match(prepareRelease, /deployment\.commit !== process\.env\.SOURCE_COMMIT/);
		assert.match(promoteRelease, /mv -Tf/);
		assert.match(promoteRelease, /api_ready_url/);
		assert.match(promoteRelease, /web_ready_url/);
		assert.match(promoteRelease, /previous_target/);
		assert.match(promoteRelease, /wait_for_target "\$previous_target"/);
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
