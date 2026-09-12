import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import process from "node:process";
import { claimReviewStatus } from "../../back-end/src/utils/claimReviewStatus.ts";

const axePath = createRequire(import.meta.url).resolve("axe-core/axe.min.js");
async function checkExpandedAccessibility(page) {
	await page.addScriptTag({ path: axePath });
	const violations = await page.evaluate(
		async () =>
			(
				await globalThis.axe.run(document.querySelector("#review-status"), {
					runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] }
				})
			).violations
	);
	assert.deepEqual(violations, [], "Expanded review status accessibility");
}

export async function checkReviewStatus({ page, baseUrl, open, setFixture }) {
	const path = "/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use";
	const now = new Date("2026-09-12T12:00:00Z");
	const cases = [
		{ lastReviewedAt: "2026-08-01", searchCutoffAt: "2026-07-31", label: "Date provenance not recorded" },
		{
			lastReviewedAt: "2026-08-01",
			searchCutoffAt: "2026-07-31",
			reviewDateBasis: "source_record",
			nextReviewAt: "2026-09-01",
			label: "Follow-up review due"
		},
		{ lastReviewedAt: "2030-01-01", searchCutoffAt: "not a date", label: "Dates need verification" },
		{
			lastReviewedAt: "2026-08-01",
			reviewDateBasis: "editorial_review",
			sources: [
				{
					kind: "guideline",
					title: "Source with recorded notice",
					citationStatus: "corrected",
					citationCheckedAt: "2026-09-01",
					note: "Fixture notice; no independent adjudication."
				}
			],
			label: "Source notice recorded"
		}
	];
	try {
		for (const fixture of cases) {
			const status = claimReviewStatus(fixture, fixture.sources ?? [], now);
			setFixture({ ...fixture, reviewStatus: status });
			const html = await (await fetch(baseUrl + path)).text();
			assert.ok(html.includes(fixture.label), "Status must be present in SSR");
			await open(path);
			const article = await page.evaluate(() =>
				Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
					.map((element) => JSON.parse(element.textContent))
					.find((value) => value["@type"] === "Article")
			);
			assert.ok(article);
			assert.equal("reviewedBy" in article, false, "A free-text disclosure is not a verified person identity");
			assert.ok((await page.$eval("#review-status", (element) => element.textContent)).includes(fixture.label));
			await page.focus("#review-status > summary");
			await page.keyboard.press("Enter");
			assert.equal(await page.$eval("#review-status", (element) => element.open), true);
			const text = await page.$eval("#review-status", (element) => element.innerText);
			assert.ok(!text.includes("Invalid Date"));
			await checkExpandedAccessibility(page);
			if (fixture.lastReviewedAt === "2030-01-01") assert.ok(!text.includes("2030"));
			if (fixture.label === "Source notice recorded") assert.ok(text.includes("1 source has"));
			await page.click('#review-status a[href="#claim-history"]');
			assert.equal(await page.$eval("#claim-history", (element) => element.open), true);
		}
		for (const theme of ["light", "dark"]) {
			await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
			for (const width of [1280, 390, 320]) {
				await page.setViewport({ width, height: 1000 });
				await open(path);
				await page.click("#review-status > summary");
				await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
				await checkExpandedAccessibility(page);
				assert.equal(
					await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
					true,
					`${theme}/${width}: overflow`
				);
			}
		}
		if (process.env.REVIEW_STATUS_SCREENSHOT_DIR) {
			mkdirSync(process.env.REVIEW_STATUS_SCREENSHOT_DIR, { recursive: true });
			await page.setViewport({ width: 390, height: 1000 });
			await open(path);
			await page.click("#review-status > summary");
			await (
				await page.$("#review-status")
			).screenshot({ path: resolve(process.env.REVIEW_STATUS_SCREENSHOT_DIR, "review-status-mobile.png") });
		}
		console.log(
			"PASS review status: SSR, hydration, provenance, invalid dates, notices, keyboard, history links, mobile and enlarged text"
		);
	} finally {
		setFixture(undefined);
		await page.emulateMediaFeatures([]);
		await page.setViewport({ width: 1280, height: 900 });
	}
}
