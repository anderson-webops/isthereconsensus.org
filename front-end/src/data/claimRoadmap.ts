export type ClaimRoadmapPageType = "canonical claim page" | "evergreen explainer" | "topic-hub-only section";
export type ClaimRoadmapTier =
	| "strong consensus"
	| "broad but qualified agreement"
	| "mixed evidence"
	| "frontier debate";
export type ClaimRoadmapCertainty = "high" | "moderate" | "low" | "very low";

export interface ClaimRoadmapEntry {
	rank: number;
	slug: string;
	title: string;
	cluster: string;
	topicSlug?: string;
	whyItMatters: string;
	consensusTier: ClaimRoadmapTier;
	evidenceCertainty: ClaimRoadmapCertainty;
	anchors: string[];
	misconceptions: string[];
	whatWouldChangeMinds: string;
	pageType: ClaimRoadmapPageType;
	wave: "first-wave" | "second-wave" | "backlog" | "hold";
}

export const backlogPrinciples = [
	"Bias toward claims where public confusion, real-world harm, and strong institutional anchors all overlap.",
	"Prefer pages that can cleanly separate what is settled, what remains qualified, and what evidence would actually move expert views.",
	"Use canonical claim pages for stable propositions, evergreen explainers for recurring concepts, and topic-hub sections for narrower follow-ons.",
	"Delay pages that still need unusually heavy uncertainty framing unless the site can explain the open questions without overstating certainty."
];

export const clusterSummaries = [
	{
		cluster: "Vaccines & immunology",
		body: "High harm, high confusion, and unusually strong public-health anchors make this the fastest place to expand the canonical library.",
		priority: "Highest near-term leverage"
	},
	{
		cluster: "Environmental health & contaminants",
		body: "These claims benefit from regulator-plus-clinical-anchor stacks and are well suited to threshold, exposure, and uncertainty explainers.",
		priority: "Strong fit for claim-first pages"
	},
	{
		cluster: "Climate impacts",
		body: "Measurement-heavy climate claims work well when the page leads with trend data, confidence language, and the difference between variability and long-run change.",
		priority: "Good public-trust payoff"
	},
	{
		cluster: "Mental health & substance use",
		body: "Readers need pages that avoid both minimization and panic, especially where effect size and subgroup risk matter.",
		priority: "Best for careful risk framing"
	},
	{
		cluster: "Nutrition & chronic disease",
		body: "Choose claims where the source stack is synthesis-grade and the public narrative is being distorted by headline churn or simplistic advice.",
		priority: "Selective expansion only"
	}
];

