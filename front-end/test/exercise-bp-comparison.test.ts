import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	comparisonIntervalLabel,
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("exercise-and-blood-pressure")!;
describe("exercise and blood-pressure comparison", () => {
	it("reproduces all twelve Table 2 differences and Bayesian intervals with their correct signs", () => {
		const expected = [
			[
				[-5.06, -6.71, -3.43],
				[-2.82, -3.74, -1.88]
			],
			[
				[-5.79, -8.1, -3.51],
				[-3.17, -4.49, -1.86]
			],
			[
				[-4.95, -7.02, -2.87],
				[-2.95, -4.12, -1.76]
			],
			[
				[-4.18, -8.31, -0.06],
				[-2.77, -5.06, -0.49]
			],
			[
				[-7.72, -9.99, -5.43],
				[-3.79, -5.08, -2.49]
			],
			[
				[-13.52, -18.59, -8.44],
				[-6.87, -9.79, -3.97]
			]
		];
		comparison.options.forEach((option, i) =>
			comparison.outcomes.forEach((outcome, j) => {
				const result = estimateForSelection(option, outcome, comparison.contexts[0]!)!;
				const interval = result.uncertainty!;
				assert.deepEqual([result.value, interval.lower, interval.upper], expected[i]![j]);
				assert.equal(interval.estimate, result.value);
				assert.equal(comparisonIntervalLabel(interval), "95% credible interval");
				assert.deepEqual(result.sourceIds, ["hu"]);
				assert.equal(result.pValue, undefined);
			})
		);
		assert.match(comparison.protocolNote!, /159.*10,821.*152.*147.*study-level mean age ≥45.*4–48.*median 12/s);
		assert.match(comparison.options[3]!.scope, /All 11.*handgrip.*not represent wall squats/);
	});
	it("preserves existing confidence intervals without relabeling them as Bayesian", () => {
		const interval = { metric: "Mean difference", estimate: 1, lower: 0, upper: 2, level: 95 as const };
		assert.equal(comparisonIntervalLabel(interval), "95% CI");
		assert.equal(comparisonIntervalLabel({ ...interval, kind: "confidence" }), "95% CI");
	});
	it("never carries resting numbers into the distinct ambulatory or unsupported contexts", () => {
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[1]!), undefined);
				const finding = findingForSelection(option, outcome, comparison.contexts[1]!)!;
				assert.deepEqual(finding.sourceIds, ["schneider"]);
				assert.match(finding.scope, /Abstract checked/);
				for (const context of comparison.contexts.slice(2)) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
					assert.equal(findingForSelection(option, outcome, context), undefined);
				}
			}
		}
		assert.match(comparison.options[5]!.findingsByContext!.ambulatory!.systolic!.headline, /No separately matched/);
		assert.match(
			comparison.limitations.join(" "),
			/not confidence intervals.*personal prediction.*consensus percentages/
		);
	});
	it("supports shareable selection, discovery and one stable publication announcement", () => {
		const selected = resolveComparisonSelection(comparison, {
			context: "ambulatory",
			outcome: "diastolic",
			options: "continuous,handgrip"
		});
		assert.equal(selected.context.id, "ambulatory");
		assert.equal(selected.outcome.id, "diastolic");
		assert.deepEqual(
			selected.options.map((option) => option.id),
			["continuous", "handgrip"]
		);
		assert.equal(resolveComparisonSelection(comparison, { options: "" }).options.length, 0);
		for (const query of ["exercise blood pressure", "handgrip blood pressure", "aerobic blood pressure"])
			assert.equal(searchComparisons(query)[0]?.slug, comparison.slug);
		assert.equal(comparison.reviews.length, 5);
		assert.equal(comparisonHistory(comparison, new Date("2026-09-12T01:00:00Z")).length, 1);
	});
});
