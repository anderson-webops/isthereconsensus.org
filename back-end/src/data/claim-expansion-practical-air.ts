import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-11T23:35:23.000Z";
const existing = "do-portable-hepa-air-cleaners-reduce-indoor-fine-particle-pollution";
export const airSlugs = {
	ratings: "does-a-high-efficiency-filter-rating-guarantee-clean-air-throughout-a-room",
	diy: "can-diy-box-fan-air-cleaners-match-commercial-particle-cleaners",
	gases: "do-hepa-air-cleaners-remove-gases-and-carbon-monoxide",
	ozone: "are-ozone-generators-safe-and-effective-air-cleaners-for-occupied-homes",
	hvac: "does-a-higher-merv-filter-automatically-improve-whole-home-air-cleaning"
};
export const airPracticalGaps = [
	{
		slug: airSlugs.ratings,
		gap: "Separates single-pass filter efficiency from clean-air delivery, room volume and operating speed; the existing review establishes general particle reduction, not what a label predicts.",
		relatedExistingSlugs: [existing]
	},
	{
		slug: airSlugs.diy,
		gap: "Examines matched DIY construction designs and their power and usability trade-offs against one commercial comparator, not generic HEPA effectiveness.",
		relatedExistingSlugs: [existing]
	},
	{
		slug: airSlugs.gases,
		gap: "Addresses the pollutant-class boundary between particle filtration and gas sorption, including why carbon monoxide protection cannot be inferred from a particle rating.",
		relatedExistingSlugs: [existing]
	},
	{
		slug: airSlugs.ozone,
		gap: "Examines intentional ozone production, reaction byproducts and occupied-space safety rather than merely listing air-cleaner technologies.",
		relatedExistingSlugs: [existing]
	},
	{
		slug: airSlugs.hvac,
		gap: "Examines whole-system filter compatibility, airflow, bypass and fan runtime, distinct from the rating of a self-contained portable cleaner.",
		relatedExistingSlugs: [
			existing,
			"does-improving-indoor-ventilation-and-filtration-reduce-respiratory-virus-spread"
		]
	}
];

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return {
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: checkedAt,
		statusSources: [entry.url!],
		...entry
	};
}
export const airSources = {
	coSafety: source({ kind: "guideline", title: "Carbon Monoxide Poisoning: Protect Your Family and Yourself Factsheet", publisher: "US Environmental Protection Agency", url: "https://www.epa.gov/indoor-air-quality-iaq/carbon-monoxide-poisoning-protect-your-family-and-yourself-factsheet", stance: "context", order: 3, note: "Full text checked for the separate roles of CO alarms and proper fuel-appliance installation, ventilation and maintenance. This is prevention guidance, not evidence that a particle cleaner controls carbon monoxide. No placement distances or legal requirements are generalized here." }),
	technical: source({
		kind: "guideline",
		title: "Residential Air Cleaners: A Technical Summary, Third Edition",
		publisher: "US Environmental Protection Agency",
		year: 2018,
		url: "https://www.epa.gov/sites/default/files/2018-07/documents/residential_air_cleaners_-_a_technical_summary_3rd_edition.pdf",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Selected full-text sections checked: efficiency versus effectiveness (p. 16), gas sorbents (pp. 29–33), CADR (pp. 34–35) and HVAC operation. CADR page visually checked. This is the 2018 edition, not new research dated by a website update. No formal appraisal completed; no source correction identified in the consulted record, not an exhaustive integrity audit."
	}),
	consumer: source({
		kind: "guideline",
		title: "Guide to Air Cleaners in the Home, Second Edition",
		publisher: "US Environmental Protection Agency",
		year: 2018,
		url: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home",
		stance: "context",
		order: 2,
		note: "Full consumer guide checked for room sizing, fan speed, source control, gas-filter limits, MERV compatibility, bypass and ozone caution. It is related EPA guidance, not an independent trial. Historical technical-standard references are not presented as current legal requirements."
	}),
	lab: source({
		kind: "landmark_study",
		title: "Impact of do-it-yourself air cleaner design on the reduction of simulated wildfire smoke in a controlled chamber environment",
		publisher: "Indoor Air",
		year: 2022,
		doi: "10.1111/ina.13163",
		url: "https://onlinelibrary.wiley.com/doi/10.1111/ina.13163",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Consensus record fetched; publisher full-text methods, Tables 1–2, results, limitations and disclosures checked. A 29.3 m³ chamber used pine-needle smoke and at least three replicates per condition, with a modified AHAM protocol and background decay subtraction. Reported plus/minus values are retained as reported variation, not relabeled as 95% confidence intervals. EPA-funded; authors declare no conflict. No formal appraisal or independent reproduction."
	}),
	diyGuidance: source({
		kind: "guideline",
		title: "Research on DIY Air Cleaners to Reduce Wildfire Smoke Indoors",
		publisher: "US Environmental Protection Agency",
		url: "https://www.epa.gov/air-research/research-diy-air-cleaners-reduce-wildfire-smoke-indoors",
		stance: "context",
		order: 2,
		note: "Design and limited UL safety-testing summaries checked. The numerical design summary derives from Holder et al., not another independent experiment. Safety testing covered five fan models, not every assembly. EPA advises newer, safety-marked fans, manufacturer precautions and working smoke alarms; this review is not an electrical construction manual."
	}),
	field: source({
		kind: "landmark_study",
		title: "Usage and impact of a do-it-yourself air cleaner on residential PM2.5 in a smoke-impacted community",
		publisher: "Atmospheric Environment",
		year: 2024,
		doi: "10.1016/j.atmosenv.2024.120650",
		url: "https://www.osti.gov/servlets/purl/2580861",
		stance: "context",
		order: 3,
		note: "Published PDF abstract, limitations and disclosures checked. Two small sequential, nonrandomized pilots on the Hoopa Valley Indian Reservation: eight wildfire and eleven wood-stove homes. Prior cleaner ownership, changing smoke and noise/cooling affected interpretation. Not a replication of the four-filter laboratory comparison. EPA-supported; authors report no known competing interests. No formal appraisal."
	}),
	ozone: source({
		kind: "guideline",
		title: "Ozone Generators that are Sold as Air Cleaners",
		publisher: "US Environmental Protection Agency",
		url: "https://www.epa.gov/indoor-air-quality-iaq/ozone-generators-are-sold-air-cleaners",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Occupied-space effectiveness, respiratory hazards, secondary pollutants and misleading establishment-number claims checked. The page includes a historical exposure-standards table; those old numeric limits are not reproduced as current law or safe operating targets. Related EPA guidance is not an independent replication."
	})
};

