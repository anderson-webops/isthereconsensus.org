import type { ReadingGuideContent } from "./types";

export const mosquitoGuide: ReadingGuideContent = {
	takeaway:
		"Compare the tested product, delivery method and outcome. An ingredient percentage, a fragrant wristband and a malaria-prevention trial describe very different things.",
	scope: "An introduction to reading mosquito-prevention evidence and using the comparison's limits. It is not a product endorsement, a personal travel plan, a child's prescription or instructions for mixing pesticides.",
	sections: [
		{
			id: "identify-outcome",
			title: "Ask what protection meant in the study",
			paragraphs: [
				{
					text: "A mosquito moving toward a person, landing on skin, taking a blood meal and transmitting an infection are separate events. A study may measure just one. In the 2018 methods comparison, complete protection time meant time to the first landing. In the 2017 wearable experiment, researchers counted mosquitoes moving toward selected volunteers during a short wind-tunnel assay. Neither experiment directly measured a person's chance of malaria. Before comparing a headline percentage or a number of hours, identify the endpoint, denominator and observation period.",
					sources: ["methods", "wearables"]
				},
				{
					text: "Observation limits also matter. If a test ends before half the participants experience its defined failure, the median cannot be read as a precisely measured duration. The Swiss field study reached a six-hour observation limit under low landing pressure. That finding is useful for understanding test conditions, but it is not a six-hour guarantee in a different location. Its abstract also disagrees with the results and figure on two species-specific PMD medians; those disputed numbers are disclosed and withheld in the linked review.",
					sources: ["methods"]
				}
			]
		},
		{
			id: "read-formulation",
			title: "Read the formulation, not just the ingredient",
			paragraphs: [
				{
					text: "The percentage on a repellent describes concentration, not the fraction of bites prevented. Duration can change with concentration and release formulation, while sweat, water and rubbing affect persistence during use. Comparing the percentages of two different active ingredients as if they were the same scale skips those differences. Start with the exact product and its labeled use. Avoid turning an old trial of one formulation into a verdict about every product that contains that ingredient, or into a reason to reapply more often than the label permits.",
					sources: ["cdc"]
				},
				{
					text: "The same principle applies to botanical names. Registered OLE or PMD repellents are not interchangeable with unformulated lemon-eucalyptus essential oil. Nor does natural origin establish superior safety. Product-specific age instructions deserve particular care: EPA describes a limited exception for some OLE-only products, which cannot be extended to every OLE, PMD or essential-oil preparation. The comparison deliberately withholds a product selection when the reader chooses the child-use context, because the required individual and label information is absent.",
					sources: ["cdc", "epa"]
				}
			]
		},
		{
			id: "check-delivery",
			title: "Check where the protection is delivered",
			paragraphs: [
				{
					text: "A repellent on skin, an insecticide on fabric and a chemical released into a room do not cover the same area. EPA explains that treated garments protect the covered skin; exposed areas need their own protection. Washing and product care affect retained fabric treatment. Fabric-treatment permethrin should not be applied to skin. These distinctions help readers avoid assuming that a protected sleeve establishes protection for an uncovered ankle, or that a garment's treatment lasts indefinitely without regard to its care instructions.",
					sources: ["clothing", "cdc"]
				},
				{
					text: "Ordinary impregnated wristbands do not become reliable whole-body protection merely because their ingredient is a repellent. In the cited wearable experiment, the tested bracelets did not significantly reduce attraction, whereas an insecticide-releasing device did. That distinction prevents two mistakes: treating a bracelet as an established substitute for a skin repellent, and dismissing all spatial devices because a bracelet failed. Neither a fragrance duration nor a battery runtime should be presented as measured hours without mosquito bites.",
					sources: ["wearables"]
				}
			]
		},
		{
			id: "place-infection-evidence",
			title: "Keep newer malaria evidence in its setting",
			paragraphs: [
				{
					text: "The evidence for indoor spatial emanators has advanced. WHO's September 2026 malaria guideline retains a conditional recommendation for adding appropriate products in endemic settings alongside established nets or indoor residual spraying. The recommendation is about a sustained program, including product selection, coverage and replacement. It does not mean an arbitrary outdoor device prevents infection, that core interventions can be withdrawn, or that a traveler no longer needs other indicated prevention. The comparison links this evidence to its own canonical review so the conditions remain visible.",
					sources: ["who"]
				},
				{
					text: "The overall infection estimate was less certain than the estimate in the high-coverage subgroup. Reporting only the more favorable subgroup would hide that distinction. The subgroup's 80% household-coverage boundary was selected for analysis, not discovered as a switch at which protection suddenly begins. Infection rates measured over person-time also cannot be ranked directly against laboratory landing percentages. A useful comparison preserves these differences and offers questions for further reading instead of producing a universal winner from incompatible studies.",
					sources: ["who"]
				}
			]
		}
	],
	questions: [
		"Was the outcome attraction, first landing, bites or human infection?",
		"Does the evidence match this formulation and delivery method?",
		"Is the claimed duration measured or simply printed on a label?",
		"Which exposed areas and settings remain outside the evidence?",
		"Is a subgroup being presented as though it were the overall result?"
	],
	sources: [
		{
			id: "methods",
			title: "Colucci and Müller: laboratory and field protection-time methods",
			url: "https://www.nature.com/articles/s41598-018-30998-2",
			kind: "Primary methods study",
			note: "Publisher PDF, methods, limitations and figure checked; disputed species medians withheld. Small study with low field landing pressure, not an everyday protection guarantee."
		},
		{
			id: "wearables",
			title: "Rodriguez et al.: wearable devices and spray-on repellents",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5388317/",
			kind: "Primary laboratory experiment",
			note: "Methods and primary results checked. Two selected volunteers and short attraction assays; no numerical brand ranking, disease estimate or advertised duration is adopted."
		},
		{
			id: "cdc",
			title: "CDC Yellow Book: mosquitoes, ticks and other arthropods",
			url: "https://www.cdc.gov/yellow-book/hcp/environmental-hazards-risks/mosquitoes-ticks-and-other-arthropods.html",
			kind: "Institutional guidance",
			note: "2026 edition published April 2025; formulation, duration and use boundaries checked. Its older spatial-disease wording must be read alongside newer WHO guidance."
		},
		{
			id: "epa",
			title: "EPA: using insect repellents safely and effectively",
			url: "https://www.epa.gov/insect-repellents/using-insect-repellents-safely-and-effectively",
			kind: "Regulatory guidance",
			note: "Product-specific instructions and the limited OLE-only child-label exception checked; no blanket age permission is inferred."
		},
		{
			id: "clothing",
			title: "EPA: repellent-treated clothing",
			url: "https://www.epa.gov/insect-repellents/repellent-treated-clothing",
			kind: "Regulatory guidance",
			note: "Covered-skin, care and labeling sections checked. Historical review deadlines are not represented as current regulatory status."
		},
		{
			id: "who",
			title: "WHO malaria guideline, September 2026: spatial emanators",
			url: "https://www.who.int/publications-detail-redirect/guidelines-for-malaria",
			kind: "Living guideline",
			note: "Recommendation and evidence tables checked in the current PDF, including coverage footnote. Underlying trials were not independently reappraised; recommendation is supplementary and indoor."
		}
	]
};
