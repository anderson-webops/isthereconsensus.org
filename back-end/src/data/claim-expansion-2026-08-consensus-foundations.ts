import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheFourSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026ConsensusFoundationsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Does statistical significance tell you whether an effect is large or important?",
		slug: "does-statistical-significance-tell-you-whether-an-effect-is-large-or-important",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. A small p-value describes how incompatible the data are with a specified statistical model; it does not measure effect size, practical importance, clinical value, or the probability that a claim is true. Magnitude, uncertainty, baseline risk, costs, and consequences must be evaluated separately.",
		stableCore: [
			"A tiny effect can be statistically significant in a large sample, while an important effect can miss a threshold in a small or noisy study.",
			"Effect estimates and confidence intervals carry information about magnitude and precision that a thresholded p-value discards.",
			"Clinical, social, or policy importance requires a decision context; it is not encoded in statistical significance."
		],
		openQuestions: [
			"Which minimum important difference is appropriate for the population and outcome being studied?",
			"How should benefits, harms, costs, and uncertainty be combined for the actual decision?"
		],
		whatWouldChangeMinds: [
			"A coherent statistical result showing that p-values uniquely encode effect magnitude and practical value across sample sizes and decision contexts.",
			"Evidence that reporting estimates and uncertainty adds no useful information beyond a significance label."
		],
		misconceptions: [
			"Statistically significant does not mean large, important, or likely to replicate.",
			"A p-value below 0.05 is not a 95% probability that the research hypothesis is true.",
			"Statistical significance and real-world importance can point in different directions."
		],
		editorSummary:
			"Treat significance as one model-based diagnostic, not a verdict. Readers need the estimated effect, its uncertainty, the baseline, and the decision stakes before they can judge importance.",
		uncertaintySummary:
			"The interpretation is settled; uncertainty lies in the effect estimate and in the context-specific threshold for practical importance.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The ASA Statement on p-Values: Context, Process, and Purpose",
				publisher: "The American Statistician",
				year: 2016,
				url: "https://doi.org/10.1080/00031305.2016.1154108",
				doi: "10.1080/00031305.2016.1154108",
				note: "Professional statement distinguishing statistical significance from effect size, importance, and the truth of a hypothesis."
			},
			{
				kind: "guideline",
				title: "Effect size, confidence interval and statistical significance: a practical guide for biologists",
				publisher: "Biological Reviews",
				year: 2007,
				url: "https://doi.org/10.1111/j.1469-185X.2007.00027.x",
				doi: "10.1111/j.1469-185X.2007.00027.x",
				note: "Practical explanation of why magnitude and precision must accompany null-hypothesis testing."
			},
			{
				kind: "systematic_review",
				title: "Thresholds for statistical and clinical significance in systematic reviews with meta-analytic methods",
				publisher: "BMC Medical Research Methodology",
				year: 2014,
				url: "https://doi.org/10.1186/1471-2288-14-120",
				doi: "10.1186/1471-2288-14-120",
				note: "Review of the separate statistical and clinical thresholds used when interpreting synthesized effects."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Does a non-significant result prove there is no effect?",
		slug: "does-a-non-significant-result-prove-there-is-no-effect",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Failure to cross a significance threshold can reflect a genuinely small effect, imprecise data, low power, measurement error, or model choices. A defensible no-important-effect conclusion requires estimates precise enough to exclude effects that would matter, often using confidence intervals or an equivalence design.",
		stableCore: [
			"Not rejecting a null hypothesis is not the same operation as proving the null hypothesis.",
			"Wide confidence intervals may remain compatible with meaningful benefit, harm, and no effect at the same time.",
			"Equivalence and non-inferiority questions need prespecified margins and designs suited to those claims."
		],
		openQuestions: [
			"Was the study precise enough to rule out the smallest effect that would change practice?",
			"Were missing data, measurement error, and analysis choices capable of hiding a real effect?"
		],
		whatWouldChangeMinds: [
			"A valid inferential framework in which every non-significant result reliably identifies a true zero effect.",
			"Evidence that interval width, statistical power, and equivalence margins never alter the interpretation of a null result."
		],
		misconceptions: [
			"No evidence of an effect is not automatically evidence of no effect.",
			"A p-value just above 0.05 is not categorically different from one just below it.",
			"Larger samples improve precision but do not repair biased measurement or design."
		],
		editorSummary:
			"Read the interval, not just the label. If important effects remain inside the plausible range, the study is inconclusive rather than proof of absence.",
		uncertaintySummary:
			"The inferential principle is established. Whether a particular null result excludes a meaningful effect depends on precision, design, and the decision threshold.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The ASA Statement on p-Values: Context, Process, and Purpose",
				publisher: "The American Statistician",
				year: 2016,
				url: "https://doi.org/10.1080/00031305.2016.1154108",
				doi: "10.1080/00031305.2016.1154108",
				note: "Explains why conclusions should not hinge on crossing an arbitrary p-value threshold."
			},
			{
				kind: "guideline",
				title: "Statistics notes: Absence of evidence is not evidence of absence",
				publisher: "BMJ",
				year: 1995,
				url: "https://doi.org/10.1136/bmj.311.7003.485",
				doi: "10.1136/bmj.311.7003.485",
				note: "Classic explanation of why an underpowered or imprecise null result cannot establish equivalence."
			},
			{
				kind: "guideline",
				title: "Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations",
				publisher: "European Journal of Epidemiology",
				year: 2016,
				url: "https://doi.org/10.1007/s10654-016-0149-3",
				doi: "10.1007/s10654-016-0149-3",
				note: "Comprehensive methodological guide to common null-result, interval, and power errors."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Does a 95% confidence interval give a 95% probability that the true value is inside it?",
		slug: "does-a-95-percent-confidence-interval-give-a-95-percent-probability-that-the-true-value-is-inside-it",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Not under the usual frequentist definition. After one interval is calculated, the fixed parameter is either inside it or not; the 95% refers to the long-run coverage of intervals produced by the procedure under its assumptions. Probability statements about the parameter require an explicitly Bayesian model and prior.",
		stableCore: [
			"A confidence interval is generated by a procedure whose repeated intervals would cover the target parameter at a stated rate when assumptions hold.",
			"The interval does not assign probability uniformly to values inside it or zero probability to values outside it.",
			"Its usefulness still depends on model fit, sampling, measurement, and whether the target quantity was defined correctly."
		],
		openQuestions: [
			"Which model assumptions and repeated-sampling process make the reported coverage meaningful?",
			"Would a Bayesian credible interval answer the decision-maker's probability question more directly, and with what prior sensitivity?"
		],
		whatWouldChangeMinds: [
			"A revision of frequentist interval theory that makes a post-data probability statement about a fixed parameter without additional assumptions.",
			"Evidence that the common probability interpretation remains calibrated across arbitrary stopping, selection, and model misspecification."
		],
		misconceptions: [
			"The 95% label is not a guarantee that this particular interval contains the truth.",
			"Values just outside the interval are not impossible, and values just inside it are not equally plausible.",
			"A narrow interval can be precisely wrong when the design or model is biased."
		],
		editorSummary:
			"Confidence intervals are valuable summaries of estimate and precision, but their standard interpretation is procedural. Do not silently translate them into posterior probabilities.",
		uncertaintySummary:
			"The mathematical distinction is settled. Applied uncertainty concerns whether the interval's assumptions and target match the real question.",
		sources: [
			{
				kind: "guideline",
				title: "Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations",
				publisher: "European Journal of Epidemiology",
				year: 2016,
				url: "https://doi.org/10.1007/s10654-016-0149-3",
				doi: "10.1007/s10654-016-0149-3",
				note: "Defines confidence-interval coverage and catalogs probability interpretations the interval does not support."
			},
			{
				kind: "landmark_study",
				title: "Robust misinterpretation of confidence intervals",
				publisher: "Psychonomic Bulletin & Review",
				year: 2014,
				url: "https://doi.org/10.3758/s13423-013-0572-3",
				doi: "10.3758/s13423-013-0572-3",
				note: "Empirical study documenting persistent misunderstandings of confidence intervals among researchers and students."
			},
			{
				kind: "guideline",
				title: "The fallacy of placing confidence in confidence intervals",
				publisher: "Psychonomic Bulletin & Review",
				year: 2016,
				url: "https://doi.org/10.3758/s13423-015-0947-8",
				doi: "10.3758/s13423-015-0947-8",
				note: "Technical review of what standard confidence intervals do and do not license after observing data."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Can testing many hypotheses create false-positive findings without adjustment?",
		slug: "can-testing-many-hypotheses-create-false-positive-findings-without-adjustment",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. When many outcomes, subgroups, time points, models, or hypotheses are tested, the chance that at least one result crosses a conventional threshold can rise sharply. Prespecification, multiplicity-aware methods, transparent reporting, and replication help distinguish discovery from chance patterns.",
		stableCore: [
			"A 5% per-test false-positive rate does not remain a 5% family-wide rate when many independent tests are searched.",
			"The appropriate correction depends on whether the analysis is confirmatory or exploratory and on which set of claims forms the testing family.",
			"Multiplicity also arises through undisclosed analytical flexibility, not only through a visible list of p-values."
		],
		openQuestions: [
			"Which hypotheses belong to the same decision family, and which error rate should the study control?",
			"How much unreported model, subgroup, and outcome searching occurred before the published result was selected?"
		],
		whatWouldChangeMinds: [
			"A valid probability demonstration that searching more null hypotheses leaves the chance of at least one threshold crossing unchanged.",
			"Evidence that transparent multiplicity controls and independent confirmation never improve calibration."
		],
		misconceptions: [
			"Multiplicity correction is not a punishment for collecting rich data; it aligns claims with the search that produced them.",
			"Exploratory findings can be useful when labeled and followed up rather than presented as final confirmation.",
			"A single corrected p-value still does not measure effect size or practical importance."
		],
		editorSummary:
			"The more opportunities an analysis has to find a dramatic result, the more the reader needs to know about that search. Adjustment, disclosure, and replication address different parts of the problem.",
		uncertaintySummary:
			"The probability principle is settled. Judgment remains over the relevant hypothesis family and the tradeoff between missed signals and false discoveries.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The ASA Statement on p-Values: Context, Process, and Purpose",
				publisher: "The American Statistician",
				year: 2016,
				url: "https://doi.org/10.1080/00031305.2016.1154108",
				doi: "10.1080/00031305.2016.1154108",
				note: "Calls for full reporting and warns against selective inference from thresholded results."
			},
			{
				kind: "guideline",
				title: "Why we (usually) don't have to worry about multiple comparisons",
				publisher: "Journal of Research on Educational Effectiveness",
				year: 2012,
				url: "https://doi.org/10.1080/19345747.2011.618213",
				doi: "10.1080/19345747.2011.618213",
				note: "Explains how hierarchical modeling and the scientific context can address multiplicity without one mechanical rule for every analysis."
			},
			{
				kind: "guideline",
				title: "Adjusting for multiple testing—when and how?",
				publisher: "Journal of Clinical Epidemiology",
				year: 2001,
				url: "https://doi.org/10.1016/S0895-4356(00)00314-0",
				doi: "10.1016/S0895-4356(00)00314-0",
				note: "Methodological guidance on confirmatory families, exploratory analyses, and error-rate control."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Must a replication copy the original study exactly to be informative?",
		slug: "must-a-replication-copy-the-original-study-exactly-to-be-informative",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Close replications test whether a result can recur under similar conditions, while replications that deliberately vary populations, settings, or operations test generality. Both can be informative when the target claim and expected differences are specified before results are known.",
		stableCore: [
			"No replication is literally identical because new observations, people, materials, and time are involved.",
			"A useful replication identifies which theoretical claim is being tested and which differences should or should not matter.",
			"Exact-looking procedural copying can still miss tacit conditions, while planned variation can reveal a claim's boundary conditions."
		],
		openQuestions: [
			"Which differences are theoretically irrelevant and which are plausible moderators of the effect?",
			"How many independent tests across settings are needed before the field can claim broad generality?"
		],
		whatWouldChangeMinds: [
			"Evidence that only literal procedural duplication can test whether a scientific claim generalizes.",
			"A framework showing that planned variation cannot distinguish robust effects from hidden boundary conditions."
		],
		misconceptions: [
			"A different population does not automatically make a replication invalid; it may change the question being tested.",
			"A successful close replication does not prove every broader version of the claim.",
			"Disagreement over a replication can reflect an underspecified original claim rather than bad faith."
		],
		editorSummary:
			"Replication is a family of tests, not one ritual. The key is to define the claim, disclose the differences, and interpret success or failure at the scope actually tested.",
		uncertaintySummary:
			"Experts broadly agree on the conceptual distinction; the appropriate replication design depends on the mechanism and generality claim at issue.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Reproducibility and Replicability in Science",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2019,
				url: "https://doi.org/10.17226/25303",
				doi: "10.17226/25303",
				note: "Consensus report defining reproducibility and replicability across fields and explaining sources of informative variation."
			},
			{
				kind: "guideline",
				title: "What is replication?",
				publisher: "PLOS Biology",
				year: 2020,
				url: "https://doi.org/10.1371/journal.pbio.3000691",
				doi: "10.1371/journal.pbio.3000691",
				note: "Framework that defines replication by testing a claim rather than by superficial procedural similarity alone."
			},
			{
				kind: "consensus_statement",
				title: "A manifesto for reproducible science",
				publisher: "Nature Human Behaviour",
				year: 2017,
				url: "https://doi.org/10.1038/s41562-016-0021",
				doi: "10.1038/s41562-016-0021",
				note: "Broad reform synthesis covering replication, transparency, methods, incentives, and cumulative evidence."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Can a meta-analysis rescue a body of biased or low-quality studies?",
		slug: "can-a-meta-analysis-rescue-a-body-of-biased-or-low-quality-studies",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Not by itself. Meta-analysis can improve precision and explain variation, but combining biased, selectively reported, incomparable, or poorly measured studies can produce a precise summary of the wrong quantity. Conclusions remain limited by the included evidence and the review process.",
		stableCore: [
			"Statistical pooling does not cancel systematic bias shared across studies.",
			"Eligibility rules, outcome definitions, risk-of-bias assessment, heterogeneity, and missing results can matter more than the pooled estimate.",
			"Sensitivity analyses can show how conclusions depend on assumptions, but cannot recover unknown missing evidence with certainty."
		],
		openQuestions: [
			"Are the studies estimating a sufficiently common target to justify pooling?",
			"How strongly could missing results, selective outcomes, or high-risk studies move the synthesis?"
		],
		whatWouldChangeMinds: [
			"A validated synthesis method that reliably removes unknown shared bias using only the biased published estimates.",
			"Evidence that review quality and the validity of component studies do not affect meta-analytic conclusions."
		],
		misconceptions: [
			"More studies are not automatically better when they repeat the same flaw.",
			"A narrow pooled confidence interval does not certify low bias.",
			"Calling a paper a meta-analysis says what calculation was attempted, not whether the review was trustworthy."
		],
		editorSummary:
			"A meta-analysis is an evidence amplifier. It can sharpen a sound literature or amplify its selection and design problems, so appraisal must precede confidence in the pooled number.",
		uncertaintySummary:
			"The limitation is well established. The degree of distortion in any one synthesis depends on study quality, comparability, missing evidence, and modeling choices.",
		sources: [
			{
				kind: "guideline",
				title: "Cochrane Handbook for Systematic Reviews of Interventions, Chapter 13: Assessing risk of bias due to missing evidence in a meta-analysis",
				publisher: "Cochrane",
				year: 2024,
				url: "https://training.cochrane.org/handbook/current/chapter-13",
				note: "Current handbook guidance on publication, outcome, and analysis non-reporting biases in evidence synthesis."
			},
			{
				kind: "guideline",
				title: "AMSTAR 2: a critical appraisal tool for systematic reviews that include randomised or non-randomised studies of healthcare interventions, or both",
				publisher: "BMJ",
				year: 2017,
				url: "https://doi.org/10.1136/bmj.j4008",
				doi: "10.1136/bmj.j4008",
				note: "Appraisal framework showing why protocol, search, bias, and synthesis methods determine review credibility."
			},
			{
				kind: "landmark_study",
				title: "Why Most Published Research Findings Are False",
				publisher: "PLOS Medicine",
				year: 2005,
				url: "https://doi.org/10.1371/journal.pmed.0020124",
				doi: "10.1371/journal.pmed.0020124",
				note: "Influential analytical account of how bias, flexibility, low prior probability, and selective publication affect a literature."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Does randomization automatically answer every causal or policy question?",
		slug: "does-randomization-automatically-answer-every-causal-or-policy-question",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Random assignment is powerful for estimating a specified treatment contrast in the study sample, but it does not guarantee precise measurement, blinding, adherence, complete follow-up, correct analysis, or transport to other populations. Many causal questions are also infeasible or unethical to randomize.",
		stableCore: [
			"Randomization addresses confounding in expectation for the assigned contrast; chance imbalances and post-randomization problems can remain.",
			"Internal validity does not automatically establish external validity, mechanism, long-term effects, or effects of scaling a policy.",
			"Trials are strongest when combined with clear estimands, transparent analysis, implementation evidence, and other methods."
		],
		openQuestions: [
			"How well does the trial population, implementation, and follow-up match the real decision?",
			"Which spillovers, rare harms, behavioral responses, or system effects lie outside the randomized contrast?"
		],
		whatWouldChangeMinds: [
			"Evidence that random assignment alone guarantees measurement validity, precision, adherence, follow-up, and generalizability.",
			"A demonstration that questions involving history, rare harm, long latency, or whole-system effects are always ethically and practically randomizable."
		],
		misconceptions: [
			"Critiquing a trial's scope does not make randomization unimportant.",
			"A clean average treatment effect for one sample is not a universal law.",
			"Observational and mechanistic evidence can add information a trial was not designed to identify."
		],
		editorSummary:
			"Randomization is a design tool, not a quality seal for every part of a study. Ask what was randomized, what was measured, who was included, and where the conclusion is meant to travel.",
		uncertaintySummary:
			"The design limits are established. How much they matter varies by adherence, attrition, outcome, population, intervention, and policy scale.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Reproducibility and Replicability in Science",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2019,
				url: "https://doi.org/10.17226/25303",
				doi: "10.17226/25303",
				note: "Consensus assessment of how study design, statistical inference, replication, and converging evidence support confidence."
			},
			{
				kind: "guideline",
				title: "Understanding and misunderstanding randomized controlled trials",
				publisher: "Social Science & Medicine",
				year: 2018,
				url: "https://doi.org/10.1016/j.socscimed.2017.12.005",
				doi: "10.1016/j.socscimed.2017.12.005",
				note: "Methodological critique of exaggerated claims about what randomization alone guarantees."
			},
			{
				kind: "systematic_review",
				title: "External validity of randomised controlled trials: to whom do the results of this trial apply?",
				publisher: "The Lancet",
				year: 2005,
				url: "https://doi.org/10.1016/S0140-6736(04)17670-8",
				doi: "10.1016/S0140-6736(04)17670-8",
				note: "Review of determinants and reporting problems affecting generalizability from trials to routine populations."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Are observational studies useless for learning about causal effects?",
		slug: "are-observational-studies-useless-for-learning-about-causal-effects",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Observational data can support causal inference when the question, time zero, comparison, confounding assumptions, and analysis are explicit, especially where trials are impossible or incomplete. The conclusions are generally more assumption-sensitive, so design, negative controls, triangulation, and sensitivity analysis matter.",
		stableCore: [
			"Random assignment is not a prerequisite for every causal inference, but uncontrolled association alone is insufficient.",
			"Target-trial emulation can expose immortal-time, selection, and treatment-definition errors before analysis.",
			"Agreement across methods with different biases can be more persuasive than repetition of one observational design."
		],
		openQuestions: [
			"Which unmeasured confounders or selection processes could plausibly explain the observed association?",
			"Can natural experiments, negative controls, instrumental variables, or other designs probe the same question with different assumptions?"
		],
		whatWouldChangeMinds: [
			"Evidence that valid causal conclusions have never emerged from observational or quasi-experimental designs.",
			"A proof that all non-randomized causal estimates remain unidentified even with correct longitudinal design and measured confounding."
		],
		misconceptions: [
			"Calling data observational does not reveal whether the design is careful or naive.",
			"Statistical adjustment cannot rescue a badly defined time zero, treatment, or comparison group.",
			"A plausible mechanism strengthens interpretation but does not erase confounding on its own."
		],
		editorSummary:
			"The useful divide is not randomized good versus observational useless. It is whether the design makes the causal contrast and its assumptions explicit enough to test and criticize.",
		uncertaintySummary:
			"The methodological capability is established; confidence in any estimate depends on design quality and the plausibility of untestable assumptions.",
		sources: [
			{
				kind: "guideline",
				title: "Using Big Data to Emulate a Target Trial When a Randomized Trial Is Not Available",
				publisher: "American Journal of Epidemiology",
				year: 2016,
				url: "https://doi.org/10.1093/aje/kwv254",
				doi: "10.1093/aje/kwv254",
				note: "Framework for structuring observational causal analyses around an explicit hypothetical trial."
			},
			{
				kind: "guideline",
				title: "Triangulation in aetiological epidemiology",
				publisher: "International Journal of Epidemiology",
				year: 2017,
				url: "https://doi.org/10.1093/ije/dyw314",
				doi: "10.1093/ije/dyw314",
				note: "Explains how evidence from methods with different bias structures can strengthen or weaken causal confidence."
			},
			{
				kind: "guideline",
				title: "Cochrane Handbook, Chapter 25: Assessing risk of bias in a non-randomized study",
				publisher: "Cochrane",
				year: 2024,
				url: "https://training.cochrane.org/handbook/current/chapter-25",
				note: "Current structured guidance for evaluating confounding, selection, classification, missing data, measurement, and selective reporting."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Does one failed replication prove the original finding was false?",
		slug: "does-one-failed-replication-prove-the-original-finding-was-false",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. A failed replication lowers confidence, sometimes sharply, but either study can be affected by sampling error, low power, measurement differences, implementation failures, or real boundary conditions. The claim should be updated using the quality and joint evidence, not decided by whichever study came last.",
		stableCore: [
			"A single successful replication does not prove a claim, and a single failure does not conclusively refute it.",
			"Replication results are most informative when protocols, deviations, precision, and the target claim are transparent.",
			"Repeated independent results and synthesis reveal whether an effect is stable, smaller than first reported, context-bound, or unsupported."
		],
		openQuestions: [
			"Were both studies capable of detecting the same substantively meaningful effect under comparable conditions?",
			"Does the full set of replications reveal heterogeneity, publication bias, or an initially exaggerated effect?"
		],
		whatWouldChangeMinds: [
			"A valid rule showing that the latest single experiment always dominates all earlier evidence regardless of design or precision.",
			"Evidence that sampling variation and implementation differences cannot produce replication disagreement."
		],
		misconceptions: [
			"A replication is evidence about a claim, not an automatic verdict on the competence or integrity of the original authors.",
			"Failure to cross p < 0.05 is not necessarily evidence that two study estimates conflict.",
			"A smaller replicated effect can support a narrower claim while rejecting the original magnitude."
		],
		editorSummary:
			"Replication should update a cumulative record. Compare estimates, uncertainty, methods, and conditions before declaring either vindication or collapse.",
		uncertaintySummary:
			"The cumulative principle is settled. The evidential weight of a failure depends on replication power, fidelity, independence, and the specificity of the claim.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Reproducibility and Replicability in Science",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2019,
				url: "https://doi.org/10.17226/25303",
				doi: "10.17226/25303",
				note: "Consensus report explicitly explaining why one failed replication does not conclusively refute an original claim."
			},
			{
				kind: "guideline",
				title: "What is replication?",
				publisher: "PLOS Biology",
				year: 2020,
				url: "https://doi.org/10.1371/journal.pbio.3000691",
				doi: "10.1371/journal.pbio.3000691",
				note: "Claim-centered framework for interpreting replication successes, failures, and design differences."
			},
			{
				kind: "landmark_study",
				title: "Estimating the reproducibility of psychological science",
				publisher: "Science",
				year: 2015,
				url: "https://doi.org/10.1126/science.aac4716",
				doi: "10.1126/science.aac4716",
				note: "Large coordinated replication project illustrating effect attenuation, uncertainty, and the need for field-level interpretation."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "consensus-foundations",
		title: "Can converging evidence from different methods strengthen a causal conclusion?",
		slug: "can-converging-evidence-from-different-methods-strengthen-a-causal-conclusion",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. When experiments, natural experiments, observations, mechanisms, time patterns, and other approaches with different likely biases point to the same explanation, confidence can be stronger than from repeated use of one method. Convergence is most persuasive when the methods do not share the same failure mode.",
		stableCore: [
			"Every method has assumptions; triangulation asks whether alternative methods would be biased in the same direction for the same reason.",
			"Consistency alone is insufficient if the studies reuse the same data, measurements, selection process, or confounding structure.",
			"Mechanistic and population evidence answer different parts of a causal claim and can constrain each other's interpretation."
		],
		openQuestions: [
			"How independent are the data sources, assumptions, and likely errors behind the apparent convergence?",
			"Could one unmeasured process generate all of the observed lines of evidence?"
		],
		whatWouldChangeMinds: [
			"A better explanation that predicts the same cross-method pattern with fewer unsupported assumptions.",
			"Evidence that the apparently independent methods share a hidden data source or common bias capable of producing the convergence."
		],
		misconceptions: [
			"Ten versions of the same biased design are not ten independent lines of evidence.",
			"Triangulation does not mean taking a vote among studies of unequal relevance and quality.",
			"Converging evidence can raise confidence without creating absolute certainty."
		],
		editorSummary:
			"Scientific confidence often comes from an interlocking evidence network. The important question is whether each line fails differently, not simply how many papers agree.",
		uncertaintySummary:
			"The value of triangulation is broadly accepted; its strength is case-specific because method independence and bias direction must be argued rather than counted.",
		sources: [
			{
				kind: "guideline",
				title: "Triangulation in aetiological epidemiology",
				publisher: "International Journal of Epidemiology",
				year: 2017,
				url: "https://doi.org/10.1093/ije/dyw314",
				doi: "10.1093/ije/dyw314",
				note: "Formal framework for combining approaches with unrelated sources of bias to improve causal inference."
			},
			{
				kind: "consensus_statement",
				title: "Reproducibility and Replicability in Science",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2019,
				url: "https://doi.org/10.17226/25303",
				doi: "10.17226/25303",
				note: "Consensus report describing mutually reinforcing evidence and cumulative confidence across methods."
			},
			{
				kind: "landmark_study",
				title: "The Environment and Disease: Association or Causation?",
				publisher: "Proceedings of the Royal Society of Medicine",
				year: 1965,
				url: "https://doi.org/10.1177/003591576505800503",
				doi: "10.1177/003591576505800503",
				note: "Landmark framework for weighing strength, consistency, temporality, mechanism, experiment, and alternative explanations."
			}
		]
	})
];
