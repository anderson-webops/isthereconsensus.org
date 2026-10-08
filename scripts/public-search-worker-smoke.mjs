import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import http from "node:http";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import mongoose from "mongoose";
import { defaultClaims } from "../back-end/dist/data/claims.js";
import { seedClaimFields, seedReviewDates } from "../back-end/dist/data/seedClaims.js";
import { defaultTopics } from "../back-end/dist/data/topics.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { PUBLIC_SEARCH_WORKER_REQUEST_LIMIT } from "../back-end/dist/utils/publicSearchWorker.js";

const temporaryRoot = Buffer.byteLength(join(tmpdir(), "consensus-rpc-XXXXXX", "worker.sock")) <= 100 ? tmpdir() : "/tmp";
const directory = mkdtempSync(join(temporaryRoot, "consensus-rpc-"));
const socketPath = join(directory, "worker.sock");
const databaseName = `search_worker_smoke_${randomUUID().replaceAll("-", "")}`;
const children = new Set();
const processOutput = new Map();
let databaseOwned = false;
let client;
let mode = "valid";
let beforeReply = async () => {};
let received = 0;
let target;
let query;
let base;

function start(command, args, env) {
	const child = spawn(command, args, { cwd: directory, env, stdio: ["ignore", "pipe", "pipe"] });
	children.add(child);
	child.on("error", () => processOutput.set(child, "spawn failed"));
	for (const stream of [child.stdout, child.stderr]) {
		stream.on("data", data => processOutput.set(child, ((processOutput.get(child) ?? "") + data).slice(-4000)));
	}
	return child;
}

async function stop(child) {
	if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
	const exited = once(child, "exit");
	const deadline = setTimeout(() => child.kill("SIGKILL"), 8000);
	child.kill("SIGTERM");
	try { await exited; }
	finally { clearTimeout(deadline); }
}

async function listen(server, endpoint = 0) {
	if (typeof endpoint === "string") server.listen(endpoint);
	else server.listen(endpoint, "127.0.0.1");
	await once(server, "listening");
	return server.address();
}

async function freePort() {
	const server = http.createServer();
	const address = await listen(server);
	await new Promise(resolve => server.close(resolve));
	return address.port;
}

async function waitFor(check, label, child) {
	const deadline = Date.now() + 60_000;
	while (Date.now() < deadline) {
		if (child && (child.exitCode !== null || child.signalCode !== null || processOutput.get(child) === "spawn failed")) throw new Error(`${label}: owned child stopped`);
		if (await check()) return;
		await delay(100);
	}
	if (child) console.error(JSON.stringify({ phase: label, alive: child.exitCode === null && child.signalCode === null, connected: (processOutput.get(child) ?? "").includes("Connected to MongoDB using"), seeded: (processOutput.get(child) ?? "").includes("Seed content mode:"), listening: (processOutput.get(child) ?? "").includes("Server listening on"), startupFailed: (processOutput.get(child) ?? "").includes("Server startup failed:") }));
	throw new Error(`Timed out: ${label}`);
}

const worker = http.createServer((request, response) => {
	const chunks = [];
	let bytes = 0;
	request.on("data", chunk => {
		bytes += chunk.length;
		if (bytes > PUBLIC_SEARCH_WORKER_REQUEST_LIMIT) request.destroy();
		else chunks.push(chunk);
	});
	request.on("end", async () => {
		try {
			assert.equal(request.method, "POST");
			assert.equal(request.url, "/rank");
			assert.equal(request.headers.authorization, undefined);
			assert.equal(request.headers.cookie, undefined);
			const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
			assert.equal(payload.query, query);
			assert.ok(payload.corpus.length > 0);
			assert.ok(payload.corpus.some(claim => claim.slug === target.slug));
			assert.ok(payload.corpus.every(claim => claim.status === "published"));
			assert.doesNotMatch(JSON.stringify(payload), /PRIVATE_RPC_|editorialNotes|sessionVersion|passwordHash|submittedBy/u);
			received++;
			await beforeReply();
			if (mode === "warming") {
				response.writeHead(202).end();
				return;
			}
			const row = { slug: target.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 };
			const reply = { protocol: payload.protocol, candidate: payload.candidate, corpusHash: payload.corpusHash, queryHash: payload.queryHash, referenceDate: payload.referenceDate, rows: [row] };
			if (mode === "stale") reply.corpusHash = "0".repeat(64);
			if (mode === "private-slug") row.slug = "private-rpc-draft";
			response.end(JSON.stringify(reply));
		}
		catch {
			response.writeHead(500).end();
			process.exitCode = 1;
		}
	});
});

