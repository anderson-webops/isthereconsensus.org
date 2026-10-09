import type { PublicSearchWorkerRequest, PublicSearchWorkerResponse } from "../../back-end/src/utils/publicSearchWorker.js";
import assert from "node:assert/strict";
import winkModel from "wink-eng-lite-web-model";
import winkNLP from "wink-nlp";
import { getClaimDemandBoost } from "../../back-end/src/data/contentDemand.js";
import { claimSearchLanguage, createClaimSearchIndex } from "../../back-end/src/utils/claimSearch.js";

type CorpusClaim = PublicSearchWorkerRequest["corpus"][number];
type NativeRow = ReturnType<ReturnType<typeof createClaimSearchIndex<CorpusClaim>>>[number];
interface Role { subject: string[]; outcome: string[]; negative: boolean }
interface WordRole { word: string; part: string }
export interface Passage { id: string; slug: string; ordinal: number; text: string }
export interface PassageVector { id: string; slug: string; vector: number[] }
export interface Candidate { slug: string; cosine: number; passageId: string; document: string }
export interface Prediction { rawLogit: number; relevance: number }
interface SemanticRow extends NativeRow, Candidate, Prediction {}
interface Prepared {
	query: string;
	terminal: boolean;
	reason: string | null;
	parsed: boolean;
	native: NativeRow[];
	priority: NativeRow[];
	candidates: Candidate[];
	results: NativeRow[];
}

const nlp = winkNLP(winkModel);
const { normalize, tokens, contractions, isPersonalTreatmentDecision } = claimSearchLanguage;
const predicates = ["increase", "decrease", "reduce", "raise", "lower", "improve", "worsen", "cause", "prevent", "affect", "influence", "change", "support", "protect", "help", "harm", "damage", "boost", "alter", "determine", "promote", "predict", "contribute", "reverse", "overturn", "restore", "cure", "repair", "cool", "supply", "work"];
const predicatePattern = predicates.flatMap(predicate => [predicate, `${predicate}s`, predicate.endsWith("e") ? `${predicate}d` : `${predicate}ed`, `${predicate.endsWith("e") ? predicate.slice(0, -1) : predicate}ing`]).toSorted((left, right) => right.length - left.length).join("|");
const finitePredicatePattern = predicates.toSorted((left, right) => right.length - left.length).join("|");
const auxiliary = "does|do|did|can|could|will|would|should|may|might";
const nominalParts = ["NOUN", "PROPN"];
const covers = (requested: string[], available: string[]) => requested.every(term => available.includes(term));

