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
import { claimsBeforeEditorialCompletion } from "../back-end/dist/data/claims.js";
import { seedClaimFields, seedClaimSources, seedReviewDates } from "../back-end/dist/data/seedClaims.js";
import { Admin } from "../back-end/dist/models/schemas/Admin.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { ContentRelease } from "../back-end/dist/models/schemas/ContentRelease.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { createEditorialCompletionProposal } from "../back-end/dist/utils/editorialCompletionProposal.js";
import { EDITORIAL_COMPLETION_RELEASE, publishEditorialCompletion } from "../back-end/dist/utils/editorialCompletionRelease.js";

const root = resolve(import.meta.dirname, "..");
mkdirSync(join(root, ".ai-work/runs"), { recursive: true });
const directory = mkdtempSync(join(root, ".ai-work/runs/editorial-fixture-"));
const database = `editorial_completion_fixture_${randomUUID().replaceAll("-", "")}`;
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
	const child = spawn(executable, args, {
		cwd: root,
		env,
		stdio: ["ignore", "pipe", "pipe"]
	});
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
	await Promise.race([
		exited,
		delay(8000)
	]);
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
	const replicaArgs = [
		"--replSet",
		"ownerEditorialSmoke",
		"--wiredTigerCacheSizeGB",
		"0.25"
	];
	if (useDocker) {
		execFileSync("docker", [
			"run",
			"--rm",
			"--detach",
			"--name",
			container,
			"--publish",
			`127.0.0.1:${mongoPort}:27017`,
			"mongo:8.0.34@sha256:4a4ab5d4834207389e0d7270fac988e21ffedccecba77991a552f755df229907",
			"--bind_ip_all",
			...replicaArgs
		], { stdio: "pipe", timeout: 60000 });
		containerOwned = true;
	}
	else {
		mkdirSync(join(directory, "db"));
		start(process.env.MONGOD_BINARY || "/opt/homebrew/bin/mongod", [
			"--bind_ip",
			"127.0.0.1",
			"--port",
			String(mongoPort),
			"--dbpath",
			join(directory, "db"),
			...replicaArgs
		], { PATH: process.env.PATH });
	}
	const uri = `mongodb://127.0.0.1:${mongoPort}/${database}?directConnection=true`;
	const inspector = new mongoose.mongo.MongoClient(uri, { serverSelectionTimeoutMS: 20000 });
	try {
		await inspector.connect();
		await inspector.db("admin").command({
			replSetInitiate: {
				_id: "ownerEditorialSmoke",
				members: [
					{ _id: 0, host: `127.0.0.1:${useDocker ? 27017 : mongoPort}` }
				]
			}
		});
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

	const probeClaimId = new mongoose.Types.ObjectId();
	const probeSources = claimsBeforeEditorialCompletion.find(value => value.slug === "does-radon-in-homes-cause-lung-cancer").sources.filter(source => source.title === "Radon");
	assert.equal(probeSources.length, 2);
	await seedClaimSources(probeClaimId, probeSources);
	const probeBefore = await ClaimSource.find({ claim: probeClaimId }).sort({ order: 1 }).lean();
	assert.equal(probeBefore.length, 2, "Equal citation titles must not collapse distinct publications.");
	await seedClaimSources(probeClaimId, probeSources);
	assert.deepEqual((await ClaimSource.find({ claim: probeClaimId }).sort({ order: 1 }).lean()).map(value => value._id.toString()), probeBefore.map(value => value._id.toString()));
	await ClaimSource.deleteMany({ claim: probeClaimId });
	const proposal = createEditorialCompletionProposal({
		commit: "a".repeat(40),
		tree: "b".repeat(40)
	});
	const fixtures = [];
	const customNext = new Date("2026-12-01T12:00:00Z");
	const publishedAt = new Date("2026-09-13T12:00:00Z");
	for (const [index, target] of proposal.targets.entries()) {
		const before = target.compatibleBaselines[0];
		const topic = await Topic.findOneAndUpdate({ slug: before.topicSlug }, {
			$setOnInsert: { title: before.topicSlug, slug: before.topicSlug }
		}, { upsert: true, returnDocument: "after" });
		const dates = seedReviewDates(before);
		const legacyFixture = new Claim({
			...seedClaimFields(before),
			...dates,
			topic: topic._id,
			slug: before.slug,
			publishedAt,
			reviewedBy: admin._id,
			...(index % 2
				? { nextReviewAt: customNext }
				: {})
		});
		let legacyValidation;
		try {
			await legacyFixture.validate();
		}
		catch (error) {
			assert.ok(error instanceof mongoose.Error.ValidationError);
			assert.ok(Object.entries(error.errors).every(([path, detail]) => detail.kind === "maxlength" && /^evidenceSummaries\.\d+\.magnitude$/.test(path)), "Only the recorded legacy magnitude-length exception may be represented by the fixture.");
			legacyValidation = error;
		}
		const claim = await legacyFixture.save({ validateBeforeSave: !legacyValidation });
		await Claim.updateOne({ _id: claim._id }, {
			$push: { "surveillanceSpec.watchTerms": "Private fixture monitoring term." }
		});
		const sources = [];
		for (const source of before.sources) {
			sources.push(await ClaimSource.create({
				...source,
				claim: claim._id,
				citationStatus: "corrected",
				statusSources: ["Crossref", "https://example.org/retained-completion-notice"],
				citationCheckedAt: publishedAt
			}));
		}
		fixtures.push({
			target,
			claim: await Claim.findById(claim._id).lean(),
			sources: sources.map(value => value.toObject())
		});
	}
	const first = fixtures.find(fixture => fixture.target.key === "health-and-medicine/does-radon-in-homes-cause-lung-cancer");
	assert.ok(first);
	assert.equal(first.target.proposedSources.length, first.sources.length + 1);
	const initial = { claim: await Claim.findById(first.claim._id).lean(), sources: await ClaimSource.find({ claim: first.claim._id }).sort({ order: 1, _id: 1 }).lean() };
	const saveReceipt = ContentRelease.prototype.save;
	ContentRelease.prototype.save = async function (...args) {
		if (this.key === first.target.key) throw new Error("Injected completion receipt failure.");
		return saveReceipt.apply(this, args);
	};
	try {
		const result = await publishEditorialCompletion();
		assert.equal(result.published, fixtures.length - 1);
		assert.equal(result.failed, 1);
		assert.equal(result.conflicts, 0);
	}
	finally { ContentRelease.prototype.save = saveReceipt; }
	assert.deepEqual({ claim: await Claim.findById(first.claim._id).lean(), sources: await ClaimSource.find({ claim: first.claim._id }).sort({ order: 1, _id: 1 }).lean() }, initial, "A late receipt failure must roll back the entire article and citations.");
	assert.equal(await ContentRelease.countDocuments({ key: first.target.key }), 0);
	const retried = await publishEditorialCompletion();
	assert.equal(retried.published, 1);
	assert.equal(retried.preserved, fixtures.length - 1);
	assert.equal(retried.failed + retried.conflicts, 0);
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
		catch {
			return false;
		}
	}, "isolated completion backend");
	const headers = { "content-type": "application/json", "origin": "https://editorial-fixture.invalid", "x-forwarded-proto": "https" };
	assert.equal((await fetch(`${base}/editorial/claims/${first.claim._id}`, { headers })).status, 403);
	const login = await fetch(`${base}/auth/login`, {
		method: "POST",
		headers,
		body: JSON.stringify({ email: admin.email, password })
	});
	assert.equal(login.status, 200);
	const cookie = login.headers.getSetCookie().map(value => value.split(";")[0]).join("; ");
	assert.ok(cookie.includes(".sig="));
	assert.equal((await fetch(`${base}/editorial/claims/${first.claim._id}`, {
		method: "PATCH",
		headers: { ...headers, cookie },
		body: JSON.stringify({ bottomLine: "Unapproved change." })
	})).status, 403);
	let retainedSources = 0;
	let addedSources = 0;
	let scheduled = 0;
	for (const { target, claim, sources } of fixtures) {
		const response = await fetch(base + target.publicApiPath.replace(/^\/api/, ""));
		assert.equal(response.status, 200, target.key);
		const actual = (await response.json()).claim;
		assert.equal(actual.title, target.proposedFields.title, target.key);
		assert.equal(actual.bottomLine, target.proposedFields.bottomLine, target.key);
		assert.equal(actual.reviewMode, target.proposedFields.reviewMode, target.key);
		assert.equal(actual.sources.length, target.proposedSources.length, target.key);
		const saved = await Claim.findById(claim._id).lean();
		assert.equal(saved.lastReviewedAt.toISOString(), claim.lastReviewedAt.toISOString());
		assert.equal(saved.publishedAt.toISOString(), claim.publishedAt.toISOString());
		assert.equal(saved.reviewedBy.toString(), claim.reviewedBy.toString());
		assert.deepEqual(saved.surveillanceSpec, claim.surveillanceSpec);
		if (claim.nextReviewAt.toISOString() === customNext.toISOString()) assert.equal(saved.nextReviewAt.toISOString(), customNext.toISOString());
		if (saved.nextReviewAt.toISOString() !== claim.nextReviewAt.toISOString()) {
			assert.ok(target.maintenance);
			assert.equal(saved.nextReviewAt.getTime(), claim.lastReviewedAt.getTime() + 90 * 86400000);
			scheduled++;
		}
		for (const source of sources) {
			const retained = await ClaimSource.findById(source._id).lean();
			assert.equal(retained.claim.toString(), claim._id.toString());
			assert.equal(retained.citationStatus, source.citationStatus);
			assert.equal(retained.citationCheckedAt.toISOString(), source.citationCheckedAt.toISOString());
			assert.deepEqual(retained.statusSources, source.statusSources);
			assert.deepEqual(retained.evidenceProfile, source.evidenceProfile);
			retainedSources++;
		}
		addedSources += actual.sources.length - sources.length;
		await delay(250);
	}
	assert.equal(addedSources, 3);
	assert.ok(scheduled > 0);
	const receipts = await ContentRelease.find({ releaseId: EDITORIAL_COMPLETION_RELEASE }).sort({ _id: 1 }).lean();
	assert.equal(receipts.length, fixtures.length);
	const replayBefore = JSON.stringify(await Claim.find({
		_id: {
			$in: fixtures.map(value => value.claim._id)
		}
	}).sort({ _id: 1 }).lean());
	assert.deepEqual(await publishEditorialCompletion(), {
		published: 0,
		preserved: fixtures.length,
		conflicts: 0,
		failed: 0,
		scheduled: 0
	});
	assert.equal(JSON.stringify(await Claim.find({
		_id: {
			$in: fixtures.map(value => value.claim._id)
		}
	}).sort({ _id: 1 }).lean()), replayBefore);
	await Claim.updateOne({ _id: first.claim._id }, {
		$set: { bottomLine: "Later human correction retained." }
	});
	await publishEditorialCompletion();
	assert.equal((await Claim.findById(first.claim._id)).bottomLine, "Later human correction retained.");
	assert.equal(logs.includes(password), false);
	console.log(JSON.stringify({
		accepted: true,
		fixtureOnly: true,
		approvedTargets: fixtures.length,
		publicArticleReadbacks: fixtures.length,
		retainedSources,
		addedSources,
		defaultSchedulesUpdated: scheduled,
		customSchedulesPreserved: true,
		reviewDatesPreserved: true,
		sourceIdsAndNoticesPreserved: true,
		privateStatePreserved: true,
		lateFailureRollbackVerified: true,
		replayReadOnly: true,
		laterHumanEditPreserved: true,
		duplicateCitationTitleRegression: true,
		passwordAbsentFromLogs: true
	}));
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
