import type { ReadingGuideContent } from "./types";

export const spaceEvidenceGuide: ReadingGuideContent = {
	takeaway:
		"A space headline often moves from a detected signal to a model and then to a much stronger story. Keep those steps separate: what was measured, what the geometry explains, what a model assumes and what remains unknown.",
	scope: "An educational guide to interpreting astronomical observations, source-checked October 5, 2026 UTC. It is not an observing schedule, spacecraft specification, life-detection procedure or claim that a current mystery is solved. Historical mission examples are used for methods, not present-day discovery totals; independent expert review has not been completed.",
	sections: [
		{
			id: "motion-and-perspective",
			title: "1. A real appearance can have a misleading explanation",
			paragraphs: [
				{
					text: "A floating astronaut is not a demonstration that gravity has disappeared. The person and spacecraft share a falling trajectory, leaving little local support force. A scale and an orbit therefore answer different questions. Similarly, a dark region on the Moon does not tell you which object, if any, cast a shadow. Ordinary phases are a changing view of lunar daylight; an eclipse involves Earth's shadow. Start with the measurement before choosing its cause.",
					sources: ["orbit", "free-fall", "phases", "moon-questions"]
				},
				{
					text: "The same distinction helps with retrograde motion. A planet really can trace a backward segment against the stars on an Earth-based chart. That chart is a projection made from a moving observer, not a drawing of the planet reversing its path around the Sun. Earth's passing of Mars is an intuitive example. A physical reversal, an unusual spin direction and an apparent sky-coordinate reversal are separate propositions; sharing the word retrograde does not make them equivalent.",
					sources: ["planet-motion", "retrograde"]
				}
			]
		},
		{
			id: "brightness-and-distance",
			title: "2. Brightness is not a distance ranking",
			paragraphs: [
				{
					text: "Imagine two stars in a photograph, one brighter than the other. The brighter one need not be nearer: a star that emits much more light can remain bright at a greater distance. The photograph measures received light in particular wavelength channels, not intrinsic output alone. That is why a statement about a bright star should specify whether it means apparent brightness or inferred luminosity. Treating those as synonyms hides a necessary distance measurement.",
					sources: ["brightness"]
				},
				{
					text: "Parallax supplies a geometrical constraint by comparing apparent positions across an observing baseline. The illustration's large angular movement is deliberately exaggerated; real stellar shifts are tiny. Once distance is constrained, the light measurement can inform luminosity, with calibration and attenuation still relevant. A historical mission article can explain this chain without establishing today's catalog precision. Check whether the source is teaching a principle, reporting a particular dataset or promising a future capability.",
					sources: ["parallax", "brightness"]
				}
			]
		},
		{
			id: "time-of-the-light",
			title: "3. The arrival date is not the emission date",
			paragraphs: [
				{
					text: "A distant galaxy picture records light arriving at the detector now, not necessarily light emitted now. A long travel time lets astronomy examine earlier stages of cosmic history. But comparing many galaxies seen at different epochs is not a movie of one galaxy aging. A conclusion about development therefore adds population sampling and interpretation to the individual observations. Faint galaxies that escape detection can also limit how representative the visible sample is.",
					sources: ["lookback"]
				},
				{
					text: "Redshift helps place distant observations in cosmic context because expansion changes the wavelengths that reach us. It does not eliminate the need for a cosmological model when converting a measured spectrum into a time or distance. In an expanding universe, present-day separation and elapsed light-travel time are different quantities. Before comparing impressive distances in two headlines, ask whether the authors use the same definition. This guide makes no calculation for an unspecified galaxy and no claim about the newest record-holder.",
					sources: ["redshift", "lookback"]
				}
			]
		},
		{
			id: "read-the-image-legend",
			title: "4. A color map is not an invented observation",
			paragraphs: [
				{
					text: "Webb's public images translate filtered infrared signals into colors visible on a screen. Human eyes cannot see most of the wavelengths involved. The mission teams describe alignment, contrast rescaling and wavelength-to-color assignments as part of the workflow. Read the caption as a legend: which filters contributed, what was mapped and whether the image combines exposures. A chosen palette is not automatically a claim about how the scene would look to an astronaut's eyes.",
					sources: ["color", "image-processing"]
				},
				{
					text: "Two unhelpful extremes are to call every processed image fake or to treat every bright hue as a direct measurement of a material. A measured structure can be real while its presentation is purposefully selected. An artist's concept, on the other hand, may illustrate a hypothesized surface that was never spatially resolved. Processing metadata and an explicit observation-versus-illustration label matter more than vividness. The guide does not independently certify every pixel or every online image.",
					sources: ["image-processing", "color"]
				}
			]
		},
		{
			id: "planet-inference-chain",
			title: "5. A planet's size is not its complete identity",
			paragraphs: [
				{
					text: "A transit light curve is a record of changing starlight, not a resolved photograph of a planetary landscape. Its interpretation constrains relative size and orbital geometry; estimating an absolute radius also uses the host star. Dynamical observations provide different information about mass. Combining these constraints informs average density, but the move from density to an interior uses a model. Keep those links visible when a headline changes from a measured size to an Earth-like world.",
					sources: ["planet-methods", "density"]
				},
				{
					text: "Luque and Palle's small M-dwarf planet analysis illustrates why radius alone is insufficient. Its population categories are inferred using masses, radii and theoretical compositions. A water-rich interpretation does not by itself establish an exposed ocean, its state or a living environment. The paper's manuscript and final journal version are one study, not two independent confirmations. Better measurements can narrow possible interiors without making the inference chain disappear or extending that selected population to every planetary system.",
					sources: ["density"]
				}
			]
		},
		{
			id: "conditional-zone",
			title: "6. Potentially suitable does not mean inhabited",
			paragraphs: [
				{
					text: "The conventional habitable zone is a useful target-selection concept, not a visited surface. It concerns where surface liquid water could be possible under particular planetary and atmospheric assumptions. NASA explicitly separates that orbital label from a planet actually having a suitable environment and from it being inhabited. Ask which conditions were modeled and which were observed. A favorable incoming-light estimate cannot substitute for the missing atmosphere, water or environmental history.",
					sources: ["habitable", "zone-model"]
				},
				{
					text: "Kopparapu and colleagues' historical model varies planetary mass and atmospheric assumptions, making the conditional character especially clear. Cloud treatments and circulation can matter for a boundary, so a zone is not one immutable ring that certifies every world. Nor does the conventional surface-water criterion exhaust possible subsurface settings. Read the label at its intended scope instead of converting target prioritization into a probability of life. No biological procedure or definitive assessment of a currently proposed atmosphere is supplied here.",
					sources: ["zone-model", "habitable"]
				}
			]
		},
		{
			id: "count-independent-sources",
			title: "7. Several views need not mean several objects",
			paragraphs: [
				{
					text: "A gravitational lens can provide several distorted views of one background object. Different paths can also make the object's changes arrive at different times. Supernova Refsdal's later appearance is a particularly useful example: the model predicted another image before it was seen. That is a stronger interpretive check than noticing two objects with similar colors. It does not mean the source physically multiplied or exploded independently in every observed location.",
					sources: ["lensing", "refsdal"]
				},
				{
					text: "The lesson applies to evidence counting as well as image counting. An original report, its author manuscript and a mission news explanation can all describe overlapping observations. More links improve access and explanation but do not automatically add independent data. Exact lens masses and cosmological quantities still require models and calibration. Repeated views help test those models; they are not a direct identification of whatever particle might supply an inferred unseen mass.",
					sources: ["refsdal", "lensing"]
				}
			]
		},
		{
			id: "names-and-unknowns",
			title: "8. Naming an unknown does not solve it",
			paragraphs: [
				{
					text: "Dark energy is not a bottle of an identified substance. It is a name used for the unresolved explanation of cosmic acceleration in common cosmological descriptions. Historical supernova observations helped establish why acceleration required attention, but fitting the observed behavior differs from finding its physical cause. NASA discusses competing explanations; its program description should not be read as proof that a particular mechanism or the universe's final fate is known.",
					sources: ["dark-energy", "supernovae"]
				},
				{
					text: "A newer data release can strengthen or weaken a model preference without identifying a physical mechanism. DESI's March 2025 report describes strengthened hints of evolution; it is dated and is not an exhaustive review of later comparisons. This guide does not resolve that competition or combine reported significance levels. Across space headlines, keep four questions handy: what was measured, what model connects it to the claim, which assumptions might change and what observation would discriminate among the remaining explanations?",
					sources: ["desi", "dark-energy"]
				}
			]
		}
	],
	questions: [
		"What detector signal or geometrical observation supports the headline?",
		"Is the picture a measured composite, a diagram or an artist's concept?",
		"Which size, distance, time or composition was actually constrained?",
		"Are several citations or images independent evidence, or versions of one observation?",
		"Which assumptions separate a candidate world or model from a confirmed physical explanation?"
	],
	sources: [
		{
			id: "orbit",
			title: "NASA: What Is Microgravity?",
			url: "https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/",
			kind: "Agency explanation",
			note: "Free-fall distinction checked; the illustrative altitude-specific gravitational strength is not a current mission performance guarantee."
		},
		{
			id: "free-fall",
			title: "NASA Glenn: What is Microgravity?",
			url: "https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/",
			kind: "Agency explanation",
			note: "Mechanism and residual-acceleration context checked; same NASA provenance, not an independent trial."
		},
		{
			id: "phases",
			title: "NASA: Moon Phases",
			url: "https://science.nasa.gov/moon/moon-phases/",
			kind: "Agency explanation",
			note: "Illumination and observer geometry checked; no local forecast or eclipse schedule is inferred."
		},
		{
			id: "moon-questions",
			title: "NASA: Top Moon Questions",
			url: "https://science.nasa.gov/moon/top-moon-questions/",
			kind: "Agency explanation",
			note: "Explicit phases-versus-eclipse distinction checked; same lunar education program as the phase page."
		},
		{
			id: "planet-motion",
			title: "NASA: Planetary Motion",
			url: "https://science.nasa.gov/earth/earth-observatory/planetary-motion/",
			kind: "Historical agency explanation",
			note: "Apparent sky motion and orbital context checked; no behavioral or astrological effect is inferred."
		},
		{
			id: "retrograde",
			title: "NASA archive: The Planets",
			url: "https://cdaweb.gsfc.nasa.gov/pub/documents/archived_websites/pwg.gsfc.nasa.gov/stargaze/Splanets.htm",
			kind: "Archived teaching resource",
			note: "Earth-overtaking-Mars geometry checked; old discovery and mission context is not treated as current."
		},
		{
			id: "brightness",
			title: "ESA: Gaia's first year of scientific observations",
			url: "https://www.esa.int/Science_Exploration/Space_Science/Gaia/Gaia_s_first_year_of_scientific_observations",
			kind: "Historical mission explanation",
			note: "Received brightness, parallax and luminosity distinction checked; old mission totals are not reused."
		},
		{
			id: "parallax",
			title: "ESA: Measuring stellar distances by parallax",
			url: "https://www.esa.int/ESA_Multimedia/Images/2013/06/Measuring_stellar_distances_by_parallax",
			kind: "Mission diagram explanation",
			note: "Geometrical baseline checked; the drawing exaggerates the angle and its mission projections are historical."
		},
		{
			id: "lookback",
			title: "NASA: How Can Webb Study the Early Universe?",
			url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-can-webb-study-the-early-universe/",
			kind: "Mission explanation",
			note: "Light-travel delay and observing rationale checked; no newest-galaxy record or object-specific calculation."
		},
		{
			id: "redshift",
			title: "NASA: Hubble Cosmological Redshift",
			url: "https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-cosmological-redshift/",
			kind: "Mission explanation",
			note: "Spectral-shift and past-light context checked; model-dependent time and distance definitions remain explicit."
		},
		{
			id: "color",
			title: "NASA/STScI: How Are Webb's Full-Color Images Made?",
			url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-are-webbs-full-color-images-made/",
			kind: "Instrument-team explanation",
			note: "Filter mapping and contrast processing checked; no assumption of one palette for all images."
		},
		{
			id: "image-processing",
			title: "ESA/Webb: Image Processing",
			url: "https://esawebb.org/about/general/image-processing/",
			kind: "Mission explanation",
			note: "Measured exposures and display composition checked; shared Webb mission provenance, not independent replication."
		},
		{
			id: "planet-methods",
			title: "NASA: How We Find and Characterize",
			url: "https://science.nasa.gov/exoplanets/how-we-find-and-characterize/",
			kind: "Agency method explanation",
			note: "Detection and characterization methods checked; a transit is not a resolved planetary surface."
		},
		{
			id: "density",
			title: "Luque and Palle: Density, not radius, separates rocky and water-rich small planets",
			url: "https://arxiv.org/abs/2209.03871",
			kind: "Original author manuscript, Science 2022",
			note: "Original scope and disclosures checked; inferred interiors are not observed oceans, and raw observations were not reanalyzed."
		},
		{
			id: "habitable",
			title: "NASA: Reconnaissance of Potentially Habitable Worlds with Webb",
			url: "https://science.nasa.gov/blogs/webb/2024/06/05/reconnaissance-of-potentially-habitable-worlds-with-nasas-webb/",
			kind: "Dated mission explanation",
			note: "Conditional zone, environment and inhabited-status distinction checked; old target totals omitted."
		},
		{
			id: "zone-model",
			title: "Kopparapu et al.: Habitable Zones and Planetary Mass",
			url: "https://arxiv.org/abs/1404.5292",
			kind: "Original author manuscript, ApJL 2014",
			note: "Climate-model assumptions and funding checked; not final universal boundaries or observations of surface water."
		},
		{
			id: "lensing",
			title: "NASA: Hubble Gravitational Lenses",
			url: "https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-gravitational-lenses/",
			kind: "Mission explanation",
			note: "Repeated images and delayed paths checked; same Refsdal evidence as the original study, not a separate explosion."
		},
		{
			id: "refsdal",
			title: "Kelly et al.: The Reappearance of Supernova Refsdal",
			url: "https://arxiv.org/abs/1512.04654",
			kind: "Original author manuscript, ApJL 2016",
			note: "Predicted later image and acknowledgements checked; no independent lens fitting or precision cosmological estimate."
		},
		{
			id: "dark-energy",
			title: "NASA: Expand our Knowledge of Dark Energy",
			url: "https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/expand-our-knowledge-of-dark-energy/",
			kind: "Agency research-program explanation",
			note: "Unresolved mechanism distinguished from fitted behavior; not a proof of a constant or evolving component."
		},
		{
			id: "supernovae",
			title: "Riess et al.: Observational Evidence from Supernovae for an Accelerating Universe",
			url: "https://arxiv.org/abs/astro-ph/9805201",
			kind: "Original abstract, AJ 1998",
			note: "Historical inference and DOI identity checked; full analysis and acknowledgements not independently audited."
		},
		{
			id: "desi",
			title: "DESI: March 2025 report of evolving-dark-energy hints",
			url: "https://www.desi.lbl.gov/2025/03/19/more-than-a-hint-of-evolving-dark-energy-new-results-and-data-from-desi/",
			kind: "Dated collaboration update",
			note: "Reported hints checked; neither exhaustive coverage of later work nor a settled physical explanation is claimed."
		}
	]
};
