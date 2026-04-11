export type MisconceptionRelevance = "core" | "frequent" | "occasional";

export interface MisconceptionClusterUse {
	slug: string;
	label: string;
	relevance: MisconceptionRelevance;
}

export interface MisconceptionModule {
	slug: string;
	title: string;
	diagnosis: string;
	whyItPersists: string;
	shortCorrection: string;
	quickChecks: string[];
	whyThisMattersHere: string;
	longExplainerIncludes: string[];
	bestExamples: string[];
	bestSourceTypes: string[];
	relatedExplainers: string[];
	clusterUse: MisconceptionClusterUse[];
}

const clusterUse = {
	health: { slug: "health-and-medicine", label: "Health and medicine" },
	nutrition: { slug: "nutrition-and-diet", label: "Nutrition and diet" },
	climate: { slug: "climate-and-environment", label: "Climate and environment" },
	biotech: { slug: "genetics-and-biotechnology", label: "Genetics and biotechnology" },
	psych: { slug: "neuroscience-and-psychology", label: "Neuroscience and psychology" },
	news: { slug: "science-news-and-media", label: "Science news and media" }
} as const;

export const misconceptionModules: MisconceptionModule[] = [
	{
		slug: "one-study-doesnt-overturn-evidence",
		title: "One new study does not overturn the evidence",
		diagnosis:
			"Readers often treat a single surprising paper as if it replaces a whole literature, instead of asking what larger reviews and guidelines conclude.",
		whyItPersists:
			"Novelty gets headlines, single papers are easier to share than syntheses, and dramatic claims feel more memorable than cautious summaries.",
		shortCorrection:
			"A single study can be interesting without being decisive. What matters is whether multiple good studies and high-quality reviews converge on the same answer.",
		quickChecks: [
			"Is this one paper or a synthesis?",
			"Has it been replicated?",
			"What do reviews and guidelines say?"
		],
		whyThisMattersHere:
			"This site is trying to show the stable center of the evidence, not whichever paper is newest or loudest.",
		longExplainerIncludes: [
			"how literatures accumulate over time",
			"why systematic reviews reduce cherry-picking",
			"why replications and context shifts matter",
			"how certainty can change without the whole field flipping"
		],
		bestExamples: [
			"an early small study followed by larger follow-up work",
			"a headline that sounds field-changing until you read the broader review"
		],
		bestSourceTypes: [
			"evidence-synthesis methods guidance",
			"systematic reviews and meta-analyses",
			"major clinical or institutional guidelines"
		],
		relatedExplainers: ["hierarchy-of-evidence", "replication-and-correction"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "core" },
			{ ...clusterUse.nutrition, relevance: "core" },
			{ ...clusterUse.climate, relevance: "frequent" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "correlation-isnt-causation",
		title: "Correlation is not causation",
		diagnosis:
			"Two things moving together does not prove that one caused the other. Confounding, reverse causation, and selection effects can create convincing but wrong stories.",
		whyItPersists:
			"People default to causal narratives, and science coverage often converts observational links into simple cause-and-effect advice.",
		shortCorrection:
			"An association can be real without telling us what caused what. Strong causal claims need stronger designs and converging evidence.",
		quickChecks: [
			"Could a third factor explain this?",
			"Is the evidence observational or randomized?",
			"Could the direction run backwards?"
		],
		whyThisMattersHere:
			"Many public disputes start when a correlational finding gets retold as a settled causal answer.",
		longExplainerIncludes: [
			"confounding and reverse causation in plain language",
			"when observational evidence is still useful",
			"how randomization and quasi-experiments help",
			"why press releases often overstate causality"
		],
		bestExamples: [
			"diet patterns and health outcomes shaped by income or behavior",
			"seasonal patterns that create misleading associations"
		],
		bestSourceTypes: [
			"epidemiology primers",
			"causal inference guidance",
			"science communication research on causal exaggeration"
		],
		relatedExplainers: ["correlation-vs-causation", "reading-science-news"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "frequent" },
			{ ...clusterUse.nutrition, relevance: "core" },
			{ ...clusterUse.climate, relevance: "frequent" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "relative-risk-can-mislead",
		title: "Relative risk can be technically true and still misleading",
		diagnosis:
			"A large percent increase or decrease can sound dramatic even when the baseline risk is tiny or the time period is unclear.",
		whyItPersists: "Relative framing is dramatic, easy to headline, and easier to weaponize than absolute numbers.",
		shortCorrection:
			"Ask what the risk changed from and to. Relative risk should be paired with absolute risk and the time horizon before you decide what it means.",
		quickChecks: [
			"From what baseline?",
			"Over what time period?",
			"What does that mean out of 1,000 or 10,000 people?"
		],
		whyThisMattersHere: "Risk headlines can make harms or benefits sound far larger than their real-world scale.",
		longExplainerIncludes: [
			"relative versus absolute risk",
			"risk difference and baseline rates",
			"time horizons and denominators",
			"number needed to treat or harm"
		],
		bestExamples: [
			"a 100 percent increase that still changes only a few cases per 10,000 people",
			"a prevention benefit that matters more in a high-risk group than a low-risk group"
		],
		bestSourceTypes: [
			"risk communication guidance",
			"evidence-based medicine tools",
			"regulatory communication examples"
		],
		relatedExplainers: ["relative-vs-absolute-risk", "reading-science-news"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "core" },
			{ ...clusterUse.nutrition, relevance: "frequent" },
			{ ...clusterUse.climate, relevance: "frequent" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "frequent" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "anecdotes-are-not-population-evidence",
		title: "Anecdotes feel powerful, but they cannot estimate population risk",
		diagnosis:
			"A vivid story can be true and still fail to show what caused the event or how often it really happens in a wider population.",
		whyItPersists:
			"Personal stories are memorable, emotionally sticky, and often feel more trustworthy than abstract population data.",
		shortCorrection:
			"Individual experiences matter, but they cannot tell us population risk on their own. To estimate risk or causation, we need denominators, comparison groups, and broader evidence.",
		quickChecks: [
			"How common is this event without the exposure?",
			"Is there a comparison group?",
			"Are we looking at counts or rates?"
		],
		whyThisMattersHere: "Many public panics grow from compelling anecdotes that outrun the population evidence.",
		longExplainerIncludes: [
			"the difference between signal detection and causal proof",
			"why denominators matter",
			"placebo, nocebo, and coincidence",
			"how surveillance systems should and should not be read"
		],
		bestExamples: [
			"a true event that happened after an intervention but was not caused by it",
			"a reporting database with many entries but no rate information"
		],
		bestSourceTypes: [
			"official surveillance-system documentation",
			"epidemiology references",
			"cognitive science on vividness and repetition"
		],
		relatedExplainers: ["relative-vs-absolute-risk", "reading-science-news"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "core" },
			{ ...clusterUse.nutrition, relevance: "frequent" },
			{ ...clusterUse.climate, relevance: "occasional" },
			{ ...clusterUse.biotech, relevance: "occasional" },
			{ ...clusterUse.psych, relevance: "frequent" },
			{ ...clusterUse.news, relevance: "frequent" }
		]
	},
	{
		slug: "cherry-picking-distorts-the-evidence",
		title: "Cherry-picking can make almost any story look true",
		diagnosis:
			"Selecting only the studies, graphs, or time windows that support one view can create a false picture of the full evidence base.",
		whyItPersists:
			"Publication bias, selective reporting, motivated reasoning, and argument by screenshot all reward the most convenient slice of evidence.",
		shortCorrection:
			"If the evidence is cherry-picked, almost any conclusion can sound plausible. Trust methods that try to find all the relevant evidence and assess bias explicitly.",
		quickChecks: [
			"Are we seeing the full literature or a hand-picked subset?",
			"Were null results left out?",
			"Does a higher-level review say the same thing?"
		],
		whyThisMattersHere:
			"A science-consensus site has to resist the same selective evidence habits that create public confusion in the first place.",
		longExplainerIncludes: [
			"publication bias and selective outcome reporting",
			"what systematic reviews do differently",
			"how missing evidence shifts benefit or harm estimates",
			"why one graph or one cold winter does not settle a field"
		],
		bestExamples: [
			"adding unpublished or missing results that change a review conclusion",
			"a climate graph chosen from a convenient start date"
		],
		bestSourceTypes: [
			"systematic review methodology",
			"reporting-bias meta-research",
			"transparent reporting guidance"
		],
		relatedExplainers: ["hierarchy-of-evidence", "reading-science-news"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "core" },
			{ ...clusterUse.nutrition, relevance: "core" },
			{ ...clusterUse.climate, relevance: "core" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "preprints-are-preliminary",
		title: "Preprints are preliminary, not settled evidence",
		diagnosis:
			"A preprint can look official while still being early work that has not passed through peer review or the usual post-publication scrutiny.",
		whyItPersists:
			"Speed, virality, and the look of a formal paper make early research easy to overread, especially when it supports a preferred story.",
		shortCorrection:
			"A preprint is shared before peer review. Treat it as early evidence that may change substantially, not as a settled conclusion or clinical instruction.",
		quickChecks: [
			"Is this peer reviewed?",
			"Has the result been replicated or published?",
			"Should anyone change behavior on this alone?"
		],
		whyThisMattersHere:
			"Fast-moving topics generate the most public confusion precisely when the evidence base is least settled.",
		longExplainerIncludes: [
			"what peer review does and does not do",
			"how preprints move toward publication or fail to hold up",
			"how to read a preprint without treating it like guidance",
			"why journalism should label preliminary results clearly"
		],
		bestExamples: [
			"a preprint that changed substantially before publication",
			"a widely shared early result that never became a reliable finding"
		],
		bestSourceTypes: [
			"publishing ethics guidance",
			"research on public interpretation of preprints",
			"science journalism best practices"
		],
		relatedExplainers: ["preprints-press-releases-and-headlines", "reading-science-news"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "frequent" },
			{ ...clusterUse.nutrition, relevance: "frequent" },
			{ ...clusterUse.climate, relevance: "frequent" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "mechanism-is-not-real-world-effect",
		title: "A plausible mechanism is not the same as a demonstrated real-world effect",
		diagnosis:
			"A lab mechanism, biomarker shift, or animal result can make a claim sound plausible without proving that it meaningfully helps or harms people.",
		whyItPersists:
			"Mechanistic stories feel intuitive and travel well in media, while long-term outcome evidence takes longer and is harder to explain.",
		shortCorrection:
			"Mechanism can make a hypothesis plausible, but it does not prove a meaningful real-world effect. Look for evidence on outcomes that matter to people, not just lab proxies.",
		quickChecks: [
			"Was this shown in people?",
			"Is this a surrogate or a meaningful outcome?",
			"Did better studies confirm the mechanism story?"
		],
		whyThisMattersHere:
			"Many public claims sound strong because the mechanism story is vivid, even when the outcome evidence is weak.",
		longExplainerIncludes: [
			"surrogates versus meaningful outcomes",
			"how evidence climbs from cells to animals to human outcomes",
			"why plausible biology is not enough",
			"when mechanistic evidence should change confidence"
		],
		bestExamples: [
			"a biomarker improvement that did not translate into better outcomes",
			"an animal or petri-dish result retold as direct human proof"
		],
		bestSourceTypes: [
			"clinical trial methods guidance",
			"regulatory definitions of surrogate endpoints",
			"outcomes-focused evidence reviews"
		],
		relatedExplainers: ["hazard-vs-risk-and-exposure", "statistics-beyond-p-values"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "core" },
			{ ...clusterUse.nutrition, relevance: "core" },
			{ ...clusterUse.climate, relevance: "occasional" },
			{ ...clusterUse.biotech, relevance: "core" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "frequent" }
		]
	},
	{
		slug: "scientists-changing-their-minds-is-normal",
		title: "Scientists changing their minds is usually the system working",
		diagnosis:
			"Updated guidance or revised conclusions are often framed as proof that science is unreliable, instead of evidence that experts respond to better methods and better evidence.",
		whyItPersists:
			"People want certainty, media highlights conflict and novelty, and adversarial messaging reframes normal revision as incompetence or conspiracy.",
		shortCorrection:
			"Science is a process, not a single announcement. When better evidence arrives, responsible experts update the answer. That is a feature, not a failure.",
		quickChecks: [
			"Did the core claim really flip, or did the edges get refined?",
			"Was the earlier evidence weak or early?",
			"What changed in methods or data?"
		],
		whyThisMattersHere:
			"A consensus site has to explain revision honestly without feeding the cynical story that every topic is always up for grabs.",
		longExplainerIncludes: [
			"how confidence changes over time",
			"why early evidence is often noisy",
			"how replication and synthesis shift estimates",
			"the difference between self-correction and rhetorical flip-flops"
		],
		bestExamples: [
			"a historically neutral example where stronger evidence replaced an older model",
			"a living review or guideline update pathway"
		],
		bestSourceTypes: [
			"science-process education resources",
			"consensus-body process descriptions",
			"reproducibility and replicability reports"
		],
		relatedExplainers: ["falsifiability-and-mind-changes", "replication-and-correction"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "core" },
			{ ...clusterUse.nutrition, relevance: "core" },
			{ ...clusterUse.climate, relevance: "frequent" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "frequent" }
		]
	},
	{
		slug: "false-balance-misleads",
		title: "False balance can manufacture a fake debate",
		diagnosis:
			"Giving a fringe position equal weight with a strong expert consensus makes the issue look far more contested than the underlying evidence actually is.",
		whyItPersists:
			"Conflict is attention-grabbing, journalistic balance norms are easy to misuse, and audiences often equate 'debate exists' with 'experts are split.'",
		shortCorrection:
			"Fairness does not mean equal time for unequal evidence. The right question is what the strongest evidence and most qualified experts conclude.",
		quickChecks: [
			"How much of the field holds this view?",
			"Is the disagreement central or fringe?",
			"Are we looking at evidence balance or quote balance?"
		],
		whyThisMattersHere:
			"Consensus is easy to misunderstand when media structure makes minority views look like the center of the field.",
		longExplainerIncludes: [
			"how to represent uncertainty without manufacturing controversy",
			"what consensus statements and assessments are for",
			"signs of false balance in coverage",
			"how consensus perception shapes public belief"
		],
		bestExamples: [
			"expert share versus media quote share on a polarized topic",
			"a case where the real disagreement was about magnitude, not existence"
		],
		bestSourceTypes: [
			"media studies",
			"consensus process documentation",
			"research on consensus perception effects"
		],
		relatedExplainers: ["how-consensus-forms", "uncertainty-and-trust"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "frequent" },
			{ ...clusterUse.nutrition, relevance: "occasional" },
			{ ...clusterUse.climate, relevance: "core" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "occasional" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "uncertainty-isnt-ignorance",
		title: "Uncertainty is not the same as ignorance",
		diagnosis:
			"People often hear uncertainty as 'nobody knows anything,' even when experts are communicating calibrated confidence, ranges, or risk tradeoffs.",
		whyItPersists:
			"Binary true-false thinking is easier than probabilistic reasoning, and uncertainty language is often exploited rhetorically.",
		shortCorrection:
			"Uncertainty does not erase evidence. Experts often communicate both the direction of the evidence and how confident they are about timing, size, or mechanism.",
		quickChecks: [
			"What part is uncertain: direction, size, timing, or mechanism?",
			"How strong is agreement?",
			"What decision still has to be made under uncertainty?"
		],
		whyThisMattersHere:
			"The site needs to make uncertainty legible without implying that every topic is equally unsettled.",
		longExplainerIncludes: [
			"confidence versus likelihood",
			"what ranges and intervals mean",
			"why low-probability high-impact outcomes still matter",
			"why decisions often happen before uncertainty disappears"
		],
		bestExamples: [
			"a forecast analogy that keeps the direction but varies the certainty",
			"the same conclusion expressed with stronger or weaker confidence"
		],
		bestSourceTypes: [
			"consensus assessment guidance",
			"risk assessment frameworks",
			"forecast communication examples"
		],
		relatedExplainers: ["uncertainty-and-trust", "how-consensus-forms"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "frequent" },
			{ ...clusterUse.nutrition, relevance: "occasional" },
			{ ...clusterUse.climate, relevance: "core" },
			{ ...clusterUse.biotech, relevance: "frequent" },
			{ ...clusterUse.psych, relevance: "frequent" },
			{ ...clusterUse.news, relevance: "core" }
		]
	},
	{
		slug: "p-values-are-not-the-whole-story",
		title: "Statistical significance is not the whole story",
		diagnosis:
			"People often treat p-values as if they prove a claim is true, or treat the 0.05 threshold as the line between fact and fiction.",
		whyItPersists:
			"Thresholds are simple, publication incentives reward 'positive' findings, and effect sizes or intervals are less familiar to general readers.",
		shortCorrection:
			"A p-value does not tell you whether a claim is true, important, or well replicated. Look at effect size, uncertainty, study quality, and whether the result holds up.",
		quickChecks: ["How big is the effect?", "How wide is the interval?", "Was this replicated or preregistered?"],
		whyThisMattersHere:
			"Some of the weakest headline claims survive only because readers are taught to treat significance as a verdict instead of one limited statistic.",
		longExplainerIncludes: [
			"what p-values do and do not mean",
			"effect size versus significance",
			"multiple testing and p-hacking",
			"why null results can still be informative"
		],
		bestExamples: [
			"a tiny effect that is statistically significant but trivial",
			"a large but uncertain effect that misses the threshold in a small sample"
		],
		bestSourceTypes: ["formal statistical guidance", "replicability reports", "meta-research on reporting bias"],
		relatedExplainers: ["statistics-beyond-p-values", "replication-and-correction"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "frequent" },
			{ ...clusterUse.nutrition, relevance: "occasional" },
			{ ...clusterUse.climate, relevance: "occasional" },
			{ ...clusterUse.biotech, relevance: "occasional" },
			{ ...clusterUse.psych, relevance: "core" },
			{ ...clusterUse.news, relevance: "frequent" }
		]
	},
	{
		slug: "hazard-is-not-the-same-as-risk",
		title: "Hazard is not the same as real-world risk",
		diagnosis:
			"A substance or technology can be capable of harm in principle while posing little real-world risk at the exposure levels people actually encounter.",
		whyItPersists:
			"Hazard language is simple and scary, while exposure, dose, and safety margins require more explanation.",
		shortCorrection:
			"Hazard means something can cause harm. Risk means how likely that harm is under real exposure. To judge risk, you need dose and context, not just the existence of a hazard.",
		quickChecks: [
			"What is the real exposure level?",
			"Over how long?",
			"Is the claim about possibility or actual observed risk?"
		],
		whyThisMattersHere:
			"Many fights over chemicals, additives, and biotechnology collapse possibility into certainty and lose the exposure question entirely.",
		longExplainerIncludes: [
			"hazard identification versus risk characterization",
			"dose-response and safety margins",
			"why trace presence is not the same as dangerous exposure",
			"where the phrase 'the dose makes the poison' helps and where it has limits"
		],
		bestExamples: [
			"trace amounts versus meaningful exposure",
			"a substance that is hazardous at high doses but safe at ordinary use levels"
		],
		bestSourceTypes: [
			"risk assessment guidance",
			"food and chemical safety frameworks",
			"regulatory definitions and plain-language explainers"
		],
		relatedExplainers: ["hazard-vs-risk-and-exposure", "relative-vs-absolute-risk"],
		clusterUse: [
			{ ...clusterUse.health, relevance: "frequent" },
			{ ...clusterUse.nutrition, relevance: "core" },
			{ ...clusterUse.climate, relevance: "frequent" },
			{ ...clusterUse.biotech, relevance: "core" },
			{ ...clusterUse.psych, relevance: "occasional" },
			{ ...clusterUse.news, relevance: "frequent" }
		]
	}
];

export function getMisconceptionModule(slug: string) {
	return misconceptionModules.find((item) => item.slug === slug);
}

export function getMisconceptionModulesBySlugs(slugs: string[]) {
	const seen = new Set<string>();
	return slugs
		.map((slug) => getMisconceptionModule(slug))
		.filter((item): item is MisconceptionModule => Boolean(item))
		.filter((item) => {
			if (seen.has(item.slug)) return false;
			seen.add(item.slug);
			return true;
		});
}
