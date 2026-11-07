import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberCommonReaderResearchCheckedAt = "2026-11-07T03:29:36.848Z";

const sources = {
	coffeeUmbrella: {
		...researchSource("Coffee consumption and health: umbrella review of meta-analyses of multiple health outcomes", "BMJ", 2017, "https://doi.org/10.1136/bmj.j5024", "10.1136/bmj.j5024", "Umbrella review of observational and intervention syntheses across many outcomes. The 2018 correction changes several numerical values, including the all-cause mortality confidence interval to 0.79-0.88 and the decaffeinated-coffee estimate to 0.89 (0.85-0.93). The authors state that the overall findings are unchanged. Mortality associations do not establish causation.", "systematic_review", "context", novemberCommonReaderResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1136/bmj.j5024",
			"https://doi.org/10.1136/bmj.k194",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fbmj.j5024&rows=100"
		]
	},
	coffeeMortalityModifiers: researchSource("Coffee consumption and all-cause and cause-specific mortality: a meta-analysis by potential modifiers", "European Journal of Epidemiology", 2019, "https://doi.org/10.1007/s10654-019-00524-3", "10.1007/s10654-019-00524-3", "Meta-analysis of 40 observational studies covering 3,852,651 participants. Moderate coffee intake was associated with lower mortality, but lifestyle differences and reverse causation can remain after adjustment. The estimated lowest-risk intake is not a prescribed dose or proof that coffee extends life.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	coffeeTimingCohort: researchSource("Coffee drinking timing and mortality in US adults", "European Heart Journal", 2025, "https://doi.org/10.1093/eurheartj/ehae871", "10.1093/eurheartj/ehae871", "Observational analysis of 40,725 U.S. NHANES adults, with a separate 1,463-person sample used to validate timing patterns. Morning-pattern coffee drinkers had lower adjusted mortality than nondrinkers; the all-day pattern did not show the same association. These are not randomized timing assignments or evidence that changing coffee time prevents death.", "landmark_study", "context", novemberCommonReaderResearchCheckedAt),
	bmiDiagnosticReview: researchSource("Diagnostic performance of body mass index to identify obesity as defined by body adiposity: a systematic review and meta-analysis", "International Journal of Obesity", 2010, "https://doi.org/10.1038/ijo.2010.5", "10.1038/ijo.2010.5", "Review of 25 articles and 32 samples totaling 31,968 people. Common BMI cutoffs had about 50% sensitivity and 90% specificity for high body-fat percentage, with substantial heterogeneity. These are body-fat classification results, not the accuracy of predicting an individual's future illness.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	anthropometricReview: researchSource("The performance of anthropometric tools to determine obesity: a systematic review and meta-analysis", "Scientific Reports", 2020, "https://doi.org/10.1038/s41598-020-69498-7", "10.1038/s41598-020-69498-7", "Review of 32 studies comparing simple body measurements with body-fat reference methods. BMI sensitivity was about 50% and specificity above 95% in sex-specific analyses. Waist measures also had limitations; the review did not establish one universally superior simple measure or a complete clinical diagnosis.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	sittingDoseResponse: researchSource("Sedentary behaviour and risk of all-cause, cardiovascular and cancer mortality, and incident type 2 diabetes: a systematic review and dose response meta-analysis", "European Journal of Epidemiology", 2018, "https://doi.org/10.1007/s10654-018-0380-1", "10.1007/s10654-018-0380-1", "Synthesis of 34 prospective studies with 1,331,468 unique participants. Greater sitting and television time were associated with mortality and some disease outcomes after physical-activity adjustment. Exposure definitions and outcome relationships differed; the reported bends in dose-response curves are not universal safe-time cutoffs.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	sittingDeviceHarmonized: researchSource("Dose-response associations between accelerometry measured physical activity and sedentary time and all cause mortality: systematic review and harmonised meta-analysis", "BMJ", 2019, "https://doi.org/10.1136/bmj.l4570", "10.1136/bmj.l4570", "Harmonized observational analysis of eight cohorts and 36,383 mostly middle-aged or older adults. More accelerometer-defined sedentary time was associated with higher mortality. Low movement recorded by a device is not an exact measure of sitting posture, and illness or residual confounding can influence the association.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	multivitaminUspstfReview: researchSource("Vitamin and Mineral Supplements for the Primary Prevention of Cardiovascular Disease and Cancer", "JAMA", 2022, "https://doi.org/10.1001/jama.2021.15650", "10.1001/jama.2021.15650", "USPSTF evidence review of 84 studies across multiple vitamin and mineral interventions. The multivitamin evidence was limited; four trials contributed to a small cancer-incidence signal, which is distinct from a mortality benefit. Findings concern adults without known deficiencies, not all clinical uses of supplements.", "systematic_review", "supports", novemberCommonReaderResearchCheckedAt),
	multivitaminCohorts: researchSource("Multivitamin Use and Mortality Risk in 3 Prospective US Cohorts", "JAMA Network Open", 2024, "https://doi.org/10.1001/jamanetworkopen.2024.18729", "10.1001/jamanetworkopen.2024.18729", "Three prospective U.S. cohorts totaling 390,124 generally healthy adults, with follow-up up to 27 years, found no lower mortality among daily multivitamin users. Supplement use was self-reported and not randomized. An adjusted hazard ratio above one does not by itself establish that multivitamins caused deaths.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	blueGlassesCochrane: researchSource("Blue-light filtering spectacle lenses for visual performance, sleep, and macular health in adults", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.cd013244.pub2", "10.1002/14651858.cd013244.pub2", "Cochrane review of 17 trials across several eye and sleep outcomes. Sleep-quality results came from six trials with 148 participants and were inconsistent, with very low certainty. The review did not pool these heterogeneous sleep findings or establish that every type of lens is ineffective.", "systematic_review", "debate", novemberCommonReaderResearchCheckedAt),
	blueGlassesActigraphy: researchSource("Efficacy of blue-light blocking glasses on actigraphic sleep outcomes: a systematic review and meta-analysis of randomized controlled crossover trials", "Frontiers in Neurology", 2025, "https://doi.org/10.3389/fneur.2025.1699303", "10.3389/fneur.2025.1699303", "Meta-analysis of three double-blind crossover trials with 49 adults. Estimated effects on actigraphy-derived sleep duration, onset, efficiency and waking were not statistically significant and had wide confidence intervals. This small evidence base does not demonstrate equivalence or a guaranteed benefit.", "meta_analysis", "debate", novemberCommonReaderResearchCheckedAt),
	saunaMortalityCohort: researchSource("Sauna bathing is associated with reduced cardiovascular mortality and improves risk prediction in men and women: a prospective cohort study", "BMC Medicine", 2018, "https://doi.org/10.1186/s12916-018-1198-0", "10.1186/s12916-018-1198-0", "Finnish observational cohort of 1,688 adults aged 53-74, with 181 cardiovascular deaths over a median 15 years. More frequent sauna use was associated with fewer cardiovascular deaths after adjustment. Sauna habits were measured at baseline, and confounding or selection can remain; this is not randomized mortality evidence.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	saunaExerciseTrial: researchSource("Effects of regular sauna bathing in conjunction with exercise on cardiovascular function: a multi-arm, randomized controlled trial", "American Journal of Physiology-Regulatory, Integrative and Comparative Physiology", 2022, "https://doi.org/10.1152/ajpregu.00076.2022", "10.1152/ajpregu.00076.2022", "Eight-week randomized trial of 47 sedentary adults with cardiovascular risk factors. Adding sauna after exercise improved some measured fitness, blood-pressure and cholesterol outcomes relative to exercise alone. The combined intervention and short follow-up do not establish fewer cardiovascular deaths or the effects of sauna alone.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	saunaCadTrial: researchSource("Finnish sauna bathing and vascular health of adults with coronary artery disease: a randomized controlled trial", "Journal of Applied Physiology", 2023, "https://doi.org/10.1152/japplphysiol.00322.2023", "10.1152/japplphysiol.00322.2023", "Eight-week randomized trial of 41 adults with stable coronary artery disease. Sauna use changed heat adaptation but did not improve the main vascular-function and blood-pressure measures compared with control. The narrow clinical sample and short duration do not settle long-term mortality effects.", "landmark_study", "debate", novemberCommonReaderResearchCheckedAt),
	saunaTrialMeta: researchSource("Non-acute effects of passive heating interventions on cardiometabolic risk and vascular health: systematic review and meta-analysis of randomized controlled trials", "American Journal of Preventive Cardiology", 2025, "https://doi.org/10.1016/j.ajpc.2025.101082", "10.1016/j.ajpc.2025.101082", "Review of 20 randomized trials of passive heating, lasting 2-15 weeks. It combined saunas, hot-water bathing, hot yoga and local heating, not sauna alone. Most pooled cardiometabolic outcomes did not improve; possible systolic-pressure benefits were subgroup findings with heterogeneous, limited evidence. Death prevention was not established.", "meta_analysis", "debate", novemberCommonReaderResearchCheckedAt),
	coldWaterWellbeingReview: researchSource("Effects of cold-water immersion on health and wellbeing: A systematic review and meta-analysis", "PLOS ONE", 2025, "https://doi.org/10.1371/journal.pone.0317615", "10.1371/journal.pone.0317615", "Review of 11 trials and 3,177 participants across cold baths and showers. Some stress, sleep and quality-of-life findings were time-specific, and the large shower study's sickness-absence result is not a direct measure of immunity. Sparse outcomes and limited populations prevent a firm conclusion about lasting mental-health benefit.", "meta_analysis", "debate", novemberCommonReaderResearchCheckedAt),
	coldWaterPsychologyReview: researchSource("Cold-water exposure and psychological outcomes in adults: a systematic review and meta-analysis", "Frontiers in Physiology", 2026, "https://doi.org/10.3389/fphys.2026.1926423", "10.3389/fphys.2026.1926423", "Review of 13 studies and 4,105 adults across randomized, nonrandomized and uncontrolled designs. Several favorable estimates weakened in controlled-only analyses, and much of the evidence had substantial risk of bias. It does not establish cold exposure as a stand-alone psychiatric treatment; published online September 16, 2026.", "meta_analysis", "debate", novemberCommonReaderResearchCheckedAt),
	screenLanguageMeta: researchSource("Associations Between Screen Use and Child Language Skills", "JAMA Pediatrics", 2020, "https://doi.org/10.1001/jamapediatrics.2020.0327", "10.1001/jamapediatrics.2020.0327", "Review of 42 studies with 18,905 children, with eligible ages extending through 12 years. More screen time and background TV correlated with lower language scores; educational content and co-viewing correlated with higher scores. These small associations do not isolate screen exposure from family context or establish causation.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	screenContextsMeta: researchSource("Early Childhood Screen Use Contexts and Cognitive and Psychosocial Outcomes", "JAMA Pediatrics", 2024, "https://doi.org/10.1001/jamapediatrics.2024.2620", "10.1001/jamapediatrics.2024.2620", "Review of 100 studies involving 176,742 children aged 0-5.99 years; 64 observational studies entered meta-analyses. Outcomes included language within broader cognitive and psychosocial measures. Content, background TV and co-use mattered, but the whole participant total is not a language-only sample or randomized experiment.", "meta_analysis", "context", novemberCommonReaderResearchCheckedAt),
	autismPrevalenceUpdate: researchSource("Global prevalence of autism: A systematic review update", "Autism Research", 2022, "https://doi.org/10.1002/aur.2696", "10.1002/aur.2696", "Systematic update of 99 prevalence estimates from 71 studies, searched in 2021. Estimates varied widely with case definitions, awareness, identification and services. Its median childhood estimate is not a current count for every country, and the review does not quantify one universal cause of the increase.", "systematic_review", "supports", novemberCommonReaderResearchCheckedAt),
	autismReportingChanges: researchSource("Explaining the Increase in the Prevalence of Autism Spectrum Disorders", "JAMA Pediatrics", 2015, "https://doi.org/10.1001/jamapediatrics.2014.1893", "10.1001/jamapediatrics.2014.1893", "Danish registry study of 677,915 children born in 1980-1991. Changed diagnostic criteria and inclusion of outpatient records together explained an estimated 60% of the reported increase, with a 33%-87% interval. This historical national estimate cannot be transferred to today's worldwide trends. Journal publication was in 2015.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	acetaminophenUmbrella: researchSource("Maternal paracetamol (acetaminophen) use during pregnancy and risk of autism spectrum disorder and attention deficit/hyperactivity disorder in offspring: umbrella review of systematic reviews", "BMJ", 2025, "https://doi.org/10.1136/bmj-2025-088141", "10.1136/bmj-2025-088141", "Umbrella review of nine reviews containing overlapping primary studies. Confidence in the reviewed syntheses was low to critically low; small associations in conventional analyses did not persist in the available sibling comparisons. Counting reviews as independent experiments would exaggerate the evidence base.", "systematic_review", "supports", novemberCommonReaderResearchCheckedAt),
	acetaminophenSiblingStudy: researchSource("Acetaminophen Use During Pregnancy and Children’s Risk of Autism, ADHD, and Intellectual Disability", "JAMA", 2024, "https://doi.org/10.1001/jama.2024.3172", "10.1001/jama.2024.3172", "Swedish register cohort of 2,480,797 children. A small autism association in conventional models disappeared in sibling comparisons: hazard ratio 0.98 (0.93-1.04). Family comparisons reduce shared confounding but remain observational and can be affected by exposure measurement and factors that differ between pregnancies.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	acetaminophenSiblingSynthesis: researchSource("Prenatal Acetaminophen (Paracetamol) Use and the Risk of Autism and/or Attention-Deficit/Hyperactivity Disorder Among Sibling-Matched Cohorts", "JAMA Internal Medicine", 2026, "https://doi.org/10.1001/jamainternmed.2026.2215", "10.1001/jamainternmed.2026.2215", "Primary Hong Kong cohort study, not a meta-analysis. Final sibling-matched samples included 124,333 children for autism and 97,285 for ADHD. The autism hazard ratio was 1.00 (0.91-1.11). The initial 708,020 mother-child pairs are not the sibling-analysis denominator; dispensing records may miss nonprescription use.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	acetaminophen2026Meta: researchSource("Prenatal paracetamol exposure and child neurodevelopment: a systematic review and meta-analysis", "The Lancet Obstetrics, Gynaecology, &amp; Women's Health", 2026, "https://doi.org/10.1016/s3050-5038(25)00211-0", "10.1016/s3050-5038(25)00211-0", "Systematic review of 43 studies, with 17 entering meta-analysis. The sibling-comparison autism estimate was an odds ratio of 0.98 (0.93-1.03), not evidence of a clinically important increase. Exposure details and overlapping cohorts limit inference, and this is not proof of zero risk at every dose or duration.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	acetaminophenNavigationGuide: researchSource("Evaluation of the evidence on acetaminophen use and neurodevelopmental disorders using the Navigation Guide methodology", "Environmental Health", 2025, "https://doi.org/10.1186/s12940-025-01208-0", "10.1186/s12940-025-01208-0", "Qualitative systematic review of 46 studies that judged the literature consistent with an association between prenatal acetaminophen exposure and neurodevelopmental outcomes. It did not pool a common effect because studies differed substantially. Association, confounding and the distinction between autism and broader outcomes remain central to interpretation.", "systematic_review", "debate", novemberCommonReaderResearchCheckedAt),
	forestOffsetEvaluation: researchSource("Action needed to make carbon offsets from forest conservation work for climate change mitigation", "Science", 2023, "https://doi.org/10.1126/science.ade3535", "10.1126/science.ade3535", "Synthetic-control evaluation of 26 avoided-deforestation project sites in six countries. Many did not show significant reductions relative to estimated counterfactuals, and claimed baselines often overstated benefits. These findings concern selected voluntary forest-conservation projects, not every offset type.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	forestOffsetPartialGains: researchSource("Tropical forest carbon offsets deliver partial gains amid persistent over-crediting", "Science", 2025, "https://doi.org/10.1126/science.adw4094", "10.1126/science.adw4094", "Synthetic-control assessment of 52 voluntary REDD+ projects in 12 tropical countries. Nineteen percent met reported emissions targets, while an estimated 13.2% of tradable credits was supported by counterfactual analysis. Those are different denominators. The study found partial benefits alongside over-crediting; counterfactual estimates are uncertain.", "landmark_study", "debate", novemberCommonReaderResearchCheckedAt),
	windCollisionReview: researchSource("Understanding bird collisions at wind farms: An updated review on the causes and possible mitigation strategies", "Biological Conservation", 2014, "https://doi.org/10.1016/j.biocon.2014.08.017", "10.1016/j.biocon.2014.08.017", "Review compiling 217 documents and including 111, covering species, site and turbine features associated with bird collisions. Carcass detection, scavenging and search coverage affect mortality estimates. The paper supports real collision risk while emphasizing variation and limits on extrapolating a single worldwide rate.", "technical_reference", "supports", novemberCommonReaderResearchCheckedAt),
	windMitigationReview: researchSource("Mitigating wildlife collisions with wind turbines: A review of techniques, evidence, knowledge gaps and avenues for future research", "Renewable and Sustainable Energy Reviews", 2026, "https://doi.org/10.1016/j.rser.2026.117333", "10.1016/j.rser.2026.117333", "Review of 52 collision-mitigation tools or strategies for birds and bats; fewer than half had independent testing data. Detection ability, actual fatality reduction and species coverage are different outcomes. The December 2026 issue was already discussed by the authors' university on August 12, 2026; no single measure is proven suitable for every site.", "technical_reference", "context", novemberCommonReaderResearchCheckedAt),
	contrailLifetimeReview: researchSource("On the Lifetimes of Persistent Contrails and Contrail Cirrus", "Journal of Geophysical Research: Atmospheres", 2025, "https://doi.org/10.1029/2025jd044488", "10.1029/2025jd044488", "Analysis of ice-cloud processes and lifetime modeling, with incomplete observational lifetime data. Humidity, air motion, ice growth and settling affect persistence. It supports the physical possibility of long-lived contrail cirrus, not a precise lifetime prediction or chemical identification from a photograph.", "technical_reference", "supports", novemberCommonReaderResearchCheckedAt),
	contrailLifeCycle: researchSource("On the Life Cycle of Individual Contrails and Contrail Cirrus", "Meteorological Monographs", 2017, "https://doi.org/10.1175/amsmonographs-d-16-0005.1", "10.1175/amsmonographs-d-16-0005.1", "Review of contrail formation and evolution using observations, remote sensing and models. Aircraft emissions can seed ice clouds whose persistence and spread depend on surrounding air and winds. Formation conditions, cloud lifetime and climate effects are distinct questions.", "technical_reference", "supports", novemberCommonReaderResearchCheckedAt),
	tariffPricesWelfare: researchSource("The Impact of the 2018 Tariffs on Prices and Welfare", "Journal of Economic Perspectives", 2019, "https://doi.org/10.1257/jep.33.4.187", "10.1257/jep.33.4.187", "Analysis of the 2018 U.S. tariffs finding strong pass-through into domestic import prices and costs borne by domestic importers and consumers in that setting. The estimates concern a particular policy episode and period, not a guaranteed response to every future tariff or exchange-rate change.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	tariffRetailJournal: researchSource("Tariff Pass-Through at the Border and at the Store: Evidence from US Trade Policy", "American Economic Review: Insights", 2021, "https://doi.org/10.1257/aeri.20190536", "10.1257/aeri.20190536", "Peer-reviewed 2021 journal version of the earlier NBER paper. Border prices showed high tariff pass-through, while retail-price changes were more limited, consistent with reduced retailer margins. It is one study, not independent evidence from both working and journal versions; border incidence is not identical to the household checkout bill.", "landmark_study", "supports", novemberCommonReaderResearchCheckedAt),
	warningsMeta: researchSource("A Meta-Analysis of the Efficacy of Trigger Warnings, Content Warnings, and Content Notes", "Clinical Psychological Science", 2024, "https://doi.org/10.1177/21677026231186625", "10.1177/21677026231186625", "Meta-analysis finding little average effect on emotional responses after negative material or on educational outcomes, with increased anticipatory affect and mixed avoidance results. Published online in 2023 and in the 2024 journal issue. The findings do not settle every clinical population or the value of informed choice.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	warningsExperimental: researchSource("Trigger Warnings Are Trivially Helpful at Reducing Negative Affect, Intrusive Thoughts, and Avoidance", "Clinical Psychological Science", 2019, "https://doi.org/10.1177/2167702619827018", "10.1177/2167702619827018", "Six experiments with college students and internet users, summarized within the paper, found trivial average effects on negative affect, intrusive thoughts and avoidance. Similar patterns appeared among participants reporting trauma histories, but this was not a trial of trauma treatment or every real-world warning policy.", "landmark_study", "context", novemberCommonReaderResearchCheckedAt),
	iatPredictiveMeta: researchSource("Understanding and using the Implicit Association Test: III. Meta-analysis of predictive validity.", "Journal of Personality and Social Psychology", 2009, "https://doi.org/10.1037/a0015575", "10.1037/a0015575", "Meta-analysis of 122 reports and 184 samples, including behavioral, judgment and physiological outcomes. Average IAT correlation was 0.274; parallel explicit measures averaged 0.361. IAT superiority appeared in selected interracial comparisons, not across all measures. A pooled correlation is not an individual diagnostic accuracy estimate.", "meta_analysis", "supports", novemberCommonReaderResearchCheckedAt),
	iatBehaviorMeta: researchSource("Relationship between the Implicit Association Test and intergroup behavior: A meta-analysis.", "American Psychologist", 2019, "https://doi.org/10.1037/amp0000364", "10.1037/amp0000364", "Meta-analysis of 217 reports and 36,071 participants found heterogeneous links between IATs and intergroup behavior. The standardized unique contribution of 0.14 is a regression coefficient, not the overall correlation. Methodological alignment and measurement error matter; these findings do not validate a pass/fail test of an individual's character.", "meta_analysis", "debate", novemberCommonReaderResearchCheckedAt),
	iatCriticalMeta: researchSource("Predicting ethnic and racial discrimination: A meta-analysis of IAT criterion studies.", "Journal of Personality and Social Psychology", 2013, "https://doi.org/10.1037/a0032734", "10.1037/a0032734", "Critical meta-analysis of interracial and interethnic criterion studies found weak prediction for most outcome categories and no general advantage over explicit measures. Its conclusions concern those criterion studies, rather than every use of implicit measures.", "meta_analysis", "debate", novemberCommonReaderResearchCheckedAt),
	autismCdcSurveillance: researchSource("Prevalence and Early Identification of Autism Spectrum Disorder Among Children Aged 4 and 8 Years: Autism and Developmental Disabilities Monitoring Network, 16 Sites, United States, 2022", "MMWR. Surveillance Summaries", 2025, "https://doi.org/10.15585/mmwr.ss7402a1", "10.15585/mmwr.ss7402a1", "CDC surveillance report published in 2025 using 2022 records from 16 U.S. communities. About 1 in 31 eight-year-olds was identified with autism in those sites. The selected sites are not nationally representative. An unchanged-boundary subset also showed an increase, so site expansion alone cannot explain the trend.", "landmark_study", "context", novemberCommonReaderResearchCheckedAt),
	bmiNice: researchSource("Identifying and assessing overweight, obesity and central adiposity", "National Institute for Health and Care Excellence", 2025, "https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity", "", "NICE NG246, published in 2025 and amended in 2026, uses BMI alongside other assessment and, in many adults, waist-to-height ratio. This is clinical risk-assessment guidance in England, not proof that a waist measure perfectly identifies total body-fat percentage.", "guideline", "context", novemberCommonReaderResearchCheckedAt),
	coldWaterSafety: researchSource("Cold water swimming: is it bad for your heart?", "British Heart Foundation", undefined, "https://www.bhf.org.uk/informationsupport/heart-matters-magazine/activity/cold-water-swimming", "", "Cardiac-nurse information explains that sudden cold exposure can increase breathing, heart rate and blood pressure. It supplies safety context rather than evidence that cold plunges treat mental illness.", "technical_reference", "context", novemberCommonReaderResearchCheckedAt),
	acetaminophenWho: researchSource("WHO statement on autism-related issues", "World Health Organization Regional Office for Europe", 2025, "https://www.who.int/europe/news/item/24-09-2025-who-statement-on-autism-related-issues", "", "September 24, 2025 statement says a causal link or consistent association between prenatal acetaminophen and autism has not been established. It is a public health statement, not a new independent trial or an individualized medication recommendation.", "context", "context", novemberCommonReaderResearchCheckedAt),
	acetaminophenFda: researchSource("FDA Responds to Evidence of Possible Association Between Autism and Acetaminophen Use During Pregnancy", "U.S. Food and Drug Administration", 2025, "https://www.fda.gov/news-events/press-announcements/fda-responds-evidence-possible-association-between-autism-and-acetaminophen-use-during-pregnancy", "", "September 22, 2025 announcement initiated a labeling process over a possible association. It explicitly says a causal relationship is unestablished, notes contrary studies and recognizes risks from high fever. It records the announced U.S. regulatory position.", "context", "debate", novemberCommonReaderResearchCheckedAt),
	acetaminophenEma: researchSource("Use of paracetamol during pregnancy unchanged in the EU", "European Medicines Agency", 2026, "https://www.ema.europa.eu/en/news/use-paracetamol-during-pregnancy-unchanged-eu", "", "January 20, 2026 update considers the newer systematic review and retains EU advice allowing clinically needed paracetamol use during pregnancy. It directs medication questions to a healthcare professional. This guidance differs in emphasis from the 2025 U.S. FDA announcement.", "guideline", "context", novemberCommonReaderResearchCheckedAt),
	contrailFaa: researchSource("Contrails", "Federal Aviation Administration", 2025, "https://www.faa.gov/contrails", "", "FAA explanation describes contrails as ice-crystal clouds that can persist and spread in cold, humid conditions. It distinguishes normal contrail physics from unsupported inferences about spraying. It is explanatory agency information, not a measurement of the contents of any particular trail.", "technical_reference", "context", novemberCommonReaderResearchCheckedAt)
};

export const novemberCommonReaderClaims = [
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "is-coffee-drinking-linked-to-a-longer-life",
		title: "Is coffee drinking linked to a longer life?",
		bottomLine: "Yes, in many observational studies. Coffee drinkers often had lower death rates, but those studies do not show that starting coffee will extend your life.",
		stableCore: [
			"Large reviews find a similar link across several populations, including people who drink decaffeinated coffee.",
			"The link can reflect other habits, health differences or people changing their coffee use when they become ill.",
			"A 2025 U.S. study found different results for morning-only and all-day drinking patterns, adding uncertainty about what drives the association."
		],
		openQuestions: [
			"How much of the association comes from coffee itself rather than other differences between drinkers and nondrinkers?",
			"Do preparation, additives and drinking patterns change the relationship in different populations?"
		],
		whatWouldChangeMinds: [
			"Long-term evidence that better separates coffee intake from health and lifestyle differences, with consistent results across independent populations."
		],
		misconceptions: [
			"The lowest-risk intake in an observational curve is not a recommended daily dose or proof that more coffee is better."
		],
		editorSummary: "Coffee's link with longevity is fairly consistent; its cause is less certain.",
		population: "Adults in prospective cohorts and research syntheses; not a pregnancy safety assessment.",
		scope: "Include coffee consumption and all-cause mortality, while distinguishing observational associations from intervention effects.",
		excludedEvidence: [
			"Exclude caffeine-performance studies, pregnancy dosing advice and claims that an observational intake curve prescribes a longevity treatment."
		],
		uncertainty: "Residual confounding, changing habits, preparation differences and overlapping studies limit causal inference.",
		sources: [sources.coffeeMortalityModifiers, sources.coffeeUmbrella, sources.coffeeTimingCohort]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		slug: "how-well-does-bmi-measure-body-fat",
		title: "How well does BMI measure body fat?",
		bottomLine: "BMI is a useful first check, but it does not measure body fat directly. People with the same BMI can have different amounts and distributions of fat.",
		stableCore: [
			"BMI uses weight and height, so it cannot separate fat from muscle or show where fat is stored.",
			"Reviews comparing BMI with body-fat measurements find that common cutoffs miss many people with higher body-fat levels.",
			"Clinical assessment can add waist measurements, health history and other findings. Predicting health risk is a different task from measuring body-fat percentage."
		],
		openQuestions: [
			"Which practical combinations of measurements work best across age, sex, ancestry and body composition?",
			"How much do extra measurements improve health decisions beyond identifying body fat?"
		],
		whatWouldChangeMinds: [
			"Large, representative comparisons showing that a practical measurement method is accurate and improves decisions across different groups."
		],
		misconceptions: [
			"A BMI category alone neither measures a person's body-fat percentage nor provides a complete diagnosis of their health."
		],
		editorSummary: "BMI is inexpensive and useful for screening, with important limits for individual assessment.",
		population: "Adults assessed with BMI and body-composition reference methods; clinical guidance from England.",
		scope: "Include accuracy for identifying body fat and distinguish it from disease prediction and clinical diagnosis.",
		excludedEvidence: [
			"Exclude applying adult cutoffs to children or treating a body-fat classification study as a complete assessment of an individual's health."
		],
		uncertainty: "Performance depends on cutoffs, reference methods and population; simple waist measures also have limitations.",
		sources: [sources.anthropometricReview, sources.bmiDiagnosticReview, sources.bmiNice]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		slug: "is-more-sitting-linked-to-a-higher-risk-of-early-death",
		title: "Is more sitting linked to a higher risk of early death?",
		bottomLine: "Yes. People who spend more time sitting or being inactive tend to have higher death rates. The size of the link varies with physical activity, health and how sitting is measured.",
		stableCore: [
			"Prospective studies associate more sedentary time with higher mortality, including analyses that account for physical activity.",
			"Device studies support a similar pattern, but a device's low-movement reading is not an exact measure of sitting posture.",
			"Poor health can lead to more sitting as well as earlier death, so observational estimates do not isolate a single cause."
		],
		openQuestions: [
			"How much risk changes when sitting is replaced with standing, light movement or more vigorous activity?",
			"Which estimates best apply to younger adults and people with disabilities or chronic illness?"
		],
		whatWouldChangeMinds: [
			"Better long-term studies of changes in daily movement that account for existing illness and use comparable exposure measurements."
		],
		misconceptions: [
			"A bend in one study's risk curve is not a universal number of safe sitting hours."
		],
		editorSummary: "Sitting time and physical activity are related, but they are measured and analyzed as different exposures.",
		population: "Adult prospective cohorts, with device evidence concentrated in middle-aged and older adults.",
		scope: "Include sedentary time and all-cause mortality; distinguish sitting, television viewing and device-defined low movement.",
		excludedEvidence: [
			"Exclude treating hip-device inactivity as exact sitting posture or applying one observational time threshold to every person."
		],
		uncertainty: "Reverse causation, imperfect activity adjustment and different exposure definitions affect the estimates.",
		sources: [sources.sittingDeviceHarmonized, sources.sittingDoseResponse]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-daily-multivitamins-help-healthy-adults-live-longer",
		title: "Do daily multivitamins help generally healthy adults live longer?",
		bottomLine: "They have not been shown to help generally healthy adults live longer. This conclusion does not cover treating a deficiency or supplements prescribed for a specific need.",
		stableCore: [
			"A USPSTF evidence review found limited evidence of a mortality benefit from multivitamins in adults without known deficiencies.",
			"Three large U.S. cohorts found no lower death rate among daily users, even with long follow-up.",
			"A small cancer-incidence signal in some trials is a different outcome from living longer."
		],
		openQuestions: [
			"Could longer randomized trials find benefits or harms in particular groups?",
			"How do different formulations and changes in use over time affect the results?"
		],
		whatWouldChangeMinds: [
			"Well-conducted, long-term randomized evidence showing a meaningful mortality difference in adults with clearly described nutritional status."
		],
		misconceptions: [
			"Lack of a demonstrated longevity benefit does not make treatment of a diagnosed deficiency unnecessary."
		],
		editorSummary: "The evidence for a daily multivitamin as a longevity measure remains limited.",
		population: "Generally healthy adults without known deficiencies; not pregnancy or prescribed supplementation.",
		scope: "Include multivitamin use and all-cause mortality, keeping cancer incidence and other outcomes separate.",
		excludedEvidence: [
			"Exclude deficiency treatment, pregnancy supplementation and cognition studies as direct answers to the mortality question."
		],
		uncertainty: "Trial duration, formulation differences and confounding in self-selected supplement users leave uncertainty.",
		band: "mixed",
		certainty: "moderate",
		sources: [sources.multivitaminUspstfReview, sources.multivitaminCohorts]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "sleep-and-circadian-health",
		slug: "do-blue-light-glasses-improve-sleep",
		title: "Do blue-light glasses improve sleep?",
		bottomLine: "A reliable sleep benefit has not been established. Some small trials report improvements, while others find little difference, and the estimates remain imprecise.",
		stableCore: [
			"The Cochrane review found inconsistent sleep-quality results across six small trials.",
			"A later analysis of three crossover trials found no clear improvement in device-measured sleep outcomes.",
			"Different lens filters, timing and participant sleep problems make the findings hard to combine."
		],
		openQuestions: [
			"Do particular filters help specific groups under well-defined lighting conditions?",
			"Would larger trials agree on both reported sleep quality and objective sleep measurements?"
		],
		whatWouldChangeMinds: [
			"Larger, well-controlled trials with measured light exposure, specified lenses and consistent sleep outcomes."
		],
		misconceptions: [
			"Evidence that evening light affects body clocks does not by itself prove that every blue-light lens improves sleep."
		],
		editorSummary: "The proposed mechanism is plausible, but trials have not established a dependable benefit.",
		population: "Adults in short lens trials, including participants with different sleep and mental-health conditions.",
		scope: "Include blue-light-filtering spectacle trials reporting sleep outcomes rather than assuming benefits from the light mechanism alone.",
		excludedEvidence: [
			"Exclude eye-strain, visual-acuity and retinal claims as substitutes for measured sleep benefit."
		],
		uncertainty: "Small samples, heterogeneous filters and short follow-up produce low-certainty sleep evidence.",
		band: "mixed",
		certainty: "low",
		sources: [sources.blueGlassesCochrane, sources.blueGlassesActigraphy]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		slug: "does-regular-sauna-use-prevent-heart-related-deaths",
		title: "Does regular sauna use prevent heart-related deaths?",
		bottomLine: "That has not been established. Regular sauna users had fewer heart-related deaths in some long-term studies, but researchers have not shown that sauna use caused the difference.",
		stableCore: [
			"A Finnish cohort linked more frequent sauna use with fewer cardiovascular deaths after adjustment for several risk factors.",
			"Short randomized trials measure blood pressure, fitness or vascular function rather than long-term deaths, and their results differ.",
			"A 2025 review combined several heating methods and found limited, heterogeneous evidence; those results cannot be assigned to sauna alone."
		],
		openQuestions: [
			"Would larger, longer controlled studies show fewer cardiovascular events rather than changes in short-term markers?",
			"How do baseline health, sauna practices and accompanying exercise affect both benefit and safety?"
		],
		whatWouldChangeMinds: [
			"Independent long-term evidence that separates sauna from other habits and shows fewer clinically important cardiovascular events."
		],
		misconceptions: [
			"A lower death rate among existing sauna users is not proof that prescribing sauna use prevents death."
		],
		editorSummary: "Observational mortality findings are promising, while causal evidence remains limited.",
		population: "Finnish middle-aged and older cohorts and small adult trials, including people with cardiovascular risk or stable coronary disease.",
		scope: "Include cardiovascular mortality associations and distinguish them from short-term biomarker trials and combined exercise interventions.",
		excludedEvidence: [
			"Exclude treating short-term blood-pressure changes or mixed passive-heating trials as direct proof that sauna alone prevents cardiovascular deaths."
		],
		uncertainty: "Healthy-user confounding, small trials, different heating methods and limited event follow-up constrain conclusions.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.saunaTrialMeta,
			sources.saunaMortalityCohort,
			sources.saunaExerciseTrial,
			sources.saunaCadTrial
		]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "do-cold-plunges-improve-mental-wellbeing",
		title: "Do cold plunges improve mental well-being?",
		bottomLine: "Research has not established a lasting mental-health benefit. Some studies suggest short-term effects, but results are inconsistent and many studies are small or uncontrolled.",
		stableCore: [
			"Reviews find scattered signals for stress, sleep or well-being, with different effects at different measurement times.",
			"Several favorable estimates weaken when analyses are limited to controlled studies.",
			"Cold exposure can cause cold shock and stress the heart; it is not an established replacement for mental-health treatment."
		],
		openQuestions: [
			"Are reported benefits due to cold exposure, expectations, exercise, social contact or a combination?",
			"Which effects last, and how do benefits and harms differ across populations?"
		],
		whatWouldChangeMinds: [
			"Larger controlled studies with durable, clinically meaningful outcomes and clear reporting of adverse effects."
		],
		misconceptions: [
			"Feeling alert after a plunge is not evidence that it treats depression or provides a lasting improvement in well-being."
		],
		editorSummary: "Possible short-term effects coexist with substantial uncertainty and meaningful safety risks.",
		population: "Adults studied with cold showers, immersion or winter swimming; mostly limited and selected samples.",
		scope: "Include psychological outcomes from controlled and observational cold-exposure studies, with design and safety differences explicit.",
		excludedEvidence: [
			"Exclude sports-recovery outcomes and sickness absence as proof of psychiatric treatment efficacy or improved immunity."
		],
		uncertainty: "Expectations, uncontrolled designs, mixed activities and sparse adverse-event data limit interpretation.",
		band: "unclear",
		certainty: "low",
		sources: [sources.coldWaterPsychologyReview, sources.coldWaterWellbeingReview, sources.coldWaterSafety]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-does-childhood-screen-use-relate-to-language-development",
		title: "How does childhood screen use relate to language development?",
		bottomLine: "More screen time and background TV are linked to weaker language skills on average. Content and watching with an adult also matter, and these associations do not establish a single effect for every child.",
		stableCore: [
			"A language-focused review found small negative associations with screen quantity and positive associations with educational content and co-viewing.",
			"A newer early-childhood review also found that context matters, but it combined language with other developmental outcomes.",
			"Family circumstances and existing development can affect both screen use and language, making cause and effect difficult to separate."
		],
		openQuestions: [
			"Which content and forms of adult interaction support language at different ages?",
			"How much do associations change when studies account for family context and earlier language skills?"
		],
		whatWouldChangeMinds: [
			"Longer, better-controlled evidence that separates content, co-use and background exposure while measuring language consistently."
		],
		misconceptions: [
			"An average association cannot diagnose an individual child's development or prove that screens caused a language difficulty."
		],
		editorSummary: "Screen quantity alone misses important differences in content, context and family interaction.",
		population: "Children in language studies extending through age 12 and an early-childhood synthesis limited to ages under six.",
		scope: "Include language-specific associations and use broader developmental studies only with their different outcome and age scopes stated.",
		excludedEvidence: [
			"Exclude treating a broad cognitive-outcome sample as language-only evidence or assuming that co-viewing associations prove an isolated causal effect."
		],
		uncertainty: "Mostly observational designs, parent-reported exposure and varied ages and outcomes leave causal uncertainty.",
		band: "mixed",
		certainty: "moderate",
		sources: [sources.screenLanguageMeta, sources.screenContextsMeta]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "why-are-more-children-being-identified-as-autistic",
		title: "Why are more children being identified as autistic?",
		bottomLine: "Broader definitions, greater awareness and changes in assessment and records explain part of the rise. The contribution of each factor varies, and recorded diagnoses do not reveal a single underlying cause.",
		stableCore: [
			"International prevalence estimates vary with definitions, identification methods, access to services and the populations studied.",
			"A historical Danish study showed that diagnostic and reporting changes explained much of the increase in its specific cohort.",
			"CDC's 2025 report identified autism in about 1 in 31 eight-year-olds in 16 selected U.S. communities using 2022 records; those sites are not nationally representative."
		],
		openQuestions: [
			"How much of each recent increase reflects identification, changing access or underlying occurrence?",
			"Can comparable long-term measurements separate these factors across populations and levels of support need?"
		],
		whatWouldChangeMinds: [
			"Repeated population studies using comparable definitions, case-finding methods and access measures over time."
		],
		misconceptions: [
			"A rise in identified prevalence does not by itself identify its cause or show that one factor explains every country."
		],
		editorSummary: "Identification has changed substantially, while the full reasons for rising recorded prevalence remain unresolved.",
		population: "Children in international prevalence studies, a historical Danish registry cohort and selected U.S. surveillance communities.",
		scope: "Include changes in identified childhood autism prevalence, keeping surveillance year, population coverage and reporting practices explicit.",
		excludedEvidence: [
			"Exclude extrapolating Denmark's historical 60% estimate worldwide or treating selected ADDM sites as a nationally representative U.S. survey."
		],
		uncertainty: "Definitions, services, site coverage and incomplete records complicate comparisons; identification changes do not explain every remaining question.",
		sources: [sources.autismPrevalenceUpdate, sources.autismReportingChanges, sources.autismCdcSurveillance]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-acetaminophen-use-during-pregnancy-cause-autism",
		title: "Does acetaminophen use during pregnancy cause autism?",
		bottomLine: "Current evidence does not establish that acetaminophen use during pregnancy causes autism. Large sibling-comparison studies have not found the increase reported in some other analyses.",
		stableCore: [
			"Some observational studies find an association, but pain, fever, family factors and exposure measurement can affect the result.",
			"Large Swedish and Hong Kong sibling studies and a 2026 synthesis found no increased autism association in the sibling comparisons.",
			"Regulatory advice differs in emphasis: the U.S. FDA flagged a possible association in 2025 while acknowledging unproven causation, and the EMA retained EU recommendations in 2026."
		],
		openQuestions: [
			"How well do records capture dose, duration, nonprescription use and the reasons a medicine was taken?",
			"Could effects differ in poorly measured exposure patterns that current family-comparison studies cannot resolve?"
		],
		whatWouldChangeMinds: [
			"Consistent evidence that addresses family confounding, treatment indications and exposure measurement across independent populations."
		],
		misconceptions: [
			"An association is not proof that a medicine caused autism, and a null estimate does not prove zero risk under every pattern of use."
		],
		editorSummary: "The strongest available family comparisons weaken the causal interpretation of earlier associations. Medication decisions during pregnancy require individual clinical advice.",
		population: "Pregnancies and offspring in observational cohorts, sibling comparisons and systematic reviews; regulatory context from the U.S., EU and WHO.",
		scope: "Include prenatal acetaminophen and autism outcomes, separating associations, familial confounding and actual agency recommendations.",
		excludedEvidence: [
			"Exclude inferring autism risk from other neurodevelopmental outcomes, counting overlapping reviews as independent studies or prescribing an individual medication plan."
		],
		uncertainty: "Exposure misclassification, factors differing between pregnancies and incomplete long-term-use data leave uncertainty despite reassuring sibling results.",
		sources: [
			sources.acetaminophen2026Meta,
			sources.acetaminophenUmbrella,
			sources.acetaminophenSiblingStudy,
			sources.acetaminophenSiblingSynthesis,
			sources.acetaminophenNavigationGuide,
			sources.acetaminophenWho,
			sources.acetaminophenFda,
			sources.acetaminophenEma
		]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-forest-protection-carbon-offsets-deliver-their-claimed-savings",
		title: "Do forest-protection carbon offsets deliver their claimed savings?",
		bottomLine: "Many studied projects delivered fewer extra carbon savings than their credits claimed. Some did protect forest, but estimating those additional benefits accurately remains difficult.",
		stableCore: [
			"Evaluations compare projects with an estimate of what would have happened without them, rather than counting every standing tree as a new benefit.",
			"Studies of selected voluntary projects find substantial over-crediting when predicted deforestation baselines are too high.",
			"A newer assessment also found partial climate benefits, so over-crediting and real forest protection can occur together."
		],
		openQuestions: [
			"How well do comparison areas represent what would otherwise have happened at each project?",
			"How do leakage, later forest loss and changing baseline methods affect the durability of credited benefits?"
		],
		whatWouldChangeMinds: [
			"Independent evaluations showing credible additional protection, conservative baselines and durable benefits across representative projects."
		],
		misconceptions: [
			"Evidence of over-crediting in avoided-deforestation projects does not establish that every kind of carbon offset has zero value."
		],
		editorSummary: "The main dispute is how much extra protection credits represent, with large differences among projects.",
		population: "Selected voluntary avoided-deforestation projects in tropical countries, evaluated with estimated counterfactual controls.",
		scope: "Include additionality and credit accuracy for forest-protection projects, not all carbon-removal or offset methods.",
		excludedEvidence: [
			"Exclude treating estimated avoided deforestation as directly measured atmospheric carbon removal or generalizing selected project samples to every offset market."
		],
		uncertainty: "Counterfactual baselines, overlapping project samples, leakage and permanence complicate benefit estimates.",
		band: "mixed",
		certainty: "moderate",
		sources: [sources.forestOffsetEvaluation, sources.forestOffsetPartialGains]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-wind-turbines-kill-birds",
		title: "Do wind turbines kill birds?",
		bottomLine: "Yes. Birds can die in collisions with wind turbines. The risk varies greatly by species, location and turbine operation, so one death rate cannot describe every wind farm.",
		stableCore: [
			"Collision risk depends on bird movement and behavior, nearby habitat and the placement and design of turbines.",
			"Finding carcasses is imperfect: scavenging, search coverage and detection affect estimated death rates.",
			"Some mitigation measures reduce collisions in studied settings, but detection success is not the same as preventing deaths and no single approach works everywhere."
		],
		openQuestions: [
			"Which sites and species face population-level effects rather than only isolated collisions?",
			"Which mitigation methods have independent evidence of lasting fatality reductions and acceptable tradeoffs?"
		],
		whatWouldChangeMinds: [
			"Better standardized monitoring and independent comparisons showing how siting and mitigation affect actual mortality across species."
		],
		misconceptions: [
			"Showing that a camera detects birds accurately does not establish that a wind farm prevents collisions."
		],
		editorSummary: "Collision deaths are real; their scale and prevention depend strongly on local conditions.",
		population: "Birds around wind farms, with mitigation reviews also including bats as a separate group.",
		scope: "Include measured collision risk, mortality-estimation limits and mitigation evidence, distinguishing bird and bat outcomes.",
		excludedEvidence: [
			"Exclude transferring bat-deterrent results to birds or treating detection accuracy as a directly measured reduction in deaths."
		],
		uncertainty: "Monitoring biases, site and species variation and limited independent mitigation tests affect rate and population estimates.",
		certainty: "high",
		sources: [sources.windCollisionReview, sources.windMitigationReview]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "can-aircraft-contrails-persist-and-spread",
		title: "Can aircraft contrails persist and spread?",
		bottomLine: "Yes. In cold, moist air, contrails can last for hours and spread into thin clouds. Their persistence depends on conditions at flight altitude.",
		stableCore: [
			"Contrails contain ice crystals formed as aircraft exhaust mixes with cold surrounding air.",
			"When the surrounding air supplies enough moisture, ice crystals can persist and grow rather than quickly disappear.",
			"Winds and other air movements spread the trail, which can become difficult to distinguish from other thin ice clouds."
		],
		openQuestions: [
			"How accurately can models predict an individual trail's lifetime and spreading?",
			"How do incomplete humidity observations affect estimates of contrail-cloud climate effects?"
		],
		whatWouldChangeMinds: [
			"Independent measurements consistently contradicting the observed dependence on ice-cloud formation, humidity and air movement."
		],
		misconceptions: [
			"A persistent or spreading white trail alone does not identify its chemical contents or prove deliberate spraying."
		],
		editorSummary: "Long-lived contrails follow established cloud physics, while precise lifetime forecasts remain difficult.",
		population: "Aircraft contrails and contrail cirrus examined through observations, remote sensing and atmospheric models.",
		scope: "Include the formation, persistence and spreading of aircraft ice-cloud trails, distinct from identifying any specific flight's emissions.",
		excludedEvidence: [
			"Exclude using a photograph's shape or persistence to infer a flight's intent, exact emissions or a precise trail lifetime."
		],
		uncertainty: "Humidity and air-motion measurements limit lifetime prediction without undermining the established possibility of persistence.",
		certainty: "high",
		sources: [sources.contrailLifeCycle, sources.contrailLifetimeReview, sources.contrailFaa]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "who-pays-the-cost-of-import-tariffs",
		title: "Who pays the cost of import tariffs?",
		bottomLine: "In studies of the 2018 U.S. tariffs, domestic importers bore much of the cost at the border. The eventual burden on shoppers depended on retail prices, margins and changes in suppliers.",
		stableCore: [
			"The 2018 evidence found that many foreign exporters did not cut their prices enough to offset the new tariffs.",
			"Import prices and checkout prices need not move equally: retailers can absorb some costs through lower margins.",
			"The burden can change with exchange rates, competition, substitution and time, so the result is specific to a policy setting."
		],
		openQuestions: [
			"How do costs shift among importers, retailers, workers and consumers over longer periods?",
			"How far do findings from the 2018 U.S. episode apply to other countries, products or later tariff regimes?"
		],
		whatWouldChangeMinds: [
			"Comparable evidence that tracks foreign export prices, import costs and retail margins across different tariff episodes."
		],
		misconceptions: [
			"A tariff charged at the border does not mean every household pays the same percentage increase at the checkout."
		],
		editorSummary: "The economic burden depends on price changes and who absorbs them, not only the announced tariff rate.",
		population: "U.S. importers, exporters and retailers studied during the 2018-2019 trade-policy changes.",
		scope: "Include observed tariff pass-through at the border and store, while distinguishing historical estimates from forecasts.",
		excludedEvidence: [
			"Exclude treating the 2018 U.S. pass-through estimate as a universal result for every future tariff or equating border incidence with retail inflation."
		],
		uncertainty: "Product coverage, exchange rates, margins and adjustment over time limit generalization to other policy episodes.",
		sources: [sources.tariffPricesWelfare, sources.tariffRetailJournal]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "do-content-warnings-reduce-distress",
		title: "Do content warnings reduce distress?",
		bottomLine: "In experiments, content warnings usually do little to reduce distress after people see difficult material. They can increase worry beforehand, while effects on avoidance are mixed.",
		stableCore: [
			"A meta-analysis found little average change in emotional responses after negative material or in educational outcomes.",
			"Experiments with college students and internet users found only trivial average changes in distress and intrusive thoughts.",
			"These outcomes do not by themselves settle the value of informed choice, accessibility or warnings for a particular clinical population."
		],
		openQuestions: [
			"Do different warning formats change real-world choices or longer-term outcomes?",
			"How well do findings apply to people with clinically assessed trauma-related conditions?"
		],
		whatWouldChangeMinds: [
			"Independent studies showing meaningful, durable benefits or harms in clearly defined populations and realistic choice settings."
		],
		misconceptions: [
			"An average lack of reduced distress does not decide every warning policy or show that all individual experiences are the same."
		],
		editorSummary: "Evidence is clearest about small average emotional effects, with other purposes requiring separate evaluation.",
		population: "Participants in warning experiments, commonly students and internet samples, including some with reported trauma histories.",
		scope: "Include anticipatory emotion, post-exposure distress, avoidance and learning as separate outcomes.",
		excludedEvidence: [
			"Exclude interpreting warning experiments as trauma treatment trials or as a complete judgment of informed choice and accessibility policies."
		],
		uncertainty: "Warning formats, samples, exposure choices and short follow-up limit application to clinical and everyday settings.",
		band: "mixed",
		certainty: "moderate",
		sources: [sources.warningsMeta, sources.warningsExperimental]
	}, novemberCommonReaderResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-an-implicit-association-test-predict-individual-behavior",
		title: "Can an implicit-association test predict an individual's behavior?",
		bottomLine: "IAT scores show small, variable links with behavior across studies. A score alone is not a reliable verdict on a particular person's future actions or character.",
		stableCore: [
			"Meta-analyses find some statistical links, but estimates differ with the test, behavior measured and study methods.",
			"Behavior, judgments and physiological responses are different outcomes; combining them does not establish one level of individual accuracy.",
			"Researchers disagree about the strength and interpretation of prediction, and a group-level correlation does not validate a diagnostic pass-or-fail label."
		],
		openQuestions: [
			"How reliably do repeated scores predict well-defined behavior in new settings?",
			"Which test and outcome combinations provide useful prediction beyond simpler measures?"
		],
		whatWouldChangeMinds: [
			"Large, preregistered replications with reliable measures and accurate, independently tested individual predictions."
		],
		misconceptions: [
			"Weak prediction from one test does not show that bias is unreal, and a test score alone does not establish that someone will discriminate."
		],
		editorSummary: "There is evidence of association, with substantial disagreement about predictive usefulness and individual interpretation.",
		population: "Participants in IAT studies of attitudes, stereotypes and intergroup behavior across varied settings.",
		scope: "Include predictive-validity syntheses while separating correlations, study methods and individual classification.",
		excludedEvidence: [
			"Exclude treating a pooled correlation or a regression coefficient as an individual's diagnostic accuracy or a moral classification."
		],
		uncertainty: "Heterogeneity, measurement error, weakly matched outcomes and disputed interpretation limit individual prediction.",
		band: "mixed",
		certainty: "low",
		sources: [sources.iatBehaviorMeta, sources.iatPredictiveMeta, sources.iatCriticalMeta]
	}, novemberCommonReaderResearchCheckedAt)
];
