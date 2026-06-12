import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const workflowSource = readFileSync(join(testDir, "..", "..", ".github", "workflows", "live-smoke.yml"), "utf8");

describe("live smoke workflow", () => {
	it("can be manually dispatched against production or a supplied origin", () => {
		assert.match(workflowSource, /workflow_dispatch:/);
		assert.match(workflowSource, /base_url:/);
		assert.match(workflowSource, /default: https:\/\/isthereconsensus\.org/);
		assert.match(workflowSource, /profile:/);
		assert.match(workflowSource, /expected_commit:/);
		assert.match(workflowSource, /- production/);
		assert.match(workflowSource, /- frontend/);
	});

	it("runs the live smoke script with caller-supplied inputs", () => {
		assert.match(workflowSource, /actions\/checkout@v6/);
		assert.match(workflowSource, /actions\/setup-node@v6/);
		assert.match(workflowSource, /LIVE_SMOKE_BASE_URL: \$\{\{ inputs\.base_url \}\}/);
		assert.match(workflowSource, /LIVE_SMOKE_PROFILE: \$\{\{ inputs\.profile \}\}/);
		assert.match(workflowSource, /LIVE_SMOKE_EXPECT_COMMIT: \$\{\{ inputs\.expected_commit \}\}/);
		assert.match(workflowSource, /run: npm run smoke:live/);
	});
});
