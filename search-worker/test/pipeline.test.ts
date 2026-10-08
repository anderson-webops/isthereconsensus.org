import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { publicSearchWorkerPayload, publicSearchWorkerRequestSchema } from "../../back-end/src/utils/publicSearchWorker.js";
import { createAcceptedPipeline, parseRoles, publicPassages } from "../src/pipeline.js";

const referenceDate = new Date("2026-10-07T00:00:00Z");
const claim = {
	title: "Can engine cooling pumps reduce pressure?",
	slug: "synthetic-pump",
	status: "published",
	topicSlug: "synthetic-machines",
	bottomLine: "Engine cooling pumps can reduce pressure under the described conditions.",
	editorSummary: "An operating measurement is not a universal promise.",
	stableCore: ["Pressure measurements depend on the complete installation."],
	misconceptions: ["Cooling pumps cure orbital drift."],
	misconceptionTags: []
};
const corpus = publicSearchWorkerRequestSchema.parse(publicSearchWorkerPayload([claim], "Does a pump help?", referenceDate)).corpus;

describe("complete paragraph search representation", () => {
	it("uses complete actual paragraphs in field order, never misconceptions as affirmative evidence", () => {
		const passages = publicPassages(corpus);
		assert.equal(passages.length, 3);
		assert.deepEqual(passages.map(row => row.id), ["synthetic-pump:bottomLine:0", "synthetic-pump:editorSummary:0", "synthetic-pump:stableCore:0"]);
		assert.equal(passages[0].text, `${claim.title}\n\n${claim.bottomLine}`);
		assert.ok(passages.every(row => !row.text.includes("orbital drift")));
	});
	it("keeps whole title-only fixtures rather than inventing a paragraph", () => {
		const titleOnly = { ...corpus[0], bottomLine: "", editorSummary: "", stableCore: [] };
		assert.deepEqual(publicPassages([titleOnly]), [{ id: "synthetic-pump:title:0", slug: "synthetic-pump", ordinal: 0, text: claim.title }]);
	});
	it("preserves exact title priority before unsupported-intent filtering", () => {
		const pipeline = createAcceptedPipeline(corpus, [], [], referenceDate);
		assert.equal(pipeline.terminal(claim.title).results[0]?.claim.slug, claim.slug);
		assert.equal(pipeline.terminal("What is the password to my account?").reason, "account-secret");
	});
	it("keeps noun-participle source roles while rejecting unsupported complex clauses", () => {
		for (const query of ["Can engine cooling pumps reduce pressure?", "Can sound absorbing panels reduce pressure?", "Can pressure balancing valves reduce pressure?"]) assert.ok(parseRoles(query, true));
		for (const query of ["Can helping a pump reduce pressure?", "Can people run and cooling pumps reduce pressure?", "Can workers can cooling pumps reduce pressure?"]) assert.equal(parseRoles(query, true), null);
		assert.deepEqual(parseRoles(claim.title)?.subject, parseRoles(claim.title, true)?.subject);
	});
	it("applies the parent five-result ceiling before corrected scope, without replenishment", () => {
		const claims = Array.from({ length: 6 }, (_, index) => ({ ...corpus[0], slug: `synthetic-${index}`, title: `Distinct system ${index}`, bottomLine: "Pressure balancing valves reduce pressure.", editorSummary: "", stableCore: [] }));
		claims[0].bottomLine = "Can engine cooling pumps reduce pressure?";
		const query = "Can engine cooling pumps reduce pressure?";
		const pipeline = createAcceptedPipeline(claims, [], [], referenceDate);
		const prepared = pipeline.prepare(query);
		prepared.candidates = claims.map(source => ({ slug: source.slug, cosine: 0.9, passageId: `${source.slug}:bottomLine:0`, document: source.bottomLine }));
		const predictions = claims.map((source, index) => ({ rawLogit: 5 - index * 0.1, relevance: 0.99 - index * 0.01 }));
		const result = pipeline.finish(prepared, predictions);
		assert.equal(result.filter(row => row.kind === "paragraph").length, 1);
		assert.equal(result.find(row => row.kind === "paragraph")?.slug, "synthetic-0");
		assert.ok(!result.some(row => row.kind === "paragraph" && row.slug === "synthetic-5"));
	});
	it("requires numeric evidence and direction in the same reviewed scope", () => {
		assert.notDeepEqual(parseRoles("Can pressure reduce engine cooling pumps?", true), parseRoles(claim.title, true));
		const pipeline = createAcceptedPipeline(corpus, [], [], referenceDate);
		const prepared = pipeline.prepare("Can 10000 engine cooling pumps reduce pressure?");
		prepared.candidates = [{ slug: claim.slug, cosine: 0.9, passageId: "synthetic-pump:bottomLine:0", document: claim.bottomLine }];
		assert.deepEqual(pipeline.finish(prepared, [{ rawLogit: 5, relevance: 0.99 }]), []);
	});
});
