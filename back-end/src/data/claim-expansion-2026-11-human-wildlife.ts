import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberHumanWildlifeResearchCheckedAt = "2026-11-08T08:23:39.889Z";

const sources = {
	citizenScience1: researchSource("The potential for citizen science to produce reliable and useful information in ecology", "Conservation Biology", 2019, "https://doi.org/10.1111/cobi.13223", "10.1111/cobi.13223", "Review distinguishes designed monitoring from opportunistic observations. Training, design, analysis and the research question determine inferential value; volunteer status alone does not determine reliability.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	citizenScience2: researchSource("Data quality issues in data used in species distribution models: A systematic literature review", "Ecological Informatics", 2025, "https://doi.org/10.1016/j.ecoinf.2025.103378", "10.1016/j.ecoinf.2025.103378", "Review of 212 articles identifies fourteen recurring data-quality problems in species-distribution modeling. It is not a pooled accuracy estimate for citizen-science platforms or population trends.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt),
	citizenValidation1: researchSource("Using photographic records to quantify accuracy of bird identifications in citizen science data", "Ibis", 2023, "https://doi.org/10.1111/ibi.13137", "10.1111/ibi.13137", "Assessment of over 104,000 photographs of 377 Argentine passerine species found high overall identification accuracy, with harder species groups performing less well. Photo accuracy is not unbiased coverage or platform-wide accuracy.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	citizenValidation2: researchSource("Revealing biases in insect observations: A comparative analysis between academic and citizen science data", "PLOS ONE", 2024, "https://doi.org/10.1371/journal.pone.0305757", "10.1371/journal.pone.0305757", "Iberian insect comparison finds taxonomic and other biases in both academic and citizen records, with broader spatial coverage in citizen data. Professional observations are not an error-free reference.", "landmark_study", "context", novemberHumanWildlifeResearchCheckedAt),
	cameraTraps1: researchSource("REVIEW: Wildlife camera trapping: a review and recommendations for linking surveys to ecological processes", "Journal of Applied Ecology", 2015, "https://doi.org/10.1111/1365-2664.12432", "10.1111/1365-2664.12432", "Review of 266 studies from 2008-2013 identifies imperfect detection, sampling and movement assumptions. Encounter rates, occupancy, abundance and density are different measurements.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt),
	cameraTraps2: researchSource("Abundance estimation of unmarked animals based on camera‐trap data", "Conservation Biology", 2021, "https://doi.org/10.1111/cobi.13517", "10.1111/cobi.13517", "Methods review of 927 studies from 2014-2019 identifies six approaches for unmarked-animal abundance. About five percent used these approaches; this is method prevalence, not five-percent counting accuracy.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	cameraValidation1: researchSource("Can we count you: validating density estimation methods for unmarked wildlife with camera traps", "Biodiversity and Conservation", 2025, "https://doi.org/10.1007/s10531-024-02969-9", "10.1007/s10531-024-02969-9", "Validation compares three camera-based models with independent estimates for several forest mammals. Agreement and precision varied, with poor agreement for jaguars. Reference methods also have uncertainty; publication issue is 2025.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	cameraValidation2: researchSource("Using camera traps and N‐mixture models to estimate population abundance: Model selection really matters", "Methods in Ecology and Evolution", 2024, "https://doi.org/10.1111/2041-210x.14320", "10.1111/2041-210x.14320", "Moose comparison finds the two most parsimonious models gave implausible, imprecise abundance estimates, while several alternatives were more realistic. Statistical model ranking alone did not establish predictive accuracy.", "landmark_study", "debate", novemberHumanWildlifeResearchCheckedAt),
	birdLight1: researchSource("Effects of artificial light on bird movement and distribution: a systematic map", "Environmental Evidence", 2021, "https://doi.org/10.1186/s13750-021-00246-8", "10.1186/s13750-021-00246-8", "Systematic map of 490 eligible studies documents diverse bird movement and distribution responses. A map catalogs evidence and gaps rather than supplying one pooled causal effect.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	birdLight2: researchSource("Lost in the Light: Effects of Exposure to Artificial Light at Night on Migratory Birds", "Journal of Experimental Zoology Part A: Ecological and Integrative Physiology", 2026, "https://doi.org/10.1002/jez.70043", "10.1002/jez.70043", "2026 review describes migration, orientation and collision concerns alongside gaps in mechanisms, mitigation and long-term fitness. Short-term responses are not a direct population-decline estimate.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	birdLight3: researchSource("Artificial light at night is a top predictor of bird migration stopover density", "Nature Communications", 2023, "https://doi.org/10.1038/s41467-023-43046-z", "10.1038/s41467-023-43046-z", "US remote-sensing analysis uses over ten million observations, not ten million individually tracked birds. Skyglow prediction of stopover density does not itself prove causal attraction, mortality or an ecological trap.", "landmark_study", "context", novemberHumanWildlifeResearchCheckedAt),
	recreation1: researchSource("A systematic review of methods for studying the impacts of outdoor recreation on terrestrial wildlife", "Global Ecology and Conservation", 2020, "https://doi.org/10.1016/j.gecco.2020.e00917", "10.1016/j.gecco.2020.e00917", "Methods review of 126 terrestrial-wildlife papers excludes birds. It compares measurement approaches and timescales rather than estimating a universal disturbance effect.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt),
	recreation2: researchSource("Effects of Recreation on Animals Revealed as Widespread through a Global Systematic Review", "PLOS ONE", 2016, "https://doi.org/10.1371/journal.pone.0167259", "10.1371/journal.pone.0167259", "Global review of 274 articles finds widespread measured responses, many negative. Article-level detection of an effect is not the proportion of animals harmed; recreation-type comparisons are not randomized risk ratios.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	recreation3: researchSource("Impacts of outdoor recreation on mammals and birds in mountain landscapes: A systematic review of the past two decades and directions for future research", "Journal of Outdoor Recreation and Tourism", 2026, "https://doi.org/10.1016/j.jort.2026.101089", "10.1016/j.jort.2026.101089", "2026 mountain review covers 108 articles, concentrated in Europe, North America and selected taxa. Behavioral or habitat-use changes do not automatically establish population decline.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	drones1: researchSource("Impact of Drone Disturbances on Wildlife: A Review", "Drones", 2025, "https://doi.org/10.3390/drones9040311", "10.3390/drones9040311", "Review describes behavioral and physiological drone responses across environments, while emphasizing limited evidence about repeated exposure and long-term consequences. It does not establish universal safe flight limits.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	drones2: researchSource("A meta-analysis of disturbance caused by drones on nesting birds", "Journal of Field Ornithology", 2023, "https://doi.org/10.5751/jfo-00259-940203", "10.5751/jfo-00259-940203", "Nesting-bird analysis includes seventeen studies and thirty-one effect sizes with substantial heterogeneity. Species and context constrain interpretation; pooled results do not establish a universal absence-of-disturbance threshold.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	drones3: researchSource("A meta‐analysis of the impact of drones on birds", "Frontiers in Ecology and the Environment", 2025, "https://doi.org/10.1002/fee.2809", "10.1002/fee.2809", "Avian review of 149 studies and associated meta-analysis identifies context-dependent flushing responses. Reduced disturbance relative to another survey method is not proof of harmlessness; the journal issue is 2025, not the online-first year.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	terrestrialNoise1: researchSource("The effects of anthropogenic noise on animals: a meta-analysis", "Biology Letters", 2019, "https://doi.org/10.1098/rsbl.2019.0649", "10.1098/rsbl.2019.0649", "Broad synthesis finds noise responses across animal groups but includes both terrestrial and aquatic species. An overall response is not a uniform estimate of harm to every land-animal population.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	terrestrialNoise2: researchSource("A meta‐analysis of the influence of anthropogenic noise on terrestrial wildlife communication strategies", "Journal of Applied Ecology", 2021, "https://doi.org/10.1111/1365-2664.13880", "10.1111/1365-2664.13880", "Terrestrial communication synthesis is driven largely by bird studies and finds changes in some call features rather than all features. Altered signaling is not a direct measurement of survival or full compensation.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	terrestrialNoise3: researchSource("What is the evidence for the impacts of airborne anthropogenic noise on wildlife? A systematic map update", "Environmental Evidence", 2025, "https://doi.org/10.1186/s13750-025-00368-3", "10.1186/s13750-025-00368-3", "Updated airborne-noise map contains 863 articles, including 665 primary studies and many syntheses. These are not 863 independent experiments, and the map does not produce a new pooled harm estimate.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt),
	greenRoofs1: researchSource("The relationship between green roofs and urban biodiversity: a systematic review", "Biodiversity and Conservation", 2022, "https://doi.org/10.1007/s10531-022-02436-3", "10.1007/s10531-022-02436-3", "Roof-specific review finds some biodiversity benefit but not equivalence to all natural habitats. Evidence is concentrated on plants, arthropods and selected countries; presence need not establish persistent populations.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	greenRoofs2: researchSource("The contribution of constructed green infrastructure to urban biodiversity: A synthesis and meta‐analysis", "Journal of Applied Ecology", 2019, "https://doi.org/10.1111/1365-2664.13475", "10.1111/1365-2664.13475", "Thirty-three eligible studies assess several green-infrastructure types, not roofs alone. Benefits against conventional infrastructure cannot be treated as equivalence to natural habitat in all settings.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	greenRoofs3: researchSource("The role of green roofs as urban habitats for biodiversity modulated by their design: a review", "Environmental Research Letters", 2023, "https://doi.org/10.1088/1748-9326/acd801", "10.1088/1748-9326/acd801", "Design-focused review highlights soil-community gaps and links among roof and landscape conditions. It is not an independent field experiment or a universal design-performance estimate.", "technical_reference", "context", novemberHumanWildlifeResearchCheckedAt),
	solarBiodiversity1: researchSource("Existing evidence on the effects of photovoltaic panels on biodiversity: a systematic map with critical appraisal of study validity", "Environmental Evidence", 2023, "https://doi.org/10.1186/s13750-023-00318-x", "10.1186/s13750-023-00318-x", "Critically appraised map includes 158 articles and 137 primary/modelling study designs, with many at high or unclear risk of bias. Its 434 observations are not independent experiments or a pooled benefit estimate.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt),
	solarBiodiversity2: researchSource("Known and unknown biodiversity impacts of solar PV: A review of life cycle stages and mitigation opportunities", "Applied Energy", 2026, "https://doi.org/10.1016/j.apenergy.2026.128008", "10.1016/j.apenergy.2026.128008", "Life-cycle review of 54 articles contrasts habitat conversion with possible gains on degraded land. Most evidence concerns operation; selected planning-study proportions are not universal success rates or expert agreement.", "technical_reference", "context", novemberHumanWildlifeResearchCheckedAt),
	solarBiodiversity3: researchSource("Photovoltaic panels affect arthropod and plant communities: a systematic review", "Biodiversity and Conservation", 2026, "https://doi.org/10.1007/s10531-026-03411-y", "10.1007/s10531-026-03411-y", "2026 synthesis collates 817 quantitative results from 56 publications and finds average negative plant/arthropod effects, particularly beneath panels. Results are not 817 independent studies or a uniform whole-site effect.", "meta_analysis", "debate", novemberHumanWildlifeResearchCheckedAt),
	fishPassage1: researchSource("Updating the consensus on fishway efficiency: A meta‐analysis", "Fish and Fisheries", 2021, "https://doi.org/10.1111/faf.12547", "10.1111/faf.12547", "Sixty-article synthesis separates attraction and passage, with 100 species at 75 fishways. Prior experience and ecology mattered; finding an entrance and completing passage have different denominators.", "meta_analysis", "context", novemberHumanWildlifeResearchCheckedAt),
	fishPassage2: researchSource("Attraction and passage efficiency for salmonids and non‐salmonids based on fishway: A meta‐analysis approach", "River Research and Applications", 2023, "https://doi.org/10.1002/rra.4194", "10.1002/rra.4194", "Analysis of 64 studies and 76 fishways compares salmonids and other fish, with design-dependent results. These broad categories contain variation and do not establish one best design for all species.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	fishPassage3: researchSource("Passage efficiency through fishways of species of the family Cyprinidae and their management implications for fragmented rivers", "Scientific Reports", 2024, "https://doi.org/10.1038/s41598-024-73965-w", "10.1038/s41598-024-73965-w", "Cyprinid-focused telemetry synthesis finds performance that can compare favorably with salmonids. This challenges treating all non-salmonids alike; passage does not establish complete migration or population recovery.", "meta_analysis", "debate", novemberHumanWildlifeResearchCheckedAt),
	reserveSpillover1: researchSource("Assessing spillover from marine protected areas and its drivers: A meta‐analytical approach", "Fish and Fisheries", 2020, "https://doi.org/10.1111/faf.12469", "10.1111/faf.12469", "Database of 23 fully protected areas finds ecological gradients near boundaries. Exported biomass or higher nearby abundance does not itself establish increased total fishery yield or income.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	reserveSpillover2: researchSource("When does spillover from marine protected areas indicate benefits to fish abundance and catch?", "Theoretical Ecology", 2025, "https://doi.org/10.1007/s12080-024-00596-2", "10.1007/s12080-024-00596-2", "Spatial modeling and case review show spillover gradients can occur without net catch gains. A model is not a field experiment, and prior fishing pressure changes the relevant counterfactual.", "technical_reference", "debate", novemberHumanWildlifeResearchCheckedAt),
	reserveSpillover3: researchSource("Evidence that spillover from Marine Protected Areas benefits the spiny lobster (Panulirus interruptus) fishery in southern California", "Scientific Reports", 2021, "https://doi.org/10.1038/s41598-021-82371-5", "10.1038/s41598-021-82371-5", "Southern California lobster comparison finds increased catch and effort around two reserves but no corresponding catch-per-unit-effort gain. This local observational comparison is not a universal or randomized fishery-benefit estimate.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	phenology1: researchSource("Plant phenology shifts under climate warming: a systematic review of recent scientific literature", "Environmental Monitoring and Assessment", 2024, "https://doi.org/10.1007/s10661-023-12190-w", "10.1007/s10661-023-12190-w", "Review of 215 studies finds common spring advances with geographic, seasonal and plant-group gaps. Timing shifts do not directly measure productivity or ecological benefit.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	phenology2: researchSource("Climate warming interacts with other global change drivers to influence plant phenology: A meta‐analysis of experimental studies", "Ecology Letters", 2023, "https://doi.org/10.1111/ele.14259", "10.1111/ele.14259", "Experimental synthesis of 242 articles finds interactions of warming with water, nutrients and carbon dioxide across plant phases. Interactions can strengthen or oppose responses; effects are not one uniform calendar shift.", "meta_analysis", "context", novemberHumanWildlifeResearchCheckedAt),
	phenology3: researchSource("Plant phenological responses to experimental warming: A synthesis", "Global Change Biology", 2021, "https://doi.org/10.1111/gcb.15685", "10.1111/gcb.15685", "Seventy warming studies contribute 1,226 observations, not 1,226 independent studies. Early- and late-season phases differ, with underrepresentation outside temperate Northern Hemisphere settings.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	speciesRanges1: researchSource("Species’ traits as predictors of range shifts under contemporary climate change: A review and meta‐analysis", "Global Change Biology", 2017, "https://doi.org/10.1111/gcb.13736", "10.1111/gcb.13736", "Trait review spans 51 studies, with a smaller formal meta-analysis subset. Many simple trait predictions receive limited support; this is not a new universal range-shift rate.", "meta_analysis", "context", novemberHumanWildlifeResearchCheckedAt),
	speciesRanges2: researchSource("Temperature change effects on marine fish range shifts: A meta‐analysis of ecological and methodological predictors", "Global Change Biology", 2023, "https://doi.org/10.1111/gcb.16770", "10.1111/gcb.16770", "Marine-fish synthesis covers 115 taxa and 595 population responses across latitude, longitude and depth. Responses are not unique species counts; ecological and methodological predictors both matter.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	speciesRanges3: researchSource("Rapid Range Shifts of Species Associated with High Levels of Climate Warming", "Science", 2011, "https://doi.org/10.1126/science.1206432", "10.1126/science.1206432", "Terrestrial synthesis reports median poleward and uphill rates with broad individual variation. Its medians cannot be directly compared with means from differently sampled later reviews to infer acceleration or slowing.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	speciesRanges4: researchSource("Climate change and the global redistribution of biodiversity: substantial variation in empirical support for expected range shifts", "Environmental Evidence", 2023, "https://doi.org/10.1186/s13750-023-00296-0", "10.1186/s13750-023-00296-0", "Systematic synthesis finds positive average latitudinal/elevational rates while fewer than half of directional observations match expectations. Observation fractions are not the fraction of all global species; depth evidence is less consistent.", "systematic_review", "debate", novemberHumanWildlifeResearchCheckedAt),
	roadSalt1: researchSource("A review of the species, community, and ecosystem impacts of road salt salinisation in fresh waters", "Freshwater Biology", 2019, "https://doi.org/10.1111/fwb.13286", "10.1111/fwb.13286", "Review spans organism, community and ecosystem responses to road-salt salinization, with varying sensitivity. Sublethal effects and community changes do not require an obvious mass fish kill.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	roadSalt2: researchSource("The effects of road salt on freshwater ecosystems and solutions for mitigating chloride pollution - A review", "Science of The Total Environment", 2022, "https://doi.org/10.1016/j.scitotenv.2021.150289", "10.1016/j.scitotenv.2021.150289", "Review describes chloride accumulation and catchment processes, including exposure beyond winter runoff. It does not supply a universal safe concentration or a current legal-compliance standard.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	roadSalt3: researchSource("The ecosystem implications of road salt as a pollutant of freshwaters", "WIREs Water", 2023, "https://doi.org/10.1002/wat2.1629", "10.1002/wat2.1629", "Ecosystem review discusses food-web feedbacks and limitations of one-size-fits-all thresholds. The journal issue is 2023, distinct from its earlier online year.", "technical_reference", "context", novemberHumanWildlifeResearchCheckedAt),
	roadSalt4: researchSource("Current water quality guidelines across North America and Europe do not protect lakes from salinization", "Proceedings of the National Academy of Sciences", 2022, "https://doi.org/10.1073/pnas.2115033119", "10.1073/pnas.2115033119", "Multi-site North American/European experiments found zooplankton responses at benchmarks evaluated in 2022, with varied food-web effects. Site proportions are not global lake-damage rates, and benchmark comparisons are not current legal guidance.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	artificialTurf1: researchSource("Environmental impacts of artificial turf: a scoping review", "International Journal of Environmental Science and Technology", 2024, "https://doi.org/10.1007/s13762-024-05689-3", "10.1007/s13762-024-05689-3", "Scoping review of forty articles and reports covers turf components, particle loss and chemical release. Heterogeneous methods limit a universal emission estimate or quantified real-world health conclusion.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	artificialTurf3: researchSource("The dark side of artificial greening: Plastic turfs as widespread pollutants of aquatic environments", "Environmental Pollution", 2023, "https://doi.org/10.1016/j.envpol.2023.122094", "10.1016/j.envpol.2023.122094", "Regional river/coastal survey identifies turf fibers among plastic debris, including mesoplastics and macroplastics. Sample shares are not global microplastic shares, and observed particles do not establish player disease risk.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	artificialTurf4: researchSource("Mechanisms of Generation and Ecological Impacts of Nano- and Microplastics from Artificial Turf Systems in Sports Facilities", "Environments", 2025, "https://doi.org/10.3390/environments12040109", "10.3390/environments12040109", "Review describes wear/weathering and particle-release pathways while noting limited field-rate and long-term-fate data. Laboratory hazard evidence does not establish actual human exposure or disease.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	biodiversityOffsets1: researchSource("The ecological outcomes of biodiversity offsets under “no net loss” policies: A global review", "Conservation Letters", 2019, "https://doi.org/10.1111/conl.12664", "10.1111/conl.12664", "Global review finds thirty-two outcome reports and major measurement gaps. Area-based outcomes and selected reports do not establish equivalent species-level recovery or a representative global success percentage.", "systematic_review", "debate", novemberHumanWildlifeResearchCheckedAt),
	biodiversityOffsets2: researchSource("Compensating for lost nature values through biodiversity offsetting – Where is the evidence?", "Biological Conservation", 2021, "https://doi.org/10.1016/j.biocon.2021.109117", "10.1016/j.biocon.2021.109117", "Review of forty primary-outcome evaluations includes a pooled reference-habitat comparison but finds development losses were not quantified. Gains against a reference are not proof of compensating the actual losses.", "meta_analysis", "debate", novemberHumanWildlifeResearchCheckedAt),
	offsetValidation1: researchSource("On track to achieve no net loss of forest at Madagascar’s biggest mine", "Nature Sustainability", 2022, "https://doi.org/10.1038/s41893-022-00850-7", "10.1038/s41893-022-00850-7", "Historical 2022 Madagascar evaluation found forest-area offsets on track at the time, with 116 model specifications for robustness. Specifications are not independent projects; forest cover is not complete biodiversity equivalence or proof of final recovery.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	offsetValidation2: researchSource("Evaluation of averted loss gains under Victorian biodiversity offset policy", "Conservation Science and Practice", 2024, "https://doi.org/10.1111/csp2.13070", "10.1111/csp2.13070", "Analysis of five Victorian policy exchanges compares credited gains with plausible counterfactuals. Modeled overestimation and conditional scheme extrapolations are not measured failure rates for every offset.", "landmark_study", "debate", novemberHumanWildlifeResearchCheckedAt),
	invasiveFire1: researchSource("Invasive grasses increase fire occurrence and frequency across US ecoregions", "Proceedings of the National Academy of Sciences", 2019, "https://doi.org/10.1073/pnas.1908253116", "10.1073/pnas.1908253116", "US analysis of twelve selected fire-promoting invasive grasses finds species-specific occurrence/frequency associations, not a consistent fire-size effect. Selection and covariates limit inference about all non-native plants.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	invasiveFire2: researchSource("Non-native plants exert strong but under-studied influence on fire dynamics", "NeoBiota", 2020, "https://doi.org/10.3897/neobiota.61.51141", "10.3897/neobiota.61.51141", "Quantitative synthesis finds enhanced fire metrics but only thirty usable papers spanning eight regions and twenty-two non-native taxa. Limited contexts cannot justify universal predictions.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	invasiveFire3: {
		...researchSource("Effects of Invasive Alien Plants on Fire Regimes", "BioScience", 2004, "https://doi.org/10.1641/0006-3568(2004)054[0677:eoiapo]2.0.co;2", "10.1641/0006-3568(2004)054[0677:eoiapo]2.0.co;2", "Conceptual review describes fuel and invasion feedbacks, not a new experiment. Fire promoting invasion and invasion altering fire are different causal directions.", "technical_reference", "context", novemberHumanWildlifeResearchCheckedAt),
		statusSources: [
			"https://doi.org/10.1641/0006-3568(2004)054[0677:eoiapo]2.0.co;2",
			"https://api.crossref.org/works?filter=updates%3A10.1641%2F0006-3568%282004%29054%5B0677%3Aeoiapo%5D2.0.co%3B2&rows=100"
		]
	},
	prescribedFire1: researchSource("Tamm review: A meta-analysis of thinning, prescribed fire, and wildfire effects on subsequent wildfire severity in conifer dominated forests of the Western US", "Forest Ecology and Management", 2024, "https://doi.org/10.1016/j.foreco.2024.121885", "10.1016/j.foreco.2024.121885", "Western US conifer synthesis distinguishes burning alone from combined treatments and later severity within treated areas. Reported relative severity reductions are not fewer ignitions, protected homes or landscape-wide damage reductions.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	prescribedFire2: researchSource("Prescribed burning mitigates the severity of subsequent wildfires in Mediterranean shrublands", "Fire Ecology", 2024, "https://doi.org/10.1186/s42408-023-00233-z", "10.1186/s42408-023-00233-z", "Portuguese shrubland remote-sensing comparison finds lower later severity with treatment-age and weather dependence. Its relative burn-ratio measure is not ignition probability, property loss or a universal management schedule.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	prescribedFire3: researchSource("Tamm review: The effects of prescribed fire on wildfire regimes and impacts: A framework for comparison", "Forest Ecology and Management", 2020, "https://doi.org/10.1016/j.foreco.2020.118435", "10.1016/j.foreco.2020.118435", "Empirical/modeling framework review addresses landscape trade-offs, cumulative fire, smoke and uncertain carbon outcomes. It is not a randomized experiment or an operational burning protocol.", "technical_reference", "context", novemberHumanWildlifeResearchCheckedAt),
	turtleExcluderNOAA: researchSource("Turtle Excluder Devices", "NOAA Fisheries", undefined, "https://www.fisheries.noaa.gov/southeast/bycatch/turtle-excluder-devices", "", "Official NOAA summary reports high exclusion effectiveness for current shrimp-trawl designs. This is gear performance, not universal field mortality reduction or population recovery; the page was updated in June 2026.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	turtleBycatch1: researchSource("The impact of turtle excluder devices and bycatch reduction devices on diverse tropical marine communities in Australia's northern prawn trawl fishery", "Fisheries Research", 2006, "https://doi.org/10.1016/j.fishres.2006.07.009", "10.1016/j.fishres.2006.07.009", "Australian paired-trawl study tests combined turtle-excluder and bycatch-reduction devices, with large turtle-catch reductions and some target-catch changes. Combined-device results do not isolate every component.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	turtleBycatch2: researchSource("Turtle Excluder Devices for Multispecies Bottom Trawls in the Mediterranean: Current Performance and the Need for Further Adjustments", "Aquatic Conservation: Marine and Freshwater Ecosystems", 2025, "https://doi.org/10.1002/aqc.70244", "10.1002/aqc.70244", "Nine-vessel Mediterranean evaluation involves eighteen turtles, sixteen potentially alive, and no live turtles retained in TED codends. Small encounter counts do not prove zero mortality; commercial catch losses varied.", "landmark_study", "context", novemberHumanWildlifeResearchCheckedAt),
	turtleBycatch3: researchSource("Reducing Sea Turtle Bycatch in the Mediterranean Mixed Demersal Fisheries", "Frontiers in Marine Science", 2019, "https://doi.org/10.3389/fmars.2019.00387", "10.3389/fmars.2019.00387", "Mediterranean study tests different measures in different gears, including trawl excluders and illuminated set nets. Results should not be attributed to one intervention across all gears or treated as a direct turtle census.", "landmark_study", "supports", novemberHumanWildlifeResearchCheckedAt),
	environmentalFlows1: researchSource("Does the implementation of environmental flows improve wetland ecosystem services and biodiversity? A literature review", "Restoration Ecology", 2016, "https://doi.org/10.1111/rec.12435", "10.1111/rec.12435", "Synthesis of 102 studies separates ecosystem-service and biodiversity outcomes, including different biodiversity responses across wetland types. A service gain is not a universal increase in species diversity.", "systematic_review", "supports", novemberHumanWildlifeResearchCheckedAt),
	environmentalFlows2: researchSource("A critical analysis of regulated river ecosystem responses to managed environmental flows from reservoirs", "Freshwater Biology", 2015, "https://doi.org/10.1111/fwb.12506", "10.1111/fwb.12506", "Critical review of seventy-six studies finds inconsistent responses, geographic bias and variable methods. Flow amount, timing and downstream conditions cannot be reduced to one universal release rule.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt),
	environmentalFlows3: researchSource("Water Releases From Dams Improve Ecological Health and Societal Benefits in Downstream Estuaries", "Estuaries and Coasts", 2023, "https://doi.org/10.1007/s12237-023-01228-4", "10.1007/s12237-023-01228-4", "Case-based review of low-inflow estuaries reports benefits under particular conditions and management contexts. These cases are not a pooled universal causal effect or proof for every coastal wetland.", "technical_reference", "supports", novemberHumanWildlifeResearchCheckedAt),
	wastewaterPlastic1: researchSource("Evaluation of conventional wastewater treatment plants efficiency to remove microplastics in terms of abundance, size, shape, and type: A systematic review and Meta-analysis", "Marine Pollution Bulletin", 2022, "https://doi.org/10.1016/j.marpolbul.2022.113462", "10.1016/j.marpolbul.2022.113462", "Seventy-seven eligible publications contribute particle-concentration data, with publication-bias evidence. Means from different plant stages are not automatically paired removal rates, and counts do not measure plastic mass.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	wastewaterPlastic2: researchSource("Removal of microplastics in wastewater treatment plants: insights from a literature meta-analysis", "Journal of Environmental Chemical Engineering", 2025, "https://doi.org/10.1016/j.jece.2025.116812", "10.1016/j.jece.2025.116812", "Review of 147 papers covers 509 real plants, with treatment-dependent median removals and gaps in sludge fate. A tertiary-stage median is not every plant's performance or destruction of captured plastic.", "meta_analysis", "supports", novemberHumanWildlifeResearchCheckedAt),
	wastewaterPlastic3: researchSource("Efficiency of Wastewater Treatment Plants (WWTPs) for Microplastic Removal: A Systematic Review", "International Journal of Environmental Research and Public Health", 2020, "https://doi.org/10.3390/ijerph17218014", "10.3390/ijerph17218014", "Fifteen research papers document high reported removal but continuing particle release. Sampling, size coverage and methods differ; removing particles from water does not establish their destruction or safe final disposal.", "systematic_review", "context", novemberHumanWildlifeResearchCheckedAt)
};

export const novemberHumanWildlifeClaims = [
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-reliable-are-citizen-science-wildlife-records",
		title: "How reliable are citizen-science wildlife records?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "They can be valuable and accurate, but reliability depends on the question, species and sampling. Correct identification alone does not make a collection of sightings a representative population survey.",
		editorSummary: "Identification errors and uneven coverage are separate problems. Professional records can also be biased, and combining sources can improve coverage.",
		stableCore: [
			"A review identifies study design, training and validation as key to reliable inference. Opportunistic sightings need different analysis from planned monitoring.",
			"An assessment of more than 104,000 bird photographs from Argentina found high overall identification accuracy, with more errors in difficult species groups. It assessed selected photographic records, not every citizen-science observation.",
			"A newer species-distribution review highlights identification and geographic biases. An Iberian insect comparison found biases in both academic and citizen records, with citizen observations providing broader spatial coverage."
		],
		openQuestions: [
			"How accuracy and coverage change across species groups, platforms and regions.",
			"Which validation methods best support population trends rather than presence records."
		],
		whatWouldChangeMinds: [
			"Independent comparisons with credible reference surveys across poorly represented taxa.",
			"Replicated trend estimates that account for effort, identification and detection differences."
		],
		misconceptions: [
			"A high rate of correct photo labels does not mean that all species and locations were sampled equally."
		],
		population: "Biodiversity-monitoring reviews, Argentine bird photographs and Iberian insect records; representation varies by species and place.",
		scope: "Reliability of wildlife observations for defined research questions, separating identification, detection, coverage and population inference.",
		excludedEvidence: [
			"Photo-based identification accuracy is not platform-wide accuracy or unbiased abundance; academic data are not an infallible reference, and selected species cases cannot establish global error rates."
		],
		uncertainty: "Data quality is task-specific. Difficult identifications, uneven observer effort and regional gaps limit generalization.",
		sources: [
			sources.citizenScience1,
			sources.citizenScience2,
			sources.citizenValidation1,
			sources.citizenValidation2
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "can-camera-traps-estimate-wildlife-population-sizes",
		title: "Can camera traps estimate wildlife population sizes?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, with suitable sampling, models and validation. Counting photographs is not the same as counting animals: one animal can appear repeatedly, while others may never be detected.",
		editorSummary: "Abundance, density and the chance that a species uses a site are different measurements. A plausible-looking model still needs checks against independent evidence.",
		stableCore: [
			"Reviews describe how detection, movement and sampling area affect estimates. Raw encounter rates require assumptions before they can indicate population size.",
			"A recent validation compared several camera-based methods with independent estimates. Results agreed for many studied species but performed less well for rare jaguars, and precision differed.",
			"A moose study found that the two top-ranked models under a common selection rule produced implausible estimates. Other models were more realistic, showing why statistical ranking alone is insufficient."
		],
		openQuestions: [
			"Which methods remain accurate for scarce species and changing movement patterns.",
			"How well uncertainty estimates reflect imperfect detection and uncertain reference counts."
		],
		whatWouldChangeMinds: [
			"Independent validations across species, densities and habitats with transparent uncertainty.",
			"Reliable estimates under realistic violations of model assumptions."
		],
		misconceptions: [
			"More animal photographs do not automatically mean more individual animals."
		],
		population: "Camera-trap reviews and validation studies of forest mammals and moose, with uneven evidence for rare species.",
		scope: "Camera-based population estimates, distinguishing repeated detections, occupancy, abundance, density and independent validation.",
		excludedEvidence: [
			"Reference surveys also have error; agreement in several species does not validate every model, and a model-selection score is not a direct measurement of population accuracy."
		],
		uncertainty: "Rare species, movement, detection and sampling design can make estimates inaccurate or imprecise. Performance is not uniform across methods.",
		sources: [
			sources.cameraTraps1,
			sources.cameraTraps2,
			sources.cameraValidation1,
			sources.cameraValidation2
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-nighttime-lighting-affect-migrating-birds",
		title: "Does nighttime lighting affect migrating birds?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Artificial light can alter where migrating birds fly or stop and can increase collision risks. Responses vary with species, weather and lighting; long-term population effects are harder to measure.",
		editorSummary: "Birds gathering near light does not establish that the habitat is beneficial. Attraction, disorientation and survival are separate outcomes.",
		stableCore: [
			"A systematic map organized 490 studies of light and bird movement or distribution. It documents varied responses, rather than one pooled effect applying to all birds.",
			"A 2026 review describes effects on orientation, movement, foraging and collision risk, while identifying gaps in long-term fitness and mitigation evidence.",
			"A large US remote-sensing study found skyglow was an important positive predictor of migration stopover density. That association does not by itself prove mortality or a harmful ecological trap."
		],
		openQuestions: [
			"Which lighting changes reliably reduce harm across migration conditions.",
			"How short-term movement changes affect survival and population trends."
		],
		whatWouldChangeMinds: [
			"Replicated lighting interventions with credible comparison sites and measured survival outcomes.",
			"Long-term evidence linking specific exposures to population-level changes."
		],
		misconceptions: [
			"A dense concentration of migrating birds is not necessarily evidence of high-quality habitat."
		],
		population: "Bird movement studies and North American migration observations; locations, species and light conditions are unevenly represented.",
		scope: "Artificial nighttime light and migratory birds, separating movement, stopover density, collisions and population effects from insect responses or window-treatment performance.",
		excludedEvidence: [
			"A systematic map is not a pooled causal estimate; remote-sensing observations are not individually tracked birds, and the fraction of predictive models is not the fraction of birds harmed."
		],
		uncertainty: "Much evidence concerns immediate behavior or associations. Mechanisms, cumulative harm and the best mitigation vary across settings.",
		sources: [
			sources.birdLight1,
			sources.birdLight2,
			sources.birdLight3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-does-outdoor-recreation-affect-wildlife",
		title: "How does outdoor recreation affect wildlife?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Recreation can change wildlife behavior and habitat use, often negatively. Effects depend on the activity, species and setting; a short-term disturbance does not automatically mean a population is declining.",
		editorSummary: "Quiet activities can also disturb animals. Comparing recreation types requires accounting for where, when and how intensely each occurs.",
		stableCore: [
			"A global review of 274 articles found widespread measured responses, many negative, with major gaps across regions and animal groups.",
			"A methods review found that studies measure different outcomes over different timescales. Detecting a behavioral response is easier than establishing lasting effects on population size.",
			"A 2026 mountain review found evidence of effects from infrastructure and activities such as hiking and skiing, while noting geographic, seasonal and taxonomic biases."
		],
		openQuestions: [
			"When repeated disturbance changes reproduction, survival or population size.",
			"Which management measures protect wildlife while maintaining access."
		],
		whatWouldChangeMinds: [
			"Long-term comparisons separating visitor activity from habitat changes and other pressures.",
			"Replicated evaluations of management changes with both wildlife and recreation outcomes."
		],
		misconceptions: [
			"Non-motorized recreation is not automatically disturbance-free."
		],
		population: "Global recreation literature and mountain studies, concentrated in selected mammals, birds, Europe and North America.",
		scope: "Non-consumptive recreation and wildlife responses, distinguishing behavior, habitat use, population outcomes and differences in activity exposure.",
		excludedEvidence: [
			"Articles reporting an effect do not count animals harmed; comparisons of activity types are not randomized risk estimates, and individual responses do not establish population decline."
		],
		uncertainty: "Study designs and outcomes vary, and reviews may share studies. Evidence is thinner for long-term community effects and less studied taxa.",
		sources: [
			sources.recreation1,
			sources.recreation2,
			sources.recreation3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-drones-disturb-wildlife",
		title: "Do drones disturb wildlife?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "They can. Some animals become vigilant, move away or show stress responses, while others show little visible reaction. The species, situation and flight characteristics matter, and lasting effects remain less certain.",
		editorSummary: "A drone can cause less disturbance than a ground or helicopter survey without being harmless. Visible behavior and physiological stress need separate measurement.",
		stableCore: [
			"A broad review describes behavioral and physiological responses across animal groups, but finds limited evidence about repeated exposure and long-term consequences.",
			"A meta-analysis of 17 nesting-bird studies found heterogeneous disturbance responses. Its findings do not establish a universal safe flight rule.",
			"A larger avian synthesis found that bird characteristics and flight conditions influenced flushing. This supports context-specific assessment rather than treating all drones or species alike."
		],
		openQuestions: [
			"Whether repeated exposure changes breeding success, survival or later behavior.",
			"How well visible responses indicate physiological effects across species."
		],
		whatWouldChangeMinds: [
			"Independent studies with suitable controls and longer-term welfare or population outcomes.",
			"Replicated comparisons that distinguish reduced disturbance from absence of disturbance."
		],
		misconceptions: [
			"An animal staying in place does not prove that it experienced no disturbance."
		],
		population: "Wildlife reviews and bird-focused syntheses, with limited long-term evidence for many animal groups.",
		scope: "Wildlife responses to drones, distinguishing immediate behavior, physiological responses and lasting effects; this is not operational flight guidance.",
		excludedEvidence: [
			"Bird-focused pooled results do not establish universal limits for all wildlife; comparison with another survey method is not proof of harmlessness, and no flight-distance or disturbance protocol is provided."
		],
		uncertainty: "Responses are species- and context-dependent. Much evidence concerns brief exposure, and study sets overlap.",
		sources: [
			sources.drones1,
			sources.drones2,
			sources.drones3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-does-human-made-noise-affect-land-animals",
		title: "How does human-made noise affect land animals?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It can interfere with communication and change behavior or other biological responses. Effects vary across animals and settings; a measured response does not always establish lasting harm to a population.",
		editorSummary: "Evidence is strongest for some well-studied groups, especially birds. Changing a call may help an animal cope without fully removing the costs of noise.",
		stableCore: [
			"A broad meta-analysis found responses to human-made noise across many animal groups, including terrestrial and aquatic species.",
			"A terrestrial communication synthesis found changes in some call features, with findings driven largely by bird studies. Not every feature changed consistently.",
			"An updated airborne-noise map catalogued 863 articles, including primary studies, reviews and models. It identifies substantial gaps rather than supplying a new pooled estimate of harm."
		],
		openQuestions: [
			"How repeated noise exposure affects reproduction and survival across poorly studied groups.",
			"Which changes in behavior are effective compensation and which carry lasting costs."
		],
		whatWouldChangeMinds: [
			"Independent long-term comparisons separating noise from traffic, habitat loss and other exposures.",
			"Replicated evaluations of noise reduction with meaningful biological outcomes."
		],
		misconceptions: [
			"An animal adjusting its calls does not prove either complete protection or inevitable population decline."
		],
		population: "Noise studies across animal groups, with terrestrial evidence concentrated on birds and transport or urban sources.",
		scope: "Airborne human-made noise and land animals, separated from underwater noise, human hearing and inference from immediate responses to population harm.",
		excludedEvidence: [
			"The broad meta-analysis includes aquatic taxa; the updated map's articles are not all independent experiments, and changes in call frequency are not direct measurements of survival."
		],
		uncertainty: "Taxonomic, geographic and outcome biases limit generalization. Long-term effects and interactions with other pressures remain unevenly measured.",
		sources: [
			sources.terrestrialNoise1,
			sources.terrestrialNoise2,
			sources.terrestrialNoise3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-green-roofs-support-urban-biodiversity",
		title: "Do green roofs support urban biodiversity?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Often, especially compared with bare conventional roofs. Green roofs can provide habitat for plants and animals, but they do not reliably replace richer ground-level habitats or protect every species.",
		editorSummary: "The comparison matters: adding vegetation to a bare roof differs from replacing an existing natural habitat. Roof conditions and the surrounding landscape affect which species use it.",
		stableCore: [
			"A roof-specific review finds some biodiversity benefits but warns that roofs cannot replace all natural habitats or complex green spaces.",
			"A meta-analysis found benefits of constructed green infrastructure over conventional alternatives. It combined several infrastructure types, rather than testing roofs alone.",
			"A design-focused review highlights limited evidence for soil communities and the importance of habitat variety and connections with other green spaces."
		],
		openQuestions: [
			"Whether roofs support lasting populations rather than temporary visits.",
			"How benefits vary outside well-studied cities and among less visible animal and soil groups."
		],
		whatWouldChangeMinds: [
			"Long-term controlled comparisons measuring reproduction, persistence and community composition.",
			"Replicated benefits across roof types and climates against clearly defined alternatives."
		],
		misconceptions: [
			"Finding species on a roof does not establish that it replaces the ecological value of a natural site."
		],
		population: "Urban roof and green-infrastructure studies, often focused on plants and arthropods in a limited set of countries.",
		scope: "Biodiversity outcomes of green roofs, distinguished from building energy, runoff control and equivalence to natural habitats.",
		excludedEvidence: [
			"The broader infrastructure meta-analysis is not a roof-only estimate; species presence does not establish successful reproduction, and natural habitat and conventional roofs are different comparators."
		],
		uncertainty: "Designs, controls and sampling vary. Evidence is thinner for long-term persistence, soil communities and many regions.",
		sources: [
			sources.greenRoofs1,
			sources.greenRoofs2,
			sources.greenRoofs3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-do-solar-farms-affect-local-biodiversity",
		title: "How do solar farms affect local biodiversity?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Effects depend strongly on what habitat is replaced and how the site is managed. Some sites gain habitat value, while others lose species or abundance, particularly beneath panels or when natural habitats are converted.",
		editorSummary: "A climate benefit does not guarantee a local habitat benefit. Benefits relative to intensive farmland and losses relative to natural grassland can both occur.",
		stableCore: [
			"A critically appraised evidence map found diverse effects and many studies at high or unclear risk of bias, with plants and arthropods studied more than other groups.",
			"A life-cycle review describes possible benefits on degraded or low-biodiversity land, alongside harms from converting natural areas and gaps outside the operating stage.",
			"A 2026 synthesis found average negative effects on plant and arthropod community measures, especially beneath panels. These findings challenge blanket biodiversity-benefit claims without establishing the same effect at every site."
		],
		openQuestions: [
			"Which management practices produce lasting benefits against realistic land-use alternatives.",
			"How local changes combine with upstream impacts and climate benefits across the full life cycle."
		],
		whatWouldChangeMinds: [
			"Independent before-and-after comparisons with matched control sites and clearly described prior habitat.",
			"Replicated outcomes across taxa, climates and operational stages."
		],
		misconceptions: [
			"Evidence that solar electricity reduces emissions does not determine how a particular solar farm affects local wildlife."
		],
		population: "Solar-facility studies with uneven taxonomic and geographic coverage, especially plants and arthropods in temperate settings.",
		scope: "Local biodiversity around solar photovoltaic facilities, distinguishing prior land use, under-panel effects, site management and full-life-cycle comparisons.",
		excludedEvidence: [
			"Quantitative results are not independent publications; under-panel averages do not describe every site or taxon, and local habitat effects cannot alone determine the climate benefit of replacing fossil generation."
		],
		uncertainty: "Comparators, site history, management and study validity differ. Coverage of many animals and non-operational stages remains limited.",
		sources: [
			sources.solarBiodiversity1,
			sources.solarBiodiversity2,
			sources.solarBiodiversity3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-effective-are-fish-passages-around-dams",
		title: "How effective are fish passages around dams?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They help some fish pass barriers, but success varies widely among species, sites and designs. Getting through a passage is only one part of restoring migration or a healthy fish population.",
		editorSummary: "Fish must first find an entrance and then pass through it. A high success rate among fish already entering a structure can miss failures to reach it.",
		stableCore: [
			"A synthesis of 60 articles found that fish ecology and prior experience mattered, while study methods were inconsistent. No single design clearly performed best across all comparisons.",
			"Another meta-analysis found different performance for salmonids and other fish, depending on design. These broad groups contain substantial variation.",
			"A cyprinid-focused synthesis found results that compared favorably with salmonids for some passages, illustrating why all non-salmonids should not be treated as one uniformly poor-performing group."
		],
		openQuestions: [
			"How passage performance translates into successful migration, reproduction and population recovery.",
			"Which designs work across entire fish communities and repeated barriers."
		],
		whatWouldChangeMinds: [
			"Standardized evaluations including fish that fail to find or enter a passage.",
			"Long-term population outcomes across species, directions of movement and multiple barriers."
		],
		misconceptions: [
			"A fishway's passage efficiency is not the percentage of a river's fish population fully restored."
		],
		population: "Fishway syntheses spanning salmonids, cyprinids and other groups, with uneven species and evaluation coverage.",
		scope: "Attraction and passage around barriers, distinguished from complete migration, habitat restoration, dam removal and population recovery.",
		excludedEvidence: [
			"Attraction and passage have different denominators; estimates from experienced fish can differ from naive fish, and results for one fish family do not validate a design for all species."
		],
		uncertainty: "Methods and species coverage vary, syntheses can share studies, and population consequences are less directly measured than passage.",
		sources: [
			sources.fishPassage1,
			sources.fishPassage2,
			sources.fishPassage3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-marine-reserves-benefit-nearby-fisheries",
		title: "Do marine reserves benefit nearby fisheries?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They can, but fish moving beyond a reserve does not guarantee a net gain in catch or income. Outcomes depend on the fishery, movement, prior fishing pressure and how fishing effort changes.",
		editorSummary: "More fish near a reserve boundary and a benefit to the whole fishery are different findings. Catch, catch per unit effort and total abundance need separate checks.",
		stableCore: [
			"A synthesis of 23 fully protected areas found higher abundance and biomass near boundaries than farther away, supporting ecological spillover in studied settings.",
			"A modeling and case-study analysis shows that such gradients can occur without an overall fishery benefit. It emphasizes the importance of conditions before closure.",
			"A Southern California lobster study found greater catch and effort increases in zones containing reserves, but no corresponding improvement in catch per unit effort. It offers a local case rather than a universal prediction."
		],
		openQuestions: [
			"Which reserves increase total sustainable yield after accounting for displaced effort and lost fishing area.",
			"How benefits differ across species, enforcement and time since protection."
		],
		whatWouldChangeMinds: [
			"Credible before-and-after comparisons of total catch, effort and abundance across the affected fishery.",
			"Replicated gains that account for changing markets, regulations and baseline fishing pressure."
		],
		misconceptions: [
			"A concentration of fish near a boundary is not by itself proof of higher overall fishery yield."
		],
		population: "A global protected-area synthesis, spatial modeling and a Southern California spiny-lobster case; coverage and fishing histories differ.",
		scope: "Benefits outside marine reserves, separating ecological spillover, catch, effort, income and total abundance from protected biomass inside a reserve.",
		excludedEvidence: [
			"Spatial gradients are not a net-benefit counterfactual; a model is not a field experiment, and local catch increases with more effort do not establish increased catch efficiency."
		],
		uncertainty: "Net benefits depend on the counterfactual and scale. Study designs, target species and fishing responses limit broad predictions.",
		sources: [
			sources.reserveSpillover1,
			sources.reserveSpillover2,
			sources.reserveSpillover3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "is-spring-plant-growth-starting-earlier-as-the-climate-warms",
		title: "Is spring plant growth starting earlier as the climate warms?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "For many studied plants, yes. Earlier leaf-out and flowering are well documented, but the response depends on species, season, water and other conditions; there is no single calendar shift for every ecosystem.",
		editorSummary: "Earlier spring growth and later autumn events are different responses. Changes in one phase do not automatically establish a longer or more productive growing season.",
		stableCore: [
			"A review of 215 studies found spring advances were common, while also identifying strong geographic and seasonal research gaps.",
			"A synthesis of 70 experimental-warming studies found earlier early-season events, with smaller or different changes later in the year.",
			"A larger experimental synthesis found that warming interacts with precipitation, nutrients and carbon dioxide. Those interactions can strengthen or weaken a response."
		],
		openQuestions: [
			"How responses will change where winter chilling, drought or day length become limiting.",
			"How timing changes affect interactions with pollinators, herbivores and frost risk."
		],
		whatWouldChangeMinds: [
			"Long-term observations and experiments spanning underrepresented climates and plant groups.",
			"Replicated predictions of multiple seasonal events under interacting environmental changes."
		],
		misconceptions: [
			"An earlier flowering date does not prove that all plants benefit from warming."
		],
		population: "Plant timing observations and warming experiments, biased toward temperate Northern Hemisphere systems and spring events.",
		scope: "Spring plant timing under warming, distinguishing leaf-out, flowering, later-season events and resulting ecological consequences.",
		excludedEvidence: [
			"Observations within studies are not independent study counts; an average spring advance does not establish the same response in every species, and timing alone does not measure productivity or frost damage."
		],
		uncertainty: "Evidence for a broad spring response is stronger than precise predictions for each species, region or future combination of conditions.",
		sources: [
			sources.phenology1,
			sources.phenology2,
			sources.phenology3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "how-are-species-ranges-shifting-as-the-climate-warms",
		title: "How are species' ranges shifting as the climate warms?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Many studied species are shifting toward higher latitudes or elevations on average, but individual responses vary greatly. Not every species moves toward cooler conditions, and changes in depth are less consistently supported.",
		editorSummary: "An average directional shift can coexist with many stationary or opposite responses. Barriers, habitat, movement and measurement all affect the observed pattern.",
		stableCore: [
			"An influential terrestrial synthesis found average shifts toward higher latitudes and elevations, alongside wide differences among species.",
			"A newer systematic synthesis also found average poleward and uphill movement, but fewer than half of its range-shift observations supported the expected direction. An observation count is not a census of all species.",
			"Marine-fish and trait syntheses show that ecological context and methods explain part of the variation. Simple trait-based predictions remain limited."
		],
		openQuestions: [
			"Which species can track changing conditions and which face barriers or other constraints.",
			"How much observed change reflects climate, land use, exploitation or survey differences."
		],
		whatWouldChangeMinds: [
			"Standardized repeated surveys across poorly studied regions, taxa and range edges.",
			"Reliable out-of-sample predictions of movement direction and rate."
		],
		misconceptions: [
			"A positive average shift does not mean that most individual species move at that average speed."
		],
		population: "Terrestrial and marine range-shift syntheses with geographic, taxonomic and methodological biases.",
		scope: "Observed geographic range responses to warming, separating latitude, elevation, depth, range edges and averages from individual trajectories.",
		excludedEvidence: [
			"Range-shift observations are not unique global species counts; medians and means from different syntheses cannot establish acceleration or slowing, and a shift alone does not identify its sole cause."
		],
		uncertainty: "Methods and coverage affect estimates, and movement direction differs across dimensions. Individual responses are harder to predict than broad average patterns.",
		sources: [
			sources.speciesRanges1,
			sources.speciesRanges2,
			sources.speciesRanges3,
			sources.speciesRanges4
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "does-road-salt-harm-freshwater-ecosystems",
		title: "Does road salt harm freshwater ecosystems?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It can. Salt carried into streams, lakes and groundwater can affect freshwater organisms and food webs. Harm depends on exposure and local conditions, while winter road safety remains a separate management need.",
		editorSummary: "Salt can persist beyond the winter application period. Effects on sensitive organisms may appear before obvious large-scale changes are visible.",
		stableCore: [
			"Reviews describe effects on growth, reproduction, communities and water chemistry, with considerable variation in sensitivity.",
			"Long-term salt use can raise chloride in groundwater and surface waters, creating exposure beyond an individual runoff event.",
			"A multi-site experiment found zooplankton effects at chloride benchmarks examined by the researchers, with food-web responses varying among sites. These results do not establish one universally protective concentration."
		],
		openQuestions: [
			"How repeated exposure, water chemistry and other pressures combine across watersheds.",
			"Which management changes reduce ecological costs while maintaining safe travel."
		],
		whatWouldChangeMinds: [
			"Long-term field evaluations linking exposure changes to community recovery.",
			"Replicated assessments across sensitive species and different freshwater settings."
		],
		misconceptions: [
			"A benchmark intended to protect water quality does not guarantee identical protection for every aquatic community."
		],
		population: "Freshwater reviews and North American/European experimental sites, with different organisms, water chemistry and exposure histories.",
		scope: "Ecological effects of road-salt salinization, distinguished from drinking-water health advice, current legal compliance and all possible sources of salinity.",
		excludedEvidence: [
			"Experimental benchmarks describe the study's comparison, not a current universal legal standard; the fraction of affected sites is not the fraction of all lakes damaged, and predicted fish-production changes are not directly measured fish declines."
		],
		uncertainty: "Sensitivity and recovery vary. Salt interacts with other stressors, and a single threshold cannot capture every community response.",
		sources: [
			sources.roadSalt1,
			sources.roadSalt2,
			sources.roadSalt3,
			sources.roadSalt4
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "does-artificial-turf-add-plastic-pollution-to-the-environment",
		title: "Does artificial turf add plastic pollution to the environment?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Plastic fibers and some infill materials can escape or wear down, adding particles to surrounding environments. Emission rates and long-term effects vary, and evidence of pollution is not proof of a specific health risk to players.",
		editorSummary: "Rubber infill and synthetic grass fibers are different sources. Studies also count different particle sizes, so their estimates cannot be treated as one universal emission rate.",
		stableCore: [
			"A scoping review of 40 articles and reports documents material losses and chemical releases, while noting inconsistent methods and important gaps.",
			"A newer review describes wear and weathering as sources of smaller plastic particles, with limited field evidence on emission rates and long-term fate.",
			"A river and coastal-water survey identified turf-like fibers among plastic debris. Its reported contribution concerned selected samples and included larger particles, rather than a global estimate of microplastic pollution."
		],
		openQuestions: [
			"How emissions differ across materials, sites, ages and maintenance practices.",
			"What happens to escaped particles over time and how much reaches particular exposure pathways."
		],
		whatWouldChangeMinds: [
			"Standardized independent field measurements with clear particle identification and size ranges.",
			"Long-term mass-balance studies and credible evaluations of material-loss reductions."
		],
		misconceptions: [
			"Finding plastic particles does not by itself establish a measured disease risk for people using the field."
		],
		population: "Artificial-turf environmental reviews and a regional aquatic-debris survey; materials, particle sizes and settings differ.",
		scope: "Plastic release from turf systems, separating fibers, infill, particle-size classes, local observations and human-health outcomes.",
		excludedEvidence: [
			"The aquatic survey included mesoplastics and macroplastics; its sample percentages are not global microplastic shares, and laboratory hazard evidence does not establish real-world player exposure or disease."
		],
		uncertainty: "Detection and reporting methods vary. General release is better supported than a precise universal emission rate or quantified long-term health effect.",
		sources: [
			sources.artificialTurf1,
			sources.artificialTurf3,
			sources.artificialTurf4
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-well-do-biodiversity-offsets-compensate-for-habitat-loss",
		title: "How well do biodiversity offsets compensate for habitat loss?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some projects show gains, but reliable like-for-like compensation is not well established across schemes. The answer depends on what was lost, what would have happened without the offset and whether ecological quality is actually restored.",
		editorSummary: "Protecting hectares and replacing species, habitat quality or ecosystem function are different outcomes. A policy promise of no net loss needs a credible comparison of both losses and gains.",
		stableCore: [
			"A global review found limited evidence of no-net-loss outcomes, with many evaluations relying on area-based measures and major gaps in forest and species outcomes.",
			"Another review found that many evaluations compared offsets with reference habitats without measuring the development losses they were meant to compensate.",
			"Later case studies differ: a Madagascar evaluation found forest offsets were on track to balance clearance at the time, while an Australian analysis found policy credits could overestimate avoided-loss gains. Forest cover and modeled credits do not settle all biodiversity outcomes."
		],
		openQuestions: [
			"Which schemes produce additional, durable ecological gains equivalent to the actual losses.",
			"How uncertainty, delayed recovery and irreplaceable habitats should affect assessments."
		],
		whatWouldChangeMinds: [
			"Independent long-term evaluations measuring development losses, offset gains and credible counterfactuals.",
			"Replicated no-net-loss outcomes for species and habitat quality, not area alone."
		],
		misconceptions: [
			"Protecting an area elsewhere does not automatically compensate for destroying a different habitat."
		],
		population: "Global offset reviews and selected Madagascar and Australian evaluations, with uneven habitat coverage and varied methods.",
		scope: "Ecological compensation through biodiversity offsets, distinguished from carbon offsets, accounting credits, forest-area proxies and completed species-level recovery.",
		excludedEvidence: [
			"A project being on track in a historical evaluation is not proof of completed recovery; alternative model specifications are not independent projects, and a small set of policy exchanges does not establish a measured scheme-wide failure percentage."
		],
		uncertainty: "Counterfactuals, ecological equivalence, time lags and monitoring gaps strongly affect conclusions. Evidence of gains is not the same as proof of full compensation.",
		sources: [
			sources.biodiversityOffsets1,
			sources.biodiversityOffsets2,
			sources.offsetValidation1,
			sources.offsetValidation2
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "how-do-invasive-plants-affect-wildfire-risk",
		title: "How do invasive plants affect wildfire risk?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Some invasive plants can make fires more frequent or change how they burn by altering fuels. Effects depend on the plant and ecosystem; being non-native does not automatically make a species a fire risk.",
		editorSummary: "Fire occurrence, frequency, size and severity are different outcomes. Climate, ignition sources and land use also matter.",
		stableCore: [
			"A US study of selected fire-promoting invasive grasses found associations with greater fire occurrence and frequency for several species, but not a consistent effect on fire size.",
			"A quantitative synthesis linked non-native plants with increased fire effects or risk, while emphasizing that the usable evidence covered relatively few taxa and regions.",
			"An earlier framework describes feedbacks in which altered fuels change fire regimes and those fires favor the invader. It is an explanatory framework rather than a new experiment."
		],
		openQuestions: [
			"Which plant-ecosystem combinations create substantial additional risk after accounting for other drivers.",
			"How changes in vegetation affect longer-term fire regimes and recovery."
		],
		whatWouldChangeMinds: [
			"Replicated landscape comparisons separating invasion from climate, ignitions and land-use history.",
			"Long-term evidence showing how changes in invasive cover alter subsequent fire outcomes."
		],
		misconceptions: [
			"Evidence for selected fire-promoting grasses does not mean every introduced plant increases wildfire risk."
		],
		population: "A US invasive-grass analysis, a limited global quantitative literature and a conceptual fire-invasion review.",
		scope: "Invasive vegetation as a driver of fire outcomes, separated from fire as an invasion-control tool and from attributing every wildfire to a single cause.",
		excludedEvidence: [
			"The US species were selected fire-promoting invaders, not a random sample of all introduced plants; associations with occurrence or frequency do not establish greater fire size, and post-fire invasion studies alone do not prove that invasion caused the fire."
		],
		uncertainty: "Evidence is concentrated in particular plants and ecosystems. Multiple interacting drivers complicate attribution and prediction.",
		sources: [
			sources.invasiveFire1,
			sources.invasiveFire2,
			sources.invasiveFire3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-prescribed-burning-reduce-the-severity-of-later-wildfires",
		title: "Does prescribed burning reduce the severity of later wildfires?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It often reduces later fire severity in treated areas of studied fire-prone ecosystems. Benefits vary with vegetation, time and weather; they do not guarantee that a fire is prevented or that homes are protected.",
		editorSummary: "Severity within a treated patch and total landscape damage are different outcomes. Prescribed fire also has costs, including smoke and effects on fire-sensitive species.",
		stableCore: [
			"A 2024 synthesis of western US conifer forests found lower later wildfire severity after prescribed burning alone or in combined treatments, with benefits declining as treatments aged.",
			"A Portuguese shrubland comparison found lower subsequent severity in treated areas, but smaller benefits under extreme fire weather. Its satellite severity measure is not a probability of ignition or property loss.",
			"A broader framework review highlights landscape-scale trade-offs, including cumulative fire, smoke and uncertain carbon effects. Site-level reductions do not resolve every management question."
		],
		openQuestions: [
			"How local severity reductions translate into landscape, community and ecological outcomes.",
			"How benefits and costs change under future weather and different ecosystems."
		],
		whatWouldChangeMinds: [
			"Long-term matched comparisons tracking severity, exposure, smoke and meaningful ecological outcomes.",
			"Replicated landscape-scale evaluations that include realistic wildfire probability and treatment age."
		],
		misconceptions: [
			"Reducing the severity of a later fire is not the same as preventing every fire."
		],
		population: "Primarily western US conifer-forest studies, Portuguese shrublands and wider empirical/modeling reviews.",
		scope: "Later wildfire severity after prescribed burning, distinguished from ignition prevention, all thinning treatments, property protection and operational burning instructions.",
		excludedEvidence: [
			"Combined thinning-and-burning findings are not isolated burning effects; relative severity changes use different measures, and results within treated areas are not landscape-wide damage reductions or a universal burning schedule."
		],
		uncertainty: "Ecology, treatment age and severe weather affect performance. Broader social, carbon and biodiversity trade-offs require separate evidence.",
		sources: [
			sources.prescribedFire1,
			sources.prescribedFire2,
			sources.prescribedFire3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-turtle-excluder-devices-reduce-accidental-turtle-catches",
		title: "Do turtle-excluder devices reduce accidental turtle catches?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, appropriate devices can greatly reduce turtle retention in trawl nets. Performance and commercial catch effects vary across fisheries, and allowing turtles to escape is not the same as proving a particular population recovery rate.",
		editorSummary: "Results from shrimp trawls do not automatically transfer to every fishing method. Device performance, actual use and survival after encounters need separate assessment.",
		stableCore: [
			"NOAA reports high exclusion effectiveness for current shrimp-trawl designs. That is a defined gear-performance finding, not a worldwide reduction in all turtle deaths.",
			"An Australian paired-trawl comparison found a large turtle-catch reduction with combined turtle-excluder and other bycatch devices, alongside some changes in commercial catch.",
			"Mediterranean studies also support exclusion, but report differing catch trade-offs. A 2025 study involved few turtles and found commercial losses on some vessels, limiting universal predictions."
		],
		openQuestions: [
			"How actual use, vessel conditions and fishery differences affect real-world outcomes.",
			"How reduced capture translates into survival and population recovery over time."
		],
		whatWouldChangeMinds: [
			"Independent monitoring of implemented devices with clear capture, escape and survival denominators.",
			"Replicated evaluations of turtle outcomes and target catch across fisheries."
		],
		misconceptions: [
			"A high turtle-exclusion percentage is not a measured percentage increase in turtle populations."
		],
		population: "Australian and Mediterranean trawl studies and NOAA's shrimp-trawl summary; devices, target catches and turtle encounters differ.",
		scope: "Turtle exclusion in trawl fisheries, distinguishing combined devices, gear-specific effectiveness, catch trade-offs and population outcomes.",
		excludedEvidence: [
			"Combined-device results do not isolate every component; no live turtles retained in a small sample does not prove zero mortality, and shrimp-trawl performance does not validate all other fishing methods."
		],
		uncertainty: "Field implementation, compliance and fishery-specific catch trade-offs affect realized benefits. Population recovery involves additional pressures.",
		sources: [
			sources.turtleExcluderNOAA,
			sources.turtleBycatch1,
			sources.turtleBycatch2,
			sources.turtleBycatch3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-managed-water-releases-help-downstream-ecosystems",
		title: "Do managed water releases help downstream ecosystems?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They can improve some downstream conditions and ecological outcomes, but responses are not uniformly positive. Timing, flow patterns, water quality and the receiving ecosystem matter as well as the amount of water.",
		editorSummary: "Improving an ecosystem service and increasing biodiversity are different results. More released water does not automatically recreate a natural river.",
		stableCore: [
			"A synthesis of 102 studies found benefits for several ecosystem services, while biodiversity responses differed among rivers, lakes, marshes and coastal wetlands.",
			"A critical review of 76 studies found ecological responses alongside inconsistent results and variable study quality, with substantial geographic bias.",
			"A newer review of low-inflow estuary cases describes improvements from some releases, while emphasizing local conditions, competing water uses and adaptive evaluation. These cases do not establish universal restoration success."
		],
		openQuestions: [
			"Which changes produce lasting biological benefits under particular downstream constraints.",
			"How benefits persist during drought and changing demand for water."
		],
		whatWouldChangeMinds: [
			"Well-controlled long-term comparisons of flow changes and multiple ecological outcomes.",
			"Replicated responses across river, wetland and estuary types with transparent trade-offs."
		],
		misconceptions: [
			"An increase in a useful ecosystem service does not guarantee an increase in every species or biodiversity measure."
		],
		population: "Environmental-flow syntheses and low-inflow estuary cases, with uneven geographic, ecosystem and outcome coverage.",
		scope: "Ecological responses to managed releases from regulated systems, separated from dam removal, fishway performance and universal flow prescriptions.",
		excludedEvidence: [
			"A case-review title is not a universal causal estimate; pooled services and biodiversity are different outcomes, and successful low-inflow estuary cases cannot be generalized to all coastal wetlands."
		],
		uncertainty: "Study quality, local constraints and receiving ecosystems differ. Long-term outcomes and generalizable flow-response relationships remain incomplete.",
		sources: [
			sources.environmentalFlows1,
			sources.environmentalFlows2,
			sources.environmentalFlows3
		]
	}, novemberHumanWildlifeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-wastewater-plants-remove-microplastics",
		title: "Do wastewater plants remove microplastics?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "They usually remove a large fraction of measured particles from the water, but they do not eliminate all releases. Capture is also different from destruction: particles transferred to sludge still need to be accounted for.",
		editorSummary: "Removal depends on treatment and on which particle sizes are measured. A high percentage can coexist with a large number of particles leaving a high-volume plant.",
		stableCore: [
			"A 2025 synthesis covering 509 real plants found widely varying concentrations and higher median removal at more advanced treatment stages.",
			"An earlier meta-analysis of 77 eligible publications also found lower measured particle concentrations after treatment, alongside publication-bias concerns.",
			"A systematic review found high reported removal at many plants but continued releases. Differences in sampling, size cutoffs and reporting make direct comparisons difficult."
		],
		openQuestions: [
			"How well studies capture the smallest particles and their fate in sludge.",
			"Which improvements reduce total environmental release across all waste streams."
		],
		whatWouldChangeMinds: [
			"Standardized paired measurements of inlet, outlet and solids streams with transparent particle-size coverage.",
			"Replicated plant-scale mass balances and long-term evaluations of actual release reductions."
		],
		misconceptions: [
			"Removing particles from wastewater does not mean the plastic has been destroyed."
		],
		population: "Wastewater-treatment syntheses spanning varied plant types, locations and particle-detection methods.",
		scope: "Measured microplastic removal from wastewater, distinguished from destruction, sludge fate, drinking-water treatment and universal plant performance.",
		excludedEvidence: [
			"Pooled concentrations from different plants cannot be converted into a paired removal rate; particle counts are not plastic mass, and a median tertiary-treatment result is not the performance of every plant or all waste streams."
		],
		uncertainty: "Particle detection, plant configurations and reporting differ. Small particles and solids disposal remain important gaps.",
		sources: [
			sources.wastewaterPlastic1,
			sources.wastewaterPlastic2,
			sources.wastewaterPlastic3
		]
	}, novemberHumanWildlifeResearchCheckedAt)
];
