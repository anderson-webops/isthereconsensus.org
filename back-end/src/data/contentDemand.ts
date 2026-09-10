export interface AggregateClaimDemandSignal {
	topicSlug: string;
	claimSlug: string;
	visitors: number;
	visits: number;
	views: number;
}

export const CONTENT_DEMAND_SNAPSHOT = {
	receivedAt: "2026-09-10T00:00:00.000Z",
	measurementWindow: "not supplied",
	source: "Owner-supplied aggregate path analytics",
	minimumSignal: "At least two distinct visitors in the supplied report",
	claims: [
		{
			topicSlug: "climate-and-environment",
			claimSlug: "is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
			visitors: 15,
			visits: 15,
			views: 19
		},
		{
			topicSlug: "nutrition-and-diet",
			claimSlug: "does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe",
			visitors: 14,
			visits: 14,
			views: 14
		},
		{
			topicSlug: "biology-and-evolution",
			claimSlug: "are-transitional-fossils-missing-from-the-fossil-record",
			visitors: 11,
			visits: 11,
			views: 11
		},
		{
			topicSlug: "genetics-and-biotechnology",
			claimSlug: "is-crispr-ready-for-heritable-human-embryo-editing",
			visitors: 9,
			visits: 9,
			views: 10
		},
		{
			topicSlug: "climate-and-environment",
			claimSlug: "do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
			visitors: 9,
			visits: 9,
			views: 9
		},
		{
			topicSlug: "biology-and-evolution",
			claimSlug: "did-humans-evolve-from-chimpanzees-living-today",
			visitors: 7,
			visits: 7,
			views: 7
		},
		{
			topicSlug: "health-and-medicine",
			claimSlug: "does-antibiotic-overuse-drive-antibiotic-resistance",
			visitors: 7,
			visits: 7,
			views: 9
		},
		{
			topicSlug: "health-and-medicine",
			claimSlug: "do-childhood-vaccines-cause-autism",
			visitors: 6,
			visits: 7,
			views: 14
		},
		{
			topicSlug: "climate-and-environment",
			claimSlug: "is-recent-global-warming-mainly-caused-by-human-activity",
			visitors: 6,
			visits: 7,
			views: 7
		},
		{
			topicSlug: "nutrition-and-diet",
			claimSlug: "do-detox-diets-and-cleanses-remove-toxins-or-improve-health",
			visitors: 6,
			visits: 6,
			views: 6
		},
		{
			topicSlug: "exercise-and-sports-science",
			claimSlug: "does-static-stretching-before-exercise-prevent-injuries",
			visitors: 5,
			visits: 6,
			views: 8
		},
		{
			topicSlug: "biology-and-evolution",
			claimSlug: "is-evolution-just-a-theory",
			visitors: 5,
			visits: 5,
			views: 5
		},
		{
			topicSlug: "biology-and-evolution",
			claimSlug: "is-evolution-entirely-random",
			visitors: 5,
			visits: 5,
			views: 6
		},
		{
			topicSlug: "other-questions",
			claimSlug: "do-speed-cameras-reduce-speeding-crashes-injuries-and-deaths",
			visitors: 4,
			visits: 5,
			views: 5
		},
		{
			topicSlug: "historical-case-studies",
			claimSlug: "did-removing-lead-from-gasoline-lower-childrens-lead-exposure",
			visitors: 4,
			visits: 4,
			views: 4
		},
		{
			topicSlug: "historical-case-studies",
			claimSlug: "did-vaccination-eradicate-smallpox",
			visitors: 4,
			visits: 4,
			views: 4
		},
		{
			topicSlug: "climate-and-environment",
			claimSlug: "is-current-biodiversity-loss-largely-driven-by-human-activity",
			visitors: 3,
			visits: 3,
			views: 3
		},
		{
			topicSlug: "biology-and-evolution",
			claimSlug: "can-evolution-be-observed-happening-today",
			visitors: 3,
			visits: 3,
			views: 3
		},
		{
			topicSlug: "health-and-medicine",
			claimSlug: "does-fluoride-toothpaste-prevent-cavities",
			visitors: 3,
			visits: 3,
			views: 3
		},
		{
			topicSlug: "health-and-medicine",
			claimSlug: "do-routine-childhood-vaccines-overwhelm-or-weaken-the-immune-system",
			visitors: 3,
			visits: 3,
			views: 3
		},
		{
			topicSlug: "nutrition-and-diet",
			claimSlug: "are-dietary-supplements-fda-approved-like-drugs",
			visitors: 3,
			visits: 3,
			views: 3
		},
		{
			topicSlug: "active-debates",
			claimSlug: "are-gene-drive-mosquitoes-proven-safe-and-effective-for-malaria-control-at-population-scale",
			visitors: 2,
			visits: 4,
			views: 4
		},
		{
			topicSlug: "genetics-and-biotechnology",
			claimSlug: "are-genes-destiny-for-complex-human-traits",
			visitors: 2,
			visits: 4,
			views: 4
		},
		{
			topicSlug: "exercise-and-sports-science",
			claimSlug: "can-exercising-one-body-part-selectively-remove-fat-from-that-area",
			visitors: 2,
			visits: 3,
			views: 4
		},
		{
			topicSlug: "education-and-learning",
			claimSlug: "do-school-uniforms-improve-academic-achievement-or-student-behavior",
			visitors: 2,
			visits: 3,
			views: 5
		},
		{
			topicSlug: "climate-and-environment",
			claimSlug: "can-indoor-dampness-and-mold-worsen-respiratory-health",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "climate-and-environment",
			claimSlug: "is-heavy-rainfall-becoming-more-frequent-and-intense-because-of-human-caused-climate-change",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "genetics-and-biotechnology",
			claimSlug: "are-commercial-gmo-foods-unsafe-to-eat",
			visitors: 2,
			visits: 2,
			views: 4
		},
		{
			topicSlug: "sleep-and-circadian-health",
			claimSlug: "can-consumer-sleep-trackers-diagnose-sleep-disorders",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "sleep-and-circadian-health",
			claimSlug: "can-weekend-catch-up-sleep-fully-erase-chronic-sleep-debt",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "sleep-and-circadian-health",
			claimSlug: "does-white-noise-reliably-improve-sleep",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "neuroscience-and-psychology",
			claimSlug: "does-nicotine-harm-brain-development-into-the-mid-20s",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "nutrition-and-diet",
			claimSlug: "does-protein-supplementation-improve-muscle-and-strength-gains-during-resistance-training",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "neuroscience-and-psychology",
			claimSlug: "do-learning-styles-improve-educational-outcomes",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "nutrition-and-diet",
			claimSlug: "do-non-sugar-sweeteners-reliably-help-with-long-term-weight-control",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "ecology-and-conservation",
			claimSlug: "are-current-species-extinction-rates-above-natural-background-rates",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "other-questions",
			claimSlug: "do-bicycle-helmets-reduce-head-and-brain-injuries-in-crashes",
			visitors: 2,
			visits: 2,
			views: 3
		},
		{
			topicSlug: "crime-and-justice",
			claimSlug: "does-the-death-penalty-deter-homicide-more-than-long-imprisonment",
			visitors: 2,
			visits: 2,
			views: 3
		},
		{
			topicSlug: "neuroscience-and-psychology",
			claimSlug: "do-we-only-use-10-percent-of-our-brain",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "astronomy-and-space",
			claimSlug: "is-the-universe-expanding",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "climate-and-environment",
			claimSlug: "does-air-pollution-cause-millions-of-premature-deaths-each-year",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "nutrition-and-diet",
			claimSlug: "can-an-alkaline-diet-change-blood-ph-or-treat-cancer",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "consensus-foundations",
			claimSlug: "does-possibly-carcinogenic-mean-rf-radiation-is-proven-to-cause-cancer",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "media-misinformation",
			claimSlug: "why-does-one-study-rarely-change-everything",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "health-and-medicine",
			claimSlug: "are-intensive-behavioral-interventions-effective-for-children-with-obesity-and-does-dose-matter",
			visitors: 2,
			visits: 2,
			views: 2
		},
		{
			topicSlug: "neuroscience-and-psychology",
			claimSlug: "is-sexual-orientation-conversion-therapy-effective-and-safe",
			visitors: 2,
			visits: 2,
			views: 4
		}
	] satisfies AggregateClaimDemandSignal[]
} as const;

