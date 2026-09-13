import type { CompleteSeedClaim } from "./claims.js";

// Source preparation, not an independent scientific review or expert approval.
const preparedAt = "2026-09-12T20:37:22.679Z";
type Source = CompleteSeedClaim["sources"][number];
const formationSlug = "how-does-scientific-consensus-form";
const debateSlug = "what-counts-as-an-active-scientific-debate";
const studySlug = "why-does-one-study-rarely-change-everything";
const correction = "https://doi.org/10.1371/journal.pmed.1004085";

const nasem: Source = {
	kind: "consensus_statement",
	title: "Reproducibility and Replicability in Science",
	publisher: "National Academies",
	year: 2019,
	url: "https://doi.org/10.17226/25303",
	doi: "10.17226/25303",
	stance: "supports",
	isAnchor: true,
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: "2026-09-12T20:11:53.701Z",
	order: 1,
	note: "Chapter 3 definitions, measurement and transparency sections inspected through NCBI Bookshelf. Distinguishes same-data reproduction, new-data replication and generalization. Not a whole-report or visual-figure appraisal."
};
const osc: Source = {
	kind: "landmark_study",
	title: "Estimating the reproducibility of psychological science",
	publisher: "Science",
	year: 2015,
	url: "https://doi.org/10.1126/science.aac4716",
	doi: "10.1126/science.aac4716",
	pmid: "26315443",
	stance: "context",
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: "2026-09-12T20:11:56.640Z",
	order: 1,
	note: "Original indexed abstract read through Europe PMC: 100 studies from three psychology journals, with several replication criteria. Full methods, disclosures, data and linked comment-response debate not appraised. Not a census of all science."
};
const asa: Source = {
	kind: "consensus_statement",
	title: "ASA Releases Statement on Statistical Significance and P-Values",
	publisher: "American Statistical Association",
	year: 2016,
	url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf",
	stance: "supports",
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: preparedAt,
	order: 1,
	note: "Original official release and all six reproduced principles read. The journal statement's elaborations were not accessible. A p-value is not a hypothesis probability, an effect size or a substitute for contextual inference."
};
const asaTaskForce: Source = {
	kind: "consensus_statement",
	title: "ASA President's Task Force Statement on Statistical Significance and Replicability",
	publisher: "Amstat News",
	year: 2021,
	url: "https://magazine.amstat.org/blog/2021/08/01/task-force-statement-p-value/",
	stance: "context",
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: preparedAt,
	order: 1,
	note: "Full task-force statement read, excluding reader comments as evidence. Supports properly interpreted tests and justified decision thresholds; distinguishes a 2019 editorial from ASA policy. Attribute the position to the task force, not every statistician."
};
function cochraneChapter(chapter: number, title: string, note: string): Source {
	return {
		kind: "guideline",
		title,
		publisher: "Cochrane",
		year: 2024,
		url: `https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-${chapter}`,
		stance: "supports",
		isAnchor: true,
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: preparedAt,
		order: 1,
		note
	};
}
const heterogeneity = cochraneChapter(
	10,
	"Cochrane Handbook: Analysing data and undertaking meta-analyses",
	"Version 6.5. Selected heterogeneity, meaningful pooling, subgroup and sensitivity-analysis sections read. Clinical differences, bias and sampling variation need separate consideration. Not a full chapter or visual forest-plot appraisal."
);
const certainty = cochraneChapter(
	14,
	"Cochrane Handbook: Completing Summary of findings tables and grading the certainty of the evidence",
	"Version 6.5. Key points and outcome-specific certainty sections read. The framework addresses intervention evidence; it is not a universal ranking of every scientific question. No independent GRADE assessment performed here."
);
const interpretation = cochraneChapter(
	15,
	"Cochrane Handbook: Interpreting results and drawing conclusions",
	"Version 6.5. Selected effect-estimate, interval and interpretation guidance, including MECIR C72, read. Statistical imprecision is only one uncertainty domain. P-value interpretation is cross-checked against the ASA principles."
);

