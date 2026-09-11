import type { ComparisonEstimate, EvidenceComparison } from "./types";

// Gardiner et al., supplementary Table S4, placebo contrasts only.
// Retain the table's precision. Do not subtract arm means or infer minute CIs
// from the reported standardized-effect intervals.
function finding(
	value: number,
	effect: number,
	lower: number,
	upper: number,
	pValue: string,
	clearReduction = false
): ComparisonEstimate {
	return {
		value,
		qualifier: "reported",
		sourceIds: ["gardiner-trial"],
		interpretation: clearReduction
			? "Evidence of less sleep in this trial"
			: "No clear difference; not proof of no effect",
		uncertainty: {
			metric: "Standardized effect (Cohen's d, not minutes)",
			estimate: effect,
			lower,
			upper,
			level: 95
		},
		pValue
	};
}

export const caffeineComparison: EvidenceComparison = {
	slug: "caffeine-dose-and-sleep",
	title: "Compare caffeine dose and sleep",
	description:
		"See how two caffeine doses affected sleep at three tested times. These trial averages are not a personal caffeine cutoff.",
	checkedAt: "2026-09-11",
	datasetLabel: "Gardiner et al., randomized crossover trial (online 2024; 2025 issue)",
	resultNote: "Averages are not personal predictions. Uncertain results remain uncertain, not zero.",
	protocolNote:
		"23 healthy men, ages 18–40, with habitual intake below 300 mg/day. Everyone also took their usual morning caffeine, averaging 112 mg. Each condition measured one night at home; the comparator replaced only the extra test dose with placebo.",
	measureNote:
		"Negative minutes mean less sleep than placebo. The uncertainty details report standardized effects and their adjusted 95% confidence intervals, not intervals in minutes. A p-value is not a probability that caffeine is safe, and these results are not a consensus percentage.",
	topics: ["sleep-and-circadian-health", "nutrition-and-diet", "sports-nutrition-and-supplements"],
	guidePath: "/guides/caffeine-tolerance-and-sleep",
	reviews: [
		{
			path: "/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use",
			label: "Caffeine tolerance and regular use"
		},
		{
			path: "/consensus/sleep-and-circadian-health/can-caffeine-consumed-six-hours-before-bedtime-still-disrupt-sleep",
			label: "Caffeine several hours before bed"
		},
		{
			path: "/consensus/sleep-and-circadian-health/does-delaying-morning-caffeine-prevent-an-afternoon-crash",
			label: "Does waiting 90 minutes after waking help?"
		}
	],
	outcomes: [
		{
			id: "total-sleep",
			label: "Total sleep time",
			unit: "minutes versus placebo",
			explanation: "Difference in the whole night's sleep, estimated by the study's statistical model."
		},
		{
			id: "deep-sleep",
			label: "Deep sleep (N3)",
			unit: "minutes versus placebo",
			explanation: "Difference in stage N3 sleep, not a separate score for recovery or long-term health."
		}
	],
	contexts: [
		{
			id: "four-hours",
			label: "4 hours before bed",
			explanation: "An extra test dose four hours before each participant's habitual bedtime.",
			supportsEstimates: true
		},
		{
			id: "eight-hours",
			label: "8 hours before bed",
			explanation: "An extra test dose eight hours before each participant's habitual bedtime.",
			supportsEstimates: true
		},
		{
			id: "twelve-hours",
			label: "12 hours before bed",
			explanation: "An extra test dose twelve hours before each participant's habitual bedtime.",
			supportsEstimates: true
		},
		{
			id: "other-populations",
			label: "Other populations or daily schedules",
			explanation:
				"This trial does not provide matched estimates for women, adolescents, older adults, people with sleep disorders, or caffeine spread across the day.",
			supportsEstimates: false
		}
	],
	options: [
		{
			id: "100-mg",
			label: "100 mg caffeine",
			scope: "One extra dose, alongside usual morning caffeine",
			estimates: {},
			estimatesByContext: {
				"four-hours": {
					"total-sleep": finding(-4.47, -0.03, -0.25, 0.19, "= 1.000"),
					"deep-sleep": finding(4.19, 0.07, -0.15, 0.29, "= 1.000")
				},
				"eight-hours": {
					"total-sleep": finding(-7.58, -0.05, -0.27, 0.17, "= 1.000"),
					"deep-sleep": finding(-8.39, -0.14, -0.36, 0.08, "= 0.374")
				},
				"twelve-hours": {
					"total-sleep": finding(-7.2, -0.05, -0.27, 0.17, "= 1.000"),
					"deep-sleep": finding(-0.59, -0.01, -0.23, 0.21, "= 1.000")
				}
			}
		},
		{
			id: "400-mg",
			label: "400 mg caffeine",
			scope: "One extra dose, alongside usual morning caffeine",
			estimates: {},
			estimatesByContext: {
				"four-hours": {
					"total-sleep": finding(-50.64, -0.36, -0.59, -0.14, "< 0.001", true),
					"deep-sleep": finding(-29.65, -0.5, -0.73, -0.27, "< 0.001", true)
				},
				"eight-hours": {
					"total-sleep": finding(-28.66, -0.21, -0.43, 0.02, "= 0.076"),
					"deep-sleep": finding(-15.29, -0.26, -0.48, -0.04, "= 0.016", true)
				},
				"twelve-hours": {
					"total-sleep": finding(-30.02, -0.22, -0.44, 0.01, "= 0.060"),
					"deep-sleep": finding(-20.63, -0.35, -0.57, -0.12, "= 0.001", true)
				}
			}
		}
	],
	limitations: [
		"Small, male-only sample; one night per condition and an at-home sleep device limit generalization.",
		"A result that crosses zero does not establish equivalence or a universally harmless dose.",
		"The two cards are each compared with placebo. Do not infer a head-to-head test from whether their intervals overlap.",
		"These are research conditions, not recommended doses. Other outcomes, sensitivity, health conditions, and medicines also matter."
	],
	sources: [
		{
			id: "gardiner-trial",
			title: "Gardiner et al.: Dose and timing effects of caffeine on subsequent sleep",
			url: "https://academic.oup.com/sleep/article/48/4/zsae230/7815486",
			locator: "Supplementary Table S4, placebo contrasts: TST and N3 (minutes)",
			note: "Publisher full text and supplementary tables checked. Protocol, comparator, estimates, intervals, and limitations were inspected; underlying participant data were not reanalyzed."
		}
	]
};
