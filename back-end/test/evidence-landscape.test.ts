import type { IClaim } from "../src/models/schemas/Claim.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { recomputeEvidenceLandscapeFromSources } from "../src/utils/evidenceDistribution.js";
import { toPublicEvidenceLandscape } from "../src/utils/evidenceLandscape.js";

describe("claim evidence landscape", () => {
	it("defaults to a private, not-assessed landscape", async () => {
		const claim = new Claim({
			topic: new mongoose.Types.ObjectId(),
			title: "Does a new claim start with a private landscape?"
		});

		await claim.validate();

		assert.equal(claim.evidenceLandscape.schemaVersion, 2);
		assert.equal(claim.evidenceLandscape.claimType, "other");
		assert.equal(claim.evidenceLandscape.supportLabel, "unresolved");
		assert.equal(claim.evidenceLandscape.evidenceDirection, "not_applicable");
		assert.equal(claim.evidenceLandscape.evidenceCertainty, "not_assessable");
		assert.equal(claim.evidenceLandscape.expertAgreement, "not_assessable");
		assert.equal(claim.evidenceLandscape.distribution.supportsClaim.count, 0);
		assert.equal(claim.evidenceLandscape.evidenceBaseSize.totalSources, 0);
		assert.equal(claim.evidenceLandscape.publicFlags.showEvidenceLandscape, false);
		assert.equal(claim.evidenceLandscape.workflow.status, "not_started");
	});

	it("rejects unsupported landscape labels", async () => {
		const claim = new Claim({
			topic: new mongoose.Types.ObjectId(),
			title: "Does validation reject made-up labels?",
			evidenceLandscape: {
				supportLabel: "consensus_magic"
			}
		});

		await assert.rejects(() => claim.validate(), /consensus_magic/);
	});

	it("only exposes the landscape after explicit public publish flags", () => {
		const hidden = toPublicEvidenceLandscape({
			evidenceLandscape: {
				schemaVersion: 2,
				claimType: "causal",
				supportLabel: "strong_consensus",
				evidenceDirection: "strongly_supports_claim",
				evidenceCertainty: "high",
				expertAgreement: "high",
				plainLanguageAnswer: "The reviewed answer is clear.",
				boundaryConditions: [],
				applicability: {
					outcomes: []
				},
				distribution: {
					supportsClaim: { count: 1, weightedCount: 5 },
					supportsWithCaveats: { count: 0, weightedCount: 0 },
					opposesClaim: { count: 0, weightedCount: 0 },
					inconclusiveOrMixed: { count: 0, weightedCount: 0 },
					backgroundContext: { count: 0, weightedCount: 0 },
					excludedLowQuality: { count: 0 },
					excludedRetracted: { count: 0 },
					excludedFringe: { count: 0 }
				},
				evidenceBaseSize: {
					totalSources: 1,
					includedSources: 1,
					excludedSources: 0,
					systematicReviews: 1,
					metaAnalyses: 0,
					evidenceBasedGuidelines: 0,
					randomizedTrials: 0,
					observationalStudies: 0,
					mechanisticOrPreclinical: 0,
					expertCommentary: 0,
					retractedOrInvalid: 0
				},
				publicFlags: {
					showEvidenceLandscape: false,
					showCredibleMinorityView: true,
					showFalseBalanceWarning: true,
					medicalOrPublicHealthSensitive: false,
					requiresProfessionalContext: false
				},
				workflow: {
					status: "published",
					editorialNotes: "Do not expose this."
				}
			}
		} as Partial<IClaim>);

		assert.equal(hidden, undefined);

		const visible = toPublicEvidenceLandscape({
			evidenceLandscape: {
				schemaVersion: 2,
				claimType: "causal",
				supportLabel: "strong_consensus",
				supportScore: 96,
				evidenceDirection: "strongly_supports_claim",
				evidenceCertainty: "high",
				expertAgreement: "high",
				plainLanguageAnswer: "The reviewed answer is clear.",
				credibleMinorityViewSummary: "A credible minority view remains narrow.",
				fringeOrUnsupportedViewSummary: "Unsupported versions are not weighted equally.",
				boundaryConditions: [
					{
						dimension: "population",
						label: "Adults",
						explanation: "The public statement is scoped to adult evidence.",
						sourceIds: []
					}
				],
				applicability: {
					outcomes: ["outcome"]
				},
				distribution: {
					supportsClaim: { count: 1, weightedCount: 5 },
					supportsWithCaveats: { count: 0, weightedCount: 0 },
					opposesClaim: { count: 0, weightedCount: 0 },
					inconclusiveOrMixed: { count: 0, weightedCount: 0 },
					backgroundContext: { count: 0, weightedCount: 0 },
					excludedLowQuality: { count: 0 },
					excludedRetracted: { count: 0 },
					excludedFringe: { count: 0 }
				},
				evidenceBaseSize: {
					totalSources: 1,
					includedSources: 1,
					excludedSources: 0,
					systematicReviews: 1,
					metaAnalyses: 0,
					evidenceBasedGuidelines: 0,
					randomizedTrials: 0,
					observationalStudies: 0,
					mechanisticOrPreclinical: 0,
					expertCommentary: 0,
					retractedOrInvalid: 0
				},
				publicFlags: {
					showEvidenceLandscape: true,
					showCredibleMinorityView: false,
					showFalseBalanceWarning: true,
					medicalOrPublicHealthSensitive: true,
					requiresProfessionalContext: true
				},
				workflow: {
					status: "published",
					lastAssessedAt: new Date("2026-04-25T00:00:00.000Z"),
					editorialNotes: "Do not expose this."
				}
			}
		} as Partial<IClaim>);

		assert.equal(visible?.plainLanguageAnswer, "The reviewed answer is clear.");
		assert.equal(visible?.supportScore, 96);
		assert.equal(visible?.distribution.supportsClaim.weightedCount, 5);
		assert.equal(visible?.boundaryConditions[0]?.label, "Adults");
		assert.equal(visible?.publicFlags.requiresProfessionalContext, true);
		assert.equal(visible?.credibleMinorityViewSummary, undefined);
		assert.equal(visible?.fringeOrUnsupportedViewSummary, "Unsupported versions are not weighted equally.");
		assert.equal("editorialNotes" in (visible?.workflow ?? {}), false);
	});

	it("defaults source evidence profiles to not-coded private metadata", async () => {
		const source = new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			kind: "systematic_review",
			title: "Evidence source",
			stance: "supports"
		});

		await source.validate();

		assert.equal(source.evidenceProfile.schemaVersion, 2);
		assert.equal(source.evidenceProfile.positionRelativeToClaim, "not_coded");
		assert.equal(source.evidenceProfile.evidenceTier, "not_coded");
		assert.equal(source.evidenceProfile.studyDesign, "not_coded");
		assert.equal(source.evidenceProfile.inclusion.includedInLandscape, false);
		assert.equal(source.evidenceProfile.publicationIntegrity.retracted, false);
	});

	it("rejects unsupported source evidence tiers", async () => {
		const source = new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			kind: "systematic_review",
			title: "Invalid tier source",
			stance: "supports",
			evidenceProfile: {
				evidenceTier: "tier_99_magic"
			}
		});

		await assert.rejects(() => source.validate(), /tier_99_magic/);
	});

	it("recomputes source distribution without counting excluded or retracted sources as included evidence", async () => {
		const included = new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			kind: "systematic_review",
			title: "Included review",
			stance: "supports",
			evidenceProfile: {
				positionRelativeToClaim: "supports_claim",
				evidenceTier: "tier_1_synthesis_or_guideline",
				studyDesign: "systematic_review",
				riskOfBias: "low",
				directness: "direct",
				consistency: "consistent_with_body",
				precision: "precise",
				inclusion: {
					includedInLandscape: true
				}
			}
		});
		const lowQuality = new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			kind: "context",
			title: "Excluded source",
			stance: "debate",
			evidenceProfile: {
				positionRelativeToClaim: "excluded_low_quality",
				evidenceTier: "tier_5_commentary_or_low_quality",
				studyDesign: "expert_commentary",
				inclusion: {
					includedInLandscape: false,
					exclusionReason: "low_quality"
				}
			}
		});
		const retracted = new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			kind: "landmark_study",
			title: "Retracted source",
			stance: "supports",
			citationStatus: "retracted",
			evidenceProfile: {
				positionRelativeToClaim: "supports_claim",
				evidenceTier: "tier_6_retracted_or_invalid",
				studyDesign: "retracted_or_expression_of_concern",
				inclusion: {
					includedInLandscape: true
				},
				publicationIntegrity: {
					retracted: true
				}
			}
		});

		await Promise.all([included.validate(), lowQuality.validate(), retracted.validate()]);
		const result = recomputeEvidenceLandscapeFromSources([included, lowQuality, retracted]);

		assert.equal(result.distribution.supportsClaim.count, 1);
		assert.equal(result.distribution.supportsClaim.weightedCount, 5);
		assert.equal(result.distribution.excludedLowQuality.count, 1);
		assert.equal(result.distribution.excludedRetracted.count, 1);
		assert.equal(result.evidenceBaseSize.totalSources, 3);
		assert.equal(result.evidenceBaseSize.includedSources, 1);
		assert.equal(result.evidenceBaseSize.excludedSources, 2);
		assert.equal(result.evidenceBaseSize.systematicReviews, 1);
		assert.equal(result.evidenceBaseSize.retractedOrInvalid, 1);
	});
});
