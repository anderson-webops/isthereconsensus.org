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
		topicSlug: "health-and-medicine",
		title: "Does the MMR vaccine cause autism?",
		slug: "does-the-mmr-vaccine-cause-autism",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. Large cohort studies, meta-analyses, and vaccine-safety reviews do not find that the measles, mumps, and rubella vaccine causes autism, triggers autism in susceptible children, or creates a post-vaccination autism cluster.",
		stableCore: [
			"The MMR-autism claim has been tested directly in very large population cohorts.",
			"The strongest direct cohort evidence does not show increased autism risk after MMR vaccination, including in higher-risk subgroups.",
			"The broader vaccine/autism evidence base also does not support causal claims about MMR, thimerosal, or mercury exposure."
		],
		openQuestions: [
			"Which explanations best help readers separate timing coincidence from causal evidence?",
			"How should a public page acknowledge parental fear while keeping the causal claim accurately closed?"
		],
		whatWouldChangeMinds: [
			"Repeated independent cohort evidence showing a clear, dose-timed, biologically plausible MMR-autism risk signal.",
			"A mechanism that fits both immune biology and the absence of a signal in large epidemiological studies."
		],
		misconceptions: [
			"The first MMR dose is often given near ages when autism signs are becoming visible, which can make sequence feel like cause.",
			"Claims about susceptible subgroups are often presented as if they avoid the large-study evidence, even though those subgroups have been directly examined."
		],
		editorSummary:
			"This exact claim deserves its own page because MMR is the most recognizable version of the broader vaccine-autism myth.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial exact MMR-autism claim page published from nationwide cohort, meta-analysis, and WHO safety-review sources."
			}
		],
		sources: [
			{
				kind: "landmark_study",
				title: "Measles, Mumps, Rubella Vaccination and Autism",
				publisher: "Annals of Internal Medicine",
				year: 2019,
				url: "https://pubmed.ncbi.nlm.nih.gov/30831578/",
				doi: "10.7326/M18-2101",
				pmid: "30831578",
				stance: "supports",
				note:
					"Direct nationwide cohort study of 657,461 Danish children; useful because it addresses MMR, susceptible subgroups, and clustering after vaccination.",
				order: 1
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
				note:
					"Provides pooled case-control and cohort context for MMR and related vaccine-autism claims.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "WHO GACVS analysis on vaccines and autism",
				publisher: "World Health Organization",
				year: 2025,
				url:
					"https://www.who.int/news/item/11-12-2025-who-expert-group-s-new-analysis-reaffirms-there-is-no-link-between-vaccines-and-autism",
				stance: "supports",
				note:
					"Current international vaccine-safety anchor for the broader autism-and-vaccines evidence review.",
				order: 3
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Is the MMR vaccine safe and highly effective at preventing measles?",
		slug: "is-the-mmr-vaccine-safe-and-highly-effective-at-preventing-measles",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. The MMR vaccine is a safe, routine vaccine and is highly effective against measles: CDC estimates one dose is 93% effective against measles and two doses are 97% effective, while systematic reviews support its effectiveness and overall safety profile.",
		stableCore: [
			"Two routine doses of MMR are the standard way to protect children against measles, mumps, and rubella.",
			"CDC estimates one dose of MMR is 93% effective against measles and two doses are 97% effective against measles.",
			"Cochrane's review found MMR/MMRV vaccines effective against measles, mumps, rubella, and varicella and found no evidence of an increased autism or encephalitis signal."
		],
		openQuestions: [
			"How should first-dose MMRV versus separate MMR and varicella vaccination be communicated when febrile-seizure risk is relevant?",
			"How quickly can public-health systems restore high coverage in communities where measles outbreaks expose immunity gaps?",
			"How much does mumps protection wane over time compared with measles and rubella protection?"
		],
		whatWouldChangeMinds: [
			"Large, repeated vaccine-effectiveness studies showing substantially lower real-world measles protection after correctly timed two-dose MMR.",
			"A major vaccine-safety reassessment finding serious harms that outweigh measles, mumps, and rubella prevention benefits in routine populations."
		],
		misconceptions: [
			"Breakthrough measles cases are sometimes presented as proof the vaccine does not work, even though 97% effectiveness still allows rare infections during intense outbreaks.",
			"MMR safety questions are often blurred with the separate autism myth, even though autism has been directly studied and is not supported as a vaccine harm.",
			"MMRV and MMR are sometimes discussed as if all schedule choices have the same risk-benefit details; first-dose MMRV has a specific febrile-seizure context."
		],
		editorSummary:
			"This page complements the MMR-autism page by answering the positive claim: MMR is not merely unrelated to autism, it is a highly effective routine vaccine against a dangerous and highly contagious disease.",
		uncertaintySummary:
			"The consensus is strong for routine MMR safety and high measles effectiveness. Remaining nuance is about schedule choices, rare adverse events such as febrile seizures, and maintaining enough coverage to prevent outbreaks.",
		searchCutoffAt: "2026-07-02T21:55:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:55:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:55:00.000Z",
				kind: "publication",
				summary:
					"Initial MMR safety and measles-effectiveness claim page published from CDC vaccine guidance, CDC safety context, and Cochrane review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Measles Vaccination",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/measles/vaccines/index.html",
				stance: "supports",
				note: "Current CDC public guidance states that MMR is safe and effective and gives the 93% one-dose and 97% two-dose measles effectiveness estimates.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Vaccines for measles, mumps, rubella, and varicella in children",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2021,
				url: "https://www.cochrane.org/evidence/CD004407_does-measles-mumps-rubella-and-varicella-mmrv-vaccine-protect-children-and-does-it-cause-harmful",
				doi: "10.1002/14651858.CD004407.pub5",
				pmid: "34806766",
				pmcid: "PMC8607336",
				stance: "supports",
				note: "Decision-weight synthesis: supports MMR/MMRV effectiveness, reports 95% one-dose and 96% two-dose measles effectiveness in included studies, and discusses rare harms such as febrile seizures.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Measles, Mumps, Rubella, Varicella (MMRV) Vaccine Safety",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/vaccine-safety/vaccines/mmrv.html",
				stance: "context",
				note: "Safety context source for common side effects, the disease risks prevented by vaccination, and the schedule-specific febrile-seizure issue for first-dose MMRV.",
				order: 3
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does the HPV vaccine prevent cervical cancer?",
		slug: "does-the-hpv-vaccine-prevent-cervical-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. HPV vaccination prevents infection with the HPV types that cause most cervical cancers, sharply reduces cervical precancers, and population follow-up now shows lower invasive cervical cancer risk, especially when vaccination happens before exposure.",
		stableCore: [
			"HPV types 16 and 18 cause about 70% of cervical cancers worldwide, and current vaccines target these and additional high-risk types.",
			"CDC states that HPV vaccination has the potential to prevent more than 90% of cancers caused by HPV and that U.S. vaccine-type infections have dropped 88% among teen girls and 81% among young adult women.",
			"Cochrane found high-certainty evidence that HPV vaccines reduce HPV16/18-associated cervical precancer in young women who were not already infected.",
			"A Swedish registry study of nearly 1.7 million girls and women found substantially lower invasive cervical cancer risk after quadrivalent HPV vaccination, with the largest reduction among those vaccinated before age 17."
		],
		openQuestions: [
			"How can programs raise vaccination coverage while keeping screening access strong?",
			"How should catch-up vaccination be explained when benefit depends on previous HPV exposure?",
			"How should cervical screening intervals evolve as vaccinated cohorts age into screening programs?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled population studies showing no reduction in persistent high-risk HPV infection, cervical precancer, or invasive cervical cancer after vaccination.",
			"A major CDC, WHO, NCI, or Cochrane reassessment finding that vaccine benefits no longer outweigh harms in the routine target population."
		],
		misconceptions: [
			"HPV vaccination is sometimes misread as a treatment for existing HPV infection; it is primarily preventive.",
			"Some people hear 'prevents cervical cancer' as meaning screening is no longer needed, even though current programs still rely on screening because vaccines do not cover every risk or every prior exposure.",
			"Adult catch-up benefit is sometimes presented as identical to early adolescent vaccination, even though protection is strongest before exposure."
		],
		editorSummary:
			"This page should make the cancer-prevention chain visible: vaccine-type infection falls first, cervical precancer falls next, and invasive cervical cancer reduction is now visible in long follow-up.",
		uncertaintySummary:
			"The prevention claim is strong. Remaining uncertainty is mostly about implementation, coverage, catch-up benefit after possible exposure, and how screening policy should adapt as vaccinated cohorts age.",
		searchCutoffAt: "2026-07-02T22:11:34.000Z",
		lastRetractionCheckAt: "2026-07-02T22:11:34.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:11:34.000Z",
				kind: "publication",
				summary:
					"Initial HPV vaccine and cervical cancer prevention claim page published from CDC, Cochrane, NCI, and Swedish registry evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "HPV Vaccination",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/hpv/vaccines/index.html",
				stance: "supports",
				note:
					"Current CDC public-health anchor for the more-than-90% preventable HPV-cancer framing, durability, and observed U.S. drops in vaccine-type HPV infections and cervical precancers.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "HPV vaccination to prevent cancer and pre-cancerous changes of the cervix",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2018,
				url:
					"https://www.cochrane.org/evidence/CD009069_hpv-vaccination-prevent-cancer-and-pre-cancerous-changes-cervix",
				doi: "10.1002/14651858.CD009069.pub3",
				pmid: "29740819",
				stance: "supports",
				note:
					"Decision-weight trial synthesis finding high-certainty protection against cervical precancer in adolescent girls and young women, strongest before HPV exposure.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "HPV Vaccination and the Risk of Invasive Cervical Cancer",
				publisher: "New England Journal of Medicine",
				year: 2020,
				url: "https://doi.org/10.1056/NEJMoa1917338",
				doi: "10.1056/NEJMoa1917338",
				pmid: "32997908",
				stance: "supports",
				note:
					"Nationwide Swedish registry cohort linking quadrivalent HPV vaccination to lower invasive cervical cancer risk at the population level.",
				order: 3
			},
			{
				kind: "context",
				title: "Large Study Confirms that HPV Vaccine Prevents Cervical Cancer",
				publisher: "National Cancer Institute",
				year: 2020,
				url:
					"https://www.cancer.gov/news-events/cancer-currents-blog/2020/hpv-vaccine-prevents-cervical-cancer-sweden-study",
				stance: "supports",
				note:
					"NCI context source explaining why the Swedish invasive-cancer result completed the infection-to-precancer-to-cancer prevention chain.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do mRNA COVID-19 vaccines change your DNA?",
		slug: "do-mrna-covid-19-vaccines-change-your-dna",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. mRNA vaccines deliver temporary instructions in the cell cytoplasm; they do not enter the nucleus where DNA is kept, and they do not alter a person's genes.",
		stableCore: [
			"Messenger RNA is a short-lived instruction molecule, not a tool for rewriting human chromosomes.",
			"mRNA COVID-19 vaccines direct cells to make a harmless spike-protein piece and then the mRNA is broken down.",
			"Major U.S. government health and genomics resources state that COVID-19 vaccines do not affect or interact with DNA."
		],
		openQuestions: [
			"Which analogies explain mRNA without making the mechanism sound more permanent than it is?",
			"How should pages distinguish mRNA vaccines from DNA vaccines, viral vectors, and gene therapy without blurring the public bottom line?"
		],
		whatWouldChangeMinds: [
			"Direct human evidence that vaccine mRNA routinely enters nuclei, is reverse-transcribed, and integrates into chromosomes at a clinically meaningful rate.",
			"Independent replication of a mechanism that contradicts the established cell-biology explanation and changes observed human outcomes."
		],
		misconceptions: [
			"The word genetic is often misread as meaning gene-editing, even when a technology only carries temporary protein-making instructions.",
			"Laboratory discussions about nucleic-acid platforms are often pulled out of context and treated as evidence of DNA alteration in vaccinated people."
		],
		editorSummary:
			"This is a high-value mechanism page for a recurring mRNA misconception: the public claim is about changing DNA, not about whether rare side effects or vaccine recommendations can vary by group.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial mRNA-and-DNA claim page published from NHGRI, MedlinePlus, CDC, and mRNA platform review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Understanding COVID-19 mRNA Vaccines",
				publisher: "National Human Genome Research Institute",
				year: 2021,
				url: "https://www.genome.gov/about-genomics/fact-sheets/Understanding-COVID-19-mRNA-Vaccines",
				stance: "supports",
				note:
					"Clear genomics anchor explaining that mRNA vaccines cannot alter DNA and are built on decades of mRNA research.",
				order: 1
			},
			{
				kind: "guideline",
				title: "What are mRNA vaccines and how do they work?",
				publisher: "MedlinePlus Genetics",
				year: 2022,
				url: "https://medlineplus.gov/genetics/understanding/therapy/mrnavaccines/",
				stance: "supports",
				note:
					"National Library of Medicine explainer stating that vaccine mRNA does not enter the nucleus or alter DNA.",
				order: 2
			},
			{
				kind: "guideline",
				title: "COVID-19 Vaccine Basics",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/covid/vaccines/how-they-work.html",
				stance: "supports",
				note:
					"Current U.S. implementation explainer separating vaccine mechanism from DNA interaction claims.",
				order: 3
			},
			{
				kind: "context",
				title: "mRNA vaccines for COVID-19: what, why and how",
				publisher: "International Journal of Biological Sciences",
				year: 2021,
				url: "https://doi.org/10.7150/ijbs.59233",
				doi: "10.7150/ijbs.59233",
				stance: "supports",
				note:
					"Mechanism and platform background from the peer-reviewed literature; use as context beneath direct institutional explanations.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do COVID-19 vaccines cause infertility?",
		slug: "do-covid-19-vaccines-cause-infertility",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"No. Current evidence does not show that COVID-19 vaccines cause infertility in women or men. Studies of couples trying to conceive, assisted reproduction, and semen parameters do not support the claim.",
		stableCore: [
			"Prospective data on couples trying to conceive did not find reduced fecundability after vaccination in either partner.",
			"Systematic reviews and meta-analyses have not found evidence that COVID-19 vaccination impairs fertility in men or women.",
			"Some menstrual-cycle changes after vaccination can occur, but available evidence does not connect them to infertility."
		],
		openQuestions: [
			"How should pages distinguish temporary menstrual-cycle changes from fertility impairment?",
			"Which assisted-reproduction subgroups need continued monitoring as vaccine platforms, infection history, and timing vary?",
			"How should updated COVID vaccine recommendations be separated from the narrower evidence question about fertility?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled evidence showing reproducible reductions in conception, ovarian reserve, semen quality, or live-birth outcomes after vaccination.",
			"A biologically plausible fertility-harm mechanism that predicts and matches observed human reproductive outcomes."
		],
		misconceptions: [
			"Fertility fears often treat antibodies, menstrual changes, or anecdotes as if they were evidence of failed conception.",
			"COVID infection effects on reproductive health are sometimes conflated with vaccine effects, even when studies separate the two."
		],
		editorSummary:
			"This page should answer a common reproductive-health fear directly while keeping the scope narrow: fertility outcomes, not every question about COVID vaccine policy.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial COVID-vaccination fertility claim page published from CDC, National Academies, prospective cohort, and meta-analysis sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "COVID-19 Vaccination for People Who Would Like to Have a Baby",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/covid/vaccines/planning-for-pregnancy.html",
				stance: "supports",
				note:
					"Public-health summary that directly states there is no evidence that vaccines, including COVID-19 vaccines, cause fertility problems in women or men.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Female Infertility and COVID-19 Vaccines",
				publisher: "National Academies Press / NCBI Bookshelf",
				year: 2024,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK607379/",
				stance: "supports",
				note:
					"Independent evidence-review chapter for the potential relationship between COVID-19 vaccines and female infertility.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "The impact of COVID-19 vaccines on fertility: a systematic review and meta-analysis",
				publisher: "Vaccine",
				year: 2022,
				url: "https://doi.org/10.1016/j.vaccine.2022.09.019",
				doi: "10.1016/j.vaccine.2022.09.019",
				stance: "supports",
				note:
					"Direct synthesis of male and female fertility outcomes after COVID-19 vaccination.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "A Prospective Cohort Study of COVID-19 Vaccination, SARS-CoV-2 Infection, and Fertility",
				publisher: "American Journal of Epidemiology",
				year: 2022,
				url: "https://pubmed.ncbi.nlm.nih.gov/35051292/",
				doi: "10.1093/aje/kwac011",
				pmid: "35051292",
				pmcid: "PMC8807200",
				stance: "supports",
				note:
					"Direct preconception cohort evidence separating vaccination from SARS-CoV-2 infection effects in couples trying to conceive.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Are COVID-19 vaccines safe and beneficial during pregnancy and breastfeeding?",
		slug: "are-covid-19-vaccines-safe-and-beneficial-during-pregnancy-and-breastfeeding",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 91,
		reviewMode: "living",
		bottomLine:
			"Broadly yes, with current policy nuance. Large observational syntheses and current clinical guidance support that COVID-19 vaccination in pregnancy has not been linked to increased maternal or infant health risks and can reduce severe COVID-19 risk. CDC's 2025-2026 schedule frames vaccination as individual decision-making, while ACOG continues to recommend updated vaccination for pregnant and lactating patients.",
		stableCore: [
			"Pregnancy and the recently pregnant period increase the risk of severe COVID-19 and pregnancy complications from infection.",
			"Large pregnancy studies and systematic reviews have not found increased risks such as miscarriage, preterm delivery, stillbirth, or birth defects after COVID-19 vaccination.",
			"Vaccination during pregnancy and lactation can generate antibodies that may help protect infants too young to be vaccinated."
		],
		openQuestions: [
			"How do absolute benefits vary with current variants, prior infection, underlying risk, vaccine product, and timing during pregnancy?",
			"How long does infant protection last after vaccination during pregnancy or lactation, and what timing maximizes that protection?",
			"How should public pages explain the difference between CDC's current individual-decision framework and stronger specialty-society recommendations?"
		],
		whatWouldChangeMinds: [
			"Repeated, well-controlled surveillance showing a replicated vaccine-attributable increase in serious maternal, fetal, or infant outcomes.",
			"Evidence that current vaccine formulations no longer reduce severe COVID-19 outcomes for pregnant or recently pregnant people at elevated risk."
		],
		misconceptions: [
			"Early exclusion of pregnant people from initial randomized trials is often mistaken for a lack of later real-world safety data.",
			"Changes in policy language are sometimes presented as proof of harm, even when the underlying safety evidence remains broadly consistent."
		],
		editorSummary:
			"This maternal-child health page should distinguish evidence about safety and benefit from current policy wording, because readers need both pieces to make sense of the public dispute.",
		uncertaintySummary:
			"The safety signal is reassuring across large observational datasets, but recommendations remain sensitive to variant era, baseline risk, vaccine product, prior immunity, and jurisdiction-specific policy updates.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial pregnancy and breastfeeding COVID-19 vaccination page published from current CDC/ACOG guidance, living systematic review, meta-analysis, and lactation review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "COVID-19 Vaccination for Women Who Are Pregnant or Breastfeeding",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/covid/vaccines/pregnant-or-breastfeeding.html",
				stance: "supports",
				note:
					"Current U.S. public guidance anchoring the 2025-2026 individual-decision framework, pregnancy risk context, and safety summary.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Maternal Immunizations",
				publisher: "American College of Obstetricians and Gynecologists",
				year: 2026,
				url: "https://www.acog.org/clinical/clinical-guidance/committee-statement/articles/2026/02/maternal-immunizations",
				stance: "supports",
				note:
					"Current specialty-society guidance recommending annual COVID-19 immunization during pregnancy and lactation while summarizing fetal safety evidence.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"Systematic review and meta-analysis of the effectiveness and perinatal outcomes of COVID-19 vaccination in pregnancy",
				publisher: "Nature Communications",
				year: 2022,
				url: "https://doi.org/10.1038/s41467-022-30052-w",
				doi: "10.1038/s41467-022-30052-w",
				stance: "supports",
				note:
					"Synthesis of 23 studies and 117,552 vaccinated pregnant people, mostly mRNA recipients, with no higher risk of the assessed adverse pregnancy or neonatal outcomes.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Safety and Effectiveness of COVID-19 Vaccines During Pregnancy",
				publisher: "Drug Safety",
				year: 2024,
				url: "https://doi.org/10.1007/s40264-024-01458-w",
				doi: "10.1007/s40264-024-01458-w",
				stance: "supports",
				note:
					"Living systematic review and meta-analysis covering 177 studies and 638,791 participants, useful for ongoing evidence-surveillance framing.",
				order: 4
			},
			{
				kind: "context",
				title: "Safety and Efficacy of Coronavirus Disease 2019 (COVID-19) mRNA Vaccines During Lactation",
				publisher: "Obstetrics and Gynecology",
				year: 2023,
				url: "https://doi.org/10.1097/AOG.0000000000005093",
				doi: "10.1097/AOG.0000000000005093",
				stance: "supports",
				note:
					"Focused lactation review covering maternal and infant side-effect data, breast-milk mRNA concerns, and antibody transfer evidence.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "How big is the myocarditis risk after mRNA COVID-19 vaccination, and who is most affected?",
		slug: "how-big-is-the-myocarditis-risk-after-mrna-covid-19-vaccination",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 90,
		reviewMode: "living",
		bottomLine:
			"The risk is real but rare. It is highest in adolescent and young adult males, especially within about a week after a second mRNA dose, and varies by age, sex, product, dose, and interval. Most reported young-person cases improve, but long-term follow-up and current-formulation surveillance still matter.",
		stableCore: [
			"Myocarditis and pericarditis after mRNA COVID-19 vaccination are recognized safety signals, not imaginary concerns.",
			"Absolute risk is low overall, but it is concentrated in adolescent and young adult males after mRNA vaccination, especially after dose two.",
			"Product choice, dose number, spacing, prior infection, and baseline COVID-19 risk all matter when comparing benefits and harms."
		],
		openQuestions: [
			"How do current formulations and schedules change risk compared with the early primary-series evidence base?",
			"What is the long-term clinical meaning of persistent symptoms or cardiac MRI abnormalities in a minority of follow-up cases?",
			"How should risk comparisons account for age, sex, infection history, and changing COVID-19 severity over time?"
		],
		whatWouldChangeMinds: [
			"Current-season active surveillance showing materially higher myocarditis burden, worse outcomes, or a different high-risk group than prior evidence suggests.",
			"Long-term follow-up showing persistent clinically important cardiac dysfunction in a substantially larger share of cases."
		],
		misconceptions: [
			"Calling the event rare is sometimes misread as denying the safety signal.",
			"Using population-average rates can hide the higher risk in young males, while using only the highest-risk subgroup can exaggerate risk for everyone else."
		],
		editorSummary:
			"This page should treat myocarditis as a real subgroup safety issue while resisting both minimization and denominator-free alarm.",
		uncertaintySummary:
			"The highest-risk subgroup and early-dose signal are clear, but precise current-season risk depends on vaccine product, schedule, prior immunity, variant era, case definition, and follow-up duration.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial mRNA vaccine myocarditis risk page published from CDC safety guidance, active surveillance, systematic review, and infection-comparison cohort sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Safety Considerations for COVID-19 Vaccines",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/covid/hcp/vaccine-considerations/safety-considerations.html",
				stance: "supports",
				note:
					"Current CDC clinical guidance describing the rare myocarditis/pericarditis risk, highest-attention male 12-39 group, counseling symptoms, and interval considerations.",
				order: 1
			},
			{
				kind: "systematic_review",
				title:
					"Incidence, risk factors, natural history, and hypothesised mechanisms of myocarditis and pericarditis following covid-19 vaccination",
				publisher: "BMJ",
				year: 2022,
				url: "https://doi.org/10.1136/bmj-2021-069445",
				doi: "10.1136/bmj-2021-069445",
				stance: "supports",
				note:
					"Living evidence synthesis estimating highest incidence in male adolescents and young adults and flagging product and interval differences.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Risk of myocarditis and pericarditis after the COVID-19 mRNA vaccination in the USA",
				publisher: "Lancet",
				year: 2022,
				url: "https://doi.org/10.1016/S0140-6736(22)00791-7",
				doi: "10.1016/S0140-6736(22)00791-7",
				stance: "supports",
				note:
					"Large U.S. claims-database cohort quantifying rare post-vaccination myocarditis/pericarditis and the higher risk in men aged 18-25 after dose two.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Risk of Myocarditis After Sequential Doses of COVID-19 Vaccine and SARS-CoV-2 Infection by Age and Sex",
				publisher: "Circulation",
				year: 2022,
				url: "https://doi.org/10.1161/CIRCULATIONAHA.122.059970",
				doi: "10.1161/CIRCULATIONAHA.122.059970",
				stance: "supports",
				note:
					"Large England self-controlled case-series study comparing myocarditis risk after sequential vaccine doses and SARS-CoV-2 infection by age and sex.",
				order: 4
			},
			{
				kind: "context",
				title: "Update on CDC's COVID-19 Vaccine Safety Monitoring",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/acip/downloads/slides-2025-06-25-26/04-Meyer-COVID-508.pdf",
				stance: "supports",
				note:
					"ACIP safety-monitoring update with current-era myocarditis surveillance and follow-up recovery context for adolescents and young adults.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does fluoride in community drinking water prevent tooth decay, and is it safe at recommended levels?",
		slug: "does-fluoride-in-community-drinking-water-prevent-tooth-decay-and-is-it-safe",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"Yes, with dose and context caveats. Major public-health bodies still support community water fluoridation at recommended levels for preventing tooth decay, but modern evidence suggests the added benefit is smaller than older estimates and high-fluoride exposure is a separate safety question.",
		stableCore: [
			"The U.S. recommended concentration for community water fluoridation is 0.7 mg/L, chosen to balance tooth-decay prevention with fluorosis risk.",
			"Cochrane's 2024 update found that contemporary studies show smaller dental benefits than pre-1975 studies, likely because fluoride toothpaste and other sources are now widespread.",
			"Safety conclusions are dose-specific: concerns about high natural fluoride exposure, including levels around or above 1.5 mg/L, should not be treated as the same exposure as properly controlled community fluoridation."
		],
		openQuestions: [
			"How large is the incremental benefit of community water fluoridation today in communities with widespread fluoride toothpaste access?",
			"How should public guidance weigh dental-health equity benefits against uncertainty in newer high-exposure neurodevelopment literature?"
		],
		whatWouldChangeMinds: [
			"Strong evidence that guideline-level community fluoridation creates serious systemic harm in comparable populations.",
			"Strong contemporary evidence that community fluoridation provides negligible dental benefit across high-risk and low-income groups."
		],
		misconceptions: [
			"The word 'chemical' is often used as if it settles the risk question without asking about dose.",
			"Evidence about high naturally occurring fluoride levels is often presented as if it directly proves harm at the recommended community level."
		],
		editorSummary:
			"This page should help readers separate three different questions: whether fluoride prevents tooth decay, whether the modern incremental benefit is smaller, and whether recommended-level exposure is the same as high-fluoride exposure.",
		uncertaintySummary:
			"Agreement remains broad that guideline-level fluoridation prevents tooth decay and is supported by major dental and public-health bodies, but the size of modern benefit and interpretation of high-exposure neurodevelopment evidence deserve careful qualification.",
		searchCutoffAt: "2026-07-02T21:45:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:45:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:45:00.000Z",
				kind: "publication",
				summary:
					"Initial community water fluoridation claim page published from CDC, Cochrane, PHS recommendation, and NTP high-exposure context sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "CDC Scientific Statement on Community Water Fluoridation",
				publisher: "Centers for Disease Control and Prevention",
				url:
					"https://www.cdc.gov/fluoridation/about/statement-on-the-evidence-supporting-the-safety-and-effectiveness-of-community-water-fluoridation.html",
				stance: "supports",
				note:
					"CDC states its public-health position that community water fluoridation is an effective and cost-efficient way to prevent tooth decay and improve oral health.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Water fluoridation for the prevention of dental caries",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2024,
				url: "https://doi.org/10.1002/14651858.CD010856.pub3",
				doi: "10.1002/14651858.CD010856.pub3",
				pmid: "39362658",
				stance: "supports",
				note:
					"Updated systematic review showing that contemporary caries-prevention effects appear smaller than older estimates and that cessation and disparity effects remain uncertain.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Community Water Fluoridation Recommendations",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/fluoridation/about/community-water-fluoridation-recommendations.html",
				stance: "supports",
				note:
					"Summarizes the U.S. Public Health Service recommendation of 0.7 mg/L to maximize oral-health benefit while minimizing potential harms such as dental fluorosis.",
				order: 3
			},
			{
				kind: "context",
				title: "NTP Monograph on the State of the Science Concerning Fluoride Exposure and Neurodevelopment and Cognition",
				publisher: "National Toxicology Program",
				year: 2024,
				url: "https://ntp.niehs.nih.gov/publications/monographs/mgraph08",
				stance: "context",
				note:
					"High-exposure safety context: evaluates neurodevelopment evidence and helps distinguish community guideline levels from higher exposure scenarios.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Is there no safe level of lead exposure for children?",
		slug: "is-there-no-safe-level-of-lead-exposure-for-children",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. Public-health agencies and toxicology reviews consistently treat lead as unsafe for children even at low levels; reference values and action levels are intervention triggers, not safety thresholds.",
		stableCore: [
			"No safe blood lead concentration has been identified for children.",
			"Even low blood lead levels are associated with lower IQ, attention problems, learning difficulties, and other developmental harms.",
			"Drinking-water action levels and blood lead reference values help prioritize response, but they do not mean exposures below those numbers are harmless."
		],
		openQuestions: [
			"Which local sources contribute most to remaining exposure in a given community: paint, dust, soil, plumbing, industry, imported products, or other sources?",
			"How should governments prioritize replacement and remediation when there is no safe threshold but resources are limited?"
		],
		whatWouldChangeMinds: [
			"High-quality developmental evidence showing a clear safe threshold below which childhood lead exposure has no meaningful harm.",
			"A major toxicology reassessment reversing the conclusion that low-level lead exposure harms child development."
		],
		misconceptions: [
			"An action level is often mistaken for a safe level.",
			"Because many children with lead exposure have no obvious symptoms, people can underestimate permanent developmental risk."
		],
		editorSummary:
			"This page should be blunt and practical: the consensus is not that every trace means an emergency, but that prevention and exposure reduction matter because no safe child threshold has been identified.",
		searchCutoffAt: "2026-07-02T21:45:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:45:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:45:00.000Z",
				kind: "publication",
				summary:
					"Initial childhood lead exposure claim page published from CDC, WHO, EPA, and National Toxicology Program sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "CDC Updates Blood Lead Reference Value",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/lead-prevention/php/news-features/updates-blood-lead-reference-value.html",
				stance: "supports",
				note:
					"CDC states that no safe level of lead in children has been identified and explains that the reference value is used to identify children with higher exposure, not to define safety.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Lead poisoning",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/lead-poisoning-and-health",
				stance: "supports",
				note:
					"WHO states that there is no known safe blood lead concentration and that low concentrations can be associated with decreased intelligence, behavioral difficulties, and learning problems.",
				order: 2
			},
			{
				kind: "guideline",
				title: "About Lead in Drinking Water",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/lead-prevention/prevention/drinking-water.html",
				stance: "supports",
				note:
					"Clarifies that no safe blood lead level has been identified for young children and that EPA's maximum contaminant level goal for lead in drinking water is zero.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Health Effects of Low-level Lead",
				publisher: "National Toxicology Program",
				year: 2026,
				url: "https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/lead",
				stance: "supports",
				note:
					"Toxicology assessment context supporting adverse health effects below 10 micrograms per deciliter and, for some effects, below 5 micrograms per deciliter.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does alcohol increase cancer risk, even at low levels?",
		slug: "does-alcohol-increase-cancer-risk-even-at-low-levels",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"Yes. Major cancer and public-health bodies agree that alcohol causes cancer and that cancer risk generally rises with drinking. For cancer risk specifically, WHO states there is no safe level; the absolute risk increase from low intake is smaller than from heavy drinking, but it is not zero.",
		stableCore: [
			"Alcoholic beverages are classified as carcinogenic to humans, and the causal link includes cancers of the mouth, throat, voice box, esophagus, liver, colorectum, and female breast.",
			"CDC states that all drinks containing alcohol, including beer, wine, and liquor, increase cancer risk.",
			"NCI gives absolute-risk context: compared with women drinking less than one drink per week, one drink per day is associated with about 2 additional alcohol-related cancers per 100 women and two drinks per day with about 5 additional cases per 100 women."
		],
		openQuestions: [
			"How should public guidance communicate small absolute low-dose risks without making them sound either negligible or catastrophic?",
			"How should the cancer-risk consensus be weighed alongside separate debates over cardiovascular outcomes and overall mortality at low intake?",
			"Which warning labels or public-health messages actually improve understanding without increasing backlash or fatalism?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled evidence showing no causal increase in alcohol-related cancer risk at low intake after accounting for confounding and drinking pattern.",
			"A major IARC, NCI, CDC, WHO, or Surgeon General reassessment reversing the causal classification or low-dose risk interpretation."
		],
		misconceptions: [
			"People often hear 'moderate drinking' as if it means no cancer risk, but cancer risk can still rise at low levels.",
			"Red wine is sometimes treated as a cancer-risk exception, even though ethanol is the relevant exposure across alcoholic drinks.",
			"Relative-risk headlines can make low-dose risks sound huge; absolute-risk context is still needed for individual decision-making."
		],
		editorSummary:
			"This page should clarify the cancer-specific consensus while avoiding overreach into every possible alcohol-health debate. The public answer is not that one drink is an emergency; it is that alcohol is a causal cancer risk and lower intake lowers that risk.",
		uncertaintySummary:
			"The causal cancer-risk conclusion is strong, including for low levels of drinking. Uncertainty is mainly about communicating absolute risk, individual baseline risk, drinking patterns, and how cancer-specific guidance interacts with other health outcomes.",
		searchCutoffAt: "2026-07-02T21:55:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:55:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:55:00.000Z",
				kind: "publication",
				summary:
					"Initial alcohol and cancer-risk claim page published from NCI, CDC, WHO Europe, and U.S. Surgeon General advisory sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Alcohol and Cancer Risk Fact Sheet",
				publisher: "National Cancer Institute",
				year: 2025,
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/alcohol/alcohol-fact-sheet",
				stance: "supports",
				note: "NCI anchor for the causal cancer relationship, cancer-site list, dose-response framing, mechanisms, and absolute-risk examples for one and two drinks per day.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Alcohol and Cancer",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/cancer/risk-factors/alcohol.html",
				stance: "supports",
				note: "Current CDC public-health source stating that drinking less or not drinking lowers cancer risk and that beer, wine, and liquor all increase risk.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Alcohol and cancer",
				publisher: "World Health Organization Regional Office for Europe",
				year: 2025,
				url: "https://www.who.int/europe/news-room/fact-sheets/item/alcohol-and-cancer",
				stance: "supports",
				note: "Current WHO Europe fact sheet stating that there is no safe level of alcohol consumption in relation to cancer risk and that even small amounts increase risk for most alcohol-related cancers.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Alcohol and Cancer Risk",
				publisher: "U.S. Surgeon General",
				year: 2025,
				url: "https://www.hhs.gov/surgeongeneral/reports-and-publications/alcohol-cancer/index.html",
				stance: "supports",
				note: "Surgeon General advisory summarizing evidence for a causal link between alcohol and at least seven cancer types and recommending better public risk communication.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does sunscreen use prevent skin cancer?",
		slug: "does-sunscreen-use-prevent-skin-cancer",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
			"Yes, when used correctly as part of sun protection. Sunscreen reduces UV exposure and is recommended by major public-health and dermatology bodies to lower skin-cancer risk. Direct trial evidence is strongest for squamous cell carcinoma and suggests melanoma prevention; it is weaker or less clear for basal cell carcinoma, and sunscreen should be combined with shade and protective clothing.",
		stableCore: [
			"CDC recommends broad-spectrum sunscreen with SPF 15 or higher before going outside and says sunscreen works best when combined with other sun-protection options.",
			"The American Academy of Dermatology recommends broad-spectrum, water-resistant SPF 30 or higher sunscreen and notes that SPF 30 blocks about 97% of UVB rays, while no sunscreen blocks 100%.",
			"The Nambour randomized trial found fewer squamous-cell carcinoma tumors with daily sunscreen use, but did not show a clear basal-cell carcinoma prevention effect.",
			"Longer follow-up of the Nambour trial found fewer melanomas in the daily-sunscreen group, with a stronger signal for invasive melanoma, but the melanoma endpoint was based on relatively few cases."
		],
		openQuestions: [
			"How much of the skin-cancer prevention benefit comes from sunscreen alone versus broader sun-protection behavior?",
			"How should guidance account for skin tone, UV index, outdoor occupation, geography, and vitamin D concerns without undermining UV protection?",
			"How do newer sunscreen formulations, application habits, and reapplication behavior change real-world protection?"
		],
		whatWouldChangeMinds: [
			"Large, well-conducted trials or strong natural experiments showing no reduction in UV damage, squamous-cell carcinoma, melanoma, or relevant precursors with correct sunscreen use.",
			"A major dermatology, cancer, CDC, or FDA reassessment concluding that harms of properly used sunscreen outweigh sun-protection benefits in routine populations.",
			"Evidence that sunscreen use reliably causes enough risk compensation to erase its UV-protection benefit under real-world guidance."
		],
		misconceptions: [
			"Sunscreen is sometimes treated as permission for unlimited sun exposure; it is only one part of protection.",
			"High SPF is often misunderstood as lasting longer, even though reapplication is still needed.",
			"Evidence gaps for basal-cell carcinoma are sometimes used to dismiss the broader UV-protection and squamous-cell carcinoma evidence."
		],
		editorSummary:
			"This page should answer the practical public question while keeping the evidence gradient visible: sunscreen is recommended and biologically sensible for UV protection, but the direct cancer-outcome evidence is not equally strong for every skin-cancer type.",
		uncertaintySummary:
			"The public-health recommendation is broad and stable, but the direct randomized evidence differs by outcome. Confidence is strongest for reducing UV exposure and squamous-cell carcinoma burden, suggestive for melanoma, and less clear for basal-cell carcinoma.",
		searchCutoffAt: "2026-07-02T22:11:34.000Z",
		lastRetractionCheckAt: "2026-07-02T22:11:34.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:11:34.000Z",
				kind: "publication",
				summary:
					"Initial sunscreen and skin-cancer prevention claim page published from CDC, AAD, Cochrane, and Nambour randomized-trial evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Sun Safety Facts",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/skin-cancer/sun-safety/index.html",
				stance: "supports",
				note:
					"Current CDC public-health guidance for broad-spectrum SPF 15 or higher sunscreen, reapplication, and combining sunscreen with other sun-protection measures.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Sunscreen FAQs",
				publisher: "American Academy of Dermatology",
				year: 2026,
				url: "https://www.aad.org/media/stats-sunscreen",
				stance: "supports",
				note:
					"Dermatology guidance for broad-spectrum, water-resistant SPF 30 or higher sunscreen, reapplication, and the need for shade and clothing because sunscreen alone cannot fully protect skin.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Sun protection (including sunscreens) to prevent basal cell carcinoma and cutaneous squamous cell carcinoma of the skin",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2016,
				url:
					"https://www.cochrane.org/evidence/CD011161_sun-protection-including-sunscreens-prevent-basal-cell-carcinoma-and-cutaneous-squamous-cell",
				doi: "10.1002/14651858.CD011161.pub2",
				pmid: "27501759",
				stance: "context",
				note:
					"Key caution source: found only one suitable RCT through May 2016 and rated evidence low for BCC/cSCC incidence, so the page should not overstate direct trial certainty for every skin-cancer type.",
				order: 3
			},
			{
				kind: "landmark_study",
				title:
					"Daily sunscreen application and betacarotene supplementation in prevention of basal-cell and squamous-cell carcinomas of the skin",
				publisher: "The Lancet",
				year: 1999,
				url: "https://pubmed.ncbi.nlm.nih.gov/10475183/",
				doi: "10.1016/S0140-6736(98)12168-2",
				pmid: "10475183",
				stance: "supports",
				note:
					"Nambour randomized trial source for daily sunscreen reducing squamous-cell carcinoma tumor counts while not clearly reducing basal-cell carcinoma incidence.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Reduced melanoma after regular sunscreen use: randomized trial follow-up",
				publisher: "Journal of Clinical Oncology",
				year: 2011,
				url: "https://pubmed.ncbi.nlm.nih.gov/21135266/",
				doi: "10.1200/JCO.2010.28.7078",
				pmid: "21135266",
				stance: "supports",
				note:
					"Nambour follow-up source reporting fewer primary melanomas and fewer invasive melanomas after assignment to daily sunscreen, with small event counts that require cautious wording.",
				order: 5
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
		topicSlug: "climate-and-environment",
		title: "Is global sea level rising and accelerating due to human-caused climate change?",
		slug: "is-global-sea-level-rising-and-accelerating-due-to-human-caused-climate-change",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. Tide gauges, satellites, and IPCC assessments show that global mean sea level has risen, the rate has accelerated, and human influence has been the main driver of the increase since at least 1971. Local sea level can differ because land motion and ocean circulation also matter.",
		stableCore: [
			"IPCC AR6 reports that global mean sea level rose 0.20 meters from 1901 to 2018 and that the average rate increased from 1.3 mm/year in 1901-1971 to 3.7 mm/year in 2006-2018.",
			"IPCC states that human influence was very likely the main driver of global mean sea-level rise since at least 1971.",
			"NASA's satellite-era synthesis reports 11.1 cm of global mean sea-level rise from 1993 to 2023 and a rate that increased from about 2.1 mm/year in 1993 to about 4.5 mm/year by 2024.",
			"Local relative sea level can rise faster or slower than the global mean because land subsidence, uplift, winds, currents, and regional ocean dynamics change what coastal communities experience."
		],
		openQuestions: [
			"How much will regional relative sea level differ from the global mean in places affected by subsidence, uplift, currents, or land-water management?",
			"How quickly will ice-sheet dynamics and low-likelihood high-impact outcomes unfold under high emissions?",
			"Which adaptation investments reduce flooding risk most effectively for specific coastal communities?"
		],
		whatWouldChangeMinds: [
			"A sustained, independently confirmed reversal of global mean sea-level rise across tide-gauge and satellite records.",
			"A major IPCC reassessment finding that human-caused warming is not the main driver of modern global mean sea-level rise.",
			"An alternative physical explanation that matches thermal expansion, land-ice loss, satellite altimetry, tide gauges, and regional patterns better than the current assessment."
		],
		misconceptions: [
			"A local tide gauge that rises slowly, or land that is uplifting, is sometimes used to dismiss the global mean trend.",
			"People often confuse year-to-year variability with the multi-decade acceleration signal.",
			"Sea-level rise is sometimes framed as only a future issue, even though the observed rise is already measured in the modern record."
		],
		editorSummary:
			"This page should separate the stable global answer from local planning details: the global rise and human contribution are assessed strongly, while local flood risk still needs local land-motion and exposure data.",
		uncertaintySummary:
			"The observed global direction and human contribution are high-certainty. The largest remaining uncertainty is not whether sea level is rising, but how fast ice sheets, emissions pathways, and local land motion will shape regional risk.",
		searchCutoffAt: "2026-07-02T22:11:34.000Z",
		lastRetractionCheckAt: "2026-07-02T22:11:34.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:11:34.000Z",
				kind: "publication",
				summary:
					"Initial sea-level-rise claim page published from IPCC AR6, NASA satellite-altimetry, and Communications Earth & Environment sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Summary for Policymakers, AR6 Synthesis Report",
				publisher: "IPCC",
				year: 2023,
				url: "https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf",
				stance: "supports",
				note:
					"Assessment anchor for 1901-2018 global mean sea-level rise, acceleration across assessed periods, and attribution of the increase since at least 1971 to human influence.",
				order: 1
			},
			{
				kind: "guideline",
				title: "The Rate of Global Sea Level Rise Doubled During the Past Three Decades",
				publisher: "NASA Earthdata",
				year: 2025,
				url:
					"https://www.earthdata.nasa.gov/learn/data-in-action/rate-global-sea-level-rise-doubled-during-past-three-decades",
				stance: "supports",
				note:
					"NASA satellite-altimetry explainer reporting 11.1 cm of global mean sea-level rise from 1993 to 2023 and a rate increase from about 2.1 to 4.5 mm/year.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "The rate of global sea level rise doubled during the past three decades",
				publisher: "Communications Earth & Environment",
				year: 2024,
				url: "https://doi.org/10.1038/s43247-024-01761-5",
				doi: "10.1038/s43247-024-01761-5",
				stance: "supports",
				note:
					"Peer-reviewed satellite-era analysis estimating 111 mm of global mean sea-level rise since 1993 and an increase from about 2.1 to 4.5 mm/year.",
				order: 3
			},
			{
				kind: "context",
				title: "NASA Analysis Shows Unexpected Amount of Sea Level Rise in 2024",
				publisher: "NASA Sea Level Change Portal",
				year: 2025,
				url:
					"https://sealevel.nasa.gov/news/282/nasa-analysis-shows-unexpected-amount-of-sea-level-rise-in-2024/",
				stance: "context",
				note:
					"Recent indicator context explaining 2024 variability, thermal expansion, land-ice contributions, and the uninterrupted satellite record.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is extreme heat becoming more frequent or intense because of human-caused climate change?",
		slug: "is-extreme-heat-becoming-more-frequent-or-intense-because-of-human-caused-climate-change",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"Yes. IPCC AR6 finds it virtually certain that hot extremes, including heatwaves, have become more frequent and more intense across most land regions since the 1950s, with high confidence that human-caused climate change is the main driver. Local impacts still depend on geography, humidity, urban heat islands, exposure, and preparedness.",
		stableCore: [
			"IPCC AR6 says hot extremes have become more frequent and intense across most land regions since the 1950s.",
			"The same IPCC assessment has high confidence that human-induced climate change is the main driver of these observed changes.",
			"EPA summarizes the practical U.S. implication clearly: as average temperatures rise, the risk of extreme temperatures, heat waves, and record-breaking temperatures increases.",
			"Observed U.S. indicators show unusually hot summer days and nights have become more common, and heat waves in major cities have become more frequent and the heat-wave season longer."
		],
		openQuestions: [
			"How much of a specific local heat wave is attributable to climate change versus regional weather variability, land use, humidity, and urban heat-island effects?",
			"Which adaptation measures most reduce heat illness and death for outdoor workers, older adults, children, pregnant people, and low-income communities?",
			"How quickly will extreme heat risks change under different emissions, urban planning, and public-health preparedness choices?"
		],
		whatWouldChangeMinds: [
			"A major IPCC reassessment finding that observed hot-extreme trends are not increasing across most land regions or are not mainly driven by human-caused warming.",
			"Independent observational records showing a sustained reversal in hot-extreme frequency and intensity despite continued global warming.",
			"A better attribution framework that explains the observed heat-extreme pattern without anthropogenic greenhouse-gas forcing."
		],
		misconceptions: [
			"A mild summer in one place is sometimes treated as evidence against the global and multi-decade heat-extreme trend.",
			"Weather and climate are often confused: climate change changes the odds and intensity of heat extremes without making every hot day unprecedented.",
			"Urban heat islands can worsen local heat risk, but they do not explain the assessed global pattern of hotter extremes across most land regions."
		],
		editorSummary:
			"This page should connect climate attribution to lived experience without overclaiming every individual event. The strongest phrasing is about shifted odds, frequency, intensity, and public-health exposure, not a guarantee that every place warms at the same rate.",
		uncertaintySummary:
			"The global direction and human contribution are high-certainty. Remaining uncertainty is mostly local and operational: exact event attribution, regional humidity and land-use effects, and how much adaptation reduces harm.",
		searchCutoffAt: "2026-07-02T22:25:42.000Z",
		lastRetractionCheckAt: "2026-07-02T22:25:42.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:25:42.000Z",
				kind: "publication",
				summary:
					"Initial extreme-heat claim page published from IPCC AR6, EPA climate-science, and EPA climate-indicator sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Summary for Policymakers, AR6 WGI: The Physical Science Basis",
				publisher: "IPCC",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf",
				doi: "10.1017/9781009157896.001",
				stance: "supports",
				note:
					"Assessment anchor for the virtually certain increase in hot extremes across most land regions since the 1950s and high-confidence attribution to human-induced climate change.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Extreme Heat",
				publisher: "U.S. Environmental Protection Agency",
				url: "https://www.epa.gov/climatechange-science/extreme-heat",
				stance: "supports",
				note:
					"Public-facing climate-science source explaining that rising average temperatures increase the risk of extreme temperatures, heat waves, and record-breaking temperatures.",
				order: 2
			},
			{
				kind: "context",
				title: "EPA Releases Updated Climate Indicators Report Showing How Climate Change is Impacting People's Health and the Environment",
				publisher: "U.S. Environmental Protection Agency",
				year: 2024,
				url:
					"https://www.epa.gov/newsreleases/epa-releases-updated-climate-indicators-report-showing-how-climate-change-impacting",
				stance: "context",
				note:
					"Indicator context reporting more common unusually hot U.S. summer days and nights, and city heat-wave frequency increasing from about two per year in the 1960s to six per year in the 2010s and 2020s.",
				order: 3
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
		topicSlug: "nutrition-and-diet",
		title: "Do most people consume too much sodium, and does reducing sodium lower blood pressure?",
		slug: "do-most-people-consume-too-much-sodium-and-does-reducing-sodium-lower-blood-pressure",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Yes. Global and U.S. public-health sources report that most people consume more sodium than recommended, and randomized-trial meta-analyses show that reducing sodium lowers blood pressure, with larger average effects in people with higher baseline blood pressure.",
		stableCore: [
			"WHO reports that almost all populations consume too much sodium, with a 2021 global adult mean of 4,278 mg/day, more than double WHO's recommendation of less than 2,000 mg/day.",
			"CDC reports that Americans consume more than 3,300 mg/day on average, above the U.S. recommendation of less than 2,300 mg/day for teens and adults.",
			"A 2020 BMJ meta-analysis of 133 randomized trials found a dose-response relationship: larger sodium reductions produced larger blood-pressure reductions, especially in older people, non-white populations, and people with higher baseline blood pressure."
		],
		openQuestions: [
			"Which sodium-reduction policies work best in different food systems where most sodium comes from processed and restaurant foods?",
			"How should guidance balance sodium reduction with adequate iodine intake where iodized salt is a major iodine source?",
			"How should low-sodium advice be individualized for people with specific medical conditions or medication regimens?"
		],
		whatWouldChangeMinds: [
			"Large, well-conducted randomized evidence showing sodium reduction does not lower blood pressure when intake measurement and adherence are strong.",
			"Major WHO, CDC, dietary-guideline, or cardiovascular-guideline revisions concluding current sodium-intake targets are not justified for population blood-pressure control."
		],
		misconceptions: [
			"People often focus on table salt, but most sodium in many diets comes from packaged, processed, and restaurant foods.",
			"Individual variation in salt sensitivity is sometimes used to dismiss the population-level blood-pressure evidence.",
			"Claims that sodium is essential can obscure the distinction between needing some sodium and consuming far more than recommended."
		],
		editorSummary:
			"This page should give readers the basic sodium consensus: average intake is high, blood pressure is a key outcome, and the main policy problem is the food environment rather than only the salt shaker.",
		uncertaintySummary:
			"The direction is strong: high sodium intake raises blood pressure, and reduction lowers it on average. Remaining uncertainty is about effect size for a given individual, the best implementation tools, and how to tailor advice for special clinical situations.",
		searchCutoffAt: "2026-07-02T21:55:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:55:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:55:00.000Z",
				kind: "publication",
				summary:
					"Initial sodium intake and blood-pressure claim page published from WHO, CDC, and randomized-trial meta-analysis sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Sodium reduction",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/sodium-reduction",
				stance: "supports",
				note: "WHO anchor for global overconsumption and adult sodium recommendation; reports a 2021 global mean adult intake of 4,278 mg/day versus the recommendation of less than 2,000 mg/day.",
				order: 1
			},
			{
				kind: "guideline",
				title: "About Sodium and Health",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/salt/about/index.html",
				stance: "supports",
				note: "CDC public-health source stating that most Americans consume too much sodium and linking excess sodium to higher blood pressure, heart disease, and stroke risk.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Effect of dose and duration of reduction in dietary sodium on blood pressure levels: systematic review and meta-analysis of randomised trials",
				publisher: "The BMJ",
				year: 2020,
				url: "https://doi.org/10.1136/bmj.m315",
				doi: "10.1136/bmj.m315",
				stance: "supports",
				note: "Decision-weight meta-analysis of 133 randomized trials showing a dose-response relation between sodium reduction and blood-pressure lowering.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Effect of population-based sodium reduction interventions on blood pressure: a systematic review and meta-analysis of randomized trials",
				publisher: "Hypertension Research",
				year: 2025,
				url: "https://doi.org/10.1038/s41440-025-02181-4",
				doi: "10.1038/s41440-025-02181-4",
				stance: "supports",
				note: "Recent population-intervention meta-analysis of 36 studies and 66,803 participants finding lower office blood pressure compared with usual care, with heterogeneity by setting and baseline risk.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is the Sun causing recent global warming?",
		slug: "is-the-sun-causing-recent-global-warming",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. The Sun affects Earth's climate, but recent global warming cannot be explained by solar activity. Satellite-era solar energy has not risen enough to match the observed warming, and the atmospheric pattern fits greenhouse-gas forcing instead.",
		stableCore: [
			"Solar variability is real, but it does not explain the sharp recent warming trend.",
			"Recent warming is much larger than the assessed contribution from natural solar and volcanic drivers.",
			"Surface warming paired with stratospheric cooling is the pattern expected from increased heat-trapping gases, not from the Sun simply getting stronger."
		],
		openQuestions: [
			"How should climate pages explain natural variability without letting it be mistaken for the main driver?",
			"Which charts best help readers separate short solar cycles from long-term greenhouse forcing?"
		],
		whatWouldChangeMinds: [
			"A durable solar forcing record that rises in step with the observed late-20th and 21st century warming.",
			"A physical attribution model that explains the warming pattern without increased greenhouse gases and performs better across observations."
		],
		misconceptions: [
			"People often confuse the true statement that the Sun powers climate with the false claim that solar activity explains recent warming.",
			"Cherry-picked pre-1975 solar correlations are often used while ignoring the later divergence between solar activity and temperature."
		],
		editorSummary:
			"This claim turns a common climate challenge into a direct attribution page: natural solar influence is real, but it is not the recent warming driver.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial climate-misconception claim page published from IPCC, NASA, and rebuttal-context sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "AR6 Synthesis Report: Summary for Policymakers",
				publisher: "IPCC",
				year: 2023,
				url: "https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf",
				stance: "supports",
				note: "Anchors the attribution baseline that human-caused warming dominates while natural solar and volcanic drivers explain little of the recent temperature change.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Is the Sun causing global warming?",
				publisher: "NASA Science",
				year: 2024,
				url: "https://science.nasa.gov/climate-change/faq/is-the-sun-causing-global-warming/",
				stance: "supports",
				note: "Provides the public-facing observational explanation: no net solar increase since the 1950s, warming at the surface, and cooling in the stratosphere.",
				order: 2
			},
			{
				kind: "context",
				title: "Sun and climate: moving in opposite directions",
				publisher: "Skeptical Science",
				url: "https://skepticalscience.com/solar-activity-sunspots-global-warming.htm",
				stance: "supports",
				note: "Supporting rebuttal context for the common 'it is the Sun' objection; keep below IPCC and NASA in the source stack.",
				order: 3
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Do volcanoes emit more CO2 than humans?",
		slug: "do-volcanoes-emit-more-co2-than-humans",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. Volcanoes release CO2, but present-day volcanic emissions are far smaller than human emissions from fossil fuels, land use, cement, and related activity. The common volcano claim gets the scale wrong by roughly two orders of magnitude.",
		stableCore: [
			"Volcanoes are part of Earth's long carbon cycle, but their present-day annual CO2 emissions are small compared with human emissions.",
			"Large eruptions can matter for short-term climate, often through aerosols and temporary cooling, but they do not explain the modern CO2 rise.",
			"The volcano argument is mostly a scale error: dramatic events are mistaken for the relentless size of human emissions."
		],
		openQuestions: [
			"How should the page explain volcanic climate effects without implying volcanoes are irrelevant to climate science?",
			"Which current emissions baseline should be displayed when the page is next refreshed?"
		],
		whatWouldChangeMinds: [
			"Credible global volcanic CO2 estimates rising to the same order of magnitude as current human emissions.",
			"Atmospheric carbon evidence showing the modern CO2 rise is volcanic rather than tied to fossil carbon and land-use emissions."
		],
		misconceptions: [
			"A spectacular eruption is often mistaken for a larger long-term carbon source than daily global fossil-fuel burning.",
			"Short-lived volcanic cooling from aerosols is sometimes confused with volcanic CO2 driving long-term warming."
		],
		editorSummary:
			"This claim is a compact quantitative climate page: the scientific answer is less about ideology than about orders of magnitude.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary:
					"Initial volcano-versus-human CO2 claim page published from USGS, NOAA, and rebuttal-context sources."
			}
		],
		sources: [
			{
				kind: "landmark_study",
				title: "Volcanic versus anthropogenic carbon dioxide",
				publisher: "Eos, Transactions American Geophysical Union",
				year: 2011,
				url: "https://volcanoes.usgs.gov/vsc/file_mngr/file-154/Gerlach-2011-EOS_AGU.pdf",
				stance: "supports",
				note: "USGS-authored scale comparison showing modern human CO2 emissions dwarf present-day volcanic CO2 estimates.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Which emits more carbon dioxide: volcanoes or human activities?",
				publisher: "NOAA Climate.gov",
				year: 2016,
				url: "https://www.climate.gov/news-features/climate-qa/which-emits-more-carbon-dioxide-volcanoes-or-human-activities",
				stance: "supports",
				note: "Public climate Q&A used to cross-check the quantitative bottom line against an official climate-education source.",
				order: 2
			},
			{
				kind: "context",
				title: "Do volcanoes emit more CO2 than humans?",
				publisher: "Skeptical Science",
				url: "https://skepticalscience.com/volcanoes-and-global-warming.htm",
				stance: "supports",
				note: "Supporting rebuttal context for the exact myth phrasing; useful for readers who arrive through climate-skeptic challenge wording.",
				order: 3
			},
			{
				kind: "context",
				title: "Fact brief: Do volcanoes emit more CO2 than humans?",
				publisher: "Skeptical Science / Gigafact",
				year: 2024,
				url: "https://skepticalscience.com/fact-brief-volcano.html",
				stance: "supports",
				note: "Short reader-facing context with a current emissions comparison; do not let it outrank USGS or NOAA anchors.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is there a scientific consensus that humans are causing climate change?",
		slug: "is-there-a-scientific-consensus-that-humans-are-causing-climate-change",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"Yes. Major assessments and multiple studies of the climate literature find overwhelming agreement that humans are causing recent global warming. The exact percentage depends on method, but the practical answer is strong expert consensus, not a divided field.",
		stableCore: [
			"IPCC assessments treat human-caused warming as established, not as a fringe or evenly divided proposition.",
			"NASA's scientific-consensus summary lists major scientific societies and academies that endorse the human-caused warming baseline.",
			"Consensus-estimate studies repeatedly find very high agreement among publishing climate experts or papers that take a position."
		],
		openQuestions: [
			"Which consensus statistic is clearest for readers without creating a false impression that science is just a poll?",
			"How should the page distinguish consensus on cause from active debates about impacts, timing, policy, and regional risk?"
		],
		whatWouldChangeMinds: [
			"Multiple independent surveys or literature analyses showing the publishing expert community is genuinely split on human-caused warming.",
			"A formal assessment overturning the attribution baseline across observations, physics, and model evidence."
		],
		misconceptions: [
			"Public controversy is often mistaken for expert disagreement.",
			"Arguments over the exact consensus percentage are often used to distract from the robust conclusion that agreement is overwhelming."
		],
		editorSummary:
			"This page should answer the site's namesake climate question directly: the climate attribution consensus is real, high, and repeatedly measured.",
		searchCutoffAt: "2026-07-02T12:00:00.000Z",
		lastRetractionCheckAt: "2026-07-02T12:00:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T12:00:00.000Z",
				kind: "publication",
				summary: "Initial climate-consensus statistics claim page published."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "AR6 Synthesis Report: Summary for Policymakers",
				publisher: "IPCC",
				year: 2023,
				url: "https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf",
				stance: "supports",
				note: "Primary assessment anchor for the established human-caused warming conclusion and calibrated confidence language.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Scientific Consensus",
				publisher: "NASA Science",
				year: 2024,
				url: "https://science.nasa.gov/climate-change/scientific-consensus/",
				stance: "supports",
				note: "Public institutional summary collecting society and academy statements plus peer-reviewed consensus literature.",
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
				note: "Synthesis source for the 90-100 percent range across independent estimates of expert agreement.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Greater than 99% consensus on human caused climate change in the peer-reviewed scientific literature",
				publisher: "Environmental Research Letters",
				year: 2021,
				url: "https://doi.org/10.1088/1748-9326/ac2966",
				doi: "10.1088/1748-9326/ac2966",
				stance: "supports",
				note: "Updated literature-survey source showing that papers rejecting human-caused contemporary climate change are rare in the peer-reviewed climate literature.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Does air pollution cause millions of premature deaths each year?",
		slug: "does-air-pollution-cause-millions-of-premature-deaths-each-year",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. The exact number depends on the year, pollutant mix, and burden-model assumptions, but major health agencies and global burden assessments consistently attribute millions of premature deaths each year to ambient and household air pollution.",
		stableCore: [
			"Fine particulate matter and other air pollutants increase risks of cardiovascular disease, stroke, chronic obstructive pulmonary disease, lower respiratory infection, lung cancer, and other outcomes.",
			"WHO estimates 4.2 million premature deaths from ambient outdoor air pollution in 2019 and 6.7 million premature deaths from the combined effects of ambient and household air pollution.",
			"State of Global Air 2025 estimates that air pollution contributed to about 7.9 million deaths worldwide in 2023, underscoring that the burden is measured in millions, not thousands."
		],
		openQuestions: [
			"How should burden estimates be updated as exposure models, baseline disease rates, and pollution mixtures change?",
			"Which policies deliver the largest health gains in communities that face the highest exposure and vulnerability?"
		],
		whatWouldChangeMinds: [
			"Multiple independent global burden assessments converging on far lower attributable deaths after better exposure and disease modeling.",
			"Strong causal evidence overturning the established links between fine particulate pollution and major cardiovascular and respiratory outcomes."
		],
		misconceptions: [
			"Air pollution is often treated as only an asthma or visibility problem, while the largest burden estimates include heart disease and stroke.",
			"Because attributable deaths are modeled, people sometimes mistake uncertainty ranges for evidence that the risk is speculative."
		],
		editorSummary:
			"This page should make the scale legible without pretending the exact global number is a direct body count. The durable answer is that air pollution is a major, measurable mortality risk.",
		uncertaintySummary:
			"Attributable-death estimates depend on exposure modeling, baseline disease rates, counterfactual assumptions, and overlapping risks, but the direction and large scale of the burden are not fringe claims.",
		searchCutoffAt: "2026-07-02T21:45:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:45:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:45:00.000Z",
				kind: "publication",
				summary:
					"Initial air-pollution mortality burden claim page published from WHO fact sheets, WHO air-quality guidelines, and State of Global Air 2025."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Ambient (outdoor) air pollution",
				publisher: "World Health Organization",
				year: 2024,
				url:
					"https://www.who.int/news-room/fact-sheets/detail/ambient-%28outdoor%29-air-quality-and-health",
				stance: "supports",
				note:
					"WHO fact sheet estimating 4.2 million premature deaths from ambient air pollution in 2019 and identifying cardiovascular, respiratory, and cancer pathways.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Household air pollution",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/household-air-pollution-and-health",
				stance: "supports",
				note:
					"WHO fact sheet estimating 2.9 million deaths from household air pollution in 2021 and 6.7 million premature deaths from combined ambient and household air pollution.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "WHO global air quality guidelines",
				publisher: "World Health Organization",
				year: 2021,
				url: "https://www.who.int/publications/i/item/9789240034228",
				stance: "supports",
				note:
					"Guideline anchor for the causal health framing and pollutant thresholds, including PM2.5, PM10, ozone, nitrogen dioxide, sulfur dioxide, and carbon monoxide.",
				order: 3
			},
			{
				kind: "context",
				title: "State of Global Air Report 2025",
				publisher: "Health Effects Institute and Institute for Health Metrics and Evaluation",
				year: 2025,
				url: "https://www.stateofglobalair.org/resources/report/state-global-air-report-2025",
				stance: "supports",
				note:
					"Recent global burden context estimating air-pollution-attributable deaths worldwide in 2023 and showing why estimates vary by model and year.",
				order: 4
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
				note: "Documents the scientific-society baseline that evolution is a robust, widely accepted foundation of modern biology.",
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
		title: "Does regular cannabis use increase the risk of psychosis and schizophrenia, especially for adolescents and heavy or high-THC users?",
		slug: "does-regular-cannabis-use-increase-the-risk-of-psychosis-and-schizophrenia-especially-for-adolescents-and-heavy-or-high-thc-users",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
			"Yes, with important caveats. The evidence strongly associates cannabis use with later psychosis risk, with the highest risks among frequent users, earlier starters, and people using high-THC products. Because much of the evidence is observational, the page should describe a risk gradient and plausible causal contribution, not claim that cannabis inevitably causes schizophrenia in every user.",
		stableCore: [
			"National Academies found substantial evidence of a statistical association between cannabis use and developing schizophrenia or other psychoses, with the highest risk among the most frequent users.",
			"The Marconi meta-analysis reported higher risk among heavier users and a dose-response relationship between cannabis exposure and psychotic outcomes.",
			"CDC warns that the association between cannabis and schizophrenia is stronger when use starts earlier and is more frequent.",
			"High-potency and daily-use patterns are especially concerning in first-episode psychosis studies, but population-attributable estimates depend on causal assumptions and local product markets."
		],
		openQuestions: [
			"How much of the association is causal versus shared vulnerability, reverse causation, correlated substance use, or other confounding?",
			"Which THC potency, CBD content, age of first use, and frequency thresholds best predict clinically meaningful risk?",
			"How should legalization and medical-use messaging communicate risk without exaggerating base rates or stigmatizing people with psychosis?"
		],
		whatWouldChangeMinds: [
			"Large longitudinal or quasi-experimental evidence showing that frequent or high-potency cannabis use no longer predicts psychosis after strong handling of confounding and reverse causality.",
			"Mechanistic and genetic evidence showing that the observed dose-response pattern is better explained by liability to psychosis causing cannabis use rather than cannabis contributing to risk.",
			"Updated systematic reviews finding that earlier age, higher frequency, or higher THC potency do not materially change psychosis risk."
		],
		misconceptions: [
			"'Natural' or legal does not mean risk-free, especially for adolescents, frequent users, or high-THC products.",
			"An increased risk is not the same thing as inevitability; most cannabis users do not develop schizophrenia.",
			"Medical uses of some cannabis-derived products do not erase the psychosis-risk evidence for high-THC recreational exposure."
		],
		editorSummary:
			"This page should be careful but direct: the risk signal is too consistent to dismiss, yet the public explanation should emphasize gradients, susceptibility, adolescent exposure, and high-potency use rather than panic or inevitability.",
		uncertaintySummary:
			"The association, frequency gradient, and adolescent-risk concern are robust enough for a broad-consensus page. Causal size, product-potency thresholds, and individual susceptibility remain active sources of uncertainty.",
		searchCutoffAt: "2026-07-02T22:25:42.000Z",
		lastRetractionCheckAt: "2026-07-02T22:25:42.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:25:42.000Z",
				kind: "publication",
				summary:
					"Initial cannabis-psychosis claim page published from National Academies, CDC, dose-response meta-analysis, and high-potency first-episode psychosis evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "The Health Effects of Cannabis and Cannabinoids: Mental Health",
				publisher: "National Academies / NCBI Bookshelf",
				year: 2017,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK425748/",
				doi: "10.17226/24625",
				stance: "supports",
				note:
					"Assessment anchor concluding substantial evidence of a statistical association between cannabis use and development of schizophrenia or other psychoses, with highest risk among the most frequent users.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Meta-analysis of the Association Between the Level of Cannabis Use and Risk of Psychosis",
				publisher: "Schizophrenia Bulletin",
				year: 2016,
				url: "https://doi.org/10.1093/schbul/sbw003",
				doi: "10.1093/schbul/sbw003",
				pmid: "26884547",
				stance: "supports",
				note:
					"Dose-response source reporting an odds ratio of 3.90 for the heaviest users versus nonusers and concluding that high levels of use increase psychotic-outcome risk.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "The contribution of cannabis use to variation in the incidence of psychotic disorder across Europe",
				publisher: "The Lancet Psychiatry",
				year: 2019,
				url: "https://doi.org/10.1016/S2215-0366(19)30048-3",
				doi: "10.1016/S2215-0366(19)30048-3",
				pmid: "30902669",
				stance: "supports",
				note:
					"EU-GEI first-episode psychosis study reporting elevated odds for daily use and nearly five-fold odds for daily high-potency use, while relying on case-control attribution assumptions.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Cannabis and Teens",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/cannabis/health-effects/cannabis-and-teens.html",
				stance: "supports",
				note:
					"Public-health anchor for adolescent brain development, temporary psychosis, schizophrenia risk, and the stronger association with earlier and more frequent use.",
				order: 4
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Are antidepressants effective for major depressive disorder, and how big is the average benefit?",
		slug: "are-antidepressants-effective-for-major-depressive-disorder-and-how-big-is-the-average-benefit",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 87,
		bottomLine:
			"Yes, but the average benefit is modest and varies a lot. Large randomized-trial syntheses find antidepressants more effective than placebo for acute adult major depressive disorder, while guidelines emphasize severity, side effects, psychotherapy options, patient preferences, and follow-up rather than a simple works-or-does-not-work answer.",
		stableCore: [
			"The 2018 Lancet network meta-analysis included 522 randomized trials and 116,477 participants and found all 21 antidepressants more efficacious than placebo for acute adult major depressive disorder.",
			"The same synthesis rated evidence certainty from moderate to very low across comparisons, so it supports effectiveness while leaving room for caution about exact rankings and effect sizes.",
			"An FDA-submitted-trial participant-level analysis found a mean drug-placebo advantage of 1.75 HAMD17 points and suggested that a minority of participants have a substantial antidepressant effect beyond placebo.",
			"ACP recommends either cognitive behavioral therapy or a second-generation antidepressant as initial treatment for adults with acute moderate to severe major depressive disorder, with decisions personalized to benefits, harms, cost, feasibility, symptoms, comorbidities, medications, and patient preferences."
		],
		openQuestions: [
			"Which patients are most likely to experience a large medication-specific response rather than a modest average effect?",
			"How should clinicians balance medication, psychotherapy, combined treatment, side effects, withdrawal, suicidality monitoring, access, and patient preference?",
			"How much do trial design, publication bias, placebo response, baseline severity, and outcome measures affect the apparent size of benefit?"
		],
		whatWouldChangeMinds: [
			"Large, low-bias pragmatic trials showing no clinically meaningful medication-specific benefit across severity strata and patient subgroups.",
			"Stronger individual-patient predictors that reliably identify who benefits substantially, who does not, and who is harmed.",
			"Guideline changes from major bodies finding that antidepressants should no longer be first-line options for moderate to severe adult major depression."
		],
		misconceptions: [
			"'Antidepressants work' does not mean they work dramatically for everyone or that side effects and discontinuation problems are irrelevant.",
			"'The average effect is modest' does not mean no one benefits or that all improvement is fake.",
			"Medication and psychotherapy are often presented as rivals even though guidelines commonly support shared decision-making and, for some patients, combined treatment."
		],
		editorSummary:
			"This page should avoid both miracle-cure and total-dismissal framing. The consensus answer is yes-with-qualifiers: antidepressants beat placebo on average in adult acute MDD trials, but average effects are modest, heterogeneity is substantial, and treatment choice should stay clinical and preference-sensitive.",
		uncertaintySummary:
			"The existence of average efficacy over placebo is well supported, but clinical interpretation is moderate-certainty because effect size, individual response prediction, trial design, and adverse-effect tradeoffs remain contested and patient-specific.",
		searchCutoffAt: "2026-07-02T22:25:42.000Z",
		lastRetractionCheckAt: "2026-07-02T22:25:42.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:25:42.000Z",
				kind: "publication",
				summary:
					"Initial antidepressant-effectiveness claim page published from Lancet network meta-analysis, BMJ FDA-trial participant-level analysis, ACP guideline, and NICE guidance."
			}
		],
		sources: [
			{
				kind: "meta_analysis",
				title: "Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder",
				publisher: "The Lancet",
				year: 2018,
				url: "https://pubmed.ncbi.nlm.nih.gov/29477251/",
				doi: "10.1016/S0140-6736(17)32802-7",
				pmid: "29477251",
				stance: "supports",
				note:
					"Decision-weight source for acute adult MDD efficacy; found all 21 antidepressants more efficacious than placebo across 522 trials and 116,477 participants.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Response to acute monotherapy for major depressive disorder in randomized, placebo controlled trials submitted to the US Food and Drug Administration",
				publisher: "BMJ",
				year: 2022,
				url: "https://www.bmj.com/content/378/bmj-2021-067606",
				doi: "10.1136/bmj-2021-067606",
				stance: "context",
				note:
					"Individual-participant FDA trial analysis estimating a 1.75-point mean HAMD17 drug-placebo advantage and a substantial antidepressant-specific response in about 15% of participants.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Nonpharmacologic and Pharmacologic Treatments of Adults in the Acute Phase of Major Depressive Disorder",
				publisher: "American College of Physicians",
				year: 2023,
				url: "https://pubmed.ncbi.nlm.nih.gov/36689752/",
				doi: "10.7326/M22-2056",
				pmid: "36689752",
				stance: "supports",
				note:
					"Guideline anchor recommending CBT or a second-generation antidepressant as initial monotherapy for acute moderate to severe adult MDD, with personalization of benefits and harms.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Depression in adults: treatment and management",
				publisher: "NICE",
				year: 2022,
				url: "https://www.nice.org.uk/guidance/ng222/chapter/recommendations",
				stance: "context",
				note:
					"Clinical guidance context for severity stratification, shared decision-making, first-line treatment choices, monitoring, and side-effect discussion.",
				order: 4
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
		topicSlug: "neuroscience-and-psychology",
		title: "Does sugar make children hyperactive?",
		slug: "does-sugar-make-children-hyperactive",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
			"Not in the usual immediate 'sugar high' sense. Blinded challenge studies and a JAMA meta-analysis do not show that sugar reliably worsens children's behavior or cognition, although high-sugar diets can still matter for dental, metabolic, and overall health.",
		stableCore: [
			"The classic meta-analysis included 16 reports and 23 within-subject studies; all 14 behavior or cognition effect-size confidence intervals included zero.",
			"Parent expectancy can make behavior seem worse when adults believe a child received sugar, even when the child actually received a placebo.",
			"Observational links between sugary drinks and ADHD symptoms do not prove that eating sugar causes immediate hyperactivity."
		],
		openQuestions: [
			"Whether small susceptible subgroups respond differently enough to matter clinically.",
			"How long-term dietary patterns, sleep, household routines, and highly stimulating party settings interact with perceived behavior."
		],
		whatWouldChangeMinds: [
			"Repeated blinded challenge trials showing a reliable, clinically meaningful hyperactivity effect after sugar compared with placebo.",
			"Evidence separating sugar's direct behavioral effect from expectancy, sleep, excitement, caffeine, and broader diet quality."
		],
		misconceptions: [
			"Exciting settings where children eat sweets can make sugar look causal even when the setting is doing much of the work.",
			"Diet quality and acute sugar-triggered hyperactivity are different questions and should not be collapsed into one claim."
		],
		editorSummary:
			"This is a useful neuromyth page because it lets the site say both things at once: the immediate hyperactivity claim is not well supported, and high-sugar diets can still be worth reducing for other health reasons.",
		searchCutoffAt: "2026-07-02T21:30:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:30:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:30:00.000Z",
				kind: "publication",
				summary:
					"Initial sugar-hyperactivity claim page published from blinded challenge meta-analysis, expectancy study, and observational ADHD context."
			}
		],
		sources: [
			{
				kind: "meta_analysis",
				title: "The effect of sugar on behavior or cognition in children. A meta-analysis",
				publisher: "JAMA",
				year: 1995,
				url: "https://pubmed.ncbi.nlm.nih.gov/7474248/",
				doi: "10.1001/jama.1995.03530200053037",
				pmid: "7474248",
				stance: "supports",
				note:
					"Decision-weight source for the acute causal question; the meta-analysis found no significant sugar effect across 14 behavioral and cognitive constructs.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Effects of sugar ingestion expectancies on mother-child interactions",
				publisher: "Journal of Abnormal Child Psychology",
				year: 1994,
				url: "https://pubmed.ncbi.nlm.nih.gov/7963081/",
				doi: "10.1007/BF02168088",
				pmid: "7963081",
				stance: "context",
				note:
					"Shows why the belief persists: mothers told their child received sugar rated more hyperactivity even though all children received placebo.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Sugar consumption, sugar sweetened beverages and Attention Deficit Hyperactivity Disorder",
				publisher: "Complementary Therapies in Medicine",
				year: 2020,
				url: "https://doi.org/10.1016/j.ctim.2020.102512",
				doi: "10.1016/j.ctim.2020.102512",
				stance: "context",
				note:
					"Context source: observational studies can show sugar-sweetened beverage and ADHD-symptom associations, but this is not the same as blinded proof of acute sugar hyperactivity.",
				order: 3
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
		title: "Does it matter what replaces saturated fat?",
		slug: "does-it-matter-what-replaces-saturated-fat",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"Yes. The strongest cardiovascular advice is not just 'eat less saturated fat' in isolation; it is to replace saturated fat with healthier unsaturated fats, especially polyunsaturated fats, rather than refined carbohydrates or added sugar.",
		stableCore: [
			"Replacement matters because removing saturated fat without improving the rest of the diet can dilute or hide the benefit.",
			"Cochrane's 2020 review found moderate-quality evidence that reducing saturated fat reduced combined cardiovascular events, with benefits tied to what replaced the saturated fat.",
			"A meta-analysis of randomized trials found that increasing polyunsaturated fat in place of saturated fat reduced coronary heart disease events by about 19% across eight trials."
		],
		openQuestions: [
			"Which whole-food substitution patterns work best for different baseline risk groups?",
			"How should public guidance explain nutrient replacement without making people chase isolated macronutrient targets?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled trials showing no cardiovascular advantage when saturated fat is replaced with unsaturated fats in realistic diets.",
			"Major cardiovascular guidelines converging on a different replacement hierarchy after reviewing clinical outcomes and lipid effects."
		],
		misconceptions: [
			"Headlines often ask whether saturated fat is 'bad' without saying what replaces it.",
			"Replacing butter or fatty meat with refined starch or added sugar is not the same intervention as replacing it with plant oils, nuts, fish, or other unsaturated-fat sources."
		],
		editorSummary:
			"This page makes the nutrition nuance explicit: the public argument is often framed as saturated fat yes-or-no, while the evidence is largely about replacement patterns.",
		searchCutoffAt: "2026-07-02T21:33:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:33:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:33:00.000Z",
				kind: "publication",
				summary:
					"Initial saturated-fat replacement claim page published from Cochrane, randomized-trial meta-analysis, and AHA advisory sources."
			}
		],
		sources: [
			{
				kind: "systematic_review",
				title: "Effect of cutting down on the saturated fat we eat on our risk of heart disease",
				publisher: "Cochrane",
				year: 2020,
				url:
					"https://www.cochrane.org/evidence/CD011737_effect-cutting-down-saturated-fat-we-eat-our-risk-heart-disease",
				doi: "10.1002/14651858.CD011737.pub3",
				stance: "supports",
				note:
					"Decision-weight review: 15 studies with more than 56,000 participants; reports a 17% reduction in combined cardiovascular events and emphasizes replacement patterns.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title:
					"Effects on Coronary Heart Disease of Increasing Polyunsaturated Fat in Place of Saturated Fat: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
				publisher: "PLOS Medicine",
				year: 2010,
				url: "https://doi.org/10.1371/journal.pmed.1000252",
				doi: "10.1371/journal.pmed.1000252",
				pmid: "20351774",
				pmcid: "PMC2843598",
				stance: "supports",
				note:
					"Eight randomized trials with 13,614 participants and 1,042 coronary heart disease events; pooled risk reduction was 19% when PUFA replaced saturated fat.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Dietary Fats and Cardiovascular Disease: A Presidential Advisory From the American Heart Association",
				publisher: "Circulation",
				year: 2017,
				url: "https://doi.org/10.1161/CIR.0000000000000510",
				doi: "10.1161/CIR.0000000000000510",
				pmid: "28620111",
				stance: "supports",
				note:
					"Guideline-style cardiovascular advisory concluding that replacing saturated fat with unsaturated fat, especially polyunsaturated fat, lowers cardiovascular disease risk.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Are seed oils uniquely toxic or inflammatory?",
		slug: "are-seed-oils-uniquely-toxic-or-inflammatory",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
			"No. The evidence does not support treating common seed oils as a uniquely toxic or inflammatory food category. The better-supported concern is overall diet quality, especially ultra-processed foods, excess calories, and what fats or carbohydrates are replacing what.",
		stableCore: [
			"Linoleic acid is an essential omega-6 fatty acid, and vegetable oils and nuts are common sources.",
			"Cochrane's omega-6 review found no conclusive evidence that increasing omega-6 fats reduces or increases overall cardiovascular events, while it did find high-quality evidence for a small long-term reduction in total cholesterol.",
			"Human trial reviews do not support the common claim that dietary linoleic acid reliably increases inflammatory markers in healthy people."
		],
		openQuestions: [
			"How much do repeated high-heat frying, food processing, and calorie-dense dietary patterns change risk compared with the oil category itself?",
			"Which specific oils, doses, and food matrices matter most for people with metabolic disease?"
		],
		whatWouldChangeMinds: [
			"Large, consistent human outcome evidence showing seed oils as a class independently cause major harm after accounting for food processing, calories, and replacement nutrients.",
			"Randomized trials showing clinically meaningful inflammatory harm from realistic linoleic-acid intake in otherwise comparable diets."
		],
		misconceptions: [
			"Seed oils are often blamed for the health effects of the ultra-processed foods that contain them.",
			"Mechanistic concern about oxidation or omega-6 pathways is often presented as if it already proves real-world disease harm."
		],
		editorSummary:
			"This page should be careful rather than dismissive: seed-oil panic is overconfident, but the most honest answer still separates oils, processing, dose, and replacement foods.",
		searchCutoffAt: "2026-07-02T21:33:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:33:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:33:00.000Z",
				kind: "publication",
				summary:
					"Initial seed-oil and omega-6 claim page published from Cochrane, AHA, and human inflammation-review sources."
			}
		],
		sources: [
			{
				kind: "systematic_review",
				title: "Omega-6 fats for the primary and secondary prevention of cardiovascular disease",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2018,
				url:
					"https://www.cochrane.org/evidence/CD011094_omega-6-fats-prevent-and-treat-heart-and-circulatory-diseases",
				doi: "10.1002/14651858.CD011094.pub4",
				stance: "supports",
				note:
					"Most extensive systematic assessment cited here: 19 randomized trials with 6,461 adults; found little or no difference for deaths or CVD events and high-quality evidence for a small total-cholesterol reduction.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Effect of Dietary Linoleic Acid on Markers of Inflammation in Healthy Persons",
				publisher: "Journal of the Academy of Nutrition and Dietetics",
				year: 2012,
				url: "https://doi.org/10.1016/j.jand.2012.03.029",
				doi: "10.1016/j.jand.2012.03.029",
				pmid: "22889633",
				stance: "supports",
				note:
					"Human intervention-review source used to test the common claim that linoleic acid intake increases inflammatory markers.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Omega-6 Fatty Acids and Risk for Cardiovascular Disease",
				publisher: "Circulation",
				year: 2009,
				url: "https://doi.org/10.1161/CIRCULATIONAHA.108.191627",
				doi: "10.1161/CIRCULATIONAHA.108.191627",
				pmid: "19171857",
				stance: "context",
				note:
					"AHA advisory context for why mainstream cardiovascular guidance has not adopted blanket omega-6 or seed-oil avoidance.",
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
				title: "Vitamin, Mineral, and Multivitamin Supplementation to Prevent Cardiovascular Disease and Cancer: US Preventive Services Task Force Recommendation Statement",
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
		topicSlug: "nutrition-and-diet",
		title: "Are dietary supplements FDA-approved like drugs?",
		slug: "are-dietary-supplements-fda-approved-like-drugs",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. In the United States, dietary supplements are regulated, but they are not FDA-approved for safety and effectiveness before marketing in the way prescription or over-the-counter drugs are.",
		stableCore: [
			"FDA oversight exists, but the baseline legal framework is different from drug approval.",
			"Most supplement firms do not have to prove safety and effectiveness to FDA before a product reaches consumers.",
			"Manufacturers are responsible for safe products and truthful, non-misleading claims; FDA mainly enforces after products are marketed, with extra notification rules for new dietary ingredients."
		],
		openQuestions: [
			"How well does postmarket enforcement catch unsafe or mislabeled supplements in practice?",
			"Which product categories would benefit most from stronger premarket review or third-party testing?"
		],
		whatWouldChangeMinds: [
			"A statutory change requiring routine FDA premarket approval of dietary supplements for safety and effectiveness.",
			"Evidence that a specific product is actually an FDA-approved drug rather than a dietary supplement."
		],
		misconceptions: [
			"FDA oversight is often mistaken for FDA premarket approval.",
			"The required structure/function disclaimer can be misread as a technicality rather than a warning that disease claims are not approved."
		],
		editorSummary:
			"This is a regulatory consensus page: useful because many health claims borrow the credibility of FDA approval even when the legal category is dietary supplement, not drug.",
		searchCutoffAt: "2026-07-02T21:30:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:30:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:30:00.000Z",
				kind: "publication",
				summary:
					"Initial supplement-regulation claim page published from FDA and NIH consumer-regulatory sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Questions and Answers on Dietary Supplements",
				publisher: "U.S. Food and Drug Administration",
				year: 2024,
				url:
					"https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements",
				stance: "supports",
				note:
					"FDA explains that it does not have authority to approve dietary supplements before marketing and that firms generally do not submit substantiation before or after marketing.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Information for Consumers on Using Dietary Supplements",
				publisher: "U.S. Food and Drug Administration",
				url: "https://www.fda.gov/food/dietary-supplements/information-consumers-using-dietary-supplements",
				stance: "supports",
				note:
					"Consumer-facing FDA source stating that DSHEA does not authorize FDA to approve supplements for safety and effectiveness before marketing.",
				order: 2
			},
			{
				kind: "context",
				title: "Dietary Supplements: What You Need to Know",
				publisher: "NIH Office of Dietary Supplements",
				url: "https://ods.od.nih.gov/factsheets/WYNTK-Consumer/",
				stance: "context",
				note:
					"Helps readers distinguish supplements from medicines and understand the disclaimer used for structure/function claims.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Can dietary supplements legally claim to treat or cure diseases?",
		slug: "can-dietary-supplements-legally-claim-to-treat-or-cure-diseases",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. In the United States, a product marketed as a dietary supplement cannot legally claim to treat, prevent, or cure a specific disease unless it is regulated as a drug or fits a separate authorized claim pathway.",
		stableCore: [
			"Disease treatment, prevention, and cure claims are drug claims, not ordinary dietary supplement claims.",
			"Structure/function claims can describe normal body structure or function, but they require substantiation, the standard FDA disclaimer, and no disease claim.",
			"Firms making covered structure/function, general well-being, or classical nutrient-deficiency claims must notify FDA no later than 30 days after first marketing the supplement with the claim."
		],
		openQuestions: [
			"How often do consumers understand the difference between structure/function language and disease-treatment claims?",
			"How consistently do FDA and FTC enforcement actions deter implied disease claims in supplement marketing?"
		],
		whatWouldChangeMinds: [
			"A statutory change allowing ordinary dietary supplements to make disease-treatment or cure claims without being regulated as drugs.",
			"An FDA rule or court decision materially changing how disease claims on supplement labels are classified."
		],
		misconceptions: [
			"Some marketing implies that a disclaimer makes disease-treatment language legal; it does not.",
			"People often treat 'supports immune health' and 'treats viral infection' as similar claims, but they live in different regulatory categories."
		],
		editorSummary:
			"This page clarifies a common supplement-marketing confusion: supplements are regulated products, but disease-treatment claims move a product into drug-claim territory.",
		searchCutoffAt: "2026-07-02T22:15:00.000Z",
		lastRetractionCheckAt: "2026-07-02T22:15:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:15:00.000Z",
				kind: "publication",
				summary:
					"Initial supplement disease-claim page published from FDA consumer, industry-notification, and CFR regulatory sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Questions and Answers on Dietary Supplements",
				publisher: "U.S. Food and Drug Administration",
				year: 2024,
				url:
					"https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements",
				stance: "supports",
				note:
					"FDA states that a supplement represented for treatment, prevention, or cure of a specific disease meets the definition of a drug and is regulated as a drug.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Notifications for Structure/Function and Related Claims in Dietary Supplement Labeling",
				publisher: "U.S. Food and Drug Administration",
				url:
					"https://www.fda.gov/food/information-industry-dietary-supplements/notifications-structurefunction-and-related-claims-dietary-supplement-labeling",
				stance: "supports",
				note:
					"Explains the 30-day notification rule, required disclaimer, substantiation requirement, and bar on specific disease claims for section 403(r)(6) claims.",
				order: 2
			},
			{
				kind: "context",
				title: "21 CFR 101.93 - Certain types of statements for dietary supplements",
				publisher: "Electronic Code of Federal Regulations",
				url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/subpart-F/section-101.93",
				stance: "supports",
				note:
					"Regulatory text used to anchor the distinction between allowed supplement statements and disease claims that trigger drug regulation.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Do vitamin E or beta-carotene supplements prevent heart disease or cancer?",
		slug: "do-vitamin-e-or-beta-carotene-supplements-prevent-heart-disease-or-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"No for routine primary prevention in community-dwelling, nonpregnant adults. The USPSTF recommends against beta-carotene or vitamin E supplements for preventing cardiovascular disease or cancer; vitamin E shows no net benefit, and beta-carotene can increase harm in people at high lung-cancer risk.",
		stableCore: [
			"The 2022 USPSTF evidence review included 84 studies and 739,803 participants.",
			"Vitamin E was not significantly associated with lower all-cause mortality, cardiovascular events, or cancer incidence in pooled randomized-trial evidence.",
			"Beta-carotene was associated with higher lung cancer risk and cardiovascular mortality in relevant high-risk groups, especially people who smoke or had asbestos exposure."
		],
		openQuestions: [
			"Whether baseline nutrient status, food insecurity, or other subgroup factors change the benefit-harm balance for some nutrients.",
			"How to communicate the difference between eating antioxidant-rich foods and taking high-dose isolated supplements."
		],
		whatWouldChangeMinds: [
			"Large, well-conducted randomized trials showing a durable net benefit for vitamin E or beta-carotene supplementation in the general prevention population.",
			"A future USPSTF or comparable guideline update reversing the current no-benefit or harm assessment."
		],
		misconceptions: [
			"Antioxidant biology is often treated as proof that antioxidant pills prevent disease, but trial outcomes are the stronger test.",
			"Evidence against routine prevention is not the same as saying deficiency treatment or pregnancy-specific supplementation never matters."
		],
		editorSummary:
			"This page captures a clean supplement-prevention claim with useful numbers: a large evidence review, no vitamin E prevention benefit, and beta-carotene harm signals in high-risk groups.",
		searchCutoffAt: "2026-07-02T21:30:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:30:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:30:00.000Z",
				kind: "publication",
				summary:
					"Initial vitamin E and beta-carotene prevention claim page published from USPSTF recommendation and systematic-review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title:
					"Vitamin, Mineral, and Multivitamin Supplementation to Prevent Cardiovascular Disease and Cancer: Preventive Medication",
				publisher: "U.S. Preventive Services Task Force",
				year: 2022,
				url:
					"https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/vitamin-supplementation-to-prevent-cvd-and-cancer-preventive-medication",
				stance: "supports",
				note:
					"Primary guideline anchor: recommends against beta-carotene or vitamin E supplements for cardiovascular disease or cancer prevention in the covered adult population.",
				order: 1
			},
			{
				kind: "systematic_review",
				title:
					"Vitamin and Mineral Supplements for the Primary Prevention of Cardiovascular Disease and Cancer: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2022,
				url: "https://doi.org/10.1001/jama.2021.15650",
				doi: "10.1001/jama.2021.15650",
				stance: "supports",
				note:
					"Decision-weight source with 84 studies and 739,803 participants; found no significant vitamin E benefit and beta-carotene harm signals.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"Dietary Supplements and Risk of Cause-Specific Death, Cardiovascular Disease, and Cancer: A Systematic Review and Meta-Analysis of Primary Prevention Trials",
				publisher: "Advances in Nutrition",
				year: 2017,
				url: "https://doi.org/10.3945/an.116.013516",
				doi: "10.3945/an.116.013516",
				stance: "context",
				note:
					"Older broad supplement meta-analysis used as context for why isolated nutrient pills should not be equated with food-pattern evidence.",
				order: 3
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
		topicSlug: "genetics-and-biotechnology",
		title: "Are GMOs unregulated in the United States?",
		slug: "are-gmos-unregulated-in-the-united-states",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. U.S. GMO and biotechnology products are regulated through a coordinated federal framework involving FDA, EPA, and USDA, although the system is product- and risk-based rather than one single blanket 'GMO approval' law.",
		stableCore: [
			"FDA, EPA, and USDA share biotechnology oversight under the Coordinated Framework for the Regulation of Biotechnology.",
			"FDA regulates most human and animal food, EPA regulates pesticides and plant-incorporated protectants, and USDA APHIS regulates certain genetically engineered organisms that may pose plant-health risks.",
			"The U.S. system uses existing statutes and product-specific risk questions, so some products may need one agency review while others may need multiple reviews or fall outside a particular agency's authority."
		],
		openQuestions: [
			"How should regulators improve public transparency for product-by-product biotechnology decisions?",
			"How should new gene-editing applications be routed when product features do not fit older public expectations about GMOs?"
		],
		whatWouldChangeMinds: [
			"Evidence that FDA, EPA, and USDA lack enforceable statutory authority over the relevant GMO product categories.",
			"A federal policy change removing product-based biotechnology oversight rather than revising how it is coordinated."
		],
		misconceptions: [
			"Because the United States does not use one single GMO approval statute, people sometimes infer that GMOs are unregulated.",
			"Food-safety review, pesticide regulation, plant-pest risk, labeling, and environmental release are different questions handled through different legal authorities."
		],
		editorSummary:
			"This page helps separate a real governance debate from the inaccurate shortcut that GMOs are simply unregulated in the United States.",
		searchCutoffAt: "2026-07-02T22:15:00.000Z",
		lastRetractionCheckAt: "2026-07-02T22:15:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:15:00.000Z",
				kind: "publication",
				summary:
					"Initial GMO regulation claim page published from FDA, USDA APHIS, and Coordinated Framework regulatory sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "How GMOs Are Regulated in the United States",
				publisher: "U.S. Food and Drug Administration",
				url: "https://www.fda.gov/food/agricultural-biotechnology/how-gmos-are-regulated-united-states",
				stance: "supports",
				note:
					"FDA explains that FDA, EPA, and USDA work together to regulate most GMOs and monitor food, health, plant, animal, and environmental safety questions.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Biotechnology Regulations",
				publisher: "USDA Animal and Plant Health Inspection Service",
				year: 2025,
				url: "https://www.aphis.usda.gov/biotechnology/regulations",
				stance: "supports",
				note:
					"APHIS describes the Coordinated Framework roles and 7 CFR part 340 oversight for importation, interstate movement, and environmental release of relevant modified plants and plant pests.",
				order: 2
			},
			{
				kind: "context",
				title: "The Coordinated Framework for the Regulation of Biotechnology",
				publisher: "U.S. Department of Agriculture, Environmental Protection Agency, and Food and Drug Administration",
				year: 2023,
				url:
					"https://usbiotechnologyregulation.mrp.usda.gov/sites/default/files/coordinated-framework-plain-language.pdf",
				stance: "supports",
				note:
					"Plain-language federal overview explaining that U.S. biotechnology regulation is science-based, product-based, and shared across existing agency authorities.",
				order: 3
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Are people left-brained or right-brained personality types?",
		slug: "are-people-left-brained-or-right-brained-personality-types",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 92,
		bottomLine:
			"No. Brain lateralization is real, but the popular idea that people are globally 'left-brained' logical types or 'right-brained' creative types is not supported by neuroimaging evidence.",
		stableCore: [
			"Some functions are lateralized, especially language and aspects of attention or visuospatial processing.",
			"That does not imply people sort into whole-brain personality categories based on one dominant hemisphere.",
			"A large resting-state fMRI analysis of 1,011 people found local lateralized networks, but not a whole-brain left-brained or right-brained network-strength phenotype across individuals."
		],
		openQuestions: [
			"How do specific lateralized networks relate to individual differences without collapsing them into a two-type personality label?",
			"Which public explanations best preserve the real science of lateralization while discouraging classroom or workplace neuromyths?"
		],
		whatWouldChangeMinds: [
			"Large, reproducible neuroimaging evidence showing stable whole-brain left/right dominance that predicts the popular logical-versus-creative personality categories.",
			"A validated model demonstrating that the two-category left-brain/right-brain personality scheme explains cognition better than modern network-based neuroscience."
		],
		misconceptions: [
			"Real hemispheric specialization is often stretched into a much stronger personality-typing claim.",
			"People often treat classroom learning preferences or career stereotypes as if they were direct brain-imaging evidence."
		],
		editorSummary:
			"This page is a useful companion to the learning-styles and 10-percent-brain pages because it shows how a real neuroscience fact can become an overconfident pop-psychology label.",
		searchCutoffAt: "2026-07-02T22:15:00.000Z",
		lastRetractionCheckAt: "2026-07-02T22:15:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:15:00.000Z",
				kind: "publication",
				summary:
					"Initial left-brain/right-brain personality claim page published from neuroimaging and neuromyth evidence."
			}
		],
		sources: [
			{
				kind: "landmark_study",
				title:
					"An Evaluation of the Left-Brain vs. Right-Brain Hypothesis with Resting State Functional Connectivity Magnetic Resonance Imaging",
				publisher: "PLOS ONE",
				year: 2013,
				url: "https://doi.org/10.1371/journal.pone.0071275",
				doi: "10.1371/journal.pone.0071275",
				pmid: "23967180",
				pmcid: "PMC3743825",
				stance: "supports",
				note:
					"Analyzed resting-state scans from 1,011 people and found local lateralization, not a global left-brained or right-brained phenotype.",
				order: 1
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
				note:
					"Frames left- and right-brain learner beliefs as part of a broader neuromyth problem in education.",
				order: 2
			},
			{
				kind: "context",
				title: "No such thing as 'right-brained' or 'left-brained,' new research finds",
				publisher: "American Psychological Association Monitor on Psychology",
				year: 2013,
				url: "https://www.apa.org/monitor/2013/11/right-brained",
				stance: "context",
				note:
					"Public-facing psychology summary useful for explaining the difference between real lateralized functions and the popular personality myth.",
				order: 3
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
		topicSlug: "media-misinformation",
		title: "Are preprints the same as peer-reviewed studies?",
		slug: "are-preprints-the-same-as-peer-reviewed-studies",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. Preprints can be useful for rapid scientific communication, but they are public drafts that have not yet been certified by peer review and should not be treated as equivalent to peer-reviewed journal articles.",
		stableCore: [
			"Preprints can speed discovery and invite feedback, but the key distinction is that they have not yet passed journal peer review.",
			"Any part of a preprint, including results and conclusions, can change after peer review or author revision.",
			"In medical and public-health topics, preprints need especially clear labeling because premature claims can influence behavior before stronger review is available."
		],
		openQuestions: [
			"Which labels and warnings best help non-specialists interpret preprints without dismissing useful early evidence?",
			"How should evidence systems handle preprints during fast-moving emergencies without laundering them into established facts?"
		],
		whatWouldChangeMinds: [
			"A major change in scholarly publishing where posted preprints routinely receive review equivalent to journal peer review before public release.",
			"Evidence that public audiences reliably distinguish preprints from certified studies without visible labeling or editorial context."
		],
		misconceptions: [
			"People often assume that anything indexed in a scientific database has already passed peer review.",
			"Headlines can treat preliminary manuscripts as settled evidence because the uncertainty label is inconvenient."
		],
		editorSummary:
			"This page strengthens the site's research-literacy layer by giving readers a simple rule for fast-moving claims: preprints may be useful evidence signals, but they are not final evidence.",
		searchCutoffAt: "2026-07-02T21:33:00.000Z",
		lastRetractionCheckAt: "2026-07-02T21:33:00.000Z",
		changeLog: [
			{
				date: "2026-07-02T21:33:00.000Z",
				kind: "publication",
				summary:
					"Initial preprint-versus-peer-review claim page published from NLM/NIH preprint guidance and preprint citation-reliability evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "NIH Preprint Pilot",
				publisher: "PubMed Central / National Library of Medicine",
				url: "https://pmc.ncbi.nlm.nih.gov/about/nihpreprints/",
				stance: "supports",
				note:
					"Defines preprints as complete public drafts not yet certified by peer review and warns that results and conclusions may change.",
				order: 1
			},
			{
				kind: "landmark_study",
				title:
					"Reliability of citations of medRxiv preprints in articles published on COVID-19 in the world leading medical journals",
				publisher: "PLOS ONE",
				year: 2022,
				url: "https://doi.org/10.1371/journal.pone.0264661",
				doi: "10.1371/journal.pone.0264661",
				pmid: "35947559",
				pmcid: "PMC9368286",
				stance: "supports",
				note:
					"Empirical cautionary source: in 2020 articles from four major medical journals, 29.3% cited at least one medRxiv preprint and many cited preprints later differed from published versions.",
				order: 2
			},
			{
				kind: "context",
				title: "Preprints and PubMed Central",
				publisher: "National Library of Medicine",
				year: 2020,
				url: "https://www.nlm.nih.gov/oet/ed/pmc/index.html",
				stance: "context",
				note:
					"NLM educational context describing preprints as scholarly manuscripts posted to open platforms, usually before peer review.",
				order: 3
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
