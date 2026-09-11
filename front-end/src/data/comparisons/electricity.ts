import type { EvidenceComparison } from "./types";

// A dated comparison synthesis, not a replacement for canonical claim reviews.
// Values are transcribed from Table 1, not calculated from phase medians.
export const electricityComparison: EvidenceComparison = {
	slug: "electricity-emissions",
	title: "Compare electricity emissions",
	description:
		"Compare generation technologies using the same published emissions measure, then check what the comparison leaves out.",
	checkedAt: "2026-09-11",
	datasetLabel: "NREL's September 2021 literature compilation",
	measureNote:
		"g CO₂e/kWh means grams of carbon-dioxide-equivalent emissions per kilowatt-hour. ≈ means approximately; < means less than, not an exact value.",
	topics: ["climate-and-environment", "energy-and-infrastructure"],
	guidePath: "/guides/comparing-electricity-options",
	reviews: [
		{
			path: "/consensus/climate-and-environment/do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
			label: "Lifecycle emissions of wind, solar, and fossil fuels"
		},
		{
			path: "/consensus/climate-and-environment/is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
			label: "Nuclear power and fossil-fuel health risks"
		}
	],
	outcomes: [
		{
			id: "lifecycle",
			label: "Total life-cycle emissions",
			unit: "g CO₂e/kWh",
			explanation: "Emissions across a generator's life, per unit of electricity generated."
		},
		{
			id: "upstream",
			label: "One-time upstream emissions",
			unit: "g CO₂e/kWh",
			explanation:
				"Materials and construction emissions spread over lifetime generation, not the whole life cycle."
		}
	],
	contexts: [
		{
			id: "generation",
			label: "Generation benchmark",
			explanation:
				"Published medians for generation technologies. These are not estimates for a particular plant.",
			supportsEstimates: true
		},
		{
			id: "whole-grid",
			label: "Choosing a whole grid",
			explanation:
				"These generator medians do not supply a matched whole-grid comparison. A local decision also needs demand, storage, networks, reliability, and costs. No winner is calculated here.",
			supportsEstimates: false
		}
	],
	options: [
		{
			id: "coal",
			label: "Coal",
			scope: "Coal generation",
			estimates: {
				lifecycle: { value: 1001, qualifier: "reported", sourceIds: ["nrel-2021"] },
				upstream: { value: 5, qualifier: "less_than", sourceIds: ["nrel-2021"] }
			}
		},
		{
			id: "gas",
			label: "Natural gas",
			scope: "Natural gas generation",
			estimates: {
				lifecycle: { value: 486, qualifier: "reported", sourceIds: ["nrel-2021"] },
				upstream: { value: 0.8, qualifier: "reported", sourceIds: ["nrel-2021"] }
			}
		},
		{
			id: "solar",
			label: "Solar PV",
			scope: "Thin-film and crystalline silicon",
			estimates: {
				lifecycle: { value: 43, qualifier: "reported", sourceIds: ["nrel-2021"] },
				upstream: { value: 28, qualifier: "approximately", sourceIds: ["nrel-2021"] }
			}
		},
		{
			id: "wind",
			label: "Wind",
			scope: "Land-based and offshore",
			estimates: {
				lifecycle: { value: 13, qualifier: "reported", sourceIds: ["nrel-2021"] },
				upstream: { value: 12, qualifier: "reported", sourceIds: ["nrel-2021"] }
			}
		},
		{
			id: "nuclear",
			label: "Nuclear",
			scope: "Light-water reactors only",
			estimates: {
				lifecycle: { value: 13, qualifier: "reported", sourceIds: ["nrel-2021"] },
				upstream: { value: 2, qualifier: "reported", sourceIds: ["nrel-2021"] }
			}
		}
	],
	limitations: [
		"Medians hide variation across studies and locations; no uncertainty interval is shown here.",
		"Phase and total medians can use different study pools. Do not subtract or add them to reconstruct a plant's emissions.",
		"Matching units makes a benchmark useful, not a head-to-head experiment or a complete policy ranking."
	],
	sources: [
		{
			id: "nrel-2021",
			title: "Life Cycle Greenhouse Gas Emissions from Electricity Generation: Update",
			url: "https://docs.nlr.gov/docs/fy21osti/80580.pdf",
			locator: "Table 1, page 3; methods on pages 1-3",
			note: "The table and footnotes were checked directly. This is a 2021 compilation of earlier studies, not new measurements in 2026. Underlying studies were not individually re-reviewed."
		}
	]
};
