import type { SearchMatch } from "./searchMatch.js";
import { getClaimDemandBoost } from "../data/contentDemand.js";

export interface SearchableClaim {
	title: string;
	slug: string;
	topicSlug?: string;
	bottomLine?: string;
	editorSummary?: string;
	misconceptions?: string[];
}

// These are retrieval equivalents, not assertions that the underlying things
// are interchangeable. A result always links to the original reviewed claim.
const equivalents = [
	["caffeine", "coffee"],
	["medicine", "medication", "medications", "drug", "drugs", "medicines"],
	["vaccine", "vaccines", "vaccination", "vaccinations", "immunization", "immunisation", "vaccinated"],
	["child", "children", "childhood", "childs"],
	["human", "humans", "people"],
	["sleep", "sleeping", "asleep"],
	["breath", "breathing", "respiratory"],
	["house", "housing", "home", "indoor"],
	["effective", "effectiveness", "working", "work", "works"],
	["regular", "regularly", "daily", "habitual"],
	["disease", "illness"],
	["injury", "injuries", "injure"],
	["harm", "harmful", "hurt", "damage", "bad"],
	["safe", "safety", "safely"],
	["energy", "power", "electricity"],
	["two", "2"],
	["thirty", "30"],
	["minute", "minutes"],
	["genetic", "genetically"],
	["gmo", "gmos"],
	["carbon", "co2"],
	["up", "upward"],
	["sea", "marine"],
	["outdoor", "outdoors", "free-ranging"],
	["diabetes", "diabetic"],
	["testosterone", "testosteron"],
	["large", "big"],
	["powder", "shakes", "shake"],
	["eliminate", "fix", "solve"]
];
const aliases = new Map(equivalents.flatMap(([canonical, ...variants]) =>
	[canonical, ...variants].map(variant => [variant, canonical] as const)
));
const phraseAliases: Array<[RegExp, string]> = [
	[/\bcapital punishment\b/gu, "death penalty"],
	[/\bmurder\b/gu, "homicide"],
	[/\bbody clock\b/gu, "circadian clock"],
	[/\bempty space\b/gu, "vacuum"],
	[/\bsmall loans\b/gu, "microcredit"],
	[/\bgenetically modified\b/gu, "gmo"],
	[/\bbrand names?\b/gu, "brand"],
	[/\btoo little sleep\b/gu, "sleep restriction"],
	[/\blost sleep\b/gu, "sleep debt"],
	[/\bclean energy\b/gu, "low carbon energy"],
	[/\bartery disease\b/gu, "atherosclerosis"],
	[/\b(?:lose|loses|losing)(?: its| their)? effects?\b/gu, "tolerance"],
	[/\bless effective\b/gu, "tolerance"],
	[/\bstopped working\b/gu, "tolerance"]
];
const stopWords = new Set((
	"a an the and or of to in on for from by with without as at about "
	+ "is are was were be been being do does did can could will would should must "
	+ "i me my we us you your it its they them their our this that those these "
	+ "what why how when where which who if than then so also just only really "
	+ "always still ever generally most some any all enough more less much many "
	+ "ones itself themselves instead rather completely entirely take make go into become"
).split(" "));

