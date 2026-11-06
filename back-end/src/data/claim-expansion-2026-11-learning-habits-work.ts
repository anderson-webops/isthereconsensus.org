import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberLearningHabitsWorkResearchCheckedAt = "2026-11-06T20:04:40.873Z";

const sources = {
	feedback: researchSource("The Power of Feedback Revisited: A Meta-Analysis of Educational Feedback Research", "Frontiers in Psychology", 2020, "https://doi.org/10.3389/fpsyg.2019.03087", "10.3389/fpsyg.2019.03087", "A synthesis of 435 studies finds an average learning benefit with substantial variation. Task information, praise and scores are different treatments.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	digitalFeedback: researchSource("A meta-analysis of the effects of context, content, and task factors of digitally delivered instructional feedback on learning performance", "Learning Environments Research", 2024, "https://doi.org/10.1007/s10984-024-09501-4", "10.1007/s10984-024-09501-4", "The review combines 116 digitally delivered feedback interventions. Average performance improves, with differences by feedback content, subject, assessment and learner control.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	printReading: researchSource("Reading from paper compared to screens: A systematic review and meta‐analysis", "Journal of Research in Reading", 2019, "https://doi.org/10.1111/1467-9817.12269", "10.1111/1467-9817.12269", "Thirty-three randomized experiments find a small average paper advantage, especially for informational text. The review finds no reliable overall reading-time difference.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	handheldReading: researchSource("Reading comprehension on handheld devices versus on paper: A narrative review and meta-analysis of the medium effect and its moderators.", "Journal of Educational Psychology", 2024, "https://doi.org/10.1037/edu0000830", "10.1037/edu0000830", "Between-person and within-person meta-analyses find small average comprehension advantages for print over handheld devices. The journal year is 2024 after online publication in 2023.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	listeningReview: researchSource("Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", "Review of Educational Research", 2022, "https://doi.org/10.3102/00346543211060871", "10.3102/00346543211060871", "Across 46 studies and 4,687 participants, the overall reading-listening difference is not statistically clear. Self-paced and inference comparisons sometimes favor reading. The journal year is 2022, following online publication in 2021.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	modalityTrial: researchSource("Does Modality Matter? The Effects of Reading, Listening, and Dual Modality on Comprehension", "Sage Open", 2016, "https://doi.org/10.1177/2158244016669550", "10.1177/2158244016669550", "A randomized experiment assigns 91 adults to audiobook, electronic text or both. It detects no differences in immediate comprehension or two-week retention of the tested non-fiction material; universal equivalence is not established.", "technical_reference", "context", novemberLearningHabitsWorkResearchCheckedAt),
	highlighting: researchSource("Effects of Learner-Generated Highlighting and Instructor-Provided Highlighting on Learning from Text: A Meta-Analysis", "Educational Psychology Review", 2022, "https://doi.org/10.1007/s10648-021-09654-1", "10.1007/s10648-021-09654-1", "Thirty-six articles provide 85 comparisons. Learner-generated highlighting benefits memory more consistently than comprehension, while provided highlighting benefits both. Learner age and the outcome tested matter.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	studyTechniques: researchSource("A Meta-Analysis of Ten Learning Techniques", "Frontiers in Education", 2021, "https://doi.org/10.3389/feduc.2021.581216", "10.3389/feduc.2021.581216", "This synthesis compares ten techniques across 242 studies. Underlining ranks below several alternatives; much of the evidence concerns factual outcomes rather than deeper learning.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	musicLearning: researchSource("The impact of background music on learners: A systematic review and meta-analysis", "Psychology of Music", 2023, "https://doi.org/10.1177/03057356231153070", "10.1177/03057356231153070", "Forty-seven experimental and quasi-experimental studies yield a small positive average learning effect in selected comparisons. Timing and music vary; the result is not a general recommendation for music during every task.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	musicCognition: researchSource("Background Music and Cognitive Task Performance: A Systematic Review of Task, Music, and Population Impact", "Music & Science", 2022, "https://doi.org/10.1177/20592043221134392", "10.1177/20592043221134392", "A systematic review of 95 articles and 154 experiments uses direction-of-effect synthesis. Memory and language findings often favor silence, especially for lyrical music, alongside many null results. Its methods differ from pooled learning-effect reviews.", "systematic_review", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	multitaskingExperimentReview: researchSource("Media Multitasking Effects on Cognitive vs. Attitudinal Outcomes: A Meta-Analysis", "Human Communication Research", 2016, "https://doi.org/10.1111/hcre.12089", "10.1111/hcre.12089", "A meta-analysis of 49 media-multitasking studies finds negative cognitive effects and different attitudinal effects. User control and task relevance matter; cognition and persuasion are distinct outcomes.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	multitaskingAchievement: researchSource("The Correlation Between Academic Media Multitasking and Achievement-a Meta-Analysis", "International Journal of Cognitive Research in Science, Engineering and Education (IJCRSEE)", 2025, "https://doi.org/10.23947/2334-8496-2025-13-1-63-73", "10.23947/2334-8496-2025-13-1-63-73", "Eleven correlational studies show a modest negative association with academic achievement and substantial heterogeneity. The evidence does not isolate the causal effect of habitual multitasking.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	phonePresence: researchSource("The effect of mere presence of smartphone on cognitive functions: A four-level meta-analysis.", "Technology, Mind, and Behavior", 2024, "https://doi.org/10.1037/tmb0000123", "10.1037/tmb0000123", "A four-level meta-analysis combines 33 studies with 4,368 participants and finds an overall cognitive effect close to zero. The primary article DOI replaces the supplemental DOI in the discovery record.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	brainDrainReview: researchSource("Does the Mere Presence of a Smartphone Impact Cognitive Performance? A Meta-Analysis of the “Brain Drain Effect”", "Media Psychology", 2024, "https://doi.org/10.1080/15213269.2023.2286647", "10.1080/15213269.2023.2286647", "A review of 56 comparisons finds a small working-memory disadvantage but mostly null results for other cognitive functions. Heterogeneity and low power limit conclusions. The journal year is 2024 after online publication in 2023.", "meta_analysis", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	videoReview: researchSource("Video Improves Learning in Higher Education: A Systematic Review", "Review of Educational Research", 2021, "https://doi.org/10.3102/0034654321990713", "10.3102/0034654321990713", "A review pools 105 randomized trials with 7,776 university students. Replacement and added-video comparisons favor video on average but involve different teaching and time comparisons; experimental and publication-bias concerns remain.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	videoCritique: researchSource("When Video Improves Learning in Higher Education", "Education Sciences", 2024, "https://doi.org/10.3390/educsci14030311", "10.3390/educsci14030311", "A critique and reanalysis finds positive effects but argues that outcomes chiefly concern lower-level cognitive processing. Those findings limit claims of a universal instructional benefit.", "technical_reference", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	captionVocabulary: researchSource("Incidental Vocabulary Acquisition Through Captioned Viewing: A Meta‐Analysis", "Language Learning", 2025, "https://doi.org/10.1111/lang.12697", "10.1111/lang.12697", "Forty-nine primary studies compare captioned and uncaptioned second-language viewing. Vocabulary gains favor captions on average; learner level, audience and testing matter. The journal year is 2025 after online publication in 2024.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	captionEarlier: researchSource("Captioned video for L2 listening and vocabulary learning: A meta-analysis", "System", 2013, "https://doi.org/10.1016/j.system.2013.07.013", "10.1016/j.system.2013.07.013", "An earlier meta-analysis reports benefits of same-language captioned video for second-language listening comprehension and vocabulary. Those outcomes do not establish identical effects for translated subtitles or overall fluency.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	playbackMeta: researchSource("Facilitating or hindering learning - a meta-analysis of acceleration on video learning", "Frontiers in Psychology", 2025, "https://doi.org/10.3389/fpsyg.2025.1427609", "10.3389/fpsyg.2025.1427609", "Twelve experimental and quasi-experimental papers find greater cognitive load and poorer retention and transfer under accelerated playback. Speeds, subjects and methods vary.", "meta_analysis", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	playbackExperiment: researchSource("Learning in double time: The effect of lecture video speed on immediate and delayed comprehension", "Applied Cognitive Psychology", 2022, "https://doi.org/10.1002/acp.3899", "10.1002/acp.3899", "Experiments with particular lectures find small costs up to twice normal speed and poorer performance beyond that. Starting speech rate and content limit generalization. Published online in 2021 and in the 2022 journal volume.", "technical_reference", "context", novemberLearningHabitsWorkResearchCheckedAt),
	projectReview: researchSource("Revisiting the effects of project-based learning on students’ academic achievement: A meta-analysis investigating moderators", "Educational Research Review", 2019, "https://doi.org/10.1016/j.edurev.2018.11.001", "10.1016/j.edurev.2018.11.001", "Thirty journal articles compare project-based and traditional instruction. Achievement improves on average; geography, subject and instructional time vary. Small group size is not a significant moderator in this review.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	projectRecent: researchSource("A study of the impact of project-based learning on student learning effects: a meta-analysis study", "Frontiers in Psychology", 2023, "https://doi.org/10.3389/fpsyg.2023.1202728", "10.3389/fpsyg.2023.1202728", "Sixty-six experimental or quasi-experimental papers yield positive average learning outcomes. Cross-study differences in geography, subject and group format do not isolate causal ingredients.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	cooperativeReview: researchSource("A meta-analysis of the effects of face-to-face cooperative learning. Do recent studies falsify or verify earlier findings?", "Educational Research Review", 2013, "https://doi.org/10.1016/j.edurev.2013.02.002", "10.1016/j.edurev.2013.02.002", "Face-to-face cooperative-learning comparisons find positive average achievement and attitude effects, with variation across learners and domains. Structured cooperative instruction is more specific than assigning group seats.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	cooperativeUmbrella: researchSource("A second-order meta-analysis on the effects of cooperative learning on students’ academic achievement, higher-order thinking, and affective behaviors", "Current Psychology", 2026, "https://doi.org/10.1007/s12144-025-08943-0", "10.1007/s12144-025-08943-0", "The 2026 second-order synthesis combines 15 earlier meta-analyses and finds positive average learning outcomes. Review counts can overlap in their primary studies and should not be added as independent experiments.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	teachingPreparation: researchSource("Learning by Preparing‐to‐Teach and Teaching: A Meta‐Analysis", "Japanese Psychological Research", 2019, "https://doi.org/10.1111/jpr.12221", "10.1111/jpr.12221", "A synthesis of 28 studies finds benefits from preparing to teach and from subsequent teaching compared with studying without that expectation. Interactive formats show larger average effects across comparisons. The journal year is 2019.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	teachingMaterials: researchSource("Do students learn what they teach when generating teaching materials for others? A meta-analysis through the lens of learning by teaching", "Educational Research Review", 2022, "https://doi.org/10.1016/j.edurev.2022.100475", "10.1016/j.edurev.2022.100475", "A meta-analysis examines creating teaching materials for other people. Benefits concern learning of the content taught; material formats and comparison activities vary.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	drawingReview: researchSource("Drawing-to-Learn: Does Meta-Analysis Show Differences Between Technology-Based Drawing and Paper-and-Pencil Drawing?", "Journal of Science Education and Technology", 2020, "https://doi.org/10.1007/s10956-019-09807-6", "10.1007/s10956-019-09807-6", "Fifty-three studies examine directed learner-generated visual representations. Average effects are larger for factual outcomes than for transfer. Comparisons include drawing versus non-drawing and different drawing formats; the journal year is 2020.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	drawingSupport: researchSource("Without Integration, Everything Is Nothing: A Meta-Analysis of the Effectiveness of Instructional Support for Drawing-to-Learn", "Educational Psychology Review", 2025, "https://doi.org/10.1007/s10648-025-10067-7", "10.1007/s10648-025-10067-7", "Fourteen studies compare supported and unsupported drawing. Extra support has no general average benefit; support for integrating verbal and visual information has a more promising comprehension pattern, within limited comparisons.", "meta_analysis", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	rewardDeci: researchSource("A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation.", "Psychological Bulletin", 1999, "https://doi.org/10.1037/0033-2909.125.6.627", "10.1037/0033-2909.125.6.627", "This 1999 meta-analysis of 128 studies finds reduced voluntary engagement under several expected tangible-reward conditions and benefits from positive feedback. The year corrects the later date in the discovery record.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	rewardCameron: researchSource("Pervasive negative effects of rewards on intrinsic motivation: The myth continues", "The Behavior Analyst", 2001, "https://doi.org/10.1007/bf03392017", "10.1007/bf03392017", "This competing 2001 synthesis argues that harmful effects are conditional. Initial interest, tangible versus verbal rewards, expectations and performance contingencies matter. A later archival online date is not the original publication year.", "meta_analysis", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	incentivePerformance: researchSource("Intrinsic motivation and extrinsic incentives jointly predict performance: A 40-year meta-analysis.", "Psychological Bulletin", 2014, "https://doi.org/10.1037/a0035661", "10.1037/a0035661", "A synthesis of 183 studies relates intrinsic motivation and incentives to performance quality and quantity. Performance prediction differs from whether a reward changes later voluntary interest.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	goalSetting: researchSource("Unique effects of setting goals on behavior change: Systematic review and meta-analysis.", "Journal of Consulting and Clinical Psychology", 2017, "https://doi.org/10.1037/ccp0000260", "10.1037/ccp0000260", "The review identifies 141 papers using randomized comparisons to isolate goal setting and finds a small positive average behavior-change effect. Goal features and contexts vary.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	sportGoals: researchSource("The performance and psychological effects of goal setting in sport: A systematic review and meta-analysis", "International Review of Sport and Exercise Psychology", 2024, "https://doi.org/10.1080/1750984x.2022.2116723", "10.1080/1750984x.2022.2116723", "Twenty-seven eligible sport studies inform performance and psychological comparisons. Goal types differ and several outcomes have sparse evidence. The journal year is 2024 after online publication in 2022.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	implementationClassic: researchSource("Implementation Intentions and Goal Achievement: A Meta‐analysis of Effects and Processes", "Advances in Experimental Social Psychology", 2006, "https://doi.org/10.1016/s0065-2601(06)38002-1", "10.1016/s0065-2601(06)38002-1", "This scholarly review synthesizes cue-response implementation intentions and their goal-pursuit effects. Specifying an action in a recognizable situation differs from merely intending an outcome.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	implementationRecent: researchSource("The when and how of planning: Meta-analysis of the scope and components of implementation intentions in 642 tests", "European Review of Social Psychology", 2025, "https://doi.org/10.1080/10463283.2024.2334563", "10.1080/10463283.2024.2334563", "Across 642 tests, cue-response plans benefit several outcome types on average. Format, motivation and rehearsal vary; tests are not papers and may overlap earlier syntheses. The journal year is 2025.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	progressMonitoring: researchSource("Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence.", "Psychological Bulletin", 2016, "https://doi.org/10.1037/bul0000025", "10.1037/bul0000025", "A meta-analysis of 138 randomized studies with 19,951 participants finds improved goal attainment from monitoring interventions. Recording or reporting progress accompanies larger effects across studies, without isolating every format causally.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	activityTrackers: researchSource("Effectiveness of wearable activity trackers to increase physical activity and improve health: a systematic review of systematic reviews and meta-analyses", "The Lancet Digital Health", 2022, "https://doi.org/10.1016/s2589-7500(22)00111-x", "10.1016/s2589-7500(22)00111-x", "A review of reviews evaluates wearable activity-tracker programs across populations. Programs can bundle goals, reminders and support, and reviews can overlap; benefits cannot be assigned to hardware alone.", "systematic_review", "context", novemberLearningHabitsWorkResearchCheckedAt),
	habitTiming: researchSource("Time to Form a Habit: A Systematic Review and Meta-Analysis of Health Behaviour Habit Formation and Its Determinants", "Healthcare", 2024, "https://doi.org/10.3390/healthcare12232488", "10.3390/healthcare12232488", "Twenty studies assess health-related habits, but only four provide direct formation-time estimates. Eleven have high risk of bias. Reported automaticity and varying timelines do not support a universal day count.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	habitTrial: researchSource("Habit formation following routine‐based versus time‐based cue planning: A randomized controlled trial", "British Journal of Health Psychology", 2021, "https://doi.org/10.1111/bjhp.12504", "10.1111/bjhp.12504", "A randomized trial follows 192 adults for 84 days using routine-based or time-based cues for a nutrition behavior. Automaticity rises in both groups. Its formation-time estimate concerns successful habit-formers, rather than every participant.", "technical_reference", "context", novemberLearningHabitsWorkResearchCheckedAt),
	microBreaks: researchSource("\"Give me a break!\" A systematic review and meta-analysis on the efficacy of micro-breaks for increasing well-being and performance", "PLOS ONE", 2022, "https://doi.org/10.1371/journal.pone.0272460", "10.1371/journal.pone.0272460", "Twenty-two independent samples show small benefits for vigor and fatigue. The pooled overall performance effect is not statistically clear; task demands and break lengths differ.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt),
	workBreaks: researchSource("Role of work breaks in well-being and performance: A systematic review and future research agenda.", "Journal of Occupational Health Psychology", 2022, "https://doi.org/10.1037/ocp0000337", "10.1037/ocp0000337", "A systematic review covers 83 observational and intervention studies of knowledge-worker breaks. Duration, frequency, activities, initiative and experience vary; one optimal schedule is not established.", "systematic_review", "context", novemberLearningHabitsWorkResearchCheckedAt),
	hybridTrial: researchSource("Hybrid working from home improves retention without damaging performance", "Nature", 2024, "https://doi.org/10.1038/s41586-024-07500-2", "10.1038/s41586-024-07500-2", "A six-month randomized trial of 1,612 Trip.com employees tests two home-working days weekly. Equivalence tests support preserved performance measures. A coauthor is the firm's cofounder and chairman with equity; the paper reports no company funding.", "technical_reference", "context", novemberLearningHabitsWorkResearchCheckedAt),
	hybridInnovation: researchSource("Employee innovation during office work, work from home and hybrid work", "Scientific Reports", 2024, "https://doi.org/10.1038/s41598-024-67122-6", "10.1038/s41598-024-67122-6", "An observational event study covers over 48,000 Indian IT employees. Idea quality suffers during home working; idea quantity falls in the later hybrid phase, particularly with poorly coordinated attendance. Non-random transitions limit causal attribution.", "technical_reference", "debate", novemberLearningHabitsWorkResearchCheckedAt),
	fourDayWeek: researchSource("Work time reduction via a 4-day workweek finds improvements in workers’ well-being", "Nature Human Behaviour", 2025, "https://doi.org/10.1038/s41562-025-02259-6", "10.1038/s41562-025-02259-6", "A six-month retained-pay intervention covers 2,896 employees across 141 organizations in six countries and 12 comparison companies. Self-reported well-being improves. Selection, non-random comparisons and prior work redesign limit causal attribution.", "technical_reference", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	reducedHoursReview: researchSource("How the reduction of working hours could influence health outcomes: a systematic review of published studies", "BMJ Open", 2022, "https://doi.org/10.1136/bmjopen-2021-051131", "10.1136/bmjopen-2021-051131", "Seven longitudinal intervention studies assess reduced hours with retained pay, mostly in healthcare. Stress and sleep findings are favorable while broader health outcomes remain less clear; some interventions also change physical-activity opportunities.", "systematic_review", "context", novemberLearningHabitsWorkResearchCheckedAt),
	reducedHoursMap: researchSource("Exploring the health and well-being benefits of reduced working hours with maintained salary: A scoping review and evidence map", "Scandinavian Journal of Work, Environment & Health", 2026, "https://doi.org/10.5271/sjweh.4266", "10.5271/sjweh.4266", "This 2026 scoping review maps scientific and grey-literature evidence on reduced hours with full pay. Limited settings, varied designs and sparse long-term evidence constrain conclusions; unpaid care and gendered effects also matter.", "systematic_review", "context", novemberLearningHabitsWorkResearchCheckedAt),
	gratitudeCulture: researchSource("A meta-analysis of the effectiveness of gratitude interventions on well-being across cultures", "Proceedings of the National Academy of Sciences", 2025, "https://doi.org/10.1073/pnas.2425193122", "10.1073/pnas.2425193122", "A preregistered meta-analysis combines 145 papers from 28 countries. Average well-being gains are small, with between-country variation that tested moderators do not clearly explain.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	expressedGratitude: researchSource("The Effect of Expressed Gratitude Interventions on Psychological Wellbeing: A Meta-Analysis of Randomised Controlled Studies", "International Journal of Applied Positive Psychology", 2023, "https://doi.org/10.1007/s41042-023-00086-6", "10.1007/s41042-023-00086-6", "Twenty-five randomized studies with 6,745 participants find small positive well-being effects relative to neutral activities. Outcomes include life satisfaction and positive affect, rather than clinical treatment efficacy.", "meta_analysis", "supports", novemberLearningHabitsWorkResearchCheckedAt),
	timeTraining: researchSource("Do time management interventions support wellbeing in the workplace? A systematic review", "Applied Psychology: Health and Well-Being", 2026, "https://doi.org/10.1111/aphw.70149", "10.1111/aphw.70149", "This 2026 review finds seven workplace intervention studies with 442 participants. Low-quality, inconsistent findings leave training efficacy uncertain despite broader time-management associations.", "systematic_review", "context", novemberLearningHabitsWorkResearchCheckedAt),
	timeManagement: researchSource("Does time management work? A meta-analysis", "PLOS ONE", 2021, "https://doi.org/10.1371/journal.pone.0245066", "10.1371/journal.pone.0245066", "A meta-analysis finds relationships between time management, performance and well-being. Much of the evidence concerns associations rather than causal effects of a workplace training course.", "meta_analysis", "context", novemberLearningHabitsWorkResearchCheckedAt)
};

export const novemberLearningHabitsWorkClaims = [
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-feedback-improve-learning",
		title: "Does feedback improve learning?",
		bottomLine: "Yes, on average, but the information matters. Feedback can help people understand errors and improve their next attempt. A mark, praise and an explanation are different treatments, and their effects on learning vary.",
		stableCore: [
			"A synthesis of 435 studies found a positive average effect of educational feedback, with substantial differences between studies. Feedback about the task and how to improve it should not be treated as interchangeable with every other comment or score.",
			"A newer review of 116 digitally delivered feedback interventions also found an average benefit. Its results varied with the feedback's focus, subject, assessment and learner control. These findings concern what learners subsequently achieve, rather than whether they like receiving feedback."
		],
		editorSummary: "Feedback's content and connection to the learning task shape its value.",
		excludedEvidence: ["Claims based only on satisfaction with feedback, without measured learning."],
		population: "Students receiving educational feedback across the ages, subjects and digital settings represented in the reviews.",
		scope: "Compare instructional feedback with alternative or absent feedback; separate achievement from motivation, satisfaction and behavior.",
		uncertainty: "Feedback formats and comparison teaching vary widely. Moderator findings across studies do not establish one best feedback format for every learner.",
		openQuestions: [
			"Which feedback helps learners correct mistakes independently on later tasks?",
			"How do feedback timing and learner knowledge interact?"
		],
		whatWouldChangeMinds: [
			"Replicated comparisons isolating feedback content, timing and study time, with delayed transfer outcomes."
		],
		misconceptions: [
			"Positive feelings about feedback do not necessarily mean more learning.",
			"More comments are not automatically more informative feedback."
		],
		sources: [sources.feedback, sources.digitalFeedback]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-reading-on-paper-improve-comprehension-compared-with-screens",
		title: "Does reading on paper improve comprehension compared with screens?",
		bottomLine: "Paper has a small average advantage in many comparisons, especially for informational text. The difference is not universal. The text, device, reading conditions and reader can change the result.",
		stableCore: [
			"A review of 33 randomized experiments found a small average paper advantage in reading performance. It was clearer for informational text than for stories, and the review did not find a reliable overall difference in reading time.",
			"A later synthesis focused on handheld devices and also found small effects favoring print. This narrows the claim: a measured comprehension difference does not establish that every digital text is worse, or that screens cannot offer useful accessibility and navigation features."
		],
		editorSummary: "Small average print advantages vary with the text and reading conditions.",
		excludedEvidence: ["Device preferences or reading time alone, without comprehension outcomes."],
		population: "Readers with basic reading skills using paper, computer screens and handheld devices in comparative studies.",
		scope: "Compare comprehension of comparable texts across reading media; distinguish comprehension, reading time and accessibility.",
		uncertainty: "Device design, scrolling, text type and testing procedures differ. Results from one device or age group may not transfer to another.",
		openQuestions: [
			"Which digital designs reduce the comprehension gap?",
			"How do longer texts and readers with different accessibility needs change comparisons?"
		],
		whatWouldChangeMinds: [
			"Large preregistered comparisons matching text, pacing and display conditions across current devices, with delayed comprehension tests."
		],
		misconceptions: [
			"A small pooled effect is not a fixed penalty for every person.",
			"A comprehension score does not capture every benefit or cost of a reading medium."
		],
		sources: [sources.printReading, sources.handheldReading]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "is-listening-as-effective-as-reading-for-understanding-text",
		title: "Is listening as effective as reading for understanding text?",
		bottomLine: "The overall evidence does not show a clear winner. Results depend on pacing and what understanding is tested. Self-paced reading can help in some comparisons, while a small average difference does not establish that the formats are interchangeable for everyone.",
		band: "mixed",
		stableCore: [
			"A meta-analysis of 46 studies found no reliable overall reading-versus-listening difference. Reading advantages were more apparent in some self-paced and inference-based comparisons. An average near zero does not prove that every learner or task produces the same outcome.",
			"A randomized study of 91 adults compared an audiobook, electronic text and both together. It did not detect differences in immediate comprehension or two-week retention of the tested material. That single experiment has a narrower scope than all books, languages or learning needs."
		],
		editorSummary: "Pacing, text difficulty and the kind of comprehension test matter.",
		excludedEvidence: ["Listening preferences and learning-style labels without comparable comprehension tests."],
		population: "Children and adults in reading/listening comparisons, with a separate adult non-fiction experiment.",
		scope: "Compare understanding of the same material through text and audio; separate overall comparisons from self-paced and inference tasks.",
		uncertainty: "Study designs, languages, age groups and assessment types vary. A non-significant difference alone does not demonstrate equivalence.",
		openQuestions: [
			"When do pacing controls make audio and text more comparable?",
			"How do unfamiliar vocabulary and complex arguments affect the comparison?"
		],
		whatWouldChangeMinds: [
			"Well-powered equivalence trials with matched pacing, accessible formats and both immediate and delayed comprehension measures."
		],
		misconceptions: [
			"A preference for audio does not establish a fixed auditory learning style.",
			"No detected average difference does not guarantee identical individual results."
		],
		sources: [sources.listeningReview, sources.modalityTrial]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-highlighting-text-help-learning",
		title: "Does highlighting text help learning?",
		bottomLine: "It can help memory, but better understanding is less consistent when learners choose what to highlight themselves. Reading a well-chosen highlighted passage and selecting the important points are different activities.",
		band: "mixed",
		stableCore: [
			"A meta-analysis of 36 articles separated learner-generated from instructor-provided highlighting. Learner-generated highlighting improved memory on average, while its comprehension benefit was less clear. Instructor-provided highlighting showed benefits for both outcomes in the included comparisons.",
			"A broader comparison of study techniques ranked underlining below some alternatives and noted that much of the evidence used factual tests. The right comparison matters: highlighting versus doing little is a different test from highlighting versus retrieval practice."
		],
		editorSummary: "Remembering marked details and understanding a text are separate outcomes.",
		excludedEvidence: ["Time spent marking a page without a memory or comprehension assessment."],
		population: "School and college learners studying academic texts in highlighting and study-technique experiments.",
		scope: "Distinguish learner-generated and provided highlighting, memory and comprehension, and the study method used for comparison.",
		uncertainty: "Studies vary in highlighting quality, learner age and the depth of their tests. Benefits on factual tests do not establish broader transfer.",
		openQuestions: [
			"Can instruction improve how learners select important material?",
			"When does highlighting support later explanation or retrieval rather than replace it?"
		],
		whatWouldChangeMinds: [
			"Replicated comparisons of trained highlighting and active study alternatives using delayed comprehension and transfer tests."
		],
		misconceptions: [
			"Marking more of a page does not necessarily identify its main ideas.",
			"Remembering highlighted words does not necessarily demonstrate understanding of the argument."
		],
		sources: [sources.highlighting, sources.studyTechniques]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-background-music-help-people-study",
		title: "Does background music help people study?",
		bottomLine: "There is no single benefit across tasks. Some learning comparisons favor music, while other studies find disruption or little difference. Lyrics can compete with reading or verbal memory, and enjoying music is a different outcome from learning more.",
		band: "mixed",
		certainty: "low",
		stableCore: [
			"A meta-analysis of 47 studies reported a small positive average effect in the learning comparisons it included, with variation in timing and music. That pooled result does not establish that playing music throughout every study session helps.",
			"A systematic review of 95 articles covering 154 experiments found more negative patterns for memory and language tasks, especially with lyrics, alongside many null results. It used direction-of-effect synthesis rather than the same pooled-effect method, so the two reviews cannot be read as identical tests."
		],
		editorSummary: "Music, task demands and the timing of listening change the comparison.",
		excludedEvidence: ["Music preferences, mood or reported concentration without a measured learning or cognitive task."],
		population: "Learners and other participants performing cognitive tasks in background-music experiments.",
		scope: "Assess measured learning and cognitive performance; distinguish music before an assessment from music during a demanding task.",
		uncertainty: "The reviews differ in inclusion rules, tasks and synthesis methods. Personal preferences and task difficulty can also affect results.",
		openQuestions: [
			"Which tasks are most affected by lyrics and changing sound?",
			"How much does music choice change measured performance rather than comfort?"
		],
		whatWouldChangeMinds: [
			"Preregistered comparisons separating lyrics, volume, preference and timing, with comparable learning outcomes."
		],
		misconceptions: [
			"Feeling more comfortable does not by itself establish better retention.",
			"A benefit in one music condition is not evidence for every playlist or task."
		],
		sources: [sources.musicLearning, sources.musicCognition]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-media-multitasking-reduce-learning",
		title: "Does media multitasking reduce learning?",
		bottomLine: "Splitting attention between learning and unrelated media can reduce immediate learning performance. Habitual multitasking is also linked with lower achievement, but those correlations alone do not establish how much multitasking causes the difference.",
		stableCore: [
			"A meta-analysis of 49 studies found negative effects on cognitive outcomes in media-multitasking comparisons. Effects differed with user control and how closely the activities related to each other; persuasion-related outcomes followed a different pattern.",
			"A 2025 synthesis of 11 correlational studies found a modest negative association with academic achievement and substantial variation between studies. Prior achievement, workload and other characteristics can influence that association, so it should be kept separate from experimental effects."
		],
		editorSummary: "Experimental distraction effects and long-term achievement correlations are different evidence.",
		excludedEvidence: ["Attitude or persuasion outcomes alone, without learning or cognitive outcomes."],
		population: "Students and other media users performing learning or cognitive tasks in experimental and correlational studies.",
		scope: "Compare learning while attention is divided with more focused conditions; distinguish unrelated media from coordinated instructional media.",
		uncertainty: "Many long-term studies rely on self-report and cannot isolate causation. Experimental tasks also differ from sustained learning in everyday settings.",
		openQuestions: [
			"Which interruptions have lasting effects on retention?",
			"How do learner control and the relevance of a second activity change the cost?"
		],
		whatWouldChangeMinds: [
			"Longitudinal randomized studies with objective media-use measures and delayed academic outcomes."
		],
		misconceptions: [
			"Using two coordinated learning resources is not the same as switching to unrelated messages.",
			"An achievement correlation does not establish that media use explains every difference between students."
		],
		sources: [sources.multitaskingExperimentReview, sources.multitaskingAchievement]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-a-nearby-unused-smartphone-impair-thinking",
		title: "Does a nearby unused smartphone impair thinking?",
		bottomLine: "A broad impairment has not been established. Reviews find little or inconsistent average effect from the phone's presence alone, although some working-memory comparisons show a small disadvantage. Using a phone or receiving interruptions is a separate question.",
		band: "mixed",
		certainty: "low",
		stableCore: [
			"A four-level meta-analysis combined 33 studies and found an overall effect close to zero across cognitive outcomes. Its question was the phone's mere presence, rather than active use, notifications or the effects of particular apps.",
			"Another review found a small pooled working-memory effect but mostly null effects for other cognitive functions, with methodological variation and low power. Together these findings give limited support to sweeping claims that any phone in sight drains mental capacity."
		],
		editorSummary: "Mere presence, active use and interruptions should be evaluated separately.",
		excludedEvidence: ["Active phone use, incoming notifications and claims about permanent cognitive change."],
		population: "Participants performing short cognitive tasks with a smartphone present or absent.",
		scope: "Assess unused smartphone presence and task performance; exclude claims about permanent brain changes and unrelated effects of active use.",
		uncertainty: "Manipulations, task measures and study power vary. Small domain-specific effects and a near-zero aggregate can coexist.",
		openQuestions: [
			"When does a phone's personal relevance change attention?",
			"Do any presence effects persist in realistic work settings over longer periods?"
		],
		whatWouldChangeMinds: [
			"Large preregistered studies that isolate presence from notifications and use reliable cognitive tasks and real-world outcomes."
		],
		misconceptions: [
			"The presence studies do not show permanent loss of intelligence.",
			"A near-zero presence effect does not establish that interruptions are harmless."
		],
		sources: [sources.phonePresence, sources.brainDrainReview]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-instructional-videos-improve-university-learning",
		title: "Do instructional videos improve university learning?",
		bottomLine: "They can improve measured learning in the settings studied. Benefits depend on how video is used and what it replaces. Evidence about factual knowledge and procedures does not establish the same benefit for every kind of higher-level learning.",
		stableCore: [
			"A systematic review of 105 randomized trials found small average gains when video replaced existing teaching and larger gains when it was added. Those are different comparisons: adding video can also add learning opportunities and time.",
			"A later critique and reanalysis argued that much of the evidence concerned lower-level cognitive tasks and provided too little support for broad generalizations. It also found positive effects, while challenging claims of a universal instructional advantage."
		],
		editorSummary: "The teaching comparison and depth of the learning outcome shape the finding.",
		excludedEvidence: ["Viewing satisfaction or completion rates without tested learning."],
		population: "Higher-education students in randomized video-teaching studies and a reanalysis of that evidence.",
		scope: "Compare added and replacement video instruction; distinguish factual or procedural test scores from deeper understanding and transfer.",
		uncertainty: "Designs, comparison teaching and outcome depth vary, and some studies have experimental or publication-bias concerns.",
		openQuestions: [
			"Which video uses improve complex reasoning and delayed transfer?",
			"How much of an added-video benefit reflects extra learning time or practice?"
		],
		whatWouldChangeMinds: [
			"Well-powered trials with matched learning time and rigorous tests of conceptual understanding and transfer."
		],
		misconceptions: [
			"A video benefit does not establish that every lecture should be replaced.",
			"A higher factual-test score is not the same as improved performance on every complex task."
		],
		sources: [sources.videoReview, sources.videoCritique]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-captions-help-people-learn-second-language-vocabulary",
		title: "Do captions help people learn second-language vocabulary?",
		bottomLine: "Yes, on average, in the comparisons studied. Seeing on-screen words alongside speech can support vocabulary learning. Benefits vary with the learner and material; the evidence does not establish that every caption format works equally well.",
		stableCore: [
			"A meta-analysis of 49 primary studies found a medium average vocabulary-learning benefit from captioned viewing compared with viewing without captions. The result varied with instructional level, intended audience and testing procedures.",
			"An earlier synthesis also found benefits for second-language listening and vocabulary. These studies principally examine text in the language being learned alongside speech, which is a different comparison from translated subtitles or learning entirely new material without support."
		],
		editorSummary: "Same-language captions can support word learning, with varied results across learners.",
		excludedEvidence: ["Translated subtitles or fluency claims without vocabulary outcomes for same-language captions."],
		population: "Second-language learners viewing videos with and without same-language captions.",
		scope: "Assess vocabulary outcomes from captioned viewing; distinguish them from overall language proficiency and translated-subtitle comparisons.",
		uncertainty: "Proficiency, video difficulty and vocabulary tests differ. Immediate word-test gains do not establish long-term fluency.",
		openQuestions: [
			"How much vocabulary is retained after longer delays?",
			"Which caption formats help learners at different proficiency levels?"
		],
		whatWouldChangeMinds: [
			"Comparable trials testing delayed word knowledge and everyday language use across proficiency levels and caption designs."
		],
		misconceptions: [
			"Recognizing a word on a test does not demonstrate fluency.",
			"Same-language captions and translated subtitles are different interventions."
		],
		sources: [sources.captionVocabulary, sources.captionEarlier]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-faster-video-playback-affect-learning",
		title: "Does faster video playback affect learning?",
		bottomLine: "It can. Some experiments found small costs at moderate increases in speed, while a broader synthesis found poorer learning under acceleration. The starting speech rate, material and amount of acceleration matter, so there is no universal safe speed.",
		band: "mixed",
		certainty: "low",
		stableCore: [
			"One experimental series found little difference for the tested lectures at modest speed increases, with poorer comprehension at faster settings. Its findings were bounded by those materials and do not establish a general rule for all learners.",
			"A 2025 meta-analysis of 12 experimental and quasi-experimental papers found higher cognitive load and lower retention and transfer scores under accelerated playback. Differences in speed, videos and methods help explain why a single experiment should not settle the whole question."
		],
		editorSummary: "Time saved and learning retained are separate outcomes.",
		excludedEvidence: ["Time savings or playback preferences without retention or transfer tests."],
		population: "Learners viewing accelerated instructional videos in experimental and quasi-experimental studies.",
		scope: "Compare playback speeds and measured retention or transfer; distinguish saved time from how that time is subsequently used.",
		uncertainty: "The evidence base is relatively small and heterogeneous. Original speech rate, task difficulty and testing delays vary.",
		openQuestions: [
			"Which content and learner characteristics determine the cost of acceleration?",
			"Does using saved time for practice change delayed learning?"
		],
		whatWouldChangeMinds: [
			"Preregistered studies matching total study time and testing several starting speech rates, content types and delayed outcomes."
		],
		misconceptions: [
			"Tolerating faster speech does not prove unchanged learning.",
			"An efficient result for one lecture does not establish a universal playback-speed recommendation."
		],
		sources: [sources.playbackMeta, sources.playbackExperiment]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-project-based-learning-improve-student-achievement",
		title: "Does project-based learning improve student achievement?",
		bottomLine: "It often improves achievement in the studies reviewed, but the benefit depends on the project and comparison teaching. Producing a project is not by itself evidence that students learned the intended content.",
		stableCore: [
			"Meta-analyses comparing project-based and more traditional instruction report positive average achievement effects. A 2023 synthesis included 66 experimental or quasi-experimental papers and found variation across subjects, countries and designs.",
			"Projects can combine investigation, practice and the production of a result. Those components and the support supplied differ across studies. Larger effects in one region or group format do not isolate that feature as the cause of better learning."
		],
		editorSummary: "Project design, support and assessment determine what the comparison means.",
		excludedEvidence: ["Project appearance or satisfaction without an academic outcome."],
		population: "School and postsecondary students in project-based-learning comparisons across subjects and countries.",
		scope: "Assess academic achievement from structured project-based instruction; distinguish the finished product from individual understanding.",
		uncertainty: "Study quality, teacher support, comparison instruction and geography differ, and many studies are quasi-experimental.",
		openQuestions: [
			"Which project components improve durable individual understanding?",
			"How well do benefits transfer across curricula and settings?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized classroom comparisons with matched time, clear implementation measures and individual delayed assessments."
		],
		misconceptions: [
			"A visually impressive project does not establish that every participant mastered the content.",
			"A moderator difference between studies is not proof of an optimal group size or project duration."
		],
		sources: [sources.projectReview, sources.projectRecent]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-cooperative-learning-improve-academic-achievement",
		title: "Does cooperative learning improve academic achievement?",
		bottomLine: "Yes, on average, for the structured approaches studied. Working together can support learning, but assigning students to a group is not the whole intervention. The task, support and comparison teaching matter.",
		stableCore: [
			"A review of face-to-face cooperative learning found positive average achievement and attitude effects, with variation across domains and learner groups. The studies cover organized learning activities, rather than every instance of students sitting together.",
			"A 2026 second-order meta-analysis synthesized 15 earlier meta-analyses and also found positive average outcomes. Such an umbrella synthesis can include overlapping primary studies; its review count is not a count of independent classroom experiments."
		],
		editorSummary: "Evidence concerns structured cooperative activities, not group seating alone.",
		excludedEvidence: ["Group seating or satisfaction alone, without achievement comparisons."],
		population: "Students in school and postsecondary cooperative-learning settings represented by the reviews.",
		scope: "Compare organized cooperative instruction with alternative teaching; distinguish achievement from attitudes and the design of group tasks.",
		uncertainty: "Cooperative techniques, study designs and comparison teaching vary. Overlap between reviews limits simple addition of evidence counts.",
		openQuestions: [
			"Which structures improve individual learning as well as group performance?",
			"How do subject, prior knowledge and assessment design change results?"
		],
		whatWouldChangeMinds: [
			"Independent multisite trials measuring implementation and individual delayed outcomes across different cooperative approaches."
		],
		misconceptions: [
			"A successful group product does not prove equal learning by every member.",
			"Fifteen meta-analyses do not mean fifteen independent experiments."
		],
		sources: [sources.cooperativeReview, sources.cooperativeUmbrella]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-preparing-to-teach-someone-else-improve-learning",
		title: "Does preparing to teach someone else improve learning?",
		bottomLine: "Often. Preparing to explain material, and then teaching it, can improve learning compared with studying without that expectation. The size of the benefit depends on the activity and how much thinking and practice it adds.",
		stableCore: [
			"A meta-analysis of 28 studies found benefits from preparing to teach and from preparation followed by teaching. Interactive teaching conditions tended to show larger gains, though comparisons between study types do not establish one cause of that difference.",
			"A later synthesis found that creating teaching materials for other people can also improve learning of the content taught. Teaching a topic is therefore a possible learning activity, but the evidence concerns the learner's subsequent understanding, not only the quality of the teaching product."
		],
		editorSummary: "Preparation and explanation can add useful processing of the material.",
		excludedEvidence: ["Lesson quality or audience satisfaction without assessing the student who prepared or taught."],
		population: "Students preparing lessons, teaching others or creating teaching materials in learning experiments.",
		scope: "Assess learning of the material taught; distinguish teaching expectancy, actual teaching and the time or practice added by the task.",
		uncertainty: "Interaction, study time, output format and tests differ. A larger pooled effect for one format does not establish a universal best method.",
		openQuestions: [
			"Which parts of preparing and teaching account for lasting gains?",
			"How do learners detect and correct errors in the explanations they teach?"
		],
		whatWouldChangeMinds: [
			"Time-matched experiments separating preparation, retrieval, explanation and interaction, with delayed transfer outcomes."
		],
		misconceptions: [
			"Explaining an incorrect idea confidently does not establish accurate learning.",
			"A useful teaching activity does not mean every learner needs an audience for every study session."
		],
		sources: [sources.teachingPreparation, sources.teachingMaterials]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-drawing-what-you-are-learning-improve-understanding",
		title: "Does drawing what you are learning improve understanding?",
		bottomLine: "It can, when the drawing represents the ideas being studied. Benefits are usually clearer for factual learning than for transfer to new problems. Decorative drawing and drawing that connects ideas are different activities.",
		stableCore: [
			"A synthesis of 53 studies found average benefits from directed learner-generated drawings, with smaller effects on transfer than on factual outcomes. Its scope includes drawings that represent study content, rather than drawing of any kind.",
			"A newer review compared supported and unsupported drawing. Extra support did not produce a general benefit; support intended to help integrate verbal and visual information showed more promising comprehension results. That moderator pattern needs to be interpreted within a small set of comparisons."
		],
		editorSummary: "The drawing's link to the content matters more than appearance alone.",
		excludedEvidence: ["Artistic quality or decorative drawing without tests of the material represented."],
		population: "Learners creating visual representations of instructional material, often in science-learning settings.",
		scope: "Assess directed drawing of content and subsequent comprehension or transfer; distinguish added instructional support from drawing itself.",
		uncertainty: "Tasks, drawing directions and outcome measures vary. The support review includes only 14 studies and cannot establish one universal design.",
		openQuestions: [
			"Which drawing prompts help learners correct mistaken mental models?",
			"How does drawing compare with other generative study activities at equal study time?"
		],
		whatWouldChangeMinds: [
			"Replicated time-matched trials testing specific drawing supports and delayed transfer to unfamiliar problems."
		],
		misconceptions: [
			"Artistic polish is not a direct measure of conceptual understanding.",
			"Adding more instructions to a drawing task does not automatically improve learning."
		],
		sources: [sources.drawingReview, sources.drawingSupport]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-do-rewards-affect-intrinsic-motivation",
		title: "How do rewards affect intrinsic motivation?",
		bottomLine: "Effects depend on the reward, task and outcome. Expected tangible rewards can reduce later voluntary interest in some already-interesting activities. Positive feedback and rewards in other settings can work differently, so a blanket claim that rewards help or harm is too broad.",
		band: "mixed",
		stableCore: [
			"Competing meta-analyses agree on important conditions but differ in how broadly they describe harmful effects. Expected tangible rewards, initial task interest and how rewards depend on performance are central distinctions. Measures often assess free-choice engagement after a reward ends.",
			"A separate large synthesis examined performance rather than only interest. It found that intrinsic motivation and incentives can both predict performance, with differences between quality and quantity. Producing more output and wanting to continue an activity are separate outcomes."
		],
		editorSummary: "Voluntary interest, reward conditions and measured output need separate comparisons.",
		excludedEvidence: ["Output quantity alone used as a measure of intrinsic interest."],
		population: "Children and adults in reward experiments, with school, work and other performance studies as context.",
		scope: "Distinguish tangible rewards, verbal feedback, initial task interest and reward contingency; separate interest from work output.",
		uncertainty: "Reviews differ in classification and included comparisons. Laboratory free-choice measures do not settle every long-term workplace or classroom incentive question.",
		openQuestions: [
			"Which reward designs preserve interest over longer periods?",
			"How well do short experimental measures predict sustained engagement in real settings?"
		],
		whatWouldChangeMinds: [
			"Long-term randomized comparisons measuring voluntary interest, performance quality and quantity under clearly specified reward conditions."
		],
		misconceptions: [
			"A finding about one reward contingency does not establish that every incentive has the same effect.",
			"Higher output does not necessarily mean greater intrinsic interest."
		],
		sources: [sources.rewardDeci, sources.rewardCameron, sources.incentivePerformance]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-setting-a-goal-help-people-change-behavior",
		title: "Does setting a goal help people change behavior?",
		bottomLine: "Yes, on average, but setting a goal is only one part of changing behavior. Effects vary with the goal, setting and support. A clear target does not guarantee the actions needed to reach it.",
		stableCore: [
			"A review of 141 papers used randomized comparisons designed to isolate goal setting and found a small positive average effect across behaviors. The benefit was not the same in every study.",
			"A sport-specific synthesis also found varied effects across goal types and measures. Its results help show why a desired final outcome, an action goal and a performance target should not automatically be treated as the same intervention."
		],
		editorSummary: "A target can help, while its design and connection to action still matter.",
		excludedEvidence: ["Motivational intentions without behavior, or bundled programs that cannot isolate goal setting."],
		population: "Participants in randomized behavior-change studies, with sport-specific goal-setting evidence as a bounded comparison.",
		scope: "Assess the added effect of setting goals; distinguish it from planning, monitoring and other support delivered alongside a goal.",
		uncertainty: "Behaviors, goals and comparison conditions vary. Sport findings do not establish a single best goal format for all everyday behavior.",
		openQuestions: [
			"Which goals help people sustain change after support ends?",
			"How should difficulty and feedback be adapted as circumstances change?"
		],
		whatWouldChangeMinds: [
			"Trials isolating goal characteristics and measuring sustained behavior, implementation and unintended effects."
		],
		misconceptions: [
			"Stating an ambitious outcome does not establish that a practical plan exists.",
			"An average benefit does not guarantee success for a particular goal."
		],
		sources: [sources.goalSetting, sources.sportGoals]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-if-then-plans-help-people-reach-goals",
		title: "Do if-then plans help people reach goals?",
		bottomLine: "They can. Linking a recognizable situation to a specific response often helps turn an intention into action. Results depend on the goal and plan; the method does not remove practical barriers or make every target achievable.",
		stableCore: [
			"Implementation intentions connect a cue with an intended response. Research syntheses find average benefits across several kinds of outcomes, rather than treating a strong wish alone as a complete plan.",
			"A newer synthesis covering 642 tests found variation with plan format, motivation and rehearsal. Those differences suggest useful conditions for study, but they do not establish that adding any if-then sentence improves every task."
		],
		editorSummary: "A cue-response plan can help when an appropriate opportunity arises.",
		excludedEvidence: ["General goal intentions without a specified situation-response link."],
		population: "Participants forming implementation intentions across experimental goal-pursuit settings.",
		scope: "Assess plans linking a situation with an action; distinguish these from general intentions, goal choice and changes to external resources.",
		uncertainty: "Plan contents and outcomes vary. Reviews can include overlapping studies, and moderator comparisons do not establish guaranteed individual benefits.",
		openQuestions: [
			"When do cue-response plans remain useful as routines change?",
			"Which plans help without becoming rigid or interfering with competing goals?"
		],
		whatWouldChangeMinds: [
			"Preregistered comparisons isolating cue specificity, rehearsal and motivation with sustained real-world outcomes."
		],
		misconceptions: [
			"An if-then plan does not create time, resources or an opportunity that is absent.",
			"A plan's wording alone does not establish that the chosen action is appropriate."
		],
		sources: [sources.implementationClassic, sources.implementationRecent]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-tracking-progress-help-people-reach-goals",
		title: "Does tracking progress help people reach goals?",
		bottomLine: "Yes, on average, in controlled studies. Tracking can make progress visible and support changes in behavior. It helps most when the measure reflects the goal; collecting more numbers is not the same as making more progress.",
		stableCore: [
			"A meta-analysis of 138 randomized studies found that interventions encouraging progress monitoring improved goal attainment on average. Effects tended to be larger when people physically recorded progress or reported their results to others, although those cross-study differences do not isolate the format's effect.",
			"Activity-tracker programs provide one practical example, but reviews often assess packages that also include goals, reminders or support. Their results cannot isolate every benefit as an effect of a device or a step count alone."
		],
		editorSummary: "Monitoring is useful when the recorded measure informs the intended action.",
		excludedEvidence: ["Device ownership or metric collection alone, without subsequent goal attainment."],
		population: "Participants in randomized progress-monitoring studies and wearable activity-tracker programs.",
		scope: "Assess interventions that promote monitoring and subsequent goal attainment; distinguish tracking alone from multicomponent programs.",
		uncertainty: "Goals, measures and accompanying support differ. A larger effect in one monitoring format does not establish that the format alone caused the difference.",
		openQuestions: [
			"Which measures best support sustained changes rather than short-term responses?",
			"When does tracking become burdensome or distort the behavior being measured?"
		],
		whatWouldChangeMinds: [
			"Long-term trials separating monitoring from reminders and incentives while measuring meaningful outcomes and burden."
		],
		misconceptions: [
			"An increase in a recorded metric is not necessarily improvement in the underlying goal.",
			"A successful tracker program does not establish that the hardware alone caused the benefit."
		],
		sources: [sources.progressMonitoring, sources.activityTrackers]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-long-does-it-take-to-form-a-habit",
		title: "How long does it take to form a habit?",
		bottomLine: "It varies widely and often takes weeks or months. There is no single deadline that fits every behavior or person. Becoming more automatic is also different from performing an action perfectly every day.",
		certainty: "low",
		stableCore: [
			"A 2024 review included 20 studies of health-related habits, but only four provided direct estimates of formation time. Those estimates varied substantially, and many included studies had a high risk of bias. They do not support a universal day count.",
			"An 84-day trial comparing routine-based and time-based cues found increases in reported automaticity with both approaches. Its time estimate concerned participants who successfully formed the studied habit, rather than a guaranteed result for everyone assigned to a plan."
		],
		editorSummary: "Behavior, context and the measure of automaticity shape the timescale.",
		excludedEvidence: ["Repetition or adherence alone, without a measure of habit automaticity."],
		population: "Adults forming everyday health-related routines in intervention studies.",
		scope: "Assess repeated behavior and self-reported automaticity; distinguish time among successful habit-formers from outcomes for every participant.",
		uncertainty: "Direct timing evidence is sparse, measures are often self-reported and study quality varies. Findings from health routines do not establish timing for every complex skill.",
		openQuestions: [
			"How do stable opportunities and changing environments affect formation time?",
			"Which measures best capture an enduring habit rather than temporary adherence?"
		],
		whatWouldChangeMinds: [
			"Larger longitudinal studies with objective behavior measures, clear definitions and follow-up after prompts end."
		],
		misconceptions: [
			"Passing a particular day count does not guarantee that a habit has formed.",
			"A result among successful participants is not a prediction for every person starting the behavior."
		],
		sources: [sources.habitTiming, sources.habitTrial]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "do-micro-breaks-improve-work-performance",
		title: "Do micro-breaks improve work performance?",
		bottomLine: "A general performance boost is uncertain. Short breaks can reduce fatigue and improve feelings of energy, but those benefits do not necessarily produce better task results. The type of task and break matter.",
		band: "mixed",
		certainty: "low",
		stableCore: [
			"A meta-analysis of brief breaks found small average benefits for vigor and fatigue, while the pooled overall performance effect was not statistically clear. Performance findings differed across task types.",
			"A broader review of 83 work-break studies emphasized differences in duration, frequency, activity and experience. Evidence about one short recovery activity should therefore not be used to prescribe a universal work-break schedule."
		],
		editorSummary: "Feeling refreshed and performing better are related but distinct outcomes.",
		excludedEvidence: ["After-work recovery, or productivity claims based only on feeling refreshed."],
		population: "People performing work-like tasks and knowledge workers represented in experimental and workplace studies.",
		scope: "Assess brief work breaks and task performance; keep energy, fatigue and measured output separate.",
		uncertainty: "Many comparisons are short and use varied tasks. The evidence does not establish a single optimal break length or schedule.",
		openQuestions: [
			"Which breaks improve sustained performance on demanding tasks?",
			"How do workload and control over break timing affect results?"
		],
		whatWouldChangeMinds: [
			"Longer workplace trials with comparable tasks, objective performance measures and clearly described break conditions."
		],
		misconceptions: [
			"Reduced tiredness does not automatically imply improved output.",
			"A finding for a short laboratory task does not establish an optimal schedule for every job."
		],
		sources: [sources.microBreaks, sources.workBreaks]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "how-does-hybrid-work-affect-employee-performance",
		title: "How does hybrid work affect employee performance?",
		bottomLine: "It can preserve measured performance in some jobs, but results depend on the work and coordination. A large trial found no harm to its performance measures, while other observational evidence raises concerns about innovation under some arrangements.",
		band: "mixed",
		stableCore: [
			"A six-month randomized trial of 1,612 employees at a Chinese travel-technology company tested two home-working days per week. Performance reviews and measured coding output were not worse under its equivalence tests; satisfaction and retention improved.",
			"A separate observational study of an Indian IT firm found weaker innovation measures during remote and hybrid periods, particularly with poor coordination. Different firms, outcomes and designs mean these studies cannot be combined into a single ranking of all work arrangements."
		],
		editorSummary: "Job tasks, coordination and the chosen performance measure affect the result.",
		excludedEvidence: ["Fully remote work alone, or satisfaction alone used as a measure of job performance."],
		population: "Office-based technology and knowledge workers in the cited Chinese and Indian firms.",
		scope: "Distinguish hybrid from fully remote work, randomized comparisons from observational transitions, and output from innovation or retention.",
		uncertainty: "Evidence from particular firms does not cover every job. Observational changes can reflect pandemic conditions and other differences beyond work location.",
		openQuestions: [
			"Which coordination practices preserve innovation as well as routine output?",
			"How do effects change across roles, new employees and longer periods?"
		],
		whatWouldChangeMinds: [
			"Independent multisite randomized studies measuring output, collaboration and longer-term career outcomes under clearly specified schedules."
		],
		misconceptions: [
			"Results for two home days do not establish effects of every remote-work policy.",
			"A stable performance score does not establish unchanged performance on every possible dimension."
		],
		sources: [sources.hybridTrial, sources.hybridInnovation]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-a-shorter-working-week-improve-employee-wellbeing",
		title: "Does a shorter working week improve employee well-being?",
		bottomLine: "Trials that reduce hours while keeping pay often report better well-being. Evidence is promising, but many studies are short or non-randomized. Working the same hours in fewer days is a different change.",
		certainty: "low",
		stableCore: [
			"A six-month study across 141 organizations found improvements in several self-reported well-being measures after a four-day-week intervention with retained pay. Participating organizations reorganized work beforehand, and the comparison companies were not randomly assigned.",
			"Reviews of reduced-hours programs also find generally favorable stress, sleep or work-life-balance results, with varied designs and limited settings. They leave important uncertainty about long-term effects, workload, staffing and who can access these arrangements."
		],
		editorSummary: "Actual hours, retained pay and work redesign define the intervention.",
		excludedEvidence: ["Compressed schedules with unchanged total hours, or pay cuts treated as retained-pay reductions."],
		population: "Employees in reduced-hours programs, mainly in higher-income countries and selected participating organizations.",
		scope: "Assess genuine working-time reductions with maintained pay; distinguish them from compressed schedules and simultaneous changes to staffing or work design.",
		uncertainty: "Selection, short follow-up and bundled changes limit causal attribution. Evidence is uneven across sectors and countries.",
		openQuestions: [
			"Are well-being gains sustained without shifting workload to other workers?",
			"How do costs, staffing and unpaid care change the distribution of benefits?"
		],
		whatWouldChangeMinds: [
			"Long-term controlled studies measuring actual hours, workload, service quality and well-being across diverse occupations."
		],
		misconceptions: [
			"A four-day calendar does not necessarily mean fewer hours.",
			"A well-being improvement does not by itself establish unchanged costs or productivity."
		],
		sources: [sources.fourDayWeek, sources.reducedHoursReview, sources.reducedHoursMap]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-gratitude-exercises-improve-wellbeing",
		title: "Do gratitude exercises improve well-being?",
		bottomLine: "They produce small average improvements in well-being in many studies. Results vary across people, activities and comparison groups. A small average benefit is not a promise of lasting happiness for every person.",
		stableCore: [
			"A 2025 synthesis included 145 papers across 28 countries and found a small average improvement in well-being. Effects varied between countries, and the analysis did not establish a clear explanation for all of that variation.",
			"A separate meta-analysis of 25 randomized studies found small benefits from expressed gratitude relative to neutral comparison activities. These results concern measured well-being outcomes; they do not establish that every gratitude activity has the same effect or that short-term changes always persist."
		],
		editorSummary: "Average benefits are modest and vary with the exercise and comparison.",
		excludedEvidence: ["Personality correlations alone, or treatment claims without condition-specific trials."],
		population: "Participants in gratitude-intervention studies across multiple countries and expressed-gratitude trials.",
		scope: "Assess positive well-being measures such as affect and life satisfaction; distinguish them from claims about treatment of a diagnosed condition.",
		uncertainty: "Exercises, comparison activities and follow-up vary. Related reviews can include overlapping studies, and cross-country effects are not uniform.",
		openQuestions: [
			"Which exercises provide sustained benefits beyond the initial practice period?",
			"How do cultural expectations and active comparison activities affect results?"
		],
		whatWouldChangeMinds: [
			"Preregistered trials using credible active comparisons, diverse populations and longer-term well-being measures."
		],
		misconceptions: [
			"A small mean improvement does not mean everyone benefits.",
			"A well-being finding does not establish an effective treatment for every mental-health condition."
		],
		sources: [sources.gratitudeCulture, sources.expressedGratitude]
	}, novemberLearningHabitsWorkResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-time-management-training-improve-employee-wellbeing",
		title: "Does time-management training improve employee well-being?",
		bottomLine: "That has not been established reliably. People who report better time management often also report better well-being, but training studies provide a much smaller and less consistent evidence base. Association and a training effect are different claims.",
		band: "unclear",
		certainty: "low",
		stableCore: [
			"A broad meta-analysis found positive relationships between time management and well-being, alongside performance associations. Much of that evidence concerns differences between people rather than randomized training effects.",
			"A 2026 systematic review focused on workplace time-management interventions. It found only seven eligible studies with 442 participants, with limited, inconsistent findings and low study quality. The evidence therefore does not justify treating a reported association as proof that a training course improves well-being."
		],
		editorSummary: "Training efficacy needs controlled evidence beyond time-management correlations.",
		excludedEvidence: ["Cross-sectional associations alone used as proof of training efficacy."],
		population: "Employees in workplace time-management interventions, with broader correlational research as context.",
		scope: "Assess whether time-management training changes well-being; distinguish intervention studies from associations with time-management scores.",
		uncertainty: "The direct intervention literature is small, heterogeneous and at risk of bias, with limited evidence about durable benefits.",
		openQuestions: [
			"Which training components change well-being under real workload constraints?",
			"Do improvements persist when organizational demands remain unchanged?"
		],
		whatWouldChangeMinds: [
			"Larger well-reported randomized workplace trials with active comparisons, objective implementation measures and longer follow-up."
		],
		misconceptions: [
			"A correlation between organized schedules and well-being does not prove that a course causes the difference.",
			"A lack of strong evidence is not proof that every time-management intervention is ineffective."
		],
		sources: [sources.timeTraining, sources.timeManagement]
	}, novemberLearningHabitsWorkResearchCheckedAt)
];
