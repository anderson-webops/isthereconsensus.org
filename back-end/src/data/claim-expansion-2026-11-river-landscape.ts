import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberRiverLandscapeResearchCheckedAt = "2026-11-07T11:52:51.000Z";

const sources = {
	beaverMulti: researchSource("Beaver dams attenuate flow: A multi‐site study", "Hydrological Processes", 2021, "https://doi.org/10.1002/hyp.14017", "10.1002/hyp.14017", "2021 monitoring of four English catchments found lower storm peaks and slower responses after beaver activity, with differences by site and season. Storm events are repeated measurements within sites, not independent landscapes. Results from the largest monitored storms do not establish protection against every extreme flood.", "landmark_study", "supports", novemberRiverLandscapeResearchCheckedAt),
	beaverDynamics: researchSource("Exploring the dynamics of flow attenuation at a beaver dam sequence", "Hydrological Processes", 2022, "https://doi.org/10.1002/hyp.14735", "10.1002/hyp.14735", "2022 before-after control-impact analysis compared an English beaver-dam sequence with a control catchment. It found attenuation across studied events but could not confidently detect the effect at the most extreme rainfall tail. Related publications can share catchments and monitoring periods.", "landmark_study", "context", novemberRiverLandscapeResearchCheckedAt),
	beaverFiveYear: researchSource("Whole System Ecohydrological Change Following Natural Flood Management and a Five‐Year Beaver Reintroduction Trial", "Ecohydrology", 2026, "https://doi.org/10.1002/eco.70238", "10.1002/eco.70238", "2026 five-year North Yorkshire study tracked a beaver enclosure alongside existing natural flood-management structures. Flow became less flashy, but this is a specific monitored system with other infrastructure, not a randomized landscape-wide test or a measurement of avoided property damage.", "landmark_study", "supports", novemberRiverLandscapeResearchCheckedAt),
	damGlobal: researchSource("Global consequences of dam‐induced river fragmentation on diadromous migrants: a systematic review and meta‐analysis", "Biological Reviews", 2025, "https://doi.org/10.1111/brv.70032", "10.1111/brv.70032", "2025 systematic review and meta-analysis examined dam fragmentation, fish passes and removal for migratory animals moving between rivers and coastal waters. Removal improved fish connectivity in the included studies. Taxonomic and tropical-region gaps, and different outcomes across interventions, limit universal claims.", "meta_analysis", "supports", novemberRiverLandscapeResearchCheckedAt),
	damElwha: researchSource("Reconnecting the Elwha River: Spatial Patterns of Fish Response to Dam Removal", "Frontiers in Ecology and Evolution", 2021, "https://doi.org/10.3389/fevo.2021.765488", "10.3389/fevo.2021.765488", "2021 Elwha study compared fish distribution and density before and after two dam removals. Migratory fish reached formerly blocked areas. Access, seasonal runs, species counts and self-sustaining population recovery are different measures; the observations do not show complete recovery for every population.", "landmark_study", "supports", novemberRiverLandscapeResearchCheckedAt),
	damPenobscot: researchSource("Fish Assemblages in the Penobscot River: A Decade after Dam Removal", "Marine and Coastal Fisheries", 2023, "https://doi.org/10.1002/mcf2.10227", "10.1002/mcf2.10227", "2023 Penobscot follow-up found more riverine and migratory fish in formerly impounded reaches. The wider project combined dam removal with passage improvements elsewhere, and remaining barriers continued to shape distributions. These outcomes cannot all be attributed to one removed structure.", "landmark_study", "context", novemberRiverLandscapeResearchCheckedAt),
	reefEstuaries: researchSource("Artificial reefs increase fish abundance in habitat‐limited estuaries", "Journal of Applied Ecology", 2020, "https://doi.org/10.1111/1365-2664.13666", "10.1111/1365-2664.13666", "2020 replicated before-and-after study in three habitat-limited estuaries found more fish after artificial reefs were installed, without evidence that nearby natural reefs lost fish. This supports a production interpretation in those settings, rather than proving a net gain for every reef design or region.", "landmark_study", "supports", novemberRiverLandscapeResearchCheckedAt),
	reefMeta: researchSource("Meta-Analysis Reveals Artificial Reefs Can Be Effective Tools for Fish Community Enhancement but Are Not One-Size-Fits-All", "Frontiers in Marine Science", 2020, "https://doi.org/10.3389/fmars.2020.00282", "10.3389/fmars.2020.00282", "2020 synthesis of 39 studies compared fish-community metrics on artificial and natural reference reefs. Comparable local density, biomass or richness does not itself demonstrate extra regional production. Location, reef materials and reference habitat changed the comparisons.", "meta_analysis", "context", novemberRiverLandscapeResearchCheckedAt),
	reefProductionReview: {
		...researchSource("Do Artificial Reefs Increase Regional Fish Production? A Review of Existing Data", "Fisheries", 1997, "https://doi.org/10.1577/1548-8446(1997)022%3C0017:darirf%3E2.0.co;2", "10.1577/1548-8446(1997)022<0017:darirf>2.0.co;2", "1997 narrative review framed the attraction-versus-production problem and possible fishing-concentration risks. It is historical context, not a current estimate of reef effectiveness. Later studies can address some of its evidence gaps; fish gathered in one place are not automatically additional fish produced.", "technical_reference", "context", novemberRiverLandscapeResearchCheckedAt),
		citationStatus: "current" as const,
		statusSources: [
			"https://doi.org/10.1577/1548-8446(1997)022%3C0017:darirf%3E2.0.co;2",
			"https://api.crossref.org/works?filter=updates%3A10.1577%2F1548-8446(1997)022%3C0017%3Adarirf%3E2.0.co%3B2&rows=100"
		]
	},
	hedgeGlobal: researchSource("Contributions of Hedgerows to People: A Global Meta-Analysis", "Frontiers in Conservation Science", 2021, "https://doi.org/10.3389/fcosc.2021.789612", "10.3389/fcosc.2021.789612", "2021 global synthesis used 835 observations from 170 primary studies. Farmland with hedgerows generally supported more biodiversity than farmland without them, but comparisons with natural habitats and ecosystem-service outcomes differed. Observations are not independent study counts, and hedges do not replace every natural habitat.", "meta_analysis", "supports", novemberRiverLandscapeResearchCheckedAt),
	hedgeStructural: researchSource("Hedgerow structural diversity is key to promoting biodiversity and ecosystem services: A systematic review of Central European studies", "Basic and Applied Ecology", 2024, "https://doi.org/10.1016/j.baae.2024.04.010", "10.1016/j.baae.2024.04.010", "2024 review retained 89 Central European and UK studies on hedgerow structure and animal groups. Structural diversity and layering were positively associated with several outcomes, but taxa were unevenly studied and many findings were correlations rather than controlled management experiments.", "systematic_review", "supports", novemberRiverLandscapeResearchCheckedAt),
	hedgeBirds: researchSource("Local and regional‐scale effects of hedgerows on grassland‐ and forest‐associated bird populations within agroecosystems", "Ecological Applications", 2024, "https://doi.org/10.1002/eap.2959", "10.1002/eap.2959", "2024 eastern Ontario field study linked linear woody features with higher abundance for many birds, alongside negative associations for some open-grassland and intact-forest specialists. Modeled regional abundance and local observations are distinct, and the same hedge configuration does not benefit every species.", "landmark_study", "context", novemberRiverLandscapeResearchCheckedAt),
	rewildResilience: researchSource("Quantifying the impacts of rewilding on ecosystem resilience to disturbances: A global meta-analysis", "Journal of Environmental Management", 2025, "https://doi.org/10.1016/j.jenvman.2025.124360", "10.1016/j.jenvman.2025.124360", "2025 synthesis considered 42 case studies and 305 observations of resilience to disturbance. Many responses were positive, but disturbance type and outcome mattered. An observation percentage is neither the share of independent projects succeeding nor expert agreement; resilience and biodiversity are not interchangeable.", "meta_analysis", "context", novemberRiverLandscapeResearchCheckedAt),
	rewildTradeoffs: researchSource("Trade-offs between passive and trophic rewilding for biodiversity and ecosystem functioning", "Biological Conservation", 2023, "https://doi.org/10.1016/j.biocon.2023.110005", "10.1016/j.biocon.2023.110005", "2023 nine-year English exclosure comparison found lower woody-plant diversity and carbon storage with large herbivores than with passive succession, but more ground-dwelling arthropod diversity and biomass. This is a measured trade-off on former farmland, not proof that one rewilding approach maximizes every outcome.", "landmark_study", "supports", novemberRiverLandscapeResearchCheckedAt),
	rewildEurope: researchSource("A scoping review of the scientific evidence base for rewilding in Europe", "Biological Conservation", 2023, "https://doi.org/10.1016/j.biocon.2023.110243", "10.1016/j.biocon.2023.110243", "2023 scoping review mapped measured outcomes of European rewilding projects, with geographical concentration in the Netherlands and Scandinavia. It describes growing evidence and important limits; it is not an independent new field trial or a pooled universal biodiversity effect.", "technical_reference", "context", novemberRiverLandscapeResearchCheckedAt),
	bufferGlobal: researchSource("Key controls on nutrient retention efficiency in vegetated buffer strips: A global meta-analysis", "Ecological Indicators", 2025, "https://doi.org/10.1016/j.ecolind.2025.114373", "10.1016/j.ecolind.2025.114373", "2025 synthesis of 409 observations from 91 publications found that climate, inflow, soil, slope and buffer design affected nutrient retention. Wetter conditions could improve nitrogen retention while reducing runoff retention. Associations and fitted models do not establish one reliable removal percentage or design for every watershed.", "meta_analysis", "supports", novemberRiverLandscapeResearchCheckedAt),
	bufferPhosphorus: researchSource("Efficacy of Riparian Buffers in Phosphorus Removal: A Meta-Analysis", "Frontiers in Water", 2022, "https://doi.org/10.3389/frwa.2022.882560", "10.3389/frwa.2022.882560", "2022 synthesis of 36 articles found average phosphorus retention around half, with substantial variation. Its two statistical approaches analyze the same evidence rather than independent experiments. Saturated soil, snowmelt and interactions among soil, slope and width limited performance; pooled results are not a prediction for an individual farm.", "meta_analysis", "supports", novemberRiverLandscapeResearchCheckedAt),
	bufferField: researchSource("Impacts of different vegetation in riparian buffer strips on runoff and sediment loss", "Hydrological Processes", 2022, "https://doi.org/10.1002/hyp.14733", "10.1002/hyp.14733", "2022 replicated plot study compared three vegetation treatments during 15 storms across three years. All reduced runoff and sediment relative to controls, with different responses by vegetation. This describes establishment-phase performance at one experimental facility, not mature buffers across entire river catchments.", "landmark_study", "context", novemberRiverLandscapeResearchCheckedAt),
	invasiveReview: researchSource("Ecological restoration after management of invasive alien plants", "Ecological Engineering", 2023, "https://doi.org/10.1016/j.ecoleng.2023.107122", "10.1016/j.ecoleng.2023.107122", "2023 systematic review distinguishes reducing invasive-plant abundance from recovering native communities. Reinvasion, persistent ecosystem changes and missing native plants can limit recovery. Its synthesis supports examining outcomes after control and the contribution of subsequent restoration, rather than assuming that removal alone restores the reference ecosystem.", "systematic_review", "context", novemberRiverLandscapeResearchCheckedAt),
	invasiveRevegetation: researchSource("Turning the tide on invasives: A global meta‐analysis of native revegetation strategies for effective restoration", "Journal of Applied Ecology", 2026, "https://doi.org/10.1111/1365-2664.70396", "10.1111/1365-2664.70396", "2026 global synthesis of 50 primary studies and 266 effect sizes compared native revegetation after invasive removal with removal-only plots. Native community measures generally improved and non-native measures declined. The comparator already received invasive removal; this is not an estimate of removal versus doing nothing or complete ecosystem recovery.", "meta_analysis", "supports", novemberRiverLandscapeResearchCheckedAt),
	invasiveLongTerm: researchSource("From invasive species stand to species-rich grassland: Long-term changes in plant species composition during Solidago invaded site restoration", "Journal of Environmental Management", 2024, "https://doi.org/10.1016/j.jenvman.2024.120216", "10.1016/j.jenvman.2024.120216", "2024 eight-year grassland study found reduced goldenrod cover and increased target plants. Seed source had a more lasting effect than initial removal-treatment differences. Diversity within plots rose while diversity across plots followed a different trajectory, showing why short-term, local richness and whole-site restoration are separate outcomes.", "landmark_study", "context", novemberRiverLandscapeResearchCheckedAt),
	coralReview: researchSource("Coral restoration – A systematic review of current methods, successes, failures and future directions", "PLOS ONE", 2020, "https://doi.org/10.1371/journal.pone.0226631", "10.1371/journal.pone.0226631", "2020 global review combined published studies, grey literature and practitioner reports. Most projects were small and many were monitored for less than 18 months. Reported survival of planted corals does not by itself establish lasting reef-wide recovery, reproduction or protection against future marine heatwaves.", "systematic_review", "context", novemberRiverLandscapeResearchCheckedAt),
	coralFunction: researchSource("Coral restoration can drive rapid reef carbonate budget recovery", "Current Biology", 2024, "https://doi.org/10.1016/j.cub.2024.02.009", "10.1016/j.cub.2024.02.009", "2024 Indonesian study found rapid gains in coral cover, structural complexity and reef carbonate budgets over four years. Restored communities differed from healthy reference reefs because branching corals were favored. Carbonate-budget recovery does not demonstrate full species recovery or established resilience to future heat stress.", "landmark_study", "supports", novemberRiverLandscapeResearchCheckedAt),
	coralLimits: {
		...researchSource("Restoration cannot be scaled up globally to save reefs from loss and degradation", "Nature Ecology & Evolution", 2025, "https://doi.org/10.1038/s41559-025-02667-x", "10.1038/s41559-025-02667-x", "2025 global spatial analysis linked restoration locations with local pressures and present or projected bleaching risk. Forecast risk is not an observed future failure rate. The May 2025 correction changes the article's licensing to open access; it does not report a scientific-result correction. Its notice is retained.", "landmark_study", "context", novemberRiverLandscapeResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1038/s41559-025-02667-x",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fs41559-025-02667-x&rows=100",
			"https://doi.org/10.1038/s41559-025-02758-9"
		]
	}
};

