import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

describe("misconception and explainer index layout copy", () => {
	it("keeps misconception library framing reader-facing", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/misconceptions.vue"), "utf8");

		assert.match(source, /Recurring mistakes around science claims\./);
		assert.match(source, /same misunderstanding keeps returning/);
		assert.match(source, /method behind the correction/);
		assert.match(source, /science claims where they often appear/);
		assert.doesNotMatch(source, /claim pages/i);
		assert.doesNotMatch(source, /reuse it elsewhere/i);
	});

	it("uses public navigation labels from evergreen explainers", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/explainers/index.vue"), "utf8");

		assert.match(source, /Use the concept, then return to the claim\./);
		assert.match(source, /shorter page would not leave enough room for the method/);
		assert.match(source, />How reviews work</);
		assert.doesNotMatch(source, /Read editorial standards/);
		assert.doesNotMatch(source, /support pages/i);
		assert.doesNotMatch(source, /not a detour/i);
	});
});
