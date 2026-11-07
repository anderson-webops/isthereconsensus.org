import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberEcologyConservationResearchCheckedAt = "2026-11-07T10:15:00.579Z";

const sources = {
	crossingsMeta: researchSource("How Effective Is Road Mitigation at Reducing Road-Kill? A Meta-Analysis", "PLOS ONE", 2016, "https://doi.org/10.1371/journal.pone.0166941", "10.1371/journal.pone.0166941", "2016 synthesis of 50 studies found lower roadkill with fencing, especially fencing combined with crossings for large mammals. Crossings without fencing had no detectable pooled benefit. The overall average is not the effect of every structure or species.", "meta_analysis", "supports", novemberEcologyConservationResearchCheckedAt),
	crossingsMovement: researchSource("Do wildlife crossing structures mitigate the barrier effect of roads on animal movement? A global assessment", "Journal of Applied Ecology", 2024, "https://doi.org/10.1111/1365-2664.14582", "10.1111/1365-2664.14582", "2024 global synthesis of 313 studies distinguished passage use from a demonstrated change in movement. Only 14% evaluated a change against a benchmark. Movement, mortality and long-term population recovery are different outcomes; included literature can overlap earlier reviews.", "systematic_review", "context", novemberEcologyConservationResearchCheckedAt),
	crossingsNegative: researchSource("Increase in the use of crossing structures does not mean a decrease in roadkill numbers", "Perspectives in Ecology and Conservation", 2026, "https://doi.org/10.1016/j.pecon.2026.02.012", "10.1016/j.pecon.2026.02.012", "2026 southeastern Brazilian study used 14 years of monitoring. Passage use rose while roadkill persisted in mitigated segments. Nonrandom site selection prevents interpreting the segment contrast as proof that crossings caused deaths.", "landmark_study", "debate", novemberEcologyConservationResearchCheckedAt),
	nativeReview: researchSource("Plant native: comparing biodiversity benefits, ecosystem services provisioning, and plant performance of native and non-native plants in urban horticulture", "Urban Ecosystems", 2024, "https://doi.org/10.1007/s11252-024-01610-5", "10.1007/s11252-024-01610-5", "2024 systematic review of 165 papers found that native urban plants generally supported more animal abundance and diversity. Outcome counts in the abstract are not independent paper counts. Plant performance and other ecosystem services had thinner evidence than fauna.", "systematic_review", "supports", novemberEcologyConservationResearchCheckedAt),
	nativeChickadee: researchSource("Nonnative plants reduce population growth of an insectivorous bird", "Proceedings of the National Academy of Sciences", 2018, "https://doi.org/10.1073/pnas.1809259115", "10.1073/pnas.1809259115", "2018 residential-yard study linked nonnative-dominated vegetation with less arthropod food and poorer Carolina chickadee reproduction. Its native-biomass threshold is specific to that study, not a universal rule for gardens, climates or birds.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	nativeVisits: researchSource("Native-plant landscaping enhances floral visitation by insects and birds in residential yards", "Urban Ecosystems", 2026, "https://doi.org/10.1007/s11252-026-01984-8", "10.1007/s11252-026-01984-8", "2026 study of 31 Los Angeles residential yards found more insect and bird floral visitors in native-landscaped yards. This was an observational comparison, and visits or network links do not by themselves measure population growth. It is not an experiment covering every city.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	mowingMeta: researchSource("Ecological and economic benefits of low‐intensity urban lawn management", "Journal of Applied Ecology", 2020, "https://doi.org/10.1111/1365-2664.13542", "10.1111/1365-2664.13542", "2020 synthesis of North American and European studies linked more intensive urban lawn mowing with lower plant and invertebrate diversity. The evidence mixes mowing frequency and height. A local cost example and less clear soil outcomes do not establish universal savings or carbon benefits.", "meta_analysis", "supports", novemberEcologyConservationResearchCheckedAt),
	mowingExperiment: researchSource("To mow or to mow less: Lawn mowing frequency affects bee abundance and diversity in suburban yards", "Biological Conservation", 2018, "https://doi.org/10.1016/j.biocon.2018.01.025", "10.1016/j.biocon.2018.01.025", "2018 experiment in 16 Massachusetts yards compared mowing intervals. The intermediate interval had the most bees but the lowest bee richness and evenness. More bees visiting did not necessarily mean more kinds of bees.", "landmark_study", "context", novemberEcologyConservationResearchCheckedAt),
	mowingUnequal: researchSource("Unequal pollinator benefits from partial mowing regimes in a field experiment", "Insect Conservation and Diversity", 2026, "https://doi.org/10.1111/icad.70148", "10.1111/icad.70148", "2026 dike-grassland field experiment found an initial concentration of pollinators in unmown refuges, followed by losses of several wild-bee measures relative to unmown controls. Dike refuges are not residential lawns, and a short-term visitation increase is not sustained population recovery.", "landmark_study", "debate", novemberEcologyConservationResearchCheckedAt),
	peatWaterTable: researchSource("Overriding water table control on managed peatland greenhouse gas emissions", "Nature", 2021, "https://doi.org/10.1038/s41586-021-03523-1", "10.1038/s41586-021-03523-1", "2021 field measurements and wider-site synthesis linked shallower drainage with lower net warming from carbon dioxide and methane on managed peatlands. Its 100-year warming metric is not identical to a time-resolved climate trajectory, and the observational relationship does not set a universal restoration target.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	peatTypes: researchSource("Rewetting Offers Rapid Climate Benefits for Tropical and Agricultural Peatlands But Not for Forestry‐Drained Peatlands", "Global Biogeochemical Cycles", 2020, "https://doi.org/10.1029/2019gb006503", "10.1029/2019gb006503", "2020 radiative-forcing scenarios distinguished tropical, agricultural and forestry-drained peatlands. Methane increases and tree-carbon losses delayed or offset cooling in some settings. These are modeled counterfactuals, not measured outcomes from a worldwide randomized restoration program.", "landmark_study", "context", novemberEcologyConservationResearchCheckedAt),
	peatForest: researchSource("Rewetting drained boreal peatland forests does not mitigate climate warming in the twenty-first century", "Ambio", 2025, "https://doi.org/10.1007/s13280-025-02225-6", "10.1007/s13280-025-02225-6", "2025 Northern European boreal-forest modeling included soil gases, tree and wood-product carbon, and albedo. Several rewetting pathways warmed the climate relative to continued forestry over the relevant time horizons. Ecological restoration benefits and short-term climate benefits remain distinct.", "landmark_study", "debate", novemberEcologyConservationResearchCheckedAt),
	lightPollination: researchSource("Artificial light at night as a new threat to pollination", "Nature", 2017, "https://doi.org/10.1038/nature23288", "10.1038/nature23288", "2017 field experiment found fewer nocturnal flower visits under artificial lighting and reduced fruit set for a focal plant. This supports a local ecological effect, not a measured global percentage of crop loss or insect decline.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	lightCaterpillars: researchSource("Street lighting has detrimental impacts on local insect populations", "Science Advances", 2021, "https://doi.org/10.1126/sciadv.abi8322", "10.1126/sciadv.abi8322", "2021 matched-site study found fewer moth caterpillars near streetlights, supplemented by a separate feeding-behavior experiment. Differences between the tested lamps do not establish that one color is harmless to every insect species.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	lightSpectrum: researchSource("Colours of the Night: Spectrum‐Specific Impacts of Light Pollution on Biota", "Global Change Biology", 2025, "https://doi.org/10.1111/gcb.70569", "10.1111/gcb.70569", "2025 synthesis examined light spectrum and intensity across multiple organisms and endpoints. Warm broad-spectrum light could also disrupt biology, and responses were not consistently dose-dependent. Its physiology and behavior results are not direct estimates of global insect population loss.", "meta_analysis", "context", novemberEcologyConservationResearchCheckedAt),
	windowsField: researchSource("Bird protection treatments reduce bird-window collision risk at low-rise buildings within a Pacific coastal protected area", "PeerJ", 2022, "https://doi.org/10.7717/peerj.13142", "10.7717/peerj.13142", "2022 two-building field study found a large reduction in collisions after exterior markers were installed at one building. The comparison involved specific buildings and products, and a separately monitored UV-glass building does not establish equal effectiveness of all products.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	windowsOutside: researchSource("Window films increase avoidance of collisions by birds but only when applied to external compared with internal surfaces of windows", "PeerJ", 2023, "https://doi.org/10.7717/peerj.14676", "10.7717/peerj.14676", "2023 controlled zebra-finch flight trials compared the same films inside and outside double glazing. Exterior placement improved avoidance, while interior placement did not. One product's evidence was marginal; avoidance in an aviary is not a directly observed wild-bird mortality reduction.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	windowsMarkers: researchSource("Window markers reduce bird–window collisions in a real-world application", "Ornithological Applications", 2026, "https://doi.org/10.1093/ornithapp/duag047", "10.1093/ornithapp/duag047", "2026 before-after control-impact study found descriptively fewer collisions on treated facades, but the formal treatment-by-period interaction was not significant. Low treated-site replication limits precision.", "landmark_study", "context", novemberEcologyConservationResearchCheckedAt),
	whaleSpeedRisk: researchSource("Vessel speed restrictions reduce risk of collision‐related mortality for North Atlantic right whales", "Ecosphere", 2013, "https://doi.org/10.1890/es13-00004.1", "10.1890/es13-00004.1", "2013 right-whale assessment combined strike records, vessel speeds and risk models. Estimated mortality-risk reductions were modeled, not counts of observed deaths prevented. Its description of the historical rule is not current legal guidance.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	whaleHighRisk: researchSource("Estimating effectiveness of speed reduction measures for decreasing whale-strike mortality in a high-risk region", "Endangered Species Research", 2020, "https://doi.org/10.3354/esr01056", "10.3354/esr01056", "2020 San Francisco-region study combined whale density and vessel tracking with a ship-strike model. Estimated benefits depended on observed adherence and hypothetical stronger compliance. The abstract's reductions are predictions, not directly counted whale deaths avoided.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	whaleSizeSpeed: researchSource("The effects of vessel speed and size on the lethality of strikes of large whales in U.S. waters", "Frontiers in Marine Science", 2025, "https://doi.org/10.3389/fmars.2024.1467387", "10.3389/fmars.2024.1467387", "2025 model based on documented U.S. whale-vessel interactions found lower strike lethality at lower speeds, with important differences by vessel size and whale taxon. Very large ships retained substantial lethality even at low speeds.", "landmark_study", "context", novemberEcologyConservationResearchCheckedAt),
	fishReview: researchSource("A Review of Catch-and-Release Angling Mortality with Implications for No-take Reserves", "Reviews in Fish Biology and Fisheries", 2005, "https://doi.org/10.1007/s11160-005-2175-1", "10.1007/s11160-005-2175-1", "2005 review combined heterogeneous catch-and-release mortality estimates, with wide variation across species and circumstances. Its historical pooled mean and median are not universal current mortality rates or probabilities for an individual fish.", "meta_analysis", "supports", novemberEcologyConservationResearchCheckedAt),
	fishTemperature: researchSource("The role of temperature in the capture and release of fish", "Fish and Fisheries", 2013, "https://doi.org/10.1111/j.1467-2979.2011.00441.x", "10.1111/j.1467-2979.2011.00441.x", "2013 review of 83 studies found that warmer conditions often worsened capture stress or mortality. Studies concentrated on North American freshwater fish, and many lacked a biological temperature context. No single water-temperature cutoff follows from the review.", "systematic_review", "context", novemberEcologyConservationResearchCheckedAt),
	fishDelayed: researchSource("Influence of gear type, release method, and injury on immediate and delayed mortality of Chinook salmon (Oncorhynchus tshawytscha) captured and released from a marine recreational fishery", "Fisheries Research", 2026, "https://doi.org/10.1016/j.fishres.2025.107637", "10.1016/j.fishres.2025.107637", "2026 Chinook-salmon study observed immediate and delayed deaths during ten-day holding after marine recreational capture. Injury and transfer conditions mattered. Holding and extra handling limit transfer to unconfined wild fish and other species.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	oysterMeta: researchSource("The shoreline protection potential of oyster reefs: a systematic review and meta-analysis", "Nature-Based Solutions", 2026, "https://doi.org/10.1016/j.nbsj.2026.100304", "10.1016/j.nbsj.2026.100304", "2026 global systematic review and meta-analysis found generally positive shoreline-protection outcomes with substantial uncertainty. Effects differed by reef type, tidal setting and outcome.", "meta_analysis", "supports", novemberEcologyConservationResearchCheckedAt),
	oysterInundation: researchSource("Large‐scale variation in wave attenuation of oyster reef living shorelines and the influence of inundation duration", "Ecological Applications", 2021, "https://doi.org/10.1002/eap.2382", "10.1002/eap.2382", "2021 Atlantic and Gulf coast comparison identified a trade-off between wave attenuation and conditions suitable for persistent oysters. Some reefs in oyster-suitable inundation settings attenuated waves little more than controls. Wave height and energy are different quantities.", "landmark_study", "debate", novemberEcologyConservationResearchCheckedAt),
	oysterLiving: researchSource("Restored oyster reefs function as living shorelines to reduce wave energy in intertidal marshes", "Ecological Engineering", 2025, "https://doi.org/10.1016/j.ecoleng.2025.107774", "10.1016/j.ecoleng.2025.107774", "2025 two-reef Savannah River study measured lower wave energy than nearby controls while tracking reef condition. The small number of sites limits generalization, and wave attenuation is not the same as proven long-term erosion or hurricane protection.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	seagrassGlobal: {
		...researchSource("Global analysis of seagrass restoration: the importance of large‐scale planting", "Journal of Applied Ecology", 2016, "https://doi.org/10.1111/1365-2664.12562", "10.1111/1365-2664.12562", "2016 worldwide analysis of 1,786 restoration trials found frequent failures and associations between larger starting scale and better outcomes. The 2019 corrigendum corrects the data-accessibility DOI. Its historical survival estimate is not a universal current project probability, and scale was not randomized.", "meta_analysis", "context", novemberEcologyConservationResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1111/1365-2664.12562",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2F1365-2664.12562&rows=100",
			"https://doi.org/10.1111/1365-2664.13428"
		]
	},
	seagrassRecovery: researchSource("Restoration of seagrass habitat leads to rapid recovery of coastal ecosystem services", "Science Advances", 2020, "https://doi.org/10.1126/sciadv.abc6434", "10.1126/sciadv.abc6434", "2020 report describes a large Virginia coastal-lagoon restoration begun in 1999, with recovered habitat and ecosystem functions. This is a particular long-running success, not evidence that every coast or seagrass species can recover quickly.", "landmark_study", "supports", novemberEcologyConservationResearchCheckedAt),
	seagrassReview: researchSource("Unlocking seagrass recovery: a global review for scalable and successful Zostera restoration", "Journal of Environmental Management", 2026, "https://doi.org/10.1016/j.jenvman.2026.130094", "10.1016/j.jenvman.2026.130094", "2026 global review of 119 Zostera studies found uneven success, limited scale and major taxonomic biases. Most studied Z. marina, while fewer than half of the genus's species had been targeted. This is not evidence for all seagrasses or an independent new set of field trials.", "systematic_review", "context", novemberEcologyConservationResearchCheckedAt),
	beeReview: researchSource("Do managed bees have negative effects on wild bees?: A systematic review of the literature", "PLOS ONE", 2017, "https://doi.org/10.1371/journal.pone.0189268", "10.1371/journal.pone.0189268", "2017 review of managed-bee effects found mixed competition results and limited direct population-level evidence. Many studies measured potential impacts rather than wild-bee survival or population change. Managed honey bees and bumble bees, and native versus introduced ranges, are distinct contexts.", "systematic_review", "context", novemberEcologyConservationResearchCheckedAt),
	beeMontreal: researchSource("Decline in wild bee species richness associated with honey bee ( Apis mellifera L.) abundance in an urban ecosystem", "PeerJ", 2023, "https://doi.org/10.7717/peerj.14699", "10.7717/peerj.14699", "2023 Montreal study linked higher honeybee abundance with lower wild-bee richness and pollen availability, comparing sites across a period of expanding beekeeping. Observational associations do not prove that every hive causes local declines; small wild bees appeared particularly affected.", "landmark_study", "debate", novemberEcologyConservationResearchCheckedAt),
	beeMetrics: researchSource("Assessing the impacts of urban beehives on wild bees using individual, community, and population-level metrics", "Urban Ecosystems", 2023, "https://doi.org/10.1007/s11252-023-01374-4", "10.1007/s11252-023-01374-4", "2023 Toronto-region field study associated honeybee abundance with lower wild-bee richness and functional diversity, but only some species-level measures changed. It did not establish universal harms or randomize hive placement.", "landmark_study", "debate", novemberEcologyConservationResearchCheckedAt)
};

export const novemberEcologyConservationClaims = [
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-wildlife-crossings-reduce-roadkill",
		title: "Do wildlife crossings reduce roadkill?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "They can, especially when effective fencing guides animals to suitable crossings. A bridge or tunnel on its own has much less certain benefits.",
		stableCore: [
			"Studies find lower roadkill with well-designed fencing and crossing systems.",
			"Animals using a passage does not prove that fewer animals are dying on the road.",
			"Benefits depend on the species, location and quality of the whole system."
		],
		openQuestions: [
			"Which designs best protect smaller animals and poorly studied species?",
			"How well do reductions persist as fences age and traffic changes?"
		],
		whatWouldChangeMinds: [
			"More before-and-after studies with comparable untreated road segments.",
			"Long-term evidence connecting fewer deaths with healthier wildlife populations."
		],
		misconceptions: [
			"More camera records in an underpass necessarily mean fewer road deaths."
		],
		editorSummary: "Fencing and crossing design matter more than passage use alone.",
		population: "Wildlife exposed to roads, with stronger mortality evidence for large mammals than for many smaller species.",
		scope: "Assess roadkill reduction from road-specific crossings and fencing, separately from movement through general habitat corridors.",
		excludedEvidence: [
			"Passage counts alone do not establish a mortality or population benefit.",
			"Higher deaths at selected mitigation sites do not by themselves show that the structures caused those deaths."
		],
		uncertainty: "Many studies lack a suitable baseline; species and design differences limit a single effectiveness estimate.",
		sources: [sources.crossingsMeta, sources.crossingsMovement, sources.crossingsNegative]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-native-garden-plants-support-more-wildlife",
		title: "Do native garden plants support more wildlife?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Usually, compared with gardens dominated by nonnative ornamentals. Native plants often support more insects and the animals that depend on them, though the benefit varies by place and plant.",
		stableCore: [
			"Urban studies generally find more animal abundance or diversity around native plants.",
			"Insects that feed on plants can be an important food source for birds.",
			"Plant origin is one influence alongside flowers, structure, surrounding habitat and maintenance."
		],
		openQuestions: [
			"Which local plant mixtures best support less common wildlife?",
			"How much do better feeding opportunities translate into lasting population gains?"
		],
		whatWouldChangeMinds: [
			"Longer controlled comparisons across climates and garden types.",
			"Studies that measure survival and reproduction alongside visits and species counts."
		],
		misconceptions: [
			"Every native plant supports more wildlife than every nonnative plant.",
			"One study's native-plant percentage is a universal garden threshold."
		],
		editorSummary: "Local food webs matter alongside the number of flowers or visiting animals.",
		population: "Urban and suburban gardens and green spaces, including North American yard studies and a wider urban-horticulture review.",
		scope: "Compare wildlife responses to native and nonnative urban planting, distinguishing visits and food supply from population growth.",
		excludedEvidence: [
			"Do not transfer a Carolina chickadee threshold to all birds or gardens.",
			"Floral visits and observational yard comparisons are not randomized tests of long-term population recovery."
		],
		uncertainty: "Evidence varies across taxa and regions, and many garden comparisons cannot fully separate planting from other site differences.",
		sources: [sources.nativeReview, sources.nativeChickadee, sources.nativeVisits]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-mowing-less-help-pollinators",
		title: "Does mowing less help pollinators?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It often leaves more food and habitat, but more visiting bees does not always mean a more diverse or healthier pollinator community. Timing and the surrounding habitat matter.",
		stableCore: [
			"Intensive mowing generally reduces plant and invertebrate diversity in the studied lawns.",
			"Different mowing schedules can favor different pollinators.",
			"A temporary crowd of insects in an unmown strip does not prove lasting recovery."
		],
		openQuestions: [
			"Which mowing patterns sustain rarer wild bees over several seasons?",
			"How do local climate, flowers and nearby unmown areas change the result?"
		],
		whatWouldChangeMinds: [
			"Replicated experiments tracking species and reproduction rather than visits alone.",
			"Comparisons that separate mowing height, timing and frequency."
		],
		misconceptions: [
			"The schedule with the most bees must also have the greatest diversity.",
			"Leaving a small refuge provides the same habitat as keeping the whole area unmown."
		],
		editorSummary: "Abundance, diversity and lasting habitat value can respond differently.",
		population: "Urban lawns in mainly North America and Europe, with separate field evidence from dike grasslands.",
		scope: "Assess how mowing intensity changes floral resources and pollinator communities, without prescribing a universal mowing interval.",
		excludedEvidence: [
			"The Massachusetts yard experiment's abundance result does not establish a universal best schedule.",
			"Short-term concentration in dike refuges is not direct evidence of sustained lawn-pollinator population growth."
		],
		uncertainty: "Studies mix mowing frequency and height, and short observations can miss later losses or differences among pollinator groups.",
		sources: [sources.mowingMeta, sources.mowingExperiment, sources.mowingUnequal]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "does-rewetting-peatland-help-the-climate",
		title: "Does rewetting peatland help the climate?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Often, especially on land drained for agriculture, but the climate balance depends on the peatland and timeframe. Rising methane emissions and changes to trees can offset some of the benefit.",
		stableCore: [
			"Drainage exposes peat to air and can release stored carbon.",
			"Raising water levels can reduce those carbon losses while increasing methane emissions.",
			"Tropical peat, agricultural peat and forested boreal peat can have different climate outcomes."
		],
		openQuestions: [
			"How quickly do individual restored sites produce a net cooling benefit?",
			"How do tree survival, future land use and methane changes affect that balance?"
		],
		whatWouldChangeMinds: [
			"Long-term gas measurements paired with realistic land-use comparisons.",
			"Models tested against field data that include soils, trees, wood products and surface reflectivity."
		],
		misconceptions: [
			"Restoring ecological conditions guarantees immediate climate cooling.",
			"A result for forestry-drained northern peatland applies to drained tropical or agricultural peat."
		],
		editorSummary: "The comparison land use and the time horizon determine the climate balance.",
		population: "Managed tropical, temperate and boreal peatlands, with field evidence from the UK and Ireland and modeled forest scenarios in Northern Europe.",
		scope: "Compare the climate effects of rewetting drained peatlands with their alternative land uses, separately from biodiversity and flood-management benefits.",
		excludedEvidence: [
			"A 100-year carbon-equivalent metric is not the same as the actual warming path over the next few decades.",
			"Boreal forest model results do not establish a uniform effect for all peatland restoration."
		],
		uncertainty: "Methane, tree-carbon changes and assumptions about continued land use can alter both the sign and timing of modeled benefits.",
		sources: [sources.peatWaterTable, sources.peatTypes, sources.peatForest]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-nighttime-lighting-harm-wild-insects",
		title: "Does nighttime lighting harm wild insects?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, it can. Artificial light can disrupt insect behavior, reduce some local populations and interfere with pollination. The effect depends on the insects and the lighting.",
		stableCore: [
			"Field studies show effects beyond insects simply gathering around lamps.",
			"Lighting can change feeding, daily activity and flower visits.",
			"Light color, intensity and exposure do not affect every species in the same way."
		],
		openQuestions: [
			"How much does lighting contribute to population declines alongside habitat loss and other pressures?",
			"Which changes protect local species while meeting genuine lighting needs?"
		],
		whatWouldChangeMinds: [
			"Long-term field comparisons linking altered lighting to population recovery.",
			"Experiments that track whole communities and separate light spectrum from brightness."
		],
		misconceptions: [
			"Warm-colored light is harmless to all insects.",
			"One local pollination result measures global crop losses or the share of all insect decline caused by lighting."
		],
		editorSummary: "Species and exposure matter; a single harmless color or brightness has not been established.",
		population: "Wild insects and plant-pollinator communities in the studied field settings, with a broader cross-organism synthesis of lighting responses.",
		scope: "Assess ecological effects of artificial night lighting on wild insects and pollination, keeping local abundance, behavior and global trends distinct.",
		excludedEvidence: [
			"A focal plant's fruit set is not an estimate of total agricultural yield loss.",
			"Physiological effects across several animal groups do not directly measure worldwide insect population change."
		],
		uncertainty: "Responses differ among species and settings; the global share of insect decline attributable to lighting remains uncertain.",
		sources: [sources.lightPollination, sources.lightCaterpillars, sources.lightSpectrum]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "can-window-treatments-reduce-bird-collisions",
		title: "Can window treatments reduce bird collisions?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, suitable visible treatments can reduce collisions. Results depend on the product, coverage and placement, and some field estimates remain uncertain.",
		stableCore: [
			"Treated glass can be easier for birds to detect as an obstacle.",
			"Studies of tested films found better avoidance with exterior placement than with interior placement.",
			"Evidence for a particular treatment does not establish equal performance for all decals or glass."
		],
		openQuestions: [
			"How well do different treatments work across bird species and building types?",
			"How durable are collision reductions after products weather or lighting changes?"
		],
		whatWouldChangeMinds: [
			"Larger replicated field comparisons with untreated buildings.",
			"Monitoring that accounts for missed carcasses and separates daytime glass strikes from other hazards."
		],
		misconceptions: [
			"A lower collision count in one small study is automatically a conclusive treatment effect.",
			"An interior film works as well as the same product on the outer glass."
		],
		editorSummary: "Placement matters, and field collision counts need adequate controls.",
		population: "Birds at studied North American buildings, with complementary controlled flight trials in zebra finches.",
		scope: "Assess glass treatments intended to prevent bird-window collisions, distinguishing controlled avoidance tests from real-world mortality outcomes.",
		excludedEvidence: [
			"Controlled flight avoidance is not a directly observed reduction in wild-bird deaths.",
			"The 2026 study's descriptive reduction must be read alongside its nonsignificant formal treatment comparison."
		],
		uncertainty: "Field replication is limited, products differ, and treatment effectiveness cannot be inferred from appearance alone.",
		sources: [sources.windowsField, sources.windowsOutside, sources.windowsMarkers]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-slowing-ships-reduce-whale-strike-risk",
		title: "Does slowing ships reduce whale-strike risk?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, lower speeds can reduce the risk of fatal whale strikes. The benefit depends on ship size, whale behavior, where ships travel and how well restrictions are followed.",
		stableCore: [
			"Strike records and models link vessel speed to collision risk and injury severity.",
			"Lower speed does not make every collision survivable, especially with very large ships.",
			"A modeled number of deaths avoided differs from a count of observed deaths prevented."
		],
		openQuestions: [
			"Which combinations of routing and speed measures best protect particular whale populations?",
			"How much do unreported collisions and changing whale distributions alter risk estimates?"
		],
		whatWouldChangeMinds: [
			"Better independent observations of encounters and fatal strikes.",
			"Evaluations that measure actual vessel compliance and changing whale presence."
		],
		misconceptions: [
			"Every ship traveling slowly poses the same low risk.",
			"A model's predicted avoided deaths are directly observed rescue outcomes."
		],
		editorSummary: "Ship size and actual compliance shape the benefit of slower travel.",
		population: "Large whales and vessel traffic studied mainly in U.S. Atlantic and Pacific waters.",
		scope: "Assess speed-related whale-strike risk using observed interactions and explicit risk models, rather than interpreting historical rules as current legal advice.",
		excludedEvidence: [
			"Hypothetical high compliance is not evidence of actual mariner behavior.",
			"Risk estimates for right, blue or humpback whales cannot be transferred unchanged to every species and shipping region."
		],
		uncertainty: "Rare and unreported strikes limit direct mortality estimates; models depend on whale locations, vessel data and assumptions about encounters.",
		sources: [sources.whaleSpeedRisk, sources.whaleHighRisk, sources.whaleSizeSpeed]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-fish-survive-catch-and-release-fishing",
		title: "Do fish survive catch-and-release fishing?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Many do, but release does not guarantee survival. Some fish die immediately or days later, and the risk varies widely by species, injury and water conditions.",
		stableCore: [
			"Research documents deaths after release as well as at the time of capture.",
			"Injury, capture conditions and temperature can affect survival.",
			"A fish swimming away is not proof that it survives the following days."
		],
		openQuestions: [
			"How much mortality is missed after fish return to the wild?",
			"How do repeated capture and warming water change population-level impacts?"
		],
		whatWouldChangeMinds: [
			"Longer follow-up with suitable uncaptured comparison groups.",
			"Species-specific studies that distinguish capture effects from holding and transfer effects."
		],
		misconceptions: [
			"All released fish survive because they were not kept.",
			"One pooled mortality percentage or temperature threshold applies to all fisheries."
		],
		editorSummary: "Immediate release and longer-term survival are different outcomes.",
		population: "Recreationally caught freshwater and marine fish, with uneven species coverage and a recent controlled Chinook-salmon study.",
		scope: "Assess immediate and delayed mortality after recreational catch and release, without turning pooled research into a universal survival rate.",
		excludedEvidence: [
			"Historical pooled mean or median mortality is not a current personal probability for a given catch.",
			"Additional transfer and tank holding in the Chinook study limit inference about fish released directly to the wild."
		],
		uncertainty: "Mortality estimates depend on species, context and observation length, and post-release deaths can be difficult to detect.",
		sources: [sources.fishReview, sources.fishTemperature, sources.fishDelayed]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "can-oyster-reefs-protect-shorelines-from-erosion",
		title: "Can oyster reefs protect shorelines from erosion?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They can help in suitable places, but protection varies substantially. A reef that supports oysters does not automatically provide strong protection from waves or shoreline loss.",
		stableCore: [
			"Some restored reefs reduce incoming wave energy and support shoreline habitat.",
			"Tides, reef height and wave conditions affect performance.",
			"Lower wave energy does not by itself prove lasting erosion or storm protection."
		],
		openQuestions: [
			"Which sites can sustain living oysters while providing effective coastal protection?",
			"How well do benefits last through sea-level rise and major storms?"
		],
		whatWouldChangeMinds: [
			"Long-term comparisons measuring shoreline change as well as waves and reef survival.",
			"Replicated projects that test ecological and engineering goals together."
		],
		misconceptions: [
			"Every healthy oyster reef works like a seawall.",
			"A reduction in wave height is the same percentage reduction in wave energy or flood damage."
		],
		editorSummary: "Habitat success and coastal-protection success need separate measurements.",
		population: "Natural and constructed oyster reefs in coastal settings, including Atlantic and Gulf U.S. field comparisons.",
		scope: "Assess oyster reefs as shoreline-protection measures, separating wave attenuation, sediment change, erosion and sustained oyster habitat.",
		excludedEvidence: [
			"A small Georgia wave-energy study does not establish protection from hurricanes or long-term property loss.",
			"The tidal conditions that produce strong attenuation may not be those that sustain the oysters."
		],
		uncertainty: "Site and design differences are large, and direct long-term erosion outcomes are less established than short-term wave measurements.",
		sources: [sources.oysterMeta, sources.oysterInundation, sources.oysterLiving]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "can-seagrass-restoration-rebuild-lost-meadows",
		title: "Can seagrass restoration rebuild lost meadows?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Yes, successful projects have rebuilt substantial meadows and habitat, but many attempts fail. Suitable water conditions and sustained recovery matter as much as planting.",
		stableCore: [
			"Restored meadows can recover habitat and some ecosystem functions.",
			"Poor water quality and other continuing pressures can prevent recovery.",
			"Results from one well-studied species or successful coast do not establish equal success elsewhere."
		],
		openQuestions: [
			"How can success extend to more species and less-studied coasts?",
			"How long do habitat and carbon-storage gains persist under warming and changing water quality?"
		],
		whatWouldChangeMinds: [
			"Long-term monitoring that includes failed projects and unplanted comparisons.",
			"Wider evidence on sustained functions rather than initial plant survival alone."
		],
		misconceptions: [
			"A historical pooled survival estimate predicts the outcome of every new project.",
			"A large successful restoration means planting can replace protection of existing meadows."
		],
		editorSummary: "Lasting recovery requires removing pressures as well as establishing plants.",
		population: "Seagrass restoration projects worldwide, with especially strong representation of eelgrass and a long-running Virginia lagoon project.",
		scope: "Assess restoration of lost seagrass habitat and functions, distinguishing early planting survival from persistent meadow recovery.",
		excludedEvidence: [
			"A relationship between project scale and success does not prove that simply enlarging any project will work.",
			"Zostera-focused reviews and selected successful projects do not represent all seagrass species or all attempted restorations."
		],
		uncertainty: "Published studies favor a few species and methods, while failures, long-term persistence and full ecosystem functions are unevenly documented.",
		sources: [sources.seagrassGlobal, sources.seagrassRecovery, sources.seagrassReview]
	}, novemberEcologyConservationResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-urban-beekeeping-help-wild-bees",
		title: "Does urban beekeeping help wild bees?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Adding honeybee hives has not been shown to restore wild-bee populations. In some cities, more honeybees are associated with fewer kinds of wild bees, possibly because they compete for flowers.",
		stableCore: [
			"Managed honeybees and wild bees are different conservation targets.",
			"Some urban studies link abundant honeybees with lower wild-bee richness or diversity.",
			"Effects vary with floral resources, place and the wild-bee species being measured."
		],
		openQuestions: [
			"When does competition translate into fewer surviving or reproducing wild bees?",
			"How do hive density and local flower supply interact over several years?"
		],
		whatWouldChangeMinds: [
			"Long-term controlled studies of hive changes and wild-bee population outcomes.",
			"Comparisons that account for surrounding habitat and resources, not just visitor counts."
		],
		misconceptions: [
			"More managed honeybees necessarily mean better conservation of wild bees.",
			"An association with lower richness proves that every urban hive causes a local decline."
		],
		editorSummary: "Honey production, flower visits and wild-bee conservation are different outcomes.",
		population: "Managed-bee and wild-bee communities, with urban observational evidence from Montreal and the Greater Toronto Area.",
		scope: "Assess urban honeybee keeping as a wild-bee conservation measure, keeping resource competition and long-term population outcomes distinct.",
		excludedEvidence: [
			"Crop-pollination benefits from managed bees do not establish a conservation benefit for wild bees.",
			"Associations in two Canadian urban settings do not prove universal harm from all hives."
		],
		uncertainty: "Most urban evidence is observational, and direct long-term population effects remain less clear than associations with local diversity.",
		sources: [sources.beeReview, sources.beeMontreal, sources.beeMetrics]
	}, novemberEcologyConservationResearchCheckedAt)
];
