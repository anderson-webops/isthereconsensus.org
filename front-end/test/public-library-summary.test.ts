import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCountLabel } from "../src/utils/format-count";
import { formatPublicCountLabel, formatPublicLibrarySummary } from "../src/utils/public-library-summary";

const fallback = "Browse reviewed claims by topic";
const expanded = "Browse 1000+ reviewed claims by topic";

describe("public whole-library quantity wording", () => {
	it("uses nonnumeric wording for absent, empty and below-threshold public catalogs", () => {
		assert.equal(formatPublicLibrarySummary(undefined), fallback);
		assert.equal(formatPublicLibrarySummary(null), fallback);
		assert.equal(formatPublicLibrarySummary([]), fallback);
		for (const claimCount of [0, 1, 800, 999]) {
			assert.equal(formatPublicLibrarySummary([
				{ slug: "topic", claimCount }
			]), fallback);
		}
	});

	it("advances the summary only at each thousand-review boundary", () => {
		for (const [claimCount, lowerBound] of [
			[1000, 1000],
			[1001, 1000],
			[1999, 1000],
			[2000, 2000],
			[2999, 2000],
			[3000, 3000],
			[25001, 25000]
		]) {
			assert.equal(
				formatPublicLibrarySummary([
					{ slug: "topic", claimCount }
				]),
				`Browse ${lowerBound}+ reviewed claims by topic`
			);
		}
	});

	it("floors whole-library totals in thousands of reviews and groups of five topics", () => {
		for (const [count, expected] of [
			[999, "999 reviews"],
			[1000, "1000+ reviews"],
			[1001, "1000+ reviews"],
			[1999, "1000+ reviews"],
			[2000, "2000+ reviews"],
			[2999, "2000+ reviews"],
			[3000, "3000+ reviews"]
		] as const) {
			assert.equal(formatPublicCountLabel(count, "review"), expected);
		}
		for (const [count, expected] of [
			[4, "4 topics"],
			[5, "5+ topics"],
			[34, "30+ topics"],
			[35, "35+ topics"],
			[36, "35+ topics"],
			[39, "35+ topics"],
			[40, "40+ topics"],
			[44, "40+ topics"],
			[45, "45+ topics"]
		] as const) {
			assert.equal(formatPublicCountLabel(count, "topic"), expected);
		}
	});

	it("does not invent totals for empty, singular or invalid catalogs", () => {
		for (const kind of ["review", "topic"] as const) {
			assert.equal(formatPublicCountLabel(0, kind), `0 ${kind}s`);
			assert.equal(formatPublicCountLabel(1, kind), `1 ${kind}`);
			for (const count of [
				-1,
				1.5,
				Number.NaN,
				Number.POSITIVE_INFINITY,
				Number.MAX_SAFE_INTEGER + 1
			]) {
				assert.equal(
					formatPublicCountLabel(count, kind),
					kind === "review"
						? "Reviews unavailable"
						: "Topics unavailable"
				);
			}
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
		assert.equal(formatPublicLibrarySummary([
			{ slug: "", claimCount: 1001 }
		]), fallback);
		assert.equal(formatPublicLibrarySummary([
			{ slug: " ", claimCount: 1001 }
		]), fallback);
	});

	it("leaves filtered results, individual sources and per-topic counts exact", () => {
		assert.equal(formatCountLabel(24, "claim review"), "24 claim reviews");
		assert.equal(formatCountLabel(3, "source"), "3 sources");
		assert.equal(formatCountLabel(36, "topic"), "36 topics");
	});
});
