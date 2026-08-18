import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheFourSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026MediaMisinformationClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Can repeating a false claim make it feel more true?",
		slug: "can-repeating-a-false-claim-make-it-feel-more-true",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Repetition can increase perceived truth by making a statement easier and more familiar to process, even when the statement is false and even when some readers know the correct answer. The effect is reliable but not irresistible: source credibility, prior knowledge, attention, and explicit warnings can change its size.",
		stableCore: [
			"Repeated statements are, on average, judged truer than comparable new statements.",
			"Familiarity is not evidence, yet people can use processing fluency as an imperfect cue to truth.",
			"Repeating a myth while correcting it can therefore have tradeoffs; the correction should foreground the accurate replacement and evidence."
		],
		openQuestions: [
			"Which correction formats best preserve the necessary context without increasing harmful familiarity?",
			"How long do repetition effects persist across different topics, audiences, and media environments?"
		],
		whatWouldChangeMinds: [
			"Large preregistered replications showing no repetition effect across plausible and implausible claims, prior-knowledge levels, and realistic media settings.",
			"Evidence that processing fluency does not mediate any observed increase in perceived truth."
		],
		misconceptions: [
			"A familiar claim is not necessarily a well-supported claim.",
			"Knowledge reduces some errors but does not make everyone immune to repetition.",
			"The effect does not mean that any claim becomes universally believed after enough repetition."
		],
		editorSummary:
			"Repetition is a credibility cue the mind can mistake for evidence. Evaluate the source and support, not how familiar the sentence sounds.",
		uncertaintySummary:
			"The average effect is well established. Its magnitude and durability vary with claim plausibility, memory, warning timing, source cues, and audience.",
		sources: [
			{
				kind: "systematic_review",
				title: "The illusory truth effect: A review of how repetition increases belief in misinformation",
				publisher: "Current Opinion in Psychology",
				year: 2023,
				url: "https://doi.org/10.1016/j.copsyc.2023.101736",
				doi: "10.1016/j.copsyc.2023.101736",
				note: "Current review of the mechanisms, moderators, and misinformation implications of repetition-driven truth judgments."
			},
			{
				kind: "meta_analysis",
				title: "The Truth About the Truth: A Meta-Analytic Review of the Truth Effect",
				publisher: "Personality and Social Psychology Review",
				year: 2010,
				url: "https://doi.org/10.1177/1088868309352251",
				doi: "10.1177/1088868309352251",
				note: "Meta-analysis establishing the repeated-exposure effect and examining conditions that alter its size."
			},
			{
				kind: "landmark_study",
				title: "Knowledge Does Not Protect Against Illusory Truth",
				publisher: "Journal of Experimental Psychology: General",
				year: 2015,
				url: "https://doi.org/10.1037/xge0000098",
				doi: "10.1037/xge0000098",
				note: "Experiments showing that repetition can raise truth ratings even when participants can retrieve contradictory knowledge."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Can false-balance reporting make expert evidence look evenly divided?",
		slug: "can-false-balance-reporting-make-expert-evidence-look-evenly-divided",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Giving equal prominence to a marginal position and the evidence-weighted expert view can make audiences infer more expert disagreement and uncertainty than actually exists. Fair reporting can include dissent while making the relative weight, quality, and prevalence of the evidence explicit.",
		stableCore: [
			"Equal airtime is not the same as proportionate representation of evidence.",
			"Experiments find that false balance can distort perceived expert consensus and confidence in the stronger conclusion.",
			"Weight-of-evidence language can reduce the distortion without hiding genuine uncertainty or minority arguments."
		],
		openQuestions: [
			"Which visual and narrative formats communicate evidence weight most clearly without sounding partisan?",
			"How do effects vary when audiences already hold strong identities or prior beliefs about the issue?"
		],
		whatWouldChangeMinds: [
			"Replicated audience studies finding that equalized coverage does not alter perceived consensus, uncertainty, or policy beliefs.",
			"Evidence that proportional context reliably suppresses legitimate dissent rather than improving calibration."
		],
		misconceptions: [
			"Avoiding false balance does not require pretending every detail is settled.",
			"A credible dissenter may raise a useful objection without representing half of the field.",
			"Counting quoted speakers is not a substitute for weighing the evidence they represent."
		],
		editorSummary:
			"Journalistic balance should track evidential weight, not force every question into a fifty-fifty debate format.",
		uncertaintySummary:
			"The directional audience effect is well supported, especially in experiments. Real-world magnitude varies by topic, framing, audience, and prior knowledge.",
		sources: [
			{
				kind: "landmark_study",
				title: "Balance as bias: Global warming and the US prestige press",
				publisher: "Global Environmental Change",
				year: 2004,
				url: "https://doi.org/10.1016/j.gloenvcha.2003.10.001",
				doi: "10.1016/j.gloenvcha.2003.10.001",
				note: "Foundational content analysis documenting how balance norms can misrepresent the evidential distribution."
			},
			{
				kind: "landmark_study",
				title: "Can journalistic false balance distort public perception of consensus in expert opinion?",
				publisher: "Journal of Experimental Psychology: Applied",
				year: 2016,
				url: "https://doi.org/10.1037/xap0000073",
				doi: "10.1037/xap0000073",
				note: "Experimental evidence that balanced presentation of imbalanced expert views can distort perceived consensus."
			},
			{
				kind: "systematic_review",
				title: "When Fairness is Flawed: Effects of False Balance Reporting and Weight-of-Evidence Statements on Beliefs and Perceptions of Climate Change",
				publisher: "Journal of Applied Research in Memory and Cognition",
				year: 2022,
				url: "https://doi.org/10.1016/j.jarmac.2021.10.002",
				doi: "10.1016/j.jarmac.2021.10.002",
				note: "Experimental comparison showing false-balance harms and the corrective value of explicit weight-of-evidence statements."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Do corrections completely erase misinformation's influence?",
		slug: "do-corrections-completely-erase-misinformations-influence",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Usually not. Corrections reduce belief in and reasoning from misinformation, but a residual continued-influence effect often remains. Corrections work better when they are clear, credible, repeated when needed, explain why the claim is wrong, and provide a coherent replacement account.",
		stableCore: [
			"Debunking is beneficial on average; the common claim that corrections usually backfire is not supported.",
			"A correction can update explicit belief while the original claim still influences memory or later inference.",
			"Replacing the misinformation's explanatory role is generally more useful than a bare false label."
		],
		openQuestions: [
			"Which formats produce durable correction across identity-threatening and rapidly changing claims?",
			"How should platforms repeat corrections without unnecessarily re-amplifying the original falsehood?"
		],
		whatWouldChangeMinds: [
			"High-quality syntheses finding that corrected misinformation no longer affects later judgments across settings.",
			"Evidence that explanatory replacements and source credibility do not improve correction durability."
		],
		misconceptions: [
			"An imperfect correction is not a useless correction.",
			"Continued influence does not mean people consciously reject every correction.",
			"A true replacement explanation is different from merely repeating that a claim is false."
		],
		editorSummary:
			"Correct early, explain the error, and give readers an accurate account that can replace the misinformation in memory.",
		uncertaintySummary:
			"Correction benefits and residual influence are robust averages. Effect size depends on timing, detail, source, repetition, worldview, and outcome measurement.",
		sources: [
			{
				kind: "meta_analysis",
				title: "A Meta-Analytic Examination of the Continued Influence of Misinformation in the Face of Correction: How Powerful Is It, Why Does It Happen, and How to Stop It?",
				publisher: "Communication Research",
				year: 2020,
				url: "https://doi.org/10.1177/0093650219854600",
				doi: "10.1177/0093650219854600",
				note: "Meta-analysis quantifying residual misinformation effects and moderators of successful correction."
			},
			{
				kind: "meta_analysis",
				title: "Debunking: A Meta-Analysis of the Psychological Efficacy of Messages Countering Misinformation",
				publisher: "Psychological Science",
				year: 2017,
				url: "https://doi.org/10.1177/0956797617714579",
				doi: "10.1177/0956797617714579",
				note: "Synthesis showing overall debunking benefits and stronger effects from detailed counterarguments."
			},
			{
				kind: "systematic_review",
				title: "Misinformation and Its Correction: Continued Influence and Successful Debiasing",
				publisher: "Psychological Science in the Public Interest",
				year: 2012,
				url: "https://doi.org/10.1177/1529100612451018",
				doi: "10.1177/1529100612451018",
				note: "Integrative review of why misinformation persists and which correction principles are most defensible."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Do warning labels eliminate belief in and sharing of misinformation?",
		slug: "do-warning-labels-eliminate-belief-in-and-sharing-of-misinformation",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Warning labels usually reduce perceived accuracy and willingness to share labeled misinformation, but they do not eliminate either behavior. Effects depend on label specificity, source, timing, coverage, and design; labeling only a subset can also imply that unlabeled items were checked and found true.",
		stableCore: [
			"Specific false or disputed labels generally outperform doing nothing for the labeled content.",
			"Warnings are a friction and context tool, not a guarantee that readers will inspect evidence.",
			"Selective labeling can create an implied-truth effect for unlabeled claims, making coverage decisions part of the intervention."
		],
		openQuestions: [
			"Which label language and placement work best without overclaiming what fact-checkers know?",
			"How should systems handle fast-moving claims before reliable verification is available?"
		],
		whatWouldChangeMinds: [
			"Field-scale evidence showing no reduction in belief or sharing from well-designed, claim-specific warnings.",
			"Evidence that comprehensive labeling avoids neither implied truth nor audience reactance."
		],
		misconceptions: [
			"A label does not remove the underlying content from memory or circulation.",
			"An unlabeled post is not automatically verified.",
			"Average effectiveness does not imply equal effects across every audience or label design."
		],
		editorSummary:
			"Labels help, but they are one layer in a larger system of source transparency, correction, friction, and evidence access.",
		uncertaintySummary:
			"Experimental evidence supports modest average benefits. Long-run field effects, cross-platform transfer, reactance, and optimal coverage remain less certain.",
		sources: [
			{
				kind: "systematic_review",
				title: "Misinformation warning labels are widely effective: A review of warning effects and their moderating features",
				publisher: "Current Opinion in Psychology",
				year: 2023,
				url: "https://doi.org/10.1016/j.copsyc.2023.101710",
				doi: "10.1016/j.copsyc.2023.101710",
				note: "Review finding broad warning benefits while identifying important design and content moderators."
			},
			{
				kind: "landmark_study",
				title: "The Implied Truth Effect: Attaching Warnings to a Subset of Fake News Headlines Increases Perceived Accuracy of Headlines Without Warnings",
				publisher: "Management Science",
				year: 2020,
				url: "https://doi.org/10.1287/mnsc.2019.3478",
				doi: "10.1287/mnsc.2019.3478",
				note: "Experiments identifying the unintended credibility signal that selective warning coverage can create."
			},
			{
				kind: "landmark_study",
				title: "Fact-checker warning labels are effective even for those who distrust fact-checkers",
				publisher: "Nature Human Behaviour",
				year: 2024,
				url: "https://doi.org/10.1038/s41562-024-01973-x",
				doi: "10.1038/s41562-024-01973-x",
				note: "Experiments showing that fact-checker warning labels can reduce belief and sharing even among audiences who distrust fact-checkers."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Can brief accuracy prompts improve the quality of news people share?",
		slug: "can-brief-accuracy-prompts-improve-the-quality-of-news-people-share",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, modestly on average. Briefly directing attention to accuracy before a sharing decision can improve discernment between higher- and lower-quality news. The intervention does not make users reliable fact-checkers, and effects vary by prompt, platform, population, political context, and whether measured intentions become real behavior.",
		stableCore: [
			"Some misinformation sharing reflects inattention to accuracy rather than a deliberate preference for falsehood.",
			"Preregistered experiments and replications find an average improvement in sharing discernment after accuracy prompts.",
			"Prompts are low-cost complements to, not replacements for, source evaluation, platform design, and moderation."
		],
		openQuestions: [
			"How durable are effects in high-volume feeds when users see repeated prompts?",
			"Which prompts transfer from survey intentions to consequential sharing behavior without causing fatigue?"
		],
		whatWouldChangeMinds: [
			"Large independent field experiments finding no improvement in the relative quality of shared content.",
			"Evidence that apparent gains come only from reduced sharing of all news rather than better discernment."
		],
		misconceptions: [
			"A statistically reliable average effect is not a complete misinformation solution.",
			"Accuracy prompts do not certify the posts users decide to share.",
			"Improved discernment can coexist with continued sharing of some false content."
		],
		editorSummary:
			"A small pause to consider accuracy can improve sharing choices, but platforms should treat it as one modest behavioral safeguard.",
		uncertaintySummary:
			"The experimental average is replicated; effect durability, independent field replication, and real-platform implementation remain active questions.",
		sources: [
			{
				kind: "landmark_study",
				title: "Shifting attention to accuracy can reduce misinformation online",
				publisher: "Nature",
				year: 2021,
				url: "https://doi.org/10.1038/s41586-021-03344-2",
				doi: "10.1038/s41586-021-03344-2",
				note: "Preregistered experiments and a Twitter field experiment testing an attention-to-accuracy intervention."
			},
			{
				kind: "meta_analysis",
				title: "Accuracy prompts are a replicable and generalizable approach for reducing the spread of misinformation",
				publisher: "Nature Communications",
				year: 2022,
				url: "https://doi.org/10.1038/s41467-022-30073-5",
				doi: "10.1038/s41467-022-30073-5",
				note: "Internal meta-analysis and cross-country studies assessing replicability and heterogeneity."
			},
			{
				kind: "systematic_review",
				title: "The psychological drivers of misinformation belief and its resistance to correction",
				publisher: "Nature Reviews Psychology",
				year: 2022,
				url: "https://doi.org/10.1038/s44159-021-00006-y",
				doi: "10.1038/s44159-021-00006-y",
				note: "Broader review placing accuracy nudges among cognitive, social, and correction interventions."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Is online false news spread only by automated bots?",
		slug: "is-online-false-news-spread-only-by-automated-bots",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Bots can amplify low-credibility content and help it reach people early, but human users also select, reshare, and diffuse false stories. Platform incentives, novelty, emotion, identity, elite cues, and a relatively small set of highly active accounts can all matter; removing bots alone would not remove the problem.",
		stableCore: [
			"Human sharing behavior is necessary to explain much of the observed reach and speed of false news.",
			"Automated accounts can disproportionately amplify content and manipulate apparent popularity.",
			"Bot labels and detection contain classification error, so precise bot-versus-human shares depend on method and platform access."
		],
		openQuestions: [
			"How have generative systems and coordinated semi-automated accounts changed the human-bot boundary?",
			"Which platform interventions reduce amplification without suppressing legitimate automation or ordinary users?"
		],
		whatWouldChangeMinds: [
			"Audited platform-wide evidence showing that nearly all consequential false-news diffusion disappears after automated activity is removed.",
			"Independent data demonstrating that human users contribute negligibly to propagation once exposure is controlled."
		],
		misconceptions: [
			"Bots matter does not mean bots are the only spreaders.",
			"A human-operated account can still participate in coordinated manipulation.",
			"Observed diffusion patterns do not by themselves identify why every individual shared a story."
		],
		editorSummary:
			"Treat false-news diffusion as a human-and-system problem: automation amplifies, people choose, and platforms shape both.",
		uncertaintySummary:
			"The mixed human and automated contribution is clear. Exact shares are platform-, period-, language-, event-, and detector-specific.",
		sources: [
			{
				kind: "landmark_study",
				title: "The spread of true and false news online",
				publisher: "Science",
				year: 2018,
				url: "https://doi.org/10.1126/science.aap9559",
				doi: "10.1126/science.aap9559",
				note: "Large Twitter diffusion analysis finding false news spread farther and faster, with human behavior central to the difference."
			},
			{
				kind: "landmark_study",
				title: "The spread of low-credibility content by social bots",
				publisher: "Nature Communications",
				year: 2018,
				url: "https://doi.org/10.1038/s41467-018-06930-7",
				doi: "10.1038/s41467-018-06930-7",
				note: "Evidence that bots amplify low-credibility sources early and target influential users."
			},
			{
				kind: "systematic_review",
				title: "Social Bots and the Spread of Disinformation in Social Media: The Challenges of Artificial Intelligence",
				publisher: "British Journal of Management",
				year: 2021,
				url: "https://doi.org/10.1111/1467-8551.12554",
				doi: "10.1111/1467-8551.12554",
				note: "Review of automation, human interaction, detection limits, and platform-level amplification."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Do likes and share counts prove that online information is credible?",
		slug: "do-likes-and-share-counts-prove-that-online-information-is-credible",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Engagement counts measure interaction, not factual accuracy, and they can reflect emotion, controversy, coordinated promotion, bots, audience size, or interface design. Experiments show that visible engagement metrics can influence credibility judgments and increase vulnerability to low-quality information.",
		stableCore: [
			"Popularity and truth are different properties.",
			"People use visible social endorsement as a heuristic when deciding what deserves attention or belief.",
			"Counts can be manipulated and also omit who engaged, why they engaged, and whether the claim was checked."
		],
		openQuestions: [
			"Which alternative interface cues improve source evaluation without reducing useful social context?",
			"How do metric effects differ across platforms, age groups, and high-versus-low knowledge domains?"
		],
		whatWouldChangeMinds: [
			"Independent audits showing engagement counts closely track adjudicated accuracy after topic and audience size are controlled.",
			"Preregistered experiments finding that displayed metrics never alter attention, credibility, or sharing judgments."
		],
		misconceptions: [
			"High engagement can signal importance or interest without signaling truth.",
			"Low engagement does not show that a source is false.",
			"A verified account or large following does not verify every claim it publishes."
		],
		editorSummary:
			"Use engagement as a clue about reach, not as evidence. Credibility comes from traceable sources, methods, and corroboration.",
		uncertaintySummary:
			"The conceptual distinction is certain and experimental influence is supported; population effect sizes and interface-specific harms remain variable.",
		sources: [
			{
				kind: "landmark_study",
				title: "Exposure to Social Engagement Metrics Increases Vulnerability to Misinformation",
				publisher: "Harvard Kennedy School Misinformation Review",
				year: 2020,
				url: "https://doi.org/10.37016/mr-2020-033",
				doi: "10.37016/mr-2020-033",
				note: "Experimental evidence that visible engagement signals can weaken discrimination between low- and high-credibility content."
			},
			{
				kind: "systematic_review",
				title: "Credibility in social media: opinions, news, and health information—a survey",
				publisher: "Wiley Interdisciplinary Reviews: Data Mining and Knowledge Discovery",
				year: 2017,
				url: "https://doi.org/10.1002/widm.1209",
				doi: "10.1002/widm.1209",
				note: "Review of source, message, social, and platform cues used in online credibility judgments."
			},
			{
				kind: "landmark_study",
				title: "The spread of true and false news online",
				publisher: "Science",
				year: 2018,
				url: "https://doi.org/10.1126/science.aap9559",
				doi: "10.1126/science.aap9559",
				note: "Diffusion evidence showing that high reach and rapid sharing are compatible with false content."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Does a very large online sample eliminate selection bias?",
		slug: "does-a-very-large-online-sample-eliminate-selection-bias",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. A huge sample can make random error very small while leaving systematic selection error intact or even making a confidently wrong estimate. Representativeness depends on who could enter, who chose to respond, who was measured, and how the analysis adjusts—not simply on the number of observations.",
		stableCore: [
			"Sample size reduces sampling variance under a design; it does not automatically correct coverage, participation, survivorship, or measurement bias.",
			"When inclusion is related to the outcome, a small bias can dominate the shrinking random-error term in very large datasets.",
			"Probability sampling, validated weighting, benchmarking, and sensitivity analysis address questions that raw size cannot."
		],
		openQuestions: [
			"Which population benchmarks and selection models are defensible for a particular platform or convenience sample?",
			"How much residual bias remains after weighting when selection depends on unobserved variables?"
		],
		whatWouldChangeMinds: [
			"A valid theorem or broad empirical record showing that increasing a selected sample alone removes systematic error.",
			"Benchmarked studies demonstrating that nonprobability samples converge to target populations regardless of selection mechanism."
		],
		misconceptions: [
			"More decimal places do not guarantee a more accurate population estimate.",
			"A narrow confidence interval can exclude the truth when bias is omitted from the model.",
			"Big data can improve precision and prediction while still failing a population-prevalence question."
		],
		editorSummary:
			"Ask who is missing and why before being impressed by the row count. Precision about the sampled group is not representativeness of everyone.",
		uncertaintySummary:
			"The statistical principle is settled. The size and direction of selection bias are dataset- and target-population-specific.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Report of the AAPOR Task Force on Non-Probability Sampling",
				publisher: "American Association for Public Opinion Research",
				year: 2013,
				url: "https://aapor.org/wp-content/uploads/2022/11/NPS_TF_Report_Final_7_revised_FNL_6_22_13.pdf",
				note: "Professional assessment of inference limits, adjustment requirements, and transparency for nonprobability samples."
			},
			{
				kind: "landmark_study",
				title: "Statistical paradises and paradoxes in big data (I): Law of large populations, big data paradox, and the 2016 US presidential election",
				publisher: "The Annals of Applied Statistics",
				year: 2018,
				url: "https://doi.org/10.1214/18-AOAS1161SF",
				doi: "10.1214/18-AOAS1161SF",
				note: "Formal account of how tiny selection correlations can overwhelm random error as data volume grows."
			},
			{
				kind: "landmark_study",
				title: "Unrepresentative big surveys significantly overestimated US vaccine uptake",
				publisher: "Nature",
				year: 2021,
				url: "https://doi.org/10.1038/s41586-021-04198-4",
				doi: "10.1038/s41586-021-04198-4",
				note: "Empirical demonstration that very large convenience surveys can have severe selection error despite tiny nominal margins of error."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Can press releases and headlines turn association into causation?",
		slug: "can-press-releases-and-headlines-turn-association-into-causation",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Health and science press releases sometimes use causal language for correlational studies, and associated news stories are much more likely to repeat that exaggeration. The distortion is not inevitable: accurate caveats in press releases are also carried into news and do not appear to reduce coverage.",
		stableCore: [
			"Observational association can support causal inference only with assumptions and evidence not conveyed by a simple causes headline.",
			"Press releases are an important upstream source of both exaggeration and appropriate caveats in downstream reporting.",
			"Scientists, journals, and institutions share responsibility with reporters for the accuracy of public summaries."
		],
		openQuestions: [
			"How general are measured exaggeration rates across countries, disciplines, social media, and current newsroom practices?",
			"Which editorial checks most effectively preserve causal qualifiers under tight headline constraints?"
		],
		whatWouldChangeMinds: [
			"Prospective audits showing no relationship between causal overstatement in source materials and subsequent news.",
			"Evidence that adding accurate caveats consistently prevents publication or public understanding."
		],
		misconceptions: [
			"This is not solely a journalist problem; institutional source material can originate the exaggeration.",
			"A catchy causal verb does not upgrade an observational design.",
			"Adding caveats does not necessarily make a story unpublishable or unreadable."
		],
		editorSummary:
			"Trace a headline back through the press release to the study design. The causal strength cannot exceed the evidence chain.",
		uncertaintySummary:
			"The association between upstream and downstream exaggeration is replicated in large content analyses; current prevalence varies by outlet and field.",
		sources: [
			{
				kind: "landmark_study",
				title: "The association between exaggeration in health related science news and academic press releases: retrospective observational study",
				publisher: "BMJ",
				year: 2014,
				url: "https://doi.org/10.1136/bmj.g7015",
				doi: "10.1136/bmj.g7015",
				note: "Large linked analysis of papers, university press releases, and news stories identifying causal and human-inference exaggeration."
			},
			{
				kind: "landmark_study",
				title: "Exaggerations and Caveats in Press Releases and Health-Related Science News",
				publisher: "PLOS ONE",
				year: 2016,
				url: "https://doi.org/10.1371/journal.pone.0168217",
				doi: "10.1371/journal.pone.0168217",
				note: "Replication and extension showing that press-release caveats propagate without reducing news uptake."
			},
			{
				kind: "systematic_review",
				title: "Quality of information in news media reports about the effects of health interventions: Systematic review and meta-analyses",
				publisher: "F1000Research",
				year: 2021,
				url: "https://doi.org/10.12688/f1000research.52894.2",
				doi: "10.12688/f1000research.52894.2",
				note: "Broader review documenting recurrent shortcomings in communicating study design, risk, and evidential limits."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "media-misinformation",
		title: "Do media-literacy interventions reliably make everyone resistant to misinformation?",
		slug: "do-media-literacy-interventions-reliably-make-everyone-resistant-to-misinformation",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"No intervention makes everyone resistant, but media-literacy programs improve misinformation discernment on average. Effects vary by instructional design, dose, audience, culture, topic, outcome, and follow-up period; some interventions also make people more skeptical of accurate news, so truth-versus-falsehood discrimination matters more than disbelief alone.",
		stableCore: [
			"Meta-analytic evidence supports average gains in identifying, believing, or sharing misinformation more selectively.",
			"Multiple sessions and active practice often outperform one brief exposure.",
			"A good intervention improves discernment rather than simply lowering trust in all information."
		],
		openQuestions: [
			"Which curricula produce durable transfer to unfamiliar claims and real feeds?",
			"How can programs improve discernment without widening gaps in confidence, access, or digital skills?"
		],
		whatWouldChangeMinds: [
			"Independent meta-analyses finding no improvement in truth-versus-falsehood discernment under well-designed instruction.",
			"Long-term field evidence showing that apparent short-run gains consistently reverse or reduce belief in accurate reporting equally."
		],
		misconceptions: [
			"Media literacy is not a vaccine that permanently immunizes a person against falsehood.",
			"Lower belief in every headline is not the same as better judgment.",
			"A successful classroom exercise does not guarantee transfer to every platform and topic."
		],
		editorSummary:
			"Teach repeatable verification habits and measure whether learners separate stronger from weaker information—not whether they become broadly cynical.",
		uncertaintySummary:
			"Average benefits are supported, while durability, transfer, subgroup effects, and the best scalable curriculum remain heterogeneous.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Media Literacy Interventions Improve Resilience to Misinformation: A Meta-Analytic Investigation of Overall Effect and Moderating Factors",
				publisher: "Communication Research",
				year: 2024,
				url: "https://doi.org/10.1177/00936502241288103",
				doi: "10.1177/00936502241288103",
				note: "Meta-analysis of 49 experiments examining belief, discernment, sharing, dose, and audience moderators."
			},
			{
				kind: "meta_analysis",
				title: "Media Literacy Interventions: A Meta-Analytic Review",
				publisher: "Journal of Communication",
				year: 2012,
				url: "https://doi.org/10.1111/j.1460-2466.2012.01643.x",
				doi: "10.1111/j.1460-2466.2012.01643.x",
				note: "Foundational synthesis of media-literacy intervention effects and instructional moderators."
			},
			{
				kind: "landmark_study",
				title: "A digital media literacy intervention increases discernment between mainstream and false news in the United States and India",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2020,
				url: "https://doi.org/10.1073/pnas.1920498117",
				doi: "10.1073/pnas.1920498117",
				note: "Preregistered cross-national experiments illustrating average gains, weaker transfer in one population, and limited durability."
			}
		]
	})
];
