import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { originsCheckedAt, readerOriginsClaims } from "../src/data/claim-expansion-reader-origins.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { readerSpaceClaims, readerSpaceGaps, readerSpaceSlugs, readerSpaceSources, spaceCheckedAt } from "../src/data/claim-expansion-reader-space.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

describe("space-observation reader expansion", () => {
	it("persists technical references without inventing appraisal or study design", () => {
		const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...readerSpaceSources.orbit });
		assert.equal(source.validateSync(), undefined);
		assert.equal(source.kind, "technical_reference");
		assert.equal(source.appraisal, "not_appraised");
		assert.equal(source.evidenceProfile.studyDesign, "not_coded");
		assert.equal(source.evidenceProfile.evidenceTier, "not_coded");
		assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
	});

	it("adds ten distinct, substantive canonical gaps without replacing earlier reviews", () => {
		assert.equal(readerSpaceClaims.length, 10);
		assert.equal(new Set(readerSpaceClaims.map(claim => claim.slug)).size, 10);
		assert.deepEqual(readerSpaceGaps.map(gap => gap.slug), readerSpaceClaims.map(claim => claim.slug));
		for (const claim of readerSpaceClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "astronomy-and-space");
			assert.equal(claim.searchCutoffAt, spaceCheckedAt);
			assert.equal(claim.lastRetractionCheckAt, spaceCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, spaceCheckedAt);
			const prose = [claim.bottomLine, claim.editorSummary, ...claim.stableCore].join(" ");
			assert.ok(prose.split(/\s+/).length >= 150, claim.slug);
			assert.ok(claim.sources.length >= 2);
		}
		for (const claim of readerOriginsClaims) assert.equal(claim.searchCutoffAt, originsCheckedAt);
		for (const claim of readerPrivacyClaims) assert.equal(claim.searchCutoffAt, privacyCheckedAt);
	});

	it("assigns each review once to a deliberate collection", () => {
		const expected = {
			orbit: "earth-moon-and-planetary-perspective",
			phases: "earth-moon-and-planetary-perspective",
			retrograde: "earth-moon-and-planetary-perspective",
			lookback: "cosmic-history-expansion-and-horizons",
			darkEnergy: "cosmic-history-expansion-and-horizons",
			transit: "worlds-signals-and-extraordinary-claims",
			habitable: "worlds-signals-and-extraordinary-claims",
			color: "reading-astronomical-observations",
			lensing: "reading-astronomical-observations",
			brightness: "reading-astronomical-observations"
		};
		for (const [key, slug] of Object.entries(readerSpaceSlugs)) {
			assert.deepEqual(getAtlasCollectionMemberships("astronomy-and-space", slug).map(collection => collection.slug), [expected[key as keyof typeof expected]]);
		}
	});

	it("keeps geometric appearances separate from physical mechanisms", () => {
		const claimFor = (key: keyof typeof readerSpaceSlugs) => readerSpaceClaims.find(claim => claim.slug === readerSpaceSlugs[key])!;
		assert.match(claimFor("orbit").bottomLine, /support force/);
		assert.match(claimFor("orbit").bottomLine, /not perfect zero/);
		assert.match(claimFor("phases").bottomLine, /lunar eclipse, a different event/);
		assert.match(claimFor("retrograde").bottomLine, /moving Earth/);
		assert.match(claimFor("lookback").bottomLine, /present-day distance are different/);
		assert.match(claimFor("brightness").bottomLine, /luminous distant star can outshine/);
	});

	it("does not turn displays, radii or model labels into stronger discoveries", () => {
		const claimFor = (key: keyof typeof readerSpaceSlugs) => readerSpaceClaims.find(claim => claim.slug === readerSpaceSlugs[key])!;
		assert.match(claimFor("color").bottomLine, /not an unprocessed view/);
		assert.match(claimFor("transit").bottomLine, /not a unique interior or proof of an ocean/);
		assert.match(claimFor("habitable").bottomLine, /does not establish.*water.*atmosphere.*life/);
		assert.match(claimFor("lensing").bottomLine, /not mean the source was physically duplicated/);
		assert.match(claimFor("darkEnergy").uncertaintySummary!, /does not decide the latest/);
		assert.match(claimFor("darkEnergy").coiSummary!, /full acknowledgements were not audited/);
	});

	it("retains access, independence, dated-update and integrity qualifications", () => {
		assert.equal(readerSpaceSources.orbit.kind, "technical_reference");
		assert.equal(readerSpaceSources.color.kind, "technical_reference");
		assert.equal(readerSpaceSources.density.kind, "landmark_study");
		assert.equal(readerSpaceSources.desi.kind, "context");
		assert.ok(readerSpaceClaims.every(claim => claim.sources.every(source => source.kind !== "guideline" && source.kind !== "consensus_statement")));
		assert.match(readerSpaceSources.density.note, /one study/);
		assert.match(readerSpaceSources.supernovae.note, /full analysis and acknowledgements not audited/);
		assert.match(readerSpaceSources.desi.note, /Not an exhaustive review of later analyses/);
		assert.match(readerSpaceSources.imageProcessing.note, /unit typo.*not adopted/);
		for (const claim of readerSpaceClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised" && source.citationCheckedAt === spaceCheckedAt));
			assert.ok(claim.sources.every(source => source.statusSources!.includes(source.url!)));
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
		}
	});

	it("retrieves diagnostic questions without changing search ranking", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { orbit: "astronaut weightless free fall", phases: "moon phases shadow", retrograde: "retrograde planet orbit", lookback: "galaxy lookback time", color: "Webb infrared color images", transit: "exoplanet transit mass composition", habitable: "habitable zone guarantee", lensing: "gravitational lensing multiple images", darkEnergy: "dark energy physical cause", brightness: "brighter star closer parallax" };
		for (const [key, query] of Object.entries(queries)) assert.ok(search(query).some(result => result.claim.slug === readerSpaceSlugs[key as keyof typeof readerSpaceSlugs]), query);
	});
});
