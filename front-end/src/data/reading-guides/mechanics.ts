import type { ReadingGuideContent } from "./types";

export const mechanicsGuide: ReadingGuideContent = {
	takeaway:
		"Name the quantity, receiving object, reference frame and system boundary before applying force, conservation or flow shortcuts.",
	scope: "An original conceptual guide to explicitly scoped nonrelativistic Newtonian mechanics, idealized contact and fluid models, and defined mechanical units. Examples are independently constructed and hypothetical, not measured material properties, apparatus tests, copied exercises, biological procedures, engineering designs or safety guidance. Original sources were checked on 2026-10-05; independent expert review has not been completed. Source prose, images and operating recommendations are not reproduced.",
	sections: [
		{
			id: "paths-and-averages",
			title: "A journey and its endpoints answer different questions",
			paragraphs: [
				{
					text: "Start by naming what the number tracks. Distance traveled retains the length of the route; displacement retains the difference between final and initial position, including direction. Our hypothetical point moves 7 m forward and 2 m back: its path length is 9 m and its displacement is positive 5 m. Neither number refutes the other. A curved path or a reversal can preserve endpoints while changing distance. In more than one dimension, the displacement is a vector rather than a signed one-dimensional component. A report that never identifies its tracked point and reference frame can therefore be numerically precise while answering an unclear question.",
					sources: ["displacement", "speed"]
				},
				{
					text: "Averages keep this distinction. A separately constructed 4 m outward and 4 m return journey over four seconds has average speed 2 m/s, but zero average velocity. Directional cancellation affects displacement, not the accumulated path length. Instantaneous speed remains the magnitude of instantaneous velocity; taking a magnitude after averaging the vector does not reproduce the time average of its magnitudes. An interval average also does not reveal a peak or every intermediate speed. If several readings cover unequal durations, an unweighted average may not even be the desired time average. Ask what was averaged, over which interval and with which weighting before comparing the labels.",
					sources: ["speed", "displacement"]
				}
			]
		},
		{
			id: "forces-and-objects",
			title: "Keep the receiving object and the resultant explicit",
			paragraphs: [
				{
					text: "Zero resultant force in the constant-mass inertial-frame Newtonian model means unchanged velocity, not compulsory rest. A point initially moving at 3 m/s can continue at 3 m/s; its initial state is not erased by the force balance. Nonzero opposing forces can also sum to zero. Third-law interaction partners, however, act on different objects and cannot both be placed on one object's force list. The force of A on B belongs to B's account, and B's force on A belongs to A's account. Internal cancellation in the complete pair does not prevent the parts from changing their individual momenta or having unequal accelerations.",
					sources: ["first", "third", "newton", "momentum-lecture"]
				},
				{
					text: "Contact and weight need their own definitions. An unchanged 2 kg mass has hypothetical gravitational weight 16 N at acceleration 8 m/s squared and 6 N at 3 m/s squared. Those are constructed fields, not actual planetary observations. A normal contact force is perpendicular to its surface and need not equal that weight. In another constructed balance, a 2 kg body with downward gravity 8 m/s squared and upward acceleration 2 m/s squared needs a 20 N upward normal force if no other vertical force acts. Static friction likewise responds up to a limit: an 8 N maximum does not turn a balanced 3 N tangential demand into an actual 8 N force.",
					sources: ["second", "normal", "friction", "forces"]
				}
			]
		},
		{
			id: "curves-and-springs",
			title: "An unchanged scalar need not imply unchanged motion",
			paragraphs: [
				{
					text: "Speed can remain constant while velocity changes direction. At speed 4 m/s on a hypothetical circle of radius 2 m, the inward acceleration is 8 m/s squared. A 3 kg point on that trajectory needs a 24 N inward resultant. Centripetal names that role of the actual force sum, not an extra interaction to add on top of gravity, tension or contact. Adding another 24 N after already accounting for the needed inward sum double-counts it. A changing speed would require a tangential acceleration as well. The reference frame, path and actual interactions remain necessary, and rotating-frame apparent-force descriptions require a separately specified account.",
					sources: ["circular", "centripetal", "second"]
				},
				{
					text: "Period is another scalar whose interpretation depends on a model. In an ideal unforced, undamped spring oscillator with a constant linear restoring coefficient, natural angular frequency is the square root of stiffness divided by mass. Our hypothetical 100 N/m stiffness and 4 kg mass give 5 radians per second and period two pi divided by five seconds. Increasing amplitude changes maximum displacement, speed and energy without changing that ideal period. This does not establish amplitude independence for every oscillator or any actual spring's unlimited range. Nonlinear restoring forces, damping, changing effective mass and driving can alter the question. Angular frequency and cycles per second also need their different numerical conventions.",
					sources: ["spring", "spring-lecture"]
				}
			]
		},
		{
			id: "work-and-paths",
			title: "A force magnitude is not a work account",
			paragraphs: [
				{
					text: "Mechanical work depends on force projected along the actual motion. A constructed constant 4 N force opposing a 3 m straight displacement contributes negative 12 J. A perpendicular force can have zero work contribution despite being nonzero, and a force acting at an unmoving point contributes zero through that point in the selected frame. None of these statements means an entire device has no energy use. Other points can move, deformation can occur and other energy channels can remain active. A force's work, the net work on a selected body and the total-system energy budget are therefore related but distinct accounts. Naming the application point prevents a stationary reference point from hiding motion elsewhere.",
					sources: ["work", "energy-lecture"]
				},
				{
					text: "Returning to the start does not make every force's work zero. In our independently constructed two-leg path, a 2 N force opposes motion over each 3 m leg. Its total contribution is negative 12 J although endpoint displacement is zero. The opposing force reverses direction with the journey, so multiplying one unchanged vector by final displacement is the wrong model. Conservative-force work has a qualified path-independent potential-energy description and gives zero on an applicable closed configuration path. Sliding friction does not automatically inherit that theorem. Also, returning one point does not prove every degree of freedom or every other object has returned to its initial configuration. Keep the path, force and complete boundary visible.",
					sources: ["work", "conservative", "nonconservative"]
				}
			]
		},
		{
			id: "energy-and-momentum",
			title: "A conserved total does not freeze every part",
			paragraphs: [
				{
					text: "At fixed mass, ordinary translational kinetic energy scales with speed squared. A hypothetical 2 kg point has 9 J at 3 m/s and 36 J at 6 m/s, an increase of 27 J rather than another 9 J. This is not an injury or damage prediction. Conservation of total energy also does not require unchanged macroscopic mechanical energy. An illustrative isolated balance can change from 9 J mechanical energy to 4 J mechanical plus 5 J additional internal energy. Identifying those terms is essential: casually naming an unexplained difference heat is not a measured energy balance, and internal energy is not simply one unspecified object's temperature.",
					sources: ["kinetic", "energy", "nonconservative", "si"]
				},
				{
					text: "Momentum and kinetic energy impose different constraints. Equal hypothetical 2 kg masses initially moving at 4 m/s and zero can stick at 2 m/s when the pair's external impulse is negligible. Momentum stays 8 kg m/s while translation energy changes from 16 J to 8 J; other channels must complete the energy account. In a separate ideal elastic example, equal 1 kg masses exchange velocities 3 m/s and zero. Total kinetic energy stays 4.5 J even though each object's share changes. Elasticity refers to the appropriate before-and-after total, not preservation of every part's velocity or of that selected kinetic sum at every intermediate contact instant.",
					sources: ["momentum", "inelastic", "elastic", "momentum-lecture"]
				}
			]
		},
		{
			id: "intervals-and-boundaries",
			title: "Peaks and selected parts leave important information out",
			paragraphs: [
				{
					text: "A peak force is not an impulse. For independently constructed triangular pulses with the same 6 N peak, durations 0.5 s and 1 s give areas 1.5 N s and 3 N s. The area under the relevant net external force-time curve determines the corresponding momentum change. A differently shaped curve can have a different area even with the same peak and duration; direction reversals can cancel signed contributions. Interval-average force multiplied by time is not automatically the instantaneous force at any selected time. These abstract pulses are not impact or protection measurements, and their impulse alone does not determine energy change, deformation or a complete acceleration history.",
					sources: ["impulse", "momentum", "newton"]
				},
				{
					text: "The same boundary discipline applies to a center of mass. A closed constant-mass Newtonian system with zero external resultant has constant center-of-mass velocity, not necessarily zero velocity. A hypothetical total momentum 8 kg m/s and mass 4 kg give 2 m/s. Parts may rearrange internally without changing that motion. The center is a mass-weighted calculated position and need not be a material point. A different inertial frame changes whether it is described as stationary. If material leaves a selected boundary, that open collection is no longer the same closed-system account; excluded mass and momentum cannot be discarded while retaining the isolated theorem. This is conceptual accounting, not a propulsion procedure.",
					sources: ["rotation-lecture", "momentum"]
				}
			]
		},
		{
			id: "rotation-and-axes",
			title: "Geometry and angular motion complete the rotational account",
			paragraphs: [
				{
					text: "Torque depends on an axis and a force line of action. A hypothetical 3 N force with a 2 m perpendicular lever arm gives 6 N m; a line through the axis gives zero about that axis. The force's magnitude alone lacks the necessary geometry. Torque shares dimensions with energy but is not the same quantity: NIST distinguishes its notation from the joule used for energy. A compatible constant torque 3 N m through 2 radians does 6 J of work, whereas an unmoved rotation contributes no such work. Individual moments must be summed about the same axis, and zero resultant force does not on its own establish rotational equilibrium.",
					sources: ["torque", "rotation", "rotation-lecture", "si"]
				},
				{
					text: "Rotational inertia needs an axis and a mass distribution. A hypothetical 2 kg point at perpendicular distance 1 m contributes 2 kg m squared; at 2 m it contributes 8. Under an applicable angular-momentum model, inertia changing from 4 to 2 kg m squared at conserved angular momentum 8 kg m squared per second changes angular speed from 2 to 4 radians per second. Rotational energy increases from 8 to 16 J and needs internal work or another energy source, not free creation. A rolling rigid body also combines center-of-mass translation with rotation: our compatible example has 4 J plus 2 J, totaling 6 J. Nonslip kinematics and rigid-body assumptions remain explicit.",
					sources: ["inertia", "angular", "rotation", "rotation-lecture"]
				}
			]
		},
		{
			id: "fluid-quantities",
			title: "Pressure, density and viscosity are not interchangeable",
			paragraphs: [
				{
					text: "Pressure is normal force per area, not total force. A hypothetical uniform 9 N over 3 square meters gives 3 Pa. A nonuniform field needs the appropriate sum across the surface, including its normal directions; one local pressure cannot determine every resultant. In a static constant-density fluid, specified gravity and boundary pressure determine the depth relation. Our illustrative density 500 kg per cubic meter and gravity 8 m/s squared give an added 1,200 Pa at 0.3 m depth, independent of total container volume under those conditions. Changing surface pressure, density distribution or motion changes the comparison. This is not a structural-load calculation or a pressure rating.",
					sources: ["pressure", "hydrostatic", "si"]
				},
				{
					text: "Density specifies mass per volume, while dynamic viscosity describes shear response to a velocity gradient in an applicable constitutive model. Their units and roles differ; a heavier fluid need not be more viscous. Kinematic viscosity divides dynamic viscosity by density without making them identical. A non-Newtonian response may need rate or history dependence rather than one constant. Ideal hydraulic force multiplication likewise needs its full balance: an abstract area ratio five gives 20 N to 100 N while compatible displacements 0.5 m to 0.1 m preserve 10 J. Extra output work would need another energy source. Neither property labels nor area ratios certify measured performance, operating limits or equipment safety.",
					sources: ["viscosity", "density", "pascal", "work", "energy"]
				}
			]
		},
		{
			id: "buoyancy-and-flow",
			title: "Force and flow slogans need their missing conditions",
			paragraphs: [
				{
					text: "Ordinary hydrostatic buoyancy equals the weight of displaced fluid, not the object's mass alone. Our constructed density 500 kg per cubic meter, gravity 8 m/s squared and displaced volume 0.004 cubic meters give 16 N. Whether a body floats needs its weight, available geometry and other forces. A freely floating 2 kg body at rest in that field has 16 N weight balanced by 16 N buoyancy, not a persistent upward surplus. The simple two-force description excludes surface tension, external support and acceleration. Changing submerged volume or a fluid density gradient changes the account. This numerical balance is not flotation capacity, load advice or personal safety guidance.",
					sources: ["buoyancy", "hydrostatic", "first", "second"]
				},
				{
					text: "Continuity constrains volume rates in a steady incompressible unbranched balance, not equal speeds everywhere. Our hypothetical 0.06 cubic meters per second gives section averages 3 m/s through 0.02 square meters and 2 m/s through 0.03 square meters. Pointwise profiles can differ from the averages, and compressible flow needs the more general mass-rate account. Bernoulli's familiar faster-flow/lower-pressure comparison additionally needs steady inviscid incompressible flow along a compatible streamline without added work. At equal height, density 2 kg per cubic meter and speeds 2 and 4 m/s give a 12 Pa decrease in that ideal balance. Height changes, losses, different streamline constants and supplied energy prevent applying the slogan universally.",
					sources: ["flow", "bernoulli", "fluid-lecture"]
				}
			]
		},
		{
			id: "evidence-and-applicability",
			title: "Read model agreement honestly",
			paragraphs: [
				{
					text: "These reviews connect established definitions and explicitly scoped classical models, not a numerical poll of scientists or a collection of independent experimental replications. OpenStax chapters share authorship and institutional provenance; Caltech chapters share authorship too. NIST defines units and notation, not every model's empirical validity. Multiple source links can clarify conditions without creating independent votes. The numerical examples here are independently constructed and hypothetical, not copied source exercises, measured apparatus results or material specifications. Original definitions and model conditions were checked on the stated date, but independent expert review has not been completed. The interface's legacy confidence score must not be interpreted as a measured fraction of researchers agreeing.",
					sources: ["newton", "rotation-lecture", "fluid-lecture", "si"]
				},
				{
					text: "A useful reading sequence is to identify the quantity, reference frame, included objects and time interval, then list what is assumed constant and what can cross the boundary. Check directions and units, but do not treat correct arithmetic as proof that the assumptions apply. A missing force, changing material state or omitted energy channel can invalidate the application without invalidating the underlying scoped relation. These are conceptual reviews, not biological procedures, engineering designs or apparatus operating advice. Search can connect a nearby concept without guaranteeing an answer to every practical question. If the actual question requires an unsupported material property, device measurement or domain-specific safety assessment, the honest response is that this library does not establish it.",
					sources: ["newton", "energy", "viscosity", "fluid-lecture"]
				}
			]
		}
	],
	questions: [
		"Is this a path quantity, endpoint quantity, instantaneous value or interval average?",
		"Which object receives each force, and which frame is being used?",
		"Does conserved refer to the whole system or only a selected visible part?",
		"Which axis, geometry and mass distribution support the rotational claim?",
		"Are the pressure, density and viscosity definitions being kept separate?",
		"Are flow conditions, streamline, height and energy additions specified?",
		"Which quantities and model conditions are held unchanged in the comparison?",
		"What measurement or specialist assessment would be needed beyond this conceptual review?"
	],
	sources: [
		{
			id: "displacement",
			title: "College Physics 2e: Displacement",
			url: "https://openstax.org/books/college-physics-2e/pages/2-1-displacement",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original endpoint and path definitions checked. Independently constructed paths are not source exercises or measured journeys."
		},
		{
			id: "speed",
			title: "College Physics 2e: Time, Velocity, and Speed",
			url: "https://openstax.org/books/college-physics-2e/pages/2-3-time-velocity-and-speed",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original instantaneous and interval-average distinctions checked. Average speed is not universally the magnitude of average velocity."
		},
		{
			id: "first",
			title: "College Physics 2e: Newton's First Law of Motion: Inertia",
			url: "https://openstax.org/books/college-physics-2e/pages/4-2-newtons-first-law-of-motion-inertia",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original inertial-frame constant-velocity condition checked. Frictionless descriptions are model assumptions, not tested apparatus."
		},
		{
			id: "third",
			title: "College Physics 2e: Newton's Third Law of Motion: Symmetry in Forces",
			url: "https://openstax.org/books/college-physics-2e/pages/4-4-newtons-third-law-of-motion-symmetry-in-forces",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original interaction pairs acting on different objects checked. Free-body and whole-system force sums must not be conflated."
		},
		{
			id: "newton",
			title: "The Feynman Lectures on Physics, Volume I, Chapter 9: Newton's Laws of Dynamics",
			url: "https://www.feynmanlectures.caltech.edu/I_09.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original constant-mass, inertial-frame and weight-versus-inertia limits checked. Historical claims of complete prediction and variable-mass shortcuts are not adopted."
		},
		{
			id: "momentum-lecture",
			title: "The Feynman Lectures on Physics, Volume I, Chapter 10: Conservation of Momentum",
			url: "https://www.feynmanlectures.caltech.edu/I_10.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original system momentum and collision energy distinctions checked. Explosive demonstrations, apparatus and source numerical examples are not reproduced."
		},
		{
			id: "second",
			title: "College Physics 2e: Newton's Second Law of Motion: Concept of a System",
			url: "https://openstax.org/books/college-physics-2e/pages/4-3-newtons-second-law-of-motion-concept-of-a-system",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original net-force, constant-mass and gravitational-weight distinctions checked. Finite-interval force must mean the applicable average; variable-mass shortcuts are not adopted."
		},
		{
			id: "normal",
			title: "College Physics 2e: Normal, Tension, and Other Examples of Forces",
			url: "https://openstax.org/books/college-physics-2e/pages/4-5-normal-tension-and-other-examples-of-forces",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original perpendicular contact force and component balances checked. Clinical traction, lifting and equipment-use examples are not imported."
		},
		{
			id: "friction",
			title: "College Physics 2e: Friction",
			url: "https://openstax.org/books/college-physics-2e/pages/5-1-friction",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original responsive static friction and maximum-force inequality checked. Tabulated coefficients and experiment instructions are not reproduced or treated as universal material properties."
		},
		{
			id: "forces",
			title: "The Feynman Lectures on Physics, Volume I, Chapter 12: Characteristics of Force",
			url: "https://www.feynmanlectures.caltech.edu/I_12.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original interaction, gravity and friction-model context checked. Historical material tables and construction examples are not reproduced."
		},
		{
			id: "circular",
			title: "College Physics 2e: Centripetal Acceleration",
			url: "https://openstax.org/books/college-physics-2e/pages/6-2-centripetal-acceleration",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original velocity-direction change and uniform-circle acceleration checked. Driving, centrifuge, biological sample and apparatus operating examples are not adopted."
		},
		{
			id: "centripetal",
			title: "College Physics 2e: Centripetal Force",
			url: "https://openstax.org/books/college-physics-2e/pages/6-3-centripetal-force",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original inward resultant-force role checked. This is not an additional interaction to add to actual forces or a device-design prescription."
		},
		{
			id: "spring",
			title: "College Physics 2e: Simple Harmonic Motion: A Special Periodic Motion",
			url: "https://openstax.org/books/college-physics-2e/pages/16-3-simple-harmonic-motion-a-special-periodic-motion",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original linear undamped spring-mass period checked. Amplitude independence is not claimed for every oscillator; source exercises and apparatus instructions are not adopted."
		},
		{
			id: "spring-lecture",
			title: "The Feynman Lectures on Physics, Volume I, Chapter 21: The Harmonic Oscillator",
			url: "https://www.feynmanlectures.caltech.edu/I_21.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original constant-coefficient linear oscillator and natural angular-frequency relation checked. Forced response, biological analogies and source experiment instructions are not imported."
		},
		{
			id: "work",
			title: "College Physics 2e: Work: The Scientific Definition",
			url: "https://openstax.org/books/college-physics-2e/pages/7-1-work-the-scientific-definition",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original force-displacement projection and signed work checked. Zero work by one force does not mean a whole system uses no energy. Biological efficiency estimates are not adopted."
		},
		{
			id: "energy-lecture",
			title: "The Feynman Lectures on Physics, Volume I, Chapter 14: Work and Potential Energy (conclusion)",
			url: "https://www.feynmanlectures.caltech.edu/I_14.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original work, conservative paths and internal-energy accounting checked. Historical simplifications of heat as pure kinetic energy are not adopted."
		},
		{
			id: "conservative",
			title: "College Physics 2e: Conservative Forces and Potential Energy",
			url: "https://openstax.org/books/college-physics-2e/pages/7-4-conservative-forces-and-potential-energy",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original path-independent conservative-force work checked. The statement is not extended to arbitrary forces or incomplete system boundaries."
		},
		{
			id: "nonconservative",
			title: "College Physics 2e: Nonconservative Forces",
			url: "https://openstax.org/books/college-physics-2e/pages/7-5-nonconservative-forces",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original path-dependent friction work and mechanical-energy changes checked. Constructed energy balances are not measured heat or friction coefficients."
		},
		{
			id: "kinetic",
			title: "College Physics 2e: Kinetic Energy and the Work-Energy Theorem",
			url: "https://openstax.org/books/college-physics-2e/pages/7-2-kinetic-energy-and-the-work-energy-theorem",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original nonrelativistic translational energy and net-work relation checked. Injury, damage and driving-performance examples are not imported."
		},
		{
			id: "energy",
			title: "College Physics 2e: Conservation of Energy",
			url: "https://openstax.org/books/college-physics-2e/pages/7-6-conservation-of-energy",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original total-energy accounting checked. Macroscopic mechanical energy is distinguished from internal forms and boundary transfers."
		},
		{
			id: "si",
			title: "SP 330: The International System of Units, Section 2",
			url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-2",
			kind: "Original definition or teaching reference",
			note: "NIST. Original coherent mechanical units and explicit torque-versus-energy notation checked. This citation supports quantities and units, not an independent experimental test of every mechanical model."
		},
		{
			id: "momentum",
			title: "College Physics 2e: Linear Momentum and Force",
			url: "https://openstax.org/books/college-physics-2e/pages/8-1-linear-momentum-and-force",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original vector momentum definition checked in a constant-mass Newtonian scope. A finite difference divided by time is not automatically an instantaneous force."
		},
		{
			id: "inelastic",
			title: "College Physics 2e: Inelastic Collisions in One Dimension",
			url: "https://openstax.org/books/college-physics-2e/pages/8-5-inelastic-collisions-in-one-dimension",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original distinction between conserved momentum and changed kinetic energy checked. A sticking loss example is not a claim that all energy-releasing collisions must lose kinetic energy."
		},
		{
			id: "elastic",
			title: "College Physics 2e: Elastic Collisions in One Dimension",
			url: "https://openstax.org/books/college-physics-2e/pages/8-4-elastic-collisions-in-one-dimension",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original total collision kinetic-energy and momentum balances checked. Ideal equal-mass exchange is independently recomputed, not a measured impact or universal individual-energy conservation."
		},
		{
			id: "impulse",
			title: "College Physics 2e: Impulse",
			url: "https://openstax.org/books/college-physics-2e/pages/8-2-impulse",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original average net external force over an interval checked. Peak force alone does not determine impulse; source impact-protection claims are not adopted."
		},
		{
			id: "rotation-lecture",
			title: "The Feynman Lectures on Physics, Volume I, Chapter 18: Rotation in Two Dimensions",
			url: "https://www.feynmanlectures.caltech.edu/I_18.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original constant-mass center-of-mass motion, rotational inertia and angular momentum checked. Human demonstrations, apparatus and propulsion procedures are not imported."
		},
		{
			id: "torque",
			title: "College Physics 2e: The Second Condition for Equilibrium",
			url: "https://openstax.org/books/college-physics-2e/pages/9-2-the-second-condition-for-equilibrium",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original force moment about a specified axis and perpendicular lever arm checked. No structural load, tool setting or operating recommendation is adopted."
		},
		{
			id: "rotation",
			title: "College Physics 2e: Rotational Kinetic Energy: Work and Energy Revisited",
			url: "https://openstax.org/books/college-physics-2e/pages/10-4-rotational-kinetic-energy-work-and-energy-revisited",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original rotational energy, compatible angular work and rolling-energy split checked. Body geometry and nonslip conditions are explicit, not assumed for all rolling."
		},
		{
			id: "inertia",
			title: "College Physics 2e: Dynamics of Rotational Motion: Rotational Inertia",
			url: "https://openstax.org/books/college-physics-2e/pages/10-3-dynamics-of-rotational-motion-rotational-inertia",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original mass distribution and squared distance from an axis checked. Fixed-axis models are not extended indiscriminately to arbitrary three-dimensional motion."
		},
		{
			id: "angular",
			title: "College Physics 2e: Angular Momentum and Its Conservation",
			url: "https://openstax.org/books/college-physics-2e/pages/10-5-angular-momentum-and-its-conservation",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original zero external torque and applicable scalar angular-momentum relation checked. Internal work can change rotational kinetic energy; source rotating-person demonstrations are not reproduced."
		},
		{
			id: "pressure",
			title: "College Physics 2e: Pressure",
			url: "https://openstax.org/books/college-physics-2e/pages/11-3-pressure",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original force-per-area distinction checked at the correct section URL. Initial nonexistent 11-2-pressure and 11-3-pressure-in-fluids URLs are not citations. Medical and injury examples are not adopted."
		},
		{
			id: "hydrostatic",
			title: "College Physics 2e: Variation of Pressure with Depth in a Fluid",
			url: "https://openstax.org/books/college-physics-2e/pages/11-4-variation-of-pressure-with-depth-in-a-fluid",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original static-fluid density, depth and boundary-pressure relation checked. Structural, diving and actual atmospheric quantities are not imported."
		},
		{
			id: "viscosity",
			title: "College Physics 2e: Viscosity and Laminar Flow; Poiseuille's Law",
			url: "https://openstax.org/books/college-physics-2e/pages/12-4-viscosity-and-laminar-flow-poiseuilles-law",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original shear-response and dynamic viscosity units checked. Newtonian constant-viscosity examples do not define all fluids; source biological and operating examples are excluded."
		},
		{
			id: "density",
			title: "College Physics 2e: Density",
			url: "https://openstax.org/books/college-physics-2e/pages/11-2-density",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original mass-per-volume definition checked. Density alone does not specify the viscous constitutive response; source material tables and measured values are not imported."
		},
		{
			id: "pascal",
			title: "College Physics 2e: Pascal's Principle",
			url: "https://openstax.org/books/college-physics-2e/pages/11-5-pascals-principle",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original enclosed-fluid pressure increments and ideal force/displacement tradeoff checked. Braking systems, construction and lifting instructions are not adopted."
		},
		{
			id: "buoyancy",
			title: "College Physics 2e: Archimedes' Principle",
			url: "https://openstax.org/books/college-physics-2e/pages/11-7-archimedes-principle",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original displaced-fluid weight and static floating balance checked. Surface-tension, support, acceleration and fluid-gradient limitations remain explicit. Personal flotation guidance is not imported."
		},
		{
			id: "flow",
			title: "College Physics 2e: Flow Rate and Its Relation to Velocity",
			url: "https://openstax.org/books/college-physics-2e/pages/12-1-flow-rate-and-its-relation-to-velocity",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original steady incompressible continuity and cross-sectional average velocity checked. Biological flow, nozzle construction and real operating numbers are not adopted."
		},
		{
			id: "bernoulli",
			title: "College Physics 2e: Bernoulli's Equation",
			url: "https://openstax.org/books/college-physics-2e/pages/12-2-bernoullis-equation",
			kind: "Original definition or teaching reference",
			note: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. Original ideal energy-per-volume balance checked with steady, incompressible, inviscid, same-streamline scope. Different height and energy additions cannot be silently discarded."
		},
		{
			id: "fluid-lecture",
			title: "The Feynman Lectures on Physics, Volume II, Chapter 40: The Flow of Dry Water",
			url: "https://www.feynmanlectures.caltech.edu/II_40.html",
			kind: "Original definition or teaching reference",
			note: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands. Original explicitly ideal fluid model, continuity and steady same-streamline Bernoulli condition checked. The title does not describe measured water with zero viscosity; real losses remain exclusions."
		}
	]
};
