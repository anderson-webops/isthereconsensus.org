import { evergreenExplainers } from "../data/explainers";
import { misconceptionModules } from "../data/misconceptions";

export type AskRouteDestination = "claim" | "topic" | "explainer" | "thread";
export type AskKind = "claim" | "topic" | "concept" | "discussion";

export interface AskQueryAnalysis {
	normalized: string;
	segments: string[];
	looksLoaded: boolean;
	hasMultipleQuestions: boolean;
	isDefinition: boolean;
	isMechanism: boolean;
	isTopicOverview: boolean;
	isEvidenceSeeking: boolean;
	isPersonalAdvice: boolean;
	isRecencyEvent: boolean;
	recommendedDestination: AskRouteDestination;
	neutralReframes: string[];
}

export interface AskLibraryMatch {
	slug: string;
	title: string;
	summary: string;
	reason: string;
	score: number;
}

const whitespaceRegex = /\s+/g;
const normalizePunctuationRegex = /[^\p{L}\p{N}\s]/gu;
const punctuationQuestionRegex = /[!?]+/g;
const splitQuestionRegex = /[?\n;]+/;
const splitAlsoRegex = /\b(?:also|plus|and what about)\b/i;
const splitBundleRegex = /\b(?:and is it|and does it|and do they|and can it|and what about)\b/i;
const trailingPunctuationRegex = /[?.!]+$/g;
const neutralLeadRegex = /^(?:why|how)\s+(?:is|are|do|does|did|can|could|would|should)\s+/i;
const loadedLeadRegex = /^(?:why|how)\s+(?:is|are|do|does|did|can|could|would|should)\b/i;
const loadedContentRegex = /cause|change|hoax|hiding|lying|poison|fake|cover/i;
const evidenceSeekingRegex = /how do we know|what'?s the evidence|what evidence|why should i trust|who funded/i;
const personalAdviceRegex = /should i|safe for me|for my child|for my baby|my symptoms|can i take|what should i do/i;
const recencyRegex = /latest|today|just saw|viral|new study|new paper|tiktok|youtube|instagram|this week/i;

const definitionPatterns = [
	/^\s*what is\b/i,
	/^\s*what are\b/i,
	/^\s*what's\b/i,
	/^\s*difference between\b/i,
	/^\s*define\b/i
];
const mechanismPatterns = [/^\s*how does\b/i, /^\s*how do\b/i, /^\s*how can\b/i, /^\s*why does\b/i];

const explainerKeywords: Record<string, string[]> = {
	"how-consensus-forms": ["consensus", "agree", "agreement", "experts", "expert", "settled", "debate"],
	"hierarchy-of-evidence": ["evidence", "study", "studies", "meta-analysis", "meta", "review", "literature"],
	"correlation-vs-causation": ["cause", "causes", "linked", "link", "association", "correlation", "confounding"],
	"relative-vs-absolute-risk": ["risk", "chance", "relative", "absolute", "side effect", "percentage", "odds"],
	"replication-and-correction": ["replication", "replicate", "retraction", "corrected", "correction", "fraud"],
	"falsifiability-and-mind-changes": ["prove wrong", "falsify", "changed minds", "change minds", "what would change"],
	"preprints-press-releases-and-headlines": ["preprint", "headline", "press release", "peer review", "new study"],
	"statistics-beyond-p-values": ["p-value", "significant", "confidence interval", "effect size", "underpowered"],
	"hazard-vs-risk-and-exposure": ["hazard", "risk", "dose", "exposure", "toxin", "chemical", "safe level"],
	"reading-science-news": ["headline", "news", "article", "source", "media", "viral", "screenshot"],
	"uncertainty-and-trust": ["uncertainty", "confidence", "likely", "models", "trust", "how sure"]
};

