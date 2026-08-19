import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/ask.vue"), "utf8");

describe("ask page layout copy", () => {
	it("keeps the ask flow progressive and framed around uncovered questions", () => {
		assert.match(source, /Search first\. Ask what is missing\./);
		assert.match(source, /What are you looking for\?/);
		assert.match(source, /Does one of these answer it\?/);
		assert.match(source, /None of these answers my question\./);
		assert.match(source, /Ask what is missing/);
		assert.match(source, /v-if="showPostingForm"/);
		assert.match(source, /async function revealPostingForm/);
		assert.doesNotMatch(source, /Related, but different/);
	});

	it("uses one question field instead of asking visitors to repeat themselves", () => {
		assert.match(source, /id="claim-question"/);
		assert.match(source, /class="posting-form__question">\{\{ query \}\}/);
		assert.match(source, /Add context, source, or what differs/);
		assert.match(source, /describe what differs from the closest match/);
		assert.doesNotMatch(source, /id="core-question"/);
		assert.doesNotMatch(source, /v-model="coreQuestion"/);
	});

	it("keeps reviewed-match actions easy to scan on desktop and mobile", () => {
		assert.match(source, /\.match-row \{[\s\S]*grid-template-columns: minmax\(0, 1fr\) auto;/);
		assert.match(source, /\.match-row__actions \{[\s\S]*flex-direction: column;[\s\S]*min-width: 148px;/);
		assert.match(source, /\.match-row__actions \.button \{[\s\S]*width: 100%;/);
		assert.match(source, /@media \(max-width: 720px\) \{[\s\S]*\.match-row \{[\s\S]*grid-template-columns: 1fr;/);
	});
});
