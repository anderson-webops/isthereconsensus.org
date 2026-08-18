import type { SeedClaim } from "./claims.js";
import { august2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-08-shared.js";

export const august2026ClimateClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Is the urban heat-island effect responsible for the observed global warming trend?",
		slug: "is-the-urban-heat-island-effect-responsible-for-the-observed-global-warming-trend",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Urban heat islands make built-up areas warmer than nearby rural areas and can strongly affect local heat exposure, but they do not explain the global warming trend. Temperature analyses identify and adjust for station changes and urbanization, while rural stations, ocean measurements, satellites, glaciers, and other indicators independently show a warming planet.",
		stableCore: [
			"Urban surfaces and reduced vegetation create a real local warming effect, especially at night.",
			"Global temperature records use quality controls and homogenization to limit bias from station moves, instrument changes, and urban development.",
			"Comparable warming appears in rural-only analyses and across independent land, ocean, atmospheric, and cryosphere observations.",
			"Urban heat remains an important adaptation and health problem even though it is not the cause of global climate change."
		],
		openQuestions: [
			"How will urban form, vegetation, materials, and population growth change local heat exposure in particular cities?",
			"Which combinations of trees, reflective surfaces, shade, and building standards reduce heat without creating inequitable side effects?"
		],
		whatWouldChangeMinds: [
			"Independent global datasets showing that the long-term trend disappears when urban stations and urbanization effects are removed.",
			"A coherent explanation for matching ocean, satellite, glacier, sea-level, and ecosystem changes that does not involve a broader energy imbalance."
		],
		misconceptions: [
			"A thermometer near development can require adjustment without invalidating the entire global record.",
			"The severity of urban heat for residents does not imply that it dominates the global annual average.",
			"Corrections are tested against neighboring records; they are not arbitrary additions of warming."
		],
		editorSummary:
			"Urban heat islands are both real and consequential, but they are a local land-surface effect. Multiple independent methods show that removing or correcting urban influence leaves the global warming conclusion intact.",
		uncertaintySummary:
			"The global attribution conclusion is high-confidence. Local urban warming and the effectiveness of specific heat-reduction measures vary widely by climate, neighborhood, and development pattern.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 10 — Linking Global to Regional Climate Change",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-10/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Assessment anchor distinguishing local urbanization effects from large-scale observed warming and evaluating evidence across regions and observation systems.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Urbanization Contributes Little to Global Warming but Substantially Intensifies Local and Regional Land Surface Warming",
				publisher: "Earth's Future",
				year: 2022,
				url: "https://consensus.app/papers/urbanization-contributes-little-to-global-warming-but-wang-yan/91e41ae53c50563fb475aad080313c97/",
				doi: "10.1029/2021EF002401",
				appraisal: "high",
				stance: "supports",
				note: "Global analysis finding a small urbanization contribution to the global mean alongside substantial local and regional land-surface warming.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Urban heat island effects on estimates of observed climate change",
				publisher: "WIREs Climate Change",
				year: 2009,
				url: "https://consensus.app/papers/urban-heat-island-effects-on-estimates-of-observed-parker/09e709936b4056d5b852c73d5f767eca/",
				doi: "10.1002/wcc.21",
				appraisal: "high",
				stance: "supports",
				note: "Review of observational methods and comparisons concluding that urban heat-island contamination does not account for the large-scale warming trend.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Did global warming stop after 1998?",
		slug: "did-global-warming-stop-after-1998",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Starting a short trend at the unusually warm 1998 El Niño year made subsequent surface warming look temporarily slower, but Earth's energy accumulation and long-term temperature rise continued. Updated observations and the years since have made the continued warming trend unmistakable.",
		stableCore: [
			"1998 was strongly warmed by El Niño, making it a misleading endpoint for a short trend comparison.",
			"Short-term surface-temperature rates vary with ocean heat exchange, volcanic aerosols, solar variability, and observation coverage.",
			"Ocean heat content continued increasing during the period popularly called a pause or hiatus.",
			"Long records and later record-warm years are consistent with continued greenhouse-gas-driven warming, not a stopped trend."
		],
		openQuestions: [
			"How predictable are decade-scale changes in the rate at which the ocean exchanges heat with the atmosphere?",
			"How much will future short periods temporarily accelerate or slow surface warming around the forced long-term trend?"
		],
		whatWouldChangeMinds: [
			"A sustained multi-decadal halt in total Earth-system heat accumulation despite continued positive greenhouse-gas forcing.",
			"Independent records showing that the post-1998 warming and ocean heat trends are artifacts of shared measurement errors."
		],
		misconceptions: [
			"A slower rate over a cherry-picked short interval is not the same as zero global warming.",
			"Surface air temperature is important but does not contain most of the excess heat stored in the climate system.",
			"Scientific work on the slowdown examined its magnitude and mechanisms; it did not concede that greenhouse warming had ended."
		],
		editorSummary:
			"The apparent post-1998 contradiction came from endpoint choice, natural variability, incomplete observations, and confusion between surface temperature and the whole climate system. It is no longer a plausible description of the record.",
		uncertaintySummary:
			"There is high confidence that warming did not stop. Research continues on the relative contribution of ocean variability, aerosols, forcing changes, and dataset updates to the temporarily slower surface rate.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Did global warming stop in 1998?",
				publisher: "National Oceanic and Atmospheric Administration",
				year: 2026,
				url: "https://www.climate.gov/news-features/climate-qa/did-global-warming-stop-1998",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Public-facing observational explanation of the 1998 endpoint, short-term variability, and the continued long-term warming record.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Reconciling controversies about the 'global warming hiatus'",
				publisher: "Nature",
				year: 2017,
				url: "https://consensus.app/papers/reconciling-controversies-about-the-global-warming-medhaug-stolpe/4b8798d03f405261ac71c941d6e6acff/",
				doi: "10.1038/nature22315",
				appraisal: "high",
				stance: "supports",
				note: "Review reconciling differing definitions and estimates of the slowdown through internal variability, forcing changes, observational uncertainty, and trend selection.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Summary for Policymakers",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
				appraisal: "high",
				stance: "supports",
				note: "Assessment-level synthesis of the unequivocal warming of the atmosphere, ocean, and land and the dominant human contribution since the nineteenth century.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Does human-caused climate change reduce crop yields and threaten food security?",
		slug: "does-human-caused-climate-change-reduce-crop-yields-and-threaten-food-security",
		consensusBand: "broad",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Overall, human-caused climate change is already reducing the productivity of major crops in many regions and is increasing food-security risks through heat, drought, floods, pests, and supply disruptions. Some cooler regions or crops can see temporary benefits, and adaptation helps, but those exceptions do not reverse the increasingly negative global balance as warming rises.",
		stableCore: [
			"Heat stress shortens growth periods and directly lowers yields once crop-specific temperature thresholds are exceeded.",
			"Climate impacts compound with water scarcity, extreme weather, pests, labor exposure, prices, conflict, and unequal access to adaptation.",
			"Carbon dioxide can stimulate growth in some conditions, but nutrient limits, heat, ozone, water stress, and reduced nutritional quality constrain that benefit.",
			"Changes in cultivars, planting dates, irrigation, soil management, trade, and emissions can reduce losses, but adaptation does not eliminate risk at higher warming."
		],
		openQuestions: [
			"How quickly can locally appropriate crop breeding and farm adaptation keep pace with compound extremes?",
			"How will simultaneous harvest shocks, trade restrictions, conflict, and food-price responses affect nutrition and access?"
		],
		whatWouldChangeMinds: [
			"Convergent global observations and crop models showing sustained net yield gains as warming increases after accounting for extremes and adaptation costs.",
			"Evidence that feasible adaptation consistently offsets climate losses across vulnerable regions without major water, biodiversity, or equity tradeoffs."
		],
		misconceptions: [
			"A local benefit in a cool region does not establish a global net benefit.",
			"Carbon dioxide fertilization is not unlimited and does not protect crops from damaging heat or flooding.",
			"Food security depends on affordability, access, stability, and nutrition—not only total global calories."
		],
		editorSummary:
			"The consensus is about a risk distribution, not identical decline everywhere. Climate change shifts the global balance toward lower yields and greater instability, especially in already warm and vulnerable regions, while adaptation can meaningfully reduce but not erase the harm.",
		uncertaintySummary:
			"The global direction is high-confidence. Crop, region, emissions path, adaptation capacity, carbon-dioxide response, and compound extremes determine the size and timing of losses.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Impacts, Adaptation and Vulnerability, Chapter 5 — Food, Fibre and Other Ecosystem Products",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Assessment anchor synthesizing observed and projected effects on crops, fisheries, livestock, food access, nutrition, adaptation, and regional vulnerability.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "A meta-analysis of crop yield under climate change and adaptation",
				publisher: "Nature Climate Change",
				year: 2014,
				url: "https://consensus.app/papers/a-meta-analysis-of-crop-yield-under-climate-change-and-challinor-watson/af191282f32b5cfcb3c2fe6a4c6a9a20/",
				doi: "10.1038/nclimate2153",
				appraisal: "high",
				stance: "supports",
				note: "Multi-crop synthesis showing increasingly negative yield effects later in the century and meaningful but incomplete benefits from adaptation.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Temperature increase reduces global yields of major crops in four independent estimates",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2017,
				url: "https://doi.org/10.1073/pnas.1701762114",
				doi: "10.1073/pnas.1701762114",
				appraisal: "high",
				stance: "supports",
				note: "Convergent synthesis across statistical models, field experiments, and crop models quantifying temperature-related losses for major staple crops.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Does thawing permafrost amplify warming, and does it make runaway warming inevitable?",
		slug: "does-thawing-permafrost-amplify-warming-and-does-it-make-runaway-warming-inevitable",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"Thawing permafrost releases carbon dioxide and methane, creating a positive feedback that adds to human-caused warming. It is a serious, partly irreversible contribution on human timescales, but evidence does not support a single near-term switch that inevitably triggers unstoppable global warming. Faster emissions cuts still reduce how much permafrost thaws and how much carbon is released.",
		stableCore: [
			"Northern permafrost stores far more carbon than is currently present in the atmosphere as carbon dioxide.",
			"Warming deepens seasonal thaw and exposes previously frozen organic matter to microbial decomposition.",
			"Most projected permafrost-carbon emissions occur gradually, primarily as carbon dioxide with important methane contributions from wet environments.",
			"Permafrost feedback is generally absent from national emissions inventories but narrows the remaining carbon budget."
		],
		openQuestions: [
			"How rapidly will abrupt thaw, wildfire, erosion, lake formation, and winter emissions increase total release?",
			"How much carbon will plant growth and changing hydrology offset or amplify across different permafrost regions?"
		],
		whatWouldChangeMinds: [
			"Sustained observations showing that thawed permafrost landscapes remain a net carbon sink despite continued warming.",
			"Convergent evidence for a global threshold that makes future warming independent of subsequent human emissions, contrary to current assessments."
		],
		misconceptions: [
			"A positive feedback amplifies warming; it does not necessarily create self-sustaining runaway change.",
			"Methane matters greatly, but permafrost emissions are not expected to arrive mainly as one sudden methane burst.",
			"Some unavoidable thaw does not make emissions mitigation futile."
		],
		editorSummary:
			"Permafrost is a consequential amplifier and an additional reason to limit warming, not evidence that human choices no longer matter. The feedback is better understood as a growing debit against the carbon budget than as an instant doomsday trigger.",
		uncertaintySummary:
			"The feedback's direction is well established; its timing and magnitude remain uncertain because abrupt thaw, fire, hydrology, vegetation, and microbial processes are difficult to scale across the Arctic.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 5 — Global Carbon and Other Biogeochemical Cycles and Feedbacks",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-5/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Assessment anchor for permafrost-carbon feedback, carbon-budget consequences, and uncertainty across warming pathways.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Permafrost and Climate Change: Carbon Cycle Feedbacks From the Warming Arctic",
				publisher: "Annual Review of Environment and Resources",
				year: 2022,
				url: "https://consensus.app/papers/permafrost-and-climate-change-carbon-cycle-feedbacks-from-schuur-virkkala/27bde50928cd57a6a54604249c2a9cca/",
				doi: "10.1146/annurev-environ-012220-011847",
				appraisal: "high",
				stance: "supports",
				note: "Comprehensive review of observed thaw, carbon stocks, emissions pathways, abrupt processes, and why the feedback scales with human-caused warming.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Climate change and the permafrost carbon feedback",
				publisher: "Nature",
				year: 2015,
				url: "https://doi.org/10.1038/nature14338",
				doi: "10.1038/nature14338",
				appraisal: "high",
				stance: "supports",
				note: "Foundational synthesis quantifying the large frozen-carbon pool and the gradual, policy-relevant feedback expected as permafrost warms.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Is human-caused climate change worsening pollen seasons in North America?",
		slug: "is-human-caused-climate-change-worsening-pollen-seasons-in-north-america",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Warming has lengthened pollen seasons and increased pollen concentrations across much of North America, and attribution work finds that human-caused climate change contributed substantially to those trends. Local outcomes still depend on plant species, land use, precipitation, carbon dioxide, and monitoring coverage.",
		stableCore: [
			"Warmer temperatures can advance spring flowering, delay autumn frost, and extend the period in which allergenic plants release pollen.",
			"Higher carbon dioxide can increase growth and pollen production in some allergenic plants, including ragweed.",
			"Long-running North American monitoring shows longer seasons and higher pollen loads overall, with stronger changes in many northern locations.",
			"Pollen exposure interacts with air pollution, asthma, access to care, and individual sensitization, so health burden is not uniform."
		],
		openQuestions: [
			"How will changing plant ranges, urban vegetation, wildfire smoke, and extreme rainfall alter exposure to particular allergens?",
			"How representative are current monitoring stations of rural areas and communities with limited allergy surveillance?"
		],
		whatWouldChangeMinds: [
			"Expanded standardized monitoring showing no climate-related lengthening or intensification after accounting for land use and species composition.",
			"Attribution studies demonstrating that observed continental trends are explained primarily by non-climatic factors."
		],
		misconceptions: [
			"Not every city or pollen species must change in the same direction for a continental trend to exist.",
			"A longer season does not mean every day has a higher pollen count.",
			"Climate change is an important contributor, not the only determinant of allergic disease."
		],
		editorSummary:
			"This is a concrete health pathway from climate change: warmer conditions and carbon dioxide alter plant timing and output, extending exposure for many allergy sufferers. Regional variation should refine the claim rather than erase it.",
		uncertaintySummary:
			"The North American trend and human contribution are supported with high confidence. Local projections remain sensitive to species, land management, precipitation, adaptation, and uneven monitoring.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Fifth National Climate Assessment, Chapter 14 — Air Quality",
				publisher: "U.S. Global Change Research Program",
				year: 2023,
				url: "https://nca2023.globalchange.gov/downloads/NCA5_Ch14_Air-Quality.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "National assessment linking climate change to longer pollen seasons, changing allergen exposure, and respiratory-health burdens while documenting regional limits.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Anthropogenic climate change is worsening North American pollen seasons",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2021,
				url: "https://consensus.app/papers/anthropogenic-climate-change-is-worsening-north-american-zuan-wang/6fc66c414b3a591f8fbdb311ea196f9d/",
				doi: "10.1073/pnas.2013284118",
				appraisal: "high",
				stance: "supports",
				note: "Attribution analysis of 1990–2018 monitoring data finding longer seasons and higher pollen concentrations, with anthropogenic warming explaining a substantial share of both changes.",
				order: 2
			},
			{
				kind: "context",
				title: "Climate Change Indicators: Ragweed Pollen Season",
				publisher: "U.S. Environmental Protection Agency",
				year: 2016,
				url: "https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1018XLM.TXT",
				appraisal: "high",
				stance: "context",
				note: "Public indicator tracking how the length of ragweed pollen season has changed across selected North American locations, especially with latitude.",
				order: 3
			}
		]
	})
];
