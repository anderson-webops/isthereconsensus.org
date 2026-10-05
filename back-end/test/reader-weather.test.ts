import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { readerWeatherClaims, readerWeatherGaps, readerWeatherSlugs, readerWeatherSources, weatherCheckedAt } from "../src/data/claim-expansion-reader-weather.js";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerWeatherClaims.find(claim => claim.slug === readerWeatherSlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");

describe("weather quantities and measurement expansion", () => {
	it("adds eighteen substantive unique questions with stable honest dates, without counting old reviews or guides", () => {
		assert.equal(readerWeatherClaims.length, 18);
		for (const field of ["slug", "title", "bottomLine"] as const) assert.equal(new Set(readerWeatherClaims.map(claim => claim[field])).size, 18);
		assert.equal(new Set(readerWeatherClaims.map(claim => claim.readerAnnouncement!.id)).size, 18);
		assert.deepEqual(readerWeatherGaps.map(gap => gap.slug), readerWeatherClaims.map(claim => claim.slug));
		assert.ok(Date.parse(weatherCheckedAt) <= Date.now());
		for (const claim of readerWeatherClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "earth-and-geoscience");
			assert.equal(claim.searchCutoffAt, weatherCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, weatherCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^0aa86e93-24ea-46fc-8be9-47d3a66900\d\d$/);
			assert.ok([claim.bottomLine, ...claim.stableCore, claim.editorSummary].join(" ").split(/\s+/).length >= 250);
			assert.equal(claim.sources.length, 2);
		}
		assert.equal(defaultClaims.filter(claim => !readerExpansionClaims.some(addition => addition.slug === claim.slug)).length, 800);
	});

	it("validates actual schemas while retaining technical source classification and shared provenance", async () => {
		assert.equal(Object.keys(readerWeatherSources).length, 23);
		for (const claim of readerWeatherClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.independenceSummary!, /share NOAA institutional provenance/);
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), weatherCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
			}
		}
		assert.equal(readerWeatherSources.precip.year, 2025);
		assert.equal(readerWeatherSources.ratio.year, undefined);
		assert.ok(Object.values(readerWeatherSources).every(source => !source.url!.includes("consensus.app")));
	});

	it("checks event thresholds rather than treating likelihood as duration or amount", () => {
		const likelyLight = [0, 0, ...Array.from({ length: 8 }).fill(0.02)];
		const lessLikelyHeavy = [...Array.from({ length: 7 }).fill(0), 1, 1, 1];
		assert.equal(likelyLight.filter(amount => amount >= 0.01).length, 8);
		assert.equal(lessLikelyHeavy.filter(amount => amount >= 0.01).length, 3);
		assert.equal(likelyLight.filter(amount => amount >= 0.5).length, 0);
		assert.equal(lessLikelyHeavy.filter(amount => amount >= 0.5).length, 3);
		assert.match(textFor("chance"), /threshold.*valid period|point.*valid period/);
		assert.match(textFor("amount"), /Conditional and unconditional amounts/);
		assert.match(readerWeatherSources.amount.note, /not assumed universal/);
	});

	it("keeps humidity denominators, saturation, condensation and surface measurement distinct", () => {
		const vaporPressure = 10;
		const warmerSaturationReference = 20;
		const coolerSaturationReference = 15;
		assert.ok(vaporPressure / coolerSaturationReference > vaporPressure / warmerSaturationReference);
		assert.match(textFor("cooling"), /unsaturated|Unsaturated/);
		assert.match(textFor("cooling"), /vapor amount no longer remains unchanged/);
		assert.match(textFor("equalHumidity"), /pressure information/);
		assert.match(textFor("saturation"), /not.*rain detector/);
		assert.match(textFor("dew"), /not every wet morning surface/);
		assert.match(textFor("frost"), /surface that itself remains above/);
	});

	it("preserves physical exposure-index limits without inventing personal safety thresholds", () => {
		const ambient = 4;
		const initialObject = 20;
		const objectAfter = (rate: number, time: number) => ambient + (initialObject - ambient) * Math.exp(-rate * time);
		assert.ok(objectAfter(2, 1) < objectAfter(1, 1));
		assert.ok(objectAfter(2, 1) > ambient);
		assert.match(textFor("windChill"), /other processes, such as radiation or evaporation/);
		assert.match(textFor("heatIndex"), /not identical to the ordinary psychrometric wet-bulb temperature/);
		assert.match(textFor("heatIndex"), /different scale/);
		for (const key of ["windChill", "heatIndex"]) assert.match(textFor(key), /current official/);
	});

	it("separates snow density, warm-layer arrival, contact freezing and hail growth", () => {
		assert.match(textFor("snowRatio"), /not adopted.*constant/);
		assert.match(textFor("snowAboveFreezing"), /only one sufficient arrangement/);
		assert.match(textFor("snowAboveFreezing"), /does not guarantee.*accumulate/);
		assert.match(textFor("sleet"), /word identically/);
		assert.match(textFor("sleet"), /remain supercooled until contact/);
		assert.match(textFor("hail"), /not.*every hailstone repeatedly cycles/);
		assert.match(readerWeatherSources.profile.note, /road-icing temperatures.*not universal/);
	});

	it("keeps observation targets, datums and three-dimensional map boundaries separate", () => {
		assert.match(textFor("radarGround"), /reverse implication also fails/);
		assert.match(textFor("radarGround"), /not a rain gauge/);
		assert.match(textFor("radarTargets"), /modern precipitation product need not expose every raw return/);
		assert.match(textFor("satellite"), /not automatically.*air thermometer/);
		assert.match(textFor("satellite"), /colder indicated temperatures do not always correspond to precipitation/);
		assert.match(textFor("pressure"), /height at which a selected pressure occurs/);
		assert.match(textFor("front"), /vertical structure/);
		assert.match(readerWeatherSources.pressure.note, /folklore.*not adopted/);
	});

	it("deliberately places each question in one collection and retrieves diagnostic questions without ranker changes", () => {
		const groups = {
			"weather-forecast-quantities": ["chance", "amount"],
			"humidity-dew-and-frost": ["cooling", "equalHumidity", "saturation", "dew", "frost"],
			"weather-exposure-indices": ["windChill", "heatIndex"],
			"frozen-precipitation": ["snowRatio", "snowAboveFreezing", "sleet", "hail"],
			"weather-observations-and-maps": ["radarGround", "radarTargets", "satellite", "pressure", "front"]
		};
		assert.equal(Object.values(groups).flat().length, 18);
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("earth-and-geoscience", readerWeatherSlugs[key]!).map(collection => collection.slug), [group]);
		}
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { chance: "chance rain percent duration", amount: "higher chance heavier rainfall", cooling: "relative humidity cooling", equalHumidity: "same humidity water vapor", saturation: "100 percent humidity rain", dew: "morning dew overnight rain", frost: "frost above freezing", windChill: "wind chill dry object", heatIndex: "heat index sun shade", snowRatio: "ten inches snow water", snowAboveFreezing: "snow above freezing", sleet: "sleet freezing rain", hail: "hail warm day", radarGround: "radar echo ground virga", radarTargets: "radar colored birds clutter", satellite: "infrared weather satellite temperature", pressure: "sea level mountain station pressure", front: "weather front surface map" };
		for (const [key, query] of Object.entries(queries)) assert.ok(search(query).some(result => result.claim.slug === readerWeatherSlugs[key]), query);
	});
});
