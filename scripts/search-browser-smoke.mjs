// Run after npm run build: node --import tsx scripts/search-browser-smoke.mjs
// Uses the real catalog and ranker with a local read-only API fixture. No database
// or production credentials are used. Backend route security remains separately tested.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdirSync } from "node:fs";
import http from "node:http";
import { resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer";
import { defaultClaims } from "../back-end/src/data/claims.ts";
import { defaultTopics } from "../back-end/src/data/topics.ts";
import { createClaimSearchIndex } from "../back-end/src/utils/claimSearch.ts";
import { readingGuides } from "../front-end/src/data/reading-guides/index.ts";
import { loadReadingGuide } from "../front-end/src/data/reading-guides/load.ts";
import { checkComparisons } from "./lib/check-comparisons.mjs";

const topics = defaultTopics.map((topic) => ({
	...topic,
	_id: topic.slug,
	claimCount: defaultClaims.filter((claim) => claim.topicSlug === topic.slug).length
}));
const catalog = defaultClaims.map((claim) => ({
	...claim,
	_id: claim.slug,
	topic: topics.find((topic) => topic.slug === claim.topicSlug)
}));
const search = createClaimSearchIndex(catalog);
const caffeineSlug = "does-caffeine-become-less-effective-with-regular-daily-use";
const vaccineSlug = "do-childhood-vaccines-cause-autism";
const delays = new Map();
const failures = new Set();
const requests = [];
const pendingInterceptions = new Set();
const interceptionErrors = [];
let baseUrl;
let browser;
let page;
let frontend;
let frontendOutput = "";
const api = http.createServer(async (req, res) => {
	const url = new URL(req.url, "http://localhost");
	const query = url.searchParams.get("q") ?? "";
	requests.push({ path: url.pathname, query });
	res.setHeader("access-control-allow-origin", baseUrl);
	res.setHeader("access-control-allow-credentials", "true");
	res.setHeader("content-type", "application/json");
	if (delays.has(query)) await delay(delays.get(query));
	if (failures.has(query)) {
		res.writeHead(503);
		res.end(JSON.stringify({ error: "Search fixture unavailable" }));
		return;
	}
	let body = {};
	if (url.pathname === "/api/topics") body = { topics };
	if (url.pathname === "/api/auth/me") body = { user: null, admin: null };
	const topicMatch = url.pathname.match(/^\/api\/topics\/([^/]+)(?:\/claims(?:\/([^/]+))?)?$/);
	if (topicMatch) {
		const topic = topics.find((entry) => entry.slug === topicMatch[1]);
		const claims = catalog.filter((claim) => claim.topicSlug === topicMatch[1]);
		body = topicMatch[2]
			? { claim: claims.find((claim) => claim.slug === topicMatch[2]), relatedClaims: [], collections: [] }
			: url.pathname.endsWith("/claims")
				? { claims, collections: [] }
				: { topic };
	}
	if (url.pathname === "/api/claims") {
		const rows = query ? search(query).map((row) => ({ ...row.claim, ...row.match })) : catalog;
		const page = Number(url.searchParams.get("page") || 1);
		const pageSize = Number(url.searchParams.get("limit") || 24);
		body = {
			claims: rows.slice((page - 1) * pageSize, page * pageSize),
			pagination: {
				page,
				pageSize,
				total: rows.length,
				totalPages: Math.max(1, Math.ceil(rows.length / pageSize)),
				hasMore: page * pageSize < rows.length
			}
		};
	}
	if (url.pathname === "/api/search/suggestions")
		body = {
			claims: search(query)
				.slice(0, 6)
				.map((row) => ({ ...row.claim, ...row.match })),
			topics: [],
			questions: []
		};
	res.end(JSON.stringify(body));
});

async function listen(server) {
	server.listen(0, "127.0.0.1");
	await once(server, "listening");
	return server.address().port;
}

async function waitUntil(check, message) {
	const deadline = Date.now() + 30_000;
	while (Date.now() < deadline) {
		if (await check()) return;
		await delay(100);
	}
	throw new Error(message);
}

async function setInput(page, selector, value) {
	await page.$eval(
		selector,
		(input, nextValue) => {
			input.value = nextValue;
			input.dispatchEvent(new Event("input", { bubbles: true }));
		},
		value
	);
}

async function assertFirstReview(page, slug) {
	await page.waitForFunction(
		// Homepage cards share the class and can remain visible while Nuxt
		// resolves a history navigation. Require the destination directory.
		(expected) =>
			location.pathname === "/consensus" &&
			Boolean(document.querySelector("#directory-search")) &&
			document.querySelector("#reviewed-claims .claim-card")?.getAttribute("href")?.endsWith(expected),
		{},
		slug
	);
}

try {
	const portProbe = http.createServer();
	const frontendPort = await listen(portProbe);
	await new Promise((done) => portProbe.close(done));
	baseUrl = `http://127.0.0.1:${frontendPort}`;
	const apiPort = await listen(api);
	// Match the normalized production default: the backend origin has no /api
	// suffix. Each API consumer must add that prefix using the shared helper.
	const apiUrl = `http://127.0.0.1:${apiPort}`;
	frontend = spawn(process.execPath, [resolve("front-end/.output/server/index.mjs")], {
		env: {
			...process.env,
			NODE_ENV: "production",
			HOST: "127.0.0.1",
			PORT: String(frontendPort),
			NUXT_API_INTERNAL_BASE: apiUrl,
			NUXT_PUBLIC_API_BASE: "/api"
		},
		stdio: ["ignore", "pipe", "pipe"]
	});
	frontend.on("error", (error) => {
		frontendOutput += error.message;
	});
	for (const stream of [frontend.stdout, frontend.stderr])
		stream.on("data", (data) => {
			frontendOutput = (frontendOutput + data).slice(-8000);
		});
	await waitUntil(async () => {
		if (frontend.exitCode !== null) throw new Error(frontendOutput);
		try {
			return (await fetch(`${baseUrl}/healthz`)).ok;
		} catch {
			return false;
		}
	}, "Built frontend did not start");
	const ssr = await fetch(`${baseUrl}/consensus?q=coffee%20stopped%20working`);
	assert.equal(ssr.status, 200);
	assert.ok((await ssr.text()).includes(caffeineSlug), "SSR must render ranked review before hydration");
	const executablePath = [
		process.env.PUPPETEER_EXECUTABLE_PATH,
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		"/usr/bin/google-chrome",
		"/usr/bin/google-chrome-stable",
		"/usr/bin/chromium"
	].find((path) => path && existsSync(path));
	browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
	page = await browser.newPage();
	const pageErrors = [];
	page.on("pageerror", (error) => pageErrors.push(error.message));
	page.setDefaultTimeout(15_000);
	await page.setRequestInterception(true);
	async function interceptRequest(request) {
		const url = new URL(request.url());
		// Mirror the production reverse proxy, keeping the browser's strict
		// same-origin connect-src policy intact.
		if (url.origin === baseUrl && url.pathname.startsWith("/api/")) {
			const response = await fetch(`http://127.0.0.1:${apiPort}${url.pathname}${url.search}`, {
				signal: AbortSignal.timeout(10_000)
			});
			await request.respond({
				status: response.status,
				contentType: "application/json",
				body: await response.text()
			});
		} else if (["127.0.0.1", "localhost"].includes(url.hostname) || ["data:", "blob:"].includes(url.protocol))
			await request.continue();
		else await request.abort();
	}
	page.on("request", (request) => {
		const operation = interceptRequest(request)
			.catch((error) => {
				interceptionErrors.push(error);
			})
			.finally(() => pendingInterceptions.delete(operation));
		pendingInterceptions.add(operation);
	});
	async function open(path) {
		await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle0" });
		await page.waitForFunction(() => Boolean(document.querySelector("#__nuxt")?.__vue_app__));
	}
	await page.setViewport({ width: 1280, height: 900 });
	const completeSitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
	assert.equal(completeSitemapResponse.status, 200);
	const completeSitemap = await completeSitemapResponse.text();
	for (const topic of topics) assert.ok(completeSitemap.includes(`<loc>https://isthereconsensus.org/consensus/${topic.slug}</loc>`), `sitemap topic ${topic.slug}`);
	for (const claim of catalog) assert.ok(completeSitemap.includes(`<loc>https://isthereconsensus.org/consensus/${claim.topicSlug}/${claim.slug}</loc>`), `sitemap review ${claim.slug}`);
	console.log("PASS complete topic/review sitemap with the default backend-origin configuration");
	await checkComparisons({ page, baseUrl, open });
	// Guides use source-controlled narrative, independent of backend availability.
	for (const guide of readingGuides) {
		const content = await loadReadingGuide(guide.slug);
		const response = await fetch(`${baseUrl}/guides/${guide.slug}`);
		assert.equal(response.status, 200);
		const html = await response.text();
		assert.ok(html.includes(guide.title));
		assert.ok(html.includes("Sources and their limits"));
		await open(`/guides/${guide.slug}`);
		assert.equal(await page.$eval("h1", (element) => element.textContent), guide.title);
		assert.equal(
			await page.$eval('link[rel="canonical"]', (element) => element.href),
			`https://isthereconsensus.org/guides/${guide.slug}`
		);
		const articleMetadata = await page.evaluate(() =>
			Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
				.map((script) => JSON.parse(script.textContent))
				.find((entry) => entry["@type"] === "Article")
		);
		assert.equal(articleMetadata.headline, guide.title);
		assert.equal(articleMetadata.dateModified, guide.checkedAt);
		assert.deepEqual(
			articleMetadata.citation,
			content.sources.map((source) => source.url)
		);
		const renderedParagraphs = await page.$$eval(".guide-section > p", (paragraphs) =>
			paragraphs.map((paragraph) => paragraph.textContent)
		);
		for (const paragraph of content.sections.flatMap((section) => section.paragraphs))
			assert.ok(
				renderedParagraphs.some((text) => text.includes(paragraph.text)),
				`${guide.slug}: missing body text`
			);
		assert.equal(
			await page.evaluate(() =>
				Array.from(document.querySelectorAll('main a[href^="#"]')).every((link) =>
					document.getElementById(link.getAttribute("href").slice(1))
				)
			),
			true
		);
		assert.equal((await page.$$(".guide-review-links a")).length, guide.reviews.length);
		assert.equal(
			await page.$eval(".guide-source-list", (element) => getComputedStyle(element).listStyleType),
			"decimal",
			"source numbers must remain visible beside the references"
		);
		for (const width of [390, 320]) {
			await page.setViewport({ width, height: 844 });
			assert.equal(
				await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
				false,
				`${guide.slug}: overflow at ${width}px`
			);
		}
		await page.setViewport({ width: 390, height: 844 });
		await page.evaluate(() => {
			document.documentElement.style.fontSize = "200%";
		});
		assert.equal(
			await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
			false,
			`${guide.slug}: overflow at 200% text`
		);
		await page.evaluate(() => {
			document.documentElement.style.fontSize = "";
		});
		// Wait for font/layout repaint after text enlargement before a full-page
		// capture; stale enlarged document bounds can otherwise stretch the shot.
		await page.evaluate(async () => {
			await document.fonts.ready;
			await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
		});
		assert.equal((await page.$$(".reading-guide")).length, 1, `${guide.slug}: duplicate article`);
		const layout = await page.evaluate(() => ({
			pageHeight: document.documentElement.scrollHeight,
			shellHeight: document.querySelector(".site-shell").getBoundingClientRect().height,
			guideHeight: document.querySelector(".reading-guide").getBoundingClientRect().height,
			fontSize: getComputedStyle(document.documentElement).fontSize
		}));
		assert.ok(
			layout.pageHeight <= Math.ceil(layout.shellHeight) + 1,
			`${guide.slug}: content outside the page shell`
		);
		if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && guide.slug === "interpreting-medical-evidence") {
			console.log("Medical guide mobile layout:", layout);
			mkdirSync(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, { recursive: true });
			await page.screenshot({
				path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, "medical-guide-mobile.png"),
				fullPage: true
			});
		}
		await page.setViewport({ width: 1280, height: 900 });
		if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && guide.slug === "interpreting-medical-evidence")
			await page.screenshot({
				path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, "medical-guide-desktop.png"),
				fullPage: true
			});
	}
	await open("/guides");
	assert.equal((await page.$$(".guide-card")).length, readingGuides.length);
	await page.click(`.guide-card a[href="/guides/${readingGuides[0].slug}"]`);
	await page.waitForSelector(".reading-guide");
	await page.click(".guide-contents summary");
	await page.click('.guide-contents a[href="#guide-sources"]');
	await page.waitForFunction(() => location.hash === "#guide-sources");
	assert.ok(await page.$eval("#guide-sources", (element) => Math.abs(element.getBoundingClientRect().top) < 80));
	await page.click('.guide-footer a[href="/guides"]');
	await page.waitForSelector(".guide-card");
	await page.click(`.guide-card a[href="/guides/${readingGuides[1].slug}"]`);
	await page.waitForFunction(
		(title) => document.querySelector("h1")?.textContent === title,
		{},
		readingGuides[1].title
	);
	await page.goBack({ waitUntil: "networkidle0" });
	await page.waitForSelector(".guide-card");
	await page.goForward({ waitUntil: "networkidle0" });
	await page.waitForFunction(
		(title) => document.querySelector("h1")?.textContent === title,
		{},
		readingGuides[1].title
	);
	for (const width of [390, 320]) {
		await page.setViewport({ width, height: 844 });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
	}
	await page.setViewport({ width: 390, height: 844 });
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "200%";
	});
	assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "";
	});
	await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
	assert.equal((await page.$$(".reading-guide")).length, 1, "navigation must not retain a second guide");
	console.log(
		"Guide layout after text resize:",
		await page.evaluate(() => ({
			pageHeight: document.documentElement.scrollHeight,
			shellHeight: document.querySelector(".site-shell").getBoundingClientRect().height,
			guideHeight: document.querySelector(".reading-guide").getBoundingClientRect().height,
			fontSize: getComputedStyle(document.documentElement).fontSize
		}))
	);
	if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR) {
		mkdirSync(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, { recursive: true });
		await page.screenshot({
			path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, "guide-mobile.png"),
			fullPage: false
		});
		await page.setViewport({ width: 1280, height: 900 });
		await page.screenshot({
			path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, "guide-desktop.png"),
			fullPage: true
		});
	}
	const discoveryPages = new Map();
	for (const guide of readingGuides) {
		const exampleReview = guide.reviews[0];
		await open(exampleReview.path);
		await page.click(`.guide-links a[href="/guides/${guide.slug}"]`);
		await page.waitForFunction((title) => document.querySelector("h1")?.textContent === title, {}, guide.title);
		await page.click(`.guide-review-links a[href="${exampleReview.path}"]`);
		await page.waitForSelector(".claim-page h1");
		for (const path of [
			...guide.reviews.map((review) => review.path),
			...guide.topics.map((topic) => `/consensus/${topic}`)
		]) {
			if (!discoveryPages.has(path)) discoveryPages.set(path, new Set());
			discoveryPages.get(path).add(guide.slug);
		}
	}
	for (const [path, slugs] of discoveryPages) {
		const response = await fetch(`${baseUrl}${path}`);
		assert.equal(response.status, 200, `linked destination ${path}`);
		const html = await response.text();
		for (const slug of slugs)
			assert.ok(html.includes(`href="/guides/${slug}"`), `${path}: missing guide discovery ${slug}`);
	}
	await open("/explainers");
	assert.equal((await page.$$(".guide-links li")).length, readingGuides.length);
	failures.add("");
	const independentSitemap = await fetch(`${baseUrl}/sitemap.xml`).then((response) => response.text());
	for (const guide of readingGuides) assert.ok(independentSitemap.includes(`/guides/${guide.slug}`));
	for (const guide of readingGuides) {
		const independentGuide = await fetch(`${baseUrl}/guides/${guide.slug}`);
		assert.equal(independentGuide.status, 200);
		assert.ok((await independentGuide.text()).includes("Sources and their limits"));
	}
	failures.clear();
	assert.equal((await fetch(`${baseUrl}/guides/unknown-reading-guide`)).status, 404);
	console.log(
		"PASS guide SSR, metadata, anchors, navigation, responsive reading, discovery and backend-independent sitemap"
	);
	await page.setViewport({ width: 1280, height: 900 });
	await open("/consensus?q=coffee%20stopped%20working");
	await assertFirstReview(page, caffeineSlug);
	assert.equal(await page.$eval("#reviewed-claims", (element) => element.open), true);
	assert.equal(await page.$$(".claim-card[href*='antibiotic']").then((rows) => rows.length), 0);
	console.log("PASS direct query SSR and hydrated ranked directory");
	if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR) {
		mkdirSync(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, { recursive: true });
		await page.screenshot({
			path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, "search-desktop.png"),
			fullPage: true
		});
	}

	delays.set("caffeine", 1500);
	await setInput(page, "#directory-search", "caffeine");
	await waitUntil(
		() => requests.some((row) => row.path === "/api/claims" && row.query === "caffeine"),
		"Delayed directory request missing"
	);
	await setInput(page, "#directory-search", "do vaccines cause autism");
	await assertFirstReview(page, vaccineSlug);
	await delay(1700);
	await assertFirstReview(page, vaccineSlug);
	assert.equal(new URL(page.url()).searchParams.get("q"), "do vaccines cause autism");
	delays.clear();
	console.log("PASS rapid query changes cannot display stale directory results");

	await setInput(page, "#directory-search", "banana bread recipe");
	await page.waitForFunction(() =>
		document.querySelector(".results-count")?.textContent?.startsWith("0 matching reviews")
	);
	assert.equal((await page.$$(".claim-card")).length, 0);
	assert.ok(await page.$("a[href*='/ask?question=banana']"));
	failures.add("caffeine");
	await setInput(page, "#directory-search", "caffeine");
	await page.waitForSelector("[role='alert']");
	assert.doesNotMatch(
		await page.$eval("main", (element) => element.innerText),
		/No reviewed claims match|No close topic or review match/
	);
	failures.clear();
	await page.click("[role='alert'] button");
	await page.waitForSelector(".claim-card");
	await setInput(page, "#directory-search", "");
	await page.waitForFunction(
		(expected) => document.querySelector(".results-count")?.textContent === expected,
		{},
		`${catalog.length} reviews, ${topics.length} topics`
	);
	await page.click("#reviewed-claims summary");
	assert.equal((await page.$$(".claim-card")).length, 12);
	await page.click(".claim-directory__more button");
	assert.equal((await page.$$(".claim-card")).length, 24);
	console.log("PASS unsupported, failure, retry, clear, full-catalog counts and pagination");

	await open("/ask?question=coffee%20stopped%20working");
	await page.waitForFunction(() =>
		document.querySelector(".match-row h3")?.textContent?.includes("caffeine become less effective")
	);
	console.log("PASS Ask prefilled question triggers initial suggestions");
	await open("/");
	delays.set("coffee stopped working", 1500);
	await setInput(page, "#home-search", "coffee stopped working");
	await page.click(".search-panel button[type='submit']");
	await page.waitForFunction(() => location.pathname === "/consensus");
	await assertFirstReview(page, caffeineSlug);
	await page.goBack({ waitUntil: "networkidle0" });
	await page.waitForFunction(() => location.pathname === "/" && Boolean(document.querySelector("#home-search")));
	await page.goForward({ waitUntil: "networkidle0" });
	await assertFirstReview(page, caffeineSlug);
	assert.equal(await page.$eval("#directory-search", (input) => input.value), "coffee stopped working");
	delays.clear();
	console.log("PASS early search submission and browser back/forward navigation");

	await page.setViewport({ width: 390, height: 844 });
	assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
	assert.ok(
		await page.$eval(".claim-card", (element) => element.getBoundingClientRect().top + scrollY < 950),
		"Related topics must not push the first mobile search result far down the page"
	);
	if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR)
		await page.screenshot({
			path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, "search-mobile.png"),
			fullPage: true
		});
	// Stop navigation/prefetch before checking the intercepted requests. Keep
	// the fixture alive until every handler settles, including delayed responses.
	delays.set("cleanup-probe", 500);
	await page.evaluate(() => {
		// Navigation intentionally cancels the page-side consumer; the proxy
		// handler must still finish before its fixture server is closed.
		void fetch("/api/claims?q=cleanup-probe").catch(() => {});
	});
	await waitUntil(
		() => requests.some((row) => row.query === "cleanup-probe"),
		"Delayed cleanup probe did not reach the fixture"
	);
	assert.ok(pendingInterceptions.size > 0, "Cleanup must exercise an in-flight request");
	await page.goto("about:blank", { waitUntil: "load" });
	await waitUntil(() => pendingInterceptions.size === 0, "Intercepted browser requests did not settle");
	assert.deepEqual(interceptionErrors, [], "Browser proxy requests must succeed, including late responses");
	assert.deepEqual(pageErrors, []);
	console.log("PASS mobile overflow and browser runtime error checks");
} catch (error) {
	console.error(frontendOutput);
	console.error("Recent fixture requests:", requests.slice(-12));
	if (page && !page.isClosed())
		console.error(
			"Browser state:",
			await page.evaluate(() => ({
				url: location.href,
				input: document.querySelector("input")?.value,
				message: document.querySelector(".results-count")?.textContent
			}))
		);
	throw error;
} finally {
	if (browser) await browser.close();
	// Failure cleanup also drains handlers, with fetch timeouts bounding the wait.
	// Their rejections are captured above, never leaked as unhandled promises.
	await Promise.all(pendingInterceptions);
	if (frontend?.pid && frontend.exitCode === null && frontend.signalCode === null) {
		frontend.kill("SIGTERM");
		await Promise.race([once(frontend, "exit"), delay(5000)]);
		if (frontend.exitCode === null && frontend.signalCode === null) frontend.kill("SIGKILL");
	}
	api.closeAllConnections();
	await new Promise((done) => api.close(done));
}
