import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { analyzeAskQuery, defaultAskKind, matchExplainers, matchMisconceptionModules } from "../src/utils/ask-flow";

describe("analyzeAskQuery", () => {
	it("flags loaded premise questions and offers neutral reframes", () => {
		const analysis = analyzeAskQuery("How do vaccines change your DNA?");

		assert.equal(analysis.looksLoaded, true);
		assert.equal(analysis.recommendedDestination, "claim");
		assert.ok(analysis.neutralReframes.some((entry) => /Is it true that/i.test(entry)));
	});

	it("detects definition-style questions and routes them to explainers", () => {
		const analysis = analyzeAskQuery("What is the difference between hazard and risk?");

		assert.equal(analysis.isDefinition, true);
		assert.equal(analysis.recommendedDestination, "explainer");
		assert.equal(defaultAskKind(analysis), "concept");
	});

	it("detects multi-question bundles", () => {
		const analysis = analyzeAskQuery("Is climate change real? Why does it happen? What should I read first?");

		assert.equal(analysis.hasMultipleQuestions, true);
		assert.ok(analysis.segments.length >= 2);
	});

	it("detects fertility-fear phrasing as a high-demand claim pattern", () => {
		const analysis = analyzeAskQuery("Do COVID vaccines cause infertility?");

		assert.equal(analysis.queryPattern, "fertility-fear");
		assert.equal(analysis.recommendedDestination, "claim");
	});

	it("routes preprint-style queries toward explainers", () => {
		const analysis = analyzeAskQuery("What does this new preprint actually show?");

		assert.equal(analysis.queryPattern, "study-or-preprint");
		assert.equal(analysis.recommendedDestination, "explainer");
	});
});

describe("local ask matches", () => {
	it("finds a matching explainer for hazard versus risk phrasing", () => {
		const matches = matchExplainers("What is the difference between hazard and risk?");

		assert.equal(matches[0]?.slug, "hazard-vs-risk-and-exposure");
	});

	it("finds a matching misconception module for one-study hype", () => {
		const matches = matchMisconceptionModules("A new study proves seed oils are poison");

		assert.equal(matches[0]?.slug, "one-study-doesnt-overturn-evidence");
	});
});