const misconceptionKeywords: Record<string, string[]> = {
	"one-study-doesnt-overturn-evidence": ["single study", "one study", "new study", "paper", "latest study"],
	"correlation-isnt-causation": ["cause", "causes", "linked", "association", "correlation", "confounding"],
	"relative-risk-can-mislead": ["risk", "percent", "percentage", "double", "triples", "chance"],
	"anecdotes-are-not-population-evidence": ["my friend", "i saw", "story", "anecdote", "reports", "vaers"],
	"cherry-picking-distorts-the-evidence": ["cherry pick", "one graph", "one paper", "only study", "picked"],
	"preprints-are-preliminary": ["preprint", "not peer reviewed", "early paper", "just published"],
	"mechanism-is-not-real-world-effect": ["mechanism", "dna", "biomarker", "cells", "mice", "animal study"],
	"scientists-changing-their-minds-is-normal": ["changed their minds", "flip flop", "used to say", "contradiction"],
	"false-balance-misleads": ["both sides", "some scientists say", "experts disagree", "split"],
	"uncertainty-isnt-ignorance": ["uncertain", "not sure", "models", "confidence", "nobody knows"],
	"p-values-are-not-the-whole-story": ["significant", "p-value", "confidence interval", "statistically"],
	"hazard-is-not-the-same-as-risk": ["hazard", "risk", "toxic", "toxin", "chemical", "exposure", "dose"]
};

const loadedTerms = [
	"hoax",
	"cover-up",
	"cover up",
	"hiding",
	"lying",
	"suppressed",
	"poison",
	"toxin",
	"brainwash",
	"fake"
];
const broadTopicTerms = [
	"climate change",
	"global warming",
	"vaccines",
	"gmos",
	"genetic engineering",
	"nutrition",
	"supplements",
	"brain health",
	"mental health"
];

function normalizeQuery(value: string) {
	return value.toLowerCase().replace(normalizePunctuationRegex, " ").replace(whitespaceRegex, " ").trim();
}

function unique<T>(values: T[]) {
	return [...new Set(values)];
}

function buildSegments(value: string) {
	const cleaned = value.replace(whitespaceRegex, " ").trim();
	if (!cleaned) return [];

	const rawSegments = cleaned
		.replace(punctuationQuestionRegex, "?")
		.split(splitQuestionRegex)
		.flatMap((segment) => segment.split(splitAlsoRegex))
		.map((segment) => segment.trim())
		.filter(Boolean);

	if (rawSegments.length > 1) return rawSegments.slice(0, 4);

	const clauseSegments = cleaned
		.split(splitBundleRegex)
		.map((segment) => segment.trim())
		.filter(Boolean);

	return clauseSegments.length > 1 ? clauseSegments.slice(0, 4) : rawSegments;
}

function startsWithPattern(value: string, patterns: RegExp[]) {
	return patterns.some((pattern) => pattern.test(value));
}

function stripTerminalPunctuation(value: string) {
	return value.replace(trailingPunctuationRegex, "").trim();
}

function decapitalize(value: string) {
	if (!value) return value;
	return value.charAt(0).toLowerCase() + value.slice(1);
}

function buildNeutralReframes(value: string, looksLoaded: boolean) {
	if (!looksLoaded) return [];
	const trimmed = stripTerminalPunctuation(value);
	const stripped = trimmed.replace(neutralLeadRegex, "");
	const base = decapitalize(stripped || trimmed);
	if (!base) return [];

	const subject = base.split(whitespaceRegex).slice(0, 8).join(" ");

	return unique([
		`Is it true that ${base}?`,
		`What evidence supports or contradicts the claim that ${base}?`,
		`What do experts agree on about ${subject}?`
	]).slice(0, 3);
}

export function analyzeAskQuery(value: string): AskQueryAnalysis {
	const normalized = normalizeQuery(value);
	const segments = buildSegments(value);
	const looksLoaded =
		loadedTerms.some((term) => normalized.includes(term)) ||
		(loadedLeadRegex.test(value) && loadedContentRegex.test(value));
	const isDefinition = startsWithPattern(value, definitionPatterns);
	const isMechanism = startsWithPattern(value, mechanismPatterns);
	const isEvidenceSeeking = evidenceSeekingRegex.test(value);
	const isPersonalAdvice = personalAdviceRegex.test(value);
	const isRecencyEvent = recencyRegex.test(value);
	const shortBroadQuery = normalized.split(whitespaceRegex).filter(Boolean).length <= 3;
	const isTopicOverview = broadTopicTerms.some((term) => normalized.includes(term)) || shortBroadQuery;
	const hasMultipleQuestions = segments.length > 1;

	let recommendedDestination: AskRouteDestination = "claim";
	if (isPersonalAdvice) {
		recommendedDestination = "thread";
	} else if (looksLoaded) {
		recommendedDestination = "claim";
	} else if (isDefinition || isMechanism) {
		recommendedDestination = "explainer";
	} else if ((isTopicOverview && !looksLoaded && !isEvidenceSeeking) || (hasMultipleQuestions && !looksLoaded)) {
		recommendedDestination = "topic";
	}

	return {
		normalized,
		segments,
		looksLoaded,
		hasMultipleQuestions,
		isDefinition,
		isMechanism,
		isTopicOverview,
		isEvidenceSeeking,
		isPersonalAdvice,
		isRecencyEvent,
		recommendedDestination,
		neutralReframes: buildNeutralReframes(value, looksLoaded)
	};
}

