export interface SourceStandardAnchor {
	name: string;
	note: string;
}

export interface SourceStandardTier {
	title: string;
	body: string;
}

export interface SourceStandard {
	slug: string;
	title: string;
	summary: string;
	twoLayer: {
		anchorA: string;
		anchorB: string;
		why: string;
	};
	primaryAnchors: SourceStandardAnchor[];
	secondaryAnchors: SourceStandardAnchor[];
	sourceHierarchy: SourceStandardTier[];
	anchorSourceRule: string;
	supportContextRule: string;
	avoidOverweighting: string[];
	updateTriggers: string[];
	disagreementPatterns: string[];
	disagreementRule: string;
	misconceptionPatterns: string[];
	exampleQuestions: string[];
}

export const fallbackSourceStandard: SourceStandard = {
	slug: "fallback",
	title: "Cross-topic source-stack standard",
	summary:
		"Default to an institution-first stack: current guideline or assessment on top, independent synthesis next, primary studies after that, and mechanism or commentary last.",
	twoLayer: {
		anchorA: "At least one current institutional conclusion that directly addresses the public-facing claim.",
		anchorB: "At least one independent synthesis that checks the direction and certainty of the evidence stack.",
		why: "This prevents the page from leaning on a single institution, a single paper, or a loud media cycle."
	},
	primaryAnchors: [
		{
			name: "Primary guideline or assessment bodies",
			note: "Use the institutions that already synthesize the field."
		}
	],
	secondaryAnchors: [
		{ name: "Independent systematic review programs", note: "Use these to validate direction and certainty." }
	],
	sourceHierarchy: [
		{
			title: "Tier 1 - Institutional conclusions",
			body: "Guidelines, assessments, regulator decisions, and consensus statements that directly answer the claim."
		},
		{
			title: "Tier 2 - Independent synthesis",
			body: "Systematic reviews and meta-analyses that check whether the broader literature points the same way."
		},
		{
			title: "Tier 3 - Pivotal primary studies",
			body: "Use landmark trials or major studies only when they materially changed the field or clarify a live disagreement."
		},
		{
			title: "Tier 4 - Context",
			body: "Mechanism, history, and explanatory context belong here; they do not outrank synthesis."
		},
		{
			title: "Tier 5 - Discovery tools and AI research assistants",
			body: "Use tools such as Consensus.app to find candidate papers and citation trails, then verify the underlying sources directly before they influence a reviewed answer."
		}
	],
	anchorSourceRule:
		"Anchor sources should be institutional, explicit, and decision-facing. They should define the population, outcome, and update path.",
	supportContextRule:
		"Single studies, preprints, conference abstracts, mechanism papers, commentary, and AI-generated literature summaries can explain context or help discovery but should not carry the public bottom line by themselves.",
	avoidOverweighting: [
		"Small underpowered studies",
		"Subgroup claims treated as the main finding",
		"Mechanism papers treated like outcome evidence",
		"Media explainers treated like primary synthesis",
		"AI search summaries treated as if they were a reviewed source"
	],
	updateTriggers: [
		"A new major guideline or assessment changes the public-facing answer.",
		"A high-quality synthesis changes the direction, certainty, or size of the effect.",
		"A cornerstone citation is retracted, corrected, or formally questioned."
	],
	disagreementPatterns: [
		"Different institutions may share the same evidence but apply different thresholds or values.",
		"Population scope and implementation constraints often explain differences better than raw evidence conflict."
	],
	disagreementRule:
		"Lead with the shared baseline, then explain whether the disagreement is about evidence, thresholds, scope, or policy values.",
	misconceptionPatterns: [
		"One study overturns the field",
		"Minor institutional disagreement means there is no consensus",
		"Public controversy equals expert disagreement"
	],
	exampleQuestions: [
		"What is the current institutional bottom line on this claim?",
		"Which independent synthesis best checks that bottom line?"
	]
};

