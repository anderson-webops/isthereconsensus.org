import type { ReadingGuideContent } from "./types";

export const energyGuide: ReadingGuideContent = {
	takeaway:
		"Wind, solar, and nuclear power have low lifecycle greenhouse-gas emissions compared with unabated fossil-fuel generation. Choosing a reliable, affordable system still requires comparing timing, infrastructure, health, and local constraints.",
	scope: "A framework for reading electricity comparisons, not a price forecast or a prescription for every country. Lifecycle studies, historical health assessments, and system models answer different questions.",
	sections: [
		{
			id: "boundaries",
			title: "Compare the same service and the same boundaries",
			paragraphs: [
				{
					text: "A fair emissions comparison includes construction, fuel supply where applicable, operation, and end-of-life activity. NREL's lifecycle synthesis finds that fossil-fuel generation produces most of its greenhouse-gas emissions during operation, while much of the footprint of nuclear and renewables occurs before operation. Including manufacturing does not make the technologies equivalent: the overall lifecycle footprints still differ substantially.",
					sources: ["nrel"]
				},
				{
					text: "The comparison also needs a denominator. Emissions per unit of generated electricity answer a different question from the total emissions of an entire grid. A large low-emission project can have a visible construction footprint while displacing a much larger continuing source of emissions. Compare like with like before interpreting a dramatic photograph or a standalone tonnage figure.",
					sources: ["nrel"]
				}
			]
		},
		{
			id: "health",
			title: "Routine harms belong beside rare accidents",
			paragraphs: [
				{
					text: "A 2007 Lancet review compared electricity technologies using fuel-cycle health assessments, largely developed in European studies. It found the largest burdens for the most air-polluting fossil fuels, smaller burdens for gas, and lower burdens for nuclear. This helps explain why counting spectacular accidents alone can misrepresent a technology's overall health burden.",
					sources: ["health"]
				},
				{
					text: "The review is old and should not be used as a current, universal death-rate calculator. It also explicitly identifies concerns about nuclear waste, severe accidents, security, and proliferation. A lower estimated routine health burden does not make those concerns imaginary; it means they need their own treatment rather than being mixed into an undefined label such as ‘dangerous.’",
					sources: ["health"]
				}
			]
		},
		{
			id: "reliability",
			title: "Generating electricity and matching demand are different jobs",
			paragraphs: [
				{
					text: "Wind and solar output varies with conditions. The IEA's 2024 integration assessment distinguishes early stages, where operational changes can address many challenges, from high-share systems requiring more extensive changes in planning and operation. Neither ‘variability makes renewables unusable’ nor ‘variability no longer matters’ describes that evidence well.",
					sources: ["iea"]
				},
				{
					text: "Useful measures include improved forecasting, more flexible demand and generation, stronger networks, and storage. Their value depends on the system already in place. The IEA describes integration as a progressive set of engineering and institutional tasks, not a single storage purchase that automatically solves every mismatch between supply and demand.",
					sources: ["iea"]
				},
				{
					text: "IPCC's energy-systems assessment likewise treats storage, transmission, electrification, and generation as interacting parts. Storage can move energy between times and provide grid services, while interconnected regions can share resources. A comparison of isolated generators can therefore miss costs and benefits that appear only when the rest of the system is included.",
					sources: ["ipcc"]
				}
			]
		},
		{
			id: "storage",
			title: "Storage has both a power rating and an energy limit",
			paragraphs: [
				{
					text: "NREL distinguishes power capacity, the rate at which storage can deliver electricity, from energy capacity, the amount it can store. Reporting only one can hide an important limit. As a deliberately simplified arithmetic example, a 100 MW device with 400 MWh of usable stored energy could deliver its rated output for four hours, ignoring losses and operating constraints. That does not establish its ability to cover a multi-day shortfall.",
					sources: ["nrel"]
				},
				{
					text: "The example is not a description of a particular battery or grid. It shows why the service being purchased must be explicit: brief system support and prolonged energy supply are not identical tasks. The IEA's integration framework links different phases to different flexibility needs, so a technology that helps with one task should not be assumed sufficient for every other one.",
					sources: ["iea"]
				}
			]
		},
		{
			id: "tradeoffs",
			title: "Scientific findings narrow choices without selecting every policy",
			paragraphs: [
				{
					text: "The IPCC identifies multiple low-carbon pathways and emphasizes that technical options operate within infrastructure, finance, institutions, and social conditions. An emissions finding does not by itself decide the preferred combination for a particular location. Relevant questions include what can be built, what must be replaced, and which constraints are binding over the period being considered.",
					sources: ["ipcc"]
				},
				{
					text: "A useful local comparison should state whether it concerns keeping an existing asset, constructing a new one, or replacing an entire system. Those are different decisions. This guide deliberately avoids a universal price ranking: a ranking without its location, financing assumptions, system boundaries, and date could conceal more than it explains.",
					sources: ["ipcc"]
				}
			]
		},
		{
			id: "read-the-comparison",
			title: "A practical way to read the next energy claim",
			paragraphs: [
				{
					text: "Imagine two competing proposals, one advertised as ‘clean’ and the other as ‘reliable.’ Ask both proposals to report the same services and boundaries before deciding which word is more persuasive. This is an editorial comparison exercise: list emissions, health effects, demand coverage, costs, and unresolved assumptions separately. Then distinguish evidence about those outcomes from the values used to weigh them.",
					sources: []
				}
			]
		}
	],
	questions: [
		"Are construction, operation, fuel supply, and end-of-life included for every option?",
		"Is the comparison per unit of electricity or for a complete functioning system?",
		"Does the health comparison include routine pollution as well as accidents?",
		"Which period, location, reliability requirement, and financing assumptions does the proposal use?"
	],
	sources: [
		{
			id: "ipcc",
			title: "IPCC AR6 WGIII (2022), Chapter 6: Energy systems",
			url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-6/",
			kind: "Scientific assessment",
			note: "Relevant energy-system, storage, and transmission sections checked. A global assessment, not a local project appraisal."
		},
		{
			id: "nrel",
			title: "NREL (2021): Life Cycle Greenhouse Gas Emissions from Electricity Generation, Update",
			url: "https://docs.nlr.gov/docs/fy21osti/80580.pdf",
			kind: "Lifecycle synthesis",
			note: "Lifecycle boundaries and storage capacity distinctions checked. Technology estimates have assumptions and ranges."
		},
		{
			id: "iea",
			title: "IEA (2024): Integrating Solar and Wind",
			url: "https://www.iea.org/reports/integrating-solar-and-wind",
			kind: "Power-system assessment",
			note: "Overview, integration framework, and executive-summary findings checked. Not a claim that every grid has identical integration needs."
		},
		{
			id: "health",
			title: "Markandya and Wilkinson (2007): Electricity generation and health",
			url: "https://pubmed.ncbi.nlm.nih.gov/17876910/",
			kind: "Comparative evidence review",
			note: "Abstract checked. Historical, largely European fuel-cycle evidence; not a current worldwide numerical risk estimate."
		}
	]
};
