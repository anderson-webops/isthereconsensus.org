import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { Claim } from "../src/models/schemas/Claim.js";
import {
	decodeReaderUpdateCursor,
	encodeReaderUpdateCursor,
	planReaderPublication
} from "../src/utils/readerUpdates.js";

describe("reader publication announcements", () => {
	const now = new Date("2026-09-11T12:00:00Z");
	const base = {
		previouslyPublished: true,
		kind: undefined,
		bottomLineImpact: undefined,
		summary: "A newly reviewed synthesis changes the conclusion.",
		now
	};
	it("records the actual new publication time, not an editorial review date", () => {
		const result = planReaderPublication({ ...base, previouslyPublished: false });
		assert.ok(result.ok && result.update);
		assert.equal(result.update.kind, "new_review");
		assert.equal(result.update.bottomLineImpact, "new");
		assert.equal(result.update.date, now);
	});
	it("requires explicit significance and bottom-line impact for republications", () => {
		assert.equal(planReaderPublication(base).ok, false);
		assert.equal(planReaderPublication({ ...base, kind: "evidence_update" }).ok, false);
		assert.equal(planReaderPublication({ ...base, kind: "correction", bottomLineImpact: "guaranteed" }).ok, false);
		assert.equal(
			planReaderPublication({ ...base, kind: "evidence_update", bottomLineImpact: "changed", summary: "" }).ok,
			false
		);
	});
	it("does not announce cosmetic and administrative republications", () => {
		assert.deepEqual(planReaderPublication({ ...base, kind: "none" }), { ok: true });
	});
	it("records corrections and evidence updates without private snapshot or actor fields", () => {
		for (const kind of ["correction", "evidence_update"]) {
			const result = planReaderPublication({ ...base, kind, bottomLineImpact: "unchanged" });
			assert.ok(result.ok && result.update);
			assert.deepEqual(Object.keys(result.update).sort(), ["bottomLineImpact", "date", "id", "kind", "summary"]);
			assert.equal(result.update.kind, kind);
			assert.equal(result.update.bottomLineImpact, "unchanged");
		}
	});
	it("does not backfill fresh announcements from legacy change logs", () => {
		const claim = new Claim({ changeLog: [{ date: now, kind: "publication", summary: "Legacy publication" }] });
		assert.deepEqual(
			claim.readerUpdates?.map(value => value.id),
			[]
		);
	});
	it("keeps announcements within the approved publication save, not draft/review paths", () => {
		const source = readFileSync(new URL("../src/server.ts", import.meta.url), "utf8");
		const publish = source
			.split("api.post(\"/editorial/claims/:id/publish\"")[1]
			.split("api.post(\"/editorial/claims/:id/review\"")[0];
		assert.match(publish, /requireAdmin/);
		assert.match(
			publish,
			/if \(!readiness.isReady\)[\s\S]+return res.status\(422\)[\s\S]+claim.readerUpdates =[\s\S]+await claim.save\(\)/
		);
		assert.equal((source.match(/claim\.readerUpdates =/g) || []).length, 1);
		assert.equal(Claim.schema.options.optimisticConcurrency, true);
	});
	it("round-trips a bounded cursor and rejects malformed or future cursors", () => {
		const id = "a697f757-9c57-45f7-9fd0-dc76d61a0368";
		const cursor = encodeReaderUpdateCursor(now, id, now);
		assert.deepEqual(decodeReaderUpdateCursor(cursor, now), {
			before: now.toISOString(),
			id,
			asOf: now.toISOString()
		});
		assert.throws(() => decodeReaderUpdateCursor("x".repeat(401), now));
		assert.throws(() => decodeReaderUpdateCursor("__proto__", now));
		assert.throws(() => decodeReaderUpdateCursor(cursor, new Date(now.getTime() - 1)));
	});
});
