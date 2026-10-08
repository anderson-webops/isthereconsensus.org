import assert from "node:assert/strict";
import { fork, spawn, spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { once } from "node:events";
import { appendFile, lstat, mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { prepareSearchGateOutput, validateCompletedTitleRows, writeSearchGateOwnership } from "./lib/search-gate-evidence.mjs";

const root = path.resolve(import.meta.dirname, "..");
const compiled = relative => import(pathToFileURL(path.join(root, relative)).href);
const { defaultClaims } = await compiled("back-end/dist/data/claims.js");
const { seedClaimFields, seedReviewDates } = await compiled("back-end/dist/data/seedClaims.js");
const { defaultTopics } = await compiled("back-end/dist/data/topics.js");
const { Claim } = await compiled("back-end/dist/models/schemas/Claim.js");
const { ClaimSource } = await compiled("back-end/dist/models/schemas/ClaimSource.js");
const { Topic } = await compiled("back-end/dist/models/schemas/Topic.js");
const { publicSearchWorkerPayload } = await compiled("search-worker/dist/back-end/src/utils/publicSearchWorker.js");
const { verifyModelAssets } = await compiled("search-worker/dist/search-worker/src/assets.js");
const { createSearchWorkerServer } = await compiled("search-worker/dist/search-worker/src/server.js");
const { SearchSupervisor } = await compiled("search-worker/dist/search-worker/src/supervisor.js");
const modelDirectory = process.env.SEARCH_GATE_MODEL_DIR;
const output = process.env.SEARCH_GATE_OUTPUT_DIR;
assert.ok(modelDirectory && output, "Explicit verified model and private evidence directories are required.");
await prepareSearchGateOutput(root, output);
const save = (name, value) => writeFile(path.join(output, name), `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
const digest = value => createHash("sha256").update(value).digest("hex");
const scratch = path.join(root, ".ai-work/runs", `sg-${randomUUID().slice(0, 8)}`);
const databaseName = `search_gate_${randomUUID().replaceAll("-", "")}`;
const rows = [];
const ownedChildren = [];
const modelChildren = [];
const forwarded = [];
const nativeBatches = [];
const completedRanks = [];
const proxyRequests = [];
const browserErrors = [];
const childRoles = new Map();
const run = new AbortController();
const referenceDate = new Date("2026-10-07T00:00:00Z");
const scopeTitles = [
	"Does a coastal pump increase pressure?",
	"Does a coastal pump not increase pressure?",
	"Does a 10000 revolutions pump increase pressure?"
];
const scopeSlugs = ["synthetic-positive", "synthetic-negative", "synthetic-numeric"];
const scopeControls = [
	{ query: "What effect does a coastal pump have on pressure?", expected: scopeSlugs.slice(0, 2) },
	{ query: "What effect does a quantum sausage have on pressure?", expected: [] },
	{ query: "What effect does a coastal pump have on airplane flight?", expected: [] },
	{ query: "What effect does pressure have on a coastal pump?", expected: [] },
	{ query: "What effect does a Martian coastal pump have on pressure?", expected: [] },
	{ query: "What effect does a 10001 revolutions pump have on pressure?", expected: [] },
	{ query: "Doesn't a coastal pump increase pressure?", expected: [scopeSlugs[1]] },
	{ query: "Should I increase my prescribed medication to reduce pressure?", expected: [] }
];
assert.equal(defaultClaims.length, 1001, "This frozen gate requires the original complete 1001-review corpus.");
assert.ok(defaultClaims.every(claim => claim.title.length <= 160));
let phase = "setup";
let worker;
let client;
let database;
let backend;
let browser;
let proxy;
let scratchOwned = false;
let databaseOwned = false;
let lastSuggestion = 0;
let apiBase;
let interruptedBy = null;
let failure;
let bodyCompleted = false;
let retainedTitles;
let activePage;

async function retainedEvidenceFile(filename) {
	assert.ok(path.isAbsolute(filename) && path.normalize(filename) === filename && filename.startsWith(`${path.join(root, ".ai-work/runs")}${path.sep}`));
	assert.equal(await realpath(filename), filename, "Retained evidence cannot use symlinks.");
	const stat = await lstat(filename);
	assert.ok(stat.isFile() && (stat.mode & 0o077) === 0 && stat.size <= 4 * 1024 * 1024);
	return readFile(filename, "utf8");
}

async function loadRetainedTitles() {
	const prior = process.env.SEARCH_GATE_PRIOR_TITLES;
	const proof = process.env.SEARCH_GATE_PRIOR_RUNTIME_PROOF;
	if (!prior && !proof) return;
	assert.ok(prior && proof, "Retained actual title rows require their frozen runtime proof.");
	const resultBytes = await retainedEvidenceFile(path.join(prior, "actual-api-title-result.json"));
	const result = JSON.parse(resultBytes);
	assert.equal(result.completed, true);
	assert.equal(result.passed, true);
	assert.equal(result.actualRouteRows, 2002);
	const rowBytes = await retainedEvidenceFile(path.join(prior, "actual-api-rows.jsonl"));
	const count = validateCompletedTitleRows(rowBytes.trim().split("\n").map(line => JSON.parse(line)), defaultClaims);
	const runtime = JSON.parse(await retainedEvidenceFile(proof));
	assert.match(runtime.sourceBase, /^[a-f\d]{40}$/u);
	const sourceDiff = spawnSync("git", ["diff", "--name-only", runtime.sourceBase, "--", "back-end/src", "search-worker/src", "package-lock.json", "back-end/package-lock.json", "back-end/.npmrc"], { cwd: root, encoding: "utf8" });
	assert.equal(sourceDiff.status, 0);
	assert.equal(sourceDiff.stdout.trim(), "", "Changed API, corpus or worker source requires a new full title gate.");
	for (const filename of ["back-end/dist/server.js", "back-end/dist/data/claims.js", "search-worker/dist/search-worker/src/supervisor.js", "search-worker/dist/search-worker/src/pipeline.js", "package-lock.json", "back-end/package-lock.json", "back-end/.npmrc"]) {
		assert.equal(digest(await readFile(path.join(root, filename))), runtime.hashes[filename], "Retained title runtime changed.");
	}
	retainedTitles = { actualRows: count, prior, sourceBase: runtime.sourceBase, rowsSha256: digest(rowBytes), resultSha256: digest(resultBytes), runtimeProofSha256: digest(await readFile(proof)), corpusHash: JSON.parse(await retainedEvidenceFile(path.join(prior, "complete-corpus-warm.json"))).corpusHash };
	await save("retained-title-verification.json", { ...retainedTitles, verifiedAt: new Date().toISOString(), cachedPredictionReplay: false, originalActualHttpResultsReused: true, newTitleRequestsIssued: false });
}

function ownership() {
	writeSearchGateOwnership(output, { parentPid: process.pid, phase, scratch, children: [...childRoles].filter(([child]) => child.pid).map(([child, role]) => ({ pid: child.pid, role })) });
}

function setPhase(nextPhase) {
	phase = nextPhase;
	ownership();
}

function abortRun(reason) {
	if (run.signal.aborted) return;
	interruptedBy = reason;
	run.abort(new Error(`Acceptance interrupted: ${reason}`));
}

function track(child, role) {
	ownedChildren.push(child);
	childRoles.set(child, role);
	child.once("error", () => abortRun(`${role}-process-error`));
	ownership();
	return child;
}

const onInterrupt = () => abortRun("SIGINT");
const onTerminate = () => abortRun("SIGTERM");
process.on("SIGINT", onInterrupt);
process.on("SIGTERM", onTerminate);
ownership();

async function listen(server) {
	server.listen(0, "127.0.0.1");
	await once(server, "listening");
	return server.address().port;
}

async function freePort() {
	const server = http.createServer();
	const port = await listen(server);
	await new Promise(resolve => server.close(resolve));
	return port;
}

function start(role, executable, argumentsList, environment) {
	run.signal.throwIfAborted();
	const child = spawn(executable, argumentsList, { cwd: scratch, env: environment, stdio: "ignore" });
	return track(child, role);
}

async function stop(child) {
	if (!child?.pid || child.exitCode !== null || child.signalCode !== null) return;
	const exited = once(child, "exit");
	child.kill("SIGTERM");
	const deadline = setTimeout(() => {
		if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
	}, 5000);
	let bound;
	try {
		await Promise.race([exited, new Promise((resolve, reject) => {
			bound = setTimeout(() => reject(new Error("Owned process did not exit after termination.")), 10_000);
		})]);
	}
	finally {
		clearTimeout(deadline);
		clearTimeout(bound);
	}
}

async function waitFor(predicate, milliseconds, label) {
	const deadline = Date.now() + milliseconds;
	while (Date.now() < deadline) {
		run.signal.throwIfAborted();
		if (await predicate()) return;
		await delay(100, undefined, { signal: run.signal });
	}
	throw new Error(`Timed out: ${label}`);
}

const supervisor = new SearchSupervisor({ modelDirectory, createChild: () => {
	run.signal.throwIfAborted();
	const guard = process.env.SEARCH_GATE_CHILD_NETWORK_GUARD;
	const child = fork(path.join(root, "search-worker/dist/search-worker/src/child.js"), [modelDirectory], {
		...(guard ? { execPath: guard } : {}),
		execArgv: [...(guard ? [process.execPath] : []), "--max-old-space-size=512"],
		env: { NODE_ENV: "production", ONNXRUNTIME_NODE_INSTALL: "skip" },
		serialization: "advanced",
		stdio: ["ignore", "ignore", "ignore", "ipc"]
	});
	const send = child.send.bind(child);
	child.send = (message, ...argumentsList) => {
		if (message.kind === "rank") forwarded.push({ pid: child.pid, job: message.job, queryHash: message.payload.queryHash, corpusHash: message.payload.corpusHash });
		return send(message, ...argumentsList);
	};
	modelChildren.push(child);
	child.on("message", (message) => {
		if (message.kind === "reply") completedRanks.push({ pid: child.pid, job: message.job, queryHash: message.response.queryHash });
	});
	return track(child, "model");
} });
supervisor.on("scoring", event => nativeBatches.push(event));
const runDeadline = setTimeout(abortRun, 75 * 60_000, "deadline");

async function fixture(seed, topic, sources) {
	run.signal.throwIfAborted();
	const claim = new Claim({ ...seedClaimFields(seed), ...seedReviewDates(seed), slug: seed.slug, status: "published", topic: topic._id, publishedAt: referenceDate });
	await claim.validate();
	await database.collection("claims").insertOne(claim.toObject());
	for (const entry of sources) {
		const source = new ClaimSource({ ...entry, claim: claim._id });
		await source.validate();
		await database.collection("claimsources").insertOne(source.toObject());
	}
	return claim;
}

async function warm(corpus) {
	const payload = publicSearchWorkerPayload(corpus, "Initial cold corpus request", referenceDate);
	const started = performance.now();
	await assert.rejects(supervisor.rank(payload, run.signal));
	await waitFor(() => supervisor.state.ready, 610_000, "complete actual corpus warm");
	return { corpusHash: payload.corpusHash, reviewCount: corpus.length, elapsedMilliseconds: performance.now() - started };
}

async function search(route, query) {
	if (route === "search/suggestions") {
		await delay(Math.max(0, lastSuggestion + 2200 - Date.now()), undefined, { signal: run.signal });
		lastSuggestion = Date.now();
	}
	run.signal.throwIfAborted();
	const response = await fetch(`${apiBase}/api/${route}?q=${encodeURIComponent(query)}&limit=3`, { signal: AbortSignal.any([run.signal, AbortSignal.timeout(12_000)]) });
	assert.equal(response.status, 200, `Actual ${route} returned ${response.status}; no rejected request counts as a pass.`);
	return (await response.json()).claims;
}

try {
	await verifyModelAssets(modelDirectory);
	await loadRetainedTitles();
	run.signal.throwIfAborted();
	await appendFile(path.join(root, ".ai-work/INDEX.md"), `\n- \`${path.relative(root, scratch)}/\`: Owned pinned-search acceptance socket/database scratch; synthetic loopback fixtures only. Created ${new Date().toISOString()}; owning script removes it after all children exit. Evidence retained in \`${path.relative(root, output)}\`.\n`);
	await mkdir(scratch, { mode: 0o700 });
	scratchOwned = true;
	worker = await createSearchWorkerServer(path.join(scratch, "worker.sock"), supervisor);
	const mongoPort = await freePort();
	await mkdir(path.join(scratch, "database"));
	start("database", process.env.SEARCH_GATE_MONGOD || "mongod", ["--bind_ip", "127.0.0.1", "--port", String(mongoPort), "--dbpath", path.join(scratch, "database"), "--wiredTigerCacheSizeGB", "0.25", "--quiet"], { PATH: process.env.PATH });
	client = new mongoose.mongo.MongoClient(`mongodb://127.0.0.1:${mongoPort}/${databaseName}`, { serverSelectionTimeoutMS: 500, connectTimeoutMS: 1000, socketTimeoutMS: 5000 });
	await waitFor(async () => {
		try {
			await client.connect();
			return (await client.db().command({ ping: 1 })).ok === 1;
		}
		catch { return false; }
	}, 30_000, "owned loopback database");
	database = client.db(databaseName);
	assert.equal(await database.listCollections().hasNext(), false);
	databaseOwned = true;
	const topic = new Topic({ title: "Isolated synthetic scope controls", slug: "isolated-scope-controls" });
	await topic.validate();
	await database.collection("topics").insertOne(topic.toObject());
	const scopeCorpus = [];
	for (const [index, title] of scopeTitles.entries()) {
		const seed = {
			...defaultClaims[0],
			title,
			slug: scopeSlugs[index],
			topicSlug: topic.slug,
			bottomLine: title,
			editorSummary: title,
			stableCore: [title, title],
			misconceptions: [],
			misconceptionTags: [],
			uncertaintySummary: "Synthetic control only, not scientific evidence or a real public review.",
			openQuestions: ["This fictional control has no scientific conclusion."],
			evidenceSummaries: [{ question: title, finding: "Synthetic scope-control fixture only.", effectDirection: "unclear", limitations: ["Not scientific evidence."] }]
		};
		await fixture(seed, topic, [
			{ title: "Synthetic control reference one", kind: "technical_reference", url: "https://example.test/control/one" },
			{ title: "Synthetic control reference two", kind: "context", url: "https://example.test/control/two" }
		]);
		scopeCorpus.push({ ...seed, status: "published" });
	}
	const storedScope = await database.collection("claims").find({ status: "published" }).toArray();
	assert.equal(publicSearchWorkerPayload(storedScope.map(claim => ({ ...claim, topicSlug: topic.slug })), "Scope fixture integrity", referenceDate).corpusHash, publicSearchWorkerPayload(scopeCorpus, "Scope fixture integrity", referenceDate).corpusHash);
	await save("gate-declaration.json", { sourceBase: "v1.38.21", corpusReviews: 1001, controls: scopeControls, controlTitles: scopeTitles, controlReadinessScaffolding: "Original three titles are repeated verbatim as bottomLine/editorSummary/stableCore. Readiness dates, evidence summaries and two synthetic example.test references are added. This is an explicit actual-API fixture adaptation, not byte-identical title-only worker input.", nativeExactTitleShortcutPreserved: true, rateLimitsUnmodified: true, modelRuntimeDownloads: false, modelChildOsNetworkGuard: Boolean(process.env.SEARCH_GATE_CHILD_NETWORK_GUARD), freshQuestionsOpened: false, productionPublication: false });
	setPhase("actual-api-scope-controls");
	const scopeWarm = await warm(scopeCorpus);
	const backendPort = await freePort();
	apiBase = `http://127.0.0.1:${backendPort}`;
	backend = start("backend", process.execPath, ["--max-old-space-size=256", path.join(root, "back-end/dist/server.js")], {
		PATH: process.env.PATH,
		NODE_ENV: "production",
		HOST: "127.0.0.1",
		PORT: String(backendPort),
		DOTENV_CONFIG_PATH: path.join(scratch, "no-env-file"),
		MONGODB_URI: `mongodb://127.0.0.1:${mongoPort}/${databaseName}`,
		SESSION_SECRET: randomUUID() + randomUUID(),
		CAPTCHA_SECRET: randomUUID() + randomUUID(),
		PUBLIC_SITE_URL: "https://example.test",
		SEARCH_WORKER_SOCKET: path.join(scratch, "worker.sock")
	});
	await waitFor(async () => {
		try {
			return (await fetch(`${apiBase}/readyz`, { signal: AbortSignal.timeout(1000) })).ok;
		}
		catch { return false; }
	}, 60_000, "compiled actual API");
	assert.equal((await (await fetch(`${apiBase}/api/claims?limit=1`)).json()).pagination.total, 3);
	for (const control of scopeControls) {
		for (const route of ["claims", "search/suggestions"]) {
			const claims = await search(route, control.query);
			const predicted = claims.map(claim => claim.slug);
			const row = { kind: "scope", route, queryHash: digest(control.query), predicted, expected: control.expected, passed: JSON.stringify(predicted) === JSON.stringify(control.expected) };
			rows.push(row);
			await appendFile(path.join(output, "actual-api-rows.jsonl"), `${JSON.stringify(row)}\n`, { mode: 0o600 });
			assert.deepEqual(predicted, control.expected);
		}
	}
	await save("actual-api-scope-result.json", { completed: true, passed: true, rows: rows.length, originalQueriesAndExpectedOrderPreserved: true, explicitReadinessFixtureAdaptation: true, scopeWarm, actualPinnedModels: true, actualBothApis: true, nativeBatchCount: nativeBatches.length, freshQuestionsOpened: false });
	for (const collection of ["claims", "claimsources", "topics"]) await database.collection(collection).deleteMany({});
	const topics = new Map();
	for (const seed of defaultTopics) {
		const entry = new Topic(seed);
		await entry.validate();
		await database.collection("topics").insertOne(entry.toObject());
		topics.set(seed.slug, entry);
	}
	for (const seed of defaultClaims) await fixture(seed, topics.get(seed.topicSlug), seed.sources);
	const catalog = await (await fetch(`${apiBase}/api/claims?limit=1`)).json();
	assert.equal(catalog.pagination.total, 1001);
	const corpus = defaultClaims.map(claim => ({ ...claim, status: "published" }));
	const stored = await database.collection("claims").find({ status: "published" }).toArray();
	const topicById = new Map([...topics.values()].map(entry => [String(entry._id), entry.slug]));
	assert.equal(publicSearchWorkerPayload(stored.map(claim => ({ ...claim, topicSlug: topicById.get(String(claim.topic)) })), "Corpus integrity", referenceDate).corpusHash, publicSearchWorkerPayload(corpus, "Corpus integrity", referenceDate).corpusHash);
	setPhase("complete-corpus-warm");
	const corpusWarm = await warm(corpus);
	if (retainedTitles) assert.equal(corpusWarm.corpusHash, retainedTitles.corpusHash);
	await save("complete-corpus-warm.json", corpusWarm);
	setPhase("actual-api-complete-title-controls");
	for (const [index, claim] of (retainedTitles ? [] : defaultClaims).entries()) {
		for (const route of ["claims", "search/suggestions"]) {
			const predicted = (await search(route, claim.title)).map(row => row.slug);
			const row = { kind: "title", route, slug: claim.slug, predicted, passed: predicted[0] === claim.slug };
			rows.push(row);
			await appendFile(path.join(output, "actual-api-rows.jsonl"), `${JSON.stringify(row)}\n`, { mode: 0o600 });
			assert.equal(predicted[0], claim.slug);
		}
		if ((index + 1) % 25 === 0 || index === 1000) {
			await save("progress.json", { phase, titleControlsPerRoute: index + 1, rows: rows.length, complete: false, freshQuestionsOpened: false });
			console.log(JSON.stringify({ phase, titleControlsPerRoute: index + 1, rows: rows.length }));
		}
	}
	if (!retainedTitles) await save("actual-api-title-result.json", { completed: true, passed: true, titleCount: 1001, actualRouteRows: 2002, actualBothApis: true, allFirstResultsMatchCanonicalSlug: true, nativeExactTitleShortcutPreserved: true, noQueryReplay: true, preparedFixtureCorpusNotProduction: true, freshQuestionsOpened: false });
	setPhase("whole-corpus-actual-browser-typing");
	await delay(61_000, undefined, { signal: run.signal });
	const frontendPort = await freePort();
	start("frontend", process.execPath, [path.join(root, "front-end/.output/server/index.mjs")], { PATH: process.env.PATH, NODE_ENV: "production", HOST: "127.0.0.1", PORT: String(frontendPort), NUXT_API_INTERNAL_BASE: `${apiBase}/api`, NUXT_PUBLIC_API_BASE: "/api", NUXT_PUBLIC_CAPTCHA_SITE_KEY: "" });
	proxy = http.createServer((request, response) => {
		const url = new URL(request.url, "http://127.0.0.1");
		const observation = { pathname: url.pathname, queryHash: digest(url.searchParams.get("q") || ""), status: null };
		proxyRequests.push(observation);
		const upstream = http.request({ hostname: "127.0.0.1", port: request.url.startsWith("/api/") ? backendPort : frontendPort, path: request.url, method: request.method, headers: request.headers }, (incoming) => {
			observation.status = incoming.statusCode;
			response.writeHead(incoming.statusCode, incoming.headers);
			incoming.pipe(response);
		});
		response.on("close", () => {
			if (!response.writableEnded) upstream.destroy();
		});
		request.on("aborted", () => upstream.destroy());
		upstream.on("error", () => {
			if (!response.destroyed && !response.writableEnded) {
				response.writeHead(503);
				response.end("Unavailable");
			}
		});
		request.pipe(upstream);
	});
	const base = `http://127.0.0.1:${await listen(proxy)}`;
	await waitFor(async () => {
		try {
			return (await fetch(`${base}/healthz`, { signal: AbortSignal.timeout(1000) })).ok;
		}
		catch { return false; }
	}, 30_000, "built frontend");
	assert.ok(process.env.PUPPETEER_EXECUTABLE_PATH, "Use an explicitly selected, already installed browser.");
	browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, userDataDir: path.join(scratch, "browser"), headless: true, args: ["--no-sandbox"] });
	track(browser.process(), "browser");
	const browserRows = [];
	const query = "My afternoon cuppa no longer perks me up. Do people get used to it?";
	const queryHash = digest(query);
	const expectedSlug = "does-caffeine-become-less-effective-with-regular-daily-use";
	const expectedTitle = defaultClaims.find(claim => claim.slug === expectedSlug).title;
	const prefixes = [1, 2, 4, 8, 12, 16, 20, 24].map(length => query.slice(0, length));
	for (const surface of [{ route: "/consensus", input: "#directory-search" }, { route: "/ask", input: "#claim-question" }, { route: "/", input: "#home-search" }].flatMap(surface => [35, 100].map(typingIntervalMilliseconds => ({ ...surface, typingIntervalMilliseconds })))) {
		run.signal.throwIfAborted();
		const page = await browser.newPage();
		activePage = page;
		page.on("pageerror", error => browserErrors.push(error.message));
		page.setDefaultTimeout(15_000);
		await page.setRequestInterception(true);
		page.on("request", (request) => {
			const url = new URL(request.url());
			if (url.origin === base || ["data:", "blob:"].includes(url.protocol)) void request.continue();
			else void request.abort();
		});
		await page.goto(base + surface.route, { waitUntil: "networkidle0" });
		await page.waitForFunction(() => Boolean(document.querySelector("#__nuxt")?.__vue_app__));
		await page.waitForSelector(surface.input);
		const batchStart = nativeBatches.length;
		const traceStart = forwarded.length;
		const firstChild = modelChildren.at(-1);
		const setInput = value => page.$eval(surface.input, (input, nextValue) => {
			input.value = nextValue;
			input.dispatchEvent(new Event("input", { bubbles: true }));
		}, value);
		const displayed = () => page.waitForFunction((route, slug, title) => route === "/consensus"
			? document.querySelector("#reviewed-claims .claim-card")?.getAttribute("href")?.endsWith(slug)
			: route === "/ask"
				? document.querySelector(".match-row h3")?.textContent?.trim() === title
				: document.querySelector(".suggestion-list a")?.getAttribute("href")?.endsWith(slug), {}, surface.route, expectedSlug, expectedTitle);
		await setInput("coffee stopped working");
		await displayed();
		const completionStart = completedRanks.length;
		await setInput(query);
		await waitFor(() => nativeBatches.length > batchStart, 10_000, "actual browser query starts native inference");
		const recoveryStarted = performance.now();
		for (const prefix of prefixes) {
			await setInput(prefix);
			await delay(surface.typingIntervalMilliseconds, undefined, { signal: run.signal });
		}
		await setInput(query);
		await waitFor(() => firstChild.signalCode === "SIGKILL", 3000, "browser abort reaps owned inference child");
		await displayed();
		const trace = forwarded.slice(traceStart);
		assert.equal(trace.filter(row => row.queryHash === queryHash).length, 2);
		assert.equal(trace.filter(row => prefixes.some(prefix => digest(prefix) === row.queryHash)).length, 0);
		assert.ok(nativeBatches.slice(batchStart).some(event => event.ownedChildPid !== firstChild.pid));
		assert.equal(completedRanks.slice(completionStart).filter(row => row.queryHash === queryHash && row.pid !== firstChild.pid).length, 1, "The final native reply must complete; fallback alone is not model acceptance.");
		browserRows.push({ surface: surface.route, typingIntervalMilliseconds: surface.typingIntervalMilliseconds, originalCoffeeUiControlPassed: true, nativeInferenceProbe: "Original exposed development q01, selected because coffee stopped working does not require a GTE batch", actualNativeInferenceCancelled: true, firstOwnedChildReaped: true, cancelledPrefixes: prefixes.length, forwardedPrefixes: 0, finalSettledQueryForwardedOnce: true, finalNativeReplyCompleted: true, queryReplay: false, displayedExpectedReview: true, recoveryMilliseconds: performance.now() - recoveryStarted });
		await page.close();
	}
	await save("actual-browser-typing-result.json", { completed: true, passed: true, actualFull1001Corpus: true, actualBuiltBrowserAndBothApis: true, additionalHomeSurface: true, localAbortPropagatingReverseProxy: true, deploymentProxyVerified: false, rows: browserRows, platform: process.platform, architecture: process.arch, nativeLinuxHostAcceptance: false, freshQuestionsOpened: false, productionMutation: false });
	run.signal.throwIfAborted();
	bodyCompleted = true;
}
catch (error) {
	failure = error;
	if (activePage && !activePage.isClosed()) {
		await save("browser-diagnostic.json", { state: await activePage.evaluate(() => ({ path: location.pathname, readyState: document.readyState, hydrated: Boolean(document.querySelector("#__nuxt")?.__vue_app__), input: document.querySelector("input")?.value, message: document.querySelector(".empty-state")?.textContent?.trim() })), browserErrors, proxyRequests, forwarded, nativeBatches, completedRanks, supervisorState: supervisor.state });
	}
	await save("failure.json", { phase, name: error.name, code: error.code ?? null, message: error.message, interruptedBy, completedRows: rows.length, completed: false, freshQuestionsOpened: false, productionMutation: false });
}
finally {
	clearTimeout(runDeadline);
	const errors = [];
	const cleanupStep = async (step, action) => {
		try {
			await action();
		}
		catch (error) {
			errors.push({ step, name: error.name, code: error.code ?? null });
		}
	};
	await cleanupStep("cleanup-ownership", () => setPhase("cleanup"));
	await cleanupStep("browser", async () => browser?.close());
	await cleanupStep("proxy", async () => {
		if (!proxy) return;
		proxy.closeAllConnections();
		await new Promise(resolve => proxy.close(resolve));
	});
	await cleanupStep("worker", async () => worker?.close());
	await cleanupStep("supervisor", () => supervisor.close());
	await cleanupStep("backend", () => stop(backend));
	let databaseDropConfirmed = false;
	await cleanupStep("database-drop", async () => {
		if (client && databaseOwned) {
			await client.db(databaseName).dropDatabase();
			databaseDropConfirmed = true;
		}
	});
	await cleanupStep("database-client", async () => client?.close());
	for (const child of ownedChildren.toReversed()) await cleanupStep(`${childRoles.get(child)}-process`, () => stop(child));
	const exited = child => !child.pid || child.exitCode !== null || child.signalCode !== null;
	const allOwnedProcessesExited = ownedChildren.every(exited);
	let scratchRemoved = false;
	await cleanupStep("scratch", async () => {
		assert.ok(allOwnedProcessesExited, "Preserve scratch while an owned process remains live.");
		if (scratchOwned) {
			await rm(scratch, { recursive: true, force: true });
			scratchRemoved = true;
		}
	});
	await save("cleanup.json", { passed: errors.length === 0 && allOwnedProcessesExited, errors, allOwnedModelChildrenExited: modelChildren.every(exited), allOwnedProcessesExited, databaseDropConfirmed, scratchRemoved, freshQuestionsOpened: false });
	setPhase(errors.length === 0 && allOwnedProcessesExited ? "cleanup-complete" : "cleanup-incomplete");
	await appendFile(path.join(root, ".ai-work/INDEX.md"), `\n- \`${path.relative(root, scratch)}/\`: ${scratchRemoved ? "Removed by its owner after verified child exit" : "Retained after incomplete cleanup"}; unique evidence remains in \`${path.relative(root, output)}\`.\n`);
	process.off("SIGINT", onInterrupt);
	process.off("SIGTERM", onTerminate);
	const passed = bodyCompleted && !failure && !run.signal.aborted && errors.length === 0 && allOwnedProcessesExited;
	await save("acceptance-result.json", { completed: bodyCompleted, passed, interruptedBy, actualTitleRowsThisRun: rows.filter(row => row.kind === "title").length, reusedVerifiedActualTitleRows: retainedTitles?.actualRows ?? 0, actualScopeRowsThisRun: rows.filter(row => row.kind === "scope").length, actualBrowserSurfaces: bodyCompleted ? 3 : null, requiredSearchApiSurfaces: 2, browserTypingIntervalsMilliseconds: [35, 100], cleanupPassed: errors.length === 0 && allOwnedProcessesExited, modelChildOsNetworkGuard: Boolean(process.env.SEARCH_GATE_CHILD_NETWORK_GUARD), freshQuestionsOpened: false, nativeLinuxHostAcceptance: false, productionPublication: false });
	if (!passed) process.exitCode = 1;
	console.log(passed ? "Complete actual-API title/scope and whole-corpus browser typing gates pass; fresh and native-host acceptance remain separate." : "Acceptance is incomplete or failed; exact evidence and cleanup results are retained.");
}
