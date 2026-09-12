import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { hearingPracticalClaims, hearingPracticalGaps, hearingSlugs, hearingSources } from "../src/data/claim-expansion-practical-hearing.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (slug: string) => hearingPracticalClaims.find(claim => claim.slug === slug)!;
describe("practical hearing-protection reviews", () => {
	it("adds five distinct canonical questions and preserves existing hearing-health coverage", () => {
		assert.equal(hearingPracticalClaims.length, 5);
		assert.deepEqual(hearingPracticalGaps.map(gap => gap.slug), hearingPracticalClaims.map(claim => claim.slug));
		for (const claim of hearingPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.deepEqual(getAtlasCollectionMemberships(claim.topicSlug, claim.slug).map(item => item.slug), ["hearing-protection"]);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
		}
		for (const gap of hearingPracticalGaps) {
			for (const slug of gap.relatedExistingSlugs) assert.ok(defaultClaims.some(claim => claim.slug === slug));
		}
	});
	it("uses the current fit-testing policy and does not turn ratings into personal protection", () => {
		assert.match(hearingSources.policy.note, /Supersedes.*1998.*individual quantitative fit testing/);
		assert.match(claimFor(hearingSlugs.rating).bottomLine, /does not tell you.*personally/);
		assert.match(claimFor(hearingSlugs.dual).bottomLine, /adding their printed ratings does not predict/);
		assert.match(claimFor(hearingSlugs.anc).bottomLine, /Even a labeled protector still needs.*fit/);
	});
	it("retains the randomized comparisons, units and source-specific uncertainty", () => {
		const training = claimFor(hearingSlugs.training);
		assert.match(training.stableCore.join(" "), /321-person.*8\.62 dB \(95% CI 6\.31–10\.93\).*moderate certainty/);
		assert.match(training.stableCore.join(" "), /100-person.*8\.34 dB \(7\.32–9\.36\).*low certainty/);
		assert.match(training.stableCore.join(" "), /no adverse effects were reported.*does not establish.*absent/);
		assert.match(training.coiSummary!, /did not assess their own studies/);
	});
	it("keeps attrition, stopping rules and unresolved source figures out of a false decay curve", () => {
		const retention = claimFor(hearingSlugs.retention);
		assert.match(retention.stableCore.join(" "), /390 recruits.*59.*331.*Failure also ended quarterly/s);
		assert.match(retention.bottomLine, /does not establish one optimal refresher schedule/);
		assert.match(retention.uncertaintySummary!, /reporting discrepancies.*estimates are withheld/);
		assert.equal(hearingSources.followup.stance, "context");
		assert.equal(hearingSources.followup.isAnchor, false);
		assert.doesNotMatch(JSON.stringify(retention), /12\.88|8\.84|4\.46/);
	});
	it("retrieves practical hearing questions from ordinary queries", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ rating: "noise reduction rating", training: "earplug fit training", retention: "earplug refreshers", anc: "noise cancelling headphones", dual: "double hearing protection" })) {
			assert.ok(search(query).some(result => result.claim.slug === hearingSlugs[key as keyof typeof hearingSlugs]), query);
		}
	});
});