const common: Partial<CompleteSeedClaim> = {
	searchCutoffAt: preparedAt,
	reviewMode: "living",
	evidenceCertainty: "moderate",
	searchDatabases: [
		"Targeted original methods papers, institutional guidance and indexed abstracts; not an exhaustive systematic search",
		"PubMed and Europe PMC for original records; publisher, National Academies, Cochrane, GRADE and ASA material",
		"Crossref and Europe PMC publication-notice metadata, distinct from scientific assessment"
	],
	inclusionRules: [
		"Distinguish a methodological argument, reporting guideline, empirical sample and representative expert survey.",
		"State the studied field, selection criteria and time horizon before generalizing a numerical result."
	],
	exclusionRules: [
		"Do not turn panel agreement, statistical significance or one replication criterion into a probability that a claim is true.",
		"Do not count a handbook chapter, its summary and an overlapping institutional statement as independent experiments."
	],
	appraisalTools: [
		"Narrative assessment of scope, design, transparency and applicability; not an independent GRADE or formal risk-of-bias assessment"
	],
	authorLine: "Source-controlled synthesis prepared with AI assistance.",
	reviewerLine: "Scoped source verification; no independent expert approval recorded.",
	independenceSummary:
		"These pages interpret methodological guidance and selected empirical examples. Their agreement and certainty labels are editorial judgments, not an expert poll, a truth probability or a formal GRADE rating.",
	surveillanceSpec: {
		focus: "How evidence is synthesized, challenged and communicated",
		cadenceDays: 180,
		watchTerms: [
			"consensus methods reporting",
			"replication methodology",
			"statistical inference and evidence synthesis"
		],
		integrityMonitors: ["Crossref and Europe PMC notice metadata", "Publisher correction notices"],
		guidelineMonitors: [
			"Cochrane Handbook",
			"GRADE Book and handbook replacement notices",
			"ASA methodological statements"
		],
		triggerRules: [
			"Reassess a material methods revision, a source correction or new empirical evidence that changes the scope of the examples."
		]
	}
};

