import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { buildSeedSourceUpdate } from "../src/data/seedClaims.js";

function findSeedSource(claimSlug: string, order: number) {
	const claim = defaultClaims.find(entry => entry.slug === claimSlug);
	assert.ok(claim, `Missing seeded claim ${claimSlug}`);
	const source = claim.sources.find(entry => entry.order === order);
	assert.ok(source, `Missing source ${order} for seeded claim ${claimSlug}`);
	return source;
}

describe("seedClaims source synchronization", () => {
	it("fully refreshes an existing placeholder source row matched by order", () => {
		const source = findSeedSource("does-saturated-fat-still-raise-ldl-and-heart-risk", 1);
		const update = buildSeedSourceUpdate(
			{
				kind: "context",
				title: "American Heart Association dietary guidance",
				publisher: "AHA",
				year: undefined,
				url: "",
				doi: "",
				pmid: "",
				pmcid: "",
				isAnchor: false,
				appraisal: "not_appraised",
				citationStatus: "current",
				citationCheckedAt: undefined,
				statusSources: [],
				stance: "context",
				note: "Old generic seed copy.",
				order: source.order
			},
			source
		);

		assert.equal(update.$set?.kind, source.kind);
		assert.equal(update.$set?.title, source.title);
		assert.equal(update.$set?.publisher, source.publisher);
		assert.equal(update.$set?.year, source.year);
		assert.equal(update.$set?.url, source.url);
		assert.equal(update.$set?.doi, source.doi);
		assert.equal(update.$set?.isAnchor, source.isAnchor);
		assert.equal(update.$set?.appraisal, source.appraisal);
		assert.equal(update.$set?.stance, source.stance);
		assert.equal(update.$set?.note, source.note);
		assert.deepEqual(update.$set?.statusSources, source.statusSources);
		assert.ok(update.$set?.citationCheckedAt instanceof Date);
	});

	it("clears stale identifiers that no longer belong to the matched seed row", () => {
		const source = findSeedSource("are-commercial-gmo-foods-unsafe-to-eat", 1);
		const update = buildSeedSourceUpdate(
			{
				...source,
				doi: "10.0000/stale-doi",
				pmid: "99999999",
				pmcid: "PMC9999999",
				year: 1999
			},
			source
		);

		assert.deepEqual(update.$unset, {
			doi: "",
			pmid: "",
			pmcid: "",
			year: ""
		});
		assert.equal(update.$set, undefined);
	});

	it("does not update a source row that already matches the seed", () => {
		const source = findSeedSource("do-learning-styles-improve-educational-outcomes", 1);
		const update = buildSeedSourceUpdate(
			{
				...source,
				citationCheckedAt: new Date(source.citationCheckedAt ?? "")
			},
			source
		);

		assert.deepEqual(update, {});
	});
});
