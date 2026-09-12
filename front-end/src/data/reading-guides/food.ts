import type { ReadingGuideContent } from "./types";

export const foodStorageGuide: ReadingGuideContent = {
	takeaway:
		"A food-storage method answers only part of the safety question. Separate preventing growth, killing organisms, controlling toxins and noticing spoilage, then retain the food's handling history.",
	scope: "An evidence guide to household storage and food safety assumptions. It does not certify an individual meal, supply preservation recipes or replace food-specific official instructions.",
	sections: [
		{
			id: "different-questions",
			title: "Ask what the step actually controls",
			paragraphs: [
				{
					text: "Refrigerating, freezing and reheating can all contribute to a food-handling process, but they do not do the same job. Chilling limits growth. Frozen storage can stop growth while organisms survive. Heating can control susceptible organisms if the necessary conditions are reached throughout the food. The useful question is which hazard and which stage a statement describes. Calling all three ways to make food safe hides the assumptions that determine whether the statement applies.",
					sources: ["efsa", "fda"]
				},
				{
					text: "The condition of the food before each step matters. Putting a package into a freezer does not reconstruct missing storage history. Nor does finding food in a refrigerator tell you how it cooled, whether it was contaminated later, or how warm it became during handling. The comparison therefore explains roles and limits without offering one safety score for every meal.",
					sources: ["fda", "efsa"]
				}
			]
		},
		{
			id: "organism-toxin",
			title: "Keep the organism and its toxin separate",
			paragraphs: [
				{
					text: "Microbiology has several different endpoints. A genetic marker can indicate the potential to produce a toxin; growth shows that organisms multiplied under the tested conditions; toxin measurement examines a different outcome again. A selected laboratory culture does not automatically describe the behavior of the original food in a household. The linked refrigeration review retains that distinction instead of turning laboratory prevalence into the reader's probability of becoming ill.",
					sources: ["lab"]
				},
				{
					text: "Reheating also depends on the target. Cereulide, produced by some Bacillus cereus strains before consumption, is a heat-stable toxin. It is a counterexample to the idea that heating removes every consequence of unsafe storage. Other toxins have different properties, so the lesson is not that all toxins resist heat. It is that a claim about killing an organism does not, by itself, establish control of a toxin already present.",
					sources: ["cereulide"]
				}
			]
		},
		{
			id: "package-label",
			title: "Read the package and label in context",
			paragraphs: [
				{
					text: "Vacuum packaging changes the surrounding atmosphere. It may help with some spoilage, but low oxygen is not a barrier to every pathogen. Professional guidance combines packaging with other product-specific controls and warns against restarting shelf life simply by rewrapping. A sealed package made at home does not show that an industrial preservation process was reproduced. Keep the product's storage instructions attached to the packaging claim.",
					sources: ["vacuum"]
				},
				{
					text: "Date labels also need context. UK guidance distinguishes a use-by safety date from a best-before quality date; US terminology does not map exactly onto that distinction. Storage directions remain important in either setting. Avoid using an isolated phrase from one country's guidance as a worldwide rule. The linked reviews identify the audience and source so readers can follow the advice that actually applies to their food.",
					sources: ["labels", "fda"]
				}
			]
		},
		{
			id: "quality-safety",
			title: "Use quality clues without mistaking them for a test",
			paragraphs: [
				{
					text: "An unpleasant smell or visible deterioration can be informative about quality. A normal smell is a much weaker statement: it cannot rule out pathogens. This is an asymmetry, not a reason to ignore your senses. Treat obvious deterioration and the absence of deterioration as different observations, and do not taste suspect food to decide whether it contains a hazard.",
					sources: ["fda", "labels"]
				},
				{
					text: "The most useful next question is often what information is missing. Was the food handled as instructed? Is the claim about quality, growth or a particular hazard? Does the evidence concern this food or a laboratory medium? The comparison's individual-meal and power-outage contexts deliberately leave findings unavailable because those questions cannot be answered from a generic method name. Follow the relevant official instructions for an actual food decision.",
					sources: ["efsa", "lab"]
				}
			]
		}
	],
	questions: [
		"Which hazard or quality change is being assessed?",
		"What handling history does the claim assume?",
		"Is growth being confused with toxin production or illness?",
		"Which product and jurisdiction does the guidance cover?",
		"Does the method establish safety, or only one condition needed for it?"
	],
	sources: [
		{
			id: "fda",
			title: "FDA: Are You Storing Food Safely?",
			url: "https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely",
			kind: "US consumer guidance",
			note: "Storage, refrigeration and freezer sections checked; not a personal food test or worldwide label rule."
		},
		{
			id: "efsa",
			title: "EFSA: date marking and related food information, part 2",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8061283/",
			kind: "2021 expert guidance",
			note: "Primary full text via Europe PMC; methods, uncertainty and relevant storage sections checked. Competing-interest waiver disclosed; no independent declaration audit."
		},
		{
			id: "lab",
			title: "Jovanovic et al.: cold-growing presumptive Bacillus cereus",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9030337/",
			kind: "2022 laboratory study",
			note: "Selected 2019 retail samples and enriched culture methods. Abstract/results toxin discrepancy and denominator issues retained; no household illness estimate."
		},
		{
			id: "cereulide",
			title: "Yang et al.: cereulide and emetic Bacillus cereus",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9956921/",
			kind: "2023 narrative review",
			note: "Toxin distinctions, temperature, precautions and funding checked. No universal dose, heating recipe or claim that all toxins are heat-stable."
		},
		{
			id: "vacuum",
			title: "FSA: vacuum packaging",
			url: "https://www.gov.uk/government/publications/vacuum-packaging",
			kind: "Business guidance",
			note: "Current page links December 2020 PDF. Scope, controls and rewrapping checked; no universal household shelf-life allowance or legal audit."
		},
		{
			id: "labels",
			title: "UK guidance: best-before and use-by dates",
			url: "https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates",
			kind: "Consumer guidance",
			note: "Safety/quality distinction and storage instructions checked, with regional scope retained."
		}
	]
};
