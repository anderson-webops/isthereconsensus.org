import type { AtlasBreadthSourceTuple } from "./claim-expansion-2026-09-atlas-breadth-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthClaim as reviewedClaim } from "./claim-expansion-2026-09-atlas-breadth-shared.js";

const relativityReview = [
	"systematic_review",
	"The Confrontation between General Relativity and Experiment",
	"Living Reviews in Relativity",
	2014,
	"10.12942/lrr-2014-4",
	"Living review synthesizes increasingly precise tests of general relativity, including universality of free fall and the equivalence principle."
] as const satisfies AtlasBreadthSourceTuple;

const decoherenceReview = [
	"systematic_review",
	"Decoherence, the measurement problem, and interpretations of quantum mechanics",
	"Reviews of Modern Physics",
	2005,
	"10.1103/RevModPhys.76.1267",
	"Review separates experimentally grounded environment-induced decoherence from unresolved interpretive questions and does not require a conscious mind to produce ordinary measurement records."
] as const satisfies AtlasBreadthSourceTuple;

const quantumTeleportationReview = [
	"systematic_review",
	"Progress in quantum teleportation",
	"Nature Reviews Physics",
	2023,
	"10.1038/s42254-023-00588-x",
	"Review covers teleportation of quantum states across physical platforms, emphasizing entanglement, classical communication, fidelity, distance, rates, and network applications."
] as const satisfies AtlasBreadthSourceTuple;

const quantumComputingAssessment = [
	"consensus_statement",
	"Quantum Computing: Progress and Prospects",
	"National Academies of Sciences, Engineering, and Medicine",
	2019,
	"10.17226/25196",
	"National Academies assessment distinguishes problems with known quantum advantages from ordinary workloads, and evaluates hardware, error correction, algorithms, security, and realistic development timelines."
] as const satisfies AtlasBreadthSourceTuple;

const antimatterGravityStudy = [
	"landmark_study",
	"Observation of the effect of gravity on the motion of antimatter",
	"Nature",
	2023,
	"10.1038/s41586-023-06527-1",
	"ALPHA collaboration directly observed antihydrogen's vertical motion and rejected repulsive antigravity of magnitude one Earth gravity, with results consistent with downward acceleration."
] as const satisfies AtlasBreadthSourceTuple;

const chemicalRiskAssessment = [
	"consensus_statement",
	"Science and Decisions: Advancing Risk Assessment",
	"National Research Council",
	2009,
	"10.17226/12209",
	"National Academies framework evaluates hazard, dose-response, exposure, susceptible populations, uncertainty, and decision context rather than treating a substance's natural or synthetic origin as a risk category."
] as const satisfies AtlasBreadthSourceTuple;

const iupacPhRecommendation = [
	"guideline",
	"Definition of pH scales, standard reference values, measurement of pH and related terminology: Recommendations 1984",
	"International Union of Pure and Applied Chemistry",
	1985,
	"10.1351/pac198557030531",
	"IUPAC defines pH through hydrogen-ion activity and measurement conventions, clarifying why textbook 0-to-14 examples are not universal mathematical bounds."
] as const satisfies AtlasBreadthSourceTuple;

const absoluteZeroStudy = [
	"landmark_study",
	"A general derivation and quantification of the third law of thermodynamics",
	"Nature Communications",
	2017,
	"10.1038/ncomms14538",
	"Resource-theoretic derivation quantifies the unattainability principle: cooling closer to absolute zero requires diverging time or resources under physical constraints."
] as const satisfies AtlasBreadthSourceTuple;

const entropyReview = [
	"systematic_review",
	"The physics and mathematics of the second law of thermodynamics",
	"Physics Reports",
	1999,
	"10.1016/S0370-1573(98)00082-9",
	"Review develops thermodynamic and statistical formulations of the second law and entropy beyond informal visual analogies such as disorder."
] as const satisfies AtlasBreadthSourceTuple;

export const september2026AtlasBreadthPhysicsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Can sound travel through a perfect vacuum?",
		slug: "can-sound-travel-through-a-perfect-vacuum",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Sound is a mechanical disturbance transmitted through matter, such as gas, liquid, solid, or plasma. A perfect vacuum has no particles to carry an acoustic pressure or elastic wave. Electromagnetic waves can cross vacuum, so a radio can transmit information from a spacecraft, but the radio signal is converted into sound only when a speaker moves matter near a listener.",
		stableCore: [
			"Mechanical waves require a medium with inertia and restoring forces.",
			"Sound speed and attenuation depend on the medium's density, elasticity, temperature, composition, and frequency.",
			"Space is not always a perfect vacuum; sparse gas and plasma can support pressure waves, though not ordinary unaided hearing."
		],
		openQuestions: [
			"How can extremely weak pressure waves in tenuous astrophysical plasmas best be measured and sonified?",
			"How do acoustic-like collective excitations behave in unusual quantum materials and ultracold gases?"
		],
		whatWouldChangeMinds: [
			"A reproducible detection of a mechanical pressure wave propagating through a region with no matter or field medium capable of carrying it.",
			"A physical theory that predicts such transmission and outperforms existing wave mechanics in controlled vacuum experiments."
		],
		misconceptions: [
			"Recorded spacecraft sounds are commonly radio, plasma, or instrument data translated into audible frequencies.",
			"An explosion in space can emit light and moving debris even though no ordinary sound crosses the vacuum to an observer.",
			"Gravity and electromagnetic fields crossing vacuum do not make them sound waves."
		],
		editorSummary:
			"Sound needs matter to compress, shear, or otherwise oscillate. Vacuum can carry light and fields, but it cannot carry an ordinary acoustic wave.",
		uncertaintySummary:
			"The requirement for a material medium is settled. Research on plasma waves, quantum excitations, and data sonification uses broader analogies, not exceptions to it.",
		sources: [
			[
				"guideline",
				"Can sound travel through space?",
				"NASA Goddard Space Flight Center",
				2024,
				"https://science.gsfc.nasa.gov/attic/cosmicopia.gsfc.nasa.gov/qa_sp_ev.html",
				"NASA educational explanation distinguishes mechanical sound, which needs matter, from electromagnetic communication and scientific sonification."
			],
			[
				"guideline",
				"Sound",
				"OpenStax University Physics",
				2022,
				"https://openstax.org/books/university-physics-volume-1/pages/17-introduction",
				"University physics synthesis derives mechanical-wave propagation through material media and relates sound speed to medium properties."
			],
			[
				"context",
				"Sounds of Mars",
				"NASA Mars Exploration Program",
				2026,
				"https://science.nasa.gov/mission/mars-2020-perseverance/sounds-of-mars/",
				"Microphone recordings from Mars demonstrate that sound can propagate through a thin atmosphere while behaving differently from sound in denser air."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Do heavier objects fall faster than lighter objects in a vacuum?",
		slug: "do-heavier-objects-fall-faster-than-lighter-objects-in-a-vacuum",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No, when they start together at the same place with the same velocity and other forces are negligible. In a vacuum, objects follow the same gravitational acceleration regardless of their mass or composition to extremely high experimental precision. In air, drag and buoyancy depend on shape, area, density, and speed, so a feather can fall more slowly than a compact heavy object.",
		stableCore: [
			"The equivalence principle identifies inertial response and gravitational coupling as universal within tested precision.",
			"Vacuum-drop demonstrations remove most aerodynamic differences but not every tiny environmental or measurement effect.",
			"Objects also attract Earth, so exact two-body descriptions include an imperceptibly larger motion of Earth toward a heavier object."
		],
		openQuestions: [
			"Will future atom-interferometer, satellite, lunar, or antimatter tests detect any composition-dependent violation?",
			"How should candidate quantum-gravity theories connect possible violations to experimentally accessible scales?"
		],
		whatWouldChangeMinds: [
			"Replicated vacuum experiments finding a mass- or composition-dependent acceleration beyond characterized forces and systematic errors.",
			"A theory predicting the anomaly and succeeding across independent terrestrial and space tests."
		],
		misconceptions: [
			"A crumpled paper falling faster than a flat sheet demonstrates air drag, not stronger gravitational acceleration.",
			"Equal acceleration does not mean equal gravitational force; inertial mass scales too.",
			"The statement is an experimentally tested approximation within a gravitational environment, not a claim that every trajectory everywhere is identical."
		],
		editorSummary:
			"Remove air resistance and gravity accelerates ordinary test bodies alike to extraordinary precision. Familiar differences in falling speed mostly come from the medium and shape.",
		uncertaintySummary:
			"Universality of free fall is strongly confirmed, while ever more precise tests continue because a tiny violation could reveal new physics.",
		sources: [
			relativityReview,
			[
				"landmark_study",
				"MICROSCOPE Mission: Final Results of the Test of the Equivalence Principle",
				"Physical Review Letters",
				2022,
				"10.1103/PhysRevLett.129.121102",
				"Satellite experiment finds no differential acceleration between test masses at roughly one part in 10^15, sharply constraining equivalence-principle violation."
			],
			[
				"context",
				"The Apollo 15 Hammer-Feather Drop",
				"NASA Science",
				2025,
				"https://science.nasa.gov/resource/the-apollo-15-hammer-feather-drop/",
				"Apollo 15 record documents a hammer and feather falling together in the Moon's near-vacuum as a visible demonstration of negligible air resistance."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Does quantum mechanics require a conscious observer to make measurements real?",
		slug: "does-quantum-mechanics-require-a-conscious-observer-to-make-measurements-real",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. In experiments, a measurement is a physical interaction that correlates a quantum system with an apparatus, environment, or durable record. Detectors operate and decoherence occurs without a person watching. Physicists still debate what the formalism says about reality, probabilities, and outcomes, but established quantum predictions do not require human awareness as a special force that triggers them.",
		stableCore: [
			"Environment-induced decoherence explains why interference becomes inaccessible when quantum alternatives entangle with many uncontrolled degrees of freedom.",
			"Decoherence does not by itself settle every interpretation of a single definite outcome.",
			"Experiments are described by physical preparations, interactions, records, and statistics, not by measuring a researcher's consciousness."
		],
		openQuestions: [
			"Which interpretation or extension best explains quantum probabilities and definite experiences without changing successful predictions?",
			"Can experiments distinguish objective-collapse models from standard unitary quantum theory at larger scales?"
		],
		whatWouldChangeMinds: [
			"Controlled experiments showing identical physical detectors yield different quantum statistics solely because a conscious observer is or is not aware of the result.",
			"A reproducible consciousness-dependent model that predicts new outcomes better than ordinary quantum dynamics and decoherence."
		],
		misconceptions: [
			"Observer in quantum theory usually means a measurement arrangement or interacting system, not necessarily a mind.",
			"Saying consciousness is unnecessary does not resolve all philosophical interpretations.",
			"Delayed observation of a stored result does not mean the earlier detector interaction never occurred."
		],
		editorSummary:
			"Quantum measurement is implemented by physical interactions and records. Consciousness-centered stories are interpretive additions, not a requirement of successful laboratory practice.",
		uncertaintySummary:
			"Conscious awareness is not needed to predict measurements. The measurement problem and interpretation of outcomes remain genuine foundational debates.",
		sources: [
			decoherenceReview,
			[
				"systematic_review",
				"Decoherence, einselection, and the quantum origins of the classical",
				"Reviews of Modern Physics",
				2003,
				"10.1103/RevModPhys.75.715",
				"Review develops environment-induced superselection and emergence of stable classical records from physical system-environment interactions."
			],
			[
				"systematic_review",
				"Colloquium: Quantum coherence as a resource",
				"Reviews of Modern Physics",
				2017,
				"10.1103/RevModPhys.89.041003",
				"Resource-theory review operationalizes coherence through preparations and transformations without assigning consciousness a special dynamical role."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Does quantum teleportation transport matter or permit faster-than-light messages?",
		slug: "does-quantum-teleportation-transport-matter-or-permit-faster-than-light-messages",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Quantum teleportation transfers the state information needed to reproduce a quantum state at a remote system using shared entanglement, a local joint measurement, and an ordinary classical message. The original state is consumed, matter is not beamed across space, and the receiver cannot complete or interpret the transfer before the classical information arrives at or below light speed.",
		stableCore: [
			"Entanglement supplies correlations but does not let either party choose a locally readable faster-than-light signal.",
			"Teleportation transfers an unknown state without first learning a complete classical description of it.",
			"No-cloning is respected because a successful protocol does not leave a second perfect copy of the input state."
		],
		openQuestions: [
			"How can repeaters, memories, transducers, error correction, and networks raise teleportation distance, fidelity, rate, and reliability?",
			"Which applications will deliver practical advantage in distributed quantum computing, sensing, or secure networks?"
		],
		whatWouldChangeMinds: [
			"A reproducible protocol allowing a receiver to recover user-chosen information before any light-speed classical signal could arrive.",
			"Direct evidence that the input material object or a duplicate, rather than a quantum state, appears at the destination."
		],
		misconceptions: [
			"The word teleportation is an analogy and does not imply science-fiction transport of people.",
			"Instantaneous-looking correlations are not controllable messages.",
			"Entanglement alone is insufficient; the classical channel is essential."
		],
		editorSummary:
			"Quantum teleportation moves a state protocol, not matter, and it still waits for classical communication. It is remarkable without violating relativity.",
		uncertaintySummary:
			"The protocol and no-faster-than-light boundary are settled. Engineering scalable, fault-tolerant networks remains an active frontier.",
		sources: [
			quantumTeleportationReview,
			[
				"landmark_study",
				"Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels",
				"Physical Review Letters",
				1993,
				"10.1103/PhysRevLett.70.1895",
				"Original protocol explicitly combines entanglement with classical information and destroys the input state while reconstructing it remotely."
			],
			quantumComputingAssessment
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Will quantum computers make every computational problem faster?",
		slug: "will-quantum-computers-make-every-computational-problem-faster",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Quantum algorithms offer major speedups for particular mathematical structures, such as factoring under suitable fault-tolerant conditions, and more limited advantages for some search, simulation, optimization, and sampling tasks. Many workloads have no known quantum advantage, and reading inputs, error correction, communication, constants, and classical alternatives can dominate practical performance.",
		stableCore: [
			"A quantum computer is not a faster version of every classical instruction; advantage is algorithm- and problem-specific.",
			"Theoretical asymptotic speedup does not guarantee lower wall-clock time, cost, or energy at useful problem sizes.",
			"Classical computers remain integral for control, preprocessing, decoding, verification, and ordinary applications."
		],
		openQuestions: [
			"Which commercially important problems admit robust end-to-end advantage after error correction and data movement are included?",
			"How quickly can hardware reach fault-tolerant logical-qubit scales, and how will classical algorithms improve meanwhile?"
		],
		whatWouldChangeMinds: [
			"Proofs and implementations showing a universal quantum speedup for arbitrary classical computations including input and output costs.",
			"Conversely, complexity results eliminating useful quantum advantage for all proposed application classes."
		],
		misconceptions: [
			"A superposition does not let a user simply read every possible answer at once.",
			"More physical qubits do not directly equal the same number of reliable logical qubits.",
			"Breaking some public-key cryptography does not mean breaking every encryption method."
		],
		editorSummary:
			"Quantum computing is a specialized computational model with exceptional algorithms for selected structures, not a universal turbo button for software.",
		uncertaintySummary:
			"Problem-specificity is settled. The practical scope, timing, and economic value of fault-tolerant advantages remain uncertain.",
		sources: [
			quantumComputingAssessment,
			[
				"systematic_review",
				"Quantum algorithms: an overview",
				"npj Quantum Information",
				2016,
				"10.1038/npjqi.2015.23",
				"Review organizes known algorithms by the specific mathematical resources and complexity improvements they provide."
			],
			[
				"consensus_statement",
				"Quantum Computing in the NISQ era and beyond",
				"Quantum",
				2018,
				"10.22331/q-2018-08-06-79",
				"Field perspective distinguishes noisy intermediate-scale devices from fault-tolerant machines and emphasizes application and verification constraints."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Does antimatter fall upward in Earth's gravity?",
		slug: "does-antimatter-fall-upward-in-earths-gravity",
		consensusBand: "broad",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No evidence shows that it does. Direct measurements of neutral antihydrogen released in Earth's gravitational field find downward motion consistent with ordinary attractive gravity and reject simple one-gravity upward antigravity. Precision is still far poorer than for ordinary matter, so experiments continue to test whether antimatter's acceleration differs subtly from standard predictions.",
		stableCore: [
			"Antiparticles have opposite charges and quantum numbers in specified respects, not automatically negative inertial or gravitational mass.",
			"Neutral antihydrogen is used because electric and magnetic forces can overwhelm its tiny gravitational acceleration.",
			"General relativity and standard quantum field theory provide no ordinary basis for bulk repulsive matter-antimatter gravity."
		],
		openQuestions: [
			"How closely does antihydrogen acceleration match ordinary matter after magnetic, electric, thermal, and release-system effects are reduced?",
			"Can different antimatter systems test additional equivalence-principle or new-force scenarios?"
		],
		whatWouldChangeMinds: [
			"Independent experiments reproducibly observing upward antimatter acceleration after electromagnetic and apparatus effects are excluded.",
			"A consistent theory predicting repulsion while matching collider, atomic, cosmological, and precision-gravity evidence."
		],
		misconceptions: [
			"Opposite electric charge does not imply opposite response to gravity.",
			"An antiparticle is not a hypothetical object with negative mass.",
			"Current direct evidence rules out dramatic upward fall more strongly than it tests tiny differences."
		],
		editorSummary:
			"Antihydrogen falls down in the first direct gravity measurements. The frontier is precision comparison, not evidence for spectacular upward antigravity.",
		uncertaintySummary:
			"Ordinary-direction fall is directly supported. Small deviations remain much less tightly constrained than ordinary-matter equivalence tests.",
		sources: [
			antimatterGravityStudy,
			[
				"consensus_statement",
				"ALPHA experiment at CERN observes the influence of gravity on antimatter",
				"CERN",
				2023,
				"https://home.cern/alpha-experiment-at-cern-observes-the-influence-of-gravity-on-antimatter/",
				"CERN's report explains the antihydrogen release experiment, rejected antigravity range, measured uncertainty, and next precision steps."
			],
			relativityReview
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Are natural chemicals inherently safer than synthetic chemicals?",
		slug: "are-natural-chemicals-inherently-safer-than-synthetic-chemicals",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. A molecule's hazard follows its structure and biological interactions, while risk also depends on dose, route, duration, exposure, susceptibility, and context. Nature produces potent toxins, carcinogens, allergens, and irritants, and laboratories produce both hazardous substances and carefully characterized medicines or materials. Origin can correlate with particular exposures or production impacts, but natural versus synthetic is not a safety test.",
		stableCore: [
			"Hazard asks what harm a substance can cause; risk asks how likely that harm is under an exposure.",
			"Dose-response relationships can be linear, thresholded, non-monotonic, or endpoint-specific, so slogans cannot replace assessment.",
			"Purity, contaminants, formulation, metabolism, mixture, and use conditions can matter as much as source."
		],
		openQuestions: [
			"How can mixture, low-dose, developmental, and susceptible-population evidence be integrated more efficiently into regulation?",
			"Which new approach methods can reduce uncertainty and animal use while preserving health protection?"
		],
		whatWouldChangeMinds: [
			"Mechanistic and epidemiological evidence establishing natural origin itself as a reliable protective factor after dose and exposure are matched.",
			"A validated classification rule in which origin outperforms chemical identity, potency, exposure, and susceptibility in predicting harm."
		],
		misconceptions: [
			"Chemical does not mean artificial; water, oxygen, and plant compounds are chemicals.",
			"Synthetic does not mean harmless either.",
			"Saying dose matters is not saying every substance is safe at every dose or route."
		],
		editorSummary:
			"Naturalness is a poor shortcut for toxicology. Identify the substance, hazard, dose, exposure, and affected population instead.",
		uncertaintySummary:
			"The principle is settled. Risk estimates for particular chemicals and mixtures may remain uncertain because exposure and long-term evidence are incomplete.",
		sources: [
			chemicalRiskAssessment,
			[
				"landmark_study",
				"Dietary pesticides: 99.99 percent all natural",
				"Proceedings of the National Academy of Sciences",
				1990,
				"10.1073/pnas.87.19.7777",
				"Influential analysis documents extensive natural plant-defense chemical exposure and challenges origin-based comparisons, while not substituting for modern chemical-specific assessment."
			],
			[
				"guideline",
				"Human Health Risk Assessment Toolkit: Chemical Hazards",
				"World Health Organization",
				2021,
				"https://www.who.int/publications/i/item/9789240035720",
				"WHO toolkit organizes chemical risk around hazard identification, dose-response, exposure, and risk characterization rather than source labels."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Is the pH scale always limited to values from 0 to 14?",
		slug: "is-the-ph-scale-always-limited-to-values-from-zero-to-fourteen",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. The familiar 0-to-14 range is a useful classroom approximation for dilute aqueous solutions near room temperature, where pH 7 is approximately neutral. pH is defined from hydrogen-ion activity, and concentrated strong acids can have pH below 0 while concentrated bases can exceed 14. Neutral pH and the practical measurement range also change with temperature, solvent, ionic strength, and convention.",
		stableCore: [
			"Because pH is logarithmic, each unit represents a tenfold activity ratio under the definition.",
			"Glass-electrode readings require calibration and can become unreliable in extreme acidity, alkalinity, low conductivity, or unusual solvents.",
			"Acidity functions and carefully defined scales may be preferable where ordinary aqueous pH measurement breaks down."
		],
		openQuestions: [
			"How can primary measurement methods and reference materials extend comparability in extreme or nonaqueous systems?",
			"Which operational scales best serve concentrated industrial, geochemical, biological, and battery electrolytes?"
		],
		whatWouldChangeMinds: [
			"A definition of pH that imposes hard mathematical bounds of 0 and 14 across activities, temperatures, solvents, and concentrations.",
			"Validated measurements showing values outside that interval are always artifacts under the relevant defined scale."
		],
		misconceptions: [
			"Below-zero pH does not mean more than 100 percent acid.",
			"Neutral does not always equal exactly pH 7.",
			"A displayed meter value is not automatically accurate without suitable calibration and junction conditions."
		],
		editorSummary:
			"Zero to fourteen is a common aqueous working range, not a wall built into the logarithmic definition of pH.",
		uncertaintySummary:
			"The absence of universal bounds is settled. Extreme-solution measurement and cross-medium comparison require specialized conventions and carry larger uncertainty.",
		sources: [
			iupacPhRecommendation,
			[
				"guideline",
				"Measurement of pH: Definition, Standards, and Procedures",
				"International Union of Pure and Applied Chemistry",
				2002,
				"10.1351/pac200274112169",
				"IUPAC recommendations update operational pH measurement, primary standards, traceability, uncertainty, and limitations of conventional cells."
			],
			[
				"context",
				"pH Metrology",
				"National Institute of Standards and Technology",
				2025,
				"https://www.nist.gov/programs-projects/ph-metrology",
				"NIST describes reference methods and standards needed for traceable pH measurement rather than treating the classroom range as universal."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Can a finite physical process reach absolute zero temperature?",
		slug: "can-a-finite-physical-process-reach-absolute-zero-temperature",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No under the ordinary third-law unattainability principle. Experiments can cool systems extraordinarily close to zero kelvin, but extracting the remaining entropy becomes progressively harder, and reaching exactly zero would require unbounded time, steps, resources, or idealization. Zero kelvin is a limiting reference state, not a temperature achieved by simply building a sufficiently powerful refrigerator.",
		stableCore: [
			"Absolute zero is 0 kelvin, equivalent to minus 273.15 degrees Celsius by scale definition.",
			"Quantum ground states still can have zero-point motion; zero temperature does not mean every physical quantity literally stops.",
			"Cooling performance depends on coupling, heat leaks, entropy removal, finite control, and the system being cooled."
		],
		openQuestions: [
			"What resource bounds govern cooling in finite-time quantum, strongly interacting, or nonequilibrium systems?",
			"How close can particular platforms approach their effective ground states while retaining control and useful coherence?"
		],
		whatWouldChangeMinds: [
			"A finite, reproducible protocol preparing an interacting physical system at exactly zero thermodynamic temperature with finite resources and verification.",
			"A thermodynamic framework that permits exact finite-time attainment while preserving other experimentally supported laws."
		],
		misconceptions: [
			"The coldest reported temperature is an estimate with uncertainty, not proof of exact zero.",
			"Negative absolute temperatures in bounded population-inverted systems are not colder than zero kelvin.",
			"Atoms near absolute zero retain quantum behavior rather than becoming motionless classical beads."
		],
		editorSummary:
			"Absolute zero is approachable without being finitely attainable. Each further reduction demands control over an ever smaller energy and entropy scale.",
		uncertaintySummary:
			"Unattainability is a core thermodynamic principle. Its sharp resource bounds and extensions to unusual quantum systems remain active research.",
		sources: [
			absoluteZeroStudy,
			[
				"landmark_study",
				"Third Law of Thermodynamics as a Single Inequality",
				"Physical Review X",
				2017,
				"10.1103/PhysRevX.7.041033",
				"Resource-theoretic analysis states exact ground-state cooling requires infinite resources and derives necessary and sufficient conditions for approximate cooling."
			],
			[
				"guideline",
				"About Cryogenics",
				"National Institute of Standards and Technology",
				2025,
				"https://www.nist.gov/mml/acmd/cryogenic-technologies-project/about-cryogenics",
				"NIST overview describes cryogenic temperature ranges, measurement, refrigeration, material behavior, and the practical challenge of approaching absolute zero."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Is entropy simply a measure of visible disorder?",
		slug: "is-entropy-simply-a-measure-of-visible-disorder",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Disorder can be a useful intuition in a few examples, but entropy has precise thermodynamic and statistical definitions related to energy dispersal, heat, accessible microscopic descriptions, and missing information under a specified macroscopic description. A neat-looking crystal can have entropy, and a visually messy arrangement need not have more thermodynamic entropy than a tidy one.",
		stableCore: [
			"Thermodynamic entropy is a state function with measurable changes tied to reversible heat transfer and temperature.",
			"Statistical entropy depends on probabilities or the number of microscopic states compatible with chosen macroscopic information.",
			"The second law concerns total entropy in an appropriately closed description, not a ban on local organization or life."
		],
		openQuestions: [
			"How should entropy production and information be defined and measured in far-from-equilibrium, quantum, gravitational, and active systems?",
			"Which teaching analogies improve intuition without creating persistent misconceptions about probability and macrostates?"
		],
		whatWouldChangeMinds: [
			"A universal quantitative disorder scale that reproduces thermodynamic and statistical entropy across gases, crystals, mixtures, quantum states, and information processes.",
			"Experiments showing precise entropy balances are better predicted by visual untidiness than by established state variables and probability distributions."
		],
		misconceptions: [
			"The second law does not say every local structure must become less organized at every moment.",
			"Entropy is not merely a synonym for chaos, dirt, damage, or moral decline.",
			"Different entropy formulas apply to specified ensembles and descriptions; that does not make entropy arbitrary."
		],
		editorSummary:
			"Disorder is a loose metaphor. Entropy becomes scientifically useful only when the system, macroscopic constraints, probabilities, energy, and process are defined.",
		uncertaintySummary:
			"Equilibrium thermodynamic and statistical entropy are mature. Extensions and interpretation in nonequilibrium, quantum, information, and gravitational settings remain active.",
		sources: [
			entropyReview,
			[
				"systematic_review",
				"General properties of entropy",
				"Reviews of Modern Physics",
				1978,
				"10.1103/RevModPhys.50.221",
				"Foundational review develops axiomatic and operational properties of entropy across equilibrium systems."
			],
			[
				"context",
				"Gibbs vs Boltzmann Entropies",
				"American Journal of Physics",
				1965,
				"10.1119/1.1971557",
				"Classic pedagogical analysis distinguishes common statistical entropy formulations and the macroscopic descriptions to which they apply."
			]
		]
	})
];
