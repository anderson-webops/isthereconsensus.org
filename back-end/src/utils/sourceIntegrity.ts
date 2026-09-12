import type { ClaimSourceCitationStatus } from "../models/schemas/ClaimSource.js";
import { fetchJsonBounded } from "./boundedFetch.js";

export const SOURCE_INTEGRITY_OUTCOMES = [
	"no_registered_update",
	"corrected",
	"expression_of_concern",
	"retracted",
	"not_indexed",
	"unsupported",
	"error"
] as const;
export const SOURCE_INTEGRITY_CLAIM_STATUSES = ["published", "needs_update"] as const;

export const SOURCE_INTEGRITY_PROVIDERS = ["crossref", "europepmc"] as const;
export type SourceIntegrityProvider = (typeof SOURCE_INTEGRITY_PROVIDERS)[number];

export type SourceIntegrityOutcome = (typeof SOURCE_INTEGRITY_OUTCOMES)[number];

export interface SourceIntegritySignal {
	type: string;
	label?: string;
	noticeDoi?: string;
	url?: string;
	source?: string;
	updatedAt?: string;
}

export interface SourceIntegrityObservation {
	provider: SourceIntegrityProvider;
	doi: string;
	outcome: Exclude<SourceIntegrityOutcome, "error" | "unsupported">;
	suggestedStatus?: ClaimSourceCitationStatus;
	queryUrl?: string;
	providerVersion?: string;
	recordIds?: string[];
	signals: SourceIntegritySignal[];
	statusSources: string[];
}

interface CrossrefUpdateRelation {
	DOI?: unknown;
	type?: unknown;
	label?: unknown;
	source?: unknown;
	updated?: {
		"date-time"?: unknown;
	};
}

interface CrossrefUpdateWork {
	"DOI"?: unknown;
	"URL"?: unknown;
	"update-to"?: unknown;
}

interface CrossrefResponse {
	status?: unknown;
	message?: {
		"items"?: unknown;
		"total-results"?: unknown;
	};
}

const statusRank: Record<ClaimSourceCitationStatus, number> = {
	current: 0,
	corrected: 1,
	expression_of_concern: 2,
	retracted: 3
};

const correctedUpdateTypes = new Set([
	"addendum",
	"clarification",
	"correction",
	"corrigendum",
	"erratum",
	"new_edition",
	"new_version"
]);
const retractedUpdateTypes = new Set(["partial_retraction", "removal", "retraction", "withdrawal"]);

function cleanText(value: unknown, maxLength = 500) {
	if (typeof value !== "string") return "";
	return value.replaceAll(/\s+/g, " ").trim().slice(0, maxLength);
}

