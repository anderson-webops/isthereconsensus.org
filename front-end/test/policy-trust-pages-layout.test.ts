import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const pages = [
	"src/pages/automation-and-ai.vue",
	"src/pages/conflicts-and-funding.vue",
	"src/pages/expert-review-program.vue",
	"src/pages/moderation-and-appeals.vue"
] as const;

function readPage(path: (typeof pages)[number]) {
	return readFileSync(join(testDir, "..", path), "utf8");
}

describe("policy trust pages layout", () => {
	for (const page of pages) {
		it(`keeps ${page} in the shared scannable policy structure`, () => {
			const source = readPage(page);

			assert.match(source, /<header class="policy-header">/);
			assert.match(source, /<section class="policy-summary">/);
			assert.match(source, /<section class="policy-panel/);
			assert.match(source, /<section class="policy-callout">/);
		});
	}

	it("keeps automation disclosure concise without removing human accountability", () => {
		const source = readPage("src/pages/automation-and-ai.vue");

		assert.match(source, /Consequential uses need a human owner who can explain the decision path\./);
		assert.match(source, /Drafting aids that summarize existing material for human review\./);
		assert.match(source, /Final moderation decisions that cannot be meaningfully appealed to a human reviewer\./);
		assert.doesNotMatch(source, /Any materially consequential use should have/);
		assert.doesNotMatch(source, /presenting generated text as if it were/);
	});

	it("keeps conflict disclosure readable without weakening disclosure rules", () => {
		const source = readPage("src/pages/conflicts-and-funding.vue");

		assert.match(source, /Anyone who can shape reviewed pages discloses relevant financial/);
		assert.match(source, /anyone who can approve\s+reviewed claim pages/);
		assert.match(source, /Disclosure can trigger recusal, added review controls, or public explanation/);
		assert.match(source, /Recent or ongoing funding tied to the claim area or source stack\./);
		assert.match(source, /checks page confidence/);
		assert.match(source, /prefers replacement review over private reassurance\./);
		assert.match(source, /Disclosure matters when it changes assignments or reviews\./);
		assert.doesNotMatch(source, /must be disclosed by staff editors/);
		assert.doesNotMatch(source, /anyone with approval power over reviewed claim pages/);
		assert.doesNotMatch(source, /checks whether page confidence changes/);
		assert.doesNotMatch(source, /full details are not shown publicly/);
		assert.doesNotMatch(source, /private hand-waving/);
	});

	it("keeps expert review expectations concise without removing reviewer duties", () => {
		const source = readPage("src/pages/expert-review-program.vue");

		assert.match(source, /Check whether the claim statement matches the cited evidence base/);
		assert.match(source, /Push back on wording that outruns the evidence or hides unsettled edge cases\./);
		assert.match(source, /Use uncertainty language that is specific and plain/);
		assert.doesNotMatch(source, /collapses unsettled edge cases into the bottom line/);
		assert.doesNotMatch(source, /performative certainty/);
	});

	it("keeps moderation appeals clear without blurring corrections and enforcement", () => {
		const source = readPage("src/pages/moderation-and-appeals.vue");

		assert.match(source, /These notice, action, and appeal rules support the community guidelines\./);
		assert.match(source, /The action taken and whether it applies to one post, one topic, or the account\./);
		assert.match(source, /Keep conduct enforcement separate from scientific corrections/);
		assert.doesNotMatch(source, /appeal expectations support the community rules/);
		assert.doesNotMatch(source, /moderation power is not confused/);
	});
});
