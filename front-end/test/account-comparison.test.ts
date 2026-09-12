import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { comparisonForSlug, comparisonHistory } from "../src/data/comparisons/index.js";
import { searchComparisons } from "../src/utils/comparison-search.js";
import {
	estimateForSelection,
	findingForSelection,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const comparison = comparisonForSlug("account-protection")!;
describe("account-protection comparison", () => {
	it("keeps twelve findings qualitative, source-linked and explicit about combinations", () => {
		assert.equal(comparison.options.length, 6);
		assert.equal(comparison.outcomes.length, 2);
		assert.match(comparison.resultNote!, /components you may combine/);
		for (const option of comparison.options) {
			for (const outcome of comparison.outcomes) {
				assert.equal(estimateForSelection(option, outcome, comparison.contexts[0]!), undefined);
				const finding = findingForSelection(option, outcome, comparison.contexts[0]!)!;
				assert.ok(finding);
				for (const id of finding.sourceIds) assert.ok(comparison.sources.some((source) => source.id === id));
			}
		}
		assert.match(
			comparison.options.find((option) => option.id === "passkey")!.findingsByContext!.general!.access!
				.limitation,
			/Backup eligibility does not establish a completed backup/
		);
	});
	it("withholds findings for personal risk and incident-recovery contexts", () => {
		for (const context of comparison.contexts.slice(1)) {
			for (const outcome of comparison.outcomes) {
				for (const option of comparison.options) {
					assert.equal(estimateForSelection(option, outcome, context), undefined);
					assert.equal(findingForSelection(option, outcome, context), undefined);
				}
			}
		}
	});
	it("supports discovery, shared selections and substantive update history", () => {
		for (const query of ["account protection", "passkeys", "password manager", "SMS code"]) {
			assert.ok(
				searchComparisons(query).some((result) => result.slug === comparison.slug),
				query
			);
		}
		const selected = resolveComparisonSelection(comparison, {
			outcome: "access",
			context: "general",
			options: "manager,passkey"
		});
		assert.equal(selected.outcome.id, "access");
		assert.deepEqual(
			selected.options.map((option) => option.id),
			["manager", "passkey"]
		);
		assert.equal(comparisonHistory(comparison, new Date("2026-09-13T00:00:00Z")).length, 1);
	});
});
