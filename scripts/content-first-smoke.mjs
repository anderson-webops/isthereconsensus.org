import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import http from "node:http";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import mongoose from "mongoose";
import { catalogExpansionClaims, catalogExpansionReleases } from "../back-end/dist/data/catalogExpansion.js";
import { readerExpansionClaims } from "../back-end/dist/data/claim-expansion-reader.js";
import { seedClaims } from "../back-end/dist/data/seedClaims.js";
import { seedTopics } from "../back-end/dist/data/seedTopics.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { CoverageRequest } from "../back-end/dist/models/schemas/CoverageRequest.js";
import { SourcePublication } from "../back-end/dist/models/schemas/SourcePublication.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { APPROVED_READER_RELEASE, approvedReaderContentMatches, approvedReaderDraft, publishApprovedReaderContent } from "../back-end/dist/utils/approvedReaderPublication.js";
import { publishCatalogExpansion } from "../back-end/dist/utils/catalogExpansionPublication.js";
import { readerExpansionValueHash } from "../back-end/dist/utils/readerExpansionProposal.js";
import { fetchWithReadLimit } from "./lib/read-limit-retry.mjs";
import { snapshotRetainedDatabase } from "./lib/retained-database-snapshot.mjs";

const directory = mkdtempSync(join(tmpdir(), "consensus-content-first-"));
const databaseName = `content_first_${randomUUID().replaceAll("-", "")}`;
const children = new Set();
const logs = new Map();
const publicationClaims = [
	...readerExpansionClaims,
	...catalogExpansionClaims
];
const publishedTotal = 800 + publicationClaims.length;
let backend;
let owned = false;
async function port() {
	const probe = http.createServer();
	probe.listen(0, "127.0.0.1");
	await once(probe, "listening");
	const number = probe.address().port;
	await new Promise(done => probe.close(done));
	return number;
}
function start(executable, args, env) {
	const child = spawn(executable, args, {
		cwd: directory,
		env,
		stdio: ["ignore", "pipe", "pipe"]
	});
	children.add(child);
	logs.set(child, "");
	for (const stream of [child.stdout, child.stderr]) stream.on("data", bytes => logs.set(child, (logs.get(child) + bytes).slice(-6000)));
	return child;
}
async function stop(child) {
	if (!child || child.exitCode !== null || child.signalCode !== null) return;
	const exited = once(child, "exit");
	child.kill("SIGTERM");
	const timer = setTimeout(() => child.kill("SIGKILL"), 8000);
	try {
		await exited;
	}
	finally {
		clearTimeout(timer);
	}
}
async function wait(check, child) {
	const deadline = Date.now() + 90000;
	while (Date.now() < deadline) {
		if (child && (child.exitCode !== null || child.signalCode !== null)) throw new Error(`Owned fixture exited: ${logs.get(child)}`);
		if (await check()) return;
		await delay(100);
	}
	throw new Error(`Owned fixture readiness timed out: ${child
		? logs.get(child)
		: "local disposable database"}`);
}
async function databaseSnapshot() {
	return snapshotRetainedDatabase(mongoose.connection.db, mongoose.mongo.BSON.EJSON.serialize);
}
async function publishReviewedContent() {
	const approved = await publishApprovedReaderContent();
	const expansion = await publishCatalogExpansion();
	assert.equal(approved.failed, 0);
	assert.equal(expansion.failed, 0);
}
try {
	const configuredPort = process.env.READER_SMOKE_MONGO_PORT;
	assert.ok(!configuredPort || (/^[1-9]\d{0,4}$/u.test(configuredPort) && Number(configuredPort) <= 65535));
	const mongoPort = configuredPort
		? Number(configuredPort)
		: await port();
	let mongo;
	if (!configuredPort) {
		const dbpath = join(directory, "mongo");
		mkdirSync(dbpath);
		mongo = start(process.env.MONGOD_BINARY || "/opt/homebrew/bin/mongod", [
			"--bind_ip",
			"127.0.0.1",
			"--port",
			String(mongoPort),
			"--dbpath",
			dbpath
		], { PATH: process.env.PATH });
	}
	const uri = `mongodb://127.0.0.1:${mongoPort}/${databaseName}`;
	await wait(async () => {
		const client = new mongoose.mongo.MongoClient(uri, { serverSelectionTimeoutMS: 300 });
		try {
			await client.connect();
			assert.equal(await client.db(databaseName).listCollections().hasNext(), false, "Test database must be new.");
			return true;
		}
		catch {
			return false;
		}
		finally {
			await client.close();
		}
	}, mongo);
	await mongoose.connect(uri, { serverSelectionTimeoutMS: 1000 });
	assert.equal(mongoose.connection.name, databaseName);
	owned = true;
	await SourcePublication.init();
	await Promise.all(mongoose.modelNames().map(name => mongoose.model(name).init()));
	await seedTopics();
	await seedClaims();
	const expansion = await Claim.find({
		slug: {
			$in: publicationClaims.map(seed => seed.slug)
		}
	});
	assert.equal(expansion.length, publicationClaims.length);
	await ClaimSource.deleteMany({
		claim: {
			$in: expansion.map(claim => claim._id)
		}
	});
	await Claim.deleteMany({
		_id: {
			$in: expansion.map(claim => claim._id)
		}
	});
	const absentTopicSlugs = [];
	for (const topicId of new Set(expansion.map(claim => String(claim.topic)))) {
		if (await Claim.countDocuments({ topic: topicId })) continue;
		const topic = await Topic.findById(topicId);
		assert.ok(topic);
		absentTopicSlugs.push(topic.slug);
		await Topic.deleteOne({ _id: topic._id });
	}
	assert.ok(absentTopicSlugs.includes("animal-behavior-and-welfare"));
	assert.ok(absentTopicSlugs.includes("work-and-organizations"));
	assert.ok(absentTopicSlugs.includes("consumer-choices"));
	assert.ok(absentTopicSlugs.includes("language-and-communication"));
	assert.ok(absentTopicSlugs.includes("arts-and-creativity"));
	assert.ok(absentTopicSlugs.includes("weather-and-forecasting"));
	assert.ok(absentTopicSlugs.includes("family-and-child-development"));
	assert.ok(absentTopicSlugs.includes("vision-and-hearing"));
	assert.equal(await Claim.countDocuments({ status: "published" }), 800);
	const baseline = await Claim.findOne({ status: "published" });
	baseline.editorSummary = "Preserved human correction in an existing review.";
	await baseline.save();
	const baselineBefore = await Claim.findById(baseline._id).lean();
	const privateCollection = mongoose.connection.collection("users");
	const privateId = new mongoose.Types.ObjectId();
	await privateCollection.insertOne({
		_id: privateId,
		name: "Private synthetic fixture",
		email: "fixture@example.invalid",
		passwordHash: "synthetic-unused",
		privateNote: "Must not enter public content"
	});
	const privateBefore = await privateCollection.findOne({ _id: privateId });
	await mongoose.connection.db.collection("questions").insertOne({
		_id: new mongoose.Types.ObjectId(),
		title: "Retained legacy question without a routing migration",
		privateNote: "Synthetic routing state must remain unchanged"
	});
	const retained = await mongoose.connection.db.createCollection("retained_private_fixture", {
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["marker"],
				properties: {
					marker: { bsonType: "string" }
				}
			}
		},
		validationLevel: "strict",
		validationAction: "error"
	});
	await retained.createIndex({ marker: 1 }, { name: "retained_unique_marker", unique: true });
	await retained.insertOne({
		marker: "protected",
		payload: {
			visibility: "private",
			value: new mongoose.Types.ObjectId()
		}
	});
	const preservedFixture = await databaseSnapshot();
	await retained.updateOne({ marker: "protected" }, {
		$set: { changed: true }
	});
	assert.notDeepEqual(await databaseSnapshot(), preservedFixture, "Snapshot must detect document mutations.");
	await retained.updateOne({ marker: "protected" }, {
		$unset: { changed: "" }
	});
	await retained.createIndex({ "payload.visibility": 1 }, { name: "synthetic_changed_index" });
	assert.notDeepEqual(await databaseSnapshot(), preservedFixture, "Snapshot must detect index mutations.");
	await retained.dropIndex("synthetic_changed_index");
	await mongoose.connection.db.command({ collMod: "retained_private_fixture", validationLevel: "moderate" });
	assert.notDeepEqual(await databaseSnapshot(), preservedFixture, "Snapshot must detect collection-option mutations.");
	await mongoose.connection.db.command({ collMod: "retained_private_fixture", validationLevel: "strict" });
	await mongoose.connection.db.createCollection("synthetic_added_collection");
	assert.notDeepEqual(await databaseSnapshot(), preservedFixture, "Snapshot must detect new collections.");
	await mongoose.connection.db.dropCollection("synthetic_added_collection");
	assert.deepEqual(await databaseSnapshot(), preservedFixture, "Negative controls must restore the exact retained fixture.");
	const seed = readerExpansionClaims[0];
	const topic = await Topic.findOne({ slug: seed.topicSlug });
	const fields = approvedReaderDraft(seed, topic._id);
	const sourceIds = seed.sources.map(() => new mongoose.Types.ObjectId());
	const partial = await Claim.create(fields);
	await ClaimSource.create({ ...seed.sources[0], claim: partial._id, _id: sourceIds[0] });
	await SourcePublication.create({
		key: `${seed.topicSlug}/${seed.slug}`,
		releaseId: APPROVED_READER_RELEASE,
		contentHash: readerExpansionValueHash({ fields, sources: seed.sources }),
		claimId: partial._id,
		sourceIds,
		coverageId: new mongoose.Types.ObjectId()
	});
	const backendPort = await port();
	const base = `http://127.0.0.1:${backendPort}`;
	const environment = {
		PATH: process.env.PATH,
		HOST: "127.0.0.1",
		PORT: String(backendPort),
		NODE_ENV: "production",
		MONGODB_URI: uri,
		SESSION_SECRET: randomUUID() + randomUUID(),
		CAPTCHA_SECRET: randomUUID() + randomUUID(),
		PUBLIC_SITE_URL: "https://isthereconsensus.org",
		DOTENV_CONFIG_PATH: join(directory, "no-env-file")
	};
	async function boot() {
		const retainedState = await databaseSnapshot();
		backend = start(process.execPath, [
			resolve("back-end/dist/server.js")
		], environment);
		await wait(async () => {
			try {
				return (await fetch(`${base}/healthz`, {
					signal: AbortSignal.timeout(1000)
				})).ok;
			}
			catch {
				return false;
			}
		}, backend);
		assert.equal((await fetch(`${base}/readyz`)).status, 200);
		await delay(1500);
		assert.deepEqual(await databaseSnapshot(), retainedState, "Production startup must preserve every retained document, collection option and index.");
	}
	await boot();
	await stop(backend);
	await publishReviewedContent();
	await boot();
	for (const slug of absentTopicSlugs) assert.equal(await Topic.countDocuments({ slug }), 1);
	assert.equal(await Claim.countDocuments({ status: "published" }), publishedTotal, logs.get(backend));
	assert.equal(await SourcePublication.countDocuments({ state: "published", releaseId: APPROVED_READER_RELEASE }), 201);
	for (const release of catalogExpansionReleases) assert.equal(await SourcePublication.countDocuments({ state: "published", releaseId: release.id }), release.claims.length);
	assert.equal(await SourcePublication.countDocuments({ state: "published" }), publicationClaims.length);
	assert.equal(await CoverageRequest.countDocuments({ visibility: "public", status: "published" }), publicationClaims.length);
	assert.deepEqual(await Claim.findById(baseline._id).lean(), baselineBefore);
	assert.deepEqual(await privateCollection.findOne({ _id: privateId }), privateBefore);
	assert.equal((await Claim.findById(partial._id)).status, "published");
	const identities = await SourcePublication.find().sort({ key: 1 }).lean();
	for (const definition of publicationClaims) {
		const response = await fetchWithReadLimit(() => fetch(`${base}/api/topics/${definition.topicSlug}/claims/${definition.slug}`, {
			redirect: "error",
			signal: AbortSignal.timeout(10000)
		}));
		assert.equal(response.status, 200);
		const { claim } = await response.json();
		const expected = approvedReaderDraft(definition, claim.topic._id);
		delete expected.status;
		delete expected.changeLog;
		delete expected.surveillanceSpec;
		assert.equal(approvedReaderContentMatches({ ...claim, topic: claim.topic._id }, expected), true, definition.slug);
		assert.equal(claim.sources.length, definition.sources.length);
		if (catalogExpansionClaims.includes(definition)) assert.equal((await CoverageRequest.findOne({ claimId: claim._id })).summary, claim.editorSummary);
		for (const [index, source] of definition.sources.entries()) assert.equal(approvedReaderContentMatches(claim.sources[index], source), true, `${definition.slug}: citation ${index + 1}`);
		assert.equal(JSON.stringify(claim).includes("Must not enter public content"), false);
		assert.match(claim.reviewerLine, /independent expert review not completed/u);
	}
	await stop(backend);
	const approvedBefore = await Claim.find({
		_id: {
			$in: identities.map(row => row.claimId)
		}
	}).sort({ _id: 1 }).lean();
	const sourcesBefore = await ClaimSource.find({
		claim: {
			$in: identities.map(row => row.claimId)
		}
	}).sort({ _id: 1 }).lean();
	await publishReviewedContent();
	await boot();
	assert.deepEqual(await SourcePublication.find().sort({ key: 1 }).lean(), identities);
	assert.deepEqual(await Claim.find({
		_id: {
			$in: identities.map(row => row.claimId)
		}
	}).sort({ _id: 1 }).lean(), approvedBefore);
	assert.deepEqual(await ClaimSource.find({
		claim: {
			$in: identities.map(row => row.claimId)
		}
	}).sort({ _id: 1 }).lean(), sourcesBefore);
	await stop(backend);
	await Claim.updateOne({ _id: partial._id }, {
		$set: { status: "archived", bottomLine: "Withdrawn by human moderation." }
	});
	await CoverageRequest.updateOne({ _id: identities.find(row => row.claimId.equals(partial._id)).coverageId }, {
		$set: { visibility: "withdrawn" }
	});
	const moderatedBefore = await Claim.findById(partial._id).lean();
	const foreign = identities.find(row => row.releaseId === APPROVED_READER_RELEASE && !row.claimId.equals(partial._id));
	await SourcePublication.deleteOne({ _id: foreign._id });
	await Claim.updateOne({ _id: foreign.claimId }, {
		$set: { status: "draft", bottomLine: "Human-controlled unpublished draft." }
	});
	const foreignBefore = await Claim.findById(foreign.claimId).lean();
	const heldAdditions = [];
	for (const release of catalogExpansionReleases) {
		const addition = identities.find(row => row.releaseId === release.id);
		assert.ok(addition);
		await Claim.updateOne({ _id: addition.claimId }, {
			$set: { status: "archived", bottomLine: "New review withdrawn by human moderation." }
		});
		await CoverageRequest.updateOne({ _id: addition.coverageId }, {
			$set: { visibility: "withdrawn" }
		});
		const additionBefore = await Claim.findById(addition.claimId).lean();
		const foreignAddition = identities.find(row => row.releaseId === release.id && !row._id.equals(addition._id));
		assert.ok(foreignAddition);
		await SourcePublication.deleteOne({ _id: foreignAddition._id });
		await Claim.updateOne({ _id: foreignAddition.claimId }, {
			$set: { status: "draft", bottomLine: "Human-controlled new unpublished draft." }
		});
		const foreignAdditionBefore = await Claim.findById(foreignAddition.claimId).lean();
		heldAdditions.push({
			addition,
			additionBefore,
			foreignAddition,
			foreignAdditionBefore
		});
	}
	await publishReviewedContent();
	await boot();
	assert.deepEqual(await Claim.findById(partial._id).lean(), moderatedBefore);
	assert.deepEqual(await Claim.findById(foreign.claimId).lean(), foreignBefore);
	for (const held of heldAdditions) {
		assert.deepEqual(await Claim.findById(held.addition.claimId).lean(), held.additionBefore);
		assert.deepEqual(await Claim.findById(held.foreignAddition.claimId).lean(), held.foreignAdditionBefore);
	}
	assert.equal(await SourcePublication.countDocuments(), publicationClaims.length - 1 - heldAdditions.length);
	assert.equal(await CoverageRequest.countDocuments({ visibility: "public" }), publicationClaims.length - 1 - heldAdditions.length);
	assert.deepEqual(await privateCollection.findOne({ _id: privateId }), privateBefore);
	console.log(`content-first smoke ok: explicit publication handles all ${publicationClaims.length} exact reviews and ${1 + heldAdditions.length} cohorts; production startup and restarts preserve every collection, document, option and index; citation identities, human withdrawals and private state remain intact`);
}
finally {
	await stop(backend);
	if (owned && mongoose.connection.readyState === 1) {
		assert.equal(mongoose.connection.name, databaseName);
		await mongoose.connection.dropDatabase();
	}
	await mongoose.disconnect();
	for (const child of children) await stop(child);
	rmSync(directory, { recursive: true, force: true });
}
