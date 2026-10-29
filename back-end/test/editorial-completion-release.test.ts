import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { claimsBeforeEditorialCompletion } from "../src/data/claims.js";
import { seedClaimFields, seedReviewDates } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createEditorialCompletionProposal } from "../src/utils/editorialCompletionProposal.js";
import { completionBaselineMatches, EDITORIAL_COMPLETION_SHA256, publishEditorialCompletion } from "../src/utils/editorialCompletionRelease.js";

describe("immutable editorial completion release", () => {
	const proposal = createEditorialCompletionProposal({
		commit: "a".repeat(40),
		tree: "b".repeat(40)
	});
	function fixture(index = 0) {
		const target = proposal.targets[index]!;
		const before = target.compatibleBaselines[0]!;
		const claim = new Claim({
			...seedClaimFields(before),
			...seedReviewDates(before),
			topic: new mongoose.Types.ObjectId(),
			slug: before.slug
		}).toObject();
		const sources = before.sources.map(source => new ClaimSource({ ...source, claim: claim._id }).toObject());
		return { target, before, claim, sources };
	}
	it("binds the complete batch and recognizes both exact source and observed legacy baselines", () => {
		assert.equal(proposal.targets.length, 467);
		assert.equal(proposal.contentSha256, EDITORIAL_COMPLETION_SHA256);
		for (const [index, target] of proposal.targets.entries()) {
			const original = claimsBeforeEditorialCompletion.find(claim => `${claim.topicSlug}/${claim.slug}` === target.key)!;
			for (const before of [original, fixture(index).before]) {
				const claim = new Claim({
					...seedClaimFields(before),
					topic: new mongoose.Types.ObjectId(),
					slug: before.slug
				}).toObject();
				const sources = before.sources.map(source => new ClaimSource({ ...source, claim: claim._id }).toObject());
				assert.equal(completionBaselineMatches(claim, sources, before), true, target.key);
			}
		}
	});
	it("does not replace scientific, scope, citation or independent-review changes", () => {
		for (const mutate of [
			(value: ReturnType<typeof fixture>) => { value.claim.bottomLine += " A later correction."; },
			(value: ReturnType<typeof fixture>) => { value.claim.stableCore.push("A later scientific qualification."); },
			(value: ReturnType<typeof fixture>) => { value.claim.inclusionRules.push("A later scope restriction."); },
			(value: ReturnType<typeof fixture>) => { value.sources[0]!.note += " A later source interpretation."; },
			(value: ReturnType<typeof fixture>) => { value.claim.evidenceLandscape.workflow.status = "approved"; },
			(value: ReturnType<typeof fixture>) => { value.sources[0]!.evidenceProfile.reviewer.reviewedAt = new Date(); },
			(value: ReturnType<typeof fixture>) => { value.claim.status = "archived"; }
		]) {
			const value = fixture();
			mutate(value);
			assert.equal(completionBaselineMatches(value.claim, value.sources, value.before), false);
		}
	});
	it("does not use dates, notices, administrative actors or private monitoring terms as permission to erase them", () => {
		const value = fixture();
		value.claim.reviewedBy = new mongoose.Types.ObjectId();
		value.claim.nextReviewAt = new Date("2027-01-01T00:00:00Z");
		value.claim.surveillanceSpec.watchTerms.push("Private monitoring term.");
		value.sources[0]!.statusSources = ["Crossref", "https://example.org/existing-notice"];
		value.sources[0]!.citationStatus = "corrected";
		assert.equal(completionBaselineMatches(value.claim, value.sources, value.before), true);
	});
	it("stops before database work if shutdown already cancelled publication", async () => {
		const controller = new AbortController();
		controller.abort();
		await assert.rejects(publishEditorialCompletion(controller.signal), { name: "AbortError" });
	});
});
