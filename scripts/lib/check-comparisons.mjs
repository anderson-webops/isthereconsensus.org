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
	console.log(
		"PASS comparison sources, discovery, outcomes, contexts, URL/history, keyboard, empty state, metadata, mobile/text resize, sitemap and 404 checks"
	);
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