export function normalizeDoi(value: unknown) {
	if (typeof value !== "string" || value.trim().length > 240) return "";
	const normalized = cleanText(value, 240)
		.toLowerCase()
		.replace(/^https?:\/\/(?:dx\.)?doi\.org\//u, "")
		.replace(/^doi:\s*/u, "")
		.trim();
	return /^10\.\d{4,9}\/[^\s"\\]+$/u.test(normalized) ? normalized : "";
}

export function strongerCitationStatus(
	current: ClaimSourceCitationStatus,
	observed?: ClaimSourceCitationStatus
) {
	if (!observed) return current;
	return statusRank[observed] > statusRank[current] ? observed : current;
}

export function statusForUpdateType(type: string): ClaimSourceCitationStatus | undefined {
	if (retractedUpdateTypes.has(type)) return "retracted";
	if (type === "expression_of_concern") return "expression_of_concern";
	if (correctedUpdateTypes.has(type)) return "corrected";
	return undefined;
}

function safeNoticeUrl(doi: string) {
	return doi ? `https://doi.org/${doi}` : undefined;
}

function uniqueStrings(values: Array<string | undefined>, limit = 100) {
	return [...new Set(values.filter((value): value is string => Boolean(value)))].slice(0, limit);
}

export function crossrefIntegrityUrl(doi: string, mailto = "") {
	const normalizedDoi = normalizeDoi(doi);
	if (!normalizedDoi) throw new Error("A valid DOI is required for a Crossref integrity check.");
	const url = new URL("https://api.crossref.org/works");
	url.searchParams.set("filter", `updates:${normalizedDoi}`);
	url.searchParams.set("rows", "100");
	if (mailto.trim()) url.searchParams.set("mailto", mailto.trim());
	return url;
}

export function parseCrossrefIntegrityResponse(payload: unknown, targetDoi: string): SourceIntegrityObservation {
	const doi = normalizeDoi(targetDoi);
	if (!doi) throw new Error("A valid DOI is required for a Crossref integrity check.");
	const response = payload as CrossrefResponse;
	if ((response?.status !== undefined && response.status !== "ok")
		|| !Array.isArray(response?.message?.items)
		|| response.message.items.some(item => !item || typeof item !== "object")
		|| response.message.items.length > 100
		|| (response.message["total-results"] !== undefined
			&& (!Number.isSafeInteger(response.message["total-results"])
				|| Number(response.message["total-results"]) !== response.message.items.length))) {
		throw new IntegrityProviderError("invalid_or_truncated_response");
	}
	const items = response.message.items as CrossrefUpdateWork[];
	const signals: SourceIntegritySignal[] = [];

	for (const item of items) {
		if (!Array.isArray(item["update-to"]) || !item["update-to"].length
			|| item["update-to"].some(relation => !relation || typeof relation !== "object")
			|| !normalizeDoi(item.DOI)) {
			throw new IntegrityProviderError("invalid_notice_record");
		}
		const updateRelations = item["update-to"] as CrossrefUpdateRelation[];
		if (!updateRelations.some(relation => normalizeDoi(relation.DOI) === doi)) {
			throw new IntegrityProviderError("identity_mismatch");
		}
		for (const relation of updateRelations) {
			if (normalizeDoi(relation.DOI) !== doi) continue;
			const type = cleanText(relation.type, 64).toLowerCase().replaceAll(/[\s-]+/g, "_");
			if (!statusForUpdateType(type)) throw new IntegrityProviderError("unknown_update_type");
			const noticeDoi = normalizeDoi(item.DOI);
			signals.push({
				type,
				label: cleanText(relation.label, 160) || undefined,
				noticeDoi: noticeDoi || undefined,
				url: safeNoticeUrl(noticeDoi),
				source: cleanText(relation.source, 80) || undefined,
				updatedAt: cleanText(relation.updated?.["date-time"], 40) || undefined
			});
		}
	}

	let suggestedStatus: ClaimSourceCitationStatus | undefined;
	for (const signal of signals) {
		suggestedStatus = strongerCitationStatus(suggestedStatus ?? "current", statusForUpdateType(signal.type));
	}
	if (suggestedStatus === "current") suggestedStatus = undefined;
	const outcome = suggestedStatus ?? "no_registered_update";
	if (signals.length > 100) throw new IntegrityProviderError("too_many_notices");
	const queryUrl = crossrefIntegrityUrl(doi).toString();
	const compactSignals = [...new Map(
		signals.map(signal => [
			[signal.type, signal.noticeDoi, signal.source].join("\u0000"),
			signal
		])
	).values()]
		.sort((left, right) => {
			const leftRank = statusRank[statusForUpdateType(left.type) ?? "current"];
			const rightRank = statusRank[statusForUpdateType(right.type) ?? "current"];
			return rightRank - leftRank;
		})
		.slice(0, 100);

	return {
		provider: "crossref",
		queryUrl,
		doi,
		outcome,
		suggestedStatus,
		signals: compactSignals,
		statusSources: uniqueStrings([
			...compactSignals.map(signal => signal.url),
			queryUrl
		], 101)
	};
}

export async function fetchCrossrefIntegrityObservation(
	doi: string,
	options: {
		mailto?: string;
		userAgent?: string;
	} = {}
) {
	const url = crossrefIntegrityUrl(doi, options.mailto);
	const { response, data } = await fetchJsonBounded<CrossrefResponse>(
		url,
		{
			headers: {
				"Accept": "application/json",
				"User-Agent": options.userAgent
					?? "isthereconsensus-source-monitor/1.0 (https://isthereconsensus.org/source-standards)"
			}
		},
		{ maxBytes: 2 * 1024 * 1024, timeoutMs: 12_000, validateResponse: requireIntegrityResponse }
	);
	if (!response.ok) throw new Error(`Crossref returned status ${response.status}.`);
	return parseCrossrefIntegrityResponse(data, doi);
}

// Fixed diagnostic codes only; provider bodies may contain arbitrary untrusted text.
export class IntegrityProviderError extends Error {
	constructor(public code: string, public retryAfterMs = 0) {
		super(code);
		this.name = "IntegrityProviderError";
	}
}

export function retryAfterMilliseconds(value: string | null, now = Date.now()) {
	if (!value) return 0;
	const milliseconds = /^\d+$/u.test(value) ? Number(value) * 1000 : Date.parse(value) - now;
	return Number.isFinite(milliseconds) ? Math.max(0, Math.min(milliseconds, 24 * 60 * 60 * 1000)) : 0;
}

export function requireIntegrityResponse(response: Response) {
	if (!response.ok) {
		throw new IntegrityProviderError(
			`http_${response.status}`,
			retryAfterMilliseconds(response.headers.get("retry-after"))
		);
	}
}
