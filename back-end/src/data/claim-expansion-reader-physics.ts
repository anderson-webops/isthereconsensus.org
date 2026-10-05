import type { SeedClaim } from "./claims.js";

export const physicsCheckedAt = "2026-10-05T03:18:13.000Z";

function textbook(section: string, title: string, note: string): SeedClaim["sources"][number] {
	return {
		kind: "technical_reference",
		title: `College Physics 2e: ${title}`,
		publisher: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs",
		year: 2022,
		url: `https://openstax.org/books/college-physics-2e/pages/${section}`,
		stance: "supports",
		note,
		order: 1
	};
}

export const readerPhysicsSources = {
	temperature: textbook("13-1-temperature", "Temperature", "Original temperature and equilibrium definitions checked. Temperature is not a universal formula for the complete internal energy of every substance. No thermometer or material sample was independently calibrated."),
	heat: textbook("14-1-heat", "Heat", "Original distinction between energy transfer and internal energy checked. Work is a separate transfer mode. Simplified molecular illustrations are not adopted as universal microscopic descriptions of solids or quantum systems."),
	capacity: textbook("14-2-temperature-change-and-heat-capacity", "Temperature Change and Heat Capacity", "Original mass, material and phase qualifications for heat capacity checked. The simple heating relation assumes an applicable heat capacity and excludes phase change and other energy transfers; it is not an absolute stored-energy formula."),
	phase: textbook("14-3-phase-change-and-latent-heat", "Phase Change and Latent Heat", "Original constant-pressure phase-coexistence and latent-energy distinction checked. Illustrative temperatures are not universal for mixtures or varying pressure. Unrelated humidity, hazardous-material and practical experiment examples are not adopted."),
	vapor: textbook("13-6-humidity-evaporation-and-boiling", "Humidity, Evaporation, and Boiling", "Original surface evaporation, vapor pressure and boiling distinctions checked. No drying schedule, pressure-vessel instructions or biological processing procedure is supplied."),
	conduction: textbook("14-5-conduction", "Conduction", "Original same-temperature contact example and conduction/insulation explanation checked. Contact sensation depends on transient heat exchange, not conductivity alone. No building code, insulation installation or safe-touch determination is made."),
	radiation: textbook("14-7-radiation", "Radiation", "Original thermal emission and net radiative exchange explanation checked. Simplified greenhouse temperature, cloud-feedback and glass-analogy passages are not used as current climate evidence. No exposure or equipment-safety limit is inferred."),
	refraction: textbook("25-3-the-law-of-refraction", "The Law of Refraction", "Original refractive-index, speed and ray-direction definitions checked. Ordinary transparent-media geometry is the scope, not every dispersive phase/group velocity or a claim about information moving faster than light."),
	dispersion: textbook("25-5-dispersion-the-rainbow-and-prisms", "Dispersion: The Rainbow and Prisms", "Original wavelength-dependent refraction and observer-dependent rainbow geometry checked. The diagram's total-internal-reflection wording is not assumed for every rainbow ray. No fixed rainbow location, nonlinear frequency conversion or viewing-safety instructions are claimed."),
	lenses: textbook("25-6-image-formation-by-lenses", "Image Formation by Lenses", "Original real/virtual and diverging-lens ray examples checked. Conclusions assume a real object and ordinary thin-lens optics in the stated surrounding medium; compound optics and virtual objects require separate analysis."),
	mirrors: textbook("25-7-image-formation-by-mirrors", "Image Formation by Mirrors", "Original plane and curved mirror image distinctions checked. Backward ray extensions are geometric constructions, not actual light propagating behind an opaque mirror. A virtual image can still be seen or photographed using another imaging system."),
	resolution: textbook("27-6-limits-of-resolution-the-rayleigh-criterion", "Limits of Resolution: The Rayleigh Criterion", "Original ordinary diffraction-limited imaging explanation checked. The Rayleigh criterion is not a universal limit for every super-resolution, near-field or computational method. No biological imaging procedure or equipment performance certificate is provided."),
	polarization: textbook("27-8-polarization", "Polarization", "Original orientation-sensitive transmission and partially polarized reflection explanation checked. Polarization alone does not establish ultraviolet protection, eye safety or complete elimination of glare. No viewing experiment or product recommendation is reproduced."),
	calibration: {
		kind: "technical_reference",
		title: "Calibration and Measurement Procedures for a High Magnification Thermal Camera",
		publisher: "NIST; Brandon Lane and Eric Whitenton",
		year: 2016,
		url: "https://www.nist.gov/publications/calibration-and-measurement-procedures-high-magnification-thermal-camera",
		doi: "10.6028/NIST.IR.8098",
		stance: "supports",
		order: 1,
		note: "Original report abstract and DOI identity checked for surface measurement, calibration and uncertainty. The full calibration derivation and apparatus were not audited or reproduced. Crossref supplied no linked update at this check; that is not exhaustive integrity clearance."
	},
	emissivity: {
		kind: "context",
		title: "Emissivity of Building Materials for Infrared Measurements",
		publisher: "Sensors; Eva Barreira, Ricardo M. S. F. Almeida and Maria L. Simões",
		year: 2021,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8002048/",
		doi: "10.3390/s21061961",
		pmid: "33799589",
		pmcid: "PMC8002048",
		stance: "supports",
		order: 1,
		note: "Fetched Consensus record and original author abstract/results passages checked: nine dry materials and three drying materials illustrate emissivity variation, not a universal error allowance. Publisher opening failed and later PMC disclosure requests encountered a challenge. Full methods, funding and conflicts were not audited. The generated takeaway's 'up to 10%' wording is not adopted; the abstract allows greater variation. DOI identity and linked-update metadata checked, not exhaustive integrity clearance."
	},
	walls: {
		kind: "technical_reference",
		title: "Can Thermal Imaging See Through Walls? And Other Common Questions",
		publisher: "FLIR",
		year: 2019,
		url: "https://www.flir.com/en-ca/discover/home-outdoor/can-thermal-imaging-see-through-walls/",
		stance: "supports",
		order: 1,
		note: "Original manufacturer explanation checked for opaque-wall surface patterns versus direct transmission. Manufacturer commercial interest is retained; this is not independent performance testing. Blanket glass/transmission statements are not extended to all infrared bands or materials. No surveillance, evasion or building-inspection procedure is supplied."
	},
	visible: {
		kind: "technical_reference",
		title: "Visible Light",
		publisher: "NASA Science",
		url: "https://science.nasa.gov/ems/09_visiblelight/",
		stance: "supports",
		order: 1,
		note: "Original visible-spectrum and prism explanation checked. Approximate wavelength ranges are illustrative. The page's simplified solar peak-color and flame-temperature statements are not adopted; apparent color alone is not an exact spectrum or a universal thermometer."
	},
	metre: {
		kind: "technical_reference",
		title: "SP 330: The International System of Units, Section 2",
		publisher: "NIST",
		url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-2",
		stance: "supports",
		order: 1,
		note: "Original SI vacuum-speed definition checked. The defined constant is exactly 299,792,458 m/s in vacuum; it is not the phase speed in every material. Historical measurement uncertainty is not attached to the exact defined constant."
	},
	sky: {
		kind: "technical_reference",
		title: "Why Is the Sky Blue?",
		publisher: "NASA Space Place",
		url: "https://spaceplace.nasa.gov/blue-sky/en/",
		stance: "supports",
		order: 1,
		note: "Original atmospheric scattering and changing path-length explanation checked. Molecular scattering describes the ordinary clear daytime sky, not every cloudy/aerosol condition or another planet. Teaching shortcuts about all light traveling straight and prisms necessarily being crystals are not adopted."
	}
} satisfies Record<string, SeedClaim["sources"][number]>;

