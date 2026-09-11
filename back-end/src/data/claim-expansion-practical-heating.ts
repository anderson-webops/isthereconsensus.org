import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-11T23:00:27.000Z";
const coldSlug = "can-modern-heat-pumps-work-efficiently-in-cold-climates";
const emissionsSlug = "do-heat-pumps-usually-cut-home-heating-emissions-compared-with-fossil-fuel-heating";

export const heatingSlugs = {
	ratings: "do-heat-pump-efficiency-ratings-predict-a-homes-seasonal-performance",
	radiators: "do-air-to-water-heat-pumps-require-underfloor-heating",
	insulation: "must-an-older-home-meet-new-build-insulation-standards-before-a-heat-pump-can-work",
	sizing: "is-a-bigger-heat-pump-always-more-efficient",
	backup: "does-resistance-backup-always-erase-a-heat-pumps-efficiency-benefit",
	cost: "do-lower-heat-pump-energy-bills-guarantee-lower-total-cost"
};

export const heatingPracticalGaps = [
	{ slug: heatingSlugs.ratings, gap: "Separates laboratory ratings, seasonal measurements and metering boundaries rather than repeating whether heat pumps operate in cold weather.", relatedExistingSlugs: [coldSlug] },
	{ slug: heatingSlugs.radiators, gap: "Examines the specific heat-emitter prerequisite for water-based systems, not the generic climate suitability or emissions of heat pumps.", relatedExistingSlugs: [coldSlug] },
	{ slug: heatingSlugs.insulation, gap: "Tests a claimed whole-building retrofit prerequisite while retaining heat-loss and selection caveats, rather than repeating the emissions conclusion.", relatedExistingSlugs: [coldSlug, emissionsSlug] },
	{ slug: heatingSlugs.sizing, gap: "Distinguishes equipment capacity from efficiency and cycling controls; the existing cold-climate review does not examine oversizing evidence.", relatedExistingSlugs: [coldSlug] },
	{ slug: heatingSlugs.backup, gap: "Examines measured resistance-backup use, its electricity denominator and seasonal context, not merely whether a heat pump works below freezing.", relatedExistingSlugs: [coldSlug] },
	{ slug: heatingSlugs.cost, gap: "Separates annual bill savings from incremental investment and discounted lifetime costs using matched modeled packages, not a general emissions claim.", relatedExistingSlugs: [emissionsSlug] }
];

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return { appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: checkedAt, statusSources: [entry.url!], ...entry };
}

export const heatingSources = {
	costGuidance: source({
		kind: "guideline",
		title: "Purchasing Energy-Efficient Residential Air-Source Heat Pumps",
		publisher: "US Department of Energy, Federal Energy Management Program",
		year: 2024,
		url: "https://www.energy.gov/cmei/femp/purchasing-energy-efficient-residential-air-source-heat-pumps",
		stance: "context",
		order: 2,
		note: "Cost-effectiveness definition checked: lifetime savings must exceed an incremental upfront premium. This is federal procurement guidance, not a household quote or an independent replication of Wilson et al. Its separate worked examples use different assumptions, including 15 years and a 3% discount rate; those values are not substituted into the 16-year, 3.4% Joule results. No current incentive eligibility is inferred."
	}),
	field: source({
		kind: "landmark_study",
		title: "Wärmepumpen in Bestandsgebäuden: Abschlussbericht des Projekts WP-QS im Bestand",
		publisher: "Fraunhofer ISE",
		year: 2025,
		url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/projekte/WP-QS_Schlussbericht.pdf",
		citationStatus: "corrected",
		statusSources: ["https://www.ise.fraunhofer.de/en/research-projects/wp-qs-im-bestand.html", "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/projekte/WP-QS_Schlussbericht.pdf"],
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Revised report checked: English summary pp. 11–13, correction pp. 17–18, boundaries Table 5 and efficiency/sizing results. Figure 47 visually checked. The correction concerns unsupported TA Lärm noise-compliance claims, not a retraction of the thermal results used here. Selected German homes, substantial prior renovation and manufacturer participation limit generalization. Source-notice check only, not an exhaustive integrity audit."
	}),
	review: source({
		kind: "systematic_review",
		title: "Air Source Heat Pumps field studies: A systematic literature review",
		publisher: "Renewable and Sustainable Energy Reviews",
		year: 2020,
		doi: "10.1016/j.rser.2020.110275",
		url: "https://eprints.ncl.ac.uk/274308",
		stance: "context",
		order: 2,
		note: "Consensus record and published open-access PDF checked for measurement definitions, field-study scope and disclosures. Review covers 34 field-study articles, not one pooled universal efficiency estimate. Standardized ratings and metering boundaries differ from household operation. SEAI grant RDD331 supported one author; an author lists ESB Networks affiliation; authors declared no known competing interests. No formal risk-of-bias appraisal completed."
	}),
	cost: source({
		kind: "landmark_study",
		title: "Heat pumps for all? Distributions of the costs and benefits of residential air-source heat pumps in the United States",
		publisher: "Joule",
		year: 2024,
		doi: "10.1016/j.joule.2024.01.022",
		url: "https://docs.nlr.gov/docs/fy24osti/84775.pdf",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Consensus record and relevant full-text methods, results and disclosures checked; Figure 3 visually verified. Physics simulation of 550,000 representative US households, not field observations. Main bill prices represent winter 2021–22; lifetime NPV uses 16 years and a 3.4% real discount rate. Figure 3 reports rounded positive shares; these are not derived by subtracting rounded negative shares in the text. DOE-funded research; authors declared no competing interests. No model rerun or formal appraisal."
	})
};

