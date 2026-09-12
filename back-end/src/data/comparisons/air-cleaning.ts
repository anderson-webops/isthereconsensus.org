import type { ComparisonEstimate, EvidenceComparison } from "./types.js";
import { airPracticalClaims, airSources } from "../claim-expansion-practical-air.js";

function measure(value: number, variation: number, unit: string): ComparisonEstimate {
	return {
		value,
		qualifier: "reported",
		sourceIds: ["holder"],
		interpretation: `Table 2 reports ${value} ± ${variation} ${unit}. This variation is not a 95% confidence interval.`
	};
}
// Same experiment and specified operating settings, not values pooled from
// different test aerosols or a market-wide ranking of device categories.
const configurations = [
	{
		id: "single-filter",
		label: "Single-filter box fan",
		scope: "Fan A on high with one clean 1-inch MERV 13 filter taped to its inlet; no shroud.",
		cadr: 111.2,
		variation: 1.3,
		power: 77.1,
		powerVariation: 0.8
	},
	{
		id: "shrouded",
		label: "Single filter with shroud",
		scope: "The same fan and filter on high, with a cardboard outlet shroud to limit recirculation.",
		cadr: 156.1,
		variation: 3.6,
		power: 77.6,
		powerVariation: 0.2
	},
	{
		id: "four-filter",
		label: "Four-filter Corsi-Rosenthal box",
		scope: "Fan A on high, four clean 1-inch MERV 13 filters and a shroud; larger footprint and more assembly.",
		cadr: 400.9,
		variation: 30.7,
		power: 76.0,
		powerVariation: 1.1
	},
	{
		id: "commercial",
		label: "Small commercial comparator",
		scope: "One small commercial air cleaner on turbo. It is not representative of all commercial models or lower-speed operation.",
		cadr: 118.9,
		variation: 0.7,
		power: 41.1,
		powerVariation: 0.2
	}
];
export const airCleaningComparison: EvidenceComparison = {
	slug: "particle-air-cleaner-designs",
	guidance: { text: "For DIY units, follow EPA guidance on newer safety-marked fans, manufacturer precautions and working smoke alarms. Limited testing does not certify every assembly. Particle cleaning does not remove all gases or replace source control and appropriate ventilation. Avoid intentionally ozone-producing cleaners in occupied spaces.", sourceIds: ["epa-diy", "epa-guide"] },
	title: "Compare particle air-cleaner designs",
	description:
		"DIY box fans, shrouds, four-filter boxes and a commercial comparator: compare smoke-particle clean-air delivery and electrical power in one laboratory study.",
	checkedAt: "2026-09-11",
	readerUpdates: [
		{
			id: "0f56673d-2d72-4b75-8d27-8300bb2d47d9",
			date: "2026-09-11T23:35:23.000Z",
			kind: "new_comparison",
			bottomLineImpact: "new",
			summary:
				"Added matched laboratory particle-cleaning and power results for four specified designs, with explicit limits for household, gas and health outcomes.",
			sourceIds: ["holder"]
		}
	],
	datasetLabel: "Holder, Halliday and Virtaranta (Indoor Air, 2022), Table 2",
	measureNote:
		"CADR is clean-air delivery in cubic feet per minute (CFM); higher means faster particle cleaning under these test conditions. Watts measure electrical power, not electricity per day. Neither is a percentage reduction in household pollution, disease risk or scientific agreement. The plus/minus figures are reported variation, not relabeled confidence intervals.",
	resultNote:
		"The four-filter box delivered more clean air at similar power to the simpler DIY designs; the small commercial unit drew less power. These are different trade-offs, not a universal winner or a current shopping recommendation.",
	protocolNote:
		"A 29.3 m³ well-mixed chamber with generated pine-needle smoke, clean electret filters and at least three replicates per condition. DIY fans were on high; the commercial unit was on turbo. The AHAM-based protocol used a continuous makeup-air flow and subtracted natural particle decay. Some high-CADR results varied with initial smoke concentration. No people or clinical outcomes were tested.",
	topics: ["climate-and-environment", "health-and-medicine"],
	guidePath: "/guides/choosing-air-cleaning",
	reviews: [
		{
			path: "/consensus/climate-and-environment/do-portable-hepa-air-cleaners-reduce-indoor-fine-particle-pollution",
			label: "What particle filtration can accomplish"
		},
		...airPracticalClaims.map(claim => ({
			path: `/consensus/${claim.topicSlug}/${claim.slug}`,
			label: claim.title
		}))
	],
	outcomes: [
		{
			id: "clean-air",
			label: "Smoke-particle clean-air delivery",
			unit: "CFM",
			explanation:
				"Volume of particle-cleaned air per minute in the chamber. This is not the fan's total airflow or a percentage removed from a home."
		},
		{
			id: "power",
			label: "Electrical power while running",
			unit: "W",
			explanation:
				"Measured power at the tested setting. Lower power is not automatically better cleaning per unit of electricity, and daily consumption also depends on runtime."
		}
	],
	contexts: [
		{
			id: "laboratory",
			label: "Tested designs in the laboratory",
			supportsEstimates: true,
			explanation:
				"Matched 2022 chamber test with specified filters and fan settings. Read the reported variation and scope, not just the headline value."
		},
		{
			id: "occupied-home",
			label: "Your home or a different device",
			supportsEstimates: false,
			explanation:
				"Room mixing, sources, filter aging, noise and actual runtime differ. These measurements cannot be converted into a reliable personal exposure reduction or borrowed for other products."
		},
		{
			id: "gases",
			label: "Gases and odors",
			supportsEstimates: false,
			explanation:
				"Particle CADR does not measure gas removal. HEPA or MERV filters do not become carbon-monoxide controls, and a sorbent needs separate gas-specific evidence."
		},
		{
			id: "health",
			label: "Symptoms or infection risk",
			supportsEstimates: false,
			explanation:
				"This chamber experiment did not test people, symptoms or infections. Missing matched health estimates do not prove that reducing particle exposure has no benefit."
		}
	],
	options: configurations.map(item => ({
		id: item.id,
		label: item.label,
		scope: item.scope,
		estimates: {},
		estimatesByContext: {
			laboratory: {
				"clean-air": measure(item.cadr, item.variation, "CFM"),
				"power": measure(item.power, item.powerVariation, "W")
			}
		}
	})),
	limitations: [
		"One study, a small set of fans and filters, and one small commercial unit. This is not a market-wide comparison or an independent replication for each design.",
		"At least three replicates per condition characterize this test, not variability across all manufactured units. Reported variation is not shown as a 95% confidence interval.",
		"Test aerosol and concentration can affect CADR. Results from different aerosols or measurement protocols cannot be pooled into this ranking.",
		"Noise measurements depended on orientation and microphone position; no universal loudness ranking is inferred. A device people turn off may deliver little benefit.",
		"The study's highly loaded filters lost effectiveness; the loading procedure does not establish a replacement interval for all filters. No current-price or lifetime-cost comparison is provided."
	],
	sources: [
		{
			id: "holder",
			title: airSources.lab.title,
			url: airSources.lab.url!,
			locator: "Tables 1–2; experimental methods; sections 3.3, 3.6 and 3.9",
			note: airSources.lab.note
		},
		{
			id: "epa-diy",
			title: airSources.diyGuidance.title,
			url: airSources.diyGuidance.url!,
			locator: "EPA particle-removal findings, UL safety findings and FAQs",
			note: airSources.diyGuidance.note
		},
		{
			id: "epa-guide",
			title: airSources.consumer.title,
			url: airSources.consumer.url!,
			locator: "Particle versus gas filters, CADR, operating speed and ozone caution",
			note: airSources.consumer.note
		}
	]
};