const common = {
	topicSlug: "climate-and-environment",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	// Legacy editorial field, never a measured proportion of expert agreement.
	confidenceScore: 75,
	searchDatabases: [
		"Consensus.app (targeted discovery)",
		"EPA institutional guidance and technical report",
		"Wiley publisher full text",
		"OSTI published field-study PDF"
	],
	searchCutoffAt: checkedAt,
	inclusionRules: [
		"Distinguish particle capture, gas removal, household exposure and health outcomes.",
		"Retain device configuration, test aerosol, operating conditions and study design."
	],
	exclusionRules: [
		"No brand endorsement or claim that a laboratory result predicts an individual's health benefit.",
		"Do not treat repeated agency summaries of one study as independent replications."
	],
	appraisalTools: ["Targeted source and measurement-boundary check; no formal risk-of-bias instrument completed"],
	institutionalAnchors: [
		{
			name: "US Environmental Protection Agency",
			role: "Engineering and safety guidance plus funded research; related documents are not independent votes"
		}
	],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	coiSummary:
		"EPA produced the institutional guidance and funded the cited laboratory study; its authors declared no conflict of interest. These records do not endorse a commercial product.",
	independenceSummary:
		"EPA guidance and EPA-funded research are related evidence streams. Reusing their findings for different questions does not increase the number of independent studies.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;
function publication(
	id: string,
	summary: string,
	focus: string
): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: {
			focus,
			cadenceDays: 180,
			watchTerms: [focus],
			integrityMonitors: ["Corrections and retractions for cited sources"],
			guidelineMonitors: ["Updated institutional air-cleaner guidance"],
			triggerRules: [
				"Reassess on a relevant field trial, replicated device test, safety update or source correction."
			]
		}
	};
}

