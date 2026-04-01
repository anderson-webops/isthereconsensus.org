import type { ClaimConsensusBand, ClaimStatus } from "../models/schemas/Claim.js";
import type { ClaimSourceKind, ClaimSourceStance } from "../models/schemas/ClaimSource.js";

interface SeedClaimSource {
	kind: ClaimSourceKind;
	title: string;
	publisher: string;
	stance: ClaimSourceStance;
	note: string;
	order: number;
}

export interface SeedClaim {
	topicSlug: string;
	title: string;
	slug: string;
	status: ClaimStatus;
	consensusBand: ClaimConsensusBand;
	confidenceScore: number;
	bottomLine: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	editorSummary: string;
	sources: SeedClaimSource[];
}

export const defaultClaims: SeedClaim[] = [
	{
		topicSlug: "consensus-foundations",
		title: "How does scientific consensus form?",
		slug: "how-does-scientific-consensus-form",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Scientific consensus forms when multiple lines of evidence survive criticism, replication, and time. It is not a vote. It is the durable result of repeated testing and challenge.",
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
		misconceptions: [
			"Consensus is often mistaken for groupthink rather than an evidence-backed process.",
			"Disagreement at the frontier is often misread as if it invalidates the settled center."
		],
		editorSummary:
			"Use this claim as the public-facing explanation of how science moves from uncertainty to reliable consensus.",
		sources: [
			{
				kind: "context",
				title: "Philosophy of science overviews",
				publisher: "Background reading",
				stance: "context",
				note: "Useful for framing model-building, inference, and falsifiability.",
				order: 1
			},
			{
				kind: "context",
				title: "Replication crisis reporting",
				publisher: "Background reading",
				stance: "context",
				note: "Useful when discussing how correction mechanisms work.",
				order: 2
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Why does one study rarely change everything?",
		slug: "why-does-one-study-rarely-change-everything",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 82,
		bottomLine:
			"One study rarely changes a field because scientific conclusions rest on the weight of evidence, not novelty alone. New papers usually add detail, scope, or uncertainty rather than replacing the whole picture.",
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
		misconceptions: [
			"People often confuse louder coverage with stronger evidence.",
			"Correction stories usually travel less than the original overstatement."
		],
		editorSummary:
			"Anchor the basketball-versus-bumps framing here. This page should explain why media spikes are not the same thing as consensus shifts.",
		sources: [
			{
				kind: "context",
				title: "Science journalism analyses",
				publisher: "Background reading",
				stance: "context",
				note: "Useful for spotting patterns in headline inflation.",
				order: 1
			},
			{
				kind: "context",
				title: "Risk communication research",
				publisher: "Background reading",
				stance: "supports",
				note: "Helpful when translating percentages into real-world scale.",
				order: 2
			}
		]
	},
	{
		topicSlug: "active-debates",
		title: "What counts as an active scientific debate?",
		slug: "what-counts-as-an-active-scientific-debate",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 56,
		bottomLine:
			"An active scientific debate usually means experts are arguing about mechanism, effect size, edge cases, or model fit, not necessarily about whether the core phenomenon exists at all.",
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
		misconceptions: [
			"Media often compresses nuanced disagreement into a fake yes-or-no battle.",
			"People assume an active debate means experts have no useful provisional view."
		],
		editorSummary:
			"Use this as the main explainer for how frontier disagreement differs from the stable core of consensus.",
		sources: [
			{
				kind: "context",
				title: "Meta-analyses",
				publisher: "Background reading",
				stance: "supports",
				note: "Helpful when the dispute is about magnitude across many studies.",
				order: 1
			},
			{
				kind: "context",
				title: "Methods papers",
				publisher: "Background reading",
				stance: "context",
				note: "Useful when the fight is really about measurement or model fit.",
				order: 2
			}
		]
	}
];
