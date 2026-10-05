import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { originsCheckedAt, readerOriginsClaims } from "../src/data/claim-expansion-reader-origins.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { readerSpaceClaims, spaceCheckedAt } from "../src/data/claim-expansion-reader-space.js";
import {
	readerWaterClaims,
	readerWaterGaps,
	readerWaterSlugs,
	readerWaterSources,
	waterCheckedAt
} from "../src/data/claim-expansion-reader-water.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

describe("flood, groundwater and coastal measurement expansion", () => {
	it("adds twenty distinct substantive reviews without changing earlier check dates", () => {
		assert.equal(readerWaterClaims.length, 20);
		assert.equal(new Set(readerWaterClaims.map(claim => claim.slug)).size, 20);
		assert.equal(new Set(readerWaterClaims.map(claim => claim.bottomLine)).size, 20);
		assert.deepEqual(
			readerWaterGaps.map(gap => gap.slug),
			readerWaterClaims.map(claim => claim.slug)
		);
		for (const claim of readerWaterClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.searchCutoffAt, waterCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, waterCheckedAt);
			assert.ok(
				[claim.bottomLine, claim.editorSummary, ...claim.stableCore].join(" ").split(/\s+/).length >= 150,
				claim.slug
			);
			assert.ok(claim.sources.length >= 2);
		}
		for (const [claims, checkedAt] of [
			[readerPrivacyClaims, privacyCheckedAt],
			[readerOriginsClaims, originsCheckedAt],
			[readerSpaceClaims, spaceCheckedAt]
		] as const) {
			for (const claim of claims) assert.equal(claim.searchCutoffAt, checkedAt);
		}
	});

	it("persists technical sources without fabricating expert approval or coded study design", () => {
		for (const entry of Object.values(readerWaterSources)) {
			const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
			assert.equal(source.validateSync(), undefined, entry.title);
			assert.equal(source.appraisal, "not_appraised");
			assert.equal(source.evidenceProfile.studyDesign, "not_coded");
			assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
			assert.ok(entry.kind !== "guideline" && entry.kind !== "consensus_statement");
			assert.equal(entry.citationCheckedAt, waterCheckedAt);
			assert.ok(entry.statusSources!.includes(entry.url!));
		}
		for (const claim of readerWaterClaims) {
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
		}
	});

	it("assigns every question once to a focused browse collection", () => {
		const expected = {
			floodProbability: "flood-probability-measurements-and-protection",
			stage: "flood-probability-measurements-and-protection",
			upstream: "flood-probability-measurements-and-protection",
			levees: "flood-probability-measurements-and-protection",
			recharge: "groundwater-pathways-head-and-supply",
			pumping: "groundwater-pathways-head-and-supply",
			artesian: "groundwater-pathways-head-and-supply",
			springs: "groundwater-pathways-head-and-supply",
			porosity: "groundwater-pathways-head-and-supply",
			exchange: "groundwater-pathways-head-and-supply",
			waves: "wave-patterns-and-water-motion",
			vertical: "wave-patterns-and-water-motion",
			cycles: "tidal-cycles-currents-and-storm-water",
			springTides: "tidal-cycles-currents-and-storm-water",
			neap: "tidal-cycles-currents-and-storm-water",
			tidalCurrent: "tidal-cycles-currents-and-storm-water",
			surge: "tidal-cycles-currents-and-storm-water",
			saltOrigin: "seawater-chemistry-and-depth-profiles",
			salinity: "seawater-chemistry-and-depth-profiles",
			temperature: "seawater-chemistry-and-depth-profiles"
		};
		for (const [key, slug] of Object.entries(readerWaterSlugs)) {
			const claim = readerWaterClaims.find(entry => entry.slug === slug)!;
			assert.deepEqual(
				getAtlasCollectionMemberships(claim.topicSlug, slug).map(collection => collection.slug),
				[expected[key as keyof typeof expected]]
			);
		}
	});

	it("keeps flood and groundwater mechanism conclusions bounded", () => {
		const claimFor = (key: keyof typeof readerWaterSlugs) =>
			readerWaterClaims.find(claim => claim.slug === readerWaterSlugs[key])!;
		assert.match(claimFor("floodProbability").bottomLine, /1%.*given year/);
		assert.match(claimFor("stage").bottomLine, /rating curve/);
		assert.match(claimFor("recharge").bottomLine, /not automatically aquifer recharge/);
		assert.match(claimFor("pumping").bottomLine, /not identical or instantaneous/);
		assert.match(claimFor("artesian").bottomLine, /above the outlet/);
		assert.match(claimFor("springs").bottomLine, /not proof of an unlimited reserve/);
		assert.match(claimFor("porosity").bottomLine, /permeability.*connected pathways/);
		assert.match(claimFor("exchange").bottomLine, /direction can change over time/);
		assert.match(claimFor("upstream").bottomLine, /sky is clear/);
		assert.match(claimFor("levees").bottomLine, /residual risk/);
	});

	it("retains ocean qualifications instead of importing simplified teaching errors", () => {
		const claimFor = (key: keyof typeof readerWaterSlugs) =>
			readerWaterClaims.find(claim => claim.slug === readerWaterSlugs[key])!;
		assert.match(claimFor("waves").bottomLine, /not a zero-transport rule.*Stokes drift/);
		assert.match(claimFor("cycles").bottomLine, /diurnal, semidiurnal or mixed/);
		assert.match(claimFor("springTides").bottomLine, /not only during the spring season/);
		assert.match(claimFor("neap").bottomLine, /Both high and low tides/);
		assert.match(claimFor("tidalCurrent").bottomLine, /No universal timing rule/);
		assert.match(claimFor("surge").bottomLine, /total water level/);
		assert.match(claimFor("vertical").bottomLine, /also moves vertically/);
		assert.match(claimFor("saltOrigin").bottomLine, /others are removed/);
		assert.match(claimFor("salinity").bottomLine, /not every sample/);
		assert.match(claimFor("temperature").bottomLine, /not every depth/);
		assert.match(readerWaterSources.salt.note, /erroneous.*not adopted/);
		assert.match(readerWaterSources.salinity.note, /PSU.*not adopted/);
	});

	it("retains abstract-only, institutional dependence and access limitations", () => {
		assert.equal(readerWaterSources.capture.kind, "context");
		assert.equal(readerWaterSources.drift.kind, "context");
		assert.match(readerWaterSources.capture.note, /Full paper.*not audited/);
		assert.match(readerWaterSources.drift.note, /Full analysis.*not audited/);
		assert.match(readerWaterSources.aquifer.note, /direct fetches were denied/);
		assert.match(readerWaterSources.vents.note, /No biological methods/);
		assert.ok(
			readerWaterClaims.every(claim =>
				claim.exclusionRules!.some(rule => rule.includes("navigation") && rule.includes("biological"))
			)
		);
	});

	it("retrieves diagnostic water questions without tuning the frozen benchmark or ranking", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = {
			floodProbability: "100 year flood",
			stage: "river level discharge",
			recharge: "rain aquifer recharge",
			pumping: "pumping streamflow depletion",
			artesian: "flowing artesian well",
			springs: "spring unlimited groundwater",
			porosity: "porosity permeability",
			exchange: "gaining losing stream",
			upstream: "flood without local rain",
			levees: "levee residual risk",
			waves: "wave Stokes drift",
			cycles: "mixed tide cycles",
			springTides: "spring tide season",
			neap: "neap low tide",
			tidalCurrent: "high tide maximum current",
			surge: "storm surge wind category",
			vertical: "vertical upwelling current",
			saltOrigin: "ocean salt hydrothermal",
			salinity: "seawater salinity variation",
			temperature: "ocean thermocline surface temperature"
		};
		for (const [key, query] of Object.entries(queries)) {
			assert.ok(
				search(query).some(
					result => result.claim.slug === readerWaterSlugs[key as keyof typeof readerWaterSlugs]
				),
				query
			);
		}
	});
});
