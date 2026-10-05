import type { SeedClaim } from "./claims.js";

export const spaceCheckedAt = "2026-10-05T00:03:21.338Z";
export const readerSpaceSlugs = {
	orbit: "are-astronauts-weightless-because-there-is-no-gravity-in-orbit",
	phases: "are-moon-phases-caused-by-earths-shadow",
	retrograde: "do-planets-reverse-their-orbits-during-retrograde-motion",
	lookback: "do-distant-galaxy-images-show-the-galaxies-as-they-are-now",
	color: "are-webbs-color-images-what-human-eyes-would-see",
	transit: "does-an-exoplanet-transit-alone-reveal-its-mass-and-composition",
	habitable: "does-being-in-the-habitable-zone-guarantee-a-habitable-planet",
	lensing: "can-gravitational-lensing-create-multiple-images-of-one-galaxy",
	darkEnergy: "does-dark-energy-mean-scientists-have-identified-the-cause-of-cosmic-acceleration",
	brightness: "does-a-brighter-looking-star-have-to-be-closer"
};
export const readerSpaceGaps = [
	{ slug: readerSpaceSlugs.orbit, gap: "Separates local free fall from an absent gravitational field, a mechanism question not answered by the existing Moon-landing review.", relatedExistingSlugs: ["did-humans-land-on-the-moon"] },
	{ slug: readerSpaceSlugs.phases, gap: "Distinguishes changing illumination geometry from eclipses, rather than repeating whether the lunar far side is permanently dark.", relatedExistingSlugs: ["is-the-far-side-of-the-moon-permanently-dark"] },
	{ slug: readerSpaceSlugs.retrograde, gap: "Explains apparent backward sky motion using a moving observer, rather than regrading astrology or claiming personal effects from planetary positions.", relatedExistingSlugs: ["does-astrology-predict-personality-or-events-better-than-chance"] },
	{ slug: readerSpaceSlugs.lookback, gap: "Addresses observation time and distance definitions for a galaxy image, not the existing question about cosmic horizons or expansion itself.", relatedExistingSlugs: ["is-the-observable-universe-necessarily-the-entire-universe"] },
	{ slug: readerSpaceSlugs.color, gap: "Explains wavelength-to-display mapping and measured images versus illustrations, a source-reading question absent from the existing astronomy catalog.", relatedExistingSlugs: [] },
	{ slug: readerSpaceSlugs.transit, gap: "Separates an inferred radius from mass, density and composition, instead of counting the established existence of exoplanets as a new answer.", relatedExistingSlugs: ["have-astronomers-confirmed-planets-orbiting-other-stars"] },
	{ slug: readerSpaceSlugs.habitable, gap: "Interprets a conditional climate-model region rather than repeating the broader question of whether extraterrestrial life has been confirmed.", relatedExistingSlugs: ["has-life-beyond-earth-been-scientifically-confirmed"] },
	{ slug: readerSpaceSlugs.lensing, gap: "Tests whether several observed images can belong to one background source, not whether dark matter's particle identity has been established.", relatedExistingSlugs: ["has-the-particle-identity-of-dark-matter-been-directly-detected"] },
	{ slug: readerSpaceSlugs.darkEnergy, gap: "Separates evidence for acceleration from identifying its physical explanation, distinct from expansion, dark-matter particles and the Hubble tension.", relatedExistingSlugs: ["is-the-universe-expanding", "does-the-hubble-tension-by-itself-disprove-the-big-bang-model"] },
	{ slug: readerSpaceSlugs.brightness, gap: "Distinguishes received light from intrinsic luminosity and a geometric distance, a measurement issue not covered by the existing solar-evolution review.", relatedExistingSlugs: ["will-the-sun-eventually-explode-as-a-supernova"] }
];

function source(entry: Omit<SeedClaim["sources"][number], "order">): SeedClaim["sources"][number] {
	return { order: 1, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: spaceCheckedAt, statusSources: [entry.url!], isAnchor: false, ...entry };
}

