import type { ReadingGuideSummary } from "./types";

// Keep discovery metadata separate from article bodies: every claim page may
// show a guide link, but should not download the entire reading library.
export const readingGuides: ReadingGuideSummary[] = [
	{
		slug: "caffeine-tolerance-and-sleep",
		title: "Caffeine: tolerance, performance, and the sleep trade-off",
		summary:
			"Why coffee can feel less effective, which benefits can persist, and why sleep changes the calculation.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "sports-nutrition-and-supplements", "sleep-and-circadian-health"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use",
				label: "Does caffeine become less effective with daily use?"
			},
			{
				path: "/consensus/sports-nutrition-and-supplements/does-caffeine-improve-exercise-performance-in-habitual-caffeine-users",
				label: "Exercise performance in habitual caffeine users"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-caffeine-consumed-six-hours-before-bedtime-still-disrupt-sleep",
				label: "Caffeine before bedtime and sleep disruption"
			}
		]
	},
	{
		slug: "making-sense-of-supplements",
		title: "Supplements: useful for what, and for whom?",
		summary:
			"Separate correcting a deficiency, improving a specific outcome, and unsupported promises of better health.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "sports-nutrition-and-supplements"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/are-dietary-supplements-fda-approved-like-drugs",
				label: "Are supplements FDA-approved like drugs?"
			},
			{
				path: "/consensus/nutrition-and-diet/does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe",
				label: "Creatine, strength training, and safety"
			},
			{
				path: "/consensus/nutrition-and-diet/do-vitamin-e-or-beta-carotene-supplements-prevent-heart-disease-or-cancer",
				label: "Vitamin E, beta carotene, and disease prevention"
			}
		]
	},
	{
		slug: "comparing-electricity-options",
		title: "Energy choices: compare the whole system",
		summary:
			"Read claims about nuclear, wind, solar, and fossil fuels using consistent boundaries for emissions, health, and reliability.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "energy-and-infrastructure"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
				label: "Nuclear power and fossil-fuel health risks"
			},
			{
				path: "/consensus/climate-and-environment/do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
				label: "Lifecycle emissions of wind, solar, and fossil fuels"
			},
			{
				path: "/consensus/climate-and-environment/is-recent-global-warming-mainly-caused-by-human-activity",
				label: "Why reducing greenhouse-gas emissions matters"
			}
		]
	}
];

export function guidesForTopic(topic: string) {
	return readingGuides.filter((guide) => guide.topics.includes(topic));
}

export function guidesForReview(path: string) {
	return readingGuides.filter((guide) => guide.reviews.some((review) => review.path === path));
}
