import type { ClaimConsensusBand, ClaimEvidenceCertainty } from "../models/schemas/Claim.js";
import type { SeedClaim } from "./claims.js";

export const novemberResearchCheckedAt = "2026-11-06T16:02:04.000Z";

export function researchSource(
	title: string,
	publisher: string,
	year: number,
	url: string,
	doi: string,
	note: string,
	kind: SeedClaim["sources"][number]["kind"] = "meta_analysis",
	stance: SeedClaim["sources"][number]["stance"] = "supports",
	checkedAt = novemberResearchCheckedAt
): SeedClaim["sources"][number] {
	return {
		title,
		publisher,
		year,
		url,
		...(doi
			? { doi }
			: {}),
		note,
		kind,
		stance,
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: checkedAt,
		statusSources: doi
			? [`https://doi.org/${doi}`, `https://api.crossref.org/works?filter=${encodeURIComponent(`updates:${doi}`)}&rows=100`]
			: [url],
		order: 1
	};
}

interface ReviewedEntry {
	topicSlug: string;
	slug: string;
	title: string;
	bottomLine: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	editorSummary: string;
	population: string;
	scope: string;
	uncertainty: string;
	sources: SeedClaim["sources"];
	band?: ClaimConsensusBand;
	certainty?: ClaimEvidenceCertainty;
}

export function reviewedEntry(entry: ReviewedEntry, checkedAt = novemberResearchCheckedAt): SeedClaim {
	const band = entry.band ?? "broad";
	const certainty = entry.certainty ?? "moderate";
	return {
		topicSlug: entry.topicSlug,
		slug: entry.slug,
		title: entry.title,
		status: "draft",
		consensusBand: band,
		agreementLevel: band === "mixed"
			? "divided"
			: "broad_qualified",
		evidenceCertainty: certainty,
		confidenceScore: band === "mixed"
			? 58
			: 76,
		reviewMode: "living",
		bottomLine: entry.bottomLine,
		stableCore: entry.stableCore,
		openQuestions: entry.openQuestions,
		whatWouldChangeMinds: entry.whatWouldChangeMinds,
		misconceptions: entry.misconceptions,
		editorSummary: entry.editorSummary,
		uncertaintySummary: entry.uncertainty,
		uncertaintyDrivers: [
			{ type: "generalizability", detail: entry.scope },
			{ type: "inconsistency", detail: entry.uncertainty }
		],
		searchDatabases: ["Consensus.app targeted paper search", "Publisher and institutional article records"],
		searchCutoffAt: checkedAt,
		inclusionRules: [entry.scope, `Population and setting: ${entry.population}`],
		exclusionRules: ["Do not interpret average group differences as guaranteed individual results or as a measured percentage of expert agreement."],
		appraisalTools: ["Source-design and scope screening, with Crossref registered-update checks for cited DOIs; no formal GRADE assessment or comprehensive systematic search completed"],
		evidenceSummaries: [
			{
				question: entry.title,
				population: entry.population,
				finding: entry.bottomLine,
				effectDirection: band === "mixed"
					? "mixed"
					: "supports",
				certainty,
				limitations: [entry.uncertainty]
			}
		],
		institutionalAnchors: [],
		misconceptionTags: [],
		authorLine: "AI-assisted research summary prepared for Is There Consensus.",
		reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
		coiSummary: "Funding and conflicts were not independently audited; consult the cited papers' disclosures.",
		independenceSummary: "Reviews can include overlapping studies. The number of citations is not a count of independent experiments or expert votes.",
		lastRetractionCheckAt: checkedAt,
		changeLog: [
			{ date: checkedAt, kind: "review", summary: "Research sources and scope checked with AI assistance; independent expert review is not recorded." }
		],
		surveillanceSpec: {
			focus: entry.title,
			cadenceDays: 180,
			watchTerms: [entry.title],
			integrityMonitors: ["Publisher correction and retraction notices for the cited sources"],
			guidelineMonitors: ["Relevant updated research syntheses"],
			triggerRules: entry.whatWouldChangeMinds
		},
		sources: entry.sources.map((source, index) => ({ ...source, order: index + 1, isAnchor: index === 0 }))
	};
}
