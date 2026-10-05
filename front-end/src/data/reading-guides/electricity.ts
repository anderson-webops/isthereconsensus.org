import type { ReadingGuideContent } from "./types";

function textbook(id: string, section: string, title: string, note: string) {
	return {
		id,
		title: `College Physics 2e: ${title}`,
		url: `https://openstax.org/books/college-physics-2e/pages/${section}`,
		kind: "Original teaching reference",
		note: `OpenStax, Rice University; Paul Peter Urone and Roger Hinrichs. ${note}`
	};
}

export const electricityGuide: ReadingGuideContent = {
	takeaway:
		"Separate charge, energy, power, voltage and current; then check topology, state, waveform and losses before treating an electrical model as a measured device claim.",
	scope: "An original conceptual guide to ordinary electrical quantities and scoped circuit/field models. Numerical examples are independently constructed and hypothetical, not measured performance, product recommendations, wiring or construction directions, exposure guidance or safety certification. Original definitions and model conditions were checked on 2026-10-05; independent expert review has not been completed. No source exercises, prose, illustrations or equipment ratings are reproduced.",
	sections: [
		{
			id: "identify-the-quantity",
			title: "Start with the quantity, not the impressive number",
			paragraphs: [
				{
					text: "An electrical headline can sound precise while naming the wrong quantity. Current answers how quickly charge crosses a chosen section; potential difference answers an energy-per-charge question between specified points. Amps and volts are therefore not rival units for one thing. In our hypothetical steady example, 1 A and 5 V combine to 5 W. That is a rate of energy transfer, not a claim that a wire contains five units of electricity. A useful first check is to name the terminals, direction, interval and quantity before comparing numbers. Those choices are part of what a measurement means, not decorative details added after the arithmetic.",
					sources: ["current", "potential", "si"]
				},
				{
					text: "A unit conversion can reveal a mistaken comparison without validating a whole product claim. An ampere is a coulomb per second and an hour contains 3,600 seconds, so an ampere-hour counts transferred charge. A watt is a joule per second, so a watt-hour counts energy. Voltage links charge and energy under the relevant conditions; it does not make their units interchangeable. The relationships are defined physical quantities, not an expert survey or a measurement of any battery. Treat them as a framework for asking what a label actually reports, then obtain the operating conditions needed to interpret a real label.",
					sources: ["si", "hour", "potential"]
				}
			]
		},
		{
			id: "what-is-conserved",
			title: "Follow charge and energy separately",
			paragraphs: [
				{
					text: "A resistor transforms energy without consuming charge. In a steady series path with no charge accumulation, an entering 2 A charge-flow rate is accompanied by an outgoing 2 A rate. A hypothetical 3 V difference across that element still corresponds to 6 W of energy conversion. The equal currents and the nonzero power are compatible, not contradictory. At a branch, all entering and leaving paths must be counted. During a transient, stored charge can change, so the steady equality must be replaced by a balance that includes accumulation. Do not use one selected branch reading to claim that electric charge has vanished.",
					sources: ["kirchhoff", "series", "power"]
				},
				{
					text: "Energy transfer also has a field description. Carriers already present throughout a conductor respond to local electromagnetic conditions; a particular electron need not complete a source-to-load journey before a circuit responds. Average drift, microscopic random motion and propagating field changes are different ideas. The Caltech discussion illustrates energy flow into a resistive wire, but its geometry is not a universal map for every circuit. Neither the field description nor a schematic without travel times licenses instantaneous communication. The important reading habit is to separate the charge balance, the energy balance and the propagation question rather than forcing all three into a consumable-particle analogy.",
					sources: ["current", "field-energy"]
				}
			]
		},
		{
			id: "model-and-topology",
			title: "A formula needs a state and a connection model",
			paragraphs: [
				{
					text: "Ohmic behavior means an applicable linear voltage-current response under specified conditions. Dividing a voltage by a current at one operating point does not prove constant resistance across all conditions. Our hypothetical fixed 4 ohm resistor gives 0.25 A at 1 V and 0.5 A at 2 V. A separately constructed quadratic response instead gives a fourfold current when voltage doubles. Both can have a calculated ratio at each point; only the first has the stated constant ratio. Temperature, material response, time dependence and waveform can change the comparison. The question is whether the model applies, not whether someone knows how to rearrange an equation.",
					sources: ["ohmic", "ac-power"]
				},
				{
					text: "Connections supply additional constraints. Two fixed 6 ohm resistors have a 12 ohm series equivalent but a 3 ohm parallel equivalent in an ideal model. Series elements share steady current, while branches spanning the same two ideal nodes share voltage. A series pair of 3 ohms and 9 ohms across a hypothetical ideal 12 V difference gives unequal 3 V and 9 V drops. The zero interior electric-field result likewise belongs to electrostatic equilibrium, not ordinary resistive current flow. A drawing, a theorem or a familiar word such as steady cannot replace the conditions that make its conclusion valid.",
					sources: ["series", "kirchhoff", "electrostatic", "current"]
				}
			]
		},
		{
			id: "ratings-and-intervals",
			title: "Capacity, power and delivered energy answer different questions",
			paragraphs: [
				{
					text: "Equal amp-hour capacities do not by themselves imply equal energy. Our two hypothetical constant-voltage sources each deliver 2 Ah, or 7,200 C, but give 6 Wh at 3 V and 24 Wh at 12 V. Real discharge voltage changes, so delivered energy needs the voltage over the transfer, not merely a nominal label. Ratings can also involve different temperatures, currents and cutoff conditions. Stored energy, delivered energy, useful energy, peak power and runtime are distinct. The example isolates the units without testing a chemistry or endorsing a battery. A fair product comparison needs relevant measurements and comparable operating conditions.",
					sources: ["si", "hour", "potential", "emf"]
				},
				{
					text: "Power also needs a time interval before it becomes total energy. A hypothetical constant 10 W load over three hours transfers 30 Wh, equivalent to 108,000 J. If the power changes, contributions across the interval must be added rather than substituting a maximum label for every instant. Source voltage can change under load as well. In a separate fixed model, a 12 V emf with 1 ohm internal resistance and a 5 ohm load supplies 2 A at a 10 V load-terminal difference. The 24 W source balance divides into 20 W at the load and 4 W internally; it is not lost charge or a measured battery test.",
					sources: ["measuring", "power", "hour", "emf"]
				}
			]
		},
		{
			id: "averages-and-ac",
			title: "Do not confuse a signed mean with an energy average",
			paragraphs: [
				{
					text: "Alternating current can have zero signed mean across a complete period while still heating an ordinary resistor. Opposite current directions cancel in that signed average, but their squares do not. For a hypothetical fixed 10 ohm resistance, 2 A RMS gives 40 W average dissipation. RMS is the square root of the mean squared value, not the arithmetic mean with a new name. A sinusoid has a particular peak-to-RMS relation; other shapes do not inherit it automatically. An averaging interval and the response being modeled must be specified before declaring that one reported current measures every relevant effect.",
					sources: ["alternating", "power"]
				},
				{
					text: "Average real power is the average of the compatible instantaneous voltage-current product. The RMS product alone is apparent power, not universally that real average. Our hypothetical 10 V RMS and 2 A RMS give 20 VA, while a sinusoidal power factor of 0.5 gives 10 W. A cosine phase factor is appropriate to the stated sinusoidal model, not every distorted waveform. Reactive elements can store and return energy during a cycle. Similarly, oscillating carrier motion need not move individual electrons the entire circuit length to deliver energy. These distinctions prevent zero net signed charge transfer from being mistaken for zero energy transfer.",
					sources: ["ac-power", "alternating", "field-energy"]
				}
			]
		},
		{
			id: "stored-states",
			title: "A stored state is not a continuing flow",
			paragraphs: [
				{
					text: "A charged ideal capacitor can have constant voltage and no continuing charging current while retaining separated charge and electric-field energy. In our constructed example, 2 mF at 3 V corresponds to 6 mC of plate-charge magnitude. The stored energy is 9 mJ, not the 18 mJ obtained by multiplying final charge by final voltage. The voltage rose during charging; the relevant work accounts for each charge increment under its then-current voltage. This one-half relation assumes constant linear capacitance and an initially uncharged state. It is not the total energy of every charging process or a promise about how a real component releases energy.",
					sources: ["capacitance", "capacitor-energy", "charging"]
				},
				{
					text: "An ideal inductor supplies the complementary warning about rates and states. Its self-induced voltage responds to a current change, not simply to current being nonzero. A hypothetical fixed 0.4 H element at unchanged 1 A has 0.2 J of stored magnetic energy despite zero current derivative. A physical coil may still dissipate energy through winding resistance or material losses. Real capacitors can leak too, and an ideal resistor-capacitor charging transient approaches its limiting state asymptotically rather than reaching it at a magically exact finite time. None of these ideal state descriptions establishes retention time, practical handling, construction details or safety.",
					sources: ["inductance", "charging", "capacitance"]
				}
			]
		},
		{
			id: "induction-and-work",
			title: "Look for the changing variable and the energy source",
			paragraphs: [
				{
					text: "A stationary magnet and stationary loop do not produce sustained induction merely because a magnetic field exists. For fixed geometry and time-independent total flux, the flux derivative is zero. A constructed constant 0.02 Wb flux therefore has no flux-change induced emf. Movement, orientation changes or a changing field can alter that condition. A changing magnetic field can also accompany an electric field that does work. By contrast, the magnetic part of the classical point-charge Lorentz force is perpendicular to that charge's velocity in the stated frame, giving zero instantaneous mechanical power from that term alone. Extended magnetic matter and complete apparatus require fuller accounting.",
					sources: ["flux", "faraday", "magnetic-force"]
				},
				{
					text: "Voltage conversion is not energy creation. A hypothetical ideal transformer with compatible in-phase conditions can relate 4 V and 3 A to 12 V and 1 A: both sides account for 12 W. The ideal turns ratio and inverse current relation explain the apparent gain without adding energy. Real coupling, winding and magnetic losses, load behavior and waveforms matter; one textbook efficiency percentage is not a certificate for every transformer. Nor is this conceptual example a winding or construction plan. Treat any claimed output gain as a question about a complete input, output, stored-energy and loss balance rather than accepting a larger voltage as proof of extra power.",
					sources: ["transformers", "faraday", "ac-power"]
				}
			]
		},
		{
			id: "limits-and-provenance",
			title: "Model agreement is not device certification",
			paragraphs: [
				{
					text: "A correct scaling relation can still answer less than an advertisement implies. Doubling current in a fixed 2 ohm resistor changes dissipated power from 2 W to 8 W, but does not by itself predict the resulting temperature. Duration, heat capacity, cooling and changing resistance belong to a broader physical question. Likewise, a unit identity, steady-state relation or ideal field model does not certify an operating range, waveform measurement or safe exposure. Ask which quantities were actually measured, which assumptions were checked and which losses or changing states were excluded. None of the examples here is a real apparatus test or a replacement for such evidence.",
					sources: ["power", "ohmic", "si"]
				},
				{
					text: "The sources establish definitions and scoped physical models, not a numerical poll of scientists or an independent test of readers' equipment. OpenStax sections share authorship, NIST sections share institutional provenance and Caltech chapters share authors. Multiple links to one teaching work are not independent experiments. We checked original references and arithmetic, but independent expert review has not been completed and funding or conflicts across teaching records were not exhaustively audited. Popularity and reader interest cannot determine a physical conclusion. A useful electrical explanation makes the assumptions and missing measurements visible instead of decorating an ideal calculation with an invented consensus percentage.",
					sources: ["si", "field-energy", "current"]
				}
			]
		}
	],
	questions: [
		"Which physical quantity, terminals and time interval does the number describe?",
		"Is charge being accumulated, transferred or conserved in a stated steady path?",
		"Which topology, material response and state make the model applicable?",
		"Does the label measure charge, power, integrated energy or observed performance?",
		"Is an AC number a signed mean, RMS value, peak or real-power average?",
		"Where is energy stored, returned, dissipated or supplied?",
		"Which flux or current is changing, and what supplies the energy?",
		"What was actually measured, and which assumptions or independent checks are still missing?"
	],
	sources: [
		textbook(
			"current",
			"20-1-current",
			"Current",
			"Charge flow and drift/signal distinction checked; exercises, speed estimates and practical ratings are not reproduced."
		),
		textbook(
			"potential",
			"19-1-electric-potential-energy-potential-difference",
			"Electric Potential Energy: Potential Difference",
			"Potential difference checked; source numerical and biological examples are not adopted."
		),
		textbook(
			"ohmic",
			"20-2-ohms-law-resistance-and-simple-circuits",
			"Ohm's Law: Resistance and Simple Circuits",
			"Linear-response conditions checked; one calculated ratio does not prove constant resistance."
		),
		textbook(
			"power",
			"20-4-electric-power-and-energy",
			"Electric Power and Energy",
			"Power and fixed-resistance dissipation checked; equipment, cost and overvoltage examples are not adopted."
		),
		textbook(
			"alternating",
			"20-5-alternating-current-versus-direct-current",
			"Alternating Current versus Direct Current",
			"Periodic direction and sinusoidal RMS checked; no household or breaker recommendation is made."
		),
		textbook(
			"series",
			"21-1-resistors-in-series-and-parallel",
			"Resistors in Series and Parallel",
			"Ideal topology constraints checked; wiring and protective-footwear examples are not adopted."
		),
		textbook(
			"emf",
			"21-2-electromotive-force-terminal-voltage",
			"Electromotive Force: Terminal Voltage",
			"Equivalent source model checked, not a complete battery test or aging model."
		),
		textbook(
			"kirchhoff",
			"21-3-kirchhoffs-rules",
			"Kirchhoff's Rules",
			"Ordinary lumped charge/loop balances checked; transients and changing linked flux need explicit accounting."
		),
		textbook(
			"capacitance",
			"19-5-capacitors-and-dielectrics",
			"Capacitors and Dielectrics",
			"Charge/storage definition checked; construction, biological and dielectric-breakdown examples are not adopted."
		),
		textbook(
			"capacitor-energy",
			"19-7-energy-stored-in-capacitors",
			"Energy Stored in Capacitors",
			"Initially uncharged linear-capacitance energy checked; source medical-device examples are not adopted."
		),
		textbook(
			"charging",
			"21-6-dc-circuits-containing-resistors-and-capacitors",
			"DC Circuits Containing Resistors and Capacitors",
			"Asymptotic ideal transient checked; no real retention time, waiting period or discharge directions are supplied."
		),
		textbook(
			"magnetic-force",
			"22-5-force-on-a-moving-charge-in-a-magnetic-field-examples-and-applications",
			"Force on a Moving Charge in a Magnetic Field: Examples and Applications",
			"Point-charge perpendicular-force scope checked; no apparatus or beam settings are reproduced."
		),
		textbook(
			"flux",
			"23-1-induced-emf-and-magnetic-flux",
			"Induced Emf and Magnetic Flux",
			"Oriented flux and changing conditions checked; no magnet experiment is implemented."
		),
		textbook(
			"faraday",
			"23-2-faradays-law-of-induction-lenzs-law",
			"Faraday's Law of Induction: Lenz's Law",
			"Flux-change induction checked; source apparatus and health examples are not adopted."
		),
		textbook(
			"transformers",
			"23-7-transformers",
			"Transformers",
			"Ideal ratio and power balance checked; blanket efficiency and high-voltage safety assurances are not adopted."
		),
		textbook(
			"inductance",
			"23-9-inductance",
			"Inductance",
			"Constant-inductance response and stored energy checked; coil construction suggestions are not reproduced."
		),
		textbook(
			"ac-power",
			"23-12-rlc-series-ac-circuits",
			"RLC Series AC Circuits",
			"Sinusoidal phase/power relation checked; cosine phase factor is not universal for distorted waveforms."
		),
		textbook(
			"electrostatic",
			"18-7-conductors-and-electric-fields-in-static-equilibrium",
			"Conductors and Electric Fields in Static Equilibrium",
			"Equilibrium theorem checked; lightning, vehicle and fallen-wire safety passages are not adopted."
		),
		{
			id: "field-energy",
			title: "The Feynman Lectures on Physics, Volume II, Chapter 27: Field Energy and Field Momentum",
			url: "https://www.feynmanlectures.caltech.edu/II_27.html",
			kind: "Original teaching reference",
			note: "Caltech; Feynman, Leighton and Sands. Field-energy balance and wire example checked; no prose or figure is reproduced and no universal energy-flow geometry is inferred."
		},
		{
			id: "si",
			title: "SP 330: The International System of Units, Section 2",
			url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-2",
			kind: "Original institutional unit definition",
			note: "NIST electrical, energy and power units checked; defined relationships are not device-performance measurements or expert votes."
		},
		{
			id: "hour",
			title: "SP 330: Non-SI units accepted for use with the SI, Section 4",
			url: "https://www.nist.gov/pml/special-publication-330/sp-330-section-4",
			kind: "Original institutional unit definition",
			note: "NIST hour/second conversion checked; unit arithmetic does not verify capacity, runtime or price."
		},
		{
			id: "measuring",
			title: "Measuring electricity",
			url: "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
			kind: "Original institutional definition",
			note: "EIA power/energy distinction checked; source consumption, price and appliance examples are not copied."
		}
	]
};
