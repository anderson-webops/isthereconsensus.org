import type {
	ClaimAgreementLevel,
	ClaimConsensusBand,
	ClaimEvidenceCertainty,
	ClaimEvidenceDirection,
	ClaimReviewMode,
	ClaimStatus,
	IClaimEvidenceSummary,
	IClaimInstitutionalAnchor,
	IClaimSurveillanceSpec,
	IClaimUncertaintyDriver
} from "../models/schemas/Claim.js";
import type {
	ClaimSourceAppraisal,
	ClaimSourceCitationStatus,
	ClaimSourceKind,
	ClaimSourceStance
} from "../models/schemas/ClaimSource.js";

interface SeedClaimSource {
	kind: ClaimSourceKind;
	title: string;
	publisher: string;
	year?: number;
	url?: string;
	doi?: string;
	pmid?: string;
	pmcid?: string;
	isAnchor?: boolean;
	appraisal?: ClaimSourceAppraisal;
	citationStatus?: ClaimSourceCitationStatus;
	citationCheckedAt?: string;
	statusSources?: string[];
	stance: ClaimSourceStance;
	note: string;
	order: number;
}

interface SeedClaimChangeLogEntry {
	date: string;
	kind: "publication" | "update" | "correction" | "review";
	summary: string;
}

export interface SeedClaim {
	topicSlug: string;
	title: string;
	slug: string;
	status: ClaimStatus;
	consensusBand: ClaimConsensusBand;
	confidenceScore: number;
	bottomLine: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	misconceptionTags?: string[];
	editorSummary: string;
	uncertaintySummary?: string;
	uncertaintyDrivers?: IClaimUncertaintyDriver[];
	sources: SeedClaimSource[];
	agreementLevel?: ClaimAgreementLevel;
	evidenceCertainty?: ClaimEvidenceCertainty;
	reviewMode?: ClaimReviewMode;
	searchDatabases?: string[];
	searchCutoffAt?: string;
	inclusionRules?: string[];
	exclusionRules?: string[];
	surveillanceSpec?: IClaimSurveillanceSpec;
	appraisalTools?: string[];
	evidenceSummaries?: IClaimEvidenceSummary[];
	institutionalAnchors?: IClaimInstitutionalAnchor[];
	authorLine?: string;
	reviewerLine?: string;
	coiSummary?: string;
	independenceSummary?: string;
	lastRetractionCheckAt?: string;
	changeLog?: SeedClaimChangeLogEntry[];
}

export interface CompleteSeedClaim extends SeedClaim {
	agreementLevel: ClaimAgreementLevel;
	evidenceCertainty: ClaimEvidenceCertainty;
	reviewMode: ClaimReviewMode;
	searchDatabases: string[];
	searchCutoffAt: string;
	inclusionRules: string[];
	exclusionRules: string[];
	surveillanceSpec: IClaimSurveillanceSpec;
	appraisalTools: string[];
	evidenceSummaries: IClaimEvidenceSummary[];
	institutionalAnchors: IClaimInstitutionalAnchor[];
	misconceptionTags: string[];
	authorLine: string;
	reviewerLine: string;
	coiSummary: string;
	independenceSummary: string;
	uncertaintySummary: string;
	uncertaintyDrivers: IClaimUncertaintyDriver[];
	lastRetractionCheckAt: string;
	changeLog: SeedClaimChangeLogEntry[];
}

const seedTimestamp = new Date("2026-04-11T12:00:00.000Z").toISOString();
const nonAlphanumericPattern = /[^a-z0-9\s]/g;
const whitespacePattern = /\s+/;

function inferAgreementLevel(consensusBand: ClaimConsensusBand): ClaimAgreementLevel {
	if (consensusBand === "strong") return "strong";
	if (consensusBand === "broad") return "broad_qualified";
	if (consensusBand === "mixed") return "divided";
	return "frontier";
}

function inferEvidenceCertainty(confidenceScore: number): ClaimEvidenceCertainty {
	if (confidenceScore >= 90) return "high";
	if (confidenceScore >= 75) return "moderate";
	if (confidenceScore >= 55) return "low";
	return "very_low";
}

function defaultSearchDatabases(topicSlug: string) {
	if (
		topicSlug === "health-and-medicine"
		|| topicSlug === "nutrition-and-diet"
		|| topicSlug === "neuroscience-and-psychology"
	) {
		return ["PubMed", "OpenAlex", "Crossref"];
	}
	if (topicSlug === "climate-and-environment") {
		return ["OpenAlex", "Crossref", "IPCC assessment reports"];
	}
	if (topicSlug === "historical-case-studies") {
		return ["OpenAlex", "Crossref", "National Academies / official historical reviews"];
	}
	return ["OpenAlex", "Crossref", "Major institutional reports"];
}

function defaultSurveillanceCadenceDays(seed: SeedClaim) {
	if (seed.reviewMode === "living") return 30;
	if (seed.consensusBand === "strong" && seed.confidenceScore >= 90) return 120;
	if (seed.consensusBand === "broad") return 90;
	if (seed.consensusBand === "mixed") return 60;
	return 45;
}

function defaultIntegrityMonitors(topicSlug: string) {
	if (
		topicSlug === "health-and-medicine"
		|| topicSlug === "nutrition-and-diet"
		|| topicSlug === "neuroscience-and-psychology"
		|| topicSlug === "genetics-and-biotechnology"
	) {
		return ["Crossref update metadata", "PubMed linking", "Europe PMC status checks"];
	}
	return ["Crossref update metadata", "Manual institutional watch", "Editorial source audit"];
}

function defaultGuidelineMonitors(topicSlug: string) {
	if (topicSlug === "health-and-medicine") {
		return ["WHO guidance streams", "CDC guidance updates", "Cochrane review updates"];
	}
	if (topicSlug === "nutrition-and-diet") {
		return ["Dietary Guidelines for Americans", "WHO nutrition updates", "AHA / ACC updates"];
	}
	if (topicSlug === "climate-and-environment") {
		return ["IPCC assessment cycle", "NASA climate indicators", "NOAA climate updates"];
	}
	if (topicSlug === "genetics-and-biotechnology") {
		return ["WHO biotechnology guidance", "FAO food-safety updates", "National Academies reviews"];
	}
	if (topicSlug === "neuroscience-and-psychology") {
		return ["APA guidance", "NIH / NIMH review updates", "Campbell review updates"];
	}
	if (topicSlug === "historical-case-studies") {
		return ["Field-specific retrospective reviews", "National Academies archives", "Public-health archive updates"];
	}
	return ["Major institutional reviews", "Guideline registries", "Editorial manual review"];
}

function defaultWatchTerms(seed: SeedClaim) {
	const tokens = seed.title
		.toLowerCase()
		.replaceAll(nonAlphanumericPattern, " ")
		.split(whitespacePattern)
		.filter(token => token.length > 3)
		.slice(0, 4);

	return Array.from(
		new Set([
			seed.title,
			...tokens,
			...seed.sources.slice(0, 2).map(source => source.publisher).filter(Boolean)
		])
	).slice(0, 6);
}

function defaultTriggerRules(seed: SeedClaim) {
	return [
		"Escalate immediately if any cited source is retracted, corrected in a major way, or receives an expression of concern.",
		"Open a high-priority review if a new systematic review, meta-analysis, or assessment could change the public-facing bottom line.",
		"Open a high-priority review if a major guideline body changes its recommendation, scope, or uncertainty language.",
		seed.consensusBand === "strong"
			? "Batch routine surveillance on the normal cadence unless a major misinformation spike changes the practical need for a visible update."
			: "Keep this claim on a tighter surveillance loop because qualified agreement and active uncertainty are part of the public explanation."
	];
}

