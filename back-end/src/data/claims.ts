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
		title: "Can measles infection weaken immune memory after recovery?",
		slug: "can-measles-infection-weaken-immune-memory-after-recovery",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 90,
		bottomLine:
			"Yes. Measles infection can suppress immune memory after the rash resolves, leaving people more vulnerable to other infections for a period afterward. The MMR vaccine prevents measles and does not produce the same immune-memory loss seen after natural infection.",
		stableCore: [
			"WHO says measles itself weakens the immune system and can make the body forget how to protect itself against infections.",
			"A Science study of 77 unvaccinated children found that natural measles infection eliminated 11% to 73% of their pre-existing antibody repertoire two months after infection; this was not seen after MMR vaccination.",
			"A Science Immunology study found persistent disruption of naive and memory B-cell diversity after measles, offering a mechanism for prolonged susceptibility to other infections."
		],
		openQuestions: [
			"How long and how strongly immune-memory loss persists across age, nutrition status, prior immunity, and health-care settings.",
			"Which later infections or vaccine responses are most affected in contemporary outbreak settings.",
			"How to explain immune amnesia without implying that the measles vaccine weakens immune memory."
		],
		whatWouldChangeMinds: [
			"Large longitudinal cohorts showing no sustained antibody or B-cell memory loss after confirmed measles infection.",
			"Clinical follow-up showing that measured immune-memory changes after measles do not translate into higher vulnerability to other infections.",
			"A stronger mechanism demonstrating that the observed antibody-repertoire loss is an artifact or is rapidly and fully restored without re-exposure."
		],
		misconceptions: [
			"'Natural infection strengthens immunity' is too simple here: measles can create strong measles immunity while erasing parts of prior immune memory.",
			"Immune amnesia is a consequence of measles infection, not of MMR vaccination.",
			"Calling measles 'just a rash' misses pneumonia, encephalitis, death risk, and the post-infection immune-memory problem."
		],
		editorSummary:
			"This page should help readers understand why measles prevention matters beyond avoiding the acute illness. Keep the wording clear: immune amnesia is a real post-measles concern, while the exact duration and clinical size vary by setting.",
		uncertaintySummary:
			"The direction is well supported: measles can damage immune memory after infection. The remaining uncertainty is about duration, magnitude, subgroup risk, and which downstream infections are most affected in different populations.",
		searchCutoffAt: "2026-07-03T16:45:00.000Z",
		lastRetractionCheckAt: "2026-07-03T16:45:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T16:45:00.000Z",
				kind: "publication",
				summary:
					"Initial measles immune-memory claim page published from WHO measles guidance, CDC measles guidance, and peer-reviewed immune-amnesia studies identified through Consensus."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Measles",
				publisher: "World Health Organization",
				year: 2025,
				url: "https://www.who.int/news-room/fact-sheets/detail/measles",
				stance: "supports",
				note:
					"Current WHO fact sheet stating that measles weakens the immune system and can make the body forget how to protect itself against infections.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Measles virus infection diminishes preexisting antibodies that offer protection from other pathogens",
				publisher: "Science",
				year: 2019,
				url: "https://doi.org/10.1126/science.aay6485",
				doi: "10.1126/science.aay6485",
				pmid: "31672891",
				stance: "supports",
				note:
					"Consensus-identified study measuring loss of 11% to 73% of the pre-existing antibody repertoire in 77 unvaccinated children after natural measles infection, with no similar loss after MMR vaccination.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Incomplete genetic reconstitution of B cell pools contributes to prolonged immunosuppression after measles",
				publisher: "Science Immunology",
				year: 2019,
				url: "https://doi.org/10.1126/sciimmunol.aay6125",
				doi: "10.1126/sciimmunol.aay6125",
				stance: "supports",
				note:
					"Consensus-identified B-cell receptor sequencing study linking post-measles immune suppression to incomplete naive B-cell reconstitution and depleted memory B-cell clones.",
				order: 3
			},
			{
				kind: "guideline",
				title: "About Measles",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/measles/about/index.html",
				stance: "context",
				note:
					"Current CDC public-health context for measles contagiousness, serious complications, and the approximately 97% protection expected after two MMR doses.",
				order: 4
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
		title: "Does the HPV vaccine cause fertility problems?",
		slug: "does-the-hpv-vaccine-cause-fertility-problems",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"No. Major vaccine-safety reviews and large observational studies do not support claims that HPV vaccination causes infertility or premature ovarian insufficiency. The better-supported fertility concern runs in the opposite direction: HPV-related cervical cancer and some treatments for cervical precancer or cancer can threaten future fertility.",
		stableCore: [
			"CDC says HPV vaccine does not cause fertility problems and notes that cervical cancer treatment can sometimes limit the ability to have children.",
			"WHO's Global Advisory Committee on Vaccine Safety concluded that available data do not support an association between HPV vaccination and infertility or premature ovarian insufficiency.",
			"Cochrane's broad 2025 HPV-vaccination evidence review found moderate-certainty evidence that HPV vaccination likely does not increase infertility risk.",
			"A Danish nationwide cohort of 996,300 girls and women found no association between quadrivalent HPV vaccination and primary ovarian insufficiency diagnoses."
		],
		openQuestions: [
			"How can clinicians communicate rare-event surveillance limits without implying that unsupported fertility fears are equally plausible?",
			"How much can HPV vaccination indirectly protect fertility by preventing cervical precancer, cervical cancer, and fertility-threatening treatment?",
			"How should safety monitoring continue as vaccine schedules, vaccine valency, and vaccinated cohorts age?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled cohort or registry studies showing a reproducible increase in infertility or premature ovarian insufficiency after HPV vaccination.",
			"A major CDC, WHO, Cochrane, or national vaccine-safety reassessment finding a causal fertility signal after accounting for surveillance bias and background rates.",
			"Strong mechanistic evidence plus human epidemiology showing that HPV vaccine components impair ovarian function or conception."
		],
		misconceptions: [
			"Case reports and VAERS-style passive reports can generate safety signals, but they cannot by themselves prove that a vaccine caused infertility.",
			"Lower pregnancy rates in vaccinated cohorts can reflect age, sexual activity, health-care access, or social differences rather than biological infertility.",
			"Fertility fears often ignore that HPV-related disease and its treatment can be a real fertility risk."
		],
		editorSummary:
			"This page should be a direct myth-correction companion to the HPV cancer-prevention page. The safest wording is not 'impossible,' but 'the evidence does not support a causal link and major safety bodies continue to monitor it.'",
		uncertaintySummary:
			"The practical answer is high-confidence: major safety bodies and large studies do not find a fertility harm signal. Remaining uncertainty is mostly rare-event surveillance and communication, not a balanced dispute over causation.",
		searchCutoffAt: "2026-07-02T22:42:05.000Z",
		lastRetractionCheckAt: "2026-07-02T22:42:05.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:42:05.000Z",
				kind: "publication",
				summary:
					"Initial HPV vaccine fertility claim page published from CDC, WHO GACVS, Cochrane, and Danish nationwide cohort evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Impact of the HPV Vaccine",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/hpv/vaccination-impact/index.html",
				stance: "supports",
				note:
					"CDC public-facing anchor stating that HPV vaccine does not cause fertility problems and that cervical cancer or precancer treatment can sometimes affect fertility or pregnancy.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Human papillomavirus vaccines and infertility",
				publisher: "WHO Global Advisory Committee on Vaccine Safety",
				year: 2019,
				url:
					"https://www.who.int/groups/global-advisory-committee-on-vaccine-safety/topics/human-papillomavirus-vaccines/infertility",
				stance: "supports",
				note:
					"WHO GACVS assessment concluding that available data do not support an association between HPV vaccination and infertility or premature ovarian insufficiency.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "What are the benefits and risks of different human papillomavirus (HPV) vaccines for preventing cervical cancer?",
				publisher: "Cochrane",
				year: 2025,
				url:
					"https://www.cochrane.org/evidence/CD015363_what-are-benefits-and-risks-different-human-papillomavirus-hpv-vaccines-preventing-cervical-cancer",
				doi: "10.1002/14651858.CD015363.pub2",
				stance: "supports",
				note:
					"Large population-level review source reporting moderate-certainty evidence that HPV vaccination likely does not increase infertility risk.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Association Between Human Papillomavirus Vaccination and Primary Ovarian Insufficiency in a Nationwide Cohort",
				publisher: "JAMA Network Open",
				year: 2021,
				url: "https://doi.org/10.1001/jamanetworkopen.2021.20391",
				doi: "10.1001/jamanetworkopen.2021.20391",
				pmid: "34431985",
				stance: "supports",
				note:
					"Danish registry cohort of 996,300 girls and women finding no association between quadrivalent HPV vaccination and primary ovarian insufficiency.",
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
		title: "Can VAERS reports prove that a vaccine caused an adverse event?",
		slug: "can-vaers-reports-prove-that-a-vaccine-caused-an-adverse-event",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"No. VAERS is an early warning and signal-detection system, not a stand-alone proof-of-causation database. A report shows that a health event happened after vaccination and may deserve review; it does not by itself show that the vaccine caused the event, how often the event occurs, or how risk compares with an unvaccinated group.",
		stableCore: [
			"CDC and FDA co-manage VAERS as a passive reporting system that accepts reports even when the reporter is not sure the vaccine caused the event.",
			"VAERS can help detect unusual patterns, rare events, reporting clusters, administration errors, and signals that deserve follow-up.",
			"VAERS reports can be incomplete, inaccurate, duplicate, stimulated by media attention, or coincidental because many health events occur after vaccination by timing alone.",
			"Counts from VAERS alone cannot establish causation, incidence rates, or relative risks; safety signals usually require clinical review and stronger active-surveillance or epidemiologic studies."
		],
		openQuestions: [
			"Which signal-detection methods best balance early warning, false positives, and rare-event sensitivity for newer vaccines?",
			"How can public VAERS access stay transparent while reducing denominator-free misuse in viral claims?",
			"When should a VAERS signal trigger active surveillance, medical-record review, label changes, or formal causal evaluation?"
		],
		whatWouldChangeMinds: [
			"A redesigned passive-reporting system with verified exposure denominators, systematic outcome capture, complete follow-up, and valid unvaccinated comparators.",
			"Major CDC, FDA, or pharmacovigilance guidance concluding that raw passive reports can directly determine causation and event rates without further study.",
			"Repeated evidence that VAERS-only causal claims perform as well as controlled active-surveillance studies across known vaccine-safety questions."
		],
		misconceptions: [
			"Reporting to VAERS is encouraged even when causation is uncertain, so the existence of a report is not a verdict.",
			"A large number of reports can reflect high vaccine use, publicity, reporting requirements, duplicate follow-up records, or background illness, not necessarily a high vaccine-caused event rate.",
			"Saying VAERS cannot prove causation is not dismissing VAERS; it is explaining why signals need investigation."
		],
		editorSummary:
			"This page should become the reusable safety-surveillance explainer for vaccine pages. Keep the balance clear: VAERS is important because it can flag signals, but raw reports are not causal proof.",
		uncertaintySummary:
			"The core interpretation principle is settled: passive reports can generate signals but cannot by themselves prove causation or incidence. Uncertainty is about specific signals, how quickly they should escalate, and which follow-up system is best suited to each safety question.",
		searchCutoffAt: "2026-07-03T20:33:03.000Z",
		lastRetractionCheckAt: "2026-07-03T20:33:03.000Z",
		changeLog: [
			{
				date: "2026-07-03T20:33:03.000Z",
				kind: "publication",
				summary:
					"Initial VAERS interpretation claim page published from CDC/FDA guidance, HHS VAERS data guidance, and peer-reviewed VAERS surveillance methodology sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "About the Vaccine Adverse Event Reporting System (VAERS)",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/vaccine-safety-systems/vaers/index.html",
				stance: "supports",
				note:
					"Current CDC anchor explaining that VAERS is one of several vaccine-safety systems, accepts reports regardless of causal certainty, and cannot alone determine causation or rates.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Vaccine Adverse Event Reporting System (VAERS) Questions and Answers",
				publisher: "U.S. Food and Drug Administration",
				url:
					"https://www.fda.gov/vaccines-blood-biologics/vaccine-adverse-events/vaccine-adverse-event-reporting-system-vaers-questions-and-answers",
				stance: "supports",
				note:
					"FDA public guidance explaining that VAERS reports generally cannot determine whether a vaccine caused an adverse event and that signals can be followed up in systems such as VSD or CISA.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Guide to Interpreting VAERS Data",
				publisher: "U.S. Department of Health and Human Services",
				url: "https://vaers.hhs.gov/data/dataguide.html",
				stance: "supports",
				note:
					"Official VAERS data guide explaining passive-report limitations, underreporting, variable report quality, and why a report is not documentation that a vaccine caused the event.",
				order: 3
			},
			{
				kind: "context",
				title: "Safety monitoring in the Vaccine Adverse Event Reporting System (VAERS)",
				publisher: "Vaccine",
				year: 2015,
				url: "https://pubmed.ncbi.nlm.nih.gov/26209838/",
				pmid: "26209838",
				stance: "supports",
				note:
					"Consensus-identified CDC/FDA review describing VAERS as a safety-signal detection and hypothesis-generating system that cannot generally determine causation by itself.",
				order: 4
			},
			{
				kind: "context",
				title: "Understanding vaccine safety information from the Vaccine Adverse Event Reporting System",
				publisher: "The Pediatric Infectious Disease Journal",
				year: 2004,
				url: "https://pubmed.ncbi.nlm.nih.gov/15071280/",
				pmid: "15071280",
				stance: "supports",
				note:
					"Foundational VAERS methods article explaining passive-surveillance biases, inability to calculate incidence or relative risk from VAERS alone, and the need to confirm signals in controlled studies.",
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
		title: "Are nicotine e-cigarettes less harmful than smoking, and do they help people quit?",
		slug: "are-nicotine-e-cigarettes-less-harmful-than-smoking-and-do-they-help-people-quit",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		bottomLine:
			"Usually yes for adults who smoke, but only with careful boundaries. Completely switching from combustible cigarettes to regulated nicotine e-cigarettes likely reduces exposure to many toxicants, and Cochrane finds nicotine e-cigarettes can help more adults stop smoking than nicotine replacement therapy. They are not safe, not appropriate for youth or non-smokers, and dual use does not provide the full harm-reduction benefit.",
		stableCore: [
			"Combustible cigarettes remain far more hazardous because smoke contains thousands of chemicals and many established carcinogens and toxicants.",
			"National Academies concluded that e-cigarette aerosol generally contains fewer numbers and lower levels of most toxicants than combustible cigarette smoke, while still containing nicotine and potentially toxic substances.",
			"Cochrane's living review reports that nicotine e-cigarettes help more adults stop smoking for at least six months than nicotine replacement therapy, with roughly 8 to 11 quitters per 100 users versus about 6 per 100 for NRT.",
			"CDC and FDA both emphasize the same condition: any potential benefit is for non-pregnant adults who smoke and switch completely away from smoked tobacco products."
		],
		openQuestions: [
			"What are the long-term health outcomes of exclusive e-cigarette use over decades, especially for newer high-nicotine and disposable products?",
			"How should policy preserve adult smoking-cessation value while minimizing youth initiation, flavored-product appeal, and black-market or unauthorized product risks?",
			"How often do adults who try e-cigarettes actually switch completely rather than continuing long-term dual use?"
		],
		whatWouldChangeMinds: [
			"Long-term epidemiology showing that exclusive regulated e-cigarette use has morbidity and mortality comparable to combustible cigarette smoking.",
			"Large, high-quality randomized or pragmatic evidence showing nicotine e-cigarettes do not improve sustained smoking cessation compared with established therapies.",
			"Population-level evidence showing adult switching benefits are consistently outweighed by youth initiation and later combustible-tobacco uptake under real-world regulation."
		],
		misconceptions: [
			"'Less harmful than smoking' is often misstated as 'safe,' which is not what the evidence says.",
			"Dual use is sometimes treated as harm reduction even though the main potential benefit depends on complete switching away from smoked tobacco.",
			"Evidence that e-cigarettes can help adult smokers quit does not imply that non-smokers, youth, or pregnant people should start vaping."
		],
		editorSummary:
			"This page should model a two-truths-at-once answer: nicotine e-cigarettes can be harm-reducing and useful for some adult smokers, while still being addictive, non-safe products that require strong youth protections and complete-switching caveats.",
		uncertaintySummary:
			"The relative toxicant and adult cessation direction is fairly consistent, but long-term exclusive-use outcomes, real-world dual-use patterns, product variation, and youth initiation make the public-health answer qualified rather than simple.",
		searchCutoffAt: "2026-07-02T22:33:57.000Z",
		lastRetractionCheckAt: "2026-07-02T22:33:57.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:33:57.000Z",
				kind: "publication",
				summary:
					"Initial adult e-cigarette harm-reduction and cessation claim page published from Cochrane, National Academies, CDC, and FDA sources."
			}
		],
		sources: [
			{
				kind: "systematic_review",
				title: "Can electronic cigarettes help people stop smoking, and do they have any unwanted effects when used for this purpose?",
				publisher: "Cochrane",
				year: 2025,
				url:
					"https://www.cochrane.org/evidence/CD010216_can-electronic-cigarettes-help-people-stop-smoking-and-do-they-have-any-unwanted-effects-when-used",
				doi: "10.1002/14651858.CD010216.pub9",
				stance: "supports",
				note:
					"Decision-weight smoking-cessation source reporting high-certainty evidence that nicotine e-cigarettes increase quit rates compared with nicotine replacement therapy.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Public Health Consequences of E-Cigarettes: Summary",
				publisher: "National Academies / NCBI Bookshelf",
				year: 2018,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK507163/",
				doi: "10.17226/24952",
				stance: "supports",
				note:
					"Assessment anchor for lower toxicant exposure than combustible cigarettes, dependence risk, product variability, and the public-health balance between adult cessation and youth initiation.",
				order: 2
			},
			{
				kind: "guideline",
				title: "E-Cigarette Use Among Adults",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/tobacco/e-cigarettes/adults.html",
				stance: "context",
				note:
					"Public-health context stating that no e-cigarette is FDA-approved to help people quit smoking and that potential benefit depends on complete substitution by non-pregnant adults who smoke.",
				order: 3
			},
			{
				kind: "guideline",
				title: "E-Cigarettes, Vapes, and other Electronic Nicotine Delivery Systems",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url:
					"https://www.fda.gov/tobacco-products/products-ingredients-components/e-cigarettes-vapes-and-other-electronic-nicotine-delivery-systems-ends",
				stance: "context",
				note:
					"Current regulatory context: FDA says switching completely may reduce exposure for adults who smoke, but e-cigarettes are not risk-free and youth or adults who do not use tobacco should not start.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Are e-cigarettes safe for kids and teens?",
		slug: "are-e-cigarettes-safe-for-kids-and-teens",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"No. U.S. and global public-health authorities agree that e-cigarettes are not safe for children, teens, or young adults. Most contain nicotine, youth users often use flavored and disposable products, and adolescent nicotine exposure can harm brain development, cause dependence, and increase risk of later cigarette smoking.",
		stableCore: [
			"CDC states that no tobacco products, including e-cigarettes, are safe for children, teens, and young adults.",
			"FDA's 2025 National Youth Tobacco Survey analysis found that e-cigarettes remained the most commonly used tobacco product among U.S. middle and high school students, with 5.2% reporting current use.",
			"Among current youth e-cigarette users in 2025, FDA reported daily use by 27.5%, use on at least 20 of the last 30 days by 41.2%, and flavored e-cigarette use by 89.4%.",
			"CDC and WHO warn that nicotine is highly addictive and can harm adolescent brain development; e-cigarette aerosol can also contain harmful chemicals, metals, fine particles, and flavoring chemicals that are safe to eat but not necessarily safe to inhale."
		],
		openQuestions: [
			"How much will youth use shift from e-cigarettes to nicotine pouches or other emerging nicotine products as markets and enforcement change?",
			"Which prevention policies reduce youth initiation without unintentionally increasing combustible cigarette use among adults who smoke?",
			"What are the long-term respiratory, cardiovascular, oral-health, and mental-health outcomes for adolescents who start with modern disposable or high-nicotine products?"
		],
		whatWouldChangeMinds: [
			"Major CDC, FDA, WHO, or Surgeon General reassessments concluding that youth e-cigarette use is safe or carries negligible addiction and developmental risk.",
			"Long-term studies showing no meaningful adolescent nicotine dependence, brain-development, respiratory, or later-smoking risks from youth vaping.",
			"Market surveillance showing youth exposure and use have become negligible across product types and no longer require dedicated prevention guidance."
		],
		misconceptions: [
			"Flavors and sleek devices can make e-cigarettes look harmless even when they deliver addictive nicotine.",
			"Lower toxicant exposure than cigarettes for adult smokers does not make vaping safe for teens who otherwise would not use nicotine.",
			"Some teens believe vaping only water vapor, but e-cigarette aerosol can contain nicotine, ultrafine particles, volatile organic compounds, heavy metals, and other harmful substances."
		],
		editorSummary:
			"This page should be less ambivalent than the adult-smoker page. The consensus boundary is clear: youth and non-smokers should not use e-cigarettes, even though separate adult cessation evidence can be favorable in a complete-switching context.",
		uncertaintySummary:
			"The main youth-safety answer is high-certainty. The moving pieces are product markets, enforcement, flavor/device shifts, and the exact size of long-term harms for newer product generations.",
		searchCutoffAt: "2026-07-02T22:33:57.000Z",
		lastRetractionCheckAt: "2026-07-02T22:33:57.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:33:57.000Z",
				kind: "publication",
				summary:
					"Initial youth e-cigarette safety claim page published from CDC, FDA National Youth Tobacco Survey, WHO, and Surgeon General sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Health Effects of Vaping",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/tobacco/e-cigarettes/health-effects.html",
				stance: "supports",
				note:
					"Primary public-health anchor stating that e-cigarettes are not safe, should not be used by youth, and can expose users to nicotine and harmful aerosol constituents.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Results from the Annual National Youth Tobacco Survey",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url:
					"https://www.fda.gov/tobacco-products/youth-and-tobacco/results-annual-national-youth-tobacco-survey-nyts",
				stance: "supports",
				note:
					"Current surveillance source reporting 2025 youth e-cigarette prevalence, frequent use, daily use, flavored-product use, and disposable-device dominance.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Tobacco: E-cigarettes",
				publisher: "World Health Organization",
				url: "https://www.who.int/news-room/questions-and-answers/item/tobacco-e-cigarettes",
				stance: "supports",
				note:
					"Global public-health context warning that e-cigarettes are harmful and not safe, and that nicotine in children and adolescents has negative impacts on brain development.",
				order: 3
			},
			{
				kind: "consensus_statement",
				title: "E-Cigarette Use Among Youth and Young Adults: A Report of the Surgeon General",
				publisher: "U.S. Surgeon General / NCBI Bookshelf",
				year: 2016,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK538680/",
				pmid: "30869850",
				stance: "supports",
				note:
					"Surgeon General assessment focused on youth and young adults, the precautionary principle, youth marketing, adolescent initiation, and known health risks.",
				order: 4
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
		title: "Is there no safe level of lead exposure for children, including from drinking water?",
		slug: "is-there-no-safe-level-of-lead-exposure-for-children",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. Public-health agencies and toxicology reviews consistently treat childhood lead exposure as something to prevent, not tolerate. Reference values and drinking-water action levels are intervention triggers, not safety thresholds.",
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
			"Because many children with lead exposure have no obvious symptoms, people can underestimate permanent developmental risk.",
			"Lead in drinking water is sometimes treated as safe if a system is below an action level, even though the health goal for lead in water is zero."
		],
		editorSummary:
			"This page should be blunt and practical: the consensus is not that every trace means an emergency, but that prevention and exposure reduction matter because no safe child threshold has been identified, including for lead contributed by plumbing or service lines.",
		searchCutoffAt: "2026-07-03T03:57:42.000Z",
		lastRetractionCheckAt: "2026-07-03T03:57:42.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:57:42.000Z",
				kind: "update",
				summary:
					"Updated the childhood lead claim title and evidence stack to make the drinking-water action-level distinction explicit."
			},
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
			},
			{
				kind: "meta_analysis",
				title: "Low-Level Environmental Lead Exposure and Children's Intellectual Function: An International Pooled Analysis",
				publisher: "Environmental Health Perspectives",
				year: 2005,
				url: "https://doi.org/10.1289/ehp.7688",
				doi: "10.1289/ehp.7688",
				pmid: "16002379",
				stance: "supports",
				note:
					"Pooled analysis of 1,333 children from seven cohorts found an inverse blood-lead and IQ relationship, including deficits below 10 micrograms per deciliter.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "An International Pooled Analysis for Obtaining a Benchmark Dose for Environmental Lead Exposure in Children",
				publisher: "Risk Analysis",
				year: 2013,
				url: "https://doi.org/10.1111/j.1539-6924.2012.01882.x",
				doi: "10.1111/j.1539-6924.2012.01882.x",
				pmid: "22924487",
				stance: "supports",
				note:
					"Benchmark-dose analysis of the pooled child IQ data describes the lack of a clear threshold as a practical reason to keep lowering allowable exposure.",
				order: 6
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
		title: "Do all types of alcoholic drinks increase cancer risk?",
		slug: "do-all-types-of-alcoholic-drinks-increase-cancer-risk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. The main cancer-relevant exposure in beer, wine, hard cider, malt liquor, and spirits is ethanol, which the body can convert to carcinogenic acetaldehyde. Beverage type can affect serving size and drinking pattern, but red wine is not a cancer-risk exception and all drinks containing alcohol raise risk.",
		stableCore: [
			"NCI defines alcohol in alcoholic beverages as ethanol and lists beer, wine, hard cider, malt liquor, and distilled spirits as sources of that exposure.",
			"CDC states that all drinks containing alcohol, including red and white wine, beer, and liquor, increase cancer risk.",
			"NCI's public-awareness summary explicitly warns that all alcoholic beverages, including wine, increase cancer risk because cancer risk rises with ethanol consumed.",
			"Systematic-review evidence comparing beverage types does not show a consistent cancer-risk advantage for moderate wine, beer, or spirits after accounting for alcohol exposure."
		],
		openQuestions: [
			"How should risk messages account for larger-than-standard pours, binge patterns, and mixed drinks whose ethanol content is hard for consumers to estimate?",
			"Do non-ethanol compounds in specific beverages have small outcome-specific effects that matter after ethanol dose, smoking, diet, and socioeconomic confounding are controlled?",
			"Which public messages best correct the red-wine exception myth without implying that every drink carries the same absolute risk for every person?"
		],
		whatWouldChangeMinds: [
			"High-quality prospective evidence showing that one beverage type has materially lower alcohol-related cancer risk than another at equivalent ethanol dose and drinking pattern.",
			"A major NCI, CDC, WHO, IARC, or Surgeon General reassessment concluding that ethanol content is not the dominant beverage-shared cancer-risk exposure.",
			"Replicated mechanistic and epidemiologic evidence that protective compounds in a beverage reliably offset ethanol-related cancer mechanisms in real-world drinkers."
		],
		misconceptions: [
			"Wine, especially red wine, is often treated as if it is biologically separate from other alcoholic drinks for cancer risk.",
			"Some people hear 'beer only' or 'no hard liquor' as a cancer-risk shield, even when the total ethanol dose is similar.",
			"Standard drink examples can be misread as typical serving sizes, even though actual pours often contain more alcohol."
		],
		editorSummary:
			"This page should be the beverage-type answer linked from the broader alcohol-cancer page. The key is not that every beverage is identical in every health respect; it is that ethanol-containing drinks share the cancer-risk exposure.",
		uncertaintySummary:
			"The shared ethanol and cancer-risk conclusion is strong. Uncertainty is mostly about beverage-specific confounding, actual serving sizes, drinking patterns, and whether non-ethanol compounds have small effects that are outweighed by ethanol in real-world intake.",
		searchCutoffAt: "2026-07-03T13:42:00.000Z",
		lastRetractionCheckAt: "2026-07-03T13:42:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:42:00.000Z",
				kind: "publication",
				summary:
					"Initial beverage-type alcohol cancer-risk page published from CDC, NCI, and systematic-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Alcohol and Cancer",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/cancer/risk-factors/alcohol.html",
				stance: "supports",
				note:
					"Current CDC public-health source stating that all drinks containing alcohol, including red and white wine, beer, and liquor, increase cancer risk.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Alcohol and Cancer Risk Fact Sheet",
				publisher: "National Cancer Institute",
				year: 2025,
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/alcohol/alcohol-fact-sheet",
				stance: "supports",
				note:
					"NCI anchor for ethanol as the alcoholic-beverage exposure, standard-drink comparisons across beer, wine, and spirits, and the lack of evidence that red wine prevents cancer.",
				order: 2
			},
			{
				kind: "context",
				title: "Awareness of Alcohol's Link to Cancer Lagging",
				publisher: "National Cancer Institute",
				year: 2023,
				url: "https://www.cancer.gov/news-events/cancer-currents-blog/2023/cancer-alcohol-link-public-awareness",
				stance: "supports",
				note:
					"Public-awareness context documenting the beverage-type misconception and stating that all alcoholic beverages, including wine, increase cancer risk.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Associations between Low to Moderate Consumption of Alcoholic Beverage Types and Health Outcomes: A Systematic Review",
				publisher: "Alcohol and Alcoholism",
				year: 2022,
				url: "https://doi.org/10.1093/alcalc/agab082",
				doi: "10.1093/alcalc/agab082",
				pmid: "34897368",
				stance: "context",
				note:
					"Systematic review of wine, beer, and spirits comparisons concluding that one beverage type is not consistently associated with lower or higher common health risks than another at low-to-moderate intake.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Is there a safe level of alcohol consumption when it comes to cancer risk?",
		slug: "is-there-a-safe-level-of-alcohol-consumption-when-it-comes-to-cancer-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"For cancer risk, major public-health sources do not identify a zero-risk threshold. That does not mean one drink is as risky as heavy drinking; it means risk generally rises with dose, some cancer risks can increase at low intake, and the lowest cancer-risk choice is to drink less or not drink.",
		stableCore: [
			"WHO Europe states that available evidence cannot identify a threshold where alcohol's carcinogenic effects start, so no safe amount can be established for cancer and health.",
			"NCI states that even light drinkers can have increased risk for some cancers, while also giving absolute-risk examples that keep low-dose increases in proportion.",
			"CDC advises that drinking less alcohol or not drinking can lower cancer risk and says drinking less is better for health than drinking more.",
			"A 2023 systematic review and meta-analysis of prospective evidence found dose-response patterns and elevated risks for several cancers even in light or light-to-moderate drinking categories."
		],
		openQuestions: [
			"How should cancer-specific no-threshold language be integrated with separate evidence debates about cardiovascular outcomes and all-cause mortality?",
			"What are the best absolute-risk formats for communicating low-dose cancer risk without exaggeration or minimization?",
			"How quickly do risks for different alcohol-related cancers decline after reduction or cessation, and how does this vary by age, sex, genetics, smoking, and prior exposure?"
		],
		whatWouldChangeMinds: [
			"Prospective or causal-inference evidence demonstrating a reproducible alcohol dose below which cancer risk is not elevated, with tight uncertainty bounds.",
			"A major WHO, NCI, CDC, IARC, or Surgeon General reassessment adopting a cancer-specific safe threshold.",
			"Evidence that apparent low-dose cancer associations are fully explained by confounding, former-drinker bias, exposure misclassification, or drinking pattern after rigorous correction."
		],
		misconceptions: [
			"No safe level for cancer risk is sometimes caricatured as meaning a single drink creates a large immediate danger.",
			"Moderation guidelines are sometimes read as a guarantee of zero cancer risk rather than a harm-reduction boundary.",
			"Potential cardiovascular findings are sometimes used to dismiss the separate and causal alcohol-cancer evidence."
		],
		editorSummary:
			"This page should make threshold language usable. The public answer is a dose-response and risk-minimization answer, not an alarmist claim that all drinking patterns have equal consequences.",
		uncertaintySummary:
			"Agreement is broad for cancer-specific no-zero-risk-threshold framing, but exact low-dose risk estimates are still affected by observational confounding, exposure measurement, drinking patterns, cancer site, genetics, and baseline absolute risk.",
		searchCutoffAt: "2026-07-03T13:42:00.000Z",
		lastRetractionCheckAt: "2026-07-03T13:42:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:42:00.000Z",
				kind: "publication",
				summary:
					"Initial alcohol safe-threshold cancer-risk page published from WHO, NCI, CDC, Lancet Public Health, and meta-analysis sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "No level of alcohol consumption is safe for our health",
				publisher: "World Health Organization Regional Office for Europe",
				year: 2023,
				url: "https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health",
				stance: "supports",
				note:
					"WHO Europe statement explaining that evidence cannot identify a threshold where carcinogenic effects begin and that less drinking is safer than more drinking.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Alcohol and Cancer Risk Fact Sheet",
				publisher: "National Cancer Institute",
				year: 2025,
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/alcohol/alcohol-fact-sheet",
				stance: "supports",
				note:
					"NCI source for causal classification, dose-response framing, low-dose examples, and absolute-risk context for one and two drinks per day.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Alcohol and Cancer",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/cancer/risk-factors/alcohol.html",
				stance: "supports",
				note:
					"Current CDC public-health guidance stating that drinking less or not drinking lowers cancer risk and that drinking less is better for health than drinking more.",
				order: 3
			},
			{
				kind: "context",
				title: "Health and cancer risks associated with low levels of alcohol consumption",
				publisher: "The Lancet Public Health",
				year: 2023,
				url: "https://doi.org/10.1016/S2468-2667(22)00317-6",
				doi: "10.1016/S2468-2667(22)00317-6",
				pmid: "36603913",
				stance: "supports",
				note:
					"WHO-linked public-health commentary arguing that no safe amount can be established for cancers and health because evidence does not identify a carcinogenic threshold.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Cancer risk based on alcohol consumption levels: a comprehensive systematic review and meta-analysis",
				publisher: "Epidemiology and Health",
				year: 2023,
				url: "https://doi.org/10.4178/epih.e2023092",
				doi: "10.4178/epih.e2023092",
				pmid: "37905315",
				stance: "supports",
				note:
					"Meta-analysis of 139 cohort studies, 106 in quantitative synthesis, reporting dose-response patterns and higher risks for several cancers even at light or light-to-moderate intake.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does secondhand smoke cause cancer and heart disease in people who do not smoke?",
		slug: "does-secondhand-smoke-cause-cancer-and-heart-disease-in-people-who-do-not-smoke",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. Surgeon General, CDC, NCI, and meta-analysis evidence agree that secondhand smoke causes serious disease in people who do not smoke, including lung cancer and cardiovascular disease. There is no risk-free level of exposure.",
		stableCore: [
			"CDC states that there is no safe level of exposure to secondhand smoke and that even brief exposure can cause harm.",
			"Among U.S. adults who do not smoke, CDC reports nearly 34,000 premature heart-disease deaths and more than 7,300 lung-cancer deaths each year from secondhand smoke.",
			"Adults who do not smoke but are exposed to secondhand smoke have about 20-30% higher lung-cancer risk, 25-30% higher coronary-heart-disease risk, and 20-30% higher stroke risk.",
			"A 2024 systematic review and meta-analysis found a pooled relative risk of 1.24 for lung cancer among never-smokers exposed to secondhand smoke, with higher risk as exposure duration and intensity increased."
		],
		openQuestions: [
			"Which home, multi-unit housing, workplace, and public-space policies most effectively reduce remaining exposure without widening enforcement inequities?",
			"How should public-health messaging address smoke drift, thirdhand residue, and vaping aerosols while keeping the core secondhand-smoke evidence clear?",
			"How can clinicians communicate risk without blaming household members who may be dealing with nicotine addiction?"
		],
		whatWouldChangeMinds: [
			"Large, independently replicated exposure studies showing no dose-response relationship between secondhand smoke and lung cancer or cardiovascular outcomes after strong exposure measurement.",
			"A Surgeon General, CDC, NCI, WHO, or National Academies reassessment reversing the causal conclusion for lung cancer or cardiovascular disease.",
			"Mechanistic and epidemiologic evidence showing that measured secondhand-smoke constituents do not plausibly produce the observed vascular and cancer risks."
		],
		misconceptions: [
			"Ventilation, open windows, or sitting in a separate area can reduce smell but do not make indoor secondhand smoke safe.",
			"Because the exposed person is not smoking directly, people often underestimate cardiovascular effects from short exposures.",
			"Relative-risk numbers can sound small, but population impact is large because exposure is common and heart disease is common."
		],
		editorSummary:
			"This page should be direct about causation while separating individual risk from population burden. The consensus is not just that smoke is unpleasant; it causes cancer, cardiovascular disease, respiratory illness, and preventable deaths in people who do not smoke.",
		uncertaintySummary:
			"The causal conclusion is strong. Remaining uncertainty is mostly about residual exposure measurement, setting-specific policy effectiveness, and how best to communicate risk without overstating precision for every disease endpoint.",
		searchCutoffAt: "2026-07-02T22:51:14.000Z",
		lastRetractionCheckAt: "2026-07-02T22:51:14.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:51:14.000Z",
				kind: "publication",
				summary:
					"Initial secondhand-smoke disease claim page published from CDC, NCI, Surgeon General, and lung-cancer meta-analysis sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Health Problems Caused by Secondhand Smoke",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/tobacco/secondhand-smoke/health.html",
				stance: "supports",
				note:
					"Current CDC anchor for no safe exposure level, immediate harm, U.S. mortality estimates, and risk increases for coronary heart disease, stroke, and lung cancer.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Secondhand Smoke Exposure",
				publisher: "National Cancer Institute",
				url: "https://cancercontrol.cancer.gov/brp/tcrb/secondhand-smoke-exposure",
				stance: "supports",
				note:
					"NCI source summarizing causal links to lung cancer, respiratory and cardiovascular disease, plus Surgeon General estimates for lung-cancer, heart-disease, and stroke burden.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "The Health Consequences of Involuntary Exposure to Tobacco Smoke",
				publisher: "U.S. Surgeon General",
				year: 2006,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK44324/",
				pmid: "20669524",
				stance: "supports",
				note:
					"Foundational Surgeon General evidence review used to anchor the causal framing and the no-risk-free-level conclusion used in later CDC and NCI pages.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Association between second-hand smoke exposure and lung cancer risk in never-smokers: a systematic review and meta-analysis",
				publisher: "European Respiratory Review",
				year: 2024,
				url: "https://doi.org/10.1183/16000617.0077-2024",
				doi: "10.1183/16000617.0077-2024",
				stance: "supports",
				note:
					"Decision-weight synthesis of 97 original articles; pooled relative risk for lung cancer was 1.24 among never-smokers exposed to secondhand smoke.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does radon in homes cause lung cancer?",
		slug: "does-radon-in-homes-cause-lung-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"Yes. Radon is an invisible radioactive gas that can accumulate indoors, and major cancer, environmental-health, and radiation bodies agree that long-term residential radon exposure causes lung cancer. The risk is especially high for people who smoke.",
		stableCore: [
			"EPA estimates radon causes about 21,000 lung-cancer deaths each year in the United States and calls it the second leading cause of lung cancer overall.",
			"CDC says radon is the second leading cause of lung-cancer deaths after cigarette smoking and that people who smoke and are exposed to radon have about 10 times higher radon-related lung-cancer risk than people who do not smoke at the same radon level.",
			"WHO estimates radon causes between 3% and 14% of lung cancers in a country, depending on average radon levels and smoking prevalence.",
			"WHO reports that lung-cancer risk rises by about 16% per 100 Bq/m3 increase in long-term average radon concentration."
		],
		openQuestions: [
			"Which testing and mitigation policies produce the greatest risk reduction in older housing, rental housing, schools, and high-radon geographies?",
			"How should guidance handle homes below an action level when risk appears continuous but mitigation cost and feasibility vary?",
			"How can radon risk be communicated clearly without making people think all non-smoker lung-cancer risk is radon?"
		],
		whatWouldChangeMinds: [
			"Large, high-quality pooled residential studies showing no exposure-response relationship after long-term measurement and smoking adjustment.",
			"Major WHO, EPA, NCI, National Academies, or radiation-protection reassessments reversing radon's lung-cancer causal classification.",
			"Mechanistic evidence showing inhaled radon decay products cannot plausibly explain the observed lung-cancer pattern."
		],
		misconceptions: [
			"Because radon cannot be seen or smelled, people often assume an untested home is low-risk.",
			"Some people treat radon as only a miner or workplace hazard, even though residential pooled studies confirm home risk.",
			"Action levels are practical mitigation thresholds, not a bright line between safe and unsafe exposure."
		],
		editorSummary:
			"This page should make the practical consensus clear: radon is measurable, reducible, and causally linked to lung cancer. The main public action is testing and mitigation, especially in homes with elevated levels and households with smokers.",
		uncertaintySummary:
			"The lung-cancer causal link is strong. Uncertainty is mainly about exact local exposure, individual lifetime risk, how risk behaves at very low levels, and how aggressively to mitigate below national action thresholds.",
		searchCutoffAt: "2026-07-02T22:51:14.000Z",
		lastRetractionCheckAt: "2026-07-02T22:51:14.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:51:14.000Z",
				kind: "publication",
				summary:
					"Initial residential radon and lung-cancer claim page published from EPA, CDC, WHO, NCI, and pooled residential-study sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Health Risk of Radon",
				publisher: "U.S. Environmental Protection Agency",
				url: "https://www.epa.gov/radon/health-risk-radon",
				stance: "supports",
				note:
					"EPA anchor for radon as the leading lung-cancer cause among non-smokers, the second leading cause overall, and about 21,000 U.S. lung-cancer deaths per year.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Radon and Your Health",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/radon/features/reduce-radon.html",
				stance: "supports",
				note:
					"Current CDC public-health source for residential exposure, the 21,000-death estimate, second-leading-cause framing, and higher combined risk for people who smoke.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Radon",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/news-room/fact-sheets/detail/radon-and-health",
				stance: "supports",
				note:
					"International public-health anchor for radon causing an estimated 3-14% of lung cancers and about a 16% risk increase per 100 Bq/m3 long-term average exposure.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Radon",
				publisher: "National Cancer Institute",
				year: 2024,
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/substances/radon",
				stance: "supports",
				note:
					"Cancer-specific federal source explaining residential exposure pathways and identifying lung cancer as the established cancer outcome linked to radon.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Radon in homes and risk of lung cancer: collaborative analysis of individual data from 13 European case-control studies",
				publisher: "BMJ",
				year: 2004,
				url: "https://doi.org/10.1136/bmj.38308.477650.63",
				doi: "10.1136/bmj.38308.477650.63",
				stance: "supports",
				note:
					"Landmark pooled individual-data analysis finding lung-cancer risk increased with residential radon and remained significant below 200 Bq/m3.",
				order: 5
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
		topicSlug: "health-and-medicine",
		title: "Are modern sunscreens safe when used as directed, including 'chemical' sunscreens?",
		slug: "are-modern-sunscreens-safe-when-used-as-directed-including-chemical-sunscreens",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"Yes, with regulatory nuance. Dermatology and public-health bodies continue to recommend FDA-regulated sunscreens as safe and beneficial when used as directed. FDA has asked for more data on several older organic sunscreen filters, which is not the same thing as finding them harmful, and mineral options remain available for people who prefer them.",
		stableCore: [
			"The American Academy of Dermatology says current scientific evidence does not show that sunscreen ingredients currently available in the United States are harmful to human health.",
			"FDA regulates sunscreens as nonprescription drugs and says Americans should use sunscreen in combination with other sun-protective measures.",
			"FDA's request for more data on several sunscreen ingredients does not mean the agency has concluded those ingredients are unsafe or told the public to stop using them.",
			"In June 2026, FDA added bemotrizinol as a permitted sunscreen active ingredient and considered it generally recognized as safe and effective for adults and children 6 months and older."
		],
		openQuestions: [
			"How should regulators resolve remaining data needs for older organic filters while keeping strong sun-protection messages clear?",
			"How should public guidance communicate ingredient absorption findings without implying that absorption automatically means harm?",
			"How should environmental concerns about some ingredients be separated from human-health safety for ordinary sunscreen use?"
		],
		whatWouldChangeMinds: [
			"Well-conducted human evidence showing that correctly used sunscreen ingredients cause clinically meaningful harm that outweighs UV-protection benefits.",
			"A major FDA, AAD, CDC, WHO, or cancer-prevention reassessment recommending against routine sunscreen use because of ingredient safety concerns.",
			"New regulatory findings that currently common sunscreen active ingredients are not safe under labeled use conditions."
		],
		misconceptions: [
			"'Chemical sunscreen' is often used as if chemical automatically means dangerous, even though all sunscreen ingredients are chemicals and safety depends on exposure and evidence.",
			"FDA data requests are often misread as proof of harm rather than a call for better evidence under modern standards.",
			"Homemade oils, beef tallow, or tanning routines are sometimes promoted as safer substitutes even though they do not provide regulated broad-spectrum UV protection."
		],
		editorSummary:
			"This page should reduce fear without flattening the regulatory nuance. The useful answer is: keep using regulated sunscreen, choose mineral sunscreen if preferred, and do not treat 'more data needed' as a reason to abandon UV protection.",
		uncertaintySummary:
			"The recommendation to use sunscreen remains broad and stable. Uncertainty is concentrated in ingredient-specific data gaps, long-term exposure monitoring, and environmental effects, not in whether UV protection is beneficial.",
		searchCutoffAt: "2026-07-02T22:42:05.000Z",
		lastRetractionCheckAt: "2026-07-02T22:42:05.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:42:05.000Z",
				kind: "publication",
				summary:
					"Initial sunscreen safety claim page published from AAD, FDA sunscreen guidance, FDA regulatory Q&A, and FDA 2026 bemotrizinol action."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Is sunscreen safe?",
				publisher: "American Academy of Dermatology",
				url:
					"https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/is-sunscreen-safe",
				stance: "supports",
				note:
					"Primary dermatology anchor: AAD says science does not show currently available U.S. sunscreen ingredients are harmful and that FDA data requests are not instructions to stop using sunscreen.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Sunscreen: How to Help Protect Your Skin from the Sun",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url:
					"https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun",
				stance: "supports",
				note:
					"Current FDA consumer guidance stating that FDA regulates sunscreens for safety and effectiveness and that sunscreen should be used with other sun-protective measures.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Questions and Answers: FDA posts deemed final order and proposed order for OTC sunscreen",
				publisher: "U.S. Food and Drug Administration",
				year: 2021,
				url:
					"https://www.fda.gov/drugs/understanding-over-counter-medicines/questions-and-answers-fda-posts-deemed-final-order-and-proposed-order-over-counter-sunscreen",
				stance: "context",
				note:
					"Regulatory nuance source distinguishing GRASE determinations, ingredients needing more data, and ingredients FDA proposed as not GRASE because of safety issues.",
				order: 3
			},
			{
				kind: "guideline",
				title: "FDA Expands Sunscreen Options for the First Time in 20 Years",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url: "https://www.fda.gov/news-events/press-announcements/fda-expands-sunscreen-options-first-time-20-years",
				stance: "context",
				note:
					"Current regulatory update adding bemotrizinol as a permitted sunscreen active ingredient considered GRASE for adults and children 6 months and older.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Should you rely on sunscreen alone, or are clothing and shade more protective?",
		slug: "should-you-rely-on-sunscreen-alone-or-are-clothing-and-shade-more-protective",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Do not rely on sunscreen alone. Sunscreen is useful, but major guidance recommends a layered strategy: shade, protective clothing, hats, sunglasses, limiting peak sun, and broad-spectrum sunscreen on exposed skin. Clothing and shade reduce exposure without depending as much on perfect application and reapplication.",
		stableCore: [
			"FDA says no sunscreen completely blocks UV radiation, so protective clothing, sunglasses, and shade are also needed.",
			"CDC recommends shade, clothing, hats, sunglasses, and sunscreen, and notes that sunscreen or protective clothing is still useful even when staying in shade.",
			"The Skin Cancer Foundation explicitly says sunscreen alone is not enough and recommends shade, sun-safe clothing, a wide-brimmed hat, and UV-blocking sunglasses.",
			"Correct sunscreen use still matters: use enough, cover all exposed skin, reapply at least every two hours, and reapply more often after swimming or sweating."
		],
		openQuestions: [
			"Which combinations of shade, clothing, sunscreen, and behavior produce the best real-world adherence for different ages, jobs, sports, and skin types?",
			"How should advice vary by UV index, geography, season, altitude, cloud cover, reflective surfaces, and skin-cancer history?",
			"How can guidance avoid making sun protection sound so burdensome that people skip it entirely?"
		],
		whatWouldChangeMinds: [
			"Major CDC, FDA, WHO, dermatology, or cancer-prevention guidance concluding that sunscreen alone provides complete practical sun protection.",
			"Strong real-world evidence that sunscreen-alone guidance prevents UV damage and skin cancers as well as layered sun protection under ordinary use conditions.",
			"Evidence that shade and protective clothing do not meaningfully reduce UV exposure when used correctly."
		],
		misconceptions: [
			"High SPF is often mistaken for all-day protection, even though reapplication and coverage still matter.",
			"People sometimes use sunscreen to justify longer intentional tanning, which can erase protection benefits through extra exposure.",
			"Shade is sometimes treated as complete protection, but reflected and scattered UV can still reach skin."
		],
		editorSummary:
			"This page should help users act, not just believe. It should make sunscreen feel like one useful tool in a simple hierarchy: avoid peak UV when possible, cover up, seek shade, and use sunscreen on exposed skin.",
		uncertaintySummary:
			"The layered-protection recommendation is high-certainty. Remaining uncertainty is mostly behavioral: what people will actually do consistently, and how to tailor guidance without overcomplicating it.",
		searchCutoffAt: "2026-07-02T22:42:05.000Z",
		lastRetractionCheckAt: "2026-07-02T22:42:05.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:42:05.000Z",
				kind: "publication",
				summary:
					"Initial sunscreen-alone versus shade-and-clothing claim page published from FDA, CDC, and Skin Cancer Foundation sun-safety guidance."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Tips to Stay Safe in the Sun: From Sunscreen to Sunglasses",
				publisher: "U.S. Food and Drug Administration",
				year: 2024,
				url:
					"https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses",
				stance: "supports",
				note:
					"Primary practical anchor for no sunscreen completely blocking UV radiation, the need for clothing, sunglasses, and shade, and reapplication guidance.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Sun Safety Facts",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/skin-cancer/sun-safety/index.html",
				stance: "supports",
				note:
					"CDC public-health guidance for shade, clothing, hats, sunglasses, sunscreen, UV index, and cloudy-day/reflected-UV context.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Sunscreen",
				publisher: "Skin Cancer Foundation",
				url: "https://www.skincancer.org/skin-cancer-prevention/sun-protection/sunscreen/",
				stance: "supports",
				note:
					"Skin-cancer prevention guidance stating that sunscreen alone is not enough and should be combined with shade, sun-safe clothing, hats, and UV-blocking sunglasses.",
				order: 3
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do antibiotics treat colds, flu, or most viral respiratory infections?",
		slug: "do-antibiotics-treat-colds-flu-or-most-viral-respiratory-infections",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. Antibiotics treat bacterial infections, not viral infections such as the common cold or flu. They can still be lifesaving when a bacterial infection is present, but using them for viral respiratory illness usually adds side-effect and resistance risk without helping the virus clear.",
		stableCore: [
			"CDC states that antibiotics do not work on viruses such as those that cause colds, flu, bronchitis, or runny noses, even when mucus is thick, yellow, or green.",
			"CDC's common-cold guidance says the common cold should improve on its own and that antibiotics do not help people feel better when the illness is viral.",
			"A 2023 Cochrane review of delayed, immediate, and no antibiotics for respiratory infections found similar outcomes for many symptoms and complications, with no-antibiotic strategies producing the least antibiotic use when clinicians judge that approach safe.",
			"Clinical guidance still reserves antibiotics for bacterial conditions such as pneumonia, confirmed strep throat, selected bacterial sinusitis presentations, sepsis, and other infections where benefits outweigh risks."
		],
		openQuestions: [
			"Which rapid tests and decision rules best separate bacterial from viral respiratory infections in everyday clinics?",
			"How can clinicians reduce unnecessary antibiotic prescribing while keeping patient satisfaction and safety-net follow-up strong?",
			"Which higher-risk patients need different thresholds because complications from respiratory infections are more likely?"
		],
		whatWouldChangeMinds: [
			"Large randomized trials showing that antibiotics meaningfully improve viral cold or flu outcomes without offsetting harms.",
			"Evidence that common viral respiratory illnesses usually contain a bacterial target that responds to antibiotics under ordinary outpatient conditions.",
			"A major CDC, ACP, IDSA, Cochrane, or WHO reassessment reversing current guidance for common viral respiratory infections."
		],
		misconceptions: [
			"Colored mucus can happen during viral illness and does not automatically mean antibiotics are needed.",
			"Feeling very sick does not by itself prove a bacterial infection; flu, COVID-19, RSV, and other viruses can cause severe symptoms.",
			"Saving leftover antibiotics for a future cold can delay correct care and expose people to side effects or resistant bacteria."
		],
		editorSummary:
			"This page should be useful at the moment someone wants antibiotics for a cold: antibiotics are not anti-virus drugs, but the page should also avoid implying that antibiotics are bad when they are genuinely indicated.",
		uncertaintySummary:
			"The core viral-infection claim is settled. Uncertainty is mainly diagnostic and clinical: which symptoms, tests, patient risks, and follow-up plans justify antibiotics for a possible bacterial infection.",
		searchCutoffAt: "2026-07-02T23:03:13.000Z",
		lastRetractionCheckAt: "2026-07-02T23:03:13.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:03:13.000Z",
				kind: "publication",
				summary:
					"Initial antibiotics and viral respiratory infections claim page published from CDC public guidance, ACP/CDC clinical advice, and Cochrane respiratory-infection prescribing evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Manage Common Cold",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/common-cold/treatment/index.html",
				stance: "supports",
				note:
					"Current CDC common-cold guidance stating that the common cold has no cure, should improve on its own, and is not helped by antibiotics when viral.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Antibiotics Aren't Always the Answer",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/antibiotic-use/media/pdfs/Antibiotics-Arent-Always-the-Answer-P.pdf",
				stance: "supports",
				note:
					"CDC public-health handout explaining that antibiotics treat certain bacterial infections, not viruses such as colds, flu, bronchitis, or runny noses, and can cause side effects when unnecessary.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Immediate versus delayed versus no antibiotics for respiratory infections",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2023,
				url: "https://doi.org/10.1002/14651858.CD004417.pub6",
				doi: "10.1002/14651858.CD004417.pub6",
				stance: "supports",
				note:
					"Decision-weight review of 12 studies and 3,968 participants; no-antibiotic or delayed strategies reduced antibiotic use while maintaining similar outcomes where immediate antibiotics were not needed.",
				order: 3
			},
			{
				kind: "guideline",
				title:
					"Appropriate Antibiotic Use for Acute Respiratory Tract Infection in Adults: Advice for High-Value Care From the American College of Physicians and the Centers for Disease Control and Prevention",
				publisher: "Annals of Internal Medicine",
				year: 2016,
				url: "https://doi.org/10.7326/M15-1840",
				doi: "10.7326/M15-1840",
				stance: "supports",
				note:
					"ACP/CDC clinical advice not to prescribe antibiotics for the common cold and not to initiate antibiotics for bronchitis unless pneumonia is suspected.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does routine imaging improve uncomplicated low back pain?",
		slug: "does-routine-imaging-improve-uncomplicated-low-back-pain",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"Usually no. For low back pain without red flags, routine early X-rays, CT scans, or MRI do not improve pain or function compared with usual care. Imaging is still important when symptoms suggest cancer, infection, fracture, cauda equina syndrome, severe or progressive neurologic deficits, or when a specialist result is likely to change management.",
		stableCore: [
			"The American College of Radiology rates initial lumbar radiography, CT, and MRI as usually not appropriate for acute, subacute, or chronic low back pain with no red flags and no prior management.",
			"NICE recommends against routine imaging in non-specialist settings and says specialist imaging should be considered only when the result is likely to change management.",
			"A Lancet systematic review and meta-analysis of six randomized trials with 1,804 participants found no clinically meaningful improvement in pain, function, quality of life, mental health, or overall improvement from immediate routine lumbar imaging.",
			"A later systematic review found low back pain imaging may be associated with higher direct costs, increased health care utilization, and possibly more absence from work."
		],
		openQuestions: [
			"Which red-flag combinations best identify the small subgroup who need urgent imaging without causing broad overuse?",
			"Which decision-support and patient-communication tools reduce low-value imaging while preserving trust and follow-up safety?",
			"What is the best timing and modality for persistent radiculopathy, spinal stenosis, or surgical/interventional planning?"
		],
		whatWouldChangeMinds: [
			"Large, low-bias randomized trials showing that routine early imaging for uncomplicated low back pain improves patient-important outcomes enough to outweigh costs and downstream harms.",
			"Evidence that serious spinal conditions are commonly missed when clinicians defer immediate imaging after a careful red-flag assessment.",
			"A major ACR, ACP, NICE, Cochrane, or comparable guideline reassessment recommending routine initial imaging for uncomplicated low back pain."
		],
		misconceptions: [
			"Not ordering an early scan does not mean the pain is imaginary or unimportant.",
			"MRI and CT can find age-related disc or spine changes that are common even in people without back pain, so a visible finding is not always the cause.",
			"Red flags, severe or progressive neurologic deficits, trauma risk, cancer risk, infection concern, and cauda equina symptoms are different from uncomplicated low back pain."
		],
		editorSummary:
			"This page should help readers understand why deferring early imaging can be evidence-based care, while making the safety exceptions explicit enough that the advice is not read as blanket imaging denial.",
		uncertaintySummary:
			"The core claim is strong for uncomplicated low back pain without red flags. Uncertainty is mostly about implementation, red-flag accuracy, persistent symptoms, and how to communicate watchful waiting without making patients feel dismissed.",
		searchCutoffAt: "2026-07-04T03:59:49.000Z",
		lastRetractionCheckAt: "2026-07-04T03:59:49.000Z",
		changeLog: [
			{
				date: "2026-07-04T03:59:49.000Z",
				kind: "publication",
				summary:
					"Initial uncomplicated low back pain imaging claim page published from ACR and NICE guideline anchors plus randomized-trial and utilization systematic reviews."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "ACR Appropriateness Criteria Low Back Pain",
				publisher: "American College of Radiology",
				year: 2021,
				url: "https://acsearch.acr.org/docs/69483/narrative/",
				stance: "supports",
				note:
					"ACR appropriateness table rates initial radiography, CT, and MRI as usually not appropriate for low back pain without red flags and no prior management, while listing scenarios where imaging becomes appropriate.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Low back pain and sciatica in over 16s: assessment and management",
				publisher: "National Institute for Health and Care Excellence",
				year: 2016,
				url: "https://www.nice.org.uk/guidance/ng59/chapter/recommendations",
				stance: "supports",
				note:
					"NICE recommendation not to routinely offer imaging in non-specialist settings and to consider specialist imaging only if the result is likely to change management.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Imaging strategies for low-back pain: systematic review and meta-analysis",
				publisher: "The Lancet",
				year: 2009,
				url: "https://doi.org/10.1016/S0140-6736(09)60172-0",
				doi: "10.1016/S0140-6736(09)60172-0",
				pmid: "19200918",
				stance: "supports",
				note:
					"Systematic review and meta-analysis of six randomized trials and 1,804 participants finding immediate routine lumbar imaging did not improve pain, function, quality of life, mental health, or overall improvement.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
					"Imaging versus no imaging for low back pain: a systematic review, measuring costs, healthcare utilization and absence from work",
				publisher: "European Spine Journal",
				year: 2019,
				url: "https://doi.org/10.1007/s00586-019-05918-1",
				doi: "10.1007/s00586-019-05918-1",
				pmid: "30796513",
				stance: "supports",
				note:
					"Systematic review finding low back pain imaging may be associated with higher medical costs, increased health care utilization, and indications of more absence from work.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does positive airway pressure help adults with obstructive sleep apnea?",
		slug: "does-positive-airway-pressure-help-adults-with-obstructive-sleep-apnea",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Yes, for many adults with diagnosed obstructive sleep apnea. Positive airway pressure, including CPAP and auto-adjusting PAP, keeps the airway open during sleep and improves apnea severity, daytime sleepiness, and sleep-related quality of life. It can lower blood pressure modestly in some groups, especially with hypertension, but it should not be sold as guaranteed prevention of heart attacks or strokes for every patient.",
		stableCore: [
			"AASM recommends PAP rather than no therapy for adults with obstructive sleep apnea and excessive sleepiness, and suggests PAP for impaired sleep-related quality of life or comorbid hypertension.",
			"NICE recommends fixed-level CPAP plus lifestyle advice for adults with moderate or severe OSAHS and offers CPAP for symptomatic mild OSAHS when symptoms affect quality of life or daytime activities.",
			"AASM's supporting systematic review found PAP compared with no treatment reduced disease severity, sleepiness, blood pressure, and motor vehicle accidents, and improved sleep-related quality of life.",
			"Randomized-trial meta-analyses find CPAP improves subjective and objective daytime sleepiness, with larger benefit when baseline sleepiness and nightly adherence are higher.",
			"Blood-pressure benefits are real but usually modest and vary by baseline hypertension, severity, and nightly use."
		],
		openQuestions: [
			"Which patients get durable cardiovascular-event or mortality benefit, and how much adherence is needed for that benefit?",
			"Which alternatives, including mandibular advancement devices, positional treatment, weight-loss interventions, surgery, or newer obesity medications, work best for specific phenotypes?",
			"How can sleep services improve mask fit, comfort, telemonitoring, troubleshooting, and long-term adherence?"
		],
		whatWouldChangeMinds: [
			"Large, low-bias randomized trials showing that PAP does not improve apnea severity, sleepiness, or sleep-related quality of life compared with credible controls in appropriately diagnosed adults.",
			"Major AASM, NICE, ACP, or comparable guideline updates withdrawing PAP as a recommended treatment for symptomatic adult obstructive sleep apnea.",
			"Evidence that observed symptom benefits are fully explained by expectation, co-interventions, or biased outcome reporting rather than airway stabilization."
		],
		misconceptions: [
			"CPAP is not just a snoring device; it treats repeated airway collapse during sleep when obstructive sleep apnea is objectively diagnosed.",
			"Not feeling better immediately does not prove PAP cannot work; pressure settings, mask fit, leaks, nasal symptoms, sleep duration, other sleep disorders, and nightly use all matter.",
			"Stronger evidence for sleepiness and quality of life does not mean every cardiovascular or metabolic claim about CPAP is equally proven."
		],
		editorSummary:
			"This page should give readers a practical treatment anchor: CPAP/PAP is evidence-based for diagnosed obstructive sleep apnea symptoms and breathing events, but cardiovascular-event prevention and one-size-fits-all benefit claims need caution.",
		uncertaintySummary:
			"The symptom and apnea-severity benefit is well supported. Remaining uncertainty is mostly about hard cardiovascular outcomes, which subgroups benefit most, adherence thresholds, and how to personalize PAP versus alternative or adjunctive treatments.",
		searchCutoffAt: "2026-07-04T04:06:44.000Z",
		lastRetractionCheckAt: "2026-07-04T04:06:44.000Z",
		changeLog: [
			{
				date: "2026-07-04T04:06:44.000Z",
				kind: "publication",
				summary:
					"Initial obstructive sleep apnea PAP treatment claim page published from AASM and NICE guidance, NHLBI treatment context, and randomized-trial meta-analyses identified through Consensus."
			}
		],
		sources: [
			{
				kind: "guideline",
				title:
					"Treatment of Adult Obstructive Sleep Apnea with Positive Airway Pressure: An American Academy of Sleep Medicine Clinical Practice Guideline",
				publisher: "Journal of Clinical Sleep Medicine",
				year: 2019,
				url: "https://doi.org/10.5664/jcsm.7640",
				doi: "10.5664/jcsm.7640",
				pmid: "30736887",
				stance: "supports",
				note:
					"AASM guideline recommending PAP for adults with OSA and excessive sleepiness, and suggesting PAP for impaired sleep-related quality of life or comorbid hypertension.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Obstructive sleep apnoea/hypopnoea syndrome and obesity hypoventilation syndrome in over 16s",
				publisher: "National Institute for Health and Care Excellence",
				year: 2021,
				url: "https://www.nice.org.uk/guidance/ng202/chapter/1-Obstructive-sleep-apnoeahypopnoea-syndrome",
				stance: "supports",
				note:
					"NICE recommendations offering CPAP for symptomatic mild OSAHS under defined conditions and fixed-level CPAP plus lifestyle advice for moderate or severe OSAHS.",
				order: 2
			},
			{
				kind: "context",
				title: "Sleep Apnea Treatment",
				publisher: "National Heart, Lung, and Blood Institute",
				year: 2025,
				url: "https://www.nhlbi.nih.gov/health/sleep-apnea/treatment",
				stance: "supports",
				note:
					"Current NIH patient-facing treatment context describing PAP machines as common treatment that keep airways open during sleep, plus lifestyle and alternative-device context.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
					"Treatment of Adult Obstructive Sleep Apnea With Positive Airway Pressure: An American Academy of Sleep Medicine Systematic Review, Meta-Analysis, and GRADE Assessment",
				publisher: "Journal of Clinical Sleep Medicine",
				year: 2019,
				url: "https://doi.org/10.5664/jcsm.7638",
				doi: "10.5664/jcsm.7638",
				pmid: "30736888",
				stance: "supports",
				note:
					"AASM evidence review of 336 included studies, with 184 suitable for meta-analysis, finding PAP improved OSA severity, sleepiness, blood pressure, accidents, and sleep-related quality of life compared with no treatment.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Predictors of the Efficacy for Daytime Sleepiness in Patients With Obstructive Sleep Apnea With Continuous Positive Airway Pressure Therapy",
				publisher: "Frontiers in Neurology",
				year: 2022,
				url: "https://doi.org/10.3389/fneur.2022.911996",
				doi: "10.3389/fneur.2022.911996",
				pmid: "35832171",
				stance: "supports",
				note:
					"Meta-analysis of 41 randomized trials and 7,332 patients finding CPAP improved subjective and objective sleepiness, with baseline sleepiness and adherence as stable predictors.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title:
					"Continuous positive airway pressure for adults with obstructive sleep apnea and cardiovascular disease: a meta-analysis of randomized trials",
				publisher: "Sleep Medicine",
				year: 2019,
				url: "https://doi.org/10.1016/j.sleep.2018.11.013",
				doi: "10.1016/j.sleep.2018.11.013",
				pmid: "30529774",
				stance: "context",
				note:
					"Randomized-trial meta-analysis finding no statistically significant survival or major cardiovascular-event prevention in adults with OSA and established cardiovascular disease, supporting cautious cardiovascular claims.",
				order: 6
			},
			{
				kind: "landmark_study",
				title: "CPAP for Prevention of Cardiovascular Events in Obstructive Sleep Apnea",
				publisher: "New England Journal of Medicine",
				year: 2016,
				url: "https://doi.org/10.1056/NEJMoa1606599",
				doi: "10.1056/NEJMoa1606599",
				pmid: "27571048",
				stance: "context",
				note:
					"SAVE randomized trial in adults with moderate-to-severe OSA and cardiovascular disease; CPAP improved symptoms and quality of life but did not prevent cardiovascular events in the intention-to-treat analysis.",
				order: 7
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does regular physical activity reduce the risk of early death and chronic disease?",
		slug: "does-regular-physical-activity-reduce-the-risk-of-early-death-and-chronic-disease",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Yes. Regular physical activity is one of the clearest prevention signals in public health. The strongest benefits are seen when inactive adults add activity, with lower risks of all-cause mortality, cardiovascular disease, type 2 diabetes, several cancers, falls, depression, and dementia.",
		stableCore: [
			"WHO states that insufficiently active people have a 20-30% increased risk of death compared with sufficiently active people.",
			"WHO and CDC guidance links regular physical activity with lower all-cause mortality, cardiovascular disease, type 2 diabetes, site-specific cancers, depression, dementia, and falls.",
			"A 2023 dose-response meta-analysis covered 196 articles, 94 cohorts, and more than 30 million participants; activity equivalent to 150 minutes per week of moderate-to-vigorous aerobic activity was associated with lower all-cause, cardiovascular, and cancer mortality.",
			"The dose-response curve is nonlinear: the biggest marginal gains usually come from moving from inactive to somewhat active, while additional gains above guideline levels become smaller and less certain."
		],
		openQuestions: [
			"How should guidance personalize type, intensity, and volume of activity for age, disability, pregnancy, chronic illness, and injury risk?",
			"Which community, workplace, school, and transportation policies produce durable increases in physical activity?",
			"How much of the observed association for some outcomes is causal versus influenced by baseline health and other confounding factors?"
		],
		whatWouldChangeMinds: [
			"Large bodies of prospective, randomized, or natural-experiment evidence showing no health benefit from increased physical activity after accounting for baseline health.",
			"Major WHO, CDC, or national guideline reassessments withdrawing physical activity as a core prevention recommendation.",
			"Mechanistic and clinical evidence showing that improved cardiorespiratory fitness, muscle strength, glycemic control, blood pressure, and inflammation do not translate into meaningful health benefits."
		],
		misconceptions: [
			"Exercise does not have to mean gym workouts; walking, cycling, dancing, yard work, active transport, and household movement can count.",
			"The 150-minute target is not a cliff; smaller increases from inactivity still appear beneficial.",
			"Physical activity reduces risk, but it is not a guarantee against disease and should not be used to blame people for illness."
		],
		editorSummary:
			"This page should help readers act without sounding moralistic. The consensus is strong that movement matters, but the most useful public message is that some activity is better than none and that practical, enjoyable movement is more sustainable than perfection.",
		uncertaintySummary:
			"The broad prevention claim is strong across guidelines and very large cohort syntheses. Uncertainty is highest for exact dose, causal size for specific diseases, and how best to increase activity equitably in real communities.",
		searchCutoffAt: "2026-07-02T23:03:13.000Z",
		lastRetractionCheckAt: "2026-07-02T23:03:13.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:03:13.000Z",
				kind: "publication",
				summary:
					"Initial physical activity and chronic-disease prevention claim page published from WHO, CDC, and large dose-response meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Physical activity",
				publisher: "World Health Organization",
				year: 2024,
				url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
				stance: "supports",
				note:
					"WHO fact sheet summarizing mortality risk from insufficient activity, prevention of noncommunicable diseases, and the global 150-minute recommendation baseline.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Benefits of Physical Activity",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/physical-activity-basics/benefits/index.html",
				stance: "supports",
				note:
					"CDC public-health guidance for the 150-minute weekly moderate-activity benchmark and reduced risk of heart disease, stroke, type 2 diabetes, and metabolic syndrome.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Health Benefits of Physical Activity for Adults",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/physical-activity-basics/health-benefits/adults.html",
				stance: "supports",
				note:
					"CDC adult-benefits page listing long-term lower risk of heart disease, stroke, type 2 diabetes, eight cancers, depression, dementia, and falls.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Non-occupational physical activity and risk of cardiovascular disease, cancer and mortality outcomes: a dose-response meta-analysis of large prospective studies",
				publisher: "British Journal of Sports Medicine",
				year: 2023,
				url: "https://doi.org/10.1136/bjsports-2022-105669",
				doi: "10.1136/bjsports-2022-105669",
				stance: "supports",
				note:
					"Decision-weight synthesis of 196 articles and 94 cohorts with more than 30 million participants; 8.75 mMET-hours/week was associated with lower all-cause, cardiovascular, and cancer mortality.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does colorectal cancer screening reduce deaths?",
		slug: "does-colorectal-cancer-screening-reduce-deaths",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. Colorectal cancer screening reduces deaths from colorectal cancer, and some screening methods also reduce cancer incidence by finding and removing precancerous polyps. The benefit depends on using an evidence-based test on schedule and completing follow-up colonoscopy after abnormal results.",
		stableCore: [
			"USPSTF recommends screening average-risk adults from ages 45 to 75, with high certainty of substantial net benefit for ages 50 to 75 and moderate net benefit for ages 45 to 49.",
			"NCI states that, based on solid evidence, screening for colorectal cancer reduces colorectal-cancer mortality and that some modalities reduce incidence.",
			"Cochrane fecal occult blood test evidence found a 16% relative reduction in colorectal-cancer mortality in randomized trials, with greater benefit among people who attended screening.",
			"Flexible sigmoidoscopy trials show reductions in both colorectal-cancer incidence and mortality; evidence for colonoscopy and FIT also supports benefit, though the exact evidence base differs by test."
		],
		openQuestions: [
			"Which screening strategy is best for a specific person depends on access, preferences, risk, test frequency, bowel preparation, sedation, and ability to complete follow-up.",
			"How should screening continue or stop from ages 76 to 85, when benefit depends more strongly on health status, prior screening, and life expectancy?",
			"How can health systems close screening and follow-up gaps that drive avoidable colorectal-cancer deaths?"
		],
		whatWouldChangeMinds: [
			"Large randomized or high-quality comparative-effectiveness evidence showing no colorectal-cancer mortality reduction from recommended screening strategies with appropriate follow-up.",
			"Major USPSTF, NCI, CDC, Cochrane, or specialty-society reassessments withdrawing screening recommendations for average-risk adults.",
			"Evidence that harms from recommended screening and follow-up exceed mortality and incidence benefits in the target age groups."
		],
		misconceptions: [
			"Screening is sometimes treated as one test, but stool tests, flexible sigmoidoscopy, CT colonography, stool DNA-FIT, and colonoscopy have different intervals, tradeoffs, and evidence bases.",
			"A negative stool test does not permanently rule out cancer; repeat testing on schedule is part of the screening strategy.",
			"A positive stool-based test is not the endpoint; colonoscopy follow-up is needed for the screening benefit to be achieved."
		],
		editorSummary:
			"This page should be action-oriented: colorectal screening is a real mortality-reduction intervention, but the practical benefit comes from choosing a feasible test, repeating it at the right interval, and completing follow-up.",
		uncertaintySummary:
			"The mortality-reduction claim is strong. Remaining uncertainty is mostly comparative and implementation-focused: which test is best for whom, how to maximize adherence and follow-up, and where screening should stop in older adults.",
		searchCutoffAt: "2026-07-02T23:03:13.000Z",
		lastRetractionCheckAt: "2026-07-02T23:03:13.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:03:13.000Z",
				kind: "publication",
				summary:
					"Initial colorectal-cancer screening mortality claim page published from USPSTF, NCI, Cochrane, and 2025 umbrella-review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Colorectal Cancer: Screening",
				publisher: "U.S. Preventive Services Task Force",
				year: 2021,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/colorectal-cancer-screening",
				stance: "supports",
				note:
					"Primary U.S. screening recommendation: all average-risk adults 45 to 75 should be screened, with test options and selective screening for ages 76 to 85.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Colorectal Cancer Screening (PDQ) - Health Professional Version",
				publisher: "National Cancer Institute",
				url: "https://www.cancer.gov/types/colorectal/hp/colorectal-screening-pdq",
				stance: "supports",
				note:
					"NCI evidence summary stating that solid evidence shows colorectal-cancer screening reduces colorectal-cancer mortality and that some modalities reduce incidence.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Cochrane Systematic Review of Colorectal Cancer Screening Using the Fecal Occult Blood Test (Hemoccult): An Update",
				publisher: "The American Journal of Gastroenterology",
				year: 2008,
				url: "https://doi.org/10.1111/j.1572-0241.2008.01875.x",
				doi: "10.1111/j.1572-0241.2008.01875.x",
				stance: "supports",
				note:
					"Review of four randomized trials with more than 320,000 participants, finding a 16% relative reduction in colorectal-cancer mortality with FOBT screening.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
					"Accuracy and long-term effectiveness of established screening modalities and strategies in colorectal cancer screening: An umbrella review",
				publisher: "International Journal of Cancer",
				year: 2025,
				url: "https://doi.org/10.1002/ijc.35381",
				doi: "10.1002/ijc.35381",
				stance: "supports",
				note:
					"Recent umbrella review finding convincing evidence that flexible sigmoidoscopy reduces colorectal-cancer incidence and mortality and that gFOBT reduces colorectal-cancer mortality.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does cervical cancer screening reduce cervical cancer deaths?",
		slug: "does-cervical-cancer-screening-reduce-cervical-cancer-deaths",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. Cervical cancer screening reduces cervical cancer incidence and deaths by finding precancerous changes or early cancer when treatment is more effective. HPV vaccination lowers future risk, but it does not replace screening for people who are still in recommended screening age groups.",
		stableCore: [
			"USPSTF recommends cervical cancer screening for average-risk people with a cervix from ages 21 to 65, with different cytology and HPV-testing options by age.",
			"NCI states that screening can help prevent cervical cancer and find it early, and that both HPV testing and Pap testing are used to detect high-risk HPV infection or abnormal cervical cells.",
			"A systematic review and meta-analysis found protective benefits from screening, including pooled case-control evidence for lower invasive cervical cancer risk with cytology screening.",
			"Organized screening programs reduce cervical cancer mortality, but the benefit depends on access, repeat screening at the right interval, and follow-up of abnormal results."
		],
		openQuestions: [
			"How should screening intervals adapt as HPV-vaccinated cohorts age into screening programs?",
			"Which combination of clinician-collected HPV testing, self-sampling, cytology, and triage best improves access while minimizing false positives and overtreatment?",
			"How should guidance differ for immunocompromised people, people with prior abnormal results, and those with inadequate prior screening?"
		],
		whatWouldChangeMinds: [
			"High-quality evidence showing that recommended cervical screening no longer reduces cervical cancer incidence or mortality in screened populations.",
			"Major USPSTF, NCI, WHO, or specialty-society reassessments withdrawing cervical screening recommendations for average-risk adults in current age groups.",
			"Evidence that harms from guideline-concordant screening and follow-up outweigh prevention and early-detection benefits."
		],
		misconceptions: [
			"HPV vaccination greatly reduces risk but does not remove the need for screening in everyone currently eligible.",
			"Pap and HPV tests are screening tools, not treatment; abnormal results need appropriate follow-up.",
			"More frequent screening is not automatically better because false positives, colposcopy, and treatment can cause avoidable harm."
		],
		editorSummary:
			"This page should connect the HPV vaccine page to the practical prevention system: vaccination and screening work together, and the public-health failure is often missed screening or missed follow-up rather than uncertainty about whether screening can prevent deaths.",
		uncertaintySummary:
			"The mortality-reduction claim is strong. Remaining uncertainty is about optimal intervals, triage, self-sampling implementation, harms from overtesting, and adapting programs as vaccination changes population risk.",
		searchCutoffAt: "2026-07-02T23:13:42.000Z",
		lastRetractionCheckAt: "2026-07-02T23:13:42.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:13:42.000Z",
				kind: "publication",
				summary:
					"Initial cervical-cancer screening mortality claim page published from USPSTF, NCI, and systematic review evidence on screening incidence and mortality effects."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Cervical Cancer: Screening",
				publisher: "U.S. Preventive Services Task Force",
				year: 2018,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/cervical-cancer-screening",
				stance: "supports",
				note:
					"Primary U.S. recommendation source for age-specific screening options, benefits, and harms in average-risk people with a cervix.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Cervical Cancer Screening",
				publisher: "National Cancer Institute",
				url: "https://www.cancer.gov/types/cervical/screening",
				stance: "supports",
				note:
					"NCI public anchor explaining that cervical screening can help prevent cervical cancer and find cancer early through HPV and Pap testing.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Screening for cervical cancer: a systematic review and meta-analysis",
				publisher: "Systematic Reviews",
				year: 2013,
				url: "https://doi.org/10.1186/2046-4053-2-35",
				doi: "10.1186/2046-4053-2-35",
				stance: "supports",
				note:
					"Review of randomized and observational evidence finding that cervical screening is associated with reduced invasive cervical cancer incidence and cervical cancer mortality.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Effect of organised cervical cancer screening on cervical cancer mortality in Europe",
				publisher: "European Journal of Cancer",
				year: 2020,
				url: "https://doi.org/10.1016/j.ejca.2019.12.013",
				doi: "10.1016/j.ejca.2019.12.013",
				stance: "supports",
				note:
					"Organized-program review showing cervical cancer mortality reductions in monitored European screening programs, with effect size varying by setting and participation.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does mammography screening reduce deaths from breast cancer?",
		slug: "does-mammography-screening-reduce-deaths-from-breast-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 92,
		bottomLine:
			"Yes, for people in recommended screening age groups. Mammography can lower the risk of dying from breast cancer by finding cancers earlier, but it does not prevent breast cancer and it also creates false positives, overdiagnosis, anxiety, and follow-up testing. Current USPSTF guidance recommends biennial screening mammography from ages 40 to 74 for people at average risk.",
		stableCore: [
			"USPSTF recommends biennial screening mammography for women aged 40 to 74 and concludes with moderate certainty that this has a moderate net benefit.",
			"CDC states that regular mammograms can lower the risk of dying from breast cancer and that mammography is the best screening test for most women of screening age.",
			"The 2024 USPSTF evidence report states that trials have established that screening mammography can reduce mortality risk, while the optimal age, interval, and modality details remain less certain.",
			"A 2024 systematic review update reported randomized-trial evidence consistent with a 15% relative reduction in breast-cancer mortality from screening mammography, while also emphasizing low certainty for many benefit-harm details and no new no-screening RCTs."
		],
		openQuestions: [
			"Should some people with dense breasts, family history, or other risk factors receive supplemental MRI or ultrasound after a negative mammogram?",
			"How should screening be personalized for people older than 74, where direct evidence is insufficient?",
			"Which screening interval and modality best balances mortality reduction, false positives, overdiagnosis, cost, and access for different risk groups?"
		],
		whatWouldChangeMinds: [
			"Large, high-quality evidence showing no breast-cancer mortality reduction from guideline-concordant mammography screening in recommended age groups.",
			"Major USPSTF, CDC, NCI, or comparable guideline reassessments withdrawing mammography screening recommendations for average-risk people aged 40 to 74.",
			"Evidence that harms from guideline-concordant mammography screening substantially outweigh breast-cancer mortality benefits in the recommended age range."
		],
		misconceptions: [
			"Mammography does not prevent breast cancer; it is intended to detect cancer earlier, when treatment is more likely to work.",
			"A normal mammogram does not guarantee that no cancer is present, and an abnormal mammogram does not mean cancer is definitely present.",
			"More screening is not automatically better; annual screening and supplemental imaging can add false positives and overdiagnosis without clear outcome gains for every person."
		],
		editorSummary:
			"This page should be practical rather than celebratory. Mammography has real mortality benefit in the recommended age range, but readers should understand the tradeoffs and the open questions around dense breasts, older adults, and personalized schedules.",
		uncertaintySummary:
			"The direction of breast-cancer mortality benefit is strong enough for population recommendations from ages 40 to 74. Uncertainty is higher for supplemental imaging, screening after 74, annual versus biennial intervals, and overdiagnosis estimates.",
		searchCutoffAt: "2026-07-02T23:32:58.000Z",
		lastRetractionCheckAt: "2026-07-02T23:32:58.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:32:58.000Z",
				kind: "publication",
				summary:
					"Initial mammography screening claim page published from USPSTF, CDC, JAMA evidence report, and 2024 systematic-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Breast Cancer: Screening",
				publisher: "U.S. Preventive Services Task Force",
				year: 2024,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening",
				stance: "supports",
				note:
					"Primary U.S. recommendation source for biennial screening mammography from ages 40 to 74 and insufficient evidence for screening after 74 or supplemental imaging after negative mammography in dense breasts.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Screening for Breast Cancer",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/breast-cancer/screening/index.html",
				stance: "supports",
				note:
					"Current CDC public-facing source stating that regular mammograms can lower the risk of dying from breast cancer and summarizing USPSTF age and interval guidance.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Screening for Breast Cancer: Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2024,
				url: "https://doi.org/10.1001/jama.2023.25844",
				doi: "10.1001/jama.2023.25844",
				stance: "supports",
				note:
					"USPSTF evidence report stating that trials established mammography can reduce mortality risk, while comparative evidence on intervals, age limits, DBT, and supplemental imaging remains incomplete.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Screening for breast cancer: a systematic review update to inform the Canadian Task Force on Preventive Health Care guideline",
				publisher: "Systematic Reviews",
				year: 2024,
				url: "https://doi.org/10.1186/s13643-024-02700-3",
				doi: "10.1186/s13643-024-02700-3",
				stance: "supports",
				note:
					"Recent systematic review update reporting RCT evidence of a 15% relative reduction in breast-cancer mortality, with absolute benefits varying by age and uncertainty about benefit-harm details.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does folic acid before and early in pregnancy prevent neural tube defects?",
		slug: "does-folic-acid-before-and-early-in-pregnancy-prevent-neural-tube-defects",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. Daily folic acid supplementation before conception and during early pregnancy reduces the risk of neural tube defects such as spina bifida and anencephaly. The timing matters because the neural tube closes very early, often before someone knows they are pregnant.",
		stableCore: [
			"USPSTF gives an A recommendation that all people planning to or who could become pregnant take a daily supplement containing 0.4 to 0.8 mg (400 to 800 mcg) of folic acid.",
			"USPSTF says supplementation should start at least 1 month before anticipated conception and continue through the first 2 to 3 months of pregnancy to achieve benefit.",
			"CDC states that 400 mcg of folic acid daily can help prevent neural tube defects and that these defects happen in the first few weeks of pregnancy.",
			"A Cochrane review of five trials found daily folic acid, alone or with other vitamins and minerals, reduced neural tube defects compared with no folic acid, with a risk ratio of 0.31."
		],
		openQuestions: [
			"Which outreach and supplementation strategies best reach people before unplanned pregnancies, when the prevention window is easiest to miss?",
			"How should clinicians individualize higher-dose folic acid for people with a prior neural-tube-defect-affected pregnancy, certain antiseizure medications, malabsorption, diabetes, obesity, or other risk factors?",
			"How much additional prevention is gained by supplementation in countries that already fortify staple grains with folic acid, and which groups remain underserved by fortification?"
		],
		whatWouldChangeMinds: [
			"Large updated reviews showing that periconceptional folic acid supplementation does not reduce neural tube defects after accounting for fortification, timing, and baseline risk.",
			"Major USPSTF, CDC, WHO, or obstetric guideline revisions withdrawing routine folic acid supplementation recommendations for people who could become pregnant.",
			"High-quality evidence of harms from recommended-dose folic acid large enough to outweigh the neural-tube-defect prevention benefit."
		],
		misconceptions: [
			"Starting after a positive pregnancy test may be too late for full neural-tube-defect prevention because neural tube closure happens early.",
			"Food fortification helps, but it has not eliminated the need for daily supplements for people who could become pregnant.",
			"Standard-dose folic acid advice is not the same as high-risk dosing; people with prior affected pregnancies or certain medications need clinician-specific guidance."
		],
		editorSummary:
			"This page should be practical and time-sensitive. The consensus is strong that recommended-dose folic acid prevents neural tube defects, but the prevention window is easy to miss and high-risk situations need individualized medical advice.",
		uncertaintySummary:
			"The prevention claim is strong. Remaining uncertainty is mostly about implementation before unplanned pregnancies, the marginal effect in fortified-food settings, optimal strategies for higher-risk groups, and how to improve equitable access without overmedicalizing routine supplementation.",
		searchCutoffAt: "2026-07-03T21:11:11.000Z",
		lastRetractionCheckAt: "2026-07-03T21:11:11.000Z",
		changeLog: [
			{
				date: "2026-07-03T21:11:11.000Z",
				kind: "publication",
				summary:
					"Initial folic acid and neural tube defect prevention claim page published from USPSTF, CDC, WHO, JAMA evidence-review, and Cochrane sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Folic Acid Supplementation to Prevent Neural Tube Defects: Preventive Medication",
				publisher: "U.S. Preventive Services Task Force",
				year: 2023,
				url:
					"https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/folic-acid-for-the-prevention-of-neural-tube-defects-preventive-medication",
				stance: "supports",
				note:
					"Primary U.S. recommendation source for daily 0.4 to 0.8 mg folic acid for people planning to or able to become pregnant, starting at least 1 month before conception and continuing through early pregnancy.",
				order: 1
			},
			{
				kind: "guideline",
				title: "About Folic Acid",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/folic-acid/about/index.html",
				stance: "supports",
				note:
					"Current CDC public-health source explaining that 400 mcg of folic acid daily helps prevent neural tube defects and that the defects occur early in pregnancy.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Periconceptional folic acid supplementation to prevent neural tube defects",
				publisher: "World Health Organization",
				url: "https://www.who.int/tools/elena/interventions/folate-periconceptional",
				stance: "supports",
				note:
					"WHO recommendation that women take 400 mcg folic acid daily from the time they begin trying to conceive until 12 weeks of gestation, with high-dose guidance after an affected pregnancy.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
					"Folic Acid Supplementation to Prevent Neural Tube Defects: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2023,
				url: "https://jamanetwork.com/journals/jama/fullarticle/2807740",
				doi: "10.1001/jama.2023.9864",
				pmid: "37526714",
				stance: "supports",
				note:
					"USPSTF evidence update of 12 studies with 1,244,072 participants, finding new evidence consistent with benefit and no statistically significant harms for multiple gestation, autism, or maternal cancer.",
				order: 4
			},
			{
				kind: "systematic_review",
				title: "Effects and safety of periconceptional oral folate supplementation for preventing birth defects",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2015,
				url: "https://doi.org/10.1002/14651858.CD007950.pub3",
				doi: "10.1002/14651858.CD007950.pub3",
				pmid: "26662928",
				pmcid: "PMC8783750",
				stance: "supports",
				note:
					"Cochrane review of five trials and 6,708 births with NTD outcome data, finding daily folic acid reduced neural tube defects compared with no folic acid.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does low-dose CT screening reduce lung cancer deaths in high-risk adults?",
		slug: "does-low-dose-ct-screening-reduce-lung-cancer-deaths-in-high-risk-adults",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"Yes, in carefully selected high-risk adults. Low-dose CT screening reduces lung-cancer deaths among people with substantial smoking history, but it is not a general-population screening test. It can also produce false positives, incidental findings, overdiagnosis, radiation exposure, and invasive follow-up procedures, so eligibility and shared decision-making matter.",
		stableCore: [
			"USPSTF recommends annual low-dose CT screening for adults aged 50 to 80 who have at least a 20 pack-year smoking history and currently smoke or quit within the past 15 years.",
			"USPSTF says screening should stop once a person has not smoked for 15 years or develops a health problem that substantially limits life expectancy or ability to have lung surgery.",
			"The National Lung Screening Trial randomized 53,454 high-risk people and found low-dose CT reduced lung-cancer mortality by 20% compared with chest radiography.",
			"The 2021 USPSTF evidence review found the NLST and NELSON trials both reduced lung-cancer mortality, but also documented false positives, invasive follow-up, overdiagnosis, incidental findings, distress, and rare radiation-induced cancer risk."
		],
		openQuestions: [
			"Can risk-prediction models outperform simple age and pack-year criteria while improving equity and avoiding over-screening?",
			"How should screening programs optimize nodule management so fewer false positives lead to unnecessary invasive procedures?",
			"How can screening visits be paired with smoking-cessation support, since screening does not prevent most lung cancer deaths?"
		],
		whatWouldChangeMinds: [
			"Large replicated randomized evidence showing no lung-cancer mortality reduction from well-implemented LDCT screening in high-risk adults.",
			"Major USPSTF, NCI, CDC, or specialty-society reassessments withdrawing LDCT screening recommendations for the current high-risk eligibility group.",
			"Evidence that modern LDCT screening harms outweigh mortality benefits even when eligibility, nodule management, and follow-up are guideline-concordant."
		],
		misconceptions: [
			"Low-dose CT screening is not recommended for everyone; the benefit is concentrated in people at high lung-cancer risk from smoking history and age.",
			"A negative CT scan does not make smoking safe, and screening is not a substitute for quitting.",
			"Most positive findings are not cancer, so a positive screen often means follow-up imaging or evaluation rather than a confirmed diagnosis."
		],
		editorSummary:
			"This page should pair the mortality result with the eligibility guardrails. LDCT is one of the rare cancer screening tests with randomized evidence for lung-cancer mortality reduction, but the public message needs to keep smoking cessation and false-positive harms visible.",
		uncertaintySummary:
			"The high-risk mortality benefit is strong. Remaining uncertainty is about best eligibility modeling, screening intervals after negative scans, follow-up protocols, equity, and implementation in real-world programs.",
		searchCutoffAt: "2026-07-02T23:32:58.000Z",
		lastRetractionCheckAt: "2026-07-02T23:32:58.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:32:58.000Z",
				kind: "publication",
				summary:
					"Initial low-dose CT lung-cancer screening claim page published from USPSTF, NCI NLST summary, JAMA evidence review, and NLST randomized-trial evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Lung Cancer: Screening",
				publisher: "U.S. Preventive Services Task Force",
				year: 2021,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/lung-cancer-screening",
				stance: "supports",
				note:
					"Primary U.S. recommendation source for annual LDCT screening in adults aged 50 to 80 with at least 20 pack-years who currently smoke or quit within 15 years.",
				order: 1
			},
			{
				kind: "context",
				title: "National Lung Screening Trial (NLST)",
				publisher: "National Cancer Institute",
				url: "https://www.cancer.gov/types/lung/research/nlst",
				stance: "supports",
				note:
					"NCI public summary reporting a 15% to 20% lower risk of lung-cancer death with low-dose helical CT compared with standard chest x-ray among high-risk participants.",
				order: 2
			},
			{
				kind: "systematic_review",
				title:
					"Screening for Lung Cancer With Low-Dose Computed Tomography: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2021,
				url: "https://doi.org/10.1001/jama.2021.0377",
				doi: "10.1001/jama.2021.0377",
				stance: "supports",
				note:
					"USPSTF evidence review finding the NLST and NELSON trials reduced lung-cancer mortality while also quantifying false positives, invasive follow-up, overdiagnosis, and incidental findings.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Reduced Lung-Cancer Mortality with Low-Dose Computed Tomographic Screening",
				publisher: "New England Journal of Medicine",
				year: 2011,
				url: "https://doi.org/10.1056/NEJMoa1102873",
				doi: "10.1056/NEJMoa1102873",
				stance: "supports",
				note:
					"NLST randomized trial of 53,454 high-risk participants finding a 20% relative reduction in lung-cancer mortality and a 6.7% all-cause mortality reduction with LDCT compared with chest radiography.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Should PSA screening for prostate cancer be routine for every older man?",
		slug: "should-psa-screening-for-prostate-cancer-be-routine-for-every-older-man",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"No. PSA screening can slightly reduce prostate-cancer death for some men aged 55 to 69, but the net benefit is small and depends strongly on values, life expectancy, baseline risk, and tolerance for false positives, biopsy harms, overdiagnosis, and treatment side effects. Current USPSTF guidance recommends individual decision-making from ages 55 to 69 and recommends against routine PSA screening at age 70 and older.",
		stableCore: [
			"USPSTF concludes that the net benefit of PSA-based screening for men aged 55 to 69 is small for some men and should be an individual decision after discussing benefits and harms.",
			"USPSTF recommends against PSA-based screening in men aged 70 and older because expected harms do not outweigh potential benefits.",
			"USPSTF estimates screening may prevent about 1.3 prostate-cancer deaths and about 3 metastatic prostate-cancer cases per 1000 men screened over roughly 13 years, with no all-cause mortality reduction in current trial results.",
			"The 2018 JAMA evidence review found PSA screening may reduce prostate-cancer mortality risk but is associated with false positives, biopsy complications, overdiagnosis, and urinary and sexual harms from treatment."
		],
		openQuestions: [
			"How should screening decisions change for men with higher baseline risk, including Black men, men with a strong family history, or men with germline cancer-risk variants?",
			"Can MRI, risk calculators, and newer biomarkers reduce unnecessary biopsies and overdiagnosis while preserving mortality benefit?",
			"What PSA thresholds, retesting intervals, and active-surveillance strategies best reduce overtreatment in modern practice?"
		],
		whatWouldChangeMinds: [
			"Strong evidence that routine PSA screening produces a large prostate-cancer or all-cause mortality benefit with much lower overdiagnosis and treatment-harm rates than current evidence suggests.",
			"Major USPSTF, CDC, NCI, or urology guideline revisions recommending routine PSA screening for all older men regardless of values, health status, and risk.",
			"Large modern trials showing risk-adapted PSA-plus-MRI screening clearly improves hard outcomes with a favorable harm profile across broad populations."
		],
		misconceptions: [
			"A PSA test is not a cancer diagnosis; elevated PSA can come from benign enlargement, inflammation, recent procedures, or other non-cancer causes.",
			"Finding more prostate cancers is not automatically better because some screen-detected cancers would never cause symptoms or death.",
			"Declining routine PSA screening after informed discussion is not the same as ignoring symptoms or refusing diagnostic evaluation when symptoms or high-risk findings exist."
		],
		editorSummary:
			"This page should model nuance. PSA screening is not quackery and not a slam dunk: it can prevent a small number of prostate-cancer deaths for some men, but routine population-style testing creates enough downstream harm that shared decision-making is the consensus position.",
		uncertaintySummary:
			"The broad consensus is against routine PSA screening for every older man and for individualized decisions from ages 55 to 69. Uncertainty remains around higher-risk groups, MRI-based pathways, newer biomarkers, and modern active-surveillance strategies.",
		searchCutoffAt: "2026-07-02T23:32:58.000Z",
		lastRetractionCheckAt: "2026-07-02T23:32:58.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:32:58.000Z",
				kind: "publication",
				summary:
					"Initial PSA screening claim page published from USPSTF, CDC, and 2018 JAMA evidence-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Prostate Cancer: Screening",
				publisher: "U.S. Preventive Services Task Force",
				year: 2018,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening",
				stance: "supports",
				note:
					"Primary U.S. recommendation source for shared decision-making from ages 55 to 69, against routine screening at age 70 and older, and quantified small benefit estimates.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Should I Get Screened for Prostate Cancer?",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/prostate-cancer/screening/get-screened.html",
				stance: "supports",
				note:
					"Current CDC public-facing source summarizing USPSTF guidance, individual decision-making for ages 55 to 69, no routine screening after 70, and the main screening harms.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Prostate-Specific Antigen-Based Screening for Prostate Cancer: Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2018,
				url: "https://doi.org/10.1001/jama.2018.3712",
				doi: "10.1001/jama.2018.3712",
				stance: "supports",
				note:
					"USPSTF evidence review finding possible prostate-cancer mortality reduction but also false positives, biopsy complications, overdiagnosis, and sexual and urinary harms from active treatment.",
				order: 3
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does quitting smoking reduce health risks even after years of smoking?",
		slug: "does-quitting-smoking-reduce-health-risks-even-after-years-of-smoking",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. Quitting smoking reduces the risk of premature death, heart disease, stroke, lung disease, and many cancers, even for people who have smoked for years. Earlier quitting produces the largest benefit, but quitting at any age is better than continuing to smoke.",
		stableCore: [
			"CDC states that quitting smoking is one of the most important actions people can take to improve health, regardless of age or smoking duration.",
			"The 2020 Surgeon General report concluded that smoking cessation reduces risk of premature death and adds as much as a decade to life expectancy.",
			"A 2024 pooled cohort study of 1.48 million adults found current smokers had roughly 12 to 13 fewer years of survival from ages 40 to 79 than never-smokers, while cessation at every age was associated with longer survival.",
			"Cardiovascular benefits persist even when people gain weight after quitting; a meta-analysis found lower cardiovascular disease risk among quitters with or without post-cessation weight gain."
		],
		openQuestions: [
			"Which cessation supports work best for people with different nicotine dependence, mental health, pregnancy, or socioeconomic contexts?",
			"How should clinicians communicate lingering lung-cancer risk after quitting while still emphasizing that quitting reduces risk substantially?",
			"What mix of medications, counseling, quitlines, text support, and policy changes best sustains long-term abstinence?"
		],
		whatWouldChangeMinds: [
			"Large replicated cohort evidence showing no reduction in mortality or major disease risk after smoking cessation compared with continued smoking.",
			"Major CDC, Surgeon General, WHO, or National Academies reassessments concluding that cessation does not materially improve health outcomes.",
			"Evidence that common cessation treatments cause harms large enough to outweigh the benefits of stopping combustible tobacco use."
		],
		misconceptions: [
			"'The damage is already done' is wrong; risk starts improving after quitting even though some excess risk can persist.",
			"Cutting down is not the same as quitting; complete cessation is the clearest route to lowering mortality and cardiovascular risk.",
			"Weight gain after quitting can matter, but it usually does not erase the cardiovascular benefit of stopping smoking."
		],
		editorSummary:
			"This page should be both blunt and hopeful: smoking causes major disease, but quitting is one of the highest-value health changes available, and the benefit is not limited to young or light smokers.",
		uncertaintySummary:
			"The direction of benefit is settled. Uncertainty is mostly about individual risk trajectories, the best cessation support for different people, and how fast each disease-specific risk approaches that of never-smokers.",
		searchCutoffAt: "2026-07-02T23:13:42.000Z",
		lastRetractionCheckAt: "2026-07-02T23:13:42.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:13:42.000Z",
				kind: "publication",
				summary:
					"Initial smoking-cessation health-risk claim page published from CDC, Surgeon General, NEJM Evidence pooled cohort, and cardiovascular meta-analysis sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Benefits of Quitting Smoking",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/tobacco/about/benefits-of-quitting.html",
				stance: "supports",
				note:
					"Current CDC public-health source summarizing the health benefits of quitting regardless of age or smoking history.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Smoking Cessation: A Report of the Surgeon General",
				publisher: "U.S. Surgeon General",
				year: 2020,
				url: "https://www.hhs.gov/surgeongeneral/reports-and-publications/tobacco/index.html",
				stance: "supports",
				note:
					"Federal evidence-review anchor concluding that smoking cessation reduces premature death, improves health, and can add as much as a decade to life expectancy.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Smoking Cessation and Short- and Longer-Term Mortality",
				publisher: "NEJM Evidence",
				year: 2024,
				url: "https://doi.org/10.1056/EVIDoa2300272",
				doi: "10.1056/EVIDoa2300272",
				stance: "supports",
				note:
					"Pooled national-cohort study of 1.48 million adults quantifying survival loss from current smoking and survival gains after cessation at multiple ages.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Smoking cessation, weight gain, cardiovascular risk, and all-cause mortality",
				publisher: "Nicotine & Tobacco Research",
				year: 2021,
				url: "https://doi.org/10.1093/ntr/ntab076",
				doi: "10.1093/ntr/ntab076",
				stance: "supports",
				note:
					"Meta-analysis showing lower cardiovascular disease and all-cause mortality risk among quitters compared with continuing smokers, even with post-cessation weight gain.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does HIV cause AIDS?",
		slug: "does-hiv-cause-aids",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. HIV infection causes AIDS when the virus is not controlled and immune damage becomes severe. AIDS is the late, most severe stage of HIV infection, not a separate unrelated disease. Modern antiretroviral therapy can suppress HIV, preserve or restore immune function, prevent progression for most people who can access and adhere to treatment, and prevent sexual transmission when viral suppression is sustained.",
		stableCore: [
			"NIH HIVinfo says untreated HIV advances in stages, destroys CD4 immune cells, and can eventually cause AIDS.",
			"CDC says HIV attacks the immune system and, without treatment, can cause AIDS; CDC also defines AIDS by severe immune damage such as CD4 count below 200 cells/mm3 or specified opportunistic illnesses.",
			"WHO says CD4 counts progressively decrease over time in people not receiving or not responding well to ART, and that a CD4 count below 200 leaves immunity severely compromised.",
			"U.S. HIV treatment guidelines recommend ART for all people with HIV to reduce morbidity and mortality and to prevent transmission, with initiation as soon as possible after diagnosis.",
			"Evidence synthesis of untreated HIV cohorts found median untreated survival after seroconversion fell with older age, from about 12.5 years at ages 15 to 24 to about 7.2 years at ages 45 to 54."
		],
		openQuestions: [
			"How can testing, linkage to care, drug access, adherence support, and stigma reduction reach people before immune damage becomes advanced?",
			"How should clinicians explain rare elite controllers or long-term nonprogressors without implying that untreated HIV is usually harmless?",
			"How can long-term treated HIV care address residual inflammation, comorbidities, mental health, aging, drug resistance, and treatment interruptions?"
		],
		whatWouldChangeMinds: [
			"Repeated, high-quality natural-history evidence showing that untreated HIV infection does not predict progressive CD4 loss, opportunistic illness, or excess mortality.",
			"Major CDC, NIH, WHO, IAS-USA, or comparable guideline revisions withdrawing HIV as the cause of AIDS or withdrawing ART as the central treatment for HIV infection.",
			"A stronger causal model explaining AIDS epidemiology, CD4 depletion, viral load, opportunistic infections, treatment response, and mother-to-child or bloodborne transmission without HIV."
		],
		misconceptions: [
			"Testing positive for HIV does not mean a person already has AIDS; AIDS is the most severe stage of HIV infection.",
			"Feeling well for years after infection does not prove HIV is harmless, because untreated chronic HIV can progress slowly before advanced immune damage appears.",
			"Rare long-term nonprogressors and elite controllers are important scientifically, but they are exceptions and still need clinical monitoring.",
			"The success of ART is evidence that controlling HIV changes the disease course, not evidence that HIV is irrelevant."
		],
		editorSummary:
			"This page should be a calm foundation for the site's HIV cluster: HIV causes AIDS, AIDS is the severe late stage, and modern ART turns the causal pathway into a preventable clinical outcome for many people when care is accessible and sustained.",
		uncertaintySummary:
			"The causal claim is settled. Remaining uncertainty is about implementation, individual progression speed, long-term treated comorbidity risk, immune recovery after late treatment, resistance, and how best to reach people before advanced HIV disease.",
		searchCutoffAt: "2026-07-04T04:15:38.000Z",
		lastRetractionCheckAt: "2026-07-04T04:15:38.000Z",
		changeLog: [
			{
				date: "2026-07-04T04:15:38.000Z",
				kind: "publication",
				summary:
					"Initial HIV-causes-AIDS claim page published from current CDC, NIH, WHO, U.S. treatment-guideline, and untreated natural-history evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "The Stages of HIV Infection",
				publisher: "NIH HIVinfo",
				year: 2025,
				url: "https://hivinfo.nih.gov/understanding-hiv/fact-sheets/stages-hiv-infection",
				stance: "supports",
				note:
					"NIH public-health anchor stating that untreated HIV destroys CD4 cells, advances through acute and chronic infection to AIDS, and can be slowed or prevented from progressing with ART.",
				order: 1
			},
			{
				kind: "guideline",
				title: "About HIV",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/hiv/about/index.html",
				stance: "supports",
				note:
					"CDC public-health anchor for HIV attacking the immune system, causing AIDS without treatment, and AIDS being defined by severe immune damage or opportunistic illnesses.",
				order: 2
			},
			{
				kind: "guideline",
				title: "HIV",
				publisher: "World Health Organization",
				url: "https://www.who.int/health-topics/hiv-aids",
				stance: "supports",
				note:
					"WHO source for HIV attacking CD4 cells, CD4 decline in people not receiving or responding to ART, severe immune compromise below 200 cells/mm3, and lifelong ART suppressing replication.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Initiation of Antiretroviral Therapy",
				publisher: "NIH ClinicalInfo HIV.gov",
				year: 2026,
				url:
					"https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/initiation-antiretroviral-therapy",
				stance: "supports",
				note:
					"Current U.S. treatment-guideline source recommending ART for all people with HIV to reduce morbidity and mortality and prevent transmission, with initiation as soon as possible after diagnosis.",
				order: 4
			},
			{
				kind: "systematic_review",
				title:
					"Disease progression and mortality with untreated HIV infection: evidence synthesis of HIV seroconverter cohorts, antiretroviral treatment clinical cohorts and population-based survey data",
				publisher: "Journal of the International AIDS Society",
				year: 2021,
				url: "https://doi.org/10.1002/jia2.25784",
				doi: "10.1002/jia2.25784",
				pmid: "34546644",
				stance: "supports",
				note:
					"Evidence synthesis estimating untreated HIV natural history from seroconverter cohorts, ART cohorts, and population survey CD4 data; found shorter untreated survival with older age at seroconversion.",
				order: 5
			},
			{
				kind: "systematic_review",
				title: "HIV infection",
				publisher: "Nature Reviews Disease Primers",
				year: 2023,
				url: "https://doi.org/10.1038/s41572-023-00452-3",
				doi: "10.1038/s41572-023-00452-3",
				pmid: "37591865",
				stance: "supports",
				note:
					"Recent disease-primer review source for HIV pathogenesis, progression to AIDS, ART-mediated viral suppression, immune recovery, and remaining long-term care issues.",
				order: 6
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does PrEP prevent HIV infection when taken as prescribed?",
		slug: "does-prep-prevent-hiv-infection-when-taken-as-prescribed",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. HIV pre-exposure prophylaxis, or PrEP, is highly effective at preventing HIV when taken as prescribed. It does not protect against other sexually transmitted infections, and effectiveness depends on choosing an appropriate product, confirming HIV-negative status before starting, and maintaining adherence or injection schedules.",
		stableCore: [
			"CDC says PrEP reduces the risk of getting HIV from sex by about 99% when taken as prescribed and reduces HIV risk from injection drug use by at least 74% for oral PrEP.",
			"Randomized-trial meta-analysis shows oral tenofovir-containing PrEP reduces HIV acquisition in several high-risk populations, with efficacy strongly associated with adherence.",
			"A 2024 pooled analysis of 72 global daily oral F/TDF PrEP studies found low HIV incidence overall and much lower incidence among people with higher measured adherence.",
			"Long-acting injectable cabotegravir is also highly effective; meta-analysis found lower HIV acquisition compared with oral PrEP in efficacy studies, while noting implementation and resistance-monitoring issues."
		],
		openQuestions: [
			"How can programs improve equitable access and adherence for groups with high HIV risk but lower PrEP uptake?",
			"How should clinicians choose among daily oral PrEP, on-demand oral PrEP where appropriate, and long-acting injectable PrEP?",
			"How should programs monitor kidney, bone, hepatitis B, pregnancy, drug resistance, and STI risks without creating access barriers?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled evidence showing no meaningful HIV prevention benefit from guideline-concordant PrEP use with confirmed adherence.",
			"Major CDC, WHO, NIH, or infectious-disease guideline reassessments withdrawing PrEP as a recommended HIV prevention strategy.",
			"Evidence that drug resistance, adverse effects, or implementation harms outweigh the HIV infections prevented in indicated populations."
		],
		misconceptions: [
			"PrEP is prevention for people who are HIV-negative; it is not HIV treatment by itself.",
			"PrEP does not prevent syphilis, gonorrhea, chlamydia, hepatitis C, or pregnancy, so condoms, testing, and other prevention tools can still matter.",
			"PrEP effectiveness numbers assume adherence; missed pills, missed injections, or starting during undetected acute HIV infection change the risk picture."
		],
		editorSummary:
			"This page should make a lifesaving prevention tool visible without turning it into a magic shield. The consensus is strong that PrEP works, and the practical caveat is that adherence, testing, and comprehensive sexual-health care matter.",
		uncertaintySummary:
			"The core effectiveness claim is strong. Remaining uncertainty is about real-world implementation, adherence support, product choice, resistance after breakthrough infection, pregnancy data for newer products, and access inequities.",
		searchCutoffAt: "2026-07-02T23:13:42.000Z",
		lastRetractionCheckAt: "2026-07-02T23:13:42.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:13:42.000Z",
				kind: "publication",
				summary:
					"Initial HIV PrEP effectiveness claim page published from CDC guidance, oral PrEP randomized-trial meta-analysis, pooled global F/TDF studies, and injectable cabotegravir evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "About PrEP",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/hiv/prevention/prep.html",
				stance: "supports",
				note:
					"Current CDC public-health anchor for PrEP reducing HIV risk from sex by about 99% when taken as prescribed and reducing injection-related risk with oral PrEP.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Clinical Guidance for PrEP",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/hivnexus/hcp/prep/index.html",
				stance: "supports",
				note:
					"Clinical implementation source for PrEP eligibility, HIV testing before initiation, ongoing monitoring, oral options, and injectable cabotegravir.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"Oral pre-exposure prophylaxis (PrEP) to prevent HIV: a systematic review and meta-analysis of clinical effectiveness, safety, adherence and risk compensation in all populations",
				publisher: "BMJ Open",
				year: 2021,
				url: "https://doi.org/10.1136/bmjopen-2020-048478",
				doi: "10.1136/bmjopen-2020-048478",
				stance: "supports",
				note:
					"Meta-analysis of 15 randomized trials and more than 25,000 participants; PrEP was effective in key high-risk populations and efficacy was strongly associated with adherence.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Type 1 Human Immunodeficiency Virus (HIV-1) Incidence, Adherence, and Drug Resistance in Individuals Taking Daily Emtricitabine/Tenofovir Disoproxil Fumarate for HIV-1 Pre-exposure Prophylaxis",
				publisher: "Clinical Infectious Diseases",
				year: 2024,
				url: "https://doi.org/10.1093/cid/ciae143",
				doi: "10.1093/cid/ciae143",
				stance: "supports",
				note:
					"Pooled analysis of 72 global studies showing daily oral F/TDF PrEP is safe and highly effective across diverse settings, with measured adherence strongly tied to incidence.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Safety and efficacy of long-acting injectable cabotegravir as preexposure prophylaxis to prevent HIV acquisition",
				publisher: "AIDS",
				year: 2023,
				url: "https://doi.org/10.1097/QAD.0000000000003494",
				doi: "10.1097/QAD.0000000000003494",
				stance: "supports",
				note:
					"Systematic review and meta-analysis finding long-acting injectable cabotegravir highly efficacious compared with oral PrEP in efficacy studies, with resistance and pregnancy-data caveats.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does modern treatment cure hepatitis C for most people?",
		slug: "does-modern-treatment-cure-hepatitis-c-for-most-people",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. Modern direct-acting antiviral medicines cure hepatitis C for more than 95% of people who receive appropriate treatment, usually with 8 to 12 weeks of oral medication. The main public-health problem is no longer whether cure is possible, but whether people are tested, linked to care, treated, and protected from reinfection.",
		stableCore: [
			"CDC states that hepatitis C can be cured in more than 95% of cases with 8 to 12 weeks of well-tolerated oral direct-acting antiviral treatment.",
			"WHO states that direct-acting antiviral medicines can cure more than 95% of people with hepatitis C infection, while access to diagnosis and treatment remains low.",
			"AASLD/IDSA guidance strongly recommends universal DAA treatment for all people with acute or chronic HCV infection, with limited exceptions such as a short life expectancy that cannot be improved by HCV therapy or related care.",
			"The USPSTF evidence review found pooled sustained virologic response rates greater than 95% across genotypes for DAA regimens, with low short-term serious-adverse-event and withdrawal rates."
		],
		openQuestions: [
			"How can screening, confirmatory RNA testing, and same-day linkage to treatment be made routine enough to close the diagnosis and treatment gap?",
			"Which delivery models best reach people who inject drugs, people in correctional settings, people without stable insurance or housing, and other groups with high HCV burden?",
			"How should systems monitor reinfection, hepatitis B reactivation risk, pregnancy considerations, advanced liver disease, and drug interactions without making treatment harder to access?"
		],
		whatWouldChangeMinds: [
			"Large updated evidence showing that recommended DAA regimens no longer achieve high sustained virologic response rates across the major treated HCV populations.",
			"Major CDC, WHO, AASLD, or IDSA guideline revisions withdrawing DAA treatment as the standard curative therapy for most people with hepatitis C.",
			"Evidence that treatment harms, resistance, or reinfection consequences outweigh the benefits of curing HCV infection in the populations now recommended for therapy."
		],
		misconceptions: [
			"Hepatitis C is often treated as inevitably chronic, but most treated infections can now be cured.",
			"A positive antibody test does not prove current infection; confirmatory HCV RNA testing is needed to know whether treatment is needed.",
			"Cure is not the same as immunity. People can be reinfected after successful treatment, so prevention and follow-up still matter."
		],
		editorSummary:
			"This page should make the modern treatment shift explicit: hepatitis C moved from a hard-to-treat chronic infection to one that is usually curable, but testing, access, reinfection prevention, and liver follow-up remain the practical bottlenecks.",
		uncertaintySummary:
			"The curability claim is strong for guideline-recommended DAA treatment. Remaining uncertainty is mainly about implementation, access, reinfection, special populations, drug interactions, and long-term outcomes after cure in people with advanced liver disease.",
		searchCutoffAt: "2026-07-03T21:03:45.000Z",
		lastRetractionCheckAt: "2026-07-03T21:03:45.000Z",
		changeLog: [
			{
				date: "2026-07-03T21:03:45.000Z",
				kind: "publication",
				summary:
					"Initial hepatitis C treatment claim page published from CDC, WHO, AASLD/IDSA guidance, and USPSTF/JAMA evidence-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Clinical Care of Hepatitis C",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/hepatitis-c/hcp/clinical-care/index.html",
				stance: "supports",
				note:
					"Current CDC clinician-facing anchor stating that HCV can be cured in more than 95% of cases with 8 to 12 weeks of oral DAA treatment and that curative treatment is recommended for essentially everyone with hepatitis C.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Hepatitis C",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-c",
				stance: "supports",
				note:
					"Current WHO fact sheet stating that DAAs can cure more than 95% of people with hepatitis C infection, while diagnosis and treatment access remain low.",
				order: 2
			},
			{
				kind: "guideline",
				title:
					"AASLD/IDSA 2023 Clinical Practice Guidance Update for Testing, Managing, and Treating Hepatitis C Virus Infection",
				publisher: "AASLD/IDSA",
				year: 2023,
				url: "https://www.idsociety.org/practice-guideline/hcv-guidance/",
				stance: "supports",
				note:
					"Specialty-society guidance strongly recommending universal DAA treatment for acute or chronic HCV infection, with narrow exceptions, and emphasizing simplified treatment models.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
					"Screening for Hepatitis C Virus Infection in Adolescents and Adults: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2020,
				url: "https://jamanetwork.com/journals/jama/fullarticle/2762185",
				doi: "10.1001/jama.2019.20788",
				pmid: "32119034",
				stance: "supports",
				note:
					"USPSTF evidence review finding pooled SVR rates greater than 95% across genotypes for DAA regimens, low short-term serious adverse events, and better outcomes among people who achieve SVR.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does treating high blood pressure reduce the risk of stroke and heart disease?",
		slug: "does-treating-high-blood-pressure-reduce-the-risk-of-stroke-and-heart-disease",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. Lowering high blood pressure through lifestyle changes and, when indicated, medication reduces the risk of stroke, heart attack, heart failure, and premature death. The size of the benefit depends on baseline cardiovascular risk, achieved blood-pressure reduction, treatment tolerance, and adherence.",
		stableCore: [
			"WHO describes hypertension as common, serious when untreated, and a major cause of premature death; its current fact sheet says reducing hypertension prevents heart attack, stroke, kidney damage, and other health problems.",
			"CDC reports that nearly half of U.S. adults have high blood pressure and that taking steps to prevent and control it can lower the risk of heart disease and stroke.",
			"A Lancet meta-analysis of 123 blood-pressure-lowering trials with 613,815 participants found that each 10 mm Hg reduction in systolic blood pressure significantly reduced major cardiovascular events, coronary heart disease, stroke, heart failure, and all-cause mortality.",
			"An individual participant-level meta-analysis from the Blood Pressure Lowering Treatment Trialists' Collaboration found that a 5 mm Hg systolic reduction reduced major cardiovascular events by about 10% across primary and secondary prevention populations."
		],
		openQuestions: [
			"Which blood-pressure target is best for a specific person given age, frailty, kidney disease, diabetes, prior cardiovascular disease, medication side effects, and fall risk?",
			"How can health systems improve long-term blood-pressure control in groups with poor access, low diagnosis rates, or low medication adherence?",
			"Which combinations of team-based care, home monitoring, lifestyle support, and medication protocols achieve the largest real-world risk reductions?"
		],
		whatWouldChangeMinds: [
			"Large replicated randomized evidence showing that guideline-concordant blood-pressure reduction does not reduce stroke or cardiovascular events in people with hypertension or elevated cardiovascular risk.",
			"Major WHO, CDC, AHA/ACC, or USPSTF reassessments concluding that blood-pressure treatment does not materially lower cardiovascular risk.",
			"Evidence that harms from standard blood-pressure management outweigh cardiovascular benefits across most indicated populations."
		],
		misconceptions: [
			"High blood pressure often has no symptoms, so feeling well does not mean risk is low.",
			"Medication is not a substitute for lifestyle changes in every case, but lifestyle changes alone are also not enough for everyone.",
			"Lower is not automatically better for every person; targets should reflect overall cardiovascular risk and the chance of adverse effects."
		],
		editorSummary:
			"This page should make hypertension feel like a practical prevention issue rather than an abstract vital sign. The consensus is strong that treating high blood pressure reduces cardiovascular risk, while individualized targets and access remain the hard implementation questions.",
		uncertaintySummary:
			"The direction of benefit is high-certainty. Remaining uncertainty is about individualized targets, drug choice, side-effect tradeoffs, adherence, and delivery models that close control gaps.",
		searchCutoffAt: "2026-07-02T23:24:05.000Z",
		lastRetractionCheckAt: "2026-07-02T23:24:05.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:24:05.000Z",
				kind: "publication",
				summary:
					"Initial high-blood-pressure treatment claim page published from WHO, CDC, Lancet trial meta-analysis, and Blood Pressure Lowering Treatment Trialists' Collaboration sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Hypertension",
				publisher: "World Health Organization",
				year: 2025,
				url: "https://www.who.int/news-room/fact-sheets/detail/hypertension",
				stance: "supports",
				note:
					"Current WHO public-health anchor for hypertension prevalence, complications, treatment, and the statement that reducing hypertension prevents heart attack, stroke, kidney damage, and other health problems.",
				order: 1
			},
			{
				kind: "context",
				title: "High Blood Pressure Facts",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/high-blood-pressure/data-research/facts-stats/index.html",
				stance: "supports",
				note:
					"Current CDC U.S. burden and prevention source reporting nearly half of adults have high blood pressure and that control lowers heart disease and stroke risk.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Blood pressure lowering for prevention of cardiovascular disease and death: a systematic review and meta-analysis",
				publisher: "Lancet",
				year: 2016,
				url: "https://doi.org/10.1016/S0140-6736(15)01225-8",
				doi: "10.1016/S0140-6736(15)01225-8",
				stance: "supports",
				note:
					"Meta-analysis of 123 trials and 613,815 participants finding lower risk of major cardiovascular events, coronary heart disease, stroke, heart failure, and all-cause mortality per 10 mm Hg systolic reduction.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Pharmacological blood pressure lowering for primary and secondary prevention of cardiovascular disease across different levels of blood pressure",
				publisher: "Lancet",
				year: 2021,
				url: "https://doi.org/10.1016/S0140-6736(21)00590-0",
				doi: "10.1016/S0140-6736(21)00590-0",
				stance: "supports",
				note:
					"Individual participant-level meta-analysis of 344,716 participants from 48 randomized trials finding about a 10% lower major cardiovascular-event risk per 5 mm Hg systolic reduction.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do statins reduce heart attacks and strokes for people at elevated cardiovascular risk?",
		slug: "do-statins-reduce-heart-attacks-and-strokes-for-people-at-elevated-cardiovascular-risk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 93,
		bottomLine:
			"Yes, for appropriately selected adults at elevated cardiovascular risk. Statins reduce heart attacks, strokes, and composite cardiovascular events, with larger absolute benefit as baseline risk rises. They are not automatically indicated for every low-risk adult, and evidence is less certain for starting statins after age 75 without known cardiovascular disease.",
		stableCore: [
			"USPSTF recommends prescribing a statin for adults aged 40 to 75 who have at least one cardiovascular risk factor and an estimated 10-year cardiovascular disease risk of 10% or greater.",
			"USPSTF recommends selectively offering a statin to similar adults with estimated 10-year risk from 7.5% to less than 10%, because the expected benefit is smaller.",
			"The 2022 USPSTF evidence review included 22 statin-versus-control trials with 90,624 participants and found significantly lower risk of all-cause mortality, stroke, myocardial infarction, and composite cardiovascular outcomes.",
			"The same evidence review did not find a statistically significant increase in serious adverse events or myalgias overall, while noting sparse evidence for adults older than 75 and a diabetes signal in one high-intensity statin trial."
		],
		openQuestions: [
			"How should statin decisions be individualized for adults older than 75 without known cardiovascular disease?",
			"How should clinicians weigh absolute risk reduction, patient preferences, pill burden, side effects, diabetes risk, pregnancy considerations, and drug interactions?",
			"Which decision aids and risk calculators best support equitable statin use without overtreating very low-risk people?"
		],
		whatWouldChangeMinds: [
			"Large randomized evidence showing that statins do not reduce myocardial infarction, stroke, or composite cardiovascular events in adults at elevated baseline risk.",
			"Major USPSTF, ACC/AHA, or comparable guideline revisions withdrawing statins as preventive medication for adults with elevated cardiovascular risk.",
			"Evidence that common statin harms are substantially larger than currently estimated and outweigh cardiovascular benefits in guideline-indicated groups."
		],
		misconceptions: [
			"Statins are sometimes framed as either necessary for everyone or useful for no one; the evidence-based answer depends heavily on baseline cardiovascular risk.",
			"A relative risk reduction is not the same as an absolute benefit; people at higher baseline risk generally gain more absolute benefit.",
			"Muscle symptoms can occur and should be taken seriously, but blinded trial evidence does not support the idea that severe statin harms are common for most indicated users."
		],
		editorSummary:
			"This page should avoid the usual all-or-nothing statin fight. The consensus is strong that statins reduce cardiovascular events in elevated-risk adults; the practical judgment is who crosses the risk threshold where the absolute benefit is worth daily medication.",
		uncertaintySummary:
			"The risk-reduction claim is strong for adults aged 40 to 75 at elevated cardiovascular risk. Uncertainty is greater for starting statins after age 75 without prior cardiovascular disease, for very low-risk adults, and for individual tolerance.",
		searchCutoffAt: "2026-07-02T23:24:05.000Z",
		lastRetractionCheckAt: "2026-07-02T23:24:05.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:24:05.000Z",
				kind: "publication",
				summary:
					"Initial statin primary-prevention claim page published from USPSTF recommendation and updated evidence-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Statin Use for the Primary Prevention of Cardiovascular Disease in Adults: Preventive Medication",
				publisher: "U.S. Preventive Services Task Force",
				year: 2022,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/statin-use-in-adults-preventive-medication",
				stance: "supports",
				note:
					"Primary U.S. recommendation source for prescribing statins to adults aged 40 to 75 with cardiovascular risk factors and sufficient estimated 10-year risk.",
				order: 1
			},
			{
				kind: "systematic_review",
				title:
					"Statin Use for the Primary Prevention of Cardiovascular Disease in Adults: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2022,
				url: "https://doi.org/10.1001/jama.2022.12138",
				doi: "10.1001/jama.2022.12138",
				stance: "supports",
				note:
					"Updated evidence review finding statins were associated with lower all-cause mortality, stroke, myocardial infarction, and composite cardiovascular outcomes in adults at increased risk without prior cardiovascular events.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Statins for the primary prevention of cardiovascular disease",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2013,
				url: "https://doi.org/10.1002/14651858.CD004816.pub5",
				doi: "10.1002/14651858.CD004816.pub5",
				stance: "supports",
				note:
					"Cochrane review finding lower all-cause mortality and major vascular events among primary-prevention participants treated with statins, while emphasizing benefit-harm assessment.",
				order: 3
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do medications for opioid use disorder reduce overdose deaths?",
		slug: "do-medications-for-opioid-use-disorder-reduce-overdose-deaths",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
				"Yes. Evidence-based medications for opioid use disorder, especially methadone and buprenorphine when people remain in treatment, substantially reduce overdose-related and overall mortality. They are medical treatment, not simply replacing one addiction with another. Naltrexone is also FDA-approved, but mortality evidence is less consistent and depends heavily on successful initiation and retention.",
		stableCore: [
			"CDC says medications for opioid use disorder include buprenorphine, methadone, and extended-release naltrexone, and that buprenorphine and methadone substantially reduce overdose-related and overall mortality.",
			"SAMHSA describes buprenorphine, methadone, and naltrexone as FDA-approved evidence-based OUD medications that relieve cravings and withdrawal, restore normal body functions, and do not just substitute one drug for another.",
			"A BMJ meta-analysis of cohort studies found much lower all-cause and overdose mortality while people were in methadone or buprenorphine treatment than when they were out of treatment.",
			"A JAMA Psychiatry systematic review and meta-analysis found all-cause mortality during opioid agonist treatment was less than half the mortality observed outside treatment, with lower drug-related mortality as well."
		],
		openQuestions: [
			"Which medication and delivery model works best for a specific patient, including people using fentanyl, people with unstable housing, pregnant patients, and people leaving jail or prison?",
			"How can health systems improve treatment retention and reduce risk during induction, missed doses, discontinuation, and transitions between care settings?",
			"How can access barriers, stigma, pharmacy stocking limits, prior authorization, treatment-program availability, and racial or geographic disparities be reduced?"
		],
		whatWouldChangeMinds: [
			"Large updated reviews showing that methadone and buprenorphine no longer reduce overdose-related or overall mortality when compared with no medication or non-medication treatment.",
			"Major CDC, SAMHSA, FDA, WHO, or addiction-medicine guideline revisions withdrawing medications as evidence-based OUD treatment.",
			"Strong evidence that harms from guideline-concordant methadone or buprenorphine treatment outweigh mortality and retention benefits for most indicated patients."
		],
		misconceptions: [
			"MOUD is often dismissed as replacing one addiction with another; public-health agencies describe these medications as evidence-based treatment that normalizes function and reduces cravings and overdose risk.",
			"Detoxification without ongoing medication can leave people at higher overdose risk after tolerance falls, especially after treatment interruption or release from controlled settings.",
			"Naloxone can reverse an overdose, but it is not a substitute for ongoing OUD treatment."
		],
		editorSummary:
				"This page should connect the naloxone rescue page to longer-term treatment. The strong consensus is that methadone and buprenorphine reduce mortality for people with OUD; the difficult questions are access, retention, medication choice, and safe transitions.",
		uncertaintySummary:
				"The mortality direction is strong for methadone and buprenorphine, mostly from large cohort evidence and systematic reviews because randomized withholding would often be unethical. Evidence differs by medication, with naltrexone more sensitive to successful induction and retention, and individual treatment choice should remain clinical and patient-centered.",
		searchCutoffAt: "2026-07-04T03:40:21.000Z",
		lastRetractionCheckAt: "2026-07-04T03:40:21.000Z",
		changeLog: [
			{
				date: "2026-07-04T03:40:21.000Z",
				kind: "publication",
				summary:
						"Initial MOUD mortality claim page published from CDC, SAMHSA, and mortality meta-analysis/cohort sources."
			}
		],
		sources: [
			{
				kind: "context",
				title: "Treatment for Opioid Use Disorder: Population Estimates — United States, 2022",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/mmwr/volumes/73/wr/mm7325a1.htm",
				stance: "supports",
				note:
						"MMWR anchor reporting that buprenorphine and methadone substantially reduce overdose-related and overall mortality, while only 25.1% of U.S. adults needing OUD treatment received medications in 2022.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Medications for Substance Use Disorders",
				publisher: "Substance Abuse and Mental Health Services Administration",
				year: 2025,
				url: "https://www.samhsa.gov/substance-use/treatment/options",
				stance: "supports",
				note:
						"Current SAMHSA treatment overview stating that buprenorphine, methadone, and naltrexone are FDA-approved evidence-based OUD medications that relieve cravings and withdrawal and do not just substitute one drug for another.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Mortality risk during and after opioid substitution treatment: systematic review and meta-analysis of cohort studies",
				publisher: "The BMJ",
				year: 2017,
				url: "https://doi.org/10.1136/bmj.j1550",
				doi: "10.1136/bmj.j1550",
				pmid: "28446428",
				pmcid: "PMC5421454",
				stance: "supports",
				note:
						"Meta-analysis of 19 cohorts finding substantially lower all-cause and overdose mortality during methadone and buprenorphine treatment than out of treatment, with high-risk periods around induction and after cessation.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
						"Association of Opioid Agonist Treatment With All-Cause Mortality and Specific Causes of Death Among People With Opioid Dependence",
				publisher: "JAMA Psychiatry",
				year: 2021,
				url: "https://doi.org/10.1001/jamapsychiatry.2021.0976",
				doi: "10.1001/jamapsychiatry.2021.0976",
				pmid: "34076676",
				stance: "supports",
				note:
						"Systematic review and meta-analysis of RCTs and cohort studies finding all-cause mortality during opioid agonist treatment was less than half that observed outside treatment, with lower drug-related mortality.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Medication for Opioid Use Disorder After Nonfatal Opioid Overdose and Association With Mortality",
				publisher: "Annals of Internal Medicine",
				year: 2018,
				url: "https://doi.org/10.7326/M17-3107",
				doi: "10.7326/M17-3107",
				pmid: "29913516",
				pmcid: "PMC6387681",
				stance: "supports",
				note:
						"Massachusetts cohort of 17,568 adults after nonfatal overdose finding methadone maintenance and buprenorphine were associated with lower all-cause and opioid-related mortality; naltrexone estimates were too sparse for confident conclusions.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does naloxone reverse opioid overdoses and save lives?",
		slug: "does-naloxone-reverse-opioid-overdoses-and-save-lives",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"Yes. Naloxone can rapidly reverse opioid overdose by blocking opioid effects and restoring breathing when given in time. It is a rescue medication, not treatment for opioid use disorder by itself, and emergency help is still needed because some opioids can outlast naloxone or require repeated doses.",
		stableCore: [
			"CDC says naloxone is a safe medication that can reverse overdose from opioids, including heroin and fentanyl, and that it can restore normal breathing within 2 to 3 minutes when breathing has slowed or stopped.",
			"CDC reports that nearly 80,000 U.S. drug overdose deaths in 2023 involved an opioid and that a potential bystander was present in nearly 43% of overdose deaths, making rapid access to naloxone a practical lifesaving tool.",
			"WHO says death following opioid overdose is preventable with basic life support and timely naloxone, and recommends making naloxone available to people likely to witness an opioid overdose.",
			"A systematic review of take-home naloxone programs found that the evidence met all nine Bradford Hill criteria, reduced overdose mortality among program participants and in the community, and had a low rate of adverse events."
		],
		openQuestions: [
			"Which distribution models best reach people most likely to witness an overdose before emergency responders arrive?",
			"How should programs adapt dosing, training, and follow-up for fentanyl, fentanyl analogues, polysubstance use, and long-acting opioids?",
			"How can naloxone distribution be paired with effective opioid-use-disorder treatment, housing support, and stigma reduction?"
		],
		whatWouldChangeMinds: [
			"Strong evidence showing naloxone does not reverse opioid-induced respiratory depression when administered correctly and in time.",
			"Large real-world evaluations showing take-home naloxone distribution fails to reduce overdose mortality despite adequate access, training, and use.",
			"Major CDC, WHO, FDA, or addiction-medicine guideline revisions concluding that naloxone access should no longer be a core overdose-prevention strategy."
		],
		misconceptions: [
			"Naloxone is not a way to get high and does not treat non-opioid overdoses, though CDC advises using it when overdose is suspected because it is unlikely to harm someone overdosing on another drug.",
			"Naloxone can wear off before some opioids do, so people still need emergency monitoring after it is given.",
			"Making naloxone available is harm reduction, not an endorsement of unsafe drug use; it keeps people alive long enough to receive care."
		],
		editorSummary:
			"This page should be practical and urgent. The consensus is strong that naloxone reverses opioid overdose and saves lives, while the implementation questions are access, training, repeat dosing, and linkage to longer-term treatment.",
		uncertaintySummary:
			"The pharmacologic reversal claim is high-certainty. Community mortality evidence is necessarily more observational because randomized withholding is ethically difficult, but systematic reviews and public-health agencies strongly support naloxone distribution.",
		searchCutoffAt: "2026-07-02T23:24:05.000Z",
		lastRetractionCheckAt: "2026-07-02T23:24:05.000Z",
		changeLog: [
			{
				date: "2026-07-02T23:24:05.000Z",
				kind: "publication",
				summary:
					"Initial naloxone overdose-reversal claim page published from CDC, WHO, and take-home naloxone systematic-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Lifesaving Naloxone",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/stop-overdose/caring/naloxone.html",
				stance: "supports",
				note:
					"Current CDC public-health anchor describing naloxone as safe, effective, available over the counter, and able to restore normal breathing within 2 to 3 minutes in opioid overdose.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Opioid overdose",
				publisher: "World Health Organization",
				year: 2025,
				url: "https://www.who.int/news-room/fact-sheets/detail/opioid-overdose",
				stance: "supports",
				note:
					"WHO anchor for timely naloxone plus basic life support preventing opioid-overdose death and for making naloxone available to likely overdose witnesses.",
				order: 2
			},
			{
				kind: "context",
				title: "Reverse Opioid Overdose to Prevent Death",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/overdose-prevention/reversing-overdose/index.html",
				stance: "supports",
				note:
					"CDC overdose-prevention source quantifying opioid involvement in overdose deaths and emphasizing bystander access to naloxone.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Are take-home naloxone programmes effective? Systematic review utilizing application of the Bradford Hill criteria",
				publisher: "Addiction",
				year: 2016,
				url: "https://doi.org/10.1111/add.13326",
				doi: "10.1111/add.13326",
				stance: "supports",
				note:
					"Systematic review of 22 observational studies finding take-home naloxone programs met Bradford Hill criteria, reduced overdose mortality, and had a low adverse-event rate.",
				order: 4
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
		title: "Is global sea level rise influenced year to year by climate cycles even as the long-term trend rises?",
		slug: "is-global-sea-level-rise-influenced-year-to-year-by-climate-cycles-even-as-the-long-term-trend-rises",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Global mean sea level has a strong long-term rising trend, but individual years can run above or below the expected path because El Nino, La Nina, ocean heat uptake, rainfall over land, ice melt, and land-water storage shift heat and water between the ocean and land. Short-term wiggles do not overturn the multi-decade rise.",
		stableCore: [
			"NASA describes global mean sea level as an integrative climate indicator whose long-term change is driven mainly by ice melt, thermal expansion, and land-water storage.",
			"NASA's 2024 analysis shows a year with faster-than-expected sea-level rise, mostly from thermal expansion, while also emphasizing that every year differs and the long-term rate is getting faster.",
			"Peer-reviewed evidence finds that interannual global mean sea-level variability is driven by both steric changes in ocean heat content and barystatic water-mass exchange between land and ocean, with both tied to ENSO variability.",
			"Earlier work found that correcting for interannual natural variability removes an apparent short-term slowdown, supporting the need to separate climate-cycle noise from the long-term warming signal."
		],
		openQuestions: [
			"How much will internal climate variability affect apparent five-year or decade-scale rates in the satellite record?",
			"How should public charts show uncertainty, acceleration, and short-term variability without encouraging cherry-picked trend windows?",
			"How will future changes in ENSO behavior, ocean heat uptake, ice-sheet mass loss, and land-water management affect regional and global variability?"
		],
		whatWouldChangeMinds: [
			"Independent sea-level budgets showing that interannual variability is not substantially tied to ocean heat content, land-water exchange, or ENSO-related processes.",
			"A sustained, multi-decade reversal in global mean sea level across satellite altimetry, tide gauges, and budget components.",
			"A major IPCC or NASA reassessment finding that short-term variability can explain the long-term satellite-era rise and acceleration."
		],
		misconceptions: [
			"A single year with a slower rise, faster rise, or temporary dip is sometimes treated as proof that the long-term trend has ended.",
			"El Nino and La Nina are sometimes framed as alternatives to climate change, even though they mostly modulate the year-to-year path around the longer trend.",
			"Global mean sea level is sometimes confused with local relative sea level, which also depends on land subsidence, uplift, currents, and coastal processes."
		],
		editorSummary:
			"This page should be a measurement-literacy companion to the main sea-level page. It should inoculate against cherry-picked annual changes while making clear that variability is real and scientifically useful.",
		uncertaintySummary:
			"The existence of short-term variability around a rising global mean trend is high-certainty. Uncertainty is mostly about the exact partitioning among thermal expansion, land-water storage, ice melt, and internal climate variability over short windows.",
		searchCutoffAt: "2026-07-03T13:42:00.000Z",
		lastRetractionCheckAt: "2026-07-03T13:42:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:42:00.000Z",
				kind: "publication",
				summary:
					"Initial sea-level variability page published from NASA sea-level explainers and interannual global mean sea-level literature."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Overview: Global Sea Level",
				publisher: "NASA Sea Level Change Portal",
				url: "https://sealevel.nasa.gov/understanding-sea-level/global-sea-level/overview/",
				stance: "supports",
				note:
					"NASA anchor explaining global mean sea level as a climate indicator and identifying ice melt, thermal expansion, and land-water storage as the major processes.",
				order: 1
			},
			{
				kind: "context",
				title: "NASA Analysis Shows Unexpected Amount of Sea Level Rise in 2024",
				publisher: "NASA Sea Level Change Portal",
				year: 2025,
				url:
					"https://sealevel.nasa.gov/news/282/nasa-analysis-shows-unexpected-amount-of-sea-level-rise-in-2024/",
				stance: "supports",
				note:
					"Recent NASA example showing year-to-year variability, a faster-than-expected 2024 rise, thermal-expansion dominance that year, and the continuing multi-decade acceleration.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Origin of interannual variability in global mean sea level",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2020,
				url: "https://doi.org/10.1073/pnas.1922190117",
				doi: "10.1073/pnas.1922190117",
				pmid: "32513709",
				stance: "supports",
				note:
					"Satellite, GRACE, and Argo analysis finding that steric ocean-heat changes and barystatic land-ocean water exchange explain most observed interannual global mean sea-level variability and are correlated with ENSO.",
				order: 3
			},
			{
				kind: "context",
				title: "The rate of sea-level rise",
				publisher: "Nature Climate Change",
				year: 2014,
				url: "https://doi.org/10.1038/nclimate2159",
				doi: "10.1038/nclimate2159",
				stance: "supports",
				note:
					"Earlier analysis showing that removing interannual natural variability eliminates an apparent recent slowdown, illustrating why short windows should not be read as trend reversals.",
				order: 4
			},
			{
				kind: "context",
				title: "Rate of Sea Level Rise Doubled over 30 Years, New Study Shows",
				publisher: "NASA Sea Level Change Portal",
				year: 2025,
				url:
					"https://sealevel.nasa.gov/news/280/rate-of-sea-level-rise-doubled-over-30-years-new-study-shows/",
				stance: "context",
				note:
					"NASA satellite-era context for the long-term trend: about 2.1 mm/year in 1993 rising to about 4.5 mm/year in 2023, driven primarily by warming and ice melt.",
				order: 5
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
		topicSlug: "climate-and-environment",
		title: "Has human influence increased the frequency of concurrent heatwaves and droughts?",
		slug: "has-human-influence-increased-the-frequency-of-concurrent-heatwaves-and-droughts",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, at the global scale, but with important regional caveats. IPCC AR6 has high confidence that human influence has increased the frequency of concurrent heatwaves and droughts. That does not mean every drought or every wildfire is caused by climate change; it means warming has shifted the odds toward more compound hot-and-dry conditions, which can amplify risks to crops, water supplies, ecosystems, energy, health, and fire weather.",
		stableCore: [
			"IPCC AR6 says the probability of compound events has likely increased because of human-induced climate change and will likely continue to increase with further warming.",
			"IPCC AR6 has high confidence that human influence has increased the frequency of concurrent heatwaves and droughts.",
			"Review evidence finds compound drought and hot extremes have increased across regional and global scales in recent decades, mainly because hot extremes have increased.",
			"Attribution modeling finds anthropogenic emissions increased the global likelihood of concurrent warm and dry months by about 2.7 times."
		],
		openQuestions: [
			"Which regions have the clearest observed signal versus the largest remaining role for natural variability, land management, irrigation, and atmospheric circulation?",
			"How should compound-event attribution handle different drought definitions, soil moisture, runoff, precipitation, vapor-pressure deficit, and time scales?",
			"Which adaptation strategies reduce the combined risk to crops, water, health, electricity demand, ecosystems, and fire conditions?"
		],
		whatWouldChangeMinds: [
			"Major IPCC or comparable reassessment downgrading the high-confidence attribution of concurrent heatwave and drought frequency to human influence.",
			"Global observational syntheses showing no increase in compound hot-and-dry events after accounting for measurement changes and natural variability.",
			"Climate-model and attribution evidence showing enhanced greenhouse forcing does not raise compound warm-dry risk."
		],
		misconceptions: [
			"Because droughts and heatwaves occurred naturally before industrial warming, people sometimes infer climate change has no role in today's changed odds.",
			"Some commentary treats every local dry spell as climate proof, even though attribution is stronger for broad frequency shifts than for every single event.",
			"Compound events are sometimes discussed as if heat and drought risks simply add together, when interactions can amplify impacts."
		],
		editorSummary:
			"This page should model careful climate-attribution language: globally strong and regionally qualified, focused on shifted odds and compounding impacts rather than simplistic blame for every event.",
		uncertaintySummary:
			"The IPCC-level conclusion is high-certainty for increased concurrent heatwave and drought frequency under human influence. Uncertainty is concentrated in regional details, drought definitions, land-surface feedbacks, and exact event-by-event attribution.",
		searchCutoffAt: "2026-07-03T13:02:17.000Z",
		lastRetractionCheckAt: "2026-07-03T13:02:17.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:02:17.000Z",
				kind: "publication",
				summary:
					"Initial compound heatwave/drought attribution page published from IPCC AR6 and compound-event review and attribution literature."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Weather and Climate Extreme Events in a Changing Climate",
				publisher: "IPCC",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-11/",
				doi: "10.1017/9781009157896.013",
				stance: "supports",
				note:
					"IPCC AR6 Chapter 11 anchor: likely increased probability of compound events, high confidence that concurrent heatwaves and droughts are becoming more frequent under enhanced greenhouse forcing, and high confidence in human influence on their frequency.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Compound droughts and hot extremes: Characteristics, drivers, changes, and impacts",
				publisher: "Earth-Science Reviews",
				year: 2022,
				url: "https://doi.org/10.1016/j.earscirev.2022.104241",
				doi: "10.1016/j.earscirev.2022.104241",
				stance: "supports",
				note:
					"Review source synthesizing compound drought and hot extremes; reports overall increases at regional and global scales, likely attributable to anthropogenic influence, with hot extremes the main driver.",
				order: 2
			},
			{
				kind: "context",
				title: "Intensified Likelihood of Concurrent Warm and Dry Months Attributed to Anthropogenic Climate Change",
				publisher: "Water Resources Research",
				year: 2022,
				url: "https://doi.org/10.1029/2021WR030411",
				doi: "10.1029/2021WR030411",
				stance: "supports",
				note:
					"CMIP6 attribution study found most regions experienced large increases in concurrent warm and dry months in historical simulations with human emissions, and a 2.7-fold global likelihood increase due to anthropogenic emissions.",
				order: 3
			},
			{
				kind: "context",
				title: "Anthropogenic climate change doubled the frequency of compound drought and heatwaves in low-income regions",
				publisher: "Communications Earth & Environment",
				year: 2024,
				url: "https://doi.org/10.1038/s43247-024-01894-7",
				doi: "10.1038/s43247-024-01894-7",
				stance: "context",
				note:
					"Recent inequality-focused attribution study reporting faster increases in compound drought-heatwave frequency in low-income regions and a detectable anthropogenic contribution over many of those regions.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Has human influence increased fire weather occurrence in some regions?",
		slug: "has-human-influence-increased-fire-weather-occurrence-in-some-regions",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, in some regions, with important caveats. IPCC AR6 has medium confidence that human influence has increased fire weather occurrence in some regions. Fire weather means hot, dry, and windy conditions that make fires easier to start and spread; actual wildfire damage also depends on fuels, ignition, land management, suppression, development patterns, and vulnerability.",
		stableCore: [
			"IPCC AR6 assesses medium confidence that fire weather conditions have become more probable in some regions and that human influence has increased fire weather occurrence in some regions.",
			"IPCC has high confidence that fire weather conditions will become more frequent in some regions at higher levels of global warming.",
			"A 2022 review concludes that climate change has exerted pervasive upward pressure on fire weather globally, while human and bioclimatic factors can override the relationship with burned area in some places.",
			"Modeling work finds that anthropogenic emergence of extreme fire weather indices was already detectable over about 22% of burnable land area by 2019 and expands with additional warming."
		],
		openQuestions: [
			"Which regions have the strongest observed attribution signal for fire weather versus burned area, fire severity, smoke exposure, and structural loss?",
			"How much do land management, suppression, fuel accumulation, ignition, invasive grasses, development in fire-prone areas, and Indigenous burning practices change local risk?",
			"How should public communication separate climate-driven fire weather from the many non-climate factors that determine whether a fire starts, spreads, or becomes disastrous?"
		],
		whatWouldChangeMinds: [
			"A major IPCC or comparable reassessment downgrading the conclusion that human influence has increased regional fire weather occurrence.",
			"Regional syntheses showing that observed fire-weather increases are not linked to warming, humidity, drought, wind, or greenhouse forcing after accounting for natural variability.",
			"Fire-weather models and observations showing no expansion of anthropogenic emergence with additional global warming."
		],
		misconceptions: [
			"Every wildfire is sometimes blamed entirely on climate change, even when ignition, fuel, and land-use factors are decisive.",
			"The opposite mistake treats arson, forest management, or natural ignition as evidence that climate cannot be changing fire weather.",
			"Global burned area trends can be misused as a simple proxy for climate-driven fire weather, even though savanna land-use changes and human suppression strongly affect total burned area."
		],
		editorSummary:
			"This page should hold the middle line: climate change has increased fire-weather risk in some regions, but fire outcomes are not climate-only. The public value is careful attribution language, not a one-cause wildfire story.",
		uncertaintySummary:
			"Agreement is broad but regionally qualified. The clearest signal is for fire weather, especially hot/dry conditions; uncertainty is larger for burned area, severity, smoke, structural loss, and individual events because fuels, ignitions, land management, suppression, and exposure can dominate local outcomes.",
		searchCutoffAt: "2026-07-03T13:42:00.000Z",
		lastRetractionCheckAt: "2026-07-03T13:42:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:42:00.000Z",
				kind: "publication",
				summary:
					"Initial fire-weather attribution page published from IPCC AR6 and fire-weather review and modeling literature."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Weather and Climate Extreme Events in a Changing Climate",
				publisher: "IPCC",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-11/",
				doi: "10.1017/9781009157896.013",
				stance: "supports",
				note:
					"IPCC AR6 Chapter 11 anchor for medium-confidence regional fire-weather attribution and high-confidence projection that fire weather will become more frequent in some regions at higher warming levels.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Global and Regional Trends and Drivers of Fire Under Climate Change",
				publisher: "Reviews of Geophysics",
				year: 2022,
				url: "https://doi.org/10.1029/2020RG000726",
				doi: "10.1029/2020RG000726",
				stance: "supports",
				note:
					"Review source finding globally pervasive increases in fire-weather frequency and extremity due to climate change during 1979-2019, while emphasizing that burned area can be overridden by other human and bioclimatic factors.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Global Emergence of Anthropogenic Climate Change in Fire Weather Indices",
				publisher: "Geophysical Research Letters",
				year: 2019,
				url: "https://doi.org/10.1029/2018GL080959",
				doi: "10.1029/2018GL080959",
				stance: "supports",
				note:
					"Modeling study estimating anthropogenic emergence of extreme fire-weather-index days over about 22% of burnable land area by 2019 and wider emergence with additional warming.",
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
		topicSlug: "nutrition-and-diet",
		title:
			"Is higher potassium intake from foods or potassium salt substitutes recommended for blood pressure?",
		slug:
			"is-higher-potassium-intake-from-foods-or-potassium-salt-substitutes-recommended-for-blood-pressure",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Broadly yes, with clinical caveats. WHO and cardiovascular groups recommend higher potassium intake from foods to help reduce adult blood pressure and cardiovascular risk. Potassium-enriched salt substitutes can lower blood pressure and may reduce cardiovascular events in appropriate adults, especially where much salt is added at home, but people with kidney disease or medications that raise potassium need clinician guidance before using them.",
		stableCore: [
			"WHO recommends increasing potassium intake from food to reduce blood pressure and risk of cardiovascular disease, stroke, and coronary heart disease in adults, and suggests at least 90 mmol/day, or 3510 mg/day, for adults.",
			"The American Heart Association recommends 3500 to 5000 mg of potassium daily, ideally from diet, for people trying to prevent or treat high blood pressure.",
			"Randomized-trial meta-analyses find potassium-enriched, lower-sodium salt substitutes lower systolic blood pressure by about 4 to 5 mm Hg on average compared with regular salt.",
			"The largest outcomes trial, SSaSS, found lower rates of stroke, major cardiovascular events, and death among high-risk rural Chinese adults assigned to a 75% sodium chloride and 25% potassium chloride salt substitute.",
			"Outcome evidence for salt substitutes is strongest in high-risk populations with high discretionary salt use; safety and generalizability are less certain for people with impaired kidney function, hyperkalemia risk, or settings where most sodium comes from packaged and restaurant foods."
		],
		openQuestions: [
			"How well do salt-substitute outcome benefits generalize beyond rural Chinese or other high-discretionary-salt settings?",
			"Which groups need screening or avoidance because of chronic kidney disease, potassium-sparing medications, ACE inhibitors, ARBs, potassium supplements, or other hyperkalemia risks?",
			"How should public-health programs combine potassium salt substitutes with iodized-salt policies, food reformulation, processed-food sodium reduction, and clinician counseling?",
			"How much benefit comes from potassium itself versus sodium reduction, healthier overall dietary patterns, or complete substitution of regular salt?"
		],
		whatWouldChangeMinds: [
			"Large randomized or pragmatic trials outside high-discretionary-salt settings showing no meaningful blood-pressure or cardiovascular benefit from potassium salt substitutes.",
			"Major WHO, AHA, or comparable guideline revisions withdrawing recommendations to increase potassium from foods for adult blood-pressure or cardiovascular-risk reduction.",
			"Strong safety evidence showing potassium salt substitutes create unacceptable hyperkalemia risk in broad populations even with labeling and clinician screening."
		],
		misconceptions: [
			"'More potassium' does not mean everyone should take potassium pills; food-first guidance and kidney/medication caveats matter.",
			"Potassium salt substitutes are not the same as simply eating more fruits, vegetables, legumes, nuts, or other potassium-rich foods.",
			"A benefit in high-risk or high-home-salt populations does not prove every household, restaurant, or packaged-food setting will get the same outcome benefit.",
			"People with kidney disease or medicines that affect potassium handling can be harmed by potassium-heavy substitutes even when the general population may benefit."
		],
		editorSummary:
			"Potassium-rich foods are part of the cardiovascular consensus, and potassium-enriched salt substitutes are promising for appropriate adults. The practical advice still needs clear kidney, medication, iodization, and setting-specific caveats.",
		uncertaintySummary:
			"The blood-pressure direction is fairly stable, especially for adults with elevated blood pressure or high sodium intake. Cardiovascular-outcome evidence for salt substitutes is promising but more dependent on one large Chinese trial and high-discretionary-salt settings, so implementation and safety boundaries should stay visible.",
		searchDatabases: ["Consensus", "WHO", "American Heart Association"],
		searchCutoffAt: "2026-07-04T16:04:33.000Z",
		lastRetractionCheckAt: "2026-07-04T16:04:33.000Z",
		changeLog: [
			{
				date: "2026-07-04T16:04:33.000Z",
				kind: "publication",
				summary:
					"Initial potassium intake and salt-substitute blood-pressure page published from WHO, AHA, SSaSS, and Consensus-located meta-analysis evidence."
			}
		],
		inclusionRules: [
			"Prioritize WHO and cardiovascular-guideline sources, randomized trials, systematic reviews, and meta-analyses that distinguish dietary potassium, supplements, and potassium-enriched salt substitutes.",
			"Separate blood-pressure effects from harder cardiovascular outcome evidence, and separate general food advice from salt-substitute use.",
			"Track kidney disease, medication, hyperkalemia, iodization, and food-system caveats as part of the core claim."
		],
		exclusionRules: [
			"Do not generalize potassium supplement evidence to unsupervised high-dose supplement use.",
			"Do not treat salt substitutes as safe for everyone without kidney and medication caveats.",
			"Do not infer cardiovascular-event benefits for every food system when the strongest trial evidence comes from high-risk populations with high discretionary salt use."
		],
		evidenceSummaries: [
			{
				question:
					"Do higher potassium intake and potassium-enriched salt substitutes lower blood pressure?",
				population:
					"Adults, especially those with elevated blood pressure, hypertension, or high sodium intake",
				finding:
					"Higher potassium intake from food is recommended for blood-pressure and cardiovascular-risk reduction, and potassium-enriched salt substitutes lower blood pressure in randomized-trial syntheses. Outcome benefits are promising but more setting-dependent.",
				effectDirection: "supports",
				magnitude:
					"Recent salt-substitute meta-analyses report average systolic blood-pressure reductions around 4 to 5 mm Hg; a 2025 dose-response meta-analysis found larger potassium-related blood-pressure reductions among people with hypertension than among those without hypertension.",
				certainty: "moderate",
				limitations: [
					"Salt-substitute outcome effects are heavily influenced by SSaSS, a large high-risk rural Chinese trial.",
					"People with impaired kidney function or medications affecting potassium handling were often excluded or require special caution.",
					"Food-system context matters because salt substitutes work best where people control much of the salt added to food."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "World Health Organization",
				role: "Global nutrition guideline anchor for food-based potassium intake and lower-sodium salt substitutes."
			},
			{
				name: "American Heart Association",
				role: "Clinical public-health anchor for dietary potassium, blood-pressure control, and salt-substitute cautions."
			},
			{
				name: "Salt Substitute and Stroke Study / systematic reviews",
				role: "Randomized-trial and synthesis anchor for blood-pressure and cardiovascular-outcome evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Increasing potassium intake to reduce blood pressure and risk of cardiovascular diseases in adults",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/tools/elena/interventions/potassium-cvd-adults",
				stance: "supports",
				note:
					"WHO anchor recommending increased potassium intake from food to reduce adult blood pressure and cardiovascular risk, with a suggested adult intake of at least 3510 mg/day.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Use of lower-sodium salt substitutes: WHO guideline",
				publisher: "World Health Organization",
				year: 2025,
				url: "https://www.who.int/publications/i/item/9789240105591",
				stance: "supports",
				note:
					"WHO guideline anchor for lower-sodium salt substitutes as a sodium-reduction strategy, including implementation and potassium-safety context.",
				order: 2
			},
			{
				kind: "guideline",
				title: "How Potassium Can Help Prevent or Treat High Blood Pressure",
				publisher: "American Heart Association",
				year: 2025,
				url:
					"https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/how-potassium-can-help-control-high-blood-pressure",
				stance: "supports",
				note:
					"AHA public-health source recommending 3500 to 5000 mg/day potassium, ideally from diet, and cautioning that salt substitutes can raise potassium too much in people with kidney disease or relevant medications.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Effect of Salt Substitution on Cardiovascular Events and Death.",
				publisher: "The New England Journal of Medicine",
				year: 2021,
				url:
					"https://consensus.app/papers/effect-of-salt-substitution-on-cardiovascular-events-and-neal-wu/d11848e1f5e45901ae1fc1bb8879c2d1/",
				stance: "supports",
				note:
					"SSaSS randomized 20,995 high-risk rural Chinese adults and found lower stroke, major cardiovascular-event, and all-cause mortality rates with a 75% sodium chloride and 25% potassium chloride salt substitute.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Comparative effects of salt substitutes on blood pressure, cardiovascular events and mortality: a systematic review and network meta-analysis",
				publisher: "BMC Medicine",
				year: 2026,
				url:
					"https://consensus.app/papers/comparative-effects-of-salt-substitutes-on-blood-pressure-lai-nesrallah/bd155b44e4885f3da6a4aa343b3182e4/",
				stance: "supports",
				note:
					"Network meta-analysis of 34 randomized trials and 37,063 participants finding blood-pressure and likely outcome benefits for moderate-potassium, low-sodium substitutes, while emphasizing SSaSS dominance and limited generalizability beyond Chinese high-discretionary-salt settings.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Effects of salt substitutes on clinical outcomes: a systematic review and meta-analysis",
				publisher: "Heart",
				year: 2022,
				url:
					"https://consensus.app/papers/effects-of-salt-substitutes-on-clinical-outcomes-a-yin-rodgers/cd26bac51d215a7290923bda33f3243a/",
				stance: "supports",
				note:
					"Meta-analysis of 21 trials and 31,949 participants finding systolic blood-pressure reduction of 4.61 mm Hg and protective associations for total mortality, cardiovascular mortality, and cardiovascular events.",
				order: 6
			},
			{
				kind: "meta_analysis",
				title:
					"Effect of changes in potassium intake on blood pressure: a dose-response meta-analysis of randomized clinical trials (2000-2024)",
				publisher: "Clinical Kidney Journal",
				year: 2025,
				url:
					"https://consensus.app/papers/effect-of-changes-in-potassium-intake-on-blood-pressure-a-granal-sourd/6fed7122dddd5a9696f6261d0e26cc6a/",
				stance: "supports",
				note:
					"RCT dose-response meta-analysis reporting larger blood-pressure reductions from increased potassium among people with hypertension than among those without hypertension, while cautioning that the number of trials was limited.",
				order: 7
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
		topicSlug: "climate-and-environment",
		title: "Does fine particulate air pollution cause cardiovascular disease and lung cancer?",
		slug: "does-fine-particulate-air-pollution-cause-cardiovascular-disease-and-lung-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Fine particulate matter, especially PM2.5, is causally linked to cardiovascular harm and premature death, and outdoor air pollution and particulate matter are classified by IARC as carcinogenic to humans because of lung-cancer evidence. The risk is not limited to smokers or visibly dirty air: long-term exposure to lower particle levels still contributes to population risk.",
		stableCore: [
			"WHO attributes major ambient-air-pollution mortality to fine particulate matter that causes cardiovascular and respiratory disease and cancers.",
			"EPA's particulate-matter science assessment identifies causal relationships between short- and long-term PM2.5 exposure and cardiovascular effects, as well as mortality.",
			"IARC classified outdoor air pollution and particulate matter in outdoor air pollution as Group 1 carcinogens, with sufficient evidence for lung cancer.",
			"A WHO-commissioned systematic review found PM2.5 significantly associated with all assessed mortality endpoints, including cardiovascular disease and lung cancer."
		],
		openQuestions: [
			"How should risk estimates be updated for changing pollutant mixtures, wildfire smoke, indoor infiltration, and lower-concentration exposures?",
			"Which interventions most rapidly lower exposure for people near traffic, industry, ports, fires, or other high-particle sources?",
			"How should individual protective advice be balanced against the much larger benefits of source reduction and clean-air policy?"
		],
		whatWouldChangeMinds: [
			"Major WHO, EPA, IARC, or comparable reassessments withdrawing causal cardiovascular or lung-cancer conclusions for PM2.5 and outdoor particulate pollution.",
			"Large, high-quality cohort evidence showing the PM2.5 links disappear after better exposure measurement and confounding control.",
			"Mechanistic and toxicological evidence showing particle exposure at real-world levels is biologically inert for cardiovascular and cancer pathways."
		],
		misconceptions: [
			"Fine particles are sometimes described as just nuisance dust, even though PM2.5 can penetrate deep into the lungs and is linked to systemic effects.",
			"Lung-cancer risk is sometimes treated as only a smoking issue, even though IARC classifies outdoor air pollution and particulate matter as human carcinogens.",
			"Clean-looking air is sometimes assumed to be harmless, even when measured PM2.5 remains above health-based guideline levels."
		],
		editorSummary:
			"This page should make the causal evidence concrete: PM2.5 is not just a visibility or asthma issue. It is a cardiovascular and cancer-risk pollutant with strong institutional consensus and measurable burden.",
		uncertaintySummary:
			"The causal direction is high-certainty for cardiovascular effects, mortality, and outdoor particulate pollution as a lung-cancer hazard. Remaining uncertainty is mostly about exact risk magnitude by source, mixture, concentration range, vulnerability, and intervention design.",
		searchCutoffAt: "2026-07-03T13:02:17.000Z",
		lastRetractionCheckAt: "2026-07-03T13:02:17.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:02:17.000Z",
				kind: "publication",
				summary:
					"Initial PM2.5 cardiovascular and lung-cancer page published from WHO, EPA, IARC, and systematic-review evidence."
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
					"WHO anchor estimating 4.2 million premature deaths from ambient air pollution in 2019 and identifying fine particulate matter as causing cardiovascular and respiratory disease and cancers.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Integrated Science Assessment for Particulate Matter",
				publisher: "U.S. Environmental Protection Agency",
				year: 2019,
				url: "https://www.epa.gov/isa/integrated-science-assessment-isa-particulate-matter",
				stance: "supports",
				note:
					"EPA assessment anchor for causal determinations linking short- and long-term PM2.5 exposure with cardiovascular effects and mortality.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "IARC: Outdoor air pollution a leading environmental cause of cancer deaths",
				publisher: "International Agency for Research on Cancer",
				year: 2013,
				url:
					"https://www.iarc.who.int/news-events/iarc-outdoor-air-pollution-a-leading-environmental-cause-of-cancer-deaths/",
				stance: "supports",
				note:
					"IARC classification anchor: outdoor air pollution and particulate matter in outdoor air pollution are carcinogenic to humans, with sufficient lung-cancer evidence.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Long-term exposure to PM and all-cause and cause-specific mortality: A systematic review and meta-analysis",
				publisher: "Environment International",
				year: 2020,
				url: "https://doi.org/10.1016/j.envint.2020.105974",
				doi: "10.1016/j.envint.2020.105974",
				pmid: "32703584",
				stance: "supports",
				note:
					"WHO-commissioned review of 107 mostly cohort studies found PM2.5 associated with all assessed causes of death, including cardiovascular disease and lung cancer; natural-cause mortality RR was 1.08 per 10 ug/m3.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Outdoor Particulate Matter Exposure and Lung Cancer: A Systematic Review and Meta-Analysis",
				publisher: "Environmental Health Perspectives",
				year: 2014,
				url: "https://doi.org/10.1289/ehp.1307494",
				doi: "10.1289/ehp.1307494",
				pmid: "24911630",
				stance: "supports",
				note:
					"Meta-analysis of 18 studies estimated lung-cancer relative risk of 1.09 per 10 ug/m3 PM2.5 and supported IARC's Group 1 outdoor particulate matter classification.",
				order: 5
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Does household air pollution from solid fuels cause major disease burdens, especially in children?",
		slug: "does-household-air-pollution-from-solid-fuels-cause-major-disease-burdens-especially-in-children",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Burning wood, charcoal, coal, dung, crop waste, kerosene, or other polluting fuels in and around homes is a major global-health risk. WHO estimates household air pollution caused about 2.9 million deaths in 2021, including more than 309,000 deaths among children under five. The burden includes pneumonia and other respiratory disease, but also stroke, ischemic heart disease, COPD, lung cancer, low birth weight, and stillbirth.",
		stableCore: [
			"WHO estimates 2.9 million deaths and about 95 million disability-adjusted life years were attributable to household air pollution in 2021.",
			"Women and children often bear disproportionate exposure because cooking, fuel collection, and time near household fires are unevenly distributed.",
			"WHO identifies household air pollution as contributing to stroke, ischemic heart disease, COPD, lung cancer, and acute lower respiratory infections in children.",
			"Meta-analytic evidence links household solid-fuel exposure with elevated childhood pneumonia risk and broader cardiorespiratory, pediatric, and maternal harms."
		],
		openQuestions: [
			"Which clean-energy transitions most reliably reduce measured household PM2.5 exposure at scale and stay adopted over time?",
			"How much benefit comes from cleaner fuels, better stoves, ventilation, behavior change, or community-level outdoor-air improvements?",
			"How should policies manage transition fuels such as gas when electricity or other cleaner energy is not yet reliable or affordable?"
		],
		whatWouldChangeMinds: [
			"Major WHO or burden-of-disease reassessments finding household solid-fuel pollution is not a large contributor to respiratory, cardiovascular, cancer, or child-health outcomes.",
			"Large exposure-measured intervention evidence showing sustained exposure reduction does not improve relevant health outcomes.",
			"Updated meta-analyses showing childhood pneumonia or major cardiorespiratory associations disappear after better exposure measurement and confounding control."
		],
		misconceptions: [
			"Air pollution is often treated as only an outdoor urban problem, even though household combustion is a major exposure source.",
			"Smoke from wood or biomass is sometimes seen as natural and therefore harmless.",
			"Improved stoves are sometimes treated as automatically solving the problem, even when real-world exposure reduction depends on fuel, ventilation, maintenance, and sustained use."
		],
		editorSummary:
			"This page should connect energy access, indoor exposure, and child health without implying that families can solve a structural clean-energy problem by willpower alone.",
		uncertaintySummary:
			"The overall disease burden is high-certainty, but intervention effects vary by fuel, stove, ventilation, background outdoor pollution, adoption, and exposure reduction. Clean energy access is the practical bottleneck.",
		searchCutoffAt: "2026-07-03T13:02:17.000Z",
		lastRetractionCheckAt: "2026-07-03T13:02:17.000Z",
		changeLog: [
			{
				date: "2026-07-03T13:02:17.000Z",
				kind: "publication",
				summary:
					"Initial household-air-pollution disease-burden page published from WHO fact-sheet, WHO household-fuel guidance, and meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Household air pollution",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/household-air-pollution-and-health",
				stance: "supports",
				note:
					"WHO anchor for the 2021 burden estimate of 2.9 million deaths, more than 309,000 deaths among children under five, 95 million DALYs, and major disease categories.",
				order: 1
			},
			{
				kind: "guideline",
				title: "WHO guidelines for indoor air quality: household fuel combustion",
				publisher: "World Health Organization",
				year: 2014,
				url: "https://www.who.int/publications/i/item/9789241548885",
				stance: "supports",
				note:
					"Guideline anchor for household fuel-combustion exposure reduction, clean-fuel transition, and health-protective indoor-air recommendations.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"Adverse health effects associated with household air pollution: a systematic review, meta-analysis, and burden estimation study",
				publisher: "The Lancet Global Health",
				year: 2020,
				url: "https://doi.org/10.1016/S2214-109X(20)30343-0",
				doi: "10.1016/S2214-109X(20)30343-0",
				pmid: "33069303",
				stance: "supports",
				note:
					"Meta-analysis and burden study of 476 studies found household air pollution associated with respiratory, cardiovascular, cancer, pediatric, and maternal outcomes, with burden concentrated in low- and middle-income countries.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Indoor air pollution from solid fuel on children pneumonia in low- and middle-income countries: a systematic review and meta-analysis",
				publisher: "Environmental Science and Pollution Research",
				year: 2022,
				url: "https://doi.org/10.1007/s11356-021-18293-6",
				doi: "10.1007/s11356-021-18293-6",
				pmid: "35066845",
				stance: "supports",
				note:
					"Meta-analysis of 16 studies found solid fuel combustion associated with higher childhood pneumonia risk, with pooled odds ratio 1.66.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Can indoor dampness and mold worsen respiratory health?",
		slug: "can-indoor-dampness-and-mold-worsen-respiratory-health",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Damp or moldy indoor spaces are consistently linked with respiratory and allergic problems, including asthma symptoms, asthma development in some groups, wheeze, cough, rhinitis, and respiratory infections. The practical consensus is to fix moisture and remove mold rather than wait for species testing, while avoiding the overclaim that every symptom in a building is caused by mold.",
		stableCore: [
			"WHO concludes that occupants of damp or moldy buildings are at increased risk of respiratory symptoms, respiratory infections, and asthma exacerbation, with some evidence for allergic rhinitis and asthma development.",
			"CDC and EPA identify mold and dampness as triggers for allergic symptoms, irritation, and asthma attacks, especially for people with asthma, mold allergy, immune compromise, or chronic lung disease.",
			"A comprehensive epidemiologic review found consistent associations between evident dampness or mold and asthma development or exacerbation, wheeze, cough, respiratory infections, bronchitis, allergic rhinitis, eczema, and upper respiratory symptoms.",
			"Meta-analyses quantify the direction of risk: one asthma-onset review estimated elevated risks for dampness, visible mold, and especially mold odor, while another found roughly 30% to 50% increases across several respiratory and asthma-related outcomes."
		],
		openQuestions: [
			"Which specific microbial agents, chemical emissions, building materials, or exposure mixtures drive the observed health risks?",
			"How should hidden dampness and mold odor be measured in ways that predict health risk better than short-term air sampling?",
			"Which remediation approaches produce the most durable health gains across homes, schools, workplaces, and climates?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled longitudinal or remediation studies showing no respiratory or allergic risk reduction after dampness and mold problems are corrected.",
			"Major WHO, CDC, EPA, National Academies, or systematic-review reassessments withdrawing the current respiratory-risk conclusions.",
			"Exposure-measurement evidence showing that the observed associations are explained entirely by confounding rather than dampness-related indoor conditions."
		],
		misconceptions: [
			"'Black mold' color is not a reliable danger ranking; CDC notes color does not necessarily show whether mold is more or less dangerous.",
			"Routine mold air sampling is often oversold. NIOSH says there are no health-based indoor-air standards for mold and does not recommend routine air sampling for building air-quality evaluations.",
			"Not every symptom in a damp building is necessarily caused by mold; the strongest public-health answer concerns respiratory and allergic outcomes plus moisture control."
		],
		editorSummary:
			"This page should be practical and bounded: dampness and visible or smelled mold are real respiratory-risk signals, but the answer should steer away from species-name panic, unsupported toxin narratives, and diagnostic overreach.",
		uncertaintySummary:
			"The direction of the association is stable across guidance and reviews, especially for respiratory and allergic outcomes. Remaining uncertainty is about exact causal agents, dose thresholds, hidden exposures, individual attribution, and the health effect size of specific remediation strategies.",
		searchCutoffAt: "2026-07-03T16:59:04.000Z",
		lastRetractionCheckAt: "2026-07-03T16:59:04.000Z",
		changeLog: [
			{
				date: "2026-07-03T16:59:04.000Z",
				kind: "publication",
				summary:
					"Initial indoor dampness and mold respiratory-health page published from WHO, CDC, EPA, and systematic-review/meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "WHO guidelines for indoor air quality : dampness and mould",
				publisher: "World Health Organization",
				year: 2009,
				url: "https://www.who.int/publications/i/item/9789289041683",
				stance: "supports",
				note:
					"WHO guideline anchor concluding that persistent dampness and microbial growth increase respiratory, allergy, asthma, and immune-related health risks.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Mold",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/mold-health/about/index.html",
				stance: "supports",
				note:
					"CDC public-health anchor for mold growth conditions, possible health effects, IOM evidence categories, prevention, and moisture cleanup advice.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Mold, Testing, and Remediation",
				publisher: "National Institute for Occupational Safety and Health",
				year: 2025,
				url: "https://www.cdc.gov/niosh/mold/testing-remediation/index.html",
				stance: "supports",
				note:
					"NIOSH guidance explaining that mold color is not a danger ranking, routine air sampling is not recommended, and moisture problems should be remediated.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Mold and Health",
				publisher: "U.S. Environmental Protection Agency",
				year: 2026,
				url: "https://www.epa.gov/mold/mold-and-health",
				stance: "supports",
				note:
					"EPA public guidance summarizing allergic, irritant, and asthma-triggering effects and pointing readers toward moisture cleanup.",
				order: 4
			},
			{
				kind: "systematic_review",
				title:
					"Respiratory and Allergic Health Effects of Dampness, Mold, and Dampness-Related Agents",
				publisher: "Environmental Health Perspectives",
				year: 2011,
				url: "https://doi.org/10.1289/ehp.1002410",
				doi: "10.1289/ehp.1002410",
				pmid: "21269928",
				stance: "supports",
				note:
					"Review found consistent positive associations between evident dampness or mold and multiple respiratory and allergic outcomes, while cautioning against relying on specific microbial measurements for action.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Residential Dampness and Molds and the Risk of Developing Asthma",
				publisher: "PLoS ONE",
				year: 2012,
				url: "https://doi.org/10.1371/journal.pone.0047526",
				doi: "10.1371/journal.pone.0047526",
				pmid: "23144822",
				pmcid: "PMC3492391",
				stance: "supports",
				note:
					"Meta-analysis of 16 cohort or incident case-control studies found elevated asthma-onset estimates for dampness, visible mold, and mold odor.",
				order: 6
			},
			{
				kind: "meta_analysis",
				title: "Meta-analyses of the associations of respiratory health effects with dampness and mold in homes",
				publisher: "Indoor Air",
				year: 2007,
				url: "https://doi.org/10.1111/j.1600-0668.2007.00475.x",
				doi: "10.1111/j.1600-0668.2007.00475.x",
				pmid: "17661925",
				stance: "supports",
				note:
					"Meta-analysis found building dampness and mold associated with roughly 30% to 50% increases in several respiratory and asthma-related outcomes.",
				order: 7
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Do gas stoves worsen indoor air quality and childhood asthma risk?",
		slug: "do-gas-stoves-worsen-indoor-air-quality-and-childhood-asthma-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes for indoor air pollution, with a qualified yes for asthma risk. Gas and propane stoves can raise indoor nitrogen dioxide and other combustion pollutants, and the epidemiology generally links gas cooking or indoor NO2 with higher childhood asthma or wheeze risk. The exact causal share and best intervention are less certain than the exposure problem itself, so the practical consensus is to ventilate well, avoid using gas stoves for heat, and consider electric or induction cooking where feasible.",
		stableCore: [
			"EPA identifies gas stoves as an indoor source of nitrogen dioxide and says homes with gas stoves can have indoor NO2 levels above outdoor levels.",
			"EPA's exposure-reduction guidance emphasizes outdoor-vented exhaust over gas stoves, proper appliance adjustment, and never using a gas stove to heat a home.",
			"A 2013 meta-analysis of 41 studies estimated higher childhood asthma odds with gas cooking exposure and higher current wheeze odds with indoor NO2.",
			"More recent reviews agree that gas combustion is an exposure source but caution that much of the child-asthma evidence is observational, heterogeneous, and limited for precise causal estimates."
		],
		openQuestions: [
			"How much childhood asthma burden would be prevented by stove replacement, outdoor-vented range hoods, better ventilation, or combined indoor-air interventions?",
			"Which pollutant mixture matters most in real homes: NO2, fine particles, carbon monoxide, formaldehyde, benzene, ultrafine particles, or co-exposures?",
			"How should risk-reduction advice be prioritized for renters, small homes, children with asthma, and households that cannot easily replace appliances?"
		],
		whatWouldChangeMinds: [
			"Large longitudinal or intervention studies showing that reducing gas-stove combustion exposure does not reduce relevant respiratory outcomes in children.",
			"Updated systematic reviews with better exposure measurement and confounding control finding that gas cooking and indoor NO2 associations disappear.",
			"Major EPA, WHO, CPSC, or comparable reassessments withdrawing concern about gas-stove emissions as an indoor-air hazard."
		],
		misconceptions: [
			"The evidence does not mean every gas stove automatically causes asthma or that every home with gas cooking is unsafe at the same level.",
			"Gas is far cleaner than wood, charcoal, dung, coal, or kerosene in many global household-energy settings, but it is still not zero-combustion cooking.",
			"The U.S. CPSC has said it is not pursuing a gas-stove ban; the health question is separate from political claims about bans.",
			"A recirculating range hood may trap some particles or grease, but it does not vent nitrogen dioxide outdoors the way an outdoor-vented hood does."
		],
		editorSummary:
			"This page should answer a politicized indoor-air question without becoming a ban debate: gas stoves are a real combustion-pollution source, the child-asthma signal is concerning but not perfectly causal, and the most useful guidance is exposure reduction.",
		uncertaintySummary:
			"The exposure evidence is strong, especially for nitrogen dioxide from gas combustion. The child-asthma evidence is directionally concerning but moderate-certainty because many studies are observational, exposure definitions vary, and intervention evidence is still limited.",
		searchCutoffAt: "2026-07-03T17:18:30.000Z",
		lastRetractionCheckAt: "2026-07-03T17:18:30.000Z",
		changeLog: [
			{
				date: "2026-07-03T17:18:30.000Z",
				kind: "publication",
				summary:
					"Initial gas-stove indoor-air and childhood-asthma page published from EPA, WHO, CPSC, systematic-review, meta-analysis, and exposure-modeling evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Nitrogen Dioxide's Impact on Indoor Air Quality",
				publisher: "U.S. Environmental Protection Agency",
				year: 2026,
				url:
					"https://www.epa.gov/indoor-air-quality-iaq/nitrogen-dioxides-impact-indoor-air-quality",
				stance: "supports",
				note:
					"EPA indoor-air anchor identifying gas stoves as an indoor NO2 source, describing respiratory risks, and recommending outdoor-vented exhaust over gas stoves.",
				order: 1
			},
			{
				kind: "guideline",
				title: "WHO guidelines for indoor air quality: selected pollutants",
				publisher: "World Health Organization",
				year: 2010,
				url: "https://www.who.int/publications/i/item/9789289002134",
				stance: "supports",
				note:
					"WHO guideline anchor for indoor chemical pollutants including nitrogen dioxide, their sources, exposure pathways, health effects, and health-risk evaluation.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"Meta-analysis of the effects of indoor nitrogen dioxide and gas cooking on asthma and wheeze in children",
				publisher: "International Journal of Epidemiology",
				year: 2013,
				url: "https://doi.org/10.1093/ije/dyt150",
				doi: "10.1093/ije/dyt150",
				pmid: "23962958",
				stance: "supports",
				note:
					"Meta-analysis of 41 studies estimated asthma odds ratio 1.32 for gas cooking exposure and current-wheeze odds ratio 1.15 for indoor NO2.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Gas cooking and respiratory outcomes in children: A systematic review",
				publisher: "Global Epidemiology",
				year: 2023,
				url: "https://doi.org/10.1016/j.gloepi.2023.100107",
				doi: "10.1016/j.gloepi.2023.100107",
				pmid: "37638371",
				stance: "debate",
				note:
					"Review of 66 studies emphasizing high heterogeneity, mostly cross-sectional evidence, exposure and outcome measurement limitations, and caution about causal interpretation.",
				order: 4
			},
			{
				kind: "landmark_study",
				title:
					"Nitrogen dioxide exposure, health outcomes, and associated demographic disparities due to gas and propane combustion by U.S. stoves",
				publisher: "Science Advances",
				year: 2024,
				url: "https://doi.org/10.1126/sciadv.adm8680",
				doi: "10.1126/sciadv.adm8680",
				stance: "context",
				note:
					"U.S. measurement-and-modeling study estimating gas and propane stove contributions to long-term NO2 exposure, pediatric asthma burden, and disproportionate exposure in smaller homes and some demographic groups.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title:
					"Estimated health effects from domestic use of gaseous fuels for cooking and heating in high-income, middle-income, and low-income countries: a systematic review and meta-analyses",
				publisher: "The Lancet Respiratory Medicine",
				year: 2024,
				url: "https://doi.org/10.1016/S2213-2600(23)00427-7",
				doi: "10.1016/S2213-2600(23)00427-7",
				pmid: "38310914",
				stance: "context",
				note:
					"Broader household-energy review showing gas is much cleaner than solid or kerosene fuels but can still compare less favorably than electricity for some respiratory outcomes.",
				order: 6
			},
			{
				kind: "context",
				title: "Statement of Chair Alexander Hoehn-Saric Regarding Gas Stoves",
				publisher: "U.S. Consumer Product Safety Commission",
				year: 2023,
				url:
					"https://www.cpsc.gov/About-CPSC/Chairman/Alexander-Hoehn-Saric/Statement/Statement-of-Chair-Alexander-Hoehn-Saric-Regarding-Gas-Stoves",
				stance: "context",
				note:
					"Regulatory context noting CPSC concern about gas-stove emissions while explicitly stating that the agency was not pursuing a gas-stove ban.",
				order: 7
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
		topicSlug: "biology-and-evolution",
		title: "Are transitional fossils missing from the fossil record?",
		slug: "are-transitional-fossils-missing-from-the-fossil-record",
		status: "published",
		consensusBand: "strong",
		agreementLevel: "strong",
		evidenceCertainty: "high",
		confidenceScore: 95,
		reviewMode: "standard",
		bottomLine:
			"No. The fossil record is incomplete, but transitional fossils are not missing as claimed. Paleontologists have many examples, including fish-to-tetrapod, reptile-to-mammal, whale, bird, hoofed-mammal, and human-evolution fossils. The caveat: fossils usually show branching histories and feature transitions, not a perfect chain of direct ancestors.",
		stableCore: [
			"The fossil record is patchy because fossilization, preservation, erosion, exposure, discovery, and sampling are uneven.",
			"That incompleteness does not erase the many known fossils with transitional combinations of traits.",
			"National Academies resources state that claims about fossil gaps undermining evolution are false and point to predicted discoveries such as Tiktaalik.",
			"UC Berkeley describes fossil evidence as incomplete but still clearly showing life changing through evolution over billions of years.",
			"Modern paleontology often tests transitions of features and branching relationships rather than demanding a single ladder of direct ancestors."
		],
		openQuestions: [
			"Which specific fossils sit closest to important branching points for poorly sampled groups?",
			"How should paleontologists combine fossil anatomy, stratigraphy, phylogenetics, developmental biology, and molecular evidence when relationships are uncertain?",
			"How can educators explain transitional features without implying every transitional fossil must be a direct ancestor of a living species?"
		],
		whatWouldChangeMinds: [
			"Repeated, well-dated fossil discoveries appearing in impossible geological order, such as mammals before their plausible ancestors or humans with dinosaurs in undisturbed strata.",
			"A better-supported explanation that fits fossil order, morphology, stratigraphy, genetics, comparative anatomy, and biogeography without common descent.",
			"Major paleontology and evolutionary-biology institutions abandoning transitional-feature evidence as scientifically useful."
		],
		misconceptions: [
			"'Missing link' makes evolution sound like a straight chain, when evolutionary history is a branching tree.",
			"A transitional fossil does not need to be half of one modern animal and half of another; it can preserve a mosaic of ancestral and derived features.",
			"Not knowing every ancestor-descendant link is not the same as having no evidence for evolutionary transitions.",
			"New fossil discoveries often revise details of timing and relationship without overturning the larger pattern of common descent."
		],
		editorSummary:
			"This page should answer the fossil-gap objection without overstating completeness: transitional features are common and useful, but the fossil record is unevenly sampled and usually reconstructs branches rather than direct lineages.",
		uncertaintySummary:
			"The existence and scientific value of transitional fossils is settled. Uncertainty remains around exact placements, direct ancestry, timing, and which features evolved in which sequence for particular groups.",
		uncertaintyDrivers: [
			{
				type: "indirectness",
				detail:
					"Fossils often preserve transitional features near branching points rather than proving a direct ancestor-descendant chain."
			},
			{
				type: "imprecision",
				detail:
					"Dating resolution, erosion, preservation, and incomplete sampling can blur the exact sequence of character changes."
			},
			{
				type: "implementation",
				detail:
					"Public explanations need to avoid the outdated ladder-like 'missing link' frame while still naming concrete fossil examples."
			}
		],
		searchDatabases: ["Consensus", "National Academies", "UC Berkeley Understanding Evolution", "Cambridge Core"],
		searchCutoffAt: "2026-07-04T21:45:00.000Z",
		lastRetractionCheckAt: "2026-07-04T21:45:00.000Z",
		inclusionRules: [
			"Prioritize institutional evolution-education anchors, paleontology reviews, and landmark fossils that document feature transitions.",
			"Separate evidence for transitional features from claims that a specific fossil is a direct ancestor.",
			"Use examples that are placed in geological and phylogenetic context rather than isolated visual resemblance."
		],
		exclusionRules: [
			"Do not use creationist quote-mining as evidence; summarize it only as a misconception when needed.",
			"Do not imply the fossil record is complete or that every predicted intermediate should already be found.",
			"Do not present evolution as a linear ladder from primitive to modern forms."
		],
		evidenceSummaries: [
			{
				question: "Are transitional fossils absent in a way that undermines evolution?",
				population: "Fossil evidence across major evolutionary transitions and public claims about missing links",
				finding:
					"Scientific and educational sources agree that the fossil record is incomplete but contains many transitional-feature fossils and sequences that support evolutionary history.",
				effectDirection: "supports",
				magnitude:
					"Examples span multiple groups, including Tiktaalik in the fish-to-tetrapod transition and documented transitions among hoofed mammals, whales, birds, mammals, and hominins.",
				certainty: "high",
				limitations: [
					"Exact direct ancestry is often uncertain.",
					"Some intervals and soft-bodied groups remain poorly sampled.",
					"New fossils can change timing, placement, or sequence without eliminating the broader transitional pattern."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "National Academies",
				role: "Consensus education anchor for fossil-order and transitional-fossil evidence."
			},
			{
				name: "UC Berkeley Understanding Evolution",
				role: "Public education anchor for fossil evidence and transitional forms."
			},
			{
				name: "Paleontological Society and peer-reviewed paleontology literature",
				role: "Discipline anchor for how paleontologists interpret transitional features in an incomplete record."
			}
		],
		changeLog: [
			{
				date: "2026-07-04T21:45:00.000Z",
				kind: "publication",
				summary:
					"Initial transitional-fossil claim page published from National Academies, UC Berkeley, Cambridge Core, and Consensus-located paleontology sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Evolution Resources",
				publisher: "National Academies",
				year: 2026,
				url: "https://www.nationalacademies.org/evolution-resources",
				stance: "supports",
				note:
					"Public National Academies source stating that fossil-gap claims undermining evolution are false and citing predicted transitional discoveries such as Tiktaalik.",
				order: 1
			},
			{
				kind: "context",
				title: "Fossil evidence",
				publisher: "UC Berkeley Understanding Evolution",
				year: 2020,
				url: "https://evolution.berkeley.edu/lines-of-evidence/fossil-evidence/",
				stance: "supports",
				note:
					"Public education source explaining that the fossil record is incomplete but clearly shows life changing over deep time through evolution.",
				order: 2
			},
			{
				kind: "context",
				title: "Are There Transitional Forms in the Fossil Record?",
				publisher: "The Paleontological Society Papers",
				year: 1999,
				url:
					"https://www.cambridge.org/core/journals/the-paleontological-society-papers/article/abs/are-there-transitional-forms-in-the-fossil-record/2F691101D8309A1F6901AC7554947034",
				doi: "10.1017/S108933260000053X",
				stance: "supports",
				note:
					"Directly addresses the objection, explaining that the problem is not absence of transitional fossils but unrealistic expectations about complete transitions of forms instead of features.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "A Devonian tetrapod-like fish and the evolution of the tetrapod body plan",
				publisher: "Nature",
				year: 2006,
				url:
					"https://consensus.app/papers/a-devonian-tetrapodlike-fish-and-the-evolution-of-the-daeschler-shubin/2c7fb09484a8559c8bc8bd112bd0fe07/",
				stance: "supports",
				note:
					"Tiktaalik discovery paper reporting a well-preserved Late Devonian fish intermediate between finned fish and limbed tetrapods, with a mobile neck and functional wrist joint.",
				order: 4
			},
			{
				kind: "context",
				title: "Evolutionary Transitions in the Fossil Record of Terrestrial Hoofed Mammals",
				publisher: "Evolution: Education and Outreach",
				year: 2009,
				url:
					"https://consensus.app/papers/evolutionary-transitions-in-the-fossil-record-of-prothero/5afd50235f975cbcbdced05c96c8f614/",
				stance: "supports",
				note:
					"Review-style education article documenting transitional fossils across hoofed mammals, including horses, rhinos, tapirs, camels, giraffes, elephants, and manatees.",
				order: 5
			},
			{
				kind: "context",
				title: "Species in the fossil record: concepts, trends, and transitions",
				publisher: "Paleobiology",
				year: 1985,
				url:
					"https://consensus.app/papers/species-in-the-fossil-record-concepts-trends-and-gingerich/67187b6137e05257b5b7df82a7d9f8e2/",
				stance: "context",
				note:
					"Paleobiology review describing morphological continuity, fossil-record limits, anagenesis, cladogenesis, and why fossil species boundaries are often time-based and approximate.",
				order: 6
			}
		]
	},
	{
		topicSlug: "biology-and-evolution",
		title: "Did humans evolve from chimpanzees living today?",
		slug: "did-humans-evolve-from-chimpanzees-living-today",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. Humans did not evolve from chimpanzees, bonobos, gorillas, or monkeys alive today. Modern humans and modern apes are related branches of the primate family tree that share extinct common ancestors, with humans, chimpanzees, and bonobos sharing a relatively recent common ancestor.",
		stableCore: [
			"The Smithsonian Human Origins Program states that chimpanzees and bonobos are humans' closest living biological relatives, but that humans did not evolve directly from any primates living today.",
			"Smithsonian summarizes DNA evidence as showing that humans and chimpanzees diverged from a common ancestor species that lived roughly 8 to 6 million years ago.",
			"The National Academies explains the standard misconception directly: humans and modern apes did not descend from one another; they shared a common ancestor that no longer exists.",
			"The chimpanzee genome comparison catalogued tens of millions of genetic differences accumulated since the human and chimpanzee lineages diverged from their common ancestor."
		],
		openQuestions: [
			"What did the last common ancestor of humans, chimpanzees, and bonobos look and behave like?",
			"Which fossil species sit closest to the branching point of the human and chimpanzee lineages?",
			"How should educators explain the word 'ape' without implying that a living chimpanzee is a human ancestor?"
		],
		whatWouldChangeMinds: [
			"Independent fossil, anatomical, and genomic evidence repeatedly showing that the human lineage did not nest within the primate family tree.",
			"A better-supported biological framework that explains shared DNA, chromosome structure, fossils, anatomy, and biogeography without common ancestry.",
			"Major evolutionary biology institutions revising the branching-tree model of human and ape relationships."
		],
		misconceptions: [
			"The statement 'humans evolved from apes' is often heard as 'humans evolved from modern chimpanzees,' which is not the scientific claim.",
			"DNA similarity percentages depend on how genomes are aligned and compared, but that technical detail does not erase the broader common-ancestry signal.",
			"Living species can share a common ancestor without one living species being the parent form of another."
		],
		editorSummary:
			"This page should handle a persistent evolution misconception in a low-temperature way: modern chimpanzees are cousins, not ancestors, and the evidence is a branching pattern across DNA, fossils, anatomy, and geography.",
		uncertaintySummary:
			"The common-ancestry point is settled. Uncertainty remains about the exact fossil placement, traits, and population structure near the human-chimpanzee branching point, and about the best way to explain genome-similarity percentages without oversimplifying.",
		searchCutoffAt: "2026-07-03T02:46:15.000Z",
		lastRetractionCheckAt: "2026-07-03T02:46:15.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:46:15.000Z",
				kind: "publication",
				summary:
					"Initial human-ape common-ancestry claim page published from Smithsonian, National Academies, AMNH, and chimpanzee-genome comparison sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Genetics",
				publisher: "Smithsonian Human Origins Program",
				year: 2024,
				url: "https://humanorigins.si.edu/evidence/genetics",
				stance: "supports",
				note:
					"Official museum science source explaining that humans' closest living relatives are chimpanzees and bonobos, that humans did not evolve directly from living primates, and that DNA places the human-chimpanzee common ancestor roughly 8 to 6 million years ago.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Frequently Asked Questions - Science and Creationism",
				publisher: "National Academies / NCBI Bookshelf",
				year: 2008,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK230200/",
				stance: "supports",
				note:
					"National Academies explanation distinguishing modern apes from extinct common ancestors and describing evolution as a branching process.",
				order: 2
			},
			{
				kind: "context",
				title: "DNA: Comparing Humans and Chimps",
				publisher: "American Museum of Natural History",
				url: "https://www.amnh.org/exhibitions/permanent/human-origins/understanding-our-past/dna-comparing-humans-and-chimps",
				stance: "context",
				note:
					"Public education source explaining that humans, chimpanzees, and bonobos descended from a single ancestor species and that DNA similarity still leaves many functional differences.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Initial sequence of the chimpanzee genome and comparison with the human genome",
				publisher: "Nature",
				year: 2005,
				url: "https://doi.org/10.1038/nature04072",
				doi: "10.1038/nature04072",
				pmid: "16136131",
				stance: "supports",
				note:
					"Landmark genome comparison cataloguing about 35 million single-nucleotide changes, about 5 million insertion/deletion events, and chromosomal rearrangements accumulated since the human and chimpanzee lineages diverged.",
				order: 4
			}
		]
	},
	{
		topicSlug: "biology-and-evolution",
		title: "Have modern humans stopped evolving?",
		slug: "have-modern-humans-stopped-evolving",
		status: "published",
		consensusBand: "strong",
		agreementLevel: "strong",
		evidenceCertainty: "moderate",
		confidenceScore: 88,
		reviewMode: "standard",
		bottomLine:
			"No. Evolution has not stopped in modern humans. Culture, medicine, and technology change the pressures acting on people, but they do not eliminate heritable variation, differences in reproductive success, mutation, migration, drift, or selection.",
		stableCore: [
			"Evolution only stops if allele frequencies stop changing; modern human populations still have mutation, migration, genetic drift, and heritable differences linked to reproduction.",
			"Contemporary studies can detect natural selection in humans, but the expected changes are usually slow and small compared with rapid cultural and environmental change.",
			"Modern medicine and technology often reshape selection pressures rather than turning selection off.",
			"Claims about future human evolution need caution because demographic structure, environment, culture, and polygenic trait measurement all complicate interpretation."
		],
		openQuestions: [
			"Which signals reflect durable genetic change rather than short-term demographic, social, or environmental patterning?",
			"How well do findings from large European-ancestry datasets generalize to other populations?",
			"Which traits matter most for future selection as fertility patterns, disease environments, migration, and technology keep changing?",
			"How should public explanations avoid sliding from 'selection is detectable' into exaggerated claims about human improvement or decline?"
		],
		whatWouldChangeMinds: [
			"Evidence that modern human populations no longer have heritable variation, mutation, drift, migration, or reproductive differences capable of shifting allele frequencies.",
			"Large, replicated genomic and demographic datasets showing no detectable selection or evolutionary change across contemporary human populations.",
			"A better evolutionary model explaining observed genomic and reproductive patterns without ongoing evolutionary processes."
		],
		misconceptions: [
			"Modern medicine is often treated as proof that natural selection disappeared, but survival is only one route through which evolutionary change can occur.",
			"'Still evolving' does not mean humans are inevitably becoming smarter, weaker, better, or worse.",
			"Detecting selection on a trait is not the same as making confident long-term predictions about the future of humanity.",
			"Cultural change can be much faster than genetic evolution while still changing which genetic variants become more or less common."
		],
		editorSummary:
			"This page should handle the common 'humans stopped evolving' claim without sensational predictions. Keep the center simple: evolution is allele-frequency change, and modern conditions redirect rather than abolish evolutionary forces.",
		uncertaintySummary:
			"The core answer is stable: humans have not stopped evolving. The main uncertainty is not whether evolutionary processes still operate, but how large, fast, trait-specific, and generalizable contemporary selection signals are.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail:
					"Many contemporary genomic datasets overrepresent European-ancestry populations, so editors should avoid treating one cohort as a global human pattern."
			},
			{
				type: "imprecision",
				detail:
					"Detected selection signals are often small and slow, especially compared with cultural, medical, and environmental changes over the same period."
			},
			{
				type: "bias",
				detail:
					"Population stratification, fertility measurement, and social confounding can distort claims about selection on complex traits."
			},
			{
				type: "timing",
				detail:
					"Short-term contemporary signals should not be projected far into the future without strong assumptions about changing environments and fertility patterns."
			}
		],
		searchDatabases: ["Consensus", "PubMed", "OpenAlex", "Crossref"],
		searchCutoffAt: "2026-07-03T15:58:00.000Z",
		inclusionRules: [
			"Prioritize reviews and population-genetic studies that directly address contemporary or recent human evolutionary change.",
			"Separate evidence that selection exists from speculative claims about desirable or undesirable future traits.",
			"Use examples only when the source ties reproductive success, heritability, or genetic association to evolutionary interpretation."
		],
		exclusionRules: [
			"Exclude popular evolutionary psychology claims that are not backed by population-genetic or demographic evidence.",
			"Exclude deterministic claims that rank groups or traits as biologically superior or inferior.",
			"Exclude futurist speculation unless it is clearly framed as context rather than evidence."
		],
		surveillanceSpec: {
			focus:
				"Track reviews and large-cohort genomic studies about recent or ongoing natural selection in human populations, especially work that changes interpretation cautions.",
			cadenceDays: 120,
			watchTerms: [
				"modern humans still evolving",
				"contemporary human natural selection",
				"recent human evolution",
				"polygenic selection fertility"
			],
			integrityMonitors: ["Crossref update metadata", "PubMed linking", "Europe PMC status checks"],
			guidelineMonitors: ["Major evolutionary genetics reviews", "Population genetics review literature"],
			triggerRules: [
				"Recheck the page if a major review changes the interpretation of contemporary human selection evidence.",
				"Recheck immediately if a cited paper is corrected, retracted, or receives a major methodological critique.",
				"Escalate if a new large-cohort study materially changes the caution language around population stratification or generalizability."
			]
		},
		appraisalTools: [
			"Population-genetics review appraisal",
			"Cohort representativeness and stratification check",
			"Public-communication overclaim screen"
		],
		evidenceSummaries: [
			{
				question: "Have modern humans stopped evolving?",
				population: "Contemporary and recent human populations studied with demographic and genomic evidence.",
				finding:
					"Reviews and large-cohort studies support the conclusion that evolutionary processes, including natural selection, still operate in humans, though observed changes are generally slow and context-dependent.",
				effectDirection: "supports",
				magnitude:
					"Detectable selection signals exist, but effect sizes and projected trait changes are usually modest over short timescales.",
				certainty: "moderate",
				limitations: [
					"Large biobank datasets are not globally representative.",
					"Complex traits are affected by social structure, environment, and measurement choices.",
					"Short-term signals should not be turned into confident long-term forecasts."
				]
			}
		],
		institutionalAnchors: [
			{ name: "Nature Reviews Genetics", role: "Review anchor for measuring selection in contemporary humans" },
			{ name: "Proceedings of the National Academy of Sciences", role: "Primary recent-selection study and methods-discussion source" },
			{ name: "Population genetics literature", role: "Framework anchor for mutation, migration, drift, and selection" }
		],
		authorLine: "Is There Consensus editorial seed",
		reviewerLine: "Pending expert review",
		coiSummary: "No financial conflict identified for this editorial seed.",
		independenceSummary:
			"Seeded from peer-reviewed evolutionary genetics literature located through Consensus and source metadata checks.",
		lastRetractionCheckAt: "2026-07-03T15:58:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T15:58:00.000Z",
				kind: "publication",
				summary:
					"Initial contemporary-human-evolution claim page published from Consensus research results and peer-reviewed review/cohort sources."
			}
		],
		sources: [
			{
				kind: "context",
				title: "Measuring selection in contemporary human populations",
				publisher: "Nature Reviews Genetics",
				year: 2010,
				url: "https://doi.org/10.1038/nrg2831",
				doi: "10.1038/nrg2831",
				pmid: "20680024",
				citationCheckedAt: "2026-07-03T15:58:00.000Z",
				stance: "supports",
				note:
					"Review located through Consensus; summarizes methods for measuring selection and inheritance in humans and states that evidence strongly suggests humans are still evolving.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Natural selection in a contemporary human population",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2010,
				url: "https://www.pnas.org/doi/10.1073/pnas.0906199106",
				doi: "10.1073/pnas.0906199106",
				pmid: "19858476",
				citationCheckedAt: "2026-07-03T15:58:00.000Z",
				stance: "supports",
				note:
					"Framingham Heart Study analysis estimating selection and genetic covariance in women and predicting slow, gradual evolutionary change in several traits.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Evidence of directional and stabilizing selection in contemporary humans",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2018,
				url: "https://www.pnas.org/doi/10.1073/pnas.1707227114",
				doi: "10.1073/pnas.1707227114",
				pmid: "29255044",
				citationStatus: "corrected",
				citationCheckedAt: "2026-07-03T15:58:00.000Z",
				statusSources: ["https://www.pnas.org/doi/10.1073/pnas.1806837115"],
				stance: "supports",
				note:
					"UK Biobank study reporting phenotypic and genetic evidence consistent with directional selection and widespread weak stabilizing selection; citation has a published PNAS correction.",
				order: 3
			},
			{
				kind: "context",
				title: "The challenge of detecting recent natural selection in human populations",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2022,
				url: "https://www.pnas.org/doi/10.1073/pnas.2203237119",
				doi: "10.1073/pnas.2203237119",
				pmid: "35353603",
				citationCheckedAt: "2026-07-03T15:58:00.000Z",
				stance: "context",
				note:
					"Methods and interpretation context explaining why very recent or ongoing selection can be studied with large datasets but remains difficult to interpret cleanly.",
				order: 4
			}
		]
	},
	{
		topicSlug: "biology-and-evolution",
		title: "Can evolution be observed happening today?",
		slug: "can-evolution-be-observed-happening-today",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. Evolution is heritable change in populations over generations, and scientists observe it today in microbes, pests, viruses, and wild animal populations. These observations do not show every deep historical transition in real time, and some short-term changes reverse when environments change. But evolution is not only a past-tense inference.",
		stableCore: [
			"National Academies resources define evolution as heritable population-trait change across generations and say it is still occurring.",
			"National Academies teaching guidance says short-term evolutionary processes can be observed directly, including antibiotic resistance.",
			"UC Berkeley's Understanding Evolution lists directly observed cases: pesticide and antibiotic resistance, climate responses, and Galapagos finch divergence.",
			"Lenski's long-term E. coli experiment directly observed adaptation, genome evolution, mutation-rate changes, ecotype divergence, and citrate use across 60,000+ generations.",
			"Darwin's finch studies tracked repeated body-size and beak-trait shifts under selection; later genomics linked beak-size evolution to allele-frequency changes."
		],
		openQuestions: [
			"Which observed short-term changes will persist, reverse, or contribute to longer-term divergence?",
			"How repeatable are evolutionary outcomes when environments, starting genetic variation, chance mutation, and population structure differ?",
			"How should educators separate directly observed evolutionary processes from deep-time evolutionary history, which also rests on fossils, genetics, and comparative biology?"
		],
		whatWouldChangeMinds: [
			"Repeated controlled experiments and field studies showing that heritable population traits do not change under mutation, selection, drift, or migration.",
			"A better biological framework that explains antibiotic resistance, experimental microbial adaptation, wild-population trait change, fossils, and genomics without evolutionary change.",
			"Major National Academies, AAAS, or comparable evolutionary-biology reassessments withdrawing evolution as the organizing explanation for observed biological change."
		],
		misconceptions: [
			"Short-term evolution is sometimes dismissed as 'only adaptation,' but adaptation by natural selection is one of evolution's core mechanisms.",
			"Directly observing evolution does not require watching a modern animal turn into a radically different species during one human lifetime.",
			"Some observed changes can reverse when environments change; reversibility does not make the evolutionary process unreal.",
			"Laboratory microbe studies are not the only evidence for evolution, but they clearly show evolutionary mechanisms under controlled conditions."
		],
		editorSummary:
			"This page answers the common 'no one has seen evolution happen' objection without overclaiming. The central distinction: evolutionary processes are directly observable now, while deep-time common ancestry is supported by experiments, field observations, fossils, genetics, and comparative biology.",
		uncertaintySummary:
			"The consensus that evolution can be observed is very strong. Uncertainty is mainly about the durability, repeatability, and long-term implications of particular short-term examples, not about whether heritable population change occurs.",
		searchDatabases: ["Consensus", "PubMed", "OpenAlex", "Crossref", "National Academies"],
		searchCutoffAt: "2026-07-04T05:23:57.000Z",
		inclusionRules: [
			"Prioritize institutional science-education anchors, experimental evolution records, and long-running field studies with genetic or trait-level evidence.",
			"Use examples only when the source ties observed change to heritable population traits, natural selection, allele-frequency change, or genome evolution.",
			"Separate direct observation of evolutionary processes from broader historical inference about deep-time common ancestry."
		],
		exclusionRules: [
			"Exclude creationist or advocacy arguments unless they are being summarized as misconceptions, not as evidence.",
			"Exclude examples of individual acclimation or learning unless the source connects them to heritable population-level change.",
			"Exclude unsourced popular examples when stronger institutional or peer-reviewed examples cover the same point."
		],
		surveillanceSpec: {
			focus:
				"Track institutional evolution-education updates, landmark experimental-evolution reviews, and long-term field/genomic studies that change how observed evolution should be explained.",
			cadenceDays: 120,
			watchTerms: [
				"observed evolution",
				"experimental evolution",
				"long-term evolution experiment",
				"Darwin finches evolution",
				"antibiotic resistance evolution"
			],
			integrityMonitors: ["Crossref update metadata", "PubMed linking", "Manual institutional watch"],
			guidelineMonitors: [
				"National Academies evolution education resources",
				"UC Berkeley Understanding Evolution updates",
				"Major evolutionary biology reviews"
			],
			triggerRules: [
				"Recheck if a major institutional source changes its explanation of directly observed evolution.",
				"Recheck if a cited Science or ISME Journal paper receives a correction, retraction, or major methodological critique.",
				"Escalate if a new review changes the standard examples used to explain observable evolution to the public."
			]
		},
		appraisalTools: [
			"Evolution education consensus-source check",
			"Experimental evolution evidence appraisal",
			"Field study and genomics triangulation check"
		],
		evidenceSummaries: [
			{
				question: "Can evolution be observed happening today?",
				population:
					"Microbial experimental populations, antimicrobial resistance contexts, and wild populations such as Darwin's finches.",
				finding:
					"Institutional science sources and peer-reviewed lab, field, and genomic studies show that evolution can be directly observed as heritable population change over generations.",
				effectDirection: "supports",
				magnitude:
					"Examples range from tens of thousands of microbial generations in the lab to decades of measurable finch trait and allele-frequency change in the wild.",
				certainty: "high",
				limitations: [
					"Short-term observed evolution does not by itself show every deep historical transition in real time.",
					"Some observed trait changes can reverse or oscillate when selection pressures change.",
					"Field examples are more ecologically realistic but harder to control than laboratory experiments."
				]
			}
		],
		institutionalAnchors: [
			{ name: "National Academies", role: "Consensus and science-education anchor for evolution evidence" },
			{ name: "UC Berkeley Understanding Evolution", role: "Public education anchor for observed evolution examples" },
			{ name: "Peer-reviewed evolutionary biology literature", role: "Experimental, field, and genomic evidence anchor" }
		],
		authorLine: "Is There Consensus editorial seed",
		reviewerLine: "Pending expert review",
		coiSummary: "No financial conflict identified for this editorial seed.",
		independenceSummary:
			"Seeded from National Academies and UC Berkeley public science-education sources plus peer-reviewed evolutionary biology records located through Consensus and PubMed metadata checks.",
		lastRetractionCheckAt: "2026-07-04T05:23:57.000Z",
		changeLog: [
			{
				date: "2026-07-04T05:23:57.000Z",
				kind: "publication",
				summary:
					"Initial observed-evolution claim page published from National Academies, UC Berkeley, E. coli experimental evolution, and Darwin's finch field/genomic evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Evolution Resources",
				publisher: "National Academies",
				url: "https://www.nationalacademies.org/evolution-resources",
				stance: "supports",
				note:
					"Public National Academies anchor defining evolution as heritable population change and explaining that evolution is continuing to occur, including influenza change, antibiotic-resistant bacteria, and insecticide-resistant mosquitoes.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Teaching About Evolution and the Nature of Science: Frequently Asked Questions",
				publisher: "National Academy of Sciences / National Academies Press",
				year: 1998,
				url: "https://www.nationalacademies.org/read/5787/chapter/6",
				doi: "10.17226/5787",
				stance: "supports",
				note:
					"Teaching guidance explaining that past events can be studied scientifically and that many key aspects of evolution can be observed directly, including bacteria evolving antibiotic resistance.",
				order: 2
			},
			{
				kind: "context",
				title: "Observations of evolution in the wild",
				publisher: "University of California Museum of Paleontology",
				year: 2020,
				url: "https://evolution.berkeley.edu/lines-of-evidence/observations-of-evolution-in-the-wild/",
				stance: "supports",
				note:
					"Public education source cataloging directly observed evolution in wild populations, including pesticide resistance, antibiotic resistance, climate responses, and Galapagos finches.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Experimental evolution and the dynamics of adaptation and genome evolution in microbial populations",
				publisher: "The ISME Journal",
				year: 2017,
				url: "https://doi.org/10.1038/ismej.2017.69",
				doi: "10.1038/ismej.2017.69",
				pmid: "28509909",
				pmcid: "PMC5607360",
				citationCheckedAt: "2026-07-04T05:23:57.000Z",
				stance: "supports",
				note:
					"Review of the long-term E. coli experiment, summarizing directly observed adaptation, genome evolution, ecotype divergence, mutation-rate changes, and citrate use across more than 60,000 generations.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Unpredictable Evolution in a 30-Year Study of Darwin's Finches",
				publisher: "Science",
				year: 2002,
				url: "https://doi.org/10.1126/science.1070315",
				doi: "10.1126/science.1070315",
				pmid: "11976447",
				citationCheckedAt: "2026-07-04T05:23:57.000Z",
				stance: "supports",
				note:
					"Thirty-year field study on Daphne Major documenting repeated body-size and beak-trait changes under fluctuating natural selection and occasional hybridization.",
				order: 5
			},
			{
				kind: "landmark_study",
				title: "A beak size locus in Darwin's finches facilitated character displacement during a drought",
				publisher: "Science",
				year: 2016,
				url: "https://doi.org/10.1126/science.aad8786",
				doi: "10.1126/science.aad8786",
				pmid: "27102486",
				citationCheckedAt: "2026-07-04T05:23:57.000Z",
				stance: "supports",
				note:
					"Genomic study linking a documented drought-driven finch beak-size shift to HMGA2-region variation, including strong selection against large-beak genotypes in medium ground finches.",
				order: 6
			},
			{
				kind: "landmark_study",
				title: "Community-wide genome sequencing reveals 30 years of Darwin's finch evolution",
				publisher: "Science",
				year: 2023,
				url: "https://doi.org/10.1126/science.adf6218",
				doi: "10.1126/science.adf6218",
				pmid: "37769091",
				citationCheckedAt: "2026-07-04T05:23:57.000Z",
				stance: "supports",
				note:
					"Genome study of 3,955 Darwin's finches linking beak-size evolution over 30 years to allele-frequency changes at major loci, including abrupt shifts during drought-driven natural selection.",
				order: 7
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Does nicotine harm brain development into the mid-20s?",
		slug: "does-nicotine-harm-brain-development-into-the-mid-20s",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 93,
		bottomLine:
			"Yes. Public-health authorities warn that nicotine exposure during adolescence and young adulthood can harm brain development, which continues until about age 25. The strongest practical consensus is prevention-focused: youth and young adults should avoid nicotine products, including e-cigarettes and pouches, because nicotine is addictive and can affect attention, learning, mood, and impulse control.",
		stableCore: [
			"CDC states that nicotine can harm brain development, which continues until about age 25.",
			"CDC also warns that youth can show signs of nicotine addiction quickly, sometimes before regular or daily use.",
			"WHO warns that nicotine consumption in children and adolescents has negative impacts on brain development, with possible long-term consequences for learning and anxiety disorders.",
			"Surgeon General materials treat adolescent nicotine exposure as a public-health concern because most tobacco use starts during youth and because early nicotine exposure can shape addiction risk."
		],
		openQuestions: [
			"Which cognitive, mood, and impulse-control effects are most persistent after nicotine cessation versus reversible with time and treatment?",
			"How do risk profiles differ across cigarettes, e-cigarettes, nicotine pouches, nicotine concentration, frequency, and co-use with cannabis or alcohol?",
			"How should prevention messages distinguish nicotine risks in youth from medically supervised nicotine replacement for adults trying to quit smoking?"
		],
		whatWouldChangeMinds: [
			"Major CDC, WHO, or Surgeon General reassessments finding that adolescent nicotine exposure does not materially affect brain development or addiction risk.",
			"Long-term human studies showing no meaningful cognitive, mood, impulse-control, or dependence-related harm from adolescent nicotine exposure across product types.",
			"Evidence that modern non-combustible nicotine products used by youth do not deliver enough nicotine to create dependence or neurodevelopmental concern."
		],
		misconceptions: [
			"'It is not smoke' is often mistaken for 'it cannot affect the brain,' even though nicotine itself is the addictive neuroactive exposure.",
			"Some people treat nicotine as an adult-only concern, but adolescence is a period of heightened vulnerability to dependence.",
			"Adult cessation use of nicotine replacement is sometimes conflated with recreational youth nicotine exposure."
		],
		editorSummary:
			"This page should anchor the youth vaping and nicotine-pouch pages. Keep the wording on 'can harm' and 'development continues until about 25' rather than overstating irreversible outcomes for every user.",
		uncertaintySummary:
			"The prevention consensus is strong, but exact effect sizes, reversibility, and product-specific risk levels are still harder to pin down in humans because exposure patterns, co-use, and social context vary.",
		searchCutoffAt: "2026-07-02T22:33:57.000Z",
		lastRetractionCheckAt: "2026-07-02T22:33:57.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:33:57.000Z",
				kind: "publication",
				summary:
					"Initial adolescent nicotine brain-development claim page published from CDC, WHO, and Surgeon General sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Health Effects of Vaping",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/tobacco/e-cigarettes/health-effects.html",
				stance: "supports",
				note:
					"Primary anchor for the about-age-25 brain-development statement, rapid youth nicotine addiction, and attention, learning, mood, and impulse-control risks.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Tobacco: E-cigarettes",
				publisher: "World Health Organization",
				url: "https://www.who.int/news-room/questions-and-answers/item/tobacco-e-cigarettes",
				stance: "supports",
				note:
					"Global public-health anchor stating that nicotine in children and adolescents negatively affects brain development and may lead to learning and anxiety consequences.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "E-Cigarette Use Among Youth and Young Adults: A Report of the Surgeon General",
				publisher: "U.S. Surgeon General / NCBI Bookshelf",
				year: 2016,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK538680/",
				pmid: "30869850",
				stance: "supports",
				note:
					"Surgeon General assessment explaining why youth and young-adult e-cigarette exposure is a distinct public-health concern rather than an adult cessation question.",
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
		title: "Can cannabis be addictive and lead to cannabis use disorder?",
		slug: "can-cannabis-be-addictive-and-lead-to-cannabis-use-disorder",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 87,
		bottomLine:
			"Yes. Cannabis can be addictive and can lead to cannabis use disorder, especially with frequent use and earlier initiation. That does not mean every adult who uses cannabis will develop a disorder, but it does mean the 'not addictive' claim is wrong and risk communication should be direct about cravings, withdrawal, tolerance, unsuccessful quit attempts, and continued use despite harm.",
		stableCore: [
			"CDC says approximately 3 in 10 people who use cannabis have cannabis use disorder and that risk is greater for people who start during youth or adolescence and who use more frequently.",
			"National Academies found substantial evidence that increasing cannabis-use frequency is statistically associated with progression to problem cannabis use, and substantial evidence that earlier initiation is a risk factor.",
			"A 2020 systematic review and meta-analysis estimated that about 22% of people who use cannabis have cannabis use disorder, with higher dependence risk among young people who use weekly or daily.",
			"A 2022 systematic review and meta-analysis found a log-linear dose-response relationship: CUD risk rose from yearly to monthly, weekly, and daily use, with daily use associated with the largest absolute risk increase."
		],
		openQuestions: [
			"How much do THC potency, concentrates, vaping, edibles, and route of administration change CUD risk beyond frequency of use?",
			"Which prevention and treatment approaches work best for adolescents, daily users, medical users, and people with co-occurring mental-health conditions?",
			"How should legalization and medical-use messaging communicate CUD risk without implying that all cannabis use is identical or that people with CUD should be stigmatized?"
		],
		whatWouldChangeMinds: [
			"Large contemporary longitudinal studies showing that frequent use, early initiation, and higher exposure no longer predict CUD after strong control for confounding and reverse causality.",
			"Major CDC, National Academies, WHO, DSM, or ICD reassessments concluding that cannabis use disorder is not a valid or clinically meaningful disorder.",
			"High-quality evidence showing that modern high-THC products, concentrates, or daily-use patterns do not increase tolerance, withdrawal, craving, impaired control, or continued use despite harm."
		],
		misconceptions: [
			"'Natural' or legal is sometimes mistaken for 'not addictive,' even though addiction risk depends on exposure, vulnerability, and product characteristics.",
			"Cannabis withdrawal and tolerance are sometimes dismissed as impossible, but they are part of the clinical CUD picture for some users.",
			"CUD risk does not mean every use is addiction, and it does not mean people using cannabis medically are automatically misusing it."
		],
		editorSummary:
			"This page should be frank without sounding punitive: cannabis can be addictive, risk rises with frequency and early initiation, and the goal is practical risk literacy rather than a blanket moral judgment about every adult or medical use.",
		uncertaintySummary:
			"The existence of CUD and the frequency/early-initiation risk gradient are well supported. The more uncertain parts are the exact modern risk by product potency, route, legal-market context, individual vulnerability, and treatment pathway.",
		searchCutoffAt: "2026-07-03T14:53:10.000Z",
		lastRetractionCheckAt: "2026-07-03T14:53:10.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:53:10.000Z",
				kind: "publication",
				summary:
					"Initial cannabis-use-disorder page published from CDC guidance, National Academies conclusions, and CUD prevalence/frequency meta-analyses."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Understanding Your Risk for Cannabis Use Disorder",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/cannabis/health-effects/cannabis-use-disorder.html",
				stance: "supports",
				note:
					"Primary public-health anchor for the approximately 3-in-10 CUD estimate, signs of CUD, and higher risk with youth initiation and more frequent use.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "The Health Effects of Cannabis and Cannabinoids: Problem Cannabis Use",
				publisher: "National Academies / NCBI Bookshelf",
				year: 2017,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK425740/",
				doi: "10.17226/24625",
				stance: "supports",
				note:
					"Assessment anchor concluding substantial evidence that greater frequency increases the likelihood of problem cannabis use and that earlier initiation is a risk factor.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"What is the prevalence and risk of cannabis use disorders among people who use cannabis? a systematic review and meta-analysis.",
				publisher: "Addictive Behaviors",
				year: 2020,
				url: "https://doi.org/10.1016/j.addbeh.2020.106479",
				doi: "10.1016/j.addbeh.2020.106479",
				pmid: "32485547",
				stance: "supports",
				note:
					"Meta-analysis estimating that 22% of people who use cannabis have CUD and that young weekly or daily users have higher cannabis-dependence risk.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Identifying risk-thresholds for the association between frequency of cannabis use and development of cannabis use disorder",
				publisher: "Drug and Alcohol Dependence",
				year: 2022,
				url: "https://doi.org/10.1016/j.drugalcdep.2022.109582",
				doi: "10.1016/j.drugalcdep.2022.109582",
				pmid: "35932748",
				stance: "supports",
				note:
					"Prospective-study meta-analysis finding a dose-response relationship from yearly through daily use, with daily use associated with the highest relative and absolute CUD risk.",
				order: 4
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Does cannabis use impair driving and increase crash risk?",
		slug: "does-cannabis-use-impair-driving-and-increase-crash-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
			"Yes. Acute cannabis or THC use impairs skills needed for safe driving and is associated with increased crash risk. The exact risk varies by dose, time since use, route, tolerance, co-use with alcohol or other drugs, and study design, so the consensus is not that blood THC works like blood alcohol concentration. The practical bottom line is simpler: do not drive while impaired by cannabis, and avoid mixing cannabis with alcohol before driving.",
		stableCore: [
			"CDC says cannabis can slow reaction time and decision-making, impair coordination, distort perception, and has been associated with car crashes.",
			"NHTSA says marijuana and other drugs can impair driving because they slow coordination, judgment, and reaction times, and that combining substances can amplify impairment.",
			"National Academies found substantial evidence of a statistical association between cannabis use and increased risk of motor vehicle crashes.",
			"Asbridge and colleagues' 2012 meta-analysis found acute cannabis consumption was associated with higher collision risk, with a pooled odds ratio of 1.92.",
			"McCartney and colleagues' 2021 meta-analysis found acute THC impairs driving-related cognitive skills at peak effects; most skills recovered within about 5 hours after inhaled 20 mg THC and almost all within about 7 hours, while oral THC may last longer."
		],
		openQuestions: [
			"What blood, oral-fluid, behavioral, or device-based measures best identify real-time THC impairment in individual drivers?",
			"How do edibles, high-potency concentrates, tolerance, chronic use, sleepiness, age, and alcohol co-use change crash risk and impairment duration?",
			"Which public-safety policies reduce cannabis-impaired driving without relying on misleading one-size-fits-all THC cutoffs?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled epidemiologic studies showing no increased crash risk after acute cannabis use once alcohol, other drugs, driving exposure, and risk-taking are handled well.",
			"Controlled experimental or on-road studies showing no meaningful impairment in reaction time, lane control, divided attention, perception, or judgment after real-world THC exposure.",
			"Validated impairment standards showing that current practical warnings are overly conservative across routes, doses, users, and time since use."
		],
		misconceptions: [
			"'I drive better high' is not supported by the evidence on reaction time, coordination, perception, and lane-control impairment.",
			"Legal or medical cannabis access does not make driving after THC use safe.",
			"Blood THC is not as straightforward as blood alcohol concentration; a test result can be hard to map to impairment in a specific person."
		],
		editorSummary:
			"This page should separate the strong safety message from the harder enforcement science. Cannabis impairs driving-relevant skills and is linked to crash risk, but THC cutoffs, impairment duration, and individual variability require careful wording.",
		uncertaintySummary:
			"The impairment and crash-risk direction is well supported, while the exact magnitude, duration, dose-response curve, route-specific risk, and best roadside threshold remain more uncertain than alcohol impairment standards.",
		searchCutoffAt: "2026-07-03T14:53:10.000Z",
		lastRetractionCheckAt: "2026-07-03T14:53:10.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:53:10.000Z",
				kind: "publication",
				summary:
					"Initial cannabis-driving page published from CDC and NHTSA guidance, National Academies conclusions, and crash-risk/THC-impairment meta-analyses."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Cannabis and Driving",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/cannabis/health-effects/driving.html",
				stance: "supports",
				note:
					"Primary public-health anchor for reaction time, decision-making, coordination, perception, acute-crash association, and polysubstance impairment cautions.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Drug-Impaired Driving",
				publisher: "National Highway Traffic Safety Administration",
				url: "https://www.nhtsa.gov/risky-driving/drug-impaired-driving",
				stance: "supports",
				note:
					"Road-safety anchor stating that marijuana and other drugs can impair driving by slowing coordination, judgment, and reaction times, with amplified effects from multiple substances.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "The Health Effects of Cannabis and Cannabinoids: Injury and Death",
				publisher: "National Academies / NCBI Bookshelf",
				year: 2017,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK425742/",
				doi: "10.17226/24625",
				stance: "supports",
				note:
					"Assessment anchor concluding substantial evidence of a statistical association between cannabis use and increased motor-vehicle-crash risk.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Acute cannabis consumption and motor vehicle collision risk: systematic review of observational studies and meta-analysis",
				publisher: "The BMJ",
				year: 2012,
				url: "https://doi.org/10.1136/bmj.e536",
				doi: "10.1136/bmj.e536",
				pmid: "22323502",
				pmcid: "PMC3277079",
				stance: "supports",
				note:
					"Observational-study meta-analysis finding acute cannabis consumption associated with increased motor-vehicle-collision risk, with pooled OR 1.92 and higher estimates for fatal collisions.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Determining the magnitude and duration of acute THC-induced driving and cognitive impairment",
				publisher: "Neuroscience and Biobehavioral Reviews",
				year: 2021,
				url: "https://doi.org/10.1016/j.neubiorev.2021.01.003",
				doi: "10.1016/j.neubiorev.2021.01.003",
				pmid: "33497784",
				stance: "supports",
				note:
					"Meta-analytic review of 80 publications finding acute THC impairment in driving-related skills and estimating recovery timing that varies by route, dose, user history, and time since use.",
				order: 5
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
		title: "Is cognitive behavioral therapy for insomnia a first-line treatment for chronic insomnia?",
		slug: "is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. For adult chronic insomnia, CBT-I is recommended first when it is available. It is not just generic sleep hygiene: evidence-based packages use structured behavioral and cognitive components, including stimulus control, sleep restriction, and cognitive restructuring. Sleeping pills can still help some people short term, but the consensus default for persistent insomnia is CBT-I before a medication-first long-term plan.",
		stableCore: [
			"The American College of Physicians recommends CBT-I as the initial treatment for adults with chronic insomnia disorder.",
			"The American Academy of Sleep Medicine strongly recommends multicomponent CBT-I for adult chronic insomnia and recommends against sleep hygiene as a stand-alone treatment.",
			"A 2024 JAMA Psychiatry network meta-analysis of 241 trials (31,452 adults) found useful components included cognitive restructuring, third-wave components, sleep restriction, and stimulus control; the best modeled in-person package had a number needed to treat of about 3 compared with psychoeducation.",
			"A 2025 JAMA Internal Medicine meta-analysis of 67 RCTs (5,232 adults with chronic disease) found CBT-I improved insomnia severity, sleep efficiency, and sleep-onset latency, with high satisfaction, 13.3% mean dropout, and rare treatment-related adverse effects."
		],
		openQuestions: [
			"How can health systems expand access to trained CBT-I clinicians, digital CBT-I, brief behavioral therapy, and primary-care delivery without lowering quality?",
			"Which adaptations work best for shift workers, older adults, people with severe psychiatric or medical comorbidity, and people with objective short sleep duration?",
			"When symptoms are severe or access is delayed, how should clinicians balance CBT-I with short-term medication, combination treatment, side-effect risk, and patient preference?"
		],
		whatWouldChangeMinds: [
			"Major guideline updates from ACP, AASM, NICE, or comparable bodies withdrawing CBT-I's first-line status for adult chronic insomnia.",
			"Large, low-bias trials showing no clinically meaningful CBT-I advantage over credible controls on insomnia severity, sleep continuity, daytime function, or durability.",
			"Long-term evidence that medication-first strategies consistently outperform CBT-I with fewer harms and better patient-centered outcomes."
		],
		misconceptions: [
			"CBT-I is not just advice to avoid screens or keep a bedtime routine; sleep hygiene alone is not the core evidence-based treatment.",
			"Calling insomnia treatable with behavioral therapy does not mean the symptoms are imaginary or the person is at fault.",
			"Sleeping pills helping some people does not make them the default long-term first-line plan for chronic insomnia.",
			"Digital CBT-I can improve access, but delivery format, adherence, comorbidity, and symptom severity still matter."
		],
		editorSummary:
			"This page should give readers a practical treatment-consensus anchor: chronic insomnia is treatable, CBT-I is first-line, and the main real-world problem is access and matching delivery format to patient needs.",
		uncertaintySummary:
			"CBT-I's first-line status for adult chronic insomnia is strongly supported. Remaining uncertainty is mostly about implementation, delivery format, subgroup adaptation, access, and when medication should be added or used short term.",
		searchCutoffAt: "2026-07-03T20:54:57.000Z",
		lastRetractionCheckAt: "2026-07-03T20:54:57.000Z",
		changeLog: [
			{
				date: "2026-07-03T20:54:57.000Z",
				kind: "publication",
				summary:
					"Initial CBT-I and chronic-insomnia treatment claim page published from ACP and AASM guideline recommendations plus recent randomized-trial meta-analyses."
			}
		],
		sources: [
			{
				kind: "guideline",
				title:
					"Management of Chronic Insomnia Disorder in Adults: A Clinical Practice Guideline From the American College of Physicians",
				publisher: "Annals of Internal Medicine",
				year: 2016,
				url: "https://pubmed.ncbi.nlm.nih.gov/27136449/",
				doi: "10.7326/M15-2175",
				pmid: "27136449",
				stance: "supports",
				note:
					"Guideline anchor recommending CBT-I as initial treatment for adult chronic insomnia, with shared decision-making about short-term medication if CBT-I alone is unsuccessful.",
				order: 1
			},
			{
				kind: "guideline",
				title:
					"Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine clinical practice guideline",
				publisher: "Journal of Clinical Sleep Medicine",
				year: 2021,
				url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7853203/",
				doi: "10.5664/jcsm.8986",
				pmid: "33164742",
				pmcid: "PMC7853203",
				stance: "supports",
				note:
					"AASM guideline strongly recommending multicomponent CBT-I for adult chronic insomnia and recommending against sleep hygiene alone.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Components and Delivery Formats of Cognitive Behavioral Therapy for Chronic Insomnia in Adults",
				publisher: "JAMA Psychiatry",
				year: 2024,
				url: "https://pubmed.ncbi.nlm.nih.gov/38231522/",
				doi: "10.1001/jamapsychiatry.2023.5060",
				pmid: "38231522",
				stance: "supports",
				note:
					"Component network meta-analysis of 241 trials and 31,452 adults identifying useful CBT-I elements, including cognitive restructuring, third-wave components, sleep restriction, stimulus control, and in-person delivery.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Cognitive Behavioral Therapy for Insomnia in People With Chronic Disease: A Systematic Review and Meta-Analysis",
				publisher: "JAMA Internal Medicine",
				year: 2025,
				url: "https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/2839294",
				doi: "10.1001/jamainternmed.2025.4610",
				pmid: "40982264",
				stance: "supports",
				note:
					"Meta-analysis of 67 RCTs and 5,232 adults with chronic disease finding improved insomnia severity, sleep efficiency, and sleep-onset latency, with high satisfaction and rare treatment-related adverse effects.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Efficacy of digital cognitive behavioural therapy for insomnia: a meta-analysis of randomised controlled trials",
				publisher: "Sleep Medicine",
				year: 2020,
				url: "https://pubmed.ncbi.nlm.nih.gov/32950013/",
				doi: "10.1016/j.sleep.2020.08.020",
				pmid: "32950013",
				stance: "context",
				note:
					"Digital CBT-I meta-analysis of 33 RCTs supporting digital delivery as an access-expanding option, while face-to-face CBT-I showed somewhat larger insomnia-severity improvements.",
				order: 5
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do probiotics reliably treat depression or anxiety?",
		slug: "do-probiotics-reliably-treat-depression-or-anxiety",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 66,
		evidenceCertainty: "low",
		reviewMode: "living",
		bottomLine:
			"Not reliably as a standalone treatment. Randomized-trial meta-analyses increasingly find small to moderate symptom improvements, especially in clinically diagnosed samples or as add-ons to usual care. But the evidence is still too heterogeneous by strain, dose, duration, population, and outcome scale to treat 'probiotics' as a proven depression or anxiety treatment. The safest consensus is that they are promising adjuncts to study and discuss with a clinician, not replacements for evidence-based mental-health care.",
		stableCore: [
			"Probiotics are live microorganisms intended to provide a health benefit, but effects are strain- and formulation-specific; one product or yogurt cannot stand in for every tested intervention.",
			"A 2019 meta-analysis of 34 controlled clinical trials found small average probiotic effects for depression and anxiety, while prebiotics did not differ from placebo.",
			"A 2021 review of clinical depression trials found benefit when probiotics were added to antidepressants, but no significant standalone benefit in the limited standalone evidence.",
			"A 2025 Nutrition Reviews meta-analysis of clinically diagnosed samples found reductions in depression and anxiety symptoms across 23 RCTs and 1,401 patients, but reported high heterogeneity and variation by duration and formulation.",
			"Large depression and anxiety guidelines still center psychological therapies, antidepressant medication when appropriate, monitoring, and shared decision-making rather than probiotic products as first-line care."
		],
		openQuestions: [
			"Which strains, combinations, doses, treatment durations, and baseline microbiome profiles matter for specific depression or anxiety subgroups?",
			"Do symptom-score improvements translate into remission, relapse prevention, functioning, quality of life, or reduced medication burden over long follow-up?",
			"How much of the apparent benefit depends on adjunctive use with antidepressants, diet changes, expectancy, gastrointestinal comorbidity, or small-study effects?"
		],
		whatWouldChangeMinds: [
			"Large, preregistered, multi-site RCTs showing replicated clinically meaningful benefits for named probiotic formulations on remission or functioning, not only short-term symptom scales.",
			"Major NICE, APA, ACP, or comparable guideline updates recommending specific probiotic formulations for defined depression or anxiety populations.",
			"High-quality null trials showing that current positive effects disappear after better blinding, larger samples, longer follow-up, and strain-specific replication."
		],
		misconceptions: [
			"The gut-brain axis is real, but a plausible mechanism does not prove that any probiotic product treats depression or anxiety.",
			"A positive meta-analysis does not mean every probiotic, food, dose, or supplement brand has the same effect.",
			"Adjunctive benefit in people already receiving mental-health treatment is not the same as proof that probiotics can replace therapy or medication.",
			"Natural or food-based products can still have safety, quality-control, interaction, or delay-of-care concerns."
		],
		misconceptionTags: [
			"mechanism-is-not-real-world-effect",
			"one-study-doesnt-overturn-evidence",
			"cherry-picking-distorts-the-evidence",
			"does-natural-mean-safer-or-better"
		],
		editorSummary:
			"This page should stop short of both hype and dismissal. The useful answer is that probiotics are biologically plausible and show emerging adjunctive signals, but the current evidence does not justify a generic supplement-as-treatment claim.",
		uncertaintySummary:
			"Evidence certainty is low because trials are often small, short, heterogeneous, and product-specific. Confidence is higher that probiotics should not replace established depression or anxiety care outside a clinician-guided plan.",
		uncertaintyDrivers: [
			{
				type: "inconsistency",
				detail: "Trials use different strains, mixtures, doses, durations, populations, and depression or anxiety scales, so pooled effects are hard to translate into a product recommendation."
			},
			{
				type: "imprecision",
				detail: "Several clinically focused analyses include relatively few participants, especially for standalone treatment, anxiety disorders, children, and long-term outcomes."
			},
			{
				type: "indirectness",
				detail: "Many studies measure symptom scales rather than remission, relapse, functioning, or patient-important long-term outcomes."
			},
			{
				type: "bias",
				detail: "Small-study effects, expectancy, incomplete blinding, publication bias, and supplement-industry incentives can affect interpretation."
			}
		],
		searchDatabases: ["PubMed", "PsycINFO", "Cochrane Library", "Embase", "Consensus"],
		searchCutoffAt: "2026-07-03T20:04:33.000Z",
		inclusionRules: [
			"Prioritize randomized trials, systematic reviews, meta-analyses, and clinical guidelines that specify population, strain or formulation, dose, duration, comparator, and mental-health outcome.",
			"Separate probiotics, prebiotics, synbiotics, fermented foods, and general diet patterns unless a source explicitly combines them.",
			"Separate adjunctive use with usual care from standalone treatment claims."
		],
		exclusionRules: [
			"Do not treat gut-brain-axis mechanism papers, animal studies, brand marketing, or testimonials as direct treatment evidence.",
			"Do not generalize one strain, product, or psychiatric subgroup to all probiotics or all depression and anxiety presentations.",
			"Do not imply that a supplement can diagnose, treat, cure, or replace care for depression or anxiety without evidence and regulatory support."
		],
		institutionalAnchors: [
			{ name: "NCCIH", role: "U.S. complementary-health source for probiotic definition, safety, and supplement-evidence cautions" },
			{ name: "NICE", role: "Clinical-guideline anchor for established depression and anxiety treatment pathways" },
			{ name: "Consensus", role: "Literature-discovery anchor for recent randomized-trial reviews and meta-analyses" }
		],
		lastRetractionCheckAt: "2026-07-03T20:04:33.000Z",
		changeLog: [
			{
				date: "2026-07-03T20:04:33.000Z",
				kind: "publication",
				summary:
					"Initial probiotics depression/anxiety page published from NCCIH safety and supplement context, NICE clinical-guideline context, and randomized-trial meta-analyses."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Probiotics: Usefulness and Safety",
				publisher: "National Center for Complementary and Integrative Health",
				year: 2026,
				url: "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety",
				stance: "context",
				note:
					"NCCIH public-health context defining probiotics as live microorganisms intended to have health benefits and noting serious infection risk in vulnerable groups such as premature infants.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Using Dietary Supplements Wisely",
				publisher: "National Center for Complementary and Integrative Health",
				year: 2026,
				url: "https://www.nccih.nih.gov/health/using-dietary-supplements-wisely",
				stance: "context",
				note:
					"Supplement-regulation context: evidence varies by supplement, products can differ from studied products, FDA does not review most supplements for safety and effectiveness before marketing, and disease-treatment claims are not permitted for dietary supplements.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Depression in adults: treatment and management",
				publisher: "NICE",
				year: 2026,
				url: "https://www.nice.org.uk/guidance/ng222/chapter/recommendations",
				stance: "context",
				note:
					"Clinical-guideline anchor for depression assessment, shared decision-making, psychological therapies, antidepressant options, and severity-based care; probiotics are not framed as first-line depression treatment.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Generalised anxiety disorder and panic disorder in adults: management",
				publisher: "NICE",
				year: 2020,
				url: "https://www.nice.org.uk/guidance/cg113/chapter/Recommendations",
				stance: "context",
				note:
					"Clinical-guideline anchor for anxiety care, including psychological treatments and SSRI options when drug treatment is chosen.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Prebiotics and probiotics for depression and anxiety: A systematic review and meta-analysis of controlled clinical trials",
				publisher: "Neuroscience and Biobehavioral Reviews",
				year: 2019,
				url: "https://doi.org/10.1016/j.neubiorev.2019.03.023",
				doi: "10.1016/j.neubiorev.2019.03.023",
				pmid: "31004628",
				stance: "debate",
				note:
					"Meta-analysis of 34 controlled clinical trials found small significant probiotic effects for depression and anxiety, larger depression effects in clinical or medical samples, and no prebiotic-placebo difference.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Updated Review and Meta-Analysis of Probiotics for the Treatment of Clinical Depression: Adjunctive vs. Stand-Alone Treatment",
				publisher: "Journal of Clinical Medicine",
				year: 2021,
				url: "https://doi.org/10.3390/jcm10040647",
				doi: "10.3390/jcm10040647",
				pmid: "33567631",
				pmcid: "PMC7915600",
				stance: "debate",
				note:
					"Clinical depression review of seven randomized trials and 404 participants found benefit as an adjunct to antidepressants but no significant standalone treatment effect in limited evidence.",
				order: 6
			},
			{
				kind: "meta_analysis",
				title:
					"Effects of Prebiotics and Probiotics on Symptoms of Depression and Anxiety in Clinically Diagnosed Samples: Systematic Review and Meta-analysis of Randomized Controlled Trials",
				publisher: "Nutrition Reviews",
				year: 2025,
				url: "https://doi.org/10.1093/nutrit/nuae177",
				doi: "10.1093/nutrit/nuae177",
				pmid: "39731509",
				pmcid: "PMC12166186",
				stance: "debate",
				note:
					"Systematic review of 23 RCTs and 1,401 clinically diagnosed patients found probiotic-associated reductions in depression and anxiety symptoms but high heterogeneity by duration and formulation.",
				order: 7
			},
			{
				kind: "meta_analysis",
				title:
					"The efficacy of probiotics, prebiotics, and synbiotics on anxiety, depression, and sleep: a systematic review and meta-analysis of randomized controlled trials",
				publisher: "BMC Psychiatry",
				year: 2025,
				url: "https://doi.org/10.1186/s12888-025-07644-z",
				doi: "10.1186/s12888-025-07644-z",
				pmid: "41310510",
				stance: "debate",
				note:
					"Meta-analysis of 72 RCTs found reductions in depression and anxiety symptom scores, while emphasizing high heterogeneity, limited methodological quality, and need for larger high-quality trials with long-term follow-up.",
				order: 8
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
		title: "Does eating processed meat increase colorectal cancer risk?",
		slug: "does-eating-processed-meat-increase-colorectal-cancer-risk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 93,
		bottomLine:
			"Yes. Major cancer and diet-review bodies agree that processed meat increases colorectal cancer risk. IARC classifies processed meat as carcinogenic to humans based on sufficient evidence that it causes colorectal cancer, but that classification describes strength of evidence, not that processed meat is as risky as smoking.",
		stableCore: [
			"IARC classified processed meat as Group 1, carcinogenic to humans, based on sufficient human evidence that processed meat causes colorectal cancer.",
			"IARC estimated that each 50 g daily portion of processed meat increases colorectal cancer risk by about 18%, while noting that the individual absolute-risk increase remains small and rises with amount consumed.",
			"World Cancer Research Fund states there is convincing evidence that processed meat is a cause of colorectal cancer and recommends consuming very little, if any, processed meat.",
			"Prospective-study meta-analyses consistently find higher colorectal cancer risk with higher processed-meat intake, though observational nutrition evidence still requires careful confounding and dose interpretation."
		],
		openQuestions: [
			"How much do specific processing methods, nitrite use, smoking, salting, food matrix, and cooking practices change risk?",
			"What is the best way to communicate relative risk without making occasional intake sound equivalent to high chronic exposure?",
			"How should dietary advice balance colorectal-cancer risk reduction with cultural food patterns, food access, and broader dietary quality?"
		],
		whatWouldChangeMinds: [
			"Large, high-quality prospective evidence with better dietary measurement showing no association between processed meat and colorectal cancer after confounding adjustment.",
			"Major IARC, WCRF/AICR, NCI, or dietary-guideline reassessments withdrawing the causal classification for processed meat and colorectal cancer.",
			"Mechanistic and epidemiologic evidence showing that the observed risk is fully explained by confounding factors unrelated to processed meat exposure."
		],
		misconceptions: [
			"Group 1 means the evidence for carcinogenicity is strong; it does not mean the risk magnitude equals tobacco smoking.",
			"Relative-risk increases can sound larger than the absolute-risk change for an individual, especially at low intake.",
			"Processed meat is sometimes lumped together with all meat; the evidence is clearer for processed meat than for unprocessed red meat."
		],
		editorSummary:
			"This page should be precise: processed meat is a supported colorectal-cancer risk factor, but readers also need classification and absolute-risk context so the claim does not become nutrition fearmongering.",
		uncertaintySummary:
			"The direction of evidence is strong for processed meat and colorectal cancer. Uncertainty is mainly about exact dose-response shape at low intakes, product-specific risks, residual confounding in observational nutrition studies, and how much risk changes after substitution with healthier foods.",
		searchCutoffAt: "2026-07-02T22:51:14.000Z",
		lastRetractionCheckAt: "2026-07-02T22:51:14.000Z",
		changeLog: [
			{
				date: "2026-07-02T22:51:14.000Z",
				kind: "publication",
				summary:
					"Initial processed-meat and colorectal-cancer claim page published from IARC, NCI, WCRF, and prospective meta-analysis sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "IARC Monographs evaluate consumption of red meat and processed meat",
				publisher: "International Agency for Research on Cancer",
				year: 2015,
				url: "https://www.iarc.who.int/wp-content/uploads/2018/07/pr240_E.pdf",
				stance: "supports",
				note:
					"IARC source for processed meat as Group 1 carcinogenic to humans, sufficient evidence for colorectal cancer causation, and the 18% relative-risk estimate per 50 g daily portion.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Limit consumption of red and processed meat",
				publisher: "World Cancer Research Fund",
				url:
					"https://www.wcrf.org/research-policy/evidence-for-our-recommendations/limit-red-processed-meat/",
				stance: "supports",
				note:
					"WCRF recommendation page stating there is convincing evidence that processed meat causes colorectal cancer and advising little, if any, processed meat.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Red Meat and Processed Meat Consumption",
				publisher: "National Cancer Institute Cancer Trends Progress Report",
				url: "https://progressreport.cancer.gov/prevention/diet_alcohol/red_meat",
				stance: "supports",
				note:
					"NCI-linked cancer trends source defining processed meat, summarizing IARC's Group 1 classification, and noting the evidence is strongest for colorectal cancer.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Red and Processed Meat and Colorectal Cancer Incidence: Meta-Analysis of Prospective Studies",
				publisher: "PLOS ONE",
				year: 2011,
				url: "https://doi.org/10.1371/journal.pone.0020456",
				doi: "10.1371/journal.pone.0020456",
				pmid: "21674008",
				pmcid: "PMC3108955",
				stance: "supports",
				note:
					"Prospective-study meta-analysis finding colorectal cancer risk increased with processed meat intake, including RR 1.18 per 50 g/day processed meat.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Foods and beverages and colorectal cancer risk: a systematic review and meta-analysis of cohort studies, an update of the evidence of the WCRF-AICR Continuous Update Project",
				publisher: "Annals of Oncology",
				year: 2017,
				url: "https://doi.org/10.1093/annonc/mdx171",
				doi: "10.1093/annonc/mdx171",
				pmid: "28407090",
				stance: "supports",
				note:
					"WCRF/AICR Continuous Update Project synthesis of cohort studies reinforcing higher colorectal-cancer risk with higher red and processed meat intake.",
				order: 5
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Does aspartame cause cancer at typical intake levels?",
		slug: "does-aspartame-cause-cancer-at-typical-intake-levels",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 72,
		evidenceCertainty: "low",
		bottomLine:
			"The best answer is cautious, not alarmist. IARC classifies aspartame as possibly carcinogenic to humans because limited evidence suggested a possible liver-cancer signal. JECFA, FDA, and EFSA still conclude that intake below their acceptable daily intake limits is not a cancer-safety concern for the general population. Human studies are inconsistent: one large French cohort found a modest association with cancer, while broader reviews and several large cohorts have not shown a clear overall cancer link.",
		stableCore: [
			"IARC Group 2B means possible carcinogenic hazard based on limited evidence; it is not proof that typical consumer intake causes cancer.",
			"JECFA reaffirmed an acceptable daily intake of 0 to 40 mg/kg body weight per day, and WHO's joint release gave the example that a 70 kg adult would need more than 9 to 14 diet-drink cans per day to exceed it if there were no other aspartame sources.",
			"FDA disagrees that the IARC-reviewed studies support classifying aspartame as a possible human carcinogen and keeps a U.S. ADI of 50 mg/kg body weight per day.",
			"EFSA's full risk assessment concluded that aspartame and its breakdown products are safe for the general population at current exposure levels, with a 40 mg/kg body weight per day ADI.",
			"People with phenylketonuria need to avoid or restrict aspartame because it contains phenylalanine; that is a separate issue from cancer risk."
		],
		openQuestions: [
			"Do aspartame-specific cancer signals persist in newer cohorts with repeated dietary measurement, better product-composition data, longer follow-up, and stronger confounding control?",
			"How should assessments weigh studies of aspartame itself against studies of artificially sweetened beverages or mixed artificial sweeteners?",
			"Are any observed associations explained by reverse causality, diabetes, obesity, diet quality, screening behavior, or other differences between consumers and non-consumers?"
		],
		whatWouldChangeMinds: [
			"Large replicated cohorts or trials showing a consistent dose-response between measured aspartame intake and specific cancer outcomes below current ADIs after confounding and reverse causality are handled well.",
			"A major JECFA, FDA, EFSA, NCI, or IARC reassessment changing its conclusion after reviewing newer epidemiology, toxicology, and mechanism evidence.",
			"Mechanistic evidence identifying a plausible human cancer pathway at oral exposures comparable to typical consumer intake."
		],
		misconceptions: [
			"Possibly carcinogenic is often misread as definitely causes cancer.",
			"Safe below the ADI is often misread as meaning every study is negative or that unlimited intake is sensible.",
			"Artificially sweetened beverages are sometimes treated as a perfect measure of aspartame even though products can contain different or mixed sweeteners.",
			"Aspartame's PKU warning is sometimes confused with a cancer warning."
		],
		misconceptionTags: [
			"hazard-is-not-the-same-as-risk",
			"relative-risk-can-mislead",
			"correlation-isnt-causation",
			"mechanism-is-not-real-world-effect",
			"cherry-picking-distorts-the-evidence"
		],
		editorSummary:
			"This page should help readers interpret the IARC/JECFA split without turning it into either 'aspartame causes cancer' or 'there is nothing to study.' Keep hazard classification, acceptable daily intake, ordinary exposure, and observational-study limits separate.",
		uncertaintySummary:
			"Evidence certainty is low for a cancer effect at typical intake levels because the positive epidemiology is limited and inconsistent, exposure measurement is difficult, and residual confounding or reverse causality can affect artificial-sweetener studies. Confidence is higher that current regulators treat intake below ADI as acceptable for the general population.",
		uncertaintyDrivers: [
			{
				type: "inconsistency",
				detail: "IARC's hazard classification and JECFA/FDA/EFSA risk assessments answer different questions and weigh the same evidence differently."
			},
			{
				type: "bias",
				detail: "Aspartame consumers can differ from non-consumers in diabetes, body weight, diet quality, health behavior, and screening patterns."
			},
			{
				type: "indirectness",
				detail: "Many studies measure artificially sweetened beverages or grouped sweeteners rather than verified aspartame intake from all sources."
			},
			{
				type: "imprecision",
				detail: "Cancer-site-specific analyses often rely on fewer cases and yield estimates with wider uncertainty than overall-cancer analyses."
			}
		],
		searchDatabases: ["PubMed", "OpenAlex", "Crossref", "IARC/JECFA/FDA/EFSA assessments"],
		searchCutoffAt: "2026-07-03T19:31:53.000Z",
		inclusionRules: [
			"Prioritize IARC, JECFA, FDA, EFSA, NCI, large prospective cohorts, umbrella reviews, and meta-analyses that separate aspartame from other sweeteners when possible.",
			"Separate hazard-identification conclusions from risk-assessment and acceptable-daily-intake conclusions.",
			"Track whether evidence measures aspartame, all artificial sweeteners, artificially sweetened beverages, or other substitute exposures."
		],
		exclusionRules: [
			"Do not treat product-marketing claims, advocacy petitions, or single-anecdote reports as cancer evidence.",
			"Do not infer cancer risk at typical intake directly from high-dose animal, cell, or grouped-sweetener findings.",
			"Do not treat PKU labeling requirements as evidence that aspartame causes cancer."
		],
		institutionalAnchors: [
			{ name: "IARC", role: "Hazard-identification anchor for the Group 2B classification" },
			{ name: "JECFA", role: "Joint FAO/WHO food-additive risk-assessment and ADI anchor" },
			{ name: "U.S. Food and Drug Administration", role: "U.S. sweetener approval and ADI anchor" },
			{ name: "European Food Safety Authority", role: "EU food-additive risk-assessment and ADI anchor" },
			{ name: "National Cancer Institute", role: "Cancer-evidence interpretation anchor for public readers" }
		],
		lastRetractionCheckAt: "2026-07-03T19:31:53.000Z",
		changeLog: [
			{
				date: "2026-07-03T19:31:53.000Z",
				kind: "publication",
				summary:
					"Initial aspartame cancer-risk page published from IARC/JECFA, FDA, EFSA, NCI, NutriNet-Sante, meta-analysis, and umbrella-review evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Aspartame hazard and risk assessment results released",
				publisher: "World Health Organization / IARC / JECFA",
				year: 2023,
				url: "https://www.who.int/news/item/14-07-2023-aspartame-hazard-and-risk-assessment-results-released",
				stance: "context",
				note:
					"Joint release explaining IARC's Group 2B classification, JECFA's unchanged 0 to 40 mg/kg body weight per day ADI, and the distinction between hazard identification and risk assessment.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Aspartame and Other Sweeteners in Food",
				publisher: "U.S. Food and Drug Administration",
				year: 2025,
				url: "https://www.fda.gov/food/food-additives-petitions/aspartame-and-other-sweeteners-food",
				stance: "context",
				note:
					"FDA source disagreeing with IARC's possible-carcinogen conclusion, stating no safety concern under approved use, listing a 50 mg/kg body weight per day ADI, and noting the PKU exception.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Aspartame",
				publisher: "European Food Safety Authority",
				year: 2025,
				url: "https://www.efsa.europa.eu/en/topics/topic/aspartame",
				stance: "context",
				note:
					"EFSA topic page for the 40 mg/kg body weight per day ADI, conclusion that aspartame is safe at current exposure levels, and the phenylketonuria exception.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Artificial Sweeteners and Cancer",
				publisher: "National Cancer Institute",
				year: 2023,
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/diet/artificial-sweeteners-fact-sheet",
				stance: "context",
				note:
					"NCI public evidence summary explaining the IARC and JECFA conclusions, inconsistent human studies, and the lack of a clear overall aspartame-cancer association in large cohorts.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Artificial sweeteners and cancer risk: Results from the NutriNet-Sante population-based cohort study",
				publisher: "PLoS Medicine",
				year: 2022,
				url: "https://doi.org/10.1371/journal.pmed.1003950",
				doi: "10.1371/journal.pmed.1003950",
				pmid: "35324894",
				pmcid: "PMC8946744",
				stance: "debate",
				note:
					"Large French cohort reported higher overall cancer risk among higher aspartame consumers, including HR 1.15 with a 95% confidence interval of 1.03 to 1.28.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Can Artificial Sweeteners Increase the Risk of Cancer Incidence and Mortality: Evidence from Prospective Studies",
				publisher: "Nutrients",
				year: 2022,
				url: "https://doi.org/10.3390/nu14183742",
				doi: "10.3390/nu14183742",
				pmid: "36145117",
				stance: "context",
				note:
					"Prospective-study meta-analysis of 25 observational studies and 3,739,775 participants found no apparent overall association with cancer incidence or mortality, with some regional and aspartame subgroup signals.",
				order: 6
			},
			{
				kind: "meta_analysis",
				title: "The association of artificial sweeteners intake and risk of cancer: an umbrella meta-analysis",
				publisher: "Frontiers in Medicine",
				year: 2025,
				url: "https://doi.org/10.3389/fmed.2025.1647178",
				doi: "10.3389/fmed.2025.1647178",
				stance: "context",
				note:
					"Umbrella review of 10 meta-analyses found no significant overall artificial-sweetener cancer association, while cautioning that grouped results should not be extrapolated to individual compounds.",
				order: 7
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Does vitamin D supplementation prevent or treat COVID-19 beyond correcting deficiency?",
		slug: "does-vitamin-d-supplementation-prevent-or-treat-covid-19-beyond-correcting-deficiency",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 68,
		evidenceCertainty: "low",
		reviewMode: "living",
		bottomLine:
			"Not as a broad COVID-19 prevention or treatment strategy. Correcting vitamin D deficiency remains good general care, and deficient or high-risk hospitalized patients are still plausible subgroups for research. But large prevention and early-treatment randomized trials have not shown meaningful acute COVID-19 benefit in the general population, and treatment meta-analyses remain heterogeneous: some show possible ICU, ventilation, or hospital-stay signals, while mortality and short-term hard outcomes remain uncertain.",
		stableCore: [
			"Low vitamin D levels are associated with worse COVID-19 outcomes in many observational studies, but illness, age, obesity, chronic disease, indoor time, and inflammation can confound or reverse that relationship.",
			"NICE says not to use vitamin D to treat COVID-19 except as part of a clinical trial, while still pointing people to ordinary vitamin D guidance for bone and muscle health.",
			"NIH ODS states that data are insufficient to support recommendations for or against dietary supplements, including vitamin D, to prevent or treat COVID-19.",
			"CORONAVIT, a 6,200-person UK test-and-treat trial, did not reduce acute respiratory infections or COVID-19 with vitamin D supplementation in people with high baseline prevalence of suboptimal vitamin D status.",
			"The 2026 VIVID trial did not reduce four-week healthcare utilization, death, symptom severity, or household transmission after high-dose vitamin D3 in newly diagnosed COVID-19; a possible long-COVID signal needs further study.",
			"Hospital treatment trials and meta-analyses are mixed: a JAMA trial of a single high dose did not reduce hospital stay, while some reviews suggest possible benefits in moderate-to-severe, deficient, or repeated-dose subgroups."
		],
		openQuestions: [
			"Are there specific deficient, older, hospitalized, or immunologically vulnerable subgroups that benefit from a particular vitamin D form, dose, and timing?",
			"Do repeated-dose strategies or calcifediol differ meaningfully from one-time high-dose cholecalciferol in clinically important outcomes?",
			"Can vitamin D reduce long COVID risk or symptom burden, and does that require baseline deficiency, longer treatment, or different outcome timing?",
			"How should guidance adapt as variants, vaccination, antivirals, corticosteroid use, and baseline immunity change the absolute risk of severe COVID-19?"
		],
		whatWouldChangeMinds: [
			"Large, blinded, preregistered RCTs in vitamin D-deficient patients showing durable reductions in mortality, ICU admission, ventilation, hospitalization, or long COVID.",
			"Major NIH, NICE, WHO, IDSA, or comparable guideline updates recommending a specific vitamin D regimen for defined COVID-19 prevention or treatment populations.",
			"Updated individual-participant meta-analyses showing that apparent subgroup benefits disappear after baseline deficiency, timing, dose, severity, vaccination, and standard-care differences are handled well."
		],
		misconceptions: [
			"Low vitamin D in sicker COVID-19 patients does not by itself prove vitamin D deficiency caused the worse outcome.",
			"Correcting a documented deficiency is not the same claim as saying high-dose vitamin D treats COVID-19.",
			"A biologically plausible immune mechanism does not prove a clinically useful prevention or treatment effect.",
			"High-dose self-treatment can cause harm and should not replace vaccination, antivirals, oxygen, corticosteroids when indicated, or clinician-directed care."
		],
		misconceptionTags: [
			"correlation-isnt-causation",
			"mechanism-is-not-real-world-effect",
			"one-study-doesnt-overturn-evidence",
			"cherry-picking-distorts-the-evidence",
			"does-natural-mean-safer-or-better"
		],
		editorSummary:
			"This page should answer the supplement claim without mocking deficiency concerns. The useful framing is: treat deficiency for ordinary health reasons, but do not treat vitamin D as a proven broad COVID-19 prevention or treatment intervention.",
		uncertaintySummary:
			"Evidence certainty is low because the stronger prevention and early-treatment trials are mostly null, while hospitalized-treatment reviews remain heterogeneous by baseline vitamin D status, severity, dose, formulation, timing, and standard of care. Confidence is higher that vitamin D should not replace established COVID-19 prevention or treatment.",
		uncertaintyDrivers: [
			{
				type: "inconsistency",
				detail: "Large community trials and some hospital RCTs are null, while later meta-analyses report possible benefits in selected hospitalized or repeated-dose subgroups."
			},
			{
				type: "indirectness",
				detail: "Many observational studies measure vitamin D status during or near illness, when inflammation and behavior may affect measured levels."
			},
			{
				type: "imprecision",
				detail: "Several clinically important subgroup estimates involve small trial counts, few hard-outcome events, or results that are not robust across sensitivity analyses."
			},
			{
				type: "bias",
				detail: "Open-label designs, changing COVID-19 standards of care, supplement adherence, and publication of small positive trials can all affect pooled estimates."
			}
		],
		searchDatabases: ["PubMed", "Cochrane Library", "Embase", "Consensus", "NIH/NICE guidance"],
		searchCutoffAt: "2026-07-03T21:10:00.000Z",
		inclusionRules: [
			"Prioritize randomized trials, systematic reviews, meta-analyses, and current institutional guidance that distinguish prevention, early outpatient treatment, hospitalized treatment, deficiency correction, and long COVID.",
			"Track baseline 25(OH)D status, COVID-19 severity, dose, formulation, timing after diagnosis, vaccination era, and comparator care.",
			"Separate ordinary deficiency treatment and bone-health supplementation from claims that vitamin D prevents or treats COVID-19."
		],
		exclusionRules: [
			"Do not treat in vitro mechanism papers, testimonials, supplement marketing, or ecological correlations as direct clinical evidence.",
			"Do not infer broad COVID-19 benefit from low vitamin D associations without randomized or carefully controlled evidence.",
			"Do not recommend high-dose supplementation outside clinical guidance or trial contexts."
		],
		institutionalAnchors: [
			{ name: "NICE", role: "COVID-19 treatment-guideline anchor for not using vitamin D solely to treat COVID-19 outside clinical trials" },
			{ name: "NIH Office of Dietary Supplements", role: "U.S. supplement-evidence and safety anchor for COVID-19 dietary supplement claims" },
			{ name: "Consensus", role: "Literature-discovery anchor for recent randomized trials and meta-analyses" }
		],
		lastRetractionCheckAt: "2026-07-03T21:10:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T21:10:00.000Z",
				kind: "publication",
				summary:
					"Initial vitamin D and COVID-19 outcomes page published from NICE, NIH ODS, large randomized trials, hospital-treatment RCTs, and randomized-trial meta-analyses."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "COVID-19 rapid guideline: managing COVID-19, therapeutics for COVID-19",
				publisher: "NICE",
				year: 2022,
				url: "https://www.nice.org.uk/guidance/NG191/chapter/4-therapeutics-for-covid-19",
				stance: "context",
				note:
					"Current NICE guidance states not to use vitamin D to treat COVID-19 except as part of a clinical trial, while pointing readers to ordinary vitamin D advice for muscle and bone health.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Dietary Supplements in the Time of COVID-19",
				publisher: "NIH Office of Dietary Supplements",
				year: 2026,
				url: "https://ods.od.nih.gov/factsheets/COVID19-HealthProfessional/",
				stance: "context",
				note:
					"NIH ODS health-professional fact sheet states evidence is insufficient to support recommendations for or against supplements to prevent or treat COVID-19, and notes that supplements cannot legally be marketed as disease cures.",
				order: 2
			},
			{
				kind: "landmark_study",
				title:
					"Effect of a test-and-treat approach to vitamin D supplementation on risk of all cause acute respiratory tract infection and covid-19: phase 3 randomised controlled trial (CORONAVIT)",
				publisher: "The BMJ",
				year: 2022,
				url: "https://www.bmj.com/content/378/bmj-2022-071230",
				doi: "10.1136/bmj-2022-071230",
				pmid: "36215226",
				stance: "supports",
				note:
					"Phase 3 randomized trial in 6,200 UK adults found a population test-and-treat vitamin D strategy was not associated with reduced acute respiratory infection or COVID-19 risk.",
				order: 3
			},
			{
				kind: "landmark_study",
				title:
					"A Randomized Trial of Vitamin D Supplementation and COVID-19 Clinical Outcomes and Long COVID: The Vitamin D for COVID-19 Trial",
				publisher: "The Journal of Nutrition",
				year: 2026,
				url: "https://doi.org/10.1016/j.tjnut.2026.101398",
				doi: "10.1016/j.tjnut.2026.101398",
				stance: "supports",
				note:
					"VIVID trial of newly diagnosed COVID-19 cases and household contacts found no significant four-week benefit for healthcare utilization, death, symptom severity, or household transmission; long-COVID signals remain exploratory.",
				order: 4
			},
			{
				kind: "landmark_study",
				title:
					"Effect of a Single High Dose of Vitamin D3 on Hospital Length of Stay in Patients With Moderate to Severe COVID-19: A Randomized Clinical Trial",
				publisher: "JAMA",
				year: 2021,
				url: "https://jamanetwork.com/journals/jama/fullarticle/2776738",
				doi: "10.1001/jama.2020.26848",
				pmid: "33595634",
				pmcid: "PMC7890452",
				stance: "supports",
				note:
					"Double-blind RCT in 240 hospitalized patients found a single 200,000 IU dose raised 25(OH)D but did not reduce hospital length of stay or other clinically relevant outcomes.",
				order: 5
			},
			{
				kind: "landmark_study",
				title:
					"High-dose versus standard-dose vitamin D supplementation in older adults with COVID-19 (COVIT-TRIAL): A multicenter, open-label, randomized controlled superiority trial",
				publisher: "PLoS Medicine",
				year: 2022,
				url: "https://doi.org/10.1371/journal.pmed.1003999",
				doi: "10.1371/journal.pmed.1003999",
				pmid: "35639792",
				pmcid: "PMC9154122",
				stance: "debate",
				note:
					"Open-label RCT in 254 at-risk older adults found lower 14-day mortality with high-dose versus standard-dose vitamin D3, but the effect was not sustained at 28 days.",
				order: 6
			},
			{
				kind: "meta_analysis",
				title:
					"Therapeutic effects of vitamin D supplementation on COVID-19 aggravation: a systematic review and meta-analysis of randomized controlled trials",
				publisher: "Frontiers in Pharmacology",
				year: 2024,
				url: "https://doi.org/10.3389/fphar.2024.1367686",
				doi: "10.3389/fphar.2024.1367686",
				stance: "debate",
				note:
					"Meta-analysis of 19 RCTs reported lower ICU admission, mechanical ventilation, and length of hospitalization in moderate-to-severe and multiple-dose subgroups, but no statistically significant mortality effect.",
				order: 7
			},
			{
				kind: "meta_analysis",
				title:
					"Vitamin D supplementation for managing COVID-19 in patients with vitamin D deficiency: a systematic review and meta-analysis of randomised controlled trials",
				publisher: "BMJ Open",
				year: 2025,
				url: "https://doi.org/10.1136/bmjopen-2024-091903",
				doi: "10.1136/bmjopen-2024-091903",
				stance: "debate",
				note:
					"Deficiency-focused meta-analysis of nine RCTs found lower follow-up mortality but no significant benefit for 28-day mortality, mechanical ventilation, ICU admission, hospital stay, or ICU stay; mortality signal was not robust in sensitivity analyses.",
				order: 8
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
			"Beta-carotene was associated with higher lung cancer risk and cardiovascular mortality in relevant high-risk groups, especially people who smoke or had asbestos exposure.",
			"Vitamin E as an essential nutrient from foods or deficiency treatment is a separate question from high-dose supplement pills for disease prevention."
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
			"Evidence against routine prevention is not the same as saying deficiency treatment or pregnancy-specific supplementation never matters.",
			"Food sources of vitamin E should not be treated as equivalent to high-dose vitamin E supplements marketed for heart or cancer prevention."
		],
		editorSummary:
			"This page captures a clean supplement-prevention claim with useful numbers: a large evidence review, no vitamin E prevention benefit, and beta-carotene harm signals in high-risk groups.",
		searchCutoffAt: "2026-07-03T18:35:00.000Z",
		lastRetractionCheckAt: "2026-07-03T18:35:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T18:35:00.000Z",
				kind: "update",
				summary:
					"Added NIH Office of Dietary Supplements context separating vitamin E as a nutrient from routine high-dose supplement use for cardiovascular disease or cancer prevention."
			},
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
			},
			{
				kind: "context",
				title: "Vitamin E - Health Professional Fact Sheet",
				publisher: "NIH Office of Dietary Supplements",
				url: "https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/",
				stance: "context",
				note:
					"NIH ODS context distinguishing food sources, typical supplement doses, deficiency states, and trial evidence that routine vitamin E supplements do not prevent cardiovascular disease or cancer.",
				order: 4
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
		topicSlug: "genetics-and-biotechnology",
		title: "Are genes destiny for complex human traits?",
		slug: "are-genes-destiny-for-complex-human-traits",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"No. Genes matter for many complex traits and diseases, but they are not destiny. Heritability describes variation in a population, not how fixed a trait is for one person, and most complex traits reflect many genes interacting with environments, development, behavior, measurement, and chance.",
		stableCore: [
			"MedlinePlus explains that heritability is a population statistic: it estimates how much variation in a trait within a population is attributable to genetic differences.",
			"MedlinePlus also emphasizes that most complex human traits fall between zero and one in heritability, meaning their variation reflects both genetic and environmental factors.",
			"Common conditions such as heart disease, type 2 diabetes, and obesity are complex or multifactorial: they do not have a single genetic cause and are influenced by multiple genes plus lifestyle and environmental factors.",
			"A large 2015 Nature Genetics meta-analysis of 17,804 traits from 2,748 twin-study publications reported average heritability around 49%, which supports substantial genetic influence while leaving substantial non-genetic variation."
		],
		openQuestions: [
			"How accurately can polygenic risk scores predict useful outcomes across ancestries, environments, ages, and health systems?",
			"Which gene-environment interactions matter enough to change prevention, education, or medical decisions?",
			"How should public communication explain genetic influence without sliding into either determinism or denial?"
		],
		whatWouldChangeMinds: [
			"Broad evidence that common complex traits are controlled by single genes in ways that make environment, development, and measurement largely irrelevant.",
			"Repeated high-quality evidence showing that heritability estimates reliably determine how fixed or changeable an individual person's trait will be.",
			"Major genetics institutions revising heritability guidance to treat it as individual destiny rather than a population-level variance statistic."
		],
		misconceptions: [
			"A trait can be heritable without being fixed, inevitable, or impossible to change.",
			"High heritability does not mean the same thing as 'mostly genetic' for one individual.",
			"Family clustering can reflect shared environments and lifestyles as well as shared genes."
		],
		editorSummary:
			"This page should lower the temperature of nature-versus-nurture arguments. It should say plainly that genetic influence is real, but that heritability is a population statistic and complex traits are not simple fate.",
		uncertaintySummary:
			"The core distinction between genetic influence and determinism is settled. Uncertainty is higher for trait-specific prediction, ancestry portability of polygenic scores, gene-environment interactions, and practical use in individual decisions.",
		searchCutoffAt: "2026-07-03T02:35:29.000Z",
		lastRetractionCheckAt: "2026-07-03T02:35:29.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:35:29.000Z",
				kind: "publication",
				summary:
					"Initial genetic determinism claim page published from MedlinePlus genetics guidance and a large twin-study heritability meta-analysis."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "What is heritability?",
				publisher: "MedlinePlus Genetics",
				year: 2021,
				url: "https://medlineplus.gov/genetics/understanding/inheritance/heritability/",
				stance: "supports",
				note:
					"Official NLM/NIH consumer genetics source explaining that heritability is a population-level statistic, not a measure of how genetically determined one person's trait is.",
				order: 1
			},
			{
				kind: "guideline",
				title: "What are complex or multifactorial disorders?",
				publisher: "MedlinePlus Genetics",
				year: 2021,
				url: "https://medlineplus.gov/genetics/understanding/mutationsanddisorders/complexdisorders/",
				stance: "supports",
				note:
					"Official NLM/NIH source explaining that many common conditions are influenced by multiple genes together with lifestyle and environmental factors.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Meta-analysis of the heritability of human traits based on fifty years of twin studies",
				publisher: "Nature Genetics",
				year: 2015,
				url: "https://doi.org/10.1038/ng.3285",
				doi: "10.1038/ng.3285",
				pmid: "25985137",
				stance: "supports",
				note:
					"Meta-analysis covering 17,804 traits from 2,748 publications and more than 14.5 million partly dependent twin pairs; useful for quantifying substantial but non-deterministic genetic influence.",
				order: 3
			}
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		title: "Do polygenic risk scores work equally well across ancestry groups?",
		slug: "do-polygenic-risk-scores-work-equally-well-across-ancestry-groups",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		reviewMode: "living",
		bottomLine:
			"No. Polygenic risk scores can add useful risk information for some conditions, but scores built and calibrated mostly in European-ancestry datasets often transfer less well to underrepresented and admixed ancestry groups. Multi-ancestry methods and more diverse datasets are improving the situation, but the equity problem is not solved.",
		stableCore: [
			"Polygenic risk scores combine many genetic variants into a relative, probabilistic risk estimate; they are not deterministic diagnoses.",
			"GWAS and PRS research has historically overrepresented people of European ancestry, leaving weaker data for many global and admixed populations.",
			"Scores derived mainly from European-ancestry data often show lower predictive performance when applied to non-European ancestry samples.",
			"Portability depends on linkage disequilibrium patterns, allele frequencies, phenotype definitions, environment, clinical calibration, and the target health-care setting.",
			"Clinical use requires condition-specific validation, calibrated risk communication, integration with family history and standard risk factors, and access to follow-up care."
		],
		openQuestions: [
			"Which disease, ancestry, and health-system combinations have enough validation for routine clinical use?",
			"Which multi-ancestry, ancestry-aware, or locally calibrated methods most reliably reduce performance gaps?",
			"How should clinicians explain genetic ancestry without treating socially defined race as a genetic category?",
			"Does returning PRS information improve outcomes equitably once follow-up care, cost, and communication are included?"
		],
		whatWouldChangeMinds: [
			"Large external validations showing comparable calibration, discrimination, and clinical utility across many global and admixed populations.",
			"Diverse GWAS and biobank resources closing performance gaps for major disease PRS without worsening access or follow-up disparities.",
			"Conversely, pragmatic trials showing no added benefit beyond standard clinical risk tools for the populations where PRS is being offered."
		],
		misconceptions: [
			"A polygenic risk score is a probability aid, not destiny.",
			"A score validated in one ancestry group or biobank does not automatically work equally well for everyone.",
			"Genetic ancestry is not the same thing as socially defined race or ethnicity.",
			"Improving model accuracy alone cannot fix disparities if follow-up care is unavailable or unequally delivered."
		],
		editorSummary:
			"This page should keep both truths visible: polygenic scores are scientifically real and sometimes useful, but current clinical use can widen inequities if ancestry portability and health-system access are treated as afterthoughts.",
		uncertaintySummary:
			"The direction of the portability problem is well supported. Uncertainty is higher for specific diseases, locally calibrated scores, multi-ancestry methods, and whether returning scores improves outcomes equitably in real health systems.",
		searchDatabases: ["Consensus", "PubMed", "NHGRI / Genome.gov", "Crossref"],
		searchCutoffAt: "2026-07-04T18:45:00.000Z",
		lastRetractionCheckAt: "2026-07-04T18:45:00.000Z",
		evidenceSummaries: [
			{
				question: "Do polygenic risk scores work equally well across ancestry groups?",
				population:
					"People receiving or being evaluated for polygenic risk scores across diverse and admixed ancestry groups.",
				finding:
					"Scores can stratify risk for some diseases, but current performance is often strongest in European-ancestry samples and less reliable in underrepresented populations unless the score is specifically validated and calibrated.",
				effectDirection: "supports",
				magnitude:
					"The performance gap is large enough to be treated as a clinical-equity issue, not a minor technical footnote.",
				certainty: "moderate",
				limitations: [
					"Performance varies by disease, score construction method, ancestry mix, phenotype definition, and validation cohort.",
					"Many implementation studies still measure prediction more directly than downstream health outcomes.",
					"Better prediction does not guarantee equitable benefit without access to counseling, prevention, and treatment."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "National Human Genome Research Institute",
				role: "Primary U.S. genomics anchor for PRS interpretation and diverse-population methods"
			},
			{
				name: "PRIMED Consortium",
				role: "Research infrastructure anchor for improving PRS methods in diverse populations"
			},
			{
				name: "eMERGE Network",
				role: "Clinical implementation anchor for validating and returning PRS in diverse U.S. populations"
			}
		],
		changeLog: [
			{
				date: "2026-07-04T18:45:00.000Z",
				kind: "publication",
				summary:
					"Initial polygenic risk score ancestry-portability claim page published from NHGRI guidance, diverse-population PRS reviews, and clinical implementation studies."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Polygenic Risk Scores",
				publisher: "National Human Genome Research Institute",
				url: "https://www.genome.gov/Health/Genomics-and-Medicine/Polygenic-risk-scores",
				stance: "supports",
				note:
					"Explains that PRS estimates relative risk, not diagnosis, and that limited non-European data raises disparity concerns.",
				order: 1
			},
			{
				kind: "context",
				title: "Polygenic RIsk MEthods in Diverse populations (PRIMED) Consortium",
				publisher: "National Human Genome Research Institute",
				url: "https://www.genome.gov/Funded-Programs-Projects/PRIMED-Consortium",
				stance: "supports",
				note:
					"Describes the NIH/NHGRI effort to improve PRS methods, datasets, and application across diverse populations.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Current clinical use of polygenic scores will risk exacerbating health disparities",
				publisher: "Nature Genetics",
				year: 2019,
				url: "https://doi.org/10.1038/s41588-019-0379-x",
				doi: "10.1038/s41588-019-0379-x",
				pmid: "30926966",
				stance: "supports",
				note:
					"Argues that clinical PRS use can widen disparities because available scores were several times more accurate in European-ancestry populations.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Analysis of polygenic risk score usage and performance in diverse human populations",
				publisher: "Nature Communications",
				year: 2019,
				url: "https://doi.org/10.1038/s41467-019-11112-0",
				doi: "10.1038/s41467-019-11112-0",
				pmid: "31346163",
				pmcid: "PMC6658471",
				stance: "supports",
				note:
					"Review of 2008-2017 PRS studies found heavy European-ancestry concentration and lower performance for European-derived scores in non-European samples.",
				order: 4
			},
			{
				kind: "systematic_review",
				title: "Principles and methods for transferring polygenic risk scores across global populations",
				publisher: "Nature Reviews Genetics",
				year: 2024,
				url: "https://doi.org/10.1038/s41576-023-00637-2",
				doi: "10.1038/s41576-023-00637-2",
				pmid: "37620596",
				stance: "supports",
				note:
					"Reviews why transferability is limited and which methodological changes may improve PRS performance across populations.",
				order: 5
			},
			{
				kind: "landmark_study",
				title:
					"Selection, optimization and validation of ten chronic disease polygenic risk scores for clinical implementation in diverse US populations",
				publisher: "Nature Medicine",
				year: 2024,
				url: "https://doi.org/10.1038/s41591-024-02796-z",
				doi: "10.1038/s41591-024-02796-z",
				pmid: "38374346",
				stance: "context",
				note:
					"eMERGE implementation study showing how PRS can be selected, optimized, validated, and communicated for diverse U.S. populations while acknowledging portability limits.",
				order: 6
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
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. The dominant medical view shifted when evidence showed that Helicobacter pylori infection is a common cause of peptic ulcers and that NSAIDs are another major cause. Stress and spicy foods can worsen symptoms for some people, but they are not the main causal explanation that replaced the bacterial model.",
		stableCore: [
			"NIDDK identifies H. pylori infection and NSAID use as the most common causes of peptic ulcers, with other causes uncommon or rare.",
			"H. pylori transformed ulcer treatment because it explained many cases that older stress-and-acid narratives did not handle well.",
			"This was not a case of science randomly flipping; it was a case of new evidence outperforming an older model.",
			"Modern H. pylori guidance focuses on diagnosing infection, choosing eradication therapy in light of antibiotic resistance, and confirming eradication after treatment.",
			"The old stress-and-lifestyle story had intuitive appeal, but the bacterial evidence changed the causal center of the field while leaving room for symptom triggers and noninfectious ulcer pathways."
		],
		openQuestions: [
			"How should historical reversals be explained so people learn from them without assuming every modern consensus is equally fragile?",
			"Which institutional or cultural habits made the older ulcer model so sticky?",
			"How should public summaries explain H. pylori without implying that every ulcer is infectious or that NSAID risk is secondary?"
		],
		whatWouldChangeMinds: [
			"Strong contradictory evidence showing H. pylori is not a major causal contributor across ulcer populations and that eradication does not meaningfully affect recurrence or complications.",
			"A better model that explains treatment success, ulcer recurrence, gastritis, and guideline practice without bacterial infection playing a central role.",
			"Major gastroenterology guidelines abandoning H. pylori testing and eradication for relevant ulcer patients."
		],
		misconceptions: [
			"People often retell this case as if stress had nothing to do with symptoms or healing, when the real shift was about the primary cause of many ulcers.",
			"The bacterial model is sometimes overstated as if NSAIDs, critical illness, cancer, and rare idiopathic ulcers do not exist.",
			"A real historical correction is sometimes used to imply that current expert consensus is always likely to be overturned just as easily."
		],
		editorSummary:
			"This is one of the clearest examples of evidence changing minds for the right reason: the new explanation fit the data and changed treatment outcomes.",
		uncertaintySummary:
			"The historical correction is settled: H. pylori is a major cause of peptic ulcer disease and eradication changed routine care. Remaining uncertainty is mostly about regional resistance, best treatment regimens, non-H. pylori ulcers, and how to teach the case without making all consensus sound fragile.",
		searchDatabases: ["Consensus", "PubMed", "NIDDK / NIH", "ACG guidance"],
		searchCutoffAt: "2026-07-04T19:10:00.000Z",
		lastRetractionCheckAt: "2026-07-04T19:10:00.000Z",
		evidenceSummaries: [
			{
				question: "Were most stomach ulcers caused by stress rather than bacteria?",
				population:
					"People with peptic ulcer disease and historical claims about the stress-versus-infection explanation for ulcers.",
				finding:
					"H. pylori infection and NSAID exposure are now treated as central causal pathways for peptic ulcer disease; stress and spicy foods may affect symptoms but do not explain the major causal shift.",
				effectDirection: "supports",
				magnitude:
					"The shift was large enough to change routine diagnosis and treatment from symptom suppression alone toward infection testing, eradication therapy when present, and confirmation of cure.",
				certainty: "high",
				limitations: [
					"H. pylori prevalence, antibiotic resistance, and preferred treatment regimens vary by region.",
					"Not every ulcer is caused by H. pylori; NSAIDs and other uncommon causes remain clinically important.",
					"Historical case studies need care because genuine reversals do not mean every current consensus is weak."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "NIDDK / NIH",
				role: "Current public-health explanation of peptic-ulcer causes"
			},
			{
				name: "American College of Gastroenterology",
				role: "Clinical guideline anchor for H. pylori treatment and eradication confirmation"
			},
			{
				name: "Nobel Prize",
				role: "Historical anchor for the Warren and Marshall discovery"
			}
		],
		changeLog: [
			{
				date: "2026-07-04T19:10:00.000Z",
				kind: "update",
				summary:
					"Expanded the ulcer historical case with current NIDDK, ACG, Nobel, Lancet, and global-guideline context while preserving the historical correction framing."
			}
		],
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
				title: "Symptoms & Causes of Peptic Ulcers (Stomach or Duodenal Ulcers)",
				publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
				year: 2022,
				url: "https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers/symptoms-causes",
				stance: "supports",
				note:
					"NIDDK identifies H. pylori infection and NSAID use as the most common causes of peptic ulcers and distinguishes them from uncommon causes.",
				order: 2
			},
			{
				kind: "guideline",
				title: "ACG Clinical Guideline: Treatment of Helicobacter pylori Infection",
				publisher: "American Journal of Gastroenterology",
				year: 2024,
				url: "https://doi.org/10.14309/ajg.0000000000002968",
				doi: "10.14309/ajg.0000000000002968",
				pmid: "39626064",
				stance: "supports",
				note:
					"Current ACG treatment guideline context; ACG summary emphasizes optimized bismuth quadruple therapy, avoiding empiric clarithromycin triple therapy without susceptibility, and confirming eradication.",
				order: 3
			},
			{
				kind: "context",
				title: "Barry J. Marshall - Facts",
				publisher: "NobelPrize.org",
				year: 2005,
				url: "https://www.nobelprize.org/prizes/medicine/2005/marshall/facts/",
				stance: "supports",
				note:
					"Nobel Prize historical context for Warren and Marshall's discovery of H. pylori and its role in gastritis and peptic ulcer disease.",
				order: 4
			},
			{
				kind: "context",
				title: "Peptic ulcer disease",
				publisher: "The Lancet",
				year: 2024,
				url: "https://consensus.app/papers/peptic-ulcer-disease-almadi-lu/3c2e12426a91505bb19b4e7bb5f8701b/",
				stance: "supports",
				note:
					"Current review summarizing peptic ulcer disease as usually attributable to H. pylori infection, medications such as aspirin and NSAIDs, critical illness, or idiopathic causes.",
				order: 5
			},
			{
				kind: "systematic_review",
				title: "A scoping review of worldwide guidelines for diagnosis and treatment of Helicobacter pylori infection",
				publisher: "Systematic Reviews",
				year: 2025,
				url:
					"https://consensus.app/papers/a-scoping-review-of-worldwide-guidelines-for-diagnosis-and-sun-liu/d290c96e0ee652d58128ef1f7f5153ce/",
				stance: "context",
				note:
					"Review of 25 global guidelines finding foundational consensus around diagnosis and treatment while preserving regional differences in indications, diagnostics, and regimens.",
				order: 6
			}
		]
	},
	{
		topicSlug: "historical-case-studies",
		title: "Did removing lead from gasoline really lower children's lead exposure?",
		slug: "did-removing-lead-from-gasoline-lower-childrens-lead-exposure",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Leaded gasoline was a major population source of lead exposure. After phaseout, measured blood lead levels fell sharply, especially in children. Exposure did not disappear: old paint, dust, soil, plumbing, aviation fuel, industry, and imported products can still matter locally.",
		stableCore: [
			"Lead is a neurotoxin, and public-health agencies do not identify a safe blood lead level for children.",
			"Leaded gasoline added lead to air, dust, and soil at population scale, making it more than an individual household problem.",
			"U.S. NHANES data show children's average blood lead levels fell dramatically after major source controls, including the phaseout of leaded gasoline.",
			"An updated international systematic review found that removing lead from automotive gasoline was associated with population blood lead declines in all countries examined.",
			"The historical lesson is not that regulation solved every lead problem; it is that removing a large environmental source produced measurable public-health benefit."
		],
		openQuestions: [
			"Which remaining sources drive exposure in a specific community: older housing, contaminated soil, drinking-water plumbing, industrial emissions, aviation gasoline, spices, ceramics, cosmetics, or informal recycling?",
			"How should cities prioritize remediation when population averages are low but exposure remains concentrated by poverty, race, housing age, and local industry?",
			"How much did lower lead exposure affect long-term outcomes beyond blood lead levels, such as school performance, behavior, earnings, or crime?"
		],
		whatWouldChangeMinds: [
			"High-quality time-series and exposure evidence showing that blood lead declines occurred independently of gasoline lead removal and were better explained by unrelated factors.",
			"International evidence showing no consistent population blood lead response after leaded gasoline phaseouts.",
			"A toxicology reassessment showing that childhood lead exposure at the observed levels was not harmful after all."
		],
		misconceptions: [
			"People sometimes treat leaded gasoline as a minor historical nuisance rather than a major population exposure source.",
			"A successful gasoline phaseout is sometimes mistaken for proof that childhood lead exposure is no longer a serious issue.",
			"Blood lead reference values and drinking-water action levels are often misread as safe thresholds rather than triggers for public-health action.",
			"Claims about broad social effects of lead exposure can be more uncertain than the core claims that lead harms children and that gasoline phaseout reduced exposure."
		],
		editorSummary:
			"This historical case should connect the site's existing lead-health page to a concrete public-health success: source removal changed measured exposure, while legacy and local sources still require prevention.",
		uncertaintySummary:
			"The core claim is strong: lead from gasoline was a major exposure source; removing it was followed by large blood-lead declines; and childhood lead exposure is harmful. Remaining uncertainty is local: which sources still drive exposure, how to prioritize cleanup, and the size of downstream social effects.",
		uncertaintyDrivers: [
			{
				type: "implementation",
				detail:
					"Gasoline phaseout reduced a large shared source, but communities still need local source identification and remediation."
			},
			{
				type: "generalizability",
				detail:
					"Population averages can hide remaining high exposure in older housing, lower-income communities, and places near ongoing sources."
			},
			{
				type: "indirectness",
				detail:
					"Blood lead declines are direct exposure evidence; broader social outcomes require more assumptions and are more debated in magnitude."
			}
		],
		searchDatabases: ["Consensus", "CDC", "EPA", "WHO", "NHANES"],
		searchCutoffAt: "2026-07-04T21:00:00.000Z",
		lastRetractionCheckAt: "2026-07-04T21:00:00.000Z",
		inclusionRules: [
			"Prioritize population blood lead data, systematic reviews of gasoline phaseout, public-health agency summaries, and child-development evidence.",
			"Distinguish measured exposure declines from broader social-effect claims that depend on longer causal chains.",
			"Keep legacy lead paint, plumbing, soil, industrial, aviation, and imported-product exposure in view."
		],
		exclusionRules: [
			"Do not use crime-trend claims as primary evidence that gasoline lead phaseout worked.",
			"Do not treat a falling national average as proof that every community is now protected.",
			"Do not use action levels, reference values, or regulatory thresholds as if they defined a safe level."
		],
		evidenceSummaries: [
			{
				question: "Did removing lead from gasoline lower population blood lead exposure?",
				population: "Children and adults exposed before, during, and after automotive leaded-gasoline phaseouts",
				finding:
					"Population blood lead levels fell sharply after major source controls, and a 2022 systematic review found declines associated with leaded-gasoline removal in every country it examined.",
				effectDirection: "supports",
				magnitude:
					"U.S. children ages 1 to 5 had geometric mean blood lead levels fall from 15.2 micrograms per deciliter in 1976-1980 to 0.83 in 2011-2016.",
				certainty: "high",
				limitations: [
					"Other source controls, including lead-soldered cans and paint restrictions, also contributed to declines.",
					"National trends do not identify every local source that still exposes children.",
					"Evidence for downstream life-course outcomes is important but less direct than blood lead measurements."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "Centers for Disease Control and Prevention",
				role: "Public-health anchor for childhood lead exposure, no-safe-level framing, and blood lead surveillance."
			},
			{
				name: "U.S. Environmental Protection Agency",
				role: "Regulatory and historical anchor for the U.S. on-road leaded-gasoline phaseout."
			},
			{
				name: "World Health Organization",
				role: "Global public-health anchor for lead toxicity and child-development risk."
			}
		],
		changeLog: [
			{
				date: "2026-07-04T21:00:00.000Z",
				kind: "publication",
				summary:
					"Initial leaded-gasoline historical case published from CDC, EPA, WHO, NHANES, and Consensus-located review evidence."
			}
		],
		sources: [
			{
				kind: "systematic_review",
				title: "Relation of blood lead levels and lead in gasoline: an updated systematic review",
				publisher: "Environmental Health",
				year: 2022,
				url:
					"https://consensus.app/papers/relation-of-blood-lead-levels-and-lead-in-gasoline-an-angrand-collins/73fbf53be91857219da29fc2eaf19633/",
				stance: "supports",
				note:
					"International review finding that automotive leaded-gasoline removal was associated with population blood lead declines in all countries examined.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "The decline in blood lead levels in the United States. The National Health and Nutrition Examination Surveys",
				publisher: "JAMA",
				year: 1994,
				url:
					"https://consensus.app/papers/the-decline-in-blood-lead-levels-in-the-united-states-pirkle-brody/07d98749784c5c6cb6782704dd37849a/",
				stance: "supports",
				note:
					"NHANES analysis reporting a 78% U.S. population blood-lead decline from 1976-1980 to 1988-1991, most likely driven by removal of lead from gasoline and soldered cans.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Blood Lead Levels in U.S. Children Ages 1-11 Years, 1976-2016",
				publisher: "Environmental Health Perspectives",
				year: 2021,
				url: "https://doi.org/10.1289/EHP7932",
				doi: "10.1289/EHP7932",
				pmid: "33439082",
				pmcid: "PMC8115408",
				stance: "supports",
				note:
					"Forty-year NHANES analysis showing U.S. children's geometric mean blood lead levels fell by about 95%, while remaining risk clustered by race, poverty, and housing age.",
				order: 3
			},
			{
				kind: "consensus_statement",
				title: "EPA Takes Final Step in Phaseout of Leaded Gasoline",
				publisher: "U.S. Environmental Protection Agency",
				year: 1996,
				url: "https://www.epa.gov/archive/epa/aboutepa/epa-takes-final-step-phaseout-leaded-gasoline.html",
				stance: "supports",
				note:
					"EPA historical source for the U.S. Clean Air Act ban on remaining on-road leaded gasoline effective January 1, 1996, and the agency's phaseout timeline.",
				order: 4
			},
			{
				kind: "guideline",
				title: "About Childhood Lead Poisoning Prevention",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/lead-prevention/about/index.html",
				stance: "context",
				note:
					"Current CDC context that no safe blood lead level has been identified for children and that common exposures include paint, dust, food, water, and contaminated soil.",
				order: 5
			},
			{
				kind: "guideline",
				title: "Lead poisoning",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/lead-poisoning-and-health",
				stance: "context",
				note:
					"Global public-health context for lead's effects on children's brain development and the absence of a known safe blood lead concentration.",
				order: 6
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
		topicSlug: "consensus-foundations",
		title: "Does scientific consensus mean every scientist agrees?",
		slug: "does-scientific-consensus-mean-every-scientist-agrees",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 93,
		bottomLine:
			"No. Scientific consensus means strong, evidence-based agreement among qualified experts in a field, not unanimity and not a popularity vote. A few dissenting experts can exist even when the best-supported conclusion is clear, and the existence of dissent does not by itself make the evidence evenly divided.",
		stableCore: [
			"Scientific consensus is best understood as expert convergence around the weight of evidence, not a demand that every scientist agree.",
			"NASA's climate-consensus page emphasizes that science focuses on evidence rather than opinion, and uses multiple peer-reviewed studies plus institutional statements to document expert agreement.",
			"Dellsen's consensus-versus-unanimity analysis directly contrasts expert unanimity with expert consensus, where some experts may reject or remain uncertain about the dominant view.",
			"Public-understanding research finds that familiarity with what scientific consensus means is often rarer than communicators assume."
		],
		openQuestions: [
			"Which public explanations help people distinguish minority expert dissent from an actual split in the evidence?",
			"How should consensus estimates be communicated when the relevant expert population is hard to define?",
			"When does emphasizing consensus help public understanding, and when does it trigger motivated reasoning or distrust?"
		],
		whatWouldChangeMinds: [
			"A robust account showing that scientific consensus requires literal unanimity before it is meaningful to non-experts.",
			"Evidence that dissenting minority views, by their mere existence, reliably make high-agreement expert claims evidentially 50/50.",
			"Major science-communication or assessment bodies adopting unanimity as the standard for describing consensus."
		],
		misconceptions: [
			"Consensus is not a vote where the largest team wins; it is a judgment about what the total evidence supports.",
			"One credentialed dissenter does not automatically cancel the weight of many independent lines of evidence.",
			"Consensus can coexist with uncertainty about mechanisms, effect size, timing, scope, or edge cases."
		],
		editorSummary:
			"This page should make the site's own language clearer: consensus is neither groupthink nor unanimity. It is the public-facing name for a strong expert-evidence convergence that still leaves room for technical dispute.",
		uncertaintySummary:
			"The concept-level point is strong: consensus does not mean every scientist agrees. Practical uncertainty is about how to measure expert agreement fairly, communicate minority dissent, and avoid turning consensus language into either overclaiming or false balance.",
		searchCutoffAt: "2026-07-03T02:46:15.000Z",
		lastRetractionCheckAt: "2026-07-03T02:46:15.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:46:15.000Z",
				kind: "publication",
				summary:
					"Initial consensus-versus-unanimity claim page published from NASA consensus documentation and science-communication literature."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Scientific Consensus",
				publisher: "NASA Science",
				year: 2024,
				url: "https://science.nasa.gov/climate-change/scientific-consensus/",
				stance: "supports",
				note:
					"Official science-communication source emphasizing evidence over opinion and using peer-reviewed studies plus institutional statements to document a field-specific consensus.",
				order: 1
			},
			{
				kind: "context",
				title: "Consensus versus Unanimity: Which Carries More Weight?",
				publisher: "The British Journal for the Philosophy of Science",
				year: 2021,
				url: "https://doi.org/10.1086/718273",
				doi: "10.1086/718273",
				stance: "supports",
				note:
					"Directly contrasts unanimity with expert consensus, including cases where some experts reject or remain uncertain about the dominant view.",
				order: 2
			},
			{
				kind: "context",
				title: "Public Conceptions of Scientific Consensus",
				publisher: "Erkenntnis",
				year: 2022,
				url: "https://doi.org/10.1007/s10670-022-00569-z",
				doi: "10.1007/s10670-022-00569-z",
				pmid: "35873138",
				pmcid: "PMC9289351",
				stance: "context",
				note:
					"Qualitative interview study finding that public familiarity with scientific consensus can be lower than communicators expect, which supports defining the term explicitly.",
				order: 3
			},
			{
				kind: "context",
				title: "Covering scientific consensus: What to avoid and how to get it right",
				publisher: "The Journalist's Resource",
				year: 2021,
				url: "https://journalistsresource.org/media/scientific-consensus-news-tips/",
				stance: "context",
				note:
					"Practical media-literacy source describing consensus as the collective position scientists in a field have taken based on available evidence.",
				order: 4
			}
		]
	},
	{
		topicSlug: "science-communication",
		title: "Can prebunking and corrections reduce misinformation?",
		slug: "can-prebunking-and-corrections-reduce-misinformation",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
			"Yes, often, but not perfectly. Corrections, fact checks, accuracy prompts, and prebunking can reduce belief in or sharing of misinformation and can improve discernment, but effects vary by topic, trust, timing, format, audience, and how the outcome is measured. These tools are useful safeguards, not a cure for every misinformation problem.",
		stableCore: [
			"Reactive corrections can reduce misinformation belief, but false claims can continue to influence reasoning after correction.",
			"Prebunking or psychological inoculation aims to warn people about misleading tactics before exposure, so they are less likely to be persuaded later.",
			"A 2023 JMIR meta-analysis of 42 independent studies with 42,530 subjects found psychological inoculation reduced perceived credibility of misinformation and improved credibility and sharing discernment.",
			"A 2026 signal-detection meta-analysis of 33 inoculation experiments found improved discrimination between reliable and unreliable news without increasing generalized response bias.",
			"A 2026 systematic review of digital inoculation studies cautioned that many studies have weak links to core inoculation-theory mechanisms, so practical effectiveness and theoretical claims should not be overstated."
		],
		openQuestions: [
			"Which interventions last beyond the immediate test setting without requiring frequent boosters?",
			"How do effects change in highly polarized or low-trust topics?",
			"Which formats improve discernment without making people distrust accurate information?",
			"How should platforms and public agencies combine prebunking, corrections, source labels, community trust, and slower sharing prompts?"
		],
		whatWouldChangeMinds: [
			"Large preregistered reviews showing that corrections and prebunking do not improve belief accuracy, sharing discernment, or manipulation-recognition outcomes beyond placebo-like effects.",
			"Strong evidence that common interventions reliably backfire by increasing belief in misinformation or reducing trust in accurate information across audiences.",
			"Better long-term field evidence showing a different intervention class consistently outperforms corrections and prebunking for public-interest misinformation."
		],
		misconceptions: [
			"A correction can help without fully erasing the original false belief.",
			"Prebunking is not mind control; it usually teaches warning signs or manipulation tactics before exposure.",
			"A successful intervention in a lab, game, or short video does not guarantee durable real-world behavior change.",
			"Calling an intervention evidence-based does not mean it works equally well for every audience or every topic."
		],
		editorSummary:
			"This page should help the site explain how to respond to misinformation without sounding naive. The evidence supports using corrections and prebunking, but the durable public-health lesson is layered defenses, not one perfect message.",
		uncertaintySummary:
			"Evidence supports modest-to-useful effects for several misinformation interventions, especially on belief and discernment outcomes. Uncertainty is higher for long-term durability, behavior change, cross-cultural generalization, polarized topics, and whether digital games or videos always work through the mechanisms claimed by inoculation theory.",
		searchCutoffAt: "2026-07-03T02:46:15.000Z",
		lastRetractionCheckAt: "2026-07-03T02:46:15.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:46:15.000Z",
				kind: "publication",
				summary:
					"Initial misinformation-intervention claim page published from meta-analysis, review, public-health guidance, and recent cautionary systematic-review sources."
			}
		],
		sources: [
			{
				kind: "meta_analysis",
				title:
					"Psychological Inoculation for Credibility Assessment, Sharing Intention, and Discernment of Misinformation: Systematic Review and Meta-Analysis",
				publisher: "Journal of Medical Internet Research",
				year: 2023,
				url: "https://doi.org/10.2196/49255",
				doi: "10.2196/49255",
				pmid: "37560816",
				pmcid: "PMC10498317",
				stance: "supports",
				note:
					"Meta-analysis of 42 independent studies with 42,530 subjects finding reduced misinformation credibility assessment and improved credibility and sharing discernment, while not finding a significant overall effect on misinformation sharing intention.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "A signal detection theory meta-analysis of psychological inoculation against misinformation",
				publisher: "Current Opinion in Psychology",
				year: 2026,
				url: "https://doi.org/10.1016/j.copsyc.2025.102194",
				doi: "10.1016/j.copsyc.2025.102194",
				pmid: "41151144",
				stance: "supports",
				note:
					"Meta-analysis of 33 inoculation experiments with 37,075 participants finding improved discrimination between reliable and unreliable news without inducing generalized skepticism or credulity.",
				order: 2
			},
			{
				kind: "context",
				title: "The psychological drivers of misinformation belief and its resistance to correction",
				publisher: "Nature Reviews Psychology",
				year: 2022,
				url: "https://doi.org/10.1038/s44159-021-00006-y",
				doi: "10.1038/s44159-021-00006-y",
				stance: "supports",
				note:
					"High-level review explaining why misinformation can keep influencing reasoning after correction and why both prebunking and debunking interventions are used.",
				order: 3
			},
			{
				kind: "guideline",
				title: "Confronting Health Misinformation: The U.S. Surgeon General's Advisory on Building a Healthy Information Environment",
				publisher: "U.S. Surgeon General / NCBI Bookshelf",
				year: 2021,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK572168/",
				stance: "context",
				note:
					"Public-health guidance defining debunking and prebunking, calling for evidence-based intervention research, and recommending proactive, easy-to-understand communication.",
				order: 4
			},
			{
				kind: "systematic_review",
				title: "An Analysis of Studies Testing Digital Interventions to Inoculate Against Misinformation",
				publisher: "Communication Research",
				year: 2026,
				url: "https://doi.org/10.1177/00936502251411467",
				doi: "10.1177/00936502251411467",
				stance: "debate",
				note:
					"Cautionary systematic review of 72 digital intervention studies warning that many designs weakly test core inoculation-theory mechanisms and may include confounding factors.",
				order: 5
			}
		]
	},
	{
		topicSlug: "science-communication",
		title: "Do corrections to misinformation usually backfire?",
		slug: "do-corrections-to-misinformation-usually-backfire",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 87,
		bottomLine:
			"Usually no. Corrections and fact checks often improve belief accuracy, and strong backfire effects are rare enough that communicators should not avoid correction because of that fear. The caveat is important: corrections can be incomplete, can fade, may not change attitudes or behavior, and work less reliably for polarized science and health claims.",
		stableCore: [
			"Recent reviews describe factual corrections as generally improving belief accuracy, with backfire appearing rare rather than typical.",
			"Experimental work that directly tests correction against no-correction controls often fails to find corrections increasing false beliefs.",
			"Repeating a false claim inside a clear correction does not automatically make the false claim stronger; familiarity backfire has been hard to reproduce in several tests.",
			"Corrections do not fully erase misinformation. The original claim can continue to influence reasoning, especially after repetition, delay, or source credibility effects.",
			"Science-relevant misinformation is harder than the simple version of the story suggests: detailed corrections work better, while health topics and politically polarized topics can be resistant."
		],
		openQuestions: [
			"Which correction formats remain effective after weeks or months rather than immediately after exposure?",
			"How often do corrections change behavior, sharing, or policy attitudes rather than only belief accuracy?",
			"Which audiences are most likely to distrust a correction, and how can corrections be designed without triggering defensive processing?",
			"How should public agencies balance repeating a false claim for clarity against the risk of unnecessary repetition?"
		],
		whatWouldChangeMinds: [
			"Large preregistered reviews showing that ordinary factual corrections generally reduce accuracy or increase belief in the false claim.",
			"Field evidence showing that avoiding correction usually produces better public belief accuracy than clear, well-sourced correction.",
			"Replicated evidence that familiarity backfire is common across health, science, and political misinformation rather than limited to special designs or audiences."
		],
		misconceptions: [
			"A correction failing to persuade everyone is not the same as a backfire.",
			"Backfire is not impossible, but it should not be treated as the normal result of correcting a false claim.",
			"Repeating a myth inside a correction is not automatically harmful when the message clearly labels it as false and replaces it with an explanation.",
			"A correction can improve belief accuracy without changing identity, trust, voting, vaccination, or sharing behavior."
		],
		editorSummary:
			"This page should help visitors understand why the site corrects misinformation directly while staying honest about limits. The evidence supports correction, but not the fantasy that one fact check permanently solves a false belief.",
		uncertaintySummary:
			"Agreement is broad that communicators should not avoid corrections because of generalized backfire fears. Uncertainty remains higher for durability, behavior change, audience skepticism, highly polarized topics, and science or health misinformation where correction effects are weaker and more context-dependent.",
		uncertaintyDrivers: [
			{
				type: "timing",
				detail: "Immediate accuracy gains can decay, and corrections may be overwhelmed by later elite, media, or peer cues."
			},
			{
				type: "implementation",
				detail: "Corrections differ in detail, tone, source, repetition, timing, and whether they offer a coherent alternative explanation."
			},
			{
				type: "generalizability",
				detail: "Effects vary across political, health, science, consumer, and platform settings, so one correction design should not be treated as universal."
			}
		],
		searchDatabases: ["Consensus"],
		searchCutoffAt: "2026-07-04T16:15:00.000Z",
		lastRetractionCheckAt: "2026-07-04T16:15:00.000Z",
		changeLog: [
			{
				date: "2026-07-04T16:15:00.000Z",
				kind: "publication",
				summary:
					"Initial correction-backfire claim page published from Consensus-located meta-analyses, reviews, and experimental studies on misinformation correction."
			}
		],
		evidenceSummaries: [
			{
				question: "Do factual corrections usually make people believe the false claim more strongly?",
				population: "General audiences exposed to misinformation corrections in experimental and review literatures",
				finding:
					"Reviews and direct tests generally find that corrections improve belief accuracy and that backfire effects are rare or difficult to reproduce.",
				effectDirection: "supports",
				magnitude: "Accuracy improvement is common, but the size and durability vary by topic, audience, and correction design.",
				certainty: "moderate",
				limitations: [
					"Many outcomes are immediate belief measures rather than long-term behavior.",
					"Science, health, and politically polarized topics can be more resistant.",
					"Some older and niche studies report backfire-like effects, so the claim is not that backfire is impossible."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "Current Opinion in Psychology reviews",
				role: "Summarize the current correction literature and describe backfire as rare while noting limits on durability and downstream behavior."
			},
			{
				name: "Communication Research and Nature Human Behaviour meta-analyses",
				role: "Quantify continued influence and science-relevant correction effects across many studies rather than relying on isolated examples."
			},
			{
				name: "Experimental backfire and familiarity-backfire studies",
				role: "Directly test whether corrections increase false belief relative to no-correction or control conditions."
			}
		],
		sources: [
			{
				kind: "context",
				title: "Factual corrections: Concerns and current evidence.",
				publisher: "Current Opinion in Psychology",
				year: 2023,
				url:
					"https://consensus.app/papers/factual-corrections-concerns-and-current-evidence-porter-wood/5e0fb506460e5d938d2d571005a8b68f/",
				stance: "supports",
				note:
					"Review summary finding that factual corrections improve belief accuracy across countries, political beliefs, and demographics, while backfire is rare and downstream attitude or behavior effects are usually small.",
				order: 1
			},
			{
				kind: "context",
				title: "Why the backfire effect does not explain the durability of political misperceptions",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2021,
				url:
					"https://consensus.app/papers/why-the-backfire-effect-does-not-explain-the-durability-of-nyhan/3901a7be594c5ea7b056d917880a308f/",
				stance: "supports",
				note:
					"Literature review arguing that corrective information is typically at least somewhat effective at increasing accuracy, while effects often decay or are overwhelmed by elite and media cues.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title:
					"A Meta-Analytic Examination of the Continued Influence of Misinformation in the Face of Correction: How Powerful Is It, Why Does It Happen, and How to Stop It?",
				publisher: "Communication Research",
				year: 2019,
				url:
					"https://consensus.app/papers/a-metaanalytic-examination-of-the-continued-influence-of-walter-tukachinsky/84d2ddd6b1475f1ba8161a278ad3204c/",
				stance: "supports",
				note:
					"Meta-analysis of 32 studies with 6,527 participants finding that corrections do not entirely eliminate misinformation effects and are more effective when coherent, worldview-consistent, and source-linked.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "The backfire effect after correcting misinformation is strongly associated with reliability",
				publisher: "Journal of Experimental Psychology: General",
				year: 2022,
				url:
					"https://consensus.app/papers/the-backfire-effect-after-correcting-misinformation-is-swirethompson-miklaucic/e17092d8d13e5259a8062434bbda6ff9/",
				stance: "supports",
				note:
					"Two-experiment test with 388 and 532 participants finding no misinformation items backfired more in the correction condition than control or initial ratings.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Can corrections spread misinformation to new audiences? Testing for the elusive familiarity backfire effect",
				publisher: "Cognitive Research: Principles and Implications",
				year: 2020,
				url:
					"https://consensus.app/papers/can-corrections-spread-misinformation-to-new-audiences-ecker-lewandowsky/9fde0ce99b0853728488ba40e408e0e4/",
				stance: "supports",
				note:
					"Three experiments with 1,718 participants found substantial evidence against familiarity backfire when correcting novel misinformation, including after a one-week delay.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "A meta-analysis of correction effects in science-relevant misinformation",
				publisher: "Nature Human Behaviour",
				year: 2023,
				url:
					"https://consensus.app/papers/a-metaanalysis-of-correction-effects-in-sciencerelevant-chan-albarracn/649a3a8b1c955ebdba723f0cee3cc8c4/",
				stance: "debate",
				note:
					"Meta-analysis of 205 effect sizes from 74 reports with 60,861 participants; average science-relevant correction effects were not statistically successful, with better results for detailed, nonpolarized, non-health corrections.",
				order: 6
			}
		]
	},
	{
		topicSlug: "science-communication",
		title: "Does communicating scientific consensus change what people believe?",
		slug: "does-communicating-scientific-consensus-change-what-people-believe",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Often, but modestly. Accurate consensus messages can correct misperceptions about what scientists think and can slightly shift factual beliefs, especially on topics such as climate change and genetically modified food. They are not stand-alone persuasion tools: effects vary by topic, trust, prior belief, familiarity, identity, message design, and whether the outcome is belief, concern, policy support, or behavior.",
		stableCore: [
			"Consensus messaging reliably increases perceived scientific consensus in many experiments.",
			"Belief changes are usually smaller than perception changes; a 2022 preregistered meta-analysis found a moderate effect on perceived consensus and a small effect on factual belief.",
			"Climate-change studies show consensus messages can reduce misperceptions across countries and audiences, but direct effects on policy support are less consistent.",
			"Evidence is mixed across topics. Some GMO and climate studies show movement, while vaccine consensus messages have produced weaker or null belief effects in some experiments.",
			"Consensus messages work best as one part of communication that also addresses uncertainty, values, trust, mechanisms, risks, and practical decisions."
		],
		openQuestions: [
			"How durable are consensus-message effects after weeks or months, especially in fast-changing media environments?",
			"Which audiences update because they learned a real expert norm, and which audiences reject the message because of low trust or identity threat?",
			"How should communicators present consensus without implying that science is a vote or that minority uncertainty has disappeared?",
			"Which topics outside climate change and GM food have enough evidence to justify strong claims about consensus messaging?"
		],
		whatWouldChangeMinds: [
			"Large preregistered replications across many topics showing that consensus messages do not reliably change perceived consensus or factual belief.",
			"Evidence that consensus messages routinely polarize audiences, backfire, or reduce trust when compared with similarly careful explanations that omit consensus information.",
			"Conversely, durable field experiments showing large downstream changes in behavior or policy support would justify stronger claims than the current modest-effect framing."
		],
		misconceptions: [
			"Some people treat consensus messaging as propaganda, when the stronger version simply reports what a field's qualified experts have concluded.",
			"Others treat a consensus statistic as enough by itself, even though people also need evidence quality, uncertainty, mechanisms, and decision context.",
			"A small average effect does not mean the message is useless; it may still correct an important false premise for some audiences.",
			"Scientific consensus is not a vote by the public and not a guarantee that every scientist agrees."
		],
		editorSummary:
			"Accurate consensus communication can calibrate public understanding, especially when it is paired with evidence quality, uncertainty, source credibility, and audience context rather than used as persuasion by number.",
		uncertaintySummary:
			"The best-supported effect is correcting perceived consensus. Changes in personal beliefs, worry, policy support, and behavior are smaller, less durable, and more topic-dependent. Climate-change evidence is stronger than evidence for vaccines or many emerging technologies.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail:
					"Much of the evidence comes from climate change, GM food, and vaccination; fewer studies test other science topics or non-Western contexts."
			},
			{
				type: "implementation",
				detail:
					"Message wording, source credibility, familiarity, trust in scientists, and whether the consensus statistic is connected to evidence all change the likely effect."
			},
			{
				type: "bias",
				detail:
					"Prior beliefs, ideology, conspiratorial worldviews, and identity threat can limit updating or shift which outcomes move."
			},
			{
				type: "timing",
				detail:
					"Many experiments measure immediate effects, while longer-term studies show decay even when some updated belief remains."
			}
		],
		searchDatabases: ["Consensus", "National Academies"],
		searchCutoffAt: "2026-07-04T15:49:39.000Z",
		inclusionRules: [
			"Prioritize preregistered experiments, meta-analyses, multi-country studies, longitudinal tests, and science-communication consensus reports.",
			"Separate perceived consensus from personal belief, worry, policy support, and behavior.",
			"Keep topic boundaries visible when evidence comes mainly from climate change, GM food, vaccination, or COVID-19."
		],
		exclusionRules: [
			"Do not treat consensus messaging as proof that a scientific claim is true; it is evidence about communication effects.",
			"Do not use advocacy copy, polling alone, or one-off slogans as evidence that consensus messaging works.",
			"Do not imply that consensus communication can replace transparent evidence explanation or uncertainty communication."
		],
		appraisalTools: [
			"Consensus-perception outcome check",
			"Belief-versus-behavior distinction",
			"Audience trust and familiarity assessment",
			"Message source and wording audit",
			"Durability and follow-up check"
		],
		evidenceSummaries: [
			{
				question: "Does communicating expert consensus change public understanding or beliefs?",
				population:
					"Adults and student samples exposed to consensus messages about contested science topics such as climate change, GM food, vaccines, and COVID-19",
				finding:
					"Consensus messages generally increase perceived scientific agreement and can produce smaller shifts in factual belief, while downstream attitudes, policy support, and behavior are less consistent.",
				effectDirection: "supports",
				magnitude:
					"A 2022 preregistered meta-analysis of 43 experiments found effects of g = 0.55 on perceived consensus and g = 0.12 on belief in scientific facts; a 2024 27-country climate experiment found a larger effect on misperceptions than on beliefs or worry.",
				certainty: "moderate",
				limitations: [
					"Many effects are measured immediately after exposure.",
					"Climate-change evidence is stronger than evidence for vaccines and many other domains.",
					"Policy support and behavior depend on more than perceived expert agreement."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "National Academies science-communication research agenda",
				role: "Institutional context for treating science communication as evidence-based, audience-specific, and more complex than simply giving people more facts."
			},
			{
				name: "Preregistered consensus-communication meta-analysis",
				role: "Quantitative anchor for the difference between stronger effects on perceived consensus and smaller effects on factual beliefs."
			},
			{
				name: "Gateway Belief Model literature",
				role: "Theory and evidence context for how perceived expert consensus can cascade into beliefs, worry, and support for action in some domains."
			}
		],
		lastRetractionCheckAt: "2026-07-04T15:49:39.000Z",
		changeLog: [
			{
				date: "2026-07-04T15:49:39.000Z",
				kind: "publication",
				summary:
					"Initial consensus-messaging science-communication page published from Consensus-located meta-analysis, multi-country experiments, and National Academies science-communication guidance."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Communicating Science Effectively: A Research Agenda",
				publisher: "National Academies Press",
				year: 2017,
				url: "https://www.nationalacademies.org/read/23674",
				doi: "10.17226/23674",
				stance: "context",
				note:
					"Consensus study report on effective science communication, emphasizing contentious topics, audience context, uncertainty, trust, and the limits of the deficit model.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Scientific-Consensus Communication About Contested Science: A Preregistered Meta-Analysis",
				publisher: "Psychological Science",
				year: 2022,
				url:
					"https://consensus.app/papers/scientificconsensus-communication-about-contested-stekelenburg-schaap/3e82d1775f185e82a0f15953173b8a4b/",
				stance: "supports",
				note:
					"Preregistered meta-analysis of 43 experiments finding consensus messaging increased perceived consensus with g = 0.55 and belief in scientific facts with g = 0.12.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "A 27-country test of communicating the scientific consensus on climate change",
				publisher: "Nature Human Behaviour",
				year: 2024,
				url:
					"https://consensus.app/papers/a-27country-test-of-communicating-the-scientific-vekalov-geiger/135878ce489651b79d6a0b4eb0da916c/",
				stance: "supports",
				note:
					"Preregistered experiment across 27 countries and 10,527 participants finding a substantial reduction in climate consensus misperceptions and smaller effects on beliefs and worry.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"A meta-analytic structural equation analysis of the Gateway Belief Model: highlighting scientific consensus increases support for public action on climate change",
				publisher: "Current Opinion in Behavioral Sciences",
				year: 2025,
				url:
					"https://consensus.app/papers/a-metaanalytic-structural-equation-analysis-of-the-rode-remshard/8c62b394ac595dd2bf8b4f63d00d1b63/",
				stance: "supports",
				note:
					"Meta-analytic structural equation analysis of nine climate studies with 12,975 participants supporting indirect effects from consensus messaging through beliefs, worry, and public-action support.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "When experts matter: Variations in consensus messaging for vaccine and genetically modified organism safety",
				publisher: "Public Understanding of Science",
				year: 2023,
				url:
					"https://consensus.app/papers/when-experts-matter-variations-in-consensus-messaging-for-lyons-mrola/ac9226451949577facefc77c999fb220/",
				stance: "debate",
				note:
					"Preregistered Spanish survey experiments finding consensus messaging improved GMO consensus perception and safety belief but did not influence vaccine beliefs.",
				order: 5
			},
			{
				kind: "context",
				title:
					"A Research Agenda for Climate Change Communication and Public Opinion: The Role of Scientific Consensus Messaging and Beyond",
				publisher: "Environmental Communication",
				year: 2020,
				url:
					"https://consensus.app/papers/a-research-agenda-for-climate-change-communication-and-bayes-bolsen/97615cfbc0b4580aa0bcc1d2cfb5ee80/",
				stance: "context",
				note:
					"Review context describing ongoing debates about when climate consensus messaging works and calling for more attention to motivations, context, message variation, outcomes, and vulnerable populations.",
				order: 6
			},
			{
				kind: "landmark_study",
				title: "Communicating the Scientific Consensus on Climate Change: Diverse Audiences and Effects Over Time",
				publisher: "Environment and Behavior",
				year: 2022,
				url:
					"https://consensus.app/papers/communicating-the-scientific-consensus-on-climate-change-goldberg-gustafson/2f4b4ef47444522f9ecfef41db9c5b0d/",
				stance: "supports",
				note:
					"Two-wave longitudinal study finding consensus beliefs updated across audience segments, with 40% of the original treatment effect remaining after 26 days.",
				order: 7
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Can correlation alone prove causation?",
		slug: "can-correlation-alone-prove-causation",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"No. Correlation can be an important clue, but it does not by itself prove that one thing caused another. Causal claims usually require stronger evidence about timing, alternative explanations, confounding, bias, consistency across studies, plausible mechanisms, and sometimes experiments or natural experiments.",
		stableCore: [
			"Epidemiology distinguishes association from causation because observed associations can arise from chance, bias, confounding, reverse causation, or a common cause.",
			"Temporality is essential: a proposed cause must come before the effect.",
			"Bradford Hill's viewpoints remain widely used as a framework for thinking about causal evidence, but they are not a mechanical checklist that can turn one association into proof.",
			"Modern evidence synthesis often uses causal-assessment approaches to evaluate whether a body of observational evidence supports a causal interpretation."
		],
		openQuestions: [
			"Which causal-inference explanations best help non-specialists avoid both overclaiming and dismissing useful observational evidence?",
			"When are randomized trials necessary, and when are natural experiments, longitudinal designs, negative controls, or mechanistic evidence enough?",
			"How should media stories communicate confounding and reverse causation without making every association sound meaningless?"
		],
		whatWouldChangeMinds: [
			"A defensible causal-inference framework showing that a bare correlation, without timing or alternative-explanation analysis, is sufficient to establish causation.",
			"Major epidemiology or statistics guidance abandoning confounding, temporality, bias, and design considerations when evaluating causal claims.",
			"Repeated examples where simple correlations alone consistently produced reliable causal conclusions across fields without additional assumptions."
		],
		misconceptions: [
			"'Correlation does not prove causation' does not mean correlations are useless; it means they need design and context.",
			"An association can be real and still be non-causal if both variables are driven by a third factor.",
			"A randomized trial is powerful, but it is not the only possible causal evidence; observational evidence can support causality when the broader design and assumptions are strong."
		],
		editorSummary:
			"This page should become a reusable reference for headline literacy. The key message is not 'ignore observational research'; it is 'do not confuse an association with a completed causal case.'",
		uncertaintySummary:
			"The core point is settled: correlation alone is not causal proof. Uncertainty is claim-specific and depends on the design quality, temporality, confounding control, mechanism, replication, and whether intervention evidence exists.",
		searchCutoffAt: "2026-07-03T02:35:29.000Z",
		lastRetractionCheckAt: "2026-07-03T02:35:29.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:35:29.000Z",
				kind: "publication",
				summary:
					"Initial correlation-versus-causation claim page published from epidemiology causation guidance and causal-assessment review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Causation in epidemiology: association and causation",
				publisher: "Health Knowledge",
				url: "https://www.healthknowledge.org.uk/e-learning/epidemiology/practitioners/causation-epidemiology-association-causation",
				stance: "supports",
				note:
					"Epidemiology teaching source explaining that observed associations may reflect chance, bias, or confounding, and that causal judgment requires more than a single study.",
				order: 1
			},
			{
				kind: "context",
				title: "Principles of Causation",
				publisher: "NCBI Bookshelf / StatPearls",
				year: 2024,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK606119/",
				stance: "supports",
				note:
					"Clinical epidemiology reference defining causation as an exposure affecting the probability of a later outcome and summarizing evolved causal-inference concepts.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Causal assessment in evidence synthesis: A methodological review of reviews",
				publisher: "Research Synthesis Methods",
				year: 2022,
				url: "https://doi.org/10.1002/jrsm.1568",
				doi: "10.1002/jrsm.1568",
				stance: "supports",
				note:
					"Methodological review of 53 causal reviews showing how systematic reviews incorporate causal-assessment approaches, most often Bradford Hill viewpoints, with variable transparency.",
				order: 3
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Can relative risk show how likely something is without absolute risk?",
		slug: "can-relative-risk-tell-you-how-likely-something-is-without-absolute-risk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"No. Relative risk is useful for comparing groups, but it cannot show the real-world size of a benefit or harm unless readers also see the baseline risk, absolute risk difference, and time period. A doubled risk can still be tiny or large depending on what it doubled from.",
		stableCore: [
			"Cochrane guidance says systematic-review summaries should show absolute effects alongside relative effects because baseline risk changes the real-world magnitude.",
			"GRADE evidence profiles include assumed risk, corresponding risk, relative effect, and absolute effect so decision makers can judge practical size.",
			"A systematic review of 84 articles found that visual aids and absolute-risk formats can improve understanding, while absolute risk reductions outperformed relative risk reductions for maximizing accuracy.",
			"A Cochrane review found that relative risk reductions are perceived as larger and more persuasive than absolute risk reductions, which can mislead readers when absolute scale is missing."
		],
		openQuestions: [
			"Which format works best for a specific audience, outcome, numeracy level, and decision setting?",
			"How should headlines balance concise wording with enough absolute-risk context to prevent exaggeration?",
			"When should communicators use percentages, natural frequencies, icon arrays, or decision aids?"
		],
		whatWouldChangeMinds: [
			"Risk-communication evidence showing that relative-risk-only presentations produce equal or better understanding without exaggerating the perceived effect size.",
			"Major Cochrane, GRADE, FDA, or AHRQ guidance abandoning the need to communicate baseline and absolute risks.",
			"Replicated decision-quality studies showing that omitting absolute risk does not change comprehension, risk perception, or choices."
		],
		misconceptions: [
			"A 100% increase does not always mean a common event; it could mean a risk moved from 1 in 10,000 to 2 in 10,000.",
			"Relative risk is not fake or useless; it is incomplete when presented without the absolute numbers and time horizon.",
			"Number needed to treat or harm can help some readers, but it still depends on baseline risk and can confuse others when used alone."
		],
		editorSummary:
			"This page gives readers a reusable denominator check for health, environment, and technology claims. It should not dismiss relative risk; it should explain why relative and absolute framing need to travel together.",
		uncertaintySummary:
			"The core communication principle is high-certainty: relative effects need baseline and absolute context for practical interpretation. Uncertainty is about the best format for different audiences and whether natural frequencies, percentages, icon arrays, or decision aids work best in a given setting.",
		searchCutoffAt: "2026-07-03T20:26:27.000Z",
		lastRetractionCheckAt: "2026-07-03T20:26:27.000Z",
		changeLog: [
			{
				date: "2026-07-03T20:26:27.000Z",
				kind: "publication",
				summary:
					"Initial relative-versus-absolute-risk page published from Cochrane/GRADE guidance, AHRQ risk-communication guidance, and systematic-review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Chapter 15: Interpreting results and drawing conclusions",
				publisher: "Cochrane",
				url: "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-15",
				stance: "supports",
				note:
					"Cochrane handbook guidance explaining that absolute effects differ according to baseline risk even when relative effects are similar.",
				order: 1
			},
			{
				kind: "guideline",
				title: "GRADE handbook",
				publisher: "GRADE Working Group",
				url: "https://gradepro.org/handbook/",
				stance: "supports",
				note:
					"Guideline-development anchor describing evidence profiles that present assumed risk, corresponding risk, relative effect, and absolute effect.",
				order: 2
			},
			{
				kind: "guideline",
				title: "The SHARE Approach: Communicating Numbers to Your Patients",
				publisher: "Agency for Healthcare Research and Quality",
				url: "https://www.ahrq.gov/sites/default/files/wysiwyg/sdm/share-approach/share-communicating-numbers.pdf",
				stance: "supports",
				note:
					"AHRQ shared-decision-making resource recommending absolute risk and absolute risk differences rather than relative-risk-only framing.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Evidence-Based Risk Communication: A Systematic Review",
				publisher: "Annals of Internal Medicine",
				year: 2014,
				url: "https://www.acpjournals.org/doi/10.7326/M14-0295",
				doi: "10.7326/M14-0295",
				pmid: "25133362",
				stance: "supports",
				note:
					"Systematic review of 84 articles and 91 unique studies finding that visual aids and absolute-risk formats can improve understanding, with absolute risk reductions outperforming relative risk reductions for maximizing accuracy.",
				order: 4
			},
			{
				kind: "systematic_review",
				title: "Using alternative statistical formats for presenting risks and risk reductions",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2011,
				url: "https://www.cochrane.org/evidence/CD006776_using-different-statistical-formats-presenting-health-information",
				doi: "10.1002/14651858.CD006776.pub2",
				pmid: "21412897",
				stance: "supports",
				note:
					"Review of 35 studies and 83 comparisons finding natural frequencies better understood than percentages and relative risk reductions perceived as larger and more persuasive than absolute risk reductions.",
				order: 5
			},
			{
				kind: "landmark_study",
				title: "Communicating Relative Risk Changes with Baseline Risk",
				publisher: "Medical Decision Making",
				year: 2014,
				url: "https://doi.org/10.1177/0272989X14526305",
				doi: "10.1177/0272989X14526305",
				pmid: "24803429",
				stance: "supports",
				note:
					"Experimental study of 1,234 laypeople showing that frequency-form baseline risks improved understanding and that many participants misread relative risk changes as absolute changes.",
				order: 6
			}
		]
	},
	{
		topicSlug: "bias-incentives",
		title: "Does industry funding automatically make a study false?",
		slug: "does-industry-funding-automatically-make-a-study-false",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"No. Industry funding or a financial conflict of interest does not automatically make a study false, but it is a real bias signal that should change how carefully readers inspect the design, comparator, outcome choices, publication record, independence, and conclusions. Transparency and conflict management matter because funding source is associated with more favorable results and conclusions in some research areas.",
		stableCore: [
			"A Cochrane methodology review found that industry-sponsored drug and device studies more often had favorable efficacy results and favorable conclusions than non-industry-sponsored studies.",
			"The same Cochrane review reported risk ratios of 1.27 for favorable efficacy results and 1.34 for favorable conclusions in industry-sponsored drug and device studies.",
			"ICMJE says transparent disclosure helps readers judge whether relationships and activities are pertinent to a paper's content.",
			"U.S. PHS financial-conflict rules define a financial conflict of interest as a significant financial interest that could directly and significantly affect the design, conduct, or reporting of PHS-funded research."
		],
		openQuestions: [
			"Which disclosure formats actually help readers calibrate credibility without treating every conflict as automatic disqualification?",
			"Which conflict-management tools best reduce bias: independent analysis, data access guarantees, protocol registration, third-party monitoring, or eliminating the relationship?",
			"How do funding effects differ by field, study design, sponsor role, comparator choice, and publication incentives?"
		],
		whatWouldChangeMinds: [
			"Large updated reviews showing no association between sponsor financial interests and favorable results, favorable conclusions, selective reporting, comparator choice, or publication patterns.",
			"Evidence that disclosure and standard peer review alone reliably eliminate funding-related bias without independent data access or conflict management.",
			"Major journal, funder, or regulatory guidance concluding that financial conflicts no longer need disclosure or management because they do not threaten trust or bias."
		],
		misconceptions: [
			"Funding bias is not a magic truth detector; a conflicted study can be correct and an unconflicted study can be wrong.",
			"Disclosure is necessary, but disclosure alone does not remove the possibility of biased design, analysis, interpretation, or nonpublication.",
			"The most important question is not simply who paid, but what control the sponsor had over design, data access, analysis, publication, and interpretation."
		],
		editorSummary:
			"This page should avoid both naive trust and reflexive dismissal. Readers need a practical rule: financial conflicts are evidence-quality context, not proof of fraud.",
		uncertaintySummary:
			"The existence of funding-related bias signals is well supported in drug and device research. The size and mechanism of bias vary by field, sponsor control, study design, and safeguards, so individual studies still need case-by-case appraisal.",
		searchCutoffAt: "2026-07-03T02:35:29.000Z",
		lastRetractionCheckAt: "2026-07-03T02:35:29.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:35:29.000Z",
				kind: "publication",
				summary:
					"Initial industry-funding bias claim page published from Cochrane, ICMJE, and PHS financial-conflict policy sources."
			}
		],
		sources: [
			{
				kind: "systematic_review",
				title: "Industry sponsorship and research outcome",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2017,
				url: "https://www.cochrane.org/evidence/MR000033_industry-sponsorship-and-research-outcome",
				stance: "supports",
				note:
					"Methodology review of 75 papers finding industry-sponsored drug and device studies more often reported favorable efficacy results and conclusions than non-industry-sponsored studies.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Disclosure of Financial and Non-Financial Relationships and Activities, and Conflicts of Interest",
				publisher: "International Committee of Medical Journal Editors",
				url:
					"https://www.icmje.org/recommendations/browse/roles-and-responsibilities/author-responsibilities--conflicts-of-interest.html",
				stance: "supports",
				note:
					"Journal-author responsibility guidance explaining why transparent disclosure is needed for trust and reader judgment, while noting that relationships do not always indicate problematic influence.",
				order: 2
			},
			{
				kind: "guideline",
				title: "42 CFR Part 50 Subpart F: Promoting Objectivity in Research",
				publisher: "Electronic Code of Federal Regulations",
				url: "https://www.ecfr.gov/current/title-42/chapter-I/subchapter-D/part-50/subpart-F",
				stance: "supports",
				note:
					"U.S. PHS rule defining financial conflict of interest and requiring disclosure, review, management plans, public availability, and retrospective review when conflicts are not managed.",
				order: 3
			},
			{
				kind: "consensus_statement",
				title: "Conflict of Interest in Medical Research, Education, and Practice",
				publisher: "National Academies / NCBI Bookshelf",
				year: 2009,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK22943/",
				stance: "context",
				note:
					"Institutional context on disclosure and management policies, including the limitation that disclosure alone does not resolve conflicts of interest.",
				order: 4
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
		topicSlug: "consensus-foundations",
		title: "Does a p-value below 0.05 prove a claim is true?",
		slug: "does-a-p-value-below-005-prove-a-claim-is-true",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. A p-value can be useful evidence about how surprising data are under a statistical model, but it does not prove a hypothesis true, measure effect size, or show that a result is practically important by itself.",
		stableCore: [
			"Statistical significance is not the same thing as practical, clinical, or policy significance.",
			"A p-value does not state the probability that the hypothesis is true or that chance alone produced the result.",
			"Good inference needs study design, effect size, uncertainty intervals, transparency, multiplicity, and prior evidence, not a single threshold."
		],
		openQuestions: [
			"Which replacement language best helps non-specialists avoid binary significant versus not-significant thinking?",
			"When should formal decision thresholds still be used because costs, safety, or regulatory rules require an explicit cutoff?",
			"How should public summaries explain p-values without making readers think statistics are useless?"
		],
		whatWouldChangeMinds: [
			"A major change in statistical guidance showing that single p-value thresholds reliably improve scientific decisions without context.",
			"Evidence that public and professional audiences consistently interpret p-values correctly without effect sizes, uncertainty, and study context."
		],
		misconceptions: [
			"People often read p < 0.05 as proof that a claim is true.",
			"Headlines can treat statistically significant as a synonym for large, important, or ready for action."
		],
		editorSummary:
			"Use this page whenever a claim leans on p < 0.05 as if that alone settles truth, importance, or consensus.",
		searchCutoffAt: "2026-07-03T02:58:35.000Z",
		lastRetractionCheckAt: "2026-07-03T02:58:35.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:58:35.000Z",
				kind: "publication",
				summary:
					"Initial p-value interpretation claim page published from ASA guidance and statistical-methods review literature."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "The ASA Statement on p-Values: Context, Process, and Purpose",
				publisher: "The American Statistician",
				year: 2016,
				url: "https://doi.org/10.1080/00031305.2016.1154108",
				doi: "10.1080/00031305.2016.1154108",
				stance: "supports",
				note:
					"American Statistical Association statement: p-values do not measure the probability a hypothesis is true, effect size, importance, or a complete measure of evidence by themselves.",
				order: 1
			},
			{
				kind: "context",
				title: "American Statistical Association Releases Statement on Statistical Significance and P-Values",
				publisher: "American Statistical Association",
				year: 2016,
				url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf",
				stance: "supports",
				note:
					"Official ASA public release listing the six principles and explaining the goal of improving interpretation of quantitative science.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations",
				publisher: "European Journal of Epidemiology",
				year: 2016,
				url: "https://doi.org/10.1007/s10654-016-0149-3",
				doi: "10.1007/s10654-016-0149-3",
				pmid: "27209009",
				pmcid: "PMC4877414",
				stance: "supports",
				note:
					"Methods review cataloging common misinterpretations and warning that selecting analyses by p-value can create misleading small or large p-values.",
				order: 3
			},
			{
				kind: "context",
				title: "Scientists rise up against statistical significance",
				publisher: "Nature",
				year: 2019,
				url: "https://doi.org/10.1038/d41586-019-00857-9",
				doi: "10.1038/d41586-019-00857-9",
				pmid: "30894741",
				stance: "context",
				note:
					"High-profile commentary with more than 800 signatories calling for less binary use of statistical significance in scientific communication.",
				order: 4
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Does peer review guarantee a study is correct?",
		slug: "does-peer-review-guarantee-a-study-is-correct",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"No. Peer review is an important quality-control step, but it is not a guarantee that a study is correct. It can improve reporting and catch some problems, while still missing errors, bias, weak design, or overinterpretation.",
		stableCore: [
			"Peer review helps journals screen and improve manuscripts before publication.",
			"Evidence on peer-review interventions shows some improvements, especially from statistical review and open review, but the effects are limited and context-dependent.",
			"Published, peer-reviewed papers still need critical appraisal, replication, conflict checks, and comparison with the broader evidence base."
		],
		openQuestions: [
			"Which peer-review models best improve error detection, fairness, and reporting quality across fields?",
			"How should public summaries communicate the value of peer review without implying certification of truth?",
			"Which post-publication review systems best catch errors that pre-publication peer review misses?"
		],
		whatWouldChangeMinds: [
			"Large multi-field trials showing that routine peer review reliably detects major errors and bias before publication.",
			"Evidence that post-publication correction, replication, and synthesis add little beyond journal peer review."
		],
		misconceptions: [
			"People often treat peer-reviewed as meaning proven.",
			"Others overcorrect and treat peer review as worthless because it is imperfect."
		],
		editorSummary:
			"This page should help readers calibrate peer review: valuable signal, not a truth stamp.",
		searchCutoffAt: "2026-07-03T02:58:35.000Z",
		lastRetractionCheckAt: "2026-07-03T02:58:35.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:58:35.000Z",
				kind: "publication",
				summary:
					"Initial peer-review calibration claim page published from Cochrane, BMC Medicine, and COPE sources."
			}
		],
		sources: [
			{
				kind: "systematic_review",
				title: "Editorial peer review for improving the quality of reports of biomedical studies",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2007,
				url: "https://doi.org/10.1002/14651858.MR000016.pub3",
				doi: "10.1002/14651858.MR000016.pub3",
				pmid: "17443635",
				pmcid: "PMC8973931",
				stance: "supports",
				note:
					"Cochrane methodology review finding that editorial peer review may improve readability and reporting quality, but evidence that it ensures research quality is limited.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title:
					"Impact of interventions to improve the quality of peer review of biomedical journals: a systematic review and meta-analysis",
				publisher: "BMC Medicine",
				year: 2016,
				url: "https://doi.org/10.1186/s12916-016-0631-5",
				doi: "10.1186/s12916-016-0631-5",
				pmid: "27287500",
				pmcid: "PMC4902984",
				stance: "supports",
				note:
					"Review of 22 randomized trial reports: statistical peer review improved final manuscript quality, open peer review modestly improved review-report quality, and several common interventions had limited evidence.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Ethical guidelines for peer reviewers",
				publisher: "Committee on Publication Ethics",
				url: "https://publicationethics.org/guidance/guideline/ethical-guidelines-peer-reviewers",
				stance: "context",
				note:
					"Publication-ethics guidance describing standards and responsibilities for reviewers, useful for explaining what peer review is intended to do.",
				order: 3
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Can animal or cell studies prove a treatment works in humans?",
		slug: "can-animal-or-cell-studies-prove-a-treatment-works-in-humans",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"No. Animal and cell studies can be valuable for mechanism, safety signals, and deciding whether human trials are worth doing, but they do not by themselves prove that a treatment works safely in people.",
		stableCore: [
			"Preclinical studies answer basic safety and mechanism questions before human testing.",
			"Human clinical trials are needed to test dose, safety, efficacy, and clinical benefit in people.",
			"Translation from animal findings to approved human treatments is uneven; promising preclinical results often shrink or fail in more rigorous human studies."
		],
		openQuestions: [
			"Which preclinical models best predict human outcomes for each disease and intervention class?",
			"How quickly will validated human-relevant new approach methodologies replace or reduce animal testing in regulatory practice?",
			"Which public labels best distinguish mechanism evidence from evidence of real patient benefit?"
		],
		whatWouldChangeMinds: [
			"Validated preclinical model systems that consistently predict human safety and efficacy without human clinical trials.",
			"Regulatory consensus that a class of treatments can be approved for clinical use from nonhuman evidence alone."
		],
		misconceptions: [
			"Headlines often imply that a treatment worked because it affected cells, mice, or another model system.",
			"People can also dismiss preclinical research entirely, even though it remains useful for mechanism and safety screening."
		],
		editorSummary:
			"This page should be the default evidence-literacy answer when a claim jumps from cells or animals straight to patient benefit.",
		searchCutoffAt: "2026-07-03T02:58:35.000Z",
		lastRetractionCheckAt: "2026-07-03T02:58:35.000Z",
		changeLog: [
			{
				date: "2026-07-03T02:58:35.000Z",
				kind: "publication",
				summary:
					"Initial preclinical-to-human translation claim page published from FDA, NCBI Bookshelf, and PLOS Biology sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Step 3: Clinical Research",
				publisher: "U.S. Food and Drug Administration",
				year: 2018,
				url: "https://www.fda.gov/patients/drug-development-process/step-3-clinical-research",
				stance: "supports",
				note:
					"FDA patient guidance states that preclinical research answers basic safety questions but is not a substitute for studies of how a drug interacts with the human body.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title:
					"Analysis of animal-to-human translation shows that only 5% of animal-tested therapeutic interventions obtain regulatory approval for human applications",
				publisher: "PLOS Biology",
				year: 2024,
				url: "https://doi.org/10.1371/journal.pbio.3002667",
				doi: "10.1371/journal.pbio.3002667",
				pmid: "38870090",
				pmcid: "PMC11175415",
				stance: "supports",
				note:
					"Umbrella review of 122 articles, 54 diseases, and 367 therapeutic interventions: 50% progressed to human studies, 40% to RCTs, and 5% to regulatory approval.",
				order: 2
			},
			{
				kind: "context",
				title: "Drug Trials",
				publisher: "StatPearls / NCBI Bookshelf",
				year: 2026,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK546595/",
				stance: "supports",
				note:
					"Clinical-trial overview describing human trials as the studies that evaluate safety, dose-response, efficacy, and clinical benefit.",
				order: 3
			},
			{
				kind: "context",
				title: "Roadmap to Reducing Animal Testing in Preclinical Safety Studies",
				publisher: "U.S. Food and Drug Administration",
				year: 2025,
				url: "https://www.fda.gov/files/newsroom/published/roadmap_to_reducing_animal_testing_in_preclinical_safety_studies.pdf",
				stance: "context",
				note:
					"FDA roadmap explaining limitations of animal models and the validation path for human-relevant new approach methodologies such as organ chips, computational models, and advanced in vitro assays.",
				order: 4
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Does \"natural\" mean safer or better?",
		slug: "does-natural-mean-safer-or-better",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"No. Natural origin does not by itself make a product safe, effective, pure, or better. Safety depends on dose, ingredients, manufacturing quality, contamination, interactions, and the person using it.",
		stableCore: [
			"Natural products can contain biologically active chemicals, and biologically active chemicals can help, harm, or interact with medicines.",
			"Supplement labels and marketing claims do not guarantee that the product is safe, effective, uncontaminated, or accurately represented.",
			"Risk varies by product, dose, medical condition, pregnancy status, age, other medicines, and manufacturing quality."
		],
		openQuestions: [
			"Which label language best helps consumers distinguish natural origin from proven safety?",
			"How often do specific supplement categories contain contaminants, undeclared drugs, or clinically important dose variation?",
			"Which products deserve stronger premarket safety review because plausible harms exceed plausible benefits?"
		],
		whatWouldChangeMinds: [
			"Reliable evidence that natural-origin products as a class have lower adverse-event, contamination, and interaction risk after controlling for use patterns and dose.",
			"Regulatory or surveillance evidence showing that product quality and safety are consistently verified before public sale."
		],
		misconceptions: [
			"People often treat natural as the opposite of chemical, even though natural products are made of chemicals too.",
			"Marketing can imply that plant-derived, traditional, or supplement products are automatically safer than medicines."
		],
		editorSummary:
			"Use this page when a claim relies on the naturalistic fallacy: natural may be relevant context, but it is not evidence of safety, effectiveness, or quality.",
		searchCutoffAt: "2026-07-03T03:08:54.000Z",
		lastRetractionCheckAt: "2026-07-03T03:08:54.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:08:54.000Z",
				kind: "publication",
				summary:
					"Initial natural-safety claim page published from NCCIH supplement guidance and herbal/dietary supplement hepatotoxicity review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Using Dietary Supplements Wisely",
				publisher: "National Center for Complementary and Integrative Health",
				url: "https://www.nccih.nih.gov/health/using-dietary-supplements-wisely",
				stance: "supports",
				note:
					"NCCIH guidance states that natural does not always mean safe and highlights supplement interactions, inaccurate labels, emergency-department visits, and liver injury.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Are You Considering a Complementary Health Approach?",
				publisher: "National Center for Complementary and Integrative Health",
				url: "https://www.nccih.nih.gov/health/are-you-considering-a-complementary-health-approach",
				stance: "supports",
				note:
					"NCCIH decision guidance explains that individual responses vary, natural does not necessarily mean safe, and product quality and interactions matter.",
				order: 2
			},
			{
				kind: "context",
				title: "Hepatotoxicity of herbal and dietary supplements: an update",
				publisher: "Archives of Toxicology",
				year: 2015,
				url: "https://doi.org/10.1007/s00204-015-1471-3",
				doi: "10.1007/s00204-015-1471-3",
				pmid: "25680499",
				stance: "supports",
				note:
					"Review source documenting unproven efficacy, variable composition, contamination or adulteration concerns, and examples of herbal and dietary supplement liver injury.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Do detox diets and cleanses remove toxins or improve health?",
		slug: "do-detox-diets-and-cleanses-remove-toxins-or-improve-health",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"No, not as they are usually marketed. For healthy people, commercial detox diets and cleanses have little clinical evidence for removing toxins or producing durable health benefits, and some can cause harm.",
		stableCore: [
			"Medical detoxification for specific poisonings or substance withdrawal is different from commercial detox diets and cleanses.",
			"Low-quality or short-term studies do not establish that detox programs remove clinically meaningful toxins or improve long-term health.",
			"Severe calorie restriction, laxatives, unpasteurized juices, high-oxalate juices, hidden ingredients, and colon cleansing can create avoidable risks."
		],
		openQuestions: [
			"Which specific detox products create the highest adverse-event risk?",
			"How should public advice distinguish normal evidence-based nutrition from detox-branded marketing?",
			"Can any narrowly defined intervention improve validated exposure biomarkers enough to matter clinically?"
		],
		whatWouldChangeMinds: [
			"Well-designed randomized trials showing that a defined detox program removes validated toxicants and improves patient-important outcomes beyond ordinary nutrition or calorie reduction.",
			"Long-term follow-up showing durable benefit and acceptable safety compared with standard dietary guidance."
		],
		misconceptions: [
			"People often assume vague fatigue, bloating, or weight changes prove that toxins are leaving the body.",
			"Short-term water or glycogen weight loss can be mistaken for sustained fat loss or improved health."
		],
		editorSummary:
			"This page separates legitimate medical detoxification from detox-branded diets, juices, teas, supplements, and colon cleanses marketed with weak toxin-removal claims.",
		searchCutoffAt: "2026-07-03T03:08:54.000Z",
		lastRetractionCheckAt: "2026-07-03T03:08:54.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:08:54.000Z",
				kind: "publication",
				summary:
					"Initial detox-diets and cleanses claim page published from NCCIH safety guidance and critical-review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "\"Detoxes\" and \"Cleanses\": What You Need To Know",
				publisher: "National Center for Complementary and Integrative Health",
				year: 2025,
				url: "https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know",
				stance: "supports",
				note:
					"NCCIH guidance distinguishes serious medical chelation from commercial detox claims, reports low-quality evidence, and lists safety concerns.",
				order: 1
			},
			{
				kind: "context",
				title: "Detox diets for toxin elimination and weight management: a critical review of the evidence",
				publisher: "Journal of Human Nutrition and Dietetics",
				year: 2015,
				url: "https://doi.org/10.1111/jhn.12286",
				doi: "10.1111/jhn.12286",
				pmid: "25522674",
				stance: "supports",
				note:
					"Critical review finding very little clinical evidence for commercial detox diets and no randomized controlled trials assessing their effectiveness in humans.",
				order: 2
			},
			{
				kind: "context",
				title: "Dietary Supplements Marketed for Weight Loss, Bodybuilding, and Sexual Enhancement",
				publisher: "National Center for Complementary and Integrative Health",
				url:
					"https://www.nccih.nih.gov/health/providers/digest/dietary-supplements-marketed-for-weight-loss-bodybuilding-and-sexual-enhancement",
				stance: "context",
				note:
					"Provider-facing NCCIH context on quick-fix supplement claims, unproven safety or effectiveness, interactions, toxicities, and hidden pharmaceutical ingredients.",
				order: 3
			}
		]
	},
	{
		topicSlug: "bias-incentives",
		title: "Does publication bias skew the published scientific record?",
		slug: "does-publication-bias-skew-the-published-scientific-record",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. Studies with positive or statistically significant results are more likely to appear in the published record, and missing results can overstate benefits or understate harms if reviews rely only on easily available publications.",
		stableCore: [
			"Publication and time-lag bias are real threats because available studies can differ systematically from missing studies.",
			"Clinical trials with positive results are more likely to be published and tend to be published faster than trials with negative or null results.",
			"Good evidence reviews try to reduce this problem by searching trial registries, protocols, regulators, manufacturers, unpublished results, and other non-journal sources."
		],
		openQuestions: [
			"How large is publication bias in each field, outcome type, and time period?",
			"Which registry, protocol-sharing, and results-reporting policies most reduce missing-evidence bias in practice?",
			"How should public summaries explain publication bias without implying that all published research is unreliable?"
		],
		whatWouldChangeMinds: [
			"Broad, repeated evidence that negative, null, safety, and unfavorable findings are published and indexed as completely and as quickly as favorable findings.",
			"Systematic-review audits showing that unpublished or delayed evidence rarely changes benefit, harm, or certainty judgments."
		],
		misconceptions: [
			"People can overcorrect from publication bias to the claim that published science is useless.",
			"Others assume peer-reviewed publication means the available record is complete."
		],
		editorSummary:
			"This page gives readers a reusable explanation for why systematic reviews need comprehensive searches and why absence from journals is not the same as absence of evidence.",
		searchCutoffAt: "2026-07-03T03:08:54.000Z",
		lastRetractionCheckAt: "2026-07-03T03:08:54.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:08:54.000Z",
				kind: "publication",
				summary:
					"Initial publication-bias claim page published from Cochrane Handbook guidance and Cochrane methodology-review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Chapter 13: Assessing risk of bias due to missing evidence in a meta-analysis",
				publisher: "Cochrane Handbook for Systematic Reviews of Interventions",
				year: 2024,
				url: "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-13",
				stance: "supports",
				note:
					"Cochrane guidance states that non-reporting bias occurs when result availability is influenced by P value, magnitude, or direction, and that selective dissemination can overestimate benefits and underestimate harms.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Time to publication for results of clinical trials",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2024,
				url: "https://doi.org/10.1002/14651858.MR000011.pub3",
				doi: "10.1002/14651858.MR000011.pub3",
				pmid: "39601300",
				pmcid: "PMC11600493",
				stance: "supports",
				note:
					"Updated Cochrane review of 204 research reports tracking 165,135 trials; 53% were published in full and positive trials were more likely to be published.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Publication bias in clinical trials due to statistical significance or direction of trial results",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2009,
				url: "https://doi.org/10.1002/14651858.MR000006.pub3",
				doi: "10.1002/14651858.MR000006.pub3",
				pmid: "19160345",
				stance: "supports",
				note:
					"Cochrane methodology review finding that trials with positive findings were published more often and more quickly than trials with negative or null findings.",
				order: 3
			}
		]
	},
	{
		topicSlug: "bias-incentives",
		title: "Does preregistration guarantee a study is trustworthy?",
		slug: "does-preregistration-guarantee-a-study-is-trustworthy",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Preregistration, trial registration, and Registered Reports are useful transparency tools, not trust stamps. They can reduce researcher flexibility, make selective reporting easier to detect, and help readers separate planned tests from exploratory analyses. But preregistrations can be vague, retrospective, ignored, or selectively reported, so study quality still depends on design, measurement, analysis, disclosure, and whether deviations are explained.",
		stableCore: [
			"Preregistration helps by declaring hypotheses, methods, outcomes, or analysis plans before results are known, which reduces opportunities for outcome-driven decisions.",
			"Clinical-trial registration was associated with lower risk of bias in a 2022 Journal of Clinical Epidemiology study of trials included in Cochrane reviews, but many trials were not registered prospectively.",
			"Comparisons between preregistrations and later psychology papers still find selective reporting: one 2023 study found 60% of assessed studies had at least one omitted, added, or direction-changed hypothesis.",
			"Registered Reports add a stronger safeguard by reviewing the question and methods before results are known, but even they require adherence checks and transparent reporting of deviations."
		],
		openQuestions: [
			"Which fields, journals, and funders enforce prospective registration well enough for readers to rely on it as a meaningful credibility signal?",
			"How specific must a preregistration be before it actually limits researcher degrees of freedom?",
			"Which deviations from a preregistered plan are legitimate updates, and which should lower confidence in a confirmatory claim?",
			"How much does preregistration improve eventual effect estimates rather than mainly improving transparency and risk-of-bias assessment?"
		],
		whatWouldChangeMinds: [
			"Large cross-field audits showing that preregistered and registered-report studies do not improve transparency, reporting completeness, or risk-of-bias assessment compared with comparable unregistered work.",
			"Evidence that registration routinely creates false reassurance without detectable gains in selective-reporting detection, publication-bias reduction, or study planning quality.",
			"Conversely, broad enforcement of prospective, specific, machine-checkable registrations with routine deviation audits would justify stronger public confidence in registration as a quality marker."
		],
		misconceptions: [
			"Preregistered is sometimes misread as proven rigorous, even when the plan is vague, late, or not followed.",
			"Exploratory analyses are sometimes treated as illegitimate, when the real issue is whether they are labeled honestly instead of presented as preplanned tests.",
			"A missing preregistration does not automatically make a study false; it mainly makes some selective-reporting and analytic-flexibility risks harder to assess.",
			"Registered Reports reduce publication bias pressure, but they do not remove the need for good measurement, adequate power, replication, and transparent analysis."
		],
		editorSummary:
			"This page should calibrate a common open-science shortcut. Registration is a real credibility signal when it is prospective, specific, enforced, and followed, but it is not a substitute for reading the methods and comparing the source to the broader evidence base.",
		uncertaintySummary:
			"The direction is fairly clear: preregistration and Registered Reports improve transparency and can reduce bias risk. The remaining uncertainty is about practical enforcement, plan quality, adherence, field-to-field variation, and whether the improvement changes estimates or mainly improves auditability.",
		uncertaintyDrivers: [
			{
				type: "implementation",
				detail:
					"Benefits depend on whether registries, journals, reviewers, and funders require prospective, specific, and publicly checkable plans."
			},
			{
				type: "bias",
				detail:
					"Selective reporting can persist when hypotheses or outcomes are omitted, added, changed, or relabeled between registration and publication."
			},
			{
				type: "generalizability",
				detail:
					"Evidence is strongest in medicine, psychology, and adjacent meta-research, and may not transfer equally to exploratory, qualitative, or discovery-heavy fields."
			},
			{
				type: "imprecision",
				detail:
					"Studies vary in whether they measure transparency, risk of bias, statistical-significance rates, publication bias, or actual effect-estimate distortion."
			}
		],
		searchDatabases: ["Consensus", "Crossref", "PubMed"],
		searchCutoffAt: "2026-07-04T18:15:00.000Z",
		inclusionRules: [
			"Prioritize meta-research comparing preregistrations, trial registrations, registered reports, protocols, and final publications.",
			"Separate clinical-trial registration, general preregistration, and Registered Reports because they address overlapping but different bias pathways.",
			"Use field-specific evidence only when the page keeps the field boundary visible."
		],
		exclusionRules: [
			"Do not treat open-science advocacy, registry marketing, or isolated anecdotes as evidence that registration works.",
			"Do not use preregistration as a binary quality label without checking timing, specificity, adherence, and deviations.",
			"Do not frame exploratory research as bad simply because it was not confirmatory or preregistered."
		],
		appraisalTools: [
			"Registration timing check",
			"Protocol-publication concordance check",
			"Risk-of-bias and selective-reporting assessment",
			"Exploratory-versus-confirmatory labeling check"
		],
		evidenceSummaries: [
			{
				question: "Does preregistration reduce bias enough to make a study automatically trustworthy?",
				population:
					"Clinical trials, psychology studies, and meta-research evaluating registrations, preregistrations, Registered Reports, and final publications",
				finding:
					"Registration practices improve transparency and are associated with lower bias risk in some settings, but empirical audits show incomplete prospective registration, deviations, and selective reporting remain common.",
				effectDirection: "mixed",
				magnitude:
					"Lindsley 2022 found registered trials had lower high-or-unclear risk in five of six assessed bias domains; van den Akker 2023 found 60% of examined psychology studies had at least one selectively reported hypothesis category.",
				certainty: "moderate",
				limitations: [
					"Much of the evidence is observational meta-research rather than randomized policy evidence.",
					"Registration quality, timing, specificity, and enforcement vary widely.",
					"Effects on transparency are easier to show than effects on true effect sizes or downstream decisions."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "ClinicalTrials.gov and trial registries",
				role: "Primary infrastructure for prospective clinical-trial registration and public protocol/outcome checking"
			},
			{
				name: "Cochrane methods literature",
				role: "Evidence-synthesis context for missing evidence, risk of bias, and trial-registration interpretation"
			},
			{
				name: "Center for Open Science / Registered Reports ecosystem",
				role: "Open-science infrastructure and publication-format context for preregistration and results-blind review"
			}
		],
		lastRetractionCheckAt: "2026-07-04T18:15:00.000Z",
		changeLog: [
			{
				date: "2026-07-04T18:15:00.000Z",
				kind: "publication",
				summary:
					"Initial preregistration trust-calibration page published from Consensus-located open-science, psychology, and clinical-trial registration meta-research."
			}
		],
		sources: [
			{
				kind: "context",
				title: "Reducing bias, increasing transparency and calibrating confidence with preregistration",
				publisher: "Nature Human Behaviour",
				year: 2023,
				url: "https://doi.org/10.1038/s41562-022-01497-2",
				doi: "10.1038/s41562-022-01497-2",
				pmid: "36707644",
				stance: "supports",
				note:
					"Perspective explaining the core logic of preregistration: outcome-independent decision-making, transparency, and better calibration of confidence rather than automatic proof of quality.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "The benefits of preregistration and Registered Reports",
				publisher: "Evidence-Based Toxicology",
				year: 2024,
				url: "https://doi.org/10.1080/2833373X.2024.2376046",
				doi: "10.1080/2833373X.2024.2376046",
				stance: "supports",
				note:
					"Review of metascientific evidence arguing that preregistration and Registered Reports counter selective reporting and publication bias while warning against mindless use of registration as a quality proxy.",
				order: 2
			},
			{
				kind: "landmark_study",
				title:
					"Clinical trial registration was associated with lower risk of bias compared with non-registered trials among trials included in systematic reviews",
				publisher: "Journal of Clinical Epidemiology",
				year: 2022,
				url: "https://doi.org/10.1016/j.jclinepi.2022.01.012",
				doi: "10.1016/j.jclinepi.2022.01.012",
				pmid: "35081449",
				stance: "supports",
				note:
					"Study of 1,177 clinical trials from 100 Cochrane reviews finding registered trials had lower high-or-unclear risk of bias in five of six domains, with prospective registration associated with lower risk in several domains.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Selective Hypothesis Reporting in Psychology: Comparing Preregistrations and Corresponding Publications",
				publisher: "Advances in Methods and Practices in Psychological Science",
				year: 2023,
				url: "https://doi.org/10.1177/25152459231187988",
				doi: "10.1177/25152459231187988",
				stance: "debate",
				note:
					"Audit comparing 459 psychology preregistrations with publications; 60% of assessed studies had at least one omitted, added, or direction-changed hypothesis, showing registration alone does not prevent selective reporting.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Study Preregistration: An Evaluation of a Method for Transparent Reporting",
				publisher: "Journal of Business and Psychology",
				year: 2020,
				url: "https://doi.org/10.1007/s10869-020-09695-3",
				doi: "10.1007/s10869-020-09695-3",
				stance: "supports",
				note:
					"Mixed-methods study finding preregistration improved transparent reporting and that preregistered samples had fewer statistically significant results than non-preregistered samples.",
				order: 5
			},
			{
				kind: "systematic_review",
				title: "Patterns of pre-registration and publication of trials in Cochrane systematic reviews of interventions",
				publisher: "Journal of Clinical Epidemiology",
				year: 2025,
				url: "https://doi.org/10.1016/j.jclinepi.2025.111958",
				doi: "10.1016/j.jclinepi.2025.111958",
				pmid: "40902861",
				stance: "context",
				note:
					"Random sample of 50 Cochrane intervention reviews found only 25.7% of included primary-outcome trials were preregistered, while registered trials covered 60.1% of participants, emphasizing remaining registration gaps.",
				order: 6
			}
		]
	},
	{
		topicSlug: "bias-incentives",
		title: "Does sharing data and code guarantee a study is reproducible?",
		slug: "does-sharing-data-and-code-guarantee-a-study-is-reproducible",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Sharing data, code, materials, and methods is a strong transparency practice: it lets others inspect, rerun, and reuse the work. But it does not guarantee reproducibility. Files can be incomplete, undocumented, non-executable, privacy-limited, or tied to missing software environments, and openness cannot fix weak design or biased measurement.",
		stableCore: [
			"Open data and code improve auditability by making it easier to check analyses, reuse materials, detect errors, and distinguish reported findings from hidden analytical choices.",
			"Computational reproducibility usually requires the same input data, code, software versions, dependencies, processing steps, and documented analytical environment.",
			"Empirical audits find that even when data or code are shared, independent teams often cannot exactly reproduce the published results without additional documentation or fixes.",
			"Transparency is not the same as truth: a fully open study can still have confounding, measurement bias, small samples, selective framing, or conclusions that outrun the evidence.",
			"Ethical, legal, privacy, Indigenous data governance, commercial, and security constraints can justify controlled access or synthetic data rather than fully public raw data."
		],
		openQuestions: [
			"Which journal and funder policies produce shared materials that are actually runnable, documented, preserved, and reusable rather than merely linked?",
			"How should reviewers balance transparency expectations against privacy, consent, data-sovereignty, and security constraints?",
			"Which reproducibility checks should happen before publication, and which can realistically happen after publication through repositories, badges, or post-publication review?",
			"How should public summaries explain open data and code as a credibility signal without making closed data sound automatically suspicious?"
		],
		whatWouldChangeMinds: [
			"Large cross-field audits showing that data and code availability alone reliably produces independent computational reproducibility without metadata, environment capture, or author assistance.",
			"Evidence that journal, repository, and funder sharing requirements do not improve transparency, error detection, reuse, or reproducibility attempts when compared with similar studies without those requirements.",
			"Major reproducibility guidance abandoning data, code, workflow, metadata, and environment sharing as important safeguards for computational research."
		],
		misconceptions: [
			"Open data is sometimes treated as a truth stamp, even though shared materials can still support a flawed or overinterpreted study.",
			"Closed or controlled-access data is sometimes treated as suspicious by default, even when participant privacy, consent, or legal restrictions make open release inappropriate.",
			"Posting a spreadsheet without analysis code, metadata, version information, or workflow instructions is not the same thing as making a study reproducible.",
			"Computational reproducibility is not the same as independent replication with new data."
		],
		editorSummary:
			"This page should calibrate open-science shortcuts: data and code sharing make claims easier to audit, but reproducibility still depends on complete files, documentation, environments, and study quality.",
		uncertaintySummary:
			"Sharing data, code, workflows, and materials improves transparency and can improve reproducibility. The practical uncertainty is whether the shared package is complete, executable, documented, and ethically shareable; sensitive datasets may need controlled rather than public access.",
		uncertaintyDrivers: [
			{
				type: "implementation",
				detail:
					"Benefits depend on whether journals, funders, repositories, and reviewers require complete files, metadata, executable workflows, and preservation."
			},
			{
				type: "generalizability",
				detail:
					"Evidence comes from psychology, biomedical literature, data repositories, ecology, and computational fields, and practices differ substantially across disciplines."
			},
			{
				type: "bias",
				detail:
					"Open materials reduce some hidden-analysis risks but do not remove bias from design, measurement, confounding, selective framing, or interpretation."
			},
			{
				type: "implementation",
				detail:
					"Privacy, consent, intellectual-property, security, and data-governance limits can require controlled access rather than public release."
			}
		],
		searchDatabases: ["Consensus", "National Academies", "NIH", "Center for Open Science"],
		searchCutoffAt: "2026-07-04T15:40:20.000Z",
		inclusionRules: [
			"Prioritize institutional reproducibility guidance, open-science policy frameworks, and empirical audits that attempted to rerun analyses from shared materials.",
			"Separate computational reproducibility from independent replication with new samples or new data.",
			"Include field-specific audits only when their limits are clear."
		],
		exclusionRules: [
			"Do not treat repository links, badges, or availability statements as proof that analyses are executable.",
			"Do not imply that sensitive data must always be publicly posted when controlled access is ethically or legally required.",
			"Do not use open-science advocacy alone as evidence that openness guarantees correctness."
		],
		appraisalTools: [
			"Computational reproducibility check",
			"Data and code availability audit",
			"Metadata and workflow completeness check",
			"Privacy and controlled-access assessment",
			"Independent replication distinction"
		],
		evidenceSummaries: [
			{
				question: "Does sharing data and code guarantee reproducible results?",
				population:
					"Published studies and replication packages in psychology, language research, biomedical literature, and public data repositories",
				finding:
					"Open data and code are associated with better transparency and higher chances of successful reruns, but audits repeatedly find incomplete, non-executable, or only partly reproducible shared materials.",
				effectDirection: "supports",
				magnitude:
					"Examples include 21 of 36 shared data-and-code Registered Reports with reproduced main results, 34% to 56% reproducibility under an open data policy, one exact reproduction among 14 open-data-badged papers, and 74% initial failure among more than 9,000 R files in Harvard Dataverse replication datasets.",
				certainty: "moderate",
				limitations: [
					"Audit samples are field-specific and use different definitions of reproducibility.",
					"Successful reruns may require author help, package updates, or researcher judgment about acceptable deviations.",
					"Computational reproducibility does not prove that the underlying scientific claim replicates with new data."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "National Academies reproducibility and replicability framework",
				role: "Defines computational reproducibility around consistent results from the same input data, methods, and analysis conditions."
			},
			{
				name: "Center for Open Science TOP Guidelines",
				role: "Journal and funder policy framework covering data citation, data transparency, materials, code, preregistration, and replication standards."
			},
			{
				name: "NIH Data Management and Sharing Policy",
				role: "Biomedical-funder policy context for data sharing, reuse, rigor, and reproducibility while preserving responsible access constraints."
			}
		],
		lastRetractionCheckAt: "2026-07-04T15:40:20.000Z",
		changeLog: [
			{
				date: "2026-07-04T15:40:20.000Z",
				kind: "publication",
				summary:
					"Initial open-data and code reproducibility page published from Consensus-located reproducibility audits and institutional open-science guidance."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Reproducibility and Replicability in Science",
				publisher: "National Academies Press",
				year: 2019,
				url: "https://www.nationalacademies.org/read/25303",
				doi: "10.17226/25303",
				stance: "supports",
				note:
					"Consensus report defining reproducibility as obtaining consistent computational results using the same input data, computational methods, and analysis conditions.",
				order: 1
			},
			{
				kind: "guideline",
				title: "TOP Guidelines",
				publisher: "Center for Open Science",
				url: "https://www.cos.io/initiatives/top-guidelines",
				stance: "supports",
				note:
					"Policy framework for journal and funder standards on data citation, data transparency, material transparency, code transparency, preregistration, and replication.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Data Management & Sharing Policy Overview",
				publisher: "National Institutes of Health",
				url: "https://grants.nih.gov/policy-and-compliance/policy-topics/sharing-policies/dms/policy-overview",
				stance: "supports",
				note:
					"NIH policy context explaining that scientific data sharing can accelerate discovery, enhance rigor and reproducibility, and promote responsible reuse.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Analysis of Open Data and Computational Reproducibility in Registered Reports in Psychology",
				publisher: "Advances in Methods and Practices in Psychological Science",
				year: 2019,
				url:
					"https://consensus.app/papers/analysis-of-open-data-and-computational-reproducibility-obels-lakens/538063e7633a5de28b5014cfe565b0f5/",
				stance: "supports",
				note:
					"Audit of 62 Registered Reports: both data and code were shared for 36 articles, scripts ran for 31 analyses, and main results were reproduced for 21 articles.",
				order: 4
			},
			{
				kind: "landmark_study",
				title:
					"Share the code, not just the data: A case study of reproducibility under an open data policy",
				publisher: "Journal of Memory and Language",
				year: 2022,
				url:
					"https://consensus.app/papers/share-the-code-not-just-the-data-a-case-study-of-the-laurinavichyute-yadav/aca70058758e51ba8248556c028d3595/",
				stance: "supports",
				note:
					"Case study finding an open data policy increased data sharing by more than 50%, while reproducibility ranged from 34% to 56% and analysis code was the strongest predictor of success.",
				order: 5
			},
			{
				kind: "landmark_study",
				title: "What's in a Badge? A Computational Reproducibility Investigation of the Open Data Badge Policy",
				publisher: "Psychological Science",
				year: 2023,
				url:
					"https://consensus.app/papers/whats-in-a-badge-a-computational-reproducibility-crwell-apthorp/6283d1a3c7b65403adcbef14764217fa/",
				stance: "debate",
				note:
					"Reproduction attempt for 14 open-data-badged empirical articles; all provided some data, six provided code, one was exactly reproducible, and three were essentially reproducible with minor deviations.",
				order: 6
			},
			{
				kind: "landmark_study",
				title: "A large-scale study on research code quality and execution",
				publisher: "Scientific Data",
				year: 2021,
				url:
					"https://consensus.app/papers/a-largescale-study-on-research-code-quality-and-execution-trisovic-lau/966d72a5f7055dea93017780d7564063/",
				stance: "supports",
				note:
					"Study of more than 2,000 Harvard Dataverse replication datasets and over 9,000 R files; 74% failed initial execution and 56% still failed after code cleaning.",
				order: 7
			},
			{
				kind: "landmark_study",
				title: "Assessment of transparency indicators across the biomedical literature: How open is open?",
				publisher: "PLoS Biology",
				year: 2020,
				url:
					"https://consensus.app/papers/assessment-of-transparency-indicators-across-the-serghiou-contopoulos-ioannidis/5b9310e40cc9547f85339bdbe595a8db/",
				stance: "context",
				note:
					"Automated assessment of 2.75 million open-access biomedical articles found improvements in some transparency indicators, but not in code sharing or protocol registration.",
				order: 8
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is the ocean becoming more acidic because of human CO2 emissions?",
		slug: "is-the-ocean-becoming-more-acidic-because-of-human-co2-emissions",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
				"Yes. Human CO2 emissions are increasing atmospheric CO2, and the ocean absorbs a large share of that CO2. The result is a well-understood shift in seawater chemistry: lower pH, more hydrogen ions, and fewer carbonate ions, even though seawater remains alkaline overall.",
		stableCore: [
			"Ocean acidification means a long-term reduction in ocean pH, not that the ocean has become literally acidic like vinegar.",
			"Modern open-ocean acidification is primarily driven by anthropogenic CO2 uptake from the atmosphere.",
			"The chemical direction is very well established; the size and timing of biological, ecological, and socioeconomic impacts vary by species, region, and exposure history."
		],
		openQuestions: [
			"Which species and ecosystems will be most resilient or most vulnerable under combined warming, deoxygenation, and acidification?",
			"How much local coastal chemistry is shaped by runoff, upwelling, pollution, and ecosystem management compared with the global CO2 signal?",
			"Which adaptation or emissions pathways most reduce harm to fisheries, reefs, shellfish, and coastal communities?"
		],
		whatWouldChangeMinds: [
			"Long-term, independently replicated observations showing that ocean pH and carbonate chemistry are not tracking atmospheric CO2 uptake as expected.",
			"A stronger geochemical explanation that fits global observations better than anthropogenic CO2 absorption."
		],
		misconceptions: [
			"Some people argue that acidification is fake because seawater is still alkaline.",
			"Others treat uncertainty about ecosystem impact size as uncertainty about the basic CO2 chemistry."
		],
		editorSummary:
				"This page gives readers a compact answer to a common climate-adjacent claim: the chemistry is settled even though local impacts and adaptation questions remain active research areas.",
		searchCutoffAt: "2026-07-03T03:21:50.000Z",
		lastRetractionCheckAt: "2026-07-03T03:21:50.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:21:50.000Z",
				kind: "publication",
				summary:
						"Initial ocean-acidification claim page published from NOAA, IPCC, and expert-survey evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "What is Ocean Acidification?",
				publisher: "NOAA National Ocean Service",
				year: 2024,
				url: "https://oceanservice.noaa.gov/facts/acidification.html",
				stance: "supports",
				note:
						"NOAA explains the core mechanism: atmospheric CO2 uptake lowers pH, increases hydrogen ions, and reduces carbonate ions; it also states the ocean absorbs about 30% of released atmospheric CO2.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Special Report on the Ocean and Cryosphere in a Changing Climate",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2019,
				url: "https://www.ipcc.ch/srocc/",
				stance: "supports",
				note:
						"IPCC assessment anchor stating that ocean acidity is increasing with high confidence and placing acidification among human-linked ocean and cryosphere changes.",
				order: 2
			},
			{
				kind: "context",
				title: "Ocean acidification and its impacts: an expert survey",
				publisher: "Climatic Change",
				year: 2013,
				url: "https://doi.org/10.1007/s10584-012-0591-5",
				doi: "10.1007/s10584-012-0591-5",
				stance: "supports",
				note:
						"Expert survey of 53 ocean-acidification specialists finding strong agreement on chemical aspects and anthropogenic CO2 as the main mechanism, with lower agreement on biological and socioeconomic impacts.",
				order: 3
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Do electric vehicles usually have lower lifetime greenhouse gas emissions than gasoline cars?",
		slug: "do-electric-vehicles-usually-have-lower-lifetime-greenhouse-gas-emissions-than-gasoline-cars",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 90,
		bottomLine:
				"Usually yes. Battery manufacturing can make an electric vehicle start with higher production emissions, and the grid mix matters, but cradle-to-grave comparisons typically find lower lifetime greenhouse gas emissions for electric vehicles than for comparable gasoline cars.",
		stableCore: [
			"The right comparison is cradle-to-grave: vehicle and battery manufacturing, fuel or electricity production, driving, maintenance, and end-of-life handling.",
			"Electric vehicles have no tailpipe emissions and are much more energy efficient during operation, while battery production adds upfront emissions.",
			"The greenhouse-gas advantage is usually larger on cleaner electricity grids and can shrink for very large batteries, low-mileage use, or high-emissions electricity."
		],
		openQuestions: [
			"How should life-cycle models handle marginal electricity generation, charging timing, and future grid decarbonization?",
			"How quickly will battery recycling, mineral sourcing, and manufacturing electricity improve the production-emissions side of the ledger?",
			"How should public comparisons include non-greenhouse categories such as particulate matter, human toxicity, and mineral depletion?"
		],
		whatWouldChangeMinds: [
			"Updated cradle-to-grave analyses showing that typical electric vehicles on current and projected grids no longer have lower lifetime greenhouse gas emissions than comparable gasoline vehicles.",
			"Robust real-world data showing that battery production, replacement, and electricity generation emissions are consistently much higher than current life-cycle assumptions."
		],
		misconceptions: [
			"People sometimes compare gasoline tailpipe emissions with EV battery manufacturing instead of comparing full life cycles on both sides.",
			"Others treat zero tailpipe emissions as if electric vehicles have zero life-cycle emissions."
		],
		editorSummary:
				"This page answers the practical climate question without flattening the tradeoffs: EVs generally reduce greenhouse gas emissions, but the size of the benefit depends on vehicle, grid, and lifetime assumptions.",
		searchCutoffAt: "2026-07-03T03:21:50.000Z",
		lastRetractionCheckAt: "2026-07-03T03:21:50.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:21:50.000Z",
				kind: "publication",
				summary:
						"Initial EV life-cycle greenhouse-gas claim page published from EPA, DOE, IEA, and review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Electric Vehicle Myths",
				publisher: "U.S. Environmental Protection Agency",
				url: "https://www.epa.gov/greenvehicles/electric-vehicle-myths",
				stance: "supports",
				note:
						"EPA states that EVs typically have a smaller carbon footprint than gasoline cars, including electricity used for charging and manufacturing, while noting grid and battery-manufacturing variation.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Emissions from Electric Vehicles",
				publisher: "U.S. Department of Energy Alternative Fuels Data Center",
				url: "https://afdc.energy.gov/vehicles/electric-emissions",
				stance: "supports",
				note:
						"DOE AFDC explains why cradle-to-grave accounting must include fuel-cycle and vehicle-cycle emissions, and why the benefit varies with electricity mix.",
				order: 2
			},
			{
				kind: "context",
				title: "EV Life Cycle Assessment Calculator",
				publisher: "International Energy Agency",
				year: 2024,
				url: "https://www.iea.org/data-and-statistics/data-tools/ev-life-cycle-assessment-calculator",
				stance: "supports",
				note:
						"IEA life-cycle tool compares conventional, plug-in hybrid, and electric cars across assumptions such as vehicle size, distance, lifetime, battery size, and electricity emissions intensity.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
						"Life cycle assessment comparison of electric and internal combustion vehicles: A review on the main challenges and opportunities",
				publisher: "Renewable and Sustainable Energy Reviews",
				year: 2024,
				url: "https://doi.org/10.1016/j.rser.2024.114988",
				doi: "10.1016/j.rser.2024.114988",
				stance: "supports",
				note:
						"Review evidence finding battery electric vehicles generally superior on greenhouse gas emissions, energy demand, and fossil depletion, while not superior in every environmental category.",
				order: 4
			}
		]
	},
	{
		topicSlug: "historical-case-studies",
		title: "Is the ozone layer recovering because of the Montreal Protocol?",
		slug: "is-the-ozone-layer-recovering-because-of-the-montreal-protocol",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
				"Yes. Ozone-depleting substances caused major stratospheric ozone loss, and controls under the Montreal Protocol have reduced those chemicals and put the ozone layer on a long-term recovery path. The ozone hole still varies from year to year and is not fully healed.",
		stableCore: [
			"Human-made chlorine- and bromine-containing compounds, including CFCs and halons, drove stratospheric ozone depletion.",
			"The Montreal Protocol and later amendments sharply reduced controlled ozone-depleting substances, and atmospheric measurements now show a long-term recovery signal.",
			"Annual ozone-hole size is strongly affected by stratospheric temperature and circulation, so a large or small single year does not by itself prove failure or success."
		],
		openQuestions: [
			"How much could non-compliant emissions, very short-lived substances, replacement chemicals, or future aviation delay recovery?",
			"How will climate change alter polar stratospheric chemistry and recovery timing?",
			"Which monitoring systems are needed to detect renewed emissions quickly enough to protect the recovery path?"
		],
		whatWouldChangeMinds: [
			"Long-term measurements showing that ozone-depleting substances are no longer declining or that ozone recovery has stalled despite accounting for natural variability.",
			"Robust attribution evidence showing a driver other than reduced ozone-depleting substances better explains the observed recovery pattern."
		],
		misconceptions: [
			"Some people treat the ozone hole as a failed or fake environmental problem because it still appears each Antarctic spring.",
			"Others confuse ozone depletion with the greenhouse effect and assume the same policy lesson transfers without qualification."
		],
		editorSummary:
				"This historical case study shows what successful consensus-informed policy looks like: the core causal mechanism is strong, monitoring remains essential, and full recovery takes decades.",
		searchCutoffAt: "2026-07-03T03:21:50.000Z",
		lastRetractionCheckAt: "2026-07-03T03:21:50.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:21:50.000Z",
				kind: "publication",
				summary:
						"Initial ozone-recovery claim page published from WMO, NASA/NOAA, and peer-reviewed Montreal Protocol evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Scientific Assessment of Ozone Depletion: 2022 Executive Summary",
				publisher: "WMO / UNEP Scientific Assessment Panel",
				year: 2022,
				url: "https://csl.noaa.gov/assessments/ozone/2022/executivesummary/",
				stance: "supports",
				note:
						"Assessment anchor reporting continued Antarctic ozone recovery, strong year-to-year variability, and projected return to 1980 values around mid-century under continued policy compliance.",
				order: 1
			},
			{
				kind: "guideline",
				title: "WMO Bulletin shows recovery of ozone layer, driven by science",
				publisher: "World Meteorological Organization",
				year: 2025,
				url:
						"https://wmo.int/news/media-centre/wmo-bulletin-shows-successful-recovery-of-ozone-layer-driven-science",
				stance: "supports",
				note:
						"WMO reports that the long-term positive trend reflects international action and that controlled ozone-depleting substances have been phased out by more than 99%.",
				order: 2
			},
			{
				kind: "context",
				title: "NASA, NOAA Rank 2025 Ozone Hole as 5th Smallest Since 1992",
				publisher: "NASA / NOAA",
				year: 2025,
				url:
						"https://science.nasa.gov/earth/nasa-noaa-rank-2025-ozone-hole-as-5th-smallest-since-1992/",
				stance: "supports",
				note:
						"Current monitoring context stating that Montreal Protocol controls are driving gradual ozone-layer recovery while the hole remains far from fully recovered.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Evidence for the effectiveness of the Montreal Protocol to protect the ozone layer",
				publisher: "Atmospheric Chemistry and Physics",
				year: 2010,
				url: "https://doi.org/10.5194/acp-10-12161-2010",
				doi: "10.5194/acp-10-12161-2010",
				stance: "supports",
				note:
						"Peer-reviewed evidence that the Montreal Protocol had measurable effects on the ozone layer about twenty years after becoming legally binding.",
				order: 4
			},
			{
				kind: "context",
				title: "Renewed and emerging concerns over the production and emission of ozone-depleting substances",
				publisher: "Nature Reviews Earth & Environment",
				year: 2020,
				url: "https://doi.org/10.1038/s43017-020-0048-8",
				doi: "10.1038/s43017-020-0048-8",
				stance: "context",
				note:
						"Review context on why non-compliant and short-lived emissions could delay recovery, supporting the page's caveat that the success still requires monitoring.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do cell phones and 5G networks increase cancer risk?",
		slug: "do-cell-phones-and-5g-networks-increase-cancer-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		bottomLine:
				"Current evidence does not show that cell phone or 5G radiofrequency exposure causes cancer in humans. The answer is still monitored rather than closed forever, because exposure patterns, long-term heavy use, animal findings, and subgroup analyses remain areas where better evidence could matter.",
		stableCore: [
			"National cancer and radiation regulators generally say the human evidence to date does not show a cancer increase from ordinary cell-phone radiofrequency exposure.",
			"A 2024 WHO-commissioned systematic review found moderate-certainty evidence that mobile-phone RF exposure likely does not increase glioma, meningioma, acoustic neuroma, pituitary, salivary-gland, or pediatric brain-tumor risk.",
			"Some meta-analyses and IARC's Group 2B classification keep the topic in a precautionary and surveillance category, especially for long-term, heavy, and poorly measured exposure."
		],
		openQuestions: [
			"How should studies measure individual exposure as phone technology, hands-free use, data use, Wi-Fi calling, and base-station exposure patterns change?",
			"Will longer follow-up of very heavy users or people first exposed in childhood change the current cancer-risk assessment?",
			"How should animal and mechanistic findings be integrated when human population evidence remains the main public-health anchor?"
		],
		whatWouldChangeMinds: [
			"Large prospective studies with measured exposure showing a replicated dose-response for specific cancers after appropriate latency periods.",
			"Updated WHO, NCI, FDA, IARC, or comparable assessments concluding that ordinary wireless RF exposure causes cancer in humans."
		],
		misconceptions: [
			"Some people treat any radiation as if it behaves like x-rays or radon.",
			"Others hear 'possibly carcinogenic' as if it means a proven everyday consumer cancer risk.",
			"No demonstrated cancer increase is sometimes overstated as proof that every future exposure scenario is already fully resolved."
		],
		editorSummary:
				"This page handles a durable anxiety topic by separating the current cancer-risk conclusion from mechanism, hazard classification, and legitimate long-term surveillance questions.",
		uncertaintySummary:
				"The main public-health answer leans against a demonstrated cancer increase, but the certainty is not as high as for ionizing-radiation carcinogens. Exposure measurement, technology changes, latency, and subgroup analyses keep the page in broad-qualified rather than strong-closed territory.",
		searchCutoffAt: "2026-07-03T03:31:12.000Z",
		lastRetractionCheckAt: "2026-07-03T03:31:12.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:31:12.000Z",
				kind: "publication",
				summary:
						"Initial cell-phone and 5G cancer-risk claim page published from NCI, FDA, IARC, and WHO-commissioned review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Cell Phones and Cancer Risk",
				publisher: "National Cancer Institute",
				year: 2024,
				url:
						"https://www.cancer.gov/about-cancer/causes-prevention/risk/radiation/cell-phones-fact-sheet",
				stance: "supports",
				note:
						"NCI states that evidence to date suggests cell phone use does not cause brain or other cancers in humans, while explaining non-ionizing RF exposure and ongoing research.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Cell Phones",
				publisher: "U.S. Food and Drug Administration",
				year: 2021,
				url: "https://www.fda.gov/radiation-emitting-products/home-business-and-entertainment-products/cell-phones",
				stance: "supports",
				note:
						"FDA public information states that the weight of scientific evidence has not linked cell-phone radiofrequency radiation with health problems and that FDA continues monitoring evidence.",
				order: 2
			},
			{
				kind: "systematic_review",
				title:
						"The effect of exposure to radiofrequency fields on cancer risk in the general and working population: A systematic review of human observational studies - Part I: Most researched outcomes",
				publisher: "Environment International",
				year: 2024,
				url: "https://doi.org/10.1016/j.envint.2024.108983",
				doi: "10.1016/j.envint.2024.108983",
				pmid: "39241333",
				stance: "supports",
				note:
						"WHO-commissioned systematic review finding moderate-certainty evidence that near-field mobile-phone RF exposure likely does not increase the main adult and pediatric head or brain tumor outcomes studied.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
						"The effect of exposure to radiofrequency fields on cancer risk in the general and working population: A systematic review of human observational studies - Part II: Less researched outcomes",
				publisher: "Environment International",
				year: 2025,
				url: "https://doi.org/10.1016/j.envint.2025.109274",
				doi: "10.1016/j.envint.2025.109274",
				pmid: "39904670",
				stance: "supports",
				note:
						"WHO-commissioned companion review finding mobile-phone RF exposure was not associated with increased leukemia, non-Hodgkin lymphoma, or thyroid cancer risk in available human observational studies.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
						"Relationship between radiofrequency-electromagnetic radiation from cellular phones and brain tumor: meta-analyses using various proxies for RF-EMR exposure-outcome assessment",
				publisher: "Environmental Health",
				year: 2024,
				url: "https://doi.org/10.1186/s12940-024-01117-8",
				doi: "10.1186/s12940-024-01117-8",
				pmid: "39390576",
				citationStatus: "corrected",
				citationCheckedAt: "2026-07-03T03:31:12.000Z",
				statusSources: ["https://pubmed.ncbi.nlm.nih.gov/39533315/"],
				stance: "debate",
				note:
						"Contrary meta-analysis reporting higher odds in some exposure subcategories; included as debate context because cohort results were less conclusive and the article has a published correction.",
				order: 5
			}
		]
	},
	{
		topicSlug: "science-communication",
		title: "Is radiofrequency radiation from phones and 5G too low-energy to damage DNA directly?",
		slug: "is-radiofrequency-radiation-from-phones-and-5g-too-low-energy-to-damage-dna-directly",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
				"Yes. Radiofrequency radiation used by cell phones, Wi-Fi, Bluetooth, and 5G is non-ionizing, meaning its photons do not carry enough energy to directly ionize atoms or break DNA the way x-rays, radon, or other ionizing radiation can. That does not by itself settle every possible health question, but it rules out a common mechanism claim.",
		stableCore: [
			"Cell-phone and 5G frequencies fall in the non-ionizing part of the electromagnetic spectrum.",
			"Non-ionizing RF exposure does not have enough photon energy to directly damage DNA by ionization.",
			"The consistently recognized biological effect from sufficiently high RF absorption is heating, so safety standards focus heavily on limiting tissue heating."
		],
		openQuestions: [
			"Which non-thermal biological endpoints, if any, are robust enough to matter under real-world exposure levels?",
			"How should public explanations distinguish mechanism plausibility from population outcome evidence without oversimplifying either one?",
			"How should future high-frequency or high-density wireless uses be monitored as exposure patterns change?"
		],
		whatWouldChangeMinds: [
			"Replicated physics and biological evidence showing direct DNA ionization at ordinary RF photon energies.",
			"High-quality studies demonstrating a coherent non-thermal carcinogenic mechanism at exposure levels relevant to public wireless use."
		],
		misconceptions: [
			"All radiation is often treated as one category, even though ionizing and non-ionizing radiation have different energies and mechanisms.",
			"Some people infer that 'cannot directly damage DNA' means no biological effect of any kind is possible.",
			"Others infer that any biological response in a lab proves real-world cancer risk."
		],
		editorSummary:
				"This science-communication page gives readers the mechanism baseline they need before interpreting cell-phone, Wi-Fi, Bluetooth, and 5G health claims.",
		searchCutoffAt: "2026-07-03T03:31:12.000Z",
		lastRetractionCheckAt: "2026-07-03T03:31:12.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:31:12.000Z",
				kind: "publication",
				summary:
						"Initial RF non-ionizing mechanism claim page published from NCI, FDA, and 5G state-of-science review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Cell Phones and Cancer Risk",
				publisher: "National Cancer Institute",
				year: 2024,
				url:
						"https://www.cancer.gov/about-cancer/causes-prevention/risk/radiation/cell-phones-fact-sheet",
				stance: "supports",
				note:
						"NCI explains that 2G through anticipated 5G cell-phone frequencies are non-ionizing and too low in energy to damage DNA directly.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Cell Phones",
				publisher: "U.S. Food and Drug Administration",
				year: 2021,
				url: "https://www.fda.gov/radiation-emitting-products/home-business-and-entertainment-products/cell-phones",
				stance: "supports",
				note:
						"FDA public cell-phone page points readers to ionizing versus non-ionizing RF basics and describes the agency's role in monitoring cell-phone RF evidence.",
				order: 2
			},
			{
				kind: "context",
				title: "5G mobile networks and health-a state-of-the-science review of the research into low-level RF fields above 6 GHz",
				publisher: "Journal of Exposure Science & Environmental Epidemiology",
				year: 2021,
				url: "https://doi.org/10.1038/s41370-021-00297-6",
				doi: "10.1038/s41370-021-00297-6",
				pmid: "33727687",
				stance: "supports",
				note:
						"State-of-the-science review reporting no confirmed evidence that low-level RF fields above 6 GHz, including those relevant to 5G, are hazardous to human health, while calling for better long-term studies.",
				order: 3
			}
		]
	},
	{
		topicSlug: "consensus-foundations",
		title: "Does 'possibly carcinogenic' mean RF radiation is proven to cause cancer?",
		slug: "does-possibly-carcinogenic-mean-rf-radiation-is-proven-to-cause-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
				"No. IARC's 'possibly carcinogenic to humans' category means there was limited evidence or unresolved uncertainty, not proof that ordinary RF exposure causes cancer. It is a hazard-classification signal to keep studying the question, not a direct estimate of everyday consumer risk.",
		stableCore: [
			"IARC classified radiofrequency electromagnetic fields as Group 2B, 'possibly carcinogenic to humans,' in 2011 based on limited evidence.",
			"Group 2B does not mean the same thing as 'known to cause cancer' or even 'probably causes cancer' in real-world exposure settings.",
			"Risk interpretation still needs exposure level, study quality, latency, dose-response, and current synthesis evidence."
		],
		openQuestions: [
			"Will IARC or WHO update the RF classification after newer human, animal, and mechanistic reviews are integrated?",
			"How should public pages explain hazard categories without either dismissing them or treating them as verdicts?",
			"Which precautionary steps are proportionate when the evidence is uncertain but exposure is widespread?"
		],
		whatWouldChangeMinds: [
			"A formal IARC or WHO reassessment changing the RF classification after reviewing newer evidence.",
			"Clearer human dose-response and mechanism evidence showing that ordinary RF exposure either does or does not create a material cancer risk."
		],
		misconceptions: [
			"People often collapse hazard identification and real-world risk into the same thing.",
			"Group 2B is sometimes presented as if it means a proven carcinogen, when it is a lower-certainty category.",
			"Others dismiss the classification entirely instead of treating it as a reason for careful surveillance."
		],
		editorSummary:
				"This page supports source literacy by explaining why a scary-sounding hazard label is not the same as a direct consumer-risk estimate.",
		searchCutoffAt: "2026-07-03T03:31:12.000Z",
		lastRetractionCheckAt: "2026-07-03T03:31:12.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:31:12.000Z",
				kind: "publication",
				summary:
						"Initial RF Group 2B interpretation page published from IARC, WHO, NCI, and current RF cancer-review context."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Non-Ionizing Radiation, Part 2: Radiofrequency Electromagnetic Fields",
				publisher: "IARC Monographs on the Evaluation of Carcinogenic Risks to Humans",
				year: 2013,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK304630/",
				stance: "supports",
				note:
						"IARC monograph source for the Group 2B classification of radiofrequency electromagnetic fields based on limited evidence for carcinogenicity.",
				order: 1
			},
			{
				kind: "context",
				title: "Electromagnetic fields and mobile technology",
				publisher: "World Health Organization",
				url: "https://www.who.int/india/health-topics/electromagnetic-fields",
				stance: "supports",
				note:
						"WHO explainer states that Group 2B is used when a causal association is considered credible but chance, bias, or confounding cannot be ruled out with reasonable confidence.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Cell Phones and Cancer Risk",
				publisher: "National Cancer Institute",
				year: 2024,
				url:
						"https://www.cancer.gov/about-cancer/causes-prevention/risk/radiation/cell-phones-fact-sheet",
				stance: "supports",
				note:
						"NCI provides current public-health context on the IARC monograph, non-ionizing RF exposure, cancer incidence trends, and expert-organization positions.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
						"The effect of exposure to radiofrequency fields on cancer risk in the general and working population: A systematic review of human observational studies - Part I: Most researched outcomes",
				publisher: "Environment International",
				year: 2024,
				url: "https://doi.org/10.1016/j.envint.2024.108983",
				doi: "10.1016/j.envint.2024.108983",
				pmid: "39241333",
				stance: "context",
				note:
						"Current WHO-commissioned synthesis context showing why a 2011 hazard classification should be read alongside newer evidence-review results.",
				order: 4
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Is hearing loss linked to higher dementia risk, and can hearing aids help?",
		slug: "is-hearing-loss-linked-to-higher-dementia-risk-and-can-hearing-aids-help",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
				"Yes. Adult hearing loss is consistently linked with higher risk of cognitive decline and dementia, and treating it is worthwhile for communication, safety, and quality of life. The dementia-prevention claim is narrower: hearing aids should not be sold as a guaranteed way to prevent dementia for everyone, but randomized and observational evidence suggests they may help slow cognitive decline in older adults at higher baseline risk.",
		stableCore: [
			"Large cohort meta-analyses find adult-onset hearing loss associated with later dementia, mild cognitive impairment, and cognitive decline, with risk rising as hearing worsens.",
			"The 2024 Lancet Commission treats hearing loss as a modifiable dementia-risk factor and says evidence that treating hearing loss decreases dementia risk is stronger than in its previous report.",
			"The ACHIEVE randomized trial found no overall 3-year cognitive-change benefit in the full cohort, but prespecified analyses suggested benefit among older adults at higher risk for cognitive decline.",
			"Observational meta-analyses link hearing aids and cochlear implants with lower long-term cognitive-decline hazards, but access, health behavior, baseline risk, and other confounding can still affect those estimates."
		],
		openQuestions: [
			"Which groups gain the most cognitive benefit from hearing intervention, and how do baseline dementia risk, severity, age, adherence, and social isolation change the effect?",
			"How much of the hearing-loss and dementia association is causal versus shared aging, vascular risk, education, measurement bias, or early neurodegenerative change affecting hearing?",
			"Which models of affordable hearing care, over-the-counter hearing aids, cochlear implants, counseling, and follow-up improve uptake and sustained use?"
		],
		whatWouldChangeMinds: [
			"Longer randomized trials showing hearing intervention does or does not reduce incident dementia or cognitive decline across clearly defined risk groups.",
			"Large, well-controlled longitudinal evidence showing the hearing-loss association disappears after better measurement and confounding control.",
			"Major dementia-prevention or audiology guideline reassessments removing hearing loss from modifiable risk-factor frameworks."
		],
		misconceptions: [
			"Hearing aids are sometimes oversold as a guaranteed way to prevent dementia; the intervention evidence is promising but not that broad.",
			"The opposite error treats hearing loss as only an inconvenience, ignoring communication, safety, social participation, and possible cognitive-risk links.",
			"Observational hearing-aid benefits can be inflated if people who get aids also differ in healthcare access, income, education, or other health behaviors."
		],
		editorSummary:
				"This page should give older adults and families a practical middle answer: treat hearing loss because it matters now, and present the dementia-risk evidence as real but still qualified by trial subgroup results and confounding concerns.",
		uncertaintySummary:
				"The association between adult hearing loss and later cognitive outcomes is consistent and moderately strong. Causality and intervention benefit are more qualified: ACHIEVE did not show a total-cohort cognitive benefit over 3 years, while higher-risk subgroups and observational studies suggest possible cognitive protection.",
		searchCutoffAt: "2026-07-03T18:15:00.000Z",
		lastRetractionCheckAt: "2026-07-03T18:15:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T18:15:00.000Z",
				kind: "publication",
				summary:
						"Initial hearing-loss and dementia-risk page published from the 2024 Lancet Commission, NIH/NIDCD context, ACHIEVE randomized-trial evidence, and meta-analyses of cohort and hearing-device evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission",
				publisher: "The Lancet",
				year: 2024,
				url: "https://doi.org/10.1016/S0140-6736(24)01296-0",
				doi: "10.1016/S0140-6736(24)01296-0",
				stance: "supports",
				note:
						"Lancet Commission anchor for hearing loss as a modifiable dementia-risk factor, stronger evidence for treating hearing loss, and particular promise for hearing aids in people with additional dementia-risk factors.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Adult-onset hearing loss and incident cognitive impairment and dementia - A systematic review and meta-analysis of cohort studies",
				publisher: "Ageing Research Reviews",
				year: 2024,
				url: "https://doi.org/10.1016/j.arr.2024.102346",
				doi: "10.1016/j.arr.2024.102346",
				pmid: "38788800",
				stance: "supports",
				note:
						"Meta-analysis of 50 cohort studies found hearing loss associated with incident dementia, MCI, cognitive decline, and Alzheimer disease dementia; each 10 dB worsening was associated with 16% higher dementia risk.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Age-Related Hearing Loss (Presbycusis)",
				publisher: "National Institute on Deafness and Other Communication Disorders",
				year: 2023,
				url: "https://www.nidcd.nih.gov/health/age-related-hearing-loss",
				stance: "supports",
				note:
						"NIDCD public-health anchor for prevalence, daily-life harms, treatment options, over-the-counter hearing aids for mild-to-moderate adult hearing loss, and hearing-health access context.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Hearing intervention versus health education control to reduce cognitive decline in older adults with hearing loss in the USA (ACHIEVE): a multicentre, randomised controlled trial",
				publisher: "The Lancet",
				year: 2023,
				url: "https://doi.org/10.1016/S0140-6736(23)01406-X",
				doi: "10.1016/S0140-6736(23)01406-X",
				pmid: "37478886",
				pmcid: "PMC10529382",
				stance: "context",
				note:
						"ACHIEVE RCT found no significant total-cohort 3-year cognitive benefit, but prespecified analyses suggested slower cognitive change among older adults at higher baseline risk.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Association of Hearing Aids and Cochlear Implants With Cognitive Decline and Dementia: A Systematic Review and Meta-analysis",
				publisher: "JAMA Neurology",
				year: 2022,
				url: "https://doi.org/10.1001/jamaneurol.2022.4427",
				doi: "10.1001/jamaneurol.2022.4427",
				pmid: "36469314",
				pmcid: "PMC9856596",
				stance: "context",
				note:
						"Meta-analysis found hearing-device use associated with lower hazards of long-term cognitive decline and small short-term cognitive-test improvement, while calling for more randomized trials.",
				order: 5
			},
			{
				kind: "context",
				title: "Hearing aids slow cognitive decline in people at high risk",
				publisher: "National Institutes of Health",
				year: 2023,
				url: "https://www.nih.gov/news-events/nih-research-matters/hearing-aids-slow-cognitive-decline-people-high-risk",
				stance: "context",
				note:
						"NIH summary of ACHIEVE explains the no-difference full-cohort result, the nearly 50% slower decline in the higher-risk heart-health cohort, and the recommendation to address hearing for general health and well-being.",
				order: 6
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Is ADHD a common neurodevelopmental disorder that often persists into adulthood?",
		slug: "is-adhd-a-common-neurodevelopmental-disorder-that-often-persists-into-adulthood",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
				"Yes. ADHD is a common neurodevelopmental disorder that begins in childhood, can impair school, work, and relationships, and often continues into adolescence or adulthood. A careful diagnosis still requires persistent symptoms, impairment, and evaluation for other conditions that can look similar.",
		stableCore: [
			"ADHD symptoms start in childhood and can last into adulthood, although the way symptoms show up often changes with age.",
			"Current U.S. parent-survey data estimate that about 7 million children aged 3 to 17, or 11.4%, have ever been diagnosed with ADHD.",
			"Systematic reviews find that childhood ADHD often persists into adulthood, but persistence estimates vary because studies use different diagnostic criteria, impairment thresholds, informants, and follow-up designs."
		],
		openQuestions: [
			"How much of rising diagnosis reflects better recognition, diagnostic drift, service access, school demands, or true prevalence change?",
			"How should clinicians distinguish adult ADHD from anxiety, depression, sleep disorders, substance use, trauma, or other causes of attention problems?",
			"Which supports most improve long-term functioning across school, work, driving, relationships, and co-occurring conditions?"
		],
		whatWouldChangeMinds: [
			"Large representative longitudinal studies showing that carefully diagnosed ADHD does not predict impairment or persistence beyond ordinary development.",
			"A major clinical-guideline reassessment concluding that ADHD is not a valid neurodevelopmental disorder."
		],
		misconceptions: [
			"ADHD is sometimes dismissed as laziness, bad parenting, or normal childhood energy.",
			"Rising diagnosis is sometimes treated as proof that the condition is fake, rather than as a signal that requires careful evaluation and service-quality checks.",
			"A childhood ADHD diagnosis is sometimes assumed to disappear automatically by adulthood."
		],
		editorSummary:
				"This page gives readers a stigma-resistant baseline: ADHD is real and often persistent, while diagnosis still needs careful clinical boundaries.",
		uncertaintySummary:
				"The consensus is strongest for ADHD as a valid and often persistent neurodevelopmental disorder. Estimates of prevalence and adult persistence are less exact because studies differ in diagnostic method, sampling, impairment requirements, and access to evaluation.",
		searchCutoffAt: "2026-07-03T03:41:57.000Z",
		lastRetractionCheckAt: "2026-07-03T03:41:57.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:41:57.000Z",
				kind: "publication",
				summary:
						"Initial ADHD neurodevelopment and persistence page published from CDC, AAP, consensus-statement, and systematic-review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "ADHD in Children",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/adhd/about/index.html",
				stance: "supports",
				note:
						"CDC describes ADHD as one of the most common neurodevelopmental disorders of childhood, with symptoms starting in childhood and often lasting into adulthood.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Data and Statistics on ADHD",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/adhd/data/index.html",
				stance: "supports",
				note:
						"CDC summarizes 2022 U.S. parent-survey data estimating 7 million children aged 3 to 17 have ever been diagnosed with ADHD, while noting variation in diagnosis and treatment estimates.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "The World Federation of ADHD International Consensus Statement: 208 Evidence-based Conclusions about the Disorder",
				publisher: "Neuroscience and Biobehavioral Reviews",
				year: 2021,
				url: "https://doi.org/10.1016/j.neubiorev.2021.01.022",
				doi: "10.1016/j.neubiorev.2021.01.022",
				pmid: "33549739",
				stance: "supports",
				note:
						"International consensus statement curated evidence-based conclusions about ADHD to reduce misconceptions, stigma, and delayed treatment.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "ADHD in children and young people: prevalence, care pathways, and service provision",
				publisher: "The Lancet Psychiatry",
				year: 2018,
				url: "https://doi.org/10.1016/S2215-0366(17)30167-0",
				doi: "10.1016/S2215-0366(17)30167-0",
				pmid: "29033005",
				stance: "supports",
				note:
						"Review reports global community prevalence estimates commonly around 2% to 7% and emphasizes under-recognition, care pathways, and long-term outcome opportunities.",
				order: 4
			},
			{
				kind: "systematic_review",
				title: "Children and adolescents with ADHD followed up to adulthood: a systematic review of long-term outcomes",
				publisher: "Acta Neuropsychiatrica",
				year: 2021,
				url: "https://doi.org/10.1017/neu.2021.23",
				doi: "10.1017/neu.2021.23",
				pmid: "34384511",
				stance: "supports",
				note:
						"Systematic review found ADHD persisted into adulthood with a mean rate of 43%, while also showing why persistence estimates depend on study design and diagnostic approach.",
				order: 5
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do ADHD medications improve symptoms compared with placebo?",
		slug: "do-adhd-medications-improve-symptoms-compared-with-placebo",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 91,
		bottomLine:
				"Yes, especially for short-term core symptoms. Stimulants and several nonstimulants outperform placebo in randomized trials, but medication choice depends on age, side effects, co-occurring conditions, patient and family preferences, and careful monitoring. The evidence is stronger for symptom ratings than for every long-term life outcome.",
		stableCore: [
			"Short-term randomized trials show that several ADHD medications reduce core symptoms more than placebo.",
			"Clinical guidance recommends age-specific care: behavioral therapy first for preschool children, and FDA-approved medication with parent training or classroom supports for many school-age children and adolescents.",
			"Medication is not a character judgment or a cure; dose adjustment and monitoring aim to maximize benefit while keeping side effects tolerable."
		],
		openQuestions: [
			"Which medication or non-medication plan works best for specific subgroups with anxiety, tics, substance-use risk, sleep problems, or cardiovascular concerns?",
			"How well do short-term symptom improvements translate into school, work, driving, relationship, quality-of-life, and injury outcomes over years?",
			"How should treatment systems balance access, diversion prevention, medication shortages, adverse effects, and shared decision-making?"
		],
		whatWouldChangeMinds: [
			"Large, low-bias randomized trials showing no clinically meaningful symptom benefit for stimulant or approved nonstimulant medications compared with placebo.",
			"Long-term safety or effectiveness evidence strong enough to substantially revise guideline recommendations for major patient groups."
		],
		misconceptions: [
			"Some people treat ADHD medication as proof that ADHD is fake or that ordinary child behavior is being chemically controlled.",
			"Others treat medication as a universal fix, when benefit, side effects, dosing, diversion risk, and patient goals all require monitoring.",
			"Short-term symptom efficacy is sometimes overstated as proof that every long-term outcome is solved."
		],
		editorSummary:
				"This page separates the well-supported short-term medication signal from harder questions about individual fit, adverse effects, and long-term functional outcomes.",
		uncertaintySummary:
				"Medication efficacy for short-term symptom reduction is well supported, especially for stimulants. Evidence is thinner and more mixed for long-term patient-important outcomes, head-to-head individualization, and some adult non-medication comparisons.",
		searchCutoffAt: "2026-07-03T03:41:57.000Z",
		lastRetractionCheckAt: "2026-07-03T03:41:57.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:41:57.000Z",
				kind: "publication",
				summary:
						"Initial ADHD medication-efficacy page published from CDC/AAP guidance, NIMH context, and network meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Clinical Care of ADHD in Children",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/adhd/hcp/clinical-care/index.html",
				stance: "supports",
				note:
						"CDC summarizes AAP age-specific treatment recommendations, including parent training and classroom interventions for ages 4 to 6 and FDA-approved medications with behavioral supports for school-age children and adolescents.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Clinical Practice Guideline for the Diagnosis, Evaluation, and Treatment of Attention-Deficit/Hyperactivity Disorder in Children and Adolescents",
				publisher: "Pediatrics",
				year: 2019,
				url: "https://doi.org/10.1542/peds.2019-2528",
				doi: "10.1542/peds.2019-2528",
				pmid: "31570648",
				stance: "supports",
				note:
						"AAP clinical guideline is the main U.S. pediatric anchor for diagnosis, evaluation, age-specific treatment, and dose monitoring.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Attention-Deficit/Hyperactivity Disorder: What You Need to Know",
				publisher: "National Institute of Mental Health",
				url: "https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know",
				stance: "supports",
				note:
						"NIMH summarizes that current treatments may reduce symptoms and improve functioning, that stimulants are highly effective, and that side effects require provider monitoring.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Comparative efficacy and tolerability of medications for attention-deficit hyperactivity disorder in children, adolescents, and adults: a systematic review and network meta-analysis",
				publisher: "The Lancet Psychiatry",
				year: 2018,
				url: "https://doi.org/10.1016/S2215-0366(18)30269-4",
				doi: "10.1016/S2215-0366(18)30269-4",
				pmid: "30097390",
				stance: "supports",
				note:
						"Network meta-analysis of double-blind randomized trials found several medications superior to placebo for short-term ADHD symptoms, with preferred first-choice options differing by age group.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Comparative efficacy and acceptability of pharmacological, psychological, and neurostimulatory interventions for ADHD in adults: a systematic review and component network meta-analysis",
				publisher: "The Lancet Psychiatry",
				year: 2025,
				url: "https://doi.org/10.1016/S2215-0366(24)00360-2",
				doi: "10.1016/S2215-0366(24)00360-2",
				stance: "context",
				note:
						"Adult component network meta-analysis found stimulants and atomoxetine reduced short-term core symptoms versus placebo, while longer-term and quality-of-life evidence remained limited.",
				order: 5
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Are parent training and behavioral therapy effective parts of ADHD treatment?",
		slug: "are-parent-training-and-behavioral-therapy-effective-parts-of-adhd-treatment",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
				"Yes, especially as part of age-appropriate, multimodal care. Parent training in behavior management is recommended first for young children with ADHD and remains an important support for older children. The strongest evidence is for parenting skills, disruptive behavior, family functioning, and some child outcomes; claims about core ADHD symptom reduction need more caveats.",
		stableCore: [
			"CDC and AAP recommend parent training in behavior management and classroom interventions as first-line treatment for children aged 4 to 6 with ADHD.",
			"For school-age children and adolescents, medication is often paired with parent training, classroom interventions, school supports, or other behavioral strategies.",
			"Meta-analyses show benefits for parenting outcomes, behavior problems, and some longer-term child outcomes, while blinded evidence for core symptom reduction is more mixed."
		],
		openQuestions: [
			"Which behavioral components, delivery formats, booster sessions, and school integrations sustain benefits best?",
			"How can systems improve access for families facing cost, transportation, language, stigma, parent ADHD, or shortage barriers?",
			"Which outcomes should be prioritized: core symptoms, conduct problems, parent-child relationship quality, academic functioning, family stress, or long-term quality of life?"
		],
		whatWouldChangeMinds: [
			"Large, well-blinded trials showing no benefit of structured parent training or classroom behavioral interventions on meaningful child or family outcomes.",
			"Clinical guideline updates replacing parent training with better-supported first-line psychosocial approaches for young children."
		],
		misconceptions: [
			"Behavioral parent training is sometimes dismissed as fluff because it is not medication.",
			"Parent training is sometimes misunderstood as blaming parents for causing ADHD.",
			"Behavior therapy is sometimes oversold as a stand-alone cure for all children, even though many children need combined supports."
		],
		editorSummary:
				"This treatment page gives families a practical middle path: parent training is evidence-based and useful, but it should not be framed as blame or as a universal replacement for medication.",
		uncertaintySummary:
				"Evidence is strongest for parenting practices, conduct problems, and family functioning, with some supportive longer-term child findings. Effects on blinded core ADHD symptom ratings vary more by study design, rater, age, and intervention package.",
		searchCutoffAt: "2026-07-03T03:41:57.000Z",
		lastRetractionCheckAt: "2026-07-03T03:41:57.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:41:57.000Z",
				kind: "publication",
				summary:
						"Initial ADHD parent-training and behavioral-therapy page published from CDC/AAP guidance and behavioral-intervention meta-analyses."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Parent Training in Behavior Management",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/adhd/treatment/behavior-therapy.html",
				stance: "supports",
				note:
						"CDC describes behavior therapy as effective for ADHD, especially in young children when delivered by parents, and summarizes the skills taught in parent training.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Clinical Care of ADHD in Children",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/adhd/hcp/clinical-care/index.html",
				stance: "supports",
				note:
						"CDC summarizes AAP recommendations that parent training and classroom interventions are first-line for ages 4 to 6 and part of treatment for many older children and adolescents.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Clinical Practice Guideline for the Diagnosis, Evaluation, and Treatment of Attention-Deficit/Hyperactivity Disorder in Children and Adolescents",
				publisher: "Pediatrics",
				year: 2019,
				url: "https://doi.org/10.1542/peds.2019-2528",
				doi: "10.1542/peds.2019-2528",
				pmid: "31570648",
				stance: "supports",
				note:
						"AAP clinical guideline is the main U.S. pediatric anchor for age-specific behavioral therapy and combined treatment recommendations.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Meta-analysis: Which Components of Parent Training Work for Children With Attention-Deficit/Hyperactivity Disorder?",
				publisher: "Journal of the American Academy of Child and Adolescent Psychiatry",
				year: 2022,
				url: "https://doi.org/10.1016/j.jaac.2021.06.015",
				doi: "10.1016/j.jaac.2021.06.015",
				pmid: "34224837",
				stance: "supports",
				note:
						"Meta-analysis found robust small-to-medium positive effects of parent training on parental outcomes and examined which behavioral components were associated with benefit.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Sustained improvements by behavioural parent training for children with attention-deficit/hyperactivity disorder: A meta-analytic review of longer-term child and parental outcomes",
				publisher: "JCPP Advances",
				year: 2023,
				url: "https://doi.org/10.1002/jcv2.12196",
				doi: "10.1002/jcv2.12196",
				stance: "supports",
				note:
						"Longer-term meta-analysis reported small-to-moderate benefits for children's ADHD symptoms and behavior problems as well as parenting and relationship outcomes at follow-up.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Behavioral interventions in attention-deficit/hyperactivity disorder: a meta-analysis of randomized controlled trials across multiple outcome domains",
				publisher: "Journal of the American Academy of Child and Adolescent Psychiatry",
				year: 2014,
				url: "https://doi.org/10.1016/j.jaac.2014.05.013",
				doi: "10.1016/j.jaac.2014.05.013",
				pmid: "25062591",
				stance: "context",
				note:
						"Meta-analysis supports benefits for parenting and conduct problems while cautioning that blinded evidence for core ADHD symptom decreases was less clear.",
				order: 6
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Are PFAS ('forever chemicals') harmful to human health, and what do drinking-water limits try to prevent?",
		slug: "are-pfas-forever-chemicals-harmful-to-human-health-and-what-do-drinking-water-limits-try-to-prevent",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
				"Broadly, yes for several well-studied PFAS, but the answer is compound-, dose-, duration-, and outcome-specific. Public-health agencies link PFAS exposure with several health outcomes and use drinking-water limits to reduce long-term population exposure. Detection alone does not predict an individual's disease, and regulatory limits combine health evidence with monitoring, treatment, cost, legal, and implementation constraints.",
		stableCore: [
			"ATSDR and the National Academies identify health outcomes associated with PFAS exposure, including dyslipidemia, lower vaccine antibody response, decreased fetal or infant growth, and kidney cancer for some evidence categories.",
			"EPA finalized a 2024 national drinking-water rule for six PFAS, with enforceable limits including 4 ppt for PFOA and PFOS and health goals of zero for those two compounds.",
			"As of May 2026, EPA has proposed to uphold PFOA and PFOS limits while reconsidering or rescinding several other PFAS limits, so current regulatory status and the underlying health evidence should be tracked separately."
		],
		openQuestions: [
			"Which health effects are best understood for individual PFAS versus mixtures or the broader class?",
			"How should regulators handle replacement PFAS and mixtures when human outcome data are thinner than for PFOA and PFOS?",
			"How should public guidance distinguish individual clinical risk from population-level exposure reduction?"
		],
		whatWouldChangeMinds: [
			"Large, independent human evidence syntheses showing that the better-studied PFAS are not associated with the key health outcomes after robust confounding control.",
			"Major ATSDR, National Academies, EPA, or comparable international reassessments reversing the current health-evidence categories.",
			"Stronger mixture and replacement-PFAS evidence showing that today's compound-specific risk assumptions are materially wrong."
		],
		misconceptions: [
			"PFAS detection is sometimes treated as proof that an individual is already sick or will become sick.",
			"PFAS blood testing is sometimes misunderstood as a diagnostic test that predicts future disease, even though ATSDR says results do not provide treatment information or predict future health problems.",
			"All PFAS are sometimes treated as identical, even though persistence, mobility, exposure, evidence strength, and toxicity differ by compound."
		],
		editorSummary:
				"This page should help readers separate real health concern from vague toxin language. The consensus answer is broad and qualified: several PFAS are linked to important outcomes and justify exposure reduction, but individual prediction and compound-specific regulation remain more complicated.",
		uncertaintySummary:
				"Evidence is strongest for several outcomes and older, well-studied PFAS such as PFOA and PFOS. Uncertainty remains around mixtures, newer replacement PFAS, causal mechanisms for every endpoint, and how evolving federal rules will treat compounds beyond PFOA and PFOS.",
		searchCutoffAt: "2026-07-03T03:57:42.000Z",
		lastRetractionCheckAt: "2026-07-03T03:57:42.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:57:42.000Z",
				kind: "publication",
				summary:
						"Initial PFAS health and drinking-water-limits page published from EPA, ATSDR, National Academies, and PFAS health-outcome synthesis evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Per- and Polyfluoroalkyl Substances (PFAS)",
				publisher: "U.S. Environmental Protection Agency",
				year: 2026,
				url: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
				stance: "supports",
				note:
						"EPA regulatory anchor for the 2024 drinking-water rule, 4 ppt enforceable limits for PFOA and PFOS, and the May 2026 proposed-rule context that may change several other PFAS limits.",
				order: 1
			},
			{
				kind: "guideline",
				title: "PFAS Information for Clinicians - 2024",
				publisher: "Agency for Toxic Substances and Disease Registry",
				year: 2024,
				url: "https://www.atsdr.cdc.gov/pfas/hcp/clinical-overview/index.html",
				stance: "supports",
				note:
						"ATSDR clinical anchor listing potentially associated health effects and explaining why exposure history, exposure reduction, and careful interpretation of PFAS blood testing matter.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Health Effects: PFAS Information for Clinicians - 2024",
				publisher: "Agency for Toxic Substances and Disease Registry",
				year: 2024,
				url: "https://www.atsdr.cdc.gov/pfas/hcp/clinical-overview/health-effects.html",
				stance: "supports",
				note:
						"ATSDR health-effects table summarizes evidence-of-association categories while warning that causality and clinical magnitude are not established for every endpoint.",
				order: 3
			},
			{
				kind: "consensus_statement",
				title: "Guidance on PFAS Exposure, Testing, and Clinical Follow-Up",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2022,
				url: "https://doi.org/10.17226/26156",
				doi: "10.17226/26156",
				stance: "supports",
				note:
						"Consensus report categorizing evidence strength for PFAS-associated outcomes, including sufficient evidence for decreased antibody response, dyslipidemia, decreased infant and fetal growth, and kidney cancer.",
				order: 4
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Are PFAS exposures linked to higher cholesterol and reduced vaccine antibody response?",
		slug: "are-pfas-exposures-linked-to-higher-cholesterol-and-reduced-vaccine-antibody-response",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		bottomLine:
				"Yes, these are among the better-supported PFAS-associated human health signals, but they are associations rather than a simple individual prediction. The National Academies judged evidence sufficient for dyslipidemia and decreased antibody response, and meta-analyses support links between several PFAS and total or LDL cholesterol and between PFOA, PFOS, PFHxS and lower vaccine antibody concentrations. Effect sizes are usually modest and vary by compound, age, vaccine, exposure history, and study design.",
		stableCore: [
			"The National Academies classified dyslipidemia and decreased antibody response as sufficient-evidence associations for PFAS exposure.",
			"An adult lipid meta-analysis found PFOA and PFOS associated with higher total and LDL cholesterol, while evidence for cardiovascular-event consequences remains less direct.",
			"A vaccine-response meta-analysis found inverse associations across multiple antibodies, with stronger support for PFOA, PFOS, and PFHxS than for PFNA or PFDA."
		],
		openQuestions: [
			"How much of the cholesterol association is causal, and how much is affected by toxicokinetics, diet, kidney function, or other confounding?",
			"What clinical significance should be assigned to modest antibody-concentration changes for specific vaccines and age groups?",
			"How should evidence from older PFAS apply to replacement PFAS and real-world mixtures?"
		],
		whatWouldChangeMinds: [
			"High-quality prospective or quasi-experimental evidence showing that PFAS reduction does not change lipid or vaccine-response outcomes in expected directions.",
			"Large updated systematic reviews showing that the observed cholesterol or vaccine-response associations disappear after better exposure measurement and confounding control.",
			"Major National Academies, ATSDR, or equivalent reassessments downgrading these outcomes from the current evidence categories."
		],
		misconceptions: [
			"Any PFAS exposure is sometimes treated as meaning imminent disease, even though these are probabilistic population signals.",
			"No symptoms are sometimes taken to mean no biological effect, even for outcomes like cholesterol or antibody concentration that require measurement.",
			"A PFAS blood result is sometimes interpreted as a personalized forecast of future illness, which ATSDR explicitly cautions against."
		],
		editorSummary:
				"This page gives concrete examples of what PFAS evidence does and does not show. It should avoid vague alarm while making clear that cholesterol and vaccine antibody response are not fringe concerns.",
		uncertaintySummary:
				"The association signal is broad but not a one-size-fits-all causal prediction. Remaining uncertainty involves compound specificity, mixtures, life stage, vaccine type, clinical magnitude, and whether lipid changes translate into cardiovascular outcomes.",
		searchCutoffAt: "2026-07-03T03:57:42.000Z",
		lastRetractionCheckAt: "2026-07-03T03:57:42.000Z",
		changeLog: [
			{
				date: "2026-07-03T03:57:42.000Z",
				kind: "publication",
				summary:
						"Initial PFAS cholesterol and vaccine-antibody page published from National Academies, ATSDR, and human meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Guidance on PFAS Exposure, Testing, and Clinical Follow-Up",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2022,
				url: "https://doi.org/10.17226/26156",
				doi: "10.17226/26156",
				stance: "supports",
				note:
						"Consensus anchor classifying dyslipidemia and decreased antibody response as sufficient-evidence associations for PFAS exposure.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Health Effects: PFAS Information for Clinicians - 2024",
				publisher: "Agency for Toxic Substances and Disease Registry",
				year: 2024,
				url: "https://www.atsdr.cdc.gov/pfas/hcp/clinical-overview/health-effects.html",
				stance: "supports",
				note:
						"ATSDR summarizes evidence-of-association findings for cholesterol increases and lower antibody response to some vaccines while preserving caveats about causality and magnitude.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Associations between Per- and Polyfluoroalkyl Substances Exposures and Blood Lipid Levels among Adults-A Meta-Analysis",
				publisher: "Environmental Health Perspectives",
				year: 2023,
				url: "https://doi.org/10.1289/EHP11840",
				doi: "10.1289/EHP11840",
				pmid: "37141244",
				stance: "supports",
				note:
						"Meta-analysis of 29 publications found PFOA and PFOS significantly associated with higher total cholesterol and LDL cholesterol in adults, with cardiovascular-event implications still uncertain.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Systematic review and meta-analysis of epidemiologic data on vaccine response in relation to exposure to five principal perfluoroalkyl substances",
				publisher: "Environment International",
				year: 2023,
				url: "https://doi.org/10.1016/j.envint.2023.107734",
				doi: "10.1016/j.envint.2023.107734",
				pmid: "36764183",
				stance: "supports",
				note:
						"Meta-analysis of 14 reports from 13 unique groups found inverse associations between serum PFAS and vaccine antibody concentrations, with stronger support for PFOA, PFOS, and PFHxS.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title: "Childhood PFAS exposure and immunotoxicity: a systematic review and meta-analysis of human studies",
				publisher: "Systematic Reviews",
				year: 2024,
				url: "https://doi.org/10.1186/s13643-024-02596-z",
				doi: "10.1186/s13643-024-02596-z",
				pmid: "38982538",
				stance: "context",
				note:
						"Recent child-focused synthesis adds caution: it found suggestive infection evidence and small antibody-response decreases, but moderate to no evidence for antibody titer reduction in its narrower analysis.",
				order: 5
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Should individuals get PFAS blood testing, and does it change medical care?",
		slug: "should-individuals-get-pfas-blood-testing-and-does-it-change-medical-care",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 64,
		evidenceCertainty: "low",
		bottomLine:
			"Sometimes, but it is not a general screening test for everyone. PFAS blood testing can be useful for people with likely elevated exposure, especially when results could guide exposure reduction or follow-up. But the test does not identify the exposure source, does not diagnose a current illness, does not predict a person's future health outcome, and there is no approved medical treatment that removes PFAS from the body.",
		stableCore: [
			"ATSDR says clinicians can consider PFAS testing based on exposure history, other environmental testing results, and whether results can inform exposure reduction or health promotion.",
			"National Academies guidance recommends offering testing to people likely to have elevated exposure, with shared discussion of benefits, harms, social implications, and limitations.",
			"NASEM proposes interpreting the serum or plasma sum of specified PFAS at less than 2 ng/mL, 2 to less than 20 ng/mL, and 20 ng/mL or higher, with more clinical follow-up at higher levels.",
			"Testing is exposure information, not a diagnosis: ATSDR says PFAS blood results do not identify sources, attribute current illness, or predict future health outcomes."
		],
		openQuestions: [
			"Which people benefit most from individual testing versus community-wide exposure assessment and water or source testing?",
			"Which follow-up screenings improve outcomes rather than adding anxiety, cost, false positives, or inequitable access?",
			"How should clinical thresholds change as evidence develops for additional PFAS, mixtures, children, pregnant people, and replacement chemicals?"
		],
		whatWouldChangeMinds: [
			"Evidence that PFAS blood testing routinely changes management and improves health outcomes across broad low-exposure populations.",
			"Major ATSDR or National Academies guidance withdrawing serum or plasma testing for likely elevated exposure groups.",
			"Validated treatments that safely reduce PFAS body burden and make testing more directly actionable."
		],
		misconceptions: [
			"A PFAS blood number is sometimes treated as a personal prediction of future disease.",
			"Testing is sometimes framed as either always necessary or always useless, when current guidance is exposure-history dependent.",
			"People sometimes expect a blood test to identify the source of exposure, even though blood results alone cannot do that."
		],
		editorSummary:
			"This page should be practical and non-alarmist: PFAS testing can matter for likely elevated exposure, but readers need to understand what the number can and cannot do before seeking individual testing.",
		uncertaintySummary:
			"The guidance is actionable but still incomplete. Evidence supports testing for likely elevated exposure and clinical interpretation tiers, while outcome benefit, repeat-testing intervals, equity, and care pathways remain unsettled.",
		searchCutoffAt: "2026-07-03T04:47:09.000Z",
		lastRetractionCheckAt: "2026-07-03T04:47:09.000Z",
		changeLog: [
			{
				date: "2026-07-03T04:47:09.000Z",
				kind: "publication",
				summary:
					"Initial PFAS blood-testing page published from ATSDR clinical guidance, National Academies testing recommendations, and serum-assay literature."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Clinical Evaluation and Management: PFAS Information for Clinicians - 2024",
				publisher: "Agency for Toxic Substances and Disease Registry",
				year: 2024,
				url: "https://www.atsdr.cdc.gov/pfas/hcp/clinical-overview/clinical-evaluation-management.html",
				stance: "supports",
				note:
					"ATSDR clinical anchor explaining exposure-history assessment, testing considerations, testing limitations, lack of approved PFAS-removal treatment, and management based on usual preventive care plus NASEM thresholds.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Guidance on PFAS Exposure, Testing, and Clinical Follow-Up",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2022,
				url: "https://doi.org/10.17226/26156",
				doi: "10.17226/26156",
				stance: "supports",
				note:
					"Consensus report recommending testing discussions for likely elevated exposure and serum/plasma interpretation tiers of less than 2, 2 to less than 20, and 20 ng/mL or higher for the sum of specified PFAS.",
				order: 2
			},
			{
				kind: "context",
				title: "Development, validation, and clinical assessment of a liquid chromatography-tandem mass spectrometry serum assay for per- and polyfluoroalkyl substances (PFAS) recommended by the National Academies of Science, Engineering, and Medicine (NASEM)",
				publisher: "Analytical and Bioanalytical Chemistry",
				year: 2024,
				url: "https://doi.org/10.1007/s00216-024-05519-y",
				doi: "10.1007/s00216-024-05519-y",
				pmid: "39269501",
				stance: "context",
				note:
					"Validated a serum/plasma LC-MS/MS assay aligned with NASEM analytes and found 82.2% of 1023 specimens between 2 and less than 20 ng/mL and 2.5% at 20 ng/mL or higher.",
				order: 3
			}
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		title: "Does glyphosate cause cancer in humans?",
		slug: "does-glyphosate-cause-cancer-in-humans",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 68,
		evidenceCertainty: "low",
		bottomLine:
			"The honest answer is disputed and exposure-specific. IARC classifies glyphosate as probably carcinogenic to humans as a hazard judgment, based on limited human non-Hodgkin lymphoma evidence plus animal and mechanistic evidence. EPA, EFSA/ECHA, and JMPR do not classify glyphosate as likely to cause cancer under regulatory risk-assessment frameworks for approved uses or dietary exposure. Human studies are mixed: some high-exposure meta-analyses report higher non-Hodgkin lymphoma risk, while the large Agricultural Health Study and later meta-analyses do not show a clear overall association.",
		stableCore: [
			"IARC's Group 2A classification is a hazard classification, not a direct estimate of consumer or dietary risk.",
			"EPA says its withdrawn 2020 interim decision does not automatically invalidate its longstanding not-likely-carcinogenic finding while the agency updates its carcinogenicity explanation after the Ninth Circuit decision.",
			"EFSA's 2023 peer review did not identify critical areas of concern, and ECHA did not classify glyphosate as carcinogenic, mutagenic, or toxic for reproduction under EU criteria.",
			"JMPR concluded glyphosate is unlikely to pose a carcinogenic risk through dietary exposure, while acknowledging occupational non-Hodgkin lymphoma evidence and high-dose animal uncertainty.",
			"The direct human epidemiology is mixed: Zhang 2019 reported increased non-Hodgkin lymphoma risk in highest-exposure groups, while Andreotti 2018 and Boffetta 2021 did not find a clear overall non-Hodgkin lymphoma association."
		],
		openQuestions: [
			"How should assessments weigh occupational exposure to glyphosate-based formulations against dietary exposure to glyphosate residues?",
			"Do subtype-specific signals such as diffuse large B-cell lymphoma, follicular lymphoma, or acute myeloid leukemia persist in larger prospective cohorts with better exposure measurement?",
			"How much should public-domain mechanistic evidence, unpublished regulatory toxicology, formulation studies, and registrant studies each count in hazard and risk decisions?"
		],
		whatWouldChangeMinds: [
			"Large prospective cohorts or pooled analyses with measured exposure and formulation data showing a consistent dose-response for lymphoma subtypes or acute myeloid leukemia after latency and other-pesticide confounding are addressed.",
			"A major IARC, EPA, EFSA/ECHA, or JMPR reassessment aligning hazard and risk conclusions after reviewing newer epidemiology and mechanistic evidence.",
			"Mechanistic and animal evidence demonstrating either robust human-relevant carcinogenic pathways at approved-use exposures or explaining positive signals as non-causal."
		],
		misconceptions: [
			"IARC Group 2A is sometimes misread as proof that ordinary food residues or home exposure cause cancer.",
			"Regulatory non-carcinogenic classifications are sometimes misread as proof that occupational and formulation questions are fully closed.",
			"Glyphosate and glyphosate-based formulations are sometimes treated as identical exposures even though co-formulants and use patterns can matter.",
			"Court verdicts, bans, and regulatory approvals are sometimes treated as substitutes for evidence synthesis."
		],
		misconceptionTags: [
			"hazard-is-not-the-same-as-risk",
			"mechanism-is-not-real-world-effect",
			"false-balance-misleads",
			"correlation-isnt-causation",
			"cherry-picking-distorts-the-evidence"
		],
		editorSummary:
			"This page should explain why credible bodies disagree without flattening the answer into either 'safe' or 'proven carcinogen.' Keep hazard classification, dietary risk, occupational formulation exposure, and cancer-subtype evidence separate.",
		uncertaintySummary:
			"Confidence is moderate that the disagreement is real and framework-dependent, but low for the exact cancer risk from high occupational or formulation exposure. Evidence is split by hazard versus risk framing, exposure scenario, latency, cancer-subtype definition, and study design.",
		uncertaintyDrivers: [
			{
				type: "inconsistency",
				detail: "Institutional hazard-identification and regulatory risk-assessment frameworks answer related but different questions."
			},
			{
				type: "bias",
				detail: "Human studies can be affected by exposure recall, applicator selection, latency choices, and other-pesticide confounding."
			},
			{
				type: "imprecision",
				detail: "Subtype-specific estimates often have wide confidence intervals and fewer highly exposed cases."
			},
			{
				type: "indirectness",
				detail: "Dietary residues, occupational use, and glyphosate-based formulations are not the same exposure scenario."
			}
		],
		searchDatabases: ["PubMed", "OpenAlex", "Crossref", "IARC/EPA/EFSA/JMPR assessments"],
		searchCutoffAt: "2026-07-03T19:21:12.000Z",
		inclusionRules: [
			"Prioritize IARC, EPA, EFSA/ECHA, JMPR, large prospective cohorts, pooled analyses, and systematic reviews or meta-analyses of glyphosate and cancer.",
			"Separate hazard-identification sources from regulatory risk assessments and from dietary-exposure conclusions.",
			"Track whether studies assess glyphosate alone, glyphosate-based formulations, occupational use, or dietary residues."
		],
		exclusionRules: [
			"Do not treat court verdicts, advocacy summaries, or product labels as primary evidence for carcinogenicity.",
			"Do not combine all pesticide exposure with glyphosate-specific exposure unless the source reports glyphosate separately.",
			"Do not infer consumer dietary risk directly from high-dose animal, cell, or occupational-formulation studies."
		],
		institutionalAnchors: [
			{ name: "IARC", role: "Hazard-identification anchor for carcinogenicity classification" },
			{ name: "U.S. Environmental Protection Agency", role: "U.S. regulatory risk-assessment and registration-review anchor" },
			{ name: "EFSA / ECHA", role: "European peer-review and hazard-classification anchor" },
			{ name: "JMPR", role: "Joint FAO/WHO dietary-exposure risk-assessment anchor" }
		],
		lastRetractionCheckAt: "2026-07-03T19:21:12.000Z",
		changeLog: [
			{
				date: "2026-07-03T19:21:12.000Z",
				kind: "publication",
				summary:
					"Initial glyphosate cancer page published from IARC, EPA, EFSA/ECHA, JMPR, Agricultural Health Study, meta-analysis, and mechanistic-review sources."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "IARC Monographs Volume 112: evaluation of five organophosphate insecticides and herbicides",
				publisher: "International Agency for Research on Cancer",
				year: 2015,
				url: "https://www.iarc.who.int/featured-news/media-centre-iarc-news-glyphosate/",
				stance: "debate",
				note:
					"IARC classified glyphosate as probably carcinogenic to humans, citing limited human evidence, sufficient animal evidence, and strong mechanistic evidence of genotoxicity.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Glyphosate",
				publisher: "U.S. Environmental Protection Agency",
				year: 2026,
				url: "https://www.epa.gov/ingredients-used-pesticide-products/glyphosate",
				stance: "context",
				note:
					"EPA says it is updating the carcinogenicity explanation after the Ninth Circuit decision while maintaining that glyphosate is not likely carcinogenic to humans based on current evidence.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Glyphosate: no critical areas of concern; data gaps identified",
				publisher: "European Food Safety Authority",
				year: 2023,
				url: "https://www.efsa.europa.eu/en/news/glyphosate-no-critical-areas-concern-data-gaps-identified",
				stance: "context",
				note:
					"EFSA's peer review found no critical areas of concern and used ECHA's conclusion that glyphosate did not meet EU criteria for carcinogenic classification, while noting data gaps.",
				order: 3
			},
			{
				kind: "consensus_statement",
				title: "Joint FAO/WHO Meeting on Pesticide Residues: Summary Report, May 2016",
				publisher: "Joint FAO/WHO Meeting on Pesticide Residues",
				year: 2016,
				url: "https://www.fao.org/fileadmin/templates/agphome/documents/Pests_Pesticides/JMPR/2016_JMPR_Summary_Special.pdf",
				stance: "context",
				note:
					"JMPR concluded glyphosate is unlikely to pose a carcinogenic risk to humans through dietary exposure, despite some occupational and high-dose animal uncertainty.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Glyphosate Use and Cancer Incidence in the Agricultural Health Study",
				publisher: "Journal of the National Cancer Institute",
				year: 2018,
				url: "https://doi.org/10.1093/jnci/djx233",
				doi: "10.1093/jnci/djx233",
				stance: "context",
				note:
					"Large prospective applicator cohort reported no statistically significant association with cancer at any site or with non-Hodgkin lymphoma overall, while noting an AML signal needing confirmation.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Exposure to Glyphosate-Based Herbicides and Risk for Non-Hodgkin Lymphoma: A Meta-Analysis and Supporting Evidence",
				publisher: "Mutation Research/Reviews in Mutation Research",
				year: 2019,
				url: "https://doi.org/10.1016/j.mrrev.2019.02.001",
				doi: "10.1016/j.mrrev.2019.02.001",
				pmid: "31342895",
				stance: "debate",
				note:
					"Meta-analysis reported a higher non-Hodgkin lymphoma risk among high-exposure groups, with a meta-relative risk of 1.41 and a 95% confidence interval of 1.13 to 1.75.",
				order: 6
			},
			{
				kind: "meta_analysis",
				title: "Exposure to glyphosate and risk of Non-Hodgkin lymphoma: an updated meta-analysis",
				publisher: "La Medicina del Lavoro",
				year: 2021,
				url: "https://doi.org/10.23749/mdl.v112i3.11123",
				doi: "10.23749/mdl.v112i3.11123",
				pmid: "34142676",
				stance: "context",
				note:
					"Updated meta-analysis did not find a clear overall non-Hodgkin lymphoma association but reported that a diffuse large B-cell lymphoma signal could not be ruled out.",
				order: 7
			},
			{
				kind: "systematic_review",
				title: "Mapping the key characteristics of carcinogens for glyphosate and its formulations: a systematic review",
				publisher: "Chemosphere",
				year: 2023,
				url: "https://doi.org/10.1016/j.chemosphere.2023.139572",
				doi: "10.1016/j.chemosphere.2023.139572",
				pmid: "37474029",
				stance: "debate",
				note:
					"Mechanistic systematic review found evidence supporting key carcinogen characteristics, especially genotoxicity and endocrine disruption, relevant to hazard plausibility.",
				order: 8
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title:
			"Are microplastics in drinking water proven to cause human health harms at current exposure levels?",
		slug: "are-microplastics-in-drinking-water-proven-to-cause-human-health-harms-at-current-exposure-levels",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 73,
		evidenceCertainty: "low",
		bottomLine:
			"No. Microplastics have been detected in tap and bottled drinking water, but current evidence does not prove that levels found in drinking water cause human health harms. That is not the same as proving they are safe. The honest consensus is precautionary: reduce plastic pollution, improve measurement methods, and keep studying exposure, smaller particles, additives, and plausible toxic effects.",
		stableCore: [
			"WHO's drinking-water technical report examined occurrence, possible health impacts, treatment removal, and key knowledge gaps rather than declaring the issue settled.",
			"FDA says the current scientific evidence does not demonstrate that levels of microplastics or nanoplastics in water pose a human-health risk, and that presence alone does not indicate risk.",
			"Systematic-review evidence finds microplastics in drinking water, but reported concentrations vary widely because sampling, size cutoffs, quality controls, and polymer-identification methods differ across studies.",
			"The absence of proven harm at current detected levels should be kept separate from the broader case for reducing plastic waste and improving exposure science."
		],
		openQuestions: [
			"What are realistic human exposures to very small microplastics and nanoplastics from tap water, bottled water, beverages, food, dust, and air combined?",
			"Which particle sizes, shapes, polymer types, additives, or co-contaminants matter most for biological effects?",
			"What standardized analytical methods should regulators use before setting health-based drinking-water thresholds?"
		],
		whatWouldChangeMinds: [
			"Robust human epidemiology linking current drinking-water microplastic exposure to specific health outcomes with dose-response evidence.",
			"Validated toxicology showing adverse effects at exposure levels comparable to real-world drinking-water intake.",
			"Major WHO, FDA, EPA, or comparable reassessment concluding that current drinking-water levels require health-based limits."
		],
		misconceptions: [
			"Detection in water is sometimes treated as proof that the water is unsafe to drink.",
			"Low-certainty risk language is sometimes misread as proof that microplastics are harmless.",
			"High-dose animal, cell, or modeled studies are sometimes treated as direct evidence of harm from typical drinking-water exposure."
		],
		editorSummary:
			"This page should resist both panic and dismissal. The best answer is that harm at current drinking-water levels is not proven, while the research gaps and pollution-reduction rationale are real.",
		uncertaintySummary:
			"Evidence certainty is low because exposure measurement is inconsistent, nanoplastics are difficult to quantify, human outcome evidence is sparse, and toxicology often uses particles or doses that do not map cleanly onto real drinking-water exposure.",
		searchCutoffAt: "2026-07-03T04:47:09.000Z",
		lastRetractionCheckAt: "2026-07-03T04:47:09.000Z",
		changeLog: [
			{
				date: "2026-07-03T04:47:09.000Z",
				kind: "publication",
				summary:
					"Initial drinking-water microplastics evidence-boundary page published from WHO, FDA, and systematic-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Microplastics in drinking-water",
				publisher: "World Health Organization",
				year: 2019,
				url: "https://www.who.int/publications/i/item/9789241516198",
				stance: "supports",
				note:
					"WHO technical document examining occurrence in treated tap and bottled water, potential health impacts, treatment removal, management recommendations, and key knowledge gaps.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Microplastics and Nanoplastics in Foods",
				publisher: "U.S. Food and Drug Administration",
				year: 2024,
				url: "https://www.fda.gov/food/environmental-contaminants-food/microplastics-and-nanoplastics-foods",
				stance: "supports",
				note:
					"FDA source stating that current evidence does not demonstrate that levels found in water pose a human-health risk and that presence alone does not indicate risk.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Microplastic contamination of drinking water: A systematic review",
				publisher: "PLOS ONE",
				year: 2020,
				url: "https://doi.org/10.1371/journal.pone.0236838",
				doi: "10.1371/journal.pone.0236838",
				pmid: "32735575",
				stance: "context",
				note:
					"Systematic review of 12 drinking-water studies found common contamination but high heterogeneity, methodological variability, and a need for standardized protocols.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Microplastics in drinking water: A review on methods, occurrence, sources, and potential risks assessment",
				publisher: "Environmental Pollution",
				year: 2024,
				url: "https://doi.org/10.1016/j.envpol.2024.123857",
				doi: "10.1016/j.envpol.2024.123857",
				pmid: "38537794",
				stance: "context",
				note:
					"Recent review found widespread detection with large concentration variation and emphasized standardized sampling and analysis, especially for smaller particles and nanoplastics.",
				order: 4
			}
		]
	},
	{
		topicSlug: "consensus-foundations",
		title: "Does the presence of microplastics in food automatically mean it is unsafe to eat?",
		slug: "does-the-presence-of-microplastics-in-food-automatically-mean-it-is-unsafe-to-eat",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 76,
		evidenceCertainty: "low",
		bottomLine:
			"No. Finding microplastics or nanoplastics in a food does not automatically mean that food is unsafe to eat. Food-safety risk depends on exposure amount, particle size, polymer type, additives or co-contaminants, dose, route, and biological effect. Current evidence does not demonstrate that levels detected in foods pose a human-health risk, but the evidence is incomplete enough that agencies still call for better methods, monitoring, and toxicology.",
		stableCore: [
			"FDA states that the presence of environmentally derived microplastics or nanoplastics in food alone does not indicate risk or violate FDA regulations unless it creates a health concern.",
			"FDA also says current scientific evidence does not demonstrate that levels detected in foods pose a human-health risk, while emphasizing research gaps.",
			"EFSA identifies major uncertainties, lack of standardized methods, and the need to assess potential health risks from dietary micro- and nanoplastics.",
			"Risk assessment requires both exposure and hazard information; mere detection is a starting point for evaluation, not the conclusion."
		],
		openQuestions: [
			"Which foods contribute most to total microplastic and nanoplastic exposure after accounting for realistic consumption patterns and measurement quality?",
			"How should risk assessment handle nanoplastics, additives, adsorbed contaminants, and possible effects in the gastrointestinal tract?",
			"What validated methods can reliably compare microplastic levels across complex food matrices?"
		],
		whatWouldChangeMinds: [
			"Strong human or toxicological evidence showing that typical dietary levels of specific particles cause measurable harm.",
			"Validated exposure assessments showing much higher real-world intake than current best estimates after standardized methods are used.",
			"FDA, EFSA, or comparable food-safety agencies setting health-based limits or warning against particular foods because of microplastic contamination."
		],
		misconceptions: [
			"Presence is sometimes treated as the same thing as demonstrated harm.",
			"Food packaging is sometimes assumed to be the main source of all food microplastics, even though FDA says current evidence is insufficient to show migration into foods and beverages.",
			"All detected particles are sometimes treated as interchangeable despite differences in size, chemistry, dose, and biological behavior."
		],
		editorSummary:
			"This page should teach a reusable risk-literacy principle: detection matters, but safety decisions require exposure, hazard, dose, and uncertainty. It should not minimize plastic pollution or overstate food-level harm.",
		uncertaintySummary:
			"Evidence certainty is low because methods remain variable, nanoplastic detection is especially difficult, occurrence data are uneven across foods, and toxicology and human outcome evidence are not mature enough for a complete dietary risk characterization.",
		searchCutoffAt: "2026-07-03T04:47:09.000Z",
		lastRetractionCheckAt: "2026-07-03T04:47:09.000Z",
		changeLog: [
			{
				date: "2026-07-03T04:47:09.000Z",
				kind: "publication",
				summary:
					"Initial microplastics-in-food risk-literacy page published from FDA, EFSA, and regulatory-science review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Microplastics and Nanoplastics in Foods",
				publisher: "U.S. Food and Drug Administration",
				year: 2024,
				url: "https://www.fda.gov/food/environmental-contaminants-food/microplastics-and-nanoplastics-foods",
				stance: "supports",
				note:
					"FDA food-safety anchor stating that current evidence does not demonstrate that detected levels in foods pose a health risk, and that presence alone does not indicate risk unless it creates a health concern.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Microplastics and nanoplastics in food",
				publisher: "European Food Safety Authority",
				year: 2026,
				url: "https://www.efsa.europa.eu/en/topics/microplastics-and-nanoplastics-food",
				stance: "context",
				note:
					"EFSA topic page summarizing remaining major knowledge gaps, lack of harmonized methods, dietary-risk-assessment work, and the need for coordinated research.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Presence of microplastics and nanoplastics in food, with particular focus on seafood",
				publisher: "EFSA Journal",
				year: 2016,
				url: "https://doi.org/10.2903/j.efsa.2016.4501",
				doi: "10.2903/j.efsa.2016.4501",
				stance: "context",
				note:
					"EFSA statement found limited occurrence data, no nanoplastics occurrence data in food, small estimated contribution to additive or contaminant exposure from seafood microplastics, and lacking toxicity and toxicokinetic data.",
				order: 3
			},
			{
				kind: "context",
				title: "Regulatory Science Perspective on the Analysis of Microplastics and Nanoplastics in Human Food",
				publisher: "Analytical Chemistry",
				year: 2024,
				url: "https://doi.org/10.1021/acs.analchem.3c05408",
				doi: "10.1021/acs.analchem.3c05408",
				pmid: "38452774",
				stance: "context",
				note:
					"Regulatory-science perspective explaining why lack of standardized definitions, reference materials, sample preparation, analytical methods, quality controls, and toxicology limits food risk assessment.",
				order: 4
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Are ultra-processed foods linked to worse health outcomes, and how much is causation versus confounding?",
		slug: "are-ultra-processed-foods-linked-to-worse-health-outcomes-and-how-much-is-causation-versus-confounding",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 82,
		bottomLine:
			"Yes, higher ultra-processed food intake is consistently linked with worse health outcomes, especially cardiometabolic outcomes, some mental-health outcomes, obesity, and mortality. But the causal story is still not as clean as 'processing alone causes every harm': many studies are observational, the NOVA category includes diverse foods, and part of the signal may reflect diet quality, calories, food texture, palatability, marketing, affordability, and the broader food environment.",
		stableCore: [
			"Umbrella reviews find higher ultra-processed-food exposure associated with many adverse outcomes, including stronger signals for type 2 diabetes, cardiovascular mortality, obesity, and some mental-health outcomes.",
			"A short inpatient randomized feeding trial found that people ate about 500 more kcal/day and gained weight on an ultra-processed diet even when offered meals were matched for presented calories, sugar, fat, sodium, fiber, and macronutrients.",
			"WHO healthy-diet guidance emphasizes whole grains, fruits, vegetables, pulses, and varied nutrient-dense foods, and notes that diets with significant amounts of highly processed foods are associated with negative health outcomes."
		],
		openQuestions: [
			"Which mechanisms matter most: energy density, eating rate, texture, additives, altered food matrices, marketing, price, or displacement of healthier foods?",
			"Which ultra-processed foods carry most risk, and are some relatively neutral when the overall diet is high quality?",
			"How should public guidance reduce harm without making food choices feel morally loaded or unrealistic for people with limited time, money, or access?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled intervention studies showing no adverse effect of high ultra-processed-food diets when diet quality and calories are carefully matched.",
			"Updated umbrella reviews finding that the associations largely disappear after stronger confounding control and better dietary measurement.",
			"Mechanistic evidence showing that the observed risks are fully explained by unrelated lifestyle or socioeconomic factors rather than the foods or food patterns themselves."
		],
		misconceptions: [
			"Correlation is sometimes treated as proof that every ultra-processed food is equally harmful.",
			"Processing category confusion can make canned, frozen, fortified, or packaged foods sound automatically dangerous even when the evidence is about highly formulated diets.",
			"Some people blame one ingredient, such as seed oils or an additive, when the evidence points more broadly to food pattern, palatability, excess calories, and displacement of minimally processed foods."
		],
		editorSummary:
			"This page should give readers a balanced nutrition answer: the association is real enough to matter, and the trial evidence supports a plausible intake mechanism, but the page should not imply that NOVA category alone perfectly ranks every food or explains every outcome.",
		uncertaintySummary:
			"The evidence is broad but not fully causal for every endpoint. Confidence is strongest for consistent associations and short-term intake/weight-gain mechanisms; uncertainty is larger for individual foods, long-term intervention effects, and separating processing from overall diet quality and social context.",
		searchCutoffAt: "2026-07-03T04:29:00.000Z",
		lastRetractionCheckAt: "2026-07-03T04:29:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T04:29:00.000Z",
				kind: "publication",
				summary:
					"Initial ultra-processed-food health-outcomes page published from WHO healthy-diet guidance, BMJ umbrella review evidence, and inpatient randomized feeding-trial evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Healthy diet",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
				stance: "supports",
				note:
					"WHO dietary guidance anchors the practical food-pattern baseline and states that diets with significant amounts of highly processed foods, often high in sodium, sugar, or unhealthy fats, are associated with negative health outcomes.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Ultra-processed food exposure and adverse health outcomes: umbrella review of epidemiological meta-analyses",
				publisher: "The BMJ",
				year: 2024,
				url: "https://doi.org/10.1136/bmj-2023-077310",
				doi: "10.1136/bmj-2023-077310",
				stance: "supports",
				note:
					"Umbrella review of 45 pooled analyses covering nearly 9.9 million participants; found higher ultra-processed-food exposure associated with 32 adverse health parameters, while many GRADE ratings remained low or very low.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Ultra-processed diets cause excess calorie intake and weight gain: An inpatient randomized controlled trial of ad libitum food intake",
				publisher: "Cell Metabolism",
				year: 2019,
				url: "https://doi.org/10.1016/j.cmet.2019.05.008",
				doi: "10.1016/j.cmet.2019.05.008",
				pmid: "31105044",
				stance: "supports",
				note:
					"Inpatient crossover trial in 20 adults found about 508 kcal/day higher intake and weight gain during the ultra-processed diet phase versus weight loss during the unprocessed diet phase.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Ultra-processed foods consumption and health-related outcomes: a systematic review of randomized controlled trials",
				publisher: "Frontiers in Nutrition",
				year: 2024,
				url: "https://doi.org/10.3389/fnut.2024.1421728",
				doi: "10.3389/fnut.2024.1421728",
				pmid: "38988861",
				stance: "context",
				note:
					"RCT-focused review notes that trial evidence remains limited and methodologically constrained, supporting cautious causal wording beyond short-term intake and weight outcomes.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Are intensive behavioral interventions effective for children with obesity, and does dose matter?",
		slug: "are-intensive-behavioral-interventions-effective-for-children-with-obesity-and-does-dose-matter",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. For children and adolescents with high BMI, comprehensive intensive behavioral interventions can improve weight status, and the dose matters: USPSTF highlights 26 or more contact hours as the threshold for achieving benefit. The practical problem is not just telling families to try harder; effective programs are structured, family-centered, multicomponent, and often hard to access.",
		stableCore: [
			"USPSTF recommends that clinicians provide or refer children and adolescents 6 years or older with BMI at or above the 95th percentile to comprehensive intensive behavioral interventions.",
			"USPSTF identifies 26 or more contact hours as important for benefit; higher-contact programs and those with supervised physical activity show larger average effects.",
			"Effective programs commonly involve both child and parent, nutrition and physical-activity support, goal setting, self-monitoring, problem solving, and multidisciplinary delivery."
		],
		openQuestions: [
			"How can health systems make 26+ contact-hour programs available to families who face cost, transportation, work-schedule, language, stigma, or specialist-shortage barriers?",
			"How durable are benefits beyond one to two years, and which maintenance supports prevent regain?",
			"How should medications or surgery be integrated for selected adolescents without replacing access to behavioral and family supports?"
		],
		whatWouldChangeMinds: [
			"Updated randomized evidence showing that high-contact behavioral programs do not improve BMI, quality of life, or cardiometabolic measures compared with lower-intensity care.",
			"Evidence of meaningful psychosocial harms from well-designed family-based interventions that outweigh weight-status and health benefits.",
			"Major USPSTF, AAP, APA, or comparable guideline reversals removing comprehensive behavioral treatment as a core pediatric obesity intervention."
		],
		misconceptions: [
			"Brief advice is often mistaken for the kind of intensive behavioral treatment studied in effective programs.",
			"Child obesity treatment is sometimes framed as willpower or blame, even though guidelines emphasize structured family and environmental support.",
			"Screening and treatment are sometimes assumed to cause stigma; USPSTF found no evidence that behavioral interventions increased stigma, self-esteem harm, body dissatisfaction, or disordered eating in trials."
		],
		editorSummary:
			"This page should be family-practical and stigma-aware. The evidence supports intensive structured treatment, but the real implementation gap is access to enough contact hours and multidisciplinary support.",
		uncertaintySummary:
			"The short-term benefit of comprehensive intensive behavioral intervention is well supported. Uncertainty is mainly about long-term maintenance, equitable implementation, component selection, medication discontinuation, and outcomes beyond BMI.",
		searchCutoffAt: "2026-07-03T04:29:00.000Z",
		lastRetractionCheckAt: "2026-07-03T04:29:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T04:29:00.000Z",
				kind: "publication",
				summary:
					"Initial pediatric intensive behavioral obesity-intervention page published from USPSTF, CDC, and JAMA evidence-review sources."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "High Body Mass Index in Children and Adolescents: Interventions",
				publisher: "U.S. Preventive Services Task Force",
				year: 2024,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/obesity-in-children-and-adolescents-screening",
				stance: "supports",
				note:
					"Primary recommendation anchor: USPSTF recommends comprehensive intensive behavioral interventions for children and adolescents 6 years or older with BMI at or above the 95th percentile and highlights 26+ contact hours.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Evidence-Based Guidelines for Child Obesity",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/obesity/child-obesity-strategies/evidence-based-guidelines.html",
				stance: "supports",
				note:
					"CDC implementation context summarizing USPSTF and other professional guidelines, including family-based multicomponent behavioral interventions with at least 26 contact hours.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Interventions for Weight Management in Children and Adolescents: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2024,
				url: "https://doi.org/10.1001/jama.2024.6739",
				doi: "10.1001/jama.2024.6739",
				pmid: "38888912",
				stance: "supports",
				note:
					"Evidence review of 58 RCTs with 10,143 participants found behavioral interventions lowered BMI in the short term, with larger effects in higher-contact interventions and those offering physical activity sessions.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Family-Based Behavioral Treatment for Childhood Obesity Implemented in Pediatric Primary Care: A Randomized Clinical Trial",
				publisher: "JAMA",
				year: 2023,
				url: "https://doi.org/10.1001/jama.2023.8061",
				doi: "10.1001/jama.2023.8061",
				pmid: "37314275",
				stance: "supports",
				note:
					"Primary-care randomized trial in 452 children found family-based treatment improved child, parent, and sibling weight outcomes over 24 months compared with usual care.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Is obesity a major health risk condition at the population level?",
		slug: "is-obesity-a-major-health-risk-condition-at-the-population-level",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 93,
		bottomLine:
			"Yes. At the population level, obesity is a major health risk condition linked to higher risks of type 2 diabetes, cardiovascular disease, stroke, several cancers, sleep apnea, osteoarthritis, pregnancy complications, and premature death. That does not mean BMI perfectly diagnoses an individual person's health, and it should not be used to moralize, stigmatize, or ignore fitness, fat distribution, medications, disability, income, stress, or food environment.",
		stableCore: [
			"WHO classifies obesity as a chronic, relapsing disease shaped by genetics, neurobiology, behavior, food access, market forces, and broader environments.",
			"WHO reports that in 2022 about 2.5 billion adults were overweight, including over 890 million adults living with obesity, and that more than 160 million children and adolescents aged 5-19 were living with obesity.",
			"WHO estimates that higher-than-optimal BMI caused about 3.7 million deaths from noncommunicable diseases in 2021.",
			"BMI is useful for population surveillance but imperfect for individual risk; waist circumference, metabolic markers, fitness, age, and clinical context can materially change personal risk."
		],
		openQuestions: [
			"How should clinical definitions move beyond BMI while keeping population surveillance comparable across countries and time?",
			"Which policy interventions most reduce obesity-related disease without increasing stigma or worsening inequities?",
			"How should prevention, behavioral treatment, medications, surgery, and social supports be combined for different risk groups?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled evidence showing that excess adiposity is not associated with cardiometabolic, cancer, mobility, or mortality risk after robust measurement and confounding control.",
			"Major WHO, CDC, NCI, cardiovascular, diabetes, or cancer-prevention reassessments withdrawing obesity as a major population health risk.",
			"Better individual-risk models that replace BMI for diagnosis while still showing that excess adiposity is not a meaningful population burden."
		],
		misconceptions: [
			"BMI's limitations are sometimes misused to claim obesity has no population-level health relevance.",
			"Population risk is sometimes wrongly translated into certainty about any one person's health or character.",
			"Obesity is sometimes framed as a simple willpower issue, even though major health agencies describe complex biological, environmental, social, and market drivers."
		],
		editorSummary:
			"This page should be explicit and non-moralizing: the consensus is that obesity is a major population health risk, while individual health assessment needs more than BMI and public-health solutions need to reduce stigma and structural barriers.",
		uncertaintySummary:
			"The population-level risk relationship is strong. Uncertainty is concentrated in individual diagnosis, causal pathways for specific outcomes, thresholds across ancestry and age groups, and which interventions best reduce harm equitably.",
		searchCutoffAt: "2026-07-03T04:29:00.000Z",
		lastRetractionCheckAt: "2026-07-03T04:29:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T04:29:00.000Z",
				kind: "publication",
				summary:
					"Initial obesity population-health-risk page published from WHO, NCI, Lancet mortality meta-analysis, and adiposity cardiovascular evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Obesity and overweight",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
				stance: "supports",
				note:
					"WHO anchor for obesity as a complex chronic disease, global prevalence, BMI caveats, environmental drivers, and the 2021 estimate of 3.7 million deaths attributable to higher-than-optimal BMI.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Obesity and Cancer Fact Sheet",
				publisher: "National Cancer Institute",
				year: 2025,
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/obesity/obesity-fact-sheet",
				stance: "supports",
				note:
					"NCI cancer-prevention anchor explaining that overweight and obesity are associated with diabetes, high blood pressure, cardiovascular disease, stroke, at least 13 cancers, and higher all-cause mortality risk.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Body-mass index and all-cause mortality: individual-participant-data meta-analysis of 239 prospective studies in four continents",
				publisher: "The Lancet",
				year: 2016,
				url: "https://doi.org/10.1016/S0140-6736(16)30175-1",
				doi: "10.1016/S0140-6736(16)30175-1",
				pmid: "27423262",
				stance: "supports",
				note:
					"Individual-participant meta-analysis of 239 prospective studies found higher all-cause mortality across overweight and obesity ranges after restricting primary analyses to never-smokers without chronic disease at baseline.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Association between adiposity and cardiovascular outcomes: an umbrella review and meta-analysis of observational and Mendelian randomization studies",
				publisher: "European Heart Journal",
				year: 2021,
				url: "https://doi.org/10.1093/eurheartj/ehab454",
				doi: "10.1093/eurheartj/ehab454",
				pmid: "34458925",
				stance: "supports",
				note:
					"Umbrella review and Mendelian randomization synthesis found increased adiposity associated with multiple cardiovascular outcomes, while also showing that evidence gradients differ by outcome.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Do COVID-19 vaccines cause menstrual cycle changes, and are the changes temporary?",
		slug: "do-covid-19-vaccines-cause-menstrual-cycle-changes-and-are-the-changes-temporary",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, COVID-19 vaccination can be followed by small, temporary menstrual changes for some people, especially small shifts in cycle length, flow, or symptoms. The best-tracked studies find average cycle-length changes of about a day or less for one dose in a cycle, with larger but still temporary changes when two doses occur in the same cycle. This does not mean the vaccines cause infertility.",
		stableCore: [
			"CDC states that people may notice no change or small temporary menstrual changes after COVID-19 vaccination, and that there is no evidence COVID-19 vaccines cause fertility problems.",
			"A global app-based cohort of 19,622 people found less than a one-day adjusted increase in cycle length after the first and second vaccine cycles when one dose occurred in a cycle, and no change in menses length.",
			"State-of-the-science reviews find the overall literature supports a temporary association, while noting that many self-report studies are at moderate-to-high risk of bias and future vaccine trials should measure menstrual outcomes directly."
		],
		openQuestions: [
			"Which immune, stress, timing, or hormonal factors explain why some people notice changes and others do not?",
			"How should studies better capture flow, pain, breakthrough bleeding, postmenopausal bleeding, and outcomes in adolescents or people using hormonal contraception?",
			"How can clinicians acknowledge the signal without letting temporary cycle changes get misrepresented as fertility damage?"
		],
		whatWouldChangeMinds: [
			"Large controlled studies showing no menstrual-cycle difference after vaccination once infection, stress, baseline variability, and reporting bias are handled.",
			"Consistent evidence of persistent cycle disruption or fertility impairment after vaccination across prospective cohorts and clinical endpoints.",
			"Updated CDC, ACOG, NIH, or comparable reproductive-health guidance withdrawing the temporary-change framing."
		],
		misconceptions: [
			"Some messaging wrongly implied menstrual reports were impossible or purely psychological before the evidence base matured.",
			"Temporary changes in cycle timing or flow are sometimes inflated into claims of permanent reproductive harm.",
			"Anecdotes after vaccination can be real and still require denominators, baseline cycle variability, and comparison groups to interpret."
		],
		editorSummary:
			"This page should model a trust-building answer: acknowledge the temporary menstrual signal clearly, quantify the average size where possible, and separate it from unsupported infertility claims.",
		uncertaintySummary:
			"The direction of evidence supports small temporary menstrual changes, but precision varies by outcome because early trials did not collect menstruation data and many later studies used self-report designs. The evidence against fertility harm remains stronger than the evidence for any lasting menstrual effect.",
		searchCutoffAt: "2026-07-03T05:21:00.000Z",
		lastRetractionCheckAt: "2026-07-03T05:21:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T05:21:00.000Z",
				kind: "publication",
				summary:
					"Initial COVID-19 vaccination and menstrual-cycle changes page published from CDC reproductive-health guidance, NIH-funded cohort evidence, and state-of-the-science review evidence."
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
					"CDC anchor stating that recent studies show no change or small temporary period changes after vaccination and no evidence that COVID-19 vaccines cause fertility problems.",
				order: 1
			},
			{
				kind: "context",
				title: "COVID-19 vaccination associated with small, temporary increase in menstrual cycle length, suggests NIH-funded study",
				publisher: "National Institutes of Health",
				year: 2022,
				url: "https://www.nih.gov/news-events/news-releases/covid-19-vaccination-associated-small-temporary-increase-menstrual-cycle-length-suggests-nih-funded-study",
				stance: "supports",
				note:
					"NIH public-research summary explaining the less-than-one-day average cycle-length change, no change in bleeding days, normal-variability context, and need for more menstrual-outcome research.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Association between menstrual cycle length and covid-19 vaccination: global, retrospective cohort study of prospectively collected data",
				publisher: "BMJ Medicine",
				year: 2022,
				url: "https://doi.org/10.1136/bmjmed-2022-000297",
				doi: "10.1136/bmjmed-2022-000297",
				pmid: "36381261",
				stance: "supports",
				note:
					"Global Natural Cycles cohort of 19,622 people found less than one-day adjusted cycle-length increases after first and second vaccine cycles when one dose occurred in a cycle, larger changes when two doses occurred in one cycle, and no menses-length change.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "Association between COVID-19 Vaccination and Menstruation: A State of the Science Review",
				publisher: "BMJ Sexual & Reproductive Health",
				year: 2024,
				url: "https://doi.org/10.1136/bmjsrh-2024-202274",
				doi: "10.1136/bmjsrh-2024-202274",
				pmid: "38857991",
				pmcid: "PMC11246222",
				stance: "supports",
				note:
					"Review of 53 publications found the bulk of evidence supports temporary menstrual changes after vaccination while emphasizing bias limitations and the need to include menstrual outcomes in future vaccine trials.",
				order: 4
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Is higher potassium intake from food recommended to reduce blood pressure and cardiovascular risk?",
		slug: "is-higher-potassium-intake-from-food-recommended-to-reduce-blood-pressure-and-cardiovascular-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, for most adults, major guidelines recommend increasing potassium from foods as part of blood-pressure and cardiovascular-risk reduction, especially when diets are high in sodium and low in fruits, vegetables, beans, nuts, and other minimally processed potassium-rich foods. The practical caveat is that this is food-first advice: people with kidney disease, impaired potassium handling, or certain medications need clinician guidance before deliberately increasing potassium or using supplements.",
		stableCore: [
			"WHO recommends increasing potassium intake from food to reduce blood pressure and the risk of cardiovascular disease, stroke, and coronary heart disease in adults.",
			"WHO suggests at least 90 mmol/day, or 3510 mg/day, of potassium for adults, while noting recommendations should be used with sodium guidance.",
			"A WHO-linked BMJ systematic review found increased potassium intake reduced systolic blood pressure by 3.49 mm Hg and diastolic blood pressure by 1.96 mm Hg in adults, with the effect concentrated in people with hypertension.",
			"Higher potassium intake was associated with lower incident stroke risk in cohort evidence, while direct coronary heart disease and overall cardiovascular disease associations were less precise."
		],
		openQuestions: [
			"How much benefit comes from potassium itself versus the broader diet pattern that brings more fruits, vegetables, beans, nuts, and less processed food?",
			"How should clinicians tailor potassium advice for people with chronic kidney disease, heart failure, diabetes, or medications that raise potassium?",
			"Which public-health interventions best increase food-based potassium intake without pushing people toward unsafe supplement use?"
		],
		whatWouldChangeMinds: [
			"Updated WHO, AHA, or comparable cardiovascular guidelines withdrawing food-based potassium recommendations after reviewing newer outcome evidence.",
			"Large randomized evidence showing no meaningful blood-pressure effect of increased potassium intake in people with elevated blood pressure.",
			"Evidence that population potassium-increase strategies cause more harm than benefit in groups without known impaired potassium handling."
		],
		misconceptions: [
			"Potassium advice is sometimes treated as a reason to ignore sodium reduction, when the strongest guidance treats both together.",
			"Food-based potassium guidance is sometimes confused with high-dose potassium supplements, which are not safe for everyone.",
			"A normal-looking diet can still be low in potassium if it is dominated by refined grains, processed foods, and few fruits, vegetables, beans, or nuts."
		],
		editorSummary:
			"This page should complement the sodium page by explaining why potassium-rich foods matter for blood pressure while keeping kidney disease, medication, and supplement caveats prominent.",
		uncertaintySummary:
			"The blood-pressure effect is well supported, especially for adults with hypertension. Outcome evidence is strongest for stroke association and less direct for coronary heart disease; food-pattern confounding and safety tailoring remain important caveats.",
		searchCutoffAt: "2026-07-03T05:21:00.000Z",
		lastRetractionCheckAt: "2026-07-03T05:21:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T05:21:00.000Z",
				kind: "publication",
				summary:
					"Initial food-based potassium and blood-pressure page published from WHO guideline/eLENA recommendations, AHA patient guidance, and BMJ meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Increasing potassium intake to reduce blood pressure and risk of cardiovascular diseases in adults",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/tools/elena/interventions/potassium-cvd-adults",
				stance: "supports",
				note:
					"Current WHO eLENA summary of the potassium intervention, including the recommendation to increase potassium intake from food and the adult target of at least 3510 mg/day.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Guideline: Potassium intake for adults and children",
				publisher: "World Health Organization",
				year: 2012,
				url: "https://www.who.int/publications/i/item/9789241504829",
				stance: "supports",
				note:
					"WHO guideline source for food-based potassium recommendations for adults and children, intended to be used alongside sodium guidance.",
				order: 2
			},
			{
				kind: "guideline",
				title: "How Potassium Can Help Prevent or Treat High Blood Pressure",
				publisher: "American Heart Association",
				year: 2025,
				url: "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/how-potassium-can-help-control-high-blood-pressure",
				stance: "supports",
				note:
					"Clinical-practical source explaining potassium-rich foods, the 3500-5000 mg/day diet-first range for many adults trying to prevent or treat high blood pressure, and kidney/medication cautions.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Effect of increased potassium intake on cardiovascular risk factors and disease: systematic review and meta-analyses",
				publisher: "The BMJ",
				year: 2013,
				url: "https://doi.org/10.1136/bmj.f1378",
				doi: "10.1136/bmj.f1378",
				pmid: "23558164",
				stance: "supports",
				note:
					"WHO-linked meta-analysis of 22 RCTs and 11 cohort studies found lower blood pressure in adults and an inverse association with incident stroke, with kidney-handling caveats.",
				order: 4
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Do potassium-enriched salt substitutes reduce blood pressure compared with regular salt?",
		slug: "do-potassium-enriched-salt-substitutes-reduce-blood-pressure-compared-with-regular-salt",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, potassium-enriched lower-sodium salt substitutes generally lower blood pressure compared with regular salt, and some trials show fewer strokes, cardiovascular events, or deaths in high-risk populations. But this is not a universal swap for everyone: WHO's recommendation is conditional, intended for adults in general populations, and excludes pregnant people, children, people with kidney impairment, and people with other conditions or medications that could make extra potassium dangerous.",
		stableCore: [
			"WHO suggests replacing regular table salt with lower-sodium salt substitutes that contain potassium when people choose to use table salt, but frames the recommendation as conditional.",
			"Cochrane review evidence found lower-sodium salt substitutes probably reduce systolic blood pressure by about 4.76 mm Hg and diastolic blood pressure by about 2.43 mm Hg in adults compared with regular salt.",
			"A 2022 Heart meta-analysis of 21 trials found systolic blood pressure reduced by 4.61 mm Hg and diastolic blood pressure by 1.61 mm Hg, with protective associations for total mortality, cardiovascular mortality, and cardiovascular events.",
			"The largest hard-outcome trial, SSaSS, studied 20,995 high-risk adults in rural China and found lower stroke, major cardiovascular event, and death rates with a 75% sodium chloride / 25% potassium chloride substitute."
		],
		openQuestions: [
			"How well do cardiovascular-event benefits generalize to places where most sodium comes from packaged or restaurant foods rather than salt added at home?",
			"How should health systems screen for kidney disease, potassium-raising medications, or other hyperkalemia risks before encouraging salt substitutes?",
			"Which lower-sodium formulations balance taste, adherence, cost, blood-pressure benefit, and potassium safety best across different populations?"
		],
		whatWouldChangeMinds: [
			"Large trials outside high-discretionary-salt settings showing no meaningful blood-pressure effect versus regular salt.",
			"Strong evidence that potassium-enriched substitutes cause clinically important hyperkalemia or arrhythmia harms in screened general-adult populations.",
			"WHO or Cochrane reassessments concluding that the safety exclusions and generalizability limitations outweigh the blood-pressure benefit."
		],
		misconceptions: [
			"Salt substitutes are sometimes described as either harmless for everyone or dangerous for everyone; the evidence supports a conditional middle position.",
			"People may confuse potassium-enriched salt substitutes with non-potassium herbs, spices, or seasoning blends.",
			"Outcome benefits from high-risk Chinese trials should not be pasted uncritically onto every country, diet, or clinical group."
		],
		editorSummary:
			"This page should give a practical, safety-first answer: potassium-enriched salt substitutes can lower blood pressure, but the recommendation belongs in a screened adult context and is strongest where discretionary salt is a major sodium source.",
		uncertaintySummary:
			"Blood-pressure evidence is moderate and consistent across trials. Hard-outcome evidence is promising but depends heavily on large Chinese high-risk/discretionary-salt trials, and safety evidence is limited for people with impaired potassium excretion, pregnant people, children, and broader food-manufacturing uses.",
		searchCutoffAt: "2026-07-03T05:21:00.000Z",
		lastRetractionCheckAt: "2026-07-03T05:21:00.000Z",
		changeLog: [
			{
				date: "2026-07-03T05:21:00.000Z",
				kind: "publication",
				summary:
					"Initial potassium-enriched salt-substitute page published from 2025 WHO conditional guidance, Cochrane review evidence, Heart meta-analysis, and SSaSS trial evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Use of lower-sodium salt substitutes: WHO guideline",
				publisher: "World Health Organization",
				year: 2025,
				url: "https://www.who.int/publications/i/item/9789240105591",
				stance: "supports",
				note:
					"WHO guideline source for conditional replacement of regular table salt with potassium-containing lower-sodium salt substitutes when adults choose to use table salt, with explicit exclusions for kidney impairment and other potassium-excretion risks.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Replacing salt with low-sodium salt substitutes (LSSS) for cardiovascular health in adults, children and pregnant women",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2022,
				url: "https://doi.org/10.1002/14651858.CD015207",
				doi: "10.1002/14651858.CD015207",
				pmid: "35944931",
				stance: "supports",
				note:
					"Review of 26 RCTs found LSSS probably reduce adult systolic and diastolic blood pressure, probably increase blood potassium slightly, and leave limited evidence for children, pregnant people, and higher-risk potassium-handling groups.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Effects of salt substitutes on clinical outcomes: a systematic review and meta-analysis",
				publisher: "Heart",
				year: 2022,
				url: "https://doi.org/10.1136/heartjnl-2022-321332",
				doi: "10.1136/heartjnl-2022-321332",
				pmid: "35945000",
				stance: "supports",
				note:
					"Meta-analysis of 21 trials and 31,949 participants found lower blood pressure with salt substitutes and protective effects for total mortality, cardiovascular mortality, and cardiovascular events.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Effect of Salt Substitution on Cardiovascular Events and Death",
				publisher: "The New England Journal of Medicine",
				year: 2021,
				url: "https://doi.org/10.1056/NEJMoa2105675",
				doi: "10.1056/NEJMoa2105675",
				pmid: "34459569",
				stance: "supports",
				note:
					"SSaSS cluster-randomized trial of 20,995 high-risk adults in rural China found lower stroke, major cardiovascular-event, and death rates with a 75% sodium chloride / 25% potassium chloride salt substitute.",
				order: 4
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does sustained HIV viral suppression prevent sexual transmission?",
		slug: "does-sustained-hiv-viral-suppression-prevent-sexual-transmission",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. People living with HIV who take antiretroviral therapy and maintain viral suppression below 200 copies/mL do not sexually transmit HIV. This is the evidence behind U=U, or Undetectable = Untransmittable. The protection depends on sustained adherence and viral-load monitoring, and it does not prevent transmission of other sexually transmitted infections.",
		stableCore: [
			"CDC says a person living with HIV who is on treatment and maintains an undetectable viral load has zero risk of transmitting HIV to sexual partners.",
			"The U.S. NIH adult and adolescent HIV guideline says maintaining HIV RNA below 200 copies/mL with antiretroviral therapy prevents sexual transmission and should be explained to all people with HIV.",
			"NIH summarizes HPTN 052, PARTNER 1, PARTNER 2, and Opposites Attract as showing no phylogenetically linked transmissions across 144,631 condomless sex acts while the partner with HIV had viral suppression below 200 copies/mL.",
			"PARTNER's final Lancet report estimated the risk of HIV transmission through condomless sex in serodifferent gay couples with suppressive ART as effectively zero."
		],
		openQuestions: [
			"How can health systems make viral-load testing, medication access, and adherence support reliable enough for people to maintain suppression over time?",
			"How should clinicians communicate U=U without implying protection against other sexually transmitted infections or pregnancy?",
			"How should public messaging handle brief treatment interruptions, delayed suppression after starting ART, and individual risk tolerance?"
		],
		whatWouldChangeMinds: [
			"Well-documented phylogenetically linked sexual transmissions occurring while HIV RNA was confirmed below 200 copies/mL on sustained antiretroviral therapy.",
			"Major CDC, NIH, WHO, or comparable guideline revisions withdrawing the U=U / treatment-as-prevention conclusion for sustained viral suppression.",
			"New evidence showing that the 200 copies/mL operational threshold does not reliably mark prevention-level suppression in real-world care."
		],
		misconceptions: [
			"U=U does not mean HIV has been cured; treatment must continue to keep viral load suppressed.",
			"Undetectable status prevents sexual HIV transmission, but it does not prevent other STIs, so STI screening and prevention still matter.",
			"The evidence is about sustained viral suppression, not simply having a prescription or having started treatment recently."
		],
		editorSummary:
			"This page should be clear and stigma-reducing: the consensus is strong that sustained viral suppression prevents sexual HIV transmission, while the practical work is access, adherence, monitoring, and STI context.",
		uncertaintySummary:
			"The central U=U conclusion is high-certainty for sexual HIV transmission when viral load is sustained below 200 copies/mL. Uncertainty is mostly implementation-related: treatment access, monitoring cadence, adherence interruptions, and communicating the boundary with other STI risks.",
		searchCutoffAt: "2026-07-03T14:31:39.000Z",
		lastRetractionCheckAt: "2026-07-03T14:31:39.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:31:39.000Z",
				kind: "publication",
				summary:
					"Initial HIV viral-suppression transmission-prevention page published from CDC, NIH guideline, and PARTNER final-study evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Undetectable = Untransmittable",
				publisher: "Centers for Disease Control and Prevention",
				year: 2024,
				url: "https://www.cdc.gov/global-hiv-tb/php/our-approach/undetectable-untransmittable.html",
				stance: "supports",
				note:
					"CDC public-health anchor for the U=U message that treatment with maintained undetectable viral load creates zero risk of sexual HIV transmission.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Antiretroviral Therapy to Prevent Sexual Transmission of HIV (Treatment as Prevention)",
				publisher: "NIH ClinicalInfo HIV.gov",
				year: 2025,
				url: "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/arv-therapy-as-prevention",
				stance: "supports",
				note:
					"Current U.S. HIV guideline source for the <200 copies/mL threshold, need for sustained suppression, and limits around STIs and treatment interruptions.",
				order: 2
			},
			{
				kind: "landmark_study",
				title:
					"Risk of HIV transmission through condomless sex in serodifferent gay couples with the HIV-positive partner taking suppressive antiretroviral therapy (PARTNER): final results of a multicentre, prospective, observational study",
				publisher: "The Lancet",
				year: 2019,
				url: "https://doi.org/10.1016/S0140-6736(19)30418-0",
				doi: "10.1016/S0140-6736(19)30418-0",
				pmid: "31056293",
				stance: "supports",
				note:
					"PARTNER final results source concluding that transmission risk through condomless sex with suppressive ART was effectively zero in the studied serodifferent gay couples.",
				order: 3
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does indoor tanning increase skin cancer risk?",
		slug: "does-indoor-tanning-increase-skin-cancer-risk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Yes. Indoor tanning exposes skin to intense ultraviolet radiation, and major cancer agencies classify UV-emitting tanning devices as carcinogenic to humans. Risk is especially concerning when people start young, but the practical consensus is simpler: tanning beds are not a safe way to tan.",
		stableCore: [
			"IARC classified UV-emitting tanning devices as carcinogenic to humans and reported that melanoma risk increased by 75% when use started before age 30 in combined epidemiologic evidence.",
			"CDC advises avoiding indoor tanning because tanning beds, booths, sunbeds, and sunlamps expose users to high levels of UV rays that can cause skin cancer, eye cancer, cataracts, burns, and other injuries.",
			"CDC explicitly describes a tan after UV exposure as a sign of skin injury, not health, and says a base tan does not protect against sunburns.",
			"BMJ meta-analysis evidence found sunbed use associated with a significant increase in melanoma risk, with greater risk at younger first use and more sessions."
		],
		openQuestions: [
			"How much do risk estimates vary by device type, UV intensity, cumulative sessions, age at first use, skin type, and sunburn history?",
			"Which policies best reduce adolescent and young-adult exposure without shifting users to unregulated or poorly supervised settings?",
			"How should public messaging balance vitamin D concerns with safer non-UV ways to maintain adequate vitamin D?"
		],
		whatWouldChangeMinds: [
			"Large, independently replicated epidemiologic evidence showing no increased melanoma, basal-cell carcinoma, squamous-cell carcinoma, or ocular melanoma risk from indoor tanning after adequate exposure measurement.",
			"Major IARC, WHO, CDC, FDA, or dermatology-society reassessment concluding that UV-emitting tanning devices are not carcinogenic under real-world cosmetic-use conditions.",
			"Mechanistic evidence overturning the established role of tanning-device UV exposure in DNA damage and skin-cancer pathways."
		],
		misconceptions: [
			"A base tan is often marketed as protective, but health agencies treat it as UV injury and not a safe shield against future damage.",
			"Indoor tanning is not a safer or more controlled version of sunlight; the issue is carcinogenic UV exposure.",
			"Using tanning beds for vitamin D is not necessary when diet, supplements, and ordinary clinical guidance can address deficiency without intentional UV damage."
		],
		editorSummary:
			"This page should be direct because the consensus is unusually practical: indoor tanning increases cancer risk, especially with early and repeated use, and a cosmetic tan should not be framed as a health behavior.",
		uncertaintySummary:
			"The direction of risk is high-certainty. Remaining uncertainty is mostly about the exact size of risk for particular device types, user histories, and skin-cancer subtypes, not whether indoor tanning is a credible carcinogenic exposure.",
		searchCutoffAt: "2026-07-03T14:31:39.000Z",
		lastRetractionCheckAt: "2026-07-03T14:31:39.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:31:39.000Z",
				kind: "publication",
				summary:
					"Initial indoor-tanning skin-cancer page published from IARC classification, CDC prevention guidance, and sunbed meta-analysis evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Sunbeds and UV Radiation",
				publisher: "International Agency for Research on Cancer",
				year: 2009,
				url: "https://www.iarc.who.int/media-centre-iarc-news-32/",
				stance: "supports",
				note:
					"IARC anchor for classifying UV-emitting tanning devices as carcinogenic to humans and for the 75% higher melanoma-risk estimate when use starts young.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Reducing Risk for Skin Cancer",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/skin-cancer/prevention/index.html",
				stance: "supports",
				note:
					"CDC prevention source advising people to avoid indoor tanning and describing tans from UV exposure as signs of injury rather than health.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Cutaneous melanoma attributable to sunbed use: systematic review and meta-analysis",
				publisher: "The BMJ",
				year: 2012,
				url: "https://doi.org/10.1136/bmj.e4757",
				doi: "10.1136/bmj.e4757",
				pmid: "22833605",
				stance: "supports",
				note:
					"Meta-analysis finding sunbed use associated with significantly increased melanoma risk, with higher risk from younger first use and more sessions.",
				order: 3
			},
			{
				kind: "systematic_review",
				title: "The association of use of sunbeds with cutaneous malignant melanoma and other skin cancers: A systematic review",
				publisher: "International Journal of Cancer",
				year: 2007,
				url: "https://doi.org/10.1002/ijc.22453",
				doi: "10.1002/ijc.22453",
				pmid: "17131335",
				stance: "supports",
				note:
					"Earlier IARC-linked systematic review summarizing epidemiologic and experimental evidence on indoor tanning equipment and skin cancer.",
				order: 4
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Do industrially produced trans fats increase cardiovascular risk?",
		slug: "do-industrially-produced-trans-fats-increase-cardiovascular-risk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"Yes. Industrially produced trans fats from partially hydrogenated oils increase cardiovascular risk and have no known health benefit. The consensus has moved from labeling to elimination: WHO recommends limiting trans fat to less than 1% of energy and eliminating industrial trans fats from the food supply, and FDA determined partially hydrogenated oils are no longer generally recognized as safe for U.S. foods.",
		stableCore: [
			"WHO states that high trans-fat intake increases risk of death from any cause by 34%, coronary heart disease deaths by 28%, and coronary heart disease by 21%.",
			"WHO recommends adults limit trans fat to less than 1% of total energy intake and says industrially produced trans fats are not part of a healthy diet and should be avoided.",
			"FDA determined in 2015 that partially hydrogenated oils, the primary source of industrially produced trans fats, are not generally recognized as safe for use in food.",
			"New England Journal of Medicine review evidence links trans-fat intake with coronary heart disease, sudden cardiac death, and adverse lipid and inflammatory pathways."
		],
		openQuestions: [
			"How quickly will remaining countries adopt and enforce best-practice trans-fat limits or partially hydrogenated oil bans?",
			"How should regulators monitor replacement fats so trans-fat elimination does not increase other diet-related risks?",
			"How should public guidance distinguish industrial trans fats from broader dietary fat debates without encouraging oversimplified fat avoidance?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled evidence showing industrially produced trans fats do not worsen blood lipids, inflammation, coronary heart disease risk, or cardiovascular mortality.",
			"Major WHO, FDA, or comparable food-safety agency revisions concluding that partially hydrogenated oils are safe for routine food use.",
			"Population-level evidence showing trans-fat elimination fails to reduce cardiovascular risk when replacement fats and dietary context are accounted for."
		],
		misconceptions: [
			"Trans fats are sometimes blurred with all dietary fat, but the evidence and policy consensus are specifically strong against industrial trans fats and partially hydrogenated oils.",
			"Zero grams on a label does not always mean literally no trans fat in every serving, so ingredient lists and regulation both matter.",
			"Removing industrial trans fats does not mean every replacement ingredient is automatically healthy; the replacement pattern still matters."
		],
		editorSummary:
			"This page should be one of the site's clearest nutrition consensus examples. Unlike many diet debates, industrial trans fats have a strong harm signal, no known health benefit, and broad policy consensus around elimination.",
		uncertaintySummary:
			"The harm direction is high-certainty for industrial trans fats. Remaining uncertainty is mainly policy and substitution: enforcement, replacement fats, residual exposure, and how different food systems complete elimination.",
		searchCutoffAt: "2026-07-03T14:31:39.000Z",
		lastRetractionCheckAt: "2026-07-03T14:31:39.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:31:39.000Z",
				kind: "publication",
				summary:
					"Initial industrial trans-fat cardiovascular-risk page published from WHO, FDA, and NEJM review evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Trans fat",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/news-room/fact-sheets/detail/trans-fat",
				stance: "supports",
				note:
					"WHO anchor for the cardiovascular risk estimates, the less-than-1% energy recommendation, and global industrial trans-fat elimination policy.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Final Determination Regarding Partially Hydrogenated Oils (Removing Trans Fat)",
				publisher: "U.S. Food and Drug Administration",
				year: 2015,
				url: "https://www.fda.gov/food/food-additives-petitions/final-determination-regarding-partially-hydrogenated-oils-removing-trans-fat",
				stance: "supports",
				note:
					"FDA regulatory anchor for determining partially hydrogenated oils are no longer generally recognized as safe for use in food.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Trans Fatty Acids and Cardiovascular Disease",
				publisher: "The New England Journal of Medicine",
				year: 2006,
				url: "https://doi.org/10.1056/NEJMra054035",
				doi: "10.1056/NEJMra054035",
				pmid: "16611951",
				stance: "supports",
				note:
					"Review evidence summarizing cardiovascular disease, lipid, inflammation, and policy implications of reducing trans fatty acids from partially hydrogenated oils.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Does pasteurization make milk safer than drinking raw milk?",
		slug: "does-pasteurization-make-milk-safer-than-drinking-raw-milk",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Pasteurization makes milk substantially safer by killing disease-causing germs while preserving milk's nutritional benefits. Raw milk can carry Salmonella, E. coli, Listeria, Campylobacter, Brucella, Cryptosporidium, and other pathogens. Clean farms and testing can reduce risk, but they do not make raw milk as safe as pasteurized milk.",
		stableCore: [
			"CDC says pasteurization is crucial for milk safety, that raw milk can cause serious illness, and that pasteurized milk and dairy products are the best way to safely get milk's nutritional benefits.",
			"FDA says raw milk can carry dangerous germs such as Salmonella, E. coli, Listeria, and Campylobacter, and cites CDC data linking 202 outbreaks, 2,645 illnesses, and 228 hospitalizations to raw milk during 1998-2018.",
			"FDA's raw-milk myth review states that pasteurization kills raw-milk pathogens without significant impact on milk nutritional quality and that raw milk is not nutritionally superior to pasteurized milk.",
			"A 2022 Canada/U.S. systematic review found 20 unpasteurized-dairy outbreaks, causing 449 confirmed illnesses, 124 hospitalizations, and five deaths. Pasteurized-dairy outbreaks also occurred, mainly involving Listeria, so pasteurization reduces risk rather than eliminating it.",
			"U.S. surveillance for 2013-2018 found 75 outbreaks and 675 illnesses linked to unpasteurized milk; 48% of illnesses were among people ages 0-19, and outbreaks were more common where retail sale was allowed.",
			"A 2025 CDC MMWR described 171 Salmonella Typhimurium cases linked to commercially distributed raw milk and cream; 70% were children or adolescents, and the outbreak strain was found in raw milk and 60-day-aged raw milk cheese."
		],
		openQuestions: [
			"How much can modern farm sanitation, pathogen testing, rapid recalls, and cold-chain controls lower but not eliminate raw-milk risk?",
			"Which labeling, retail-sale, and education policies best protect children, pregnant people, older adults, and immunocompromised people without making risk communication sound punitive?",
			"How should emerging risks, including novel animal pathogens, change monitoring of raw dairy products and raw-milk cheeses?"
		],
		whatWouldChangeMinds: [
			"Large, independently replicated surveillance showing modern raw milk under realistic distribution has illness and severe-outcome risk comparable to pasteurized milk.",
			"Evidence that farm-level testing and sanitation reliably prevent key pathogens before consumer exposure at scale.",
			"Major CDC, FDA, WHO, or comparable food-safety reassessments withdrawing pasteurization as a core milk-safety recommendation."
		],
		misconceptions: [
			"Natural or local does not automatically mean microbiologically safer.",
			"Healthy animals, clean-looking milk, or careful farmers cannot guarantee that raw milk is free of pathogens.",
			"Raw milk is not nutritionally superior to pasteurized milk and does not cure lactose intolerance.",
			"Raw-milk cheese aged for 60 days is not guaranteed safe from every outbreak strain or emerging pathogen.",
			"Outbreaks linked to pasteurized dairy show that food safety is not perfect; they do not make raw milk equally safe."
		],
		editorSummary:
			"This page should answer a high-confusion food-safety claim without turning it into lifestyle shaming. The practical consensus is that pasteurization is a proven safety step and raw milk is an avoidable pathogen risk, especially for children and medically vulnerable groups.",
		uncertaintySummary:
			"The direction of risk is high-certainty. Uncertainty is mainly about exact risk under specific farm practices, local laws, testing frequency, distribution scale, pathogen type, and how best to communicate risk without implying pasteurized products are perfectly risk-free.",
		searchCutoffAt: "2026-07-04T04:40:14.000Z",
		lastRetractionCheckAt: "2026-07-04T04:40:14.000Z",
		changeLog: [
			{
				date: "2026-07-04T04:40:14.000Z",
				kind: "publication",
				summary:
					"Initial raw-milk and pasteurization safety page published from CDC, FDA, North American outbreak systematic review, U.S. outbreak surveillance, and 2025 CDC Salmonella outbreak evidence."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Raw Milk",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/food-safety/foods/raw-milk.html",
				stance: "supports",
				note:
					"CDC public-health anchor stating that pasteurization is crucial for milk safety, raw milk can cause serious illness, and pasteurized dairy is the safest way to get milk's nutritional benefits.",
				order: 1
			},
			{
				kind: "guideline",
				title: "The Dangers of Raw Milk: Unpasteurized Milk Can Pose a Serious Health Risk",
				publisher: "U.S. Food and Drug Administration",
				url:
					"https://www.fda.gov/food/buy-store-serve-safe-food/dangers-raw-milk-unpasteurized-milk-can-pose-serious-health-risk",
				stance: "supports",
				note:
					"FDA consumer-safety source for raw-milk pathogen examples, vulnerable groups, the 1998-2018 CDC outbreak count, and the explanation that pasteurization kills harmful germs.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Raw Milk Misconceptions and the Danger of Raw Milk Consumption",
				publisher: "U.S. Food and Drug Administration",
				url:
					"https://www.fda.gov/food/buy-store-serve-safe-food/raw-milk-misconceptions-and-danger-raw-milk-consumption",
				stance: "supports",
				note:
					"FDA myth-review source stating that pasteurization kills raw-milk pathogens without significant nutritional-quality loss and that raw milk is not nutritionally superior.",
				order: 3
			},
			{
				kind: "systematic_review",
				title:
					"Disease outbreaks linked to pasteurized and unpasteurized dairy products in Canada and the United States: a systematic review",
				publisher: "Canadian Journal of Public Health",
				year: 2022,
				url: "https://doi.org/10.17269/s41997-022-00614-y",
				doi: "10.17269/s41997-022-00614-y",
				pmid: "35277846",
				stance: "supports",
				note:
					"Systematic review of 32 Canada/U.S. dairy outbreaks from 2007 onward; supports raw-dairy risk while keeping the caveat that pasteurized-product outbreaks can still occur.",
				order: 4
			},
			{
				kind: "landmark_study",
				title:
					"Foodborne illness outbreaks linked to unpasteurised milk and relationship to changes in state laws - United States, 1998-2018",
				publisher: "Epidemiology and Infection",
				year: 2022,
				url: "https://doi.org/10.1017/S0950268822001649",
				doi: "10.1017/S0950268822001649",
				pmid: "36280604",
				stance: "supports",
				note:
					"U.S. outbreak-surveillance analysis linking unpasteurized-milk availability with more outbreaks and reporting 75 outbreaks with 675 illnesses during 2013-2018.",
				order: 5
			},
			{
				kind: "landmark_study",
				title:
					"Outbreak of Salmonella Typhimurium Infections Linked to Commercially Distributed Raw Milk - California and Four Other States, September 2023-March 2024",
				publisher: "Morbidity and Mortality Weekly Report",
				year: 2025,
				url: "https://www.cdc.gov/mmwr/volumes/74/wr/mm7427a1.htm",
				doi: "10.15585/mmwr.mm7427a1",
				pmid: "40705671",
				stance: "supports",
				note:
					"Recent CDC outbreak report describing 171 Salmonella Typhimurium cases linked to raw milk and cream, with most cases among children and adolescents.",
				order: 6
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is heavy rainfall becoming more frequent and intense because of human-caused climate change?",
		slug: "is-heavy-rainfall-becoming-more-frequent-and-intense-because-of-human-caused-climate-change",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 92,
		bottomLine:
			"Yes, for the global land signal and many well-observed regions. A warmer atmosphere holds more moisture, and IPCC concludes human influence is likely the main driver of the observed global-scale intensification of heavy precipitation over land. The exact trend varies by region, so a local flood still needs local attribution and exposure analysis.",
		stableCore: [
			"IPCC AR6 finds the frequency and intensity of heavy precipitation events have likely increased globally over most land regions with good observational coverage.",
			"IPCC AR6 says human influence, especially greenhouse gas emissions, is likely the main driver of the observed global-scale intensification of heavy precipitation over land regions.",
			"EPA says heavy precipitation events have become more frequent across the contiguous United States since the 1950s, especially in the Northeast and Midwest, with strong evidence that warming from human activities contributed.",
			"NCA5 reports that heavy precipitation events became more frequent and intense across much of the United States over 1958-2021, with robust evidence that human-caused warming contributed to the heaviest events across nearly 70% of the country."
		],
		openQuestions: [
			"How large is the human contribution to a specific local flood compared with land use, drainage, river management, antecedent soil moisture, and exposure?",
			"Which regions have enough long-term observations to support confident trend and attribution statements?",
			"How should infrastructure standards update rainfall assumptions without overclaiming precision at very local scales?"
		],
		whatWouldChangeMinds: [
			"An IPCC-scale reassessment finding that observed heavy-precipitation intensification over land is not attributable to anthropogenic warming.",
			"New global observations showing no increase in the frequency or intensity of heavy precipitation across well-observed land regions.",
			"Stronger physical evidence showing atmospheric moisture increases from warming do not translate into heavier precipitation extremes."
		],
		misconceptions: [
			"A cold or dry season in one place does not disprove the global heavy-precipitation signal.",
			"Climate change does not mean every flood has the same cause; flooding also depends on where people build, drainage, soils, rivers, and emergency preparation.",
			"Average annual precipitation and the heaviest precipitation events can move differently, so a region can face more intense downpours even if total rainfall changes less."
		],
		editorSummary:
			"This page should make the physical signal visible without turning every flood into a single-cause story: the broad consensus is strong for heavier precipitation in a warmer climate, while local damages depend on many non-climate factors too.",
		uncertaintySummary:
			"The global and U.S. direction is high-certainty in well-observed regions. Uncertainty grows at smaller spatial scales, in regions with sparse records, and when converting rainfall trends into flood damages or design standards.",
		searchCutoffAt: "2026-07-03T14:31:39.000Z",
		lastRetractionCheckAt: "2026-07-03T14:31:39.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:31:39.000Z",
				kind: "publication",
				summary:
					"Initial heavy-precipitation climate-change page published from IPCC AR6, EPA extreme-precipitation guidance, and NCA5 climate-trends assessment evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Chapter 11: Weather and Climate Extreme Events in a Changing Climate",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-11/",
				stance: "supports",
				note:
					"IPCC assessment anchor for observed increases in heavy precipitation and attribution of global land intensification primarily to human influence.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Extreme Precipitation",
				publisher: "U.S. Environmental Protection Agency",
				year: 2025,
				url: "https://www.epa.gov/climatechange-science/extreme-precipitation",
				stance: "supports",
				note:
					"EPA public science source for U.S. heavy-precipitation increases since the 1950s and the role of human-caused warming in the trend.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Climate Trends",
				publisher: "U.S. Global Change Research Program",
				year: 2023,
				url: "https://toolkit.climate.gov/sites/default/files/2025-07/NCA5_Ch2_Climate-Trends.pdf",
				doi: "10.7930/NCA5.2023.CH2",
				stance: "supports",
				note:
					"NCA5 chapter source for observed U.S. heavy-precipitation changes over 1958-2021 and evidence that human-caused warming contributed across nearly 70% of the United States.",
				order: 3
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Does climate change make hurricanes wetter and coastal flooding worse?",
		slug: "does-climate-change-make-hurricanes-wetter-and-coastal-flooding-worse",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 87,
		bottomLine:
			"Broadly yes, with an important caveat. Human-caused warming is expected to make tropical-cyclone rainfall rates higher, and sea-level rise makes coastal inundation from storms worse when storms occur. But the total number of Atlantic tropical storms or hurricanes is not expected to show a simple large increase, and basin-specific frequency projections remain uncertain.",
		stableCore: [
			"NOAA GFDL summarizes modeling studies as projecting tropical-cyclone precipitation-rate increases of about 14% for a 2 degrees Celsius warming scenario, with the strongest agreement across studies for rain rates and intensity.",
			"NOAA GFDL says neither model projections nor trend analyses support the idea that greenhouse-gas warming leads to large increases in Atlantic tropical storm or overall hurricane numbers.",
			"NOAA GFDL notes that sea-level rise, for which human activity has very likely been the main driver since at least 1971 according to IPCC AR6, should raise coastal inundation levels for tropical cyclones that do occur, all else equal.",
			"IPCC AR6 assesses high confidence that sea-level rise will increase the possibility of extreme coastal water levels in most regions, with other factors held equal."
		],
		openQuestions: [
			"How will Atlantic basin frequency, tracks, rapid intensification, wind shear, aerosols, and natural variability interact over the next several decades?",
			"How much of a specific hurricane's rainfall, wind intensity, or surge damage can be attributed to human-caused warming versus weather variability and local exposure?",
			"How should coastal planning combine rainfall, river flow, storm surge, sea-level rise, land subsidence, and development patterns into practical flood standards?"
		],
		whatWouldChangeMinds: [
			"An IPCC or NOAA reassessment showing that warmer oceans and air do not increase tropical-cyclone rainfall rates under otherwise comparable conditions.",
			"Robust evidence showing sea-level rise does not increase coastal inundation levels during tropical cyclones, all else equal.",
			"Updated observations and models converging on a simple large increase in total Atlantic hurricane counts, which would change the current caveated answer."
		],
		misconceptions: [
			"Climate change and hurricanes are sometimes reduced to 'more storms' or 'no effect'; the stronger consensus concerns heavier rainfall, more intense storms in some measures, and higher storm-surge baseline from sea-level rise.",
			"No long-term U.S. landfall trend does not mean hurricanes are unaffected by warming; rainfall, rapid intensification, storm surge, and exposure are separate questions.",
			"Storm damage trends cannot be read as climate trends without accounting for coastal development, wealth, building standards, insurance, and preparedness."
		],
		editorSummary:
			"This page should model the site's best nuance: readers need the consensus that warmer climate worsens hurricane hazards through rain and sea level, while also seeing that total storm counts are not the settled or most useful claim.",
		uncertaintySummary:
			"Confidence is high for increased tropical-cyclone rainfall rates with warming and for sea-level rise amplifying coastal inundation. Confidence is lower for simple claims about total Atlantic hurricane frequency, basin-specific tracks, and individual-event attribution.",
		searchCutoffAt: "2026-07-03T14:31:39.000Z",
		lastRetractionCheckAt: "2026-07-03T14:31:39.000Z",
		changeLog: [
			{
				date: "2026-07-03T14:31:39.000Z",
				kind: "publication",
				summary:
					"Initial hurricane rainfall and coastal-flooding climate-change page published from NOAA GFDL, IPCC AR6, and NCA5 evidence."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title: "Global Warming and Hurricanes",
				publisher: "NOAA Geophysical Fluid Dynamics Laboratory",
				year: 2026,
				url: "https://www.gfdl.noaa.gov/global-warming-and-hurricanes/",
				stance: "supports",
				note:
					"NOAA GFDL anchor for projected tropical-cyclone rainfall increases, uncertain frequency changes, and sea-level rise effects on coastal inundation.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Chapter 11: Weather and Climate Extreme Events in a Changing Climate",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-11/",
				stance: "supports",
				note:
					"IPCC assessment anchor for tropical-cyclone, compound flooding, heavy precipitation, and sea-level-rise evidence boundaries.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Climate Trends",
				publisher: "U.S. Global Change Research Program",
				year: 2023,
				url: "https://toolkit.climate.gov/sites/default/files/2025-07/NCA5_Ch2_Climate-Trends.pdf",
				doi: "10.7930/NCA5.2023.CH2",
				stance: "supports",
				note:
					"NCA5 chapter source for U.S. climate-trend framing, Hurricane Harvey rainfall attribution examples, and the distinction between storm hazards and exposure.",
				order: 3
			}
		]
	},
	{
		topicSlug: "active-debates",
		title: "Is psilocybin-assisted therapy an established treatment for depression?",
		slug: "is-psilocybin-assisted-therapy-an-established-treatment-for-depression",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 72,
		evidenceCertainty: "low",
		reviewMode: "living",
		bottomLine:
			"Not yet. Supervised psilocybin-assisted therapy has shown promising short-term antidepressant effects in randomized trials and meta-analyses, but it is not an established routine treatment for depression. The active debate is about durability, blinding and expectancy bias, safety monitoring, therapy protocols, patient selection, and whether larger phase 3 trials will confirm the signal.",
		stableCore: [
			"Several randomized trials and meta-analyses find larger short-term reductions in depression symptoms after psilocybin with psychological support than after comparator conditions.",
			"The evidence is not the same as evidence for self-treating with mushrooms or unsupervised psychedelic use; studied protocols include screening, preparation, monitored dosing, and integration support.",
			"Most trial populations are selective, commonly excluding people with psychosis, mania, active substance use disorder, or active suicidal intent, so generalization to routine care is limited.",
			"Blinding is difficult because psychedelic effects are noticeable, and control-group outcomes in psilocybin trials may differ from control outcomes in SSRI or esketamine trials.",
			"FDA actions as of 2026 support further development and expedited review of psilocybin programs, but study authorization and priority review are not the same as approval or proof of safety and effectiveness."
		],
		openQuestions: [
			"Will larger phase 3 trials replicate the antidepressant effects with stronger blinding, active controls, and longer follow-up?",
			"Which depression subgroups, doses, preparation models, therapy components, and integration protocols matter most?",
			"How durable are benefits beyond six weeks or a few months, and what retreatment or maintenance model would be safe?",
			"How should trials measure and reduce expectancy effects when participants and therapists can often infer treatment assignment?",
			"What safeguards are needed for suicidality, bipolar disorder, psychosis risk, cardiovascular risk, abuse potential, and therapist misconduct?"
		],
		whatWouldChangeMinds: [
			"Multiple large, independent phase 3 trials showing durable benefit, acceptable safety, and reproducible protocols in clearly defined depression populations.",
			"Regulatory approval paired with evidence-based clinical guidelines specifying patient selection, dosing, monitoring, therapist training, and adverse-event handling.",
			"Conversely, rigorous trials showing that observed effects mostly disappear under stronger blinding, better active controls, or longer follow-up."
		],
		misconceptions: [
			"Promising trial results do not mean psilocybin is already a proven routine depression treatment.",
			"Psilocybin-assisted therapy is not the same thing as microdosing, recreational use, or taking mushrooms without medical screening and supervision.",
			"A fast or large short-term symptom change does not settle durability, safety, access, training, or real-world implementation.",
			"Regulatory interest, breakthrough status, or priority review does not mean a product has been approved or found safe and effective."
		],
		editorSummary:
			"This page should give readers a useful active-debate example: there is a real antidepressant signal, but the clinical, regulatory, safety, and implementation questions are still too large for routine-treatment claims.",
		uncertaintySummary:
			"Evidence supports a promising short-term antidepressant signal in supervised research settings. Certainty remains low for routine care because trials are small, follow-up is short, blinding is difficult, controls vary, protocols bundle drug effects with psychological support, and regulatory approval plus practice standards are still evolving.",
		uncertaintyDrivers: [
			{
				type: "bias",
				detail:
					"Psychedelic effects make treatment assignment hard to mask, increasing concern about expectancy and functional unblinding."
			},
			{
				type: "timing",
				detail: "Most controlled evidence focuses on symptom changes over days to weeks rather than long-term maintenance."
			},
			{
				type: "implementation",
				detail:
					"Protocols depend on screening, monitored dosing sessions, therapist support, training standards, and adverse-event safeguards that are not yet routine."
			},
			{
				type: "generalizability",
				detail:
					"Trial exclusions limit conclusions for people with psychosis or mania history, active substance use disorder, high suicide risk, or complex comorbidity."
			}
		],
		searchDatabases: ["Consensus", "FDA"],
		searchCutoffAt: "2026-07-04T16:45:00.000Z",
		lastRetractionCheckAt: "2026-07-04T16:45:00.000Z",
		changeLog: [
			{
				date: "2026-07-04T16:45:00.000Z",
				kind: "publication",
				summary:
					"Initial psilocybin-assisted therapy active-debate page published from Consensus-located randomized-trial/meta-analysis evidence and current FDA development guidance."
			}
		],
		inclusionRules: [
			"Prioritize randomized trials, meta-analyses, regulatory guidance, and clinical-guideline context for adult depression.",
			"Separate psilocybin-assisted therapy in supervised trials from recreational use, microdosing, or unsupervised self-treatment.",
			"Track whether evidence addresses major depressive disorder, treatment-resistant depression, or secondary depression separately."
		],
		exclusionRules: [
			"Do not use anecdotal reports, wellness marketing, or legal adult-use programs as clinical efficacy evidence.",
			"Do not generalize ketamine, MDMA, LSD, ibogaine, or non-psilocybin psychedelic findings to psilocybin for depression.",
			"Do not treat regulatory priority vouchers or investigational access as approval, safety, or effectiveness findings."
		],
		evidenceSummaries: [
			{
				question: "Does supervised psilocybin-assisted therapy improve depression symptoms compared with control conditions?",
				population: "Adults with clinically significant depression, major depressive disorder, treatment-resistant depression, or secondary depression in controlled trials",
				finding:
					"Meta-analyses and phase 2 randomized trials generally find short-term symptom improvement favoring psilocybin, but the certainty is limited by small samples, short follow-up, and trial-design constraints.",
				effectDirection: "mixed",
				magnitude:
					"2024 meta-analyses reported medium-to-large short-term effects, including Hedges' g around 0.66 in BMJ and SMD around -0.72 at about one week in an RCT-only meta-analysis.",
				certainty: "low",
				limitations: [
					"Functional unblinding and participant expectancy are hard to eliminate.",
					"Long-term durability and retreatment models remain uncertain.",
					"Trial populations and supervised protocols do not map cleanly onto routine care or self-treatment."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "U.S. Food and Drug Administration",
				role: "Regulatory anchor showing psychedelic treatments are being studied under clinical-development rules, with priority review not equivalent to approval."
			},
			{
				name: "BMJ and Acta Psychiatrica Scandinavica meta-analyses",
				role: "Evidence-synthesis anchors for the short-term antidepressant signal and the limits of current trial evidence."
			},
			{
				name: "NICE depression guideline",
				role: "Clinical-care context for established depression treatment pathways while psilocybin protocols remain investigational."
			}
		],
		sources: [
			{
				kind: "guideline",
				title: "Psychedelic Drugs: Considerations for Clinical Investigations",
				publisher: "U.S. Food and Drug Administration",
				year: 2023,
				url:
					"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/psychedelic-drugs-considerations-clinical-investigations",
				stance: "context",
				note:
					"FDA draft guidance for sponsors studying psychedelic drugs, including psilocybin, for medical conditions; useful for trial-design, monitoring, and investigational-status context.",
				order: 1
			},
			{
				kind: "context",
				title: "FDA Accelerates Action on Treatments for Serious Mental Illness Following Executive Order",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url:
					"https://www.fda.gov/news-events/press-announcements/fda-accelerates-action-treatments-serious-mental-illness-following-executive-order",
				stance: "context",
				note:
					"Current FDA regulatory context: priority vouchers for psilocybin programs in treatment-resistant depression and major depressive disorder, while FDA says clinical-study authorization does not mean approval or safety/effectiveness findings.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Efficacy of psilocybin for treating symptoms of depression: systematic review and meta-analysis",
				publisher: "The BMJ",
				year: 2024,
				url:
					"https://consensus.app/papers/efficacy-of-psilocybin-for-treating-symptoms-of-metaxa-clarke/15d30409f10a5c958b006241062bbe81/",
				stance: "supports",
				note:
					"Meta-analysis of randomized trials finding a significant depression-symptom benefit compared with placebo or non-psychoactive comparators, while calling for research on expectancy effects, moderators, and treatment delivery.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title:
					"Randomized Controlled Trials of Psilocybin-Assisted Therapy in the Treatment of Major Depressive Disorder: Systematic Review and Meta-Analysis",
				publisher: "Acta Psychiatrica Scandinavica",
				year: 2024,
				url:
					"https://consensus.app/papers/randomized-controlled-trials-of-psilocybinassisted-menon-ramamurthy/87fcd88288305f6bbe681fa5d6016eda/",
				stance: "supports",
				note:
					"RCT-only meta-analysis of six trials with 427 participants finding medium-or-larger antidepressant effects up to about six weeks and higher risks of some adverse events such as headache and dizziness.",
				order: 4
			},
			{
				kind: "landmark_study",
				title: "Single-Dose Psilocybin Treatment for Major Depressive Disorder: A Randomized Clinical Trial.",
				publisher: "JAMA",
				year: 2023,
				url:
					"https://consensus.app/papers/singledose-psilocybin-treatment-for-major-depressive-raison-sanacora/617fd4403c2c58be9fdc7dec9b9fb935/",
				stance: "supports",
				note:
					"Phase 2 randomized trial of 104 adults finding reduced MADRS depression scores through day 43 after a 25 mg psilocybin dose with psychological support, with no serious treatment-emergent adverse events but more overall and severe adverse events.",
				order: 5
			},
			{
				kind: "meta_analysis",
				title: "Control Group Outcomes in Trials of Psilocybin, SSRIs, or Esketamine for Depression",
				publisher: "JAMA Network Open",
				year: 2025,
				url:
					"https://consensus.app/papers/control-group-outcomes-in-trials-of-psilocybin-ssris-or-hieronymus-lpez/2c5831e6b3b75317be8d29e441328887/",
				stance: "debate",
				note:
					"Meta-analysis warning that lower control-group improvement in psilocybin trials than in SSRI or esketamine trials may mean psilocybin efficacy is overestimated because of control and blinding challenges.",
				order: 6
			},
			{
				kind: "guideline",
				title: "Depression in adults: treatment and management",
				publisher: "NICE",
				year: 2026,
				url: "https://www.nice.org.uk/guidance/ng222/chapter/recommendations",
				stance: "context",
				note:
					"Clinical-care context for established depression assessment, shared decision-making, psychological therapies, antidepressant options, and severity-based treatment pathways.",
				order: 7
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
	},
	{
		topicSlug: "active-debates",
		title: "Is social media proven to be the main cause of worsening teen mental health?",
		slug: "is-social-media-proven-to-be-the-main-cause-of-worsening-teen-mental-health",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 68,
		evidenceCertainty: "low",
		reviewMode: "living",
		bottomLine:
			"Not as a single proven main cause. The evidence supports real concern: problematic use, online harassment, sleep displacement, social comparison, and some high-use patterns are associated with worse adolescent mental-health outcomes. But broad claims that social media is the primary population-level cause of the teen mental-health crisis remain unsettled because effects vary, measurement is messy, and many studies cannot separate cause from consequence.",
		stableCore: [
			"Social media is nearly universal among teens, so small average effects can still matter, but ubiquity also makes causal research difficult.",
			"Evidence is stronger for riskier patterns such as problematic or compulsive use, cyberbullying, body comparison, harmful content exposure, and sleep displacement than for simple screen-time totals.",
			"Reviews commonly find positive associations with depressive or anxiety symptoms, but effect sizes are often small, heterogeneous, and sensitive to measurement choices.",
			"The National Academies concluded that the evidence does not support a population-level causal claim, while still finding enough potential harm and benefit to justify safety standards and more rigorous research.",
			"Social media can also provide connection, identity support, health information, and peer support for some adolescents, so the practical question is not only 'how much' but 'what kind, for whom, and under what safeguards?'"
		],
		openQuestions: [
			"Which platform features, recommendation systems, content types, and interaction patterns cause harm rather than merely correlate with distress?",
			"Which adolescents are most vulnerable or most likely to benefit, and how do age, sex, puberty timing, disability, LGBTQ+ status, family context, and baseline mental health change effects?",
			"How much do sleep loss, bullying, body image, social comparison, fear of missing out, and displacement of offline activity mediate the relationship?",
			"What safety standards, design changes, age-appropriate defaults, school policies, and family practices reduce harm without removing useful social support?",
			"How should studies use platform data, natural experiments, randomized designs, and within-person longitudinal methods while protecting youth privacy?"
		],
		whatWouldChangeMinds: [
			"Large, independent longitudinal, quasi-experimental, or randomized evidence showing that specific social-media exposures explain a large share of population-level adolescent mental-health changes after accounting for confounders.",
			"Platform-data studies showing that changing specific design features reliably improves or worsens adolescent mental-health outcomes.",
			"Conversely, rigorous evidence showing that social-media exposure adds little risk after sleep, bullying, body image, family stress, offline social support, and baseline mental health are measured well."
		],
		misconceptions: [
			"'Social media is associated with depression' does not automatically mean social media caused the depression.",
			"'Not proven as the main cause' does not mean harmless; some uses and some adolescents carry higher risk.",
			"Screen-time totals are a rough signal, not a diagnosis of the experience, content, social context, or platform design.",
			"Benefits for isolated or marginalized teens do not erase harms from harassment, comparison, addictive design, or sleep disruption."
		],
		editorSummary:
			"This page should keep the public debate honest: there is a meaningful risk signal and good reason for safeguards, but the evidence does not justify a simple single-cause story for the teen mental-health crisis.",
		uncertaintySummary:
			"Certainty is low for population-level causal attribution and moderate for associations between problematic social media use and internalizing symptoms. The key uncertainty is not whether some adolescents can be harmed; it is effect size, direction of causation, vulnerable subgroups, and which platform features or behaviors are most responsible.",
		uncertaintyDrivers: [
			{
				type: "bias",
				detail:
					"Many studies rely on self-reported use, cross-sectional designs, and unmeasured family, school, health, and offline-social factors."
			},
			{
				type: "indirectness",
				detail:
					"Time spent on social media can combine very different experiences, from supportive messaging to harassment, body comparison, or harmful content."
			},
			{
				type: "timing",
				detail:
					"Longitudinal studies help with ordering, but mental-health symptoms can begin before they are measured and can change later social-media use."
			},
			{
				type: "generalizability",
				detail:
					"Average associations may hide large person-specific differences by age, sex, developmental stage, vulnerability, platform, and use pattern."
			}
		],
		searchDatabases: ["Consensus", "National Academies", "HHS"],
		searchCutoffAt: "2026-07-04T19:45:00.000Z",
		lastRetractionCheckAt: "2026-07-04T19:45:00.000Z",
		inclusionRules: [
			"Prioritize umbrella reviews, systematic reviews, meta-analyses, longitudinal studies, and institutional reviews focused on adolescents.",
			"Separate general time spent from problematic use, passive browsing, harassment, social comparison, sleep displacement, and harmful-content exposure.",
			"Treat policy and clinical recommendations as safeguards under uncertainty unless they are backed by causal effect estimates."
		],
		exclusionRules: [
			"Do not use litigation claims, platform statements, opinion essays, or viral anecdotes as evidence of causal effect size.",
			"Do not generalize adult, college-student, gaming-only, or smartphone-only evidence to adolescent social-media effects unless the source supports it.",
			"Do not present social media as either uniformly toxic or uniformly beneficial."
		],
		evidenceSummaries: [
			{
				question: "Does social media use explain worsening adolescent mental health?",
				population: "Children and adolescents, especially ages 10 to 18",
				finding:
					"Evidence syntheses find associations with depression, anxiety, and internalizing symptoms, especially for problematic use, but the National Academies found the evidence insufficient for a population-level causal conclusion.",
				effectDirection: "mixed",
				magnitude:
					"Recent syntheses range from weak or inconsistent average associations to moderate correlations for problematic use; a 2024 JAMA Pediatrics meta-analysis reported small positive correlations for time spent and user engagement.",
				certainty: "low",
				limitations: [
					"Cross-sectional designs and self-reported exposure remain common.",
					"Effects differ by use pattern, person, content, platform design, and offline context.",
					"Potential benefits such as connection and support can coexist with harms such as harassment, sleep disruption, and social comparison."
				]
			}
		],
		institutionalAnchors: [
			{
				name: "National Academies of Sciences, Engineering, and Medicine",
				role: "Consensus-study anchor for the current evidence boundary and the call for more rigorous platform and causal research."
			},
			{
				name: "U.S. Surgeon General",
				role: "Public-health anchor for acting on youth social-media risks while acknowledging major evidence gaps."
			},
			{
				name: "Adolescent mental-health evidence syntheses",
				role: "Research anchor for the difference between broad average associations and higher-risk use patterns."
			}
		],
		changeLog: [
			{
				date: "2026-07-04T19:45:00.000Z",
				kind: "publication",
				summary:
					"Initial social-media and teen mental-health active-debate page published from Consensus-located reviews, a large longitudinal cohort, the National Academies review, and the U.S. Surgeon General advisory."
			}
		],
		sources: [
			{
				kind: "consensus_statement",
				title:
					"To Minimize Harms and Maximize Benefits of Social Media to Adolescent Health, New Report Recommends Setting Industrywide Standards, New Protections Against Harassment",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2024,
				url:
					"https://www.nationalacademies.org/news/to-minimize-harms-and-maximize-benefits-of-social-media-to-adolescent-health-new-report-recommends-setting-industrywide-standards-new-protections-against-harassment",
				doi: "10.17226/27396",
				stance: "debate",
				note:
					"Consensus-study summary stating that evidence is insufficient for population-level causal claims, while social media has potential to harm and benefit adolescents and warrants safeguards plus better research.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Social Media and Youth Mental Health",
				publisher: "U.S. Surgeon General / HHS",
				year: 2023,
				url:
					"https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html",
				stance: "context",
				note:
					"Public-health advisory source for near-universal teen social-media use, the precautionary safety framing, and risk-reduction actions for families, platforms, policymakers, and researchers.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Social media use and its impact on adolescent mental health: An umbrella review of the evidence",
				publisher: "Current Opinion in Psychology",
				year: 2021,
				url:
					"https://consensus.app/papers/social-media-use-and-its-impact-on-adolescent-mental-health-valkenburg-meier/fdac706f34865008897b154ea3602095/",
				stance: "debate",
				note:
					"Umbrella review of 25 reviews finding that most reviews characterized associations as weak or inconsistent, while some interpreted the evidence as substantial and harmful.",
				order: 3
			},
			{
				kind: "meta_analysis",
				title: "Problematic Social Media Use in Adolescents and Young Adults: Systematic Review and Meta-analysis",
				publisher: "JMIR Mental Health",
				year: 2022,
				url:
					"https://consensus.app/papers/problematic-social-media-use-in-adolescents-and-young-shannon-bush/fba2069e99295b17b3a66d9fc2a19027/",
				stance: "supports",
				note:
					"Meta-analysis of 18 studies and 9,269 participants finding moderate correlations between problematic social media use and depression, anxiety, and stress symptoms.",
				order: 4
			},
			{
				kind: "meta_analysis",
				title:
					"Social Media Use and Internalizing Symptoms in Clinical and Community Adolescent Samples: A Systematic Review and Meta-Analysis",
				publisher: "JAMA Pediatrics",
				year: 2024,
				url:
					"https://consensus.app/papers/social-media-use-and-internalizing-symptoms-in-clinical-fassi-thomas/1ed622e6b8415b8bbe516a5dd648f81c/",
				stance: "supports",
				note:
					"Meta-analysis of 143 studies, 1,094,890 adolescents, and 886 effect sizes finding small positive associations between social media measures and internalizing symptoms, with limited clinical-sample evidence.",
				order: 5
			},
			{
				kind: "landmark_study",
				title: "Social Media Use and Depressive Symptoms During Early Adolescence",
				publisher: "JAMA Network Open",
				year: 2025,
				url:
					"https://consensus.app/papers/social-media-use-and-depressive-symptoms-during-early-nagata-otmar/a6be4ebb1c2e5057b6f717f80a69c8e0/",
				stance: "supports",
				note:
					"Longitudinal ABCD cohort study of 11,876 children and adolescents finding that within-person increases above usual social-media use predicted higher depressive symptoms the following year.",
				order: 6
			}
		]
	}
];

export const defaultClaims: CompleteSeedClaim[] = rawClaims.map(withResearchDefaults);