export const novemberRiverLandscapeClaims = [
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-beaver-dams-slow-flood-flows",
		title: "Do beaver dams slow flood flows?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "They can slow stormwater and reduce peak flows in some small streams. That can help downstream, while raising water levels locally. It does not guarantee protection from every flood.",
		stableCore: [
			"Monitored beaver wetlands can store water and delay its movement downstream.",
			"Several English catchments showed lower storm peaks after beaver activity.",
			"The effect changes with the valley, dams, season and size of the storm."
		],
		openQuestions: [
			"How well do small-stream results scale to larger river systems?",
			"What happens during rare extreme floods and when dams change or fail?"
		],
		whatWouldChangeMinds: [
			"More long-term comparisons across landscapes and genuinely extreme events.",
			"Studies that connect changed river flows with downstream damage and upstream impacts."
		],
		misconceptions: [
			"Lower flow at one monitoring station proves that all nearby property is protected from flooding."
		],
		editorSummary: "Downstream peak reduction and local inundation are different effects.",
		population: "Studied small English streams and catchments affected by Eurasian beavers, including monitored enclosures and existing flood-management works.",
		scope: "Assess stormflow timing and peak discharge around beaver-dam systems, separately from property damage and catchment-wide flood protection.",
		excludedEvidence: [
			"Repeated storms and overlapping publications are not independent landscapes.",
			"Reducing a downstream peak does not mean that water levels cannot rise locally or that extreme-flood damage is prevented."
		],
		uncertainty: "Evidence is concentrated in small monitored systems, and the rarest floods and wider downstream consequences are less certain.",
		sources: [sources.beaverMulti, sources.beaverDynamics, sources.beaverFiveYear]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-dam-removal-help-migratory-fish",
		title: "Does dam removal help migratory fish?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, removing barriers can reopen migration routes and help some fish recover. The benefit depends on the species, remaining barriers and the condition of the river.",
		stableCore: [
			"Dams can block movement between rivers and the sea.",
			"Fish have returned to previously inaccessible reaches after major removals.",
			"Reopening access does not guarantee that every population fully recovers."
		],
		openQuestions: [
			"How quickly do different populations become self-sustaining after access is restored?",
			"How do remaining dams, sediment changes and other pressures shape long-term outcomes?"
		],
		whatWouldChangeMinds: [
			"Longer controlled comparisons of survival and reproduction, alongside passage counts.",
			"More evidence from tropical rivers and less-studied migratory animals."
		],
		misconceptions: [
			"Fish entering a reopened reach means every population has recovered.",
			"Removing a dam and adding a fish pass have identical ecological effects."
		],
		editorSummary: "Restored access is an important step, with recovery depending on the wider river.",
		population: "Migratory fish studied in fragmented rivers, especially those moving between rivers and coastal waters, with Elwha and Penobscot case studies.",
		scope: "Assess fish access and recovery following dam removal, distinguishing physical reconnection from population abundance and reproductive success.",
		excludedEvidence: [
			"Seasonal runs and biological species are not interchangeable counts.",
			"A rehabilitation project with several changes cannot isolate the effect of one removed dam without a suitable comparison."
		],
		uncertainty: "Removal studies are often observational, management changes can coincide, and responses vary by species and remaining barriers.",
		sources: [sources.damGlobal, sources.damElwha, sources.damPenobscot]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-artificial-reefs-increase-fish-populations",
		title: "Do artificial reefs increase fish populations?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "They can add useful habitat and support more fish, especially where habitat is scarce. But fish gathering around a structure does not by itself show that the wider population has grown.",
		stableCore: [
			"Artificial reefs can support substantial local fish communities.",
			"Some controlled comparisons support gains beyond simply moving fish from nearby reefs.",
			"Design, location and fishing pressure can change the outcome."
		],
		openQuestions: [
			"How often do local gains become lasting increases across a whole region?",
			"When does easier fishing access offset habitat benefits?"
		],
		whatWouldChangeMinds: [
			"Long-term comparisons measuring recruitment, growth, survival and catches across the surrounding region.",
			"Replicated designs that track both new structures and nearby natural habitats."
		],
		misconceptions: [
			"A crowded artificial reef proves that all of those fish are newly produced.",
			"Similar local biomass makes an artificial reef equivalent to every natural reef."
		],
		editorSummary: "Local abundance and additional regional fish production need separate evidence.",
		population: "Coastal artificial reefs and natural reference habitats, including replicated studies in habitat-limited estuaries.",
		scope: "Assess fish-community enhancement and additional production after artificial-reef deployment, separating local attraction from wider population gains.",
		excludedEvidence: [
			"Local density or biomass is not a direct measure of net regional production.",
			"A historical review's evidence gaps do not negate later positive field results or establish that all reef projects fail."
		],
		uncertainty: "Regional production is harder to establish than local fish counts, and ecological and fishing responses vary substantially among sites.",
		sources: [sources.reefEstuaries, sources.reefMeta, sources.reefProductionReview]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-hedgerows-help-farmland-wildlife",
		title: "Do hedgerows help farmland wildlife?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Usually, compared with farmland lacking woody habitat. Well-structured hedgerows can support many animals, although some species need open ground or larger intact habitats instead.",
		stableCore: [
			"Farmland with hedgerows generally supports more biodiversity than similar farmland without them.",
			"The structure and surrounding landscape affect which species benefit.",
			"An increase in overall richness can coexist with losses for particular specialists."
		],
		openQuestions: [
			"Which landscape mixtures best support both hedge-associated and open-habitat species?",
			"How much do local habitat benefits improve long-term population trends?"
		],
		whatWouldChangeMinds: [
			"Longer comparisons that track population outcomes for both benefiting and disadvantaged species.",
			"More evidence across climates, farming systems and less-studied animal groups."
		],
		misconceptions: [
			"Adding hedges benefits every species equally.",
			"Hedgerows can replace all of the ecological functions of larger natural habitats."
		],
		editorSummary: "Overall biodiversity gains can conceal different needs among species.",
		population: "Agricultural landscapes in the global synthesis, with structural evidence concentrated in Europe and bird observations from eastern Ontario.",
		scope: "Assess animal biodiversity around farmland hedgerows, distinguishing community richness, individual species and wider population change.",
		excludedEvidence: [
			"Observational associations and modeled regional abundance are not randomized management effects.",
			"A gain in hedge-associated species does not establish a benefit for open-grassland or intact-forest specialists."
		],
		uncertainty: "Many comparisons are observational, animal groups are unevenly studied, and surrounding habitat changes the value of a hedge.",
		sources: [sources.hedgeGlobal, sources.hedgeStructural, sources.hedgeBirds]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-rewilding-improve-biodiversity",
		title: "Does rewilding improve biodiversity?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It can, but outcomes depend on what changes and which species are measured. An approach that helps one group can reduce another, and biodiversity, carbon storage and resilience may respond differently.",
		stableCore: [
			"Rewilding covers different actions, including allowing natural succession and restoring animal interactions.",
			"Studies report ecological benefits alongside trade-offs between species and functions.",
			"Success against one restoration goal does not prove equal gains for every other goal."
		],
		openQuestions: [
			"Which approaches produce lasting gains across more than one species group?",
			"How do starting habitat, disturbance and management alter outcomes over decades?"
		],
		whatWouldChangeMinds: [
			"Long-term controlled comparisons with clear starting conditions and several ecological outcomes.",
			"More measured projects from underrepresented regions, including unsuccessful results."
		],
		misconceptions: [
			"Reintroducing large herbivores improves every measure more than passive natural succession.",
			"A percentage of positive observations measures the share of experts who agree or independent projects that succeed."
		],
		editorSummary: "The intervention, starting habitat and chosen outcome determine the result.",
		population: "Studied rewilding projects, including European evidence, an English former-farmland exclosure comparison and a global resilience synthesis.",
		scope: "Assess measured biodiversity outcomes of different rewilding approaches while keeping resilience, carbon storage and social outcomes distinct.",
		excludedEvidence: [
			"Resilience to disturbance is not interchangeable with species diversity or carbon storage.",
			"Repeated observations from one project and overlapping reviews are not independent demonstrations of success."
		],
		uncertainty: "Definitions and interventions vary, evidence is geographically uneven, and different species or functions can move in opposite directions.",
		sources: [sources.rewildTradeoffs, sources.rewildEurope, sources.rewildResilience]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "do-river-buffer-strips-reduce-farm-runoff-pollution",
		title: "Do river buffer strips reduce farm runoff pollution?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Vegetated strips beside waterways can trap sediment and retain some nutrients from farm runoff. How much they catch depends on the soil, weather and water flow. Water that bypasses the strip can still carry pollution into the river.",
		stableCore: [
			"Vegetated buffers can reduce sediment and nutrient losses in agricultural runoff.",
			"Different pollutants respond differently to the same buffer.",
			"Benefits depend on how water reaches and moves through the vegetation."
		],
		openQuestions: [
			"How well do plot-scale results predict water quality across whole catchments?",
			"How do retention and possible nutrient release change as buffers age?"
		],
		whatWouldChangeMinds: [
			"Long-term catchment comparisons that track bypass flow and several pollutants.",
			"Evidence linking measured buffer retention with downstream ecological recovery."
		],
		misconceptions: [
			"A buffer's average removal rate guarantees the same result on every farm.",
			"Less sediment automatically means the same reduction in dissolved nutrients."
		],
		editorSummary: "Sediment trapping, nutrient retention and downstream river recovery are different measures.",
		population: "Agricultural vegetated and riparian buffers studied in global syntheses and an establishment-phase field experiment.",
		scope: "Assess sediment and nutrient retention from farm runoff by vegetated buffer strips, separately from whole-watershed recovery and other pollution sources.",
		excludedEvidence: [
			"Repeated observations and multiple models of one dataset are not independent trials.",
			"Plot-scale retention and modeled design associations do not guarantee downstream water quality at an individual site."
		],
		uncertainty: "Performance varies with hydrology, soil and season; whole-catchment and long-term effects are harder to establish than plot-scale retention.",
		sources: [sources.bufferGlobal, sources.bufferPhosphorus, sources.bufferField]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "does-removing-invasive-plants-restore-native-vegetation",
		title: "Does removing invasive plants restore native vegetation?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "It can help, but removal alone often leaves an incomplete recovery. Native plants may need suitable conditions and a way to return, while invasive plants can come back. Outcomes also change over years and depend on how recovery is measured.",
		stableCore: [
			"Controlling an invasive plant and restoring a native community are different outcomes.",
			"Adding native vegetation after removal can improve community measures compared with removal alone.",
			"Long-term results can differ from early changes in plant cover."
		],
		openQuestions: [
			"Which invaded habitats recover with limited intervention, and which need sustained restoration?",
			"How often do native gains persist and support wider ecological functions?"
		],
		whatWouldChangeMinds: [
			"Long-term comparisons with removal-only, restored and uninvaded reference sites.",
			"Studies tracking reinvasion and several measures of native community recovery."
		],
		misconceptions: [
			"Removing the dominant invader automatically recreates the original ecosystem.",
			"More plant species in one plot establishes full recovery across the whole landscape."
		],
		editorSummary: "Recovery needs to be measured in the returning native community as well as the removed invader.",
		population: "Invaded plant communities covered by restoration syntheses, including an eight-year grassland experiment.",
		scope: "Assess native vegetation after invasive-plant control and subsequent restoration, distinguishing removal success from lasting community recovery.",
		excludedEvidence: [
			"Revegetation versus removal-only comparisons do not estimate removal versus no management.",
			"Diversity within individual plots is distinct from diversity across plots or full recovery of ecosystem function."
		],
		uncertainty: "Habitats, invaders and restoration actions differ, reviews can share studies, and short follow-up can miss reinvasion or later changes.",
		sources: [sources.invasiveRevegetation, sources.invasiveReview, sources.invasiveLongTerm]
	}, novemberRiverLandscapeResearchCheckedAt),
	reviewedEntry({
		topicSlug: "ecology-and-conservation",
		slug: "can-coral-restoration-rebuild-damaged-reefs",
		title: "Can coral restoration rebuild damaged reefs?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Some projects can rebuild coral cover and important reef-building functions. Lasting recovery of the whole ecosystem is less certain. Restored reefs can still bleach during heatwaves, so local success does not remove the threat from ocean warming.",
		stableCore: [
			"Well-managed projects have restored coral growth and some reef functions at specific sites.",
			"Planted coral survival, reef-building activity and a recovered ecosystem are different outcomes.",
			"Warming and local pressures continue to affect restored reefs."
		],
		openQuestions: [
			"How well do restored communities reproduce, recruit new corals and withstand later heatwaves?",
			"Which benefits persist as projects expand across different reef settings?"
		],
		whatWouldChangeMinds: [
			"Long-term comparisons of restored and reference reefs through repeated heatwaves.",
			"Evidence tracking community diversity, recruitment and reef functions rather than planted survival alone."
		],
		misconceptions: [
			"A recovered carbonate budget proves that every part of a reef has recovered.",
			"A successful local project guarantees climate resilience or global scalability."
		],
		editorSummary: "Local functional gains are valuable, with durability and wider ecological recovery still uncertain.",
		population: "Reported coral-restoration projects, with a four-year Indonesian functional-recovery study and a global analysis of restoration-site pressures.",
		scope: "Assess measured coral cover and reef-function recovery after restoration, distinguishing local gains from complete biodiversity recovery and future warming resilience.",
		excludedEvidence: [
			"Short-term planted survival is not proof of self-sustaining ecosystem recovery.",
			"Projected bleaching risk is distinct from observed future failure."
		],
		uncertainty: "Many projects are small or short, successful sites may be selectively reported, and later heat stress can undermine local gains.",
		sources: [sources.coralReview, sources.coralFunction, sources.coralLimits]
	}, novemberRiverLandscapeResearchCheckedAt)
];
