import assert from "node:assert/strict";
import { env } from "node:process";
import { describe, it } from "node:test";
import { ReaderFeedback } from "../src/models/schemas/ReaderFeedback.js";
import { verifyCaptcha } from "../src/utils/captcha.js";
import {
	feedbackSubmissionKey,
	readerFeedbackQuery,
	readerFeedbackReview,
	readerFeedbackSubmission
} from "../src/utils/readerFeedback.js";

describe("private reader feedback", () => {
	it("fails closed on missing production bot-check configuration or token", async () => {
		const originalMode = env.NODE_ENV;
		const originalSecret = env.CAPTCHA_SECRET;
		try {
			env.NODE_ENV = "production";
			delete env.CAPTCHA_SECRET;
			assert.equal((await verifyCaptcha(undefined)).ok, false);
			env.CAPTCHA_SECRET = "fixture-secret-never-sent";
			assert.equal((await verifyCaptcha(undefined)).ok, false);
		}
		finally {
			if (originalMode === undefined) {
				delete env.NODE_ENV;
			}
			else {
				env.NODE_ENV = originalMode;
			}
			if (originalSecret === undefined) {
				delete env.CAPTCHA_SECRET;
			}
			else {
				env.CAPTCHA_SECRET = originalSecret;
			}
		}
	});
	const claimId = "0123456789abcdef01234567";
	const rating = { kind: "usefulness" as const, claimId, helpful: true };
	const suggestion = {
		kind: "missing_evidence",
		claimId,
		area: "source",
		message: "Please evaluate this newer systematic review.",
		sourceUrl: "https://example.org/review"
	};
	it("accepts only explicit, bounded submission fields", () => {
		assert.ok(readerFeedbackSubmission.safeParse(rating).success);
		assert.ok(readerFeedbackSubmission.safeParse(suggestion).success);
		assert.ok(
			readerFeedbackSubmission.safeParse({
				kind: "content_gap",
				title: "Evidence about learning",
				message: suggestion.message
			}).success
		);
		for (const field of [
			"password",
			"session",
			"authorization",
			"email",
			"sourceIp",
			"userId",
			"query",
			"status",
			"priority",
			"reviews"
		]) {
			assert.equal(
				readerFeedbackSubmission.safeParse({ ...rating, [field]: "must not be recorded" }).success,
				false
			);
		}
		for (const message of ["short", "x".repeat(1201)])
			assert.equal(readerFeedbackSubmission.safeParse({ ...suggestion, message }).success, false);
	});
	it("rejects credentials and executable schemes in source links", () => {
		for (const sourceUrl of [
			"https://user:password@example.org",
			"javascript:alert(1)",
			"file:///private/data",
			"not a link"
		])
			assert.equal(readerFeedbackSubmission.safeParse({ ...suggestion, sourceUrl }).success, false);
	});
	it("bounds admin filters, revisions and required triage reasons", () => {
		assert.deepEqual(readerFeedbackQuery.parse({}), { page: 1, limit: 25 });
		for (const query of [
			{ page: 0 },
			{ limit: 101 },
			{ status: "publish" },
			{ priority: 3 },
			{ claimId: { $ne: null } },
			{ query: "private raw search" }
		])
			assert.equal(readerFeedbackQuery.safeParse(query).success, false);
		const review = {
			revision: 0,
			status: "planned",
			priority: 2,
			note: "Commission a review of this evidence.",
			linkedClaimId: claimId,
			linkedTopicId: null
		};
		assert.ok(readerFeedbackReview.safeParse(review).success);
		assert.equal(readerFeedbackReview.safeParse({ ...review, note: "" }).success, false);
		assert.equal(readerFeedbackReview.safeParse({ ...review, helpful: false }).success, false);
		assert.equal(readerFeedbackReview.safeParse({ ...review, revision: 1.5 }).success, false);
	});
	it("deduplicates usefulness without creating an across-topic/day tracking key", () => {
		const secret = "a".repeat(64);
		const now = new Date("2026-09-11T15:00:00Z");
		const key = feedbackSubmissionKey(secret, "192.0.2.1", rating, now);
		assert.match(key, /^[a-f\d]{64}$/);
		assert.equal(key, feedbackSubmissionKey(secret, "192.0.2.1", { ...rating, helpful: false }, now));
		assert.notEqual(key, feedbackSubmissionKey(secret, "192.0.2.1", rating, new Date("2026-09-12T00:00:00Z")));
		assert.notEqual(
			key,
			feedbackSubmissionKey(secret, "192.0.2.1", { ...rating, claimId: "abcdef0123456789abcdef01" }, now)
		);
		assert.notEqual(key, feedbackSubmissionKey(secret, "192.0.2.2", rating, now));
		assert.notEqual(key, feedbackSubmissionKey("b".repeat(64), "192.0.2.1", rating, now));
	});
	it("model refuses secret and raw tracking fields, and defines expiry", () => {
		for (const field of ["password", "captchaToken", "authorization", "sourceIp", "email", "session", "userAgent"])
			assert.throws(() => new ReaderFeedback({ [field]: "private" }), /strict mode/);
		assert.ok(
			ReaderFeedback.schema.indexes().some(([key, opts]) => "expiresAt" in key && opts.expireAfterSeconds === 0)
		);
		assert.equal(new ReaderFeedback().status, "new");
	});
});
