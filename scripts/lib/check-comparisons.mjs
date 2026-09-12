import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import { evidenceComparisons } from "../../front-end/src/data/comparisons/index.ts";

// Called inside the existing built-app browser harness and its read-only API
// fixture. No second browser/server, account, or production writes are needed.
export async function checkComparisons({ page, baseUrl, open }) {
	for (const [query, slug] of [["solar vs wind", "electricity-emissions"], ["creatine vs protein", "strength-training-supplements"], ["coffee and sleep", "caffeine-dose-and-sleep"], ["CBT-I vs sleep hygiene", "non-drug-insomnia-treatments"], ["heat pump upgrades", "home-heat-pump-upgrades"]]) {
		for (const route of [`/consensus?q=${encodeURIComponent(query)}`, `/ask?question=${encodeURIComponent(query)}`]) {
			await open(route);
			assert.ok(await page.$(`.comparison-links a[href="/compare/${slug}"]`), `${route}: separate comparison match`);
		}
	}
	await open("/consensus?q=solar%20astrology");
	assert.equal((await page.$$(".comparison-links")).length, 0);
	await open("/");
	await page.$eval("#home-search", input => {
		input.value = "creatine vs protein";
		input.dispatchEvent(new Event("input", { bubbles: true }));
	});
	await page.waitForSelector('.comparison-suggestions a[href="/compare/strength-training-supplements"]');
	await page.click('.comparison-suggestions a');
	await page.waitForSelector(".comparison-finding");
	assert.equal(new URL(page.url()).pathname, "/compare/strength-training-supplements");
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
	await checkCaffeineComparison({ page, open, sitemap });
	await checkStrengthComparison({ page, open, sitemap });
	await checkInsomniaComparison({ page, open, sitemap });
	await checkHeatingComparison({ page, open, sitemap });
	await checkAirCleaningComparison({ page, open, sitemap });
	await checkExerciseBpComparison({ page, open, sitemap });
	await checkWaterComparison({ page, open, sitemap });
	await checkMosquitoComparison({ page, open, sitemap });
	await checkHearingComparison({ page, open, sitemap });
	await checkAccountComparison({ page, open, sitemap });
	await checkFoodComparison({ page, open, sitemap });
	console.log(
		"PASS comparison sources, discovery, outcomes, contexts, URL/history, keyboard, empty state, metadata, mobile/text resize, sitemap and 404 checks"
	);
}

async function checkFoodComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "food-storage-and-safety");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=food%20storage", "/ask?question=freezing%20food"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: food comparison discoverable`);
	}
	await open(path);
	for (const outcome of comparison.outcomes) {
		await page.select("#comparison-outcome", outcome.id);
		await page.waitForFunction(id => new URL(location.href).searchParams.get("outcome") === id || (id === "role" && !new URL(location.href).searchParams.has("outcome")), {}, outcome.id);
		assert.equal((await page.$$(".comparison-value")).length, 0);
		assert.equal((await page.$$(".comparison-finding")).length, 5);
		const cards = await page.$$eval(".comparison-option", nodes => nodes.map(node => node.textContent));
		comparison.options.forEach((option, index) => {
			const finding = option.findingsByContext.general[outcome.id];
			for (const value of [finding.headline, finding.summary, finding.evidence, finding.scope, finding.limitation]) assert.ok(cards[index].includes(value), `${option.id}/${outcome.id}: food field rendered`);
		});
	}
	for (const context of ["meal", "outage"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 5);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-finding, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=limits&options=freeze,reheat`);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal((await page.$$(".comparison-option")).length, 2);
	assert.match(await page.$eval(".comparison-grid", node => node.textContent), /not a method for rescuing food/);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 4);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-efsa"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-efsa");
	assert.match(await page.$eval("#comparison-source-efsa", node => node.textContent), /Expert-led literature selection/);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `food overflow ${theme} ${width}`);
			assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), width === 1280 ? 3 : 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `food-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `food ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const route of [path, comparison.guidePath]) assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${route}</loc>`));
}

