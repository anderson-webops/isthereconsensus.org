import type { AtlasBreadthSourceTuple } from "./claim-expansion-2026-09-atlas-breadth-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthClaim as reviewedClaim } from "./claim-expansion-2026-09-atlas-breadth-shared.js";

const conservationMetaAnalysis = [
	"meta_analysis",
	"The positive impact of conservation action",
	"Science",
	2024,
	"10.1126/science.adj6598",
	"Global meta-analysis of 186 studies and 665 trials found conservation improved biodiversity or slowed decline relative to no action in about two-thirds of comparisons, while also showing that outcomes are not uniformly positive."
] as const satisfies AtlasBreadthSourceTuple;

const corridorMetaAnalysis = [
	"meta_analysis",
	"A Meta-Analytic Review of Corridor Effectiveness",
	"Conservation Biology",
	2010,
	"10.1111/j.1523-1739.2010.01450.x",
	"Meta-analysis of 78 experiments found corridors increased movement between habitat patches on average, with design, taxon, and landscape context affecting performance."
] as const satisfies AtlasBreadthSourceTuple;

const oldForestReview = [
	"systematic_review",
	"The exceptional value of intact forest ecosystems",
	"Nature Ecology & Evolution",
	2018,
	"10.1038/s41559-018-0490-x",
	"Global review identifies biodiversity, carbon, water, resilience, health, and cultural values that intact forests provide beyond degraded or simplified forests."
] as const satisfies AtlasBreadthSourceTuple;

const insectMetaAnalysis = [
	"meta_analysis",
	"Meta-analysis reveals declines in terrestrial but increases in freshwater insect abundances",
	"Science",
	2020,
	"10.1126/science.aax9931",
	"Time-series meta-analysis finds average terrestrial declines and freshwater increases, while emphasizing strong geographic, taxonomic, and sampling gaps."
] as const satisfies AtlasBreadthSourceTuple;

const wildlifeFeedingReview = [
	"systematic_review",
	"Wildlife health and supplemental feeding: A review and management recommendations",
	"Biological Conservation",
	2016,
	"10.1016/j.biocon.2016.10.034",
	"Review across 68 species documents pathways by which provisioning can alter nutrition, stress, aggregation, pathogen exposure, and human-wildlife interactions."
] as const satisfies AtlasBreadthSourceTuple;

const captiveBreedingReview = [
	"systematic_review",
	"Limitations of captive breeding in endangered species recovery",
	"Conservation Biology",
	1996,
	"10.1046/j.1523-1739.1996.10020338.x",
	"Influential review treats captive propagation as a sometimes valuable tool that cannot replace habitat protection, threat control, genetic management, and viable wild populations."
] as const satisfies AtlasBreadthSourceTuple;

const predatorControlReview = [
	"systematic_review",
	"Predator control should not be a shot in the dark",
	"Frontiers in Ecology and the Environment",
	2016,
	"10.1002/fee.1312",
	"Review finds lethal predator-control evidence frequently lacks randomized or otherwise strong designs and calls for prospective tests measuring livestock and conservation outcomes."
] as const satisfies AtlasBreadthSourceTuple;

const deExtinctionGuidance = [
	"guideline",
	"IUCN SSC guiding principles on creating proxies of extinct species for conservation benefit",
	"International Union for Conservation of Nature",
	2016,
	"https://iucn.org/resources/grey-literature/iucn-ssc-guiding-principles-creating-proxies-extinct-species-conservation",
	"IUCN frames proxy creation as a possible conservation tool requiring explicit goals, risk assessment, welfare, habitat, governance, and comparison with alternatives."
] as const satisfies AtlasBreadthSourceTuple;

const catImpactReview = [
	"systematic_review",
	"Review and synthesis of the global literature on domestic cat impacts on wildlife",
	"Journal of Animal Ecology",
	2022,
	"10.1111/1365-2656.13745",
	"Systematic review of 332 included publications finds predominantly negative wildlife effects where studied and identifies major geographic and management-evidence gaps."
] as const satisfies AtlasBreadthSourceTuple;

