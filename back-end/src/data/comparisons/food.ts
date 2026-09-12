import type { ComparisonFinding, EvidenceComparison } from "./types.js";
import { foodStorageClaims, foodStorageSources } from "../claim-expansion-practical-food.js";

function finding(headline: string, summary: string, evidence: string, scope: string, limitation: string, sourceIds: string[]): ComparisonFinding {
	return { headline, summary, evidence, scope, limitation, sourceIds };
}
export const foodStorageComparison: EvidenceComparison = {
	slug: "food-storage-and-safety",
	title: "Compare food storage and safety checks",
	description: "Refrigeration, freezing, reheating, vacuum sealing and sensory checks serve different purposes. Compare what each can establish and what remains unknown.",
	checkedAt: "2026-09-12",
	datasetLabel: "Food safety guidance, microbiological mechanisms and scoped laboratory research",
	measureNote: "Qualitative findings, without a universal storage-life calculator, kill percentage or personal illness estimate.",
	resultNote: "These steps can be combined and are not interchangeable. A storage method and a sensory check answer different questions; selecting cards does not test food.",
	protocolNote: "No common experiment compares all five approaches against the same hazard in the same food. No overall safety ranking is calculated.",
	guidance: { text: "Follow the product's storage and preparation instructions and your local food-safety authority's guidance. Missing or unsafe handling history cannot be resolved by a normal smell or by reheating.", sourceIds: ["fda", "labels", "cereulide"] },
	topics: ["agriculture-and-food-systems"],
	guidePath: "/guides/food-storage-and-safety",
	reviews: foodStorageClaims.map(claim => ({ path: `/consensus/${claim.topicSlug}/${claim.slug}`, label: claim.title })),
	readerUpdates: [{ id: "de34b507-73c5-49ac-aad9-cd809d12e406", date: "2026-09-12T03:20:10.000Z", kind: "new_comparison", bottomLineImpact: "new", summary: "Added a food-storage comparison, five canonical reviews and a guide separating growth, survival, toxins and spoilage.", sourceIds: ["fda", "efsa", "vacuum"] }],
	outcomes: [
		{ id: "role", label: "What it can do", unit: "Role and evidence", explanation: "Distinguish a growth-control step, a heating process, a packaging change and an observation of quality." },
		{ id: "limits", label: "What it cannot establish", unit: "Unanswered safety questions", explanation: "See which assumptions about prior handling, hazards and food-specific conditions remain." }
	],
	contexts: [
		{ id: "general", label: "Understand the methods", supportsEstimates: true, explanation: "Read the evidence for each role under its stated conditions, without judging an individual meal." },
		{ id: "meal", label: "Is this meal safe to eat?", supportsEstimates: false, explanation: "The food, contamination and complete handling history have not been assessed. These cards cannot certify a meal; use food-specific official guidance and do not taste suspect food as a test." },
		{ id: "outage", label: "Food after a power outage", supportsEstimates: false, explanation: "A safe decision depends on the food and its time-temperature history. This comparison does not estimate either; follow your local authority's specific power-outage guidance." }
	],
	options: [
		{
			id: "chill",
			label: "Refrigeration",
			scope: "Perishable food kept under its appropriate chilled-storage conditions.",
			estimates: {},
			findingsByContext: { general: {
				role: finding("Limit growth during storage", "Chilling helps slow growth, while some pathogens can still grow in suitable refrigerated foods.", "FDA and EFSA retain the importance of the organism, food, time and actual temperature.", "Properly handled food, with applicable storage instructions followed.", "A fridge location or dial setting is not a measurement of food safety.", ["fda", "efsa"]),
				limits: finding("No unlimited shelf life", "Refrigeration does not erase earlier handling or establish how long every leftover remains safe.", "Opening and handling can change contamination and the conditions behind a manufacturer's original shelf life.", "The actual product and its complete storage history.", "No common number of safe days is provided for all foods.", ["efsa", "chilling"])
			} }
		},
		{
			id: "freeze",
			label: "Freezing",
			scope: "Food kept continuously under appropriate frozen-storage conditions.",
			estimates: {},
			findingsByContext: { general: {
				role: finding("Pause growth, retain possible survivors", "Freezing supports longer storage, but pathogens that survive can remain relevant when food is thawed.", "EFSA distinguishes frozen-storage growth control from complete microbial elimination.", "The organism, food and freezing/thawing process matter.", "This does not establish a universal percentage of organisms killed.", ["efsa"]),
				limits: finding("Not a reset for unsafe food", "Freezing does not reliably repair prior unsafe handling or remove every pre-existing hazard.", "FDA's continued-storage advice assumes proper handling; preparation instructions still apply to frozen products.", "An appropriately handled product and the instructions for its intended use.", "Freezer burn concerns quality, not a test for pathogens or toxins.", ["fda", "chilling"])
			} }
		},
		{
			id: "reheat",
			label: "Reheating",
			scope: "A food-specific heating step after appropriate earlier handling.",
			estimates: {},
			findingsByContext: { general: {
				role: finding("Control heat-susceptible hazards", "Appropriate heating can control many living pathogens when the necessary conditions are reached throughout the food.", "Guidance distinguishes heating through the product from warming its exterior; starting frozen can change the process.", "The food and validated preparation instructions, including the starting condition.", "No single time-temperature recipe is assigned to every food or hazard.", ["efsa", "fda"]),
				limits: finding("Do not assume toxins are removed", "A toxin formed before heating can behave differently from the living organism that produced it.", "Cereulide is a heat-stable example; the review distinguishes it from heat-sensitive enterotoxins.", "The particular toxin, strain and earlier conditions, not all bacterial hazards as one category.", "This is not a method for rescuing food that was improperly stored.", ["cereulide"])
			} }
		},
		{
			id: "vacuum",
			label: "Vacuum sealing",
			scope: "Air removal and sealing as part of a food's packaging process.",
			estimates: {},
			findingsByContext: { general: {
				role: finding("Change the storage atmosphere", "Limiting oxygen can slow some spoilage, while changing which hazards need control.", "FSA treats low-oxygen packaging alongside other controls, including those for non-proteolytic C. botulinum.", "A product with appropriate processing, composition and storage controls.", "A household sealer does not establish a validated shelf-stable process.", ["vacuum"]),
				limits: finding("Keep food-specific controls", "A sealed package does not remove the need for chilling or justify restarting the storage clock.", "The business guidance retains product-specific controls and cautions against rolling shelf lives after rewrapping.", "The guidance has defined exclusions and is not a universal home allowance.", "No ten-day guarantee, vacuum-preservation recipe or individual packet assessment is supplied.", ["vacuum", "efsa"])
			} }
		},
		{
			id: "senses",
			label: "Smell and appearance checks",
			scope: "Observation of food quality and some visible or odorous spoilage.",
			estimates: {},
			findingsByContext: { general: {
				role: finding("Notice some quality changes", "Sensory observations can reveal deterioration, but are different from detecting a specific pathogen.", "FDA distinguishes obvious spoilage from illness-causing contamination; UK labels also distinguish quality and safety.", "Quality assessment under the applicable product and regional guidance.", "Do not use tasting as a safety test for suspect food.", ["fda", "labels"]),
				limits: finding("Normal senses cannot certify safety", "A normal-looking, normal-smelling food can still contain a hazard.", "Food-safety controls and storage instructions remain relevant when no spoilage is apparent.", "The food, label meaning and handling conditions still need to be considered.", "No sensitivity, specificity or probability of safety is calculated from a smell check.", ["fda", "labels"])
			} }
		}
	],
	limitations: [
		"Storage, preparation, packaging and observation have different roles. They can form one process and are not interchangeable alternatives.",
		"Food composition, organisms, actual temperatures and handling histories differ; no universal shelf life or personal illness probability is available.",
		"Microbial growth, survival, toxin formation and visible spoilage are separate outcomes.",
		"Institutional advice has a defined audience and jurisdiction. Different time limits and date-label meanings are not merged into one worldwide rule.",
		"Laboratory detection is not a survey of household illness. A reviewed study's toxin wording and denominator discrepancies are retained in the canonical review.",
		"Source checking was targeted and AI-assisted. Independent expert review, food testing and legal or product certification were not performed."
	],
	sources: ["fda", "efsa", "chilling", "labels", "cereulide", "vacuum"].map((id) => {
		const entry = foodStorageSources[id as keyof typeof foodStorageSources];
		const locators: Record<string, string> = { fda: "Storage, refrigeration and freezer sections", efsa: "Methods, opening-package conditions and freezing/thawing sections", chilling: "Chilling and freezing guidance", labels: "Use-by and best-before scope and storage instructions", cereulide: "Toxin distinction, temperature, precautions and limitations", vacuum: "Current landing page; linked PDF scope, controls and rewrapping sections" };
		return { id, title: entry.title, url: entry.url!, note: entry.note, locator: locators[id]! };
	})
};
