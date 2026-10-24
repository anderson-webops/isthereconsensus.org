import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const read = (file: string) => readFileSync(join(testDir, "..", file), "utf8");

describe("learn navigation", () => {
	it("links every learning section from one shared nav", () => {
		const source = read("src/components/LearnNav.vue");
		for (const path of ["/explainers", "/guides", "/compare", "/misconceptions"]) {
			assert.match(source, new RegExp(`to: "${path}"`));
		}
		assert.match(source, /aria-label="Learn sections"/);
		assert.match(source, /:aria-current="isCurrent\(section\.to\) \? 'page' : undefined"/);
	});

	it("shows the learn nav on each learning index", () => {
		for (const file of [
			"src/pages/explainers/index.vue",
			"src/pages/guides/index.vue",
			"src/pages/compare/index.vue",
			"src/pages/misconceptions.vue"
		]) {
			const source = read(file);
			assert.match(source, /import LearnNav from "~\/components\/LearnNav\.vue"/, file);
			assert.match(source, /<LearnNav \/>/, file);
		}
	});

	it("leads the explainers page with explainers instead of long guide lists", () => {
		const source = read("src/pages/explainers/index.vue");
		assert.doesNotMatch(source, /<ReadingGuideLinks|<ComparisonLinks/);
		assert.ok(source.indexOf("<LearnNav />") < source.indexOf('class="explainer-grid"'));
	});

	it("groups reading guides into labelled topic families", () => {
		const source = read("src/pages/guides/index.vue");
		assert.match(source, /groupByTopicFamily\(readingGuides, \(guide\) => guide\.topics\[0\]\)/);
		assert.match(source, /v-for="group in guideFamilies"/);
		assert.match(source, /<h3>\{\{ guide\.title \}\}<\/h3>/);
	});

	it("searches reviewed claims from the site header outside the home page", () => {
		const source = read("src/layouts/default.vue");
		assert.match(source, /<form class="site-search" role="search" @submit\.prevent="submitHeaderSearch">/);
		assert.match(source, /navigateTo\(\{ path: "\/consensus", query: \{ q \} \}\)/);
		assert.doesNotMatch(read("src/layouts/home.vue"), /site-search/);
	});
});
