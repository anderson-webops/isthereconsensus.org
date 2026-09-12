import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("hearing-protection")!;
describe("hearing-protection comparison", () => {
	it("keeps all ten findings qualitative and connected to their sources", () => {
		assert.equal(comparison.options.length, 5);
		assert.equal(comparison.outcomes.length, 2);
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[0]!), undefined);
				const finding = findingForSelection(option, outcome, comparison.contexts[0]!)!;
				assert.ok(finding);
				for (const id of finding.sourceIds) assert.ok(comparison.sources.some((source) => source.id === id));
			}
		}
		const dual = comparison.options.find((option) => option.id === "dual")!.findingsByContext!.general!.evidence!;
		assert.match(dual.summary, /cannot simply be added/);
		const anc = comparison.options.find((option) => option.id === "anc")!.findingsByContext!.general!.evidence!;
		assert.match(anc.evidence, /Individual fit still matters/);
	});
	it("withholds findings in personal duration and hearing-loss risk contexts", () => {
		for (const context of comparison.contexts.slice(1)) {
			for (const outcome of comparison.outcomes) {
				for (const option of comparison.options) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
					assert.equal(findingForSelection(option, outcome, context), undefined);
				}
			}
		}
	});
	it("supports search, stable announcements and shared device selections", () => {
		for (const query of ["hearing protection", "earplugs", "earmuffs", "ANC headphones"])
			assert.ok(searchComparisons(query).some((result) => result.slug === comparison.slug));
		const selected = resolveComparisonSelection(comparison, {
			outcome: "use",
			context: "general",
			options: "dual,anc"
		});
		assert.equal(selected.outcome.id, "use");
		assert.deepEqual(
			selected.options.map((option) => option.id),
			["dual", "anc"]
		);
		assert.equal(comparisonHistory(comparison, new Date("2026-09-13T00:00:00Z")).length, 1);
	});
});