const formation: Partial<CompleteSeedClaim> = {
	bottomLine:
		"Scientific consensus develops as relevant evidence is tested, criticized and synthesized. Formal panels may also use votes or rating thresholds to state agreement. Those procedures describe the panel's judgment; a majority alone does not establish scientific truth, and agreement remains open to better evidence.",
	stableCore: [
		"Evidence convergence across a research field and agreement produced by a selected panel are different claims. Ask which one a consensus statement actually documents.",
		"The National Academies distinguish reproducing a calculation with the same data from replicating a finding with new data. Generalizing to another population or setting is a further question.",
		"Repeated analyses can share assumptions, measurement problems or source data. Agreement is more informative when materially different methods and evidence withstand scrutiny."
	],
	openQuestions: [
		"How representative is a selected panel, who did not respond, and how were disagreements retained?",
		"Which findings survive different measurements, analytic choices and settings, rather than only rerunning the same calculation?"
	],
	whatWouldChangeMinds: [
		"Independent evidence that exposes a shared error or consistently supports a competing explanation.",
		"A better-supported synthesis, or a material change in the evidence or population to which a panel's conclusions apply."
	],
	misconceptions: [
		"A 75% panel threshold is not a 75% probability of truth, nor a survey of 75% of a discipline's experts.",
		"A reporting checklist makes a process inspectable; completing it does not certify the conclusion as correct."
	],
	editorSummary:
		"The earlier blanket statement that consensus is not a vote missed formal consensus methods. Distinguish evidence convergence from panel agreement, and inspect the evidence and process behind both.",
	uncertaintySummary:
		"This is a qualified methodological account, not a single experimental result or a measured consensus percentage. Delphi samples describe particular reporting practices; their rates should not be generalized to all disciplines. The certainty label is an editorial judgment, not formal GRADE.",
	uncertaintyDrivers: [
		{
			type: "generalizability",
			detail: "Healthcare consensus exercises do not represent every form of scientific consensus."
		},
		{
			type: "bias",
			detail: "Selection, nonresponse, feedback and shared assumptions can influence panel agreement."
		}
	],
	coiSummary:
		"ACCORD reports no direct project funding, employer-contributed time and several industry or publication-professional roles. Those disclosures warrant transparency, not automatic acceptance or dismissal. Disclosures for the older Delphi sample and replication study were not independently appraised.",
	institutionalAnchors: [
		{
			name: "National Academies",
			role: "Definitions and limitations of reproduction, replication and generalization"
		},
		{
			name: "ACCORD authors",
			role: "Reporting consensus exercises in healthcare; not a method-design or truth-certification standard"
		}
	],
	evidenceSummaries: [
		{
			question: "How have formal panels defined agreement?",
			population:
				"Diamond 2014: a random sample of 100 English-language Delphi studies published during 2000-2009",
			finding:
				"Definitions varied. Seventy-two studies defined consensus and 64 did so in advance. Percentage agreement was the most common definition, used in 25 studies.",
			effectDirection: "supports",
			magnitude:
				"The median percentage threshold was 75%, a description of this sample rather than a recommended universal cutoff.",
			limitations: [
				"Original abstract access; full methods and supplements not appraised. This studies reporting practices, not the truth of the panel conclusions."
			]
		},
		{
			question: "What should a reader be able to inspect?",
			population:
				"ACCORD 2024: a reporting guideline developed through a modified Delphi and steering-committee decisions",
			finding:
				"Its 35 items cover panel selection, evidence supplied, agreement criteria, feedback, participation, changes to items, funding and interests. The authors explicitly limit its intended scope to healthcare.",
			effectDirection: "supports",
			magnitude:
				"A reporting framework, not a pooled effect estimate or a test that panel agreement predicts truth.",
			limitations: [
				"The final checklist and selected methods/results/disclosures were read; supplements were not independently appraised. It does not prescribe the optimal consensus method."
			]
		},
		{
			question: "Do later samples show one uniform Delphi method?",
			population:
				"A 2025 scoping review: 287 health-science Delphi studies published from January 2018 through April 2021",
			finding:
				"The review found varied panel, questionnaire and feedback practices. Eighty-one percent defined consensus using percentage agreement; 43% reported a modified Delphi.",
			effectDirection: "supports",
			magnitude:
				"These are reporting frequencies in a selected sample, not accuracy rates or evidence about all scientific fields.",
			limitations: [
				"Original abstract access. German/English and title/abstract keyword restrictions limit coverage. A 2025 publication date does not make its search current to 2025."
			]
		}
	],
	readerAnnouncement: {
		id: "1cb5ef81-61b1-4ccc-8abc-1c7019e6b3f3",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary:
			"Distinguished evidence convergence from formal panel voting, added empirical Delphi reporting examples and ACCORD, and clarified reproduction, replication and generalization."
	}
};

