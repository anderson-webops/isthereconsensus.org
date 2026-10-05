import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { electricityCheckedAt, readerElectricityClaims } from "../src/data/claim-expansion-reader-electricity.js";
import { mechanicsCheckedAt, readerMechanicsClaims, readerMechanicsGaps, readerMechanicsSlugs, readerMechanicsSources } from "../src/data/claim-expansion-reader-mechanics.js";
import { originsCheckedAt, readerOriginsClaims } from "../src/data/claim-expansion-reader-origins.js";
import { physicsCheckedAt, readerPhysicsClaims } from "../src/data/claim-expansion-reader-physics.js";
import { privacyCheckedAt, readerPrivacyClaims } from "../src/data/claim-expansion-reader-privacy.js";
import { probabilityCheckedAt, readerProbabilityClaims } from "../src/data/claim-expansion-reader-probability.js";
import { readerSpaceClaims, spaceCheckedAt } from "../src/data/claim-expansion-reader-space.js";
import { readerWaterClaims, waterCheckedAt } from "../src/data/claim-expansion-reader-water.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerMechanicsClaims.find(claim => claim.slug === readerMechanicsSlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");
const near = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} differs from ${expected}`);

describe("mechanical-model reader expansion", () => {
	it("adds thirty-two unique substantial questions with stable identities and honest dates", () => {
		assert.equal(readerMechanicsClaims.length, 32);
		for (const field of ["slug", "title", "bottomLine"] as const) assert.equal(new Set(readerMechanicsClaims.map(claim => claim[field])).size, 32);
		assert.equal(new Set(readerMechanicsClaims.map(claim => claim.readerAnnouncement!.id)).size, 32);
		assert.deepEqual(readerMechanicsGaps.map(gap => gap.slug), readerMechanicsClaims.map(claim => claim.slug));
		assert.ok(Date.parse(mechanicsCheckedAt) <= Date.now());
		for (const claim of readerMechanicsClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "physics-and-chemistry");
			assert.equal(claim.searchCutoffAt, mechanicsCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, mechanicsCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^a82e7a41-60d8-4fe3-b3b5-921ca00d90\d\d$/);
			assert.ok([claim.bottomLine, ...claim.stableCore, claim.editorSummary].join(" ").split(/\s+/).length >= 230);
			assert.ok(claim.sources.length >= 2);
		}
	});

	it("preserves every previous expansion cohort's source-check dates", () => {
		for (const [claims, checkedAt] of [[readerPrivacyClaims, privacyCheckedAt], [readerOriginsClaims, originsCheckedAt], [readerSpaceClaims, spaceCheckedAt], [readerWaterClaims, waterCheckedAt], [readerPhysicsClaims, physicsCheckedAt], [readerProbabilityClaims, probabilityCheckedAt], [readerElectricityClaims, electricityCheckedAt]] as const) {
			for (const claim of claims) assert.equal(claim.searchCutoffAt, checkedAt);
		}
	});

	it("validates actual source schemas without inventing expert or experimental appraisal", async () => {
		assert.equal(Object.keys(readerMechanicsSources).length, 39);
		for (const claim of readerMechanicsClaims) {
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.evidenceSummaries![0]!.magnitude!, /not an observed effect size/);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), mechanicsCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
				assert.ok(!entry.url!.includes("consensus.app"));
			}
		}
		assert.match(readerMechanicsSources.pressure.url!, /11-3-pressure$/);
		assert.match(readerMechanicsSources.si.note!, /not an independent experimental test/);
		assert.match(readerMechanicsSources.momentumLecture.note!, /Explosive demonstrations.*not reproduced/);
	});

	it("places every new question in exactly one of seven intentional collections", () => {
		const groups = { "motion-and-contact-forces": ["distance", "speed", "netForce", "massWeight", "thirdLaw", "normal", "staticFriction"], "curved-motion-and-linear-oscillation": ["circularSpeed", "centripetal", "springFrequency"], "mechanical-work-and-energy-balances": ["kineticScaling", "negativeWork", "closedPathWork", "staticWork", "mechanicalEnergy"], "momentum-and-collision-models": ["collisionEnergy", "elasticExchange", "impulse", "centerOfMass"], "torque-inertia-and-rotational-energy": ["torque", "torqueUnits", "inertia", "angularSpeed", "rollingEnergy"], "fluid-quantities-and-static-pressure": ["pressure", "hydrostatic", "hydraulic", "viscosity"], "buoyancy-and-flow-balances": ["buoyancy", "floating", "bernoulli", "continuity"] };
		assert.equal(Object.values(groups).flat().length, 32);
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("physics-and-chemistry", readerMechanicsSlugs[key]!).map(collection => collection.slug), [group]);
		}
	});

	it("independently checks path lengths and averaging before taking magnitudes", () => {
		assert.equal(7 + 2, 9);
		assert.equal(7 - 2, 5);
		assert.equal((4 + 4) / 4, 2);
		assert.equal((4 - 4) / 4, 0);
		assert.match(textFor("distance"), /9 m traveled.*positive 5 m/);
		assert.match(textFor("speed"), /average speed is 2 m\/s.*average velocity is zero/);
		assert.match(textFor("speed"), /instantaneous speed.*magnitude of instantaneous velocity/);
	});

	it("checks force pairs, gravity, normal force and actual versus maximum static friction", () => {
		assert.equal(2 * 8, 16);
		assert.equal(2 * 3, 6);
		assert.match(textFor("massWeight"), /16 N.*6 N/);
		assert.equal(6 / 2, 3);
		assert.equal(6 / 4, 1.5);
		assert.match(textFor("thirdLaw"), /3 and 1\.5 m\/s/);
		assert.equal(2 * (8 + 2), 20);
		assert.match(textFor("normal"), /20 N.*16 N/);
		assert.equal(0.4 * 20, 8);
		assert.ok(3 < 8);
		assert.match(textFor("staticFriction"), /8 N limit.*only 3 N/);
		assert.match(textFor("netForce"), /inertial frame/);
	});

	it("checks circular acceleration without adding a second centripetal interaction", () => {
		assert.equal(4 ** 2 / 2, 8);
		assert.equal(3 * 4 ** 2 / 2, 24);
		assert.match(textFor("circularSpeed"), /8 m\/s squared/);
		assert.match(textFor("centripetal"), /24 N.*double-count/);
		assert.match(textFor("centripetal"), /not an additional kind of interaction/);
	});

	it("independently sums signed work along a path and at application points", () => {
		assert.equal(-4 * 3, -12);
		assert.equal(-2 * 3 + -2 * 3, -12);
		assert.equal(9 * 0, 0);
		assert.match(textFor("negativeWork"), /negative 12 J/);
		assert.match(textFor("closedPathWork"), /negative 12 J.*starting point/);
		assert.match(textFor("closedPathWork"), /conservative force/);
		assert.match(textFor("staticWork"), /does not mean an entire device or system uses no energy/);
	});

	it("recomputes kinetic scaling, complete energy accounting and both collision examples", () => {
		assert.equal(0.5 * 2 * 3 ** 2, 9);
		assert.equal(0.5 * 2 * 6 ** 2, 36);
		assert.equal(4 + 5, 9);
		assert.match(textFor("kineticScaling"), /27 J change/);
		assert.match(textFor("mechanicalEnergy"), /4 J of mechanical energy and 5 J/);
		const initialMomentum = 2 * 4 + 2 * 0;
		const finalVelocity = initialMomentum / (2 + 2);
		assert.equal(finalVelocity, 2);
		assert.equal(2 * finalVelocity + 2 * finalVelocity, initialMomentum);
		assert.equal(0.5 * 2 * 4 ** 2, 16);
		assert.equal(0.5 * 4 * finalVelocity ** 2, 8);
		assert.match(textFor("collisionEnergy"), /16 J to 8 J/);
		assert.match(textFor("collisionEnergy"), /stored internal energy can also be released/);
		assert.equal(0.5 * 1 * 3 ** 2 + 0.5 * 1 * 0 ** 2, 4.5);
		assert.equal(1 * 3 + 1 * 0, 1 * 0 + 1 * 3);
		assert.match(textFor("elasticExchange"), /4\.5 J.*allocation.*changes/);
	});

	it("integrates constructed force pulses and distinguishes constant center-of-mass motion from rest", () => {
		const triangularImpulse = (peak: number, duration: number) => 0.5 * peak * duration;
		assert.equal(triangularImpulse(6, 0.5), 1.5);
		assert.equal(triangularImpulse(6, 1), 3);
		assert.match(textFor("impulse"), /1\.5 N s and 3 N s/);
		assert.equal(8 / 4, 2);
		assert.match(textFor("centerOfMass"), /8 kg m\/s.*4 kg.*2 m\/s/);
		assert.match(textFor("centerOfMass"), /constant set of masses/);
	});

	it("checks torque geometry, dimensions, changing inertia and rolling-energy allocation", () => {
		assert.equal(3 * 2, 6);
		assert.equal(3 * 0, 0);
		assert.match(textFor("torque"), /6 N m/);
		assert.match(textFor("torqueUnits"), /3 N m through 2 radians does 6 J/);
		assert.match(textFor("torqueUnits"), /axial vector/);
		assert.equal(2 * 1 ** 2, 2);
		assert.equal(2 * 2 ** 2, 8);
		assert.match(textFor("inertia"), /2 kg m squared.*8 kg m squared/);
		const initialInertia = 4;
		const finalInertia = 2;
		const angularMomentum = 8;
		const initialAngularSpeed = angularMomentum / initialInertia;
		const finalAngularSpeed = angularMomentum / finalInertia;
		assert.equal(initialAngularSpeed, 2);
		assert.equal(finalAngularSpeed, 4);
		assert.equal(0.5 * initialInertia * initialAngularSpeed ** 2, 8);
		assert.equal(0.5 * finalInertia * finalAngularSpeed ** 2, 16);
		assert.match(textFor("angularSpeed"), /extra 8 J must come from work/);
		assert.equal(0.5 * 2 * 2 ** 2 + 0.5 * 1 * 2 ** 2, 6);
		assert.equal(1 * 2, 2);
		assert.match(textFor("rollingEnergy"), /4 J translational plus 2 J rotational/);
	});

	it("recomputes pressure, static depth, hydraulic work and floating equilibrium with boundary limits", () => {
		assert.equal(9 / 3, 3);
		near(500 * 8 * 0.3, 1200);
		assert.match(textFor("pressure"), /3 pascals/);
		assert.match(textFor("hydrostatic"), /1,200 Pa.*surface pressure/);
		assert.equal(20 * 0.5, 100 * 0.1);
		assert.equal(20 * 5, 100);
		assert.match(textFor("hydraulic"), /Both.*10 J/);
		near(500 * 8 * 0.004, 16);
		assert.equal(2 * 8, 16);
		assert.match(textFor("buoyancy"), /16 N buoyant force/);
		assert.match(textFor("floating"), /They balance/);
		assert.match(textFor("floating"), /Surface tension, external support/);
	});

	it("checks scoped flow, property units and linear-spring timing without universalizing them", () => {
		near(0.5 * 2 * (4 ** 2 - 2 ** 2), 12);
		near(0.06 / 0.02, 3);
		near(0.06 / 0.03, 2);
		assert.match(textFor("bernoulli"), /12 Pa pressure decrease/);
		assert.match(textFor("bernoulli"), /different streamlines need not share the same constant/);
		assert.match(textFor("continuity"), /section-average normal speed/);
		assert.match(textFor("viscosity"), /kilograms per cubic meter versus pascal seconds/);
		assert.match(textFor("viscosity"), /dynamic viscosity divided by density/);
		const angularFrequency = Math.sqrt(100 / 4);
		assert.equal(angularFrequency, 5);
		near(2 * Math.PI / angularFrequency, 2 * Math.PI / 5);
		assert.match(textFor("springFrequency"), /two pi divided by five seconds/);
		assert.match(textFor("springFrequency"), /Nonlinear restoring forces/);
	});

	it("retrieves all diagnostic concepts without altering the ranker or frozen usefulness evaluation", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const missing = readerMechanicsClaims.filter(claim => !search(claim.misconceptionTags![0]!).some(result => result.claim.slug === claim.slug)).map(claim => claim.slug);
		assert.deepEqual(missing, []);
	});
});
