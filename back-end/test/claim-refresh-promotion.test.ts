import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Types } from "mongoose";
import { seedClaimFields, seedReviewDates } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { canonicalRefreshJSON, planClaimRefresh, refreshDigest, registeredRefreshes } from "../src/utils/claimRefreshPromotion.js";

const fixtureRefreshes = registeredRefreshes.filter(entry => [
	"nutrition-and-diet/are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk",
	"nutrition-and-diet/does-saturated-fat-still-raise-ldl-and-heart-risk"
].includes(entry.key));
assert.equal(fixtureRefreshes.length, 2);

function fixture(index = 0, definition = fixtureRefreshes[index]!) {
	const claim = new Claim({ ...seedClaimFields(definition.before), ...seedReviewDates(definition.before), slug: definition.before.slug, topic: new Types.ObjectId(), publishedAt: new Date("2026-04-11T12:00:00Z") });
	const snapshot = JSON.parse(canonicalRefreshJSON({
		key: definition.key,
		claim: claim.toObject(),
		sources: definition.before.sources.map(source => new ClaimSource({ ...source, claim: claim._id }).toObject())
	}));
	return { definition, snapshot, plan: () => planClaimRefresh(snapshot, definition.before, definition.after) };
}

describe("scoped evidence promotion planning", () => {
	it("updates all registered reviews without rewriting review dates, schedules, histories or source IDs", async () => {
		for (const definition of registeredRefreshes) {
			const { snapshot, plan } = fixture(0, definition);
			snapshot.claim.changeLog.push({ date: "2026-09-01T00:00:00Z", kind: "update", summary: "Earlier editorial history retained." });
			snapshot.claim.maintenance = { revision: 4, history: [] };
			const before = canonicalRefreshJSON(snapshot);
			const result = await plan();
			assert.equal(canonicalRefreshJSON(snapshot), before);
			assert.equal(result.sources.length, definition.after.sources.length);
			assert.deepEqual(result.sources.filter(source => source.id).map(source => source.id), snapshot.sources.map((source: { _id: string }) => source._id));
			for (const field of ["lastReviewedAt", "reviewDateBasis", "publishedAt", "reviewedBy", "nextReviewAt", "maintenance", "changeLog", "readerUpdates", "evidenceLandscape"]) assert.equal(Object.hasOwn(result.claimSet, field), false, field);
			assert.equal(result.historyAppend.length, 1);
			assert.equal(result.announcement.kind, "evidence_update");
		}
	});
	it("requires the complete live scientific baseline and source identity set", async () => {
		for (const mutate of [
			(value: ReturnType<typeof fixture>) => { value.snapshot.claim.bottomLine = "Editorial change."; },
			(value: ReturnType<typeof fixture>) => { value.snapshot.sources[0].note = "A reviewed source note."; },
			(value: ReturnType<typeof fixture>) => { value.snapshot.sources[0].doi = "10.1234/different"; },
			(value: ReturnType<typeof fixture>) => { value.snapshot.sources.pop(); },
			(value: ReturnType<typeof fixture>) => { value.snapshot.sources.push(value.snapshot.sources[0]); }
		]) {
			const value = fixture();
			mutate(value);
			await assert.rejects(value.plan, /diverg|source set|Duplicate/);
		}
	});
	it("preserves newer check dates and notices, and never clears unaddressed warnings", async () => {
		const value = fixture(1);
		const live = value.snapshot.sources[2];
		live.citationCheckedAt = "2026-09-13T01:00:00.000Z";
		live.citationStatus = "corrected";
		live.statusSources = ["https://example.org/existing-notice"];
		live.evidenceProfile.publicationIntegrity.correctionOrErratum = true;
		const update = (await value.plan()).sources.find(source => source.id === live._id)!;
		assert.equal(update.set.citationCheckedAt, live.citationCheckedAt);
		assert.ok((update.set.statusSources as string[]).includes(live.statusSources[0]));
		assert.equal(update.set.evidenceProfile, undefined);
		live.evidenceProfile.publicationIntegrity.retracted = true;
		await assert.rejects(value.plan, /stronger live warning/);
		live.evidenceProfile.publicationIntegrity.retracted = false;
		live.evidenceProfile.publicationIntegrity.predatoryOrQuestionableVenue = true;
		await assert.rejects(value.plan, /venue warning/);
	});
	it("preserves draft extraction but refuses active reviewed scientific coding", async () => {
		const value = fixture();
		value.snapshot.sources[0].evidenceProfile.extraction.keyFinding = "Existing coded finding.";
		value.snapshot.sources[0].integrityMonitoring = { europepmc: { doi: value.snapshot.sources[0].doi, outcome: "corrected", attemptedAt: "2026-09-01T00:00:00Z", retryAt: "2026-10-01T00:00:00Z" } };
		assert.equal((await value.plan()).sources[0]!.set.evidenceProfile, undefined);
		assert.equal((await value.plan()).sources[0]!.set.integrityMonitoring, undefined);
		value.snapshot.sources[0].evidenceProfile.reviewer.reviewedAt = "2026-09-01T00:00:00Z";
		await assert.rejects(value.plan, /Reviewed source coding/);
		const approved = fixture();
		approved.snapshot.claim.evidenceLandscape.workflow.status = "approved";
		await assert.rejects(approved.plan, /active landscape review/);
	});
	it("fingerprints object IDs, private progress, revision changes and semantic content independently of key order", async () => {
		const original = { _id: "a", __v: 1, integrityMonitoring: { crossref: { outcome: "checked" } }, text: "first" };
		assert.equal(refreshDigest(original), refreshDigest({ text: "first", integrityMonitoring: original.integrityMonitoring, __v: 1, _id: "a" }));
		for (const patch of [{ _id: "b" }, { __v: 2 }, { integrityMonitoring: {} }, { text: "second" }]) assert.notEqual(refreshDigest(original), refreshDigest({ ...original, ...patch }));
	});
	it("refuses hidden reviews and an announcement that already exists without a receipt", async () => {
		const value = fixture();
		value.snapshot.claim.status = "needs_update";
		await assert.rejects(value.plan, /already-published/);
		value.snapshot.claim.status = "published";
		value.snapshot.claim.readerUpdates = [value.definition.after.readerAnnouncement];
		await assert.rejects(value.plan, /Announcement already exists/);
	});
});
