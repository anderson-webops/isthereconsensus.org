import type { AtlasBreadthSourceTuple } from "./claim-expansion-2026-09-atlas-breadth-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthClaim as reviewedClaim } from "./claim-expansion-2026-09-atlas-breadth-shared.js";

const nasaSunFacts = [
	"consensus_statement",
	"Sun: Facts",
	"NASA Science",
	2025,
	"https://science.nasa.gov/sun/facts/",
	"NASA explains that fusion in the Sun's core supplies its energy and that the Sun will eventually expand into a red giant rather than explode as a massive-star supernova."
] as const satisfies AtlasBreadthSourceTuple;

const nasaUniverseGlossary = [
	"guideline",
	"Universe glossary",
	"NASA Science",
	2026,
	"https://science.nasa.gov/universe/glossary/",
	"NASA defines seasons, cosmic expansion, fusion, observable-universe terms, and other concepts used to separate familiar analogies from their technical meanings."
] as const satisfies AtlasBreadthSourceTuple;

const nasaMoonFacts = [
	"consensus_statement",
	"Moon: Facts",
	"NASA Science",
	2025,
	"https://science.nasa.gov/moon/facts/",
	"NASA describes the Moon's synchronous rotation, changing illumination, orbit, and the distinction between its far side and a permanently dark side."
] as const satisfies AtlasBreadthSourceTuple;

const nasaVenusFacts = [
	"consensus_statement",
	"Venus: Facts",
	"NASA Science",
	2026,
	"https://science.nasa.gov/venus/venus-facts/",
	"NASA identifies Venus as the hottest planet and attributes its extreme surface temperature to heat trapped by its dense carbon-dioxide atmosphere."
] as const satisfies AtlasBreadthSourceTuple;

const astronomyDecadal = [
	"consensus_statement",
	"Origins, Worlds, and Life: A Decadal Strategy for Planetary Science and Astrobiology 2023-2032",
	"National Academies of Sciences, Engineering, and Medicine",
	2023,
	"10.17226/26522",
	"The planetary-science decadal survey synthesizes current knowledge of planetary atmospheres, habitability, solar-system evolution, and the observations needed to resolve open questions."
] as const satisfies AtlasBreadthSourceTuple;

const gravitationalWaveDetection = [
	"landmark_study",
	"Observation of Gravitational Waves from a Binary Black Hole Merger",
	"Physical Review Letters",
	2016,
	"10.1103/PhysRevLett.116.061102",
	"The LIGO collaboration reported the first direct observation of a transient gravitational-wave signal, matching a binary black-hole merger predicted by general relativity."
] as const satisfies AtlasBreadthSourceTuple;

const gravitationalWaveReview = [
	"systematic_review",
	"Black holes, gravitational waves and fundamental physics: a roadmap",
	"Classical and Quantum Gravity",
	2019,
	"10.1088/1361-6382/ab0587",
	"Broad field review treats direct gravitational-wave detection as established while mapping the tests and open problems enabled by gravitational-wave astronomy."
] as const satisfies AtlasBreadthSourceTuple;

const exoplanetStrategy = [
	"consensus_statement",
	"Exoplanet Science Strategy",
	"National Academies of Sciences, Engineering, and Medicine",
	2018,
	"10.17226/25187",
	"National Academies synthesis reviews the mature evidence for planets around other stars and prioritizes work on demographics, atmospheres, and possible signs of life."
] as const satisfies AtlasBreadthSourceTuple;

const nasaHubbleTension = [
	"consensus_statement",
	"Hubble Constant and Tension",
	"NASA Science",
	2025,
	"https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-constant-and-tension/",
	"NASA explains the disagreement between late-universe distance-ladder and early-universe microwave-background inferences without treating either cosmic expansion or the Big Bang framework as discarded."
] as const satisfies AtlasBreadthSourceTuple;

const cosmologicalHorizonsReview = [
	"systematic_review",
	"Expanding Confusion: Common Misconceptions of Cosmological Horizons and the Superluminal Expansion of the Universe",
	"Publications of the Astronomical Society of Australia",
	2004,
	"10.1071/AS03040",
	"Review shows why recession rates can exceed light speed in standard cosmology without local motion or usable information outrunning light through nearby spacetime."
] as const satisfies AtlasBreadthSourceTuple;

const planckCosmology = [
	"consensus_statement",
	"Planck 2018 results. VI. Cosmological parameters",
	"Astronomy & Astrophysics",
	2020,
	"10.1051/0004-6361/201833910",
	"Planck's final cosmological-parameter analysis constrains the standard cosmological model from the microwave background while leaving questions about global geometry and conditions beyond the observable region."
] as const satisfies AtlasBreadthSourceTuple;

export const september2026AtlasBreadthAstronomyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is the Sun powered by ordinary burning rather than nuclear fusion?",
		slug: "is-the-sun-powered-by-ordinary-burning-rather-than-nuclear-fusion",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. The Sun shines because hydrogen nuclei fuse into helium in its hot, dense core, converting a small amount of mass into energy. Chemical burning could not sustain the Sun's measured luminosity for billions of years. Solar models, helioseismology, and direct measurements of neutrinos from the fusion chain independently support the same explanation.",
		stableCore: [
			"The dominant solar energy pathway is the proton-proton fusion chain, with a smaller contribution from the CNO cycle.",
			"Fusion energy moves outward through radiation and convection before leaving the photosphere as sunlight.",
			"Solar neutrinos provide a direct probe of nuclear reactions occurring in the core."
		],
		openQuestions: [
			"How precisely can neutrino measurements constrain the Sun's composition and the small CNO-cycle contribution?",
			"How do magnetic fields and plasma dynamics produce short-term variability above the stable fusion-powered interior?"
		],
		whatWouldChangeMinds: [
			"Replicated observations showing that the measured solar neutrino spectrum does not track predicted fusion reactions.",
			"A quantitatively complete non-fusion mechanism that explains the Sun's luminosity, age, internal structure, and elemental evolution better."
		],
		misconceptions: [
			"Calling the Sun a ball of fire is a visual analogy, not a statement that oxygen-fed combustion powers it.",
			"Fusion in the Sun is not the same process as nuclear fission in a power reactor.",
			"The solar surface is much cooler than the core, where fusion occurs."
		],
		editorSummary:
			"The Sun is a gravitationally confined fusion reactor, not a giant campfire. Its lifetime, light, internal vibrations, and neutrinos all fit one nuclear-energy model.",
		uncertaintySummary:
			"Fusion as the Sun's power source is settled. Research refines solar composition, neutrino physics, magnetic behavior, and energy transport rather than reopening ordinary combustion.",
		sources: [
			nasaSunFacts,
			[
				"landmark_study",
				"Energy Production in Stars",
				"Physical Review",
				1939,
				"10.1103/PhysRev.55.434",
				"Bethe's landmark analysis established viable nuclear reaction chains for stellar energy production and replaced chemically powered models."
			],
			[
				"landmark_study",
				"Comprehensive measurement of pp-chain solar neutrinos",
				"Nature",
				2018,
				"10.1038/s41586-018-0624-y",
				"Borexino measured neutrinos across the proton-proton chain, directly testing the reactions that supply nearly all solar energy."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Are Earth's seasons mainly caused by changing distance from the Sun?",
		slug: "are-earths-seasons-mainly-caused-by-changing-distance-from-the-sun",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Earth's seasons are driven mainly by its roughly 23.5-degree axial tilt. A hemisphere tilted toward the Sun receives more direct sunlight and longer days; six months later the geometry reverses. Earth is actually closest to the Sun during Northern Hemisphere winter, and both hemispheres have opposite seasons at the same Earth-Sun distance.",
		stableCore: [
			"Axial tilt changes both solar angle and day length over the year.",
			"Opposite seasons in the two hemispheres rule out one global distance change as the main cause.",
			"Earth's mildly elliptical orbit makes a smaller contribution to seasonal energy differences."
		],
		openQuestions: [
			"How do oceans, snow, vegetation, and atmospheric circulation shape the timing and intensity of regional seasons?",
			"How do long-term orbital cycles redistribute sunlight and influence glacial climates?"
		],
		whatWouldChangeMinds: [
			"Measurements showing seasonal sunlight geometry tracks Earth-Sun distance better than axial orientation in both hemispheres.",
			"A physical model that reproduces opposite hemispheric seasons without relying on axial tilt."
		],
		misconceptions: [
			"Summer heat is not simply evidence that Earth is closer to the Sun.",
			"Earth's tilt does not mean one hemisphere stays permanently closer to the Sun.",
			"Seasonal weather lags the solstices because land, oceans, and air take time to warm or cool."
		],
		editorSummary:
			"Tilt changes how concentrated sunlight is and how long it shines each day. Distance varies too, but it cannot explain opposite Northern and Southern Hemisphere seasons.",
		uncertaintySummary:
			"The astronomical cause is settled. Regional climate processes determine how that seasonal forcing appears in temperature, rainfall, and ecosystems.",
		sources: [
			nasaUniverseGlossary,
			[
				"guideline",
				"What Causes the Seasons?",
				"NASA Space Place",
				2025,
				"https://spaceplace.nasa.gov/seasons/en/",
				"NASA's educational synthesis uses Earth's tilt and orbital position to explain solar angle, day length, and opposite hemispheric seasons."
			],
			[
				"guideline",
				"Why does Earth have Seasons?",
				"NOAA National Environmental Satellite, Data, and Information Service",
				2025,
				"https://www.nesdis.noaa.gov/about/k-12-education/understanding-our-planet/why-does-earth-have-seasons",
				"NOAA explains the axial-tilt mechanism and why Earth's changing orbital distance is not the main seasonal driver."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is the far side of the Moon permanently dark?",
		slug: "is-the-far-side-of-the-moon-permanently-dark",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. The Moon's far side is the hemisphere that usually faces away from Earth, not a hemisphere that never sees sunlight. Because the Moon rotates once per orbit, the same side stays roughly toward Earth, while nearly every location on both hemispheres cycles through about two weeks of daylight and two weeks of night.",
		stableCore: [
			"Synchronous rotation explains why Earth usually sees the same lunar hemisphere.",
			"At new Moon the far side is mostly sunlit; at full Moon the near side is mostly sunlit.",
			"Permanently shadowed areas exist near some polar craters, but they are small regions rather than the entire far side."
		],
		openQuestions: [
			"How much accessible water ice is preserved in permanently shadowed polar terrain?",
			"How do far-side geology and crustal thickness record the Moon's early history?"
		],
		whatWouldChangeMinds: [
			"Orbital imaging or illumination measurements showing the far hemisphere does not experience the normal lunar day-night cycle.",
			"A rotational model that better explains the observed phases and surface illumination without synchronous rotation."
		],
		misconceptions: [
			"Far side means hidden from Earth, not hidden from the Sun.",
			"The Moon does rotate on its axis; its rotation period matches its orbital period.",
			"Pink Floyd's phrase is memorable but not a literal map of lunar illumination."
		],
		editorSummary:
			"The far side is a viewing label. It receives sunlight on the same monthly rhythm as the familiar near side, apart from localized polar shadows.",
		uncertaintySummary:
			"The illumination and rotation geometry are directly observed. Current uncertainty concerns resources and geology in permanently shadowed regions, not a globally dark hemisphere.",
		sources: [
			nasaMoonFacts,
			[
				"guideline",
				"The Dark Side of the Moon",
				"NASA Scientific Visualization Studio",
				2019,
				"https://svs.gsfc.nasa.gov/4709/",
				"NASA visualization shows sunlight moving across the far side and distinguishes it from permanently shadowed polar terrain."
			],
			astronomyDecadal
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is Mercury the hottest planet because it is closest to the Sun?",
		slug: "is-mercury-the-hottest-planet-because-it-is-closest-to-the-sun",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Venus is hotter at the surface than Mercury. Mercury receives more sunlight but has almost no atmosphere to retain heat, so its temperature swings enormously. Venus has a dense carbon-dioxide atmosphere and clouds that produce an extreme greenhouse effect, keeping its surface near 465 degrees Celsius day and night.",
		stableCore: [
			"Distance controls incoming sunlight, but atmospheric composition and pressure strongly affect surface temperature.",
			"Mercury's airless surface heats in sunlight and cools sharply at night.",
			"Venus demonstrates that a planet farther from the Sun can be hotter when its atmosphere traps heat efficiently."
		],
		openQuestions: [
			"How did Venus lose its early water and enter its present climate state?",
			"How much active volcanism and atmospheric exchange occur on Venus today?"
		],
		whatWouldChangeMinds: [
			"Validated global measurements placing Mercury's mean surface temperature above Venus's.",
			"Atmospheric observations showing Venus's heat can be explained without strong infrared opacity and high pressure."
		],
		misconceptions: [
			"Closest to the Sun does not automatically mean highest average surface temperature.",
			"The greenhouse effect on Venus is not the same magnitude or climate state as on Earth.",
			"Mercury can have hotter daytime spots while still being colder on average and much colder at night."
		],
		editorSummary:
			"Mercury wins on incoming sunlight, but Venus wins on retained heat. Its atmosphere makes the decisive difference.",
		uncertaintySummary:
			"The temperature ranking and greenhouse mechanism are settled. Venus's detailed climate history and present geological activity remain active research areas.",
		sources: [
			nasaVenusFacts,
			[
				"consensus_statement",
				"Mercury: Facts",
				"NASA Science",
				2025,
				"https://science.nasa.gov/mercury/facts/",
				"NASA documents Mercury's weak atmosphere and extreme day-night surface temperatures, providing the direct comparison with Venus."
			],
			astronomyDecadal
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Have gravitational waves been directly detected?",
		slug: "have-gravitational-waves-been-directly-detected",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. In 2015 the LIGO detectors measured a characteristic spacetime disturbance from two merging black holes, reported in 2016. Since then, independent detectors and repeated observing runs have recorded many compact-object mergers. Signal shapes, timing between instruments, detector checks, and electromagnetic counterparts for some events make an instrumental coincidence implausible.",
		stableCore: [
			"Gravitational waves are propagating distortions of spacetime predicted by general relativity.",
			"Multiple separated interferometers detect compatible waveforms with arrival-time differences consistent with one sky source.",
			"The 2017 neutron-star merger linked gravitational waves with light across the electromagnetic spectrum."
		],
		openQuestions: [
			"What populations and formation pathways produce the observed black-hole and neutron-star mergers?",
			"Will future detectors reveal primordial backgrounds or deviations from general relativity?"
		],
		whatWouldChangeMinds: [
			"A reproducible detector artifact that explains the cross-site waveforms and astrophysical counterparts across the catalog.",
			"Independent instruments consistently failing to recover events above expected false-alarm backgrounds."
		],
		misconceptions: [
			"The detectors measure tiny changes in arm length, not an audible sound traveling through space.",
			"Direct detection does not mean every claimed candidate is automatically astrophysical.",
			"The 2015 event was the first direct detection, not the first indirect evidence for gravitational radiation."
		],
		editorSummary:
			"Gravitational-wave astronomy is an observational field, not just a theoretical proposal. Repeated, cross-checked detections now probe otherwise invisible cosmic mergers.",
		uncertaintySummary:
			"Detection itself is settled. Event rates, source formation, extreme-matter physics, and possible weak backgrounds remain under active study.",
		sources: [gravitationalWaveDetection, gravitationalWaveReview, [
			"consensus_statement",
			"Gravitational Waves",
			"LIGO Laboratory",
			2026,
			"https://ligo.org/gravitational-wave-science/",
			"LIGO describes interferometric detection, cross-detector validation, noise controls, and the growing catalog of astrophysical events."
		]]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Have astronomers confirmed planets orbiting other stars?",
		slug: "have-astronomers-confirmed-planets-orbiting-other-stars",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Thousands of exoplanets have been confirmed through repeatable effects such as periodic starlight dips, stellar radial-velocity shifts, gravitational microlensing, direct imaging, and timing changes. Each method has characteristic false positives and selection biases, so candidate vetting and independent confirmation matter, but planets beyond the Solar System are no longer speculative.",
		stableCore: [
			"Transit and radial-velocity observations account for many discoveries and can jointly constrain a planet's size, orbit, and mass.",
			"NASA's Exoplanet Archive tracks confirmed objects and validation literature rather than counting every preliminary signal.",
			"Confirmed planets span systems very different from our own, including compact multi-planet systems and hot Jupiters."
		],
		openQuestions: [
			"How common are genuinely Earth-like planets in habitable-zone orbits around Sun-like stars?",
			"Which atmospheric measurements could distinguish biology from nonbiological chemistry?"
		],
		whatWouldChangeMinds: [
			"A common technical or astrophysical artifact that survives existing cross-method validation and explains the confirmed catalog.",
			"Reanalysis showing orbital signals do not repeat or obey gravitational dynamics across independent observatories."
		],
		misconceptions: [
			"Most exoplanets are inferred from their effects on light or stellar motion rather than photographed as detailed worlds.",
			"Confirmed planet does not mean inhabited planet.",
			"The known catalog is shaped by which sizes and orbits current instruments can detect."
		],
		editorSummary:
			"Planets around other stars are established through several independent measurement techniques. The frontier is their composition and habitability, not whether they exist.",
		uncertaintySummary:
			"The existence of a large exoplanet population is settled. Occurrence rates for small long-period worlds and interpretation of atmospheres remain less certain.",
		sources: [
			exoplanetStrategy,
			[
				"consensus_statement",
				"NASA Exoplanet Archive",
				"NASA Exoplanet Science Institute",
				2026,
				"https://exoplanetarchive.ipac.caltech.edu/",
				"Curated mission archive maintains confirmed-planet parameters, discovery references, candidate tables, and standardized validation data."
			],
			[
				"guideline",
				"Exoplanets",
				"NASA Science",
				2026,
				"https://science.nasa.gov/exoplanets/",
				"NASA summarizes the independent methods used to discover and characterize planets orbiting other stars."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Does the Hubble tension by itself disprove the Big Bang model?",
		slug: "does-the-hubble-tension-by-itself-disprove-the-big-bang-model",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. The Hubble tension is a persistent mismatch between some measurements of today's expansion rate and values inferred from the early universe under the standard cosmological model. It may indicate hidden measurement systematics or new physics, but it does not erase the independent evidence for a hot, expanding early universe, including cosmic expansion, the microwave background, and light-element abundances.",
		stableCore: [
			"Different methods currently produce expansion-rate estimates that are difficult to reconcile within their stated uncertainties.",
			"The disagreement tests parameters and assumptions inside modern cosmology rather than returning astronomy to a static universe.",
			"Resolving the tension requires measurements with independent calibration and explicit model dependence."
		],
		openQuestions: [
			"Are unrecognized distance-ladder, stellar-population, or early-universe modeling systematics large enough to explain the mismatch?",
			"Would an additional particle, field, or period of early energy density improve the full cosmological data fit rather than one number alone?"
		],
		whatWouldChangeMinds: [
			"Independent methods converging on an expansion history incompatible with a hot early universe across all major observables.",
			"A new model that fits the microwave background, nucleosynthesis, structure, distances, and expansion data substantially better."
		],
		misconceptions: [
			"A tension is scientifically important without meaning the entire framework has collapsed.",
			"The Big Bang model is not a claim that matter exploded from one point into preexisting empty space.",
			"Adjusting error bars until estimates overlap would not resolve the underlying measurement or model question."
		],
		editorSummary:
			"The Hubble tension could reveal important new physics, but one disputed parameter does not cancel the broad evidence that the universe evolved from a hot, dense state.",
		uncertaintySummary:
			"The discrepancy is real enough to merit sustained scrutiny, while its cause remains unsettled. The hot Big Bang's core evidence is much broader than the disputed value.",
		sources: [
			nasaHubbleTension,
			[
				"systematic_review",
				"The expansion of the Universe is faster than expected",
				"Nature Reviews Physics",
				2019,
				"10.1038/s42254-019-0137-0",
				"Review presents the distance-ladder evidence, calibration checks, and why the mismatch may test cosmology rather than negate cosmic expansion."
			],
			[
				"systematic_review",
				"In the realm of the Hubble tension: a review of solutions",
				"Classical and Quantum Gravity",
				2021,
				"10.1088/1361-6382/ac086d",
				"Review compares proposed systematics and new-physics solutions against the wider cosmological evidence that each must continue to fit."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Does faster-than-light cosmic recession violate relativity?",
		slug: "does-faster-than-light-cosmic-recession-violate-relativity",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. In general relativity, very distant galaxies can acquire a recession rate greater than light speed because the distance defined across expanding spacetime changes. That is not the same as an object locally racing past nearby light or transmitting information faster than light. Relativity's local speed limit remains intact.",
		stableCore: [
			"Velocity between widely separated locations in curved, evolving spacetime is not one unique special-relativistic quantity.",
			"Cosmological redshift records expansion during a photon's journey and is not merely a conventional Doppler shift through static space.",
			"Causal horizons determine which signals can reach us; a recession-rate label alone does not enable superluminal communication."
		],
		openQuestions: [
			"How precisely will future observations constrain dark energy and the universe's long-term expansion history?",
			"Which distance and velocity definitions communicate relativistic cosmology most clearly without hiding coordinate dependence?"
		],
		whatWouldChangeMinds: [
			"A reproducible local experiment transmitting controllable information outside the light cone.",
			"A gravitational theory that fits cosmological and local tests better while assigning a different causal structure."
		],
		misconceptions: [
			"Special relativity's familiar velocity formula applies locally, not as a universal rule for every cosmological distance convention.",
			"Seeing a galaxy today does not imply its current recession rate is below light speed.",
			"Expansion faster than light is not a propulsion technology."
		],
		editorSummary:
			"Expanding distance across the universe and local motion through space are different concepts. Superluminal recession can occur in standard cosmology without a local relativity violation.",
		uncertaintySummary:
			"The geometric distinction is established. Communication can still be confusing because several legitimate cosmological distance and velocity definitions coexist.",
		sources: [
			cosmologicalHorizonsReview,
			[
				"consensus_statement",
				"Hubble Cosmological Redshift",
				"NASA Science",
				2025,
				"https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-cosmological-redshift/",
				"NASA explains how light stretches while crossing expanding space and why distant recession is described within general relativity."
			],
			planckCosmology
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is the observable universe necessarily the entire universe?",
		slug: "is-the-observable-universe-necessarily-the-entire-universe",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. The observable universe is the region from which light or other causal signals have had time to reach us, given cosmic history and expansion. The entire universe may extend far beyond that horizon and could be infinite, but observations cannot simply inventory regions that have never been causally connected to us.",
		stableCore: [
			"A horizon is an observational limit set by light travel and expansion, not evidence of a physical wall at the edge.",
			"The observable region is centered on every observer at that observer's location, so Earth is not a privileged geometric center.",
			"Near-flat spatial geometry allows a universe much larger than the observable region but does not prove it is infinite."
		],
		openQuestions: [
			"Is the global spatial extent finite or infinite, and does space have a nontrivial topology?",
			"What defensible indirect constraints can inflation and curvature measurements place on regions beyond our horizon?"
		],
		whatWouldChangeMinds: [
			"A validated observation showing the cosmic horizon is a material boundary and that no spacetime exists beyond it.",
			"A complete cosmological theory with unique, tested predictions fixing the universe's global size and topology."
		],
		misconceptions: [
			"The observable universe's radius is larger than its age in light-years because space expanded while light traveled.",
			"A map centered on Earth reflects our viewpoint, not evidence that Earth is the universe's center.",
			"Saying more may exist beyond the horizon is not the same as claiming direct observations of it."
		],
		editorSummary:
			"Our cosmic map ends at a causal horizon, not a demonstrated edge of existence. The whole universe is at least as large as the observable part and may be far larger.",
		uncertaintySummary:
			"The observational-horizon distinction is secure. Global size, topology, and what lies beyond the horizon remain model-dependent and may not be directly testable.",
		sources: [
			planckCosmology,
			cosmologicalHorizonsReview,
			[
				"guideline",
				"Universe Overview",
				"NASA Science",
				2026,
				"https://science.nasa.gov/universe/overview/",
				"NASA distinguishes the universe's observed history and large-scale contents from unresolved questions about its full extent and geometry."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Will the Sun eventually explode as a supernova?",
		slug: "will-the-sun-eventually-explode-as-a-supernova",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. The Sun is far below the initial mass needed for core-collapse supernova evolution. In roughly five billion years it will exhaust core hydrogen, expand through red-giant phases, shed its outer layers, and leave a dense white-dwarf remnant. Those changes will be catastrophic for Earth's present environment, but they are not a supernova explosion.",
		stableCore: [
			"A star's initial mass is the main determinant of whether its core can proceed to iron collapse and a supernova.",
			"Sun-like stars end as carbon-oxygen white dwarfs surrounded temporarily by expelled planetary-nebula gas.",
			"The Sun is stable on human timescales; its late stages are billions of years away."
		],
		openQuestions: [
			"Exactly how will mass loss, tidal interactions, and the red-giant envelope affect Earth's final orbit and survival?",
			"How do magnetic activity and composition refine models of the Sun's long-term luminosity evolution?"
		],
		whatWouldChangeMinds: [
			"Measurements showing the Sun has the mass and core evolution of a supernova progenitor rather than a low-mass star.",
			"A tested stellar-evolution model that explains observed star populations while giving Sun-like stars iron-core collapse."
		],
		misconceptions: [
			"Every star dies, but not every stellar death is a supernova.",
			"Planetary nebula is a historical name and does not mean planets explode.",
			"The Sun becoming a red giant is not an imminent hazard."
		],
		editorSummary:
			"The Sun lacks the mass for a core-collapse supernova. Its distant future is red giant, expelled envelope, and white dwarf.",
		uncertaintySummary:
			"The broad evolutionary path is strongly established from stellar physics and observed populations. Earth's precise fate during the red-giant phase is less certain.",
		sources: [
			nasaSunFacts,
			[
				"systematic_review",
				"Distant future of the Sun and Earth revisited",
				"Monthly Notices of the Royal Astronomical Society",
				2008,
				"10.1111/j.1365-2966.2008.13022.x",
				"Stellar-evolution modeling evaluates the Sun's red-giant mass loss and Earth's possible orbital fate without a supernova endpoint."
			],
			astronomyDecadal
		]
	})
];
