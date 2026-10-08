import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { claimSearchLanguage, createClaimSearchIndex } from "../src/utils/claimSearch.js";

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

	it("retrieves coherent public explanations without requiring title wording", () => {
		const explanation = { title: "Can an installation run steadily?", slug: "synthetic-body-explanation", stableCore: ["Pump backpressure affects recirculation."] };
		const scattered = { title: "Can another installation run steadily?", slug: "synthetic-scattered", stableCore: ["Pump backpressure requires measurement.", "Recirculation requires observation."] };
		const tagsOnly = { title: "Can a third installation run steadily?", slug: "synthetic-tags-only", misconceptionTags: ["pump backpressure recirculation"] };
		const results = createClaimSearchIndex([scattered, tagsOnly, explanation])("pump backpressure recirculation", referenceDate);
		assert.deepEqual(results.map(result => result.claim.slug), [explanation.slug]);
		assert.equal(results[0].match.matchStrength, "related");
	});

	it("matches agreement word forms without rewriting the public explanations", () => {
		const claim = { title: "What do pump observations establish?", slug: "synthetic-agreement", stableCore: ["Observers report agreement about pump backpressure."] };
		const search = createClaimSearchIndex([claim]);
		for (const verb of ["agree", "agrees", "agreed", "agreeing", "agreement"]) {
			const result = search(`Observers ${verb} about pump backpressure`, referenceDate)[0];
			assert.equal(result?.claim, claim, verb);
			assert.equal(result.match.matchStrength, "related", verb);
			assert.doesNotMatch(result.match.matchReason, /spelling/u, verb);
		}
	});

	it("preserves unary tokenization when passed directly to array map", () => {
		const phrases = ["coffee energy", "drug power", "vaccinations electricity"];
		assert.deepEqual(phrases.map(claimSearchLanguage.tokens), phrases.map(phrase => claimSearchLanguage.tokens(phrase)));
	});

	it("prioritizes explicit comparisons over incidental title and paragraph mentions", () => {
		const explanation = { title: "Can an installation run steadily?", slug: "synthetic-comparison", stableCore: ["Pressure describes a force per area; flow measures volume per time."] };
		const incidental = { title: "Can pressure affect a pump?", slug: "synthetic-incidental", stableCore: ["Pressure affects pump flow, while installation conditions affect performance."] };
		const scattered = { title: "Can flow affect an installation?", slug: "synthetic-comparison-scattered", stableCore: ["Pressure can affect conditions. Flow is not the complete description."] };
		const search = createClaimSearchIndex([incidental, scattered, explanation]);
		for (const query of [
			"What's the difference between pressure and flow?",
			"What’s the difference between pressure and flow?",
			"How does pressure differ from flow?",
			"How are pressure and flow different?",
			"Compare pressure with flow",
			"pressure versus flow"
		]) {
			const results = search(query, referenceDate);
			assert.deepEqual(results.map(result => result.claim.slug), [explanation.slug], query);
			assert.equal(results[0].match.matchStrength, "related", query);
		}
	});

	it("requires both comparison subjects rather than collapsing retrieval aliases", () => {
		const comparison = { title: "How are energy and power different?", slug: "synthetic-energy-power", bottomLine: "Energy measures an amount, while power describes a rate." };
		const energyOnly = { title: "How is energy measured?", slug: "synthetic-energy-only", bottomLine: "Energy is not measured without a convention." };
		const search = createClaimSearchIndex([energyOnly, comparison]);
		assert.deepEqual(search("What is the difference between energy and power?", referenceDate).map(result => result.claim.slug), [comparison.slug]);
		assert.deepEqual(search("What is the difference between energy and electricity?", referenceDate), []);
		assert.deepEqual(search("What is the difference between energy and unobtanium?", referenceDate), []);
		assert.equal(search(comparison.title, referenceDate)[0]?.match.matchStrength, "exact");
	});

	it("preserves quantities, negation, and unknown qualifiers in body-only comparisons", () => {
		const claim = { title: "Can an installation run steadily?", slug: "synthetic-quantified-comparison", stableCore: ["A pump at 1000 revolutions differs from a pump at 10000 revolutions."] };
		const search = createClaimSearchIndex([claim]);
		assert.equal(search("Compare a pump at 1,000 revolutions with a pump at 10,000 revolutions", referenceDate)[0]?.claim, claim);
		assert.deepEqual(search("Compare a pump at 1,001 revolutions with a pump at 10,000 revolutions", referenceDate), []);
		assert.deepEqual(search("What is the difference between pump and unobtanium recirculation?", referenceDate), []);
		assert.deepEqual(search("pump not revolutions", referenceDate), []);
	});

	it("does not use private fields or tags as comparison evidence", () => {
		const claim = { title: "Can an installation run steadily?", slug: "synthetic-private-comparison", editorNotes: "Pressure and flow measure different quantities.", misconceptionTags: ["pressure and flow are different"] };
		assert.deepEqual(createClaimSearchIndex([claim])("What is the difference between pressure and flow?", referenceDate), []);
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