async function checkAccountComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "account-protection");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=password%20manager", "/ask?question=passkeys"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: account comparison discoverable`);
	}
	await open(path);
	for (const outcome of comparison.outcomes) {
		await page.select("#comparison-outcome", outcome.id);
		await page.waitForFunction(id => new URL(location.href).searchParams.get("outcome") === id || (id === "threat" && !new URL(location.href).searchParams.has("outcome")), {}, outcome.id);
		assert.equal((await page.$$(".comparison-value")).length, 0);
		assert.equal((await page.$$(".comparison-finding")).length, 6);
		const cards = await page.$$eval(".comparison-option", nodes => nodes.map(node => node.textContent));
		comparison.options.forEach((option, index) => {
			const finding = option.findingsByContext.general[outcome.id];
			for (const value of [finding.headline, finding.summary, finding.evidence, finding.scope, finding.limitation]) assert.ok(cards[index].includes(value), `${option.id}/${outcome.id}: account field rendered`);
		});
	}
	for (const context of ["personal", "incident"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 6);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-finding, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=access&options=manager,passkey`);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal((await page.$$(".comparison-option")).length, 2);
	assert.match(await page.$eval(".comparison-grid", node => node.textContent), /Backup eligibility does not establish a completed backup/);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 6);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-webauthn"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-webauthn");
	assert.match(await page.$eval("#comparison-source-webauthn", node => node.textContent), /August 25, 2026 Recommendation/);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `account overflow ${theme} ${width}`);
			assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), width === 1280 ? 3 : 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `account-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `account ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const route of [path, comparison.guidePath]) assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${route}</loc>`));
}

async function checkHearingComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "hearing-protection");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=earplugs", "/ask?question=hearing%20protection"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: hearing comparison discoverable`);
	}
	await open(path);
	for (const outcome of comparison.outcomes) {
		await page.select("#comparison-outcome", outcome.id);
		await page.waitForFunction(id => new URL(location.href).searchParams.get("outcome") === id || (id === "evidence" && !new URL(location.href).searchParams.has("outcome")), {}, outcome.id);
		assert.equal((await page.$$(".comparison-value")).length, 0);
		assert.equal((await page.$$(".comparison-finding")).length, 5);
		const cards = await page.$$eval(".comparison-option", nodes => nodes.map(node => node.textContent));
		comparison.options.forEach((option, index) => {
			const finding = option.findingsByContext.general[outcome.id];
			for (const value of [finding.headline, finding.summary, finding.evidence, finding.scope, finding.limitation]) assert.ok(cards[index].includes(value), `${option.id}/${outcome.id}: hearing field rendered`);
		});
	}
	for (const context of ["personal", "injury"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 5);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-finding, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=use&options=dual,anc`);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal((await page.$$(".comparison-option")).length, 2);
	assert.match(await page.$eval(".comparison-grid", node => node.textContent), /No consumer brand endorsement/);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 4);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-policy"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-policy");
	assert.match(await page.$eval("#comparison-source-policy", node => node.textContent), /Supersedes.*1998.*individual quantitative fit testing/);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `hearing overflow ${theme} ${width}`);
			assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), width === 1280 ? 3 : 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `hearing-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `hearing ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const route of [path, comparison.guidePath]) assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${route}</loc>`));
}

