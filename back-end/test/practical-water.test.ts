import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { waterPracticalClaims, waterPracticalGaps, waterSlugs, waterSources } from "../src/data/claim-expansion-practical-water.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (slug: string) => waterPracticalClaims.find(claim => claim.slug === slug)!;
describe("practical household water reviews", () => {
	it("adds five genuinely distinct canonical questions, not technology comparison rows", () => {
		assert.equal(waterPracticalClaims.length, 5);
		assert.deepEqual(waterPracticalGaps.map(gap => gap.slug), waterPracticalClaims.map(claim => claim.slug));
		for (const claim of waterPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			const memberships = getAtlasCollectionMemberships(claim.topicSlug, claim.slug);
			assert.equal(memberships.length, 1);
			assert.equal(memberships[0]?.slug, "household-water-treatment");
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
			assert.equal(new Set(claim.sources.map(source => source.url)).size, claim.sources.length);
		}
	});
	it("retains the public-health and contaminant-specific boundaries", () => {
		assert.match(claimFor(waterSlugs.boiling).bottomLine, /alternative safe water source.*local health department/);
		assert.match(claimFor(waterSlugs.boiling).stableCore.join(" "), /not distillation.*volatile/s);
		assert.match(claimFor(waterSlugs.uv).bottomLine, /does not by itself remove dissolved lead, nitrate or PFAS/);
		assert.match(claimFor(waterSlugs.softening).bottomLine, /not a disinfection step/);
		assert.match(claimFor(waterSlugs.certification).bottomLine, /specified performance claims/);
		assert.match(waterSources.cdcSystems.note, /pore-size figures are not reproduced/);
	});
	it("keeps the field result, usable lifespan, denominator and source limits together", () => {
		const claim = claimFor(waterSlugs.certification);
		assert.match(JSON.stringify(claim), /99%.*95%.*97%–99%/);
		assert.match(JSON.stringify(claim), /[Tt]hree.*18.*2–3 months/s);
		assert.match(JSON.stringify(claim.evidenceSummaries), /91.*7–15.*volume-rated/s);
		assert.match(claim.coiSummary!, /North Carolina Policy Collaboratory.*no conflicts/);
		assert.match(waterSources.field.note, /Table 3 visually verified/);
		assert.match(claim.misconceptions.join(" "), /not a percentage reduction in disease risk/);
	});
	it("uses the current efficiency clarification without confusing water yield and removal", () => {
		const claim = claimFor(waterSlugs.ro);
		assert.ok(Math.abs((100 / 30 - 1) - 70 / 30) < 1e-12);
		assert.equal((100 / 30 - 1).toFixed(1), "2.3");
		assert.match(claim.stableCore.join(" "), /30%.*70\/30.*2\.333.*August 2026.*back-pressure.*automatic flushing/s);
		assert.match(claim.stableCore.join(" "), /alternative packaging/);
		assert.match(claim.misconceptions.join(" "), /does not mean 30% contaminant removal/);
		assert.match(waterSources.roClarifications.note, /rows 33–35.*RO-0826-1.*RO-0826-2/);
	});
	it("finds new questions while preserving adjacent municipal and PFAS reviews", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ boiling: "boiling water toxic chemicals", certification: "water filter certification", uv: "ultraviolet water lead", ro: "reverse osmosis reject water", softening: "softening hard water" })) {
			assert.ok(search(query).some(result => result.claim.slug === waterSlugs[key as keyof typeof waterSlugs]), query);
		}
		for (const gap of waterPracticalGaps) {
			for (const slug of gap.relatedExistingSlugs) assert.ok(defaultClaims.some(claim => claim.slug === slug));
		}
	});
});
