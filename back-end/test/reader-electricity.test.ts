import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { electricityCheckedAt, readerElectricityClaims, readerElectricityGaps, readerElectricitySlugs, readerElectricitySources } from "../src/data/claim-expansion-reader-electricity.js";
import { originsCheckedAt, readerOriginsClaims } from "../src/data/claim-expansion-reader-origins.js";
import { physicsCheckedAt, readerPhysicsClaims } from "../src/data/claim-expansion-reader-physics.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { probabilityCheckedAt, readerProbabilityClaims } from "../src/data/claim-expansion-reader-probability.js";
import { readerSpaceClaims, spaceCheckedAt } from "../src/data/claim-expansion-reader-space.js";
import { readerWaterClaims, waterCheckedAt } from "../src/data/claim-expansion-reader-water.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerElectricityClaims.find(claim => claim.slug === readerElectricitySlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");

describe("electrical-science reader expansion", () => {
	it("adds twenty unique substantial canonical questions with stable identities and real dates", () => {
		assert.equal(readerElectricityClaims.length, 20);
		for (const field of ["slug", "title", "bottomLine"] as const) assert.equal(new Set(readerElectricityClaims.map(claim => claim[field])).size, 20);
		assert.equal(new Set(readerElectricityClaims.map(claim => claim.readerAnnouncement!.id)).size, 20);
		assert.deepEqual(readerElectricityGaps.map(gap => gap.slug), readerElectricityClaims.map(claim => claim.slug));
		assert.ok(Date.parse(electricityCheckedAt) <= Date.now());
		for (const claim of readerElectricityClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "physics-and-chemistry");
			assert.equal(claim.searchCutoffAt, electricityCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, electricityCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^e6ca9061-31de-4dc5-9310-9b9b22f8b0\d\d$/);
			assert.ok([claim.bottomLine, ...claim.stableCore, claim.editorSummary].join(" ").split(/\s+/).length >= 200);
			assert.ok(claim.sources.length >= 2);
		}
	});

	it("does not move any prior cohort's source-check dates", () => {
		for (const [claims, checkedAt] of [[readerPrivacyClaims, privacyCheckedAt], [readerOriginsClaims, originsCheckedAt], [readerSpaceClaims, spaceCheckedAt], [readerWaterClaims, waterCheckedAt], [readerPhysicsClaims, physicsCheckedAt], [readerProbabilityClaims, probabilityCheckedAt]] as const) {
			for (const claim of claims) assert.equal(claim.searchCutoffAt, checkedAt);
		}
	});

	it("validates actual source schemas and retains unappraised technical-reference provenance", async () => {
		assert.equal(Object.keys(readerElectricitySources).length, 22);
		for (const claim of readerElectricityClaims) {
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.evidenceSummaries![0]!.magnitude!, /not an observed device effect/);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), electricityCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
				assert.ok(!entry.url!.includes("consensus.app"));
			}
		}
		assert.match(readerElectricitySources.transformers.note!, /safety assurances are not adopted/);
		assert.match(readerElectricitySources.fieldEnergy.note!, /not establish one universal energy-flow path/);
	});

	it("places each question in exactly one intentional electrical collection", () => {
		const groups = {
			"electrical-quantities-and-ratings": ["quantities", "terminal", "capacity", "energyUnits", "heating"],
			"charge-flow-and-circuit-models": ["conservation", "propagation", "ohmic", "topology", "drops", "field"],
			"alternating-current-and-energy-transfer": ["apparent", "rms", "alternation"],
			"storage-fields-and-induction": ["charged", "capacitorEnergy", "inductor", "staticFlux", "magneticWork", "transformer"]
		};
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("physics-and-chemistry", readerElectricitySlugs[key]!).map(collection => collection.slug), [group]);
		}
	});

	it("independently recomputes charge, power and energy unit examples", () => {
		assert.equal(1 * 5, 5);
		assert.match(textFor("quantities"), /1 A.*5 V.*5 W/);
		assert.equal(2 * 3600, 7200);
		assert.equal(2 * 3, 6);
		assert.equal(2 * 12, 24);
		assert.match(textFor("capacity"), /6 Wh at 3 V and 24 Wh at 12 V/);
		assert.match(textFor("capacity"), /7,200 C/);
		assert.equal(10 * 3, 30);
		assert.equal(30 * 3600, 108000);
		assert.match(textFor("energyUnits"), /30 Wh.*108,000 J/);
	});

	it("independently verifies topology, terminal drops and source/load energy balance", () => {
		assert.equal(6 + 6, 12);
		assert.equal(1 / (1 / 6 + 1 / 6), 3);
		assert.match(textFor("topology"), /12 ohms in series and 3 ohms in parallel/);
		const seriesCurrent = 12 / (3 + 9);
		assert.equal(seriesCurrent, 1);
		assert.equal(seriesCurrent * 3 + seriesCurrent * 9, 12);
		assert.match(textFor("drops"), /drops are 3 V and 9 V/);
		const loadedCurrent = 12 / (1 + 5);
		assert.equal(loadedCurrent, 2);
		assert.equal(12 - loadedCurrent * 1, 10);
		assert.equal(12 * loadedCurrent, loadedCurrent ** 2 * 1 + loadedCurrent ** 2 * 5);
		assert.match(textFor("terminal"), /24 W.*20 W.*4 W/);
		assert.match(textFor("conservation"), /2 A entering also has 2 A leaving/);
	});

	it("independently checks linear response and current-squared dissipation", () => {
		assert.equal(1 / 4, 0.25);
		assert.equal(2 / 4, 0.5);
		const quadraticCurrent = (voltage: number) => voltage ** 2;
		assert.equal(quadraticCurrent(2) / quadraticCurrent(1), 4);
		assert.notEqual(1 / quadraticCurrent(1), 2 / quadraticCurrent(2));
		assert.match(textFor("ohmic"), /fourfold current when voltage doubles/);
		assert.equal(1 ** 2 * 2, 2);
		assert.equal(2 ** 2 * 2, 8);
		assert.match(textFor("heating"), /1 A gives 2 W and 2 A gives 8 W/);
		assert.match(textFor("heating"), /not predict the final temperature/);
	});

	it("checks RMS, sinusoidal power factor and ideal transformer accounting without conflating averages", () => {
		assert.equal(2 ** 2 * 10, 40);
		assert.match(textFor("rms"), /40 W average heating/);
		const samples = Array.from({ length: 4096 }, (_, index) => 2 * Math.sqrt(2) * Math.sin(2 * Math.PI * index / 4096));
		const signedMean = samples.reduce((total, value) => total + value, 0) / samples.length;
		const rootMeanSquare = Math.sqrt(samples.reduce((total, value) => total + value ** 2, 0) / samples.length);
		assert.ok(Math.abs(signedMean) < 1e-12);
		assert.ok(Math.abs(rootMeanSquare - 2) < 1e-12);
		assert.equal(10 * 2, 20);
		assert.ok(Math.abs(10 * 2 * Math.cos(Math.PI / 3) - 10) < 1e-12);
		assert.match(textFor("apparent"), /20 VA.*0\.5 gives 10 W/);
		assert.match(textFor("apparent"), /distorted waveforms can require broader accounting/);
		assert.equal(4 * 3, 12 * 1);
		assert.match(textFor("transformer"), /both are 12 W/);
		assert.match(textFor("alternation"), /Zero net signed charge transfer.*does not imply zero delivered energy/);
	});

	it("independently recomputes ideal storage states and their zero-rate distinctions", () => {
		const capacitance = 0.002;
		const voltage = 3;
		const separatedCharge = capacitance * voltage;
		assert.equal(separatedCharge, 0.006);
		assert.ok(Math.abs(0.5 * capacitance * voltage ** 2 - 0.009) < 1e-15);
		assert.ok(Math.abs(separatedCharge * voltage - 0.018) < 1e-15);
		assert.match(textFor("charged"), /6 mC of separated plate charge/);
		assert.match(textFor("capacitorEnergy"), /9 mJ, not.*18 mJ/);
		assert.match(textFor("charged"), /approaches zero asymptotically/);
		assert.equal(0.5 * 0.4 * 1 ** 2, 0.2);
		assert.equal(0.4 * 0, 0);
		assert.match(textFor("inductor"), /stores 0\.2 J/);
		assert.match(textFor("inductor"), /winding resistance/);
	});

	it("checks constant-flux induction and point-charge magnetic work with explicit scope", () => {
		assert.equal((0.02 - 0.02) / 2, 0);
		assert.match(textFor("staticFlux"), /time derivative is zero even though the flux is not zero/);
		const velocity = [3, 4, 5];
		const magneticField = [2, -1, 6];
		const crossProduct = [velocity[1]! * magneticField[2]! - velocity[2]! * magneticField[1]!, velocity[2]! * magneticField[0]! - velocity[0]! * magneticField[2]!, velocity[0]! * magneticField[1]! - velocity[1]! * magneticField[0]!];
		assert.equal(crossProduct.reduce((power, component, index) => power + component * velocity[index]!, 0), 0);
		assert.match(textFor("magneticWork"), /stated reference frame/);
		assert.match(textFor("magneticWork"), /extended magnetic objects need a different analysis/);
		assert.match(textFor("field"), /Steady current is not electrostatic equilibrium/);
		assert.match(textFor("propagation"), /not.*one fixed signal speed/);
	});

	it("finds all diagnostic terminology without changing the ranker or frozen usefulness set", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { quantities: "amps volts electrical quantity", conservation: "current used up resistor", propagation: "electron drift signal speed", ohmic: "Ohm law constant resistance", topology: "resistors series parallel total resistance", drops: "series same voltage", terminal: "battery terminal unloaded voltage", capacity: "amp hour battery energy", energyUnits: "watts watt hours electricity", apparent: "AC average real power", rms: "AC zero average heating", alternation: "electrons AC source load cycle", charged: "capacitor charged without current", capacitorEnergy: "capacitor stored energy charge voltage", inductor: "inductor unchanged DC current", staticFlux: "stationary magnet stationary loop", magneticWork: "magnetic Lorentz force kinetic energy", transformer: "step up transformer electrical power", heating: "doubling current heating power", field: "electric field current carrying metal" };
		const missingQueries = Object.entries(queries).filter(([key, query]) => !search(query).some(result => result.claim.slug === readerElectricitySlugs[key]));
		assert.deepEqual(missingQueries, []);
	});
});
