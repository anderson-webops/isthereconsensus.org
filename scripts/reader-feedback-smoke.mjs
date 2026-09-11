// Invoked by the owned, disposable MongoDB/backend/browser harness. Never
// accepts a production URL or provisions accounts outside that harness.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { join } from "node:path";
import process from "node:process";
import { evidenceComparisons } from "../back-end/dist/data/comparisons/index.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ReaderFeedback } from "../back-end/dist/models/schemas/ReaderFeedback.js";
import { User } from "../back-end/dist/models/schemas/User.js";

export async function checkReaderFeedback({
	api,
	browser,
	base,
	review,
	userCookie,
	adminCookie,
	browserLogin,
	clickText,
	browserText,
	restartBackend
}) {
	const claimId = String(review._id);
	const before = await Claim.findById(claimId).lean();
	const list = (options = {}) => api("/admin/reader-feedback", options);
	await list({ status: 403 });
	await list({ cookie: userCookie, status: 403 });
	await User.updateOne({ email: "reader-a@example.test" }, { $set: { expertiseStatus: "verified" } });
	await list({ cookie: userCookie, status: 403 });
	await User.updateOne({ email: "reader-a@example.test" }, { $set: { expertiseStatus: "none" } });
	await api("/admin/reader-feedback/targets?query=caffeine", { status: 403 });
	const rating = { kind: "usefulness", claimId, helpful: true };
	await api("/reader-feedback", { method: "POST", body: { ...rating, password: "do-not-store" }, status: 400 });
	await api("/reader-feedback", {
		method: "POST",
		body: { ...rating, claimId: "000000000000000000000000" },
		status: 422
	});
	await api("/reader-feedback", { method: "POST", body: rating, status: 201 });
	assert.equal(
		(await api("/reader-feedback", { method: "POST", body: { ...rating, helpful: false } })).data.duplicate,
		true
	);
	assert.equal(await ReaderFeedback.countDocuments(), 1);
	const gap = {
		kind: "content_gap",
		title: "A private research gap",
		message: "Please review the evidence for learning in a second language.",
		sourceUrl: "https://example.org/source",
		captchaToken: "test-only-not-retained"
	};
	const statuses = await Promise.all(
		[1, 2].map(() =>
			fetch(`${base}/api/reader-feedback`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Origin: base },
				body: JSON.stringify(gap)
			}).then((response) => response.status)
		)
	);
	assert.deepEqual(statuses.sort(), [200, 201]);
	assert.equal(await ReaderFeedback.countDocuments(), 2);
	await restartBackend();
	assert.equal(await ReaderFeedback.countDocuments(), 2, "Feedback must survive a backend restart.");
	const raw = JSON.stringify(await ReaderFeedback.find().lean());
	assert.doesNotMatch(
		raw,
		/test-only-not-retained|do-not-store|captchaToken|password|authorization|sourceIp|reader-a@example/
	);
	const { data, response } = await api("/admin/reader-feedback?limit=1", { cookie: adminCookie });
	assert.match(response.headers.get("cache-control"), /private, no-store/);
	assert.equal(data.pagination.total, 2);
	assert.equal(data.rows.length, 1);
	assert.equal(data.pagination.hasMore, true);
	const second = (await api("/admin/reader-feedback?limit=1&page=2", { cookie: adminCookie })).data.rows[0];
	assert.notEqual(data.rows[0]._id, second._id);
	const target = (await api("/admin/reader-feedback?kind=content_gap", { cookie: adminCookie })).data.rows[0];
	const change = {
		revision: 0,
		status: "planned",
		priority: 2,
		note: "Prepare a sourced review before publication.",
		linkedClaimId: claimId,
		linkedTopicId: null
	};
	await api(`/admin/reader-feedback/${target._id}`, {
		method: "PATCH",
		cookie: userCookie,
		body: change,
		status: 403
	});
	await api(`/admin/reader-feedback/${target._id}`, { method: "PATCH", cookie: adminCookie, body: change });
	await api(`/admin/reader-feedback/${target._id}`, {
		method: "PATCH",
		cookie: adminCookie,
		body: change,
		status: 409
	});
	const planned = (await api("/admin/reader-feedback?status=planned&priority=2", { cookie: adminCookie })).data;
	assert.equal(planned.pagination.total, 1);
	assert.equal(planned.rows[0].linkedClaimId, claimId);
	assert.equal(planned.rows[0].reviews.length, 1);
	await api(`/admin/reader-feedback/${target._id}`, {
		method: "PATCH",
		cookie: adminCookie,
		body: { ...change, revision: 1, linkedClaimId: null, linkedTopicId: String(review.topic._id) }
	});
	const topicLinked = (await api("/admin/reader-feedback?status=planned", { cookie: adminCookie })).data.rows[0];
	assert.equal(topicLinked.linkedTopic.slug, review.topic.slug);
	assert.equal(topicLinked.reviews.length, 2);
	assert.deepEqual(
		await Claim.findById(claimId).lean(),
		before,
		"Reader feedback must never mutate scientific claims."
	);
	const destinations = (await api("/admin/reader-feedback/targets?query=caffeine", { cookie: adminCookie })).data;
	assert.ok(destinations.claims.some((item) => item._id === claimId));
	assert.ok(
		(await api("/admin/reader-feedback/targets?query=nutrition", { cookie: adminCookie })).data.topics.length
	);
	await api("/admin/reader-feedback?limit=0", { cookie: adminCookie, status: 400 });
	await api("/admin/reader-feedback?status=publish", { cookie: adminCookie, status: 400 });
	const expired = await ReaderFeedback.create({
		_id: "f".repeat(64),
		kind: "content_gap",
		title: "Expired feedback",
		expiresAt: new Date(0)
	});
	assert.equal((await list({ cookie: adminCookie })).data.pagination.total, 2);
	await expired.deleteOne();
	console.log(
		"reader feedback API: explicit submissions, deduplication, private fields, admin-only pagination, filters, destinations, CAS and scientific-state isolation passed"
	);

	const page = await browser.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto(`${base}/consensus/${review.topic.slug}/${review.slug}`, { waitUntil: "networkidle0" });
	await clickText(page, "Not yet");
	await browserText(page, "This feedback has already been received today.");
	await clickText(page, "Suggest missing evidence");
	await page.type('[name="feedback-message"]', "Please explain whether the evidence applies to older adults.");
	await page.type('[name="feedback-source"]', "https://example.org/public-review");
	await page.setRequestInterception(true);
	let fail = true;
	const intercept = (request) =>
		request.url().endsWith("/api/reader-feedback") && fail
			? request.respond({
					status: 503,
					contentType: "application/json",
					body: JSON.stringify({ error: "Fixture feedback service unavailable" })
				})
			: request.continue();
	page.on("request", intercept);
	await clickText(page, "Send private suggestion");
	await browserText(page, "Fixture feedback service unavailable");
	assert.match(await page.$eval('[name="feedback-message"]', (el) => el.value), /older adults/);
	fail = false;
	await clickText(page, "Send private suggestion");
	await browserText(page, "Thank you. Your feedback is in the private editorial queue.");
	page.off("request", intercept);
	await page.setRequestInterception(false);
	await page.goto(`${base}/ask?q=private-query-must-not-be-copied`, { waitUntil: "networkidle0" });
	await clickText(page, "Suggest a missing topic privately");
	assert.equal(await page.$eval('[name="feedback-title"]', (el) => el.value), "");
	assert.equal(await page.$eval('[name="feedback-message"]', (el) => el.value), "");
	await page.type('[name="feedback-title"]', "Evidence about reading and retention");
	await page.type(
		'[name="feedback-message"]',
		"Please investigate whether different reading strategies improve delayed recall."
	);
	if (process.env.READER_FEEDBACK_SCREENSHOT_DIR) {
		await (
			await page.$(".reader-feedback")
		).screenshot({ path: join(process.env.READER_FEEDBACK_SCREENSHOT_DIR, "public-form.png") });
	}
	await page.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
	assert.deepEqual(
		await page.evaluate(async () => (await window.axe.run(document.querySelector(".reader-feedback"))).violations),
		[]
	);
	await clickText(page, "Send private suggestion");
	await browserText(page, "Thank you. Your feedback is in the private editorial queue.");
	assert.doesNotMatch(JSON.stringify(await ReaderFeedback.find().lean()), /private-query-must-not-be-copied/);
	const adminPath = `${base}/account/editorial/reader-feedback`;
	const html = await fetch(adminPath);
	assert.match(html.headers.get("cache-control"), /private, no-store/);
	assert.match(html.headers.get("x-robots-tag"), /noindex/);
	assert.doesNotMatch(await html.text(), /A private research gap|older adults/);
	await page.goto(adminPath, { waitUntil: "networkidle0" });
	await browserText(page, "This queue is only available to admins.");
	await browserLogin(page);
	await page.reload({ waitUntil: "networkidle0" });
	await browserText(page, "Evidence about reading and retention");
	await clickText(page, "Review feedback");
	await page.type('[name="review-note"]', "Commission a focused evidence synthesis for this question.");
	await page.type('[name="target-query"]', "caffeine");
	await clickText(page, "Find destination");
	await page.waitForSelector(".feedback-queue__targets button");
	await page.click(".feedback-queue__targets button");
	if (process.env.READER_FEEDBACK_SCREENSHOT_DIR) {
		await page.screenshot({
			path: join(process.env.READER_FEEDBACK_SCREENSHOT_DIR, "admin-triage.png"),
			fullPage: true
		});
	}
	await clickText(page, "Save editorial review");
	await browserText(page, "Editorial priority saved.");
	await page.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
	for (const mode of ["light", "dark"]) {
		await page.evaluate((mode) => {
			localStorage.setItem("nuxt-color-mode", mode);
		}, mode);
		await page.reload({ waitUntil: "networkidle0" });
		await browserText(page, "Reader feedback");
		await page.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
		await page.evaluate(async () => {
			await new Promise(requestAnimationFrame);
			await Promise.all(
				document
					.getAnimations()
					.filter((a) => Number.isFinite(a.effect?.getComputedTiming().endTime))
					.map((a) => a.finished.catch(() => {}))
			);
		});
		assert.deepEqual(await page.evaluate(async () => (await window.axe.run()).violations), []);
	}
	for (const width of [1440, 390, 320]) {
		await page.setViewport({ width, height: 900 });
		assert.ok(
			await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
			`Feedback queue overflow at ${width}`
		);
	}
	await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
	assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
	await page.evaluate(() => document.querySelector('a[href="/account"]').click());
	await clickText(page, "Sign out");
	await page.goto(adminPath, { waitUntil: "networkidle0" });
	await browserText(page, "This queue is only available to admins.");
	assert.equal(await page.$(".feedback-queue__card"), null);
	assert.deepEqual(errors, []);
	await page.close();
	await checkComparisonFeedback({
		api,
		browser,
		base,
		adminCookie,
		userCookie,
		browserLogin,
		clickText,
		browserText
	});
	let limited = false;
	for (let attempt = 0; attempt < 31; attempt++) {
		const response = await fetch(`${base}/api/reader-feedback`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Origin: base },
			body: JSON.stringify(rating)
		});
		if (response.status === 429) {
			assert.match((await response.json()).error, /Feedback limit reached/);
			limited = true;
			break;
		}
		assert.equal(response.status, 200);
	}
	assert.equal(limited, true, "Anonymous feedback must have bounded request rates.");
	console.log(
		"reader feedback browser: usefulness, retained failed form, no query capture, private suggestion, admin triage/linking, sign-out and responsive accessibility passed"
	);
}

