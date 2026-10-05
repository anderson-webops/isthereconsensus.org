import type { SeedClaim } from "./claims.js";

export const electricityCheckedAt = "2026-10-05T12:25:57.000Z";

function textbook(section: string, title: string, note: string): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title: `College Physics 2e: ${title}`, publisher: "OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs", year: 2022, url: `https://openstax.org/books/college-physics-2e/pages/${section}`, stance: "supports", order: 1, note };
}

export const readerElectricitySources = {
	current: textbook("20-1-current", "Current", "Original charge-flow, conventional-current and drift-versus-signal definitions checked. Source exercises, diagrams, typical speed numbers, biological examples and installation ratings are not reproduced. Propagation is not instantaneous or universally equal to the vacuum light speed."),
	potential: textbook("19-1-electric-potential-energy-potential-difference", "Electric Potential Energy: Potential Difference", "Original potential difference and energy-per-charge relation checked. Numerical battery and particle examples, biological-damage estimates and imagery are not adopted. A battery's varying terminal voltage requires an integral, not an unqualified nominal-voltage multiplication."),
	ohmic: textbook("20-2-ohms-law-resistance-and-simple-circuits", "Ohm's Law: Resistance and Simple Circuits", "Original empirical linear-response and non-ohmic qualifications checked. Defining a voltage/current ratio does not prove constant resistance. The review retains operating-condition limits instead of endorsing experiments or component operating ranges."),
	power: textbook("20-4-electric-power-and-energy", "Electric Power and Energy", "Original power/energy and resistive-dissipation relations checked. Instantaneous voltage-current products are distinguished from AC averages. Appliance comparisons, prices, efficiency numbers and deliberate overvoltage examples are not imported."),
	alternating: textbook("20-5-alternating-current-versus-direct-current", "Alternating Current versus Direct Current", "Original alternating-direction, sinusoidal RMS and resistive-average relations checked. RMS is not the signed arithmetic mean. Household voltage, breaker and line-transmission examples are not adopted as current safety or equipment guidance."),
	series: textbook("21-1-resistors-in-series-and-parallel", "Resistors in Series and Parallel", "Original equivalent-resistance, equal-series-current and equal-parallel-voltage relations checked. These require the stated ideal connection topology. Source wiring, body-current and protective-footwear examples are not reproduced or treated as safety advice."),
	emf: textbook("21-2-electromotive-force-terminal-voltage", "Electromotive Force: Terminal Voltage", "Original internal-resistance and terminal-voltage distinction checked. A fixed equivalent source is an illustrative approximation, not a complete battery-chemistry or aging model. Source testing and battery-connection instructions are not adopted."),
	kirchhoff: textbook("21-3-kirchhoffs-rules", "Kirchhoff's Rules", "Original charge-conservation junction and ordinary lumped-circuit loop rules checked. Charge accumulation and changing linked magnetic flux require explicit accounting; the elementary zero-loop-voltage shortcut is not universal for every electromagnetic geometry."),
	capacitance: textbook("19-5-capacitors-and-dielectrics", "Capacitors and Dielectrics", "Original capacitance and separated-charge definitions checked. Constant capacitance is a model assumption. Source construction exercises, dielectric breakdown numbers, biological examples and equipment ratings are not copied or recommended."),
	capacitorEnergy: textbook("19-7-energy-stored-in-capacitors", "Energy Stored in Capacitors", "Original linear-capacitance stored-energy relation checked. Medical-device examples are not adopted. Final voltage is not the voltage applying to every charge increment during charging, and ideal stored energy is not a discharge-safety assessment."),
	charging: textbook("21-6-dc-circuits-containing-resistors-and-capacitors", "DC Circuits Containing Resistors and Capacitors", "Original ideal RC transient and asymptotic charging limit checked. A limiting steady state is not reached at an exact finite time in the ideal exponential model. Real leakage, dielectric response and measurement disturbance are not ruled out."),
	magneticForce: textbook("22-5-force-on-a-moving-charge-in-a-magnetic-field-examples-and-applications", "Force on a Moving Charge in a Magnetic Field: Examples and Applications", "Original perpendicular magnetic Lorentz force and point-charge work distinction checked. This statement is frame-specific and does not cover all forces on extended magnetic materials. Apparatus, particle-beam and medical examples are not reproduced."),
	flux: textbook("23-1-induced-emf-and-magnetic-flux", "Induced Emf and Magnetic Flux", "Original oriented-flux and induction conditions checked. Stationary geometry and a constant flux are distinguished from mere presence of a magnetic field. Source experiments and device examples are not implemented."),
	faraday: textbook("23-2-faradays-law-of-induction-lenzs-law", "Faraday's Law of Induction: Lenz's Law", "Original flux-change and opposing-response relations checked. A closed loop and the relevant total flux must be specified. Health-monitoring examples, apparatus and generator-building directions are not adopted."),
	transformers: textbook("23-7-transformers", "Transformers", "Original ideal turns/voltage/current and power-balance relations checked. Reported general efficiency percentages and high-voltage safety assurances are not adopted. Practical losses, load dependence and waveform conditions remain limitations, not product certification."),
	inductance: textbook("23-9-inductance", "Inductance", "Original self-inductance, current-change and stored magnetic energy relations checked. Constant inductance is assumed; winding resistance and core losses are separate. Source construction suggestions and operating procedures are not reproduced."),
	acPower: textbook("23-12-rlc-series-ac-circuits", "RLC Series AC Circuits", "Original sinusoidal phase-angle and average-power distinctions checked. Cosine phase factor is not silently applied to distorted waveforms. Ideal reactive storage and return are distinguished from real dissipative losses."),
	electrostatic: textbook("18-7-conductors-and-electric-fields-in-static-equilibrium", "Conductors and Electric Fields in Static Equilibrium", "Original zero-interior-field theorem checked specifically for electrostatic equilibrium. It is not extended to ordinary resistive current flow. Lightning, vehicle and fallen-wire safety passages are not adopted as instructions or protection guarantees."),
	fieldEnergy: { kind: "technical_reference", title: "The Feynman Lectures on Physics, Volume II, Chapter 27: Field Energy and Field Momentum", publisher: "Caltech; Richard Feynman, Robert Leighton and Matthew Sands", url: "https://www.feynmanlectures.caltech.edu/II_27.html", stance: "supports", order: 1, note: "Original electromagnetic energy-balance and resistive-wire discussion checked. No figure, source prose or apparatus is reproduced. A special field geometry does not establish one universal energy-flow path or permit instantaneous transmission; historical intuition and magnet-spin shortcuts are not adopted." },
	si: { kind: "technical_reference", title: "SP 330: The International System of Units, Section 2", publisher: "NIST", url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-2", stance: "supports", order: 1, note: "Original coherent units for current, charge, potential difference, resistance, capacitance, energy and power checked. Defined unit relations are not measured device performance or expert-agreement percentages." },
	hour: { kind: "technical_reference", title: "SP 330: Non-SI units accepted for use with the SI, Section 4", publisher: "NIST", url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-4", stance: "supports", order: 1, note: "Original hour-to-second conversion checked. Combining this with ampere and watt definitions yields charge and energy units, not a verified battery capacity, runtime or electricity price." },
	measuring: { kind: "technical_reference", title: "Measuring electricity", publisher: "U.S. Energy Information Administration", url: "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php", stance: "supports", order: 1, note: "Original power-versus-time-integrated-energy distinction checked. Source household consumption, tariff examples and product numbers are not imported. A different FAQ URL initially opened household consumption and is not cited." }
} satisfies Record<string, SeedClaim["sources"][number]>;

interface ElectricityReview {
	key: string;
	id: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	tags: string[];
	sources: Array<keyof typeof readerElectricitySources>;
}

const reviews: ElectricityReview[] = [
	{
		key: "quantities",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b001",
		title: "Are amps and volts two names for the same electrical quantity?",
		slug: "are-amps-and-volts-two-names-for-the-same-electrical-quantity",
		bottomLine: "No. Amps measure electric current, the rate of charge transfer; volts measure potential difference, or energy per unit charge in the stated circuit description. Neither alone specifies electrical power. A hypothetical steady 1 A current at a 5 V terminal difference transfers 5 W, not five amps or one volt.",
		stableCore: ["The ampere is a coulomb per second, while the volt can be expressed as a joule per coulomb. Multiplying compatible current and voltage measurements gives joules per second. This unit check explains why the quantities are related without making them interchangeable or turning voltage into a count of moving electrons.", "A potential difference can exist without a sustained current, and equal voltages can accompany different currents through different loads. Conversely, equal currents do not require equal voltage differences. A current direction convention also differs from the average direction of negatively charged carriers in an ordinary metal; the sign convention does not change conservation of charge."],
		editorSummary: "Ask which terminals, which direction and which time interval a number describes. Instantaneous voltage-current products and AC cycle averages are not automatically the same calculation. The example uses an ideal steady description and is not a device rating, wiring instruction or assessment of what is safe to touch. Correct units are a necessary check, not a complete circuit model or proof of measured performance.",
		qualification: "Defined units and compatible terminal/time conventions are the scope, not equipment safety or every distributed field configuration.",
		tags: ["amps volts current voltage difference", "ampere coulomb per second", "electrical quantities"],
		sources: ["si", "current", "potential"]
	},
	{
		key: "conservation",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b002",
		title: "Is electric current used up as it passes through a resistor?",
		slug: "is-electric-current-used-up-as-it-passes-through-a-resistor",
		bottomLine: "No in a steady series path. A resistor converts electrical energy to other forms, but does not consume electric charge. Equal charge-flow rates enter and leave when charge is not accumulating. A hypothetical resistor with 2 A entering also has 2 A leaving; an energy transfer does not make the outgoing current smaller.",
		stableCore: ["Conservation of charge separates a current balance from an energy balance. If an element persistently received more charge per second than it released, its charge would change. That situation can occur during a transient, but it cannot be described as the same unchanging steady state. Branches require counting all entering and leaving paths, rather than comparing only two selected wires.", "The voltage difference across a resistive element and its current describe energy conversion. A hypothetical 3 V difference with 2 A corresponds to 6 W in the compatible steady model, while the charge rate remains 2 C each second. Charge carriers are not fuel parcels destroyed by the resistor; maintaining energy delivery requires an energy source."],
		editorSummary: "An analogy that treats current like a dwindling supply of consumable material confuses what flows with what is transformed. It also predicts the wrong series-current relation. This is a conceptual conservation check, not an assertion that every current is constant everywhere during switching, that conductors have no losses or that a battery contains unlimited energy. Real measurements must distinguish steady operation from stored-charge changes and branching.",
		qualification: "Steady series current with no net charge accumulation; transients and branches need a complete charge balance.",
		tags: ["current used up resistor", "charge conservation series current", "energy not electrons consumed"],
		sources: ["kirchhoff", "series", "fieldEnergy"]
	},
	{
		key: "propagation",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b003",
		title: "Does a signal in a metal wire travel at the electron drift speed?",
		slug: "does-a-signal-in-a-metal-wire-travel-at-the-electron-drift-speed",
		bottomLine: "No. Electron drift describes an average carrier motion, while a signal involves a propagating electromagnetic change. They are different velocities. A circuit can respond before a particular electron has traversed its whole length. Neither this distinction nor the presence of electrons everywhere makes signaling instantaneous or faster than the relevant causal electromagnetic propagation.",
		stableCore: ["The drift relation connects current to carrier density, carrier charge, cross-sectional area and average directed motion. A larger density can support the same current with a smaller drift velocity. It does not supply the propagation speed, which depends on the surrounding electromagnetic structure and material response rather than simply the speed assigned to one carrier.", "Field changes and the adjustment of surface charges help establish a circuit's response. Describing the energy solely as tiny carriers delivering packets after a complete trip misses this field account. It is also misleading to claim all circuits have one fixed signal speed, because geometry, dielectrics, dispersion, resistance and the meaning of signal arrival matter."],
		editorSummary: "Separate average drift from microscopic random motion, wave phase behavior and the arrival of usable information. The references explain the conceptual distinction; no particular cable was timed, no propagation delay was certified and no typical textbook speed is promoted to a universal measured constant. A lumped schematic can hide travel times when they are negligible for its task, but that approximation does not abolish them.",
		qualification: "Ordinary metallic conduction and causal electromagnetic signaling; no universal cable velocity or apparatus timing is claimed.",
		tags: ["electron drift signal speed wire", "electricity propagation delay", "electrons move slowly"],
		sources: ["current", "fieldEnergy"]
	},
	{
		key: "ohmic",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b004",
		title: "Does Ohm's law guarantee that every device has constant resistance?",
		slug: "does-ohms-law-guarantee-that-every-device-has-constant-resistance",
		bottomLine: "No. Ohmic behavior is a linear voltage-current relation under the stated conditions, not a universal property of every device. Writing resistance as a voltage/current ratio at one operating point does not prove that the ratio stays constant. Temperature changes, nonlinear responses and time-dependent storage can invalidate a fixed-resistance approximation.",
		stableCore: ["For a hypothetical fixed 4 ohm resistor, 1 V corresponds to 0.25 A and 2 V to 0.5 A. The constant ratio produces a straight response through the origin. An independently constructed nonlinear relation with current proportional to voltage squared instead gives a fourfold current when voltage doubles; its operating-point ratio changes even though each ratio can still be calculated.", "A model's conditions matter as much as its algebra. A component can behave approximately ohmically over a limited range and cease to do so when its physical state changes. For alternating currents, an impedance can include storage and phase behavior that cannot be represented by an ordinary constant dissipative resistance alone."],
		editorSummary: "Do not infer a universal material law from the ability to divide two numbers. Ask whether the relevant response was measured over the operating range and whether temperature or other conditions were held comparable. These toy relations illustrate linearity without characterizing an actual component. They do not establish safe voltages, recommend an experiment, identify a product or replace a model of semiconductor behavior and thermal feedback.",
		qualification: "Fixed-condition linear response is a scoped approximation, not an automatic consequence of defining a voltage/current ratio.",
		tags: ["Ohms law nonlinear constant resistance", "voltage current proportional", "ohmic non ohmic"],
		sources: ["ohmic", "acPower"]
	},
	{
		key: "topology",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b005",
		title: "Do the same resistors have the same total resistance in series and parallel?",
		slug: "do-the-same-resistors-have-the-same-total-resistance-in-series-and-parallel",
		bottomLine: "No. Connection topology changes equivalent resistance. Two hypothetical fixed 6 ohm resistors give 12 ohms in series and 3 ohms in parallel under ideal connections. The parts are unchanged; the available paths differ. The calculation concerns positive ordinary resistances, not every active element or frequency-dependent network.",
		stableCore: ["In a single series path, current passes through each element and the voltage drops add. In parallel, branches share the terminal voltage while their currents add. These different constraints produce a sum of resistances for series and a sum of conductances for parallel. Combining part labels without specifying their connections leaves the electrical question incomplete.", "The parallel result is smaller than either branch resistance when both positive resistances are finite. That is not negative resistance or newly generated energy. At the same ideal terminal voltage, extra paths allow a larger total current, and the supplying source must deliver the corresponding power. A nonideal source may not maintain that terminal voltage."],
		editorSummary: "Identify the nodes and paths before applying a formula. Apparent placement on a drawing is not enough to establish series or parallel relationships. Real interconnect resistance, changing component values and distributed or reactive effects can alter the model. These independently constructed values explain why topology matters; they are not an instruction to connect batteries, appliances or household wiring and do not certify component compatibility or safe operation.",
		qualification: "Ideal series/parallel topology with fixed positive resistances and the stated terminal conditions.",
		tags: ["series parallel equivalent resistance", "two resistors total resistance", "parallel lower resistance"],
		sources: ["series", "kirchhoff"]
	},
	{
		key: "drops",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b006",
		title: "Do components in series always have the same voltage across them?",
		slug: "do-components-in-series-always-have-the-same-voltage-across-them",
		bottomLine: "No. Steady series elements share current, not necessarily voltage. In a hypothetical ideal 12 V source model with 3 ohm and 9 ohm series resistors, the current is 1 A and the drops are 3 V and 9 V. Equal terminal voltage is instead a property of ideal branches spanning the same two nodes.",
		stableCore: ["The total series resistance in this example is 12 ohms. The same current through each fixed resistor gives voltage drops proportional to resistance. Their sum equals the source difference in this ordinary lumped steady model. Equal current therefore coexists with unequal voltage and unequal dissipated powers; it does not mean equal electrical behavior in every respect.", "Parallel branches share a voltage because they connect across the same pair of ideal nodes, not because all devices intrinsically require equal voltage. Real wires can have voltage drops, and time-varying linked magnetic fields require care when interpreting loop voltages. A statement about topology is not a universal promise that every measured point has the same potential."],
		editorSummary: "This question differs from calculating the total network resistance: it asks which quantity individual elements share. Labels like series and parallel summarize constraints, so swapping the current and voltage constraints produces a wrong result even with correct arithmetic. The example is independently constructed and conceptual. It does not specify a practical voltage divider, measurement procedure, wiring plan or approved supply for any device.",
		qualification: "Ordinary lumped steady circuits and ideal nodes; distributed drops, transients and induced electric fields require fuller analysis.",
		tags: ["same voltage series resistors", "voltage divider current same", "parallel same voltage"],
		sources: ["series", "kirchhoff"]
	},
	{
		key: "terminal",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b007",
		title: "Does a battery's terminal voltage always equal its unloaded voltage?",
		slug: "does-a-batterys-terminal-voltage-always-equal-its-unloaded-voltage",
		bottomLine: "No. A real source can have internal voltage losses, so its terminal voltage depends on load and state. In a hypothetical fixed-source model, a 12 V emf with 1 ohm internal resistance and a 5 ohm load gives 2 A and a 10 V load-terminal difference. This is not a measured battery specification.",
		stableCore: ["For this illustrative discharge model, current is the emf divided by the combined internal and load resistances. The internal drop is 2 V, leaving 10 V across the load. Source power is 24 W, of which 20 W goes to the load and 4 W is dissipated internally. The missing terminal voltage represents an energy-accounting effect, not charge disappearing.", "An emf characterizes energy supplied per unit charge by the source mechanism, while a terminal reading describes the external difference under the measurement conditions. Chemical state, temperature, discharge history and nonlinear dynamics can make a real source more complex than one fixed resistance. A nominal or unloaded number therefore cannot guarantee its voltage at every load."],
		editorSummary: "Keep open-circuit labels, loaded readings and source-model parameters separate. The reference establishes the conceptual distinction and simple model, not a complete aging curve or product comparison. No battery was tested here, and the example is not a load-test instruction, charging recommendation, connection plan or estimate of service life. A useful real performance claim needs the relevant operating conditions and measurements rather than this arithmetic alone.",
		qualification: "A fixed emf/internal-resistance illustration of discharge; real electrochemical behavior and regulated supplies require their own models.",
		tags: ["battery terminal voltage loaded unloaded", "internal resistance voltage drop", "battery emf"],
		sources: ["emf", "potential"]
	},
	{
		key: "capacity",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b008",
		title: "Does the same amp-hour battery capacity imply the same stored energy?",
		slug: "does-the-same-amp-hour-battery-capacity-imply-the-same-stored-energy",
		bottomLine: "No. Amp-hours describe transferred charge, not energy by themselves. Voltage and the discharge conditions also matter. Two hypothetical constant-voltage sources each delivering 2 Ah would deliver 6 Wh at 3 V and 24 Wh at 12 V. Equal charge capacity does not make these energy quantities equal or establish actual usable runtime.",
		stableCore: ["One ampere-hour corresponds to 3,600 coulombs. The 2 Ah examples therefore involve 7,200 C of transferred charge in each case. Multiplying charge by a compatible constant terminal voltage gives the illustrated energy; the fourfold voltage difference produces a fourfold energy difference without changing the charge unit. This is a dimensional comparison, not a battery experiment.", "When terminal voltage changes, delivered energy depends on the voltage over the discharge, rather than merely one nominal voltage multiplied by a printed capacity. Ratings can also use different test currents, temperatures and cutoff conditions. Electronics and other losses further separate stored, delivered and useful energy, so equal labels need not imply equivalent performance."],
		editorSummary: "Read Ah and Wh as answers to different questions. Even a valid energy comparison does not determine peak power, cycle life, compatibility, safety or operating duration at an unspecified load. The examples deliberately idealize voltage to reveal the units and are not a purchasing recommendation, chemistry claim or plan for combining cells. Manufacturer tests and stated operating conditions would be needed before comparing real products or predicting their service behavior.",
		qualification: "Charge-versus-energy units; hypothetical constant-voltage arithmetic is not real battery capacity, safety or runtime certification.",
		tags: ["amp hours watt hours battery capacity energy", "Ah Wh voltage", "same mAh different energy"],
		sources: ["si", "hour", "potential", "emf"]
	},
	{
		key: "energyUnits",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b009",
		title: "Are watts and watt-hours interchangeable measures of electricity use?",
		slug: "are-watts-and-watt-hours-interchangeable-measures-of-electricity-use",
		bottomLine: "No. Watts measure power, a rate of energy transfer; watt-hours measure energy over time. A hypothetical constant 10 W load operating for three hours uses 30 Wh, equivalent to 108,000 J. A power label alone does not state the time-integrated energy used by a device with changing activity.",
		stableCore: ["A watt is one joule each second. Multiplying a constant power by elapsed time gives energy, and an hour is 3,600 seconds. That conversion explains the example without inventing a tariff, a household consumption average or a measured appliance. A kilowatt changes the scale of power; a kilowatt-hour changes the scale of energy, not the underlying distinction.", "When power varies, its contributions over the interval must be added or integrated. Two devices with the same maximum rated power can consume different amounts if their durations or operating patterns differ. Conversely, equal total energy does not imply equal peak demand, equal timing or equal stresses on an electrical system. The measurement's interval is part of its meaning."],
		editorSummary: "First identify whether a number describes an instantaneous rate, a time average, a maximum rating or accumulated energy. Do not insert a peak specification as though it were constant operation. This unit check supports understanding labels and research claims but does not estimate a personal bill, forecast grid load, certify meter accuracy or recommend a product. Actual comparisons require measurements or justified operating assumptions over comparable intervals.",
		qualification: "Power and integrated-energy definitions with a specified interval; no appliance, grid, meter or price prediction is made.",
		tags: ["watts watt hours power energy", "kW kWh difference", "electricity use time"],
		sources: ["measuring", "si", "hour", "power"]
	},
	{
		key: "apparent",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b010",
		title: "Does AC voltage times current always equal average real power?",
		slug: "does-ac-voltage-times-current-always-equal-average-real-power",
		bottomLine: "Not when the quoted values are RMS quantities without a power-factor condition. Their product is apparent power. For sinusoidal voltage and current, average real power also includes the cosine of their phase difference. Hypothetical 10 V RMS and 2 A RMS give 20 VA, but a power factor of 0.5 gives 10 W.",
		stableCore: ["Instantaneous electrical power is the product of compatible instantaneous voltage and current. Averaging that product is not generally the same as multiplying two separate averages or multiplying RMS values alone. Phase can allow energy to be stored and returned during parts of a cycle, while a resistive contribution converts net energy into heat over the cycle.", "For pure resistance with an appropriate waveform, voltage and current are in phase and real power equals their RMS product. A phase-angle cosine expresses power factor for the stated sinusoidal case, but distorted waveforms can require broader accounting. VA and W share dimensional relationships without representing the same reported quantity in every AC performance claim."],
		editorSummary: "Ask whether a number is real, reactive or apparent power and how it was measured. A label does not establish a waveform or a phase relationship. The example is independently constructed, not a product rating or a recommendation about supply size, compensation equipment or wiring. Practical devices have losses and may draw nonsinusoidal currents, so the simple phase-angle model must not be presented as universal device certification.",
		qualification: "Compatible terminal measurements; the cosine phase expression assumes sinusoidal steady operation, not arbitrary distorted waveforms.",
		tags: ["AC apparent real power power factor", "volt amps watts difference", "RMS voltage current phase"],
		sources: ["acPower", "alternating", "si"]
	},
	{
		key: "rms",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b011",
		title: "Does an AC current with a zero signed average produce no resistive heating?",
		slug: "does-an-ac-current-with-a-zero-signed-average-produce-no-resistive-heating",
		bottomLine: "No. Opposite current directions can cancel in the signed mean while both contribute positive resistive dissipation. RMS current measures the square-root of mean squared current. A hypothetical 2 A RMS waveform in a constant 10 ohm resistor gives 40 W average heating even if its signed mean over a complete cycle is zero.",
		stableCore: ["For the specified fixed resistor, instantaneous dissipated power is current squared times resistance. Squaring removes the current's direction sign, so averaging this quantity retains heating from both halves of an alternating cycle. Squaring an already averaged current would answer a different question and incorrectly predict zero dissipation for a symmetric nonzero waveform.", "For a sinusoid, RMS is peak magnitude divided by the square root of two. Other waveform shapes have their own peak-to-RMS relations. The definition still concerns a specified averaging interval, and a time-varying resistance or additional reactive behavior requires extra modeling. Neither zero signed current nor a peak alone identifies all the relevant energy quantities."],
		editorSummary: "Keep the signed mean, peak and RMS values distinct when comparing claims. RMS is useful for the stated heating calculation, but it is not a complete description of timing, frequency, device response or exposure. The numbers are hypothetical arithmetic and no resistor or waveform was measured. This explanation is not a component rating, electrical protection rule, physiological assessment or suggestion to apply currents to a person or device.",
		qualification: "Fixed ordinary resistance and a specified averaging interval; peak-to-RMS division by square root of two is sinusoid-specific.",
		tags: ["AC zero average heating RMS", "root mean square current", "signed average power"],
		sources: ["alternating", "power"]
	},
	{
		key: "alternation",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b012",
		title: "Must electrons move all the way from an AC source to a load in each cycle to transfer energy?",
		slug: "must-electrons-move-all-the-way-from-an-ac-source-to-a-load-in-each-cycle-to-transfer-energy",
		bottomLine: "No. In an ordinary symmetric AC conduction model, carriers have oscillating directed motion without needing to traverse the entire source-to-load distance each cycle. Electromagnetic fields mediate energy transfer and can supply positive net energy to a resistive load. Zero net signed charge transfer over a complete cycle does not imply zero delivered energy.",
		stableCore: ["A sinusoidal current has equal positive and negative signed contributions over a complete period. That statement concerns the net transferred charge across a chosen section. The energy accounting uses the voltage-current product over time, not just the signed charge balance. For a resistive response, the current and voltage reverse together, so the product can remain positive in both directions.", "Carriers already present throughout the conductor respond to local fields. Describing energy as individual electrons first traveling the complete circuit creates the wrong timing and direction requirement. Drift oscillation, microscopic random motion and electromagnetic propagation are different descriptions. The field geometry, surrounding materials and load determine a real system's response, rather than a universal particle journey."],
		editorSummary: "This explanation is about an ordinary idealized symmetric AC case, not a claim that every signal lacks a DC component or that no carrier can move a net distance. Switching and waveform asymmetry require their own charge balance. No transport experiment, cable speed or device efficiency was measured here. The distinction reconciles zero mean current with energy transfer without implying instantaneous communication, absent losses or a source of free energy.",
		qualification: "Ordinary symmetric periodic conduction; net motion, field propagation and energy transfer must not be conflated.",
		tags: ["AC electrons oscillate energy transfer", "electrons travel source load", "zero net charge energy"],
		sources: ["alternating", "fieldEnergy", "current"]
	},
	{
		key: "charged",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b013",
		title: "Can an ideal capacitor remain charged without a sustained current?",
		slug: "can-an-ideal-capacitor-remain-charged-without-a-sustained-current",
		bottomLine: "Yes. Separated charge and stored electric-field energy are states, whereas current is a rate of charge transfer. An ideal capacitor at a constant terminal voltage has no continuing charging current. Real capacitors can leak and interact with connected equipment, so the ideal statement is not a retention-time or safety guarantee.",
		stableCore: ["For fixed capacitance, charge is capacitance times voltage and charging current depends on how that voltage changes. A hypothetical 2 mF ideal capacitor at 3 V has 6 mC of separated plate charge. If the modeled voltage stays constant, that stored charge does not require a continuing flow through an ideal insulating gap. It is not an absence of electric field.", "Charging through a resistor is a transient, not the same condition as the final limiting steady state. In the ideal exponential model, current approaches zero asymptotically and is not declared exactly zero after an arbitrary finite number of seconds. Changing the voltage, altering the circuit or including leakage changes the charge-flow question."],
		editorSummary: "Do not infer that zero measured current means no stored energy, or that a disconnected real component is uncharged. Conversely, stored charge is not itself a sustained transport current. The reference definitions and hypothetical calculation explain the distinction without testing a component, prescribing a waiting time, estimating leakage or giving charging and discharge instructions. Real dielectric behavior, environmental conditions and measurement disturbance require evidence beyond this idealized state model.",
		qualification: "Ideal fixed capacitance at constant voltage; real leakage, transients and retention times are separate empirical questions.",
		tags: ["capacitor charged no current", "capacitor DC steady state", "stored charge current difference"],
		sources: ["capacitance", "charging"]
	},
	{
		key: "capacitorEnergy",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b014",
		title: "Is a linear capacitor's stored energy always final charge times final voltage?",
		slug: "is-a-linear-capacitors-stored-energy-always-final-charge-times-final-voltage",
		bottomLine: "No. For an initially uncharged ideal capacitor with constant capacitance, final stored energy is half the product of final charge and final voltage. The voltage rises during charging. A hypothetical 2 mF capacitor at 3 V stores 9 mJ, not the 18 mJ obtained by multiplying its final 6 mC charge by 3 V.",
		stableCore: ["The relevant work sums the voltage applying to each increment of transferred charge. In the linear model, voltage increases proportionally from zero to its final value, giving the one-half factor. Equivalent forms are half capacitance times voltage squared and charge squared divided by twice capacitance. Their equality depends on the specified constant-capacitance relation.", "This stored-energy result is not automatically the total energy delivered by a particular charging source. A fixed-voltage source with a resistive charging path can supply energy that is partly dissipated rather than all retained in the capacitor. Changing initial conditions, capacitance or the physical storage mechanism requires its own energy balance instead of blindly reusing the same expression."],
		editorSummary: "Distinguish final state variables from the varying conditions along a process. A final voltage is not the voltage experienced by every charge increment. The independent example illustrates this accounting error, not a measured component, medical device, operating limit or practical charging design. Knowing a formal energy value also does not certify how a real component can be handled or how its energy will be delivered to a connected system.",
		qualification: "Initially uncharged ideal linear capacitance; stored energy and total source/process energy are different quantities.",
		tags: ["capacitor energy half CV squared QV", "final voltage charging energy", "stored energy capacitor"],
		sources: ["capacitorEnergy", "capacitance", "charging"]
	},
	{
		key: "inductor",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b015",
		title: "Does an ideal inductor oppose an unchanged DC current forever?",
		slug: "does-an-ideal-inductor-oppose-an-unchanged-dc-current-forever",
		bottomLine: "No. Ideal self-inductive voltage responds to a change in current, not merely to current being nonzero. With fixed inductance and unchanged current, that contribution is zero, although magnetic energy can remain stored. A real coil can still have winding resistance and other losses, so zero ideal inductive voltage is not zero real voltage loss.",
		stableCore: ["For constant inductance, the magnitude of the self-induced response depends on the current's rate of change, with direction opposing the change. A hypothetical 0.4 H ideal inductor carrying an unchanged 1 A stores 0.2 J of magnetic energy. The derivative can be zero while both current and stored energy are nonzero; these statements answer different questions.", "During a transient the current can change and an inductive response appears. Ordinary coils also include resistance, core behavior and other nonideal effects. Stating that an ideal element has no resistive loss is therefore not a prediction that any physical coil will maintain a chosen current without external energy, nor that its field contains unlimited energy."],
		editorSummary: "Separate opposition to changing current from dissipation of steady current and from the existence of a magnetic field. Inductance is not simply another name for fixed resistance. The example is a state-and-derivative illustration, not a coil experiment, switching procedure, component recommendation or power-generation claim. A real performance statement requires conditions and measurements of the actual geometry, material response and losses rather than an ideal schematic element alone.",
		qualification: "Ideal constant self-inductance; winding resistance, changing inductance and other material losses are not excluded for real coils.",
		tags: ["inductor steady DC current change", "inductance resistance difference", "stored magnetic energy"],
		sources: ["inductance", "faraday"]
	},
	{
		key: "staticFlux",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b016",
		title: "Does a stationary magnet by itself induce a sustained current in a stationary loop?",
		slug: "does-a-stationary-magnet-by-itself-induce-a-sustained-current-in-a-stationary-loop",
		bottomLine: "Not merely by being present. For fixed geometry and a time-independent total magnetic flux, there is no flux-change induction emf. A magnetic field can be nonzero while its flux is constant. Movement, changing orientation or a changing field can alter that condition, but a magnet alone is not an inexhaustible source of electrical power.",
		stableCore: ["Induction depends on the change of oriented flux through the relevant loop, not on the word magnet or just a field-strength value. In an independently constructed ideal case, the flux can remain 0.02 Wb through a stationary loop. Its time derivative is zero even though the flux is not zero. The induced contribution from that unchanged flux is therefore zero.", "A flux change can arise through field variation, area change or changing orientation, so stationary versus moving labels need the complete geometry and field conditions. A preexisting current, an applied electric source or other physical effects also must not be mistaken for current newly induced by a constant external magnet. Charge transport needs a specified conducting path and response."],
		editorSummary: "The negative answer is conditional, not a prohibition on electromagnetic generators or transients. Those systems change relevant fields or geometry and have an energy source. This conceptual example does not construct a generator, prescribe a magnet experiment, estimate power output or assess equipment safety. The original induction relation establishes what variable must change; it does not independently measure the performance of any proposed device or certify a free-energy advertisement.",
		qualification: "Stationary geometry and time-independent total flux; initial currents, changing fields and other driving mechanisms are separate.",
		tags: ["stationary magnet coil current", "constant magnetic flux induction", "magnet free electricity"],
		sources: ["flux", "faraday"]
	},
	{
		key: "magneticWork",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b017",
		title: "Can the magnetic Lorentz force alone increase a point charge's kinetic energy?",
		slug: "can-the-magnetic-lorentz-force-alone-increase-a-point-charges-kinetic-energy",
		bottomLine: "Not through the magnetic part of the classical Lorentz force in the stated reference frame. That force is perpendicular to the point charge's velocity, so its instantaneous mechanical power is zero. It can bend the trajectory without increasing speed. Electric fields and other forces can transfer kinetic energy; extended magnetic objects need a different analysis.",
		stableCore: ["Mechanical power is force dotted with velocity. The magnetic term uses a cross product of velocity with the magnetic field, which is perpendicular to velocity. The dot product is therefore zero. This geometrical identity distinguishes a change in the direction of motion from a change in kinetic energy, rather than suggesting that magnetism has no physical effect.", "A changing magnetic field can accompany an induced electric field, and that electric contribution can do work. Motional circuits, magnetic materials and different reference frames must account for all relevant interactions and energy sources. Calling an entire apparatus magnetic does not imply its full force or energy transfer is represented solely by one point-charge magnetic term."],
		editorSummary: "Keep the narrow force identity separate from claims that magnets cannot exert useful forces or that generators violate energy conservation. It is also not a complete description of magnetic dipoles, spin interactions, radiation or an actual particle beam. No apparatus, trajectory measurement or kinetic-energy change was measured here. The review checks the classical relationship and its scope without providing experimental instructions, equipment settings or a universal claim about every magnetic system.",
		qualification: "Classical point-charge magnetic Lorentz term in a specified frame; electric contributions and extended magnetic matter are separate.",
		tags: ["magnetic force work kinetic energy", "magnets speed up particles", "Lorentz perpendicular velocity"],
		sources: ["magneticForce", "fieldEnergy", "faraday"]
	},
	{
		key: "transformer",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b018",
		title: "Does a step-up transformer create extra electrical power when it raises voltage?",
		slug: "does-a-step-up-transformer-create-extra-electrical-power-when-it-raises-voltage",
		bottomLine: "No. An ideal transformer can trade voltage for current, not create extra energy. In a hypothetical ideal in-phase example, 4 V and 3 A at one side correspond to 12 V and 1 A at the other: both are 12 W. Real losses generally reduce delivered power, and arbitrary AC loads need compatible power-factor accounting.",
		stableCore: ["The ideal voltage ratio follows the turns ratio under the specified shared changing-flux model. For compatible ideal loaded conditions, the current ratio goes the other way. A larger voltage therefore does not by itself establish a larger power. The source and load remain part of the energy balance, rather than being replaced by a voltage number alone.", "A steady unchanging flux does not support the ordinary continuous transformer action described by this induction model. Switching converters can process a DC input using changing internal conditions, which is not a counterexample produced by applying an unchanged flux to the same ideal model. Real winding resistance, magnetic losses, coupling and operating conditions affect performance."],
		editorSummary: "The independent arithmetic demonstrates power conservation, not the specifications of a transformer or converter. It does not supply a construction plan, winding choice, wiring advice, safety assessment or universal efficiency percentage. A complete real claim needs waveform, load, input and output measurements with losses and uncertainty accounted for. Comparing only voltages can make an ordinary energy conversion look like power creation even when the current and energy accounts are entirely consistent.",
		qualification: "Ideal shared-changing-flux transformer model and compatible power accounting; practical losses and nonsinusoidal loads require fuller evidence.",
		tags: ["step up transformer voltage current power", "transformer free energy", "turns ratio conservation"],
		sources: ["transformers", "faraday", "acPower"]
	},
	{
		key: "heating",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b019",
		title: "Does doubling current through a fixed resistor merely double its heating power?",
		slug: "does-doubling-current-through-a-fixed-resistor-merely-double-its-heating-power",
		bottomLine: "No in the fixed ordinary-resistance model. Dissipated power is proportional to current squared, so doubling the current gives four times the power. For a hypothetical constant 2 ohm resistor, 1 A gives 2 W and 2 A gives 8 W. This comparison holds resistance fixed; it does not predict the final temperature of a real component.",
		stableCore: ["The resistive relation combines the voltage-current power product with the fixed-resistance voltage relation. Each doubling of current also doubles the voltage drop in that model, making their product fourfold. This is why holding current fixed, holding voltage fixed and holding delivered power fixed are different comparisons and cannot be interchanged without changing the question.", "Heating power is an energy-transfer rate, not a temperature. The resulting temperature depends on duration, heat capacity, cooling, geometry and other energy transfers. Resistance itself may change as a material heats, so a real response can depart from the fixed-resistance illustration. Correct square-law arithmetic therefore does not validate a complete thermal prediction."],
		editorSummary: "Specify what is held unchanged before describing a scaling effect. This review differs from the watts-versus-watt-hours question: it asks how a particular dissipative model responds to current, not how power is integrated over time. The numbers are independently constructed and are not component limits, cable ratings, a safe-current threshold or an instruction to heat anything. Actual performance and protection claims need the physical system and its operating conditions, not the ideal ratio alone.",
		qualification: "Fixed positive ohmic resistance; material changes and heat-transfer conditions are not modeled as universal constants.",
		tags: ["doubling current heating power squared", "Joule heating I squared R", "resistor temperature power"],
		sources: ["power", "ohmic"]
	},
	{
		key: "field",
		id: "e6ca9061-31de-4dc5-9310-9b9b22f8b020",
		title: "Must the electric field be zero inside an ordinary current-carrying metal?",
		slug: "must-the-electric-field-be-zero-inside-an-ordinary-current-carrying-metal",
		bottomLine: "No. Zero interior electric field is an electrostatic-equilibrium result, not a universal statement about every metal at every time. An ordinary resistive conductor carrying a sustained current generally has an electric field driving carrier motion. Steady current is not electrostatic equilibrium, even when its macroscopic value is unchanged over time.",
		stableCore: ["In electrostatic equilibrium, mobile charges have redistributed so that there is no interior field continuing to drive their rearrangement. The usual theorem applies to that specified state. With finite conductivity and ordinary dissipative transport, maintaining a current involves a field and ongoing energy transfer to matter. Calling both situations steady obscures the difference between no charge motion and an unchanged rate of charge flow.", "A resistive element can have a terminal voltage drop while carrying the same entering and leaving current. The field account is consistent with this charge conservation and with energy conversion in the material. An ideal zero-resistance connection in a simplified schematic is not proof that every real conductor has zero local electric field under load."],
		editorSummary: "Check the state assumed by a familiar theorem before treating an apparent exception as a scientific contradiction. This is not a microscopic model of every metal, a statement about superconductors or a certification of shielding against every field. No field distribution was measured and no wiring or exposure guidance is supplied. The original references distinguish equilibrium from resistive conduction; actual geometry, material response, transients and measurement conditions would be needed for a quantitative field map.",
		qualification: "Ordinary resistive transport versus electrostatic equilibrium; ideal wires, superconductors and quantitative field maps require separate models.",
		tags: ["electric field inside conductor current", "electrostatic equilibrium metal", "steady current field zero"],
		sources: ["electrostatic", "current", "fieldEnergy"]
	}
];

export const readerElectricitySlugs = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerElectricityClaims: SeedClaim[] = reviews.map(review => ({
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
	openQuestions: [`Which geometry, state, waveform or operating conditions make the stated model applicable? ${review.qualification}`],
	whatWouldChangeMinds: [`A reproducible failure of the stated relation under its specified conditions, or evidence those conditions do not apply, would require reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A correct ideal model is not a measured device specification or an equipment-safety assessment."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "generalizability", detail: review.qualification }],
	searchDatabases: ["Original electrical and electromagnetic definitions in College Physics 2e", "Original NIST SI definitions and accepted time units", "Original Caltech field-energy discussion", "Original EIA electricity-measurement definitions", "Consensus.app circuit-field discovery; fetched record not used as original-paper evidence"],
	searchCutoffAt: electricityCheckedAt,
	inclusionRules: ["Separate physical quantities, conservation laws, scoped ideal models and measured performance.", "Use original reference checks and independently constructed hypothetical examples with compatible units."],
	exclusionRules: ["No copied textbook expression, exercises, diagrams, equipment ratings or clinical examples.", "No invented reader demand, expert votes, apparatus testing, wiring, device construction, exposure or safety recommendations."],
	appraisalTools: ["Structured physical-quantity, conservation, arithmetic and applicability check; no formal study risk-of-bias score", "Original reference and source-context check, not exhaustive correction or integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "OpenStax sections share textbook authorship, NIST sections share institutional provenance and Caltech chapters share authors. These are not independent experiments or an expert poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing. No actual reader request, apparatus or raw research dataset was analyzed.",
	coiSummary: "Institutional teaching and unit references define scoped models, not product approval or safety certification. Funding and conflicts across teaching records were not exhaustively audited. No product, equipment procedure or expert-agreement percentage is endorsed.",
	lastRetractionCheckAt: electricityCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "Hypothetical arithmetic is not an observed device effect size or measured performance.", certainty: "moderate", limitations: [review.qualification, "Shared teaching-source provenance; no independent apparatus testing or expert survey"] }],
	institutionalAnchors: [{ name: readerElectricitySources[review.sources[0]!].publisher, role: "Definition or model reference, not a formal consensus statement or expert approval" }],
	changeLog: [{ date: electricityCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: review.id, date: electricityCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Corrections and notices for cited original references"], guidelineMonitors: ["Original definitions and model-applicability revisions"], triggerRules: ["Reassess if a reference correction or applicable model assumptions change the conclusion."] },
	sources: review.sources.map((key, index) => {
		const entry = readerElectricitySources[key];
		return { ...entry, order: index + 1, isAnchor: index === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: electricityCheckedAt, statusSources: [entry.url!] };
	})
}));

export const readerElectricityGaps = reviews.map(review => ({ slug: review.slug, gap: `Adds the distinct electrical-science question "${review.title}" with physical quantities, constructed examples and applicability boundaries; existing grid, perpetual-motion, atomic and heat/optics reviews do not answer this proposition.`, relatedExistingSlugs: ["can-a-perpetual-motion-machine-produce-net-energy-indefinitely", "will-ordinary-rooftop-solar-panels-keep-a-home-powered-during-a-grid-outage"] }));
