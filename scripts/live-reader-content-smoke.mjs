// Run with node --import tsx. Read-only public search/guide acceptance only;
// library and feedback require their separate public and isolated checks.
// Exact identity is checked before and after the audit; application writes are blocked.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer";
import process from "node:process";
import { coveredSearchQuestions, unsupportedSearchQuestions } from "../back-end/test/fixtures/search-benchmark.ts";
import { readingGuides } from "../front-end/src/data/reading-guides/index.ts";
import { loadReadingGuide } from "../front-end/src/data/reading-guides/load.ts";
const base = "https://isthereconsensus.org";
const expected = process.env.LIVE_SMOKE_EXPECT_COMMIT;
assert.match(expected || "", /^[a-f\d]{40}$/);
async function get(path, status = 200) {
	const response = await fetch(base + path, { redirect: "error", signal: AbortSignal.timeout(20_000) });
	assert.equal(response.status, status, path);
	return response;
}
async function identity() {
	const result = await (await get("/deployment.json")).json();
	assert.equal(result.commit, expected);
	return result;
}
await identity();
let matched = 0;
for (const [question, slug] of coveredSearchQuestions) {
	const result = await (await get(`/api/claims?q=${encodeURIComponent(question)}&limit=3`)).json();
	if (result.claims.slice(0, 3).some((claim) => claim.slug === slug)) matched++;
	else console.log("Covered question missed:", question);
}
assert.equal(coveredSearchQuestions.length, 100);
assert.ok(matched >= 90, `${matched}/100 covered questions`);
assert.equal(unsupportedSearchQuestions.length, 20);
for (const question of unsupportedSearchQuestions) {
	const result = await (await get(`/api/claims?q=${encodeURIComponent(question)}&limit=3`)).json();
	assert.deepEqual(result.claims, [], question);
}
const vaccine = await (await get("/api/claims?q=do%20childhood%20vaccines%20cause%20autism&limit=3")).json();
assert.equal(vaccine.claims[0].slug, "do-childhood-vaccines-cause-autism");
assert.match(vaccine.claims[0].bottomLine, /^No/);
console.log(
	`Public search: ${matched}/100 covered questions top three, ${unsupportedSearchQuestions.length}/20 unsupported empty, negative-answer meaning preserved. Fixed development benchmark, not independent visitor evidence.`
);