const debate: Partial<CompleteSeedClaim> = {
	bottomLine:
		"A scientific debate concerns an unresolved question that researchers can examine using evidence or explicit methodological arguments. It can concern whether an effect exists, its size or cause, or where it applies. Sparse evidence and public controversy alone do not establish an active, evenly divided expert debate.",
	stableCore: [
		"Define the disputed proposition before comparing conclusions: the population, measurement, comparator, outcome and time horizon may differ.",
		"Cochrane separates differences in study populations and interventions from differences in methods and bias. A pooled estimate cannot make an ill-defined comparison meaningful.",
		"Disagreement about what to do can also reflect different values, costs or tradeoffs despite similar estimates of what happens. That is distinct from disagreement about the evidence itself."
	],
	openQuestions: [
		"Are credible studies testing the same question, and which alternative explanation best accounts for their differences?",
		"What result, measurement improvement or explicit decision criterion would resolve the disagreement?"
	],
	whatWouldChangeMinds: [
		"A well-designed comparison or independent replication that discriminates between the competing explanations.",
		"A transparent synthesis showing that an apparent conflict arises from different populations, biases or definitions rather than incompatible findings."
	],
	misconceptions: [
		"Low certainty means limited confidence in an estimate; it does not demonstrate that two equally supported scientific camps exist.",
		"One statistically significant result and one nonsignificant result do not, by those labels alone, contradict each other.",
		"A remaining question about mechanism does not erase a well-supported effect, while some real debates do concern the existence of an effect."
	],
	editorSummary:
		"The previous account placed genuine debate mostly outside a stable core. This revision allows disputes about existence as well as magnitude, and separates evidence conflicts from different questions, decision preferences and public controversy.",
	uncertaintySummary:
		"There is no universal numerical threshold that establishes an active scientific debate. The examples support ways to inspect a dispute, not a representative survey of current expert opinion. Healthcare frameworks need contextual judgment when applied elsewhere; the certainty label is editorial.",
	uncertaintyDrivers: [
		{
			type: "inconsistency",
			detail: "Apparent disagreements may concern different populations, outcomes or analytic assumptions."
		},
		{
			type: "other",
			detail: "Agreement about evidence and agreement about decision tradeoffs are separate questions."
		}
	],
	coiSummary:
		"Methodological guidance is attributed to its authors and scope. The ASA task-force position is not treated as unanimous agreement, and no independent survey or comprehensive conflict-of-interest audit was performed.",
	institutionalAnchors: [
		{ name: "Cochrane", role: "Intervention-review guidance on heterogeneity and outcome-specific certainty" },
		{
			name: "GRADE Working Group",
			role: "Separates confidence in evidence from strength of a recommendation; cited handbook is being replaced"
		}
	],
	evidenceSummaries: [
		{
			question: "Are two studies actually inconsistent?",
			population: "An illustrative example, not observed study data",
			finding:
				"Suppose two studies both estimate a change of +2 units, with intervals of -1 to +5 and +1 to +3. Their different significance labels do not establish opposing effects; their precision differs.",
			effectDirection: "supports",
			magnitude:
				"Compare effect estimates, intervals and study assumptions before treating labels as contradictory conclusions.",
			limitations: [
				"This constructed example illustrates the cited interpretation guidance. It does not establish equivalence or assess bias in a real pair of studies."
			]
		},
		{
			question: "Does statistical disagreement mean abandoning statistics?",
			population: "The ASA president's task-force statement, published in 2021",
			finding:
				"The task force supported properly applied significance tests and decision thresholds justified by study goals and error consequences. It distinguished a 2019 editorial advocating abandonment of significance labels from official ASA policy.",
			effectDirection: "supports",
			magnitude:
				"A documented dispute about inference and decisions, not a measured percentage of researchers or an empirical effect size.",
			limitations: [
				"The statement is one attributed methodological position. It is not a current representative survey of statisticians or evidence that every scientific controversy is balanced."
			]
		}
	],
	readerAnnouncement: {
		id: "6d8d4fcb-038d-4f25-b7f8-3f91f92233c8",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary:
			"Expanded debate beyond mechanisms and edge cases; added concrete ways to distinguish conflicting evidence, different questions, uncertainty and decision tradeoffs."
	}
};

