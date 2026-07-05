export type SearchDemandFormat = "claim page" | "evergreen explainer";

export interface SearchDemandOpportunity {
	cluster: string;
	title: string;
	format: SearchDemandFormat;
	whyItMatters: string;
	anchors: string[];
	querySignals: string[];
}

export interface SearchPatternRow {
	pattern: string;
	signal: string;
	bestFit: SearchDemandFormat | "topic hub";
	examples: string[];
}

export interface SearchDemandHold {
	title: string;
	whyItWaits: string;
	bestFormat: string;
}

export interface PublishingPlanRow {
	week: string;
	title: string;
	type: SearchDemandFormat;
	cluster: string;
	rationale: string;
}

export const demandPrinciples = [
	"Prioritize claims that combine stable expert consensus, recurring misinformation pressure, and durable query phrasing.",
	"Claim pages fit binary yes-no propositions with clear institutional anchors; explainers fit reasoning gaps that recur across many topics.",
	"Treat search phrasing as product input: the exact wording people type should shape titles, aliases, and routing behavior.",
	"Do not force fast-moving or method-sensitive topics into a simple claim page when the stronger product answer is an explainer with visible uncertainty."
];

export const demandOpportunities: SearchDemandOpportunity[] = [
	{
		cluster: "Vaccines",
		title: "Vaccines cause autism",
		format: "claim page",
		whyItMatters:
			"This remains one of the most persistent high-belief vaccine myths. It has durable public demand, repeated misinformation pressure, and a large synthesis-grade evidence base.",
		anchors: ["meta-analyses", "CDC", "American Academy of Pediatrics"],
		querySignals: ["do vaccines cause autism", "vaccines autism", "is there a link between vaccines and autism"]
	},
	{
		cluster: "Vaccines",
		title: "The MMR vaccine causes autism",
		format: "claim page",
		whyItMatters:
			"This is the exact phrasing variant that resurfaces whenever the broader autism myth spikes again. It deserves its own canonical match.",
		anchors: ["meta-analyses", "CDC", "American Academy of Pediatrics"],
		querySignals: ["mmr autism", "does mmr cause autism", "mmr vaccine autism"]
	},
	{
		cluster: "Vaccines",
		title: "Measles infection weakens immune memory",
		format: "claim page",
		whyItMatters:
			"Measles outbreaks create recurring searches about whether measles is 'just a rash.' This claim explains immune amnesia with human immune-memory evidence and keeps the vaccine distinction explicit.",
		anchors: ["WHO", "CDC", "Science immune-amnesia studies"],
		querySignals: ["measles immune amnesia", "does measles weaken the immune system", "measles wipes immune memory"]
	},
	{
		cluster: "Vaccines",
		title: "COVID-19 mRNA vaccines change your DNA",
		format: "claim page",
		whyItMatters:
			"Mechanism fear remains one of the most repeated gateway myths in COVID vaccine discourse and maps cleanly to a stable canonical query.",
		anchors: ["CDC", "FDA", "WHO"],
		querySignals: ["mRNA vaccines change DNA", "covid vaccine gene therapy", "does mRNA alter your DNA"]
	},
	{
		cluster: "Vaccines",
		title: "COVID vaccines cause infertility",
		format: "claim page",
		whyItMatters:
			"Google Trends research and public-health myth tracking both show this as a recurring anxiety cluster with unusually stable wording.",
		anchors: ["CDC", "ACOG", "WHO"],
		querySignals: ["covid vaccine infertility", "covid vaccine fertility", "does covid vaccine cause infertility"]
	},
	{
		cluster: "Vaccines",
		title: "Why official guidance changes and how to interpret reversals",
		format: "evergreen explainer",
		whyItMatters:
			"Readers often treat an updated agency page or advisory as proof that science is unreliable. This explainer reduces confusion that claim pages cannot absorb alone.",
		anchors: ["CDC", "medical society statements", "science communication research"],
		querySignals: ["why did guidance change", "why did CDC change this", "why do scientists reverse course"]
	},
	{
		cluster: "Climate",
		title: "Human activity is causing global warming",
		format: "claim page",
		whyItMatters:
			"This is the flagship climate consensus claim and remains a high-leverage first click for policy, energy, and public-understanding questions.",
		anchors: ["IPCC", "NASA", "NOAA", "Skeptical Science rebuttal context"],
		querySignals: [
			"is climate change caused by humans",
			"human activity global warming",
			"are humans causing climate change"
		]
	},
	{
		cluster: "Climate",
		title: "The Sun is causing recent global warming",
		format: "claim page",
		whyItMatters:
			"It is one of the oldest alternative-cause narratives and converts naturally into a yes-no canonical page with clear attribution evidence.",
		anchors: ["IPCC", "NASA", "Skeptical Science rebuttal context"],
		querySignals: ["sun causing global warming", "solar activity climate change", "is the sun behind warming"]
	},
	{
		cluster: "Climate",
		title: "Volcanoes emit more CO2 than humans",
		format: "claim page",
		whyItMatters:
			"This is a classic gotcha claim with very stable wording and a straightforward quantitative answer from authoritative sources.",
		anchors: ["USGS", "NASA", "climate assessment summaries", "Skeptical Science rebuttal context"],
		querySignals: [
			"volcanoes emit more co2 than humans",
			"volcanoes vs humans carbon dioxide",
			"do volcanoes cause more emissions"
		]
	},
	{
		cluster: "Climate",
		title: "There is no scientific consensus on climate change",
		format: "claim page",
		whyItMatters:
			"This is a manufactured-uncertainty claim that stays evergreen even as specific climate news cycles change.",
		anchors: ["IPCC", "NASA", "consensus literature summaries", "Skeptical Science rebuttal context"],
		querySignals: [
			"no climate consensus",
			"scientists disagree on climate change",
			"is there a consensus on climate"
		]
	},
	{
		cluster: "Climate",
		title: "Consensus versus uncertainty in climate science",
		format: "evergreen explainer",
		whyItMatters:
			"Public confusion is often about attribution versus local impacts. This is better handled as a reusable explainer than as a single narrow claim.",
		anchors: ["IPCC", "Skeptical Science rebuttal context", "public opinion research"],
		querySignals: ["what is settled in climate science", "climate uncertainty meaning", "why models still matter"]
	},
	{
		cluster: "Diet and heart health",
		title: "Saturated fat raises LDL cholesterol",
		format: "claim page",
		whyItMatters:
			"This remains a high-confusion nutrition topic where the public often sees headline churn but misses the durable LDL pathway and replacement logic.",
		anchors: ["American Heart Association", "guidelines", "systematic reviews"],
		querySignals: ["does saturated fat raise LDL", "is saturated fat bad", "saturated fat cholesterol"]
	},
	{
		cluster: "Diet and heart health",
		title: "Replacing saturated fat with unsaturated fat lowers heart risk",
		format: "claim page",
		whyItMatters:
			"The replacement effect is the part of the story most often lost in public discussion, making this a good canonical answer with high educational value.",
		anchors: ["American Heart Association", "diet guidelines"],
		querySignals: ["replace saturated fat with unsaturated fat", "unsaturated fat lowers heart disease risk"]
	},
	{
		cluster: "Diet and heart health",
		title: "Omega-6 seed oils are inherently inflammatory and bad for your heart",
		format: "claim page",
		whyItMatters:
			"This is a fast-growing misinformation cluster that benefits from a narrow, stable canonical answer before the wider nutrition discussion branches.",
		anchors: ["American Heart Association", "nutrition evidence reviews"],
		querySignals: ["are seed oils bad", "omega 6 inflammatory", "seed oils heart disease"]
	},
	{
		cluster: "Diet and heart health",
		title: "How nutrition evidence gets misread",
		format: "evergreen explainer",
		whyItMatters:
			"Replacement effects, endpoints, and study-design tradeoffs generate many future nutrition myths. A reusable explainer cuts repeat work.",
		anchors: ["American Heart Association", "evidence-based medicine guidance"],
		querySignals: [
			"nutrition studies always disagree",
			"why do diet studies conflict",
			"how to read diet headlines"
		]
	},
	{
		cluster: "Supplements",
		title: "Dietary supplements are FDA-approved like drugs",
		format: "claim page",
		whyItMatters:
			"This is a foundational misconception that cascades into disease-treatment and legitimacy claims about supplements.",
		anchors: ["FDA", "consumer regulatory guidance"],
		querySignals: ["are supplements FDA approved", "supplements approved like drugs", "FDA approved vitamins"]
	},
	{
		cluster: "Supplements",
		title: "Supplements can legally claim to treat, prevent, or cure diseases",
		format: "claim page",
		whyItMatters:
			"This is a crisp regulatory misconception with a stable official answer and repeated search phrasing.",
		anchors: ["FDA"],
		querySignals: [
			"can supplements cure disease",
			"supplements legally treat disease",
			"can vitamins claim to cure"
		]
	},
	{
		cluster: "Supplements",
		title: "Vitamin E supplements prevent heart disease or cancer",
		format: "claim page",
		whyItMatters:
			"A rare, clean prevention claim with strong preventive-services guidance and low ambiguity about the main public question.",
		anchors: ["USPSTF"],
		querySignals: [
			"vitamin e heart disease prevention",
			"beta carotene cancer prevention",
			"does vitamin e prevent cancer"
		]
	},
	{
		cluster: "Supplements",
		title: "Supplements: deficiency treatment versus primary prevention",
		format: "evergreen explainer",
		whyItMatters:
			"This is the reusable decision frame behind many supplement myths and nuanced preventive-service recommendations.",
		anchors: ["USPSTF", "NIH Office of Dietary Supplements"],
		querySignals: [
			"should healthy people take supplements",
			"supplements deficiency vs prevention",
			"when vitamins help"
		]
	},
	{
		cluster: "GMOs",
		title: "GM foods currently on the market are unsafe to eat",
		format: "claim page",
		whyItMatters:
			"This remains one of the strongest product-based biotechnology myths with a durable regulator and academy source stack.",
		anchors: ["WHO", "National Academies", "FDA"],
		querySignals: ["are GM foods safe", "are GMOs dangerous", "unsafe genetically modified food"]
	},
	{
		cluster: "GMOs",
		title: "GMOs are unregulated in the United States",
		format: "claim page",
		whyItMatters:
			"A regulatory-process myth with a straightforward answer that many users search using exact approval or oversight wording.",
		anchors: ["FDA", "US regulatory guidance"],
		querySignals: ["are GMOs regulated", "gmo regulation usa", "unregulated genetically modified food"]
	},
	{
		cluster: "GMOs",
		title: "What GMO means now and what safety testing actually checks",
		format: "evergreen explainer",
		whyItMatters:
			"The terminology keeps shifting from GMO to GE to gene editing, so the durable need is conceptual orientation rather than one-off rebuttals.",
		anchors: ["WHO", "National Academies", "FDA"],
		querySignals: ["what is a GMO", "gene editing vs GMO", "how GMO safety testing works"]
	},
	{
		cluster: "Psychology myths",
		title: "People learn better when teaching matches their learning style",
		format: "claim page",
		whyItMatters:
			"This is one of the most commercialized education myths and maps cleanly to a stable yes-no question with review-level evidence.",
		anchors: ["Psychological Science in the Public Interest", "education research reviews"],
		querySignals: ["do learning styles work", "learning styles evidence", "visual auditory kinesthetic teaching"]
	},
	{
		cluster: "Psychology myths",
		title: "People are left-brained or right-brained personality types",
		format: "claim page",
		whyItMatters:
			"This remains a high-recognition myth with a strong neuroscience answer and clean search phrasing.",
		anchors: ["neuroimaging studies", "neuroscience outreach resources"],
		querySignals: ["left brained right brained myth", "are people right brained", "brain hemisphere personality"]
	},
	{
		cluster: "Psychology myths",
		title: "Humans only use 10 percent of their brains",
		format: "claim page",
		whyItMatters: "A durable pop-culture myth with strong repeat-recognition and a simple canonical answer.",
		anchors: ["neuroscience education sources"],
		querySignals: [
			"10 percent brain myth",
			"do we only use 10 of our brains",
			"humans only use 10 percent of brain"
		]
	},
	{
		cluster: "Aging & cognitive health",
		title: "Hearing loss is linked to higher dementia risk",
		format: "claim page",
		whyItMatters:
			"Readers need a clear separation between the hearing-loss association, the immediate value of hearing care, and the narrower evidence on whether hearing aids slow cognitive decline.",
		anchors: ["Lancet Commission", "NIH", "NIDCD", "ACHIEVE trial"],
		querySignals: ["hearing loss dementia", "do hearing aids prevent dementia", "hearing aids cognitive decline"]
	},
	{
		cluster: "Psychology myths",
		title: "Sugar makes kids hyperactive",
		format: "claim page",
		whyItMatters:
			"This is an archetypal folk-observation myth that survives despite meta-analytic evidence and remains a common search phrasing.",
		anchors: ["JAMA meta-analysis", "pediatrics guidance"],
		querySignals: ["does sugar make kids hyper", "sugar hyperactivity myth", "sugar behavior children"]
	},
	{
		cluster: "Medical risk interpretation",
		title: "Absolute risk versus relative risk",
		format: "evergreen explainer",
		whyItMatters:
			"Misinformation often works by technically accurate but misleading risk framing. This explainer reduces repeated future confusion across medicine and public health.",
		anchors: ["risk communication guidance", "primary care evidence communication"],
		querySignals: ["relative vs absolute risk", "what does risk doubled mean", "baseline risk explanation"]
	},
	{
		cluster: "Indoor air",
		title: "Indoor dampness and mold worsen respiratory health",
		format: "claim page",
		whyItMatters:
			"Mold questions spike after leaks, floods, and rental or workplace disputes. A canonical page can separate respiratory-risk consensus and moisture remediation from black-mold panic or overconfident symptom attribution.",
		anchors: ["WHO indoor air guidance", "CDC", "EPA", "systematic reviews"],
		querySignals: [
			"is indoor mold dangerous",
			"does mold cause asthma",
			"black mold health effects",
			"mold testing health risk"
		]
	},
	{
		cluster: "Indoor air",
		title: "Gas stoves worsen indoor air quality and may increase childhood asthma risk",
		format: "claim page",
		whyItMatters:
			"Gas stove searches mix indoor-air science, asthma fears, ventilation advice, and political ban claims. A canonical page can separate real combustion exposure from overconfident causal or policy framing.",
		anchors: ["EPA nitrogen dioxide guidance", "WHO indoor air guidance", "child asthma meta-analyses"],
		querySignals: [
			"gas stove asthma",
			"are gas stoves bad for you",
			"gas stove nitrogen dioxide",
			"gas stove ban asthma"
		]
	},
	{
		cluster: "Science-news literacy",
		title: "What is a preprint and why can preprint findings change?",
		format: "evergreen explainer",
		whyItMatters:
			"Readers repeatedly encounter early papers as if they were settled evidence. This is a durable literacy gap across every cluster on the site.",
		anchors: ["NLM", "science communication guidance"],
		querySignals: ["what is a preprint", "preprint vs peer review", "not peer reviewed meaning"]
	}
];

