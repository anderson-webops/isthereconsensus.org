// Owns fresh loopback databases only. Never reads .env or accepts a database URI.
import assert from "node:assert/strict";
import { execFile, execFileSync, spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { once } from "node:events";
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import net from "node:net";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import mongoose from "mongoose";
import { seedClaimFields, seedReviewDates } from "../back-end/dist/data/seedClaims.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimRefreshPromotion } from "../back-end/dist/models/schemas/ClaimRefreshPromotion.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { applyClaimRefreshes, canonicalRefreshJSON, prepareClaimRefreshes, refreshDigest, registeredRefreshes } from "../back-end/dist/utils/claimRefreshPromotion.js";

const fixtureRefreshes = registeredRefreshes;
assert.ok(fixtureRefreshes.length >= 2 && fixtureRefreshes.length <= 20);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: root, encoding: "utf8" }).trim(), root);
const exclude = resolve(root, execFileSync("git", ["rev-parse", "--git-path", "info/exclude"], { cwd: root, encoding: "utf8" }).trim());
if (!readFileSync(exclude, "utf8").split("\n").includes("/.ai-work/")) appendFileSync(exclude, "\n/.ai-work/\n");
execFileSync("git", ["check-ignore", ".ai-work/test"], { cwd: root });
mkdirSync(join(root, ".ai-work/runs"), { recursive: true });
const directory = mkdtempSync(join(root, ".ai-work/runs/claim-refresh-promotion-"));
const index = join(root, ".ai-work/INDEX.md");
const entry = `- \`${directory.slice(root.length + 1)}/\`: Owned disposable promotion-test database and CLI fixtures, clean source baseline ${execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: root, encoding: "utf8" }).trim()}, reviewed ${new Date().toISOString()}, owner claim-refresh-promotion-smoke. Removed when this process exits.\n`;
appendFileSync(index, entry);
const execute = promisify(execFile);
const image = "mongo:8.0@sha256:4a0f30875898413139bec44c73c02a05fed172578de65b644dcdcee143ae7306";
const useDocker = process.argv.includes("--docker");
const selected = fixtureRefreshes.map(entry => entry.key);
const approval = plan => ({ planSha256: refreshDigest(plan), backupSha256: "a".repeat(64), operatorNote: "Owned fixture backup and content review for integration testing only." });
let checks = 0;

