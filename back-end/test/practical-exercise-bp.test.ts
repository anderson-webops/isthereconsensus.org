import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	exerciseBpPracticalClaims,
	exerciseBpPracticalGaps,
	exerciseBpSlugs,
	exerciseBpSources
} from "../src/data/claim-expansion-practical-exercise-bp.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const bySlug = (slug: string) => exerciseBpPracticalClaims.find(claim => claim.slug === slug)!;
describe("practical exercise and blood-pressure reviews", () => {
	it("adds five distinct canonical questions with honest appraisal and access boundaries", () => {
		assert.equal(exerciseBpPracticalClaims.length, 5);
		assert.deepEqual(
			exerciseBpPracticalGaps.map(gap => gap.slug),
			exerciseBpPracticalClaims.map(claim => claim.slug)
		);
		for (const claim of exerciseBpPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
			assert.equal(new Set(claim.sources.map(source => source.url)).size, claim.sources.length);
		}
		assert.match(exerciseBpSources.schneider.note, /not the full paper/);
		assert.match(exerciseBpSources.pinto.note, /main full report not appraised/);
	});
	it("preserves denominator, intervention, dose-model and statistical boundaries", () => {
		assert.match(
			bySlug(exerciseBpSlugs.resting).stableCore.join(" "),
			/159.*10,821.*study-level mean age ≥45.*152.*147/s
		);
		assert.match(
			bySlug(exerciseBpSlugs.ranking).stableCore.join(" "),
			/11 studies, 17.*364.*−4\.18.*−8\.31 to −0\.06/
		);
		assert.match(bySlug(exerciseBpSlugs.dose).bottomLine, /not the result of randomizing/);
		assert.match(bySlug(exerciseBpSlugs.dose).misconceptions.join(" "), /slightly more is harmful/);
		assert.match(bySlug(exerciseBpSlugs.ambulatory).stableCore.join(" "), /Within-group change is not proof/);
		assert.match(bySlug(exerciseBpSlugs.ambulatory).coiSummary!, /P3-EX LLC/);
		assert.match(bySlug(exerciseBpSlugs.measurement).stableCore.join(" "), /30 minutes.*five minutes/);
	});
	it("finds new evidence questions while preserving adjacent monitoring and general exercise reviews", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({
			resting: "exercise resting blood pressure",
			ranking: "isometric best blood pressure",
			ambulatory: "clinic 24 hour pressure",
			dose: "optimal exercise dose blood pressure",
			measurement: "post exercise readings"
		})) {
			assert.ok(
				search(query).some(
					result => result.claim.slug === exerciseBpSlugs[key as keyof typeof exerciseBpSlugs]
				),
				query
			);
		}
		for (const gap of exerciseBpPracticalGaps) {
			for (const slug of gap.relatedExistingSlugs) assert.ok(defaultClaims.some(claim => claim.slug === slug));
		}
	});
});