export const queryPatternRows: SearchPatternRow[] = [
	{
		pattern: "Does X cause Y?",
		signal: "Causality assertion or fear-based causal inference",
		bestFit: "claim page",
		examples: ["do vaccines cause autism", "does sugar make kids hyper", "does saturated fat cause heart disease"]
	},
	{
		pattern: "X infertility / fertility",
		signal: "High-anxiety misinformation spike that usually needs a very stable canonical answer",
		bestFit: "claim page",
		examples: ["covid vaccine infertility", "hpv vaccine fertility", "does this cause infertility"]
	},
	{
		pattern: "Is X safe / dangerous / toxic?",
		signal: "Generalized risk framing that often needs dose, exposure, or context after the top-line answer",
		bestFit: "claim page",
		examples: ["are GM foods safe", "is fluoride dangerous", "are seed oils toxic"]
	},
	{
		pattern: "X hoax / scam / not real",
		signal: "Conspiracy framing or motivated skepticism hiding a narrower factual claim underneath",
		bestFit: "claim page",
		examples: ["climate change hoax", "global warming scam", "covid vaccine hoax"]
	},
	{
		pattern: "Is X approved / regulated / legal?",
		signal: "Regulatory legitimacy question about what oversight or approval actually means",
		bestFit: "claim page",
		examples: ["are supplements FDA approved", "are GMOs regulated", "is this approved like a drug"]
	},
	{
		pattern: "A new study proves X",
		signal: "Headline or one-study amplification pattern where the real need is evidence interpretation",
		bestFit: "evergreen explainer",
		examples: ["new study proves seed oils are poison", "latest paper shows vaccines unsafe"]
	},
	{
		pattern: "What is a preprint / peer review / systematic review?",
		signal: "Evidence pipeline question rather than a single claim dispute",
		bestFit: "evergreen explainer",
		examples: ["what is a preprint", "how does peer review work", "why meta analyses matter"]
	},
	{
		pattern: "What does risk doubled actually mean?",
		signal: "Medical risk interpretation problem rather than a new proposition that needs its own verdict",
		bestFit: "evergreen explainer",
		examples: ["relative vs absolute risk", "what baseline risk means", "how big is this side effect really"]
	}
];