export const readerSpaceSources = {
	orbit: source({ kind: "technical_reference", title: "What Is Microgravity? (Grades 5-8)", publisher: "NASA", url: "https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/", stance: "supports", note: "Institutional explanation checked for co-falling spacecraft and occupants. Its roughly 90% low-orbit gravity example is altitude-specific, not an astronaut's measured apparent weight or a fixed value for every orbit." }),
	freeFall: source({ kind: "context", title: "What is Microgravity?", publisher: "NASA Glenn Research Center", url: "https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/", stance: "supports", note: "Primary agency explanation of free fall and residual acceleration checked. Same institution as the educational page, not an independent experiment or current spacecraft operating specification." }),
	phases: source({ kind: "technical_reference", title: "Moon Phases", publisher: "NASA Science", url: "https://science.nasa.gov/moon/moon-phases/", stance: "supports", note: "Institutional phase geometry and changing visible sunlit fraction checked. Do not confuse the Moon's unilluminated region with Earth's cast shadow or take this page as a dated local sky forecast." }),
	moonQuestions: source({ kind: "context", title: "Top Moon Questions", publisher: "NASA Science", url: "https://science.nasa.gov/moon/top-moon-questions/", stance: "supports", note: "Explicit phase-versus-eclipse distinction checked. Same lunar education program as the phase page; two explanations are not two independent observational studies." }),
	planetMotion: source({ kind: "technical_reference", title: "Planetary Motion: The History of an Idea That Launched the Scientific Revolution", publisher: "NASA Earth Observatory", year: 2009, url: "https://science.nasa.gov/earth/earth-observatory/planetary-motion/", stance: "supports", note: "Orbital-mechanics explanation and apparent retrograde context checked. Historical teaching page; neither its history narrative nor its illustration measures human behavior during retrograde periods." }),
	retrograde: source({ kind: "context", title: "The Planets", publisher: "NASA Goddard archived Stargazers to Starships", url: "https://cdaweb.gsfc.nasa.gov/pub/documents/archived_websites/pwg.gsfc.nasa.gov/stargaze/Splanets.htm", stance: "supports", note: "Archived agency teaching explanation of Earth overtaking Mars checked. Historical resource with dated mission context; only the geometrical explanation is used, not contemporary discovery totals." }),
	lookback: source({ kind: "technical_reference", title: "How Can Webb Study the Early Universe?", publisher: "NASA Science", url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-can-webb-study-the-early-universe/", stance: "supports", note: "Light-travel delay and infrared observing rationale checked. The broad method is used, not a newest-galaxy record, exact age for an unspecified object or a current record-holder claim." }),
	redshift: source({ kind: "context", title: "Hubble Cosmological Redshift", publisher: "NASA Science", url: "https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-cosmological-redshift/", stance: "supports", note: "Spectral-feature shifts and past-light observation checked. Cosmological conversion needs an expansion model; redshift is not treated as a universal simple velocity or distance clock." }),
	color: source({ kind: "technical_reference", title: "How Are Webb's Full-Color Images Made?", publisher: "NASA Science / STScI", url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-are-webbs-full-color-images-made/", stance: "supports", note: "Instrument team's explanation of filters, contrast rescaling and infrared-to-visible color assignments checked. Applies to the described composites, not a claim that every astronomical image uses one palette." }),
	imageProcessing: source({ kind: "context", title: "Image Processing", publisher: "ESA/Webb", url: "https://esawebb.org/about/general/image-processing/", stance: "supports", note: "Mission explanation of measured filtered exposures and color composition checked. NASA and ESA describe the shared Webb observatory; these pages are not independent instrument replications. An apparent unit typo in one example is not adopted." }),
	planetMethods: source({ kind: "technical_reference", title: "How We Find and Characterize", publisher: "NASA Science", url: "https://science.nasa.gov/exoplanets/how-we-find-and-characterize/", stance: "supports", note: "Transit, radial-velocity and imaging distinctions checked. This institutional overview is not a direct measurement of the mass or atmosphere of every listed planet; survey selection and host-star assumptions remain." }),
	density: source({ kind: "landmark_study", title: "Density, not radius, separates rocky and water-rich small planets orbiting M dwarf stars", publisher: "Science", year: 2022, doi: "10.1126/science.abl7164", url: "https://arxiv.org/abs/2209.03871", stance: "supports", note: "Original author manuscript checked for mass-plus-radius inference, population scope and disclosures. Interior categories are model interpretations, not photographed oceans. Supplements and underlying observations not independently reanalyzed; arXiv and journal versions are one study." }),
	habitable: source({ kind: "context", title: "Reconnaissance of Potentially Habitable Worlds with NASA's Webb", publisher: "NASA Science", year: 2024, url: "https://science.nasa.gov/blogs/webb/2024/06/05/reconnaissance-of-potentially-habitable-worlds-with-nasas-webb/", stance: "supports", note: "Agency explanation checked for the distinction between habitable-zone membership, actual habitability and inhabited status. Historical target counts are not repeated as current; atmospheric detection remains difficult." }),
	zoneModel: source({ kind: "landmark_study", title: "Habitable Zones Around Main-Sequence Stars: Dependence on Planetary Mass", publisher: "The Astrophysical Journal Letters", year: 2014, doi: "10.1088/2041-8205/787/2/L29", url: "https://arxiv.org/abs/1404.5292", stance: "supports", note: "Original author PDF checked for conditional one-dimensional climate models, atmospheric assumptions and funding. Not an observed guarantee of surface water or universal zone boundaries; manuscript and journal publication are one study." }),
	lensing: source({ kind: "technical_reference", title: "Hubble Gravitational Lenses", publisher: "NASA Science", url: "https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-gravitational-lenses/", stance: "supports", note: "Mission explanation of distorted, magnified and repeated images checked, including Refsdal's later appearance. The underlying lens model is required to identify copies; not every similar-looking object is the same source." }),
	refsdal: source({ kind: "landmark_study", title: "Deja Vu All Over Again: The Reappearance of Supernova Refsdal", publisher: "The Astrophysical Journal Letters", year: 2016, doi: "10.3847/2041-8205/819/1/L8", url: "https://arxiv.org/abs/1512.04654", stance: "supports", note: "Original author manuscript checked for the predicted later image, time-delay interpretation and acknowledgements. One supernova through several paths is not several independent explosions. No lens-fitting reanalysis or precision cosmological estimate performed." }),
	darkEnergy: source({ kind: "context", title: "Expand our Knowledge of Dark Energy", publisher: "NASA Science", url: "https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/expand-our-knowledge-of-dark-energy/", stance: "supports", note: "Institutional separation of acceleration evidence from a physical explanation checked. Used for unresolved mechanism, not as proof of a fixed equation of state or a forecast of the universe's final fate." }),
	supernovae: source({ kind: "landmark_study", title: "Observational Evidence from Supernovae for an Accelerating Universe and a Cosmological Constant", publisher: "The Astronomical Journal", year: 1998, doi: "10.1086/300499", url: "https://arxiv.org/abs/astro-ph/9805201", stance: "context", note: "Original abstract and DOI identity checked; full analysis and acknowledgements not audited. Historical distance-redshift inference supports why acceleration is studied, not direct detection of a dark-energy substance or contemporary parameter estimates." }),
	desi: source({ kind: "context", title: "More Than a Hint of Evolving Dark Energy: New Results and Data from DESI", publisher: "DESI Collaboration", year: 2025, url: "https://www.desi.lbl.gov/2025/03/19/more-than-a-hint-of-evolving-dark-energy-new-results-and-data-from-desi/", stance: "context", note: "Collaboration's dated report of strengthened hints checked. Not an exhaustive review of later analyses, proof of an identified mechanism or a declaration that evolving dark energy is settled. No significance calculation reproduced." }),
	brightness: source({ kind: "technical_reference", title: "Gaia's first year of scientific observations", publisher: "European Space Agency", year: 2015, url: "https://www.esa.int/Science_Exploration/Space_Science/Gaia/Gaia_s_first_year_of_scientific_observations", stance: "supports", note: "Mission explanation linking parallax distance to intrinsic luminosity checked. Historical first-year performance and discovery counts are not presented as current catalog specifications." }),
	parallax: source({ kind: "context", title: "Measuring stellar distances by parallax", publisher: "European Space Agency", year: 2013, url: "https://www.esa.int/ESA_Multimedia/Images/2013/06/Measuring_stellar_distances_by_parallax", stance: "supports", note: "Geometric baseline and apparent angular displacement checked. The illustration exaggerates the shift; its historical future-mission projections are not reused as current measured totals." })
};

const common = {
	topicSlug: "astronomy-and-space",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 85,
	searchDatabases: ["Consensus.app targeted exoplanet discovery", "NASA and ESA original mission explanations", "Original author manuscripts on arXiv", "Crossref DOI identity and linked-update metadata"],
	searchCutoffAt: spaceCheckedAt,
	inclusionRules: ["Separate the detector output, geometrical interpretation and model-dependent physical inference.", "Use original papers and mission explanations with explicitly scoped access and dates.", "Retain context, uncertainty and dependence between summaries of the same data."],
	exclusionRules: ["No newest-record, current catalog-count or exact future mission-date claims.", "No inhabited-world inference from a zone label, fitted density or attractive image.", "No invented expert vote, independent reanalysis, clinical recommendation or biological procedure."],
	appraisalTools: ["Structured observation-versus-inference and source-applicability assessment; no formal risk-of-bias score", "Version and institutional-source dependence check", "DOI identity and linked-update check, not exhaustive integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Agency summaries can describe the same mission and observations. Multiple images of one source and an article's manuscript are not independent votes. The legacy confidence score is editorial, not a measured fraction of researchers agreeing. No raw-data reanalysis or independent expert review was performed.",
	lastRetractionCheckAt: spaceCheckedAt
} satisfies Partial<SeedClaim>;

function sourcesFor(...entries: SeedClaim["sources"][number][]) {
	return entries.map((entry, index) => ({ ...entry, order: index + 1, isAnchor: index === 0 }));
}

function publication(id: string, summary: string, focus: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: spaceCheckedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: spaceCheckedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: { focus, cadenceDays: 90, watchTerms: [focus], integrityMonitors: ["Corrections and notices for cited original papers"], guidelineMonitors: ["NASA and ESA mission-method explanations"], triggerRules: ["Reassess when applicable observations, calibration or model assumptions materially change the scoped interpretation."] }
	};
}

export const readerSpaceClaims: SeedClaim[] = [
	{
		...common,
		title: "Are astronauts weightless because there is no gravity in orbit?",
		slug: readerSpaceSlugs.orbit,
		bottomLine: "No. In low Earth orbit, gravity remains substantial. Astronauts appear weightless because they and their spacecraft fall together while moving around Earth. A scale measures the support force, not simply the gravitational field. Residual drag, vibrations and tidal differences mean real microgravity is not perfect zero acceleration.",
		stableCore: ["NASA describes orbital floating as shared free fall, with gravity providing the acceleration that curves the spacecraft's path.", "Its educational low-orbit example places gravitational strength at roughly 90% of the surface value; that is an illustrative altitude-dependent field, not a reading on an onboard scale.", "The same distinction explains why a released object can remain beside a freely falling observer without gravity having vanished."],
		openQuestions: ["How large are residual accelerations in a particular spacecraft, instrument or maneuver?"],
		whatWouldChangeMinds: ["An alternative explanation must reconcile measured orbital trajectories, local support forces and residual accelerations, not just a video of floating objects."],
		misconceptions: ["Microgravity does not mean Earth stops pulling on a spacecraft.", "Feeling unsupported is not the same measurement as being outside a gravitational field."],
		misconceptionTags: ["weightless", "zero gravity", "free fall", "astronauts", "orbit"],
		editorSummary: "Ask what is being measured: a gravitational field, an orbital acceleration or the push from a floor. These differ. A stationary observer supported at the same altitude would not share the spacecraft's apparent weightlessness. This mechanism review is not a prescription for spacecraft design or a prediction of an individual astronaut's health.",
		uncertaintySummary: "The free-fall mechanism is well established; exact residual acceleration depends on the hardware, environment and motion. Agency teaching pages do not certify any current mission's microgravity performance.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "An illustrative orbit and field strength do not specify every orbital or experimental environment." }],
		evidenceSummaries: [{ question: "Does floating require gravity to vanish?", population: "Freely orbiting spacecraft and their occupants", finding: "Co-falling objects can be locally unsupported within a substantial gravitational field.", effectDirection: "supports", magnitude: "Mechanical distinction, not a universal residual-acceleration specification.", certainty: "high", limitations: ["Altitude dependence", "Non-gravitational perturbations", "Institutional explanations, not a new instrument trial"] }],
		institutionalAnchors: [{ name: "NASA Glenn Research Center", role: "Free-fall mechanism and measurement context" }],
		coiSummary: "Both explanations are NASA educational resources. Shared institutional provenance is disclosed; they are not two independent trials or an outside audit of agency hardware.",
		...publication("70e0f9f8-69ae-4bae-bac7-00e9e93c494d", "New review: orbital free fall versus absent gravity.", "Orbital free fall and microgravity"),
		sources: sourcesFor(readerSpaceSources.orbit, readerSpaceSources.freeFall)
	},
	{
		...common,
		title: "Are Moon phases caused by Earth's shadow?",
		slug: readerSpaceSlugs.phases,
		bottomLine: "No. Ordinary phases reflect how much of the Moon's sunlit hemisphere we can see as the Sun-Earth-Moon geometry changes. Earth's shadow causes a lunar eclipse, a different event. A crescent's dark portion is mostly lunar night, not a monthly shadow cast by Earth.",
		stableCore: ["NASA distinguishes the illuminated half of the Moon from the fraction visible to an observer on Earth.", "Full, quarter and crescent appearances follow changing viewing geometry; the Moon is not acquiring and losing its physical shape.", "A lunar eclipse requires the Moon to pass through Earth's shadow. Ordinary new and crescent phases do not require that alignment."],
		openQuestions: ["What are the exact phase, orientation and eclipse circumstances at a specified time and observing location?"],
		whatWouldChangeMinds: ["A different explanation would have to reproduce the observed phase sequence and separate eclipse alignments using measured Sun, Earth and Moon positions."],
		misconceptions: ["The unlit lunar region is not generally Earth's cast shadow.", "A quarter Moon refers to its place in the phase cycle, not a quarter of its visible disk being lit."],
		misconceptionTags: ["moon phases", "crescent", "Earth shadow", "lunar eclipse", "illumination"],
		editorSummary: "A shadow and an unilluminated hemisphere can both look dark but arise from different geometries. This question concerns the routine monthly appearance, not whether the far side receives daylight, which has a separate review. Read a phase diagram as a viewing arrangement rather than a change in the Moon's structure.",
		uncertaintySummary: "The mechanism is not a live scientific dispute. Exact viewing times and orientations require an ephemeris and local information; this explanation is not today's sky forecast or eclipse-safety advice.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "A schematic establishes the mechanism but not a location-specific observing schedule." }],
		evidenceSummaries: [{ question: "What creates the usual changing lunar appearance?", population: "Sun-Earth-Moon geometry outside eclipses", finding: "A changing view of the sunlit hemisphere, rather than Earth's shadow.", effectDirection: "supports", magnitude: "Geometrical relationship, not an agreement poll.", certainty: "high", limitations: ["Schematic geometry", "Eclipses are a separate configuration"] }],
		institutionalAnchors: [{ name: "NASA lunar science education", role: "Explicit distinction between phases and eclipses" }],
		coiSummary: "The two cited pages share NASA's lunar education program. They explain established geometry rather than providing independent experiments or a survey of astronomers.",
		...publication("abb32071-bd01-4712-bd42-aaf17f549812", "New review: Moon phases versus Earth's eclipse shadow.", "Lunar phase geometry"),
		sources: sourcesFor(readerSpaceSources.phases, readerSpaceSources.moonQuestions)
	},
	{
		...common,
		title: "Do planets reverse their orbits during retrograde motion?",
		slug: readerSpaceSlugs.retrograde,
		bottomLine: "No. Ordinary apparent retrograde motion is a temporary reversal of a planet's direction against background stars as seen from a moving Earth. It does not require that planet to turn around in its orbit. Earth's overtaking of Mars provides a clear example; genuinely retrograde orbital or spin directions are different concepts.",
		stableCore: ["NASA's orbital teaching material describes the backward-looking sky track as relative motion.", "When Earth overtakes a more slowly orbiting outer planet, the changing line of sight can produce an apparent loop against distant stars.", "A sky-coordinate direction, a planet's spin and the direction of its orbit around the Sun are different quantities."],
		openQuestions: ["What are the exact apparent track and timing for a particular planet and observing interval?"],
		whatWouldChangeMinds: ["Any replacement explanation must fit measured orbital positions and the apparent tracks from a moving observer, not just name a backward segment."],
		misconceptions: ["An apparent backward track is not evidence of an abrupt reversal of the planet's physical orbit.", "A geometrical explanation is not evidence that retrograde periods control personal events."],
		misconceptionTags: ["retrograde", "Mercury retrograde", "Mars", "orbital motion", "perspective"],
		editorSummary: "The observation is real: a planet's position can change direction on a sky chart. The mistaken step is interpreting an Earth-centered angular track as the planet's entire path around the Sun. A chart's coordinate system therefore has to be specified before a direction change is described as a physical event. Apparent retrograde motion does not settle separate questions about unusual orbital orientations or astrology.",
		uncertaintySummary: "The explanation of the familiar apparent effect is established. Individual tracks require current positional calculations. The archived NASA page is used for geometry, not current discoveries or forecasts.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "An angular sky projection is not a full three-dimensional orbital trajectory." }],
		evidenceSummaries: [{ question: "Must a planet reverse its orbit to move backward on a sky chart?", population: "Earth-based observations of Solar System planets", finding: "Relative orbital motion changes the observer's line of sight without the planet reversing its orbit.", effectDirection: "supports", magnitude: "Apparent direction depends on reference frame.", certainty: "high", limitations: ["Illustrative Mars geometry", "Specific dates not calculated"] }],
		institutionalAnchors: [{ name: "NASA orbital-mechanics education", role: "Measured motion interpreted in the observer's frame" }],
		coiSummary: "Both sources are NASA educational materials, one archived. Institutional dependence and historical context are explicit; neither is a behavioral study or independent astrology test.",
		...publication("6086f02d-1db3-40ea-85c8-9377fb663808", "New review: apparent retrograde motion and moving observers.", "Apparent planetary retrograde motion"),
		sources: sourcesFor(readerSpaceSources.planetMotion, readerSpaceSources.retrograde)
	},
	{
		...common,
		title: "Do distant galaxy images show the galaxies as they are now?",
		slug: readerSpaceSlugs.lookback,
		bottomLine: "No. We receive light emitted earlier, so a distant galaxy image shows an earlier stage of that galaxy. Greater cosmological distance generally means greater lookback time. In an expanding universe, light-travel time and present-day distance are different quantities; looking into the past is not traveling there or watching one galaxy's entire history.",
		stableCore: ["NASA's Webb explanation connects distant observations with the finite travel time of light.", "Cosmological expansion stretches emitted light, helping explain why infrared instruments are important for studying early galaxies.", "Interpreting a distant source's age or distance requires knowing what distance definition and expansion model are used, not just multiplying an unspecified distance label by a light-travel rule."],
		openQuestions: ["What lookback time follows for a particular measured redshift and specified cosmological model?", "How representative are the detectable early galaxies of those too faint to observe?"],
		whatWouldChangeMinds: ["Object-specific ages can change with revised spectra, source identification or cosmological parameters; that does not remove the finite light-travel delay."],
		misconceptions: ["The image arriving now was not necessarily emitted now.", "Images of many galaxies at different epochs are not a time-lapse film of one galaxy."],
		misconceptionTags: ["lookback time", "distant galaxies", "light years", "past", "redshift"],
		editorSummary: "Ask which time belongs to the telescope and which belongs to the emitting source. Comparing populations at several observed epochs helps reconstruct cosmic history, but the reconstruction is not a direct record of one object at every moment. This review supplies the interpretation, not a calculator or a newest-object record.",
		uncertaintySummary: "The observation delay is established. Exact inferred times and population histories depend on source classification, cosmological assumptions and selection effects. No precise distance or age for an unspecified galaxy is asserted.",
		uncertaintyDrivers: [{ type: "imprecision", detail: "Object-specific redshift and model parameters affect inferred ages and distances." }, { type: "generalizability", detail: "The observed bright population does not automatically represent every early galaxy." }],
		evidenceSummaries: [{ question: "Which stage of a distant galaxy reaches our detectors?", population: "Light received from cosmological sources", finding: "An earlier emitting state, with timing inferred in an expansion model.", effectDirection: "supports", magnitude: "Time delay, not a present-distance estimate or a current oldest-galaxy claim.", certainty: "high", limitations: ["Distance-definition dependence", "Source selection", "No object-specific computation"] }],
		institutionalAnchors: [{ name: "NASA Webb and Hubble science", role: "Light-travel and spectral interpretation" }],
		coiSummary: "The mission explanations share NASA and partner-observatory provenance. Educational summaries are not two independent cosmological datasets or an audit of raw galaxy spectra.",
		...publication("cbed88a7-8ef6-4278-af59-aa2bb8f4a4d1", "New review: galaxy images and lookback time.", "Galaxy lookback time and distance definitions"),
		sources: sourcesFor(readerSpaceSources.lookback, readerSpaceSources.redshift)
	},
	{
		...common,
		title: "Are Webb's color images what human eyes would see?",
		slug: readerSpaceSlugs.color,
		bottomLine: "Usually not. Webb primarily measures infrared wavelengths that human eyes cannot see. Public composites map filtered measurements into visible colors and rescale contrast to reveal structure. Those choices do not make the observations imaginary, but the display is not an unprocessed view through a human eye. An artist's concept is a different kind of illustration.",
		stableCore: ["NASA/STScI and ESA describe filtered detector exposures as the observational starting point.", "Color assignments translate wavelength channels into a display, while alignment and contrast processing make information visible.", "The caption and filter metadata explain the image's encoding; a displayed hue does not by itself identify a material, temperature or naked-eye appearance."],
		openQuestions: ["Which filters, scaling and compositing decisions produced a particular released image?"],
		whatWouldChangeMinds: ["Image-specific interpretation should be revised if detector calibration, artifact identification or published processing metadata changes."],
		misconceptions: ["Mapped color is not evidence that the measured astronomical structure was invented.", "A processed observation and an artist's imagined surface are not interchangeable evidence."],
		misconceptionTags: ["Webb images", "infrared", "false color", "telescope photos", "image processing"],
		editorSummary: "Read an astronomical image like a map with a legend. The signal can be measured while its presentation is deliberately chosen. Brightness rescaling means screen contrast is not a raw light-ratio measurement. Look for observation credits, filters and processing notes before inferring a physical property from a vivid color.",
		uncertaintySummary: "The broad processing workflow is documented, but the exact palette and representation vary by release. This review does not independently validate every pixel, quantify each artifact or certify all images encountered online.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Visible display channels encode filtered measurements rather than human-eye appearance." }],
		evidenceSummaries: [{ question: "What does the visible palette represent?", population: "Documented Webb infrared composites", finding: "A mapped presentation of measured wavelength channels, not a naked-eye color photograph.", effectDirection: "supports", magnitude: "Encoding and processing distinction, not a claim about every telescope or palette.", certainty: "high", limitations: ["Image-specific mapping", "Calibration and artifacts", "Shared observatory descriptions"] }],
		institutionalAnchors: [{ name: "STScI and ESA/Webb", role: "Original instrument and image-processing explanations" }],
		coiSummary: "NASA/STScI and ESA describe their shared observatory and outreach products. Mission involvement is disclosed; these descriptions are not independent validations of every release or a viewer study.",
		...publication("9c0e1195-a4fd-476e-b909-8d9ea649eb52", "New review: Webb color mapping and observed signals.", "Infrared image display and calibration"),
		sources: sourcesFor(readerSpaceSources.color, readerSpaceSources.imageProcessing)
	},
	{
		...common,
		title: "Does an exoplanet transit alone reveal its mass and composition?",
		slug: readerSpaceSlugs.transit,
		bottomLine: "No. A transit light curve primarily constrains how large a planet is relative to its star, along with orbital and geometric information. Mass normally needs additional dynamical information, such as stellar radial velocity or transit-timing variations. Even mass and radius together constrain average density, not a unique interior or proof of an ocean.",
		stableCore: ["NASA distinguishes a brightness dip from the host star's gravitational wobble; the methods supply different information.", "Converting a transit's depth into an absolute radius depends on the star and the modeled transit geometry. A brightness dip is not a resolved picture of the planet's surface.", "Luque and Palle's 2022 analysis combines masses and radii for small transiting M-dwarf planets. Its compositional groups are model interpretations, not direct sightings of water or a universal rule for every star."],
		openQuestions: ["Which interior and atmospheric models remain compatible with a particular planet's measured mass, radius and spectrum?", "How do stellar uncertainty and detection selection affect inferred population categories?"],
		whatWouldChangeMinds: ["More precise dynamical masses, host-star characterization or atmospheric spectra can discriminate among interpretations without turning a transit depth into a complete composition measurement."],
		misconceptions: ["Earth-sized does not mean Earth-mass or Earth-like composition.", "A water-rich interior interpretation is not proof of an exposed liquid ocean."],
		misconceptionTags: ["exoplanet transit", "planet mass", "radius", "density", "water worlds"],
		editorSummary: "Keep the inference chain visible: a light curve informs size; dynamical data inform mass; the combination informs density; an interior model supplies possible compositions. Each link adds assumptions. The 2022 population study illustrates why radius alone is inadequate; this review does not endorse every proposed formation mechanism in that paper.",
		uncertaintySummary: "Measurement uncertainties, stellar parameters and model degeneracy limit individual interiors. The cited population analysis concerns small planets around M dwarfs, not all exoplanets. Its supplements and underlying observations were not independently reanalyzed.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Density-to-composition conversion needs an interior model." }, { type: "generalizability", detail: "A selected transiting M-dwarf population cannot specify every planetary system." }],
		evidenceSummaries: [{ question: "Does size establish mass or a unique interior?", population: "Transit observations and a small M-dwarf planet population study", finding: "Additional dynamical information and explicit interior models are needed; radius is not composition.", effectDirection: "supports", magnitude: "Different observables constrain different properties; no universal planet classification accuracy asserted.", certainty: "moderate", limitations: ["Host-star calibration", "Detection selection", "Nonunique interiors"] }],
		institutionalAnchors: [{ name: "NASA Exoplanet Exploration", role: "Detection and characterization method distinctions" }],
		coiSummary: "Luque and Palle acknowledge Spanish public research support, University of La Laguna and EU Next Generation funding and declare no competing interests. Their manuscript and journal paper are one study; disclosures were checked, not independently investigated.",
		...publication("13f386b6-4c99-4796-9abf-f6c09950ae47", "New review: transit size, dynamical mass and interior inference.", "Exoplanet size mass and composition inference"),
		sources: sourcesFor(readerSpaceSources.planetMethods, readerSpaceSources.density)
	},
	{
		...common,
		title: "Does being in the habitable zone guarantee a habitable planet?",
		slug: readerSpaceSlugs.habitable,
		bottomLine: "No. The conventional habitable zone identifies stellar distances where surface liquid water could be possible under specified planetary and atmospheric assumptions. It does not establish that a particular planet has water, a suitable atmosphere or life. Other environments, including subsurface settings, are not ruled out solely by being outside that conventional zone.",
		stableCore: ["NASA explicitly distinguishes a potentially suitable orbit from actual habitability and from inhabited status.", "Kopparapu and colleagues' 2014 calculations vary planetary mass and atmospheric assumptions in a one-dimensional climate model, demonstrating that a zone boundary is conditional rather than a universal distance.", "The modeled surface-water criterion is narrower than every possible environment that might support life; it is useful for target selection without being a biological detection."],
		openQuestions: ["Does a selected planet retain an atmosphere and surface water under its actual history and stellar environment?", "How do three-dimensional circulation, clouds and rotation change specific climate boundaries?"],
		whatWouldChangeMinds: ["Applicable atmospheric observations and better constrained planetary properties could support or reject habitability for a particular target; a zone label alone cannot do so."],
		misconceptions: ["Potentially habitable is neither definitely habitable nor inhabited.", "Earth-size and suitable incoming starlight do not specify Earth's atmosphere or climate."],
		misconceptionTags: ["habitable zone", "Goldilocks zone", "Earth-like", "surface water", "planet atmosphere"],
		editorSummary: "A target-selection label summarizes a conditional model, not a visited environment. Read the modeled atmosphere, climate criterion and uncertainties before upgrading a headline into a discovery of another Earth. The review does not offer a life-detection protocol or declare any proposed atmosphere conclusively established.",
		uncertaintySummary: "Specific surface conditions are often weakly constrained. The historical 2014 model documents assumptions, not final universal limits; the 2024 NASA explanation's target totals are not reproduced as current. The term's usefulness does not remove object-level uncertainty.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "A model-based region is not an observation of a planet's surface." }, { type: "generalizability", detail: "Atmospheric and stellar assumptions do not fit every world or subsurface environment." }],
		evidenceSummaries: [{ question: "Does a modeled zone establish a world's actual conditions?", population: "Conventional surface-water habitable-zone models and candidate exoplanets", finding: "Zone membership is conditional and requires further planetary characterization.", effectDirection: "supports", magnitude: "Possibility under assumptions, not a measured probability of life.", certainty: "moderate", limitations: ["Atmospheric assumptions", "Cloud and circulation modeling", "Unknown planetary histories"] }],
		institutionalAnchors: [{ name: "NASA Webb science", role: "Explicit distinction between candidate environment and verified conditions" }],
		coiSummary: "Kopparapu et al. acknowledge NASA Virtual Planetary Laboratory, Penn State and European Research Council support. The model paper and its manuscript are one work, and mission explanations can share authors or assumptions; no independent funding investigation was performed.",
		...publication("3c0081f6-6e76-41dc-af8d-51e5c263311d", "New review: habitable-zone membership versus actual conditions.", "Conditional habitable-zone interpretation"),
		sources: sourcesFor(readerSpaceSources.habitable, readerSpaceSources.zoneModel)
	},
	{
		...common,
		title: "Can gravitational lensing create multiple images of one galaxy?",
		slug: readerSpaceSlugs.lensing,
		bottomLine: "Yes. A foreground mass can bend light from a background source along different paths, producing distorted or repeated images of the same object. The paths can have different travel times, so changes in one source may arrive at different times. This does not mean the source was physically duplicated, and identification requires more than visual resemblance.",
		stableCore: ["NASA's Hubble explanation describes magnification, arcs and multiple images as consequences of lens geometry and mass distribution.", "Supernova Refsdal's later image was predicted and subsequently observed; Kelly and colleagues report its reappearance in the original study.", "Repeated images share an underlying source. Time delays and brightness differences carry information about the lens, but precise interpretation requires a mass model."],
		openQuestions: ["Which lens mass model best explains a given system's positions, magnifications and delays?"],
		whatWouldChangeMinds: ["Spectra, resolved structure or inconsistent time variation can revise an identification; better delay and mass constraints can revise a specific lens model."],
		misconceptions: ["Several images need not be several galaxies or separate explosions.", "A mass-distribution inference is not a direct identification of a dark-matter particle."],
		misconceptionTags: ["gravitational lensing", "multiple images", "Einstein cross", "Refsdal", "time delays"],
		editorSummary: "Count independent objects carefully when reading a crowded telescope image. Lensing can turn one source into several observed views. Refsdal is a particularly useful example because a predicted later appearance adds a time-domain check; its images are not independent supernovae that can be counted as separate votes.",
		uncertaintySummary: "Multiple imaging is established, while individual mass maps and precise cosmological estimates remain model-dependent. The cited event was not refit here; the original manuscript, journal article and agency summary describe overlapping evidence.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Image positions and delays constrain mass through a lens model, not a direct census of material." }],
		evidenceSummaries: [{ question: "Can one changing source arrive through several delayed paths?", population: "Strongly lensed galaxies and supernova Refsdal", finding: "Repeated images and a later predicted appearance support the multi-path interpretation.", effectDirection: "supports", magnitude: "One physical source, several observed images; no precision expansion-rate estimate reproduced.", certainty: "high", limitations: ["Lens-model dependence", "Source identification", "One event is not independent repeated explosions"] }],
		institutionalAnchors: [{ name: "NASA/ESA Hubble observations", role: "Documented lens systems and predicted later image" }],
		coiSummary: "Kelly et al. acknowledge HST/STScI programs, NASA and NSF support, fellowships and foundation assistance. The agency explanation and original report share the Refsdal observation; acknowledgements were checked, not independently investigated.",
		...publication("93506b2b-6449-498c-aabd-79a304bb713f", "New review: repeated lens images and delayed light paths.", "Strong lensing repeated images and time delays"),
		sources: sourcesFor(readerSpaceSources.lensing, readerSpaceSources.refsdal)
	},
	{
		...common,
		title: "Does dark energy mean scientists have identified the cause of cosmic acceleration?",
		slug: readerSpaceSlugs.darkEnergy,
		bottomLine: "No. Dark energy names the unresolved explanation of cosmic acceleration within common cosmological descriptions; it is not a directly identified material. Distance and expansion-history observations constrain possible explanations. Whether a cosmological constant, evolving component or a different gravitational description is needed remains a physical question, not settled merely by assigning a name.",
		stableCore: ["NASA separates observational support for acceleration from knowledge of dark energy's physical nature.", "Riess and colleagues' 1998 supernova work inferred acceleration from distance-redshift behavior; that historical analysis did not isolate a substance in a laboratory.", "DESI's March 2025 collaboration report describes strengthened hints of evolution. It is a dated evidence update, not by itself proof of a particular mechanism or a complete survey of later analyses."],
		openQuestions: ["Is the relevant expansion-history description consistent with a constant or an evolving component under robust combinations of data?", "Which physical theory explains the observations without unresolved parameter or calibration tensions?"],
		whatWouldChangeMinds: ["Independent expansion-history and structure measurements with tested systematics can discriminate among descriptions; identifying a physical cause requires more than naming a fitted term."],
		misconceptions: ["Dark energy and dark matter are not interchangeable names for one identified particle.", "A preference for a model extension is not a direct detection of its underlying mechanism."],
		misconceptionTags: ["dark energy", "cosmic acceleration", "cosmological constant", "evolving dark energy", "expansion history"],
		editorSummary: "Separate three questions: whether a model fits the observed expansion, whether its parameters are constant and what physically produces the behavior. Evidence can improve on the first two without settling the third. The historical supernova citation supplies context, not today's best-fit parameters or a claim that every current analysis agrees.",
		uncertaintySummary: "The mechanism is unresolved and comparisons depend on datasets, calibration and model assumptions. This bounded review does not decide the latest constant-versus-evolving model competition, quote a pooled significance or forecast the universe's final fate. Full 1998 analysis and newer underlying survey data were not independently audited.",
		uncertaintyDrivers: [{ type: "inconsistency", detail: "Model preferences can vary with data combinations and calibration choices." }, { type: "indirectness", detail: "Expansion-history inference does not identify a physical substance." }],
		evidenceSummaries: [{ question: "Does an acceleration inference identify its physical cause?", population: "Cosmological distance and expansion-history observations", finding: "Observations constrain descriptions without uniquely identifying a mechanism.", effectDirection: "supports", magnitude: "No current density fraction, pooled significance or final-fate probability asserted.", certainty: "moderate", limitations: ["Model and dataset dependence", "Historical abstract-only citation", "No exhaustive current model comparison"] }],
		institutionalAnchors: [{ name: "NASA Physics of the Cosmos", role: "Unresolved physical explanation distinguished from observed behavior" }],
		coiSummary: "NASA and DESI report research from their own programs or collaboration. Riess et al.'s original abstract was checked, but its full acknowledgements were not audited. No claim of absent conflicts or independent confirmation of all recent model preferences is made.",
		...publication("88c7edd1-5bd7-4b3d-8d4e-f6fbdf6ac4f6", "New review: cosmic acceleration versus an identified mechanism.", "Dark-energy interpretation and physical mechanism"),
		sources: sourcesFor(readerSpaceSources.darkEnergy, readerSpaceSources.supernovae, readerSpaceSources.desi)
	},
	{
		...common,
		title: "Does a brighter-looking star have to be closer?",
		slug: readerSpaceSlugs.brightness,
		bottomLine: "No. Apparent brightness depends on both intrinsic luminosity and distance, as well as attenuation along the line of sight and the wavelength measured. A luminous distant star can outshine a dim nearby one. Parallax provides a geometrical distance constraint, allowing astronomers to separate received brightness from intrinsic luminosity rather than ranking distances by appearance alone.",
		stableCore: ["ESA's Gaia explanation distinguishes apparent brightness from luminosity inferred using a distance.", "Annual parallax is an apparent positional change caused by the observing baseline around the Sun; nearer stars generally have a larger angle.", "An apparent light level is not a distance by itself. Calibration, wavelength and intervening material must be accounted for when inferring stellar properties."],
		openQuestions: ["How do parallax precision, source multiplicity and attenuation affect a particular star's distance and luminosity?"],
		whatWouldChangeMinds: ["Improved astrometry, extinction estimates or identification of unresolved companions can revise a star's inferred distance or intrinsic luminosity."],
		misconceptions: ["Brighter on the sky does not necessarily mean closer or physically larger.", "A parallax illustration's exaggerated angle is not an actual naked-eye wobble."],
		misconceptionTags: ["stellar brightness", "star distance", "luminosity", "parallax", "Gaia"],
		editorSummary: "A picture's brightness ranking is not a distance ranking. Ask whether the claim uses received flux, intrinsic output or an angular shift across time. This review uses historical Gaia explanations for the measurement principle, not their old performance projections as current mission statistics.",
		uncertaintySummary: "The measurement distinction is established, while object-level precision depends on calibration and source properties. No distance or luminosity is calculated for an unspecified star, and no current catalog precision is promised.",
		uncertaintyDrivers: [{ type: "imprecision", detail: "Small angular shifts and calibration errors affect individual distance estimates." }, { type: "indirectness", detail: "Luminosity inference uses distance, attenuation and a defined wavelength range." }],
		evidenceSummaries: [{ question: "Can apparent brightness uniquely determine stellar distance?", population: "Stellar photometry and geometric parallax measurements", finding: "Received light and intrinsic luminosity are distinct; a separate distance constraint is needed.", effectDirection: "supports", magnitude: "No brightness-to-distance ranking rule or current catalog error rate asserted.", certainty: "high", limitations: ["Measurement calibration", "Intervening attenuation", "Historical mission descriptions"] }],
		institutionalAnchors: [{ name: "European Space Agency Gaia", role: "Geometric distance and luminosity interpretation" }],
		coiSummary: "Both cited explanations belong to ESA's Gaia outreach. Shared mission provenance is explicit; these historical pages are not independent trials or present-day performance guarantees.",
		...publication("e98ab166-5f23-4b19-88cd-cd9b08dba641", "New review: apparent brightness versus geometric stellar distance.", "Stellar brightness distance and parallax"),
		sources: sourcesFor(readerSpaceSources.brightness, readerSpaceSources.parallax)
	}
];
