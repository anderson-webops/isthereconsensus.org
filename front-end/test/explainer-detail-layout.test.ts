import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

describe("explainer detail layout", () => {
	it("keeps explainer detail helper copy reader-facing", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/explainers/[slug].vue"), "utf8");

		assert.match(source, /The stable idea that helps the rest of the page make sense/);
		assert.match(source, /Concrete patterns that make the concept easier to recognize/);
		assert.doesNotMatch(source, /reuse across claim pages/i);
		assert.doesNotMatch(source, /explain this elsewhere/i);
	});
});
