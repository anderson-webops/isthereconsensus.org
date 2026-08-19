export type SearchMatchStrength = "exact" | "close" | "related" | "none";

export interface SearchMatch {
	matchReason: string;
	matchScore: number;
	matchStrength: SearchMatchStrength;
}

export const MIN_SEARCH_MATCH_SCORE = 52;

const stopWords = new Set([
	"a",
	"about",
	"an",
	"and",
	"are",
	"as",
	"at",
	"be",
	"by",
	"can",
	"could",
	"did",
	"do",
	"does",
	"for",
	"from",
	"how",
	"if",
	"in",
	"is",
	"it",
	"of",
	"on",
	"or",
	"should",
	"that",
	"the",
	"this",
	"to",
	"was",
	"were",
	"what",
	"when",
	"where",
	"which",
	"who",
	"why",
	"will",
	"with",
	"would"
]);

const shortScientificTerms = new Set(["ai", "ev", "ph", "rf"]);
const tokenAliases = new Map<string, string>([
	["childhood", "child"],
	["children", "child"],
	["coronavirus", "covid"],
	["gmos", "gmo"],
	["immunisation", "vaccine"],
	["immunisations", "vaccine"],
	["immunization", "vaccine"],
	["immunizations", "vaccine"],
	["vaccinated", "vaccine"],
	["vaccination", "vaccine"],
	["vaccinations", "vaccine"],
	["vaccines", "vaccine"]
]);

const nonWordPattern = /[^\p{L}\p{N}\s]/gu;
const whitespacePattern = /\s+/g;

function emptyMatch(): SearchMatch {
	return {
		matchReason: "",
		matchScore: 0,
		matchStrength: "none"
	};
}

function normalizePhrase(value: string) {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/\p{M}/gu, "")
		.replace(nonWordPattern, " ")
		.replace(whitespacePattern, " ")
		.trim();
}

function canonicalizeToken(value: string) {
	const aliased = tokenAliases.get(value);
	if (aliased) return aliased;
	if (value.length > 5 && value.endsWith("ies")) return `${value.slice(0, -3)}y`;
	if (value.length > 5 && value.endsWith("ing")) return value.slice(0, -3);
	if (value.length > 4 && value.endsWith("ed")) return value.slice(0, -2);
	if (value.length > 4 && value.endsWith("es")) return value.slice(0, -2);
	if (value.length > 3 && value.endsWith("s") && !value.endsWith("ss")) return value.slice(0, -1);
	return value;
}

function meaningfulTokens(value: string) {
	return [
		...new Set(
			normalizePhrase(value)
				.split(" ")
				.filter(Boolean)
				.filter(token => !stopWords.has(token))
				.filter(token => token.length >= 3 || shortScientificTerms.has(token))
				.map(canonicalizeToken)
		)
	];
}

function hasWholePhrase(haystack: string, query: string) {
	return ` ${haystack} `.includes(` ${query} `);
}

export function analyzeSearchMatch(query: string, haystack: string): SearchMatch {
	if (!query || !haystack) return emptyMatch();

	const normalizedQuery = normalizePhrase(query);
	const normalizedHaystack = normalizePhrase(haystack);
	const queryTokens = meaningfulTokens(normalizedQuery);
	if (!normalizedQuery || !normalizedHaystack || !queryTokens.length) return emptyMatch();

	if (normalizedHaystack === normalizedQuery) {
		return {
			matchReason: "Exact wording match",
			matchScore: 120,
			matchStrength: "exact"
		};
	}
	if (normalizedHaystack.startsWith(`${normalizedQuery} `)) {
		return {
			matchReason: "Starts with the same wording",
			matchScore: 105,
			matchStrength: "close"
		};
	}
	if (hasWholePhrase(normalizedHaystack, normalizedQuery)) {
		return {
			matchReason: "Contains the same phrasing",
			matchScore: 92,
			matchStrength: "close"
		};
	}

	const haystackTokens = new Set(meaningfulTokens(normalizedHaystack));
	const overlap = queryTokens.filter(token => haystackTokens.has(token));
	if (!overlap.length) return emptyMatch();

	if (queryTokens.length === 1) {
		return {
			matchReason: `Matches term: ${overlap[0]}`,
			matchScore: 64,
			matchStrength: "related"
		};
	}

	const coverage = overlap.length / queryTokens.length;
	if (coverage === 1) {
		return {
			matchReason: `Matches terms: ${overlap.slice(0, 3).join(", ")}`,
			matchScore: Math.min(88, 72 + queryTokens.length * 4),
			matchStrength: "close"
		};
	}
	if (overlap.length >= 2 && coverage >= 0.5) {
		return {
			matchReason: `Matches terms: ${overlap.slice(0, 3).join(", ")}`,
			matchScore: Math.round(48 + coverage * 30),
			matchStrength: "related"
		};
	}

	return emptyMatch();
}

export function searchMatchIsDisplayable(match: SearchMatch) {
	return match.matchScore >= MIN_SEARCH_MATCH_SCORE;
}