async function checkMosquitoComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "mosquito-bite-prevention");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=mosquito", "/ask?question=mosquito"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: mosquito comparison discoverable`);
	}
	await open(path);
	for (const outcome of comparison.outcomes) {
		await page.select("#comparison-outcome", outcome.id);
		await page.waitForFunction(id => new URL(location.href).searchParams.get("outcome") === id || (id === "evidence" && !new URL(location.href).searchParams.has("outcome")), {}, outcome.id);
		assert.equal((await page.$$(".comparison-value")).length, 0);
		assert.equal((await page.$$(".comparison-finding")).length, 6);
		const cards = await page.$$eval(".comparison-option", nodes => nodes.map(node => node.textContent));
		comparison.options.forEach((option, index) => {
			const finding = option.findingsByContext.general[outcome.id];
			for (const value of [finding.headline, finding.summary, finding.evidence, finding.scope, finding.limitation]) assert.ok(cards[index].includes(value), `${option.id}/${outcome.id}: field rendered`);
		});
	}
	for (const context of ["personal", "child"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 6);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-finding, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=use&options=ole,clothing`);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal((await page.$$(".comparison-option")).length, 2);
	assert.match(await page.$eval(".comparison-grid", node => node.textContent), /do not apply it to skin/);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 6);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-who"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-who");
	assert.match(await page.$eval("#comparison-source-who", node => node.textContent), /2025 recommendation retained.*80% split/s);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `mosquito overflow ${theme} ${width}`);
			assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), width === 1280 ? 3 : 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `mosquito-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `mosquito ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const route of [path, comparison.guidePath]) assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${route}</loc>`));
}

async function checkWaterComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "household-water-treatment");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=water%20treatment", "/ask?question=water%20treatment"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: water comparison discoverable`);
	}
	await open(path);
	for (const outcome of comparison.outcomes) {
		await page.select("#comparison-outcome", outcome.id);
		await page.waitForFunction(id => new URL(location.href).searchParams.get("outcome") === id || (id === "microbes" && !new URL(location.href).searchParams.has("outcome")), {}, outcome.id);
		assert.equal((await page.$$(".comparison-value")).length, 0);
		assert.equal((await page.$$(".comparison-finding")).length, 6);
		const cards = await page.$$eval(".comparison-option", nodes => nodes.map(node => node.textContent));
		comparison.options.forEach((option, index) => {
			const finding = option.findingsByContext.mechanisms[outcome.id];
			for (const value of [finding.headline, finding.summary, finding.evidence, finding.scope, finding.limitation]) assert.ok(cards[index].includes(value), `${option.id}/${outcome.id}: field rendered`);
		});
		const links = await page.$$eval(".comparison-option a.comparison-source-link", nodes => nodes.map(node => node.getAttribute("href")));
		for (const option of comparison.options) {
			for (const id of option.findingsByContext.mechanisms[outcome.id].sourceIds) assert.ok(links.includes(`#comparison-source-${id}`));
		}
	}
	assert.match(await page.$eval(".comparison-grid", node => node.textContent), /70\/30.*2\.3:1.*August 2026/s);
	for (const context of ["your-water", "emergency"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 6);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-finding, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=chemicals&options=carbon,uv`);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal((await page.$$(".comparison-option")).length, 2);
	assert.match(await page.$eval(".comparison-grid", node => node.textContent), /does not remove lead, nitrate or PFAS/);
	assert.equal(await page.$eval("#comparison-outcome", node => node.value), "chemicals");
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 6);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await open(`${path}?outcome=resources`);
	await page.click('.comparison-option a[href="#comparison-source-ro-clarifications"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-ro-clarifications");
	assert.match(await page.$eval("#comparison-source-ro-clarifications", node => node.textContent), /August 20, 2026.*rows 33–35/s);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `water overflow ${theme} ${width}`);
			assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), width === 1280 ? 3 : 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `water-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `water ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const route of [path, comparison.guidePath]) assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${route}</loc>`));
}

