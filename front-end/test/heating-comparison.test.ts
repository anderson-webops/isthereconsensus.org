import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import { estimateForSelection, resolveComparisonSelection } from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("home-heat-pump-upgrades")!;

describe("heat-pump upgrade comparison", () => {
	it("transcribes all twelve Figure 3 positive shares without treating them as effect sizes", () => {
		const expected = [
			[
				[62, 55],
				[82, 39]
			],
			[
				[86, 41],
				[94, 28]
			],
			[
				[95, 21],
				[97, 15]
			]
		];
		comparison.options.forEach((option, i) => {
			comparison.contexts.slice(0, 2).forEach((context, j) => {
				comparison.outcomes.forEach((outcome, k) => {
					const value = estimateForSelection(option, outcome, context)!;
					assert.equal(value.value, expected[i]![j]![k]);
					assert.deepEqual(value.sourceIds, ["wilson"]);
					assert.equal(value.uncertainty, undefined, "do not invent a confidence interval");
					assert.match(value.interpretation!, /not|Not/);
				});
			});
		});
		assert.match(comparison.measureNote, /not the amount saved.*consensus percentage/);
		assert.match(comparison.datasetLabel, /winter 2021–22/);
		assert.match(comparison.outcomes[1]!.explanation, /16-year.*3\.4%/);
		assert.match(comparison.protocolNote!, /Every upgrade package includes sealing and insulating ducts/);
	});
	it("never borrows the historical US estimates for a household or different system", () => {
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				for (const context of comparison.contexts.slice(2)) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
				}
			}
		}
	});
	it("preserves outcome, envelope context and selected packages in shareable views", () => {
		const selection = resolveComparisonSelection(comparison, {
			outcome: "lifetime-value",
			context: "with-envelope",
			options: "medium,cold-climate"
		});
		assert.equal(selection.outcome.id, "lifetime-value");
		assert.equal(selection.context.id, "with-envelope");
		assert.deepEqual(
			selection.options.map(
				(option) => estimateForSelection(option, selection.outcome, selection.context)?.value
			),
			[28, 15]
		);
		assert.equal(resolveComparisonSelection(comparison, { options: "" }).options.length, 0);
		assert.equal(resolveComparisonSelection(comparison, { options: "all" }).options.length, 3);
	});
	it("is searchable, connected to all six new reviews and announced once", () => {
		for (const query of ["heat pump upgrades", "heat pump energy bills", "cold climate heat pumps"])
			assert.equal(searchComparisons(query)[0]?.slug, comparison.slug, query);
		assert.equal(comparison.reviews.length, 8);
		const history = comparisonHistory(comparison, new Date("2026-09-12T00:00:00Z"));
		assert.equal(history.length, 1);
		assert.equal(history[0]!.kind, "new_comparison");
	});
});
