import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import { estimateForSelection, resolveComparisonSelection } from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("particle-air-cleaner-designs")!;
describe("particle air-cleaner comparison", () => {
	it("retains the eight Table 2 measurements and their reported variation", () => {
		const expected = [
			[111.2, 1.3, 77.1, 0.8],
			[156.1, 3.6, 77.6, 0.2],
			[400.9, 30.7, 76, 1.1],
			[118.9, 0.7, 41.1, 0.2]
		];
		comparison.options.forEach((option, index) => {
			comparison.outcomes.forEach((outcome, j) => {
				const result = estimateForSelection(option, outcome, comparison.contexts[0]!)!;
				assert.equal(result.value, expected[index]![j * 2]);
				assert.ok(result.interpretation!.includes(`± ${expected[index]![j * 2 + 1]}`));
				assert.equal(result.uncertainty, undefined, "do not invent confidence intervals");
				assert.deepEqual(result.sourceIds, ["holder"]);
			});
		});
		assert.deepEqual(
			comparison.outcomes.map((item) => item.unit),
			["CFM", "W"]
		);
		assert.match(
			comparison.protocolNote!,
			/29\.3 m³.*at least three replicates.*high.*turbo.*natural particle decay/s
		);
	});
	it("never transfers particle-lab estimates into household, gas or health contexts", () => {
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				for (const context of comparison.contexts.slice(1))
					assert.equal(estimateForSelection(option, outcome, context), undefined);
			}
		}
	});
	it("preserves selected devices and outcome in shareable state", () => {
		const selection = resolveComparisonSelection(comparison, {
			outcome: "power",
			context: "laboratory",
			options: "four-filter,commercial"
		});
		assert.deepEqual(
			selection.options.map(
				(option) => estimateForSelection(option, selection.outcome, selection.context)!.value
			),
			[76, 41.1]
		);
		assert.equal(resolveComparisonSelection(comparison, { options: "" }).options.length, 0);
		assert.equal(resolveComparisonSelection(comparison, { options: "all" }).options.length, 4);
	});
	it("connects search, six canonical reviews, the guide and one stable announcement", () => {
		for (const query of ["DIY air cleaners", "box fan power", "particle cleaner designs"])
			assert.equal(searchComparisons(query)[0]?.slug, comparison.slug, query);
		assert.equal(comparison.reviews.length, 6);
		assert.equal(comparison.guidePath, "/guides/choosing-air-cleaning");
		assert.equal(comparisonHistory(comparison, new Date("2026-09-12T00:00:00Z")).length, 1);
	});
});
