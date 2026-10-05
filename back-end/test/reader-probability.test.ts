import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { originsCheckedAt, readerOriginsClaims } from "../src/data/claim-expansion-reader-origins.js";
import { physicsCheckedAt, readerPhysicsClaims } from "../src/data/claim-expansion-reader-physics.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { probabilityCheckedAt, readerProbabilityClaims, readerProbabilityGaps, readerProbabilitySlugs, readerProbabilitySources } from "../src/data/claim-expansion-reader-probability.js";
import { readerSpaceClaims, spaceCheckedAt } from "../src/data/claim-expansion-reader-space.js";
import { readerWaterClaims, waterCheckedAt } from "../src/data/claim-expansion-reader-water.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerProbabilityClaims.find(claim => claim.slug === readerProbabilitySlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");
const mean = (values: number[]) => values.reduce((total, value) => total + value, 0) / values.length;

describe("probability and data-literacy expansion", () => {
	it("adds twenty unique substantive questions and stable new-review identities", () => {
		assert.equal(readerProbabilityClaims.length, 20);
		assert.equal(new Set(readerProbabilityClaims.map(claim => claim.slug)).size, 20);
		assert.equal(new Set(readerProbabilityClaims.map(claim => claim.bottomLine)).size, 20);
		assert.equal(new Set(readerProbabilityClaims.map(claim => claim.readerAnnouncement!.id)).size, 20);
		assert.deepEqual(readerProbabilityGaps.map(gap => gap.slug), readerProbabilityClaims.map(claim => claim.slug));
		for (const claim of readerProbabilityClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.searchCutoffAt, probabilityCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, probabilityCheckedAt);
			assert.ok(textFor(Object.keys(readerProbabilitySlugs).find(key => readerProbabilitySlugs[key] === claim.slug)!).split(/\s+/).length >= 180);
			assert.ok(claim.sources.length >= 2);
			assert.ok(Date.parse(probabilityCheckedAt) <= Date.now());
		}
	});

	it("leaves all prior cohort research dates unchanged", () => {
		for (const [claims, checkedAt] of [[readerPrivacyClaims, privacyCheckedAt], [readerOriginsClaims, originsCheckedAt], [readerSpaceClaims, spaceCheckedAt], [readerWaterClaims, waterCheckedAt], [readerPhysicsClaims, physicsCheckedAt]] as const) {
			for (const claim of claims) assert.equal(claim.searchCutoffAt, checkedAt);
		}
	});

	it("persists method references without fabricating experiments or expert appraisal", async () => {
		for (const claim of readerProbabilityClaims) {
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.evidenceSummaries![0]!.magnitude!, /not an observed effect size/);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), probabilityCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
				assert.ok(!entry.url!.includes("consensus.app"));
			}
		}
		assert.equal(Object.keys(readerProbabilitySources).length, 27);
		assert.match(readerProbabilitySources.missing.note!, /dated survey-codebook/);
		assert.match(readerProbabilitySources.missingGlossary.note!, /not adopted/);
	});

	it("places each question in exactly one intentional collection", () => {
		const groups = {
			"averages-and-data-displays": ["median", "pooled", "simpson", "missing", "histogram"],
			"percentages-and-conditioning": ["points", "reverse", "compound", "conditional", "overlap"],
			"independence-and-probability-models": ["exclusive", "replacement", "zero", "density", "catchup"],
			"expectation-spread-and-sampling-uncertainty": ["expected", "correlation", "variance", "error", "normal"]
		};
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("consensus-foundations", readerProbabilitySlugs[key]!).map(collection => collection.slug), [group]);
		}
	});

	it("independently recomputes the center, weighting and Simpson examples", () => {
		const values = [2, 3, 4, 5, 36];
		assert.equal(mean(values), 10);
		assert.equal(values.toSorted((left, right) => left - right)[2], 4);
		assert.match(textFor("median"), /mean is 10 units while the median is 4/);
		assert.equal((2 * 6 + 8 * 16) / 10, 14);
		assert.equal(mean([6, 16]), 11);
		assert.match(textFor("pooled"), /pooled mean of 14.*gives 11/);
		const completed = { first: [[8, 10], [60, 100]], second: [[70, 100], [5, 10]] };
		assert.ok(completed.first.every((row, index) => row[0]! / row[1]! > completed.second[index]![0]! / completed.second[index]![1]!));
		assert.ok((8 + 60) / (10 + 100) < (70 + 5) / (100 + 10));
		assert.match(textFor("simpson"), /68 of 110.*75 of 110/);
		assert.match(textFor("simpson"), /nothing about how frequently/);
	});

	it("independently checks denominator and sequential-change arithmetic", () => {
		assert.equal(50 - 40, 10);
		assert.equal((50 - 40) / 40 * 100, 25);
		assert.match(textFor("points"), /10 percentage points.*25%/);
		assert.equal(100 * 1.2 * 0.8, 96);
		assert.match(textFor("reverse"), /100 units to 120 and then 96/);
		assert.ok(Math.abs((1.1 * 1.2 - 1) * 100 - 32) < 1e-12);
		assert.match(textFor("compound"), /32%, not 30%/);
		assert.equal(10 / 20, 0.5);
		assert.equal(10 / 50, 0.2);
		assert.match(textFor("conditional"), /Half.*one fifth/);
		assert.equal((40 + 30 - 10) / 100, 0.6);
		assert.match(textFor("overlap"), /60 records.*not 70/);
		assert.notEqual(3 / 9, 4 / 10);
		assert.notEqual(4 / 9, 4 / 10);
		assert.match(textFor("replacement"), /3\/9.*4\/9/);
	});

	it("independently checks density, moments and a nonlinear zero-correlation case", () => {
		const density = 1 / 0.25;
		assert.equal(density, 4);
		assert.equal(density * 0.25, 1);
		assert.equal(density * 0.1, 0.4);
		assert.equal(1 / 25, 0.04);
		assert.match(textFor("density"), /4 per meter.*0.40/);
		assert.equal(0 * 0.5 + 4 * 0.5, 2);
		assert.match(textFor("expected"), /never takes the value two/);
		const values = [-2, 0, 2];
		const squares = values.map(value => value ** 2);
		const covariance = mean(values.map((value, index) => (value - mean(values)) * (squares[index]! - mean(squares))));
		assert.equal(covariance, 0);
		assert.ok(mean(values.map(value => (value - mean(values)) ** 2)) > 0);
		assert.ok(mean(squares.map(value => (value - mean(squares)) ** 2)) > 0);
		assert.notEqual(squares[0], squares[1]);
		assert.match(textFor("correlation"), /equally likely.*-2, 0 and 2.*square/);
		assert.equal(mean([1, 3, 5].map(value => (value - 3) ** 2)), 8 / 3);
		assert.match(textFor("variance"), /8\/3 square meters/);
		assert.equal(12 / Math.sqrt(144), 1);
		assert.match(textFor("error"), /144.*standard error 1 unit/);
	});

	it("retains null-event, normality, independence and missingness boundaries", () => {
		assert.match(textFor("exclusive"), /both have positive probability/);
		assert.match(textFor("zero"), /Countable additivity.*uncountable/);
		assert.match(textFor("zero"), /rounded recorded measurement/);
		assert.match(textFor("catchup"), /Convergence need not proceed monotonically/);
		assert.match(textFor("catchup"), /unknown probability.*different/);
		assert.match(textFor("correlation"), /separate normal-looking marginal distributions are not enough/);
		assert.equal(mean([-1, 1]), 0);
		assert.equal(Math.sqrt(mean([-1, 1].map(value => value ** 2))), 1);
		assert.match(textFor("normal"), /inclusive one-standard-deviation interval/);
		assert.equal(mean([4, 8]), 6);
		assert.equal(mean([4, 8, 0]), 4);
		assert.match(textFor("missing"), /deleting incomplete records can also bias/);
		assert.match(textFor("histogram"), /different summaries of the same observations/);
	});

	it("finds all diagnostic questions without altering search ranking or held-out queries", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { median: "mean median outlier", pooled: "average group averages sizes", simpson: "Simpson paradox aggregation", points: "percentage points percent increase", reverse: "percent increase decrease cancel", compound: "successive percent changes", conditional: "conditional probability reverse", exclusive: "mutually exclusive independent", overlap: "overlapping events probabilities", replacement: "sampling without replacement", zero: "zero probability impossible", density: "probability density above one", expected: "expected value possible outcome", catchup: "law large numbers streak", correlation: "zero Pearson correlation independent", variance: "variance standard deviation units", error: "standard error individual variation", normal: "68 95 99.7 rule", missing: "missing measurements zero", histogram: "histogram bin width" };
		const missingQueries = Object.entries(queries).filter(([key, query]) => !search(query).some(result => result.claim.slug === readerProbabilitySlugs[key]));
		assert.deepEqual(missingQueries, []);
	});
});
