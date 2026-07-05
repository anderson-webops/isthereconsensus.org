export interface FutureImprovement {
	rank: number;
	title: string;
	whyItMatters: string;
	implementation: string;
	successMetric: string;
}

export interface FutureRoadmapPhase {
	phase: string;
	deliverables: string;
	dependencies: string;
	doneWhen: string;
}

export interface FutureQuarter {
	quarter: string;
	deliverables: string;
	materialChange: string;
}

export const futureRoadmapPrinciples = [
	"Make the evidence model fully real before trying to scale the number of pages aggressively.",
	"Keep agreement and certainty as separate axes, and force every canonical page to show both.",
	"Automate surveillance and integrity checks, but leave conclusion changes to human editorial review.",
	"Route confusing public questions into claims, explainers, and misconception modules before they become duplicate threads."
];

export const highestLeverageImprovements: FutureImprovement[] = [
	{
		rank: 1,
		title: "Make evidence certainty fully real on every canonical claim page",
		whyItMatters:
			"The public methods promise already separates agreement from certainty. Claim pages need a visible certainty rating, a plain-language uncertainty summary, and typed drivers so that promise is not just aspirational.",
		implementation:
			"Require certainty level, uncertainty summary, three to six typed drivers, and outcome-level certainty on each canonical claim.",
		successMetric:
			"Every published claim shows certainty, typed uncertainty, and at least one outcome-level certainty object."
	},
	{
		rank: 2,
		title: "Finish identifier-first source stacks",
		whyItMatters:
			"The source stack only becomes auditable when each citation is a stable object with identifiers, dates, role tags, and update provenance.",
		implementation:
			"Store DOI, PMID, PMCID, archived URL, role tags, citation status provenance, and citation-checked dates for every high-weight source.",
		successMetric: "Most sources on canonical pages can be audited without manual cleanup or guesswork."
	},
	{
		rank: 3,
		title: "Add multi-anchor quorum handling for institutional drift",
		whyItMatters:
			"High-conflict topics can experience abrupt institutional messaging shifts. The site needs a way to explain institutional disagreement without collapsing into false balance.",
		implementation:
			"Require two independent institutional anchors plus one independent synthesis for strong-consensus language on high-conflict topics.",
		successMetric: "High-conflict claim pages can absorb anchor drift without rewriting the editorial model."
	},
	{
		rank: 4,
		title: "Complete the evidence-ops integrity loop",
		whyItMatters: "Retractions, corrections, and guideline changes are operational risk, not just sourcing trivia.",
		implementation:
			"Run daily surveillance for citation status changes, guideline updates, and new syntheses, then open bounded editorial review tickets.",
		successMetric:
			"Integrity events surface quickly and appear in visible page updates instead of lingering silently."
	},
	{
		rank: 5,
		title: "Turn draft claims into structured packages",
		whyItMatters: "Quality will drift if claim preparation stays prose-first instead of field-first.",
		implementation:
			"Standardize scope, anchors, search cutoffs, inclusion rules, appraisal tools, certainty judgments, and update triggers as required fields.",
		successMetric: "Editors can publish consistent canonical pages without relying on undocumented habits."
	},
	{
		rank: 6,
		title: "Make ask-flow premise-aware",
		whyItMatters:
			"Users often arrive with a conclusion embedded in the question. The site should extract the actual proposition before routing.",
		implementation:
			"Detect loaded premises, split bundled questions, and route users toward the nearest claim plus the relevant misconception module.",
		successMetric: "Duplicate thread creation falls while first-attempt routing accuracy improves."
	},
	{
		rank: 7,
		title: "Expand reusable misconception modules",
		whyItMatters:
			"The fastest path to scale is reducing repeated interpretive mistakes across clusters instead of rewriting the same lesson on every page.",
		implementation:
			"Add modules for confounding, subgroup overread, diagnostic-test fallacies, denominator mistakes, and institutional disagreement.",
		successMetric: "New claim pages reuse modules instead of rebuilding the same explanation from scratch."
	},
	{
		rank: 8,
		title: "Show the agreement × certainty rubric earlier and more consistently",
		whyItMatters:
			"Readers need to tell quickly whether a page is stable, qualified, or frontier territory before they reach the long-form nuance.",
		implementation:
			"Keep agreement and certainty visible above the fold, and make uncertainty typed rather than vague.",
		successMetric: "Reader testing shows better recall of what is settled versus what is still open."
	},
	{
		rank: 9,
		title: "Map search demand directly to canonical destinations",
		whyItMatters:
			"Routing quality improves when public query phrasing and misinformation phrasing map cleanly to the same canonical claim or explainer.",
		implementation: "Maintain query-pattern, synonym, and misinformation-variant tables for the top-demand claims.",
		successMetric: "Search and Ask send more users to an existing canonical destination on the first try."
	},
	{
		rank: 10,
		title: "Implement high-conflict moderation controls in product",
		whyItMatters:
			"Policy pages already mention slow mode, expert-only windows, and escalation. The product needs matching controls for them to be credible.",
		implementation:
			"Add topic-level slow mode, expert-only discussion windows, quarantine queues, and structured factual-dispute routing.",
		successMetric: "High-conflict claims stay readable without letting community activity masquerade as evidence."
	}
];