function defaultSurveillanceSpec(seed: SeedClaim): IClaimSurveillanceSpec {
	return {
		focus: `Track new syntheses, institutional guidance, and post-publication changes relevant to "${seed.title}".`,
		cadenceDays: defaultSurveillanceCadenceDays(seed),
		watchTerms: defaultWatchTerms(seed),
		integrityMonitors: defaultIntegrityMonitors(seed.topicSlug),
		guidelineMonitors: defaultGuidelineMonitors(seed.topicSlug),
		triggerRules: defaultTriggerRules(seed)
	};
}

function defaultInstitutionalAnchors(topicSlug: string): IClaimInstitutionalAnchor[] {
	if (topicSlug === "health-and-medicine") {
		return [
			{ name: "World Health Organization", role: "Global public-health guideline anchor" },
			{
				name: "Centers for Disease Control and Prevention",
				role: "Current U.S. implementation and safety anchor"
			},
			{ name: "Cochrane", role: "Evidence-synthesis anchor for intervention questions" }
		];
	}
	if (topicSlug === "nutrition-and-diet") {
		return [
			{ name: "Dietary Guidelines for Americans", role: "Structured nutrition evidence-review anchor" },
			{ name: "World Health Organization", role: "Global nutrition guidance anchor" },
			{ name: "American Heart Association", role: "Cardiometabolic risk interpretation anchor" }
		];
	}
	if (topicSlug === "climate-and-environment") {
		return [
			{ name: "IPCC", role: "Primary climate assessment anchor" },
			{ name: "NASA", role: "Observational climate evidence anchor" },
			{ name: "NOAA", role: "Attribution, trends, and indicator anchor" }
		];
	}
	if (topicSlug === "genetics-and-biotechnology") {
		return [
			{ name: "World Health Organization", role: "Public-health and biotechnology governance anchor" },
			{ name: "FAO", role: "Food and agricultural safety anchor" },
			{ name: "National Academies", role: "Independent risk and evidence review anchor" }
		];
	}
	if (topicSlug === "neuroscience-and-psychology") {
		return [
			{ name: "American Psychological Association", role: "Professional practice and evidence-synthesis anchor" },
			{ name: "NIH / NIMH", role: "Research and review anchor for brain and mental-health claims" },
			{ name: "Campbell Collaboration", role: "Intervention-review anchor for social and behavioral claims" }
		];
	}
	if (topicSlug === "historical-case-studies") {
		return [
			{ name: "National Academies", role: "Retrospective evidence and policy-review anchor" },
			{ name: "CDC / Surgeon General archives", role: "Public-health record anchor where relevant" },
			{ name: "Major field-specific reviews", role: "Historical synthesis anchor for how the consensus shifted" }
		];
	}
	return [
		{ name: "National Academies", role: "General evidence-synthesis anchor" },
		{ name: "Major institutional reviews", role: "Field-specific consensus anchor" }
	];
}

function inferEffectDirection(consensusBand: ClaimConsensusBand): ClaimEvidenceDirection {
	if (consensusBand === "strong" || consensusBand === "broad") return "supports";
	if (consensusBand === "mixed") return "mixed";
	return "unclear";
}

function defaultMagnitudeNote(seed: SeedClaim) {
	if (seed.consensusBand === "strong") {
		return "The direction of the claim is stable across major syntheses; remaining disagreement is mostly about edge cases, timing, or magnitude.";
	}
	if (seed.consensusBand === "broad") {
		return "The core direction holds, but the practical size of the effect depends on context, subgroup, or implementation details.";
	}
	if (seed.consensusBand === "mixed") {
		return "Credible sources do not converge cleanly on one effect size or interpretation yet.";
	}
	return "The evidence base is still too unsettled for a stable magnitude estimate.";
}

function defaultEvidenceSummaries(seed: SeedClaim): IClaimEvidenceSummary[] {
	return [
		{
			question: seed.title,
			population: "Public-facing summary built from the highest-weight evidence available for this claim.",
			finding: seed.bottomLine,
			effectDirection: inferEffectDirection(seed.consensusBand),
			magnitude: defaultMagnitudeNote(seed),
			certainty: seed.evidenceCertainty ?? inferEvidenceCertainty(seed.confidenceScore),
			limitations: seed.openQuestions.slice(0, 3).length
				? seed.openQuestions.slice(0, 3)
				: ["This seeded page still needs a more detailed outcome-level evidence summary."]
		}
	];
}

function inferUncertaintyType(detail: string): IClaimUncertaintyDriver["type"] {
	const normalized = detail.toLowerCase();
	if (
		normalized.includes("subgroup")
		|| normalized.includes("population")
		|| normalized.includes("community")
		|| normalized.includes("setting")
		|| normalized.includes("pregnan")
		|| normalized.includes("child")
		|| normalized.includes("adult")
	) {
		return "generalizability";
	}
	if (
		normalized.includes("mechanism")
		|| normalized.includes("pathway")
		|| normalized.includes("biolog")
		|| normalized.includes("trigger")
	) {
		return "mechanism";
	}
	if (
		normalized.includes("magnitude")
		|| normalized.includes("size")
		|| normalized.includes("how large")
		|| normalized.includes("how big")
		|| normalized.includes("effect")
		|| normalized.includes("risk")
		|| normalized.includes("incidence")
		|| normalized.includes("rate")
	) {
		return "imprecision";
	}
	if (
		normalized.includes("long-term")
		|| normalized.includes("long term")
		|| normalized.includes("follow-up")
		|| normalized.includes("follow up")
		|| normalized.includes("over time")
		|| normalized.includes("duration")
		|| normalized.includes("future")
	) {
		return "timing";
	}
	if (
		normalized.includes("communicat")
		|| normalized.includes("intervention")
		|| normalized.includes("policy")
		|| normalized.includes("schedule")
		|| normalized.includes("implement")
		|| normalized.includes("rollout")
	) {
		return "implementation";
	}
	if (
		normalized.includes("disagree")
		|| normalized.includes("inconsistent")
		|| normalized.includes("split")
		|| normalized.includes("diverge")
	) {
		return "inconsistency";
	}
	if (
		normalized.includes("bias")
		|| normalized.includes("confound")
		|| normalized.includes("selection")
		|| normalized.includes("measurement")
	) {
		return "bias";
	}
	if (
		normalized.includes("proxy")
		|| normalized.includes("indirect")
		|| normalized.includes("adjacent")
		|| normalized.includes("surrogate")
	) {
		return "indirectness";
	}
	return "other";
}

function defaultUncertaintySummary(seed: SeedClaim) {
	const certainty = seed.evidenceCertainty ?? inferEvidenceCertainty(seed.confidenceScore);
	if (certainty === "high") {
		return "The core direction of this claim is stable across the highest-weight sources. Most remaining uncertainty is about subgroup boundaries, effect size, or how the answer travels across settings, not whether the core conclusion reverses.";
	}
	if (certainty === "moderate") {
		return "The overall direction looks reliable, but important details could still move. Editors should treat the main conclusion as durable while keeping effect size, subgroup risk, and implementation limits visible.";
	}
	if (certainty === "low") {
		return "The page can describe the current direction of the evidence, but that direction is still tentative. Better syntheses, more direct data, or stronger follow-up could materially reshape the public-facing summary.";
	}
	return "This page is a careful snapshot of an unstable evidence base. The site can explain the question and the current signal, but the conclusion should not be treated as a settled answer yet.";
}

