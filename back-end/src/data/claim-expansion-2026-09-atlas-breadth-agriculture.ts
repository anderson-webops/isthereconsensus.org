import type { AtlasBreadthSourceTuple } from "./claim-expansion-2026-09-atlas-breadth-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthClaim as reviewedClaim } from "./claim-expansion-2026-09-atlas-breadth-shared.js";

const foodSystemsAssessment = [
	"consensus_statement",
	"Climate Change 2022: Mitigation of Climate Change, Chapter 12: Cross-sectoral Perspectives",
	"Intergovernmental Panel on Climate Change",
	2022,
	"10.1017/9781009157926.014",
	"IPCC assessment compares food-system mitigation options, including dietary shifts, reduced loss and waste, production changes, and emerging foods, while emphasizing lifecycle and regional variation."
] as const satisfies AtlasBreadthSourceTuple;

const geneticallyEngineeredCropsAssessment = [
	"consensus_statement",
	"Genetically Engineered Crops: Experiences and Prospects",
	"National Academies of Sciences, Engineering, and Medicine",
	2016,
	"10.17226/23395",
	"Comprehensive National Academies assessment finds that outcomes depend on the crop, engineered trait, pest-management system, geography, and comparison being made rather than on one uniform effect of genetic engineering."
] as const satisfies AtlasBreadthSourceTuple;

const agroforestrySystematicReview = [
	"systematic_review",
	"The impacts of agroforestry interventions on agricultural productivity, ecosystem services, and human well-being in low- and middle-income countries: A systematic review",
	"Campbell Systematic Reviews",
	2021,
	"10.1002/cl2.1167",
	"Systematic review finds potentially beneficial productivity and ecosystem-service effects, alongside heterogeneous interventions, evidence gaps, and limited direct measurement of some social outcomes."
] as const satisfies AtlasBreadthSourceTuple;

const precisionAgricultureReview = [
	"systematic_review",
	"State-of-the-art technologies in precision agriculture: a systematic review",
	"Journal of the Science of Food and Agriculture",
	2019,
	"10.1002/jsfa.9693",
	"Systematic review maps sensing, positioning, variable-rate, robotics, and data technologies while identifying adoption, interoperability, cost, and field-evidence constraints."
] as const satisfies AtlasBreadthSourceTuple;

const biocharReview = [
	"systematic_review",
	"Biochar in agriculture: A systematic review of 26 global meta-analyses",
	"GCB Bioenergy",
	2021,
	"10.1111/gcbb.12889",
	"Review of 26 meta-analyses finds average agronomic and environmental benefits but large variation by feedstock, production conditions, soil, crop, climate, dose, and study duration."
] as const satisfies AtlasBreadthSourceTuple;

const verticalFarmingReview = [
	"systematic_review",
	"A systematic scoping review of the sustainability of vertical farming, plant-based alternatives, food delivery services and blockchain in food systems",
	"Nature Food",
	2022,
	"10.1038/s43016-022-00622-8",
	"Scoping review finds that vertical farming can reduce land and water use for suitable crops, while electricity demand, energy source, infrastructure, crop range, and system boundaries dominate environmental comparisons."
] as const satisfies AtlasBreadthSourceTuple;

const cultivatedMeatClimateStudy = [
	"landmark_study",
	"Climate Impacts of Cultured Meat and Beef Cattle",
	"Frontiers in Sustainable Food Systems",
	2019,
	"10.3389/fsufs.2019.00005",
	"Scenario analysis shows that cultured-meat climate performance depends strongly on production energy, warming metric, time horizon, and whether methane-heavy cattle emissions are compared with persistent carbon dioxide emissions."
] as const satisfies AtlasBreadthSourceTuple;

const foodWasteAssessment = [
	"consensus_statement",
	"Food Waste Index Report 2024",
	"United Nations Environment Programme",
	2024,
	"https://www.unep.org/resources/publication/food-waste-index-report-2024",
	"UNEP synthesizes household, food-service, and retail waste measurements and identifies food-waste prevention as a practical route to lower resource use, emissions, and disposal burdens."
] as const satisfies AtlasBreadthSourceTuple;

const irrigationAssessment = [
	"consensus_statement",
	"The State of the World’s Land and Water Resources for Food and Agriculture – Systems at breaking point (SOLAW 2021)",
	"Food and Agriculture Organization of the United Nations",
	2021,
	"10.4060/cb7654en",
	"FAO assessment documents irrigation's central role in crop production together with groundwater depletion, soil salinity, water-quality, allocation, and governance pressures."
] as const satisfies AtlasBreadthSourceTuple;

