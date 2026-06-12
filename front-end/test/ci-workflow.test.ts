import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const workflowSource = readFileSync(join(testDir, "..", "..", ".github", "workflows", "ci.yml"), "utf8");

describe("CI workflow", () => {
	it("uses GitHub JavaScript actions that target the Node 24 runtime", () => {
		assert.doesNotMatch(workflowSource, /actions\/(?:checkout|setup-node)@v4/);
		assert.doesNotMatch(workflowSource, /FORCE_JAVASCRIPT_ACTIONS_TO_NODE24/);
		assert.match(workflowSource, /actions\/checkout@v6/);
		assert.match(workflowSource, /actions\/setup-node@v6/);
	});
});
