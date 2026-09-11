import type { AtlasBreadthSourceTuple } from "./claim-expansion-2026-09-atlas-breadth-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthClaim as reviewedClaim } from "./claim-expansion-2026-09-atlas-breadth-shared.js";

const oceanClimateAssessment = [
	"consensus_statement",
	"Climate Change 2022: Impacts, Adaptation and Vulnerability, Chapter 3: Oceans and Coastal Ecosystems and Their Services",
	"Intergovernmental Panel on Climate Change",
	2022,
	"10.1017/9781009325844.005",
	"IPCC assessment synthesizes ocean warming, acidification, deoxygenation, sea-level rise, marine heatwaves, ecosystem impacts, adaptation limits, and interacting risks."
] as const satisfies AtlasBreadthSourceTuple;

const oceanAcidificationMetaAnalysis = [
	"meta_analysis",
	"Impacts of ocean acidification on marine organisms: quantifying sensitivities and interaction with warming",
	"Global Change Biology",
	2013,
	"10.1111/gcb.12179",
	"Meta-analysis finds average negative biological responses to elevated carbon dioxide while documenting substantial variation among taxa, traits, life stages, exposure conditions, and simultaneous warming."
] as const satisfies AtlasBreadthSourceTuple;

const coralBleachingStudy = [
	"landmark_study",
	"Global warming and recurrent mass bleaching of corals",
	"Nature",
	2017,
	"10.1038/nature21707",
	"Global analysis links severe recurrent bleaching to marine heat exposure and shows that shorter intervals between events reduce recovery time."
] as const satisfies AtlasBreadthSourceTuple;

const oceanNoiseReview = [
	"systematic_review",
	"Anthropogenic underwater noise: A review on physiological and molecular responses of marine biota",
	"Marine Pollution Bulletin",
	2024,
	"10.1016/j.marpolbul.2023.115978",
	"Review documents auditory injury, masking, stress, behavioral, developmental, and physiological responses across marine taxa while highlighting exposure and species-specific uncertainty."
] as const satisfies AtlasBreadthSourceTuple;

const blueFoodsAssessment = [
	"systematic_review",
	"Environmental performance of blue foods",
	"Nature",
	2021,
	"10.1038/s41586-021-03889-2",
	"Harmonized assessment across more than 1,690 farms and 1,000 fishery records finds large environmental differences within both farmed and captured aquatic foods, making production method alone an unreliable ranking."
] as const satisfies AtlasBreadthSourceTuple;

const sunscreenReview = [
	"systematic_review",
	"A Critical Review of Organic Ultraviolet Filter Exposure, Hazard, and Risk to Corals",
	"Environmental Toxicology and Chemistry",
	2021,
	"10.1002/etc.4948",
	"Critical review distinguishes laboratory hazard from environmental risk and finds major gaps in exposure realism, methods, species coverage, and field evidence for population-scale coral effects."
] as const satisfies AtlasBreadthSourceTuple;

const marineInvasionReview = [
	"systematic_review",
	"Assessing the global threat of invasive species to marine biodiversity",
	"Frontiers in Ecology and the Environment",
	2008,
	"10.1890/070064",
	"Global synthesis identifies shipping, including ballast water and hull fouling, as major introduction pathways and evaluates invasive-species threats to marine biodiversity."
] as const satisfies AtlasBreadthSourceTuple;

const oceanCarbonRemovalAssessment = [
	"consensus_statement",
	"A Research Strategy for Ocean-based Carbon Dioxide Removal and Sequestration",
	"National Academies of Sciences, Engineering, and Medicine",
	2022,
	"10.17226/26278",
	"National Academies assessment finds that ocean carbon-removal approaches, including iron fertilization, require research on net removal, durability, monitoring, ecological effects, scalability, governance, and social legitimacy."
] as const satisfies AtlasBreadthSourceTuple;