const reviewContext = {
	topicSlug: "energy-and-infrastructure",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	// Legacy editorial field, not a measured percentage of expert agreement.
	confidenceScore: 75,
	searchDatabases: ["Consensus.app (targeted discovery)", "Fraunhofer ISE project and revised report", "Newcastle University author repository", "Joule article through the national-laboratory repository"],
	searchCutoffAt: checkedAt,
	inclusionRules: ["Identify the heating service, equipment, population, period and metering or cost boundary.", "Distinguish occupied-home measurements from simulations and general engineering interpretation."],
	exclusionRules: ["Do not turn a selected cohort or a historical price scenario into a guarantee for a particular home.", "Do not infer noise-law compliance or current subsidy eligibility from these studies."],
	appraisalTools: ["Targeted source, design, denominator and correction check; no formal risk-of-bias instrument completed"],
	institutionalAnchors: [{ name: "Fraunhofer ISE and US national-laboratory researchers", role: "Field measurements and housing-stock modeling respectively, not independent replications of the same experiment" }],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	independenceSummary: "The German cohort and US simulation answer different questions. Reusing the field report across installation questions does not create additional independent studies.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;

const fieldCoi = "German public funding supported WP-QS; nine manufacturers and two utilities participated. Manufacturers contributed 58 of the 77 systems. The cohort is not a random sample of all homes. Carroll et al. report SEAI support and no known competing interests; the review includes an ESB Networks affiliation.";

function publication(id: string, summary: string, focus: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: {
			focus,
			cadenceDays: 180,
			watchTerms: [focus],
			integrityMonitors: ["Corrections or retractions on cited reports and papers"],
			guidelineMonitors: ["Updated institutional field-performance and retrofit assessments"],
			triggerRules: ["Reassess after a relevant multi-climate field study, updated cost model or source correction."]
		}
	};
}

