import type { IClaim } from "../src/models/schemas/Claim.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	getPublicClaimReadiness,
	sourceHasPublicLink,
	summarizeClaimSourceReadiness
} from "../src/utils/publicClaimReadiness.js";

const readyClaim: Partial<IClaim> = {
	status: "published",
	title: "Does the public claim have a complete evidence package?",
	bottomLine: "Yes. This fixture has the fields required before a reviewed claim can be public.",
	editorSummary: "A concise editorial summary.",
	uncertaintySummary: "The remaining uncertainty is bounded and visible.",
	stableCore: ["The main conclusion is stable.", "The source stack is inspectable."],
	openQuestions: ["Which edge cases need future review?"],
	evidenceSummaries: [
		{
			question: "Is the evidence package complete?",
			finding: "The required public fields are present.",
			effectDirection: "supports",
			certainty: "high",
			limitations: ["This is a unit-test fixture."]
		}
	],
	changeLog: [{ date: new Date("2026-04-11T12:00:00.000Z"), kind: "publication", summary: "Published." }],
	lastReviewedAt: new Date("2026-04-11T12:00:00.000Z"),
	publishedAt: new Date("2026-04-11T12:00:00.000Z")
};

const readySources = [
	{
		kind: "guideline" as const,
		title: "Guideline",
		publisher: "Institution",
		url: "https://example.org/guideline",
		stance: "supports" as const
	},
	{
		kind: "systematic_review" as const,
		title: "Review",
		publisher: "Journal",
		doi: "10.0000/example",
		stance: "supports" as const
	}
];

describe("public claim readiness", () => {
	it("requires linked sources and at least one decision-weight source", () => {
		const counts = summarizeClaimSourceReadiness(readySources);
		assert.deepEqual(counts, {
			sourceCount: 2,
			linkedSourceCount: 2,
			decisionWeightSourceCount: 2
		});
		assert.equal(getPublicClaimReadiness(readyClaim, counts).isReady, true);
	});

	it("keeps incomplete published claims out of public routes", () => {
		const readiness = getPublicClaimReadiness(
			{
				...readyClaim,
				uncertaintySummary: "",
				lastReviewedAt: undefined
			},
			summarizeClaimSourceReadiness([
				{
					kind: "context",
					title: "Unlinked background",
					publisher: "Example",
					stance: "context"
				}
			])
		);

		assert.equal(readiness.isReady, false);
		assert.ok(readiness.missing.includes("uncertainty summary"));
		assert.ok(readiness.missing.includes("review date"));
		assert.ok(readiness.missing.includes("source stack"));
		assert.ok(readiness.missing.includes("linked sources"));
		assert.ok(readiness.missing.includes("decision-weight source"));
	});

	it("accepts stable DOI, PMID, PMCID, or URL links", () => {
		assert.equal(sourceHasPublicLink({ doi: "10.0000/example" }), true);
		assert.equal(sourceHasPublicLink({ pmid: "12345678" }), true);
		assert.equal(sourceHasPublicLink({ pmcid: "PMC1234567" }), true);
		assert.equal(sourceHasPublicLink({ url: "https://example.org" }), true);
		assert.equal(sourceHasPublicLink({ url: "   " }), false);
	});
});
