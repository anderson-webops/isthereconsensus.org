import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheThreeSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026PhysicsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Are atoms physically real rather than only mathematical conveniences?",
		slug: "are-atoms-physically-real-rather-than-only-mathematical-conveniences",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Atoms are physical constituents of matter whose discrete masses, spectra, scattering, chemical combinations, quantum states, and individual positions can be measured and manipulated. Quantum mechanics changes the classical picture of a tiny hard ball, but not the empirical reality of atoms.",
		stableCore: [
			"Atomic theory makes mutually consistent quantitative predictions across chemistry, spectroscopy, thermodynamics, electronics, imaging, and nuclear physics.",
			"Scanning-probe and ion-trap techniques can resolve and manipulate individual atoms under controlled conditions.",
			"An atom is a quantum system with a nucleus and electrons described by states and probability distributions, not a miniature solar system with fixed little orbits."
		],
		openQuestions: [
			"How can larger atomic and molecular systems be controlled precisely enough for quantum technologies and chemistry?",
			"Which interpretations of quantum mechanics best explain the mathematical formalism without changing its tested predictions?"
		],
		whatWouldChangeMinds: [
			"A replacement framework that explains discrete spectra, stoichiometry, scattering, microscopy, and atom-by-atom manipulation without physical atomic entities.",
			"Replicable experiments showing that instruments attributed to individual atoms are responding to a different underlying structure."
		],
		misconceptions: [
			"Quantum objects being described by wavefunctions does not make them fictional.",
			"False-color microscope images are measured signals rendered for humans, not ordinary camera snapshots and not fabrications.",
			"Most of an atom not behaving like solid bulk matter does not mean it is simply empty in the everyday sense."
		],
		editorSummary:
			"Atomic reality is supported by an enormous converging experimental structure. The useful correction is to replace the oversimplified classical cartoon, not to demote atoms to mere bookkeeping.",
		uncertaintySummary:
			"There is no material scientific uncertainty that matter has atomic structure. Frontiers concern quantum description, many-body behavior, nuclear details, and measurement—not whether atoms exist.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Scanning Tunneling Microscope: Introduction",
				publisher: "National Institute of Standards and Technology",
				year: 2024,
				url: "https://www.nist.gov/pml/scanning-tunneling-microscope/scanning-tunneling-microscope-introduction",
				note: "Measurement overview explaining how tunneling current resolves surface structure at atomic scale."
			},
			{
				kind: "landmark_study",
				title: "Atomic and molecular manipulation with the scanning tunneling microscope",
				publisher: "National Institute of Standards and Technology",
				year: 1993,
				url: "https://www.nist.gov/publications/atomic-and-molecular-manipulation-scanning-tunneling-microscope",
				note: "Experimental review of positioning individual atoms and molecules and using them as controlled physical systems."
			},
			{
				kind: "consensus_statement",
				title: "The Nobel Prize in Physics 1986",
				publisher: "Nobel Prize Outreach",
				year: 1986,
				url: "https://www.nobelprize.org/prizes/physics/1986/summary/",
				note: "Scientific context for electron microscopy and scanning tunneling microscopy as direct probes of matter at atomic scale."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Does GPS require corrections predicted by relativity?",
		slug: "does-gps-require-corrections-predicted-by-relativity",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. GPS satellite clocks run at different rates from clocks on Earth because of both their motion and their position in Earth's gravitational field. The system builds in special- and general-relativistic corrections; without them, timing and position errors would accumulate rapidly.",
		stableCore: [
			"Special relativity makes moving satellite clocks tick slightly slower relative to an Earth-centered frame.",
			"General relativity makes clocks higher in Earth's gravitational potential tick faster, and that larger effect dominates for GPS orbits.",
			"Additional relativistic effects, Earth rotation, orbital eccentricity, atmosphere, and receiver geometry are included in precision navigation models."
		],
		openQuestions: [
			"How can next-generation optical clocks and satellite links improve navigation, geodesy, and tests of relativity?",
			"Which relativistic reference-frame conventions best support future lunar and cislunar navigation networks?"
		],
		whatWouldChangeMinds: [
			"Operational timing data showing GPS maintains accuracy when relativistic terms are removed without substituting equivalent corrections.",
			"A competing theory predicting satellite and ground clock behavior more accurately across independent navigation and clock experiments."
		],
		misconceptions: [
			"GPS is not a single dramatic proof of all relativity; it is one practical application among many tests.",
			"Engineers applying a correction does not mean they merely fit an arbitrary error after the fact.",
			"Special- and general-relativistic clock shifts have opposite signs for GPS satellites."
		],
		editorSummary:
			"Relativity is part of the engineering specification, not decorative theory. GPS works because its timing model accounts for the physical rates of clocks in motion and gravity.",
		uncertaintySummary:
			"The corrections are quantitatively established. Remaining uncertainty lies in ever-smaller measurement effects, geophysics, atmosphere, hardware, and future reference systems.",
		sources: [
			{
				kind: "systematic_review",
				title: "Relativity in the Global Positioning System",
				publisher: "Living Reviews in Relativity",
				year: 2003,
				url: "https://doi.org/10.12942/lrr-2003-1",
				doi: "10.12942/lrr-2003-1",
				note: "Technical review deriving the relativistic clock terms and explaining their implementation in GPS."
			},
			{
				kind: "consensus_statement",
				title: "Relativistic Time Transfer in the Global Positioning System",
				publisher: "GPS.gov",
				year: 2011,
				url: "https://archive.gps.gov/governance/advisory/meetings/2011-11/nelson.pdf",
				note: "Official technical presentation covering satellite clock offsets, synchronization, and navigation consequences."
			},
			{
				kind: "consensus_statement",
				title: "Putting Einstein to the Test",
				publisher: "National Institute of Standards and Technology",
				year: 2010,
				url: "https://www.nist.gov/news-events/news/2010/09/nist-pair-aluminum-atomic-clocks-reveal-einsteins-relativity-personal-scale",
				note: "Independent clock experiments demonstrating motion and gravitational-height effects at much smaller scales."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Can a perpetual-motion machine produce net energy indefinitely?",
		slug: "can-a-perpetual-motion-machine-produce-net-energy-indefinitely",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. A device cannot continuously create energy from nothing or convert heat entirely into work in a repeating cycle without other changes. Machines that appear self-running either draw from an uncounted source, store finite energy, lose energy more slowly than expected, or contain a measurement or demonstration error.",
		stableCore: [
			"The first law of thermodynamics expresses conservation of energy across heat, work, mass, fields, and other forms.",
			"The second law limits cyclic conversion and requires entropy production in real processes, preventing perfect recycling of waste heat.",
			"Low friction can sustain motion for a long time, but motion lasting a long time is not net energy production."
		],
		openQuestions: [
			"How can thermal, quantum, and biological fluctuations be harvested within thermodynamic limits at very small scales?",
			"What are the most efficient practical energy-conversion and storage systems allowed by materials and engineering?"
		],
		whatWouldChangeMinds: [
			"A transparent, independently replicated device delivering continuous net work with every energy and matter flow measured and no depletion.",
			"A predictive replacement for thermodynamics explaining why conservation and entropy tests succeeded previously but fail reproducibly in the new regime."
		],
		misconceptions: [
			"Magnets exert forces but are not an unlimited fuel supply.",
			"A motor hidden by wires, temperature gradients, vibration, pressure, chemical change, or radio-frequency input is not closed.",
			"Quantum mechanics does not permit extracting unlimited cyclic work from a system at equilibrium."
		],
		editorSummary:
			"Perpetual-motion claims fail at the system boundary: energy is hidden, stored, or mismeasured. Extraordinary efficiency is worth testing; unexplained net energy requires controlled independent replication.",
		uncertaintySummary:
			"Thermodynamic laws are among the most broadly tested principles in science. No verified exception capable of net cyclic energy production is known.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Is it possible to construct a perpetual motion machine?",
				publisher: "MIT School of Engineering",
				year: 2010,
				url: "https://engineering.mit.edu/ask-an-engineer/is-it-possible-to-construct-a-perpetual-motion-machine",
				note: "Plain-language institutional explanation connecting perpetual-motion categories to energy conservation and entropy."
			},
			{
				kind: "guideline",
				title: "Carnot's Perfect Heat Engine: The Second Law of Thermodynamics Restated",
				publisher: "OpenStax",
				year: 2022,
				url: "https://openstax.org/books/college-physics/pages/15-4-carnots-perfect-heat-engine-the-second-law-of-thermodynamics-restated",
				note: "Reviewed physics text deriving efficiency limits and why cyclic heat-to-work conversion cannot be perfect."
			},
			{
				kind: "landmark_study",
				title: "No Free Lunch for Quantum Thermodynamics",
				publisher: "Physics",
				year: 2022,
				url: "https://physics.aps.org/focus-for/10.1103/PhysRevLett.128.050603",
				note: "American Physical Society context on modern experiments testing work extraction and thermodynamic limits in quantum systems."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Does quantum entanglement allow faster-than-light messaging?",
		slug: "does-quantum-entanglement-allow-faster-than-light-messaging",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Entangled measurements produce correlations that cannot be explained by local hidden variables, but either observer's local result is individually random. Comparing or using the correlations requires ordinary classical communication, which cannot outrun light.",
		stableCore: [
			"Bell-test experiments rule out broad classes of local hidden-variable explanations for the observed correlations.",
			"Choosing a measurement on one side does not controllably change the probability distribution visible to the distant observer alone.",
			"Quantum teleportation transfers a quantum state only when entanglement is paired with classical information sent at or below light speed."
		],
		openQuestions: [
			"How can entanglement be distributed and corrected across useful quantum networks at large scale?",
			"Which deeper interpretation best explains nonlocal correlations while preserving no-signalling predictions?"
		],
		whatWouldChangeMinds: [
			"A reproducible protocol transmitting chosen information to a spacelike-separated receiver without any classical or subluminal channel.",
			"Bell-test data in which local outcome distributions depend controllably on the distant measurement choice."
		],
		misconceptions: [
			"Instantaneous-looking correlation is not the same as a controllable signal.",
			"Quantum teleportation does not move matter or usable information instantaneously.",
			"Calling entanglement nonlocal does not mean relativity's communication limit has been experimentally broken."
		],
		editorSummary:
			"Entanglement is stranger than classical common causes, but it is not a superluminal telegraph. The no-signalling boundary is part of both the formalism and the experiments.",
		uncertaintySummary:
			"Bell violations and no-signalling predictions are strongly established. Interpretive questions about what the correlations mean remain open without changing their communication limit.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Scientific Background on the Nobel Prize in Physics 2022: For experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
				publisher: "Royal Swedish Academy of Sciences",
				year: 2022,
				url: "https://www.nobelprize.org/prizes/physics/2022/advanced-information/",
				note: "Authoritative synthesis of Bell tests, entangled correlations, loopholes, and quantum-information applications."
			},
			{
				kind: "systematic_review",
				title: "Quantum entanglement",
				publisher: "Reviews of Modern Physics",
				year: 2009,
				url: "https://doi.org/10.1103/RevModPhys.81.865",
				doi: "10.1103/RevModPhys.81.865",
				note: "Comprehensive technical review of entanglement theory, detection, communication protocols, and physical limits."
			},
			{
				kind: "systematic_review",
				title: "No-Signalling, Nonlocality, and Communication",
				publisher: "Foundations of Physics",
				year: 2016,
				url: "https://doi.org/10.1007/s10701-016-9987-9",
				doi: "10.1007/s10701-016-9987-9",
				note: "Focused review clarifying why nonlocal correlations do not provide controllable faster-than-light communication."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Do microwave ovens make food radioactive?",
		slug: "do-microwave-ovens-make-food-radioactive",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Microwave ovens use non-ionizing electromagnetic radiation to make polar molecules—especially water—rotate and generate heat. The photons do not have enough energy to alter atomic nuclei or make food radioactive; the food contains no microwave radiation after the oven stops.",
		stableCore: [
			"Microwave frequency is far below the ionizing-radiation energies associated with X-rays, gamma rays, or nuclear activation.",
			"Microwave cooking changes food through heat and ordinary chemistry, much as other cooking methods do.",
			"Real hazards include uneven heating, scalds, unsuitable containers, fires, and leakage from damaged or improperly modified equipment."
		],
		openQuestions: [
			"How can oven and packaging design further reduce uneven heating and burn risks?",
			"How do specific time-temperature profiles compare across cooking methods for nutrients, texture, and food safety?"
		],
		whatWouldChangeMinds: [
			"Repeatable nuclear measurements showing ordinary microwave cooking creates unstable isotopes or persistent ionizing emissions in food.",
			"A physical mechanism demonstrating nuclear activation at domestic microwave photon energies and intensities."
		],
		misconceptions: [
			"Radiation is a broad term; non-ionizing radio waves are not the same hazard as ionizing radiation.",
			"Food can be dangerously hot without being radioactive.",
			"Nutrient changes depend mainly on heat, time, and water, not on a unique radioactive effect."
		],
		editorSummary:
			"The radioactive-food claim confuses electromagnetic radiation with nuclear contamination. Microwave ovens are heating devices whose meaningful safety questions are thermal and mechanical.",
		uncertaintySummary:
			"There is no plausible or observed domestic activation pathway. Safety uncertainty concerns damaged equipment, exposure standards, hot spots, containers, and cooking practice.",
		sources: [
			{
				kind: "guideline",
				title: "Microwave Ovens",
				publisher: "U.S. Food and Drug Administration",
				year: 2025,
				url: "https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens",
				note: "Regulatory safety explanation distinguishing microwave heating from ionizing radiation and addressing leakage and burn risks."
			},
			{
				kind: "consensus_statement",
				title: "Radiation: Electromagnetic fields",
				publisher: "World Health Organization",
				year: 2016,
				url: "https://www.who.int/news-room/questions-and-answers/item/radiation-electromagnetic-fields",
				note: "Public-health explanation of microwave heating, shielding, exposure limits, and the distinction between biological and adverse health effects."
			},
			{
				kind: "guideline",
				title: "Microwave ovens",
				publisher: "Australian Radiation Protection and Nuclear Safety Agency",
				year: 2025,
				url: "https://www.arpansa.gov.au/understanding-radiation/radiation-sources/more-radiation-sources/microwave-ovens",
				note: "Independent radiation-safety guidance on frequency, shielding, exposure limits, food, and appliance condition."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Is radiation risk determined by whether a source is natural or artificial?",
		slug: "is-radiation-risk-determined-by-whether-a-source-is-natural-or-artificial",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Ionizing radiation interacts according to its type and energy, not whether people label its source natural or artificial. Health risk depends on absorbed dose, radiation weighting, exposed tissue, internal or external pathway, dose rate, age, and time—not the source's origin alone.",
		stableCore: [
			"Radon, cosmic rays, and naturally occurring radionuclides can cause real exposure, while many regulated artificial exposures are very small.",
			"Alpha particles are weakly penetrating externally but can be hazardous when an emitter is inhaled or ingested; gamma and X-rays penetrate more deeply.",
			"At moderate and high doses, harmful effects are clear; estimating small increases in cancer risk at low dose is more statistically difficult."
		],
		openQuestions: [
			"How precisely do cancer risks vary at very low doses and low dose rates across tissues, ages, and radiation qualities?",
			"Which communication and optimization strategies best reduce important exposure without amplifying negligible risk?"
		],
		whatWouldChangeMinds: [
			"Controlled physical and epidemiological evidence showing identical radiation behaves differently solely because its source is natural or manufactured.",
			"A validated risk model outperforming dose, radiation quality, tissue, pathway, and timing while relying primarily on source origin."
		],
		misconceptions: [
			"Natural does not mean harmless, and artificial does not mean dangerous at any detectable level.",
			"Activity in becquerels, absorbed dose in grays, and weighted dose in sieverts measure different things.",
			"Uncertainty in tiny low-dose risks does not erase known harm at high dose or prove every tiny dose is clinically important."
		],
		editorSummary:
			"Origin is a poor hazard classifier. Radiation protection compares dose and biological context while keeping low-dose uncertainty visible rather than appealing to naturalness.",
		uncertaintySummary:
			"Radiation interactions and high-dose effects are well characterized. Low-dose population risks are small relative to background variation and therefore imprecise, requiring models and pooled evidence.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Sources, Effects and Risks of Ionizing Radiation: UNSCEAR 2024 Report, Volume II",
				publisher: "United Nations Scientific Committee on the Effects of Atomic Radiation",
				year: 2025,
				url: "https://www.unscear.org/unscear/en/publications/2024_2.html",
				note: "Authoritative international assessment of natural and human-made exposure, dosimetry, mechanisms, and health evidence."
			},
			{
				kind: "consensus_statement",
				title: "Health Risks from Exposure to Low Levels of Ionizing Radiation: BEIR VII Phase 2",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2006,
				url: "https://doi.org/10.17226/11340",
				doi: "10.17226/11340",
				note: "Independent assessment of biological mechanisms, epidemiology, and quantitative low-dose risk models."
			},
			{
				kind: "guideline",
				title: "Ionizing radiation and health effects",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/news-room/fact-sheets/detail/ionizing-radiation-and-health-effects",
				note: "Public-health guidance describing dose, exposure pathways, acute effects, cancer risk, and protection principles."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Is old window glass slowly flowing downward at room temperature?",
		slug: "is-old-window-glass-slowly-flowing-downward-at-room-temperature",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No on human or historical timescales. Ordinary glass is an amorphous solid, not a liquid visibly pooling over centuries. Uneven thickness in antique panes mainly reflects old manufacturing methods and installation choices; calculated room-temperature relaxation times are vastly longer than the age of buildings.",
		stableCore: [
			"Glass lacks the long-range crystal order of many solids but still has solid mechanical behavior below its glass-transition range.",
			"Viscosity rises enormously as glass cools, making room-temperature deformation under its own weight effectively unobservable.",
			"Crown and cylinder glass production made nonuniform sheets, and glaziers often placed thicker edges downward for stability."
		],
		openQuestions: [
			"How do different glass compositions relax, age, and deform near their transition temperatures?",
			"How can microscopic structural models better predict the extraordinary range of glass relaxation times?"
		],
		whatWouldChangeMinds: [
			"Long-term metrology showing ordinary vertical window panes measurably thicken at the bottom under room conditions beyond manufacturing and mounting effects.",
			"Materials models and laboratory acceleration tests predicting and reproducing building-timescale flow at ambient temperature."
		],
		misconceptions: [
			"Amorphous does not mean liquid.",
			"A thicker bottom edge is not a time series showing how the pane changed.",
			"Glass can creep at high temperature or stress without flowing noticeably in a cathedral window."
		],
		editorSummary:
			"The myth turns a real fact—glass has disordered structure and temperature-dependent relaxation—into the false historical claim that windows visibly sag over centuries.",
		uncertaintySummary:
			"The historical conclusion is secure. Research continues on glass-transition physics and extremely slow relaxation, but estimated ambient flow is irrelevant to observed antique-pane thickness.",
		sources: [
			{
				kind: "systematic_review",
				title: "The Glass Transition and the Nature of the Glassy State",
				publisher: "Journal of Chemical Education",
				year: 2000,
				url: "https://doi.org/10.1021/ed077p846",
				doi: "10.1021/ed077p846",
				note: "Educational review explaining amorphous solids, viscosity, relaxation, and why old-window observations do not imply flow."
			},
			{
				kind: "systematic_review",
				title: "Do cathedral glasses flow?",
				publisher: "American Ceramic Society Bulletin",
				year: 1998,
				url: "https://www.cmog.org/article/does-glass-flow",
				note: "Materials and museum explanation connecting pane thickness with historical manufacturing rather than centuries of deformation."
			},
			{
				kind: "landmark_study",
				title: "Glass viscosity at room temperature",
				publisher: "Journal of the American Ceramic Society",
				year: 2017,
				url: "https://doi.org/10.1111/jace.15092",
				doi: "10.1111/jace.15092",
				note: "Modern analysis constraining room-temperature viscosity and the immense timescale required for observable gravitational flow."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Has room-temperature superconductivity at ordinary pressure been independently confirmed?",
		slug: "has-room-temperature-superconductivity-at-ordinary-pressure-been-independently-confirmed",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. As of the August 2026 evidence cutoff, no material has been independently confirmed to superconduct near room temperature at ordinary pressure. High-temperature superconductivity under extreme pressure is an active field, but prominent ambient-condition claims have failed replication, been retracted, or lacked decisive magnetic and electrical evidence.",
		stableCore: [
			"Superconductivity requires both effectively zero electrical resistance and magnetic signatures such as flux expulsion, interpreted with careful controls.",
			"Some hydrogen-rich compounds show very high transition temperatures only at pressures comparable to deep planetary interiors.",
			"The LK-99 episode produced rapid global replication attempts whose results supported ordinary magnetic and resistive behavior rather than superconductivity."
		],
		openQuestions: [
			"Can a stable material retain high-temperature superconducting phases after pressure is released?",
			"Which pairing mechanisms, compositions, and synthesis routes could raise critical temperature while preserving usable fields and currents?"
		],
		whatWouldChangeMinds: [
			"Independent laboratories reproducing zero resistance, Meissner response, critical fields and currents, and a well-characterized phase near room temperature at ordinary pressure.",
			"Open samples and methods yielding consistent measurements across instruments and research groups."
		],
		misconceptions: [
			"Levitation or diamagnetism alone does not establish superconductivity.",
			"A sharp resistance change without a verified zero and magnetic transition can have non-superconducting explanations.",
			"Retraction of one claim does not prove high-temperature superconductivity is impossible; it removes that evidence."
		],
		editorSummary:
			"The discovery standard is appropriately demanding because artifacts can mimic pieces of the signal. High-pressure progress is real, but ordinary-pressure room-temperature superconductivity remains unconfirmed.",
		uncertaintySummary:
			"The current absence of confirmation is clear. Future discovery is open, and some high-pressure claims remain technically difficult to reproduce because samples are tiny and measurements demanding.",
		sources: [
			{
				kind: "systematic_review",
				title: "The current status and future development of high-temperature conventional superconductivity",
				publisher: "National Science Review",
				year: 2024,
				url: "https://doi.org/10.1093/nsr/nwae047",
				doi: "10.1093/nsr/nwae047",
				note: "Review of hydride superconductors, extreme-pressure requirements, evidence standards, mechanisms, and materials challenges."
			},
			{
				kind: "context",
				title: "Retraction Note: Room-temperature superconductivity in a carbonaceous sulfur hydride",
				publisher: "Nature",
				year: 2022,
				url: "https://doi.org/10.1038/s41586-022-05294-9",
				doi: "10.1038/s41586-022-05294-9",
				appraisal: "high",
				stance: "context",
				note: "Retraction record documenting loss of editorial confidence in a prominent high-pressure room-temperature claim."
			},
			{
				kind: "landmark_study",
				title: "Ferromagnetic half levitation of LK-99-like synthetic samples",
				publisher: "Nature Physics",
				year: 2023,
				url: "https://doi.org/10.1038/s41567-023-02225-x",
				doi: "10.1038/s41567-023-02225-x",
				note: "Independent synthesis and characterization explaining apparent levitation without room-temperature superconductivity."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Has cold fusion become a reproducible energy source?",
		slug: "has-cold-fusion-become-a-reproducible-energy-source",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Decades after the 1989 announcement, room-temperature electrochemical systems have not reproducibly produced fusion heat and nuclear products at levels consistent with a practical energy source. Small anomalies and materials questions remain researchable, but they have not met independent replication or energy-balance standards.",
		stableCore: [
			"Known fusion reactions produce characteristic particles, neutrons, gamma rays, isotopes, or ratios that should accompany claimed heat at measurable levels.",
			"Calorimetry at small excess-power levels is vulnerable to calibration, recombination, loading, contamination, and unrecognized chemical effects.",
			"Large multi-institution replication efforts have not found a controllable, scalable effect that explains the original energy claims."
		],
		openQuestions: [
			"Can highly loaded materials produce any new, repeatable nuclear-scale phenomenon under well-characterized conditions?",
			"Which measurement protocols best distinguish tiny thermal or isotopic anomalies from contamination and calibration drift?"
		],
		whatWouldChangeMinds: [
			"Open, independently replicated experiments producing sustained net energy and commensurate nuclear signatures from fully characterized inputs.",
			"A quantitative mechanism that predicts when the effect occurs and survives blinded multi-laboratory testing."
		],
		misconceptions: [
			"Failure of the practical energy claim does not forbid every low-energy nuclear or materials experiment from being studied.",
			"An unexplained calorimeter deviation is not automatically fusion.",
			"A patent, private demonstration, or testimonial is not independent energy and nuclear-product validation."
		],
		editorSummary:
			"Cold fusion has had ample time for replication and has not become a demonstrated energy technology. Continued curiosity about anomalies should be held to ordinary open-method, energy-balance, and nuclear-diagnostics standards.",
		uncertaintySummary:
			"The absence of a reproducible practical source is highly certain. Whether rare small anomalies reflect unknown physics, materials effects, or experimental error remains less settled and much narrower.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Report of the Review of Low Energy Nuclear Reactions",
				publisher: "U.S. Department of Energy",
				year: 2004,
				url: "https://science.osti.gov/-/media/fes/fesac/pdf/2004/Fesac_davies_july_2004.pdf",
				note: "Independent expert review finding evidence insufficient for a funded energy program while identifying specific testable research questions."
			},
			{
				kind: "landmark_study",
				title: "Revisiting the cold case of cold fusion",
				publisher: "Nature",
				year: 2019,
				url: "https://doi.org/10.1038/s41586-019-1256-6",
				doi: "10.1038/s41586-019-1256-6",
				note: "Multi-institution experimental reevaluation that found no cold fusion while improving materials and measurement understanding."
			},
			{
				kind: "systematic_review",
				title: "Cold fusion is hot again",
				publisher: "Nature",
				year: 2019,
				url: "https://doi.org/10.1038/d41586-019-01675-9",
				doi: "10.1038/d41586-019-01675-9",
				stance: "context",
				note: "Editorial scientific context distinguishing a rigorous negative reevaluation from claims that the 1989 energy result was vindicated."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "physics-and-chemistry",
		title: "Has fusion ignition already produced commercial net electricity?",
		slug: "has-fusion-ignition-already-produced-commercial-net-electricity",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. The National Ignition Facility has produced fusion energy greater than the laser energy delivered to a tiny fuel target, a major scientific milestone. The facility consumes far more energy than reaches the target and does not generate electricity, repeat shots rapidly, breed fuel, or operate as a power plant.",
		stableCore: [
			"Target gain compares fusion output with laser energy arriving at the capsule, not with electricity drawn by the entire facility.",
			"A power plant would need reliable high repetition, efficient drivers, durable chambers, tritium supply and breeding, heat capture, maintenance, and competitive whole-system economics.",
			"Magnetic-confinement and inertial-confinement programs pursue different routes, and progress in one metric does not automatically solve the other's engineering problems."
		],
		openQuestions: [
			"Can any confinement approach achieve reliable, maintainable, high-duty-cycle fusion with a closed tritium fuel cycle?",
			"What materials can survive intense neutron damage and heat while allowing economical maintenance and electricity generation?"
		],
		whatWouldChangeMinds: [
			"A connected fusion facility exporting more electricity than the complete plant consumes over sustained operation.",
			"Verified integrated operation meeting repetition, fuel-cycle, materials, thermal-conversion, safety, and maintenance requirements."
		],
		misconceptions: [
			"Scientific breakeven at a target is not engineering breakeven for a facility.",
			"One successful shot is not continuous commercial operation.",
			"A credible milestone need not be exaggerated into a completed power technology to be important."
		],
		editorSummary:
			"Ignition is real and scientifically important, but the denominator matters. Commercial net electricity requires an integrated plant, not only more fusion energy than laser energy at the target.",
		uncertaintySummary:
			"The experimental milestone and facility energy accounting are clear. Timelines to practical power remain highly uncertain because several physics, materials, fuel, maintenance, and economic challenges are unresolved.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Fusion Energy",
				publisher: "U.S. Department of Energy",
				year: 2026,
				url: "https://www.energy.gov/topics/fusion-energy",
				note: "Current federal overview distinguishing experimental fusion progress, confinement approaches, and remaining power-system development."
			},
			{
				kind: "landmark_study",
				title: "Achieving Fusion Ignition",
				publisher: "Lawrence Livermore National Laboratory",
				year: 2025,
				url: "https://lasers.llnl.gov/science/achieving-fusion-ignition",
				note: "Primary facility account defining target gain, laser delivery, repeat experiments, and the scope of the ignition result."
			},
			{
				kind: "consensus_statement",
				title: "Bringing Fusion to the U.S. Grid",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2021,
				url: "https://doi.org/10.17226/25991",
				doi: "10.17226/25991",
				note: "Independent roadmap identifying the integrated science, materials, fuel-cycle, pilot-plant, and regulatory work required for electricity."
			}
		]
	})
];
