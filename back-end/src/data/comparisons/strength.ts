import type { EvidenceComparison } from "./types.js";

// This is not a network meta-analysis or a common-scale product ranking.
// Preserve each study's own outcome, units, population and uncertainty.
export const strengthComparison: EvidenceComparison = {
	slug: "strength-training-supplements",
	title: "Compare strength-training supplements",
	description:
		"Protein, creatine, or BCAAs: compare what the evidence supports for strength and muscle growth, and where the claims go further than the research.",
	checkedAt: "2026-09-11",
	readerUpdates: [{
		id: "715ece68-d739-499b-8dc4-ace8e8d780ff",
		date: "2026-09-11T20:50:09Z",
		kind: "new_comparison",
		summary: "Added protein, creatine and BCAA evidence with study-specific outcomes and limitations, without treating separate studies as a common-scale ranking.",
		bottomLineImpact: "new",
		sourceIds: ["protein-review", "nih-guidance", "creatine-imaging", "bcaa-acute"]
	}],
	datasetLabel: "Separate research summaries and NIH guidance, not one head-to-head trial",
	resultNote: "Different studies cannot establish a universal winner. Open each finding for its evidence and limits.",
	protocolNote:
		"These supplements serve different roles. Protein provides building blocks, creatine supports rapid energy supply, and BCAAs provide only three essential amino acids. Training and baseline diet remain part of the context.",
	measureNote:
		"There is no shared numeric score here. Kilograms lifted, muscle cross-sectional area, standardized imaging effects and short-term protein synthesis are different outcomes. Do not subtract these results, rank products by their numbers, or treat them as percentages of scientific agreement.",
	topics: ["sports-nutrition-and-supplements", "nutrition-and-diet", "exercise-and-sports-science"],
	guidePath: "/guides/making-sense-of-supplements",
	reviews: [
		{
			path: "/consensus/nutrition-and-diet/does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe",
			label: "Creatine, strength training, and safety"
		},
		{
			path: "/consensus/sports-nutrition-and-supplements/do-bcaa-supplements-add-muscle-or-performance-benefits-when-protein-intake-is-adequate",
			label: "BCAAs when protein intake is adequate"
		},
		{
			path: "/consensus/sports-nutrition-and-supplements/is-a-loading-phase-necessary-to-raise-muscle-creatine-stores",
			label: "Is creatine loading necessary?"
		},
		{
			path: "/consensus/sports-nutrition-and-supplements/does-extra-lean-mass-after-creatine-mean-extra-muscle-tissue",
			label: "Lean mass is not the same as muscle tissue"
		},
		{
			path: "/consensus/sports-nutrition-and-supplements/does-buffered-creatine-outperform-creatine-monohydrate",
			label: "Does buffered creatine work better?"
		}
	],
	outcomes: [
		{
			id: "strength",
			label: "Strength gains",
			unit: "Study-specific findings",
			explanation:
				"Additional strength gains alongside resistance training, not a score for overall health or product quality."
		},
		{
			id: "muscle-growth",
			label: "Muscle growth",
			unit: "Study-specific findings",
			explanation:
				"Muscle-size evidence, kept distinct from lean mass and short-term protein-synthesis measurements."
		}
	],
	contexts: [
		{
			id: "training",
			label: "Healthy adults doing resistance training",
			supportsEstimates: true,
			explanation:
				"Training studies generally lasted weeks or months. Diet, age and training history differ across the source bodies; each card keeps those limits visible."
		},
		{
			id: "without-training",
			label: "Without resistance training",
			supportsEstimates: false,
			explanation:
				"The training findings cannot be reused as estimates for taking a supplement without training. Missing matched estimates do not prove zero effect."
		},
		{
			id: "clinical",
			label: "Clinical conditions or rehabilitation",
			supportsEstimates: false,
			explanation:
				"These findings are not matched treatment estimates for illness, frailty, injury rehabilitation or an individual medical condition."
		}
	],
	options: [
		{
			id: "protein",
			label: "Protein supplements",
			scope: "Extra protein alongside training; benefit depends on baseline intake, not a special status for powders.",
			estimates: {},
			findingsByContext: {
				training: {
					"strength": {
						headline: "A modest additional benefit is supported",
						summary:
							"Extra protein can add to strength gains during resistance training. A supplement is one way to obtain it; the result does not establish an advantage over an otherwise adequate food-based diet.",
						evidence:
							"Morton et al. reported an additional 2.49 kg in one-repetition-maximum strength (95% confidence interval 0.64 to 4.33 kg) versus the training control. This is the 1RM analysis, not every trial or every strength test.",
						scope: "The 2018 review included 49 randomized trials and 1,863 healthy participants overall, with 6–52 weeks of training. Participants were not energy-restricted; outcomes use different subsets.",
						limitation:
							"Foods and different supplements were included. This is not a protein-versus-creatine comparison, a guaranteed personal gain, or evidence that more protein is always better. Dairy-industry relationships were disclosed.",
						sourceIds: ["protein-review", "nih-guidance"]
					},
					"muscle-growth": {
						headline: "Small added gains; measurement matters",
						summary:
							"Some direct muscle-size outcomes favor additional protein with training, but studies and measurements vary. Whole-body fat-free mass should not be relabeled as pure muscle growth.",
						evidence:
							"The 2018 review reported an additional 7.2 mm² of mid-femur muscle cross-sectional area (95% confidence interval 0.20 to 14.30 mm²). Its separate fat-free-mass estimate was 0.30 kg (0.09 to 0.52 kg). These are not interchangeable measures.",
						scope: "Healthy, non-energy-restricted adults training for at least six weeks. The review's 49 trials did not all measure muscle area; each outcome draws on its own subset.",
						limitation:
							"The muscle-fibre result was sensitive to which study was included. The review's modeled protein-intake breakpoint is not a hard universal cutoff. Dairy-industry relationships were disclosed.",
						sourceIds: ["protein-review"]
					}
				}
			}
		},
		{
			id: "creatine",
			label: "Creatine monohydrate",
			scope: "Evidence concerns monohydrate, not every creatine formulation or multi-ingredient blend.",
			estimates: {},
			findingsByContext: {
				training: {
					"strength": {
						headline: "Can add to strength-training benefits",
						summary:
							"Creatine can support repeated high-intensity work and strength adaptation. It is not a substitute for training, and individuals do not all respond alike.",
						evidence:
							"NIH guidance and the ISSN position statement describe benefits for repeated intense efforts and training adaptation. They do not supply a matched protein-versus-creatine effect for this comparison, so no common-scale number is assigned.",
						scope: "Healthy exercise populations, with much of the research in men. A short sprint result is not itself a measure of long-term strength gain.",
						limitation:
							"Baseline stores, protocol and training differ. The ISSN contributors disclose supplement-industry relationships. This does not establish superiority for every user or a personal dosing plan.",
						sourceIds: ["nih-guidance", "creatine-position"]
					},
					"muscle-growth": {
						headline: "Possible small added growth; size uncertain",
						summary:
							"Direct imaging suggests a small average added muscle-size effect with training, but the interval also allows no added effect. Early changes in lean mass alone do not establish new muscle tissue.",
						evidence:
							"The 2023 regional-imaging synthesis estimated a standardized mean difference of 0.11 (95% Bayesian credible interval −0.02 to 0.25). This is neither kilograms of muscle nor a confidence interval from the protein review.",
						scope: "Ten trials, 44 regional outcomes, 6–52 weeks; healthy younger and older adults. Ultrasound and CT measured particular muscle regions, not total contractile tissue.",
						limitation:
							"Few participants were already resistance-trained, and populations and durations varied. Review authors disclosed industry relationships. Do not convert the standardized effect to kilograms or interpret it as a consensus vote.",
						sourceIds: ["creatine-imaging", "nih-guidance"]
					}
				}
			}
		},
		{
			id: "bcaas",
			label: "BCAA supplements",
			scope: "Isolated branched-chain amino acids, not a complete protein or all essential amino acids.",
			estimates: {},
			findingsByContext: {
				training: {
					"strength": {
						headline: "Extra benefit with adequate protein is unclear",
						summary:
							"Research does not consistently show additional strength or performance benefits beyond sufficient high-quality protein. That is not the same as proving no possible benefit under any conditions.",
						evidence:
							"NIH notes some positive short training studies but describes the overall performance and muscle-building evidence as inconsistent. No defensible matched strength estimate against protein or creatine is available from these sources.",
						scope: "Effects depend on diet, training and the outcome tested. Soreness or a blood marker after exercise is not a direct measurement of added strength.",
						limitation:
							"Do not treat all users as protein-replete or all recovery outcomes as strength. The evidence does not justify a universal zero-effect claim.",
						sourceIds: ["nih-guidance"]
					},
					"muscle-growth": {
						headline: "An acute signal is not proof of lasting growth",
						summary:
							"BCAAs can increase a short-term protein-synthesis measurement. That does not establish extra muscle growth over months, especially when complete protein is already sufficient.",
						evidence:
							"A 2017 experiment in ten young men found a 22% higher myofibrillar protein-synthesis rate over four hours after BCAAs versus placebo. That is not 22% more muscle, and the experiment did not compare BCAAs with complete protein.",
						scope: "An acute post-exercise tracer and biopsy study, not a long-term training trial. PubMed abstract and protocol figure checked; full risk of bias not independently appraised.",
						limitation:
							"This finding cannot be placed on the same scale as muscle imaging or long-term strength. NIH still finds inconsistent evidence for added muscle-building benefit.",
						sourceIds: ["bcaa-acute", "nih-guidance"]
					}
				}
			}
		}
	],
	limitations: [
		"This is a targeted comparison of evidence, not an exhaustive systematic review or an independently expert-reviewed treatment guideline.",
		"Studies have different diets, comparators, populations and time horizons. Their numbers cannot establish a product ranking or a combined benefit from taking all three.",
		"Lean mass, muscle size, strength and recovery are different outcomes. Product purity, cost, safety and usefulness for a particular person are separate questions.",
		"Research doses are not personal recommendations. Medical conditions, medicines, dietary needs and product quality can change the decision."
	],
	sources: [
		{
			id: "protein-review",
			title: "Morton et al. (2018): protein supplementation and resistance-training gains",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5867436/",
			locator: "Methods, Results: strength and muscle-mass outcomes; sensitivity analysis and disclosures",
			note: "Relevant full text checked through Europe PMC. The 1RM, mid-femur area and fat-free-mass results are separate analyses. Underlying studies were not reappraised. Dairy-industry relationships disclosed."
		},
		{
			id: "nih-guidance",
			title: "NIH: Dietary Supplements for Exercise and Athletic Performance",
			url: "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/",
			locator: "Branched-chain amino acids, Creatine, and Protein sections",
			note: "Full relevant sections checked. Updated April 1, 2024, not new measurements in 2026. Independent institutional context distinguishes performance, body composition, diet and general safety limits."
		},
		{
			id: "creatine-position",
			title: "ISSN (2017): position stand on creatine supplementation",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
			locator: "Bioavailability, Ergogenic value, Supplementation protocols, and Competing interests",
			note: "Relevant full-text sections checked through Europe PMC. A position statement with disclosed industry relationships, not a new independent trial or a common-scale comparison with protein and BCAAs."
		},
		{
			id: "creatine-imaging",
			title: "Burke et al. (2023): creatine and regional muscle hypertrophy",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10180745/",
			locator: "Methods; Results 3.1 and 3.2; Discussion; Conflicts of Interest",
			note: "Relevant full text checked through Europe PMC. Preserve the Bayesian credible interval and regional imaging scope. Individual studies were not reappraised; review authors disclose industry relationships."
		},
		{
			id: "bcaa-acute",
			title: "Jackman et al. (2017): BCAAs and post-exercise muscle protein synthesis",
			url: "https://pubmed.ncbi.nlm.nih.gov/28638350/",
			locator: "Abstract and Figure 1 protocol, four-hour outcome",
			note: "Abstract and protocol figure checked, not a full independent risk-of-bias appraisal. Acute crossover experiment in ten men; no complete-protein comparator or long-term muscle-growth outcome."
		}
	]
};
