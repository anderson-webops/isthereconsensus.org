import type { ReadingGuideSummary } from "./types";

// Keep discovery metadata separate from article bodies: every claim page may
// show a guide link, but should not download the entire reading library.
export const readingGuides: ReadingGuideSummary[] = [
	{
		slug: "reading-electrical-quantities-and-circuit-claims",
		title: "Electricity claims: charge, power, storage and changing fields",
		summary:
			"Read electrical numbers without confusing units, topology, steady states, AC averages or ideal models with tested equipment.",
		checkedAt: "2026-10-05",
		topics: ["physics-and-chemistry"],
		reviews: [
			{
				path: "/consensus/physics-and-chemistry/are-amps-and-volts-two-names-for-the-same-electrical-quantity",
				label: "Amps and volts"
			},
			{
				path: "/consensus/physics-and-chemistry/is-electric-current-used-up-as-it-passes-through-a-resistor",
				label: "Charge is not consumed"
			},
			{
				path: "/consensus/physics-and-chemistry/does-a-signal-in-a-metal-wire-travel-at-the-electron-drift-speed",
				label: "Drift versus signal speed"
			},
			{
				path: "/consensus/physics-and-chemistry/does-ohms-law-guarantee-that-every-device-has-constant-resistance",
				label: "Ohmic model limits"
			},
			{
				path: "/consensus/physics-and-chemistry/do-the-same-resistors-have-the-same-total-resistance-in-series-and-parallel",
				label: "Connection topology"
			},
			{
				path: "/consensus/physics-and-chemistry/do-components-in-series-always-have-the-same-voltage-across-them",
				label: "Series voltage drops"
			},
			{
				path: "/consensus/physics-and-chemistry/does-a-batterys-terminal-voltage-always-equal-its-unloaded-voltage",
				label: "Loaded terminal voltage"
			},
			{
				path: "/consensus/physics-and-chemistry/does-the-same-amp-hour-battery-capacity-imply-the-same-stored-energy",
				label: "Charge capacity versus energy"
			},
			{
				path: "/consensus/physics-and-chemistry/are-watts-and-watt-hours-interchangeable-measures-of-electricity-use",
				label: "Power versus accumulated energy"
			},
			{
				path: "/consensus/physics-and-chemistry/does-ac-voltage-times-current-always-equal-average-real-power",
				label: "Apparent versus real AC power"
			},
			{
				path: "/consensus/physics-and-chemistry/does-an-ac-current-with-a-zero-signed-average-produce-no-resistive-heating",
				label: "Signed mean versus RMS"
			},
			{
				path: "/consensus/physics-and-chemistry/must-electrons-move-all-the-way-from-an-ac-source-to-a-load-in-each-cycle-to-transfer-energy",
				label: "Oscillating carriers and energy transfer"
			},
			{
				path: "/consensus/physics-and-chemistry/can-an-ideal-capacitor-remain-charged-without-a-sustained-current",
				label: "Stored charge without flow"
			},
			{
				path: "/consensus/physics-and-chemistry/is-a-linear-capacitors-stored-energy-always-final-charge-times-final-voltage",
				label: "Capacitor energy accounting"
			},
			{
				path: "/consensus/physics-and-chemistry/does-an-ideal-inductor-oppose-an-unchanged-dc-current-forever",
				label: "Current-change response"
			},
			{
				path: "/consensus/physics-and-chemistry/does-a-stationary-magnet-by-itself-induce-a-sustained-current-in-a-stationary-loop",
				label: "Constant flux is not induction"
			},
			{
				path: "/consensus/physics-and-chemistry/can-the-magnetic-lorentz-force-alone-increase-a-point-charges-kinetic-energy",
				label: "Magnetic point-charge work"
			},
			{
				path: "/consensus/physics-and-chemistry/does-a-step-up-transformer-create-extra-electrical-power-when-it-raises-voltage",
				label: "Voltage conversion is not power creation"
			},
			{
				path: "/consensus/physics-and-chemistry/does-doubling-current-through-a-fixed-resistor-merely-double-its-heating-power",
				label: "Current-squared dissipation"
			},
			{
				path: "/consensus/physics-and-chemistry/must-the-electric-field-be-zero-inside-an-ordinary-current-carrying-metal",
				label: "Equilibrium versus current flow"
			}
		]
	},
	{
		slug: "reading-averages-percentages-and-probability",
		title: "Averages, percentages and probability: what does the number mean?",
		summary:
			"Check denominators, group weights, probability models and sampling uncertainty before accepting a numerical headline.",
		checkedAt: "2026-10-05",
		topics: ["consensus-foundations"],
		reviews: [
			{
				path: "/consensus/consensus-foundations/do-the-mean-and-median-always-describe-the-same-typical-value",
				label: "Mean versus median"
			},
			{
				path: "/consensus/consensus-foundations/can-group-averages-be-averaged-without-accounting-for-group-sizes",
				label: "Pooling group averages"
			},
			{
				path: "/consensus/consensus-foundations/can-combining-groups-reverse-an-association-present-within-every-group",
				label: "Simpson's paradox"
			},
			{
				path: "/consensus/consensus-foundations/is-a-percentage-point-increase-the-same-as-a-percent-increase",
				label: "Percentage points versus percent change"
			},
			{
				path: "/consensus/consensus-foundations/does-an-equal-percent-increase-and-decrease-return-a-value-to-its-starting-point",
				label: "Equal percent rises and falls"
			},
			{
				path: "/consensus/consensus-foundations/can-successive-percentage-changes-be-added-to-get-the-total-change",
				label: "Successive percentage changes"
			},
			{
				path: "/consensus/consensus-foundations/can-a-conditional-probability-be-reversed-without-changing-its-value",
				label: "Reversing conditional probabilities"
			},
			{
				path: "/consensus/consensus-foundations/are-mutually-exclusive-events-the-same-as-independent-events",
				label: "Disjoint versus independent"
			},
			{
				path: "/consensus/consensus-foundations/can-the-probabilities-of-overlapping-events-simply-be-added",
				label: "Overlapping event probabilities"
			},
			{
				path: "/consensus/consensus-foundations/does-random-sampling-without-replacement-make-successive-draws-independent",
				label: "Sampling without replacement"
			},
			{
				path: "/consensus/consensus-foundations/does-probability-zero-always-mean-an-outcome-is-impossible",
				label: "Zero probability and exact points"
			},
			{
				path: "/consensus/consensus-foundations/is-a-probability-density-above-one-an-invalid-probability",
				label: "Density heights and interval areas"
			},
			{
				path: "/consensus/consensus-foundations/must-an-expected-value-be-a-possible-individual-outcome",
				label: "Expected versus possible outcomes"
			},
			{
				path: "/consensus/consensus-foundations/does-the-law-of-large-numbers-make-the-next-independent-outcome-compensate-for-a-streak",
				label: "Streaks and convergence"
			},
			{
				path: "/consensus/consensus-foundations/does-zero-pearson-correlation-prove-that-two-variables-are-independent",
				label: "Zero correlation and dependence"
			},
			{
				path: "/consensus/consensus-foundations/are-variance-and-standard-deviation-interchangeable-measures-in-the-same-units",
				label: "Variance, deviation and units"
			},
			{
				path: "/consensus/consensus-foundations/does-a-small-standard-error-mean-individual-observations-vary-very-little",
				label: "Estimator precision versus individual spread"
			},
			{
				path: "/consensus/consensus-foundations/does-the-68-95-997-rule-apply-to-every-distribution",
				label: "Normal-model coverage"
			},
			{
				path: "/consensus/consensus-foundations/can-missing-measurements-be-replaced-by-zero-without-changing-the-conclusion",
				label: "Missing values are not zero"
			},
			{
				path: "/consensus/consensus-foundations/does-changing-histogram-bin-width-leave-the-apparent-distribution-unchanged",
				label: "Histogram display choices"
			}
		]
	},
	{
		slug: "reading-heat-and-light-claims",
		title: "Heat and light: appearances, quantities and measurements",
		summary:
			"Read temperature, thermal images, prisms, lenses and magnification without confusing appearances with complete measurements.",
		checkedAt: "2026-10-05",
		topics: ["physics-and-chemistry"],
		reviews: [
			{
				path: "/consensus/physics-and-chemistry/do-two-objects-at-the-same-temperature-contain-the-same-internal-energy",
				label: "Temperature versus internal energy"
			},
			{
				path: "/consensus/physics-and-chemistry/is-heat-a-substance-stored-inside-a-hot-object",
				label: "Heat as a transfer process"
			},
			{
				path: "/consensus/physics-and-chemistry/must-metal-that-feels-colder-than-wood-actually-be-at-a-lower-temperature",
				label: "Contact feel versus temperature"
			},
			{
				path: "/consensus/physics-and-chemistry/does-water-always-boil-at-exactly-100-degrees-celsius",
				label: "Boiling conditions and pressure"
			},
			{
				path: "/consensus/physics-and-chemistry/can-liquid-water-evaporate-without-reaching-its-boiling-point",
				label: "Evaporation below boiling"
			},
			{
				path: "/consensus/physics-and-chemistry/does-adding-energy-as-heat-always-raise-a-substances-temperature",
				label: "Energy during phase change"
			},
			{
				path: "/consensus/physics-and-chemistry/can-thermal-energy-be-transferred-across-a-vacuum",
				label: "Radiation across vacuum"
			},
			{
				path: "/consensus/physics-and-chemistry/does-ordinary-insulation-generate-heat-by-itself",
				label: "Passive insulation versus energy supply"
			},
			{
				path: "/consensus/physics-and-chemistry/does-an-infrared-thermometer-directly-reveal-exact-surface-temperature-regardless-of-emissivity",
				label: "Infrared temperature inference"
			},
			{
				path: "/consensus/physics-and-chemistry/can-an-ordinary-thermal-camera-directly-see-objects-through-an-opaque-wall",
				label: "Wall patterns versus seeing through"
			},
			{
				path: "/consensus/physics-and-chemistry/is-ordinary-white-light-a-single-visible-wavelength",
				label: "White appearance versus spectrum"
			},
			{
				path: "/consensus/physics-and-chemistry/does-an-ordinary-prism-create-new-colors-rather-than-separate-incident-light",
				label: "Prism dispersion"
			},
			{
				path: "/consensus/physics-and-chemistry/does-increasing-magnification-automatically-reveal-more-detail",
				label: "Magnification versus resolution"
			},
			{
				path: "/consensus/physics-and-chemistry/can-a-plane-mirrors-virtual-image-be-caught-on-a-screen-at-its-apparent-location",
				label: "Virtual image geometry"
			},
			{
				path: "/consensus/physics-and-chemistry/does-an-underwater-objects-apparent-depth-always-equal-its-actual-depth",
				label: "Refraction and apparent depth"
			},
			{
				path: "/consensus/physics-and-chemistry/is-a-rainbow-a-fixed-colored-object-located-at-one-place-for-every-observer",
				label: "Observer-dependent rainbows"
			},
			{
				path: "/consensus/physics-and-chemistry/do-polarizing-sunglasses-block-all-reflected-light-equally",
				label: "Polarization and partial reflection"
			},
			{
				path: "/consensus/physics-and-chemistry/does-visible-light-travel-through-ordinary-glass-at-the-vacuum-speed-of-light",
				label: "Vacuum and material phase speeds"
			},
			{
				path: "/consensus/physics-and-chemistry/does-a-single-ordinary-diverging-lens-form-a-real-image-of-a-real-object",
				label: "Conditional diverging-lens images"
			},
			{
				path: "/consensus/physics-and-chemistry/is-earths-clear-daytime-sky-blue-mainly-because-it-reflects-the-ocean",
				label: "Clear-sky atmospheric scattering"
			}
		]
	},
	{
		slug: "reading-flood-and-groundwater-claims",
		title: "Floods and groundwater: reading the connected system",
		summary: "Distinguish probability, river levels, recharge, underground storage and bounded flood protection.",
		checkedAt: "2026-10-05",
		topics: ["earth-and-geoscience"],
		reviews: [
			{
				path: "/consensus/earth-and-geoscience/does-a-100-year-flood-occur-only-once-every-hundred-years",
				label: "Flood probability versus a calendar"
			},
			{
				path: "/consensus/earth-and-geoscience/does-the-same-river-level-always-mean-the-same-water-flow",
				label: "River height versus discharge"
			},
			{
				path: "/consensus/earth-and-geoscience/does-one-rainy-season-quickly-refill-every-aquifer",
				label: "Rainfall versus aquifer recovery"
			},
			{
				path: "/consensus/earth-and-geoscience/can-groundwater-pumping-reduce-flow-in-rivers-and-streams",
				label: "Pumping and streamflow depletion"
			},
			{
				path: "/consensus/earth-and-geoscience/does-every-artesian-well-flow-above-ground-without-a-pump",
				label: "Artesian head versus flowing wells"
			},
			{
				path: "/consensus/earth-and-geoscience/are-springs-an-unlimited-source-of-groundwater",
				label: "Spring flow and finite supply"
			},
			{
				path: "/consensus/earth-and-geoscience/does-a-porous-rock-necessarily-make-a-productive-aquifer",
				label: "Porosity versus permeability"
			},
			{
				path: "/consensus/earth-and-geoscience/are-rivers-always-fed-by-groundwater-rather-than-recharging-aquifers",
				label: "Gaining and losing reaches"
			},
			{
				path: "/consensus/earth-and-geoscience/can-flooding-occur-without-rain-at-that-location",
				label: "Upstream causes of local flooding"
			},
			{
				path: "/consensus/earth-and-geoscience/do-levees-eliminate-all-flood-risk",
				label: "Levees and residual risk"
			}
		]
	},
	{
		slug: "reading-tides-waves-and-ocean-measurements",
		title: "Waves, tides and ocean maps: know the measurement",
		summary:
			"Separate wave patterns, tidal range, current speed, storm-water components and depth-resolved observations.",
		checkedAt: "2026-10-05",
		topics: ["oceans-and-marine-science"],
		reviews: [
			{
				path: "/consensus/oceans-and-marine-science/do-ocean-waves-carry-the-same-water-all-the-way-from-origin-to-shore",
				label: "Wave patterns versus water parcels"
			},
			{
				path: "/consensus/oceans-and-marine-science/does-every-coast-have-two-equal-high-tides-each-day",
				label: "Different coastal tide cycles"
			},
			{
				path: "/consensus/oceans-and-marine-science/do-spring-tides-happen-only-in-spring",
				label: "Spring tides versus the season"
			},
			{
				path: "/consensus/oceans-and-marine-science/are-neap-tides-the-same-thing-as-low-tide",
				label: "Neap range versus low water"
			},
			{
				path: "/consensus/oceans-and-marine-science/is-high-tide-always-the-time-of-strongest-tidal-current",
				label: "Tide height versus current phase"
			},
			{
				path: "/consensus/oceans-and-marine-science/does-wind-alone-determine-storm-surge-height",
				label: "Surge factors and total water level"
			},
			{
				path: "/consensus/oceans-and-marine-science/do-ocean-currents-move-water-only-horizontally",
				label: "Vertical ocean motion"
			},
			{
				path: "/consensus/oceans-and-marine-science/does-ocean-salt-come-only-from-rivers",
				label: "River inputs and seafloor exchange"
			},
			{
				path: "/consensus/oceans-and-marine-science/does-all-seawater-have-the-same-salinity",
				label: "Variable salinity"
			},
			{
				path: "/consensus/oceans-and-marine-science/is-ocean-temperature-uniform-from-surface-to-seafloor",
				label: "Temperature profiles versus surface maps"
			}
		]
	},
	{
		slug: "reading-space-observations",
		title: "Space headlines: what the observations establish",
		summary:
			"Separate sky geometry, processed images, indirect planet measurements and conditional models from stronger claims.",
		checkedAt: "2026-10-05",
		topics: ["astronomy-and-space"],
		reviews: [
			{
				path: "/consensus/astronomy-and-space/are-astronauts-weightless-because-there-is-no-gravity-in-orbit",
				label: "Orbital free fall and gravity"
			},
			{
				path: "/consensus/astronomy-and-space/are-moon-phases-caused-by-earths-shadow",
				label: "Moon phases versus eclipse shadows"
			},
			{
				path: "/consensus/astronomy-and-space/do-planets-reverse-their-orbits-during-retrograde-motion",
				label: "Apparent retrograde motion"
			},
			{
				path: "/consensus/astronomy-and-space/does-a-brighter-looking-star-have-to-be-closer",
				label: "Brightness, distance and parallax"
			},
			{
				path: "/consensus/astronomy-and-space/do-distant-galaxy-images-show-the-galaxies-as-they-are-now",
				label: "Galaxy images and lookback time"
			},
			{
				path: "/consensus/astronomy-and-space/are-webbs-color-images-what-human-eyes-would-see",
				label: "Measured infrared and display color"
			},
			{
				path: "/consensus/astronomy-and-space/does-an-exoplanet-transit-alone-reveal-its-mass-and-composition",
				label: "Planet sizes, masses and interiors"
			},
			{
				path: "/consensus/astronomy-and-space/does-being-in-the-habitable-zone-guarantee-a-habitable-planet",
				label: "Conditional habitable zones"
			},
			{
				path: "/consensus/astronomy-and-space/can-gravitational-lensing-create-multiple-images-of-one-galaxy",
				label: "Repeated lens images"
			},
			{
				path: "/consensus/astronomy-and-space/does-dark-energy-mean-scientists-have-identified-the-cause-of-cosmic-acceleration",
				label: "Acceleration and unresolved mechanisms"
			}
		]
	},
	{
		slug: "reading-fossil-and-ancestry-evidence",
		title: "Fossils and ancestry: reading the evidence chain",
		summary:
			"Separate dating clocks, reconstructed traits, inherited lineages, ancient menus and exceptional DNA preservation.",
		checkedAt: "2026-10-04",
		topics: ["human-origins-and-paleontology"],
		reviews: [
			{
				path: "/consensus/human-origins-and-paleontology/did-upright-walking-evolve-before-large-human-brains",
				label: "Walking before major brain enlargement"
			},
			{
				path: "/consensus/human-origins-and-paleontology/can-radiocarbon-dating-date-million-year-old-fossils",
				label: "Radiocarbon and older fossil dates"
			},
			{
				path: "/consensus/human-origins-and-paleontology/does-mitochondrial-eve-mean-humans-descended-from-one-woman-alone",
				label: "Maternal lineages and the whole genealogy"
			},
			{
				path: "/consensus/human-origins-and-paleontology/did-all-palaeolithic-people-eat-one-universal-diet",
				label: "Regional ancient diets and their limits"
			},
			{
				path: "/consensus/human-origins-and-paleontology/can-ancient-dna-be-recovered-from-every-fossil",
				label: "Fossil shape and genetic preservation"
			}
		]
	},
	{
		slug: "browsing-privacy",
		title: "Browsing privacy: what each tool actually protects",
		summary: "Distinguish local records, protected connections, website trust and the limits of VPN anonymity.",
		checkedAt: "2026-10-04",
		topics: ["digital-security-and-privacy"],
		reviews: [
			{
				path: "/consensus/digital-security-and-privacy/does-private-or-incognito-browsing-make-you-anonymous",
				label: "Private windows and remote observation"
			},
			{
				path: "/consensus/digital-security-and-privacy/does-https-or-a-padlock-mean-a-website-is-trustworthy",
				label: "Connection protection and website trust"
			},
			{
				path: "/consensus/digital-security-and-privacy/does-a-vpn-make-you-completely-anonymous-online",
				label: "VPN routing and remaining identifiers"
			}
		]
	},
	{
		slug: "food-storage-and-safety",
		title: "Food storage: growth, toxins and quality",
		summary:
			"Understand what chilling, freezing, heating and packaging establish, and why normal smell cannot certify safety.",
		checkedAt: "2026-09-12",
		topics: ["agriculture-and-food-systems"],
		reviews: [
			{
				path: "/consensus/agriculture-and-food-systems/does-refrigeration-keep-leftovers-safe-indefinitely",
				label: "Refrigeration and leftover storage"
			},
			{
				path: "/consensus/agriculture-and-food-systems/does-freezing-food-kill-all-pathogens",
				label: "Freezing and pathogen survival"
			},
			{
				path: "/consensus/agriculture-and-food-systems/does-reheating-make-improperly-stored-food-safe",
				label: "Reheating and preformed toxins"
			},
			{
				path: "/consensus/agriculture-and-food-systems/can-smell-and-appearance-tell-whether-food-is-safe",
				label: "Smell, appearance and safety"
			},
			{
				path: "/consensus/agriculture-and-food-systems/does-vacuum-sealing-replace-refrigeration",
				label: "Vacuum packaging and the cold chain"
			}
		]
	},
	{
		slug: "account-protection",
		title: "Account protection: threats, login and recovery",
		summary:
			"Understand what passkeys, codes and password managers protect, and why recovery and maintenance need separate attention.",
		checkedAt: "2026-09-12",
		topics: ["digital-security-and-privacy"],
		reviews: [
			{
				path: "/consensus/digital-security-and-privacy/do-passkeys-prevent-phishing-and-all-account-takeovers",
				label: "Passkey phishing resistance and its limits"
			},
			{
				path: "/consensus/digital-security-and-privacy/can-one-time-authenticator-codes-still-be-phished",
				label: "One-time codes and live phishing"
			},
			{
				path: "/consensus/digital-security-and-privacy/does-installing-a-password-manager-eliminate-password-reuse",
				label: "Password managers and reuse"
			},
			{
				path: "/consensus/digital-security-and-privacy/do-synced-passkeys-prevent-lockout-when-a-device-is-lost",
				label: "Syncing and recovery"
			},
			{
				path: "/consensus/digital-security-and-privacy/does-changing-passwords-every-month-improve-account-security",
				label: "Routine password expiry"
			}
		]
	},
	{
		slug: "hearing-protection",
		title: "Hearing protection: understand ratings, fit and lasting use",
		summary:
			"Read beyond the package rating: fitting skill, training retention, device roles and the limits of combining protectors.",
		checkedAt: "2026-09-12",
		topics: ["health-and-medicine"],
		reviews: [
			{
				path: "/consensus/health-and-medicine/does-a-hearing-protectors-noise-reduction-rating-predict-my-protection",
				label: "Product ratings and individual fit"
			},
			{
				path: "/consensus/health-and-medicine/does-individual-earplug-fit-training-improve-noise-attenuation",
				label: "Immediate effects of fitting instruction"
			},
			{
				path: "/consensus/health-and-medicine/does-earplug-fit-training-provide-lasting-protection-without-refreshers",
				label: "Retaining fitting skills"
			},
			{
				path: "/consensus/health-and-medicine/are-noise-cancelling-headphones-a-substitute-for-hearing-protection",
				label: "Noise cancellation and protection"
			},
			{
				path: "/consensus/health-and-medicine/can-you-add-earplug-and-earmuff-ratings-for-double-hearing-protection",
				label: "Limits of combined protection"
			}
		]
	},
	{
		slug: "mosquito-bite-prevention",
		title: "Mosquito prevention: read beyond the repellent label",
		summary:
			"Understand concentration, delivery, protection-time studies and the limits of newer indoor malaria-prevention evidence.",
		checkedAt: "2026-09-12",
		topics: ["health-and-medicine"],
		reviews: [
			{
				path: "/consensus/health-and-medicine/does-a-higher-repellent-concentration-mean-proportionally-better-mosquito-protection",
				label: "Concentration and duration"
			},
			{
				path: "/consensus/health-and-medicine/is-lemon-eucalyptus-essential-oil-equivalent-to-a-registered-ole-or-pmd-repellent",
				label: "OLE/PMD versus essential oil"
			},
			{
				path: "/consensus/health-and-medicine/do-repellent-wristbands-protect-as-well-as-skin-applied-mosquito-repellents",
				label: "Wristbands and delivery"
			},
			{
				path: "/consensus/health-and-medicine/do-laboratory-mosquito-repellent-protection-times-predict-everyday-protection",
				label: "Interpreting protection time"
			},
			{
				path: "/consensus/health-and-medicine/do-spatial-emanators-prevent-malaria-and-can-they-replace-bed-nets",
				label: "Supplementary indoor spatial protection"
			}
		]
	},
	{
		slug: "household-water-treatment",
		title: "Water treatment: match the method to the contaminant",
		summary:
			"Understand filter certification, boiling and UV limits, hardness control, and the water-use trade-offs of reverse osmosis.",
		checkedAt: "2026-09-12",
		topics: ["climate-and-environment", "health-and-medicine"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/does-boiling-water-remove-fuel-and-toxic-chemicals",
				label: "Boiling and chemical contamination"
			},
			{
				path: "/consensus/climate-and-environment/does-water-filter-certification-mean-it-removes-every-contaminant",
				label: "Contaminant-specific certification"
			},
			{
				path: "/consensus/climate-and-environment/does-ultraviolet-water-disinfection-also-remove-lead-nitrate-and-pfas",
				label: "UV and chemical-removal limits"
			},
			{
				path: "/consensus/climate-and-environment/do-reverse-osmosis-systems-all-use-the-same-amount-of-reject-water",
				label: "RO water use and efficiency"
			},
			{
				path: "/consensus/climate-and-environment/does-softening-hard-water-make-it-microbiologically-safe",
				label: "Softening is not disinfection"
			}
		]
	},
	{
		slug: "exercise-and-blood-pressure",
		title: "Exercise and blood pressure: beyond the rankings",
		summary:
			"Understand resting versus 24-hour pressure, uncertain exercise rankings, modeled doses and the timing of readings.",
		checkedAt: "2026-09-12",
		topics: ["exercise-and-sports-science", "cardiovascular-metabolic-and-kidney-health"],
		reviews: [
			{
				path: "/consensus/exercise-and-sports-science/do-exercise-programs-lower-resting-blood-pressure-in-middle-aged-and-older-adults",
				label: "Training and resting pressure"
			},
			{
				path: "/consensus/exercise-and-sports-science/are-isometric-exercises-clearly-best-for-lowering-blood-pressure",
				label: "Isometric exercise ranking claims"
			},
			{
				path: "/consensus/exercise-and-sports-science/does-lower-clinic-blood-pressure-after-exercise-imply-lower-24-hour-pressure",
				label: "Clinic versus 24-hour results"
			},
			{
				path: "/consensus/exercise-and-sports-science/does-research-identify-one-optimal-exercise-dose-for-lowering-blood-pressure",
				label: "Dose-response model limits"
			},
			{
				path: "/consensus/exercise-and-sports-science/can-post-exercise-readings-establish-long-term-blood-pressure-control",
				label: "Measurement timing"
			},
			{
				path: "/consensus/cardiovascular-metabolic-and-kidney-health/does-home-blood-pressure-monitoring-help-control-hypertension",
				label: "Home monitoring linked to care"
			}
		]
	},
	{
		slug: "choosing-air-cleaning",
		title: "Air cleaning: match the device to the problem",
		summary:
			"Understand particle ratings, DIY designs, gas-removal limits and whole-system operation before comparing air cleaners.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "health-and-medicine"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/does-a-high-efficiency-filter-rating-guarantee-clean-air-throughout-a-room",
				label: "Filter efficiency versus room cleaning"
			},
			{
				path: "/consensus/climate-and-environment/can-diy-box-fan-air-cleaners-match-commercial-particle-cleaners",
				label: "DIY and commercial particle cleaners"
			},
			{
				path: "/consensus/climate-and-environment/do-hepa-air-cleaners-remove-gases-and-carbon-monoxide",
				label: "Particles, gases and carbon monoxide"
			},
			{
				path: "/consensus/climate-and-environment/are-ozone-generators-safe-and-effective-air-cleaners-for-occupied-homes",
				label: "Ozone in occupied spaces"
			},
			{
				path: "/consensus/climate-and-environment/does-a-higher-merv-filter-automatically-improve-whole-home-air-cleaning",
				label: "MERV and whole-system operation"
			}
		]
	},
	{
		slug: "caffeine-tolerance-and-sleep",
		title: "Caffeine: tolerance, performance, and the sleep trade-off",
		summary:
			"Why coffee can feel less effective, which benefits can persist, and why sleep changes the calculation.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "sports-nutrition-and-supplements", "sleep-and-circadian-health"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/does-caffeine-become-less-effective-with-regular-daily-use",
				label: "Does caffeine become less effective with daily use?"
			},
			{
				path: "/consensus/sports-nutrition-and-supplements/does-caffeine-improve-exercise-performance-in-habitual-caffeine-users",
				label: "Exercise performance in habitual caffeine users"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-caffeine-consumed-six-hours-before-bedtime-still-disrupt-sleep",
				label: "Caffeine before bedtime and sleep disruption"
			}
		]
	},
	{
		slug: "making-sense-of-supplements",
		title: "Supplements: useful for what, and for whom?",
		summary:
			"Separate correcting a deficiency, improving a specific outcome, and unsupported promises of better health.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "sports-nutrition-and-supplements"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/are-dietary-supplements-fda-approved-like-drugs",
				label: "Are supplements FDA-approved like drugs?"
			},
			{
				path: "/consensus/nutrition-and-diet/does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe",
				label: "Creatine, strength training, and safety"
			},
			{
				path: "/consensus/nutrition-and-diet/do-vitamin-e-or-beta-carotene-supplements-prevent-heart-disease-or-cancer",
				label: "Vitamin E, beta carotene, and disease prevention"
			}
		]
	},
	{
		slug: "comparing-electricity-options",
		title: "Energy choices: compare the whole system",
		summary:
			"Read claims about nuclear, wind, solar, and fossil fuels using consistent boundaries for emissions, health, and reliability.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "energy-and-infrastructure"],
		reviews: [
			{
				path: "/consensus/energy-and-infrastructure/do-lower-heat-pump-energy-bills-guarantee-lower-total-cost",
				label: "Heat-pump bills versus lifetime costs"
			},
			{
				path: "/consensus/energy-and-infrastructure/do-heat-pump-efficiency-ratings-predict-a-homes-seasonal-performance",
				label: "Heat-pump ratings and measurement boundaries"
			},
			{
				path: "/consensus/climate-and-environment/is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
				label: "Nuclear power and fossil-fuel health risks"
			},
			{
				path: "/consensus/climate-and-environment/do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
				label: "Lifecycle emissions of wind, solar, and fossil fuels"
			},
			{
				path: "/consensus/climate-and-environment/is-recent-global-warming-mainly-caused-by-human-activity",
				label: "Why reducing greenhouse-gas emissions matters"
			}
		]
	},
	{
		slug: "sleep-and-insomnia",
		title: "Sleep: enough rest, better quality, and effective insomnia care",
		summary:
			"Distinguish sleep opportunity, symptoms, and structured treatment, including what the evidence says about CBT-I.",
		checkedAt: "2026-09-11",
		topics: ["sleep-and-circadian-health", "neuroscience-and-psychology"],
		reviews: [
			{
				path: "/consensus/sleep-and-circadian-health/do-most-healthy-adults-need-at-least-seven-hours-of-sleep",
				label: "How much sleep do most adults need?"
			},
			{
				path: "/consensus/sleep-and-circadian-health/is-sleep-hygiene-alone-an-effective-treatment-for-chronic-insomnia",
				label: "Is sleep hygiene enough for chronic insomnia?"
			},
			{
				path: "/consensus/neuroscience-and-psychology/is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia",
				label: "CBT-I as an initial insomnia treatment"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-brief-behavioral-treatment-improve-chronic-insomnia",
				label: "What brief behavioral care can establish"
			},
			{
				path: "/consensus/sleep-and-circadian-health/does-fully-automated-digital-cbt-i-match-face-to-face-therapy",
				label: "Automated and face-to-face care are different comparisons"
			},
			{
				path: "/consensus/sleep-and-circadian-health/can-sleep-restriction-therapy-temporarily-increase-daytime-sleepiness",
				label: "Early sleepiness during treatment"
			},
			{
				path: "/consensus/sleep-and-circadian-health/should-habitual-loud-snoring-prompt-evaluation-for-sleep-apnea",
				label: "When loud snoring calls for assessment"
			}
		]
	},
	{
		slug: "exercise-without-magic-numbers",
		title: "Exercise: benefits without magic numbers",
		summary:
			"Understand activity targets, step-count evidence, and why the best comparison starts with the outcome and the person.",
		checkedAt: "2026-09-11",
		topics: ["exercise-and-sports-science"],
		reviews: [
			{
				path: "/consensus/exercise-and-sports-science/does-physical-activity-below-the-weekly-guideline-still-improve-health",
				label: "Benefits below the weekly activity target"
			},
			{
				path: "/consensus/exercise-and-sports-science/are-10000-daily-steps-necessary-for-health-benefits",
				label: "Are 10,000 daily steps necessary?"
			},
			{
				path: "/consensus/exercise-and-sports-science/must-weights-be-heavy-to-build-muscle",
				label: "Do weights have to be heavy to build muscle?"
			}
		]
	},
	{
		slug: "reading-vaccine-evidence",
		title: "Vaccines: benefits, harms, and what safety reports can tell us",
		summary:
			"Use MMR as a worked example for comparing outcomes, interpreting safety signals, and weighing causal evidence.",
		checkedAt: "2026-09-11",
		topics: ["health-and-medicine", "infection-immunity-and-vaccines"],
		reviews: [
			{
				path: "/consensus/health-and-medicine/is-the-mmr-vaccine-safe-and-highly-effective-at-preventing-measles",
				label: "MMR effectiveness and safety"
			},
			{
				path: "/consensus/health-and-medicine/does-the-mmr-vaccine-cause-autism",
				label: "MMR and the autism evidence"
			},
			{
				path: "/consensus/health-and-medicine/can-vaers-reports-prove-that-a-vaccine-caused-an-adverse-event",
				label: "What VAERS reports can and cannot establish"
			}
		]
	},
	{
		slug: "making-sense-of-nutrition",
		title: "Nutrition: patterns, substitutions, and meaningful outcomes",
		summary:
			"Read diet findings through the comparison tested, with examples from saturated fat, Mediterranean diets, and food processing.",
		checkedAt: "2026-09-11",
		topics: ["nutrition-and-diet", "cardiovascular-metabolic-and-kidney-health"],
		reviews: [
			{
				path: "/consensus/nutrition-and-diet/does-it-matter-what-replaces-saturated-fat",
				label: "Why the replacement for saturated fat matters"
			},
			{
				path: "/consensus/nutrition-and-diet/does-a-mediterranean-style-diet-reduce-cardiovascular-events-in-high-risk-adults",
				label: "Mediterranean diets and cardiovascular events"
			},
			{
				path: "/consensus/nutrition-and-diet/are-ultra-processed-foods-linked-to-worse-health-outcomes-and-how-much-is-causation-versus-confounding",
				label: "Ultra-processed foods: causation and confounding"
			}
		]
	},
	{
		slug: "understanding-climate-attribution",
		title: "Climate attribution: from global warming to individual events",
		summary:
			"Separate the cause of long-term warming from estimates of how climate change affects a particular event's probability or intensity.",
		checkedAt: "2026-09-11",
		topics: ["climate-and-environment", "earth-and-geoscience"],
		reviews: [
			{
				path: "/consensus/climate-and-environment/is-recent-global-warming-mainly-caused-by-human-activity",
				label: "Human influence on recent global warming"
			},
			{
				path: "/consensus/climate-and-environment/is-the-sun-causing-recent-global-warming",
				label: "Testing the Sun as an explanation"
			},
			{
				path: "/consensus/climate-and-environment/can-scientists-attribute-part-of-a-single-extreme-weather-event-to-climate-change",
				label: "Attributing individual extreme weather events"
			}
		]
	},
	{
		slug: "understanding-evolution",
		title: "Evolution: inherited change, branching ancestry, and the evidence",
		summary:
			"Connect selection, chance, shared ancestry, fossils, and observed antibiotic resistance without turning evolution into a ladder or a plan.",
		checkedAt: "2026-09-11",
		topics: ["biology-and-evolution", "human-origins-and-paleontology"],
		reviews: [
			{
				path: "/consensus/biology-and-evolution/is-evolution-just-a-theory",
				label: "What a scientific theory means"
			},
			{
				path: "/consensus/biology-and-evolution/did-humans-evolve-from-chimpanzees-living-today",
				label: "Humans, chimpanzees, and common ancestry"
			},
			{
				path: "/consensus/biology-and-evolution/is-antibiotic-resistance-an-example-of-evolution",
				label: "Antibiotic resistance as observable evolution"
			},
			{
				path: "/consensus/biology-and-evolution/is-evolution-entirely-random",
				label: "Selection and chance are different mechanisms"
			}
		]
	},
	{
		slug: "interpreting-medical-evidence",
		title: "Medical evidence: risk, certainty, and outcomes that matter",
		summary:
			"Understand absolute versus relative effects, confidence, surrogate endpoints, and evidence missing from published studies.",
		checkedAt: "2026-09-11",
		topics: ["consensus-foundations", "media-misinformation", "bias-incentives"],
		reviews: [
			{
				path: "/consensus/media-misinformation/can-relative-risk-tell-you-how-likely-something-is-without-absolute-risk",
				label: "Relative risk needs an absolute baseline"
			},
			{
				path: "/consensus/consensus-foundations/does-improving-a-surrogate-endpoint-prove-patients-will-benefit",
				label: "Surrogate endpoints versus patient benefit"
			},
			{
				path: "/consensus/consensus-foundations/does-statistical-significance-tell-you-whether-an-effect-is-large-or-important",
				label: "Statistical significance and practical importance"
			},
			{
				path: "/consensus/bias-incentives/does-publication-bias-skew-the-published-scientific-record",
				label: "How missing evidence can distort the record"
			}
		]
	}
];

export function guidesForTopic(topic: string) {
	return readingGuides.filter((guide) => guide.topics.includes(topic));
}

export function guidesForReview(path: string) {
	return readingGuides.filter((guide) => guide.reviews.some((review) => review.path === path));
}
