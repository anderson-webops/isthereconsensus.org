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
const aliases = new Map<string, string>([
	["childhood", "child"],
	["children", "child"],
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

function normalize(value: string) {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/\p{M}/gu, "")
		.replace(/[^\p{L}\p{N}\s]/gu, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function canonicalize(value: string) {
	const aliased = aliases.get(value);
	if (aliased) return aliased;
	if (value.length > 5 && value.endsWith("ies")) return `${value.slice(0, -3)}y`;
	if (value.length > 4 && value.endsWith("es")) return value.slice(0, -2);
	if (value.length > 3 && value.endsWith("s") && !value.endsWith("ss")) return value.slice(0, -1);
	return value;
}

function tokens(value: string) {
	return [
		...new Set(
			normalize(value)
				.split(" ")
				.filter(Boolean)
				.filter((token) => !stopWords.has(token))
				.filter((token) => token.length >= 3 || shortScientificTerms.has(token))
				.map(canonicalize)
		)
	];
}

export function matchesSearchQuery(query: string, values: Array<string | undefined>) {
	const normalizedQuery = normalize(query);
	if (!normalizedQuery) return true;

	const queryTokens = tokens(normalizedQuery);
	if (!queryTokens.length) return false;

	const haystack = normalize(values.filter(Boolean).join(" "));
	if (` ${haystack} `.includes(` ${normalizedQuery} `)) return true;

	const haystackTokens = new Set(tokens(haystack));
	const overlap = queryTokens.filter((token) => haystackTokens.has(token)).length;
	const minimumOverlap = queryTokens.length === 1 ? 1 : Math.max(2, Math.ceil(queryTokens.length / 2));
	return overlap >= minimumOverlap;
}
