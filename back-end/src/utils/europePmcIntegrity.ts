import type { SourceIntegrityObservation, SourceIntegritySignal } from "./sourceIntegrity.js";
import { fetchJsonBounded } from "./boundedFetch.js";
import {
	IntegrityProviderError,
	normalizeDoi,
	requireIntegrityResponse,
	statusForUpdateType,
	strongerCitationStatus
} from "./sourceIntegrity.js";

export function europePmcIntegrityUrl(doi: string) {
	const normalized = normalizeDoi(doi);
	if (!normalized) throw new IntegrityProviderError("invalid_doi");
	const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
	url.searchParams.set("query", `DOI:"${normalized}"`);
	url.searchParams.set("resultType", "core");
	url.searchParams.set("format", "json");
	url.searchParams.set("pageSize", "100");
	return url;
}

function object(value: unknown): Record<string, unknown> {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new IntegrityProviderError("invalid_response");
	}
	return value as Record<string, unknown>;
}

function list(value: unknown, key: string): unknown[] {
	if (value === undefined) return [];
	const items = object(value)[key];
	if (!Array.isArray(items)) throw new IntegrityProviderError("invalid_response");
	return items;
}

function text(value: unknown) {
	if (typeof value !== "string" || value.length > 500) throw new IntegrityProviderError("invalid_response");
	return value.trim();
}

function recordUrl(id: string, source: string) {
	if (!/^[A-Z]{2,10}$/u.test(source) || !/^[\w.-]{1,80}$/u.test(id)) {
		throw new IntegrityProviderError("invalid_record_identity");
	}
	return `https://europepmc.org/article/${source}/${encodeURIComponent(id)}`;
}

// The original work points *in* to its notice. "For" and "of" describe a
// notice's target; treating those as warnings on the notice reverses the evidence.
const incomingNotices: Record<string, string> = {
	"retraction in": "retraction",
	"erratum in": "correction",
	"expression of concern in": "expression_of_concern",
	"corrected and republished in": "correction",
	"retracted and republished in": "retraction"
};

export function parseEuropePmcIntegrityResponse(payload: unknown, targetDoi: string): SourceIntegrityObservation {
	const doi = normalizeDoi(targetDoi);
	if (!doi) throw new IntegrityProviderError("invalid_doi");
	const response = object(payload);
	const records = list(response.resultList, "result");
	if (!response.resultList || !Number.isSafeInteger(response.hitCount) || Number(response.hitCount) < 0
		|| response.hitCount !== records.length || records.length > 100) {
		throw new IntegrityProviderError("invalid_or_truncated_response");
	}
	const queryUrl = europePmcIntegrityUrl(doi).toString();
	const signals: SourceIntegritySignal[] = [];
	const recordIds: string[] = [];
	for (const value of records) {
		const record = object(value);
		if (normalizeDoi(record.doi) !== doi) throw new IntegrityProviderError("identity_mismatch");
		const id = text(record.id);
		const source = text(record.source);
		const url = recordUrl(id, source);
		recordIds.push(`${source}:${id}`);
		for (const item of list(record.commentCorrectionList, "commentCorrection")) {
			const relation = object(item);
			const label = text(relation.type);
			const type = incomingNotices[label.toLowerCase()];
			if (!type) continue;
			signals.push({
				type,
				label,
				url: recordUrl(text(relation.id), text(relation.source)),
				source: `Europe PMC ${source}`
			});
		}
		if (list(record.pubTypeList, "pubType").some(type => text(type).toLowerCase() === "retracted publication")
			&& !signals.some(signal => signal.type === "retraction")) {
			signals.push({ type: "retraction", label: "Retracted publication", url, source: `Europe PMC ${source}` });
		}
	}
	const compact = [...new Map(signals.map(signal => [`${signal.type}:${signal.url}`, signal])).values()]
		.sort((left, right) => `${left.type}:${left.url}`.localeCompare(`${right.type}:${right.url}`));
	if (compact.length > 100) throw new IntegrityProviderError("too_many_notices");
	let status = strongerCitationStatus("current");
	for (const signal of compact) status = strongerCitationStatus(status, statusForUpdateType(signal.type));
	const suggestedStatus = status === "current" ? undefined : status;
	return {
		provider: "europepmc",
		doi,
		queryUrl,
		providerVersion: response.version === undefined ? undefined : text(response.version).slice(0, 40),
		recordIds: [...new Set(recordIds)].sort(),
		outcome: suggestedStatus ?? (records.length ? "no_registered_update" : "not_indexed"),
		suggestedStatus,
		signals: compact,
		statusSources: [...new Set([...compact.map(signal => signal.url!), queryUrl])]
	};
}

export async function fetchEuropePmcIntegrityObservation(doi: string) {
	const { data } = await fetchJsonBounded<unknown>(europePmcIntegrityUrl(doi), {
		headers: { "Accept": "application/json", "User-Agent": "isthereconsensus-source-monitor/2.0" }
	}, { maxBytes: 2 * 1024 * 1024, timeoutMs: 12_000, validateResponse: requireIntegrityResponse });
	return parseEuropePmcIntegrityResponse(data, doi);
}
