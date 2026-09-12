import type { ComparisonFinding, EvidenceComparison } from "./types.js";
import { mosquitoPracticalClaims, mosquitoSources } from "../claim-expansion-practical-mosquito.js";

function finding(headline: string, summary: string, evidence: string, scope: string, limitation: string, sourceIds: string[]): ComparisonFinding {
	return { headline, summary, evidence, scope, limitation, sourceIds };
}
export const mosquitoComparison: EvidenceComparison = {
	slug: "mosquito-bite-prevention",
	title: "Compare mosquito-bite prevention approaches",
	description: "DEET, picaridin, OLE/PMD, treated clothing, spatial emanators and wristbands: compare what is supported and where each approach's protection stops.",
	checkedAt: "2026-09-12",
	datasetLabel: "CDC and EPA guidance, primary repellent studies and WHO's September 2026 malaria guideline",
	measureNote: "Qualitative findings with different endpoints, not a common protection percentage. Attraction, first landing, biting and human infection are not interchangeable measures, and ingredient concentration is not an efficacy score.",
	resultNote: "Start with the exposure and the tested delivery method. Skin protection, fabric treatment and a maintained indoor malaria-control program do different jobs. No single option provides a universal shield.",
	protocolNote: "This is a guidance-based comparison, not a head-to-head trial of six products. Formulations, mosquito species, observation windows and study settings differ. Label claims are not independently measured field durations; historical product rankings are not current market rankings.",
	guidance: { text: "Follow the exact product label and relevant local public-health or travel advice. Fabric-treatment permethrin is not for application to skin. Repellents do not replace any indicated malaria medication or other disease-specific prevention. A personal plan, including use for a child, needs the relevant product and circumstances.", sourceIds: ["cdc", "epa-use"] },
	topics: ["health-and-medicine"],
	guidePath: "/guides/mosquito-bite-prevention",
	reviews: mosquitoPracticalClaims.map(claim => ({ path: `/consensus/${claim.topicSlug}/${claim.slug}`, label: claim.title })),
	readerUpdates: [{ id: "efb45873-22f4-4055-a20c-c1bccf629957", date: "2026-09-12T01:50:43.000Z", kind: "new_comparison", bottomLineImpact: "new", summary: "Added mosquito-prevention evidence and use boundaries, including current indoor spatial-emanator guidance and five linked reviews.", sourceIds: ["cdc", "who", "wearables"] }],
	outcomes: [
		{ id: "evidence", label: "Evidence for protection", unit: "Endpoint-specific findings", explanation: "What was established, and whether it concerns attraction, landing, bites or human infection. Findings are not ranked on an invented shared scale." },
		{ id: "use", label: "Coverage and use limits", unit: "Delivery and applicability", explanation: "Which area or setting is covered, how formulation and maintenance matter, and what evidence cannot be transferred." }
	],
	contexts: [
		{ id: "general", label: "Evidence and use boundaries", supportsEstimates: true, explanation: "Compare the roles supported by guidance and specific studies, keeping their distinct conditions and endpoints visible." },
		{ id: "personal", label: "My chance of infection", supportsEstimates: false, explanation: "These findings cannot calculate a person's infection risk from destination, season, exposure, health history and product choice. A laboratory repellency measure is not a personal disease-risk estimate." },
		{ id: "child", label: "Choose a product for my child", supportsEstimates: false, explanation: "This comparison does not select a child's formulation or dose. Age instructions differ by exact product and jurisdiction; a limited OLE-label exception is not permission for every OLE, PMD or essential-oil product." }
	],
	options: [
		{
			id: "deet",
			label: "DEET skin repellents",
			scope: "Registered formulations applied within their specific labels.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Established bite protection", "DEET is an established active ingredient in effective skin-applied repellents; products need not have identical duration.", "CDC includes DEET among evaluated repellents. EPA's protection-time information varies by product and concentration.", "A labeled formulation and the biting pest it was evaluated against.", "This is not a promise of a fixed number of hours or a measured personal reduction in malaria risk.", ["cdc", "deet"]),
				use: finding("Concentration is not a score", "Higher concentration often extends duration, with diminishing gains at higher DEET concentrations.", "CDC describes protection-time gains leveling off at approximately 50% DEET; release formulation, sweat, water and rubbing also matter.", "General interpretation of mosquito-repellent duration, not a personal concentration recommendation.", "Do not infer proportional benefit, reapply beyond the label or transfer a duration to every formulation.", ["cdc", "deet"])
			} }
		},
		{
			id: "picaridin",
			label: "Picaridin skin repellents",
			scope: "Also called icaridin; evaluate the finished product, concentration and labeled use.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("An evaluated topical option", "Picaridin is among the registered active ingredients CDC identifies for effective bite prevention.", "The guidance supports labeled picaridin formulations without assigning one ingredient a universal advantage across products and mosquito species.", "Skin-applied protection for the labeled pests and conditions.", "A result for one low-concentration product is not a verdict on every picaridin formulation.", ["cdc"]),
				use: finding("Check formulation and exposure", "Compare the labeled product's intended use and duration, not its percentage directly with a different chemical.", "CDC describes efficacy as dependent on product, arthropod species and conditions; EPA emphasizes specific label precautions.", "The amount applied and persistence of the finished formulation during its labeled use.", "The comparison supplies no ingredient-wide duration, pediatric selection or brand endorsement.", ["cdc", "epa-use"])
			} }
		},
		{
			id: "ole",
			label: "Registered OLE / PMD",
			scope: "Evaluated repellent formulations, distinct from unformulated lemon-eucalyptus essential oil.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Formulation matters more than origin", "Registered OLE/PMD repellents can provide useful mosquito protection. Essential oil does not inherit that evidence.", "CDC identifies tested OLE/PMD options while explicitly distinguishing pure essential oil from validated formulations.", "The registered repellent, rather than every product bearing a similar botanical name.", "Plant origin alone does not establish duration, tolerability or protection against infection.", ["cdc"]),
				use: finding("Read the exact age instructions", "OLE/PMD use restrictions cannot be reduced to one rule for every formulation.", "EPA notes that certain OLE-only products at 30% or less permit use below age three; the exception is product specific.", "Current instructions on the exact authorized product in its jurisdiction.", "Do not extend an exception to all PMD, OLE or essential oils, or improvise a mixture.", ["epa-use"])
			} }
		},
		{
			id: "clothing",
			label: "Permethrin-treated clothing",
			scope: "Labeled fabric treatment or factory-treated garments, not permethrin applied to skin.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Protection tied to treated fabric", "Appropriately treated clothing repels or kills target insects and protects the covered area.", "EPA requires efficacy data for public-health pest claims and explains that factory-treated clothing protects covered skin, with exposed areas requiring their own protection.", "Labeled garments, target pests and retained treatment, not an invisible whole-body barrier.", "An uncovered hand or ankle does not automatically receive the clothing's protection.", ["clothing"]),
				use: finding("Washing and coverage matter", "Retained activity and any retreatment interval depend on the product and its care instructions.", "EPA explains why treated clothing has pesticide-label and washing directions. CDC distinguishes durable fabric treatment from repellents that wash out more readily.", "The garment's stated care and useful treatment life.", "Use fabric-treatment permethrin only as labeled; do not apply it to skin.", ["clothing", "cdc"])
			} }
		},
		{
			id: "spatial",
			label: "Indoor spatial emanators",
			scope: "Appropriate insecticide-emitting products in malaria-control programs, not every outdoor gadget.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Conditional infection evidence", "WHO supports supplementary indoor use in endemic settings while retaining core nets or spraying.", "The 2026 guideline reports an overall infection rate ratio of 0.77 (95% CI 0.56–1.05); the high-coverage subgroup was 0.67 (0.56–0.81). Their certainty ratings differ.", "Indoor program evidence, with overall low certainty and high certainty for the at-least-80%-coverage subgroup as rated by WHO.", "Coverage was not randomized; 80% is not a demonstrated protection threshold. These ratios are not landing percentages.", ["who"]),
				use: finding("A supplementary program tool", "Appropriate product choice, ongoing coverage and replacement are integral to the recommendation.", "WHO limits the recommendation to indoor deployment, recommends prequalified products and says established nets or spraying should not lose coverage to fund the addition.", "Areas with ongoing malaria transmission and a sustained delivery program.", "No replacement claim, outdoor guarantee or personal mortality benefit follows from this recommendation.", ["who"])
			} }
		},
		{
			id: "wristbands",
			label: "Impregnated wristbands",
			scope: "Ordinary repellent bracelets, distinct from powered or passive spatial insecticide devices.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Not an evidence-backed substitute", "The evidence does not support relying on ordinary repellent wristbands in place of effective skin repellents.", "CDC identifies impregnated wristbands as ineffective. A 2017 wind-tunnel test found no significant attraction reduction with its three bracelets.", "Tested bracelets and general guidance, not every possible future delivery technology.", "The small experiment measured attraction, not a precise field bite-prevention percentage.", ["cdc", "wearables"]),
				use: finding("A scent is not a protective area", "A repellent ingredient at the wrist does not establish protection over exposed skin elsewhere.", "The wearable experiment distinguished the ineffective tested bracelets from an insecticide-releasing device that did reduce attraction.", "Delivery method and tested exposure, not all wearables grouped together.", "Advertised fragrance life or operating hours are not measured hours free of bites.", ["wearables"])
			} }
		}
	],
	limitations: [
		"The six approaches have different roles and are not an exhaustive list. Other registered ingredients, physical barriers and disease-specific measures remain relevant.",
		"Neither laboratory attraction nor first-landing time directly measures human infection risk. No clinical percentages, pooled estimates or consensus percentages are invented.",
		"WHO's newer indoor-malaria recommendation must not be overwritten by older blanket statements about spatial-disease evidence. Its outcome-specific certainty varies.",
		"Current labels, local vector conditions and sustained use matter. No product-by-product market survey or personalized travel or child-use plan was conducted.",
		"The methods review discloses inconsistent species-specific PMD medians in a 2018 paper; those numbers are withheld rather than silently repaired. Independent expert review has not been completed."
	],
	sources: [
		{ id: "cdc", ...pick(mosquitoSources.yellowBook), locator: "Topical repellents, efficacy, clothing, precautions and children sections" },
		{ id: "epa-use", ...pick(mosquitoSources.epaUse), locator: "Safe-use instructions and product-specific child-label exception" },
		{ id: "deet", ...pick(mosquitoSources.deet), locator: "Benefits and labeled use; historical counts are not current surveillance" },
		{ id: "clothing", ...pick(mosquitoSources.clothing), locator: "Covered-skin limits, effectiveness, washing and label sections" },
		{ id: "who", ...pick(mosquitoSources.who), locator: "2026 PDF pp. 86–92 and 346–348; coverage footnote on p. 348" },
		{ id: "wearables", ...pick(mosquitoSources.wearables), locator: "Methods, Tables 1–3 and discussion; 15-minute attraction endpoint" }
	]
};
function pick(source: typeof mosquitoSources.yellowBook) {
	return { title: source.title, url: source.url!, note: source.note };
}