export const sixMonthRoadmap: FutureRoadmapPhase[] = [
	{
		phase: "Month 1",
		deliverables:
			"Finish certainty coverage on every canonical claim page, including summary text and typed uncertainty drivers.",
		dependencies: "Shared certainty rubric and editorial defaults for seeded claims.",
		doneWhen: "Published pages no longer fall back to placeholder certainty or uncertainty copy."
	},
	{
		phase: "Month 2",
		deliverables: "Finish identifier-first source stacks and full citation-role tagging.",
		dependencies: "Claim and source schemas must carry identifiers, citation status, and role labels consistently.",
		doneWhen: "Audit-critical sources are stable objects instead of loose text references."
	},
	{
		phase: "Month 3",
		deliverables: "Stand up the evidence-ops integrity loop for retractions, corrections, and guideline changes.",
		dependencies: "Operational ticketing and visible page-change banners.",
		doneWhen: "Integrity signals reach editorial review quickly and leave a visible trace on claim pages."
	},
	{
		phase: "Month 4",
		deliverables: "Add multi-anchor quorum and disagreement decomposition for high-conflict claims.",
		dependencies: "Two-layer anchor rule plus a way to explain why institutions differ.",
		doneWhen: "Claim pages can explain institutional drift without flattening disagreement into false balance."
	},
	{
		phase: "Month 5",
		deliverables: "Publish the first wave of new high-demand canonical pages in vaccines and environmental health.",
		dependencies: "Structured claim packages and reviewer capacity.",
		doneWhen: "New pages ship with the same trust surface as mature pages instead of lighter-weight shortcuts."
	},
	{
		phase: "Month 6",
		deliverables: "Upgrade ask-flow with premise extraction, valence maps, and stronger duplicate prevention.",
		dependencies: "Search-demand mapping and misconception-module hooks.",
		doneWhen:
			"Ask routes more users into existing claims, explainers, and misconception modules before they post a new thread."
	}
];

export const annualRoadmap: FutureQuarter[] = [
	{
		quarter: "Q1",
		deliverables:
			"Complete certainty coverage, lock the structured claim package, and expand the misconception/explainer layer.",
		materialChange: "The method layer becomes fully implemented rather than partly promised."
	},
	{
		quarter: "Q2",
		deliverables: "Scale to roughly twenty-five new canonical claims and add cluster-specific monitoring streams.",
		materialChange: "Evidence operations become visible in practice, not just as a policy surface."
	},
	{
		quarter: "Q3",
		deliverables: "Scale toward fifty new claims and ship high-conflict moderation controls in product.",
		materialChange: "The community layer stays downstream of evidence even on conflict-heavy topics."
	},
	{
		quarter: "Q4",
		deliverables:
			"Expand integrity automation, reserve living-review mode for the few topics that justify it, and publish an annual transparency report.",
		materialChange:
			"Trust becomes an operational output with measurable update, correction, and response timelines."
	}
];

export const futureRoadmapPreview = highestLeverageImprovements.slice(0, 4);
