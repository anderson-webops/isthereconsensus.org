import type { CompleteSeedClaim } from "./claims.js";

const preparedAt = "2026-09-13T02:47:18.000Z";
const slug = "did-smoking-cause-lung-cancer";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1136/bmj.2.4682.739": "2026-09-13T02:27:29.183Z",
	"10.1136/bmj.38142.554479.ae": "2026-09-13T02:27:31.773Z",
	"10.1186/s12916-025-03883-9": "2026-09-13T02:27:34.753Z"
};
const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "Mortality in relation to smoking: 50 years’ observations on male British doctors",
		publisher: "BMJ",
		year: 2004,
		url: "https://gas.ndph.ox.ac.uk/deathsfromsmoking/download%20files/Original%20research/Mortality%20in%20relation%20to%20smoking%2050%20years%20observations%20on%20male%20British%20doctors.pdf",
		doi: "10.1136/bmj.38142.554479.AE",
		stance: "supports",
		order: 3,
		note: "Original author-institution PDF: selected design, follow-up, results, applicability and disclosures assessed; Table 6 visually checked. Full figures, every table and independent reanalysis not appraised."
	},
	{
		kind: "landmark_study",
		title: "Relationship of tobacco smoking to cause-specific mortality: contemporary estimates from Australia",
		publisher: "BMC Medicine",
		year: 2025,
		url: "https://link.springer.com/article/10.1186/s12916-025-03883-9",
		doi: "10.1186/s12916-025-03883-9",
		pmid: "39994694",
		stance: "supports",
		order: 4,
		note: "Selected original methods, results, discussion and disclosures assessed. Full supplements, figures and independent reanalysis not appraised. Publication in 2025 does not mean follow-up reached 2025."
	},
	{
		kind: "guideline",
		title: "Harms of Cigarette Smoking and Health Benefits of Quitting",
		publisher: "National Cancer Institute",
		year: 2017,
		url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/tobacco/cessation-fact-sheet",
		stance: "supports",
		order: 5,
		note: "Selected original smoking-risk and cessation sections read. Page displays December 19, 2017 as its review date; revisiting it is not a new evidence review or an independent cohort."
	}
];

