import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-12T03:20:10.000Z";
export const foodStorageSlugs = {
	chill: "does-refrigeration-keep-leftovers-safe-indefinitely",
	freeze: "does-freezing-food-kill-all-pathogens",
	reheat: "does-reheating-make-improperly-stored-food-safe",
	senses: "can-smell-and-appearance-tell-whether-food-is-safe",
	vacuum: "does-vacuum-sealing-replace-refrigeration"
};
export const foodStorageGaps = [
	{ slug: foodStorageSlugs.chill, gap: "No prior canonical refrigerator or leftover-storage review; separates slowed growth from indefinite safety and retains food-specific storage history.", relatedExistingSlugs: [] },
	{ slug: foodStorageSlugs.freeze, gap: "No prior food-freezing review; distinguishes preventing growth during storage from eliminating viable pathogens or toxins.", relatedExistingSlugs: [] },
	{ slug: foodStorageSlugs.reheat, gap: "No prior reheating review; separates adequate heating of safely handled food from attempts to reverse unsafe storage and preformed toxins.", relatedExistingSlugs: [] },
	{ slug: foodStorageSlugs.senses, gap: "No prior food-sensory-safety review; separates spoilage detection from pathogen detection and retains regional date-label meanings.", relatedExistingSlugs: [] },
	{ slug: foodStorageSlugs.vacuum, gap: "No prior vacuum-food-packaging review; distinguishes packaging atmosphere from validated preservation and cold-chain controls.", relatedExistingSlugs: [] }
];
function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return { appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: checkedAt, statusSources: [entry.url!], ...entry };
}
export const foodStorageSources = {
	fda: source({ kind: "guideline", title: "Are You Storing Food Safely?", publisher: "US Food and Drug Administration", url: "https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely", isAnchor: true, stance: "supports", order: 1, note: "Current storage, refrigeration and freezer sections read. US consumer guidance, not an individual food test. Frozen-storage safety assumes safe prior handling and continued suitable conditions. Regional label meanings, power-outage wording and mold generalizations are not exported as universal rules." }),
	efsa: source({ kind: "guideline", title: "Guidance on date marking and related food information: part 2 (food information)", publisher: "EFSA Journal", year: 2021, doi: "10.2903/j.efsa.2021.6510", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8061283/", isAnchor: true, stance: "supports", order: 1, note: "Primary full text obtained through Europe PMC. Expert-led literature selection, scope, uncertainty, opening-package and freezing/thawing sections checked. Business guidance, not a pooled household intervention trial. A competing-interest waiver is disclosed; underlying declarations/minutes were not audited. No generic survival percentage or decision-tree risk score adopted." }),
	chilling: source({ kind: "guideline", title: "How to chill, freeze and defrost food safely", publisher: "UK Food Standards Agency", year: 2017, url: "https://www.gov.uk/government/publications/how-to-chill-freeze-and-defrost-food-safely/how-to-chill-freeze-and-defrost-food-safely", isAnchor: true, stance: "supports", order: 1, note: "Current official guidance reached through the former FSA URL; chilling/freezing sections checked. Applies to England, Northern Ireland and Wales. Its household time advice is not combined with US guidance into one universal storage schedule. Appliance settings are not proof of actual food temperature." }),
	labels: source({ kind: "guideline", title: "Understanding food labelling: Best before and use-by dates", publisher: "UK government / Food Standards Agency", url: "https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates", isAnchor: true, stance: "supports", order: 2, note: "Current primary page read. In this guidance use-by addresses safety and best-before quality; storage instructions still apply. US label usage differs. Sensory assessment of quality is not a general test for pathogens; no advice to taste suspect food is supplied." }),
	cereulide: source({ kind: "context", title: "Cereulide and Emetic Bacillus cereus: Characterizations, Impacts and Public Precautions", publisher: "Foods", year: 2023, doi: "10.3390/foods12040833", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9956921/", stance: "supports", order: 2, note: "Primary full text via Europe PMC: introduction, toxin characterization, temperature, precautions, conclusions and funding checked. Narrative review with no reproducible systematic search identified. Cereulide differs from heat-sensitive enterotoxins; no universal dose, heating recipe or claim that all toxins resist heat is adopted. Broad refrigeration statements are qualified by strain-specific research." }),
	lab: source({ kind: "landmark_study", title: "Detection of Enterotoxigenic Psychrotrophic Presumptive Bacillus cereus and Cereulide Producers in Food Products and Ingredients", publisher: "Toxins", year: 2022, doi: "10.3390/toxins14040289", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9030337/", stance: "context", isAnchor: false, order: 3, note: "Primary 2019 retail-sampling, enrichment, gene-screening, culture and toxin methods/results checked. Selected communities were grown on laboratory medium; not household illness incidence. Abstract says no toxin at 4°C, but results report one trace detection. Some prevalence denominators are inconsistent; no prevalence, toxin amount or universal zero-risk claim adopted. No raw-data replication or formal correction resolution." }),
	vacuum: source({ kind: "guideline", title: "The safety and shelf-life of vacuum and modified atmosphere packed chilled foods with respect to non-proteolytic Clostridium botulinum", publisher: "UK Food Standards Agency", year: 2020, url: "https://www.gov.uk/government/publications/vacuum-packaging", isAnchor: true, stance: "supports", order: 1, note: "Current official landing page and linked December 2020 primary PDF checked for scope, hazards, controls, model limits and rewrapping. Business guidance excludes specified fresh meats and has a past planned review date; it is not a home-storage guarantee or current legal audit. No universal ten-day allowance, safe vacuum recipe or food-specific shelf life adopted." })
};
const common = {
	topicSlug: "agriculture-and-food-systems",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	// Legacy editorial field; not a fraction of scientists or meals made safe.
	confidenceScore: 75,
	searchDatabases: ["Consensus.app targeted discovery", "FDA and FSA primary guidance", "EFSA and primary papers through Europe PMC"],
	searchCutoffAt: checkedAt,
	inclusionRules: ["Separate microbial growth, survival, toxin formation and food spoilage.", "Retain the food, organism, storage conditions and jurisdiction behind guidance.", "Use primary methods to distinguish laboratory findings from household outcomes."],
	exclusionRules: ["No universal storage-life calculator, personal illness probability or invented consensus percentage.", "Do not infer safety from appearance, a feature name or a single temperature without history.", "Do not treat all microbial toxins or all foods as interchangeable."],
	appraisalTools: ["Targeted source and applicability checks; independent formal appraisal not completed"],
	institutionalAnchors: [{ name: "FDA, FSA and EFSA", role: "Institutional guidance with different audiences and scopes, not independent estimates on a common scale" }],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	coiSummary: "Institutional guidance and reviews can share evidence. Source-specific disclosures and access limits are retained; no product endorsement or independent food testing is provided.",
	independenceSummary: "A guidance document and a review citing the same experiments are not independent replications. Source counts do not measure agreement.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;
function publication(id: string, summary: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return { changeLog: [{ date: checkedAt, kind: "publication", summary }], readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary }, surveillanceSpec: { focus: summary, cadenceDays: 90, watchTerms: ["Household food storage, pathogen survival and toxin control"], integrityMonitors: ["Corrections and updates to cited food microbiology papers"], guidelineMonitors: ["FDA, FSA and EFSA storage and food safety guidance"], triggerRules: ["Reassess when relevant guidance, validated food-specific controls or source corrections change the conclusion."] } };
}
export const foodStorageClaims: SeedClaim[] = [
	{
		...common,
		title: "Does refrigeration keep leftovers safe indefinitely?",
		slug: foodStorageSlugs.chill,
		bottomLine: "No. Refrigeration limits microbial growth but does not sterilize food or provide unlimited safe storage. Some pathogens can grow in chilled food, and safety still depends on earlier handling, actual temperature, time and the particular food. Follow applicable storage instructions rather than assuming that being in a fridge is enough.",
		stableCore: ["FDA guidance identifies refrigerated ready-to-eat foods as a setting where Listeria can grow during storage.", "Opening a package can introduce contamination and change the conditions on which its original shelf life was based.", "A 2022 study found cold-growing presumptive Bacillus cereus communities after laboratory enrichment; growth on culture medium is not a measured illness rate in refrigerated meals."],
		openQuestions: ["How well do real household time-temperature histories match the assumptions used for a particular product?", "Which food-specific controls remain effective after opening and handling?"],
		whatWouldChangeMinds: ["Validated product-specific evidence can change a storage limit, without establishing indefinite safety for all leftovers."],
		misconceptions: ["Cold is a control condition, not proof that contamination was absent.", "A thermostat setting does not measure every part of the stored food.", "Detecting a toxin gene, observing growth and measuring toxin are different findings."],
		misconceptionTags: ["leftovers", "refrigerator", "food storage", "Listeria", "cold chain"],
		editorSummary: "Ask what has happened to the food before and after it entered the refrigerator. The relevant history includes cooling, storage, opening and handling. A general review can explain those dependencies but cannot reconstruct them from the word refrigerated.",
		uncertaintySummary: "No common safe number of days applies to every food. The laboratory study used selected communities and artificial growth conditions; its prevalence denominators and abstract/results toxin wording have discrepancies. No quantitative result from it is used as a household risk estimate.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Culture growth differs from microbial behavior in a particular meal." }, { type: "implementation", detail: "Temperature, handling and food composition vary." }],
		evidenceSummaries: [{ question: "What does refrigeration establish?", population: "Perishable foods under food-specific storage conditions", finding: "It helps control growth, while guidance and microbiology retain limits related to time, organism and handling.", effectDirection: "supports", magnitude: "No universal shelf life or reduction in illness is calculated.", certainty: "moderate", limitations: ["Unknown individual storage history", "Laboratory selection and food-matrix differences"] }],
		coiSummary: "The laboratory paper reports Ghent University Special Research Fund support and no conflicts. EFSA discloses a competing-interest waiver for a working-group expert; individual declarations and meeting minutes were not independently audited.",
		...publication("de34b507-73c5-49ac-aad9-cd809d12e401", "New review: refrigeration controls growth but does not create indefinite leftover safety."),
		sources: [foodStorageSources.fda, { ...foodStorageSources.efsa, order: 2 }, foodStorageSources.lab]
	},
	{
		...common,
		title: "Does freezing food kill all pathogens?",
		slug: foodStorageSlugs.freeze,
		bottomLine: "No. Freezing is useful for stopping microbial growth during frozen storage, but surviving pathogens can remain. Thawing and later handling matter again. Freezing food that was already unsafe does not reliably make it safe, and a frozen product is not necessarily ready to eat without cooking.",
		stableCore: ["EFSA describes variable survival across organisms, foods and freezing conditions; bacterial spores and some viruses can persist.", "FDA's advice about continued frozen storage assumes proper prior handling and storage conditions.", "Freezer burn concerns quality; absence of freezer burn does not certify microbiological safety."],
		openQuestions: ["How do thawing conditions and food structure affect survival and renewed growth for particular food-pathogen combinations?"],
		whatWouldChangeMinds: ["A validated organism- and product-specific process may establish an inactivation claim; ordinary household freezing alone does not supply that validation."],
		misconceptions: ["No growth while frozen is different from no surviving pathogens.", "A frozen label is not a ready-to-eat label.", "Quality loss and foodborne hazard are not the same measurement."],
		misconceptionTags: ["freezing food", "frozen bacteria", "defrosting", "freezer burn", "frozen vegetables"],
		editorSummary: "Separate what happens during storage from what happens next. A freezer can preserve an existing condition, including contamination. Read the product's preparation instructions as part of the process rather than treating freezing as a replacement for them.",
		uncertaintySummary: "The EFSA synthesis is expert-led guidance, not a pooled trial of home freezers. It identifies uncertainties in injured-organism detection and thawing behavior. No common kill percentage or thawed-food storage allowance is transferred across foods.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Organisms, matrices and freezing/thawing procedures differ." }],
		evidenceSummaries: [{ question: "Does frozen storage imply elimination?", population: "Frozen foods with potentially surviving pathogens", finding: "Survival remains possible and subsequent handling can permit renewed growth or contamination.", effectDirection: "supports", magnitude: "Qualitative distinction, not a universal inactivation rate.", certainty: "moderate", limitations: ["Food-specific conditions", "No individual package assessment"] }],
		...publication("de34b507-73c5-49ac-aad9-cd809d12e402", "New review: frozen storage, pathogen survival and the role of thawing."),
		sources: [foodStorageSources.efsa, { ...foodStorageSources.fda, order: 2 }, { ...foodStorageSources.chilling, order: 3 }]
	},
	{
		...common,
		title: "Does reheating make improperly stored food safe?",
		slug: foodStorageSlugs.reheat,
		bottomLine: "Not reliably. Appropriate heating can control many living pathogens, but it is not a universal repair for unsafe storage. Some hazards, including preformed cereulide toxin from certain Bacillus cereus strains, can persist through ordinary reheating. Safe preparation, cooling and storage remain necessary before reheating.",
		stableCore: ["Living cells, resistant spores and toxins already formed in food are different control targets.", "The 2023 cereulide review distinguishes that heat-stable toxin from heat-sensitive diarrheal enterotoxins; not every bacterial toxin behaves alike.", "Food can be heated unevenly, so a warm surface is not proof of adequate treatment throughout."],
		openQuestions: ["Which validated time-temperature processes control a specified organism in a specified food?", "How can practical instructions improve cooling and uniform reheating without encouraging rescue of suspect food?"],
		whatWouldChangeMinds: ["Validated control of the actual hazard could support a specific processing claim. A general reheating temperature alone does not establish removal of every hazard."],
		misconceptions: ["Killing bacteria does not necessarily remove a toxin produced earlier.", "Not all toxins are heat-stable, and not all Bacillus cereus strains produce cereulide.", "A reheating recommendation assumes the rest of the handling process was appropriate."],
		misconceptionTags: ["reheating leftovers", "rice food poisoning", "Bacillus cereus", "cereulide", "heat stable toxin"],
		editorSummary: "The claim depends on what needs to be removed. A treatment can be useful for one hazard while leaving another unchanged. This review explains that boundary; it does not provide a method for salvaging food with an uncertain or unsafe storage history.",
		uncertaintySummary: "The cereulide paper is a narrative review. Its broad wording about eliminating organisms and its temperature advice should not replace product-specific guidance. No toxin dose, symptom prediction or universal kill temperature is calculated here.",
		uncertaintyDrivers: [{ type: "mechanism", detail: "Cells, spores and preformed toxins respond differently to heat." }],
		evidenceSummaries: [{ question: "Can reheating reverse all unsafe storage?", population: "Previously stored food with possible viable pathogens or preformed toxins", finding: "Heating and toxin control are different questions; cereulide is a relevant counterexample to a universal rescue claim.", effectDirection: "supports", magnitude: "No general rescue process or personal risk estimate.", certainty: "moderate", limitations: ["Hazard and food specificity", "Narrative review, not a household comparative trial"] }],
		coiSummary: "The cereulide review reports Chinese National Key R&D international cooperation funding, grant 2019YFE0103800, and no competing financial interests. This review did not independently reappraise every cited experiment.",
		...publication("de34b507-73c5-49ac-aad9-cd809d12e403", "New review: why reheating does not reliably reverse unsafe food storage."),
		sources: [{ ...foodStorageSources.cereulide, order: 1 }, { ...foodStorageSources.efsa, order: 2 }, { ...foodStorageSources.fda, order: 3 }]
	},
	{
		...common,
		title: "Can smell and appearance tell whether food is safe?",
		slug: foodStorageSlugs.senses,
		bottomLine: "They can reveal some spoilage, but normal smell and appearance cannot rule out foodborne pathogens. Sensory quality checks are not substitutes for safe handling and applicable storage instructions. Do not use tasting as a way to test suspect food for safety.",
		stableCore: ["FDA distinguishes organisms causing illness from those causing obvious spoilage.", "UK guidance separates use-by safety dates from best-before quality dates, while US date-label usage differs.", "Food can become unsafe before its stated date if storage instructions are not followed."],
		openQuestions: ["Which label wording best helps readers distinguish quality from safety without unnecessary waste?"],
		whatWouldChangeMinds: ["A validated test can assess a specified hazard. A general smell test would need reliable hazard detection across the relevant foods before it could replace safety controls."],
		misconceptions: ["Smells fine does not mean pathogen-free.", "A best-before date and a use-by date do not have one worldwide meaning.", "The inability to detect pathogens by smell does not make obvious spoilage irrelevant."],
		misconceptionTags: ["smell test", "food appearance", "use by", "best before", "food spoilage"],
		editorSummary: "A sign can be useful without being a complete test. An unpleasant odor may prompt rejection, while its absence supplies much less information. Keep that asymmetry in mind when interpreting both a sensory check and a printed label.",
		uncertaintySummary: "This review does not estimate the sensitivity of a home smell test or determine whether a particular food is safe. Labels, products and regional guidance differ. Neither a date nor a sensory observation reconstructs missing handling history.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Sensory observations do not directly measure pathogen presence or toxin." }],
		evidenceSummaries: [{ question: "What can a sensory check establish?", population: "Household assessment of food quality and potential hazards", finding: "Spoilage cues and pathogen detection are different; normal senses cannot certify microbiological safety.", effectDirection: "supports", magnitude: "No sensitivity, specificity or personal-risk percentage supplied.", certainty: "moderate", limitations: ["Regional label meanings", "Food- and hazard-specific assessment"] }],
		...publication("de34b507-73c5-49ac-aad9-cd809d12e404", "New review: the limits of smell, appearance and date labels as food safety checks."),
		sources: [foodStorageSources.fda, foodStorageSources.labels]
	},
	{
		...common,
		title: "Does vacuum sealing replace refrigeration?",
		slug: foodStorageSlugs.vacuum,
		bottomLine: "No. Vacuum sealing changes the package atmosphere; it does not sterilize food or make a perishable product shelf-stable. It can slow some spoilage while permitting hazards that tolerate low oxygen. Chilling, time limits and other validated controls still depend on the product and its instructions.",
		stableCore: ["FSA guidance treats vacuum packaging as part of a system of controls, rather than a standalone safety treatment.", "Non-proteolytic Clostridium botulinum can grow and form toxin under suitable low-oxygen chilled conditions; other hazards also require control.", "Rewrapping or resealing does not automatically restart a product's safe storage life."],
		openQuestions: ["Which combination of processing, composition and storage controls is validated for the particular product?"],
		whatWouldChangeMinds: ["A validated shelf-stable process can support room-temperature storage for its specified product. Removing air alone does not demonstrate that process."],
		misconceptions: ["A sealed appearance is not proof of commercial sterilization.", "Removing oxygen does not stop every pathogen.", "The business guidance's ten-day framework is not a universal safe allowance for home-vacuum-packed food."],
		misconceptionTags: ["vacuum sealing", "vacuum packed food", "modified atmosphere", "botulism", "shelf stable"],
		editorSummary: "Ask which preservation step was actually performed. Packaging, heat treatment, formulation and temperature control can play different roles. A household sealing appliance does not establish that a manufacturer's validated process has been reproduced.",
		uncertaintySummary: "The current official FSA page links a December 2020 document with a past planned review date and specific product exclusions. Its business framework is used for mechanisms and limits, not current legal certification or a home-storage recipe. No individual packet is assessed.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Food composition, processing and temperature determine whether controls are adequate." }],
		evidenceSummaries: [{ question: "What does removing air establish?", population: "Vacuum or modified-atmosphere packaged perishable foods", finding: "It changes microbial conditions and must be considered alongside food-specific controls; it does not substitute for the cold chain.", effectDirection: "supports", magnitude: "No universal shelf-life extension or kill percentage.", certainty: "moderate", limitations: ["Business guidance with defined scope", "No product validation or home appliance testing"] }],
		...publication("de34b507-73c5-49ac-aad9-cd809d12e405", "New review: vacuum packaging, refrigeration and validated preservation controls."),
		sources: [foodStorageSources.vacuum, { ...foodStorageSources.efsa, order: 2 }]
	}
];