interface PhysicsReview {
	key: string;
	id: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	tags: string[];
	sources: Array<keyof typeof readerPhysicsSources>;
}

const reviews: PhysicsReview[] = [
	{
		key: "energy",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a001",
		title: "Do two objects at the same temperature contain the same internal energy?",
		slug: "do-two-objects-at-the-same-temperature-contain-the-same-internal-energy",
		bottomLine: "No. Temperature is an intensive property, not a count of all the energy in an object. Mass, material, phase and the chosen energy reference matter. Two water samples at the same temperature can have different amounts of internal energy because their sizes differ. Equal temperature establishes thermal equilibrium under appropriate contact conditions, not equal energy inventories.",
		stableCore: ["Heat capacity describes how much energy a specified sample needs for a temperature change along a specified process. It is not interchangeable with the temperature itself or a universal equation for absolute internal energy.", "Comparisons across different materials require more than a thermometer reading. Molecular interactions, phase and the reference used to describe energy also matter, so one temperature cannot reconstruct the complete thermodynamic state."],
		editorSummary: "A warm cup and a larger warm container illustrate the size distinction without establishing a numerical energy ratio for unlike substances. Ask which sample is being counted and what process is compared. A heating calculation that neglects work and phase change can be useful within its assumptions; applying it indiscriminately to boiling, expanding gas or different materials removes the conditions that make it meaningful.",
		qualification: "Sample size, composition, phase and energy reference determine an actual comparison; no calorimetry was performed.",
		tags: ["temperature internal energy", "heat capacity", "same temperature different mass"],
		sources: ["capacity", "temperature", "heat"]
	},
	{
		key: "heat",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a002",
		title: "Is heat a substance stored inside a hot object?",
		slug: "is-heat-a-substance-stored-inside-a-hot-object",
		bottomLine: "No. In thermodynamics, heat names energy transferred because of a temperature difference. An object has internal energy; it does not hold a separate material substance called heat. Energy can also enter or leave through work. Calling an object hot in everyday language does not change this distinction between its state and a transfer process.",
		stableCore: ["Heat and work describe ways energy crosses a system boundary. Internal energy describes a state property. Identical final states can be reached through different combinations of transfers, so a final thermometer reading does not reveal a unique heating history.", "When ordinary bodies exchange energy thermally, the net spontaneous transfer is toward the cooler body. Both bodies can have internal energy before contact; that fact does not make heat a fluid that must be stored separately."],
		editorSummary: "This is partly a terminology question with practical consequences. A report of energy transferred over an interval is different from a report of temperature at one moment. State which boundary and time interval the statement uses. Frictional work can raise temperature without being the same transfer mechanism as conduction from a hotter neighbor. The distinction clarifies accounting rather than denying familiar sensations or conservation of energy.",
		qualification: "A defined system boundary and transfer process are needed; everyday uses of the word heat need not use technical terminology.",
		tags: ["heat transfer internal energy", "heat substance", "work thermodynamics"],
		sources: ["heat", "capacity"]
	},
	{
		key: "touch",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a003",
		title: "Must metal that feels colder than wood actually be at a lower temperature?",
		slug: "must-metal-that-feels-colder-than-wood-actually-be-at-a-lower-temperature",
		bottomLine: "No. Metal and wood can have the same room temperature while producing different contact sensations. A metal surface can draw energy from a warmer hand more rapidly, changing the skin's temperature faster. The sensation reflects transient heat exchange, not a direct comparison of the objects' initial temperatures. Objects hotter than the hand need not produce the same ordering of sensations.",
		stableCore: ["Conductivity affects how quickly energy moves through a material, but contact behavior also depends on heat capacity, density, surface conditions and time. It is inaccurate to treat one material label as a complete description of the contact process.", "Thermal equilibrium before contact and the surface temperature during contact are separate situations. Touching can change the local temperatures, so an initial equal-temperature comparison does not promise that the interfaces remain identical afterward."],
		editorSummary: "A contact impression cannot replace a calibrated temperature measurement. Specify whether the comparison concerns untouched room-temperature objects or their surfaces after interacting with a hand. Different transfer rates explain the familiar contrast without proving that all metal is colder than all wood. No safe-touch threshold, burn assessment or experiment involving hot objects is provided here; the review concerns why sensation and initial temperature are different quantities.",
		qualification: "Contact temperature, duration, material properties and surface condition affect the example; no safety judgment follows from feel.",
		tags: ["metal wood feels cold", "same temperature contact", "thermal conductivity"],
		sources: ["conduction", "temperature", "capacity"]
	},
	{
		key: "boiling",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a004",
		title: "Does water always boil at exactly 100 degrees Celsius?",
		slug: "does-water-always-boil-at-exactly-100-degrees-celsius",
		bottomLine: "No. About 100 degrees Celsius is the familiar boiling point of pure water near standard atmospheric pressure, not a pressure-independent rule. Boiling occurs when vapor pressure can support vapor bubbles against the surrounding pressure. Changing pressure changes the boiling condition, and composition can matter too. A number without pressure and sample conditions is incomplete.",
		stableCore: ["Lower surrounding pressure permits boiling at a lower temperature for ordinary water, while higher pressure raises the corresponding equilibrium boiling temperature. This relation is about phase equilibrium, not evidence that the water's chemistry has become a different substance.", "A boiling-point table specifies conditions. Actual samples can contain dissolved material, and observed onset may depend on the apparatus and nucleation. A classroom value should not be presented as an exact temperature for every pot or site."],
		editorSummary: "When interpreting a boiling claim, distinguish a conventional reference condition from the conditions of an actual sample. The review does not supply a pressure-vessel procedure or a food, medical or contamination-removal protocol. A different boiling temperature at a different elevation is compatible with the same physical framework. Checking pressure and composition is more informative than treating any departure from the familiar round number as a violation of science.",
		qualification: "Pressure, composition and observed phase-change conditions matter; no apparatus or treatment recommendation is given.",
		tags: ["water boiling pressure", "100 Celsius altitude", "boiling point"],
		sources: ["vapor", "phase"]
	},
	{
		key: "evaporation",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a005",
		title: "Can liquid water evaporate without reaching its boiling point?",
		slug: "can-liquid-water-evaporate-without-reaching-its-boiling-point",
		bottomLine: "Yes. Evaporation at a surface can occur below the boiling point. A liquid's molecules do not all have identical energies; some can escape into the vapor phase. Net loss depends on the competing return of vapor molecules and the surrounding conditions. Boiling, which involves sustained vapor bubbles within the liquid, is a different situation.",
		stableCore: ["A surface can exchange molecules with surrounding vapor while the bulk liquid remains below its boiling temperature. Evaporation and condensation can balance at equilibrium, so ongoing molecular exchange does not always mean a visible net decrease in liquid volume.", "Temperature, surrounding vapor concentration, exposed area and transport through the air affect net evaporation. Stating that evaporation is possible does not specify how fast a particular sample will dry or what its final temperature will be."],
		editorSummary: "The everyday disappearance of a small water film does not imply that it became boiling hot. Separate the process occurring at the surface from bubble formation throughout the liquid. The cited explanation establishes that lower-temperature evaporation is possible, not a universal drying schedule. This review supplies no biological processing, preservation or treatment instructions. A rate claim needs actual boundary conditions and observations beyond the statement that some molecules can leave the surface.",
		qualification: "Net rate and cooling depend on vapor conditions and energy supply; possibility alone does not determine a drying time.",
		tags: ["evaporation below boiling", "surface vapor", "evaporation condensation"],
		sources: ["vapor", "phase"]
	},
	{
		key: "phase",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a006",
		title: "Does added heat always raise temperature, or can latent heat produce a plateau?",
		slug: "does-adding-energy-as-heat-always-raise-a-substances-temperature",
		bottomLine: "No. During an equilibrium phase change of a pure substance at fixed pressure, energy can change the fraction in each phase without raising temperature. Melting ice and liquid water can coexist while energy goes into the transition. Energy can also be transferred onward or used in work. A rising energy input is not automatically a rising thermometer reading.",
		stableCore: ["A temperature-change calculation and a latent-energy calculation describe different processes. A simple mass-times-heat-capacity relation cannot be used across a phase transition as though the same substance stayed in one phase throughout the interval.", "The familiar temperature plateau is conditional: mixtures, changing pressure and nonequilibrium gradients can behave differently. Explaining an ideal coexistence interval does not predict a perfectly flat reading in every real container or measurement location."],
		editorSummary: "Ask where the transferred energy goes before comparing heater input with temperature. A sample can gain internal energy during melting without the change being represented solely by a higher temperature. Conversely, a constant thermometer reading is not proof of zero energy exchange. The source examples explain the distinction without certifying a particular heating system. Actual energy accounting must include the boundary, phases, losses and any work rather than assuming that every joule has one observable effect.",
		qualification: "Pure-substance equilibrium at specified pressure is the plateau example, not a universal curve for mixtures or rapid heating.",
		tags: ["latent heat temperature plateau", "phase change energy", "melting constant temperature"],
		sources: ["phase", "capacity", "heat"]
	},
	{
		key: "vacuum",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a007",
		title: "Can thermal energy be transferred across a vacuum?",
		slug: "can-thermal-energy-be-transferred-across-a-vacuum",
		bottomLine: "Yes. Heat transfer across a vacuum can occur by electromagnetic radiation without an intervening gas. Ordinary conduction and convection need material pathways, but radiative exchange does not. Objects can emit and absorb radiation in both directions; net exchange depends on temperatures, surfaces and geometry. Removing air does not automatically remove every route for thermal energy transfer.",
		stableCore: ["The Sun-to-Earth energy path illustrates radiation over largely empty space, not conduction through a continuous air bridge. Different electromagnetic wavelengths can carry energy whether or not human vision detects them.", "Radiative exchange is not determined by temperature alone. Emission, absorption, reflected radiation, the area and the view between surfaces matter. A vacuum space can reduce some transfers without making an object perfectly thermally isolated."],
		editorSummary: "Distinguish an absent material contact path from an absent electromagnetic path. An insulation or vacuum claim should say which transfer mode it suppresses and which remain. Radiation emitted by a cooler surface does not contradict net energy transfer from hotter to cooler surroundings; both gross exchanges can coexist. No spacecraft thermal calculation, exposure threshold or equipment instruction is supplied. The mechanism answer does not establish a rate for an unspecified pair of objects.",
		qualification: "Net radiative rate requires surface properties and geometry; an ideal vacuum excludes gas transport but not radiation.",
		tags: ["heat transfer vacuum", "thermal radiation", "conduction convection radiation"],
		sources: ["radiation", "heat", "visible"]
	},
	{
		key: "insulation",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a008",
		title: "Does ordinary insulation generate heat by itself?",
		slug: "does-ordinary-insulation-generate-heat-by-itself",
		bottomLine: "No. Passive insulation primarily slows energy transfer; it is not an energy source. The same barrier can help a warmer interior lose energy more slowly or a cooler interior gain it more slowly. Maintaining a temperature difference still depends on stored energy, energy supply and other transfer routes. An insulating layer does not create unlimited warmth.",
		stableCore: ["Conductive transfer depends on material properties, thickness, area and temperature difference. A material with lower conductivity changes the transfer rate under comparable conditions rather than adding a new energy input to the system.", "An insulated system can still exchange energy through radiation, leaks, openings and other paths. The effect on one path does not prove perfect isolation or establish how long a particular object remains at a chosen temperature."],
		editorSummary: "A warm-item example and a cool-item example can both benefit from passive insulation because the relevant change is transfer rate, not a one-way production of heat. Separate the insulating barrier from an attached heater or an energy-releasing material. This review does not specify building-code compliance, installation details or a temperature-retention guarantee. A product or building needs its own boundary conditions and measured performance before the principle becomes a numerical claim.",
		qualification: "Passive insulation is the scope; active heaters and energy-releasing materials are different systems, and real assemblies have multiple paths.",
		tags: ["insulation generate heat", "passive insulation", "heat loss barrier"],
		sources: ["conduction", "heat", "radiation"]
	},
	{
		key: "infrared",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a009",
		title: "Does an infrared thermometer directly reveal exact surface temperature regardless of emissivity?",
		slug: "does-an-infrared-thermometer-directly-reveal-exact-surface-temperature-regardless-of-emissivity",
		bottomLine: "No. An infrared instrument detects radiation and uses a model or calibration to infer temperature. Emissivity, reflected surroundings, the measurement band and the target within the instrument's view affect that inference. A displayed number is not independent of those assumptions. Shiny surfaces can be particularly misleading when reflected radiation is mistaken for emission from the target.",
		stableCore: ["NIST's original report describes calibration and sources of uncertainty for thermal imaging. The general lesson is that signal-to-temperature conversion needs an applicable measurement model, not that every camera has the same error or calibration requirement.", "The cited building-material paper illustrates variation with material and moisture. Its selected samples are not a universal emissivity table, clinical validation or an error allowance for every thermometer. Full study disclosures and methods were not audited here."],
		editorSummary: "Ask what surface and wavelength band the reading concerns, whether the target fills the measurement area, and what assumptions support the conversion. A very precise display can coexist with an uncertain inferred temperature. This review is not a medical-temperature recommendation, calibration recipe or inspection certificate. The conceptual source check does not establish an individual's instrument accuracy; calibration evidence and applicable surface conditions would be needed for that separate judgment.",
		qualification: "Measurement-band, surface and calibration uncertainty remain; no universal device error or medical application is inferred.",
		tags: ["infrared thermometer emissivity", "surface temperature reflected radiation", "thermal camera calibration"],
		sources: ["calibration", "radiation", "emissivity"]
	},
	{
		key: "walls",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a010",
		title: "Can an ordinary thermal camera directly see objects through an opaque wall?",
		slug: "can-an-ordinary-thermal-camera-directly-see-objects-through-an-opaque-wall",
		bottomLine: "Generally no. For a wall opaque in the camera's measurement band, the camera detects radiation from the visible surface, not a direct image of hidden objects. Something behind the wall may change the surface temperature and create an indirect pattern. That is different from infrared radiation passing through the wall to reveal the hidden object itself.",
		stableCore: ["A surface pattern and direct transmission are distinct mechanisms. A warmer or cooler outline can be an inference about what affects the surface, but does not by itself identify a unique hidden cause or prove a complete view behind the barrier.", "Opacity is wavelength-dependent. Some materials transmit some infrared bands while blocking visible light. The conclusion concerns an opaque wall in the actual camera band, not a universal rule that no infrared radiation passes through any material."],
		editorSummary: "FLIR's manufacturer explanation supports the wall-surface distinction; its commercial interest is visible and no independent performance test is claimed. NIST's report supplies separate surface-measurement and uncertainty context. Avoid turning a false-color pattern into an X-ray-like picture or an automatically definitive building diagnosis. This review provides no surveillance, evasion or inspection procedure. An indirect anomaly would require other evidence before establishing its source, extent or significance.",
		qualification: "Wall opacity in the measurement band is essential; surface-pattern interpretation is not direct imaging or a certified diagnosis.",
		tags: ["thermal camera see through walls", "infrared opaque wall", "surface thermal pattern"],
		sources: ["calibration", "walls", "radiation"]
	},
	{
		key: "white",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a011",
		title: "Is ordinary white light a single visible wavelength?",
		slug: "is-ordinary-white-light-a-single-visible-wavelength",
		bottomLine: "No. Ordinary white light combines multiple visible wavelengths rather than one unique wavelength called white. Different spectral mixtures can produce a similar white appearance. Sunlight and artificial sources need not have identical spectra even when both look white. Appearance alone therefore does not establish how much energy is present at every wavelength.",
		stableCore: ["A spectrally broad source can be separated into wavelength components, making its mixture visible in a dispersive example. Some artificial sources combine narrower bands instead; perceived white does not require one particular continuous distribution.", "A color label is not a complete spectral measurement. A source's intensity across wavelengths and a detector's response must be distinguished before two apparently similar lights are treated as physically identical or equally effective in an application."],
		editorSummary: "NASA's visible-spectrum explanation and the original dispersion section explain why a color name does not identify a single component of white light. Multiple examples from related teaching sources are not independent experimental confirmations. This review does not classify a lamp's quality, prescribe lighting or infer exposure safety from appearance. For a quantitative claim, inspect the source spectrum and the intended measurement rather than replacing them with the word white.",
		qualification: "Perceived appearance does not uniquely determine the spectral distribution; no color-vision or lighting intervention is prescribed.",
		tags: ["white light wavelengths", "white spectrum", "spectral mixture"],
		sources: ["dispersion", "visible", "sky"]
	},
	{
		key: "prism",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a012",
		title: "Does an ordinary prism create new colors rather than separate incident light?",
		slug: "does-an-ordinary-prism-create-new-colors-rather-than-separate-incident-light",
		bottomLine: "Not in the ordinary dispersion example. A transparent prism directs different incident wavelengths through different angles because its refractive index depends on wavelength. The colored components were already present in the incoming mixture. A simple prism spectrum is therefore not evidence that the prism manufactured a new set of light frequencies.",
		stableCore: ["Wavelength-dependent refraction separates a mixture spatially. The prism's material, geometry and the incident spectrum affect what appears, so a diagram of a broad rainbow is not a guarantee for every source or transparent object.", "Absorption, fluorescence and nonlinear frequency conversion are separate optical processes. They should not be silently substituted for ordinary linear dispersion, nor does the ordinary example establish that every interaction between light and matter preserves the incident spectrum."],
		editorSummary: "Ask whether the source contains a broad mixture before interpreting the separated colors. A monochromatic input would not acquire the same broad visible spectrum simply because it passed through an ordinary prism. The review explains the mechanism without reproducing a viewing experiment, using hazardous beams or predicting a particular instrument's spectral response. Identify the applicable optical process rather than generalizing from one familiar illustration to every material interaction.",
		qualification: "Ordinary transparent linear dispersion is the scope; frequency-changing and absorbing processes require separate evidence.",
		tags: ["prism colors dispersion", "prism creates wavelengths", "refractive index wavelength"],
		sources: ["dispersion", "refraction", "visible"]
	},
	{
		key: "resolution",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a013",
		title: "Does increasing magnification automatically reveal more detail?",
		slug: "does-increasing-magnification-automatically-reveal-more-detail",
		bottomLine: "No. Magnification enlarges an image; resolution describes whether nearby features can be distinguished. A larger rendering can show the same blur without recovering additional information. In ordinary optical imaging, diffraction, aperture, wavelength, aberrations and sampling can limit detail. Increasing image size alone does not remove those limits or prove that two features are now separately measured.",
		stableCore: ["A real optical system has a spatial response rather than reproducing every point perfectly. Diffraction can spread contributions from nearby points so they overlap. Enlarging that overlap does not automatically separate the underlying points into independently supported features.", "The Rayleigh criterion describes a specified ordinary diffraction-limited situation. Specialized near-field, computational or super-resolution methods use additional conditions and information; this review does not declare one textbook criterion an absolute limit for every imaging technique."],
		editorSummary: "Compare evidence for separated features rather than the advertised enlargement alone. A zoomed photograph, a larger display and a higher resolving optical system are different changes. The cited section establishes the distinction without testing a camera or telescope or supplying a biological imaging protocol. Any claim that a method extracts finer detail needs its own acquisition assumptions, calibration and validation rather than a bigger-looking output as proof.",
		qualification: "Ordinary imaging is the scope; specialized methods and reconstruction claims need separately validated information and assumptions.",
		tags: ["magnification resolution detail", "image zoom blur", "diffraction aperture"],
		sources: ["resolution", "lenses", "calibration"]
	},
	{
		key: "mirror",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a014",
		title: "Can a plane mirror's virtual image be caught on a screen at its apparent location?",
		slug: "can-a-plane-mirrors-virtual-image-be-caught-on-a-screen-at-its-apparent-location",
		bottomLine: "No. An ordinary plane mirror produces a virtual image: outgoing rays appear to originate behind the mirror but do not actually converge there. A screen at that apparent location does not receive the converging rays needed to form that image directly. The image is still visible, and another lens can form a real image of the light arriving from the mirror.",
		stableCore: ["Backward ray extensions locate an apparent origin. They are not physical beams passing through the back of an opaque mirror. The technical label virtual describes ray geometry, not a claim that the observer is hallucinating the visible reflection.", "A camera can photograph a virtual image because its own optics form an image on a sensor. That additional imaging system is different from placing a bare screen at the apparent image point and expecting the original rays to converge there."],
		editorSummary: "Separate the mirror's apparent image position from the real image that an eye or camera forms using its own optics. Curved mirrors and other arrangements can form real images under appropriate conditions, so the plane-mirror answer is not a claim about every reflective surface. The source ray constructions explain this distinction without reproducing an experiment or judging the quality of a particular mirror or photographic setup.",
		qualification: "An ordinary plane mirror and direct screen placement are the scope; another imaging system can change where rays converge.",
		tags: ["plane mirror virtual image screen", "real virtual reflection", "photograph virtual image"],
		sources: ["mirrors", "lenses"]
	},
	{
		key: "depth",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a015",
		title: "Does an underwater object's apparent depth always equal its actual depth?",
		slug: "does-an-underwater-objects-apparent-depth-always-equal-its-actual-depth",
		bottomLine: "No. Refraction changes the direction of light at an air-water boundary, so straight-line visual interpretation can place a submerged object at an apparent position different from its actual position. In the familiar near-normal view from air through a flat surface, it appears shallower. The amount and direction of an apparent displacement depend on the viewing geometry and media.",
		stableCore: ["Refraction relates ray directions to the refractive properties on each side of a boundary. Continuing the outgoing rays backward as if the path had remained straight can construct an apparent image without locating the physical object itself.", "A flat boundary, an approximately normal view and uniform media make the introductory example simple. Oblique views, curved boundaries, surface motion and multiple layers require the appropriate geometry rather than one universal depth multiplier."],
		editorSummary: "A familiar picture of a displaced underwater object illustrates how a path changes, not a reliable estimate of a real body's depth in every photograph. Distinguish actual location, apparent ray origin and the viewing position. This review makes no swimming, diving, navigation or rescue recommendation. A depth measurement needs an applicable method and conditions; apparent visibility alone does not certify distance, access or safety.",
		qualification: "View angle, interfaces and refractive properties determine displacement; the near-normal flat-interface illustration is not a universal correction.",
		tags: ["apparent depth refraction water", "underwater object shallower", "air water boundary"],
		sources: ["refraction", "lenses"]
	},
	{
		key: "rainbow",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a016",
		title: "Is a rainbow a fixed colored object located at one place for every observer?",
		slug: "is-a-rainbow-a-fixed-colored-object-located-at-one-place-for-every-observer",
		bottomLine: "No. A rainbow is an observer-dependent optical pattern produced by light interacting with many droplets at suitable angles. Different observers receive rays from different sets of droplets. Its apparent arc is not a painted object occupying one fixed distant location, and an apparent endpoint does not identify a physical object on the ground.",
		stableCore: ["Refraction, internal reflection and wavelength-dependent directions help produce the familiar colors. The ray geometry is defined relative to the illumination and observer, so a photograph's apparent alignment with a landscape does not establish a fixed rainbow coordinate.", "Droplet size, shape, illumination and viewpoint affect the observed pattern. Introductory diagrams select useful representative rays; they do not mean every reflection is total internal reflection or that every observer sees the same droplets and exact colors."],
		editorSummary: "Treat an arc's position in a photograph as a relationship among light paths, the camera and the background. Moving the viewpoint can change which droplets contribute. This review does not reproduce viewing instructions or suggest looking at a bright source. The mechanism answer is compatible with a visible, photographable pattern while rejecting a fixed material object or a universally shared physical endpoint.",
		qualification: "Illumination, droplet properties and observer geometry affect the pattern; the arc is not a unique material location.",
		tags: ["rainbow observer location", "rainbow endpoint", "droplet reflection refraction"],
		sources: ["dispersion", "refraction", "visible"]
	},
	{
		key: "polarization",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a017",
		title: "Do polarizing sunglasses block all reflected light equally?",
		slug: "do-polarizing-sunglasses-block-all-reflected-light-equally",
		bottomLine: "No. A polarizer transmits light differently depending on polarization orientation. Reflected light can be partially polarized, so a filter can reduce some glare without removing every reflected component. The result depends on the surface, angle and filter orientation. Polarization is not the same property as general darkness or a guarantee of ultraviolet protection.",
		stableCore: ["Light intensity and polarization describe different aspects of a wave. Equal initial brightness does not ensure equal transmission through an oriented polarizer if the polarization states differ. A filter therefore cannot be characterized by a universal glare-removal percentage alone.", "Ordinary reflections need not be completely polarized. Surface geometry and illumination affect the mixture that reaches the observer, and real lenses can include additional coatings and spectral filters whose roles should be distinguished from polarization itself."],
		editorSummary: "The source explains why orientation-sensitive filtering can reduce a familiar reflection without making every scene black. It does not test a particular lens, prescribe a product or establish an eye-safety standard. Statements about UV filtering require separate spectral evidence; glare reduction is not that evidence. This review supplies no viewing experiment, hazardous-light advice or clinical recommendation and keeps the physical mechanism separate from product certifications.",
		qualification: "Polarization state, angle and filter properties matter; glare behavior alone does not establish protective performance.",
		tags: ["polarizing sunglasses reflected light", "polarization orientation glare", "polarization not UV protection"],
		sources: ["polarization", "refraction", "visible"]
	},
	{
		key: "speed",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a018",
		title: "Does visible light travel through ordinary glass at the vacuum speed of light?",
		slug: "does-visible-light-travel-through-ordinary-glass-at-the-vacuum-speed-of-light",
		bottomLine: "No. For ordinary transparent glass in the usual visible range, refractive index describes a phase speed lower than the vacuum value, commonly written as c divided by the index. The exact SI constant c applies in vacuum. Material, wavelength and dispersion matter, and phase speed should not be confused with every pulse, group or information velocity.",
		stableCore: ["The NIST definition fixes the vacuum constant exactly; it does not set the speed of every wave phase in every substance. Refraction and wavelength-dependent index provide a consistent description of ordinary transparent glass without changing the defined vacuum constant.", "Different velocity concepts become important in dispersive or absorbing media. Special phase or group behavior cannot by itself establish faster-than-light information transfer. The ordinary glass example is not a universal formula for all materials and frequency ranges."],
		editorSummary: "Ask which speed a statement measures and which material and wavelength it describes. A ray diagram or index value supplies a scoped propagation model, not an account of photons repeatedly stopping at each atom. This review does not estimate a particular optical link's latency or reproduce an experiment. It preserves the vacuum-versus-medium distinction while avoiding a claim that all notions of speed are always numerically identical.",
		qualification: "Ordinary transparent visible-range glass is the scope; dispersive phase, group and signal velocities must be distinguished.",
		tags: ["speed light glass vacuum", "refractive index phase speed", "c divided index"],
		sources: ["refraction", "metre", "dispersion"]
	},
	{
		key: "concave",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a019",
		title: "Does a single ordinary diverging lens form a real image of a real object?",
		slug: "does-a-single-ordinary-diverging-lens-form-a-real-image-of-a-real-object",
		bottomLine: "No in the ordinary thin-lens case with a real object and a diverging lens in its stated surrounding medium. The emergent rays spread and appear to originate from a virtual, upright, smaller image. This conclusion depends on the object and optical system: virtual objects, other surrounding media or combinations of lenses are different cases.",
		stableCore: ["A diverging lens has negative focal length under the ordinary sign convention, and a real object produces a virtual image in this simple arrangement. Backward extensions locate an apparent source rather than a point where the outgoing rays physically converge.", "Surface shape alone is not a complete optical specification. Refractive-index contrast and the full arrangement matter, so the ordinary air-and-glass illustration cannot be generalized to every concave component embedded in a different medium or compound instrument."],
		editorSummary: "The useful consensus is conditional rather than an unrestricted rule that a concave-shaped element can never participate in real imaging. Identify whether the object is real for this element and whether the element is actually diverging in its environment. Other lenses can change the ray bundle. This review does not prescribe corrective lenses, evaluate vision or provide an optical construction procedure; it clarifies what a particular introductory ray model does and does not establish.",
		qualification: "Real object, actual diverging behavior and single ordinary thin-lens geometry are essential; compound and virtual-object cases differ.",
		tags: ["diverging lens real object virtual image", "concave lens conditions", "negative focal length"],
		sources: ["lenses", "refraction", "mirrors"]
	},
	{
		key: "sky",
		id: "a88fb8d0-37e8-4a58-a451-7b8da352a020",
		title: "Is Earth's clear daytime sky blue mainly because it reflects the ocean?",
		slug: "is-earths-clear-daytime-sky-blue-mainly-because-it-reflects-the-ocean",
		bottomLine: "No. Wavelength-dependent atmospheric scattering of sunlight explains the ordinary blue daytime sky, including above land far from an ocean. Shorter visible wavelengths are scattered more strongly by air molecules than longer ones in the relevant regime. The observed appearance also depends on the solar spectrum, visual response and atmospheric conditions; it is not mainly a reflection of a blue ocean.",
		stableCore: ["A clear-sky explanation concerns sunlight redirected by the atmosphere toward an observer, rather than a required reflection from the sea. The mechanism can operate over land and does not require the ground below to be blue.", "Cloud droplets, aerosols, path length and other atmospheric conditions alter appearance. The familiar molecular-scattering example is not a prediction that every sky, horizon, time of day or planet will look the same blue."],
		editorSummary: "NASA's original teaching page explains the scattering distinction and why longer atmospheric paths can change the colors reaching an observer. It is not a current air-quality, smoke or weather diagnosis. Blue being scattered strongly does not by itself explain every aspect of perceived color; source spectrum and visual response also matter. The review provides no bright-source viewing instructions and does not infer atmospheric composition from one uncalibrated photograph.",
		qualification: "The ordinary clear daytime terrestrial sky is the scope; clouds, aerosols, illumination and other atmospheres require their own conditions.",
		tags: ["blue sky ocean reflection", "atmospheric scattering", "Rayleigh clear sky"],
		sources: ["sky", "visible", "dispersion"]
	}
];

