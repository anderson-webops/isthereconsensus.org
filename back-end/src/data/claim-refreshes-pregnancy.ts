import type { CompleteSeedClaim } from "./claims.js";

// Source preparation, not a new scientific review date or independent expert approval.
const preparedAt = "2026-09-12T21:19:41.000Z";
const slug = "are-covid-19-vaccines-safe-and-beneficial-during-pregnancy-and-breastfeeding";
type Source = CompleteSeedClaim["sources"][number];

const noticeChecks: Record<string, string> = {
	"10.1038/s41467-022-30052-w": "2026-09-12T21:02:51.125Z",
	"10.1007/s40264-024-01458-w": "2026-09-12T21:02:53.520Z",
	"10.1097/aog.0000000000005093": "2026-09-12T21:02:56.076Z",
	"10.1016/j.ajogmf.2022.100637": "2026-09-12T21:02:58.785Z",
	"10.1136/bmjmed-2023-000632": "2026-09-12T21:03:01.256Z",
	"10.1001/jama.2023.26945": "2026-09-12T21:03:03.945Z",
	"10.1001/jamanetworkopen.2025.38039": "2026-09-12T21:06:24.019Z",
	"10.1016/j.vaccine.2026.128340": "2026-09-12T21:06:27.201Z"
};

const sourceNotes: Record<string, string> = {
	"10.1038/s41467-022-30052-w": "Original methods, selected results, limitations and disclosures read. Search through January 9, 2022; mostly observational evidence, plus small inadvertent pregnancy exposures in vaccine trials. Substantial heterogeneity and confounding limit causal claims. Supplements and visual forest plots not appraised.",
	"10.1007/s40264-024-01458-w": "Original abstract, methods, selected outcomes and disclosures read. The living-review title does not extend its October 2023 search cutoff. Authors rate major comparative outcomes low or very low certainty. Its booster bleeding signal is traced to the original study below; the original reports an odds ratio, not the review prose's risk ratio.",
	"10.1097/aog.0000000000005093": "Complete original indexed abstract read; full text and disclosures inaccessible. A narrative lactation review distinguishing transient milk mRNA detection from evidence of infant harm. Milk antibodies are not themselves a measured clinical hospitalization benefit. No full-paper appraisal.",
	"https://www.cdc.gov/covid/vaccines/pregnant-or-breastfeeding.html": "Full page marked February 10, 2026 read. Describes the 2025-2026 individual-decision framework, higher pregnancy risk, antenatal infant protection, lactation and side effects. Its Norman bibliography label was checked against the original JAMA article rather than copied.",
	"https://www.acog.org/clinical/clinical-guidance/committee-statement/articles/2026/02/maternal-immunizations": "Original indexed abstract, recommendation summary and selected background text read, including updated COVID vaccination in pregnancy and lactation. February 2026 guidance; not an independent trial. Full guideline, visual tables and individual author disclosures not appraised."
};

