import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const guidelinesSource = readFileSync(join(testDir, "..", "src/pages/community-guidelines.vue"), "utf8");

describe("community guidelines layout", () => {
	it("keeps moderation copy concise without removing the enforcement flow", () => {
		assert.match(guidelinesSource, /Stay on the claim, source, or question\./);
		assert.match(
			guidelinesSource,
			/Do not flood the site with repetitive submissions, duplicate claims, or coordinated manipulation\./
		);
		assert.match(guidelinesSource, /Cooldowns, slow mode, topic limits, or restricted participation/);
		assert.match(
			guidelinesSource,
			/Send accuracy disputes about reviewed pages through corrections, not abuse appeals\./
		);
		assert.doesNotMatch(guidelinesSource, /general culture-war battlegrounds/);
		assert.doesNotMatch(guidelinesSource, /not yet severe enough for removal/);
	});

	it("keeps mobile guideline cards and lists compact", () => {
		assert.match(guidelinesSource, /@media \(max-width: 720px\) \{[\s\S]*\.summary-card \{[\s\S]*gap: 5px;/);
		assert.match(guidelinesSource, /\.plain-list \{[\s\S]*gap: 6px;[\s\S]*padding-left: 18px;/);
		assert.match(guidelinesSource, /\.guidelines-callout \{[\s\S]*align-items: stretch;[\s\S]*gap: 16px;/);
	});
});