const study: Partial<CompleteSeedClaim> = {
	bottomLine:
		"A new study should change a conclusion in proportion to its relevance, precision and credibility within the wider evidence. Many papers refine an estimate or its limits; a strong result can sometimes change the picture substantially. Neither novelty nor being outnumbered is a reason to accept or dismiss it.",
	stableCore: [
		"Ask whether the new study addresses the same population, exposure, comparison and outcome as the existing conclusion, and whether it improves on the weaknesses of earlier work.",
		"A p-value does not measure an effect's importance or the probability that the hypothesis is true. Effect estimates, intervals, assumptions and transparent reporting answer different parts of the question.",
		"Reusing one dataset in several papers does not provide several independent replications. Nor does a meta-analysis automatically remove bias shared by its included studies."
	],
	openQuestions: [
		"Does the new result survive justified alternative analyses, and can independent evidence test its central explanation?",
		"Would it materially change an updated synthesis or a practical decision once harms, baseline risk and uncertainty are considered?"
	],
	whatWouldChangeMinds: [
		"A credible new design, measurement or large precise study that resolves an important weakness in the existing evidence.",
		"Replicated contrary findings, or a correction exposing a material error in an influential result."
	],
	misconceptions: [
		"Rarely is not never: existing conclusions are revisable, and a well-supported contradictory finding deserves scrutiny rather than dismissal.",
		"A nonsignificant result is not automatically proof of no effect, and a significant result is not automatically useful or causal.",
		"A mathematical argument about false findings is not a measured census of the proportion of all research that is false."
	],
	editorSummary:
		"Retains the central advice to interpret new findings in context, while making room for consequential exceptions. Adds precise inference and replication examples and records the linked correction to the Ioannidis paper.",
	uncertaintySummary:
		"This is methodological guidance, not a claim that a fixed percentage of new studies will change consensus. Examples from selected psychology journals do not estimate reliability across all fields. Confidence intervals also omit some biases; the certainty label is editorial, not formal GRADE.",
	uncertaintyDrivers: [
		{
			type: "bias",
			detail: "Selective reporting and shared measurement or modeling errors can survive apparently precise analyses."
		},
		{
			type: "generalizability",
			detail: "A result may be credible in its studied setting without applying to another population or outcome."
		}
	],
	coiSummary:
		"Original abstract access for the psychology replication study does not establish a complete disclosure or data audit. Institutional guidance and the Ioannidis methodological argument are not counted as new independent experiments.",
	institutionalAnchors: [
		{
			name: "American Statistical Association",
			role: "Principles for interpreting p-values and quantitative evidence"
		},
		{ name: "Cochrane", role: "Effect estimates, intervals and limits of intervention-review conclusions" },
		{ name: "National Academies", role: "Scope and limitations of reproduction, replication and generalization" }
	],
	evidenceSummaries: [
		{
			question: "What did one large replication project actually measure?",
			population: "Open Science Collaboration 2015: replications of 100 studies from three psychology journals",
			finding:
				"The original abstract reports several criteria: statistical significance, interval coverage and subjective assessments gave different replication rates. A single pass/fail label loses information.",
			effectDirection: "supports",
			magnitude:
				"97% of originals and 36% of replications were statistically significant; 47% of original estimates were inside the replication's 95% interval and 39% were judged replicated.",
			limitations: [
				"These are different criteria within a selected sample, not percentages of all science that is true or false. Full methods, data and later comment-response analyses were not independently appraised."
			]
		},
		{
			question: "Does the Ioannidis paper prove that most research is false?",
			population: "A 2005 methodological argument and its 2022 publisher correction",
			finding:
				"The argument explores assumptions about prior odds, power, bias and selective reporting. It is not a direct survey of the truth of all published findings. A correction repairs missing parentheses in one Table 2 expression.",
			effectDirection: "supports",
			magnitude: "No population-wide false-finding percentage is inferred here.",
			limitations: [
				"Selected original argument sections and the full correction notice were read. The corrected table image and a full independent mathematical recalculation were not assessed."
			]
		}
	],
	readerAnnouncement: {
		id: "c87999ae-c9f1-47af-ac4b-9cd6d98fc68a",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary:
			"Added concrete inference and replication examples, explained when a strong single study can matter, and documented the Ioannidis correction without treating its title as an empirical false-finding rate."
	}
};

function retainedSources(seed: CompleteSeedClaim): Source[] {
	return seed.sources.map((source): Source => {
		const retained = { ...source, appraisal: "not_appraised" as const };
		if (source.doi === nasem.doi)
			return { ...retained, note: nasem.note, citationCheckedAt: nasem.citationCheckedAt };
		if (source.doi === osc.doi) return { ...retained, note: osc.note, citationCheckedAt: osc.citationCheckedAt };
		if (source.doi === "10.1371/journal.pmed.0020124") {
			return {
				...retained,
				kind: "context",
				isAnchor: false,
				citationStatus: "corrected",
				citationCheckedAt: "2026-09-12T20:12:08.265Z",
				statusSources: [
					...new Set([
						...(source.statusSources ?? []),
						correction,
						"https://europepmc.org/article/MED/36007233"
					])
				],
				note: "Selected mathematical examples and corollaries read; a theoretical argument, not an empirical census. The full 2022 notice identifies missing parentheses in Table 2. Corrected table image and independent recalculation not assessed."
			};
		}
		if (source.publisher === "Cochrane") {
			return {
				...retained,
				isAnchor: false,
				citationCheckedAt: preparedAt,
				note: "Original handbook URL retained; redirects to version 6.5 (2024). Selected chapters 10, 14 and 15 inspected, not the whole handbook. Chapter-specific references below clarify which guidance supports this page."
			};
		}
		if (source.publisher === "GRADE Working Group") {
			return {
				...retained,
				isAnchor: false,
				citationCheckedAt: preparedAt,
				note: "Original 2013 handbook overview and evidence-versus-recommendation sections read. The site says it is being replaced by the GRADE Book and flags updated sections; the new book's rendered text was inaccessible. Retained as historical methods context."
			};
		}
		return {
			...retained,
			citationCheckedAt: preparedAt,
			note: "Scientific Progress sections 2.4-3.2 read as philosophical context. Competing accounts of progress, not an empirical expert poll or a single agreed recipe for assessing truth."
		};
	});
}