function fallbackUncertaintyDrivers(seed: SeedClaim): IClaimUncertaintyDriver[] {
	const certainty = seed.evidenceCertainty ?? inferEvidenceCertainty(seed.confidenceScore);
	if (certainty === "high") {
		return [
			{
				type: "generalizability",
				detail: "Most remaining uncertainty is about which subgroups, settings, or exposure levels look different from the main population-level finding."
			},
			{
				type: "imprecision",
				detail: "The direction is stable, but the exact size of the effect or risk can still move across syntheses and real-world settings."
			},
			{
				type: "implementation",
				detail: "Policy, communication, or rollout choices can change practical outcomes even when the underlying evidence direction is settled."
			}
		];
	}
	if (certainty === "moderate") {
		return [
			{
				type: "imprecision",
				detail: "The main direction looks durable, but effect size, baseline risk, or subgroup differences are still moving enough to matter."
			},
			{
				type: "generalizability",
				detail: "Results may not travel equally well across populations, settings, or implementation contexts."
			},
			{
				type: "timing",
				detail: "Longer follow-up or a newer synthesis could tighten or narrow the current public-facing answer."
			}
		];
	}
	if (certainty === "low") {
		return [
			{
				type: "indirectness",
				detail: "Some of the evidence comes from adjacent populations, proxy outcomes, or partial versions of the public claim rather than a direct test of it."
			},
			{
				type: "bias",
				detail: "Study-design limitations, confounding, or uneven measurement still make the body of evidence vulnerable to revision."
			},
			{
				type: "timing",
				detail: "Longer follow-up and stronger syntheses could still shift both the size and the interpretation of the current signal."
			}
		];
	}
	return [
		{
			type: "inconsistency",
			detail: "High-weight sources do not yet converge cleanly on one interpretation of the evidence."
		},
		{
			type: "imprecision",
			detail: "Effect estimates and practical risk ranges are still unstable enough that a stronger synthesis could materially change the summary."
		},
		{
			type: "indirectness",
			detail: "The evidence base still leans on partial, proxy, or otherwise indirect signals rather than a direct durable answer."
		}
	];
}

function defaultUncertaintyDrivers(seed: SeedClaim): IClaimUncertaintyDriver[] {
	const explicitDrivers = seed.openQuestions
		.slice(0, 4)
		.map(detail => detail.trim())
		.filter(Boolean)
		.map(detail => ({
			type: inferUncertaintyType(detail),
			detail
		}));
	const combined = [...explicitDrivers, ...fallbackUncertaintyDrivers(seed)];
	const seen = new Set<string>();
	return combined.filter((driver) => {
		if (seen.has(driver.detail)) return false;
		seen.add(driver.detail);
		return true;
	}).slice(0, 6);
}

function defaultSourceAppraisal(kind: ClaimSourceKind): ClaimSourceAppraisal {
	if (kind === "guideline" || kind === "consensus_statement") return "high";
	if (kind === "systematic_review" || kind === "meta_analysis") return "moderate";
	return "not_appraised";
}

function defaultMisconceptionTags(seed: SeedClaim) {
	const tags = new Set<string>();

	if (seed.topicSlug === "health-and-medicine") {
		tags.add("one-study-doesnt-overturn-evidence");
		tags.add("relative-risk-can-mislead");
		tags.add("anecdotes-are-not-population-evidence");
		tags.add("mechanism-is-not-real-world-effect");
		tags.add("scientists-changing-their-minds-is-normal");
	}
	if (seed.topicSlug === "nutrition-and-diet") {
		tags.add("one-study-doesnt-overturn-evidence");
		tags.add("correlation-isnt-causation");
		tags.add("relative-risk-can-mislead");
		tags.add("cherry-picking-distorts-the-evidence");
		tags.add("mechanism-is-not-real-world-effect");
		tags.add("hazard-is-not-the-same-as-risk");
	}
	if (seed.topicSlug === "climate-and-environment") {
		tags.add("one-study-doesnt-overturn-evidence");
		tags.add("cherry-picking-distorts-the-evidence");
		tags.add("false-balance-misleads");
		tags.add("uncertainty-isnt-ignorance");
		tags.add("scientists-changing-their-minds-is-normal");
	}
	if (seed.topicSlug === "genetics-and-biotechnology") {
		tags.add("mechanism-is-not-real-world-effect");
		tags.add("hazard-is-not-the-same-as-risk");
		tags.add("false-balance-misleads");
		tags.add("one-study-doesnt-overturn-evidence");
		tags.add("uncertainty-isnt-ignorance");
	}
	if (seed.topicSlug === "neuroscience-and-psychology") {
		tags.add("one-study-doesnt-overturn-evidence");
		tags.add("correlation-isnt-causation");
		tags.add("p-values-are-not-the-whole-story");
		tags.add("preprints-are-preliminary");
		tags.add("scientists-changing-their-minds-is-normal");
		tags.add("mechanism-is-not-real-world-effect");
	}
	if (seed.topicSlug === "historical-case-studies") {
		tags.add("scientists-changing-their-minds-is-normal");
		tags.add("one-study-doesnt-overturn-evidence");
		tags.add("cherry-picking-distorts-the-evidence");
		tags.add("false-balance-misleads");
	}

	const title = seed.title.toLowerCase();
	if (title.includes("autism") || title.includes("cause")) {
		tags.add("correlation-isnt-causation");
		tags.add("anecdotes-are-not-population-evidence");
	}
	if (title.includes("risk") || title.includes("safe") || title.includes("danger")) {
		tags.add("relative-risk-can-mislead");
		tags.add("hazard-is-not-the-same-as-risk");
	}
	if (title.includes("climate") || title.includes("warming")) {
		tags.add("false-balance-misleads");
		tags.add("uncertainty-isnt-ignorance");
	}
	if (title.includes("study")) {
		tags.add("one-study-doesnt-overturn-evidence");
	}

	return Array.from(tags).slice(0, 6);
}

