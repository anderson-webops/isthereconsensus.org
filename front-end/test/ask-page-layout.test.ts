import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/ask.vue"), "utf8");

describe("ask page layout copy", () => {
	it("keeps the ask flow framed around searching first and posting only gaps", () => {
		assert.match(source, /Search first\. Ask what is missing\./);
		assert.match(source, /Search a claim or question first/);
		assert.match(source, /Use the match if it answers your question\. Post only what remains unclear\./);
		assert.match(source, /If the matches miss your question, ask here\./);
		assert.match(source, /Related, but different/);
		assert.match(source, /Related reviewed claim attached/);
		assert.doesNotMatch(source, /If nothing close fits, ask here\./);
		assert.doesNotMatch(source, /Ask about a gap/);
		assert.doesNotMatch(source, /Close, but different/);
	});

	it("keeps the queue prompt neutral and specific", () => {
		assert.match(source, /Use a neutral, testable question/);
		assert.match(source, /One sentence is enough/);
		assert.match(source, /Add context, source, or what differs/);
		assert.match(source, /describe what differs from the closest match/);
	});

	it("keeps reviewed-match actions easy to scan on desktop and mobile", () => {
		assert.match(source, /\.match-row \{[\s\S]*grid-template-columns: minmax\(0, 1fr\) auto;/);
		assert.match(source, /\.match-row__actions \{[\s\S]*flex-direction: column;[\s\S]*min-width: 176px;/);
		assert.match(source, /\.match-row__actions \.button \{[\s\S]*width: 100%;/);
		assert.match(source, /@media \(max-width: 720px\) \{[\s\S]*\.match-row \{[\s\S]*grid-template-columns: 1fr;/);
	});
});
