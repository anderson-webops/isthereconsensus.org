import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

describe("explainer detail layout", () => {
	it("lets clear headings carry the article without repetitive helper copy", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/explainers/[slug].vue"), "utf8");

		assert.match(source, /<h2>What people often get wrong<\/h2>/);
		assert.match(source, /<h2>Core concept<\/h2>/);
		assert.match(source, /<h2>Worked examples<\/h2>/);
		assert.doesNotMatch(source, /The common shortcut|The stable idea|The habits that|The same errors recur/);
		assert.doesNotMatch(source, /Process-focused sources|Concrete patterns|Shorter entries/);
	});

	it("uses one module-library link and two closing choices", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/explainers/[slug].vue"), "utf8");
		const misconceptionLinks = source.match(/to="\/misconceptions"/g) ?? [];

		assert.equal(misconceptionLinks.length, 1);
		assert.match(source, />Browse claim reviews<\/NuxtLink>/);
		assert.match(source, />All explainers<\/NuxtLink>/);
		assert.doesNotMatch(source, />Misconception modules<\/NuxtLink>/);
		assert.match(source, /\.explainer-detail-panel \{[\s\S]*border-bottom:/);
	});
});
