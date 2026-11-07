import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberExerciseRecoveryResearchCheckedAt = "2026-11-07T12:37:29.000Z";

const sources = {
	massageSport: {
		...researchSource("Effect of sports massage on performance and recovery: a systematic review and meta-analysis", "BMJ Open Sport & Exercise Medicine", 2020, "https://doi.org/10.1136/bmjsem-2019-000614", "10.1136/bmjsem-2019-000614", "2020 synthesis of 29 studies and 1,012 participants found small soreness and flexibility benefits without clear overall gains in strength, jump, sprint or endurance. Its April 2021 correction replaces Figure 3; the corrected caption retains nonsignificant sprint, endurance and fatigue results. Feeling less sore does not establish restored sporting performance.", "meta_analysis", "context", novemberExerciseRecoveryResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1136/bmjsem-2019-000614",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fbmjsem-2019-000614&rows=100",
			"https://doi.org/10.1136/bmjsem-2019-000614corr1"
		]
	},
	massageDOMS: researchSource("Massage Alleviates Delayed Onset Muscle Soreness after Strenuous Exercise: A Systematic Review and Meta-Analysis", "Frontiers in Physiology", 2017, "https://doi.org/10.3389/fphys.2017.00747", "10.3389/fphys.2017.00747", "2017 synthesis of 11 articles found lower soreness and favorable pooled results for selected strength measures after strenuous exercise. Its 23 data points are not 23 independent trials. Comparisons mainly against no intervention, small studies and overlap with later reviews limit claims about lasting recovery or superiority to other active approaches.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	massage2023: researchSource("The Effects of Massage Therapy on Sport and Exercise Performance: A Systematic Review", "Sports", 2023, "https://doi.org/10.3390/sports11060110", "10.3390/sports11060110", "2023 systematic review included 114 articles across performance and recovery questions. It generally found little direct effect on motor performance alongside possible flexibility, comfort and delayed-soreness benefits. Diverse outcomes and study designs do not make every result an independent test of muscle repair or performance recovery.", "systematic_review", "context", novemberExerciseRecoveryResearchCheckedAt),
	foamROM: researchSource("Acute Effects of Foam Rolling on Range of Motion in Healthy Adults: A Systematic Review with Multilevel Meta-analysis", "Sports Medicine", 2020, "https://doi.org/10.1007/s40279-019-01205-7", "10.1007/s40279-019-01205-7", "2020 journal synthesis of 26 trials found greater immediate joint range of motion than no exercise, without clear superiority to stretching. The DOI and online-first record contain 2019. Acute flexibility is not proof of tissue healing or restored sporting performance, and exploratory subgroup differences do not identify an optimal routine.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	foamRecovery2023: researchSource("Acute effects of foam roller or stick massage on indirect markers from exercise-induced muscle damage in healthy individuals: A systematic review and meta-analysis", "Journal of Bodywork and Movement Therapies", 2023, "https://doi.org/10.1016/j.jbmt.2023.04.016", "10.1016/j.jbmt.2023.04.016", "2023 synthesis restricted to post-exercise roller or stick massage compared with no intervention included five studies and 151 participants, mostly men. It did not detect clear benefits for soreness or other indirect recovery measures; risk of bias was moderate or high. Imprecise null results do not prove an exact zero effect.", "meta_analysis", "debate", novemberExerciseRecoveryResearchCheckedAt),
	foamSoreness: researchSource("Preventive effect of foam rolling on muscle soreness after exercise: A systematic review and meta-analysis", "Journal of Bodywork and Movement Therapies", 2024, "https://doi.org/10.1016/j.jbmt.2024.10.009", "10.1016/j.jbmt.2024.10.009", "2024 synthesis of 16 studies and 515 participants reported lower self-rated soreness after foam rolling, contrasting with a smaller restricted review. Selection rules, outcomes and overlapping studies differ. Pain ratings and pressure thresholds are separate measures; reported symptom relief does not establish faster muscle repair or restored sporting performance.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	foamTraining: researchSource("The Effects of Foam Rolling Training on Performance Parameters: A Systematic Review and Meta-Analysis including Controlled and Randomized Controlled Trials", "International Journal of Environmental Research and Public Health", 2022, "https://doi.org/10.3390/ijerph191811638", "10.3390/ijerph191811638", "2022 synthesis of eight studies assessed repeated foam-rolling training and did not find a clear overall performance benefit. This is a different question from immediate flexibility or short-term post-exercise soreness. Small heterogeneous studies and exploratory moderators do not establish either universal ineffectiveness or a best training protocol.", "meta_analysis", "context", novemberExerciseRecoveryResearchCheckedAt),
	compression2022: researchSource("Can Compression Garments Reduce the Deleterious Effects of Physical Exercise on Muscle Strength? A Systematic Review and Meta-Analyses", "Sports Medicine", 2022, "https://doi.org/10.1007/s40279-022-01681-4", "10.1007/s40279-022-01681-4", "2022 synthesis of 19 randomized trials and 350 healthy participants found no clear overall strength-recovery advantage from garments worn during or after exercise. Specific subgroup findings do not override the pooled result. This concerns exercise recovery, not prescribed compression for a vascular condition.", "meta_analysis", "debate", novemberExerciseRecoveryResearchCheckedAt),
	compression2025: researchSource("Effects of Compression Garments on Muscle Strength and Power Recovery Post-Exercise: A Systematic Review and Meta-Analysis", "Life", 2025, "https://doi.org/10.3390/life15030438", "10.3390/life15030438", "2025 synthesis of 27 studies found small favorable standardized effects on strength and power recovery. Its populations, outcomes and models differ from the earlier strength review. Subgroup estimates are not universal benefits or personal recovery percentages, and these reviews can share underlying trials.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	compressionEndurance: researchSource("Effects of post-exercise compression garments on subsequent endurance performance and delayed-onset muscle soreness in endurance athletes: a systematic review and meta-analysis", "Frontiers in Physiology", 2026, "https://doi.org/10.3389/fphys.2026.1908148", "10.3389/fphys.2026.1908148", "2026 endurance-focused synthesis included nine studies and 158 participants. Soreness estimates favored compression directionally but were imprecise and crossed the null; certainty was very low and most bias assessments were high risk. Performance was not pooled, and limited credible blinding leaves expectation effects unresolved.", "meta_analysis", "context", novemberExerciseRecoveryResearchCheckedAt),
	stretchCochrane: researchSource("Stretching to prevent or reduce muscle soreness after exercise", "Cochrane Database of Systematic Reviews", 2011, "https://doi.org/10.1002/14651858.cd004577.pub3", "10.1002/14651858.cd004577.pub3", "Completed 2011 Cochrane update included 12 studies and found no clinically important soreness reduction. One large trial's statistically significant change was small on a 100-point scale. This is the completed pub3 review, with overlapping earlier experiments; it does not establish the effects of stretching on every other outcome.", "systematic_review", "supports", novemberExerciseRecoveryResearchCheckedAt),
	stretch2021: researchSource("The Effectiveness of Post-exercise Stretching in Short-Term and Delayed Recovery of Strength, Range of Motion and Delayed Onset Muscle Soreness: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Frontiers in Physiology", 2021, "https://doi.org/10.3389/fphys.2021.677581", "10.3389/fphys.2021.677581", "2021 recovery synthesis included 11 trials qualitatively and 10 in pooled analyses, mostly involving young men. It found no clear advantage over passive recovery for soreness or strength, with very low confidence in the cumulative evidence. Nonsignificant comparisons do not prove equivalence or rule out every small effect.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	stretch2025: researchSource("Effects of post-exercise stretching versus no stretching on lower limb muscle recovery and performance: a meta-analysis", "Frontiers in Physiology", 2025, "https://doi.org/10.3389/fphys.2025.1674871", "10.3389/fphys.2025.1674871", "2025 synthesis of 15 studies and 465 participants found no clear pooled improvement in soreness, strength, performance, flexibility or pain threshold from post-exercise stretching alone. It compares recovery strategies, not all longer-term flexibility training, and can share studies with earlier syntheses.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	pilatesVersus: researchSource("The effects of Pilates exercise in comparison to other forms of exercise on pain and disability in individuals with chronic non‐specific low back pain: A systematic review with meta‐analysis", "Musculoskeletal Care", 2023, "https://doi.org/10.1002/msc.1667", "10.1002/msc.1667", "2023 journal review compared Pilates with other exercise in 11 randomized trials of chronic nonspecific low-back pain. Some pain comparisons favored Pilates, but certainty was low or very low and the review found no strong basis to prefer one exercise type. Online-first and discovery records date to 2022.", "meta_analysis", "context", novemberExerciseRecoveryResearchCheckedAt),
	pilatesMeta: researchSource("Effectiveness of Pilates exercise on low back pain: a systematic review with meta-analysis", "Disability and Rehabilitation", 2024, "https://doi.org/10.1080/09638288.2023.2251404", "10.1080/09638288.2023.2251404", "2024 journal synthesis included 36 articles qualitatively and 19 in pooled analyses, comparing Pilates with no exercise or nonspecific exercise. It reported favorable pain effects. The comparator matters: benefit against no exercise does not establish superiority to every active exercise approach, and reviews can include overlapping trials.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	pilatesRCT: researchSource("Effectiveness of Pilates compared with home-based exercises in individuals with chronic non-specific low back pain: Randomised controlled trial", "Clinical Rehabilitation", 2024, "https://doi.org/10.1177/02692155241277041", "10.1177/02692155241277041", "2024 randomized clinic trial enrolled 145 adults aged 18-50 with chronic nonspecific low-back pain. Short-term pain and disability differences favored Pilates but were not clinically relevant; six-month pain and disability differences were not significant. A health-related quality-of-life utility benefit was clinically relevant. These outcomes and the full intervention packages should remain separate.", "landmark_study", "context", novemberExerciseRecoveryResearchCheckedAt),
	taiChiMeta: researchSource("Tai Chi for fall prevention and balance improvement in older adults: a systematic review and meta-analysis of randomized controlled trials", "Frontiers in Public Health", 2023, "https://doi.org/10.3389/fpubh.2023.1236050", "10.3389/fpubh.2023.1236050", "2023 synthesis of 24 randomized trials reported fewer falls and better balance with tai chi in older adults. Falling, numbers of falls and balance-test scores are separate outcomes. Subgroup comparisons between styles or schedules are not randomized proof of a universally best program, and included trials can overlap other reviews.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt),
	taiChiWHO: researchSource("Evidence on physical activity and falls prevention for people aged 65+ years: systematic review to inform the WHO guidelines on physical activity and sedentary behaviour", "International Journal of Behavioral Nutrition and Physical Activity", 2020, "https://doi.org/10.1186/s12966-020-01041-3", "10.1186/s12966-020-01041-3", "2020 WHO-informing exercise review included 116 studies overall; its tai-chi fall-rate estimate came from nine studies with moderate certainty. The overall exercise effect and the tai-chi subgroup are different estimates. The population was community-dwelling older adults, not every institutional or neurological-care setting.", "systematic_review", "supports", novemberExerciseRecoveryResearchCheckedAt),
	taiChiTrial: researchSource("Effectiveness of a Therapeutic Tai Ji Quan Intervention vs a Multimodal Exercise Intervention to Prevent Falls Among Older Adults at High Risk of Falling", "JAMA Internal Medicine", 2018, "https://doi.org/10.1001/jamainternmed.2018.3915", "10.1001/jamainternmed.2018.3915", "2018 Oregon trial randomized 670 community-dwelling adults aged 70 or older at elevated fall risk. A therapeutically adapted tai-ji-quan program reduced fall rates relative to stretching and a multimodal program. Repeated falls differ from the number of people falling; the result applies to the tested program and setting, not every informal class.", "landmark_study", "supports", novemberExerciseRecoveryResearchCheckedAt),
	activeReview: researchSource("Do We Need a Cool-Down After Exercise? A Narrative Review of the Psychophysiological Effects and the Effects on Performance, Injuries and the Long-Term Adaptive Response", "Sports Medicine", 2018, "https://doi.org/10.1007/s40279-018-0916-2", "10.1007/s40279-018-0916-2", "2018 narrative review distinguishes faster blood-lactate clearance from changes in soreness, muscle damage and later performance. Most recovery outcomes did not consistently improve, although some studies reported benefits. This is a broad narrative synthesis, not a pooled estimate establishing that every cool-down is ineffective.", "technical_reference", "context", novemberExerciseRecoveryResearchCheckedAt),
	activePerformance: researchSource("A Systematic Review on the Effectiveness of Active Recovery Interventions on Athletic Performance of Professional-, Collegiate-, and Competitive-Level Adult Athletes", "Journal of Strength and Conditioning Research", 2019, "https://doi.org/10.1519/jsc.0000000000002589", "10.1519/jsc.0000000000002589", "2019 review included 26 articles and 471 competitive adult athletes, with a literature search ending in 2014. Some interventions had favorable performance results, but approaches and outcomes varied and overall evidence was weak. Blood lactate was an unreliable recovery marker; a subgroup pattern does not establish a universal best duration.", "systematic_review", "context", novemberExerciseRecoveryResearchCheckedAt),
	activeSoccer: researchSource("Post-Exercise Recovery Modalities in Male and Female Soccer Players of All Ages and Competitive Levels: A Systematic Review", "Sports", 2025, "https://doi.org/10.3390/sports13100343", "10.3390/sports13100343", "2025 review of 41 soccer recovery studies covered many interventions, not 41 trials of active cool-down. Active approaches had variable results. A single reviewer extracted data and rated quality, and heterogeneous methods and populations limit generalization. Findings for cold-water immersion or other modalities are not effects of gentle movement.", "systematic_review", "supports", novemberExerciseRecoveryResearchCheckedAt),
	tapeOverview: researchSource("Effectiveness and clinical relevance of kinesio taping in musculoskeletal disorders: an overview of systematic reviews and evidence mapping", "BMJ Evidence-Based Medicine", 2026, "https://doi.org/10.1136/bmjebm-2025-114067", "10.1136/bmjebm-2025-114067", "2026 overview and evidence map found possible immediate or short-term pain benefits but very-low-certainty evidence and unstable clinical relevance. Later function, strength and other outcomes were less convincing, and skin irritation was reported. Review counts include published and registered unpublished reviews; overlapping reviews are not independent trials or expert votes.", "systematic_review", "context", novemberExerciseRecoveryResearchCheckedAt),
	tapeSham: researchSource("Effects of kinesio taping alone versus sham taping in individuals with musculoskeletal conditions after intervention for at least one week: a systematic review and meta-analysis", "Physiotherapy", 2019, "https://doi.org/10.1016/j.physio.2019.04.001", "10.1016/j.physio.2019.04.001", "2019 synthesis of six randomized trials compared kinesiology tape alone with sham tape for at least one week. Evidence for low-back pain and knee osteoarthritis was inconclusive and low quality, with different immediate and follow-up findings. Specific results do not establish benefit for every condition or when tape is added to another treatment.", "meta_analysis", "context", novemberExerciseRecoveryResearchCheckedAt),
	tapeMeta: researchSource("Efficacy of Kinesio Taping Compared to Other Treatment Modalities in Musculoskeletal Disorders: A Systematic Review and Meta-Analysis", "Research in Sports Medicine", 2023, "https://doi.org/10.1080/15438627.2021.1989432", "10.1080/15438627.2021.1989432", "2023 journal synthesis of 36 studies reported favorable pain and disability outcomes against other treatment approaches. It supported tape as an addition to treatment, a different comparison from tape alone versus sham. The online-first record dates to 2021; overlapping conditions, comparators and trials limit a universal effect claim.", "meta_analysis", "supports", novemberExerciseRecoveryResearchCheckedAt)
};

export const novemberExerciseRecoveryClaims = [
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "does-massage-help-recovery-after-hard-exercise",
		title: "Does massage help recovery after hard exercise?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It may ease muscle soreness and improve comfort or flexibility. That does not consistently translate into restored strength or better sporting performance. The benefit depends on which part of recovery is being measured.",
		stableCore: [
			"Some trials find lower soreness after massage.",
			"Feeling better and recovering physical performance are different outcomes.",
			"Reviews disagree more about strength and performance than about short-term soreness."
		],
		openQuestions: [
			"How much benefit remains against a credible active comparison?",
			"Which effects persist through later training or competition?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with credible comparison groups and meaningful performance outcomes.",
			"Replicated evidence that symptom relief corresponds to lasting functional recovery."
		],
		misconceptions: [
			"Less soreness proves that damaged muscle has healed faster.",
			"Several overlapping reviews represent separate sets of independent experiments."
		],
		editorSummary: "Short-term comfort can improve without a dependable performance gain.",
		population: "Mostly healthy adults studied after strenuous exercise, including recreationally active people and athletes.",
		scope: "Assess manual massage for post-exercise soreness and functional recovery, keeping perceived symptoms separate from strength and sporting performance.",
		excludedEvidence: [
			"Muscle-damage markers and pain ratings are not direct measures of complete tissue repair.",
			"Results for manual massage do not establish identical effects for every massage device or clinical pain condition."
		],
		uncertainty: "Trials are often small, blinding is difficult, and studies differ in exercise, comparators and outcome timing.",
		sources: [sources.massageSport, sources.massageDOMS, sources.massage2023]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "does-foam-rolling-improve-recovery-after-exercise",
		title: "Does foam rolling improve recovery after exercise?",
		band: "mixed",
		certainty: "low",
		bottomLine: "It can improve flexibility, and some studies find less soreness. Evidence for faster recovery of strength or sporting performance is less clear. Those benefits should be judged separately.",
		stableCore: [
			"Foam rolling can temporarily increase joint range of motion.",
			"Reviews of post-exercise soreness reach different conclusions.",
			"Greater flexibility does not by itself show faster healing or better performance."
		],
		openQuestions: [
			"How much soreness relief remains with better-controlled trials?",
			"When do changes in symptoms or flexibility lead to useful functional gains?"
		],
		whatWouldChangeMinds: [
			"Larger well-controlled trials measuring symptoms and performance together.",
			"Clearer reporting and replication across different participants and sports."
		],
		misconceptions: [
			"A larger range of motion proves that muscle tissue has recovered.",
			"A nonsignificant small trial establishes that nobody benefits."
		],
		editorSummary: "Flexibility, soreness and performance respond differently.",
		population: "Predominantly healthy adults in flexibility, post-exercise recovery and repeated foam-rolling studies.",
		scope: "Assess immediate flexibility and post-exercise recovery after foam rolling, distinguishing those outcomes from longer-term performance training.",
		excludedEvidence: [
			"Acute range-of-motion gains are not proof of tissue repair or injury prevention.",
			"Overlapping reviews, differing control groups and different pain measures are not interchangeable replications."
		],
		uncertainty: "Small heterogeneous studies, limited blinding, conflicting soreness syntheses and reporting limitations reduce confidence in recovery claims.",
		sources: [
			sources.foamROM,
			sources.foamRecovery2023,
			sources.foamSoreness,
			sources.foamTraining
		]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "do-compression-garments-speed-recovery-after-exercise",
		title: "Do compression garments speed recovery after exercise?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some studies find small benefits, while others find little or no clear improvement. Soreness, strength and endurance results differ. Current evidence does not establish a dependable recovery boost for everyone.",
		stableCore: [
			"Results vary across studies and measures of recovery.",
			"Some strength and power syntheses find small effects, while other reviews do not.",
			"Expectation effects are hard to separate when a garment cannot be convincingly blinded."
		],
		openQuestions: [
			"Which benefits persist against credible sham or lower-pressure comparisons?",
			"Do small laboratory changes improve later competition or training?"
		],
		whatWouldChangeMinds: [
			"Larger trials with credible comparison garments and preregistered outcomes.",
			"Consistent functional benefits across sports and independent research groups."
		],
		misconceptions: [
			"A favorable estimate proves a benefit even when its uncertainty includes no effect.",
			"Evidence for athletic recovery garments establishes treatment for a vascular condition."
		],
		editorSummary: "Small average effects and uncertain soreness findings remain distinct.",
		population: "Healthy active adults and athletes in exercise-recovery trials, including a small endurance-focused evidence base.",
		scope: "Assess athletic compression garments for post-exercise soreness and performance recovery, separately from medically prescribed compression.",
		excludedEvidence: [
			"Medical indications for compression are separate from evidence about athletic recovery.",
			"Subgroup estimates, overlapping studies and directional effects crossing the null are not universal recovery benefits."
		],
		uncertainty: "Evidence is inconsistent, studies are often small or high risk of bias, and credible blinding is limited.",
		sources: [sources.compression2022, sources.compression2025, sources.compressionEndurance]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "does-stretching-after-exercise-prevent-muscle-soreness",
		title: "Does stretching after exercise prevent muscle soreness?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It usually makes little difference to soreness after exercise. Trials have not shown a clinically important average benefit. Stretching may serve other goals, but that is a separate question from preventing soreness.",
		stableCore: [
			"Pooled trials generally find little improvement in post-exercise soreness.",
			"A statistically detectable change can still be too small to matter.",
			"Evidence about soreness does not settle every use of stretching."
		],
		openQuestions: [
			"Could particular groups or comparisons show a meaningful benefit?",
			"How do recovery routines compare when they include several components?"
		],
		whatWouldChangeMinds: [
			"Well-controlled trials showing changes large enough to matter to participants.",
			"Replicated benefits beyond what occurs with ordinary rest or other active recovery."
		],
		misconceptions: [
			"A small statistically significant result proves a useful reduction in soreness.",
			"A null soreness result means stretching has no other purpose."
		],
		editorSummary: "Statistical significance and useful symptom relief are different thresholds.",
		population: "Mostly healthy adults in laboratory and field trials of stretching around exercise, with later reviews focused on post-exercise stretching.",
		scope: "Assess delayed muscle soreness after post-exercise stretching, separately from pre-exercise injury prevention and longer-term flexibility training.",
		excludedEvidence: [
			"The completed Cochrane update and its superseded versions are one evolving review, not separate independent experiments.",
			"Failure to detect a difference does not establish exact equivalence, and small statistical changes need not be clinically important."
		],
		uncertainty: "Trials vary in stretching and exercise, many have bias concerns, and uncommon subgroup effects remain less certain than the overall result.",
		sources: [sources.stretchCochrane, sources.stretch2021, sources.stretch2025]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "is-pilates-better-than-other-exercise-for-chronic-low-back-pain",
		title: "Is Pilates better than other exercise for chronic low-back pain?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Pilates can help, but evidence does not establish that it is generally better than other suitable exercise. Some short-term differences are small or fade with follow-up. The comparison program and outcome matter.",
		stableCore: [
			"Pilates trials can show improvements in pain and function.",
			"Benefit against no exercise does not establish superiority to every active program.",
			"Small short-term differences and lasting meaningful improvements are different outcomes."
		],
		openQuestions: [
			"Which approaches provide meaningful long-term benefits when support and participation are comparable?",
			"Which patients prefer or sustain one suitable exercise approach over another?"
		],
		whatWouldChangeMinds: [
			"Larger direct comparisons with similar support, adherence and clinically important outcomes.",
			"Replicated longer-term differences rather than rankings from indirect comparisons alone."
		],
		misconceptions: [
			"A statistically significant pain difference must be large enough for patients to notice.",
			"An exercise study diagnoses every cause of back pain or identifies a universally best method."
		],
		editorSummary: "Pain, disability and quality-of-life gains can differ.",
		population: "Adults with assessed chronic nonspecific low-back pain; one clinic trial enrolled people aged 18-50.",
		scope: "Compare Pilates with other exercise for chronic nonspecific low-back pain, distinguishing active comparators from no exercise and short-term from sustained benefit.",
		excludedEvidence: [
			"Results for assessed nonspecific chronic pain do not establish treatment for every acute, structural or neurological cause of back pain.",
			"Pain, disability and health-related quality-of-life utility are separate outcomes, and intervention packages can differ in support."
		],
		uncertainty: "Reviews disagree, many comparisons have low certainty, and follow-up or clinically important differences are limited.",
		sources: [sources.pilatesVersus, sources.pilatesMeta, sources.pilatesRCT]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "can-tai-chi-help-prevent-falls-in-older-adults",
		title: "Can tai chi help prevent falls in older adults?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Structured tai chi programs can reduce falls among older adults living in the community. Results depend on the program and participants. Someone with poor balance may need an adapted, supported approach.",
		stableCore: [
			"Randomized trials have found fewer falls with structured tai chi programs.",
			"Fall events, the number of people who fall and balance scores are different measures.",
			"Evidence from a tailored program does not guarantee the same result in every class."
		],
		openQuestions: [
			"Which programs are most practical and sustained across different communities?",
			"How well do results transfer to people with different conditions or care needs?"
		],
		whatWouldChangeMinds: [
			"Replicated comparisons tracking actual falls and injuries in more varied populations.",
			"Evidence of sustained benefits and participation beyond the trial setting."
		],
		misconceptions: [
			"A reduction in fall rate is the same percentage reduction in every person's risk.",
			"Improving a balance-test score by itself proves that fewer falls occurred."
		],
		editorSummary: "Structured programs have evidence for fewer falls in studied community settings.",
		population: "Community-dwelling older adults, including an Oregon trial of adults aged at least 70 with previous falls or impaired mobility.",
		scope: "Assess structured tai chi for measured falls in community-dwelling older adults, separately from balance proxies and general multicomponent exercise.",
		excludedEvidence: [
			"Repeated fall events are not the number of participants who fell.",
			"Overlapping reviews and indirect style comparisons do not establish independent replications or a universally best program."
		],
		uncertainty: "Programs and participants differ, some populations are underrepresented, and structured trial results may not transfer to every informal class.",
		sources: [sources.taiChiMeta, sources.taiChiWHO, sources.taiChiTrial]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "is-an-active-cool-down-better-than-resting-after-exercise",
		title: "Is an active cool-down better than resting after exercise?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Gentle movement can clear lactate from the blood faster, but that does not consistently improve later performance or reduce soreness. Some studies report benefits, with results depending on the activity and outcome.",
		stableCore: [
			"Blood-lactate clearance can improve without a matching performance gain.",
			"Studies use different forms of movement and measures of recovery.",
			"A benefit in one sport or comparison does not establish the best approach for everyone."
		],
		openQuestions: [
			"Which participants gain meaningful functional benefits from a cool-down?",
			"How do effects differ across later training sessions and competition schedules?"
		],
		whatWouldChangeMinds: [
			"Larger direct comparisons measuring later performance and symptoms together.",
			"Replicated benefits with clear comparators across different sports and participants."
		],
		misconceptions: [
			"Faster lactate clearance proves that muscles have fully recovered.",
			"A favorable duration subgroup identifies a universally best cool-down routine."
		],
		editorSummary: "A faster-changing blood marker can coexist with little functional benefit.",
		population: "Healthy active adults and competitive athletes in post-exercise recovery studies, including soccer-specific evidence.",
		scope: "Assess gentle active cool-down after completed exercise versus passive recovery, separately from rest intervals during exercise and other recovery treatments.",
		excludedEvidence: [
			"Blood-lactate clearance is not a direct measure of muscle healing, soreness or future sporting performance.",
			"Effects of immersion, nutrition or other treatments in a broad recovery review are not effects of active cool-down itself."
		],
		uncertainty: "Interventions and outcomes vary, direct comparisons are limited, and a recent broad review includes several different recovery treatments.",
		sources: [sources.activeReview, sources.activePerformance, sources.activeSoccer]
	}, novemberExerciseRecoveryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "exercise-and-sports-science",
		slug: "does-kinesiology-tape-relieve-musculoskeletal-pain",
		title: "Does kinesiology tape relieve musculoskeletal pain?",
		band: "mixed",
		certainty: "low",
		bottomLine: "It may provide short-term relief in some conditions, but the size and usefulness of the benefit are uncertain. Results change with the condition and comparison treatment. Skin irritation can occur.",
		stableCore: [
			"Some studies report short-term pain improvements.",
			"Tape alone versus sham and tape added to another treatment are different comparisons.",
			"Evidence for lasting functional benefit is less clear than some early pain results."
		],
		openQuestions: [
			"Which conditions show benefits large enough to matter against credible sham treatment?",
			"How long do improvements last, and how completely are adverse effects reported?"
		],
		whatWouldChangeMinds: [
			"Larger low-bias trials with condition-specific outcomes and credible comparison tape.",
			"Replicated clinically important benefits with longer follow-up and complete adverse-event reporting."
		],
		misconceptions: [
			"A pooled short-term pain improvement proves that every taped condition improves.",
			"A large number of overlapping reviews is the same as many independent trials."
		],
		editorSummary: "The condition, comparator and follow-up change the interpretation.",
		population: "Adults with studied musculoskeletal conditions, with sham-controlled evidence concentrated in chronic low-back pain and knee osteoarthritis.",
		scope: "Assess elastic kinesiology tape for musculoskeletal pain and function, distinguishing standalone sham-controlled treatment from additions to other care.",
		excludedEvidence: [
			"Benefits against no treatment or as part of combined care do not isolate a specific effect over sham tape.",
			"Short-term pain scores, later function and adverse effects are separate outcomes, and review registrations are not completed independent trials."
		],
		uncertainty: "Overall certainty is very low, studies and conditions differ, clinical importance is unstable, and longer-term effects remain unclear.",
		sources: [sources.tapeOverview, sources.tapeSham, sources.tapeMeta]
	}, novemberExerciseRecoveryResearchCheckedAt)
];
