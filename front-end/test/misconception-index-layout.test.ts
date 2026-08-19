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

		assert.match(source, /See these concepts in context\./);
		assert.match(source, />Browse claim reviews</);
		assert.doesNotMatch(source, />How reviews work</);
		assert.doesNotMatch(source, /Read editorial standards/);
		assert.doesNotMatch(source, /support pages/i);
		assert.doesNotMatch(source, /not a detour/i);
	});

	it("makes each explainer card one clear destination", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/explainers/index.vue"), "utf8");

		assert.match(source, /<NuxtLink[\s\S]*v-for="explainer in evergreenExplainers"[\s\S]*class="explainer-card"/);
		assert.match(source, /<span class="explainer-card__link">Read explainer<\/span>/);
		assert.doesNotMatch(source, /linked module|explainer-card__details|explainer-card__actions/);
		assert.equal((source.match(/to="\/consensus"/g) ?? []).length, 1);
	});
});
