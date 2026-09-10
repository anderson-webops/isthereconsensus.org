import type { ClaimSourceCitationStatus } from "../models/schemas/ClaimSource.js";
import { fetchJsonBounded } from "./boundedFetch.js";

export const SOURCE_INTEGRITY_OUTCOMES = [
	"no_registered_update",
	"corrected",
	"expression_of_concern",
	"retracted",
	"unsupported",
	"error"
] as const;
export const SOURCE_INTEGRITY_CLAIM_STATUSES = ["published", "needs_update"] as const;

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
	provider: "crossref";
	doi: string;
	outcome: Exclude<SourceIntegrityOutcome, "error" | "unsupported">;
	suggestedStatus?: ClaimSourceCitationStatus;
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
	message?: {
		items?: unknown;
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
	const normalized = cleanText(value, 240)
		.toLowerCase()
		.replace(/^https?:\/\/(?:dx\.)?doi\.org\//u, "")
		.replace(/^doi:\s*/u, "")
		.trim();
	return /^10\.\d{4,9}\/\S+$/u.test(normalized) ? normalized : "";
}

export function strongerCitationStatus(
	current: ClaimSourceCitationStatus,
	observed?: ClaimSourceCitationStatus
) {
	if (!observed) return current;
	return statusRank[observed] > statusRank[current] ? observed : current;
}

function statusForUpdateType(type: string): ClaimSourceCitationStatus | undefined {
	if (retractedUpdateTypes.has(type)) return "retracted";
	if (type === "expression_of_concern") return "expression_of_concern";
	if (correctedUpdateTypes.has(type)) return "corrected";
	return undefined;
}

function safeNoticeUrl(doi: string) {
	return doi ? `https://doi.org/${doi}` : undefined;
}

function uniqueStrings(values: Array<string | undefined>, limit = 6) {
	return [...new Set(values.filter((value): value is string => Boolean(value)))].slice(0, limit);
}

export function crossrefIntegrityUrl(doi: string, mailto = "") {
	const normalizedDoi = normalizeDoi(doi);
	if (!normalizedDoi) throw new Error("A valid DOI is required for a Crossref integrity check.");
	const url = new URL("https://api.crossref.org/works");
	url.searchParams.set("filter", `updates:${normalizedDoi}`);
	url.searchParams.set("rows", "20");
	if (mailto.trim()) url.searchParams.set("mailto", mailto.trim());
	return url;
}

export function parseCrossrefIntegrityResponse(payload: unknown, targetDoi: string): SourceIntegrityObservation {
	const doi = normalizeDoi(targetDoi);
	if (!doi) throw new Error("A valid DOI is required for a Crossref integrity check.");
	const response = payload as CrossrefResponse;
	const items = Array.isArray(response?.message?.items)
		? response.message.items.filter((item): item is CrossrefUpdateWork => Boolean(item && typeof item === "object"))
		: [];
	const signals: SourceIntegritySignal[] = [];

	for (const item of items) {
		const updateRelations = Array.isArray(item["update-to"])
			? item["update-to"].filter(
					(relation): relation is CrossrefUpdateRelation => Boolean(relation && typeof relation === "object")
				)
			: [];
		for (const relation of updateRelations) {
			if (normalizeDoi(relation.DOI) !== doi) continue;
			const type = cleanText(relation.type, 64).toLowerCase().replaceAll(/[\s-]+/g, "_");
			if (!statusForUpdateType(type)) continue;
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
		.slice(0, 20);

	return {
		provider: "crossref",
		doi,
		outcome,
		suggestedStatus,
		signals: compactSignals,
		statusSources: uniqueStrings([
			...compactSignals.map(signal => signal.url),
			queryUrl
		])
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
		{ maxBytes: 2 * 1024 * 1024, timeoutMs: 12_000 }
	);
	if (!response.ok) throw new Error(`Crossref returned status ${response.status}.`);
	return parseCrossrefIntegrityResponse(data, doi);
}
