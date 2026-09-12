import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-12T01:02:55.000Z";
const municipal = "did-chlorinating-and-filtering-drinking-water-reduce-typhoid-and-other-waterborne-disease";
const pfas = "are-pfas-forever-chemicals-harmful-to-human-health-and-what-do-drinking-water-limits-try-to-prevent";
export const waterSlugs = {
	boiling: "does-boiling-water-remove-fuel-and-toxic-chemicals",
	certification: "does-water-filter-certification-mean-it-removes-every-contaminant",
	uv: "does-ultraviolet-water-disinfection-also-remove-lead-nitrate-and-pfas",
	ro: "do-reverse-osmosis-systems-all-use-the-same-amount-of-reject-water",
	softening: "does-softening-hard-water-make-it-microbiologically-safe"
};
export const waterPracticalGaps = [
	{ slug: waterSlugs.boiling, gap: "Separates household heat disinfection from removal of chemical contamination, rather than repeating the municipal treatment history review.", relatedExistingSlugs: [municipal] },
	{ slug: waterSlugs.certification, gap: "Tests the inference from a generic certification mark to specific contaminant reduction and field durability, not whether PFAS can cause harm.", relatedExistingSlugs: [pfas] },
	{ slug: waterSlugs.uv, gap: "Explains the intervention-specific boundary between UV microbial inactivation and dissolved-chemical removal, absent from the broad municipal treatment review.", relatedExistingSlugs: [municipal, pfas] },
	{ slug: waterSlugs.ro, gap: "Examines RO product-water yield, reject-water denominators and the updated efficiency test, not the general health effects of drinking-water contaminants.", relatedExistingSlugs: [pfas] },
	{ slug: waterSlugs.softening, gap: "Distinguishes calcium/magnesium ion exchange, scale control and regeneration from pathogen control, rather than treating all household water treatment as disinfection.", relatedExistingSlugs: [municipal] }
];

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return { appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: checkedAt, statusSources: [entry.url!], ...entry };
}
export const waterSources = {
	cdcSystems: source({ kind: "guideline", title: "About Home Water Treatment Systems", publisher: "Centers for Disease Control and Prevention", year: 2024, url: "https://www.cdc.gov/drinking-water/about/about-home-water-treatment-systems.html", stance: "supports", isAnchor: true, order: 1, note: "Full official page checked. Technology mechanisms and limits, not product-specific testing or independent clinical trials. No formal appraisal. Its nanofiltration pore-size figures are not reproduced because the approximate value and listed range are inconsistent." }),
	cdcFilters: source({ kind: "guideline", title: "About Choosing Home Water Filters", publisher: "Centers for Disease Control and Prevention", year: 2024, url: "https://www.cdc.gov/drinking-water/prevention/about-choosing-home-water-filters.html", stance: "supports", isAnchor: true, order: 1, note: "Full page checked for contaminant-specific certification, testing, maintenance, germ-removal limits and removal of residual disinfectant. A standard number alone does not specify every verified reduction claim. Related CDC guidance is not a separate experiment." }),
	emergency: source({ kind: "guideline", title: "How to Make Water Safe in an Emergency", publisher: "Centers for Disease Control and Prevention", year: 2024, url: "https://www.cdc.gov/water-emergency/about/index.html", stance: "supports", isAnchor: true, order: 1, note: "September 19, 2024 official guidance checked, including the fuel/toxic-chemical/radioactive-contamination warning and limits of UV in cloudy water. This review does not replace a local advisory or reproduce chemical-disinfection recipes." }),
	epaGuide: source({ kind: "guideline", title: "WaterSense Guide to Selecting Water Treatment Systems", publisher: "US Environmental Protection Agency", year: 2024, url: "https://www.epa.gov/system/files/documents/2025-01/ws-products-home-water-treatment-guide_v2_508.pdf", stance: "supports", order: 2, note: "November 2024 guide, despite its January 2025 file path. Treatment goals, softening (p. 4), technology table (pp. 6–7), certification and maintenance checked. General technology categories are not universal product guarantees; dated prices and legal limits are not reproduced." }),
	nsf: source({ kind: "guideline", title: "Contaminant Reduction Claims", publisher: "NSF", url: "https://www.nsf.org/consumer-resources/articles/contaminant-reduction-claims-guide", stance: "supports", order: 2, note: "Certifier's primary contaminant-specific directory checked, not a clinical study or endorsement of a brand. NSF provides certification services; other accredited certifiers also exist. Exact product listings and performance sheets still need checking for the relevant contaminant." }),
	field: source({ kind: "landmark_study", title: "Longitudinal assessment of point-of-use carbon filters for removal of per- and polyfluoroalkyl substances from private well water", publisher: "AWWA Water Science", year: 2021, doi: "10.1002/aws2.1262", url: "https://www.rti.org/publication/longitudinal-assessment-point-use-carbon-filters-removal-per-polyfluoroalkyl-substances-private-well", stance: "context", order: 3, note: "Consensus record, institutional abstract, published methods, results, limitations and disclosures checked. Table 3 visually verified. No independent reanalysis or formal appraisal; historical P473 references are not current certification advice." }),
	ro: source({ kind: "guideline", title: "Point-of-Use Reverse Osmosis Systems", publisher: "US Environmental Protection Agency", url: "https://www.epa.gov/watersense/point-use-reverse-osmosis-systems", stance: "supports", isAnchor: true, order: 1, note: "Official WaterSense page checked, updated August 21, 2026. Typical-system water-use examples and WaterSense criteria have different meanings. The page does not advocate installing RO everywhere. Savings projections and product prices are not treated as measured household outcomes." }),
	roSpec: source({ kind: "guideline", title: "WaterSense Specification for Point-of-Use Reverse Osmosis Systems, Version 1.0", publisher: "US Environmental Protection Agency", year: 2024, url: "https://www.epa.gov/system/files/documents/2024-11/ws-products-watersense-ro-systems-specification.pdf", stance: "supports", order: 2, note: "Eight-page November 2024 specification checked, including scope, efficiency threshold, separate TDS and elective contaminant claims, and the reject-to-product formula. Read with the August 2026 clarifications, not as an unchanged current test procedure. It is a certification specification, not a comparative field trial." }),
	roClarifications: source({ kind: "guideline", title: "WaterSense Specification and Certification Clarifications: RO-0826-1 and RO-0826-2", publisher: "US Environmental Protection Agency", year: 2026, url: "https://www.epa.gov/system/files/documents/2021-12/ws_technical_clarifications.xlsx", stance: "supports", order: 3, note: "Official workbook updated August 20, 2026; Active Clarification Detail rows 33–35 checked. RO-0826-1 aligns efficiency testing with NSF/ANSI 58's 2025 revision, retaining a 30% minimum and accounting for storage-tank back-pressure and automatic flushing. RO-0826-2 allows alternative packaging language directing readers to the performance sheet. The 2021 file path is not the content date. Source workbook inspected read-only; no full NSF standard independently appraised." })
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
	searchDatabases: ["CDC primary guidance", "EPA WaterSense guide, specification and clarification workbook", "NSF contaminant directory", "Consensus.app targeted discovery; primary institutional record and published field-study PDF"],
	searchCutoffAt: checkedAt,
	inclusionRules: ["Match the treatment mechanism to the specific chemical or organism and incoming water conditions.", "Keep product certification, field measurements and clinical health outcomes distinct."],
	exclusionRules: ["No product endorsement, universal safety guarantee or personal health-risk prediction.", "Do not present historical certification protocols, regulatory limits or prices as current requirements."],
	appraisalTools: ["Targeted source, denominator and applicability checks; no formal risk-of-bias appraisal completed"],
	institutionalAnchors: [{ name: "CDC and US Environmental Protection Agency", role: "Primary public-health and engineering guidance; related documents are not independent study replications" }],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	coiSummary: "CDC and EPA provide institutional guidance. NSF is a certification provider, not a product recommendation service for this site.",
	independenceSummary: "Guidance documents can rely on shared evidence. Counting linked documents does not count independent experiments or measure expert agreement.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;
function publication(id: string, summary: string, focus: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: { focus, cadenceDays: 180, watchTerms: [focus], integrityMonitors: ["Corrections to cited evidence"], guidelineMonitors: ["CDC household water guidance", "EPA WaterSense specifications and clarifications"], triggerRules: ["Reassess on changed institutional guidance, relevant replicated field evidence or a source correction."] }
	};
}