export const topPriorityClaims: ClaimRoadmapEntry[] = [
	{
		rank: 1,
		slug: "mrna-covid-vaccines-change-dna",
		title: "Do mRNA COVID-19 vaccines change your DNA?",
		cluster: "Vaccines & immunology",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"The DNA-alteration myth suppresses vaccine uptake and fuels broader mistrust. It is unusually clean to explain because the core mechanism is settled even though separate safety questions still require risk framing.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "FDA", "WHO"],
		misconceptions: ["category error", "fear cue around 'genetic'", "new platform equals untested"],
		whatWouldChangeMinds:
			"Direct evidence of stable genomic integration in vivo at clinically relevant doses, replicated across labs and matched by population-level genetic or oncologic signals.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 2,
		slug: "covid-vaccines-cause-infertility",
		title: "Do COVID-19 vaccines cause infertility?",
		cluster: "Vaccines & reproductive health",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Fertility fears are disproportionately persuasive for younger adults and often spill into broader vaccine refusal. The page can cleanly separate settled fertility evidence from narrower questions like temporary menstrual changes.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "ACOG", "WHO", "NIH"],
		misconceptions: [
			"timing fallacy",
			"birth-rate overinterpretation",
			"temporary cycle change equals infertility"
		],
		whatWouldChangeMinds:
			"Reproducible evidence of reduced conception probability across multiple populations after vaccination, with a plausible biological mechanism and strong confounder control.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 3,
		slug: "covid-vaccines-safe-in-pregnancy-and-breastfeeding",
		title: "Are COVID-19 vaccines safe and beneficial during pregnancy and breastfeeding?",
		cluster: "Vaccines & maternal-child health",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Pregnancy is a high-stakes decision context where many readers still map early-trial exclusion onto long-term danger. The page can separate baseline pregnancy risk, surveillance findings, and benefits against severe disease.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["CDC", "ACOG", "WHO"],
		misconceptions: [
			"no early RCT means unsafe",
			"all adverse outcomes must be vaccine-caused",
			"antibodies crossing the placenta means danger"
		],
		whatWouldChangeMinds:
			"Consistent evidence of elevated adverse maternal or fetal outcomes attributable to vaccination beyond confounding, replicated across surveillance systems and settings.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 4,
		slug: "mrna-vaccine-myocarditis-risk",
		title: "How big is the myocarditis risk after mRNA COVID-19 vaccination, and who is most affected?",
		cluster: "Vaccine safety & risk communication",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"This is a real safety signal that gets misrepresented in both directions. The page can anchor on incidence by subgroup, severity, and comparison to myocarditis risk after infection.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["CDC", "FDA"],
		misconceptions: [
			"denominator neglect",
			"baseline comparison errors",
			"any myocarditis equals catastrophic outcome"
		],
		whatWouldChangeMinds:
			"Credible evidence that current formulations or schedules produce materially higher myocarditis burden or worse long-term sequelae than current follow-up data indicates.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 5,
		slug: "mmr-vaccine-safe-and-effective",
		title: "Is the MMR vaccine safe and highly effective at preventing measles?",
		cluster: "Vaccines & outbreak prevention",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Measles has a very high reproduction number, so even modest drops in confidence can produce outbreaks. The page can separate safety, effectiveness, and why the two-dose schedule exists.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "American Academy of Pediatrics"],
		misconceptions: [
			"natural immunity is always better",
			"spillover from autism myths",
			"distrust of childhood schedules"
		],
		whatWouldChangeMinds:
			"Robust evidence of materially lower effectiveness or a replicated serious adverse-event signal inconsistent with current surveillance.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 6,
		slug: "fluoride-water-prevents-decay-and-is-safe",
		title: "Does fluoride in community drinking water prevent tooth decay, and is it safe at recommended levels?",
		cluster: "Public health, dentistry & environmental exposure",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Fluoridation is a recurring flashpoint where misunderstood policy reversals can increase caries burden, especially for lower-income families. The topic also fits a clean benefit-versus-dose structure.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["CDC", "WHO", "Cochrane", "National Academies"],
		misconceptions: [
			"chemical equals poison",
			"fluorosis equals systemic toxicity",
			"one study overrides decades of evidence"
		],
		whatWouldChangeMinds:
			"Strong evidence of serious systemic harm at guideline-level exposure, or strong evidence that net dental benefit is negligible across comparable populations.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 7,
		slug: "no-safe-level-of-lead-exposure",
		title: "Is there no safe level of lead exposure for children, including from drinking water?",
		cluster: "Environmental health & child development",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Lead exposure causes irreversible harm, but many readers still confuse regulatory action levels with safety thresholds. The page has direct public-health and infrastructure relevance.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "WHO", "EPA"],
		misconceptions: [
			"below the action level means safe",
			"no symptoms means no harm",
			"low-dose exposure is trivial"
		],
		whatWouldChangeMinds:
			"High-quality evidence showing no meaningful developmental or cardiovascular harms at low blood lead concentrations currently considered concerning.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 8,
		slug: "air-pollution-causes-millions-of-deaths",
		title: "Does air pollution cause millions of premature deaths each year?",
		cluster: "Environmental health & global burden",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"Air pollution remains one of the largest preventable global risk factors, yet many people still treat it as only an aesthetic or respiratory issue. This page can anchor the population-level burden clearly.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO", "EPA", "Health Effects Institute"],
		misconceptions: ["smog is just unpleasant", "only lungs matter", "no symptoms means no risk"],
		whatWouldChangeMinds:
			"Major revisions in exposure-response functions or clear evidence that current attribution methods systematically overcount deaths after methodological audit.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 9,
		slug: "pfas-harm-and-drinking-water-limits",
		title: "Are PFAS ('forever chemicals') harmful to human health, and what do drinking-water limits try to prevent?",
		cluster: "Environmental contaminants & regulatory science",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"PFAS mixes immediate fear with real uncertainty. A good page can explain linked outcomes, low-dose uncertainty, and what regulators are assuming when they set limits.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["EPA", "ATSDR", "National Academies"],
		misconceptions: [
			"detected means dangerous now",
			"blood testing predicts personal fate",
			"single-chemical thinking"
		],
		whatWouldChangeMinds:
			"Robust evidence that typical PFAS exposure levels do not meaningfully affect key linked outcomes, or strong evidence of broader harms at lower exposures than currently assumed.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 10,
		slug: "cell-phones-and-5g-cancer-risk",
		title: "Do cell phones and 5G networks increase cancer risk?",
		cluster: "Technology risk & environmental exposure",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"This is a durable anxiety topic that periodically spikes back into public attention. It also lends itself to clean explanation of non-ionizing radiation, surveillance, and why hazard categories get misread.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["National Cancer Institute", "WHO", "Health Canada"],
		misconceptions: [
			"all radiation is the same",
			"cancer clusters prove causation",
			"hazard category equals proof"
		],
		whatWouldChangeMinds:
			"A replicated dose-response in high-quality human studies plus mechanistic evidence coherent with non-ionizing exposure.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 11,
		slug: "alcohol-increases-cancer-risk",
		title: "Does alcohol increase cancer risk, even at low levels?",
		cluster: "Public health, cancer prevention & risk tradeoffs",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Alcohol is normalized in everyday life, so the cancer link is still under-recognized. The page can separate causal consensus from the harder question of how dose changes individual net risk.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "National Cancer Institute", "WHO", "HHS"],
		misconceptions: [
			"wine is protective",
			"only heavy drinking matters",
			"older cardiovascular findings erase cancer risk"
		],
		whatWouldChangeMinds:
			"Strong evidence of a true cancer-risk threshold below which risk is null, or compelling evidence that prior low-dose associations were entirely due to bias.",
		pageType: "canonical claim page",
		wave: "first-wave"
	},
	{
		rank: 12,
		slug: "cannabis-use-and-psychosis-risk",
		title: "Does regular cannabis use increase the risk of psychosis and schizophrenia, especially for adolescents and heavy or high-THC users?",
		cluster: "Mental health, substance use & adolescent health",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters:
			"Legalization and higher-potency products increase exposure while public discourse swings between denial and panic. The page can clarify risk gradients and vulnerability factors without collapsing into ideology.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["CDC", "National Academies"],
		misconceptions: [
			"natural means safe",
			"association means inevitability",
			"base rates and susceptibility do not matter"
		],
		whatWouldChangeMinds:
			"Strong evidence that cannabis exposure does not predict psychosis outcomes after confounding and reverse causality are addressed, or stronger causal evidence that shifts confidence upward.",
		pageType: "canonical claim page",
		wave: "second-wave"
	},
	{
		rank: 13,
		slug: "e-cigarettes-less-harmful-than-smoking-and-help-quit",
		title: "Are nicotine e-cigarettes less harmful than smoking, and do they help people quit?",
		cluster: "Tobacco harm reduction & addiction",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"This is a classic two-truths-at-once topic: combustible cigarettes are far more harmful, but vaping is not harmless and is especially problematic for youth. The page can map adult cessation evidence against youth harms.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["National Academies", "Cochrane", "CDC", "WHO"],
		misconceptions: [
			"safer than smoking means safe",
			"adult harm reduction resolves youth risk",
			"one harm means no cessation value"
		],
		whatWouldChangeMinds:
			"Strong evidence that vaping confers comparable long-term morbidity to smoking, or strong real-world evidence that cessation gains clearly dominate youth harms.",
		pageType: "canonical claim page",
		wave: "second-wave"
	},
	{
		rank: 14,
		slug: "antidepressants-effective-for-major-depression",
		title: "Are antidepressants effective for major depressive disorder, and how big is the average benefit?",
		cluster: "Mental health & clinical evidence interpretation",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters:
			"Public debate swings between miracle-cure framing and total dismissal. The page can clarify average effect sizes, heterogeneity, and what counts as clinically meaningful improvement.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["NICE", "American Psychological Association", "American College of Physicians"],
		misconceptions: [
			"binary works or does not work",
			"statistical significance equals practical importance",
			"publication bias means all evidence is fake"
		],
		whatWouldChangeMinds:
			"Large pragmatic trials showing near-zero clinically meaningful benefit across severity strata, or stronger low-bias evidence showing benefits larger than current syntheses suggest.",
		pageType: "canonical claim page",
		wave: "second-wave"
	},
	{
		rank: 15,
		slug: "global-sea-level-rising-and-accelerating",
		title: "Is global sea level rising and accelerating due to human-caused climate change?",
		cluster: "Climate impacts & measurement",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"Sea level rise is one of the clearest long-run climate impacts and a recurring misinformation target. The page can teach trend versus variability while staying anchored in observational records.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["IPCC", "NASA", "NOAA"],
		misconceptions: [
			"one-year dip disproves trend",
			"local land motion equals global mean sea level",
			"tides equal climate signal"
		],
		whatWouldChangeMinds:
			"Credible evidence that the observational systems or physical contributor models are biased enough to remove the acceleration signal.",
		pageType: "canonical claim page",
		wave: "second-wave"
	}
];

