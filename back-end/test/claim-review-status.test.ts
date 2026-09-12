import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { seedReviewDates } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { claimReviewStatus, recordedDate } from "../src/utils/claimReviewStatus.js";
import { toPublicClaim } from "../src/utils/publicRecords.js";

const now = new Date("2026-09-12T12:00:00Z");
const reviewed = {
	status: "published",
	reviewDateBasis: "editorial_review" as const,
	lastReviewedAt: "2026-08-01T12:00:00Z",
	searchCutoffAt: "2026-07-31T00:00:00Z",
	nextReviewAt: "2027-01-01T00:00:00Z"
};

describe("review status without false freshness", () => {
	it("allows a literature cutoff and review on the same UTC calendar day", () => {
		const result = claimReviewStatus({ ...reviewed, searchCutoffAt: "2026-08-01T23:59:59Z" }, [], now);
		assert.deepEqual(result.issues, []);
		assert.equal(recordedDate("2026-08-01T24:00:00Z"), undefined);
	});
	it("does not infer scientific review from recent check, publication, or update dates", () => {
		const result = claimReviewStatus({ lastRetractionCheckAt: now, status: "published" }, [{ citationCheckedAt: now, citationStatus: "current" }], now);
		assert.equal(result.state, "provenance_unknown");
		assert.equal(result.reviewedAt, undefined);
		assert.equal(result.sourceChecks.recorded, 1);
	});
	it("keeps legacy dates unverified and separates source records from editorial reviews", () => {
		assert.equal(claimReviewStatus({ ...reviewed, reviewDateBasis: undefined }, [], now).state, "provenance_unknown");
		assert.equal(claimReviewStatus({ ...reviewed, reviewDateBasis: "source_record" }, [], now).basis, "source_record");
		assert.equal(claimReviewStatus(reviewed, [], now).state, "scheduled");
	});
	it("uses the explicit deadline including its boundary, never an age-based validity score", () => {
		assert.equal(claimReviewStatus({ ...reviewed, nextReviewAt: now }, [], now).state, "due");
		assert.equal(claimReviewStatus({ ...reviewed, lastReviewedAt: "2001-01-01", searchCutoffAt: "2000-01-01", nextReviewAt: undefined }, [], now).state, "unscheduled");
	});
	it("keeps publication notices visible even after a fresh review or a current legacy status", () => {
		const result = claimReviewStatus(reviewed, [{ citationStatus: "current", evidenceProfile: { publicationIntegrity: { retracted: true } } }, { citationStatus: "corrected" }], now);
		assert.equal(result.state, "source_notice");
		assert.equal(result.flaggedSourceCount, 2);
	});
	it("flags inconsistent chronology and rejects future or malformed recorded dates", () => {
		assert.equal(claimReviewStatus({ ...reviewed, lastReviewedAt: "2027-01-01" }, [], now).reviewedAt, undefined);
		const result = claimReviewStatus({ ...reviewed, searchCutoffAt: "2026-08-02", nextReviewAt: "2026-07-01" }, [], now);
		assert.equal(result.issues.length, 2);
		assert.equal(claimReviewStatus({ ...reviewed, nextReviewAt: "yesterday" }, [], now).state, "dates_need_verification");
		for (const date of ["today", "09/12/2026", "2026-02-30", "2026-13-01", new Date(Number.NaN)]) assert.equal(recordedDate(date), undefined);
	});
	it("reports partial source-check coverage and its oldest date instead of implying all sources were just checked", () => {
		const result = claimReviewStatus(reviewed, [{ citationCheckedAt: "2025-01-01" }, { citationCheckedAt: now }, {}, { citationCheckedAt: "2030-01-01" }, { citationCheckedAt: "bad" }], now);
		assert.deepEqual(result.sourceChecks, { total: 5, recorded: 2, oldest: "2025-01-01T00:00:00.000Z", latest: now.toISOString() });
	});
	it("serializes public status without reviewer identifiers or arbitrary private properties", () => {
		const record = new Claim({ ...reviewed, reviewedBy: "507f1f77bcf86cd799439011", title: "Fixture", slug: "fixture" });
		const result = toPublicClaim(record.toObject());
		assert.equal(result.reviewStatus.basis, "editorial_review");
		assert.equal("reviewedBy" in result, false);
		assert.equal(new Claim().reviewDateBasis, "unspecified");
	});
});

describe("seed review dates", () => {
	it("uses the dated record even when imported later and ignores a newer cosmetic update", () => {
		const dates = seedReviewDates({ changeLog: [
			{ kind: "publication", date: "2020-01-01T12:00:00Z", summary: "Published" },
			{ kind: "review", date: "2021-02-01T12:00:00Z", summary: "Reviewed" },
			{ kind: "update", date: "2026-09-12T12:00:00Z", summary: "Formatting only" }
		] });
		assert.equal(dates.lastReviewedAt?.toISOString(), "2021-02-01T12:00:00.000Z");
		assert.equal(dates.reviewDateBasis, "source_record");
		assert.equal(dates.nextReviewAt?.toISOString(), "2021-07-31T12:00:00.000Z");
	});
	it("leaves absent or malformed records undated", () => {
		assert.deepEqual(seedReviewDates({ changeLog: [] }), {});
		assert.deepEqual(seedReviewDates({ changeLog: [{ kind: "review", date: "today", summary: "Unverified" }] }), {});
	});
	it("supports every current seed without using import time or asserting expert review", () => {
		for (const claim of defaultClaims) {
			const result = seedReviewDates(claim);
			assert.ok(result.lastReviewedAt, claim.slug);
			assert.ok(claim.changeLog.some(entry => recordedDate(entry.date) === result.lastReviewedAt?.toISOString()));
			assert.equal(result.reviewDateBasis, "source_record");
		}
	});
});
