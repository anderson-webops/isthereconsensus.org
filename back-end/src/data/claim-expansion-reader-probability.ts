import type { SeedClaim } from "./claims.js";

export const probabilityCheckedAt = "2026-10-05T11:14:00.000Z";

function reference(title: string, publisher: string, url: string, note: string): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title, publisher, url, note, stance: "supports", order: 1 };
}

function lesson(course: string, number: string, title: string, note: string) {
	return reference(`STAT ${course}: ${title}`, "Penn State, Eberly College of Science", `https://online.stat.psu.edu/stat${course}/Lesson${number}`, note);
}

export const readerProbabilitySources = {
	location: reference("Measures of Location", "NIST/SEMATECH e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm", "Original mean, median and tail-sensitivity definitions checked. Median is not declared universally preferable; population expectations need not exist for every heavy-tailed distribution."),
	summaries: lesson("100", "03", "Getting the Big Picture and Summaries", "Original center and histogram grouping explanations checked. Classroom data, activities and diagrams are not reproduced. These summaries describe a specified dataset, not automatic population representativeness."),
	points: reference("Glossary: Percentage point", "Eurostat, Statistics Explained", "https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/42722.pdf", "Original one-page definition checked. A difference between percentages is distinguished from a change relative to a baseline. No current economic statistic or political opinion percentage is inferred."),
	change: reference("Calculating percent changes", "U.S. Bureau of Labor Statistics", "https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm", "Original baseline-relative formula and warning that successive changes do not simply sum checked. Agency index examples are not imported as current data. Numerical examples here are independently constructed arithmetic, not financial guidance."),
	conditional: lesson("414", "04", "Conditional Probability", "Original event restriction and conditional denominator definitions checked. Clinical examples and historical diagnostic numbers are not reproduced. The elementary formula requires a positive conditioning-event probability."),
	conditionalFormal: reference("Conditional probability", "Marco Taboga, StatLect", "https://www.statlect.com/fundamentals-of-probability/conditional-probability", "Original conditional-event and total-probability definitions checked, including the division-by-zero boundary. Advanced conditional distributions are not reduced to a zero-denominator quotient."),
	independence: lesson("414", "05", "Independent Events", "Original factorization and conditional definitions checked. Pairwise independence is not silently substituted for mutual independence. No claim that physical trials are independent solely because they look different."),
	independentEvents: reference("Independent events", "Marco Taboga, StatLect", "https://www.statlect.com/fundamentals-of-probability/independent-events", "Original independence definition checked. Disjoint positive-probability events cannot be independent; null-event edge cases are retained. Teaching exercises are not copied."),
	events: lesson("414", "02", "Properties of Probability", "Original union, intersection, disjointness and addition rule checked. Overlapping events require an intersection adjustment; event names alone do not establish independence."),
	sampling: lesson("414", "10", "The Binomial Distribution", "Original independent-trial conditions and without-replacement qualification checked. An approximate binomial calculation is not exact independence. No historical vehicle or material-inspection data are imported."),
	density: lesson("414", "14", "Continuous Random Variables", "Original density, interval-area and zero-singleton probability definitions checked. The review concerns distributions with ordinary densities, not an assertion that every distribution has one. Rounded observations are distinguished from exact points."),
	uniform: reference("Uniform Distribution", "NIST/SEMATECH e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm", "Original uniform density and interval support checked. A density height is not a probability and has reciprocal measurement units. All numerical intervals in the reviews are hypothetical, not measured samples."),
	expectation: lesson("414", "08", "Mathematical Expectation", "Original probability-weighted mean and variance definitions checked. A finite expectation is not promised for every distribution. The mean is not necessarily an attainable individual outcome or a most likely outcome."),
	expectedValue: reference("Expected value", "Marco Taboga, StatLect", "https://www.statlect.com/fundamentals-of-probability/expected-value", "Original expectation definition and integrability qualification checked. Gambling examples are not reproduced and no betting recommendation is made."),
	largeNumbers: reference("Law of Large Numbers", "Marco Taboga, StatLect", "https://www.statlect.com/asymptotic-theory/law-of-large-numbers", "Original sufficient conditions and convergence distinctions checked. Convergence is not monotonic, a deadline or a requirement for the next independent outcome to compensate for the past."),
	correlation: lesson("414", "18", "The Correlation Coefficient", "Original covariance, correlation and explicit failure of the converse independence theorem checked. Defined finite moments and positive variances are required for the stated Pearson correlation; joint normality is not inferred from normal marginals alone."),
	independentVariables: reference("Independent random variables", "Marco Taboga, StatLect", "https://www.statlect.com/fundamentals-of-probability/independent-random-variables", "Original joint-distribution definition and independence/zero-covariance distinction checked. Moment existence is retained; an empirical correlation estimate is not proof of population independence."),
	scale: reference("Measures of Scale", "NIST/SEMATECH e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm", "Original variance, standard-deviation units and tail-sensitivity definitions checked. Sample and population denominators are distinguished. No unqualified promise that a mean or variance exists in every population."),
	sampleMeans: lesson("414", "24", "Several Independent Random Variables", "Original mean/variance of independent sample averages checked. The sigma-over-square-root-size relation requires the stated sampling model; finite-population sampling, dependence and weighting can alter it."),
	standardError: lesson("100", "08", "Diversity of Samples from the Same Population", "Original individual-versus-sample-average spread distinction checked. Teaching examples are not current observed data. A small standard error does not establish an unbiased sample or small individual variation."),
	normal: reference("Normal Distribution", "NIST/SEMATECH e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3661.htm", "Original normal density and model-assumption warning checked. Introductory central-limit wording is not generalized to every distribution, dependence structure or finite sample."),
	empirical: lesson("100", "04", "Bell-Shaped Curves and Statistical Pictures", "Original approximately normal empirical-rule condition checked. Broader teaching shortcuts about most observations being within one standard deviation are not adopted for arbitrary distributions."),
	missing: reference("Labour Force Survey user guidance, Volume 10: Analysis of data collected by the Labour Force Survey", "Office for National Statistics", "https://www.ons.gov.uk/file?uri=/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/methodologies/labourforcesurveyuserguidance/volume10.pdf", "Original missing-value distinctions checked at PDF pages 12, 17 and 43. This is a dated survey-codebook example, not current universal software encoding or a recommendation to use one imputation method everywhere."),
	missingGlossary: reference("Glossary: Missing value", "UK Data Service", "https://ukdataservice.ac.uk/glossary/", "Original missing-value subsection checked. Missingness can reflect design, absent answers or entry problems. The glossary's broad imputation/deletion advice is not adopted as a universal analysis prescription."),
	histogram: reference("Histogram", "NIST/SEMATECH e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm", "Original binning and count-versus-density normalization checked. A histogram is exploratory, not unique proof of a distribution. Unequal bin widths require attention to area rather than simple height comparisons."),
	simpson: lesson("100", "06", "Relationships Between Categorical Variables", "Original aggregation reversal and conditional proportions checked. Historical political and smoking examples are not copied. The algebra does not identify which conditioning set answers a causal question."),
	simpsonFormal: lesson("504", "05", "Three-Way Tables: Types of Independence", "Original marginal-versus-conditional association reversal definition checked. A third variable can matter without every adjustment being causally appropriate. No real-world frequency of reversal is inferred.")
} satisfies Record<string, SeedClaim["sources"][number]>;

