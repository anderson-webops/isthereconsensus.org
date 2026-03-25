export interface TopicGuideResource {
	title: string;
	note: string;
}

export interface TopicGuide {
	slug: string;
	consensusScore: number;
	consensusLabel: string;
	snapshot: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	commonMisreads: string[];
	starterQuestions: string[];
	evidenceTrail: TopicGuideResource[];
}

const fallbackGuide: TopicGuide = {
	slug: "fallback",
	consensusScore: 50,
	consensusLabel: "Mixed and still taking shape",
	snapshot: "This topic needs a clearer consensus summary before it should be treated as settled.",
	stableCore: [
		"Separate the broad claim from the exact mechanism being debated.",
		"Look for replication and synthesis before treating a new result as decisive."
	],
	openQuestions: [
		"Which parts of the claim are evidence-backed and which are still inference?",
		"Where are experts mostly aligned, and where are they arguing about specifics?"
	],
	whatWouldChangeMinds: [
		"Consistent results across methods, labs, and populations.",
		"A stronger model that predicts more accurately than the current explanation."
	],
	commonMisreads: [
		"A new study can sharpen the edges of a topic without overturning the center.",
		"Public certainty and expert certainty are often very different."
	],
	starterQuestions: [
		"What part of this claim is actually settled?",
		"What evidence would raise or lower confidence here?"
	],
	evidenceTrail: [
		{ title: "Systematic reviews", note: "Useful for checking the overall direction of the literature." },
		{ title: "Consensus statements", note: "Helpful for seeing where institutions or expert bodies converge." }
	]
};

