import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CoverageRequest } from "../src/models/schemas/CoverageRequest.js";
import { adminCoverageQuery, coverageChange, coverageDraft, coverageQuery, coverageTransition, publicCoverageRequest } from "../src/utils/coverageRoadmap.js";

const draft = {
	title: "Does spaced practice improve long-term learning?",
	summary: "Compare retention after spaced and massed practice, with explicit limits for different subjects and learners.",
	status: "planned" as const,
	topicId: null,
	claimId: null,
	privateNote: "Private editorial rationale must never be public."
};
const change = { ...draft, revision: 0, operation: "save" as const, publicSummaryApproved: false, publicUpdateSummary: "" };

describe("moderated coverage roadmap", () => {
	it("requires a separately written bounded draft and refuses publication flags", () => {
		assert.ok(coverageDraft.safeParse(draft).success);
		for (const extra of [{ visibility: "public" }, { adminId: "spoofed" }, { message: "private original" }, { publicHistory: [] }, { password: "secret" }]) {
			assert.equal(coverageDraft.safeParse({ ...draft, ...extra }).success, false);
		}
		for (const data of [{ ...draft, title: "short" }, { ...draft, summary: "short" }, { ...draft, summary: "x".repeat(1201) }, { ...draft, privateNote: "" }, { ...draft, feedbackId: "invalid" }]) assert.equal(coverageDraft.safeParse(data).success, false);
	});
	it("requires explicit public approval on first approval and every public edit", () => {
		assert.deepEqual(coverageTransition("draft", change), { ok: true, visibility: "draft" });
		assert.equal(coverageTransition("draft", { ...change, operation: "approve" }).ok, false);
		assert.equal(coverageTransition("public", change).ok, false);
		assert.equal(coverageTransition("draft", { ...change, operation: "approve", publicSummaryApproved: true }).ok, false);
		const approved = { ...change, publicSummaryApproved: true, publicUpdateSummary: "Approved research scope for the public roadmap." };
		assert.deepEqual(coverageTransition("draft", { ...approved, operation: "approve" }), { ok: true, visibility: "public" });
		assert.deepEqual(coverageTransition("public", approved), { ok: true, visibility: "public" });
		assert.deepEqual(coverageTransition("public", { ...change, operation: "withdraw" }), { ok: true, visibility: "withdrawn" });
		assert.deepEqual(coverageTransition("withdrawn", change), { ok: true, visibility: "withdrawn" });
	});
	it("requires a canonical answer for published status and bounds revisions and queries", () => {
		assert.equal(coverageChange.safeParse({ ...change, status: "published" }).success, false);
		assert.ok(coverageChange.safeParse({ ...change, status: "published", claimId: "a".repeat(24) }).success);
		for (const revision of [-1, 1.5, Number.MAX_SAFE_INTEGER]) assert.equal(coverageChange.safeParse({ ...change, revision }).success, false);
		assert.deepEqual(coverageQuery.parse({}), { page: 1, limit: 20 });
		for (const query of [{ page: 0 }, { page: 201 }, { limit: 51 }, { visibility: "draft" }, { status: { $ne: null } }, { feedbackId: "f".repeat(64) }]) assert.equal(coverageQuery.safeParse(query).success, false);
		assert.ok(adminCoverageQuery.safeParse({ visibility: "draft" }).success);
	});
	it("serializes only approved public fields, never raw feedback or audit notes", () => {
		const row = {
			...draft,
			_id: "a".repeat(24),
			status: "published",
			feedbackId: "f".repeat(64),
			audit: [{ adminId: "private-admin", note: draft.privateNote }],
			publicUpdatedAt: new Date("2026-10-04T12:00:00Z"),
			publicHistory: [{ date: new Date("2026-10-04T12:00:00Z"), status: "published", summary: "The reviewed answer is now available." }]
		};
		const result = publicCoverageRequest(row, { title: "Learning", slug: "learning" }, { title: "A reviewed answer", slug: "spaced-practice", topic: { slug: "learning" } });
		assert.deepEqual(Object.keys(result), ["_id", "title", "summary", "status", "updatedAt", "topic", "answer", "answerUnavailable", "history"]);
		assert.equal(result.answer?.path, "/consensus/learning/spaced-practice");
		assert.equal(result.answerUnavailable, false);
		assert.doesNotMatch(JSON.stringify(result), /feedbackId|privateNote|private-admin|editorial rationale|audit/);
		assert.equal(publicCoverageRequest(row, null, null).answerUnavailable, true);
		assert.equal(publicCoverageRequest({ ...row, status: "researching" }, null, { title: "Not ready", slug: "answer", topic: { slug: "learning" } }).answer, null);
	});
	it("keeps new model records private and rejects unsolicited secret fields", () => {
		assert.equal(new CoverageRequest({ title: draft.title, summary: draft.summary }).visibility, "draft");
		assert.equal(new CoverageRequest().revision, 0);
		for (const field of ["password", "session", "sourceIp", "captchaToken", "authorization", "email", "message"])
			assert.throws(() => new CoverageRequest({ [field]: "must not be recorded" }), /strict mode/);
		assert.ok(CoverageRequest.schema.indexes().some(([keys]) => "visibility" in keys && "publicUpdatedAt" in keys));
	});
});
