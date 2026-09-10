import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(testDir, "..", "..");
const page = readFileSync(
	join(repositoryRoot, "front-end", "src", "pages", "account", "editorial", "source-integrity.vue"),
	"utf8"
);
const server = readFileSync(join(repositoryRoot, "back-end", "src", "server.ts"), "utf8");
const installServices = readFileSync(join(repositoryRoot, "deploy", "systemd", "install-services.sh"), "utf8");
const monitorUnit = readFileSync(
	join(repositoryRoot, "deploy", "systemd", "isthereconsensus-source-integrity.service"),
	"utf8"
);
const monitorTimer = readFileSync(
	join(repositoryRoot, "deploy", "systemd", "isthereconsensus-source-integrity.timer"),
	"utf8"
);

describe("source-integrity operations", () => {
	it("keeps the activity endpoint admin-only and the page explicit about signal limits", () => {
		assert.match(server, /api\.get\("\/admin\/source-integrity", requireAdmin/u);
		assert.match(page, /an empty result is not treated as proof that a paper is valid/u);
		assert.match(page, /v-if="!ready"/u);
		assert.match(page, /v-else-if="!isAdmin"/u);
		assert.match(page, /Admin access required/u);
	});

	it("installs an opt-in, bounded, hardened daily monitor", () => {
		assert.match(installServices, /--enable-integrity-timer/u);
		assert.match(monitorUnit, /--apply --limit 100 --stale-days 30/u);
		assert.match(monitorUnit, /TimeoutStartSec=25min/u);
		assert.match(monitorUnit, /NoNewPrivileges=true/u);
		assert.match(monitorUnit, /ProtectSystem=strict/u);
		assert.match(monitorTimer, /OnCalendar=daily/u);
		assert.match(monitorTimer, /RandomizedDelaySec=2h/u);
	});
});
