import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { groupByTopicFamily, topicFamilies, topicFamilyFor } from "../src/data/topicFamilies";
import { topicGuides } from "../src/data/topicGuides";

describe("topic families", () => {
	it("assigns each topic to exactly one family", () => {
		const slugs = topicFamilies.flatMap((family) => family.topicSlugs);
		assert.equal(new Set(slugs).size, slugs.length);
	});

	it("covers every configured topic guide", () => {
		for (const slug of Object.keys(topicGuides)) {
			assert.notEqual(topicFamilyFor(slug).slug, "more-topics", `${slug} needs a family`);
		}
	});

	it("keeps each family within a scannable group size", () => {
		for (const family of topicFamilies) assert.ok(family.topicSlugs.length <= 10, family.title);
	});

	it("groups items in family order and puts unknown topics last", () => {
		const groups = groupByTopicFamily(
			[{ slug: "physics-and-chemistry" }, { slug: "unknown-topic" }, { slug: "health-and-medicine" }],
			(item) => item.slug
		);
		assert.deepEqual(
			groups.map((group) => [group.family.title, group.items.map((item) => item.slug)]),
			[
				["Health & medicine", ["health-and-medicine"]],
				["Life & physical sciences", ["physics-and-chemistry"]],
				["More topics", ["unknown-topic"]]
			]
		);
	});
});