export const airPracticalClaims: SeedClaim[] = [
	{
		...common,
		title: "Does a high-efficiency filter rating guarantee clean air throughout a room?",
		slug: airSlugs.ratings,
		bottomLine:
			"No. The fraction captured in one pass is not the fraction removed from an entire room. Clean-air delivery rate (CADR), room volume, fan setting, placement and runtime determine how much room air is actually treated.",
		stableCore: [
			"Filter efficiency describes air passing through the filter; room effectiveness also depends on how much air reaches it.",
			"CADR is a volume of particle-cleaned air per time, not a percentage of pollutants removed from a home or a health-risk reduction.",
			"Advertised CADR is typically measured at the highest setting. A quiet low-speed setting may provide substantially less particle cleaning."
		],
		openQuestions: [
			"How well do specific laboratory ratings predict performance in occupied, connected rooms?",
			"Which noise and placement strategies sustain actual use without obstructing airflow?"
		],
		whatWouldChangeMinds: [
			"Representative field measurements linking certified operating-speed CADR to room exposure under recorded ventilation and source conditions.",
			"Replicated evidence that a simpler label predicts real exposure better across different rooms and use patterns."
		],
		misconceptions: [
			"A 99.97% filter claim does not mean the room becomes 99.97% pollutant-free.",
			"A room-area recommendation assumes a ceiling height and does not automatically cover adjoining rooms.",
			"A particle CADR is not a gas-removal rating or a clinical effectiveness score."
		],
		misconceptionTags: ["HEPA efficiency", "CADR", "air purifier room size", "fan speed"],
		editorSummary:
			"Check both the filter and the air moving through it. A highly efficient medium with little airflow can remove less pollution from a room than a lower-efficiency system that processes more air. Use the relevant particle CADR at the setting that will actually be used.",
		uncertaintySummary:
			"The distinction between capture efficiency and clean-air delivery is established engineering. Household effectiveness is less predictable because sources, ventilation, mixing and adherence vary; this review does not assign a universal room-cleaning percentage.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Controlled test rooms do not reproduce every occupied home or operating speed."
			}
		],
		evidenceSummaries: [
			{
				question: "What does the label measure?",
				population: "Portable particle cleaners in rooms",
				finding:
					"EPA distinguishes single-pass efficiency from room effectiveness and recommends matching particle CADR to the space and operating conditions.",
				effectDirection: "supports",
				magnitude: "Different physical quantities, not interchangeable percentages.",
				certainty: "high",
				limitations: ["No individualized exposure prediction", "Rating conditions and real use may differ"]
			}
		],
		...publication(
			"34edb290-42bc-4b7e-9d52-30b9e5088b78",
			"New review: distinguish filter efficiency from room-scale clean-air delivery.",
			"Particle filter efficiency versus CADR and room effectiveness"
		),
		sources: [airSources.technical, airSources.consumer]
	},
	{
		...common,
		title: "Can DIY box-fan air cleaners match commercial particle cleaners?",
		slug: airSlugs.diy,
		bottomLine:
			"Some tested DIY designs delivered comparable or greater particle-cleaning rates than a small commercial unit, but there is no universal DIY-versus-commercial winner. Construction, fan, filter, noise, power and real use matter; laboratory smoke removal is not a demonstrated health benefit.",
		stableCore: [
			"In Holder et al.'s matched chamber tests, the baseline single-filter design delivered 111.2 CFM, a shrouded version 156.1 CFM and a four-filter box 400.9 CFM; one small commercial unit delivered 118.9 CFM.",
			"The four-filter box drew 76.0 W versus 41.1 W for the commercial unit. More total clean air is not the same measure as less electricity use.",
			"The authors tested a limited range of electret filters and fans, not the whole product market. Highly smoke-loaded filters performed poorly, but the experiment does not establish a universal replacement interval."
		],
		openQuestions: [
			"How do long-term filter performance and replacement costs vary across real smoke episodes?",
			"Which designs remain acceptable enough in occupied homes to be operated consistently?"
		],
		whatWouldChangeMinds: [
			"Independent matched tests across more fans, filters, realistic loading and operating speeds.",
			"Larger randomized field studies that record actual use and separate pollutant reduction from clinical outcomes."
		],
		misconceptions: [
			"A four-filter box is not equivalent to every improvised single-filter fan.",
			"One commercial comparator does not establish that DIY devices beat all commercial cleaners.",
			"Limited safety tests do not certify every fan or assembly. Follow current EPA safety guidance rather than improvising electrical modifications."
		],
		misconceptionTags: ["DIY air cleaner", "Corsi-Rosenthal box", "box fan filter", "wildfire smoke"],
		editorSummary:
			"The meaningful comparison is between specified devices under the same test, then the compromises that determine whether people use them. EPA advises safety-marked newer fans, manufacturer precautions and working smoke alarms. A particle cleaner is only one part of reducing exposure and staying safe during smoke and heat events.",
		uncertaintySummary:
			"The 29.3 m³ chamber used generated pine-needle smoke, not occupied homes. The field paper describes two small nonrandomized pilots with prior cleaner use and changing smoke conditions; noise and unwanted cooling mattered. Neither source establishes a personal benefit or a four-filter-box clinical advantage.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Few tested configurations, one commercial comparator and a well-mixed chamber."
			},
			{
				type: "bias",
				detail: "The separate field pilots used sequential, nonrandomized interventions and could not fully isolate prior cleaner use."
			}
		],
		evidenceSummaries: [
			{
				question: "How did matched designs perform?",
				population: "Four selected configurations in a 29.3 m³ chamber",
				finding:
					"Table 2 reports CADR of 111.2 ± 1.3, 156.1 ± 3.6, 400.9 ± 30.7 and 118.9 ± 0.7 CFM for baseline, shroud, four-filter box and commercial turbo respectively.",
				effectDirection: "supports",
				magnitude:
					"Study-specific particle-cleaning rates with reported variation, not 95% confidence intervals or health percentages.",
				certainty: "moderate",
				limitations: [
					"At least three replicates per condition",
					"Modified AHAM protocol with natural decay subtraction",
					"Particle properties and concentration affected some CADRs"
				]
			}
		],
		coiSummary:
			"Holder et al. received EPA funding and declared no conflict. The separate field study was EPA-supported and declared no known competing financial interests or personal relationships. Several authors and the research program overlap.",
		...publication(
			"af81d6aa-00e1-4443-9d50-8e282616beca",
			"New review: compare specified DIY and commercial particle cleaners without extrapolating laboratory rates to health.",
			"DIY particle-cleaner performance and real-world usability"
		),
		sources: [airSources.lab, airSources.diyGuidance, airSources.field]
	},
	{
		...common,
		title: "Do HEPA air cleaners remove gases and carbon monoxide?",
		slug: airSlugs.gases,
		bottomLine:
			"A HEPA particle filter does not remove gases such as carbon monoxide. A separate sorbent can capture some gases, but capacity and pollutant specificity matter. An air cleaner is not a substitute for carbon-monoxide alarms, safe combustion equipment or source control.",
		stableCore: [
			"Particle filters and gas sorbents perform different jobs; a device may contain both, but the HEPA label describes particle filtration.",
			"Activated carbon and other sorbents have finite capacity and do not capture every gas equally well. Thin carbon layers can saturate quickly.",
			"EPA notes that carbon monoxide is not readily captured by adsorption or chemisorption. A lower particle reading cannot establish that a combustion hazard has disappeared."
		],
		openQuestions: [
			"Which gas-specific tests best predict breakthrough under mixed pollutants and changing humidity?",
			"How long do particular consumer sorbents retain useful capacity in realistic homes?"
		],
		whatWouldChangeMinds: [
			"Independent long-duration measurements demonstrating pollutant-specific capacity and safe end-of-life behavior.",
			"Validated residential gas-removal systems with transparent testing, rather than inferring performance from a particle label."
		],
		misconceptions: [
			"Less smoke odor does not prove removal of every dangerous constituent.",
			"A high particle CADR does not certify gas removal.",
			"A carbon filter is not a carbon-monoxide safety system."
		],
		misconceptionTags: ["HEPA gases", "carbon monoxide", "activated carbon", "VOC filters"],
		editorSummary:
			"Identify the pollutant before choosing the control. Particle filtration can help with smoke particles while leaving gaseous hazards unresolved. Sorbents need appropriate chemistry, enough material and replacement; removing the source and providing appropriate clean-air ventilation remain important.",
		uncertaintySummary:
			"The particle-versus-gas distinction is firm. Performance against a particular gas cannot be generalized across filters, loading or humidity. This review does not evaluate a detector or provide emergency response instructions.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Sorbent performance is specific to the gas, concentration, humidity, contact time and available capacity."
			}
		],
		evidenceSummaries: [
			{
				question: "What can a gas sorbent promise?",
				population: "Residential gas-filter applications",
				finding:
					"EPA describes selective, finite adsorption and chemisorption; it does not expect one residential system to adequately remove every gaseous pollutant.",
				effectDirection: "supports",
				magnitude: "No universal removal percentage or replacement time.",
				certainty: "high",
				limitations: [
					"Product-specific testing needed",
					"Odor and particle measurements cannot exclude gaseous hazards"
				]
			}
		],
		...publication(
			"579c0ed7-2fba-4c5f-a48b-6f1d04d10dd5",
			"New review: distinguish HEPA particles, gas sorption and carbon-monoxide protection.",
			"Particle filtration versus gas sorption and carbon monoxide"
		),
		sources: [airSources.technical, airSources.consumer, airSources.coSafety]
	},
	{
		...common,
		title: "Are ozone generators safe and effective air cleaners for occupied homes?",
		slug: airSlugs.ozone,
		bottomLine:
			"No. Intentional ozone generation is not an appropriate air-cleaning strategy in occupied homes. Ozone irritates the lungs, has limited cleaning effectiveness at concentrations compatible with public-health guidance, and can react indoors to produce additional harmful pollutants.",
		stableCore: [
			"A chemical reaction can replace one pollutant with another rather than render the air harmless.",
			"EPA identifies secondary products including aldehydes and particles; odor changes are not evidence of safe air.",
			"An EPA establishment number identifies a manufacturing facility, not approval of a cleaner's safety or effectiveness."
		],
		openQuestions: [
			"How much do particular technologies emit under realistic operation and aging?",
			"Which byproduct tests best represent mixtures found in occupied buildings?"
		],
		whatWouldChangeMinds: [
			"Independent evidence of useful cleaning with acceptably low ozone and byproducts in realistic occupied environments.",
			"Updated health and engineering assessments showing that both direct exposure and secondary chemistry are adequately controlled."
		],
		misconceptions: [
			"Ozone is not a beneficial form of breathing oxygen.",
			"Odor masking is not detoxification.",
			"Evidence for a professionally controlled unoccupied treatment cannot be transferred to routine occupied-room use."
		],
		misconceptionTags: ["ozone air cleaner", "ionizer", "energized oxygen", "EPA establishment number"],
		editorSummary:
			"Avoid devices that intentionally produce ozone for routine home air cleaning. Technologies that incidentally emit ozone need their own emissions checks; this is not a claim that every UV or electrostatic device is identical. Mechanical particle filtration avoids intentionally adding a reactive gas.",
		uncertaintySummary:
			"The recommendation against intentional ozone generation in occupied spaces is strong. The emissions and byproducts of an individual device require device-specific testing. Historical numeric exposure limits on the EPA page are not used here as current legal limits or safe operating targets.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Output, ventilation, indoor chemistry and device aging alter actual exposures."
			}
		],
		evidenceSummaries: [
			{
				question: "Does ozone safely clean occupied indoor air?",
				population: "Occupied residential spaces",
				finding:
					"EPA advises against ozone generators because useful broad decontamination is not established at acceptable exposure levels and reactions can create harmful byproducts.",
				effectDirection: "supports",
				magnitude: "A safety and effectiveness boundary, not a ranked product score.",
				certainty: "high",
				limitations: [
					"Does not assess every electronic air cleaner",
					"Not guidance for professional unoccupied-space treatment"
				]
			}
		],
		...publication(
			"1c5264d8-5c06-4d82-82b7-679d109f17f2",
			"New review: why intentional ozone generation is inappropriate in occupied homes.",
			"Ozone generators and occupied-space air-cleaning safety"
		),
		sources: [airSources.ozone, { ...airSources.technical, stance: "context", isAnchor: false, order: 2 }]
	},
	{
		...common,
		title: "Does a higher-MERV filter automatically improve whole-home air cleaning?",
		slug: airSlugs.hvac,
		bottomLine:
			"No. A higher MERV generally means better particle capture under the rating test, but a home's result also depends on airflow, filter fit and how long the system fan runs. Use a filter the system can accommodate; the highest number is not automatically the best installed system.",
		stableCore: [
			"A central filter processes air only while the system moves air through it; a better filter with little runtime does not continuously clean the house.",
			"A poorly fitted filter permits bypass, while an incompatible or heavily loaded filter can impede airflow.",
			"EPA recommends MERV 13 or the highest efficiency the system and filter slot can accommodate, with professional assessment where compatibility is uncertain."
		],
		openQuestions: [
			"Which fan schedules improve particle exposure without unacceptable energy and humidity penalties?",
			"How much do bypass and pressure drop vary among real installations with the same rating?"
		],
		whatWouldChangeMinds: [
			"Representative whole-system studies measuring exposure, airflow, bypass, runtime, humidity and energy together.",
			"Reliable installation-specific evidence that a filter upgrade improves delivered cleaning without compromising system operation."
		],
		misconceptions: [
			"MERV is not a whole-house pollution-removal percentage.",
			"A heating or cooling thermostat does not guarantee continuous filtration.",
			"A ductless cooling unit's small protective filter is not automatically a substitute for a suitable particle cleaner."
		],
		misconceptionTags: ["MERV 13", "HVAC filter", "furnace airflow", "filter bypass"],
		editorSummary:
			"Treat filtration as a system, not a shopping contest for the highest label. Fit, available fan pressure, replacement and operating time all matter. Longer fan operation can improve filtration but carries energy and sometimes humidity trade-offs, so this review does not prescribe one schedule for every home.",
		uncertaintySummary:
			"The engineering constraints are established, but the net effect of an upgrade depends on the installation. No universal exposure reduction or energy penalty can be inferred from MERV alone.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Fan controls, ducts, leakage, filter dimensions and climate vary among buildings."
			}
		],
		evidenceSummaries: [
			{
				question: "What determines delivered central filtration?",
				population: "Residential HVAC systems",
				finding:
					"EPA guidance couples filter efficiency with system compatibility, snug fit, maintenance and fan operation; longer operation can raise costs and affect cooling-season humidity control.",
				effectDirection: "supports",
				magnitude: "System-specific trade-offs, not a fixed MERV-to-health conversion.",
				certainty: "high",
				limitations: [
					"No test of an individual home",
					"Portable and central systems have different operating boundaries"
				]
			}
		],
		...publication(
			"91a36e46-0f79-49c2-9e64-0e9c0bdd88ef",
			"New review: MERV, airflow, bypass and fan runtime determine delivered central filtration.",
			"MERV rating versus whole-system filtration"
		),
		sources: [airSources.technical, airSources.consumer]
	}
];
