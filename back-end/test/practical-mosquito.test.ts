import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { mosquitoPracticalClaims, mosquitoPracticalGaps, mosquitoSlugs, mosquitoSources } from "../src/data/claim-expansion-practical-mosquito.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (slug: string) => mosquitoPracticalClaims.find(claim => claim.slug === slug)!;
describe("practical mosquito-prevention reviews", () => {
	it("registers five unique new questions without replacing the existing bed-net review", () => {
		assert.equal(mosquitoPracticalClaims.length, 5);
		assert.deepEqual(mosquitoPracticalGaps.map(gap => gap.slug), mosquitoPracticalClaims.map(claim => claim.slug));
		for (const claim of mosquitoPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.deepEqual(getAtlasCollectionMemberships(claim.topicSlug, claim.slug).map(item => item.slug), ["mosquito-bite-prevention"]);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		}
		for (const gap of mosquitoPracticalGaps) {
			for (const slug of gap.relatedExistingSlugs) assert.ok(defaultClaims.some(claim => claim.slug === slug));
		}
	});
	it("preserves formulation and label limits instead of making concentration or age shortcuts", () => {
		assert.match(claimFor(mosquitoSlugs.duration).bottomLine, /not a proportional increase/);
		assert.match(claimFor(mosquitoSlugs.duration).stableCore.join(" "), /50% DEET.*not a universal threshold/);
		assert.match(claimFor(mosquitoSlugs.oil).stableCore.join(" "), /certain OLE-only formulations at 30% or less.*not permission/);
		assert.match(claimFor(mosquitoSlugs.oil).bottomLine, /not interchangeable/);
	});
	it("keeps the laboratory endpoint and source discrepancy visible", () => {
		const methods = claimFor(mosquitoSlugs.methods);
		assert.match(JSON.stringify(methods.evidenceSummaries), /17 analyzed.*15%.*first landing.*six-hour/s);
		assert.match(methods.uncertaintySummary!, /abstract reverses two species medians.*withheld/);
		assert.match(methods.coiSummary!, /Vifor supplied formulations/);
		const wristbands = claimFor(mosquitoSlugs.wristbands);
		assert.match(JSON.stringify(wristbands.evidenceSummaries), /Two selected volunteers.*four replicates.*15-minute/s);
		assert.match(wristbands.coiSummary!, /absence of a statement is not proof of independence/);
		assert.match(mosquitoSources.wearables.note, /Table 1 are not measured protection times/);
	});
	it("retains WHO's overall and subgroup estimates, denominator and conditional recommendation", () => {
		const claim = claimFor(mosquitoSlugs.spatial);
		assert.match(claim.bottomLine, /not established replacements/);
		assert.match(claim.stableCore.join(" "), /0\.77 \(95% CI 0\.56–1\.05\).*low certainty.*0\.67 \(0\.56–0\.81\).*high certainty/s);
		assert.match(claim.stableCore.join(" "), /not established as a biological threshold/);
		assert.match(claim.stableCore.join(" "), /incidence over person-time/);
		assert.match(claim.uncertaintySummary!, /overall recommendation moderate certainty/);
		assert.match(mosquitoSources.who.title, /10 September 2026/);
		assert.match(mosquitoSources.who.note, /2025 recommendation retained/);
		assert.match(claim.sources[1]!.note, /must not override WHO/);
	});
	it("retrieves the new practical questions from ordinary searches", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ duration: "repellent concentration", oil: "lemon eucalyptus essential oil", wristbands: "repellent wristbands", methods: "laboratory mosquito protection times", spatial: "spatial emanators malaria" })) {
			assert.ok(search(query).some(result => result.claim.slug === mosquitoSlugs[key as keyof typeof mosquitoSlugs]), query);
		}
	});
});
