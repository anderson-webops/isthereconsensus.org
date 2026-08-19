import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { analyzeSearchMatch, searchMatchIsDisplayable } from "../src/utils/searchMatch.js";

describe("search matching", () => {
	it("does not treat stop words or substrings as evidence of a match", () => {
		const unrelated = analyzeSearchMatch(
			"penguins dream in color",
			"Broad guidance with high headline churn in nutrition research"
		);

		assert.equal(unrelated.matchScore, 0);
		assert.equal(unrelated.matchStrength, "none");
		assert.equal(searchMatchIsDisplayable(unrelated), false);
	});

	it("normalizes common scientific word variants without substring matching", () => {
		const match = analyzeSearchMatch("vaccinations autism", "Do childhood vaccines cause autism?");

		assert.equal(match.matchStrength, "close");
		assert.ok(match.matchScore >= 80);
		assert.match(match.matchReason, /vaccine, autism/);
	});

	it("distinguishes exact wording from close and related matches", () => {
		assert.equal(
			analyzeSearchMatch("Are atoms physically real?", "Are atoms physically real?").matchStrength,
			"exact"
		);
		assert.equal(
			analyzeSearchMatch("atoms physically real", "Are atoms physically real rather than conveniences?")
				.matchStrength,
			"close"
		);
		assert.equal(analyzeSearchMatch("vaccines", "Routine childhood vaccination is effective").matchStrength, "related");
	});

	it("requires at least two meaningful terms from a multi-term query", () => {
		const weak = analyzeSearchMatch("penguins climate dreams", "Climate change and environmental risk");

		assert.equal(weak.matchScore, 0);
		assert.equal(searchMatchIsDisplayable(weak), false);
	});
});
