import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const workflowSource = readFileSync(join(testDir, "..", "..", ".github", "workflows", "ci.yml"), "utf8");

describe("CI workflow", () => {
	it("cancels stale queued runs for the same branch", () => {
		assert.match(workflowSource, /concurrency:\n\s+group: \$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/);
		assert.match(workflowSource, /cancel-in-progress: true/);
	});

	it("uses GitHub JavaScript actions that target the Node 24 runtime", () => {
		assert.doesNotMatch(workflowSource, /actions\/(?:checkout|setup-node)@v4/);
		assert.doesNotMatch(workflowSource, /FORCE_JAVASCRIPT_ACTIONS_TO_NODE24/);
		assert.match(workflowSource, /actions\/checkout@v6/);
		assert.match(workflowSource, /actions\/setup-node@v6/);
	});

	it("smoke tests built SSR public assets and route rules after the production build", () => {
		assert.match(workflowSource, /run: npm run build/);
		assert.match(workflowSource, /SOURCE_COMMIT: \$\{\{ github\.sha \}\}/);
		assert.match(workflowSource, /run: npm run smoke:ssr-assets/);
		assert.match(workflowSource, /run: npm run smoke:ssr-routes/);
		assert.ok(
			workflowSource.indexOf("run: npm run build") < workflowSource.indexOf("run: npm run smoke:ssr-assets")
		);
		assert.ok(
			workflowSource.indexOf("run: npm run smoke:ssr-assets") <
				workflowSource.indexOf("run: npm run smoke:ssr-routes")
		);
	});

	it("builds the frontend before built-app accessibility smoke checks", () => {
		const buildFrontendStep = workflowSource.indexOf("run: npm run -w front-end build");
		const accessibilityStep = workflowSource.indexOf("run: npm run a11y");
		assert.notEqual(buildFrontendStep, -1);
		assert.notEqual(accessibilityStep, -1);
		assert.ok(buildFrontendStep < accessibilityStep);
	});
});
