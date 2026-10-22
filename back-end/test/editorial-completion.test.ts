import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { completeEditorialCopy, editorialCopy } from "../src/data/claim-editorial-completion.js";
import { claimsBeforeEditorialCompletion as defaultClaims } from "../src/data/claims.js";
import { seedClaimFields, seedReviewDates } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { editorialConcerns, estimatedReadingGrade } from "../src/utils/editorialAudit.js";
import { editorialCompletionReview } from "../src/utils/editorialCompletionReview.js";
import { getPublicClaimReadiness, summarizeClaimSourceReadiness } from "../src/utils/publicClaimReadiness.js";

describe("catalog editorial completion", () => {
	it("records a bounded disposition for every catalog row without claiming expert or comprehension certification", () => {
		const review = editorialCompletionReview(2026);
		assert.equal(review.claims, 1001);
		assert.equal(review.leadsRevised, 275);
		assert.equal(review.leadsRetained, 726);
		assert.equal(new Set(review.rows.map(row => row.key)).size, 1001);
		assert.match(review.limitations, /Not an independent expert review/);
		assert.match(review.limitations, /above ten/);
		assert.throws(() => editorialCompletionReview(Number.NaN));
	});
	it("binds every copy edit to one existing article without retiring identities", () => {
		for (const slug of Object.keys(editorialCopy)) assert.equal(defaultClaims.filter(claim => claim.slug === slug).length, 1, slug);
		const revised = defaultClaims.map(completeEditorialCopy);
		assert.deepEqual(revised.map(claim => `${claim.topicSlug}/${claim.slug}`), defaultClaims.map(claim => `${claim.topicSlug}/${claim.slug}`));
		assert.equal(revised.length, 1001);
		assert.equal(revised.filter(claim => editorialConcerns(claim, 2026).reasons.includes("bundled_question_check")).length, 0);
		assert.equal(revised.filter(claim => editorialConcerns(claim, 2026).reasons.includes("jurisdiction_label_check")).length, 0);
		assert.equal(revised.filter(claim => editorialConcerns(claim, 2026).reasons.includes("revision_commentary")).length, 0);
	});
	it("improves lead readability without changing agreement, certainty or evidence conclusions", () => {
		let oldTotal = 0;
		let newTotal = 0;
		for (const before of defaultClaims) {
			const after = completeEditorialCopy(before);
			oldTotal += estimatedReadingGrade(before.bottomLine)!;
			newTotal += estimatedReadingGrade(after.bottomLine)!;
			for (const field of ["consensusBand", "agreementLevel", "evidenceCertainty", "confidenceScore", "stableCore", "openQuestions", "uncertaintySummary", "uncertaintyDrivers", "whatWouldChangeMinds", "misconceptions", "searchCutoffAt", "lastRetractionCheckAt", "surveillanceSpec"] as const) assert.deepEqual(after[field], before[field], `${before.slug}: ${field}`);
			assert.deepEqual(after.changeLog.slice(0, before.changeLog.length), before.changeLog);
		}
		assert.ok(newTotal / 1001 < oldTotal / 1001 - 1);
	});
	it("retains essential outcome and safety qualifications after narrowing questions", () => {
		const answer = (slug: string) => editorialCopy[slug]!.bottomLine;
		assert.match(answer("can-benzodiazepines-relieve-acute-anxiety-and-should-regular-use-be-stopped-abruptly"), /seizures.*Do not abruptly stop/s);
		assert.match(answer("is-hearing-loss-linked-to-higher-dementia-risk-and-can-hearing-aids-help"), /higher-risk group, not across everyone/);
		assert.match(answer("do-oral-over-the-counter-cough-and-cold-medicines-help-young-children-and-are-they-safe"), /never give it to younger infants/);
		assert.match(answer("does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe"), /not proof of safety for everyone/);
		assert.match(answer("do-covid-19-vaccines-cause-infertility"), /inactivated vaccines.*do not establish permanent infertility/s);
		assert.match(answer("does-fecal-microbiota-transplantation-work-for-recurrent-c-difficile-infection"), /regulated clinical care/);
	});
	it("validates every changed article and its citations with the deployed schemas and readiness rules", async () => {
		for (const before of defaultClaims) {
			const after = completeEditorialCopy(before);
			if (after === before) continue;
			const claim = new Claim({ ...seedClaimFields(after), ...seedReviewDates(after), topic: new mongoose.Types.ObjectId(), slug: after.slug, publishedAt: new Date("2026-10-01T00:00:00Z") });
			await claim.validate();
			const sources = after.sources.map(source => new ClaimSource({ ...source, claim: claim._id }));
			for (const source of sources) await source.validate();
			assert.equal(getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources)).isReady, true, before.slug);
		}
	});
});
