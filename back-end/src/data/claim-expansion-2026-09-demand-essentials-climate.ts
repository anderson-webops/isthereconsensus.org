import type { DemandEssentialsSourceTuple } from "./claim-expansion-2026-09-demand-essentials-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026DemandEssentialsClaim as reviewedClaim } from "./claim-expansion-2026-09-demand-essentials-shared.js";

const climateEvidenceAndCauses = [
	"consensus_statement",
	"Climate Change: Evidence and Causes: Update 2020",
	"U.S. National Academy of Sciences and The Royal Society",
	2020,
	"10.17226/25733",
	"Joint academy synthesis explains why trace gases can alter Earth's energy balance and why short-term local weather does not overturn global climate evidence."
] as const satisfies DemandEssentialsSourceTuple;

const ipccWeatherAndExtremes = [
	"consensus_statement",
	"Weather and Climate Extreme Events in a Changing Climate",
	"Intergovernmental Panel on Climate Change",
	2021,
	"10.1017/9781009157896.013",
	"IPCC assessment separates event types and regions, finding strong attribution for some extremes and lower confidence or mixed trends for others."
] as const satisfies DemandEssentialsSourceTuple;

const ipccImpactsAdaptationFaq = [
	"consensus_statement",
	"Climate Change 2022: Impacts, Adaptation and Vulnerability, Frequently Asked Questions",
	"Intergovernmental Panel on Climate Change",
	2022,
	"https://www.ipcc.ch/report/ar6/wg2/about/frequently-asked-questions/",
	"IPCC explains that adaptation reduces risk but becomes less effective as warming increases and cannot substitute for mitigation."
] as const satisfies DemandEssentialsSourceTuple;

const ipccFoodAndEcosystems = [
	"consensus_statement",
	"Food, Fibre and Other Ecosystem Products",
	"Intergovernmental Panel on Climate Change",
	2022,
	"https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5/",
	"IPCC assesses crop responses to carbon dioxide together with heat, water, nutrient, pest, food-quality, and ecosystem constraints."
] as const satisfies DemandEssentialsSourceTuple;

const ipccSynthesisSummary = [
	"consensus_statement",
	"Climate Change 2023: Synthesis Report, Summary for Policymakers",
	"Intergovernmental Panel on Climate Change",
	2023,
	"https://www.ipcc.ch/report/ar6/syr/summary-for-policymakers/",
	"IPCC synthesis finds that risks, losses, and adaptation constraints escalate with each increment of warming and that deep emissions cuts remain necessary."
] as const satisfies DemandEssentialsSourceTuple;