export const topicGuides: Record<string, TopicGuide> = {
	"consensus-foundations": {
		slug: "consensus-foundations",
		consensusScore: 94,
		consensusLabel: "Strong consensus on the basic process",
		snapshot:
			"Scientific knowledge becomes trustworthy through criticism, replication, converging evidence, and better predictive models, not by charisma or repetition.",
		stableCore: [
			"Consensus is the residue of repeated challenge, not the absence of disagreement.",
			"Methods, measurement, and replication matter more than a single flashy result.",
			"Stable claims usually survive because many lines of evidence point in the same direction."
		],
		openQuestions: [
			"How should we explain uncertainty without making everything sound equally weak?",
			"Which teaching metaphors help people understand evidence accumulation instead of memorizing conclusions?"
		],
		whatWouldChangeMinds: [
			"Large bodies of contradictory evidence that survive scrutiny and replication.",
			"New methods that reveal systematic measurement errors in the old foundation."
		],
		commonMisreads: [
			"Consensus is mistaken for groupthink rather than an evidence-backed process.",
			"People treat disagreement at the frontier as if it invalidates the settled center."
		],
		starterQuestions: [
			"What makes a scientific claim feel settled instead of speculative?",
			"Why doesn’t one new study usually overturn a field?"
		],
		evidenceTrail: [
			{
				title: "Philosophy of science overviews",
				note: "Good for framing model-building, inference, and falsifiability."
			},
			{ title: "Replication crisis reporting", note: "Useful when discussing how correction mechanisms work." }
		]
	},
	"active-debates": {
		slug: "active-debates",
		consensusScore: 56,
		consensusLabel: "Active debate around mechanisms and magnitude",
		snapshot:
			"Many scientific fights are not about whether something exists at all, but about effect size, mechanism, boundary conditions, or which model predicts best.",
		stableCore: [
			"Competing models can coexist while evidence is still being sorted.",
			"Debate often narrows over time from huge claims to precise technical disagreements.",
			"An unresolved mechanism does not automatically mean the entire phenomenon is doubtful."
		],
		openQuestions: [
			"Which results are robust across populations, instruments, and labs?",
			"Are researchers arguing about the effect itself or only about how large it is?",
			"Which edge cases matter enough to change the practical takeaway?"
		],
		whatWouldChangeMinds: [
			"Better-powered studies that adjudicate between competing models.",
			"Independent replications that consistently favor one mechanism over another."
		],
		commonMisreads: [
			"Media often compresses nuanced disagreement into a fake yes/no battle.",
			"People assume an active debate means experts have no useful provisional view."
		],
		starterQuestions: [
			"What exactly are experts arguing about here?",
			"Is the disagreement about whether the effect exists or how strong it is?"
		],
		evidenceTrail: [
			{ title: "Meta-analyses", note: "Helpful when the dispute is about magnitude across many studies." },
			{ title: "Methods papers", note: "Useful when the fight is really about measurement or model fit." }
		]
	},
	"media-misinformation": {
		slug: "media-misinformation",
		consensusScore: 82,
		consensusLabel: "Strong agreement that framing distorts public understanding",
		snapshot:
			"Scientific communication often breaks when headlines flatten uncertainty, exaggerate novelty, or present fringe disagreement as balanced controversy.",
		stableCore: [
			"Relative risk without baseline context is easy to overread.",
			"Single studies are regularly framed as if they replace a broader evidence base.",
			"False balance can make fringe claims look equal to well-supported positions."
		],
		openQuestions: [
			"Which explanations actually improve public calibration instead of just increasing attention?",
			"How should platforms show uncertainty without encouraging cynicism?"
		],
		whatWouldChangeMinds: [
			"Clearer evidence on which communication patterns reliably improve public understanding.",
			"Platform experiments showing durable gains in source literacy and risk interpretation."
		],
		commonMisreads: [
			"People confuse louder coverage with stronger evidence.",
			"Correction stories often travel less than the original overstatement."
		],
		starterQuestions: [
			"What does this headline leave out about scale or uncertainty?",
			"Is this a genuine consensus update or just a media spike?"
		],
		evidenceTrail: [
			{ title: "Science journalism analyses", note: "Useful for spotting patterns in headline inflation." },
			{
				title: "Risk communication research",
				note: "Helpful when translating percentages into real-world scale."
			}
		]
	},
	"bias-incentives": {
		slug: "bias-incentives",
		consensusScore: 76,
		consensusLabel: "Substantial agreement that incentives shape research behavior",
		snapshot:
			"Publication pressure, funding structure, prestige incentives, and selective reporting can bend what gets studied, published, and amplified without invalidating science as a whole.",
		stableCore: [
			"Researchers respond to incentives just like everyone else.",
			"Bias can enter through study design, analysis choices, publication, and media amplification.",
			"Transparent methods and preregistration are partial defenses, not magic shields."
		],
		openQuestions: [
			"Which reforms improve reliability without creating new bureaucratic failure modes?",
			"How much bias comes from institutions versus from measurement limits and noisy data?"
		],
		whatWouldChangeMinds: [
			"Strong comparative evidence showing which institutional reforms improve reproducibility.",
			"Better auditing data that separates publication bias from true underlying uncertainty."
		],
		commonMisreads: [
			"Finding incentives or bias is not the same as proving all results are fake.",
			"Critiquing incentives should lead to better guardrails, not total distrust."
		],
		starterQuestions: [
			"What incentives might be shaping this result or headline?",
			"What checks are in place to reduce bias here?"
		],
		evidenceTrail: [
			{
				title: "Reproducibility studies",
				note: "Useful for grounding the conversation in measured failure rates."
			},
			{ title: "Open science frameworks", note: "Helpful when discussing mitigations rather than only problems." }
		]
	},
	"science-communication": {
		slug: "science-communication",
		consensusScore: 71,
		consensusLabel: "Clear patterns, with room for experimentation",
		snapshot:
			"Good science communication makes uncertainty legible, keeps scale intact, and preserves curiosity without pretending every topic is equally unsettled.",
		stableCore: [
			"Clear explanations outperform jargon-heavy certainty theater.",
			"Audience trust improves when uncertainty is named precisely instead of hidden.",
			"Narrative can help understanding if it does not distort the evidence hierarchy."
		],
		openQuestions: [
			"Which formats help people remember the right lesson rather than just the most dramatic example?",
			"How much simplification is too much before a teaching aid becomes misleading?"
		],
		whatWouldChangeMinds: [
			"Comparative evidence on which formats create durable understanding across audiences.",
			"Better measures of whether a communication style improves calibration, not just engagement."
		],
		commonMisreads: [
			"Engaging storytelling is sometimes mistaken for dumbing things down.",
			"Exact wording matters when communicating risk, uncertainty, and causation."
		],
		starterQuestions: [
			"Did this explainer preserve the scale of the evidence?",
			"What tradeoff did the communicator make between clarity and precision?"
		],
		evidenceTrail: [
			{
				title: "Communication design research",
				note: "Useful when comparing visual, textual, and interactive explainers."
			},
			{ title: "Educational psychology", note: "Helpful for understanding memory, misconceptions, and transfer." }
		]
	},
	"other-questions": {
		slug: "other-questions",
		consensusScore: 43,
		consensusLabel: "Exploratory and mixed",
		snapshot:
			"This lane catches questions that do not yet map cleanly onto one of the core consensus themes, so triage and framing matter more here.",
		stableCore: [
			"Precise phrasing matters because broad questions can hide several separate claims.",
			"Early sorting helps prevent unrelated debates from being bundled together."
		],
		openQuestions: [
			"What is the smallest version of the question we can answer well?",
			"Does this belong with foundations, debate, incentives, communication, or misinformation instead?"
		],
		whatWouldChangeMinds: [
			"A cleaner problem statement or source claim that narrows the evidence search.",
			"A better topic fit that reveals the relevant consensus context."
		],
		commonMisreads: [
			"People often ask one question while actually needing help with a different underlying confusion.",
			"Broad topics feel urgent but are harder to answer responsibly without narrowing scope."
		],
		starterQuestions: [
			"What exact claim are you trying to check?",
			"Which source, quote, or example kicked off the question?"
		],
		evidenceTrail: [
			{ title: "Primary source first", note: "Start with the actual claim, quote, or paper being discussed." },
			{ title: "Topic triage", note: "Then route the question to the lane with the right consensus context." }
		]
	}
};

export function getTopicGuide(slug: string) {
	return topicGuides[slug] ?? fallbackGuide;
}
