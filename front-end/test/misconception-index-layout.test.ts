import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

describe("misconception and explainer index layout copy", () => {
	it("keeps misconception library framing reader-facing", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/misconceptions.vue"), "utf8");
		const gridIndex = source.indexOf('<section class="misconception-grid">');
		const libraryFitIndex = source.indexOf('<section class="misconception-panel misconception-panel--soft">');

		assert.match(source, /Recurring mistakes around science claims\./);
		assert.match(source, /Common mistake/);
		assert.match(source, /Quick checks and why it persists/);
		assert.match(source, /same misunderstanding keeps returning/);
		assert.match(source, /method behind the correction/);
		assert.match(source, /science claims where they often appear/);
		assert.match(source, /Use the right correction, then return to the claim\./);
		assert.doesNotMatch(source, /<p class="eyebrow">Module<\/p>/);
		assert.doesNotMatch(source, />Checks and context</);
		assert.doesNotMatch(source, /claim pages/i);
		assert.doesNotMatch(source, /reuse it elsewhere/i);
		assert.notEqual(gridIndex, -1);
		assert.notEqual(libraryFitIndex, -1);
		assert.ok(gridIndex < libraryFitIndex);
	});

	it("keeps deeper misconception context inside the optional detail area", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/misconceptions.vue"), "utf8");
		const detailsBodyIndex = source.indexOf('<div class="misconception-card__details-body">');
		const linksIndex = source.indexOf(
			'<section class="misconception-card__section misconception-card__section--links">'
		);
		const detailsCloseIndex = source.indexOf("</details>", detailsBodyIndex);

		assert.notEqual(detailsBodyIndex, -1);
		assert.notEqual(linksIndex, -1);
		assert.notEqual(detailsCloseIndex, -1);
		assert.ok(detailsBodyIndex < linksIndex);
		assert.ok(linksIndex < detailsCloseIndex);
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

	it("keeps explainer index cards summary-first with optional depth", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/explainers/index.vue"), "utf8");
		const actionsIndex = source.indexOf('<div class="explainer-card__actions">');
		const detailsIndex = source.indexOf('<details class="explainer-card__details">');

		assert.match(source, /<summary>Why it matters and key points<\/summary>/);
		assert.ok(source.includes("<p>{{ explainer.whyItMatters }}</p>"));
		assert.match(source, /<li v-for="point in explainer\.keyPoints"/);
		assert.notEqual(actionsIndex, -1);
		assert.notEqual(detailsIndex, -1);
		assert.ok(actionsIndex < detailsIndex);
		assert.doesNotMatch(source, /class="explainer-card__section"/);
	});
});
