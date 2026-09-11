import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { heatingPracticalClaims, heatingPracticalGaps, heatingSlugs, heatingSources } from "../src/data/claim-expansion-practical-heating.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const bySlug = (slug: string) => heatingPracticalClaims.find(claim => claim.slug === slug)!;

describe("practical home-heating reviews", () => {
	it("adds six distinct canonical questions with documented gaps", () => {
		assert.equal(heatingPracticalClaims.length, 6);
		assert.deepEqual(heatingPracticalGaps.map(gap => gap.slug), heatingPracticalClaims.map(claim => claim.slug));
		for (const claim of heatingPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
			assert.equal(new Set(claim.sources.map(source => source.url)).size, claim.sources.length);
		}
	});
	it("retains metering boundaries, sample sizes and the limited correction", () => {
		assert.match(bySlug(heatingSlugs.ratings).stableCore!.join(" "), /49 systems.*3\.41.*2\.6 to 4\.9.*77/s);
		assert.match(bySlug(heatingSlugs.ratings).misconceptions!.join(" "), /not a confidence interval/);
		assert.equal(heatingSources.field.citationStatus, "corrected");
		assert.match(heatingSources.field.note!, /noise-compliance claims, not a retraction of the thermal/);
		assert.ok(!heatingSources.field.url!.includes("_V2"), "use the working revised report URL");
		assert.match(bySlug(heatingSlugs.backup).stableCore!.join(" "), /1\.3%.*compressor plus backup heater/s);
		assert.match(bySlug(heatingSlugs.backup).stableCore!.join(" "), /not the share of delivered heat/);
		assert.match(bySlug(heatingSlugs.backup).uncertaintySummary!, /mild.*boilers/s);
	});
	it("does not turn observational installation evidence into universal prescriptions", () => {
		assert.match(bySlug(heatingSlugs.radiators).misconceptions!.join(" "), /every existing radiator can stay unchanged/);
		assert.match(bySlug(heatingSlugs.insulation).uncertaintySummary!, /not a causal insulation experiment/);
		assert.match(bySlug(heatingSlugs.sizing).uncertaintySummary!, /Planning documents were generally unavailable/);
		assert.match(bySlug(heatingSlugs.backup).misconceptions!.join(" "), /not a reason to disable/);
	});
	it("separates modeled bill savings from net present value and current advice", () => {
		const claim = bySlug(heatingSlugs.cost);
		assert.match(claim.stableCore!.join(" "), /95%.*21%.*59%/s);
		assert.match(claim.uncertaintySummary!, /simulation, not 550,000 measured installations/);
		assert.match(claim.uncertaintySummary!, /16-year lifetime with 3\.4% real discount/);
		assert.match(claim.uncertaintySummary!, /does not verify current incentives/);
	});
	it("finds each new question through the canonical search", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ ratings: "heat pump efficiency ratings", radiators: "heat pump underfloor heating", insulation: "older home insulation standards", sizing: "bigger heat pump", backup: "resistance backup heat pump", cost: "heat pump total cost" })) {
			assert.ok(search(query).some(result => result.claim.slug === heatingSlugs[key as keyof typeof heatingSlugs]), query);
		}
	});
});