function withResearchDefaults(seed: SeedClaim): CompleteSeedClaim {
	return {
		...seed,
		sources: seed.sources.map((source, index) => ({
			...source,
			isAnchor:
				source.isAnchor
				?? (index === 0 || source.kind === "guideline" || source.kind === "consensus_statement"),
			appraisal: source.appraisal ?? defaultSourceAppraisal(source.kind),
			citationStatus: source.citationStatus ?? "current",
			citationCheckedAt: source.citationCheckedAt ?? seed.lastRetractionCheckAt ?? seedTimestamp,
			statusSources:
				source.statusSources
				?? (seed.topicSlug === "health-and-medicine"
					|| seed.topicSlug === "nutrition-and-diet"
					|| seed.topicSlug === "neuroscience-and-psychology"
					|| seed.topicSlug === "genetics-and-biotechnology"
					? ["Crossref", "PubMed", "Europe PMC"]
					: ["Crossref", "Editorial review"])
		})),
		agreementLevel: seed.agreementLevel ?? inferAgreementLevel(seed.consensusBand),
		evidenceCertainty: seed.evidenceCertainty ?? inferEvidenceCertainty(seed.confidenceScore),
		reviewMode: seed.reviewMode ?? "standard",
		searchDatabases: seed.searchDatabases ?? defaultSearchDatabases(seed.topicSlug),
		searchCutoffAt: seed.searchCutoffAt ?? seedTimestamp,
		inclusionRules: seed.inclusionRules ?? [
			"Prioritize systematic reviews, meta-analyses, major guidelines, and consensus assessments.",
			"Use landmark primary studies only when they materially changed the field or clarify a live disagreement.",
			"Anchor the public bottom line in sources that describe methods, scope, and major limitations."
		],
		exclusionRules: seed.exclusionRules ?? [
			"Do not let isolated preprints, commentary, or anecdotal reports carry the public bottom line.",
			"Treat mechanistic or animal-only evidence as supporting context unless the page is specifically about mechanism.",
			"Exclude weak or redundant sources when a stronger synthesis already covers the same point."
		],
		surveillanceSpec: seed.surveillanceSpec ?? defaultSurveillanceSpec(seed),
		appraisalTools: seed.appraisalTools ?? [
			"GRADE-style certainty check for the body of evidence",
			"Risk-of-bias review for key study designs",
			"Shared-baseline check when institutions disagree"
		],
		evidenceSummaries: seed.evidenceSummaries ?? defaultEvidenceSummaries(seed),
		institutionalAnchors: seed.institutionalAnchors ?? defaultInstitutionalAnchors(seed.topicSlug),
		misconceptionTags: seed.misconceptionTags ?? defaultMisconceptionTags(seed),
		authorLine: seed.authorLine ?? "Prepared by the Is There Consensus editorial desk.",
		reviewerLine: seed.reviewerLine ?? "Reviewed for evidence quality, scope, and plain-language accuracy.",
		coiSummary: seed.coiSummary ?? "No conflicts of interest were disclosed for this seeded claim page.",
		independenceSummary:
			seed.independenceSummary
			?? "The editorial summary is independent of public sentiment, sponsorship, and community vote totals.",
		uncertaintySummary: seed.uncertaintySummary ?? defaultUncertaintySummary(seed),
		uncertaintyDrivers: seed.uncertaintyDrivers ?? defaultUncertaintyDrivers(seed),
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? seedTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: seedTimestamp,
				kind: seed.status === "published" ? "publication" : "update",
				summary:
					seed.status === "published"
						? "Initial canonical claim page published."
						: "Initial draft claim created."
			}
		]
	};
}

