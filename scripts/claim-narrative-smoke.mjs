import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import mongoose from "mongoose";
import { readerExpansionClaims } from "../back-end/dist/data/claim-expansion-reader.js";
import { defaultClaims } from "../back-end/dist/data/claims.js";
import { seedClaimFields } from "../back-end/dist/data/seedClaims.js";
import { Admin } from "../back-end/dist/models/schemas/Admin.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimRevision } from "../back-end/dist/models/schemas/ClaimRevision.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { CLAIM_NARRATIVE_FIELDS, CLAIM_NARRATIVE_MAX_ITEMS, CLAIM_NARRATIVE_MAX_LENGTH } from "../back-end/dist/utils/claimNarratives.js";
import { createReaderExpansionSourceProposal, readerExpansionValueHash } from "../back-end/dist/utils/readerExpansionProposal.js";
import { createReaderExpansionEditorialApi, prepareReaderExpansionEditorialPlan, publishReaderExpansionEditorialPlan } from "../back-end/dist/utils/readerExpansionPublication.js";

function assertContent(actual, expected, label) {
	if (expected === undefined) return;
	if (expected instanceof Date) return assert.equal(actual, expected.toISOString(), label);
	if (Array.isArray(expected)) {
		assert.ok(Array.isArray(actual), label);
		assert.equal(actual.length, expected.length, label);
		for (const [index, item] of expected.entries()) assertContent(actual[index], item, `${label}[${index}]`);
		return;
	}
	if (expected !== null && typeof expected === "object") {
		assert.ok(actual && typeof actual === "object", label);
		for (const [key, item] of Object.entries(expected)) assertContent(actual[key], item, `${label}.${key}`);
		return;
	}
	assert.equal(actual, expected, label);
}

function claimContent(seed) {
	return Object.fromEntries(Object.entries(seedClaimFields(seed)).filter(([key]) => key !== "status" && key !== "changeLog"));
}

async function privateSnapshot() {
	const mutable = new Set([Claim.collection.name, ClaimSource.collection.name, ClaimRevision.collection.name, Topic.collection.name]);
	const collections = await mongoose.connection.db.listCollections({}, { nameOnly: true }).toArray();
	const snapshot = new Map();
	for (const { name } of collections.filter(collection => !mutable.has(collection.name))) {
		snapshot.set(name, await mongoose.connection.db.collection(name).find({}).sort({ _id: 1 }).toArray());
	}
	return snapshot;
}

function topicSnapshot() {
	return Topic.find({}).select("-updatedAt").sort({ _id: 1 }).lean();
}

