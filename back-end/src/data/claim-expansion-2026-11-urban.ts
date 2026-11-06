import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberUrbanResearchCheckedAt = "2026-11-06T18:11:08.574Z";

const sources = {
	urbanTrees: researchSource("Cooling efficacy of trees across cities is determined by background climate, urban morphology, and tree trait", "Communications Earth & Environment", 2024, "https://doi.org/10.1038/s43247-024-01908-4", "10.1038/s43247-024-01908-4", "Li and colleagues synthesize 182 studies across 110 cities or regions. Tree traits, urban form and climate modify cooling. Reported maximum reductions describe particular conditions and should not be presented as city-wide average cooling.", "meta_analysis", "supports", novemberUrbanResearchCheckedAt),
	greening: researchSource("How effective is ‘greening’ of urban areas in reducing human exposure to ground-level ozone concentrations, UV exposure and the ‘urban heat island effect’? An updated systematic review", "Environmental Evidence", 2021, "https://doi.org/10.1186/s13750-021-00226-y", "10.1186/s13750-021-00226-y", "Knight and colleagues update an earlier review with 308 included studies and quantitative syntheses. Their findings distinguish air temperature, surface temperature and thermal comfort. Green sites tended to be cooler, but trees could retain warmth at night; most evidence does not isolate randomized planting effects.", "systematic_review", "supports", novemberUrbanResearchCheckedAt),
	parkDesign: researchSource("Design and Site-Related Factors Impacting the Cooling Performance of Urban Parks in Different Climate Zones: A Systematic Review", "Land", 2024, "https://doi.org/10.3390/land13122175", "10.3390/land13122175", "Norouzi and colleagues review 131 studies published between January 2014 and July 2024. Park size, vegetation, water and surrounding urban form affect cooling. More than 60% of the included studies were based in China, limiting simple transfer across regions.", "systematic_review", "supports", novemberUrbanResearchCheckedAt),
	coolRoofReview: researchSource("A study on the comparative review of cool roof thermal performance in various regions", "Energy and Built Environment", 2022, "https://doi.org/10.1016/j.enbenv.2021.03.001", "10.1016/j.enbenv.2021.03.001", "Rawat and Singh's comparative literature review appears in the July 2022 journal issue; its DOI contains 2021. It compares roof treatments and climates and notes that much of the literature uses simulations and prototypes. Its ranges should not be read as a forecast for every building.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	coolRoofModel: researchSource("Cool roofs: A climate change mitigation and adaptation strategy for residential buildings", "Building and Environment", 2023, "https://doi.org/10.1016/j.buildenv.2023.110271", "10.1016/j.buildenv.2023.110271", "Bamdad models residential buildings across present and future climate conditions. Cooling benefits can coexist with winter heating penalties. Scenario-specific predictions for future decades are not measured savings in current buildings.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	roofModel: researchSource("Building energy savings by green roofs and cool roofs in current and future climates", "npj Urban Sustainability", 2024, "https://doi.org/10.1038/s42949-024-00159-8", "10.1038/s42949-024-00159-8", "Jia and colleagues combine climate and building-energy simulations for six cities. Results depend on modeled buildings and climate scenarios. Large scenario maxima do not establish typical observed whole-building savings or pedestrian-level cooling.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	greenRoofReview: researchSource("The effectiveness of green roofs in reducing building energy consumptions across different climates. A summary of literature results", "Renewable & Sustainable Energy Reviews", 2021, "https://doi.org/10.1016/j.rser.2021.111523", "10.1016/j.rser.2021.111523", "Bevilacqua reviews green-roof energy findings across climates, including experimental and modeled work. Measurements of roof thermal behavior and whole-building energy consumption are different outcomes; comparable quantitative whole-building estimates are limited.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	greenRoofClimate: researchSource("Green roofs to reduce building energy use? A review on key structural factors of green roofs and their effects on urban climate", "Building and Environment", 2019, "https://doi.org/10.1016/j.buildenv.2019.106273", "10.1016/j.buildenv.2019.106273", "Susca reviews how climate, insulation, growing layers, irrigation and plants affect green-roof energy performance. The paper explicitly challenges treating green roofs as a uniform solution across climates and identifies geographical evidence gaps.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	coolPavementReview: researchSource("Evaluating the performance of cool pavements for urban heat island mitigation under realistic conditions: A systematic review and meta-analysis", "Urban Climate", 2023, "https://doi.org/10.1016/j.uclim.2023.101470", "10.1016/j.uclim.2023.101470", "Kousis and Pisello review outdoor cool-pavement evaluations across several cooling mechanisms. Surface cooling is well documented, but monitoring methods and realistic field conditions vary. Surface-temperature reductions do not directly establish improved pedestrian comfort.", "systematic_review", "supports", novemberUrbanResearchCheckedAt),
	reflectiveExposure: researchSource("Solar reflective pavements: A policy panacea to heat mitigation?", "Environmental Research Letters", 2020, "https://doi.org/10.1088/1748-9326/ab87d4", "10.1088/1748-9326/ab87d4", "Middel and colleagues measure reflective and ordinary roads in two Los Angeles neighborhoods during one summer day. Coated roads had cooler surfaces but greater midday radiant heat exposure. This context-specific field result does not establish that all reflective coatings worsen comfort.", "technical_reference", "debate", novemberUrbanResearchCheckedAt),
	reflectiveComfort: researchSource("Micrometeorological effects and thermal-environmental benefits of cool pavements: findings from a detailed observational field study in Pacoima, California", "Environmental Research Communications", 2024, "https://doi.org/10.1088/2515-7620/ad2a8e", "10.1088/2515-7620/ad2a8e", "Taha's observational study of a particular reflective pavement in a Pacoima community project reports mostly beneficial thermal-comfort indicators with considerable variation. Its product, location and comparison designs differ from earlier field studies, so it does not settle every installation's net effect.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	greenRoofRunoff: researchSource("Green roofs for stormwater runoff retention: A global quantitative synthesis of the performance", "Resources, Conservation and Recycling", 2021, "https://doi.org/10.1016/j.resconrec.2021.105577", "10.1016/j.resconrec.2021.105577", "Zheng and colleagues synthesize 2,375 experimental samples from 75 studies in 21 countries. Event-scale roof retention varies widely with rainfall, substrate, vegetation, climate and season. The samples are repeated observations, rather than 2,375 independent trials.", "meta_analysis", "supports", novemberUrbanResearchCheckedAt),
	greenInfrastructure: researchSource("Water retention by green infrastructure to mitigate urban flooding: a meta-analysis", "Urban Water Journal", 2025, "https://doi.org/10.1080/1573062x.2025.2472325", "10.1080/1573062x.2025.2472325", "Dobkowitz and colleagues examine five green-infrastructure types using field and modeling studies. Retention generally declines as rainfall totals rise. Missing starting-moisture data and inconsistent reporting limit comparisons, and modeled catchments differ in scale from field installations.", "meta_analysis", "supports", novemberUrbanResearchCheckedAt),
	permeableAsphalt: researchSource("Permeable Asphalt Pavements (PAP): Benefits, Clogging Factors and Methods for Evaluation and Maintenance: A Review", "Materials", 2024, "https://doi.org/10.3390/ma17246063", "10.3390/ma17246063", "Sousa and colleagues review permeable-asphalt benefits, sediment clogging, evaluation methods and maintenance. It supports assessing the pavement system and accumulated sediment rather than assuming new-surface permeability persists indefinitely.", "technical_reference", "supports", novemberUrbanResearchCheckedAt),
	perviousConcrete: researchSource("Pervious concrete pavements for climate change adaptation and mitigation: a systematic review of performance, sustainability, and future perspectives", "Road Materials and Pavement Design", 2025, "https://doi.org/10.1080/14680629.2025.2544244", "10.1080/14680629.2025.2544244", "Wu and colleagues synthesize 473 studies on pervious concrete, including hydrology, structure and maintenance. Published online in August 2025, the review identifies clogging and long-term durability as continuing constraints. It does not establish one design or maintenance interval for every site.", "systematic_review", "supports", novemberUrbanResearchCheckedAt),
	pavementClogging: researchSource("Recent developments in mitigating clogging in permeable pavements: a state-of-the-art review", "Innovative Infrastructure Solutions", 2025, "https://doi.org/10.1007/s41062-025-01882-6", "10.1007/s41062-025-01882-6", "Rahman and colleagues search 191 publications from 2017 through 2024 on clogging control across permeable pavement types. They distinguish design, construction and maintenance strategies and emphasize matching cleaning and sediment control to the system.", "systematic_review", "supports", novemberUrbanResearchCheckedAt),
	bioretention: researchSource("Urban stormwater bioretention reduces runoff and improves water quality: A global meta-analysis of field studies", "Journal of Hydrology", 2025, "https://doi.org/10.1016/j.jhydrol.2025.134163", "10.1016/j.jhydrol.2025.134163", "Sabbagh and colleagues synthesize field bioretention performance across 50 assets. Average volume, peak-flow and pollutant-load reductions have substantial site-to-site variation. Load reductions were larger than concentration reductions; installations are not interchangeable with whole urban catchments.", "meta_analysis", "supports", novemberUrbanResearchCheckedAt),
	bioretentionNutrients: researchSource("How efficient are bioretention cells in controlling phosphorus and nitrogen enrichment of urban stormwater? Insights from the International stormwater best management practice database", "Journal of Hydrology", 2025, "https://doi.org/10.1016/j.jhydrol.2025.132805", "10.1016/j.jhydrol.2025.132805", "Zhou and colleagues analyze over 400 rain events across more than 30 bioretention systems. Surface-runoff nutrient loads were often reduced despite higher phosphorus outflow concentrations. These observations distinguish concentration, mass and receiving-water implications; groundwater outcomes need separate evidence.", "technical_reference", "debate", novemberUrbanResearchCheckedAt)
};

export const novemberUrbanClaims = [
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-urban-trees-cool-streets-during-hot-weather",
		title: "Do urban trees cool streets during hot weather?",
		bottomLine: "Yes. Tree shade reduces the sunlight reaching people and surfaces, and water lost through leaves can cool the air. The benefit depends on the trees, water supply, street layout and weather. A cooler shaded surface is a different measurement from cooler air.",
		stableCore: [
			"A global synthesis of 182 studies across 110 cities or regions found that tree cooling varies with climate, the shape of the surrounding buildings and tree traits. Its largest reported reductions describe particular conditions, rather than a temperature drop that every street can expect.",
			"An updated systematic review also found cooler daytime air beneath trees on average. Dense cover can sometimes hold heat at night. Shade, air temperature and the heat a person feels each measure part of the result."
		],
		editorSummary: "Tree cooling depends on canopy cover, water and the surrounding street.",
		population: "Urban streets and public spaces across climates, with measurements beneath trees and at comparison sites.",
		scope: "Compare urban tree cover with nearby lower-canopy conditions; distinguish pedestrian-level air temperature, surface temperature and radiant heat.",
		uncertainty: "Many studies compare different sites. Building form, weather and measurement methods can influence the apparent tree effect, and daytime benefits do not fix the nighttime result.",
		openQuestions: [
			"How well does cooling persist during drought and prolonged heatwaves?",
			"Which planting layouts improve both daytime shade and nighttime cooling?"
		],
		whatWouldChangeMinds: [
			"Replicated before-and-after field studies measuring pedestrian heat exposure, water use and nighttime conditions across different street layouts."
		],
		misconceptions: [
			"A large cooling effect at one shaded site is not the average effect throughout a city.",
			"Planting trees today does not immediately provide the shade of a mature canopy."
		],
		sources: [sources.urbanTrees, sources.greening]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-urban-parks-cool-nearby-neighborhoods",
		title: "Do urban parks cool nearby neighborhoods?",
		bottomLine: "Often. Parks are commonly cooler than nearby built-up areas, and some cooling can extend beyond their edges. How far it reaches depends on the park, wind, surrounding buildings and weather. There is no single cooling distance that fits every park.",
		stableCore: [
			"Systematic reviews find a daytime cooling benefit for parks and gardens compared with built-up sites. Comparisons differ in their use of ground-level air measurements, satellite surface temperatures and measures of comfort.",
			"A review of 131 studies published from 2014 through 2024 identifies park size, tree cover, water and surrounding airflow as important factors. Cooling within a park and cooling homes beyond it are related questions that need different measurements."
		],
		editorSummary: "Cooling beyond a park depends on its design and its surroundings.",
		population: "Urban parks, gardens and surrounding built-up neighborhoods in the climates represented by the cited reviews.",
		scope: "Include park-versus-built-area comparisons and evidence about cooling beyond park boundaries; keep surface and air-temperature outcomes separate.",
		uncertainty: "The park-design review is dominated by studies in China. Site selection and weather can confound comparisons, and a park-wide average can conceal unshaded activity areas that remain hot.",
		openQuestions: [
			"Which designs spread cooling into nearby residential streets?",
			"How should parks balance shade, open space, water needs and nighttime cooling?"
		],
		whatWouldChangeMinds: [
			"Comparable field measurements inside parks and at multiple distances beyond their boundaries, covering hot spells and different wind conditions."
		],
		misconceptions: [
			"Every nearby home does not receive the same benefit.",
			"A cooler satellite image does not directly measure the heat felt by a person on a path."
		],
		sources: [sources.parkDesign, sources.greening]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "energy-and-infrastructure",
		slug: "do-reflective-roofs-reduce-building-cooling-demand",
		title: "Do reflective roofs reduce building cooling demand?",
		bottomLine: "Yes, especially in hot, sunny conditions. A roof that reflects more sunlight absorbs less heat, which can reduce the need for air conditioning. Year-round energy savings depend on the climate, insulation and building. Extra winter heating can offset part of the summer benefit.",
		stableCore: [
			"Cool roofs work by reflecting more incoming sunlight and releasing absorbed heat. Research syntheses and building models support reduced cooling demand, with results that vary widely across climates and roof designs.",
			"A 2023 residential-building modeling study explicitly compares summer cooling benefits with winter heating penalties. A separate six-city simulation compares green and reflective roofs under current and future climates. These are building-specific projections, rather than measured savings for every existing home."
		],
		editorSummary: "Cooling savings and total annual energy savings are different outcomes.",
		population: "Buildings in the climates and construction types represented by cool-roof reviews and simulations.",
		scope: "Compare solar-reflective and conventional roofs; distinguish roof temperature, cooling loads, heating loads and total annual energy use.",
		uncertainty: "Model assumptions, insulation, roof aging, local weather and heating systems influence annual results. Projected future-climate savings are not observations of present-day performance.",
		openQuestions: [
			"How do real energy savings change as roof reflectance ages?",
			"Which cold-climate buildings retain a net annual benefit?"
		],
		whatWouldChangeMinds: [
			"Multi-season metered building studies matching reflective and conventional roofs for insulation, occupancy and heating or cooling equipment."
		],
		misconceptions: [
			"A cooler roof does not imply the same percentage reduction in a household energy bill.",
			"A summer cooling benefit does not by itself establish a year-round energy saving."
		],
		sources: [sources.coolRoofReview, sources.coolRoofModel, sources.roofModel]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "energy-and-infrastructure",
		slug: "do-green-roofs-reduce-building-energy-use",
		title: "Do green roofs reduce building energy use?",
		bottomLine: "They can. Vegetation and the growing layer change how heat moves through a roof, and water loss can provide cooling. The saving depends on the climate, roof design, water and existing insulation. A green roof has no single energy advantage over every alternative.",
		stableCore: [
			"Reviews identify climate, the growing layer, plant choice, irrigation and insulation as factors affecting energy performance. The extra benefit can differ between a poorly insulated roof and an already well-insulated building.",
			"The literature includes both monitored roofs and simulations. A 2024 six-city modeling study projects benefits under specified climate and building assumptions. Large modeled savings in one scenario should not be used as a forecast for a different building."
		],
		editorSummary: "A green roof's energy performance depends on the building and climate.",
		population: "Buildings with vegetated roofs, as represented in cross-climate reviews and building-energy simulations.",
		scope: "Compare vegetated and conventional roofs for building heating and cooling; distinguish heat flow through a roof from whole-building energy use.",
		uncertainty: "Studies use different roof layers, climates and comparison buildings. Much of the evidence uses models, and local water or maintenance needs affect practical suitability.",
		openQuestions: [
			"What extra energy benefit remains after a building already has good roof insulation?",
			"How do water shortages and roof aging change long-term performance?"
		],
		whatWouldChangeMinds: [
			"Long-term matched-building measurements comparing green roofs, insulation upgrades and reflective roofs under similar conditions."
		],
		misconceptions: [
			"A reduction in heat passing through a roof is not the same reduction in total building energy use.",
			"An energy benefit alone does not establish structural suitability or total environmental benefit."
		],
		sources: [sources.greenRoofReview, sources.greenRoofClimate, sources.roofModel]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-cool-pavements-improve-pedestrian-thermal-comfort",
		title: "Do cool pavements improve comfort for pedestrians?",
		bottomLine: "Sometimes. A cooler road surface can help, but reflective coatings also bounce sunlight toward people. Field studies have found both improved and worsened heat exposure. Surface temperature alone cannot tell us whether a person walking there will feel cooler.",
		band: "mixed",
		stableCore: [
			"A review of outdoor cool-pavement studies finds lower surface temperatures but also varied testing methods and limited comparable field evidence. Pavements that reflect sunlight and pavements cooled by evaporation work through different mechanisms.",
			"A 2020 Los Angeles field study measured lower coated-road surface temperatures alongside greater midday radiant heat exposure. A 2024 Pacoima study found predominantly beneficial thermal-comfort indicators, with substantial variation. Differences in materials, weather, shade and study design matter."
		],
		editorSummary: "Pedestrian heat exposure includes reflected sunlight as well as air and surface temperatures.",
		population: "Pedestrians around reflective pavements in the field settings studied, with broader outdoor pavement reviews as context.",
		scope: "Include pedestrian-height air temperature, radiant heat and thermal-comfort measurements; distinguish reflective coatings from other cool-pavement technologies.",
		uncertainty: "Direct field studies are limited and context-dependent. Measurements from different products, times of day and climates cannot be treated as a single universal effect.",
		openQuestions: [
			"Which combinations of coating, shade and street geometry improve net pedestrian comfort?",
			"How do aging, wear and heatwave conditions change the result?"
		],
		whatWouldChangeMinds: [
			"Independent replicated field trials measuring net pedestrian heat exposure, including reflected sunlight, across products, seasons and climates."
		],
		misconceptions: [
			"A cool surface does not necessarily mean a cooler person.",
			"Evidence of a benefit at one installation does not establish the same result for every coating."
		],
		sources: [sources.coolPavementReview, sources.reflectiveExposure, sources.reflectiveComfort]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-green-roofs-reduce-stormwater-runoff",
		title: "Do green roofs reduce stormwater runoff?",
		bottomLine: "Yes, on average. A green roof can hold some rain and delay water reaching drains. Its capacity changes with the storm and how wet the roof already is. A roof that retains a high share of a small shower may retain a much smaller share of heavy rain.",
		stableCore: [
			"A quantitative synthesis combined 2,375 experimental samples from 75 studies across 21 countries. Retention varied widely with rainfall, the growing layer, plant cover, climate and season. The pooled average is not a design promise for a particular roof.",
			"A newer green-infrastructure meta-analysis also finds that the retained share tends to fall as rainfall totals rise. Water retained during an event and a delay in peak drainage are separate outcomes; both matter for a drainage system."
		],
		editorSummary: "Available storage and storm size govern how much rain a green roof retains.",
		population: "Vegetated roofs represented in international experimental studies and broader green-infrastructure syntheses.",
		scope: "Assess event-scale roof rainfall retention and runoff timing; distinguish these outcomes from flood reduction across a whole catchment.",
		uncertainty: "Starting moisture and reporting methods differ across studies. Evidence from one climate or roof design may not transfer to another.",
		openQuestions: [
			"How much useful storage remains during closely spaced storms?",
			"Which roof designs retain performance under future heavy-rain patterns?"
		],
		whatWouldChangeMinds: [
			"Comparable multi-year monitoring of rainfall, starting roof moisture and drainage, including sequences of extreme storms."
		],
		misconceptions: [
			"A reported average retention percentage does not apply to every storm.",
			"Retaining rooftop rain does not by itself prove that a neighborhood is protected from flooding."
		],
		sources: [sources.greenRoofRunoff, sources.greenInfrastructure]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "energy-and-infrastructure",
		slug: "do-permeable-pavements-reduce-stormwater-runoff",
		title: "Do permeable pavements reduce stormwater runoff?",
		bottomLine: "Yes, when the pavement and the layers beneath it can accept and manage the water. Water may soak into the ground, be stored or leave through a drain. Heavy rain, saturated soil and clogging can limit the benefit.",
		stableCore: [
			"Reviews of porous asphalt and pervious concrete support reduced surface runoff through infiltration and storage. Performance depends on the whole pavement system, including its base, soil, drainage and the area supplying runoff.",
			"A meta-analysis spanning several green-infrastructure types finds lower retention shares during larger rainfall events. Permeable paving can reduce or delay runoff without eliminating it, and a system with an underdrain may move water rather than retain all of it on site."
		],
		editorSummary: "The soil, storage layers and drainage beneath permeable paving shape its performance.",
		population: "Permeable asphalt, pervious concrete and related urban pavement systems represented in the cited reviews.",
		scope: "Compare pavement runoff, infiltration and storage; distinguish surface permeability from total system capacity and downstream flood outcomes.",
		uncertainty: "Materials, storm conditions, soils and maintenance vary substantially. Short laboratory tests cannot establish years of field drainage performance.",
		openQuestions: [
			"How well do different systems perform after years of sediment loading?",
			"Which designs remain useful where soils drain slowly or groundwater is high?"
		],
		whatWouldChangeMinds: [
			"Long-term field comparisons reporting incoming rainfall and runoff, base storage, soil conditions, drain flows and maintenance history."
		],
		misconceptions: [
			"A permeable surface does not give the ground beneath it unlimited capacity.",
			"Water entering the pavement may still leave through a drain."
		],
		sources: [sources.permeableAsphalt, sources.perviousConcrete, sources.greenInfrastructure]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "energy-and-infrastructure",
		slug: "how-does-maintenance-affect-permeable-pavement-drainage",
		title: "How does maintenance affect permeable pavement drainage?",
		bottomLine: "Clogging can reduce the amount of water that enters permeable paving. Suitable cleaning and control of incoming sediment can help preserve or recover drainage. Results depend on the material and where sediment collects, so one cleaning method will not suit every system.",
		stableCore: [
			"Reviews identify sediment accumulation in pavement pores as a major cause of declining infiltration. Pavement type, pore structure, sediment and installation conditions influence how quickly drainage is lost.",
			"A review of 191 publications considers clogging controls from design through maintenance. It supports matching cleaning and sediment control to the system, rather than assuming a fixed treatment restores every pavement to new condition."
		],
		editorSummary: "Maintenance needs follow the pavement type, sediment load and depth of clogging.",
		population: "Permeable asphalt, pervious concrete and permeable block systems examined in clogging and maintenance reviews.",
		scope: "Assess changes in infiltration and recovery after maintenance; distinguish material tests from operating urban systems and avoid universal service schedules.",
		uncertainty: "Testing methods and follow-up periods differ. Improvements immediately after cleaning do not establish lasting recovery under repeated sediment loading.",
		openQuestions: [
			"Which maintenance methods provide durable recovery for different clogging depths?",
			"What monitoring best identifies declining capacity before surface runoff increases?"
		],
		whatWouldChangeMinds: [
			"Repeated field comparisons recording sediment loads, drainage before and after maintenance, costs and performance over subsequent storms."
		],
		misconceptions: [
			"A permeable pavement does not remain equally permeable without upkeep.",
			"Restored surface infiltration does not prove the layers below are draining correctly."
		],
		sources: [sources.pavementClogging, sources.permeableAsphalt, sources.perviousConcrete]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-rain-gardens-reduce-stormwater-pollution",
		title: "Do rain gardens reduce stormwater pollution?",
		bottomLine: "Often, but results differ by pollutant and design. Rain gardens and related planted filters can reduce runoff and the total amount of some pollutants leaving a site. The water that leaves can still have high nutrient concentrations, and some systems release phosphorus.",
		stableCore: [
			"A global field-study meta-analysis covering 50 bioretention systems finds average reductions in runoff and several pollutant loads, with large differences between sites. A lower load can partly result from less water leaving, even when the pollutant concentration changes little.",
			"A separate database analysis covering more than 400 rain events across over 30 systems found variable nitrogen and phosphorus outcomes. Many systems had higher phosphorus concentrations in surface outflow while still reducing total surface-runoff loads. Concentration, load and effects on receiving waters need separate assessment."
		],
		editorSummary: "Less runoff can lower pollutant loads even when outflow concentrations remain high.",
		population: "Field bioretention systems, including engineered rain gardens, represented in international studies and a stormwater-practice database.",
		scope: "Assess runoff volumes and pollutant concentrations and loads; distinguish nitrogen, phosphorus and suspended solids rather than treating all pollutants as one outcome.",
		uncertainty: "Design, age, incoming pollution and drainage pathways vary. Surface-outflow improvements alone do not establish groundwater protection or downstream ecological recovery.",
		openQuestions: [
			"Which planting media reduce nutrient release over the life of a system?",
			"How do surface-outflow improvements compare with changes in groundwater and receiving streams?"
		],
		whatWouldChangeMinds: [
			"Long-term field studies tracking pollutant mass through surface outflow, infiltration and receiving waters across different designs."
		],
		misconceptions: [
			"A lower pollutant load does not necessarily mean a lower concentration in each litre of outflow.",
			"A rain garden's performance for one pollutant does not establish removal of every contaminant."
		],
		sources: [sources.bioretention, sources.bioretentionNutrients]
	}, novemberUrbanResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "how-much-can-green-infrastructure-reduce-urban-flood-risk",
		title: "How much can green infrastructure reduce urban flood risk?",
		bottomLine: "It can reduce and slow some runoff, but the benefit depends on the storm and how much of the drainage area is treated. Limited storage fills during large or repeated storms. Flood planning also needs to account for drains, overflow routes, rivers and coastal water where relevant.",
		stableCore: [
			"A 2025 meta-analysis examines green roofs, permeable paving, planted basins, swales and infiltration trenches. It finds that runoff retention generally falls as rainfall totals rise, while inconsistent reporting limits comparisons between systems.",
			"Field evidence for planted basins supports reduced runoff volumes and peak flows at individual installations. Those measurements help evaluate a component of flood management. Establishing neighborhood flood-risk reduction also requires evidence about location, drainage connections, treatment coverage and extreme events."
		],
		editorSummary: "Site-level runoff reduction and protection across a neighborhood require different evidence.",
		population: "Urban drainage areas using green roofs, permeable surfaces and planted stormwater systems.",
		scope: "Connect observed component-scale retention and peak-flow evidence with catchment-scale flood claims; distinguish field measurements from modeled scenarios.",
		uncertainty: "Field and modeling studies differ in scale and assumptions. The cited component results do not establish a universal percentage reduction in flood damage.",
		openQuestions: [
			"Which combinations of placement and treatment coverage best reduce damaging flood peaks?",
			"How do saturated starting conditions and successive extreme storms change protection?"
		],
		whatWouldChangeMinds: [
			"Catchment-scale monitoring and independently tested models linking maintained green-infrastructure coverage to flood depths, overflow and damage during severe storms."
		],
		misconceptions: [
			"A high retention percentage at one installation is not the same reduction in flood risk throughout a city.",
			"Useful runoff reduction does not imply unlimited storage or protection against every flood source."
		],
		sources: [sources.greenInfrastructure, sources.bioretention]
	}, novemberUrbanResearchCheckedAt)
];
