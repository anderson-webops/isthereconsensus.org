import type { ReadingGuideContent } from "./types";

export const aiWaterGuide: ReadingGuideContent = {
	takeaway:
		"AI runs on physical infrastructure with real electricity and water demands. A credible water estimate distinguishes withdrawals from consumption, cooling from electricity generation, and AI workloads from the wider data-center industry. There is no single water-per-query figure that these sources establish for every AI service.",
	scope: "An editorial guide to interpreting environmental accounting, not a site-specific water assessment, a personal footprint calculator or a verdict on a proposed facility. Selected original methods, findings and agency definitions were checked on October 8, 2026; independent expert review has not been completed. Related electricity reviews provide context, not substitute answers to AI-specific water questions.",
	sections: [
		{
			id: "water-accounting",
			title: "First ask what the water number counts",
			paragraphs: [
				{
					text: "A withdrawal is water taken from a surface-water or groundwater source. Consumption is the portion removed from the immediate water environment, for example through evaporation. Water can therefore be withdrawn and later returned without the entire withdrawal being consumed. These are different accounting quantities, not interchangeable descriptions of damage. When comparing two estimates, first check which quantity each reports and whether the same water sources are included.",
					sources: ["usgs-glossary"]
				},
				{
					text: "Calling evaporated water ‘destroyed’ is misleading: the accounting concerns its availability in the immediate water environment, not the disappearance of water molecules. Conversely, saying that water eventually returns through the water cycle does not establish that it is immediately available to the same community. The definition alone cannot establish a particular facility's ecological effects or permission to withdraw water; those need additional local evidence.",
					sources: ["usgs-glossary"]
				}
			]
		},
		{
			id: "operating-boundaries",
			title: "Cooling water and electricity-related water are separate",
			paragraphs: [
				{
					text: "Berkeley Lab's 2024 report estimated roughly 66 billion liters of direct water consumption by U.S. data centers in 2023, and nearly 800 billion liters indirectly through electricity generation. Both are modeled historical estimates for the wider industry, not measured AI-only totals or current global figures. Comparing only cooling water with an estimate that includes electricity generation creates a boundary mismatch.",
					sources: ["lbnl-2024"]
				},
				{
					text: "Water usage effectiveness, or WUE, also needs its denominator. In this report, site WUE is direct consumption divided by IT-equipment electricity, expressed in liters per kilowatt-hour. It is not liters per question. Electricity-generation water is a separate boundary; an apparently low site WUE does not by itself establish a small total operational water footprint.",
					sources: ["lbnl-2024"]
				}
			]
		},
		{
			id: "ai-allocation",
			title: "A data-center total is not automatically an AI total",
			paragraphs: [
				{
					text: "The 2025 Patterns perspective identifies an important disclosure gap: company environmental reports do not reliably separate AI from other workloads. Its AI-footprint estimates approximate AI using wider data-center performance metrics. That is an explicit estimation approach, not direct metering of every AI system. A company-wide water total, an estimated AI share and a measured task footprint should remain separately labeled rather than presented as three independent confirmations.",
					sources: ["patterns-disclosure"]
				},
				{
					text: "Berkeley Lab's ‘2025 Update’ was published in June 2026. Its electricity model separately represents AI servers, conventional servers, storage, networking and facility infrastructure. That separation matters even when AI drives much of the projected growth: a forecast for all data-center electricity is not a forecast for AI alone. Nor does an electricity forecast, without further water assumptions, become an observed water inventory.",
					sources: ["lbnl-update"]
				}
			]
		},
		{
			id: "per-query",
			title: "Why a bottle-per-query claim needs more information",
			paragraphs: [
				{
					text: "The IEA's 2026 assessment distinguishes simple text generation from reasoning, agentic tasks and video generation, which can have very different energy demands. It also describes improving task efficiency alongside growing use and changing capabilities. ‘One query’ is therefore not a fixed physical unit. A water estimate needs the workload and its electricity requirements as well as the relevant cooling and power-supply assumptions; a text-query estimate cannot simply be assigned to every AI task.",
					sources: ["iea-2026"]
				},
				{
					text: "Dividing a service's annual water estimate by its request count produces an allocated average under those boundaries. It does not establish how much additional water one extra request causes. This is an accounting distinction, not a measured result supplied by the perspective. Without AI-specific disclosure and a stated allocation method, neither an impressive bottle comparison nor a reassuring tiny average establishes the footprint of your particular request.",
					sources: ["patterns-disclosure"]
				}
			]
		},
		{
			id: "local-water",
			title: "Liters alone do not tell you the local consequences",
			paragraphs: [
				{
					text: "Siddik, Shehabi and Marston's 2021 study used 2018 U.S. infrastructure data to connect data centers with their water and electricity supplies. It modeled both a volumetric footprint and a water-scarcity footprint, finding that the geographic distribution of the latter differed from the former. This supports evaluating supply location and scarcity, not treating a national volume as a complete local-impact measure. Its historical estimates are not a current map of AI facilities.",
					sources: ["regional-footprint"]
				},
				{
					text: "USGS distinguishes surface water from groundwater and fresh water from saline water in its water-use accounting. It also describes developing national estimates through modeling. A claim about ‘water use’ should identify its source and estimation method before you infer that all of it competes with household drinking water. Conversely, a national total cannot demonstrate that a specific local supply has spare capacity. That question needs the applicable watershed and supply records.",
					sources: ["usgs-water-use"]
				}
			]
		},
		{
			id: "efficiency-and-growth",
			title: "Efficiency improvements and total growth can coexist",
			paragraphs: [
				{
					text: "An independently constructed hypothetical example makes the arithmetic clear: if each otherwise identical task uses half as much electricity, but the number of tasks triples, their combined electricity use becomes one and a half times the starting amount. These are illustrative numbers, not observations about a named model. The IEA discusses efficiency, uptake and capability changes together because improvements per task alone do not determine aggregate demand or the associated environmental burden.",
					sources: ["iea-2026"]
				},
				{
					text: "The June 2026 Berkeley Lab update presents a reference case and alternative scenarios, rather than certifying one inevitable future. Among its changing assumptions are equipment shipments, lifetime, utilization and inference demands. A scenario range describes sensitivity to such inputs, not automatically a statistical confidence interval. When comparing forecasts, check publication date, geography, target year and workload coverage before declaring that different numbers prove either fraud or certainty about future water use.",
					sources: ["lbnl-update"]
				}
			]
		},
		{
			id: "reading-a-claim",
			title: "Use a boundary checklist instead of a universal verdict",
			paragraphs: [
				{
					text: "Before accepting a water headline, write down its year, geography, water quantity, site-versus-supply boundary, AI allocation and whether it is measured, modeled or projected. This checklist is an editorial synthesis of the source limitations, not a validated environmental scoring tool. Separating those fields makes disagreement easier to investigate: two numbers may differ because they answer different questions, even if neither author made an arithmetic mistake.",
					sources: ["usgs-water-use", "patterns-disclosure"]
				},
				{
					text: "There is also no single environmental metric that answers every decision. The 2021 spatial study examines water and carbon together and identifies trade-offs when location choices optimize only one footprint. A lower carbon estimate therefore does not itself certify a lower scarcity burden, and a low national share does not certify an acceptable individual site. Use the related electricity reviews for broader context, but retain the separate AI-water evidence and local questions.",
					sources: ["regional-footprint"]
				}
			]
		}
	],
	questions: [
		"Does the headline count withdrawals or consumption, and which water sources?",
		"Does the estimate include site cooling, electricity generation, manufacturing or some combination?",
		"How was AI separated from the rest of the data-center workload?",
		"What year, location, task and denominator does a per-query estimate actually describe?",
		"Is this a measurement, modeled historical inventory or future scenario?",
		"What local supply evidence would change the interpretation?"
	],
	sources: [
		{
			id: "usgs-glossary",
			title: "USGS Water Science Glossary",
			url: "https://www.usgs.gov/water-science-school/science/water-science-glossary",
			kind: "Agency definitions",
			note: "Withdrawal and consumptive-use entries checked. Definitions do not establish a particular site's impacts."
		},
		{
			id: "lbnl-2024",
			title: "2024 United States Data Center Energy Usage Report",
			url: "https://doi.org/10.71468/P1WC7Q",
			kind: "National laboratory modeling report (2024)",
			note: "Sections 4 and 5 checked for operational definitions and 2023 estimates. Not AI-only measurements."
		},
		{
			id: "patterns-disclosure",
			title: "The carbon and water footprints of data centers and what this could mean for artificial intelligence",
			url: "https://doi.org/10.1016/j.patter.2025.101430",
			kind: "Journal perspective (first published December 2025)",
			note: "Original disclosure analysis and estimation boundaries checked through Europe PMC full text. Not direct AI metering or independent expert review."
		},
		{
			id: "lbnl-update",
			title: "United States Data Center Energy Usage Report: 2025 Update",
			url: "https://www.energy.gov/documents/united-states-data-center-energy-usage-report-2025-update",
			kind: "National laboratory modeling report (published June 2026)",
			note: "Executive summary, equipment categories and scenario methods checked. The title's year is not its publication date or a water measurement."
		},
		{
			id: "iea-2026",
			title: "IEA Key Questions on Energy and AI: executive summary (2026)",
			url: "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
			kind: "Agency energy assessment",
			note: "Task diversity, efficiency, uptake and scenario discussion checked. Energy comparisons do not establish universal liters per query."
		},
		{
			id: "regional-footprint",
			title: "The environmental footprint of data centers in the United States",
			url: "https://doi.org/10.1088/1748-9326/abfba1",
			kind: "Spatial modeling study (2021; 2018 inputs)",
			note: "Selected original methods and scarcity/trade-off results checked. Supplements, raw inputs and a current local reassessment were not audited."
		},
		{
			id: "usgs-water-use",
			title: "USGS Water Use in the United States",
			url: "https://www.usgs.gov/mission-areas/water-resources/science/water-use-united-states",
			kind: "Agency water-accounting overview",
			note: "Supply categories and national modeling scope checked. This overview is not a facility-specific water-supply certification."
		}
	]
};