export function refreshFoundationsClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	const refresh
		= seed.topicSlug === "consensus-foundations" && seed.slug === formationSlug
			? formation
			: seed.topicSlug === "active-debates" && seed.slug === debateSlug
				? debate
				: seed.topicSlug === "media-misinformation" && seed.slug === studySlug
					? study
					: undefined;
	if (!refresh) return seed;
	const additions: Source[]
		= seed.slug === formationSlug
			? [
					{
						kind: "systematic_review",
						title: "Defining consensus: a systematic review recommends methodologic criteria for reporting of Delphi studies",
						publisher: "Journal of Clinical Epidemiology",
						year: 2014,
						url: "https://pubmed.ncbi.nlm.nih.gov/24581294/",
						doi: "10.1016/j.jclinepi.2013.12.002",
						pmid: "24581294",
						stance: "supports",
						appraisal: "not_appraised",
						citationStatus: "current",
						citationCheckedAt: "2026-09-12T20:11:59.669Z",
						order: 1,
						note: "Complete original indexed abstract and publisher introduction inspected. Describes a sampled set of reporting practices; full methods, supplements and disclosures not independently appraised."
					},
					{
						kind: "guideline",
						title: "ACCORD: A reporting guideline for consensus methods in biomedicine developed via a modified Delphi",
						publisher: "PLOS Medicine",
						year: 2024,
						url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1004326",
						doi: "10.1371/journal.pmed.1004326",
						pmid: "38261576",
						pmcid: "PMC10805282",
						stance: "supports",
						isAnchor: true,
						appraisal: "not_appraised",
						citationStatus: "current",
						citationCheckedAt: "2026-09-12T20:12:02.375Z",
						order: 1,
						note: "Original scope, selected methods/results, disclosures and complete 35-item checklist text inspected. A healthcare reporting guideline, not method-design advice or proof of scientific validity. Supplements and visual figures not independently appraised."
					},
					{
						kind: "systematic_review",
						title: "How Delphi studies in the health sciences find consensus: a scoping review",
						publisher: "Systematic Reviews",
						year: 2025,
						url: "https://pubmed.ncbi.nlm.nih.gov/39810238/",
						doi: "10.1186/s13643-024-02738-3",
						pmid: "39810238",
						pmcid: "PMC11734368",
						stance: "supports",
						appraisal: "not_appraised",
						citationStatus: "current",
						citationCheckedAt: "2026-09-12T20:12:05.459Z",
						order: 1,
						note: "Original indexed abstract inspected: 287 studies, 2018-April 2021, with language and keyword restrictions. Publication year is not the literature cutoff. Full methods, results and disclosures not independently appraised."
					}
				]
			: seed.slug === debateSlug
				? [heterogeneity, certainty, interpretation, asaTaskForce]
				: [interpretation, asa, nasem, osc];
	return {
		...seed,
		...common,
		...refresh,
		lastRetractionCheckAt:
			seed.slug === formationSlug
				? "2026-09-12T20:12:05.459Z"
				: seed.slug === studySlug
					? "2026-09-12T20:12:08.265Z"
					: seed.lastRetractionCheckAt,
		sources: [
			...retainedSources(seed),
			...additions.map((source, index) => ({ ...source, order: seed.sources.length + index + 1 }))
		],
		changeLog: [
			...seed.changeLog,
			{ date: preparedAt, kind: "update", summary: refresh.readerAnnouncement!.summary }
		]
	};
}
