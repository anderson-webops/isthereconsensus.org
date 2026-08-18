import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheTwoClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026AstronomyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is Earth flat or approximately spherical?",
		slug: "is-earth-flat-or-approximately-spherical",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Earth is not flat. Measurements from astronomy, navigation, geodesy, gravity, and spacecraft show a nearly spherical planet that is slightly wider at the equator and irregular at finer scales. Calling Earth an oblate ellipsoid is an approximation for measurement, not a concession that its global shape is uncertain.",
		stableCore: [
			"The curved shadow in lunar eclipses, changing star positions with latitude, and circumnavigation were mutually consistent evidence long before spaceflight.",
			"Satellite orbits, global positioning, surveying, and long-distance navigation work only when Earth's curvature and gravity field are modeled.",
			"Rotation produces a small equatorial bulge; mountains, ocean trenches, and uneven mass make the real surface more complex than a perfect sphere."
		],
		openQuestions: [
			"How is Earth's shape and gravity field changing as ice, oceans, groundwater, and the mantle redistribute mass?",
			"Which reference ellipsoid and geoid model gives the precision needed for a particular scientific or navigation task?"
		],
		whatWouldChangeMinds: [
			"A repeatable geometric model that explains global observations and navigation more accurately than an ellipsoidal Earth.",
			"Independent satellite, astronomical, and geodetic measurements consistently contradicting measured curvature."
		],
		misconceptions: [
			"Photographs are not the only evidence for Earth's shape.",
			"A locally level horizon is expected on a planet whose radius is thousands of kilometers.",
			"Flat maps intentionally project a curved surface and therefore distort some combination of area, direction, distance, or shape."
		],
		editorSummary:
			"This is a direct measurement question, not a live scientific controversy. The useful nuance is that Earth is neither a perfect sphere nor a simple smooth ellipsoid at every scale.",
		uncertaintySummary:
			"There is no meaningful scientific uncertainty about the planet's global curvature. Precision geodesy studies small departures from idealized shapes and changes in the gravity-defined geoid.",
		sources: [
			{
				kind: "consensus_statement",
				title: "How Do We Know the Earth Isn't Flat? We Asked a NASA Expert",
				publisher: "NASA",
				year: 2025,
				url: "https://www.nasa.gov/earth/how-do-we-know-the-earth-isnt-flat-we-asked-a-nasa-expert-episode-53/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Institutional explanation connecting astronomical observations, travel, and space-age measurements of a round Earth.",
				order: 1
			},
			{
				kind: "context",
				title: "90 Years of Our Changing Views of Earth",
				publisher: "NASA",
				year: 2020,
				url: "https://www.nasa.gov/history/90-years-of-our-changing-views-of-earth/",
				appraisal: "high",
				stance: "supports",
				note: "Historical account of curvature evidence before and after high-altitude and spacecraft photography.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Fundamentals of Remote Sensing: The Shape of the Earth",
				publisher: "NASA Applied Remote Sensing Training Program",
				year: 2022,
				url: "https://disasters.nasa.gov/sites/default/files/2022-11/Fundamentals_of_RS_Edited_SC.pdf",
				appraisal: "high",
				stance: "context",
				note: "Technical training material explaining why geospatial work uses reference ellipsoids rather than a flat or perfectly spherical model.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Did humans land on the Moon?",
		slug: "did-humans-land-on-the-moon",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Six Apollo missions landed twelve people on the Moon between 1969 and 1972. The record includes independently tracked flights, returned lunar samples, instruments operated on the surface, laser-ranging reflectors still measured from Earth, and later orbital images of landing hardware and astronaut traverses.",
		stableCore: [
			"Apollo returned about 382 kilograms of lunar rock and soil that laboratories around the world have studied.",
			"Modern lunar orbiters have imaged descent stages, experiments, rover tracks, and disturbed soil at all six landing sites.",
			"Observatories continue to range lasers to reflector arrays placed by Apollo astronauts, producing millimeter-scale Earth-Moon measurements."
		],
		openQuestions: [
			"What additional science can be extracted from Apollo samples and the continuing lunar laser-ranging archive?",
			"How should historic landing sites be protected as robotic and crewed lunar activity increases?"
		],
		whatWouldChangeMinds: [
			"A coherent alternative explaining the samples, tracking records, hardware, images, and continuing experiments without the landings.",
			"Independent examination showing that multiple physical evidence streams were misidentified or fabricated."
		],
		misconceptions: [
			"A photograph that looks unfamiliar is not evidence that the mission record was staged.",
			"Retroreflectors alone are not the entire case; they are one part of a much larger, mutually reinforcing record.",
			"The absence of stars in many surface photographs follows from exposure settings for sunlit subjects."
		],
		editorSummary:
			"The lunar landings are among the most redundantly documented events in exploration history. A responsible review weighs the complete physical and observational record rather than isolated photographic claims.",
		uncertaintySummary:
			"Uncertainty concerns details of lunar history and mission measurements, not whether the landings occurred. No hoax account explains the independent and persistent evidence as well as the documented missions.",
		sources: [
			{
				kind: "consensus_statement",
				title: "15 Years Ago: Lunar Reconnaissance Orbiter Begins Moon Mapping Mission",
				publisher: "NASA",
				year: 2024,
				url: "https://www.nasa.gov/history/15-years-ago-lunar-reconnaissance-orbiter-begins-moon-mapping-mission/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "NASA overview documenting LRO images of hardware and surface disturbances at all six Apollo landing sites.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Fifteen Years of Millimeter Accuracy Lunar Laser Ranging with APOLLO: Data Set Characterization",
				publisher: "Publications of the Astronomical Society of the Pacific",
				year: 2023,
				url: "https://doi.org/10.1088/1538-3873/aceb2f",
				doi: "10.1088/1538-3873/aceb2f",
				appraisal: "high",
				stance: "supports",
				note: "Peer-reviewed characterization of laser measurements to five lunar reflectors, including arrays placed during Apollo missions.",
				order: 2
			},
			{
				kind: "context",
				title: "Apollo 11",
				publisher: "NASA",
				year: 2026,
				url: "https://www.nasa.gov/mission/apollo-11/",
				appraisal: "high",
				stance: "supports",
				note: "Mission archive bringing together flight records, images, audio, surface experiments, and later orbital observations.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is the universe expanding?",
		slug: "is-the-universe-expanding",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. On large scales, space is expanding: light from distant galaxies is systematically redshifted, and several independent distance methods relate greater distance to greater recession. The expansion is currently accelerating, although different methods still disagree modestly about its exact present rate.",
		stableCore: [
			"The Hubble-Lemaître relation links galaxy distance with cosmological redshift across large samples.",
			"Supernovae, gravitational lenses, baryon acoustic structure, and the cosmic microwave background provide complementary expansion measurements.",
			"Expansion does not mean galaxies are flying away from a unique central point inside pre-existing empty space."
		],
		openQuestions: [
			"Why do local and early-universe inferences of the Hubble constant remain in tension?",
			"What physical entity or modification of gravity explains the observed accelerated expansion?"
		],
		whatWouldChangeMinds: [
			"Independent distance-redshift measurements consistently showing no large-scale expansion.",
			"A replacement model explaining redshift, supernovae, cosmic structure, and background radiation more accurately with fewer unsupported assumptions."
		],
		misconceptions: [
			"Bound systems such as atoms, people, planets, and many galaxies do not simply expand with the universe.",
			"Cosmological redshift is not adequately explained as ordinary motion through static space alone.",
			"Disagreement over the precise expansion rate is not disagreement over whether expansion occurs."
		],
		editorSummary:
			"Cosmic expansion is a foundational observation. The frontier lies in measuring its history and cause precisely, especially the Hubble tension and dark energy.",
		uncertaintySummary:
			"Systematic errors and model assumptions affect the inferred expansion rate. Multiple measurement families nevertheless converge on an expanding universe and late-time acceleration.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Hubble Cosmological Redshift",
				publisher: "NASA Science",
				year: 2024,
				url: "https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-cosmological-redshift/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Institutional explanation of the distance-redshift evidence and modern expansion-rate measurement.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Planck 2018 results. VI. Cosmological parameters",
				publisher: "Astronomy & Astrophysics",
				year: 2020,
				url: "https://doi.org/10.1051/0004-6361/201833910",
				doi: "10.1051/0004-6361/201833910",
				appraisal: "high",
				stance: "supports",
				note: "Major collaboration synthesis using cosmic microwave background data to constrain the expansion history and cosmological parameters.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Observational Evidence from Supernovae for an Accelerating Universe and a Cosmological Constant",
				publisher: "The Astronomical Journal",
				year: 1998,
				url: "https://doi.org/10.1086/300499",
				doi: "10.1086/300499",
				appraisal: "high",
				stance: "supports",
				note: "Landmark supernova analysis finding that the late-time cosmic expansion is accelerating.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Is the hot Big Bang the best-supported broad model of cosmic history?",
		slug: "is-the-hot-big-bang-the-best-supported-broad-model-of-cosmic-history",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. The hot Big Bang model—that the observable universe evolved from a much hotter, denser early state—is supported by expansion, the cosmic microwave background, primordial light-element abundances, and the growth of cosmic structure. It does not by itself explain an absolute beginning, what preceded the earliest testable era, or the mechanism of inflation.",
		stableCore: [
			"The cosmic microwave background has the near-perfect thermal spectrum expected from a formerly hot, opaque universe.",
			"The observed abundance pattern of hydrogen, helium, and deuterium broadly matches early-universe nuclear-reaction calculations.",
			"Tiny early density variations measured in background radiation evolved into the galaxies and large-scale structure observed later."
		],
		openQuestions: [
			"What physical process produced inflation or another very-early-universe phase?",
			"How should gravity and quantum physics be combined at conditions earlier than current observations can probe?"
		],
		whatWouldChangeMinds: [
			"A competing model that jointly predicts the microwave background spectrum and anisotropies, light elements, expansion, and structure more successfully.",
			"Robust observations contradicting several independent hot-early-universe predictions."
		],
		misconceptions: [
			"The model is not a claim that matter exploded from one point into surrounding empty space.",
			"The first fraction of cosmic history is less certain than the later hot, expanding phase.",
			"New observations that refine early galaxy formation do not automatically overturn the Big Bang framework."
		],
		editorSummary:
			"The durable consensus is about a hot, dense, expanding early universe. Popular statements that the theory fully explains creation or every instant back to time zero go beyond its established evidence.",
		uncertaintySummary:
			"The broad thermal history is highly constrained. Inflation, baryogenesis, dark matter, dark energy, and the earliest accessible moment remain active research areas.",
		sources: [
			{
				kind: "consensus_statement",
				title: "COBE's Top Discoveries",
				publisher: "NASA Science",
				year: 2024,
				url: "https://science.nasa.gov/mission/cobe/science/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "NASA summary of COBE's precision thermal spectrum and first mapped temperature variations in the cosmic microwave background.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Planck 2018 results. VI. Cosmological parameters",
				publisher: "Astronomy & Astrophysics",
				year: 2020,
				url: "https://doi.org/10.1051/0004-6361/201833910",
				doi: "10.1051/0004-6361/201833910",
				appraisal: "high",
				stance: "supports",
				note: "Precision cosmological synthesis testing the standard hot-Big-Bang model against satellite observations.",
				order: 2
			},
			{
				kind: "context",
				title: "Big Bang and the Evolution of the Universe",
				publisher: "NASA Science",
				year: 2025,
				url: "https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/big-bang-and-the-evolution-of-the-universe/",
				appraisal: "high",
				stance: "context",
				note: "Current institutional overview separating strong CMB evidence from unsettled inflationary physics.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Are black holes real astronomical objects?",
		slug: "are-black-holes-real-astronomical-objects",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Astronomers observe compact objects whose masses, orbital effects, accretion, gravitational-wave mergers, and horizon-scale shadows match black-hole predictions. Open questions about singularities, quantum gravity, and possible small deviations from general relativity do not make the astrophysical objects themselves speculative.",
		stableCore: [
			"Stellar orbits reveal millions of solar masses confined near the center of the Milky Way without visible matter that could remain stable there.",
			"LIGO and Virgo measure merger waveforms consistent with pairs of compact black holes and their predicted ringdown.",
			"The Event Horizon Telescope imaged bright rings and central shadows around M87* and Sagittarius A* at the expected scales."
		],
		openQuestions: [
			"Do astrophysical black holes follow the Kerr solution exactly at all observable scales?",
			"How does quantum physics resolve information, horizons, and the classical singularity?"
		],
		whatWouldChangeMinds: [
			"A viable compact-object model that fits orbital, electromagnetic, and gravitational-wave observations better than black holes.",
			"Repeated horizon-scale or merger observations showing systematic departures incompatible with black-hole predictions."
		],
		misconceptions: [
			"The image of a black-hole shadow is not a photograph of material inside the event horizon.",
			"Black holes do not indiscriminately suck in everything around them; distant objects orbit according to gravity.",
			"Uncertainty about the interior singularity is not uncertainty about the existence of extremely compact astrophysical objects."
		],
		editorSummary:
			"Black holes moved from theoretical prediction to a multi-messenger observational science. The strongest language should still distinguish observed external behavior from untested claims about their deepest interiors.",
		uncertaintySummary:
			"Mass, spin, environment, and alternative metric tests retain uncertainty. Independent electromagnetic, orbital, and gravitational-wave evidence nevertheless strongly supports astrophysical black holes.",
		sources: [
			{
				kind: "landmark_study",
				title: "First M87 Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole",
				publisher: "The Astrophysical Journal Letters",
				year: 2019,
				url: "https://doi.org/10.3847/2041-8213/ab0ec7",
				doi: "10.3847/2041-8213/ab0ec7",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Horizon-scale image and modeling of M87* providing powerful evidence for a supermassive black hole.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Observation of Gravitational Waves from a Binary Black Hole Merger",
				publisher: "Physical Review Letters",
				year: 2016,
				url: "https://doi.org/10.1103/PhysRevLett.116.061102",
				doi: "10.1103/PhysRevLett.116.061102",
				appraisal: "high",
				stance: "supports",
				note: "First direct gravitational-wave detection, with an inspiral, merger, and ringdown matching a binary black-hole system.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "First Sagittarius A* Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole in the Center of the Milky Way",
				publisher: "The Astrophysical Journal Letters",
				year: 2022,
				url: "https://doi.org/10.3847/2041-8213/ac6674",
				doi: "10.3847/2041-8213/ac6674",
				appraisal: "high",
				stance: "supports",
				note: "Independent horizon-scale observations of the compact object at our own galaxy's center.",
				order: 3
			},
			{
				kind: "consensus_statement",
				title: "How Do We Know There Are Black Holes?",
				publisher: "NASA Science",
				year: 2026,
				url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-do-we-know-there-are-black-holes/",
				appraisal: "high",
				stance: "supports",
				note: "Institutional synthesis connecting stellar orbits, accretion signatures, horizon-scale images, and gravitational waves as mutually reinforcing evidence.",
				order: 4
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Does astrology predict personality or events better than chance?",
		slug: "does-astrology-predict-personality-or-events-better-than-chance",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"Controlled tests do not show that astrological birth charts reliably predict personality, compatibility, or life events better than chance. People can still find cultural or reflective meaning in astrology, but that is different from demonstrated predictive accuracy.",
		stableCore: [
			"Double-blind matching tests have not shown that astrologers can reliably connect natal charts with validated personality profiles.",
			"Large datasets find no stable zodiac-based pattern in personality, intelligence, marriage selection, or divorce risk.",
			"Vague, broadly flattering descriptions and prior knowledge of a zodiac label can increase perceived personal accuracy."
		],
		openQuestions: [
			"Which psychological and cultural processes make astrological readings feel personally useful or accurate?",
			"Can proponents preregister specific, falsifiable predictions that replicate under blinded conditions?"
		],
		whatWouldChangeMinds: [
			"Preregistered, adequately powered, independently replicated tests in which astrological predictions outperform chance and ordinary information.",
			"A plausible mechanism producing precise predictions across cultures and astrological systems."
		],
		misconceptions: [
			"A meaningful personal experience does not by itself establish predictive validity.",
			"Season-of-birth effects, where they occur, would not validate zodiac mechanisms.",
			"Critiques of one classic experiment do not erase null results from other designs and larger datasets."
		],
		editorSummary:
			"The evidence does not support astrology as a predictive science. This conclusion need not ridicule cultural practice; it simply keeps subjective meaning separate from claims that can be tested against chance.",
		uncertaintySummary:
			"Astrological claims vary and can be difficult to specify prospectively. Some classic tests have methodological critics, but independent null findings and the absence of replicable predictive effects support the overall conclusion.",
		sources: [
			{
				kind: "landmark_study",
				title: "A double-blind test of astrology",
				publisher: "Nature",
				year: 1985,
				url: "https://doi.org/10.1038/318419a0",
				doi: "10.1038/318419a0",
				isAnchor: true,
				appraisal: "moderate",
				stance: "supports",
				note: "Influential double-blind test finding natal-chart personality matching no better than chance; later methodological debate is part of the appraisal.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "The relationship between date of birth and individual differences in personality and general intelligence: A large-scale study",
				publisher: "Personality and Individual Differences",
				year: 2006,
				url: "https://doi.org/10.1016/j.paid.2005.11.017",
				doi: "10.1016/j.paid.2005.11.017",
				appraisal: "high",
				stance: "supports",
				note: "Analysis of more than 15,000 people finding no support for zodiac-based personality or intelligence differences.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "The validity of astrological predictions on marriage and divorce: a longitudinal analysis of Swedish register data",
				publisher: "Genus",
				year: 2020,
				url: "https://doi.org/10.1186/s41118-020-00103-5",
				doi: "10.1186/s41118-020-00103-5",
				appraisal: "high",
				stance: "supports",
				note: "Large longitudinal register study finding no consistent astrological compatibility signal in marriage formation or divorce.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Is astrology relevant to consciousness and psi?",
				publisher: "Journal of Consciousness Studies",
				year: 2003,
				url: "https://journalpsyche.org/articles/0xc062.pdf",
				appraisal: "moderate",
				stance: "supports",
				note: "Review and meta-analysis of more than forty controlled studies finding astrologers did not perform significantly better than chance; later methodological criticism informs the page's caution.",
				order: 4
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Has life beyond Earth been scientifically confirmed?",
		slug: "has-life-beyond-earth-been-scientifically-confirmed",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		reviewMode: "living",
		bottomLine:
			"No. As of this review, no extraterrestrial organism, fossil, biosignature, or technosignature has been confirmed. Potentially habitable environments and intriguing chemical signals make the search scientifically promising, but high-stakes detection requires multiple independent measurements and serious exclusion of non-biological explanations.",
		stableCore: [
			"Thousands of exoplanets and several ocean-bearing Solar System worlds make testable searches possible without proving that life exists there.",
			"Many proposed biosignatures can also arise through geology, atmospheric chemistry, contamination, or measurement error.",
			"A credible detection would likely develop through graded, independently checked evidence rather than a single dramatic image or molecule."
		],
		openQuestions: [
			"Which combinations of atmospheric, surface, isotopic, or chemical evidence can reliably distinguish life from abiotic processes?",
			"How common are habitable environments, life, complex life, and technological civilizations?"
		],
		whatWouldChangeMinds: [
			"Independent teams confirming a biosignature or organism with calibrated data and excluded non-biological alternatives.",
			"A reproducible technosignature with an information-rich or engineered origin that ordinary astrophysics cannot explain."
		],
		misconceptions: [
			"Not yet confirmed does not mean scientists believe extraterrestrial life is impossible.",
			"A planet in a habitable zone is not necessarily inhabited or even habitable in practice.",
			"An unusual molecule is evidence to investigate, not automatically a discovery of life."
		],
		editorSummary:
			"The scientifically honest position combines openness with restraint: the search is active and plausible, but there is no confirmed detection yet. This page is maintained as a living review.",
		uncertaintySummary:
			"The conclusion about current confirmation is firm but time-sensitive. Habitability and candidate biosignatures involve model uncertainty, incomplete environmental context, and substantial false-positive risk.",
		sources: [
			{
				kind: "consensus_statement",
				title: "About Astrobiology: Life, Here and Beyond",
				publisher: "NASA Astrobiology",
				year: 2022,
				url: "https://astrobiology.nasa.gov/about/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "NASA states that no life beyond Earth has been found while explaining why the search remains scientifically plausible.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Independent Review of the Community Report from the Biosignature Standards of Evidence Workshop",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2022,
				url: "https://doi.org/10.17226/26621",
				doi: "10.17226/26621",
				appraisal: "high",
				stance: "context",
				note: "Independent review of proposed standards for evaluating and communicating evidence of extraterrestrial life.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Call for a framework for reporting evidence for life beyond Earth",
				publisher: "Nature",
				year: 2021,
				url: "https://doi.org/10.1038/s41586-021-03804-9",
				doi: "10.1038/s41586-021-03804-9",
				appraisal: "high",
				stance: "context",
				note: "NASA-led framework explaining why incremental evidence, alternatives, and calibrated public communication matter for life-detection claims.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Do UAP reports establish extraterrestrial visitation?",
		slug: "do-uap-reports-establish-extraterrestrial-visitation",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "moderate",
		reviewMode: "living",
		bottomLine:
			"No. Some unidentified anomalous phenomenon reports remain unresolved because the observations are sparse or poor, but no publicly available, scientifically validated evidence establishes extraterrestrial craft or visitation. Unresolved means the available data do not support a confident identification; it is not affirmative evidence for aliens.",
		stableCore: [
			"Many cases are eventually attributed to balloons, aircraft, satellites, atmospheric effects, sensor artifacts, or observer error.",
			"Cases with too little information can remain unidentified without favoring any extraordinary explanation.",
			"NASA and U.S. government reviews call for better standardized data and report no conclusive evidence of extraterrestrial origin."
		],
		openQuestions: [
			"What fraction of future well-instrumented reports will remain anomalous after aviation, satellite, weather, and sensor data are integrated?",
			"How can reporting systems improve data quality while protecting legitimate flight-safety and national-security information?"
		],
		whatWouldChangeMinds: [
			"Authenticated multi-sensor data and recoverable material independently demonstrating technology not plausibly produced on Earth.",
			"Repeated observations with calibrated instruments that rule out known natural, human, and sensor explanations."
		],
		misconceptions: [
			"Unidentified is a statement about evidence quality, not an object category.",
			"Eyewitness sincerity does not guarantee accurate distance, speed, size, or identity.",
			"Government interest in airspace anomalies does not itself validate an extraterrestrial explanation."
		],
		editorSummary:
			"UAP reports deserve proportionate investigation for safety, security, and science. The current evidence does not justify converting uncertainty into a claim of extraterrestrial visitation.",
		uncertaintySummary:
			"Public datasets are incomplete and some cases cannot be resolved. That limits both ordinary identification and extraordinary inference; it does not provide positive evidence of alien origin.",
		sources: [
			{
				kind: "consensus_statement",
				title: "NASA Unidentified Anomalous Phenomena Independent Study Team Report",
				publisher: "NASA",
				year: 2023,
				url: "https://www.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report-0.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Independent study finding no conclusive peer-reviewed evidence of extraterrestrial UAP origin and emphasizing inadequate data.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Report on the Historical Record of U.S. Government Involvement with Unidentified Anomalous Phenomena, Volume I",
				publisher: "All-domain Anomaly Resolution Office",
				year: 2024,
				url: "https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol_1_2024.pdf",
				appraisal: "moderate",
				stance: "supports",
				note: "Official historical review reporting no verified evidence that U.S. investigations confirmed extraterrestrial technology.",
				order: 2
			},
			{
				kind: "guideline",
				title: "NASA Unidentified Anomalous Phenomena Study",
				publisher: "NASA Science",
				year: 2026,
				url: "https://science.nasa.gov/uap/",
				appraisal: "high",
				stance: "context",
				note: "Current institutional hub for the study's scope, report, data principles, and public materials.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Can solar storms disrupt technology and electric grids?",
		slug: "can-solar-storms-disrupt-technology-and-electric-grids",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Solar flares and coronal mass ejections can disturb near-Earth space, disrupting radio communication, satellite operations, navigation, and—in severe geomagnetic storms—electric grids. Impacts depend on storm orientation and strength, infrastructure design, latitude, preparedness, and operating decisions.",
		stableCore: [
			"Energetic solar events can produce radiation storms, radio blackouts, and geomagnetic disturbances through different physical pathways.",
			"Changing magnetic fields induce currents in long conductors, including transmission lines and pipelines.",
			"Forecasts and operational mitigation reduce risk, but the timing and Earth-directed magnetic structure of an eruption retain uncertainty."
		],
		openQuestions: [
			"How vulnerable are modern interconnected grids, satellites, aviation routes, and timing services to an extreme rare event?",
			"How much warning and infrastructure hardening provide the most cost-effective resilience?"
		],
		whatWouldChangeMinds: [
			"Physical measurements and operational records consistently failing to link geomagnetic disturbances with induced currents and technology effects.",
			"A replacement space-weather model that predicts observed disturbances and impacts more accurately."
		],
		misconceptions: [
			"A strong solar storm does not guarantee a global blackout.",
			"The visible aurora is an indicator of space-weather activity, not the mechanism that damages equipment.",
			"Solar storms and long-term climate change are different phenomena operating through different mechanisms."
		],
		editorSummary:
			"The hazard is established; catastrophe claims require more care. Practical risk depends on event characteristics, exposed systems, engineering, and operator response.",
		uncertaintySummary:
			"Historical impacts and electromagnetic mechanisms are well documented. The probability and cascading consequences of the most extreme low-frequency events are much less certain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Severe Space Weather Events—Understanding Societal and Economic Impacts: A Workshop Report",
				publisher: "National Academies Press",
				year: 2008,
				url: "https://doi.org/10.17226/12507",
				doi: "10.17226/12507",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Authoritative assessment of documented impacts and vulnerabilities across power, communications, spacecraft, and other infrastructure.",
				order: 1
			},
			{
				kind: "guideline",
				title: "NOAA Space Weather Scales",
				publisher: "NOAA Space Weather Prediction Center",
				url: "https://www.swpc.noaa.gov/noaa-scales-explanation",
				appraisal: "high",
				stance: "supports",
				note: "Operational scale linking geomagnetic storms, solar radiation storms, and radio blackouts to expected technological effects.",
				order: 2
			},
			{
				kind: "context",
				title: "Geomagnetic Storms",
				publisher: "NOAA Space Weather Prediction Center",
				url: "https://www.swpc.noaa.gov/phenomena/geomagnetic-storms",
				appraisal: "high",
				stance: "context",
				note: "Current operational explanation of geomagnetic storms, induced currents, and affected systems.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "astronomy-and-space",
		title: "Has the particle identity of dark matter been directly detected?",
		slug: "has-the-particle-identity-of-dark-matter-been-directly-detected",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		reviewMode: "living",
		bottomLine:
			"No. Multiple astronomical observations strongly indicate additional gravitating mass commonly called dark matter, but no proposed dark-matter particle has been confirmed through a direct, indirect, or collider detection. Experiments have instead ruled out substantial portions of candidate parameter space.",
		stableCore: [
			"Galaxy motions, gravitational lensing, galaxy clusters, the cosmic microwave background, and structure formation converge on missing gravitating mass.",
			"Evidence for a gravitational phenomenon is not the same as identifying a new particle.",
			"Leading underground searches have set increasingly strong limits while reporting no confirmed standard WIMP signal."
		],
		openQuestions: [
			"Is dark matter a WIMP, axion, sterile neutrino, primordial compact object, hidden-sector particle, or something else?",
			"Can modified gravity explain every relevant scale without an additional matter component?"
		],
		whatWouldChangeMinds: [
			"A repeatable laboratory or astrophysical signal with properties matching one dark-matter candidate across independent detectors.",
			"A non-dark-matter theory that jointly fits lensing, clusters, the microwave background, and structure formation better than current models."
		],
		misconceptions: [
			"Dark matter has not been photographed as a substance; its distribution is inferred mainly through gravity.",
			"A null WIMP search does not show that the astronomical evidence disappeared.",
			"The word dark labels weak electromagnetic interaction, not moral danger or ordinary black material."
		],
		editorSummary:
			"This page deliberately separates two confidence levels: evidence for unseen gravitating mass is strong, while its microscopic identity remains one of physics' major open questions.",
		uncertaintySummary:
			"The inferred cosmic abundance is precise within the standard cosmological framework, but candidate type, interaction strength, small-scale behavior, and possible gravity alternatives remain unsettled.",
		sources: [
			{
				kind: "systematic_review",
				title: "Review of Particle Physics: Dark Matter",
				publisher: "Particle Data Group",
				year: 2025,
				url: "https://pdg.lbl.gov/2025/reviews/rpp2025-rev-dark-matter.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Field review separating the convergent astrophysical case from still-unconfirmed particle candidates and detection strategies.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Status of dark matter in the universe",
				publisher: "International Journal of Modern Physics D",
				year: 2017,
				url: "https://doi.org/10.1142/S0218271817300129",
				doi: "10.1142/S0218271817300129",
				appraisal: "high",
				stance: "supports",
				note: "Review of independent observational evidence and candidate detection claims requiring confirmation.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Dark Matter Search Results from 4.2 Tonne-Years of Exposure of the LUX-ZEPLIN Experiment",
				publisher: "Physical Review Letters",
				year: 2025,
				url: "https://doi.org/10.1103/4dyc-z8zf",
				doi: "10.1103/4dyc-z8zf",
				appraisal: "high",
				stance: "context",
				note: "Leading direct-detection search finding no WIMP signal and setting stronger interaction limits.",
				order: 3
			}
		]
	})
];
