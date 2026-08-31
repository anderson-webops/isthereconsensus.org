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
		assert.match(source, />Quick checks</);
		assert.match(source, />Why it persists</);
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

	it("keeps each misconception title visible while its answer stays optional", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/misconceptions.vue"), "utf8");
		const detailsIndex = source.indexOf('<details v-for="item in misconceptionModules"');
		const summaryIndex = source.indexOf('<summary class="misconception-card__summary">', detailsIndex);
		const detailsBodyIndex = source.indexOf('<div class="misconception-card__body">', summaryIndex);
		const linksIndex = source.indexOf(
			'<section class="misconception-card__section misconception-card__section--links">'
		);
		const detailsCloseIndex = source.indexOf("</details>", detailsBodyIndex);

		assert.notEqual(detailsIndex, -1);
		assert.notEqual(summaryIndex, -1);
		assert.notEqual(detailsBodyIndex, -1);
		assert.notEqual(linksIndex, -1);
		assert.notEqual(detailsCloseIndex, -1);
		assert.ok(summaryIndex < detailsBodyIndex);
		assert.ok(detailsBodyIndex < linksIndex);
		assert.ok(linksIndex < detailsCloseIndex);
		assert.match(source, /i-carbon-chevron-down/);
		assert.doesNotMatch(source, /misconception-card__details/);
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
		assert.match(source, /class="i-carbon-arrow-right explainer-card__arrow"/);
		assert.doesNotMatch(source, /\{\{ explainer\.summary \}\}|Read explainer/);
		assert.doesNotMatch(source, /linked module|explainer-card__details|explainer-card__actions/);
		assert.equal((source.match(/to="\/consensus"/g) ?? []).length, 1);
	});
});
