import type { ClaimEvidenceSummary } from "../src/types/board.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	isGeneratedFallbackEvidenceSummary,
	selectDistinctUncertaintyLimits,
	selectVisibleEvidenceSummaries
} from "../src/utils/claim-presentation.js";

const title = "Are atoms physically real?";
const bottomLine = "Yes. Their physical effects can be measured.";

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
