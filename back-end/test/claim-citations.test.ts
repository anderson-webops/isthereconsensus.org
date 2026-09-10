import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildClaimCitationBundle } from "../src/utils/claimCitations.js";

describe("claim citation exports", () => {
	it("builds stable review and source citations without inventing missing authors", () => {
		const bundle = buildClaimCitationBundle({
			claim: {
				title: "Does caffeine lose effectiveness with daily use?",
				slug: "does-caffeine-lose-effectiveness-with-daily-use",
				lastReviewedAt: new Date("2026-09-10T12:00:00.000Z")
			},
			topic: {
				title: "Nutrition & diet",
				slug: "nutrition-and-diet"
			},
			sources: [
				{
					kind: "systematic_review",
					title: "Caffeine use and tolerance",
					publisher: "Example Journal",
					year: 2024,
					doi: "10.1000/example",
					note: "A synthesis of repeated-use studies."
				}
			],
			siteOrigin: "https://isthereconsensus.org/",
			generatedAt: new Date("2026-09-10T13:00:00.000Z")
		});

		assert.match(bundle.plainText, /Is There Consensus editorial team/u);
		assert.match(bundle.plainText, /Reviewed September 10, 2026/u);
		assert.doesNotMatch(bundle.plainText, /\?\.”/u);
		assert.equal(
			bundle.reviewUrl,
			"https://isthereconsensus.org/consensus/nutrition-and-diet/does-caffeine-lose-effectiveness-with-daily-use"
		);
		assert.match(bundle.markdown, /^# Does caffeine lose effectiveness with daily use\?/u);
		assert.match(bundle.markdown, /https:\/\/doi\.org\/10\.1000\/example/u);
		assert.match(bundle.bibtex, /@misc\{isthereconsensus_does_caffeine_lose_effectiveness_with_daily_use_2026/u);
		assert.match(bundle.bibtex, /doi = \{10\.1000\/example\}/u);
		assert.match(bundle.bibtex, /author = \{\{Is There Consensus editorial team\}\}/u);
		assert.match(bundle.ris, /TY {2}- ELEC/u);
		assert.match(bundle.ris, /DO {2}- 10\.1000\/example/u);
		assert.equal(bundle.cslJson.length, 2);
		assert.deepEqual(bundle.cslJson[0]?.author, [{ literal: "Is There Consensus editorial team" }]);
		assert.equal(JSON.stringify(bundle).includes("undefined"), false);
	});

	it("escapes BibTeX special characters without corrupting generated commands", () => {
		const bundle = buildClaimCitationBundle({
			claim: {
				title: "Dose_response & 50% confidence \\ check",
				slug: "bibtex-escaping",
				publishedAt: new Date("2026-09-10T12:00:00.000Z")
			},
			topic: { title: "Methods", slug: "methods" },
			sources: [],
			siteOrigin: "https://isthereconsensus.org"
		});

		assert.match(bundle.bibtex, /Dose\\_response \\& 50\\% confidence \\textbackslash\{\} check/u);
	});

	it("omits unsafe source links and escapes Markdown link labels", () => {
		const bundle = buildClaimCitationBundle({
			claim: {
				title: "Citation safety",
				slug: "citation-safety",
				publishedAt: new Date("2026-09-10T12:00:00.000Z")
			},
			topic: { title: "Methods", slug: "methods" },
			sources: [
				{
					kind: "context",
					title: "Source [label]",
					url: "javascript:alert(1)",
					pmid: "not-an-id"
				}
			],
			siteOrigin: "https://isthereconsensus.org"
		});

		assert.doesNotMatch(bundle.markdown, /javascript:/u);
		assert.ok(bundle.markdown.includes("Source \\[label\\]"));
	});
});