export const holdTopics: SearchDemandHold[] = [
	{
		title: "Fasting and longevity in humans",
		whyItWaits:
			"Human evidence is still too heterogeneous for a clean public yes-no page and the risks and endpoints vary too much by population.",
		bestFormat: "Living explainer with explicit uncertainty"
	},
	{
		title: "Probiotics for depression and anxiety",
		whyItWaits:
			"The literature shows signals in some populations, but strain, dose, mechanism, and certainty remain too variable for a crisp canonical verdict.",
		bestFormat: "Explainer-first, not a single verdict page"
	},
	{
		title: "Vitamin D for COVID outcomes beyond deficiency correction",
		whyItWaits:
			"Recent large trials did not show broad benefit for acute outcomes, while some long-COVID questions remain under active study.",
		bestFormat: "Living explainer"
	},
	{
		title: "Aspartame and cancer risk",
		whyItWaits:
			"Hazard versus risk confusion dominates the public conversation, so the better product answer is a framing explainer before a simplified verdict.",
		bestFormat: "Hazard-versus-risk explainer"
	},
	{
		title: "Seed oils as a broad health-villain narrative",
		whyItWaits:
			"The online conversation bundles several distinct subclaims together, so one generic verdict page would be less clear than a structured explainer.",
		bestFormat: "Structured explainer with separated subclaims"
	}
];

