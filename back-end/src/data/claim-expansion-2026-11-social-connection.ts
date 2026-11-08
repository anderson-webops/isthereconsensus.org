import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberSocialConnectionResearchCheckedAt = "2026-11-08T11:39:16.388Z";

const sources = {
	volunteering1: researchSource("Exploring the Effects of Volunteering on the Social, Mental, and Physical Health and Well-being of Volunteers: An Umbrella Review", "Voluntas: International Journal of Voluntary and Nonprofit Organizations", 2024, "https://doi.org/10.1007/s11266-023-00573-z", "10.1007/s11266-023-00573-z", "Umbrella review of 28 reviews, mainly involving older US populations. Review quality was generally poor. Positive associations do not establish a universal causal benefit or a prescription to volunteer.", "systematic_review", "supports", novemberSocialConnectionResearchCheckedAt),
	volunteering2: researchSource("Voluntary work for the physical and mental health of older volunteers: A systematic review", "Campbell Systematic Reviews: Better Evidence for a Better World", 2020, "https://doi.org/10.1002/cl2.1124", "10.1002/cl2.1124", "The synthesis used 24 studies from 19 populations after exclusions and duplicate-data checks; 21 were nonrandomized and three randomized. Mortality hazard associations are not guaranteed reductions in an individual's probability of death.", "meta_analysis", "context", novemberSocialConnectionResearchCheckedAt),
	volunteering4: researchSource("A randomized controlled trial and pragmatic analysis of the effects of volunteering on the health and well-being of older people", "Aging Clinical and Experimental Research", 2020, "https://doi.org/10.1007/s40520-019-01241-3", "10.1007/s40520-019-01241-3", "Original report from a 445-person Australian randomized trial, published in the 2020 journal issue. Significant differences concerned some mobility outcomes. Its pragmatic and per-protocol analyses should not be described as uniformly positive psychological results or an independent trial from its later follow-up.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	volunteering3: researchSource("Longitudinal associations between formal volunteering and well-being among retired older people: follow-up results from a randomized controlled trial", "Aging & Mental Health", 2022, "https://doi.org/10.1080/13607863.2021.1884845", "10.1080/13607863.2021.1884845", "Follow-up of the same 445-person Australian trial as the original pragmatic report. The well-being comparison selected 73 intervention and 112 control compliers; selection does not preserve the full randomized contrast.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	spendingRegistered: researchSource("Does spending money on others promote happiness?: A registered replication report.", "Journal of Personality and Social Psychology", 2020, "https://doi.org/10.1037/pspa0000191", "10.1037/pspa0000191", "Published registered replication, DOI 10.1037/pspa0000191. The index also points to its preprint; these are one study. Results were positive for spending among 712 students, null for recall among 1,950 adults and small positive for modified recall among 5,199 adults.", "landmark_study", "context", novemberSocialConnectionResearchCheckedAt),
	spending2: researchSource("Prosocial spending encourages happiness: A replication of the only experiment reported in Dunn, Aknin, and Norton (2008)", "PLOS ONE", 2022, "https://doi.org/10.1371/journal.pone.0272434", "10.1371/journal.pone.0272434", "Close replication with 133 participants. The original analysis was not significant; an additional analysis of another happiness measure was positive. The apparent result depends on the analysis and measure.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	spendingSystematic: researchSource("Better to give? A systematic review of prosocial spending and happiness", "Scandinavian Journal of Psychology", 2023, "https://doi.org/10.1111/sjop.12948", "10.1111/sjop.12948", "Systematic review of 14 empirical studies addressing prosocial spending and moderators. The abstract supplies no pooled effect estimate. Its evidence overlaps other cited work and does not establish affordability, universal effects or lasting happiness.", "systematic_review", "supports", novemberSocialConnectionResearchCheckedAt),
	spending3: researchSource("The Emotional Rewards of Prosocial Spending Are Robust and Replicable in Large Samples", "Current Directions in Psychological Science", 2022, "https://doi.org/10.1177/09637214221121100", "10.1177/09637214221121100", "Narrative evaluation of 15 published preregistered experiments. It is not a new independent meta-analysis and shares primary studies and researchers with other cited work.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	spending1: {
		...researchSource("Spending Money on Others Promotes Happiness", "Science", 2008, "https://doi.org/10.1126/science.1150952", "10.1126/science.1150952", "The 2009 correction, DOI 10.1126/science.324_1143a, reports a software-related data error in the 16-person longitudinal component. Its reported coefficient fell from 0.81 to 0.55 after correction. The notice says the other studies, including the 46-person spending experiment, were unaffected.", "landmark_study", "context", novemberSocialConnectionResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1126/science.1150952",
			"https://api.crossref.org/works?filter=updates%3A10.1126%2Fscience.1150952&rows=100",
			"https://doi.org/10.1126/science.324_1143a"
		]
	},
	contact1: researchSource("The contact hypothesis re-evaluated", "Behavioural Public Policy", 2019, "https://doi.org/10.1017/bpp.2018.25", "10.1017/bpp.2018.25", "Policy-focused review of 27 randomized studies with delayed outcomes, published in the 2019 issue. Ethnic and racial effects were weaker, with important adult-evidence gaps at the review's cutoff.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	contact2: researchSource("Intergroup contact is reliably associated with reduced prejudice, even in the face of group threat and discrimination.", "American Psychologist", 2023, "https://doi.org/10.1037/amp0001144", "10.1037/amp0001144", "Two meta-analyses draw on 34 correlational studies, 67 subsamples and 63,945 respondents across 19 countries. Threat and discrimination moderation does not convert associations into randomized causal evidence.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	contact3: researchSource("Can Social Contact Reduce Prejudice and Discrimination? Evidence from a Field Experiment in Nigeria", "American Political Science Review", 2018, "https://doi.org/10.1017/s0003055418000151", "10.1017/s0003055418000151", "Randomized Nigerian vocational-training experiment with 849 young men. Prejudice did not change; the mixed-versus-homogeneous behavioral difference was traced to increased discrimination in the homogeneous condition, not a simple demonstrated improvement in the mixed arm.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	weakTies4: researchSource("Mistakenly seeking solitude.", "Journal of Experimental Psychology: General", 2014, "https://doi.org/10.1037/a0037323", "10.1037/a0037323", "Foundational field and laboratory experiments comparing brief conversation with disconnection and normal activity. Positive immediate experiences do not establish long-term clinical benefit or that contact is welcome in every setting.", "landmark_study", "supports", novemberSocialConnectionResearchCheckedAt),
	weakTies2: researchSource("Minimal Social Interactions with Strangers Predict Greater Subjective Well-Being", "Journal of Happiness Studies", 2021, "https://doi.org/10.1007/s10902-020-00298-6", "10.1007/s10902-020-00298-6", "Two studies: an 856-person correlational survey and a 265-person experiment. The experimental outcome was momentary positive affect, not proof of a lasting improvement in life satisfaction.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	weakTies1: researchSource("Improving social connection with weak ties and strangers: effects of a new micro-intervention on interaction quality and social behavior", "The Journal of Positive Psychology", 2025, "https://doi.org/10.1080/17439760.2024.2394451", "10.1080/17439760.2024.2394451", "Trial of 335 young adults, published in the 2025 issue. The intervention improved interaction quality over two days. Baseline mental-health associations and short-term experimental interaction outcomes should remain separate.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	kindness1: researchSource("Happy to help? A systematic review and meta-analysis of the effects of performing acts of kindness on the well-being of the actor", "Journal of Experimental Social Psychology", 2018, "https://doi.org/10.1016/j.jesp.2018.02.014", "10.1016/j.jesp.2018.02.014", "Review of 27 experimental studies in 24 articles, involving 4,045 participants and 52 effect estimates. A modest pooled benefit spans varied kindness activities; these counts are different units and do not identify one best act.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	kindness2: researchSource("Rewards of kindness? A meta-analysis of the link between prosociality and well-being.", "Psychological Bulletin", 2020, "https://doi.org/10.1037/bul0000298", "10.1037/bul0000298", "Broad prosociality synthesis: 201 studies, 198,213 participants and an overall correlation of 0.13. It combines different designs and measures; this is not a 13% happiness increase or a causal estimate for a specific favor.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	kindness3: researchSource("Prosocial Interventions and Health Outcomes", "JAMA Network Open", 2023, "https://doi.org/10.1001/jamanetworkopen.2023.46789", "10.1001/jamanetworkopen.2023.46789", "Review of 30 studies of varied prosocial interventions. Some health outcomes concerned recipients and service uptake rather than giver well-being. Counts of studies reporting positive outcomes are not a pooled effect or a guarantee.", "systematic_review", "context", novemberSocialConnectionResearchCheckedAt),
	selfCompassion2: researchSource("Effects of Self-Compassion Interventions on Reducing Depressive Symptoms, Anxiety, and Stress: A Meta-Analysis", "Mindfulness", 2023, "https://doi.org/10.1007/s12671-023-02148-x", "10.1007/s12671-023-02148-x", "Meta-analysis of 56 randomized trials with small-to-moderate immediate distress reductions and smaller follow-up effects. Overall risk of bias was high and active-control comparisons were uncommon; the review was not preregistered.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	selfCompassion3: researchSource("Effectiveness of self‐compassion‐related interventions for reducing self‐criticism: A systematic review and meta‐analysis", "Clinical Psychology & Psychotherapy", 2022, "https://doi.org/10.1002/cpp.2586", "10.1002/cpp.2586", "Self-criticism review: 20 eligible trials and 19 usable papers with 1,350 participants. Benefits were greater against passive than active controls, with heterogeneity and a need for stronger follow-up evidence.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	selfCompassion1: researchSource("Self-Compassion Interventions and Psychosocial Outcomes: a Meta-Analysis of RCTs", "Mindfulness", 2019, "https://doi.org/10.1007/s12671-019-01134-6", "10.1007/s12671-019-01134-6", "Review of 27 randomized trials reporting diverse psychological outcomes. Interventions were heterogeneous and possible publication bias was acknowledged. Its results should not be treated as independent of later overlapping reviews.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	empathy2: researchSource("Categories of training to improve empathy: A systematic review and meta-analysis.", "Psychological Bulletin", 2024, "https://doi.org/10.1037/bul0000453", "10.1037/bul0000453", "Review of 110 eligible studies. Affective, cognitive, motivational, behavioral and composite empathy are different dimensions with overlapping samples and different durability. Their sample counts are not independent study totals.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	empathy1: {
		...researchSource("The efficacy of empathy training: A meta-analysis of randomized controlled trials.", "Journal of Counseling Psychology", 2016, "https://doi.org/10.1037/cou0000093", "10.1037/cou0000093", "2016 issue: 18 randomized trials and 1,018 participants after one outlier exclusion. Possible publication-bias adjustment reduced the pooled effect. Correction 10.1037/cou0000130 fixes the author's running-head name.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1037/cou0000093",
			"https://doi.org/10.1037/cou0000130",
			"https://api.crossref.org/works?filter=updates%3A10.1037%2Fcou0000093&rows=100"
		]
	},
	empathy3: researchSource("Teaching cognitive and affective empathy in medicine: a systematic review and meta-analysis of randomized controlled trials", "Medical Education Online", 2025, "https://doi.org/10.1080/10872981.2025.2501263", "10.1080/10872981.2025.2501263", "Medical-education synthesis of 36 randomized studies and 3,833 participants. Cognitive and affective empathy scores improved on average, with heterogeneity; this does not directly demonstrate improved patient outcomes or general-population transfer.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	prejudiceReview: researchSource("Prejudice Reduction: Progress and Challenges", "Annual Review of Psychology", 2021, "https://doi.org/10.1146/annurev-psych-071620-030619", "10.1146/annurev-psych-071620-030619", "2021 review of 418 experiments in 309 manuscripts. Most were brief interventions; long-term effects were unclear and publication bias was a concern. The review spans many methods, not one uniform perspective-taking or workplace-training program.", "meta_analysis", "debate", novemberSocialConnectionResearchCheckedAt),
	perspective1: researchSource("In someone else’s shoes: Reducing prejudice through perspective taking", "Journal of Development Economics", 2024, "https://doi.org/10.1016/j.jdeveco.2024.103309", "10.1016/j.jdeveco.2024.103309", "Colombian randomized online experiment comparing migrant-focused video, an immersive game and control. Attitudes and altruism improved short term; only the game increased reported trust. It does not establish durable discrimination reduction.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	perspective2: researchSource("Which Narrative Strategies Durably Reduce Prejudice? Evidence from Field and Survey Experiments Supporting the Efficacy of Perspective‐Getting", "American Journal of Political Science", 2023, "https://doi.org/10.1111/ajps.12657", "10.1111/ajps.12657", "Published in the 2023 journal issue. Three field studies and a survey experiment distinguish perspective-getting from imagined perspective-taking and other narrative components; hearing accounts retained effects without all the compound treatment's ingredients.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	diversityTraining1: researchSource("The mixed effects of online diversity training", "Proceedings of the National Academy of Sciences", 2019, "https://doi.org/10.1073/pnas.1816076116", "10.1073/pnas.1816076116", "Preregistered field experiment with 3,016 employees, an active placebo and workplace decisions measured up to 20 weeks. Attitude and behavioral effects differed across groups, limiting stand-alone one-off training claims.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	diversityTraining2: researchSource("Workplace diversity training reduces prejudice and promotes anti-discrimination intentions", "Ethnic and Racial Studies", 2025, "https://doi.org/10.1080/01419870.2025.2478268", "10.1080/01419870.2025.2478268", "Switching-replication study of 76 employees across three organizations. Prejudice and anti-discrimination intentions improved; compassion and perspective-taking did not. Intentions are not observed discriminatory decisions.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	diversityTraining3: {
		...researchSource("The Impact of Implicit-Bias-Oriented Diversity Training on Police Officers’ Beliefs, Motivations, and Actions", "Psychological Science", 2023, "https://doi.org/10.1177/09567976221150617", "10.1177/09567976221150617", "Study of 3,764 US officers with transient knowledge and intention gains. Correction 10.1177/09567976251362783 fixes education-level dummy coding and reanalyzes data; the notice says the main-text change concerned the bachelor's-degree percentage.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1177/09567976221150617",
			"https://doi.org/10.1177/09567976251362783",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F09567976221150617&rows=100"
		]
	},
	emotionalIntelligence3: researchSource("Training emotional competencies at the workplace: a systematic review and metaanalysis", "BMC Psychology", 2024, "https://doi.org/10.1186/s40359-024-02198-3", "10.1186/s40359-024-02198-3", "Workplace emotional-competency review of 50 studies overall and 27 controlled studies in a separate analysis. Effects persisted beyond three months, but study quality was low and heterogeneity high; broader competencies and job outcomes are distinct.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	emotionalIntelligence1: researchSource("Can emotional intelligence be trained? A meta-analytical investigation", "Human Resource Management Review", 2019, "https://doi.org/10.1016/j.hrmr.2018.03.002", "10.1016/j.hrmr.2018.03.002", "2019 synthesis of 58 studies, including pre-post and treatment-control designs. Positive score effects were larger in published studies than dissertations. Not all included studies were randomized.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	emotionalIntelligence2: researchSource("How Efficient Are Emotional Intelligence Trainings: A Meta-Analysis", "Emotion Review", 2018, "https://doi.org/10.1177/1754073917708613", "10.1177/1754073917708613", "Review of 24 studies and 28 samples of healthy adults. Pre-post and follow-up score changes do not alone isolate a causal training effect or establish improved work performance.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	forgiveness1: researchSource("Forgiveness Therapy for the Promotion of Mental Well-Being: A Systematic Review and Meta-Analysis", "Trauma, Violence, & Abuse", 2018, "https://doi.org/10.1177/1524838016637079", "10.1177/1524838016637079", "Randomized-trial synthesis of process-based forgiveness interventions after varied hurts or violence. Average distress benefits concern voluntary supported programs, not an obligation to forgive, excuse harm or reconcile.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	forgiveness2: researchSource("Efficacy of psychotherapeutic interventions to promote forgiveness: A meta-analysis.", "Journal of Consulting and Clinical Psychology", 2014, "https://doi.org/10.1037/a0035268", "10.1037/a0035268", "Meta-analysis of 54 research reports, with different post-treatment and follow-up counts. Forgiveness improved against no treatment and alternatives; some distress comparisons were against no treatment. Moderator associations do not prove one program superior.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	forgiveness3: researchSource("Effectiveness of forgiveness training programs in university contexts: a systematic review and meta-analysis", "Cogent Education", 2024, "https://doi.org/10.1080/2331186x.2024.2378242", "10.1080/2331186x.2024.2378242", "University review included 20 articles; its meta-analysis used 11 randomized trials and one quasi-experimental study. It does not establish the same outcomes across every population or form of harm.", "systematic_review", "supports", novemberSocialConnectionResearchCheckedAt),
	relationshipEducation3: researchSource("Online relationship education programs improve individual and relationship functioning: A meta‐analytic review", "Journal of Marital and Family Therapy", 2021, "https://doi.org/10.1111/jmft.12491", "10.1111/jmft.12491", "Random-effects review of 12 publications on online relationship education. Positive average outcomes do not validate every commercial course, establish equivalence among programs or show the same benefit for every couple.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	relationshipEducation2: researchSource("Effects of relationship education on couple communication and satisfaction: A randomized controlled trial with low-income couples.", "Journal of Consulting and Clinical Psychology", 2016, "https://doi.org/10.1037/ccp0000056", "10.1037/ccp0000056", "Analysis of 1,034 couples with required follow-up data from a larger randomized low-income-couple project. Satisfaction effects were small; observed communication did not mediate satisfaction gains. This selected analysis is not the whole randomized cohort.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	relationshipEducation1: researchSource("Improved couple satisfaction and communication with marriage and relationship programs: are there gender differences?: a systematic review and meta-analysis", "Systematic Reviews", 2021, "https://doi.org/10.1186/s13643-021-01719-0", "10.1186/s13643-021-01719-0", "Review of 12 studies mixing education, enrichment and therapy. High heterogeneity and scant evidence led the authors to uncertainty about true effects. Therapy effect estimates do not directly describe a general educational course.", "meta_analysis", "context", novemberSocialConnectionResearchCheckedAt),
	apologies1: researchSource("Removing the Shadow of Suspicion: The Effects of Apology Versus Denial for Repairing Competence- Versus Integrity-Based Trust Violations.", "Journal of Applied Psychology", 2004, "https://doi.org/10.1037/0021-9010.89.1.104", "10.1037/0021-9010.89.1.104", "Foundational two-study test of trust repair after alleged competence or integrity violations, with later evidence of guilt or innocence. Context-dependent apology-versus-denial findings do not justify dishonest denials or replace accountability.", "landmark_study", "context", novemberSocialConnectionResearchCheckedAt),
	apologies2: researchSource("Repairing Trust Between Individuals and Groups: The Effectiveness of Apologies in Interpersonal and Intergroup Contexts", "International Review of Social Psychology", 2021, "https://doi.org/10.5334/irsp.479", "10.5334/irsp.479", "Experiment with 272 participants comparing interpersonal and intergroup transgressions. Apologies increased trust, with less complete repair between groups. Short experimental restoration is not demonstrated lasting real-world reconciliation.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	apologies3: researchSource("Apologies Repair Trust via Perceived Trustworthiness and Negative Emotions", "Frontiers in Psychology", 2019, "https://doi.org/10.3389/fpsyg.2019.00758", "10.3389/fpsyg.2019.00758", "Trust-game study with 221 Chinese undergraduates. Apologies increased renewed trust relative to a violation alone, with emotional and perceived-trustworthiness differences. Statistical mediation is not proof of a universal mechanism.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	support1: researchSource("A Meta-analysis of the effects of experimental manipulations of social support during laboratory stress", "Psychology & Health", 1999, "https://doi.org/10.1080/08870449908407353", "10.1080/08870449908407353", "Historical 1999 synthesis of 22 laboratory experiments, 26 comparisons and 56 estimates. Physiological findings came from small, often student samples and cannot establish future cardiovascular disease prevention.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	support2: researchSource("Individual differences of perceived social support and cardiovascular reactivity: A meta-analysis.", "Health Psychology", 2025, "https://doi.org/10.1037/hea0001425", "10.1037/hea0001425", "2025 meta-analysis found no significant relationship between perceived social support and blood-pressure or heart-rate reactivity. Individual differences in perceived support are a different question from experimentally providing a supportive act.", "meta_analysis", "debate", novemberSocialConnectionResearchCheckedAt),
	support3: researchSource("Effects of social support visibility on adjustment to stress: Experimental evidence.", "Journal of Personality and Social Psychology", 2007, "https://doi.org/10.1037/0022-3514.92.3.458", "10.1037/0022-3514.92.3.458", "Three experiments with 257 women facing a speech task. Subtle support reduced emotional reactivity; visible support was ineffective or sometimes worsened it. These selected laboratory conditions do not establish that visible support is always harmful.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	pets1: researchSource("Pet ownership, loneliness, and social isolation: a systematic review", "Social Psychiatry and Psychiatric Epidemiology", 2022, "https://doi.org/10.1007/s00127-022-02332-9", "10.1007/s00127-022-02332-9", "Review of 24 observational studies with inconsistent loneliness findings and differences by age and pandemic period. Loneliness and social isolation are different outcomes; ownership was not randomly assigned.", "systematic_review", "context", novemberSocialConnectionResearchCheckedAt),
	pets2: researchSource("A Systematic Review of Research on Pet Ownership and Animal Interactions among Older Adults", "Anthrozoös", 2019, "https://doi.org/10.1080/08927936.2019.1569903", "10.1080/08927936.2019.1569903", "Review of 145 studies on older adults covering ownership, animal-assisted interventions and several health outcomes. This is not 145 randomized adoption trials, and organized interventions differ from living with a pet.", "systematic_review", "context", novemberSocialConnectionResearchCheckedAt),
	pets3: researchSource("The mediating role of loneliness in the relationship between pet ownership and human well-being", "Scientific Reports", 2025, "https://doi.org/10.1038/s41598-025-19692-2", "10.1038/s41598-025-19692-2", "2025 cross-sectional comparison examined ownership, living arrangements and attachment. Loneliness mediation and subgroup associations cannot show that acquiring a pet caused better well-being.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	singing1: researchSource("What works for wellbeing? A systematic review of wellbeing outcomes for music and singing in adults", "Perspectives in Public Health", 2018, "https://doi.org/10.1177/1757913917740391", "10.1177/1757913917740391", "2018 review of 61 relevant records on music and singing, with varied measures and activities. Community choirs were often demographically narrow. The review authors' GRADE use is not a site-performed GRADE assessment.", "systematic_review", "supports", novemberSocialConnectionResearchCheckedAt),
	singing2: researchSource("Effectiveness and cost-effectiveness of community singing on mental health-related quality of life of older people: Randomised controlled trial", "British Journal of Psychiatry", 2015, "https://doi.org/10.1192/bjp.bp.113.129908", "10.1192/bjp.bp.113.129908", "Pragmatic trial of 258 older adults across five English centers, comparing singing with usual activities. A positive six-month quality-of-life difference does not isolate singing from organized activity and social contact.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	singing3: researchSource("Effects of choral singing on depression and anxiety in older adults: A randomized controlled trial", "Journal of Psychiatric Research", 2025, "https://doi.org/10.1016/j.jpsychires.2025.05.061", "10.1016/j.jpsychires.2025.05.061", "Two-year trial with 200 older adults at risk of cognitive decline compared singing with matched health education. Depression/anxiety screening improvements were similar. Failure to show superiority is not a formal equivalence finding or proof of dementia prevention.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	nostalgia1: researchSource("A meta‐analysis on the psychological and behavioral consequences of nostalgia: The moderating roles of nostalgia activators, culture, and individual characteristics", "Psychology & Marketing", 2023, "https://doi.org/10.1002/mar.21872", "10.1002/mar.21872", "Meta-analysis of 22 experiments and 90 effect estimates involving nostalgia prompts and consumer-related outcomes. Pleasantness and purchasing intentions are not long-term clinical outcomes; effect estimates are not independent trials.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	nostalgia2: researchSource("Nostalgia and well-being in daily life: An ecological validity perspective.", "Journal of Personality and Social Psychology", 2020, "https://doi.org/10.1037/pspp0000236", "10.1037/pspp0000236", "2020 journal issue. Daily nostalgia was often negatively associated with well-being, whereas deliberately prompted recollections were more positive. Temporal associations may reflect mood and events as well as nostalgia itself.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	nostalgia3: researchSource("Variation in bittersweet nostalgic feelings and their divergent effects on daily well-being.", "Emotion", 2023, "https://doi.org/10.1037/emo0001137", "10.1037/emo0001137", "2023 issue: two diary studies with 151 participants and two experiments with 445 participants. The emotional valence of nostalgia mattered; the different study designs and their participant counts should remain separate.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	income1: researchSource("Income and emotional well-being: A conflict resolved", "Proceedings of the National Academy of Sciences", 2023, "https://doi.org/10.1073/pnas.2208661120", "10.1073/pnas.2208661120", "Adversarial collaboration reanalyzing the experience-sampling data used in the 2021 paper. The income relationship differed across the happiness distribution. It is not an independent participant cohort or a causal salary experiment.", "landmark_study", "context", novemberSocialConnectionResearchCheckedAt),
	income2: researchSource("Experienced well-being rises with income, even above $75,000 per year", "Proceedings of the National Academy of Sciences", 2021, "https://doi.org/10.1073/pnas.2016976118", "10.1073/pnas.2016976118", "Experience sampling from 33,391 employed US adults yielded 1,725,994 reports. The sample is not 1.7 million independent people, and a positive log-income association is not equal benefit from every additional dollar.", "context", "supports", novemberSocialConnectionResearchCheckedAt),
	income4: researchSource("Income and emotional well-being: Evidence for well-being plateauing around $200,000 per year", "Economics Letters", 2024, "https://doi.org/10.1016/j.econlet.2024.111730", "10.1016/j.econlet.2024.111730", "2024 issue. Alternative threshold modeling found evidence for a plateau near $200,000 under its assumptions. Related reanalyses reuse data; the result is not a universal spending target or a new randomized sample.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	income3: researchSource("Happiness, income satiation and turning points around the world", "Nature Human Behaviour", 2018, "https://doi.org/10.1038/s41562-017-0277-0", "10.1038/s41562-017-0277-0", "International observational analysis of over 1.7 million respondents found region- and outcome-dependent turning points. Historical estimates are not universal contemporary financial targets or causal income thresholds.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	parenthood1: researchSource("Subjective well-being and adaptation to life events: A meta-analysis.", "Journal of Personality and Social Psychology", 2012, "https://doi.org/10.1037/a0025948", "10.1037/a0025948", "2012 issue: 188 publications and 313 samples cover eight life events; childbirth accounts for 152 samples. The full-text childbirth analysis distinguishes life, relationship and affective well-being and their time courses, with predominantly ad-hoc samples.", "meta_analysis", "context", novemberSocialConnectionResearchCheckedAt),
	parenthood2: researchSource("Parenthood and Well‐Being: A Decade in Review", "Journal of Marriage and Family", 2020, "https://doi.org/10.1111/jomf.12646", "10.1111/jomf.12646", "Critical narrative review of parenthood research in advanced economies from 2010 to 2019. Financial, social and institutional contexts shape outcomes; this is not a new randomized trial or pooled estimate.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	parenthood3: researchSource("Parenthood in Europe: Not More Life Satisfaction, but More Meaning in Life", "Journal of Marriage and Family", 2025, "https://doi.org/10.1111/jomf.13116", "10.1111/jomf.13116", "More than 43,000 respondents in 30 European countries. Parenthood was proxied by children in the household; meaning and life satisfaction differed. Household residence does not completely capture parenthood, and multilevel adjustment does not establish causation.", "context", "context", novemberSocialConnectionResearchCheckedAt),
	synchrony1: researchSource("To be in synchrony or not? A meta-analysis of synchrony's effects on behavior, perception, cognition and affect", "Journal of Experimental Social Psychology", 2017, "https://doi.org/10.1016/j.jesp.2017.03.009", "10.1016/j.jesp.2017.03.009", "Meta-analysis of 42 experiments with 4,327 participants, separating behavior, bonding, cognition and affect. Positive average effects do not establish identical outcomes or lasting cooperation.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	synchrony2: researchSource("Prosocial Consequences of Interpersonal Synchrony", "Zeitschrift für Psychologie", 2016, "https://doi.org/10.1027/2151-2604/a000252", "10.1027/2151-2604/a000252", "Synthesis of 60 published and unpublished experiments. Experimenter involvement and intentionality moderated effects. It shares studies with other reviews, so their evidence is not entirely independent.", "meta_analysis", "supports", novemberSocialConnectionResearchCheckedAt),
	synchrony3: researchSource("Expectancy Effects Threaten the Inferential Validity of Synchrony-Prosociality Research", "Open Mind", 2022, "https://doi.org/10.1162/opmi_a_00067", "10.1162/opmi_a_00067", "2022 publication reviewing expectancy concerns and testing participants' expectations in a preregistered experiment. It discusses failed better-controlled replications, not a fresh meta-analysis establishing that all synchrony effects are false.", "context", "debate", novemberSocialConnectionResearchCheckedAt),
	synchrony4: researchSource("Interventions Through Music and Interpersonal Synchrony That Enhance Prosocial Behavior: A Systematic Review", "European Journal of Investigation in Health, Psychology and Education", 2025, "https://doi.org/10.3390/ejihpe15030029", "10.3390/ejihpe15030029", "2025 review of 12 music-and-synchrony articles, with promising findings and a call for stronger methods. Its narrower scope does not resolve expectation effects or establish lasting cooperation outside the activity.", "systematic_review", "supports", novemberSocialConnectionResearchCheckedAt)
};

export const novemberSocialConnectionClaims = [
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "does-volunteering-improve-wellbeing-in-older-adults",
		title: "Does volunteering improve well-being in older adults?",
		bottomLine: "It may help, but the size and cause of the benefit are uncertain. Volunteers often report better well-being, yet healthier people may also find it easier to volunteer. Trials give a less clear picture than those associations. A suitable, freely chosen role may matter more than simply doing more hours.",
		stableCore: [
			"A 2024 umbrella review included 28 reviews, mainly of older people in the United States. It found possible social, mental and physical benefits, but judged the underlying review quality generally poor.",
			"A 2020 systematic review used 24 studies from 19 populations in its meta-analyses after excluding weaker or unusable evidence and duplicate data. Only three were randomized trials; most were observational.",
			"Two reports followed the same Australian trial of 445 older adults. The original report found differences in some mobility measures. The later well-being analysis compared 73 volunteering compliers with 112 control compliers, rather than everyone originally assigned. Its positive results remain vulnerable to selection."
		],
		openQuestions: [
			"Which roles improve well-being for people with different health, financial and caregiving constraints?",
			"Do benefits persist when all participants are analyzed according to their original assignment?"
		],
		whatWouldChangeMinds: [
			"Larger trials with intention-to-treat results, useful comparison activities and long follow-up.",
			"Evidence separating the effects of volunteering from social contact, physical activity and selection into a role."
		],
		misconceptions: [
			"An association with lower mortality does not establish that volunteering makes a particular person live longer.",
			"Two papers from the same trial are not two independent replications."
		],
		editorSummary: "Possible benefits depend on the role and person; causal evidence remains limited.",
		population: "Older adults, including retired Australians and the mostly older populations in the cited reviews.",
		scope: "Evaluate commencing formal volunteering through older adults' well-being, distinguishing assigned participation from self-selected participation and mobility from psychological outcomes.",
		excludedEvidence: [
			"Exclude converting observational mortality associations into promises of longer life or a universal prescription to volunteer.",
			"Exclude treating the Australian follow-up's selected compliers as the full randomized sample or counting its two reports as independent trials."
		],
		uncertainty: "Selection, uneven participation and mixed study quality limit causal conclusions. Much of the evidence concerns older adults in a few countries and does not isolate volunteering from its social setting.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.volunteering1,
			sources.volunteering2,
			sources.volunteering4,
			sources.volunteering3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-spending-money-on-others-increase-happiness",
		title: "Does spending money on others increase happiness?",
		bottomLine: "It can bring a small, short-term lift, but the effect is not consistent across studies or measures. Choice, the recipient and the task may matter. This research does not show that donating more than you can afford improves long-term happiness.",
		stableCore: [
			"The original 2008 paper combined surveys, a windfall study and a spending experiment with 46 people. A 2009 correction weakened the reported association in its 16-person longitudinal component; the other studies were unaffected.",
			"A registered replication found a positive spending result in 712 students, no benefit from recalling spending in 1,950 adults, and a small positive recall effect in 5,199 adults after procedural changes.",
			"A separate 133-person replication did not find a significant difference with the original analysis. An additional analysis using another happiness measure was positive.",
			"A 2023 systematic review included 14 empirical studies, while a 2022 narrative review considered 15 preregistered experiments. They overlap earlier research and do not establish one guaranteed effect for every person or purchase."
		],
		openQuestions: [
			"Which forms of giving produce benefits beyond the immediate activity?",
			"How do financial strain, genuine choice and relationships with recipients change the result?"
		],
		whatWouldChangeMinds: [
			"Independent preregistered studies that measure actual spending, financial circumstances and later well-being.",
			"Replications reporting all planned outcomes, including null results, and distinguishing recall tasks from real purchases."
		],
		misconceptions: [
			"Recalling a generous purchase and making one are different interventions.",
			"A small average mood difference is not a recommendation to give away money needed for essentials."
		],
		editorSummary: "Generous spending sometimes lifts mood; replication results show important limits.",
		population: "Students and adults studied in actual-spending experiments, recall experiments and related reviews.",
		scope: "Compare spending money on others with spending on oneself through immediate happiness, keeping financial circumstances, recall designs and longer-term well-being separate.",
		excludedEvidence: [
			"Exclude treating the registered report's preprint and published article as separate studies.",
			"Exclude inferring lasting happiness, affordability or a universal benefit from a brief mood rating or a selectively positive alternative analysis."
		],
		uncertainty: "Effects depend on the task and outcome measure. Some replications are null, several reviews share studies, and short follow-up gives little evidence about lasting benefit.",
		band: "mixed",
		sources: [
			sources.spendingRegistered,
			sources.spending2,
			sources.spendingSystematic,
			sources.spending3,
			sources.spending1
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-contact-between-groups-reduce-prejudice",
		title: "Does contact between groups reduce prejudice?",
		bottomLine: "Positive contact can help on average, but effects vary by setting and outcome. Friendlier attitudes and less discriminatory behavior are different results. Simply bringing groups together is not a reliable recipe for resolving hostility, especially where contact is unequal or unsafe.",
		stableCore: [
			"A 2019 policy-focused review found generally favorable effects in 27 studies with random assignment and delayed measures. Effects on ethnic and racial prejudice were weaker, and the review identified important gaps at its search cutoff.",
			"A 2023 synthesis linked contact with lower prejudice across 34 correlational studies, 67 subsamples and 19 countries. Those associations persisted under perceived threat or discrimination, but do not by themselves prove cause and effect.",
			"A randomized Nigerian training study involved 849 Christian and Muslim young men. It found no change in prejudice. Mixed classes showed less discrimination than homogeneous classes, partly because discrimination increased in the homogeneous classes."
		],
		openQuestions: [
			"Which conditions produce lasting changes in real behavior, especially under unequal power or ongoing conflict?",
			"How do positive and negative contact interact in everyday settings?"
		],
		whatWouldChangeMinds: [
			"Preregistered field trials with delayed behavior measures and independent replications in different settings.",
			"Evidence distinguishing improvement in mixed groups from deterioration in comparison groups."
		],
		misconceptions: [
			"The number of subsamples is not the number of independent randomized trials.",
			"A difference between two groups does not necessarily mean both improved from their own starting points."
		],
		editorSummary: "Contact can reduce prejudice, with substantial limits on transfer and practical design.",
		population: "Participants in intergroup-contact studies, including a Nigerian field experiment and international correlational samples.",
		scope: "Assess contact between social groups through attitudes and discrimination, separating randomized interventions, self-selected contact and changes in comparison groups.",
		excludedEvidence: [
			"Exclude treating 67 correlational subsamples as 67 randomized experiments or assuming any contact is beneficial.",
			"Exclude describing the Nigerian behavioral comparison as demonstrated prejudice reduction or universal improvement in the mixed-class arm."
		],
		uncertainty: "Contact and outcome measures vary. Observational selection, weaker evidence for some forms of prejudice and limited field follow-up constrain policy predictions.",
		sources: [
			sources.contact1,
			sources.contact2,
			sources.contact3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-brief-conversations-with-strangers-improve-mood",
		title: "Can brief conversations with strangers improve mood?",
		bottomLine: "Yes, brief, welcome interactions can improve mood in some everyday settings. The evidence mainly concerns immediate experiences, not lasting relief from loneliness or a mental-health condition. Other people's boundaries, the setting and whether conversation is wanted still matter.",
		stableCore: [
			"A 2014 series of experiments found that commuters assigned to talk with a nearby stranger reported a more positive trip than those assigned to remain disconnected. Participants often expected the opposite.",
			"A later paper combined a survey of 856 people with an experiment involving 265 commuters. Greeting or thanking shuttle drivers improved momentary positive feelings in the experiment; the survey's life-satisfaction link was observational.",
			"A 2025 trial randomized 335 young adults to brief interventions. The social-connection program improved the reported quality of weak-tie and stranger interactions over two days, which is not evidence of long-term clinical benefit."
		],
		openQuestions: [
			"How well do benefits transfer across cultures, accessibility needs and preferences for solitude?",
			"Which effects persist beyond a single conversation or a few days?"
		],
		whatWouldChangeMinds: [
			"Independent field replications measuring wanted and unwanted interactions as well as later well-being.",
			"Longer trials that distinguish better interaction quality from durable changes in loneliness."
		],
		misconceptions: [
			"A pleasant brief exchange is not equivalent to close friendship or treatment for persistent distress.",
			"An average benefit does not create an obligation to talk or to welcome a stranger's approach."
		],
		editorSummary: "Short social exchanges can lift mood, with evidence strongest for immediate outcomes.",
		population: "Commuters, shuttle users and young adults in brief social-interaction experiments.",
		scope: "Assess short, consensual conversations and greetings through immediate mood and interaction quality, distinguishing these from long-term social support or clinical outcomes.",
		excludedEvidence: [
			"Exclude treating a two-day intervention as proof of lasting mental-health improvement.",
			"Exclude assuming that strangers welcome contact in every setting or that solitude is inherently harmful."
		],
		uncertainty: "Studies use selected settings and largely self-reported outcomes. Benefits may depend on willingness to interact and may not persist.",
		sources: [
			sources.weakTies4,
			sources.weakTies2,
			sources.weakTies1
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-acts-of-kindness-improve-the-givers-wellbeing",
		title: "Do acts of kindness improve the giver's well-being?",
		bottomLine: "They can produce a modest average benefit. Helping, sharing time and other kind acts may improve mood or a sense of purpose, but benefits vary. Kindness is not a guaranteed treatment for distress, and being helpful does not require accepting demands that harm your own well-being.",
		stableCore: [
			"A 2018 review combined 27 experimental studies involving 4,045 people. It found a small-to-moderate average well-being effect across varied kindness activities, rather than identifying one best act.",
			"A broader 2020 meta-analysis found a modest relationship between prosociality and well-being across 201 studies. Its overall correlation of 0.13 combines different designs and does not establish a causal effect for any particular activity.",
			"A 2023 review included 30 studies of diverse prosocial interventions. Some outcomes concerned recipients, diagnostic testing or vaccination, rather than the giver's happiness; those results are not interchangeable."
		],
		openQuestions: [
			"Which freely chosen, nonfinancial helping activities produce durable gains without excessive burden?",
			"How do recipient needs, the giver's resources and cultural context change the effects?"
		],
		whatWouldChangeMinds: [
			"Preregistered trials comparing specific helping activities with equally engaging alternatives.",
			"Studies reporting well-being, burden and unwanted effects beyond the immediate activity."
		],
		misconceptions: [
			"A correlation of 0.13 is not a 13% increase in happiness.",
			"Benefits to recipients do not automatically demonstrate psychological benefits for givers."
		],
		editorSummary: "Kindness has a modest average link with well-being, with diverse activities and outcomes.",
		population: "Participants in kindness interventions and broader studies of helping and prosocial behavior.",
		scope: "Evaluate the giver's well-being after kindness activities, including nonfinancial help, while distinguishing broader prosocial associations and recipient health outcomes.",
		excludedEvidence: [
			"Exclude applying a pooled estimate across varied activities to one specific favor or counting gratitude journaling as the same intervention.",
			"Exclude treating recipient testing uptake as a measure of giver happiness or ignoring the costs of unwanted helping obligations."
		],
		uncertainty: "Activities, controls and well-being measures differ. Broader reviews mix study designs and share evidence, while longer-term benefits and burdens are less well established.",
		sources: [
			sources.kindness1,
			sources.kindness2,
			sources.kindness3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-self-compassion-training-reduce-self-criticism",
		title: "Does self-compassion training reduce self-criticism?",
		bottomLine: "It can help, especially compared with doing nothing or waiting for support. Benefits tend to be smaller when compared with another active program. The evidence is promising but uneven, and it does not establish self-compassion exercises as a replacement for appropriate mental-health care.",
		stableCore: [
			"A 2019 review of 27 randomized trials found improvements in several psychological outcomes. Programs differed widely, and the authors warned that publication bias could be present.",
			"A 2023 meta-analysis included 56 randomized trials. It found small-to-moderate immediate reductions in depression symptoms, anxiety and stress, but judged overall risk of bias high and noted few active-control comparisons.",
			"A 2022 review found a moderate average reduction in self-criticism across 19 usable papers with 1,350 participants. Effects were larger against passive than active controls, and differences between studies were substantial."
		],
		openQuestions: [
			"Which programs add benefits beyond credible alternative support?",
			"How well do benefits persist, and who finds the exercises unhelpful or difficult?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with active comparisons, independent outcomes and long follow-up.",
			"Evidence separating specific self-compassion skills from attention, group support and expectations."
		],
		misconceptions: [
			"Self-compassion is compatible with taking responsibility and changing harmful behavior.",
			"An average reduction in symptom scores does not mean that an exercise treats every mental-health condition."
		],
		editorSummary: "Self-compassion training can help, while active comparisons and study quality temper the estimates.",
		population: "Adults and other participants in the cited self-compassion intervention trials.",
		scope: "Assess structured self-compassion programs through self-criticism and distress outcomes, separating passive-control benefits from effects beyond active support.",
		excludedEvidence: [
			"Exclude treating before-and-after improvement or a waiting-list comparison as proof of superiority to established care.",
			"Exclude interpreting self-compassion as avoiding accountability or promising that brief exercises resolve severe distress."
		],
		uncertainty: "Many trials have high risk of bias, different programs and limited follow-up. Overlapping reviews and few active comparisons limit confidence in a specific, lasting effect.",
		certainty: "low",
		sources: [
			sources.selfCompassion2,
			sources.selfCompassion3,
			sources.selfCompassion1
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-empathy-be-improved-through-training",
		title: "Can empathy be improved through training?",
		bottomLine: "Yes, training can improve some measured empathy skills. Understanding another person's perspective, sharing feelings and behaving helpfully are different abilities, and gains do not always last. Better scores alone do not show that relationships or patient outcomes improve.",
		stableCore: [
			"A 2016 meta-analysis included 18 randomized trials and 1,018 participants after excluding one outlier. Its positive average effect became smaller after a statistical adjustment for possible publication bias.",
			"A 2024 review covered 110 studies and separated several dimensions of empathy. It found that the size and durability of gains differed: some emotional and cognitive gains faded, while other measured behaviors persisted.",
			"A 2025 medical-education review included 36 randomized studies and 3,833 participants. It found moderate average effects on cognitive and affective empathy, with substantial variation between studies."
		],
		openQuestions: [
			"Which training effects persist and appear in interactions judged by other people?",
			"Do measured improvements translate into meaningful relationship or care outcomes?"
		],
		whatWouldChangeMinds: [
			"Independent trials with behavioral measures, longer follow-up and direct reports from interaction partners.",
			"Replications that compare training approaches while measuring the same clearly defined empathy skills."
		],
		misconceptions: [
			"Empathy is not one score that captures every aspect of understanding, feeling and helping.",
			"Results in medical students and professionals do not automatically transfer to every age group or setting."
		],
		editorSummary: "Empathy skills can improve, with durability and practical transfer varying by skill and training.",
		population: "Participants in empathy training, including university students and medical trainees and professionals.",
		scope: "Assess defined empathy-training programs through cognitive, affective and behavioral measures, distinguishing training scores from relationship or patient outcomes.",
		excludedEvidence: [
			"Exclude adding the review's overlapping empathy dimensions as independent study counts.",
			"Exclude converting medical-education score changes into demonstrated patient benefit or assuming all empathy dimensions improve equally."
		],
		uncertainty: "Programs, measures and follow-up differ. Some gains fade, medical-education samples are prominent and publication bias can inflate pooled estimates.",
		sources: [
			sources.empathy2,
			sources.empathy1,
			sources.empathy3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-perspective-taking-reduce-prejudice",
		title: "Does perspective taking reduce prejudice?",
		bottomLine: "It sometimes helps, but imagining someone else's life is not a reliably proven shortcut to lasting change. Listening to people's own accounts may be more useful in some settings. Short-term attitude changes, generous choices and reduced discrimination need separate tests.",
		stableCore: [
			"A Colombian experiment tested a documentary and an immersive game about Venezuelan migrants. Both improved some attitudes and altruistic choices in the short term; only the game improved self-reported trust.",
			"Research published in 2023 separated imagining another perspective from hearing a person's own account. Across three field studies and a survey experiment, perspective-getting narratives retained benefits even without the other narrative components.",
			"A 2021 review of 418 prejudice-reduction experiments found many brief interventions, uncertain long-term effects and signs of publication bias. Its conclusions caution against treating optimistic laboratory findings as ready-made public policy."
		],
		openQuestions: [
			"Which approaches change behavior months later rather than only immediate ratings?",
			"When does imagined perspective taking reinforce inaccurate assumptions about another group?"
		],
		whatWouldChangeMinds: [
			"Preregistered field replications with delayed behavior measures and clear comparisons between imagining and listening.",
			"Evidence that effects transfer across groups, cultures and unequal social conditions."
		],
		misconceptions: [
			"Imagining another person's experience and listening to their own account are different interventions.",
			"An attitude change immediately after a video does not establish lasting reductions in discrimination."
		],
		editorSummary: "Some interventions help; listening, imagining and durable behavior change should be distinguished.",
		population: "Participants in prejudice-reduction experiments, including Colombian adults and field-conversation studies.",
		scope: "Evaluate perspective-taking and perspective-getting interventions through prejudice-related attitudes and behavior, keeping narrative components and follow-up periods separate.",
		excludedEvidence: [
			"Exclude assuming that imagined perspectives accurately represent another person's life.",
			"Exclude treating the short-term Colombian results or a broad review of many intervention types as proof of one universal perspective-taking method."
		],
		uncertainty: "Interventions combine different ingredients, many outcomes are short term, and selective publication may exaggerate apparent effectiveness.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.prejudiceReview,
			sources.perspective1,
			sources.perspective2
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-workplace-diversity-training-reduce-discrimination",
		title: "Does workplace diversity training reduce discrimination?",
		bottomLine: "Training can improve knowledge and some attitudes, but lasting changes in behavior are less certain. A one-off course is not a dependable stand-alone solution. Outcomes depend on the program, workplace and follow-up, and an intention to act fairly is not the same as doing so.",
		stableCore: [
			"A preregistered field experiment with 3,016 employees used an active comparison and followed workplace decisions for up to 20 weeks. Attitude and behavior changes differed across groups; the program did not produce broad behavior change in the groups of greatest concern.",
			"A 2025 study of 76 employees across three organizations found lower prejudice and stronger anti-discrimination intentions after a multi-method program. It found no change in compassion or perspective taking and did not establish changes in actual discriminatory decisions.",
			"A study of 3,764 US police officers found short-lived gains in bias-related knowledge and intentions, without durable gains in concerns or reported strategy use. A 2025 correction fixed education-level coding and reanalyzed the data; the updated abstract retains those limits.",
			"A broader 2021 research review found substantial reliance on brief interventions and indications of publication bias, making durable workplace claims especially uncertain."
		],
		openQuestions: [
			"Which combinations of training, supervision and organizational procedures reduce actual discriminatory decisions?",
			"How long do gains last, and which people and workplaces benefit?"
		],
		whatWouldChangeMinds: [
			"Independent workplace trials measuring real decisions and outcomes, with active comparisons and long follow-up.",
			"Evidence separating course effects from concurrent changes in hiring, accountability and management."
		],
		misconceptions: [
			"Knowledge, intentions, self-reported strategy use and actual discrimination are different outcomes.",
			"A finding about one brief course does not establish that every training program succeeds or fails."
		],
		editorSummary: "Knowledge gains are easier to demonstrate than durable changes in discriminatory behavior.",
		population: "Employees in organizational training studies and US police officers in a specialist training study.",
		scope: "Assess workplace diversity training through knowledge, attitudes, intentions and behavior, distinguishing one-off programs, multi-method programs and specialist policing settings.",
		excludedEvidence: [
			"Exclude treating switching replications with 76 employees as 76 independent organizations or as proof of changed workplace decisions.",
			"Exclude presenting the police study's original education coding as current or treating transient intentions as verified long-term behavior."
		],
		uncertainty: "Programs and populations differ, behavioral outcomes are often missing and some evidence relies on self-report or weak comparisons. Publication bias and short follow-up limit generalization.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.diversityTraining1,
			sources.diversityTraining2,
			sources.diversityTraining3,
			sources.prejudiceReview
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "can-emotional-intelligence-skills-be-trained",
		title: "Can emotional intelligence skills be trained?",
		bottomLine: "Training can improve measured emotional skills on average. That does not establish better job performance or success in every relationship. Programs and tests differ, and stronger comparisons are needed to separate specific skills from practice, attention and expectations.",
		stableCore: [
			"A 2019 meta-analysis of 58 studies found moderate average gains in emotional-intelligence scores. It included both simple before-and-after studies and treatment-control comparisons; published studies showed larger effects than dissertations.",
			"A 2018 synthesis included 24 studies and 28 samples of healthy adults. Scores improved after training and at follow-up, but before-and-after change alone is a weak test of what caused improvement.",
			"A 2024 workplace review analyzed 50 studies overall and 27 controlled studies separately. It found moderate average effects, including at follow-up beyond three months, but highlighted high variation and low methodological quality."
		],
		openQuestions: [
			"Which gains appear in independent assessments and improve useful behavior outside the training?",
			"How much of the effect is specific to the program rather than other forms of support or practice?"
		],
		whatWouldChangeMinds: [
			"High-quality randomized trials with active comparisons and independently measured workplace outcomes.",
			"Replications that distinguish emotional-intelligence models and report longer-term benefits, costs and null results."
		],
		misconceptions: [
			"A higher emotional-skills test score is not a demonstrated increase in income, leadership quality or job performance.",
			"Finding no clear difference between professions does not prove that every profession benefits equally."
		],
		editorSummary: "Emotional skills scores can improve, while real-world transfer remains less firmly established.",
		population: "Adults and workers in emotional-intelligence and related emotional-competency training studies.",
		scope: "Evaluate formal emotional-skills training through measured competencies, separating controlled evidence from simple score changes and job-performance claims.",
		excludedEvidence: [
			"Exclude describing all 50 workplace studies as randomized trials or treating broader emotional-competency training as one identical intervention.",
			"Exclude using score gains to promise financial returns, better hiring or success in every relationship."
		],
		uncertainty: "Definitions and tests vary, many studies are methodologically weak and overlapping reviews can magnify the appearance of independent support.",
		sources: [
			sources.emotionalIntelligence3,
			sources.emotionalIntelligence1,
			sources.emotionalIntelligence2
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "can-forgiveness-interventions-improve-wellbeing",
		title: "Can forgiveness interventions improve well-being?",
		bottomLine: "Structured, voluntary programs can help some people work through past hurt and reduce distress. The findings concern supported interventions, not a requirement to forgive. Forgiveness does not require excusing harm, restoring contact or remaining in an unsafe situation.",
		stableCore: [
			"A 2018 review of randomized trials found average improvements in several distress and well-being measures after process-based forgiveness interventions. Participants had experienced varied interpersonal hurts or violence.",
			"A 2014 meta-analysis used 54 research reports. Explicit forgiveness treatments improved reported forgiveness compared with no treatment and alternative treatments, while some distress outcomes were better than no treatment.",
			"A 2024 university-focused review included 20 articles, with 11 randomized trials and one quasi-experimental study in its meta-analysis. These narrower samples cannot establish the same benefits for every person or kind of harm."
		],
		openQuestions: [
			"Which people prefer these programs, and how do outcomes compare with other appropriate support?",
			"How well do gains persist, and how are pressure to forgive or unwanted effects measured?"
		],
		whatWouldChangeMinds: [
			"Independent trials using credible alternatives, long follow-up and measures of safety and voluntary participation.",
			"Evidence distinguishing changes in reported forgiveness from broader recovery and practical well-being."
		],
		misconceptions: [
			"Forgiveness and reconciliation are different choices.",
			"A program's average benefit does not mean that refusing or being unable to forgive caused someone's distress."
		],
		editorSummary: "Voluntary forgiveness programs can help, without creating an obligation to reconcile.",
		population: "Adolescents and adults in structured forgiveness interventions, including university samples.",
		scope: "Assess voluntary, supported forgiveness programs through forgiveness and well-being outcomes, distinguishing personal emotional processing from reconciliation or safety decisions.",
		excludedEvidence: [
			"Exclude pressuring victims to forgive, excuse abuse or restore contact as a condition of recovery.",
			"Exclude treating university samples or improved forgiveness scores as universal proof of recovery from trauma."
		],
		uncertainty: "Programs, harms, controls and outcomes vary. Reviews overlap, and evidence about long-term effects and unwanted pressure is less complete.",
		sources: [
			sources.forgiveness1,
			sources.forgiveness2,
			sources.forgiveness3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-relationship-education-improve-couple-satisfaction",
		title: "Does relationship education improve couple satisfaction?",
		bottomLine: "It can produce small average improvements, but benefits vary by program and circumstances. Communication lessons, relationship education and couples therapy are different services. Learning a skill does not guarantee a happier relationship or resolve coercion and safety concerns.",
		stableCore: [
			"A 2021 systematic review found possible benefits across 12 intervention studies, but mixed educational, enrichment and therapy programs. High variation and limited evidence made the authors uncertain about the true effects.",
			"A 2016 analysis examined 1,034 low-income couples with the required follow-up data from a larger randomized project. Relationship education produced small improvements in satisfaction, but better observed communication did not explain the satisfaction effect.",
			"A separate meta-analysis of 12 publications found improvements with online relationship education. Its favorable average results do not show that every available commercial program is effective or suited to every couple."
		],
		openQuestions: [
			"Which programs help which couples, and how long do benefits persist?",
			"What produces satisfaction gains when changes in observed communication do not explain them?"
		],
		whatWouldChangeMinds: [
			"Independent trials with active comparisons, diverse couples and long-term follow-up of everyone assigned.",
			"Evidence separating education from therapy and evaluating accessibility, dropout and unwanted effects."
		],
		misconceptions: [
			"A selected follow-up sample is not the full number originally randomized.",
			"A course that improves communication scores has not necessarily demonstrated a mechanism for improved relationship satisfaction."
		],
		editorSummary: "Average benefits are modest and program-specific, with mechanisms and durability still uncertain.",
		population: "Couples in relationship-education research, including low-income couples and participants in online programs.",
		scope: "Evaluate educational relationship programs through couple satisfaction, distinguishing communication measures, selected follow-up analyses and therapy programs.",
		excludedEvidence: [
			"Exclude applying pooled therapy effects to a general education course or treating all online programs as interchangeable.",
			"Exclude using relationship education as a substitute for individualized safety support when coercion or violence is present."
		],
		uncertainty: "Programs and populations differ, some reviews mix service types, and follow-up selection and self-reports can affect estimates.",
		sources: [
			sources.relationshipEducation3,
			sources.relationshipEducation2,
			sources.relationshipEducation1
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-an-apology-help-repair-trust",
		title: "Can an apology help repair trust?",
		bottomLine: "Yes, apologies can help in experiments, but they do not reliably restore trust fully. The harm, the relationship and how the apology is understood matter. These findings do not establish that words replace accountability, changed behavior or the harmed person's choice about future contact.",
		stableCore: [
			"A foundational 2004 paper used two studies to compare apologies and denials after alleged trust violations. Results depended on the kind of allegation and later evidence about guilt or innocence.",
			"A 2021 experiment with 272 participants found that apologies increased trust after both individual and group transgressions. Trust was less fully restored between groups than between individuals.",
			"A 2019 trust-game study of 221 Chinese undergraduates found more renewed trust after an apology than after a violation without one. The result depended partly on negative emotions and perceived trustworthiness."
		],
		openQuestions: [
			"Which effects persist in real relationships after repeated or serious harm?",
			"How do reparations and sustained behavior interact with the words of an apology?"
		],
		whatWouldChangeMinds: [
			"Independent field studies with delayed behavior measures and clear descriptions of the harm and response.",
			"Replications comparing apologies, practical repair and their combination across different cultures and relationships."
		],
		misconceptions: [
			"Trust-game behavior is not a complete measure of trust after real-world harm.",
			"Experiments involving allegations do not justify dishonest denials or create a duty to accept an apology."
		],
		editorSummary: "Apologies can support repair, with limited evidence for full or lasting restoration.",
		population: "Participants in interpersonal trust experiments, including university and trust-game samples.",
		scope: "Assess apologies after trust violations through experimental trust ratings and behavior, distinguishing individual and group conflicts, allegations and established responsibility.",
		excludedEvidence: [
			"Exclude treating a short laboratory trust game as proof of lasting repair after serious harm.",
			"Exclude presenting findings about denial under alleged innocence as advice to deny responsibility or requiring forgiveness from a harmed person."
		],
		uncertainty: "Much of the evidence is experimental and short term. Real relationships involve repeated behavior, different power dynamics and forms of harm not captured by these tasks.",
		certainty: "low",
		sources: [
			sources.apologies1,
			sources.apologies2,
			sources.apologies3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-social-support-reduce-stress-responses",
		title: "Does social support reduce stress responses?",
		bottomLine: "It can, but the form of support and the measure of stress matter. Support that feels intrusive or undermines confidence can be unhelpful. Feeling supported is also different from receiving a specific supportive act, and neither guarantees a smaller physical stress response.",
		stableCore: [
			"A 1999 review of 22 laboratory experiments found average reductions in several stress responses when support was provided. The studies were small and often used students, limiting transfer to everyday life.",
			"A 2025 meta-analysis found no significant relationship between perceived support and blood-pressure or heart-rate reactivity. That question differs from experimentally providing support during a stressful task.",
			"Three experiments involving 257 women facing a speech task found less emotional reactivity with subtle support. More visibly provided support was ineffective or sometimes increased reactivity, partly when it conveyed a lack of confidence in the recipient."
		],
		openQuestions: [
			"Which support is useful for different people, stressors and cultural expectations?",
			"How do short laboratory responses relate to longer-term well-being?"
		],
		whatWouldChangeMinds: [
			"Preregistered field and laboratory replications distinguishing requested, subtle and intrusive support.",
			"Studies measuring emotional and physical responses separately, with diverse participants and meaningful follow-up."
		],
		misconceptions: [
			"Perceived support, received support and the size of a social network are different measures.",
			"A short-term blood-pressure response does not establish an effect on future heart disease."
		],
		editorSummary: "Support can buffer stress, but its delivery and the outcome being measured are crucial.",
		population: "People in laboratory stress studies and samples reporting perceived social support.",
		scope: "Evaluate human acute emotional and cardiovascular stress responses, separating experimentally provided support from individual differences in perceived support.",
		excludedEvidence: [
			"Exclude translating laboratory reactivity into demonstrated prevention of cardiovascular disease.",
			"Exclude treating the 2025 perceived-support null finding as a direct test of every supportive act or extrapolating animal experiments to people."
		],
		uncertainty: "Older experiments are small and selected, while newer correlational results address a different support measure. Delivery, expectations and the stressor can alter outcomes.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.support1,
			sources.support2,
			sources.support3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-owning-a-pet-reduce-loneliness",
		title: "Does owning a pet reduce loneliness?",
		bottomLine: "A pet can provide companionship, but research does not show a consistent reduction in loneliness for all owners. Living arrangements, attachment and the responsibilities of care matter. Most evidence is observational, so differences between owners and non-owners may have other causes.",
		stableCore: [
			"A 2022 systematic review included 24 observational studies. Some found links with lower loneliness or isolation, but many did not; results also differed by age and pandemic period.",
			"A 2019 review covered 145 studies of older adults, combining pet ownership with animal-assisted interventions and several health outcomes. That is not a set of 145 trials of adopting a pet.",
			"A 2025 cross-sectional study linked ownership with lower loneliness among people living alone and found relationships involving attachment. Its statistical mediation model cannot establish that a pet caused the change."
		],
		openQuestions: [
			"Do well-controlled longitudinal studies find sustained changes after people acquire or lose a pet?",
			"How do care demands, housing, finances and animal welfare affect the balance of benefits and burdens?"
		],
		whatWouldChangeMinds: [
			"Prospective studies measuring loneliness before and after changes in ownership with credible comparison groups.",
			"Evidence separating companionship from selection, living arrangements, existing human relationships and caregiving burden."
		],
		misconceptions: [
			"Feeling lonely and having few social contacts are different outcomes.",
			"Research on an organized animal-assisted program does not establish the same effect from owning an animal at home."
		],
		editorSummary: "Companionship is plausible, but a general causal loneliness benefit remains uncertain.",
		population: "Pet owners and non-owners, including older adults and adults living alone.",
		scope: "Assess companion-animal ownership through loneliness, distinguishing social isolation, organized animal-assisted interventions and attachment-related associations.",
		excludedEvidence: [
			"Exclude interpreting cross-sectional mediation as a demonstrated causal pathway.",
			"Exclude recommending pet acquisition as a guaranteed treatment or ignoring the animal's welfare and the owner's ability to provide care."
		],
		uncertainty: "Ownership is self-selected, results are inconsistent and studies measure different relationships and outcomes. Strong causal and long-term evidence remains limited.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.pets1,
			sources.pets2,
			sources.pets3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-group-singing-improve-wellbeing",
		title: "Does group singing improve well-being?",
		bottomLine: "Group singing can be an enjoyable source of activity and connection, and some trials find better well-being than usual activities. Its specific advantage over other supportive group activities is less clear. The evidence does not establish singing as a replacement for mental-health care.",
		stableCore: [
			"A 2018 systematic review assessed 61 records on adult music and singing. It found positive well-being findings but wide differences in activities and measures, with community-choir samples often demographically narrow.",
			"A 2015 trial randomized 258 older adults to community singing or usual activities. Mental health-related quality of life was better in the singing group at six months, with uncertainty around the size of the difference.",
			"A 2025 trial followed 200 older adults at risk of cognitive decline for two years. Singing and an active health-education group showed similar improvements in depression and anxiety screening outcomes; the study did not demonstrate singing's superiority."
		],
		openQuestions: [
			"How much benefit comes from singing itself rather than regular activity, attention and social contact?",
			"Which programs remain accessible and useful for different ages, abilities and cultural preferences?"
		],
		whatWouldChangeMinds: [
			"Larger trials comparing singing with equally engaging social activities and measuring meaningful long-term outcomes.",
			"Replications reporting participation, dropout, accessibility and effects beyond self-selected choir members."
		],
		misconceptions: [
			"A comparison with usual activities is not the same test as a comparison with another organized group.",
			"No significant difference between two programs does not by itself prove that they are equivalent."
		],
		editorSummary: "Singing may help, while benefits specific to music are difficult to separate from group participation.",
		population: "Adults in music and singing research, including older adults in community programs.",
		scope: "Assess group singing through well-being and mental health-related outcomes, distinguishing usual-activity comparisons from active group controls and screening from diagnosis.",
		excludedEvidence: [
			"Exclude treating 61 mixed music records as 61 choir trials or inferring that singing prevents dementia.",
			"Exclude describing a nonsuperiority result as a formal equivalence finding or a substitute for needed clinical care."
		],
		uncertainty: "Activities and outcomes vary, some comparisons provide little equivalent social contact and selected older samples limit generalization.",
		band: "mixed",
		sources: [
			sources.singing1,
			sources.singing2,
			sources.singing3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-nostalgia-improve-wellbeing",
		title: "Does nostalgia improve well-being?",
		bottomLine: "Sometimes. Recalling a warm memory can improve immediate feelings, but nostalgia in daily life can also involve loss and lower well-being. The content of the memory and the situation matter. Positive laboratory prompts do not establish that more nostalgia is always beneficial.",
		stableCore: [
			"A 2023 meta-analysis of 22 experiments found positive effects of induced nostalgia on pleasant feelings and several consumer-related outcomes. Its 90 effect estimates are not 90 independent experiments or evidence of clinical benefit.",
			"A 2020 paper found that everyday nostalgic experiences were often linked with lower well-being, unlike the more positive memories people generated when specifically prompted in experiments.",
			"A 2023 paper combined two diary studies with 151 participants and two experiments with 445 participants. Positive and negative nostalgic feelings had different links with well-being, helping explain the apparent conflict."
		],
		openQuestions: [
			"Which forms of remembering help or hinder people over longer periods?",
			"How do loss, current mood, cultural context and the way memories are prompted influence outcomes?"
		],
		whatWouldChangeMinds: [
			"Preregistered studies combining everyday sampling with controlled comparisons and longer follow-up.",
			"Evidence that separates the effects of nostalgia from the emotional tone of the remembered event."
		],
		misconceptions: [
			"Nostalgia can be bittersweet rather than uniformly positive.",
			"Consumer attitudes and purchase intentions are not measures of sustained psychological health."
		],
		editorSummary: "Nostalgia's emotional content explains why positive prompts and everyday memories can differ.",
		population: "Participants in nostalgia experiments, consumer studies and daily-diary research.",
		scope: "Evaluate nostalgic recollection through immediate and everyday well-being, distinguishing prompted positive memories, naturally occurring nostalgia and consumer outcomes.",
		excludedEvidence: [
			"Exclude translating purchase intentions into mental-health benefit or counting 90 effect estimates as 90 trials.",
			"Exclude generalizing deliberately positive memory prompts to grief-related or negatively experienced nostalgia."
		],
		uncertainty: "Studies differ in what they call nostalgia, how they prompt it and what they measure. Everyday associations may reflect current mood as well as the memory itself.",
		band: "mixed",
		sources: [
			sources.nostalgia1,
			sources.nostalgia2,
			sources.nostalgia3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-is-income-related-to-happiness",
		title: "How is income related to happiness?",
		bottomLine: "Higher income is generally linked with greater well-being, but the pattern depends on the people and the measure. Research does not establish one universal income ceiling for happiness. These are mostly associations, not proof that a pay rise produces a predictable emotional benefit.",
		stableCore: [
			"A 2021 US study analyzed about 1.7 million momentary reports from 33,391 employed adults. Higher income was associated with better experienced and evaluated well-being, without a plateau at the often-quoted $75,000 level.",
			"A 2023 collaboration reanalyzed that same experience-sampling dataset. It found a flatter high-income relationship among the least happy participants, rather than one pattern for everyone.",
			"A 2024 reanalysis found evidence for a plateau nearer $200,000 under a different threshold model. These papers do not represent three independent samples, and their assumptions affect the results.",
			"A 2018 international study found that estimated income turning points varied across regions and well-being measures. Historical dollar estimates from different settings are not current universal targets."
		],
		openQuestions: [
			"Which income changes improve well-being causally, and for whom?",
			"How do insecurity, wealth, costs of living and family needs alter the relationship?"
		],
		whatWouldChangeMinds: [
			"Independent longitudinal and quasi-experimental evidence measuring income changes and multiple well-being outcomes.",
			"Preregistered comparisons of competing models across current, diverse populations and income ranges."
		],
		misconceptions: [
			"A linear relationship with the logarithm of income does not mean every extra dollar brings the same benefit.",
			"A statistical threshold estimated in one sample is not a personal financial target or a guarantee of happiness."
		],
		editorSummary: "The average association is positive; universal ceilings and causal returns remain disputed.",
		population: "Employed US adults in experience sampling and respondents in international well-being surveys.",
		scope: "Assess income and emotional or evaluative well-being as population-level associations, distinguishing logarithmic relationships, subgroups, models and repeated analyses of the same data.",
		excludedEvidence: [
			"Exclude counting the 2021, 2023 and related threshold reanalyses as independent participant datasets.",
			"Exclude converting historical dollar cutoffs into current financial advice or inferring a guaranteed happiness gain from a salary change."
		],
		uncertainty: "Selection, reverse causation, measurement and model assumptions affect estimates. Income, wealth, household needs and local prices are different quantities.",
		band: "mixed",
		sources: [
			sources.income1,
			sources.income2,
			sources.income4,
			sources.income3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-becoming-a-parent-make-people-happier",
		title: "Does becoming a parent make people happier?",
		bottomLine: "Parenthood can bring meaning and positive feelings alongside new demands. Average links with life satisfaction vary by stage, resources, relationships and social support. Feeling that life is meaningful is different from feeling happy day to day, and group averages cannot predict an individual's experience.",
		stableCore: [
			"A 2012 longitudinal meta-analysis covered eight kinds of life events. Its childbirth evidence included 152 samples, not 152 randomized trials. Life satisfaction, relationship satisfaction and emotional well-being followed different patterns over time.",
			"A 2020 research review emphasized how financial resources, care demands, gender, partnership and public support shape parental well-being. Parenthood is not one uniform exposure.",
			"A 2025 analysis of more than 43,000 European respondents found a more consistent positive link with meaning than with life satisfaction. It used children in the household as a proxy for parenthood and cannot establish causal effects."
		],
		openQuestions: [
			"Which supports reduce burdens across different family arrangements and stages?",
			"How do voluntary choices, nonresident parenthood and selection into parenting affect comparisons?"
		],
		whatWouldChangeMinds: [
			"Longitudinal studies with clear parenthood definitions, pre-parenthood measures and diverse family circumstances.",
			"Evidence separating meaning, everyday emotion, life satisfaction and relationship satisfaction over time."
		],
		misconceptions: [
			"Meaning, happiness and relationship satisfaction are different outcomes.",
			"A household without resident children is not necessarily a household without parents."
		],
		editorSummary: "The experience varies across outcomes, stages and support; a single happiness verdict is misleading.",
		population: "Parents and comparison groups in longitudinal research and European household surveys.",
		scope: "Assess the transition to parenthood and parental status through distinct well-being outcomes, accounting for timing, family context and household-based definitions.",
		excludedEvidence: [
			"Exclude treating parenthood comparisons as randomized evidence or applying an average to an individual's family choices.",
			"Exclude interpreting household child residence as a complete record of parenthood or treating meaning and life satisfaction as interchangeable."
		],
		uncertainty: "Parenthood is selected rather than randomly assigned, family situations differ and studies use incomplete definitions and different outcomes.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.parenthood1,
			sources.parenthood2,
			sources.parenthood3
		]
	}, novemberSocialConnectionResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-moving-in-time-with-others-increase-cooperation",
		title: "Does moving in time with others increase cooperation?",
		bottomLine: "Some experiments find more sharing, bonding or cooperation after synchronized movement, but the size and cause of the effect are uncertain. Expectations and experimenter behavior can influence results. Moving together does not establish lasting trust or a general tendency to help everyone.",
		stableCore: [
			"A 2017 meta-analysis of 42 studies and 4,327 participants found positive average effects on several social outcomes after synchronized actions. Different outcomes had different effect sizes.",
			"A separate 2016 meta-analysis of 60 experiments also found positive average effects, with experimenter involvement and intentionality affecting results. The reviews contain overlapping evidence.",
			"A 2022 analysis highlighted weak controls for expectations and experimenter bias, including replication attempts that did not find the original effects after adding controls.",
			"A 2025 systematic review of 12 music-and-synchrony articles found promising results but called for more robust studies. That narrower evidence does not resolve the methodological concerns."
		],
		openQuestions: [
			"Which effects survive blinded procedures and credible expectation-matched comparisons?",
			"Do immediate task effects transfer to later behavior or to people outside the synchronized group?"
		],
		whatWouldChangeMinds: [
			"Preregistered independent replications with blinded outcome assessment and matched expectations.",
			"Field evidence showing durable cooperation, alongside null findings and effects on outsiders."
		],
		misconceptions: [
			"Several reviews can summarize the same experiments.",
			"Observed neural synchrony during cooperation does not prove that synchronized movement caused cooperation."
		],
		editorSummary: "Positive average findings remain limited by expectations, replication concerns and short-term tasks.",
		population: "Mostly healthy participants in synchronized-movement and music experiments.",
		scope: "Evaluate experimentally coordinated movement through immediate social attitudes and behavior, separating causal manipulation from neural correlations and longer-term group relationships.",
		excludedEvidence: [
			"Exclude treating brain-synchrony correlations as direct causal tests of moving together.",
			"Exclude adding overlapping meta-analyses as independent evidence or promising lasting trust from brief laboratory cooperation."
		],
		uncertainty: "Expectations, researcher cues and inconsistent controls may contribute to effects. Reviews overlap and durable real-world outcomes are less established.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.synchrony1,
			sources.synchrony2,
			sources.synchrony3,
			sources.synchrony4
		]
	}, novemberSocialConnectionResearchCheckedAt)
];
