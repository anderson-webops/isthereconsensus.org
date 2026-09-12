import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { SourceNoticeReview } from "../src/models/schemas/SourceNoticeReview.js";
import { toEditorialClaim, toPublicClaim } from "../src/utils/publicRecords.js";
import { readerFeedbackQuery } from "../src/utils/readerFeedback.js";
import {
	hasSourceNotice,
	noticeFingerprint,
	reviewDetailQuery,
	reviewPriorityQuery,
	reviewScheduleChange,
	sourceNoticeDecision,
	sourceNoticeSnapshot
} from "../src/utils/reviewPriority.js";

describe("review maintenance policy", () => {
	it("requires bounded filters, UTC calendar dates, revisions and meaningful reasons", () => {
		assert.deepEqual(reviewPriorityQuery.parse({}), { page: 1, limit: 25, reason: "attention", query: "" });
		for (const query of [
			{ page: 0 },
			{ page: 10001 },
			{ limit: 51 },
			{ reason: "truth" },
			{ query: { $gt: "" } },
			{ query: "x".repeat(101) },
			{ topicId: { $ne: null } },
			{ status: "published" }
		])
			assert.equal(reviewPriorityQuery.safeParse(query).success, false);
		assert.equal(reviewDetailQuery.safeParse({ sourcePage: -1 }).success, false);
		const change = {
			revision: 0,
			expectedNextReviewAt: null,
			nextReviewAt: "2028-02-29",
			note: "Prioritize a substantive source review."
		};
		assert.ok(reviewScheduleChange.safeParse(change).success);
		assert.ok(reviewScheduleChange.safeParse({ ...change, nextReviewAt: null }).success);
		for (const value of ["2026-02-29", "2026-13-01", "2026-01-01T24:00:00Z", "tomorrow", "2026-02-30"])
			assert.equal(reviewScheduleChange.safeParse({ ...change, nextReviewAt: value }).success, false);
		for (const extra of [
			{ note: "short" },
			{ revision: -1 },
			{ revision: 1.5 },
			{ revision: Number.MAX_SAFE_INTEGER },
			{ lastReviewedAt: "2026-01-01" },
			{ status: "published" },
			{ password: "secret" }
		])
			assert.equal(reviewScheduleChange.safeParse({ ...change, ...extra }).success, false);
		const decision = { revision: 0, fingerprint: "a".repeat(64), decision: "addressed", note: change.note };
		assert.ok(sourceNoticeDecision.safeParse(decision).success);
		for (const extra of [
			{ decision: "clear_warning" },
			{ citationStatus: "current" },
			{ fingerprint: "wrong" },
			{ note: " " }
		])
			assert.equal(sourceNoticeDecision.safeParse({ ...decision, ...extra }).success, false);
		assert.ok(readerFeedbackQuery.safeParse({ reviewId: "a".repeat(24) }).success);
		assert.equal(readerFeedbackQuery.safeParse({ reviewId: { $ne: null } }).success, false);
	});
	it("ties a handling decision to notice identity, not routine checks or link order", () => {
		const source = new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			kind: "landmark_study",
			title: "Source",
			citationStatus: "corrected",
			statusSources: ["https://example.org/a", "https://example.org/b"],
			stance: "supports"
		}).toObject();
		const snapshot = sourceNoticeSnapshot(source);
		const fingerprint = noticeFingerprint(snapshot);
		assert.equal(hasSourceNotice(snapshot), true);
		assert.equal(
			fingerprint,
			noticeFingerprint(
				sourceNoticeSnapshot({
					...source,
					citationCheckedAt: new Date(),
					statusSources: ["https://example.org/b", "https://example.org/a", "https://example.org/b"]
				})
			)
		);
		assert.notEqual(
			fingerprint,
			noticeFingerprint(
				sourceNoticeSnapshot({
					...source,
					statusSources: [...source.statusSources!, "https://example.org/new-notice"]
				})
			)
		);
		assert.notEqual(
			fingerprint,
			noticeFingerprint(sourceNoticeSnapshot({ ...source, citationStatus: "retracted" }))
		);
		source.evidenceProfile.publicationIntegrity.integrityNotes = "A new substantive publisher notice.";
		assert.notEqual(fingerprint, noticeFingerprint(sourceNoticeSnapshot(source)));
		source.citationStatus = "current";
		source.evidenceProfile.publicationIntegrity.retracted = true;
		assert.equal(hasSourceNotice(sourceNoticeSnapshot(source)), true);
		assert.equal(hasSourceNotice(sourceNoticeSnapshot({})), false);
	});
	it("hides private schedule history in ordinary model queries and every claim serializer", () => {
		assert.equal(Claim.schema.path("maintenance").options.select, false);
		const claim = new Claim({
			title: "A review",
			maintenance: {
				revision: 1,
				history: [
					{
						date: new Date(),
						adminId: new mongoose.Types.ObjectId(),
						previousAt: null,
						nextAt: null,
						note: "Private operational scheduling decision."
					}
				]
			}
		}).toObject();
		assert.doesNotMatch(JSON.stringify(toEditorialClaim(claim)), /maintenance|Private operational|adminId/);
		assert.doesNotMatch(JSON.stringify(toPublicClaim(claim)), /maintenance|Private operational|adminId/);
		for (const key of ["password", "session", "captchaToken", "authorization"])
			assert.throws(() => new SourceNoticeReview({ [key]: "must not persist" }), /strict mode/);
	});
});
