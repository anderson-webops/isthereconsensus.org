import type { ReadingGuideContent } from "./types";

export const airCleaningGuide: ReadingGuideContent = {
	takeaway:
		"Match the cleaner to the pollutant and the space, then check whether it can run consistently. A filter label alone cannot tell you how clean a home will become.",
	scope: "A practical guide to interpreting particle-cleaner evidence, not a product endorsement, electrical assembly manual, emergency plan or personalized medical recommendation. Laboratory measurements, household exposure and health benefits remain separate questions.",
	sections: [
		{
			id: "pollutant",
			title: "Start with what needs removing",
			paragraphs: [
				{
					text: "Indoor pollution is not one substance. Fine particles, gaseous chemicals and moisture problems need different controls. A HEPA or MERV particle filter captures particles in the air passing through it; it does not thereby remove gaseous hazards. Some devices add a sorbent such as activated carbon for selected gases. That adds another function with its own capacity, replacement needs and performance limits, rather than making the particle label a promise of universal cleaning.",
					sources: ["technical", "consumer"]
				},
				{
					text: "EPA places source reduction and ventilation with clean outdoor air alongside filtration. The qualification about outdoor air matters during smoke events. A cleaner can reduce airborne particles without fixing a moisture source, unsafe combustion equipment or the entire mixture in smoke. Odor changes and a lower particle-sensor reading should not be used to declare every hazard gone. Ordinary air cleaners are not carbon-monoxide protection systems.",
					sources: ["technical", "consumer"]
				}
			]
		},
		{
			id: "labels",
			title: "Separate efficiency from clean-air delivery",
			paragraphs: [
				{
					text: "Single-pass efficiency describes the fraction a filter captures from air that reaches it. Clean-air delivery rate, or CADR, accounts for the particle-cleaned airflow a device supplies. A very efficient filter with little airflow may do less room cleaning than another system processing much more air. Neither number is a percentage of disease prevented. Compare the appropriate particle CADR, not an impressive filter percentage beside a vague maximum-room-size claim.",
					sources: ["technical"]
				},
				{
					text: "The operating setting is part of the measurement. A published CADR is typically the highest-speed result, while quieter settings can provide less cleaning. Room volume also matters: a floor-area recommendation assumes a ceiling height, and an open-plan space is not necessarily several isolated rooms. Keep airflow unobstructed and consider whether noise or drafts will discourage sustained use. These details change delivered cleaning without changing the label printed on the filter.",
					sources: ["consumer", "technical"]
				}
			]
		},
		{
			id: "designs",
			title: "Read the DIY comparison as a specified experiment",
			paragraphs: [
				{
					text: "Holder and colleagues tested DIY configurations and a small commercial comparator in the same room-sized chamber using generated pine-needle smoke. Adding a shroud and increasing filter area improved clean-air delivery for the tested designs. The four-filter box delivered substantially more clean air than the simplest fan-and-filter assembly while drawing similar electrical power; the small commercial device used less power. Those are useful design trade-offs, not proof that every DIY cleaner is superior to every commercial unit.",
					sources: ["holder"]
				},
				{
					text: "The comparison preserves each device's specified fan setting and the paper's reported variation. It does not transfer laboratory CFM into a household pollution percentage or an infection-prevention claim. Test aerosols, smoke concentration, filter construction and fan models can change results. The study also found poor performance with heavily loaded filters, but its artificial loading procedure did not establish a universal number of days before replacement. A current shopping or lifetime-cost ranking would require additional evidence.",
					sources: ["holder"]
				}
			]
		},
		{
			id: "operation",
			title: "Check the whole system and its safety limits",
			paragraphs: [
				{
					text: "For central filtration, a higher MERV rating is only one part of the system. The filter must fit, the fan must accommodate it, and air must actually move through it. A heating or cooling system may run intermittently, so an installed filter is not necessarily working all day. More fan operation can improve filtration but increase energy use and affect cooling-season humidity control. EPA advises an appropriate high-efficiency filter with compatibility checked when uncertain, not forcing the highest-rated filter into any slot.",
					sources: ["consumer"]
				},
				{
					text: "For DIY units, follow the current EPA safety guidance and the fan manufacturer's precautions. EPA's summary of testing on five fan models is reassuring within its scope, not certification of every improvised assembly. Newer safety-marked fans, an undamaged device and working smoke alarms matter. Separately, avoid cleaners that intentionally generate ozone in occupied spaces. Ozone can irritate lungs and create secondary pollutants; an establishment number on packaging is not an EPA endorsement of safety or effectiveness.",
					sources: ["diy", "technical"]
				}
			]
		}
	],
	questions: [
		"Which pollutant does the device actually remove?",
		"What CADR is available at the speed I can tolerate, and for what room volume?",
		"What maintenance and operating time does the evidence assume?",
		"Is the claimed outcome a laboratory measurement, household exposure or a health benefit?"
	],
	sources: [
		{
			id: "technical",
			title: "EPA (2018): Residential Air Cleaners, Third Edition",
			url: "https://www.epa.gov/sites/default/files/2018-07/documents/residential_air_cleaners_-_a_technical_summary_3rd_edition.pdf",
			kind: "Institutional technical synthesis",
			note: "Selected efficiency, gas-removal, ozone and CADR sections checked; the CADR page was visually inspected. This is the 2018 report, not a new review inferred from a webpage date."
		},
		{
			id: "consumer",
			title: "EPA: Guide to Air Cleaners in the Home",
			url: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home",
			kind: "Consumer guidance",
			note: "Operating speed, room volume, source control and HVAC compatibility checked. This related guide is not independent experimental replication of the technical report."
		},
		{
			id: "holder",
			title: "Holder et al. (2022): DIY air-cleaner design and simulated wildfire smoke",
			url: "https://onlinelibrary.wiley.com/doi/10.1111/ina.13163",
			kind: "Controlled chamber experiment",
			note: "Publisher methods, Tables 1–2 and limitations checked. EPA-funded study of selected designs; not a clinical trial or a market-wide product ranking."
		},
		{
			id: "diy",
			title: "EPA: Research on DIY Air Cleaners",
			url: "https://www.epa.gov/air-research/research-diy-air-cleaners-reduce-wildfire-smoke-indoors",
			kind: "Research and safety guidance",
			note: "Limited five-model safety-test scope and operating precautions checked. Its performance summary repeats Holder et al., not an additional independent experiment."
		}
	]
};
