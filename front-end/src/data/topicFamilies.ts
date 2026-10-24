export interface TopicFamily {
	slug: string;
	title: string;
	topicSlugs: readonly string[];
}

// Six reader-facing families keep each browse group within roughly ten cards.
export const topicFamilies: readonly TopicFamily[] = [
	{
		slug: "health",
		title: "Health & medicine",
		topicSlugs: [
			"health-and-medicine",
			"infection-immunity-and-vaccines",
			"cancer-prevention-and-care",
			"cardiovascular-metabolic-and-kidney-health",
			"mental-health-and-treatment",
			"neuroscience-and-psychology",
			"reproductive-and-sexual-health",
			"substance-use-and-addiction",
			"aging-and-longevity"
		]
	},
	{
		slug: "food-fitness-sleep",
		title: "Food, fitness & sleep",
		topicSlugs: [
			"nutrition-and-diet",
			"sports-nutrition-and-supplements",
			"exercise-and-sports-science",
			"sleep-and-circadian-health",
			"agriculture-and-food-systems"
		]
	},
	{
		slug: "earth-environment",
		title: "Earth & environment",
		topicSlugs: [
			"climate-and-environment",
			"earth-and-geoscience",
			"oceans-and-marine-science",
			"ecology-and-conservation",
			"energy-and-infrastructure"
		]
	},
	{
		slug: "life-physical-sciences",
		title: "Life & physical sciences",
		topicSlugs: [
			"biology-and-evolution",
			"genetics-and-biotechnology",
			"human-origins-and-paleontology",
			"physics-and-chemistry",
			"astronomy-and-space"
		]
	},
	{
		slug: "society-policy",
		title: "Society & policy",
		topicSlugs: [
			"economics-and-social-policy",
			"education-and-learning",
			"crime-and-justice",
			"public-policy-and-safety",
			"digital-security-and-privacy"
		]
	},
	{
		slug: "how-science-works",
		title: "How science works",
		topicSlugs: [
			"consensus-foundations",
			"active-debates",
			"media-misinformation",
			"bias-incentives",
			"science-communication",
			"historical-case-studies",
			"other-questions"
		]
	}
];

const otherFamily: TopicFamily = { slug: "more-topics", title: "More topics", topicSlugs: [] };

export function topicFamilyFor(topicSlug: string | undefined): TopicFamily {
	return topicFamilies.find((family) => topicSlug && family.topicSlugs.includes(topicSlug)) ?? otherFamily;
}

/** Groups items by family in family order, keeping each item's existing order and dropping empty families. */
export function groupByTopicFamily<T>(items: readonly T[], topicSlugOf: (item: T) => string | undefined) {
	const groups = new Map<string, { family: TopicFamily; items: T[] }>();
	for (const family of [...topicFamilies, otherFamily]) groups.set(family.slug, { family, items: [] });
	for (const item of items) groups.get(topicFamilyFor(topicSlugOf(item)).slug)!.items.push(item);
	return [...groups.values()].filter((group) => group.items.length > 0);
}
