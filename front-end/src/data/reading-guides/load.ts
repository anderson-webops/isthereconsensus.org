import type { ReadingGuideContent } from "./types";

const loaders: Record<string, () => Promise<ReadingGuideContent>> = {
	"reading-ai-water-footprints": () => import("./ai-water").then((module) => module.aiWaterGuide),
	"reading-inflation-jobs-and-gdp-headlines": () => import("./economics").then((module) => module.economicsGuide),
	"reading-test-scores-and-school-comparisons": () => import("./assessment").then((module) => module.assessmentGuide),
	"reading-weather-forecasts-and-measurements": () => import("./weather").then((module) => module.weatherGuide),
	"reading-digital-security-and-data-protection-claims": () =>
		import("./digital").then((module) => module.digitalGuide),
	"reading-motion-forces-and-energy-claims": () => import("./mechanics").then((module) => module.mechanicsGuide),
	"reading-electrical-quantities-and-circuit-claims": () =>
		import("./electricity").then((module) => module.electricityGuide),
	"reading-averages-percentages-and-probability": () =>
		import("./probability").then((module) => module.probabilityGuide),
	"reading-heat-and-light-claims": () => import("./heat-light").then((module) => module.heatLightGuide),
	"reading-flood-and-groundwater-claims": () =>
		import("./flood-groundwater").then((module) => module.floodGroundwaterGuide),
	"reading-tides-waves-and-ocean-measurements": () =>
		import("./coastal-measurements").then((module) => module.coastalMeasurementsGuide),
	"reading-space-observations": () => import("./space").then((module) => module.spaceEvidenceGuide),
	"reading-fossil-and-ancestry-evidence": () => import("./origins").then((module) => module.originsEvidenceGuide),
	"browsing-privacy": () => import("./privacy").then((module) => module.browsingPrivacyGuide),
	"food-storage-and-safety": () => import("./food").then((module) => module.foodStorageGuide),
	"account-protection": () => import("./account").then((module) => module.accountProtectionGuide),
	"hearing-protection": () => import("./hearing").then((module) => module.hearingGuide),
	"mosquito-bite-prevention": () => import("./mosquito").then((module) => module.mosquitoGuide),
	"household-water-treatment": () => import("./water").then((module) => module.waterGuide),
	"exercise-and-blood-pressure": () => import("./exercise-bp").then((module) => module.exerciseBpGuide),
	"choosing-air-cleaning": () => import("./air-cleaning").then((module) => module.airCleaningGuide),
	"caffeine-tolerance-and-sleep": () => import("./caffeine").then((module) => module.caffeineGuide),
	"making-sense-of-supplements": () => import("./supplements").then((module) => module.supplementsGuide),
	"comparing-electricity-options": () => import("./energy").then((module) => module.energyGuide),
	"sleep-and-insomnia": () => import("./sleep").then((module) => module.sleepGuide),
	"exercise-without-magic-numbers": () => import("./exercise").then((module) => module.exerciseGuide),
	"reading-vaccine-evidence": () => import("./vaccines").then((module) => module.vaccinesGuide),
	"making-sense-of-nutrition": () => import("./nutrition").then((module) => module.nutritionGuide),
	"understanding-climate-attribution": () => import("./climate").then((module) => module.climateGuide),
	"understanding-evolution": () => import("./evolution").then((module) => module.evolutionGuide),
	"interpreting-medical-evidence": () => import("./medical-evidence").then((module) => module.medicalEvidenceGuide)
};

export async function loadReadingGuide(slug: string) {
	return Object.hasOwn(loaders, slug) ? loaders[slug]!() : undefined;
}