export const sourceStandards: SourceStandard[] = [
	{
		slug: "health-and-medicine",
		title: "Health and medicine",
		summary:
			"Health pages should be anchored by evidence-based guidelines, regulator lifecycle decisions, and independent syntheses rather than isolated trials or commentary.",
		twoLayer: {
			anchorA:
				"Current guideline, recommendation, or regulator assessment from WHO, CDC, USPSTF, FDA, EMA, NICE, or a similar primary body.",
			anchorB:
				"Independent systematic review or evidence program, often Cochrane or a methods-driven review body.",
			why: "Health claims can create immediate practical harm, so the page needs both an institutional conclusion and an independent synthesis check."
		},
		primaryAnchors: [
			{ name: "WHO", note: "Global public-health and guideline anchor." },
			{ name: "CDC", note: "Surveillance and current public-health implementation anchor." },
			{ name: "USPSTF", note: "Prevention and certainty-of-net-benefit anchor." },
			{ name: "FDA / EMA", note: "Benefit-risk and safety lifecycle anchors." },
			{ name: "NICE", note: "Methods-explicit clinical guidance anchor." }
		],
		secondaryAnchors: [
			{ name: "AHRQ", note: "Evidence review programs that support downstream decisions." },
			{ name: "ECDC", note: "European infectious-disease and outbreak guidance." },
			{ name: "National Academies", note: "Cross-cutting consensus reviews for contested questions." }
		],
		sourceHierarchy: [
			{
				title: "Tier 1 - Guidelines and regulator decisions",
				body: "Use current recommendations, prevention grades, and benefit-risk reviews to define the public answer."
			},
			{
				title: "Tier 2 - Systematic reviews",
				body: "Use methods-driven syntheses to check whether the wider literature supports the same answer."
			},
			{
				title: "Tier 3 - Large trials",
				body: "Use well-conducted randomized trials with patient-centered outcomes when they materially shift the field."
			},
			{
				title: "Tier 4 - Observational and mechanism context",
				body: "Useful for harms, rare events, plausibility, and external validity, but more bias-prone for causal claims."
			}
		],
		anchorSourceRule:
			"Anchor sources should directly address the public question, identify the relevant population, and make the decision logic visible.",
		supportContextRule:
			"Single trials, preprints, expert commentary, and mechanistic studies belong in context unless they have been absorbed into broader synthesis.",
		avoidOverweighting: [
			"Small trials with surrogate endpoints",
			"Subgroup analyses treated as the headline",
			"Observational mega-signals without triangulation",
			"Early uncontrolled studies framed as proof of effectiveness"
		],
		updateTriggers: [
			"A major guideline, recommendation, or label update lands.",
			"A pivotal trial or strong new systematic review changes net benefit or certainty.",
			"A major safety signal, retraction, or surveillance shift changes the practical takeaway."
		],
		disagreementPatterns: [
			"Net benefit vs cost-effectiveness vs feasibility.",
			"Different baseline-risk assumptions or population scope.",
			"Different weighting of patient values and implementation burdens."
		],
		disagreementRule:
			"Explain where institutions agree first, then label whether the difference is about evidence, thresholds, or implementation values.",
		misconceptionPatterns: [
			"Anecdote outranks surveillance",
			"Relative risk without absolute risk",
			"Fringe disagreement treated as a 50-50 split"
		],
		exampleQuestions: [
			"Does a specific screening test reduce mortality in average-risk adults?",
			"For a vaccine or drug, what is the current benefit-risk balance in a defined population?"
		]
	},
	{
		slug: "nutrition-and-diet",
		title: "Nutrition and diet",
		summary:
			"Nutrition needs stronger guardrails because long-term trials are hard, self-reported intake is noisy, and headlines routinely overstate weak evidence.",
		twoLayer: {
			anchorA:
				"Current institutional dietary guidance or evidence report from WHO, FAO/Codex, EFSA, NESR-supported U.S. reviews, or a comparable primary body.",
			anchorB:
				"Independent systematic review or meta-analysis that emphasizes clinical outcomes, not just biomarkers.",
			why: "The public sees constant diet churn; the page needs a durable baseline plus a clear check on whether the broader literature really supports it."
		},
		primaryAnchors: [
			{ name: "WHO nutrition guidance", note: "Global methods-explicit nutrition guidance." },
			{ name: "FAO / Codex", note: "Food standards and internationally negotiated safety baselines." },
			{ name: "EFSA", note: "EU food-chain risk and scientific advice anchor." },
			{ name: "NESR-backed U.S. reviews", note: "Systematic-review-forward support for dietary policy." }
		],
		secondaryAnchors: [
			{
				name: "National Academies",
				note: "Process and conflict-of-interest review of dietary guidance systems."
			},
			{
				name: "Independent systematic review bodies",
				note: "Useful for checking whether one noisy nutrition narrative really holds up."
			}
		],
		sourceHierarchy: [
			{
				title: "Tier 1 - Institutional guidance and evidence reports",
				body: "Lead with guidance that grades certainty and ties claims to health outcomes."
			},
			{
				title: "Tier 2 - Systematic reviews",
				body: "Prefer syntheses that separate clinical outcomes from short-term biomarker movement."
			},
			{
				title: "Tier 3 - Long-duration randomized trials",
				body: "Use when adherence and clinically meaningful endpoints are actually measured."
			},
			{
				title: "Tier 4 - Cohort and mechanism context",
				body: "Supportive, but vulnerable to measurement error, confounding, and over-interpretation."
			}
		],
		anchorSourceRule:
			"Anchor sources should make certainty visible and connect the conclusion to real health outcomes, not just intermediate markers.",
		supportContextRule:
			"Diet books, influencer claims, ecological comparisons, and isolated observational results are context only unless broader syntheses absorb them.",
		avoidOverweighting: [
			"Self-reported diet associations with implausibly large effects",
			"Cross-sectional or ecological correlations",
			"Biomarker shifts treated like proof of long-term event reduction",
			"Single-study diet wars framed as a total reversal"
		],
		updateTriggers: [
			"A new advisory scientific report or institutional synthesis lands.",
			"A long-duration randomized trial changes clinical outcomes or direction.",
			"A major methodological critique changes how much confidence to place in a common evidence stream."
		],
		disagreementPatterns: [
			"Confounding and measurement error create different readings of the same observational literature.",
			"Institutions differ on how much biomarker improvement should count without hard clinical outcomes.",
			"Policy and messaging constraints shape how guidance is framed."
		],
		disagreementRule:
			"Lead with high-certainty points, then label whether the dispute is about measurement limits, surrogate endpoints, or decision thresholds.",
		misconceptionPatterns: [
			"Correlational diet findings treated as causal proof",
			"Biomarker movement treated as the whole story",
			"Diet wars framed as two equal camps"
		],
		exampleQuestions: [
			"Does replacing saturated fat with polyunsaturated fat reduce cardiovascular events?",
			"What is the evidence that a specific supplement improves clinical outcomes in non-deficient adults?"
		]
	},
	{
		slug: "climate-and-environment",
		title: "Climate and environment",
		summary:
			"Climate and environmental topics should lean on formal assessments and institutional datasets, not on one weather event, one model run, or one viral graph.",
		twoLayer: {
			anchorA:
				"A current assessment or science review from IPCC, a national climate assessment, EPA science assessment, IPBES, or a similar primary body.",
			anchorB:
				"Independent synthesis or institutional observational dataset that checks the direction, range, and confidence of the claim.",
			why: "Assessment bodies exist specifically to stop the conversation from being hijacked by cherry-picked years, events, or localized anomalies."
		},
		primaryAnchors: [
			{ name: "IPCC", note: "Primary assessment anchor for climate science, impacts, and response options." },
			{ name: "NASA", note: "Observational climate indicator anchor." },
			{ name: "NOAA", note: "Trend, attribution, and dataset anchor." },
			{
				name: "USGCRP / National Climate Assessment",
				note: "National synthesis anchor for U.S. impacts and risks."
			},
			{ name: "EPA / IPBES", note: "Institutional anchors for pollutant and biodiversity claims." }
		],
		secondaryAnchors: [
			{
				name: "National Academies",
				note: "Consensus studies on climate, energy, and environmental science questions."
			},
			{
				name: "Regional assessment programs",
				note: "Useful for scoped impacts when their methods are explicit."
			},
			{
				name: "Skeptical Science",
				note: "Useful as a supporting rebuttal library for common climate-misinformation claims after the page is anchored in assessments and datasets."
			}
		],
		sourceHierarchy: [
			{
				title: "Tier 1 - Assessment reports",
				body: "Lead with institutional syntheses that use explicit confidence language and aggregate large literatures."
			},
			{
				title: "Tier 2 - Institutional datasets and synthesis papers",
				body: "Use NASA, NOAA, and similar observational programs to ground what is happening in measurement."
			},
			{
				title: "Tier 3 - Ensemble and scenario work",
				body: "Use model intercomparisons and scenario syntheses, not one model run in isolation."
			},
			{
				title: "Tier 4 - Event and local studies",
				body: "Useful for context and local detail, but not the foundation of global conclusions."
			},
			{
				title: "Tier 5 - Rebuttal explainers and myth libraries",
				body: "Use resources such as Skeptical Science to explain recurring objections and denial techniques; do not let rebuttal pages outrank assessments, datasets, or synthesis papers."
			}
		],
		anchorSourceRule:
			"Anchor sources should be official assessments or science assessments that summarize the field and expose their uncertainty language.",
		supportContextRule:
			"Skeptical Science rebuttals, single event studies, advocacy explainers, short trend windows, or localized analyses should stay contextual unless a formal assessment elevates them.",
		avoidOverweighting: [
			"Single-year anomalies",
			"Single-region impacts extrapolated globally",
			"One model run treated as a settled forecast",
			"Cherry-picked time windows"
		],
		updateTriggers: [
			"A new IPCC, national assessment, EPA science assessment, or IPBES release lands.",
			"A major observational dataset or attribution baseline is revised.",
			"A new ensemble synthesis materially changes the risk or timing range used on the page."
		],
		disagreementPatterns: [
			"Scenario dependence changes projections without changing the core physics.",
			"Regional impacts and extremes carry different confidence levels.",
			"Policy relevance is often mistaken for policy prescription."
		],
		disagreementRule:
			"Describe disputes as parameter, range, or scenario uncertainty, not as symmetric camps arguing over whether the core phenomenon exists.",
		misconceptionPatterns: [
			"Weather equals climate",
			"A short flat line disproves long-term warming",
			"Scenario uncertainty means scientists do not know anything"
		],
		exampleQuestions: [
			"Is human activity the principal cause of current global warming?",
			"What do major assessments say about the likely climate impact of nuclear vs fossil power?"
		]
	},
	{
		slug: "genetics-and-biotechnology",
		title: "Genetics and biotechnology",
		summary:
			"Biotechnology pages need to separate technical evidence, clinical interpretation standards, and governance or ethics questions instead of collapsing them into one debate.",
		twoLayer: {
			anchorA:
				"Current regulator, governance, or clinical-standard conclusion from FDA, EMA, WHO, ACMG/AMP, NHGRI, or a comparable primary body.",
			anchorB:
				"Independent synthesis or curated evidence framework that checks the same claim from outside the issuing institution.",
			why: "This keeps technical claims from being swallowed by hype, ethics panic, or jurisdiction-specific regulatory rhetoric."
		},
		primaryAnchors: [
			{ name: "FDA / EMA", note: "Clinical effectiveness, safety, and lifecycle monitoring anchors." },
			{ name: "WHO genome editing governance", note: "Global governance and acceptable-use anchor." },
			{ name: "ACMG / AMP", note: "Clinical interpretation standards for germline variants." },
			{ name: "NHGRI / NIH biosafety guidance", note: "Research framing and biosafety anchor." }
		],
		secondaryAnchors: [
			{ name: "ClinGen", note: "Curated gene-disease and variant interpretation support." },
			{ name: "National Academies", note: "Independent genome-editing and biotechnology review." },
			{
				name: "Registry and long-term follow-up programs",
				note: "Support for durability and late-safety questions."
			}
		],
		sourceHierarchy: [
			{
				title: "Tier 1 - Regulator and governance outputs",
				body: "Use formal approvals, safety frameworks, governance reports, and interpretation standards to define the public baseline."
			},
			{
				title: "Tier 2 - Independent synthesis and curated frameworks",
				body: "Use systematic reviews or formal curation frameworks to check whether the same direction holds up independently."
			},
			{
				title: "Tier 3 - Registries and pivotal trials",
				body: "Use when long-term follow-up, durability, or rare harms matter to the claim."
			},
			{
				title: "Tier 4 - Mechanism and early translation",
				body: "Preclinical and early-phase evidence can explain plausibility but should not be treated as settled clinical utility."
			}
		],
		anchorSourceRule:
			"Anchor sources should separate clinical effectiveness and safety from ethics or governance recommendations, even when both appear on the same page.",
		supportContextRule:
			"Animal studies, gene-association hype, consumer test marketing, and speculative mechanism stories stay contextual unless a formal synthesis elevates them.",
		avoidOverweighting: [
			"Animal-to-human extrapolation",
			"Variant association treated as clinical causality",
			"Early proof-of-concept work framed as real-world utility",
			"Ethics disagreement presented as scientific disagreement"
		],
		updateTriggers: [
			"A regulator changes guidance, safety language, or post-market expectations.",
			"A variant interpretation framework or governance statement is updated.",
			"New long-term follow-up or registry evidence materially changes confidence."
		],
		disagreementPatterns: [
			"Different acceptable uncertainty thresholds across jurisdictions.",
			"Clinical interpretation standards evolve as evidence accumulates.",
			"Ethics and social acceptability diverge even when technical facts are aligned."
		],
		disagreementRule:
			"Label whether the disagreement is about clinical evidence, interpretation standards, or governance and ethics. Do not collapse them into a single controversy bucket.",
		misconceptionPatterns: [
			"Cool technology equals proven benefit",
			"Consumer genetics equals clinical utility",
			"Any ethics dispute means the technical evidence is unsettled"
		],
		exampleQuestions: [
			"What is the consensus method for classifying a germline variant as pathogenic?",
			"Do current governance bodies consider heritable human genome editing acceptable for clinical use?"
		]
	},
	{
		slug: "neuroscience-and-psychology",
		title: "Neuroscience and psychology",
		summary:
			"This cluster needs explicit guardrails against small-study hype, causal overreach from correlation, and the reproducibility problems that hit behavioral claims harder than the public expects.",
		twoLayer: {
			anchorA:
				"A current evidence-based guideline or evidence profile from NICE, WHO mhGAP, APA, NIMH, or a comparable primary body.",
			anchorB:
				"A systematic review or network meta-analysis that checks the intervention or claim across studies, not one lab effect.",
			why: "Popular psychology and brain myths spread through intuitiveness, not rigor. The page needs stronger synthesis guardrails than a catchy effect paper."
		},
		primaryAnchors: [
			{ name: "NIMH / NIH", note: "Research framing and disorder-focused evidence anchor." },
			{ name: "NICE", note: "Methods-explicit clinical mental-health guideline anchor." },
			{ name: "WHO mhGAP", note: "Evidence-profile and recommendation anchor for global mental health." },
			{ name: "APA guidelines", note: "Professional practice and benefit-harm anchor." }
		],
		secondaryAnchors: [
			{ name: "Cochrane and comparable review bodies", note: "Intervention synthesis support." },
			{ name: "National Academies reproducibility reports", note: "Meta-layer anchor for reliability claims." }
		],
		sourceHierarchy: [
			{
				title: "Tier 1 - Evidence-based guidelines",
				body: "Use treatment and practice recommendations with explicit evidence grading and scope."
			},
			{
				title: "Tier 2 - Systematic reviews and network meta-analyses",
				body: "Use these for comparative effectiveness and harms instead of one favorite study or modality."
			},
			{
				title: "Tier 3 - Large preregistered randomized trials",
				body: "Multi-site and adequately powered trials carry more weight than one-off lab effects."
			},
			{
				title: "Tier 4 - Observational and mechanism context",
				body: "Correlation-heavy imaging or biomarker work should explain context, not settle causal claims by itself."
			}
		],
		anchorSourceRule:
			"Anchor sources should privilege replicability, clinically meaningful outcomes, and explicit recommendation logic over novelty.",
		supportContextRule:
			"Single imaging studies, early biomarker associations, and small behavioral effects are context only unless stronger synthesis absorbs them.",
		avoidOverweighting: [
			"Correlational brain imaging treated as causal proof",
			"Underpowered novelty studies",
			"Post-hoc subgroup stories",
			"Single lab tasks treated as broad real-world outcomes"
		],
		updateTriggers: [
			"A guideline update changes first-line treatment or certainty language.",
			"A major meta-analysis changes treatment ranking or comparative effectiveness.",
			"A major replication or retraction event changes confidence in a widely repeated claim."
		],
		disagreementPatterns: [
			"Different weighting of efficacy trials vs real-world effectiveness evidence.",
			"Different outcome priorities, such as symptom reduction vs long-term function.",
			"Treatment rankings evolve as new comparative syntheses accumulate."
		],
		disagreementRule:
			"Frame disagreement as a question of best-supported first-line approach given outcomes and patient values, not as two equally grounded camps.",
		misconceptionPatterns: [
			"Brain scans prove causation",
			"One neat experiment proves a broad life rule",
			"Therapy vs medication is a binary ideological fight"
		],
		exampleQuestions: [
			"For adult depression, what are the best-supported first-line treatments and how strong is the evidence?",
			"How reproducible are major classes of psychological findings, and what does that imply for single-study headlines?"
		]
	},
	{
		slug: "science-process-and-media-literacy",
		title: "Science process and media literacy",
		summary:
			"This cluster is the site's defensive infrastructure: it defines how to weigh evidence, describe reproducibility, and avoid importing journalism norms that distort scientific uncertainty.",
		twoLayer: {
			anchorA:
				"A consensus definition or policy source from National Academies, NIH, ICMJE, EQUATOR, COS, or another norms-setting institution.",
			anchorB:
				"Empirical meta-research or standards documentation that shows how the norm performs or why it exists.",
			why: "Method pages should be built on institutions that define norms, not on essays that merely comment on them."
		},
		primaryAnchors: [
			{ name: "National Academies", note: "Consensus definitions for reproducibility and replicability." },
			{ name: "NIH rigor policies", note: "Research integrity, transparency, and reporting expectations." },
			{ name: "ICMJE", note: "Trial registration and publication norm anchor." },
			{ name: "EQUATOR", note: "Reporting-guideline infrastructure anchor." },
			{ name: "Center for Open Science", note: "Open-science norms and reproducibility practice anchor." }
		],
		secondaryAnchors: [
			{
				name: "Meta-research syntheses",
				note: "Empirical evidence about bias, false positives, and replication rates."
			},
			{
				name: "Evidence-to-decision frameworks",
				note: "Useful for separating certainty from values and feasibility."
			}
		],
		sourceHierarchy: [
			{
				title: "Tier 1 - Consensus definitions and policy norms",
				body: "Use these to define the method rule itself."
			},
			{
				title: "Tier 2 - Registration and reporting standards",
				body: "Use these to show what good research disclosure should look like in practice."
			},
			{
				title: "Tier 3 - Meta-research",
				body: "Use empirical reliability findings to show when published results are more or less trustworthy."
			},
			{
				title: "Tier 4 - Journalism and commentary context",
				body: "Useful for examples and public framing, but not for defining norms."
			}
		],
		anchorSourceRule:
			"Anchor sources should define the norm or policy directly, not merely summarize it second-hand.",
		supportContextRule:
			"Media explainers, interviews, and one scandal narrative can illustrate failure modes, but they should not set the site's methodology.",
		avoidOverweighting: [
			"One fraud story generalized to all science",
			"One field's replication rate generalized to every field",
			"Social-media narratives that flatten different reliability problems into one slogan"
		],
		updateTriggers: [
			"A major NIH, ICMJE, or reporting-standard policy changes.",
			"A new consensus report changes core definitions or recommended practice.",
			"A new high-quality meta-research synthesis materially changes a method explainer."
		],
		disagreementPatterns: [
			"Implementation strictness differs even when core principles are shared.",
			"Transparency requirements vary by field, cost, and feasibility.",
			"Uncertainty communication strategies vary across audiences and contexts."
		],
		disagreementRule:
			"Summarize differences as implementation choices or communication tradeoffs unless the norms themselves are genuinely disputed.",
		misconceptionPatterns: [
			"Science is broken, therefore nothing is trustworthy",
			"Trial registration or reporting checklists are bureaucratic fluff",
			"False balance is fair even when the evidence is asymmetric"
		],
		exampleQuestions: [
			"What is the difference between reproducibility and replicability?",
			"How does false balance in media reporting distort perceived consensus?"
		]
	},
	{
		slug: "historical-case-studies",
		title: "Historical case studies",
		summary:
			"Historical case pages need archive discipline: transparent provenance, evidence-to-interpretation links, and explicit treatment of alternative explanations.",
		twoLayer: {
			anchorA:
				"A clearly sourced primary archive collection or authoritative commission record that directly bears on the case.",
			anchorB:
				"Peer-reviewed historical synthesis that explains how the evidence supports the mainstream interpretation.",
			why: "History pages should not become quote wars. They need provenance plus scholarly interpretation."
		},
		primaryAnchors: [
			{ name: "NARA", note: "Primary-source archive anchor for U.S. records." },
			{ name: "The National Archives (UK)", note: "Primary-source archive anchor for UK records." },
			{
				name: "AHA standards",
				note: "Method anchor for how historians explain evidence and alternative interpretations."
			}
		],
		secondaryAnchors: [
			{
				name: "Peer-reviewed historiography",
				note: "Synthesizes primary evidence into mainstream interpretations."
			},
			{
				name: "Institutional commissions or inquiry reports",
				note: "Useful when the case intersects with science policy or public-health failures."
			}
		],
		sourceHierarchy: [
			{ title: "Tier 1 - Primary archives", body: "Lead with documented primary records and provenance." },
			{
				title: "Tier 2 - Peer-reviewed historical synthesis",
				body: "Use scholarship that explains how the evidence supports or challenges interpretations."
			},
			{
				title: "Tier 3 - Institutional inquiries",
				body: "Use formal reports where they materially shape the historical record."
			},
			{
				title: "Tier 4 - Popular retellings",
				body: "Documentaries, journalism, and podcasts can aid accessibility but should not settle disputed causality."
			}
		],
		anchorSourceRule:
			"Anchor sources should either be primary records with provenance or scholarly synthesis that makes the evidence-to-interpretation link explicit.",
		supportContextRule:
			"Popular histories, podcasts, and decontextualized quotes are context only unless they are tightly sourced back to archives or scholarship.",
		avoidOverweighting: [
			"One document treated as definitive",
			"Decontextualized quotes",
			"Retrospective narratives with thin sourcing",
			"Presentism without evidentiary argument"
		],
		updateTriggers: [
			"A major archival release or declassification occurs.",
			"New peer-reviewed scholarship materially shifts the mainstream interpretation.",
			"A provenance problem or correction affects a heavily used source."
		],
		disagreementPatterns: [
			"Competing causal narratives built from overlapping evidence sets.",
			"Different weighting of official records, oral histories, and material evidence.",
			"Interpretive frames shift as new evidence or methods appear."
		],
		disagreementRule:
			"Identify the mainstream interpretation first, then show which evidentiary disputes support credible alternatives instead of vote-counting narratives.",
		misconceptionPatterns: [
			"A single document settles the case",
			"Two historical interpretations must be equally supported",
			"A readable retelling is the same as a sourced historical argument"
		],
		exampleQuestions: [
			"How did scientific consensus evolve during a past public-health controversy?",
			"What do archival records and later scholarship agree on about a pivotal crisis response?"
		]
	}
];

const sourceStandardMap = Object.fromEntries(sourceStandards.map((item) => [item.slug, item])) as Record<
	string,
	SourceStandard
>;

export const sourceStandardList = sourceStandards;

export function getSourceStandard(slug?: string) {
	if (!slug) return fallbackSourceStandard;
	return sourceStandardMap[slug] || fallbackSourceStandard;
}
