import type { ComparisonAnnouncement, EvidenceComparison } from "../src/data/comparisons/types.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { evidenceComparisons } from "../src/data/comparisons/index.js";
import { compareUpdatePosition, comparisonHistory, selectedComparisonUpdates, validComparisonAnnouncement } from "../src/data/comparisons/updates.js";

const comparison = evidenceComparisons[0]!;
const event = comparison.readerUpdates![0]!;
const asOf = new Date("2026-09-12T00:00:00Z");
const start = new Date("2026-06-14T00:00:00Z");

describe("substantive comparison history", () => {
	it("requires stable dated events, correct impact and traceable sources across the public catalog", () => {
		const ids = new Set(defaultClaims.flatMap(claim => claim.readerAnnouncement ? [claim.readerAnnouncement.id] : []));
		for (const item of evidenceComparisons) {
			assert.ok(item.readerUpdates?.length && item.readerUpdates.length <= 100);
			for (const update of item.readerUpdates) {
				assert.ok(validComparisonAnnouncement(update, item), `${item.slug}: invalid announcement`);
				assert.equal(ids.has(update.id), false);
				ids.add(update.id);
			}
		}
	});
	it("does not manufacture activity from checked dates or permit invalid or future history", () => {
		assert.deepEqual(comparisonHistory({ ...comparison, readerUpdates: undefined }, asOf), []);
		const invalid = [
			null,
			{ ...event, id: "bad" },
			{ ...event, date: "2026-02-31T00:00:00Z" },
			{ ...event, date: Symbol("not-a-date") },
			{ ...event, id: "00000000-0000-0000-0000-000000000123" },
			{ ...event, date: "2026-09-13T00:00:00Z" },
			{ ...event, sourceIds: ["invented-source"] },
			{ ...event, sourceIds: [] },
			{ ...event, summary: "cosmetic" },
			{ ...event, kind: "formatting" },
			{ ...event, bottomLineImpact: "changed" }
		] as unknown as ComparisonAnnouncement[];
		assert.deepEqual(comparisonHistory({ ...comparison, readerUpdates: invalid }, asOf), []);
		assert.equal(comparisonHistory({ ...comparison, readerUpdates: [event, event] }, asOf).length, 1);
	});
	it("selects saved or followed comparisons once and omits unknown or withdrawn content", () => {
		const selected = selectedComparisonUpdates(evidenceComparisons, [comparison.slug, "withdrawn"], comparison.topics, asOf, start);
		assert.equal(selected.filter(row => row.comparison.slug === comparison.slug).length, 1);
		assert.deepEqual(selectedComparisonUpdates([], [comparison.slug], comparison.topics, asOf, start), []);
		assert.deepEqual(selectedComparisonUpdates(evidenceComparisons, [], [], asOf, start), []);
		assert.deepEqual(selectedComparisonUpdates(evidenceComparisons, [comparison.slug], [], new Date("2027-01-01"), new Date("2026-10-01")), []);
	});
	it("uses a stable descending date/UUID cursor for ties across multiple pages", () => {
		const fixture: EvidenceComparison = { ...comparison, readerUpdates: Array.from({ length: 65 }, (_, index) => ({
			...event,
			id: `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`
		})) };
		const rows = selectedComparisonUpdates([fixture], [fixture.slug], [], asOf, start);
		const first = rows.slice(0, 30);
		const last = first.at(-1)!.update;
		const rest = selectedComparisonUpdates([fixture], [fixture.slug], [], asOf, start, { before: last.date.toISOString(), id: last.id });
		assert.equal(first.length, 30);
		assert.equal(rest.length, 35);
		assert.equal(new Set([...first, ...rest].map(row => row.update.id)).size, 65);
		assert.ok(compareUpdatePosition(first[0]!.update, last) < 0);
		assert.deepEqual([...first, ...rest], rows);
	});
});
