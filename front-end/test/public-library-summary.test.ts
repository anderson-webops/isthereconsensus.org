import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCountLabel } from "../src/utils/format-count";
import { formatPublicLibrarySummary } from "../src/utils/public-library-summary";

const fallback = "Browse reviewed claims by topic";
const expanded = "Browse 1000+ reviewed claims by topic";

describe("public whole-library quantity wording", () => {
	it("uses nonnumeric wording for absent, empty and below-threshold public catalogs", () => {
		assert.equal(formatPublicLibrarySummary(undefined), fallback);
		assert.equal(formatPublicLibrarySummary(null), fallback);
		assert.equal(formatPublicLibrarySummary([]), fallback);
		for (const claimCount of [0, 1, 800, 999]) {
			assert.equal(formatPublicLibrarySummary([{ slug: "topic", claimCount }]), fallback);
		}
	});

	it("uses stable 1000+ wording only after the public catalog reaches the threshold", () => {
		for (const claimCount of [1000, 1001, 1002, 25000]) {
			assert.equal(formatPublicLibrarySummary([{ slug: "topic", claimCount }]), expanded);
		}
	});

	it("aggregates distinct public topics rather than requiring a thousand reviews in one topic", () => {
		assert.equal(
			formatPublicLibrarySummary([
				{ slug: "first", claimCount: 600 },
				{ slug: "second", claimCount: 401 },
				{ slug: "empty", claimCount: 0 }
			]),
			expanded
		);
		assert.equal(
			formatPublicLibrarySummary([
				{ slug: "first", claimCount: 600 },
				{ slug: "second", claimCount: 399 }
			]),
			fallback
		);
	});

	it("does not advertise coverage from incomplete or malformed counts", () => {
		for (const claimCount of [
			undefined,
			-1,
			1.5,
			Number.NaN,
			Number.POSITIVE_INFINITY,
			Number.MAX_SAFE_INTEGER + 1
		]) {
			assert.equal(
				formatPublicLibrarySummary([
					{ slug: "first", claimCount: 1001 },
					{ slug: "invalid", claimCount }
				]),
				fallback
			);
		}
		assert.equal(
			formatPublicLibrarySummary([
				{ slug: "first", claimCount: Number.MAX_SAFE_INTEGER },
				{ slug: "second", claimCount: 1 }
			]),
			fallback
		);
	});

	it("refuses duplicate and unidentified topics instead of inflating the total", () => {
		assert.equal(
			formatPublicLibrarySummary([
				{ slug: "topic", claimCount: 600 },
				{ slug: "topic", claimCount: 401 }
			]),
			fallback
		);
		assert.equal(formatPublicLibrarySummary([{ slug: "", claimCount: 1001 }]), fallback);
		assert.equal(formatPublicLibrarySummary([{ slug: " ", claimCount: 1001 }]), fallback);
	});

	it("leaves filtered results, individual sources and topic counts exact", () => {
		assert.equal(formatCountLabel(24, "claim review"), "24 claim reviews");
		assert.equal(formatCountLabel(3, "source"), "3 sources");
		assert.equal(formatCountLabel(36, "topic"), "36 topics");
	});
});
