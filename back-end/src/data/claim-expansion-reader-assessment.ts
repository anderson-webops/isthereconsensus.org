import type { SeedClaim } from "./claims.js";

export const assessmentCheckedAt = "2026-10-05T18:09:31.000Z";

function reference(title: string, publisher: string, url: string, note: string, year?: number): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title, publisher, url, note, year, stance: "supports", order: 1 };
}

export const readerAssessmentSources = {
	standards: reference("Standards for Educational and Psychological Testing, 2014 Edition", "AERA, APA and NCME", "https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf", "Original chapters on validity, reliability, fairness and score comparability checked. Cited edition is 2014, not a claim about every current product or legal requirement; no individual placement or clinical inference.", 2014),
	reliability: reference("Test Reliability: Basic Concepts, RM-18-01", "Samuel A. Livingston, Educational Testing Service", "https://www.ets.org/Media/Research/pdf/RM-18-01.pdf", "Original January 2018 explanations of consistency, measurement error, purpose-specific validity and classification reliability checked. Classical true score is a model-defined expectation, not an observed pure ability; no universal error band.", 2018),
	equating: reference("Equating Test Scores without IRT, Second Edition", "Samuel A. Livingston, Educational Testing Service", "https://www.ets.org/Media/Research/pdf/LIVINGSTON2ed.pdf", "Original 2014 raw/scaled-score, form difficulty, linking, truncation and equating-limit explanations checked. Historical illustrative tables are not current conversions or predictions for a particular student.", 2014),
	grade: reference("Interpretation Problems of Age and Grade Equivalents", "Pearson Assessments", "https://www.pearsonassessments.com/campaign/interpretation-problems-of-age-and-grade-equivalents.html", "Original median-score and non-interval equivalent definitions checked. Clinical examples, cited studies not independently retrieved and historical product tables are not adopted as educational diagnoses or placement rules."),
	growth: reference("Normal vs. Necessary Academic Growth", "Michael Dahlin, NWEA", "https://www.nwea.org/blog/2025/normal-vs-necessary-academic-growth/", "Original January 21, 2025 normative-growth versus benchmark distinction checked. Its 2020 norms and state linking examples are historical, not current conversions, guaranteed trajectories or validation of a named intervention.", 2025),
	adaptive: reference("What Is Computer Adaptive Testing in Education?", "NWEA", "https://www.nwea.org/blog/2026/what-is-computer-adaptive-testing-cat-in-education/", "Original adaptive item-selection and calibrated-score explanation checked. Marketing claims of guaranteed precision, exact ability, universal item-level behavior or half-correct targets are not adopted; no product ranking.", 2026),
	dif: reference("NAEP Technical Documentation: Differential Item Functioning", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/tdw/analysis/scaling_checks_dif.aspx", "Original conditional group comparison and DIF-versus-bias distinction checked. Page last updated November 17, 2008; historical method thresholds are not asserted as every current assessment's policy."),
	inclusion: reference("Inclusion of Students with Disabilities and English Learners", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/about/inclusion.aspx", "Original participation and administration-accommodation scope checked. Historical participation percentages and eligibility policies are not universal permission, evidence of equal opportunity or individual advice."),
	meaning: reference("Understanding Results: Intended Meaning of NAEP", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/guides/", "Original group-reporting, no-causal-inference and proficiency-label boundaries checked. An individual classroom test or another country's assessment may have a different purpose; significance is not practical importance."),
	scales: reference("NAEP Scale Scores", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/scale_scores/", "Original independently developed subject scales and group reporting checked. Its broad grade-comparison wording is not generalized across every program or documented cross-grade scale; item maps are not curriculum-mastery certificates."),
	levels: reference("NAEP Achievement Levels", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/about/achieve.aspx", "Original framework-specific achievement levels, cut points and non-equivalence to state grade-level expectations checked. June 25, 2026 update observed; no universal cut point or current jurisdiction judgment."),
	analysis: reference("NAEP Technical Documentation: Analysis and Scaling", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/tdw/analysis/default.aspx", "Original group-distribution estimation, reporting-scale transformation and separate assessment plans checked. July 28, 2026 update observed; group estimates are not recovered individual proficiency scores."),
	quality: reference("NCES Handbook: NAEP Data Quality", "NCES, U.S. Department of Education", "https://nces.ed.gov/statprog/handbook/naep_dataquality.asp", "Original student-sampling, item-sampling and nonsampling uncertainty distinctions checked. Historical 2015 participation and error rates are not current rates or a guarantee that every group estimate is unbiased."),
	significance: reference("NAEP Statistical Significance and Sample Size", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/guides/statsig.aspx", "Original estimate uncertainty, sample-size and practical-versus-statistical significance explanations checked. No universal minimum sample size, effect size or individual confidence-interval rule inferred."),
	glossary: reference("The NAEP Glossary of Terms", "NCES, U.S. Department of Education", "https://nces.ed.gov/nationsreportcard/glossary.aspx", "Original percentile location, score-scale and accommodation definitions checked. Historical numeric examples and accommodation menus are not current universal conventions or eligibility criteria.")
} satisfies Record<string, SeedClaim["sources"][number]>;

interface AssessmentReview {
	key: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	question: string;
	gap: string;
	tags: string[];
	sources: Array<keyof typeof readerAssessmentSources>;
}

const reviews: AssessmentReview[] = [
	{
		key: "percentile",
		title: "Does a test percentile show the percentage of questions answered correctly?",
		slug: "does-a-test-percentile-show-the-percentage-of-questions-answered-correctly",
		bottomLine: "No. A percentile rank describes a score's relative position in a specified comparison distribution. Percentage correct describes responses to the administered questions. They have different denominators and can differ substantially. The norm group, subject, testing period and treatment of ties matter; a displayed percentile is not a direct statement of curriculum mastery.",
		stableCore: ["Consider an independently invented example: a learner answers eight of ten equally weighted questions correctly, so percentage correct is 80. If three of five comparison scores are lower than eight, a strict-below empirical convention gives a percentile rank of 60. Those numbers answer different questions without contradicting each other. Real reports can handle ties and interpolation differently, so this toy calculation is not a conversion table for any commercial assessment.", "A different comparison group can change the percentile without changing the answers. Age-based, grade-based, national and local norms are not automatically interchangeable. A report may also transform raw responses before locating a score in its norm distribution. The cited Standards define norm-referenced interpretation in terms of the named population; the NAEP glossary distinguishes a percentile location from an achievement-level percentage. Neither definition says how many particular questions an individual has mastered."],
		editorSummary: "Read the report's score legend and ask which population supplied the comparison. Keep the percentage correct, scaled score and percentile in separate columns if more than one is available. A high rank on a narrow test does not establish competence on every untested task, and a modest rank does not show that only that fraction of questions was correct. This review offers interpretation literacy, not a student diagnosis, admissions decision or validation of the report's norm sample.",
		qualification: "Specified norm group and percentile convention; no universal percentile-to-percentage or mastery conversion.",
		question: "Which score, comparison population and tie convention define the reported rank?",
		gap: "Adds the assessment norm-group denominator versus administered-item denominator; existing general percentage reviews do not explain educational score reports.",
		tags: ["test percentile percentage correct questions", "norm group rank score denominator"],
		sources: ["standards", "glossary"]
	},
	{
		key: "rankIntervals",
		title: "Can percentile ranks be averaged as if they were equal-interval test scores?",
		slug: "can-percentile-ranks-be-averaged-as-if-they-were-equal-interval-test-scores",
		bottomLine: "Not for that interpretation. Equal differences in percentile rank need not represent equal differences on the underlying score scale. A mean of percentile ranks can be calculated, but it is not generally the percentile rank of the mean score or an equal-interval measure of learning. Name the intended summary and its scale before treating a rank average as achievement.",
		stableCore: ["An invented five-score distribution of 10, 11, 12, 13 and 50 makes the distinction visible. Adjacent strict-below rank steps are equal, while the underlying score gaps are one point near the bottom and 37 points at the top. The nonlinear conversion loses spacing information. This counterexample illustrates a mathematical property, not an actual test distribution or a claim that every rank summary is useless. Ties and continuous norm tables add further conventions rather than removing the need to identify the scale.", "The Standards caution that individual percentile ranks do not determine the percentile rank of a school's average score. Appropriate summaries can include a clearly defined median rank or a mean on a justified common score scale, depending on the question. Combining ranks across unrelated norm groups introduces another issue: their reference populations differ. Averaging two labels does not establish that the original tests measured the same construct or that the resulting number predicts an educational outcome."],
		editorSummary: "Ask whether a reported change means a change in relative position or a change on a supported learning scale. Do not call a ten-percentile-point difference ten units of curriculum mastered. A report can intentionally summarize ranks, but it should explain that estimand rather than silently present it as average ability. This review does not prescribe a school accountability formula or compare named students. It supplies the rank-spacing boundary that must be checked before arithmetic is given educational meaning.",
		qualification: "Rank summaries are possible, but equal-interval and rank-of-mean interpretations require separate justification.",
		question: "Is the summary a mean of ranks, a rank of a mean or an estimate on a common measurement scale?",
		gap: "Adds nonlinear educational norm transformations and group rank summaries; it is not another generic calculation of an arithmetic mean.",
		tags: ["average percentile rank unequal interval", "test school mean norm distribution"],
		sources: ["standards", "grade"]
	},
	{
		key: "rankGrowth",
		title: "Does a rise in test score guarantee a rise in percentile rank?",
		slug: "does-a-rise-in-test-score-guarantee-a-rise-in-percentile-rank",
		bottomLine: "No. Improvement on a comparable score scale and movement relative to a comparison group are different quantities. A learner can improve while a relevant peer distribution improves more, leaving the learner at the same or a lower percentile. Changing the norm group or testing season can also change rank. A lower rank alone does not prove loss of previously learned skills.",
		stableCore: ["Use an explicitly invented common-scale example. A score of 40 is above three of five comparison scores: 20, 30, 35, 45 and 50. Later a score of 45 is above only two of five scores: 30, 42, 48, 55 and 60. Under the same strict-below convention, the score increased while the rank fell from 60 to 40. The calculation assumes a genuinely comparable underlying scale and contains no actual child or normative forecast.", "NWEA distinguishes normative growth from the improvement needed to reach a selected benchmark. Its published illustration uses historical norms; those numbers are not a current expectation for everyone. The Standards require clear, appropriate norm references. A growth percentile, an achievement percentile and a point change are also different outputs, even if a report puts them beside one another. A model's projected trajectory is not a guarantee of an individual's future result or proof that one instructional program produced the change."],
		editorSummary: "Compare the score scale, reference population and testing period before interpreting two reports. Ask separately what changed in demonstrated performance, what changed relative to peers and what criterion remains unmet. Measurement uncertainty also applies to the change itself. This review does not decide whether a student needs a particular intervention or whether a teacher succeeded. It explains why an improved comparable score and a disappointing rank can coexist without either number being fabricated or a learner necessarily moving backward.",
		qualification: "Comparable score scale and specified changing norms; projected or normative growth is not an individual guarantee.",
		question: "Did the underlying performance scale or the comparison population change between reports?",
		gap: "Adds longitudinal achievement-versus-norm-rank interpretation, distinct from study-method effects or general percent-change arithmetic.",
		tags: ["test score growth percentile fall improvement", "achievement growth rank norm season"],
		sources: ["growth", "standards"]
	},
	{
		key: "gradeEquivalent",
		title: "Does a grade-equivalent score mean a student has mastered that grade's curriculum?",
		slug: "does-a-grade-equivalent-score-mean-a-student-has-mastered-that-grades-curriculum",
		bottomLine: "No. A grade equivalent typically locates a test performance alongside a reference performance for a named grade and point in the school year. It does not show that the learner completed that grade's curriculum, can handle every task taught there or should be placed in that grade. Its meaning depends on the particular test and normative conversion.",
		stableCore: ["Matching the reference score on a limited collection of tasks is not the same as sampling the whole curriculum. A learner might perform strongly on the tested vocabulary or arithmetic while other relevant knowledge is untested. Pearson's explanation describes equivalents through reference median raw scores and notes their non-interval character. That is a score interpretation, not evidence about a particular child's classroom readiness. Historical clinical examples and named product tables on that page are not adopted here.", "The apparent calendar spacing can also mislead. A change of one grade-equivalent year need not represent a fixed amount of score change across the scale. Differences in the underlying normative score curve matter. The Standards require appropriate population references and evidence for the proposed use; a grade-looking label cannot supply either by itself. An age equivalent similarly does not turn a narrow test result into a person's overall developmental age or a complete description of their abilities."],
		editorSummary: "Ask for the tested construct, the actual score scale and the publisher's explanation of the equivalent. Keep curriculum evidence and classroom observations separate rather than converting one number into a placement recommendation. This review neither assesses an individual nor authorizes clinical or educational eligibility decisions. It adds a specific warning about calendar-like score labels, not a claim that grade-level teaching is meaningless or that any comparison with peers is invalid. More informative evidence is needed for the broader conclusion.",
		qualification: "Publisher-defined normative equivalent, not complete curriculum mastery, developmental age or placement advice.",
		question: "Which sampled tasks and reference performance produced the equivalent, and what remains untested?",
		gap: "Adds grade/age equivalent score-label interpretation; earlier learning interventions do not establish curriculum mastery from a normative conversion.",
		tags: ["grade equivalent curriculum mastery placement", "age equivalent median norm score"],
		sources: ["grade", "standards"]
	},
	{
		key: "rawForms",
		title: "Does the same raw score on two test forms mean the same performance?",
		slug: "does-the-same-raw-score-on-two-test-forms-mean-the-same-performance",
		bottomLine: "Not necessarily. Two forms can contain different questions with different difficulty or content coverage. The same number correct, or the same percentage correct, therefore need not indicate equivalent performance on the intended construct. Supported form comparability requires an appropriate design and evidence, rather than assuming that equal raw totals already have the same meaning.",
		stableCore: ["Imagine independently constructed easy and difficult question sets of the same length. Equal totals do not remove their different demands. Livingston's equating guide explains why testing programs can adjust reporting scores to account for form difficulty. The guide's historical numerical examples are not conversion rules for present exams. Counting answers is a valid description of those answers; the unsupported step is interpreting that count as equivalent proficiency across forms without the necessary comparability evidence.", "Equating is not accomplished by merely subtracting the observed difference between two class averages. The groups might differ before testing, and the collection design, common items and assumptions can affect a linking estimate. The Standards require a rationale and supporting evidence for interchangeable form scores. Even a well-supported population-level adjustment need not make every individual's response pattern equivalent on every question set. Equating also does not transform a narrow content sample into a complete measure of everything a learner knows."],
		editorSummary: "When a report compares separate administrations, look for the program's explanation of form construction, scoring and comparability. Ask whether the same construct and reporting scale are maintained. Do not infer that one class learned less merely because its raw percentage was lower on a different set of tasks. This review supplies a measurement boundary, not an exam appeal, fairness ruling or assessment of a named testing service. Equal totals are a starting observation, not the full argument for equal educational meaning.",
		qualification: "Different form content/difficulty and justified equating design; no current raw-to-scale conversion or guarantee for every individual.",
		question: "What evidence makes the scores interchangeable across the two forms?",
		gap: "Adds assessment form-difficulty and equating-design requirements rather than reusing a generic comparison of percentages.",
		tags: ["same raw score different test forms difficulty", "equating alternate form comparable scores"],
		sources: ["equating", "standards"]
	},
	{
		key: "scaledPercent",
		title: "Are scaled test scores percentage correct with a different label?",
		slug: "are-scaled-test-scores-percentage-correct-with-a-different-label",
		bottomLine: "Not generally. A reporting scale can transform responses or estimated proficiency, sometimes accounting for form difficulty or item characteristics. Its displayed endpoints do not by themselves make a score a fraction of questions correct. Dividing a scaled score by the top of its printed range can produce a number without producing a supported educational interpretation.",
		stableCore: ["An explicitly invented reporting rule of 100 plus ten times the number correct gives a score of 160 for six correct answers. Dividing 160 by a displayed maximum of 200 yields 80 percent, while six of ten questions is 60 percent correct. This is only a counterexample to a proposed universal conversion. Actual programs may use nonlinear transformations or response models, and their scales cannot be recovered by assuming this arbitrary rule or reverse-engineering the endpoints.", "Livingston distinguishes raw scores from scaled scores; NCES describes transforming NAEP's estimated group distributions to its reporting metric. An origin of zero on a display is not automatically a meaningful absence of knowledge. Doubling a score therefore need not mean twice the learning. Nor does reporting more digits create more measurement precision. The scale's construct, transformation, valid comparison conditions and uncertainty must be supplied by the program, not invented from the appearance of a familiar-looking number."],
		editorSummary: "Read the score definition before converting it into a percentage, ratio or grade. Percentage correct may be available separately, but it describes the administered item set rather than replacing the reporting scale's intended purpose. This review does not decode a confidential scoring algorithm, calculate an individual's admissions chance or endorse a vendor. It explains why a score chart can be useful without behaving like a ten-question classroom mark. Labels and units belong with the number throughout any comparison or trend.",
		qualification: "Program-defined reporting transformations; no universal endpoint, ratio or percentage-correct conversion.",
		question: "What transformation and interpretation does this particular reporting scale support?",
		gap: "Adds educational reporting-scale origins and transformations; existing general ratio reviews do not identify scaled assessment scores.",
		tags: ["scaled score percentage correct maximum", "test reporting scale transform raw score"],
		sources: ["equating", "analysis"]
	},
	{
		key: "sameRange",
		title: "Can different tests be compared just because they use the same score range?",
		slug: "can-different-tests-be-compared-just-because-they-use-the-same-score-range",
		bottomLine: "No. Matching numerical endpoints do not establish a common construct, common difficulty or justified score link. A score of 250 on two independently developed scales can have different meanings. A comparison needs evidence for the intended linkage and use, not merely the same printed range or the same word such as standard, scaled or proficient.",
		stableCore: ["Two rulers with different units can share the same printed numbers; two tests can likewise report similar-looking numbers while measuring different content. This analogy does not prove that all assessment scales are incompatible. It shows why the label alone is insufficient. NCES explicitly notes that NAEP subject scales are independently developed. The mathematics and reading figures on a common-looking display are therefore not a ready-made statement that one subject was learned better than the other.", "Different linking procedures can also answer different questions. Equating alternate forms of the same intended test is not the same as predicting another test result or establishing a concordance between related constructs. Livingston distinguishes these purposes. The Standards call for evidence supporting claimed score interchangeability. Documented cross-grade or longitudinal scales may permit specified comparisons, so a blanket ban on all comparisons across grades would also be too strong. Check the actual program, version and interpretation rather than generalizing from one website's summary."],
		editorSummary: "Ask whether the comparison is within one established scale or crosses independently defined assessments. Request the linking rationale, population and uncertainty when a conversion is offered. Do not manufacture a cross-subject average, a twice-as-good ratio or a curriculum conclusion by aligning chart axes. This review does not rank national education systems or invalidate all standard scores. It identifies the evidence needed before an apparently convenient numerical comparison is treated as an educational fact rather than a graphical coincidence.",
		qualification: "Same-looking ranges are insufficient; appropriately documented linking or cross-grade scales can support specific comparisons.",
		question: "Is there a validated common scale or link for the exact constructs and populations compared?",
		gap: "Adds cross-assessment construct and score-link validity, distinct from form equating within one intended test or generic unit conversion.",
		tags: ["same range different tests score comparable", "NAEP subject scales linking concordance"],
		sources: ["scales", "equating"]
	},
	{
		key: "reliableValid",
		title: "Does a reliable test score guarantee a valid interpretation?",
		slug: "does-a-reliable-test-score-guarantee-a-valid-interpretation",
		bottomLine: "No. Reliability concerns consistency or precision under specified measurement conditions. Validity concerns the evidence supporting an interpretation for an intended use. A procedure can consistently capture the wrong construct or omit important content. Reliability evidence matters, but a strong consistency statistic alone does not justify every conclusion someone wants to draw from the score.",
		stableCore: ["An independently invented reading example makes the difference concrete. A highly repeatable count of typing speed would not, by itself, establish comprehension of a passage. Repeating the measurement does not supply the missing connection between what was observed and what was claimed. Livingston separates consistency from measuring the right thing for the proposed use. This illustration is not evidence that any named reading assessment actually makes that mistake or that repeated observation never improves an inference.", "The Standards attach validity to proposed score interpretations and uses rather than providing a permanent all-purpose badge for an instrument. Reliability can involve different forms, occasions or raters, each with a different error target. A single coefficient does not summarize every source of inconsistency, nor does it mean that the same percentage of each student's score is correct. A larger sample can estimate a consistency statistic more precisely without removing systematic construct mismatch or biased administration."],
		editorSummary: "Ask two questions: what is measured consistently, and what evidence connects it to the intended conclusion? Keep content coverage, response processes, fairness and relevant relationships with other evidence in view. This review does not set a universal acceptable reliability threshold or assess an individual's ability. It adds interpretation discipline, not a claim that all testing is arbitrary. A careful report should explain both the precision of the observation and the limits of the inference instead of replacing the second with a flattering statistic.",
		qualification: "Specified consistency conditions and intended interpretation; no universal reliability threshold or all-purpose validity badge.",
		question: "What construct is measured consistently, and what evidence supports the proposed use?",
		gap: "Adds assessment reliability versus interpretation validity; earlier intervention reviews do not validate a score merely because it is repeatable.",
		tags: ["reliable test valid interpretation consistency", "reliability validity construct use"],
		sources: ["reliability", "standards"]
	},
	{
		key: "validUses",
		title: "Does validating a test for one purpose validate every use?",
		slug: "does-validating-a-test-for-one-purpose-validate-every-use",
		bottomLine: "No. Evidence supporting one interpretation, population and decision does not automatically support another. An assessment useful for describing a group's performance might not support an individual placement decision, a clinical diagnosis or a causal judgment about a teacher. The required argument changes with the construct, population, administration and consequences of the proposed use.",
		stableCore: ["A score can answer a narrow question well without answering a broader one. An independently invented short vocabulary check may summarize responses to sampled words, but it does not alone establish comprehension of all classroom material. The missing coverage is not repaired by calling the test validated. The Standards require evidence for each intended interpretation. Moving to a different language, grade, accessibility context or testing format can introduce questions that earlier evidence did not resolve.", "NAEP supplies a concrete program boundary: its design and analysis describe populations and student groups, not individual student reports. This distinction does not make NAEP invalid for its intended monitoring purpose. It makes a proposed individual inference inappropriate without different supporting evidence. Statistical relationships with later outcomes likewise do not automatically identify the best action for every learner. Prediction, description and causal intervention effects are different claims, even when they share a score as an input."],
		editorSummary: "Write down the exact interpretation being proposed before relying on a validation label. Ask which population and conditions were studied and what the score is intended to inform. This review does not authorize a professional eligibility decision or declare a particular product unusable. It explains why evidence can travel only as far as its assumptions permit. A useful assessment system states the boundary clearly and seeks additional relevant information for decisions that lie beyond the original score's established purpose.",
		qualification: "Purpose-, population- and administration-specific validity evidence; no diagnosis, placement or teacher-effect inference from a label alone.",
		question: "Does the available evidence address this exact interpretation, population and decision?",
		gap: "Adds transfer limits of educational validation across purposes and populations; it is distinct from reliability or effectiveness of a teaching method.",
		tags: ["validated test purpose use population", "validity assessment interpretation placement"],
		sources: ["standards", "analysis"]
	},
	{
		key: "exactScore",
		title: "Is a reported test score an exact measure of a student's performance?",
		slug: "is-a-reported-test-score-an-exact-measure-of-a-students-performance",
		bottomLine: "Not generally. A reported score summarizes observed responses under a specified administration and scoring model. Sampling tasks, occasions and sometimes raters introduces measurement uncertainty. A printed integer is not automatically an exact, unchanging measure of everything the learner knows. Appropriate precision information belongs with the particular score and proposed comparison.",
		stableCore: ["Different representative tasks can yield different observed results even without a meaningful change in the learner. Livingston describes this variation through measurement error and the standard error of measurement. Error here does not only mean a clerical mistake. In classical test theory, true score is a defined expectation over specified repetitions, not a directly observed pure or permanent ability. The model's terminology should not be used to convert one administration into an exhaustive personal description.", "The relevant error can depend on the score level, test design and interpretation. A group-level standard error for a national average is not the same quantity as an individual measurement-error estimate. Reliability coefficients, standard deviations and error bands are also not interchangeable. More reported decimal places do not necessarily reduce uncertainty. A confidence interval or score band requires its stated construction and assumptions; this library does not attach a universal plus-or-minus number to every exam or treat all overlapping intervals as a formal significance test."],
		editorSummary: "Look for the program's precision information and ask whether a small score difference supports the proposed conclusion. Keep performance on sampled tasks distinct from the full range of classroom evidence. This review neither recalculates a learner's true score nor provides an admissions or diagnostic probability. It adds an uncertainty boundary so that reports can inform discussion without turning an estimated quantity into a fixed identity. Repeated observations may add information, but their comparability and changing learning conditions still need to be understood.",
		qualification: "Score-specific measurement uncertainty; model-defined true score is not directly observed pure ability or a universal personal error band.",
		question: "Which sources of measurement error and precision estimate apply to this score and difference?",
		gap: "Adds individual assessment precision and model-defined true score, distinct from uncertainty in general studies or national group sampling.",
		tags: ["test score exact measurement error student", "standard error measurement true score precision"],
		sources: ["reliability", "standards"]
	},
	{
		key: "cutScore",
		title: "Does crossing a test cut score remove measurement uncertainty?",
		slug: "does-crossing-a-test-cut-score-remove-measurement-uncertainty",
		bottomLine: "No. A cut score defines a reporting or decision boundary; it does not erase uncertainty in the measured score. Two observations just above and below a boundary can receive different labels while remaining close in measured performance. Classification consistency and accuracy require their own evidence, and the policy's consequences should not be confused with a sudden physical jump in ability.",
		stableCore: ["Imagine an independently invented boundary at 42, with observed scores of 41 and 43. The labels can differ even though the observed values are only two points apart. Whether that difference is meaningful depends on applicable precision and decision evidence, not the arithmetic boundary alone. This example sets no acceptable passing score or legal entitlement. It also does not prove that every threshold is unreasonable; thresholds can serve a purpose while retaining uncertainty near them.", "Livingston distinguishes consistency across repeated classifications from accuracy relative to a model-defined true-score classification. Those are not the same statistic, and neither is supplied by a label such as proficient. NCES explains that NAEP achievement levels are attached to specific framework-based cut points. A policy category can summarize evidence, but its technical interpretation and decision context still matter. Changing a cut point can change percentages in categories without demonstrating a corresponding change in the underlying distribution of student performance."],
		editorSummary: "Ask how the boundary was established, what it is intended to mean and what evidence addresses uncertainty near it. Treat an administrative change and a learning change as separate hypotheses. This review does not overturn an exam result, choose an intervention or provide individual placement advice. It explains the difference between a discrete label and a fallible score so that a sharp visual boundary on a chart does not silently become a claim of equally sharp educational separation between people.",
		qualification: "Framework- and policy-specific classification boundaries; no individual pass/fail appeal, entitlement or universal cut point.",
		question: "What classification-consistency evidence and near-boundary precision support the proposed interpretation?",
		gap: "Adds classification uncertainty and threshold-policy effects, distinct from continuous score precision or general risk cutoffs.",
		tags: ["test cut score uncertainty pass fail boundary", "classification consistency proficiency threshold"],
		sources: ["reliability", "levels"]
	},
	{
		key: "ceiling",
		title: "Does an unchanged maximum test score prove that learning stopped?",
		slug: "does-an-unchanged-maximum-test-score-prove-that-learning-stopped",
		bottomLine: "No. A fixed assessment can run out of tasks that distinguish stronger performances, and reporting conversions can collapse different response totals at an endpoint. If the instrument cannot represent additional improvement, an unchanged maximum does not establish absence of growth. It also does not prove that growth occurred; the broader conclusion requires an assessment sensitive to the relevant change.",
		stableCore: ["In an independently invented ten-question check, a learner can answer all ten correctly on two occasions while gaining knowledge outside those sampled questions between them. The observed total remains ten because the instrument has no eleventh task. This logical counterexample is not evidence about a particular learner or a commercial test's actual ceiling. Difficulty coverage, task variety and reporting precision determine which differences a real assessment can distinguish at the top or bottom of its scale.", "Livingston's equating guide describes truncation, where multiple raw scores can be assigned the same highest or lowest reporting score. The Standards discuss the importance of reliability and appropriate score interpretation. A reporting endpoint and an item-bank ceiling are related limits but are not identical mechanisms. Adaptive administration can extend useful measurement in some settings, yet an adaptive label does not guarantee unlimited information at every ability level. Its item pool, termination rules and calibration remain relevant."],
		editorSummary: "When a series plateaus, ask whether the test and reporting scale were capable of showing the improvement of interest. Additional relevant tasks and classroom evidence can address different aspects, but this review does not prescribe a new test or infer unmeasured progress. It adds a sensitivity boundary, not a claim that every stable result conceals growth. The honest conclusion from a capped observation is narrower: no additional change was represented by that measure under those conditions, and the reasons need examination.",
		qualification: "Bounded task coverage and reporting truncation; neither an unchanged maximum nor an adaptive label establishes actual growth or its absence.",
		question: "Can the tasks and reporting conversion distinguish further change in the relevant performance range?",
		gap: "Adds assessment ceiling and reporting-truncation limits on longitudinal inference, rather than assuming every unchanged outcome is a teaching failure.",
		tags: ["test maximum ceiling learning growth unchanged", "score truncation floor sensitivity assessment"],
		sources: ["equating", "standards"]
	},
	{
		key: "itemBias",
		title: "Is a test item biased whenever groups have different success rates?",
		slug: "is-a-test-item-biased-whenever-groups-have-different-success-rates",
		bottomLine: "Not automatically. A raw group difference, differential item functioning and a substantive judgment of item bias are different findings. DIF analysis asks about item performance after matching or conditioning on relevant overall performance. A flagged conditional difference then needs investigation for construct-irrelevant causes. Neither a raw gap nor a DIF flag alone supplies every part of a fairness judgment.",
		stableCore: ["The NCES technical explanation distinguishes overall group performance differences from item-specific difficulty after conditioning. Groups can differ in prior opportunities or relevant proficiency, so unequal unadjusted success rates do not by themselves identify an item defect. Conversely, similar overall averages do not prove that every item functions comparably. These are measurement distinctions, not claims about inherent group ability or a dismissal of inequity. The historical NCES method page does not establish every current assessment's screening threshold.", "NCES explicitly separates identifying DIF from deciding whether an item is biased. Content review and the intended construct matter: an irrelevant language or presentation barrier differs from knowledge that the assessment is actually intended to sample. Matching measures and statistical models can themselves be imperfect, so a numerical flag is not a complete explanation. Absence of a detected flag also does not establish that all access, administration, interpretation or use concerns have been eliminated. Fairness extends beyond one item statistic."],
		editorSummary: "Ask which comparison was performed, what variable was conditioned on and how substantive review addressed the detected pattern. Keep an observed gap visible while resisting unsupported causal explanations. This review does not evaluate a named group, declare a school fair or provide a discrimination finding. It adds the conditional-analysis boundary so that both genuine concerns and technical limitations can be discussed accurately. Appropriate investigation is more informative than turning a single descriptive percentage into either an accusation or a blanket clearance.",
		qualification: "Conditional item analysis and substantive construct review; no group-ability, legal-discrimination or exhaustive fairness conclusion.",
		question: "Is the evidence a raw gap, a conditional DIF pattern or a reviewed construct-irrelevant item effect?",
		gap: "Adds raw-gap/DIF/bias distinctions for educational items; existing bias or social-policy articles do not supply this conditional measurement argument.",
		tags: ["test item bias group gap DIF", "differential item functioning conditional fairness"],
		sources: ["dif", "standards"]
	},
	{
		key: "adaptiveQuestions",
		title: "Does a computer-adaptive test give everyone the same questions?",
		slug: "does-a-computer-adaptive-test-give-everyone-the-same-questions",
		bottomLine: "Not generally. An adaptive assessment can select questions or blocks in response to information gathered during testing, so different learners can see different material. Supported comparisons depend on the calibrated item pool, construct coverage and scoring design rather than identical question sequences. Merely being delivered on a computer does not make a test adaptive or guarantee precise scores.",
		stableCore: ["A response-dependent path differs from a fixed electronic form. An item-level system may update an estimate after each response, whereas a multistage system can choose a later block using earlier performance. The cited NWEA explanation illustrates item-level selection; its simplified next-question rule is not assumed to describe every platform. Claims of exact true ability, universal half-correct targets or guaranteed superiority are not adopted. The product's item bank and termination conditions constrain what can be learned from the responses.", "Different response totals need not have the same meaning when questions differ in calibrated difficulty. A simple percent-correct comparison can therefore ignore information used by the scoring model. That does not mean a reader can derive an actual score from difficulty alone or that every adaptive design is fair and valid. The Standards require evidence for score comparability and intended uses. Changing an item pool, language or administration context can also require fresh checks rather than relying on the adaptive label."],
		editorSummary: "Ask whether the test is fixed-form, item-adaptive or multistage, and read its explanation of score interpretation. Keep ordinary computer delivery distinct from response-dependent selection. This review does not provide exam-taking tricks, reconstruct protected item banks, endorse a testing vendor or evaluate an individual's result. It explains why different question paths can be intentional while still requiring technical evidence for meaningful comparisons. A personalized-looking experience is a design feature, not a substitute for documented coverage, precision and appropriate use.",
		qualification: "Design-specific adaptive selection and calibrated comparability; computer delivery alone is not adaptation or a precision guarantee.",
		question: "Which adaptation unit, item calibration and scoring evidence support the reported comparison?",
		gap: "Adds response-dependent assessment paths and scoring comparability; laptop-use and learning-style reviews concern different educational questions.",
		tags: ["computer adaptive test different questions", "CAT item block calibration scoring difficulty"],
		sources: ["adaptive", "standards"]
	},
	{
		key: "accommodation",
		title: "Does an assessment accommodation automatically change what the test measures?",
		slug: "does-an-assessment-accommodation-automatically-change-what-the-test-measures",
		bottomLine: "No. An accommodation can remove an irrelevant access barrier while preserving the intended construct. A change that alters the targeted skill raises a different comparability question. The effect depends on what is measured and how the administration changes; neither automatic equivalence nor automatic invalidity follows just from the word accommodation. Applicable program evidence and procedures matter.",
		stableCore: ["For an explicitly hypothetical example, enlarging the displayed print might improve access when visual acuity is not the intended reading construct. Supplying an answer would instead change the task. These examples explain a distinction rather than certify any individual's permitted arrangement. The Standards discuss accommodations in relation to maintaining the intended construct, and the NAEP glossary distinguishes changes that do not substantially alter measurement from changes that do. Their terminology is not a universal legal definition across jurisdictions.", "NCES describes environment and administration supports for participation in NAEP. Available features, eligibility and implementation can differ across assessments and over time; historical lists are not a current universal menu. A modification's effect also depends on whether speed, decoding, language or another skill is actually part of the intended construct. Simply translating a task does not guarantee equivalent difficulty or meaning. Appropriate evidence must address the exact change and population, not just assume that a benevolent purpose resolves every measurement issue."],
		editorSummary: "Ask which barrier the change addresses and which skill the assessment is intended to measure. Keep technical comparability, participation access and legal eligibility distinct. This review does not decide a student's accommodation, interpret disability rights law or tell a school to approve or reject a request. It adds the construct-preservation boundary so that accessible administration is neither dismissed automatically as cheating nor treated as automatically equivalent under every possible alteration. The program's documented evidence and qualified educational process remain necessary.",
		qualification: "Construct- and administration-specific evidence; no individual accommodation entitlement, disability diagnosis or universal legal terminology.",
		question: "Does the exact change reduce an irrelevant barrier or alter the skill the assessment is intended to sample?",
		gap: "Adds assessment access versus construct modification, distinct from general school inclusion or intervention-effect questions.",
		tags: ["test accommodation change construct access", "assessment modification comparability accessibility"],
		sources: ["inclusion", "glossary", "standards"]
	},
	{
		key: "schoolCause",
		title: "Does a higher average test score prove that a school caused more learning?",
		slug: "does-a-higher-average-test-score-prove-that-a-school-caused-more-learning",
		bottomLine: "No. A higher observed average describes performance under the assessment and sample definition; it does not by itself identify the school's causal contribution. Starting performance, student composition, participation, outside learning and measurement design can affect comparisons. A causal claim needs a suitable design and assumptions beyond a cross-sectional score difference or a ranking table.",
		stableCore: ["Two schools can serve students with different prior opportunities and starting knowledge. Even if both add the same amount of learning, their later averages can differ. This independently constructed counterexample is not an estimate of any actual school effect and does not imply that instruction never matters. Conversely, schools with similar averages can have different patterns of improvement. The question about observed achievement must be separated from the question about what would have happened to comparable students under another educational setting.", "NCES explicitly warns that NAEP data do not support cause-and-effect claims. Its significance guide also distinguishes statistical dependability from educational relevance. Detecting a population score difference therefore does not resolve its cause or prove a practically important instructional effect. Adjusted or longitudinal models may address additional questions, but they require their own assumptions and validation; adjustment is not automatic causal identification. Changes in who participates or how a test is administered can further complicate apparently straightforward trends."],
		editorSummary: "Read the population, assessment, participation and comparison definitions before assigning credit or blame. Ask what the design supports: an achievement description, a supported growth estimate or a justified causal argument. This review does not rank named schools, evaluate a teacher or dismiss useful accountability information. It adds the attribution boundary needed to interpret school charts honestly. A public discussion can acknowledge a real observed gap without inventing a single explanation, and can seek stronger evidence when an intervention or causal claim is proposed.",
		qualification: "Descriptive group performance versus design-supported causal effects; no named-school ranking or teacher-effect estimate.",
		question: "What evidence separates prior student differences and participation from the proposed school effect?",
		gap: "Adds educational score-ranking attribution and student-composition limits; earlier class-size/tutoring studies do not make a cross-sectional school mean causal.",
		tags: ["school higher test average caused learning", "school ranking causal prior performance composition"],
		sources: ["meaning", "significance"]
	},
	{
		key: "naepIndividual",
		title: "Does a national assessment sample reveal every individual student's achievement?",
		slug: "does-a-national-assessment-sample-reveal-every-individual-students-achievement",
		bottomLine: "No. In U.S. NAEP, representative student samples and distributed question sets support estimates for populations and groups, not individual score reports. A participating learner does not take every item, and the program does not report an individual achievement result. This design can be useful for monitoring groups without being a complete diagnostic test for each participant.",
		stableCore: ["NCES explains that groups collectively respond to broad item coverage while each student sees a limited subset. The analysis estimates score distributions and reporting statistics for specified populations. Data processing may use information linked to each respondent, but that does not turn the resulting group-estimation machinery into a sufficiently precise personal proficiency report. A population assessment and a classroom assessment can therefore have different valid uses without one being inherently better at every educational task.", "The NCES data-quality discussion identifies both student-sampling and measurement components of uncertainty, along with nonsampling risks such as nonresponse. A large total sample does not guarantee that every subgroup is precisely represented or that each individual took enough tasks for a reliable personal score. Weighting and modeling support the intended inference under their assumptions, not knowledge of every learner's unobserved responses. Historical response rates or technical examples on the source pages are not current guarantees of unbiased coverage."],
		editorSummary: "Keep a statement about a nation's or jurisdiction's students separate from a statement about a particular child. Ask whether the report concerns a population estimate, a subgroup estimate or an actual individual assessment. This review does not infer any participant's ability, retrieve private student records or generalize NAEP's design to every country's testing program. It explains why a sampled group-monitoring instrument can provide valuable public information while intentionally not supplying the personalized result someone might expect from an ordinary classroom test.",
		qualification: "U.S. NAEP's group-monitoring design; not every national assessment, individual diagnostic result or exhaustive coverage guarantee.",
		question: "Which population is estimated, and was the assessment designed to support individual reports?",
		gap: "Adds distributed item sampling and group-estimation purpose in NAEP, distinct from individual test-score measurement error.",
		tags: ["NAEP individual student score national sample", "population assessment item sampling group estimate"],
		sources: ["analysis", "quality", "meaning"]
	},
	{
		key: "proficientLabels",
		title: "Are NAEP Proficient and a state's proficient label interchangeable?",
		slug: "are-naep-proficient-and-a-states-proficient-label-interchangeable",
		bottomLine: "No. The same word can name different performance standards. NAEP Proficient is defined through NAEP's subject- and grade-specific framework and achievement-level process; NCES explicitly says it is not equivalent to meeting state grade-level expectations. Another program's proficient category cannot be substituted without evidence linking the standards, assessed content and score interpretations.",
		stableCore: ["A label compresses a longer definition. The underlying framework specifies what is assessed, and a cut point places performance categories on that assessment's scale. Two programs can use different content coverage, standard-setting procedures and reporting purposes while both printing proficient. The discrepancy is not automatically evidence that one result is fraudulent. It signals that the definitions must be compared before interpreting percentages as though they counted the same educational event in the same population.", "NCES reports percentages at or above NAEP's achievement-level cut points, not the percentage of the entire curriculum that each learner mastered. State categories address their own standards. Changes in a framework, threshold or participation can also affect a comparison across time, even when the display keeps the same familiar word. This review does not import a specific historical cut score or claim that every subject and grade uses one universal level. Its boundary concerns the defined category rather than a judgment about current state performance."],
		editorSummary: "When two proficiency figures differ, compare the assessment framework, grade, subject, population and exact category definition first. Read the full meaning of the label instead of treating its everyday sense as a universal standard. This review does not rank states or say what fraction of current children is below grade level. It adds the reporting-category boundary so that national and state information can be discussed together without silently turning different benchmarks into one supposedly contradictory measure of the same thing.",
		qualification: "NAEP-specific achievement standards versus another program's definitions; no universal grade-level conversion or current state-performance estimate.",
		question: "Do the two proficiency labels refer to the same framework, performance standard and population?",
		gap: "Adds framework-defined achievement labels and NAEP/state non-equivalence; it is not another review of general percentile ranks or teaching effectiveness.",
		tags: ["NAEP proficient state grade level label", "achievement level framework standard cut point"],
		sources: ["levels", "meaning"]
	}
];

export const readerAssessmentSlugs: Record<string, string> = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerAssessmentClaims: SeedClaim[] = reviews.map((review, index) => ({
	topicSlug: "education-and-learning",
	title: review.title,
	slug: review.slug,
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 75,
	bottomLine: review.bottomLine,
	stableCore: review.stableCore,
	editorSummary: review.editorSummary,
	openQuestions: [review.question],
	whatWouldChangeMinds: [`A verified source correction, altered assessment design or new purpose-specific evidence that changes this interpretation requires reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A score label does not establish every educational interpretation, causal claim or individual decision."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "generalizability", detail: review.qualification }],
	searchDatabases: ["Original joint AERA/APA/NCME testing standards and ETS technical guides", "Original NCES methodology and interpretation pages", "Original Pearson/NWEA explanations; Consensus.app discovery not canonical evidence"],
	searchCutoffAt: assessmentCheckedAt,
	inclusionRules: ["Identify the construct, population, scale, assessment purpose and uncertainty before interpreting a score.", "Retain historical/product-specific limits and distinguish mathematical counterexamples from actual observations."],
	exclusionRules: ["No individual diagnosis, eligibility, placement, exam appeals, school rankings, legal advice or protected test reconstruction.", "No invented demand, expert votes, current norm conversions, universal error bands or conclusions from inaccessible originals."],
	appraisalTools: ["Original definition, score-purpose, measurement-boundary and mathematical-counterexample checks; not a formal study appraisal", "Original source-context check, not exhaustive integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Related NCES pages share agency provenance, and ETS/Pearson/NWEA explanations are not independent trials. Joint professional standards support defined interpretation principles, not a numerical poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing or students assessed accurately. No actual reader demand was measured.",
	coiSummary: "Testing providers publish several references and have interests in their assessment products. Their marketing comparisons are excluded, not presumed independent. Public-agency and professional-association provenance is identified; funding and conflicts were not exhaustively audited. No vendor is endorsed.",
	lastRetractionCheckAt: assessmentCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "A defined interpretation or measurement boundary, not a measured intervention benefit, individual prognosis or expert-agreement percentage.", certainty: "moderate", limitations: [review.qualification, "No actual private student records, current product validation or educational decision evaluated"] }],
	institutionalAnchors: [{ name: readerAssessmentSources[review.sources[0]!].publisher, role: "Technical definition and interpretation-scope reference, not an individual decision or empirical expert poll" }],
	changeLog: [{ date: assessmentCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: `ae597cc1-79c6-49bf-9b6b-b0cd6dc6${String(index + 1).padStart(4, "0")}`, date: assessmentCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Original corrections and errata for cited references"], guidelineMonitors: ["Joint testing standards and cited program-definition updates"], triggerRules: ["Reassess a verified source correction or assessment-scope change affecting the stated interpretation."] },
	sources: review.sources.map((key, sourceIndex) => ({ ...readerAssessmentSources[key], order: sourceIndex + 1, isAnchor: sourceIndex === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: assessmentCheckedAt, statusSources: [readerAssessmentSources[key].url!] }))
}));

export const readerAssessmentGaps = reviews.map(review => ({ slug: review.slug, gap: review.gap, relatedExistingSlugs: ["does-formative-assessment-improve-k12-learning", "does-retrieval-practice-improve-long-term-learning"] }));
