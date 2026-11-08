import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../../back-end/src/data/claims.js";
import { defaultTopics } from "../../back-end/src/data/topics.js";
import { topicGuides } from "../src/data/topicGuides.js";

describe("topic guide starter claims", () => {
	it("provides one guide for every seeded topic", () => {
		assert.deepEqual(new Set(Object.keys(topicGuides)), new Set(defaultTopics.map(topic => topic.slug)));
	});
	it("offers consumer questions without inventing topic-wide numerical agreement", () => {
		const guide = topicGuides["consumer-choices"];
		assert.equal(Object.hasOwn(guide, "consensusScore"), false);
		assert.deepEqual(guide.starterClaimSlugs, [
			"does-a-higher-price-make-a-product-seem-better",
			"do-prices-ending-in-99-change-buying-decisions",
			"do-front-of-pack-nutrition-labels-improve-food-choices"
		]);
		assert.match(guide.consensusLabel, /depend on the decision/u);
	});
	it("offers workplace entry points without inventing a topic-wide numerical consensus", () => {
		const guide = topicGuides["work-and-organizations"];
		assert.equal(Object.hasOwn(guide, "consensusScore"), false);
		assert.deepEqual(guide.starterClaimSlugs, [
			"does-workplace-coaching-improve-performance",
			"does-employee-monitoring-improve-work-performance",
			"do-anonymous-applications-reduce-hiring-discrimination"
		]);
		assert.match(guide.consensusLabel, /depend on the intervention/u);
	});
	it("offers animal-welfare entry points without inventing a topic-wide numerical consensus", () => {
		const guide = topicGuides["animal-behavior-and-welfare"];
		assert.equal(Object.hasOwn(guide, "consensusScore"), false);
		assert.deepEqual(guide.starterClaimSlugs, [
			"how-do-reward-based-and-aversive-dog-training-compare",
			"do-hiding-places-reduce-stress-in-shelter-cats",
			"is-there-evidence-that-octopuses-are-sentient"
		]);
		assert.match(guide.commonMisreads.join(" "), /not by itself proof/u);
	});

	it("provides three distinct, seeded entry points for every topic guide", () => {
		const allStarters: string[] = [];
		// Check the actual composed catalog, including claims with shared constants.
		const claimTopics = new Map(defaultClaims.map(claim => [claim.slug, claim.topicSlug]));

		for (const [topicSlug, guide] of Object.entries(topicGuides)) {
			const starters = guide.starterClaimSlugs ?? [];

			assert.equal(starters.length, 3, `${topicSlug} should expose exactly three starter claims`);
			assert.equal(new Set(starters).size, 3, `${topicSlug} starter claims should be distinct`);
			for (const starterSlug of starters) {
				assert.equal(
					claimTopics.get(starterSlug),
					topicSlug,
					`${starterSlug} should be seeded in ${topicSlug}`
				);
			}
			allStarters.push(...starters);
		}

		assert.equal(
			new Set(allStarters).size,
			allStarters.length,
			"starter claims should not repeat across topic guides"
		);
	});
});
