import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	atlasCollections,
	buildPublicAtlasCollections,
	getAtlasCollectionMemberships,
	rankRelatedClaimSlugs
} from "../src/data/atlasCollections.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";

describe("evidence atlas collections", () => {
	it("references real claims in the correct topic without orphaning configured topics", () => {
		const topicSlugs = new Set(defaultTopics.map(topic => topic.slug));
		const configuredTopicSlugs = new Set(atlasCollections.map(collection => collection.topicSlug));
		const collectionKeys = new Set<string>();
		for (const topicSlug of [
			"biology-and-evolution",
			"energy-and-infrastructure",
			"genetics-and-biotechnology",
			"human-origins-and-paleontology",
			"sports-nutrition-and-supplements",
			"infection-immunity-and-vaccines",
			"sleep-and-circadian-health",
			"mental-health-and-treatment",
			"reproductive-and-sexual-health",
			"aging-and-longevity",
			"cancer-prevention-and-care",
			"cardiovascular-metabolic-and-kidney-health",
			"substance-use-and-addiction"
		]) {
			assert.ok(configuredTopicSlugs.has(topicSlug), `${topicSlug} should retain curated atlas collections`);
		}

		for (const collection of atlasCollections) {
			assert.ok(topicSlugs.has(collection.topicSlug), `${collection.topicSlug} should be a seeded topic`);
			assert.ok(collection.title.trim().length > 0);
			assert.ok(collection.description.trim().length > 0);
			assert.ok(collection.claimSlugs.length >= 2, `${collection.slug} should be a useful collection`);
			assert.equal(
				new Set(collection.claimSlugs).size,
				collection.claimSlugs.length,
				`${collection.slug} should not repeat a claim`
			);

			const key = `${collection.topicSlug}/${collection.slug}`;
			assert.ok(!collectionKeys.has(key), `${key} should be unique`);
			collectionKeys.add(key);

			for (const claimSlug of collection.claimSlugs) {
				const claim = defaultClaims.find(candidate => candidate.slug === claimSlug);
				assert.ok(claim, `${claimSlug} should reference a seeded claim`);
				assert.equal(claim.topicSlug, collection.topicSlug, `${claimSlug} should stay in its topic`);
			}
		}

		for (const topicSlug of configuredTopicSlugs) {
			const seededClaimSlugs = defaultClaims
				.filter(claim => claim.topicSlug === topicSlug && claim.status === "published")
				.map(claim => claim.slug)
				.sort();
			const assignedClaimSlugs = atlasCollections
				.filter(collection => collection.topicSlug === topicSlug)
				.flatMap(collection => collection.claimSlugs)
				.sort();

			assert.deepEqual(
				assignedClaimSlugs,
				seededClaimSlugs,
				`${topicSlug} should place every published claim exactly once`
			);
		}
	});

	it("filters hidden claims from public collections", () => {
		const collections = buildPublicAtlasCollections("biology-and-evolution", [
			"is-evolution-just-a-theory",
			"can-evolution-be-observed-happening-today"
		]);

		assert.deepEqual(
			collections.map(collection => ({ slug: collection.slug, claimSlugs: collection.claimSlugs })),
			[
				{
					slug: "evidence-and-common-descent",
					claimSlugs: ["is-evolution-just-a-theory"]
				},
				{
					slug: "evolution-in-action",
					claimSlugs: ["can-evolution-be-observed-happening-today"]
				}
			]
		);
	});

	it("ranks nearby reviews deterministically and never returns the current claim", () => {
		const visibleClaims = atlasCollections
			.filter(collection => collection.topicSlug === "climate-and-environment")
			.flatMap(collection => collection.claimSlugs);
		const related = rankRelatedClaimSlugs(
			"climate-and-environment",
			"is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
			visibleClaims,
			4
		);

		assert.deepEqual(related, [
			"can-cutting-methane-emissions-slow-warming-in-the-near-term",
			"do-electric-vehicles-usually-have-lower-lifetime-greenhouse-gas-emissions-than-gasoline-cars",
			"do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
			"do-heat-pumps-usually-cut-home-heating-emissions-compared-with-fossil-fuel-heating"
		]);
		assert.ok(!related.includes("is-nuclear-power-more-dangerous-than-fossil-fuel-energy"));
	});

	it("exposes collection membership for claim-page navigation", () => {
		const memberships = getAtlasCollectionMemberships(
			"nutrition-and-diet",
			"does-caffeine-become-less-effective-with-regular-daily-use"
		);

		assert.equal(memberships.length, 1);
		assert.equal(memberships[0]?.slug, "performance-caffeine-and-gut-health");
		assert.equal(memberships[0]?.claimCount, 5);
	});
});
