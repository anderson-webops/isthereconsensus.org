import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import mongoose from "mongoose";
import { readerExpansionClaims } from "../back-end/dist/data/claim-expansion-reader.js";
import { seedClaimFields } from "../back-end/dist/data/seedClaims.js";
import { Admin } from "../back-end/dist/models/schemas/Admin.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimRevision } from "../back-end/dist/models/schemas/ClaimRevision.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { CLAIM_NARRATIVE_FIELDS, CLAIM_NARRATIVE_MAX_ITEMS, CLAIM_NARRATIVE_MAX_LENGTH } from "../back-end/dist/utils/claimNarratives.js";

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
	for (const definition of readerExpansionClaims) {
		const content = claimContent(definition);
		const created = await write("/editorial/claims", { ...content, topic: definition.topicSlug, slug: definition.slug }, { method: "POST", status: 201 });
		const claimId = created.data.claim._id;
		const path = `/editorial/claims/${claimId}`;
		const publicPath = `/topics/${definition.topicSlug}/claims/${definition.slug}`;
		assert.equal(created.data.claim.status, "draft");
		assertContent(created.data.claim, content, `${definition.slug}: created content`);
		await api(publicPath, { status: 404 });
		if (snapshots.length === 0) {
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
		const sourceIds = [];
		for (const source of definition.sources) {
			const added = await write(`${path}/sources`, source, { method: "POST", status: 201 });
			sourceIds.push(String(added.data.source._id));
			assertContent(added.data.source, { ...source, url: new URL(source.url).href }, `${definition.slug}: citation`);
			sourceCount += 1;
		}
		const edited = await write(path, content);
		assert.equal(edited.data.claim.slug, definition.slug, `${definition.slug}: canonical slug changed`);
		assertContent(edited.data.claim, content, `${definition.slug}: edited content`);
		const publication = await write(`${path}/publish`, {
			revisionNote: "Isolated authenticated expansion rehearsal; source-verified qualifications retained.",
			lastReviewedAt: definition.searchCutoffAt
		}, { method: "POST" });
		assert.equal(publication.data.claim.status, "published");
		assertContent(publication.data.claim, content, `${definition.slug}: published content`);
		const publicClaim = (await api(publicPath)).data.claim;
		const publicContent = Object.fromEntries(Object.entries(content).filter(([key]) => key !== "surveillanceSpec"));
		assertContent(publicClaim, publicContent, `${definition.slug}: anonymous content`);
		assert.deepEqual(publicClaim.sources.map(source => String(source._id)), sourceIds);
		for (const [index, source] of definition.sources.entries()) assertContent(publicClaim.sources[index], { ...source, url: new URL(source.url).href }, `${definition.slug}: anonymous citation`);
		for (const field of ["reviewedBy", "maintenance", "surveillanceSpec"]) assert.equal(field in publicClaim, false);
		const stored = await Claim.findById(claimId).lean();
		assert.equal(String(stored.reviewedBy), String(admin._id));
		assert.equal(stored.reviewDateBasis, "editorial_review");
		assert.equal(stored.lastReviewedAt.toISOString(), definition.searchCutoffAt);
		assert.equal(stored.nextReviewAt.getTime() - stored.lastReviewedAt.getTime(), 180 * 86400000);
		const revisions = await ClaimRevision.find({ claim: claimId }).lean();
		assert.equal(revisions.length, definition.sources.length + 3);
		assert.ok(revisions.every(revision => revision.editorModel === "Admin" && String(revision.editor) === String(admin._id)));
		preservedLongItems += CLAIM_NARRATIVE_FIELDS.reduce((total, field) => total + definition[field].filter(item => item.length > 280).length, 0);
		snapshots.push({ definition, id: String(claimId), sourceIds, publishedAt: stored.publishedAt.toISOString(), updates: JSON.stringify(stored.readerUpdates) });
		if (snapshots.length % 25 === 0) console.log(`Authenticated expansion rehearsal: ${snapshots.length}/${readerExpansionClaims.length} exact publications passed.`);
	}
	assert.equal(sourceCount, 461);
	assert.equal(preservedLongItems, 277);
	await restartBackend();
	for (const snapshot of snapshots) {
		const stored = await Claim.findOne({ slug: snapshot.definition.slug }).lean();
		assert.equal(String(stored._id), snapshot.id);
		for (const field of CLAIM_NARRATIVE_FIELDS) assert.deepEqual(stored[field], snapshot.definition[field]);
		assert.equal(stored.publishedAt.toISOString(), snapshot.publishedAt);
		assert.equal(stored.lastReviewedAt.toISOString(), snapshot.definition.searchCutoffAt);
		assert.equal(JSON.stringify(stored.readerUpdates), snapshot.updates);
		assert.equal(await Claim.countDocuments({ topic: stored.topic, slug: stored.slug }), 1);
		const sources = await ClaimSource.find({ claim: stored._id }).sort({ order: 1, createdAt: 1 }).lean();
		assert.deepEqual(sources.map(source => String(source._id)), snapshot.sourceIds);
		const publicClaim = (await api(`/topics/${snapshot.definition.topicSlug}/claims/${snapshot.definition.slug}`)).data.claim;
		assert.equal(String(publicClaim._id), snapshot.id);
		for (const field of CLAIM_NARRATIVE_FIELDS) assert.deepEqual(publicClaim[field], snapshot.definition[field]);
	}
	assert.ok(isDeepStrictEqual(await Claim.find({ _id: { $in: unrelated.map(claim => claim._id) } }).sort({ _id: 1 }).lean(), unrelated), "Unrelated claim records changed.");
	assert.ok(isDeepStrictEqual(await ClaimSource.find({ _id: { $in: unrelatedSources.map(source => source._id) } }).sort({ _id: 1 }).lean(), unrelatedSources), "Unrelated citation records changed.");
	assert.ok(isDeepStrictEqual(await topicSnapshot(), topicsBefore), "Public topic identities or content changed.");
	assert.ok(isDeepStrictEqual(await privateSnapshot(), privateBefore), "Private collection records changed.");
	console.log("authenticated narrative workflow: 201 actual HTTP creations/edits/publications, 461 HTTP citations, 277 full-length items, explicit bounds, malformed/auth rejection without writes, legacy round trips, retained private state and restart-stable observed IDs passed in the disposable database");
}