export const readerPhysicsSlugs = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerPhysicsClaims: SeedClaim[] = reviews.map(review => ({
	topicSlug: "physics-and-chemistry",
	title: review.title,
	slug: review.slug,
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 85,
	bottomLine: review.bottomLine,
	stableCore: review.stableCore,
	editorSummary: review.editorSummary,
	openQuestions: [`Which actual conditions make the stated interpretation applicable? ${review.qualification}`],
	whatWouldChangeMinds: [`A demonstrated failure under the stated assumptions, or measurements showing those assumptions do not apply, would require reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A familiar illustration does not establish unrestricted behavior for every material, instrument or geometry."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "generalizability", detail: review.qualification }],
	searchDatabases: ["Original OpenStax definitions and conditional physical models", "NIST original SI and calibration-report records", "NASA original light and scattering explanations", "Consensus.app targeted emissivity discovery and original author record", "Original FLIR explanation with manufacturer interest retained", "Crossref DOI identity and linked-update metadata for the two DOI-bearing records"],
	searchCutoffAt: physicsCheckedAt,
	inclusionRules: ["Separate definitions, mechanisms, measured quantities and conditional model predictions.", "Retain source provenance, measurement assumptions and ordinary-versus-specialized scope."],
	exclusionRules: ["No invented expert votes, reader requests, raw-data reanalysis or unqualified universal rules.", "No clinical recommendation, biological procedure, optical safety experiment, pressure-vessel instruction, surveillance or evasion procedure."],
	appraisalTools: ["Structured definition, approximation and measurement-applicability check; no formal risk-of-bias score", "DOI identity and linked-update check, not exhaustive integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "OpenStax sections share textbook provenance; NASA pages share agency provenance. They are not independent experiments or a consensus poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing. No material samples, optical apparatus or raw measurements were independently analyzed.",
	coiSummary: "Institutional/textbook records provide definitions and qualified models, not clinical or commercial certification. Manufacturer explanations retain commercial interest. The contextual building-material paper's full funding and conflicts were not audited.",
	lastRetractionCheckAt: physicsCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "No universal effect size or instrument error inferred.", certainty: "moderate", limitations: [review.qualification, "Shared teaching-source provenance; no independent apparatus test"] }],
	institutionalAnchors: [{ name: readerPhysicsSources[review.sources[0]!].publisher, role: "Method-defining reference, not formal consensus statement or expert approval" }],
	changeLog: [{ date: physicsCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: review.id, date: physicsCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Corrections and notices for cited original sources"], guidelineMonitors: ["Original textbook and measurement-reference revisions"], triggerRules: ["Reassess if definitions, applicable model assumptions or documented measurement limitations change the conclusion."] },
	sources: review.sources.map((key, index) => {
		const entry = readerPhysicsSources[key];
		return { ...entry, order: index + 1, isAnchor: index === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: physicsCheckedAt, statusSources: [entry.url!] };
	})
}));

export const readerPhysicsGaps = reviews.map(review => ({
	slug: review.slug,
	gap: `Adds the distinct scoped question "${review.title}" and its measurement assumptions; existing energy, radiation and quantum reviews do not answer this proposition.`,
	relatedExistingSlugs: ["can-a-perpetual-motion-machine-produce-net-energy-indefinitely", "can-sound-travel-through-a-perfect-vacuum"]
}));
