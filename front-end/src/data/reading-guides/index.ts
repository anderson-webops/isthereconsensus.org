import type { ReadingGuideSummary } from "./types";

// Keep discovery metadata separate from article bodies: every claim page may
// show a guide link, but should not download the entire reading library.
export const readingGuides: ReadingGuideSummary[] = [
	{
		slug: "household-water-treatment",
		title: "Water treatment: match the method to the contaminant",
		summary:
			"Understand filter certification, boiling and UV limits, hardness control, and the water-use trade-offs of reverse osmosis.",
		checkedAt: "2026-09-12",
		topics: ["climate-and-environment", "health-and-medicine"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/does-boiling-water-remove-fuel-and-toxic-chemicals",
				label: "Boiling and chemical contamination"
			},
			{
				path: "/consensus/climate-and-environment/does-water-filter-certification-mean-it-removes-every-contaminant",
				label: "Contaminant-specific certification"
			},
			{
				path: "/consensus/climate-and-environment/does-ultraviolet-water-disinfection-also-remove-lead-nitrate-and-pfas",
				label: "UV and chemical-removal limits"
			},
			{
				path: "/consensus/climate-and-environment/do-reverse-osmosis-systems-all-use-the-same-amount-of-reject-water",
				label: "RO water use and efficiency"
			},
			{
				path: "/consensus/climate-and-environment/does-softening-hard-water-make-it-microbiologically-safe",
				label: "Softening is not disinfection"
			}
		]
	},
	{
		slug: "exercise-and-blood-pressure",
		title: "Exercise and blood pressure: beyond the rankings",
		summary:
			"Understand resting versus 24-hour pressure, uncertain exercise rankings, modeled doses and the timing of readings.",
		checkedAt: "2026-09-12",
		topics: ["exercise-and-sports-science", "cardiovascular-metabolic-and-kidney-health"],
		reviews: [
			{
				path: "/consensus/exercise-and-sports-science/do-exercise-programs-lower-resting-blood-pressure-in-middle-aged-and-older-adults",
				label: "Training and resting pressure"
			},
			{
				path: "/consensus/exercise-and-sports-science/are-isometric-exercises-clearly-best-for-lowering-blood-pressure",
				label: "Isometric exercise ranking claims"
			},
			{
				path: "/consensus/exercise-and-sports-science/does-lower-clinic-blood-pressure-after-exercise-imply-lower-24-hour-pressure",
				label: "Clinic versus 24-hour results"
			},
			{
				path: "/consensus/exercise-and-sports-science/does-research-identify-one-optimal-exercise-dose-for-lowering-blood-pressure",
				label: "Dose-response model limits"
			},
			{
				path: "/consensus/exercise-and-sports-science/can-post-exercise-readings-establish-long-term-blood-pressure-control",
				label: "Measurement timing"
			},
			{
				path: "/consensus/cardiovascular-metabolic-and-kidney-health/does-home-blood-pressure-monitoring-help-control-hypertension",
				label: "Home monitoring linked to care"
			}
		]
	},
	{
		slug: "choosing-air-cleaning",
		title: "Air cleaning: match the device to the problem",
		summary:
			"Understand particle ratings, DIY designs, gas-removal limits and whole-system operation before comparing air cleaners.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "health-and-medicine"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/does-a-high-efficiency-filter-rating-guarantee-clean-air-throughout-a-room",
				label: "Filter efficiency versus room cleaning"
			},
			{
				path: "/consensus/climate-and-environment/can-diy-box-fan-air-cleaners-match-commercial-particle-cleaners",
				label: "DIY and commercial particle cleaners"
			},
			{
				path: "/consensus/climate-and-environment/do-hepa-air-cleaners-remove-gases-and-carbon-monoxide",
				label: "Particles, gases and carbon monoxide"
			},
			{
				path: "/consensus/climate-and-environment/are-ozone-generators-safe-and-effective-air-cleaners-for-occupied-homes",
				label: "Ozone in occupied spaces"
			},
			{
				path: "/consensus/climate-and-environment/does-a-higher-merv-filter-automatically-improve-whole-home-air-cleaning",
				label: "MERV and whole-system operation"
			}
		]
	},
	{
		slug: "caffeine-tolerance-and-sleep",
		title: "Caffeine: tolerance, performance, and the sleep trade-off",
		summary:
			"Why coffee can feel less effective, which benefits can persist, and why sleep changes the calculation.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "sports-nutrition-and-supplements", "sleep-and-circadian-health"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use",
				label: "Does caffeine become less effective with daily use?"
			},
			{
				path: "/consensus/sports-nutrition-and-supplements/does-caffeine-improve-exercise-performance-in-habitual-caffeine-users",
				label: "Exercise performance in habitual caffeine users"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-caffeine-consumed-six-hours-before-bedtime-still-disrupt-sleep",
				label: "Caffeine before bedtime and sleep disruption"
			}
		]
	},
	{
		slug: "making-sense-of-supplements",
		title: "Supplements: useful for what, and for whom?",
		summary:
			"Separate correcting a deficiency, improving a specific outcome, and unsupported promises of better health.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "sports-nutrition-and-supplements"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/are-dietary-supplements-fda-approved-like-drugs",
				label: "Are supplements FDA-approved like drugs?"
			},
			{
				path: "/consensus/nutrition-and-diet/does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe",
				label: "Creatine, strength training, and safety"
			},
			{
				path: "/consensus/nutrition-and-diet/do-vitamin-e-or-beta-carotene-supplements-prevent-heart-disease-or-cancer",
				label: "Vitamin E, beta carotene, and disease prevention"
			}
		]
	},
	{
		slug: "comparing-electricity-options",
		title: "Energy choices: compare the whole system",
		summary:
			"Read claims about nuclear, wind, solar, and fossil fuels using consistent boundaries for emissions, health, and reliability.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "energy-and-infrastructure"],
		reviews: [
			{
				path: "/consensus/energy-and-infrastructure/do-lower-heat-pump-energy-bills-guarantee-lower-total-cost",
				label: "Heat-pump bills versus lifetime costs"
			},
			{
				path: "/consensus/energy-and-infrastructure/do-heat-pump-efficiency-ratings-predict-a-homes-seasonal-performance",
				label: "Heat-pump ratings and measurement boundaries"
			},
			{
				path: "/consensus/climate-and-environment/is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
				label: "Nuclear power and fossil-fuel health risks"
			},
			{
				path: "/consensus/climate-and-environment/do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
				label: "Lifecycle emissions of wind, solar, and fossil fuels"
			},
			{
				path: "/consensus/climate-and-environment/is-recent-global-warming-mainly-caused-by-human-activity",
				label: "Why reducing greenhouse-gas emissions matters"
			}
		]
	},
	{
		slug: "sleep-and-insomnia",
		title: "Sleep: enough rest, better quality, and effective insomnia care",
		summary:
			"Distinguish sleep opportunity, symptoms, and structured treatment, including what the evidence says about CBT-I.",
		checkedAt: "2026-09-11",
		topics: ["sleep-and-circadian-health", "neuroscience-and-psychology"],
		reviews: [
			{
				path: "/consensus/sleep-and-circadian-health/do-most-healthy-adults-need-at-least-seven-hours-of-sleep",
				label: "How much sleep do most adults need?"
			},
			{
				path: "/consensus/sleep-and-circadian-health/is-sleep-hygiene-alone-an-effective-treatment-for-chronic-insomnia",
				label: "Is sleep hygiene enough for chronic insomnia?"
			},
			{
				path: "/consensus/neuroscience-and-psychology/is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia",
				label: "CBT-I as an initial insomnia treatment"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-brief-behavioral-treatment-improve-chronic-insomnia",
				label: "What brief behavioral care can establish"
			},
			{
				path: "/consensus/sleep-and-circadian-health/does-fully-automated-digital-cbt-i-match-face-to-face-therapy",
				label: "Automated and face-to-face care are different comparisons"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-sleep-restriction-therapy-temporarily-increase-daytime-sleepiness",
				label: "Early sleepiness during treatment"
			},
			{
				path: "/consensus/sleep-and-circadian-health/should-habitual-loud-snoring-prompt-evaluation-for-sleep-apnea",
				label: "When loud snoring calls for assessment"
			}
		]
	},
	{
		slug: "exercise-without-magic-numbers",
		title: "Exercise: benefits without magic numbers",
		summary:
			"Understand activity targets, step-count evidence, and why the best comparison starts with the outcome and the person.",
		checkedAt: "2026-09-11",
		topics: ["exercise-and-sports-science"],
		reviews: [
			{
				path: "/consensus/exercise-and-sports-science/does-physical-activity-below-the-weekly-guideline-still-improve-health",
				label: "Benefits below the weekly activity target"
			},
			{
				path: "/consensus/exercise-and-sports-science/are-10000-daily-steps-necessary-for-health-benefits",
				label: "Are 10,000 daily steps necessary?"
			},
			{
				path: "/consensus/exercise-and-sports-science/must-weights-be-heavy-to-build-muscle",
				label: "Do weights have to be heavy to build muscle?"
			}
		]
	},
	{
		slug: "reading-vaccine-evidence",
		title: "Vaccines: benefits, harms, and what safety reports can tell us",
		summary:
			"Use MMR as a worked example for comparing outcomes, interpreting safety signals, and weighing causal evidence.",
		checkedAt: "2026-09-11",
		topics: ["health-and-medicine", "infection-immunity-and-vaccines"],
		reviews: [
			{
				path: "/consensus/health-and-medicine/is-the-mmr-vaccine-safe-and-highly-effective-at-preventing-measles",
				label: "MMR effectiveness and safety"
			},
			{
				path: "/consensus/health-and-medicine/does-the-mmr-vaccine-cause-autism",
				label: "MMR and the autism evidence"
			},
			{
				path: "/consensus/health-and-medicine/can-vaers-reports-prove-that-a-vaccine-caused-an-adverse-event",
				label: "What VAERS reports can and cannot establish"
			}
		]
	},
	{
		slug: "making-sense-of-nutrition",
		title: "Nutrition: patterns, substitutions, and meaningful outcomes",
		summary:
			"Read diet findings through the comparison tested, with examples from saturated fat, Mediterranean diets, and food processing.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "cardiovascular-metabolic-and-kidney-health"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/does-it-matter-what-replaces-saturated-fat",
				label: "Why the replacement for saturated fat matters"
			},
			{
				path: "/consensus/nutrition-and-diet/does-a-mediterranean-style-diet-reduce-cardiovascular-events-in-high-risk-adults",
				label: "Mediterranean diets and cardiovascular events"
			},
			{
				path: "/consensus/nutrition-and-diet/are-ultra-processed-foods-linked-to-worse-health-outcomes-and-how-much-is-causation-versus-confounding",
				label: "Ultra-processed foods: causation and confounding"
			}
		]
	},
	{
		slug: "understanding-climate-attribution",
		title: "Climate attribution: from global warming to individual events",
		summary:
			"Separate the cause of long-term warming from estimates of how climate change affects a particular event's probability or intensity.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "earth-and-geoscience"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/is-recent-global-warming-mainly-caused-by-human-activity",
				label: "Human influence on recent global warming"
			},
			{
				path: "/consensus/climate-and-environment/is-the-sun-causing-recent-global-warming",
				label: "Testing the Sun as an explanation"
			},
			{
				path: "/consensus/climate-and-environment/can-scientists-attribute-part-of-a-single-extreme-weather-event-to-climate-change",
				label: "Attributing individual extreme weather events"
			}
		]
	},
	{
		slug: "understanding-evolution",
		title: "Evolution: inherited change, branching ancestry, and the evidence",
		summary:
			"Connect selection, chance, shared ancestry, fossils, and observed antibiotic resistance without turning evolution into a ladder or a plan.",
		checkedAt: "2026-09-11",
		topics: ["biology-and-evolution", "human-origins-and-paleontology"],
		reviews: [
			{
				path: "/consensus/biology-and-evolution/is-evolution-just-a-theory",
				label: "What a scientific theory means"
			},
			{
				path: "/consensus/biology-and-evolution/did-humans-evolve-from-chimpanzees-living-today",
				label: "Humans, chimpanzees, and common ancestry"
			},
			{
				path: "/consensus/biology-and-evolution/is-antibiotic-resistance-an-example-of-evolution",
				label: "Antibiotic resistance as observable evolution"
			},
			{
				path: "/consensus/biology-and-evolution/is-evolution-entirely-random",
				label: "Selection and chance are different mechanisms"
			}
		]
	},
	{
		slug: "interpreting-medical-evidence",
		title: "Medical evidence: risk, certainty, and outcomes that matter",
		summary:
			"Understand absolute versus relative effects, confidence, surrogate endpoints, and evidence missing from published studies.",
		checkedAt: "2026-09-11",
		topics: ["consensus-foundations", "media-misinformation", "bias-incentives"],
		reviews: [
			{
				path: "/consensus/media-misinformation/can-relative-risk-tell-you-how-likely-something-is-without-absolute-risk",
				label: "Relative risk needs an absolute baseline"
			},
			{
				path: "/consensus/consensus-foundations/does-improving-a-surrogate-endpoint-prove-patients-will-benefit",
				label: "Surrogate endpoints versus patient benefit"
			},
			{
				path: "/consensus/consensus-foundations/does-statistical-significance-tell-you-whether-an-effect-is-large-or-important",
				label: "Statistical significance and practical importance"
			},
			{
				path: "/consensus/bias-incentives/does-publication-bias-skew-the-published-scientific-record",
				label: "How missing evidence can distort the record"
			}
		]
	}
];

export function guidesForTopic(topic: string) {
	return readingGuides.filter((guide) => guide.topics.includes(topic));
}

export function guidesForReview(path: string) {
	return readingGuides.filter((guide) => guide.reviews.some((review) => review.path === path));
}
