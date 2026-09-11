import { defaultClaims } from "../src/data/claims.js";
import { getDemandAdjustedClaimSearchScore } from "../src/data/contentDemand.js";
import { defaultTopics } from "../src/data/topics.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";
import { analyzeSearchMatch, searchMatchIsDisplayable } from "../src/utils/searchMatch.js";
import { coveredSearchQuestions, unsupportedSearchQuestions } from "./fixtures/search-benchmark.js";

const referenceDate = new Date("2026-09-11T00:00:00Z");
const topics = new Map(defaultTopics.map(topic => [topic.slug, topic]));
const catalog = new Map(defaultClaims.map(claim => [claim.slug, claim]));
// Reproduce both public endpoint rankers at d5a5543, including their different
// topic-description inputs. This baseline is not the new algorithm's oracle.
function baseline(query: string, directory: boolean) {
	return defaultClaims.map((claim) => {
		const topic = topics.get(claim.topicSlug);
		const haystack = [claim.bottomLine, claim.editorSummary, ...claim.misconceptions, ...(claim.misconceptionTags ?? []), topic?.title ?? "", directory ? topic?.description ?? "" : ""].join(" ").trim();
		const title = analyzeSearchMatch(query, claim.title);
		const body = analyzeSearchMatch(query, haystack);
		const match = title.matchScore >= body.matchScore ? title : body;
		return { claim, match, score: getDemandAdjustedClaimSearchScore(match.matchScore, claim.topicSlug, claim.slug, referenceDate) };
	}).filter(row => searchMatchIsDisplayable(row.match)).sort((left, right) => right.score - left.score || (directory
		? (topics.get(left.claim.topicSlug)?.title ?? "").localeCompare(topics.get(right.claim.topicSlug)?.title ?? "")
		: 0) || left.claim.title.localeCompare(right.claim.title));
}

const start = performance.now();
const search = createClaimSearchIndex(defaultClaims);
const indexMs = performance.now() - start;
const rows = coveredSearchQuestions.map(([query, expected]) => ({
	query,
	topic: catalog.get(expected)!.topicSlug,
	oldSuggestions: baseline(query, false).slice(0, 3).some(row => row.claim.slug === expected),
	oldDirectory: baseline(query, true).slice(0, 3).some(row => row.claim.slug === expected),
	current: search(query, referenceDate).slice(0, 3).some(row => row.claim.slug === expected)
}));
console.log(JSON.stringify({
	catalogClaims: defaultClaims.length,
	coveredQuestions: rows.length,
	oldSuggestionsTopThree: rows.filter(row => row.oldSuggestions).length,
	oldDirectoryTopThree: rows.filter(row => row.oldDirectory).length,
	currentTopThree: rows.filter(row => row.current).length,
	unsupportedQuestions: unsupportedSearchQuestions.length,
	oldSuggestionsCorrectlyEmpty: unsupportedSearchQuestions.filter(query => !baseline(query, false).length).length,
	oldDirectoryCorrectlyEmpty: unsupportedSearchQuestions.filter(query => !baseline(query, true).length).length,
	currentCorrectlyEmpty: unsupportedSearchQuestions.filter(query => !search(query, referenceDate).length).length,
	indexBuildMs: Math.round(indexMs),
	perTopic: [...new Set(rows.map(row => row.topic))].sort().map(topic => ({
		topic,
		questions: rows.filter(row => row.topic === topic).length,
		topThree: rows.filter(row => row.topic === topic && row.current).length
	})),
	misses: rows.filter(row => !row.current)
}, null, 2));
