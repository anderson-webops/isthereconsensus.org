import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { seedClaimFields } from "../back-end/dist/data/seedClaims.js";
import { Admin } from "../back-end/dist/models/schemas/Admin.js";
import { Claim } from "../back-end/dist/models/schemas/Claim.js";
import { ClaimRevision } from "../back-end/dist/models/schemas/ClaimRevision.js";
import { ClaimSource } from "../back-end/dist/models/schemas/ClaimSource.js";
import { Topic } from "../back-end/dist/models/schemas/Topic.js";
import { registeredRefreshes } from "../back-end/dist/utils/claimRefreshPromotion.js";
import { normalizeDoi } from "../back-end/dist/utils/sourceIntegrity.js";

function semantic(value) {
	return JSON.parse(JSON.stringify(value, (key, item) => (key === "_id" ? undefined : item)));
}

function identity(source) {
	return normalizeDoi(source.doi) || source.pmid || source.pmcid || new URL(source.url).href;
}

export async function checkEditorialCitations({ api, browser, base, review, adminCookie, userCookie }) {
	assert.match(base, /^http:\/\/127\.0\.0\.1:/);
	assert.match(mongoose.connection.name, /^reader_library_smoke_[a-f\d]{32}$/);
	assert.equal(registeredRefreshes.length, 20);
	const admin = await Admin.findOne({ email: "editor@example.test" }).lean();
	assert.ok(admin);
	const unrelated = await Claim.findById(review._id).lean();
	const unrelatedSources = await ClaimSource.find({ claim: review._id }).sort({ _id: 1 }).lean();
	const privateNote = `Private citation fixture ${randomUUID()}`;
	const context = await browser.createBrowserContext();
	const page = await context.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	let legacyCount = 0;
	let noticeCount = 0;
	let addedCount = 0;
	try {
		for (const { before, after } of registeredRefreshes) {
			const topic = await Topic.findOne({ slug: before.topicSlug }).lean();
			assert.ok(topic);
			const slug = `legacy-citation-${randomUUID()}`;
			const oldPublishedAt = new Date("2026-01-01T00:00:00.000Z");
			const claim = await Claim.create({
				...seedClaimFields(before),
				topic: topic._id,
				slug,
				status: "published",
				publishedAt: oldPublishedAt,
				lastReviewedAt: oldPublishedAt,
				reviewDateBasis: "unspecified"
			});
			claim.evidenceLandscape.workflow.status = "approved";
			claim.evidenceLandscape.workflow.approvedById = admin._id;
			await claim.save();
			const sources = await ClaimSource.insertMany(
				before.sources.map((source) => ({ ...source, claim: claim._id }))
			);
			assert.ok(sources.every((source) => source.statusSources.includes("Crossref")));
			const existing = new Map(sources.map((source) => [identity(source), source]));
			assert.equal(existing.size, sources.length);
			for (const source of sources) {
				source.evidenceProfile.reviewer.reviewedById = new mongoose.Types.ObjectId();
				source.evidenceProfile.reviewer.reviewedAt = oldPublishedAt;
				source.evidenceProfile.reviewer.notes = privateNote;
				await source.save();
			}
			const path = `/editorial/claims/${claim._id}`;
			const write = (suffix, body, options = {}) =>
				api(`${path}${suffix}`, { method: "PATCH", cookie: adminCookie, body, retryRateLimit: true, ...options });
			const publicPath = `/topics/${topic.slug}/claims/${slug}`;
			await write(`/sources/${sources[0]._id}`, { statusSources: sources[0].statusSources }, { status: 403 });
			await write("/request-update", { revisionNote: "Legacy citation fixture rehearsal" }, { method: "POST" });
			await api(publicPath, { status: 404 });
			if (legacyCount === 0) {
				const sourcePath = `/sources/${sources[0]._id}`;
				const beforeFailure = await ClaimSource.findById(sources[0]._id).lean();
				const claimBeforeFailure = await Claim.findById(claim._id).lean();
				const revisionCount = await ClaimRevision.countDocuments({ claim: claim._id });
				for (const cookie of [undefined, userCookie]) {
					await write(sourcePath, { statusSources: sources[0].statusSources }, { cookie, status: 403 });
				}
				for (const statusSources of [
					["Invented provenance"],
					["javascript:alert(1)"],
					["https://user:secret@example.test"],
					null,
					Array.from({ length: 7 }, (_, index) => `https://example.test/notice/${index}`)
				]) {
					await write(sourcePath, { title: "Must not persist", statusSources }, { status: 400 });
				}
				await write(sourcePath, { url: "Crossref" }, { status: 400 });
				await write(
					"/sources",
					{ ...before.sources[0], statusSources: ["Crossref"] },
					{ method: "POST", status: 400 }
				);
				assert.deepEqual(await ClaimSource.findById(sources[0]._id).lean(), beforeFailure);
				assert.deepEqual(await Claim.findById(claim._id).lean(), claimBeforeFailure);
				assert.equal(await ClaimRevision.countDocuments({ claim: claim._id }), revisionCount);
				assert.equal(await ClaimSource.countDocuments({ claim: claim._id }), sources.length);
				await write(sourcePath, { note: before.sources[0].note });
				assert.deepEqual(
					(await ClaimSource.findById(sources[0]._id).lean()).statusSources,
					beforeFailure.statusSources
				);
			}
			const expectedSources = [];
			for (const proposed of after.sources) {
				const source = existing.get(identity(proposed));
				const body = {
					...proposed,
					statusSources: proposed.statusSources ?? []
				};
				if (source) {
					const labels = source.statusSources.filter((value) => !/^https?:\/\//.test(value));
					assert.ok(labels.length > 0);
					const expected = [...new Set([...labels, ...body.statusSources])];
					if (body.statusSources.some((value) => !source.statusSources.includes(value))) noticeCount++;
					if (noticeCount !== 1) body.statusSources = [...labels, ...body.statusSources];
					const response = await write(`/sources/${source._id}`, body);
					assert.equal(response.data.source._id, String(source._id));
					assert.deepEqual(response.data.source.statusSources, expected);
					const saved = await ClaimSource.findById(source._id).lean();
					assert.equal(saved.evidenceProfile.reviewer.reviewedById, undefined);
					assert.equal(saved.evidenceProfile.reviewer.reviewedAt, undefined);
					assert.equal(saved.evidenceProfile.reviewer.notes, privateNote);
					const expectedProfile = semantic(source.evidenceProfile);
					delete expectedProfile.reviewer.reviewedById;
					delete expectedProfile.reviewer.reviewedAt;
					assert.deepEqual(semantic(saved.evidenceProfile), expectedProfile);
					expectedSources.push({ ...proposed, statusSources: expected, id: String(source._id) });
					legacyCount++;
				} else {
					const response = await write("/sources", body, { method: "POST", status: 201 });
					expectedSources.push({
						...proposed,
						statusSources: body.statusSources,
						id: response.data.source._id
					});
					addedCount++;
				}
			}
			const fields = seedClaimFields(after);
			delete fields.status;
			delete fields.changeLog;
			await write("", {
				...fields,
				slug,
				revisionNote: "Apply prepared fixture content through authenticated editing"
			});
			const edited = await Claim.findById(claim._id).lean();
			assert.equal(edited.evidenceLandscape.workflow.status, "draft");
			assert.equal(edited.evidenceLandscape.workflow.approvedById, undefined);
			assert.equal(edited.publishedAt.toISOString(), oldPublishedAt.toISOString());
			for (const [field, expected] of Object.entries(fields)) {
				assert.deepEqual(semantic(edited[field]), semantic(expected), `${before.slug}: ${field}`);
			}
			const started = new Date();
			await write(
				"/publish",
				{
					revisionNote: after.readerAnnouncement.summary,
					readerUpdateKind: "evidence_update",
					bottomLineImpact: "not_assessed"
				},
				{ method: "POST" }
			);
			const published = await Claim.findById(claim._id).lean();
			assert.equal(published.status, "published");
			assert.equal(published.reviewDateBasis, "editorial_review");
			assert.equal(String(published.reviewedBy), String(admin._id));
			assert.ok(published.lastReviewedAt >= started && published.lastReviewedAt <= new Date());
			assert.equal(published.nextReviewAt.getTime() - published.lastReviewedAt.getTime(), 180 * 86400000);
			assert.equal(published.publishedAt.toISOString(), oldPublishedAt.toISOString());
			assert.equal(published.readerUpdates.length, 1);
			assert.notEqual(published.readerUpdates[0].id, after.readerAnnouncement.id);
			assert.equal(published.readerUpdates[0].summary, after.readerAnnouncement.summary);
			assert.deepEqual(semantic(published.changeLog.slice(-claim.changeLog.length)), semantic(claim.changeLog));
			const revisions = await ClaimRevision.find({ claim: claim._id }).lean();
			assert.ok(revisions.length >= after.sources.length + 3);
			assert.ok(
				revisions.every((entry) => entry.editorModel === "Admin" && String(entry.editor) === String(admin._id))
			);
			const result = (await api(publicPath)).data;
			assert.equal(result.claim.bottomLine, after.bottomLine);
			assert.deepEqual(semantic(result.claim.evidenceSummaries), semantic(after.evidenceSummaries));
			assert.equal(result.claim.sources.length, expectedSources.length);
			for (const [index, expected] of expectedSources.entries()) {
				const actual = result.claim.sources[index];
				assert.equal(actual._id, expected.id);
				for (const field of ["title", "citationStatus", "note", "order", "statusSources"]) {
					assert.deepEqual(actual[field], expected[field], `${before.slug}: source ${index} ${field}`);
				}
			}
			assert.equal(JSON.stringify(result).includes(privateNote), false);
			await page.goto(`${base}/consensus/${topic.slug}/${slug}`, { waitUntil: "networkidle0" });
			assert.equal(
				await page.$eval("body", (node) => node.innerText.includes("Private citation fixture")),
				false
			);
			const labels = await page.$$eval(".source-row__integrity span", (nodes) =>
				nodes.map((node) => node.textContent)
			);
			assert.ok(labels.includes("Crossref"));
			const links = await page.$$eval(".source-row__integrity a", (nodes) => nodes.map((node) => node.href));
			for (const source of expectedSources) {
				for (const url of source.statusSources.filter((value) => /^https?:\/\//.test(value)))
					assert.ok(links.includes(new URL(url).href));
			}
		}
		assert.deepEqual({ legacyCount, noticeCount, addedCount }, { legacyCount: 60, noticeCount: 2, addedCount: 72 });
		assert.deepEqual(await Claim.findById(review._id).lean(), unrelated);
		assert.deepEqual(await ClaimSource.find({ claim: review._id }).sort({ _id: 1 }).lean(), unrelatedSources);
		assert.deepEqual(errors, []);
	} finally {
		await context.close();
	}
	console.log(
		"authenticated legacy citation workflow: 20 fixture publications, 60 retained citation IDs/labels, 2 notice additions, 72 new citations, validation/auth rejection without writes, private-state boundaries and public rendering passed"
	);
}