async function checkExerciseBpComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "exercise-and-blood-pressure");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=exercise%20blood%20pressure", "/ask?question=exercise%20blood%20pressure"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: exercise comparison discoverable`);
	}
	await open(path);
	const values = () => page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim()));
	assert.deepEqual(await values(), ["-5.06", "-5.79", "-4.95", "-4.18", "-7.72", "-13.52"]);
	for (const [outcome, expected] of [["systolic", [[-6.71, -3.43], [-8.1, -3.51], [-7.02, -2.87], [-8.31, -0.06], [-9.99, -5.43], [-18.59, -8.44]]], ["diastolic", [[-3.74, -1.88], [-4.49, -1.86], [-4.12, -1.76], [-5.06, -0.49], [-5.08, -2.49], [-9.79, -3.97]]]]) {
		await open(`${path}?outcome=${outcome}`);
		const intervals = await page.$$eval(".comparison-uncertainty", nodes => nodes.map(node => node.textContent));
		expected.forEach(([lower, upper], index) => assert.ok(intervals[index].includes(`95% credible interval ${lower} to ${upper}`)));
		for (const details of await page.$$(".comparison-uncertainty summary")) await details.click();
		assert.equal((await page.$$(".comparison-uncertainty[open]")).length, 6);
	}
	assert.deepEqual(await values(), ["-2.82", "-3.17", "-2.95", "-2.77", "-3.79", "-6.87"]);
	for (const outcome of ["systolic", "diastolic"]) {
		await open(`${path}?context=ambulatory&outcome=${outcome}`);
		assert.equal((await page.$$(".comparison-value")).length, 0);
		assert.equal((await page.$$(".comparison-finding")).length, 6);
		assert.match(await page.$eval(".comparison-grid", node => node.textContent), /No separately matched circuit estimate/);
		assert.equal((await page.$$('.comparison-option a[href="#comparison-source-schneider"]')).length, 6);
	}
	for (const context of ["personal", "events"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 6);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-finding, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=diastolic&options=continuous,handgrip`);
	assert.deepEqual(await values(), ["-2.82", "-2.77"]);
	await page.reload({ waitUntil: "networkidle0" });
	assert.deepEqual(await values(), ["-2.82", "-2.77"]);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.reload({ waitUntil: "networkidle0" });
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 6);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-hu"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-hu");
	assert.match(await page.$eval("#comparison-source-hu", node => node.textContent), /Table 2.*CC BY 4.0/s);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `exercise BP overflow ${theme} ${width}`);
			if (width === 1280) assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 3, "detailed numeric cards need readable desktop columns");
			if (width <= 390) assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `exercise-bp-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `exercise BP ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	for (const route of [path, comparison.guidePath]) assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${route}</loc>`));
}

async function checkAirCleaningComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "particle-air-cleaner-designs");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path), "/consensus?q=DIY%20air%20cleaners", "/ask?question=DIY%20air%20cleaners"]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: air-cleaning comparison discoverable`);
	}
	await open(path);
	const values = () => page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim()));
	assert.deepEqual(await values(), ["111.2", "156.1", "400.9", "118.9"]);
	assert.match(await page.$eval(".comparison-protocol", node => node.textContent), /29\.3 m³.*high.*turbo/s);
	assert.equal((await page.$$(".comparison-uncertainty")).length, 0, "reported variation must not become a confidence interval");
	assert.ok((await page.$$eval(".comparison-interpretation", nodes => nodes.map(node => node.textContent))).every(text => text.includes("not a 95% confidence interval")));
	await page.select("#comparison-outcome", "power");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "77.1");
	assert.deepEqual(await values(), ["77.1", "77.6", "76", "41.1"]);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal(await page.$eval("#comparison-outcome", node => node.value), "power");
	for (const context of ["occupied-home", "gases", "health"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 4);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-value");
	}
	await open(`${path}?outcome=power&options=four-filter,commercial`);
	assert.deepEqual(await values(), ["76", "41.1"]);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.reload({ waitUntil: "networkidle0" });
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 4);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 3);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-holder"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-holder");
	assert.match(await page.$eval("#comparison-source-holder", node => node.textContent), /Tables 1–2.*three replicates/s);
	assert.equal((await page.$$(".comparison-guidance a")).length, 2);
	await page.click('.comparison-guidance a[href="#comparison-source-epa-diy"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-epa-diy");
	assert.match(await page.$eval("#comparison-source-epa-diy", node => node.textContent), /five fan models/);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `air-cleaning overflow ${theme} ${width}`);
			if (width <= 390) assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `air-cleaning-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `air-cleaning ${theme} 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${path}</loc>`));
}