export const september2026AtlasBreadthOceansClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Does ocean acidification mean the ocean is becoming acidic?",
		slug: "does-ocean-acidification-mean-the-ocean-is-becoming-acidic",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Not in the everyday pH-label sense. Average surface seawater remains alkaline, above pH 7, but it is becoming less alkaline as the ocean absorbs human-produced carbon dioxide. That directional fall in pH is correctly called acidification. Because pH is logarithmic and carbonate chemistry changes with it, a modest numerical decline can materially reduce carbonate ions used by many organisms.",
		stableCore: [
			"Dissolved carbon dioxide forms carbonic acid and shifts seawater's carbonate equilibrium.",
			"Acidification describes movement toward lower pH, not necessarily crossing below neutral pH 7.",
			"The ocean's uptake of carbon dioxide slows atmospheric warming while altering marine chemistry."
		],
		openQuestions: [
			"How will regional circulation, freshwater, productivity, and alkalinity shape local exposure this century?",
			"Which organisms and communities can acclimate or adapt as acidification combines with warming and deoxygenation?"
		],
		whatWouldChangeMinds: [
			"Sustained global observations showing rising atmospheric carbon dioxide does not lower ocean pH or alter carbonate chemistry.",
			"A chemical model that better explains observed dissolved carbon and isotope changes without anthropogenic carbon uptake."
		],
		misconceptions: [
			"A liquid can become more acidic while remaining on the alkaline side of pH 7.",
			"Ocean acidification is not caused primarily by acid rain.",
			"The ocean is not chemically uniform, so local pH and trends vary."
		],
		editorSummary:
			"Ocean acidification is a precise directional term: seawater remains alkaline, but absorbed carbon dioxide is measurably lowering pH and carbonate availability.",
		uncertaintySummary:
			"The chemistry and global direction are settled. Regional rates and biological consequences vary across places, species, and interacting stressors.",
		sources: [
			[
				"consensus_statement",
				"What is ocean acidification?",
				"National Oceanic and Atmospheric Administration Ocean Service",
				2024,
				"https://oceanservice.noaa.gov/facts/acidification.html",
				"NOAA explains the carbon-dioxide chemistry, logarithmic pH change, continued alkalinity, and consequences for carbonate availability."
			],
			oceanClimateAssessment,
			oceanAcidificationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Does ocean acidification affect every marine organism in the same way?",
		slug: "does-ocean-acidification-affect-every-marine-organism-in-the-same-way",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Lower pH and carbonate availability can impair shell or skeleton formation, development, physiology, behavior, and food webs, with calcifiers often at risk. Responses differ among species, populations, life stages, habitats, and exposure histories. Some organisms tolerate or even benefit under particular conditions, but that variation does not cancel the documented risk to sensitive species and ecosystems.",
		stableCore: [
			"Biological response depends on both external seawater chemistry and an organism's ability to regulate internal chemistry.",
			"Early life stages and structures made from more soluble calcium-carbonate forms can be especially vulnerable.",
			"Warming, oxygen loss, pollution, food availability, and local variability can amplify or modify acidification effects."
		],
		openQuestions: [
			"How much can acclimation, evolution, habitat refuges, and ecological reorganization offset rapid multi-stressor change?",
			"How do individual laboratory responses scale to populations, fisheries, reefs, and food webs under realistic variability?"
		],
		whatWouldChangeMinds: [
			"Multigenerational field evidence showing carbonate-chemistry change has no meaningful effects on sensitive taxa or communities.",
			"Mechanistic evidence that organisms broadly maintain calcification, development, and ecosystem roles across projected chemistry without tradeoffs."
		],
		misconceptions: [
			"Variable response does not mean no effect.",
			"A short laboratory exposure cannot represent every natural ecosystem outcome.",
			"Not all organisms that build shells use the same mineral or regulate chemistry equally."
		],
		editorSummary:
			"Acidification is not a uniform poison. It changes a shared chemical environment, then biology, ecology, and other stressors determine who is harmed and by how much.",
		uncertaintySummary:
			"Sensitive responses and major mechanisms are well supported. Adaptation, community reassembly, and local population outcomes remain less predictable.",
		sources: [
			oceanAcidificationMetaAnalysis,
			[
				"meta_analysis",
				"Meta-analysis reveals negative yet variable effects of ocean acidification on marine organisms",
				"Ecology Letters",
				2010,
				"10.1111/j.1461-0248.2010.01518.x",
				"Early broad meta-analysis finds overall negative biological effects while quantifying variation among functions and taxonomic groups."
			],
			oceanClimateAssessment
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is marine heat stress a primary cause of mass coral bleaching?",
		slug: "is-marine-heat-stress-a-primary-cause-of-mass-coral-bleaching",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Sustained unusually warm water disrupts the relationship between reef-building corals and their photosynthetic symbionts, causing corals to expel or lose pigments from those partners and appear white. Bleaching is a stress response, not instant death, but severe or repeated heat exposure raises starvation, disease, reduced reproduction, and mortality risks.",
		stableCore: [
			"Satellite and field heat-stress measures predict the timing and severity of many regional mass-bleaching events.",
			"Corals can recover if stress is limited and food, disease, and local conditions permit, but recovery may take years.",
			"Ocean warming has increased the frequency and geographic scale of bleaching-conducive heat."
		],
		openQuestions: [
			"Which coral-symbiont combinations and reef settings can persist under future heat frequency and extremes?",
			"How much can local management and active restoration preserve reef function under different emissions pathways?"
		],
		whatWouldChangeMinds: [
			"Global event analyses showing mass bleaching does not track accumulated marine heat stress after confounders are considered.",
			"A mechanism that better explains the repeated experimental and field response to elevated temperature."
		],
		misconceptions: [
			"Bleached coral is alive initially and can sometimes recover.",
			"Local pollution and overfishing matter, but they do not explain synchronized heat-linked bleaching across ocean basins.",
			"A cold snap can also bleach coral locally; global mass events are predominantly linked to heat."
		],
		editorSummary:
			"Mass coral bleaching is a visible biological response to accumulated ocean heat. Survival depends on severity, duration, recovery time, and other local pressures.",
		uncertaintySummary:
			"The heat-bleaching link is exceptionally strong. Reef-specific resistance, recovery, adaptation, and future ecosystem function are less certain.",
		sources: [
			coralBleachingStudy,
			[
				"consensus_statement",
				"How does climate change affect coral reefs?",
				"National Oceanic and Atmospheric Administration Ocean Service",
				2024,
				"https://oceanservice.noaa.gov/facts/coralreef-climate.html",
				"NOAA explains temperature-driven bleaching, ocean acidification, storms, sea-level change, and interacting climate pressures on coral reefs."
			],
			oceanClimateAssessment
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Can coral reefs be assumed to adapt fully to rapid ocean warming without emissions cuts?",
		slug: "can-coral-reefs-be-assumed-to-adapt-fully-to-rapid-ocean-warming-without-emissions-cuts",
		consensusBand: "broad",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Some corals and symbionts acclimate, adapt, migrate, or recover better than others, and those capacities matter for conservation. Observed and modeled rates do not justify assuming reefs as a whole will keep pace with unchecked rapid warming, repeated marine heatwaves, acidification, and local stress. Adaptation and restoration can buy time and preserve options, but they do not replace limiting climate change.",
		stableCore: [
			"Heat tolerance varies within and among coral species and can change through acclimatization, symbiont shifts, selection, and gene flow.",
			"Repeated severe bleaching can remove reproductive adults and habitat faster than reef structure recovers.",
			"Local protection improves resilience but cannot stop regional marine heatwaves."
		],
		openQuestions: [
			"How much adaptive capacity exists across reef species, and what ecological functions remain after community turnover?",
			"Which assisted-evolution, shading, cooling, propagation, and habitat interventions are safe, scalable, and durable?"
		],
		whatWouldChangeMinds: [
			"Long-term reef trajectories showing natural adaptation consistently preserves coral cover, diversity, and function under high-warming pathways.",
			"Field-scale interventions demonstrating durable ecosystem recovery despite increasingly frequent heat stress without emissions limitation."
		],
		misconceptions: [
			"Finding heat-tolerant corals does not prove every reef can adapt fast enough.",
			"Evolution can occur quickly but is constrained by generation time, genetic variation, tradeoffs, and mortality.",
			"Restoring coral fragments after damage is not equivalent to restoring a self-sustaining reef ecosystem."
		],
		editorSummary:
			"Coral adaptive capacity is real and worth protecting, but treating it as a substitute for climate mitigation is not supported by current reef trajectories.",
		uncertaintySummary:
			"Severe risk under continued warming is well supported. The exact persistence of particular reefs and the scalable contribution of interventions remain uncertain.",
		sources: [
			[
				"landmark_study",
				"Mechanisms of reef coral resistance to future climate change",
				"Science",
				2014,
				"10.1126/science.1251336",
				"Field and genomic evidence demonstrates both acclimatization and local adaptation in coral heat tolerance while framing limits and management relevance."
			],
			[
				"consensus_statement",
				"A Research Review of Interventions to Increase the Persistence and Resilience of Coral Reefs",
				"National Academies of Sciences, Engineering, and Medicine",
				2019,
				"10.17226/25279",
				"National Academies reviews intervention readiness, risk, scalability, and the need to evaluate tools alongside emissions mitigation and conventional management."
			],
			coralBleachingStudy
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Does melting floating sea ice directly drive most sea-level rise?",
		slug: "does-melting-floating-sea-ice-directly-drive-most-sea-level-rise",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Floating sea ice already displaces nearly its own meltwater mass, so its melting makes only a small direct sea-level contribution through density and salinity details. Most climate-driven global rise comes from warming seawater expanding and water added by melting glaciers and ice sheets resting on land. Sea-ice loss still strongly affects climate, ecosystems, coasts, and ice-sheet exposure.",
		stableCore: [
			"Archimedes' principle explains why melting floating ice differs from adding previously grounded ice to the ocean.",
			"Thermal expansion and land-ice mass loss are the dominant modern climate contributions.",
			"Floating ice shelves can restrain grounded ice, so their loss can indirectly accelerate land-ice discharge."
		],
		openQuestions: [
			"How quickly will ice-sheet dynamics, ocean heat uptake, and regional circulation change future sea level?",
			"How large will local departures from the global mean be because of gravity, currents, winds, and land motion?"
		],
		whatWouldChangeMinds: [
			"Mass and volume accounting showing floating sea-ice melt adds ocean water comparable to grounded ice loss.",
			"Observed sea-level budgets assigning most rise directly to sea-ice melt rather than thermal expansion and land-water inputs."
		],
		misconceptions: [
			"Arctic sea ice and the grounded Greenland ice sheet are not the same reservoir.",
			"A small direct sea-level effect does not make sea-ice loss harmless.",
			"Antarctic ice shelves float, but much of the ice behind them rests on land or bedrock below sea level."
		],
		editorSummary:
			"The ice-cube analogy is broadly right for floating sea ice. Rising seas are driven chiefly by warmer expanding water and added land ice, with important indirect ice-shelf effects.",
		uncertaintySummary:
			"The physical distinction is settled. Future rates and regional sea-level outcomes remain uncertain because ice dynamics and ocean circulation are complex.",
		sources: [
			[
				"systematic_review",
				"Contemporary Sea Level Rise",
				"Annual Review of Marine Science",
				2010,
				"10.1146/annurev-marine-120308-081105",
				"Review closes the observed sea-level budget using thermal expansion, land-ice loss, and land-water storage, and explains regional variation."
			],
			[
				"landmark_study",
				"The melting of floating ice raises the ocean level",
				"Geophysical Journal International",
				2007,
				"10.1111/j.1365-246X.2007.03472.x",
				"Physical accounting quantifies the small nonzero correction from density and salinity while confirming why floating-ice melt is unlike grounded-ice addition."
			],
			oceanClimateAssessment
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Can human-made underwater noise harm marine life?",
		slug: "can-human-made-underwater-noise-harm-marine-life",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Depending on intensity, frequency, duration, distance, repetition, and species, ship noise, sonar, seismic surveys, construction, and explosions can mask communication, disrupt feeding or migration, trigger stress or avoidance, and at high exposure cause injury or death. Not every sound source or observed behavioral change produces a population decline, so risk assessment must match the exposure and animal.",
		stableCore: [
			"Sound travels efficiently underwater and many marine animals depend on it for communication, navigation, prey, and predator detection.",
			"Acute high-level pulses and chronic background noise create different hazards.",
			"Quieting ships, changing operations, exclusion zones, seasonal timing, monitoring, and ramp-up procedures can reduce selected risks."
		],
		openQuestions: [
			"How do repeated sublethal disruptions accumulate into reproductive or population effects across species?",
			"Which source-reduction and spatial-management measures deliver the largest ecological benefit in working oceans?"
		],
		whatWouldChangeMinds: [
			"Controlled exposure and field studies consistently finding no auditory, physiological, behavioral, or ecological response across relevant noise regimes.",
			"Evidence that feasible mitigation never reduces exposure or biologically meaningful effects."
		],
		misconceptions: [
			"The ocean is naturally noisy, but additional noise can still mask signals or exceed harmful thresholds.",
			"A temporary avoidance response is not automatically a population-level injury.",
			"Whales are not the only affected animals; fish and invertebrates also detect and respond to sound."
		],
		editorSummary:
			"Underwater noise is a real pollutant whose effects range from masking to injury. Impact depends on a source, propagation path, exposed species, and biological context.",
		uncertaintySummary:
			"Individual-level effects are well documented. Translating diverse exposures into long-term population consequences remains a major uncertainty.",
		sources: [
			oceanNoiseReview,
			[
				"consensus_statement",
				"Ocean Noise and Marine Mammals",
				"National Academies of Sciences, Engineering, and Medicine",
				2003,
				"10.17226/10564",
				"National Academies synthesis establishes exposure and impact pathways while emphasizing the challenge of connecting behavioral responses to population consequences."
			],
			[
				"systematic_review",
				"The effects of ship noise on marine mammals: A review",
				"Frontiers in Marine Science",
				2019,
				"10.3389/fmars.2019.00606",
				"Review synthesizes masking, behavioral, stress, communication, and management evidence for commercial shipping noise."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is aquaculture always more sustainable than catching wild seafood?",
		slug: "is-aquaculture-always-more-sustainable-than-catching-wild-seafood",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Farmed bivalves and seaweeds can have low measured pressures, and efficient finfish farms can compare favorably with some fuel-intensive fisheries. Other farms create feed, nutrient, habitat, disease, chemical, escape, water, or energy burdens. Wild fisheries also range from well-managed low-impact harvests to depleted stocks, high bycatch, seabed damage, or heavy fuel use. Species and production system matter more than the farmed-or-wild label.",
		stableCore: [
			"Aquaculture removes fishing pressure from a target stock only if demand, feed, and market substitution actually produce that result.",
			"Fed fish and shrimp differ from unfed shellfish and seaweeds in inputs and ecological effects.",
			"Wild-fish impact depends on stock status, gear, bycatch, habitat contact, fuel, and management."
		],
		openQuestions: [
			"How will novel feeds, disease control, offshore systems, climate change, and cumulative coastal development alter comparative impacts?",
			"Which labels and traceability systems reliably communicate species, place, gear or farm practice, and current stock performance?"
		],
		whatWouldChangeMinds: [
			"Harmonized global evidence showing all farmed systems outperform all capture systems across climate, nutrients, habitat, biodiversity, welfare, and livelihoods.",
			"Evidence that within-category differences are negligible relative to the single farmed-versus-wild distinction."
		],
		misconceptions: [
			"Farmed seafood does not automatically spare wild fish because some feeds include marine ingredients.",
			"Wild capture does not automatically mean natural abundance or low impact.",
			"One environmental metric cannot represent disease, bycatch, habitat, climate, and nutrition together."
		],
		editorSummary:
			"There is no universal farmed-versus-wild winner. The defensible comparison names the species, system, place, management, and impacts that matter.",
		uncertaintySummary:
			"Large within-category variation is well established. Data gaps remain for biodiversity, cumulative effects, small producers, and rapidly changing practices.",
		sources: [
			blueFoodsAssessment,
			[
				"systematic_review",
				"A 20-year retrospective review of global aquaculture",
				"Nature",
				2021,
				"10.1038/s41586-021-03308-6",
				"Global review documents aquaculture's growth, feed transitions, environmental impacts, governance, regional diversity, and opportunities for improvement."
			],
			[
				"systematic_review",
				"Status, Institutions, and Prospects for Global Capture Fisheries",
				"Annual Review of Environment and Resources",
				2019,
				"10.1146/annurev-environ-101718-033310",
				"Review synthesizes variation in global stock status, governance, biological performance, and management opportunity across capture fisheries."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Are sunscreen chemicals proven to be a major cause of coral-reef decline in the ocean?",
		slug: "are-sunscreen-chemicals-proven-to-be-a-major-cause-of-coral-reef-decline-in-the-ocean",
		consensusBand: "mixed",
		confidenceScore: 74,
		evidenceCertainty: "low",
		bottomLine:
			"No. Some ultraviolet-filter chemicals can harm corals or other organisms under laboratory conditions, but field exposure, chronic effects, mixture behavior, and population-level reef impact remain inadequately characterized. Current evidence does not establish sunscreen as a leading global driver comparable with heat stress, acidification, destructive fishing, disease, or runoff. Reducing unnecessary local pollution can still be prudent without discouraging sun protection.",
		stableCore: [
			"Hazard at a tested concentration is not the same as ecological risk at measured environmental exposure.",
			"Laboratory studies vary widely in solvents, concentrations, endpoints, species, light, and exposure duration.",
			"Shade, clothing, timing, and suitable sunscreen can reduce ultraviolet exposure; skin-cancer prevention remains important."
		],
		openQuestions: [
			"What concentrations and mixtures reach heavily visited reefs over time, and which biological endpoints predict population harm?",
			"Which formulations reduce aquatic hazard without worsening human ultraviolet protection, persistence, or other environmental impacts?"
		],
		whatWouldChangeMinds: [
			"Realistic field and mesocosm studies linking ultraviolet-filter exposure to coral population decline after heat and local confounders are controlled.",
			"Robust exposure assessments showing current formulations remain far below all relevant effect thresholds across reef settings."
		],
		misconceptions: [
			"Detecting a chemical in water does not by itself establish ecological harm.",
			"Laboratory toxicity does not mean the concern is fabricated; it identifies a hazard that exposure research must test.",
			"Protecting reefs and protecting people from ultraviolet radiation need not be treated as opposing goals."
		],
		editorSummary:
			"Sunscreen ingredients pose plausible local hazards, but claims that they are a major proven cause of global reef loss outrun current exposure and field evidence.",
		uncertaintySummary:
			"Laboratory hazard is credible. Environmentally realistic exposure, mixture, chronic, and reef-population risks remain uncertain and formulation-specific.",
		sources: [
			sunscreenReview,
			[
				"systematic_review",
				"What are the toxicity thresholds of chemical pollutants for tropical reef-building corals? A systematic review",
				"Environmental Evidence",
				2023,
				"10.1186/s13750-023-00298-y",
				"Systematic review evaluates coral toxicity thresholds across chemical classes and exposes major differences in methods, endpoints, and environmental relevance."
			],
			[
				"consensus_statement",
				"Review of Fate, Exposure, and Effects of Sunscreens in Aquatic Environments and Implications for Sunscreen Usage and Human Health",
				"National Academies of Sciences, Engineering, and Medicine",
				2022,
				"10.17226/26381",
				"National Academies finds important fate, exposure, ecological-effect, formulation, and risk-assessment gaps while retaining the public-health importance of sun protection."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Can ships spread invasive species through ballast water?",
		slug: "can-ships-spread-invasive-species-through-ballast-water",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Ships take on water, plankton, microbes, eggs, and small organisms for stability and can discharge them far from their native range. Most transported organisms do not establish, but repeated global transfers have produced documented invasions with ecological and economic costs. Treatment, exchange, monitoring, and discharge standards reduce risk but do not make every pathway or organism disappear.",
		stableCore: [
			"Ballast water is one of several shipping vectors; hull fouling and sea chests also move organisms.",
			"Introduction, establishment, spread, and harm are separate filters, so detecting transport is not proof of a damaging invasion.",
			"Propagule pressure, port connectivity, environmental matching, and recipient-ecosystem conditions shape establishment risk."
		],
		openQuestions: [
			"How well do treatment systems perform across organism sizes, water qualities, operating conditions, and rare failure events?",
			"Which surveillance networks can detect new arrivals early enough for containment or eradication?"
		],
		whatWouldChangeMinds: [
			"Genetic, shipping, and historical evidence showing established non-native marine populations are not transported in ballast water.",
			"Long-term comparisons finding ballast treatment and discharge controls do not reduce viable propagules or invasion risk."
		],
		misconceptions: [
			"Not every organism found in ballast water becomes invasive.",
			"Open-ocean exchange lowers some coastal-species risk but is not equivalent to validated treatment.",
			"Ballast regulation does not address every biofouling pathway."
		],
		editorSummary:
			"Ballast water is a demonstrated biological transport network. Management aims to reduce viable introductions before the much harder problem of an established invasion begins.",
		uncertaintySummary:
			"The pathway is established. Residual risk, compliance, treatment performance, and the probability that any introduction becomes harmful vary.",
		sources: [
			marineInvasionReview,
			[
				"systematic_review",
				"An overview of thirty years of research on ballast water as a vector for aquatic invasive species to freshwater and marine environments",
				"Aquatic Ecosystem Health & Management",
				2015,
				"10.1080/14634988.2015.1027129",
				"Research review traces direct evidence for ballast-mediated transport, management development, treatment questions, and emerging surveillance needs."
			],
			[
				"consensus_statement",
				"International Convention for the Control and Management of Ships' Ballast Water and Sediments",
				"International Maritime Organization",
				2017,
				"https://www.imo.org/en/about/conventions/pages/international-convention-for-the-control-and-management-of-ships'-ballast-water-and-sediments-(bwm).aspx",
				"International convention codifies ballast-management and discharge-performance obligations to reduce transfers of harmful aquatic organisms and pathogens."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "oceans-and-marine-science",
		title: "Is ocean iron fertilization proven to provide safe, durable carbon removal at climate scale?",
		slug: "is-ocean-iron-fertilization-proven-to-provide-safe-durable-carbon-removal-at-climate-scale",
		consensusBand: "unclear",
		confidenceScore: 68,
		evidenceCertainty: "low",
		bottomLine:
			"No. Adding iron to some iron-limited waters reliably stimulates phytoplankton growth, but a bloom is not the same as durable net removal of atmospheric carbon. The fraction exported deep enough for long storage, additionality, nutrient displacement, monitoring, scale, cost, and side effects such as oxygen loss, food-web change, harmful blooms, or other gases remain uncertain. It is a research candidate, not a proven climate service.",
		stableCore: [
			"Iron limits biological production in substantial high-nutrient, low-chlorophyll ocean regions.",
			"Field experiments demonstrate bloom stimulation more directly than century-scale net atmospheric carbon removal.",
			"Credible removal accounting must subtract lifecycle emissions, leakage, displaced productivity, and carbon that rapidly returns to the atmosphere."
		],
		openQuestions: [
			"What fraction of additional carbon reaches depths and water masses that isolate it for policy-relevant durations?",
			"Can monitoring verify net removal and ecological effects across a moving, connected ocean at meaningful scale?"
		],
		whatWouldChangeMinds: [
			"Replicated field programs demonstrating verifiable, additional, durable net removal with bounded ecosystem effects and credible governance.",
			"Evidence that export efficiency, nutrient redistribution, or harms make responsible net removal physically or ecologically infeasible."
		],
		misconceptions: [
			"More phytoplankton at the surface is not itself proof that atmospheric carbon stays out for a century.",
			"Natural iron fertilization shows a mechanism but does not settle deliberate deployment impacts.",
			"Unproven does not mean impossible; it means claims should remain conditional on research."
		],
		editorSummary:
			"Iron can make plankton bloom. The unresolved climate question is whether deliberate fertilization creates measurable, durable net carbon removal without unacceptable ocean tradeoffs.",
		uncertaintySummary:
			"Bloom response is established, while net removal, durability, scalability, ecological risk, monitoring, and governance remain frontier questions.",
		sources: [
			oceanCarbonRemovalAssessment,
			[
				"systematic_review",
				"Reviews and syntheses: Ocean iron fertilization experiments, past, present, and future",
				"Biogeosciences",
				2018,
				"10.5194/bg-15-5847-2018",
				"Review of field experiments separates phytoplankton response from carbon export and surveys efficiency, side effects, monitoring, and experimental needs."
			],
			[
				"consensus_statement",
				"Next steps for assessing ocean iron fertilization for marine carbon dioxide removal",
				"Frontiers in Climate",
				2024,
				"10.3389/fclim.2024.1430957",
				"Interdisciplinary workshop report specifies the field, modeling, verification, ecological, governance, and social research needed before responsible scale-up could be assessed."
			]
		]
	})
];
