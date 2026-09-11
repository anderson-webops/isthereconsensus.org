import type { ReadingGuideContent } from "./types";

const loaders: Record<string, () => Promise<ReadingGuideContent>> = {
	"caffeine-tolerance-and-sleep": () => import("./caffeine").then((module) => module.caffeineGuide),
	"making-sense-of-supplements": () => import("./supplements").then((module) => module.supplementsGuide),
	"comparing-electricity-options": () => import("./energy").then((module) => module.energyGuide)
};

export async function loadReadingGuide(slug: string) {
	return Object.hasOwn(loaders, slug) ? loaders[slug]!() : undefined;
}
