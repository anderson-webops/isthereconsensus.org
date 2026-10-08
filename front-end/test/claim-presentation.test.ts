import type { ClaimEvidenceSummary } from "../src/types/board.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	isGeneratedFallbackEvidenceSummary,
	selectDistinctUncertaintyLimits,
	selectReviewScopeGroups,
	selectVisibleEvidenceSummaries
} from "../src/utils/claim-presentation.js";

const title = "Are atoms physically real?";
const bottomLine = "Yes. Their physical effects can be measured.";

describe("recorded review scope", () => {
	it("keeps included and excluded evidence separate and ordered", () => {
		assert.deepEqual(
			selectReviewScopeGroups({
				inclusionRules: [" First criterion. ", "Second criterion."],
				exclusionRules: ["Excluded setting."]
			}),
			[
				{ key: "included", title: "Included evidence", items: ["First criterion.", "Second criterion."] },
				{ key: "excluded", title: "Excluded evidence", items: ["Excluded setting."] }
			]
		);
	});

	it("does not invent scope criteria for missing or blank legacy fields", () => {
		for (const claim of [
			undefined,
			null,
			{},
			{ inclusionRules: [], exclusionRules: [] },
			{ inclusionRules: [" ", "\n"] }
		]) {
			assert.deepEqual(selectReviewScopeGroups(claim), []);
		}
		assert.deepEqual(selectReviewScopeGroups({ exclusionRules: ["Not reviewed.", ""] }), [
			{ key: "excluded", title: "Excluded evidence", items: ["Not reviewed."] }
		]);
	});

	it("preserves full long criteria and treats markup as data", () => {
		const criterion = `${"A full scope qualification. ".repeat(30)}<script>not executable</script>`;
		assert.equal(selectReviewScopeGroups({ inclusionRules: [criterion] })[0]?.items[0], criterion);
	});

	it("never mutates input arrays or silently discards repeated rules", () => {
		const inclusionRules = Object.freeze([" A criterion. ", " A criterion. "]);
		const claim = { inclusionRules: [...inclusionRules], exclusionRules: [" Outside scope. "] };
		const before = structuredClone(claim);
		assert.equal(selectReviewScopeGroups(claim)[0]?.items.length, 2);
		assert.deepEqual(claim, before);
	});
});

const generatedSummary: ClaimEvidenceSummary = {
	question: title,
	population: "Public-facing summary built from the highest-weight evidence available for this claim.",
	finding: bottomLine,
	effectDirection: "supports",
	certainty: "high",
	limitations: ["Which interpretations best explain the formalism?"]
};

describe("claim presentation", () => {
	it("hides the generated evidence summary that restates the claim", () => {
		assert.equal(isGeneratedFallbackEvidenceSummary(generatedSummary, title, bottomLine), true);
		assert.deepEqual(selectVisibleEvidenceSummaries([generatedSummary], title, bottomLine), []);
	});

	it("keeps an authored outcome summary", () => {
		const authoredSummary: ClaimEvidenceSummary = {
			...generatedSummary,
			question: "What do atom-by-atom experiments show?",
			population: "Scanning-probe and ion-trap experiments.",
			finding: "Individual atoms can be resolved and manipulated."
		};

		assert.deepEqual(selectVisibleEvidenceSummaries([authoredSummary], title, bottomLine), [authoredSummary]);
	});

	it("removes duplicate and retired limits while preserving authored limitations", () => {
		const openQuestion = "Which interpretations best explain the formalism?";
		const limits = selectDistinctUncertaintyLimits({
			drivers: [
				{ type: "other", detail: openQuestion },
				{
					type: "implementation",
					detail: "Policy, communication, or rollout choices can change practical outcomes even when the underlying evidence direction is settled."
				},
				{ type: "other", detail: "Microscope images require instrument-specific interpretation." }
			],
			openQuestions: [openQuestion],
			evidenceSummaries: [
				{
					...generatedSummary,
					limitations: [openQuestion, "Microscope images require instrument-specific interpretation."]
				}
			]
		});

		assert.deepEqual(limits, ["Microscope images require instrument-specific interpretation."]);
	});
});
