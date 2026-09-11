import type { ComparisonEstimate, EvidenceComparison } from "./types.js";
import { heatingPracticalClaims, heatingSources } from "../claim-expansion-practical-heating.js";

// Figure 3 reports rounded positive shares. Do not reconstruct them from the
// separately rounded negative shares in the prose, or turn them into personal odds.
function share(value: number, interpretation: string): ComparisonEstimate {
	return { value, qualifier: "reported", sourceIds: ["wilson"], interpretation };
}

const billMeaning = "Share of modeled households with lower annual energy bills than the replacement reference. Not the percentage reduction in a bill, not an individual's probability, and not expert agreement.";
const npvMeaning = "Share with positive unsubsidized net present value: discounted bill savings exceed incremental investment over 16 years at a 3.4% real discount rate. Not the size of the return or a guaranteed payback.";

export const heatingComparison: EvidenceComparison = {
	slug: "home-heat-pump-upgrades",
	title: "Compare heat-pump upgrade packages",
	description: "Compare minimum, medium and high-efficiency cold-climate heat pumps, with or without building-envelope upgrades: lower energy bills and lower lifetime costs are different outcomes.",
	checkedAt: "2026-09-11",
	readerUpdates: [{ id: "f1ae8aa7-5a6d-4999-92a2-e9e1a04ed74c", date: "2026-09-11T23:00:27.000Z", kind: "new_comparison", bottomLineImpact: "new", summary: "Added six modeled heat-pump upgrade packages, separating annual bill savings from lifetime financial value and excluding personal or current-price predictions.", sourceIds: ["wilson"] }],
	datasetLabel: "Wilson et al. (Joule, 2024): US housing-stock simulation, winter 2021–22 prices",
	measureNote: "Each value is the rounded percentage of modeled households with a positive result, not the amount saved, a personal probability or a scientific consensus percentage. All six packages use the same study framework. Bill savings and lifetime net present value are different measures; the model does not report a confidence interval for these displayed shares.",
	resultNote: "Higher efficiency improves the share with bill savings in this model, but its assumed purchase costs reduce the share with positive lifetime financial value. These historical scenarios do not establish today's best purchase.",
	protocolNote: "550,000 representative US households were simulated, not metered. Air-to-air systems are ducted or ductless according to the home's existing setup. The reference replaces heating and cooling equipment, rather than keeping an old system indefinitely. Every upgrade package includes sealing and insulating ducts in unconditioned space where present. New cooling service in previously uncooled homes can add electricity use and benefits not fully monetized here.",
	topics: ["energy-and-infrastructure", "climate-and-environment"],
	guidePath: "/guides/comparing-electricity-options",
	reviews: [
		{ path: "/consensus/energy-and-infrastructure/can-modern-heat-pumps-work-efficiently-in-cold-climates", label: "Heat pumps in cold climates" },
		{ path: "/consensus/climate-and-environment/do-heat-pumps-usually-cut-home-heating-emissions-compared-with-fossil-fuel-heating", label: "Heating emissions are a separate outcome" },
		...heatingPracticalClaims.map(claim => ({ path: `/consensus/${claim.topicSlug}/${claim.slug}`, label: claim.title }))
	],
	outcomes: [
		{ id: "bill-savings", label: "Homes with lower energy bills", unit: "% of modeled households", explanation: "The share with positive annual bill savings relative to replacement equipment. This does not measure how large the savings are." },
		{ id: "lifetime-value", label: "Homes with positive lifetime value", unit: "% of modeled households", explanation: "The share with positive unsubsidized net present value over an assumed 16-year life, using a 3.4% real discount rate and incremental installation costs." }
	],
	contexts: [
		{ id: "without-envelope", label: "Model: without envelope upgrades", supportsEstimates: true, explanation: "Winter 2021–22 US prices; heat-pump package without the additional attic, wall and window measures. Duct sealing and insulation are still included where applicable." },
		{ id: "with-envelope", label: "Model: with envelope upgrades", supportsEstimates: true, explanation: "The same price scenario plus the study's building-envelope package, applied according to eligibility: attic air sealing/insulation, wall insulation with re-siding and low-e storm windows. Costs are included, not treated as free." },
		{ id: "your-home", label: "Your home or current prices", supportsEstimates: false, explanation: "These national, historical model shares do not estimate your current bill or payback. Local quotes, tariffs, financing, equipment condition, heat loss and comfort needs would be needed for a separate assessment." },
		{ id: "other-systems", label: "Air-to-water or ground-source systems", supportsEstimates: false, explanation: "The cost model covers air-to-air upgrades in the US. Its figures cannot be borrowed for water-based radiators, ground loops, other countries or commercial buildings. Missing matched estimates do not mean no benefit." }
	],
	options: [
		{
			id: "minimum",
			label: "Minimum-efficiency package",
			scope: "The paper's lower-performance air-to-air package, not a statement of today's legal minimum or a named product.",
			estimates: {},
			estimatesByContext: {
				"without-envelope": { "bill-savings": share(62, billMeaning), "lifetime-value": share(55, npvMeaning) },
				"with-envelope": { "bill-savings": share(82, billMeaning), "lifetime-value": share(39, npvMeaning) }
			}
		},
		{
			id: "medium",
			label: "Medium-efficiency package",
			scope: "The paper's intermediate performance and cost assumptions, with ducted or ductless equipment as appropriate.",
			estimates: {},
			estimatesByContext: {
				"without-envelope": { "bill-savings": share(86, billMeaning), "lifetime-value": share(41, npvMeaning) },
				"with-envelope": { "bill-savings": share(94, billMeaning), "lifetime-value": share(28, npvMeaning) }
			}
		},
		{
			id: "cold-climate",
			label: "High-efficiency cold-climate package",
			scope: "The paper's high-performance package has better cold-weather capacity retention and higher assumed installed costs.",
			estimates: {},
			estimatesByContext: {
				"without-envelope": { "bill-savings": share(95, billMeaning), "lifetime-value": share(21, npvMeaning) },
				"with-envelope": { "bill-savings": share(97, billMeaning), "lifetime-value": share(15, npvMeaning) }
			}
		}
	],
	limitations: [
		"One housing-stock simulation, not six independent field trials. The packages differ in equipment, sizing and costs, not only a single efficiency number.",
		"Main energy prices represent winter 2021–22. The paper's old SEER/HSPF metrics and historical subsidy discussions are not current product requirements or incentive advice.",
		"Lifetime value assumes 16 years and a 3.4% real discount rate. The charts exclude subsidies; current financing and installation quotes can change the ordering.",
		"The envelope package was not optimized separately for each home. Its financial result does not prove that insulation is unnecessary or that comfort has no value.",
		"Displayed values are Figure 3's rounded positive shares. Do not subtract separately rounded negative shares from 100 to recreate them, or interpret 62% as a 62% bill reduction.",
		"Selecting the best of six packages gives a different result from installing one package everywhere. None of these distributions selects a personal purchase or design."
	],
	sources: [{ id: "wilson", title: heatingSources.cost.title, url: heatingSources.cost.url!, locator: "Figure 3 (printed p. 1005); Tables 1–2 (pp. 1020–1021); NPV methods (p. 1031)", note: heatingSources.cost.note! }]
};
