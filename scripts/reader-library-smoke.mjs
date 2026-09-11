// Run after npm run build. Owns a fresh database, test accounts and loopback
// servers only. Never reads .env or accepts a remote/database URI.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { evidenceComparisons } from "../back-end/dist/data/comparisons/index.js";
import { selectedComparisonUpdates } from "../back-end/dist/data/comparisons/updates.js";
import { Admin } from "../back-end/dist/models/schemas/Admin.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { ReaderLibrary } from "../back-end/dist/models/schemas/ReaderLibrary.js";
import { User } from "../back-end/dist/models/schemas/User.js";
import { recordSeedReaderAnnouncement } from "../back-end/dist/utils/seedReaderAnnouncement.js";
import { checkReaderFeedback } from "./reader-feedback-smoke.mjs";
import "../back-end/dist/models/schemas/Topic.js";

const directory = mkdtempSync(join(tmpdir(), "consensus-reader-smoke-"));
const databaseName = `reader_library_smoke_${randomUUID().replaceAll("-", "")}`;
const children = new Set();
const processes = new Map();
const password = `Fixture-only-${randomUUID()}-Aa9!`;
const sessionSecret = randomUUID() + randomUUID();
let backend;
let browser;
let databaseOwned = false;
let frontendPort;
let backendPort;
let base;

