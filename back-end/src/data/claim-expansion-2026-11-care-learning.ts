import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberCareLearningResearchCheckedAt = "2026-11-07T07:36:54.307Z";

const sources = {
	cognitiveStimulationCochrane: researchSource("Cognitive stimulation to improve cognitive functioning in people with dementia", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.cd005562.pub3", "10.1002/14651858.cd005562.pub3", "2023 Cochrane review of 37 trials and 2,766 participants found small short-term cognitive benefits. Longer-term evidence was sparse. Structured cognitive stimulation differs from isolated brain-training drills or dementia prevention.", "systematic_review", "supports", novemberCareLearningResearchCheckedAt),
	cognitiveStimulationProtocol: researchSource("Effectiveness of Cognitive Stimulation Therapy (CST) for mild to moderate dementia: A systematic literature review and meta-analysis of randomised control trials using the original CST protocol", "Ageing Research Reviews", 2024, "https://doi.org/10.1016/j.arr.2024.102312", "10.1016/j.arr.2024.102312", "2024 review of 12 trials using the original structured CST program found benefits in cognition and related outcomes. Trials overlap broader syntheses; separate review publications are not independent patient groups.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	mindTrial: researchSource("Trial of the MIND Diet for Prevention of Cognitive Decline in Older Persons", "New England Journal of Medicine", 2023, "https://doi.org/10.1056/nejmoa2302368", "10.1056/nejmoa2302368", "Three-year randomized trial of 604 older adults. Both groups received calorie-restriction and weight-loss support; the MIND arm did not significantly outperform control on cognition or brain imaging. This does not establish that either diet has no health value.", "landmark_study", "debate", novemberCareLearningResearchCheckedAt),
	mindAgingReview: researchSource("The Mediterranean-Dietary Approaches to Stop Hypertension Intervention for Neurodegenerative Delay (MIND) Diet for the Aging Brain: A Systematic Review", "Advances in Nutrition", 2024, "https://doi.org/10.1016/j.advnut.2024.100184", "10.1016/j.advnut.2024.100184", "2024 review of 40 articles representing 32 unique cohorts. Dementia and global-cognition associations were often favorable, while longitudinal decline findings were less consistent. Multiple articles from one cohort are not independent replications.", "systematic_review", "supports", novemberCareLearningResearchCheckedAt),
	mindRecentReview: researchSource("The association between the MIND diet and cognitive health in middle-aged and older adults: A systematic review", "The Journal of nutrition, health and aging", 2025, "https://doi.org/10.1016/j.jnha.2025.100630", "10.1016/j.jnha.2025.100630", "2025 review of 39 articles across 14 countries, mostly observational. Favorable associations coexist with mixed randomized evidence and varying diet scores. Higher adherence in an observational study does not prove a diet intervention prevents dementia.", "systematic_review", "context", novemberCareLearningResearchCheckedAt),
	scalpEfficacyMeta: researchSource("The scalp cooling therapy for hair loss in breast cancer patients undergoing chemotherapy: a systematic review and meta-analysis", "Supportive Care in Cancer", 2021, "https://doi.org/10.1007/s00520-021-06188-8", "10.1007/s00520-021-06188-8", "2021 synthesis of 27 studies: three randomized trials, 12 cohorts and 12 cross-sectional studies. Hair preservation varied greatly across treatments and study designs; the pooled preservation proportion is not a universal treatment success rate.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	scalpPersistentTrial: researchSource("Scalp Cooling in Preventing Persistent Chemotherapy-Induced Alopecia: A Randomized Controlled Trial", "Journal of Clinical Oncology", 2024, "https://doi.org/10.1200/jco.23.02374", "10.1200/jco.23.02374", "2024 open-label breast-cancer trial found less persistent alopecia at six months among assessed participants. Hair thickness improved more clearly than density; the reported follow-up denominators were 89 and 50, not necessarily every randomized participant.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt),
	scalpSafetyMeta: researchSource("Adverse effects of scalp cooling for the reduction of chemotherapy-induced alopecia: A systematic review and meta-analysis", "Breast Cancer Research and Treatment", 2026, "https://doi.org/10.1007/s10549-025-07858-5", "10.1007/s10549-025-07858-5", "2026 print issue, first online in 2025. Review of 67 studies documents chills, headache, discomfort and discontinuation. Rare reported scalp metastases do not establish zero long-term risk or prove a causal device effect.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	cancerCannabisCochrane: researchSource("Cannabis-based medicines and medical cannabis for adults with cancer pain", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.CD014915.pub2", "10.1002/14651858.CD014915.pub2", "Completed 2023 Cochrane review, distinct from its 2022 protocol. The best-studied THC/CBD products did not provide useful added relief for opioid-refractory cancer pain. Findings vary by preparation and outcome; evidence on herbal cannabis was absent.", "systematic_review", "debate", novemberCareLearningResearchCheckedAt),
	cancerCannabisAsco: researchSource("Cannabis and Cannabinoids in Adults With Cancer: ASCO Guideline", "Journal of Clinical Oncology", 2024, "https://doi.org/10.1200/jco.23.02596", "10.1200/jco.23.02596", "2024 ASCO guideline based on 13 reviews and five additional primary studies. Potential benefit for refractory chemotherapy nausea is a separate question from pain; evidence for most supportive-care outcomes was low or very low certainty.", "guideline", "context", novemberCareLearningResearchCheckedAt),
	cancerCannabisMeta: researchSource("Cannabinoids for adult cancer-related pain: systematic review and meta-analysis", "BMJ Supportive & Palliative Care", 2020, "https://doi.org/10.1136/bmjspcare-2019-002032", "10.1136/bmjspcare-2019-002032", "2020 synthesis of six randomized trials, five in the pain meta-analysis. Added cannabinoids did not significantly reduce average cancer-pain scores, while drowsiness increased. Reviews share many underlying trials and should not be counted as independent patient groups.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	decisionCochrane: researchSource("Decision aids for people facing health treatment or screening decisions", "Cochrane Database of Systematic Reviews", 2024, "https://doi.org/10.1002/14651858.cd001431.pub6", "10.1002/14651858.cd001431.pub6", "2024 Cochrane update included 209 randomized studies and 107,698 participants across 71 decisions. Decision aids improved knowledge, risk understanding and informed value-based choices without increasing decision regret. These process benefits do not by themselves prove longer life.", "systematic_review", "supports", novemberCareLearningResearchCheckedAt),
	decisionCancer: researchSource("What Is the Effectiveness of Patient Decision Aids for Cancer-Related Decisions? A Systematic Review Subanalysis", "JCO Clinical Cancer Informatics", 2018, "https://doi.org/10.1200/cci.17.00148", "10.1200/cci.17.00148", "2018 cancer-focused subanalysis of 46 trials from the earlier Cochrane evidence base. Knowledge and decision-process measures improved. These trials overlap the later broad review rather than providing 46 additional independent studies.", "systematic_review", "context", novemberCareLearningResearchCheckedAt),
	lonelinessCommunity: researchSource("Interventions to Reduce Loneliness in Community-Living Older Adults: a Systematic Review and Meta-analysis", "Journal of General Internal Medicine", 2024, "https://doi.org/10.1007/s11606-023-08517-5", "10.1007/s11606-023-08517-5", "2024 review of 60 studies, including 36 randomized trials, in community-living older adults in higher-income settings. Group treatments and internet training had modest benefits; evidence for several other approaches was insufficient.", "systematic_review", "supports", novemberCareLearningResearchCheckedAt),
	lonelinessJama: researchSource("Interventions Associated With Reduced Loneliness and Social Isolation in Older Adults", "JAMA Network Open", 2022, "https://doi.org/10.1001/jamanetworkopen.2022.36676", "10.1001/jamanetworkopen.2022.36676", "2022 review of 70 studies, with 44 included in loneliness meta-analyses. Results differed between community and long-term care settings; apparently large effects came with high heterogeneity and very low overall evidence quality.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	lonelinessMechanism: researchSource("Systematic review and meta‐analysis of mechanistic loneliness interventions for older adults", "Annals of the New York Academy of Sciences", 2025, "https://doi.org/10.1111/nyas.70046", "10.1111/nyas.70046", "2025 review included 35 trials in 31 publications. Pooled findings favored intervention, but heterogeneity was extremely high and subgroup comparisons were exploratory. Its large standardized average is not an expected benefit for every program.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	bpMeta: researchSource("Association of Blood Pressure Lowering With Incident Dementia or Cognitive Impairment", "JAMA", 2020, "https://doi.org/10.1001/jama.2020.4249", "10.1001/jama.2020.4249", "2020 randomized-trial synthesis found a modest reduction in a dementia-or-cognitive-impairment outcome, but no significant change in cognitive test scores. Composite and dementia-only outcomes should not be treated as identical.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	bpChinaTrial: researchSource("Blood pressure reduction and all-cause dementia in people with uncontrolled hypertension: an open-label, blinded-endpoint, cluster-randomized trial", "Nature Medicine", 2025, "https://doi.org/10.1038/s41591-025-03616-8", "10.1038/s41591-025-03616-8", "2025 cluster-randomized trial in 326 rural Chinese villages, involving 33,995 adults with uncontrolled hypertension. Clinician-supervised community care reduced dementia over four years. The population and program differ from SPRINT and from healthy adults with normal blood pressure.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt),
	bpSprintTrial: researchSource("Effect of Intensive vs Standard Blood Pressure Control on Probable Dementia", "JAMA", 2019, "https://doi.org/10.1001/jama.2018.21442", "10.1001/jama.2018.21442", "SPRINT randomized 9,361 adults with hypertension and elevated cardiovascular risk, excluding diabetes and prior stroke. Mild cognitive impairment declined, while the dementia-only result was inconclusive. Early stopping limited dementia case counts.", "landmark_study", "context", novemberCareLearningResearchCheckedAt),
	bpSprintFollowup: {
		...researchSource("Long-Term Effect of Intensive vs Standard Blood Pressure Control on Mild Cognitive Impairment and Probable Dementia in SPRINT", "Neurology", 2025, "https://doi.org/10.1212/wnl.0000000000213334", "10.1212/wnl.0000000000213334", "2025 follow-up of the same SPRINT cohort retained benefit for a cognitive-impairment composite, with dementia alone still inconclusive. A correction fixes Figure 3's axis to identify the composite endpoint. Attrition and overlapping participants limit interpretation.", "landmark_study", "context", novemberCareLearningResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1212/wnl.0000000000213334",
			"https://api.crossref.org/works?filter=updates%3A10.1212%2Fwnl.0000000000213334&rows=100",
			"https://doi.org/10.1212/wnl.0000000000213686",
			"https://doi.org/10.1212/WNL.0000000000213686"
		]
	},
	burnoutOrganizational: researchSource("Organizational interventions and occupational burnout: a meta-analysis with focus on exhaustion", "International Archives of Occupational and Environmental Health", 2023, "https://doi.org/10.1007/s00420-023-02009-z", "10.1007/s00420-023-02009-z", "2023 review of 13 controlled studies found a small average reduction in exhaustion with very low certainty. Workload, participation and combined interventions differed. Exhaustion is one dimension of burnout, not a complete diagnosis or every wellbeing outcome.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	burnoutPhysicians: researchSource("Controlled Interventions to Reduce Burnout in Physicians", "JAMA Internal Medicine", 2017, "https://doi.org/10.1001/jamainternmed.2016.7674", "10.1001/jamainternmed.2016.7674", "2017 review of 19 studies with 20 comparisons in physicians found small benefits and larger average effects for organizational approaches. Those between-study subgroup comparisons do not randomize workplaces to each approach.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	burnoutConstruction: researchSource("The effectiveness of organisational-level workplace mental health interventions on mental health and wellbeing in construction workers: A systematic review and recommended research agenda", "PLOS ONE", 2022, "https://doi.org/10.1371/journal.pone.0277114", "10.1371/journal.pone.0277114", "2022 construction-sector review found only four studies with 260 participants, mostly weak designs. Emotional-exhaustion benefits were not established. Healthcare findings should not be assumed to transfer unchanged to other sectors.", "systematic_review", "debate", novemberCareLearningResearchCheckedAt),
	musicCochrane: researchSource("Music therapy for depression", "Cochrane Database of Systematic Reviews", 2017, "https://doi.org/10.1002/14651858.cd004517.pub3", "10.1002/14651858.cd004517.pub3", "2017 Cochrane review included nine studies with 421 participants. Adding music therapy to usual care improved short-term symptoms; comparisons with established psychological therapies were uncertain and longer follow-up was sparse.", "systematic_review", "supports", novemberCareLearningResearchCheckedAt),
	musicMeta: researchSource("Effects of music therapy on depression: A meta-analysis of randomized controlled trials", "PLOS ONE", 2020, "https://doi.org/10.1371/journal.pone.0240862", "10.1371/journal.pone.0240862", "2020 review of 55 randomized trials mixed therapist-led music therapy and listening-based music interventions. Different pooled subgroup effects are not direct randomized comparisons proving one format superior.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	musicRecentMeta: researchSource("Music therapy for patients with depression: systematic review and meta-analysis of randomised controlled trials", "BJPsych Open", 2025, "https://doi.org/10.1192/bjo.2025.10822", "10.1192/bjo.2025.10822", "2025 review reported symptom benefits but rated the evidence very low because of bias, inconsistency and imprecision. Anxiety improvement was not statistically significant. Favorable pooled results do not remove uncertainty about benefit size.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	writingDepression: researchSource("Effects of expressive writing on depressive symptoms-A meta-analysis", "Clinical Psychology: Science and Practice", 2018, "https://doi.org/10.1111/cpsp.12224", "10.1111/cpsp.12224", "2018 synthesis of 39 trials in physically healthy adults without PTSD found no significant long-term depression benefit from brief self-directed expressive writing. This differs from formal written-exposure therapy delivered as clinical treatment.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	writingLongTerm: researchSource("The delayed, durable effect of expressive writing on depression, anxiety and stress: A meta‐analytic review of studies with long‐term follow‐ups", "British Journal of Clinical Psychology", 2023, "https://doi.org/10.1111/bjc.12408", "10.1111/bjc.12408", "2023 print article, first online in 2022. Review of 31 trials and 4,012 participants found a very small average reduction across depression, anxiety and stress measures. A combined symptom effect does not establish treatment of diagnosed depression.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	writingPositiveReview: researchSource("Positive expressive writing interventions, subjective health and wellbeing in non-clinical populations: A systematic review", "PLOS One", 2025, "https://doi.org/10.1371/journal.pone.0308928", "10.1371/journal.pone.0308928", "2025 review of 51 studies on positive writing found more consistent wellbeing than distress benefits, with poor-to-fair study quality. Gratitude and positive-future exercises are different from writing about upsetting experiences.", "systematic_review", "context", novemberCareLearningResearchCheckedAt),
	digitalSelfGuided: researchSource("Efficacy of Self-guided Internet-Based Cognitive Behavioral Therapy in the Treatment of Depressive Symptoms", "JAMA Psychiatry", 2017, "https://doi.org/10.1001/jamapsychiatry.2017.0044", "10.1001/jamapsychiatry.2017.0044", "2017 individual-participant meta-analysis of 13 trials and 3,876 participants found a small average depression-symptom benefit over controls. Adherence mattered; results apply to structured CBT programs rather than every commercial mental-health app.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	digitalGuidance: researchSource("Internet-Based Cognitive Behavioral Therapy for Depression", "JAMA Psychiatry", 2021, "https://doi.org/10.1001/jamapsychiatry.2020.4364", "10.1001/jamapsychiatry.2020.4364", "2021 individual-participant network meta-analysis found benefits from guided and unguided internet CBT. Human guidance helped more at greater baseline severity; the average immediate advantage did not clearly persist at six or 12 months.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	digitalComponents: researchSource("Dismantling, optimising, and personalising internet cognitive behavioural therapy for depression: a systematic review and component network meta-analysis using individual participant data", "The Lancet Psychiatry", 2021, "https://doi.org/10.1016/s2215-0366(21)00077-8", "10.1016/s2215-0366(21)00077-8", "2021 component analysis of 76 trials explored which internet-CBT elements and supports help. Component rankings depend on modeling assumptions and study comparisons, and are not a prescription to remove treatment elements without clinical judgment.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	activationCochrane: researchSource("Behavioural activation therapy for depression in adults", "Cochrane Database of Systematic Reviews", 2020, "https://doi.org/10.1002/14651858.cd013305.pub2", "10.1002/14651858.cd013305.pub2", "Completed 2020 Cochrane review of 53 studies and 5,495 participants. Benefits over usual care were sensitive to some missing-data assumptions; similar average results against CBT do not establish equivalence for every patient or setting.", "systematic_review", "supports", novemberCareLearningResearchCheckedAt),
	activationRecentMeta: researchSource("Behavioral activation for depression: A comprehensive systematic review and meta-analysis", "Clinical Psychology Review", 2026, "https://doi.org/10.1016/j.cpr.2026.102783", "10.1016/j.cpr.2026.102783", "2026 synthesis of 105 trials and 13,933 participants found benefits for adult depression, including some 12-month follow-up. Adult outpatient findings were heterogeneous, with a prediction interval allowing little or no benefit in a new setting.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	activationLayWorkers: researchSource("Effectiveness of lay workers delivering behavioural activation for people with depression: systematic review and meta-analysis", "BJPsych Open", 2026, "https://doi.org/10.1192/bjo.2026.12018", "10.1192/bjo.2026.12018", "2026 synthesis of six trials found a small benefit when trained lay workers delivered behavioral activation. Every included trial had high risk of bias, and heterogeneity was substantial. This is not evidence that untrained self-help replaces clinical support.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	groupingCentury: researchSource("What One Hundred Years of Research Says About the Effects of Ability Grouping and Acceleration on K–12 Students’ Academic Achievement", "Review of Educational Research", 2016, "https://doi.org/10.3102/0034654316675417", "10.3102/0034654316675417", "2016 second-order synthesis distinguished flexible within-class grouping from separate classes and other forms of grouping. The meta-analyses share underlying studies and should not be added as independent trials. Acceleration is a separate intervention.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	groupingTracking: researchSource("The Effect of School Tracking on Student Achievement and Inequality: A Meta-Analysis", "Review of Educational Research", 2023, "https://doi.org/10.3102/00346543221100850", "10.3102/00346543221100850", "2023 print article, first online in 2022. Synthesis of 53 analyses found no significant average achievement improvement from tracking, alongside greater inequality. Tracking across schools or classrooms differs from flexible small groups within one lesson.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	groupingWithin: researchSource("Within-Class Grouping: A Meta-Analysis", "Review of Educational Research", 1996, "https://doi.org/10.3102/00346543066004423", "10.3102/00346543066004423", "1996 synthesis found modest average benefits from within-class small-group teaching, particularly when instruction was adapted. It is historical evidence incorporated into later syntheses, not proof that fixed labels or grouping alone cause improvement.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	summerMeta: researchSource("The Impact of Summer Programs on Student Mathematics Achievement: A Meta-Analysis", "Review of Educational Research", 2023, "https://doi.org/10.3102/00346543221105543", "10.3102/00346543221105543", "2023 print article, first online in 2022. Synthesis of 37 experimental and quasi-experimental summer-program studies found an average mathematics gain around 0.10 standard deviations. That is a standardized score difference, not a ten-percent score increase.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	summerBaltimore: researchSource("Longitudinal Achievement Effects of Multiyear Summer School: Evidence From the Teach Baltimore Randomized Field Trial", "Educational Evaluation and Policy Analysis", 2006, "https://doi.org/10.3102/01623737028001025", "10.3102/01623737028001025", "Teach Baltimore randomized 438 children to a summer-program offer and 248 to control. The intention-to-treat result was null; favorable results for regular attenders used compliance modeling with additional assumptions.", "landmark_study", "debate", novemberCareLearningResearchCheckedAt),
	summerItaly: researchSource("Starting the School Year on the Right Foot: Effects of a Summer Learning Program Targeting Vulnerable Students in Italy", "Educational Researcher", 2026, "https://doi.org/10.3102/0013189x251361799", "10.3102/0013189x251361799", "2026 print issue, first online in 2025. Italian randomized trial involving 1,038 pupils in nine cities found stronger language than mathematics gains. The combined workshop/tutoring program also raised some concerns about school-related stress and engagement.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt),
	earlyCollegeNc: researchSource("Accelerated Postsecondary Pathways: The Longer-Term Impact of the Early College High School Model on Postsecondary Degree Attainment", "American Educational Research Journal", 2024, "https://doi.org/10.3102/00028312241276855", "10.3102/00028312241276855", "2024 follow-up of the national early-college admission-lottery study found higher overall and associate-degree completion at ten years. The bachelor's/advanced-degree difference was no longer significant at that horizon, though degrees had been earned sooner.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt),
	earlyCollegeAir: researchSource("Early College, Continued Success: Longer-Term Impact of Early College High Schools", "Journal of Research on Educational Effectiveness", 2021, "https://doi.org/10.1080/19345747.2020.1862374", "10.1080/19345747.2020.1862374", "2021 journal article reporting earlier follow-up of the same national lottery cohort. Enrollment and completion improved by six years. This and its ten-year follow-up are one underlying experiment, not independent replications.", "landmark_study", "context", novemberCareLearningResearchCheckedAt),
	earlyCollegeCompletion: researchSource("The Impact of Early Colleges on Postsecondary Performance and Completion", "AERA Open", 2024, "https://doi.org/10.1177/23328584241290772", "10.1177/23328584241290772", "2024 report from the separate long-running North Carolina early-college experiment found larger associate-degree gains and some bachelor's gains for underserved groups. No overall final college-GPA difference was found.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt),
	payMotivation: researchSource("Intrinsic motivation and extrinsic incentives jointly predict performance: A 40-year meta-analysis.", "Psychological Bulletin", 2014, "https://doi.org/10.1037/a0035661", "10.1037/a0035661", "2014 synthesis of 183 studies across several domains found that intrinsic motivation and external incentives relate differently to performance quality and quantity. Correlations and meta-regression paths do not demonstrate a universal causal mechanism.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	payPerformance: researchSource("A cognitive evaluation and equity-based perspective of pay for performance on job performance: A meta-analysis and path model", "Frontiers in Psychology", 2023, "https://doi.org/10.3389/fpsyg.2022.1039375", "10.3389/fpsyg.2022.1039375", "2023 synthesis of 108 samples found a positive relationship between pay for performance and job performance, varying by measurement and context. Proposed motivation, pressure and fairness pathways are not independent causal experiments.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	payReview: researchSource("Does Performance-Related-Pay work? Recommendations for practice based on a meta-analysis", "Policy Design and Practice", 2023, "https://doi.org/10.1080/25741292.2023.2205756", "10.1080/25741292.2023.2205756", "2023 public-administration meta-analysis found small positive pooled relationships, but trivial, nonsignificant effects in stronger multiple-source or experimental designs. Employee attitudes and measured work outcomes are different endpoints.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	openCollaboration: researchSource("The impact of the ‘open’ workspace on human collaboration", "Philosophical Transactions of the Royal Society B: Biological Sciences", 2018, "https://doi.org/10.1098/rstb.2017.0239", "10.1098/rstb.2017.0239", "2018 before-and-after field studies in two corporate headquarters found less face-to-face contact and more electronic communication after open-plan transitions. Offices were not randomized, and contact volume is not total collaboration quality.", "landmark_study", "debate", novemberCareLearningResearchCheckedAt),
	openSpatialReview: researchSource("Office spatial design attributes, sitting, and face-to-face interactions: Systematic review and research agenda", "Building and Environment", 2021, "https://doi.org/10.1016/j.buildenv.2020.107426", "10.1016/j.buildenv.2020.107426", "2021 review of 20 studies, mostly cross-sectional, found proximity associated with more frequent contact. Sitting, interaction frequency and collaboration quality are separate measures; these associations do not establish the effect of removing partitions.", "systematic_review", "context", novemberCareLearningResearchCheckedAt),
	openOutcomesReview: researchSource("A Comparison of Psychological and Work Outcomes in Open-Plan and Cellular Office Designs: A Systematic Review", "Sage Open", 2021, "https://doi.org/10.1177/2158244020988869", "10.1177/2158244020988869", "2021 comparison of 31 papers generally favored cellular offices on privacy, distraction and several perceived work outcomes. Designs, settings and measures varied, limiting universal causal conclusions.", "systematic_review", "debate", novemberCareLearningResearchCheckedAt),
	teacherPayMeta: researchSource("Teacher Merit Pay: A Meta-Analysis", "American Educational Research Journal", 2021, "https://doi.org/10.3102/0002831220905580", "10.3102/0002831220905580", "2021 print article, first online in 2020. Meta-analysis of 37 studies found a small positive US test-score effect, around 0.043 standard deviations, with important differences in program design and context.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	teacherPayDesign: researchSource("Pay by Design: Teacher Performance Pay Design and the Distribution of Student Achievement", "Journal of Labor Economics", 2019, "https://doi.org/10.1086/702625", "10.1086/702625", "2019 randomized study in 216 Chinese schools compared ways of linking teacher rewards to pupil performance. A percentile-based scheme outperformed simpler designs. Comparing incentive schemes is different from isolating any merit pay versus no merit pay.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt),
	teacherPayTrial: researchSource("Does merit pay reward good teachers? Evidence from a randomized experiment", "Journal of Policy Analysis and Management", 2004, "https://doi.org/10.1002/pam.20022", "10.1002/pam.20022", "2004 Tennessee analysis used randomized teacher/pupil assignment to evaluate teachers already certified by a career ladder. It concerns identification of effective teachers, not random assignment of teachers to receive merit pay.", "landmark_study", "context", novemberCareLearningResearchCheckedAt),
	breaksRctMeta: researchSource("Effects of In-Classroom Physical Activity Breaks on Children’s Academic Performance, Cognition, Health Behaviours and Health Outcomes: A Systematic Review and Meta-Analysis of Randomised Controlled Trials", "International Journal of Environmental Research and Public Health", 2022, "https://doi.org/10.3390/ijerph19159479", "10.3390/ijerph19159479", "2022 synthesis of ten eligible randomized studies, nine pooled, found mixed academic outcomes and no clear overall cognition effect. Brief movement breaks differ from physically active lessons and wider school exercise programs.", "meta_analysis", "debate", novemberCareLearningResearchCheckedAt),
	breaksClassroomMeta: researchSource("Effect of classroom-based physical activity interventions on academic and physical activity outcomes: a systematic review and meta-analysis", "International Journal of Behavioral Nutrition and Physical Activity", 2017, "https://doi.org/10.1186/s12966-017-0569-9", "10.1186/s12966-017-0569-9", "2017 review of 39 articles, 16 pooled, found improved on-task behavior but uncertain cognition and mixed attainment effects. Its classroom-activity interventions were broader than movement breaks alone.", "meta_analysis", "context", novemberCareLearningResearchCheckedAt),
	breaksAttention: researchSource("Effects of active breaks on attention and executive function in children and adolescents: A meta-analysis", "European Journal of Pediatrics", 2026, "https://doi.org/10.1007/s00431-026-07341-3", "10.1007/s00431-026-07341-3", "2026 review of 25 randomized trials found favorable attention and executive-function averages with substantial heterogeneity. Exploratory differences by session duration do not establish an optimal classroom prescription.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	suspensionMeta: researchSource("Relationship Between School Suspension and Student Outcomes: A Meta-Analysis", "School Psychology Review", 2015, "https://doi.org/10.17105/spr-14-0008.1", "10.17105/spr-14-0008.1", "2015 synthesis of 34 studies found associations between suspension, lower achievement and dropout. Preexisting differences and disciplinary selection mean the pooled relationship is not a randomized causal estimate.", "meta_analysis", "supports", novemberCareLearningResearchCheckedAt),
	suspensionInterventions: researchSource("School-Based Interventions for Reducing Disciplinary School Exclusion. An Updated Systematic Review", "Campbell Systematic Reviews: Better Evidence for a Better World", 2025, "https://doi.org/10.1002/cl2.70063", "10.1002/cl2.70063", "2025 Campbell update found small average reductions in exclusion from school-based interventions, with less clear effects on conduct or delinquency. This evaluates alternatives to exclusion, not the causal effect of suspension itself.", "systematic_review", "context", novemberCareLearningResearchCheckedAt),
	suspensionConsequences: researchSource("Exclusion and Urban Public High Schools: Short- and Long-Term Consequences of School Suspensions", "American Journal of Education", 2018, "https://doi.org/10.1086/698454", "10.1086/698454", "2018 New York City longitudinal quasi-experimental analysis retained negative links between suspension, attendance, completion and graduation after adjustment. Stronger adjustment reduces some confounding but cannot remove every selection difference.", "landmark_study", "supports", novemberCareLearningResearchCheckedAt)
};

export const novemberCareLearningClaims = [
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "does-cognitive-stimulation-therapy-help-people-with-dementia",
		title: "Does cognitive stimulation therapy help people with dementia?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Structured cognitive stimulation can produce small short-term improvements in thinking and communication in people with mild-to-moderate dementia. Lasting benefits are less certain.",
		stableCore: [
			"The intervention combines varied thinking activities with social engagement.",
			"A Cochrane review found small average cognitive benefits immediately after treatment.",
			"A narrower review of the original structured program also found benefits, using overlapping trials."
		],
		openQuestions: [
			"How long do benefits last after sessions end?",
			"Which delivery formats work best for different needs and settings?"
		],
		whatWouldChangeMinds: [
			"Large independent trials showing little benefit under comparable conditions.",
			"Long-term evidence clarifying everyday function, quality of life and caregiver outcomes."
		],
		misconceptions: [
			"A short-term cognitive-test gain means dementia has been reversed or cured."
		],
		editorSummary: "The evidence concerns structured support for people already living with dementia.",
		population: "People with diagnosed mild-to-moderate dementia in the studied care settings.",
		scope: "Assess structured cognitive stimulation, separating short-term cognition and communication from lasting clinical outcomes.",
		excludedEvidence: [
			"Dementia treatment trials do not establish prevention in cognitively healthy adults.",
			"General cognitive stimulation, skill drills and individualized rehabilitation are distinct approaches."
		],
		uncertainty: "Benefits are mainly short-term, trials and delivery vary, and longer follow-up is sparse.",
		sources: [sources.cognitiveStimulationCochrane, sources.cognitiveStimulationProtocol]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "does-the-mind-diet-slow-cognitive-decline",
		title: "Does the MIND diet slow cognitive decline?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Observational studies often find favorable links, but a major three-year trial found no clear advantage over its comparison diet. Evidence that the MIND diet itself prevents cognitive decline remains uncertain.",
		stableCore: [
			"People reporting higher adherence often have better cognitive outcomes in cohort studies.",
			"The 604-person trial gave both groups dietary counseling and weight-loss support.",
			"Cognitive and brain-imaging changes did not differ significantly between the trial groups."
		],
		openQuestions: [
			"Would a longer trial or a different comparison group produce a clearer difference?",
			"How do dietary patterns and effects vary across populations?"
		],
		whatWouldChangeMinds: [
			"Replicated trials with longer follow-up and well-measured diet changes.",
			"Consistent effects on everyday function or dementia diagnoses."
		],
		misconceptions: [
			"A favorable diet association proves that changing to that diet prevents dementia."
		],
		editorSummary: "The randomized comparison was between two supported diet programs.",
		population: "Middle-aged and older adults; the main trial enrolled cognitively unimpaired older adults at elevated risk.",
		scope: "Assess the named MIND dietary pattern and cognitive outcomes, distinguishing cohorts from randomized dietary interventions.",
		excludedEvidence: [
			"General cardiovascular benefits of healthy eating do not establish a specific dementia-prevention effect.",
			"Multiple publications from one cohort do not count as independent confirmations."
		],
		uncertainty: "Observational confounding, different adherence scores and limited randomized follow-up make the specific cognitive effect uncertain.",
		sources: [sources.mindTrial, sources.mindAgingReview, sources.mindRecentReview]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cancer-prevention-and-care",
		slug: "does-scalp-cooling-reduce-chemotherapy-hair-loss",
		title: "Does scalp cooling reduce chemotherapy hair loss?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, for some chemotherapy regimens. Scalp cooling can preserve more hair or reduce persistent thinning, but results vary and discomfort can lead people to stop.",
		stableCore: [
			"Trials and broader research support hair-preservation benefits, mainly in breast-cancer treatment.",
			"A recent trial found less persistent alopecia at six months and clearer improvement in hair thickness than density.",
			"Cold discomfort, headaches and incomplete hair protection are common practical limits."
		],
		openQuestions: [
			"Which regimens and patient groups benefit most?",
			"How durable are hair recovery and safety outcomes over longer follow-up?"
		],
		whatWouldChangeMinds: [
			"Larger independent trials finding little benefit under the same regimens.",
			"Long-term comparative evidence showing a materially different safety profile."
		],
		misconceptions: [
			"Scalp cooling prevents all hair loss or has the same success rate with every chemotherapy regimen."
		],
		editorSummary: "Effectiveness depends on treatment and how hair preservation is measured.",
		population: "Studied cancer patients receiving chemotherapy, predominantly people with breast cancer.",
		scope: "Assess scalp-cooling hair outcomes and tolerability, distinguishing transient hair loss, persistent alopecia and regrowth measures.",
		excludedEvidence: [
			"A pooled hair-retention proportion is not an individual success prediction.",
			"Rare-event reports cannot prove zero long-term risk; suitability requires the treating oncology team's assessment."
		],
		uncertainty: "Treatment regimens, devices, endpoints and study designs differ, and long-term rare-event evidence is limited.",
		sources: [sources.scalpEfficacyMeta, sources.scalpPersistentTrial, sources.scalpSafetyMeta]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cancer-prevention-and-care",
		slug: "do-cannabis-based-medicines-help-opioid-resistant-cancer-pain",
		title: "Do cannabis-based medicines help opioid-resistant cancer pain?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "The best-studied THC/CBD products have not shown a useful added pain benefit. Evidence for other preparations is limited, while drowsiness and dizziness can occur.",
		stableCore: [
			"Controlled trials mostly concern advanced cancer and products added to existing pain care.",
			"Recent reviews do not establish a useful average benefit for the best-studied sprays.",
			"Possible effects on chemotherapy nausea are a different outcome from pain relief."
		],
		openQuestions: [
			"Do specific preparations help clearly defined patient groups?",
			"What are the longer-term effects and interactions with cancer treatment?"
		],
		whatWouldChangeMinds: [
			"Well-powered trials showing clinically important pain relief with acceptable harms.",
			"Independent replication using clearly identified products and appropriate controls."
		],
		misconceptions: [
			"Evidence about nausea, non-cancer pain or laboratory tumor effects proves relief of cancer pain."
		],
		editorSummary: "Product, symptom and treatment context matter.",
		population: "Adults with cancer pain, especially advanced cancer pain persisting despite opioid treatment.",
		scope: "Assess added analgesic benefit and harms of cannabis-based medicines, preserving product-specific and comparator distinctions.",
		excludedEvidence: [
			"Results for tested sprays do not establish effects of every herbal or synthetic preparation.",
			"This evidence does not establish cannabis as a cancer-directed treatment or justify changing prescribed pain treatment."
		],
		uncertainty: "Evidence outside the best-studied preparations is sparse, and overlapping reviews share many of the same trials.",
		sources: [sources.cancerCannabisCochrane, sources.cancerCannabisAsco, sources.cancerCannabisMeta]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "science-communication",
		slug: "do-patient-decision-aids-improve-health-decisions",
		title: "Do patient decision aids improve health decisions?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Well-designed aids improve knowledge, understanding of benefits and harms, and choices that fit what matters to a person. Evidence is stronger for decision quality than for later health outcomes.",
		stableCore: [
			"A large Cochrane review found more informed and active participation in decisions.",
			"Patients generally understood risks more accurately and felt clearer about their priorities.",
			"Decision regret did not increase in the reviewed trials."
		],
		openQuestions: [
			"Which formats work best for people with different literacy and access needs?",
			"Do better decisions improve longer-term health and resource use?"
		],
		whatWouldChangeMinds: [
			"Replicated studies showing no decision-quality benefit from well-designed aids.",
			"Long-term evidence identifying important benefits or harms missed by current trials."
		],
		misconceptions: [
			"Any information leaflet or chatbot is a validated decision aid."
		],
		editorSummary: "A decision aid presents options and helps clarify priorities.",
		population: "Adults facing studied treatment or screening choices, across many clinical settings.",
		scope: "Assess evidence-based patient decision aids versus usual care, focusing on knowledge, risk understanding and informed preferences.",
		excludedEvidence: [
			"Overlapping cancer subanalyses are not additional independent trials.",
			"Improved knowledge does not by itself prove longer survival; decision aids supplement clinical consultation."
		],
		uncertainty: "Evidence on informed value-congruent choices is less complete than knowledge evidence, and downstream health effects need further study.",
		sources: [sources.decisionCochrane, sources.decisionCancer]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "can-programs-reduce-loneliness-in-older-adults",
		title: "Can programs reduce loneliness in older adults?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some programs produce modest improvements. Results depend on the type of support and setting, and studies vary greatly in quality.",
		stableCore: [
			"Group-based treatments and internet-skills training have shown benefits in some community studies.",
			"Loneliness, number of social contacts and social support are different outcomes.",
			"Large pooled benefits from some small studies are difficult to generalize."
		],
		openQuestions: [
			"Which benefits last after programs end?",
			"Which approaches fit people's preferences, accessibility needs and living situations?"
		],
		whatWouldChangeMinds: [
			"Larger, well-controlled trials with sustained benefits on validated loneliness measures.",
			"Consistent independent results across community and residential-care settings."
		],
		misconceptions: [
			"Providing more contacts necessarily resolves the feeling of loneliness."
		],
		editorSummary: "The kind of connection can matter as much as the number of contacts.",
		population: "Older adults in the studied community and long-term-care settings.",
		scope: "Assess interventions targeting subjective loneliness, keeping living settings and intervention mechanisms distinct.",
		excludedEvidence: [
			"Mortality associations with loneliness do not prove that a program extends life.",
			"Very heterogeneous pooled effects are not expected benefits for every participant."
		],
		uncertainty: "Small studies, varied controls, high heterogeneity and incomplete follow-up limit confidence in the size and durability of benefit.",
		sources: [sources.lonelinessCommunity, sources.lonelinessJama, sources.lonelinessMechanism]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "can-treating-high-blood-pressure-lower-dementia-risk",
		title: "Can treating high blood pressure lower dementia risk?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It can help people with hypertension. Trials support some protection against cognitive impairment, although dementia-only results differ across studies and treatment needs individual clinical assessment.",
		stableCore: [
			"Randomized evidence supports a modest cognitive benefit from blood-pressure control.",
			"A large rural Chinese trial found fewer dementia cases with an intensive community-care program.",
			"SPRINT found clearer benefits for mild cognitive impairment than for dementia alone."
		],
		openQuestions: [
			"Which treatment approach best balances cognitive benefit and adverse effects in different patients?",
			"How long do benefits persist across populations and ages?"
		],
		whatWouldChangeMinds: [
			"Large replications showing no cognitive benefit with adequate dementia follow-up.",
			"Better evidence identifying patients whose treatment risks outweigh cognitive benefits."
		],
		misconceptions: [
			"A trial's cognitive-impairment result proves the same reduction in dementia for every patient."
		],
		editorSummary: "Cognitive impairment and dementia-only endpoints give different results.",
		population: "Adults with hypertension in studied trials; eligibility and clinical risks differ across studies.",
		scope: "Assess clinician-managed blood-pressure reduction and cognitive outcomes, separating dementia, mild impairment and composite endpoints.",
		excludedEvidence: [
			"SPRINT follow-up reports are not independent trials and excluded people with diabetes or prior stroke.",
			"These results do not set a universal treatment target or support self-adjusting medication."
		],
		uncertainty: "Trial populations and targets differ, some dementia analyses were underpowered, and extended follow-up had substantial attrition.",
		sources: [
			sources.bpMeta,
			sources.bpChinaTrial,
			sources.bpSprintTrial,
			sources.bpSprintFollowup
		]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "can-workplace-changes-reduce-burnout",
		title: "Can workplace changes reduce burnout?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Changes to workload, scheduling or how work is organized may reduce exhaustion. Average benefits are usually small, and evidence is stronger in some healthcare settings than across workplaces generally.",
		stableCore: [
			"Controlled studies show small average improvements in emotional exhaustion.",
			"Organizational and individual approaches can address different parts of a work problem.",
			"Findings from physicians do not automatically transfer to construction or other sectors."
		],
		openQuestions: [
			"Which changes produce lasting improvements in specific workplaces?",
			"How do effects differ across roles, staffing levels and work cultures?"
		],
		whatWouldChangeMinds: [
			"Larger independent workplace trials with long follow-up and complete outcome reporting.",
			"Consistent effects on several burnout dimensions rather than exhaustion alone."
		],
		misconceptions: [
			"A short resilience course establishes that workload and organization no longer matter."
		],
		editorSummary: "Exhaustion is one part of a broader workplace problem.",
		population: "Workers in studied organizational interventions, with substantial healthcare-sector representation.",
		scope: "Assess changes at workplace or combined organizational/individual level, distinguishing exhaustion from wider wellbeing outcomes.",
		excludedEvidence: [
			"Between-study subgroup comparisons are not head-to-head randomized tests of intervention types.",
			"Nonclinical exhaustion scores do not by themselves diagnose a mental disorder."
		],
		uncertainty: "Evidence quality is often low, interventions differ substantially, and results outside healthcare remain sparse.",
		sources: [sources.burnoutOrganizational, sources.burnoutPhysicians, sources.burnoutConstruction]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-music-therapy-help-with-depression",
		title: "Does music therapy help with depression?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Music-based therapy may improve depressive symptoms, especially alongside usual care. Small studies, varied approaches and risk of bias make the size and durability of benefit uncertain.",
		stableCore: [
			"Reviews often find short-term symptom improvements compared with control conditions.",
			"Therapist-led treatment and listening-based interventions are not interchangeable.",
			"Evidence comparing music therapy directly with established psychological treatment remains limited."
		],
		openQuestions: [
			"Which approaches produce benefits that persist?",
			"How much benefit comes from music, therapeutic contact or the comparison condition?"
		],
		whatWouldChangeMinds: [
			"Larger, well-controlled trials showing consistent lasting improvement.",
			"Direct comparisons that distinguish qualified therapy from ordinary listening and attention."
		],
		misconceptions: [
			"A favorable music-therapy study proves that a playlist replaces depression treatment."
		],
		editorSummary: "The intervention and comparator affect what the result means.",
		population: "People in studied depression and depressive-symptom interventions, mostly adults.",
		scope: "Assess music-based interventions for depressive symptoms, distinguishing added treatment from replacement and therapist-led from listening formats.",
		excludedEvidence: [
			"Indirect subgroup averages do not prove one music format is superior.",
			"Benefits for short-term symptoms do not establish prevention of relapse or a cure."
		],
		uncertainty: "Recent reviews rate much of the evidence very low because of bias, heterogeneity and imprecision.",
		sources: [sources.musicCochrane, sources.musicMeta, sources.musicRecentMeta]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-expressive-writing-reduce-emotional-distress",
		title: "Does expressive writing reduce emotional distress?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Effects are usually small and inconsistent. Writing exercises may help some people, but brief self-directed writing is not established as a treatment for clinical depression.",
		stableCore: [
			"Reviews of brief writing about upsetting experiences reach different conclusions.",
			"A pooled improvement across several distress measures can be very small.",
			"Positive or gratitude writing targets different experiences and often different outcomes."
		],
		openQuestions: [
			"Which writing formats and populations benefit over meaningful follow-up?",
			"When is structured clinical support important?"
		],
		whatWouldChangeMinds: [
			"Larger trials with predefined outcomes and durable, clinically meaningful benefits.",
			"Replications separating self-directed exercises from formal therapy."
		],
		misconceptions: [
			"All journaling formats have the same evidence or are equivalent to clinical writing-based treatment."
		],
		editorSummary: "The writing task and outcome need to match the evidence.",
		population: "Healthy or subclinical adults in most expressive-writing studies.",
		scope: "Assess self-directed expressive writing and emotional-distress outcomes, separating positive writing and clinician-led therapy.",
		excludedEvidence: [
			"Changes in wellbeing or optimism are not the same as treating diagnosed depression.",
			"Overlapping reviews cannot be added as independent trial populations."
		],
		uncertainty: "Interventions, populations and outcomes vary, and study quality and long-term effects remain limited.",
		sources: [sources.writingDepression, sources.writingLongTerm, sources.writingPositiveReview]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-online-cbt-help-with-depression",
		title: "Does online CBT help with depression?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Structured online cognitive behavioral therapy reduces depressive symptoms on average. Human guidance tends to matter more when symptoms are more severe; the evidence does not validate every mental-health app.",
		stableCore: [
			"Both guided and self-guided programs have shown benefits against control conditions.",
			"Average effects and adherence differ between programs and participants.",
			"Internet CBT is different from a live video appointment or a generic wellness app."
		],
		openQuestions: [
			"Which support and program features work best in routine care?",
			"How can benefits and engagement be sustained for underserved groups?"
		],
		whatWouldChangeMinds: [
			"Independent trials showing little benefit with good adherence and appropriate active controls.",
			"Longer follow-up that changes estimates of benefit, dropout or deterioration."
		],
		misconceptions: [
			"Evidence for tested online CBT means that every app or chatbot provides effective therapy."
		],
		editorSummary: "Structured content and the amount of support matter.",
		population: "Adults with depressive symptoms in evaluated internet-CBT programs.",
		scope: "Assess structured guided and unguided internet CBT, distinguishing depression severity, control conditions and delivery format.",
		excludedEvidence: [
			"Component-model rankings are not direct evidence that people should alter treatment packages themselves.",
			"Online program evidence does not establish suitability for every severity level or an acute mental-health crisis."
		],
		uncertainty: "Programs and controls vary, trials overlap across syntheses, and long-term comparative evidence is less complete.",
		sources: [sources.digitalSelfGuided, sources.digitalGuidance, sources.digitalComponents]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-behavioral-activation-help-with-depression",
		title: "Does behavioral activation help with depression?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. This structured therapy can reduce depression in adults by helping people reconnect with meaningful activities. Evidence is stronger for adult treatment than for children or prevention.",
		stableCore: [
			"Randomized trials find benefits over several control conditions.",
			"Average outcomes against other psychotherapies are often similar, with uncertainty around specific comparisons.",
			"Training and support matter when care is delivered by nonspecialists."
		],
		openQuestions: [
			"Which patients and delivery settings benefit most?",
			"How durable are benefits beyond the follow-up already studied?"
		],
		whatWouldChangeMinds: [
			"Large low-bias trials showing little benefit against credible active controls.",
			"Replicated evidence identifying substantial harms or important limits in particular populations."
		],
		misconceptions: [
			"Behavioral activation is simply telling a depressed person to stay busy."
		],
		editorSummary: "The evidence concerns a structured therapeutic approach.",
		population: "Adults with depression, primarily studied outpatient populations.",
		scope: "Assess behavioral activation as a defined depression therapy, distinguishing delivery format, comparator and age group.",
		excludedEvidence: [
			"A nonsignificant difference between therapies does not prove exact equivalence.",
			"Adult treatment evidence cannot be transferred unchanged to child treatment or prevention."
		],
		uncertainty: "Study quality and effects vary, some older findings depend on missing-data assumptions, and evidence on children is sparse.",
		sources: [sources.activationCochrane, sources.activationRecentMeta, sources.activationLayWorkers]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-grouping-students-by-attainment-improve-learning",
		title: "Does grouping students by attainment improve learning?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Flexible small groups within a class can help. Sorting pupils into separate classes or school tracks has not shown a clear average achievement benefit and may widen gaps.",
		stableCore: [
			"Grouping covers different practices, from temporary lesson groups to long-term school tracks.",
			"Benefits are more apparent when teaching is adapted to small groups.",
			"Tracking studies generally find less convincing average gains and greater inequality."
		],
		openQuestions: [
			"Which flexible grouping approaches help different pupils over time?",
			"How do placement changes and teaching quality affect opportunity gaps?"
		],
		whatWouldChangeMinds: [
			"Well-controlled comparisons finding durable benefits across attainment groups without widening gaps.",
			"Evidence separating the effect of grouping from changes in instruction and resources."
		],
		misconceptions: [
			"All forms of ability grouping have the same effects."
		],
		editorSummary: "The key distinction is flexible teaching groups versus fixed tracks.",
		population: "Pupils in studied primary and secondary education systems.",
		scope: "Compare within-class grouping, separate classes and school tracking, keeping instructional changes and inequality outcomes explicit.",
		excludedEvidence: [
			"Acceleration and gifted enrichment are distinct interventions.",
			"Second-order syntheses reuse earlier meta-analyses and underlying studies."
		],
		uncertainty: "Grouping practices, placement rules, teaching and research designs differ across systems.",
		sources: [sources.groupingCentury, sources.groupingTracking, sources.groupingWithin]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-summer-learning-programs-improve-achievement",
		title: "Do summer learning programs improve achievement?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Well-designed programs can produce modest gains, but results depend on their teaching and participation. Trials include both positive and null results.",
		stableCore: [
			"A recent mathematics synthesis found a small average achievement improvement.",
			"Some randomized summer-program offers produced no overall learning gain.",
			"Positive results for regular attenders require care because attendance itself is not randomly assigned."
		],
		openQuestions: [
			"Which program features produce lasting gains across subjects?",
			"How can programs reach pupils who face barriers to attendance?"
		],
		whatWouldChangeMinds: [
			"Replicated trials showing little durable benefit despite good delivery and participation.",
			"Better evidence on sustained outcomes and unintended effects such as stress."
		],
		misconceptions: [
			"A standardized gain of 0.10 means every pupil's score rises by ten percent."
		],
		editorSummary: "An offer, attendance and learning gains are separate steps.",
		population: "School-age children in studied summer academic programs, including US and Italian trials.",
		scope: "Assess summer academic programs against relevant controls, separating subjects, program offers and attendance-based estimates.",
		excludedEvidence: [
			"Complier analyses require assumptions beyond the original randomized assignment.",
			"Tutoring/workshop combinations do not isolate the effect of each component."
		],
		uncertainty: "Program quality, attendance, subjects and follow-up differ, and some benefits may not persist.",
		sources: [sources.summerMeta, sources.summerBaltimore, sources.summerItaly]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-early-college-high-schools-increase-degree-completion",
		title: "Do early college high schools increase degree completion?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "US lottery-based studies find higher overall college-degree completion, especially associate degrees. Some bachelor's degrees are earned sooner, while longer-term differences are less consistent.",
		stableCore: [
			"The studied model combines high school with substantial supported college coursework.",
			"Two distinct long-running lottery studies support completion benefits.",
			"A ten-year follow-up found that an earlier bachelor's-degree advantage was no longer statistically significant."
		],
		openQuestions: [
			"Which parts of the model drive the gains?",
			"How well do results transfer beyond applicants and schools in the studied lotteries?"
		],
		whatWouldChangeMinds: [
			"Independent long-term studies finding no completion benefit under comparable implementation.",
			"Evidence that costs or access barriers materially change the benefits at scale."
		],
		misconceptions: [
			"An early-college result proves that any stand-alone dual-credit course produces the same outcome."
		],
		editorSummary: "The evidence concerns a complete school model.",
		population: "US pupils applying to studied early-college high schools, including national and North Carolina cohorts.",
		scope: "Assess postsecondary completion and timing after early-college admission offers, distinguishing degree types and follow-up horizons.",
		excludedEvidence: [
			"Six-year and ten-year reports from the national cohort are follow-ups of one experiment.",
			"Results among college enrollees can be affected by which pupils enroll and are not the same as the overall lottery effect."
		],
		uncertainty: "Benefits vary by degree, time horizon and student group, and lottery applicants may differ from other pupils.",
		sources: [sources.earlyCollegeNc, sources.earlyCollegeAir, sources.earlyCollegeCompletion]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-performance-related-pay-improve-job-performance",
		title: "Does performance-related pay improve job performance?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It can, but average gains depend on what is rewarded and how performance is measured. Some stronger studies find much smaller effects than simple associations suggest.",
		stableCore: [
			"Research often finds a positive relationship between incentives and measured performance.",
			"Quantity, quality, motivation and job satisfaction are different outcomes.",
			"In public-administration studies, stronger designs found less convincing average performance gains."
		],
		openQuestions: [
			"Which incentive designs improve quality as well as quantity?",
			"How do effects on cooperation, pressure and motivation develop over time?"
		],
		whatWouldChangeMinds: [
			"Replicated workplace experiments with durable improvements in independently measured outcomes.",
			"Evidence identifying important harms or reliable benefits under particular designs."
		],
		misconceptions: [
			"A positive link between bonuses and ratings proves that the bonus caused better work."
		],
		editorSummary: "The reward and the performance measure need to match.",
		population: "Workers in the studied private- and public-sector settings.",
		scope: "Assess pay tied to performance, separating causal designs, observational associations and different performance endpoints.",
		excludedEvidence: [
			"Meta-analytic mediation does not independently establish a causal motivation mechanism.",
			"Evidence from school or physical tasks does not transfer unchanged to every workplace."
		],
		uncertainty: "Study designs, cultures, job types and measures vary, with smaller effects in some stronger evaluations.",
		sources: [sources.payMotivation, sources.payPerformance, sources.payReview]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "how-do-open-plan-offices-affect-collaboration",
		title: "How do open-plan offices affect collaboration?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Research does not show a dependable collaboration gain from removing walls. Proximity can increase contact, but some moves to open-plan layouts reduced face-to-face interaction.",
		stableCore: [
			"Visibility, proximity, shared spaces and privacy can have different effects.",
			"Two measured office transitions found less face-to-face contact alongside more electronic communication.",
			"Reviews identify distraction and privacy concerns, with substantial differences between office designs."
		],
		openQuestions: [
			"Which layouts support both focused work and useful collaboration?",
			"How do teams adapt over time, and which measures best capture collaboration quality?"
		],
		whatWouldChangeMinds: [
			"Independent well-controlled workplace transitions showing consistent collaboration gains.",
			"Long-term evidence separating layout from staffing, technology and working practices."
		],
		misconceptions: [
			"More visible coworkers or more messages necessarily mean better collaboration."
		],
		editorSummary: "Interaction frequency and useful collaboration are different outcomes.",
		population: "Workers in studied office-based settings.",
		scope: "Assess office openness and interaction, distinguishing spatial attributes, contact volume and perceived or measured work outcomes.",
		excludedEvidence: [
			"A before-and-after result in two firms is not a universal causal estimate.",
			"Sitting time, message counts and self-rated productivity do not measure the same outcome."
		],
		uncertainty: "Much evidence is cross-sectional or from few workplaces, and layouts, organizational cultures and measures differ.",
		sources: [sources.openCollaboration, sources.openSpatialReview, sources.openOutcomesReview]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-teacher-merit-pay-improve-student-achievement",
		title: "Does teacher merit pay improve student achievement?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Some programs produce small test-score gains, while others have little effect. How rewards are designed and how achievement is measured make an important difference.",
		stableCore: [
			"A large synthesis found a small positive average effect in US studies.",
			"Randomized comparisons show that incentive formulas can change which pupils benefit.",
			"Identifying effective teachers and changing teachers' behavior through pay are different questions."
		],
		openQuestions: [
			"Which designs improve learning beyond the rewarded test?",
			"How do incentives affect teaching quality, collaboration and outcomes over time?"
		],
		whatWouldChangeMinds: [
			"Independent trials with durable gains on broad, unrewarded learning measures.",
			"Evidence that unintended effects outweigh or materially strengthen current estimated benefits."
		],
		misconceptions: [
			"A 0.043-standard-deviation effect means test scores rise by 4.3 percent."
		],
		editorSummary: "Design and measurement affect the result.",
		population: "Teachers and pupils in studied US and international school systems.",
		scope: "Assess teacher performance incentives and pupil achievement, distinguishing scheme comparisons and selection of already-certified teachers.",
		excludedEvidence: [
			"Random pupil assignment to career-ladder teachers is not random assignment of merit pay.",
			"Improvement on an incentivized test does not establish an equal gain across all learning outcomes."
		],
		uncertainty: "Average effects are small and sensitive to program design, context, implementation and testing.",
		sources: [sources.teacherPayMeta, sources.teacherPayDesign, sources.teacherPayTrial]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-movement-breaks-help-classroom-attention",
		title: "Do movement breaks help classroom attention?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They can improve attention and on-task behavior, but results vary. Evidence for lasting cognitive or test-score gains is less consistent than for some short-term classroom effects.",
		stableCore: [
			"Recent trial syntheses find favorable average attention effects with substantial variation.",
			"Older reviews found mixed cognition and academic outcomes.",
			"Brief breaks, physically active lessons and wider exercise programs are different interventions."
		],
		openQuestions: [
			"Which benefits persist beyond an immediate classroom session?",
			"How do effects vary with age, activity and teaching context?"
		],
		whatWouldChangeMinds: [
			"Larger trials with predefined attention and attainment outcomes.",
			"Consistent long-term benefits across settings and appropriate active controls."
		],
		misconceptions: [
			"An exploratory subgroup identifies the ideal activity-break duration for every classroom."
		],
		editorSummary: "Short-term attention and later attainment are separate outcomes.",
		population: "Schoolchildren and adolescents in studied classroom activity interventions.",
		scope: "Assess classroom movement breaks and attention, distinguishing broader active lessons, cognition and attainment.",
		excludedEvidence: [
			"Exploratory duration subgroups are not validated prescriptions.",
			"An on-task behavior rating is not the same as a standardized cognitive test or exam result."
		],
		uncertainty: "Interventions, outcome scales and follow-up vary, with heterogeneous and sometimes conflicting pooled findings.",
		sources: [sources.breaksRctMeta, sources.breaksClassroomMeta, sources.breaksAttention]
	}, novemberCareLearningResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "how-do-school-suspensions-relate-to-educational-outcomes",
		title: "How do school suspensions relate to educational outcomes?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Suspended pupils tend to have worse attendance, achievement and graduation outcomes. Stronger studies still find negative links, but separating the effect of suspension from earlier difficulties is hard.",
		stableCore: [
			"Research consistently links suspension with lower achievement and greater dropout risk.",
			"Longitudinal adjustment reduces some confounding without removing every difference between pupils.",
			"Programs that reduce exclusion have shown small average benefits for exclusion rates, with less clear effects on behavior."
		],
		openQuestions: [
			"Which alternatives protect safety and learning in different schools?",
			"How much of the observed educational disadvantage is caused by exclusion itself?"
		],
		whatWouldChangeMinds: [
			"Credible causal studies that substantially change estimated educational effects.",
			"Replicated evaluations of alternatives measuring safety, learning and unintended consequences together."
		],
		misconceptions: [
			"A suspension association alone proves that the sanction caused all of a pupil's later difficulties."
		],
		editorSummary: "Selection into suspension matters when interpreting outcomes.",
		population: "Pupils in studied school systems, with substantial US evidence.",
		scope: "Assess suspension and educational outcomes, distinguishing in-school and out-of-school exclusion, prior differences and evaluated alternatives.",
		excludedEvidence: [
			"Observational associations are not randomized estimates of suspension's causal effect.",
			"Reduced exclusion rates do not by themselves establish improved attainment or reduced delinquency."
		],
		uncertainty: "Preexisting behavior, attendance, resources and disciplinary selection complicate causal attribution.",
		sources: [sources.suspensionMeta, sources.suspensionInterventions, sources.suspensionConsequences]
	}, novemberCareLearningResearchCheckedAt)
];