export const publishingPlan: PublishingPlanRow[] = [
	{
		week: "Week 1",
		title: "The MMR vaccine causes autism",
		type: "claim page",
		cluster: "Vaccines",
		rationale: "Persistent false belief plus exact-match search phrasing make this a top-priority canonical page."
	},
	{
		week: "Week 1",
		title: "Vaccines cause autism",
		type: "claim page",
		cluster: "Vaccines",
		rationale:
			"Long-run query persistence justifies a second high-confidence canonical match for the broader phrasing."
	},
	{
		week: "Week 2",
		title: "COVID-19 mRNA vaccines change your DNA",
		type: "claim page",
		cluster: "Vaccines",
		rationale: "Mechanism fear is stable, high-volume, and strongly supported by regulator explainers."
	},
	{
		week: "Week 2",
		title: "COVID vaccines cause infertility",
		type: "claim page",
		cluster: "Vaccines",
		rationale: "Google Trends research shows a durable fertility-fear phrase cluster worth capturing directly."
	},
	{
		week: "Week 3",
		title: "How to interpret vaccine-safety claims: correlation, base rates, and passive reporting",
		type: "evergreen explainer",
		cluster: "Risk interpretation",
		rationale: "This supports the first four vaccine pages and reduces future debunk load."
	},
	{
		week: "Week 4",
		title: "Human activities are causing global warming",
		type: "claim page",
		cluster: "Climate",
		rationale: "This is the strongest possible climate-consensus anchor and a core public-entry page."
	},
	{
		week: "Week 4",
		title: "The Sun is causing recent global warming",
		type: "claim page",
		cluster: "Climate",
		rationale: "A durable alternative-cause myth with a clean institutional answer."
	},
	{
		week: "Week 5",
		title: "Volcanoes emit more CO2 than humans",
		type: "claim page",
		cluster: "Climate",
		rationale: "A stable gotcha query that works well as a compact quantitative claim review."
	},
	{
		week: "Week 5",
		title: "Scientific consensus versus uncertainty in climate science",
		type: "evergreen explainer",
		cluster: "Climate literacy",
		rationale: "Public attribution gaps show the need for a reusable confidence-language explainer."
	},
	{
		week: "Week 6",
		title: "GM foods currently on the market are unsafe to eat",
		type: "claim page",
		cluster: "GMOs",
		rationale: "WHO and academy statements support a durable, high-demand canonical answer."
	},
	{
		week: "Week 6",
		title: "GMOs are unregulated in the United States",
		type: "claim page",
		cluster: "GMOs",
		rationale: "This is a clean regulator-process myth with strong public-use value."
	},
	{
		week: "Week 7",
		title: "Dietary supplements are FDA-approved like drugs",
		type: "claim page",
		cluster: "Supplements",
		rationale: "Foundational misconception with a clear regulator answer and lots of downstream value."
	},
	{
		week: "Week 7",
		title: "Supplements can legally claim to treat or cure diseases",
		type: "claim page",
		cluster: "Supplements",
		rationale: "Pairs naturally with the approval page and uses very stable search wording."
	},
	{
		week: "Week 8",
		title: "Vitamin E supplements prevent heart disease or cancer",
		type: "claim page",
		cluster: "Supplements",
		rationale: "A rare crisp preventive-services target with a stable negative recommendation."
	},
	{
		week: "Week 8",
		title: "Supplements: when evidence supports use and when it does not",
		type: "evergreen explainer",
		cluster: "Supplements",
		rationale: "The site needs a reusable frame for deficiency treatment versus primary prevention."
	},
	{
		week: "Week 9",
		title: "Saturated fat raises LDL cholesterol",
		type: "claim page",
		cluster: "Diet and heart health",
		rationale: "AHA guidance makes this one of the clearest nutrition consensus pages to build next."
	},
	{
		week: "Week 9",
		title: "Replacing saturated fat with unsaturated fat lowers heart risk",
		type: "claim page",
		cluster: "Diet and heart health",
		rationale:
			"This keeps the replacement effect visible instead of letting the page flatten into a generic fat debate."
	},
	{
		week: "Week 10",
		title: "Omega-6 fats are inherently bad for your heart",
		type: "claim page",
		cluster: "Diet and heart health",
		rationale: "A trending misinformation topic with strong advisory-level counterevidence."
	},
	{
		week: "Week 10",
		title: "Nutrition headlines: replacement effects, endpoints, and why studies disagree",
		type: "evergreen explainer",
		cluster: "Diet literacy",
		rationale: "This reduces future nutrition myth duplication and improves interpretation of new papers."
	},
	{
		week: "Week 11",
		title: "Learning styles improve learning when teaching matches the style",
		type: "claim page",
		cluster: "Psychology myths",
		rationale: "A major myth with strong review-level evidence and very stable public phrasing."
	},
	{
		week: "Week 11",
		title: "People are left-brained or right-brained personality types",
		type: "claim page",
		cluster: "Psychology myths",
		rationale: "High-recognition myth with a clean neuroscience answer."
	},
	{
		week: "Week 12",
		title: "Preprints, peer review, and how to tell if a study is settled",
		type: "evergreen explainer",
		cluster: "Science-news literacy",
		rationale: "A reusable explainer that supports multiple clusters and reduces headline-driven confusion."
	},
	{
		week: "Week 12",
		title: "We only use 10 percent of our brains",
		type: "claim page",
		cluster: "Psychology myths",
		rationale: "Extremely persistent pop-culture myth with high recognition and simple routing value."
	},
	{
		week: "Week 13",
		title: "Hearing loss is linked to higher dementia risk",
		type: "claim page",
		cluster: "Aging & cognitive health",
		rationale:
			"Practical aging topic with strong association evidence and a careful distinction between hearing care benefits and dementia-prevention claims."
	}
];

export const measurementLoop = [
	"Track impressions and click-through for canonical query matches such as 'X causes Y', 'X infertility', or 'X hoax' and expand into the strongest long-tail variants.",
	"Compare how often users continue to posting after a single binary claim page versus after an explainer, especially on risk and study-interpretation questions.",
	"Watch for event-driven spikes around rollouts, guidance changes, viral clips, or major headlines because search phrasing often shifts with those moments."
];

export const demandPreview = demandOpportunities.slice(0, 6);
export const patternPreview = queryPatternRows.slice(0, 4);
export const publishingPlanPreview = publishingPlan.slice(0, 6);
