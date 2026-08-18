import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheFourSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026BiasIncentivesClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Can selective outcome reporting distort a clinical trial's published conclusion?",
		slug: "can-selective-outcome-reporting-distort-a-clinical-trials-published-conclusion",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. When investigators measure many outcomes or analyses but publish only favorable ones, the visible record can exaggerate benefit or hide harm. Prospective registration, protocols, statistical-analysis plans, and comparison of prespecified with reported outcomes make this bias easier to detect but do not by themselves guarantee complete reporting.",
		stableCore: [
			"Trials frequently have discrepancies between registered or protocol outcomes and published outcomes.",
			"Selection based on statistical significance or direction biases effect estimates and evidence syntheses.",
			"Readers need the full prespecified outcome set, time points, analysis population, and reasons for changes."
		],
		openQuestions: [
			"How much selective analysis remains hidden when protocols and analysis plans are unavailable or registered late?",
			"Which enforcement and data-sharing policies most improve complete outcome reporting?"
		],
		whatWouldChangeMinds: [
			"Audits showing that prespecified and published outcomes agree almost universally and independently of result direction.",
			"Evidence that selective omission does not change pooled estimates, certainty ratings, or clinical decisions."
		],
		misconceptions: [
			"Publishing a trial does not prove that every measured outcome was reported.",
			"A real positive secondary result can still be misleading if it was selected from many unreported tests.",
			"Registration helps only when timing, detail, and later adherence can be checked."
		],
		editorSummary:
			"Compare the paper with its protocol, registry, and analysis plan. The missing outcomes can matter as much as the published ones.",
		uncertaintySummary:
			"The existence and direction of selective reporting bias are well established; prevalence and decision impact vary by field, era, registry quality, and enforcement.",
		sources: [
			{
				kind: "systematic_review",
				title: "Systematic Review of the Empirical Evidence of Study Publication Bias and Outcome Reporting Bias — An Updated Review",
				publisher: "PLOS ONE",
				year: 2013,
				url: "https://doi.org/10.1371/journal.pone.0066844",
				doi: "10.1371/journal.pone.0066844",
				note: "Updated empirical review documenting selective publication and outcome reporting across clinical research."
			},
			{
				kind: "systematic_review",
				title: "Evidence for the Selective Reporting of Analyses and Discrepancies in Clinical Trials: A Systematic Review of Cohort Studies of Clinical Trials",
				publisher: "PLOS Medicine",
				year: 2014,
				url: "https://doi.org/10.1371/journal.pmed.1001666",
				doi: "10.1371/journal.pmed.1001666",
				note: "Review connecting trial-level outcome selection with biased systematic-review findings."
			},
			{
				kind: "guideline",
				title: "CONSORT 2010 Statement: updated guidelines for reporting parallel group randomised trials",
				publisher: "BMJ",
				year: 2010,
				url: "https://doi.org/10.1136/bmj.c332",
				doi: "10.1136/bmj.c332",
				note: "Reporting standard requiring prespecified outcomes, changes, participant flow, and transparent trial results."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Can spin make a statistically non-significant trial sound positive?",
		slug: "can-spin-make-a-statistically-non-significant-trial-sound-positive",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Abstracts, conclusions, press releases, and news can emphasize favorable secondary results, within-group changes, or reassuring language when a trial's prespecified primary outcome is not statistically significant. Spin does not prove misconduct, but it can mislead readers about what the design actually established.",
		stableCore: [
			"Systematic reviews find spin in a substantial share of biomedical reports with non-significant primary outcomes.",
			"Abstracts matter because many readers never inspect the full methods, outcome hierarchy, or effect intervals.",
			"A null primary result is not proof of no effect, but neither does a favorable secondary result automatically rescue the primary claim."
		],
		openQuestions: [
			"Which editorial checks best reduce spin without forcing all nuanced findings into a binary negative label?",
			"How much do spun abstracts change prescribing, policy, news, and patient decisions in practice?"
		],
		whatWouldChangeMinds: [
			"Independent audits finding no systematic mismatch between prespecified primary outcomes and positive framing.",
			"Reader experiments showing that identified spin never changes perceived benefit or certainty."
		],
		misconceptions: [
			"Spin can occur without fabricated data.",
			"Calling a study negative can also oversimplify an imprecise estimate; the remedy is transparent effect reporting.",
			"A significant subgroup or secondary outcome was not necessarily the trial's confirmatory test."
		],
		editorSummary:
			"Read the prespecified primary outcome and interval before the conclusion paragraph. Framing should follow the design, not the most favorable p-value.",
		uncertaintySummary:
			"Spin is repeatedly documented, but definitions and prevalence differ across specialties, article sections, and study designs.",
		sources: [
			{
				kind: "systematic_review",
				title: "Spin in published biomedical literature: A methodological systematic review",
				publisher: "PLOS Biology",
				year: 2017,
				url: "https://doi.org/10.1371/journal.pbio.2002173",
				doi: "10.1371/journal.pbio.2002173",
				note: "Systematic review of spin definitions, prevalence, and assessment methods across biomedical literature."
			},
			{
				kind: "landmark_study",
				title: "Reporting and Interpretation of Randomized Controlled Trials With Statistically Nonsignificant Results for Primary Outcomes",
				publisher: "JAMA",
				year: 2010,
				url: "https://doi.org/10.1001/jama.2010.651",
				doi: "10.1001/jama.2010.651",
				note: "Cohort analysis identifying common positive-framing strategies in trials with nonsignificant primary outcomes."
			},
			{
				kind: "guideline",
				title: "CONSORT for Abstracts: recommendations for reporting randomized trials in journal and conference abstracts",
				publisher: "The Lancet",
				year: 2008,
				url: "https://doi.org/10.1016/S0140-6736(07)61835-2",
				doi: "10.1016/S0140-6736(07)61835-2",
				note: "Reporting guidance designed to keep abstract conclusions tied to prespecified outcomes and transparent estimates."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Do Registered Reports reduce publication bias and guarantee valid findings?",
		slug: "do-registered-reports-reduce-publication-bias-and-guarantee-valid-findings",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Registered Reports reduce incentives to publish only positive results by peer-reviewing methods before results are known and offering in-principle acceptance. Early comparisons find more null results and favorable quality ratings than conventional articles, but the format cannot guarantee good measurement, faithful execution, sufficient power, honest reporting, or correct interpretation.",
		stableCore: [
			"Results-blind acceptance directly weakens publication selection based on whether a hypothesis succeeds.",
			"Registered Reports contain far fewer overwhelmingly positive hypothesis tests than the conventional psychology literature.",
			"Peer review before data collection can improve a plan while still missing design flaws or later deviations."
		],
		openQuestions: [
			"Do early quality advantages persist across fields, journals, replication types, and longer follow-up?",
			"Which deviations should remain compatible with in-principle acceptance when real data expose a design problem?"
		],
		whatWouldChangeMinds: [
			"Large matched evaluations finding no reduction in positive-result imbalance or methodological quality differences.",
			"Evidence that results-blind review introduces harms that outweigh its protection against selective publication."
		],
		misconceptions: [
			"Registered does not mean automatically correct.",
			"A null result in a Registered Report is not inherently more important than a positive one.",
			"The format addresses some researcher and publisher incentives, not every source of bias."
		],
		editorSummary:
			"Registered Reports improve the publication decision by separating it from the result. The final study still needs ordinary design, execution, and evidence appraisal.",
		uncertaintySummary:
			"The mechanism for reducing result-based selection is strong; the long-run size of quality and reliability gains is based on a growing but still limited comparative record.",
		sources: [
			{
				kind: "systematic_review",
				title: "The past, present and future of Registered Reports",
				publisher: "Nature Human Behaviour",
				year: 2022,
				url: "https://doi.org/10.1038/s41562-021-01193-7",
				doi: "10.1038/s41562-021-01193-7",
				note: "Review of the publication model, evidence to date, implementation challenges, and unresolved questions."
			},
			{
				kind: "landmark_study",
				title: "An Excess of Positive Results: Comparing the Standard Psychology Literature With Registered Reports",
				publisher: "Advances in Methods and Practices in Psychological Science",
				year: 2021,
				url: "https://doi.org/10.1177/25152459211007467",
				doi: "10.1177/25152459211007467",
				note: "Comparative evidence showing a much more balanced positive-versus-null result distribution in Registered Reports."
			},
			{
				kind: "landmark_study",
				title: "Initial evidence of research quality of registered reports compared with the standard publishing model",
				publisher: "Nature Human Behaviour",
				year: 2021,
				url: "https://doi.org/10.1038/s41562-021-01142-4",
				doi: "10.1038/s41562-021-01142-4",
				note: "Blind reviewer ratings offering early comparative evidence on rigor and quality."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Are positive study results more likely to be cited?",
		slug: "are-positive-study-results-more-likely-to-be-cited",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, on average. Studies with statistically significant or favorable findings tend to receive more citations than comparable null or unfavorable studies. Citation counts therefore reflect attention, visibility, field structure, and result direction—not only methodological quality or truth.",
		stableCore: [
			"Systematic review and meta-analysis find preferential citation of positive results in biomedical research.",
			"Citation bias can make a literature appear more consistently supportive even when all studies are technically available.",
			"Highly cited does not mean high quality, causal, replicated, or representative."
		],
		openQuestions: [
			"How large is citation bias in fields outside biomedicine and after preprints and social media changed discovery?",
			"Which citation-context tools can distinguish endorsement, criticism, background use, and replication?"
		],
		whatWouldChangeMinds: [
			"Updated cross-field syntheses showing no citation difference after design, sample size, topic, journal, and access are controlled.",
			"Evidence that citation-network imbalance never changes review conclusions or perceived consensus."
		],
		misconceptions: [
			"A citation can criticize a study rather than endorse it.",
			"Low citation does not establish that a result is false or unimportant.",
			"Citation bias differs from publication bias because both positive and null studies may already be public."
		],
		editorSummary:
			"Use citations to navigate a literature, not to count votes. Inspect why and how a study is cited and include result-independent searches.",
		uncertaintySummary:
			"The average positive-result advantage is supported; effect size and causal mechanisms vary across fields, eras, journals, and networks.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Scientific citations favor positive results: a systematic review and meta-analysis",
				publisher: "Journal of Clinical Epidemiology",
				year: 2017,
				url: "https://doi.org/10.1016/j.jclinepi.2017.06.002",
				doi: "10.1016/j.jclinepi.2017.06.002",
				note: "Direct synthesis of citation differences associated with result direction and statistical significance."
			},
			{
				kind: "systematic_review",
				title: "Dissemination and publication of research findings: an updated review of related biases",
				publisher: "Health Technology Assessment",
				year: 2010,
				url: "https://doi.org/10.3310/hta14080",
				doi: "10.3310/hta14080",
				note: "Broad evidence review covering publication, time-lag, outcome-reporting, and citation-related biases."
			},
			{
				kind: "landmark_study",
				title: "Citation bias and other determinants of citation in biomedical research: findings from six citation networks",
				publisher: "Journal of Clinical Epidemiology",
				year: 2021,
				url: "https://doi.org/10.1016/j.jclinepi.2020.11.019",
				doi: "10.1016/j.jclinepi.2020.11.019",
				note: "Network analysis separating result direction from other determinants of citation."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Can ordinary journal peer review reliably detect fraud and hidden errors?",
		slug: "can-ordinary-journal-peer-review-reliably-detect-fraud-and-hidden-errors",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Peer review can improve clarity and catch some methodological problems, but reviewers usually lack raw data, forensic tools, time, and a mandate to authenticate every record. Studies with deliberately inserted errors show that many are missed; fraud detection requires complementary data checks, replication, editorial screening, and post-publication scrutiny.",
		stableCore: [
			"Peer review is a quality-control process, not an independent audit of every datum or image.",
			"Reviewer agreement and error detection are imperfect, and short training alone has shown limited improvement.",
			"A peer-reviewed label cannot establish that fabrication, undisclosed flexibility, or coding errors are absent."
		],
		openQuestions: [
			"Which automated, statistical, and data-access checks add the most detection value without overwhelming editors?",
			"How should journals divide responsibility among reviewers, research-integrity staff, institutions, and funders?"
		],
		whatWouldChangeMinds: [
			"Blinded evaluations showing ordinary peer review detects nearly all seeded major errors and realistic fraud signals.",
			"Evidence that raw-data review, replication, and post-publication checks add no detection value."
		],
		misconceptions: [
			"Peer reviewed does not mean independently replicated.",
			"Failure to catch fraud does not mean reviewers endorsed or could observe it.",
			"The limits of peer review do not imply that review has no value."
		],
		editorSummary:
			"Treat peer review as one filter in a layered assurance system. Extraordinary claims still need data access, independent checks, and replication.",
		uncertaintySummary:
			"Detection limits are clear; the comparative effectiveness and cost of specific enhanced review systems remain less certain.",
		sources: [
			{
				kind: "systematic_review",
				title: "Peer review: a flawed process at the heart of science and journals",
				publisher: "Journal of the Royal Society of Medicine",
				year: 2006,
				url: "https://doi.org/10.1177/014107680609900414",
				doi: "10.1177/014107680609900414",
				note: "Evidence review of peer review's benefits, variability, and inability to guarantee error or fraud detection."
			},
			{
				kind: "landmark_study",
				title: "What errors do peer reviewers detect, and does training improve their ability to detect them?",
				publisher: "Journal of the Royal Society of Medicine",
				year: 2008,
				url: "https://doi.org/10.1258/jrsm.2008.080062",
				doi: "10.1258/jrsm.2008.080062",
				note: "Randomized evaluation using seeded errors to measure reviewer detection and training effects."
			},
			{
				kind: "consensus_statement",
				title: "Fostering Integrity in Research",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/21896",
				doi: "10.17226/21896",
				note: "Consensus report assigning integrity responsibilities across researchers, journals, institutions, funders, and oversight systems."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Do retraction counts reveal how much research misconduct exists?",
		slug: "do-retraction-counts-reveal-how-much-research-misconduct-exists",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Retractions identify a selected set of published records serious enough to be corrected or withdrawn; they miss undetected problems, unresolved investigations, corrections, unpublished work, and inconsistent journal practices. Counts also rise when detection and transparency improve, so they are not a direct prevalence measure.",
		stableCore: [
			"Many retractions involve misconduct, while others reflect honest error, duplication, authorship, or publisher problems.",
			"The probability of detection and retraction varies by field, journal, institution, country, visibility, and time.",
			"More retractions can mean more problematic work, better detection, stronger correction norms, or several of these at once."
		],
		openQuestions: [
			"What denominator and independent audit design can estimate undetected misconduct more credibly?",
			"How much harmful work is corrected informally or remains cited after formal retraction?"
		],
		whatWouldChangeMinds: [
			"Evidence that virtually every serious research-integrity problem is detected and consistently retracted.",
			"A validated one-to-one relationship between retraction rate and underlying misconduct prevalence across systems."
		],
		misconceptions: [
			"A retraction is not automatically proof of fraud by every author.",
			"A low retraction rate does not prove a field has few hidden problems.",
			"Correction of the record is a health signal as well as evidence that a problem occurred."
		],
		editorSummary:
			"Read the retraction notice and investigation, then interpret counts through the detection system and publication denominator.",
		uncertaintySummary:
			"Selection and detection problems are certain; the true prevalence of serious misconduct is inherently difficult to estimate and remains uncertain.",
		sources: [
			{
				kind: "landmark_study",
				title: "Misconduct accounts for the majority of retracted scientific publications",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2012,
				url: "https://doi.org/10.1073/pnas.1212247109",
				doi: "10.1073/pnas.1212247109",
				note: "Detailed classification showing why retraction notices and reasons matter more than a single undifferentiated count."
			},
			{
				kind: "systematic_review",
				title: "Why and how do journals retract articles? An analysis of Medline retractions 1988-2008",
				publisher: "Journal of Medical Ethics",
				year: 2011,
				url: "https://doi.org/10.1136/jme.2010.040964",
				doi: "10.1136/jme.2010.040964",
				note: "Longitudinal analysis of heterogeneous retraction reasons, timing, and journal practice."
			},
			{
				kind: "consensus_statement",
				title: "Fostering Integrity in Research",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/21896",
				doi: "10.17226/21896",
				note: "Consensus context for misconduct definitions, institutional detection, correction, and prevention."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Can incentives for novel positive findings make a literature less reliable?",
		slug: "can-incentives-for-novel-positive-findings-make-a-literature-less-reliable",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. When careers and journals reward novelty, significance, and publication volume more than careful null results, correction, and replication, researchers face selection pressure toward small, flexible, publishable studies. Models, empirical audits, and reform reports support the risk, although incentive effects differ among fields and do not make every novel result unreliable.",
		stableCore: [
			"Researchers respond to promotion, funding, authorship, and journal-selection criteria like participants in any incentive system.",
			"Practices that maximize publishable findings can reduce power and increase false or exaggerated conclusions.",
			"Rewarding transparency, rigor, replication, data stewardship, and correction can better align careers with cumulative knowledge."
		],
		openQuestions: [
			"Which hiring, funding, and journal reforms improve reliability without suppressing worthwhile exploration?",
			"How large are incentive-driven effects relative to training, resources, measurement difficulty, and honest disagreement in each field?"
		],
		whatWouldChangeMinds: [
			"Natural experiments showing that major incentive changes never alter power, reporting, replication, or correction behavior.",
			"Evidence that researchers' design and reporting choices are insensitive to publication and career rewards."
		],
		misconceptions: [
			"Novelty is valuable; the problem is rewarding it without commensurate rigor and verification.",
			"System incentives do not imply that individual researchers are dishonest.",
			"No single reform can remove every error or strategic behavior."
		],
		editorSummary:
			"Judge the reward system as part of the research environment. Reliable novelty requires incentives for verification as well as discovery.",
		uncertaintySummary:
			"The directional incentive problem is broadly accepted; causal effect sizes and the best reform bundle are field- and institution-specific.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Fostering Integrity in Research",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/21896",
				doi: "10.17226/21896",
				note: "Consensus assessment of incentive structures and institutional responsibilities for rigorous, trustworthy research."
			},
			{
				kind: "landmark_study",
				title: "Current Incentives for Scientists Lead to Underpowered Studies with Erroneous Conclusions",
				publisher: "PLOS Biology",
				year: 2016,
				url: "https://doi.org/10.1371/journal.pbio.2000995",
				doi: "10.1371/journal.pbio.2000995",
				note: "Evolutionary model showing how publication incentives can favor small studies and unreliable inference."
			},
			{
				kind: "systematic_review",
				title: "A manifesto for reproducible science",
				publisher: "Nature Human Behaviour",
				year: 2017,
				url: "https://doi.org/10.1038/s41562-016-0021",
				doi: "10.1038/s41562-016-0021",
				note: "Cross-disciplinary synthesis linking incentives, methods, reporting, and proposed reliability reforms."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Do direct replications often estimate smaller effects than original studies?",
		slug: "do-direct-replications-often-estimate-smaller-effects-than-original-studies",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, across several large behavioral and social-science replication projects, replication effects were smaller on average than the originals and many original significance results did not recur. This does not mean every original was false or every replication definitive; sampling variation, publication selection, low power, context, and method differences all contribute.",
		stableCore: [
			"Large coordinated projects repeatedly find average effect attenuation and incomplete replication success.",
			"Original publication selection and imprecise small studies can make first estimates unusually large.",
			"Interpretation should compare effect estimates and intervals, design fidelity, populations, and heterogeneity rather than only significance labels."
		],
		openQuestions: [
			"How much nonreplication reflects overstated originals versus genuine context sensitivity or replication mismatch?",
			"Which prospective multisite designs best estimate both average effects and meaningful heterogeneity?"
		],
		whatWouldChangeMinds: [
			"New large, representative replication programs consistently finding no attenuation relative to original estimates.",
			"Evidence that publication selection and low original precision cannot explain any observed effect-size gap."
		],
		misconceptions: [
			"A smaller effect is not automatically a zero effect.",
			"One failed replication does not settle every version of a claim.",
			"Replication projects assess sampled literatures, not all of science with one universal rate."
		],
		editorSummary:
			"Expect first estimates to move. Cumulative confidence comes from precise, transparent, multisite evidence—not the drama of one success or failure.",
		uncertaintySummary:
			"Attenuation in major sampled literatures is well documented; field-wide rates and causes remain dependent on sampling and replication design.",
		sources: [
			{
				kind: "landmark_study",
				title: "Estimating the reproducibility of psychological science",
				publisher: "Science",
				year: 2015,
				url: "https://doi.org/10.1126/science.aac4716",
				doi: "10.1126/science.aac4716",
				note: "Coordinated replications finding lower average effects and fewer significant results than original studies."
			},
			{
				kind: "landmark_study",
				title: "Evaluating the replicability of social science experiments in Nature and Science between 2010 and 2015",
				publisher: "Nature Human Behaviour",
				year: 2018,
				url: "https://doi.org/10.1038/s41562-018-0399-z",
				doi: "10.1038/s41562-018-0399-z",
				note: "High-profile social-science replication project documenting effect attenuation and incomplete replication."
			},
			{
				kind: "meta_analysis",
				title: "Many Labs 2: Investigating Variation in Replicability Across Samples and Settings",
				publisher: "Advances in Methods and Practices in Psychological Science",
				year: 2018,
				url: "https://doi.org/10.1177/2515245918810225",
				doi: "10.1177/2515245918810225",
				note: "Multisite evidence separating average replication from variation across samples and settings."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Can flexible analysis choices inflate false-positive findings?",
		slug: "can-flexible-analysis-choices-inflate-false-positive-findings",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. If researchers try many defensible outcomes, exclusions, covariates, transformations, stopping points, or subgroups and report only a successful path, the nominal false-positive rate no longer describes the full search. Preregistration, multiverse or specification-curve analysis, multiplicity control, and transparent reporting reduce the risk.",
		stableCore: [
			"Researcher degrees of freedom create many implicit tests even when the paper shows one final analysis.",
			"Choosing an analysis after seeing results can produce apparently significant evidence under a true null.",
			"Exploration is legitimate when labeled as exploratory and followed by independent confirmation."
		],
		openQuestions: [
			"Which analysis decisions must be fixed in advance and which should remain adaptive for a given design?",
			"How should uncertainty incorporate a large but only partly observable analytic search space?"
		],
		whatWouldChangeMinds: [
			"Formal and empirical evidence that undisclosed repeated analysis leaves false-positive rates at the single-test nominal level.",
			"Replications showing no reliability gain from prespecification, disclosure, or multiplicity adjustment."
		],
		misconceptions: [
			"Each individual analysis choice can be reasonable while the undisclosed search across choices is misleading.",
			"Preregistration does not ban exploratory analysis.",
			"A p-value does not remember how many unreported paths were tried."
		],
		editorSummary:
			"Count the decision tree, not only the final test. Separate confirmatory from exploratory work and expose reasonable alternative specifications.",
		uncertaintySummary:
			"The inflation mechanism is mathematically and experimentally clear; the hidden search size in any individual paper is often unknown.",
		sources: [
			{
				kind: "landmark_study",
				title: "False-Positive Psychology: Undisclosed Flexibility in Data Collection and Analysis Allows Presenting Anything as Significant",
				publisher: "Psychological Science",
				year: 2011,
				url: "https://doi.org/10.1177/0956797611417632",
				doi: "10.1177/0956797611417632",
				note: "Demonstration and simulations showing how undisclosed flexibility can manufacture significant findings."
			},
			{
				kind: "systematic_review",
				title: "Degrees of Freedom in Planning, Running, Analyzing, and Reporting Psychological Studies: A Checklist to Avoid p-Hacking",
				publisher: "Frontiers in Psychology",
				year: 2016,
				url: "https://doi.org/10.3389/fpsyg.2016.01832",
				doi: "10.3389/fpsyg.2016.01832",
				note: "Structured review of researcher choices across the full study lifecycle and transparency safeguards."
			},
			{
				kind: "guideline",
				title: "The preregistration revolution",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2018,
				url: "https://doi.org/10.1073/pnas.1708274114",
				doi: "10.1073/pnas.1708274114",
				note: "Methodological guidance on using preregistration to distinguish planned tests from data-dependent exploration."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "bias-incentives",
		title: "Does a journal's impact factor measure the quality of each article it publishes?",
		slug: "does-a-journals-impact-factor-measure-the-quality-of-each-article-it-publishes",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Journal impact factor is a journal-level citation average over a defined window, with a highly skewed distribution and field-dependent practices. It cannot substitute for evaluating an individual article's methods, evidence, transparency, relevance, or later verification.",
		stableCore: [
			"A small subset of articles can contribute a large share of a journal's citations.",
			"Citation rates differ by field, article type, database coverage, and time, limiting cross-field comparison.",
			"Responsible assessment frameworks advise evaluating research on its own merits rather than using journal metrics as article or researcher proxies."
		],
		openQuestions: [
			"Which article-level qualitative and quantitative indicators improve decisions without creating new gameable proxies?",
			"How should institutions compare diverse research contributions, including data, software, replication, and public service?"
		],
		whatWouldChangeMinds: [
			"Evidence that journal averages precisely predict article validity, rigor, and replicability across fields.",
			"A defensible measurement model showing no meaningful within-journal citation or quality variation."
		],
		misconceptions: [
			"Publishing in a high-impact journal does not make a study false; it simply does not settle its quality.",
			"More citations can reflect controversy, methods, or visibility rather than correctness.",
			"Replacing impact factor with one article metric does not eliminate measurement and incentive problems."
		],
		editorSummary:
			"Use the journal to find the paper, then evaluate the paper. Venue prestige is context, not evidence for the claim.",
		uncertaintySummary:
			"The ecological mismatch and skew are settled. Designing fair, efficient alternatives for real hiring and funding decisions remains difficult.",
		sources: [
			{
				kind: "consensus_statement",
				title: "San Francisco Declaration on Research Assessment",
				publisher: "DORA",
				year: 2012,
				url: "https://sfdora.org/read/",
				note: "International declaration advising against using journal-based metrics as proxies for individual article or researcher quality."
			},
			{
				kind: "consensus_statement",
				title: "Bibliometrics: The Leiden Manifesto for research metrics",
				publisher: "Nature",
				year: 2015,
				url: "https://doi.org/10.1038/520429a",
				doi: "10.1038/520429a",
				note: "Ten principles for contextual, field-sensitive, transparent, and qualitative research assessment."
			},
			{
				kind: "landmark_study",
				title: "Why the impact factor of journals should not be used for evaluating research",
				publisher: "BMJ",
				year: 1997,
				url: "https://doi.org/10.1136/bmj.314.7079.497",
				doi: "10.1136/bmj.314.7079.497",
				note: "Foundational analysis of skewed article-level citations and the invalidity of journal averages as individual proxies."
			}
		]
	})
];