const riceWaterMetaAnalysis = [
	"meta_analysis",
	"Rice yields and water use under alternate wetting and drying irrigation: A meta-analysis",
	"Field Crops Research",
	2017,
	"10.1016/j.fcr.2016.12.002",
	"Meta-analysis finds mild alternate wetting and drying can reduce irrigation water while maintaining yield in many settings, whereas severe drying increases yield-loss risk and outcomes vary with soil and management."
] as const satisfies AtlasBreadthSourceTuple;

export const september2026AtlasBreadthAgricultureClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Do genetically modified crops always increase pesticide use?",
		slug: "do-genetically-modified-crops-always-increase-pesticide-use",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Genetic engineering is a breeding method, not one pesticide strategy. Insect-resistant crops have often reduced insecticide applications, while herbicide-tolerant systems changed which herbicides farmers use and, in some places, selected for resistant weeds that require additional control. The direction and size of an effect depend on the engineered trait, crop, pest pressure, baseline practice, time period, and outcome measured.",
		stableCore: [
			"Insect resistance and herbicide tolerance are different traits with different pest-management consequences.",
			"Repeated reliance on one control method can select resistant insects or weeds, whether that method is engineered, chemical, or both.",
			"Pesticide kilograms alone do not fully measure toxicity, exposure, environmental persistence, or ecological harm."
		],
		openQuestions: [
			"How durable are newer stacked traits when resistance-management rules are followed under real farm conditions?",
			"Which metrics best compare total health and ecological burdens across changing pesticide mixtures and farming systems?"
		],
		whatWouldChangeMinds: [
			"Long-term representative studies showing the same pesticide trajectory across distinct engineered traits, crops, regions, and management systems.",
			"Evidence that trait-specific resistance and substitution effects do not materially alter pesticide outcomes."
		],
		misconceptions: [
			"A finding about one herbicide-tolerant crop does not describe every genetically engineered crop.",
			"Fewer spray applications do not automatically mean zero environmental risk.",
			"Conventional and organic systems also use pesticides and evolve in response to resistance."
		],
		editorSummary:
			"The useful question is which crop, trait, chemical, place, and time period, not whether all genetic engineering raises or lowers pesticide use.",
		uncertaintySummary:
			"Trait-specific directions are well established, while cumulative toxicity, resistance, and local management outcomes continue to change.",
		sources: [
			geneticallyEngineeredCropsAssessment,
			[
				"meta_analysis",
				"A Meta-Analysis of the Impacts of Genetically Modified Crops",
				"PLOS ONE",
				2014,
				"10.1371/journal.pone.0111629",
				"Meta-analysis reports average reductions in chemical pesticide use and crop losses for the crops and traits studied, with substantial heterogeneity and larger effects for insect-resistant traits."
			],
			[
				"meta_analysis",
				"Impact of genetically engineered maize on agronomic, environmental and toxicological traits: a meta-analysis of 21 years of field data",
				"Scientific Reports",
				2018,
				"10.1038/s41598-018-21284-2",
				"Long-term field-data synthesis separates insect-resistant and herbicide-tolerant maize outcomes and evaluates yield, target pests, non-target organisms, and contaminants."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does agroforestry reliably improve farms and ecosystems at the same time?",
		slug: "does-agroforestry-reliably-improve-farms-and-ecosystems-at-the-same-time",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Often, but not automatically. Integrating trees with crops or livestock can increase carbon storage, habitat, shade, erosion control, water regulation, and diversified products. It can also compete for light or water, delay returns, complicate machinery, or introduce unwanted pests. Benefits depend on species, spacing, climate, soils, tenure, markets, and what the agroforestry system replaces.",
		stableCore: [
			"Agroforestry describes many systems, from windbreaks and alley cropping to silvopasture and multistory gardens.",
			"Tree cover can add functions that annual monocultures provide poorly, but good design manages competition as well as complementarity.",
			"Long establishment periods and insecure land tenure can prevent adoption even when long-run benefits are plausible."
		],
		openQuestions: [
			"Which designs deliver dependable yield, income, biodiversity, and climate benefits for particular regions and farm sizes?",
			"How should programs value delayed returns, labor, risk, and non-market ecosystem services?"
		],
		whatWouldChangeMinds: [
			"Multi-year controlled comparisons showing well-matched agroforestry systems consistently reduce total productivity and ecosystem services.",
			"Evidence that apparent gains disappear when displacement, labor, permanence, and farmer welfare are fully counted."
		],
		misconceptions: [
			"Planting any trees on any farm is not necessarily agroforestry done well.",
			"More carbon per hectare does not guarantee higher farmer income or food output.",
			"Agroforestry is not a single recipe transferable unchanged across climates and cultures."
		],
		editorSummary:
			"Well-designed agroforestry can stack production and ecological benefits, but outcomes come from the system design and farmer context rather than from trees alone.",
		uncertaintySummary:
			"Average ecosystem-service benefits are credible. Effect sizes, tradeoffs, adoption durability, and household outcomes remain unevenly measured.",
		sources: [
			agroforestrySystematicReview,
			[
				"consensus_statement",
				"Climate Change 2022: Mitigation of Climate Change, Chapter 7: Agriculture, Forestry and Other Land Uses",
				"Intergovernmental Panel on Climate Change",
				2022,
				"10.1017/9781009157926.009",
				"IPCC assesses agroforestry among land-based mitigation practices and emphasizes biophysical potential, permanence, land competition, biodiversity, livelihoods, and implementation conditions."
			],
			[
				"meta_analysis",
				"Do European agroforestry systems enhance biodiversity and ecosystem services? A meta-analysis",
				"Agriculture, Ecosystems & Environment",
				2016,
				"10.1016/j.agee.2016.06.002",
				"European meta-analysis finds average biodiversity and ecosystem-service benefits alongside heterogeneous effects by agroforestry design, service, and reference land use."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does precision agriculture automatically reduce fertilizer, pesticide, and water use?",
		slug: "does-precision-agriculture-automatically-reduce-fertilizer-pesticide-and-water-use",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Sensors, maps, forecasts, automation, and variable-rate equipment can target inputs more precisely and often improve efficiency, but owning the technology does not guarantee lower total use. Savings depend on data quality, agronomic decisions, crop and field variability, equipment compatibility, farmer skills, costs, and whether efficiency gains encourage expansion or more intensive production.",
		stableCore: [
			"Precision tools can reveal within-field differences that uniform application misses.",
			"Input efficiency, input quantity, profit, yield, and environmental impact are related but distinct outcomes.",
			"Small and resource-constrained farms may face different costs, connectivity, data-rights, and scale barriers."
		],
		openQuestions: [
			"Which tools produce repeatable whole-farm environmental gains after equipment, energy, and data costs are included?",
			"How can standards, extension, financing, and data governance distribute benefits beyond large early adopters?"
		],
		whatWouldChangeMinds: [
			"Representative randomized or quasi-experimental evidence showing precision-guided decisions do not improve targeting or input efficiency in suitable settings.",
			"Lifecycle studies showing deployment burdens systematically exceed avoided inputs and environmental losses."
		],
		misconceptions: [
			"A high-resolution map is information, not an agronomic outcome.",
			"Higher yield per unit input can coexist with higher total input use.",
			"Digital agriculture is not limited to autonomous tractors or artificial intelligence."
		],
		editorSummary:
			"Precision agriculture offers better targeting, not an automatic sustainability certificate. Measured farm outcomes and access conditions decide its value.",
		uncertaintySummary:
			"Technical ability to vary applications is established. Real-world additionality, rebound, lifecycle effects, and equitable adoption remain less certain.",
		sources: [
			precisionAgricultureReview,
			[
				"context",
				"The role of precision agriculture in food security",
				"Agronomy Journal",
				2021,
				"10.1002/agj2.20919",
				"Review connects precision methods with potential productivity and resource-efficiency benefits while emphasizing affordability, infrastructure, knowledge, and access constraints."
			],
			[
				"context",
				"Farm Profits and Adoption of Precision Agriculture",
				"U.S. Department of Agriculture Economic Research Service",
				2016,
				"https://www.ers.usda.gov/publications/80325",
				"USDA analysis distinguishes adoption of guidance, mapping, and variable-rate technologies and evaluates associations with farm profitability and scale."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does adding biochar to soil always increase crop yields and lock away carbon?",
		slug: "does-adding-biochar-to-soil-always-increase-crop-yields-and-lock-away-carbon",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Some biochars persist for long periods and can improve yields, water retention, acidity, nutrient use, or contaminant binding, especially in certain degraded or tropical soils. Other trials show little benefit or harm. Net climate value depends on feedstock sourcing, pyrolysis, energy co-products, transport, soil response, permanence, and what would otherwise happen to the biomass.",
		stableCore: [
			"Biochar is a family of materials whose properties vary with feedstock and production temperature.",
			"Average yield responses conceal large differences among soils, crops, climates, doses, and co-applied nutrients.",
			"Stable carbon in a product is not the same as verified net carbon removal across the entire lifecycle."
		],
		openQuestions: [
			"Which biochar-soil combinations produce durable benefits without contaminants or nutrient imbalance?",
			"How should projects verify feedstock additionality, counterfactual decay or burning, permanence, leakage, and field-level carbon?"
		],
		whatWouldChangeMinds: [
			"Long-duration field syntheses showing no persistent carbon fraction or agronomic benefit in any reproducible setting.",
			"Lifecycle evidence showing well-governed waste-biomass systems consistently increase net warming relative to their counterfactual."
		],
		misconceptions: [
			"Biochar is not interchangeable with ordinary charcoal, ash, or incompletely burned waste.",
			"A positive greenhouse result in a laboratory does not establish farm-scale carbon credits.",
			"More biochar is not always better; dose and quality matter."
		],
		editorSummary:
			"Biochar can combine soil amendment and carbon storage, but its value is conditional on the material, field, supply chain, and credible accounting.",
		uncertaintySummary:
			"Persistence and average benefits are supported, with substantial heterogeneity and unresolved scaling, monitoring, and feedstock tradeoffs.",
		sources: [
			biocharReview,
			[
				"meta_analysis",
				"Biochar boosts tropical but not temperate crop yields",
				"Environmental Research Letters",
				2017,
				"10.1088/1748-9326/aa67bd",
				"Meta-analysis finds stronger average yield responses in tropical than temperate agriculture, illustrating why global means should not be treated as universal field predictions."
			],
			[
				"meta_analysis",
				"A quantitative review of the effects of biochar application to soils on crop productivity using meta-analysis",
				"Agriculture, Ecosystems & Environment",
				2011,
				"10.1016/j.agee.2011.08.015",
				"Early quantitative synthesis finds an average productivity benefit alongside broad variation and limited long-term field evidence."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Is vertical farming inherently more sustainable than field agriculture?",
		slug: "is-vertical-farming-inherently-more-sustainable-than-field-agriculture",
		consensusBand: "mixed",
		confidenceScore: 78,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Indoor vertical farms can use little land, recycle water, avoid some pesticides, locate production near consumers, and produce consistently. Lighting and climate control can require large amounts of electricity and equipment, making results highly sensitive to the power grid, crop, building, yield, and comparison supply chain. It is currently best suited to some high-value leafy crops, not as a general replacement for grains or field farming.",
		stableCore: [
			"Vertical stacking and recirculation can produce high annual output per unit land and low consumptive water use.",
			"Electricity often dominates greenhouse-gas and operating-cost results in fully indoor systems.",
			"System boundaries must include buildings, equipment, nutrient supply, losses, transport, and the displaced production system."
		],
		openQuestions: [
			"Which crops, climates, grids, and building designs can achieve competitive lifecycle impacts and costs at commercial scale?",
			"Will lighting, heat reuse, automation, renewable supply, and breeding reduce current energy and crop-range constraints?"
		],
		whatWouldChangeMinds: [
			"Transparent commercial lifecycle data showing vertical farms outperform matched field systems across energy, materials, water, land, cost, and nutrition for broad staple crops.",
			"Evidence that technical improvements cannot materially reduce controlled-environment energy and capital burdens."
		],
		misconceptions: [
			"Using less land or water does not alone establish a smaller total footprint.",
			"Shorter transport distance can be outweighed by production energy.",
			"A greenhouse using sunlight and a fully enclosed LED farm have different impact profiles."
		],
		editorSummary:
			"Vertical farming exchanges land, weather, and water constraints for electricity, equipment, and capital. Sustainability depends on that exchange in a specific case.",
		uncertaintySummary:
			"Resource-use mechanisms are clear, but fast-changing technology and sparse transparent commercial data make broad superiority claims premature.",
		sources: [
			verticalFarmingReview,
			[
				"systematic_review",
				"Future food-production systems: vertical farming and controlled-environment agriculture",
				"Sustainability: Science, Practice and Policy",
				2017,
				"10.1080/15487733.2017.1394054",
				"Review describes controlled-environment production's land, water, climate, energy, crop, labor, and economic tradeoffs rather than treating it as uniformly superior."
			],
			[
				"landmark_study",
				"Does green vertical farming offer a sustainable alternative to conventional methods of production?: A case study from Scotland",
				"Food and Energy Security",
				2022,
				"10.1002/fes3.438",
				"Lifecycle case study shows how lighting, electricity mix, production configuration, and yield shape vertical-farm impacts relative to conventional lettuce supply."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Is grass-fed beef always lower-carbon than feedlot-finished beef?",
		slug: "is-grass-fed-beef-always-lower-carbon-than-feedlot-finished-beef",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Well-managed grazing can improve some soils, habitat, or soil carbon, but grass finishing usually takes more land and time and can produce more methane per unit of beef. In many lifecycle comparisons, plausible soil-carbon gains do not make grass-fed beef reliably lower-carbon than efficient feedlot systems. Results vary by pasture history, stocking, feed, climate, productivity, and accounting boundaries.",
		stableCore: [
			"All cattle produce methane during digestion, and slower growth can increase lifetime emissions per kilogram of beef.",
			"Soil carbon gains can be real but are limited by baseline condition, saturation, reversibility, drought, and measurement uncertainty.",
			"Environmental comparisons should also consider land occupation, biodiversity, nutrients, water, animal welfare, and local livelihoods."
		],
		openQuestions: [
			"Where can improved grazing create durable additional soil carbon and biodiversity benefits at landscape scale?",
			"How should lifecycle methods represent marginal land, feed co-products, avoided land conversion, methane timing, and soil-carbon reversal?"
		],
		whatWouldChangeMinds: [
			"Representative long-term measurements showing grass finishing consistently offsets its methane and land costs with durable additional sequestration.",
			"Harmonized lifecycle studies finding a stable grass-fed advantage across regions and reasonable counterfactual assumptions."
		],
		misconceptions: [
			"A pasture label does not describe stocking density, finishing time, land history, or measured soil change.",
			"Carbon is only one dimension of environmental and ethical performance.",
			"Finding no universal carbon advantage does not mean every grazing system is identical."
		],
		editorSummary:
			"Grass feeding can have local benefits, but it is not an automatic climate advantage. Methane, land, growth rate, and credible soil-carbon accounting all matter.",
		uncertaintySummary:
			"The absence of a universal advantage is well supported. Site-specific soil, biodiversity, and counterfactual effects remain difficult to generalize.",
		sources: [
			[
				"landmark_study",
				"US grass-fed beef is as carbon intensive as industrial beef and approximately 10-fold more intensive than common protein-dense alternatives",
				"Proceedings of the National Academy of Sciences",
				2025,
				"10.1073/pnas.2404329122",
				"U.S. model constrained by cattle-performance equations and observed sequestration ranges finds most grass-fed systems remain at least as carbon intensive as industrial beef after soil-carbon crediting."
			],
			[
				"landmark_study",
				"Is the Grass Always Greener? Comparing the Environmental Impact of Conventional, Natural and Grass-Fed Beef Production Systems",
				"Animals",
				2012,
				"10.3390/ani2020127",
				"Whole-system model finds lower productivity and longer finishing increase several resource and emission burdens in the grass-fed scenario, while remaining sensitive to modeled practices."
			],
			foodSystemsAssessment
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Is cultivated meat already proven greener than conventional meat at commercial scale?",
		slug: "is-cultivated-meat-already-proven-greener-than-conventional-meat-at-commercial-scale",
		consensusBand: "mixed",
		confidenceScore: 72,
		evidenceCertainty: "low",
		bottomLine:
			"No. Cultivated meat could reduce land use and avoid raising and slaughtering animals, but large-scale environmental performance has not yet been demonstrated. Published assessments rely heavily on prospective process assumptions. Energy source, sterile production requirements, growth media, bioreactor efficiency, product type, co-products, and comparison meat can reverse conclusions for climate and other impacts.",
		stableCore: [
			"Current production volumes are too small to establish mature commercial resource use and emissions.",
			"Land-use savings are plausible, while energy demand and process purification are major uncertainties.",
			"Comparisons with beef, chicken, pork, fish, and plant proteins answer different questions."
		],
		openQuestions: [
			"Can food-grade processes achieve high cell density, low-cost media, safe recycling, and efficient scale-up without pharmaceutical-grade burdens?",
			"What will audited commercial lifecycle inventories show on real grids and supply chains?"
		],
		whatWouldChangeMinds: [
			"Independent commercial-scale measurements demonstrating robust environmental advantages across realistic energy and process scenarios.",
			"Engineering evidence establishing unavoidable purification or energy requirements that erase plausible advantages even on low-carbon grids."
		],
		misconceptions: [
			"A laboratory prototype is not evidence of industrial-scale efficiency.",
			"Using no livestock does not mean using no land, crops, energy, nutrients, or infrastructure.",
			"A prospective lifecycle model is a conditional forecast, not a measurement of a mature industry."
		],
		editorSummary:
			"Cultivated meat has credible pathways to some benefits, especially land sparing, but commercial environmental superiority remains a testable prospect rather than a settled result.",
		uncertaintySummary:
			"Potential is substantial and evidence certainty is low because process design, scale, energy, and transparent commercial data remain unsettled.",
		sources: [
			cultivatedMeatClimateStudy,
			[
				"systematic_review",
				"Meat alternatives: life cycle assessment of most known meat substitutes",
				"The International Journal of Life Cycle Assessment",
				2015,
				"10.1007/s11367-015-0931-6",
				"Comparative lifecycle assessment places cultured meat among a wider set of substitutes and shows results depend on modeled processes and environmental indicators."
			],
			foodSystemsAssessment
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Would reducing food loss and waste materially lower environmental pressure?",
		slug: "would-reducing-food-loss-and-waste-materially-lower-environmental-pressure",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Food that is never eaten still uses land, water, fertilizer, energy, labor, packaging, and transport, and disposal can add methane or other burdens. Prevention generally avoids more impact than recycling or disposal improvements. The best intervention differs across farm losses, storage and cold chains, retail standards, date labels, serving sizes, and household behavior.",
		stableCore: [
			"Preventing avoidable loss preserves both the food and all upstream resources already invested in it.",
			"The largest mass of waste is not always the largest environmental opportunity because foods have different footprints.",
			"Edible-waste prevention, redistribution, animal feed, material recovery, and energy recovery occupy different places in the waste hierarchy."
		],
		openQuestions: [
			"Which combinations of infrastructure, pricing, labeling, packaging, donation, and behavior interventions produce durable net reductions?",
			"How much prevention changes production, prices, diets, farmer income, and food security rather than merely shifting waste?"
		],
		whatWouldChangeMinds: [
			"Lifecycle and market evidence showing preventing avoidable waste does not reduce upstream production or disposal burdens.",
			"Large programs consistently causing rebound or food-access harms that outweigh saved resources."
		],
		misconceptions: [
			"Composting recovers value but does not recover all resources used to produce uneaten food.",
			"Households are important, but farm, storage, processing, food-service, and retail losses also matter.",
			"Not every discarded item was edible or practically avoidable."
		],
		editorSummary:
			"Avoiding edible food waste is a well-supported way to reduce pressure across the food system, with the greatest value when action targets causes rather than bins alone.",
		uncertaintySummary:
			"The direction is highly certain. Measurement definitions, intervention durability, market feedbacks, and local priorities determine the achievable magnitude.",
		sources: [foodWasteAssessment, foodSystemsAssessment, irrigationAssessment]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does irrigation only increase crop production without serious long-term costs?",
		slug: "does-irrigation-only-increase-crop-production-without-serious-long-term-costs",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Irrigation supports high and stable yields and food security, but poorly matched withdrawals and drainage can deplete rivers and aquifers, raise pumping energy, concentrate salts, waterlog soils, damage ecosystems, and intensify disputes. These costs are not inevitable. Scheduling, efficient delivery, crop choice, drainage, salinity management, groundwater accounting, and enforceable allocation can improve outcomes.",
		stableCore: [
			"An efficient device does not guarantee sustainable basin-wide use if saved water enables more irrigated area or consumption.",
			"Salts remain when irrigation water evaporates, so drainage and salt balance are central in arid systems.",
			"Groundwater can buffer drought, but persistent pumping beyond recharge lowers storage and can cause subsidence or stream depletion."
		],
		openQuestions: [
			"Which institutions can convert field efficiency into real water savings while protecting farmers and ecosystems?",
			"How should irrigation adapt crop portfolios and infrastructure to hotter droughts, salinity, and variable snowmelt?"
		],
		whatWouldChangeMinds: [
			"Long-term basin and soil records showing unrestricted irrigation expansion does not affect storage, flows, salinity, energy, or ecosystems.",
			"Evidence that governance and agronomic safeguards cannot preserve production while reducing these harms."
		],
		misconceptions: [
			"More efficient irrigation can increase total consumption when it expands profitable production.",
			"Water applied to a field is not all lost; some may return to rivers or aquifers and be reused.",
			"A productive irrigated region can still be drawing down a finite groundwater reserve."
		],
		editorSummary:
			"Irrigation is foundational food infrastructure with real hydrological limits. Sustainable performance must be measured at field, aquifer, and basin scales.",
		uncertaintySummary:
			"The benefit and major failure modes are established. Sustainable withdrawal levels and best adaptation packages are local and governance-dependent.",
		sources: [
			irrigationAssessment,
			[
				"consensus_statement",
				"Agricultural water management",
				"Food and Agriculture Organization of the United Nations",
				2026,
				"https://www.fao.org/land-water/water/agricultural-water-management/en/",
				"FAO overview connects irrigation productivity with water scarcity, allocation, groundwater, water quality, ecosystem needs, and governance."
			],
			[
				"context",
				"Soil Salinity and Sodicity in Drylands: A Review of Causes, Effects, Monitoring, and Restoration Measures",
				"Frontiers in Environmental Science",
				2021,
				"10.3389/fenvs.2021.712831",
				"Review describes natural and irrigation-associated salinization, threats to crop productivity, and the monitoring and restoration measures needed in drylands."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Can changing rice-field water management reduce methane without sacrificing yield?",
		slug: "can-changing-rice-field-water-management-reduce-methane-without-sacrificing-yield",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Often yes. Periodically draining rice paddies, including carefully controlled alternate wetting and drying, introduces oxygen and can substantially reduce methane compared with continuous flooding while saving irrigation water. If fields dry too far, yield can fall, and nitrous oxide may rise. Soil, climate, drainage threshold, nitrogen, residues, arsenic, labor, and water control shape the net result.",
		stableCore: [
			"Continuous flooding favors anaerobic microbes that generate methane from organic matter.",
			"Mild alternate wetting and drying can preserve yields more reliably than severe drying.",
			"Net climate assessment must count both methane and nitrous oxide rather than celebrating one gas in isolation."
		],
		openQuestions: [
			"How can inexpensive monitoring and reliable water delivery support correct thresholds across small farms?",
			"Which combinations of water, nitrogen, straw, varieties, and soil amendments minimize emissions, contaminants, and yield risk?"
		],
		whatWouldChangeMinds: [
			"Large multi-region trials showing properly controlled drainage cannot reduce methane without unacceptable yield or nitrous-oxide penalties.",
			"Full greenhouse accounting showing consistent net warming increases under well-managed alternate wetting and drying."
		],
		misconceptions: [
			"Alternate wetting and drying does not mean allowing a crop to suffer uncontrolled drought.",
			"Lower methane does not guarantee lower total greenhouse forcing if nitrogen management is poor.",
			"A practice that works on a leveled irrigated field may not transfer to fields without controllable water."
		],
		editorSummary:
			"Managed drainage can turn rice water control into a methane and water-saving tool, but the drying threshold and nitrogen system decide whether it is a win-win.",
		uncertaintySummary:
			"Methane and water reductions are robust on average. Yield, nitrous oxide, feasibility, and total climate benefits vary with implementation.",
		sources: [
			riceWaterMetaAnalysis,
			[
				"meta_analysis",
				"Effects of alternate wetting and drying irrigation on yield, water-saving, and emission reduction in rice fields: A global meta-analysis",
				"Agricultural and Forest Meteorology",
				2024,
				"10.1016/j.agrformet.2024.110075",
				"Global synthesis finds large average water and methane savings, a smaller average yield penalty, higher nitrous oxide, and strong dependence on drying threshold and soil conditions."
			],
			[
				"meta_analysis",
				"Alternate wetting and drying maintains rice yield and reduces global warming potential: A global meta-analysis",
				"Field Crops Research",
				2024,
				"10.1016/j.fcr.2024.109603",
				"Meta-analysis evaluates methane, nitrous oxide, yield, greenhouse intensity, soil, climate, and management moderators across 72 studies."
			]
		]
	})
];
