import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberAnimalWelfareResearchCheckedAt = "2026-11-08T05:26:26.126Z";

const sources = {
	avsabBoard: researchSource("2025 AVSAB Board Statement on humane dog training", "American Veterinary Society of Animal Behavior", 2025, "https://avsab.org/resources/position-statements/", "", "The American Veterinary Society of Animal Behavior's 2025 board statement reaffirms its 2021 reward-based training position and rejects aversive methods. This is the association's professional position, not a survey of every behavior researcher or an endorsement of a particular trainer.", "consensus_statement", "supports", novemberAnimalWelfareResearchCheckedAt),
	trainingWelfare: researchSource("Does training method matter? Evidence for the negative impact of aversive-based methods on companion dog welfare", "PLOS ONE", 2020, "https://doi.org/10.1371/journal.pone.0225023", "10.1371/journal.pone.0225023", "Observational comparison of 92 dogs attending seven training schools found more stress-related behavior and other adverse welfare measures with aversive-based methods. Dogs were not randomly assigned to schools; owners, trainers and other school differences can confound the comparison.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	trainingEfficacy: researchSource("Efficacy of Dog Training With and Without Remote Electronic Collars vs. a Focus on Positive Reinforcement", "Frontiers in Veterinary Science", 2020, "https://doi.org/10.3389/fvets.2020.00508", "10.3389/fvets.2020.00508", "Comparison of 63 dogs in recall training found no efficacy advantage for electronic collars over the reward-focused approach. Trainer and group differences limit attribution. Related reports use the same 63 dogs and are not independent replications; these tasks do not represent every working-dog application.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	puppyReview: {
		...researchSource("Canine Socialisation: A Narrative Systematic Review", "Animals", 2022, "https://doi.org/10.3390/ani12212895", "10.3390/ani12212895", "Narrative systematic review of socialization evidence, with heterogeneous definitions and mainly observational research. Its 2023 correction reverses an interpretation of Wormald's public-exposure results: earlier or more frequent exposure showed no protective advantage. This finding does not establish the effect of structured positive socialization or justify social deprivation.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.3390/ani12212895",
			"https://api.crossref.org/works?filter=updates%3A10.3390%2Fani12212895&rows=100",
			"https://doi.org/10.3390/ani13010081"
		]
	},
	puppyFear: researchSource("Inadequate socialisation, inactivity, and urban living environment are associated with social fearfulness in pet dogs", "Scientific Reports", 2020, "https://doi.org/10.1038/s41598-020-60546-w", "10.1038/s41598-020-60546-w", "Large owner-questionnaire study associated limited puppy socialization with later social fear. Recall, selection and household differences limit causal inference, and fear outcomes do not directly establish prevention of aggressive behavior.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	puppyAggression: researchSource("An Assessment of Scientific Evidence Relating to the Effect of Early Experience on the Risk of Human-Directed Aggression by Adult Dogs", "Animals", 2023, "https://doi.org/10.3390/ani13142329", "10.3390/ani13142329", "Review of 14 papers on early-life factors and later human-directed aggression identifies associations with rearing, acquisition and management. Heterogeneous definitions and observational designs limit conclusions about specific socialization programs.", "systematic_review", "supports", novemberAnimalWelfareResearchCheckedAt),
	breedStereotypes: researchSource("Ancestry-inclusive dog genomics challenges popular breed stereotypes", "Science", 2022, "https://doi.org/10.1126/science.abk0639", "10.1126/science.abk0639", "Darwin's Ark study combined 18,385 owner surveys with genetic data from 2,155 dogs. Breed explained a limited share of individual behavioral variation despite heritable traits and some average breed tendencies. Heritability is not the same quantity as variation explained by breed.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	breedPrediction: researchSource("Genetic testing predicts appearance but not behavior in dogs", "Proceedings of the National Academy of Sciences", 2025, "https://doi.org/10.1073/pnas.2421752122", "10.1073/pnas.2421752122", "Study of more than 3,000 Darwin's Ark dogs found genetic prediction substantially stronger for appearance than behavior. Shared project data mean this is not wholly independent replication of the earlier Darwin's Ark report. Predicting an individual's behavior differs from detecting average breed associations.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	breedClassification: researchSource("Comparison of behavioural tendencies between “dangerous dogs” and other domestic dog breeds – Evolutionary context and practical implications", "Evolutionary Applications", 2022, "https://doi.org/10.1111/eva.13479", "10.1111/eva.13479", "Questionnaire-based comparison of breeds classified as dangerous and other breeds examines group tendencies with behavioral measures. Associations depend on classification, reporting and environment; they do not provide a reliable individual temperament verdict or a direct test of breed-law effectiveness.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	guiltStudy: researchSource("Disambiguating the “guilty look”: Salient prompts to a familiar dog behaviour", "Behavioural Processes", 2009, "https://doi.org/10.1016/j.beproc.2009.03.014", "10.1016/j.beproc.2009.03.014", "Experiment with 14 dogs varied obedience and owner scolding. Behaviors owners called guilty were more closely related to scolding than to disobedience. A small behavioral experiment cannot determine whether dogs ever experience a subjective emotion resembling guilt.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	guiltReplication: researchSource("Are owners' reports of their dogs’ ‘guilty look’ influenced by the dogs’ action and evidence of the misdeed?", "Behavioural Processes", 2015, "https://doi.org/10.1016/j.beproc.2014.12.010", "10.1016/j.beproc.2014.12.010", "Controlled study tested how a dog's action and evidence of a forbidden-food incident affected owners' judgments of a guilty look. It concerns observable behavior and owner interpretation, not a direct measurement of moral understanding. Published in the 2015 journal issue after 2014 online publication.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	pointingExperiment: researchSource("Companion dogs flexibly and spontaneously comprehend human gestures in multiple contexts", "Animal Cognition", 2024, "https://doi.org/10.1007/s10071-024-01901-6", "10.1007/s10071-024-01901-6", "Two 2024 experiments involving 70 companion dogs found flexible use of human gestures in more than one context. Success at these tasks supports cue comprehension, while learning history and task design limit claims about human-like understanding of intentions.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	pointingReview: researchSource("Cognition and the human–animal relationship: a review of the sociocognitive skills of domestic mammals toward humans", "Animal Cognition", 2022, "https://doi.org/10.1007/s10071-021-01557-6", "10.1007/s10071-021-01557-6", "Review of domestic mammals' sociocognitive skills toward people places dog gesture use in a wider comparative context. It is a narrative synthesis rather than a pooled accuracy estimate. The journal issue is 2022; the DOI and online publication are from 2021.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	emotionMatching: researchSource("Dogs recognize dog and human emotions", "Biology Letters", 2016, "https://doi.org/10.1098/rsbl.2015.0883", "10.1098/rsbl.2015.0883", "Cross-modal face-and-voice experiment found that dogs looked longer at emotionally matching images, supporting discrimination of positive and negative cues across senses. It does not demonstrate empathy or knowledge of why a person feels a particular way. The article is from 2016 despite 2015 in the DOI.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	emotionAuthenticity: researchSource("Dogs distinguish authentic human emotions without being empathic", "Animal Cognition", 2024, "https://doi.org/10.1007/s10071-024-01899-x", "10.1007/s10071-024-01899-x", "Experiment using owners experiencing induced happiness or sadness found different dog responses and task performance. Reduced owner-directed gazing and jumping were associated with sadness, while several other responses accompanied happiness. Cue discrimination does not establish emotional sharing.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	emotionMethods: researchSource("Visual perception of emotion cues in dogs: a critical review of methodologies", "Animal Cognition", 2023, "https://doi.org/10.1007/s10071-023-01762-5", "10.1007/s10071-023-01762-5", "Critical review of methods for studying dogs' perception of emotional visual cues. Artificial stimuli, behavioral definitions and human interpretations can affect conclusions. Different responses to faces should not automatically be interpreted as empathy or identical human and canine emotions.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	shelterDogs2024: researchSource("Environmental enrichments and data-driven welfare indicators for sheltered dogs using telemetric physiological measures and signal processing", "Scientific Reports", 2024, "https://doi.org/10.1038/s41598-024-53932-1", "10.1038/s41598-024-53932-1", "Small eight-dog study combined telemetry and sleep-related measures across enrichment conditions. Individual responses varied substantially; the sample does not support a universal activity ranking, and physiological arousal is not a complete measure of welfare.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	shelterDogs2020: researchSource("Effects of Olfactory and Auditory Enrichment on the Behaviour of Shelter Dogs", "Animals", 2020, "https://doi.org/10.3390/ani10040581", "10.3390/ani10040581", "Study of 60 shelter dogs examined behavioral responses to auditory and olfactory enrichment. Some conditions changed resting, vocalizing and other behavior. Effects in a particular shelter and exposure setting do not establish a general home-use safety recommendation or lasting welfare benefit.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	shelterDogs2023: researchSource("Ruff Morning? The Use of Environmental Enrichment during an Acute Stressor in Kenneled Shelter Dogs", "Animals", 2023, "https://doi.org/10.3390/ani13091506", "10.3390/ani13091506", "Study during a kennel-cleaning stressor compared enrichment-related behavioral responses. Changes in barking and calm body positions did not identify the same apparent benefits, illustrating why one behavior is an incomplete welfare measure.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	neuterReview: researchSource("Dog Neuter, Yes or No? A Summary of the Motivations, Benefits, and Harms, with Special Emphasis on the Behavioral Aspect", "Animals", 2025, "https://doi.org/10.3390/ani15071063", "10.3390/ani15071063", "2025 narrative review of neutering motivations, benefits and harms emphasizes inconsistent behavioral findings. Evidence varies by sex, age and behavior, and observational associations do not establish a general aggression-treatment effect.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	neuterSurvey: researchSource("Reasons for and Behavioral Consequences of Male Dog Castration: A Questionnaire Study in Poland", "Animals", 2022, "https://doi.org/10.3390/ani12151883", "10.3390/ani12151883", "Retrospective survey of 386 Polish owners of male dogs reported reductions in several sexually influenced behaviors but no reduction in human-directed aggression; some fear measures increased. Owner recall, selection and changing circumstances limit causal attribution.", "landmark_study", "debate", novemberAnimalWelfareResearchCheckedAt),
	neuterRisks: researchSource("Behavioural risks in male dogs with minimal lifetime exposure to gonadal hormones may complicate population-control benefits of desexing", "PLOS ONE", 2018, "https://doi.org/10.1371/journal.pone.0196284", "10.1371/journal.pone.0196284", "Questionnaire analysis of 6,235 male dogs examined associations between lifetime hormone exposure and behavior. Neutering timing, reasons for surgery and other differences can confound results. Associations neither establish an individual treatment effect nor settle the wider population-control and health balance.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	brachyReview: researchSource("Brachycephalic obstructive airway syndrome: much more than a surgical problem", "Veterinary Quarterly", 2022, "https://doi.org/10.1080/01652176.2022.2145621", "10.1080/01652176.2022.2145621", "Clinical review describes brachycephalic obstructive airway syndrome as a potentially lifelong welfare condition involving more than a surgical lesion. Its synthesis supports functional assessment but is not a pooled estimate for all short-faced breeds.", "technical_reference", "supports", novemberAnimalWelfareResearchCheckedAt),
	brachySleep: researchSource("Evaluation of risk factors for sleep-disordered breathing in dogs", "Journal of Veterinary Internal Medicine", 2024, "https://doi.org/10.1111/jvim.17019", "10.1111/jvim.17019", "Home sleep study of 63 pet dogs associated brachycephaly, body condition and airway severity with sleep-disordered breathing. Sleep measurements and clinical airway assessments capture related but distinct outcomes; convenience sampling limits population prevalence estimates.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	brachyPrevalence: researchSource("A cross-sectional study into the prevalence and conformational risk factors of BOAS across fourteen brachycephalic dog breeds", "PLOS One", 2026, "https://doi.org/10.1371/journal.pone.0340604", "10.1371/journal.pone.0340604", "2026 cross-sectional study assessed 898 UK dogs across 14 additional brachycephalic breeds and found marked variation. Extreme shortening, nostril narrowing and higher body condition were associated with risk but did not fully explain cases. A breed name or photograph is not an individual diagnosis.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catAttachment: researchSource("Attachment bonds between domestic cats and humans", "Current Biology", 2019, "https://doi.org/10.1016/j.cub.2019.08.036", "10.1016/j.cub.2019.08.036", "2019 separation-reunion study classified cat-human behavior using attachment categories adapted from infant research. It provides evidence under that framework; interpretation depends on the validity of the categories for cats and does not measure a universal level of affection.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catAttachmentDissent: researchSource("Domestic Cats (Felis silvestris catus) Do Not Show Signs of Secure Attachment to Their Owners", "PLOS ONE", 2015, "https://doi.org/10.1371/journal.pone.0135109", "10.1371/journal.pone.0135109", "Experiment with 20 cat-owner pairs found limited support for owners uniquely providing a secure base under its test conditions. This challenges a particular attachment interpretation rather than establishing that cats lack social preferences or close relationships.", "landmark_study", "debate", novemberAnimalWelfareResearchCheckedAt),
	catAttachment2024: researchSource("Cat behaviour in the secure base test: Comparison between owned and shelter animals", "Behavioural Processes", 2024, "https://doi.org/10.1016/j.beproc.2024.104989", "10.1016/j.beproc.2024.104989", "Secure-base comparison of 20 owned and 20 shelter cats found differences in human contact and test behavior. Population, familiarity and setting differ, making attachment-category proportions difficult to compare directly with other studies.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	catAttachmentConcept: researchSource("The biological irrelevance of ‘Cattachment’ – It’s time to view cats from a different perspective", "Applied Animal Behaviour Science", 2025, "https://doi.org/10.1016/j.applanim.2025.106641", "10.1016/j.applanim.2025.106641", "2025 empirical comparison of 15 therapy cats and 13 ordinary companion cats challenges the biological interpretation of standard attachment tests. It includes primary observations as well as conceptual criticism; it is not simply a commentary or evidence that cat-human relationships are absent.", "landmark_study", "debate", novemberAnimalWelfareResearchCheckedAt),
	catBlinkExperiment: researchSource("The role of cat eye narrowing movements in cat–human communication", "Scientific Reports", 2020, "https://doi.org/10.1038/s41598-020-73426-0", "10.1038/s41598-020-73426-0", "Two experiments found more feline eye narrowing during owner slow blinking and greater approach to an experimenter after slow blinking than after a neutral face. Small samples and immediate outcomes limit conclusions about lasting welfare or a single emotional meaning.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catBlinkAdoption: researchSource("Slow Blink Eye Closure in Shelter Cats Is Related to Quicker Adoption", "Animals", 2020, "https://doi.org/10.3390/ani10122256", "10.3390/ani10122256", "Study of 18 shelter cats associated some slow-blink responses with quicker adoption, and nervous cats also responded. It did not test a randomized adoption intervention and comes from the same research program as the communication experiments.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	catHiding2014: researchSource("Will a hiding box provide stress reduction for shelter cats?", "Applied Animal Behaviour Science", 2014, "https://doi.org/10.1016/j.applanim.2014.09.002", "10.1016/j.applanim.2014.09.002", "Randomized 19-cat shelter study found faster stress-score adaptation with a hiding box, with groups becoming more similar by day 14. The study concerns behavioral adaptation in a particular shelter, not prevention of every health problem.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catHidingTrial: researchSource("The effect of a hiding box on stress levels and body weight in Dutch shelter cats; a randomized controlled trial", "PLOS ONE", 2019, "https://doi.org/10.1371/journal.pone.0223492", "10.1371/journal.pone.0223492", "Randomized 23-cat trial found faster reductions in behavioral stress with hiding boxes, but no prevention of weight loss and no clear change in adoption or length of stay. Behavioral stress and these health or operational outcomes should remain separate.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catHideShelf: researchSource("Effects of the provision of a hiding box or shelf on the behaviour and faecal glucocorticoid metabolites of bold and shy cats housed in single cages", "Applied Animal Behaviour Science", 2021, "https://doi.org/10.1016/j.applanim.2021.105221", "10.1016/j.applanim.2021.105221", "72-cat shelter study found hiding-box associations with lower fecal glucocorticoid measures and greater food intake; responses differed with starting temperament. Physiological and behavioral measures provide complementary information rather than an individual diagnosis.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catEnrichmentReview: researchSource("Increasing shelter cat welfare through enrichment: A review", "Applied Animal Behaviour Science", 2022, "https://doi.org/10.1016/j.applanim.2022.105585", "10.1016/j.applanim.2022.105585", "Narrative review of shelter-cat enrichment covers hiding, physical resources and social opportunities. Heterogeneous studies and conditions do not yield one universally best enrichment or establish that increased interaction benefits every cat.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	catGroupReview: researchSource("Are multi-cat homes more stressful? A critical review of the evidence associated with cat group size and wellbeing", "Journal of Feline Medicine and Surgery", 2022, "https://doi.org/10.1177/1098612x211013741", "10.1177/1098612x211013741", "Critical systematic review of 15 papers found inconsistent relationships between group size and cat wellbeing; only four papers primarily examined group size. Housing, resources and methods confound comparisons. Published online in 2021 and in the 2022 journal issue.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	catCageGroupReview: researchSource("A critically appraised topic (CAT) to compare the effects of single and multi-cat housing on physiological and behavioural measures of stress in domestic cats in confined environments", "BMC Veterinary Research", 2014, "https://doi.org/10.1186/1746-6148-10-73", "10.1186/1746-6148-10-73", "Critically appraised review of six confined-housing studies found conflicting physiological and behavioral stress outcomes. Familiarity and housing conditions vary; shelter or laboratory groups do not directly describe established multi-cat homes.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	catOutdoorReview: researchSource("Uncontrolled Outdoor Access for Cats: An Assessment of Risks and Benefits", "Animals", 2020, "https://doi.org/10.3390/ani10020258", "10.3390/ani10020258", "Review of uncontrolled outdoor access describes opportunities for natural behavior alongside traffic, disease, injury and disappearance risks. It discusses indoor enrichment and controlled access without establishing a universal welfare ranking for all cats and locations.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	catOutdoorControlled: researchSource("Introducing a Controlled Outdoor Environment Impacts Positively in Cat Welfare and Owner Concerns: The Use of a New Feline Welfare Assessment Tool", "Frontiers in Veterinary Science", 2021, "https://doi.org/10.3389/fvets.2020.599284", "10.3389/fvets.2020.599284", "Retrospective survey of 446 customers of a commercial containment-system company found improved owner-rated cat welfare and reduced owner concern after installation. Selected customers, recalled before-after ratings and lack of a randomized comparator limit causal conclusions. The article was published in 2021 despite 2020 in its DOI.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catOutdoor2024: researchSource("Safe or sound? Factors influencing outdoor access, cat behavior, and hunting history with implications for conservation and welfare", "Applied Animal Behaviour Science", 2024, "https://doi.org/10.1016/j.applanim.2024.106425", "10.1016/j.applanim.2024.106425", "Exploratory survey of 631 owners near Davis, California, distinguished indoor, controlled and free-roaming access. Convenience and snowball recruitment and cross-sectional associations limit representativeness and causal inference about behavior or hunting.", "landmark_study", "context", novemberAnimalWelfareResearchCheckedAt),
	declawBehavior: researchSource("Pain and adverse behavior in declawed cats", "Journal of Feline Medicine and Surgery", 2018, "https://doi.org/10.1177/1098612x17705044", "10.1177/1098612x17705044", "Retrospective comparison of 137 declawed and 137 control cats found associations with pain and adverse behaviors. Selection and prior differences limit causal inference; odds ratios are not individual outcome probabilities. Published online in 2017 and in the 2018 journal issue.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	declaw2025: researchSource("Declawing in Cat is associated with neuroplastic sensitization and long-term painful afflictions", "Scientific Reports", 2025, "https://doi.org/10.1038/s41598-025-16288-8", "10.1038/s41598-025-16288-8", "Secondary analysis drawing on eight feline osteoarthritis studies found worse sensitivity and functional measures in declawed cats with osteoarthritis than in comparison cats with osteoarthritis. It is not eight independent randomized declawing trials and does not establish effects in all cats.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	catPainAssessment: researchSource("Systematic review of the behavioural assessment of pain in cats", "Journal of Feline Medicine and Surgery", 2016, "https://doi.org/10.1177/1098612x15578725", "10.1177/1098612x15578725", "Systematic review of 100 papers on behavioral pain assessment in cats describes gaps in validation and the need to distinguish sensory, affective, acute and chronic outcomes. It concerns measurement, rather than a pooled estimate of declawing harm.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	calfMeta: researchSource("A meta-analysis approach to evaluate the effects of early group housing on calf performance, health, and behavior during the preweaning period", "Journal of Dairy Science", 2025, "https://doi.org/10.3168/jds.2024-25159", "10.3168/jds.2024-25159", "Systematic review and meta-analysis of 51 articles containing 85 studies found behavioral and average growth or intake benefits with early pair or group housing. Comparable disease-occurrence data were lacking, so blood measures do not establish disease safety. Published in 2025 despite 2024 in the DOI.", "meta_analysis", "supports", novemberAnimalWelfareResearchCheckedAt),
	calfScoping: researchSource("A scoping review on pair housing dairy calves: health and performance outcomes and tactics to reduce cross-sucking behavior", "Frontiers in Veterinary Science", 2025, "https://doi.org/10.3389/fvets.2025.1568164", "10.3389/fvets.2025.1568164", "2025 scoping review of pair or triplet housing found no consistent reported respiratory-disease disadvantage, but several studies lacked validated diagnostic criteria. Feeding and abnormal oral behavior complicate the welfare balance; absence of a detected association is not proof of equal disease risk.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	calfTrial: researchSource("The effect of pair housing on dairy calf health, performance, and behavior", "Journal of Dairy Science", 2021, "https://doi.org/10.3168/jds.2020-19968", "10.3168/jds.2020-19968", "Randomized comparison of 22 individually housed and 44 pair-housed calves found no clear health, intake or growth difference. Novel-arena movement suggested activity deprivation under individual housing. Calves within pairs and repeated observations are not independent treatment units for every outcome.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	cowContact2026: researchSource("Comparing cow–calf contact systems: A review of effects of prolonged contact on animal welfare and performance and stakeholder attitudes", "Applied Animal Behaviour Science", 2026, "https://doi.org/10.1016/j.applanim.2026.107118", "10.1016/j.applanim.2026.107118", "Systematic review of 60 studies across five continents found no consistently superior cow-calf contact arrangement. Separation management, nutritional dependence and varied systems limit direct comparisons. Reduced machine-harvested milk partly reflects milk consumed by calves, rather than an equivalent reduction in biological production.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	cowContactReview: researchSource("Invited review: A systematic review of the effects of prolonged cow–calf contact on behavior, welfare, and productivity", "Journal of Dairy Science", 2019, "https://doi.org/10.3168/jds.2018-16021", "10.3168/jds.2018-16021", "Systematic review found prolonged contact can support calf social development and early growth while increasing acute distress at later separation. Few studies measured long-term welfare, and designs and contact schedules differed.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	cowHealthReview: researchSource("Invited review: A systematic review of the effects of early separation on dairy cow and calf health", "Journal of Dairy Science", 2019, "https://doi.org/10.3168/jds.2018-15603", "10.3168/jds.2018-15603", "Systematic review of 70 articles found no consistent overall health evidence supporting early cow-calf separation. Findings differed by disease and comparison quality; this does not establish that every contact system has the same infection risks.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	cowField2025: {
		...researchSource("Welfare of calves and heifers on dairy farms with cow-calf contact rearing or early separation", "Frontiers in Veterinary Science", 2025, "https://doi.org/10.3389/fvets.2025.1610084", "10.3389/fvets.2025.1610084", "Observational comparison of 50 Austrian dairy farms found contact systems associated with some better welfare measures alongside major management differences. Its December 2025 corrigendum revises management counts, welfare tables and overall classifications: better overall calf classification remained, while the heifer overall difference was not statistically confirmed. Contact alone cannot explain the farm-level associations.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.3389/fvets.2025.1610084",
			"https://api.crossref.org/works?filter=updates%3A10.3389%2Ffvets.2025.1610084&rows=100",
			"https://doi.org/10.3389/fvets.2025.1743906"
		]
	},
	henOpinion: researchSource("Welfare of laying hens on farm", "EFSA Journal", 2023, "https://doi.org/10.2903/j.efsa.2023.7789", "10.2903/j.efsa.2023.7789", "EFSA's 2023 scientific opinion evaluates laying-hen welfare hazards and animal-based measures in European systems. It recommends non-cage housing with suitable litter and elevated resources, while addressing bone injuries, pecking and other harms. It is a scientific welfare assessment, not a guarantee attached to a commercial label.", "guideline", "supports", novemberAnimalWelfareResearchCheckedAt),
	henMortality: researchSource("Laying hen mortality in different indoor housing systems: a meta-analysis of data from commercial farms in 16 countries", "Scientific Reports", 2021, "https://doi.org/10.1038/s41598-021-81868-3", "10.1038/s41598-021-81868-3", "Meta-analysis of 6,040 commercial flocks containing 176 million hens across 16 countries found mortality declined as newer systems matured, with no cage versus cage-free mortality difference in more recent data. Flocks, rather than every hen, supply the comparative evidence; mortality does not measure all welfare dimensions.", "meta_analysis", "context", novemberAnimalWelfareResearchCheckedAt),
	henSkeleton: researchSource("Skeletal disorders in laying hens: a systematic review with a focus on non-cage housing systems and hemp-based dietary interventions for bone health", "British Poultry Science", 2025, "https://doi.org/10.1080/00071668.2025.2489059", "10.1080/00071668.2025.2489059", "2025 systematic review highlights skeletal problems, particularly keel-bone damage in non-cage systems, alongside discussion of nutritional interventions. It supports attention to injury trade-offs and does not establish that all cage-free systems have poorer overall welfare or validate a particular supplement recommendation.", "systematic_review", "debate", novemberAnimalWelfareResearchCheckedAt),
	henLitter: researchSource("Restricting laying hens’ litter access leads to a rebound effect in wing flapping and dust bathing behavior", "Poultry Science", 2026, "https://doi.org/10.1016/j.psj.2026.106907", "10.1016/j.psj.2026.106907", "2026 study with 1,152 hens found rebound dust bathing and wing flapping after restricted litter access. Treatments were assigned to two rooms, one per condition, limiting independent replication and confounding room with treatment. Bird count is not the number of independent treatment assignments.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	henPerch: researchSource("Litter and perch type matter already from the start: exploring preferences and perch balance in laying hen chicks", "Poultry Science", 2021, "https://doi.org/10.1016/j.psj.2020.11.041", "10.1016/j.psj.2020.11.041", "Controlled comparison in 93 chicks across six pens found material preferences and differences in perch use and successful landings. Chicks used different litter for different behaviors. Age, pen clustering and design limit extrapolation to adult flocks. Published in 2021 despite 2020 in the DOI.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	henChicksReview: researchSource("Farm Environmental Enrichments Improve the Welfare of Layer Chicks and Pullets: A Comprehensive Review", "Animals", 2022, "https://doi.org/10.3390/ani12192610", "10.3390/ani12192610", "Narrative review of environmental enrichment for layer chicks and pullets describes behavioral opportunities and possible later benefits. Resource quality, continuity and access matter, and limited provision can create competition. Its broad recommendations are not a pooled causal estimate.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	pigEnrichmentReview: researchSource("A Review of the Effects of Non-Straw Enrichment on Tail Biting in Pigs", "Animals", 2019, "https://doi.org/10.3390/ani9100824", "10.3390/ani9100824", "Review of non-straw enrichments found reduced tail damage with some materials, often supported by only one study each. Common processed wood, plastic and metal objects lacked consistent injury reductions unless renewed. Interaction time alone does not establish reduced tail biting.", "systematic_review", "supports", novemberAnimalWelfareResearchCheckedAt),
	pigStrawAssessment: researchSource("Can straw based enrichment treat tail biting in pigs?", "Veterinary Evidence", 2022, "https://doi.org/10.18849/ve.v7i3.458", "10.18849/ve.v7i3.458", "Focused critically appraised summary of three straw-enrichment studies, including two randomized trials and one nonrandomized trial. Two reported benefit and one did not; interacting husbandry factors mean enrichment alone does not eliminate tail biting. The authors' evidence rating is not a site-performed GRADE assessment.", "systematic_review", "context", novemberAnimalWelfareResearchCheckedAt),
	pigRiskReview: researchSource("Tail-Biting in Pigs: A Scoping Review", "Animals", 2021, "https://doi.org/10.3390/ani11072002", "10.3390/ani11072002", "Scoping review mapped tail-biting risks and interventions using a search through May 2019. Inconsistent definitions and outcomes illustrate multifactorial causation. A scoping map does not establish pooled treatment efficacy or complete current coverage by itself.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
	pigMaterialTrial: researchSource("Impact of feed, light and access to manipulable material on tail biting in pigs with intact tails", "Acta Veterinaria Scandinavica", 2024, "https://doi.org/10.1186/s13028-023-00716-8", "10.1186/s13028-023-00716-8", "Single-herd longitudinal intervention combined changes in feed, lighting and manipulable material, with fewer tail injuries afterward. Buildings differed at baseline and components changed together, so the improvement cannot be attributed to enrichment alone. Published in 2024 despite 2023 in the DOI.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	horseReview: researchSource("Living the good life? A systematic review of behavioural signs of affective state in the domestic horse (Equus caballus) and factors relating to quality of life. Part I: Fulfilment of species-specific needs", "Animal Welfare", 2024, "https://doi.org/10.1017/awf.2024.38", "10.1017/awf.2024.38", "Systematic review of behavioral indicators and species-specific needs identifies space, companionship and forage as welfare priorities. Its wider search retained 179 articles across two companion reviews; those are not 179 independent social-housing trials.", "systematic_review", "supports", novemberAnimalWelfareResearchCheckedAt),
	horseHousing: researchSource("Domesticated horses differ in their behavioural and physiological responses to isolated and group housing", "Physiology & Behavior", 2015, "https://doi.org/10.1016/j.physbeh.2015.02.040", "10.1016/j.physbeh.2015.02.040", "Randomized-block housing comparison exposed 16 horses to four five-day conditions. The no-physical-contact condition showed higher fecal stress-hormone measures and more difficult handling. Small samples, short exposure and carryover possibilities limit long-term conclusions.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	horseGroupTrial: researchSource("Group housing increases alertness and social interaction compared to traditional single stabling in two-year-old sport horse stallions during pretraining", "animal", 2025, "https://doi.org/10.1016/j.animal.2025.101584", "10.1016/j.animal.2025.101584", "2025 pretraining study compared 29 young Warmblood stallions in group and individual systems. Group housing allowed grooming and play but produced more superficial lesions and some stronger stress responses; the authors found no major overall system advantage under these conditions. Age groups and small, selected samples limit generalization.", "landmark_study", "debate", novemberAnimalWelfareResearchCheckedAt),
	fishNociception: researchSource("Evolution of nociception and pain: evidence from fish models", "Philosophical Transactions of the Royal Society B: Biological Sciences", 2019, "https://doi.org/10.1098/rstb.2019.0290", "10.1098/rstb.2019.0290", "2019 review argues that converging sensory, behavioral and physiological findings make pain in fish highly likely. Its inference goes beyond withdrawal reflexes, while the interpretation of subjective experience and generalization across species remain important limitations.", "technical_reference", "supports", novemberAnimalWelfareResearchCheckedAt),
	fishInference: {
		...researchSource("What Is It Like to Be a Bass? Red Herrings, Fish Pain and the Study of Animal Sentience", "Frontiers in Veterinary Science", 2022, "https://doi.org/10.3389/fvets.2022.788289", "10.3389/fvets.2022.788289", "2022 methodological analysis distinguishes sentience from responses possible without consciousness, while supporting precautionary fish protection. Its corrigendum changes attribution from discovery of trout nociceptors to research leadership, recognizing other contributors; the authors report no change to scientific conclusions.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.3389/fvets.2022.788289",
			"https://api.crossref.org/works?filter=updates%3A10.3389%2Ffvets.2022.788289&rows=100",
			"https://doi.org/10.3389/fvets.2022.948567"
		]
	},
	fishDissent: researchSource("Can fish really feel pain?", "Fish and Fisheries", 2014, "https://doi.org/10.1111/faf.12010", "10.1111/faf.12010", "Skeptical review argues that behavioral and neuroanatomical evidence does not establish conscious fish pain. It is an older competing interpretation, published online before its 2014 journal issue, rather than a current survey of researchers or a demonstration that welfare protection is unnecessary.", "technical_reference", "debate", novemberAnimalWelfareResearchCheckedAt),
	animalConsciousnessDeclaration: researchSource("The New York Declaration on Animal Consciousness", "New York Declaration on Animal Consciousness individual signatories", 2024, "https://sites.google.com/nyu.edu/nydeclaration/declaration", "", "April 2024 declaration by individual scientists and scholars identifies at least a realistic possibility of conscious experience in fishes, cephalopods and decapod crustaceans, and supports considering welfare risks. Signatories act personally rather than for their institutions. It is neither a prevalence survey nor a numerical probability of consciousness or pain.", "consensus_statement", "context", novemberAnimalWelfareResearchCheckedAt),
	octopusUpdate: researchSource("Sentience in cephalopod molluscs: an updated assessment", "Biological Reviews", 2026, "https://doi.org/10.1002/brv.70125", "10.1002/brv.70125", "2026 structured review assesses eight neural and behavioral sentience criteria, rating octopuses high or very high on six. Evidence is stronger for some cephalopods than others; missing research is not a failed criterion. Criteria share evidence and do not yield a numerical probability of consciousness.", "systematic_review", "supports", novemberAnimalWelfareResearchCheckedAt),
	octopusStudy: researchSource("Behavioral and neurophysiological evidence suggests affective pain experience in octopus", "iScience", 2021, "https://doi.org/10.1016/j.isci.2021.102229", "10.1016/j.isci.2021.102229", "2021 behavioral and neurophysiological experiment found context avoidance and relief-related preference patterns consistent with affective pain in octopuses. The inference concerns subjective experience from converging observations, rather than direct report or a claim of human-like cognition.", "landmark_study", "supports", novemberAnimalWelfareResearchCheckedAt),
	decapodFramework: researchSource("Sentience in decapod crustaceans: A general framework and review of the evidence", "Animal Sentience", 2022, "https://doi.org/10.51291/2377-7478.1691", "10.51291/2377-7478.1691", "Eight-criterion framework review found stronger evidence in true crabs and substantial evidence in some lobsters and crayfish, with weaker coverage of other groups. Confidence ratings concern evidence for individual criteria, not independent votes or exact probabilities of pain.", "systematic_review", "supports", novemberAnimalWelfareResearchCheckedAt),
	decapodCritique: researchSource("Strong inferences about pain in invertebrates require stronger evidence", "Animal Sentience", 2022, "https://doi.org/10.51291/2377-7478.1731", "10.51291/2377-7478.1731", "Published methodological critique argues that many proposed criteria do not necessarily imply affective pain and calls for stronger evidence involving voluntary aversion and relief-related preference. It challenges the inference from tests, rather than showing that all decapods lack experience.", "technical_reference", "debate", novemberAnimalWelfareResearchCheckedAt),
	decapodRecent: researchSource("A History of Pain Studies and Changing Attitudes to the Welfare of Crustaceans", "Animals", 2025, "https://doi.org/10.3390/ani15030445", "10.3390/ani15030445", "2025 narrative review describes accumulating findings consistent with crustacean pain while acknowledging limits of proof. Its discussion of advocacy and legal recognition is distinct from experimental evidence, and research coverage varies between decapod groups.", "technical_reference", "supports", novemberAnimalWelfareResearchCheckedAt),
	zooMeta: researchSource("Meta-analytic review of the effects of enrichment on stereotypic behavior in zoo mammals", "Zoo Biology", 2006, "https://doi.org/10.1002/zoo.20091", "10.1002/zoo.20091", "Meta-analysis of 54 studies supplied 63 effect-size estimates and found an overall reduction in stereotypic behavior during enrichment. Effect sizes are not independent animal populations, and older publication-bias checks do not rule out selective reporting or establish complete welfare improvement.", "meta_analysis", "supports", novemberAnimalWelfareResearchCheckedAt),
	zooModern: researchSource("Feline flourish: A scoping review of enrichment effects on zoo-housed felids", "Applied Animal Behaviour Science", 2025, "https://doi.org/10.1016/j.applanim.2025.106620", "10.1016/j.applanim.2025.106620", "2025 scoping review included 39 zoo-felid papers and found generally favorable behavioral associations with enrichment. Large cats, sensory and food enrichment, and activity measures dominated; small felids and physiological welfare measures were less represented.", "technical_reference", "supports", novemberAnimalWelfareResearchCheckedAt),
	zooAssessment: researchSource("Why and how should we use environmental enrichment to tackle stereotypic behaviour?", "Applied Animal Behaviour Science", 2007, "https://doi.org/10.1016/j.applanim.2006.05.041", "10.1016/j.applanim.2006.05.041", "Methodological review explains why abnormal repetitive behaviors can reflect frustration, habit or longer-term effects and why reducing them alone cannot establish good welfare. Enrichment may help without abolishing every stereotypy. Published in the 2007 issue after 2006 online publication.", "technical_reference", "context", novemberAnimalWelfareResearchCheckedAt)
};

export const novemberAnimalWelfareClaims = [
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "how-do-reward-based-and-aversive-dog-training-compare",
		title: "How do reward-based and aversive dog-training methods compare?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Reward-based methods are generally better supported for dog welfare. Aversive methods carry stress risks, without a clear overall training advantage.",
		editorSummary: "Learning a task and feeling safe during training are separate outcomes. The strongest practical case for rewards combines welfare findings with evidence that dogs can learn effectively without painful or frightening tools.",
		stableCore: [
			"A study of 92 companion dogs found more stress-related behavior in aversive-training schools than reward-based schools. Owners chose their schools, so the comparison was not a randomized trial.",
			"In a separate comparison involving 63 dogs with recall problems, reward-focused trainers obtained better responses on some measures than electronic-collar trainers. Trainer differences limit what can be attributed to a tool alone.",
			"The American Veterinary Society of Animal Behavior reaffirmed its reward-based position in 2025. That professional recommendation is broader than the outcomes tested in any one experiment."
		],
		openQuestions: [
			"How methods compare over longer periods for specific tasks, with trainer skill and dogs' starting behavior matched.",
			"Which forms of support best help dogs with severe fear or aggression while protecting welfare."
		],
		whatWouldChangeMinds: [
			"Replicated, well-controlled comparisons measuring both lasting learning and several welfare outcomes.",
			"Evidence that findings generalize across settings without relying only on owner reports or a single stress marker."
		],
		misconceptions: [
			"A method can suppress a behavior while also causing fear; obedience alone is not a complete welfare assessment."
		],
		population: "Companion dogs in training-school studies and dogs referred for recall problems; professional guidance covers broader practice.",
		scope: "Comparative welfare and task-learning outcomes from reward-focused and aversive training, interpreted alongside a named professional position.",
		excludedEvidence: [
			"Exclude trial protocols as completed results and do not count reanalyses of the same dogs as independent experiments. Short recall studies do not settle every working-dog task."
		],
		uncertainty: "Studies use different trainers, tasks and selection methods. Behavioral and physiological stress measures support welfare judgments without directly revealing every dog's feelings.",
		sources: [sources.avsabBoard, sources.trainingWelfare, sources.trainingEfficacy]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "can-puppy-socialization-prevent-later-aggression",
		title: "Can puppy socialization prevent later aggression?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Positive early experiences may help, but research has not established a socialization program that reliably prevents later aggression. The quality of exposure matters, and more or earlier public exposure is not necessarily better.",
		editorSummary: "Fear of unfamiliar people or dogs and aggression are related but different outcomes. Much of the evidence concerns associations, rather than the effect of a particular puppy class.",
		stableCore: [
			"A review of early experience and human-directed aggression identifies rearing, acquisition and management factors. Definitions and study designs vary, limiting conclusions about particular programs.",
			"A large owner survey associated less socialization with greater social fear. Fear scores do not directly measure how much an intervention prevents aggression.",
			"A correction to a 2022 review clarifies that one observational study found no protective advantage from earlier or more frequent public exposure; later first exposure was associated with less unfamiliar-dog aggression. This does not establish that delaying positive socialization is beneficial."
		],
		openQuestions: [
			"Which ordinary socialization programs produce lasting benefits beyond differences in owners, rearing and starting temperament.",
			"How timing and quality of experience interact with individual development."
		],
		whatWouldChangeMinds: [
			"Prospective comparisons of humane programs with recorded starting behavior and longer follow-up.",
			"Consistent results using validated behavior measures rather than retrospective owner ratings alone."
		],
		misconceptions: [
			"Repeated frightening exposure is not the same thing as a positive social experience."
		],
		population: "Domestic puppies followed into later behavior, including owner-survey populations and heterogeneous early-life studies.",
		scope: "Evidence for preventing later aggression through puppy socialization, distinguishing fear outcomes, public exposure, structured positive experiences and the wider rearing environment.",
		excludedEvidence: [
			"Retrospective exposure histories do not establish the effect of a program; fear is not aggression, and the corrected public-exposure finding does not justify frightening exposure or deliberate social deprivation."
		],
		uncertainty: "Definitions and follow-up differ, and ethical constraints limit controlled deprivation studies. Individual behavior concerns and safe exposure require appropriate veterinary or behavior support.",
		sources: [sources.puppyReview, sources.puppyFear, sources.puppyAggression]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "how-well-does-dog-breed-predict-individual-behavior",
		title: "How well does dog breed predict individual behavior?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Breed can give clues about some average tendencies, but individual dogs vary widely. A breed label cannot provide a reliable personality or aggression verdict.",
		editorSummary: "Group averages and individual predictions answer different questions. An animal's history, behavior in context and physical ability matter when judging its needs or risks.",
		stableCore: [
			"A large owner-survey study found some breed-linked tendencies, while most measured variation remained within rather than between breeds.",
			"Breed's contribution to variation in that dataset is different from how heritable a trait is. It does not show that inherited differences are unimportant.",
			"Other work found substantial variation within breeds and weak individual prediction from selected genetic markers. Behavior ratings and aggression-related questionnaires are not the same outcome as observed bite injuries."
		],
		openQuestions: [
			"How well predictions transfer to dogs with different backgrounds and to behavior measured directly rather than reported by owners.",
			"How developmental experiences interact with inherited tendencies."
		],
		whatWouldChangeMinds: [
			"Independent prediction studies that test individual dogs outside the original sample and report useful accuracy for clearly defined outcomes.",
			"Consistent results after accounting for owner expectations, experience and relatedness."
		],
		misconceptions: [
			"Limited prediction from a breed label does not mean every dog has the same physical capabilities or poses the same injury risk."
		],
		population: "Purebred and mixed-breed dogs in large community-science surveys and smaller behavioral-questionnaire comparisons.",
		scope: "Average breed associations and individual behavioral prediction; appearance, heritability, personality ratings and injury outcomes remain distinct.",
		excludedEvidence: [
			"Do not equate breed averages with individual forecasts, reuse Darwin's Ark analyses as independent replications, or infer injury severity or the effectiveness of laws from personality questionnaires."
		],
		uncertainty: "Owner reporting, sampling and shared project data limit precision. These studies do not supply a stand-alone assessment of a particular dog's aggression or safety.",
		sources: [sources.breedStereotypes, sources.breedPrediction, sources.breedClassification]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "what-does-a-dogs-guilty-look-tell-us",
		title: "What does a dog's guilty look tell us?",
		band: "unclear",
		certainty: "low",
		bottomLine: "The look can reflect a response to a person's reactions. It does not establish that the dog understands a past misdeed or feels human-like guilt.",
		editorSummary: "Experiments can test when a behavior appears. They cannot directly read the animal's private emotional experience.",
		stableCore: [
			"In a small experiment, behaviors owners called guilty were more closely linked to being scolded than to whether the dog had disobeyed.",
			"A later experiment varied the dog's action and visible evidence of it. Owners could not identify what had happened from the greeting behavior better than chance.",
			"These findings weaken one interpretation of the look. They do not establish that dogs lack emotions or resolve whether dogs can experience every form of guilt."
		],
		openQuestions: [
			"How to distinguish responses to expected human reactions from an animal's evaluation of its own previous action.",
			"Whether findings generalize across dogs, contexts and less artificial situations."
		],
		whatWouldChangeMinds: [
			"Replicated tests that separate prior actions, learned expectations and the owner's present reactions.",
			"Converging behavioral evidence with a validated way of testing the proposed emotional interpretation."
		],
		misconceptions: [
			"Recognizing a familiar expression is not a reliable reconstruction of what happened while a person was away."
		],
		population: "Companion dogs in small controlled greeting and rule-breaking experiments.",
		scope: "Evidence about the interpretation of owner-described guilty behavior, separated from claims about dogs' entire emotional lives.",
		excludedEvidence: [
			"Exclude anecdotes as proof of moral understanding and do not turn a small experiment about one expression into proof that an emotion is absent in the species."
		],
		uncertainty: "The core experiments are small and the emotional construct is difficult to test. Observable behavior and subjective feelings remain different levels of explanation.",
		sources: [sources.guiltStudy, sources.guiltReplication]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "can-dogs-follow-human-pointing-gestures",
		title: "Can dogs follow human pointing gestures?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Many dogs use human pointing to find a target, and some studies show flexible use in new situations. That does not make their understanding identical to a person's.",
		editorSummary: "Following a cue, responding to a familiar routine and understanding someone's intention are related but distinct possibilities.",
		stableCore: [
			"Studies across domestic animals show that dogs can use a range of human signals. Results depend on the task, the cue and the animal's experience.",
			"Two 2024 experiments involving 70 dogs found successful pointing responses with controls for simple attraction to a hand or a novel object.",
			"Dogs also followed gestures when choosing a route around a barrier. Such flexibility supports more than one rigid learned response, while leaving the underlying mental explanation open."
		],
		openQuestions: [
			"How experience, development and cue context affect performance across a wider range of dogs.",
			"Which controls best distinguish learned associations from understanding a person's communicative intention."
		],
		whatWouldChangeMinds: [
			"Independent replications using varied signals, novel contexts and clear controls for simpler explanations.",
			"More representative samples including dogs with less close human contact."
		],
		misconceptions: [
			"A successful choice in a pointing task does not establish human-level language or an identical understanding of intentions."
		],
		population: "Companion dogs in controlled gesture-comprehension tasks, considered alongside reviews of domestic-animal social cognition.",
		scope: "Using human pointing and transferring it across contexts; performance is separated from a claim about a particular mental mechanism.",
		excludedEvidence: [
			"Do not equate a correct choice with human-like language, generalize one trained task to every dog, or ignore non-communicative cues and past experience."
		],
		uncertainty: "Experimental choices support flexible cue use, but more than one learning or cognitive explanation may fit. Evidence is richer for some dog populations than others.",
		sources: [sources.pointingExperiment, sources.pointingReview]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "can-dogs-recognize-human-emotion-cues",
		title: "Can dogs recognize human emotion cues?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Dogs can distinguish some human emotional cues and change their behavior in response. This does not establish that they share a person's feelings or understand the reason for them.",
		editorSummary: "Recognizing a face or voice, reacting to it and feeling empathy are different claims. Research supports the first two more clearly than the third.",
		stableCore: [
			"In an experiment combining faces and voices, dogs looked longer at images whose emotional tone matched the sound. This supports distinguishing positive and negative cues across senses.",
			"A 2024 study found different dog responses when owners experienced happiness or sadness, including differences in attention and task performance.",
			"A methodological review warns that artificial stimuli, human expectations and narrow measures can lead researchers to overstate what dogs understand. Eye movements alone do not establish empathy."
		],
		openQuestions: [
			"How emotional cue recognition works during everyday interactions rather than brief tests.",
			"How to distinguish learned responses to cues from sharing another individual's emotional state."
		],
		whatWouldChangeMinds: [
			"Independent, blinded studies combining natural interactions with several measures of discrimination and behavior.",
			"Reliable tests that separate empathy from attention, conditioning and changes in the owner's behavior."
		],
		misconceptions: [
			"Responding differently to sadness and happiness does not demonstrate that a dog understands why someone is upset."
		],
		population: "Companion dogs tested with emotional faces, voices and owners experiencing induced emotional states.",
		scope: "Discrimination and use of human emotional cues, separated from claims about empathy, mind reading or an identical human emotional experience.",
		excludedEvidence: [
			"Gaze direction alone does not establish empathy, and human facial-expression meanings do not transfer automatically to dogs."
		],
		uncertainty: "Methods and samples vary, and changes in a person's behavior may influence the dog. Several mental processes could explain a successful response.",
		sources: [sources.emotionMatching, sources.emotionAuthenticity, sources.emotionMethods]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-enrichment-improve-shelter-dog-welfare",
		title: "Does enrichment improve shelter-dog welfare?",
		band: "broad",
		certainty: "low",
		bottomLine: "It can improve some welfare measures, but the effect depends on the dog, the activity and the setting. A quieter dog is not automatically a less stressed dog.",
		editorSummary: "Choice, social contact and sensory activities may help, while different activities affect different behaviors. There is no well-supported single best enrichment for every shelter dog.",
		stableCore: [
			"Shelter studies have found changes in resting, vocalizing, panting and other measures after social or sensory enrichment.",
			"An eight-dog study recorded physiological patterns and sleep during several enrichment conditions. Individual responses varied greatly, limiting broad rankings of the activities.",
			"A study during kennel cleaning found that activities associated with calmer body positions were not always those producing the largest reduction in barking. One behavior is an incomplete welfare measure."
		],
		openQuestions: [
			"Which benefits persist over longer stays and transfer to shelters with different routines.",
			"How to match activities to individual preferences while evaluating health, behavior and opportunities for choice together."
		],
		whatWouldChangeMinds: [
			"Larger, replicated comparisons across shelters with baseline observations and multiple welfare outcomes.",
			"Evidence that short-term changes predict lasting wellbeing rather than only reduced activity or noise."
		],
		misconceptions: [
			"An activity that reduces barking is not necessarily the activity that produces the greatest overall welfare benefit."
		],
		population: "Kennelled shelter dogs in small, heterogeneous studies of social, object, auditory and scent-related activities.",
		scope: "Measured shelter-dog responses to environmental enrichment; group findings are distinguished from individual preference and lasting welfare.",
		excludedEvidence: [
			"Do not generalize an eight-dog comparison into a universal ranking, treat less movement as proof of calm, or turn an experimental scent exposure into a home-use safety recommendation."
		],
		uncertainty: "Many studies are small, brief or context-specific. Welfare includes more than arousal, and responses can differ between individual dogs.",
		sources: [sources.shelterDogs2024, sources.shelterDogs2020, sources.shelterDogs2023]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-neutering-reduce-aggression-in-male-dogs",
		title: "Does neutering reduce aggression in male dogs?",
		band: "mixed",
		certainty: "low",
		bottomLine: "There is no consistent overall reduction. Some behaviors change after neutering, but fear-related or human-directed aggression may persist, and studies report conflicting associations.",
		editorSummary: "Roaming, urine marking and aggression are different outcomes. A change in one does not establish a general treatment effect on the others.",
		stableCore: [
			"A 2025 review describes inconsistent behavioral findings and major limits in the available research.",
			"An owner survey reported less roaming, mounting and marking, but no reduction in aggression toward people. Some reported fear behaviors increased.",
			"Larger questionnaire analyses also link behavioral outcomes with the timing of neutering and other factors. Such associations do not establish that surgery caused a particular dog's later behavior."
		],
		openQuestions: [
			"Which behavioral effects remain after accounting for starting temperament, age, reasons for neutering and changes in management.",
			"Whether effects differ reliably between clearly defined forms of aggression."
		],
		whatWouldChangeMinds: [
			"Prospective studies with behavior measured before and after the decision, suitable comparison groups and longer follow-up.",
			"Replicated findings separating sexual behaviors, fear and different aggression targets."
		],
		misconceptions: [
			"Reducing a sexually influenced behavior is not the same as curing fear or aggression."
		],
		population: "Male companion dogs in predominantly observational studies and owner questionnaires, with varying ages and reasons for neutering.",
		scope: "Behavioral associations and changes following male-dog neutering; population control, other health outcomes and individual treatment decisions are separate considerations.",
		excludedEvidence: [
			"Do not infer a surgical treatment effect from retrospective owner reports, combine all aggression into one outcome, or use this behavioral summary as an individual neutering recommendation."
		],
		uncertainty: "Selection and reporting biases are substantial. Decisions about a particular dog require veterinary assessment of behavioral, health and population-control considerations together.",
		sources: [sources.neuterReview, sources.neuterSurvey, sources.neuterRisks]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "how-do-flat-faces-affect-dog-breathing-and-welfare",
		title: "How do flat faces affect dog breathing and welfare?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Short-faced anatomy increases the risk of obstructed breathing and related welfare problems. Severity varies, and being common in a breed does not make breathing difficulty harmless.",
		editorSummary: "Airway problems can affect ordinary activity and sleep as well as obvious breathing distress. Appearance alone does not give a complete assessment of an individual dog.",
		stableCore: [
			"Clinical reviews describe brachycephalic obstructive airway syndrome as a potentially lifelong condition affecting breathing and quality of life.",
			"A study of 63 pet dogs associated short-faced anatomy, higher body condition and more severe airway signs with disturbed breathing during sleep.",
			"A 2026 study across 14 additional breeds found marked variation between breeds. More extreme facial shortening, narrowed nostrils and higher body condition were associated with increased risk, but these measures did not explain every case."
		],
		openQuestions: [
			"How to identify risk earlier across different breeds using measures that predict meaningful functional outcomes.",
			"Which population-level changes produce lasting improvements without overlooking other health traits."
		],
		whatWouldChangeMinds: [
			"Long-term, independently replicated studies combining clinical function, sleep and quality-of-life outcomes.",
			"Evidence that improvements persist across representative dogs rather than only selected clinical populations."
		],
		misconceptions: [
			"A familiar snorting or noisy-breathing pattern can still reflect a health problem."
		],
		population: "Brachycephalic and comparison pet dogs, including clinical reviews, home sleep observations and a multi-breed UK study.",
		scope: "Associations between short-faced anatomy, airway function, sleep and welfare; population risk is separated from individual diagnosis.",
		excludedEvidence: [
			"Do not infer an individual diagnosis from a breed name or photograph, treat a sleep event ratio as a prevalence estimate, or apply one breed's results uniformly to every short-faced dog."
		],
		uncertainty: "Convenience samples, differences between breeds and imperfect measurements affect risk estimates. Breathing difficulty warrants veterinary assessment rather than acceptance as normal for the breed.",
		sources: [sources.brachyReview, sources.brachySleep, sources.brachyPrevalence]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "do-cats-form-attachment-bonds-with-people",
		title: "Do cats form attachment bonds with people?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Cats can form close social relationships with people. Whether standard tests demonstrate a human- or dog-like attachment bond remains debated.",
		editorSummary: "Researchers agree that cats can seek human contact, but disagree about what particular test behaviors reveal about dependence, security and attachment.",
		stableCore: [
			"A 2019 study classified cat behavior using attachment categories adapted from human-infant research and reported evidence of distinct attachment styles.",
			"Other experiments found little evidence that owners uniquely served as a secure base. A 2025 comparison of therapy and ordinary companion cats also challenged that interpretation.",
			"A 2024 study found social-contact differences between owned and shelter cats in a secure-base test. The different populations, procedures and interpretations make the findings difficult to combine into one prevalence figure."
		],
		openQuestions: [
			"Which measures describe the cat-human relationship without assuming that it must match infant or dog attachment.",
			"How familiarity, setting and stress influence a cat's response during separation and reunion."
		],
		whatWouldChangeMinds: [
			"Replicated tests with agreed definitions, appropriate controls and observations in familiar as well as unfamiliar environments.",
			"Evidence that proposed attachment measures predict meaningful behavior beyond the original test."
		],
		misconceptions: [
			"A disputed attachment label does not establish that cats lack affection, social preferences or meaningful relationships."
		],
		population: "Owned, shelter and therapy cats in small separation/reunion and secure-base experiments.",
		scope: "Behavioral evidence and interpretation of cat-human attachment, separated from the broader existence of affiliative relationships.",
		excludedEvidence: [
			"Do not treat human-infant categories as automatically validated in cats, combine different test populations into one attachment percentage, or generalize findings from specially selected therapy cats to all cats."
		],
		uncertainty: "Samples are small and the construct itself is disputed. Social contact and dependence-based attachment may require different measures.",
		sources: [
			sources.catAttachment,
			sources.catAttachmentDissent,
			sources.catAttachment2024,
			sources.catAttachmentConcept
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-slow-blinking-help-cats-interact-with-people",
		title: "Does slow blinking help cats interact with people?",
		band: "broad",
		certainty: "low",
		bottomLine: "Small experiments suggest that cats respond to human slow blinking and may be more willing to approach afterward. The evidence supports a social signal, rather than a fixed translation such as 'I love you.'",
		editorSummary: "Slow blinking is a promising part of cat-human communication. Its meaning depends on context, and the research is still limited.",
		stableCore: [
			"Two experiments reported more cat eye narrowing during owner slow-blink interactions and greater willingness to approach an experimenter after slow blinking than after a neutral expression.",
			"An 18-cat shelter study linked some slow-blink responses with shorter time to adoption. It did not randomly assign cats to a program that increased adoption.",
			"Nervous cats also responded in the shelter study. An eye movement alone does not identify a single emotional state."
		],
		openQuestions: [
			"How reliably the results replicate in larger, independent samples and ordinary home interactions.",
			"How blinking interacts with familiarity, other body signals and the cat's freedom to approach or leave."
		],
		whatWouldChangeMinds: [
			"Independent, preregistered experiments with blinded behavior scoring and suitable facial-expression controls.",
			"Evidence distinguishing effects on approach behavior from lasting changes in stress or the human-cat relationship."
		],
		misconceptions: [
			"A slow blink is not a reliable word-for-word translation of a cat's thoughts."
		],
		population: "Companion and shelter cats in small experimental and observational studies of human-cat eye narrowing.",
		scope: "Immediate behavioral responses to slow blinking, separated from claims about a unique emotion, long-term welfare or adoption causation.",
		excludedEvidence: [
			"The shelter adoption association is not an intervention effect; studies from the same research program are not independent replications, and an eye signal should be interpreted with the rest of the animal's behavior."
		],
		uncertainty: "Small samples and a limited research base make the size and generality of the effect uncertain. Cats differ in their willingness to interact.",
		sources: [sources.catBlinkExperiment, sources.catBlinkAdoption]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "do-hiding-places-reduce-stress-in-shelter-cats",
		title: "Do hiding places reduce stress in shelter cats?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Providing a place to hide can help newly housed shelter cats show fewer signs of stress and adjust sooner. This does not mean that hiding prevents every health problem associated with a shelter stay.",
		editorSummary: "Hiding offers a way to manage an unfamiliar environment. Behavioral stress, weight loss and adoption are separate outcomes.",
		stableCore: [
			"A 19-cat randomized study found faster improvement in stress scores with a hiding box; differences narrowed as cats in both groups adapted.",
			"A separate 23-cat randomized trial also found faster reductions in behavioral stress, but hiding boxes did not prevent weight loss or clearly change adoption or length of stay.",
			"A 72-cat study found lower fecal stress-hormone measures and greater food intake with hiding boxes. Responses differed with the cats' starting behavior."
		],
		openQuestions: [
			"Which benefits persist during longer stays and after adoption.",
			"How shelter design, social contact and individual coping styles interact with hiding opportunities."
		],
		whatWouldChangeMinds: [
			"Larger multi-shelter trials using both behavioral and health outcomes.",
			"Replicated evidence showing which cats benefit most and whether reduced stress predicts lasting health improvements."
		],
		misconceptions: [
			"Hiding is not automatically evidence that an enrichment has failed or that a cat should be made to interact."
		],
		population: "Cats entering shelter housing, including small randomized trials and a larger shelter-enrichment study.",
		scope: "Access to hiding opportunities during shelter adaptation, with behavioral stress distinguished from physiological measures, weight and adoption outcomes.",
		excludedEvidence: [
			"A lower stress score does not establish prevention of illness, weight loss or delayed adoption, and shelter adaptation findings do not diagnose the cause of hiding in a pet at home."
		],
		uncertainty: "Studies are relatively small and housing differs. Persistent loss of appetite or other illness signs require assessment even when a hiding place is available.",
		sources: [
			sources.catHiding2014,
			sources.catHidingTrial,
			sources.catHideShelf,
			sources.catEnrichmentReview
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-living-with-other-cats-increase-a-cats-stress",
		title: "Does living with other cats increase a cat's stress?",
		band: "mixed",
		certainty: "low",
		bottomLine: "It can, but the number of cats alone is a poor guide. Studies report both benefits and problems, with compatibility, space and access to resources likely to matter.",
		editorSummary: "Living with another cat can mean a familiar companion or an unwanted competitor. Household size does not describe the quality of the relationship.",
		stableCore: [
			"A systematic review published online in 2021 found inconsistent relationships between cat-group size and wellbeing. Only four of its 15 included papers primarily investigated group size.",
			"A review of confined housing also found conflicting results across six studies, with important differences in familiarity, housing and methods.",
			"Stress measures, owner reports and social behavior do not always move together. Group size can be entangled with space, resources and the way cats were introduced."
		],
		openQuestions: [
			"Which measures best distinguish compatible social living from persistent avoidance or competition.",
			"How relationships change over time and how much resource access explains apparent group-size effects."
		],
		whatWouldChangeMinds: [
			"Longitudinal home studies measuring relationships and resource access before and after changes in household composition.",
			"Consistent results using several welfare measures and clearly separating homes from shelter or laboratory housing."
		],
		misconceptions: [
			"Neither 'cats need another cat' nor 'cats should always live alone' follows from the available evidence."
		],
		population: "Domestic cats living singly or in groups in homes and confined settings, with heterogeneous observational evidence.",
		scope: "Group size and cat wellbeing, distinguishing household relationships from unfamiliar group housing and individual social preferences.",
		excludedEvidence: [
			"Shelter and laboratory groups are not interchangeable with established households; owner reports and single hormone measures do not establish a universal ideal number of cats."
		],
		uncertainty: "Confounding is substantial and studies use different welfare measures. The evidence cannot give a reliable stress prediction from household cat count alone.",
		sources: [sources.catGroupReview, sources.catCageGroupReview]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "how-does-outdoor-access-affect-cat-welfare",
		title: "How does outdoor access affect cat welfare?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Outdoor access offers opportunities to explore and climb, but unrestricted roaming adds injury, disease and disappearance risks. Controlled outdoor access may offer a useful balance, though direct comparative welfare evidence is limited.",
		editorSummary: "A stimulating indoor home, a secure enclosure and free roaming are different environments. 'Indoors or outdoors' alone leaves out much of what determines wellbeing.",
		stableCore: [
			"A review describes both behavioral opportunities outdoors and hazards including traffic, parasites, injury and becoming separated from the owner.",
			"A survey of 446 customers who installed a commercial containment system reported improved owner-rated welfare and reduced concern. Its retrospective design and selected customer sample limit causal conclusions.",
			"A California survey of 631 owners distinguished indoor-only, controlled and free-roaming access. Associations with home behavior and hunting identify questions for further study, rather than demonstrating that one housing choice caused those outcomes."
		],
		openQuestions: [
			"How indoor enrichment and controlled outdoor access compare over time using objective welfare and health measures.",
			"How local traffic, wildlife, disease and individual history change the balance of benefits and risks."
		],
		whatWouldChangeMinds: [
			"Prospective comparisons with starting welfare measured before housing changes and suitable control groups.",
			"Replicated evidence integrating injury, health, behavior and positive welfare rather than owner satisfaction alone."
		],
		misconceptions: [
			"An outdoor opportunity can be enriching without making unsupervised roaming the best option for every cat."
		],
		population: "Companion cats, including selected UK containment-system customers and a convenience sample of owners near Davis, California.",
		scope: "Cat welfare under indoor, controlled-outdoor and free-roaming conditions; wildlife effects and local rules are additional considerations rather than interchangeable welfare outcomes.",
		excludedEvidence: [
			"Retrospective satisfaction surveys do not establish containment efficacy; the California convenience sample does not estimate global ownership practices or prove that outdoor access caused reported behavior."
		],
		uncertainty: "Direct comparisons are weak and conditions vary greatly. No single welfare ranking applies to every cat, home or locality.",
		sources: [sources.catOutdoorReview, sources.catOutdoorControlled, sources.catOutdoor2024]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "can-declawing-have-lasting-welfare-effects-in-cats",
		title: "Can declawing have lasting welfare effects in cats?",
		band: "broad",
		certainty: "low",
		bottomLine: "Yes, lasting pain and behavioral problems are a concern. Studies link declawing with several adverse outcomes, although the long-term evidence is largely observational and does not predict the outcome for every cat.",
		editorSummary: "Later pain, altered movement and behavioral changes are distinct welfare concerns. Exact causal risks remain uncertain because long-term studies have important limitations.",
		stableCore: [
			"A retrospective comparison of 137 declawed and 137 control cats found associations with back pain and several unwanted behaviors. Pre-existing differences and selection limit causal interpretation.",
			"A 2025 secondary analysis of cats in osteoarthritis studies found worse measures of sensitivity and function in declawed cats with osteoarthritis than in comparison cats with osteoarthritis.",
			"A systematic review of feline pain assessment highlights limits in measuring chronic pain. A cat's quiet behavior alone does not establish the absence of pain."
		],
		openQuestions: [
			"How much of each long-term association reflects declawing rather than prior behavior, other disease or differences in care.",
			"Which chronic pain and function measures best identify clinically important effects."
		],
		whatWouldChangeMinds: [
			"Prospective observational follow-up with recorded pre-existing behavior, health and validated pain measures.",
			"Independent replication of functional findings in representative cats, including those without diagnosed osteoarthritis."
		],
		misconceptions: [
			"An odds ratio from a retrospective study is not an individual cat's probability of developing a problem."
		],
		population: "Domestic cats in retrospective comparisons and secondary analyses of osteoarthritis studies.",
		scope: "Long-term associations between declawing, pain, function and behavior; the osteoarthritis subgroup is distinguished from all cats.",
		excludedEvidence: [
			"The osteoarthritis analysis is not eight independent declawing trials, and associations do not establish that every declawed cat has chronic pain or provide an individual diagnosis."
		],
		uncertainty: "Selection, confounding and imperfect pain measurement limit risk estimates. Suspected pain or behavior change warrants veterinary assessment.",
		sources: [sources.declawBehavior, sources.declaw2025, sources.catPainAssessment]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-social-housing-improve-dairy-calf-welfare",
		title: "Does social housing improve dairy-calf welfare?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, pair or small-group housing generally gives calves more opportunities for social behavior and play than individual housing. Growth may also improve, while evidence on disease outcomes is less certain.",
		editorSummary: "Social development, growth and disease risk need separate assessment. Group housing works within a wider system of feeding, space, hygiene and health monitoring.",
		stableCore: [
			"A meta-analysis of 51 articles containing 85 studies found more active behavior, including feeding and play, and higher average feed intake and weight gain in socially housed calves.",
			"That meta-analysis lacked comparable disease-occurrence data. A newer scoping review found no consistent increase in reported respiratory disease with pair housing, but several studies lacked validated diagnostic methods.",
			"A randomized 66-calf comparison found no clear health or growth difference, while movement during a novel-arena test suggested activity deprivation in individually housed calves."
		],
		openQuestions: [
			"How disease risks vary with group stability, housing, feeding and local infection pressure.",
			"Which early benefits persist after weaning and how abnormal oral behaviors affect the overall welfare balance."
		],
		whatWouldChangeMinds: [
			"Larger multi-farm comparisons using validated disease definitions and long-term behavioral outcomes.",
			"Consistent evidence separating the effects of social contact from space, feeding and other management differences."
		],
		misconceptions: [
			"A study finding no clear increase in disease does not establish that every group-housing system is equally safe."
		],
		population: "Predominantly young dairy calves in pair or small-group versus individual housing before weaning.",
		scope: "Social-housing effects on behavior, growth and measured health, with pair housing distinguished from large or changing groups.",
		excludedEvidence: [
			"Blood measures are not disease-incidence data; a result from a small stable pair does not establish outcomes in a large changing group, and overlapping syntheses are not independent animal populations."
		],
		uncertainty: "Health reporting and management vary substantially. Welfare improvements depend on suitable housing and care rather than social contact alone.",
		sources: [sources.calfMeta, sources.calfScoping, sources.calfTrial]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "how-does-prolonged-cow-calf-contact-affect-welfare",
		title: "How does prolonged cow-calf contact affect welfare?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Longer contact can support maternal care, calf social development and early growth. Later separation can produce stronger short-term distress, and no single contact system has shown the best results across all welfare outcomes.",
		editorSummary: "Immediate distress, longer-term behavior, health and milk available for sale are different outcomes. Their balance depends on the whole rearing and separation system.",
		stableCore: [
			"A systematic review found benefits for calf social behavior and early growth with prolonged contact, alongside greater acute distress when separation eventually occurred.",
			"A separate health review found no consistent overall health evidence favoring early separation. Results differed by disease and study quality.",
			"A 2026 review of 60 studies found no uniformly superior contact arrangement. A corrected Austrian comparison associated contact rearing with better overall calf welfare scores; the overall heifer difference was not statistically established. Contact farms also differed in space, pasture and other management."
		],
		openQuestions: [
			"Which outcomes persist into adult life and how gradual transitions affect separation distress.",
			"How dam, foster-cow, full-time and part-time systems compare under otherwise similar conditions."
		],
		whatWouldChangeMinds: [
			"Longitudinal comparisons with standardized health, behavior and positive-welfare measures.",
			"Replicated evidence separating contact effects from feeding, space, pasture and other management practices."
		],
		misconceptions: [
			"Less immediate separation distress does not establish better lifetime welfare, and less saleable milk does not mean the cow produced that much less milk."
		],
		population: "Dairy cows and calves in heterogeneous contact and separation systems, including commercial European farms and international reviews.",
		scope: "Cow-calf contact and welfare across time, distinguishing separation distress, development, health and milk partitioning.",
		excludedEvidence: [
			"Farm-level associations do not isolate maternal contact, milk consumed by a calf is not lost biological production, and the Austrian study's corrected tables replace its original numerical estimates."
		],
		uncertainty: "Systems and outcome definitions differ, many comparisons are small or observational, and several welfare dimensions can move in opposite directions.",
		sources: [
			sources.cowContact2026,
			sources.cowContactReview,
			sources.cowHealthReview,
			sources.cowField2025
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-cage-free-housing-improve-laying-hen-welfare",
		title: "Does cage-free housing improve laying-hen welfare?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It improves opportunities to move, forage and perform other important behaviors. Overall welfare also depends on injuries, disease, pecking and management; the cage-free label alone does not guarantee good conditions.",
		editorSummary: "Freedom of movement is a substantial benefit, while injuries and mortality remain important. Housing must be assessed on several welfare measures together.",
		stableCore: [
			"EFSA's 2023 scientific opinion recommends non-cage housing with suitable platforms, litter and other provisions, based on a range of behavioral and physical welfare concerns.",
			"A commercial-farm meta-analysis covering 6,040 flocks in 16 countries found mortality declined as experience with newer systems grew. More recent data did not show an inherent mortality disadvantage for cage-free systems.",
			"A 2025 systematic review highlights keel-bone injuries in aviaries. Greater movement opportunities do not remove the need to prevent collisions and other physical harm."
		],
		openQuestions: [
			"Which housing designs and management changes best reduce injuries while preserving behavioral opportunities.",
			"How outcomes vary with bird strain, rearing history, flock size and producer experience."
		],
		whatWouldChangeMinds: [
			"Comparable commercial data covering behavior, injuries, health and mortality across complete laying cycles.",
			"Evidence that specific design improvements deliver lasting gains across different farms."
		],
		misconceptions: [
			"Cage-free and outdoor access are different claims, and mortality alone does not measure a hen's quality of life."
		],
		population: "Commercial laying hens, particularly European housing systems and an international mortality dataset.",
		scope: "Cage versus non-cage housing and multiple dimensions of laying-hen welfare; outdoor access and egg nutrition are separate questions.",
		excludedEvidence: [
			"Older mortality estimates do not automatically describe mature current systems; movement, mortality and fracture outcomes cannot be treated as interchangeable or collapsed into a label-only welfare ranking."
		],
		uncertainty: "Housing categories contain diverse designs and management. Welfare trade-offs remain even when the direction of behavioral benefits is clear.",
		sources: [sources.henOpinion, sources.henMortality, sources.henSkeleton]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "do-laying-hens-need-more-than-open-floor-space",
		title: "Do laying hens need more than open floor space?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Suitable litter, perches and raised resting areas allow important behaviors that empty space alone cannot provide. Their design and accessibility matter as well as their presence.",
		editorSummary: "Foraging, dust bathing and resting above the ground call for different resources. 'Cage-free' does not describe whether those needs are met.",
		stableCore: [
			"EFSA identifies restricted exploration, comfort behavior and rest as important welfare problems, and recommends accessible elevated platforms and dry, workable litter.",
			"A study restricting litter access found rebounds in dust bathing and wing flapping once access resumed. The treatment was assigned by room, limiting separation of treatment from room effects.",
			"A controlled chick study found different preferences for litter materials and differences in perch use and successful landings. A review also emphasizes that resources must be appropriate to development and farm conditions."
		],
		openQuestions: [
			"How resource quality, availability and crowding interact across a hen's lifetime.",
			"Which early-life provisions produce lasting benefits without increasing injury risk."
		],
		whatWouldChangeMinds: [
			"Replicated, independently assigned housing comparisons with behavior and injury outcomes.",
			"Longitudinal evidence connecting resource use and motivation with durable welfare benefits."
		],
		misconceptions: [
			"Putting an object in an enclosure does not establish that birds can use it safely or that it meets their behavioral needs."
		],
		population: "Layer chicks, pullets and laying hens in controlled housing studies and a European scientific welfare assessment.",
		scope: "Functional resources for species-typical behavior, distinct from the broader cage-versus-non-cage comparison or a universal material specification.",
		excludedEvidence: [
			"A two-room comparison is not 1,152 independent treatment assignments, chick preferences are not universal adult-hen requirements, and provision without accessible use is not evidence of benefit."
		],
		uncertainty: "Resource needs change with age and setting, and one behavioral measure cannot establish overall welfare. Some experimental comparisons have limited independent replication.",
		sources: [
			sources.henOpinion,
			sources.henLitter,
			sources.henPerch,
			sources.henChicksReview
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "can-enrichment-reduce-tail-biting-in-pigs",
		title: "Can enrichment reduce tail biting in pigs?",
		band: "broad",
		certainty: "low",
		bottomLine: "Yes, suitable enrichment can reduce tail biting, but it rarely resolves every cause. Some commonly used objects have little supporting evidence, and material that attracts attention does not necessarily prevent injury.",
		editorSummary: "Tail biting is influenced by several aspects of housing and care. Access to usable, engaging materials is one part of a broader welfare approach.",
		stableCore: [
			"A review found reductions in tail damage with some non-straw enrichments, but often only one study supported a material. Common processed wood, plastic or metal objects did not consistently reduce biting unless renewed.",
			"A focused appraisal of three straw-enrichment studies found two favorable results and one without clear benefit. The authors emphasized other husbandry factors.",
			"A scoping review describes inconsistent risk-factor and intervention findings. A later single-herd study changed feed, lighting and material access together, so its improvement cannot be assigned to enrichment alone."
		],
		openQuestions: [
			"Which material properties produce lasting injury reductions rather than brief interest.",
			"How enrichment interacts with feeding, health, stocking and environmental conditions across farms."
		],
		whatWouldChangeMinds: [
			"Replicated multi-farm comparisons with clear injury definitions and independently assigned treatments.",
			"Evidence separating the effects of materials from simultaneous feeding and housing changes."
		],
		misconceptions: [
			"An item that pigs investigate frequently has not necessarily been shown to reduce tail injuries."
		],
		population: "Commercially housed pigs in varied enrichment studies, focused evidence appraisals and a multi-component single-herd intervention.",
		scope: "Enrichment and tail-biting outcomes, distinguishing interest in materials, injury reduction and interacting husbandry risks.",
		excludedEvidence: [
			"A bundle of feed, light and material changes cannot identify the effect of each component; results do not establish a universally effective toy or provide a treatment plan for an active injury outbreak."
		],
		uncertainty: "Many comparisons are small or context-specific, terminology varies, and active tail biting requires prompt professional welfare assessment beyond enrichment alone.",
		sources: [
			sources.pigEnrichmentReview,
			sources.pigStrawAssessment,
			sources.pigRiskReview,
			sources.pigMaterialTrial
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-social-contact-improve-horse-welfare",
		title: "Does social contact improve horse welfare?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, opportunities for suitable social contact support horse welfare. That does not mean that every group-housing arrangement is better than every individual stable: compatibility, space and safe management still matter.",
		editorSummary: "Companionship is a species-specific need. The practical question is how housing meets it alongside rest, feeding, movement and injury prevention.",
		stableCore: [
			"A 2024 systematic review identifies companionship, space and forage as important needs, with social and other behavioral measures informing welfare assessment.",
			"A 16-horse housing comparison found higher stress-hormone measures and more difficult handling in the condition without physical social contact than in the other conditions.",
			"A 2025 study of young sport-horse stallions found more grooming and play with group housing, but also more superficial injuries and some stronger stress responses. Under those particular conditions, it found no major overall advantage for either housing system."
		],
		openQuestions: [
			"How relationships, choice and group stability affect benefits and risks over long periods.",
			"Which forms of contact best serve horses with different histories, ages and management needs."
		],
		whatWouldChangeMinds: [
			"Longitudinal multi-site comparisons integrating social behavior, rest, injuries and health.",
			"Replicated evidence separating social access from differences in space, exercise and feeding."
		],
		misconceptions: [
			"A higher level of activity or social interaction does not by itself demonstrate lower stress or better overall welfare."
		],
		population: "Domestic horses, including a small housing crossover comparison and young Warmblood stallions in pretraining.",
		scope: "Social contact as a component of equine welfare, distinguishing the need for companionship from comparisons of particular housing systems.",
		excludedEvidence: [
			"Results from young stallions do not establish the best arrangement for all horses; short-term hormone changes, play and injury counts represent different welfare dimensions."
		],
		uncertainty: "Housing studies are often small and combine several management differences. Compatible contact and safe accommodation require assessment of the individual horses.",
		sources: [sources.horseReview, sources.horseHousing, sources.horseGroupTrial]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "what-does-research-say-about-pain-in-fish",
		title: "What does research say about pain in fish?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Research supports taking the possibility of pain in fish seriously and protecting their welfare. Many findings fit a pain experience, but separating conscious pain from automatic responses remains a scientific challenge.",
		editorSummary: "Detecting damage is called nociception. Pain also involves an unpleasant experience, which researchers must infer from several kinds of evidence.",
		stableCore: [
			"Reviews describe sensory systems and changes in attention, normal activity and behavior after potentially painful events. These findings extend beyond a simple withdrawal response, although their interpretation is debated.",
			"Methodological critiques argue that several commonly used responses can occur without conscious experience. A 2022 analysis supports stronger tests while also supporting precautionary welfare protection.",
			"The 2024 New York Declaration identifies at least a realistic possibility of conscious experience in fishes. Its individual signatories' statement is not a measured percentage of researchers, and consciousness is broader than pain."
		],
		openQuestions: [
			"Which combinations of behavior and nervous-system evidence best distinguish painful experience from nonconscious processing.",
			"How far evidence from studied species generalizes across the diversity of fishes."
		],
		whatWouldChangeMinds: [
			"Converging, independently replicated findings using tests with stronger links to subjective experience.",
			"Evidence that competing explanations can account for the full pattern of flexible behavior and state-dependent changes."
		],
		misconceptions: [
			"A reflex alone does not demonstrate pain, and uncertainty about subjective experience does not establish that fish cannot suffer."
		],
		population: "Studied fish species, mainly bony fishes, in research on nociception, behavior and sentience.",
		scope: "Evidence and uncertainty about fish pain, with nociception, conscious experience and precautionary welfare decisions kept distinct.",
		excludedEvidence: [
			"Counts of papers mentioning stress or fear do not count independent pain experiments or expert votes; findings from a few species do not establish identical experience in every fish."
		],
		uncertainty: "There is no direct subjective report or universally decisive animal test. The strength and type of evidence differ between species and criteria.",
		sources: [
			sources.fishNociception,
			sources.fishInference,
			sources.fishDissent,
			sources.animalConsciousnessDeclaration
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "is-there-evidence-that-octopuses-are-sentient",
		title: "Is there evidence that octopuses are sentient?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Several lines of behavioral and nervous-system evidence support the capacity for experiences such as pain in octopuses. The evidence does not reveal exactly what their experience feels like.",
		editorSummary: "Sentience means the capacity for felt experience. It is different from performing an impressive task or having a human-like mind.",
		stableCore: [
			"A 2026 review found strong evidence for octopus sentience across a framework combining neural and behavioral criteria, with high or very high confidence in six of eight criteria.",
			"A 2021 experiment found context avoidance and preference patterns consistent with the unpleasant experience of pain and the value of relief. Such patterns are more informative than a withdrawal reflex alone.",
			"The updated review distinguishes octopuses from less-studied cephalopods. Its criterion ratings are not probabilities that an animal is conscious, and shared evidence across reviews is not an independent replication."
		],
		openQuestions: [
			"Which aspects of subjective experience are shared across octopus species and developmental stages.",
			"How different criteria depend on common evidence and how best to test competing explanations."
		],
		whatWouldChangeMinds: [
			"Independent studies providing convergent behavioral and neural evidence across more species.",
			"A stronger account that explains the full evidence pattern without felt experience, or new validated markers that narrow the uncertainty."
		],
		misconceptions: [
			"Evidence of sentience does not imply human-like thoughts or establish that every cephalopod has been studied equally well."
		],
		population: "Studied octopus species, assessed through primary behavioral evidence and a broader cephalopod review.",
		scope: "Evidence for octopus sentience and affective pain, distinguished from intelligence, human-like cognition and claims about all cephalopods.",
		excludedEvidence: [
			"Six satisfied criteria out of eight is not a 75% probability of consciousness, and unstudied taxa cannot be classified as nonsentient from missing evidence."
		],
		uncertainty: "Subjective experience is inferred, the framework involves judgment, and evidence coverage varies. The New York Declaration expresses realistic possibility rather than a universal numerical consensus estimate.",
		sources: [sources.octopusUpdate, sources.octopusStudy, sources.animalConsciousnessDeclaration]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "what-evidence-supports-pain-in-crabs-and-lobsters",
		title: "What evidence supports pain in crabs and lobsters?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Several findings are consistent with pain, and support precautionary welfare protection. Researchers disagree about how strongly the available tests establish a felt experience rather than nonconscious responses.",
		editorSummary: "The evidence is stronger for some decapod groups than others. A positive welfare case can coexist with uncertainty about exactly what an animal experiences.",
		stableCore: [
			"A framework review rated evidence across neural and behavioral criteria, finding stronger support for true crabs than for some other decapod groups and substantial evidence for certain lobsters and crayfish.",
			"A published critique argues that many criteria lack a necessary connection to unpleasant experience and calls for stronger evidence of voluntary avoidance and relief-related preference.",
			"A 2025 review describes an accumulating body of findings consistent with pain, while recognizing that no single observation proves subjective experience. The New York Declaration includes decapods among animals with at least a realistic possibility of consciousness."
		],
		openQuestions: [
			"Which tests can distinguish felt pain from flexible but nonconscious processing.",
			"How evidence differs across crabs, lobsters, crayfish and more lightly studied shrimp groups."
		],
		whatWouldChangeMinds: [
			"Independent, converging tests with clearly stated alternative explanations and stronger links to affective experience.",
			"Better evidence for under-studied groups rather than extrapolation from a small number of species."
		],
		misconceptions: [
			"Evidence for one decapod group is not an identical evidence rating for every crustacean."
		],
		population: "Decapod crustaceans, especially true crabs and astacid lobsters or crayfish, with uneven coverage across other groups.",
		scope: "The scientific inference of pain or sentience in decapods, separate from particular legal definitions or methods of handling animals.",
		excludedEvidence: [
			"Legal recognition and declaration signatures are not experimental proof or a survey of all experts, and framework criteria are not independent votes."
		],
		uncertainty: "The disagreement concerns inference as well as missing data. Different groups have very different research coverage, and lack of evidence is not evidence of absent experience.",
		sources: [
			sources.decapodFramework,
			sources.decapodCritique,
			sources.decapodRecent,
			sources.animalConsciousnessDeclaration
		]
	}, novemberAnimalWelfareResearchCheckedAt),
	reviewedEntry({
		topicSlug: "animal-behavior-and-welfare",
		slug: "does-enrichment-reduce-repetitive-behavior-in-zoo-mammals",
		title: "Does enrichment reduce repetitive behavior in zoo mammals?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, environmental enrichment often reduces repetitive behaviors such as pacing in zoo mammals. A reduction is useful evidence, but it does not by itself establish good overall welfare.",
		editorSummary: "Enrichment can change opportunities, choices and activity. Welfare assessment also needs positive behavior, health and the animal's wider living conditions.",
		stableCore: [
			"A meta-analysis of 54 studies found an overall reduction in stereotypic behavior during enrichment. Its 63 effect-size estimates are not 63 independent animal populations.",
			"A 2025 scoping review of 39 zoo-felid papers reported generally favorable effects on activity, foraging and repetitive behavior, while finding heavy emphasis on a few large-cat species.",
			"A methodological review explains why repetitive behavior can persist after conditions improve or decline without resolving the underlying welfare problem. Additional measures are needed."
		],
		openQuestions: [
			"Which benefits last after novelty fades and which species are poorly represented.",
			"How to measure positive welfare and choice alongside reductions in abnormal behavior."
		],
		whatWouldChangeMinds: [
			"Longer, replicated studies integrating behavior, health and appropriate physiological measures.",
			"Evidence showing whether observed changes reflect improved opportunities and experience rather than suppression or simple displacement of behavior."
		],
		misconceptions: [
			"Absence of pacing is not proof of good welfare, and persistent pacing does not fully describe an animal's present experience."
		],
		population: "Zoo-housed mammals, with the more recent evidence focused on felids and particularly large cats.",
		scope: "Enrichment and stereotypic repetitive behavior, distinguished from complete welfare assessment and claims about every captive species.",
		excludedEvidence: [
			"Effect sizes and individual animals are different denominators; findings from large cats do not establish effects for all zoo species, and behavior reduction alone cannot certify overall welfare."
		],
		uncertainty: "Studies differ in design, enrichment and duration. Small samples, selective reporting and limited species coverage constrain generalization.",
		sources: [sources.zooMeta, sources.zooModern, sources.zooAssessment]
	}, novemberAnimalWelfareResearchCheckedAt)
];
