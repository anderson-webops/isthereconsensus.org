import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evidenceComparisons } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";

describe("comparison discovery", () => {
	it("finds option names and everyday query variants in a separate comparison catalog", () => {
		for (const [query, slug] of [
			["compare solar and wind", "electricity-emissions"],
			["creatine vs protein", "strength-training-supplements"],
			["BCAA", "strength-training-supplements"],
			["coffee and sleep", "caffeine-dose-and-sleep"]
		]) {
			assert.equal(searchComparisons(query)[0]?.slug, slug, query);
		}
		for (const comparison of evidenceComparisons)
			assert.equal(searchComparisons(comparison.title)[0]?.slug, comparison.slug);
	});
	it("does not substitute generic related words for an unsupported subject", () => {
		for (const query of [
			"",
			"   ",
			"penguins dream in color",
			"creatine diabetes",
			"solar astrology",
			"coffee pregnancy"
		]) {
			assert.deepEqual(searchComparisons(query), [], query);
		}
	});
});
