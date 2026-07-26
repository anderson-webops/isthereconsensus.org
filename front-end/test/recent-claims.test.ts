import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { claimReviewTimestamp, selectRecentClaims } from "../src/utils/recent-claims";

interface TestClaim {
	_id: string;
	title: string;
	confidenceScore: number;
	sourceCount: number;
	lastReviewedAt?: string;
	publishedAt?: string;
	updatedAt?: string;
	topic: {
		slug: string;
	};
}

function claim(
	id: string,
	topic: string,
	date: string,
	{ confidenceScore = 80, sourceCount = 3, title = id } = {}
): TestClaim {
	return {
		_id: id,
		title,
		confidenceScore,
		sourceCount,
		lastReviewedAt: date,
		topic: { slug: topic }
	};
}

describe("selectRecentClaims", () => {
	it("orders candidates by review date and selects distinct topics before repeats", () => {
		const claims = [
			claim("health-new", "health", "2026-07-26"),
			claim("health-older", "health", "2026-07-25"),
			claim("climate", "climate", "2026-07-24"),
			claim("nutrition", "nutrition", "2026-07-23")
		];

		assert.deepEqual(
			selectRecentClaims(claims, 3).map((entry) => entry._id),
			["health-new", "climate", "nutrition"]
		);
	});

	it("fills remaining slots with the next newest claims when topics run out", () => {
		const claims = [
			claim("health-new", "health", "2026-07-26"),
			claim("health-older", "health", "2026-07-25"),
			claim("climate", "climate", "2026-07-24")
		];

		assert.deepEqual(
			selectRecentClaims(claims, 3).map((entry) => entry._id),
			["health-new", "climate", "health-older"]
		);
	});

	it("uses source depth, confidence, and title as deterministic same-day tie breakers", () => {
		const claims = [
			claim("low-sources", "health", "2026-07-26", { sourceCount: 2 }),
			claim("lower-confidence", "climate", "2026-07-26", { confidenceScore: 70, sourceCount: 5 }),
			claim("z-title", "nutrition", "2026-07-26", { confidenceScore: 90, sourceCount: 5, title: "Zeta" }),
			claim("a-title", "biology", "2026-07-26", { confidenceScore: 90, sourceCount: 5, title: "Alpha" })
		];

		assert.deepEqual(
			selectRecentClaims(claims, 4).map((entry) => entry._id),
			["a-title", "z-title", "lower-confidence", "low-sources"]
		);
	});

	it("deduplicates claims and handles missing, invalid, and non-positive limits", () => {
		const original = claim("one", "health", "invalid-date");
		const duplicate = { ...original, title: "Duplicate" };

		assert.equal(claimReviewTimestamp(original), 0);
		assert.equal(selectRecentClaims([original, duplicate], 5).length, 1);
		assert.deepEqual(selectRecentClaims([original], 0), []);
	});
});
