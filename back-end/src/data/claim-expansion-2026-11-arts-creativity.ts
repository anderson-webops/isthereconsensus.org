import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberArtsCreativityResearchCheckedAt = "2026-11-08T16:13:44.746Z";

const sources = {
	music1: researchSource("Please don't stop the music: A meta-analysis of the cognitive and academic benefits of instrumental musical training in childhood and adolescence", "Educational Research Review", 2022, "https://doi.org/10.1016/j.edurev.2022.100436", "10.1016/j.edurev.2022.100436", "Thirty-four controlled pre/post samples, 176 effects and 5,998 children/adolescents. The average training change g-delta = 0.26 is separate from the baseline self-selection advantage g-pre = 0.28. Instrumental-program scope differs from broader music-training syntheses.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	music2: researchSource("Cognitive and academic benefits of music training with children: A multilevel meta-analysis", "Memory & Cognition", 2020, "https://doi.org/10.3758/s13421-020-01060-2", "10.3758/s13421-020-01060-2", "Multilevel synthesis of 54 studies, 254 effects and 6,984 participants. Reports approximately null cognitive/academic transfer after controlling design quality, with smaller positive findings tied to nonrandom and non-active comparisons.", "meta_analysis", "debate", novemberArtsCreativityResearchCheckedAt),
	music3: researchSource("When the music's over. Does music skill transfer to children's and young adolescents' cognitive and academic skills? A meta-analysis", "Educational Research Review", 2017, "https://doi.org/10.1016/j.edurev.2016.11.005", "10.1016/j.edurev.2016.11.005", "Earlier synthesis found a small overall transfer estimate and larger effects in weaker designs. It overlaps later music reviews and does not measure the artistic or musical benefits of instruction.", "meta_analysis", "debate", novemberArtsCreativityResearchCheckedAt),
	fiction1: researchSource("Cognitive effects and correlates of reading fiction: Two preregistered multilevel meta-analyses.", "Journal of Experimental Psychology: General", 2024, "https://doi.org/10.1037/xge0001583", "10.1037/xge0001583", "Two preregistered reviews separate 70 experiments/371 effects from 114 correlational studies/559 effects. Experimental g = 0.14 and correlational r = 0.16 are different measures, not percentage gains or proof of prosocial behavior.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	fiction2: researchSource("Reading Literary Fiction and Theory of Mind: Three Preregistered Replications and Extensions of Kidd and Castano (2013)", "Social Psychological and Personality Science", 2019, "https://doi.org/10.1177/1948550618775410", "10.1177/1948550618775410", "Three preregistered replications: two uninformative failures and one successful theory-of-mind replication, with inconsistent moral-intention judgments. Journal issue 2019, first online 2018.", "context", "debate", novemberArtsCreativityResearchCheckedAt),
	fiction3: researchSource("Reading Literary Fiction Improves Theory of Mind", "Science", 2013, "https://doi.org/10.1126/science.1239918", "10.1126/science.1239918", "Five experiments reported temporary affective or cognitive theory-of-mind effects after literary fiction. These are short-test results, not evidence of lasting kindness or everyday behavior.", "context", "supports", novemberArtsCreativityResearchCheckedAt),
	creativity1: researchSource("The impact of creativity training on creative performance: A meta-analytic review and critical evaluation of 5 decades of creativity training studies.", "Psychological Bulletin", 2024, "https://doi.org/10.1037/bul0000432", "10.1037/bul0000432", "Synthesis of 169 studies/844 effects, including 48 unpublished studies/262 effects. Publication-bias adjustments reduced the unadjusted 0.53-SD estimate to about 0.29–0.32 SD; methodological weaknesses remain and adjustments do not reveal a known true effect.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	creativity2: researchSource("Creativity training programs in primary education: A systematic review and meta-analysis", "Thinking Skills and Creativity", 2022, "https://doi.org/10.1016/j.tsc.2022.101172", "10.1016/j.tsc.2022.101172", "Primary-school creativity review with six studies meeting its methodological criteria. Outcomes concern creativity/divergent thinking, not established long-term artistic or professional achievement.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	creativity3: researchSource("Effect of training programs on the creativity of university students: A multi-level meta-analysis", "Thinking Skills and Creativity", 2025, "https://doi.org/10.1016/j.tsc.2025.101779", "10.1016/j.tsc.2025.101779", "Twenty-nine university studies and 109 effects from 2000–2024, with a positive average estimate. Domain and training moderators do not establish a universally optimal program; underlying studies can overlap broader syntheses.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	incubation1: researchSource("Does incubation enhance problem solving? A meta-analytic review.", "Psychological Bulletin", 2009, "https://doi.org/10.1037/a0014212", "10.1037/a0014212", "Incubation synthesis finds task-dependent benefits, with divergent thinking differing from linguistic and visual insight. Preparation and break-demand moderators do not establish one universally effective break.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	incubation2: researchSource("Does unconscious processing benefit creative problem-solving, especially when people have been misdirected?", "Thinking Skills and Creativity", 2023, "https://doi.org/10.1016/j.tsc.2023.101365", "10.1016/j.tsc.2023.101365", "Two experiments use masked examples, fixation and alternative-uses tasks. Manipulated cues and incubation conditions do not establish one unconscious mechanism for every ordinary break or creative project.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	incubation3: researchSource("The Role of Mind Wandering During Incubation in Divergent and Convergent Creative Thinking", "Brain Sciences", 2025, "https://doi.org/10.3390/brainsci15060595", "10.3390/brainsci15060595", "Eighty-five participants completed divergent/convergent tasks with a 0-back interval and thought probes. Mind wandering did not significantly benefit divergent thinking; incubation fluency and convergent patterns depended on item repetition, difficulty and awareness.", "context", "debate", novemberArtsCreativityResearchCheckedAt),
	constraints1: researchSource("[Re]thinking outside the box: A meta‐analysis of constraints and creative performance", "Journal of Organizational Behavior", 2022, "https://doi.org/10.1002/job.2655", "10.1002/job.2655", "Synthesis of 111 published/unpublished studies finds a positive average constraint–creativity relationship, with substantial design and measurement moderation. Different constraints are not interchangeable causal interventions.", "meta_analysis", "context", novemberArtsCreativityResearchCheckedAt),
	constraints2: researchSource("Creativity and Innovation Under Constraints: A Cross-Disciplinary Integrative Review", "Journal of Management", 2019, "https://doi.org/10.1177/0149206318805832", "10.1177/0149206318805832", "Cross-disciplinary integrative review organizes constraints and possible mechanisms. It is not an additional randomized effectiveness estimate. Journal issue 2019, first online 2018.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	constraints3: researchSource("Integrated Constraints in Creativity: Foundations for a Unifying Model", "Review of General Psychology", 2023, "https://doi.org/10.1177/10892680211060027", "10.1177/10892680211060027", "Conceptual IConIC model proposes a taxonomy and testable predictions about constraints. It supplies theoretical context, not an independent controlled intervention effect. Journal issue 2023, indexed 2022.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	rewards1: researchSource("Rewards and creative performance: A meta-analytic test of theoretically derived hypotheses.", "Psychological Bulletin", 2012, "https://doi.org/10.1037/a0027652", "10.1037/a0027652", "Sixty experimental/nonexperimental studies and 69 independent samples. Creativity-contingent rewards differ from performance- or completion-contingent rewards, with choice/control and feedback moderators.", "meta_analysis", "context", novemberArtsCreativityResearchCheckedAt),
	rewards2: researchSource("Extrinsic Rewards, Intrinsic Motivation, and New Product Development Performance", "Journal of Product Innovation Management", 2020, "https://doi.org/10.1111/jpim.12554", "10.1111/jpim.12554", "Two rounds of survey data from 238 members of 64 product-development teams. Multilevel modeling links reward types, motivation and performance without randomized reward or pay assignment.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	rewards3: researchSource("The Influence of Intrinsic Motivation and Synergistic Extrinsic Motivators on Creativity and Innovation", "Frontiers in Psychology", 2019, "https://doi.org/10.3389/fpsyg.2019.00137", "10.3389/fpsyg.2019.00137", "Ninety consulting workers' online self-assessments. Relational-reward moderation was supported; transactional-reward moderation was not significant. The associations do not establish a causal pay policy.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	walking1: researchSource("The impact of walking on creative thinking: A systematic review and meta-analysis", "PLOS One", 2026, "https://doi.org/10.1371/journal.pone.0347878", "10.1371/journal.pone.0347878", "Twenty-three studies from 16 articles/N1,036: 12 randomized experiments, nine nonrandom experiments and two observational studies. Authors rate divergent-thinking evidence moderate and convergent-thinking evidence very uncertain using GRADE; this site has not independently performed GRADE.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	walking2: researchSource("Give your ideas some legs: The positive effect of walking on creative thinking.", "Journal of Experimental Psychology: Learning, Memory, and Cognition", 2014, "https://doi.org/10.1037/a0036577", "10.1037/a0036577", "Four experiments examine immediate and residual creative-task effects. The 81% figure describes participants whose divergent-thinking scores improved, not an 81% increase in creativity or a broad intelligence effect.", "context", "supports", novemberArtsCreativityResearchCheckedAt),
	walking3: researchSource("Motor restrictions impair divergent thinking during walking and during sitting", "Psychological Research", 2022, "https://doi.org/10.1007/s00426-021-01636-w", "10.1007/s00426-021-01636-w", "Three movement/restriction experiments show that unrestrained sitting as well as walking can support divergent thinking. Eye-blink relationships vary by experiment and restriction condition, without proving one mechanism.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	arts1: researchSource("Investigating the Causal Effects of Arts Education", "Journal of Policy Analysis and Management", 2023, "https://doi.org/10.1002/pam.22449", "10.1002/pam.22449", "Randomized arts-opportunity intervention across 42 Houston schools reports writing, disciplinary and empathy outcomes. It does not establish improvement in every school subject. Journal issue 2023, indexed 2022.", "landmark_study", "supports", novemberArtsCreativityResearchCheckedAt),
	arts2: researchSource("Arts in Education: A Systematic Review of Competency Outcomes in Quasi-Experimental and Experimental Studies", "Frontiers in Psychology", 2021, "https://doi.org/10.3389/fpsyg.2021.623935", "10.3389/fpsyg.2021.623935", "Twenty-four articles describing 26 experimental/quasi-experimental evaluations across arts domains and competencies. Small samples, sparse studies and varied effects limit general academic-transfer conclusions.", "systematic_review", "context", novemberArtsCreativityResearchCheckedAt),
	museums3: researchSource("An Experimental Evaluation of Culturally Enriching Field Trips", "Journal of Human Resources", 2024, "https://doi.org/10.3368/jhr.1020-11242r1", "10.3368/jhr.1020-11242r1", "Randomized repeated culturally enriching field trips in grades four/five found academic and attendance benefits, but no empathy or social-perspective-taking effect. The multi-venue program is not a museum-only critical-thinking test. Journal issue 2024, online 2022.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	exercise1: researchSource("Effects of music in exercise and sport: A meta-analytic review.", "Psychological Bulletin", 2020, "https://doi.org/10.1037/bul0000216", "10.1037/bul0000216", "139 studies, 598 effects and 3,599 participants. Average performance g = 0.31 is not a 31% gain; perceived effort and heart rate are separate outcomes, with no clear heart-rate benefit. Journal issue 2020, online 2019.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	exercise2: researchSource("Effects of listening to music during aerobic exercise on performance, fatigue, and psychological responses in physically active adults: a systematic review and meta-analysis", "Frontiers in Sports and Active Living", 2026, "https://doi.org/10.3389/fspor.2026.1860752", "10.3389/fspor.2026.1860752", "Fifteen aerobic-exercise studies/N339. Authors rate perceived-exertion evidence moderate, fixed-duration performance low and time-to-exhaustion very low using GRADE. The very heterogeneous exhaustion estimate is not a reliable universal performance prediction.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	exercise3: researchSource("Effects of preferred music listening on physical and psychological parameters in sports: a systematic review and meta-analysis with meta-regression", "BMC Sports Science, Medicine and Rehabilitation", 2025, "https://doi.org/10.1186/s13102-025-01470-2", "10.1186/s13102-025-01470-2", "Forty-one preferred-music studies compare nonpreferred and no-music conditions. Some strength/power and perceived-effort effects were positive, while speed and aerobic-endurance advantages were absent; subgroup comparisons were heterogeneous.", "meta_analysis", "context", novemberArtsCreativityResearchCheckedAt),
	sleep1: researchSource("Listening to music for insomnia in adults", "Cochrane Database of Systematic Reviews", 2022, "https://doi.org/10.1002/14651858.cd010459.pub3", "10.1002/14651858.cd010459.pub3", "Cochrane update includes 13 trials/N1,007. Moderate-certainty subjective sleep-quality findings differ from very uncertain insomnia-severity and limited objective outcomes. PSQI differences are questionnaire points, not hours slept; absent adverse-event reports do not prove safety.", "systematic_review", "supports", novemberArtsCreativityResearchCheckedAt),
	sleep2: researchSource("Effects of music-based interventions on sleep quality in older adults: a systematic review and meta-analysis", "Frontiers in Psychiatry", 2026, "https://doi.org/10.3389/fpsyt.2026.1761499", "10.3389/fpsyt.2026.1761499", "Fourteen older-adult trials/N1,730 mainly assess PSQI and other symptom scales. Session and duration subgroups are study-level associations, not randomized proof of an ideal regimen.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	sleep3: researchSource("Effect of music therapy on improving sleep quality in older adults: A systematic review and meta‐analysis", "Journal of the American Geriatrics Society", 2021, "https://doi.org/10.1111/jgs.17149", "10.1111/jgs.17149", "Five randomized trials in adults aged at least 60 primarily measure PSQI. Music-type and duration subgroup findings do not establish individual treatment prescriptions or objective sleep-duration gains.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	mozart1: researchSource("Mozart effect–Shmozart effect: A meta-analysis", "Intelligence", 2010, "https://doi.org/10.1016/j.intell.2010.03.001", "10.1016/j.intell.2010.03.001", "Nearly 40 studies and over 3,000 participants. Mozart-versus-nonmusic effects were similar to other-music-versus-nonmusic effects; the between-music estimate was small. Publication bias and laboratory affiliation affected results.", "meta_analysis", "debate", novemberArtsCreativityResearchCheckedAt),
	mozart2: {
		...researchSource("Listening to Mozart enhances spatial-temporal reasoning: towards a neurophysiological basis", "Neuroscience Letters", 1995, "https://doi.org/10.1016/0304-3940(94)11221-4", "10.1016/0304-3940(94)11221-4", "Early positive behavioral study reports immediate spatial-temporal task gains in college students, without short-term memory benefit. It does not establish long-term intelligence improvement or validate proposed neural mechanisms.", "context", "supports", novemberArtsCreativityResearchCheckedAt),
		statusSources: [
			"https://doi.org/10.1016/0304-3940(94)11221-4",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2F0304-3940%2894%2911221-4&rows=100"
		]
	},
	mozart3: researchSource("The Mystery of the Mozart Effect: Failure to Replicate", "Psychological Science", 1999, "https://doi.org/10.1111/1467-9280.00169", "10.1111/1467-9280.00169", "Replication following the original investigators' procedural guidance found neither a statistically significant Mozart effect nor an effect size suggesting practical significance.", "context", "debate", novemberArtsCreativityResearchCheckedAt),
	pain1: {
		...researchSource("The Effects of Music on Pain: A Meta-Analysis", "Journal of Music Therapy", 2016, "https://doi.org/10.1093/jmt/thw012", "10.1093/jmt/thw012", "Review of 97 pain-intervention RCTs from 1995–2014. A 2021 publisher erratum corrected incorrect supplementary material. Pain ratings, analgesic use and physiological measures remain separate outcomes.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1093/jmt/thw012",
			"https://api.crossref.org/works?filter=updates%3A10.1093%2Fjmt%2Fthw012&rows=100",
			"https://doi.org/10.1093/jmt/thab012"
		]
	},
	pain2: researchSource("The effect of music therapy for patients with chronic pain: systematic review and meta-analysis", "BMC Psychology", 2025, "https://doi.org/10.1186/s40359-025-02643-x", "10.1186/s40359-025-02643-x", "Nine chronic-pain RCTs/N787 found pain and depression benefits, with no clear anxiety or quality-of-life benefit. Setting and session moderators are not randomized comparisons or individual treatment instructions.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	pain3: researchSource("Benefits of Music Intervention on Anxiety, Pain, and Physiologic Response in Adults Undergoing Surgery: A Systematic Review and Meta-analysis", "Asian Nursing Research", 2023, "https://doi.org/10.1016/j.anr.2023.05.002", "10.1016/j.anr.2023.05.002", "Thirty surgical-patient RCTs/N2,280 report symptom and physiological outcomes. Standardized pain and anxiety effects are not percentage improvements; intervention-duration subgroups do not establish a universal optimal session.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	anxiety1: researchSource("Music therapy for the treatment of anxiety: a systematic review with multilevel meta-analyses", "eClinicalMedicine", 2025, "https://doi.org/10.1016/j.eclinm.2025.103293", "10.1016/j.eclinm.2025.103293", "Fifty-one studies/93 effects concern qualified-therapist interventions. Reported anxiety improved, while the physiological estimate was nonsignificant. Study count differs from effect count and ordinary self-directed listening is a separate intervention.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	anxiety2: researchSource("Is music listening an effective intervention for reducing anxiety? A systematic review and meta-analysis of controlled studies", "Musicae Scientiae", 2023, "https://doi.org/10.1177/10298649211046979", "10.1177/10298649211046979", "Twenty-four controlled listening studies were reviewed, 21 pooled, for naturally occurring state anxiety. Further diagnosed-clinical-group evidence was needed. Journal issue 2023, indexed 2022.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	anxiety3: researchSource("Music for anxiety? Meta-analysis of anxiety reduction in non-clinical samples", "Psychology of Music", 2018, "https://doi.org/10.1177/0305735617712424", "10.1177/0305735617712424", "Nineteen articles in healthy participants found reduced self-reported anxiety without a significant pooled psychophysiological effect. Heterogeneity and methodological weaknesses limit clinical extrapolation.", "meta_analysis", "context", novemberArtsCreativityResearchCheckedAt),
	literacy1: researchSource("Does Music Training Enhance Literacy Skills? A Meta-Analysis", "Frontiers in Psychology", 2015, "https://doi.org/10.3389/fpsyg.2015.01777", "10.3389/fpsyg.2015.01777", "Thirteen controlled studies/N901 held reading instruction constant. Small phonological-awareness gains did not produce a significant pooled reading-fluency effect; precursor skills and actual reading outcomes differ.", "meta_analysis", "context", novemberArtsCreativityResearchCheckedAt),
	literacy2: researchSource("Music-based and auditory-based interventions for reading difficulties: A literature review", "Heliyon", 2022, "https://doi.org/10.1016/j.heliyon.2022.e09293", "10.1016/j.heliyon.2022.e09293", "Eighteen struggling-reader studies include musical, auditory and combined reading interventions. Reading effects were positive but inconsistent; the whole evidence pool is not exclusively music instruction.", "systematic_review", "context", novemberArtsCreativityResearchCheckedAt),
	literacy3: researchSource("The effect of music education approaches on phonological awareness and early literacy: A systematic review", "The Australian Journal of Language and Literacy", 2021, "https://doi.org/10.1007/bf03652064", "10.1007/bf03652064", "Five heterogeneous articles from 1975–2013 compare named music-education approaches in typically developing five- to eight-year-olds. Narrative findings do not establish a best approach or direct method-specific effects.", "systematic_review", "context", novemberArtsCreativityResearchCheckedAt),
	pitch1: researchSource("Learning fast and accurate absolute pitch judgment in adulthood", "Psychonomic Bulletin & Review", 2025, "https://doi.org/10.3758/s13423-024-02620-2", "10.3758/s13423-024-02620-2", "Twelve adult musicians trained in note identification. High accuracy applied to selected learned pitches; average overall trained-timbre accuracy rose from 13.9% to 31.7%, not near-perfect performance on every note. Transfer was partial.", "context", "supports", novemberArtsCreativityResearchCheckedAt),
	pitch2: researchSource("Absolute pitch can be learned by some adults", "PLOS ONE", 2019, "https://doi.org/10.1371/journal.pone.0223047", "10.1371/journal.pone.0223047", "Some adults reached very high test performance, with most improving modestly. A best learner retained performance for at least four months. Results do not guarantee all adults achieve absolute pitch. Canonical publication 2019, indexed 2018.", "landmark_study", "supports", novemberArtsCreativityResearchCheckedAt),
	pitch3: researchSource("Octave equivalence and the incidental learning of absolute pitch", "Attention, Perception, & Psychophysics", 2026, "https://doi.org/10.3758/s13414-026-03321-9", "10.3758/s13414-026-03321-9", "Three incidental-learning experiments distinguish pitch chroma and height. Nonmusicians showed very small effects; Shepard-tone learning did not transfer to piano tones. This limits claims of broad naturalistic absolute pitch.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	violin1: researchSource("Player preferences among new and old violins", "Proceedings of the National Academy of Sciences", 2012, "https://doi.org/10.1073/pnas.1114999109", "10.1073/pnas.1114999109", "Twenty-one experienced players blind-tested three old and three high-quality new violins. Preferences and age identification concern a small selected sample, not all instruments or monetary value.", "landmark_study", "debate", novemberArtsCreativityResearchCheckedAt),
	violin2: researchSource("Soloist evaluations of six Old Italian and six new violins", "Proceedings of the National Academy of Sciences", 2014, "https://doi.org/10.1073/pnas.1323367111", "10.1073/pnas.1323367111", "Ten soloists tested six Old Italian and six new violins under blinded conditions; six chose a new instrument for a hypothetical tour. Selected instruments and short sessions limit generalization.", "context", "debate", novemberArtsCreativityResearchCheckedAt),
	violin3: researchSource("Listener evaluations of new and Old Italian violins", "Proceedings of the National Academy of Sciences", 2017, "https://doi.org/10.1073/pnas.1619443114", "10.1073/pnas.1619443114", "Two listener experiments compare three new violins with three Stradivaris, including orchestral projection. New instruments were generally preferred and projected better in this sample; this is not a universal instrument ranking.", "context", "debate", novemberArtsCreativityResearchCheckedAt),
	violin4: researchSource("A listening experiment comparing the timbre of two Stradivari with other violins", "The Journal of the Acoustical Society of America", 2022, "https://doi.org/10.1121/10.0009320", "10.1121/10.0009320", "Seventy Cremona-area violin makers rated blinded timbre comparisons, with preference converging on one Stradivari. This contrasts with some earlier new-violin preferences and emphasizes individual specimens and evaluation tasks.", "context", "supports", novemberArtsCreativityResearchCheckedAt),
	expertise1: researchSource("The role of expertise and culture in visual art appreciation", "Scientific Reports", 2022, "https://doi.org/10.1038/s41598-022-14128-7", "10.1038/s41598-022-14128-7", "Two preregistered experiments compare Indian/Western experts and novices across paintings and dance. Expertise moderation differed by culture and art form; existing expertise was not randomly assigned.", "landmark_study", "supports", novemberArtsCreativityResearchCheckedAt),
	expertise2: researchSource("The Influence of Art Expertise and Training on Emotion and Preference Ratings for Representational and Abstract Artworks", "PLOS ONE", 2015, "https://doi.org/10.1371/journal.pone.0134241", "10.1371/journal.pone.0134241", "Sixty participants, including 20 experts, rated art in laboratory and museum settings. Aesthetic but not affective expert–novice differences were found; brief novice training had a small preference effect.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	expertise3: researchSource("How Context and Painting Attributes Affect Aesthetic Judgment Across Expertise", "Empirical Studies of the Arts", 2025, "https://doi.org/10.1177/02762374241262606", "10.1177/02762374241262606", "Randomized viewing conditions varied setting, reputation and style across existing expertise groups. Randomizing conditions does not randomize expertise. Journal issue 2025, first online 2024.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	museums1: researchSource("Measuring Critical Thinking: Results From an Art Museum Field Trip Experiment", "Journal of Research on Educational Effectiveness", 2016, "https://doi.org/10.1080/19345747.2015.1086915", "10.1080/19345747.2015.1086915", "Art-museum research builds on earlier school-visit data and adds a validation experiment using another art style. Outcomes concern critical examination of artworks, not demonstrated transfer to all reasoning domains.", "context", "supports", novemberArtsCreativityResearchCheckedAt),
	museums2: researchSource("Learning to Think Critically", "Educational Researcher", 2014, "https://doi.org/10.3102/0013189x13512675", "10.3102/0013189x13512675", "Lottery-based School Visit Program experiment involving 3,811 students at Crystal Bridges found stronger analysis of a new painting. Related later publications are not wholly independent copies of the original experiment.", "landmark_study", "supports", novemberArtsCreativityResearchCheckedAt),
	drama1: researchSource("The impact of theatre on social competencies: a meta-analytic evaluation", "Arts & Health", 2023, "https://doi.org/10.1080/17533015.2022.2130947", "10.1080/17533015.2022.2130947", "Twenty-one theatre studies/N4,064 report varied social-competence effects, with no corroborated self-concept benefit. Active participation, communication, tolerance and empathy are distinct outcomes. Journal issue 2023, online 2022.", "meta_analysis", "supports", novemberArtsCreativityResearchCheckedAt),
	arts3: researchSource("The effects of educational drama on students’ key competencies: a systematic review and meta-analysis", "Frontiers in Psychology", 2026, "https://doi.org/10.3389/fpsyg.2026.1870089", "10.3389/fpsyg.2026.1870089", "Twenty-seven educational-drama studies/N2,239 with highly heterogeneous effects. Collaboration lost significance after removing the largest-effect study. Formal design-specific RoB 2/ROBINS-I assessments were absent; competencies are not academic attainment.", "meta_analysis", "context", novemberArtsCreativityResearchCheckedAt),
	drama2: researchSource("Observed changes in social-emotional and moral development following creative drama activities in primary school children", "Humanities and Social Sciences Communications", 2026, "https://doi.org/10.1057/s41599-026-06983-w", "10.1057/s41599-026-06983-w", "One-group pre/post study of 15 volunteer children aged 8–11. Reported score increases have no randomized or concurrent control comparison and cannot establish a causal program effect.", "context", "context", novemberArtsCreativityResearchCheckedAt),
	chess2: researchSource("Chess Instruction Improves Cognitive Abilities and Academic Performance: Real Effects or Wishful Thinking?", "Educational Psychology Review", 2022, "https://doi.org/10.1007/s10648-022-09670-9", "10.1007/s10648-022-09670-9", "Methodological review of 45 intervention studies/N12,705 across 19 countries raises power, publication-bias and replication concerns, especially for academic attainment. It does not establish that all reported benefits are absent.", "context", "debate", novemberArtsCreativityResearchCheckedAt),
	chess3: researchSource("The Effects of Chess Instruction on Academic and Non-cognitive Outcomes: Field Experimental Evidence from a Developing Country", "Journal of Development Economics", 2021, "https://doi.org/10.1016/j.jdeveco.2020.102615", "10.1016/j.jdeveco.2020.102615", "Randomized school field experiment found math and several non-risk-preference results less conclusive after multiple-hypothesis adjustment. Other academic, creativity and attention effects were not detected. Journal issue 2021, indexed 2019.", "landmark_study", "context", novemberArtsCreativityResearchCheckedAt),
	chess4: researchSource("The chess palace complex skills development programme in primary school", "International Journal of Mathematical Education in Science and Technology", 2025, "https://doi.org/10.1080/0020739x.2025.2514103", "10.1080/0020739x.2025.2514103", "Thirty-pupil short Chess Palace report describes intervention and control groups, but highlights a paired pre/post analysis. Random allocation and a clear between-group academic effect are not established by its abstract.", "context", "context", novemberArtsCreativityResearchCheckedAt)
};

export const novemberArtsCreativityClaims = [
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "do-music-lessons-improve-general-thinking-skills",
		title: "Do music lessons improve general thinking skills?",
		bottomLine: "The evidence is mixed. Some reviews find small gains outside music, while others find little or no benefit after accounting for study design. Musical training should not be presented as a reliable way to raise general intelligence.",
		stableCore: [
			"A 2022 synthesis of instrumental programs found small average cognitive and academic gains, alongside an advantage already present before training in self-selected groups.",
			"Other syntheses found that stronger designs and active comparison activities reduced or removed the apparent benefits. The reviews overlap and use different definitions of training."
		],
		openQuestions: [
			"Which specific skills, if any, improve beyond the musical tasks being practiced?",
			"Do any gains persist when practice time, expectations and other activities are matched?"
		],
		whatWouldChangeMinds: [
			"Independent randomized trials with active comparisons and delayed measures of untrained abilities.",
			"Transparent reanalyses that account for starting differences and overlapping study samples."
		],
		misconceptions: [
			"Better performance before music lessons cannot be an effect of those lessons.",
			"Memory tasks, academic tests and general intelligence measure different abilities."
		],
		editorSummary: "Evidence for broad cognitive transfer from music lessons is disputed and sensitive to study design.",
		population: "Children and adolescents in controlled music-training studies and overlapping research syntheses.",
		scope: "Assess transfer from music instruction to untrained cognitive abilities, distinguishing baseline selection and the design of comparison activities.",
		excludedEvidence: [
			"Do not equate musical achievement or correlations between musicians and nonmusicians with causal intelligence gains.",
			"Keep reading-specific outcomes separate from the wider cognitive-transfer question."
		],
		uncertainty: "Training definitions, controls and analysis choices lead to conflicting estimates, with relatively few strong independent tests.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.music1,
			sources.music2,
			sources.music3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "does-reading-fiction-improve-empathy",
		title: "Does reading fiction improve empathy?",
		bottomLine: "It may have a small average benefit on tests of empathy and understanding other minds. Effects vary with the text, comparison activity and test. Reading a story has not been shown to reliably make someone kinder in everyday life.",
		stableCore: [
			"A preregistered synthesis of 70 experiments found small cognitive effects, with detectable benefits concentrated in empathy and mentalizing measures.",
			"The original literary-fiction experiments reported temporary theory-of-mind gains. Later preregistered replications produced mixed results, including inconsistent findings about moral judgments."
		],
		openQuestions: [
			"Do small test-score differences last or change how people treat others?",
			"Which texts, readers and comparison activities account for the variation?"
		],
		whatWouldChangeMinds: [
			"Large preregistered trials with active reading controls and delayed behavioral outcomes.",
			"Independent replications separating empathy reports, mental-state tests and actual prosocial behavior."
		],
		misconceptions: [
			"A standardized effect of 0.14 is not a 14% increase in empathy.",
			"Associations with a lifetime of reading do not establish that reading caused those differences."
		],
		editorSummary: "Fiction reading shows small, variable social-cognitive effects, with uncertain everyday transfer.",
		population: "Participants in fiction-reading experiments and studies of lifetime print exposure.",
		scope: "Assess experimental fiction-reading effects on empathy and mentalizing, keeping correlational exposure and real behavior distinct.",
		excludedEvidence: [
			"Do not combine 70 experiments with 114 correlational studies as one causal evidence pool.",
			"Do not describe mixed preregistered replications as uniformly successful or uniformly conclusive failures."
		],
		uncertainty: "Test outcomes, active controls and replication results vary, while lasting real-world effects remain less clear.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.fiction1,
			sources.fiction2,
			sources.fiction3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "can-creativity-be-improved-through-training",
		title: "Can creativity be improved through training?",
		bottomLine: "Yes, training can improve performance on creative-thinking tasks. The average benefit appears smaller after accounting for publication bias. It is less clear how much transfers to lasting creative work outside the training setting.",
		stableCore: [
			"A large 2024 review found positive average training effects but substantial publication bias and widespread weaknesses in study design.",
			"Reviews in primary schools and universities also found benefits on creativity measures. Their populations and study pools differ, and some underlying evidence overlaps."
		],
		openQuestions: [
			"Which gains persist on unfamiliar tasks and meaningful creative projects?",
			"Which training methods work best in strong comparisons with equal time and attention?"
		],
		whatWouldChangeMinds: [
			"Preregistered trials with active controls, reliable scoring and delayed transfer measures.",
			"Complete reporting of unsuccessful programs and unpublished results."
		],
		misconceptions: [
			"Publication-bias adjustment does not reveal a perfectly known true effect.",
			"Improvement on a divergent-thinking test is not proof of greater artistic or professional achievement."
		],
		editorSummary: "Creativity training helps tested performance, with smaller bias-adjusted estimates and uncertain wider transfer.",
		population: "Participants in creativity training across ages, including primary-school and university students.",
		scope: "Assess training against measured creative performance while distinguishing publication-bias adjustments and transfer beyond practiced tasks.",
		excludedEvidence: [
			"Do not treat 844 effect sizes from 169 studies as 844 independent experiments.",
			"Do not sum overlapping school, university and broader syntheses into a single trial count."
		],
		uncertainty: "Publication bias, weak comparisons and variable outcome measures limit precise estimates and claims of lasting transfer.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.creativity1,
			sources.creativity2,
			sources.creativity3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "does-taking-a-break-help-creative-problem-solving",
		title: "Does taking a break help creative problem-solving?",
		bottomLine: "It can. Setting a problem aside sometimes helps people return with more ideas or a solution. Benefits depend on the problem and what happens during the break. Evidence does not establish that uncontrolled mind wandering is the reason it works.",
		stableCore: [
			"A meta-analysis found a positive average incubation effect, with different results for idea generation and insight problems.",
			"Later experiments distinguish fixation, example exposure and task type. A 2025 study found no significant divergent-thinking benefit linked to mind wandering, despite improved fluency after incubation."
		],
		openQuestions: [
			"Which breaks help complex real-world problems rather than short laboratory tasks?",
			"How do preparation, task difficulty and competing demands influence later performance?"
		],
		whatWouldChangeMinds: [
			"Preregistered comparisons of matched breaks with delayed real-world creative outcomes.",
			"Experiments that distinguish the effect of a break from reported thought patterns during it."
		],
		misconceptions: [
			"A break helping performance does not prove a single unconscious mechanism.",
			"Self-reported mind wandering is not the same as a randomly assigned mental state."
		],
		editorSummary: "Incubation can help some creative tasks, with context-dependent effects and uncertain mechanisms.",
		population: "Participants in laboratory incubation, insight and divergent-thinking studies.",
		scope: "Assess setting aside a prepared problem against later solution or idea-generation performance, separating breaks, fixation and reported mind wandering.",
		excludedEvidence: [
			"Do not generalize masked-prime experiments into an explanation for every ordinary break.",
			"Keep repeated-item fluency, novel-item accuracy and subjective thought reports as separate outcomes."
		],
		uncertainty: "Problem type, break activity and measurement strongly affect results; real-world transfer and mechanisms remain uncertain.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.incubation1,
			sources.incubation2,
			sources.incubation3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "how-do-constraints-affect-creativity",
		title: "How do constraints affect creativity?",
		bottomLine: "Constraints can help or hinder creative work. A limit may focus a task, while a different limit may block useful options. Research does not support a rule that fewer constraints always produce better ideas.",
		stableCore: [
			"A synthesis of 111 studies found a positive average relationship between constraints and creativity, with substantial differences by study design and measurement.",
			"Integrative reviews distinguish deadlines, resource limits and task rules. Conceptual models explain possible mechanisms but are not additional experimental proof."
		],
		openQuestions: [
			"Which constraints help particular tasks without removing useful resources or autonomy?",
			"How much do laboratory results transfer to sustained creative projects?"
		],
		whatWouldChangeMinds: [
			"Experiments that vary clearly defined constraints while measuring useful and original output.",
			"Independent field replications separating task rules, time pressure and resource scarcity."
		],
		misconceptions: [
			"An average positive relationship does not mean deprivation improves creativity.",
			"A proposed taxonomy or mechanism is not a validated causal intervention."
		],
		editorSummary: "Constraints have varied effects on creativity, with no universal advantage for either restriction or freedom.",
		population: "Participants and organizations in multidisciplinary studies of constraints and creative performance.",
		scope: "Assess defined constraints against creative outcomes, distinguishing observational relationships, experimental manipulations and theoretical explanations.",
		excludedEvidence: [
			"Do not treat financial scarcity, task instructions and deadlines as one interchangeable intervention.",
			"Do not count the conceptual IConIC model as a separate controlled-effectiveness synthesis."
		],
		uncertainty: "Definitions and outcomes vary widely, and methodological differences explain part of the conflicting findings.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.constraints1,
			sources.constraints2,
			sources.constraints3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "how-do-rewards-affect-creative-performance",
		title: "How do rewards affect creative performance?",
		bottomLine: "The effect depends on what is rewarded and how. Rewards tied to creative output can support creativity, especially with useful feedback and choice. Rewards tied only to completing a task can have different effects. Pay changes cannot be prescribed from these averages.",
		stableCore: [
			"A synthesis of 60 experimental and observational studies found different patterns for creativity-, performance- and completion-contingent rewards.",
			"Workplace surveys link recognition and social rewards with motivation and creative performance, but do not randomly assign rewards or establish that changing pay causes the observed differences."
		],
		openQuestions: [
			"Which reward arrangements produce lasting useful creativity in real organizations?",
			"How do task demands, feedback and individual motivation interact?"
		],
		whatWouldChangeMinds: [
			"Field experiments assigning reward conditions with reliable, independently rated creative outcomes.",
			"Replications separating reward type from autonomy, recognition and prior performance."
		],
		misconceptions: [
			"A reward's association with motivation does not establish its causal effect on creativity.",
			"Evidence about intrinsic motivation alone is separate from measured creative performance."
		],
		editorSummary: "Reward effects on creativity depend on their conditions; workplace associations do not establish pay-policy effects.",
		population: "Children and adults in reward experiments and employees in product-development and consulting surveys.",
		scope: "Assess reward contingencies against creative output, keeping motivation, observational workplace patterns and experimental effects distinct.",
		excludedEvidence: [
			"Do not infer that reducing financial rewards would increase creativity from survey associations.",
			"Do not present the unsupported transactional-reward moderation hypothesis as a positive finding."
		],
		uncertainty: "Reward definitions, task settings and designs differ, and much workplace evidence is observational.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.rewards1,
			sources.rewards2,
			sources.rewards3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "does-walking-help-people-generate-creative-ideas",
		title: "Does walking help people generate creative ideas?",
		bottomLine: "Walking can help people generate more varied ideas on short creative tasks. Evidence is clearer for this kind of idea generation than for finding one correct solution. It does not establish a universal boost to every kind of creative work.",
		stableCore: [
			"A 2026 synthesis found benefits for divergent thinking across walking studies, including randomized comparisons. Evidence for convergent thinking was very uncertain.",
			"Earlier experiments found more ideas during and shortly after walking. Other work suggests that movement restrictions also matter: unrestricted sitting can help some tasks."
		],
		openQuestions: [
			"Do short-task gains persist in everyday artistic, academic or professional projects?",
			"How much is explained by walking itself, freedom of movement or the surrounding setting?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with matched comparison activities and real-world creative outcomes.",
			"Replications across ages and mobility needs that distinguish idea generation from solution accuracy."
		],
		misconceptions: [
			"A study saying 81% of participants improved does not mean an 81% improvement in scores.",
			"A standardized effect of 0.93 is not a 93% increase in creativity."
		],
		editorSummary: "Walking supports short-task idea generation, with less certain effects on finding a single correct answer.",
		population: "Participants in walking and creative-thinking studies, mostly postsecondary students.",
		scope: "Compare walking and nonwalking conditions on divergent and convergent thinking, separating freedom of movement and contextual factors.",
		excludedEvidence: [
			"Do not count 23 studies from 16 articles as 23 separate publications or all as randomized trials.",
			"Keep the review authors' GRADE assessment separate from this site's nonformal appraisal."
		],
		uncertainty: "Samples are limited and outcomes are mostly brief tests; transfer and mechanisms remain less well established.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.walking1,
			sources.walking2,
			sources.walking3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-arts-programs-improve-school-achievement",
		title: "Do arts programs improve school achievement?",
		bottomLine: "Some programs improve particular school outcomes, but broad academic gains are not assured. Trials have found benefits for writing or later achievement in some settings. These results do not establish that every arts class raises scores in other subjects.",
		stableCore: [
			"A 42-school Houston trial found writing benefits from expanded arts opportunities. A review of 26 evaluations found limited and varied evidence across art forms and outcomes.",
			"A separate field-trip experiment found later academic and attendance benefits, without gains on all social-emotional measures. Field trips and classroom arts instruction are different programs."
		],
		openQuestions: [
			"Which benefits persist and transfer across subjects and school settings?",
			"How much depends on program quality, access, attendance and surrounding instruction?"
		],
		whatWouldChangeMinds: [
			"Independent large school trials with prespecified academic outcomes and longer follow-up.",
			"Comparisons separating extra resources and enrichment time from particular arts activities."
		],
		misconceptions: [
			"A writing benefit does not establish a mathematics or reading benefit.",
			"A finding from one enrichment program does not establish the same effect for a different arts curriculum."
		],
		editorSummary: "Arts programs can improve specific school outcomes; evidence for general academic transfer remains uneven.",
		population: "School students in arts-opportunity, arts-education and culturally enriching field-trip evaluations.",
		scope: "Assess arts education and enrichment against academic achievement, separating program types, subjects and follow-up periods.",
		excludedEvidence: [
			"Do not substitute drama communication or creativity scores for academic attainment.",
			"Do not treat the Houston and field-trip interventions as identical curricula or universal program effects."
		],
		uncertainty: "Programs, outcome measures and settings vary, with relatively few strong long-term evaluations.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.arts1,
			sources.arts2,
			sources.museums3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "does-listening-to-music-improve-exercise-performance",
		title: "Does listening to music improve exercise performance?",
		bottomLine: "On average, music can provide a small performance benefit and make exercise feel easier. Effects depend on the task and music, and some outcomes show little benefit. It is not a fixed performance gain for every workout.",
		stableCore: [
			"A synthesis of 139 studies found positive average performance and perceived-effort effects, without a clear heart-rate benefit.",
			"Newer reviews find more consistent reductions in perceived effort than improvements across all performance measures. Preferred music showed some strength and power benefits, with less consistent aerobic-endurance and speed results."
		],
		openQuestions: [
			"Which effects persist in ordinary training and competition rather than short tests?",
			"How do preferences, task demands and comparison conditions change results?"
		],
		whatWouldChangeMinds: [
			"Preregistered active-comparison trials reporting actual performance and all planned outcomes.",
			"Replications distinguishing fixed-duration performance, time to exhaustion and perceived exertion."
		],
		misconceptions: [
			"A standardized performance effect of 0.31 is not a 31% improvement.",
			"Lower perceived effort does not prove an equivalent physiological change or training adaptation."
		],
		editorSummary: "Music can support exercise performance and perceived effort, with varied effects across tasks.",
		population: "Active adults and adolescent or adult athletes in music-and-exercise studies.",
		scope: "Compare music conditions with no-music or alternative conditions using performance, perceived effort and physiological measures separately.",
		excludedEvidence: [
			"Do not treat very uncertain time-to-exhaustion effects as a reliable endurance-training prescription.",
			"Do not convert study-level preference or tempo moderators into a universal optimal playlist."
		],
		uncertainty: "Performance outcomes and comparisons differ, with high heterogeneity and low certainty for some newer estimates.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.exercise1,
			sources.exercise2,
			sources.exercise3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "sleep-and-circadian-health",
		slug: "does-listening-to-music-improve-sleep-quality",
		title: "Does listening to music improve sleep quality?",
		bottomLine: "It can improve how people rate their sleep, including adults with insomnia symptoms. Evidence is less clear for measured sleep duration, nighttime awakenings and insomnia severity. Most trials compared music with usual care or no treatment.",
		stableCore: [
			"A Cochrane review found moderate-certainty evidence of better self-reported sleep quality, but objective sleep measures did not clearly improve in the small studies that measured them.",
			"Reviews in older adults also found better sleep-quality scores. Those results rely largely on subjective questionnaires and overlapping intervention literature."
		],
		openQuestions: [
			"Do benefits last and improve daytime functioning?",
			"Which effects remain when expectations and comparison activities are better matched?"
		],
		whatWouldChangeMinds: [
			"Larger trials with active controls, objective sleep measures and longer follow-up.",
			"Clear reporting of insomnia severity, daytime outcomes and adverse events."
		],
		misconceptions: [
			"A lower sleep-quality questionnaire score is not a measured number of extra hours slept.",
			"No reported adverse events is different from a thorough safety assessment."
		],
		editorSummary: "Music supports subjective sleep quality more clearly than objective sleep measures or insomnia severity.",
		population: "Adults with sleep difficulties and older adults in randomized music-listening studies.",
		scope: "Assess music listening against subjective and objective sleep outcomes, distinguishing insomnia symptoms, severity and daytime consequences.",
		excludedEvidence: [
			"Do not interpret PSQI score differences as hours of sleep or a percentage cure rate.",
			"Do not treat duration and session-length subgroup associations as a proven optimal individual regimen."
		],
		uncertainty: "Blinding is difficult, objective studies are small and different sleep outcomes have different certainty.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.sleep1,
			sources.sleep2,
			sources.sleep3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "does-listening-to-mozart-improve-spatial-reasoning",
		title: "Does listening to Mozart improve spatial reasoning?",
		bottomLine: "Some experiments find small, brief gains on spatial tasks, but the evidence gives little support to a special Mozart advantage. Similar effects can occur with other music, and replications have been inconsistent. These tests do not show a lasting increase in intelligence.",
		stableCore: [
			"A large synthesis found similar effects for Mozart and other music when compared with silence or nonmusical conditions, with publication bias and laboratory differences.",
			"An early positive experiment and a later failed replication illustrate the inconsistency. The question concerns immediate spatial-task performance, not musical training or general intelligence."
		],
		openQuestions: [
			"Which effects reflect mood, arousal, preference or the comparison activity?",
			"How reproducible are any small immediate task effects under stronger controls?"
		],
		whatWouldChangeMinds: [
			"Large preregistered replications comparing multiple music and active control conditions.",
			"Evidence of durable transfer beyond the immediate spatial task."
		],
		misconceptions: [
			"A standardized effect of 0.37 is not a 37% increase in intelligence.",
			"Listening to music and learning an instrument are different interventions."
		],
		editorSummary: "Evidence for a unique Mozart boost is weak; any short-task effects do not establish lasting intelligence gains.",
		population: "Participants in experiments testing spatial performance immediately after listening to music or comparison stimuli.",
		scope: "Assess immediate Mozart-listening effects against other music and nonmusical controls, separating transient task scores from general intelligence.",
		excludedEvidence: [
			"Do not infer a long-term intellectual intervention from a temporary laboratory score.",
			"Do not omit other-music comparisons or the failed replication when describing the early positive results."
		],
		uncertainty: "Results vary by control activity and laboratory, with publication bias and limited evidence for durable transfer.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.mozart1,
			sources.mozart2,
			sources.mozart3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "can-music-help-reduce-pain",
		title: "Can music help reduce pain?",
		bottomLine: "Music-based interventions can reduce reported pain when added to medical care. Average benefits vary by condition, setting and intervention. Symptom relief does not show that music treats the underlying cause or can replace pain care.",
		stableCore: [
			"A broad review of randomized trials found reductions in reported pain. A 2021 publisher erratum corrected supplementary material.",
			"Newer syntheses in chronic-pain and surgical patients also found pain benefits, but other outcomes were less consistent. A chronic-pain review found no clear anxiety or quality-of-life benefit."
		],
		openQuestions: [
			"Which benefits are clinically meaningful and persist after the intervention?",
			"How do therapist-led activities, listening, expectations and usual care affect results?"
		],
		whatWouldChangeMinds: [
			"Large trials with expectation-matched controls, prespecified outcomes and longer follow-up.",
			"Clear comparisons of intervention types and changes in pain-related functioning."
		],
		misconceptions: [
			"A pain-score reduction is not proof that the underlying disease has improved.",
			"Results from a clinical intervention do not establish a universal effect for any playlist."
		],
		editorSummary: "Music can complement pain care, with variable symptom benefits and uncertain longer-term functional effects.",
		population: "Adults receiving medical care for acute, procedural or chronic pain.",
		scope: "Assess music interventions added to care against reported pain and related outcomes, separating conditions, intervention types and follow-up.",
		excludedEvidence: [
			"Do not use trial-level duration or setting moderators as individual treatment prescriptions.",
			"Keep reductions in pain, medication use, anxiety and quality of life as separate outcomes."
		],
		uncertainty: "Clinical settings and intervention designs differ, and expectations and blinding are difficult to control.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.pain1,
			sources.pain2,
			sources.pain3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "can-music-help-reduce-anxiety",
		title: "Can music help reduce anxiety?",
		bottomLine: "Music can help lower short-term self-reported anxiety. Evidence includes both music listening and professionally delivered music therapy, which are different interventions. Effects on physiological measures and lasting clinical outcomes are less clear.",
		stableCore: [
			"A 2025 synthesis of 51 music-therapy studies found a positive average effect on reported anxiety, while physiological outcomes did not show a clear benefit.",
			"Other syntheses of listening interventions also found reduced reported state anxiety. Results in healthy or mixed samples do not establish a standalone treatment for diagnosed anxiety disorders."
		],
		openQuestions: [
			"How long do benefits last, and which approaches help people with diagnosed disorders?",
			"How much depends on preference, therapist support and the comparison condition?"
		],
		whatWouldChangeMinds: [
			"Independent trials with active controls, functional outcomes and long-term clinical follow-up.",
			"Direct comparisons separating music therapy, ordinary listening and other anxiety treatments."
		],
		misconceptions: [
			"Feeling less anxious and changes in heart rate or other physiological signals are different outcomes.",
			"Evidence about trained music therapists does not automatically apply to self-selected background music."
		],
		editorSummary: "Music supports short-term reported anxiety relief, with less certain physiological and long-term effects.",
		population: "Participants in clinical, medical, work, study and nonclinical anxiety-intervention research.",
		scope: "Assess music listening and music therapy against anxiety outcomes while separating temporary state anxiety, physiological responses and disorder treatment.",
		excludedEvidence: [
			"Do not combine 93 effects from 51 studies as 93 independent trials.",
			"Do not generalize nonclinical symptom changes into remission or prevention of anxiety disorders."
		],
		uncertainty: "Interventions and populations vary, and blinding, active comparisons and long-term outcomes remain limited.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.anxiety1,
			sources.anxiety2,
			sources.anxiety3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-music-training-help-children-learn-to-read",
		title: "Does music training help children learn to read?",
		bottomLine: "It may help children notice and work with speech sounds, but improvements in reading itself are less consistent. Studies often add music to existing reading instruction. Better sound awareness does not by itself establish faster or more accurate reading.",
		stableCore: [
			"A synthesis of 13 controlled studies found small gains in phonological awareness but no significant overall transfer to reading fluency.",
			"Reviews focused on struggling readers and named music-education approaches also found mixed or limited evidence, with varied methods and small study pools."
		],
		openQuestions: [
			"Which gains transfer to reading accuracy, comprehension and lasting classroom progress?",
			"Do effects differ between typical readers and children with reading difficulties?"
		],
		whatWouldChangeMinds: [
			"Large randomized trials holding reading instruction constant and measuring delayed reading outcomes.",
			"Independent comparisons separating music, auditory exercises and combined reading activities."
		],
		misconceptions: [
			"Phonological awareness and reading fluency are different skills.",
			"An added intervention's benefit does not establish that it can replace reading instruction."
		],
		editorSummary: "Music training shows more consistent sound-awareness gains than direct improvements in reading.",
		population: "Children in music-and-literacy studies, including typically developing learners and struggling readers.",
		scope: "Assess music-based training against phonological awareness and actual reading outcomes, separating learner groups and concurrent reading instruction.",
		excludedEvidence: [
			"Do not treat the 18-study struggling-reader review as exclusively music instruction: it includes auditory and combined interventions.",
			"Do not infer a best music-education method from the five heterogeneous articles in the approaches review."
		],
		uncertainty: "Small samples, mixed interventions and differences between precursor skills and actual reading limit transfer claims.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.literacy1,
			sources.literacy2,
			sources.literacy3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "can-adults-learn-absolute-pitch",
		title: "Can adults learn absolute pitch?",
		bottomLine: "Some adults can learn to identify notes without a reference, and a few have reached very high test performance. Many improve only modestly. Learning a limited set of notes or one sound does not establish effortless identification across all musical situations.",
		stableCore: [
			"Training studies show that high pitch-identification performance is possible for some adults, with large differences between learners.",
			"More recent work shows partial transfer and difficulty separating a note's pitch class from its height. Progress on trained notes is not the same as broad naturalistic absolute pitch."
		],
		openQuestions: [
			"Which learners achieve broad, durable performance across instruments and contexts?",
			"How well do gains persist and transfer outside the training task?"
		],
		whatWouldChangeMinds: [
			"Larger controlled studies with untrained sounds, delayed follow-up and transparent individual results.",
			"Replications distinguishing pitch-class learning from relative-pitch strategies and memorized examples."
		],
		misconceptions: [
			"High accuracy on selected trained notes is not high accuracy on every tested note.",
			"An improvement from 13.9% to 31.7% is an increase of 17.8 percentage points, not 128 percentage points."
		],
		editorSummary: "Adult absolute-pitch learning is possible for some people, with substantial limits in consistency and transfer.",
		population: "Adult musicians and nonmusicians in explicit and incidental pitch-learning experiments.",
		scope: "Assess reference-free note identification after adult training, distinguishing trained-note accuracy, pitch class, response speed and transfer.",
		excludedEvidence: [
			"Do not interpret the 12-musician study's selected-note criterion as near-perfect overall task performance.",
			"Do not generalize a best learner's success or Shepard-tone learning to all adults and everyday instruments."
		],
		uncertainty: "Samples are small and selected, individual outcomes vary widely and broad long-term transfer remains uncertain.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.pitch1,
			sources.pitch2,
			sources.pitch3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "do-old-italian-violins-sound-better-in-blind-tests",
		title: "Do old Italian violins sound better in blind tests?",
		bottomLine: "Blind tests do not show a consistent old-over-new advantage. Players and listeners have often preferred modern instruments, while another study favored a particular Stradivari. These tests compare selected violins and preferences, not every instrument or its historical value.",
		stableCore: [
			"Blinded player and listener studies found modern violins competitive with, and often preferred over, tested Old Italian instruments.",
			"A later listening experiment favored one Stradivari's timbre. Differences between individual instruments, listeners and test conditions matter more than a universal age-based ranking."
		],
		openQuestions: [
			"How well do short tests predict preferences after longer use in different halls?",
			"How representative are the selected instruments and listener groups?"
		],
		whatWouldChangeMinds: [
			"Independent blinded comparisons with larger, transparently selected instrument samples.",
			"Longer evaluations separating playing feel, timbre, projection and listener preference."
		],
		misconceptions: [
			"A favored modern violin does not prove every modern violin is better.",
			"Sound preference, historical significance and monetary value are different judgments."
		],
		editorSummary: "Blind comparisons challenge a universal Old Italian advantage while retaining substantial instrument-specific differences.",
		population: "Experienced violinists, soloists, concert listeners and violin makers in selected-instrument experiments.",
		scope: "Compare old and new violins under blinded conditions, keeping player preference, listener preference, timbre and projection distinct.",
		excludedEvidence: [
			"Do not generalize small selected-instrument samples to every Stradivari or every modern violin.",
			"Do not omit the later Stradivari-favoring timbre result when describing earlier modern-violin preferences."
		],
		uncertainty: "Few instruments and selected participants are tested, with preferences shaped by task, setting and individual taste.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.violin1,
			sources.violin2,
			sources.violin3,
			sources.violin4
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "how-does-art-expertise-relate-to-art-appreciation",
		title: "How does art expertise relate to art appreciation?",
		bottomLine: "Art expertise is associated with different preferences and judgments, especially for abstract work. The pattern varies by culture, artwork and context. Expertise does not make everyone agree or turn a preference rating into an objective measure of quality.",
		stableCore: [
			"Experiments comparing cultural groups found that expertise moderated some preferences, but the pattern did not generalize equally across cultures and art forms.",
			"Other studies found differences in aesthetic ratings without equivalent differences in emotional responses. Reputation and painting style can also interact with expertise."
		],
		openQuestions: [
			"Which patterns generalize beyond the selected cultures and artworks?",
			"How much reflects training, familiarity, self-selection or the context of viewing?"
		],
		whatWouldChangeMinds: [
			"Preregistered cross-cultural studies with broader artwork samples and transparent expertise measures.",
			"Controlled training studies separating prior preferences from changes after instruction."
		],
		misconceptions: [
			"Random assignment to a viewing condition does not randomize a person's expertise.",
			"Aesthetic preference and emotional arousal are different outcomes."
		],
		editorSummary: "Expertise relates to art judgments, with culture, reputation and measurement shaping the results.",
		population: "Art experts and novices in Indian and Western participant groups and laboratory, museum or digital-viewing studies.",
		scope: "Assess relationships between art expertise and judgments while separating cultural differences, viewing conditions and brief training effects.",
		excludedEvidence: [
			"Do not generalize a Western expertise pattern to all cultures or art forms.",
			"Do not infer that training causes every expert–novice difference from a comparison of existing groups."
		],
		uncertainty: "Expertise is usually not randomly assigned, and samples, artworks and rating scales are limited.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.expertise1,
			sources.expertise2,
			sources.expertise3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "do-art-museum-visits-improve-critical-thinking",
		title: "Do art museum visits improve critical thinking?",
		bottomLine: "Guided visits can help students analyze unfamiliar artworks. Whether those gains transfer to broad everyday reasoning is less clear. Benefits from a particular school-visit program do not establish that any museum visit improves every kind of thinking.",
		stableCore: [
			"A randomized school-visit study found stronger performance when students analyzed a new painting. Later work added a validation experiment using a different art style.",
			"A separate program of culturally enriching field trips found academic and attendance benefits, but did not establish the same art-analysis effect or gains on every social-emotional measure."
		],
		openQuestions: [
			"How durable are art-analysis gains, and do they transfer to other reasoning tasks?",
			"Which parts of the guided visit and classroom preparation contribute?"
		],
		whatWouldChangeMinds: [
			"Independent randomized replications with delayed measures beyond art interpretation.",
			"Comparisons separating museum access, guided discussion, novelty and added instructional time."
		],
		misconceptions: [
			"Critical analysis of a painting is not an all-purpose test of reasoning.",
			"Related publications can share earlier data even when later work adds a new validation experiment."
		],
		editorSummary: "Museum-visit trials support specific art-analysis gains; broader critical-thinking transfer remains uncertain.",
		population: "School students in guided art-museum visits and culturally enriching field-trip experiments.",
		scope: "Assess guided school museum visits against art-analysis performance, separating new-artwork transfer from broader academic and reasoning outcomes.",
		excludedEvidence: [
			"Do not count related Crystal Bridges publications as wholly independent replications.",
			"Keep the separate multi-venue field-trip program's academic results distinct from museum-specific critical-thinking measures."
		],
		uncertainty: "Evidence comes from particular programs and selected outcomes, with limited proof of broad or lasting reasoning transfer.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.museums1,
			sources.museums2,
			sources.museums3
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "arts-and-creativity",
		slug: "do-drama-programs-improve-social-skills",
		title: "Do drama programs improve social skills?",
		bottomLine: "They may improve some measures of communication, empathy and interaction. Results differ across skills and studies, and large estimates are sometimes sensitive to weak methods or individual studies. Broad, lasting social benefits remain less certain.",
		stableCore: [
			"A theatre synthesis found positive average social-competence effects but no clear self-concept benefit.",
			"A 2026 educational-drama synthesis found highly varied effects, with the collaboration estimate losing significance after removal of its largest-effect study. A small uncontrolled children's study cannot establish a causal benefit on its own."
		],
		openQuestions: [
			"Which gains persist in ordinary relationships outside the program?",
			"How do effects compare with other equally engaging group activities?"
		],
		whatWouldChangeMinds: [
			"Larger randomized studies with active controls, independent ratings and delayed social outcomes.",
			"Transparent sensitivity analyses and formal design-specific bias assessment."
		],
		misconceptions: [
			"A one-group pre/post improvement is not a controlled intervention effect.",
			"Communication, collaboration, self-concept and moral reasoning are different outcomes."
		],
		editorSummary: "Drama shows promising but uneven social-skill effects, with substantial concerns about generalization and study quality.",
		population: "Participants in active theatre studies and students in educational-drama programs, including a small volunteer-child sample.",
		scope: "Assess active drama participation against specific social competencies, separating controlled evidence, uncontrolled observations and outcome domains.",
		excludedEvidence: [
			"Do not describe the 15-child volunteer study as randomized or controlled.",
			"Do not treat the heterogeneous drama synthesis as a formal RoB 2 or ROBINS-I appraisal when those assessments were absent."
		],
		uncertainty: "Design quality, extreme effects and heterogeneous measures weaken estimates of broad lasting benefit.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.drama1,
			sources.arts3,
			sources.drama2
		]
	}, novemberArtsCreativityResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-school-chess-instruction-improve-academic-achievement",
		title: "Does school chess instruction improve academic achievement?",
		bottomLine: "The evidence is uncertain. Some studies report academic gains, but stronger checks weaken broad claims that chess raises school achievement. Learning chess and improving unrelated academic skills are different outcomes.",
		stableCore: [
			"A methodological review found substantial concerns about power, publication bias and replication in chess-transfer studies, especially for academic outcomes.",
			"A randomized field study found math results less conclusive after adjustment for multiple tests. A newer 30-pupil report describes short-term improvement, but its highlighted paired analysis does not establish a clear between-group effect."
		],
		openQuestions: [
			"Do benefits persist in rigorous comparisons with equally engaging activities?",
			"Which near-transfer skills improve, and do any gains reach school attainment?"
		],
		whatWouldChangeMinds: [
			"Large preregistered school trials with active controls, reliable tests and delayed follow-up.",
			"Independent replications that report every planned outcome and correct for multiple testing."
		],
		misconceptions: [
			"A significant pre/post change does not prove improvement over a control group.",
			"One positive result among many tests is less persuasive without accounting for multiple comparisons."
		],
		editorSummary: "Claims that school chess improves academic attainment remain limited by study quality and inconsistent controlled results.",
		population: "Primary-school students in chess-instruction research across multiple countries.",
		scope: "Assess transfer from school chess instruction to academic achievement, separating chess skill, pre/post change and controlled academic outcomes.",
		excludedEvidence: [
			"Do not present the small Chess Palace report as a verified randomized trial or a clear between-group result.",
			"Keep cognitive tasks, preferences and school attainment as separate outcomes rather than pooling them as one benefit."
		],
		uncertainty: "Methodological weaknesses, small or selected samples and multiple outcome testing limit causal and general claims.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.chess2,
			sources.chess3,
			sources.chess4
		]
	}, novemberArtsCreativityResearchCheckedAt)
];
