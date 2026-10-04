import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import process from "node:process";
import { CoverageRequest } from "../back-end/dist/models/schemas/CoverageRequest.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ReaderFeedback } from "../back-end/dist/models/schemas/ReaderFeedback.js";

export async function checkCoverageRoadmap({ api, browser, base, review, userCookie, adminCookie, browserLogin, clickText, browserText, restartBackend }) {
	const originalClaim = await Claim.findById(review._id).lean();
	const suggestion = await ReaderFeedback.create({
		_id: "d".repeat(64), kind: "content_gap", title: "PRIVATE ORIGINAL QUESTION",
		message: "PRIVATE ORIGINAL MESSAGE WITH PERSONAL DETAILS", expiresAt: new Date(Date.now() + 86_400_000)
	});
	const draft = {
		title: "Does spaced practice improve long-term learning?",
		summary: "Compare retention after spaced and massed practice, with explicit limits for different subjects and learners.",
		status: "planned", topicId: null, claimId: null, privateNote: "PRIVATE AUDIT RATIONALE NOT FOR READERS",
		feedbackId: suggestion._id
	};
	for (const cookie of [undefined, userCookie]) {
		await api("/admin/coverage", { cookie, status: 403 });
		await api("/admin/coverage", { cookie, method: "POST", body: draft, status: 403 });
	}
	await api("/admin/coverage", { cookie: adminCookie, method: "POST", body: { ...draft, visibility: "public" }, status: 400 });
	await api("/admin/coverage", { cookie: adminCookie, method: "POST", body: { ...draft, feedbackId: "e".repeat(64) }, status: 422 });
	const created = (await api("/admin/coverage", { cookie: adminCookie, method: "POST", body: draft, status: 201 })).data.row;
	assert.equal(created.visibility, "draft");
	assert.equal(created.audit.length, 1);
	const requestId = created._id;
	assert.equal((await api("/coverage")).data.rows.length, 0);
	await api(`/coverage/${requestId}`, { status: 404 });
	await api("/coverage?visibility=draft", { status: 400 });
	const { feedbackId: _feedbackId, ...fields } = draft;
	const change = { ...fields, revision: 0, operation: "approve", publicSummaryApproved: true, publicUpdateSummary: "The question and scope have been approved for research." };
	await api(`/admin/coverage/${requestId}`, { cookie: userCookie, method: "PATCH", body: change, status: 403 });
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: { ...change, publicSummaryApproved: false }, status: 400 });
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: { ...change, publicUpdateSummary: "" }, status: 400 });
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: change });
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: change, status: 409 });
	const result = await api(`/coverage/${requestId}`);
	assert.match(result.response.headers.get("cache-control"), /private, no-store/);
	assert.doesNotMatch(JSON.stringify(result.data), /PRIVATE|feedbackId|adminId|audit|privateNote|sourceIp|captchaToken/);
	assert.equal(result.data.row.history.length, 1);
	assert.equal(result.data.row.answer, null);
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: { ...change, revision: 1, operation: "save", status: "published", claimId: "0".repeat(24) }, status: 422 });
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: { ...change, revision: 1, operation: "save", publicSummaryApproved: false }, status: 400 });
	const answerChange = { ...change, revision: 1, operation: "save", status: "published", claimId: String(review._id), topicId: String(review.topic._id), publicUpdateSummary: "A sourced reviewed answer is now available." };
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: answerChange });
	assert.equal((await api(`/coverage/${requestId}`)).data.row.answer.path, `/consensus/${review.topic.slug}/${review.slug}`);
	await Claim.updateOne({ _id: review._id }, { $set: { status: "draft" } });
	assert.equal((await api(`/coverage/${requestId}`)).data.row.answerUnavailable, true);
	assert.equal((await api(`/coverage/${requestId}`)).data.row.answer, null);
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: { ...answerChange, revision: 2, operation: "withdraw", publicSummaryApproved: false, publicUpdateSummary: "" } });
	await api(`/coverage/${requestId}`, { status: 404 });
	await Claim.updateOne({ _id: review._id }, { $set: { status: originalClaim.status } });
	await api(`/admin/coverage/${requestId}`, { cookie: adminCookie, method: "PATCH", body: { ...answerChange, revision: 3, operation: "approve" } });
	await restartBackend();
	assert.equal((await api(`/coverage/${requestId}`)).data.row.history.length, 3);
	const second = (await api("/admin/coverage", { cookie: adminCookie, method: "POST", body: { ...draft, title: "How can students study more effectively?" }, status: 201 })).data.row;
	await api(`/admin/coverage/${second._id}`, { cookie: adminCookie, method: "PATCH", body: { ...change, title: second.title, status: "researching" } });
	const firstPage = (await api("/coverage?limit=1")).data;
	const secondPage = (await api("/coverage?limit=1&page=2")).data;
	assert.equal(firstPage.pagination.total, 2);
	assert.equal(firstPage.pagination.hasMore, true);
	assert.notEqual(firstPage.rows[0]._id, secondPage.rows[0]._id);
	assert.equal((await api("/coverage?status=published")).data.rows.length, 1);
	await api("/coverage?limit=0", { status: 400 });
	const concurrent = await Promise.all([1, 2].map(() => fetch(`${base}/api/admin/coverage/${second._id}`, {
		method: "PATCH", headers: { "Content-Type": "application/json", Origin: base, Cookie: adminCookie },
		body: JSON.stringify({ ...change, title: second.title, revision: 1, operation: "save", status: "researching" })
	}).then(response => response.status)));
	assert.deepEqual(concurrent.sort(), [200, 409]);
	assert.deepEqual(await Claim.findById(review._id).lean(), { ...originalClaim, updatedAt: (await Claim.findById(review._id).lean()).updatedAt }, "Coverage changes must not modify scientific content.");
	assert.equal((await ReaderFeedback.findById(suggestion._id).lean()).message, "PRIVATE ORIGINAL MESSAGE WITH PERSONAL DETAILS");
	console.log("coverage API: private drafts, explicit approval, authenticated pagination, CAS races, withdrawal, answer readiness, restart persistence and private-field isolation passed");

	const context = await browser.createBrowserContext();
	const page = await context.newPage();
	const errors = [];
	page.on("pageerror", error => errors.push(error.message));
	await page.goto(`${base}/roadmap`, { waitUntil: "networkidle0" });
	assert.doesNotMatch(await page.evaluate(() => document.body.innerText), /PRIVATE/);
	await page.goto(`${base}/roadmap/${requestId}`, { waitUntil: "networkidle0" });
	await browserText(page, "Reviewed answer");
	assert.equal(await page.$eval(`a[href="/consensus/${review.topic.slug}/${review.slug}"]`, element => element.textContent.trim()), review.title);
	await page.goto(`${base}/account/editorial/roadmap`, { waitUntil: "networkidle0" });
	await browserText(page, "Only administrators");
	await browserLogin(page);
	await page.goto(`${base}/account/editorial/roadmap?feedbackId=${suggestion._id}`, { waitUntil: "networkidle0" });
	await page.waitForSelector('[name="coverage-title"]');
	await page.waitForFunction(() => !document.querySelector('[name="coverage-title"]').matches(":disabled"));
	assert.equal(await page.$eval('[name="coverage-title"]', element => element.value), "");
	assert.equal(await page.$eval('[name="coverage-summary"]', element => element.value), "");
	await page.type('[name="coverage-title"]', "How does retrieval practice affect later recall?");
	await page.type('[name="coverage-summary"]', "Compare testing and repeated reading for later recall, with clearly described limits for different learning settings.");
	await page.type('[name="coverage-private-note"]', "PRIVATE BROWSER MODERATION NOTE");
	await clickText(page, "Save private draft");
	await browserText(page, "Private draft saved.");
	const browserDraft = await CoverageRequest.findOne({ title: "How does retrieval practice affect later recall?" }).lean();
	await api(`/coverage/${browserDraft._id}`, { status: 404 });
	await page.type('[name="coverage-private-note"]', "Approve the separately written nonsensitive summary.");
	await clickText(page, "Approve for public roadmap");
	await browserText(page, "Explicitly approve the public summary");
	await page.type('[name="coverage-private-note"]', "Approved a separate, nonsensitive summary.");
	await page.type('[name="coverage-public-update"]', "The public research question has been approved.");
	await page.click('[name="coverage-public-approved"]');
	await clickText(page, "Approve for public roadmap");
	await browserText(page, "Approved summary saved on the public roadmap.");
	const browserPublic = (await api(`/coverage/${browserDraft._id}`)).data.row;
	assert.doesNotMatch(JSON.stringify(browserPublic), /PRIVATE|feedbackId|adminId/);
	const adminResponse = await fetch(`${base}/account/editorial/roadmap`);
	assert.match(adminResponse.headers.get("cache-control"), /private, no-store/);
	assert.match(adminResponse.headers.get("x-robots-tag"), /noindex/);
	await page.goto(`${base}/roadmap/${browserDraft._id}`, { waitUntil: "networkidle0" });
	if (process.env.READER_SMOKE_SCREENSHOT_DIR) {
		await page.setViewport({ width: 1280, height: 900 });
		await page.screenshot({ path: resolve(process.env.READER_SMOKE_SCREENSHOT_DIR, "roadmap-desktop.png"), fullPage: true });
		await page.setViewport({ width: 390, height: 900 });
		await page.screenshot({ path: resolve(process.env.READER_SMOKE_SCREENSHOT_DIR, "roadmap-mobile.png"), fullPage: true });
	}
	const require = createRequire(import.meta.url);
	for (const palette of ["light", "dark"]) {
		await page.evaluate(mode => localStorage.setItem("nuxt-color-mode", mode), palette);
		await page.reload({ waitUntil: "networkidle0" });
		await browserText(page, "How does retrieval practice affect later recall?");
		await page.evaluate(async () => {
			await new Promise(requestAnimationFrame);
			await Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {})));
		});
		await page.setViewport({ width: 320, height: 900 });
		await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
		assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
		await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
		const axe = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } })).violations);
		assert.deepEqual(axe.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), []);
	}
	assert.deepEqual(errors, []);
	await context.close();
	await CoverageRequest.deleteMany({ _id: { $in: [requestId, second._id, browserDraft._id] } });
	await ReaderFeedback.deleteOne({ _id: suggestion._id });
	console.log("coverage browser: public discovery, private empty inputs, required approval, linked answer, route privacy, mobile/enlarged-text and both-theme accessibility passed");
}
