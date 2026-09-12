import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("food-storage-and-safety")!;
describe("food-storage comparison", () => {
	it("keeps ten source-linked findings qualitative and methods combinable", () => {
		assert.equal(comparison.options.length, 5);
		assert.equal(comparison.outcomes.length, 2);
		assert.match(comparison.resultNote, /can be combined and are not interchangeable/);
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[0]!), undefined);
				const finding = findingForSelection(option, outcome, comparison.contexts[0]!)!;
				assert.ok(finding);
				for (const id of finding.sourceIds) assert.ok(comparison.sources.some((source) => source.id === id));
			}
		}
	});
	it("withholds all findings and estimates for an individual meal or power outage", () => {
		for (const context of comparison.contexts.slice(1)) {
			for (const outcome of comparison.outcomes) {
				for (const option of comparison.options) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
					assert.equal(findingForSelection(option, outcome, context), undefined);
				}
			}
		}
	});
	it("supports discovery, sharing and a substantive publication announcement", () => {
		for (const query of ["food storage", "freezing", "reheating", "vacuum sealing", "smell"]) {
			assert.ok(
				searchComparisons(query).some((result) => result.slug === comparison.slug),
				query
			);
		}
		const selection = resolveComparisonSelection(comparison, { outcome: "limits", options: "freeze,reheat" });
		assert.equal(selection.outcome.id, "limits");
		assert.deepEqual(
			selection.options.map((option) => option.id),
			["freeze", "reheat"]
		);
		assert.equal(comparisonHistory(comparison, new Date("2026-09-13T00:00:00Z")).length, 1);
	});
});
