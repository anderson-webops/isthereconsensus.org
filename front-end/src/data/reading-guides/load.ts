import type { ReadingGuideContent } from "./types";

const loaders: Record<string, () => Promise<ReadingGuideContent>> = {
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
