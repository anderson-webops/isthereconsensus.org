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
		assert.match(source, /Close, but different/);
		assert.doesNotMatch(source, /If nothing close fits, ask here\./);
		assert.doesNotMatch(source, /Ask about a gap/);
	});

	it("keeps the queue prompt neutral and specific", () => {
		assert.match(source, /Use a neutral, testable question/);
		assert.match(source, /One sentence is enough/);
		assert.match(source, /Add context, source, or difference/);
		assert.match(source, /describe what differs from the closest match/);
	});
});
