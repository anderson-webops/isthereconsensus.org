import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evidenceComparisons } from "../src/data/comparisons/index.js";
import { ReaderLibrary } from "../src/models/schemas/ReaderLibrary.js";
import { replacementComparisons, savedComparisonSlugsSchema } from "../src/utils/comparisonLibrary.js";

describe("comparison library compatibility", () => {
	it("keeps omitted comparison selections but honors an explicit clear", () => {
		const saved = ["electricity-emissions"];
		assert.deepEqual(replacementComparisons(undefined, saved), saved);
		assert.deepEqual(replacementComparisons([], saved), []);
		assert.deepEqual(replacementComparisons(undefined), []);
	});
	it("validates published catalog slugs and rejects unsafe, duplicate and oversized selections", () => {
		assert.equal(savedComparisonSlugsSchema.safeParse(evidenceComparisons.map(comparison => comparison.slug)).success, true);
		for (const value of [["../account"], ["https://example.test"], ["a", "a"], ["a".repeat(101)], Array.from({ length: 51 }, (_, i) => `comparison-${i}`)]) {
			assert.equal(savedComparisonSlugsSchema.safeParse(value).success, false);
		}
	});
	it("defaults old library documents to no saved comparisons and enforces the database validator", async () => {
		const legacy = new ReaderLibrary({ _id: `user:${"a".repeat(24)}`, revision: 1, savedReviewIds: [], followedTopicIds: [] });
		assert.deepEqual([...legacy.savedComparisonSlugs], []);
		await legacy.validate();
		legacy.savedComparisonSlugs = ["../account"];
		await assert.rejects(legacy.validate(), /savedComparisonSlugs/);
	});
});
