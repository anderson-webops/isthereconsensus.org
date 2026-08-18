import type { ClaimsResponse, ClaimSummary } from "../src/types/board.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { interleaveClaimsByTopic, loadCompleteClaimDirectory } from "../src/utils/claim-directory.js";

function claim(id: string, topicSlug: string, title: string, lastReviewedAt: string): ClaimSummary {
	return {
		_id: id,
		title,
		slug: id,
		consensusBand: "strong",
		confidenceScore: 90,
		bottomLine: `${title} bottom line`,
		lastReviewedAt,
		topic: {
			_id: topicSlug,
			title: topicSlug,
			slug: topicSlug
		}
	};
}

describe("interleaveClaimsByTopic", () => {
	it("shows a cross-topic first round in the preferred subject order", () => {
		const sourceClaims = [
			claim("health-old", "health", "Health old", "2026-01-01"),
			claim("climate", "climate", "Climate", "2026-01-02"),
			claim("nutrition", "nutrition", "Nutrition", "2026-01-03"),
			claim("health-new", "health", "Health new", "2026-01-04")
		];

		const ordered = interleaveClaimsByTopic(sourceClaims, ["health", "climate", "nutrition"]);

		assert.deepEqual(
			ordered.map((entry) => entry._id),
			["health-new", "climate", "nutrition", "health-old"]
		);
	});

	it("does not mutate the API response order", () => {
		const sourceClaims = [
			claim("older", "health", "Older", "2026-01-01"),
			claim("newer", "health", "Newer", "2026-01-02")
		];

		interleaveClaimsByTopic(sourceClaims, ["health"]);

		assert.deepEqual(
			sourceClaims.map((entry) => entry._id),
			["older", "newer"]
		);
	});
});

describe("loadCompleteClaimDirectory", () => {
	it("combines every API page so libraries larger than 500 remain searchable", async () => {
		const pages: Record<number, ClaimsResponse> = {
			1: {
				claims: [claim("first", "health", "First", "2026-01-01")],
				pagination: { page: 1, pageSize: 500, total: 501, totalPages: 2, hasMore: true }
			},
			2: {
				claims: [claim("last", "sleep", "Last", "2026-01-02")],
				pagination: { page: 2, pageSize: 500, total: 501, totalPages: 2, hasMore: false }
			}
		};
		const requestedPages: number[] = [];

		const result = await loadCompleteClaimDirectory(async (page, pageSize) => {
			requestedPages.push(page);
			assert.equal(pageSize, 500);
			const response = pages[page];
			assert.ok(response);
			return response;
		});

		assert.deepEqual(requestedPages, [1, 2]);
		assert.deepEqual(
			result.claims.map((entry) => entry._id),
			["first", "last"]
		);
		assert.equal(result.pagination?.total, 501);
		assert.equal(result.pagination?.hasMore, false);
	});
});
