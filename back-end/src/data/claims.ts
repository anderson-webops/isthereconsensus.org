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
		topicSlug: "health-and-medicine",
		title: "Do childhood vaccines cause autism?",
		slug: "do-childhood-vaccines-cause-autism",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. Large epidemiological studies and major public-health bodies agree that childhood vaccines do not cause autism. The timing overlap between vaccination and autism diagnosis does not establish causation.",
		stableCore: [
			"Vaccine schedules have been studied across very large populations without finding a causal autism signal.",
			"Autism traits typically become noticeable around the same age vaccines are administered, which makes correlation easy to overread.",
			"Safety monitoring continues, but the core autism claim is treated as settled by major health institutions."
		],
		openQuestions: [
			"How can public-health communication address anxiety without accidentally amplifying the myth?",
			"Which trust-building interventions work best in communities that already distrust medical institutions?"
		],
		whatWouldChangeMinds: [
			"Repeated, well-designed evidence across independent populations showing a replicable causal pathway.",
			"A credible mechanism that survives epidemiology, pharmacovigilance, and replication."
		],
		misconceptions: [
			"Temporal sequence is often mistaken for causation because autism signs emerge in early childhood.",
			"Individual anecdotes can feel decisive even when large population data show no causal relationship."
		],
		editorSummary:
			"This is a flagship example of a strong public-health consensus with a persistent gap between expert evidence and public belief.",
		sources: [
			{
				kind: "guideline",
				title: "CDC vaccine safety guidance",
				publisher: "CDC",
				stance: "supports",
				note: "Used to anchor current public-health guidance and safety summaries.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "WHO vaccine safety resources",
				publisher: "World Health Organization",
				stance: "supports",
				note: "Useful for international consensus framing and public-health messaging.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Large pooled epidemiological studies on vaccines and autism",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "The key source type for separating anecdote from broad population outcomes.",
				order: 3
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is recent global warming mainly caused by human activity?",
		slug: "is-recent-global-warming-mainly-caused-by-human-activity",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. The current scientific consensus is that recent global warming is driven primarily by human greenhouse gas emissions, especially from fossil fuels.",
		stableCore: [
			"Greenhouse gases trap heat, and human activity has sharply raised atmospheric concentrations.",
			"Instrumental records, climate models, and paleoclimate evidence converge on the same broad explanation.",
			"The serious debate is mostly about timing, impacts, and feedback size, not about whether human-caused warming is real."
		],
		openQuestions: [
			"How fast will specific regional impacts unfold under different emissions paths?",
			"Which feedback loops will matter most at local scales and over which time horizons?"
		],
		whatWouldChangeMinds: [
			"A better model that explains the observed warming trend without requiring anthropogenic greenhouse forcing.",
			"Robust contradictory evidence across atmospheric physics, instrumental data, and attribution studies."
		],
		misconceptions: [
			"A cold day or cold winter is often mistaken for evidence against long-term warming trends.",
			"Public discussions regularly treat fringe contrarian voices as if they reflected the center of the expert literature."
		],
		editorSummary:
			"This should be treated as a canonical strong-consensus page where public misunderstanding comes largely from media distortion and fake-expert framing.",
		sources: [
			{
				kind: "consensus_statement",
				title: "IPCC assessment reports",
				publisher: "IPCC",
				stance: "supports",
				note: "The main synthesis resource for the full climate evidence stack.",
				order: 1
			},
			{
				kind: "guideline",
				title: "NASA and NOAA climate summaries",
				publisher: "NASA / NOAA",
				stance: "supports",
				note: "Useful for observational records and clear public-facing summaries.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Consensus-in-the-literature assessments",
				publisher: "Peer-reviewed literature",
				stance: "supports",
				note: "Useful when showing how agreement is measured among domain experts.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Are dietary cholesterol and saturated fat the same kind of risk?",
		slug: "are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 78,
		bottomLine:
			"No. The current picture is more nuanced than older public advice suggested. Saturated fat still matters for cardiovascular risk, but dietary cholesterol is not a one-to-one proxy for blood cholesterol in the way many people were taught.",
		stableCore: [
			"Extremely high intakes remain a bad idea, but the risk story is more complex than 'all cholesterol in food is dangerous.'",
			"Saturated fat still carries more weight in current cardiovascular guidance than dietary cholesterol alone.",
			"Nutritional headlines often overstate findings from observational studies that cannot cleanly isolate cause."
		],
		openQuestions: [
			"How much do individual metabolic differences change the effect of specific foods?",
			"Which substitution patterns matter most in real diets, not just isolated nutrients?"
		],
		whatWouldChangeMinds: [
			"Large, better-controlled dietary evidence that shifts the size or direction of observed cardiovascular risk.",
			"A clearer mechanistic and clinical picture linking intake patterns to long-term outcomes across diverse populations."
		],
		misconceptions: [
			"Old nutrition messaging left many people with the impression that all fats and all cholesterol behave the same way.",
			"Single nutrition studies are often reported as if they erase decades of guidance all at once."
		],
		editorSummary:
			"This page should show how real scientific updating works: the broad dietary picture changes by refinement more often than by total reversal.",
		sources: [
			{
				kind: "guideline",
				title: "AHA and ACC dietary guidance",
				publisher: "AHA / ACC",
				stance: "supports",
				note: "Important for cardiovascular framing and public-health guidance.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Systematic reviews on saturated fat and cardiovascular outcomes",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "Useful for separating nutrient panic from evidence-based risk assessment.",
				order: 2
			}
		]
	},
	{
		topicSlug: "biology-and-evolution",
		title: "Is evolution 'just a theory'?",
		slug: "is-evolution-just-a-theory",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. In science, a theory is a well-supported explanatory framework, not a casual guess. Evolution by common descent and natural selection is one of the core organizing theories of modern biology.",
		stableCore: [
			"The scientific meaning of theory is much stronger than the everyday meaning.",
			"Fossils, genetics, comparative anatomy, and biogeography all converge on common descent.",
			"Debates inside evolutionary biology usually concern mechanisms, rates, and details, not whether evolution happened."
		],
		openQuestions: [
			"Which evolutionary mechanisms dominate in specific edge cases or time scales?",
			"How should educators explain theory in a way that avoids everyday-language confusion?"
		],
		whatWouldChangeMinds: [
			"Repeated evidence that fundamentally breaks common descent across independent lines of biological data.",
			"A better framework that explains the fossil, genetic, and comparative record more successfully."
		],
		misconceptions: [
			"The phrase 'just a theory' imports the everyday meaning of theory into a technical scientific context.",
			"People sometimes expect an impossibly complete fossil record before accepting a historical scientific explanation."
		],
		editorSummary:
			"This claim is useful for teaching both the public meaning of theory and the difference between impossible expectations and legitimate scientific scrutiny.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Major biology society statements on evolution",
				publisher: "Scientific societies",
				stance: "supports",
				note: "Useful for clarifying that this is a foundational biological consensus, not a marginal view.",
				order: 1
			},
			{
				kind: "context",
				title: "Comparative genetics and fossil evidence overviews",
				publisher: "Biology education references",
				stance: "supports",
				note: "Helpful when explaining why the evidence is cumulative across multiple fields.",
				order: 2
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do learning styles improve educational outcomes?",
		slug: "do-learning-styles-improve-educational-outcomes",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"Not in the way the popular myth suggests. There is no strong evidence that matching instruction to a student's self-described learning style reliably improves outcomes.",
		stableCore: [
			"The learning-styles idea is intuitive, but it has not held up well under stronger testing.",
			"Students may have preferences, but preference is not the same thing as evidence for better learning.",
			"Instructional quality and content structure matter more than sorting students into fixed sensory categories."
		],
		openQuestions: [
			"Which evidence-based teaching adaptations matter most for specific subjects and age groups?",
			"How can educators replace the learning-styles myth with strategies that are actually supported?"
		],
		whatWouldChangeMinds: [
			"Repeated controlled evidence showing that matching instruction to declared styles produces reliable performance gains.",
			"A stronger framework that distinguishes preference from measurable learning benefit."
		],
		misconceptions: [
			"The idea survives partly because people like personality categories that feel personal and intuitive.",
			"Teacher training often repeated the concept long after the research support failed to materialize."
		],
		editorSummary:
			"This is a flagship neuromyth page. It should model how an intuitive idea can spread widely without earning strong empirical support.",
		sources: [
			{
				kind: "systematic_review",
				title: "Educational reviews on learning styles",
				publisher: "Education research",
				stance: "supports",
				note: "Useful for showing that the empirical case for style-matching remains weak.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Psychology and education commentary on neuromyths",
				publisher: "Behavioral science references",
				stance: "context",
				note: "Helpful for explaining why the myth persists despite weak evidence.",
				order: 2
			}
		]
	},
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
