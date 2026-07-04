import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const standardsSource = readFileSync(join(testDir, "..", "src/pages/standards.vue"), "utf8");

describe("standards page layout", () => {
	it("keeps review-standard bullets concise for scanning", () => {
		assert.match(standardsSource, /Lead with a short bottom line in plain language\./);
		assert.match(standardsSource, /Place uncertainty beside the answer, not behind it\./);
		assert.match(standardsSource, /Make evidence summaries, source stacks, and change logs easy to find\./);
		assert.doesNotMatch(standardsSource, /without guessing where they are/);
	});

	it("keeps mobile standards panels compact without changing the page flow", () => {
		assert.match(standardsSource, /@media \(max-width: 760px\) \{[\s\S]*\.standards-grid \{[\s\S]*gap: 12px;/);
		assert.match(standardsSource, /\.standards-panel \{[\s\S]*gap: 10px;/);
		assert.match(standardsSource, /\.plain-list \{[\s\S]*gap: 6px;[\s\S]*padding-left: 18px;/);
		assert.match(standardsSource, /\.standards-callout \{[\s\S]*gap: 14px;[\s\S]*grid-template-columns: 1fr;/);
	});
});
