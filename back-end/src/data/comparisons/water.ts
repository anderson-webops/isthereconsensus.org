import type { ComparisonFinding, EvidenceComparison } from "./types.js";
import { waterPracticalClaims, waterSources } from "../claim-expansion-practical-water.js";

function finding(headline: string, summary: string, evidence: string, scope: string, limitation: string, sourceIds: string[]): ComparisonFinding {
	return { headline, summary, evidence, scope, limitation, sourceIds };
}
export const waterComparison: EvidenceComparison = {
	slug: "household-water-treatment",
	title: "Compare household water-treatment methods",
	description: "Carbon filtration, reverse osmosis, UV, distillation, boiling and softening: compare microbial control, chemical reduction and resource needs without treating them as interchangeable.",
	checkedAt: "2026-09-12",
	datasetLabel: "CDC treatment guidance and EPA WaterSense technology guide, with August 2026 efficiency clarifications",
	measureNote: "These are qualitative treatment capabilities and limitations, not a shared removal percentage or a product ranking. A specific contaminant claim, operating conditions and maintenance determine whether a particular system is suitable.",
	resultNote: "Match the method to an identified problem. Better taste, lower hardness, fewer microbes and lower chemical concentrations are different outcomes. If testing and reliable supply information show no harmful contamination, additional treatment may be unnecessary.",
	protocolNote: "Institutional guidance, not a head-to-head trial. The categories describe the named treatment stage, not every multi-stage product. No field removal percentage is transferred across devices, chemicals or organisms. Maintenance needs apply throughout operation, not just on installation day.",
	guidance: { text: "This comparison cannot determine whether your water is safe. Review supply information, relevant water testing and local advice. If fuel or toxic chemical contamination is suspected, use an alternative safe supply and contact the health department; boiling or ordinary disinfection is not a remedy. Follow any active local advisory.", sourceIds: ["cdc-filters", "emergency"] },
	topics: ["climate-and-environment", "health-and-medicine"],
	guidePath: "/guides/household-water-treatment",
	reviews: waterPracticalClaims.map(claim => ({ path: `/consensus/${claim.topicSlug}/${claim.slug}`, label: claim.title })),
	readerUpdates: [{ id: "473642f6-4c4e-4aa1-bbb4-d2b02662637f", date: "2026-09-12T01:02:55.000Z", kind: "new_comparison", bottomLineImpact: "new", summary: "Added household water-treatment capabilities, chemical and microbial limits, and resource trade-offs with contaminant-specific evidence links.", sourceIds: ["cdc-systems", "epa-guide", "ro-clarifications"] }],
	outcomes: [
		{ id: "microbes", label: "Microbial control", unit: "Organism-specific capability", explanation: "Removal or inactivation of organisms, not a universal log-reduction rating or proof that any treated sample is safe." },
		{ id: "chemicals", label: "Chemical reduction", unit: "Contaminant-specific capability", explanation: "Whether the treatment stage can address the named chemical class. Check the exact product's verified reduction claim and conditions." },
		{ id: "resources", label: "Water use and upkeep", unit: "Process and maintenance trade-offs", explanation: "Reject water, regeneration, energy and maintenance are different quantities. They are not combined into an invented efficiency score." }
	],
	contexts: [
		{ id: "mechanisms", label: "General treatment capabilities", supportsEstimates: true, explanation: "What institutional guidance establishes about each process, with the limitations and product-specific verification still visible." },
		{ id: "your-water", label: "Will this make my water safe?", supportsEstimates: false, explanation: "No personalized safety prediction is possible without the actual contaminants, concentrations, system performance and use conditions. A generic technology comparison cannot certify your water." },
		{ id: "emergency", label: "An active warning or emergency", supportsEstimates: false, explanation: "Use current local public-health instructions and an alternative safe supply where advised. This comparison does not override boil-water, do-not-drink or do-not-use notices, or select a treatment for an unknown spill." }
	],
	options: [
		{
			id: "carbon",
			label: "Activated-carbon filtration",
			scope: "A carbon-based household cartridge, without assuming an added validated disinfection stage.",
			estimates: {},
			findingsByContext: { mechanisms: {
				microbes: finding("Not a general disinfectant", "Ordinary pitcher and refrigerator carbon filters should not be assumed to control all organisms.", "CDC says most home filters of these types are not designed to remove germs. A specific cyst-removal claim is narrower than control of every bacterium and virus.", "Carbon stage; product-specific certified exceptions require their own evidence.", "Do not use improved taste as evidence of microbial safety. Poor maintenance can permit growth.", ["cdc-filters"]),
				chemicals: finding("Useful for specified chemicals", "Carbon can reduce selected chemicals, but an odor or chlorine claim does not establish lead or PFAS reduction.", "CDC and NSF direct readers to the exact contaminant claim. Media composition, capacity and water chemistry matter, including for carbon products combined with ion-exchange media.", "The certified product and contaminant, not all cartridges bearing the word carbon.", "Replacement intervals and rated volume matter; one field study cannot establish universal removal.", ["cdc-filters", "nsf"]),
				resources: finding("Cartridges need replacement", "Simple point-of-use carbon filtration does not require RO's continuous reject stream, but used media and maintenance remain.", "EPA describes filtration as not consuming extra treatment water; CDC requires cartridge maintenance. Whole-home systems or backwashing designs may differ.", "Simple household cartridge filtration, not every industrial or whole-house installation.", "No reject stream does not mean zero environmental footprint or indefinite cartridge life.", ["epa-guide", "cdc-filters"])
			} }
		},
		{
			id: "ro",
			label: "Reverse osmosis",
			scope: "A complete point-of-use RO system with a maintained membrane and any specified pre/post-treatment.",
			estimates: {},
			findingsByContext: { mechanisms: {
				microbes: finding("A membrane barrier, if validated", "An appropriate intact RO system can remove organisms, but the technology name alone does not certify an unsafe supply.", "CDC lists parasites, bacteria and viruses among RO's treatment capabilities. Installation, membrane condition and any additional stages determine system performance.", "Complete operating system within its validated conditions, not a loose replacement membrane.", "Keep product instructions and local microbial advisories authoritative; stored treated water can also be contaminated.", ["cdc-systems", "epa-guide"]),
				chemicals: finding("Broad potential, specific claims", "RO can reduce various dissolved chemicals, but performance and verified claims are not identical across systems.", "EPA separates baseline total-dissolved-solids performance from elective contaminant claims. A TDS reduction is not proof of a particular lead, nitrate or PFAS claim.", "Named contaminants at the product's certified test conditions and rated capacity.", "Neither an RO label nor low TDS establishes removal of every harmful substance.", ["cdc-systems", "ro-spec"]),
				resources: finding("A separate concentrate stream", "Water efficiency varies. The reject-to-treated ratio is a water-volume ratio, not contaminant removal.", "WaterSense retains a 30% minimum efficiency rating, equivalent at the threshold to 70/30 reject-to-treated, rounded to about 2.3:1. August 2026 guidance accounts for tank back-pressure and automatic flushing.", "Certification threshold illustration, not a measured ratio for every home or every RO unit.", "Verify the performance sheet; input conditions, draw patterns, filters and membrane maintenance affect actual use.", ["ro-spec", "ro-clarifications"])
			} }
		},
		{
			id: "uv",
			label: "Ultraviolet disinfection",
			scope: "An appropriately specified household UV stage, with pre-treatment where required.",
			estimates: {},
			findingsByContext: { mechanisms: {
				microbes: finding("Inactivation needs adequate exposure", "UV targets organisms rather than physically removing their mass from water.", "EPA identifies microbial inactivation as UV's function. CDC warns that particles can shield organisms in cloudy water and that pre-filtration improves performance.", "Validated organism, flow and water-clarity conditions for the particular unit.", "A lit lamp does not by itself demonstrate the required exposure or safe downstream storage.", ["epa-guide", "emergency"]),
				chemicals: finding("Not dissolved-chemical removal", "Ordinary UV disinfection does not remove lead, nitrate or PFAS from water.", "CDC and EPA distinguish the UV disinfection stage from filters or other stages that remove chemicals.", "Household UV disinfection, not a separately engineered combined chemical-treatment process.", "A multi-stage product needs separate evidence for each chemical-reduction claim.", ["cdc-systems", "epa-guide"]),
				resources: finding("Powered equipment needs upkeep", "UV operation does not inherently create RO concentrate, but the unit and any pre-treatment still need maintenance.", "EPA's comparison lists no additional process-water consumption for UV and identifies an operating lamp as its disinfection mechanism.", "UV stage only; attached pre-filters or flushing stages can add their own requirements.", "Do not infer electricity consumption or maintenance intervals without the specific equipment's documentation.", ["epa-guide"])
			} }
		},
		{
			id: "distillation",
			label: "Distillation",
			scope: "Purpose-designed equipment that boils water and separately collects condensed vapor.",
			estimates: {},
			findingsByContext: { mechanisms: {
				microbes: finding("Heat and separation, then storage", "Distillation can control organisms, but collecting and storing the product introduces its own hygiene requirements.", "CDC lists parasite, bacterial and viral removal while noting possible bacterial growth on cooling coils during inactive periods.", "A maintained distillation system and its collected product, not the water left in a boiling pot.", "Performance during treatment does not prevent later recontamination.", ["cdc-systems"]),
				chemicals: finding("Many chemicals, not all volatiles", "Many dissolved substances remain behind, but some volatile compounds can accompany the vapor.", "CDC and EPA list removal of many salts and metals, while explicitly excluding some volatile organics, solvents and pesticides.", "A particular distiller and chemical, including any additional treatment required.", "Do not improvise distillation as a universal response to fuel or unknown chemical contamination.", ["cdc-systems", "epa-guide"]),
				resources: finding("Heating and cleaning trade-offs", "Distillation generally takes more energy and time than other household treatment methods.", "CDC describes the energy and time burden; EPA notes cleaning and maintenance water and possible growth on inactive cooling coils.", "Batch size, heat source and device design affect actual resource consumption.", "No universal electricity-per-liter or financial cost is inferred from this general comparison.", ["cdc-systems", "epa-guide"])
			} }
		},
		{
			id: "boiling",
			label: "Boiling",
			scope: "Heating water for germ control, without a separate vapor-collection stage.",
			estimates: {},
			findingsByContext: { mechanisms: {
				microbes: finding("Heat can inactivate organisms", "Boiling is a well-established emergency germ-control method when it matches the local advice.", "CDC recommends its specified boiling procedure for microbial contamination and safe storage afterward. This card is an explanation, not a substitute procedure.", "Microbial problem and the official method, not every situation in which water is unsafe.", "Later handling can recontaminate water; chemical warnings require a different response.", ["emergency"]),
				chemicals: finding("Does not resolve chemical hazards", "Fuel, toxic chemicals and radioactive contamination are not made safe by boiling or disinfecting.", "CDC explicitly advises an alternative water source and health-department advice when fuel or toxic chemical contamination is known or suspected.", "Ordinary boiling, not separately validated contaminant-specific treatment.", "Longer heating and clearer appearance are not evidence that the chemical problem has gone away.", ["emergency"]),
				resources: finding("Heating and safe storage required", "Boiling uses heat and then requires cooling and clean storage; it is not a continuous chemical-filtration process.", "CDC's emergency guidance includes cooling and storage in clean, sanitized, covered containers after boiling.", "Batch disinfection with the relevant official instructions and handling precautions.", "No universal fuel cost or energy-per-liter estimate is available from this guidance.", ["emergency"])
			} }
		},
		{
			id: "softening",
			label: "Conventional water softening",
			scope: "Calcium/magnesium-removing cation exchange, not all devices marketed as scale conditioners.",
			estimates: {},
			findingsByContext: { mechanisms: {
				microbes: finding("Hardness control is not disinfection", "Softer water is not evidence that bacteria, parasites or viruses have been controlled.", "CDC lists mineral removal as the softener's function and explicitly excludes these organisms from its removal capabilities.", "The softening stage alone, regardless of any separately validated disinfection stage.", "Better lather and fewer deposits do not establish drinking-water safety.", ["cdc-systems"]),
				chemicals: finding("Targets hardness-forming minerals", "Conventional softeners primarily remove calcium and magnesium. Other chemical claims need separate verification.", "CDC describes the mineral targets; EPA distinguishes ion-exchange softening from conditioning aimed at scale formation.", "Hardness control rather than a universal chemical-contaminant barrier.", "Neither hardness reduction nor scale conditioning is a proxy for lead, nitrate or PFAS removal.", ["cdc-systems", "epa-guide"]),
				resources: finding("Regeneration uses water and salt", "Salt-regenerated softeners produce a waste stream during regeneration, unlike a simple cartridge filter.", "EPA describes regeneration water, salt use and discharge considerations, and recommends checking local restrictions.", "Conventional regenerating cation-exchange systems; specific designs and controls differ.", "Actual use depends on hardness, system sizing and regeneration, not just the softener category.", ["epa-guide"])
			} }
		}
	],
	limitations: [
		"This is not a randomized comparison, market survey or numerical ranking. No common percentage, health score or consensus percentage is invented.",
		"Products may combine technologies. Attribute each claim to its validated system and stages; do not transfer a carbon study to every cartridge or a membrane claim to UV.",
		"Guidance descriptions cannot identify contaminants in your water. Use appropriate supply information, testing and local advice before choosing a treatment.",
		"WaterSense water efficiency is separate from contaminant reduction. The August 2026 clarification supersedes older test and packaging wording; full underlying NSF standards were not independently appraised.",
		"Installation, cartridge or membrane replacement, cleaning and safe storage affect sustained performance. No method makes every supply safe indefinitely."
	],
	sources: [
		{ id: "cdc-systems", ...pick(waterSources.cdcSystems), locator: "Types: filtration, reverse osmosis, distillation, UV and water softeners" },
		{ id: "cdc-filters", ...pick(waterSources.cdcFilters), locator: "Many filters do not remove germs; testing; NSF ratings; maintenance" },
		{ id: "emergency", ...pick(waterSources.emergency), locator: "Fuel/toxic chemicals warning; boiling, storage and UV sections" },
		{ id: "epa-guide", ...pick(waterSources.epaGuide), locator: "Pages 4 and 6–9: softening, Table 2, certification and maintenance" },
		{ id: "nsf", ...pick(waterSources.nsf), locator: "Contaminant-specific certification directory" },
		{ id: "ro-spec", ...pick(waterSources.roSpec), locator: "Sections 3–5; read with August 2026 clarifications" },
		{ id: "ro-clarifications", ...pick(waterSources.roClarifications), locator: "Active Clarification Detail, rows 33–35, RO-0826-1 and RO-0826-2" }
	]
};

function pick(source: typeof waterSources.cdcSystems) {
	return { title: source.title, url: source.url!, note: source.note };
}
