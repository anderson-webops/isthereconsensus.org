import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheThreeSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026OceanClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is ocean heat content increasing because of human-caused warming?",
		slug: "is-ocean-heat-content-increasing-because-of-human-caused-warming",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. The ocean has absorbed most of the excess heat trapped by human greenhouse-gas emissions, and its measured heat content has risen across recent decades. Natural variability redistributes heat among depths and regions, but it does not explain the sustained global energy gain.",
		stableCore: [
			"Ocean heat content is a more complete measure of planetary warming than surface air temperature alone because water stores enormous amounts of energy.",
			"Ship measurements, profiling floats, satellites, and reanalyses provide independent, increasingly consistent evidence of warming from the surface into deeper layers.",
			"Warmer seawater expands and contributes to sea-level rise while also influencing marine heatwaves, ice loss, storms, and ecosystems."
		],
		openQuestions: [
			"How much heat is entering poorly sampled deep and polar waters, and how quickly will it return to affect the surface?",
			"How will regional circulation changes distribute future heat and marine heatwave risk?"
		],
		whatWouldChangeMinds: [
			"Independent global observing systems showing a sustained loss rather than gain of ocean heat while the planetary energy imbalance persists.",
			"Attribution studies demonstrating that natural forcing and internal variability reproduce the observed multidecadal heat uptake without human forcing."
		],
		misconceptions: [
			"A cool year or one cool region does not reverse the global multidecadal trend.",
			"Heat can move between surface and deeper layers without disappearing from the climate system.",
			"The ocean absorbing heat protects the atmosphere temporarily but creates long-lived sea-level and ecosystem consequences."
		],
		editorSummary:
			"Ocean heat is one of the clearest integrators of Earth's energy imbalance. The live science concerns regional and depth distribution, not whether the global ocean has accumulated human-caused heat.",
		uncertaintySummary:
			"The sign and dominant cause are highly certain. Earlier observations, abyssal waters, polar coverage, and regional circulation contribute uncertainty to exact rates and distribution.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 2: Changing State of the Climate System",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-2/",
				note: "Global assessment of observed ocean warming, energy accumulation, attribution, and measurement uncertainty."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 9: Ocean, Cryosphere and Sea Level Change",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-9/",
				note: "Assessment connecting ocean heat uptake with steric sea-level rise, circulation, extremes, and future projections."
			},
			{
				kind: "systematic_review",
				title: "Record-Setting Ocean Warmth Continued in 2019",
				publisher: "Advances in Atmospheric Sciences",
				year: 2020,
				url: "https://doi.org/10.1007/s00376-020-9283-7",
				doi: "10.1007/s00376-020-9283-7",
				note: "Observation-based synthesis explaining ocean heat datasets, uncertainty, and the long-term accumulation signal."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is the global ocean losing oxygen as it warms?",
		slug: "is-the-global-ocean-losing-oxygen-as-it-warms",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. The global ocean has lost dissolved oxygen since the mid-twentieth century. Warming directly lowers oxygen solubility and increases stratification that can reduce ventilation, while nutrient pollution intensifies oxygen loss in many coastal waters. Regional trends vary with circulation and natural variability.",
		stableCore: [
			"Warm water holds less oxygen than cold water under otherwise comparable conditions.",
			"Stronger density layering can reduce mixing between oxygen-rich surface waters and deeper waters where respiration consumes oxygen.",
			"Low oxygen compresses habitat, alters food webs and biogeochemistry, and can increase stress and mortality for organisms with high oxygen needs."
		],
		openQuestions: [
			"How will circulation changes and biological feedbacks shape regional oxygen minimum zones this century?",
			"Which coastal nutrient reductions can offset the local component of deoxygenation despite continued global warming?"
		],
		whatWouldChangeMinds: [
			"Quality-controlled global records showing no multidecadal oxygen decline after coverage and instrument biases are corrected.",
			"Mechanistic evidence that warming and stratification do not affect solubility, ventilation, or oxygen demand as currently understood."
		],
		misconceptions: [
			"Global deoxygenation does not mean every location loses oxygen every year.",
			"Climate-driven open-ocean loss and nutrient-driven coastal hypoxia are related but not identical processes.",
			"A percentage decline that sounds small can matter greatly near biological oxygen thresholds."
		],
		editorSummary:
			"Ocean oxygen loss is measured and physically expected. The important nuance is that global warming, circulation, biology, and local nutrient pollution combine differently from place to place.",
		uncertaintySummary:
			"The global decline is assessed with high confidence, while sparse historical sampling and variable circulation make regional magnitude and future ecological thresholds less certain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 2: Changing State of the Climate System",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-2/",
				note: "Assessment finding a net global oxygen loss since the 1960s and documenting observed ranges and confidence."
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Impacts, Adaptation and Vulnerability, Chapter 3: Oceans and Coastal Ecosystems",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-3/",
				note: "Assessment of deoxygenation mechanisms, regional change, biological effects, and interacting ocean stressors."
			},
			{
				kind: "systematic_review",
				title: "Declining oxygen in the global ocean and coastal waters",
				publisher: "Science",
				year: 2018,
				url: "https://doi.org/10.1126/science.aam7240",
				doi: "10.1126/science.aam7240",
				note: "Major synthesis of open-ocean and coastal oxygen trends, causes, ecological effects, and policy responses."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Does overfishing deplete fish stocks, and can effective management rebuild them?",
		slug: "does-overfishing-deplete-fish-stocks-and-can-effective-management-rebuild-them",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Fishing faster than a population can replenish depletes stocks and can alter marine ecosystems. Catch limits, monitoring, enforcement, habitat protection, bycatch controls, and rights or incentives aligned with sustainability have rebuilt many stocks, although recovery can be slow or blocked by climate change and weak governance.",
		stableCore: [
			"Sustainable harvest depends on population productivity, age structure, environmental conditions, and fishing mortality rather than a fixed share that works everywhere.",
			"Well-assessed fisheries with effective controls generally perform better than unmanaged or poorly monitored fisheries.",
			"A rebuilt biomass does not automatically restore all prior age structure, habitats, food-web relationships, or community livelihoods."
		],
		openQuestions: [
			"How should management adapt as warming shifts species across political boundaries and changes productivity?",
			"Which governance systems work best for small-scale and data-limited fisheries while protecting food security and equity?"
		],
		whatWouldChangeMinds: [
			"Long-term population data showing fishing mortality does not affect stock abundance or age structure.",
			"Counterfactual evaluations finding that credible management reforms do not improve biomass, catch stability, or collapse risk."
		],
		misconceptions: [
			"A high annual catch can temporarily coexist with a declining stock.",
			"Rebuilding success in some managed fisheries does not mean global overfishing is solved.",
			"Aquaculture growth and wild-capture management address different pressures and can interact through feed, habitat, and markets."
		],
		editorSummary:
			"The biological mechanism and management opportunity are both clear: overfishing depletes, and credible constraints can rebuild. Outcomes depend on institutions, data, ecology, and whether climate-driven range shifts are incorporated.",
		uncertaintySummary:
			"Assessed stocks provide strong evidence, but many small and data-poor fisheries remain uncertain. Recovery time and sustainable catch change with ecosystems and climate.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The State of World Fisheries and Aquaculture 2026",
				publisher: "Food and Agriculture Organization of the United Nations",
				year: 2026,
				url: "https://www.fao.org/publications/fao-flagship-publications/the-state-of-world-fisheries-and-aquaculture",
				note: "Current global assessment of stock status, production, food security, management, and regional data limitations."
			},
			{
				kind: "landmark_study",
				title: "Rebuilding Global Fisheries",
				publisher: "Science",
				year: 2009,
				url: "https://doi.org/10.1126/science.1173146",
				doi: "10.1126/science.1173146",
				note: "Global synthesis linking management reforms with lower exploitation and documented rebuilding while showing persistent depletion."
			},
			{
				kind: "systematic_review",
				title: "Effective fisheries management instrumental in improving fish stock status",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2020,
				url: "https://doi.org/10.1073/pnas.1909726116",
				doi: "10.1073/pnas.1909726116",
				note: "Cross-country stock assessment linking stronger management intensity with healthier or improving fisheries."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Does most ocean plastic come from land while fishing gear remains important?",
		slug: "does-most-ocean-plastic-come-from-land-while-fishing-gear-remains-important",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes at the global input level: mismanaged waste and litter entering from land through rivers, coasts, wind, and drains are the largest broad source. Lost and discarded fishing gear is nevertheless a major source of large debris and can dominate particular offshore accumulations and wildlife-entanglement risks.",
		stableCore: [
			"Source shares depend on whether a study measures annual inputs, floating surface mass, beach litter, seabed debris, particle counts, or one region.",
			"Dense gear and other plastics can sink, fragment, beach, or move far from their source, so an observed patch is not a direct global source inventory.",
			"Prevention requires both land-based waste systems and targeted fishing-gear design, tracking, retrieval, disposal, and enforcement."
		],
		openQuestions: [
			"How much plastic is stored in sediments, coastlines, deep water, and organisms rather than observed at the surface?",
			"Which interventions measurably reduce leakage rather than simply move waste among pathways or jurisdictions?"
		],
		whatWouldChangeMinds: [
			"Comparable global mass-flow studies finding marine activities exceed land pathways in annual plastic input.",
			"Validated source tracers showing that current river, coastal, and waste-management estimates systematically misassign origin."
		],
		misconceptions: [
			"There is no single fixed percentage that describes every ocean compartment and year.",
			"A fishing-net-heavy gyre sample does not prove most annual global plastic enters from vessels.",
			"Calling land sources dominant does not make abandoned fishing gear a minor ecological problem."
		],
		editorSummary:
			"The apparent argument often compares different denominators. Land pathways dominate estimated global inputs, while fishing gear is disproportionately important for large offshore debris and entanglement.",
		uncertaintySummary:
			"Order of magnitude and pathway are clearer than exact shares. Incomplete monitoring, fragmentation, sinking, illegal dumping, and geography make global mass balances uncertain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "From Pollution to Solution: A Global Assessment of Marine Litter and Plastic Pollution",
				publisher: "United Nations Environment Programme",
				year: 2021,
				url: "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution",
				note: "Global assessment of land and sea sources, transport pathways, ecological impacts, and intervention priorities."
			},
			{
				kind: "landmark_study",
				title: "Plastic waste inputs from land into the ocean",
				publisher: "Science",
				year: 2015,
				url: "https://doi.org/10.1126/science.1260352",
				doi: "10.1126/science.1260352",
				note: "Foundational mass-flow estimate of mismanaged coastal plastic waste entering the ocean from land."
			},
			{
				kind: "systematic_review",
				title: "A global review of marine fishing gear loss and its socioeconomic, environmental and resource impacts",
				publisher: "Fish and Fisheries",
				year: 2019,
				url: "https://doi.org/10.1111/faf.12362",
				doi: "10.1111/faf.12362",
				stance: "context",
				note: "Review documenting the scale, causes, persistence, and disproportionate entanglement impacts of abandoned and lost fishing gear."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Does plastic pollution harm marine wildlife?",
		slug: "does-plastic-pollution-harm-marine-wildlife",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Marine animals are injured and killed through entanglement, ingestion, smothering, habitat damage, and exposure to plastic-associated chemicals and microbes. Risk varies by species, plastic form, dose, and location; population-level effects are harder to quantify than harm to individual animals.",
		stableCore: [
			"Entanglement can cause drowning, strangulation, wounds, impaired movement, starvation, and reduced reproduction.",
			"Ingested plastics can block or damage digestive systems, displace food, and expose organisms to particles and associated substances.",
			"Plastic persists and fragments rather than simply disappearing, extending exposure across habitats and food webs."
		],
		openQuestions: [
			"For which species and regions does plastic exposure materially reduce population growth rather than only harm individuals?",
			"How do particle chemistry, size, weathering, pathogens, and co-contaminants interact at environmentally realistic doses?"
		],
		whatWouldChangeMinds: [
			"Global field and experimental evidence showing that documented entanglement and ingestion produce no meaningful injury, mortality, or reproduction effects.",
			"Population models demonstrating that current exposure is negligible for species believed to be most vulnerable."
		],
		misconceptions: [
			"Not every animal that ingests a particle will die, but that does not make the population risk zero.",
			"Visible bags and nets are only part of the problem; fibers and fragmented particles are widespread.",
			"Laboratory effects at very high doses should not be treated as direct estimates of wild population harm."
		],
		editorSummary:
			"Direct wildlife harm is beyond reasonable dispute. The evidence boundary is the magnitude of population and ecosystem effects, especially for smaller particles and chronic exposure.",
		uncertaintySummary:
			"Individual-level entanglement and ingestion harms are well documented. Exposure measurement, dose relevance, hidden mortality, and population attribution remain uneven among taxa.",
		sources: [
			{
				kind: "consensus_statement",
				title: "From Pollution to Solution: A Global Assessment of Marine Litter and Plastic Pollution",
				publisher: "United Nations Environment Programme",
				year: 2021,
				url: "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution",
				note: "Global assessment of plastic exposure, wildlife injury, ecosystem consequences, and major evidence gaps."
			},
			{
				kind: "systematic_review",
				title: "The impact of debris on marine life",
				publisher: "Marine Pollution Bulletin",
				year: 2015,
				url: "https://doi.org/10.1016/j.marpolbul.2014.12.041",
				doi: "10.1016/j.marpolbul.2014.12.041",
				note: "Systematic review cataloging ingestion and entanglement across marine species and debris types."
			},
			{
				kind: "landmark_study",
				title: "Threat of plastic pollution to seabirds is global, pervasive, and increasing",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2015,
				url: "https://doi.org/10.1073/pnas.1502108112",
				doi: "10.1073/pnas.1502108112",
				note: "Global exposure model connecting measured seabird ingestion with plastic distributions and projected risk."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Are microplastics widespread in seafood while human-health effects remain uncertain?",
		slug: "are-microplastics-widespread-in-seafood-while-human-health-effects-remain-uncertain",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Microplastics have been detected in fish, shellfish, and other foods, but current evidence does not establish the size of any health risk from eating seafood. Measurement contamination, inconsistent methods, particle chemistry, dose, absorption, and long-term human outcomes remain major gaps.",
		stableCore: [
			"Seafood exposure differs because people often remove fish intestines but eat whole shellfish, where particles may concentrate.",
			"Finding a particle proves exposure, not automatically toxicity or disease at the detected dose.",
			"Very small micro- and nanoplastics may behave differently from larger particles, yet they are also harder to measure reliably."
		],
		openQuestions: [
			"What doses and particle properties reach human tissues after realistic dietary exposure, and how long do they persist?",
			"Which standardized, contamination-controlled methods can make food studies comparable across laboratories?"
		],
		whatWouldChangeMinds: [
			"Validated surveys finding reported seafood particles were predominantly laboratory or sampling contamination.",
			"Prospective human and dose-relevant mechanistic evidence establishing a reproducible disease risk—or confidently excluding one—at typical exposure."
		],
		misconceptions: [
			"Detection is not the same as a demonstrated clinical health effect.",
			"Uncertain health risk is not evidence that exposure is harmless or catastrophic.",
			"Particle counts cannot be compared directly when studies use different size cutoffs, digestion methods, and identification instruments."
		],
		editorSummary:
			"The exposure finding is ahead of the risk assessment. A responsible page can say microplastics occur in seafood while refusing to invent a precise human-health verdict from heterogeneous detection studies.",
		uncertaintySummary:
			"Occurrence is supported, but concentration estimates vary greatly and human causal evidence is sparse. Nanoplastics, chemical additives, chronic dose, and susceptible groups remain especially uncertain.",
		sources: [
			{
				kind: "systematic_review",
				title: "Microplastic contamination of seafood intended for human consumption: a systematic review and meta-analysis",
				publisher: "Environmental Health Perspectives",
				year: 2020,
				url: "https://doi.org/10.1289/EHP7171",
				doi: "10.1289/EHP7171",
				note: "Systematic review of seafood occurrence data documenting detections alongside major method and contamination limitations."
			},
			{
				kind: "consensus_statement",
				title: "Microplastics in fisheries and aquaculture: Status of knowledge on their occurrence and implications for aquatic organisms and food safety",
				publisher: "Food and Agriculture Organization of the United Nations",
				year: 2017,
				url: "https://www.fao.org/3/i7677e/i7677e.pdf",
				note: "Food-safety review distinguishing widespread occurrence from unresolved consumer-health implications."
			},
			{
				kind: "consensus_statement",
				title: "Dietary and inhalation exposure to nano- and microplastic particles and potential implications for human health",
				publisher: "World Health Organization",
				year: 2022,
				url: "https://www.who.int/publications/i/item/9789240054608",
				note: "Health-risk assessment identifying broad exposure but insufficient evidence for quantitative human-risk conclusions."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Do mangroves, salt marshes, and seagrasses store carbon and protect coasts?",
		slug: "do-mangroves-salt-marshes-and-seagrasses-store-carbon-and-protect-coasts",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. These coastal ecosystems capture carbon and can accumulate large, long-lived soil stores while reducing waves, erosion, and some storm damage. Protection and restoration offer multiple benefits, but performance depends on site, ecosystem health, sea-level rise, sediment, storm intensity, and whether landward migration is possible.",
		stableCore: [
			"Waterlogged coastal soils can slow decomposition and retain carbon for centuries, making belowground stocks especially important.",
			"Roots, stems, reefs, and sediment can attenuate wave energy and stabilize shorelines, with protection varying by width, density, depth, and event.",
			"Destroying or draining these habitats can release stored carbon and remove nursery, water-quality, biodiversity, and coastal-protection services."
		],
		openQuestions: [
			"Where can restored ecosystems keep pace with sea-level rise and sediment change without being trapped by development?",
			"How should projects quantify additional carbon, methane and nitrous oxide, permanence, leakage, and protection benefits?"
		],
		whatWouldChangeMinds: [
			"Global field syntheses showing negligible soil carbon and no measurable wave or erosion reduction in intact systems.",
			"Long-term restoration evaluations finding claimed benefits consistently fail after realistic baselines and disturbances are included."
		],
		misconceptions: [
			"Natural coastal defenses reduce risk; they do not make exposed communities invulnerable to extreme storms.",
			"Carbon value is not interchangeable among every wetland type, climate, salinity, and sediment setting.",
			"Planting alone is not restoration if hydrology, sediment supply, water quality, and future space are unsuitable."
		],
		editorSummary:
			"Blue-carbon ecosystems are unusually valuable because carbon, habitat, and coastal protection can coincide. Claims still need site-specific baselines and should not promise unlimited protection or permanent credits.",
		uncertaintySummary:
			"Core services are well documented. Project-level carbon rates, storm attenuation, permanence, methane, and resilience to accelerating sea-level rise vary substantially.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Blue Carbon: The Role of Healthy Coastal Ecosystems in Climate Change Mitigation",
				publisher: "National Oceanic and Atmospheric Administration",
				year: 2023,
				url: "https://doi.org/10.25923/v5fx-r089",
				doi: "10.25923/v5fx-r089",
				note: "Federal synthesis of coastal carbon stores, ecosystem benefits, restoration, accounting, and management limits."
			},
			{
				kind: "systematic_review",
				title: "Blue carbon as a natural climate solution",
				publisher: "Nature Reviews Earth & Environment",
				year: 2021,
				url: "https://doi.org/10.1038/s43017-021-00224-1",
				doi: "10.1038/s43017-021-00224-1",
				note: "Review of carbon mechanisms, global opportunity, restoration constraints, permanence, and accounting."
			},
			{
				kind: "meta_analysis",
				title: "The Effectiveness, Costs and Coastal Protection Benefits of Natural and Nature-Based Defences",
				publisher: "PLOS ONE",
				year: 2016,
				url: "https://doi.org/10.1371/journal.pone.0154735",
				doi: "10.1371/journal.pone.0154735",
				note: "Meta-analysis comparing wave attenuation and cost evidence for mangroves, marshes, reefs, and other natural defenses."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is deep-sea mining environmentally harmless?",
		slug: "is-deep-sea-mining-environmentally-harmless",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Removing nodules or mineral crusts would directly destroy seafloor habitat and create sediment, noise, light, and waste disturbances in ecosystems that recover slowly. The full regional and long-term magnitude is uncertain because commercial-scale mining has not yet provided a real-world baseline, not because harm is absent.",
		stableCore: [
			"Many deep-sea organisms grow, reproduce, and recolonize slowly, and polymetallic nodules themselves take millions of years to form.",
			"Collector vehicles remove or compact habitat and generate plumes whose ecological reach depends on sediment, equipment, currents, and discharge depth.",
			"Comparing seabed mining with land mining requires common material, lifecycle, biodiversity, community, and governance boundaries."
		],
		openQuestions: [
			"How far do sediment plumes and ecological effects extend vertically and horizontally under commercial operations?",
			"Can protected reference zones, monitoring, thresholds, and liability rules prevent unacceptable cumulative and irreversible loss?"
		],
		whatWouldChangeMinds: [
			"Representative commercial-scale trials showing no persistent habitat loss, plume effect, food-web disruption, or biodiversity decline.",
			"Long-term recovery studies demonstrating impacted communities return rapidly and fully under realistic mining intensity."
		],
		misconceptions: [
			"An environment being remote or sparsely observed does not make it empty.",
			"Uncertainty about regional magnitude is not evidence of zero direct damage.",
			"The harms of land mining do not by themselves establish that seabed mining is sustainable."
		],
		editorSummary:
			"Direct ecological disturbance is certain if mining occurs; the unsettled issue is its scale, duration, cumulative reach, and whether governance can limit it. Commercial absence makes confident harmlessness claims especially untenable.",
		uncertaintySummary:
			"Small experiments reveal persistent tracks and altered communities, but scaling to industrial intensity, plume extent, ecosystem function, and recovery over decades remains uncertain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Deep Sea Mining",
				publisher: "United Nations Environment Programme",
				year: 2024,
				url: "https://www.unep.org/resources/publication/deep-sea-mining",
				note: "Institutional assessment of known habitat damage, uncertain cumulative effects, governance gaps, and circular-economy alternatives."
			},
			{
				kind: "systematic_review",
				title: "Challenges to the sustainability of deep-seabed mining",
				publisher: "Nature Sustainability",
				year: 2020,
				url: "https://doi.org/10.1038/s41893-020-0558-x",
				doi: "10.1038/s41893-020-0558-x",
				note: "Review of ecological baselines, disturbance, recovery, monitoring, economics, and governance challenges."
			},
			{
				kind: "consensus_statement",
				title: "Deep seabed mining: a rising environmental challenge",
				publisher: "International Union for Conservation of Nature",
				year: 2018,
				url: "https://doi.org/10.2305/IUCN.CH.2018.16.en",
				doi: "10.2305/IUCN.CH.2018.16.en",
				note: "Conservation assessment of mineral habitats, mining technologies, environmental effects, and regulatory needs."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is an abrupt Atlantic circulation collapse this century certain?",
		slug: "is-an-abrupt-amoc-collapse-this-century-certain",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. The Atlantic Meridional Overturning Circulation is very likely to weaken as the climate warms, but an abrupt collapse before 2100 is not assessed as certain. Statistical warning studies, observational limits, and newer model experiments disagree about proximity to a tipping point, so low-probability high-impact risk deserves attention without a countdown claim.",
		stableCore: [
			"Warming and freshwater input can reduce the density contrasts that help drive North Atlantic deep-water formation.",
			"Direct continuous observations cover only a small fraction of the timescale needed to characterize natural variability and long-term trend.",
			"A major weakening or collapse would alter regional sea level, rainfall, storms, marine ecosystems, and heat transport; it would not simply switch off all ocean circulation or cause an instant global ice age."
		],
		openQuestions: [
			"How close is the real system to thresholds that current climate models may represent imperfectly?",
			"Which combinations of sustained observations, paleoclimate records, process models, and statistical indicators can constrain collapse risk?"
		],
		whatWouldChangeMinds: [
			"Sustained observations and validated models showing the circulation is stable or strengthening across warming scenarios previously expected to weaken it.",
			"Convergent early-warning, process, and ensemble evidence robustly locating an abrupt transition within this century."
		],
		misconceptions: [
			"A modeled weakening is not the same event as a complete abrupt collapse.",
			"One estimated tipping date is not a deterministic forecast.",
			"Disagreement about collapse probability does not mean the circulation is unaffected by greenhouse warming."
		],
		editorSummary:
			"The consensus core is weakening, not certainty of a near-term collapse. Because consequences could be severe, uncertainty should motivate monitoring and mitigation rather than either panic or dismissal.",
		uncertaintySummary:
			"Confidence is limited by short direct records, proxy interpretation, model resolution, freshwater forcing, and possible model bias. Published methods currently support materially different risk estimates.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 9: Ocean, Cryosphere and Sea Level Change",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-9/",
				note: "Assessment concluding that AMOC weakening is very likely while an abrupt collapse before 2100 is not the assessed central outcome."
			},
			{
				kind: "landmark_study",
				title: "Warning of a forthcoming collapse of the Atlantic meridional overturning circulation",
				publisher: "Nature Communications",
				year: 2023,
				url: "https://doi.org/10.1038/s41467-023-39810-w",
				doi: "10.1038/s41467-023-39810-w",
				appraisal: "moderate",
				stance: "context",
				note: "Statistical early-warning analysis estimating a possible transition window, with assumptions and proxy limitations central to interpretation."
			},
			{
				kind: "landmark_study",
				title: "Continued Atlantic overturning circulation even under climate extremes",
				publisher: "Nature",
				year: 2025,
				url: "https://doi.org/10.1038/s41586-024-08544-0",
				doi: "10.1038/s41586-024-08544-0",
				stance: "context",
				note: "Model study finding greater resilience under extreme forcing and illustrating the live disagreement about collapse mechanisms and probability."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is ocean-based carbon dioxide removal ready for safe large-scale deployment?",
		slug: "is-ocean-based-carbon-dioxide-removal-ready-for-safe-large-scale-deployment",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Approaches such as alkalinity enhancement, nutrient fertilization, seaweed cultivation, and direct ocean capture may remove carbon, but none yet has the field evidence, monitoring, ecological assessment, accounting, governance, and demonstrated scale needed for routine large deployment. Carefully governed research is still required.",
		stableCore: [
			"A credible removal must increase atmospheric carbon uptake, quantify lifecycle emissions, and store the carbon for a stated duration beyond what would have happened anyway.",
			"Ocean circulation and biology can move effects far from a project, complicating measurement, verification, attribution, and liability.",
			"Potential side effects differ by method and include nutrient redistribution, oxygen loss, food-web change, trace metals, altered chemistry, habitat pressure, and reversal."
		],
		openQuestions: [
			"Which methods can demonstrate durable net removal with acceptable ecological effects in progressively larger controlled field trials?",
			"What international consent, monitoring, justice, crediting, and liability systems are required before transboundary deployment?"
		],
		whatWouldChangeMinds: [
			"Independent field programs demonstrating scalable, durable, verifiable net removal with bounded ecological and social impacts.",
			"Validated monitoring methods that close carbon budgets and detect remote or delayed side effects at deployment scale."
		],
		misconceptions: [
			"The ocean's large natural carbon stock does not mean engineered additions are automatically safe or measurable.",
			"Growing biomass is not durable removal unless additional carbon reaches and remains in a long-lived reservoir.",
			"Researching a method is not equivalent to endorsing commercial deployment or carbon credits today."
		],
		editorSummary:
			"Ocean removal is a promising research portfolio, not a deployment-ready climate backstop. The bar is unusually high because interventions can be hard to retrieve, measure, and contain across a shared ocean.",
		uncertaintySummary:
			"Bench and small-field evidence varies by method. Net uptake, permanence, lifecycle burden, ecosystem response, scalability, and governance remain too uncertain for broad commercial claims.",
		sources: [
			{
				kind: "consensus_statement",
				title: "A Research Strategy for Ocean-based Carbon Dioxide Removal and Sequestration",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2022,
				url: "https://doi.org/10.17226/26278",
				doi: "10.17226/26278",
				note: "Independent assessment of six marine removal families, research priorities, efficacy, environmental risk, monitoring, and governance."
			},
			{
				kind: "guideline",
				title: "Strategy for NOAA Carbon Dioxide Removal Research",
				publisher: "National Oceanic and Atmospheric Administration",
				year: 2023,
				url: "https://sciencecouncil.noaa.gov/wp-content/uploads/2023/06/mCDR-glossy-final.pdf",
				note: "Federal research strategy emphasizing efficacy, ecosystem effects, observing systems, modeling, standards, and decision support."
			},
			{
				kind: "systematic_review",
				title: "Life cycle assessment of ocean-based carbon dioxide removal approaches: A systematic literature review",
				publisher: "Renewable and Sustainable Energy Reviews",
				year: 2025,
				url: "https://doi.org/10.1016/j.rser.2025.116091",
				doi: "10.1016/j.rser.2025.116091",
				note: "Systematic review showing limited, heterogeneous lifecycle evidence and the importance of energy, materials, transport, and counterfactual boundaries."
			}
		]
	})
];
