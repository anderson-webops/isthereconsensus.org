import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberRecoveryPreventionResearchCheckedAt = "2026-11-07T08:09:15.238Z";

const sources = {
	gamblingCbtMeta: researchSource("Effect of cognitive‐behavioral techniques for problem gambling and gambling disorder: A systematic review and meta‐analysis", "Addiction", 2023, "https://doi.org/10.1111/add.16221", "10.1111/add.16221", "2023 synthesis of 29 studies and 3,991 participants found short-term improvements in gambling severity, frequency and spending, but no significant follow-up effect. High heterogeneity and publication bias can inflate average effects.", "meta_analysis", "supports", novemberRecoveryPreventionResearchCheckedAt),
	gamblingRecoveryMeta: researchSource("Effects of cognitive behavioral techniques for gambling on recovery defined by gambling, psychological functioning, and quality of life: A systematic review and meta-analysis.", "Psychology of Addictive Behaviors", 2023, "https://doi.org/10.1037/adb0000910", "10.1037/adb0000910", "2023 review of nine trials and 658 participants found short-term anxiety, depression and quality-of-life benefits, but not a substance-use benefit. These broader recovery outcomes differ from gambling abstinence; trials can overlap other syntheses.", "meta_analysis", "context", novemberRecoveryPreventionResearchCheckedAt),
	gamblingUmbrella: researchSource("Cognitive-behavioral treatment for gambling harm: Umbrella review and meta-analysis", "Clinical Psychology Review", 2023, "https://doi.org/10.1016/j.cpr.2023.102336", "10.1016/j.cpr.2023.102336", "2023 umbrella review covered five meta-analyses representing 56 unique studies. Quality varied. Distribution-based 65%-82% comparisons are not observed cure percentages, and the component reviews share underlying trials.", "meta_analysis", "supports", novemberRecoveryPreventionResearchCheckedAt),
	motivationalCochrane: researchSource("Motivational interviewing for substance use reduction", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.cd008063.pub3", "10.1002/14651858.cd008063.pub3", "2023 Cochrane update included 93 studies and 22,776 participants. Benefits were small compared with no intervention or feedback, with little or no advantage over usual care or other active interventions. Certainty varied from moderate to very low.", "systematic_review", "debate", novemberRecoveryPreventionResearchCheckedAt),
	motivationalCannabis: researchSource("Motivational Interviewing for Cannabis Use Disorders: A Systematic Review and Meta-Analysis", "European Addiction Research", 2021, "https://doi.org/10.1159/000515667", "10.1159/000515667", "2021 review of 40 studies, including randomized and open-label designs, found some three-month cannabis-use benefits. Adult and adolescent findings differed; its favorable estimates do not establish equal effects across substances or follow-up periods.", "meta_analysis", "supports", novemberRecoveryPreventionResearchCheckedAt),
	motivationalPsychosis: researchSource("Efficacy of Motivational Interviewing in Treating Co-occurring Psychosis and Substance Use Disorder", "The Journal of Clinical Psychiatry", 2021, "https://doi.org/10.4088/jcp.21r13916", "10.4088/jcp.21r13916", "Published online in December 2021. Review of co-occurring psychosis and substance-use disorders found no significant substance-use benefit for interviewing alone, with a small benefit in combined interventions. Combination studies do not isolate interviewing's contribution.", "meta_analysis", "debate", novemberRecoveryPreventionResearchCheckedAt),
	alcoholBriefCompleted: researchSource("Effectiveness of brief alcohol interventions in primary care populations", "Cochrane Database of Systematic Reviews", 2018, "https://doi.org/10.1002/14651858.cd004148.pub4", "10.1002/14651858.cd004148.pub4", "Completed 2018 Cochrane update included 69 trials with 33,642 randomized participants. Its main one-year analysis of 34 trials found a modest 20 g/week reduction versus minimal or no intervention. Binge frequency and drinking intensity changed little; treatment-seeking alcohol dependence was not its main population.", "systematic_review", "supports", novemberRecoveryPreventionResearchCheckedAt),
	alcoholBriefDistillation: researchSource("The Cochrane 2018 Review on Brief Interventions in Primary Care for Hazardous and Harmful Alcohol Consumption: A Distillation for Clinicians and Policy Makers", "Alcohol and Alcoholism", 2019, "https://doi.org/10.1093/alcalc/agz035", "10.1093/alcalc/agz035", "2019 clinical distillation of the same 2018 Cochrane review, not a separate set of trials. It distinguishes the newer 69-study evidence from the earlier 2007 review and reports similar average consumption benefits in men and women.", "systematic_review", "context", novemberRecoveryPreventionResearchCheckedAt),
	alcoholBriefUmbrella: researchSource("Effectiveness of brief interventions in primary health care settings to decrease alcohol consumption by adult non-dependent drinkers: a systematic review of systematic reviews", "Preventive Medicine", 2015, "https://doi.org/10.1016/j.ypmed.2014.12.010", "10.1016/j.ypmed.2014.12.010", "2015 overview of seven earlier reviews in adult non-dependent drinkers found reductions in consumption, with varied definitions and interventions. Its suggestion about multiple contacts differs from later imprecise duration comparisons; reviews overlap underlying trials.", "systematic_review", "context", novemberRecoveryPreventionResearchCheckedAt),
	peerHealthcareReview: researchSource("Effectiveness of peer recovery support services for substance use disorders: A systematic review of healthcare utilization, behavioral health, and engagement outcomes", "Drug and Alcohol Dependence", 2026, "https://doi.org/10.1016/j.drugalcdep.2026.113290", "10.1016/j.drugalcdep.2026.113290", "October 2026 review of 53 studies found more favorable treatment-linkage and engagement results than substance use, emergency care, overdose or mortality outcomes. Nonrandomized and multicomponent designs limit causal conclusions; program components were not independently tested.", "systematic_review", "debate", novemberRecoveryPreventionResearchCheckedAt),
	peerRecoveryReview: researchSource("Peer Recovery Support Services and Recovery Coaching for Substance Use Disorder: A Systematic Review", "Current Addiction Reports", 2025, "https://doi.org/10.1007/s40429-025-00645-8", "10.1007/s40429-025-00645-8", "2025 update covering 28 multi-group studies and 12,601 participants supports treatment engagement and retention. Substance-use outcomes remained preliminary and inconclusive, with substantial differences between programs and populations.", "systematic_review", "supports", novemberRecoveryPreventionResearchCheckedAt),
	peerOpioidCascade: researchSource("Effectiveness of peer recovery support services on stages of the opioid use disorder treatment cascade: A systematic review", "Drug and Alcohol Dependence", 2021, "https://doi.org/10.1016/j.drugalcdep.2021.109123", "10.1016/j.drugalcdep.2021.109123", "2021 opioid-specific review included 12 studies, only two randomized. Outcomes were inconsistent; no included studies reported medication retention or remission. Treatment linkage should not be relabeled as lasting remission or reduced mortality.", "systematic_review", "debate", novemberRecoveryPreventionResearchCheckedAt),
	smokingIncentivesNew: researchSource("Incentives for smoking cessation", "Cochrane Database of Systematic Reviews", 2025, "https://doi.org/10.1002/14651858.cd004307.pub7", "10.1002/14651858.cd004307.pub7", "Completed 2025 Cochrane update found high-certainty evidence of improved long-term cessation, including analyses after rewards ended. Mixed-population and pregnancy findings use separate populations. Indirect payment-value comparisons do not identify an optimal incentive.", "systematic_review", "supports", novemberRecoveryPreventionResearchCheckedAt),
	smokingIncentiveTrial: researchSource("Effects of Large Financial Incentives for Long-Term Smoking Cessation", "Journal of the American College of Cardiology", 2016, "https://doi.org/10.1016/j.jacc.2016.04.066", "10.1016/j.jacc.2016.04.066", "2016 randomized Geneva trial in 805 low-income smokers compared the same information support with or without incentives. Verified continuous abstinence between months six and eighteen was 9.5% versus 3.7%, distinct from seven-day point-prevalence abstinence. Incentives ended at six months.", "landmark_study", "supports", novemberRecoveryPreventionResearchCheckedAt),
	pelvicFloorCochrane: researchSource("Pelvic floor muscle training versus no treatment, or inactive control treatments, for urinary incontinence in women: a cochrane systematic review abridged republication", "Brazilian Journal of Physical Therapy", 2019, "https://doi.org/10.1016/j.bjpt.2019.01.002", "10.1016/j.bjpt.2019.01.002", "2019 abridged republication of the 2018 Cochrane review, covering 31 trials and 1,817 women. Training improved leakage and quality of life versus inactive controls, especially with stress incontinence. Long-term durability remains less certain; this is not a new independent Cochrane update.", "systematic_review", "supports", novemberRecoveryPreventionResearchCheckedAt),
	pelvicFloorReview: researchSource("Pelvic Floor Muscle Training for Urinary Incontinence with or without Biofeedback or Electrostimulation in Women: A Systematic Review", "International Journal of Environmental Research and Public Health", 2022, "https://doi.org/10.3390/ijerph19052789", "10.3390/ijerph19052789", "2022 review of 15 randomized studies in 2,441 non-pregnant women examined training and related physical therapies. Interventions and leakage measures varied; overlapping improvement percentages should not become one universal cure probability.", "systematic_review", "supports", novemberRecoveryPreventionResearchCheckedAt),
	pelvicFloorMenopause: researchSource("Effect of pelvic floor muscle training on urinary incontinence symptoms in postmenopausal women: A systematic review and meta-analysis", "European Journal of Obstetrics & Gynecology and Reproductive Biology", 2025, "https://doi.org/10.1016/j.ejogrb.2024.11.040", "10.1016/j.ejogrb.2024.11.040", "January 2025 journal issue, despite 2024 discovery metadata and DOI. Five postmenopausal trials favored training with high heterogeneity. Its converted probability-of-benefit statistic is not an observed 92% personal cure rate.", "meta_analysis", "supports", novemberRecoveryPreventionResearchCheckedAt),
	atrialScreenMeta: researchSource("Screening for atrial fibrillation to prevent stroke: a meta-analysis", "European Heart Journal Open", 2022, "https://doi.org/10.1093/ehjopen/oeac044", "10.1093/ehjopen/oeac044", "2022 synthesis of four trials and 35,836 participants found a small pooled stroke reduction, but sequential analysis did not cross its stopping boundary. Populations and screening methods differed; post-stroke screening was excluded.", "meta_analysis", "supports", novemberRecoveryPreventionResearchCheckedAt),
	atrialScreenStroke: researchSource("Screening for Atrial Fibrillation in Stroke Prevention: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Reviews in Cardiovascular Medicine", 2025, "https://doi.org/10.31083/rcm36262", "10.31083/rcm36262", "2025 review of 12 trials found more atrial-fibrillation detection and a small composite-outcome benefit, without significant improvement in each individual endpoint. Its automated takeaway should not override that distinction. Detection, prescribing and stroke prevention are separate outcomes.", "meta_analysis", "debate", novemberRecoveryPreventionResearchCheckedAt),
	atrialScreenOutcomes: researchSource("Clinical outcomes of atrial fibrillation screening: a meta-analysis of randomized controlled trials", "Annals of Medicine", 2025, "https://doi.org/10.1080/07853890.2025.2457522", "10.1080/07853890.2025.2457522", "2025 synthesis of seven trials found a modest stroke-or-embolism reduction but no mortality benefit. The non-invasive-only estimate was inconclusive. Its ten-year number-needed-to-screen is modeled for 75-year-olds, not an observed universal benefit, and trials overlap other syntheses.", "meta_analysis", "supports", novemberRecoveryPreventionResearchCheckedAt)
};

export const novemberRecoveryPreventionClaims = [
	reviewedEntry({
		topicSlug: "substance-use-and-addiction",
		slug: "does-cbt-reduce-gambling-harm",
		title: "Does CBT reduce gambling harm?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Cognitive behavioral treatment can reduce gambling problems in the short term. Lasting benefit is less certain, and studies may overestimate how much it helps.",
		stableCore: [
			"Trials generally find less gambling and lower symptom severity immediately after treatment.",
			"Benefits for anxiety or quality of life are different from stopping gambling.",
			"Small studies, varied treatments and publication bias limit confidence in the average effect."
		],
		openQuestions: [
			"How well do gains last after treatment ends?",
			"Which approaches help people with different gambling patterns and support needs?"
		],
		whatWouldChangeMinds: [
			"Larger well-run trials comparing CBT with active treatment and reporting longer follow-up.",
			"Consistent effects on gambling harm, finances and quality of life rather than symptoms alone."
		],
		misconceptions: [
			"An estimate comparing outcome distributions is a measured percentage of people cured."
		],
		editorSummary: "Short-term treatment benefits are clearer than long-term recovery.",
		population: "Adults with gambling-related harms or gambling disorder in the studied treatment settings.",
		scope: "Compare cognitive behavioral treatment with minimal or no treatment, separating gambling behavior, symptom severity and broader recovery outcomes.",
		excludedEvidence: [
			"Gaming disorder is a different condition from gambling disorder.",
			"Overlapping meta-analyses and distribution-based effect conversions are not independent trials or personal cure probabilities."
		],
		uncertainty: "Follow-up evidence is limited, studies are heterogeneous and publication bias can exaggerate short-term effects.",
		sources: [sources.gamblingCbtMeta, sources.gamblingRecoveryMeta, sources.gamblingUmbrella]
	}, novemberRecoveryPreventionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "substance-use-and-addiction",
		slug: "does-motivational-interviewing-reduce-substance-use",
		title: "Does motivational interviewing reduce substance use?",
		band: "mixed",
		certainty: "low",
		bottomLine: "It can have small benefits compared with no support or brief feedback. It has not consistently outperformed usual care or other active treatments.",
		stableCore: [
			"The comparison treatment strongly affects the apparent benefit.",
			"Results vary by substance, population and follow-up period.",
			"Combining interviewing with other treatment does not show how much interviewing alone contributes."
		],
		openQuestions: [
			"Which people benefit most beyond the support already available?",
			"Do effects persist when delivery quality and longer follow-up are measured carefully?"
		],
		whatWouldChangeMinds: [
			"Replicated advantages over credible active treatments rather than only no-treatment controls.",
			"Trials that clearly identify the intervention and separate its contribution from combined care."
		],
		misconceptions: [
			"A helpful conversation has the same proven effect across all substance-use disorders."
		],
		editorSummary: "Benefits depend on the alternative care and population.",
		population: "Adolescents and adults in studied alcohol and drug-use interventions; eligibility varies.",
		scope: "Assess motivational interviewing and motivational enhancement approaches, separating no-intervention, feedback, usual-care and active-treatment comparisons.",
		excludedEvidence: [
			"Combined therapy packages do not isolate motivational interviewing's effect.",
			"Cannabis-specific short-term findings do not establish equal benefits for other substances or severe co-occurring illness."
		],
		uncertainty: "Many trials have bias risks, delivery varies and evidence certainty is often low or very low.",
		sources: [sources.motivationalCochrane, sources.motivationalCannabis, sources.motivationalPsychosis]
	}, novemberRecoveryPreventionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "substance-use-and-addiction",
		slug: "do-brief-alcohol-interventions-reduce-drinking",
		title: "Do brief alcohol interventions reduce drinking?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Brief conversations in primary care can modestly reduce drinking among people drinking at harmful levels. Evidence is clearer for average weekly consumption than for binge drinking or later health outcomes.",
		stableCore: [
			"The updated Cochrane review found lower average consumption after one year than minimal or no intervention.",
			"Men and women both showed average benefits in the updated evidence.",
			"Longer counseling did not clearly provide a larger benefit than brief support."
		],
		openQuestions: [
			"Which conversation components matter most in routine care?",
			"How well do modest consumption changes translate into fewer injuries or illnesses?"
		],
		whatWouldChangeMinds: [
			"Consistent effects on injuries, illness and sustained drinking patterns across diverse care settings.",
			"Direct comparisons that clarify the added value of different intensities and follow-up."
		],
		misconceptions: [
			"A brief intervention is a treatment for dangerous alcohol withdrawal or every level of alcohol dependence."
		],
		editorSummary: "The best-supported effect is a modest reduction in average consumption.",
		population: "People attending general practice, emergency or other primary care for reasons other than alcohol treatment.",
		scope: "Compare clinician-delivered brief alcohol interventions with minimal or no intervention in hazardous or harmful drinkers.",
		excludedEvidence: [
			"Digital-only programs and specialist dependence treatment are separate interventions.",
			"Related Cochrane versions and their clinical distillation are not independent evidence bases."
		],
		uncertainty: "Attrition, varied interventions and substantial heterogeneity limit precision; safety and hard health outcomes were sparsely reported.",
		sources: [sources.alcoholBriefCompleted, sources.alcoholBriefDistillation, sources.alcoholBriefUmbrella]
	}, novemberRecoveryPreventionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "substance-use-and-addiction",
		slug: "do-peer-recovery-services-improve-addiction-outcomes",
		title: "Do peer recovery services improve addiction outcomes?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Peer-led services can help people connect with treatment and stay engaged. Evidence that they also reduce substance use, overdose or deaths remains uncertain.",
		stableCore: [
			"Programs involve people with lived experience providing support or navigation.",
			"Treatment engagement has more consistent favorable evidence than longer-term substance-use outcomes.",
			"Many evaluations combine peer support with other services or lack a strong comparison group."
		],
		openQuestions: [
			"When does better engagement lead to lasting recovery or fewer overdoses?",
			"Which service models work best in different populations and care systems?"
		],
		whatWouldChangeMinds: [
			"Well-designed comparative studies showing sustained substance-use or health benefits.",
			"Consistent results that separate peer support from the other services offered alongside it."
		],
		misconceptions: [
			"A referral or treatment visit is the same outcome as sustained remission."
		],
		editorSummary: "Engagement benefits are better supported than reduced harm or lasting remission.",
		population: "People with alcohol or drug-use disorders, mostly in higher-income treatment and recovery systems.",
		scope: "Assess peer recovery support and coaching, separating treatment linkage, retention, substance use and major health outcomes.",
		excludedEvidence: [
			"Uncontrolled improvements cannot establish a causal peer-service effect.",
			"Clinical medication effects and mutual-help programs without a defined peer-service intervention answer different questions."
		],
		uncertainty: "Programs differ, many studies are nonrandomized and long-term or low-income-country evidence is limited.",
		sources: [sources.peerHealthcareReview, sources.peerRecoveryReview, sources.peerOpioidCascade]
	}, novemberRecoveryPreventionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "substance-use-and-addiction",
		slug: "do-financial-incentives-help-people-stop-smoking",
		title: "Do financial incentives help people stop smoking?",
		band: "broad",
		certainty: "high",
		bottomLine: "Yes. Incentive programs increase smoking quit rates, and some benefits persist after rewards end. Results depend on the program and do not identify one best payment amount.",
		stableCore: [
			"Randomized studies support higher quit rates at follow-up of at least six months.",
			"Trials with follow-up after incentives stop still find benefits on average.",
			"Continuous abstinence and a recent smoke-free period are different measures of success."
		],
		openQuestions: [
			"Which designs are most effective and affordable in different settings?",
			"How long do benefits persist across populations and support arrangements?"
		],
		whatWouldChangeMinds: [
			"Direct comparisons of program designs with verified long-term abstinence and costs.",
			"More trials in lower-income countries and underrepresented populations."
		],
		misconceptions: [
			"A nonsignificant comparison between payment values proves that any reward works equally well."
		],
		editorSummary: "Benefits can outlast the incentive period, with variable success across programs.",
		population: "People who smoke in studied community, workplace and clinical programs; pregnancy trials are analyzed separately.",
		scope: "Assess financial-incentive cessation programs and verified long-term abstinence, distinguishing reward periods and follow-up.",
		excludedEvidence: [
			"Superseded Cochrane versions are not separate independent confirmations.",
			"Smoking cessation outcomes do not establish an equivalent benefit for every substance-use intervention or reward scheme."
		],
		uncertainty: "Program structure, background support and setting vary; indirect payment-value analyses do not establish an optimal design.",
		sources: [sources.smokingIncentivesNew, sources.smokingIncentiveTrial]
	}, novemberRecoveryPreventionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "reproductive-and-sexual-health",
		slug: "does-pelvic-floor-training-help-urinary-incontinence",
		title: "Does pelvic-floor training help urinary incontinence?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, particularly for stress-related leakage in women. Benefits vary by the type of incontinence and the program, and longer-term results are less certain.",
		stableCore: [
			"Trials generally find less leakage and better quality of life than inactive controls.",
			"Stress, urgency and mixed incontinence do not have identical evidence.",
			"Training, combined physical therapies and different patient groups require separate comparisons."
		],
		openQuestions: [
			"How well do improvements last after supervised treatment ends?",
			"Which programs work best for different causes of leakage and life stages?"
		],
		whatWouldChangeMinds: [
			"More consistent long-term comparisons using the same meaningful leakage and quality-of-life measures.",
			"Trials separating training from additional therapies and clearly identifying patient groups."
		],
		misconceptions: [
			"A converted probability-of-benefit statistic is a measured personal chance of being cured."
		],
		editorSummary: "Evidence supports less leakage, with variation between symptoms and programs.",
		population: "Women with stress, urgency or mixed urinary incontinence in studied clinical groups, including postmenopausal women.",
		scope: "Compare pelvic-floor muscle training with inactive control or other conservative care, keeping incontinence types and combined therapies distinct.",
		excludedEvidence: [
			"Pregnancy, postpartum care and male incontinence require their own evidence.",
			"A review's abridged republication is not a new trial population; heterogeneous pooled improvements are not universal cure rates."
		],
		uncertainty: "Many trials are small, interventions and measures vary, and the postmenopausal synthesis has high heterogeneity. Clinical assessment determines suitability.",
		sources: [sources.pelvicFloorCochrane, sources.pelvicFloorReview, sources.pelvicFloorMenopause]
	}, novemberRecoveryPreventionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		slug: "does-atrial-fibrillation-screening-prevent-strokes",
		title: "Does atrial-fibrillation screening prevent strokes?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Screening can find more atrial fibrillation, but its effect on strokes is small and uncertain across programs. Benefits depend on who is screened, the monitoring used and the care that follows.",
		stableCore: [
			"Finding an irregular rhythm is different from preventing a stroke.",
			"Some pooled randomized results favor screening, while individual outcomes and non-invasive-only analyses can remain inconclusive.",
			"Screening studies have not shown a clear overall mortality benefit."
		],
		openQuestions: [
			"Which populations and screening methods provide a meaningful absolute benefit?",
			"How do downstream treatment, false alarms and longer follow-up affect the balance of benefits and harms?"
		],
		whatWouldChangeMinds: [
			"Consistent clinically meaningful stroke reductions with clearly specified screening and treatment pathways.",
			"Trials clarifying non-invasive screening, bleeding, anxiety and absolute benefit in different risk groups."
		],
		misconceptions: [
			"Effective treatment for diagnosed atrial fibrillation proves that screening everyone will prevent strokes."
		],
		editorSummary: "More diagnoses do not automatically produce a large stroke-prevention benefit.",
		population: "Mostly older adults without known atrial fibrillation in studied screening programs; post-stroke evaluation is separate.",
		scope: "Assess systematic or opportunistic rhythm screening and clinical outcomes, separating diagnosis, treatment initiation, stroke, embolism and mortality.",
		excludedEvidence: [
			"Smartwatch diagnostic confirmation and anticoagulation for established disease are separate questions.",
			"A composite effect or modeled ten-year number-needed-to-screen is not an observed benefit in each endpoint or every population."
		],
		uncertainty: "Trial populations, monitoring and outcome definitions differ; syntheses overlap and some positive pooled estimates are close to no effect.",
		sources: [sources.atrialScreenMeta, sources.atrialScreenStroke, sources.atrialScreenOutcomes]
	}, novemberRecoveryPreventionResearchCheckedAt)
];
