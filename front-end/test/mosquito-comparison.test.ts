import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("mosquito-bite-prevention")!;
const findings = (id: string) => comparison.options.find((option) => option.id === id)!.findingsByContext!.general!;
describe("mosquito-prevention comparison", () => {
	it("keeps unlike endpoints qualitative and links each finding to its evidence", () => {
		assert.equal(comparison.options.length, 6);
		assert.deepEqual(
			comparison.outcomes.map((outcome) => outcome.id),
			["evidence", "use"]
		);
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[0]!), undefined);
				const finding = findingForSelection(option, outcome, comparison.contexts[0]!)!;
				assert.ok(finding);
				for (const id of finding.sourceIds) assert.ok(comparison.sources.some((source) => source.id === id));
			}
		}
		assert.match(findings("spatial").evidence!.evidence, /0\.77.*0\.56–1\.05.*0\.67.*0\.56–0\.81/);
		assert.match(
			findings("spatial").evidence!.limitation,
			/not randomized.*not a demonstrated protection threshold/
		);
		assert.match(findings("clothing").use!.limitation, /do not apply it to skin/);
		assert.match(findings("ole").use!.limitation, /not extend an exception/);
	});
	it("never transfers findings into personal risk or child product selection", () => {
		for (const context of comparison.contexts.slice(1)) {
			for (const outcome of comparison.outcomes) {
				for (const option of comparison.options) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
					assert.equal(findingForSelection(option, outcome, context), undefined);
				}
			}
		}
	});
	it("supports discovery, shared selections and a stable update entry", () => {
		for (const query of ["mosquito", "picaridin", "wristbands", "spatial emanators"]) {
			assert.ok(
				searchComparisons(query).some((result) => result.slug === comparison.slug),
				query
			);
		}
		const selected = resolveComparisonSelection(comparison, {
			outcome: "use",
			context: "general",
			options: "ole,clothing"
		});
		assert.equal(selected.outcome.id, "use");
		assert.deepEqual(
			selected.options.map((option) => option.id),
			["ole", "clothing"]
		);
		assert.equal(comparisonHistory(comparison, new Date("2026-09-13T00:00:00Z")).length, 1);
	});
});