const fireBiodiversityReview = [
	"systematic_review",
	"What is the effect of prescribed burning in temperate and boreal forest on biodiversity, beyond pyrophilous and saproxylic species? A systematic review",
	"Environmental Evidence",
	2018,
	"10.1186/s13750-018-0131-5",
	"Systematic review shows biodiversity responses depend on taxon, forest, fire history, and burn characteristics, supporting regime-specific rather than universal fire prescriptions."
] as const satisfies AtlasBreadthSourceTuple;

export const september2026AtlasBreadthEcologyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do wildlife corridors usually improve movement between fragmented habitats?",
		slug: "do-wildlife-corridors-usually-improve-movement-between-fragmented-habitats",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Usually yes. Corridors and connected habitat networks increase movement between otherwise isolated patches on average and can support dispersal, gene flow, seasonal migration, and climate-driven range shifts. A line on a map is not automatically functional, however. Width, habitat quality, barriers, edge effects, species behavior, and long-term protection determine whether a corridor works.",
		stableCore: [
			"Connectivity can reduce isolation without making the surrounding habitat matrix irrelevant.",
			"Different species need different corridor structures; a route useful to a large mammal may fail an amphibian, plant, or insect.",
			"Movement evidence is more common than direct evidence of long-term population recovery."
		],
		openQuestions: [
			"Which corridor designs produce demographic and genetic benefits across multiple species over decades?",
			"How should connectivity plans adapt to roads, development, shifting climate, disease, and human-wildlife conflict?"
		],
		whatWouldChangeMinds: [
			"Well-controlled landscape studies consistently showing connected patches have no movement, gene-flow, or persistence advantage.",
			"Evidence that corridor harms such as disease spread or ecological traps outweigh benefits across most intended settings."
		],
		misconceptions: [
			"A narrow strip of low-quality land is not necessarily a functional corridor.",
			"Connectivity complements, rather than replaces, sufficiently large core habitat.",
			"Animals using a corridor does not by itself prove population growth."
		],
		editorSummary:
			"Corridors usually help organisms move through fragmented landscapes, but conservation value depends on design, destination habitat, and measured population outcomes.",
		uncertaintySummary:
			"Movement benefits are broadly supported. Long-term demographic effects, multi-species design, and risks such as disease or conflict are more context-dependent.",
		sources: [
			corridorMetaAnalysis,
			[
				"systematic_review",
				"A synthesis of priorities, patterns, and gaps in large carnivore corridor research",
				"Frontiers in Conservation Science",
				2023,
				"10.3389/fcosc.2023.1094443",
				"Systematic review documents corridor use in carnivore conservation and highlights weak coverage of multi-species, climate, conflict, and implementation outcomes."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Can wetland restoration reduce flood risk while improving habitat?",
		slug: "can-wetland-restoration-reduce-flood-risk-while-improving-habitat",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, in suitable landscapes. Reconnected floodplains and restored wetlands can store water, slow runoff, reduce some downstream flood peaks, improve water quality, and rebuild habitat. They are not a universal flood shield: benefits depend on location, area, soil, hydrology, maintenance, and event size, and severe floods can exceed their storage capacity.",
		stableCore: [
			"Restoring natural water pathways and vegetation can recover several ecosystem functions at once.",
			"Strategic placement within a watershed matters more than simply reporting acres restored.",
			"Wetlands should complement, not automatically replace, evacuation, land-use planning, drainage, and engineered protection."
		],
		openQuestions: [
			"Which combinations of wetland type, watershed position, and restoration technique yield the most reliable flood attenuation?",
			"How long do biodiversity and hydrological functions take to recover, and which indicators reveal failure early?"
		],
		whatWouldChangeMinds: [
			"Paired-watershed and event studies showing well-placed restoration does not alter storage, runoff timing, or habitat relative to controls.",
			"Evidence that restoration-related displacement of water or people routinely produces larger net harms than benefits."
		],
		misconceptions: [
			"Wetland restoration cannot guarantee that nearby properties will never flood.",
			"A newly excavated basin is not immediately equivalent to a mature wetland ecosystem.",
			"Flood mitigation, carbon storage, water quality, and biodiversity may recover at different rates."
		],
		editorSummary:
			"Wetlands can be working flood infrastructure and habitat together, but performance comes from hydrology and placement rather than the restoration label alone.",
		uncertaintySummary:
			"Multiple benefits are well grounded, while local flood effect sizes and ecological recovery trajectories vary widely and need site-level monitoring.",
		sources: [
			[
				"systematic_review",
				"Hydrological Analysis and Impacts of Natural Flood Management Strategies: A Systematic Review",
				"Journal of Flood Risk Management",
				2025,
				"10.1111/jfr3.70112",
				"Review of 216 cases evaluates hydrological performance and the landscape factors that control nature-based flood-management outcomes."
			],
			[
				"consensus_statement",
				"Compensating for Wetland Losses Under the Clean Water Act",
				"National Research Council",
				2001,
				"10.17226/10134",
				"National Academies assessment explains why restored area alone is insufficient and why hydrology, function, landscape setting, and monitoring determine success."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Can a newly planted forest quickly replace an old-growth forest?",
		slug: "can-a-newly-planted-forest-quickly-replace-an-old-growth-forest",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Tree planting can restore valuable forest over time, but it does not quickly recreate the large trees, dead wood, soils, microclimates, species interactions, genetic legacies, and accumulated carbon of an old forest. Some functions begin recovering within years or decades; others require centuries or may follow a different trajectory under a changed climate.",
		stableCore: [
			"Protecting an existing old forest avoids an immediate carbon and habitat loss that future planting must first repay.",
			"A plantation optimized for timber or rapid growth is not ecologically interchangeable with a structurally complex native forest.",
			"Restoration is still valuable, especially on degraded land, even though it does not justify destroying irreplaceable remnants."
		],
		openQuestions: [
			"Which active and passive restoration practices best accelerate old-forest functions without simplifying natural succession?",
			"How will climate change alter the species composition and recovery path that a historical old-growth benchmark implies?"
		],
		whatWouldChangeMinds: [
			"Long-term studies showing young plantations rapidly match old forests across carbon stocks, structure, biodiversity, soils, and hydrology.",
			"Evidence that age-dependent habitat and ecological legacies are irrelevant to the species and functions being protected."
		],
		misconceptions: [
			"Planting the same number of trees does not replace the same ecosystem.",
			"Young forests can grow quickly while storing much less total carbon than the old forest they replaced.",
			"Recognizing irreplaceability is not an argument against restoring already degraded land."
		],
		editorSummary:
			"A sapling can replace a tree count, not centuries of ecological development. Protection and restoration solve different parts of the forest crisis.",
		uncertaintySummary:
			"Slow recovery of many old-forest attributes is well established. Exact trajectories depend on biome, disturbance history, climate, and management.",
		sources: [
			oldForestReview,
			[
				"systematic_review",
				"Old forests are not replaceable",
				"Nature Ecology & Evolution",
				2022,
				"10.1038/s41559-022-01806-y",
				"Synthesis explains why restored and planted forests cannot regain all old-forest carbon, biodiversity, resilience, and cultural functions on policy-relevant timescales."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Are all insect populations collapsing at the same rate everywhere?",
		slug: "are-all-insect-populations-collapsing-at-the-same-rate-everywhere",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Many well-studied terrestrial insect populations and groups have declined, sometimes sharply, and habitat loss, pesticides, pollution, invasive species, and climate change are credible drivers. But trends are not uniform: some populations are stable or increasing, freshwater insects showed average increases in one large synthesis, and much of the tropics and many taxa lack long time series.",
		stableCore: [
			"Serious declines can coexist with geographic and taxonomic variation.",
			"Insects are not one population, and abundance, biomass, occupancy, and diversity answer different questions.",
			"Monitoring is biased toward Europe and North America and toward groups people already survey."
		],
		openQuestions: [
			"What are representative global trends across tropical regions, soils, canopies, and poorly studied insect orders?",
			"Which combinations of land use, chemicals, climate, light, and conservation action explain local trajectories?"
		],
		whatWouldChangeMinds: [
			"Representative, standardized global monitoring showing sustained stability or growth across the terrestrial groups previously found to decline.",
			"Reanalysis demonstrating that reported declines are produced mainly by sampling or publication artifacts."
		],
		misconceptions: [
			"Rejecting one universal collapse rate does not make documented declines harmless.",
			"A local increase in one species does not describe total insect diversity or function.",
			"The phrase insect apocalypse can obscure both severe losses and important evidence gaps."
		],
		editorSummary:
			"The responsible summary is concern without false uniformity: substantial declines are real, while rates, directions, causes, and data quality vary across the insect world.",
		uncertaintySummary:
			"Evidence is strongest for particular regions and monitored groups. Global extrapolation remains limited by sparse baselines, inconsistent methods, and short time series.",
		sources: [
			insectMetaAnalysis,
			[
				"systematic_review",
				"Insect decline in the Anthropocene: Death by a thousand cuts",
				"Proceedings of the National Academy of Sciences",
				2021,
				"10.1073/pnas.2023989118",
				"Multi-author synthesis reviews interacting decline drivers, uneven evidence, and conservation responses without assigning one universal trend."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Is feeding wild animals generally harmless when the food seems healthy?",
		slug: "is-feeding-wild-animals-generally-harmless-when-the-food-seems-healthy",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Intentional feeding can sometimes support a carefully managed conservation program, and clean bird feeding is not equivalent to hand-feeding a bear. In general, however, provisioning can crowd animals together, spread pathogens, alter migration and foraging, create nutritional imbalance, habituate animals to people, and increase aggression, vehicle strikes, or lethal conflict.",
		stableCore: [
			"Food quality alone does not address changes in behavior, density, contact rates, and dependency.",
			"Risk varies by species, season, setting, feed design, sanitation, and whether trained managers oversee the program.",
			"Wildlife agencies commonly prohibit visitor feeding where habituation endangers animals or people."
		],
		openQuestions: [
			"Which household bird-feeding practices produce net benefits or harms under different climates and disease conditions?",
			"When can targeted supplemental feeding aid threatened populations without creating long-term ecological dependence?"
		],
		whatWouldChangeMinds: [
			"Controlled long-term studies showing unmanaged public feeding has no behavioral, disease, demographic, or conflict costs across sensitive species.",
			"Management trials identifying low-risk protocols that remain effective when adopted at community scale."
		],
		misconceptions: [
			"An animal eagerly eating human food does not prove that the interaction is healthy.",
			"The same recommendation does not apply identically to backyard songbirds, deer, dolphins, and large carnivores.",
			"Supplemental feeding used by conservation professionals is not a license for casual visitor feeding."
		],
		editorSummary:
			"A snack changes more than calories. It can reshape animal behavior, disease exposure, and conflict, so species-specific management matters.",
		uncertaintySummary:
			"Multiple harm pathways are established, but net effects vary markedly by species and protocol. Some managed feeding contexts remain defensible.",
		sources: [
			wildlifeFeedingReview,
			[
				"systematic_review",
				"Impacts of wildlife baiting and supplemental feeding on infectious disease transmission risk: a synthesis of knowledge",
				"Preventive Veterinary Medicine",
				2014,
				"10.1016/j.prevetmed.2013.11.010",
				"Review details how aggregation, direct contact, contaminated feed, and environmental pathogen stages can increase disease transmission."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Can captive breeding by itself save most threatened species?",
		slug: "can-captive-breeding-by-itself-save-most-threatened-species",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Captive breeding has helped prevent extinction and support reintroduction for some species, but a population in captivity is not the same as a self-sustaining wild population. Without habitat, threat removal, genetic diversity, suitable behavior, disease controls, and long-term release management, breeding more individuals may only postpone loss or produce animals poorly prepared for the wild.",
		stableCore: [
			"Ex situ programs can buy time, preserve genetic material, and supply founders when integrated into a broader recovery plan.",
			"Small captive populations face inbreeding, genetic drift, adaptation to captivity, disease, cost, and space limits.",
			"Reintroduction succeeds only if the original causes of decline are sufficiently controlled."
		],
		openQuestions: [
			"Which husbandry and genetic strategies best preserve wild behavior and adaptive potential across generations?",
			"How should limited captive capacity be allocated among emergency rescue, insurance populations, research, and reintroduction?"
		],
		whatWouldChangeMinds: [
			"Broad recovery evidence showing captive propagation alone produces persistent wild populations despite unchanged habitat threats.",
			"Long-term comparisons demonstrating no genetic, behavioral, welfare, disease, or resource constraints from captivity."
		],
		misconceptions: [
			"More births in a zoo do not automatically improve conservation status in the wild.",
			"Critiquing captive breeding as a stand-alone strategy does not deny its documented successes.",
			"Release numbers matter less than survival, reproduction, genetic contribution, and restored ecological function."
		],
		editorSummary:
			"Captive breeding is a bridge, not a destination. It works best when it connects genetic and demographic rescue to restored, protected wild habitat.",
		uncertaintySummary:
			"The need for integrated recovery is well established. Feasibility and success depend heavily on species biology, threat reversibility, resources, and program design.",
		sources: [
			captiveBreedingReview,
			[
				"systematic_review",
				"Minimizing genetic adaptation in captive breeding programs: A review",
				"Biological Conservation",
				2009,
				"10.1016/j.biocon.2009.05.034",
				"Review evaluates genetic adaptation to captivity and strategies intended to preserve post-release fitness."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Does killing predators reliably protect livestock or biodiversity?",
		slug: "does-killing-predators-reliably-protect-livestock-or-biodiversity",
		consensusBand: "mixed",
		confidenceScore: 77,
		evidenceCertainty: "low",
		bottomLine:
			"Not reliably. Targeted removal can reduce a specific, immediate threat in some settings, especially for invasive predators on islands. Broad or poorly evaluated culling may fail to reduce livestock losses, remove non-problem animals, disrupt social structure, trigger immigration or compensatory reproduction, and harm ecosystem function. Outcomes depend on species, scale, timing, method, and the alternative protections used.",
		stableCore: [
			"Predator abundance, predation events, livestock loss, and biodiversity outcomes are different measures.",
			"Nonlethal tools such as husbandry, fencing, guard animals, deterrents, and carcass management also vary in effectiveness.",
			"Strong inference needs prospective controls and outcome monitoring, not only the number of predators killed."
		],
		openQuestions: [
			"Which combinations of lethal and nonlethal tools minimize total ecological, welfare, and livelihood harm in each conflict system?",
			"How often do social disruption, immigration, or prey responses reverse the intended effect at larger scales?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized or strong quasi-experimental studies showing broad culls consistently reduce verified losses with acceptable ecological effects.",
			"Comparable evidence that nonlethal approaches consistently fail in the same settings."
		],
		misconceptions: [
			"A predator present near a loss is not automatically the individual responsible.",
			"Evidence from invasive-predator eradication on an island does not transfer automatically to native carnivores on a continent.",
			"Uncertain average effectiveness does not mean managers never face an urgent removal decision."
		],
		editorSummary:
			"Predator removal is an intervention to test, not a self-validating outcome. The relevant result is reduced harm without creating larger ecological or social costs.",
		uncertaintySummary:
			"Evidence quality is uneven and effects are highly system-specific. Carefully targeted control can work, while generalized culling lacks reliable support.",
		sources: [
			predatorControlReview,
			[
				"meta_analysis",
				"Carnivore conservation needs evidence-based livestock protection",
				"PLOS Biology",
				2018,
				"10.1371/journal.pbio.2005577",
				"Meta-analytic review finds stronger evidence for several nonlethal livestock-protection methods than for commonly used lethal controls, with major design limitations."
			],
			conservationMetaAnalysis
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Can de-extinction substitute for conserving species that are alive today?",
		slug: "can-de-extinction-substitute-for-conserving-species-that-are-alive-today",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Current approaches could at most create a proxy carrying selected traits of an extinct species, not restore the original population, learned behavior, microbiome, ecological history, or lost habitat. Such research may eventually restore some ecological functions, but it is costly, uncertain, and cannot replace preventing extinction or protecting ecosystems that still exist.",
		stableCore: [
			"Extinction removes more than a DNA sequence; it removes populations, variation, relationships, and continuity.",
			"Any proxy released to the wild would require the same habitat, welfare, disease, governance, and long-term management scrutiny as a conservation translocation.",
			"Spending on de-extinction can carry opportunity costs for threatened living species."
		],
		openQuestions: [
			"Can a proxy safely restore a clearly defined missing ecological function better than living-species alternatives?",
			"How should welfare, Indigenous governance, liability, and conservation opportunity costs shape candidate selection?"
		],
		whatWouldChangeMinds: [
			"Demonstrated proxy populations that persist safely, restore lost function, and outperform conventional conservation per unit of constrained resources.",
			"Technology capable of reconstructing the extinct population's meaningful genetic and ecological diversity rather than a small engineered lineage."
		],
		misconceptions: [
			"An elephant edited to express mammoth-like traits would not be an exact resurrection of the mammoth species.",
			"Technical feasibility of producing an individual does not establish conservation benefit.",
			"De-extinction research and ordinary genetic rescue are related but not identical goals."
		],
		editorSummary:
			"A future proxy may become one conservation tool, but extinction is not cleanly reversible and prevention remains far more complete than attempted reconstruction.",
		uncertaintySummary:
			"No released de-extinct population currently demonstrates ecological recovery. Future benefits and harms remain speculative and candidate-specific.",
		sources: [
			deExtinctionGuidance,
			[
				"systematic_review",
				"Reintroducing resurrected species: selecting DeExtinction candidates",
				"Trends in Ecology & Evolution",
				2014,
				"10.1016/j.tree.2014.01.007",
				"Review applies conservation-translocation criteria to de-extinction and emphasizes habitat, risk, population viability, and ecological purpose."
			],
			[
				"systematic_review",
				"The ecology of de-extinction",
				"Functional Ecology",
				2017,
				"10.1111/1365-2435.12856",
				"Synthesis argues that producing an organism is only the first step and that viable populations, ecological function, monitoring, and opportunity costs determine conservation value."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do free-ranging domestic cats harm wildlife populations?",
		slug: "do-free-ranging-domestic-cats-harm-wildlife-populations",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, especially where cats are abundant or wildlife evolved without mammalian predators. Owned, stray, and feral cats kill birds, mammals, reptiles, amphibians, and invertebrates, and can also transmit disease or alter prey behavior. The size of population-level effects varies by location and species, but island extinctions and many local declines show that the risk is not merely individual prey loss.",
		stableCore: [
			"A well-fed cat may still hunt because predation is not driven only by hunger.",
			"Risk is often highest for island endemics, ground-nesting species, and small isolated populations.",
			"Keeping pet cats indoors or using secure outdoor enclosures protects both wildlife and cats from several hazards."
		],
		openQuestions: [
			"Which humane owned and unowned-cat management combinations reduce wildlife impacts at population scale?",
			"How large are non-predation effects and impacts in understudied regions of Africa, Asia, and South America?"
		],
		whatWouldChangeMinds: [
			"Representative field studies showing free-ranging cats do not affect survival, recruitment, abundance, or extinction risk in exposed wildlife populations.",
			"Management experiments showing reducing cat access does not improve outcomes for vulnerable prey."
		],
		misconceptions: [
			"Natural hunting behavior does not make a globally introduced predator ecologically native everywhere.",
			"Uncertainty in a national kill estimate does not erase directly observed local and island effects.",
			"Recognizing wildlife harm does not justify inhumane treatment of cats."
		],
		editorSummary:
			"Free-ranging cats are a documented conservation pressure. Responsible responses should protect wildlife while using humane, evidence-tested cat management.",
		uncertaintySummary:
			"Negative effects are strongly documented, but magnitudes and best management strategies vary across ecosystems, cat populations, and prey vulnerability.",
		sources: [
			catImpactReview,
			[
				"meta_analysis",
				"The impact of free-ranging domestic cats on wildlife of the United States",
				"Nature Communications",
				2013,
				"10.1038/ncomms2380",
				"Evidence synthesis estimates very large U.S. wildlife mortality while explicitly reporting broad uncertainty ranges and differences between owned and unowned cats."
			],
			[
				"meta_analysis",
				"Invasive predators and global biodiversity loss",
				"Proceedings of the National Academy of Sciences",
				2016,
				"10.1073/pnas.1602480113",
				"Global synthesis links introduced mammalian predators, including cats, to a substantial share of documented vertebrate extinctions and threats."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Is suppressing every fire best for fire-adapted ecosystems?",
		slug: "is-suppressing-every-fire-best-for-fire-adapted-ecosystems",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Many forests, grasslands, savannas, and shrublands evolved with recurring fire, and excluding it can change habitat, allow fuels or fire-sensitive vegetation to accumulate, and threaten species that depend on particular fire stages. That does not mean every fire is beneficial. Frequency, season, intensity, patchiness, weather, invasive plants, and human exposure determine the ecological and safety outcome.",
		stableCore: [
			"A fire regime is a pattern of timing, frequency, severity, size, and spatial variation, not simply fire versus no fire.",
			"Prescribed burning and cultural burning can restore selected processes and reduce some fuels when conditions and governance are appropriate.",
			"Some ecosystems burn rarely and are damaged by repeated fire, so importing a frequent-fire prescription can be destructive."
		],
		openQuestions: [
			"How should changing climate and invasive fuels alter historical reference regimes and treatment intervals?",
			"Which combinations of fire, thinning, grazing, and protection best support biodiversity while reducing community risk?"
		],
		whatWouldChangeMinds: [
			"Cross-biome studies showing prolonged exclusion consistently preserves fire-dependent species, structure, and resilience better than appropriate managed fire.",
			"Evidence that prescribed or cultural fire cannot produce intended ecological benefits under any well-matched regime."
		],
		misconceptions: [
			"Recognizing ecological fire does not mean allowing every wildfire to burn near communities.",
			"A low-intensity prescribed burn and an extreme wind-driven wildfire are not interchangeable treatments.",
			"Historical fire regimes often include long-standing Indigenous stewardship rather than an untouched absence of people."
		],
		editorSummary:
			"Fire can be an ecological process, a management tool, and a disaster. Good policy distinguishes the regime and place instead of treating all flame as equivalent.",
		uncertaintySummary:
			"Fire dependence and suppression effects are well documented, while the safest and most restorative treatment mix is ecosystem- and climate-specific.",
		sources: [
			fireBiodiversityReview,
			[
				"systematic_review",
				"Effects of fire history on animal communities: a systematic review",
				"Fire Ecology",
				2022,
				"10.1186/s13717-021-00357-7",
				"Review finds animal richness and abundance respond to time since fire and other regime features rather than to one universal burn effect."
			],
			[
				"consensus_statement",
				"Ecological effects of prescribed fire season: a literature review and synthesis for managers",
				"U.S. Forest Service",
				2009,
				"10.2737/PSW-GTR-224",
				"Management synthesis evaluates seasonal burning effects and supports variable, ecosystem-specific regimes rather than blanket exclusion."
			]
		]
	})
];