interface ProbabilityReview {
	key: string;
	id: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	tags: string[];
	sources: Array<keyof typeof readerProbabilitySources>;
}

const reviews: ProbabilityReview[] = [
	{
		key: "median",
		id: "4777d470-e559-4eab-9de2-8253b093a001",
		title: "Do the mean and median always describe the same typical value?",
		slug: "do-the-mean-and-median-always-describe-the-same-typical-value",
		bottomLine: "No. The arithmetic mean uses the sum divided by the count; the median uses the middle of the ordered observations. They can differ substantially when a dataset is skewed or contains extreme values, often called outliers. Neither is a universal definition of typical. Choose the summary for the question, and show the distribution when one number conceals important variation.",
		stableCore: ["For a hypothetical list of 2, 3, 4, 5 and 36 units, the mean is 10 units while the median is 4. An outlier can move the mean substantially without moving the middle rank. Both calculations describe the same list correctly.", "A mean can matter when a total is allocated across observations, whereas a median describes the ordered midpoint. A resistant summary is not permission to delete inconvenient observations or assume that a large value is a recording error."],
		editorSummary: "Ask whether average means arithmetic mean, median or another specified summary. If the question concerns a randomly selected person's experience, a pooled total divided by people may not communicate the whole distribution. If the question concerns total resources per item, discarding tail information can also mislead. This review explains the descriptive distinction, not which estimator is best under every population model. The toy list is invented for arithmetic illustration and is not reader, income or clinical data.",
		qualification: "The target quantity and distribution determine usefulness; some population means do not exist.",
		tags: ["mean median outlier typical average", "skewed distribution", "middle value"],
		sources: ["location", "summaries"]
	},
	{
		key: "pooled",
		id: "4777d470-e559-4eab-9de2-8253b093a002",
		title: "Can group averages be averaged without accounting for group sizes?",
		slug: "can-group-averages-be-averaged-without-accounting-for-group-sizes",
		bottomLine: "Not generally if the goal is the average across all individual observations. The pooled arithmetic mean weights each group mean by its number of observations. An equally weighted average of group means answers a different question: the average of groups. They agree for equal group sizes, identical means or particular coincidences, not as a general rule.",
		stableCore: ["In a hypothetical comparison, two observations have a mean of 6 units and eight observations have a mean of 16. Their combined total is 140 across ten observations, giving a pooled mean of 14. Averaging the two means equally instead gives 11.", "Weighting must match the intended unit. A group-level policy question may deliberately give groups equal weight; an individual-level summary generally does not. Survey weights or other design weights introduce additional requirements beyond using raw sample sizes."],
		editorSummary: "Before combining reports, identify what each mean includes and whether the groups overlap. A sample-size-weighted mean can be recovered from disjoint groups with the same measured quantity and compatible definitions. It cannot reconstruct information that the summaries omit, such as each group's distribution, nor fix selection bias. Equal weighting is not inherently dishonest, but describing a group-average result as the average person changes the estimand. Show the unit and weighting rule rather than using the word average as if only one calculation existed.",
		qualification: "Compatible measurements, disjoint groups and the intended weighting unit are required.",
		tags: ["average averages group sizes pooled mean", "weighted mean", "unequal groups"],
		sources: ["summaries", "expectation", "location"]
	},
	{
		key: "simpson",
		id: "4777d470-e559-4eab-9de2-8253b093a003",
		title: "Can combining groups reverse an association present within every group (Simpson's paradox)?",
		slug: "can-combining-groups-reverse-an-association-present-within-every-group",
		bottomLine: "Yes. Simpson's paradox is an aggregation reversal between within-group and overall associations. Different mixtures of groups can outweigh the ordering within each group. This is a property of conditional and marginal summaries, not an arithmetic contradiction. It also does not establish that either aggregation or adjustment always gives the correct causal conclusion.",
		stableCore: ["In an invented easy/hard task table, method A completes 8 of 10 easy tasks and 60 of 100 hard tasks; method B completes 70 of 100 easy tasks and 5 of 10 hard tasks. A has the higher completion rate in each stratum, but overall A completes 68 of 110 and B completes 75 of 110.", "The overall rates use different weights for task difficulty. The reversal disappears as a mystery when each total is reconstructed from its own group counts. Deciding whether difficulty should be adjusted for requires the target question and a defensible causal structure."],
		editorSummary: "Publish the denominators and stratified table instead of choosing the single rate that supports a preferred story. The hypothetical table proves that reversal is possible; it says nothing about how frequently it occurs in actual research or which method should be used in practice. A confounder, mediator or selection variable can have different implications for adjustment. Neither a large aggregate sample nor stratification by an arbitrary variable alone resolves those causal choices.",
		qualification: "Association reversal is mathematical; causal interpretation requires justified grouping and a specified estimand.",
		tags: ["Simpson paradox aggregation reversal", "group mix conditional marginal", "weighted rates"],
		sources: ["simpson", "simpsonFormal", "conditionalFormal"]
	},
	{
		key: "points",
		id: "4777d470-e559-4eab-9de2-8253b093a004",
		title: "Is a percentage-point increase the same as a percent increase?",
		slug: "is-a-percentage-point-increase-the-same-as-a-percent-increase",
		bottomLine: "No. Percentage points subtract two percentages; percent change compares the difference with the starting value. A hypothetical rise from 40% to 50% is 10 percentage points but a 25% relative increase. Both can describe the same change, provided the baseline, population and measured quantity are stated. The two numbers are not interchangeable.",
		stableCore: ["A percentage expresses a proportion per hundred. Subtracting proportions on that scale measures an absolute difference. Dividing the difference by the starting proportion instead measures a change relative to that baseline, so the operations answer different questions.", "A relative increase can sound large when the starting percentage is small. At a zero baseline the usual relative percent-change formula is undefined, even though a percentage-point difference can still be calculated. Undefined does not mean no change occurred."],
		editorSummary: "When reading a claim that a rate rose by ten percent, ask whether the author means ten percentage points or a tenth of the old rate. Check whether the denominator population stayed comparable and whether the two observations use the same definition. A correctly computed difference does not establish a cause, statistical precision or practical importance. The example is a constructed arithmetic case, not a current poll, health outcome, financial forecast or measured consensus fraction.",
		qualification: "Comparable proportions and an explicit baseline are needed; relative change from zero is undefined.",
		tags: ["percentage points percent increase difference", "40 50 percent baseline", "absolute relative change"],
		sources: ["points", "change"]
	},
	{
		key: "reverse",
		id: "4777d470-e559-4eab-9de2-8253b093a005",
		title: "Does an equal percent increase and decrease return a value to its starting point?",
		slug: "does-an-equal-percent-increase-and-decrease-return-a-value-to-its-starting-point",
		bottomLine: "No for ordinary sequential percentage changes applied to the current positive value. A 20% increase followed by a 20% decrease takes a hypothetical 100 units to 120 and then 96. The decrease uses the larger intermediate baseline. Equal percentage-point changes or changes calculated against a fixed original baseline are different operations.",
		stableCore: ["Multiplying by 1 plus a fractional increase and then by 1 minus the same fraction gives one minus that fraction squared. For a nonzero fraction below one, this multiplier is below one. Reversing the order gives the same product in this simple arithmetic model.", "To undo a 20% rise from 100 to 120 requires a 20-unit decrease, which is one sixth of 120, approximately 16.7%. The different reversal percentage reflects the changed denominator rather than a failure of subtraction."],
		editorSummary: "State whether a percentage is measured relative to the current amount or the original amount before combining changes. A chart that reports separate relative changes can be correct while their simple cancellation is wrong. This review does not model prices, fees, losses or returns, and gives no financial decision advice. It is a baseline check for any compatible positive quantity. Negative values, a zero baseline and changes in the meaning of the measured quantity need separate interpretation rather than this illustration.",
		qualification: "Sequential current-value changes of a positive compatible quantity are the scope, not every percentage convention.",
		tags: ["percent increase decrease cancel", "20 percent up down", "changed baseline"],
		sources: ["change", "points"]
	},
	{
		key: "compound",
		id: "4777d470-e559-4eab-9de2-8253b093a006",
		title: "Can successive percent changes be added to get the total change?",
		slug: "can-successive-percentage-changes-be-added-to-get-the-total-change",
		bottomLine: "Not exactly when each percentage is relative to the preceding value. Successive change factors multiply. A hypothetical 10% rise followed by a 20% rise turns 100 units into 110 and then 132, a total rise of 32%, not 30%. Adding small changes can be an approximation, but it is not an exact general identity.",
		stableCore: ["The first increase changes the baseline for the second. For two fractional changes, the total fractional change contains their sum and their product. The product is the term that simple addition omits; it can matter when changes are large or repeated.", "An arithmetic average of period changes is also not automatically the rate that reproduces the observed beginning-to-end ratio. A fixed-baseline difference, an average level over an interval and a sequence of relative changes are distinct summaries."],
		editorSummary: "Reconstruct compatible beginning and ending values before interpreting a multi-period headline. Check period boundaries and whether the measurement definition or reference scale changed. The BLS page supplies the percentage arithmetic principle, not evidence for an outcome in an unrelated field. This review's numbers are independently constructed and do not predict economic growth, investment performance or any real trend. Small-change approximation may be convenient, but its neglected term should not quietly become an exact claim.",
		qualification: "Period definitions and relative-change baselines must be compatible; approximation error accumulates.",
		tags: ["successive percent changes add compound", "10 20 percent 32", "multiplicative change"],
		sources: ["change", "points"]
	},
	{
		key: "conditional",
		id: "4777d470-e559-4eab-9de2-8253b093a007",
		title: "Can a conditional probability be reversed without changing its value?",
		slug: "can-a-conditional-probability-be-reversed-without-changing-its-value",
		bottomLine: "Not generally. The probability of A given B and the probability of B given A use different denominators. Even though their numerator describes the same intersection, the conditioning populations can have different sizes or probabilities. Equal values require additional conditions. A conditional statement must identify both the event of interest and what is already assumed.",
		stableCore: ["In an invented collection of 100 cards, 20 are square, 50 are blue and 10 are both. Half of the square cards are blue, but only one fifth of the blue cards are square. The intersection count is the same; the denominator changes from 20 to 50.", "The elementary conditional formula divides the intersection probability by the probability of the conditioning event. A zero conditioning probability cannot be handled by ordinary division; more general conditional models require additional definitions."],
		editorSummary: "Read the phrase given as a restriction of the reference set rather than as interchangeable wording. A headline about the characteristics of successful cases is not automatically the success probability among cases with those characteristics. The card table is a hypothetical counting demonstration, not a diagnostic dataset or model of people. Check actual base rates and sampling conditions before transporting a conditional number to another population. Reversing an arrow in prose does not reverse a probability calculation for free.",
		qualification: "The elementary conditional denominator must be positive; population composition and sampling determine actual numbers.",
		tags: ["conditional probability reverse given", "base rate denominator", "P A given B"],
		sources: ["conditional", "conditionalFormal"]
	},
	{
		key: "exclusive",
		id: "4777d470-e559-4eab-9de2-8253b093a008",
		title: "Are mutually exclusive events the same as independent events?",
		slug: "are-mutually-exclusive-events-the-same-as-independent-events",
		bottomLine: "No. Mutually exclusive events cannot occur together; independent events satisfy a probability factorization. Two mutually exclusive events that both have positive probability are not independent: learning that one occurred makes the other impossible. Zero-probability edge cases need care. Words such as separate or unrelated do not establish either mathematical property.",
		stableCore: ["Suppose an invented single-label draw has positive chances for a red label and a green label. The same draw cannot have both labels under this definition, so the intersection probability is zero. The product of the two positive chances is not zero, which rules out independence.", "Independent events can overlap. In a model of two independently randomized draws, a red result on the first and a red result on the second can both occur. The event definition and joint probability, not the similarity of their names, establish the distinction."],
		editorSummary: "Ask whether the statement means that outcomes cannot coexist or that knowing one does not change the other's probability. The first is a set relationship; the second is a probabilistic relationship. A process described as two stages is not automatically independent, and a probability-zero intersection is not automatically proof that the event sets are disjoint. For positive-probability disjoint events, however, the contradiction with the independence product is decisive. No actual randomization apparatus was independently tested here.",
		qualification: "Positive event probabilities are needed for the disjointness counterargument; factorization handles null-event cases.",
		tags: ["mutually exclusive independent events", "disjoint positive probability", "intersection factorization"],
		sources: ["independence", "independentEvents", "events"]
	},
	{
		key: "overlap",
		id: "4777d470-e559-4eab-9de2-8253b093a009",
		title: "Can the probabilities of overlapping events simply be added?",
		slug: "can-the-probabilities-of-overlapping-events-simply-be-added",
		bottomLine: "Not to calculate the probability that at least one occurs. Add the two event probabilities and subtract their intersection probability, which otherwise gets counted twice. Simple addition works for disjoint events. Independence is not the same as disjointness, so independent events can still require the overlap correction.",
		stableCore: ["In a hypothetical set of 100 equally likely records, 40 have label A, 30 have label B and 10 have both. There are 60 records with at least one label, not 70. Counting the intersection once reconstructs the union correctly.", "For two independent events, the intersection is the product of their probabilities. If each has probability one half, their union has probability three quarters, not one. For dependent events, the intersection needs evidence or a specified joint model."],
		editorSummary: "Define whether or means at least one or exactly one; these are not the same event when overlap is possible. A survey with multiple responses often produces overlapping categories, so adding their percentages may count respondents repeatedly. A sum above 100% is not necessarily a broken survey, but it is not a valid probability for the union. This review establishes the counting identity and keeps its denominators fixed; it does not estimate overlap in any actual survey or assume that all named outcomes are independent.",
		qualification: "The union uses a common reference population and known intersection; exactly-one wording requires a different calculation.",
		tags: ["overlapping events add probabilities union", "double counting intersection", "at least one"],
		sources: ["events", "conditionalFormal", "independence"]
	},
	{
		key: "replacement",
		id: "4777d470-e559-4eab-9de2-8253b093a010",
		title: "Does random sampling without replacement make successive draws independent?",
		slug: "does-random-sampling-without-replacement-make-successive-draws-independent",
		bottomLine: "Not generally. Removing a selected item changes the composition of a finite pool and therefore can change later conditional probabilities. Randomness does not by itself imply independence. With a large pool and a small sampling fraction, an independent-draw approximation may be useful, but it is still an approximation with conditions.",
		stableCore: ["In a hypothetical pool containing four marked and six unmarked items, the first draw has marked probability 4/10. After a marked item is removed, the next has probability 3/9; after an unmarked item is removed, it has probability 4/9. The first result changes the next probability.", "Replacement restores composition, but independent repeated sampling also requires the stated randomization mechanism. Simply returning an object does not prove the mechanism is unbiased or that all stages ignore previous outcomes. Degenerate pools with one category are special cases."],
		editorSummary: "Identify the finite pool and whether selected items remain eligible. A report saying random sample should still explain the design before using formulas for independent trials. Without-replacement counts are commonly modeled differently from fixed-probability independent counts. The example is a constructed pool, not a material inspection procedure. The review does not specify an acceptable approximation error for an unspecified application or claim that every sampling fraction below a chosen cutoff guarantees adequate precision.",
		qualification: "Finite composition, category variation and randomization design matter; an approximation is not exact factorization.",
		tags: ["sampling without replacement independence", "finite pool conditional probability", "binomial approximation"],
		sources: ["sampling", "independence"]
	},
	{
		key: "zero",
		id: "4777d470-e559-4eab-9de2-8253b093a011",
		title: "Does probability zero always mean an outcome is impossible?",
		slug: "does-probability-zero-always-mean-an-outcome-is-impossible",
		bottomLine: "No in general probability models. An exact point in a distribution with an ordinary continuous density has probability zero even when that point belongs to its support. An impossible event is empty; a nonempty event can have probability zero. This distinction is mathematical and does not assign exact zero chances to unmodeled real-world hazards.",
		stableCore: ["For a hypothetical uniform draw over the interval from 2 to 3 units, any pre-specified exact point has probability zero, yet the draw lies somewhere in that interval. An interval of positive length within the support can have positive probability even though each exact point has zero mass.", "Countable additivity does not authorize adding probabilities over an uncountable set of points as if it were a finite list. Probability one similarly need not mean every outcome outside the event is absent from the sample space."],
		editorSummary: "Distinguish an exact theoretical value from a rounded recorded measurement. A display reading 2.40 can represent a range that has positive probability, not an infinitely precise singleton. In a discrete finite model with positive mass for every supported outcome, the familiar zero-means-impossible interpretation can hold, but it does not extend unchanged to continuous models. No measurement precision, safety guarantee or real event frequency is inferred from the invented interval.",
		qualification: "Model support, event definition and recorded measurement resolution are essential; zero probability is not a universal safety judgment.",
		tags: ["zero probability impossible continuous outcome", "exact point singleton", "rounded interval"],
		sources: ["density", "uniform"]
	},
	{
		key: "density",
		id: "4777d470-e559-4eab-9de2-8253b093a012",
		title: "Is a probability density above one an invalid probability?",
		slug: "is-a-probability-density-above-one-an-invalid-probability",
		bottomLine: "No. A density height is not a probability. For an ordinary continuous density, probabilities are areas over intervals, and the total area must be one. A sufficiently narrow distribution can have density heights above one while all event probabilities remain between zero and one. Density units are reciprocal to the variable's units.",
		stableCore: ["A hypothetical uniform variable from 0 to 0.25 meters has density 4 per meter on that interval. Its full area is 4 times 0.25, or one. The first 0.10 meters have probability 0.40, not four. The height alone never supplies that interval probability.", "Expressing the same length in centimeters changes the numerical density height to 0.04 per centimeter. The probability of the corresponding interval remains the same. Comparing density heights without their units can therefore invent a contradiction."],
		editorSummary: "Read the vertical axis of a graph before interpreting a bar or curve. A count histogram, relative-frequency histogram and density histogram use different scales. With unequal-width bins, bar area rather than height alone represents relative mass in a density display. This review does not assume every random variable has an ordinary density: discrete and mixed distributions require the appropriate representation. The numerical interval is an original hypothetical demonstration, not a measured distribution or a likelihood-based conclusion about an individual observation.",
		qualification: "Nonnegative normalized density, interval width and measurement units are required; height is not event mass.",
		tags: ["probability density above one", "density height area units", "PDF not probability"],
		sources: ["uniform", "density", "histogram"]
	},
	{
		key: "expected",
		id: "4777d470-e559-4eab-9de2-8253b093a013",
		title: "Must an expected value be a possible individual outcome?",
		slug: "must-an-expected-value-be-a-possible-individual-outcome",
		bottomLine: "No. A finite expected value is a probability-weighted mean, not necessarily a supported outcome, a mode or a guarantee for one observation. A hypothetical quantity that is zero or four with equal probability has expectation two, although it never takes the value two. Some distributions have no finite expected value at all.",
		stableCore: ["The expectation combines each possible value with its probability. For the two-outcome example, zero times one half plus four times one half equals two. This calculation does not add a third possible outcome to the model.", "Long-run sample averages can approach an expectation under suitable laws of large numbers without requiring each observation to equal it. A prediction of an individual outcome and a mean over repeated cases answer different questions; the outcome distribution remains important."],
		editorSummary: "When a report says expected amount, ask whether it means a modeled mean, a likely outcome or an informal forecast. Those meanings need not agree. A mean alone can hide substantial variability, skewness or rare large outcomes, and its existence needs the relevant integrability conditions. This review makes no gambling, investment or personal forecast recommendation. Its numerical example is invented to separate a weighted summary from the list of possible realized values.",
		qualification: "A finite defined expectation and a specified distribution are needed; the mean does not certify an individual outcome.",
		tags: ["expected value possible outcome", "mean mode weighted probability", "expectation two outcomes"],
		sources: ["expectation", "expectedValue"]
	},
	{
		key: "catchup",
		id: "4777d470-e559-4eab-9de2-8253b093a014",
		title: "Does the law of large numbers make the next independent outcome compensate for a streak?",
		slug: "does-the-law-of-large-numbers-make-the-next-independent-outcome-compensate-for-a-streak",
		bottomLine: "No. Under the stipulated independent fixed-probability model, previous results do not change the next trial's probability. A law of large numbers describes convergence of averages under stated conditions, not a compensating force or a deadline. A streak can become a smaller fraction of a longer history without the next result being obliged to reverse it.",
		stableCore: ["If a hypothetical independently randomized binary process has success probability 0.4 on every trial, the next probability remains 0.4 after any finite specified history with positive probability. Independence, not a prediction that the record will look balanced immediately, establishes this statement.", "Convergence need not proceed monotonically, and an early count deficit need not disappear in absolute terms. The proportion can approach its limiting value while the difference between an observed count and its expected count fluctuates or grows."],
		editorSummary: "Separate an assumed process from uncertainty about whether that assumption is true. An unexpectedly long streak may motivate checking the apparatus or model; learning about an unknown probability is different from a known independent process having to catch up. This review explains the gambler's fallacy without providing betting advice. It does not claim every dependent sequence has a law of large numbers or that every distribution has a finite mean. The next-step answer is conditional on the specified independence and constant probability.",
		qualification: "Independent fixed-probability trials are the scope; model learning, dependence and theorem conditions are separate questions.",
		tags: ["law large numbers streak catch up", "gambler fallacy independent trials", "next probability"],
		sources: ["largeNumbers", "independence", "independentEvents"]
	},
	{
		key: "correlation",
		id: "4777d470-e559-4eab-9de2-8253b093a015",
		title: "Does zero Pearson correlation prove that two variables are independent?",
		slug: "does-zero-pearson-correlation-prove-that-two-variables-are-independent",
		bottomLine: "No. A defined zero Pearson correlation rules out the particular linear covariance signal, not every form of dependence. With appropriate finite moments, independence implies zero covariance, but the converse fails. A nonlinear relationship can have zero correlation. Special distributional results require their own assumptions and are not inferred from a scatterplot alone.",
		stableCore: ["For an invented equally likely variable taking -2, 0 and 2, let a second variable be its square. The second value is completely determined by the first, yet their covariance and Pearson correlation are zero: symmetry cancels the signed cross-products, and both variances are positive.", "Population correlation and a finite-sample estimate are different quantities. A small observed estimate is not proof that the population correlation is exactly zero. If a variance is zero or the needed moments do not exist, the usual Pearson coefficient may be undefined."],
		editorSummary: "Check nonlinear structure, measurement quality and the distinction between dependence and a causal effect. Zero correlation does not mean no predictive information, and nonzero correlation does not by itself identify causation. Joint normality can provide a special independence result, but separate normal-looking marginal distributions are not enough to assert joint normality. The algebraic example proves the failed converse without reusing source exercises or establishing how two actual measured variables behave.",
		qualification: "Defined finite moments, positive variances and population-versus-sample distinctions are necessary; joint normality is a special extra assumption.",
		tags: ["zero Pearson correlation independence nonlinear", "uncorrelated dependent", "square relationship"],
		sources: ["correlation", "independentVariables"]
	},
	{
		key: "variance",
		id: "4777d470-e559-4eab-9de2-8253b093a016",
		title: "Are variance and standard deviation interchangeable measures in the same units?",
		slug: "are-variance-and-standard-deviation-interchangeable-measures-in-the-same-units",
		bottomLine: "No. Standard deviation is the square root of variance. Variance uses squared measurement units, while standard deviation returns to the original units. Both describe spread around a mean, but their numerical scales and interpretations differ. Specify whether a calculation treats a full population or estimates population variation from a sample.",
		stableCore: ["For a hypothetical complete population of equally weighted lengths 1, 3 and 5 meters, the mean is 3, the population variance is 8/3 square meters, and the standard deviation is the square root of 8/3 meters. The same three values treated as a sample give a different conventional sample variance.", "Multiplying every measurement by a factor multiplies variance by its square and standard deviation by the factor's absolute value. Converting units therefore does not leave the numerical variance unchanged. Adding a constant shifts the mean but does not change these spread measures."],
		editorSummary: "Read error bars and table headings before comparing reported variation. A squared distance is not an ordinary distance, and a standard deviation is not automatically a standard error or confidence interval. Both measures can be sensitive to extreme observations, and some population distributions lack a finite variance. The invented list checks units and denominator conventions rather than validating a real dataset, measurement instrument or particular population model.",
		qualification: "Units, sample-versus-population convention and finite moments determine the interpretation; spread is not uncertainty in a mean.",
		tags: ["variance standard deviation units squared", "sample population denominator", "spread measure"],
		sources: ["scale", "expectation"]
	},
	{
		key: "error",
		id: "4777d470-e559-4eab-9de2-8253b093a017",
		title: "Does a small standard error mean individual observations vary very little?",
		slug: "does-a-small-standard-error-mean-individual-observations-vary-very-little",
		bottomLine: "No. Standard error describes the sampling variability of an estimator, whereas standard deviation can describe variability of individual observations. Under an independent identically distributed finite-variance model, a sample mean has standard error equal to the population standard deviation divided by the square root of sample size. A precisely estimated mean can coexist with widely varying individuals.",
		stableCore: ["For an invented population with standard deviation 12 units, a mean of 144 independent observations has standard error 1 unit. Increasing the sample size can reduce the mean's sampling variability without making the population's individual values less spread out.", "The simple formula is conditional on the sampling model. Clustering, serial dependence, unequal weights and sampling a substantial part of a finite population can require different variance calculations. An estimated standard error also depends on how the underlying variation is estimated."],
		editorSummary: "Ask what quantity an error bar belongs to: an individual value, a sample mean or another estimator. A small standard error is not proof of unbiased selection, accurate measurement or adequate adjustment for a causal question. Nor does it automatically define a confidence interval without a method and coverage assumptions. This review separates descriptive variation from repeated-sampling uncertainty; the numerical example is a stipulated model, not an analysis of visitor behavior or a clinical population.",
		qualification: "The estimator, sampling design and variance model must be specified; precision does not establish representativeness.",
		tags: ["standard error standard deviation individual variation", "SEM sample mean sqrt n", "precision spread"],
		sources: ["standardError", "sampleMeans", "scale"]
	},
	{
		key: "normal",
		id: "4777d470-e559-4eab-9de2-8253b093a018",
		title: "Does the 68–95–99.7 rule apply to every distribution?",
		slug: "does-the-68-95-997-rule-apply-to-every-distribution",
		bottomLine: "No. Those approximate percentages describe intervals one, two and three standard deviations from the mean of a normal distribution. They are not universal facts about all datasets. Skewness, heavy tails and multiple modes can produce different coverage, and a finite sample need not match theoretical percentages exactly even under a normal model.",
		stableCore: ["A hypothetical variable that is -1 or 1 with equal probability has mean zero and population standard deviation one. All its mass is within the inclusive one-standard-deviation interval, not approximately 68%. Having a mean and standard deviation does not make a distribution normal.", "A central limit theorem can concern the distribution of a suitably standardized sample average under stated conditions. It does not transform the original individual observations into a normal distribution or guarantee a good approximation at every finite sample size."],
		editorSummary: "Inspect the distribution and the quantity being modeled before converting a standard-deviation distance into a probability. A symmetric shape alone is not sufficient: a two-point distribution is symmetric but not normal. An approximately bell-shaped histogram is useful evidence to investigate, not proof of exact tails or guaranteed error rates. The source references define the normal model and its empirical-rule application, not a universal rule for real measurements. No biological experiment, diagnostic cutoff or safety threshold is proposed.",
		qualification: "Normal-model coverage is approximate when applied to data; original observations and sampling distributions must be distinguished.",
		tags: ["68 95 99.7 empirical rule normal distribution", "standard deviation coverage", "not every distribution"],
		sources: ["empirical", "normal", "scale"]
	},
	{
		key: "missing",
		id: "4777d470-e559-4eab-9de2-8253b093a019",
		title: "Can missing measurements be replaced by zero without changing the conclusion?",
		slug: "can-missing-measurements-be-replaced-by-zero-without-changing-the-conclusion",
		bottomLine: "Not generally. A missing value says a measurement is absent or not applicable; a measured zero is a substantive observation. Replacing every blank with zero asserts values that were not observed and can change totals, averages and associations. The appropriate treatment depends on what is missing, why it is missing and the target analysis.",
		stableCore: ["For a hypothetical record of 4, 8 and one absent value, the mean of the two observed values is 6. Coding the absent value as zero gives a three-value mean of 4. Neither calculation reveals the true three-value mean without additional information or assumptions.", "A codebook can distinguish not applicable, refusal, unknown and a genuine numeric zero. A special missing-data code is not a measurement in the variable's units. Importing such codes into ordinary arithmetic can create spurious results even without zero replacement."],
		editorSummary: "Keep the missingness indicator and document any exclusions or imputations. Simply deleting incomplete records can also bias a result, so the alternative is not a universal drop-all-blanks rule. An imputation supplies model-dependent estimates, not recovered observations, and sensitivity checks can be needed. The cited ONS codebook demonstrates real distinctions in a particular dated survey; its encodings and methods are not presented as current universal defaults. The invented arithmetic example does not identify a missingness mechanism in any actual data.",
		qualification: "Missingness mechanism, codebook meaning and target population require explicit assumptions; unknown is not observed zero.",
		tags: ["missing data blank zero imputation", "unknown not applicable", "missing measurement average"],
		sources: ["missing", "missingGlossary", "location"]
	},
	{
		key: "histogram",
		id: "4777d470-e559-4eab-9de2-8253b093a020",
		title: "Does changing histogram bin width leave the apparent distribution unchanged?",
		slug: "does-changing-histogram-bin-width-leave-the-apparent-distribution-unchanged",
		bottomLine: "No. Histogram appearance depends on bin widths and boundaries as well as the observations. Fine bins can expose irregularity or sampling noise; broad bins can hide structure. Changing the display does not change the raw values. A single histogram is an exploratory summary, not unique proof of the underlying population distribution.",
		stableCore: ["In an invented list containing 1, 2, 3, 7, 8 and 9 units, one bin from 0 to 10 holds all six values. Two bins split at 5 each hold three, while narrower bins can reveal the unobserved middle. These are different summaries of the same observations.", "Bin origins and endpoint conventions also affect assignments. Count, relative-frequency and density histograms have different vertical scales. With unequal-width density bins, compare areas rather than assuming equal bar heights mean equal probability or equal numbers of observations."],
		editorSummary: "Check the horizontal intervals, vertical label and sample size before interpreting a peak or gap. Compare reasonable alternative displays and inspect the underlying values when available instead of selecting the binning that makes a preferred story look inevitable. A sample gap is not proof that the population has no mass there. The toy list demonstrates display dependence only; it does not estimate a density, prescribe an optimal binning algorithm or certify a normality assumption for real data.",
		qualification: "Binning, normalization, endpoints and sample size affect appearance; a display is not a new dataset or distribution proof.",
		tags: ["histogram bin width appearance", "bins boundaries distribution", "count density area"],
		sources: ["histogram", "summaries", "density"]
	}
];