export const waterPracticalClaims: SeedClaim[] = [
	{
		...common,
		title: "Does boiling water remove fuel and toxic chemicals?",
		slug: waterSlugs.boiling,
		bottomLine: "No. Boiling is a germ-control method, not a way to make fuel- or toxic-chemical-contaminated water safe. CDC also warns that boiling or disinfecting does not make radioactive contamination safe. Use an alternative safe water source and follow the local health department's advice when that contamination is known or suspected.",
		stableCore: [
			"Heat can inactivate disease-causing organisms without separating dissolved chemicals from the water.",
			"Boiling a pot and drinking the remaining liquid is not distillation, which separately collects condensed vapor.",
			"Even distillation has limits: some volatile chemicals can carry over. It is not a universal response to an unknown spill."
		],
		openQuestions: ["Which treatment, if any, has been validated for the particular contaminant mixture and concentration?", "How well do emergency messages distinguish boil-water advice from chemical-contamination warnings?"],
		whatWouldChangeMinds: ["Validated contaminant-specific treatment evidence could change what is suitable for a known problem, but would not turn ordinary boiling into universal purification.", "Updated public-health guidance about a specific chemical incident or treatment failure."],
		misconceptions: ["Clear water is not necessarily chemically safe.", "Longer boiling does not guarantee removal of a dissolved contaminant.", "A boil-water notice and a do-not-drink or do-not-use notice are not interchangeable instructions."],
		misconceptionTags: ["boiling water", "toxic chemicals", "fuel contamination", "distillation"],
		editorSummary: "The first question is what made the water unsafe. Heat-based disinfection addresses organisms, while chemicals require a separately validated removal process or a different supply. Do not apply a familiar boil-water response to every contamination event.",
		uncertaintySummary: "The distinction between disinfection and chemical removal is well established. Suitability of a particular treatment depends on the contaminant and equipment; this page cannot certify an unknown supply or override incident-specific advice.",
		uncertaintyDrivers: [{ type: "implementation", detail: "An unknown mixture or local incident cannot be assessed from a generic treatment label." }],
		evidenceSummaries: [{ question: "Does emergency boiling address chemical contamination?", population: "Household water affected by emergencies", finding: "CDC explicitly excludes fuel, toxic chemicals and radioactive materials from what boiling or disinfection can make safe. EPA distinguishes boiling-and-condensing distillation from simple heating, and notes volatile-compound limits.", effectDirection: "supports", magnitude: "A treatment-target boundary, not a measured percentage reduction in every contaminant.", certainty: "high", limitations: ["No sample-specific diagnosis", "Follow local advice and use an alternative safe supply when chemical contamination is suspected"] }],
		...publication("10580c41-29e9-45d6-a0ee-19dbbc9ffb26", "New review: why boiling cannot resolve fuel or toxic chemical contamination.", "Boiling versus chemical contamination"),
		sources: [waterSources.emergency, waterSources.epaGuide]
	},
	{
		...common,
		title: "Does water-filter certification mean it removes every contaminant?",
		slug: waterSlugs.certification,
		bottomLine: "No. Certification applies to specified performance claims, a particular product and defined test conditions. A taste-and-odor claim is not a lead, PFAS or pathogen claim. Check the exact contaminant listing and performance sheet, then maintain the system as instructed.",
		stableCore: [
			"Different standards and claims address different targets. A standard number on a box is not proof that every optional reduction claim was tested.",
			"Water chemistry, flow, treatment volume, installation and cartridge replacement can affect field performance even for a certified product.",
			"Certification testing and independent field observations answer complementary questions: specified performance under test conditions and what happens during household use.",
			"A useful reduction in a measured chemical does not establish a clinical benefit, indefinite cartridge life or suitability for a different contaminant."
		],
		openQuestions: ["How does the same product perform with higher contaminant concentrations, more organic matter or greater water use?", "Which maintenance reminders and verification programs sustain performance in real households?"],
		whatWouldChangeMinds: ["Independent multi-product field testing across water chemistries and full rated capacities would strengthen generalizability.", "Replicated failures or revised certification methods could change confidence in a particular claim, without invalidating every certified technology."],
		misconceptions: ["A PFAS-removal result is not a percentage reduction in disease risk or a guarantee of zero PFAS.", "Not detecting a chemical above a laboratory limit is not proof that none remains.", "A study using historical NSF P473 certification is not a statement about today's certification criteria.", "Good results during a study do not authorize extending a manufacturer's replacement interval."],
		misconceptionTags: ["filter certification", "NSF", "PFAS filter", "carbon filter", "cartridge replacement"],
		editorSummary: "Use certification to ask a precise question: what was this exact system verified to reduce, and under what conditions? The field study illustrates both useful chemical reduction and practical limits. It does not identify a brand that works for every water supply.",
		uncertaintySummary: "The claim-specific meaning of certification is clear. A product's sustained performance in a particular home is less certain. Representative field testing should report the incoming water, maintenance, missing samples and practical failures alongside contaminant measurements.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Evidence for one formulation and source-water setting does not establish performance across all products." }, { type: "other", detail: "Detection limits, sample handling and missing observations can affect field estimates." }],
		evidenceSummaries: [
			{ question: "What does certification establish?", population: "Household treatment product claims", finding: "CDC, EPA and NSF distinguish contaminant-specific verified claims from generic technology or certification labels. A product can hold some claims without holding others.", effectDirection: "supports", magnitude: "Claim-specific verification, not universal contaminant removal.", certainty: "high", limitations: ["Exact product listings can change", "Independent certification is not indefinite protection without maintenance"] },
			{ question: "What did one longitudinal PFAS study show?", population: "18 North Carolina private-well households; one carbon-block/ion-exchange formulation", finding: "Mulhern et al. estimated 99% all-PFAS removal (95% CI 97%–99%) using censored-data modeling. Three of 18 filters clogged after 2–3 months.", effectDirection: "supports", magnitude: "Chemical reduction, not a clinical outcome or whole-class product guarantee.", certainty: "moderate", limitations: ["91 sample pairs over an eight-month window; pandemic-related gaps and 7–15-month sample storage", "Most households had not reached volume-rated capacity; results do not extend the manufacturer's replacement interval", "One formulation and water setting; no health outcomes measured"] }
		],
		coiSummary: "The North Carolina Policy Collaboratory funded the field study; authors report no conflicts. The manufacturer supplied material for characterization. NSF provides certification services. Neither source is a site brand endorsement.",
		...publication("6c57999a-8f03-452c-b331-f5d1b76f25ee", "New review: interpret contaminant-specific filter certification alongside field-performance limits.", "Water-filter certification and field durability"),
		sources: [waterSources.cdcFilters, waterSources.nsf, waterSources.field, { ...waterSources.epaGuide, order: 4 }]
	},
	{
		...common,
		title: "Does ultraviolet water disinfection also remove lead, nitrate and PFAS?",
		slug: waterSlugs.uv,
		bottomLine: "No. A household UV disinfection unit targets microorganisms; it does not by itself remove dissolved lead, nitrate or PFAS. A combined system may use other stages for those chemicals, but their performance must be verified separately.",
		stableCore: ["UV disinfection inactivates susceptible organisms rather than filtering their mass or dissolved chemicals out of the water.", "Particles and cloudy water can shield organisms from UV. Suitable pre-treatment and operation within the unit's specifications matter.", "A multi-stage system's chemical-removal claim cannot be attributed to its UV lamp alone."],
		openQuestions: ["How reliably does a specific installation deliver its validated UV exposure under varying flow and water clarity?", "Which combinations of pre-treatment, monitoring and maintenance best prevent failures in household use?"],
		whatWouldChangeMinds: ["Independent validation of a specifically engineered combined treatment could establish removal of a named chemical; that would be evidence for the complete process, not ordinary UV disinfection alone.", "Field evidence revealing failure modes could change installation and maintenance guidance."],
		misconceptions: ["Disinfected does not mean free of dissolved chemicals.", "A visible lamp or a clear-looking glass does not verify the delivered treatment dose.", "UV disinfection is not the same process as a specialized advanced-oxidation system."],
		misconceptionTags: ["UV water", "ultraviolet disinfection", "lead nitrate PFAS", "cloudy water"],
		editorSummary: "Separate the UV stage from the whole treatment system. Its job is microbial inactivation, and its performance depends on operating conditions. A chemical problem needs a separately matched and verified treatment stage.",
		uncertaintySummary: "The treatment-target distinction is established. Effectiveness for a particular organism and installation depends on validated exposure, water clarity and maintenance. This review provides neither a UV-dose prescription nor a safe-water certificate.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Particles, flow and equipment condition can change microbial inactivation even when the chemical composition is unchanged." }],
		evidenceSummaries: [{ question: "What is household UV designed to accomplish?", population: "UV drinking-water disinfection units", finding: "EPA's technology comparison identifies microbial inactivation, not chemical removal. CDC explains that UV works less well in cloudy water and describes pre-filtration as part of effective treatment.", effectDirection: "supports", magnitude: "Different treatment mechanisms; no universal log-reduction value assigned here.", certainty: "high", limitations: ["Product- and organism-specific validation remains necessary", "Other stages may be needed for chemicals", "Not an emergency override"] }],
		...publication("6331ef3b-63e4-4a5b-8e9e-6784beea0a67", "New review: distinguish UV microbial inactivation from chemical removal.", "UV drinking-water disinfection and chemical-removal limits"),
		sources: [waterSources.cdcSystems, waterSources.epaGuide, { ...waterSources.emergency, isAnchor: false, order: 3 }]
	},
	{
		...common,
		title: "Do reverse-osmosis systems all use the same amount of reject water?",
		slug: waterSlugs.ro,
		bottomLine: "No. Reverse osmosis separates incoming water into treated water and a concentrate stream, but their ratio varies with the system and operating conditions. Compare verified efficiency and contaminant claims separately. A more water-efficient unit is not automatically the right treatment for every supply.",
		stableCore: [
			"Reject-to-treated ratio counts the concentrate per unit of product water; it is not the total incoming water per unit of product or the percentage of chemicals removed.",
			"WaterSense's minimum efficiency rating is 30%. At exactly 30%, 100 units of incoming water yield 30 treated and 70 reject, or 70/30 = 2.333… reject units per treated unit. EPA describes this rounded as about 2.3:1.",
			"EPA's August 2026 clarification aligns testing with updated efficiency methods accounting for storage-tank back-pressure and automatic flushing. A tank-bypassed recovery rating can overstate normal-use efficiency.",
			"The same clarification package permits alternative packaging text pointing to the performance data sheet. Absence of the older summary table alone does not establish noncompliance."
		],
		openQuestions: ["How closely do verified ratings predict water use at a household's pressure, temperature and draw pattern?", "When can a less water-intensive technology meet the same confirmed treatment need?"],
		whatWouldChangeMinds: ["Representative field measurements under recorded inlet conditions and maintenance could refine expectations from efficiency ratings.", "Revised WaterSense or certification test methods could change the appropriate comparison while preserving the need to count concentrate."],
		misconceptions: ["30% water efficiency does not mean 30% contaminant removal.", "A 2:1 reject-to-treated ratio means three total incoming units per treated unit, not two.", "A label is not proof of certification for every optional contaminant claim.", "A generic agency example of a typical system is not a current market average or a promise about every installation."],
		misconceptionTags: ["reverse osmosis", "RO wastewater", "reject water", "WaterSense efficiency", "recovery rating"],
		editorSummary: "Read two separate parts of the performance sheet: whether the relevant contaminant reduction was verified, and how much input water becomes useful product. The 30% example is a transparent certification-threshold calculation, not a measurement of every unit or a reason to install RO unnecessarily.",
		uncertaintySummary: "Mass balance and the stated certification threshold are clear. Real consumption depends on hardware, water conditions, storage, flushing and use. The specification and August 2026 clarifications were checked directly; the entire underlying NSF standard was not independently appraised.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Standardized efficiency testing and a particular household's usage and inlet conditions can differ." }],
		evidenceSummaries: [{ question: "How should water efficiency be interpreted?", population: "Complete point-of-use RO systems within WaterSense scope, not standalone replacement membranes or whole-building systems", finding: "The November 2024 specification and August 2026 clarifications retain a minimum 30% efficiency rating and distinguish that water-use requirement from contaminant-reduction performance. The reject ratio follows (100/efficiency percentage) minus one.", effectDirection: "supports", magnitude: "At the 30% threshold: 70/30 reject-to-treated, rounded by EPA to 2.3:1. This is a threshold illustration, not a field-study result.", certainty: "high", limitations: ["No individualized savings estimate", "Verified performance claims remain contaminant-specific", "Current clarification supersedes older test and packaging wording"] }],
		...publication("4dc583ce-244d-4fdd-ad74-5ad8c82fa82c", "New review: RO reject-water denominators and the August 2026 efficiency clarification.", "Point-of-use RO efficiency and reject-water measurement"),
		sources: [waterSources.ro, waterSources.roSpec, waterSources.roClarifications]
	},
	{
		...common,
		title: "Does softening hard water make it microbiologically safe?",
		slug: waterSlugs.softening,
		bottomLine: "No. Conventional water softening targets calcium and magnesium that contribute to hardness and scale. It is not a disinfection step and does not establish that parasites, bacteria or viruses have been controlled. Hardness alone is generally not a health hazard.",
		stableCore: ["Hardness is a mineral property, not a measurement of pathogens or every dissolved chemical.", "A conventional cation-exchange softener and a scale-conditioning device do not necessarily perform the same treatment; reduced scaling is not proof of mineral removal or disinfection.", "Salt-regenerated softeners use water during regeneration and discharge salts. Maintenance and local discharge conditions matter."],
		openQuestions: ["Which softening or scale-control approach meets a household's confirmed equipment needs with the least regeneration water and salt?", "How should regeneration be matched to actual hardness and use while preserving performance?"],
		whatWouldChangeMinds: ["A combined system with separately validated disinfection could establish pathogen control, but that would not be a benefit inferred from its softening stage alone.", "Independent field data could improve comparisons of scale control, water use and salt discharge."],
		misconceptions: ["Water that lathers more easily is not thereby proven safer to drink.", "A softener's hardness rating is not a microbial-removal rating.", "No scale does not mean no contaminants, and more scale does not by itself prove a dangerous supply."],
		misconceptionTags: ["hard water", "water softener", "scale", "calcium magnesium", "disinfection"],
		editorSummary: "Treat a hardness problem as a hardness problem. Softer water may help appliances and cleaning, but it provides no general evidence that pathogens or unrelated contaminants are absent. Separate any genuine drinking-water concern from nuisance mineral deposits.",
		uncertaintySummary: "The mineral-removal versus disinfection distinction is clear. The value and resource cost of softening vary with hardness, equipment and regeneration. This review does not assign a personal sodium allowance, plumbing specification or jurisdiction-wide installation rule.",
		uncertaintyDrivers: [{ type: "implementation", detail: "System sizing, regeneration controls and local discharge constraints affect costs and environmental trade-offs." }],
		evidenceSummaries: [{ question: "Does softening control disease-causing organisms?", population: "Conventional household water softeners", finding: "CDC lists calcium and magnesium removal but not parasite, bacterial or viral removal. EPA's guide treats hardness control separately from disinfection and discusses regeneration water and salt discharge.", effectDirection: "supports", magnitude: "Different treatment targets, not a numerical reduction in infection risk.", certainty: "high", limitations: ["Other system components require their own validation", "Hardness cannot characterize an unknown water sample", "Device-specific and local operating constraints remain"] }],
		...publication("35e20fe0-912c-48ec-bf21-63c75543b056", "New review: hardness control is not water disinfection.", "Water softening versus microbial safety"),
		sources: [waterSources.cdcSystems, waterSources.epaGuide]
	}
];