const snapshotReceivedAt = new Date(CONTENT_DEMAND_SNAPSHOT.receivedAt).getTime();
const demandByClaim = new Map(
	CONTENT_DEMAND_SNAPSHOT.claims.map(signal => [`${signal.topicSlug}/${signal.claimSlug}`, signal])
);

export function getClaimDemandSignal(topicSlug: string, claimSlug: string) {
	return demandByClaim.get(`${topicSlug}/${claimSlug}`);
}

export function contentDemandSnapshotIsFresh(referenceDate = new Date()) {
	const ageDays = Math.max(0, referenceDate.getTime() - snapshotReceivedAt) / 86_400_000;
	return ageDays <= 180;
}

/**
 * Demand is a small relevance tie-breaker, never a substitute for textual fit.
 * The boost expires after six months so stale traffic cannot silently shape
 * search forever when the aggregate snapshot is not refreshed.
 */
export function getClaimDemandBoost(topicSlug: string, claimSlug: string, referenceDate = new Date()) {
	if (!contentDemandSnapshotIsFresh(referenceDate)) return 0;
	const signal = getClaimDemandSignal(topicSlug, claimSlug);
	if (!signal) return 0;
	return Math.min(6, Math.round(Math.log2(signal.visitors + signal.views + 1)));
}

export function getDemandAdjustedClaimSearchScore(
	matchScore: number,
	topicSlug: string,
	claimSlug: string,
	referenceDate = new Date()
) {
	return matchScore + getClaimDemandBoost(topicSlug, claimSlug, referenceDate);
}