async function api(route, expectedCount) {
	const response = await fetch(`${base}/api/${route}?q=${encodeURIComponent(query)}`, {
		headers: { Cookie: "smoke_fixture=PRIVATE_RPC_COOKIE", Authorization: "Bearer PRIVATE_RPC_HEADER", "X-Request-Id": "PRIVATE_RPC_REQUEST" },
		signal: AbortSignal.timeout(15_000)
	});
	assert.equal(response.status, 200);
	const result = await response.json();
	assert.equal(result.claims.length, expectedCount);
	assert.doesNotMatch(JSON.stringify(result), /PRIVATE_RPC_|editorialNotes|sessionVersion|passwordHash/u);
	if (expectedCount) {
		assert.equal(result.claims[0].slug, target.slug);
		assert.equal(result.claims[0].bottomLine, target.bottomLine);
		assert.equal(result.claims[0].matchStrength, "related");
		assert.equal(result.claims[0].matchScore, 90);
	}
	return result;
}

try {
	assert.ok(Buffer.byteLength(socketPath) <= 100);
	const mongoPort = process.env.SEARCH_WORKER_SMOKE_MONGO_PORT ? Number(process.env.SEARCH_WORKER_SMOKE_MONGO_PORT) : await freePort();
	assert.ok(Number.isInteger(mongoPort) && mongoPort > 0 && mongoPort <= 65535);
	if (!process.env.SEARCH_WORKER_SMOKE_MONGO_PORT) {
		const executable = [process.env.MONGOD_BINARY, "/opt/homebrew/bin/mongod", "/usr/bin/mongod"].find(filename => filename && existsSync(filename));
		assert.ok(executable, "Local MongoDB or a disposable loopback test-service port is required.");
		start(executable, ["--bind_ip", "127.0.0.1", "--port", String(mongoPort), "--dbpath", directory, "--wiredTigerCacheSizeGB", "0.25", "--quiet"], { PATH: process.env.PATH });
	}
	client = new mongoose.mongo.MongoClient(`mongodb://127.0.0.1:${mongoPort}/${databaseName}`, { serverSelectionTimeoutMS: 500 });
	await waitFor(async () => {
		try {
			await client.connect();
			await client.db(databaseName).command({ ping: 1 });
			return true;
		}
		catch { return false; }
	}, "fresh loopback MongoDB");
	const database = client.db(databaseName);
	assert.equal(await database.listCollections().hasNext(), false, "Disposable database must be new before application startup.");
	databaseOwned = true;
	const seed = defaultClaims.find(claim => claim.slug === "does-caffeine-become-less-effective-with-regular-daily-use");
	assert.ok(seed && seed.status === "published");
	const topic = new Topic(defaultTopics.find(topic => topic.slug === seed.topicSlug));
	await topic.validate();
	const review = new Claim({ ...seedClaimFields(seed), ...seedReviewDates(seed), topic: topic._id, slug: seed.slug, publishedAt: new Date() });
	await review.validate();
	await database.collection("topics").insertOne(topic.toObject());
	await database.collection("claims").insertOne(review.toObject());
	for (const citation of seed.sources) {
		const source = new ClaimSource({ ...citation, claim: review._id });
		await source.validate();
		await database.collection("claimsources").insertOne(source.toObject());
	}
	await listen(worker, socketPath);
	base = `http://127.0.0.1:${await freePort()}`;
	const backend = start(process.execPath, [resolve("back-end/dist/server.js")], {
		PATH: process.env.PATH,
		NODE_ENV: "production",
		HOST: "127.0.0.1",
		PORT: new URL(base).port,
		DOTENV_CONFIG_PATH: join(directory, "no-env-file"),
		MONGODB_URI: `mongodb://127.0.0.1:${mongoPort}/${databaseName}`,
		SESSION_SECRET: randomUUID() + randomUUID(),
		CAPTCHA_SECRET: randomUUID() + randomUUID(),
		PUBLIC_SITE_URL: "https://example.test",
		SEARCH_WORKER_SOCKET: socketPath
	});
	await waitFor(async () => {
		try { return (await fetch(`${base}/readyz`, { signal: AbortSignal.timeout(1000) })).ok; }
		catch { return false; }
	}, "compiled backend readiness", backend);
	const claims = database.collection("claims");
	target = await claims.findOne({ slug: "does-caffeine-become-less-effective-with-regular-daily-use", status: "published" });
	assert.ok(target);
	await claims.updateOne({ _id: target._id }, { $set: { "evidenceLandscape.workflow.editorialNotes": "PRIVATE_RPC_EDITORIAL" } });
	await claims.insertMany([
		{ ...target, _id: new mongoose.Types.ObjectId(), slug: "private-rpc-draft", title: "PRIVATE_RPC_DRAFT", status: "draft" },
		{ ...target, _id: new mongoose.Types.ObjectId(), slug: "private-rpc-unready", title: "PRIVATE_RPC_UNREADY", status: "published" }
	]);
	query = `Zxqvlex ${randomUUID().replaceAll("-", "")} Vzqrloop`;
	for (const route of ["claims", "search/suggestions"]) {
		const count = received;
		await api(route, 1);
		assert.equal(received, count + 1, "Both actual public surfaces must use the shared private worker.");
		for (mode of ["warming", "stale", "private-slug"]) await api(route, 0);
		mode = "valid";
		beforeReply = async () => { await claims.updateOne({ _id: target._id }, { $set: { status: "draft" } }); };
		await api(route, 0);
		await claims.updateOne({ _id: target._id }, { $set: { status: "published" } });
		beforeReply = async () => { await claims.updateOne({ _id: target._id }, { $set: { bottomLine: "Changed public wording during the synthetic transport test." } }); };
		await api(route, 0);
		await claims.updateOne({ _id: target._id }, { $set: { bottomLine: target.bottomLine } });
		const sources = database.collection("claimsources");
		const originals = await sources.find({ claim: target._id }).toArray();
		assert.ok(originals.length >= 2);
		beforeReply = async () => { await sources.updateMany({ claim: target._id }, { $set: { citationStatus: "retracted" } }); };
		await api(route, 0);
		for (const original of originals) await sources.replaceOne({ _id: original._id }, original);
		beforeReply = async () => {};
	}
	let release;
	let notify;
	const entered = new Promise(resolve => { notify = resolve; });
	beforeReply = () => new Promise(resolve => { release = resolve; notify(); });
	const first = api("claims", 1);
	await entered;
	const count = received;
	await api("search/suggestions", 0);
	assert.equal(received, count, "The two surfaces must not create separate worker queues.");
	release();
	await first;
	assert.equal(process.exitCode, undefined);
	console.log("public search transport smoke passed: both compiled API routes, case preservation, public-only hydration, stale/withdrawn/unready rejection, native fallback and one shared bounded queue. Synthetic RPC fixture, not model-quality or public-site acceptance.");
}
finally {
	await Promise.all([...children].filter(child => !child.spawnargs.includes("--dbpath")).map(stop));
	worker.closeAllConnections();
	if (worker.listening) await new Promise(resolve => worker.close(resolve));
	try {
		if (databaseOwned && client) {
			assert.match(databaseName, /^search_worker_smoke_[a-f\d]{32}$/u);
			await client.db(databaseName).dropDatabase();
		}
	}
	finally {
		try { await client?.close(); }
		finally {
			await Promise.all([...children].map(stop));
			rmSync(directory, { recursive: true, force: true });
		}
	}
}
