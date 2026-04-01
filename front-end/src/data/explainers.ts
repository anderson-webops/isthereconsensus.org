export interface ExplainerItem {
	slug: string;
	title: string;
	summary: string;
	whyItMatters: string;
	keyPoints: string[];
}

export const evergreenExplainers: ExplainerItem[] = [
	{
		slug: "how-consensus-forms",
		title: "How scientific consensus forms",
		summary:
			"Consensus is not a vote. It is what remains after criticism, replication, and multiple lines of evidence keep pointing in the same direction.",
		whyItMatters:
			"People often mistake consensus for groupthink. This explainer shows why consensus is a process, not a popularity contest.",
		keyPoints: [
			"Hypotheses become durable only after surviving repeated challenge.",
			"Independent evidence matters more than a single persuasive study.",
			"Consensus usually builds over years or decades, not overnight."
		]
	},
	{
		slug: "hierarchy-of-evidence",
		title: "The hierarchy of evidence",
		summary:
			"Not every study carries the same weight. Systematic reviews, meta-analyses, guidelines, and consensus statements usually tell you more than a single paper.",
		whyItMatters: "Public confusion often starts when a small animal study gets treated like a field-wide verdict.",
		keyPoints: [
			"Mechanistic and animal studies are useful, but limited.",
			"Randomized trials usually beat loose observational claims.",
			"Systematic reviews and consensus statements sit near the top of the stack."
		]
	},
	{
		slug: "correlation-vs-causation",
		title: "Correlation versus causation",
		summary:
			"When two things move together, that does not prove one directly causes the other. Confounders and hidden variables matter.",
		whyItMatters:
			"A large share of bad science headlines come from treating association as if it were direct proof of cause.",
		keyPoints: [
			"Correlated variables can share a hidden third cause.",
			"Observational studies are often useful, but rarely decisive on their own.",
			"Causal claims need stronger designs and converging evidence."
		]
	},
	{
		slug: "relative-vs-absolute-risk",
		title: "Relative risk versus absolute risk",
		summary:
			"Doubling a tiny risk can still leave the actual danger small. Always ask what the baseline risk was before the headline.",
		whyItMatters:
			"Risk reporting is one of the easiest places for journalism to mislead without technically lying.",
		keyPoints: [
			"Relative risk makes small effects sound dramatic.",
			"Absolute risk tells you how much the real-world chance changed.",
			"Both numbers matter, but the baseline is the anchor."
		]
	},
	{
		slug: "replication-and-correction",
		title: "Replication, correction, and the replication crisis",
		summary:
			"Science can contain weak papers, publication bias, and failed replications without collapsing as a method. Correction is part of the system.",
		whyItMatters:
			"People often treat failed replication as proof that science is broken, when it is usually evidence that self-correction is working.",
		keyPoints: [
			"Single studies are vulnerable to noise and bad incentives.",
			"Replication helps separate durable findings from fragile ones.",
			"A shaky paper does not automatically erase a strong literature."
		]
	},
	{
		slug: "falsifiability-and-mind-changes",
		title: "Falsifiability and what would change minds",
		summary:
			"A strong claim should say what evidence could prove it wrong. This is how science avoids turning into dogma.",
		whyItMatters:
			"If a claim can explain every possible outcome, it becomes hard to test and easy to defend forever.",
		keyPoints: [
			"Good scientific claims identify what would count against them.",
			"Evidence thresholds should be explicit, not hidden.",
			"Being open to revision is a strength, not a weakness."
		]
	},
	{
		slug: "why-science-seems-to-change",
		title: "Why science seems to change its mind",
		summary:
			"Science often looks unstable from the outside because the media highlights novelty and conflict, while the stable core stays in the background.",
		whyItMatters: "This is the bridge between public frustration and the actual way knowledge gets refined.",
		keyPoints: [
			"Most updates refine the edges more than they rewrite the center.",
			"Better tools and better measurements often explain apparent reversals.",
			"Consensus usually shifts slowly unless the old model breaks badly."
		]
	},
	{
		slug: "how-to-spot-science-denial-patterns",
		title: "How to spot science denial patterns",
		summary:
			"Many misleading arguments reuse the same patterns: fake experts, cherry-picking, impossible expectations, logical fallacies, and conspiracy thinking.",
		whyItMatters: "Recognizing the pattern early helps users resist bad arguments before they harden into beliefs.",
		keyPoints: [
			"Domain expertise matters more than titles alone.",
			"One anomalous study rarely cancels an entire literature.",
			"Demanding perfect certainty is often a way to avoid accepting strong evidence."
		]
	}
];
