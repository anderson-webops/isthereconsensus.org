import type { SeedClaim } from "./claims.js";
import { september2026DemandDepthClaim as reviewedClaim } from "./claim-expansion-2026-09-demand-depth-shared.js";

const ipccEnergyChapter = [
	"consensus_statement",
	"Climate Change 2022: Mitigation of Climate Change, Chapter 6: Energy systems",
	"Intergovernmental Panel on Climate Change",
	2022,
	"https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_Chapter_06.pdf",
	"IPCC assessment compares lifecycle emissions, costs, deployment, and system roles across low-carbon and fossil electricity options."
] as const;

export const september2026DemandDepthEnergyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Is nuclear power a low-carbon electricity source over its full lifecycle?",
		slug: "is-nuclear-power-a-low-carbon-electricity-source-over-its-full-lifecycle",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Mining, enrichment, construction, maintenance, decommissioning, and waste management give nuclear power nonzero lifecycle emissions, but assessed values remain far below unabated coal and gas and within the low-carbon range alongside wind, solar, and hydropower. Exact emissions depend on fuel cycle, plant performance, and assessment boundaries.",
		stableCore: [
			"Operational reactors emit very little carbon dioxide while generating electricity.",
			"Lifecycle assessment includes upstream fuel and materials plus construction and end-of-life activities.",
			"Systematic harmonization and major assessments classify nuclear electricity as low-carbon rather than zero-impact."
		],
		openQuestions: [
			"How will future ore grade, enrichment method, plant lifetime, capacity factor, and fuel-cycle choices change lifecycle intensity?",
			"Which low-carbon generation portfolios minimize total cost, land, materials, risk, and deployment delay in each region?"
		],
		whatWouldChangeMinds: [
			"Transparent full-chain operating data placing representative nuclear fleets near unabated fossil generation under consistent boundaries.",
			"A major reassessment showing harmonized lifecycle studies systematically omitted a dominant emissions source."
		],
		misconceptions: [
			"Low-carbon does not mean zero-emission, waste-free, inexpensive, or risk-free.",
			"Construction emissions should be counted for every technology, not only nuclear plants.",
			"A high estimate from one unusual fuel-cycle assumption does not describe the full operating fleet."
		],
		editorSummary:
			"The evidence supports separating climate intensity from other nuclear debates. Waste, cost, safety, construction time, and proliferation deserve their own comparisons, but they do not turn lifecycle greenhouse emissions into fossil-fuel levels.",
		uncertaintySummary:
			"The low-carbon classification is robust. Numerical estimates vary with technology, geography, uranium assumptions, allocation, plant lifetime, and study quality.",
		sources: [
			ipccEnergyChapter,
			["systematic_review", "Life Cycle Greenhouse Gas Emissions of Nuclear Electricity Generation: Systematic Review and Harmonization", "Journal of Industrial Ecology", 2012, "10.1111/j.1530-9290.2012.00472.x", "Systematic harmonization shows why inconsistent boundaries create wide raw estimates and places central nuclear values in the low-carbon range."],
			["landmark_study", "The greenhouse gas emissions of nuclear energy - Life cycle assessment of a European pressurised reactor", "Applied Energy", 2021, "10.1016/j.apenergy.2021.116743", "Detailed contemporary reactor assessment quantifies nonzero fuel-cycle, construction, operating, and end-of-life emissions."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Is deep geological disposal a technically viable path for high-level nuclear waste?",
		slug: "is-deep-geological-disposal-a-technically-viable-path-for-high-level-nuclear-waste",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, with important conditions. International technical bodies regard engineered deep geological repositories in suitable stable formations as a viable way to isolate spent fuel and high-level waste for very long periods. Safety is not automatic: each site requires staged characterization, multiple barriers, a defensible safety case, regulation, financing, monitoring, and durable public consent.",
		stableCore: [
			"Deep disposal combines waste forms, containers, buffer materials, repository design, and geology rather than relying on one perfect barrier.",
			"Long-term assessments model groundwater, heat, chemistry, climate, seismicity, container degradation, radionuclide transport, and human intrusion.",
			"The scientific viability of the concept is distinct from political success, schedule, cost, and trust at a proposed site."
		],
		openQuestions: [
			"How will operating repositories compare with safety cases as monitoring accumulates over decades?",
			"Which approaches to retrievability, consent, intergenerational governance, records, and financing work best?"
		],
		whatWouldChangeMinds: [
			"Validated site evidence showing that coupled geological and engineered barriers cannot keep exposures within regulatory limits.",
			"Operating-repository monitoring that repeatedly contradicts the central transport, corrosion, or containment models."
		],
		misconceptions: [
			"Technical viability does not mean every proposed site is suitable or every project is socially legitimate.",
			"Waste remains hazardous, which is why passive isolation and conservative safety cases are required.",
			"Long timescales create uncertainty, but they do not make quantitative safety assessment impossible."
		],
		editorSummary:
			"The useful distinction is between whether deep disposal can be engineered and assessed, and whether a particular society can choose, license, fund, and operate a suitable repository responsibly.",
		uncertaintySummary:
			"The broad technical judgment is stable, while site-specific performance over geological time is necessarily model-based and must be updated through staged evidence and monitoring.",
		sources: [
			["guideline", "Geological Disposal Facilities for Radioactive Waste", "International Atomic Energy Agency", 2011, "https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1483_web.pdf", "IAEA safety guide defines passive isolation, multiple safety functions, staged development, and safety-case requirements for geological repositories."],
			["consensus_statement", "The Environmental and Ethical Basis of Geological Disposal of Long-Lived Radioactive Wastes", "OECD Nuclear Energy Agency", 1995, "https://www.oecd-nea.org/rwm/reports/1995/geodisp/geological-disposal", "International expert statement explains the technical consensus and ethical basis for deep geological isolation while emphasizing staged implementation."],
			["context", "Deep geological repositories - A review of design concepts, near-field evolution, and their implications for nuclear waste containment", "Journal of Environmental Radioactivity", 2025, "10.1016/j.jenvrad.2025.107750", "Current review evaluates repository concepts and the coupled thermal, hydrological, mechanical, chemical, and biological processes affecting containment."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Do solar panels consume more energy to manufacture than they generate?",
		slug: "do-solar-panels-consume-more-energy-to-manufacture-than-they-generate",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Modern photovoltaic systems generally repay the nonrenewable energy used for materials, manufacturing, transport, installation, and end-of-life well within their operating lifetime, commonly within a few years or less in suitable locations. Payback varies with panel technology, manufacturing electricity, sunlight, orientation, degradation, and system lifetime.",
		stableCore: [
			"Energy-payback time compares lifecycle energy inputs with the energy a system generates during operation.",
			"Manufacturing dominates many photovoltaic lifecycle inventories, while decades of output accumulate after installation.",
			"Modern assessments consistently find net lifetime energy production rather than an energy deficit."
		],
		openQuestions: [
			"How quickly will lower-carbon manufacturing, thinner wafers, recycling, and longer-lived modules reduce embodied energy further?",
			"How do storage, curtailment, repowering, and local grid conditions change system-level energy return?"
		],
		whatWouldChangeMinds: [
			"Representative audited systems whose lifetime delivered electricity is consistently below their full lifecycle energy input.",
			"Updated inventories revealing a large omitted energy demand that reverses modern payback estimates."
		],
		misconceptions: [
			"Financial payback and energy payback are different calculations.",
			"A cloudy location can lengthen payback without making every installation an energy loss.",
			"Positive energy return does not erase mining, land, waste, or supply-chain impacts."
		],
		editorSummary:
			"Photovoltaics require substantial industrial energy up front, but the relevant comparison is that input against decades of generation. Modern modules typically cross that threshold early in their service life.",
		uncertaintySummary:
			"The direction is high-confidence. Exact payback depends strongly on manufacturing mix, solar resource, technology, boundaries, and assumed lifetime.",
		sources: [
			["consensus_statement", "Environmental Life Cycle Assessment of Electricity from PV Systems: 2022 update", "IEA Photovoltaic Power Systems Programme", 2022, "https://www.iea-pvps.org/wp-content/uploads/2022/11/Fact-Sheet-IEA-PVPS-T12-23-LCA-update-2022.pdf", "International PV lifecycle update reports nonrenewable energy payback well below expected system lifetime under contemporary European assumptions."],
			["systematic_review", "Review on Life Cycle Assessment of Solar Photovoltaic Panels", "Energies", 2020, "10.3390/en13010252", "Review compares photovoltaic lifecycle methods, energy inputs, emissions hotspots, and the factors driving payback estimates."],
			["landmark_study", "An Updated Life Cycle Assessment of Utility-Scale Solar Photovoltaic Systems Installed in the United States", "National Renewable Energy Laboratory", 2024, "10.2172/2331420", "Updated U.S. inventory quantifies current module, balance-of-system, operation, replacement, and end-of-life burdens across a 30-year system life."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Do wind turbines consume more energy to build than they produce?",
		slug: "do-wind-turbines-consume-more-energy-to-build-than-they-produce",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Lifecycle studies of onshore and offshore wind systems include steel, concrete, blades, transport, installation, maintenance, grid connection, and decommissioning, yet find energy and carbon payback far shorter than typical turbine lifetimes. Results vary by wind resource, turbine size, foundations, capacity factor, and recycling assumptions.",
		stableCore: [
			"Most lifecycle energy and emissions occur before generation, especially in materials and manufacturing.",
			"Operating turbines then produce electricity without fuel combustion for roughly two decades or more.",
			"Across varied designs and locations, assessed lifetime output substantially exceeds embodied energy."
		],
		openQuestions: [
			"How will larger offshore foundations, floating systems, transmission, blade recycling, and lifetime extension change results?",
			"Which material substitutions reduce embodied impacts without shortening reliability or service life?"
		],
		whatWouldChangeMinds: [
			"Audited representative wind fleets showing lifetime energy output below complete lifecycle energy input.",
			"Evidence that maintenance, replacement, grid, or decommissioning burdens omitted from current studies reverse net energy return."
		],
		misconceptions: [
			"A turbine's large mass does not reveal how much electricity it will generate over its life.",
			"Energy payback is not the same as purchase-price or subsidy payback.",
			"Positive net energy does not mean zero land, wildlife, material, noise, or community impacts."
		],
		editorSummary:
			"Wind turbines embody visible industrial materials, but a lifetime comparison includes the much larger stream of fuel-free electricity produced after installation.",
		uncertaintySummary:
			"Net lifetime energy production is robust. Numerical payback estimates differ between onshore and offshore projects and with resource quality, design, boundaries, and end-of-life credit.",
		sources: [
			ipccEnergyChapter,
			["context", "Life cycle assessment of onshore and offshore wind energy-from theory to application", "Applied Energy", 2016, "10.1016/j.apenergy.2016.07.058", "Lifecycle comparison identifies manufacturing and infrastructure burdens while showing strong net energy and emissions performance for onshore and offshore wind."],
			["context", "Life Cycle Assessment of Wind Farm: A review on Current Status and Future Knowledge", "Energy and Climate Change", 2025, "10.1016/j.egycc.2025.100206", "Current review synthesizes wind-farm lifecycle boundaries, material hotspots, recycling opportunities, and methodological gaps."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Does wind-turbine infrasound cause a distinct disease syndrome?",
		slug: "does-wind-turbine-infrasound-cause-a-distinct-disease-syndrome",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Current evidence does not support a distinct disease syndrome caused by residential exposure to wind-turbine infrasound. Audible noise can cause annoyance and is associated with self-reported sleep disturbance, so siting and community impacts still matter. Evidence for long-term clinical outcomes is thinner than evidence about annoyance, and absence of a syndrome is not a claim that every resident experiences no burden.",
		stableCore: [
			"Wind turbines emit audible sound and low-frequency sound, while residential infrasound is generally below hearing thresholds.",
			"Noise annoyance is a real outcome influenced by sound level, visual factors, expectations, control, trust, and project process.",
			"Controlled sustained infrasound exposure has not reproduced the proposed cluster of physiological and psychological symptoms."
		],
		openQuestions: [
			"What are the long-term effects of amplitude-modulated audible noise on objectively measured sleep in different settings?",
			"Which siting, setback, sound, benefit-sharing, and participation practices best reduce community burden?"
		],
		whatWouldChangeMinds: [
			"Replicated blinded exposure studies showing a specific physiological response to turbine-pattern infrasound versus sham exposure.",
			"Strong longitudinal evidence linking measured exposure to diagnosed disease after confounding and expectation effects are addressed."
		],
		misconceptions: [
			"Rejecting a unique infrasound syndrome does not mean noise annoyance is imaginary.",
			"Self-reported symptoms alone cannot identify which acoustic or social exposure caused them.",
			"A short laboratory study cannot settle every question about years of community exposure."
		],
		editorSummary:
			"The evidence separates a broad claimed syndrome from narrower, credible noise effects. Infrasound has not produced the proposed syndrome under blinded testing, while audible noise, annoyance, sleep concerns, and fair siting remain legitimate policy issues.",
		uncertaintySummary:
			"Confidence is moderate because controlled evidence is reassuring but relatively small, and many field studies are cross-sectional, self-reported, and vulnerable to exposure and selection bias.",
		sources: [
			["systematic_review", "Health effects of wind turbines on humans in residential settings: Results of a scoping review", "Environmental Research", 2019, "10.1016/j.envres.2018.11.032", "Systematic scoping review finds consistent annoyance evidence, mixed self-reported sleep and quality-of-life findings, and limited evidence for clinical disease outcomes."],
			["landmark_study", "The Health Effects of 72 Hours of Simulated Wind Turbine Infrasound: A Double-Blind Randomized Crossover Study in Noise-Sensitive, Healthy Adults", "Environmental Health Perspectives", 2023, "10.1289/EHP10757", "Blinded 72-hour crossover exposure found no worsening of sleep, proposed syndrome symptoms, physiology, or neurobehavior versus sham infrasound."],
			["systematic_review", "Health Effects Related to Wind Turbine Noise Exposure: A Systematic Review", "PLOS ONE", 2014, "10.1371/journal.pone.0114183", "Review finds annoyance and self-reported sleep associations but no conclusive evidence for the broader set of claimed health effects."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Will ordinary rooftop solar panels keep a home powered during a grid outage?",
		slug: "will-ordinary-rooftop-solar-panels-keep-a-home-powered-during-a-grid-outage",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Usually no. Standard grid-tied solar inverters disconnect during a substantial grid outage so they do not energize lines being repaired. Backup operation requires equipment designed to form a safe local island, commonly a compatible inverter, controls, protected-load panel, and battery or another resource that balances generation and demand.",
		stableCore: [
			"Anti-islanding protection prevents ordinary distributed generation from backfeeding a de-energized utility circuit.",
			"Sunlight on the panels does not by itself create a stable, usable household grid.",
			"Solar-plus-storage or a configured microgrid can supply selected loads when it safely separates from the utility."
		],
		openQuestions: [
			"Which inverter and battery configurations provide the most affordable and reliable backup for different household loads?",
			"How should utilities coordinate intentional islanding, restoration, cybersecurity, and grid services from many distributed systems?"
		],
		whatWouldChangeMinds: [
			"A revised interconnection standard allowing ordinary grid-following rooftop systems to energize homes safely without island-forming equipment.",
			"Field evidence that a simpler architecture reliably balances voltage, frequency, generation, and variable loads during outages."
		],
		misconceptions: [
			"Panel generation capacity is not the same as outage-capable system design.",
			"A battery alone is insufficient if the inverter and controls cannot isolate and form a local grid.",
			"Shutdown is primarily a worker and equipment safety feature, not proof that solar panels failed."
		],
		editorSummary:
			"The missing ingredient during an outage is not sunlight but controlled island operation. Buyers who value resilience need to confirm that the entire system, not just the panels, supports backup mode.",
		uncertaintySummary:
			"The behavior of ordinary grid-tied systems is clear. Backup duration and usable loads vary with equipment, battery capacity, weather, controls, and local interconnection rules.",
		sources: [
			["guideline", "Solar and Resilience Basics", "U.S. Department of Energy", 2021, "https://www.energy.gov/cmei/systems/solar-and-resilience-basics", "DOE explains how solar-plus-storage can detect an outage, island safely, and maintain selected loads as part of a resilient system."],
			["guideline", "Solar Integration: Inverters and Grid Services Basics", "U.S. Department of Energy", 2019, "https://www.energy.gov/cmei/systems/solar-integration-inverters-and-grid-services-basics", "DOE describes inverter ride-through and disconnection requirements during abnormal grid voltage or frequency."],
			["guideline", "Islanding a Microgrid", "U.S. Department of Energy", 2021, "https://www.energy.gov/cmei/femp/articles/islanding-microgrid", "Federal microgrid example explains why a PV array shuts down on grid loss unless controls and storage establish safe island operation."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Can demand-response programs reduce electricity peaks and support grid reliability?",
		slug: "can-demand-response-programs-reduce-electricity-peaks-and-support-grid-reliability",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Price signals, automated controls, and incentive programs can shift or reduce flexible electricity use during expensive or reliability-critical hours. Effects range from negligible to large depending on load, automation, payment, baseline, weather, participation, and rebound, so demand response is a portfolio resource rather than guaranteed megawatts.",
		stableCore: [
			"Some heating, cooling, water heating, industrial, charging, and commercial loads can change timing without eliminating the service they provide.",
			"Wholesale systems already count verified demand response as capacity and operating support under defined rules.",
			"Program performance must be measured against a credible counterfactual baseline and tested during actual system stress."
		],
		openQuestions: [
			"Which combinations of automation, pricing, incentives, and consumer protections produce durable participation?",
			"How should baselines, rebound, distribution constraints, equity, privacy, and extreme-event performance be incorporated?"
		],
		whatWouldChangeMinds: [
			"Large measured deployments repeatedly failing to reduce coincident peaks or provide contracted reliability services.",
			"Evidence that rebound, attrition, or hardship systematically outweighs peak and system benefits."
		],
		misconceptions: [
			"Demand response does not require involuntary blackouts or permanent energy deprivation.",
			"A theoretical flexible load is not automatically an available, enrolled, and dispatchable resource.",
			"Peak reduction, total energy savings, and customer bill savings are related but different outcomes."
		],
		editorSummary:
			"Demand response can turn timing flexibility into a grid resource, but only measured delivery should count. Program design and automation often matter as much as the technical potential of the appliance or process.",
		uncertaintySummary:
			"Field evidence supports real peak reduction, while magnitude and reliability vary widely across sectors, climates, program designs, baselines, and event conditions.",
		sources: [
			["systematic_review", "Demand response by residential and industrial customers: A rapid systematic review", "International Journal of Green Energy", 2024, "10.1080/15435075.2024.2413891", "Review finds highly variable measured load reductions and identifies where customer class, technology, and program design shape results."],
			["systematic_review", "Demand response performance and uncertainty: A systematic literature review", "Energy Strategy Reviews", 2022, "10.1016/j.esr.2022.100857", "Systematic review evaluates delivery uncertainty, baselines, behavior, and methods for making demand response more dependable."],
			["consensus_statement", "2024 Assessment of Demand Response and Advanced Metering", "Federal Energy Regulatory Commission", 2024, "https://www.ferc.gov/sites/default/files/2024-11/Annual%20Assessment%20of%20Demand%20Response_1119_1400.pdf", "FERC reports measured participation and capacity contributions, including demand response equal to about 6.5% of peak demand across U.S. wholesale markets in 2023."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Is hydrogen automatically low-carbon regardless of how it is produced?",
		slug: "is-hydrogen-automatically-low-carbon-regardless-of-how-it-is-produced",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Hydrogen produces no carbon dioxide at the point of use when converted to water, but its lifecycle emissions depend on feedstock, electricity, methane leakage, capture rate, conversion, transport, and losses. Most hydrogen is still made from unabated fossil fuels; electrolysis is low-carbon only when powered by sufficiently low-emission electricity.",
		stableCore: [
			"Hydrogen is an energy carrier, not a primary energy source found ready for use.",
			"Unabated coal and natural-gas production can give hydrogen substantial greenhouse emissions.",
			"Color labels are imperfect proxies; measured lifecycle emissions intensity is the relevant comparison."
		],
		openQuestions: [
			"Which accounting rules best capture additional electricity demand, temporal matching, methane leakage, capture performance, and transport?",
			"Where does scarce low-emission hydrogen deliver more value than direct electrification or other alternatives?"
		],
		whatWouldChangeMinds: [
			"Audited global production data showing negligible upstream and process emissions across current hydrogen supply.",
			"Lifecycle evidence that production pathway, electricity source, leakage, and capture no longer materially affect emissions."
		],
		misconceptions: [
			"No tailpipe carbon dioxide is not the same as zero lifecycle emissions.",
			"Electrolysis powered by a carbon-intensive grid can have high emissions despite using water as feedstock.",
			"Adding carbon capture does not automatically capture all process emissions or eliminate upstream methane."
		],
		editorSummary:
			"Hydrogen's climate value is pathway-specific. The useful label is verified emissions per unit delivered, not simply hydrogen, green, blue, or clean.",
		uncertaintySummary:
			"The pathway dependence is high-confidence. Numerical intensities vary with regional supply chains, marginal electricity, leakage, capture, allocation, and conversion assumptions.",
		sources: [
			["consensus_statement", "GHG emissions of hydrogen and its derivatives - Global Hydrogen Review 2024", "International Energy Agency", 2024, "https://www.iea.org/reports/global-hydrogen-review-2024/ghg-emissions-of-hydrogen-and-its-derivatives", "IEA quantifies wide pathway differences and reports that current production remains dominated by unabated natural gas and coal."],
			["systematic_review", "A systematic review of life cycle greenhouse gas intensity values for hydrogen production pathways", "Renewable and Sustainable Energy Reviews", 2023, "10.1016/j.rser.2023.113588", "Systematic review shows that electricity source, fossil feedstock, methane, capture, and boundaries drive large differences in hydrogen intensity."],
			["context", "Critical Review of Life Cycle Assessment of Hydrogen Production Pathways", "Environments", 2024, "10.3390/environments11060108", "Review compares lifecycle methods and environmental tradeoffs across fossil, renewable, nuclear, biomass, and waste-based production routes."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Are small modular reactors already proven cheaper and faster at commercial scale?",
		slug: "are-small-modular-reactors-already-proven-cheaper-and-faster-at-commercial-scale",
		consensusBand: "mixed",
		confidenceScore: 68,
		evidenceCertainty: "low",
		bottomLine:
			"Not yet as a general claim. A few small modular reactor designs operate and several projects are advancing, but broad evidence that factory production and repeat builds consistently overcome lost economies of scale, financing, licensing, supply-chain, and first-of-a-kind costs has not arrived. Potential advantages remain design-, country-, and deployment-sequence-specific.",
		stableCore: [
			"Smaller units can reduce absolute project size and may support modular construction, incremental capacity, and specialized applications.",
			"Per-kilowatt cost can rise when a smaller reactor loses the scale economies of a large plant.",
			"Expected learning from standardized series production must be distinguished from measured cost and schedule across repeated commercial builds."
		],
		openQuestions: [
			"Will specific designs reach enough standardized orders to demonstrate factory learning and repeat construction?",
			"What are the complete financing, fuel, staffing, waste, decommissioning, security, and system costs of deployed fleets?"
		],
		whatWouldChangeMinds: [
			"Multiple independently audited commercial series delivered on repeatable schedules at competitive all-in cost.",
			"Conversely, mature deployments that continue to miss cost, schedule, safety, or operating targets despite standardization."
		],
		misconceptions: [
			"A physically smaller reactor is not automatically cheaper per unit of electricity.",
			"A licensed design, demonstration, construction start, and repeated commercial fleet are different milestones.",
			"Unproven cost advantage does not mean the technology cannot eventually become useful."
		],
		editorSummary:
			"SMRs are a portfolio of designs and business models, not one tested product. The economic hypothesis depends on repeat manufacturing and deployment, so evidence from an isolated first project cannot settle the category.",
		uncertaintySummary:
			"Evidence certainty is low because most cost estimates are prospective and only a small number of relevant units operate. Designs, markets, financing, fuels, and regulatory settings differ substantially.",
		sources: [
			["consensus_statement", "The NEA Small Modular Reactor Dashboard: Third Edition", "OECD Nuclear Energy Agency", 2025, "https://www.oecd-nea.org/upload/docs/application/pdf/2025-09/web_-_smr_dashboard_-_third_edition.pdf", "NEA tracks licensing, siting, financing, supply chains, engagement, fuel, construction, and first-of-a-kind readiness rather than assuming technical design equals commercialization."],
			["systematic_review", "Economics and finance of Small Modular Reactors: A systematic review and research agenda", "Renewable and Sustainable Energy Reviews", 2020, "10.1016/j.rser.2019.109519", "Systematic review finds economic conclusions depend on assumptions about modularization, learning, financing, deployment volume, operations, and decommissioning."],
			["context", "Economic potential and barriers of small modular reactors in Europe", "Renewable and Sustainable Energy Reviews", 2024, "10.1016/j.rser.2024.114743", "Review examines the tension between lower absolute project risk, possible serial learning, and higher unit capital cost from lost scale economies."]
		]
	}),
	reviewedClaim({
		topicSlug: "energy-and-infrastructure",
		title: "Can widespread electric-vehicle charging always fit existing local grids without planning?",
		slug: "can-widespread-electric-vehicle-charging-always-fit-existing-local-grids-without-planning",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Total electricity growth from electric vehicles can be manageable at system scale, but concentrated unmanaged charging can overload particular transformers, feeders, depots, or buildings and increase peaks. Forecasting, targeted upgrades, time-varying rates, and managed charging can substantially reduce or defer many local constraints without eliminating every upgrade.",
		stableCore: [
			"Distribution impacts depend on where vehicles connect, charger power, coincidence, dwell time, weather, and existing equipment headroom.",
			"Managed charging can shift flexible sessions away from local and system peaks while still meeting travel needs.",
			"Bulk annual energy adequacy and a neighborhood transformer constraint are different planning questions."
		],
		openQuestions: [
			"How much charging flexibility will drivers, fleets, aggregators, and utilities reliably provide during stressed conditions?",
			"Which upgrades should be built in advance, and who should pay when benefits span drivers, buildings, utilities, and the grid?"
		],
		whatWouldChangeMinds: [
			"High-adoption field evidence showing no material local peaks or equipment constraints under unmanaged charging across diverse grids.",
			"Measured programs showing managed charging cannot reduce coincident load or defer any representative infrastructure upgrades."
		],
		misconceptions: [
			"A national energy estimate cannot identify every local transformer problem.",
			"Need for planning and upgrades does not mean the grid cannot support transport electrification.",
			"Managed charging is not the same as preventing drivers from charging when mobility needs require it."
		],
		editorSummary:
			"The grid question is spatial and temporal. Electric vehicles are flexible loads, but treating every plug-in as coincident and unmanaged can create avoidable local costs.",
		uncertaintySummary:
			"The mechanisms are clear, while the magnitude is location-specific and depends on adoption, charger mix, behavior, climate, grid condition, rate design, and control participation.",
		sources: [
			["consensus_statement", "Impact of Electric Vehicles on the Grid", "U.S. Department of Energy", 2024, "https://www.energy.gov/sites/default/files/2024-10/Congressional%20Report%20EV%20Grid%20Impacts.pdf", "Federal assessment distinguishes bulk energy, peak, and local distribution effects and summarizes how managed charging can reduce or defer upgrades."],
			["systematic_review", "A Systematic Review on power systems planning and operations management with grid integration of transportation electrification at scale", "Advances in Applied Energy", 2023, "10.1016/j.adapen.2023.100147", "Systematic review maps planning and operational barriers, methods, and mitigation options for transportation electrification at scale."],
			["context", "Assessing the value of electric vehicle managed charging: a review of methodologies and results", "Energy & Environmental Science", 2022, "10.1039/D1EE02206G", "Review finds substantial potential value from coordinated charging while showing that results depend on behavioral, grid, market, and modeling assumptions."]
		]
	})
];