export function parseRoles(value: string, query = false, corrected = true): Role | null {
	const expanded = value.toLowerCase().replace(/’/gu, "'").replace(/\b[a-z]+'[a-z]+\b/gu, word => contractions.get(word) ?? word);
	const text = normalize(expanded);
	const auxiliaryQuestion = new RegExp(`^(?:how )?(?:${auxiliary})\\b`, "u").test(text);
	const activePredicatePattern = auxiliaryQuestion && (corrected || query) ? finitePredicatePattern : predicatePattern;
	let matched = /^what (?:is|are) (?:the )?effects? of (.+?) (?:on|upon) (.+)$/u.exec(text);
	const functional = (
		/^what is (.+?)(?:'s|') (?:role|function) (?:in|on|for) (.+)$/u.exec(expanded.trim())
		|| /^what is (?:the )?(?:role|function) of (.+?) (?:in|on|for) (.+)$/u.exec(text)
		|| /^what (?:role|function) (?:does|do) (.+?) (?:play|have) (?:in|on|for) (.+)$/u.exec(text)
	);
	let subject: string | undefined;
	let outcome: string | undefined;
	let negative = false;
	let explicitEffectFrame = Boolean(matched || functional);
	if (functional) {
		[subject, outcome] = [functional[1], functional[2]];
		negative = /\b(?:not|no|never)\b/u.test(`${subject} ${outcome}`);
	}
	else if (matched) {
		[subject, outcome] = [matched[1], matched[2]];
	}
	else {
		matched = new RegExp(`^what effects? (?:${auxiliary}) (.+?) have (?:on|upon) (.+)$`, "u").exec(text);
		if (matched) {
			[subject, outcome] = [matched[1], matched[2]];
			explicitEffectFrame = true;
		}
		else {
			matched = new RegExp(`^(?:how )?(?:${auxiliary}) (not )?(.+?) (not |never )?(${activePredicatePattern}) (.+)$`, "u").exec(text);
			if (matched) {
				[subject, outcome] = [matched[2], matched[5]];
				negative = Boolean(matched[1] || matched[3]);
			}
			else {
				matched = new RegExp(`^(.+?) (?:(?:${auxiliary}) )?(not |never )?(${activePredicatePattern}) (.+)$`, "u").exec(text);
				if (matched) {
					[subject, outcome] = [matched[1], matched[4]];
					negative = Boolean(matched[2]);
				}
			}
		}
	}
	if (!subject || !outcome) return null;
	if (query && !explicitEffectFrame) {
		const document = nlp.readDoc(text);
		const words = document.tokens().out() as string[];
		const parts = document.tokens().out(nlp.its.pos) as string[];
		const span = (phrase: string, minimumIndex = 0): WordRole[] | null => {
			const fragment = phrase.split(" ");
			const first = words.findIndex((word, index) => index >= minimumIndex && fragment.every((token, offset) => words[index + offset] === token));
			return first < 0 ? null : fragment.map((word, offset) => ({ word, part: parts[first + offset] }));
		};
		const subjectSpan = span(subject);
		const subjectWords = subject.split(" ");
		const subjectFirst = words.findIndex((word, index) => subjectWords.every((token, offset) => words[index + offset] === token));
		const outcomeSpan = span(outcome, corrected ? subjectFirst + subjectWords.length : 0);
		const compoundNoun = outcomeSpan && outcomeSpan.length >= 2 && outcomeSpan.slice(0, -1).every(token => !["VERB", "AUX"].includes(token.part)) && nominalParts.includes(outcomeSpan.at(-2)!.part) && [...nominalParts, "VERB"].includes(outcomeSpan.at(-1)!.part);
		const initialNominal = (role: WordRole[] | null) => role && (nominalParts.includes(role[0].part) || (role[0].part === "VERB" && !predicates.includes(role[0].word) && (nominalParts.includes((nlp.readDoc(role[0].word).tokens().out(nlp.its.pos) as string[])[0]) || nominalParts.includes((nlp.readDoc(`the ${role[0].word}`).tokens().out(nlp.its.pos) as string[])[1]))));
		const nominalModifier = (role: WordRole[] | null) => initialNominal(role) && role && (role.length === 1 || (role.length >= 3 && role[1].word.endsWith("ing") && nominalParts.includes(role.at(-1)!.part) && role.slice(1).every(token => [...nominalParts, "ADJ"].includes(token.part) || (token.part === "VERB" && token.word.endsWith("ing")))));
		const nominalModifierSubject = corrected && nominalModifier(subjectSpan);
		const nominalModifierOutcome = corrected && nominalModifier(outcomeSpan);
		if (!subjectSpan || !outcomeSpan || /^\w+ing\b/u.test(subject) || subjectSpan.some((token, index) => ["VERB", "AUX"].includes(token.part) && !token.word.endsWith("ing") && !(nominalModifierSubject && index === 0 && token.part === "VERB")) || outcomeSpan.some((token, index) => ["VERB", "AUX"].includes(token.part) && !((compoundNoun && index === outcomeSpan.length - 1 && token.part === "VERB") || (nominalModifierOutcome && token.part === "VERB")))) return null;
	}
	const subjectTerms = tokens(subject).filter(term => !["not", "no", "never"].includes(term));
	const outcomeTerms = tokens(outcome).filter(term => !["not", "no", "never"].includes(term));
	return subjectTerms.length && outcomeTerms.length ? { subject: subjectTerms, outcome: outcomeTerms, negative } : null;
}

function unsupportedIntent(query: string) {
	const text = normalize(query);
	if (isPersonalTreatmentDecision(query)) return "personal-prescribed-treatment-change";
	if (/\bhow (?:much|many)\b/u.test(text) && /\b(?:my|our) (?:child|son|daughter|baby|infant|partner|parent)\b/u.test(text) && /\btake\b/u.test(text)) return "individual-dosing";
	if (/\b(?:tablets?|pills?|medicine|medication)\b/u.test(text) && /\b(?:which|what)\b/u.test(text) && /\b(?:take|use)\b/u.test(text) && /\b(?:my|our) symptoms\b|\bsymptoms (?:i|we) (?:have|am having)\b/u.test(text)) return "individual-treatment-choice";
	if (/\b(?:dose|dosage|doses|milligrams|mg)\b/u.test(text) && /\b(?:i|me|my|we|our|tonight)\b/u.test(text)) return "individual-dosing";
	if (/\b(?:diagnose|diagnosis)\b/u.test(text) && /\b(?:i|me|my|we|our|having)\b/u.test(text)) return "individual-diagnosis";
	if (/\b(?:my|our|current) symptoms\b/u.test(text) && /\b(?:guarantee|harmless)\b/u.test(text)) return "individual-diagnosis";
	if (/\b(?:password|passcode|pin|access code) (?:to|for|of) (?:my|our|your|their|his|her|a|the|somebody|someone)\b/u.test(text)) return "account-secret";
	if (/\b(?:opening hours|phone number|appointments?|available today|can board)\b/u.test(text)) return "service-request";
	if (/\b(?:cheapest|best price|buy|purchase|ticket prices|insurance quote|installer|repair manual)\b/u.test(text)) return "shopping-service";
	if (/\b(?:refund|return)\b/u.test(text) && /\b(?:ordered|bought|purchase|shoes|item|order|laptop)\b/u.test(text)) return "transaction-support";
	if (/\b(?:write|compose|draft|give me)\b/u.test(text) && /\b(?:card|letter|email|poem|story|recipe)\b/u.test(text)) return "content-generation";
	if (/\b(?:stock|cryptocurrency|bitcoin|candidate|election|forecast|scores|timetable|football)\b/u.test(text) && /\b(?:will|next|tomorrow|yesterday|this month|end of this month|current)\b/u.test(text)) return "current-prediction";
	if (/^(?:how|where) (?:can|could|do|should) (?:i|we) (?:get|obtain|access|find|receive|download)\b/u.test(text) && /\b(?:information|data|publications?|releases?|statistics|reports?|updates?)\b/u.test(text)) return "information-access";
	if (/^how (?:can|could|do|should) (?:i|we) (?:stay|keep) (?:up to date|updated|informed)\b/u.test(text)) return "information-subscription";
	if (/^(?:what|which) (?:types|kinds|categories) of (?:data|information|statistics|reports|publications) (?:are|is) (?:published|released|available|produced)(?: by .+)?$/u.test(text)) return "information-catalog";
	return null;
}

export function publicPassages(claims: CorpusClaim[]): Passage[] {
	const passages = claims.flatMap((claim) => {
		const paragraphs: Array<[string, number, string]> = [
			["bottomLine", 0, claim.bottomLine],
			["editorSummary", 0, claim.editorSummary],
			...claim.stableCore.map((paragraph, index): [string, number, string] => ["stableCore", index, paragraph])
		];
		const populated = paragraphs.filter(([, , text]) => text.trim());
		if (!populated.length) return [{ id: `${claim.slug}:title:0`, slug: claim.slug, ordinal: 0, text: claim.title }];
		return populated.map(([field, index, text], ordinal) => ({ id: `${claim.slug}:${field}:${index}`, slug: claim.slug, ordinal, text: `${claim.title}\n\n${text}` }));
	});
	assert.equal(new Set(passages.map(passage => passage.id)).size, passages.length);
	assert.ok(passages.length <= 20_000, "The complete corpus exceeds its passage capacity.");
	return passages;
}

export function createParagraphPipeline(claims: CorpusClaim[], passages: Passage[], vectors: PassageVector[], referenceDate: Date, corrected: boolean) {
	const native = createClaimSearchIndex(claims);
	const sourceBySlug = new Map(claims.map(claim => [claim.slug, {
		claim,
		numbers: tokens([claim.title, claim.bottomLine, claim.editorSummary, ...claim.stableCore, ...claim.misconceptions].join(" ")).filter(term => /^\d+$/u.test(term)),
		clauses: [claim.title, claim.bottomLine, claim.editorSummary, ...claim.stableCore].flatMap(value => value.split(/(?<=[.!?;])\s+|\n+/u)).map(value => parseRoles(value, false, corrected)).filter((value): value is Role => Boolean(value))
	}]));
	const passageById = new Map(passages.map(passage => [passage.id, passage]));
	assert.equal(passages.length, vectors.length);
	assert.ok(vectors.every(row => passageById.get(row.id)?.slug === row.slug && row.vector.length === 384 && row.vector.every(Number.isFinite) && Math.abs(Math.hypot(...row.vector) - 1) < 0.001));
	function prepare(query: string, queryVector?: number[]): Prepared {
		const nativeResults = native(query, referenceDate);
		const initial: Prepared = { query, terminal: true, parsed: false, reason: null, results: [], native: [], priority: [], candidates: [] };
		if (nativeResults[0]?.match.matchStrength === "exact") return { ...initial, results: nativeResults, reason: "native-exact" };
		const unsupported = unsupportedIntent(query);
		if (unsupported) return { ...initial, reason: unsupported };
		const requested = parseRoles(query, true, corrected);
		const numbers = tokens(query).filter(term => /^\d+$/u.test(term));
		const scopeMatches = (clause: Role) => requested && covers(requested.subject, clause.subject) && covers(requested.outcome, clause.outcome) && (!requested.negative || clause.negative);
		const numericMatches = (slug: string) => covers(numbers, sourceBySlug.get(slug)!.numbers);
		const inverted = (slug: string) => requested && sourceBySlug.get(slug)!.clauses.some(clause => covers(requested.subject, clause.outcome) && covers(requested.outcome, clause.subject)) && !sourceBySlug.get(slug)!.clauses.some(scopeMatches);
		const retained = nativeResults.filter(row => numericMatches(row.claim.slug) && !inverted(row.claim.slug) && (!requested?.negative || sourceBySlug.get(row.claim.slug)!.clauses.some(scopeMatches)));
		const priority = retained.filter(row => row.match.matchStrength === "exact" || row.match.matchStrength === "close");
		const prioritySlugs = new Set(priority.map(row => row.claim.slug));
		const strongest = new Map<string, { slug: string; cosine: number; passage: Passage; claim: CorpusClaim }>();
		if (queryVector) {
			assert.equal(queryVector.length, 384);
			assert.ok(queryVector.every(Number.isFinite));
			for (const row of vectors) {
				const passage = passageById.get(row.id)!;
				const score = queryVector.reduce((total, component, index) => total + component * row.vector[index], 0);
				const previous = strongest.get(row.slug);
				if (!previous || score > previous.cosine || (score === previous.cosine && passage.ordinal < previous.passage.ordinal)) strongest.set(row.slug, { slug: row.slug, cosine: score, passage, claim: sourceBySlug.get(row.slug)!.claim });
			}
		}
		const nominations = [...strongest.values()].sort((left, right) => right.cosine - left.cosine || left.claim.title.localeCompare(right.claim.title)).slice(0, 30);
		const candidates = nominations.filter(row => row.cosine >= 0.65 && !prioritySlugs.has(row.slug) && numericMatches(row.slug) && (!requested || sourceBySlug.get(row.slug)!.clauses.some(scopeMatches))).map(row => ({ slug: row.slug, cosine: row.cosine, passageId: row.passage.id, document: row.passage.text }));
		return { ...initial, terminal: false, native: retained, priority, parsed: Boolean(requested), candidates };
	}
	function finish(prepared: Prepared, predictions: Prediction[]) {
		if (prepared.terminal) return { ...prepared, diagnostics: [] as SemanticRow[] };
		assert.equal(predictions.length, prepared.candidates.length);
		const semantic: SemanticRow[] = prepared.candidates.map((candidate, index) => ({ ...candidate, ...predictions[index], claim: sourceBySlug.get(candidate.slug)!.claim })).filter(row => row.relevance >= 0.8).map(row => ({
			...row,
			match: { matchStrength: "related" as const, matchScore: Math.round(row.relevance * 100), matchReason: "Related public source paragraph; check the review's scope" },
			rankingScore: row.relevance * 100 + getClaimDemandBoost(row.claim.topicSlug, row.claim.slug, referenceDate) * 0.15
		})).sort((left, right) => right.rankingScore - left.rankingScore || left.claim.title.localeCompare(right.claim.title)).slice(0, 5);
		const results: Array<NativeRow | SemanticRow> = [];
		const seen = new Set<string>();
		const take = (row: NativeRow | SemanticRow | undefined) => {
			if (row && !seen.has(row.claim.slug)) {
				results.push(row);
				seen.add(row.claim.slug);
			}
		};
		for (const row of prepared.priority) take(row);
		const unusedSemantic = semantic.filter(row => !seen.has(row.claim.slug));
		if (corrected) {
			const fused = new Map<string, { row: NativeRow | SemanticRow; score: number; nativeRank: number; semanticRank: number }>();
			for (const [ranking, kind] of [[prepared.native, "native"], [semantic, "semantic"]] as const) {
				for (const [index, row] of ranking.entries()) {
					const previous = fused.get(row.claim.slug) ?? { row, score: 0, nativeRank: Number.POSITIVE_INFINITY, semanticRank: Number.POSITIVE_INFINITY };
					previous.score += 1 / (60 + index + 1);
					if (kind === "native") {
						previous.nativeRank = index + 1;
					}
					else {
						previous.semanticRank = index + 1;
						previous.row = row;
					}
					fused.set(row.claim.slug, previous);
				}
			}
			const ordered = [...fused.values()].sort((left, right) => right.score - left.score || left.nativeRank - right.nativeRank || left.semanticRank - right.semanticRank || left.row.claim.title.localeCompare(right.row.claim.title));
			for (const entry of ordered) take(entry.row);
		}
		else {
			for (const row of unusedSemantic.slice(0, 2)) take(row);
			take(prepared.native.find(row => !seen.has(row.claim.slug)));
			for (const row of unusedSemantic.slice(2)) take(row);
			for (const row of prepared.native) take(row);
		}
		return { ...prepared, results, diagnostics: semantic };
	}
	function scopeEligible(query: string, slug: string) {
		const requested = parseRoles(query, true, corrected);
		const source = sourceBySlug.get(slug);
		if (!source) return false;
		const numbers = tokens(query).filter(term => /^\d+$/u.test(term));
		return covers(numbers, source.numbers) && (!requested || source.clauses.some(clause => covers(requested.subject, clause.subject) && covers(requested.outcome, clause.outcome) && (!requested.negative || clause.negative)));
	}
	return { prepare, finish, scopeEligible };
}

export function createAcceptedPipeline(claims: CorpusClaim[], passages: Passage[], vectors: PassageVector[], referenceDate: Date) {
	const parent = createParagraphPipeline(claims, passages, vectors, referenceDate, false);
	const corrected = createParagraphPipeline(claims, [], [], referenceDate, true);
	return {
		terminal: (query: string) => parent.prepare(query),
		prepare: parent.prepare,
		finish(prepared: Prepared, predictions: Prediction[]): PublicSearchWorkerResponse["rows"] {
			const admitted = parent.finish(prepared, predictions).diagnostics;
			const retained = admitted.filter(row => corrected.scopeEligible(prepared.query, row.slug));
			const correctedPrepared = { ...corrected.prepare(prepared.query), candidates: retained.map(row => ({ slug: row.slug, cosine: row.cosine, passageId: row.passageId, document: row.document })) };
			const finished = corrected.finish(correctedPrepared, retained.map(row => ({ rawLogit: row.rawLogit, relevance: row.relevance })));
			return finished.results.map((row) => {
				const semantic = finished.diagnostics.find(candidate => candidate === row);
				return semantic
					? { slug: row.claim.slug, kind: "paragraph" as const, relevance: semantic.relevance, cosine: semantic.cosine }
					: { slug: row.claim.slug, kind: "native" as const };
			});
		}
	};
}
