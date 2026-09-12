import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../../back-end/src/data/claims.js";
import { defaultTopics } from "../../back-end/src/data/topics.js";
import { topicGuides } from "../src/data/topicGuides.js";

describe("topic guide starter claims", () => {
	it("provides one guide for every seeded topic", () => {
		assert.deepEqual(new Set(Object.keys(topicGuides)), new Set(defaultTopics.map((topic) => topic.slug)));
	});

	it("provides three distinct, seeded entry points for every topic guide", () => {
		const allStarters: string[] = [];
		// Check the actual composed catalog, including claims with shared constants.
		const claimTopics = new Map(defaultClaims.map((claim) => [claim.slug, claim.topicSlug]));

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