async function checkHeatingComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "home-heat-pump-upgrades");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path)]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: heating comparison discoverable`);
	}
	await open(path);
	const values = () => page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim()));
	assert.deepEqual(await values(), ["62", "86", "95"]);
	assert.match(await page.$eval(".comparison-basis", node => node.textContent), /winter 2021–22/);
	assert.ok((await page.$$eval(".comparison-unit", nodes => nodes.map(node => node.textContent))).every(text => text.includes("% of modeled households")));
	await page.select("#comparison-outcome", "lifetime-value");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "55");
	assert.deepEqual(await values(), ["55", "41", "21"]);
	await page.select("#comparison-context", "with-envelope");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "39");
	assert.deepEqual(await values(), ["39", "28", "15"]);
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal(await page.$eval("#comparison-context", node => node.value), "with-envelope");
	assert.equal(await page.$eval("#comparison-outcome", node => node.value), "lifetime-value");
	await page.select("#comparison-outcome", "bill-savings");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "82");
	assert.deepEqual(await values(), ["82", "94", "97"]);
	for (const context of ["your-home", "other-systems"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 3);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-value, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-value");
	}
	await open(`${path}?outcome=lifetime-value&context=with-envelope&options=medium,cold-climate`);
	assert.deepEqual(await values(), ["28", "15"]);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.reload({ waitUntil: "networkidle0" });
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 3);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 2);
	await open(path);
	await page.click('.comparison-option a[href="#comparison-source-wilson"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-wilson");
	assert.match(await page.$eval("#comparison-source-wilson", node => node.textContent), /Figure 3.*16 years.*3\.4%/s);
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `heating overflow ${theme} ${width}`);
			if (width <= 390) assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 1, "explanatory numeric cards need one readable mobile column");
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `heating-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `heating overflow ${theme} at 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${path}</loc>`));
}

async function checkInsomniaComparison({ page, open, sitemap }) {
	const comparison = evidenceComparisons.find(item => item.slug === "non-drug-insomnia-treatments");
	const path = `/compare/${comparison.slug}`;
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path)]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: insomnia comparison discoverable`);
	}
	await open(path);
	assert.equal((await page.$$(".comparison-finding")).length, 6);
	assert.equal((await page.$$(".comparison-value")).length, 0);
	await page.select("#comparison-outcome", "demands");
	await page.waitForFunction(() => document.querySelector(".comparison-finding")?.textContent.includes("delivery matters"));
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal(await page.$eval("#comparison-outcome", node => node.value), "demands");
	for (const context of ["short-opportunity", "other-populations"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 6);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-finding, .comparison-value, .comparison-evidence, .comparison-source-link)")).length, 0);
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	await open(`${path}?outcome=demands&options=cbt-i,brief`);
	assert.equal((await page.$$(".comparison-option")).length, 2);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await open(`${path}?options=`);
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 6);
	await page.focus(".comparison-choices input");
	await page.keyboard.press("Space");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 5);
	await open(path);
	for (const disclosure of await page.$$(".comparison-evidence summary")) await disclosure.click();
	const details = await page.$$eval(".comparison-evidence[open]", nodes => nodes.map(node => node.textContent));
	assert.match(details[1], /55%.*13%.*four weeks/s);
	assert.match(details[1], /SD to SE/);
	assert.match(details[4], /0\.81.*0\.64 to 1\.02.*not conclusive evidence of harm/s);
	await page.click('.comparison-option a[href="#comparison-source-components"]');
	await page.waitForFunction(() => location.hash === "#comparison-source-components");
	assert.ok(await page.$("#comparison-source-components a"));
	for (const theme of ["light", "dark"]) {
		const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
		if (current !== theme) await page.click(".theme-toggle");
		await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `insomnia overflow ${theme} ${width}`);
			if (width === 1280) assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 3, "six text-heavy options should use three readable columns");
			if (width <= 390) assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 1);
			if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR && width !== 320) {
				await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `insomnia-${theme}-${width}.png`), fullPage: true });
			}
		}
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `insomnia overflow ${theme} at 200% text`);
		await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	}
	await page.setViewport({ width: 1280, height: 900 });
	assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${path}</loc>`));
}

