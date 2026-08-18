import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheThreeSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026EnergyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Does natural gas have lower climate emissions than coal after methane leakage?",
		slug: "does-natural-gas-have-lower-climate-emissions-than-coal-after-methane-leakage",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually, but not automatically. Gas-fired electricity emits less carbon dioxide at combustion than coal and often has lower lifecycle warming emissions, yet methane released during production and delivery can shrink or erase that advantage in leaky systems, especially over shorter time horizons. Neither fuel is low-carbon.",
		stableCore: [
			"Modern combined-cycle gas plants generally burn fuel more efficiently and emit less carbon dioxide per unit of electricity than coal plants.",
			"Methane is a powerful, relatively short-lived greenhouse gas, so leakage rates and the time horizon used to compare warming materially affect the result.",
			"Measured emissions vary greatly among basins and operators, with a small number of high-emitting sites often contributing a large share."
		],
		openQuestions: [
			"How quickly will measurement-based regulations reduce persistent super-emitter and abandoned-well emissions?",
			"For which supply chains and power plants does gas retain a lifecycle advantage under measured rather than reported leakage?"
		],
		whatWouldChangeMinds: [
			"Representative full-supply-chain measurements showing that leakage is consistently high enough to reverse the gas-versus-coal comparison.",
			"New lifecycle syntheses showing that plant efficiency, methane chemistry, or upstream emissions were systematically mischaracterized."
		],
		misconceptions: [
			"Calling gas cleaner than coal does not make it clean or compatible with every climate pathway.",
			"A single national leakage percentage does not describe every basin, company, or shipment.",
			"Combustion-only carbon dioxide figures omit upstream methane and processing emissions."
		],
		editorSummary:
			"The defensible comparison is conditional: gas often beats coal on lifecycle climate emissions, but the margin depends on plant efficiency, methane leakage, and the chosen warming horizon. The larger decarbonization question is not settled by choosing the less-emitting fossil fuel.",
		uncertaintySummary:
			"Coal combustion emissions are well measured. The largest uncertainty is upstream methane, which is uneven, intermittently monitored, and sensitive to system boundaries and atmospheric time horizon.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 6: Energy Systems",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-6/",
				note: "Assessment of lifecycle emissions, methane leakage, fossil-fuel substitution, and pathways toward low-carbon energy systems."
			},
			{
				kind: "landmark_study",
				title: "Assessment of methane emissions from the U.S. oil and gas supply chain",
				publisher: "Science",
				year: 2018,
				url: "https://doi.org/10.1126/science.aar7204",
				doi: "10.1126/science.aar7204",
				note: "Measurement-based estimate showing that U.S. oil and gas methane emissions exceeded inventory estimates and materially affect climate comparisons."
			},
			{
				kind: "consensus_statement",
				title: "Global Methane Tracker 2025",
				publisher: "International Energy Agency",
				year: 2025,
				url: "https://www.iea.org/reports/global-methane-tracker-2025",
				note: "Current sector-wide assessment of fossil methane emissions, measurement gaps, super-emitters, and available abatement."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Can modern heat pumps work efficiently in cold climates?",
		slug: "can-modern-heat-pumps-work-efficiently-in-cold-climates",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Properly selected cold-climate heat pumps can provide efficient heating well below freezing. Performance falls as outdoor temperatures drop, so climate-specific sizing, installation quality, the building envelope, refrigerant choice, and backup strategy determine comfort, cost, and peak electricity demand.",
		stableCore: [
			"A heat pump moves heat rather than creating all of it resistively, allowing useful heat output to exceed the electricity it consumes.",
			"Variable-speed compressors and cold-climate designs maintain useful capacity at temperatures where older systems struggled.",
			"Field performance depends on correct sizing, ducts or distribution, controls, defrost cycles, and whether backup heat is configured sensibly."
		],
		openQuestions: [
			"Which retrofit packages produce the best household economics across electricity tariffs and existing building conditions?",
			"How should grids and programs manage winter peaks as heat-pump adoption grows in very cold regions?"
		],
		whatWouldChangeMinds: [
			"Independent field studies showing that certified cold-climate models routinely fail to maintain capacity or efficiency under their rated conditions.",
			"Long-duration monitoring demonstrating that apparent performance is mostly an artifact of mild test periods or hidden resistance heating."
		],
		misconceptions: [
			"A system working below freezing does not mean its efficiency and output stay constant at every temperature.",
			"Heat-pump suitability is not decided by latitude alone; the house, equipment, installer, and tariff matter.",
			"Efficient operation does not guarantee lower bills in every market."
		],
		editorSummary:
			"The old claim that heat pumps simply do not work in cold places is obsolete. The useful consumer question is whether a particular cold-climate system has been designed and installed for the building and local winter extremes.",
		uncertaintySummary:
			"Laboratory capability is clear, while realized seasonal performance and cost vary with equipment, installation, weather, electricity prices, and backup operation.",
		sources: [
			{
				kind: "guideline",
				title: "Residential Cold Climate Heat Pump Challenge",
				publisher: "U.S. Department of Energy",
				year: 2026,
				url: "https://www.energy.gov/cmei/buildings/residential-cold-climate-heat-pump-challenge",
				note: "Program criteria and validated performance context for modern heat pumps designed for cold-weather operation."
			},
			{
				kind: "landmark_study",
				title: "Field Validation of Air-Source Heat Pumps in Cold Climates, 2021-2023",
				publisher: "National Renewable Energy Laboratory",
				year: 2024,
				url: "https://heatpumpdata.energy.gov/data/studies/nrel-field-validation-air-source-heat-pumps-cold-climates-2021-2023",
				note: "Public field dataset documenting installed cold-climate air-source heat-pump operation and performance."
			},
			{
				kind: "consensus_statement",
				title: "The Future of Heat Pumps",
				publisher: "International Energy Agency",
				year: 2022,
				url: "https://www.iea.org/reports/the-future-of-heat-pumps",
				note: "International assessment of heat-pump efficiency, cold-region deployment, costs, and power-system implications."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Can short-duration batteries by themselves cover every grid reliability need?",
		slug: "can-short-duration-batteries-by-themselves-cover-every-grid-reliability-need",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Lithium-ion and other short-duration batteries are highly useful for fast response, reserves, and shifting electricity across hours, but a grid also needs resources for prolonged shortages, seasonal variation, transmission constraints, black start, and extreme events. The reliable mix depends on the system.",
		stableCore: [
			"Batteries can respond within fractions of a second and are effective for frequency control, ramping, reserves, and daily energy shifting.",
			"A battery's power rating and energy duration are separate limits; a four-hour system cannot indefinitely cover a multi-day supply gap.",
			"Reliability planning can combine storage durations with transmission, flexible demand, diverse generation, firm low-carbon supply, and operational reserves."
		],
		openQuestions: [
			"Which long-duration technologies can become cost-effective at scale for different regions and weather risks?",
			"How should capacity accreditation reflect storage state of charge during correlated multi-day events?"
		],
		whatWouldChangeMinds: [
			"System-wide demonstrations showing short-duration batteries alone can satisfy all reliability services through representative extreme years.",
			"New storage economics making very long energy duration routine without changing the technology category being assessed."
		],
		misconceptions: [
			"Saying batteries cannot do everything does not mean they are unimportant or unreliable.",
			"Installed gigawatts describe discharge power, not how many hours the fleet can sustain that output.",
			"No single resource has to solve every grid need for a portfolio to be reliable."
		],
		editorSummary:
			"Short-duration batteries solve several valuable reliability problems, but duration matters. Claims that batteries are either useless or a complete stand-alone grid are both too broad.",
		uncertaintySummary:
			"The service capabilities are established. The uncertain part is the least-cost regional portfolio as demand, transmission, weather, market rules, and long-duration technologies evolve.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Storage Futures Study: Key Learnings for the Coming Decades",
				publisher: "National Renewable Energy Laboratory",
				year: 2022,
				url: "https://www.osti.gov/biblio/1863547",
				doi: "10.2172/1863547",
				note: "Multi-report synthesis distinguishing short-duration storage services from longer-duration and system-wide reliability needs."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 6: Energy Systems",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-6/",
				note: "Assessment of storage, grid flexibility, transmission, demand response, and firm resources in low-emission power systems."
			},
			{
				kind: "guideline",
				title: "Long-Duration Energy Storage",
				publisher: "U.S. Department of Energy",
				year: 2024,
				url: "https://www.energy.gov/cmei/oced/long-duration-energy-storage",
				note: "Defines long-duration storage and the demonstration need for systems that cover gaps beyond common short-duration battery applications."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Can lithium-ion batteries be recycled and their materials recovered?",
		slug: "can-lithium-ion-batteries-be-recycled-and-their-materials-recovered",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Industrial processes can recover lithium, nickel, cobalt, copper, aluminum, and other materials from used lithium-ion batteries. Actual collection, recovery yield, economics, safety, and environmental performance vary by battery chemistry and process, and recycling will complement rather than eliminate new mining as demand grows.",
		stableCore: [
			"Pyrometallurgical, hydrometallurgical, and direct-recycling routes recover different materials with different energy, chemical, and purity tradeoffs.",
			"Manufacturing scrap is easier to collect today than dispersed end-of-life vehicle and consumer batteries.",
			"Design for disassembly, labeling, transport rules, and producer responsibility can materially improve a circular battery supply chain."
		],
		openQuestions: [
			"Which direct-recycling methods can preserve cathode value across rapidly changing chemistries at commercial scale?",
			"How quickly can collection systems and domestic processing capacity keep pace with the future wave of retired vehicle batteries?"
		],
		whatWouldChangeMinds: [
			"Commercial mass-balance studies showing that claimed material recovery cannot be reproduced safely or economically.",
			"Lifecycle evidence that mature recycling routes consistently cause greater impacts than equivalent primary production."
		],
		misconceptions: [
			"Technical recyclability does not mean every battery is currently collected and recycled.",
			"A high recovery percentage for one metal does not describe recovery of the entire battery.",
			"Recycling reduces future mining pressure but cannot instantly supply a rapidly expanding battery fleet from a small stock of retired cells."
		],
		editorSummary:
			"Battery recycling is real industrial chemistry, not a hypothetical. The unsettled questions concern collection, process choice, economics, and how much primary material a growing market will still require.",
		uncertaintySummary:
			"Recovery feasibility is strong; comparative lifecycle performance and commercial yields remain chemistry- and facility-specific, and public statistics often mix collection with final recovery.",
		sources: [
			{
				kind: "systematic_review",
				title: "Recycling lithium-ion batteries from electric vehicles",
				publisher: "Nature",
				year: 2019,
				url: "https://doi.org/10.1038/s41586-019-1682-5",
				doi: "10.1038/s41586-019-1682-5",
				note: "Authoritative review of battery composition, recycling routes, recovery opportunities, safety, and design barriers."
			},
			{
				kind: "consensus_statement",
				title: "Recycling of Critical Minerals",
				publisher: "International Energy Agency",
				year: 2024,
				url: "https://www.iea.org/reports/recycling-of-critical-minerals",
				note: "Assessment of recycling's potential contribution, collection constraints, policy needs, and continuing primary supply requirements."
			},
			{
				kind: "guideline",
				title: "DOE Announces Battery Recycling Prize Phase III Winners",
				publisher: "U.S. Department of Energy",
				year: 2022,
				url: "https://www.energy.gov/cmei/ammto/articles/doe-announces-battery-recycling-prize-phase-iii-winners",
				note: "Official program context focused on safe collection, sorting, transport, and recovery of end-of-life lithium-ion batteries."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Does clean-energy mineral mining have environmental and social costs?",
		slug: "does-clean-energy-mineral-mining-have-environmental-and-social-costs",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Mining and processing lithium, copper, nickel, cobalt, graphite, and rare-earth elements can disturb land, use and pollute water, generate waste, expose workers, and affect nearby and Indigenous communities. Cleaner energy systems still require responsible siting, labor protections, traceability, recycling, and demand efficiency.",
		stableCore: [
			"Different minerals, ore grades, extraction methods, energy sources, and local water conditions produce very different impact profiles.",
			"Supply chains can concentrate environmental burdens and human-rights risks far from the people using the final technology.",
			"Fossil extraction also has large ongoing impacts; acknowledging mineral harms is necessary for comparison and mitigation, not a reason to pretend the energy transition has no net benefit."
		],
		openQuestions: [
			"Which standards and traceability systems most reliably improve conditions without displacing harm into informal supply chains?",
			"How much can material substitution, smaller vehicles, recycling, and longer product life reduce cumulative demand?"
		],
		whatWouldChangeMinds: [
			"Representative lifecycle and community studies finding no material environmental or social burden across major mineral supply chains.",
			"Evidence that current governance measures consistently prevent the documented water, waste, labor, and consent failures."
		],
		misconceptions: [
			"Low operational emissions do not make a technology material-free.",
			"One especially harmful mine does not describe every deposit or production method.",
			"Comparing harms requires common functional units and full lifecycles rather than counting only visible mines on one side."
		],
		editorSummary:
			"The consensus is not that clean energy is impact-free. It is that mineral impacts are real, heterogeneous, governable to a degree, and should be compared with the extraction and emissions displaced over a technology's life.",
		uncertaintySummary:
			"The categories of harm are well documented; project-specific magnitude, informal production, cumulative water effects, and future demand depend on technology and governance choices.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Sustainable and Responsible Critical Mineral Supply Chains",
				publisher: "International Energy Agency",
				year: 2023,
				url: "https://www.iea.org/reports/sustainable-and-responsible-critical-mineral-supply-chains",
				note: "International assessment of water, emissions, biodiversity, waste, labor, community, and Indigenous-rights risks in mineral supply chains."
			},
			{
				kind: "consensus_statement",
				title: "The Role of Critical Minerals in Clean Energy Transitions",
				publisher: "International Energy Agency",
				year: 2021,
				url: "https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions",
				note: "Technology and demand assessment explaining both strategic mineral needs and the importance of responsible development."
			},
			{
				kind: "systematic_review",
				title: "Sustainable minerals and metals for a low-carbon future",
				publisher: "Science",
				year: 2020,
				url: "https://doi.org/10.1126/science.aaz6003",
				doi: "10.1126/science.aaz6003",
				note: "Review of material demand, environmental tradeoffs, recycling, substitution, and governance for low-carbon technologies."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Is green hydrogen the most efficient choice for every energy use?",
		slug: "is-green-hydrogen-the-most-efficient-choice-for-every-energy-use",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Making hydrogen with electricity, compressing or converting it, transporting it, and turning it back into useful energy creates losses, so direct electrification is usually more efficient where practical. Low-emission hydrogen may still be valuable for fertilizer, some industrial heat and feedstocks, shipping fuels, and long-duration storage.",
		stableCore: [
			"Electrolysis and later conversion cannot preserve all of the input electricity, and additional handling can add losses.",
			"Heat pumps, battery vehicles, and direct electric processes often deliver the same service with much less electricity than hydrogen pathways.",
			"Hydrogen's strongest cases are generally uses that need a molecule, very high temperatures, long storage, or energy-dense fuels and are difficult to electrify directly."
		],
		openQuestions: [
			"Which industrial and transport niches will justify scarce low-emission hydrogen as costs and alternatives change?",
			"How should methane leakage and carbon-capture performance be accounted for in hydrogen made from natural gas?"
		],
		whatWouldChangeMinds: [
			"End-to-end demonstrations showing hydrogen pathways routinely use less primary energy than mature direct-electric alternatives for the same service.",
			"Technology changes that remove the dominant electrolysis, compression, transport, and reconversion losses."
		],
		misconceptions: [
			"Hydrogen is an energy carrier, not a freely available primary energy source.",
			"Green labels do not guarantee low emissions if the electricity is not genuinely low-carbon and additional.",
			"An inefficient pathway can still be useful when storage, transport, or material chemistry matters more than efficiency alone."
		],
		editorSummary:
			"Hydrogen is best treated as a scarce strategic molecule, not a universal replacement for electricity. The right question is where its unique properties justify its conversion losses.",
		uncertaintySummary:
			"The thermodynamic ranking is stable. Future costs, infrastructure, policy, competing technologies, and sector-specific constraints determine how large each hydrogen niche becomes.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Global Hydrogen Review 2025",
				publisher: "International Energy Agency",
				year: 2025,
				url: "https://www.iea.org/reports/global-hydrogen-review-2025",
				note: "Current international assessment of hydrogen production pathways, demand sectors, project deployment, emissions, and cost barriers."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 6: Energy Systems",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-6/",
				note: "Assessment placing hydrogen and synthetic fuels within a portfolio led by efficiency, electrification, and low-carbon supply."
			},
			{
				kind: "systematic_review",
				title: "Potential and risks of hydrogen-based e-fuels in climate change mitigation",
				publisher: "Nature Climate Change",
				year: 2021,
				url: "https://doi.org/10.1038/s41558-021-01032-7",
				doi: "10.1038/s41558-021-01032-7",
				note: "Review comparing direct electrification with hydrogen-derived fuels and identifying hard-to-electrify priority uses."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Can carbon capture reduce facility emissions without eliminating them?",
		slug: "can-carbon-capture-reduce-facility-emissions-without-eliminating-them",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Carbon capture can prevent a substantial share of carbon dioxide in a treated exhaust stream from reaching the atmosphere, and it may be important for some cement, chemical, and industrial processes. Whole-system emissions remain because capture is incomplete and energy use, fuel production, transport, and storage also matter.",
		stableCore: [
			"Capture percentage at one stack is not the same as the lifecycle emissions reduction of the entire facility and supply chain.",
			"Some concentrated industrial streams are easier and cheaper to capture than dilute exhaust from dispersed sources.",
			"Climate benefit requires monitored transport and durable geological storage with low leakage, plus continued management after injection."
		],
		openQuestions: [
			"Which applications can sustain high capture rates and low upstream emissions during ordinary commercial operation?",
			"How should long-term storage liability, monitoring, community risk, and pipeline networks be governed?"
		],
		whatWouldChangeMinds: [
			"Independent operational data showing that high-capture industrial systems do not reduce full-chain emissions materially.",
			"Monitoring evidence that well-selected geological storage cannot retain carbon dioxide at climate-relevant timescales."
		],
		misconceptions: [
			"A stated 90% capture design does not guarantee 90% annual lifecycle emissions reduction.",
			"Carbon capture is a family of technologies and applications, not one uniform process.",
			"Potential usefulness in difficult industries does not establish that every fossil power plant is economically or environmentally justified."
		],
		editorSummary:
			"Carbon capture can work, but the meaningful metric is verified full-chain emissions avoided over time. Its strongest prospective role is narrower than slogans that treat it as either a complete solution or a fraud.",
		uncertaintySummary:
			"Capture chemistry and geological storage are established, but cost, uptime, energy penalty, realized capture, upstream emissions, infrastructure, and governance vary substantially by project.",
		sources: [
			{
				kind: "consensus_statement",
				title: "CCUS in Clean Energy Transitions",
				publisher: "International Energy Agency",
				year: 2020,
				url: "https://www.iea.org/reports/ccus-in-clean-energy-transitions",
				note: "International technology assessment covering capture applications, costs, infrastructure, storage, and deployment limits."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 6: Energy Systems",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-6/",
				note: "Assessment of carbon capture within energy and industrial mitigation pathways, including cost and feasibility constraints."
			},
			{
				kind: "systematic_review",
				title: "Carbon capture and storage: the way forward",
				publisher: "Energy & Environmental Science",
				year: 2018,
				url: "https://doi.org/10.1039/C7EE02342A",
				doi: "10.1039/C7EE02342A",
				note: "Comprehensive technical review of capture, transport, utilization, geological storage, economics, and environmental performance."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Is direct air capture already operating at climate-relevant scale?",
		slug: "is-direct-air-capture-already-operating-at-climate-relevant-scale",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Direct air capture has been demonstrated and commercial plants operate, but present removal is tiny relative to global carbon dioxide emissions and modeled future removal needs. Scaling requires large supplies of low-carbon energy, durable storage, materials, monitoring, finance, and continued emissions cuts.",
		stableCore: [
			"Because atmospheric carbon dioxide is dilute, separating it requires more energy and typically costs more than capturing concentrated industrial exhaust.",
			"A captured tonne is not a durable removal unless the carbon is stored for an appropriate period and lifecycle emissions are deducted.",
			"Most mitigation pathways that include substantial removal also require rapid direct reductions; removal is not a substitute for unlimited emissions."
		],
		openQuestions: [
			"How far can costs, energy use, water use, sorbent demand, and land requirements fall in real plants?",
			"Which accounting and liability systems can distinguish durable additional removal from temporary or overstated credits?"
		],
		whatWouldChangeMinds: [
			"Verified operating capacity reaching a material fraction of annual emissions or assessed removal needs with durable storage.",
			"Lifecycle evidence showing mature direct-air-capture systems can scale without prohibitive energy, material, land, or governance burdens."
		],
		misconceptions: [
			"A plant's nameplate capture capacity is not necessarily its verified annual net removal.",
			"Using captured carbon in short-lived fuel can recycle carbon without producing durable atmospheric removal.",
			"Technical feasibility today does not establish affordable gigatonne-scale deployment."
		],
		editorSummary:
			"Direct air capture is real but nascent. The evidence supports continued development for hard-to-eliminate residual emissions while rejecting claims that current plants already offset fossil emissions at meaningful global scale.",
		uncertaintySummary:
			"Present scale is directly observable. Future cost curves, siting, low-carbon energy availability, storage capacity, public acceptance, and policy durability are deeply uncertain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Negative Emissions Technologies and Reliable Sequestration: A Research Agenda",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2019,
				url: "https://doi.org/10.17226/25259",
				doi: "10.17226/25259",
				note: "Independent assessment of removal pathways, research needs, scale, costs, and reliable sequestration."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 12: Cross-sectoral Perspectives",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-12/",
				note: "Assessment of carbon dioxide removal roles, sustainability constraints, storage, and the priority of direct emissions reductions."
			},
			{
				kind: "landmark_study",
				title: "Life-cycle assessment of an industrial direct air capture process based on temperature-vacuum swing adsorption",
				publisher: "Nature Energy",
				year: 2021,
				url: "https://doi.org/10.1038/s41560-020-00771-9",
				doi: "10.1038/s41560-020-00771-9",
				note: "Plant-based lifecycle study showing how energy source and process design determine net removal rather than gross capture alone."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Do energy-efficiency gains usually survive the rebound effect?",
		slug: "do-energy-efficiency-gains-usually-survive-the-rebound-effect",
		consensusBand: "broad",
		confidenceScore: 82,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually, especially for direct household and transport uses: efficiency lowers the cost of an energy service, so people may use more of it, but that rebound generally offsets part rather than all of the expected saving. Economy-wide rebound is harder to measure and may be much larger in some settings.",
		stableCore: [
			"Direct rebound occurs when a cheaper-to-use efficient car, heater, or appliance is used more.",
			"Indirect and economy-wide effects include spending saved money elsewhere, price changes, productivity gains, and structural economic responses.",
			"Efficiency standards can still reduce energy use and emissions, but forecasts should not assume every engineering saving appears one-for-one in aggregate data."
		],
		openQuestions: [
			"How large are economy-wide rebound effects after separating efficiency from income, prices, innovation, and structural change?",
			"Which combinations of efficiency, pricing, carbon limits, and sufficiency policy best preserve expected savings?"
		],
		whatWouldChangeMinds: [
			"High-quality cross-sector evidence showing backfire—more total energy use than before—is the ordinary outcome of efficiency improvements.",
			"Conversely, robust economy-wide studies finding rebound is consistently negligible across sectors and income levels."
		],
		misconceptions: [
			"The existence of rebound does not prove that efficiency saves no energy.",
			"An engineering estimate and an observed economy-wide saving answer different questions.",
			"Jevons paradox is a possible macro outcome, not an automatic law for every efficient device."
		],
		editorSummary:
			"Rebound is a real correction to naive savings estimates, not a universal veto on efficiency. The largest uncertainty lies in broad macroeconomic effects, where model boundaries and causal identification matter greatly.",
		uncertaintySummary:
			"Direct rebound has a substantial empirical literature and is usually partial. Economy-wide estimates are more disputed and can range widely with method, geography, time, and which feedbacks are counted.",
		sources: [
			{
				kind: "systematic_review",
				title: "The Rebound Effect: An Assessment of the Evidence for Economy-wide Energy Savings from Improved Energy Efficiency",
				publisher: "UK Energy Research Centre",
				year: 2007,
				url: "https://ukerc.rl.ac.uk/cgi-bin/publicationsDiscover.pl?Action=detail&publicationid=33c4122f-c31d-451d-b22e-12bf4828518d",
				note: "Comprehensive evidence review concluding that efficiency remains effective while rebound must be included in realistic savings estimates."
			},
			{
				kind: "systematic_review",
				title: "Energy efficiency and economy-wide rebound effects: A review of the evidence and its implications",
				publisher: "Renewable and Sustainable Energy Reviews",
				year: 2021,
				url: "https://doi.org/10.1016/j.rser.2021.110781",
				doi: "10.1016/j.rser.2021.110781",
				note: "Review finding potentially large macro rebound while emphasizing diverse methods, assumptions, and unresolved evidence quality."
			},
			{
				kind: "systematic_review",
				title: "Dilemmas of energy efficiency: A systematic review of the rebound effect and attempts to curb energy consumption",
				publisher: "Energy Research & Social Science",
				year: 2022,
				url: "https://doi.org/10.1016/j.erss.2022.102661",
				doi: "10.1016/j.erss.2022.102661",
				note: "Systematic review mapping direct, indirect, and macro approaches and documenting disagreement about rebound magnitude."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Does expanding transmission and interconnection improve grid reliability and decarbonization?",
		slug: "does-expanding-transmission-and-interconnection-improve-grid-reliability-and-decarbonization",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Generally yes. More transfer capacity lets regions share generators, storage, demand flexibility, and reserves; reach diverse low-cost resources; and support each other during many outages and weather events. Benefits depend on route, planning, security, local impacts, cost allocation, and the possibility of correlated regional stress.",
		stableCore: [
			"Geographic diversity can smooth variable generation and demand because conditions are not identical everywhere at the same moment.",
			"Interregional links can reduce the amount of duplicative local capacity needed and provide access to assistance during many emergencies.",
			"Transmission does not create energy and can itself fail, so reliability still needs local networks, operational reserves, cybersecurity, and resource adequacy."
		],
		openQuestions: [
			"Which projects deliver the largest reliability and consumer benefits after full land, community, and environmental costs?",
			"How should regions allocate costs and authority for lines whose benefits cross multiple markets and decades?"
		],
		whatWouldChangeMinds: [
			"Prospective system studies and operating evidence showing added transfer capability consistently worsens reliability or raises total system cost.",
			"Evidence that geographic diversity provides no meaningful support during representative extreme-weather and outage combinations."
		],
		misconceptions: [
			"A national need for more transmission does not validate every proposed route.",
			"Interconnection helps diversify risk but cannot eliminate simultaneous large-area events.",
			"Distributed resources and transmission are often complements rather than mutually exclusive alternatives."
		],
		editorSummary:
			"The system case for well-planned transmission is strong, while project-level justice, siting, ecology, security, and cost allocation remain real decision questions. A grid can need expansion without every line being equally valuable.",
		uncertaintySummary:
			"The physical sharing benefits are well established. Exact value depends on future load, generation mix, weather correlations, market design, route cost, outages, and what alternatives are available.",
		sources: [
			{
				kind: "consensus_statement",
				title: "National Transmission Planning Study",
				publisher: "U.S. Department of Energy",
				year: 2024,
				url: "https://www.energy.gov/oe/national-transmission-planning-study-0",
				note: "National modeling of reliability, geographic diversity, cost, and decarbonization under alternative transmission expansion frameworks."
			},
			{
				kind: "consensus_statement",
				title: "National Transmission Needs Study",
				publisher: "U.S. Department of Energy",
				year: 2023,
				url: "https://www.energy.gov/sites/default/files/2023-12/National%20Transmission%20Needs%20Study%20-%20Final_2023.12.1.pdf",
				note: "Evidence inventory identifying current and future congestion, transfer, resilience, and interregional reliability needs."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 6: Energy Systems",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-6/",
				note: "Global assessment of network expansion, system integration, storage, demand flexibility, and low-emission electricity pathways."
			}
		]
	})
];