function scoreMatch(query: string, title: string, summary: string, keywords: string[]) {
	const normalizedQuery = normalizeQuery(query);
	const normalizedTitle = normalizeQuery(title);
	const normalizedSummary = normalizeQuery(summary);
	const haystack = `${normalizedTitle} ${normalizedSummary}`;
	const queryTokens = normalizedQuery.split(whitespaceRegex).filter((token) => token.length > 2);
	const matchedKeywords = keywords.filter((keyword) => normalizedQuery.includes(keyword));
	const matchedTokens = queryTokens.filter((token) => haystack.includes(token));

	let score = 0;
	if (!normalizedQuery) {
		return {
			matchedKeywords: [] as string[],
			matchedTokens: [] as string[],
			score: 0
		};
	}
	if (normalizedTitle === normalizedQuery) score += 110;
	else if (normalizedTitle.includes(normalizedQuery) && normalizedQuery.length > 4) score += 92;
	else if (haystack.includes(normalizedQuery) && normalizedQuery.length > 4) score += 78;

	score += matchedKeywords.length * 22;
	score += unique(matchedTokens).length * 8;

	return {
		matchedKeywords: unique(matchedKeywords),
		matchedTokens: unique(matchedTokens),
		score
	};
}

function buildReason(matchedKeywords: string[], matchedTokens: string[], fallback: string) {
	if (matchedKeywords.length) return `Related terms: ${matchedKeywords.slice(0, 3).join(", ")}`;
	if (matchedTokens.length) return `Matches wording like: ${matchedTokens.slice(0, 3).join(", ")}`;
	return fallback;
}

export function matchExplainers(query: string) {
	return evergreenExplainers
		.map((item) => {
			const keywords = explainerKeywords[item.slug] || [];
			const match = scoreMatch(query, item.title, `${item.summary} ${item.whatPeopleGetWrong}`, keywords);

			return {
				reason: buildReason(
					match.matchedKeywords,
					match.matchedTokens,
					"Useful concept explainer for this question"
				),
				score: match.score,
				slug: item.slug,
				summary: item.summary,
				title: item.title
			};
		})
		.filter((item) => item.score > 0)
		.sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
		.slice(0, 4);
}

export function matchMisconceptionModules(query: string) {
	return misconceptionModules
		.map((item) => {
			const keywords = misconceptionKeywords[item.slug] || [];
			const match = scoreMatch(query, item.title, `${item.diagnosis} ${item.shortCorrection}`, keywords);

			return {
				reason: buildReason(
					match.matchedKeywords,
					match.matchedTokens,
					"Useful correction when a question arrives with a loaded premise or headline-shaped frame"
				),
				score: match.score,
				slug: item.slug,
				summary: item.shortCorrection,
				title: item.title
			};
		})
		.filter((item) => item.score > 0)
		.sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
		.slice(0, 4);
}

export function defaultAskKind(query: AskQueryAnalysis): AskKind {
	if (query.recommendedDestination === "explainer") return "concept";
	if (query.recommendedDestination === "topic") return "topic";
	if (query.recommendedDestination === "claim") return "claim";
	return "discussion";
}

export function matchStrengthLabel(score?: number) {
	if (!score) return "Related";
	if (score >= 100) return "Best match";
	if (score >= 80) return "Likely relevant";
	return "Related";
}
