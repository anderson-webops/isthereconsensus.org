import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { legacyEditorialBaseline } from "../src/data/claim-audit-legacy-baselines-2026-10.js";
import { claimsBeforeIntegrityCorrections } from "../src/data/claims.js";
import { seedClaimFields } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createEditorialAuditProposal } from "../src/utils/editorialAuditProposal.js";
import { APPROVED_EDITORIAL_DATA_SHA256, ownerCorrectionMatches } from "../src/utils/ownerContentRelease.js";

function fixture() {
	const before = claimsBeforeIntegrityCorrections.find(claim => claim.slug === "do-modest-minimum-wage-increases-always-cause-large-job-losses")!;
	const claim = new Claim({ ...seedClaimFields(before), topic: new mongoose.Types.ObjectId(), slug: before.slug }).toObject();
	const sources = before.sources.map(source => new ClaimSource({ ...source, claim: claim._id }).toObject());
	return { before, claim, sources };
}

describe("owner-approved automatic editorial corrections", () => {
	it("binds the exact five-target release instead of accepting arbitrary catalog changes", () => {
		const proposal = createEditorialAuditProposal({ commit: "a".repeat(40), tree: "b".repeat(40) });
		assert.equal(proposal.targets.length, 5);
		assert.equal(proposal.contentSha256, APPROVED_EDITORIAL_DATA_SHA256);
	});

	it("accepts only the known published scientific baseline", () => {
		const value = fixture();
		assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), true);
		value.claim.bottomLine += " A later editorial correction.";
		assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), false);
	});

	it("accepts the exact observed legacy uncertainty wording but not further alterations", () => {
		const value = fixture();
		Object.assign(value.claim, structuredClone(seedClaimFields(legacyEditorialBaseline(value.before))));
		assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), true);
		value.claim.uncertaintyDrivers[0]!.detail += " A later human qualification.";
		assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), false);
	});

	it("preserves publication withdrawals, customized scope, and changed sources", () => {
		for (const change of [
			(value: ReturnType<typeof fixture>) => { value.claim.status = "archived"; },
			(value: ReturnType<typeof fixture>) => { value.claim.inclusionRules.push("A human scope qualification."); },
			(value: ReturnType<typeof fixture>) => { value.sources[0]!.note = "A corrected scientific interpretation."; },
			(value: ReturnType<typeof fixture>) => { value.sources.pop(); }
		]) {
			const value = fixture();
			change(value);
			assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), false);
		}
	});

	it("does not replace active independent assessments", () => {
		const value = fixture();
		value.claim.evidenceLandscape.workflow.status = "approved";
		assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), false);
		const reviewed = fixture();
		reviewed.sources[0]!.evidenceProfile.reviewer.reviewedAt = new Date();
		assert.equal(ownerCorrectionMatches(reviewed.claim, reviewed.sources, reviewed.before), false);
	});

	it("does not treat notice monitoring, dates, schedules, or additional history as permission to erase them", () => {
		const value = fixture();
		value.claim.reviewedBy = new mongoose.Types.ObjectId();
		value.claim.nextReviewAt = new Date("2026-12-01T00:00:00Z");
		value.claim.surveillanceSpec.watchTerms.push("A privately maintained monitoring term.");
		value.claim.changeLog.push({ date: new Date(), kind: "review", summary: "An earlier administrative record retained." });
		value.sources[0]!.citationStatus = "corrected";
		value.sources[0]!.statusSources = ["Crossref", "https://example.org/existing-notice"];
		assert.equal(ownerCorrectionMatches(value.claim, value.sources, value.before), true);
	});
});