export async function checkClaimNarratives({ api, base, adminCookie, userCookie, restartBackend }) {
	assert.match(base, /^http:\/\/127\.0\.0\.1:/);
	assert.match(mongoose.connection.name, /^reader_library_smoke_[a-f\d]{32}$/);
	assert.equal(readerExpansionClaims.length, 201);
	const admin = await Admin.findOne({ email: "editor@example.test" }).lean();
	assert.ok(admin);
	const seed = readerExpansionClaims[0];
	const topic = await Topic.findOne({ slug: seed.topicSlug }).lean();
	assert.ok(topic);
	const privateBefore = await privateSnapshot();
	const topicsBefore = await topicSnapshot();
	const owned = [];
	const write = (path, body, options = {}) => api(path, { method: "PATCH", cookie: adminCookie, retryRateLimit: true, body, ...options });
	try {
		const slug = `narrative-bounds-${randomUUID()}`;
		const fullBounds = Object.fromEntries(CLAIM_NARRATIVE_FIELDS.map(field => [field, Array.from({ length: CLAIM_NARRATIVE_MAX_ITEMS }, () => "x".repeat(CLAIM_NARRATIVE_MAX_LENGTH))]));
		const body = { ...claimContent(seed), topic: topic.slug, slug, ...fullBounds };
		const initialCount = await Claim.countDocuments();
		const initialRevisions = await ClaimRevision.countDocuments();
		for (const cookie of [undefined, userCookie]) await write("/editorial/claims", body, { method: "POST", cookie, status: 403 });
		assert.equal(await Claim.countDocuments(), initialCount);
		assert.equal(await ClaimRevision.countDocuments(), initialRevisions);
		const created = await write("/editorial/claims", body, { method: "POST", status: 201 });
		owned.push(created.data.claim._id);
		assertContent(created.data.claim, fullBounds, "exact create bounds");
		const path = `/editorial/claims/${created.data.claim._id}`;
		const unchanged = await Claim.findById(created.data.claim._id).lean();
		const unchangedRevisions = await ClaimRevision.countDocuments();
		for (const cookie of [undefined, userCookie]) await write(path, { stableCore: ["Unauthorized replacement"] }, { cookie, status: 403 });
		for (const field of CLAIM_NARRATIVE_FIELDS) {
			for (const value of [null, "Not a list", ["Valid text", 7], ["Private content " + "x".repeat(CLAIM_NARRATIVE_MAX_LENGTH)], Array.from({ length: CLAIM_NARRATIVE_MAX_ITEMS + 1 }, () => "Extra item")]) {
				const invalid = { title: "Must not persist", ...fullBounds, [field]: value };
				for (const [destination, method] of [[path, "PATCH"], ["/editorial/claims", "POST"]]) {
					const result = await write(destination, { ...body, ...invalid, slug: `rejected-${randomUUID()}` }, { method, status: 400 });
					assert.ok(!result.data.error.includes("Private content"));
				}
			}
		}
		assert.deepEqual(await Claim.findById(created.data.claim._id).lean(), unchanged);
		assert.equal(await Claim.countDocuments(), initialCount + 1);
		assert.equal(await ClaimRevision.countDocuments(), unchangedRevisions);
		assertContent((await write(path, fullBounds)).data.claim, fullBounds, "exact edit bounds");
		const roundTrip = await write(path, { title: body.title, ...fullBounds });
		assert.equal(roundTrip.data.claim.slug, slug, "An unchanged title must retain its custom canonical slug.");
		assertContent(roundTrip.data.claim, fullBounds, "full unchanged-title round trip");
		assert.equal((await write(path, { title: "Renamed narrative fixture" })).data.claim.slug, "renamed-narrative-fixture");
		const explicitSlug = `explicit-narrative-${randomUUID()}`;
		assert.equal((await write(path, { title: "Explicit narrative fixture", slug: explicitSlug })).data.claim.slug, explicitSlug);

		const legacyText = "  " + "Retained legacy explanation. ".repeat(50) + "  ";
		const legacy = await Claim.create({ ...seedClaimFields(seed), status: "draft", topic: topic._id, slug: `legacy-narrative-${randomUUID()}`, stableCore: [legacyText, "Original short item"], openQuestions: Array.from({ length: CLAIM_NARRATIVE_MAX_ITEMS + 1 }, () => "Retained legacy question") });
		owned.push(legacy._id);
		const legacyPath = `/editorial/claims/${legacy._id}`;
		await write(legacyPath, { editorSummary: "An unrelated draft edit." });
		const legacyFields = { stableCore: [...legacy.stableCore], openQuestions: [...legacy.openQuestions] };
		assertContent((await write(legacyPath, legacyFields)).data.claim, legacyFields, "legacy round trip");
		assertContent((await write(legacyPath, { stableCore: [legacyText, "Changed bounded point"] })).data.claim, { stableCore: [legacyText, "Changed bounded point"] }, "retained legacy paragraph");
		const legacyUnchanged = await Claim.findById(legacy._id).lean();
		const legacyRevisionCount = await ClaimRevision.countDocuments({ claim: legacy._id });
		await write(legacyPath, { stableCore: [legacyText + "Altered"] }, { status: 400 });
		assert.deepEqual(await Claim.findById(legacy._id).lean(), legacyUnchanged);
		assert.equal(await ClaimRevision.countDocuments({ claim: legacy._id }), legacyRevisionCount);
		await write(legacyPath, { misconceptions: [] });
		assert.deepEqual((await Claim.findById(legacy._id).lean()).stableCore, legacyUnchanged.stableCore);
	}
	finally {
		await ClaimRevision.deleteMany({ claim: { $in: owned } });
		await Claim.deleteMany({ _id: { $in: owned } });
	}

	const targets = await Claim.find({ slug: { $in: readerExpansionClaims.map(claim => claim.slug) } }).select("_id slug").lean();
	assert.equal(targets.length, readerExpansionClaims.length);
	const targetIds = targets.map(claim => claim._id);
	assert.equal(await ClaimRevision.countDocuments({ claim: { $in: targetIds } }), 0);
	const unrelated = await Claim.find({ _id: { $nin: targetIds } }).sort({ _id: 1 }).lean();
	const unrelatedSources = await ClaimSource.find({ claim: { $nin: targetIds } }).sort({ _id: 1 }).lean();
	await ClaimSource.deleteMany({ claim: { $in: targetIds } });
	await Claim.deleteMany({ _id: { $in: targetIds } });
	const snapshots = [];
	let sourceCount = 0;
	let preservedLongItems = 0;
	const assessmentDate = new Date();
	const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
	const proposal = createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, { commit: git("rev-parse", "HEAD"), tree: git("rev-parse", "HEAD^{tree}") }, assessmentDate);
	let requests = 0;
	let writes = 0;
	const editorialApi = createReaderExpansionEditorialApi(base, adminCookie, base, async (url, options) => {
		requests += 1;
		if (options.method !== "GET") writes += 1;
		return fetch(url, options);
	});
	const plan = await prepareReaderExpansionEditorialPlan(proposal, editorialApi);
	assert.ok(plan.rows.every(row => row.status === "missing"));
	assert.equal(writes, 0);
	const approval = {
		sourceCommit: proposal.sourceCommit,
		planSha256: readerExpansionValueHash(plan),
		backupSha256: "a".repeat(64),
		restoreVerificationSha256: "b".repeat(64),
		rehearsalReceiptSha256: "c".repeat(64),
		backendArtifactSha256: "d".repeat(64),
		operatorApprovalRef: "Synthetic isolated authenticated expansion rehearsal; not actual backup or production authorization.",
		reviewedAt: assessmentDate.toISOString()
	};
	const events = [];
	const batch = await publishReaderExpansionEditorialPlan(proposal, plan, approval, editorialApi, async (event) => {
		events.push(event);
		if (event.state !== "confirmed") return;
		const definition = readerExpansionClaims.find(item => event.canonicalPath === `/consensus/${item.topicSlug}/${item.slug}`);
		assert.ok(definition);
		const claimId = event.claimId;
		const path = `/editorial/claims/${claimId}`;
		if (event.operation === "create" && snapshots.length === 0) {
			await api(`/topics/${definition.topicSlug}/claims/${definition.slug}`, { status: 404 });
			const incomplete = await Claim.findById(claimId).lean();
			const revisionCount = await ClaimRevision.countDocuments({ claim: claimId });
			await write(`${path}/publish`, { revisionNote: "Incomplete fixture must not publish" }, { method: "POST", status: 422 });
			for (const invalid of [{ url: "javascript:alert(1)" }, { url: "Crossref" }, { statusSources: ["Invented provenance"] }]) {
				await write(`${path}/sources`, { ...definition.sources[0], ...invalid }, { method: "POST", status: 400 });
			}
			assert.deepEqual(await Claim.findById(claimId).lean(), incomplete);
			assert.equal(await ClaimRevision.countDocuments({ claim: claimId }), revisionCount);
			assert.equal(await ClaimSource.countDocuments({ claim: claimId }), 0);
		}
		if (event.operation !== "readback") return;
		const content = claimContent(definition);
		const publicClaim = (await api(`/topics/${definition.topicSlug}/claims/${definition.slug}`)).data.claim;
		const sourceIds = events.filter(item => item.state === "confirmed" && item.operation === "source" && item.claimId === claimId).map(item => item.sourceId);
		const publicContent = Object.fromEntries(Object.entries(content).filter(([key]) => key !== "surveillanceSpec"));
		assertContent(publicClaim, publicContent, `${definition.slug}: anonymous content`);
		assert.deepEqual(publicClaim.sources.map(source => String(source._id)), sourceIds);
		for (const [index, source] of definition.sources.entries()) assertContent(publicClaim.sources[index], { ...source, url: new URL(source.url).href }, `${definition.slug}: anonymous citation`);
		for (const field of ["reviewedBy", "maintenance", "surveillanceSpec"]) assert.equal(field in publicClaim, false);
		const stored = await Claim.findById(claimId).lean();
		assert.equal(String(stored.reviewedBy), String(admin._id));
		assert.equal(stored.reviewDateBasis, "editorial_review");
		assert.equal(stored.lastReviewedAt.toISOString(), assessmentDate.toISOString());
		assert.equal(stored.searchCutoffAt.toISOString(), definition.searchCutoffAt);
		assert.equal(stored.nextReviewAt.getTime() - stored.lastReviewedAt.getTime(), 180 * 86400000);
		const revisions = await ClaimRevision.find({ claim: claimId }).lean();
		assert.equal(revisions.length, definition.sources.length + 3);
		assert.ok(revisions.every(revision => revision.editorModel === "Admin" && String(revision.editor) === String(admin._id)));
		preservedLongItems += CLAIM_NARRATIVE_FIELDS.reduce((total, field) => total + definition[field].filter(item => item.length > 280).length, 0);
		sourceCount += sourceIds.length;
		snapshots.push({ definition, id: String(claimId), sourceIds, publishedAt: stored.publishedAt.toISOString(), updates: JSON.stringify(stored.readerUpdates) });
		if (snapshots.length % 25 === 0) console.log(`Authenticated expansion rehearsal: ${snapshots.length}/${readerExpansionClaims.length} exact publications passed.`);
	});
	assert.equal(batch.canonicalReviews, 201);
	assert.equal(batch.orderedCitations, 461);
	assert.equal(batch.fullPrivateStatePreservationVerified, false);
	assert.equal(batch.renderedPagesVerified, false);
	assert.equal(events.filter(event => event.state === "pending").length, 1064);
	assert.equal(sourceCount, 461);
	assert.equal(preservedLongItems, 277);
	await restartBackend();
	for (const snapshot of snapshots) {
		const stored = await Claim.findOne({ slug: snapshot.definition.slug }).lean();
		assert.equal(String(stored._id), snapshot.id);
		for (const field of CLAIM_NARRATIVE_FIELDS) assert.deepEqual(stored[field], snapshot.definition[field]);
		assert.equal(stored.publishedAt.toISOString(), snapshot.publishedAt);
		assert.equal(stored.lastReviewedAt.toISOString(), assessmentDate.toISOString());
		assert.equal(stored.searchCutoffAt.toISOString(), snapshot.definition.searchCutoffAt);
		assert.equal(JSON.stringify(stored.readerUpdates), snapshot.updates);
		assert.equal(await Claim.countDocuments({ topic: stored.topic, slug: stored.slug }), 1);
		const sources = await ClaimSource.find({ claim: stored._id }).sort({ order: 1, createdAt: 1 }).lean();
		assert.deepEqual(sources.map(source => String(source._id)), snapshot.sourceIds);
		const publicClaim = (await api(`/topics/${snapshot.definition.topicSlug}/claims/${snapshot.definition.slug}`)).data.claim;
		assert.equal(String(publicClaim._id), snapshot.id);
		for (const field of CLAIM_NARRATIVE_FIELDS) assert.deepEqual(publicClaim[field], snapshot.definition[field]);
	}
	const publishedBefore = await Claim.find({ _id: { $in: snapshots.map(row => row.id) } }).sort({ _id: 1 }).lean();
	const publishedSourcesBefore = await ClaimSource.find({ claim: { $in: snapshots.map(row => row.id) } }).sort({ _id: 1 }).lean();
	const matchingPlan = await prepareReaderExpansionEditorialPlan(proposal, editorialApi);
	const writesBefore = writes;
	const repeated = await publishReaderExpansionEditorialPlan(proposal, matchingPlan, { ...approval, planSha256: readerExpansionValueHash(matchingPlan) }, editorialApi, async (event) => {
		assert.equal(event.operation, "readback");
	});
	assert.ok(repeated.results.every(row => row.disposition === "already_matching"));
	assert.equal(writes, writesBefore);
	assert.deepEqual(await Claim.find({ _id: { $in: snapshots.map(row => row.id) } }).sort({ _id: 1 }).lean(), publishedBefore);
	assert.deepEqual(await ClaimSource.find({ claim: { $in: snapshots.map(row => row.id) } }).sort({ _id: 1 }).lean(), publishedSourcesBefore);
	assert.ok(isDeepStrictEqual(await Claim.find({ _id: { $in: unrelated.map(claim => claim._id) } }).sort({ _id: 1 }).lean(), unrelated), "Unrelated claim records changed.");
	assert.ok(isDeepStrictEqual(await ClaimSource.find({ _id: { $in: unrelatedSources.map(source => source._id) } }).sort({ _id: 1 }).lean(), unrelatedSources), "Unrelated citation records changed.");
	assert.ok(isDeepStrictEqual(await topicSnapshot(), topicsBefore), "Public topic identities or content changed.");
	assert.ok(isDeepStrictEqual(await privateSnapshot(), privateBefore), "Private collection records changed.");
	console.log(`authenticated operator batch: ${requests} real requests, 201 HTTP creations/edits/publications, 461 HTTP citations, 277 full-length items, explicit bounds, malformed/auth rejection without writes, legacy round trips, retained private state, restart-stable observed IDs and read-only matching-publication replay passed in the disposable database`);
}
