import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberLanguageCommunicationResearchCheckedAt = "2026-11-08T14:46:05.179Z";

const sources = {
	grammar1: researchSource("Implicit and explicit instruction in L2 learning", "Studies in Bilingualism", 2015, "https://doi.org/10.1075/sibil.48.18goo", "10.1075/sibil.48.18goo", "Meta-analysis published as a 2015 book chapter, not a journal article. Its 34 unique samples comprise 11 from an earlier synthesis and 23 newer studies; overlapping review pools cannot be added as independent experiments.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	grammar2: researchSource("Interactions Between Type of Instruction and Type of Language Feature: A Meta‐Analysis", "Language Learning", 2010, "https://doi.org/10.1111/j.1467-9922.2010.00562.x", "10.1111/j.1467-9922.2010.00562.x", "Synthesis of 41 studies comparing explicit and implicit instruction for simple and complex English grammar. Outcomes include controlled knowledge and spontaneous target-form use, not a demonstration that rule study alone produces general fluency.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	grammar4: researchSource("Explicit Versus Implicit Instruction: A Meta-Analysis of Comparative Studies", "Modern English Education", 2020, "https://doi.org/10.18095/meeso.2020.21.4.11", "10.18095/meeso.2020.21.4.11", "Comparative synthesis of 40 primary studies and 143 samples from Korean English classrooms. Favors explicit instruction in that setting; samples are not 143 independent trials or a universal comparison across languages.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	feedback1: researchSource("ORAL FEEDBACK IN CLASSROOM SLA", "Studies in Second Language Acquisition", 2010, "https://doi.org/10.1017/s0272263109990520", "10.1017/s0272263109990520", "Classroom-only synthesis of 15 studies and 827 participants. Reports lasting target-language benefits and differences by feedback and outcome; immediate learner uptake is not the same as durable acquisition.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	feedback2: researchSource("The Effectiveness of Corrective Feedback in SLA: A Meta‐Analysis", "Language Learning", 2010, "https://doi.org/10.1111/j.1467-9922.2010.00561.x", "10.1111/j.1467-9922.2010.00561.x", "Synthesis of 33 primary studies, including 22 published papers and 11 dissertations, mixing laboratory and classroom settings. Overlaps other feedback reviews; setting and treatment comparisons affect results.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	feedback4: researchSource("The effects of recasts on L2 grammar: a meta-analysis", "The Language Learning Journal", 2024, "https://doi.org/10.1080/09571736.2022.2097298", "10.1080/09571736.2022.2097298", "Synthesis of 24 studies of recasts, with an average standardized effect g = 0.70. Foreign-language context findings were stronger than second-language context findings; partial and full recasts did not differ significantly. Journal issue is 2024, online publication 2022.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	age1: researchSource("A critical period for second language acquisition: Evidence from 2/3 million English speakers", "Cognition", 2018, "https://doi.org/10.1016/j.cognition.2018.04.007", "10.1016/j.cognition.2018.04.007", "Self-selected online dataset of 669,498 native and non-native English speakers with a computational grammar-learning model. The 17.4-year estimate is model-dependent and not a deadline after which useful language learning is impossible.", "landmark_study", "context", novemberLanguageCommunicationResearchCheckedAt),
	age2: researchSource("A meta-analysis: Age and second language grammar acquisition", "System", 2016, "https://doi.org/10.1016/j.system.2016.06.001", "10.1016/j.system.2016.06.001", "Grammar synthesis with 26 group-comparison samples and 20 correlational samples. Early/late categories depend on second- versus foreign-language settings; exposure history, assessment and attainment remain distinct.", "meta_analysis", "context", novemberLanguageCommunicationResearchCheckedAt),
	age3: researchSource("A Meta-analysis: Shape of Age Effects and Second Language Grammar Acquisition", "The Journal of AsiaTEFL", 2021, "https://doi.org/10.18823/asiatefl.2021.18.2.5.451", "10.18823/asiatefl.2021.18.2.5.451", "Meta-analysis of 29 samples from 14 studies of age of onset and grammar attainment. Shapes differ across age ranges and language pairs. These are not 29 randomized trials or a measure of every language skill.", "meta_analysis", "context", novemberLanguageCommunicationResearchCheckedAt),
	gesture1: researchSource("When our hands help us understand: A meta-analysis into the effects of gesture on comprehension.", "Psychological Bulletin", 2019, "https://doi.org/10.1037/bul0000202", "10.1037/bul0000202", "Synthesis of 83 independent samples covers observing and producing gestures. Production yielded larger average effects; the full sample is not listener-only. It overlaps earlier gesture research.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	gesture2: researchSource("When do gestures communicate? A meta-analysis.", "Psychological Bulletin", 2011, "https://doi.org/10.1037/a0022128", "10.1037/a0022128", "Synthesis of 63 listener samples comparing speech with and without gestures. Moderate average benefits varied with gesture information, topic and listener age; no fixed percentage of all communication is established.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	gesture3: researchSource("Co-Speech Hand Gestures Are Used to Predict Upcoming Meaning", "Psychological Science", 2025, "https://doi.org/10.1177/09567976251331041", "10.1177/09567976251331041", "Dutch adults heard questions from a virtual avatar with meaningful gestures or control movements. Cloze predictions and EEG responses support anticipation of upcoming meaning, not a universal real-conversation benefit.", "context", "supports", novemberLanguageCommunicationResearchCheckedAt),
	pronunciation1: researchSource("The Effectiveness of Second Language Pronunciation Instruction: A Meta-Analysis", "Applied Linguistics", 2015, "https://doi.org/10.1093/applin/amu040", "10.1093/applin/amu040", "Synthesis of 86 unique reports. Within-group and between-group contrasts are separate; controlled outcomes, feedback and longer interventions showed larger effects. Published online in 2014 and in the 2015 journal issue.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	pronunciation2: researchSource("Effects of Second Language Pronunciation Teaching Revisited: A Proposed Measurement Framework and Meta‐Analysis", "Language Learning", 2019, "https://doi.org/10.1111/lang.12345", "10.1111/lang.12345", "Reanalysis of measures in 77 pronunciation-teaching studies. Gains are clearest for monitored specific features; global human judgments of spontaneous speech remain less clear. Measurement changes the conclusion.", "meta_analysis", "context", novemberLanguageCommunicationResearchCheckedAt),
	pronunciation3: researchSource("Effectiveness of interventions on improving English language learners’ intelligibility and comprehensibility: A meta-analytic review", "Language Teaching Research", 2025, "https://doi.org/10.1177/13621688221106832", "10.1177/13621688221106832", "Two separate syntheses: 18 learner-intervention studies with 33 effects and 10 listener-intervention studies with 20 effects. Intelligibility, comprehensibility and accent are different constructs. Journal issue 2025, online 2022.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	reading1: researchSource("Learning a Language Through Reading: A Meta-analysis of Studies on the Effects of Extensive Reading on Second and Foreign Language Learning", "Educational Psychology Review", 2025, "https://doi.org/10.1007/s10648-025-10068-6", "10.1007/s10648-025-10068-6", "2025 extensive-reading synthesis finds small-to-medium effects across language domains. Text-choice and accountability moderators are study-level associations, not randomized proof of an optimal program.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	reading2: researchSource("The Effects of Extensive Reading on Reading Comprehension, Reading Rate, and Vocabulary Acquisition", "Reading Research Quarterly", 2017, "https://doi.org/10.1002/rrq.152", "10.1002/rrq.152", "Fifteen-week quasi-experiment with four intact Korean university classes, 88 controls and 83 intervention students. Thirty minutes of extensive reading replaced intensive reading within equal weekly teaching time. Journal issue 2017, online 2016.", "context", "supports", novemberLanguageCommunicationResearchCheckedAt),
	reading3: researchSource("The Effects of Extensive Reading on English Vocabulary Learning: A Meta-analysis", "English Language Teaching", 2018, "https://doi.org/10.5539/elt.v11n6p1", "10.5539/elt.v11n6p1", "Synthesis of 21 studies involving 1,268 participants on English vocabulary. Duration and teaching-method moderators do not establish one universally optimal course length or isolate component effects causally.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	vocabulary1: researchSource("How effective is second language incidental vocabulary learning? A meta-analysis", "Language Teaching", 2023, "https://doi.org/10.1017/s0261444822000507", "10.1017/s0261444822000507", "Synthesis of 24 studies, 29 effects and 2,771 participants. Mean target-word gains ranged from 9–18% immediately and 6–17% later; these are tested target words, not percentages of total language proficiency.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	vocabulary2: researchSource("Reading versus listening: Which one is more effective for incidental vocabulary learning?", "The Modern Language Journal", 2026, "https://doi.org/10.1111/modl.70029", "10.1111/modl.70029", "Eighty-eight university learners of Italian were assigned to novel-reading, audiobook or control groups. Both input modes supported vocabulary with a three-week follow-up. The abstract does not establish random allocation or a universal listening advantage.", "context", "supports", novemberLanguageCommunicationResearchCheckedAt),
	vocabulary3: researchSource("Comparing incidental vocabulary learning from reading-only and reading-while-listening", "System", 2021, "https://doi.org/10.1016/j.system.2020.102442", "10.1016/j.system.2020.102442", "Reading-only versus reading-while-listening experiment with surprise vocabulary measures. Bimodal input improved form/meaning recognition, but neither group fully lexicalized the new words for fluent retrieval.", "context", "context", novemberLanguageCommunicationResearchCheckedAt),
	task1: researchSource("TBLT implementation and evaluation: A meta-analysis", "Language Teaching Research", 2019, "https://doi.org/10.1177/1362168817744389", "10.1177/1362168817744389", "Original synthesis of 52 task-based program studies reported d = 0.93 across varied outcomes. Its inclusion criteria, effect calculations and moderator treatment were challenged in a later technical reanalysis.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	task2: researchSource("How effective is task-based language teaching to enhance second language learning? A technical comment on Bryfonski and McKay (2019)", "Language Teaching Research", 2025, "https://doi.org/10.1177/13621688221131127", "10.1177/13621688221131127", "Technical reanalysis of the earlier task-based synthesis found a more modest g = 0.61 after methodological changes, with fewer acceptable studies. Reuses the original evidence base; 2025 journal issue, first online 2022.", "meta_analysis", "debate", novemberLanguageCommunicationResearchCheckedAt),
	task3: researchSource("Technology-mediated task-based language teaching: a systematic review", "Cogent Education", 2025, "https://doi.org/10.1080/2331186x.2025.2560051", "10.1080/2331186x.2025.2560051", "Technology-mediated task review includes 17 publications: 12 empirical and five review studies. Questionnaires and verbal reports dominate engagement/motivation evidence; it is not a set of 17 independent skill-effect trials.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	abroad1: researchSource("Revisiting the effectiveness of study abroad language programs: A multi-level meta-analysis", "Language Teaching Research", 2024, "https://doi.org/10.1177/1362168820988423", "10.1177/1362168820988423", "Multilevel synthesis of 42 studies and 283 dependent effects. Duration, housing and course moderators are associations, not randomized prescriptions. Journal issue 2024, first online 2021.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	abroad2: researchSource("Systematic review synthesising the effects of study abroad experience on the development of language fluency", "Oxford Review of Education", 2026, "https://doi.org/10.1080/03054985.2024.2413109", "10.1080/03054985.2024.2413109", "Fourteen between-group studies comparing abroad and at-home language fluency, all quasi-experimental. Average g = 0.65 does not remove selection and exposure differences. Journal issue 2026, online 2024.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	abroad3: researchSource("Systematic review measuring the efficacy of study abroad in undergraduate language learners on linguistic proficiency gains", "Review of Education", 2021, "https://doi.org/10.1002/rev3.3306", "10.1002/rev3.3306", "Forty studies mapped; seven publications received full extraction and appraisal under stronger design criteria. Evidence favored overall proficiency and fluency more consistently than oral or written accuracy.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	apps1: researchSource("A Meta-Analysis on Mobile-Assisted Language Learning Applications: Benefits and Risks", "Psychologica Belgica", 2022, "https://doi.org/10.5334/pb.1146", "10.5334/pb.1146", "Synthesis of 23 effect sizes comparing mobile language applications with traditional learning. Positive average achievement effect, but the authors judge the evidence low quality and at high risk of bias; effect sizes are not a trial count.", "meta_analysis", "debate", novemberLanguageCommunicationResearchCheckedAt),
	apps2: researchSource("The effect of mobile‐assisted learning in real language attainment: A systematic review", "Journal of Computer Assisted Learning", 2023, "https://doi.org/10.1111/jcal.12811", "10.1111/jcal.12811", "Review of 17 quantitative and qualitative studies focused on foreigners, immigrants and refugees. Describes language benefits and sociocultural/access barriers; it is not 17 randomized commercial-app evaluations.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	apps3: researchSource("A systematic review of emerging technology applications for teaching English as a foreign language across different educational levels", "Educational Research Review", 2026, "https://doi.org/10.1016/j.edurev.2026.100795", "10.1016/j.edurev.2026.100795", "2026 synthesis of 33 experimental/quasi-experimental studies and 3,181 learners across apps, AI, virtual/augmented reality and other tools. Average g = 0.38 with high heterogeneity is not an app-only effect.", "meta_analysis", "context", novemberLanguageCommunicationResearchCheckedAt),
	games1: researchSource("Digital game-based second-language vocabulary learning and conditions of research designs: A meta-analysis study", "Computers & Education", 2018, "https://doi.org/10.1016/j.compedu.2018.06.020", "10.1016/j.compedu.2018.06.020", "Twenty-six vocabulary studies separated by control design: alternative activities, modified games, identical-content comparisons and same-game groupings. Those comparisons answer different causal questions.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	games2: researchSource("Second language (L2) gains through digital game-based language learning (DGBLL): A meta-analysis", "Language Learning & Technology", 2022, "https://doi.org/10.64152/10125/73464", "10.64152/10125/73464", "Synthesis of publicly available digital games found positive between-group and within-group effects, which are different comparisons. Entertainment-versus-educational estimates had overlapping confidence intervals.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	games3: researchSource("Do mobile games improve language learning? A meta-analysis", "Computer Assisted Language Learning", 2025, "https://doi.org/10.1080/09588221.2025.2528786", "10.1080/09588221.2025.2528786", "Thirty-eight experimental/quasi-experimental mobile-game studies with 4,102 participants. Vocabulary and pronunciation findings were clearer than several other outcomes; genre and duration moderators are not randomized component tests.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	translation1: researchSource("The effectiveness of machine translation in foreign language education: a systematic review and meta-analysis", "Computer Assisted Language Learning", 2023, "https://doi.org/10.1080/09588221.2021.1901745", "10.1080/09588221.2021.1901745", "Review of 87 machine-translation studies from 2000–2019 with a secondary meta-analysis. Often positive for writing, but this older evidence does not validate current generative writing systems. Journal issue 2023, online 2021.", "systematic_review", "supports", novemberLanguageCommunicationResearchCheckedAt),
	translation2: researchSource("Theoretical perspectives and factors influencing machine translation use in L2 writing: A scoping review", "Journal of Second Language Writing", 2024, "https://doi.org/10.1016/j.jslw.2024.101099", "10.1016/j.jslw.2024.101099", "2024 scoping review organizes theoretical models and linguistic, individual and contextual factors in translation-assisted writing. It does not supply a new pooled learning-effect estimate.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	translation3: researchSource("Comparing L2 learners’ writing against parallel machine-translated texts: Raters’ assessment, linguistic complexity and errors", "System", 2021, "https://doi.org/10.1016/j.system.2020.102408", "10.1016/j.system.2020.102408", "Sixty-six Korean university learners completed counterbalanced direct, self-translated and machine-translated writing tasks. Machine-assisted texts had fewer grammar errors but more mistranslations and poor word choices. Assisted products are not delayed unaided learning.", "context", "debate", novemberLanguageCommunicationResearchCheckedAt),
	bilingual1: researchSource("Dual Language Education and Academic Growth", "Teachers College Record: The Voice of Scholarship in Education", 2024, "https://doi.org/10.1177/01614681241244934", "10.1177/01614681241244934", "Observational seasonal growth models for Hispanic students in a Midwestern US Spanish–English program. Within-student trajectories improve description but do not randomize program participation; school-year and summer patterns differ.", "context", "context", novemberLanguageCommunicationResearchCheckedAt),
	bilingual2: researchSource("The Effects of Dual Language Education on Young Bilingual Children’s Learning: A Systematic Review of Research", "Education Sciences", 2025, "https://doi.org/10.3390/educsci15030312", "10.3390/educsci15030312", "2025 review of nine early-years dual-language studies describes varied language, literacy and mathematics findings and research gaps. It is not a pooled causal estimate of all bilingual education models.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	bilingual3: researchSource("Effects of Dual-Language Immersion Programs on Student Achievement", "American Educational Research Journal", 2017, "https://doi.org/10.3102/0002831216634463", "10.3102/0002831216634463", "Seven cohorts of urban immersion-program lottery applicants support intent-to-treat reading effects of 0.13–0.22 standard deviations in grades five/eight. These are not percentage score gains; little mathematics/science benefit or detriment was found.", "landmark_study", "supports", novemberLanguageCommunicationResearchCheckedAt),
	shared1: researchSource("Shared Picture Book Reading Interventions for Child Language Development: A Systematic Review and Meta-Analysis", "Child Development", 2020, "https://doi.org/10.1111/cdev.13225", "10.1111/cdev.13225", "Nineteen randomized trials with 2,594 children aged about one to six found small expressive/receptive language benefits and larger caregiver-practice changes. Canonical journal issue is 2020, despite a 2019 discovery year.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	shared2: researchSource("Home-based shared book reading interventions and children’s language skills: a meta-analysis of randomised controlled trials", "Educational Research and Evaluation", 2019, "https://doi.org/10.1080/13803611.2020.1814820", "10.1080/13803611.2020.1814820", "Synthesis of 30 shared-reading interventions found inconsistent benefits outside dialogic reading and concerns about fading effects and external validity. Publisher lists a 2019 volume/issue and first online publication on October 8, 2020.", "meta_analysis", "debate", novemberLanguageCommunicationResearchCheckedAt),
	shared3: researchSource("The Impact of Interactive Shared Book Reading on Children's Language Skills: A Randomized Controlled Trial", "Journal of Speech, Language, and Hearing Research", 2020, "https://doi.org/10.1044/2020_jslhr-19-00288", "10.1044/2020_jslhr-19-00288", "Randomized 150-child comparison of two six-week interactive-reading approaches with an active reading control. Caregiver practices changed, but child-language gains did not exceed the active comparison.", "context", "debate", novemberLanguageCommunicationResearchCheckedAt),
	shared4: researchSource("Reading Aloud to Children, Social Inequalities and Vocabulary Development: Evidence from a Randomized Controlled Trial", "Journal of Research on Educational Effectiveness", 2024, "https://doi.org/10.1080/19345747.2023.2283475", "10.1080/19345747.2023.2283475", "Paris kindergarten randomized encouragement program supplied books and reading information. Reading frequency and one of two receptive-vocabulary measures improved, with that vocabulary benefit retained at six months; not every language measure improved.", "context", "supports", novemberLanguageCommunicationResearchCheckedAt),
	spelling1: researchSource("Does spelling instruction make students better spellers, readers, and writers? A meta-analytic review", "Reading and Writing", 2014, "https://doi.org/10.1007/s11145-014-9517-0", "10.1007/s11145-014-9517-0", "Fifty-three experimental/quasi-experimental studies with 6,037 K–12 students favored formal spelling instruction over unrelated and incidental activities. Spelling, word reading and composition quality remain different outcomes.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	spelling2: researchSource("A Meta-Analytic Review of Spelling Interventions for Students With or At-Risk for Learning Disabilities", "Journal of Learning Disabilities", 2026, "https://doi.org/10.1177/00222194251364836", "10.1177/00222194251364836", "Fifty-nine studies: 39 group designs and 20 single-case designs, with 2,229 K–9 students, mostly with or at risk for learning disabilities. Group spelling g = 0.33 and word-reading g = 0.25 are separate from single-case standardized effects. Journal issue 2026, online 2025.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	spelling3: researchSource("Effectiveness of spelling interventions for learners with dyslexia: A meta-analysis and systematic review", "Educational Psychologist", 2020, "https://doi.org/10.1080/00461520.2019.1659794", "10.1080/00461520.2019.1659794", "Thirty-four controlled trials in learners with dyslexia or spelling deficits support phonics, orthographic and morphological approaches; a significant memorization-strategy effect was not confirmed. Journal issue 2020.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	writing1: researchSource("Writing instruction improves students’ writing skills differentially depending on focal instruction and children: A meta-analysis for primary grade students", "Educational Research Review", 2021, "https://doi.org/10.1016/j.edurev.2021.100408", "10.1016/j.edurev.2021.100408", "Twenty-four K–grade-three studies with 5,589 participants and 166 effect sizes. Self-regulated strategy teaching had positive effects; the overall writing-intervention average is not a strategy-only estimate.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	writing2: researchSource("A meta-analysis of writing treatments for students in grades 6–12.", "Journal of Educational Psychology", 2023, "https://doi.org/10.1037/edu0000819", "10.1037/edu0000819", "Grades 6–12 synthesis of 406 independent comparisons and 52,529 students across many writing treatments. Strategy instruction is a subset; its estimate differs from the overall treatment average.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	writing3: researchSource("Effective writing instruction for students in grades 6 to 12: a best evidence meta-analysis", "Reading and Writing", 2025, "https://doi.org/10.1007/s11145-024-10539-2", "10.1007/s11145-024-10539-2", "Best-evidence reanalysis of the 2023 synthesis retains 148 comparisons and 22,838 students after stronger attrition, teacher-effect and measurement criteria. Strategy benefits remain; this is reused data, not independent replication. Journal issue 2025, online 2024.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	written1: researchSource("Effectiveness of written corrective feedback in developing L2 accuracy: A Bayesian meta-analysis", "Language Teaching Research", 2026, "https://doi.org/10.1177/13621688221147374", "10.1177/13621688221147374", "Bayesian synthesis starts with 52 controlled studies and distinguishes short-, medium- and longer-term accuracy effects. Several feedback types have similar average effects. Journal issue 2026, first online 2023.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	written2: researchSource("The Efficacy of Written Corrective Feedback in Improving L2 Written Accuracy: A Meta‐Analysis", "The Modern Language Journal", 2015, "https://doi.org/10.1111/modl.12189", "10.1111/modl.12189", "Twenty-one primary studies support grammatical-accuracy gains, with proficiency, setting and task-genre moderators. Accuracy is not an all-purpose measure of composition quality.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	written3: researchSource("Computer-Mediated Corrective Feedback to Improve L2 Writing Skills: A Meta-Analysis", "Journal of Educational Computing Research", 2022, "https://doi.org/10.1177/07356331211064066", "10.1177/07356331211064066", "Fourteen computer-mediated corrective-feedback studies with 1,220 participants distinguish automated writing evaluation from other computer-mediated approaches. Not all computer-mediated feedback is AI-generated.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	chatbots1: researchSource("Can Generative AI Chatbots Promote Second Language Acquisition? A Meta‐Analysis", "Journal of Computer Assisted Learning", 2025, "https://doi.org/10.1111/jcal.70060", "10.1111/jcal.70060", "Forty-one experimental/quasi-experimental generative-chatbot studies with 3,515 participants and 48 independent effects, average ES = 0.576. Brief-intervention moderators do not establish an optimal one-week course or long-term transfer.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	chatbots2: researchSource("Does Chatting with Chatbots Improve Language Learning Performance? A Meta-Analysis of Chatbot-Assisted Language Learning", "Review of Educational Research", 2025, "https://doi.org/10.3102/00346543241255621", "10.3102/00346543241255621", "Twenty-eight studies and 70 effects, average g = 0.484, include earlier chatbot systems as well as varied interfaces. This is not exclusive evidence about present-day generative models. Journal issue 2025, online 2024.", "meta_analysis", "supports", novemberLanguageCommunicationResearchCheckedAt),
	chatbots3: researchSource("The impact of different conversational generative AI chatbots on EFL learners: An analysis of willingness to communicate, foreign language speaking anxiety, and self-perceived communicative competence", "System", 2024, "https://doi.org/10.1016/j.system.2024.103533", "10.1016/j.system.2024.103533", "Three groups of 33 Chinese undergraduates compared classroom practice, a voice/text chatbot and an avatar chatbot. Reported confidence/anxiety benefits did not translate into significant between-group speaking-test differences.", "context", "debate", novemberLanguageCommunicationResearchCheckedAt),
	shadowing1: researchSource("A Systematic Review of Research on the use of Shadowing for Second Language Pronunciation Teaching", "Research Synthesis in Applied Linguistics", 2025, "https://doi.org/10.1080/29984475.2025.2546827", "10.1080/29984475.2025.2546827", "Narrative synthesis of 44 shadowing studies finds promising pronunciation results but methodological concerns: controlled speaking tasks, few real-listener links and teacher-collected perception surveys.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	shadowing2: researchSource("Shadowing for Developing EFL Learners’ Bottom-up Listening Skills: A Systematic Review", "International Journal of Language and Literary Studies", 2025, "https://doi.org/10.36892/ijlls.v7i4.2260", "10.36892/ijlls.v7i4.2260", "Review of bottom-up listening studies through 2023 suggests possible sound/word recognition benefits for less-proficient EFL learners. Advanced comprehension and durable retention remain less clear.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	shadowing3: researchSource("The Effect of Text Shadowing on English Language Learners’ Pronunciation Development: A Quasi-Experimental Study", "Language Teaching Research", 2026, "https://doi.org/10.1177/13621688261462581", "10.1177/13621688261462581", "Ten-week quasi-experiment with intermediate adult English learners. Both groups improved, but no significant between-group advantage appeared on fluency, comprehensibility, accentedness or imitation. Positive participant feedback is a separate outcome.", "context", "debate", novemberLanguageCommunicationResearchCheckedAt),
	signs1: researchSource("How HANDy are baby signs? A systematic review of the impact of gestural communication on typically developing, hearing infants under the age of 36 months", "First Language", 2014, "https://doi.org/10.1177/0142723714562864", "10.1177/0142723714562864", "Ten reports on symbolic baby-sign programs in typically developing hearing infants, from a search through February 2013. Developmental benefits remained unclear; absence of detected harm does not prove universal safety.", "systematic_review", "context", novemberLanguageCommunicationResearchCheckedAt),
	signs2: researchSource("The impact of baby sign on vocabulary development", "First Language", 2026, "https://doi.org/10.1177/01427237251409434", "10.1177/01427237251409434", "Online caregiver survey of 1,348 French hearing children aged 10–28 months: 723 exposed and 625 unexposed. Adjusted vocabulary associations were weak or absent; observational parent reports cannot establish causality or equivalence.", "context", "debate", novemberLanguageCommunicationResearchCheckedAt),
	signs3: researchSource("To Sign or Not to Sign? The Impact of Encouraging Infants to Gesture on Infant Language and Maternal Mind-Mindedness", "Child Development", 2013, "https://doi.org/10.1111/j.1467-8624.2012.01874.x", "10.1111/j.1467-8624.2012.01874.x", "Randomized study following 40 infants from 8 to 20 months. Gesture training did not improve language outcomes, though caregiver responsiveness differed. The small trial does not address deaf children's access to natural sign languages.", "context", "debate", novemberLanguageCommunicationResearchCheckedAt)
};

export const novemberLanguageCommunicationClaims = [
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-explicit-grammar-instruction-help-second-language-learning",
		title: "Does explicit grammar instruction help second-language learning?",
		bottomLine: "Yes. Explaining and practicing grammar rules generally helps learners master the forms being taught. It often outperforms instruction that leaves the rules unstated. This does not mean that studying rules alone produces fluent conversation.",
		stableCore: [
			"Reviews of targeted instruction generally favor explicit teaching for both simpler and more complex grammar features.",
			"A synthesis of 40 studies in Korean English classrooms also favored explicit instruction. Results depend on the skills tested and the comparison lessons."
		],
		openQuestions: [
			"How well do gains transfer to unfamiliar topics and spontaneous conversation?",
			"Which mix of explanation, input and practice works best for different learners?"
		],
		whatWouldChangeMinds: [
			"Replicated classroom comparisons with equal practice time and delayed spontaneous-speaking assessments.",
			"Studies across more language pairs using measures that do not favor the taught rule format."
		],
		misconceptions: [
			"Better performance on taught grammar is not a measure of overall fluency.",
			"Overlapping syntheses do not represent independent sets of classroom experiments."
		],
		editorSummary: "Explicit teaching helps with targeted grammar; transfer to wider language use needs separate assessment.",
		population: "Second-language learners in instructional comparisons, including Korean learners of English.",
		scope: "Compare explicit and implicit instruction for targeted grammatical knowledge and use, separating controlled tests from spontaneous performance.",
		excludedEvidence: [
			"Keep rule-learning effects separate from an entire course's fluency outcomes.",
			"Do not add the 2015 chapter's 34 samples to earlier review pools as independent evidence."
		],
		uncertainty: "Comparisons, target forms and outcome measures vary; some tests closely match explicit instruction.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.grammar1,
			sources.grammar2,
			sources.grammar4
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-oral-corrective-feedback-help-language-learners",
		title: "Does oral corrective feedback help language learners?",
		bottomLine: "Yes, on average. Feedback on spoken mistakes can help learners improve the language forms being practiced. Prompts and reformulations can both help, but their effects vary by classroom, target and assessment.",
		stableCore: [
			"A classroom-only synthesis of 15 studies involving 827 learners found benefits that persisted beyond the immediate lesson.",
			"A later synthesis of 24 studies found a moderate average effect for recasts, where a speaker reformulates a learner's error. Effects differed between foreign- and second-language settings."
		],
		openQuestions: [
			"Which feedback types best support lasting use during ordinary conversation?",
			"How should teachers balance correction, learner preferences and opportunities to speak?"
		],
		whatWouldChangeMinds: [
			"Classroom trials comparing feedback types with equal practice and delayed conversational outcomes.",
			"Replications across ages, language targets and immersion settings."
		],
		misconceptions: [
			"Repeating a corrected form immediately does not prove lasting learning.",
			"Evidence that feedback helps does not mean every spoken error needs correction."
		],
		editorSummary: "Oral feedback can improve target-language learning, with effects shaped by context and feedback type.",
		population: "Learners in classroom and laboratory studies of second- and foreign-language corrective feedback.",
		scope: "Assess spoken corrective feedback against later target-form knowledge and use, distinguishing recasts, prompts and study settings.",
		excludedEvidence: [
			"Do not equate immediate uptake or a stated preference with durable learning.",
			"Keep overlapping review samples and classroom-only results separate from laboratory findings."
		],
		uncertainty: "Feedback forms, treatment comparisons and language outcomes differ, and reviews include overlapping studies.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.feedback1,
			sources.feedback2,
			sources.feedback4
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "how-does-age-affect-learning-a-second-language",
		title: "How does age affect learning a second language?",
		bottomLine: "Age matters, especially for the level people eventually reach, but research does not establish one birthday when useful learning stops. Younger starters often have long-term advantages. Adults can still learn; exposure, practice and the skill being measured also matter.",
		stableCore: [
			"An online study of 669,498 English speakers modeled a decline in grammar-learning ability beginning around late adolescence. It did not test a universal deadline for every language skill.",
			"Meta-analyses find age-related differences in grammar attainment, with patterns that vary by learning setting, assessment and language pair."
		],
		openQuestions: [
			"How much of each age pattern reflects learning processes, exposure and opportunities to use the language?",
			"How do grammar, pronunciation and practical communication differ across adulthood?"
		],
		whatWouldChangeMinds: [
			"Longitudinal studies that follow learners with comparable exposure across ages.",
			"Replicated models covering multiple languages and language skills, with transparent assumptions."
		],
		misconceptions: [
			"The modeled 17.4-year estimate is not an age after which learning becomes impossible.",
			"Age at first exposure and the speed of early classroom progress are different measures."
		],
		editorSummary: "Age influences language learning, with different patterns across skills and learning environments.",
		population: "Native and non-native English speakers in an online grammar dataset and second-language grammar studies.",
		scope: "Assess age of exposure and grammar attainment while separating modeled learning trajectories, initial progress and ultimate proficiency.",
		excludedEvidence: [
			"Do not generalize a grammar task into a fixed deadline for pronunciation or everyday communication.",
			"Do not treat the 2021 review's 29 samples from 14 studies as 29 independent trials."
		],
		uncertainty: "Much evidence compares people with different exposure histories; model assumptions and language pairs affect the estimated pattern.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.age1,
			sources.age2,
			sources.age3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "do-hand-gestures-help-people-understand-speech",
		title: "Do hand gestures help people understand speech?",
		bottomLine: "Yes, on average. Relevant gestures can make spoken explanations easier to understand. Their usefulness depends on what they add, who is listening and the task. There is no single percentage of meaning that all gestures convey.",
		stableCore: [
			"A synthesis of 63 listener samples found a moderate average benefit when gestures accompanied speech, especially when they added useful information.",
			"A later review also found benefits from observing or producing gestures. A 2025 experiment showed that meaningful gestures helped Dutch adults predict upcoming words from an avatar."
		],
		openQuestions: [
			"How well do laboratory benefits transfer to busy classrooms and everyday conversations?",
			"Which gestures help across cultures, languages and accessibility needs?"
		],
		whatWouldChangeMinds: [
			"Replicated natural-conversation studies measuring understanding rather than just ratings or brain responses.",
			"Comparisons that distinguish watching gestures from making them."
		],
		misconceptions: [
			"A moderate average effect does not establish that 93% of communication is nonverbal.",
			"Making a gesture and watching someone else's gesture are different interventions."
		],
		editorSummary: "Relevant gestures support spoken understanding, with effects that depend on their content and use.",
		population: "Children and adults in speech-and-gesture experiments, including Dutch adults interacting with a virtual avatar.",
		scope: "Compare comprehension with gestures plus speech against speech alone, keeping gesture production, observation and prediction tasks distinct.",
		excludedEvidence: [
			"Do not count all 83 samples in the 2019 review as listener-only experiments.",
			"Keep EEG responses and word predictions separate from broad real-world comprehension claims."
		],
		uncertainty: "The reviews overlap and combine different gestures, tasks and populations.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.gesture1,
			sources.gesture2,
			sources.gesture3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-pronunciation-instruction-help-language-learners",
		title: "Does pronunciation instruction help language learners?",
		bottomLine: "Yes. Teaching and practicing pronunciation can improve the sounds and speech features being taught. Gains are clearer on controlled tasks than in free conversation. Being easier to understand is a different goal from sounding like a native speaker.",
		stableCore: [
			"Large syntheses generally find gains from pronunciation instruction, with results shaped by feedback, teaching time and assessment.",
			"A later review found improvements in how understandable learners' speech was. It separately studied training listeners, which is a different way to improve communication."
		],
		openQuestions: [
			"Which gains last and transfer to spontaneous conversation with unfamiliar listeners?",
			"How should teaching address rhythm, individual sounds and listener familiarity?"
		],
		whatWouldChangeMinds: [
			"Classroom trials with delayed spontaneous speech and blinded listener judgments.",
			"Replications distinguishing understandability, accurate word recognition and accent ratings."
		],
		misconceptions: [
			"A lower accent rating does not automatically mean speech is easier to understand.",
			"Training speakers and training listeners are separate interventions."
		],
		editorSummary: "Pronunciation teaching helps targeted performance; conversational transfer and measurement remain important.",
		population: "Second-language learners in pronunciation teaching studies and listeners in separate comprehension interventions.",
		scope: "Assess pronunciation instruction against controlled and spontaneous speech, distinguishing accent, intelligibility and comprehensibility.",
		excludedEvidence: [
			"Do not pool 18 speaker-intervention studies with 10 listener-intervention studies as one treatment.",
			"Do not convert standardized effects into a percentage improvement or native-speaker attainment."
		],
		uncertainty: "Measured benefits depend strongly on whether tasks assess rehearsed features or global spontaneous speech.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.pronunciation1,
			sources.pronunciation2,
			sources.pronunciation3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-extensive-reading-help-second-language-learning",
		title: "Does extensive reading help second-language learning?",
		bottomLine: "Yes, on average. Sustained reading of accessible texts can improve reading skills and vocabulary in a second language. It can also support other skills, but results vary. Research does not establish one ideal reading program for everyone.",
		stableCore: [
			"A 2025 meta-analysis found small-to-medium average benefits across language outcomes and learner groups.",
			"In a 15-week Korean university study, classes that replaced part of intensive reading with extensive reading improved more on reading comprehension, reading rate and vocabulary."
		],
		openQuestions: [
			"How much do benefits last and transfer to speaking or unfamiliar texts?",
			"How do text difficulty, learner choice and follow-up activities affect results?"
		],
		whatWouldChangeMinds: [
			"Randomized comparisons with equal teaching time and long-term language measures.",
			"Replications in younger learners and more second-language settings."
		],
		misconceptions: [
			"A study-level link with program length does not prove a universal optimal course duration.",
			"The Korean study used intact classes, not randomly assigned individual students."
		],
		editorSummary: "Extensive reading supports several language skills, with variation across programs and outcomes.",
		population: "Second- and foreign-language learners, including Korean university students learning English.",
		scope: "Assess sustained reading programs against language outcomes while distinguishing curriculum substitutions from extra instructional time.",
		excludedEvidence: [
			"Do not treat the Korean program as added teaching time: 30 minutes replaced intensive reading.",
			"Do not infer that restricted text choice or accountability caused larger effects from moderator associations alone."
		],
		uncertainty: "Programs, comparison lessons and learner groups differ; some evidence is quasi-experimental.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.reading1,
			sources.reading2,
			sources.reading3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "can-you-learn-new-words-through-reading-and-listening",
		title: "Can you learn new words through reading and listening?",
		bottomLine: "Yes. People can learn some unfamiliar words while following a story or other content, even without a vocabulary lesson. Usually they learn only part of the target vocabulary. Recognizing a word is easier than using it quickly and accurately.",
		stableCore: [
			"A synthesis of 24 studies found that learners acquired a minority of tested target words through meaning-focused input, with gains still present on delayed tests.",
			"A 2026 Italian-learning study found gains from both a novel and its audiobook. Another experiment found recognition gains without full integration of new words into fluent retrieval."
		],
		openQuestions: [
			"How much repeated exposure is needed for durable use in conversation?",
			"How do input difficulty, prior knowledge and different languages affect learning?"
		],
		whatWouldChangeMinds: [
			"Larger studies measuring delayed recall and spontaneous use as well as recognition.",
			"Direct comparisons of input modes with equivalent content and exposure."
		],
		misconceptions: [
			"Learning 9–18% of tested target words is not a 9–18% increase in overall vocabulary.",
			"One audiobook study does not establish that listening always outperforms reading."
		],
		editorSummary: "Meaning-focused reading and listening teach some vocabulary, with limits on retention and fluent use.",
		population: "Second-language learners in incidental vocabulary studies, including 88 university learners of Italian.",
		scope: "Assess vocabulary gained incidentally from reading and listening, separating word recognition, recall and fluent retrieval.",
		excludedEvidence: [
			"Keep vocabulary outcomes separate from comprehension comparisons and caption-based instruction already covered elsewhere.",
			"Do not treat group assignment as verified random allocation when the abstract does not report it."
		],
		uncertainty: "Target-word selection, prior knowledge checks and test format influence the estimated amount learned.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.vocabulary1,
			sources.vocabulary2,
			sources.vocabulary3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-task-based-language-teaching-improve-learning",
		title: "Does task-based language teaching improve learning?",
		bottomLine: "It can help, but the size of its advantage is uncertain. Lessons built around meaningful tasks often improve language outcomes. Reanalysis suggests smaller benefits than an influential early estimate, and comparisons differ in teaching time, design and assessment.",
		stableCore: [
			"A 52-study synthesis reported a large average benefit for task-based programs.",
			"A later technical reanalysis challenged its inclusion rules and calculations and found a more modest benefit. A review of technology-mediated tasks also found heavy reliance on perceptions and surveys."
		],
		openQuestions: [
			"How much advantage remains in rigorous, equally resourced classroom comparisons?",
			"Which tasks improve lasting accuracy, fluency and wider communication?"
		],
		whatWouldChangeMinds: [
			"Independent randomized program evaluations with reliable delayed performance measures.",
			"Transparent reanalyses that preserve comparable controls and account for teacher effects."
		],
		misconceptions: [
			"The original synthesis and its reanalysis are not independent replications.",
			"Positive learner opinions do not establish improved language performance."
		],
		editorSummary: "Task-based lessons are promising, while the strength and size of their advantage remain debated.",
		population: "Learners in classroom task-based language programs and technology-mediated English teaching studies.",
		scope: "Assess whole task-based programs against language achievement, keeping methodological reanalysis separate from new intervention evidence.",
		excludedEvidence: [
			"Do not present d = 0.93 and revised g = 0.61 as two directly comparable independent experiments.",
			"Do not count the technology review's five reviews as five new classroom trials."
		],
		uncertainty: "Methodological choices materially change estimates; digital-task evidence often measures perceptions rather than durable skill.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.task1,
			sources.task2,
			sources.task3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-studying-abroad-improve-language-skills",
		title: "Does studying abroad improve language skills?",
		bottomLine: "Often, especially for fluency. Students studying abroad tend to improve more than comparable students studying at home, but progress is uneven. Grammar accuracy may change less, and traveling abroad alone does not guarantee useful practice.",
		stableCore: [
			"A multilevel synthesis of 42 studies found average language gains associated with study-abroad programs.",
			"A later fluency synthesis found benefits across 14 comparison studies, all quasi-experimental. A stricter review found clearer gains in overall proficiency and fluency than in spoken or written accuracy."
		],
		openQuestions: [
			"How much reflects the program rather than students' motivation and opportunities?",
			"Which gains persist after students return home?"
		],
		whatWouldChangeMinds: [
			"Stronger comparisons with matched starting skills, exposure and follow-up.",
			"Replications separating courses, accommodation, social contact and program duration."
		],
		misconceptions: [
			"A study-level link with host-family stays does not prove that accommodation caused better learning.",
			"Fluency, accuracy and overall proficiency are different outcomes."
		],
		editorSummary: "Study abroad often supports fluency, with less consistent gains in accuracy and limits to causal evidence.",
		population: "Second-language students in study-abroad and at-home comparison programs, mainly undergraduate settings.",
		scope: "Compare study abroad with domestic instruction using fluency, overall proficiency and accuracy as separate outcomes.",
		excludedEvidence: [
			"Do not label the 14-study fluency evidence as randomized trials.",
			"Do not treat program duration or housing moderators as randomized prescriptions for individual learners."
		],
		uncertainty: "Student selection and differences in instruction and language exposure complicate causal comparisons.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.abroad1,
			sources.abroad2,
			sources.abroad3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "do-language-learning-apps-improve-language-skills",
		title: "Do language-learning apps improve language skills?",
		bottomLine: "They can support learning, but evidence is too uneven to promise fluency from an app. Studies often find gains on targeted language tests. Many have a high risk of bias, and benefits depend on the learner, app and surrounding instruction.",
		stableCore: [
			"A meta-analysis of mobile language applications found positive average achievement effects but judged the evidence low quality and at high risk of bias.",
			"A review focused on immigrants and refugees found benefits alongside access and social barriers. A 2026 synthesis found smaller, variable effects across a wider range of education technologies."
		],
		openQuestions: [
			"Do gains last and transfer to conversation beyond an app's exercises?",
			"Which independently evaluated tools help learners with different access and support needs?"
		],
		whatWouldChangeMinds: [
			"Independent trials with equal study time, active controls and delayed real-world performance tests.",
			"Transparent app-version reporting and research beyond short, supported classroom use."
		],
		misconceptions: [
			"Positive average test results do not validate every commercial app.",
			"A review of AI, virtual reality and mobile tools does not provide an app-only effect estimate."
		],
		editorSummary: "Apps can aid targeted learning; evidence quality and transfer to everyday language remain uneven.",
		population: "Mobile language learners, including classroom learners, immigrants and refugees.",
		scope: "Assess mobile-assisted language learning against tested attainment, distinguishing app-specific evidence from broader education-technology syntheses.",
		excludedEvidence: [
			"Do not treat 23 synthesized effect sizes as 23 independent randomized trials.",
			"Keep proprietary completion scores, daily streaks and satisfaction separate from demonstrated language proficiency."
		],
		uncertainty: "High bias risk, heterogeneous tools and limited follow-up weaken precise predictions of benefit.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.apps1,
			sources.apps2,
			sources.apps3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "do-digital-games-help-people-learn-a-language",
		title: "Do digital games help people learn a language?",
		bottomLine: "They can, especially for vocabulary. Games can provide useful language exposure and practice, but benefits depend on the game and comparison activity. Evidence for vocabulary is clearer than evidence for broad conversational ability.",
		stableCore: [
			"Syntheses generally find positive language outcomes from digital games, while showing that control activities and study design change the estimated benefit.",
			"A 2025 review of 38 experimental or quasi-experimental studies found clearer mobile-game benefits for vocabulary and pronunciation than for several other skills."
		],
		openQuestions: [
			"How much transfers to unscripted language use after play stops?",
			"Which games work with comparable exposure time and teacher support?"
		],
		whatWouldChangeMinds: [
			"Preregistered comparisons with equivalent language content and delayed assessments.",
			"Replications measuring conversation and transfer alongside game-specific vocabulary."
		],
		misconceptions: [
			"Improvement within one group is not the same as improvement over a control group.",
			"An observed moderator does not establish that one game genre is best for every learner."
		],
		editorSummary: "Digital games can support targeted language learning, with less certain transfer to broader skills.",
		population: "Second-language learners using educational and entertainment games, including mobile-game studies.",
		scope: "Assess digital gameplay against language outcomes while distinguishing alternative activities, modified games and identical-content controls.",
		excludedEvidence: [
			"Do not combine within-group and between-group standardized effects as the same comparison.",
			"Keep language-specific game evidence separate from general gamification and unmeasured entertainment benefits."
		],
		uncertainty: "Controls, games and outcomes vary, and short interventions dominate much of the evidence.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.games1,
			sources.games2,
			sources.games3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-machine-translation-help-second-language-writing",
		title: "Does machine translation help second-language writing?",
		bottomLine: "It can improve a text while also introducing errors. Translation tools may help with grammar and word choice, but a better assisted composition does not prove that the writer has learned those skills. Mistranslations still need checking.",
		stableCore: [
			"A review of 87 studies generally found benefits for foreign-language education, particularly writing, but covered research only through 2019.",
			"In a 66-student Korean university study, machine-assisted writing had fewer grammatical errors and more complex language, alongside more mistranslations and poor word choices."
		],
		openQuestions: [
			"Which uses improve later writing when the tool is unavailable?",
			"How do newer translation systems, languages and learner knowledge change the balance of help and error?"
		],
		whatWouldChangeMinds: [
			"Independent trials measuring delayed unaided writing as well as assisted text quality.",
			"Replicated error audits across language pairs, text genres and current tool versions."
		],
		misconceptions: [
			"A polished translated text is not a direct test of the writer's unaided ability.",
			"A synthesis of older translation systems does not verify the performance of every current AI writing tool."
		],
		editorSummary: "Machine translation can aid a composition; lasting learning and meaning accuracy require separate checks.",
		population: "Foreign-language learners in translation research, including 66 Korean university learners of English.",
		scope: "Assess translation-assisted writing against text quality and errors, separating assisted products from durable unaided language learning.",
		excludedEvidence: [
			"Do not equate the 2024 scoping review with a new quantitative effectiveness estimate.",
			"Keep mistranslation and semantic error counts visible alongside grammatical improvements."
		],
		uncertainty: "Tools change rapidly, older studies cover different systems, and assisted performance is not lasting learning.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.translation1,
			sources.translation2,
			sources.translation3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "how-do-dual-language-school-programs-affect-achievement",
		title: "How do dual-language school programs affect achievement?",
		bottomLine: "Well-implemented programs can support academic learning while teaching through two languages. Some stronger studies find reading benefits, without clear losses in other tested subjects. Outcomes differ by program and population; one model does not guarantee the same result everywhere.",
		stableCore: [
			"A study using seven cohorts of immersion-program lottery applicants found positive reading effects in fifth and eighth grades, with little evidence of benefit or harm in mathematics and science.",
			"Other research finds different school-year and summer growth patterns. A 2025 review of early-years programs found a small and varied evidence base."
		],
		openQuestions: [
			"Which models work best for learners with different home languages and levels of support?",
			"How do staffing, curriculum and summer opportunities affect lasting achievement?"
		],
		whatWouldChangeMinds: [
			"Replicated lottery or rigorous matched evaluations across districts and language pairs.",
			"Longitudinal studies measuring both languages and multiple academic subjects."
		],
		misconceptions: [
			"An effect of 0.13–0.22 standard deviations is not a 13–22% test-score increase.",
			"Evidence about bilingual instruction is separate from claims of a general bilingual advantage in attention."
		],
		editorSummary: "Dual-language programs can support achievement, with the clearest causal findings tied to particular programs.",
		population: "School students in dual-language programs, including immersion-lottery applicants and Spanish–English learners in US districts.",
		scope: "Assess academic outcomes of two-language instruction, distinguishing lottery offers, program attendance and observational growth.",
		excludedEvidence: [
			"Do not label within-student observational growth models as randomized program comparisons.",
			"Do not generalize results from lottery applicants to every child or all bilingual education models."
		],
		uncertainty: "Program design, applicant selection, local implementation and subject-specific outcomes limit broad extrapolation.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.bilingual1,
			sources.bilingual2,
			sources.bilingual3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-shared-book-reading-improve-childrens-language",
		title: "Does shared book reading improve children's language?",
		bottomLine: "It can help, but effects of programs that encourage shared reading are mixed. Some improve children's vocabulary; others mainly change how adults read. Benefits depend on the program, comparison activity and language measure.",
		stableCore: [
			"One synthesis of 19 randomized trials found small average language benefits. Another synthesis found less consistent results and concerns about durability and generalization.",
			"A 150-child trial changed caregiver behavior without improving language beyond an active reading comparison. A later Paris trial improved one of two receptive-vocabulary measures, with that benefit persisting at follow-up."
		],
		openQuestions: [
			"Which approaches produce lasting language gains beyond ordinary shared reading?",
			"How do access to books, implementation and families' circumstances change effects?"
		],
		whatWouldChangeMinds: [
			"Large multisite randomized evaluations with active controls and long-term language outcomes.",
			"Replications reporting all prespecified outcomes and participation across socioeconomic groups."
		],
		misconceptions: [
			"Improved caregiver reading behavior does not automatically mean improved child language.",
			"A result on one vocabulary test does not establish improvement across every language skill."
		],
		editorSummary: "Shared-reading programs can support vocabulary, with mixed results across trials and measures.",
		population: "Young children and caregivers in parent book-sharing trials, including interactive-reading comparisons and Paris kindergarten families.",
		scope: "Assess interventions encouraging parent–child book sharing against measured child language, separating caregiver practices and active-control comparisons.",
		excludedEvidence: [
			"Do not sum overlapping reviews' trial counts as independent replications.",
			"Do not replace a null active-control result with the background association between reading and language."
		],
		uncertainty: "Reviews differ in inclusion rules and interventions; active controls, outcome choice and follow-up change conclusions.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.shared1,
			sources.shared2,
			sources.shared3,
			sources.shared4
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-explicit-spelling-instruction-improve-spelling",
		title: "Does explicit spelling instruction improve spelling?",
		bottomLine: "Yes. Direct spelling instruction generally improves spelling more than leaving learners to pick it up incidentally. Some gains also transfer to word reading or spelling in writing. Results depend on the teaching approach and learners' needs.",
		stableCore: [
			"A synthesis of 53 studies involving 6,037 school students favored formal spelling instruction over incidental or unrelated activities.",
			"A newer review of students with or at risk for learning disabilities found smaller positive effects in group studies. A separate review supported teaching sound, spelling-pattern and word-part relationships for learners with spelling difficulties."
		],
		openQuestions: [
			"Which approaches produce lasting transfer to everyday writing across spelling systems?",
			"How can instruction best support learners with different patterns of difficulty?"
		],
		whatWouldChangeMinds: [
			"Replicated classroom trials with active controls and delayed unpracticed-word and composition measures.",
			"Studies across more languages that report allocation, attrition and implementation clearly."
		],
		misconceptions: [
			"Effects from single-case designs and group trials use different measures and cannot be directly ranked.",
			"Better spelling does not necessarily mean better overall composition quality."
		],
		editorSummary: "Direct spelling teaching improves spelling, with transfer and the best approach varying by learner and outcome.",
		population: "School students in spelling-instruction studies and children, adolescents and adults with dyslexia or spelling deficits.",
		scope: "Compare explicit spelling interventions with incidental or alternative instruction using spelling, transfer and word-reading outcomes.",
		excludedEvidence: [
			"Do not treat the newer review's 327 effect sizes as 327 trials; its 59 studies include 39 group and 20 single-case designs.",
			"Do not infer that all memorization-based methods are effective from evidence favoring orthographic or morphological teaching."
		],
		uncertainty: "Populations, language systems and intervention designs vary, and evidence for broader writing transfer is thinner.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.spelling1,
			sources.spelling2,
			sources.spelling3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-teaching-writing-strategies-improve-student-writing",
		title: "Does teaching writing strategies improve student writing?",
		bottomLine: "Yes, on average. Teaching students to plan, draft, check and revise can improve their writing. Evidence supports structured strategy teaching, including self-regulation. The size of the gain depends on the program, students and assessment.",
		stableCore: [
			"Reviews of primary and secondary education find benefits for strategy-based writing instruction.",
			"A stricter reanalysis of secondary-school studies retained a positive effect for strategy instruction after excluding weaker designs and unreliable measures."
		],
		openQuestions: [
			"Which gains persist when students write independently in new subjects?",
			"How much training and support do teachers need to reproduce the results?"
		],
		whatWouldChangeMinds: [
			"Independent classroom replications with reliable blinded scoring and delayed transfer tasks.",
			"Comparisons separating strategy instruction from extra writing time, feedback and teacher attention."
		],
		misconceptions: [
			"The 2025 best-evidence analysis reuses data from the 2023 review; it is not an independent trial pool.",
			"A standardized writing-quality effect is not a percentage increase in writing ability."
		],
		editorSummary: "Structured writing strategies improve performance, with positive results retained in stricter evidence screening.",
		population: "Primary-grade and grades 6–12 students in experimental and quasi-experimental writing studies.",
		scope: "Assess explicit planning, revising and self-regulation strategies using writing outcomes, separating broad treatment averages from strategy-specific effects.",
		excludedEvidence: [
			"Do not attribute the overall effect of all writing treatments to strategy instruction alone.",
			"Keep controlled writing scores separate from demonstrated long-term transfer to independent writing."
		],
		uncertainty: "Programs and writing measures differ; teacher effects and study quality influence estimated gains.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.writing1,
			sources.writing2,
			sources.writing3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-written-corrective-feedback-improve-second-language-writing",
		title: "Does written corrective feedback improve second-language writing?",
		bottomLine: "Yes, on average, especially for grammatical accuracy. Corrections and explanations can help writers improve beyond the immediate task. Research does not identify one feedback format as best in every setting, and accuracy is only one part of good writing.",
		stableCore: [
			"An updated synthesis of 52 controlled studies found moderate benefits that persisted across follow-up periods, with broadly similar effects for several feedback types.",
			"Earlier reviews also found accuracy benefits. Computer-mediated feedback studies report gains, but tools, outcomes and comparison conditions differ."
		],
		openQuestions: [
			"Which corrections transfer to new writing tasks without the same support?",
			"How do feedback workload, learner proficiency and error type affect lasting benefit?"
		],
		whatWouldChangeMinds: [
			"Classroom trials with active comparisons, delayed new compositions and blinded scoring.",
			"Independent evaluations separating human feedback, automated evaluation and other computer-mediated feedback."
		],
		misconceptions: [
			"Similar average effects do not prove that direct and indirect feedback are interchangeable for every writer.",
			"A feedback tool's correction of a draft is different from improved later unaided writing."
		],
		editorSummary: "Written feedback supports language accuracy, while broader writing quality and optimal delivery need separate evidence.",
		population: "Second-language writers in controlled feedback studies and computer-mediated writing interventions.",
		scope: "Assess written corrective feedback against subsequent L2 accuracy, separating feedback types, durability and computer-mediated technologies.",
		excludedEvidence: [
			"Do not assume every computer-mediated feedback study tested automated AI correction.",
			"Keep the 14-study computer-mediated synthesis and overlapping written-feedback reviews distinct rather than adding their samples."
		],
		uncertainty: "Error targets, proficiency, task genre and feedback technologies vary, limiting a single optimal-method claim.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.written1,
			sources.written2,
			sources.written3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "do-ai-chatbots-help-people-learn-a-language",
		title: "Do AI chatbots help people learn a language?",
		bottomLine: "They can provide useful practice, and studies often find improved test results. Evidence is still developing, especially for lasting speaking skills. Feeling more confident with a chatbot does not necessarily mean speaking performance has improved.",
		stableCore: [
			"A 2025 synthesis of 41 experimental or quasi-experimental studies found positive average language-learning effects from generative chatbots.",
			"A separate chatbot synthesis also found benefits. In a 99-student comparison, an avatar chatbot improved reported confidence and anxiety outcomes, but speaking-test gains did not differ significantly between groups."
		],
		openQuestions: [
			"Do gains transfer to conversations with people and persist after supported practice?",
			"How do model errors, current versions and teaching design affect learning?"
		],
		whatWouldChangeMinds: [
			"Independent preregistered trials with active human-practice controls and delayed real-conversation tests.",
			"Transparent reporting of model versions, task exposure and inaccurate feedback."
		],
		misconceptions: [
			"The earlier chatbot literature includes systems that are not current generative AI.",
			"Confidence, willingness to communicate and measured speaking performance are separate outcomes."
		],
		editorSummary: "Chatbots offer promising language practice, with uncertain durability and uneven evidence for speaking gains.",
		population: "Second-language learners in chatbot studies, including three groups of 33 Chinese university learners of English.",
		scope: "Assess chatbot-assisted language learning using tested performance, separating generative tools, older chatbots and self-reported experience.",
		excludedEvidence: [
			"Do not treat a short intervention's moderator association as proof that one week is the optimal duration.",
			"Do not turn the avatar study's nonsignificant speaking comparison into a demonstrated skill advantage."
		],
		uncertainty: "Tools change rapidly and many studies are short, small or quasi-experimental, with heterogeneous outcomes.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.chatbots1,
			sources.chatbots2,
			sources.chatbots3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-shadowing-help-language-learners",
		title: "Does shadowing help language learners?",
		bottomLine: "Shadowing, repeating speech as you hear it, may help with listening to sounds and practicing pronunciation. Evidence is promising but limited. Controlled studies do not consistently show an advantage over other instruction, especially for broader communication.",
		stableCore: [
			"A 44-study review found promising pronunciation results but noted heavy reliance on controlled tasks and weak links to real listener judgments.",
			"A listening review found possible benefits for lower-proficiency learners. A 2026 ten-week comparison found improvement in both groups, without a statistically detectable advantage for shadowing on any of its four speech measures."
		],
		openQuestions: [
			"Which gains last and transfer to spontaneous conversation or higher-level listening?",
			"How does shadowing compare with equally intensive listening and speaking practice?"
		],
		whatWouldChangeMinds: [
			"Larger randomized studies with active controls, delayed listening tests and spontaneous speech ratings.",
			"Replications across language pairs and proficiency levels."
		],
		misconceptions: [
			"Improvement from pretest to posttest does not establish that shadowing caused an advantage.",
			"Positive learner feedback does not replace a controlled performance comparison."
		],
		editorSummary: "Shadowing may support targeted practice, with uncertain advantages over comparable instruction.",
		population: "Second-language pronunciation and EFL listening learners, including intermediate adults in a university English program.",
		scope: "Assess simultaneous repetition of heard speech against listening and speech performance, distinguishing controlled tasks from spontaneous communication.",
		excludedEvidence: [
			"Do not describe the ten-week quasi-experiment as randomized or omit its null between-group findings.",
			"Keep sound recognition and pronunciation measures separate from overall conversational competence."
		],
		uncertainty: "Many studies use weak comparisons or controlled tasks, with limited long-term and real-conversation evidence.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.shadowing1,
			sources.shadowing2,
			sources.shadowing3
		]
	}, novemberLanguageCommunicationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "language-and-communication",
		slug: "does-baby-sign-improve-spoken-vocabulary",
		title: "Does baby sign improve spoken vocabulary?",
		bottomLine: "A reliable spoken-vocabulary advantage has not been established for hearing infants. Baby signs may offer a way to communicate, but the available studies do not consistently show faster spoken-language development. This evidence concerns optional baby-sign programs, not access to sign language for deaf children.",
		stableCore: [
			"A systematic review of ten reports found the developmental benefit unclear. A randomized study following 40 infants found no language advantage from gesture training.",
			"A 2026 French parent survey of 1,348 children found weak to no vocabulary differences after adjustment. As an observational comparison, it cannot prove an effect or its absence."
		],
		openQuestions: [
			"Are there lasting communication benefits that vocabulary tests miss?",
			"How do exposure, caregiver interaction and child characteristics affect outcomes?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with reliable language measures and longer follow-up.",
			"Studies separating symbolic gesture use, caregiver responsiveness and spoken vocabulary."
		],
		misconceptions: [
			"No detected vocabulary benefit is not proof that every family has the same experience.",
			"Results in hearing infants with hearing parents do not address deaf children's language-access needs."
		],
		editorSummary: "Baby-sign programs have no established spoken-vocabulary advantage in hearing infants.",
		population: "Typically developing hearing infants, mainly with hearing parents, including French children aged 10–28 months.",
		scope: "Assess optional symbolic baby-sign programs against spoken-language outcomes in hearing infants, separating randomized and parent-reported comparisons.",
		excludedEvidence: [
			"Keep natural sign-language access and studies of deaf or hard-of-hearing children outside this program-effectiveness question.",
			"Do not interpret nonsignificant findings as proof of zero effect, universal safety or equivalence."
		],
		uncertainty: "The trial evidence is small, older reports vary in quality and the larger recent study relies on caregiver reports.",
		band: "unclear",
		certainty: "low",
		sources: [
			sources.signs1,
			sources.signs2,
			sources.signs3
		]
	}, novemberLanguageCommunicationResearchCheckedAt)
];
