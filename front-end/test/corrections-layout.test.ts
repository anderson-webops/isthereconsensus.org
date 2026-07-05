import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const correctionsSource = readFileSync(join(testDir, "..", "src/pages/corrections.vue"), "utf8");

describe("corrections page layout", () => {
	it("keeps the corrections summary concise and trust-focused", () => {
		assert.match(
			correctionsSource,
			/Reviewed pages do not change materially without a public record of what moved and why\./
		);
		assert.match(
			correctionsSource,
			/Corrections, updates, routine reviews, and archival actions get different public labels\./
		);
		assert.match(
			correctionsSource,
			/A useful request names the exact claim text, evidence problem, and strongest supporting sources\./
		);
		assert.doesNotMatch(correctionsSource, /silently rewritten when the bottom line changes in a meaningful way/);
		assert.doesNotMatch(correctionsSource, /should identify the exact claim text, the evidence problem/);
	});

	it("presents the response workflow as a numbered sequence", () => {
		assert.match(correctionsSource, /<ol class="step-list">/);
		assert.match(correctionsSource, /counter-reset: correction-step;/);
		assert.match(correctionsSource, /content: counter\(correction-step\);/);
		assert.doesNotMatch(correctionsSource, /<ul class="plain-list">\s*<li v-for="item in responseFlow"/);
	});

	it("keeps mobile correction lists and actions compact", () => {
		assert.match(
			correctionsSource,
			/@media \(max-width: 720px\) \{[\s\S]*\.plain-list,[\s\S]*\.step-list \{[\s\S]*gap: 8px;/
		);
		assert.match(correctionsSource, /\.step-list li \{[\s\S]*padding-left: 34px;/);
		assert.match(correctionsSource, /\.corrections-callout__actions \{[\s\S]*width: 100%;/);
		assert.match(correctionsSource, /\.button \{[\s\S]*flex: 1 1 160px;/);
	});
});