async function checkComparisonFeedback({
	api,
	browser,
	base,
	adminCookie,
	userCookie,
	browserLogin,
	clickText,
	browserText
}) {
	const comparison = evidenceComparisons[0];
	const before = JSON.stringify(evidenceComparisons);
	const rating = { kind: "usefulness", comparisonSlug: comparison.slug, helpful: true };
	await api("/reader-feedback", {
		method: "POST",
		body: { ...rating, referenceTitle: "Spoofed title" },
		status: 400
	});
	await api("/reader-feedback", {
		method: "POST",
		body: { ...rating, comparisonSlug: "withdrawn-comparison" },
		status: 422
	});
	await api("/reader-feedback", { method: "POST", body: rating, status: 201 });
	assert.equal(
		(await api("/reader-feedback", { method: "POST", body: { ...rating, helpful: false } })).data.duplicate,
		true
	);
	const path = `/admin/reader-feedback?comparisonSlug=${comparison.slug}`;
	await api(path, { status: 403 });
	await api(path, { cookie: userCookie, status: 403 });
	const row = (await api(path, { cookie: adminCookie })).data.rows[0];
	assert.equal(row.referenceTitle, comparison.title);
	assert.equal(row.claimId, undefined);
	assert.equal(row.topicId, undefined);
	const page = await browser.newPage();
	await page.evaluateOnNewDocument(() => localStorage.setItem("nuxt-color-mode", "system"));
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto(`${base}/compare/${comparison.slug}?private-query=must-not-be-copied`, {
		waitUntil: "networkidle0"
	});
	await browserText(page, "Was this comparison useful?");
	await clickText(page, "Not yet");
	await browserText(page, "This feedback has already been received today.");
	await page.click(".comparison-history summary");
	assert.equal(await page.$$eval(".comparison-history li", (nodes) => nodes.length), comparison.readerUpdates.length);
	assert.ok(await page.$('.comparison-history a[href="#comparison-source-nrel-2021"]'));
	await clickText(page, "Suggest missing evidence");
	assert.equal(await page.$('[name="feedback-title"]'), null);
	assert.equal(await page.$eval('[name="feedback-message"]', (element) => element.value), "");
	await page.type(
		'[name="feedback-message"]',
		"Please explain how whole-grid storage changes the comparison boundary."
	);
	await page.setRequestInterception(true);
	const fail = (request) =>
		request.url().endsWith("/api/reader-feedback")
			? request.respond({
					status: 503,
					contentType: "application/json",
					body: JSON.stringify({ error: "Comparison feedback temporarily unavailable" })
				})
			: request.continue();
	page.on("request", fail);
	await clickText(page, "Send private suggestion");
	await browserText(page, "Comparison feedback temporarily unavailable");
	assert.match(await page.$eval('[name="feedback-message"]', (element) => element.value), /whole-grid storage/);
	page.off("request", fail);
	await page.setRequestInterception(false);
	for (const mode of ["light", "dark"]) {
		await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: mode }]);
		await page.waitForFunction(
			(mode) => document.documentElement.classList.contains("dark") === (mode === "dark"),
			{},
			mode
		);
		await page.evaluate(async () => {
			await new Promise(requestAnimationFrame);
			await Promise.all(
				document
					.getAnimations()
					.filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime))
					.map((animation) => animation.finished.catch(() => {}))
			);
		});
		await page.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
		assert.deepEqual(await page.evaluate(async () => (await window.axe.run()).violations), []);
	}
	for (const width of [1280, 390, 320]) {
		await page.setViewport({ width, height: 900 });
		assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
	}
	await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
	assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
	await page.evaluate(() => (document.documentElement.style.fontSize = ""));
	if (process.env.READER_FEEDBACK_SCREENSHOT_DIR)
		await (
			await page.$(".reader-feedback")
		).screenshot({ path: join(process.env.READER_FEEDBACK_SCREENSHOT_DIR, "comparison-feedback-mobile.png") });
	await clickText(page, "Send private suggestion");
	await browserText(page, "Thank you. Your feedback is in the private editorial queue.");
	const queue = (await api(`${path}&limit=1`, { cookie: adminCookie })).data;
	assert.equal(queue.pagination.total, 2);
	assert.equal(queue.pagination.hasMore, true);
	assert.notEqual(queue.rows[0]._id, (await api(`${path}&limit=1&page=2`, { cookie: adminCookie })).data.rows[0]._id);
	assert.doesNotMatch(
		JSON.stringify(await ReaderFeedback.find({ comparisonSlug: comparison.slug }).lean()),
		/must-not-be-copied|captchaToken|password|authorization|sourceIp|userAgent|session/
	);
	await browserLogin(page);
	await page.goto(`${base}/account/editorial/reader-feedback`, { waitUntil: "networkidle0" });
	await page.select('[name="comparison-filter"]', comparison.slug);
	await clickText(page, "Apply filters / reload");
	await browserText(page, "2 matching submissions.");
	assert.equal(await page.$$eval(".feedback-queue__card", (nodes) => nodes.length), 2);
	assert.ok(await page.$(`.feedback-queue__card a[href="/compare/${comparison.slug}"]`));
	await clickText(page, "Review feedback");
	await page.type('[name="review-note"]', "Check the system boundary against newer whole-grid evidence.");
	await clickText(page, "Save editorial review");
	await browserText(page, "Editorial priority saved.");
	const reviewed = await ReaderFeedback.findOne({ comparisonSlug: comparison.slug, status: "reviewing" }).lean();
	assert.equal(reviewed.revision, 1);
	assert.equal(reviewed.reviews.length, 1);
	assert.equal(JSON.stringify(evidenceComparisons), before, "Feedback must not change comparison findings.");
	assert.deepEqual(errors, []);
	await page.close();
	console.log(
		"comparison feedback: canonical target, privacy, deduplication, retained failed form, source history, admin filtering/triage and responsive accessibility passed"
	);
}
