import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const referenceDate = new Date("2026-10-05T00:00:00Z");
const fixture = {
	title: "Can a coastal pump maintain a steady feed?",
	slug: "synthetic-coastal-pump",
	bottomLine: "A steady feed depends on the installation.",
	stableCore: ["Backpressure and recirculation describe distinct operating conditions."],
	misconceptions: ["An installation description is not a performance measurement."],
	misconceptionTags: ["countercurrent"]
};

describe("public claim explanation search index", () => {
	it("recognizes question contractions with straight or curly apostrophes", () => {
		const claim = { title: "What is pump pressure?", slug: "synthetic-pressure" };
		const search = createClaimSearchIndex([claim]);
		for (const query of ["What's pump pressure?", "What’s pump pressure?"]) {
			assert.equal(search(query, referenceDate)[0]?.claim, claim, query);
		}
	});

	it("preserves negation when expanding contracted auxiliaries", () => {
		const positive = { title: "Does a pump increase pressure?", slug: "synthetic-positive-pressure" };
		const negative = { title: "Does a pump not increase pressure?", slug: "synthetic-negative-pressure" };
		const search = createClaimSearchIndex([positive, negative]);
		for (const query of ["Doesn't a pump increase pressure?", "Doesn’t a pump increase pressure?"]) {
			assert.deepEqual(search(query, referenceDate).map(result => result.claim.slug), [negative.slug], query);
		}
	});

	it("matches grouped integer digits without changing their value", () => {
		const tenThousand = { title: "Can a pump run at 10000 revolutions?", slug: "synthetic-ten-thousand" };
		const oneThousand = { title: "Can a pump run at 1000 revolutions?", slug: "synthetic-one-thousand" };
		const search = createClaimSearchIndex([tenThousand, oneThousand]);
		assert.deepEqual(search("pump 10,000", referenceDate).map(result => result.claim.slug), [tenThousand.slug]);
		assert.deepEqual(search("pump 1,000", referenceDate).map(result => result.claim.slug), [oneThousand.slug]);
		assert.deepEqual(search("pump 1,0000", referenceDate), []);
		assert.deepEqual(search("pump 10,001", referenceDate), []);
	});

	it("recognizes regular es plurals without claiming a spelling correction", () => {
		for (const [singular, plural] of [["loss", "losses"], ["class", "classes"], ["brush", "brushes"], ["box", "boxes"], ["buzz", "buzzes"]]) {
			const claim = { title: `Can a pump affect ${singular}?`, slug: `synthetic-${singular}` };
			const result = createClaimSearchIndex([claim])(`pump ${plural}`, referenceDate)[0];
			assert.equal(result?.claim, claim, plural);
			assert.doesNotMatch(result.match.matchReason, /spelling/u, plural);
		}
	});

	it("keeps silent e roots distinct from regular es endings", () => {
		for (const [singular, plural] of [["cache", "caches"], ["quiche", "quiches"], ["headache", "headaches"]]) {
			const claim = { title: `Can a pump affect ${singular}?`, slug: `synthetic-${singular}` };
			assert.equal(createClaimSearchIndex([claim])(`pump ${plural}`, referenceDate)[0]?.claim, claim, plural);
		}
	});

	it("retains root vowels and doubled l or s when stemming ing forms", () => {
		for (const [verb, participle] of [["agree", "agreeing"], ["call", "calling"], ["fall", "falling"], ["assess", "assessing"], ["stop", "stopping"]]) {
			const claim = { title: `Can a pump ${verb}?`, slug: `synthetic-${verb}` };
			const result = createClaimSearchIndex([claim])(`pump ${participle}`, referenceDate)[0];
			assert.equal(result?.claim, claim, participle);
			assert.doesNotMatch(result.match.matchReason, /spelling/u, participle);
		}
	});

	it("keeps unknown subjects necessary after contraction normalization", () => {
		const search = createClaimSearchIndex([fixture]);
		assert.deepEqual(search("What's pump unobtanium?", referenceDate), []);
		assert.deepEqual(search("What’s pump unobtanium?", referenceDate), []);
	});

	it("retrieves a concept present only in a public stable-core paragraph", () => {
		const results = createClaimSearchIndex([fixture])("pump backpressure", referenceDate);
		assert.equal(results[0]?.claim, fixture);
		assert.equal(results[0]?.match.matchStrength, "related");
	});

	it("retrieves explicitly supplied public misconception tags", () => {
		const results = createClaimSearchIndex([fixture])("pump countercurrent", referenceDate);
		assert.equal(results[0]?.claim.slug, fixture.slug);
	});

	it("retains search compatibility when optional explanation arrays are absent", () => {
		const legacy = { title: fixture.title, slug: fixture.slug, bottomLine: fixture.bottomLine };
		assert.equal(createClaimSearchIndex([legacy])("pump steady", referenceDate)[0]?.claim, legacy);
		assert.deepEqual(createClaimSearchIndex([legacy])("pump backpressure", referenceDate), []);
	});

	it("does not index private notes or arbitrary record properties", () => {
		const privateRecord = { ...fixture, editorNotes: "hiddenprotocol", submittedByEmail: "privateidentifier" };
		const search = createClaimSearchIndex([privateRecord]);
		assert.deepEqual(search("pump hiddenprotocol", referenceDate), []);
		assert.deepEqual(search("pump privateidentifier", referenceDate), []);
	});

	it("preserves exact-title priority when another explanation repeats its concepts", () => {
		const distractor = {
			title: "Can a coastal pump use another installation?",
			slug: "synthetic-pump-distractor",
			stableCore: [fixture.title]
		};
		const results = createClaimSearchIndex([distractor, fixture])(fixture.title, referenceDate);
		assert.equal(results[0]?.claim, fixture);
		assert.equal(results[0]?.match.matchStrength, "exact");
	});

	it("does not mutate public explanations or add generated answers", () => {
		const immutable = structuredClone(fixture);
		Object.freeze(immutable.stableCore);
		Object.freeze(immutable.misconceptions);
		Object.freeze(immutable.misconceptionTags);
		Object.freeze(immutable);
		const original = structuredClone(immutable);
		const result = createClaimSearchIndex([immutable])("pump backpressure", referenceDate)[0];
		assert.equal(result?.claim, immutable);
		assert.deepEqual(immutable, original);
		assert.deepEqual(Object.keys(result!.claim).sort(), Object.keys(original).sort());
	});

	it("declines personal requests to alter prescribed treatment rather than offering incidental evidence", () => {
		const clinicalFixture = {
			title: "How do prescription treatment changes require monitoring?",
			slug: "synthetic-treatment-context",
			stableCore: ["A public overview of treatment changes is not an individual treatment decision."]
		};
		const search = createClaimSearchIndex([clinicalFixture]);
		for (const query of [
			"Can I change my prescription?",
			"My doctor prescribed tablets. Should I double my dose?",
			"Should I switch my medication after a news story?",
			"Tell me whether to replace my prescribed treatment.",
			"May we reduce our prescribed medication?",
			"I'm stopping my prescription treatment."
		]) assert.deepEqual(search(query, referenceDate), [], query);
	});

	it("retains population-level treatment information and nonclinical personal questions", () => {
		const clinicalFixture = {
			title: "How do prescription treatment changes require monitoring?",
			slug: "synthetic-treatment-context"
		};
		const nonclinicalFixture = { ...fixture, title: "Can a pump start with backpressure?" };
		const search = createClaimSearchIndex([clinicalFixture, nonclinicalFixture]);
		assert.equal(search("prescription treatment changes", referenceDate)[0]?.claim, clinicalFixture);
		assert.equal(search("Can I start a pump with backpressure?", referenceDate)[0]?.claim, nonclinicalFixture);
	});
});