export const readerProbabilitySlugs = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerProbabilityClaims: SeedClaim[] = reviews.map(review => ({
	topicSlug: "consensus-foundations",
	title: review.title,
	slug: review.slug,
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 85,
	bottomLine: review.bottomLine,
	stableCore: review.stableCore,
	editorSummary: review.editorSummary,
	openQuestions: [`Which model, denominator or sampling conditions apply to an actual interpretation? ${review.qualification}`],
	whatWouldChangeMinds: [`A demonstrated failure of the stated identity, or evidence that its assumptions are not met, would require reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A correct mathematical identity does not validate an unspecified dataset, sampling design or causal conclusion."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "generalizability", detail: review.qualification }],
	searchDatabases: ["Original Penn State probability and statistical-reasoning lessons", "Original NIST statistical-method definitions", "Original StatLect definitions and theorem conditions", "Original Eurostat and BLS percentage definitions", "Original ONS codebook and UK Data Service missing-value definition", "Consensus.app targeted Simpson-reversal discovery; fetched record not used as original-paper evidence"],
	searchCutoffAt: probabilityCheckedAt,
	inclusionRules: ["Separate mathematical identities, model assumptions, descriptive summaries and empirical conclusions.", "Use independently constructed hypothetical examples, retaining denominators, units and source provenance."],
	exclusionRules: ["No copied textbook exercises, invented reader requests, expert votes, raw-data analyses or universal model applicability.", "No clinical, financial, gambling or biological-procedure recommendation."],
	appraisalTools: ["Structured definition, arithmetic and applicability check; no formal study risk-of-bias score", "Original reference and source-context check, not exhaustive correction or integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Penn State sections share course/institution provenance, NIST sections share a handbook and StatLect sections share an author. They are not independent experiments or an expert poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing. No actual reader demand, sample or raw research dataset was analyzed.",
	coiSummary: "Institutional and author-owned teaching sources establish definitions and scoped models, not clinical certification. Funding and conflicts across cited teaching records were not exhaustively audited; no commercial product or scientific vote is endorsed.",
	lastRetractionCheckAt: probabilityCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "Hypothetical arithmetic is not an observed effect size or real-world prevalence.", certainty: "moderate", limitations: [review.qualification, "Shared teaching-source provenance; no actual dataset validation or expert survey"] }],
	institutionalAnchors: [{ name: readerProbabilitySources[review.sources[0]!].publisher, role: "Method-defining reference, not formal consensus statement or expert approval" }],
	changeLog: [{ date: probabilityCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: review.id, date: probabilityCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Corrections and notices for cited original references"], guidelineMonitors: ["Original definitions and model-applicability revisions"], triggerRules: ["Reassess if a reference correction or applicable model assumptions change the conclusion."] },
	sources: review.sources.map((key, index) => {
		const entry = readerProbabilitySources[key];
		return { ...entry, order: index + 1, isAnchor: index === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: probabilityCheckedAt, statusSources: [entry.url!] };
	})
}));

export const readerProbabilityGaps = reviews.map(review => ({
	slug: review.slug,
	gap: `Adds the distinct question "${review.title}" with explicit arithmetic and model boundaries; existing significance, confidence-interval and correlation-causation reviews do not answer this proposition.`,
	relatedExistingSlugs: ["does-a-p-value-below-005-prove-a-claim-is-true", "can-correlation-alone-prove-causation"]
}));