async function listen(server) {
	server.listen(0, "127.0.0.1");
	await once(server, "listening");
	return server.address().port;
}
async function freePort() {
	const probe = http.createServer();
	const port = await listen(probe);
	await new Promise((done) => probe.close(done));
	return port;
}
function start(command, args, env) {
	const child = spawn(command, args, { cwd: directory, env, stdio: ["ignore", "pipe", "pipe"] });
	children.add(child);
	processes.set(child, "");
	child.on("error", (error) => processes.set(child, error.message));
	for (const stream of [child.stdout, child.stderr]) {
		stream.on("data", (data) => {
			processes.set(child, (processes.get(child) + data).slice(-4000));
		});
	}
	return child;
}
async function stop(child) {
	if (!child || child.exitCode !== null || child.signalCode !== null) return;
	const exited = once(child, "exit");
	child.kill("SIGTERM");
	const timeout = setTimeout(() => child.kill("SIGKILL"), 8000);
	try {
		await exited;
	} finally {
		clearTimeout(timeout);
	}
}
async function waitFor(check, label, child) {
	const deadline = Date.now() + 60_000;
	while (Date.now() < deadline) {
		if (child && (child.exitCode !== null || child.signalCode !== null))
			throw new Error(`${label}: ${processes.get(child)}`);
		if (await check()) return;
		await delay(100);
	}
	throw new Error(`Timed out: ${label}`);
}
async function ready(url, child) {
	await waitFor(
		async () => {
			try {
				return (await fetch(url, { signal: AbortSignal.timeout(1000) })).ok;
			} catch {
				return false;
			}
		},
		"server readiness",
		child
	);
}
const proxy = http.createServer((request, response) => {
	const port = request.url.startsWith("/api/") ? backendPort : frontendPort;
	const upstream = http.request(
		{ hostname: "127.0.0.1", port, path: request.url, method: request.method, headers: request.headers },
		(incoming) => {
			response.writeHead(incoming.statusCode, incoming.headers);
			incoming.pipe(response);
		}
	);
	upstream.on("error", () => {
		response.writeHead(503);
		response.end("Unavailable");
	});
	request.pipe(upstream);
});
const empty = { savedReviewIds: [], followedTopicIds: [], savedComparisonSlugs: [] };
async function api(path, { method = "GET", body, cookie, status = 200, headers = {} } = {}) {
	const response = await fetch(`${base}/api${path}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			Origin: base,
			...(cookie ? { Cookie: cookie } : {}),
			...headers
		},
		...(body ? { body: JSON.stringify(body) } : {}),
		signal: AbortSignal.timeout(15_000)
	});
	const data = await response.json();
	assert.equal(response.status, status, `${method} ${path}: ${JSON.stringify(data)}`);
	if (path.startsWith("/library/")) assert.match(response.headers.get("cache-control"), /private, no-store/);
	return {
		data,
		response,
		cookie: response.headers
			.getSetCookie()
			.map((value) => value.split(";")[0])
			.join("; ")
	};
}
async function clickText(page, label) {
	await page.waitForFunction(
		(text) =>
			[...document.querySelectorAll("button")].some(
				(button) => button.textContent.trim() === text && !button.disabled
			),
		{},
		label
	);
	await page.evaluate(
		(text) => [...document.querySelectorAll("button")].find((button) => button.textContent.trim() === text).click(),
		label
	);
}
async function browserText(page, text) {
	await page.waitForFunction((text) => document.body.innerText.includes(text), {}, text);
}

try {
	const mongoPort = process.env.READER_SMOKE_MONGO_PORT
		? Number(process.env.READER_SMOKE_MONGO_PORT)
		: await freePort();
	assert.ok(Number.isInteger(mongoPort) && mongoPort > 0 && mongoPort <= 65535);
	if (!process.env.READER_SMOKE_MONGO_PORT) {
		const executable = [process.env.MONGOD_BINARY, "/opt/homebrew/bin/mongod", "/usr/bin/mongod"].find(
			(path) => path && existsSync(path)
		);
		assert.ok(
			executable,
			"Install MongoDB locally or supply READER_SMOKE_MONGO_PORT for a disposable loopback MongoDB service."
		);
		start(
			executable,
			[
				"--bind_ip",
				"127.0.0.1",
				"--port",
				String(mongoPort),
				"--dbpath",
				directory,
				"--wiredTigerCacheSizeGB",
				"0.25",
				"--quiet"
			],
			{ PATH: process.env.PATH }
		);
	}
	const uri = `mongodb://127.0.0.1:${mongoPort}/${databaseName}`;
	await waitFor(async () => {
		try {
			await mongoose.connect(uri, { serverSelectionTimeoutMS: 500 });
			return true;
		} catch {
			return false;
		}
	}, "disposable MongoDB");
	assert.equal(mongoose.connection.name, databaseName);
	assert.equal(await mongoose.connection.db.listCollections().hasNext(), false, "Test database must be new.");
	databaseOwned = true;
	backendPort = await freePort();
	frontendPort = await freePort();
	base = `http://127.0.0.1:${await listen(proxy)}`;
	const backendEnv = {
		PATH: process.env.PATH,
		NODE_ENV: "test",
		HOST: "127.0.0.1",
		PORT: String(backendPort),
		DOTENV_CONFIG_PATH: join(directory, "no-env-file"),
		MONGODB_URI: uri,
		SESSION_SECRET: sessionSecret,
		PUBLIC_SITE_URL: base
	};
	async function startBackend() {
		backend = start(process.execPath, [resolve("back-end/dist/server.js")], backendEnv);
		await ready(`http://127.0.0.1:${backendPort}/healthz`, backend);
	}
	await startBackend();
	const review = await Claim.findOne({ slug: "does-caffeine-become-less-effective-with-regular-daily-use" })
		.populate("topic")
		.lean();
	const second = await Claim.findOne({ slug: "do-childhood-vaccines-cause-autism" }).populate("topic").lean();
	assert.ok(review && second);
	const reviewId = String(review._id);
	const topicId = String(review.topic._id);
	const chosen = {
		savedReviewIds: [reviewId],
		followedTopicIds: [topicId],
		savedComparisonSlugs: ["electricity-emissions"]
	};
	const absent = new mongoose.Types.ObjectId().toString();
	const userA = await api("/auth/register", {
		method: "POST",
		body: { name: "Reader A", email: "reader-a@example.test", password, acceptTerms: true },
		status: 201
	});
	const userB = await api("/auth/register", {
		method: "POST",
		body: { name: "Reader B", email: "reader-b@example.test", password, acceptTerms: true },
		status: 201
	});
	const actor = await Admin.create({ name: "Fixture editor", email: "editor@example.test", password, enabled: true });
	const editor = await api("/auth/login", { method: "POST", body: { email: "editor@example.test", password } });
	await api("/library/account", { status: 403 });
	await api("/library/account", { method: "PATCH", body: { ...chosen, revision: 0 }, status: 403 });
	assert.deepEqual((await api("/library/account", { cookie: userA.cookie })).data, { ...empty, revision: 0 });
	assert.equal(await ReaderLibrary.countDocuments(), 0, "Reads must not create account records.");
	const resolved = (await api("/library/resolve", { method: "POST", body: chosen })).data;
	assert.equal(resolved.reviews[0]._id, reviewId);
	assert.equal(resolved.topics[0]._id, topicId);
	assert.equal(resolved.comparisons[0].slug, "electricity-emissions");
	assert.deepEqual(Object.keys(resolved.comparisons[0]).sort(), ["description", "slug", "title"]);
	assert.equal(await ReaderLibrary.countDocuments(), 0, "Anonymous resolution must not persist interests.");
	for (const body of [
		{ ...chosen, revision: 0, owner: String(actor._id) },
		{ ...chosen, revision: 0, password: "not stored" },
		{ ...chosen, revision: 0, savedReviewIds: [reviewId, reviewId] },
		...[
			["../account"],
			["electricity-emissions", "electricity-emissions"],
			Array.from({ length: 51 }, (_, i) => `comparison-${i}`)
		].map((savedComparisonSlugs) => ({ ...chosen, revision: 0, savedComparisonSlugs }))
	]) {
		await api("/library/account", { method: "PATCH", cookie: userA.cookie, body, status: 400 });
	}
	await api("/library/account", {
		method: "PATCH",
		cookie: userA.cookie,
		body: { ...empty, savedReviewIds: [absent], revision: 0 },
		status: 422
	});
	assert.deepEqual(
		(await api("/library/account", { method: "PATCH", cookie: userA.cookie, body: { ...chosen, revision: 0 } }))
			.data,
		{ ...chosen, revision: 1 }
	);
	await api("/library/account", {
		method: "PATCH",
		cookie: userA.cookie,
		body: { ...empty, revision: 0 },
		status: 409
	});
	assert.deepEqual((await api("/library/account", { cookie: userB.cookie })).data, { ...empty, revision: 0 });
	assert.deepEqual((await api("/library/account", { cookie: editor.cookie })).data, { ...empty, revision: 0 });
	await api("/library/account", {
		method: "PATCH",
		cookie: editor.cookie,
		body: { ...empty, revision: 0, savedComparisonSlugs: ["unpublished-comparison"] },
		status: 422
	});
	const legacySelection = { savedReviewIds: [], followedTopicIds: [] };
	const editorSave = async (body) =>
		(await api("/library/account", { method: "PATCH", cookie: editor.cookie, body })).data;
	assert.deepEqual(await editorSave({ ...legacySelection, revision: 0 }), { ...empty, revision: 1 });
	await editorSave({ ...empty, revision: 1, savedComparisonSlugs: ["caffeine-dose-and-sleep"] });
	assert.deepEqual(
		(await editorSave({ ...legacySelection, revision: 2 })).savedComparisonSlugs,
		["caffeine-dose-and-sleep"],
		"Older clients must preserve comparison saves."
	);
	assert.deepEqual((await editorSave({ ...empty, revision: 3 })).savedComparisonSlugs, []);
	await ReaderLibrary.updateOne(
		{ _id: `admin:${actor._id}` },
		{ $set: { savedComparisonSlugs: ["withdrawn-comparison"] } }
	);
	assert.deepEqual(
		(
			await api("/library/resolve", {
				method: "POST",
				body: { ...empty, savedComparisonSlugs: ["withdrawn-comparison"] }
			})
		).data.comparisons,
		[]
	);
	assert.deepEqual(
		(await editorSave({ ...empty, revision: 4 })).savedComparisonSlugs,
		[],
		"Withdrawn references remain removable."
	);
	const concurrent = await Promise.all(
		[chosen, empty].map((body) =>
			fetch(`${base}/api/library/account`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", Cookie: userB.cookie, Origin: base },
				body: JSON.stringify({ ...body, revision: 0 })
			}).then((response) => response.status)
		)
	);
	assert.deepEqual(concurrent.sort(), [200, 409], "Concurrent first saves must not overwrite each other.");
	await stop(backend);
	await startBackend();
	assert.deepEqual((await api("/library/account", { cookie: userA.cookie })).data, { ...chosen, revision: 1 });
	console.log(
		"library persistence: anonymous reads, validation, account isolation, concurrent saves and backend restart passed"
	);

	// A private test draft with the actual reviewed content/source stack. This
	// database is isolated; canonical production records are never modified.
	const fixtureId = new mongoose.Types.ObjectId();
	const sources = await ClaimSource.find({ claim: review._id }).lean();
	await Claim.create({
		...review,
		_id: fixtureId,
		topic: review.topic._id,
		slug: `reader-fixture-${randomUUID()}`,
		status: "draft",
		publishedAt: undefined,
		readerUpdates: [],
		__v: 0
	});
	await ClaimSource.insertMany(
		sources.map((source) => ({ ...source, _id: new mongoose.Types.ObjectId(), claim: fixtureId }))
	);
	const publication = `/editorial/claims/${fixtureId}`;
	const eventCount = async () => (await Claim.findById(fixtureId).lean()).readerUpdates.length;
	const publish = (body) => api(`${publication}/publish`, { method: "POST", cookie: editor.cookie, body });
	const requestUpdate = () =>
		api(`${publication}/request-update`, {
			method: "POST",
			cookie: editor.cookie,
			body: { revisionNote: "Private draft preparation" }
		});
	const feed = async (selection = chosen, cursor) =>
		(await api("/library/updates", { method: "POST", body: { ...selection, ...(cursor ? { cursor } : {}) } })).data;
	assert.deepEqual((await feed()).updates, [], "Legacy dates must not become new announcements.");
	await api(`${publication}/publish`, {
		method: "POST",
		cookie: userA.cookie,
		body: { revisionNote: "No permission" },
		status: 403
	});
	await publish({ revisionNote: "New fixture evidence review" });
	assert.equal(await eventCount(), 1);
	assert.equal((await feed()).updates[0].kind, "new_review");
	await requestUpdate();
	assert.equal(await eventCount(), 1);
	assert.equal((await feed()).updates.length, 0, "Draft and needs-update material must not leak.");
	await api(publication, {
		method: "PATCH",
		cookie: editor.cookie,
		body: { revisionNote: "Private draft snapshot", editorSummary: review.editorSummary }
	});
	assert.equal(await eventCount(), 1);
	await api(`${publication}/publish`, {
		method: "POST",
		cookie: editor.cookie,
		body: { revisionNote: "Unclassified update" },
		status: 400
	});
	await publish({ revisionNote: "Formatting only", readerUpdateKind: "none" });
	assert.equal(await eventCount(), 1);
	await api(`${publication}/review`, {
		method: "POST",
		cookie: editor.cookie,
		body: { revisionNote: "Review check only" }
	});
	assert.equal(await eventCount(), 1);
	for (const kind of ["evidence_update", "correction"]) {
		await requestUpdate();
		await publish({
			revisionNote: `Public ${kind} summary`,
			readerUpdateKind: kind,
			bottomLineImpact: "unchanged"
		});
	}
	assert.equal(await eventCount(), 3);
	const seedAnnouncement = {
		id: randomUUID(),
		date: new Date(Date.now() - 1000).toISOString(),
		kind: "evidence_update",
		summary: "Source-controlled release update",
		bottomLineImpact: "unchanged"
	};
	await recordSeedReaderAnnouncement(fixtureId, seedAnnouncement);
	await recordSeedReaderAnnouncement(fixtureId, seedAnnouncement);
	assert.equal(await eventCount(), 4, "Source-controlled announcements must be idempotent.");
	const published = await feed();
	assert.equal(published.updates[0].kind, "correction");
	assert.doesNotMatch(
		JSON.stringify(published),
		/Private draft|Fixture editor|editor@example|password|sessionVersion|reviewedBy|readerUpdates/
	);
	assert.equal((await feed({ ...empty, savedReviewIds: [String(second._id)] })).updates.length, 0);
	const fixture = await Claim.findById(fixtureId);
	const stale = await Claim.findById(fixtureId);
	fixture.editorSummary += " Current edit.";
	await fixture.save();
	stale.editorSummary += " Stale edit.";
	await assert.rejects(stale.save(), { name: "VersionError" });
	const tiedDate = new Date(Date.now() - 1000);
	const events = Array.from({ length: 35 }, (_, i) => ({
		id: randomUUID(),
		date: tiedDate,
		kind: "evidence_update",
		summary: `Pagination fixture ${i}`,
		bottomLineImpact: "unchanged"
	}));
	await Claim.updateOne(
		{ _id: fixtureId },
		{
			$set: {
				readerUpdates: [
					...events,
					{
						...events[0],
						id: randomUUID(),
						date: new Date(Date.now() - 100 * 86400000),
						summary: "Expired event"
					}
				]
			}
		}
	);
	const first = await feed();
	const last = await feed(chosen, first.nextCursor);
	assert.equal(first.updates.length, 30);
	assert.equal(last.updates.length, 5);
	assert.equal(last.nextCursor, null);
	assert.equal(new Set([...first.updates, ...last.updates].map((event) => event.id)).size, 35);
	assert.doesNotMatch(JSON.stringify([first, last]), /Expired event/);
	const comparisonOnly = { ...empty, savedComparisonSlugs: ["electricity-emissions"], includeComparisons: true };
	const expectedComparisonEvents = (saved, topics) => {
		const now = new Date();
		return selectedComparisonUpdates(
			evidenceComparisons,
			saved,
			topics,
			now,
			new Date(now.getTime() - 90 * 86400000)
		);
	};
	const comparisonPage = await feed(comparisonOnly);
	assert.equal(
		comparisonPage.updates.length,
		expectedComparisonEvents(comparisonOnly.savedComparisonSlugs, []).length
	);
	assert.ok(comparisonPage.updates.every((row) => row.comparison?.slug === "electricity-emissions" && !row.review));
	assert.deepEqual((await feed({ ...comparisonOnly, includeComparisons: false })).updates, []);
	assert.deepEqual((await feed({ ...comparisonOnly, savedComparisonSlugs: ["withdrawn-comparison"] })).updates, []);
	const mixedSelection = { ...chosen, includeComparisons: true };
	const mixedFirst = await feed(mixedSelection);
	const mixedLast = await feed(mixedSelection, mixedFirst.nextCursor);
	const mixed = [...mixedFirst.updates, ...mixedLast.updates];
	const expected = expectedComparisonEvents(chosen.savedComparisonSlugs, [review.topic.slug]);
	assert.equal(mixed.length, 35 + expected.length);
	assert.equal(new Set(mixed.map((row) => row.id)).size, mixed.length);
	assert.equal(mixedLast.nextCursor, null);
	assert.equal(mixed.filter((row) => row.comparison).length, expected.length);
	assert.ok(mixed.every((row) => Boolean(row.review) !== Boolean(row.comparison)));
	assert.ok(
		[...first.updates, ...last.updates].every((row) => row.review && !row.comparison),
		"Old clients remain review-only even with saved comparisons."
	);
	await api("/library/updates", { method: "POST", body: { ...chosen, includeComparisons: "true" }, status: 400 });
	await api("/library/updates", { method: "POST", body: { ...chosen, cursor: "bad-cursor" }, status: 400 });
	await ClaimSource.updateMany({ claim: fixtureId }, { $set: { citationStatus: "retracted" } });
	await recordSeedReaderAnnouncement(fixtureId, { ...seedAnnouncement, id: randomUUID() });
	assert.equal(await eventCount(), 36, "Unready source-controlled content must not announce.");
	assert.equal((await feed()).updates.length, 0, "Source readiness must be rechecked for the feed.");
	await api(`${publication}/archive`, {
		method: "POST",
		cookie: editor.cookie,
		body: { revisionNote: "Withdraw fixture" }
	});
	await api("/library/account", {
		method: "PATCH",
		cookie: editor.cookie,
		body: {
			...empty,
			savedReviewIds: [String(fixtureId)],
			revision: (await api("/library/account", { cookie: editor.cookie })).data.revision
		},
		status: 422
	});
	assert.equal(
		(await api("/library/resolve", { method: "POST", body: { ...empty, savedReviewIds: [String(fixtureId)] } }))
			.data.reviews.length,
		0
	);
	console.log(
		"reader updates: actual publication, no draft/cosmetic announcements, source readiness, withdrawal, 90-day pagination and concurrent edits passed"
	);
	// Populate the reader's followed topic in this isolated database so browser
	// checks exercise actual announcements and pagination, not only empty states.
	await Claim.updateOne({ _id: review._id }, { $set: { readerUpdates: events } });
	await recordSeedReaderAnnouncement(review._id, {
		id: randomUUID(),
		date: new Date().toISOString(),
		kind: "correction",
		summary: "Reader-facing correction with an explained change.",
		bottomLineImpact: "changed"
	});

	// Start the built app behind a local reverse proxy, preserving real signed
	// cookies and same-origin API behavior rather than injecting UI auth state.
	const frontend = start(process.execPath, [resolve("front-end/.output/server/index.mjs")], {
		PATH: process.env.PATH,
		NODE_ENV: "production",
		HOST: "127.0.0.1",
		PORT: String(frontendPort),
		NUXT_API_INTERNAL_BASE: `http://127.0.0.1:${backendPort}/api`,
		NUXT_PUBLIC_API_BASE: "/api",
		NUXT_PUBLIC_CAPTCHA_SITE_KEY: ""
	});
	await ready(`${base}/healthz`, frontend);
	const htmlResponse = await fetch(`${base}/library`);
	assert.match(htmlResponse.headers.get("cache-control"), /private, no-store/);
	assert.equal(htmlResponse.headers.get("x-robots-tag"), "noindex, nofollow");
	assert.doesNotMatch(await htmlResponse.text(), /reader-a@example|reader-b@example|savedReviewIds/);
	const executablePath = [
		process.env.PUPPETEER_EXECUTABLE_PATH,
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		"/usr/bin/google-chrome",
		"/usr/bin/google-chrome-stable",
		"/usr/bin/chromium"
	].find((path) => path && existsSync(path));
	browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
	const page = await browser.newPage();
	page.setDefaultTimeout(15000);
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	let contentFailure = false;
	await page.setRequestInterception(true);
	page.on("request", (request) => {
		const url = new URL(request.url());
		if (contentFailure && url.pathname === "/api/library/resolve") {
			void request
				.respond({
					status: 503,
					contentType: "application/json",
					body: JSON.stringify({ error: "Fixture content failure" })
				})
				.catch(() => {});
			return;
		}
		void (
			url.origin === base || ["data:", "blob:"].includes(url.protocol) ? request.continue() : request.abort()
		).catch(() => {});
	});
	const reviewPath = `/consensus/${review.topic.slug}/${review.slug}`;
	await page.goto(base + reviewPath, { waitUntil: "networkidle0" });
	await clickText(page, "Save review");
	await browserText(page, "Saved in this browser.");
	await page.goto(`${base}/compare/strength-training-supplements`, { waitUntil: "networkidle0" });
	await clickText(page, "Save comparison");
	await browserText(page, "Saved in this browser.");
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Saved comparison");
	await page.goto(`${base}/consensus/${review.topic.slug}`, { waitUntil: "networkidle0" });
	await clickText(page, "Follow topic");
	contentFailure = true;
	await page.goto(`${base}/library`, { waitUntil: "networkidle0" });
	await browserText(page, "Your selections are still saved.");
	assert.equal(await page.evaluate(() => document.body.innerText.includes("Review currently unavailable")), false);
	contentFailure = false;
	await clickText(page, "Retry loading content");
	await browserText(page, "Saved reviews (1)");
	await browserText(page, "Followed topics (1)");
	await browserText(page, "Saved comparisons (1)");
	assert.ok(await page.$('#saved-comparisons a[href="/compare/strength-training-supplements"]'));
	await browserText(page, review.title);
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Saved reviews (1)");
	await browserText(page, "Reader-facing correction with an explained change.");
	await browserText(page, "Bottom line changed");
	assert.equal(await page.$$eval("#reader-updates li", (rows) => rows.length), 30);
	await clickText(page, "Load older updates");
	const browserUpdateCount =
		36 + expectedComparisonEvents(["strength-training-supplements"], [review.topic.slug]).length;
	await page.waitForFunction(
		(count) => document.querySelectorAll("#reader-updates li").length === count,
		{},
		browserUpdateCount
	);
	assert.equal(
		await page.$$eval('#reader-updates a[href^="/compare/"]', (nodes) => nodes.length),
		browserUpdateCount - 36
	);
	assert.equal(await page.evaluate(() => document.body.innerText.includes("Load older updates")), false);
	await page.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
	for (const mode of ["light", "dark"]) {
		await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: mode }]);
		await page.waitForFunction(
			(mode) => document.documentElement.classList.contains("dark") === (mode === "dark"),
			{},
			mode
		);
		// Measure the selected theme after the site's color transitions finish.
		await page.evaluate(async () => {
			await new Promise((done) => requestAnimationFrame(done));
			await Promise.all(
				document
					.getAnimations()
					.filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
					.map((animation) => animation.finished.catch(() => {}))
			);
		});
		const violations = await page.evaluate(async () => (await window.axe.run()).violations);
		assert.deepEqual(violations, [], `Populated library accessibility in ${mode} mode`);
		if (process.env.READER_SMOKE_SCREENSHOT_DIR) {
			mkdirSync(process.env.READER_SMOKE_SCREENSHOT_DIR, { recursive: true });
			for (const width of [390, 1280]) {
				await page.setViewport({ width, height: 900 });
				await page.$eval("#saved-comparisons", (element) => element.scrollIntoView());
				await page.screenshot({
					path: resolve(process.env.READER_SMOKE_SCREENSHOT_DIR, `saved-comparisons-${mode}-${width}.png`)
				});
			}
		}
	}
	for (const width of [1440, 390, 320]) {
		await page.setViewport({ width, height: 900 });
		assert.ok(
			await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
			`Library overflow at ${width}`
		);
	}
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "200%";
	});
	assert.ok(
		await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
		"Enlarged text must fit."
	);
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "";
	});
	await page.setViewport({ width: 1100, height: 900 });
	// Authenticate through the actual API and then let the plugin restore auth.
	const browserLogin = async (email) =>
		page.evaluate(
			async ({ email, password }) => {
				const result = await fetch("/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				});
				return result.status;
			},
			{ email, password }
		);
	assert.equal(await browserLogin("reader-a@example.test"), 200);
	await page.reload({ waitUntil: "networkidle0" });
	await clickText(page, "My account");
	await browserText(page, "Saved reviews (1)");
	assert.equal(
		await page.evaluate(
			() => JSON.parse(localStorage.getItem("consensus-reader-library-v1")).savedReviewIds.length
		),
		1
	);
	await clickText(page, "Copy browser saves and follows to my account");
	await browserText(page, "Saved to your account.");
	await browserText(page, "Saved comparisons (2)");
	await page.waitForSelector("#saved-comparisons button:not([disabled])");
	await page.click("#saved-comparisons button");
	await browserText(page, "Saved comparisons (1)");
	await clickText(page, "Remove");
	await browserText(page, "Saved reviews (0)");
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Saved reviews (0)");
	assert.equal(
		await page.evaluate(
			() => JSON.parse(localStorage.getItem("consensus-reader-library-v1")).savedReviewIds.length
		),
		1,
		"Account edits must not overwrite browser saves."
	);
	await page.evaluate(() => document.querySelector('a[href="/account"]').click());
	await clickText(page, "Sign out");
	await page.waitForFunction(() => !document.body.innerText.includes("reader-a@example.test"));
	await page.evaluate(() => document.querySelector('a[href="/library"]').click());
	await browserText(page, "Saved reviews (1)");
	await browserText(page, "Saved comparisons (1)");
	assert.ok(await page.$('#saved-comparisons a[href="/compare/strength-training-supplements"]'));
	assert.equal(await page.evaluate(() => document.body.innerText.includes("My account")), false);
	await clickText(page, "Clear browser library…");
	await clickText(page, "Cancel");
	await browserText(page, "Saved reviews (1)");
	await clickText(page, "Clear browser library…");
	await clickText(page, "Yes, clear browser library");
	await browserText(page, "Saved reviews (0)");
	await browserText(page, "Saved comparisons (0)");
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Saved reviews (0)");
	await page.evaluate(() => localStorage.setItem("consensus-reader-library-v1", "invalid-json"));
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Your stored selections have not been overwritten.");
	assert.equal(await page.evaluate(() => localStorage.getItem("consensus-reader-library-v1")), "invalid-json");
	await clickText(page, "Clear browser library…");
	await clickText(page, "Yes, clear browser library");
	await browserText(page, "Saved reviews (0)");
	await page.goto(`${base}/compare/electricity-emissions`, { waitUntil: "networkidle0" });
	await clickText(page, "Save comparison");
	await page.goto(`${base}/library`, { waitUntil: "networkidle0" });
	await browserText(page, "Saved comparisons (1)");
	await page.waitForFunction(() => !document.body.innerText.includes("Loading updates…"));
	assert.equal(
		await page.$$eval("#reader-updates li", (nodes) => nodes.length),
		expectedComparisonEvents(["electricity-emissions"], []).length
	);
	assert.equal(await page.$('#reader-updates a[href^="/consensus/"]'), null);
	await clickText(page, "Clear browser library…");
	await clickText(page, "Yes, clear browser library");
	await browserText(page, "Saved comparisons (0)");
	assert.deepEqual(errors, []);
	await checkReaderFeedback({
		api,
		browser,
		base,
		review,
		userCookie: userA.cookie,
		adminCookie: editor.cookie,
		restartBackend: async () => {
			await stop(backend);
			await startBackend();
		},
		clickText,
		browserText,
		browserLogin: async (page) => {
			const status = await page.evaluate(
				async ({ password }) =>
					(
						await fetch("/api/auth/login", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ email: "editor@example.test", password })
						})
					).status,
				{ password }
			);
			assert.equal(status, 200);
		}
	});
	await Admin.updateOne({ _id: actor._id }, { $set: { enabled: false } });
	await api("/library/account", { cookie: editor.cookie, status: 403 });
	await api("/admin/reader-feedback", { cookie: editor.cookie, status: 403 });
	await User.updateOne({ email: "reader-b@example.test" }, { $inc: { sessionVersion: 1 } });
	await api("/library/account", { cookie: userB.cookie, status: 403 });
	console.log(
		"built library: anonymous save/follow/reload, account sync/removal/sign-out, clear confirmation, mobile/200% text and revoked sessions passed"
	);
} finally {
	await browser?.close();
	await Promise.all(
		[...children]
			.filter((child) => child !== backend)
			.filter((child) => !child.spawnargs.includes("--dbpath"))
			.map(stop)
	);
	await stop(backend);
	proxy.closeAllConnections();
	await new Promise((done) => proxy.close(done));
	if (databaseOwned && mongoose.connection.readyState === 1) {
		assert.equal(mongoose.connection.name, databaseName);
		assert.match(databaseName, /^reader_library_smoke_[a-f\d]{32}$/);
		await mongoose.connection.dropDatabase();
	}
	await mongoose.disconnect();
	await Promise.all([...children].map(stop));
	rmSync(directory, { recursive: true, force: true });
}
