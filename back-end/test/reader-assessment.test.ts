import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildPublicAtlasCollections, getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { assessmentCheckedAt, readerAssessmentClaims, readerAssessmentGaps, readerAssessmentSlugs, readerAssessmentSources } from "../src/data/claim-expansion-reader-assessment.js";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerAssessmentClaims.find(claim => claim.slug === readerAssessmentSlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");
const rankBelow = (score: number, norm: number[]) => 100 * norm.filter(value => value < score).length / norm.length;

describe("assessment interpretation expansion", () => {
	it("adds eighteen substantive canonical questions without counting guides or repurposing existing reviews", () => {
		assert.equal(readerAssessmentClaims.length, 18);
		for (const field of ["slug", "title", "bottomLine"] as const) assert.equal(new Set(readerAssessmentClaims.map(claim => claim[field])).size, 18);
		assert.equal(new Set(readerAssessmentClaims.map(claim => claim.readerAnnouncement!.id)).size, 18);
		assert.deepEqual(readerAssessmentGaps.map(gap => gap.slug), readerAssessmentClaims.map(claim => claim.slug));
		assert.ok(Date.parse(assessmentCheckedAt) <= Date.now());
		for (const claim of readerAssessmentClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "education-and-learning");
			assert.equal(claim.searchCutoffAt, assessmentCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, assessmentCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^ae597cc1-79c6-49bf-9b6b-b0cd6dc600\d\d$/);
			assert.ok([claim.bottomLine, ...claim.stableCore, claim.editorSummary].join(" ").split(/\s+/).length >= 250);
			assert.ok(claim.sources.length >= 2);
		}
		assert.equal(defaultClaims.filter(claim => !readerExpansionClaims.some(addition => addition.slug === claim.slug)).length, 800);
	});

	it("validates actual source schemas with honest technical provenance, dates and no invented expert review", async () => {
		assert.equal(Object.keys(readerAssessmentSources).length, 15);
		for (const claim of readerAssessmentClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.coiSummary!, /interests in their assessment products/);
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), assessmentCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
			}
		}
		assert.equal(readerAssessmentSources.reliability.year, 2018);
		assert.equal(readerAssessmentSources.standards.year, 2014);
		assert.equal(readerAssessmentSources.glossary.year, undefined);
		assert.ok(Object.values(readerAssessmentSources).every(source => !source.url!.includes("consensus.app")));
	});

	it("checks independently constructed norm, rank-spacing and growth counterexamples", () => {
		assert.equal(rankBelow(8, [4, 6, 7, 9, 10]), 60);
		assert.equal(100 * 8 / 10, 80);
		const norm = [10, 11, 12, 13, 50];
		assert.equal((rankBelow(11, norm) + rankBelow(50, norm)) / 2, 50);
		assert.equal(rankBelow((11 + 50) / 2, norm), 80);
		assert.equal(rankBelow(40, [20, 30, 35, 45, 50]), 60);
		assert.equal(rankBelow(45, [30, 42, 48, 55, 60]), 40);
		assert.match(textFor("percentile"), /treatment of ties/);
		assert.match(textFor("rankIntervals"), /mean of percentile ranks/);
		assert.match(textFor("rankGrowth"), /assumes a genuinely comparable/);
		assert.match(textFor("gradeEquivalent"), /not.*overall developmental age/);
	});

	it("keeps form difficulty, scale origins and validated links separate", () => {
		assert.equal(100 + 10 * 6, 160);
		assert.equal(100 * 160 / 200, 80);
		assert.notEqual(100 * 160 / 200, 100 * 6 / 10);
		assert.match(textFor("rawForms"), /not accomplished by merely subtracting/);
		assert.match(textFor("scaledPercent"), /only a counterexample/);
		assert.match(textFor("sameRange"), /Documented cross-grade/);
		assert.match(textFor("sameRange"), /predicting another test/);
	});

	it("does not convert repeatability, modeled true scores, categories or ceilings into individual certainty", () => {
		assert.match(textFor("reliableValid"), /wrong construct/);
		assert.match(textFor("validUses"), /evidence for each intended interpretation/);
		assert.match(textFor("exactScore"), /defined expectation/);
		assert.match(textFor("exactScore"), /overlapping intervals as a formal significance test/);
		assert.match(textFor("cutScore"), /without demonstrating a corresponding change/);
		assert.match(textFor("ceiling"), /does not prove that growth occurred/);
		assert.equal(Number(41 >= 42), 0);
		assert.equal(Number(43 >= 42), 1);
		assert.equal(Math.min(10, 10), Math.min(10, 12));
	});

	it("retains conditional item analysis, program-specific adaptation and construct-preserving access", () => {
		assert.match(textFor("itemBias"), /after matching or conditioning/);
		assert.match(textFor("itemBias"), /Absence of a detected flag/);
		assert.match(textFor("adaptiveQuestions"), /multistage system/);
		assert.match(textFor("adaptiveQuestions"), /half-correct targets.*not adopted/);
		assert.match(textFor("accommodation"), /not a universal legal definition/);
		assert.match(readerAssessmentSources.dif.note, /2008/);
		assert.match(readerAssessmentSources.adaptive.note, /Marketing claims.*not adopted/);
	});

	it("preserves descriptive versus causal, group versus individual and framework-specific reporting boundaries", () => {
		assert.match(textFor("schoolCause"), /adjustment is not automatic causal identification/);
		assert.match(textFor("naepIndividual"), /representative student samples/);
		assert.match(textFor("naepIndividual"), /nonsampling risks/);
		assert.match(textFor("proficientLabels"), /not the percentage of the entire curriculum/);
		assert.match(textFor("proficientLabels"), /not equivalent to meeting state/);
		assert.match(readerAssessmentSources.quality.note, /not current rates/);
	});

	it("places every addition deliberately and retrieves diagnostic queries without changing the ranker", () => {
		const newSlugs = new Set(readerAssessmentClaims.map(claim => claim.slug));
		const existingEducation = defaultClaims.filter(claim => claim.topicSlug === "education-and-learning" && !newSlugs.has(claim.slug));
		assert.equal(existingEducation.length, 16);
		const oldCollections = ["learning-methods-and-feedback", "school-organization-and-resources", "development-and-study-support"];
		for (const claim of existingEducation) {
			const memberships = getAtlasCollectionMemberships(claim.topicSlug, claim.slug);
			assert.equal(memberships.length, 1);
			assert.ok(oldCollections.includes(memberships[0]!.slug));
		}
		const baselineVisible = buildPublicAtlasCollections("education-and-learning", existingEducation.map(claim => claim.slug));
		assert.deepEqual(baselineVisible.map(collection => collection.slug), oldCollections);
		assert.ok(baselineVisible.flatMap(collection => collection.claimSlugs).every(slug => !newSlugs.has(slug)));
		const groups = {
			"assessment-norms-and-equivalents": ["percentile", "rankIntervals", "rankGrowth", "gradeEquivalent"],
			"assessment-score-comparability": ["rawForms", "scaledPercent", "sameRange"],
			"assessment-measurement-precision": ["exactScore", "cutScore", "ceiling"],
			"assessment-validity-and-administration": ["reliableValid", "validUses", "adaptiveQuestions", "accommodation"],
			"population-assessment-interpretation": ["itemBias", "schoolCause", "naepIndividual", "proficientLabels"]
		};
		assert.equal(Object.values(groups).flat().length, 18);
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("education-and-learning", readerAssessmentSlugs[key]!).map(collection => collection.slug), [group]);
		}
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { percentile: "percentile questions correct", rankIntervals: "average percentile ranks", rankGrowth: "score rise percentile", gradeEquivalent: "grade equivalent curriculum", rawForms: "raw score test forms", scaledPercent: "scaled score percentage correct", sameRange: "different tests same score range", reliableValid: "reliable test valid interpretation", validUses: "validating test every use", exactScore: "reported test score exact", cutScore: "cut score uncertainty", ceiling: "unchanged maximum learning", itemBias: "item biased groups success rates", adaptiveQuestions: "computer adaptive questions", accommodation: "assessment accommodation measures", schoolCause: "school higher average caused learning", naepIndividual: "national assessment individual student", proficientLabels: "NAEP proficient state" };
		for (const [key, query] of Object.entries(queries)) assert.ok(search(query).some(result => result.claim.slug === readerAssessmentSlugs[key]), query);
	});
});
