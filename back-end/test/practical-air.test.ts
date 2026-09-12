import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	airPracticalClaims,
	airPracticalGaps,
	airSlugs,
	airSources
} from "../src/data/claim-expansion-practical-air.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const bySlug = (slug: string) => airPracticalClaims.find(claim => claim.slug === slug)!;
describe("practical air-cleaning reviews", () => {
	it("adds five unique canonical questions with explicit gaps and honest review status", () => {
		assert.equal(airPracticalClaims.length, 5);
		assert.deepEqual(
			airPracticalGaps.map(gap => gap.slug),
			airPracticalClaims.map(claim => claim.slug)
		);
		for (const claim of airPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
			assert.equal(new Set(claim.sources.map(source => source.url)).size, claim.sources.length);
		}
	});
	it("retains laboratory boundaries and does not manufacture clinical or statistical certainty", () => {
		const claim = bySlug(airSlugs.diy);
		assert.match(claim.stableCore.join(" "), /111\.2.*156\.1.*400\.9.*118\.9/);
		assert.match(claim.uncertaintySummary!, /29\.3 m³.*nonrandomized.*prior cleaner/s);
		assert.match(claim.evidenceSummaries![0]!.magnitude!, /not 95% confidence intervals/);
		assert.match(airSources.lab.note, /at least three replicates/);
		assert.match(airSources.diyGuidance.note, /five fan models, not every assembly/);
	});
	it("separates particle removal, gases, ozone and whole-system operation", () => {
		assert.match(bySlug(airSlugs.ratings).misconceptions.join(" "), /99\.97%.*does not mean/);
		assert.match(bySlug(airSlugs.gases).bottomLine, /not a substitute for carbon-monoxide alarms/);
		assert.match(bySlug(airSlugs.ozone).uncertaintySummary!, /Historical numeric exposure limits.*not used/);
		assert.match(bySlug(airSlugs.hvac).stableCore.join(" "), /bypass.*airflow/s);
		assert.match(bySlug(airSlugs.hvac).editorSummary, /humidity/);
	});
	it("makes the new questions discoverable without overwriting existing reviews", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({
			ratings: "filter rating room",
			diy: "DIY box fan",
			gases: "HEPA carbon monoxide",
			ozone: "ozone generators",
			hvac: "higher MERV"
		})) {
			assert.ok(
				search(query).some(result => result.claim.slug === airSlugs[key as keyof typeof airSlugs]),
				query
			);
		}
		assert.ok(
			defaultClaims.some(
				claim => claim.slug === "do-portable-hepa-air-cleaners-reduce-indoor-fine-particle-pollution"
			)
		);
	});
});