const rawClaims: SeedClaim[] = [
	{
		topicSlug: "health-and-medicine",
		title: "Do childhood vaccines cause autism?",
		slug: "do-childhood-vaccines-cause-autism",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. Large epidemiological studies and major public-health bodies agree that childhood vaccines do not cause autism. The timing overlap between vaccination and autism diagnosis does not establish causation.",
		stableCore: [
			"Vaccine schedules have been studied across very large populations without finding a causal autism signal.",
			"Autism traits typically become noticeable around the same age vaccines are administered, which makes correlation easy to overread.",
			"Safety monitoring continues, but the core autism claim is treated as settled by major health institutions."
		],
		openQuestions: [
			"How can public-health communication address anxiety without accidentally amplifying the myth?",
			"Which trust-building interventions work best in communities that already distrust medical institutions?"
		],
		whatWouldChangeMinds: [
			"Repeated, well-designed evidence across independent populations showing a replicable causal pathway.",
			"A credible mechanism that survives epidemiology, pharmacovigilance, and replication."
		],
		misconceptions: [
			"Temporal sequence is often mistaken for causation because autism signs emerge in early childhood.",
			"Individual anecdotes can feel decisive even when large population data show no causal relationship."
		],
		editorSummary:
			"This is a flagship example of a strong public-health consensus with a persistent gap between expert evidence and public belief.",
		sources: [
			{
				kind: "consensus_statement",
				title: "WHO GACVS analysis on vaccines and autism",
				publisher: "World Health Organization",
				year: 2025,
				url:
					"https://www.who.int/news/item/11-12-2025-who-expert-group-s-new-analysis-reaffirms-there-is-no-link-between-vaccines-and-autism",
				stance: "supports",
				note:
					"Used to anchor the current international safety review after WHO's 2025 autism-and-vaccines evidence update.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Vaccines, Thimerosal and Autism Spectrum Disorder, evidence review 2010-2025",
				publisher: "World Health Organization",
				year: 2025,
				url: "https://www.who.int/publications/m/item/update-vaccines-thimerosal-autism",
				stance: "supports",
				note:
					"Shows the commissioned evidence review behind WHO's updated conclusion on childhood vaccines, thiomersal, aluminum adjuvants, and autism.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Vaccines are not associated with autism: an evidence-based meta-analysis",
				publisher: "Vaccine",
				year: 2014,
				url: "https://pubmed.ncbi.nlm.nih.gov/24814559/",
				doi: "10.1016/j.vaccine.2014.04.085",
				pmid: "24814559",
				stance: "supports",
				note: "The key source type for separating anecdote from broad population outcomes.",
				order: 3
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is recent global warming mainly caused by human activity?",
		slug: "is-recent-global-warming-mainly-caused-by-human-activity",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. The current scientific consensus is that recent global warming is driven primarily by human greenhouse gas emissions, especially from fossil fuels.",
		stableCore: [
			"Greenhouse gases trap heat, and human activity has sharply raised atmospheric concentrations.",
			"Instrumental records, climate models, and paleoclimate evidence converge on the same broad explanation.",
			"The serious debate is mostly about timing, impacts, and feedback size, not about whether human-caused warming is real."
		],
		openQuestions: [
			"How fast will specific regional impacts unfold under different emissions paths?",
			"Which feedback loops will matter most at local scales and over which time horizons?"
		],
		whatWouldChangeMinds: [
			"A better model that explains the observed warming trend without requiring anthropogenic greenhouse forcing.",
			"Robust contradictory evidence across atmospheric physics, instrumental data, and attribution studies."
		],
		misconceptions: [
			"A cold day or cold winter is often mistaken for evidence against long-term warming trends.",
			"Public discussions regularly treat fringe contrarian voices as if they reflected the center of the expert literature."
		],
		editorSummary:
			"This should be treated as a canonical strong-consensus page where public misunderstanding comes largely from media distortion and fake-expert framing.",
		sources: [
			{
				kind: "consensus_statement",
				title: "AR6 Synthesis Report: Climate Change 2023",
				publisher: "IPCC",
				year: 2023,
				url: "https://www.ipcc.ch/report/ar6/syr/",
				stance: "supports",
				note: "The main synthesis resource for the full climate evidence stack.",
				order: 1
			},
			{
				kind: "guideline",
				title: "NASA climate evidence summary",
				publisher: "NASA",
				url: "https://science.nasa.gov/climate-change/evidence/",
				stance: "supports",
				note: "Useful for observational records and clear public-facing summaries.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Consensus on consensus: a synthesis of consensus estimates on human-caused global warming",
				publisher: "Environmental Research Letters",
				year: 2016,
				url: "https://doi.org/10.1088/1748-9326/11/4/048002",
				doi: "10.1088/1748-9326/11/4/048002",
				stance: "supports",
				note: "Useful when showing how agreement is measured among domain experts.",
				order: 3
			},
			{
				kind: "context",
				title: "The human fingerprint in global warming",
				publisher: "Skeptical Science",
				year: 2023,
				url: "https://skepticalscience.com/its-not-us.htm",
				stance: "supports",
				note:
					"Contextual rebuttal resource for common alternative-cause claims; use after IPCC, NASA, and consensus literature rather than as the assessment anchor.",
				order: 4
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Are dietary cholesterol and saturated fat the same kind of risk?",
		slug: "are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 78,
		bottomLine:
			"No. The current picture is more nuanced than older public advice suggested. Saturated fat still matters for cardiovascular risk, but dietary cholesterol is not a one-to-one proxy for blood cholesterol in the way many people were taught.",
		stableCore: [
			"Extremely high intakes remain a bad idea, but the risk story is more complex than 'all cholesterol in food is dangerous.'",
			"Saturated fat still carries more weight in current cardiovascular guidance than dietary cholesterol alone.",
			"Nutritional headlines often overstate findings from observational studies that cannot cleanly isolate cause."
		],
		openQuestions: [
			"How much do individual metabolic differences change the effect of specific foods?",
			"Which substitution patterns matter most in real diets, not just isolated nutrients?"
		],
		whatWouldChangeMinds: [
			"Large, better-controlled dietary evidence that shifts the size or direction of observed cardiovascular risk.",
			"A clearer mechanistic and clinical picture linking intake patterns to long-term outcomes across diverse populations."
		],
		misconceptions: [
			"Old nutrition messaging left many people with the impression that all fats and all cholesterol behave the same way.",
			"Single nutrition studies are often reported as if they erase decades of guidance all at once."
		],
		editorSummary:
			"This page should show how real scientific updating works: the broad dietary picture changes by refinement more often than by total reversal.",
		sources: [
			{
				kind: "guideline",
				title: "Dietary Cholesterol and Cardiovascular Risk: A Science Advisory From the American Heart Association",
				publisher: "Circulation",
				year: 2020,
				url: "https://doi.org/10.1161/CIR.0000000000000743",
				doi: "10.1161/CIR.0000000000000743",
				stance: "supports",
				note:
					"Anchors the distinction between dietary cholesterol, blood lipids, and overall dietary patterns.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Reduction in saturated fat intake for cardiovascular disease",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2020,
				url: "https://doi.org/10.1002/14651858.CD011737.pub3",
				doi: "10.1002/14651858.CD011737.pub3",
				stance: "supports",
				note: "Useful for separating nutrient panic from evidence-based risk assessment.",
				order: 2
			}
		]
	},
	{
		topicSlug: "biology-and-evolution",
		title: "Is evolution 'just a theory'?",
		slug: "is-evolution-just-a-theory",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. In science, a theory is a well-supported explanatory framework, not a casual guess. Evolution by common descent and natural selection is one of the core organizing theories of modern biology.",
		stableCore: [
			"The scientific meaning of theory is much stronger than the everyday meaning.",
			"Fossils, genetics, comparative anatomy, and biogeography all converge on common descent.",
			"Debates inside evolutionary biology usually concern mechanisms, rates, and details, not whether evolution happened."
		],
		openQuestions: [
			"Which evolutionary mechanisms dominate in specific edge cases or time scales?",
			"How should educators explain theory in a way that avoids everyday-language confusion?"
		],
		whatWouldChangeMinds: [
			"Repeated evidence that fundamentally breaks common descent across independent lines of biological data.",
			"A better framework that explains the fossil, genetic, and comparative record more successfully."
		],
		misconceptions: [
			"The phrase 'just a theory' imports the everyday meaning of theory into a technical scientific context.",
			"People sometimes expect an impossibly complete fossil record before accepting a historical scientific explanation."
		],
		editorSummary:
			"This claim is useful for teaching both the public meaning of theory and the difference between impossible expectations and legitimate scientific scrutiny.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Science, Evolution, and Creationism",
				publisher: "National Academies",
				year: 2008,
				url: "https://www.nationalacademies.org/publications/11876",
				doi: "10.17226/11876",
				stance: "supports",
				note: "Useful for clarifying that this is a foundational biological consensus, not a marginal view.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Statement on the Teaching of Evolution",
				publisher: "American Association for the Advancement of Science",
				year: 2006,
				url: "https://www.aaas.org/sites/default/files/0219boardstatement.pdf",
				stance: "supports",
				note:
					"Documents the scientific-society baseline that evolution is a robust, widely accepted foundation of modern biology.",
				order: 2
			},
			{
				kind: "context",
				title: "Misconceptions about evolution",
				publisher: "University of California Museum of Paleontology",
				url: "https://evolution.berkeley.edu/teach-evolution/misconceptions-about-evolution/",
				stance: "context",
				note: "Helpful when explaining why the everyday phrase 'just a theory' misreads scientific terminology.",
				order: 3
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do learning styles improve educational outcomes?",
		slug: "do-learning-styles-improve-educational-outcomes",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"Not in the way the popular myth suggests. There is no strong evidence that matching instruction to a student's self-described learning style reliably improves outcomes.",
		stableCore: [
			"The learning-styles idea is intuitive, but it has not held up well under stronger testing.",
			"Students may have preferences, but preference is not the same thing as evidence for better learning.",
			"Instructional quality and content structure matter more than sorting students into fixed sensory categories."
		],
		openQuestions: [
			"Which evidence-based teaching adaptations matter most for specific subjects and age groups?",
			"How can educators replace the learning-styles myth with strategies that are actually supported?"
		],
		whatWouldChangeMinds: [
			"Repeated controlled evidence showing that matching instruction to declared styles produces reliable performance gains.",
			"A stronger framework that distinguishes preference from measurable learning benefit."
		],
		misconceptions: [
			"The idea survives partly because people like personality categories that feel personal and intuitive.",
			"Teacher training often repeated the concept long after the research support failed to materialize."
		],
		editorSummary:
			"This is a flagship neuromyth page. It should model how an intuitive idea can spread widely without earning strong empirical support.",
		sources: [
			{
				kind: "systematic_review",
				title: "Learning styles: concepts and evidence",
				publisher: "Psychological Science in the Public Interest",
				year: 2008,
				url: "https://doi.org/10.1111/j.1539-6053.2009.01038.x",
				doi: "10.1111/j.1539-6053.2009.01038.x",
				stance: "supports",
				note: "Useful for showing that the empirical case for style-matching remains weak.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Neuromyths in education: prevalence and predictors of misconceptions among teachers",
				publisher: "Frontiers in Psychology",
				year: 2012,
				url: "https://doi.org/10.3389/fpsyg.2012.00429",
				doi: "10.3389/fpsyg.2012.00429",
				pmid: "23087664",
				stance: "context",
				note: "Helpful for explaining why the myth persists despite weak evidence.",
				order: 2
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does antibiotic overuse drive antibiotic resistance?",
		slug: "does-antibiotic-overuse-drive-antibiotic-resistance",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. Overuse and misuse of antibiotics accelerate antimicrobial resistance, which is why stewardship is treated as a core public-health priority by major medical institutions.",
		stableCore: [
			"Antibiotic exposure creates selection pressure that helps resistant strains spread.",
			"Resistance is a population-level problem driven by clinical overuse, agricultural use, and weak stewardship systems.",
			"Experts are not debating whether resistance is real; they are debating which interventions work best in different settings."
		],
		openQuestions: [
			"Which stewardship interventions reduce unnecessary prescribing most effectively across different health systems?",
			"How should policy balance immediate treatment needs with long-term resistance pressure?"
		],
		whatWouldChangeMinds: [
			"Robust evidence showing that common patterns of antibiotic overuse do not create measurable resistance pressure in the real world.",
			"A stronger alternative model that explains the global resistance trend without antibiotic selection pressure."
		],
		misconceptions: [
			"People often treat resistance as if the patient's body becomes resistant rather than the microbes.",
			"Individual misuse can feel trivial even though the core harm appears at the population level."
		],
		editorSummary:
			"This is a strong-consensus health page where the basic mechanism is settled and the live debate is mostly about implementation and stewardship design.",
		sources: [
			{
				kind: "guideline",
				title: "CDC antimicrobial resistance overview",
				publisher: "CDC",
				year: 2025,
				url: "https://www.cdc.gov/antimicrobial-resistance/about/index.html",
				stance: "supports",
				note: "Useful for public-health framing and current stewardship guidance.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "WHO antimicrobial resistance fact sheet",
				publisher: "World Health Organization",
				url: "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance",
				stance: "supports",
				note: "Useful for the global burden and international consensus on stewardship.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Improving how physicians working in hospital settings prescribe antibiotics",
				publisher: "Cochrane",
				year: 2017,
				url: "https://www.cochrane.org/evidence/CD003543_improving-how-physicians-working-hospital-settings-prescribe-antibiotics",
				stance: "supports",
				note: "Helpful for showing that the question is about reducing a known risk, not discovering whether the risk exists.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Does saturated fat still raise LDL and heart risk?",
		slug: "does-saturated-fat-still-raise-ldl-and-heart-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		bottomLine:
			"Yes, in the broad mainstream view. Major cardiovascular guidelines still treat saturated fat reduction as a useful way to lower LDL cholesterol and reduce long-term cardiovascular risk, even though nutrition research contains real nuance and substitution effects matter.",
		stableCore: [
			"Saturated fat raises LDL in ways that still matter to current cardiovascular guidance.",
			"The strongest nutrition questions usually depend on what replaces the saturated fat, not on pretending the whole issue disappeared.",
			"New nutrition papers often refine risk estimates or subgroups rather than overturning the broad lipid-and-cardiovascular picture."
		],
		openQuestions: [
			"Which replacement patterns matter most for people at different baseline risk levels?",
			"How should nutrition communication separate mechanistic certainty from messier real-world diet patterns?"
		],
		whatWouldChangeMinds: [
			"A large, durable body of evidence showing lower cardiovascular events despite high saturated fat intake and unchanged or lower-risk lipid profiles.",
			"A stronger model that explains current LDL and cardiovascular findings without saturated fat playing the role assigned in major guidelines."
		],
		misconceptions: [
			"People often hear 'the topic is more nuanced' as if it means the core risk disappeared.",
			"Nutrition headlines regularly hide what food or nutrient is actually replacing the saturated fat in question."
		],
		editorSummary:
			"This page should model how to explain a broad mainstream conclusion without pretending nutrition science is cleaner than it is.",
		sources: [
			{
				kind: "guideline",
				title: "2021 Dietary Guidance to Improve Cardiovascular Health: A Scientific Statement From the American Heart Association",
				publisher: "Circulation",
				year: 2021,
				url: "https://doi.org/10.1161/CIR.0000000000001031",
				doi: "10.1161/CIR.0000000000001031",
				stance: "supports",
				note: "Important for the current mainstream cardiovascular baseline.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Reduction in saturated fat intake for cardiovascular disease",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2020,
				url: "https://doi.org/10.1002/14651858.CD011737.pub3",
				doi: "10.1002/14651858.CD011737.pub3",
				stance: "supports",
				note: "Useful for separating the broad consensus from narrower controversies over diet pattern and substitution.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Dietary Fats and Cardiovascular Disease: A Presidential Advisory From the American Heart Association",
				publisher: "Circulation",
				year: 2017,
				url: "https://doi.org/10.1161/CIR.0000000000000510",
				doi: "10.1161/CIR.0000000000000510",
				stance: "context",
				note: "Helpful for showing why the public often experiences this topic as a series of fake reversals.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Do dietary supplements usually improve health in otherwise healthy adults?",
		slug: "do-dietary-supplements-usually-improve-health-in-healthy-adults",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 82,
		bottomLine:
			"Usually not. For otherwise healthy adults without a documented deficiency or specific medical indication, most supplements do not have strong evidence for broad health improvement and some can cause harm or waste money.",
		stableCore: [
			"Supplements can matter when a deficiency, pregnancy, disease state, or clinician guidance makes them relevant.",
			"The broad mainstream view is not that supplements are useless in every case; it is that they are often oversold for general wellness.",
			"Marketing language often outruns what trials and reviews actually support."
		],
		openQuestions: [
			"Which subgroups truly benefit from targeted supplementation beyond standard deficiency treatment?",
			"How should public guidance balance low-probability harms, placebo effects, and consumer demand?"
		],
		whatWouldChangeMinds: [
			"Repeated, high-quality trials showing broad long-term benefit in otherwise healthy adults without targeted indications.",
			"A stronger evidence base showing that commonly marketed supplement stacks improve meaningful clinical outcomes."
		],
		misconceptions: [
			"'Natural' is often treated like proof of safety or effectiveness.",
			"People often mistake biochemical plausibility for demonstrated benefit in real humans."
		],
		editorSummary:
			"This is a useful nutrition page for separating deficiency treatment and targeted clinical use from the much broader wellness marketing around supplements.",
		sources: [
			{
				kind: "guideline",
				title: "Dietary Supplements: What You Need to Know",
				publisher: "NIH Office of Dietary Supplements",
				url: "https://ods.od.nih.gov/factsheets/WYNTK-Consumer/",
				stance: "supports",
				note: "Useful for separating established indications from overgeneralized claims.",
				order: 1
			},
			{
				kind: "guideline",
				title:
					"Vitamin, Mineral, and Multivitamin Supplementation to Prevent Cardiovascular Disease and Cancer: US Preventive Services Task Force Recommendation Statement",
				publisher: "JAMA",
				year: 2022,
				url: "https://doi.org/10.1001/jama.2022.8970",
				doi: "10.1001/jama.2022.8970",
				stance: "supports",
				note: "Helpful when summarizing the broad lack of benefit for healthy adults without specific indications.",
				order: 2
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is nuclear power more dangerous than fossil-fuel energy?",
		slug: "is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 83,
		bottomLine:
			"No, not in the way public fear often suggests. Major energy and climate analyses treat nuclear power as a low-carbon source with risks that are real but generally smaller than the sustained health and climate harms tied to fossil-fuel energy.",
		stableCore: [
			"Nuclear accidents are dramatic and memorable, but routine fossil-fuel pollution kills far more people over time.",
			"Nuclear power is usually treated as low-carbon in climate mitigation analyses.",
			"The live debates are more about cost, waste handling, build timelines, and governance than about whether fossil fuels are safer overall."
		],
		openQuestions: [
			"Which energy mixes are most realistic under different grid, cost, and political constraints?",
			"How should countries weigh build speed, waste policy, and local safety culture when comparing low-carbon options?"
		],
		whatWouldChangeMinds: [
			"Robust comparative evidence showing nuclear's full health and climate burden exceeds the fossil-fuel alternatives it replaces.",
			"A stronger systems analysis demonstrating that nuclear's risks systematically outweigh its low-carbon benefits under modern operating conditions."
		],
		misconceptions: [
			"People often compare the vivid image of a rare nuclear disaster to the invisible background damage of air pollution.",
			"Arguments about waste, weapons, cost, and corruption are often blended into the narrower empirical question of comparative public-health harm."
		],
		editorSummary:
			"This claim is useful because it separates visceral public fear from comparative risk and climate evidence.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change",
				publisher: "IPCC",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/",
				stance: "supports",
				note: "Useful for comparing low-carbon pathways and energy-system tradeoffs.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Nuclear power and climate change: Decarbonization",
				publisher: "IAEA",
				url: "https://www.iaea.org/topics/nuclear-power-and-climate-change",
				stance: "supports",
				note: "Important for operational safety framing and reactor context.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Electricity generation and health",
				publisher: "The Lancet",
				year: 2007,
				url: "https://pubmed.ncbi.nlm.nih.gov/17876910/",
				doi: "10.1016/S0140-6736(07)61253-7",
				pmid: "17876910",
				stance: "supports",
				note: "Helpful for comparing routine fossil-fuel harms to nuclear risk in the same frame.",
				order: 3
			}
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		title: "Are commercial GMO foods unsafe to eat?",
		slug: "are-commercial-gmo-foods-unsafe-to-eat",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 92,
		bottomLine:
			"No. Major scientific and public-health bodies treat currently approved GMO foods as no more inherently dangerous to eat than comparable conventional foods, even though broader agricultural and policy debates remain active.",
		stableCore: [
			"Safety assessment is done product by product rather than by assuming every GMO is identical.",
			"Approved GM foods have not earned a scientific consensus that they are uniquely harmful to human health.",
			"Health-risk arguments should be separated from wider debates about pesticides, patents, and agricultural policy."
		],
		openQuestions: [
			"How should regulation communicate differences between consumer safety, ecological impact, and economic power?",
			"Which biotechnology governance models best handle future gene-editing applications?"
		],
		whatWouldChangeMinds: [
			"Repeated, high-quality evidence showing approved GM foods create reproducible health harms not seen in comparable conventional foods.",
			"A stronger model demonstrating that existing safety review systems systematically miss important risks."
		],
		misconceptions: [
			"'GMO' is often used as if it names one single hazard rather than a broad class of techniques and products.",
			"Arguments about industrial agriculture are often treated like direct proof that the food itself is unsafe."
		],
		editorSummary:
			"This page should separate biotechnology safety from the broader political and ecological debates that often get bundled into the same public argument.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Frequently asked questions on genetically modified foods",
				publisher: "World Health Organization",
				url: "https://www.who.int/news-room/questions-and-answers/item/food-genetically-modified",
				stance: "supports",
				note: "Useful for an international baseline on current safety assessments.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Genetically Engineered Crops: Experiences and Prospects",
				publisher: "National Academies",
				year: 2016,
				url: "https://doi.org/10.17226/23395",
				doi: "10.17226/23395",
				stance: "supports",
				note: "Helpful when explaining how safety judgments are made across institutions.",
				order: 2
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do we only use 10 percent of our brain?",
		slug: "do-we-only-use-10-percent-of-our-brain",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. Humans use brain systems broadly and continuously. The popular '10 percent' claim is a myth, not a serious neuroscientific position.",
		stableCore: [
			"Brain imaging, lesion studies, and everyday neurobiology do not support the idea that most of the brain sits unused.",
			"Different tasks recruit different networks, but that is not the same thing as saying 90 percent is dormant.",
			"The myth persists because it flatters people with the idea of huge hidden reserves waiting to be unlocked."
		],
		openQuestions: [
			"Which public-facing explanations best replace simple brain myths without making neuroscience feel inaccessible?",
			"How should educators distinguish between neural efficiency and the false idea of vast unused capacity?"
		],
		whatWouldChangeMinds: [
			"Direct, repeatable evidence showing that large regions of healthy human brains serve no function across normal life.",
			"A better neuroscientific model that explains brain injury, imaging, and cognition while still implying most tissue is unused."
		],
		misconceptions: [
			"People often confuse 'not active in every task at every second' with 'unused.'",
			"Pop culture treats motivational myths like neuroscience because they are rhetorically appealing."
		],
		editorSummary:
			"This is a clean neuromyth page that helps demonstrate how an intuitive idea can thrive without earning serious empirical support.",
		sources: [
			{
				kind: "context",
				title: "Do People Only Use 10 Percent of Their Brains?",
				publisher: "Scientific American",
				year: 2008,
				url: "https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/",
				stance: "supports",
				note: "Useful for a public-facing explanation anchored in mainstream neuroscience.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "A default mode of brain function",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2001,
				url: "https://doi.org/10.1073/pnas.98.2.676",
				doi: "10.1073/pnas.98.2.676",
				pmid: "11209064",
				pmcid: "PMC14647",
				stance: "supports",
				note: "Landmark neuroimaging work showing organized baseline brain activity, not a mostly dormant brain.",
				order: 2
			},
			{
				kind: "context",
				title: "Neuromyths in education: prevalence and predictors of misconceptions among teachers",
				publisher: "Frontiers in Psychology",
				year: 2012,
				url: "https://doi.org/10.3389/fpsyg.2012.00429",
				doi: "10.3389/fpsyg.2012.00429",
				pmid: "23087664",
				stance: "supports",
				note: "Helpful when showing why unused-brain claims fail against multiple evidence types.",
				order: 3
			}
		]
	},
	{
		topicSlug: "historical-case-studies",
		title: "Did smoking cause lung cancer?",
		slug: "did-smoking-cause-lung-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. The causal link between cigarette smoking and lung cancer is one of the clearest historical examples of scientific consensus emerging against organized doubt.",
		stableCore: [
			"Large epidemiological studies, mechanistic evidence, and public-health data converged over time on the same conclusion.",
			"Industry-funded doubt delayed public understanding, but it did not defeat the evidence base.",
			"This case is useful because it shows how consensus can become extremely strong even when public messaging remains contested."
		],
		openQuestions: [
			"Which parts of the tobacco-doubt playbook still show up in modern misinformation campaigns?",
			"How should this history be used without implying every current controversy is equally mature?"
		],
		whatWouldChangeMinds: [
			"Credible historical evidence showing the causal signal was an artifact across epidemiology, toxicology, and population trends.",
			"A better explanatory framework that fits the full lung-cancer and smoking record without smoking as a primary cause."
		],
		misconceptions: [
			"People sometimes remember the past debate and mistakenly conclude the science was weak rather than politically resisted.",
			"Historical controversy is often confused with the absence of a strong eventual evidence base."
		],
		editorSummary:
			"This page should show how consensus can harden over time despite organized campaigns to manufacture uncertainty.",
		sources: [
			{
				kind: "landmark_study",
				title: "Smoking and carcinoma of the lung; preliminary report",
				publisher: "British Medical Journal",
				year: 1950,
				url: "https://doi.org/10.1136/bmj.2.4682.739",
				doi: "10.1136/bmj.2.4682.739",
				stance: "supports",
				note: "Useful for showing how the causal signal emerged across multiple study designs.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Smoking and Health: Report of the Advisory Committee to the Surgeon General of the Public Health Service",
				publisher: "U.S. Public Health Service",
				year: 1964,
				url: "https://www.govinfo.gov/content/pkg/GPO-SMOKINGANDHEALTH/pdf/GPO-SMOKINGANDHEALTH.pdf",
				stance: "supports",
				note: "Important for documenting how institutional consensus formed and strengthened.",
				order: 2
			}
		]
	},
	{
		topicSlug: "historical-case-studies",
		title: "Were most stomach ulcers caused by stress rather than bacteria?",
		slug: "were-most-stomach-ulcers-caused-by-stress-rather-than-bacteria",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"No. The dominant consensus shifted when strong evidence showed that many peptic ulcers are caused by Helicobacter pylori infection rather than by stress or spicy food alone.",
		stableCore: [
			"H. pylori transformed ulcer treatment because it explained a large share of cases that older narratives did not handle well.",
			"This was not a case of science randomly flipping; it was a case of new evidence outperforming an older model.",
			"The old stress-and-lifestyle story had some intuitive appeal, but the bacterial evidence changed the causal center of the field."
		],
		openQuestions: [
			"How should historical reversals be explained so people learn from them without assuming every modern consensus is equally fragile?",
			"Which institutional or cultural habits made the older ulcer model so sticky?"
		],
		whatWouldChangeMinds: [
			"Strong contradictory evidence showing H. pylori is not a major causal contributor across ulcer populations.",
			"A better model that explains treatment success and ulcer recurrence without bacterial infection playing a central role."
		],
		misconceptions: [
			"People often retell this case as if stress had nothing to do with symptoms or healing, when the real shift was about the primary cause of many ulcers.",
			"A real historical correction is sometimes used to imply that current expert consensus is always likely to be overturned just as easily."
		],
		editorSummary:
			"This is one of the clearest examples of evidence changing minds for the right reason: the new explanation fit the data and changed treatment outcomes.",
		sources: [
			{
				kind: "landmark_study",
				title: "Unidentified curved bacilli in the stomach of patients with gastritis and peptic ulceration",
				publisher: "The Lancet",
				year: 1984,
				url: "https://doi.org/10.1016/S0140-6736(84)91816-6",
				doi: "10.1016/S0140-6736(84)91816-6",
				pmid: "6145023",
				stance: "supports",
				note: "Useful for showing how the bacterial model established itself.",
				order: 1
			},
			{
				kind: "guideline",
				title: "ACG Clinical Guideline: Treatment of Helicobacter pylori Infection",
				publisher: "American Journal of Gastroenterology",
				year: 2017,
				url: "https://doi.org/10.1038/ajg.2016.563",
				doi: "10.1038/ajg.2016.563",
				pmid: "28071659",
				stance: "supports",
				note: "Helpful for showing how the new causal model became routine clinical practice.",
				order: 2
			}
		]
	},
	{
		topicSlug: "consensus-foundations",
		title: "How does scientific consensus form?",
		slug: "how-does-scientific-consensus-form",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Scientific consensus forms when multiple lines of evidence survive criticism, replication, and time. It is not a vote. It is the durable result of repeated testing and challenge.",
		stableCore: [
			"Consensus is the residue of repeated challenge, not the absence of disagreement.",
			"Methods, measurement, and replication matter more than a single flashy result.",
			"Stable claims usually survive because many lines of evidence point in the same direction."
		],
		openQuestions: [
			"How should we explain uncertainty without making everything sound equally weak?",
			"Which teaching metaphors help people understand evidence accumulation instead of memorizing conclusions?"
		],
		whatWouldChangeMinds: [
			"Large bodies of contradictory evidence that survive scrutiny and replication.",
			"New methods that reveal systematic measurement errors in the old foundation."
		],
		misconceptions: [
			"Consensus is often mistaken for groupthink rather than an evidence-backed process.",
			"Disagreement at the frontier is often misread as if it invalidates the settled center."
		],
		editorSummary:
			"Use this claim as the public-facing explanation of how science moves from uncertainty to reliable consensus.",
		sources: [
			{
				kind: "context",
				title: "Scientific Progress",
				publisher: "Stanford Encyclopedia of Philosophy",
				url: "https://plato.stanford.edu/entries/scientific-progress/",
				stance: "context",
				note: "Useful for framing model-building, inference, and falsifiability.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Reproducibility and Replicability in Science",
				publisher: "National Academies",
				year: 2019,
				url: "https://doi.org/10.17226/25303",
				doi: "10.17226/25303",
				stance: "supports",
				note: "Decision-weight anchor for why durable conclusions depend on transparent methods, replication, and independent scrutiny.",
				order: 2
			},
			{
				kind: "context",
				title: "Estimating the reproducibility of psychological science",
				publisher: "Science",
				year: 2015,
				url: "https://doi.org/10.1126/science.aac4716",
				doi: "10.1126/science.aac4716",
				stance: "context",
				note: "Useful when discussing how correction mechanisms work.",
				order: 3
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Why does one study rarely change everything?",
		slug: "why-does-one-study-rarely-change-everything",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 82,
		bottomLine:
			"One study rarely changes a field because scientific conclusions rest on the weight of evidence, not novelty alone. New papers usually add detail, scope, or uncertainty rather than replacing the whole picture.",
		stableCore: [
			"Relative risk without baseline context is easy to overread.",
			"Single studies are regularly framed as if they replace a broader evidence base.",
			"False balance can make fringe claims look equal to well-supported positions."
		],
		openQuestions: [
			"Which explanations actually improve public calibration instead of just increasing attention?",
			"How should platforms show uncertainty without encouraging cynicism?"
		],
		whatWouldChangeMinds: [
			"Clearer evidence on which communication patterns reliably improve public understanding.",
			"Platform experiments showing durable gains in source literacy and risk interpretation."
		],
		misconceptions: [
			"People often confuse louder coverage with stronger evidence.",
			"Correction stories usually travel less than the original overstatement."
		],
		editorSummary:
			"Anchor the basketball-versus-bumps framing here. This page should explain why media spikes are not the same thing as consensus shifts.",
		sources: [
			{
				kind: "landmark_study",
				title: "Why Most Published Research Findings Are False",
				publisher: "PLOS Medicine",
				year: 2005,
				url: "https://doi.org/10.1371/journal.pmed.0020124",
				doi: "10.1371/journal.pmed.0020124",
				stance: "context",
				note: "Useful for spotting patterns in headline inflation.",
				order: 1
			},
			{
				kind: "context",
				title: "Cochrane Handbook for Systematic Reviews of Interventions",
				publisher: "Cochrane",
				url: "https://training.cochrane.org/handbook/current",
				stance: "supports",
				note: "Helpful when translating percentages into real-world scale.",
				order: 2
			}
		]
	},
	{
		topicSlug: "active-debates",
		title: "What counts as an active scientific debate?",
		slug: "what-counts-as-an-active-scientific-debate",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 56,
		bottomLine:
			"An active scientific debate usually means experts are arguing about mechanism, effect size, edge cases, or model fit, not necessarily about whether the core phenomenon exists at all.",
		stableCore: [
			"Competing models can coexist while evidence is still being sorted.",
			"Debate often narrows over time from huge claims to precise technical disagreements.",
			"An unresolved mechanism does not automatically mean the entire phenomenon is doubtful."
		],
		openQuestions: [
			"Which results are robust across populations, instruments, and labs?",
			"Are researchers arguing about the effect itself or only about how large it is?",
			"Which edge cases matter enough to change the practical takeaway?"
		],
		whatWouldChangeMinds: [
			"Better-powered studies that adjudicate between competing models.",
			"Independent replications that consistently favor one mechanism over another."
		],
		misconceptions: [
			"Media often compresses nuanced disagreement into a fake yes-or-no battle.",
			"People assume an active debate means experts have no useful provisional view."
		],
		editorSummary:
			"Use this as the main explainer for how frontier disagreement differs from the stable core of consensus.",
		sources: [
			{
				kind: "context",
				title: "Cochrane Handbook for Systematic Reviews of Interventions",
				publisher: "Cochrane",
				url: "https://training.cochrane.org/handbook/current",
				stance: "supports",
				note: "Helpful when the dispute is about magnitude across many studies.",
				order: 1
			},
			{
				kind: "guideline",
				title: "GRADE Handbook",
				publisher: "GRADE Working Group",
				url: "https://gdt.gradepro.org/app/handbook/handbook.html",
				stance: "context",
				note: "Useful when the fight is really about measurement or model fit.",
				order: 2
			}
		]
	}
];

export const defaultClaims: CompleteSeedClaim[] = rawClaims.map(withResearchDefaults);
