import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { originsCheckedAt, readerOriginsClaims } from "../src/data/claim-expansion-reader-origins.js";
import { physicsCheckedAt, readerPhysicsClaims, readerPhysicsGaps, readerPhysicsSlugs, readerPhysicsSources } from "../src/data/claim-expansion-reader-physics.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { readerSpaceClaims, spaceCheckedAt } from "../src/data/claim-expansion-reader-space.js";
import { readerWaterClaims, waterCheckedAt } from "../src/data/claim-expansion-reader-water.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerPhysicsClaims.find(claim => claim.slug === readerPhysicsSlugs[key])!;

describe("everyday heat and optical measurement expansion", () => {
	it("adds twenty distinct substantive reviews with stable announcements", () => {
		assert.equal(readerPhysicsClaims.length, 20);
		assert.equal(new Set(readerPhysicsClaims.map(claim => claim.slug)).size, 20);
		assert.equal(new Set(readerPhysicsClaims.map(claim => claim.bottomLine)).size, 20);
		assert.equal(new Set(readerPhysicsClaims.map(claim => claim.readerAnnouncement!.id)).size, 20);
		assert.deepEqual(readerPhysicsGaps.map(gap => gap.slug), readerPhysicsClaims.map(claim => claim.slug));
		for (const claim of readerPhysicsClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.searchCutoffAt, physicsCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, physicsCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^[0-9a-f-]{36}$/);
			assert.ok([claim.bottomLine, claim.editorSummary, ...claim.stableCore].join(" ").split(/\s+/).length >= 150, claim.slug);
			assert.ok(claim.sources.length >= 2);
		}
	});

	it("does not advance earlier cohorts' research cutoffs", () => {
		for (const [claims, checkedAt] of [[readerPrivacyClaims, privacyCheckedAt], [readerOriginsClaims, originsCheckedAt], [readerSpaceClaims, spaceCheckedAt], [readerWaterClaims, waterCheckedAt]] as const) {
			for (const claim of claims) assert.equal(claim.searchCutoffAt, checkedAt);
		}
	});

	it("persists honest method references without expert appraisal or study-design fabrication", () => {
		for (const claim of readerPhysicsClaims) {
			assert.equal(claim.sources.filter(entry => entry.isAnchor).length, 1);
			assert.equal(claim.sources[0]!.kind, "technical_reference");
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				assert.equal(source.validateSync(), undefined, entry.title);
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(entry.citationCheckedAt, physicsCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
			}
		}
	});

	it("assigns each new review once to an intentional physics collection", () => {
		const groups: Record<string, string[]> = {
			"temperature-energy-and-phase-changes": ["energy", "heat", "boiling", "evaporation", "phase"],
			"thermal-paths-and-surface-measurements": ["touch", "vacuum", "insulation", "infrared", "walls"],
			"optical-paths-images-and-resolution": ["resolution", "mirror", "depth", "concave", "speed"],
			"spectra-scattering-and-observer-dependent-color": ["white", "prism", "rainbow", "polarization", "sky"]
		};
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("physics-and-chemistry", readerPhysicsSlugs[key]!).map(collection => collection.slug), [group]);
		}
	});

	it("retains the conditional thermal and optical models", () => {
		assert.match(claimFor("energy").bottomLine, /Mass, material, phase/);
		assert.match(claimFor("heat").bottomLine, /energy transferred/);
		assert.match(claimFor("touch").bottomLine, /transient heat exchange/);
		assert.match(claimFor("boiling").bottomLine, /atmospheric pressure/);
		assert.match(claimFor("phase").bottomLine, /pure substance at fixed pressure/);
		assert.match(claimFor("vacuum").bottomLine, /radiative exchange does not/);
		assert.match(claimFor("walls").bottomLine, /opaque in the camera's measurement band/);
		assert.match(claimFor("mirror").bottomLine, /another lens/);
		assert.match(claimFor("depth").bottomLine, /near-normal view/);
		assert.match(claimFor("speed").bottomLine, /phase speed.*group or information velocity/);
		assert.match(claimFor("concave").bottomLine, /virtual objects.*different cases/);
		assert.match(claimFor("polarization").bottomLine, /not.*guarantee of ultraviolet protection/);
		assert.match(claimFor("resolution").stableCore.join(" "), /not.*absolute limit/);
	});

	it("retains source limitations and does not repeat teaching shortcuts as universal evidence", () => {
		assert.equal(readerPhysicsSources.emissivity.kind, "context");
		assert.match(readerPhysicsSources.emissivity.note, /greater variation/);
		assert.match(readerPhysicsSources.emissivity.note, /funding and conflicts were not audited/);
		assert.match(readerPhysicsSources.walls.note, /commercial interest/);
		assert.match(readerPhysicsSources.dispersion.note, /total-internal-reflection.*not assumed/);
		assert.match(readerPhysicsSources.visible.note, /peak-color.*not adopted/);
		assert.match(readerPhysicsSources.radiation.note, /greenhouse.*not used/);
		for (const claim of readerPhysicsClaims) assert.ok(claim.exclusionRules!.some(rule => rule.includes("biological procedure") && rule.includes("evasion")));
	});

	it("finds all twenty diagnostic questions without changing ranking or the sealed evaluation", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = {
			energy: "same temperature internal energy",
			heat: "heat stored substance",
			touch: "metal wood feels cold",
			boiling: "water boiling pressure",
			evaporation: "evaporation below boiling",
			phase: "latent heat temperature plateau",
			vacuum: "heat transfer vacuum",
			insulation: "insulation generate heat",
			infrared: "infrared thermometer emissivity",
			walls: "thermal camera see through walls",
			white: "white light wavelength",
			prism: "prism colors dispersion",
			resolution: "magnification resolution detail",
			mirror: "plane mirror virtual image screen",
			depth: "apparent depth refraction water",
			rainbow: "rainbow observer location",
			polarization: "polarizing sunglasses reflected light",
			speed: "speed light glass vacuum",
			concave: "diverging lens real object",
			sky: "blue sky ocean reflection"
		};
		for (const [key, query] of Object.entries(queries)) assert.ok(search(query).slice(0, 5).some(result => result.claim.slug === readerPhysicsSlugs[key]), query);
	});
});
