// Runs only inside the owned loopback database/server/browser harness.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import process from "node:process";
import mongoose from "mongoose";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { ReaderFeedback } from "../back-end/dist/models/schemas/ReaderFeedback.js";
import { SourceNoticeReview } from "../back-end/dist/models/schemas/SourceNoticeReview.js";
import { User } from "../back-end/dist/models/schemas/User.js";

export async function checkReviewPriority({
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
	assert.match(base, /^http:\/\/127\.0\.0\.1:/);
	assert.match(mongoose.connection.name, /^reader_library_smoke_/);
	await SourceNoticeReview.init();
	const prefix = `Maintenance ${randomUUID().slice(0, 8)}`;
	const now = new Date();
	const days = (offset) => new Date(now.getTime() + offset * 86400000);
	const basePath = "/admin/review-priority";
	const list = async (params = {}) =>
		(await api(`${basePath}?${new URLSearchParams({ query: prefix, ...params })}`, { cookie: adminCookie })).data;
	const get = async (id) => (await api(`${basePath}/${id}`, { cookie: adminCookie })).data;
	const write = (path, body, options = {}) => api(path, { method: "PATCH", cookie: adminCookie, body, ...options });
	const templates = await ClaimSource.find({ claim: review._id }).lean();
	const records = [];
	for (const label of ["Notice", "Due", "Evidence", "Routine", "Dates", "Requested"]) {
		const record = await Claim.create({
			...review,
			_id: new mongoose.Types.ObjectId(),
			topic: review.topic._id,
			title: `${prefix} ${label}`,
			slug: `maintenance-${randomUUID()}`,
			status: label === "Requested" ? "needs_update" : "published",
			lastReviewedAt: days(-2),
			reviewDateBasis: "editorial_review",
			searchCutoffAt: days(label === "Dates" ? -1 : -3),
			nextReviewAt: days(label === "Due" ? -1 : 7),
			readerUpdates: [],
			maintenance: undefined,
			__v: 0
		});
		records.push(record);
		await ClaimSource.insertMany(
			templates.map((source) => ({ ...source, _id: new mongoose.Types.ObjectId(), claim: record._id }))
		);
	}
	const [flagged, due, evidence, routine, dates, requested] = records;
	const source = await ClaimSource.findOne({ claim: flagged._id });
	source.citationStatus = "current";
	source.evidenceProfile.publicationIntegrity.retracted = true;
	source.statusSources = ["https://example.org/notice"];
	await source.save();
	const feedback = await ReaderFeedback.create({
		_id: "f".repeat(64),
		kind: "missing_evidence",
		claimId: evidence._id,
		linkedClaimId: evidence._id,
		message: "Private maintenance evidence request.",
		status: "new",
		expiresAt: days(10)
	});
	await ReaderFeedback.create({
		_id: "e".repeat(64),
		kind: "content_gap",
		linkedClaimId: evidence._id,
		title: "Linked evidence gap",
		message: "Private linked evidence request.",
		status: "planned",
		expiresAt: days(10)
	});
	await ReaderFeedback.create({
		_id: "d".repeat(64),
		kind: "missing_evidence",
		claimId: routine._id,
		message: "Expired maintenance evidence request.",
		status: "new",
		expiresAt: days(-1)
	});
	await ReaderFeedback.create({
		_id: "c".repeat(64),
		kind: "missing_evidence",
		claimId: routine._id,
		message: "Resolved maintenance evidence request.",
		status: "resolved",
		expiresAt: days(10)
	});
	await ReaderFeedback.create({
		_id: "b".repeat(64),
		kind: "usefulness",
		claimId: routine._id,
		helpful: false,
		status: "new",
		expiresAt: days(10)
	});
	for (const cookie of [undefined, userCookie]) {
		await api(basePath, { cookie, status: 403 });
		await api(`${basePath}/${due._id}`, { cookie, status: 403 });
		await write(`${basePath}/${due._id}/schedule`, {}, { cookie, status: 403 });
		await write(`${basePath}/${flagged._id}/sources/${source._id}`, {}, { cookie, status: 403 });
	}
	await User.updateOne({ email: "reader-a@example.test" }, { $set: { expertiseStatus: "verified" } });
	await api(basePath, { cookie: userCookie, status: 403 });
	const response = await api(basePath, { cookie: adminCookie });
	assert.match(response.response.headers.get("cache-control"), /private, no-store/);
	const queue = await list();
	assert.equal(queue.pagination.total, 5);
	assert.deepEqual(
		queue.rows.map((row) => row._id),
		[flagged, requested, due, evidence, dates].map((record) => String(record._id))
	);
	assert.equal(
		queue.rows.find((row) => row._id === String(evidence._id)).feedbackCount,
		2,
		"Direct plus linked identity must count one submission once"
	);
	assert.equal((await list({ reason: "all" })).pagination.total, 6);
	assert.equal((await list({ reason: "evidence_request" })).rows[0]._id, String(evidence._id));
	const pages = await Promise.all([1, 2, 3].map((page) => list({ page: String(page), limit: "2" })));
	assert.deepEqual(
		pages.map((page) => page.rows.length),
		[2, 2, 1]
	);
	assert.equal(new Set(pages.flatMap((page) => page.rows.map((row) => row._id))).size, 5);
	await api(`${basePath}?topicId[$ne]=x`, { cookie: adminCookie, status: 400 });
	assert.equal((await list({ query: ".*" })).pagination.total, 0, "Search input must be literal");
	assert.equal((await list({ reason: "dates_need_verification" })).pagination.total, 1);
	const linkedFeedback = (await api(`/admin/reader-feedback?reviewId=${evidence._id}`, { cookie: adminCookie })).data;
	assert.equal(linkedFeedback.pagination.total, 2);

	const before = await Claim.findById(due._id).lean();
	const staleEditor = await Claim.findById(due._id);
	let detail = await get(due._id);
	const scheduleBody = {
		revision: detail.schedule.revision,
		expectedNextReviewAt: detail.claim.nextReviewAt,
		nextReviewAt: days(14).toISOString(),
		note: "Private schedule reason: refresh the primary sources."
	};
	const schedulePath = `${basePath}/${due._id}/schedule`;
	const racing = await Promise.all(
		[1, 2].map(() =>
			fetch(`${base}/api${schedulePath}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", Cookie: adminCookie, Origin: base },
				body: JSON.stringify(scheduleBody)
			}).then((r) => r.status)
		)
	);
	assert.deepEqual(racing.sort(), [200, 409]);
	detail = await get(due._id);
	assert.equal(detail.schedule.revision, 1);
	assert.equal(detail.schedule.history.length, 1);
	assert.ok(detail.schedule.history[0].adminId);
	assert.ok(detail.schedule.history[0].adminName);
	const after = await Claim.findById(due._id).lean();
	for (const key of ["lastReviewedAt", "searchCutoffAt", "bottomLine", "status", "readerUpdates", "reviewDateBasis"])
		assert.deepEqual(after[key], before[key]);
	assert.equal(after.maintenance, undefined);
	staleEditor.editorSummary = "Stale editor must not overwrite scheduling.";
	await assert.rejects(staleEditor.save(), { name: "VersionError" });
	const publicClaim = (await api(`/topics/${review.topic.slug}/claims/${due.slug}`)).data;
	assert.doesNotMatch(JSON.stringify(publicClaim), /Private schedule|"maintenance":|"adminId":/);
	const expertClaim = (await api(`/editorial/claims/${due._id}`, { cookie: userCookie })).data;
	assert.doesNotMatch(JSON.stringify(expertClaim), /Private schedule|"maintenance":|"adminId":/);
	await User.updateOne({ email: "reader-a@example.test" }, { $set: { expertiseStatus: "none" } });
	await Claim.updateOne({ _id: due._id }, { $set: { nextReviewAt: days(15) } });
	await write(
		schedulePath,
		{ ...scheduleBody, revision: 1, expectedNextReviewAt: detail.claim.nextReviewAt },
		{ status: 409 }
	);
	detail = await get(due._id);
	await write(schedulePath, {
		...scheduleBody,
		revision: 1,
		expectedNextReviewAt: detail.claim.nextReviewAt,
		nextReviewAt: null
	});
	assert.equal((await get(due._id)).claim.nextReviewAt, null);
	await write(
		schedulePath,
		{ ...scheduleBody, revision: 2, expectedNextReviewAt: null, nextReviewAt: "2099-01-01" },
		{ status: 400 }
	);

	const sourcePath = `${basePath}/${flagged._id}/sources/${source._id}`;
	let sourceDetail = (await get(flagged._id)).sources[0];
	assert.equal(sourceDetail.addressed, false);
	const sourceBefore = await ClaimSource.findById(source._id).lean();
	const claimBefore = await Claim.findById(flagged._id).lean();
	let decision = {
		revision: sourceDetail.revision,
		fingerprint: sourceDetail.fingerprint,
		decision: "addressed",
		note: "Private source decision: assess the retained publication warning."
	};
	await write(sourcePath, { ...decision, fingerprint: "0".repeat(64) }, { status: 409 });
	await write(`${basePath}/${routine._id}/sources/${source._id}`, decision, { status: 404 });
	const noticeRace = await Promise.all(
		[1, 2].map(() =>
			fetch(`${base}/api${sourcePath}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", Cookie: adminCookie, Origin: base },
				body: JSON.stringify(decision)
			}).then((r) => r.status)
		)
	);
	assert.deepEqual(noticeRace.sort(), [200, 409]);
	await write(sourcePath, decision, { status: 409 });
	assert.equal((await list({ reason: "source_notice" })).pagination.total, 0);
	assert.deepEqual(await ClaimSource.findById(source._id).lean(), sourceBefore);
	assert.deepEqual(await Claim.findById(flagged._id).lean(), claimBefore);
	await ClaimSource.updateOne({ _id: source._id }, { $set: { citationCheckedAt: days(0) } });
	assert.equal((await list({ reason: "source_notice" })).pagination.total, 0);
	await ClaimSource.updateOne({ _id: source._id }, { $push: { statusSources: "https://example.org/new-notice" } });
	assert.equal((await list({ reason: "source_notice" })).pagination.total, 1);
	sourceDetail = (await get(flagged._id)).sources[0];
	assert.equal(sourceDetail.addressed, false);
	assert.equal(sourceDetail.revision, 1);
	await write(sourcePath, { ...decision, revision: 1 }, { status: 409 });
	decision = { ...decision, revision: 1, fingerprint: sourceDetail.fingerprint };
	await write(sourcePath, decision);
	await write(sourcePath, { ...decision, revision: 2, decision: "open" });
	assert.equal((await list({ reason: "source_notice" })).pagination.total, 1);
	assert.equal((await get(flagged._id)).sources[0].history.length, 3);
	await api(`/admin/reader-feedback/${feedback._id}`, {
		method: "PATCH",
		cookie: adminCookie,
		body: {
			revision: 0,
			status: "resolved",
			priority: 1,
			note: "Assessed the submitted evidence in the editorial workflow.",
			linkedClaimId: String(evidence._id),
			linkedTopicId: null
		}
	});
	assert.equal((await list({ reason: "evidence_request" })).rows[0].feedbackCount, 1);
	await restartBackend();
	assert.equal((await get(due._id)).schedule.revision, 2);
	assert.equal((await get(flagged._id)).sources[0].revision, 3);

	const page = await browser.newPage();
	page.setDefaultTimeout(15000);
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto(`${base}/account/editorial/review-priority`, { waitUntil: "networkidle0" });
	await browserLogin(page);
	await page.reload({ waitUntil: "networkidle0" });
	await page.type('input[type="search"]', prefix);
	await clickText(page, "Apply filters");
	await page.waitForFunction((prefix) => document.querySelector("tbody")?.textContent.includes(prefix), {}, prefix);
	const manageSelector = `button[aria-label="Manage review: ${flagged.title}"]`;
	// An existing row can already contain the filter text while the request is
	// still in flight. Its disabled button cannot open the detail yet.
	await page.waitForSelector(`${manageSelector}:not([disabled])`);
	await page.click(manageSelector);
	await browserText(page, "Needs assessment");
	assert.equal(await page.evaluate(() => document.activeElement?.id), "selected-review-title");
	assert.match(await page.$eval(".source-notice", (el) => el.textContent), /Retraction/);
	await page.type(".source-notice textarea", "Browser assessment: retain the warning while handling this notice.");
	await clickText(page, "Mark notice handled");
	await browserText(page, "Decision recorded.");
	await browserText(page, "Handled for the current notice");
	await page.type(".schedule-form textarea", "Browser schedule: review the underlying evidence next week.");
	await clickText(page, "Save schedule");
	await browserText(page, "Schedule saved.");
	await page.evaluate(() => document.querySelectorAll(".priority-detail details").forEach((el) => (el.open = true)));
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
		for (const width of [1280, 390, 320]) {
			await page.setViewport({ width, height: 900 });
			assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
			await page.addScriptTag({ path: createRequire(import.meta.url).resolve("axe-core/axe.min.js") });
			assert.deepEqual(await page.evaluate(async () => (await window.axe.run()).violations), []);
		}
	}
	await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
	assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
	await page.evaluate(() => (document.documentElement.style.fontSize = ""));
	if (process.env.REVIEW_PRIORITY_SCREENSHOT_DIR) {
		mkdirSync(process.env.REVIEW_PRIORITY_SCREENSHOT_DIR, { recursive: true });
		for (const width of [1280, 390]) {
			await page.setViewport({ width, height: 900 });
			await page.screenshot({
				path: join(process.env.REVIEW_PRIORITY_SCREENSHOT_DIR, `review-priority-${width}.png`),
				fullPage: true
			});
		}
	}
	await page.click(`a[href="/account/editorial/reader-feedback?reviewId=${flagged._id}"]`);
	await browserText(page, "Showing feedback submitted for or linked to this review.");
	await page.goto(`${base}/account/editorial/reader-feedback?reviewId=${evidence._id}`, {
		waitUntil: "networkidle0"
	});
	await browserText(page, "Private linked evidence request.");
	await page.goto(`${base}/account/editorial/review-priority`, { waitUntil: "networkidle0" });
	// A revoked session must clear private data rather than leave the last queue.
	await User.updateOne({ email: "reader-a@example.test" }, { $set: { expertiseStatus: "none" } });
	assert.equal(await page.evaluate(async () => (await fetch("/api/auth/logout", { method: "DELETE" })).status), 200);
	await clickText(page, "Apply filters");
	await browserText(page, "This queue is only available to admins.");
	assert.doesNotMatch(
		await page.$eval(".review-priority", (el) => el.textContent),
		/Private source decision|Private schedule reason|Maintenance [a-f0-9]/
	);
	assert.deepEqual(errors, []);
	await page.close();
	await ClaimSource.insertMany(
		Array.from({ length: 10 }, (_, index) => ({
			...sourceBefore,
			_id: new mongoose.Types.ObjectId(),
			claim: flagged._id,
			title: `Pagination notice ${index}`
		}))
	);
	const noticePages = await Promise.all(
		[1, 2].map(
			async (sourcePage) =>
				(await api(`${basePath}/${flagged._id}?sourcePage=${sourcePage}`, { cookie: adminCookie })).data
		)
	);
	assert.deepEqual(
		noticePages.map((value) => value.sources.length),
		[10, 1]
	);
	assert.ok(noticePages.every((value) => value.pagination.total === 11));
	assert.equal(new Set(noticePages.flatMap((value) => value.sources.map((entry) => entry._id))).size, 11);
	// Exercise retention through the actual mutation endpoints without a burst of 100 writes.
	const retentionSchedule = await get(due._id);
	const scheduleHistory = Array.from({ length: 100 }, (_, index) => ({
		date: retentionSchedule.schedule.history[0].date,
		adminId: retentionSchedule.schedule.history[0].adminId,
		previousAt: null,
		nextAt: null,
		note: `Retained schedule history ${index}`
	}));
	await Claim.updateOne({ _id: due._id }, { $set: { "maintenance.history": scheduleHistory } });
	await write(schedulePath, {
		revision: retentionSchedule.schedule.revision,
		expectedNextReviewAt: retentionSchedule.claim.nextReviewAt,
		nextReviewAt: null,
		note: "Newest schedule decision after the retention limit."
	});
	const retainedSchedule = (await get(due._id)).schedule.history;
	assert.equal(retainedSchedule.length, 100);
	assert.equal(retainedSchedule[0].note, "Retained schedule history 1");
	assert.equal(retainedSchedule.at(-1).note, "Newest schedule decision after the retention limit.");
	const retentionSource = await SourceNoticeReview.findById(source._id).lean();
	const sourceHistory = Array.from({ length: 100 }, (_, index) => ({
		...retentionSource.history[0],
		note: `Retained source history ${index}`
	}));
	await SourceNoticeReview.updateOne({ _id: source._id }, { $set: { history: sourceHistory } });
	await write(sourcePath, {
		revision: retentionSource.revision,
		fingerprint: retentionSource.fingerprint,
		decision: "open",
		note: "Newest source decision after the retention limit."
	});
	const retainedSource = (await SourceNoticeReview.findById(source._id).lean()).history;
	assert.equal(retainedSource.length, 100);
	assert.equal(retainedSource[0].note, "Retained source history 1");
	assert.equal(retainedSource.at(-1).note, "Newest source decision after the retention limit.");
	console.log(
		"review priority: real database pagination/ranking, permissions, private history, concurrent scheduling, exact-notice resolution/reopening, feedback linkage/expiry, restart persistence, real browser saves and six responsive accessibility checks passed"
	);
}