export const september2026DemandEssentialsClimateClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Do cold snaps or snowy winters disprove global warming?",
		slug: "do-cold-snaps-or-snowy-winters-disprove-global-warming",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. A cold spell describes weather in one place over days or weeks, while global warming is a long-term change in the planet's average climate. Natural variability still produces cold events, even as the global distribution shifts toward more heat and fewer cold extremes. One snowy winter cannot outweigh decades of measurements across the atmosphere, oceans, ice, and land.",
		stableCore: [
			"Weather varies from day to day and region to region; climate describes statistical patterns over much longer periods.",
			"A warming world can still have winter, freezing temperatures, and occasional record cold in particular locations.",
			"Global conclusions use many independent records rather than selecting one season or city."
		],
		openQuestions: [
			"How will Arctic change, ocean patterns, and natural variability alter winter circulation in particular regions?",
			"How quickly will different kinds of cold extremes decline as average temperatures continue to rise?"
		],
		whatWouldChangeMinds: [
			"A sustained reversal across global surface, ocean, atmospheric, ice, and energy-balance records rather than an isolated cold event.",
			"A physical explanation that predicts the observed multi-decade warming more accurately without increased greenhouse forcing."
		],
		misconceptions: [
			"Global warming does not mean every place is warmer than average every day.",
			"Snowfall depends on moisture as well as temperature, so heavy snow can occur while conditions remain cold enough.",
			"A local record low and a global annual record high can occur in the same year."
		],
		editorSummary:
			"A cold day is evidence about that day's weather. The climate question requires the full long-term global record, where the warming signal is clear.",
		uncertaintySummary:
			"The global distinction between weather and climate is not in doubt. Regional winter responses and individual events retain substantial natural variability.",
		sources: [
			climateEvidenceAndCauses,
			[
				"guideline",
				"Frequently Asked Questions About Climate Change",
				"U.S. Environmental Protection Agency",
				2025,
				"https://www.epa.gov/climatechange-science/frequently-asked-questions-about-climate-change",
				"EPA directly explains why local cold and snowy conditions do not contradict the long-term global warming trend."
			],
			ipccWeatherAndExtremes
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Is atmospheric carbon dioxide too scarce to affect climate?",
		slug: "is-atmospheric-carbon-dioxide-too-scarce-to-affect-climate",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. A gas does not need to be abundant to strongly absorb particular wavelengths of infrared radiation. Carbon dioxide's heat-trapping properties are measured in laboratories, observed from satellites and the surface, and embedded in energy-balance physics. Its concentration is small compared with nitrogen and oxygen, but increasing it changes how efficiently Earth loses heat to space.",
		stableCore: [
			"Nitrogen and oxygen dominate atmospheric volume but absorb little outgoing infrared radiation at the wavelengths central to the greenhouse effect.",
			"Carbon dioxide absorbs in characteristic spectral bands, and adding it raises the altitude from which heat escapes to space.",
			"The warming influence of additional carbon dioxide is observed and quantified, not inferred from concentration alone."
		],
		openQuestions: [
			"How large will the total response be once clouds, water vapor, ice, vegetation, and carbon-cycle feedbacks unfold?",
			"How quickly will oceans and ecosystems absorb or release carbon under different emissions paths?"
		],
		whatWouldChangeMinds: [
			"Replicated spectroscopy and planetary energy observations showing added carbon dioxide does not reduce outgoing infrared radiation as established physics predicts.",
			"A competing mechanism that explains the measured spectral and vertical-temperature fingerprints more accurately."
		],
		misconceptions: [
			"A small percentage can have a large effect when a substance interacts strongly at relevant wavelengths.",
			"Carbon dioxide's influence is not judged by comparing its volume directly with oxygen or nitrogen.",
			"Water vapor amplifies warming but does not erase the forcing from long-lived carbon dioxide."
		],
		editorSummary:
			"The relevant property is infrared absorption, not rank by atmospheric abundance. Carbon dioxide is a trace gas with a measurable role in Earth's heat balance.",
		uncertaintySummary:
			"The radiative effect is foundational physics. Uncertainty concerns the size and timing of interacting feedbacks, not whether additional carbon dioxide warms the climate system.",
		sources: [
			climateEvidenceAndCauses,
			[
				"consensus_statement",
				"Global Carbon and Other Biogeochemical Cycles and Feedbacks",
				"Intergovernmental Panel on Climate Change",
				2021,
				"10.1017/9781009157896.007",
				"IPCC assessment connects measured atmospheric carbon dioxide growth, radiative forcing, carbon sinks, and feedbacks."
			],
			[
				"guideline",
				"The Basics of Climate Change",
				"NOAA Global Monitoring Laboratory",
				2024,
				"https://gml.noaa.gov/outreach/carbon_toolkit/basics.html",
				"NOAA explains the greenhouse mechanism and the distinct radiative roles of trace gases and the atmosphere's major constituents."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Can scientists attribute part of a single extreme weather event to climate change?",
		slug: "can-scientists-attribute-part-of-a-single-extreme-weather-event-to-climate-change",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, for many event types. Event-attribution studies compare the observed climate with modeled counterfactual worlds lacking human influence to estimate how warming changed an event's probability or intensity. They do not usually say climate change was the event's only cause, and confidence varies with the event, region, observations, model skill, and framing.",
		stableCore: [
			"Extreme events arise from multiple interacting conditions, so attribution usually quantifies changed odds or severity rather than a single cause.",
			"Human influence is especially detectable for heat extremes and increasingly assessable for heavy rainfall and some drought or fire-weather events.",
			"A defensible study states the event definition, counterfactual, uncertainty interval, and model limitations."
		],
		openQuestions: [
			"How can attribution become faster without sacrificing model evaluation and uncertainty reporting?",
			"Which compound, small-area, and rare events can be represented reliably with current observations and models?"
		],
		whatWouldChangeMinds: [
			"Systematic failures of attribution methods when tested against known forcings or out-of-sample observations.",
			"Evidence that results are dominated by arbitrary event definitions rather than physically consistent changes."
		],
		misconceptions: [
			"Saying climate change increased an event's probability is not saying the event was impossible naturally.",
			"Not every event can be attributed with equal confidence.",
			"Uncertainty ranges are part of the answer, not evidence that attribution is meaningless."
		],
		editorSummary:
			"Attribution asks how human-caused warming loaded the weather dice. For suitable events, scientists can estimate that change without pretending one factor created every detail.",
		uncertaintySummary:
			"Methods are mature for some hazards, especially heat, but confidence remains event-specific and lower where observations or model representation are weak.",
		sources: [
			[
				"consensus_statement",
				"Attribution of Extreme Weather Events in the Context of Climate Change",
				"National Academies of Sciences, Engineering, and Medicine",
				2016,
				"10.17226/21852",
				"National Academies evaluates event-attribution methods, identifies well-supported applications, and emphasizes event-specific confidence."
			],
			ipccWeatherAndExtremes,
			[
				"systematic_review",
				"Attribution of extreme weather and climate-related events",
				"WIREs Climate Change",
				2016,
				"10.1002/wcc.380",
				"Review describes probabilistic and storyline approaches, their development, and the conditions needed for credible attribution."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Is climate change making drought worse everywhere?",
		slug: "is-climate-change-making-drought-worse-everywhere",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"No. Human-caused warming has increased some agricultural and ecological droughts and intensified drying in several regions, but drought is not one global variable with the same trend everywhere. Meteorological, soil-moisture, hydrological, and ecological drought differ, and precipitation, evaporation, water management, land use, season, and timescale can push regional trends in different directions.",
		stableCore: [
			"Higher temperatures can increase evaporative demand and worsen soil and vegetation stress even without a large rainfall decline.",
			"Observed and projected drought changes vary by region and by the drought definition being measured.",
			"Human water withdrawals and land management can amplify or offset climate-driven hydrological effects."
		],
		openQuestions: [
			"How will precipitation patterns, vegetation responses, and groundwater use interact at local watershed scales?",
			"Which drought indicators best predict crop loss, ecosystem damage, wildfire risk, and human water insecurity?"
		],
		whatWouldChangeMinds: [
			"Consistent global observations showing every major drought category worsening across nearly all regions and timescales.",
			"Evidence that warming-driven evaporative demand has no detectable influence on soil or ecosystem drought."
		],
		misconceptions: [
			"A global average cannot describe every basin or drought type.",
			"More intense rain and worse drought can both occur when rainfall becomes more variable or concentrated.",
			"A regional drought trend is not automatically attributable solely to greenhouse forcing."
		],
		editorSummary:
			"The accurate statement is regional and type-specific: warming worsens important drought risks, but not every drought metric in every place.",
		uncertaintySummary:
			"Regional differences and measurement choices are substantial. Confidence is strongest where physical mechanisms, observations, and model projections converge.",
		sources: [
			ipccWeatherAndExtremes,
			[
				"consensus_statement",
				"Climate Change 2021: The Physical Science Basis, Frequently Asked Questions",
				"Intergovernmental Panel on Climate Change",
				2021,
				"https://www.ipcc.ch/report/ar6/wg1/resources/frequently-asked-questions/",
				"IPCC FAQ 8.3 explains why different drought definitions and regional water-cycle changes do not support one universal trend."
			],
			[
				"consensus_statement",
				"Water",
				"Intergovernmental Panel on Climate Change",
				2022,
				"https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-4/",
				"IPCC assesses regional drought, runoff, groundwater, human water use, and adaptation as interacting drivers of water risk."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Are climate tipping points guaranteed to occur at exactly 1.5 degrees Celsius?",
		slug: "are-climate-tipping-points-guaranteed-to-occur-at-exactly-1-5-degrees-celsius",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. A tipping point is a threshold beyond which a system may shift through self-reinforcing change, but the threshold for each system is estimated as a range, not a scheduled event at one exact global temperature. Risks rise with warming, some systems may enter plausible transition ranges near 1.5°C, and changes can unfold over very different timescales. That makes 1.5°C a risk boundary, not a universal on-off switch.",
		stableCore: [
			"Ice sheets, coral reefs, ocean circulation, permafrost, and ecosystems have different mechanisms and threshold ranges.",
			"Crossing a threshold can commit a system to long-term change without making the full consequence instantaneous.",
			"Uncertain thresholds are a reason to manage risk, not evidence that tipping behavior is imaginary."
		],
		openQuestions: [
			"Where exactly are the thresholds, how reversible are the changes, and which early-warning signals are reliable?",
			"How strongly could one tipping element raise the probability of change in another?"
		],
		whatWouldChangeMinds: [
			"Long observations and improved models showing proposed systems respond smoothly with no plausible threshold behavior.",
			"Alternatively, convergent evidence narrowing a specific system's threshold to an exact temperature with little uncertainty."
		],
		misconceptions: [
			"The Paris temperature goal is not a prediction that every tipping element activates at 1.5°C.",
			"Committed change and completed change are not the same timeline.",
			"A threshold range does not imply that outcomes below its midpoint are risk-free."
		],
		editorSummary:
			"Think of tipping risk as multiple uncertain ranges that become more dangerous as warming rises, not one planetary light switch labeled 1.5°C.",
		uncertaintySummary:
			"Confidence varies by system. The existence of nonlinear risks is well supported, while exact thresholds, interactions, reversibility, and timing remain active research areas.",
		sources: [
			[
				"consensus_statement",
				"Key Risks Across Sectors and Regions",
				"Intergovernmental Panel on Climate Change",
				2022,
				"https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-16/",
				"IPCC evaluates large-scale singular events as risks that change across temperature ranges rather than one guaranteed threshold."
			],
			[
				"landmark_study",
				"Exceeding 1.5°C global warming could trigger multiple climate tipping points",
				"Science",
				2022,
				"10.1126/science.abn7950",
				"Assessment synthesizes estimated threshold ranges and emphasizes uncertainty and different transition timescales across tipping elements."
			],
			ipccSynthesisSummary
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Can adaptation alone avoid most climate damage without cutting emissions?",
		slug: "can-adaptation-alone-avoid-most-climate-damage-without-cutting-emissions",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Adaptation can save lives and reduce losses, but it has financial, physical, ecological, and social limits that grow as warming rises. Some harms cannot be fully adapted to, and measures that work at lower warming can fail or become unaffordable later. The evidence supports doing adaptation and mitigation together: reduce near-term vulnerability while limiting the future hazard.",
		stableCore: [
			"Early warning, resilient infrastructure, cooling, water management, and ecosystem measures can materially reduce climate risk.",
			"Residual damage remains after adaptation, and protection often shifts rather than eliminates risk.",
			"Continued emissions raise the scale and frequency of hazards until adaptation encounters hard or soft limits."
		],
		openQuestions: [
			"Which locally led investments deliver the greatest durable risk reduction without maladaptation?",
			"How should unavoidable loss, relocation, financing, and unequal capacity be governed?"
		],
		whatWouldChangeMinds: [
			"Credible global scenarios showing affordable adaptation prevents nearly all major human and ecosystem losses under sustained high warming.",
			"Evidence that mitigation no longer lowers future hazard or expands adaptation options."
		],
		misconceptions: [
			"Saying adaptation has limits does not mean adaptation is futile.",
			"A seawall, crop change, or cooling plan does not address every hazard or every community.",
			"Successful protection today may need costly upgrades as hazards intensify."
		],
		editorSummary:
			"Adaptation manages consequences; mitigation constrains how large those consequences become. Treating either one as a complete substitute for the other leaves avoidable risk.",
		uncertaintySummary:
			"Benefits are highly context-specific, but the declining effectiveness and rising residual loss under greater warming are robust assessment conclusions.",
		sources: [
			ipccImpactsAdaptationFaq,
			ipccSynthesisSummary,
			[
				"landmark_study",
				"Residual flood damage under intensive adaptation",
				"Nature Climate Change",
				2021,
				"10.1038/s41558-021-01158-8",
				"Global modeling finds substantial residual flood losses even under intensive adaptation, with results sensitive to development and warming."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Can solar geoengineering safely substitute for cutting greenhouse-gas emissions?",
		slug: "can-solar-geoengineering-safely-substitute-for-cutting-greenhouse-gas-emissions",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Reflecting a small fraction of sunlight might lower global average temperature, but it would not remove carbon dioxide, stop ocean acidification, perfectly restore regional climate, or eliminate governance and termination risks. Major assessments support cautious research and governance, not deployment as a replacement for rapid emissions cuts, adaptation, and carbon removal.",
		stableCore: [
			"Solar radiation modification acts on incoming sunlight while greenhouse gases alter outgoing heat, so the two forcings are not physically identical.",
			"Potential cooling could be uneven and would leave carbon-cycle and ocean-acidification effects unresolved.",
			"Stopping a large intervention abruptly while greenhouse concentrations remain high could produce rapid warming."
		],
		openQuestions: [
			"What regional benefits, harms, feedbacks, and distributional conflicts would different interventions create?",
			"What legitimate international institutions could govern research, consent, monitoring, liability, and possible use?"
		],
		whatWouldChangeMinds: [
			"Extensive validated evidence that an intervention safely addresses regional climate, ocean acidification, ecosystems, governance, and termination without continued emissions cuts.",
			"A binding global governance system able to control deployment and manage harms across generations."
		],
		misconceptions: [
			"Researching a high-risk option is not the same as endorsing deployment.",
			"Lowering global mean temperature would not recreate the preindustrial climate in every region.",
			"A comparatively inexpensive physical intervention could still impose large political and ecological costs."
		],
		editorSummary:
			"Solar geoengineering is a possible risk-modifying intervention with major unresolved consequences. It is not an emissions eraser or a license to keep accumulating carbon dioxide.",
		uncertaintySummary:
			"Models support potential cooling, but real-world regional outcomes, side effects, delivery, monitoring, and governance remain deeply uncertain because no climate-scale deployment has occurred.",
		sources: [
			[
				"consensus_statement",
				"Reflecting Sunlight: Recommendations for Solar Geoengineering Research and Research Governance",
				"National Academies of Sciences, Engineering, and Medicine",
				2021,
				"10.17226/25762",
				"National Academies recommends a limited, governed research program while stating solar geoengineering is not a substitute for mitigation or adaptation."
			],
			[
				"systematic_review",
				"An overview of the Earth system science of solar geoengineering",
				"WIREs Climate Change",
				2016,
				"10.1002/wcc.423",
				"Review synthesizes modeled cooling, hydrological changes, ozone and carbon-cycle effects, and termination concerns."
			],
			[
				"systematic_review",
				"Towards a comprehensive climate impacts assessment of solar geoengineering",
				"Earth's Future",
				2016,
				"10.1002/2016EF000389",
				"Review argues that temperature alone cannot capture regional, ecological, and societal consequences of solar geoengineering."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Does carbon-dioxide fertilization cancel climate damage to crops and ecosystems?",
		slug: "does-carbon-dioxide-fertilization-cancel-climate-damage-to-crops-and-ecosystems",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. More carbon dioxide can increase photosynthesis and water-use efficiency in some plants, especially C3 crops, but real growth is constrained by heat, drought, nutrients, pests, ozone, and extreme events. Elevated carbon dioxide can also lower protein and micronutrient concentrations in major staples. Benefits occur in some settings, but they do not cancel the wider risks of continued warming and ecosystem disruption.",
		stableCore: [
			"Carbon dioxide fertilization is a real biological response, not a fabricated effect.",
			"Field responses are smaller and more conditional than a simple laboratory carbon-supply story implies.",
			"Yield quantity, food quality, biodiversity, water, heat tolerance, and disturbance must be assessed together."
		],
		openQuestions: [
			"How will crop breeding, soil nutrients, irrigation, pests, and extreme heat shape net outcomes region by region?",
			"How strongly will nutrient dilution affect population health under different diets and carbon-dioxide pathways?"
		],
		whatWouldChangeMinds: [
			"Long-term field evidence showing carbon-dioxide gains consistently exceed heat, water, nutrient, pest, quality, and ecosystem losses across major regions.",
			"Evidence that elevated carbon dioxide does not alter crop nutrient concentrations under realistic conditions."
		],
		misconceptions: [
			"Plants needing carbon dioxide does not mean more is universally better without limit.",
			"Faster growth in one crop and location cannot stand in for all food systems and ecosystems.",
			"A greener satellite signal does not by itself measure biodiversity, nutrition, wildfire, or long-term carbon storage."
		],
		editorSummary:
			"Carbon dioxide can fertilize plants, but plants live in whole environments. Heat, water, nutrients, pests, food quality, and ecosystem stability determine the net outcome.",
		uncertaintySummary:
			"The fertilization mechanism is established. Its durable magnitude and net benefit vary by species, nutrient availability, climate stress, management, and outcome measured.",
		sources: [
			ipccFoodAndEcosystems,
			[
				"consensus_statement",
				"Global Carbon and Other Biogeochemical Cycles and Feedbacks",
				"Intergovernmental Panel on Climate Change",
				2021,
				"10.1017/9781009157896.007",
				"IPCC assesses observed land greening alongside nutrient limits, warming, disturbances, and declining sink efficiency."
			],
			[
				"landmark_study",
				"Increasing CO2 threatens human nutrition",
				"Nature",
				2014,
				"10.1038/nature13179",
				"Field experiments found elevated carbon dioxide reduced zinc and iron in major C3 grains and legumes and reduced protein in some grains."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Do wind turbines cause cancer or a distinct disease syndrome through infrasound?",
		slug: "do-wind-turbines-cause-cancer-or-a-distinct-disease-syndrome-through-infrasound",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"Current evidence does not support wind turbines causing cancer or a distinct multisystem disease through infrasound at residential exposure levels. Turbine noise can be audible and annoying, and annoyance or disrupted sleep can affect well-being, so siting and noise management still matter. The evidence base is stronger against dramatic disease claims than it is for ruling out every long-term effect in every setting.",
		stableCore: [
			"Wind turbines produce sound, including low-frequency components, but residential exposure has not been shown to create a unique cancer or systemic-disease mechanism.",
			"Annoyance is a real outcome influenced by sound level, visual factors, attitudes, trust, and community process.",
			"Self-reported symptoms and objective disease endpoints should not be treated as interchangeable."
		],
		openQuestions: [
			"Which siting, sound-character, nighttime, and community-engagement practices best reduce annoyance and sleep disruption?",
			"What do larger, long-term studies show for sensitive subgroups and newer turbine designs?"
		],
		whatWouldChangeMinds: [
			"Replicated exposure-response studies linking measured turbine infrasound to specific objective disease outcomes with a plausible mechanism.",
			"Long-term surveillance showing disease rates rise consistently with turbine exposure after addressing confounding and reporting bias."
		],
		misconceptions: [
			"Rejecting a cancer or syndrome claim does not mean every resident's annoyance or sleep complaint is imaginary.",
			"Detectable low-frequency sound is not automatically biologically harmful at the measured level.",
			"One cross-sectional symptom survey cannot establish either universal safety or causation."
		],
		editorSummary:
			"The evidence does not support a special infrasound disease or cancer claim. Noise and annoyance deserve practical management without converting them into unsupported diagnoses.",
		uncertaintySummary:
			"Major reviews find no consistent adverse-disease signal, but many studies are observational and long-term evidence remains thinner than evidence on annoyance.",
		sources: [
			[
				"consensus_statement",
				"NHMRC Statement: Evidence on Wind Farms and Human Health",
				"Australian National Health and Medical Research Council",
				2015,
				"https://www.nhmrc.gov.au/about-us/publications/nhmrc-statement-evidence-wind-farms-and-human-health",
				"Independent government review found no consistent evidence that wind farms cause adverse health effects while identifying evidence gaps and community concern."
			],
			[
				"systematic_review",
				"Health effects of wind turbines on humans in residential settings: Results of a scoping review",
				"Environmental Research",
				2019,
				"10.1016/j.envres.2018.11.032",
				"Scoping review found annoyance and some sleep associations but no consistent evidence for many claimed diseases."
			],
			[
				"landmark_study",
				"Wind Turbine Noise and Health Study: Summary of Results",
				"Health Canada",
				2014,
				"https://www.canada.ca/en/health-canada/services/health-risks-safety/radiation/everyday-things-emit-radiation/wind-turbine-noise/wind-turbine-noise-health-study-summary-results.html",
				"Large Canadian field study found noise-related annoyance but no association with measured sleep, blood pressure, heart rate, or cortisol."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Are biodegradable or compostable plastics guaranteed to break down in nature?",
		slug: "are-biodegradable-or-compostable-plastics-guaranteed-to-break-down-in-nature",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Biodegradation depends on the polymer and on temperature, moisture, oxygen, microbes, time, thickness, and disposal conditions. A product certified for industrial composting may not break down quickly in soil, freshwater, the ocean, a home compost pile, or a landfill. These labels are conditional waste-management instructions, not permission to litter or a guarantee of harmless disappearance.",
		stableCore: [
			"Biobased, biodegradable, and compostable describe different properties and are not synonyms.",
			"Many compostable products need controlled industrial heat and moisture that open environments do not provide.",
			"Poorly matched disposal can leave persistent fragments, contaminate recycling, or fail to deliver the claimed environmental benefit."
		],
		openQuestions: [
			"Which materials and standards reliably predict complete degradation in specific soils, waters, climates, and waste systems?",
			"When do targeted biodegradable applications outperform reduction, reuse, or conventional recycling over a full lifecycle?"
		],
		whatWouldChangeMinds: [
			"Standardized field evidence showing labeled products consistently mineralize without harmful residues across ordinary natural environments.",
			"Waste-system evidence showing labels do not confuse sorting or contaminate recycling and compost streams."
		],
		misconceptions: [
			"Plant-derived plastic is not automatically biodegradable.",
			"Breaking into smaller visible pieces is not the same as complete biodegradation.",
			"Industrial-compost certification does not promise degradation in a backyard or ocean."
		],
		editorSummary:
			"Read the condition attached to the label. A material designed for one managed process may persist when it reaches a very different environment.",
		uncertaintySummary:
			"The conditional nature of biodegradation is clear. Performance varies across materials, products, climates, test standards, collection systems, and real disposal behavior.",
		sources: [
			[
				"consensus_statement",
				"Biodegradability of plastics in the open environment",
				"European Commission Scientific Advice Mechanism",
				2020,
				"https://op.europa.eu/en/web/eu-law-and-publications/publication-detail/-/publication/0c0d6267-433a-11eb-b27b-01aa75ed71a1",
				"European scientific opinion states that biodegradability is environment-specific and many products require industrial composting conditions."
			],
			[
				"systematic_review",
				"Degradation of biodegradable plastics in waste management systems and the open environment: A critical review",
				"Journal of Cleaner Production",
				2024,
				"10.1016/j.jclepro.2023.140000",
				"Critical review documents strong dependence on material, test conditions, and receiving environment and identifies gaps between standards and field behavior."
			],
			[
				"consensus_statement",
				"Biodegradable Plastics and Marine Litter: Misconceptions, Concerns and Impacts on Marine Environments",
				"United Nations Environment Programme",
				2015,
				"https://www.unep.org/resources/report/biodegradable-plastics-and-marine-litter-misconceptions-concerns-and-impacts",
				"UNEP concludes that plastics labeled biodegradable generally do not degrade rapidly in the marine environment and are not a litter solution."
			]
		]
	})
];
