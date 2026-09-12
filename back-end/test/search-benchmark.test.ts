import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";
import { coveredSearchQuestions, unsupportedSearchQuestions } from "./fixtures/search-benchmark.js";

const search = createClaimSearchIndex(defaultClaims);
const referenceDate = new Date("2026-09-11T00:00:00Z");

describe("reader search benchmark", () => {
	it("uses 100 distinct covered questions with valid reviewed destinations", () => {
		assert.equal(coveredSearchQuestions.length, 100);
		assert.equal(new Set(coveredSearchQuestions.map(([query]) => query)).size, 100);
		const catalog = new Map(defaultClaims.map(claim => [claim.slug, claim]));
		for (const [, slug] of coveredSearchQuestions) assert.ok(catalog.has(slug), `Missing expected review: ${slug}`);
		assert.ok(new Set(coveredSearchQuestions.map(([, slug]) => catalog.get(slug)?.topicSlug)).size >= 28);
	});

	it("places a relevant review in the top three for at least 90% of covered questions", (context) => {
		const failures = coveredSearchQuestions.filter(([query, slug]) =>
			!search(query, referenceDate).slice(0, 3).some(result => result.claim.slug === slug)
		);
		context.diagnostic(`${100 - failures.length}/100 covered questions matched in the top three`);
		for (const [query] of failures) context.diagnostic(`Miss: ${query}`);
		assert.ok(failures.length <= 10, `Top-three search misses: ${failures.map(([query]) => query).join("; ")}`);
	});

	it("does not manufacture matches for unsupported or mixed-subject questions", () => {
		assert.equal(unsupportedSearchQuestions.length, 20);
		for (const query of unsupportedSearchQuestions) {
			assert.deepEqual(search(query, referenceDate).map(row => row.claim.title), [], query);
		}
	});

	it("keeps incidental antibiotic and anxiety mentions out of caffeine results", () => {
		const matches = search("coffee stopped working", referenceDate);
		assert.equal(matches[0]?.claim.slug, "does-caffeine-become-less-effective-with-regular-daily-use");
		assert.ok(matches.every(row => !/antibiotic|benzodiazepine/u.test(row.claim.title.toLowerCase())));
	});

	it("gives an exact title priority and never interprets matching as agreement", () => {
		const claim = defaultClaims.find(row => row.slug === "do-childhood-vaccines-cause-autism")!;
		const result = search(claim.title, referenceDate)[0];
		assert.equal(result?.claim, claim);
		assert.equal(result?.match.matchStrength, "exact");
		assert.equal(result?.claim.bottomLine, claim.bottomLine);
		const counterClaim = { ...claim, bottomLine: "The evidence does not support this claim." };
		const counterResult = createClaimSearchIndex([counterClaim])(claim.title, referenceDate)[0];
		assert.equal(counterResult?.match.matchStrength, "exact");
		assert.equal(counterResult?.claim.bottomLine, counterClaim.bottomLine);
	});

	it("keeps every catalog title as its own first result within the API query limit", () => {
		for (const claim of defaultClaims) {
			assert.equal(search(claim.title.slice(0, 160), referenceDate)[0]?.claim.slug, claim.slug, claim.title);
		}
	});

	it("does not offer incidental matches for additional uncovered evidence and personal-dosing questions", () => {
		for (const query of [
			"coffee prevents dementia",
			"does creatine improve memory",
			"does tea lower blood pressure",
			"how much magnesium should my child take",
			"does caffeine help asthma",
			"can solar panels work underwater"
		]) assert.deepEqual(search(query, referenceDate), [], query);
	});
});