async function checkStrengthComparison({ page, open, sitemap }) {
	const path = "/compare/strength-training-supplements";
	const comparison = evidenceComparisons.find(item => item.slug === "strength-training-supplements");
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path)]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: strength comparison discoverable`);
	}
	await open(path);
	assert.equal((await page.$$(".comparison-finding")).length, 3);
	assert.equal((await page.$$(".comparison-value")).length, 0, "no fake common-scale values");
	await page.click(".comparison-evidence summary");
	assert.match(await page.$eval(".comparison-evidence[open]", node => node.textContent), /2\.49 kg.*0\.64 to 4\.33 kg/s);
	await page.select("#comparison-outcome", "muscle-growth");
	await page.waitForFunction(() => document.querySelector(".comparison-finding")?.textContent.includes("Small added gains"));
	await page.reload({ waitUntil: "networkidle0" });
	assert.equal(await page.$eval("#comparison-outcome", node => node.value), "muscle-growth");
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	for (const context of ["without-training", "clinical"]) {
		await page.select("#comparison-context", context);
		await page.waitForFunction(() => document.querySelectorAll(".comparison-unavailable").length === 3);
		assert.equal((await page.$$(".comparison-grid :is(.comparison-finding, .comparison-value, .comparison-evidence, .comparison-source-link)")).length, 0);
		assert.ok(await page.$(".comparison-history a"), "Historical citations remain outside unsupported result cards.");
		await page.goBack();
		await page.waitForSelector(".comparison-finding");
	}
	for (let index = 1; index <= 3; index++) {
		await page.focus(`.comparison-choices label:nth-child(${index}) input`);
		await page.keyboard.press("Space");
		await page.waitForFunction(count => document.querySelectorAll(".comparison-option").length === count, {}, 3 - index);
	}
	await page.waitForSelector(".comparison-empty");
	await page.reload({ waitUntil: "networkidle0" });
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-finding").length === 3);
	for (const disclosure of await page.$$(".comparison-evidence summary")) await disclosure.click();
	const details = await page.$$eval(".comparison-evidence[open]", nodes => nodes.map(node => node.textContent));
	assert.match(details[0], /7\.2 mm².*0\.20 to 14\.30 mm²/s);
	assert.match(details[1], /Bayesian credible interval −0\.02 to 0\.25/);
	assert.match(details[2], /not 22% more muscle/);
	await page.click(".comparison-option a[href=\"#comparison-source-creatine-imaging\"]");
	await page.waitForFunction(() => location.hash === "#comparison-source-creatine-imaging");
	assert.ok(await page.$("#comparison-source-creatine-imaging a"));
	for (const width of [1280, 390, 320]) {
		await page.setViewport({ width, height: 900 });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `strength overflow at ${width}px`);
		if (width <= 390) {
			assert.equal(await page.$eval(".comparison-grid", node => getComputedStyle(node).gridTemplateColumns.split(" ").length), 1, "long findings must stack on phones, not merely avoid overflow");
		}
	}
	await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
	assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, "strength overflow at 200% text");
	await page.evaluate(() => { document.documentElement.style.fontSize = ""; });
	if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR) {
		for (const theme of ["light", "dark"]) {
			const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
			if (current !== theme) await page.click(".theme-toggle");
			await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
			await page.evaluate(async () => {
				await document.fonts.ready;
				await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
				await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
			});
			for (const width of [390, 1280]) {
				await page.setViewport({ width, height: 900 });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `strength-${theme}-${width}.png`), fullPage: true });
			}
		}
	}
	await page.setViewport({ width: 1280, height: 900 });
	assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${path}</loc>`));
}