function normalize(value: string) {
	return value.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/['’]/gu, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function stem(token: string) {
	if (aliases.has(token)) return aliases.get(token)!;
	if (token.length > 5 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
	if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3).replace(/(.)\1$/u, "$1");
	if (token.length > 5 && token.endsWith("ed")) return token.slice(0, -2);
	if (token.length > 3 && token.endsWith("s") && !/(?:ss|us|is)$/u.test(token)) return token.slice(0, -1);
	return token;
}

function tokens(value: string) {
	let text = normalize(value);
	for (const [pattern, replacement] of phraseAliases) text = text.replace(pattern, replacement);
	return [...new Set(text.split(" ").filter(token => (token.length > 1 || /^\d+$/u.test(token)) && !stopWords.has(token)).map(stem).filter(token => !stopWords.has(token)))];
}

function oneEditApart(left: string, right: string) {
	if (Math.abs(left.length - right.length) > 1) return false;
	if (left.length === right.length) {
		const differences = [...left].map((char, index) => char === right[index] ? -1 : index).filter(index => index >= 0);
		if (differences.length === 1) return true;
		const [first, second] = differences;
		return differences.length === 2 && second === first + 1 && left[first] === right[second] && left[second] === right[first];
	}
	const [short, long] = left.length < right.length ? [left, right] : [right, left];
	let offset = 0;
	for (let i = 0; i < short.length; i++) {
		if (short[i] !== long[i + offset]) {
			if (offset || short[i] !== long[i + 1]) return false;
			offset = 1;
		}
	}
	return true;
}

/** Build once per loaded catalog. No database writes or remote search service. */
export function createClaimSearchIndex<T extends SearchableClaim>(claims: T[]) {
	const documents = claims.map((claim) => {
		const title = new Set(tokens(claim.title));
		const body = new Set(tokens([claim.bottomLine, claim.editorSummary, ...(claim.misconceptions ?? [])].join(" ")));
		return { claim, title, body, terms: new Set([...title, ...body]) };
	});
	const frequencies = new Map<string, number>();
	const titleVocabulary = new Set<string>();
	for (const document of documents) {
		for (const term of document.terms) frequencies.set(term, (frequencies.get(term) ?? 0) + 1);
		for (const term of document.title) titleVocabulary.add(term);
	}
	const weight = (term: string) => Math.log(1 + (documents.length + 1) / (1 + (frequencies.get(term) ?? 0)));

	return (query: string, referenceDate = new Date()) => {
		const rawTerms = tokens(query.slice(0, 160));
		let corrected = false;
		const terms = [...new Set(rawTerms.map((term) => {
			if (frequencies.has(term) || term.length < 5) return term;
			const candidates = [...titleVocabulary].filter(candidate => candidate.length >= 5 && oneEditApart(term, candidate));
			if (candidates.length !== 1) return term;
			corrected = true;
			return candidates[0];
		}))];
		if (!terms.length) return [];
		const totalWeight = terms.reduce((sum, term) => sum + weight(term), 0);
		const exactPhrase = normalize(query);

		return documents.flatMap(({ claim, title, body, terms: documentTerms }) => {
			const matched = terms.filter(term => documentTerms.has(term));
			const titleMatched = terms.filter(term => title.has(term));
			const matchedWeight = matched.reduce((sum, term) => sum + weight(term), 0);
			const coverage = matchedWeight / totalWeight;
			// Unmatched distinctive subjects must not be erased by common words.
			// At least one query concept must appear in the claim's actual title.
			if (!titleMatched.length || coverage < 0.72 || (terms.length <= 3 && matched.length !== terms.length) || (terms.length > 1 && matched.length < 2)) return [];
			const exact = normalize(claim.title) === exactPhrase;
			const titleWeight = titleMatched.reduce((sum, term) => sum + weight(term), 0) / totalWeight;
			const bodyWeight = terms.filter(term => body.has(term)).reduce((sum, term) => sum + weight(term), 0) / totalWeight;
			const titleFocus = titleMatched.length / Math.max(title.size, 1);
			const matchScore = exact ? 200 : Math.round(60 * coverage + 65 * titleWeight + 10 * bodyWeight + 10 * titleFocus);
			const match: SearchMatch = {
				matchScore,
				matchStrength: exact ? "exact" : titleWeight >= 0.7 && coverage >= 0.85 ? "close" : "related",
				matchReason: exact ? "Exact wording match" : corrected ? "Related wording, with spelling tolerance" : titleWeight >= 0.7 ? "Matches the question's main concepts" : "Related evidence; check the review's scope"
			};
			return [{ claim, match, rankingScore: matchScore + getClaimDemandBoost(claim.topicSlug ?? "", claim.slug, referenceDate) * 0.15 }];
		}).sort((left, right) => right.rankingScore - left.rankingScore || left.claim.title.localeCompare(right.claim.title));
	};
}
