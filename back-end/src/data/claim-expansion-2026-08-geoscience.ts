import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheTwoClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026GeoscienceClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Is Earth about 4.54 billion years old?",
		slug: "is-earth-about-4-54-billion-years-old",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Earth formed about 4.54 billion years ago, with uncertainty of roughly one percent or less in the broad estimate. The age comes from several radiometric systems applied to meteorites, ancient terrestrial minerals, and lunar material—not from guessing how quickly today's landscapes formed.",
		stableCore: [
			"Meteorites preserve early Solar System material that escaped much of Earth's later melting, weathering, and plate recycling.",
			"Uranium-lead and other isotope systems act as independent clocks with measured decay rates and internal cross-checks.",
			"Earth's oldest known minerals and rocks provide minimum ages consistent with the meteorite-based formation age."
		],
		openQuestions: [
			"How quickly did Earth accrete, differentiate into layers, cool, and develop stable crust and oceans?",
			"Which surviving minerals best preserve the earliest geochemical record?"
		],
		whatWouldChangeMinds: [
			"Replicable isotope measurements across meteorites and ancient minerals converging on a substantially different formation age.",
			"Evidence that several independent decay systems share an unrecognized error large enough to overturn their agreement."
		],
		misconceptions: [
			"Carbon dating is not used to determine Earth's age; its useful timescale is far shorter.",
			"No single terrestrial rock must be as old as the planet because Earth's crust is repeatedly reworked.",
			"A measured age includes uncertainty; it is not claimed to be exact to the year."
		],
		editorSummary:
			"The age is a convergence result from nuclear physics, geochemistry, and Solar System samples. Debates concern early events within the first hundreds of millions of years, not a young Earth.",
		uncertaintySummary:
			"Different samples record crystallization or chemical separation at different times. Modeling the initial lead inventory adds assumptions, but multiple systems tightly constrain a roughly 4.54-billion-year age.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Geologic Time: Age of the Earth",
				publisher: "U.S. Geological Survey",
				year: 2007,
				url: "https://pubs.usgs.gov/gip/geotime/age.html",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "USGS synthesis explaining the 4.54-billion-year estimate from lead isotopes, meteorites, lunar samples, and ancient terrestrial material.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Age of meteorites and the Earth",
				publisher: "Geochimica et Cosmochimica Acta",
				year: 1956,
				url: "https://doi.org/10.1016/0016-7037(56)90036-9",
				doi: "10.1016/0016-7037(56)90036-9",
				appraisal: "high",
				stance: "supports",
				note: "Landmark lead-isotope analysis establishing the modern age scale for Earth and meteorites.",
				order: 2
			},
			{
				kind: "context",
				title: "Precambrian Time—The Story of the Early Earth",
				publisher: "U.S. Geological Survey",
				year: 2007,
				url: "https://pubs.usgs.gov/fs/2007/3004/pdf/FS07-3004_508.pdf",
				appraisal: "high",
				stance: "context",
				note: "Public geologic-timescale summary placing the accepted 4.54-billion-year age alongside early Earth evidence.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Do Earth's tectonic plates move?",
		slug: "do-earths-tectonic-plates-move",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Earth's rigid outer shell is divided into plates that move centimeters per year relative to one another. Satellite geodesy measures motion directly, while earthquake belts, volcanic arcs, seafloor magnetic stripes, ocean-floor ages, and mountain systems record the same process across longer timescales.",
		stableCore: [
			"Global navigation satellites measure present-day plate velocities to fractions of a millimeter per year in favorable settings.",
			"New oceanic crust forms at spreading centers and older seafloor is recycled at many subduction zones.",
			"Plate motion organizes most large earthquakes, volcano chains, ocean basins, and long-term continental deformation."
		],
		openQuestions: [
			"When and how did modern-style plate tectonics begin on the early Earth?",
			"How do slab pull, mantle flow, ridge forces, and plate-boundary strength divide the work of driving motion?"
		],
		whatWouldChangeMinds: [
			"Repeated geodetic networks showing stable continents and seafloors where plate models predict motion.",
			"A replacement theory jointly explaining seafloor age, magnetism, seismicity, volcanism, and mountain building more accurately."
		],
		misconceptions: [
			"Continents do not plow independently through fixed ocean crust; both continental and oceanic lithosphere are parts of plates.",
			"Slow movement is directly measurable and can accumulate to ocean-scale change over millions of years.",
			"Mantle convection is not a simple set of textbook conveyor belts with perfectly fixed cell boundaries."
		],
		editorSummary:
			"Plate motion is both directly measured today and recorded in deep time. The scientific frontier concerns initiation, force balance, and complex boundary behavior—not whether plates move.",
		uncertaintySummary:
			"Velocities and boundaries can be diffuse or time-varying, and early-Earth tectonics is debated. The global plate framework and present motion are exceptionally well supported.",
		sources: [
			{
				kind: "consensus_statement",
				title: "How fast do tectonic plates move?",
				publisher: "U.S. Geological Survey",
				year: 2026,
				url: "https://www.usgs.gov/faqs/how-fast-do-tectonic-plates-move",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "USGS explanation of direct GPS measurements and long-term rates from magnetic records in ocean crust.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "This Dynamic Earth: The Story of Plate Tectonics",
				publisher: "U.S. Geological Survey",
				url: "https://pubs.usgs.gov/gip/dynamic/dynamic.html",
				appraisal: "high",
				stance: "supports",
				note: "Institutional synthesis of the global observations that established plate tectonics.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Plate tectonics: what, where, why, and when?",
				publisher: "Gondwana Research",
				year: 2021,
				url: "https://doi.org/10.1016/j.gr.2020.11.001",
				doi: "10.1016/j.gr.2020.11.001",
				appraisal: "high",
				stance: "context",
				note: "Review of the established modern process and the less-settled evidence for when it began.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Can scientists predict the exact time, place, and magnitude of earthquakes?",
		slug: "can-scientists-predict-the-exact-time-place-and-magnitude-of-earthquakes",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		reviewMode: "living",
		bottomLine:
			"No. Scientists cannot reliably predict a specific earthquake's exact time, location, and magnitude before rupture. They can estimate long-term hazard and changing probabilities, issue aftershock forecasts, and send early-warning alerts after rupture starts but before strong shaking reaches some locations.",
		stableCore: [
			"No proposed precursor—animal behavior, radon, electromagnetic signals, foreshocks, or another measure—has proved reliably diagnostic across major earthquakes.",
			"Hazard maps estimate the likelihood and intensity of future shaking over years to decades rather than naming an exact event.",
			"Earthquake early warning detects an event already underway and can sometimes outrun the slower damaging seismic waves."
		],
		openQuestions: [
			"Can dense sensors, laboratory physics, or machine learning produce useful short-term probability gains that validate prospectively?",
			"How should uncertain forecasts be communicated so they improve preparedness without generating false alarms or complacency?"
		],
		whatWouldChangeMinds: [
			"A preregistered method repeatedly predicting time, place, and magnitude more accurately than established statistical baselines.",
			"A reproducible precursor that occurs before most target earthquakes and rarely when no event follows."
		],
		misconceptions: [
			"A vague statement that an earthquake will occur in a broad active region is not a successful prediction.",
			"A probability forecast is useful even though it does not specify the next exact event.",
			"Early warning is not advance prediction; the earthquake has already begun."
		],
		editorSummary:
			"This page separates three frequently conflated services: prediction, probabilistic forecasting, and early warning. Only the first remains unavailable in the exact form people usually mean.",
		uncertaintySummary:
			"Forecasting methods can estimate rates and aftershock sequences with measurable skill. Whether deterministic short-term prediction is physically possible remains unknown, and claims require prospective validation.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Can you predict earthquakes?",
				publisher: "U.S. Geological Survey",
				url: "https://www.usgs.gov/faqs/can-you-predict-earthquakes",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "USGS states that exact major-earthquake prediction is not currently possible and distinguishes it from long-term probability.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "The complex dynamics of earthquake fault systems: new approaches to forecasting and nowcasting of earthquakes",
				publisher: "Reports on Progress in Physics",
				year: 2021,
				url: "https://doi.org/10.1088/1361-6633/abf893",
				doi: "10.1088/1361-6633/abf893",
				appraisal: "high",
				stance: "context",
				note: "Review of prediction failures, probability forecasts, proposed precursors, and emerging computational approaches.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Operational Earthquake Forecasting: State of Knowledge and Guidelines for Utilization",
				publisher: "Annals of Geophysics",
				year: 2011,
				url: "https://doi.org/10.4401/ag-5350",
				doi: "10.4401/ag-5350",
				appraisal: "high",
				stance: "context",
				note: "International commission report on what probabilistic operational forecasts can and cannot support.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Can underground fluid injection induce earthquakes?",
		slug: "can-underground-fluid-injection-induce-earthquakes",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Injecting fluid underground can raise pore pressure and reactivate stressed faults, producing earthquakes. In U.S. oil and gas regions, long-running wastewater disposal has caused far more felt induced earthquakes than the brief hydraulic-fracturing step itself, and most injection wells do not cause felt events.",
		stableCore: [
			"Induced seismicity requires a susceptible fault, sufficient stress, hydraulic connection, and an operation that changes subsurface pressure or stress.",
			"Earthquakes can occur kilometers from an injection point and may continue after operations change as pressure migrates.",
			"Monitoring, site characterization, volume and rate controls, and traffic-light protocols can reduce but not eliminate risk."
		],
		openQuestions: [
			"How can operators estimate the largest plausible event before injection begins?",
			"Which real-time thresholds best control risk without reacting to harmless microseismicity?"
		],
		whatWouldChangeMinds: [
			"Well-instrumented cases repeatedly showing no pressure or stress link between injection and nearby seismic sequences.",
			"Mechanistic models failing prospectively across diverse geology while a better causal account succeeds."
		],
		misconceptions: [
			"Wastewater injection and hydraulic fracturing are related operations but not the same exposure.",
			"Most injection wells do not generate felt earthquakes.",
			"Human-induced does not mean every part of the stored tectonic energy was created by the operation."
		],
		editorSummary:
			"The causal mechanism and documented cases are well established. Risk is highly site- and operation-dependent, so neither 'all fracking causes earthquakes' nor 'industry cannot affect seismicity' is accurate.",
		uncertaintySummary:
			"Attribution is strongest where timing, location, pressure, and fault data align. Maximum magnitude and distant pressure pathways can be difficult to forecast in advance.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Myths and Misconceptions About Induced Earthquakes",
				publisher: "U.S. Geological Survey",
				url: "https://www.usgs.gov/programs/earthquake-hazards/myths-and-misconceptions-about-induced-earthquakes",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "USGS synthesis distinguishing wastewater disposal, hydraulic fracturing, susceptible wells, and pressure migration.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Induced Seismicity Potential in Energy Technologies",
				publisher: "National Academies Press",
				year: 2013,
				url: "https://doi.org/10.17226/13355",
				doi: "10.17226/13355",
				appraisal: "high",
				stance: "supports",
				note: "Consensus assessment of mechanisms and relative seismic potential across energy technologies.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Global physics-based database of injection-induced seismicity",
				publisher: "Earth System Science Data",
				year: 2023,
				url: "https://doi.org/10.5194/essd-15-3163-2023",
				doi: "10.5194/essd-15-3163-2023",
				appraisal: "high",
				stance: "supports",
				note: "Global multidisciplinary database compiling 158 reported induced-seismicity datasets and their operating and geologic conditions.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Is Yellowstone overdue for a supereruption?",
		slug: "is-yellowstone-overdue-for-a-supereruption",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		reviewMode: "living",
		bottomLine:
			"No. Yellowstone's past giant eruptions do not follow a periodic schedule, and averaging only two intervals does not create a deadline. Another eruption is possible, but a future event need not be a supereruption, and current monitoring shows no evidence that a catastrophic eruption is imminent.",
		stableCore: [
			"The three caldera-forming eruptions occurred at uneven intervals, so a simple recurrence clock is not scientifically justified.",
			"Much of the subsurface magma reservoir is hot crystal-rich rock rather than eruption-ready liquid melt.",
			"Earthquakes, ground deformation, heat, water, and gases are continuously monitored for departures from background behavior."
		],
		openQuestions: [
			"How does melt accumulate, migrate, and sometimes stall beneath large caldera systems?",
			"Which combinations of monitoring signals best distinguish ordinary unrest from movement toward eruption?"
		],
		whatWouldChangeMinds: [
			"Sustained, multi-instrument evidence of rapidly mobilizing magma and escalating unrest consistent with an impending large eruption.",
			"A validated physical model showing genuinely periodic supereruptions at Yellowstone."
		],
		misconceptions: [
			"An average interval calculated from two gaps is not a countdown.",
			"Ground uplift, earthquake swarms, and geyser changes can occur without an eruption.",
			"The next volcanic event, if one occurs, is not automatically the largest possible event."
		],
		editorSummary:
			"'Overdue' imports a timetable that volcanoes do not have. The scientifically useful question is whether monitored conditions indicate changing hazard; current public assessments say no imminent catastrophic eruption.",
		uncertaintySummary:
			"Very rare events are inherently difficult to estimate from a short geologic sequence. Scientists can identify unrest and plausible scenarios but cannot guarantee Yellowstone will or will not erupt again.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Is Yellowstone overdue for an eruption? When will Yellowstone erupt?",
				publisher: "U.S. Geological Survey",
				year: 2026,
				url: "https://www.usgs.gov/faqs/yellowstone-overdue-eruption-when-will-yellowstone-erupt",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Yellowstone Volcano Observatory explanation rejecting periodic-overdue claims and describing current melt estimates.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Questions About Supervolcanoes",
				publisher: "U.S. Geological Survey",
				url: "https://www.usgs.gov/volcanoes/yellowstone/questions-about-supervolcanoes",
				appraisal: "high",
				stance: "context",
				note: "Official risk explanation covering low annual probability, non-periodicity, plausible precursors, and monitoring limits.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "The Yellowstone magmatic system from the mantle plume to the upper crust",
				publisher: "Science",
				year: 2015,
				url: "https://doi.org/10.1126/science.aaa5648",
				doi: "10.1126/science.aaa5648",
				appraisal: "high",
				stance: "context",
				note: "Seismic imaging constraining the scale and partial-melt character of Yellowstone's crustal magmatic system.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Is Earth's mantle mostly molten?",
		slug: "is-earths-mantle-mostly-molten",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Earth's mantle is overwhelmingly solid silicate rock. Because it is hot and under enormous pressure, it deforms and convects over millions of years; limited partial melting occurs in particular settings and feeds magma. The liquid outer core lies deeper and is compositionally different.",
		stableCore: [
			"Seismic shear waves travel through the mantle, which would not happen through a global liquid layer.",
			"Solid rock can creep under sustained heat and stress, just as other solids deform over long timescales.",
			"Decompression, added water, or local heating can produce partial melt near ridges, subduction zones, and hot spots."
		],
		openQuestions: [
			"How are temperature, composition, water, grain size, and phase changes distributed through the mantle?",
			"How connected are deep mantle structures to surface plates and volcanic hot spots?"
		],
		whatWouldChangeMinds: [
			"Global seismic observations showing the wave behavior expected from a predominantly liquid mantle.",
			"Mineral-physics measurements showing mantle compositions melt under the prevailing pressure-temperature profile."
		],
		misconceptions: [
			"Convection does not require a material to be liquid on human timescales.",
			"The softer asthenosphere is mostly solid, not a worldwide underground ocean of magma.",
			"Magma chambers and partial-melt zones occupy only a small fraction of the whole mantle."
		],
		editorSummary:
			"The misconception comes from equating flow with liquid. Mantle rock behaves elastically during seismic waves and viscously over geologic time, while local melt produces volcanism.",
		uncertaintySummary:
			"Fine-scale temperature, composition, water content, and melt fraction are inferred indirectly and vary by region. The mantle's predominantly solid state is not in serious dispute.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Some unanswered questions: This Dynamic Earth",
				publisher: "U.S. Geological Survey",
				url: "https://pubs.usgs.gov/gip/dynamic/unanswered.html",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "USGS explanation that solid mantle rock softens and changes shape under heat and pressure over millions of years.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Mantle convection: A review",
				publisher: "Fluid Dynamics Research",
				year: 2008,
				url: "https://doi.org/10.1016/j.fluiddyn.2007.09.001",
				doi: "10.1016/j.fluiddyn.2007.09.001",
				appraisal: "high",
				stance: "supports",
				note: "Review explicitly describing solid-state mantle convection and its relation to plate tectonics.",
				order: 2
			},
			{
				kind: "context",
				title: "Volcano Watch—Heat is deep and magma is shallow in a hot-spot system",
				publisher: "U.S. Geological Survey",
				year: 2001,
				url: "https://www.usgs.gov/news/volcano-watch-heat-deep-and-magma-shallow-a-hot-spot-system",
				appraisal: "high",
				stance: "context",
				note: "Field explanation distinguishing rising hot solid mantle from shallower zones where melting begins.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Are most natural diamonds made from coal?",
		slug: "are-most-natural-diamonds-made-from-coal",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Most natural diamonds crystallized from carbon-bearing fluids or melts deep in Earth's mantle, commonly long before coal-forming plants existed. Coal forms in the shallow crust from land plants and is not carried to the pressure-temperature settings where most gem diamonds grow.",
		stableCore: [
			"Mineral inclusions and isotopes place most diamonds roughly 150 to 200 kilometers deep in ancient continental mantle, with some even deeper.",
			"Volcanic kimberlite or lamproite magmas later transported diamonds rapidly toward the surface.",
			"Some diamond carbon was recycled from surface material by subduction, but recycled carbon is not equivalent to coal."
		],
		openQuestions: [
			"Which mantle fluids and reactions formed different diamond populations over billions of years?",
			"How much diamond carbon came from deep primordial reservoirs versus recycled surface carbon?"
		],
		whatWouldChangeMinds: [
			"Inclusions, ages, and isotope evidence showing coal-derived carbon dominates representative natural diamonds.",
			"A geologic transport pathway routinely carrying coal intact to diamond-forming mantle depths before crystallization."
		],
		misconceptions: [
			"Both coal and diamond contain carbon, but sharing an element does not establish a direct origin.",
			"Laboratory conversion of carbon to diamond does not describe the history of most natural stones.",
			"High pressure alone is not enough; chemistry, temperature, depth, and transport history matter."
		],
		editorSummary:
			"The coal story is memorable but geologically wrong for almost all natural diamonds. Mantle minerals, fluids, ages, and eruption pathways provide the direct evidence.",
		uncertaintySummary:
			"Diamonds form in several mantle settings and rarely preserve pristine fluids, so exact carbon pathways vary. The mismatch in age, depth, and environment rules out coal as the usual source.",
		sources: [
			{
				kind: "systematic_review",
				title: "Diamonds from the Deep: How Do Diamonds Form in the Deep Earth?",
				publisher: "Gems & Gemology, Gemological Institute of America",
				year: 2018,
				url: "https://www.gia.edu/gems-gemology/winter-2018-how-do-diamonds-form-in-the-deep-earth",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Technical review explaining mantle-fluid formation and explicitly rejecting coal as the source of natural diamonds.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Diamond Origin",
				publisher: "Gemological Institute of America",
				url: "https://4cs.gia.edu/en-us/diamond-origin/",
				appraisal: "high",
				stance: "supports",
				note: "Institutional overview of formation more than 160 kilometers deep and later kimberlite transport.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Diamonds and the Geology of Mantle Carbon",
				publisher: "Reviews in Mineralogy and Geochemistry",
				year: 2013,
				url: "https://doi.org/10.2138/rmg.2013.75.12",
				doi: "10.2138/rmg.2013.75.12",
				appraisal: "high",
				stance: "context",
				note: "Field review of diamond ages, inclusions, isotopes, and the deep carbon cycle.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Was petroleum made from dinosaurs?",
		slug: "was-petroleum-made-from-dinosaurs",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Most petroleum formed when organic matter—especially microscopic marine organisms, algae, and some plant material—was buried in sediments and transformed by heat and pressure over millions of years. Dinosaur remains were not the main source, and much source material predates dinosaurs.",
		stableCore: [
			"Organic-rich sediments are converted first into kerogen and then, within suitable temperature ranges, into oil and gas.",
			"Molecular biomarkers and carbon isotopes connect petroleum to source organisms and depositional environments.",
			"Oil must migrate from source rock into porous reservoirs and become trapped beneath sealing layers to accumulate."
		],
		openQuestions: [
			"How can geochemical signals best reconstruct mixed marine and terrestrial inputs in particular basins?",
			"Where do temperature history, microbes, and mineral catalysts most strongly alter petroleum composition?"
		],
		whatWouldChangeMinds: [
			"Representative oil biomarkers and source rocks showing vertebrate remains dominate global petroleum generation.",
			"A better mechanism explaining petroleum occurrence, chemistry, maturity, migration, and basin geology."
		],
		misconceptions: [
			"Fossil fuel means ancient biological carbon, not specifically large animal fossils.",
			"Coal and petroleum have overlapping organic origins but usually form from different source material and environments.",
			"A few animal contributions do not make dinosaurs the principal global source."
		],
		editorSummary:
			"The dinosaur explanation substitutes a vivid organism for the actual source communities. Petroleum geology instead follows organic-rich sediments, biomarkers, burial temperature, migration, and traps.",
		uncertaintySummary:
			"The mix of plankton, algae, bacteria, and terrestrial plant matter varies by petroleum system. The general biogenic sedimentary origin is strongly established.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Oil and petroleum products explained in depth",
				publisher: "U.S. Energy Information Administration",
				url: "https://www.eia.gov/energyexplained/oil-and-petroleum-products/in-depth.php",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Federal overview explaining formation from ancient marine plants and animals, including diatoms, before dinosaurs existed.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Rocks and Geology: Organic Residues and Rocks",
				publisher: "U.S. Geological Survey",
				url: "https://pubs.usgs.gov/bul/2195/b2195.pdf",
				appraisal: "high",
				stance: "supports",
				note: "USGS account distinguishing petroleum's mainly ancient marine organic source from coal's ancient land plants.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Diagenesis of metabolites and a discussion of the origin of petroleum hydrocarbons",
				publisher: "Geochimica et Cosmochimica Acta",
				year: 1960,
				url: "https://doi.org/10.1016/0016-7037(60)90036-3",
				doi: "10.1016/0016-7037(60)90036-3",
				appraisal: "moderate",
				stance: "context",
				note: "Peer-reviewed geochemical account of how sedimentary biological molecules can become petroleum hydrocarbons.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Can volcano monitoring forecast elevated eruption risk?",
		slug: "can-volcano-monitoring-forecast-elevated-eruption-risk",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		reviewMode: "living",
		bottomLine:
			"Often, yes. Changes in earthquakes, ground deformation, gas, heat, and water can show that magma or fluids are moving and allow probabilistic forecasts of elevated eruption risk. Forecasts cannot always specify exact timing, size, or style, and some steam-driven eruptions occur with little warning.",
		stableCore: [
			"Many magmatic eruptions are preceded by detectable unrest that departs from a volcano's established background.",
			"Combining seismic, deformation, gas, thermal, geologic-history, and satellite data is more informative than any single signal.",
			"Unrest can stop without eruption, and an eruption can evolve among several plausible scenarios."
		],
		openQuestions: [
			"Which signal combinations best forecast escalation across different volcano types?",
			"How can observatories quantify probabilities and communicate false alarms, missed events, and changing scenarios?"
		],
		whatWouldChangeMinds: [
			"Prospective evaluations showing multi-instrument monitoring performs no better than historical base rates.",
			"A new method consistently improving timing, magnitude, and style forecasts across volcanoes."
		],
		misconceptions: [
			"A forecast is not a guarantee that an eruption will occur.",
			"An earthquake swarm near a volcano is not automatically magma moving toward eruption.",
			"Most warning systems express changing probabilities and scenarios rather than a precise appointment."
		],
		editorSummary:
			"Volcano forecasting is more capable than exact earthquake prediction because unrest often develops over longer intervals, but it remains probabilistic and volcano-specific.",
		uncertaintySummary:
			"Performance varies with instrumentation, baseline history, eruption mechanism, and lead time. Steam explosions and poorly monitored volcanoes are especially difficult.",
		sources: [
			{
				kind: "guideline",
				title: "Volcano Hazards Program uses monitoring data and volcanic history to forecast eruptions",
				publisher: "U.S. Geological Survey",
				url: "https://www.usgs.gov/programs/VHP/vhp-uses-monitoring-data-and-volcanic-history-forecast-eruptions",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Operational framework for long- and short-term probabilistic eruption forecasts using multiple monitoring streams.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "How can we tell when a volcano will erupt?",
				publisher: "U.S. Geological Survey",
				year: 2026,
				url: "https://www.usgs.gov/faqs/how-can-we-tell-when-a-volcano-will-erupt",
				appraisal: "high",
				stance: "context",
				note: "Current explanation of common precursors, false alarms, and steam-blast events with little warning.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Volcanic and volcano-tectonic activity forecasting: a review on seismic approaches",
				publisher: "Annals of Geophysics",
				year: 2018,
				url: "https://doi.org/10.4401/ag-7655",
				doi: "10.4401/ag-7655",
				appraisal: "moderate",
				stance: "context",
				note: "Review of seismic precursors and short-term forecast tools across monitored volcanic systems.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "earth-and-geoscience",
		title: "Can groundwater pumping cause land subsidence?",
		slug: "can-groundwater-pumping-cause-land-subsidence",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Heavy groundwater withdrawal can lower pore-water pressure, compact susceptible clay and silt layers, and permanently lower the land surface. The amount and reversibility depend on aquifer geology, pumping history, and whether groundwater levels fall below previous lows.",
		stableCore: [
			"Aquifer compaction from pumping is a major documented cause of land subsidence worldwide.",
			"Satellite radar, leveling, GPS, groundwater levels, and borehole instruments can track deformation and connect it to withdrawals.",
			"Compaction can damage canals, roads, buildings, levees, wells, and aquifer storage capacity while increasing flood risk."
		],
		openQuestions: [
			"How much future subsidence can local aquifer systems tolerate before infrastructure or storage losses become unacceptable?",
			"Which pumping, recharge, and surface-water strategies best slow subsidence under drought and climate change?"
		],
		whatWouldChangeMinds: [
			"Well-monitored basins showing no deformation response when pumping lowers pressure in compressible sediments.",
			"An alternative mechanism consistently explaining the spatial and temporal alignment better than aquifer compaction."
		],
		misconceptions: [
			"Subsidence is not always a sudden sinkhole; it can be gradual across a broad region.",
			"Refilling an aquifer does not necessarily reverse compaction after fine-grained layers permanently reorganize.",
			"Groundwater pumping is one important cause, not the cause of every subsiding landscape."
		],
		editorSummary:
			"The mechanism and regional observations are well established. Management must be local because sediment compressibility, thresholds, recharge, and infrastructure exposure vary widely.",
		uncertaintySummary:
			"Monitoring can measure past and current deformation precisely, while future forecasts depend on uncertain pumping, recharge, layer properties, and delayed compaction.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Aquifer Compaction due to Groundwater Pumping",
				publisher: "U.S. Geological Survey",
				year: 2018,
				url: "https://www.usgs.gov/centers/land-subsidence-in-california/science/aquifer-compaction-due-groundwater-pumping",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "USGS explanation of pore-pressure decline, fine-grained sediment compaction, and infrastructure consequences.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Land Subsidence in the United States",
				publisher: "U.S. Geological Survey",
				year: 2000,
				url: "https://water.usgs.gov/ogw/pubs/fs00165/",
				appraisal: "high",
				stance: "supports",
				note: "National synthesis identifying excessive groundwater pumping as the largest single U.S. subsidence cause and explaining irreversible storage loss.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Regional land subsidence accompanying groundwater extraction",
				publisher: "Hydrogeology Journal",
				year: 2011,
				url: "https://doi.org/10.1007/s10040-011-0775-5",
				doi: "10.1007/s10040-011-0775-5",
				appraisal: "high",
				stance: "context",
				note: "Review of mechanisms, measurement, modeling, and management of pumping-related subsidence across regions.",
				order: 3
			}
		]
	})
];
