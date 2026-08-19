import type { SearchClaimMatch, SearchTopicMatch } from "../src/types/board.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveHomeSearchRoute } from "../src/utils/search-routing.js";

function claim(overrides: Partial<SearchClaimMatch> = {}): SearchClaimMatch {
	return {
		_id: "claim-1",
		bottomLine: "A reviewed answer.",
		confidenceScore: 90,
		consensusBand: "strong",
		slug: "reviewed-claim",
		status: "published",
		title: "Reviewed claim",
		topic: {
			_id: "topic-1",
			description: "Topic",
			slug: "science",
			title: "Science"
		},
		...overrides
	};
}

function topic(overrides: Partial<SearchTopicMatch> = {}): SearchTopicMatch {
	return {
		_id: "topic-1",
		description: "Topic",
		slug: "science",
		title: "Science",
		...overrides
	};
}

describe("home search routing", () => {
	it("opens one exact claim title directly", () => {
		const route = resolveHomeSearchRoute({
			claims: [claim({ matchStrength: "exact" })],
			preferExplainer: false,
			query: "Reviewed claim",
			topics: []
		});

		assert.deepEqual(route, { path: "/consensus/science/reviewed-claim" });
	});

	it("keeps ambiguous related matches as a filtered choice", () => {
		const route = resolveHomeSearchRoute({
			claims: [claim({ matchStrength: "related" }), claim({ _id: "claim-2", slug: "another" })],
			preferExplainer: false,
			query: "vaccines",
			topics: [topic({ matchStrength: "related" })]
		});

		assert.deepEqual(route, { path: "/consensus", query: { q: "vaccines" } });
	});

	it("sends a genuine no-match to Ask with the question preserved", () => {
		const route = resolveHomeSearchRoute({
			claims: [],
			preferExplainer: false,
			query: "penguins dream in color",
			topics: []
		});

		assert.deepEqual(route, {
			path: "/ask",
			query: { question: "penguins dream in color" }
		});
	});
});
