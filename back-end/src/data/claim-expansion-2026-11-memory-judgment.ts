import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberMemoryJudgmentResearchCheckedAt = "2026-11-08T07:00:32.090Z";

const sources = {
	lying1: researchSource("Accuracy of Deception Judgments", "Personality and Social Psychology Review", 2006, "https://doi.org/10.1207/s15327957pspr1003_2", "10.1207/s15327957pspr1003_2", "Synthesis of 206 reports and 24,483 judges found 54% average unaided lie-truth accuracy, with 47% of lies and 61% of truths correctly classified. Selected experimental tasks and truth/lie proportions constrain everyday generalization.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	lying2: researchSource("A Fresh View of the Veracity Effect in Deception Research: Bond and DePaulo Re-examined", "Communication Research", 2025, "https://doi.org/10.1177/00936502251316927", "10.1177/00936502251316927", "Reanalysis of the Bond-DePaulo evidence, rather than independent new experiments, examines truth bias and base rates. Balanced laboratory truth/lie proportions do not establish a universal accuracy rate for ordinary conversations.", "technical_reference", "context", novemberMemoryJudgmentResearchCheckedAt),
	lying3: researchSource("Does the cognitive approach to lie detection improve the accuracy of human observers?", "Applied Cognitive Psychology", 2021, "https://doi.org/10.1002/acp.3777", "10.1002/acp.3777", "Review of cognitive lie-detection methods found heterogeneous results and publication-bias concerns. A bias-adjusted overall estimate had an interval spanning chance; favorable results among informed observers do not establish universal skill or validate appearance-based accusations.", "meta_analysis", "context", novemberMemoryJudgmentResearchCheckedAt),
	bilingual1: researchSource("Is bilingualism associated with enhanced executive functioning in adults? A meta-analytic review.", "Psychological Bulletin", 2018, "https://doi.org/10.1037/bul0000142", "10.1037/bul0000142", "Adult synthesis of 152 studies and 891 effect sizes found little support for an overall executive-function advantage after publication-bias adjustment. Task and population differences matter; this does not assess every benefit of knowing another language.", "meta_analysis", "debate", novemberMemoryJudgmentResearchCheckedAt),
	bilingual2: researchSource("Is bilingualism related to a cognitive advantage in children? A systematic review and meta-analysis.", "Psychological Bulletin", 2020, "https://doi.org/10.1037/bul0000301", "10.1037/bul0000301", "Child review of 143 independent comparisons and 583 effect sizes found a very small average association, with publication bias affecting several domains. Switching results differed from other tasks, rather than establishing a general intelligence advantage.", "meta_analysis", "debate", novemberMemoryJudgmentResearchCheckedAt),
	bilingual3: researchSource("Bilingual children outperform monolingual children on executive function tasks far more often than chance: An updated quantitative analysis", "Developmental Review", 2023, "https://doi.org/10.1016/j.dr.2023.101084", "10.1016/j.dr.2023.101084", "Updated quantitative analysis of 147 child studies argues that positive executive-task findings occur more often than chance. Its evidence-strength statistic is not an effect size or the probability that an individual child will benefit; methods and reporting remain disputed.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	bilingual4: researchSource("The alchemy of confirmation bias transmutes expectations into bilingual advantages: A tale of two new meta-analyses", "Quarterly Journal of Experimental Psychology", 2020, "https://doi.org/10.1177/1747021819900098", "10.1177/1747021819900098", "Methodological critique identifies coding and interpretation problems in two specific bilingual-advantage meta-analyses. It is not a new independent population sample and does not, by itself, refute every later positive synthesis.", "technical_reference", "debate", novemberMemoryJudgmentResearchCheckedAt),
	anger1: researchSource("A meta-analytic review of anger management activities that increase or decrease arousal: What fuels or douses rage?", "Clinical Psychology Review", 2024, "https://doi.org/10.1016/j.cpr.2024.102414", "10.1016/j.cpr.2024.102414", "Review covering 154 studies, 184 samples and 10,189 participants found benefits from arousal-lowering activities, with no overall benefit from arousal-raising activities. Heterogeneous interventions and anger measures do not establish one effect for all exercise or social discussion.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	anger2: researchSource("The effect of acute and chronic exercise on state anger: a systematic review and meta-analysis of randomized trials", "International Review of Sport and Exercise Psychology", 2026, "https://doi.org/10.1080/1750984x.2026.2706622", "10.1080/1750984x.2026.2706622", "Review of 80 randomized exercise studies distinguishes acute activity from repeated training. The acute pooled interval included no effect; the chronic average was favorable but its prediction interval included no effect. Exercise training and immediate angry venting are different exposures.", "meta_analysis", "context", novemberMemoryJudgmentResearchCheckedAt),
	anger3: researchSource("Anger and emotion regulation strategies: a meta-analysis", "Scientific Reports", 2025, "https://doi.org/10.1038/s41598-025-91646-0", "10.1038/s41598-025-91646-0", "Synthesis of 81 studies and 115 effect sizes examines associations between anger and emotion-regulation strategies. Correlations involving rumination, acceptance or reappraisal do not independently establish that assigning a strategy causes a change in anger.", "meta_analysis", "context", novemberMemoryJudgmentResearchCheckedAt),
	personality1: researchSource("A systematic review of personality trait change through intervention.", "Psychological Bulletin", 2017, "https://doi.org/10.1037/bul0000088", "10.1037/bul0000088", "Review of 207 intervention studies, many clinical and before-after designs, reports personality-score change over an average of about 24 weeks. The pooled change is not a pure randomized estimate of deliberately changing any desired trait.", "systematic_review", "supports", novemberMemoryJudgmentResearchCheckedAt),
	personality2: researchSource("A systematic review of volitional personality change research", "Communications Psychology", 2024, "https://doi.org/10.1038/s44271-024-00167-5", "10.1038/s44271-024-00167-5", "Review of 30 longitudinal studies and 7,719 participants distinguishes wanting change from receiving an intervention. Only seven intervention studies and four follow-up studies contributed to those analyses; motivation alone was less reliably associated with change.", "systematic_review", "supports", novemberMemoryJudgmentResearchCheckedAt),
	personality3: researchSource("Changing personality traits with the help of a digital personality change intervention", "Proceedings of the National Academy of Sciences", 2021, "https://doi.org/10.1073/pnas.2017548118", "10.1073/pnas.2017548118", "Digital personality-change study enrolled 1,523 adults over three months. The waitlist received treatment after one month, limiting the untreated long-term comparison; self-reports and observer ratings did not show identical changes.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	personality4: researchSource("What explains personality change intervention effects?", "Journal of Personality and Social Psychology", 2025, "https://doi.org/10.1037/pspp0000565", "10.1037/pspp0000565", "Three studies with 2,094 participants examine alternative explanations for apparent intervention effects. Similar changes in some comparison groups highlight expectations, selection and demand effects; this challenges simple causal interpretations rather than proving traits never change.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	personality5: researchSource("One year later: Longer‐term maintenance effects of a digital intervention to change personality traits", "Journal of Personality", 2024, "https://doi.org/10.1111/jopy.12898", "10.1111/jopy.12898", "Follow-up of the same digital-intervention cohort, not an independent trial: 1,523 baseline participants, 554 post-intervention respondents, 437 at three months and 157 at one year. Selective attrition limits claims about lasting change across the original sample.", "landmark_study", "context", novemberMemoryJudgmentResearchCheckedAt),
	birthOrder1: researchSource("Examining the effects of birth order on personality", "Proceedings of the National Academy of Sciences", 2015, "https://doi.org/10.1073/pnas.1506451112", "10.1073/pnas.1506451112", "US, UK and German national panels used between-family and within-family comparisons. Results largely failed to support birth-order differences in broad personality traits, with intellectual-domain findings treated separately.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	birthOrder2: researchSource("Personality differences between birth order categories and across sibship sizes", "Proceedings of the National Academy of Sciences", 2025, "https://doi.org/10.1073/pnas.2416709121", "10.1073/pnas.2416709121", "Large online HEXACO samples above 700,000 and 70,000 respondents found differences in honesty-humility and agreeableness. Family size accounted for important variation; comparisons within a given sibship size are not the same as comparing siblings within a family.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	birthOrder3: researchSource("Probing Birth-Order Effects on Narrow Traits Using Specification-Curve Analysis", "Psychological Science", 2017, "https://doi.org/10.1177/0956797617723726", "10.1177/0956797617723726", "Specification-curve analysis of narrow personality traits found little consistent support for many birth-order associations, while separating intellectual-domain results. Broad null findings do not imply all traits or family contexts were measured without error.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	birthOrder4: researchSource("Further examining the potential association between birth order and personality: Null results from a national sample of American siblings", "Personality and Individual Differences", 2019, "https://doi.org/10.1016/j.paid.2018.11.017", "10.1016/j.paid.2018.11.017", "National US sibling analyses found largely null birth-order associations with personality using between-family and within-family approaches. Population, trait measures and family controls differ from newer self-selected HEXACO surveys.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	facialFeedback1: researchSource("A meta-analysis of the facial feedback literature: Effects of facial feedback on emotional experience are small and variable.", "Psychological Bulletin", 2019, "https://doi.org/10.1037/bul0000194", "10.1037/bul0000194", "Meta-analysis of 138 studies and 286 effect sizes found small, variable facial-feedback effects. Emotional experience and judgments of stimuli differed; publication-bias concerns and heterogeneous tasks limit a universal smiling prescription.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	facialFeedback2: researchSource("A multi-lab test of the facial feedback hypothesis by the Many Smiles Collaboration", "Nature Human Behaviour", 2022, "https://doi.org/10.1038/s41562-022-01458-9", "10.1038/s41562-022-01458-9", "Many Smiles multi-lab study included 3,878 participants across 19 countries. Voluntary smiling and mimicry supported small happiness effects, while a pen-in-mouth task was less conclusive. Immediate ratings do not establish treatment of depression.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	facialFeedback3: researchSource("Registered Replication Report", "Perspectives on Psychological Science", 2016, "https://doi.org/10.1177/1745691616674458", "10.1177/1745691616674458", "Registered 17-laboratory replication found a near-zero average effect for the specific pen-in-mouth/cartoon task, with an interval including zero. Failure of this procedure does not independently test all ways facial movement might affect emotion.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	emotionFaces1: {
		...researchSource("Emotional Expressions Reconsidered: Challenges to Inferring Emotion From Human Facial Movements", "Psychological Science in the Public Interest", 2019, "https://doi.org/10.1177/1529100619832930", "10.1177/1529100619832930", "Broad review finds that facial movements do not uniquely reveal a person's emotion across contexts and cultures. Its correction concerns Figure 5 image attribution, Action Unit labels and replacement images, rather than a reported reversal of the scientific argument.", "technical_reference", "supports", novemberMemoryJudgmentResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1177/1529100619832930",
			"https://doi.org/10.1177/1529100619889954",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F1529100619832930&rows=100"
		]
	},
	emotionFaces2: researchSource("The role of facial movements in emotion recognition", "Nature Reviews Psychology", 2023, "https://doi.org/10.1038/s44159-023-00172-1", "10.1038/s44159-023-00172-1", "Review of facial movement and emotion recognition emphasizes dynamic information. Evidence that motion adds useful cues does not establish a one-to-one facial code or direct access to another person's felt state.", "technical_reference", "context", novemberMemoryJudgmentResearchCheckedAt),
	emotionFaces3: researchSource("Interactions between faces and visual context in emotion perception: A meta-analysis", "Psychonomic Bulletin & Review", 2025, "https://doi.org/10.3758/s13423-025-02678-6", "10.3758/s13423-025-02678-6", "Meta-analysis of 37 articles, 3,198 participants and 1,020 effect sizes finds that faces, bodies and scenes jointly affect emotion labeling. Congruency and cue clarity matter; labeled judgments are not direct measurements of the target person's emotion.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	emotionFaces4: researchSource("Face and context integration in emotion inference is limited and variable across categories and individuals", "Nature Communications", 2024, "https://doi.org/10.1038/s41467-024-46670-5", "10.1038/s41467-024-46670-5", "One archival and five empirical datasets examine integration of facial and situational cues. Context often predicts inferred emotion as well as or better than the combined information; inference accuracy and actual felt emotion remain distinct questions.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	photoMemory1: researchSource("Point-and-Shoot Memories", "Psychological Science", 2014, "https://doi.org/10.1177/0956797613504438", "10.1177/0956797613504438", "Two museum experiments found worse unaided object memory after instructed whole-object photography, while focused zooming removed that cost in one design. The comparison does not measure later access to or review of the photos.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	photoMemory2: researchSource("Photographic Memory: The Effects of Volitional Photo Taking on Memory for Visual and Auditory Aspects of an Experience", "Psychological Science", 2017, "https://doi.org/10.1177/0956797617694868", "10.1177/0956797617694868", "One field and three laboratory experiments found that voluntary photography improved visual memory while reducing auditory memory; similar patterns occurred with mental photo taking. Attention to one part of an experience can come at another part's expense.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	photoMemory3: researchSource("Are we taking too many pictures? An investigation of the impact of smartphone photography on memory", "Journal of Cognitive Psychology", 2024, "https://doi.org/10.1080/20445911.2024.2337716", "10.1080/20445911.2024.2337716", "Three smartphone experiments found impairment under intentional encoding but not incidental encoding. Zooming did not remove the effect in that design, illustrating that camera use, instructions and attentional demands change the result.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	photoMemory4: researchSource("The cost of saving: How photos and screenshots impair memory", "Memory & Cognition", 2025, "https://doi.org/10.3758/s13421-025-01711-2", "10.3758/s13421-025-01711-2", "Three saving and screenshot experiments found memory costs that did not increase with task complexity or disappear with a familiar device. Divided attention alone did not explain every result; unaided recall and the value of a saved record remain separate.", "landmark_study", "context", novemberMemoryJudgmentResearchCheckedAt),
	stressMemory1: researchSource("The effects of acute stress on episodic memory: A meta-analysis and integrative review.", "Psychological Bulletin", 2017, "https://doi.org/10.1037/bul0000100", "10.1037/bul0000100", "Synthesis of 113 studies and 6,216 participants covers encoding, consolidation and retrieval, not 113 retrieval-only studies. Stress around retrieval generally impaired performance, whereas effects at other memory phases differed.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	stressMemory2: researchSource("Psychosocial stress has weaker than expected effects on episodic memory and related cognitive abilities: A meta-analysis", "Neuroscience & Biobehavioral Reviews", 2022, "https://doi.org/10.1016/j.neubiorev.2021.10.038", "10.1016/j.neubiorev.2021.10.038", "Meta-analysis of 51 psychosocial-stress studies found weaker episodic-memory effects than commonly assumed, including many null findings. Timing and delay matter; effects on related executive tasks cannot be substituted for recall effects.", "meta_analysis", "debate", novemberMemoryJudgmentResearchCheckedAt),
	stressMemory3: researchSource("Does Retrieval Practice Protect Memory Against Stress? A Meta-Analysis", "Swiss Psychology Open", 2025, "https://doi.org/10.5334/spo.101", "10.5334/spo.101", "Review of ten studies and 908 participants found retrieval practice outperformed restudy under stress. This comparison alone does not establish a stress-by-practice interaction or prove that practice removes a stress-specific impairment.", "meta_analysis", "context", novemberMemoryJudgmentResearchCheckedAt),
	misinformationMemory1: researchSource("How to protect eyewitness memory against the misinformation effect: A meta-analysis of post-warning studies.", "Journal of Applied Research in Memory and Cognition", 2014, "https://doi.org/10.1037/h0101798", "10.1037/h0101798", "Meta-analysis of 25 warning studies and 155 effect sizes found post-warnings reduced misinformation effects by more than half on average. This is mitigation, not guaranteed immunity; the historical Elsevier DOI now resolves to this verified APA identifier.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	misinformationMemory2: researchSource("The misinformation effect: A contemporary replication and extension of Loftus et al. (1978) to investigate its underlying mechanisms.", "Journal of Experimental Psychology: Learning, Memory, and Cognition", 2026, "https://doi.org/10.1037/xlm0001529", "10.1037/xlm0001529", "Contemporary replication retained a smaller misinformation effect with broader response options and accuracy incentives. The result challenges a purely demand-based account without establishing that the original memory trace was overwritten.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	misinformationMemory3: researchSource("Assessing the effects of misleading postevent information using multinomial processing tree models.", "Journal of Experimental Psychology: Learning, Memory, and Cognition", 2026, "https://doi.org/10.1037/xlm0001617", "10.1037/xlm0001617", "Two modeling experiments did not replicate an overall misinformation effect and found different subgroup patterns. Multinomial model fits can compare accounts but do not uniquely demonstrate one underlying memory mechanism.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	misinformationMemory4: researchSource("Misleading postevent information and memory for events: Arguments and evidence against memory impairment hypotheses.", "Journal of Experimental Psychology: General", 1985, "https://doi.org/10.1037/0096-3445.114.1.1", "10.1037/0096-3445.114.1.1", "Six experiments using an alternative test challenged original-memory impairment as the sole explanation for misinformation responses. The canonical DOI and its historically indexed double-slash alias refer to the same verified article.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	sunkCost1: researchSource("On the sunk-cost effect in economic decision-making: a meta-analytic review", "Business Research", 2015, "https://doi.org/10.1007/s40685-014-0014-8", "10.1007/s40685-014-0014-8", "Meta-analysis of 98 effect sizes distinguishes using an already purchased resource from committing more investment. Decision type, time and age moderated findings; persistence alone does not identify an irrational decision.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	sunkCost2: researchSource("The impact of financial and behavioural sunk costs on consumers’ choices", "Journal of Consumer Marketing", 2024, "https://doi.org/10.1108/jcm-06-2023-6099", "10.1108/jcm-06-2023-6099", "Systematic consumer review covers 56 articles from 1985 to 2022 and maps monetary and behavioral investments, switching and post-purchase evaluations. It does not supply one pooled causal estimate for all sunk-cost decisions.", "systematic_review", "context", novemberMemoryJudgmentResearchCheckedAt),
	sunkCost3: researchSource("Throwing good effort after bad: Evidence for a sunk-cost effect in cognitive effort-based decision-making", "Cognition", 2026, "https://doi.org/10.1016/j.cognition.2026.106628", "10.1016/j.cognition.2026.106628", "Two experiments with 36 and 89 participants found that prior cognitive effort increased continuation in an effort task. Small laboratory decisions do not establish how a person should handle a consequential project or relationship.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	lossPublished: researchSource("Meta-analysis of Empirical Estimates of Loss Aversion", "Journal of Economic Literature", 2024, "https://doi.org/10.1257/jel.20221698", "10.1257/jel.20221698", "Published synthesis examines 607 empirical coefficient estimates from 150 articles reporting work from 1992 to 2017. The average near two is a model-dependent loss-aversion parameter, not a universal ratio of emotional pain to pleasure or a percentage of expert agreement.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	lossAversion1: researchSource("A Meta-analysis of Loss Aversion in Product Choice", "Journal of Retailing", 2014, "https://doi.org/10.1016/j.jretai.2014.02.002", "10.1016/j.jretai.2014.02.002", "Product-choice meta-analysis covers 33 studies and 109 observations, finding loss aversion with context, reference-point and modeling variation. Multiple observations can come from the same study and do not count independent experiments.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	lossAversion2: researchSource("Moderating Loss Aversion: Loss Aversion Has Moderators, But Reports of its Death are Greatly Exaggerated", "Journal of Consumer Psychology", 2020, "https://doi.org/10.1002/jcpy.1156", "10.1002/jcpy.1156", "Primary research across five samples totaling 17,720 participants, rather than a meta-analysis, examines loss-aversion moderators. Knowledge and experience were associated with lower estimates and age with higher estimates; these patterns do not yield a single fixed personal constant.", "landmark_study", "context", novemberMemoryJudgmentResearchCheckedAt),
	lossAversion3: researchSource("The Loss of Loss Aversion: Will It Loom Larger Than Its Gain?", "Journal of Consumer Psychology", 2018, "https://doi.org/10.1002/jcpy.1047", "10.1002/jcpy.1047", "Critical theoretical review questions a general rule that losses outweigh gains across settings. It supplies competing interpretations and boundary conditions, rather than a new pooled estimate or proof that all loss-aversion findings disappear.", "technical_reference", "debate", novemberMemoryJudgmentResearchCheckedAt),
	defaultsPublished: researchSource("When and why defaults influence decisions: a meta-analysis of default effects", "Behavioural Public Policy", 2019, "https://doi.org/10.1017/bpp.2018.43", "10.1017/bpp.2018.43", "Published meta-analysis of 58 studies and 73,675 participants finds an average standardized default effect around 0.68, substantial heterogeneity and some negative effects. Coded mechanism moderators are not randomized causal tests; uptake does not establish welfare or lasting consent.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	defaults1: researchSource("The Power of Defaults in Consumer Choice: A Systematic Review and Research Agenda", "Journal of Consumer Behaviour", 2026, "https://doi.org/10.1002/cb.70083", "10.1002/cb.70083", "Review of 61 consumer articles from 2000 to 2025 maps conditions under which defaults weaken or reverse. Initial choice, durable consent and final benefit remain separate; the journal issue is 2026 although the work appeared online earlier.", "systematic_review", "context", novemberMemoryJudgmentResearchCheckedAt),
	defaults2: researchSource("Defaults are not a panacea: distinguishing between default effects on choices and on outcomes", "Behavioural Public Policy", 2025, "https://doi.org/10.1017/bpp.2022.24", "10.1017/bpp.2022.24", "Field experiment involving 32,508 high-school students increased test registration through a default but did not significantly increase actual test-taking. Registration is a choice outcome, not proof of the intended downstream benefit; the journal issue is 2025, not its 2022 online date.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	choiceOverload1: researchSource("Can There Ever Be Too Many Options? A Meta-Analytic Review of Choice Overload", "Journal of Consumer Research", 2010, "https://doi.org/10.1086/651235", "10.1086/651235", "Review of 50 experiments, 63 conditions and 5,036 participants found a mean effect near zero with substantial heterogeneity. This challenges an unconditional more-choice-is-worse claim without ruling out overload in particular settings.", "meta_analysis", "debate", novemberMemoryJudgmentResearchCheckedAt),
	choiceOverload2: researchSource("Choice overload: A conceptual review and meta‐analysis", "Journal of Consumer Psychology", 2015, "https://doi.org/10.1016/j.jcps.2014.08.002", "10.1016/j.jcps.2014.08.002", "Review of 99 observations and 7,202 participants proposes moderators involving complexity, difficulty, preference uncertainty and decision goals. Conditional associations do not establish a universal maximum number of options.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	choiceOverload3: researchSource("Over two decades of research on choice overload: An overview and research agenda", "International Journal of Consumer Studies", 2024, "https://doi.org/10.1111/ijcs.13029", "10.1111/ijcs.13029", "Review maps 92 articles and research gaps across choice-overload settings and outcomes. It is an overview of varied evidence, not a new universal pooled effect or a fixed cognitive-capacity rule.", "systematic_review", "context", novemberMemoryJudgmentResearchCheckedAt),
	anchoring1: researchSource("Fifty Years of Anchoring Effects: A Theoretical Reintegration and Meta-Analysis", "Management Science", 2026, "https://doi.org/10.1287/mnsc.2023.03238", "10.1287/mnsc.2023.03238", "Large synthesis includes 2,601 effect sizes, with 1,280 high-versus-low-anchor comparisons. Effects remain substantial after bias adjustments, but incidental, random or different-dimension anchors are weaker or null; effect sizes do not count independent studies.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	anchoring2: researchSource("Anchoring in Economics: A Meta-Analysis of Studies on Willingness-To-Pay and Willingness-To-Accept", "Journal of Behavioral and Experimental Economics", 2021, "https://doi.org/10.1016/j.socec.2020.101629", "10.1016/j.socec.2020.101629", "Economic meta-analysis of 53 studies finds a moderate average association in willingness to pay or accept payment. The authors describe their estimate as an upper bound because of methodological limits; economic valuation is narrower than all judgment tasks.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	anchoring3: researchSource("Underpowered studies and exaggerated effects: A replication and re‐evaluation of the magnitude of anchoring effects", "Economic Inquiry", 2025, "https://doi.org/10.1111/ecin.13279", "10.1111/ecin.13279", "Higher-powered replication estimated a 3.4% bidding change with a 95% interval from -3.4% to 10%, rejecting the original 31% magnitude. This specific result does not show that all numerical anchoring effects are absent.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	selfAssessment1: researchSource("Do People Have Insight Into Their Abilities? A Metasynthesis", "Perspectives on Psychological Science", 2014, "https://doi.org/10.1177/1745691613518075", "10.1177/1745691613518075", "Metasynthesis of 22 meta-analyses found a mean self-rating/performance correlation of 0.29, with variation across domains and task features. Correlation is not percentage accuracy, and this higher-level synthesis can inherit overlapping primary studies.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	selfAssessment2: researchSource("Beyond the Correlation Coefficient in Studies of Self-Assessment Accuracy: Commentary on Zell & Krizan (2014)", "Perspectives on Psychological Science", 2014, "https://doi.org/10.1177/1745691614521244", "10.1177/1745691614521244", "Methodological commentary distinguishes correlation from absolute calibration or bias. Correct ranking can coexist with systematic overestimation; this commentary adds interpretation, not another independent experiment.", "technical_reference", "context", novemberMemoryJudgmentResearchCheckedAt),
	selfAssessment3: researchSource("How Accurate Are Our Students? A Meta-analytic Systematic Review on Self-assessment Scoring Accuracy", "Educational Psychology Review", 2023, "https://doi.org/10.1007/s10648-023-09819-0", "10.1007/s10648-023-09819-0", "Educational review covers 160 articles and 29,352 participants, with small mean overestimation and substantial heterogeneity. The reported association uses a transformed z statistic, not percentage accuracy or a raw correlation of the same number.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	powerPose1: researchSource("Expansive and Contractive Postures and Movement: A Systematic Review and Meta-Analysis of the Effect of Motor Displays on Affective and Behavioral Responses", "Perspectives on Psychological Science", 2022, "https://doi.org/10.1177/1745691620919358", "10.1177/1745691620919358", "Review of 73 studies finds differences between expansive and contractive displays driven largely by contractive-versus-neutral comparisons; expansive-versus-neutral effects were small. Its 2022 issue date differs from 2020 online publication.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	postureAuthorSummary: researchSource("Standing tall and standing wide: Body positions have effects on how people feel", "American Psychological Association", 2022, "https://www.apa.org/pubs/highlights/spotlight/issue-239", "", "Author-written APA summary of a preregistered meta-analysis, not an independent new study or the original paper's full text. It reports short-term self-perception effects, less robust behavioral findings and no clear physiological effect, with neutral-control and durability limitations.", "technical_reference", "context", novemberMemoryJudgmentResearchCheckedAt),
	powerPose2: researchSource("Assessing the Robustness of Power Posing", "Psychological Science", 2015, "https://doi.org/10.1177/0956797614553946", "10.1177/0956797614553946", "Conceptual replication with 200 participants and a blinded experimenter found an effect on self-reported power but not hormones or three behavioral tasks. High-versus-low poses do not establish a benefit beyond neutral posture.", "landmark_study", "context", novemberMemoryJudgmentResearchCheckedAt),
	powerPose3: researchSource("The effects of power posing on neuroendocrine levels and risk-taking", "BMC Psychology", 2024, "https://doi.org/10.1186/s40359-024-02194-7", "10.1186/s40359-024-02194-7", "Randomized study of 92 young adults did not replicate effects on feelings of power or testosterone, while reporting partial cortisol/risk findings and a specific subgroup result. Preliminary physiological findings and multiple outcomes require replication.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	openPlacebo1: researchSource("Effects of open-label placebos across populations and outcomes: an updated systematic review and meta-analysis of randomized controlled trials", "Scientific Reports", 2025, "https://doi.org/10.1038/s41598-025-14895-z", "10.1038/s41598-025-14895-z", "Review of 60 randomized trials, 63 comparisons and 4,554 participants found larger effects in self-reports than objective measures. Its search ended November 9, 2023; the 2025 publication date does not imply coverage of all trials available that year.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	openPlacebo2: researchSource("Open-label placebos: a systematic review and meta-analysis of experimental studies with non-clinical samples", "Scientific Reports", 2023, "https://doi.org/10.1038/s41598-023-30362-z", "10.1038/s41598-023-30362-z", "Non-clinical review included 20 studies and 1,201 participants, with 17 studies eligible for meta-analysis. Self-reported outcomes improved but objective outcomes did not clearly do so; the authors rated overall evidence low to very low. Trials overlap with later reviews.", "meta_analysis", "context", novemberMemoryJudgmentResearchCheckedAt),
	openPlacebo3: researchSource("A systematic review and meta analysis of open label placebo effects in chronic musculoskeletal pain", "Scientific Reports", 2025, "https://doi.org/10.1038/s41598-025-09415-y", "10.1038/s41598-025-09415-y", "Seven chronic musculoskeletal-pain trials with 703 participants found some self-reported benefit without improved physical-function tests. All patient-reported outcomes were at high risk of bias from treatment awareness, and the authors state that clinical value is not yet established.", "meta_analysis", "debate", novemberMemoryJudgmentResearchCheckedAt),
	subliminal1: {
		...researchSource("A meta-analysis of consumer choice and subliminal advertising", "Psychology and Marketing", 1996, "https://doi.org/10.1002/(sici)1520-6793(199608)13:5%3C517::aid-mar5%3E3.0.co;2-c", "10.1002/(sici)1520-6793(199608)13:5<517::aid-mar5>3.0.co;2-c", "Historical consumer-choice meta-analysis reports a very small average association, about r=0.059. Dated methods and evidence cannot establish a current marketplace effect; a correlation is not the fraction of consumers persuaded.", "meta_analysis", "debate", novemberMemoryJudgmentResearchCheckedAt),
		statusSources: [
			"https://doi.org/10.1002/(sici)1520-6793(199608)13:5%3C517::aid-mar5%3E3.0.co;2-c",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F%28sici%291520-6793%28199608%2913%3A5%3C517%3A%3Aaid-mar5%3E3.0.co%3B2-c&rows=100"
		]
	},
	subliminal2: researchSource("Beyond Vicary’s fantasies: The impact of subliminal priming and brand choice", "Journal of Experimental Social Psychology", 2006, "https://doi.org/10.1016/j.jesp.2005.12.002", "10.1016/j.jesp.2005.12.002", "Two laboratory experiments found goal-dependent drink-brand preference effects among thirsty participants. Immediate choice and intention do not demonstrate long-term influence, actual spending or the creation of arbitrary desires.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	subliminal3: researchSource("Drink coca-cola, eat popcorn, and choose powerade: testing the limits of subliminal persuasion", "Marketing Letters", 2015, "https://doi.org/10.1007/s11002-014-9294-1", "10.1007/s11002-014-9294-1", "Three boundary-condition experiments found some goal-dependent preference effects, but the effect disappeared after a 15-minute delay in the third experiment. The result limits claims about ordinary advertising with delayed purchases.", "landmark_study", "debate", novemberMemoryJudgmentResearchCheckedAt),
	subliminal4: researchSource("Goal-Driven Effects of Masked Priming in Advertising: How Word, Image, and Audio Priming Shape Consumer Brand Choices", "Quarterly Journal of Experimental Psychology", 2026, "https://doi.org/10.1177/17470218261442535", "10.1177/17470218261442535", "Two experiments with 370 Chinese undergraduates report subtle, motivation-dependent masked-cue effects on brand preference. Selected immediate laboratory tasks and awareness measurement limit claims about consumers generally or durable purchasing behavior.", "landmark_study", "supports", novemberMemoryJudgmentResearchCheckedAt),
	personalityWork1: researchSource("Big five personality traits and performance: A quantitative synthesis of 50+ meta‐analyses", "Journal of Personality", 2022, "https://doi.org/10.1111/jopy.12683", "10.1111/jopy.12683", "Synthesis of 54 meta-analyses covers 2,028 samples and 554,778 participants across academic and other performance outcomes as well as work. Conscientiousness has a modest job-performance association; the total sample is not job-only and an association is not individual classification accuracy.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt),
	personalityWork2: researchSource("Personality and job performance: A review of trait models and recent trends", "Current Opinion in Psychology", 2025, "https://doi.org/10.1016/j.copsyc.2025.102054", "10.1016/j.copsyc.2025.102054", "Review compares trait models and task performance, organizational citizenship and counterproductive behavior. Trait-situation interactions and differing outcomes matter; this review does not validate every commercial test or establish a causal effect of changing a score.", "technical_reference", "context", novemberMemoryJudgmentResearchCheckedAt),
	personalityWork3: researchSource("A meta-analytic investigation of conscientiousness in the prediction of job performance: Examining the intercorrelations and the incremental validity of narrow traits.", "Journal of Applied Psychology", 2006, "https://doi.org/10.1037/0021-9010.91.1.40", "10.1037/0021-9010.91.1.40", "Meta-analysis finds that narrow conscientiousness traits sometimes add prediction beyond the broad trait. Incremental value depends on occupation and performance criterion, limiting universal hiring prescriptions.", "meta_analysis", "supports", novemberMemoryJudgmentResearchCheckedAt)
};

export const novemberMemoryJudgmentClaims = [
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-accurate-are-people-at-spotting-lies",
		title: "How accurate are people at spotting lies?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Unaided judgments are usually only modestly accurate in laboratory tests. A familiar figure of 54% comes from particular experiments; it is not a universal accuracy rate for everyday conversations.",
		editorSummary: "The proportion of true and false statements, available information and task all affect accuracy. Looking nervous is not a dependable individual lie test.",
		stableCore: [
			"A synthesis of 206 reports involving 24,483 judges found average accuracy of 54% in unaided lie-or-truth judgments. Truths were identified more often than lies.",
			"A 2025 reanalysis of the same data emphasizes that many experiments used equal numbers of truths and lies. Different real-world proportions and a tendency to believe others can change overall accuracy.",
			"A review of cognitive interviewing methods found promising results for some informed observers, but substantial variation and publication-bias concerns. Those findings do not validate a general ability to read deception from appearance."
		],
		openQuestions: [
			"Which methods improve judgments outside selected laboratory situations.",
			"How performance changes with familiarity, stakes, available evidence and attempts to defeat a method."
		],
		whatWouldChangeMinds: [
			"Independent, preregistered field evaluations with known truth and realistic base rates.",
			"Reliable improvements that generalize across people and situations without increasing false accusations."
		],
		misconceptions: [
			"Being confident in a lie judgment does not establish that it is accurate."
		],
		population: "Predominantly adult observers judging recorded or live statements in heterogeneous deception experiments.",
		scope: "Accuracy of human lie judgments, distinguished from polygraph performance, a particular interviewing technique and an assessment of a named person.",
		excludedEvidence: [
			"The 54% average is tied to its experimental tasks and truth/lie proportions; reanalysis of the same data is not independent replication, and favorable trained-observer subgroups do not establish general real-world performance."
		],
		uncertainty: "Task design, sampling, publication bias and the rarity of suitable field ground truth limit generalization. Individual judgments require evidence beyond an impression of behavior.",
		sources: [
			sources.lying1,
			sources.lying2,
			sources.lying3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-being-bilingual-improve-attention-and-mental-control",
		title: "Does being bilingual improve attention and mental control?",
		band: "mixed",
		certainty: "low",
		bottomLine: "A broad advantage has not been established. Results depend on age, the task and how studies handle bias; some analyses find benefits, while others find little or none.",
		editorSummary: "Executive function includes skills such as switching tasks, holding information in mind and resisting distractions. These are different outcomes, rather than one general measure of intelligence.",
		stableCore: [
			"An adult meta-analysis covering 152 studies found small advantages in some tasks before adjustment for publication bias, but none remained after its correction.",
			"A child meta-analysis found a very small overall difference and substantial unexplained variation. Some evidence for switching tasks survived adjustment, while several other findings did not.",
			"A 2023 analysis of 147 child studies reached a more favorable conclusion about how often bilingual groups performed better. Differences in methods, task measures and the reporting of language experience remain important to the disagreement."
		],
		openQuestions: [
			"Which aspects of language use, proficiency and switching might matter for particular tasks.",
			"How much of the disagreement reflects sampling, analytic choices, publication bias or genuine differences between populations."
		],
		whatWouldChangeMinds: [
			"Large preregistered comparisons with detailed language histories, comparable backgrounds and reliable measures.",
			"Independent syntheses that reach similar conclusions using several defensible approaches to bias and dependence between results."
		],
		misconceptions: [
			"A large Bayes factor is not a large improvement in ability or a guarantee that every bilingual person benefits."
		],
		population: "Bilingual and monolingual adults and children in heterogeneous executive-function studies.",
		scope: "Measured attention and executive functions, separating age groups and tasks from general intelligence, language proficiency or dementia outcomes.",
		excludedEvidence: [
			"Multiple effects from one sample are not independent studies; favorable result counts and standardized effect sizes answer different questions, and a null executive-function result does not evaluate every consequence of learning a language."
		],
		uncertainty: "Language experience and background are often poorly described. Small average differences, heterogeneous tasks and disputed bias adjustments make a universal advantage claim unreliable.",
		sources: [
			sources.bilingual1,
			sources.bilingual2,
			sources.bilingual3,
			sources.bilingual4
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-venting-anger-help-people-calm-down",
		title: "Does venting anger help people calm down?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Acting out anger has not shown a dependable calming benefit. Activities that lower arousal have better support, while talking for support and exercising regularly are different questions.",
		editorSummary: "Feeling that anger has been released does not establish a lasting reduction. Studies distinguish immediate arousal, reported anger and aggressive behavior.",
		stableCore: [
			"A 2024 synthesis of 154 studies found average reductions in anger and aggression with arousal-lowering activities. Arousal-increasing activities were ineffective overall and varied considerably.",
			"A 2026 review of randomized exercise trials found no clear average immediate benefit for state anger, but a small average benefit from longer-term exercise training. This is not evidence against exercise's wider benefits.",
			"A separate meta-analysis linked anger with greater rumination, avoidance and suppression. Those associations do not by themselves establish what causes anger or which treatment works."
		],
		openQuestions: [
			"Which strategies help particular people in ordinary situations over longer follow-up.",
			"How supportive disclosure differs from rehearsing grievances or acting out aggressive impulses."
		],
		whatWouldChangeMinds: [
			"Replicated comparisons measuring both anger and behavior beyond the immediate session.",
			"Evidence that a defined venting approach outperforms credible alternatives without maintaining arousal or increasing aggression."
		],
		misconceptions: [
			"An immediate null result for exercise does not imply that regular exercise has no longer-term benefit."
		],
		population: "Mixed clinical and nonclinical populations in anger-management studies, exercise trials and observational emotion-regulation research.",
		scope: "Venting and immediate anger regulation, with supportive conversation, ongoing exercise and clinical treatment kept distinct.",
		excludedEvidence: [
			"Arousal-increasing activities are not interchangeable with every form of emotional disclosure; observational strategy correlations are not treatment effects, and anger ratings are not a direct count of violent acts."
		],
		uncertainty: "Activities, outcomes and follow-up vary. This evidence does not provide an individual treatment plan or establish that one response works in every situation.",
		sources: [
			sources.anger1,
			sources.anger2,
			sources.anger3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-people-deliberately-change-their-personality-traits",
		title: "Can people deliberately change their personality traits?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Adult traits can change, and some programs report changes in the direction people want. Evidence for the added benefit of particular programs is mixed because expectations, measurement and selective follow-up can also produce apparent improvement.",
		editorSummary: "Wanting to change, reporting change and benefiting from a specific intervention are different claims. Most research concerns measured trait dimensions rather than switching personality types.",
		stableCore: [
			"A broad review found changes during clinical and other interventions, but combined randomized experiments with less conclusive before-and-after designs.",
			"A 2024 review found promising intervention effects in a small set of studies. A large digital trial reported self-rated changes, with less consistent observer-rated effects; its one-year follow-up retained only 157 of 1,523 baseline participants.",
			"A 2025 three-study investigation found similar improvements in intervention and control groups. It highlights selection, expectations and demand effects as competing explanations for some reported benefits."
		],
		openQuestions: [
			"Which components produce benefits beyond expectations and repeated measurement.",
			"How durable changes are and whether they improve outcomes beyond self-ratings."
		],
		whatWouldChangeMinds: [
			"Independent trials with credible controls, observer measures and low attrition.",
			"Longer follow-up showing meaningful everyday changes attributable to a defined program."
		],
		misconceptions: [
			"A follow-up of the same participants is not an independent replication."
		],
		population: "Adults in clinical-intervention research and mostly self-selected nonclinical personality-change studies.",
		scope: "Intentional change in measured adult personality traits, distinguishing change over time from intervention-specific efficacy and personality-type labels.",
		excludedEvidence: [
			"Pre/post improvement is not an untreated-control effect; the digital trial's waitlist began treatment after one month, and its small one-year completer group does not establish durable benefit for the entire baseline sample."
		],
		uncertainty: "Few controlled studies, overlapping samples, self-report and substantial attrition constrain conclusions. Clinical symptom changes and general personality change should not be treated as identical outcomes.",
		sources: [
			sources.personality1,
			sources.personality2,
			sources.personality3,
			sources.personality4,
			sources.personality5
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-well-does-birth-order-predict-personality",
		title: "How well does birth order predict personality?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Birth order is a weak guide to an individual's personality. Several large studies find little association with broad traits, while newer research finds small differences on some other personality measures, partly related to family size.",
		editorSummary: "Group averages do not establish a firstborn, middle-child or youngest-child personality type. Different trait measures and family comparisons can produce different findings.",
		stableCore: [
			"A three-country study using both within-family and between-family comparisons found no consistent birth-order differences in several broad personality traits, apart from findings concerning the intellectual domain.",
			"A newer study of more than 700,000 online respondents, with a second sample above 70,000, found differences in HEXACO honesty-humility and agreeableness. Differences within the same family size were considerably smaller.",
			"Other national-panel analyses found little support for many narrow traits or broad Big Five associations. The newer online samples and earlier representative panels use different methods and measures."
		],
		openQuestions: [
			"Which differences survive comparable measures, representative sampling and careful family-background controls.",
			"Whether small associations reflect sibling position, family size, upbringing or other influences."
		],
		whatWouldChangeMinds: [
			"Preregistered within-family comparisons spanning cultures and the same personality measures.",
			"Replicated effects that improve individual prediction beyond age and family background."
		],
		misconceptions: [
			"An average difference between family-size groups does not isolate an effect of being a middle child."
		],
		population: "National panels and large self-selected online adult samples, predominantly in Western or English-speaking settings.",
		scope: "Birth order and measured personality traits, distinguishing family size, within-family comparisons and intellectual outcomes.",
		excludedEvidence: [
			"Conditioning on family size is not a within-family sibling comparison; small group differences do not diagnose an individual, and personality and intelligence are separate outcomes."
		],
		uncertainty: "Measures, sampling and family controls differ. Even a large observational sample cannot establish that sibling position caused a trait difference.",
		sources: [
			sources.birthOrder1,
			sources.birthOrder2,
			sources.birthOrder3,
			sources.birthOrder4
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-smiling-change-how-happy-people-feel",
		title: "Can smiling change how happy people feel?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It can produce a small, short-term change in reported happiness under some conditions. The effect varies by task and does not establish that smiling treats depression or creates lasting wellbeing.",
		editorSummary: "Moving the face, judging a cartoon and reporting a feeling are different measures. Some ways of testing facial feedback work more consistently than others.",
		stableCore: [
			"A meta-analysis of 138 studies found a small overall facial-feedback effect with substantial variation. Effects on emotional experience and judgments of stimuli had different patterns of publication bias.",
			"The preregistered Many Smiles study included 3,878 people in 19 countries. Mimicry and voluntary facial actions changed reported happiness; an unobtrusive pen task gave less conclusive results.",
			"An earlier coordinated replication across 17 laboratories found little effect for a specific pen-and-cartoon task. This challenges that method without ruling out every form of facial feedback."
		],
		openQuestions: [
			"How long effects last outside brief experimental tasks.",
			"How much expectations, context and the particular facial action contribute."
		],
		whatWouldChangeMinds: [
			"Independent preregistered tests using credible controls and longer follow-up.",
			"Consistent benefits on meaningful everyday outcomes beyond immediate self-ratings."
		],
		misconceptions: [
			"A short-term change in happiness ratings is not evidence of an effective treatment for a mood disorder."
		],
		population: "Participants in heterogeneous facial-feedback experiments, including a preregistered international collaboration.",
		scope: "Immediate emotional experience after facial actions, distinguished from cartoon judgments, lasting wellbeing and clinical treatment.",
		excludedEvidence: [
			"The failure of a particular pen task does not test every smiling manipulation; study effects and independent samples are different denominators, and brief self-reports do not establish durable benefit."
		],
		uncertainty: "Effects are small and task-dependent. Awareness, expectations and differences in emotional context remain important interpretation limits.",
		sources: [
			sources.facialFeedback1,
			sources.facialFeedback2,
			sources.facialFeedback3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-much-can-facial-expressions-tell-us-about-emotion",
		title: "How much can facial expressions tell us about emotion?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Faces provide useful clues, but they do not supply a unique readout of someone's feelings. Context, movement, culture and the individual all affect what an expression means.",
		editorSummary: "Recognizing a posed expression in a test is different from knowing what a person is experiencing in daily life. The same movement can carry several meanings.",
		stableCore: [
			"A major review found that familiar facial patterns are associated with some emotions above chance, while also varying substantially across people, situations and cultures.",
			"A review of dynamic expressions finds that movement can improve recognition beyond static pictures, particularly when signals are subtle or degraded.",
			"A meta-analysis of faces and visual context found substantial influence in both directions. A separate study found that situational information could explain many emotion inferences as well as, or better than, combined facial and situational cues."
		],
		openQuestions: [
			"Which cues most accurately indicate a person's own experience in natural interactions.",
			"How results generalize beyond posed expressions and familiar emotion labels."
		],
		whatWouldChangeMinds: [
			"Replicated naturalistic studies with independent measures of experience and diverse cultural settings.",
			"Reliable predictions that generalize across people and contexts rather than only matching labels in a selected dataset."
		],
		misconceptions: [
			"A scowl or smile alone does not establish a unique emotion, intention or level of honesty."
		],
		population: "Participants interpreting facial movements and visual or situational context in heterogeneous emotion-perception studies.",
		scope: "Information conveyed by facial movements, distinguishing expression labeling, dynamic cues and inference about a person's internal experience.",
		excludedEvidence: [
			"Recognition of a posed label is not direct access to felt emotion; contextual influences do not mean faces convey no information, and benchmark accuracy does not validate individual high-stakes judgments."
		],
		uncertainty: "Ground truth for another person's experience is difficult to establish. Stimulus selection, category labels and cultural coverage affect apparent accuracy.",
		sources: [
			sources.emotionFaces1,
			sources.emotionFaces2,
			sources.emotionFaces3,
			sources.emotionFaces4
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-taking-photos-change-what-people-remember",
		title: "Does taking photos change what people remember?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Yes, but the direction varies. Some experiments find poorer unaided memory after taking photos; others find better visual memory alongside poorer memory for sounds.",
		editorSummary: "Being told to photograph each object, choosing what to capture and reviewing saved images are different activities. The kind of memory test also matters.",
		stableCore: [
			"Museum-style studies found poorer memory for objects photographed as a whole, while focusing on details sometimes removed that disadvantage.",
			"One field study and three laboratory studies found that freely choosing photos improved visual recognition but reduced auditory memory. This contrasts with some instructed photo-taking tasks.",
			"Recent experiments again found impairment with smartphone photos and screenshots, including differences by learning instructions. Divided attention alone did not explain every finding."
		],
		openQuestions: [
			"Which task and attention differences explain when photographing helps or harms unaided memory.",
			"How effects transfer to important real-life events and longer delays."
		],
		whatWouldChangeMinds: [
			"Preregistered comparisons separating voluntary choice, saving, attention and later photo review.",
			"Replicated field evidence covering visual detail, sounds and meaningful event memory together."
		],
		misconceptions: [
			"A photo-taking impairment result does not establish that every use of a camera worsens memory."
		],
		population: "Participants in small museum, simulated-tour and laboratory studies involving cameras, smartphones or screenshots.",
		scope: "Unaided memory after photography or saving images, with voluntary and instructed tasks and visual and auditory outcomes distinguished.",
		excludedEvidence: [
			"These findings do not measure all benefits of a saved archive or later review; visual recognition is not complete event recall, and a screenshot is not necessarily equivalent to a personally chosen photograph."
		],
		uncertainty: "Tasks and results vary, much evidence comes from short laboratory studies, and the mechanisms remain disputed.",
		sources: [
			sources.photoMemory1,
			sources.photoMemory2,
			sources.photoMemory3,
			sources.photoMemory4
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-stress-make-it-harder-to-recall-what-you-learned",
		title: "Does stress make it harder to recall what you learned?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It can, but the effect is not consistent across forms of stress or memory tasks. Stress during learning, after learning and during recall can have different effects.",
		editorSummary: "A difficult recall experience does not mean the memory was erased. Timing and the type of stress are central to interpreting the research.",
		stableCore: [
			"A synthesis of 113 studies spanning several memory phases found impairment when acute stress occurred just before or during retrieval. Other timings sometimes produced different or beneficial effects.",
			"A later review restricted to psychosocial stress found weaker effects than expected and no clear general impairment of episodic memory, highlighting differences between stressor types.",
			"A small registered meta-analysis found that retrieval practice outperformed restudy under stress. That comparison does not show that practice eliminates every stress-related deficit."
		],
		openQuestions: [
			"Which ordinary stress situations produce meaningful recall impairment outside laboratory settings.",
			"How learning history, emotional material and the delay to recall change the effect."
		],
		whatWouldChangeMinds: [
			"Preregistered studies separating memory phases, stress types and baseline performance.",
			"Replicated evidence that a protective learning strategy specifically reduces the additional effect of stress."
		],
		misconceptions: [
			"An effect on retrieving information does not establish destruction of the stored memory."
		],
		population: "Mostly human laboratory participants in acute-stress, episodic-memory and retrieval-practice studies.",
		scope: "Acute stress and recall of learned information, distinguished from encoding, consolidation, chronic stress and clinical memory disorders.",
		excludedEvidence: [
			"The 113-study total includes multiple memory phases, not only retrieval; better performance under stress versus restudy does not by itself identify a stress-protection interaction, and laboratory findings do not diagnose an individual's memory problem."
		],
		uncertainty: "Stressor types, timing and outcome measures differ. Evidence for ordinary social stress is less consistent than broad claims that stress invariably blocks recall.",
		sources: [
			sources.stressMemory1,
			sources.stressMemory2,
			sources.stressMemory3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-misleading-information-change-what-people-remember",
		title: "Can misleading information change what people remember?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Information encountered after an event can bias later reports of it. The size of the effect varies, and researchers still debate how much reflects changed memory, competing memories or the way people answer a test.",
		editorSummary: "A mistaken report does not reveal a single mechanism. Remembering an event, identifying the source of a detail and choosing an answer are related but distinct processes.",
		stableCore: [
			"A meta-analysis of post-event warnings found that warnings reduced the misinformation effect by more than half on average, rather than eliminating it.",
			"A contemporary replication found misleading information affected memory reports even with a broader answer format and incentives for accuracy, although the effect became smaller. Demand effects did not explain the whole result.",
			"Older experiments and a recent modeling study challenge the claim that original memories are necessarily overwritten. The recent study did not reproduce an overall effect, while finding different patterns among participant subgroups."
		],
		openQuestions: [
			"When misleading information changes a memory rather than source attribution or reporting.",
			"Which safeguards help across real-life contexts, delays and individual differences."
		],
		whatWouldChangeMinds: [
			"Preregistered replications using several measures that distinguish memory, source confusion and answer bias.",
			"Field evidence showing reliable protection without encouraging rejection of accurate information."
		],
		misconceptions: [
			"Evidence of a misinformation effect does not establish that every mistaken detail permanently replaced an original memory."
		],
		population: "Participants in post-event misinformation experiments and a synthesis of warning studies.",
		scope: "Later misleading information and event-memory reports, separated from therapy, recovered memories and judgments about an individual witness.",
		excludedEvidence: [
			"A laboratory group effect cannot establish whether a particular account is true; model fit does not uniquely identify a memory mechanism, and warning effectiveness does not guarantee immunity to misinformation."
		],
		uncertainty: "Test formats, expectations, timing and participant subgroups matter. Competing explanations remain viable even where the reporting effect replicates.",
		sources: [
			sources.misinformationMemory1,
			sources.misinformationMemory2,
			sources.misinformationMemory3,
			sources.misinformationMemory4
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-past-irrecoverable-costs-influence-current-decisions",
		title: "Do past irrecoverable costs influence current decisions?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Money or effort already spent can make people more willing to continue, even when it cannot be recovered. The size of this sunk-cost effect depends on the decision and its context.",
		editorSummary: "Continuing a project and deciding whether to use something already purchased are different decisions. Past spending can influence both, but persistence is not automatically an error.",
		stableCore: [
			"A meta-analysis of 98 effect sizes found a sunk-cost effect, with different patterns for using a purchased resource and investing more in an ongoing project.",
			"A systematic review of 56 consumer-research articles describes effects involving money, behavior, switching and evaluations after purchase. It maps varied findings rather than supplying one universal effect size.",
			"Two recent experiments found that prior cognitive effort increased willingness to continue an effortful task. Small laboratory samples limit conclusions about major real-life commitments."
		],
		openQuestions: [
			"How information about future benefits changes the influence of past investment.",
			"Which effects generalize from hypothetical or small-stakes tasks to consequential decisions."
		],
		whatWouldChangeMinds: [
			"Replicated field comparisons that separate irrecoverable costs from information about future value.",
			"Reliable evidence identifying which decision features reduce or amplify the effect."
		],
		misconceptions: [
			"Continuing after spending money is not itself proof of irrationality; future benefits and costs still matter."
		],
		population: "Participants in economic and consumer-decision studies, including small experiments on prior cognitive effort.",
		scope: "Influence of irrecoverable prior investment on present choices, distinguishing utilization, further investment and rational information about future outcomes.",
		excludedEvidence: [
			"An observed continuation decision does not identify a fallacy unless future incentives and information are considered; effect sizes are not independent study counts, and a brief effort task does not predict an individual's career or relationship decision."
		],
		uncertainty: "Decision types, stakes and resource measures vary. Some apparent sunk-cost patterns may involve learning or other rational considerations.",
		sources: [
			sources.sunkCost1,
			sources.sunkCost2,
			sources.sunkCost3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-losses-influence-choices-more-than-equally-sized-gains",
		title: "Do losses influence choices more than equally sized gains?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Often in studied choices, but not as a universal rule. Loss aversion varies with the task, reference point and model; it does not mean every loss feels exactly twice as painful as a gain feels pleasant.",
		editorSummary: "A fitted decision-model parameter and an emotional experience are different measurements. The evidence is strongest for specified choices and reference points.",
		stableCore: [
			"A 2024 synthesis examined 607 estimates from 150 articles and found an average loss-aversion coefficient near two. The estimates came from work reported between 1992 and 2017 and depend on modeling assumptions.",
			"A product-choice meta-analysis also found loss aversion, with substantial variation linked to products, reference points and analytic choices.",
			"Researchers dispute how general the principle is. A critical review questions a broad loss-over-gain rule, while a large multi-sample study finds loss aversion alongside differences by knowledge and age."
		],
		openQuestions: [
			"How much variation reflects preferences versus reference points, measurement or model assumptions.",
			"Which estimates generalize to different choices and populations."
		],
		whatWouldChangeMinds: [
			"Preregistered comparisons that separate loss sensitivity from risk preference and other competing explanations.",
			"Converging estimates across designs with transparent reference points and credible out-of-sample prediction."
		],
		misconceptions: [
			"A coefficient near two is not a universal ratio of pain or a measured percentage of expert agreement."
		],
		population: "Participants in heterogeneous economic and consumer-choice studies, with uneven representation of contexts and populations.",
		scope: "Relative influence of gains and losses in specified choices, distinguishing fitted coefficients, emotional response, risk aversion and status-quo preference.",
		excludedEvidence: [
			"Model coefficients are not direct measurements of pleasure or pain; an overall average does not apply to every person or task, and overlapping empirical estimates do not count independent experiments."
		],
		uncertainty: "Generalization and interpretation remain debated. Task design and modeling can change what appears to be loss aversion.",
		sources: [
			sources.lossPublished,
			sources.lossAversion1,
			sources.lossAversion2,
			sources.lossAversion3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-default-options-change-peoples-choices",
		title: "Do default options change people's choices?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. People are often more likely to keep a preselected option, though effects vary and can sometimes disappear or reverse. More sign-ups do not necessarily produce better final outcomes.",
		editorSummary: "Defaults can influence decisions through perceived recommendations, the status quo or the effort required to switch. Uptake, lasting consent and actual benefit need separate measurement.",
		stableCore: [
			"A meta-analysis of 58 studies with 73,675 participants found a substantial average default effect, alongside marked variation and some negative findings.",
			"A newer systematic consumer review identifies conditions that weaken or reverse effects and distinguishes initial choice from more durable consent.",
			"A field experiment with 32,508 high-school students increased registration for an achievement test through a default, without a significant increase in actual test-taking."
		],
		openQuestions: [
			"Which defaults lead to lasting outcomes aligned with people's own preferences.",
			"How transparency, trust and switching effort affect different populations."
		],
		whatWouldChangeMinds: [
			"Preregistered field studies following final outcomes as well as initial selection.",
			"Replicated evidence separating effects on choices, welfare and genuine informed preference."
		],
		misconceptions: [
			"An effective default for enrollment is not automatically an effective intervention for the ultimate outcome."
		],
		population: "Participants in varied consumer and policy studies, including a large educational field experiment.",
		scope: "Preselected options and observed choices, distinguishing enrollment, participation, durable consent and final benefit.",
		excludedEvidence: [
			"A pooled standardized effect is not a universal percentage-point increase; initial uptake does not establish welfare or lasting participation, and measured effectiveness alone does not settle ethical acceptability."
		],
		uncertainty: "Effects depend on setting and implementation. Evidence for initial selection is stronger than evidence that every default improves people's eventual outcomes.",
		sources: [
			sources.defaultsPublished,
			sources.defaults1,
			sources.defaults2
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "does-having-more-choice-make-decisions-harder",
		title: "Does having more choice make decisions harder?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It can, but more choice is not generally harmful. Difficulty, the similarity of options and uncertainty about preferences help explain why larger sets sometimes overwhelm people and sometimes help them.",
		editorSummary: "Feeling less satisfied, postponing a decision and choosing less accurately are different possible outcomes. There is no well-supported universal maximum number of options.",
		stableCore: [
			"A 2010 meta-analysis of 50 experiments found an average effect near zero but substantial differences between studies.",
			"A later meta-analysis identified task difficulty, option-set complexity, uncertain preferences and decision goals as moderators that could make overload more likely.",
			"A more recent systematic review maps a broad and varied literature, with continuing gaps across settings and methods. The different reviews include overlapping research and answer somewhat different questions."
		],
		openQuestions: [
			"Which moderators reliably predict overload in new settings rather than only explain existing results.",
			"How outcomes differ between online and physical choices and between experienced and unfamiliar decision-makers."
		],
		whatWouldChangeMinds: [
			"Preregistered tests of proposed moderators across representative real-world choices.",
			"Consistent improvements in decision quality and satisfaction from a defined change in options."
		],
		misconceptions: [
			"A famous example of overload does not establish that fewer options are always better."
		],
		population: "Participants in heterogeneous consumer-choice and decision experiments and reviews.",
		scope: "Number of options and decision-related outcomes, distinguishing satisfaction, deferral and task performance from a fixed cognitive capacity limit.",
		excludedEvidence: [
			"A mean effect near zero does not imply no one experiences overload; moderator findings are not a universal design rule, and the number of options is not the same as their complexity or the information required."
		],
		uncertainty: "Study designs, outcomes and settings vary. The most useful conditions and boundaries remain less certain than simple 'more is worse' claims suggest.",
		sources: [
			sources.choiceOverload1,
			sources.choiceOverload2,
			sources.choiceOverload3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "do-starting-numbers-influence-later-estimates",
		title: "Do starting numbers influence later estimates?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. A number considered first can pull a later estimate toward it. This anchoring effect is well supported across many tasks, but its size depends on how the number is presented and what people are estimating.",
		editorSummary: "A suggested price and an unrelated number are different kinds of anchor. Evidence for anchoring does not mean any random number will strongly change every decision.",
		stableCore: [
			"A large synthesis covering 2,601 effect sizes found substantial average anchoring effects, including after adjustment for publication bias. Incidental, random and unrelated-dimension anchors produced weaker or sometimes absent effects.",
			"A separate meta-analysis of 53 economic studies found a more moderate effect on willingness to pay or accept payment. Its authors caution that methodological limits make the estimate an upper bound.",
			"A high-powered replication found a much smaller bidding effect than the original experiment, with an interval including no effect. This challenges that experiment's reported magnitude, rather than the existence of anchoring in every other task."
		],
		openQuestions: [
			"How well particular effects generalize to informed, consequential decisions outside experiments.",
			"Which safeguards reduce bias without discarding genuinely useful information in a starting estimate."
		],
		whatWouldChangeMinds: [
			"Preregistered field comparisons with realistic incentives, relevant expertise and clear definitions of arbitrary versus informative anchors.",
			"Replicated predictions of effect size across tasks, including precise null findings."
		],
		misconceptions: [
			"A large average effect across selected tasks is not a guarantee that an unrelated random number changes a particular person's judgment."
		],
		population: "Participants in heterogeneous numerical-judgment experiments, economic valuation studies and a high-powered bidding replication.",
		scope: "Starting numerical comparisons and later estimates, distinguishing relevant suggestions, incidental priming, willingness to pay and actual decisions.",
		excludedEvidence: [
			"Effect sizes are not independent study counts; a null bidding replication does not test all numerical judgments, and a proposed price can convey information as well as act as an anchor."
		],
		uncertainty: "Effects vary with anchor relevance, presentation and outcome. Some prominent economic estimates shrink in higher-powered replications.",
		sources: [
			sources.anchoring1,
			sources.anchoring2,
			sources.anchoring3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-accurate-are-peoples-self-assessments-of-their-abilities",
		title: "How accurate are people's self-assessments of their abilities?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "People have some insight into their abilities, but self-ratings are an imperfect guide to performance. Accuracy varies with the skill, familiarity, feedback and how accuracy is measured.",
		editorSummary: "Knowing who performs better and knowing exactly how well you performed are different achievements. A person can rank people correctly while overestimating everyone's level.",
		stableCore: [
			"A synthesis of 22 meta-analyses found an average correlation of about 0.29 between self-evaluations and performance. That is a relationship between measures, not a claim that people are 29% accurate.",
			"A methodological commentary explains that correlation does not establish accurate absolute ratings. Overconfidence or underconfidence requires a separate comparison of rating levels.",
			"A review of 160 educational articles, covering 29,352 participants, found small average overestimation alongside substantial variation. Feedback, experience and content knowledge were associated with closer scoring."
		],
		openQuestions: [
			"Which kinds of feedback improve both accurate ranking and calibration over time.",
			"How findings transfer between school tasks, professional skills and unfamiliar abilities."
		],
		whatWouldChangeMinds: [
			"Preregistered longitudinal studies measuring both relative ranking and absolute accuracy against credible performance criteria.",
			"Replicated improvements that carry across tasks and persist when feedback is removed."
		],
		misconceptions: [
			"An imperfect correlation does not establish that every low performer is overconfident or every expert underconfident."
		],
		population: "People rating varied abilities and students scoring their own work against external evaluations.",
		scope: "Correspondence of self-ratings with measured performance, distinguishing relative ranking, absolute calibration and broad claims about overconfidence.",
		excludedEvidence: [
			"A correlation coefficient is not percentage accuracy; a teacher's score is an external criterion rather than infallible truth, and educational scoring studies do not establish every professional's self-knowledge."
		],
		uncertainty: "Measures and performance criteria differ, and educational studies often omit methodological detail. Average overestimation can coexist with accurate or underestimated individual ratings.",
		sources: [
			sources.selfAssessment1,
			sources.selfAssessment2,
			sources.selfAssessment3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-a-power-pose-increase-confidence",
		title: "Can a power pose increase confidence?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some studies find a short-lived increase in feeling powerful, especially compared with a contracted or slumped posture. Evidence that an expansive pose adds much beyond a neutral posture is weaker, and effects on hormones or real-world success are uncertain.",
		editorSummary: "Feeling powerful is a self-reported outcome, not a direct test of interview performance or lasting confidence. The comparison posture matters.",
		stableCore: [
			"A review of 73 studies found differences between expansive and contracted displays, but much smaller differences between expansive and neutral displays. Avoiding contraction may explain more than adopting a special pose.",
			"The authors' summary of a separate preregistered meta-analysis reports short-term self-perception effects, less robust behavioral findings and no clear physiological effect. Many experiments lacked a neutral comparison.",
			"A 200-person replication found higher self-reported power without the predicted hormone or behavioral changes. A later 92-person study found no effect on feelings of power or testosterone, alongside preliminary findings on some other outcomes."
		],
		openQuestions: [
			"Whether expansive posture improves confidence beyond a comfortable neutral posture, and for how long.",
			"Which effects survive expectation controls and transfer to consequential real-world performance."
		],
		whatWouldChangeMinds: [
			"Preregistered independent trials with neutral controls, transparent expectations and clearly separated subjective and objective outcomes.",
			"Replicated benefits on meaningful performance measures, with follow-up beyond the immediate experiment."
		],
		misconceptions: [
			"A difference between expansive and contracted postures does not establish a special confidence benefit over ordinary neutral posture."
		],
		population: "Predominantly adult experimental samples, with substantial reliance on Western settings and immediate self-reports.",
		scope: "Posture and short-term feelings of power or confidence, separated from hormone claims, employment outcomes and lasting personality change.",
		excludedEvidence: [
			"The APA reference is an author-written summary, not independent replication or a new review; high-versus-low comparisons cannot isolate benefits over neutral posture, and exploratory physiological findings require replication."
		],
		uncertainty: "Expectations, comparison postures and short follow-up complicate interpretation. Later physiological findings are inconsistent and do not establish a reliable performance technique.",
		sources: [
			sources.powerPose1,
			sources.postureAuthorSummary,
			sources.powerPose2,
			sources.powerPose3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "can-openly-labeled-placebos-improve-symptoms",
		title: "Can openly labeled placebos improve symptoms?",
		band: "mixed",
		certainty: "low",
		bottomLine: "They may improve some self-reported symptoms even when people know they are placebos. Benefits are less clear on objective measures, and the evidence does not establish that they treat an underlying disease or can replace effective care.",
		editorSummary: "Feeling better and changing physical disease or function are different outcomes. Expectations and awareness of treatment make symptom ratings harder to interpret.",
		stableCore: [
			"A 2025 meta-analysis of 60 randomized trials found a small average effect, with larger changes in self-reports than in objective outcomes. Its search ended in November 2023, so its publication year does not imply coverage of all newer trials.",
			"An earlier review of non-clinical experiments also found improvements in self-reports but no clear objective benefit. Its authors rated the evidence low to very low quality.",
			"A review of seven chronic musculoskeletal-pain trials found some improvement in reported pain and function, without improvement on physical-function tests. All included symptom-rating results were at high risk of bias, and clinical value remained uncertain."
		],
		openQuestions: [
			"How much improvement reflects changed symptoms, reporting expectations or the care surrounding an intervention.",
			"Whether benefits are meaningful, durable and reproducible with suitable active comparisons."
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with matched attention, objective outcomes and meaningful long-term symptom thresholds.",
			"Replicated benefits that add value to established care without delaying diagnosis or effective treatment."
		],
		misconceptions: [
			"An improvement in an unblinded symptom rating does not establish recovery from disease or prove that symptoms were imaginary."
		],
		population: "Clinical and non-clinical trial participants, including people with chronic back or knee pain; outcomes and conditions vary.",
		scope: "Disclosed placebo interventions and measured symptoms, distinguishing subjective ratings, objective physical function and underlying disease.",
		excludedEvidence: [
			"The cited reviews overlap and are not independent sets of trials; unblinded rating changes do not establish disease modification, and this evidence does not support replacing indicated care."
		],
		uncertainty: "Small samples, overlapping reviews, awareness of treatment and limited long-term evidence constrain confidence. Benefit on symptoms is more plausible than proven improvement in objective function.",
		sources: [
			sources.openPlacebo1,
			sources.openPlacebo2,
			sources.openPlacebo3
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "can-subliminal-advertising-influence-peoples-choices",
		title: "Can subliminal advertising influence people's choices?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some experiments find small, short-lived effects on choices when a cue matches an existing goal. The evidence does not establish reliable control of purchases or lasting persuasion in everyday advertising.",
		editorSummary: "A briefly presented cue, a cue shown to be outside awareness and an ordinary visible advertisement are different things. Laboratory brand preference is also different from real spending.",
		stableCore: [
			"An early meta-analysis found a very small overall relationship between subliminal advertising and consumer choice. Its age and methods limit its use as a current estimate.",
			"Later experiments reported goal-dependent effects on drink preferences, particularly among thirsty participants. A follow-up series found that adding a delay removed the observed choice effect.",
			"A recent pair of experiments with 370 undergraduates in China reported subtle, goal-dependent brand-preference effects. These selected laboratory tasks do not demonstrate durable influence across consumers or real purchases."
		],
		openQuestions: [
			"Which effects survive rigorous awareness tests, preregistration and independent replication.",
			"Whether any changes persist and matter for actual purchases outside an immediate laboratory task."
		],
		whatWouldChangeMinds: [
			"Independent preregistered studies with credible checks of awareness, realistic delays and actual purchase outcomes.",
			"Consistent effects across populations and goals, with full reporting of precise null results."
		],
		misconceptions: [
			"Evidence for a small goal-dependent preference shift does not establish that an advertiser can create arbitrary desires without awareness."
		],
		population: "Selected consumer experiments, including adult laboratory participants and Chinese undergraduates; evidence is concentrated on immediate preferences.",
		scope: "Subliminal or masked advertising cues and consumer choice, distinguished from visible persuasion, reaction-time priming and durable purchasing behavior.",
		excludedEvidence: [
			"Brief presentation alone does not demonstrate lack of awareness; intentions and laboratory preferences are not completed purchases, and studies of one immediate goal cannot establish general persuasion."
		],
		uncertainty: "Awareness measurement, timing, existing motivation and selective settings matter. Reliable long-term or marketplace effects remain unestablished.",
		sources: [
			sources.subliminal1,
			sources.subliminal2,
			sources.subliminal3,
			sources.subliminal4
		]
	}, novemberMemoryJudgmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "neuroscience-and-psychology",
		slug: "how-well-do-personality-traits-predict-job-performance",
		title: "How well do personality traits predict job performance?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Personality traits have modest average links with job performance. Conscientiousness is a relatively consistent predictor, but the job, situation and type of performance matter; a personality score cannot determine how one person will perform.",
		editorSummary: "Task performance, helping colleagues and harmful workplace behavior are different outcomes. A useful group association does not validate every commercial personality test or hiring rule.",
		stableCore: [
			"A synthesis of 54 meta-analyses found links between broad personality traits and performance, with conscientiousness among the more consistent predictors. Its full sample combines academic and work outcomes, rather than job performance alone.",
			"A recent review finds that associations differ across task performance, helpful organizational behavior and counterproductive behavior. Situations interact with traits rather than leaving personality as the sole explanation.",
			"A meta-analysis of narrower conscientiousness traits found some added predictive value beyond a broad score. The improvement depended on the occupation and the particular performance criterion."
		],
		openQuestions: [
			"Which trait measures add useful prediction beyond relevant skills and other fair, validated assessments.",
			"How accuracy and fairness change across jobs, cultures, measurement methods and changing work conditions."
		],
		whatWouldChangeMinds: [
			"Preregistered out-of-sample validation using relevant work outcomes and representative applicants.",
			"Replicated evidence that a specific measure improves decisions while meeting appropriate fairness and accessibility standards."
		],
		misconceptions: [
			"A correlation with job performance is not the percentage of workers classified correctly, and it does not make a trait a fixed destiny."
		],
		population: "Workers and other performance-study participants across occupations and trait measures; the broadest synthesis also includes educational outcomes.",
		scope: "Personality-trait associations with defined job-performance outcomes, separated from diagnosis, fixed personality types and validation of any particular hiring product.",
		excludedEvidence: [
			"Academic-plus-work sample totals are not job-only samples; group correlations do not establish causal effects or individual verdicts, and narrow-trait findings depend on the criterion and occupation."
		],
		uncertainty: "Average associations are modest, measures differ and situations influence their usefulness. Specific selection tools need their own performance and fairness evidence.",
		sources: [
			sources.personalityWork1,
			sources.personalityWork2,
			sources.personalityWork3
		]
	}, novemberMemoryJudgmentResearchCheckedAt)
];
