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
import { readerExpansionClaims } from "../back-end/dist/data/claim-expansion-reader.js";
import { seedClaims } from "../back-end/dist/data/seedClaims.js";
import { seedTopics } from "../back-end/dist/data/seedTopics.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { CoverageRequest } from "../back-end/dist/models/schemas/CoverageRequest.js";
import { SourcePublication } from "../back-end/dist/models/schemas/SourcePublication.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { APPROVED_READER_RELEASE, approvedReaderContentMatches, approvedReaderDraft } from "../back-end/dist/utils/approvedReaderPublication.js";
import { readerExpansionValueHash } from "../back-end/dist/utils/readerExpansionProposal.js";

const directory = mkdtempSync(join(tmpdir(), "consensus-content-first-"));
const databaseName = `content_first_${randomUUID().replaceAll("-", "")}`;
const children = new Set();
const logs = new Map();
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
	const child = spawn(executable, args, { cwd: directory, env, stdio: ["ignore", "pipe", "pipe"] });
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
	throw new Error(`Owned fixture readiness timed out: ${child ? logs.get(child) : "local disposable database"}`);
}
try {
	const configuredPort = process.env.READER_SMOKE_MONGO_PORT;
	assert.ok(!configuredPort || (/^[1-9]\d{0,4}$/u.test(configuredPort) && Number(configuredPort) <= 65535));
	const mongoPort = configuredPort ? Number(configuredPort) : await port();
	let mongo;
	if (!configuredPort) {
		const dbpath = join(directory, "mongo");
		mkdirSync(dbpath);
		mongo = start(process.env.MONGOD_BINARY || "/opt/homebrew/bin/mongod", ["--bind_ip", "127.0.0.1", "--port", String(mongoPort), "--dbpath", dbpath], { PATH: process.env.PATH });
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
	await seedTopics();
	await seedClaims();
	const expansion = await Claim.find({ slug: { $in: readerExpansionClaims.map(seed => seed.slug) } });
	assert.equal(expansion.length, 201);
	await ClaimSource.deleteMany({ claim: { $in: expansion.map(claim => claim._id) } });
	await Claim.deleteMany({ _id: { $in: expansion.map(claim => claim._id) } });
	assert.equal(await Claim.countDocuments({ status: "published" }), 800);
	const baseline = await Claim.findOne({ status: "published" });
	baseline.editorSummary = "Preserved human correction in an existing review.";
	await baseline.save();
	const baselineBefore = await Claim.findById(baseline._id).lean();
	const privateCollection = mongoose.connection.collection("users");
	const privateId = new mongoose.Types.ObjectId();
	await privateCollection.insertOne({ _id: privateId, name: "Private synthetic fixture", email: "fixture@example.invalid", passwordHash: "synthetic-unused", privateNote: "Must not enter public content" });
	const privateBefore = await privateCollection.findOne({ _id: privateId });
	const seed = readerExpansionClaims[0];
	const topic = await Topic.findOne({ slug: seed.topicSlug });
	const fields = approvedReaderDraft(seed, topic._id);
	const sourceIds = seed.sources.map(() => new mongoose.Types.ObjectId());
	const partial = await Claim.create(fields);
	await ClaimSource.create({ ...seed.sources[0], claim: partial._id, _id: sourceIds[0] });
	await SourcePublication.create({ key: `${seed.topicSlug}/${seed.slug}`, releaseId: APPROVED_READER_RELEASE, contentHash: readerExpansionValueHash({ fields, sources: seed.sources }), claimId: partial._id, sourceIds, coverageId: new mongoose.Types.ObjectId() });
	const backendPort = await port();
	const base = `http://127.0.0.1:${backendPort}`;
	const environment = { PATH: process.env.PATH, HOST: "127.0.0.1", PORT: String(backendPort), NODE_ENV: "production", MONGODB_URI: uri, SESSION_SECRET: randomUUID() + randomUUID(), CAPTCHA_SECRET: randomUUID() + randomUUID(), PUBLIC_SITE_URL: "https://isthereconsensus.org", DOTENV_CONFIG_PATH: join(directory, "no-env-file") };
	async function boot() {
		backend = start(process.execPath, [resolve("back-end/dist/server.js")], environment);
		await wait(async () => {
			try {
				return (await fetch(`${base}/healthz`, { signal: AbortSignal.timeout(1000) })).ok;
			}
			catch {
				return false;
			}
		}, backend);
		await wait(() => logs.get(backend).includes("Approved assistant-screened content release:"), backend);
	}
	await boot();
	assert.equal(await Claim.countDocuments({ status: "published" }), 1001, logs.get(backend));
	assert.equal(await SourcePublication.countDocuments({ state: "published" }), 201);
	assert.equal(await CoverageRequest.countDocuments({ visibility: "public", status: "published" }), 201);
	assert.deepEqual(await Claim.findById(baseline._id).lean(), baselineBefore);
	assert.deepEqual(await privateCollection.findOne({ _id: privateId }), privateBefore);
	assert.equal((await Claim.findById(partial._id)).status, "published");
	const identities = await SourcePublication.find().sort({ key: 1 }).lean();
	for (const definition of readerExpansionClaims) {
		const response = await fetch(`${base}/api/topics/${definition.topicSlug}/claims/${definition.slug}`, { redirect: "error", signal: AbortSignal.timeout(10000) });
		assert.equal(response.status, 200);
		const { claim } = await response.json();
		const expected = approvedReaderDraft(definition, claim.topic._id);
		delete expected.status;
		delete expected.changeLog;
		delete expected.surveillanceSpec;
		assert.equal(approvedReaderContentMatches({ ...claim, topic: claim.topic._id }, expected), true, definition.slug);
		assert.equal(claim.sources.length, definition.sources.length);
		for (const [index, source] of definition.sources.entries()) assert.equal(approvedReaderContentMatches(claim.sources[index], source), true, `${definition.slug}: citation ${index + 1}`);
		assert.equal(JSON.stringify(claim).includes("Must not enter public content"), false);
		assert.match(claim.reviewerLine, /independent expert review not completed/u);
	}
	await stop(backend);
	const approvedBefore = await Claim.find({ _id: { $in: identities.map(row => row.claimId) } }).sort({ _id: 1 }).lean();
	const sourcesBefore = await ClaimSource.find({ claim: { $in: identities.map(row => row.claimId) } }).sort({ _id: 1 }).lean();
	await boot();
	assert.deepEqual(await SourcePublication.find().sort({ key: 1 }).lean(), identities);
	assert.deepEqual(await Claim.find({ _id: { $in: identities.map(row => row.claimId) } }).sort({ _id: 1 }).lean(), approvedBefore);
	assert.deepEqual(await ClaimSource.find({ claim: { $in: identities.map(row => row.claimId) } }).sort({ _id: 1 }).lean(), sourcesBefore);
	await stop(backend);
	await Claim.updateOne({ _id: partial._id }, { $set: { status: "archived", bottomLine: "Withdrawn by human moderation." } });
	await CoverageRequest.updateOne({ _id: identities.find(row => row.claimId.equals(partial._id)).coverageId }, { $set: { visibility: "withdrawn" } });
	const moderatedBefore = await Claim.findById(partial._id).lean();
	const foreign = identities.find(row => !row.claimId.equals(partial._id));
	await SourcePublication.deleteOne({ _id: foreign._id });
	await Claim.updateOne({ _id: foreign.claimId }, { $set: { status: "draft", bottomLine: "Human-controlled unpublished draft." } });
	const foreignBefore = await Claim.findById(foreign.claimId).lean();
	await boot();
	assert.deepEqual(await Claim.findById(partial._id).lean(), moderatedBefore);
	assert.deepEqual(await Claim.findById(foreign.claimId).lean(), foreignBefore);
	assert.equal(await SourcePublication.countDocuments(), 200);
	assert.equal(await CoverageRequest.countDocuments({ visibility: "public" }), 200);
	assert.deepEqual(await privateCollection.findOne({ _id: privateId }), privateBefore);
	console.log("content-first smoke ok: production startup publishes all 201 exact reviews, resumes owned partials, preserves 461 citation identities and human withdrawals, and keeps private state unchanged");
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