const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "First-Trimester mRNA COVID-19 Vaccination and Risk of Major Congenital Anomalies",
		publisher: "JAMA Network Open",
		year: 2025,
		url: "https://pubmed.ncbi.nlm.nih.gov/41091463/",
		doi: "10.1001/jamanetworkopen.2025.38039",
		pmid: "41091463",
		pmcid: "PMC12529215",
		stance: "supports",
		isAnchor: true,
		order: 6,
		note: "Original abstract and selected full-text data-source, outcome, limitation and disclosure sections read. French live-birth cohort with 2021-2022 exposures; most malformations identified within one year, three within two. Five extremely rare anomalies could not be assessed. Full supplements and visual figures not appraised."
	},
	{
		kind: "landmark_study",
		title: "Risk of spontaneous abortion after mRNA COVID-19 vaccination received just prior to or during pregnancy: Complete data from CDC COVID-19 vaccine pregnancy registry",
		publisher: "Vaccine",
		year: 2026,
		url: "https://pubmed.ncbi.nlm.nih.gov/41713234/",
		doi: "10.1016/j.vaccine.2026.128340",
		pmid: "41713234",
		pmcid: "PMC12973310",
		stance: "supports",
		order: 7,
		note: "Original abstract, selected cohort/outcome/statistical methods, discussion, limitations and disclosures read. Vaccination occurred in December 2020-June 2021; comparison is historical, not a concurrent unvaccinated group. Completes an earlier registry, so do not count it as an independent new population. Supplements not appraised."
	},
	{
		kind: "landmark_study",
		title: "Safety of third SARS-CoV-2 vaccine (booster dose) during pregnancy",
		publisher: "American Journal of Obstetrics & Gynecology MFM",
		year: 2022,
		url: "https://pubmed.ncbi.nlm.nih.gov/35398583/",
		doi: "10.1016/j.ajogmf.2022.100637",
		pmid: "35398583",
		pmcid: "PMC8988438",
		stance: "debate",
		order: 8,
		note: "Original abstract, selected methods, outcome definitions, regression-table footnotes and disclosures read. Postpartum bleeding was a secondary outcome; only 294 participants had a third dose. Retains the adverse association without turning adjusted odds into a risk ratio or inferring causation. No independent data reanalysis."
	},
	{
		kind: "landmark_study",
		title: "Pregnancy, fetal, and neonatal outcomes after a first booster dose of covid-19 vaccine during pregnancy in Ontario, Canada: population based, retrospective cohort study",
		publisher: "BMJ Medicine",
		year: 2023,
		url: "https://pubmed.ncbi.nlm.nih.gov/37456362/",
		doi: "10.1136/bmjmed-2023-000632",
		pmid: "37456362",
		pmcid: "PMC10347452",
		stance: "supports",
		isAnchor: true,
		order: 9,
		note: "Original eligibility, weighting/time-varying methods, selected outcomes, limitations and disclosures read. 32,689 births from 32,125 pregnancies; follow-up begins at 20 weeks. Compares third-dose recipients with eligible primary-series recipients. Does not assess miscarriage or every updated formulation; full supplements and visual figures not appraised."
	},
	{
		kind: "landmark_study",
		title: "Neonatal Outcomes After COVID-19 Vaccination in Pregnancy",
		publisher: "JAMA",
		year: 2024,
		url: "https://jamanetwork.com/journals/jama/fullarticle/2814537",
		doi: "10.1001/jama.2023.26945",
		pmid: "38319332",
		pmcid: "PMC10848052",
		stance: "supports",
		order: 10,
		note: "Original abstract, selected methods/results, main-table rows, limitations and disclosures read. Sweden/Norway register cohort; neonatal outcomes, not long-term development. No single primary outcome was predefined. The abstract's significant hypoxic-ischaemic estimate refers to second-trimester exposure, not the overall cohort. Supplements not appraised."
	}
];

