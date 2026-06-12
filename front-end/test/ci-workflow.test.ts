import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const workflowSource = readFileSync(join(testDir, "..", "..", ".github", "workflows", "ci.yml"), "utf8");

describe("CI workflow", () => {
	it("opts GitHub JavaScript actions into the Node 24 runtime", () => {
		assert.match(workflowSource, /FORCE_JAVASCRIPT_ACTIONS_TO_NODE24:\s*true/);
	});
});
