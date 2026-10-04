import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { originsCheckedAt, readerOriginsClaims, readerOriginsGaps, readerOriginsSlugs, readerOriginsSources } from "../src/data/claim-expansion-reader-origins.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { defaultClaims } from "../src/data/claims.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

describe("human-origins reader expansion", () => {
	it("places every addition in exactly one suitable browse collection", () => {
		for (const claim of readerOriginsClaims) {
			const expected = [readerOriginsSlugs.radiocarbon, readerOriginsSlugs.dna].includes(claim.slug) ? "reading-fossil-evidence" : "human-origins-and-hominin-lives";
			assert.deepEqual(getAtlasCollectionMemberships(claim.topicSlug, claim.slug).map(collection => collection.slug), [expected]);
		}
	});
	it("adds five canonical gaps to the unchanged 804-review baseline", () => {
		assert.equal(readerOriginsClaims.length, 5);
		const slugs = new Set(readerOriginsClaims.map(claim => claim.slug));
		assert.equal(slugs.size, 5);
		assert.equal(defaultClaims.filter(claim => !slugs.has(claim.slug)).length, 804);
		assert.deepEqual(readerOriginsGaps.map(gap => gap.slug), [...slugs]);
		for (const claim of readerOriginsClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "human-origins-and-paleontology");
			assert.equal(claim.searchCutoffAt, originsCheckedAt);
			assert.equal(claim.lastRetractionCheckAt, originsCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, originsCheckedAt);
			assert.ok(claim.sources.every(source => source.citationCheckedAt === originsCheckedAt));
		}
		for (const claim of readerPrivacyClaims) assert.equal(claim.searchCutoffAt, privacyCheckedAt);
	});

	it("keeps each conclusion within the actual observation and method", () => {
		const claimFor = (key: keyof typeof readerOriginsSlugs) => readerOriginsClaims.find(claim => claim.slug === readerOriginsSlugs[key])!;
		assert.match(claimFor("bipedalism").bottomLine, /retain climbing/);
		assert.match(claimFor("bipedalism").stableCore.join(" "), /eight.*crania/);
		assert.match(claimFor("radiocarbon").bottomLine, /nearby volcanic layer/);
		assert.match(claimFor("radiocarbon").stableCore.join(" "), /not a guaranteed usable limit/);
		assert.match(claimFor("mitochondrialEve").bottomLine, /not the first woman/);
		assert.match(claimFor("mitochondrialEve").misconceptions.join(" "), /not evidence of a mating pair/);
		assert.match(claimFor("diet").stableCore.join(" "), /retaining animal-food/);
		assert.match(claimFor("diet").bottomLine, /does not by itself show.*healthiest/);
		assert.match(claimFor("dna").uncertaintySummary!, /Neither a universal DNA half-life nor a fixed maximum/);
		assert.match(claimFor("dna").bottomLine, /without supplying an intact genome/);
	});

	it("discloses access limits, source dependence and nonexpert review", () => {
		assert.match(readerOriginsSources.cereals.note, /subscription body not fully reviewed/);
		assert.match(readerOriginsSources.genealogy.note, /not independently audited/);
		assert.match(readerOriginsSources.taforalt.note, /one study/);
		assert.match(readerOriginsSources.mammoths.note, /subscription methods not fully reviewed/);
		for (const claim of readerOriginsClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
			assert.ok(claim.sources.every(source => source.statusSources!.includes(source.url!)));
		}
	});

	it("retrieves diagnostic origin questions without changing search ranking", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ bipedalism: "upright walking big brains", radiocarbon: "carbon dating fossil age", mitochondrialEve: "mitochondrial Eve maternal lineage", diet: "Palaeolithic ancient plant foods", dna: "ancient DNA fossil preservation" })) {
			assert.ok(search(query).some(result => result.claim.slug === readerOriginsSlugs[key as keyof typeof readerOriginsSlugs]), query);
		}
	});
});
