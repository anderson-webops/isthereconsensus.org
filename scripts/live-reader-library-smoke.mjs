// Read-only public API checks plus browser-local saves in a disposable browser.
// No accounts, ratings or suggestions are created on the public site.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import process from "node:process";
import puppeteer from "puppeteer";

const base = "https://isthereconsensus.org";
const expected = process.env.LIVE_SMOKE_EXPECT_COMMIT;
assert.match(expected || "", /^[a-f\d]{40}$/, "Supply the exact approved release commit.");
const identity = await fetch(`${base}/deployment.json`, { signal: AbortSignal.timeout(10_000) });
assert.equal(identity.status, 200);
assert.equal((await identity.json()).commit, expected);
for (const [path, status] of [
	["/library", 200],
	["/api/library/account", 403]
]) {
	const response = await fetch(base + path, { signal: AbortSignal.timeout(10_000) });
	assert.equal(response.status, status, path);
	assert.match(response.headers.get("cache-control"), /private, no-store/, path);
	if (path === "/library") assert.match(response.headers.get("x-robots-tag"), /noindex/);
}
const executablePath = [
	process.env.PUPPETEER_EXECUTABLE_PATH,
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/usr/bin/google-chrome",
	"/usr/bin/google-chrome-stable",
	"/usr/bin/chromium"
].find((path) => path && existsSync(path));
assert.ok(executablePath, "An already installed browser is required.");
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
try {
	const page = await browser.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	// Enforce the non-mutating public-test boundary even if future UI changes.
	await page.setRequestInterception(true);
	page.on("request", (request) => {
		const url = new URL(request.url());
		if (
			url.origin === base &&
			!["GET", "HEAD", "OPTIONS"].includes(request.method()) &&
			!["/api/library/resolve", "/api/library/updates"].includes(url.pathname)
		) {
			errors.push(`Blocked unexpected write: ${request.method()} ${url.pathname}`);
			return request.abort();
		}
		return request.continue();
	});
	const go = (path) => page.goto(base + path, { waitUntil: "networkidle0", timeout: 30_000 });
	const click = async (text) => {
		await page.waitForFunction(
			(text) =>
				[...document.querySelectorAll("button")].some((b) => b.textContent.trim() === text && !b.disabled),
			{},
			text
		);
		await page.evaluate(
			(text) => [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === text).click(),
			text
		);
	};
	const text = (value) => page.waitForFunction((value) => document.body.innerText.includes(value), {}, value);
	await go("/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use");
	await click("Save review");
	await text("Saved review");
	await go("/consensus/nutrition-and-diet");
	await click("Follow topic");
	await text("Following topic");
	await go("/library");
	await text("Saved reviews (1)");
	await text("Followed topics (1)");
	await page.waitForSelector('#saved-reviews a[href*="does-caffeine-become-less-effective"]');
	await page.waitForSelector('#followed-topics a[href="/consensus/nutrition-and-diet"]');
	await page.reload({ waitUntil: "networkidle0" });
	await text("Saved reviews (1)");
	await text("Followed topics (1)");
	assert.equal(await page.evaluate(() => document.body.innerText.includes("My account")), false);
	await click("Remove");
	await text("Saved reviews (0)");
	await click("Unfollow");
	await text("Followed topics (0)");
	assert.deepEqual(errors, []);
	console.log(
		`Public reader library passed at ${expected}: identity, private headers, anonymous denial, browser-local save/follow/reload/removal and actual resolver content. No production database writes.`
	);
} finally {
	await browser.close();
}
