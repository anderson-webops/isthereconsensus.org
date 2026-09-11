import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { defaultClaims } from "../../back-end/src/data/claims.js";
import { defaultTopics } from "../../back-end/src/data/topics.js";
import {
	comparisonForSlug,
	comparisonsForGuide,
	comparisonsForReview,
	comparisonsForTopic,
	evidenceComparisons
} from "../src/data/comparisons/index.js";
import { readingGuides } from "../src/data/reading-guides/index.js";
import { formatComparisonEstimate, resolveComparisonSelection } from "../src/utils/evidence-comparison.js";

const electricity = comparisonForSlug("electricity-emissions")!;
const safeId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const claimPaths = new Set(defaultClaims.map((claim) => `/consensus/${claim.topicSlug}/${claim.slug}`));
const topicSlugs = new Set(defaultTopics.map((topic) => topic.slug));

function uniqueIds(items: Array<{ id: string }>) {
	assert.ok(items.length > 0);
	assert.equal(new Set(items.map((item) => item.id)).size, items.length);
	for (const item of items) assert.match(item.id, safeId);
}

describe("practical evidence comparisons", () => {
	it("publishes only individually sourced definitions connected to real content", () => {
		assert.ok(evidenceComparisons.length > 0);
		assert.equal(new Set(evidenceComparisons.map((item) => item.slug)).size, evidenceComparisons.length);
		for (const comparison of evidenceComparisons) {
			assert.match(comparison.slug, safeId);
			assert.match(comparison.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
			assert.ok(Date.parse(comparison.checkedAt) <= Date.now());
			assert.ok(comparison.datasetLabel.length > 20);
			assert.ok(comparison.measureNote.length > 50);
			assert.ok(comparison.limitations.length >= 3);
			uniqueIds(comparison.options);
			uniqueIds(comparison.outcomes);
			uniqueIds(comparison.contexts);
			uniqueIds(comparison.sources);
			assert.ok(comparison.contexts.some((context) => !context.supportsEstimates));
			for (const context of comparison.contexts) assert.ok(context.explanation.length > 40);
			const sourceIds = new Set(comparison.sources.map((source) => source.id));
			const cited = new Set<string>();
			for (const outcome of comparison.outcomes) {
				assert.ok(outcome.unit.length > 0, "a measure needs an explicit shared unit");
				assert.ok(outcome.explanation.length > 40);
			}
			for (const option of comparison.options) {
				assert.ok(option.scope.length > 10, "population/technology scope must accompany figures");
				for (const [outcome, estimate] of Object.entries(option.estimates)) {
					assert.ok(comparison.outcomes.some((item) => item.id === outcome));
					assert.ok(Number.isFinite(estimate.value));
					assert.ok(["reported", "approximately", "less_than"].includes(estimate.qualifier));
					assert.ok(estimate.sourceIds.length > 0);
					assert.equal(new Set(estimate.sourceIds).size, estimate.sourceIds.length);
					for (const id of estimate.sourceIds) {
						assert.ok(sourceIds.has(id), `missing source ${id}`);
						cited.add(id);
					}
				}
			}
			for (const source of comparison.sources) {
				const url = new URL(source.url);
				assert.equal(url.protocol, "https:");
				assert.equal(url.username + url.password, "");
				assert.ok(source.locator.length > 10);
				assert.ok(source.note.length > 50);
				assert.ok(cited.has(source.id), "no decorative citations");
			}
			assert.ok(readingGuides.some((guide) => `/guides/${guide.slug}` === comparison.guidePath));
			assert.ok(comparisonsForGuide(comparison.guidePath).includes(comparison));
			for (const topic of comparison.topics) {
				assert.ok(topicSlugs.has(topic), `unknown topic ${topic}`);
				assert.ok(comparisonsForTopic(topic).includes(comparison));
			}
			for (const review of comparison.reviews) {
				assert.ok(claimPaths.has(review.path), `unknown review ${review.path}`);
				assert.ok(comparisonsForReview(review.path).includes(comparison));
			}
		}
	});

	it("preserves the visually checked Table 1 medians and qualifications, with no derived scores", () => {
		assert.deepEqual(
			electricity.options.map((option) => [
				option.id,
				formatComparisonEstimate(option.estimates.lifecycle!),
				formatComparisonEstimate(option.estimates.upstream!)
			]),
			[
				["coal", "1,001", "<5"],
				["gas", "486", "0.8"],
				["solar", "43", "≈28"],
				["wind", "13", "12"],
				["nuclear", "13", "2"]
			]
		);
		assert.match(electricity.datasetLabel, /2021/);
		assert.match(electricity.sources[0]!.note, /not new measurements in 2026/);
		assert.match(electricity.sources[0]!.note, /not individually re-reviewed/);
		assert.match(electricity.limitations.join(" "), /different study pools/);
		assert.match(electricity.limitations.join(" "), /no uncertainty interval/);
		assert.ok(
			electricity.options.every((option) =>
				Object.values(option.estimates).every((estimate) => estimate.value >= 0)
			)
		);
		assert.deepEqual(Object.keys(electricity.options[0]!.estimates), ["lifecycle", "upstream"]);
	});

	it("does not round away the source's reported precision or qualifiers", () => {
		assert.equal(formatComparisonEstimate({ value: 0.00012, qualifier: "reported", sourceIds: [] }), "0.00012");
		assert.equal(formatComparisonEstimate({ value: 0, qualifier: "reported", sourceIds: [] }), "0");
	});

	it("defaults to the complete directory of options", () => {
		const selection = resolveComparisonSelection(electricity, {});
		assert.equal(selection.outcome.id, "lifecycle");
		assert.equal(selection.context.id, "generation");
		assert.equal(selection.options.length, 5);
	});

	it("supports shared selections, removes duplicates and keeps a stable catalog order", () => {
		const selection = resolveComparisonSelection(electricity, {
			outcome: "upstream",
			context: "whole-grid",
			options: "solar,coal,solar,unknown"
		});
		assert.equal(selection.outcome.id, "upstream");
		assert.equal(selection.context.supportsEstimates, false);
		assert.deepEqual(
			selection.options.map((option) => option.id),
			["coal", "solar"]
		);
	});

	it("distinguishes an explicit empty selection from unknown or malformed public URLs", () => {
		assert.deepEqual(resolveComparisonSelection(electricity, { options: "" }).options, []);
		for (const query of [
			{ options: "unknown", outcome: "__proto__", context: "constructor" },
			{ options: ["coal", "solar"], outcome: ["upstream"], context: ["whole-grid"] },
			{ options: null },
			{ options: "all" }
		]) {
			const result = resolveComparisonSelection(electricity, query);
			assert.equal(result.options.length, 5);
			assert.equal(result.outcome.id, "lifecycle");
			assert.equal(result.context.id, "generation");
		}
	});

	it("rejects unknown/prototype slugs without arbitrary dynamic imports", () => {
		for (const slug of ["__proto__", "constructor", "toString", "../../account", "unknown"])
			assert.equal(comparisonForSlug(slug), undefined);
		assert.deepEqual(comparisonsForReview("unknown"), []);
		assert.deepEqual(comparisonsForTopic("unknown"), []);
		assert.deepEqual(comparisonsForGuide("unknown"), []);
	});

	it("includes static discovery and every pilot state in accessibility coverage", () => {
		const sitemap = readFileSync(new URL("../server/routes/sitemap.xml.ts", import.meta.url), "utf8");
		assert.match(sitemap, /const comparisonRoutes = evidenceComparisons\.map/);
		assert.match(sitemap, /\.\.\.comparisonRoutes/);
		const a11y = readFileSync(new URL("../../scripts/a11y-smoke.mjs", import.meta.url), "utf8");
		for (const route of [
			"/compare",
			"/compare/electricity-emissions",
			"/compare/electricity-emissions?outcome=upstream",
			"/compare/electricity-emissions?context=whole-grid",
			"/compare/electricity-emissions?options="
		])
			assert.ok(a11y.includes(`"${route}"`));
	});
});
