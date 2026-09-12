import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-12T01:50:43.000Z";
const nets = "do-insecticide-treated-bed-nets-reduce-malaria-in-endemic-regions";
export const mosquitoSlugs = {
	duration: "does-a-higher-repellent-concentration-mean-proportionally-better-mosquito-protection",
	oil: "is-lemon-eucalyptus-essential-oil-equivalent-to-a-registered-ole-or-pmd-repellent",
	wristbands: "do-repellent-wristbands-protect-as-well-as-skin-applied-mosquito-repellents",
	methods: "do-laboratory-mosquito-repellent-protection-times-predict-everyday-protection",
	spatial: "do-spatial-emanators-prevent-malaria-and-can-they-replace-bed-nets"
};
export const mosquitoPracticalGaps = [
	{ slug: mosquitoSlugs.duration, gap: "Separates active-ingredient concentration, formulation and duration from percentage bite prevention; existing bed-net evidence concerns a different intervention.", relatedExistingSlugs: [nets] },
	{ slug: mosquitoSlugs.oil, gap: "Examines the unsupported substitution of essential oil for a tested repellent formulation, not another general botanical-versus-synthetic verdict.", relatedExistingSlugs: [nets] },
	{ slug: mosquitoSlugs.wristbands, gap: "Tests whether delivery on a bracelet establishes protection away from the wrist; this is distinct from treated bed nets and spatial insecticide products.", relatedExistingSlugs: [nets] },
	{ slug: mosquitoSlugs.methods, gap: "Explains first-landing endpoints, exposure pressure and observation limits when translating repellent studies, absent from the established bed-net review.", relatedExistingSlugs: [nets] },
	{ slug: mosquitoSlugs.spatial, gap: "Adds the newer supplementary indoor spatial-emanator recommendation, its infection evidence and coverage limits, without recounting bed-net effectiveness as new content.", relatedExistingSlugs: [nets] }
];

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return { appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: checkedAt, statusSources: [entry.url!], ...entry };
}
export const mosquitoSources = {
	yellowBook: source({ kind: "guideline", title: "Mosquitoes, Ticks, and Other Arthropods: CDC Yellow Book, 2026 edition", publisher: "Centers for Disease Control and Prevention", year: 2025, url: "https://www.cdc.gov/yellow-book/hcp/environmental-hazards-risks/mosquitoes-ticks-and-other-arthropods.html", stance: "supports", isAnchor: true, order: 1, note: "April 23, 2025 chapter checked for efficacy, formulation, duration, wristbands, fabric treatment and label precautions. Later WHO indoor-malaria guidance qualifies its older spatial-disease wording. The child section contains a product-specific OLE exception; no blanket age rule is inferred. No formal appraisal." }),
	epaUse: source({ kind: "guideline", title: "Using Insect Repellents Safely and Effectively", publisher: "US Environmental Protection Agency", url: "https://www.epa.gov/insect-repellents/using-insect-repellents-safely-and-effectively", stance: "supports", order: 2, note: "Official safe-use and child-label sections checked. Some OLE-only products at concentrations of 30% or less have labels permitting use below age three; this is not permission for every OLE/PMD product or pure essential oil. Product-specific instructions remain necessary." }),
	deet: source({ kind: "guideline", title: "DEET", publisher: "US Environmental Protection Agency", url: "https://www.epa.gov/insect-repellents/deet", stance: "supports", order: 2, note: "Primary regulatory explanation checked for formulation-dependent protection duration and labeled use. Historical disease counts, market counts and registration-review milestones are not presented as current surveillance or a new 2026 safety assessment." }),
	clothing: source({ kind: "guideline", title: "Repellent-Treated Clothing", publisher: "US Environmental Protection Agency", url: "https://www.epa.gov/insect-repellents/repellent-treated-clothing", stance: "supports", order: 2, note: "Primary page checked for covered-skin limits, efficacy requirements, washing and labels. Its historical review timetable is not treated as current review status. Manufacturer-submitted registration studies were not individually reappraised." }),
	methods: source({ kind: "landmark_study", title: "Evaluation of standard field and laboratory methods to compare protection times of the topical repellents PMD and DEET", publisher: "Scientific Reports", year: 2018, doi: "10.1038/s41598-018-30998-2", url: "https://www.nature.com/articles/s41598-018-30998-2", stance: "supports", order: 2, note: "Publisher PDF methods, results, limitations and disclosures checked; Figure 4 visually inspected. The abstract reverses two PMD species medians relative to the results and figure, so that numeric series is withheld. No linked correction was found in the targeted check; this does not resolve the discrepancy. No formal appraisal or reanalysis. Field observation ended at six hours." }),
	wearables: source({ kind: "landmark_study", title: "Efficacy of Some Wearable Devices Compared with Spray-On Insect Repellents for the Yellow Fever Mosquito, Aedes aegypti (L.) (Diptera: Culicidae)", publisher: "Journal of Insect Science", year: 2017, doi: "10.1093/jisesa/iew117", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5388317/", stance: "supports", order: 2, note: "Primary full-text methods, tables, results and discussion checked. Two selected volunteers, four replicates per treatment/time point; 15-minute attraction assay, not an infection or duration trial. Product-label hours in Table 1 are not measured protection times. No numerical brand ranking is reproduced; supplements not reanalyzed." }),
	who: source({ kind: "guideline", title: "WHO guidelines for malaria, 10 September 2026: spatial emanators", publisher: "World Health Organization", year: 2026, url: "https://www.who.int/publications-detail-redirect/guidelines-for-malaria", stance: "supports", isAnchor: true, order: 1, note: "Current 494-page PDF checked: 2025 recommendation retained on p. 86, evidence-to-decision pp. 87–92 and evidence tables pp. 346–348. Recommendation and table visually checked. WHO's source-specific certainty ratings are reported, not a new appraisal. Overall and coverage-subgroup estimates differ; the 80% split is not a demonstrated efficacy threshold. Underlying trials and unpublished review not independently reappraised." })
};

const common = {
	topicSlug: "health-and-medicine",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	// Legacy editorial value, not a measured expert-agreement percentage.
	confidenceScore: 75,
	searchDatabases: ["Consensus.app targeted discovery", "CDC and EPA primary guidance", "WHO September 2026 malaria guideline", "Publisher PDF and PubMed Central full text"],
	searchCutoffAt: checkedAt,
	inclusionRules: ["Keep the tested formulation, mosquito species, setting, endpoint and exposure duration attached to each finding.", "Check current guidance directly and distinguish measured infection outcomes from attraction or landing endpoints."],
	exclusionRules: ["No universal brand ranking, personal travel prophylaxis, pesticide-mixing recipe or inferred consensus percentage.", "Do not promote label duration, laboratory repellency or an ingredient name into a guaranteed reduction in human disease."],
	appraisalTools: ["Targeted source and applicability checks; no formal risk-of-bias appraisal completed"],
	institutionalAnchors: [{ name: "CDC, EPA and WHO", role: "Public-health and regulatory guidance with different populations and purposes; not independent trial replications" }],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	coiSummary: "Institutional guidance is not a site product endorsement. Some regulatory conclusions use manufacturer-submitted evidence, which was not individually appraised here.",
	independenceSummary: "Guidance can cite overlapping studies. Source counts do not establish independent replication or measure expert agreement.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;

function publication(id: string, summary: string, focus: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: { focus, cadenceDays: 180, watchTerms: [focus], integrityMonitors: ["Corrections to cited repellent studies"], guidelineMonitors: ["CDC Yellow Book", "EPA repellent guidance", "WHO malaria living guideline"], triggerRules: ["Reassess on revised institutional guidance, replicated relevant field evidence or a source correction."] }
	};
}

export const mosquitoPracticalClaims: SeedClaim[] = [
	{
		...common,
		title: "Does a higher repellent concentration mean proportionally better mosquito protection?",
		slug: mosquitoSlugs.duration,
		bottomLine: "No. A higher concentration often extends protection time, but it is not a proportional increase in the percentage of bites prevented. Formulation, mosquito species and use conditions matter. The concentration on a bottle is not a universal protection score or a reason to exceed its label instructions.",
		stableCore: ["Concentration describes how much active ingredient is in the product; duration describes how long a defined protective effect lasts.", "CDC describes diminishing gains in mosquito protection time above roughly 50% DEET. This is not a universal threshold for other ingredients or a personal dose recommendation.", "Controlled-release formulations can alter duration, so two products with the same concentration need not perform identically.", "Sweat, water, rubbing and exposure conditions can change practical protection even when the printed concentration is unchanged."],
		openQuestions: ["How do comparable formulations perform under the actual activity, mosquito pressure and weather of interest?", "Which label and usability features help people maintain protection during prolonged exposure?"],
		whatWouldChangeMinds: ["Replicated field comparisons could refine duration expectations for particular formulations.", "Updated product testing or regulatory guidance could change a specific use claim without establishing a universal concentration-to-benefit rule."],
		misconceptions: ["20% active ingredient does not mean 20% of bites are prevented.", "Doubling concentration does not automatically double protection time.", "The highest concentration is not automatically the best choice for every exposure.", "Frequent reapplication cannot be inferred from a generic duration table; the product label limits use."],
		misconceptionTags: ["mosquito repellent strength", "DEET concentration", "protection duration", "picaridin", "IR3535"],
		editorSummary: "Read the label as a description of a particular tested formulation. Ask whether its labeled use fits the exposure, rather than comparing ingredient percentages as if they were clinical success rates. A broad ingredient category contains products with different delivery and persistence.",
		uncertaintySummary: "The distinction between concentration and duration is clear. Precise duration outside test conditions is less certain and cannot be calculated from concentration alone. This targeted review did not reappraise every registration study or identify a universal optimal concentration.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Application, water exposure and abrasion alter the amount of repellent remaining during use." }, { type: "generalizability", detail: "Duration for one formulation and mosquito species does not establish duration for another." }],
		evidenceSummaries: [{ question: "What does increasing concentration establish?", population: "Skin-applied repellent formulations used within their labels", finding: "CDC and EPA describe protection duration as product dependent. Higher concentration can prolong it, with diminishing gains for DEET at higher concentrations; formulation and conditions also matter.", effectDirection: "supports", magnitude: "No proportional bite-prevention percentage or personalized number of protected hours.", certainty: "moderate", limitations: ["Institutional guidance rather than a new pooled formulation comparison", "Different endpoints and environments limit transfer", "Label conditions remain necessary"] }],
		...publication("61c70e04-4292-4790-a14b-57d7e58c54e2", "New review: repellent concentration is not a proportional protection score.", "Repellent concentration, formulation and duration"),
		sources: [mosquitoSources.yellowBook, mosquitoSources.deet]
	},
	{
		...common,
		title: "Is lemon-eucalyptus essential oil equivalent to a registered OLE or PMD repellent?",
		slug: mosquitoSlugs.oil,
		bottomLine: "No. A registered oil-of-lemon-eucalyptus (OLE) or PMD repellent is a specified formulation with evaluated uses. A bottle of lemon-eucalyptus essential oil is not interchangeable with it. Plant origin alone establishes neither reliable mosquito protection nor comparative safety.",
		stableCore: ["An ingredient's origin and a finished formulation's evidence are separate questions.", "CDC explicitly distinguishes registered OLE/PMD products from unformulated essential oil, whose repellent safety and efficacy have not undergone the same validated testing.", "Age instructions are product specific. EPA notes exceptions for certain OLE-only formulations at 30% or less; that is not permission to use every OLE, PMD or essential-oil product on a young child."],
		openQuestions: ["Which formulations retain protection under heat, sweat and repeated water exposure?", "Can improved formulations deliver sustained protection with acceptable skin tolerability across relevant populations?"],
		whatWouldChangeMinds: ["Validated safety and efficacy studies plus an appropriate product authorization could establish a use for a new formulation.", "A safety signal or label revision could narrow an existing product's appropriate use."],
		misconceptions: ["A similar botanical name does not establish the same composition, concentration or formulation.", "Natural does not mean irritation-free, and synthetic does not mean ineffective or unsuitable.", "A successful PMD laboratory result does not validate a homemade essential-oil mixture.", "A product-specific child-label exception is not a general age recommendation."],
		misconceptionTags: ["lemon eucalyptus", "OLE", "PMD", "essential oil mosquito repellent", "natural repellent"],
		editorSummary: "Follow the evidence for the finished product. Botanical branding can obscure the difference between a tested repellent and an aromatic oil. The useful comparison asks what was evaluated, for which use, and with what restrictions, rather than treating all plant-derived products as one intervention.",
		uncertaintySummary: "The products are not interchangeable. The best duration and tolerability for a particular exposure remain formulation dependent. This review does not compare every OLE/PMD product or provide a child's personal repellent selection.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Composition, vehicle and labeled application influence both protection and exposure." }],
		evidenceSummaries: [{ question: "Can evidence for a registered repellent be transferred to essential oil?", population: "OLE/PMD repellent formulations versus unformulated lemon-eucalyptus essential oil", finding: "CDC does not recommend substituting pure essential oil for evaluated repellents. EPA's product-specific instructions, including limited OLE-only age exceptions, show why the finished label matters.", effectDirection: "supports", magnitude: "An evidence and formulation boundary, not a numerical synthetic-versus-natural ranking.", certainty: "high", limitations: ["No testing of homemade mixtures", "Registration and labels differ between jurisdictions", "No blanket pediatric advice"] }],
		...publication("bbcb9622-fc4d-4651-a84b-377d985740b9", "New review: registered OLE/PMD repellents are not interchangeable with essential oil.", "OLE and PMD formulation versus essential oil"),
		sources: [mosquitoSources.yellowBook, mosquitoSources.epaUse]
	},
	{
		...common,
		title: "Do repellent wristbands protect as well as skin-applied mosquito repellents?",
		slug: mosquitoSlugs.wristbands,
		bottomLine: "Evidence does not support repellent-impregnated wristbands as substitutes for effective skin-applied repellents. Wearing a repellent ingredient around the wrist does not establish protection of exposed skin elsewhere. A bracelet is also different from a tested device that releases a spatial insecticide.",
		stableCore: ["An active ingredient's presence does not establish an effective delivery rate or protective area.", "A 2017 wind-tunnel study found no significant reduction in attraction with its three tested bracelets; a metofluthrin-releasing wearable did reduce attraction.", "That experiment measured mosquito movement toward two selected human volunteers during short tests, not infection prevention or hours of bite-free outdoor use."],
		openQuestions: ["Could a newly engineered wearable demonstrate sustained protection in independent realistic field tests?", "How do wind, movement and distance change the performance of a particular spatial device?"],
		whatWouldChangeMinds: ["Replicated, adequately powered field trials of a specified wristband showing meaningful protection across exposed areas and its advertised duration.", "Reliable disease-endpoint trials would be needed before claiming that a delivery device reduces infections in a particular population."],
		misconceptions: ["Smelling an ingredient does not prove a protective zone around the body.", "A device remaining active or fragrant for days does not establish days of bite prevention.", "Evidence against the tested bracelets is not evidence that every vapor-releasing insecticide device is ineffective.", "A lack of statistical significance in one small experiment is not a precise estimate of zero effect in every possible setting."],
		misconceptionTags: ["mosquito wristband", "repellent bracelet", "wearable repellent", "sonic device"],
		editorSummary: "Evaluate the delivery method, not just the ingredient printed on the package. The relevant question is whether the product protects people under realistic exposure. CDC's guidance and the experimental evidence provide no basis for replacing an effective skin repellent with an impregnated wristband.",
		uncertaintySummary: "The practical conclusion against relying on ordinary repellent wristbands is consistent across guidance and the cited experiment. The experiment used one mosquito species and selected volunteers; it does not establish a universal numerical effect or test every future wearable design.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Short wind-tunnel attraction assays are narrower than everyday bite and disease outcomes." }],
		evidenceSummaries: [{ question: "What was actually tested?", population: "Two selected volunteers and Aedes aegypti in a wind tunnel; four replicates per treatment/time point", finding: "Rodriguez et al. found that the tested bracelets did not significantly reduce attraction, whereas a metofluthrin wearable and tested spray formulations did. The endpoint was movement toward a person during a 15-minute assay.", effectDirection: "supports", magnitude: "Qualitative intervention-specific finding; no brand percentages or advertised duration adopted.", certainty: "moderate", limitations: ["Two selected volunteers are not a representative population", "One mosquito species and controlled airflow", "No direct human infection outcome or full-duration field test"] }],
		coiSummary: "The study reports purchasing products online or locally and acknowledges construction assistance. No explicit funding or competing-interest statement was located in the primary text examined; absence of a statement is not proof of independence.",
		...publication("c0ed8245-a242-4a85-b24a-9a9bb2d0f47c", "New review: wristbands, skin repellents and spatial devices require different evidence.", "Repellent wristbands and wearable delivery"),
		sources: [mosquitoSources.yellowBook, mosquitoSources.wearables]
	},
	{
		...common,
		title: "Do laboratory mosquito-repellent protection times predict everyday protection?",
		slug: mosquitoSlugs.methods,
		bottomLine: "Not exactly. Protection time depends on the study's endpoint, mosquito pressure and conditions. A laboratory first-landing time, a field reduction in landings and prevention of human infection are different outcomes. A long observed interval is not an unconditional promise for everyday use.",
		stableCore: ["The definition of failure matters: a mosquito approaching, landing or biting can produce different protection-time measures.", "Colucci and Müller compared the same 15% PMD and 15% DEET solutions across laboratory and Swiss field settings. Seventeen participants were analyzed; the setting substantially changed measured protection time.", "Their field observation ended at six hours. A median reported as at least six hours is limited by that observation window, not an exact six-hour lifespan or evidence of indefinite protection.", "Low field landing pressure was an important limitation; a quiet test site cannot establish performance under intense exposure."],
		openQuestions: ["Which standardized exposure conditions best predict protection during everyday activities?", "How much do individual attractiveness, mosquito species and application differences contribute to variability?"],
		whatWouldChangeMinds: ["Larger replicated studies that connect standardized tests to prespecified real-world bite outcomes across mosquito pressures.", "Validated models could improve prediction if they preserve formulation, setting and uncertainty rather than assign one duration to every use."],
		misconceptions: ["At least six observed hours is not exactly six effective hours.", "Shorter time under intense laboratory challenge does not necessarily mean a product suddenly becomes useless outdoors.", "Reduced landings are not a measured percentage reduction in infection risk.", "A study's internal numeric discrepancy should be disclosed, not silently repaired or copied into a comparison chart."],
		misconceptionTags: ["complete protection time", "arm in cage", "repellent laboratory field", "mosquito landing pressure"],
		editorSummary: "Before comparing hours, identify what counted as failure and how often mosquitoes challenged the protected area. The same formulation can yield different results under different protocols. The primary methods study is useful for that distinction, but its internally inconsistent species-specific PMD numbers are not reproduced here.",
		uncertaintySummary: "The need to preserve endpoint and exposure conditions is clear. This small methods comparison does not produce a universal correction factor from laboratory to everyday use. Its abstract reverses two species medians relative to the results and figure; the disputed numeric series is withheld.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "The Swiss field sites had unusually low landing pressure and cannot represent all exposure settings." }, { type: "other", detail: "An unresolved abstract/results discrepancy limits use of the species-specific PMD medians." }],
		evidenceSummaries: [{ question: "What does a within-participant methods comparison establish?", population: "17 analyzed volunteers; matched 15% solutions tested in arm-in-cage and two Swiss field settings", finding: "The study measured time to first landing and found markedly different laboratory and field protection times. It identified landing pressure as a key interpretive issue; field medians reached the six-hour observation limit.", effectDirection: "supports", magnitude: "A setting-dependent measurement result, not a personal protection-hour estimate.", certainty: "moderate", limitations: ["18 enrolled, 17 analyzed; two missing field measurements", "Low field landing rates and a bounded observation window", "Disputed species-specific PMD numbers withheld", "No human infection endpoint or independent reanalysis"] }],
		coiSummary: "The Swiss Federal Office of Public Health funded the study. Vifor supplied formulations; the authors declared no competing interests. Product supply is disclosed separately from the authors' declaration.",
		...publication("736e67a5-1e0b-4408-bdc0-1bf1ea5dca41", "New review: interpret repellent protection times by endpoint and exposure conditions.", "Laboratory versus field repellent protection time"),
		sources: [{ ...mosquitoSources.methods, order: 1 }, { ...mosquitoSources.yellowBook, order: 2 }]
	},
	{
		...common,
		title: "Do spatial emanators prevent malaria, and can they replace bed nets?",
		slug: mosquitoSlugs.spatial,
		bottomLine: "Certain indoor spatial emanators can be added to malaria-control programs, but they are not established replacements for insecticide-treated nets or indoor residual spraying. WHO's conditional recommendation depends on sustained coverage and appropriate products. It does not validate every outdoor gadget or promise individual freedom from malaria.",
		stableCore: ["WHO's September 2026 guideline retains the 2025 conditional recommendation for supplementary indoor use in areas with ongoing malaria transmission.", "The overall four-trial malaria-infection rate ratio was 0.77 (95% CI 0.56–1.05), rated low certainty. The two-trial subgroup with at least 80% household coverage had a rate ratio of 0.67 (0.56–0.81), rated high certainty by WHO.", "The 80% split was chosen in advance to characterize coverage, not established as a biological threshold or a guarantee that protection starts at exactly 80%.", "The outcome is infection incidence over person-time, not the proportion of all people permanently protected, an expert-agreement percentage or proof of reduced mortality."],
		openQuestions: ["How do replacement schedules, local vectors, resistance, coverage and cost affect sustained program benefit?", "Which outdoor or mobile uses are effective, and what are the longer-term health and environmental trade-offs?"],
		whatWouldChangeMinds: ["Direct comparative trials and program evidence could establish whether replacing a core intervention preserves benefits, rather than merely adding another tool.", "More precise severe-disease and mortality data, or new safety findings, could change the benefit-harm assessment."],
		misconceptions: ["A conditional recommendation is not a universal recommendation for every product and setting.", "The strongest subgroup estimate cannot replace the less certain overall estimate without explanation.", "A relative rate reduction is not the percentage of people protected and cannot be compared directly with a laboratory landing percentage.", "A wristband or sonic gadget does not inherit evidence from an insecticide-emitting indoor product."],
		misconceptionTags: ["spatial emanator", "spatial repellent malaria", "mosquito coils", "bed nets", "indoor malaria prevention"],
		editorSummary: "The evidence has advanced beyond a blanket statement that spatial products lack disease-endpoint evidence. The useful update is narrower: specified indoor products can supplement established malaria prevention. Sustaining existing nets or spraying, selecting appropriate products and maintaining coverage remain part of the recommendation.",
		uncertaintySummary: "WHO rates the overall recommendation moderate certainty, while individual outcomes and subgroups have different ratings. The overall infection interval includes no effect; high-coverage findings support conditional use. Underlying trials and the unpublished review were not independently reappraised here, and replacement, outdoor and mortality claims remain unsupported by this summary.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Continuous household coverage and product replacement determine sustained exposure to the intervention." }, { type: "generalizability", detail: "Indoor endemic-setting trials do not establish protection for every traveler, outdoor space or insecticide device." }],
		evidenceSummaries: [{ question: "What supports supplementary use?", population: "Indoor malaria-prevention trials summarized by WHO; overall 7,002 participants in four trials, high-coverage subgroup 2,878 in two trials", finding: "The overall rate ratio was 0.77 (95% CI 0.56–1.05); the at-least-80%-coverage subgroup was 0.67 (0.56–0.81). These are source-reported infection incidence ratios, not a newly pooled analysis or a randomized test of the coverage threshold.", effectDirection: "supports", magnitude: "Different estimates and certainty ratings must remain attached to their populations; no universal absolute benefit calculated.", certainty: "moderate", limitations: ["Overall low certainty; high-coverage subgroup rated high by WHO", "Only indoor use covered by this recommendation", "Severe disease and death estimates remain imprecise", "No basis to replace core interventions from an add-on recommendation"] }],
		...publication("178a33fa-1aa9-4e76-b947-6c77b9d12723", "New review: current WHO evidence for supplementary indoor spatial emanators and its limits.", "Spatial emanators as supplementary malaria prevention"),
		sources: [mosquitoSources.who, { ...mosquitoSources.yellowBook, stance: "context", isAnchor: false, order: 2, note: "April 2025 traveler chapter supplies context and general precautions. Its older statement about inadequate spatial-disease evaluation must not override WHO's later indoor-malaria recommendation. These sources address different settings and dates." }]
	}
];
