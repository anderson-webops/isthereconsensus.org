import type { ReadingGuideContent } from "./types";

export const heatLightGuide: ReadingGuideContent = {
	takeaway:
		"A temperature, a thermal image and a magnified picture answer different questions. Identify the quantity, the model and the observation before treating an appearance as a complete measurement.",
	scope: "Everyday heat transfer and ordinary optical measurements, source-checked October 5, 2026 UTC. This is not a clinical recommendation, equipment calibration recipe, optical safety experiment, pressure-vessel instruction or biological procedure. Original definitions and qualified models were checked; independent expert review has not been completed.",
	sections: [
		{
			id: "quantity-and-boundary",
			title: "1. Name the quantity and the system boundary",
			paragraphs: [
				{
					text: "A temperature reading describes a thermal property, not an inventory of all the energy in an object. Sample size, composition and phase matter when comparing internal energy. A small and a large sample can have equal temperature without equal energy. Before using a number, ask what sample it belongs to and whether the claim concerns its present state or a change along a particular process. One measurement cannot automatically supply all those missing descriptions.",
					sources: ["temperature", "capacity"]
				},
				{
					text: "Heat, in technical energy accounting, describes transfer associated with a temperature difference. Work is a different transfer mode. An object has internal energy; heat is not a separate stored substance. A final state does not uniquely reveal the history of transfers that produced it. This distinction helps interpret a heater's input, a thermometer reading and a contact sensation without pretending they report the same quantity or that every energy transfer must produce the same observable response.",
					sources: ["heat", "capacity"]
				}
			]
		},
		{
			id: "phase-and-pressure",
			title: "2. Add pressure and phase before interpreting a temperature",
			paragraphs: [
				{
					text: "The familiar boiling temperature of water belongs to specified pressure and composition conditions. It is not a rule that every sample must reach exactly the same Celsius reading before boiling. Vapor pressure and surrounding pressure determine the equilibrium condition. Evaporation at a surface can occur well below the boiling point, with competing condensation and transport affecting net loss. Saying that water can evaporate does not establish a drying rate, preservation method or treatment outcome.",
					sources: ["vapor", "phase"]
				},
				{
					text: "During an equilibrium phase transition of a pure substance at fixed pressure, energy can change the phase proportions rather than raising temperature. A plateau is therefore compatible with continuing energy transfer. It is not proof of no energy input. Mixtures, changing pressure and rapid or spatially uneven processes may not display an ideal flat plateau. Choose the physical process before applying a temperature-change model; a heat-capacity approximation and a phase-change calculation describe different conditions.",
					sources: ["phase", "capacity", "heat"]
				}
			]
		},
		{
			id: "paths-and-time",
			title: "3. Compare transfer paths, not just whether something feels warm",
			paragraphs: [
				{
					text: "Objects initially at the same room temperature can produce different sensations when contacted because energy moves at different rates. Material properties, contact conditions and time affect the local response. Metal feeling cooler than wood does not prove a lower initial thermometer reading, and objects hotter than the hand need not give the same ordering. The cited example explains transient exchange, not a safe-touch test, a burn threshold or an instruction to handle a hot object.",
					sources: ["conduction", "temperature", "capacity"]
				},
				{
					text: "Passive insulation slows some energy transfers; it does not supply energy itself. The same barrier can slow warming of a cool interior or cooling of a warm one. Other transfer paths can remain. Removing air reduces ordinary gas conduction and convection but does not eliminate electromagnetic radiation across a vacuum. Emission, absorption, geometry and reflected surroundings matter for radiative exchange. Neither an insulation label nor a vacuum label proves perfect isolation or a guaranteed retained temperature.",
					sources: ["conduction", "radiation", "heat"]
				}
			]
		},
		{
			id: "radiation-to-temperature",
			title: "4. A thermal image is an inference about a surface",
			paragraphs: [
				{
					text: "An infrared instrument receives radiation and converts its signal into an inferred temperature using calibration and assumptions. Surface emissivity, reflected surroundings, wavelength band and the part of the view occupied by the target can affect that inference. NIST's original report record describes calibration and uncertainty, but its full derivation was not audited here. A display with many digits is not independent evidence of equally small uncertainty or correct interpretation of a shiny surface.",
					sources: ["calibration", "radiation"]
				},
				{
					text: "The building-material paper illustrates emissivity variation with material and moisture; its selected samples do not provide a universal device-error allowance. Original author passages were available, while later disclosure requests encountered access challenges. Full methods, funding and conflicts were not audited. FLIR separately explains that an opaque wall can show indirect surface patterns without transmitting a direct image of hidden objects. Its commercial interest remains visible. Neither observation supplies a medical recommendation or a certified building diagnosis.",
					sources: ["emissivity", "walls", "calibration"]
				}
			]
		},
		{
			id: "spectrum-and-process",
			title: "5. Separate a color name from a spectrum",
			paragraphs: [
				{
					text: "Ordinary white light combines visible wavelengths rather than having one wavelength called white. Different spectral mixtures can look similarly white, so appearance alone does not characterize a source's intensity at every wavelength. An ordinary transparent prism spatially separates incident wavelengths through wavelength-dependent refraction. It does not manufacture a broad new spectrum in the familiar linear-dispersion example. What appears depends on the source mixture and prism, not simply on the existence of a transparent wedge.",
					sources: ["visible", "dispersion", "refraction"]
				},
				{
					text: "Absorption, fluorescence and nonlinear frequency conversion are other processes and need their own explanations. Do not import them into the ordinary prism example or extend that example into a claim that every light-matter interaction preserves the incident spectrum. Related NASA and textbook explanations illustrate definitions; they are not independent experiments or an expert vote. This guide reproduces no images, exercises or hazardous viewing setup, and does not infer exposure safety or a lamp's quality from its visible color.",
					sources: ["dispersion", "visible"]
				}
			]
		},
		{
			id: "rays-and-images",
			title: "6. Ask where rays actually travel and where they only appear to originate",
			paragraphs: [
				{
					text: "Refraction changes a light path at a boundary. An underwater object's apparent position can differ from its actual position when an observer interprets outgoing rays as straight continuations. The familiar shallower-depth example assumes a near-normal view through a flat air-water boundary. A curved surface, oblique view or additional layers require the appropriate geometry. The visible impression alone is not a depth measurement or a basis for a swimming, diving or navigation decision.",
					sources: ["refraction", "lenses"]
				},
				{
					text: "A plane mirror's virtual image is an apparent origin obtained by extending outgoing rays backward, not a point where light converges behind the mirror. A bare screen there does not receive the required converging rays, but another imaging system can photograph the reflection. A single ordinary diverging lens with a real object also produces a virtual image in its stated medium. Compound systems, virtual objects and different index contrasts must not be hidden inside an unrestricted claim about every concave-shaped component.",
					sources: ["mirrors", "lenses", "refraction"]
				}
			]
		},
		{
			id: "detail-and-speed",
			title: "7. Enlargement and propagation speed each need a definition",
			paragraphs: [
				{
					text: "Magnification increases image size; resolution concerns distinguishing nearby features. An enlarged blur need not contain additional supported detail. Ordinary imaging can be limited by diffraction, aberrations, sampling and measurement response. A specified Rayleigh criterion is useful for its applicable imaging model, not an absolute limit on every near-field, computational or super-resolution technique. A claim of extra detail needs acquisition and validation evidence, rather than a larger output or a more impressive-looking numerical zoom.",
					sources: ["resolution", "lenses", "calibration"]
				},
				{
					text: "The SI speed of light constant is a defined vacuum value. An ordinary visible wave in transparent glass has a material-dependent phase speed described by refractive index. Phase, group and information velocities are distinct concepts in dispersive settings, so a special result for one cannot automatically become a result for another. This guide supplies no latency estimate for a real optical link and does not describe photons as a sequence of little stops at individual atoms.",
					sources: ["metre", "refraction", "dispersion"]
				}
			]
		},
		{
			id: "observer-and-filter",
			title: "8. Include the observer and the filter in appearance claims",
			paragraphs: [
				{
					text: "A rainbow is an observer-dependent pattern from droplet paths and illumination, not a fixed painted object at one location. Different viewpoints receive contributions from different droplets. Introductory ray diagrams can clarify this geometry while still containing simplifications; internal reflection need not be total for every relevant rainbow ray. Similarly, atmospheric scattering explains the ordinary clear blue daytime sky over land as well as ocean. Clouds, aerosols and path length can change the scene without overturning the scoped mechanism.",
					sources: ["dispersion", "sky", "visible"]
				},
				{
					text: "A polarizer transmits components differently according to polarization orientation. Partially polarized reflections can retain light after filtering, and real lenses can combine multiple optical functions. Polarization does not by itself establish UV protection, eye safety or complete glare removal. Before treating a scene as direct evidence of an object's properties, identify the illumination, intervening media, filter and observer. The linked reviews preserve these distinctions without product recommendations, hazardous viewing instructions, invented expert approval or an independent test of a particular instrument.",
					sources: ["polarization", "refraction"]
				}
			]
		}
	],
	questions: [
		"Which quantity and system boundary does the statement use?",
		"Are pressure, phase, material and timescale specified?",
		"What does the instrument actually detect, and how is the reported quantity inferred?",
		"Which ray or wave model applies, and what cases does it exclude?",
		"Does a bigger or brighter picture actually supply additional validated information?",
		"Are teaching references being mistaken for independent experiments or product certification?"
	],
	sources: [
		{
			id: "temperature",
			title: "OpenStax: Temperature",
			url: "https://openstax.org/books/college-physics-2e/pages/13-1-temperature",
			kind: "Technical reference",
			note: "Original equilibrium definitions checked. No thermometer calibration or universal internal-energy formula inferred."
		},
		{
			id: "heat",
			title: "OpenStax: Heat",
			url: "https://openstax.org/books/college-physics-2e/pages/14-1-heat",
			kind: "Technical reference",
			note: "Original transfer-versus-state distinction checked. No copied exercises or universal microscopic model adopted."
		},
		{
			id: "capacity",
			title: "OpenStax: Temperature Change and Heat Capacity",
			url: "https://openstax.org/books/college-physics-2e/pages/14-2-temperature-change-and-heat-capacity",
			kind: "Technical reference",
			note: "Original mass, material and process qualifications checked; the ordinary heating relation is not an absolute energy inventory."
		},
		{
			id: "phase",
			title: "OpenStax: Phase Change and Latent Heat",
			url: "https://openstax.org/books/college-physics-2e/pages/14-3-phase-change-and-latent-heat",
			kind: "Technical reference",
			note: "Original equilibrium coexistence example checked; mixtures, pressure changes and unrelated practical examples are excluded."
		},
		{
			id: "vapor",
			title: "OpenStax: Humidity, Evaporation, and Boiling",
			url: "https://openstax.org/books/college-physics-2e/pages/13-6-humidity-evaporation-and-boiling",
			kind: "Technical reference",
			note: "Original surface and bubble distinctions checked; no drying schedule, pressure procedure or biological method supplied."
		},
		{
			id: "conduction",
			title: "OpenStax: Conduction",
			url: "https://openstax.org/books/college-physics-2e/pages/14-5-conduction",
			kind: "Technical reference",
			note: "Original equal-temperature contact and insulating-barrier explanations checked; sensation is not a safety or initial-temperature test."
		},
		{
			id: "radiation",
			title: "OpenStax: Radiation",
			url: "https://openstax.org/books/college-physics-2e/pages/14-7-radiation",
			kind: "Technical reference",
			note: "Thermal emission and net exchange checked; simplified greenhouse temperatures and feedback passages are not current climate evidence here."
		},
		{
			id: "calibration",
			title: "NIST: Calibration and Measurement Procedures for a High Magnification Thermal Camera",
			url: "https://www.nist.gov/publications/calibration-and-measurement-procedures-high-magnification-thermal-camera",
			kind: "Technical report record",
			note: "Original abstract and DOI checked, not the full derivation. Surface signal conversion and uncertainty are the scope, not a calibration recipe."
		},
		{
			id: "emissivity",
			title: "Barreira and colleagues: Emissivity of Building Materials for Infrared Measurements",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8002048/",
			kind: "Contextual original research",
			note: "Fetched Consensus record and original author passages checked; selected sample variation is not universal. Later access challenges prevented full disclosure audit; no formal appraisal claimed."
		},
		{
			id: "walls",
			title: "FLIR: Can Thermal Imaging See Through Walls?",
			url: "https://www.flir.com/en-ca/discover/home-outdoor/can-thermal-imaging-see-through-walls/",
			kind: "Manufacturer technical explanation",
			note: "Original opaque-wall versus surface-pattern explanation checked. Commercial interest retained, not independent performance or inspection validation."
		},
		{
			id: "visible",
			title: "NASA Science: Visible Light",
			url: "https://science.nasa.gov/ems/09_visiblelight/",
			kind: "Technical reference",
			note: "Original wavelength and prism descriptions checked. Simplified solar peak-color and flame-temperature claims are not adopted."
		},
		{
			id: "dispersion",
			title: "OpenStax: Dispersion, the Rainbow and Prisms",
			url: "https://openstax.org/books/college-physics-2e/pages/25-5-dispersion-the-rainbow-and-prisms",
			kind: "Technical reference",
			note: "Original conditional dispersion and observer geometry checked. The diagram's total-internal-reflection label is not generalized to every rainbow ray."
		},
		{
			id: "refraction",
			title: "OpenStax: The Law of Refraction",
			url: "https://openstax.org/books/college-physics-2e/pages/25-3-the-law-of-refraction",
			kind: "Technical reference",
			note: "Original index and ray-direction definitions checked; ordinary transparent geometry is not all dispersive velocity behavior."
		},
		{
			id: "lenses",
			title: "OpenStax: Image Formation by Lenses",
			url: "https://openstax.org/books/college-physics-2e/pages/25-6-image-formation-by-lenses",
			kind: "Technical reference",
			note: "Original real/virtual ray examples checked, retaining real-object, surrounding-medium and single thin-lens assumptions."
		},
		{
			id: "mirrors",
			title: "OpenStax: Image Formation by Mirrors",
			url: "https://openstax.org/books/college-physics-2e/pages/25-7-image-formation-by-mirrors",
			kind: "Technical reference",
			note: "Original apparent versus actual ray-convergence distinction checked; virtual images can still be viewed through another imaging system."
		},
		{
			id: "resolution",
			title: "OpenStax: Limits of Resolution, the Rayleigh Criterion",
			url: "https://openstax.org/books/college-physics-2e/pages/27-6-limits-of-resolution-the-rayleigh-criterion",
			kind: "Technical reference",
			note: "Original ordinary diffraction-limited model checked, not a universal bound on specialized or computational imaging."
		},
		{
			id: "metre",
			title: "NIST: The International System of Units, Section 2",
			url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-2",
			kind: "Technical reference",
			note: "Original exact vacuum-speed definition checked; it is not the phase speed of all waves in every material."
		},
		{
			id: "sky",
			title: "NASA Space Place: Why Is the Sky Blue?",
			url: "https://spaceplace.nasa.gov/blue-sky/en/",
			kind: "Technical reference",
			note: "Original clear daytime atmospheric scattering explanation checked, not every weather condition or another planet's appearance."
		},
		{
			id: "polarization",
			title: "OpenStax: Polarization",
			url: "https://openstax.org/books/college-physics-2e/pages/27-8-polarization",
			kind: "Technical reference",
			note: "Original orientation and partially polarized reflection distinctions checked; no product test, UV certification or viewing exercise reproduced."
		}
	]
};
