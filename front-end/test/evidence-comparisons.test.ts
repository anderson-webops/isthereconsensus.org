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
import {
	createComparisonNavigation,
	estimateForSelection,
	formatComparisonEstimate,
	resolveComparisonSelection
} from "../src/utils/evidence-comparison.js";

const electricity = comparisonForSlug("electricity-emissions")!;
const caffeine = comparisonForSlug("caffeine-dose-and-sleep")!;
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
			assert.ok(comparison.resultNote.length > 30);
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
				const estimateGroups = [option.estimates, ...Object.values(option.estimatesByContext || {})];
				for (const contextId of Object.keys(option.estimatesByContext || {})) {
					assert.ok(
						comparison.contexts.some((context) => context.id === contextId && context.supportsEstimates)
					);
				}
				for (const [outcome, estimate] of estimateGroups.flatMap((group) => Object.entries(group))) {
					assert.ok(comparison.outcomes.some((item) => item.id === outcome));
					assert.ok(Number.isFinite(estimate.value));
					assert.ok(["reported", "approximately", "less_than"].includes(estimate.qualifier));
					assert.ok(estimate.sourceIds.length > 0);
					assert.equal(new Set(estimate.sourceIds).size, estimate.sourceIds.length);
					if (estimate.uncertainty) {
						const { lower, upper, estimate: point, metric, level } = estimate.uncertainty;
						assert.ok([lower, upper, point].every(Number.isFinite));
						assert.ok(lower <= point && point <= upper);
						assert.ok(metric.length > 10);
						assert.equal(level, 95);
						assert.ok(estimate.interpretation);
					}
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

	it("preserves all twelve caffeine placebo contrasts from the inspected supplementary Table S4", () => {
		const actual = caffeine.options.flatMap((option) =>
			Object.entries(option.estimatesByContext!).flatMap(([context, estimates]) =>
				Object.entries(estimates).map(([outcome, estimate]) => [
					option.id,
					context,
					outcome,
					estimate.value,
					estimate.uncertainty!.estimate,
					estimate.uncertainty!.lower,
					estimate.uncertainty!.upper,
					estimate.pValue
				])
			)
		);
		assert.deepEqual(actual, [
			["100-mg", "four-hours", "total-sleep", -4.47, -0.03, -0.25, 0.19, "= 1.000"],
			["100-mg", "four-hours", "deep-sleep", 4.19, 0.07, -0.15, 0.29, "= 1.000"],
			["100-mg", "eight-hours", "total-sleep", -7.58, -0.05, -0.27, 0.17, "= 1.000"],
			["100-mg", "eight-hours", "deep-sleep", -8.39, -0.14, -0.36, 0.08, "= 0.374"],
			["100-mg", "twelve-hours", "total-sleep", -7.2, -0.05, -0.27, 0.17, "= 1.000"],
			["100-mg", "twelve-hours", "deep-sleep", -0.59, -0.01, -0.23, 0.21, "= 1.000"],
			["400-mg", "four-hours", "total-sleep", -50.64, -0.36, -0.59, -0.14, "< 0.001"],
			["400-mg", "four-hours", "deep-sleep", -29.65, -0.5, -0.73, -0.27, "< 0.001"],
			["400-mg", "eight-hours", "total-sleep", -28.66, -0.21, -0.43, 0.02, "= 0.076"],
			["400-mg", "eight-hours", "deep-sleep", -15.29, -0.26, -0.48, -0.04, "= 0.016"],
			["400-mg", "twelve-hours", "total-sleep", -30.02, -0.22, -0.44, 0.01, "= 0.060"],
			["400-mg", "twelve-hours", "deep-sleep", -20.63, -0.35, -0.57, -0.12, "= 0.001"]
		]);
	});

	it("does not carry a dose estimate into a different timing or population", () => {
		const option = caffeine.options[1]!;
		const outcome = caffeine.outcomes[0]!;
		assert.equal(estimateForSelection(option, outcome, caffeine.contexts[0]!)!.value, -50.64);
		assert.equal(estimateForSelection(option, outcome, caffeine.contexts[1]!)!.value, -28.66);
		assert.equal(estimateForSelection(option, outcome, caffeine.contexts[3]!), undefined);
		assert.equal(
			estimateForSelection(
				{ ...option, estimates: { "total-sleep": option.estimatesByContext!["four-hours"]!["total-sleep"]! } },
				outcome,
				{ ...caffeine.contexts[0]!, id: "missing" }
			),
			undefined
		);
		assert.equal(estimateForSelection(option, { ...outcome, id: "missing" }, caffeine.contexts[0]!), undefined);
	});

	it("keeps null findings, personal limits and standardized intervals explicit", () => {
		assert.match(caffeine.protocolNote!, /usual morning caffeine/);
		assert.match(caffeine.protocolNote!, /23 healthy men/);
		assert.match(caffeine.protocolNote!, /one night/);
		assert.match(caffeine.measureNote, /not intervals in minutes/);
		for (const estimates of Object.values(caffeine.options[0]!.estimatesByContext!)) {
			for (const estimate of Object.values(estimates)) {
				assert.match(estimate.interpretation!, /not proof of no effect/);
				assert.notEqual(estimate.value, 0);
			}
		}
		assert.match(
			caffeine.options[1]!.estimatesByContext!["twelve-hours"]!["total-sleep"]!.interpretation!,
			/No clear difference/
		);
	});

	it("serializes rapid changes against the latest completed URL, including checkbox toggles", async () => {
		let query: Record<string, unknown> = {};
		let release!: () => void;
		const firstNavigation = new Promise<void>((resolve) => {
			release = resolve;
		});
		const writes: Array<Record<string, string>> = [];
		const update = createComparisonNavigation(
			caffeine,
			() => query,
			async (next) => {
				if (!writes.length) await firstNavigation;
				writes.push(next);
				query = next;
			}
		);
		const first = update({ outcome: "deep-sleep" });
		const second = update({ context: "twelve-hours" });
		const third = update((current) => ({
			options: current.options
				.filter((option) => option.id !== "100-mg")
				.map((option) => option.id)
				.join(",")
		}));
		const fourth = update((current) => ({
			options: current.options
				.filter((option) => option.id !== "400-mg")
				.map((option) => option.id)
				.join(",")
		}));
		assert.deepEqual(writes, []);
		release();
		await Promise.all([first, second, third, fourth]);
		assert.deepEqual(query, { outcome: "deep-sleep", context: "twelve-hours", options: "" });
		assert.equal(writes.length, 4);
	});

	it("recovers after a rejected navigation instead of wedging the controls", async () => {
		let query: Record<string, unknown> = {};
		let fail = true;
		const update = createComparisonNavigation(
			caffeine,
			() => query,
			async (next) => {
				if (fail) {
					fail = false;
					throw new Error("navigation failed");
				}
				query = next;
			}
		);
		await assert.rejects(update({ outcome: "deep-sleep" }), /navigation failed/);
		await update({ context: "eight-hours" });
		assert.deepEqual(query, { outcome: "total-sleep", context: "eight-hours", options: "100-mg,400-mg" });
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
			"/compare/electricity-emissions?options=",
			"/compare/caffeine-dose-and-sleep",
			"/compare/caffeine-dose-and-sleep?outcome=deep-sleep&context=twelve-hours",
			"/compare/caffeine-dose-and-sleep?context=other-populations",
			"/compare/caffeine-dose-and-sleep?options="
		])
			assert.ok(a11y.includes(`"${route}"`));
	});
});
