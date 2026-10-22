import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { appendFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import http from "node:http";
import { join, resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import mongoose from "mongoose";
import { claimsBeforeIntegrityCorrections } from "../back-end/dist/data/claims.js";
import { Admin } from "../back-end/dist/models/schemas/Admin.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { ContentRelease } from "../back-end/dist/models/schemas/ContentRelease.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { createEditorialAuditProposal } from "../back-end/dist/utils/editorialAuditProposal.js";
import { ownerCorrectionMatches, publishOwnerEditorialCorrections } from "../back-end/dist/utils/ownerContentRelease.js";

const root = resolve(import.meta.dirname, "..");
mkdirSync(join(root, ".ai-work/runs"), { recursive: true });
const directory = mkdtempSync(join(root, ".ai-work/runs/editorial-fixture-"));
const database = `editorial_fixture_${randomUUID().replaceAll("-", "")}`;
const container = `consensus-editorial-${randomUUID()}`;
const useDocker = process.argv.includes("--docker");
const children = [];
const password = randomUUID() + randomUUID();
let containerOwned = false;
let connected = false;
let ownsDatabase = false;
let logs = "";
let api;
appendFileSync(join(root, ".ai-work/INDEX.md"), `- ${directory.slice(root.length + 1)}: Owned disposable source-release fixture, synthetic data only; removed after child exit.\n`);

async function freePort() {
	const probe = http.createServer();
	probe.listen(0, "127.0.0.1");
	await once(probe, "listening");
	const port = probe.address().port;
	await new Promise(done => probe.close(done));
	return port;
}

function start(executable, args, env) {
	const child = spawn(executable, args, { cwd: root, env, stdio: ["ignore", "pipe", "pipe"] });
	children.push(child);
	child.on("error", (error) => {
		logs += error.message;
	});
	for (const stream of [child.stdout, child.stderr]) {
		stream.on("data", (data) => {
			logs = (logs + data.toString()).slice(-500_000);
		});
	}
	return child;
}

async function stop(child) {
	if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
	const exited = once(child, "exit");
	child.kill("SIGTERM");
	await Promise.race([exited, delay(8000)]);
	if (child.exitCode === null && child.signalCode === null) {
		child.kill("SIGKILL");
		await exited;
	}
}

async function waitFor(check, label) {
	const deadline = Date.now() + 40_000;
	while (Date.now() < deadline) {
		if (await check()) return;
		await delay(100);
	}
	throw new Error(`Timed out: ${label}`);
}

try {
	const mongoPort = await freePort();
	const replicaArgs = ["--replSet", "ownerEditorialSmoke", "--wiredTigerCacheSizeGB", "0.25"];
	if (useDocker) {
		execFileSync("docker", ["run", "--rm", "--detach", "--name", container, "--publish", `127.0.0.1:${mongoPort}:27017`, "mongo:8.0.34@sha256:4a4ab5d4834207389e0d7270fac988e21ffedccecba77991a552f755df229907", "--bind_ip_all", ...replicaArgs], { stdio: "pipe", timeout: 60000 });
		containerOwned = true;
	}
	else {
		mkdirSync(join(directory, "db"));
		start(process.env.MONGOD_BINARY || "/opt/homebrew/bin/mongod", ["--bind_ip", "127.0.0.1", "--port", String(mongoPort), "--dbpath", join(directory, "db"), ...replicaArgs], { PATH: process.env.PATH });
	}
	const uri = `mongodb://127.0.0.1:${mongoPort}/${database}?directConnection=true`;
	const inspector = new mongoose.mongo.MongoClient(uri, { serverSelectionTimeoutMS: 20000 });
	try {
		await inspector.connect();
		await inspector.db("admin").command({ replSetInitiate: { _id: "ownerEditorialSmoke", members: [{ _id: 0, host: `127.0.0.1:${useDocker ? 27017 : mongoPort}` }] } });
		await waitFor(async () => (await inspector.db("admin").command({ hello: 1 })).isWritablePrimary, "owned replica primary");
		assert.equal((await inspector.db(database).listCollections().toArray()).length, 0);
		ownsDatabase = true;
	}
	finally {
		await inspector.close();
	}
	await mongoose.connect(uri);
	connected = true;
	await ContentRelease.init();
	const admin = await Admin.create({ name: "Editorial Fixture", email: "editorial-fixture@example.invalid", password });
	const proposal = createEditorialAuditProposal({ commit: "a".repeat(40), tree: "b".repeat(40) });
	const fixtures = [];
	const reviewDate = new Date("2026-09-13T12:00:00Z");
	const nextDate = new Date("2026-12-01T12:00:00Z");
	for (const target of proposal.targets) {
		const [topicSlug, slug] = target.key.split("/");
		const topic = await Topic.findOneAndUpdate({ slug: topicSlug }, { $setOnInsert: { title: topicSlug, slug: topicSlug } }, { upsert: true, returnDocument: "after" });
		const claim = await Claim.create({ ...target.compatibleLegacyBaseline, topic: topic._id, slug, lastReviewedAt: reviewDate, reviewDateBasis: "source_record", nextReviewAt: nextDate, publishedAt: reviewDate });
		const sources = [];
		for (const source of target.expectedSources) sources.push(await ClaimSource.create({ ...source, claim: claim._id, citationStatus: "corrected", statusSources: ["Crossref", "https://example.org/retained-fixture-notice"], citationCheckedAt: reviewDate }));
		const baseline = claimsBeforeIntegrityCorrections.find(value => value.topicSlug === topicSlug && value.slug === slug);
		assert.equal(ownerCorrectionMatches(claim.toObject(), sources.map(source => source.toObject()), baseline), true, `Synthetic baseline did not match: ${target.key}`);
		fixtures.push({ target, claim, sources });
	}
	const rollbackId = fixtures[0].claim._id;
	const rollbackBaseline = JSON.stringify({ claim: await Claim.findById(rollbackId).lean(), sources: await ClaimSource.find({ claim: rollbackId }).sort({ order: 1, _id: 1 }).lean() });
	const saveReceipt = ContentRelease.prototype.save;
	ContentRelease.prototype.save = async function (...args) {
		if (this.key === fixtures[0].target.key) throw new Error("Injected fixture-only receipt failure.");
		return saveReceipt.apply(this, args);
	};
	try {
		assert.deepEqual(await publishOwnerEditorialCorrections(), { published: 4, preserved: 0, conflicts: 0, failed: 1 });
	}
	finally {
		ContentRelease.prototype.save = saveReceipt;
	}
	assert.equal(JSON.stringify({ claim: await Claim.findById(rollbackId).lean(), sources: await ClaimSource.find({ claim: rollbackId }).sort({ order: 1, _id: 1 }).lean() }), rollbackBaseline, "Late failure must roll back both article and citation writes.");
	assert.equal(await ContentRelease.countDocuments({ key: fixtures[0].target.key }), 0);
	const port = await freePort();
	const base = `http://127.0.0.1:${port}/api`;
	api = start(process.execPath, ["back-end/dist/server.js"], {
		PATH: process.env.PATH,
		NODE_ENV: "production",
		HOST: "127.0.0.1",
		PORT: String(port),
		MONGODB_URI: uri,
		SESSION_SECRET: randomUUID() + randomUUID(),
		CAPTCHA_SECRET: randomUUID(),
		PUBLIC_SITE_URL: "https://editorial-fixture.invalid",
		TRUST_PROXY_IPS: "127.0.0.1,::1",
		DOTENV_CONFIG_PATH: join(directory, "no-environment-file")
	});
	await waitFor(async () => {
		try {
			return (await fetch(base.replace(/\/api$/, "/readyz"))).ok;
		}
		catch { return false; }
	}, "isolated backend");
	await waitFor(async () => await ContentRelease.countDocuments({ releaseId: "owner-content-first-editorial-2026-10-21" }) === fixtures.length, "automatic owner content release");
	const headers = { "content-type": "application/json", "origin": "https://editorial-fixture.invalid", "x-forwarded-proto": "https" };
	assert.equal((await fetch(`${base}/editorial/claims/${fixtures[0].claim._id}`, { headers })).status, 403);
	const login = await fetch(`${base}/auth/login`, { method: "POST", headers, body: JSON.stringify({ email: admin.email, password }) });
	assert.equal(login.status, 200);
	const cookie = login.headers.getSetCookie().map(value => value.split(";")[0]).join("; ");
	assert.ok(cookie.includes(".sig="));
	const blocked = await fetch(`${base}/editorial/claims/${fixtures[0].claim._id}`, { method: "PATCH", headers: { ...headers, cookie }, body: JSON.stringify({ bottomLine: "Unapproved direct edit." }) });
	assert.equal(blocked.status, 403, "Existing published-content edit protection must remain enabled.");
	for (const { target, claim, sources } of fixtures) {
		const response = await fetch(base + target.publicApiPath.replace(/^\/api/, ""));
		assert.equal(response.status, 200);
		const published = (await response.json()).claim;
		assert.equal(published.title, target.proposedFields.title);
		assert.equal(published.bottomLine, target.proposedFields.bottomLine);
		assert.equal(published.sources.length, target.proposedSources.length);
		const persisted = await Claim.findById(claim._id).lean();
		assert.equal(persisted.lastReviewedAt.toISOString(), reviewDate.toISOString());
		assert.equal(persisted.nextReviewAt.toISOString(), nextDate.toISOString());
		assert.equal(persisted.reviewedBy, undefined);
		for (const source of sources) {
			const retained = await ClaimSource.findById(source._id).lean();
			assert.equal(retained.claim.toString(), claim._id.toString());
			assert.equal(retained.citationStatus, "corrected");
			assert.equal(retained.citationCheckedAt.toISOString(), reviewDate.toISOString());
			assert.deepEqual(retained.statusSources, ["Crossref", "https://example.org/retained-fixture-notice"]);
		}
	}
	const beforeReplay = JSON.stringify(await Claim.find({ _id: { $in: fixtures.map(value => value.claim._id) } }).sort({ _id: 1 }).lean());
	assert.deepEqual(await publishOwnerEditorialCorrections(), { published: 0, preserved: 5, conflicts: 0, failed: 0 });
	assert.equal(JSON.stringify(await Claim.find({ _id: { $in: fixtures.map(value => value.claim._id) } }).sort({ _id: 1 }).lean()), beforeReplay);
	await Claim.updateOne({ _id: fixtures[0].claim._id }, { $set: { bottomLine: "Later human correction retained." } });
	await publishOwnerEditorialCorrections();
	assert.equal((await Claim.findById(fixtures[0].claim._id)).bottomLine, "Later human correction retained.");
	assert.equal(logs.includes(password), false);
	console.log(JSON.stringify({ accepted: true, fixtureOnly: true, automaticallyPublished: fixtures.length, legacyCitationsPreserved: fixtures.reduce((sum, fixture) => sum + fixture.sources.length, 0), addedCitations: 2, editProtectionsPreserved: true, privateRollbackReceipts: 5, lateFailureRollbackVerified: true, sourceIdsAndNoticesPreserved: true, datesAndSchedulesPreserved: true, replayReadOnly: true, laterHumanEditPreserved: true, passwordAbsentFromLogs: true }));
}
finally {
	if (api) await stop(api);
	if (connected) {
		if (ownsDatabase) await mongoose.connection.dropDatabase();
		await mongoose.disconnect();
	}
	for (const child of children.reverse()) await stop(child);
	if (containerOwned) execFileSync("docker", ["rm", "--force", container], { stdio: "pipe", timeout: 30000 });
	assert.ok(children.every(child => !child.pid || child.exitCode !== null || child.signalCode !== null));
	rmSync(directory, { recursive: true, force: true });
	appendFileSync(join(root, ".ai-work/INDEX.md"), `- Removed owned source-release fixture ${directory.slice(root.length + 1)} after verified child exit.\n`);
}
