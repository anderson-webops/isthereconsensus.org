import type { SeedClaim } from "./claims.js";

export const mechanicsCheckedAt = "2026-10-05T13:59:14.000Z";

function textbook(section: string, title: string, note: string): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title: `College Physics 2e: ${title}`, publisher: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs", year: 2022, url: `https://openstax.org/books/college-physics-2e/pages/${section}`, stance: "supports", order: 1, note };
}

function lecture(volume: string, chapter: string, title: string, note: string): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title: `The Feynman Lectures on Physics, Volume ${volume}, Chapter ${Number(chapter)}: ${title}`, publisher: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands", url: `https://www.feynmanlectures.caltech.edu/${volume}_${chapter}.html`, stance: "supports", order: 1, note };
}

export const readerMechanicsSources = {
	displacement: textbook("2-1-displacement", "Displacement", "Original endpoint and path definitions checked. Independently constructed paths are not source exercises or measured journeys."),
	speed: textbook("2-3-time-velocity-and-speed", "Time, Velocity, and Speed", "Original instantaneous and interval-average distinctions checked. Average speed is not universally the magnitude of average velocity."),
	first: textbook("4-2-newtons-first-law-of-motion-inertia", "Newton's First Law of Motion: Inertia", "Original inertial-frame constant-velocity condition checked. Frictionless descriptions are model assumptions, not tested apparatus."),
	second: textbook("4-3-newtons-second-law-of-motion-concept-of-a-system", "Newton's Second Law of Motion: Concept of a System", "Original net-force, constant-mass and gravitational-weight distinctions checked. Finite-interval force must mean the applicable average; variable-mass shortcuts are not adopted."),
	third: textbook("4-4-newtons-third-law-of-motion-symmetry-in-forces", "Newton's Third Law of Motion: Symmetry in Forces", "Original interaction pairs acting on different objects checked. Free-body and whole-system force sums must not be conflated."),
	normal: textbook("4-5-normal-tension-and-other-examples-of-forces", "Normal, Tension, and Other Examples of Forces", "Original perpendicular contact force and component balances checked. Clinical traction, lifting and equipment-use examples are not imported."),
	friction: textbook("5-1-friction", "Friction", "Original responsive static friction and maximum-force inequality checked. Tabulated coefficients and experiment instructions are not reproduced or treated as universal material properties."),
	circular: textbook("6-2-centripetal-acceleration", "Centripetal Acceleration", "Original velocity-direction change and uniform-circle acceleration checked. Driving, centrifuge, biological sample and apparatus operating examples are not adopted."),
	centripetal: textbook("6-3-centripetal-force", "Centripetal Force", "Original inward resultant-force role checked. This is not an additional interaction to add to actual forces or a device-design prescription."),
	work: textbook("7-1-work-the-scientific-definition", "Work: The Scientific Definition", "Original force-displacement projection and signed work checked. Zero work by one force does not mean a whole system uses no energy. Biological efficiency estimates are not adopted."),
	kinetic: textbook("7-2-kinetic-energy-and-the-work-energy-theorem", "Kinetic Energy and the Work-Energy Theorem", "Original nonrelativistic translational energy and net-work relation checked. Injury, damage and driving-performance examples are not imported."),
	conservative: textbook("7-4-conservative-forces-and-potential-energy", "Conservative Forces and Potential Energy", "Original path-independent conservative-force work checked. The statement is not extended to arbitrary forces or incomplete system boundaries."),
	nonconservative: textbook("7-5-nonconservative-forces", "Nonconservative Forces", "Original path-dependent friction work and mechanical-energy changes checked. Constructed energy balances are not measured heat or friction coefficients."),
	energy: textbook("7-6-conservation-of-energy", "Conservation of Energy", "Original total-energy accounting checked. Macroscopic mechanical energy is distinguished from internal forms and boundary transfers."),
	momentum: textbook("8-1-linear-momentum-and-force", "Linear Momentum and Force", "Original vector momentum definition checked in a constant-mass Newtonian scope. A finite difference divided by time is not automatically an instantaneous force."),
	impulse: textbook("8-2-impulse", "Impulse", "Original average net external force over an interval checked. Peak force alone does not determine impulse; source impact-protection claims are not adopted."),
	elastic: textbook("8-4-elastic-collisions-in-one-dimension", "Elastic Collisions in One Dimension", "Original total collision kinetic-energy and momentum balances checked. Ideal equal-mass exchange is independently recomputed, not a measured impact or universal individual-energy conservation."),
	inelastic: textbook("8-5-inelastic-collisions-in-one-dimension", "Inelastic Collisions in One Dimension", "Original distinction between conserved momentum and changed kinetic energy checked. A sticking loss example is not a claim that all energy-releasing collisions must lose kinetic energy."),
	torque: textbook("9-2-the-second-condition-for-equilibrium", "The Second Condition for Equilibrium", "Original force moment about a specified axis and perpendicular lever arm checked. No structural load, tool setting or operating recommendation is adopted."),
	inertia: textbook("10-3-dynamics-of-rotational-motion-rotational-inertia", "Dynamics of Rotational Motion: Rotational Inertia", "Original mass distribution and squared distance from an axis checked. Fixed-axis models are not extended indiscriminately to arbitrary three-dimensional motion."),
	rotation: textbook("10-4-rotational-kinetic-energy-work-and-energy-revisited", "Rotational Kinetic Energy: Work and Energy Revisited", "Original rotational energy, compatible angular work and rolling-energy split checked. Body geometry and nonslip conditions are explicit, not assumed for all rolling."),
	angular: textbook("10-5-angular-momentum-and-its-conservation", "Angular Momentum and Its Conservation", "Original zero external torque and applicable scalar angular-momentum relation checked. Internal work can change rotational kinetic energy; source rotating-person demonstrations are not reproduced."),
	pressure: textbook("11-3-pressure", "Pressure", "Original force-per-area distinction checked at the correct section URL. Initial nonexistent 11-2-pressure and 11-3-pressure-in-fluids URLs are not citations. Medical and injury examples are not adopted."),
	hydrostatic: textbook("11-4-variation-of-pressure-with-depth-in-a-fluid", "Variation of Pressure with Depth in a Fluid", "Original static-fluid density, depth and boundary-pressure relation checked. Structural, diving and actual atmospheric quantities are not imported."),
	pascal: textbook("11-5-pascals-principle", "Pascal's Principle", "Original enclosed-fluid pressure increments and ideal force/displacement tradeoff checked. Braking systems, construction and lifting instructions are not adopted."),
	buoyancy: textbook("11-7-archimedes-principle", "Archimedes' Principle", "Original displaced-fluid weight and static floating balance checked. Surface-tension, support, acceleration and fluid-gradient limitations remain explicit. Personal flotation guidance is not imported."),
	flow: textbook("12-1-flow-rate-and-its-relation-to-velocity", "Flow Rate and Its Relation to Velocity", "Original steady incompressible continuity and cross-sectional average velocity checked. Biological flow, nozzle construction and real operating numbers are not adopted."),
	bernoulli: textbook("12-2-bernoullis-equation", "Bernoulli's Equation", "Original ideal energy-per-volume balance checked with steady, incompressible, inviscid, same-streamline scope. Different height and energy additions cannot be silently discarded."),
	viscosity: textbook("12-4-viscosity-and-laminar-flow-poiseuilles-law", "Viscosity and Laminar Flow; Poiseuille's Law", "Original shear-response and dynamic viscosity units checked. Newtonian constant-viscosity examples do not define all fluids; source biological and operating examples are excluded."),
	density: textbook("11-2-density", "Density", "Original mass-per-volume definition checked. Density alone does not specify the viscous constitutive response; source material tables and measured values are not imported."),
	spring: textbook("16-3-simple-harmonic-motion-a-special-periodic-motion", "Simple Harmonic Motion: A Special Periodic Motion", "Original linear undamped spring-mass period checked. Amplitude independence is not claimed for every oscillator; source exercises and apparatus instructions are not adopted."),
	newton: lecture("I", "09", "Newton's Laws of Dynamics", "Original constant-mass, inertial-frame and weight-versus-inertia limits checked. Historical claims of complete prediction and variable-mass shortcuts are not adopted."),
	forces: lecture("I", "12", "Characteristics of Force", "Original interaction, gravity and friction-model context checked. Historical material tables and construction examples are not reproduced."),
	momentumLecture: lecture("I", "10", "Conservation of Momentum", "Original system momentum and collision energy distinctions checked. Explosive demonstrations, apparatus and source numerical examples are not reproduced."),
	energyLecture: lecture("I", "14", "Work and Potential Energy (conclusion)", "Original work, conservative paths and internal-energy accounting checked. Historical simplifications of heat as pure kinetic energy are not adopted."),
	rotationLecture: lecture("I", "18", "Rotation in Two Dimensions", "Original constant-mass center-of-mass motion, rotational inertia and angular momentum checked. Human demonstrations, apparatus and propulsion procedures are not imported."),
	fluidLecture: lecture("II", "40", "The Flow of Dry Water", "Original explicitly ideal fluid model, continuity and steady same-streamline Bernoulli condition checked. The title does not describe measured water with zero viscosity; real losses remain exclusions."),
	springLecture: lecture("I", "21", "The Harmonic Oscillator", "Original constant-coefficient linear oscillator and natural angular-frequency relation checked. Forced response, biological analogies and source experiment instructions are not imported."),
	si: { kind: "technical_reference", title: "SP 330: The International System of Units, Section 2", publisher: "NIST", url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-2", stance: "supports", order: 1, note: "Original coherent mechanical units and explicit torque-versus-energy notation checked. This citation supports quantities and units, not an independent experimental test of every mechanical model." }
} satisfies Record<string, SeedClaim["sources"][number]>;

interface MechanicsReview {
	key: string;
	id: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	tags: string[];
	sources: Array<keyof typeof readerMechanicsSources>;
}

const reviews: MechanicsReview[] = [
	{
		key: "distance",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9001",
		title: "Are distance traveled and displacement always the same?",
		slug: "are-distance-traveled-and-displacement-always-the-same",
		bottomLine: "No. Distance traveled adds the length of a path, while displacement compares its final position with its initial position. In a constructed one-dimensional example, moving 7 m in the positive direction and then 2 m back gives 9 m traveled but a displacement of positive 5 m. Both answers describe the same motion.",
		stableCore: ["A path records intermediate motion that an endpoint comparison does not retain. Returning to the starting position gives zero displacement even after a nonzero journey. Displacement also needs a direction convention: reversing the coordinate axis changes its signed component without making the traveled distance negative. In more dimensions, displacement is a vector and distance remains a nonnegative scalar length.", "The magnitude of displacement cannot exceed path length in the ordinary Euclidean description, but equality requires the relevant straight, unreversed motion. Measuring only where an object ended therefore cannot reconstruct its route. A curved route or a reversal can change the distance while preserving the same endpoints. This distinction is definitional rather than evidence that motion somehow disappeared."],
		editorSummary: "Check whether a reported number answers how far along a route or how far from the starting position. Mixing those questions creates apparent contradictions in motion reports and interval averages. The numbers here are hypothetical, not observations of a traveler or an instrument. Coordinate choices, a consistent reference frame and what point on an extended body is tracked must be specified; changing those choices is not a failure of the definitions.",
		qualification: "A tracked point and consistent ordinary spatial coordinates; path length and endpoint displacement are different quantities.",
		tags: ["distance traveled displacement route", "path length endpoints reversal"],
		sources: ["displacement", "speed"]
	},
	{
		key: "speed",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9002",
		title: "Is average speed always the magnitude of average velocity?",
		slug: "is-average-speed-always-the-magnitude-of-average-velocity",
		bottomLine: "No. Average speed divides total path length by elapsed time; average velocity divides displacement by elapsed time. In a hypothetical round trip, a point goes 4 m out and 4 m back in 4 s. Its average speed is 2 m/s, while its average velocity is zero. The instantaneous speed is nevertheless the magnitude of instantaneous velocity.",
		stableCore: ["The order of averaging matters. Direction reversals can cancel signed displacement contributions, but they do not cancel positive lengths traveled. Taking a magnitude after an interval average therefore gives a different result from averaging the instantaneous magnitudes. The distinction is especially visible on a closed route, without requiring any unusual force or a measurement error to explain the difference.", "An interval-average value does not determine the largest speed or the speed at each instant. Different motions can share the same total distance and duration. Likewise, zero average velocity does not imply that the point remained still throughout the interval. A speedometer reading at one instant and an endpoint-based trip calculation are answering different questions and need not match."],
		editorSummary: "Specify the interval, path and reference frame before comparing speeds. An unweighted average of selected readings is not necessarily the time average, particularly if the readings represent unequal durations. The example uses a complete four-second interval and independently chosen distances, not a measured journey. This review does not dispute the instantaneous magnitude relation; it explains why that relation cannot simply be moved outside an averaging operation when direction changes.",
		qualification: "Time averages of a tracked point in a fixed frame; instantaneous and interval-average relations must remain distinct.",
		tags: ["average speed average velocity round trip", "instantaneous magnitude velocity"],
		sources: ["speed", "displacement"]
	},
	{
		key: "netForce",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9003",
		title: "Does zero net force mean an object must be at rest?",
		slug: "does-zero-net-force-mean-an-object-must-be-at-rest",
		bottomLine: "No in the constant-mass Newtonian description in an inertial frame. Zero net force means no acceleration, so velocity remains constant. That velocity can be nonzero. A hypothetical point already moving at 3 m/s continues at 3 m/s while its net force remains zero; rest is only one possible constant-velocity state.",
		stableCore: ["Net force is the vector sum of the forces acting on the selected object, not the largest individual force. Opposing nonzero forces can have a zero resultant. This means an object can experience interactions while keeping the same velocity. Conversely, a temporarily zero velocity says nothing by itself about the net force or about whether the object will remain at rest.", "Ordinary objects often slow because there is an opposing interaction, not because motion must consume a stored supply of force. The first-law statement requires an inertial frame and a suitable classical model. Describing an accelerating reference frame without its additional accounting can create an apparent contradiction even when the inertial-frame balance is consistent. Constant speed alone also does not establish constant velocity."],
		editorSummary: "Ask whether a claim concerns velocity or a change in velocity. An observation at a single time cannot prove the force stayed zero over an interval. These are conceptual conditions, not a promise that a real surface has no friction or that an object will travel indefinitely in a particular environment. Mass changes, relativistic conditions and an incomplete list of forces require a different or more complete analysis rather than a universal rest rule.",
		qualification: "Constant mass, Newtonian dynamics and an inertial frame; zero resultant fixes acceleration, not the initial velocity.",
		tags: ["zero net force at rest constant velocity", "Newton first law inertia"],
		sources: ["first", "newton"]
	},
	{
		key: "massWeight",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9004",
		title: "Does an unchanged mass have the same gravitational weight everywhere?",
		slug: "does-an-unchanged-mass-have-the-same-gravitational-weight-everywhere",
		bottomLine: "No. In the ordinary local gravitational model, weight is mass times gravitational acceleration, while mass is the body's unchanged inertial quantity in this comparison. A hypothetical 2 kg mass has gravitational weight 16 N where the acceleration is 8 m/s squared, but 6 N where it is 3 m/s squared. These are constructed conditions, not planetary measurements.",
		stableCore: ["Kilograms and newtons name different quantities. A larger gravitational field can produce a greater gravitational force without changing the selected body's mass. Calling both numbers weight in everyday speech hides that distinction. The question here concerns gravitational force, not the force measured by every possible support or scale; a contact reading can also depend on acceleration and other forces.", "An inertial mass determines the relation between a resultant force and acceleration in the constant-mass Newtonian approximation. The local gravitational acceleration supplies another part of the weight calculation. Neither one number nor a change in location proves that the material was added to or removed from the body. The field must be sufficiently specified for the local force approximation to apply."],
		editorSummary: "First identify whether the reported quantity is mass, gravitational force or a support reading. Kilograms describe mass; newtons describe force, with the gravity field supplying the local gravitational acceleration. An extended object in a strongly varying field may need a distributed calculation rather than one local acceleration. The invented values isolate the definitional distinction; no actual location, scale calibration or planetary gravity was assessed. Apparent orbital weightlessness is a separate question and is not counted again here.",
		qualification: "Unchanged Newtonian mass and a specified local gravitational acceleration; gravitational weight is not every scale reading.",
		tags: ["mass weight kilograms newtons gravity", "unchanged mass different gravitational weight"],
		sources: ["second", "newton", "si"]
	},
	{
		key: "thirdLaw",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9005",
		title: "Do Newton's third-law force pairs cancel on the same object?",
		slug: "do-newtons-third-law-force-pairs-cancel-on-the-same-object",
		bottomLine: "No. The two action-reaction forces of an ordinary Newtonian interaction pair act on different objects. One object's force balance does not include both members as if they acted on that object. Equal and opposite interaction forces can therefore coexist with acceleration. They cancel as internal forces when the balance includes the complete two-object system.",
		stableCore: ["A force must identify both what exerts it and what receives it. The force of object A on B belongs to B's balance; B's force on A belongs to A's balance. A separate force opposing one of them on B need not be its third-law partner. Confusing the receiving objects is the error, not a contradiction between the second and third laws.", "Equal force magnitudes do not imply equal accelerations if the receiving masses differ. Hypothetical masses of 2 kg and 4 kg subject only to an interaction of magnitude 6 N have acceleration magnitudes 3 and 1.5 m/s squared respectively. The directions oppose one another. Their momentum changes are compatible with a conserved total when no net external force acts on the complete system."],
		editorSummary: "Draw the boundary around the object or objects before adding forces. A complete system's internal cancellation does not erase the motions of its separate parts. The simple numbers are not a measured collision or a practical propulsion instruction. This account is limited to the stated classical interaction model; electromagnetic field momentum and more general relativistic descriptions require the complete momentum accounting rather than an indiscriminate pairwise shortcut.",
		qualification: "Ordinary Newtonian interaction pairs with identified receiving objects; whole-system and single-object balances differ.",
		tags: ["Newton third law action reaction cancel", "equal opposite forces different objects"],
		sources: ["third", "momentumLecture"]
	},
	{
		key: "normal",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9006",
		title: "Must the normal contact force always equal gravitational weight?",
		slug: "must-the-normal-contact-force-always-equal-gravitational-weight",
		bottomLine: "No. A normal force is a contact force perpendicular to a surface, and its value follows the relevant force balance. It equals gravitational weight only in particular conditions. For a hypothetical 2 kg body with downward gravitational acceleration 8 m/s squared and upward acceleration 2 m/s squared, an upward contact force of 20 N balances a 16 N weight.",
		stableCore: ["The example assumes that weight and the upward normal force are the only vertical forces and that contact is maintained. The resultant is 4 N upward, giving the specified acceleration. Treating the normal force as automatically 16 N would instead give zero vertical acceleration and contradict that model. Additional vertical forces would change the required contact force even with the same mass and gravity.", "Orientation also matters. On a nonaccelerating incline, a normal component balance is different from the total vertical weight. A normal force cannot be assigned by simply copying a weight label without specifying the contact surface and other forces. If a contact is lost, an assumed positive contact force may no longer describe the situation; the contact condition itself must be reconsidered."],
		editorSummary: "Name the direction perpendicular to the contact and sum the forces in that direction. A supporting interaction is not defined as a second name for gravity. This constructed balance is not an elevator setting, a load rating, a lifting instruction or an assessment of structural safety. Real contacts can deform or have distributed forces, and a single normal-resultant description does not provide all the details of the pressure across a surface.",
		qualification: "A specified contact, force list and acceleration; equality with weight is conditional, not the definition of normal force.",
		tags: ["normal force weight always equal", "contact force acceleration incline"],
		sources: ["normal", "second"]
	},
	{
		key: "staticFriction",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9007",
		title: "Is static friction always equal to its maximum value?",
		slug: "is-static-friction-always-equal-to-its-maximum-value",
		bottomLine: "No. In the simple static-friction model, the contact supplies the force required to prevent relative sliding up to a limiting magnitude. The coefficient times normal force is that limit, not the force at every instant. A hypothetical coefficient 0.4 and normal force 20 N give an 8 N limit, but a balanced 3 N tangential demand needs only 3 N of static friction.",
		stableCore: ["The inequality distinguishes an available maximum from an actual response. If no tangential balancing force is needed in the stated model, static friction can be zero even while surfaces touch. At the limit it can reach the coefficient-normal-force product. Substituting the maximum in every static situation invents a force that may violate the body's force balance and predict motion where none was specified.", "The simple coefficient is an empirical idealization, not a universal constant attached to a material name. Surface state, loading and contact conditions can matter. Once sliding occurs, the static model no longer supplies the whole response; substituting a kinetic-friction model also needs its assumptions. This is why a maximum-force calculation does not establish whether an observed contact was actually at the threshold."],
		editorSummary: "Ask whether a number is a limiting capacity or the force required by the current balance. The example uses independently chosen values and does not measure a contact coefficient, certify grip or recommend a load. The contact geometry and other tangential forces remain part of the problem. Static equilibrium of the selected direction must be established, not inferred merely from the presence of two surfaces or a quoted coefficient.",
		qualification: "Simple contact-friction inequality before relative sliding; actual force and limiting force must not be conflated.",
		tags: ["static friction maximum mu normal force", "friction at rest responsive force"],
		sources: ["friction", "forces"]
	},
	{
		key: "circularSpeed",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9008",
		title: "Can an object accelerate while its speed stays constant?",
		slug: "can-an-object-accelerate-while-its-speed-stays-constant",
		bottomLine: "Yes. Acceleration is a change in velocity, which includes direction as well as magnitude. A point moving uniformly around a circle changes direction continuously despite constant speed. In a hypothetical circle with speed 4 m/s and radius 2 m, the inward acceleration magnitude is 8 m/s squared. Constant speed is not the same as constant velocity.",
		stableCore: ["At successive positions on the circle, velocity vectors point along different tangents. Their difference is not zero even when their lengths match. In the uniform circular model, acceleration points inward rather than along the instantaneous velocity. This perpendicular component changes direction without changing the speed; a tangential component would additionally change the speed and would require another part of the acceleration description.", "The familiar radius relation depends on specifying the path's curvature and motion. A straight path at unchanged speed has no such directional acceleration. A general curved path need not have a single constant radius or a purely inward resultant. Comparing only two speed labels therefore cannot determine the acceleration vector, much less all the forces that might produce it."],
		editorSummary: "Identify whether constant refers to speed or to the complete velocity vector. The constructed numbers follow the uniform-circle relation, not measurements of a vehicle, centrifuge or rotating apparatus. They do not establish a safe acceleration or an operating speed. The reference frame and trajectory must remain consistent, and a rotating-frame description needs its own accounting rather than treating an inertial-frame directional change as an unexplained extra force.",
		qualification: "A tracked point in a stated inertial frame; uniform circular motion illustrates directional acceleration at fixed speed.",
		tags: ["constant speed acceleration circular velocity direction", "centripetal acceleration radius"],
		sources: ["circular", "newton"]
	},
	{
		key: "centripetal",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9009",
		title: "Is centripetal force an extra force to add to the real forces?",
		slug: "is-centripetal-force-an-extra-force-to-add-to-the-real-forces",
		bottomLine: "No in an inertial-frame circular-motion balance. Centripetal describes the inward resultant needed for the trajectory, not an additional kind of interaction. Gravity, tension or contact forces can supply that resultant. A hypothetical 3 kg point at 4 m/s on a 2 m radius requires a 24 N inward net force; adding another 24 N on top would double-count the requirement.",
		stableCore: ["The second law relates the actual vector sum to the acceleration. For a uniform circle, the needed radial component is mass times speed squared divided by radius. That equation constrains the sum of actual forces; it does not identify their physical origin. If two interactions contribute inward and one outward, their signed radial components must be combined rather than assigning each the whole required resultant.", "An object moving around a circle can also have a tangential acceleration when its speed changes. In that case the inward relation is only the radial part of the force balance, not the complete vector force. The role word centripetal cannot replace identification of interactions, axes and trajectory. Rotating-frame apparent forces belong to a separately specified reference-frame description."],
		editorSummary: "List forces by what exerts them, then check whether their inward components produce the stated motion. A required resultant is not evidence that an invisible extra interaction exists. The hypothetical values are not a material-tension test, an orbital measurement, a rotating-machine design or a safety limit. This review is distinct from constant-speed acceleration: that question concerns velocity direction, while this one prevents double-counting in the force sum.",
		qualification: "Specified inertial-frame circular trajectory; centripetal names the radial net-force role, not another interaction.",
		tags: ["centripetal force extra force double counting", "inward net force circular motion"],
		sources: ["centripetal", "second"]
	},
	{
		key: "kineticScaling",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9010",
		title: "Does doubling speed merely double kinetic energy?",
		slug: "does-doubling-speed-merely-double-kinetic-energy",
		bottomLine: "No for fixed mass in the nonrelativistic translational model. Kinetic energy is proportional to speed squared, so doubling speed multiplies that energy by four. A hypothetical 2 kg point moving at 3 m/s has 9 J, while at 6 m/s it has 36 J. Momentum scales differently and must not be substituted for kinetic energy.",
		stableCore: ["The one-half mass-times-speed-squared relation uses speed measured in the specified reference frame. Holding mass fixed is essential to the comparison. Doubling mass instead doubles this energy at fixed speed, while changing both quantities requires both factors. The positive scalar energy is also distinct from vector momentum: opposite equal velocities can cancel momentum contributions while their kinetic energies still add.", "The work-energy theorem relates a change in the point's kinetic energy to net mechanical work under the applicable conditions. Going from 9 J to 36 J requires a 27 J change, not another 9 J. This difference is an energy-accounting result; it does not identify the force, distance, duration or mechanism responsible for the motion, and it does not establish a constant acceleration."],
		editorSummary: "Keep the mass, frame and type of motion fixed before using a scaling rule. Extended bodies can have rotational and internal energy as well as center-of-mass translation. Relativistic speeds need a different kinetic-energy expression. The independently chosen point-mass values are not collision observations, injury estimates, damage predictions or vehicle-performance advice. The square law answers a bounded energy question, not every consequence of moving faster in a real system.",
		qualification: "Fixed mass and nonrelativistic translational kinetic energy in a consistent frame; no damage or performance prediction.",
		tags: ["doubling speed kinetic energy four times", "kinetic energy momentum squared speed"],
		sources: ["kinetic", "si"]
	},
	{
		key: "negativeWork",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9011",
		title: "Can a force do negative mechanical work?",
		slug: "can-a-force-do-negative-mechanical-work",
		bottomLine: "Yes. Mechanical work includes the component of force along the displacement. A force opposing that displacement contributes negative work in the selected balance. A hypothetical constant 4 N opposing force over a straight 3 m displacement does negative 12 J of work. The sign indicates an energy transfer direction, not an impossible force or a negative energy supply.",
		stableCore: ["For a constant force, its dot product with displacement determines the work. An aligned force gives a positive contribution, an opposing force a negative one and a perpendicular force zero for that displacement. Multiplying two magnitudes without a direction loses this sign information. A force can be large yet have zero work contribution if its component along the actual motion is zero.", "The net work is the sum over the relevant forces and path. One force's negative work does not require the total work to be negative if other forces add larger positive contributions. Conversely, removing energy from a selected macroscopic motion does not destroy total energy. Where the energy goes depends on the system boundary and interactions, not the sign alone."],
		editorSummary: "Identify the receiving object, the path and the force before deciding which energy balance the sign belongs to. If the force varies, add its projected contributions along the path rather than multiplying one selected value by the whole distance. The simple example is not a braking procedure, an impact rating or a measured dissipation. It separates signed work from effort, force magnitude and total-system energy, which are related but different questions.",
		qualification: "Projected force along a specified path; work by one force is distinct from net work and total-system energy.",
		tags: ["negative work force opposing displacement", "mechanical work sign dot product"],
		sources: ["work", "energyLecture"]
	},
	{
		key: "closedPathWork",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9012",
		title: "Does returning to the starting point make every force's work zero?",
		slug: "does-returning-to-the-starting-point-make-every-forces-work-zero",
		bottomLine: "No. A zero endpoint displacement does not make the work of every path-dependent force zero. In a constructed path with two 3 m legs and a 2 N force opposing motion on each leg, that force does negative 12 J overall, despite ending at the starting point. Conservative-force work is a different, explicitly qualified case.",
		stableCore: ["Work sums the force projected along successive displacements. On the return leg, the opposing force changes direction with the motion, so its contribution remains negative. Treating it as one unchanged vector multiplied by the final endpoint displacement changes the model and gives the wrong answer. The relevant calculation retains the path and the force at each part of it.", "A conservative force has an applicable potential-energy description whose change depends only on configuration endpoints. Its work around a closed path is zero under those conditions. That theorem does not apply automatically to sliding friction or every externally controlled force. Different individual contributions can coexist during the same journey: one can have zero closed-path work while another transfers nonzero energy."],
		editorSummary: "Ask whether a claimed zero is an endpoint fact or a theorem about the particular force. The illustrative opposing force is specified, not a measured friction coefficient or an experiment instruction. A complete journey might also involve a changing configuration of other bodies, so returning one tracked point does not prove the whole system returned to its initial state. Keep the conservative assumption, path and system boundary explicit rather than applying a universal round-trip shortcut.",
		qualification: "Closed tracked-point path with explicitly specified force contributions; conservative path independence is not universal.",
		tags: ["closed path work zero friction", "return starting point conservative force"],
		sources: ["conservative", "nonconservative", "work"]
	},
	{
		key: "staticWork",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9013",
		title: "Does exerting a force without displacement necessarily do mechanical work?",
		slug: "does-exerting-a-force-without-displacement-necessarily-do-mechanical-work",
		bottomLine: "No for that force acting at a point that does not move in the stated frame. Mechanical work requires displacement along a force component. A large nonzero force on an unmoving point can therefore have zero mechanical work contribution. This does not mean an entire device or system uses no energy, nor that nothing deforms elsewhere.",
		stableCore: ["Force and work have different dimensions and describe different aspects of an interaction. A hypothetical constant 9 N force at a point with exactly zero displacement contributes zero joules through that force. The force can still be part of a static balance. The work statement does not erase the interaction, determine its pressure distribution or certify that a real body is perfectly rigid.", "For an extended deforming body, different points can move even when a chosen reference point or center stays fixed. Forces at those moving points can transfer energy. Internal changes and other boundary transfers can also continue independently of the selected force's mechanical work. The simple point statement must not be replaced by the much broader assertion that every motion and every energy transfer vanish."],
		editorSummary: "Name the force's point of application and reference frame, then distinguish its mechanical-work contribution from the full energy budget. A report about effort or sustained operation is not automatically a report of displacement work. The example is definitional and hypothetical; it is not an energy-efficiency measurement or an instruction to hold a load. Time alone does not convert a stationary force into work, while power from other channels needs its own accounting.",
		qualification: "Work by a selected force at its actual application point; zero local displacement does not establish zero total energy use.",
		tags: ["force no displacement mechanical work", "holding force zero work energy use"],
		sources: ["work", "energyLecture"]
	},
	{
		key: "mechanicalEnergy",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9014",
		title: "Does conservation of energy require mechanical energy to remain unchanged?",
		slug: "does-conservation-of-energy-require-mechanical-energy-to-remain-unchanged",
		bottomLine: "No. Conserved total energy includes forms and transfers that a macroscopic kinetic-plus-potential calculation may leave out. A hypothetical isolated balance can change from 9 J of mechanical energy to 4 J of mechanical energy and 5 J of additional internal energy. The total remains 9 J; the mechanical part does not have to remain 9 J.",
		stableCore: ["A mechanical-energy conservation equation is useful when its applicable forces and boundary conditions justify ignoring other changes. Friction, deformation and other interactions can shift energy into forms not included in the selected macroscopic kinetic and potential terms. Such changes are not evidence of total-energy destruction. Conversely, merely labeling an unexplained difference as heat does not prove a real balance was measured correctly.", "The system boundary determines whether energy crosses into or out of the account. An open system can gain or lose total energy through transfers even while the larger combined system conserves energy. Choosing only one body's visible motion and ignoring its environment can therefore make an incomplete conservation statement look violated. Internal energy is not synonymous with the temperature of one unspecified object."],
		editorSummary: "List the energy terms and transfers before asking which sum stays constant. The constructed 9 J balance is an arithmetic illustration, not a measured thermal yield or an efficiency estimate. Changing a potential-energy zero does not alter a consistent energy difference. This review complements, rather than repeats, the perpetual-motion question: it addresses why macroscopic mechanical energy can change without any violation of the complete energy account or creation of net energy.",
		qualification: "Specified energy terms and system boundary; conservation of total energy is not unconditional conservation of the mechanical subset.",
		tags: ["mechanical energy total conservation friction internal energy", "kinetic potential energy heat balance"],
		sources: ["energy", "nonconservative", "energyLecture"]
	},
	{
		key: "collisionEnergy",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9015",
		title: "Does conserved collision momentum guarantee conserved kinetic energy?",
		slug: "does-conserved-collision-momentum-guarantee-conserved-kinetic-energy",
		bottomLine: "No. Momentum and kinetic energy are different quantities with different conservation conditions. In a hypothetical one-dimensional sticking collision, equal 2 kg masses initially moving at 4 m/s and zero finish together at 2 m/s. Total momentum remains 8 kg m/s, while translational kinetic energy changes from 16 J to 8 J. Other forms account for the remaining energy.",
		stableCore: ["The momentum result assumes negligible net external impulse on the complete pair during the chosen interval. Adding the two signed mass-velocity products gives the same value before and after. This condition does not require that kinetic energy also stay the same. The final shared velocity in the sticking example follows from total momentum divided by the combined constant mass.", "The lost translational energy can enter deformation, internal motion and other channels that a point-mass kinetic account excludes. Total-energy conservation requires including those channels. Not every nonelastic event has exactly the same energy partition; stored internal energy can also be released. The particular 8 J difference belongs to the explicitly constructed sticking model and is not a universal fraction for collisions."],
		editorSummary: "First state the system and external impulse, then distinguish an elastic assumption from momentum conservation alone. Individual objects exchange momentum during the interaction even when the pair's total is constant. The values here are independently chosen, not impact measurements, damage estimates, safety ratings or collision-design instructions. The complete energy balance and the direction of motion remain essential; treating momentum as a scalar speed-times-mass magnitude can conceal cancellations and produce an inconsistent answer.",
		qualification: "Constant-mass classical pair with negligible external impulse; the sticking example does not characterize all inelastic energy changes.",
		tags: ["collision momentum conserved kinetic energy inelastic", "sticking collision energy loss"],
		sources: ["inelastic", "momentumLecture", "momentum"]
	},
	{
		key: "elasticExchange",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9016",
		title: "Does an elastic collision leave each object's kinetic energy unchanged?",
		slug: "does-an-elastic-collision-leave-each-objects-kinetic-energy-unchanged",
		bottomLine: "No. Elastic describes conservation of the relevant total collision kinetic energy, not preservation of each object's share. In a hypothetical ideal one-dimensional collision between equal 1 kg masses, initial velocities 3 m/s and zero exchange to zero and 3 m/s. Total kinetic energy stays 4.5 J, but its allocation between the objects changes completely.",
		stableCore: ["Both total momentum and total kinetic energy constrain the ideal isolated collision. The exchanged velocities give total momentum 3 kg m/s before and after, and the same sum of squared-speed energy terms. The first object's individual momentum and energy change because it interacts with the second. Applying a conservation law to each interacting part independently would incorrectly prohibit the exchange itself.", "Equal-mass velocity exchange is a special one-dimensional result under the specified elastic assumptions, not the general answer for arbitrary masses, initial directions or material responses. Real macroscopic interactions may be approximately elastic rather than perfectly elastic. Temporary energy stored during the contact is compatible with the before-and-after conservation condition; the selected kinetic sum need not remain unchanged at every intermediate instant."],
		editorSummary: "Check which total and which times the elastic label refers to. An object's unchanged mass does not imply unchanged velocity after an interaction. The independently constructed values demonstrate allocation rather than measured restitution, apparatus performance or collision safety. External impulse, rotation and omitted internal degrees of freedom can require a larger account. This question is distinct from whether momentum conservation alone proves elasticity: it addresses what elasticity does and does not conserve for individual participants.",
		qualification: "Ideal one-dimensional equal-mass elastic collision with negligible external impulse; conserved totals do not fix each object's share.",
		tags: ["elastic collision individual kinetic energy unchanged", "equal mass exchange velocities"],
		sources: ["elastic", "momentumLecture"]
	},
	{
		key: "impulse",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9017",
		title: "Does peak force alone determine a change in momentum?",
		slug: "does-peak-force-alone-determine-a-change-in-momentum",
		bottomLine: "No. Momentum change depends on net external force integrated over time, not just its greatest value. Two hypothetical triangular force pulses with the same 6 N peak but durations 0.5 s and 1 s have impulses 1.5 N s and 3 N s respectively. Their differing durations produce differing momentum changes despite equal peaks.",
		stableCore: ["The area under a force-time curve supplies the impulse component in the chosen direction. For the constructed triangle, the average force is half its peak, so the area is one-half peak times duration. A differently shaped pulse can have another average even with the same peak and duration. Direction changes can also cause signed contributions to cancel, making a magnitude-only comparison insufficient.", "The interval-average net force multiplied by elapsed time equals the corresponding momentum change under the stated balance. It should not be confused with the instantaneous force at one time. Internal forces redistribute momentum between system parts, while the complete system's momentum change follows its external impulse. The selected object or system therefore matters as much as the force's time history."],
		editorSummary: "Ask for a force-time description and a clear system boundary before inferring a momentum change from a headline maximum. The examples are independently constructed abstract pulses, not measurements of an impact, safe-exposure thresholds or protective-equipment tests. They do not determine the resulting energy change, deformation or acceleration of every part. A finite force maximum cannot replace missing duration, direction, mass and initial-state information merely because it looks like a precise number.",
		qualification: "Time-integrated net external force for a specified system and direction; hypothetical pulses are not impact or safety measurements.",
		tags: ["peak force impulse momentum duration", "area force time graph average force"],
		sources: ["impulse", "momentum", "newton"]
	},
	{
		key: "centerOfMass",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9018",
		title: "Must an isolated system's center of mass remain stationary?",
		slug: "must-an-isolated-systems-center-of-mass-remain-stationary",
		bottomLine: "No. In a closed constant-mass Newtonian system with zero net external force, the center of mass keeps a constant velocity. It stays stationary only if that velocity was initially zero in the selected inertial frame. A hypothetical total momentum of 8 kg m/s and total mass 4 kg give center-of-mass velocity 2 m/s.",
		stableCore: ["The center of mass is a mass-weighted position, not necessarily the position of a material point or the geometric middle. Differentiating that position for a constant set of masses connects its velocity to total momentum divided by total mass. Internal rearrangements can move the parts relative to one another without changing the system's total momentum or its uniform center-of-mass motion.", "The stationary conclusion is frame-dependent. A system at rest in one inertial frame can have a nonzero constant velocity in another. Neither description implies a hidden external force. If material crosses the selected boundary, treating that incomplete collection as the same closed system can fail; the departing or arriving momentum and mass require explicit accounting. Zero internal motion is not a condition of the center-of-mass theorem."],
		editorSummary: "Define the included masses, reference frame and initial total momentum. Moving one part inside the boundary is not by itself evidence of a change in total center-of-mass velocity. The example is an independently constructed system balance, not a propulsion procedure or apparatus observation. Relativistic energy-momentum descriptions and changing-mass open systems have additional requirements. This bounded statement prevents isolation from being mistaken for universal rest rather than absence of a net external force.",
		qualification: "Closed constant-mass Newtonian system in a specified inertial frame; constant center-of-mass velocity need not be zero.",
		tags: ["isolated system center of mass stationary", "internal motion total momentum constant velocity"],
		sources: ["rotationLecture", "momentum"]
	},
	{
		key: "torque",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9019",
		title: "Does force magnitude alone determine torque about an axis?",
		slug: "does-force-magnitude-alone-determine-torque-about-an-axis",
		bottomLine: "No. Torque depends on a force's line of action relative to the specified axis as well as its magnitude. A hypothetical 3 N force with a 2 m perpendicular lever arm gives 6 N m about that axis. If its line of action passes through the axis, its torque about that axis is zero despite the same force magnitude.",
		stableCore: ["The force moment comes from the position-force cross product, or the appropriate signed component about an axis. The relevant lever arm is the perpendicular distance to the line of action, not every distance from the axis to the application point. A radial force and a tangential force at the same point can therefore have different torques even when their magnitudes are identical.", "Individual torque contributions must be added consistently about the same axis. A nonzero torque from one force does not prove a nonzero net torque if other contributions oppose it. Translational balance and rotational balance are also separate constraints: zero net force alone does not establish zero net torque. Changing the reference axis changes the description, so torque cannot be assigned without identifying it."],
		editorSummary: "Ask where the force acts, in which direction and about which axis. A force number alone lacks the geometry needed to answer the rotational question. The invented values do not certify a tool setting, structural load, fastening procedure or machine performance. Distributed forces and three-dimensional motion can require a more complete calculation. This review explains a moment of force, not a rule that every nonzero individual moment necessarily causes observed rotation in a constrained body.",
		qualification: "Identified axis, force line of action and compatible geometry; individual and resultant torques must remain distinct.",
		tags: ["force torque lever arm axis", "radial force zero torque perpendicular distance"],
		sources: ["torque", "rotationLecture"]
	},
	{
		key: "torqueUnits",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9020",
		title: "Are torque and energy the same quantity because both involve newton meters?",
		slug: "are-torque-and-energy-the-same-quantity-because-both-involve-newton-meters",
		bottomLine: "No. Torque and energy share dimensions but answer different physical questions. Torque describes a force moment; energy or work is a scalar account of transfer or state. A constant compatible torque of 3 N m through 2 radians does 6 J of work. The torque alone is not already 3 J of delivered energy regardless of motion.",
		stableCore: ["A dimensional match is necessary for many valid equations, but it does not identify quantities as identical. Torque is an axial vector, or a signed axis component in a reduced description, while work involves the compatible angular displacement. NIST explicitly distinguishes torque notation from the joule used for energy. Naming the quantity avoids misleading numerical comparisons between a moment and an accumulated energy transfer.", "The fixed-axis work relation adds torque contributions over angular displacement. If torque varies, a single selected torque multiplied by the whole angle need not give the correct work. If the relevant rotation is zero, that torque's rotational work contribution is zero, even with nonzero torque. Other energy transfers, deformation and constraints may still be present in the complete system."],
		editorSummary: "Check whether a number is a moment, an angle, a work contribution or an energy state. Radians describe angle in the compatible relation; their dimensionless SI treatment does not eliminate the physical need for rotation. The abstract 3 N m example is independently constructed, not a tool specification, operating instruction or performance measurement. Dimensional analysis can reveal an inconsistency without proving that a model includes the right forces, geometry and system boundary.",
		qualification: "Torque and scalar energy remain distinct despite shared dimensions; angular work needs compatible torque and rotation.",
		tags: ["torque energy newton meter joule same dimensions", "angular work radians"],
		sources: ["si", "rotation", "rotationLecture"]
	},
	{
		key: "inertia",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9021",
		title: "Is rotational inertia determined only by total mass?",
		slug: "is-rotational-inertia-determined-only-by-total-mass",
		bottomLine: "No. Rotational inertia about an axis depends on where mass lies relative to that axis. A hypothetical 2 kg point mass at perpendicular distance 1 m has inertia 2 kg m squared; at 2 m it has 8 kg m squared. Total mass is unchanged, but the squared-distance contribution is four times larger.",
		stableCore: ["For a collection of point masses, each mass contributes its mass times squared perpendicular distance to the axis. An extended distribution uses the corresponding continuous sum. The axis must be specified: one body can have different inertias about different axes without changing material. A total-mass label cannot supply this geometric information, just as a force magnitude alone cannot supply a torque's lever arm.", "In a suitable fixed-axis rigid-body model, net torque relates to angular acceleration through the applicable rotational inertia. Equal torque and unequal inertia can produce unequal angular accelerations. The simple scalar relation has conditions and does not replace a full inertia tensor for arbitrary three-dimensional rotation. A moving distribution can also require attention to its changing inertia and internal motions."],
		editorSummary: "Look for both the mass distribution and the chosen axis before comparing resistance to rotational acceleration. The constructed point-mass example is not a measured body's shape, a component specification or instructions for modifying a rotor. It illustrates why moving the same abstract mass outward changes the rotational quantity. More complex bodies, nonrigid motion and changing axes need a fuller description; a familiar mass unit or an identical scale reading cannot settle those questions.",
		qualification: "Rotational inertia relative to a specified axis and mass distribution; the simple scalar dynamics model has fixed-axis limits.",
		tags: ["rotational inertia total mass distribution axis", "moment of inertia distance squared"],
		sources: ["inertia", "rotationLecture"]
	},
	{
		key: "angularSpeed",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9022",
		title: "Does conserved angular momentum require constant angular speed?",
		slug: "does-conserved-angular-momentum-require-constant-angular-speed",
		bottomLine: "No in a compatible axis model when rotational inertia can change. Constant angular momentum constrains inertia times angular speed, not angular speed alone. A hypothetical angular momentum 8 kg m squared per second with inertia changing from 4 to 2 kg m squared gives angular speed changing from 2 to 4 radians per second. This does not create free energy.",
		stableCore: ["The simple relation assumes the relevant angular momentum is described by the stated inertia and axis component, with no additional unaccounted internal angular momentum. Zero net external torque conserves that component for the complete system. Redistributing mass changes the inertia, so a different angular speed can preserve the same product. Arbitrary three-dimensional rotation needs a more complete vector and tensor account.", "For the two constructed axis states, rotational kinetic energy is 8 J initially and 16 J finally. The extra 8 J must come from work or another energy change, even though angular momentum is conserved. Internal interactions can supply that work while adding no net external torque. Conserving one quantity therefore does not prove another quantity stayed constant or that no energy transfer occurred."],
		editorSummary: "Specify the axis, included degrees of freedom and energy source before interpreting a faster rotation. A claim of unchanged angular momentum is not a claim of unchanged inertia or kinetic energy. The independent numerical example is not a rotating-person experiment, machine-modification procedure or performance guarantee. Holding inertia fixed would yield a different conclusion about speed; silently switching that condition midway changes the question rather than revealing a failure of conservation.",
		qualification: "Compatible angular-momentum axis model with specified inertia change and zero net external torque; energy accounting remains necessary.",
		tags: ["angular momentum conserved speed inertia changes", "rotation internal work energy"],
		sources: ["angular", "rotationLecture", "rotation"]
	},
	{
		key: "rollingEnergy",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9023",
		title: "Does a rolling rigid body's kinetic energy include only translation?",
		slug: "does-a-rolling-rigid-bodys-kinetic-energy-include-only-translation",
		bottomLine: "No. A rigid rolling body generally has center-of-mass translational energy and rotational energy about its center of mass. A hypothetical 2 kg body moving at 2 m/s with central inertia 1 kg m squared and angular speed 2 radians per second has 4 J translational plus 2 J rotational energy, totaling 6 J. Counting only 4 J misses the rotation.",
		stableCore: ["The decomposition separates the motion of the center of mass from motion around it. The translational term uses total mass and center-of-mass speed, while the rotational term uses the applicable central inertia and angular speed. Using an inertia about another point without changing the rest of the account can double-count or omit energy. The geometry and reference frame must remain consistent.", "The hypothetical values are compatible with nonslip rolling at radius 1 m: speed equals radius times angular speed. That relation is an extra kinematic condition, not the definition of all rolling. A slipping body can have a different relation between its translation and rotation. Deformation and internal motion can add still more energy terms beyond the rigid-body split, requiring a broader model."],
		editorSummary: "Check whether a quoted kinetic energy includes only center-of-mass motion or the complete rigid-body motion in the stated frame. Equal translational speeds do not automatically imply equal total energies for different inertias or angular speeds. The independently constructed numbers are not a measured rolling object, traction assessment or mechanical design. This review keeps the energy decomposition distinct from the separate question of how contact forces establish or maintain nonslip motion.",
		qualification: "Rigid-body translation plus rotation about the center of mass; nonslip speed relations are stated separately, not presumed universal.",
		tags: ["rolling kinetic energy translation rotation", "rolling without slipping center mass inertia"],
		sources: ["rotation", "rotationLecture"]
	},
	{
		key: "pressure",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9024",
		title: "Is pressure the same quantity as total force?",
		slug: "is-pressure-the-same-quantity-as-total-force",
		bottomLine: "No. Pressure describes normal force per area in the stated contact or fluid description, whereas total force is measured in newtons. A hypothetical uniform 9 N normal force across 3 square meters gives 3 pascals. Equal forces spread over different areas can have different average pressures; equal pressures over different areas can produce different total forces.",
		stableCore: ["The pascal is a newton per square meter, so converting pressure to a force requires the relevant area and geometry. A label naming only pressure cannot determine the total resultant on an unspecified surface. A force can also include tangential components that are not represented by an ordinary scalar fluid pressure. The distinction is between physical quantities, not competing units for one quantity.", "When pressure varies over a surface, individual normal contributions must be summed with their directions. Multiplying one selected local value by the entire area can give a wrong resultant. An average pressure can reproduce the scalar total on a compatible flat surface, but it does not reveal the full distribution or every deformation. Curved surfaces require attention to differing normal directions as well."],
		editorSummary: "Identify whether the report concerns a local value, an area average or a resultant force. The independently chosen example assumes uniform pressure on a flat compatible area and is not a device rating, injury estimate or structural certification. Real pressure fields, stress components and material response need additional information. Knowing the units is a useful consistency check, not proof that a force estimate applies to every shape or that a surface can withstand it.",
		qualification: "Specified normal force, area and pressure distribution; scalar pressure alone does not determine every surface-force resultant.",
		tags: ["pressure total force area pascal", "newton per square meter pressure"],
		sources: ["pressure", "si"]
	},
	{
		key: "hydrostatic",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9025",
		title: "Does more total fluid volume always mean greater pressure at the same depth?",
		slug: "does-more-total-fluid-volume-always-mean-greater-pressure-at-the-same-depth",
		bottomLine: "No. For a static fluid with the same density, gravitational acceleration and surface pressure, the pressure at a given depth does not depend on the container's total fluid volume. In a hypothetical constant-density fluid of 500 kg per cubic meter with gravity 8 m/s squared, 0.3 m depth adds 1,200 Pa to the surface pressure.",
		stableCore: ["Hydrostatic pressure increases because the pressure gradient balances gravity acting on the fluid. In the simple constant-density description, the increment is density times gravity times depth. A wider container can hold more mass while spreading its bottom force across more area; total mass and local pressure need not scale together. Curved walls can also contribute forces without changing the static depth relation under its conditions.", "The boundary pressure is part of the absolute pressure, not an optional term. Different surface pressures can change the result even at the same depth. Density gradients, different gravitational fields, acceleration and moving flow require additional accounting. Using depth alone without those conditions can therefore turn a valid simple relation into an invalid universal claim about every fluid."],
		editorSummary: "Specify what is held unchanged before comparing container sizes. The constructed density and gravity are illustrative choices, not water-property measurements, an atmospheric reading, a dam-load estimate or diving guidance. Pressure at one location is also not the whole force on a wall; the pressure distribution and surface geometry matter. This review addresses the volume misconception while retaining the difference between an added hydrostatic pressure and the total absolute pressure.",
		qualification: "Static constant-density fluid with specified gravity and boundary pressure; moving or stratified fluids need a fuller pressure account.",
		tags: ["fluid pressure volume same depth container", "hydrostatic density gravity surface pressure"],
		sources: ["hydrostatic", "pressure"]
	},
	{
		key: "hydraulic",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9026",
		title: "Does ideal hydraulic force multiplication create extra energy?",
		slug: "does-ideal-hydraulic-force-multiplication-create-extra-energy",
		bottomLine: "No. An ideal hydraulic model trades force against displacement rather than creating work. With an abstract output area five times the input area, a 20 N input can correspond to 100 N output, but a 0.5 m input displacement corresponds to 0.1 m output displacement. Both compatible force-displacement products are 10 J in the lossless illustration.",
		stableCore: ["Pascal's principle concerns pressure increments transmitted through an enclosed fluid under the stated static conditions. Different areas turn the same compatible pressure increment into different forces. For an incompressible volume transfer, a larger output area travels a proportionally smaller distance. Treating the larger force as if it accompanied the original distance violates the volume constraint and invents additional output work.", "The hypothetical account assumes compatible geometry, pressure differences and height conditions, negligible losses and no unaccounted energy source. Compression, leakage, friction or changing gravitational energy can alter a real balance. An external source can supply additional energy, but that is not spontaneous creation by an area ratio. The force-gain statement alone therefore neither determines efficiency nor proves a complete working device."],
		editorSummary: "Compare the full force-and-displacement pairs, not force magnitudes alone. The independently constructed values illustrate a model and are not instructions for building, loading, lifting or operating a hydraulic system. They are not a pressure rating or proof of safe performance. This question is narrower than perpetual motion: it explains the missing displacement constraint in a particular force-multiplication claim while preserving the complete energy account and the distinction between ideal and real transfers.",
		qualification: "Compatible ideal enclosed incompressible-fluid model and lossless work balance; area ratios alone do not certify performance or safety.",
		tags: ["hydraulic force multiplication energy displacement", "Pascal principle work conservation"],
		sources: ["pascal", "work", "energy"]
	},
	{
		key: "buoyancy",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9027",
		title: "Is buoyant force determined by an object's mass alone?",
		slug: "is-buoyant-force-determined-by-an-objects-mass-alone",
		bottomLine: "No. Ordinary hydrostatic buoyancy depends on the weight of displaced fluid, not just the object's mass. In a hypothetical uniform fluid of density 500 kg per cubic meter with gravity 8 m/s squared, displacing 0.004 cubic meters gives a 16 N buoyant force. Changing the object's mass alone while preserving that displacement does not change this buoyancy calculation.",
		stableCore: ["Pressure varies with depth in the static gravitational fluid, producing a net upward resultant over the wetted surface under the stated conditions. That resultant equals the gravitational weight of the fluid displaced. Object mass instead supplies its own gravitational force in the balance. Keeping these forces separate explains why the same displaced volume need not imply the same vertical acceleration for two different object masses.", "If an object moves to a different submerged volume, the displaced fluid changes and so can the buoyant force. A density gradient needs the weight of the actual displaced fluid rather than one universal density multiplier. Surface tension, external supports, contact with boundaries and unsteady flow can add forces or invalidate the simple ordinary hydrostatic account. Neither a material name nor mass alone supplies those missing conditions."],
		editorSummary: "Identify the displaced region, fluid state and gravitational field before substituting numbers. The independent illustration is not a measured liquid property, a flotation capacity, a load recommendation or personal safety guidance. It also does not decide whether the hypothetical object floats: that requires its weight and other forces. Buoyant force, net vertical force and equilibrium are separate questions; confusing them can make a correct displaced-fluid calculation seem inconsistent with the object's observed motion.",
		qualification: "Ordinary static-fluid buoyancy with specified displaced volume and density; other forces and pressure-field limits remain explicit.",
		tags: ["buoyant force object mass displaced fluid", "Archimedes principle pressure weight"],
		sources: ["buoyancy", "hydrostatic"]
	},
	{
		key: "floating",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9028",
		title: "Must buoyant force exceed weight for an object to float at rest?",
		slug: "must-buoyant-force-exceed-weight-for-an-object-to-float-at-rest",
		bottomLine: "No for ordinary freely floating static equilibrium when buoyancy and weight are the only vertical forces. They balance rather than leave an upward resultant. A hypothetical 2 kg object where gravity is 8 m/s squared needs 16 N buoyancy in this balance. In a uniform 500 kg per cubic meter fluid, that corresponds to 0.004 cubic meters displaced.",
		stableCore: ["A buoyant force greater than weight would give upward acceleration in the stated two-force model, not a body that remains at rest. During a transition, the submerged volume can change until a compatible balance is reached. At equilibrium, the displaced-fluid weight equals object weight. The relation does not require the whole object to be underwater or its material density to match the fluid's density.", "The required displaced volume must fit the object's available geometry for this type of equilibrium to exist. Total volume, average density and other vertical forces therefore matter when deciding whether a particular object can realize the balance. Surface tension, external support, constraints or acceleration can change the simple comparison. A statement about buoyancy alone cannot establish a static floating state without the rest of the force account."],
		editorSummary: "Distinguish floating at rest from rising, sinking or being supported by another interaction. The independently chosen numerical balance is not a flotation test, a capacity label, load advice or a promise of personal safety. The force equality answers a bounded equilibrium question. It complements the displaced-fluid definition rather than recounting it as a second identical claim: this question explains the mistaken requirement of a persistent upward resultant in an object that is not accelerating.",
		qualification: "Freely floating static equilibrium with buoyancy and weight as the only vertical forces; surface tension and external support are excluded.",
		tags: ["floating at rest buoyancy weight equal", "static floating equilibrium upward force"],
		sources: ["buoyancy", "first", "second"]
	},
	{
		key: "bernoulli",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9029",
		title: "Does faster fluid flow always imply lower pressure?",
		slug: "does-faster-fluid-flow-always-imply-lower-pressure",
		bottomLine: "No as a universal rule. The familiar speed-pressure tradeoff follows a particular ideal energy balance: steady, incompressible, inviscid flow along a compatible streamline without added work. At equal height in a hypothetical fluid of density 2 kg per cubic meter, changing speed from 2 to 4 m/s accompanies a 12 Pa pressure decrease under those assumptions.",
		stableCore: ["The Bernoulli sum includes pressure, kinetic energy per volume and gravitational potential energy per volume. At unchanged height and within its assumptions, increasing the speed term requires a decreasing pressure term along the streamline. A height change can alter the comparison, however, and different streamlines need not share the same constant unless additional conditions justify that statement. Comparing arbitrary points discards essential information.", "Viscous losses, compressibility, unsteady flow and energy supplied to the fluid need a more complete balance. A pump or another source can change pressure and speed without following the simple same-height tradeoff. The speed itself is not an independent causal explanation of every pressure field; both are part of a flow solution constrained by forces, geometry and boundary conditions."],
		editorSummary: "Check the streamline, height and model conditions before accepting the faster-flow/lower-pressure slogan associated with Bernoulli. The constructed numbers are not a measured fluid property, a flow-device design or an operating recommendation. The ideal relation remains useful when applicable, but its usefulness does not make it universal. This review does not infer lift, suction, structural loading or safety from an isolated speed label; those questions need the relevant full field and force account.",
		qualification: "Scoped steady incompressible inviscid same-streamline energy balance; height, losses and external energy additions cannot be ignored.",
		tags: ["faster flow lower pressure Bernoulli always", "streamline height viscosity pump"],
		sources: ["bernoulli", "fluidLecture"]
	},
	{
		key: "continuity",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9030",
		title: "Does constant fluid flow rate mean the speed is the same everywhere?",
		slug: "does-constant-fluid-flow-rate-mean-the-speed-is-the-same-everywhere",
		bottomLine: "No. In steady incompressible flow without intervening additions or removals, the same volume rate can cross areas with different average speeds. A hypothetical rate 0.06 cubic meters per second gives average speed 3 m/s through 0.02 square meters and 2 m/s through 0.03 square meters. Equal volume rates do not mean equal speeds.",
		stableCore: ["Volume flow rate equals the integral of normal velocity across a section. A compatible section-average normal speed multiplied by area reproduces that rate. Changing area can therefore change the average while the conserved rate stays the same. A pointwise velocity can differ from that section average, so the elementary multiplication does not establish a uniform velocity profile everywhere within the section.", "The same volume-rate conclusion needs steady flow, incompressibility and a complete unbranched balance between the chosen sections. Mass conservation is more general: when density changes, equal mass rates need not imply equal volume rates. A branch, leak or accumulation also changes the comparison. Quoting conservation without naming which quantity and boundary are involved can make two compatible measurements appear inconsistent."],
		editorSummary: "Ask whether a number reports velocity, volume per time or mass per time, then identify the section and averaging method. The independently chosen values are abstract and do not describe a tested pipe, biological circulation, nozzle procedure or device capacity. Continuity does not by itself give the pressure difference or energy losses needed to sustain a flow. It is one constraint in the model, not a complete prediction of every local speed or operating condition.",
		qualification: "Steady incompressible section averages with no intermediate source, sink or accumulation; density changes require a mass-rate account.",
		tags: ["constant flow rate different speed area continuity", "volume flow average velocity incompressible"],
		sources: ["flow", "fluidLecture"]
	},
	{
		key: "viscosity",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9031",
		title: "Are fluid density and viscosity the same property?",
		slug: "are-fluid-density-and-viscosity-the-same-property",
		bottomLine: "No. Density is mass per volume, while dynamic viscosity describes a fluid's shear response to a velocity gradient in the appropriate material model. Their units differ: kilograms per cubic meter versus pascal seconds. Knowing that one fluid is denser does not by itself establish that it has greater dynamic viscosity or flows more slowly in every situation.",
		stableCore: ["For a simple Newtonian fluid, shear stress is proportional to the relevant velocity gradient with dynamic viscosity as the proportionality coefficient. That relation describes resistance to relative shearing motion, not a quantity of mass packed into a volume. Pressure gradients, boundaries and temperature affect the physical situation as well; a density comparison cannot replace the missing constitutive and flow information.", "Kinematic viscosity is dynamic viscosity divided by density, which connects the quantities without identifying them as the same property. A non-Newtonian fluid can require a response that depends on rate or history rather than one constant dynamic-viscosity number. Compressibility and density variation introduce further distinctions. Everyday uses of thick or heavy do not specify which measurable quantity or model is intended."],
		editorSummary: "Check the named property, units and material conditions before ranking fluids from an informal description. These are original conceptual distinctions, not a measured material table, a product comparison or an instruction for preparing or operating a fluid system. No universal correlation between density and viscosity is claimed. The earlier old-window-glass question concerns a different material-state misconception and does not answer this distinction between fluid mass density, shear response and the resulting flow under specified conditions.",
		qualification: "Distinguish mass density, dynamic viscosity and kinematic viscosity; constitutive response and flow conditions are not supplied by density alone.",
		tags: ["density viscosity same property fluid", "dynamic kinematic viscosity shear response"],
		sources: ["viscosity", "density", "si"]
	},
	{
		key: "springFrequency",
		id: "a82e7a41-60d8-4fe3-b3b5-921ca00d9032",
		title: "Does a larger amplitude always make a spring oscillator slower?",
		slug: "does-a-larger-amplitude-always-make-a-spring-oscillator-slower",
		bottomLine: "No. An ideal undamped linear spring-mass oscillator with fixed mass and stiffness has an amplitude-independent natural frequency. For hypothetical stiffness 100 N/m and mass 4 kg, the angular frequency is 5 radians per second and the period is two pi divided by five seconds. Changing amplitude within that same ideal model does not change the period.",
		stableCore: ["The restoring force is proportional to displacement from equilibrium with a fixed coefficient, and the model includes neither damping nor driving. Its sinusoidal solution has angular frequency equal to the square root of stiffness divided by mass. A larger amplitude changes the maximum displacement, speed and stored energy rather than this frequency. Angular frequency in radians per second is not the same numerical quantity as cycles per second.", "Amplitude independence follows the linear model's conditions, not a theorem about all periodic motion. Nonlinear restoring forces, changing effective stiffness or mass, damping and forcing can require a different analysis. In a real system, increasing amplitude may leave the range where the linear approximation works. The ideal result neither guarantees an unlimited range nor establishes a measured tolerance for any actual spring."],
		editorSummary: "Ask which mass, stiffness and response law are held fixed before relating amplitude to timing. The constructed values independently check the period formula and are not apparatus specifications, experiment directions or vibration-safety limits. Other oscillators, including large-angle pendulum motion, need their own conditions. This review adds the mechanical natural-frequency proposition; the existing alternating-current question about charge motion does not supply or replace this spring-mass model and its limitations.",
		qualification: "Ideal constant-mass, constant-stiffness, undamped and unforced linear spring oscillator; nonlinear and real operating limits are not implied.",
		tags: ["spring amplitude frequency period linear oscillator", "harmonic oscillator stiffness mass angular frequency"],
		sources: ["spring", "springLecture"]
	}
];

export const readerMechanicsSlugs: Record<string, string> = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerMechanicsClaims: SeedClaim[] = reviews.map(review => ({
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
	openQuestions: [`Which reference frame, system boundary, geometry and material state make this model applicable? ${review.qualification}`],
	whatWouldChangeMinds: [`Reproducible evidence against the relation within its stated assumptions, or evidence those assumptions do not apply, requires reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A scoped ideal relation is not a measured performance result or a safety certification."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "generalizability", detail: review.qualification }],
	searchDatabases: ["Original OpenStax mechanics and fluid definitions", "Original Caltech classical mechanics and ideal-fluid discussions", "Original NIST coherent unit definitions", "Consensus.app force-and-motion discovery; original paper unavailable and not used as evidence"],
	searchCutoffAt: mechanicsCheckedAt,
	inclusionRules: ["State physical quantities, reference frames, system boundaries and model conditions.", "Use original source checks and independently constructed hypothetical numerical examples."],
	exclusionRules: ["No copied source prose, exercises, images, material tables or apparatus instructions.", "No biological procedures, impact or injury estimates, engineering designs, operating limits, invented reader demand or expert votes."],
	appraisalTools: ["Structured definition, dimensional, independent arithmetic and model-applicability check; no study risk-of-bias score", "Original citation-context check, not exhaustive correction or integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "OpenStax sections share textbook authorship and institutional provenance; Caltech chapters share authorship. NIST supplies unit definitions, not independent tests of all models. These are not independent experiments or an expert poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing. No actual reader demand or apparatus dataset was analyzed.",
	coiSummary: "Institutional teaching and unit references are not equipment, product or safety endorsements. Funding and conflicts were not exhaustively audited. No formal consensus vote or independent expert approval is claimed.",
	lastRetractionCheckAt: mechanicsCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "Independently constructed arithmetic, not an observed effect size or measured performance.", certainty: "moderate", limitations: [review.qualification, "Shared teaching-source provenance; no apparatus testing or expert survey"] }],
	institutionalAnchors: [{ name: readerMechanicsSources[review.sources[0]!].publisher, role: "Definition or model reference, not formal consensus or expert approval" }],
	changeLog: [{ date: mechanicsCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: review.id, date: mechanicsCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Corrections and notices for cited original references"], guidelineMonitors: ["Original definitions and model-condition revisions"], triggerRules: ["Reassess if an original correction or applicability change alters the conclusion."] },
	sources: review.sources.map((key, index) => ({ ...readerMechanicsSources[key], order: index + 1, isAnchor: index === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: mechanicsCheckedAt, statusSources: [readerMechanicsSources[key].url!] }))
}));

export const readerMechanicsGaps = reviews.map(review => ({ slug: review.slug, gap: `Adds the distinct proposition "${review.title}" with independently constructed examples, definitions and model limits; baseline vacuum-fall, perpetual-motion and glass reviews and earlier expansion orbital-weightlessness and magnetic-work reviews do not answer this question.`, relatedExistingSlugs: ["do-heavier-objects-fall-faster-than-lighter-objects-in-a-vacuum", "can-a-perpetual-motion-machine-produce-net-energy-indefinitely", "is-old-window-glass-slowly-flowing-downward-at-room-temperature"] }));
