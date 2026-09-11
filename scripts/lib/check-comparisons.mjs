import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import { evidenceComparisons } from "../../front-end/src/data/comparisons/index.ts";

// Called inside the existing built-app browser harness and its read-only API
// fixture. No second browser/server, account, or production writes are needed.
export async function checkComparisons({ page, baseUrl, open }) {
	await open("/compare");
	assert.equal((await page.$$(".comparisons-index article")).length, evidenceComparisons.length);
	const pilot = evidenceComparisons[0];
	const path = `/compare/${pilot.slug}`;
	for (const from of [
		"/guides",
		"/explainers",
		pilot.guidePath,
		...pilot.topics.map(slug => `/consensus/${slug}`),
		...pilot.reviews.map(review => review.path)
	]) {
		await open(from);
		assert.ok(
			await page.$(`a[href="${from === "/guides" ? "/compare" : path}"]`),
			`${from}: comparison must be discoverable`
		);
	}
	await page.click(`a[href="${path}"]`);
	await page.waitForSelector(".comparison-grid");
	assert.equal(await page.$eval("h1", element => element.textContent), pilot.title);
	assert.deepEqual(await page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim())), [
		"1,001",
		"486",
		"43",
		"13",
		"13"
	]);
	await page.select("#comparison-outcome", "upstream");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "<5");
	assert.deepEqual(await page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim())), [
		"<5",
		"0.8",
		"≈28",
		"12",
		"2"
	]);
	assert.ok(new URL(page.url()).searchParams.get("outcome") === "upstream");
	await page.select("#comparison-context", "whole-grid");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 5);
	assert.equal(
		(await page.$$(".comparison-value")).length,
		0,
		"generator values must not masquerade as grid estimates"
	);
	await page.goBack();
	await page.waitForSelector(".comparison-value");
	assert.equal(await page.$eval("#comparison-outcome", element => element.value), "upstream");
	await page.goForward();
	await page.waitForSelector(".comparison-unavailable");
	await open(`${path}?outcome=upstream&options=coal,solar`);
	assert.equal((await page.$$(".comparison-option")).length, 2);
	await page.reload({ waitUntil: "networkidle0" });
	assert.deepEqual(await page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim())), [
		"<5",
		"≈28"
	]);
	assert.equal(
		await page.$eval("link[rel=\"canonical\"]", element => element.href),
		`https://isthereconsensus.org${path}`
	);
	await page.click(".comparison-choices input");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 1);
	await page.click(".comparison-choices label:nth-child(3) input");
	await page.waitForSelector(".comparison-empty");
	assert.equal(new URL(page.url()).searchParams.get("options"), "");
	await page.reload({ waitUntil: "networkidle0" });
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	assert.equal(await page.$eval("#comparison-outcome", element => element.value), "upstream");
	// Native select and checkbox controls must also work without a pointer.
	await page.focus("#comparison-outcome");
	await page.keyboard.press("Home");
	await page.keyboard.press("Enter");
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 4);
	await open(path);
	const metadata = await page.evaluate(() =>
		Array.from(document.querySelectorAll("script[type=\"application/ld+json\"]"))
			.map(script => JSON.parse(script.textContent))
			.find(entry => entry["@type"] === "Article")
	);
	assert.equal(metadata.headline, pilot.title);
	assert.deepEqual(
		metadata.citation,
		pilot.sources.map(source => source.url)
	);
	assert.equal(
		await page.$eval(".comparison-sources", element => getComputedStyle(element).listStyleType),
		"decimal"
	);
	await page.click(".comparison-option a[href=\"#comparison-source-nrel-2021\"]");
	await page.waitForFunction(() => location.hash === "#comparison-source-nrel-2021");
	assert.ok(await page.$("#comparison-source-nrel-2021 a"));
	for (const width of [1280, 390, 320]) {
		await page.setViewport({ width, height: 900 });
		assert.equal(
			await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
			false,
			`comparison overflow at ${width}px`
		);
	}
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "200%";
	});
	assert.equal(
		await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
		false,
		"comparison overflow at 200% text and 320px"
	);
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "";
	});
	await page.evaluate(async () => {
		await document.fonts.ready;
		await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
	});
	if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR) {
		mkdirSync(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, { recursive: true });
		for (const width of [390, 1280]) {
			await page.setViewport({ width, height: 900 });
			await page.screenshot({
				path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `electricity-${width}.png`),
				fullPage: true
			});
		}
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const slug of ["missing", "constructor", "__proto__"])
		assert.equal((await fetch(`${baseUrl}/compare/${slug}`)).status, 404);
	const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
	assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${path}</loc>`));
	console.log(
		"PASS comparison sources, discovery, outcomes, contexts, URL/history, keyboard, empty state, metadata, mobile/text resize, sitemap and 404 checks"
	);
}