const executablePath = [
	process.env.PUPPETEER_EXECUTABLE_PATH,
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/usr/bin/google-chrome",
	"/usr/bin/google-chrome-stable",
	"/usr/bin/chromium"
].find((path) => path && existsSync(path));
assert.ok(executablePath, "An already installed browser is required.");
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
const discovery = new Map();
try {
	const page = await browser.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.setRequestInterception(true);
	page.on("request", (request) => {
		if (new URL(request.url()).origin === base && !["GET", "HEAD", "OPTIONS"].includes(request.method())) {
			errors.push(`Unexpected write blocked: ${request.method()}`);
			return request.abort();
		}
		return request.continue();
	});
	assert.equal(readingGuides.length, 10);
	for (const guide of readingGuides) {
		const content = await loadReadingGuide(guide.slug);
		const path = `/guides/${guide.slug}`;
		const html = await (await get(path)).text();
		assert.ok(html.includes("Sources and their limits"), `${path}: SSR article missing`);
		await page.setViewport({ width: 1280, height: 900 });
		await page.goto(base + path, { waitUntil: "networkidle0", timeout: 30_000 });
		await page.waitForFunction(() => Boolean(document.querySelector("#__nuxt")?.__vue_app__));
		assert.equal(await page.$eval("h1", (el) => el.textContent), guide.title);
		assert.equal(await page.$eval('link[rel="canonical"]', (el) => el.href), base + path);
		assert.equal(await page.$eval("time", (el) => el.dateTime), guide.checkedAt);
		const meta = await page.evaluate(() =>
			[...document.querySelectorAll('script[type="application/ld+json"]')]
				.map((el) => JSON.parse(el.textContent))
				.find((el) => el["@type"] === "Article")
		);
		assert.equal(meta.headline, guide.title);
		assert.equal(meta.dateModified, guide.checkedAt);
		assert.deepEqual(
			meta.citation,
			content.sources.map((source) => source.url)
		);
		const paragraphs = await page.$$eval(".guide-section > p", (els) =>
			els.map((el) => ({
				text: el.textContent,
				citations: [...el.querySelectorAll(".guide-citations a")].map((a) => a.getAttribute("href"))
			}))
		);
		for (const paragraph of content.sections.flatMap((section) => section.paragraphs)) {
			const rendered = paragraphs.find((item) => item.text.includes(paragraph.text));
			assert.ok(rendered, `${path}: missing paragraph`);
			assert.deepEqual(
				rendered.citations,
				paragraph.sources.map((id) => `#source-${id}`),
				`${path}: incorrect paragraph citations`
			);
		}
		const body = await page.$eval(".reading-guide", (el) => el.textContent);
		for (const text of [
			content.takeaway,
			content.scope,
			...content.questions,
			...content.sources.map((s) => s.note)
		])
			assert.ok(body.includes(text), `${path}: missing scope, question or source note`);
		assert.deepEqual(
			await page.$$eval(".guide-source-list > li > a", (els) => els.map((el) => el.href)),
			content.sources.map((s) => s.url)
		);
		assert.deepEqual(
			await page.$$eval(".guide-review-links a", (els) => els.map((el) => el.getAttribute("href"))),
			guide.reviews.map((review) => review.path)
		);
		assert.ok(
			await page.evaluate(() =>
				[...document.querySelectorAll('main a[href^="#"]')].every((el) =>
					document.getElementById(el.getAttribute("href").slice(1))
				)
			)
		);
		for (const width of [390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.ok(
				await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
				`${path}: overflow at ${width}`
			);
		}
		await page.evaluate(() => {
			document.documentElement.style.fontSize = "200%";
		});
		assert.ok(
			await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
			`${path}: enlarged text overflow`
		);
		for (const destination of [
			...guide.reviews.map((r) => r.path),
			...guide.topics.map((topic) => `/consensus/${topic}`)
		]) {
			if (!discovery.has(destination)) discovery.set(destination, new Set());
			discovery.get(destination).add(guide.slug);
		}
		console.log(`Public guide verified: ${guide.slug}`);
	}
	assert.deepEqual(errors, []);
} finally {
	await browser.close();
}
for (const [path, slugs] of discovery) {
	const html = await (await get(path)).text();
	for (const slug of slugs)
		assert.ok(html.includes(`href="/guides/${slug}"`), `${path}: missing backlink to ${slug}`);
}
const index = await (await get("/guides")).text();
const explainers = await (await get("/explainers")).text();
const sitemap = await (await get("/sitemap.xml")).text();
for (const guide of readingGuides) {
	assert.ok(index.includes(`href="/guides/${guide.slug}"`));
	assert.ok(explainers.includes(`href="/guides/${guide.slug}"`));
	assert.ok(sitemap.includes(`/guides/${guide.slug}`));
}
for (const slug of ["unknown-reading-guide", "constructor", "toString", "__proto__"]) await get(`/guides/${slug}`, 404);
const finalIdentity = await identity();
console.log(
	JSON.stringify({
		passed: true,
		identity: finalIdentity,
		coveredTopThree: matched,
		coveredQuestions: 100,
		unsupportedEmpty: unsupportedSearchQuestions.length,
		fullGuides: readingGuides.length,
		connectedReviewAndTopicPages: discovery.size,
		discoveryIndexes: 2,
		checks: "Full rendered text, sources, notes, questions, metadata, anchors, review links, responsive/enlarged reading, sitemap and unknown routes. Read-only; no publication or account mutations."
	})
);
