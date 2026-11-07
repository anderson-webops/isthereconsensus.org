import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberWomensHealthSupportResearchCheckedAt = "2026-11-07T09:36:18.012Z";

const sources = {
	menopauseMeta: researchSource("Efficacy of cognitive therapy and behavior therapy for menopausal symptoms: a systematic review and meta-analysis", "Psychological Medicine", 2022, "https://doi.org/10.1017/s0033291721005407", "10.1017/s0033291721005407", "2022 synthesis of 14 randomized trials found small-to-moderate benefits for menopausal symptoms. Psychological approaches and populations varied, and these average symptom effects do not establish the same reduction in physiological hot-flush frequency.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	menopauseMenosTrial: researchSource("Effectiveness of group and self-help cognitive behavior therapy in reducing problematic menopausal hot flushes and night sweats (MENOS 2)", "Menopause", 2012, "https://doi.org/10.1097/gme.0b013e31823fe835", "10.1097/gme.0b013e31823fe835", "2012 MENOS 2 trial randomized 140 women to group CBT, guided self-help or no-treatment control. The primary outcome was how problematic flushes and night sweats felt, with improvements through 26 weeks. Bother, frequency and physiological measurements are distinct outcomes.", "landmark_study", "supports", novemberWomensHealthSupportResearchCheckedAt),
	menopausePsychReview: {
		...researchSource("Mindfulness, cognitive behavioural and behaviour‐based therapy for natural and treatment‐induced menopausal symptoms: a systematic review and meta‐analysis", "BJOG: An International Journal of Obstetrics & Gynaecology", 2019, "https://doi.org/10.1111/1471-0528.15153", "10.1111/1471-0528.15153", "2019 journal issue, first online in 2018. Review of 12 trials mixed CBT, behavioral and mindfulness approaches. The publisher's July 2018 inline correction recalculated hot-flush-bother endpoint scores. Results concern patient-reported bother; related reviews share trials.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1111/1471-0528.15153",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2F1471-0528.15153&rows=100",
			"https://obgyn.onlinelibrary.wiley.com/doi/10.1111/1471-0528.15153"
		]
	},
	periodCochrane: researchSource("Exercise for dysmenorrhoea", "Cochrane Database of Systematic Reviews", 2019, "https://doi.org/10.1002/14651858.CD004142.pub4", "10.1002/14651858.CD004142.pub4", "Completed 2019 Cochrane review, verified directly through its publisher and PubMed. Twelve trials included 854 women, with low-to-very-low-certainty evidence and high heterogeneity. Comparisons with medicines and safety outcomes were insufficient; this is not an exercise prescription.", "systematic_review", "supports", novemberWomensHealthSupportResearchCheckedAt),
	periodNetwork: researchSource("Comparative Effectiveness of Different Exercises for Reducing Pain Intensity in Primary Dysmenorrhea: A Systematic Review and Network Meta-analysis of Randomized Controlled Trials", "Sports Medicine - Open", 2024, "https://doi.org/10.1186/s40798-024-00718-4", "10.1186/s40798-024-00718-4", "2024 network synthesis of 29 trials found lower pain with several exercise approaches. Indirect rankings do not establish one best regimen. Its dropout estimate includes no difference and dropout is not a complete measure of safety.", "meta_analysis", "context", novemberWomensHealthSupportResearchCheckedAt),
	periodAerobicMeta: researchSource("Aerobic exercise to alleviate primary dysmenorrhea in adolescents and young women: A systematic review and meta‐analysis of randomized controlled trials", "Acta Obstetricia et Gynecologica Scandinavica", 2025, "https://doi.org/10.1111/aogs.15042", "10.1111/aogs.15042", "2025 synthesis of 16 trials in mainly adolescents and young adults found pain improvements with high heterogeneity. Subgroup dose rankings were exploratory, and duration statements in the abstract differ. The pooled result does not justify an exact individualized exercise dose.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	prenatalUmbrella: researchSource("Exercise during pregnancy for preventing gestational diabetes mellitus and hypertensive disorders: An umbrella review of randomised controlled trials and an updated meta‐analysis", "BJOG: An International Journal of Obstetrics & Gynaecology", 2023, "https://doi.org/10.1111/1471-0528.17304", "10.1111/1471-0528.17304", "2023 journal issue, first online in 2022. Umbrella review and updated synthesis included 23 reviews and 63 trials, with overlapping evidence. Prenatal exercise reduced gestational-diabetes incidence on average; supervision and timing comparisons do not establish a personal optimum.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	prenatalMeta: researchSource("Prenatal exercise for the prevention of gestational diabetes mellitus and hypertensive disorders of pregnancy: a systematic review and meta-analysis", "British Journal of Sports Medicine", 2018, "https://doi.org/10.1136/bjsports-2018-099355", "10.1136/bjsports-2018-099355", "2018 synthesis included 106 studies of several designs, but prevention estimates come from the randomized exercise-only subset. Participants had no exercise contraindications. Odds reductions are not percentage-point reductions or a universal program target.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	prenatalSupervised: researchSource("Effects of supervised exercise during pregnancy on gestational diabetes mellitus and other pregnancy outcomes: a systematic review and meta-analysis", "British Journal of Sports Medicine", 2026, "https://doi.org/10.1136/bjsports-2026-111586", "10.1136/bjsports-2026-111586", "2026 review of 19 supervised-exercise trials found a moderate-certainty reduction in gestational-diabetes risk versus usual care. Programs, adherence and populations varied. Its weight-gain dose-response model is not a validated diabetes-prevention prescription.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	ivfAcupunctureTrial: researchSource("Effect of Acupuncture vs Sham Acupuncture on Live Births Among Women Undergoing In Vitro Fertilization", "JAMA", 2018, "https://doi.org/10.1001/jama.2018.5336", "10.1001/jama.2018.5336", "2018 Australia/New Zealand sham-controlled trial randomized 848 women; 809 had live-birth outcome data. Live-birth rates were similar between groups. The confidence interval allowed benefit or harm, and a nonsignificant result is not proof of exact equivalence.", "landmark_study", "debate", novemberWomensHealthSupportResearchCheckedAt),
	ivfAcupunctureMeta: researchSource("Acupuncture as Treatment for Female Infertility: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Evidence-Based Complementary and Alternative Medicine", 2022, "https://doi.org/10.1155/2022/3595033", "10.1155/2022/3595033", "2022 synthesis reported positive pooled infertility outcomes but combined sham and no-acupuncture controls and varied clinical settings. The authors acknowledged poor reporting and methodological flaws. Its broad pooled results do not isolate an IVF live-birth effect over sham.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	ivfAcupunctureRecent: researchSource("Acupuncture as an adjunctive therapy on embryo transfer day: a systematic review and meta-analysis of clinical pregnancy and live birth outcomes", "Frontiers in Reproductive Health", 2025, "https://doi.org/10.3389/frph.2025.1673144", "10.3389/frph.2025.1673144", "2025 synthesis of 11 trials found a clinical-pregnancy advantage over no acupuncture, not over sham, and no significant live-birth advantage. Clinical pregnancy differs from live birth. Protocol subgroup comparisons do not establish one effective regimen.", "meta_analysis", "debate", novemberWomensHealthSupportResearchCheckedAt),
	bedRestCochrane: researchSource("Bed rest in singleton pregnancies for preventing preterm birth", "Cochrane Database of Systematic Reviews", 2015, "https://doi.org/10.1002/14651858.cd003581.pub3", "10.1002/14651858.cd003581.pub3", "Completed 2015 Cochrane review had usable singleton-pregnancy data from one trial of 1,266 women. Preterm-birth rates were similar but estimates were imprecise. Sparse evidence does not prove either benefit or exact equivalence.", "systematic_review", "debate", novemberWomensHealthSupportResearchCheckedAt),
	bedRestMeta: researchSource("Prenatal bed rest in developed and developing regions: a systematic review and meta-analysis", "CMAJ Open", 2019, "https://doi.org/10.9778/cmajo.20190014", "10.9778/cmajo.20190014", "2019 review of 14 studies found no overall maternal/newborn benefit. Some developed-region analyses suggested worse outcomes. Regional and hospital-care differences limit universal causal interpretations and overlap earlier evidence.", "meta_analysis", "debate", novemberWomensHealthSupportResearchCheckedAt),
	bedRestGuideline: researchSource("Society for Maternal-Fetal Medicine Consult Series #50: The role of activity restriction in obstetric management", "American Journal of Obstetrics and Gynecology", 2020, "https://doi.org/10.1016/j.ajog.2020.04.031", "10.1016/j.ajog.2020.04.031", "2020 Society for Maternal-Fetal Medicine consult recommends against routine activity restriction for several preterm-birth-risk scenarios and discusses physical and psychosocial harms. Specific recommendations have different evidence grades; clinical circumstances still require individual assessment.", "guideline", "context", novemberWomensHealthSupportResearchCheckedAt),
	laserShamTrial: researchSource("Effect of Fractional Carbon Dioxide Laser vs Sham Treatment on Symptom Severity in Women With Postmenopausal Vaginal Symptoms", "JAMA", 2021, "https://doi.org/10.1001/jama.2021.14892", "10.1001/jama.2021.14892", "2021 double-blind sham-controlled trial randomized 85 women; 78 completed 12-month follow-up. Laser did not significantly outperform sham on vaginal symptoms or quality of life. The trial was too small to establish absence of rare or long-term harms.", "landmark_study", "debate", novemberWomensHealthSupportResearchCheckedAt),
	laserRecent: researchSource("Laser therapy for genitourinary syndrome of menopause: systematic review and meta-analysis of randomized controlled trial", "Revista Brasileira de Ginecologia e Obstetrícia", 2024, "https://doi.org/10.61622/rbgo/2024rbgo38", "10.61622/rbgo/2024rbgo38", "2024 review reported improvements on some vaginal-symptom scales but rated the evidence low and did not support recommending treatment. It combined different devices and comparators. Reported symptom-scale gains do not establish consistent patient-important benefit.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	laserEvidence: researchSource("Energy-based interventions for genitourinary syndrome of menopause: a systematic review of randomized controlled trials and prospective observational studies", "Menopause", 2025, "https://doi.org/10.1097/gme.0000000000002465", "10.1097/gme.0000000000002465", "2025 systematic review identified 32 studies and focused extraction on lower-bias controlled evidence. CO2 laser made little or no difference to several outcomes versus sham or estrogen, with low certainty. Other energy-device effects and longer-term safety were very uncertain.", "systematic_review", "debate", novemberWomensHealthSupportResearchCheckedAt),
	birthSupportCompleted: researchSource("Continuous support for women during childbirth", "Cochrane Database of Systematic Reviews", 2017, "https://doi.org/10.1002/14651858.cd003766.pub6", "10.1002/14651858.cd003766.pub6", "Completed 2017 Cochrane update replaces the older 2013 version. Twenty-six trials provided usable data. Continuous support improved some birth outcomes and experiences, but many estimates were low certainty and provider/setting subgroup comparisons were exploratory.", "systematic_review", "supports", novemberWomensHealthSupportResearchCheckedAt),
	birthDoulaMeta: researchSource("Intrapartum Doula Support and Cesarean Delivery Rates", "Obstetrics & Gynecology", 2025, "https://doi.org/10.1097/aog.0000000000005937", "10.1097/aog.0000000000005937", "2025 doula review separated eight randomized studies from ten observational studies. Randomized findings favored fewer cesareans, with heterogeneity and possible publication bias. The US-only trial estimate was inconclusive; the full 367,662-person sample was mostly observational.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	birthSupportRecent: researchSource("Continuous labor support by doulas and nurses and its impact on birth outcomes: a systematic review", "Frontiers in Health Services", 2026, "https://doi.org/10.3389/frhs.2026.1889587", "10.3389/frhs.2026.1889587", "September 2026 narrative synthesis of 16 studies covered doula, nurse, midwife and companion support. Provider models and study designs differed; neonatal findings were less consistent. These overlapping studies do not establish randomized superiority of one support-provider type.", "systematic_review", "context", novemberWomensHealthSupportResearchCheckedAt),
	menstrualTxaCochrane: researchSource("Antifibrinolytics for heavy menstrual bleeding", "Cochrane Database of Systematic Reviews", 2018, "https://doi.org/10.1002/14651858.cd000249.pub2", "10.1002/14651858.cd000249.pub2", "Completed 2018 Cochrane review, despite the discovery record's older year. Thirteen trials supported less menstrual blood loss with antifibrinolytics. Most comparisons were low certainty and too few studies measured thromboembolism to establish rare-event safety.", "systematic_review", "supports", novemberWomensHealthSupportResearchCheckedAt),
	menstrualTxaTrial: researchSource("Tranexamic Acid Treatment for Heavy Menstrual Bleeding", "Obstetrics & Gynecology", 2010, "https://doi.org/10.1097/aog.0b013e3181f20177", "10.1097/aog.0b013e3181f20177", "2010 placebo-controlled trial found reduced menstrual blood loss and improved activity-related quality of life over six cycles. Short-term efficacy in selected adults does not establish safety for everyone or replace assessment of the cause of bleeding.", "landmark_study", "supports", novemberWomensHealthSupportResearchCheckedAt),
	menstrualTxaConsensus: researchSource("NASPAG Clinical Consensus: Use of Tranexamic Acid in the Treatment of Heavy Menstrual Bleeding", "Journal of Pediatric and Adolescent Gynecology", 2025, "https://doi.org/10.1016/j.jpag.2025.02.008", "10.1016/j.jpag.2025.02.008", "2025 NASPAG clinical consensus addresses tranexamic acid for adolescent heavy menstrual bleeding. Its population-specific guidance is distinct from adult trial evidence. The primary abstract describes scope and searches rather than supplying new independent efficacy estimates.", "consensus_statement", "context", novemberWomensHealthSupportResearchCheckedAt),
	aaCochrane: researchSource("Alcoholics Anonymous and other 12-step programs for alcohol use disorder", "Cochrane Database of Systematic Reviews", 2020, "https://doi.org/10.1002/14651858.cd012880.pub2", "10.1002/14651858.cd012880.pub2", "Completed 2020 Cochrane review, not the discovery record's 2017 year. Manualized twelve-step facilitation improved continuous abstinence versus some active treatments. Evidence for voluntary attendance and other drinking outcomes differs; participants were non-coerced adults.", "systematic_review", "supports", novemberWomensHealthSupportResearchCheckedAt),
	aaDistillation: researchSource("Alcoholics Anonymous and 12-Step Facilitation Treatments for Alcohol Use Disorder: A Distillation of a 2020 Cochrane Review for Clinicians and Policy Makers", "Alcohol and Alcoholism", 2020, "https://doi.org/10.1093/alcalc/agaa050", "10.1093/alcalc/agaa050", "2020 clinical distillation of the same 27-study Cochrane evidence base, not another independent set of trials. It distinguishes clinician-delivered facilitation, AA involvement and different alcohol-related outcomes.", "systematic_review", "context", novemberWomensHealthSupportResearchCheckedAt),
	painCochraneCompleted: researchSource("Psychological therapies for the management of chronic pain (excluding headache) in adults", "Cochrane Database of Systematic Reviews", 2020, "https://doi.org/10.1002/14651858.cd007407.pub4", "10.1002/14651858.cd007407.pub4", "Completed 2020 Cochrane update replaces the 2012 version. CBT had small or very small average benefits for chronic non-cancer pain, disability and distress. Benefits over active controls were smaller than over usual care; adverse-event reporting was inadequate.", "systematic_review", "supports", novemberWomensHealthSupportResearchCheckedAt),
	painNetwork: researchSource("Psychological interventions for chronic, non-specific low back pain: systematic review with network meta-analysis", "BMJ", 2022, "https://doi.org/10.1136/bmj-2021-067718", "10.1136/bmj-2021-067718", "2022 network review of chronic nonspecific low-back pain found benefits for psychological approaches alongside physiotherapy. Combined-care estimates and network comparisons do not isolate the same effect as CBT alone for every chronic-pain condition.", "meta_analysis", "context", novemberWomensHealthSupportResearchCheckedAt),
	painDigital: researchSource("Internet-delivered cognitive and behavioural based interventions for adults with chronic pain: a systematic review and meta-analysis of randomized controlled trials", "Pain", 2022, "https://doi.org/10.1097/j.pain.0000000000002606", "10.1097/j.pain.0000000000002606", "2022 synthesis of 36 trials found small average benefits from internet-delivered cognitive/behavioral approaches. Guidance-related subgroup differences were not direct randomized proof that one delivery format is superior for every patient.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	diabetesEducation: researchSource("Effect of diabetes self-management education (DSME) on glycated hemoglobin (HbA1c) level among patients with T2DM: Systematic review and meta-analysis of randomized controlled trials", "Diabetes & Metabolic Syndrome: Clinical Research & Reviews", 2021, "https://doi.org/10.1016/j.dsx.2020.12.030", "10.1016/j.dsx.2020.12.030", "2021 journal issue, first online in 2020. The main analysis of 20 studies favored lower HbA1c with substantial heterogeneity. Its standardized mean difference is not an absolute percentage-point change in HbA1c.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	diabetesNewDiagnosis: researchSource("Diabetes self-management education and support for adults with newly diagnosed type 2 diabetes mellitus: A systematic review and meta-analysis of randomized controlled trials", "Diabetes Research and Clinical Practice", 2020, "https://doi.org/10.1016/j.diabres.2020.108480", "10.1016/j.diabres.2020.108480", "2020 review of newly diagnosed adults found modest HbA1c improvement in the lower-bias subset, with low overall evidence quality. Weight, psychosocial and behavioral outcomes were less clear. Results do not establish remission or fewer major complications.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	diabetesLmic: researchSource("The effectiveness of diabetes self-management education intervention on glycaemic control and cardiometabolic risk in adults with type 2 diabetes in low- and middle-income countries: A systematic review and meta-analysis", "PLOS ONE", 2024, "https://doi.org/10.1371/journal.pone.0297328", "10.1371/journal.pone.0297328", "2024 review of 44 studies from 21 lower- and middle-income countries separated randomized and quasi-experimental evidence. The randomized HbA1c estimate was favorable; the quasi-experimental confidence interval crossed no effect. HbA1c percentage points differ from relative-percent changes.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	pulmonaryMeta: researchSource("Effect of pulmonary rehabilitation in patients with chronic obstructive pulmonary disease: a systematic review and meta-analysis of randomized controlled trials", "Annals of Medicine", 2022, "https://doi.org/10.1080/07853890.2021.1999494", "10.1080/07853890.2021.1999494", "2022 synthesis of 39 trials found improved walking capacity, quality of life and some breathlessness measures with rehabilitation. Some lung-function measures did not improve; functional gains are not reversal of COPD.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	pulmonaryPosthospital: researchSource("Do pulmonary rehabilitation programmes improve outcomes in patients with COPD posthospital discharge for exacerbation: a systematic review and meta-analysis", "Thorax", 2024, "https://doi.org/10.1136/thorax-2023-220333", "10.1136/thorax-2023-220333", "2024 review of rehabilitation after COPD hospitalization found fewer readmissions and better function, with heterogeneity. It excluded inpatient-only rehabilitation and did not show a significant mortality benefit. No reported treatment-related events is not proof of zero risk.", "meta_analysis", "supports", novemberWomensHealthSupportResearchCheckedAt),
	pulmonaryGuideline: researchSource("Pulmonary Rehabilitation for Adults with Chronic Respiratory Disease: An Official American Thoracic Society Clinical Practice Guideline", "American Journal of Respiratory and Critical Care Medicine", 2023, "https://doi.org/10.1164/rccm.202306-1066st", "10.1164/rccm.202306-1066st", "2023 ATS guideline strongly recommends rehabilitation for stable COPD and after COPD hospitalization, based on moderate-quality evidence. Its recommendations for other respiratory conditions differ; the pulmonary-hypertension recommendation is conditional, not strong.", "guideline", "supports", novemberWomensHealthSupportResearchCheckedAt),
	fallsCochrane: researchSource("Environmental interventions for preventing falls in older people living in the community", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.CD013258.pub2", "10.1002/14651858.CD013258.pub2", "Completed 2023 Cochrane review replaces the protocol DOI in discovery metadata. Home fall-hazard reduction was more effective in higher-risk people than unselected populations. Fall rate, number of fallers, fractures and quality of life are distinct outcomes.", "systematic_review", "supports", novemberWomensHealthSupportResearchCheckedAt),
	fallsHomeTrial: researchSource("Home Hazard Removal to Reduce Falls Among Community-Dwelling Older Adults", "JAMA Network Open", 2021, "https://doi.org/10.1001/jamanetworkopen.2021.22044", "10.1001/jamanetworkopen.2021.22044", "2021 St Louis trial randomized 310 higher-risk older adults. The primary first-fall hazard result was inconclusive, while the secondary total-fall rate improved. A reduction in repeated falls is not the same as preventing every person's first fall.", "landmark_study", "context", novemberWomensHealthSupportResearchCheckedAt),
	fallsOtisReport: researchSource("Home environmental assessments and modification delivered by occupational therapists to reduce falls in people aged 65 years and over: the OTIS RCT", "Health Technology Assessment", 2021, "https://doi.org/10.3310/hta25460", "10.3310/hta25460", "2021 NIHR peer-reviewed final OTIS report, selected instead of its awaiting-peer-review F1000 version. The 1,331-person English trial found no reduction in falls from the offered occupational-therapy intervention. It illustrates variation between programs and study populations.", "landmark_study", "debate", novemberWomensHealthSupportResearchCheckedAt)
};

export const novemberWomensHealthSupportClaims = [
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "can-cbt-make-menopausal-hot-flashes-less-disruptive",
		title: "Can CBT make menopausal hot flashes less disruptive?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Menopause-focused cognitive behavioral therapy can reduce how troublesome hot flashes and night sweats feel. That does not necessarily mean an equal reduction in how often they occur.",
		stableCore: [
			"Trials find improvements in symptom bother and some aspects of quality of life.",
			"Some benefits persist for several months after treatment.",
			"Natural and treatment-induced menopause, therapy formats and outcomes differ."
		],
		openQuestions: [
			"How long do benefits last and which delivery formats work best?",
			"How consistently does treatment change symptom frequency as well as bother?"
		],
		whatWouldChangeMinds: [
			"Longer, well-controlled trials measuring both symptoms and daily-life impact.",
			"Direct comparisons of delivery formats across different menopause populations."
		],
		misconceptions: [
			"Reducing symptom bother means the physical symptoms were imaginary."
		],
		editorSummary: "Evidence is clearer for reduced bother than for fewer physiological episodes.",
		population: "Women with problematic natural or treatment-induced menopausal symptoms in the studied settings.",
		scope: "Assess menopause-focused CBT and related psychological approaches, separating symptom bother, frequency and quality of life.",
		excludedEvidence: [
			"Different psychological approaches and overlapping trial sets are not independent confirmations of the same program.",
			"These studies do not compare every hormonal and nonhormonal treatment or establish individual suitability."
		],
		uncertainty: "Many outcomes are self-reported, blinding is difficult and longer follow-up is limited.",
		sources: [sources.menopauseMeta, sources.menopauseMenosTrial, sources.menopausePsychReview]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-exercise-ease-period-pain",
		title: "Does exercise ease period pain?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Exercise may ease primary period pain, but the evidence is uneven. Studies do not establish one best routine or show clearly how exercise compares with pain medicine.",
		stableCore: [
			"Many trials report less pain than no-exercise controls.",
			"Small studies, varied routines and inconsistent results limit certainty.",
			"Indirect rankings do not establish the safest or most effective routine for an individual."
		],
		openQuestions: [
			"How much benefit remains against attention controls or usual pain treatment?",
			"Do benefits persist and apply beyond the mainly younger populations studied?"
		],
		whatWouldChangeMinds: [
			"Larger trials with credible active comparators and systematic safety reporting.",
			"Consistent findings using patient-important outcomes beyond short-term pain scores."
		],
		misconceptions: [
			"A high network ranking or low dropout rate proves a routine is best and safest."
		],
		editorSummary: "Possible pain relief comes with uncertainty about comparisons and optimal routines.",
		population: "Mainly adolescents and younger adults with primary dysmenorrhea, rather than pain from an identified underlying condition.",
		scope: "Assess exercise for primary menstrual pain, separating inactive comparators, medicines, pain scales and daily functioning.",
		excludedEvidence: [
			"Findings do not establish treatment for endometriosis or another cause of secondary period pain.",
			"Exploratory exercise-dose subgroups are not personalized prescriptions."
		],
		uncertainty: "Evidence quality varies, heterogeneity is high and adverse effects are poorly reported; persistent or changing pain needs clinical assessment.",
		sources: [sources.periodCochrane, sources.periodNetwork, sources.periodAerobicMeta]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-prenatal-exercise-reduce-gestational-diabetes-risk",
		title: "Does prenatal exercise reduce gestational diabetes risk?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, on average in pregnancies where exercise is suitable. Trials find fewer cases of gestational diabetes with exercise programs, although benefits vary and are not guaranteed.",
		stableCore: [
			"Randomized exercise programs generally reduce gestational-diabetes incidence compared with usual care.",
			"Trials differ in supervision, adherence and starting risk.",
			"Prevention of a new diagnosis differs from treating diabetes already present."
		],
		openQuestions: [
			"Which practical programs work best across different care settings?",
			"How much do timing, adherence and starting risk change the absolute benefit?"
		],
		whatWouldChangeMinds: [
			"Consistent effects in well-designed pragmatic trials across diverse pregnancy populations.",
			"Direct comparisons clarifying program differences without relying only on subgroup models."
		],
		misconceptions: [
			"A pooled relative reduction specifies an individual's risk or an exact exercise target."
		],
		editorSummary: "Prevention benefits apply to the studied eligible pregnancies and programs.",
		population: "Pregnant people eligible for the studied exercise interventions; contraindications and clinical circumstances matter.",
		scope: "Assess exercise-only prenatal programs and new gestational-diabetes diagnoses, distinguishing randomized evidence from observational studies.",
		excludedEvidence: [
			"Overlapping reviews cannot be added as independent trial populations.",
			"A dose-response curve for gestational weight gain does not prescribe diabetes prevention or treatment."
		],
		uncertainty: "Diagnostic criteria, programs and participants vary; individual activity suitability requires obstetric assessment.",
		sources: [sources.prenatalUmbrella, sources.prenatalMeta, sources.prenatalSupervised]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-acupuncture-improve-ivf-live-birth-rates",
		title: "Does acupuncture improve IVF live-birth rates?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "A reliable added live-birth benefit has not been established. Positive findings appear more often against no acupuncture than against sham treatment.",
		stableCore: [
			"A large sham-controlled trial found similar live-birth rates between groups.",
			"Reviews reach different conclusions depending on the controls and outcomes combined.",
			"A positive pregnancy test or clinical pregnancy is not the same as a live birth."
		],
		openQuestions: [
			"Would better controlled trials show a meaningful live-birth benefit?",
			"How much do treatment context and the choice of comparison explain reported effects?"
		],
		whatWouldChangeMinds: [
			"Replicated improvements in live birth in adequately powered sham-controlled trials.",
			"Consistent results that separate clinical settings and retain complete outcome follow-up."
		],
		misconceptions: [
			"A higher clinical-pregnancy rate proves more live births or superiority over sham treatment."
		],
		editorSummary: "The comparison group and live-birth endpoint are crucial.",
		population: "Women undergoing the studied IVF and embryo-transfer cycles; other infertility treatments may differ.",
		scope: "Assess acupuncture added to IVF, prioritizing live birth and separating sham from no-acupuncture comparisons.",
		excludedEvidence: [
			"Broad infertility pools and multiple reports from one trial are not independent IVF confirmations.",
			"A nonsignificant difference does not establish exact equivalence or an effective treatment protocol."
		],
		uncertainty: "Trials vary in controls and reporting, some syntheses mix settings, and modest effects remain hard to rule out.",
		sources: [sources.ivfAcupunctureTrial, sources.ivfAcupunctureMeta, sources.ivfAcupunctureRecent]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-bed-rest-prevent-preterm-birth",
		title: "Does bed rest prevent preterm birth?",
		band: "broad",
		certainty: "low",
		bottomLine: "Routine bed rest has not shown a reliable prevention benefit. It can bring physical and emotional harms, so activity advice needs to reflect the specific pregnancy and clinical situation.",
		stableCore: [
			"The direct randomized evidence is limited and does not demonstrate a clear reduction in preterm birth.",
			"Broader reviews find no overall improvement in maternal or newborn outcomes.",
			"Specialist guidance advises against routine activity restriction in several common risk scenarios."
		],
		openQuestions: [
			"Are there specific circumstances with a different balance of benefits and harms?",
			"How do hospital admission, practical support and activity restriction contribute separately?"
		],
		whatWouldChangeMinds: [
			"Strong evidence of clinically meaningful benefit in a clearly defined pregnancy group.",
			"Studies separating the effect of bed rest from other care while measuring maternal and infant harms."
		],
		misconceptions: [
			"More rest necessarily prevents an early birth, or hospital care and bed rest are the same intervention."
		],
		editorSummary: "Routine restriction lacks demonstrated benefit and can have downsides.",
		population: "Studied pregnancies at risk of preterm birth, with different eligibility and clinical complications.",
		scope: "Assess prescribed bed rest or activity restriction for preterm-birth prevention rather than all reasons for obstetric care.",
		excludedEvidence: [
			"Regional subgroup differences do not establish the same causal harm in every setting.",
			"This evidence does not replace individualized advice about bleeding, acute symptoms or other pregnancy complications."
		],
		uncertainty: "Direct trials are sparse and imprecise, definitions vary and associated care can differ.",
		sources: [sources.bedRestCochrane, sources.bedRestMeta, sources.bedRestGuideline]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-vaginal-laser-treatment-help-menopause-symptoms",
		title: "Does vaginal laser treatment help menopause symptoms?",
		band: "mixed",
		certainty: "low",
		bottomLine: "A dependable benefit beyond sham treatment has not been established. Some studies report improvement, but findings vary and long-term safety is uncertain.",
		stableCore: [
			"Some pooled symptom scores favor laser, while better controlled evidence often finds little difference.",
			"A year-long sham-controlled trial found no significant added symptom or quality-of-life benefit.",
			"Different energy devices and comparison treatments should not be treated as interchangeable."
		],
		openQuestions: [
			"Do any defined groups have a meaningful, durable benefit beyond sham treatment?",
			"What harms become apparent with longer follow-up and larger studies?"
		],
		whatWouldChangeMinds: [
			"Replicated sham-controlled improvements in symptoms that matter to patients.",
			"Reliable longer-term safety data with consistent outcome reporting."
		],
		misconceptions: [
			"Improvement after treatment proves a device-specific benefit or establishes safety."
		],
		editorSummary: "Controlled benefit and longer-term safety remain uncertain.",
		population: "Postmenopausal women with studied genitourinary symptoms; device types and clinical histories vary.",
		scope: "Assess vaginal energy-based treatment for menopausal symptoms, prioritizing sham comparisons and patient-important outcomes.",
		excludedEvidence: [
			"Uncontrolled before-and-after change does not isolate a treatment effect.",
			"Symptom-scale changes, tissue measures and absence of reported serious events do not establish a universal benefit or zero risk."
		],
		uncertainty: "Studies are small and heterogeneous, evidence certainty is low and adverse-event reporting is limited.",
		sources: [sources.laserShamTrial, sources.laserRecent, sources.laserEvidence]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-continuous-labour-support-improve-birth-outcomes",
		title: "Does continuous labour support improve birth outcomes?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Continuous support can improve the childbirth experience and reduce some interventions, including cesarean birth on average. Benefits vary by setting and do not guarantee a particular birth outcome.",
		stableCore: [
			"Randomized evidence generally favors some maternal outcomes and experience measures.",
			"Support may be provided by a trained companion, doula or clinical staff member.",
			"Neonatal outcomes and comparisons between provider types are less consistent."
		],
		openQuestions: [
			"Which support models work best across care systems and underserved populations?",
			"How do benefits persist into the postpartum period?"
		],
		whatWouldChangeMinds: [
			"More rigorous comparisons with consistent patient-centered and longer-term outcomes.",
			"Trials clarifying provider and setting differences without relying only on exploratory subgroups."
		],
		misconceptions: [
			"A large observational sample proves that one support-provider type causally outperforms all others."
		],
		editorSummary: "Maternal benefits are supported, with important variation between settings.",
		population: "Women in the studied labour and childbirth settings; most trial evidence comes from higher- and middle-income countries.",
		scope: "Compare continuous one-to-one labour support with usual care, separating randomized and observational evidence.",
		excludedEvidence: [
			"Overlapping reviews and the same trials are not independent replications.",
			"Support complements clinical care and does not establish that a medically indicated intervention should be avoided."
		],
		uncertainty: "Blinding is difficult, implementation varies and some estimates have heterogeneity or small-study bias.",
		sources: [sources.birthSupportCompleted, sources.birthDoulaMeta, sources.birthSupportRecent]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-tranexamic-acid-reduce-heavy-menstrual-bleeding",
		title: "Does tranexamic acid reduce heavy menstrual bleeding?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Trials find less menstrual blood loss and improvements in some daily-life limitations. Suitability depends on the cause of bleeding, medical history and other treatments.",
		stableCore: [
			"Controlled trials support reduced blood loss compared with placebo.",
			"Different treatments can offer different degrees of improvement.",
			"The evidence is stronger for bleeding reduction than for ruling out rare harms."
		],
		openQuestions: [
			"How do longer-term benefits and risks compare across patient groups and treatments?",
			"Which outcomes best reflect meaningful improvement for adolescents and adults?"
		],
		whatWouldChangeMinds: [
			"More precise comparative studies with longer follow-up and adequate rare-event safety data.",
			"Consistent patient-centered outcomes across causes of heavy bleeding and age groups."
		],
		misconceptions: [
			"Few clotting events in small trials prove the medicine is safe for everyone."
		],
		editorSummary: "Bleeding reduction is established more clearly than rare-event safety.",
		population: "People with heavy menstrual bleeding in the studied adolescent and adult clinical groups.",
		scope: "Assess tranexamic acid for menstrual bleeding rather than bleeding after childbirth, surgery or trauma.",
		excludedEvidence: [
			"A review and its included trial are not independent patient populations.",
			"Treatment evidence does not identify the cause of heavy bleeding or provide a personal medication regimen."
		],
		uncertainty: "Most treatment comparisons have limited data, and trials are too small to settle uncommon adverse effects; clinical assessment remains important.",
		sources: [sources.menstrualTxaCochrane, sources.menstrualTxaTrial, sources.menstrualTxaConsensus]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "substance-use-and-addiction",
		slug: "does-twelve-step-facilitation-help-alcohol-abstinence",
		title: "Does twelve-step facilitation help alcohol abstinence?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Structured programs that help adults engage with Alcoholics Anonymous can improve continuous abstinence compared with some other established treatments. Results for other drinking outcomes are often similar.",
		stableCore: [
			"The strongest evidence concerns clinician-delivered, structured twelve-step facilitation.",
			"Continuous abstinence, drinking intensity and alcohol-related consequences are different outcomes.",
			"Voluntary attendance alone is not the same intervention as randomized facilitation."
		],
		openQuestions: [
			"Which approaches best fit different preferences and recovery needs?",
			"How well do benefits generalize beyond the populations and structured programs studied?"
		],
		whatWouldChangeMinds: [
			"Consistent patient-centered comparisons across diverse voluntary recovery settings.",
			"Clearer evidence separating facilitated engagement from selection into ordinary attendance."
		],
		misconceptions: [
			"A benefit for continuous abstinence proves superiority for every outcome or every person."
		],
		editorSummary: "Structured facilitation has stronger causal evidence than attendance associations alone.",
		population: "Non-coerced adults with alcohol-use disorder in the studied treatment comparisons.",
		scope: "Assess manualized twelve-step facilitation and AA involvement, separating structured treatment from informal attendance.",
		excludedEvidence: [
			"The clinical distillation shares the Cochrane review's evidence and adds no independent trial population.",
			"Recovery support is distinct from medical care for dangerous alcohol withdrawal."
		],
		uncertainty: "Evidence differs by intervention structure and outcome; voluntary attendance studies are more vulnerable to selection bias.",
		sources: [sources.aaCochrane, sources.aaDistillation]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-cbt-help-people-manage-chronic-pain",
		title: "Does CBT help people manage chronic pain?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "CBT can produce small improvements in pain, distress and daily functioning. It helps some people manage pain rather than removing every physical cause or guaranteeing relief.",
		stableCore: [
			"Average benefits are usually small, especially against another active treatment.",
			"Pain intensity, disability and distress respond differently.",
			"Combined physiotherapy programs and online delivery involve different treatment comparisons."
		],
		openQuestions: [
			"Which people and treatment features account for variation in benefit?",
			"How durable are gains and how well are adverse experiences measured?"
		],
		whatWouldChangeMinds: [
			"More precise active-treatment comparisons with longer-term patient-important outcomes.",
			"Studies that separate treatment components and report benefits and harms consistently."
		],
		misconceptions: [
			"Benefit from a psychological treatment means pain is imaginary or has no physical basis."
		],
		editorSummary: "Small management benefits are distinct from a cure or elimination of pain.",
		population: "Adults with studied chronic non-cancer pain conditions; headache and cancer-pain evidence are separate.",
		scope: "Assess cognitive behavioral approaches for chronic pain, distinguishing active controls, usual care and combined interventions.",
		excludedEvidence: [
			"Internet-delivery subgroup associations do not prove one format is best for every person.",
			"Low-back-pain network results cannot be transferred unchanged to every chronic-pain condition."
		],
		uncertainty: "Trials differ in conditions and controls, blinding is difficult and adverse-event reporting is incomplete.",
		sources: [sources.painCochraneCompleted, sources.painNetwork, sources.painDigital]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		slug: "does-diabetes-self-management-education-improve-blood-sugar",
		title: "Does diabetes self-management education improve blood sugar?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Structured education and support can modestly improve average blood-sugar control in adults with type 2 diabetes. Benefits vary and do not by themselves establish remission or fewer major complications.",
		stableCore: [
			"Many controlled programs improve HbA1c compared with usual care.",
			"Newly diagnosed groups, care settings and background treatment differ.",
			"Knowledge, HbA1c, weight and longer-term health outcomes need separate measurement."
		],
		openQuestions: [
			"Which practical approaches sustain benefits in different health systems?",
			"How do improvements translate into longer-term complications and quality of life?"
		],
		whatWouldChangeMinds: [
			"Consistent longer-term effects across diverse care settings and resource levels.",
			"Trials connecting education-related changes to meaningful health outcomes rather than scores alone."
		],
		misconceptions: [
			"A standardized effect size is an absolute HbA1c percentage-point reduction or a personal treatment target."
		],
		editorSummary: "Average glucose-control gains vary by population, program and measurement.",
		population: "Adults with type 2 diabetes, including newly diagnosed groups and lower- and middle-income-country settings.",
		scope: "Compare structured diabetes self-management education or support with usual care, separating study designs and outcome types.",
		excludedEvidence: [
			"Quasi-experimental estimates with intervals crossing no effect are not established causal benefits.",
			"These findings do not set an individual's glucose target or justify changing medicine without clinical advice."
		],
		uncertainty: "Programs and populations vary substantially, some studies have bias risks and longer-term outcomes are less certain.",
		sources: [sources.diabetesEducation, sources.diabetesNewDiagnosis, sources.diabetesLmic]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "does-pulmonary-rehabilitation-help-people-with-copd",
		title: "Does pulmonary rehabilitation help people with COPD?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Rehabilitation improves exercise capacity, breathlessness and quality of life for many people with COPD. It does not reverse the disease, and evidence for longer survival is less clear.",
		stableCore: [
			"Controlled studies support better function and some symptom measures.",
			"Programs after a hospital admission can also reduce readmissions.",
			"Clinical guidance supports rehabilitation for stable COPD and after hospitalization, with individual assessment."
		],
		openQuestions: [
			"How can benefits be sustained and access improved?",
			"Which delivery models work best for different levels of illness and support?"
		],
		whatWouldChangeMinds: [
			"Consistent long-term comparisons of accessible programs and maintenance strategies.",
			"More precise evidence on severe outcomes and harms as well as exercise performance."
		],
		misconceptions: [
			"Better walking performance proves damaged lungs have recovered or mortality has fallen."
		],
		editorSummary: "Functional and symptom benefits are clearer than disease reversal or longer survival.",
		population: "Adults with COPD in stable-care and post-hospital settings; clinical eligibility and programs vary.",
		scope: "Assess structured pulmonary rehabilitation and patient-important COPD outcomes, separating stable care from post-exacerbation programs.",
		excludedEvidence: [
			"Post-discharge findings do not establish identical effects for inpatient-only rehabilitation.",
			"Guidance for other respiratory diseases and no reported serious events do not imply universal suitability or zero risk."
		],
		uncertainty: "Programs and outcome measures differ, some estimates are heterogeneous and mortality evidence is less certain.",
		sources: [sources.pulmonaryMeta, sources.pulmonaryPosthospital, sources.pulmonaryGuideline]
	}, novemberWomensHealthSupportResearchCheckedAt),
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "do-home-hazard-reduction-programs-prevent-falls",
		title: "Do home-hazard reduction programs prevent falls?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They can reduce falls, especially in selected higher-risk older adults, but trial results vary. Fewer repeated falls does not necessarily mean more people avoid their first fall.",
		stableCore: [
			"Review evidence favors targeted programs more than untargeted offers to everyone.",
			"Some trials find fewer total falls while their primary first-fall outcome remains inconclusive.",
			"A large English trial found no reduction with the offered occupational-therapy intervention."
		],
		openQuestions: [
			"Which program features and participant characteristics explain differing results?",
			"How reliably do lower fall counts translate into fewer injuries and better independence?"
		],
		whatWouldChangeMinds: [
			"Replicated benefits from clearly described programs in well-defined risk groups.",
			"Trials that distinguish first falls, repeated falls, injury and quality of life."
		],
		misconceptions: [
			"A lower total fall rate means every participant has a lower chance of any fall or fracture."
		],
		editorSummary: "Who receives the program and which fall outcome is measured both matter.",
		population: "Community-dwelling older adults, with benefits depending on assessed risk and intervention uptake.",
		scope: "Assess home fall-hazard assessment and reduction, separating risk-selected populations, fall rates and first-fall outcomes.",
		excludedEvidence: [
			"Exercise-based fall prevention and generic home modifications are different interventions.",
			"The OTIS report and its earlier version are one trial, and reviews share underlying studies."
		],
		uncertainty: "Implementation, participant selection and outcomes vary; evidence for fractures and other major outcomes is less certain.",
		sources: [sources.fallsCochrane, sources.fallsHomeTrial, sources.fallsOtisReport]
	}, novemberWomensHealthSupportResearchCheckedAt)
];
