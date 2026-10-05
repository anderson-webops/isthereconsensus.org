import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readerExpansionClaims } from "../back-end/dist/data/claim-expansion-reader.js";
import { defaultClaims } from "../back-end/dist/data/claims.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";

export async function checkReaderContent({ api, browser, base, restartBackend }) {
	const context = await browser.createBrowserContext();
	const page = await context.newPage();
	const errors = [];
	page.on("pageerror", error => errors.push(error.message));
	const snapshots = [];
	const require = createRequire(import.meta.url);
	try {
		for (const entry of readerExpansionClaims) {
			const seed = defaultClaims.find(claim => claim.slug === entry.slug);
			const { data } = await api(`/topics/${seed.topicSlug}/claims/${seed.slug}`);
			assert.equal(data.claim.bottomLine, seed.bottomLine);
			assert.deepEqual(data.claim.stableCore, seed.stableCore);
			assert.equal(data.claim.sources.length, seed.sources.length);
			assert.deepEqual(data.claim.sources.map(source => [source.url, source.citationStatus, source.kind, source.appraisal]), seed.sources.map(source => [source.url, source.citationStatus, source.kind, source.appraisal]));
			const stored = await Claim.findOne({ slug: seed.slug }).lean();
			assert.ok(stored);
			assert.equal(await Claim.countDocuments({ topic: stored.topic, slug: stored.slug }), 1);
			assert.equal(stored.readerUpdates.length, 1);
			assert.equal(stored.readerUpdates[0].id, seed.readerAnnouncement.id);
			assert.equal(stored.lastReviewedAt.toISOString(), seed.searchCutoffAt);
			snapshots.push({ slug: stored.slug, id: String(stored._id), updates: JSON.stringify(stored.readerUpdates), reviewedAt: stored.lastReviewedAt.toISOString() });
			const response = await page.goto(`${base}/consensus/${seed.topicSlug}/${seed.slug}`, { waitUntil: "networkidle0" });
			assert.equal(response.status(), 200);
			await page.waitForFunction(title => document.querySelector("h1")?.textContent?.includes(title), {}, seed.title);
			await page.$eval("#review-status", element => { element.open = true; });
			const text = await page.$eval("main", element => element.innerText.replace(/\s+/g, " "));
			assert.ok(text.includes(seed.bottomLine), seed.slug);
			assert.ok(text.includes("independent expert review not completed"));
			const technicalSources = seed.sources.filter(source => source.kind === "technical_reference");
			if (technicalSources.length) {
				const technicalGroup = await page.$(".source-group:has(.source-group__summary)");
				assert.ok(technicalGroup);
				await page.$$eval(".source-group", groups => {
					for (const group of groups) if (group.textContent.includes("Technical and measurement references")) group.open = true;
				});
				const rendered = await page.$eval("main", element => element.innerText);
				assert.ok(rendered.includes("not formal consensus statements"));
				for (const source of technicalSources) assert.ok(rendered.includes(source.title));
			}
			await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
			await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
			for (const color of ["light", "dark"]) {
				await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: color }]);
				await page.waitForFunction(color => document.documentElement.classList.contains("dark") === (color === "dark"), {}, color);
				for (const width of [1280, 320]) {
					await page.setViewport({ width, height: 900 });
					await page.evaluate(width => { document.documentElement.style.fontSize = width === 320 ? "200%" : "100%"; }, width);
					const result = await page.evaluate(() => globalThis.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }));
					assert.deepEqual(result.violations, [], `${seed.slug}: ${color}/${width}`);
					assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
				}
			}
		}
		await page.goto(`${base}/guides/browsing-privacy`, { waitUntil: "networkidle0" });
		await page.waitForSelector(".guide-source-list");
		assert.equal(await page.$$eval(".guide-review-links a", links => links.length), 3);
		const guideText = await page.$eval("main", element => element.innerText);
		assert.ok(guideText.includes("does not mean it can automatically decrypt"));
		assert.ok(guideText.includes("independent expert review has not been completed"));
		const originsResponse = await page.goto(`${base}/guides/reading-fossil-and-ancestry-evidence`, { waitUntil: "networkidle0" });
		assert.equal(originsResponse.status(), 200);
		await page.waitForSelector(".guide-source-list");
		assert.equal(await page.$$eval(".guide-review-links a", links => links.length), 5);
		const originsText = await page.$eval("main", element => element.innerText.replace(/\s+/g, " "));
		assert.ok(originsText.includes("still includes animal foods"));
		assert.ok(originsText.includes("not two independent studies"));
		assert.ok(originsText.includes("independent expert review has not been completed"));
		const spaceResponse = await page.goto(`${base}/guides/reading-space-observations`, { waitUntil: "networkidle0" });
		assert.equal(spaceResponse.status(), 200);
		await page.waitForSelector(".guide-source-list");
		assert.equal(await page.$$eval(".guide-review-links a", links => links.length), 10);
		const spaceText = await page.$eval("main", element => element.innerText.replace(/\s+/g, " "));
		assert.ok(spaceText.includes("not a resolved photograph"));
		assert.ok(spaceText.includes("not two independent confirmations"));
		assert.ok(spaceText.includes("not an exhaustive review of later comparisons"));
		assert.ok(spaceText.includes("independent expert review has not been completed"));
		await restartBackend();
		for (const snapshot of snapshots) {
			const stored = await Claim.findOne({ slug: snapshot.slug }).lean();
			assert.equal(String(stored._id), snapshot.id);
			assert.equal(JSON.stringify(stored.readerUpdates), snapshot.updates);
			assert.equal(stored.lastReviewedAt.toISOString(), snapshot.reviewedAt);
			assert.equal(await Claim.countDocuments({ topic: stored.topic, slug: stored.slug }), 1);
		}
		assert.deepEqual(errors, []);
	}
	finally {
		await context.close();
	}
	console.log(`reader content: ${snapshots.length} unique seeded reviews, exact anonymous APIs, rendered qualifications, ${snapshots.length * 4} responsive accessibility cases, guide links and restart-stable dates/announcements passed`);
}
