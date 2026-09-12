import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("household-water-treatment")!;
const findings = (id: string) => comparison.options.find((option) => option.id === id)!.findingsByContext!.mechanisms!;
describe("household water treatment comparison", () => {
	it("compares six methods and three separate outcomes without inventing numeric removal rankings", () => {
		assert.equal(comparison.options.length, 6);
		assert.deepEqual(
			comparison.outcomes.map((outcome) => outcome.id),
			["microbes", "chemicals", "resources"]
		);
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[0]!), undefined);
				assert.ok(findingForSelection(option, outcome, comparison.contexts[0]!));
			}
		}
		assert.match(comparison.measureNote, /not a shared removal percentage/);
		assert.match(findings("uv").chemicals!.summary, /does not remove lead, nitrate or PFAS/);
		assert.match(findings("boiling").chemicals!.summary, /not made safe/);
		assert.match(findings("softening").microbes!.headline, /not disinfection/);
		assert.match(findings("distillation").chemicals!.summary, /volatile compounds/);
		assert.match(findings("carbon").microbes!.summary, /not be assumed to control all organisms/);
	});
	it("preserves source-specific water-use denominators and current specification boundaries", () => {
		assert.match(findings("ro").resources!.evidence, /30%.*70\/30.*2\.3:1.*August 2026.*back-pressure.*flushing/);
		assert.deepEqual(findings("ro").resources!.sourceIds, ["ro-spec", "ro-clarifications"]);
		assert.match(findings("ro").chemicals!.evidence, /TDS reduction is not proof/);
		assert.match(comparison.limitations.join(" "), /August 2026.*supersedes/);
		assert.match(comparison.guidance!.text, /alternative safe supply/);
	});
	it("does not transfer general capabilities into personal safety or emergency contexts", () => {
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				for (const context of comparison.contexts.slice(1)) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
					assert.equal(findingForSelection(option, outcome, context), undefined);
				}
			}
		}
		assert.match(comparison.contexts[1]!.explanation, /cannot certify your water/);
		assert.match(comparison.contexts[2]!.explanation, /does not override/);
	});
	it("supports discovery, shareable selection and one stable content announcement", () => {
		const selected = resolveComparisonSelection(comparison, {
			outcome: "chemicals",
			context: "mechanisms",
			options: "carbon,uv"
		});
		assert.equal(selected.outcome.id, "chemicals");
		assert.deepEqual(
			selected.options.map((option) => option.id),
			["carbon", "uv"]
		);
		assert.equal(resolveComparisonSelection(comparison, { options: "" }).options.length, 0);
		for (const query of ["water treatment", "reverse osmosis vs carbon", "UV water disinfection"])
			assert.equal(searchComparisons(query)[0]?.slug, comparison.slug);
		assert.equal(comparison.reviews.length, 5);
		assert.equal(comparisonHistory(comparison, new Date("2026-09-13T00:00:00Z")).length, 1);
	});
});
