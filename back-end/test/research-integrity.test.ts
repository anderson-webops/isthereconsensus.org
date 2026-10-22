import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { refreshEditorialAuditClaim } from "../src/data/claim-audit-refreshes-2026-10.js";
import { claimsBeforeIntegrityCorrections, claimsBeforeEditorialCompletion as defaultClaims } from "../src/data/claims.js";
import { legacyAppraisalTools, legacyExclusionRules, legacyInclusionRules } from "../src/data/legacyResearchDefaults.js";
import { validateApprovedReaderRelease } from "../src/utils/approvedReaderPublication.js";
import { registeredRefreshes } from "../src/utils/claimRefreshPromotion.js";
import { toPublicClaim } from "../src/utils/publicRecords.js";
import { individualResearchFields, isRevisionCommentary, researchIntegrityFields, researchPreparation } from "../src/utils/researchIntegrity.js";

describe("research preparation and methodology integrity", () => {
	it("corrects legacy public metadata without mutating editorial records", () => {
		const topicSlug = "health-and-medicine";
		const legacy = {
			inclusionRules: legacyInclusionRules({ topicSlug }),
			exclusionRules: legacyExclusionRules({ topicSlug }),
			appraisalTools: legacyAppraisalTools(topicSlug),
			authorLine: "Prepared by the Is There Consensus editorial desk.",
			reviewerLine: "Reviewed for evidence quality, scope, and plain-language accuracy.",
			coiSummary: "No conflicts of interest were disclosed for this seeded claim page.",
			lastReviewedAt: new Date("2026-04-11T12:00:00Z"),
			changeLog: []
		};
		const before = structuredClone(legacy);
		const publicClaim = toPublicClaim(legacy, { topic: { slug: topicSlug } });
		assert.deepEqual(legacy, before);
		assert.deepEqual(publicClaim.inclusionRules, []);
		assert.deepEqual(publicClaim.exclusionRules, []);
		assert.deepEqual(publicClaim.appraisalTools, []);
		assert.match(publicClaim.reviewerLine!, /not recorded/);
		assert.match(publicClaim.coiSummary!, /not recorded/);
		assert.equal(publicClaim.authorLine, "Is There Consensus");
		assert.equal(publicClaim.preparation.method, "not_recorded");
		assert.equal(publicClaim.preparation.independentExpertReview, "not_recorded");
		assert.equal(publicClaim.lastReviewedAt, legacy.lastReviewedAt);
	});

	it("preserves individually recorded scope, assessment limitations, and reviewer disclosures", () => {
		const claim = {
			inclusionRules: ["Adults who currently smoke; cessation at six months or longer."],
			exclusionRules: ["Youth initiation is a different question."],
			appraisalTools: ["Narrative source check; no formal risk-of-bias instrument completed."],
			authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
			reviewerLine: "Source screening only; independent expert review not completed.",
			coiSummary: "Funding disclosures were not exhaustively assessed."
		};
		assert.deepEqual(researchIntegrityFields(claim, "health-and-medicine"), claim);
		assert.equal(researchPreparation(claim).method, "ai_assisted");
		assert.equal(researchPreparation({ authorLine: "Dr Example", reviewerLine: "Reviewed by Dr Example" }).independentExpertReview, "not_recorded");
	});

	it("does not erase a customized template or infer missing preparation records", () => {
		const topicSlug = "physics-and-chemistry";
		const claim = { inclusionRules: [...legacyInclusionRules({ topicSlug }), "Only measured laboratory quantities."] };
		assert.deepEqual(researchIntegrityFields(claim, topicSlug), claim);
		assert.equal(researchPreparation({}).method, "not_recorded");
	});

	it("removes appended generic assertions while retaining each individual scope criterion", () => {
		const claim = {
			inclusionRules: ["Only measured laboratory quantities.", ...legacyInclusionRules({ topicSlug: "" })],
			exclusionRules: ["Exclude results outside the stated pressure range.", ...legacyExclusionRules({ topicSlug: "" })],
			appraisalTools: ["Narrative comparison; no formal instrument completed.", ...legacyAppraisalTools("")]
		};
		assert.deepEqual(individualResearchFields(claim, "physics-and-chemistry"), {
			inclusionRules: ["Only measured laboratory quantities."],
			exclusionRules: ["Exclude results outside the stated pressure range."],
			appraisalTools: ["Narrative comparison; no formal instrument completed."]
		});
		assert.equal(claim.appraisalTools.length, 4);
	});

	it("removes inferred methodology without introducing unregistered scientific edits", () => {
		assert.equal(defaultClaims.length, 1001);
		for (const [index, claim] of defaultClaims.entries()) {
			const before = refreshEditorialAuditClaim(claimsBeforeIntegrityCorrections[index]!);
			for (const field of ["slug", "title", "bottomLine", "sources", "consensusBand", "confidenceScore", "searchCutoffAt", "changeLog", "surveillanceSpec"] as const) {
				assert.deepEqual(claim[field], before[field], `${claim.slug}: ${field}`);
			}
			assert.notEqual(claim.reviewerLine, "Reviewed for evidence quality, scope, and plain-language accuracy.");
			assert.deepEqual(researchIntegrityFields(claim, claim.topicSlug), claim);
		}
	});

	it("retains the immutable approved publication and scoped refresh registry", async () => {
		assert.deepEqual(await validateApprovedReaderRelease(), { reviews: 201, citations: 461 });
		assert.equal(registeredRefreshes.length, 20);
	});

	it("keeps revision commentary out of the public summary without deleting history", () => {
		const summary = "This update replaces blanket institutional agreement with scoped findings.";
		const history = [{ date: new Date("2026-09-13"), kind: "update" as const, summary }];
		assert.equal(isRevisionCommentary(summary), true);
		assert.equal(toPublicClaim({ editorSummary: summary, changeLog: history }).editorSummary, undefined);
		assert.deepEqual(toPublicClaim({ changeLog: history }).changeLog, history);
		assert.equal(isRevisionCommentary("The evidence is stronger for stopping smoking than for long-term safety."), false);
	});
});