export const backlogClaims: ClaimRoadmapEntry[] = [
	{
		rank: 16,
		slug: "covid-vaccines-menstrual-cycle-changes",
		title: "Do COVID-19 vaccines cause significant menstrual cycle changes, and are the changes temporary?",
		cluster: "Vaccines & reproductive health",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"A felt side effect often gets inflated into infertility narratives, so the site needs a clear page on magnitude, duration, and what does not follow from the signal.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["CDC", "ACOG"],
		misconceptions: ["any change equals permanent harm", "timing fallacy"],
		whatWouldChangeMinds: "Persistent, replicated long-term cycle disruption with fertility impact across cohorts.",
		pageType: "canonical claim page",
		wave: "second-wave"
	},
	{
		rank: 17,
		slug: "hpv-vaccine-prevents-cervical-cancer",
		title: "Does the HPV vaccine prevent cervical cancer?",
		cluster: "Vaccines & cancer prevention",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"This is a high-benefit page with strong real-world evidence and recurring misinformation pressure.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO", "CDC"],
		misconceptions: ["cancer vaccine causes cancer", "prevention encourages risky behavior"],
		whatWouldChangeMinds:
			"Evidence that vaccination does not reduce HPV infection, precancer, or cancer in real-world cohorts.",
		pageType: "canonical claim page",
		wave: "second-wave"
	},
	{
		rank: 18,
		slug: "hpv-vaccine-causes-fertility-problems",
		title: "Does the HPV vaccine cause fertility problems?",
		cluster: "Vaccines & reproductive health",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Fertility myths remain central to vaccine refusal and are straightforward to address with large safety studies.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "WHO"],
		misconceptions: ["anecdotes as proof", "coincidence equals causation"],
		whatWouldChangeMinds: "A replicated fertility impairment signal with mechanism and dose-response.",
		pageType: "canonical claim page",
		wave: "second-wave"
	},
	{
		rank: 19,
		slug: "e-cigarettes-more-effective-than-nrt",
		title: "Are nicotine e-cigarettes more effective than nicotine replacement therapy for quitting smoking?",
		cluster: "Tobacco cessation",
		topicSlug: "health-and-medicine",
		whyItMatters: "It gives adults a practical cessation question separate from the youth-risk debate.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["Cochrane", "National Academies"],
		misconceptions: ["if it is addictive, it cannot help quitting"],
		whatWouldChangeMinds: "Large RCTs showing no benefit over nicotine replacement after bias adjustment.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 20,
		slug: "e-cigarettes-safe-for-teens",
		title: "Are e-cigarettes safe for kids and teens?",
		cluster: "Youth health & addiction",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Youth nicotine dependence remains a live public-health problem and the safety myths are persistent.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "WHO"],
		misconceptions: ["it is just water vapor", "safer than smoking means safe for youth"],
		whatWouldChangeMinds: "Strong evidence of no addiction risk or meaningful harms in youth.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 21,
		slug: "nicotine-harms-brain-development",
		title: "Does nicotine harm brain development into the mid-20s?",
		cluster: "Neurodevelopment & addiction",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters:
			"This is a reusable conceptual page that anchors youth-risk discussions across vaping and tobacco claims.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC"],
		misconceptions: ["only adults get addicted", "vaping is harmless"],
		whatWouldChangeMinds: "Contradictory neurodevelopment evidence across high-quality studies.",
		pageType: "evergreen explainer",
		wave: "backlog"
	},
	{
		rank: 22,
		slug: "cannabis-can-be-addictive",
		title: "Can cannabis be addictive and lead to cannabis use disorder?",
		cluster: "Substance use & behavioral health",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters: "The claim counters a persistent 'non-addictive' myth without drifting into moral panic.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["CDC", "National Academies"],
		misconceptions: ["natural means non-addictive", "dependence is not real"],
		whatWouldChangeMinds: "Evidence that frequent use does not increase disorder risk compared with controls.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 23,
		slug: "ultra-processed-foods-linked-to-worse-health",
		title: "Are ultra-processed foods linked to worse health outcomes, and how much is causation versus confounding?",
		cluster: "Nutrition & chronic disease",
		topicSlug: "nutrition-and-diet",
		whyItMatters:
			"This is a high-confusion nutrition topic where the evidence is strong enough to discuss but still needs careful causal framing.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["WHO", "major evidence reviews"],
		misconceptions: ["correlation equals 100 percent causation", "processing category confusion"],
		whatWouldChangeMinds:
			"Large trials showing no adverse effects at comparable diets, or stronger causal evidence that closes the gap.",
		pageType: "canonical claim page",
		wave: "hold"
	},
	{
		rank: 24,
		slug: "intensive-behavioral-interventions-for-child-obesity",
		title: "Are intensive behavioral interventions effective for children with obesity, and does dose matter?",
		cluster: "Pediatrics & obesity",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Families and clinicians need a page that distinguishes low-intensity advice from programs with enough contact hours to matter.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["USPSTF", "American Academy of Pediatrics"],
		misconceptions: ["kids just need willpower", "screening harms children"],
		whatWouldChangeMinds: "Evidence that intensive programs do not improve outcomes in real-world delivery.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 25,
		slug: "obesity-major-population-health-risk",
		title: "Is obesity a major health risk condition at the population level?",
		cluster: "Public health & metabolic disease",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"This page can cut through moralizing and denial while staying focused on population-level risk rather than individual blame.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO"],
		misconceptions: ["BMI is meaningless absolutism", "moralizing instead of evidence"],
		whatWouldChangeMinds:
			"Evidence that elevated BMI is not associated with morbidity or mortality after robust controls.",
		pageType: "evergreen explainer",
		wave: "backlog"
	},
	{
		rank: 26,
		slug: "people-consume-too-much-sodium",
		title: "Do most people consume too much sodium, and does reducing sodium lower blood pressure?",
		cluster: "Cardiovascular prevention",
		topicSlug: "nutrition-and-diet",
		whyItMatters:
			"This is a high-harm misunderstanding with a very stable evidence base and direct behavior implications.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO", "AHA", "FDA"],
		misconceptions: ["salt is harmless", "only people with hypertension need to care"],
		whatWouldChangeMinds:
			"Large trials showing no blood-pressure effect and no outcome benefit from sodium reduction.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 27,
		slug: "higher-potassium-intake-and-blood-pressure",
		title: "Is higher potassium intake from food recommended to reduce blood pressure and cardiovascular risk?",
		cluster: "Nutrition & hypertension",
		topicSlug: "nutrition-and-diet",
		whyItMatters:
			"It complements sodium pages and helps readers interpret diet-pattern advice without defaulting to supplements.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["WHO"],
		misconceptions: ["supplements solve it", "kidney-risk caveats do not matter"],
		whatWouldChangeMinds:
			"Evidence that higher potassium intake does not affect blood pressure or cardiovascular outcomes.",
		pageType: "topic-hub-only section",
		wave: "backlog"
	},
	{
		rank: 28,
		slug: "potassium-salt-substitutes-lower-blood-pressure",
		title: "Do potassium-enriched salt substitutes reduce blood pressure compared with regular salt?",
		cluster: "Hypertension interventions",
		topicSlug: "nutrition-and-diet",
		whyItMatters:
			"This is practical, policy-relevant, and a good example of intervention-specific risk-benefit framing.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["WHO", "AHA"],
		misconceptions: ["salt substitutes are dangerous for everyone"],
		whatWouldChangeMinds: "Evidence of no blood-pressure reduction or net harm in population trials.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 29,
		slug: "sunscreen-prevents-skin-cancer",
		title: "Does sunscreen use prevent skin cancer?",
		cluster: "Cancer prevention",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Public confusion remains high because observational claims often get stripped of context in headlines.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["American Academy of Dermatology", "WHO", "National Cancer Institute"],
		misconceptions: ["sunscreen causes cancer", "vitamin D means avoid sunscreen"],
		whatWouldChangeMinds: "High-quality evidence showing no preventive effect.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 30,
		slug: "modern-sunscreens-safe-as-directed",
		title: "Are modern sunscreens safe when used as directed, including 'chemical' sunscreens?",
		cluster: "Consumer health & toxicology",
		topicSlug: "health-and-medicine",
		whyItMatters: "It answers systemic-absorption headlines without collapsing into false reassurance or panic.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["FDA", "American Academy of Dermatology", "WHO"],
		misconceptions: ["absorbed means harmful", "natural products are automatically safer"],
		whatWouldChangeMinds:
			"Replicated evidence of clinically meaningful endocrine or developmental harms at normal use levels.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 31,
		slug: "sunscreen-alone-versus-shade-and-clothing",
		title: "Should you rely on sunscreen alone, or are clothing and shade more protective?",
		cluster: "Risk reduction & behavior",
		topicSlug: "health-and-medicine",
		whyItMatters: "This helps readers avoid treating sunscreen as a license for unlimited sun exposure.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO", "American Academy of Dermatology"],
		misconceptions: ["high SPF means stay out indefinitely"],
		whatWouldChangeMinds:
			"Evidence that sunscreen alone provides equivalent protection without risk-compensation behavior.",
		pageType: "topic-hub-only section",
		wave: "backlog"
	},
	{
		rank: 32,
		slug: "rf-emf-non-ionizing-too-low-energy-to-damage-dna",
		title: "Is radiofrequency radiation from phones and 5G non-ionizing and too low-energy to damage DNA directly?",
		cluster: "Physics-of-risk explainers",
		topicSlug: "science-communication",
		whyItMatters: "This is a reusable conceptual anchor that prevents category errors across multiple EMF claims.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["National Cancer Institute"],
		misconceptions: ["all radiation is the same"],
		whatWouldChangeMinds: "Evidence of direct DNA damage at typical RF exposure levels.",
		pageType: "evergreen explainer",
		wave: "backlog"
	},
	{
		rank: 33,
		slug: "group-2b-possibly-carcinogenic-actually-means",
		title: "Why is RF-EMF classified as 'possibly carcinogenic' and what does that actually mean?",
		cluster: "Risk classification literacy",
		topicSlug: "consensus-foundations",
		whyItMatters: "It prevents readers from mistaking hazard categories for proof of everyday danger.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["IARC", "WHO"],
		misconceptions: ["hazard class equals proven consumer risk"],
		whatWouldChangeMinds: "Major reclassification driven by new evidence review.",
		pageType: "evergreen explainer",
		wave: "backlog"
	},
	{
		rank: 34,
		slug: "pfas-linked-to-cholesterol-and-vaccine-response",
		title: "Are PFAS exposures linked to higher cholesterol and reduced vaccine antibody response?",
		cluster: "Environmental health",
		topicSlug: "climate-and-environment",
		whyItMatters: "It gives concrete, evidence-anchored outcomes instead of vague 'toxin' language.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["ATSDR", "National Academies"],
		misconceptions: ["any exposure means imminent disease", "no symptoms means no effect"],
		whatWouldChangeMinds: "Evidence that the linked associations disappear with robust controls.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 35,
		slug: "should-you-get-pfas-blood-testing",
		title: "Should individuals get PFAS blood testing, and does it change medical care?",
		cluster: "Clinical guidance",
		topicSlug: "health-and-medicine",
		whyItMatters:
			"Readers want actionable testing guidance, but the answer still depends on what blood testing can and cannot do.",
		consensusTier: "mixed evidence",
		evidenceCertainty: "low",
		anchors: ["National Academies", "ATSDR"],
		misconceptions: [
			"a blood number predicts personal outcome",
			"testing is either always useful or always pointless"
		],
		whatWouldChangeMinds:
			"Clear evidence that testing meaningfully improves outcomes or is pure noise across contexts.",
		pageType: "canonical claim page",
		wave: "hold"
	},
	{
		rank: 36,
		slug: "microplastics-proven-human-harms-at-current-exposure-levels",
		title: "Are microplastics in drinking water proven to cause human health harms at current exposure levels?",
		cluster: "Emerging environmental risk",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"This is a highly visible media topic, but it still needs tight uncertainty framing to stay honest.",
		consensusTier: "frontier debate",
		evidenceCertainty: "low",
		anchors: ["WHO", "FDA", "EPA"],
		misconceptions: ["detected equals deadly", "high-dose animal data maps directly to daily exposure"],
		whatWouldChangeMinds:
			"Robust human evidence linking current exposure levels to specific outcomes with a dose-response relationship.",
		pageType: "canonical claim page",
		wave: "hold"
	},
	{
		rank: 37,
		slug: "microplastics-presence-means-food-is-unsafe",
		title: "Does the presence of microplastics in food automatically mean it is unsafe to eat?",
		cluster: "Food safety literacy",
		topicSlug: "consensus-foundations",
		whyItMatters: "It teaches a reusable risk principle: presence is not the same thing as demonstrated harm.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "low",
		anchors: ["FDA"],
		misconceptions: ["zero-risk fallacy", "all contaminants imply immediate danger"],
		whatWouldChangeMinds: "Strong evidence that typical dietary microplastics levels cause measurable harms.",
		pageType: "evergreen explainer",
		wave: "hold"
	},
	{
		rank: 38,
		slug: "pm25-causes-cardiovascular-disease-and-lung-cancer",
		title: "Does fine particulate air pollution cause cardiovascular disease and lung cancer?",
		cluster: "Environmental health",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"It moves readers beyond vague respiratory talk to the main mortality pathways that drive burden estimates.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO", "EPA"],
		misconceptions: ["only smokers get lung cancer", "particulates are just dust"],
		whatWouldChangeMinds: "Evidence that PM2.5 is not causally linked after confounder correction.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 39,
		slug: "household-air-pollution-solid-fuels-disease-burden",
		title: "Does household air pollution from solid fuels cause major disease burdens, especially in children?",
		cluster: "Global health & energy",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"It is a strong global-health claim with clear co-benefits for energy and indoor air interventions.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["WHO"],
		misconceptions: ["only outdoor air matters"],
		whatWouldChangeMinds: "Evidence that current mortality attribution is drastically overstated.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 40,
		slug: "extreme-heat-more-frequent-intense-due-to-climate-change",
		title: "Is extreme heat becoming more frequent or intense because of human-caused climate change?",
		cluster: "Climate impacts",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"This is a lived-experience climate topic where readers benefit from clean weather-versus-climate framing.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["IPCC"],
		misconceptions: ["weather is not climate", "local variability disproves long-run attribution"],
		whatWouldChangeMinds: "Evidence that current attribution methods are systematically biased.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 41,
		slug: "human-influence-increased-concurrent-heatwaves-and-droughts",
		title: "Has human influence increased the frequency of concurrent heatwaves and droughts?",
		cluster: "Compound climate risks",
		topicSlug: "climate-and-environment",
		whyItMatters: "It is a strong candidate for a 'settled globally, more qualified regionally' claim page.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["IPCC"],
		misconceptions: ["droughts always happened so climate has no role"],
		whatWouldChangeMinds: "Robust contrary regional syntheses across multiple methods.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 42,
		slug: "human-influence-increased-fire-weather",
		title: "Has human influence increased fire weather occurrence in some regions?",
		cluster: "Climate extremes",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"Public discussion often overgeneralizes in both directions. The page can model careful regional uncertainty language.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["IPCC"],
		misconceptions: ["every wildfire is climate", "none of them are"],
		whatWouldChangeMinds: "Evidence that fire-weather trends are not linked to warming drivers.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 43,
		slug: "sea-level-rise-year-to-year-climate-cycles",
		title: "Is global sea level rise influenced year to year by climate cycles even as the long-term trend rises?",
		cluster: "Climate measurement literacy",
		topicSlug: "climate-and-environment",
		whyItMatters:
			"It helps readers avoid the 'one-year dip means hoax' trap and pairs naturally with the main sea-level page.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["NASA", "IPCC", "NOAA"],
		misconceptions: ["short-term variability equals reversal"],
		whatWouldChangeMinds:
			"Evidence that variability can account for long-run acceleration without the observed physical contributors.",
		pageType: "topic-hub-only section",
		wave: "backlog"
	},
	{
		rank: 44,
		slug: "glyphosate-causes-cancer-in-humans",
		title: "Does glyphosate cause cancer in humans?",
		cluster: "Chemicals, agriculture & cancer",
		topicSlug: "genetics-and-biotechnology",
		whyItMatters:
			"It is one of the most confusing hazard-versus-risk topics on the internet, but it is also high conflict and needs exceptional framing discipline.",
		consensusTier: "mixed evidence",
		evidenceCertainty: "moderate",
		anchors: ["IARC", "EPA", "EFSA", "JMPR"],
		misconceptions: ["hazard classification equals proven consumer risk", "regulators always lie"],
		whatWouldChangeMinds: "New high-quality evidence resolving real-world exposure-relevant causality.",
		pageType: "canonical claim page",
		wave: "hold"
	},
	{
		rank: 45,
		slug: "why-credible-bodies-disagree-about-glyphosate",
		title: "Why do credible scientific bodies disagree about glyphosate: hazard, risk, and real-world exposure?",
		cluster: "Scientific disagreement literacy",
		topicSlug: "consensus-foundations",
		whyItMatters:
			"This is a model explainer for how the same evidence can yield different answers depending on the question being asked.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["IARC", "JMPR", "EPA", "EFSA"],
		misconceptions: ["hazard identification and consumer risk are identical", "disagreement means corruption"],
		whatWouldChangeMinds:
			"Alignment of hazard and risk conclusions after a unified framework and stronger exposure evidence.",
		pageType: "evergreen explainer",
		wave: "hold"
	},
	{
		rank: 46,
		slug: "all-alcoholic-drinks-increase-cancer-risk",
		title: "Do all types of alcoholic drinks increase cancer risk?",
		cluster: "Cancer risk literacy",
		topicSlug: "health-and-medicine",
		whyItMatters: "It directly addresses the persistent red-wine exception myth.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["CDC", "National Cancer Institute"],
		misconceptions: ["wine is biologically different for cancer risk"],
		whatWouldChangeMinds: "Evidence that beverage type materially dominates ethanol dose in cancer risk.",
		pageType: "topic-hub-only section",
		wave: "backlog"
	},
	{
		rank: 47,
		slug: "safe-level-of-alcohol-for-cancer-risk",
		title: "Is there a safe level of alcohol consumption when it comes to cancer risk?",
		cluster: "Cancer prevention & thresholds",
		topicSlug: "health-and-medicine",
		whyItMatters: "It helps readers interpret 'no safe level' without turning the message into caricature.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["WHO", "IARC"],
		misconceptions: ["one sip means immediate harm", "threshold claims erase dose-response"],
		whatWouldChangeMinds: "A credible threshold demonstration with tight uncertainty bounds.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 48,
		slug: "adhd-common-neurodevelopmental-disorder",
		title: "Is ADHD a common neurodevelopmental disorder that often persists into adulthood?",
		cluster: "Neurodevelopment & education",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters:
			"It counters stigma and false parenting narratives while grounding readers in the actual clinical construct.",
		consensusTier: "strong consensus",
		evidenceCertainty: "high",
		anchors: ["NIMH", "CDC", "American Academy of Pediatrics"],
		misconceptions: ["lazy or bad parenting", "overdiagnosed therefore fake"],
		whatWouldChangeMinds: "Evidence that diagnostic criteria do not predict impairment over time.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 49,
		slug: "adhd-medications-improve-symptoms",
		title: "Do ADHD medications improve symptoms compared with placebo?",
		cluster: "Clinical effectiveness",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters: "It supports realistic risk-benefit decisions for a very common treatment question.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "high",
		anchors: ["American Academy of Pediatrics", "NIMH"],
		misconceptions: ["stimulants are just speed", "medications ruin kids"],
		whatWouldChangeMinds: "Large trials showing no meaningful symptom improvement.",
		pageType: "canonical claim page",
		wave: "backlog"
	},
	{
		rank: 50,
		slug: "parent-training-and-behavioral-therapy-for-adhd",
		title: "Are parent training and behavioral therapy effective parts of ADHD treatment?",
		cluster: "Behavioral interventions",
		topicSlug: "neuroscience-and-psychology",
		whyItMatters:
			"It prevents the false choice between medication and nothing, and it supports family-centered care planning.",
		consensusTier: "broad but qualified agreement",
		evidenceCertainty: "moderate",
		anchors: ["CDC", "American Academy of Pediatrics"],
		misconceptions: ["therapy is fluff", "parenting causes ADHD"],
		whatWouldChangeMinds: "Strong evidence showing no benefit across outcomes compared with controls.",
		pageType: "topic-hub-only section",
		wave: "backlog"
	}
];

export const firstWaveClaims = topPriorityClaims.filter((item) => item.wave === "first-wave");
export const secondWaveClaims = [...topPriorityClaims, ...backlogClaims].filter((item) => item.wave === "second-wave");
export const holdClaims = backlogClaims.filter((item) => item.wave === "hold");

export const claimRoadmapPreview = [...firstWaveClaims, ...secondWaveClaims].slice(0, 6);

export const backlogByCluster = Object.entries(
	backlogClaims.reduce<Record<string, ClaimRoadmapEntry[]>>((map, item) => {
		if (!map[item.cluster]) map[item.cluster] = [];
		map[item.cluster].push(item);
		return map;
	}, {})
)
	.sort((left, right) => left[0].localeCompare(right[0]))
	.map(([cluster, items]) => ({
		cluster,
		items: items.sort((left, right) => left.rank - right.rank)
	}));
