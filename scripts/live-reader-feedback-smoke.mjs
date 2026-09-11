// Public acceptance without test accounts, feedback submissions or admin writes.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import process from "node:process";
import puppeteer from "puppeteer";

const base = "https://isthereconsensus.org";
const expected = process.env.LIVE_SMOKE_EXPECT_COMMIT;
assert.match(expected || "", /^[a-f\d]{40}$/, "Supply the exact approved release commit.");
const get = (path) => fetch(base + path, { signal: AbortSignal.timeout(15_000), redirect: "error" });
const identity = await get("/deployment.json");
assert.equal(identity.status, 200);
assert.equal((await identity.json()).commit, expected);
for (const [path, status] of [
	["/api/admin/reader-feedback", 403],
	["/api/admin/reader-feedback/targets?query=caffeine", 403],
	["/account/editorial/reader-feedback", 200]
]) {
	const response = await get(path);
	assert.equal(response.status, status, path);
	assert.match(response.headers.get("cache-control"), /private, no-store/, path);
	if (path.startsWith("/account/")) assert.match(response.headers.get("x-robots-tag"), /noindex/);
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
	await page.setRequestInterception(true);
	page.on("request", (request) => {
		if (new URL(request.url()).origin === base && !["GET", "HEAD", "OPTIONS"].includes(request.method())) {
			errors.push(`Blocked unexpected write: ${request.method()} ${new URL(request.url()).pathname}`);
			return request.abort();
		}
		return request.continue();
	});
	const open = (path) => page.goto(base + path, { waitUntil: "networkidle0", timeout: 30_000 });
	const expand = async (label) => {
		await page.waitForFunction(() => Boolean(document.querySelector("#__nuxt")?.__vue_app__));
		await page.evaluate((label) => {
			const button = [...document.querySelectorAll(".reader-feedback button")].find(
				(item) => item.textContent.trim() === label
			);
			if (!button) throw new Error(`Missing feedback control: ${label}`);
			button.click();
		}, label);
		await page.waitForSelector('[name="feedback-message"]');
		assert.equal(await page.$eval('[name="feedback-message"]', (field) => field.value), "");
		// Check production configuration/rendering, never solve or submit the bot check.
		await page.waitForSelector(".reader-feedback .captcha__widget");
	};
	await open("/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use");
	assert.match(await page.$eval(".reader-feedback", (element) => element.textContent), /Was this review useful/);
	await expand("Suggest missing evidence");
	assert.equal(await page.$eval('[name="feedback-area"]', (field) => field.value), "source");
	await open("/ask");
	await expand("Suggest a missing topic privately");
	assert.equal(await page.$eval('[name="feedback-title"]', (field) => field.value), "");
	await open("/account/editorial/reader-feedback");
	await page.waitForFunction(() => document.body.innerText.includes("This queue is only available to admins."));
	assert.equal(await page.$(".feedback-queue__card"), null);
	assert.deepEqual(errors, []);
	console.log(
		`Public reader feedback passed at ${expected}: private headers, admin denial, review and topic forms, bot-check container, and anonymous queue lock. No submissions or production account/database writes. CAPTCHA validation and authenticated triage are covered by isolated tests, not this read-only check.`
	);
} finally {
	await browser.close();
}
