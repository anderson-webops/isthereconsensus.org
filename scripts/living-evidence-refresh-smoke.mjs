// Invoked only by the owned, disposable reader-library harness.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { defaultClaims } from "../back-end/dist/data/claims.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";

export async function checkLivingEvidenceRefreshes({ api, browser, base }) {
	const registry = JSON.parse(readFileSync(new URL("../docs/living-evidence-refreshes.json", import.meta.url), "utf8"));
	const keys = new Set(registry.refreshes.map(record => `${record.topicSlug}/${record.slug}`));
	const seeds = defaultClaims.filter(claim => keys.has(`${claim.topicSlug}/${claim.slug}`));
	assert.ok(seeds.length > 0);
	assert.equal(seeds.length, registry.refreshes.length);
	const context = await browser.createBrowserContext();
	const page = await context.newPage();
	const errors = [];
	page.on("pageerror", error => errors.push(error.message));
	const require = createRequire(import.meta.url);
	try {
		for (const seed of seeds) {
			const path = `/topics/${seed.topicSlug}/claims/${seed.slug}`;
			const { data } = await api(path);
			assert.equal(data.claim.bottomLine, seed.bottomLine);
			assert.deepEqual(data.claim.stableCore, seed.stableCore);
			assert.deepEqual(
				data.claim.evidenceSummaries.map(({ _id, ...summary }) => summary),
				seed.evidenceSummaries
			);
			assert.equal(data.claim.sources.length, seed.sources.length);
			assert.deepEqual(
				data.claim.sources.map(source => [source.doi || "", source.citationStatus]),
				seed.sources.map(source => [source.doi || "", source.citationStatus])
			);
			assert.equal(data.claim.changeLog.at(-1).summary, seed.readerAnnouncement.summary);
			const saved = await Claim.findOne({ slug: seed.slug }).lean();
			assert.ok(saved.readerUpdates.some(update => update.id === seed.readerAnnouncement.id));
			assert.equal(saved.reviewDateBasis, "source_record");
			await page.goto(`${base}/consensus/${seed.topicSlug}/${seed.slug}`, { waitUntil: "networkidle0" });
			// Audit settled colors, not intermediate theme-transition frames.
			await page.addStyleTag({
				content: "*, *::before, *::after { animation: none !important; transition: none !important; }"
			});
			assert.ok(
				(await page.$eval(".bottom-line", node => node.innerText))
					.replace(/\s+/g, " ")
					.includes(seed.bottomLine)
			);
			await page.$eval("#claim-history", node => (node.open = true));
			assert.ok(
				(await page.$eval("#claim-history", node => node.innerText)).includes(seed.readerAnnouncement.summary)
			);
			for (const color of ["light", "dark"]) {
				await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: color }]);
				await page.waitForFunction(
					color => document.documentElement.classList.contains("dark") === (color === "dark"),
					{},
					color
				);
				for (const width of [390, 1280]) {
					await page.setViewport({ width, height: 1000 });

					await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
					const violations = await page.evaluate(
						async () =>
							(
								await axe.run(document, {
									runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
								})
							).violations
					);
					assert.deepEqual(
						violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })),
						[]
					);
					assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
				}
			}
		}
		assert.deepEqual(errors, []);
	}
	finally {
		await context.close();
	}
	console.log(
		`living evidence refreshes: ${seeds.length} existing reviews, exact public content and ordered sources, correction flags, retained history, stable announcements and ${seeds.length * 4} responsive accessibility cases passed in disposable database/browser`
	);
}