export function refreshSmokingClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "historical-case-studies" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "75346512-7113-46a6-a922-1e6467aa622b",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added historical and contemporary cohort evidence, explained how causal inference developed, and separated lung-cancer mortality, overall lifespan, relative risk and the benefits of quitting."
	};
	return {
		...seed,
		bottomLine: "Yes. Cigarette smoking causes lung cancer. The conclusion rests on converging evidence across study designs and populations, not just one association or an institutional vote. Smoking does not cause every lung cancer, and not every person who smokes develops it. Stopping smoking reduces risk over time without immediately erasing past exposure.",
		stableCore: [
			"Early comparisons of patients with and without lung cancer were followed by prospective studies tracking smoking before later deaths.",
			"A causal risk factor changes the probability of disease; it need not be present in every case or produce disease in every exposed person.",
			"Duration, intensity, age and time since quitting affect risk. One study's relative estimate is not everyone's absolute probability.",
			"Quitting is beneficial, including later in life. Its benefits extend beyond lung cancer, so lifespan findings should not be presented as lung-cancer-only effects."
		],
		openQuestions: [
			"How do absolute risks and their decline after quitting vary across populations and exposure histories?",
			"How can studies better address changing smoking habits, disease-related quitting and competing causes of death?",
			"Which communication approaches explain strong causal evidence without suggesting inevitable disease or blaming patients?"
		],
		whatWouldChangeMinds: [
			"A reproducible alternative explanation accounting for the full pattern across independent populations, temporal relationships, exposure gradients and cessation evidence better than a causal smoking effect.",
			"Better contemporary evidence can revise the size and distribution of risk without reopening the established basic causal relationship."
		],
		misconceptions: [
			"A long-lived person who smoked does not refute a population-level increase in risk, and lung cancer in a never-smoker does not make smoking harmless.",
			"No single observational association proves causality, but that does not mean causal knowledge requires assigning people to smoke in a randomized trial.",
			"An elevated relative hazard is not the percentage of participants who developed cancer, nor proof of the cause of any particular person's cancer.",
			"Illness can prompt quitting. A short-term association between recent cessation and poor health must not automatically be interpreted as harm caused by quitting."
		],
		editorSummary: "The earlier review mainly described a historical controversy. This revision shows what studies actually measured and how evidence accumulated, while retaining the established conclusion. It distinguishes statistical associations, causal synthesis, population estimates and individual outcomes without experimental procedures or personalized risk calculations.",
		uncertaintySummary: "High overall certainty describes the established causal conclusion as an editorial synthesis, not a new formal grading exercise. Individual summaries remain unrated. Exact risks vary and the source-control agreement label is not a measured expert survey; uncertainty about a particular estimate is not equivalent to uncertainty over whether cigarette smoking causes lung cancer.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "Historical male doctors and older Australian volunteers do not represent every age, country or smoking pattern." },
			{ type: "bias", detail: "Recall, selection, exposure changes and disease-related quitting can affect individual observational estimates." },
			{ type: "timing", detail: "Cancer latency and persistent risk after cessation make short follow-up and immediate-risk interpretations misleading." }
		],
		evidenceCertainty: "high",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-13T02:27:34.753Z",
		searchDatabases: [
			"Targeted original historical papers, cohorts and public-health guidance; not an exhaustive systematic search",
			"Consensus discovery followed by fetched records and original-source verification",
			"Crossref and Europe PMC publication-notice metadata"
		],
		inclusionRules: [
			"Identify study design, population, follow-up, comparison and whether the outcome is cancer incidence, mortality or overall lifespan.",
			"Distinguish the convergence supporting causality from the limitations of each contributing estimate."
		],
		exclusionRules: [
			"Do not treat a case-only cancer sample as a prospective study of population cancer incidence.",
			"Do not convert relative hazards into individual probabilities or attribute every poor outcome after quitting to cessation."
		],
		appraisalTools: ["Narrative assessment of causal inference, selection, temporality, outcome definitions and access; no independent formal risk-of-bias grading"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Doll 1950 acknowledges Medical Research Council assistance, without a modern conflicts statement. Doll 2004 reports MRC, British Heart Foundation and Cancer Research UK support and no competing interests. Joshy reports public/charitable support and disclosures involving unrelated screening programs with industry contributions or equipment donations; no blanket absence of conflicts is inferred. These statements are not an independent audit.",
		independenceSummary: "Later reports from the British doctors cohort are repeated follow-up of one cohort, not separate replications. The Australian cohort supplies a different population; NCI guidance and the 1964 report synthesize research rather than adding independent participants. Six successful metadata responses found no registered updates for three DOIs, which does not establish scientific validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What did the early patient comparison establish?",
				population: "Doll and Hill 1950: 649 men and 60 women with lung cancer in London hospitals",
				finding: "Smoking, particularly heavier cigarette use, was more common among cases than among controls matched by sex, age and hospital. The authors examined selection and reporting explanations; this was an early case-control signal, not a prospective experiment.",
				effectDirection: "supports",
				magnitude: "A historical association, not a modern absolute-risk estimate.",
				limitations: ["Hospital controls, retrospective histories and interviews can introduce bias. The authors described their extrapolated population incidence estimates as speculative; those estimates are not adopted here."]
			},
			{
				question: "Why was the 1964 conclusion more than a vote?",
				population: "U.S. Surgeon General advisory committee's historical synthesis",
				finding: "The report evaluated consistency, strength, temporal relationships and coherence across evidence. It concluded that cigarette smoking caused lung cancer in men and described the then smaller evidence base for women as pointing in the same direction.",
				effectDirection: "supports",
				magnitude: "A causal synthesis, not a new randomized comparison.",
				limitations: ["This is a historical assessment. Its population-specific estimates and the amount of evidence then available should not be presented as a current summary of risk in women."]
			},
			{
				question: "What did fifty years of prospective follow-up add?",
				population: "Doll 2004: 34,439 male British doctors followed from 1951 to 2001",
				finding: "Persistent cigarette smokers born in 1900–1930 died about ten years younger on average than lifelong non-smokers. Lung-cancer mortality was also elevated, with lower ratios in groups who stopped earlier. The lifespan difference includes causes other than lung cancer.",
				effectDirection: "supports",
				magnitude: "Overall lifespan and cause-specific mortality are separate outcomes.",
				limitations: ["The lung-cancer table uses expected rates from U.S. male non-smokers, not simply equal-follow-up raw counts. Historical male professionals and observational cessation groups do not provide a guaranteed individual life-expectancy gain."]
			},
			{
				question: "Does a more recent population still show a large association?",
				population: "Joshy 2025: 178,169 Australian adults aged 45 or older, initially free of cancer and cardiovascular disease",
				finding: "Current versus never smoking was associated with a lung-cancer mortality hazard ratio of 17.85 (95% confidence interval 14.38–22.17). This compares mortality rates during follow-up, not the percentage who developed cancer.",
				effectDirection: "supports",
				magnitude: "Median follow-up 9.3 years, ending in November 2017.",
				limitations: ["Selected volunteers, self-reported exposure and disease-related quitting constrain estimates. Excluding baseline illness reduces but cannot eliminate bias; the estimate is not automatically transferable to other populations."]
			},
			{
				question: "Does risk immediately disappear after quitting?",
				population: "NCI public-health guidance, with the historical cohort's cessation comparisons",
				finding: "Quitting lowers the risk of developing and dying from smoking-related cancer. Earlier cessation generally brings greater benefit, but later cessation also helps; past exposure is not immediately undone.",
				effectDirection: "supports",
				magnitude: "A population-level benefit, not a personal risk forecast or a promise of no future cancer.",
				limitations: ["NCI's page is dated 2017. Its underlying studies were not all independently reappraised here, and this review does not compare cessation medicines or screening eligibility."]
			}
		],
		surveillanceSpec: {
			focus: "Smoking-related lung-cancer risk, causal interpretation and cessation trajectories",
			cadenceDays: 180,
			watchTerms: ["smoking lung cancer prospective cohort mortality", "smoking cessation lung cancer absolute risk", "smoking cohort reverse causation correction"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["NCI and Surgeon General evidence assessments"],
			triggerRules: ["Review material new population estimates, replicated causal challenges or corrections while keeping coverage explanatory and non-operational."]
		},
		sources: [
			...seed.sources.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : source.citationCheckedAt,
				note: source.doi
					? "Original scans: selected methods and summary visually assessed on pages 740 and 747; acknowledgments checked separately. Not every table, figure or underlying record appraised."
					: "Original causality framework on printed page 20 and conclusions on page 31 assessed; page 31 visually checked. Historical assessment, not a fresh review of every underlying study."
			})),
			...additions.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				citationStatus: "current",
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : undefined
			}))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
