import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("non-drug-insomnia-treatments")!;

describe("non-drug insomnia comparison", () => {
	it("distinguishes symptom evidence from demands across six individually sourced approaches", () => {
		assert.deepEqual(
			comparison.options.map((option) => option.id),
			["cbt-i", "brief", "stimulus-control", "sleep-restriction", "relaxation", "sleep-hygiene"]
		);
		assert.deepEqual(
			comparison.outcomes.map((outcome) => outcome.id),
			["symptoms", "demands"]
		);
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.ok(findingForSelection(option, outcome, comparison.contexts[0]!));
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[0]!), undefined);
				for (const context of comparison.contexts.slice(1)) {
					assert.equal(findingForSelection(option, outcome, context), undefined);
					assert.equal(estimateForSelection(option, outcome, context), undefined);
				}
			}
		}
		assert.match(comparison.measureNote, /Guideline strength is not an effect size/);
	});

	it("retains the source numbers, correction and limitations in the relevant cells", () => {
		const cells = Object.fromEntries(
			comparison.options.map((option) => [option.id, option.findingsByContext!["adult-insomnia"]!])
		);
		assert.match(cells.brief!.symptoms!.evidence, /55%.*13%.*four weeks/);
		assert.match(cells.brief!.symptoms!.limitation, /SD to SE/);
		assert.match(cells["stimulus-control"]!.symptoms!.evidence, /1\.43 \(95% CI 1\.00 to 2\.05\)/);
		assert.match(cells.relaxation!.symptoms!.evidence, /0\.81 \(95% CI 0\.64 to 1\.02\)/);
		assert.match(cells["sleep-restriction"]!.demands!.evidence, /16-person uncontrolled.*150 postmenopausal/);
		assert.match(cells["sleep-hygiene"]!.symptoms!.summary, /against.*standalone/);
	});

	it("supports a shareable two-option view without changing the canonical identity", () => {
		const result = resolveComparisonSelection(comparison, {
			outcome: "demands",
			context: "adult-insomnia",
			options: "cbt-i,brief"
		});
		assert.equal(result.outcome.id, "demands");
		assert.deepEqual(
			result.options.map((option) => option.id),
			["cbt-i", "brief"]
		);
		assert.equal(resolveComparisonSelection(comparison, { options: "" }).options.length, 0);
		assert.equal(resolveComparisonSelection(comparison, { options: "all" }).options.length, 6);
	});

	it("is discoverable with a stable substantive update, not extra canonical-review counts", () => {
		for (const query of ["insomnia treatments", "CBT-I vs sleep hygiene", "stimulus control relaxation"]) {
			assert.equal(searchComparisons(query)[0]?.slug, comparison.slug, query);
		}
		const updates = comparisonHistory(comparison, new Date("2026-09-12T00:00:00Z"));
		assert.equal(updates.length, 1);
		assert.equal(updates[0]!.kind, "new_comparison");
		assert.equal(updates[0]!.bottomLineImpact, "new");
	});
});
