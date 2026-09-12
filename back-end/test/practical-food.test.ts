import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { foodStorageClaims, foodStorageGaps, foodStorageSlugs, foodStorageSources } from "../src/data/claim-expansion-practical-food.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: keyof typeof foodStorageSlugs) => foodStorageClaims.find(claim => claim.slug === foodStorageSlugs[key])!;
describe("practical food-storage evidence", () => {
	it("adds five canonical gaps with working collection membership", () => {
		assert.equal(foodStorageClaims.length, 5);
		assert.deepEqual(foodStorageGaps.map(gap => gap.slug), foodStorageClaims.map(claim => claim.slug));
		for (const claim of foodStorageClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.ok(getAtlasCollectionMemberships(claim.topicSlug, claim.slug).some(item => item.slug === "food-storage-and-safety"));
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
		}
	});
	it("keeps growth, survival, toxin and household risk distinct", () => {
		assert.match(claimFor("chill").stableCore.join(" "), /laboratory enrichment.*not a measured illness rate/);
		assert.match(foodStorageSources.lab.note, /Abstract says no toxin.*results report one trace detection/);
		assert.match(foodStorageSources.lab.note, /no prevalence.*universal zero-risk claim adopted/);
		assert.match(claimFor("freeze").bottomLine, /already unsafe does not reliably make it safe/);
	});
	it("preserves the specific heat-stable example without generalizing all toxins", () => {
		assert.match(claimFor("reheat").bottomLine, /preformed cereulide toxin.*ordinary reheating/);
		assert.match(claimFor("reheat").misconceptions.join(" "), /Not all toxins are heat-stable/);
		assert.match(foodStorageSources.cereulide.note, /Narrative review.*no reproducible systematic search/);
	});
	it("does not turn a sensory check or business framework into a safety certificate", () => {
		assert.match(claimFor("senses").bottomLine, /normal smell and appearance cannot rule out/);
		assert.match(claimFor("senses").stableCore.join(" "), /US date-label usage differs/);
		assert.match(claimFor("vacuum").misconceptions.join(" "), /not a universal safe allowance/);
		assert.match(claimFor("vacuum").uncertaintySummary!, /past planned review date.*specific product exclusions/);
	});
	it("finds each review through an ordinary food question", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ chill: "refrigerator leftovers", freeze: "freezing food pathogens", reheat: "reheating food toxins", senses: "smell food safe", vacuum: "vacuum sealing refrigeration" })) {
			assert.ok(search(query).some(result => result.claim.slug === foodStorageSlugs[key as keyof typeof foodStorageSlugs]), query);
		}
	});
});
