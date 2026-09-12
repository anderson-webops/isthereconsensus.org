// Invoked only by the fresh, owned loopback database/browser harness. All
// provider responses and time are injected; no public service or .env is used.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import process from "node:process";
import mongoose from "mongoose";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { SourceIntegrityCache, SourceIntegrityLease } from "../back-end/dist/models/schemas/SourceIntegrityCache.js";
import { SourceIntegrityCheck } from "../back-end/dist/models/schemas/SourceIntegrityCheck.js";
import { SourceIntegrityClient } from "../back-end/dist/utils/sourceIntegrityClient.js";
import { IntegrityProviderError, parseCrossrefIntegrityResponse } from "../back-end/dist/utils/sourceIntegrity.js";
import { parseEuropePmcIntegrityResponse } from "../back-end/dist/utils/europePmcIntegrity.js";
import { runSourceIntegrityMonitor } from "../back-end/dist/utils/sourceIntegrityMonitor.js";

export async function checkSourceIntegrity({
	api,
	browser,
	base,
	review,
	userCookie,
	adminCookie,
	browserLogin,
	browserText,
	restartBackend
}) {
	assert.match(base, /^http:\/\/127\.0\.0\.1:/);
	assert.match(mongoose.connection.name, /^reader_library_smoke_/);
	await Promise.all([SourceIntegrityCache.init(), SourceIntegrityCheck.init(), SourceIntegrityLease.init()]);
	let now = Date.now() - 32 * 86400000;
	const clock = () => new Date(now);
	const calls = [];
	const sleep = async (milliseconds) => {
		now += milliseconds;
	};
	await ClaimSource.updateMany(
		{},
		[
			{
				$set: {
					integrityMonitoring: {
						crossref: {
							doi: "$doi",
							attemptedAt: clock(),
							retryAt: new Date(now + 365 * 86400000),
							outcome: "no_registered_update"
						},
						europepmc: {
							doi: "$doi",
							attemptedAt: clock(),
							retryAt: new Date(now + 365 * 86400000),
							outcome: "no_registered_update"
						}
					}
				}
			}
		],
		{ updatePipeline: true }
	);
	const claim = await Claim.create({
		...review,
		_id: new mongoose.Types.ObjectId(),
		topic: review.topic._id,
		slug: `source-monitor-${randomUUID()}`,
		title: "Source monitor fixture",
		status: "published",
		__v: 0
	});
	const beforeClaim = await Claim.findById(claim._id).lean();
	const templates = await ClaimSource.find({ claim: review._id }).lean();
	await ClaimSource.insertMany(
		templates.map((source) => ({ ...source, _id: new mongoose.Types.ObjectId(), claim: claim._id, doi: "" }))
	);
	const sources = [];
	for (const doi of ["10.1000/flag", "10.1000/flag", "10.1000/absent", "invalid", "10.1000/race", "10.1000/busy"]) {
		sources.push(
			await ClaimSource.create({
				claim: claim._id,
				kind: "context",
				title: `Integrity fixture ${sources.length + 1}`,
				doi,
				citationStatus: "current",
				statusSources: ["https://publisher.example/manual"],
				evidenceProfile: { publicationIntegrity: { integrityNotes: "Preserved editorial assessment." } }
			})
		);
	}
	const [flagged, duplicate, absent, invalid, racing, busy] = sources;
	const check = async (doi, provider) => {
		calls.push({ doi, provider, at: now });
		if (provider === "crossref") return parseCrossrefIntegrityResponse({ message: { items: [] } }, doi);
		if (doi.endsWith("busy")) throw new IntegrityProviderError("http_429", 2 * 3600000);
		if (doi.endsWith("race"))
			await ClaimSource.updateOne(
				{ _id: racing._id },
				{ $set: { doi: "10.1000/edited", note: "Concurrent editor change" } }
			);
		return parseEuropePmcIntegrityResponse(
			{
				version: "6.9",
				hitCount: doi.endsWith("absent") ? 0 : 1,
				resultList: {
					result: doi.endsWith("absent")
						? []
						: [
								{
									id: "123",
									source: "MED",
									doi,
									commentCorrectionList: {
										commentCorrection: doi.endsWith("flag")
											? [
													{ type: "Retraction in", id: "124", source: "MED" },
													{ type: "Expression of concern in", id: "125", source: "MED" }
												]
											: []
									}
								}
							]
				}
			},
			doi
		);
	};
	const options = { apply: true, limit: 10, staleDays: 30, clock, sleep, check };
	// A dry run has no source/audit/cache/lease writes, even for duplicate DOIs.
	const prior = await ClaimSource.find({ claim: claim._id }).select("+integrityMonitoring").lean();
	const dry = await runSourceIntegrityMonitor({ ...options, apply: false, providers: ["crossref"] });
	assert.equal(dry.selected, 6);
	assert.equal(calls.length, 4);
	assert.equal(dry.cached, 1);
	assert.equal(await SourceIntegrityCheck.countDocuments(), 0);
	assert.equal(await SourceIntegrityCache.countDocuments(), 0);
	assert.equal(await SourceIntegrityLease.countDocuments(), 0);
	assert.deepEqual(await ClaimSource.find({ claim: claim._id }).select("+integrityMonitoring").lean(), prior);
	calls.length = 0;
	const crossref = await runSourceIntegrityMonitor({ ...options, providers: ["crossref"] });
	assert.equal(crossref.checked, 5);
	assert.equal(crossref.unsupported, 1);
	assert.equal(crossref.cached, 1);
	assert.equal(calls.length, 4);
	for (let i = 1; i < calls.length; i++) assert.ok(calls[i].at - calls[i - 1].at >= 1000);
	const invalidRow = await ClaimSource.findById(invalid._id).select("+integrityMonitoring").lean();
	assert.equal(invalidRow.citationCheckedAt, undefined);
	assert.equal(invalidRow.evidenceProfile.publicationIntegrity.citationStatusCheckedAt, undefined);
	assert.equal(invalidRow.integrityMonitoring.crossref.checkedAt, undefined);
	const beforeEurope = await ClaimSource.findById(absent._id).lean();
	const europe = await runSourceIntegrityMonitor({ ...options, providers: ["europepmc"] });
	assert.equal(europe.selected, 6, "A recent Crossref check must not suppress a never-run Europe PMC check");
	assert.equal(europe.flagged, 2);
	assert.equal(europe.notIndexed, 1);
	assert.equal(europe.errors, 1);
	assert.equal(europe.conflicts, 1);
	assert.equal(europe.unsupported, 1);
	const afterAbsent = await ClaimSource.findById(absent._id).select("+integrityMonitoring").lean();
	assert.equal(afterAbsent.citationCheckedAt.toISOString(), beforeEurope.citationCheckedAt.toISOString());
	assert.equal(afterAbsent.integrityMonitoring.europepmc.checkedAt, undefined);
	const afterFlag = await ClaimSource.findById(flagged._id).lean();
	assert.equal(afterFlag.citationStatus, "retracted");
	assert.equal(afterFlag.evidenceProfile.publicationIntegrity.expressionOfConcern, true);
	assert.equal(afterFlag.evidenceProfile.publicationIntegrity.integrityNotes, "Preserved editorial assessment.");
	assert.deepEqual(
		await Claim.findById(claim._id).lean(),
		beforeClaim,
		"Monitoring must not touch conclusions, review dates, schedules or claim revisions"
	);
	assert.equal((await ClaimSource.findById(racing._id).lean()).note, "Concurrent editor change");
	const originalAttempt = await SourceIntegrityCheck.findOne({ source: flagged._id, provider: "europepmc" }).lean();
	assert.equal(originalAttempt.cached, false);
	const reused = await SourceIntegrityCheck.findOne({ source: duplicate._id, provider: "europepmc" }).lean();
	assert.equal(reused.cached, true);
	assert.equal(reused.observedAt.toISOString(), originalAttempt.observedAt.toISOString());
	const errorRow = await SourceIntegrityCheck.findOne({ source: busy._id, provider: "europepmc" }).lean();
	assert.equal(errorRow.diagnosticCode, "http_429");
	assert.equal(errorRow.observedAt, undefined);
	assert.equal(errorRow.applied, false);
	assert.ok(errorRow.retryAt.getTime() - errorRow.attemptedAt.getTime() >= 2 * 3600000);
	// A new process/client reuses the stored observation without claiming a new
	// upstream check. Provider cooldown is persistent, and independent of DOI cache.
	const client = new SourceIntegrityClient({
		apply: true,
		clock,
		sleep,
		check: async () => {
			throw new Error("Unexpected network request");
		}
	});
	await client.open();
	assert.equal((await client.observe("10.1000/flag", "europepmc")).cached, true);
	assert.ok((await client.observe("10.1000/new", "europepmc")).deferredUntil > clock());
	await assert.rejects(runSourceIntegrityMonitor({ ...options, providers: ["crossref"] }), /monitor_already_running/);
	await client.close();
	// Recovery after Retry-After does make a fresh request.
	now += 2 * 3600000 + 1000;
	const recoveredClient = new SourceIntegrityClient({
		apply: true,
		clock,
		sleep,
		check: async (doi, provider) => ({
			...parseCrossrefIntegrityResponse({ message: { items: [] } }, doi),
			provider
		})
	});
	await recoveredClient.open();
	const recovered = await recoveredClient.observe("10.1000/busy", "europepmc");
	assert.equal(recovered.cached, false);
	assert.equal(recovered.entry.failures, 0);
	assert.equal(recovered.entry.observation.outcome, "no_registered_update");
	await recoveredClient.close();
	// Repeating successful observations must not reopen a handled notice, while a
	// newly linked notice does. Audit expiry must not erase the persistent warning.
	const detail = (await api(`/admin/review-priority/${claim._id}`, { cookie: adminCookie })).data;
	const notice = detail.sources.find((item) => item._id === String(flagged._id));
	assert.ok(notice);
	await api(`/admin/review-priority/${claim._id}/sources/${flagged._id}`, {
		method: "PATCH",
		cookie: adminCookie,
		body: {
			revision: notice.revision,
			fingerprint: notice.fingerprint,
			decision: "addressed",
			note: "Fixture editor assessed the retained source notices."
		}
	});
	await SourceIntegrityCheck.deleteMany({ source: flagged._id });
	assert.equal((await ClaimSource.findById(flagged._id).lean()).citationStatus, "retracted");
	now += 31 * 86400000;
	await runSourceIntegrityMonitor({
		...options,
		providers: ["europepmc"],
		check: async (doi) =>
			parseEuropePmcIntegrityResponse(
				{
					version: "6.9",
					hitCount: 1,
					resultList: {
						result: [
							{
								id: "123",
								source: "MED",
								doi,
								commentCorrectionList: {
									commentCorrection: doi.endsWith("flag")
										? [
												{ type: "Retraction in", id: "124", source: "MED" },
												{ type: "Expression of concern in", id: "125", source: "MED" }
											]
										: []
								}
							}
						]
					}
				},
				doi
			)
	});
	const repeated = (await api(`/admin/review-priority/${claim._id}`, { cookie: adminCookie })).data.sources.find(
		(item) => item._id === String(flagged._id)
	);
	assert.equal(repeated.fingerprint, notice.fingerprint);
	assert.equal(repeated.addressed, true);
	await ClaimSource.updateOne(
		{ _id: flagged._id },
		{ $addToSet: { statusSources: "https://europepmc.org/article/MED/126" } }
	);
	const changed = (await api(`/admin/review-priority/${claim._id}`, { cookie: adminCookie })).data.sources.find(
		(item) => item._id === String(flagged._id)
	);
	assert.notEqual(changed.fingerprint, notice.fingerprint);
	assert.equal(changed.addressed, false);
	for (const cookie of [undefined, userCookie]) {
		const denied = await api("/admin/source-integrity", { cookie, status: 403 });
		assert.match(denied.response.headers.get("cache-control"), /private, no-store/);
	}
	await api("/admin/source-integrity?provider=other", { cookie: adminCookie, status: 400 });
	const page1 = await api("/admin/source-integrity?provider=europepmc&limit=2", { cookie: adminCookie });
	const page2 = await api("/admin/source-integrity?provider=europepmc&limit=2&page=2", { cookie: adminCookie });
	assert.equal(page1.data.checks.length, 2);
	assert.equal(new Set([...page1.data.checks, ...page2.data.checks].map((item) => item._id)).size, 4);
	assert.ok(page1.data.checks.every((item) => item.provider === "europepmc"));
	assert.equal(page1.data.providerCoverage.length, 2);
	assert.equal(
		(await api(`/topics/${review.topic.slug}/claims/${claim.slug}`, { cookie: userCookie })).response.status,
		200
	);
	const publicText = JSON.stringify((await api(`/topics/${review.topic.slug}/claims/${claim.slug}`)).data);
	assert.ok(!publicText.includes("integrityMonitoring"));
	await restartBackend();
	assert.equal(
		(await api("/admin/source-integrity?provider=europepmc&limit=2", { cookie: adminCookie })).data.pagination
			.total,
		page1.data.pagination.total
	);

	const page = await browser.newPage();
	await page.goto(`${base}/account`, { waitUntil: "networkidle0" });
	await browserLogin(page);
	await page.goto(`${base}/account/editorial/source-integrity`, { waitUntil: "networkidle0" });
	await browserText(page, "Provider coverage");
	await page.select("select", "europepmc");
	await browserText(page, "Europe PMC");
	const require = createRequire(import.meta.url);
	for (const color of ["light", "dark"]) {
		await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: color }]);
		await page.waitForFunction(
			(color) => document.documentElement.classList.contains("dark") === (color === "dark"),
			{},
			color
		);
		for (const width of [390, 1280]) {
			await page.setViewport({ width, height: 1000 });
			await page.evaluate(async () => {
				await Promise.all(
					document
						.getAnimations()
						.filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime))
						.map((animation) => animation.finished.catch(() => {}))
				);
			});
			await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
			const audit = await page.evaluate(
				async () =>
					(await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }))
						.violations
			);
			assert.deepEqual(
				audit.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })),
				[]
			);
			assert.equal(await page.$$eval("main", (elements) => elements.length), 1);
			assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
		}
	}
	if (process.env.SOURCE_INTEGRITY_SCREENSHOT_DIR) {
		mkdirSync(process.env.SOURCE_INTEGRITY_SCREENSHOT_DIR, { recursive: true });
		for (const width of [1280, 390]) {
			await page.setViewport({ width, height: 1000 });
			await page.screenshot({
				path: join(process.env.SOURCE_INTEGRITY_SCREENSHOT_DIR, `source-integrity-${width}.png`),
				fullPage: false
			});
		}
	}
	await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
	await page.setViewport({ width: 390, height: 1000 });
	assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
	await page.evaluate(() => fetch("/api/auth/logout", { method: "DELETE" }));
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Admin access required.");
	assert.ok(!(await page.evaluate(() => document.body.innerText)).includes("Integrity fixture"));
	await page.close();
	console.log(
		"source integrity: independent providers, persistent cache/cooldown/lease, failed coverage, notice preservation, edit races, admin pagination, browser privacy and four authenticated accessibility cases passed"
	);
}
