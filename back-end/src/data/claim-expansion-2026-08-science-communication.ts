import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheFourSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026ScienceCommunicationClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Do more facts alone reliably resolve polarized science disputes?",
		slug: "do-more-facts-alone-reliably-resolve-polarized-science-disputes",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Accurate information is necessary, and knowledge can improve judgment, but facts alone do not reliably resolve disputes shaped by identity, values, trust, perceived fairness, or different decisions under uncertainty. Effective communication starts with accurate evidence and also considers audience questions, messengers, context, and opportunities for dialogue.",
		stableCore: [
			"The simple deficit model—assuming disagreement is only missing knowledge—is inadequate as a universal strategy.",
			"People can understand the same evidence yet differ about values, tradeoffs, or which institution they trust.",
			"Rejecting facts-only communication does not license factual relativism; claims still need evidence."
		],
		openQuestions: [
			"Which combinations of information, dialogue, messenger, and value framing work for a particular audience and issue?",
			"How can communicators respect legitimate value differences without tailoring away inconvenient evidence?"
		],
		whatWouldChangeMinds: [
			"Cross-topic trials showing that supplying additional facts alone consistently closes polarized gaps regardless of trust and identity.",
			"Evidence that audience participation, messenger fit, and perceived fairness add no explanatory or practical value."
		],
		misconceptions: [
			"Facts are not enough does not mean facts do not matter.",
			"Disagreement is not always caused by ignorance or irrationality.",
			"Audience-centered communication should not conceal uncertainty or change the evidential conclusion."
		],
		editorSummary:
			"Lead with accurate evidence, then diagnose the actual disagreement: knowledge, trust, values, tradeoffs, or identity may require different responses.",
		uncertaintySummary:
			"The limits of a universal deficit model are established. Which alternative works best is issue-, audience-, relationship-, and context-dependent.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Communicating Science Effectively: A Research Agenda",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/23674",
				doi: "10.17226/23674",
				note: "Consensus assessment of science-communication goals, audiences, trust, beliefs, values, and research gaps."
			},
			{
				kind: "systematic_review",
				title: "The lure of rationality: Why does the deficit model persist in science communication?",
				publisher: "Public Understanding of Science",
				year: 2016,
				url: "https://doi.org/10.1177/0963662516629749",
				doi: "10.1177/0963662516629749",
				note: "Review of the deficit model's assumptions, persistence, and limits in practice."
			},
			{
				kind: "systematic_review",
				title: "Why Facts Are Not Enough: Understanding and Managing the Motivated Rejection of Science",
				publisher: "Current Directions in Psychological Science",
				year: 2020,
				url: "https://doi.org/10.1177/0963721420969364",
				doi: "10.1177/0963721420969364",
				note: "Review of identity, worldview, trust, and other motives that can shape responses to scientific information."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Can unexplained scientific jargon reduce understanding and engagement?",
		slug: "can-unexplained-scientific-jargon-reduce-understanding-and-engagement",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Unfamiliar technical terms make information harder to process and can reduce comprehension, confidence, interest, and willingness to engage, even when definitions are available. Necessary terminology should be defined in plain language and connected to concrete examples rather than removed when precision depends on it.",
		stableCore: [
			"Jargon imposes cognitive load and can make readers feel less capable of understanding science.",
			"Processing difficulty can lower engagement independently of the information's actual importance or quality.",
			"Plain wording and layered definitions preserve precision better than either unexplained jargon or inaccurate oversimplification."
		],
		openQuestions: [
			"Which terms should be retained and taught because they support durable scientific literacy?",
			"How do jargon effects vary with expertise, motivation, language, disability, and the stakes of the decision?"
		],
		whatWouldChangeMinds: [
			"Replicated experiments showing no comprehension, fluency, confidence, or engagement cost from unfamiliar technical language.",
			"Evidence that definitions and plain-language layering consistently reduce accuracy rather than improve access."
		],
		misconceptions: [
			"A technical term is not bad merely because it is technical.",
			"A glossary alone may not remove the interruption and self-doubt created by dense jargon.",
			"Plain language is not the same as talking down to readers."
		],
		editorSummary:
			"Use the simplest accurate term first. Introduce specialist vocabulary only when it earns its place, then define and demonstrate it.",
		uncertaintySummary:
			"Average comprehension and engagement costs are supported experimentally; the optimal balance between accessibility and technical precision varies by audience and task.",
		sources: [
			{
				kind: "landmark_study",
				title: "Jargon as a barrier to effective science communication: Evidence from metacognition",
				publisher: "Public Understanding of Science",
				year: 2020,
				url: "https://doi.org/10.1177/0963662519865687",
				doi: "10.1177/0963662519865687",
				note: "Experiments linking jargon to processing difficulty, lower self-assessed understanding, and reduced engagement."
			},
			{
				kind: "landmark_study",
				title: "The Effects of Jargon on Processing Fluency, Self-Perceptions, and Scientific Engagement",
				publisher: "Journal of Language and Social Psychology",
				year: 2020,
				url: "https://doi.org/10.1177/0261927X20902177",
				doi: "10.1177/0261927X20902177",
				note: "Replication and extension across science topics, including conditions where definitions were supplied."
			},
			{
				kind: "guideline",
				title: "CDC Clear Communication Index: A Tool for Developing and Assessing CDC Public Communication Products",
				publisher: "Centers for Disease Control and Prevention",
				year: 2019,
				url: "https://www.cdc.gov/ccindex/tool/index.html",
				note: "Operational guidance for main-message clarity, familiar language, explanations, numbers, risks, and recommended actions."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Does plain language improve comprehension without guaranteeing an informed decision?",
		slug: "does-plain-language-improve-comprehension-without-guaranteeing-an-informed-decision",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Plain language, clear structure, and readable presentation generally improve access and comprehension, especially for readers facing health-literacy barriers. They cannot guarantee an informed decision because information may still be incomplete, numeracy varies, values and options matter, and understanding must be tested rather than inferred from readability alone.",
		stableCore: [
			"Clear wording and organization reduce avoidable comprehension burden without requiring the evidence to be watered down.",
			"Readability formulas measure surface features and cannot verify accuracy, completeness, or actual understanding.",
			"Decision support also needs balanced options, benefits, harms, uncertainty, and value-sensitive comparison."
		],
		openQuestions: [
			"Which combinations of plain text, visuals, teach-back, and decision aids work best for different readers?",
			"How should materials remain concise while preserving rare harms, uncertainty, and meaningful alternatives?"
		],
		whatWouldChangeMinds: [
			"Trials showing no average comprehension or usability gains from evidence-based plain-language revisions.",
			"Evidence that readability scores alone reliably guarantee informed, value-consistent choices."
		],
		misconceptions: [
			"Plain language does not mean deleting uncertainty or detail that changes a decision.",
			"A short sentence can still be misleading or incomplete.",
			"Comprehension is one component of informed choice, not the whole decision."
		],
		editorSummary:
			"Make the accurate path easy to read, then test whether people can find the main point, explain the tradeoff, and use it in their decision.",
		uncertaintySummary:
			"Accessibility benefits are well supported; the best format and the link from comprehension to real choices depend on population and decision context.",
		sources: [
			{
				kind: "guideline",
				title: "CDC Clear Communication Index: A Tool for Developing and Assessing CDC Public Communication Products",
				publisher: "Centers for Disease Control and Prevention",
				year: 2019,
				url: "https://www.cdc.gov/ccindex/tool/index.html",
				note: "Validated public-health communication framework covering main messages, language, information design, risk, and action."
			},
			{
				kind: "systematic_review",
				title: "Interventions for enhancing consumers' online health literacy",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2011,
				url: "https://doi.org/10.1002/14651858.CD007092.pub2",
				doi: "10.1002/14651858.CD007092.pub2",
				note: "Synthesis of interventions intended to improve people's ability to find, understand, and use online health information."
			},
			{
				kind: "systematic_review",
				title: "Decision aids for people facing health treatment or screening decisions",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2024,
				url: "https://doi.org/10.1002/14651858.CD001431.pub6",
				doi: "10.1002/14651858.CD001431.pub6",
				note: "Large review showing how balanced decision support can improve knowledge and value-choice congruence beyond readability alone."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Can natural frequencies and icon arrays improve risk understanding?",
		slug: "can-natural-frequencies-and-icon-arrays-improve-risk-understanding",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, often. Expressing outcomes as counts out of the same population and using well-designed icon arrays can make ratios, denominators, and small absolute differences easier to see. No visual is universally best: clutter, inconsistent denominators, poor labels, animation, or the wrong graph for the task can reduce understanding.",
		stableCore: [
			"Natural frequencies can make conditional probabilities and event counts more concrete than isolated percentages.",
			"Icon arrays can support ratio and part-to-whole comprehension, particularly for lower-numeracy audiences.",
			"The comparison must use a common denominator, timeframe, outcome definition, and clearly labeled groups."
		],
		openQuestions: [
			"Which display works best for very rare events, repeated outcomes, competing risks, and uncertainty intervals?",
			"How should accessible risk graphics adapt for screen readers, small screens, color-vision differences, and low vision?"
		],
		whatWouldChangeMinds: [
			"Updated syntheses showing that natural-frequency and icon-array formats never improve calibrated comprehension over alternatives.",
			"Evidence that benefits disappear when labels, denominator, numeracy, and task are properly controlled."
		],
		misconceptions: [
			"A picture is not automatically clearer than text or numbers.",
			"Changing the denominator between groups can create a visual illusion rather than clarity.",
			"Understanding a probability does not determine which tradeoff a person should choose."
		],
		editorSummary:
			"Show both groups with the same denominator and time horizon, label the event and non-event, and test the graphic with the intended audience.",
		uncertaintySummary:
			"Average benefits are supported, but format-by-task interactions are substantial and evidence is stronger for comprehension than for downstream behavior.",
		sources: [
			{
				kind: "systematic_review",
				title: "Evidence-Based Risk Communication: A Systematic Review",
				publisher: "Annals of Internal Medicine",
				year: 2014,
				url: "https://doi.org/10.7326/M14-0295",
				doi: "10.7326/M14-0295",
				note: "Systematic review of numerical, verbal, and visual formats for communicating health benefits and harms."
			},
			{
				kind: "systematic_review",
				title: "Effect of different visual presentations on the comprehension of prognostic information: a systematic review",
				publisher: "BMC Medical Informatics and Decision Making",
				year: 2021,
				url: "https://doi.org/10.1186/s12911-021-01612-9",
				doi: "10.1186/s12911-021-01612-9",
				note: "Systematic review of how graphical formats affect comprehension of quantitative prognostic information."
			},
			{
				kind: "landmark_study",
				title: "From reading numbers to seeing ratios: a benefit of icons for risk comprehension",
				publisher: "Psychological Research",
				year: 2018,
				url: "https://doi.org/10.1007/s00426-018-1041-4",
				doi: "10.1007/s00426-018-1041-4",
				note: "Experimental evidence on icon arrays as external representations of ratios."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Can equivalent survival and mortality framing change people's choices?",
		slug: "can-equivalent-survival-and-mortality-framing-change-peoples-choices",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Describing an equivalent outcome as survival rather than mortality, or gain rather than loss, can change risk perception and treatment preference even when the underlying numbers are identical. Balanced communication should present both sides or use neutral event and non-event counts with the same denominator and timeframe.",
		stableCore: [
			"Positive and negative frames direct attention to different aspects of an identical outcome distribution.",
			"Framing effects occur among patients and professionals and can influence consequential choices.",
			"Presenting complementary frequencies makes the equivalence visible and reduces the communicator's control over emphasis."
		],
		openQuestions: [
			"Which neutral formats best reduce framing effects without overwhelming readers?",
			"When is an intentional gain or loss frame ethically justified to communicate a recommended action?"
		],
		whatWouldChangeMinds: [
			"Large replications showing identical judgments and choices under complementary positive and negative frames.",
			"Evidence that dual framing never improves recognition of the full outcome distribution."
		],
		misconceptions: [
			"A true statistic can still create a selective impression through framing.",
			"Survival and mortality figures are equivalent only when population, endpoint, and timeframe match.",
			"Framing sensitivity does not mean a choice is irrational if values differ after the equivalence is understood."
		],
		editorSummary:
			"Show the event and its complement side by side. If 90 survive, also say 10 do not—using the same 100 people and timeframe.",
		uncertaintySummary:
			"Framing effects are robust; magnitude varies by expertise, numeracy, stakes, wording, baseline risk, and decision context.",
		sources: [
			{
				kind: "landmark_study",
				title: "On the elicitation of preferences for alternative therapies",
				publisher: "New England Journal of Medicine",
				year: 1982,
				url: "https://doi.org/10.1056/NEJM198205273062103",
				doi: "10.1056/NEJM198205273062103",
				note: "Landmark demonstration that survival-versus-mortality wording changes treatment preferences."
			},
			{
				kind: "systematic_review",
				title: "Presenting risk information—a review of the effects of framing and other manipulations on patient outcomes",
				publisher: "Journal of Health Communication",
				year: 2001,
				url: "https://doi.org/10.1080/10810730150501413",
				doi: "10.1080/10810730150501413",
				note: "Review of attribute and goal framing across health judgments, intentions, and choices."
			},
			{
				kind: "guideline",
				title: "Presenting quantitative information about decision outcomes: a risk communication primer for patient decision aid developers",
				publisher: "International Patient Decision Aid Standards Collaboration",
				year: 2013,
				url: "https://doi.org/10.1186/1472-6947-13-S2-S7",
				doi: "10.1186/1472-6947-13-S2-S7",
				note: "Evidence-based guidance recommending consistent denominators, timeframes, and balanced event framing."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Do words like likely and rare mean the same probability to everyone?",
		slug: "do-words-like-likely-and-rare-mean-the-same-probability-to-everyone",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. People map verbal probability terms such as likely, possible, uncommon, and rare to wide and overlapping numerical ranges. Meanings shift with context, outcome severity, direction, and personal experience, so consequential communication should pair carefully calibrated words with numbers, denominators, and timeframes when possible.",
		stableCore: [
			"The same verbal label produces substantial between-person variation in numerical interpretation.",
			"Context can shift interpretation even for a standardized phrase.",
			"Words remain useful for readability and uncertainty, but numbers reduce ambiguity when their own format is clear."
		],
		openQuestions: [
			"Which word-number combinations work best for low numeracy, translation, and uncertain model estimates?",
			"How should communicators express probabilities that are imprecise, changing, or conditional on assumptions?"
		],
		whatWouldChangeMinds: [
			"Cross-language studies showing tight, context-invariant numerical interpretation of common probability words.",
			"Evidence that adding clear numerical ranges consistently worsens calibration and understanding."
		],
		misconceptions: [
			"Likely is not a universal percentage unless a scale explicitly defines it.",
			"A number can also mislead if the denominator, timeframe, and uncertainty are omitted.",
			"Standardized labels improve consistency but do not erase audience variation."
		],
		editorSummary:
			"When the number matters, give the number and define its reference class and timeframe; use the verbal label as support, not as the sole measurement.",
		uncertaintySummary:
			"Interpretive variability is firmly established. Optimal wording and numeric precision depend on context, audience, and the quality of the underlying estimate.",
		sources: [
			{
				kind: "systematic_review",
				title: "Imprecision and Preferences in Interpretation of Verbal Probabilities in Health: a Systematic Review",
				publisher: "Journal of General Internal Medicine",
				year: 2021,
				url: "https://doi.org/10.1007/s11606-021-07050-7",
				doi: "10.1007/s11606-021-07050-7",
				note: "Systematic review documenting wide numerical variation and preferences for combined verbal-numeric communication."
			},
			{
				kind: "meta_analysis",
				title: "The Interpretation of Verbal Probabilities: A Systematic Literature Review and Meta-Analysis",
				publisher: "Studies in Health Technology and Informatics",
				year: 2022,
				url: "https://doi.org/10.3233/SHTI220798",
				doi: "10.3233/SHTI220798",
				note: "Meta-analysis documenting broad and overlapping numerical interpretations of verbal probability phrases."
			},
			{
				kind: "guideline",
				title: "Guidance Note for Lead Authors of the IPCC Fifth Assessment Report on Consistent Treatment of Uncertainties",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2010,
				url: "https://www.ipcc.ch/site/assets/uploads/2018/05/uncertainty-guidance-note.pdf",
				note: "Institutional framework explicitly mapping calibrated likelihood terms to probability ranges while separating confidence."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Can personal narratives improve engagement while also biasing risk judgments?",
		slug: "can-personal-narratives-improve-engagement-while-also-biasing-risk-judgments",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Stories can make information memorable, understandable, and emotionally engaging, but a vivid individual case can receive more weight than representative outcome data. Narratives are safest when they illustrate rather than replace the evidence and when examples reflect the range of plausible experiences.",
		stableCore: [
			"Narratives can change knowledge, attitudes, intentions, and choices through attention, identification, and emotion.",
			"Anecdotes are selected cases and cannot estimate prevalence, average benefit, or comparative risk.",
			"Patient stories in decision aids can help or bias depending on content, balance, and placement."
		],
		openQuestions: [
			"Which narrative designs improve understanding without crowding out base rates and uncertainty?",
			"How should communicators select representative stories without turning people into statistical props?"
		],
		whatWouldChangeMinds: [
			"Syntheses showing narratives never affect engagement, memory, risk perception, or choice beyond factual content.",
			"Evidence that vivid examples cannot bias judgment when population statistics are also shown."
		],
		misconceptions: [
			"A moving story can be true and still unrepresentative.",
			"Statistics and stories are not mutually exclusive formats.",
			"Removing every human example can reduce accessibility without eliminating other framing choices."
		],
		editorSummary:
			"Use stories to show what an outcome can feel like, then use representative data to show how often and for whom it occurs.",
		uncertaintySummary:
			"Engagement and persuasive effects are supported; direction and decision quality depend strongly on story selection, audience, and accompanying statistics.",
		sources: [
			{
				kind: "systematic_review",
				title: "Using narrative communication as a tool for health behavior change: a conceptual, theoretical, and empirical overview",
				publisher: "Health Education & Behavior",
				year: 2007,
				url: "https://doi.org/10.1177/1090198106291963",
				doi: "10.1177/1090198106291963",
				note: "Foundational review of narrative mechanisms, engagement, persuasion, and evidence gaps."
			},
			{
				kind: "systematic_review",
				title: "Impact of Narratives on Persuasion in Health Communication: A Meta-Analysis",
				publisher: "Journal of Advertising",
				year: 2015,
				url: "https://doi.org/10.1080/00913367.2015.1018467",
				doi: "10.1080/00913367.2015.1018467",
				note: "Review of when stories support or undermine public-health understanding and behavior."
			},
			{
				kind: "systematic_review",
				title: "Do Personal Stories Make Patient Decision Aids More Effective? An Update from the International Patient Decision Aids Standards",
				publisher: "Medical Decision Making",
				year: 2021,
				url: "https://doi.org/10.1177/0272989X211011100",
				doi: "10.1177/0272989X211011100",
				note: "Decision-focused review identifying both explanatory value and risks of unbalanced testimonial influence."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Is one trusted messenger equally credible to every audience?",
		slug: "is-one-trusted-messenger-equally-credible-to-every-audience",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Perceived expertise, honesty, shared identity, care, independence, and past performance differ across audiences and topics. A nationally prominent expert may be less trusted than a local clinician or community leader, while familiarity without relevant expertise is not enough for technical accuracy.",
		stableCore: [
			"Trust is relational and multidimensional rather than a permanent property of a speaker.",
			"Messenger effects interact with message content, channel, audience identity, institutions, and historical experience.",
			"Strong communication often pairs technical experts with credible community intermediaries instead of searching for one universal voice."
		],
		openQuestions: [
			"Which messenger combinations work for a specific community without tokenism or hidden sponsorship?",
			"How can institutions repair trust after errors rather than merely changing spokespersons?"
		],
		whatWouldChangeMinds: [
			"Cross-audience studies showing identical credibility and behavior effects for the same messenger across topics and communities.",
			"Evidence that shared identity, institutional trust, and perceived independence never moderate reception."
		],
		misconceptions: [
			"Trusted does not automatically mean technically correct.",
			"Expertise in one field does not transfer to every claim.",
			"Selecting an audience-credible messenger should not hide funding, uncertainty, or the evidence source."
		],
		editorSummary:
			"Match relevant expertise with earned relational trust, disclose interests, and let communities question both the evidence and the messenger.",
		uncertaintySummary:
			"Audience variation is clear; effects are highly context-specific, and much messenger research is observational or crisis-specific.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Communicating Science Effectively: A Research Agenda",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/23674",
				doi: "10.17226/23674",
				note: "Consensus synthesis of source credibility, trust, audience beliefs, and communication context."
			},
			{
				kind: "systematic_review",
				title: "Characterising trusted spokespeople in noncommunicable disease prevention: A systematic scoping review",
				publisher: "Preventive Medicine Reports",
				year: 2022,
				url: "https://doi.org/10.1016/j.pmedr.2022.101934",
				doi: "10.1016/j.pmedr.2022.101934",
				note: "Review showing that credibility characteristics and preferred spokespersons differ by audience and health topic."
			},
			{
				kind: "systematic_review",
				title: "Public Trust in Science: A Systematic Literature Review",
				publisher: "Journal of Academic Ethics",
				year: 2026,
				url: "https://doi.org/10.1007/s10805-026-09732-5",
				doi: "10.1007/s10805-026-09732-5",
				note: "Review organizing trust factors across audience characteristics, communication, scientific practice, and source integrity."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Do fear appeals work best when people also receive effective action guidance?",
		slug: "do-fear-appeals-work-best-when-people-also-receive-effective-action-guidance",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Generally yes. Fear appeals can change attitudes, intentions, and behavior on average, but messages are more defensible and effective when they pair a credible threat with a clear action that people believe works and can perform. High threat without efficacy can encourage avoidance, denial, helplessness, or disengagement.",
		stableCore: [
			"Meta-analyses find average persuasive effects rather than a universal backfire.",
			"Response efficacy and self-efficacy help translate concern into protective action.",
			"Threat claims should remain proportionate to evidence and should not use panic or stigma as shortcuts."
		],
		openQuestions: [
			"What threat level is proportionate and effective for different hazards, audiences, and available actions?",
			"How do repeated fear messages affect trust, fatigue, avoidance, and inequity over time?"
		],
		whatWouldChangeMinds: [
			"Updated meta-analyses showing efficacy information never improves outcomes or reduces defensive responses.",
			"Field evidence that unsupported high-threat messages consistently outperform accurate threat-plus-action communication."
		],
		misconceptions: [
			"Fear appeals do not always fail or always succeed.",
			"Making a threat sound larger than evidence supports is not justified by a good cause.",
			"Telling people what to do is insufficient if the action is inaccessible or they doubt it works."
		],
		editorSummary:
			"Communicate a proportionate threat, a specific effective response, and how the audience can realistically carry it out.",
		uncertaintySummary:
			"Average fear-appeal and efficacy effects are supported; durability and real-world impact vary by behavior, intensity, access, and audience.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Appealing to fear: A meta-analysis of fear appeal effectiveness and theories",
				publisher: "Psychological Bulletin",
				year: 2015,
				url: "https://doi.org/10.1037/a0039729",
				doi: "10.1037/a0039729",
				note: "Large meta-analysis finding average effects and examining threat, efficacy, behavior, and audience moderators."
			},
			{
				kind: "meta_analysis",
				title: "Self- and Response Efficacy Information in Fear Appeals: A Meta-Analysis",
				publisher: "Journal of Communication",
				year: 2022,
				url: "https://doi.org/10.1093/joc/jqab048",
				doi: "10.1093/joc/jqab048",
				note: "Focused synthesis of how capability and response-effectiveness information shape persuasion."
			},
			{
				kind: "guideline",
				title: "Communicating risk in public health emergencies: a WHO guideline for emergency risk communication policy and practice",
				publisher: "World Health Organization",
				year: 2017,
				url: "https://www.who.int/publications/i/item/9789241550208",
				note: "Institutional guidance emphasizing credible, timely, actionable, transparent, and community-informed risk communication."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "science-communication",
		title: "Does two-way public engagement add value beyond one-way science messaging?",
		slug: "does-two-way-public-engagement-add-value-beyond-one-way-science-messaging",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, when participation is genuine and matched to the decision. Dialogue can surface local knowledge, values, practical constraints, misconceptions, and trust problems that one-way transmission misses. It does not make every technical conclusion negotiable, guarantee agreement, or justify a performative consultation with no influence.",
		stableCore: [
			"Listening helps communicators diagnose audience goals and barriers before choosing a message.",
			"Public participants can contribute experiential, contextual, ethical, and implementation knowledge alongside technical expertise.",
			"Effective engagement needs a clear purpose, inclusive access, transparent decision authority, and feedback about how input was used."
		],
		openQuestions: [
			"Which engagement designs improve knowledge, legitimacy, decisions, or implementation for each type of issue?",
			"How can participation avoid domination by the loudest, best-resourced, or most organized voices?"
		],
		whatWouldChangeMinds: [
			"Comparative evaluations showing that well-designed dialogue never improves problem definition, trust, implementation, or decision quality.",
			"Evidence that local and experiential knowledge adds no information relevant to real-world scientific decisions."
		],
		misconceptions: [
			"Engagement is not a public vote on physical facts.",
			"Inviting comments after a decision is fixed is not necessarily meaningful participation.",
			"Dialogue does not require scientists to treat every claim as equally supported."
		],
		editorSummary:
			"State what is open, who decides, and how input can matter. Then listen early enough for the answers to change communication or implementation.",
		uncertaintySummary:
			"The diagnostic and legitimacy value is broadly recognized; outcome evidence is heterogeneous because engagement goals, methods, and evaluation measures differ.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Communicating Science Effectively: A Research Agenda",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/23674",
				doi: "10.17226/23674",
				note: "Consensus report defining communication as audience- and goal-specific rather than simple information transmission."
			},
			{
				kind: "consensus_statement",
				title: "Public Participation in Environmental Assessment and Decision Making",
				publisher: "National Research Council",
				year: 2008,
				url: "https://doi.org/10.17226/12434",
				doi: "10.17226/12434",
				note: "Consensus synthesis of participation goals, design principles, evidence, equity, and evaluation."
			},
			{
				kind: "systematic_review",
				title: "A Typology of Public Engagement Mechanisms",
				publisher: "Science, Technology, & Human Values",
				year: 2005,
				url: "https://doi.org/10.1177/0162243904271724",
				doi: "10.1177/0162243904271724",
				note: "Framework for distinguishing communication, consultation, and participation mechanisms and their design tradeoffs."
			}
		]
	})
];
