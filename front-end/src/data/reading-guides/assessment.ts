import type { ReadingGuideContent } from "./types";

export const assessmentGuide: ReadingGuideContent = {
	takeaway:
		"Identify the assessed skill, score scale, comparison population and intended use before interpreting a test report or school chart.",
	scope: "Original technical references were checked, but independent expert review has not been completed. These are assessment-definition and interpretation principles, not a measured scientist vote or a diagnosis. Numerical counterexamples are independently constructed and hypothetical. Historical norms, product comparisons, current individual results, school rankings, legal eligibility and placement decisions are not evaluated. Several sources share NCES provenance or come from testing providers; they are not independent intervention trials.",
	sections: [
		{
			id: "score-and-reference",
			title: "A ranking is not a curriculum map",
			paragraphs: [
				{
					text: "Begin with the noun after the number. Percentage correct, scaled score, percentile rank and achievement category are not different spellings of one quantity. Percentage correct concerns responses to a named item set. A percentile rank locates a score relative to a specified comparison distribution. An achievement category uses a defined performance standard. A scaled score belongs to a reporting metric whose interpretation needs documentation. If a report supplies all four, keep their definitions beside them rather than selecting whichever looks most flattering or alarming. A rank cannot identify which untested skills a learner has mastered. Ask what was sampled and what the comparison population represents before drawing a curriculum conclusion.",
					sources: ["standards", "glossary"]
				},
				{
					text: "Ranks also discard the spacing between underlying scores. In an independently invented distribution of 10, 11, 12, 13 and 50, equal rank steps can span either one score point or 37 score points. That is why arithmetic performed on ranks does not automatically become arithmetic on learning. A mean of individual ranks is not generally the rank of a mean score. A clearly defined median rank can answer a different, legitimate descriptive question. Ties, interpolation and different reference groups add conventions that must be identified. Do not present the toy distribution as actual norms or assume that a percentile change measures a fixed amount of curriculum progress.",
					sources: ["standards", "grade"]
				}
			]
		},
		{
			id: "growth-and-equivalents",
			title: "Progress and relative position can move differently",
			paragraphs: [
				{
					text: "A learner can improve on a comparable scale while peers improve more. Relative position can then remain stable or fall without implying that previously learned skills disappeared. A report comparing different seasons or norm populations needs that context, not just a pair of percentile labels. NWEA's distinction between normative growth and improvement needed to reach a benchmark illustrates the separate questions, but its historical numerical tables are not adopted as present universal expectations. A growth percentile, achievement percentile and point change are not interchangeable. A forecast is also not a guarantee. Keep observed comparable performance, model expectations and the chosen educational criterion separate when interpreting progress.",
					sources: ["growth", "standards"]
				},
				{
					text: "A grade-equivalent label can look like a complete curriculum judgment while only describing a normative score correspondence. Matching a reference performance for a grade on sampled tasks does not show mastery of every task taught in that grade. It does not settle placement. Its calendar-like increments are not necessarily equal units of underlying score change, and an age equivalent is not a person's overall developmental age. Pearson's reference explains the conversion boundary; historical clinical examples and product tables are excluded here. Ask which construct was measured, what the equivalent actually means and which relevant classroom evidence remains outside that number. Neither a high-looking label nor a low-looking one supplies the missing information.",
					sources: ["grade", "standards"]
				}
			]
		},
		{
			id: "forms-and-scales",
			title: "Comparable-looking numbers need comparability evidence",
			paragraphs: [
				{
					text: "A raw count records responses to particular questions. Two equally long forms can differ in difficulty, so equal percentages correct need not represent equivalent performance. Supported equating uses an appropriate collection design and analysis; it is not simply the difference between two classroom averages. A reporting scale may transform responses or estimated proficiency, sometimes adjusting form differences. An arbitrary invented rule of 100 plus ten times the number correct gives 160 for six correct answers. Dividing 160 by a maximum of 200 does not recover six out of ten. Real scoring systems need their own definitions. The counterexample demonstrates why endpoint division is not a universal conversion, not how to score a particular exam.",
					sources: ["equating", "analysis"]
				},
				{
					text: "Sharing a numerical range is likewise insufficient when two assessments measure different content or use independently developed scales. NCES identifies this issue for NAEP subject scales. A mathematics score and a reading score are not made interchangeable by matching chart axes. Equating alternate forms, predicting another result and establishing a concordance between related assessments answer different questions. Documented longitudinal or cross-grade scales can permit particular comparisons, so the opposite blanket claim that no such comparison is possible would also be wrong. Ask what common scale or link is supported for the exact construct, population and use. Reported digits, attractive rulers and familiar labels are not evidence for that link.",
					sources: ["scales", "equating"]
				}
			]
		},
		{
			id: "reliability-and-use",
			title: "Repeatability does not establish every interpretation",
			paragraphs: [
				{
					text: "Reliability asks about consistency or precision under specified repetitions: different occasions, forms or raters can define different targets. Validity asks whether evidence supports a proposed interpretation for its intended use. An independently invented repeatable typing-speed count would not alone establish reading comprehension. More repetitions would not supply the missing construct connection. A reliability coefficient also does not mean that the same percentage of each individual's score is accurate. Read what the statistic describes rather than treating it as a general quality badge. Precision evidence matters, but content coverage, response processes and the intended conclusion still require attention. A consistent observation can remain a poor answer to the question someone actually asked.",
					sources: ["reliability", "standards"]
				},
				{
					text: "Changing the use changes the argument. Evidence for monitoring a population does not automatically support diagnosing a person, choosing a placement or assigning a causal teacher effect. A different language, population, format or accessibility arrangement can introduce additional questions. This does not make validation meaningless or require discarding every existing result. It requires naming the proposed inference and checking whether the evidence addresses it. NAEP's group-monitoring purpose is a concrete example of a valid intended boundary rather than an all-purpose individual assessment. This guide does not establish a particular test's professional suitability. It helps distinguish what the evidence actually supports from a conclusion borrowed from the broad word validated.",
					sources: ["standards", "analysis"]
				}
			]
		},
		{
			id: "precision-and-labels",
			title: "A sharp category can rest on a fallible score",
			paragraphs: [
				{
					text: "A reported integer can summarize a measurement affected by sampled tasks, occasions and raters. Measurement error includes these variations, not only a clerical mistake. The classical true-score concept is an expectation over defined repetitions, not directly observed pure ability. An individual standard error of measurement is different from the uncertainty of a national average; a standard deviation or reliability coefficient is different again. Ask which error sources and score levels the precision estimate covers. Extra decimal places do not create information. An interval needs its stated construction and assumptions, and overlapping intervals alone are not a universal significance test. This guide supplies no personal probability or uniform plus-or-minus band.",
					sources: ["reliability", "quality"]
				},
				{
					text: "A reporting threshold then adds a policy or framework boundary to that uncertain measurement. In an invented example with a cut score of 42, observed values of 41 and 43 can receive different labels without establishing a sudden jump in underlying learning. Classification consistency across repeated tests and classification accuracy against a model-defined reference are distinct quantities. A label does not provide either statistic. The threshold can serve a legitimate purpose while uncertainty remains near it. Changing a threshold can also change category percentages without changing the score distribution. Ask how the boundary was set and what it means, while leaving individual appeals, entitlements and placement decisions to the appropriate qualified process.",
					sources: ["reliability", "levels"]
				}
			]
		},
		{
			id: "sensitivity-and-adaptation",
			title: "The instrument must be able to represent the change",
			paragraphs: [
				{
					text: "A maximum result on a fixed ten-question check can stay unchanged while knowledge outside those tasks changes. Reporting truncation can also assign different response totals the same endpoint. Task coverage and a reporting ceiling are related but distinct limitations. Neither a plateau proves that learning stopped nor a possible ceiling proves that unobserved growth occurred. Look for an assessment sensitive to the particular difference of interest. Livingston describes the reporting-conversion mechanism; the independently constructed ten-question example is not an actual student record. A narrow observation should remain narrow until other relevant evidence is supplied, rather than being expanded into a verdict about everything the learner can do.",
					sources: ["equating", "standards"]
				},
				{
					text: "Computer-adaptive assessment can intentionally give learners different questions or blocks based on earlier information. A fixed electronic form is not adaptive merely because it appears on a screen. An item-level explanation is not a universal description of multistage systems, and a personalized path does not guarantee unlimited precision. Comparability requires an appropriate calibrated pool, scoring model and construct coverage. Ordinary percentages correct can omit the difficulty information the model uses. NWEA's original explanation provides a selection example, but marketing assurances about exact ability, universal half-correct targets and guaranteed superiority are excluded. Read the program's documented design rather than interpreting a different path as either automatic unfairness or automatic quality.",
					sources: ["adaptive", "standards"]
				}
			]
		},
		{
			id: "access-and-items",
			title: "Access barriers and item statistics need substantive review",
			paragraphs: [
				{
					text: "An accommodation can reduce an access barrier unrelated to the target skill while preserving the intended construct. A change that alters the target raises a different question. Hypothetically enlarging print and hypothetically supplying an answer are not the same intervention. The distinction depends on what the assessment intends to measure; neither automatic equivalence nor automatic invalidity follows from a helpful intention or a familiar label. NCES describes administration supports for NAEP participation, not a universal menu of entitlements for every test. Program-specific evidence, implementation and qualified educational procedures remain necessary. Technical comparability, participation access and legal eligibility should be discussed separately rather than inferred from one another.",
					sources: ["inclusion", "glossary", "standards"]
				},
				{
					text: "Unequal raw success rates across groups do not alone identify a biased item. DIF analysis examines an item after conditioning on relevant overall performance; substantive review then asks whether a flagged difference reflects a construct-irrelevant factor. The historical NCES method explanation explicitly separates DIF from bias. Models and matching variables have limitations, so a flag is not a complete causal account, and absence of a detected flag does not clear every access or use concern. Keep the observed gap visible while identifying which claim the evidence supports. This guide makes no inference about inherent group ability, no discrimination finding and no fairness judgment about a named school or testing program.",
					sources: ["dif", "standards"]
				}
			]
		},
		{
			id: "school-attribution",
			title: "A school average is not an identified school effect",
			paragraphs: [
				{
					text: "An average can describe performance without explaining its cause. Student starting knowledge, prior opportunities, participation and learning outside school can differ between groups. Even equal amounts of learning can leave different end-point averages. Conversely, similar averages can conceal different growth patterns. These are independently constructed possibilities, not estimates of actual schools. NCES warns that NAEP data do not support cause-and-effect claims. A more elaborate longitudinal or adjusted model can address additional questions, but its assumptions and validation still matter. A statistic becomes no more causal simply because a chart ranks it or an explanation assigns a single appealing source of credit or blame.",
					sources: ["meaning", "standards"]
				},
				{
					text: "Uncertainty applies to group comparisons as well as individual observations. Sample size, sampling design and measurement components can affect precision. Statistical significance is not educational importance or identification of an instructional cause. A difference can be statistically dependable yet small for a decision, while an imprecise estimate can leave meaningful possibilities unresolved. NCES explains that differences in standard errors can change a comparison even when printed averages look alike. Do not infer universal thresholds from a historical table or mistake a failure to detect a difference for proof of equivalence. Name the population, estimated quantity, comparison and uncertainty before using a school chart to motivate a policy conclusion.",
					sources: ["significance", "quality"]
				}
			]
		},
		{
			id: "population-and-framework",
			title: "Population monitoring and proficiency have defined meanings",
			paragraphs: [
				{
					text: "U.S. NAEP distributes questions across representative student samples and estimates performance for populations and groups. Each participant does not take the whole assessment, and individual results are not reported. Group-estimation machinery does not supply a complete personal diagnostic result simply because its processing uses respondent-level information. The NCES technical explanation distinguishes student sampling, item sampling and nonsampling risks. A large total sample alone does not guarantee precise coverage for every subgroup. This design can serve its monitoring purpose while not answering an individual classroom question. Another national or classroom assessment may have different intended uses, so NAEP's boundary should not be generalized to every program.",
					sources: ["analysis", "quality", "meaning"]
				},
				{
					text: "Finally, read a category's full definition. NAEP Proficient and a state's proficient label are not interchangeable simply because they share a word. NAEP's framework and standard-setting process define achievement levels on its own assessment, and NCES explicitly distinguishes them from state grade-level expectations. Percentages at or above a cut point are not the percentage of curriculum mastered by each learner. Compare the grade, subject, framework, population and category before treating two figures as contradictory. Changes in content, thresholds or participation also matter for trends. This guide does not estimate current state performance; it supplies the interpretation questions needed before a familiar label becomes an unsupported universal educational verdict.",
					sources: ["levels", "meaning", "scales"]
				}
			]
		}
	],
	questions: [
		"Which construct, tasks and assessment purpose does this score describe?",
		"Is this a raw total, reporting score, norm rank, growth measure or framework-defined category?",
		"Which population, testing period and comparability evidence support the comparison?",
		"Which precision, ceiling, administration and participation limits remain relevant?",
		"Does the evidence support description, prediction, individual action or a causal claim?"
	],
	sources: [
		{
			id: "standards",
			title: "AERA/APA/NCME: Standards for Educational and Psychological Testing, 2014",
			url: "https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf",
			kind: "Joint professional standards",
			note: "Original purpose-specific validity, precision, fairness and comparability checked; cited edition is identified, not universal legal advice."
		},
		{
			id: "reliability",
			title: "Livingston/ETS: Test reliability, basic concepts, 2018",
			url: "https://www.ets.org/Media/Research/pdf/RM-18-01.pdf",
			kind: "Technical measurement guide",
			note: "Original consistency, model-defined true score and classification distinctions checked; no personal universal error band."
		},
		{
			id: "equating",
			title: "Livingston/ETS: Equating test scores without IRT, second edition, 2014",
			url: "https://www.ets.org/Media/Research/pdf/LIVINGSTON2ed.pdf",
			kind: "Technical scoring guide",
			note: "Original form, transformation, linking and truncation limits checked; historical tables are not present conversions."
		},
		{
			id: "grade",
			title: "Pearson: Interpretation problems of age and grade equivalents",
			url: "https://www.pearsonassessments.com/campaign/interpretation-problems-of-age-and-grade-equivalents.html",
			kind: "Publisher score explanation",
			note: "Original median-reference and non-interval meanings checked; clinical examples and placement conclusions excluded."
		},
		{
			id: "growth",
			title: "NWEA: Normal versus necessary academic growth, 2025",
			url: "https://www.nwea.org/blog/2025/normal-vs-necessary-academic-growth/",
			kind: "Publisher growth explanation",
			note: "Original normative-versus-benchmark distinction checked; 2020 norms and state examples are not current universal forecasts."
		},
		{
			id: "adaptive",
			title: "NWEA: Computer adaptive testing in education, 2026",
			url: "https://www.nwea.org/blog/2026/what-is-computer-adaptive-testing-cat-in-education/",
			kind: "Publisher design explanation",
			note: "Original adaptive-path concept checked; marketing precision, exact-ability and universal half-correct claims excluded."
		},
		{
			id: "dif",
			title: "NCES: Differential item functioning",
			url: "https://nces.ed.gov/nationsreportcard/tdw/analysis/scaling_checks_dif.aspx",
			kind: "Conditional item-analysis reference",
			note: "Original DIF-versus-bias distinction checked; historical 2008 method page is not every current screening policy."
		},
		{
			id: "inclusion",
			title: "NCES: Inclusion of students with disabilities and English learners",
			url: "https://nces.ed.gov/nationsreportcard/about/inclusion.aspx",
			kind: "Participation and administration scope",
			note: "Original support and access descriptions checked; participation percentages and eligibility menus not generalized."
		},
		{
			id: "meaning",
			title: "NCES: Intended meaning of NAEP results",
			url: "https://nces.ed.gov/nationsreportcard/guides/",
			kind: "Program interpretation boundary",
			note: "Original group-reporting, causal and proficiency-label limits checked; NAEP is not every assessment program."
		},
		{
			id: "scales",
			title: "NCES: NAEP scale scores",
			url: "https://nces.ed.gov/nationsreportcard/scale_scores/",
			kind: "Reporting-scale explanation",
			note: "Original independent subject scales checked; no universal prohibition on documented cross-grade scales."
		},
		{
			id: "levels",
			title: "NCES: NAEP achievement levels",
			url: "https://nces.ed.gov/nationsreportcard/about/achieve.aspx",
			kind: "Framework and category definition",
			note: "Original cut-point and state grade-level non-equivalence checked; no universal threshold or present state estimate."
		},
		{
			id: "analysis",
			title: "NCES: NAEP analysis and scaling",
			url: "https://nces.ed.gov/nationsreportcard/tdw/analysis/default.aspx",
			kind: "Group-estimation methodology",
			note: "Original July 2026 updated analysis description checked; group processing is not a personal proficiency report."
		},
		{
			id: "quality",
			title: "NCES handbook: NAEP data quality",
			url: "https://nces.ed.gov/statprog/handbook/naep_dataquality.asp",
			kind: "Sampling and measurement limits",
			note: "Original student/item uncertainty and nonsampling risks checked; historical rates are not current guarantees."
		},
		{
			id: "significance",
			title: "NCES: Statistical significance and sample size",
			url: "https://nces.ed.gov/nationsreportcard/guides/statsig.aspx",
			kind: "Group-comparison uncertainty",
			note: "Original precision and practical-significance distinction checked; no universal individual interval or minimum sample size."
		},
		{
			id: "glossary",
			title: "NCES: NAEP glossary of terms",
			url: "https://nces.ed.gov/nationsreportcard/glossary.aspx",
			kind: "Defined score and administration terms",
			note: "Original percentile and accommodation terms checked; historical examples are not current universal conventions."
		}
	]
};
