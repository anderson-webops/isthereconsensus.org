import type { ReadingGuideContent } from "./types";

export const probabilityGuide: ReadingGuideContent = {
	takeaway:
		"A convincing number still needs a denominator, a defined quantity and an applicable model. Separate arithmetic identities from evidence that the assumptions describe the world.",
	scope: "Everyday interpretation of averages, percentages, probability and sampling uncertainty, source-checked October 5, 2026 UTC. Examples are independently constructed and hypothetical, not visitor data or observed study results. This is not clinical, financial or gambling guidance, a biological procedure or a claim of formal scientific endorsement; independent expert review has not been completed.",
	sections: [
		{
			id: "name-the-summary",
			title: "1. Ask which average answers the question",
			paragraphs: [
				{
					text: "Start by naming the quantity rather than accepting average as a complete definition. The arithmetic mean combines a total with a count; the median identifies a midpoint after ordering observations. For the invented list 2, 3, 4, 5 and 36, those summaries are 10 and 4. Neither calculation is wrong. They emphasize different properties, and neither tells you all the values that someone might encounter. A headline about a typical experience should make that choice visible.",
					sources: ["location", "summaries"]
				},
				{
					text: "Do not automatically delete a large observation just because it moves the mean. It may be valid information about the tail, or it may be an error requiring evidence. The choice of center should follow the purpose: a resource total per item and a middle-ranked item need not be the same target. Show the spread, the unit and relevant groups when one summary compresses materially different experiences. Population expectations also require mathematical existence, not merely a calculator that accepts a finite list.",
					sources: ["location", "expectation"]
				}
			]
		},
		{
			id: "follow-the-baseline",
			title: "2. Follow the baseline through percentages",
			paragraphs: [
				{
					text: "A proportion moving from 40% to 50% rises by ten percentage points and by 25% relative to its original value. The first number subtracts proportions on a per-hundred scale; the second divides the change by the baseline. Ask which operation a sentence means before deciding that two reported numbers conflict. Also check who or what is in each denominator. A change of population or outcome definition can spoil comparability even when both calculations are individually correct.",
					sources: ["points", "change"]
				},
				{
					text: "Equal percent increases and decreases do not usually cancel when each uses the current amount. A hypothetical quantity of 100 units rises by 20% to 120, then falls by 20% to 96. To reverse the rise requires a 20-unit decrease, about 16.7% of 120. That is denominator arithmetic, not evidence for any economic or personal outcome. Fixed-baseline percentages and percentage-point changes follow different conventions. A relative change starting from zero is undefined under the usual formula, not automatically zero.",
					sources: ["change", "points"]
				},
				{
					text: "Successive relative change factors multiply. A 10% increase followed by 20% gives a factor of 1.1 times 1.2, so the total increase is 32%, not 30%. Adding small changes may approximate that result, but the omitted product must not become an exact identity. Specify the period endpoints and whether the report concerns a beginning-to-end change or average levels within periods. These examples establish arithmetic; they do not supply predictions, observed growth rates or financial recommendations.",
					sources: ["change"]
				}
			]
		},
		{
			id: "keep-group-weights",
			title: "3. Keep group weights and causal questions separate",
			paragraphs: [
				{
					text: "Suppose two invented observations average 6 units and eight average 16. The individual-level pooled mean is 14, while the equally weighted average of the two group means is 11. Equal group weighting answers a different question rather than inevitably being a mistake. To combine means, check compatible definitions, nonoverlapping groups and the intended unit. Raw sample sizes may not be the appropriate weights for a complex survey. Group summaries also cannot recover a distribution or remove selection bias that their data already contain.",
					sources: ["summaries", "expectation"]
				},
				{
					text: "Group composition can reverse an association. In an invented task table, A completes 8/10 easy and 60/100 hard tasks, while B completes 70/100 easy and 5/10 hard tasks. A leads within both difficulty strata but trails overall: 68/110 versus 75/110. This illustrates Simpson's paradox through different group weights. It does not show which method is causally better or how common reversals are. Choosing an adjustment set requires the question and causal structure; always aggregate and always adjust are both inadequate rules.",
					sources: ["simpson", "simpson-formal", "conditional-formal"]
				}
			]
		},
		{
			id: "define-the-events",
			title: "4. Define the events before combining probabilities",
			paragraphs: [
				{
					text: "Given restricts the reference set. Of 100 hypothetical cards, let 20 be square, 50 blue and ten both. The blue fraction among square cards is one half; the square fraction among blue cards is one fifth. The shared intersection does not make the denominators equal. Reversing conditional wording therefore changes the question. The elementary conditional formula requires positive probability for the conditioning event; conditioning on an exact zero-probability event needs a more general definition, not ordinary division by zero.",
					sources: ["conditional", "conditional-formal"]
				},
				{
					text: "Mutually exclusive means the events cannot coexist. Independent means their intersection probability equals the product of their probabilities. Positive-probability disjoint events cannot satisfy that product identity, because their intersection is empty. Independent events can overlap, so adding their probabilities can still count the overlap twice. To find the chance of at least one, subtract the intersection after adding. Exactly one is a different event. A survey allowing several labels may legitimately have category percentages that sum above 100%, without their union exceeding one.",
					sources: ["events", "independence", "independent-events"]
				},
				{
					text: "Random sampling is not a synonym for independent sampling. In a hypothetical pool of four marked and six unmarked items, removing a marked first draw leaves a 3/9 marked chance next; removing an unmarked item leaves 4/9. Both differ from the initial 4/10. A small sampling fraction can support an approximation under specified conditions, not exact independence. Replacement restores pool composition but does not independently certify the randomization mechanism. State how draws are produced before importing fixed-probability independent-trial formulas.",
					sources: ["sampling", "independence"]
				}
			]
		},
		{
			id: "read-density-as-area",
			title: "5. Read continuous probabilities as areas, not heights",
			paragraphs: [
				{
					text: "In an ordinary continuous-density model, a pre-specified exact point can have probability zero while belonging to the support. A hypothetical uniform draw from 2 to 3 must land somewhere, although each exact point has zero probability. The empty event and a nonempty null event are different. Countable additivity does not justify summing over an uncountable interval as if it were a finite list. A rounded displayed value represents a range of possible exact values, which can have positive probability.",
					sources: ["density", "uniform"]
				},
				{
					text: "A density height can exceed one because height is not probability. For a hypothetical uniform length between zero and 0.25 meters, density is four per meter and full area is one. The first 0.10 meters have probability 0.40. Reexpressing the same variable in centimeters changes the density height to 0.04 per centimeter but preserves corresponding interval probabilities. Read units and interval width together. Discrete masses and mixed distributions require their own representation rather than assuming every variable has an ordinary continuous curve.",
					sources: ["uniform", "density", "histogram"]
				}
			]
		},
		{
			id: "spread-versus-precision",
			title: "6. Separate expected values, spread and estimator precision",
			paragraphs: [
				{
					text: "An expectation need not be a possible individual outcome. A quantity that is zero or four with equal probability has expected value two, without ever equaling two. That summary is not automatically a mode, an individual forecast or a promise. Variance and standard deviation describe another property: dispersion around a mean. Variance has squared units, while its square root returns to the measurement units. Check population-versus-sample conventions before comparing numbers, and remember that some probability models lack a finite mean or variance.",
					sources: ["expectation", "expected-value", "scale"]
				},
				{
					text: "Standard error belongs to an estimator's sampling distribution, not to the individual measurements. Under an independent identically distributed finite-variance model, a mean based on 144 observations from a population with standard deviation 12 units has standard error one unit. The individuals are not thereby less variable. Design, clustering, dependence and weights can change the calculation. Small standard error does not fix biased selection, systematic measurement error or the wrong causal question, and a confidence interval requires its own method and coverage assumptions.",
					sources: ["standard-error", "sample-means", "scale"]
				}
			]
		},
		{
			id: "retain-model-conditions",
			title: "7. Retain the conditions behind familiar shortcuts",
			paragraphs: [
				{
					text: "Zero Pearson correlation is not universal independence. An equally likely invented variable taking -2, zero and 2 has zero correlation with its square, yet the second value is fully determined by the first. Linear covariance can cancel while nonlinear information remains. Likewise, under independent fixed-probability trials a streak does not change the next probability. A law of large numbers concerns convergence under conditions, not obligatory catch-up, monotonic improvement or a deadline. Checking an uncertain process model is different from a known independent process having to compensate.",
					sources: ["correlation", "independent-variables", "large-numbers", "independence"]
				},
				{
					text: "The 68–95–99.7 rule describes approximate normal-model coverage, not every distribution with a mean and standard deviation. An equally likely variable at -1 and 1 has all its mass within the inclusive one-standard-deviation interval. It is symmetric but not normal. A central limit result can concern suitably standardized averages under stated conditions without making individual observations normal. A finite sample's histogram also need not match theoretical percentages exactly. Ask which distribution is being approximated and how well its assumptions fit the intended use.",
					sources: ["empirical", "normal", "sample-means"]
				}
			]
		},
		{
			id: "inspect-the-data-and-source",
			title: "8. Inspect missingness, displays and source provenance",
			paragraphs: [
				{
					text: "Unknown is not measured zero. For an invented record of 4, 8 and a blank, the observed-value mean is six; replacing the blank with zero gives four. Neither recovers the true three-value mean without assumptions. Codebooks can distinguish not applicable, refusal and an actual zero. Retain those meanings through import and analysis. Deleting incomplete cases is not universally unbiased either. Any imputation adds model-dependent values, so disclose the method and preserve the distinction between observed and supplied information.",
					sources: ["missing", "missing-glossary"]
				},
				{
					text: "A histogram groups observations; changing bin widths or origins changes appearance without changing the data. An invented list of 1, 2, 3, 7, 8 and 9 looks different in one wide bin than in narrow bins exposing its middle gap. Count, relative-frequency and density displays have different vertical scales. Unequal-width density bars encode mass through area. Inspect reasonable alternative displays, boundaries and sample size rather than choosing the one that makes a preferred narrative look inevitable. An observed gap is not proof of absent population probability.",
					sources: ["histogram", "summaries", "density"]
				},
				{
					text: "These references establish definitions and model conditions, not a tally of experts agreeing. Several Penn State lessons share institutional provenance, several NIST entries share a handbook and several StatLect pages share an author. Repeated citations are not independent experiments. Original reference checks and independently recomputed hypothetical arithmetic are distinct from validating a real dataset or conducting formal risk-of-bias appraisal. The dated ONS codebook is a scoped example, not a current universal encoding standard. A publication date, source-check date and independent expert review are separate records.",
					sources: ["missing", "independent-variables", "location"]
				}
			]
		}
	],
	questions: [
		"What is being counted, in what units and with which denominator?",
		"Is this a mean, median, probability, density or sampling uncertainty?",
		"Are groups weighted for the intended unit, and could their composition change the comparison?",
		"Which independence, distribution or measurement assumptions are actually supported?",
		"Are blanks, categories and chart bins preserving the original data meaning?",
		"Does the citation establish a definition or provide empirical evidence for this actual application?"
	],
	sources: [
		{
			id: "location",
			title: "NIST: Measures of Location",
			url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm",
			kind: "Technical reference",
			note: "Original center and tail-sensitivity definitions checked; a median is not always the best target, and some population means do not exist."
		},
		{
			id: "summaries",
			title: "Penn State STAT 100: Getting the Big Picture and Summaries",
			url: "https://online.stat.psu.edu/stat100/Lesson03",
			kind: "Technical reference",
			note: "Original mean, median and grouped-display explanations checked. Examples and exercises are not copied; teaching provenance is shared."
		},
		{
			id: "points",
			title: "Eurostat: Percentage point",
			url: "https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/42722.pdf",
			kind: "Technical reference",
			note: "Original percentage-point definition checked, not a current statistic, political share or estimate of scientific agreement."
		},
		{
			id: "change",
			title: "BLS: Calculating percent changes",
			url: "https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm",
			kind: "Technical reference",
			note: "Original baseline-relative arithmetic and successive-change warning checked. No source index values or economic forecasts imported."
		},
		{
			id: "expectation",
			title: "Penn State STAT 414: Mathematical Expectation",
			url: "https://online.stat.psu.edu/stat414/Lesson08",
			kind: "Technical reference",
			note: "Original weighted-mean and variance definitions checked. A finite expectation need not exist or be an attainable individual outcome."
		},
		{
			id: "simpson",
			title: "Penn State STAT 100: Relationships Between Categorical Variables",
			url: "https://online.stat.psu.edu/stat100/Lesson06",
			kind: "Technical reference",
			note: "Original aggregation reversal checked; historical political and clinical examples are not adopted as current evidence."
		},
		{
			id: "simpson-formal",
			title: "Penn State STAT 504: Three-Way Tables",
			url: "https://online.stat.psu.edu/stat504/Lesson05",
			kind: "Technical reference",
			note: "Original marginal/conditional association distinction checked. Reversal alone does not identify a causally appropriate adjustment."
		},
		{
			id: "conditional-formal",
			title: "StatLect: Conditional probability",
			url: "https://www.statlect.com/fundamentals-of-probability/conditional-probability",
			kind: "Technical reference",
			note: "Marco Taboga's original conditional and total-probability definitions checked; ordinary zero-denominator division is not permitted."
		},
		{
			id: "conditional",
			title: "Penn State STAT 414: Conditional Probability",
			url: "https://online.stat.psu.edu/stat414/Lesson04",
			kind: "Technical reference",
			note: "Original event restriction and denominator definitions checked. Clinical exercises and historical diagnostic numbers are not reproduced."
		},
		{
			id: "events",
			title: "Penn State STAT 414: Properties of Probability",
			url: "https://online.stat.psu.edu/stat414/Lesson02",
			kind: "Technical reference",
			note: "Original union, intersection and addition rule checked. At least one and exactly one are different events when overlap exists."
		},
		{
			id: "independence",
			title: "Penn State STAT 414: Independent Events",
			url: "https://online.stat.psu.edu/stat414/Lesson05",
			kind: "Technical reference",
			note: "Original independence definitions checked. Independent trials are assumptions to justify, not a synonym for randomized sampling."
		},
		{
			id: "independent-events",
			title: "StatLect: Independent events",
			url: "https://www.statlect.com/fundamentals-of-probability/independent-events",
			kind: "Technical reference",
			note: "Original factorization and null-event distinctions checked; author provenance is shared with other StatLect citations."
		},
		{
			id: "sampling",
			title: "Penn State STAT 414: The Binomial Distribution",
			url: "https://online.stat.psu.edu/stat414/Lesson10",
			kind: "Technical reference",
			note: "Original independent-trial conditions and finite-pool qualification checked; approximate binomial behavior is not exact independence."
		},
		{
			id: "density",
			title: "Penn State STAT 414: Continuous Random Variables",
			url: "https://online.stat.psu.edu/stat414/Lesson14",
			kind: "Technical reference",
			note: "Original interval-area and density definitions checked. Exact points, rounded intervals and mixed distributions remain distinct."
		},
		{
			id: "uniform",
			title: "NIST: Uniform Distribution",
			url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm",
			kind: "Technical reference",
			note: "Original density and finite interval support checked. Numerical examples are invented; no actual length distribution was fitted."
		},
		{
			id: "histogram",
			title: "NIST: Histogram",
			url: "https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm",
			kind: "Technical reference",
			note: "Original count and density normalization checked; grouping choices are not unique proof of an underlying distribution."
		},
		{
			id: "expected-value",
			title: "StatLect: Expected value",
			url: "https://www.statlect.com/fundamentals-of-probability/expected-value",
			kind: "Technical reference",
			note: "Original probability-weighted mean and integrability conditions checked; no source gambling example or recommendation reproduced."
		},
		{
			id: "scale",
			title: "NIST: Measures of Scale",
			url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm",
			kind: "Technical reference",
			note: "Original variance, standard deviation and tail-sensitivity definitions checked, retaining sample/population and unit distinctions."
		},
		{
			id: "standard-error",
			title: "Penn State STAT 100: Diversity of Samples",
			url: "https://online.stat.psu.edu/stat100/Lesson08",
			kind: "Technical reference",
			note: "Original individual-versus-average sampling variation checked; a small standard error does not certify representativeness."
		},
		{
			id: "sample-means",
			title: "Penn State STAT 414: Several Independent Random Variables",
			url: "https://online.stat.psu.edu/stat414/Lesson24",
			kind: "Technical reference",
			note: "Original mean/variance of independent averages checked. Dependence, finite-population designs and weights need their own analysis."
		},
		{
			id: "correlation",
			title: "Penn State STAT 414: The Correlation Coefficient",
			url: "https://online.stat.psu.edu/stat414/Lesson18",
			kind: "Technical reference",
			note: "Original failed converse from zero correlation to independence checked; finite moments and positive variances are required."
		},
		{
			id: "independent-variables",
			title: "StatLect: Independent random variables",
			url: "https://www.statlect.com/fundamentals-of-probability/independent-random-variables",
			kind: "Technical reference",
			note: "Original distributional independence and zero-covariance distinction checked. No actual raw research dataset was analyzed."
		},
		{
			id: "large-numbers",
			title: "StatLect: Law of Large Numbers",
			url: "https://www.statlect.com/asymptotic-theory/law-of-large-numbers",
			kind: "Technical reference",
			note: "Original sufficient conditions and convergence distinctions checked. No monotonic catch-up, fixed deadline or betting advice inferred."
		},
		{
			id: "empirical",
			title: "Penn State STAT 100: Bell-Shaped Curves",
			url: "https://online.stat.psu.edu/stat100/Lesson04",
			kind: "Technical reference",
			note: "Original approximately normal empirical-rule condition checked. General teaching shortcuts are not made universal for all data."
		},
		{
			id: "normal",
			title: "NIST: Normal Distribution",
			url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3661.htm",
			kind: "Technical reference",
			note: "Original normal density and assumption warning checked; central-limit statements retain conditions rather than promising every sample is normal."
		},
		{
			id: "missing",
			title: "ONS: Labour Force Survey user guidance, Volume 10",
			url: "https://www.ons.gov.uk/file?uri=/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/methodologies/labourforcesurveyuserguidance/volume10.pdf",
			kind: "Technical reference",
			note: "Original missing-code distinctions at PDF pages 12, 17 and 43 checked. Dated survey example, not universal encoding or current policy."
		},
		{
			id: "missing-glossary",
			title: "UK Data Service: Missing value",
			url: "https://ukdataservice.ac.uk/glossary/",
			kind: "Technical reference",
			note: "Original missing-value subsection checked; broad deletion/imputation advice is not adopted as a universally unbiased procedure."
		}
	]
};
