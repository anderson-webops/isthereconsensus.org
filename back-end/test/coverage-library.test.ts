import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { z } from "zod";
import { ReaderLibrary } from "../src/models/schemas/ReaderLibrary.js";
import { replacementCoverageRequests, selectedCoverageUpdates } from "../src/utils/coverageLibrary.js";
import { coverageEventId, meaningfulCoverageProgress, publicCoverageRequest } from "../src/utils/coverageRoadmap.js";
import { decodeReaderUpdateCursor, encodeReaderUpdateCursor } from "../src/utils/readerUpdates.js";

const requestId = "a".repeat(24);
const now = new Date("2026-10-04T12:00:00Z");
const start = new Date("2026-07-06T12:00:00Z");
const record = {
	_id: requestId,
	visibility: "public",
	title: "A separately approved public research question",
	summary: "A bounded, deliberately nonsensitive question scope for readers.",
	status: "researching",
	topicId: null,
	claimId: null,
	publicHistory: [{ date: now, status: "researching", summary: "Original approved research progress." }]
};

describe("requested-question library", () => {
	it("preserves omitted legacy follows while honoring an explicit clear", async () => {
		assert.deepEqual(replacementCoverageRequests(undefined, [requestId]), [requestId]);
		assert.deepEqual(replacementCoverageRequests([], [requestId]), []);
		const library = new ReaderLibrary({ _id: `user:${requestId}`, revision: 1 });
		assert.deepEqual([...library.followedCoverageRequestIds], []);
		await library.validate();
		for (const values of [[requestId, requestId], ["private-title"], Array.from({ length: 101 }, (_, index) => index.toString(16).padStart(24, "0"))]) {
			library.followedCoverageRequestIds = values;
			await assert.rejects(library.validate(), /followedCoverageRequestIds/);
		}
	});
	it("derives restart and trimming-stable legacy IDs without private audit inputs", () => {
		const event = record.publicHistory[0]!;
		const identifier = coverageEventId(requestId, event);
		assert.ok(z.uuid().safeParse(identifier).success);
		assert.equal(coverageEventId(requestId, { ...event }), identifier);
		assert.notEqual(coverageEventId("b".repeat(24), event), identifier);
		assert.notEqual(coverageEventId(requestId, { ...event, summary: "Different approved explanation." }), identifier);
		assert.equal(coverageEventId(requestId, { ...event, id: "a0bfceaa-1234-4567-89ab-123456789abc" }), "a0bfceaa-1234-4567-89ab-123456789abc");
		const result = publicCoverageRequest({ ...record, audit: [{ note: "PRIVATE" }] } as typeof record, null, null);
		assert.equal(result.history[0]?.id, identifier);
		assert.doesNotMatch(JSON.stringify(result), /PRIVATE|audit/);
	});
	it("does not announce an unchanged public save or private-note edit", () => {
		assert.equal(meaningfulCoverageProgress(record, record, record.publicHistory[0]!.summary), false);
		assert.equal(meaningfulCoverageProgress({ ...record, visibility: "withdrawn" }, record, record.publicHistory[0]!.summary), true);
		assert.equal(meaningfulCoverageProgress(record, { ...record, status: "published" }, record.publicHistory[0]!.summary), true);
		assert.equal(meaningfulCoverageProgress(record, record, "New approved progress explanation."), true);
	});
	it("keeps editorial progress distinct from science and hides unavailable answer announcements", () => {
		const row = publicCoverageRequest({ ...record, status: "published", publicHistory: [...record.publicHistory, { date: now, status: "published", summary: "A reviewed answer is now linked." }] }, null, null);
		const unavailable = selectedCoverageUpdates([row], now, start);
		assert.equal(unavailable.length, 1);
		assert.equal(unavailable[0]?.update.kind, "coverage_progress");
		assert.equal(unavailable[0]?.update.bottomLineImpact, "not_assessed");
		const ready = publicCoverageRequest({ ...record, status: "published", publicHistory: row.history }, null, { title: "An existing sourced review", slug: "review", topic: { slug: "topic" } });
		assert.equal(selectedCoverageUpdates([ready], now, start).filter(entry => entry.update.kind === "requested_answer").length, 1);
	});
	it("uses the existing fixed-window UUID cursor ordering without duplicates", () => {
		const rows = Array.from({ length: 65 }, (_, index) => publicCoverageRequest({ ...record, _id: index.toString(16).padStart(24, "0") }, null, null));
		const ordered = selectedCoverageUpdates(rows, now, start);
		const first = ordered.slice(0, 30);
		const last = first.at(-1)!;
		const cursor = decodeReaderUpdateCursor(encodeReaderUpdateCursor(last.update.date, last.update.id, now), now);
		const remainder = selectedCoverageUpdates(rows, now, start, cursor);
		assert.deepEqual([...first, ...remainder].map(row => row.update.id), ordered.map(row => row.update.id));
		assert.equal(new Set(ordered.map(row => row.update.id)).size, 65);
		assert.deepEqual(selectedCoverageUpdates(rows, new Date(now.getTime() - 1), start), []);
		assert.deepEqual(selectedCoverageUpdates(rows, now, new Date(now.getTime() + 1)), []);
	});
});