export function refreshPregnancyClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "health-and-medicine" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "aef3e4e5-d1d8-4e75-8647-33e3702e8050",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary: "Replaced blanket safety wording with outcome-specific evidence, added 2025-2026 studies, compared a postpartum bleeding signal with a larger cohort, and separated pregnancy protection from breastfeeding antibody findings."
	};
	return {
		...seed,
		bottomLine: "Evidence supports COVID-19 vaccination during pregnancy, especially to reduce severe disease, with broadly reassuring findings for the pregnancy and infant outcomes studied. That does not mean zero risk or equal certainty for every outcome and vaccine. Breastfeeding is generally compatible with vaccination; its infant-protection evidence differs from vaccination during pregnancy.",
		stableCore: [
			"Pregnancy increases the risk of severe COVID-19. The absolute benefit of an updated dose depends on current infection risk, previous immunity, health conditions and timing.",
			"Large studies of mostly mRNA vaccines have generally found no increase in the assessed pregnancy and newborn outcomes. Study design, follow-up and precision still matter, particularly for rare harms.",
			"CDC's February 2026 page describes individual decision-making for the 2025-2026 vaccines and greater benefit at higher risk. ACOG's 2026 guidance recommends updated vaccination in pregnancy and lactation. Those are attributed recommendations, not two independent experiments.",
			"Studies of vaccination during pregnancy support reduced COVID-19 hospitalization in young infants. Detecting antibodies in breast milk after vaccination is a different finding and does not establish the same clinical benefit from breastfeeding-only exposure."
		],
		openQuestions: [
			"How much additional protection does the currently available formulation provide for a pregnant person with their particular prior infection, vaccination and health history?",
			"How precisely can studies assess very rare outcomes, individual malformation subtypes and longer-term development?",
			"Does a reported adverse association persist with better control of timing, baseline differences and outcome measurement?"
		],
		whatWouldChangeMinds: [
			"Replicated, well-controlled evidence of vaccine-attributable serious harm that changes the balance for a defined pregnancy group or product.",
			"Reliable evidence that updated doses no longer provide meaningful protection against severe COVID-19 in the relevant population."
		],
		misconceptions: [
			"A study reporting no statistically significant increase does not prove exactly zero risk. A single adverse association does not establish causation either.",
			"A paper published in 2026 can analyze vaccinations given in 2020-2021. Publication date is not the date of the exposure or variant studied.",
			"A study restricted to live births cannot by itself establish miscarriage safety, and newborn follow-up does not establish every long-term developmental outcome.",
			"Small, transient quantities of vaccine mRNA have been detected in breast milk in some studies. Detection alone is not evidence that it survives infant digestion or causes harm."
		],
		editorSummary: "The previous broad statement missed differences in outcome certainty and a reported booster-associated bleeding signal. The revised review adds quantitative comparisons, newer first-trimester evidence and explicit follow-up limits while retaining the overall favorable pregnancy benefit-risk conclusion.",
		uncertaintySummary: "Most comparative pregnancy evidence is observational. Residual confounding, selection into vaccination, rare outcomes and changing products limit causal and contemporary estimates. Overall certainty is a moderate editorial judgment, not an independent GRADE rating; the 2024 living-review authors judged major comparative outcomes low or very low certainty. Birth outcomes, early loss, long-term development and breastfeeding protection require distinct evidence.",
		uncertaintyDrivers: [
			{ type: "bias", detail: "Health, healthcare use, pregnancy timing and willingness to enroll can differ between vaccinated and comparison groups." },
			{ type: "imprecision", detail: "Rare harms and small product or trimester subgroups can have wide intervals despite a large overall cohort." },
			{ type: "generalizability", detail: "Older vaccine formulations and variants do not provide a precise current absolute benefit; live-birth and neonatal studies have limited outcome scope." }
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-12T21:06:27.201Z",
		searchDatabases: [
			"Targeted original institutional guidance, PubMed/Europe PMC and publisher text/XML; not an exhaustive systematic search",
			"Consensus discovery followed by original-source checks; searches and fetched summaries are not independent evidence",
			"Crossref and Europe PMC publication-notice metadata, separate from scientific assessment"
		],
		inclusionRules: [
			"Specify pregnancy or lactation exposure, comparator, outcome, formulation and observation period.",
			"Prioritize comparative cohorts and syntheses; retain materially relevant contrary findings and distinguish effect measures."
		],
		exclusionRules: [
			"Do not add overlapping review populations or updated registry reports as independent replications.",
			"Do not infer clinical infant protection from antibodies alone, or a vaccine-attributable risk from an uncontrolled rate compared with historical expectations."
		],
		appraisalTools: ["Narrative assessment of design, applicability, precision and disclosures; no independent GRADE or formal risk-of-bias assessment"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "The 2024 living review reports Gates Foundation support and no sponsor role or relevant conflicts. Prasad authors disclose vaccine-committee and pregnancy-trial roles, including a Pfizer trial. The Ontario study reports public support and one author's CANImmunize and vaccine safety-advisory roles. Norman reports public/academic grants and no sponsor role. Bernard reports no competing interests; Madni reports CDC contract support and no known competing interests. Lactation-review disclosures were not accessible. These disclosures do not by themselves determine validity.",
		independenceSummary: "Institutional guidance, overlapping syntheses and an updated registry are not separate independent experiments. The site labels are editorial judgments, not a measured percentage of experts. No evidence of harm is not proof of zero risk, and a source-notice check does not establish scientific validity.",
		institutionalAnchors: [
			{ name: "US Centers for Disease Control and Prevention", role: "Attributed 2025-2026 decision framework, pregnancy risk and lactation guidance" },
			{ name: "American College of Obstetricians and Gynecologists", role: "Attributed 2026 specialty guidance on updated vaccination in pregnancy and lactation" }
		],
		evidenceSummaries: [
			{
				question: "How strong is the evidence for protection against severe maternal COVID-19?",
				population: "Ciapponi 2024 living review: 177 studies, 638,791 participants in 41 countries; search through October 2023",
				finding: "The authors found protection against severe COVID-19 or hospitalization, while rating major comparative outcomes low or very low certainty. Their comparative synthesis prioritized adjusted or matched estimates and accounted for overlapping populations.",
				effectDirection: "supports",
				magnitude: "A pooled 72% relative reduction in severe disease or hospitalization (95% CI, 42%-86%) is a historical estimate, not a current absolute benefit.",
				limitations: ["The benefit varies by prior immunity, variant, product and time. Not all 177 studies entered each pooled comparison; full supplements were not independently appraised."]
			},
			{
				question: "What does newer first-trimester evidence say about major birth defects?",
				population: "Bernard 2025: 527,564 French live-born infants; 130,338 exposed to at least one first-trimester mRNA dose in 2021-2022",
				finding: "Major-malformation prevalence was similar after weighting for measured differences. Most included anomalies were identified within one year and three within two years. This is reassuring for those outcomes, not a study of every aspect of child development.",
				effectDirection: "supports",
				magnitude: "176.6 versus 179.4 per 10,000 live births; weighted odds ratio 0.98 (95% CI, 0.93-1.04).",
				limitations: ["Live-birth selection, exclusions and residual confounding matter. Five extremely rare anomalies had no cases to assess; wide subtype intervals do not exclude all meaningful risks."]
			},
			{
				question: "Does the updated US pregnancy registry establish miscarriage risk caused by vaccination?",
				population: "Madni 2026: 12,097 pregnancies in a volunteer registry; original mRNA vaccination in December 2020-June 2021",
				finding: "The cumulative miscarriage estimate from 6 to 20 weeks was within or below historical expectations. Pregnancies entered the risk pool at vaccination. With no concurrent unvaccinated group, this cannot establish a protective effect or a precise vaccine-attributable risk.",
				effectDirection: "supports",
				magnitude: "Cumulative risk 10.79% (95% CI, 10.01%-11.56%). The reported brand comparison is not vaccination versus no vaccination.",
				limitations: ["Enrollment after pregnancy loss, self-report, demographic homogeneity and historical controls can bias estimates. This completes an earlier registry rather than adding an independent population."]
			},
			{
				question: "Was an increased risk of postpartum bleeding ever reported?",
				population: "Dick 2022 Israeli cohort and Fell 2023 Ontario cohort of third-dose exposure during pregnancy",
				finding: "Yes. The smaller Israeli study reported an association: 9.5% after three doses versus 3.5% after two, adjusted odds ratio 3.34 (95% CI, 2.07-5.39). The larger Ontario study found no increased association, but the populations, timing and methods differed. Neither result alone settles causality.",
				effectDirection: "mixed",
				magnitude: "Israel: 294 third-dose recipients. Ontario: 32,689 births, including 18,491 third-dose exposures; adjusted hazard ratio 1.01 (95% CI, 0.89-1.16).",
				limitations: ["Bleeding was a secondary outcome in the smaller study. Ontario used time-varying exposure and weighting but cannot eliminate residual confounding. Odds and hazard ratios are different measures; do not pool them informally."]
			},
			{
				question: "What do the large Nordic newborn data establish?",
				population: "Norman 2024: 196,470 infants from Sweden and Norway, including 94,303 exposed to vaccination during pregnancy",
				finding: "The overall neonatal findings were reassuring. Lower observed neonatal mortality does not prove vaccination directly prevents every neonatal cause of death. The study lacked longer-term developmental and breastfeeding data.",
				effectDirection: "supports",
				magnitude: "Neonatal mortality: 0.9 versus 1.8 per 1,000 live births; adjusted odds ratio 0.68 (95% CI, 0.50-0.91).",
				limitations: ["Outcomes covered at least the first four weeks; some in-hospital morbidity was followed longer. No single primary outcome was predefined. Multiple comparisons, rare events and residual confounding limit interpretation."]
			},
			{
				question: "Does breastfeeding require a different interpretation?",
				population: "CDC pregnancy/lactation guidance and the 2023 Obstetrics and Gynecology lactation review",
				finding: "Available findings support vaccination while breastfeeding. The lactation review finds no evidence-based reason to withhold breast milk solely because of vaccination. Antibodies can be present in milk, but this does not quantify a clinical benefit equivalent to placental antibody transfer during pregnancy.",
				effectDirection: "supports",
				magnitude: "No universal infant-protection percentage is inferred from breast-milk antibody measurements.",
				limitations: ["The lactation review was accessible as a complete original abstract, not a full-paper appraisal. Common maternal side effects can include headache, injection-site pain and fever; seek clinical advice about fever in pregnancy."]
			}
		],
		surveillanceSpec: {
			focus: "Outcome-specific pregnancy and lactation safety and current vaccine benefit",
			cadenceDays: 120,
			watchTerms: ["COVID-19 vaccine pregnancy severe disease effectiveness", "first trimester vaccination congenital anomalies miscarriage", "booster postpartum hemorrhage", "lactation vaccination infant clinical outcomes"],
			integrityMonitors: ["Crossref and Europe PMC notice metadata", "Original publisher notices"],
			guidelineMonitors: ["CDC pregnancy and breastfeeding guidance", "ACOG maternal immunization guidance"],
			triggerRules: ["Reassess a new comparative study, updated formulation, replicated safety signal or changed recommendation against its actual population and outcome."]
		},
		sources: [
			...seed.sources.map(source => ({
				...source,
				appraisal: "not_appraised" as const,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] ?? source.citationCheckedAt : preparedAt,
				note: sourceNotes[source.doi?.toLowerCase() ?? source.url!] ?? source.note
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
