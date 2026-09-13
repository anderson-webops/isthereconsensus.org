import type { CompleteSeedClaim } from "./claims.js";

const preparedAt = "2026-09-13T01:03:07.000Z";
const slug = "do-mrna-covid-19-vaccines-change-your-dna";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.7150/ijbs.59233": "2026-09-12T23:38:52.441Z",
	"10.3390/cimb44030073": "2026-09-12T23:38:54.923Z",
	"10.3390/v15030629": "2026-09-12T23:38:57.403Z",
	"10.1038/s41541-025-01304-9": "2026-09-12T23:38:59.996Z",
	"10.1080/08916934.2025.2551517": "2026-09-12T23:39:02.628Z",
	"10.18632/oncotarget.28913": "2026-09-12T23:39:05.417Z"
};
const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "Intracellular Reverse Transcription of Pfizer BioNTech COVID-19 mRNA Vaccine BNT162b2 In Vitro in Human Liver Cell Line",
		publisher: "Current Issues in Molecular Biology",
		year: 2022,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8946961/",
		doi: "10.3390/cimb44030073",
		pmid: "35723296",
		pmcid: "PMC8946961",
		stance: "context",
		order: 5,
		note: "Original selected design, results, limitations and disclosures assessed through the NCBI archive. Authors did not establish chromosome integration. Figures, supplements and raw data not independently appraised."
	},
	{
		kind: "landmark_study",
		title: "LINE1-Mediated Reverse Transcription and Genomic Integration of SARS-CoV-2 mRNA Detected in Virus-Infected but Not in Viral mRNA-Transfected Cells",
		publisher: "Viruses",
		year: 2023,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10057545/",
		doi: "10.3390/v15030629",
		pmid: "36992338",
		pmcid: "PMC10057545",
		stance: "context",
		order: 6,
		note: "Original selected comparisons, results, limitations and disclosures assessed through the NCBI archive. Artificial positive-control conditions matter. Not a study of commercial vaccine administration; figures, supplements and raw data not independently appraised."
	},
	{
		kind: "landmark_study",
		title: "Systematic analysis of COVID-19 mRNA vaccines using four orthogonal approaches demonstrates no excessive DNA impurities",
		publisher: "npj Vaccines",
		year: 2025,
		url: "https://www.nature.com/articles/s41541-025-01304-9",
		doi: "10.1038/s41541-025-01304-9",
		pmid: "41390528",
		pmcid: "PMC12715226",
		stance: "context",
		order: 7,
		note: "Original sample selection, main findings, limitations and disclosures assessed. Selected batches, mostly expired; not a clinical integration study. Full figures, supplements and raw data not independently appraised."
	},
	{
		kind: "landmark_study",
		title: "Quantification of residual plasmid DNA and SV40 promoter-enhancer sequences in Pfizer/BioNTech and Moderna modRNA COVID-19 vaccines from Ontario, Canada",
		publisher: "Autoimmunity",
		year: 2025,
		url: "https://pubmed.ncbi.nlm.nih.gov/40913499/",
		doi: "10.1080/08916934.2025.2551517",
		pmid: "40913499",
		stance: "context",
		order: 8,
		note: "Original PubMed abstract only, obtained through NCBI. Publisher access failed. Full methods, sample provenance, disclosures, figures and supplements not appraised; measurement claims cannot establish clinical DNA change."
	},
	{
		kind: "context",
		title: "Systematic methodological flaws in DNA contamination assessment of mRNA vaccines: A critical analysis of Achs et al. (2025)",
		publisher: "Oncotarget",
		year: 2026,
		url: "https://www.oncotarget.com/article/28913/text/",
		doi: "10.18632/oncotarget.28913",
		pmid: "42599093",
		stance: "context",
		order: 9,
		note: "Original critique and disclosures read. Not an independent clinical study, replication or registered correction. Its calculations and referenced claims were not independently revalidated."
	}
];