export const heatingPracticalClaims: SeedClaim[] = [
	{
		...reviewContext,
		title: "Do heat-pump efficiency ratings predict a home's seasonal performance?",
		slug: heatingSlugs.ratings,
		bottomLine: "Ratings are useful standardized comparisons, not a promise of a home's annual result. Actual seasonal performance depends on operating temperatures, controls, hot-water demand and exactly which heat and electricity meters are included.",
		stableCore: [
			"COP compares heat output with electrical input under specified conditions; a seasonal performance factor (SPF) covers a period of operation.",
			"Fraunhofer's 2024 air-to-water analysis used 49 systems, with mean SPF3 3.41 and an observed range of 2.6 to 4.9. The project-wide count was 77, not 77 identical annual observations.",
			"The report's broader boundary 5 includes storage effects and additional inputs, but still excludes some distribution pumps. Neither boundary is automatically every household electricity use."
		],
		openQuestions: ["How well do particular ratings predict performance across representative installations and weather years?", "How much of an installation's shortfall is attributable to equipment, controls, storage or the building?"],
		whatWouldChangeMinds: ["Replicated matched rating-to-meter comparisons with complete boundary definitions and representative sampling.", "Demonstrated improvements from interventions that isolate the cause rather than just comparing different homes."],
		misconceptions: ["SPF 3.41 is an energy ratio, not 341% expert agreement or a cost-saving percentage.", "The observed range is not a confidence interval or a guarantee that every installation falls inside it.", "Comparing two numbers measured at different boundaries can create an artificial winner."],
		misconceptionTags: ["COP", "SCOP", "SPF", "heat pump efficiency rating", "seasonal performance"],
		editorSummary: "Ask what was measured before comparing the headline number. Heating-water output at a generator and heat actually drawn after storage are different boundaries. A useful rating can coexist with substantial variation in real homes.",
		uncertaintySummary: "The definitions are firm, but the example is a selected, relatively mild-year German cohort. This targeted review does not establish a universal rating-to-performance correction factor or independently certify a product.",
		uncertaintyDrivers: [{ type: "other", detail: "Boundary 3 and boundary 5 include different thermal measurements and electrical consumers." }, { type: "generalizability", detail: "A selected cohort is not a probability distribution for every building and climate." }],
		evidenceSummaries: [{ question: "How variable was measured performance?", population: "49 air-to-water systems in the principal 2024 WP-QS efficiency group", finding: "Mean SPF3 was 3.41, with a 2.6 to 4.9 observed range. Thirteen ground-source systems separately averaged about 4.3, range 3.6 to 5.4; these were different homes, not a randomized head-to-head comparison.", effectDirection: "supports", magnitude: "Dimensionless seasonal heat-to-electricity ratios, not financial returns.", certainty: "moderate", limitations: ["Selected homes and prior retrofits", "Different systems and metering boundaries", "Weather below −5°C was uncommon during monitoring"] }],
		coiSummary: fieldCoi,
		...publication("921ce1f2-c6b1-4b47-a681-75bc38c0da41", "New review: distinguish equipment ratings from measured seasonal performance and meter boundaries.", "Heat pump ratings versus measured seasonal performance"),
		sources: [heatingSources.field, heatingSources.review]
	},
	{
		...reviewContext,
		title: "Do air-to-water heat pumps require underfloor heating?",
		slug: heatingSlugs.radiators,
		bottomLine: "No. Suitably sized radiators can work with air-to-water heat pumps. The practical question is whether the emitters can meet each room's heat demand at appropriate water temperatures, not whether every floor must be replaced.",
		stableCore: ["The WP-QS cohort included radiator-only, floor-heating-only and mixed systems.", "Its report found that adequately sized radiators could operate at temperatures similar to surface heating.", "Required heating-water temperature matters for efficiency; a radiator that worked with a hotter boiler is not automatically adequate at a lower temperature."],
		openQuestions: ["Which rooms need larger emitters or reduced heat loss in a specific retrofit?", "How do emitter changes, controls and hot-water requirements jointly affect seasonal performance?"],
		whatWouldChangeMinds: ["Representative room-level retrofit comparisons with measured comfort, flow temperatures and seasonal energy use.", "Evidence that a defined radiator configuration consistently fails despite adequate capacity and verified installation."],
		misconceptions: ["Radiators are not categorically incompatible with heat pumps.", "Compatible does not mean every existing radiator can stay unchanged.", "This question concerns water-based heating, not an air-to-air unit warming rooms directly."],
		misconceptionTags: ["heat pump radiators", "underfloor heating", "flow temperature", "air-to-water"],
		editorSummary: "Emitter suitability is a heat-delivery question. A room-by-room assessment can distinguish a limited emitter upgrade from unnecessary whole-house replacement. The field evidence does not supply a do-it-yourself flow-temperature setting.",
		uncertaintySummary: "Observed compatibility disproves a universal underfloor-heating requirement, but does not identify the cheapest or most efficient retrofit for every home. This is a targeted synthesis, not a design specification.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Emitter sizes, room heat losses and existing renovations differ between buildings." }, { type: "bias", detail: "The selected installations do not randomly assign radiators versus underfloor heating." }],
		evidenceSummaries: [{ question: "Were heat pumps successfully operated without all-underfloor heating?", population: "The 77-system WP-QS project, with mixed ages and heating layouts", finding: "Roughly one quarter used radiators alone, one quarter underfloor heating alone and half mixed systems. The report identifies adequate radiator sizing and operating temperature as more informative than the emitter label alone.", effectDirection: "supports", magnitude: "A feasibility and operating-condition finding, not a causal efficiency difference between emitter types.", certainty: "moderate", limitations: ["Manufacturer involvement and selected installations", "Not a randomized emitter comparison", "Comfort and capacity require assessment for each room"] }],
		coiSummary: fieldCoi,
		...publication("269ef8a5-d8e0-4166-abd0-b6a235e53e21", "New review: air-to-water heat pumps do not universally require underfloor heating; radiator capacity still matters.", "Heat pump radiator compatibility and low-temperature emitters"),
		sources: [heatingSources.field, heatingSources.review]
	},
	{
		...reviewContext,
		title: "Must an older home meet new-build insulation standards before a heat pump can work?",
		slug: heatingSlugs.insulation,
		bottomLine: "Not as a universal prerequisite. Existing homes can use heat pumps without first being rebuilt to a new-home specification. But this does not make insulation irrelevant: heat loss affects required capacity, comfort, energy use and the water temperature needed by the emitters.",
		stableCore: ["WP-QS included buildings dating from 1826 to 2015; building age alone did not explain observed efficiency.", "The older homes were not uniformly untouched: most pre-1979 homes had upgraded windows and roofs, and many had wall insulation work.", "A heat pump's heat-to-electricity ratio and the building's total heating demand are separate quantities. An efficient system can still serve a high-demand home."],
		openQuestions: ["What sequence of insulation, emitter and heating upgrades gives the best result under a particular budget?", "How do much less renovated buildings perform during colder-than-observed winters?"],
		whatWouldChangeMinds: ["Representative before-and-after retrofit studies separating insulation, emitter and equipment changes.", "Multi-year evidence on comfort, demand and whole-system costs in poorly insulated housing, including severe cold."],
		misconceptions: ["No relationship with construction year is not proof that insulation has no effect.", "Existing-building success is not evidence that every unrenovated home needs no preparation.", "Reducing heat demand and improving equipment efficiency are complementary, not interchangeable."],
		misconceptionTags: ["heat pump insulation", "old house retrofit", "new-build standards", "fabric first"],
		editorSummary: "The useful starting point is actual heat loss and the heat-delivery system, rather than the building's birthday. The field study supports flexibility, while its substantial renovation history prevents a blanket claim that fabric work never matters.",
		uncertaintySummary: "The monitored homes were selected and older properties often already renovated. A lack of observed age correlation is not a causal insulation experiment. This targeted review cannot set a universal retrofit order or return on investment.",
		uncertaintyDrivers: [{ type: "bias", detail: "Age, renovation, emitter design and controls vary together in an observational cohort." }, { type: "generalizability", detail: "Monitoring included few temperatures below −5°C and does not represent every cold-climate design condition." }],
		evidenceSummaries: [{ question: "Does successful operation require a newly built home?", population: "Selected German existing homes in WP-QS, 83% built before 1995", finding: "The study did not find a relationship between building age and seasonal performance. It instead highlighted required operating temperatures, related to renovation and emitter design; the pre-1979 group had substantial earlier upgrades.", effectDirection: "supports", magnitude: "Observational evidence against an age-only rule, not an estimate of the causal effect of insulation.", certainty: "moderate", limitations: ["Prior renovation and selected recruitment", "No random assignment to insulation levels", "Efficiency is not the same outcome as total heating demand"] }],
		coiSummary: fieldCoi,
		...publication("7c410ba4-890b-43f5-8dc6-e6042c90df3b", "New review: new-build insulation is not a universal heat-pump prerequisite, but heat loss and prior renovation matter.", "Existing-home heat pump retrofit sequencing and insulation"),
		sources: [heatingSources.field, heatingSources.review]
	},
	{
		...reviewContext,
		title: "Is a bigger heat pump always more efficient?",
		slug: heatingSlugs.sizing,
		bottomLine: "No. Heating capacity is not efficiency. Equipment must meet the relevant load, but unnecessary capacity can interact with limited modulation and controls to produce short operating cycles. Size alone does not determine how often a system cycles.",
		stableCore: ["Capacity describes a rate of heat delivery; efficiency describes output relative to input.", "The WP-QS analysis found many systems with substantial capacity reserves, but cycling also depended on controls, hydraulic layout and the usable modulation range.", "Some generously sized units operated with relatively few starts, so an association between oversizing and cycling is not an automatic diagnosis."],
		openQuestions: ["Which sizing and control combinations remain efficient at both design-cold and low-load conditions?", "How much lifetime reliability improves when very short cycles are corrected in routine installations?"],
		whatWouldChangeMinds: ["Matched interventions that change capacity or controls separately while measuring comfort, starts and energy use.", "Long-term field comparisons reporting faults and service life rather than assuming cycling counts equal failure rates."],
		misconceptions: ["Bigger output does not mean a higher COP or lower bill.", "Many starts do not prove that equipment size is the only cause.", "Avoiding oversizing is not a recommendation to undersize a system or disable necessary backup."],
		misconceptionTags: ["heat pump sizing", "oversizing", "short cycling", "modulation", "capacity"],
		editorSummary: "A good assessment checks maximum demand and lower-load operation. The field report linked very short cycles to several interacting causes, including controls and flow arrangements, so a replacement recommendation based only on the nameplate can miss the problem.",
		uncertaintySummary: "Planning documents were generally unavailable in WP-QS, preventing the investigators from establishing why each unit had been sized as it was. This targeted review does not supply a personal sizing calculation or prove that an installer made an error.",
		uncertaintyDrivers: [{ type: "bias", detail: "Capacity, controls, hydraulic layout and household loads were not independently assigned." }, { type: "other", detail: "The report estimated building loads from consumption; original planning assumptions were mostly unavailable." }],
		evidenceSummaries: [{ question: "Did capacity alone explain cycling?", population: "WP-QS air-to-water systems with operating and consumption records", finding: "The investigators found that dimensioning alone was not decisive. Control settings, generator-to-emitter flow differences and use of the modulation range helped explain frequent short cycles; some high-capacity systems had relatively few starts.", effectDirection: "supports", magnitude: "Observational operating-pattern evidence, not a causal percentage increase in faults from oversizing.", certainty: "moderate", limitations: ["Original design documents generally unavailable", "Multiple installation factors change together", "Starts are not a direct measure of compressor lifetime"] }],
		coiSummary: fieldCoi,
		...publication("e74677e7-8f11-42b1-b75f-1fb0540fbedc", "New review: capacity is not efficiency, and cycling depends on controls and installation as well as size.", "Heat pump oversizing modulation and short cycling"),
		sources: [heatingSources.field, heatingSources.review]
	},
	{
		...reviewContext,
		title: "Does resistance backup always erase a heat pump's efficiency benefit?",
		slug: heatingSlugs.backup,
		bottomLine: "No. The effect depends on how much backup electricity is used and when. Occasional resistance heat can coexist with good seasonal performance; extensive backup operation can substantially change the result. A warm-year average cannot guarantee performance through an extreme winter.",
		stableCore: ["In the principal 49-system air-to-water group, backup used 1.3% of the electricity consumed by the compressor plus backup heater in 2024.", "That percentage is not the share of delivered heat, all heating-system electricity or the home's total electricity.", "The reported mean SPF3 of 3.41 already includes resistance backup at that boundary. It is not a compressor-only result with backup silently omitted."],
		openQuestions: ["How much do backup shares change during severe cold, hot-water peaks or different tariff-driven controls?", "How reliably can monitoring distinguish necessary backup from faults or unsuitable control settings?"],
		whatWouldChangeMinds: ["Representative multi-year measurements of backup use, matched comfort and complete energy boundaries.", "Verified intervention studies distinguishing deliberate backup strategy from equipment and parameter faults."],
		misconceptions: ["The presence of a backup heater does not mean it supplies most annual heat.", "A small annual electricity share does not establish a small contribution at the grid's peak hour.", "This evidence is not a reason to disable safety, freeze-protection or necessary backup functions."],
		misconceptionTags: ["heat pump backup", "resistance heater", "auxiliary heat", "emergency heat"],
		editorSummary: "The practical question is measured use, not simply whether a backup element is fitted. Read the denominator and distinguish annual energy from cold-hour capacity. Unusually high use warrants assessment rather than assuming either inevitable failure or harmless operation.",
		uncertaintySummary: "WP-QS weather was relatively mild and some installations also had boilers. The 1.3% figure is a selected group average, not a universal design target, guaranteed bill impact or extreme-cold estimate. This targeted review does not prescribe control changes.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Temperatures below −5°C were rare, and hybrid systems could use a boiler instead of resistance backup." }, { type: "other", detail: "Backup share uses compressor-plus-heater electricity, while seasonal performance uses a wider specified boundary." }],
		evidenceSummaries: [{ question: "Did backup necessarily dominate annual electrical use?", population: "49 air-to-water installations in the principal 2024 German efficiency group", finding: "Mean backup share was 1.3% of compressor-plus-heater electricity; excluding bivalent systems raised it to about 1.6%. High-use outliers included faults or parameter problems.", effectDirection: "supports", magnitude: "Annual electrical-input shares, not delivered-heat shares or estimates for an extreme-cold hour.", certainty: "moderate", limitations: ["Selected cohort and mild monitoring weather", "Boiler-backed systems affect the pooled result", "Different denominators must not be interchanged"] }],
		coiSummary: fieldCoi,
		...publication("5daab4cb-39ea-4ff3-a36e-a2c0262d4c26", "New review: resistance-backup impact depends on measured use, climate and the energy boundary.", "Resistance backup share and seasonal heat pump performance"),
		sources: [heatingSources.field, heatingSources.review]
	},
	{
		...reviewContext,
		title: "Do lower heat-pump energy bills guarantee lower total cost?",
		slug: heatingSlugs.cost,
		institutionalAnchors: [{ name: "US national-laboratory researchers", role: "DOE-funded housing-stock simulation, not a household quote or measured installation trial" }],
		bottomLine: "No. Lower annual bills are only one part of the calculation. Equipment, installation, associated upgrades, the alternative being replaced and financing can outweigh bill savings. Results depend on place and date; a historical national model is not a quote for your home.",
		stableCore: ["Wilson et al. modeled 550,000 representative US households across three air-to-air heat-pump performance levels, each with or without envelope upgrades.", "Using winter 2021–22 prices, Figure 3 reports positive bill savings in 95% of modeled homes with the high-efficiency cold-climate package without envelope work, but positive unsubsidized net present value in only 21%.", "Across the best of the six modeled packages for each home, 59% had positive unsubsidized net present value. This is not the result of installing one identical package everywhere."],
		openQuestions: ["How do current local quotes, tariffs, financing and existing equipment change the result?", "How much do comfort, cooling access, maintenance and uncertain equipment life change household valuations?"],
		whatWouldChangeMinds: ["Updated transparent local cost distributions and measured performance that materially change package-level lifetime economics.", "Replicated models with explicit replacement baselines, financing assumptions and sensitivity to installation quality."],
		misconceptions: ["A bill-saving percentage is not a return-on-investment percentage or expert consensus.", "More efficient equipment need not have the lowest total cost under every purchase price.", "Negative modeled financial value does not prove that comfort or new cooling access has no value."],
		misconceptionTags: ["heat pump bills", "heat pump total cost", "payback", "NPV", "installation cost"],
		editorSummary: "The paper deliberately separates energy bills from capital costs. Its comparison assumes replacement equipment in the reference case, not keeping an old system forever. It also adds cooling service in homes that previously lacked it, which can raise electricity use while providing a benefit not fully priced in the model.",
		uncertaintySummary: "This is a physics-based simulation, not 550,000 measured installations. The main historical price scenario and assumed 16-year lifetime with 3.4% real discount rate do not represent everyone's current costs or financing. This targeted review does not verify current incentives or make a personal purchase recommendation.",
		uncertaintyDrivers: [{ type: "other", detail: "Capital costs, equipment performance, reference replacements and household operation are modeled assumptions." }, { type: "generalizability", detail: "Historical US air-to-air scenarios do not directly price an air-to-water installation elsewhere." }],
		evidenceSummaries: [{ question: "Can bill savings and lifetime financial benefit point in different directions?", population: "550,000 simulated representative US households, with results weighted to the eligible housing stock", finding: "For the high-efficiency cold-climate package without envelope work, Figure 3 reports 95% with positive bill savings versus 21% with positive unsubsidized NPV. The six-package best-per-home analysis found 59% with at least one positive-NPV choice.", effectDirection: "supports", magnitude: "Rounded modeled household shares; NPV covers 16 years at a 3.4% real discount rate relative to replacement equipment.", certainty: "moderate", limitations: ["Main prices represent winter 2021–22, not current quotes", "Air-to-air scenarios with added cooling in previously uncooled homes", "Comfort and resilience benefits not fully monetized", "Model and supplementary data not independently rerun"] }],
		coiSummary: "US DOE Building Technologies Office funded the national-laboratory research. The authors declared no competing interests. Public funding does not remove the need to inspect model assumptions and reproducibility.",
		...publication("84a39d59-9ca1-4a3c-9a53-19966303dac8", "New review: lower annual heat-pump bills do not guarantee lower total lifetime cost.", "Heat pump bill savings versus lifetime net present value"),
		sources: [heatingSources.cost, heatingSources.costGuidance]
	}
];