async function freePort() {
	const server = net.createServer();
	server.listen(0, "127.0.0.1");
	await once(server, "listening");
	const port = server.address().port;
	await new Promise(done => server.close(done));
	return port;
}
async function waitFor(check, label) {
	const deadline = Date.now() + 30_000;
	while (Date.now() < deadline) {
		if (await check()) return;
		await delay(100);
	}
	throw new Error(`Timed out: ${label}`);
}
async function snapshot() {
	const data = {};
	for (const collection of await mongoose.connection.db.listCollections().toArray()) {
		data[collection.name] = await mongoose.connection.db.collection(collection.name).find().sort({ _id: 1 }).toArray();
	}
	return canonicalRefreshJSON(data);
}
async function fixture() {
	const topics = new Map();
	for (const definition of fixtureRefreshes) {
		const slug = definition.before.topicSlug;
		if (!topics.has(slug)) topics.set(slug, await Topic.create({ slug, title: `Owned ${slug} test topic` }));
		const topic = topics.get(slug);
		const claim = await Claim.create({ ...seedClaimFields(definition.before), ...seedReviewDates(definition.before), slug: definition.before.slug, topic: topic._id, publishedAt: new Date("2026-04-11T12:00:00Z"), maintenance: { revision: 3, history: [{ date: new Date("2026-09-01T00:00:00Z"), adminId: new mongoose.Types.ObjectId(), previousAt: null, nextAt: new Date("2026-11-01T00:00:00Z"), note: "A retained operator scheduling note." }] } });
		for (const source of definition.before.sources) {
			const row = await ClaimSource.create({ ...source, claim: claim._id });
			await ClaimSource.updateOne({ _id: row._id }, { $set: {
				"evidenceProfile.extraction.keyFinding": "Retained draft extraction from the same source.",
				...(source.doi ? { "integrityMonitoring.crossref": { doi: source.doi, attemptedAt: new Date("2026-09-01T00:00:00Z"), checkedAt: new Date("2026-09-01T00:00:00Z"), outcome: "no_registered_update", retryAt: new Date("2026-10-01T00:00:00Z") } } : {})
			} }, { runValidators: true });
			// Opaque editorial records must stay byte-for-byte untouched by promotion.
			await mongoose.connection.db.collection("sourcenoticereviews").insertOne({ _id: row._id, claim: claim._id, decision: "addressed", revision: 3, history: [{ note: "Fixture editorial decision" }] });
		}
	}
	await Claim.create({ ...seedClaimFields(fixtureRefreshes[0].before), ...seedReviewDates(fixtureRefreshes[0].before), slug: "unrelated-editorial-review", topic: topics.get(fixtureRefreshes[0].before.topicSlug)._id, publishedAt: new Date("2026-04-11T12:00:00Z") });
	await mongoose.connection.db.collection("readerfeedbacks").insertOne({ privateMessage: "Fixture reader evidence request stays private." });
}
async function run(mode) {
	const port = await freePort();
	const path = join(directory, mode);
	mkdirSync(path);
	const container = `consensus-promotion-${randomUUID()}`;
	let child;
	let containerOwned = false;
	let output = "";
	try {
		const args = ["--bind_ip_all", "--wiredTigerCacheSizeGB", "0.25", ...(mode === "replica" ? ["--replSet", "promotionSmoke"] : [])];
		if (useDocker) {
			await execute("docker", ["run", "--rm", "--detach", "--name", container, "--publish", `127.0.0.1:${port}:27017`, image, ...args], { timeout: 60_000 });
			containerOwned = true;
		} else {
			const executable = [process.env.MONGOD_BINARY, "/opt/homebrew/bin/mongod", "/usr/bin/mongod"].find(value => value && existsSync(value));
			assert.ok(executable, "Install a local mongod or pass --docker for an owned CI container.");
			child = spawn(executable, ["--bind_ip", "127.0.0.1", "--port", String(port), "--dbpath", path, "--wiredTigerCacheSizeGB", "0.25", ...(mode === "replica" ? ["--replSet", "promotionSmoke"] : [])], { stdio: ["ignore", "pipe", "pipe"] });
			child.on("error", error => { output = error.message; });
			for (const stream of [child.stdout, child.stderr]) stream.on("data", data => { output = (output + data).slice(-4000); });
		}
		const database = `claim_refresh_smoke_${randomUUID().replaceAll("-", "")}`;
		const uri = `mongodb://127.0.0.1:${port}/${database}?directConnection=true`;
		const client = new mongoose.mongo.MongoClient(uri, { serverSelectionTimeoutMS: 300 });
		try {
			await waitFor(async () => {
				if (child && (child.exitCode !== null || child.signalCode !== null)) throw new Error(output);
				const probe = new mongoose.mongo.MongoClient(uri, { serverSelectionTimeoutMS: 300 });
				try { await probe.db().command({ ping: 1 }); return true; } catch { return false; }
				finally { await probe.close(); }
			}, "owned Mongo readiness");
			if (mode === "replica") {
				await client.db("admin").command({ replSetInitiate: { _id: "promotionSmoke", members: [{ _id: 0, host: `127.0.0.1:${useDocker ? 27017 : port}` }] } });
				await waitFor(async () => (await client.db("admin").command({ hello: 1 })).isWritablePrimary, "owned replica primary");
			}
		} finally { await client.close(); }
		await mongoose.connect(uri, { autoCreate: false, autoIndex: false, serverSelectionTimeoutMS: 1000 });
		assert.equal(mongoose.connection.name, database);
		assert.equal(await mongoose.connection.db.listCollections().hasNext(), false);
		await fixture();
		const initial = await snapshot();
		let plan = await prepareClaimRefreshes(selected);
		assert.equal(await snapshot(), initial, "Preview must not write or create audit collections");
		checks++;
		if (mode === "standalone") {
			await assert.rejects(applyClaimRefreshes(plan, approval(plan)), /transaction support/);
			assert.equal(await snapshot(), initial);
			checks++;
			return;
		}
		await assert.rejects(prepareClaimRefreshes([]));
		await assert.rejects(prepareClaimRefreshes([selected[0], selected[0]]), /Duplicate/);
		await assert.rejects(prepareClaimRefreshes(["unknown/review"]), /Unregistered/);
		checks++;
		const injected = structuredClone(plan);
		injected.changes[0].claimSet.bottomLine = "Unreviewed injection";
		await assert.rejects(applyClaimRefreshes(injected, approval(plan)), /digest/);
		await assert.rejects(applyClaimRefreshes(injected, approval(injected)), /changed after preview/);
		const stale = { ...plan, preparedAt: "2020-01-01T00:00:00.000Z" };
		await assert.rejects(applyClaimRefreshes(stale, approval(stale)), /stale/);
		assert.equal(await snapshot(), initial);
		checks++;
		const monitored = plan.before.flatMap(before => before.sources).find(source => source.integrityMonitoring?.crossref?.doi);
		assert.ok(monitored, "The monitor-race fixture needs a source with a DOI.");
		const sourceId = monitored._id;
		await ClaimSource.updateOne({ _id: sourceId }, { $set: { "evidenceProfile.extraction.keyFinding": "Newer draft coding after preview." } });
		await assert.rejects(applyClaimRefreshes(plan, approval(plan)), /changed after preview/);
		checks++;
		plan = await prepareClaimRefreshes(selected);
		const cli = resolve(root, "back-end/dist/scripts/promoteClaimRefreshes.js");
		const planPath = join(path, "reviewed-plan.json");
		const preview = await execute(process.execPath, [cli, "--preview", ...selected.flatMap(key => ["--review", key]), "--plan", planPath], { env: { PATH: process.env.PATH, MONGODB_URI: uri }, timeout: 20_000 });
		assert.equal(statSync(planPath).mode & 0o077, 0);
		plan = JSON.parse(readFileSync(planPath, "utf8"));
		assert.equal(JSON.parse(preview.stdout).planSha256, refreshDigest(plan));
		const backupPath = join(path, "fixture-backup.txt");
		writeFileSync(backupPath, "Fixture only, not a production backup.", { mode: 0o600 });
		const backupHash = createHash("sha256").update(readFileSync(backupPath)).digest("hex");
		const cliArgs = [cli, "--apply", "--plan", planPath, "--plan-sha256", refreshDigest(plan), "--backup-file", backupPath, "--backup-sha256", "0".repeat(64), "--operator-note", "Test fixture restore and review only."];
		await assert.rejects(execute(process.execPath, cliArgs, { env: { PATH: process.env.PATH, MONGODB_URI: uri }, timeout: 20_000 }), /backup digest/);
		checks++;
		// Fail at the final receipt, after all selected reviews and sources were written in the transaction.
		await mongoose.connection.db.createCollection("claimrefreshpromotions", { validator: { actorType: { $eq: "rejected-fixture-actor" } } });
		const beforeRollback = await snapshot();
		await assert.rejects(applyClaimRefreshes(plan, approval(plan)), /validation/);
		assert.equal(await snapshot(), beforeRollback, "Late failure must roll back the entire multi-review batch");
		await mongoose.connection.db.command({ collMod: "claimrefreshpromotions", validator: {} });
		checks++;
		// Simulate a monitor update after the transaction's snapshot, without bumping __v.
		const originalUpdate = ClaimSource.updateOne;
		let injectedRace = false;
		ClaimSource.updateOne = async function (...args) {
			if (!injectedRace) {
				injectedRace = true;
				await ClaimSource.collection.updateOne({ _id: new mongoose.Types.ObjectId(sourceId) }, { $set: { "integrityMonitoring.crossref.outcome": "transient_error" } });
			}
			return originalUpdate.apply(this, args);
		};
		try { await assert.rejects(applyClaimRefreshes(plan, approval(plan)), /changed after preview/); }
		finally { ClaimSource.updateOne = originalUpdate; }
		assert.equal(await ClaimRefreshPromotion.countDocuments(), 0);
		assert.equal(await ClaimSource.countDocuments(), fixtureRefreshes.reduce((sum, row) => sum + row.before.sources.length, 0));
		checks++;
		plan = await prepareClaimRefreshes(selected);
		const untouchedBefore = await Claim.findOne({ slug: "unrelated-editorial-review" }).lean();
		const privateBefore = canonicalRefreshJSON(await mongoose.connection.db.collection("sourcenoticereviews").find().toArray());
		const feedbackBefore = canonicalRefreshJSON(await mongoose.connection.db.collection("readerfeedbacks").find().toArray());
		const results = await Promise.all([applyClaimRefreshes(plan, { ...approval(plan), backupSha256: backupHash }), applyClaimRefreshes(plan, { ...approval(plan), backupSha256: backupHash })]);
		assert.deepEqual(results.map(value => value.status).sort(), ["already_applied", "applied"]);
		assert.equal(await ClaimRefreshPromotion.countDocuments(), 1);
		for (const before of plan.before) {
			const current = await Claim.findById(before.claim._id).select("+maintenance").lean();
			const definition = fixtureRefreshes.find(value => value.key === before.key);
			assert.equal(current.bottomLine, definition.after.bottomLine);
			for (const field of ["lastReviewedAt", "reviewDateBasis", "publishedAt", "nextReviewAt", "maintenance", "evidenceLandscape"]) assert.equal(canonicalRefreshJSON(current[field] ?? null), canonicalRefreshJSON(before.claim[field] ?? null), field);
			assert.equal(current.changeLog.length, before.claim.changeLog.length + 1);
			assert.equal(current.readerUpdates.filter(value => value.id === definition.after.readerAnnouncement.id).length, 1);
			assert.equal(current.readerUpdates[0].date.toISOString(), results[0].appliedAt.toISOString());
			const sources = await ClaimSource.find({ claim: current._id }).select("+integrityMonitoring").sort({ order: 1 }).lean();
			assert.equal(sources.length, definition.after.sources.length);
			for (const original of before.sources) {
				const source = sources.find(value => String(value._id) === original._id);
				assert.ok(source, "Existing citation row retained");
				assert.equal(canonicalRefreshJSON(source.evidenceProfile), canonicalRefreshJSON(original.evidenceProfile));
				assert.equal(canonicalRefreshJSON(source.integrityMonitoring ?? null), canonicalRefreshJSON(original.integrityMonitoring ?? null));
			}
		}
		assert.equal(canonicalRefreshJSON(await Claim.findOne({ slug: "unrelated-editorial-review" }).lean()), canonicalRefreshJSON(untouchedBefore));
		assert.equal(canonicalRefreshJSON(await mongoose.connection.db.collection("sourcenoticereviews").find().toArray()), privateBefore);
		assert.equal(canonicalRefreshJSON(await mongoose.connection.db.collection("readerfeedbacks").find().toArray()), feedbackBefore);
		checks++;
		await Claim.updateOne({ _id: plan.before[0].claim._id }, { $set: { bottomLine: "Subsequent authorized editorial update." } });
		const afterEditorial = await snapshot();
		assert.equal((await applyClaimRefreshes(plan, approval(plan))).status, "already_applied");
		assert.equal(await snapshot(), afterEditorial, "Retry must not overwrite later editorial changes");
		checks++;
		// Exercise the compiled command's complete successful preview/backup/apply path.
		assert.match(mongoose.connection.name, /^claim_refresh_smoke_[a-f0-9]{32}$/);
		await mongoose.connection.dropDatabase();
		await fixture();
		const finalPath = join(path, "final-reviewed-plan.json");
		const finalPreview = await execute(process.execPath, [cli, "--preview", ...selected.flatMap(key => ["--review", key]), "--plan", finalPath], { env: { PATH: process.env.PATH, MONGODB_URI: uri }, timeout: 20_000 });
		const finalArgs = [cli, "--apply", "--plan", finalPath, "--plan-sha256", JSON.parse(finalPreview.stdout).planSha256, "--backup-file", backupPath, "--backup-sha256", backupHash, "--operator-note", "Owned fixture backup and reviewed content for compiled CLI acceptance."];
		const finalApply = await execute(process.execPath, finalArgs, { env: { PATH: process.env.PATH, MONGODB_URI: uri }, timeout: 20_000 });
		assert.equal(JSON.parse(finalApply.stdout).status, "applied");
		assert.equal(await ClaimRefreshPromotion.countDocuments(), 1);
		for (const definition of fixtureRefreshes) {
			const current = await Claim.findOne({ slug: definition.before.slug }).lean();
			assert.equal(current.bottomLine, definition.after.bottomLine);
			assert.equal(await ClaimSource.countDocuments({ claim: current._id }), definition.after.sources.length);
		}
		checks++;
	} finally {
		await mongoose.disconnect();
		if (child && child.exitCode === null && child.signalCode === null) {
			const exited = once(child, "exit");
			child.kill("SIGTERM");
			const timeout = setTimeout(() => child.kill("SIGKILL"), 8000);
			try { await exited; } finally { clearTimeout(timeout); }
		}
		if (containerOwned) await execute("docker", ["rm", "--force", container], { timeout: 20_000 });
	}
}

try {
	await run("standalone");
	await run("replica");
	console.log(`Claim refresh promotion: ${checks} database/CLI checks across ${fixtureRefreshes.length} registered reviews passed, including rollback, concurrency, private-state preservation and retry safety.`);
} finally {
	rmSync(directory, { recursive: true, force: true });
	writeFileSync(index, readFileSync(index, "utf8").replace(entry, ""));
}