async function checkCaffeineComparison({ page, open, sitemap }) {
	const path = "/compare/caffeine-dose-and-sleep";
	const comparison = evidenceComparisons.find(item => item.slug === "caffeine-dose-and-sleep");
	for (const from of [comparison.guidePath, ...comparison.topics.map(slug => `/consensus/${slug}`), ...comparison.reviews.map(review => review.path)]) {
		await open(from);
		assert.ok(await page.$(`a[href="${path}"]`), `${from}: caffeine comparison discoverable`);
	}
	await open(path);
	const values = () => page.$$eval(".comparison-value", nodes => nodes.map(node => node.textContent.trim()));
	assert.deepEqual(await values(), ["-4.47", "-50.64"]);
	assert.match(await page.$eval(".comparison-protocol", node => node.textContent), /usual morning caffeine/);
	await page.click(".comparison-uncertainty summary");
	assert.match(await page.$eval(".comparison-uncertainty[open]", node => node.textContent), /Cohen's d, not minutes/);
	assert.match(await page.$eval(".comparison-uncertainty[open]", node => node.textContent), /95% CI -0.25 to 0.19/);
	await page.select("#comparison-context", "eight-hours");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "-7.58");
	assert.deepEqual(await values(), ["-7.58", "-28.66"]);
	assert.equal((await page.$$eval(".comparison-interpretation", nodes => nodes.map(node => node.textContent))).every(text => text.includes("No clear difference")), true);
	await page.select("#comparison-outcome", "deep-sleep");
	await page.select("#comparison-context", "twelve-hours");
	await page.waitForFunction(() => document.querySelector(".comparison-value")?.textContent.trim() === "-0.59");
	assert.deepEqual(await values(), ["-0.59", "-20.63"]);
	await page.reload({ waitUntil: "networkidle0" });
	assert.deepEqual(await values(), ["-0.59", "-20.63"]);
	assert.equal(await page.$eval("link[rel=canonical]", node => node.href), `https://isthereconsensus.org${path}`);
	await page.select("#comparison-context", "other-populations");
	await page.waitForSelector(".comparison-unavailable");
	assert.equal((await page.$$(".comparison-value")).length, 0);
	assert.equal((await page.$$(".comparison-uncertainty")).length, 0);
	await page.goBack();
	await page.waitForSelector(".comparison-value");
	assert.deepEqual(await values(), ["-0.59", "-20.63"]);
	for (const [index, selector] of [".comparison-choices label:nth-child(1) input", ".comparison-choices label:nth-child(2) input"].entries()) {
		await page.focus(selector);
		await page.keyboard.press("Space");
		await page.waitForFunction(count => document.querySelectorAll(".comparison-option").length === count, {}, 1 - index);
	}
	await page.waitForSelector(".comparison-empty");
	await page.click(".comparison-empty button");
	await page.waitForFunction(() => document.querySelectorAll(".comparison-option").length === 2);
	await page.click(".comparison-option a[href=\"#comparison-source-gardiner-trial\"]");
	await page.waitForFunction(() => location.hash === "#comparison-source-gardiner-trial");
	assert.ok(await page.$("#comparison-source-gardiner-trial a"));
	for (const disclosure of await page.$$(".comparison-uncertainty summary")) await disclosure.click();
	assert.equal((await page.$$(".comparison-uncertainty[open]")).length, 2);
	for (const width of [1280, 390, 320]) {
		await page.setViewport({ width, height: 900 });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `caffeine overflow at ${width}px`);
	}
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "200%";
	});
	assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, "caffeine overflow at 200% text");
	await page.evaluate(() => {
		document.documentElement.style.fontSize = "";
	});
	if (process.env.SEARCH_SMOKE_SCREENSHOT_DIR) {
		for (const theme of ["light", "dark"]) {
			const current = await page.$eval("html", node => node.classList.contains("dark") ? "dark" : "light");
			if (current !== theme) await page.click(".theme-toggle");
			await page.waitForFunction(expected => document.documentElement.classList.contains(expected), {}, theme);
			// Capture the settled theme, not the intermediate color transition.
			await page.evaluate(async () => {
				await document.fonts.ready;
				await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
				await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
			});
			for (const width of [390, 1280]) {
				await page.setViewport({ width, height: 900 });
				await page.screenshot({ path: resolve(process.env.SEARCH_SMOKE_SCREENSHOT_DIR, `caffeine-${theme}-${width}.png`), fullPage: true });
			}
		}
	}
	await page.setViewport({ width: 1280, height: 900 });
	assert.ok(sitemap.includes(`<loc>https://isthereconsensus.org${path}</loc>`));
}