export function refreshDnaClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "health-and-medicine" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "94e4de95-a59a-4c07-b8dd-5e6dd6c69077",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary:
			"Replaced an absolute mechanism claim with an evidence-qualified answer. Added cell-study limitations and conflicting residual-DNA measurements, distinguishing them from demonstrated chromosome changes in vaccinated people."
	};
	return {
		...seed,
		bottomLine:
			"There is no established evidence that mRNA COVID-19 vaccines rewrite chromosomes in vaccinated people. Their intended action is temporary protein production, not gene editing. Laboratory findings and disputes about residual manufacturing DNA do not demonstrate that clinical outcome. This is an evidence-based conclusion, not proof that every conceivable molecular event is impossible.",
		stableCore: [
			"Messenger RNA carries instructions for making protein. Protein production does not itself require changing a person's chromosomes.",
			"Finding a vaccine-related DNA fragment is different from showing it has become part of a chromosome, and different again from demonstrating a resulting health effect.",
			"Experiments in selected cell lines cannot by themselves establish the frequency or consequences of an event in vaccinated people.",
			"Residual DNA from manufacture and DNA potentially copied from RNA are separate questions. Neither should be conflated with demonstrated clinical gene editing."
		],
		openQuestions: [
			"How well do molecular observations generalize across laboratory models, normal tissues and actual vaccine administration?",
			"Can independent assessments resolve conflicting residual-DNA measurements using comparable samples and transparent uncertainty?",
			"What evidence links any molecular finding to its frequency and clinical significance, rather than only to theoretical possibility?"
		],
		whatWouldChangeMinds: [
			"Independently replicated evidence of vaccine-derived material integrated into human chromosomes after vaccination, with credible exclusion of contamination and clear clinical interpretation.",
			"Reproducible human outcome evidence connecting such a finding to meaningful harm, with alternative explanations addressed."
		],
		misconceptions: [
			"A genetic instruction is not necessarily gene editing.",
			"A detected DNA fragment is not proof of chromosome integration. An undetected event in one experiment is not proof of universal impossibility.",
			"A vaccine-vial measurement is not a measurement of altered DNA in a vaccinated person.",
			"Rejecting the claim of established DNA rewriting does not settle every vaccine side effect, manufacturing-quality question or recommendation."
		],
		editorSummary:
			"The earlier page relied on broad institutional explanations and categorical wording. This revision adds the studies commonly invoked in the DNA debate, explains what they measured, retains conflicting findings, and separates molecular possibility from demonstrated human outcomes. It does not offer laboratory procedures or personal vaccination advice.",
		uncertaintySummary:
			"The cited evidence does not establish chromosome rewriting in vaccine recipients, but it cannot supply a numerical zero-risk estimate for every molecular event. Moderate overall certainty is an editorial assessment of this qualified synthesis, not a formal grade for each finding. Individual summaries remain unrated; the retained agreement label is not a measured expert survey.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Selected cell models and vaccine batches do not directly represent clinical genomic outcomes."
			},
			{
				type: "inconsistency",
				detail: "Detection limits, sample condition and assay differences constrain interpretation of molecular measurements."
			},
			{
				type: "imprecision",
				detail: "The cited studies do not estimate the frequency or clinical consequences of chromosome integration in vaccinated people."
			}
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-12T23:39:05.417Z",
		searchDatabases: [
			"Targeted original studies, institutional explanations and reference tracing; not an exhaustive systematic search",
			"Consensus discovery followed by fetched records and original-source verification",
			"Crossref and Europe PMC publication-notice metadata"
		],
		inclusionRules: [
			"Distinguish protein production, DNA-fragment detection, chromosome integration and human health outcomes.",
			"Retain relevant contrary findings and describe each study's actual population, comparison and access limits."
		],
		exclusionRules: [
			"Do not infer human genomic effects from a vial measurement, a cell-line result or a theoretical mechanism alone.",
			"Do not convert absence of detection or a publication warning into proof of zero risk or scientific validity."
		],
		appraisalTools: [
			"Narrative assessment of evidence scope, detection claims, generalizability and disclosures; no independent formal risk-of-bias assessment"
		],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary:
			"Alden and Achs report public/institutional funding and declare no competing interests. Zhang includes disclosed biotechnology advisory, founder and ownership interests. Park discloses a biotechnology founder interest. McKernan discloses employment at a molecular-testing company; his coauthors declare none. Speicher 2025 disclosures were inaccessible. These statements are not an independent conflicts audit.",
		independenceSummary:
			"The retained institutional pages explain mechanisms, not new clinical genomic studies. A critique of another paper is not an independent replication, and overlapping investigators or reused evidence should not be counted as separate confirmations. Twelve provider observations for six DOIs found no registered updates; that does not resolve methodological disagreements or certify validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What does the normal vaccine mechanism establish?",
				population: "NHGRI, MedlinePlus and CDC explanations, with Park 2021 platform background",
				finding:
					"These sources explain mRNA-directed protein production without chromosome rewriting. That mechanism addresses why an mRNA vaccine is not a gene-editing treatment; it is not a population study measuring every possible rare molecular event.",
				effectDirection: "supports",
				magnitude: "Mechanistic context, not a numerical genomic-risk estimate.",
				limitations: [
					"Older explanations do not substitute for evaluation of later findings or establish current vaccination policy. Their publication dates are not new scientific review dates."
				]
			},
			{
				question: "Did Alden 2022 show chromosome changes?",
				population: "A human liver-cancer cell line exposed to BNT162b2 in vitro",
				finding:
					"The authors reported vaccine-related DNA and interpreted it as reverse transcription. They explicitly did not establish whether that DNA was integrated into the cell genome. The result cannot be relabelled as demonstrated chromosome rewriting in vaccinated people.",
				effectDirection: "unclear",
				magnitude: "A laboratory molecular signal, not a clinical integration rate.",
				limitations: [
					"Cancer-derived cells differ from normal tissue. No demonstrated vaccine-host chromosome junctions or human clinical outcome assessment. Original selected sections assessed; raw data and supplements not independently appraised."
				]
			},
			{
				question: "What does Zhang 2023 add?",
				population: "Laboratory comparisons of viral infection and delivery of viral nucleocapsid mRNA",
				finding:
					"Integration was not detected after RNA delivery without artificial LINE1 overexpression, while positive-control conditions with overexpression did yield integration. The negative result must not erase that qualification. The RNA and delivery differed from commercial spike-mRNA vaccines.",
				effectDirection: "unclear",
				magnitude: "Condition-dependent laboratory findings, not a vaccinated-human comparison.",
				limitations: [
					"Detection and sampling constraints prevent proving universal absence. Some evidence overlaps earlier work; no independent clinical replication or numerical vaccine-recipient risk estimate."
				]
			},
			{
				question: "Do conflicting vial measurements establish DNA changes in people?",
				population: "Achs 2025: 15 Slovak batches; Speicher 2025: 32 Canadian vials from 16 lots",
				finding:
					"Achs reported residual DNA below the limit cited by its authors using complementary measurements. Speicher reported higher fluorescence-based estimates and assay-dependent findings. These are manufacturing-residue assessments, not observations of altered chromosomes in vaccine recipients.",
				effectDirection: "mixed",
				magnitude:
					"Selected samples and differing measurement approaches, not a population health-risk estimate.",
				limitations: [
					"Eleven Achs batches were expired. Sample selection, RNA interference and measurement assumptions limit comparison. Only Speicher's original abstract was accessible, preventing full appraisal of that report. Neither study resolves all batch-quality or clinical-safety questions."
				]
			},
			{
				question: "How should the 2026 critique be interpreted?",
				population: "McKernan, Speicher and Rose's methodological critique of Achs 2025",
				finding:
					"The authors dispute measurement assumptions, sensitivity and fragment-related bias. Their critique is relevant to interpreting the batch analysis, but is not new evidence of chromosome integration in vaccinated people.",
				effectDirection: "unclear",
				magnitude: "Technical criticism, not an independent clinical replication.",
				limitations: [
					"Its calculations and referenced allegations have not been independently validated here. Publication of a criticism does not establish that every objection is correct, nor should it be silently omitted."
				]
			}
		],
		surveillanceSpec: {
			focus: "Clinical relevance and limitations of DNA-change claims about mRNA COVID-19 vaccines",
			cadenceDays: 180,
			watchTerms: [
				"mRNA vaccine human genomic outcomes evidence",
				"residual vaccine DNA independent assessment",
				"COVID vaccine DNA claim correction replication"
			],
			integrityMonitors: [
				"Crossref and Europe PMC publication-notice metadata",
				"Original publisher corrections and responses"
			],
			guidelineMonitors: ["Public genomics and vaccine-safety evidence assessments"],
			triggerRules: [
				"Reassess independent human evidence, materially resolved measurement disputes, or corrections affecting cited findings. Keep coverage explanatory and non-operational."
			]
		},
		sources: [
			...seed.sources.map(source => ({
				...source,
				appraisal: "not_appraised" as const,
				citationCheckedAt: source.doi
					? (noticeChecks[source.doi.toLowerCase()] ?? source.citationCheckedAt)
					: source.citationCheckedAt,
				note: source.doi
					? "Original selected mechanism, platform limitations and disclosures read. Historical background, not a new clinical genomic-risk study. Full figures and underlying studies not independently appraised."
					: source.publisher === "Centers for Disease Control and Prevention"
						? "Original mechanism section read; page displays September 3, 2024. Historical explanation, not a new policy assessment or independent review of the later studies."
						: "Original mechanism explanation read. Retained historical genomics context; accessing it again does not create a new publication date, expert review or measured zero-risk estimate."
			})),
			...additions.map(source => ({
				...source,
				appraisal: "not_appraised" as const,
				citationStatus: "current" as const,
				citationCheckedAt: noticeChecks[source.doi!.toLowerCase()]
			}))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
