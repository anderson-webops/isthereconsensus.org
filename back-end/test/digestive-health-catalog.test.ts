import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import {
	novemberDigestiveHealthClaims,
	novemberDigestiveHealthResearchCheckedAt
} from "../src/data/claim-expansion-2026-11-digestive-health.js";
import { novemberOralHealthClaims } from "../src/data/claim-expansion-2026-11-oral-health.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

function claim(slug: string) {
	const entry = novemberDigestiveHealthClaims.find(candidate => candidate.slug === slug);
	assert.ok(entry, slug);
	return entry;
}

describe("digestive health catalog", () => {
	it("seals twenty distinct reviews and preserves the preceding cohort", () => {
		assert.equal(novemberDigestiveHealthClaims.length, 20);
		assert.equal(
			readerExpansionValueHash(novemberDigestiveHealthClaims),
			"34c287fb221326474cd6007a32ab9bf1ea6a7851ce213878fde10d507bf1c8a7"
		);
		assert.equal(novemberDigestiveHealthResearchCheckedAt, "2026-11-13T19:30:14.913Z");
		assert.equal(
			readerExpansionValueHash(novemberOralHealthClaims),
			"55668c54e8d6035624e1d8f6281616fb631a57acfbc76aa16f909dda0d1cdcb6"
		);
		assert.equal(
			catalogExpansionReleases.find(release => release.claims === novemberDigestiveHealthClaims)?.id,
			"catalog-1501-digestive-health-2026-11-13"
		);
		assert.equal(defaultClaims.length, 1478);
		assert.equal(defaultTopics.length, 47);
		assert.equal(defaultTopics.find(topic => topic.slug === "digestive-health")?.order, 47);
		assert.equal(new Set(novemberDigestiveHealthClaims.map(entry => entry.slug)).size, 20);
		assert.equal(
			new Set(novemberDigestiveHealthClaims.map(entry => JSON.stringify(entry.exclusionRules))).size,
			20
		);
	});
	it("retains actual discovery, uncertainty and uncompleted expert review", () => {
		assert.equal(novemberDigestiveHealthClaims.filter(entry => entry.consensusBand === "mixed").length, 4);
		assert.equal(novemberDigestiveHealthClaims.filter(entry => entry.evidenceCertainty === "low").length, 10);
		for (const entry of novemberDigestiveHealthClaims) {
			assert.equal(entry.searchCutoffAt, novemberDigestiveHealthResearchCheckedAt);
			assert.match(entry.reviewerLine!, /independent expert review not completed/u);
			assert.ok(entry.searchDatabases!.includes("PubMed targeted paper search"));
			assert.ok(entry.searchDatabases!.every(database => !database.includes("Consensus")));
			assert.ok(entry.sources.every(source => source.appraisal === "not_appraised"));
			assert.ok(entry.bottomLine!.split(/\s+/u).length <= 80);
			assert.ok(
				entry.exclusionRules!.every(rule => !/Do not (?:provide|derive|supply|turn|replace)/u.test(rule))
			);
		}
	});
	it("uses qualified canonical sources without misclassifying ordinary trials", () => {
		const sources = novemberDigestiveHealthClaims.flatMap(entry => entry.sources);
		assert.equal(sources.length, 71);
		const used = new Set(sources.flatMap(source => (source.doi
			? [source.doi]
			: [])));
		assert.equal(used.size, 54);
		assert.equal(new Set(sources.filter(source => !source.doi).map(source => source.url)).size, 2);
		assert.ok(sources.every(source => source.citationStatus === "current"));
		assert.ok(sources.every(source => source.kind !== "landmark_study"));
		for (const doi of [
			"10.1016/s0140-6736(25)00145-x",
			"10.14309/ajg.0000000000002075",
			"10.7189/jogh.14.04197",
			"10.1111/nmo.70354"
		])
			assert.equal(used.has(doi), false);
		for (const source of sources) {
			assert.equal(new URL(source.url!).protocol, "https:");
			assert.ok(source.statusSources!.every(url => new URL(url).protocol === "https:"));
		}
		assert.equal(sources.find(source => /dietary adherence influences/iu.test(source.title))?.year, 2017);
		assert.equal(sources.find(source => source.title === "Treatment for Celiac Disease")?.year, 2020);
		assert.equal(sources.find(source => source.title === "Treatment for Constipation")?.year, 2018);
	});
	it("separates reflux symptoms from acid markers and isolated weight effects", () => {
		const timing = claim("do-late-evening-meals-make-nighttime-reflux-worse");
		assert.match(timing.bottomLine, /without a clear difference in total symptoms/u);
		assert.match(timing.exclusionRules!.join(" "), /weight-loss effects/u);
		assert.match(
			claim("can-weight-loss-improve-reflux-symptoms-in-adults-with-excess-weight").bottomLine,
			/diet, activity and weight changed together/u
		);
		assert.match(claim("do-h2-blockers-relieve-heartburn").bottomLine, /separate, less certain question/u);
	});
	it("keeps antispasmodic guideline jurisdiction and conditional certainty visible", () => {
		const entry = claim("do-antispasmodic-drugs-improve-irritable-bowel-syndrome-symptoms");
		assert.equal(entry.consensusBand, "mixed");
		assert.match(entry.bottomLine, /available in the United States/u);
		assert.match(entry.bottomLine, /conditional support based on low-certainty evidence/u);
		assert.match(
			entry.sources.find(source => source.doi === "10.14309/ajg.0000000000001036")!.note!,
			/global IBS symptoms/u
		);
	});
	it("retains null primary comparisons and imprecise synthesis findings", () => {
		assert.match(
			claim("does-peppermint-oil-improve-irritable-bowel-syndrome-symptoms").bottomLine,
			/no clear advantage on their main outcomes/u
		);
		assert.match(
			claim("do-probiotics-help-chronic-constipation-in-adults").bottomLine,
			/no clear benefit on its main overall symptom score/u
		);
		assert.match(
			claim("does-gut-directed-hypnotherapy-improve-irritable-bowel-syndrome-symptoms").sources.find(source =>
				/2025 synthesis/u.test(source.note!)
			)!.note!,
			/crosses no effect/u
		);
		assert.match(claim("does-exercise-help-chronic-constipation-in-adults").bottomLine, /inconsistent advice/u);
	});
	it("keeps disease-specific dietary benefit and lactose tolerance distinct", () => {
		assert.match(
			claim("does-a-gluten-free-diet-help-people-with-celiac-disease").bottomLine,
			/confirmed celiac disease/u
		);
		assert.match(
			claim("does-a-gluten-free-diet-help-people-with-celiac-disease").stableCore.join(" "),
			/before-and-after or observational/u
		);
		assert.match(
			claim("can-people-with-lactose-intolerance-still-eat-dairy").bottomLine,
			/malabsorption rather than confirmed symptomatic intolerance/u
		);
		assert.ok(
			defaultClaims.some(
				entry =>
					entry.slug
					=== "does-a-gluten-free-diet-improve-health-for-people-without-celiac-disease-or-gluten-sensitivity"
			)
		);
	});
	it("retains selected acute-care eligibility and later-surgery distinctions", () => {
		assert.match(
			claim("do-antibiotics-improve-outcomes-in-uncomplicated-diverticulitis").bottomLine,
			/immune suppression, frailty/u
		);
		const appendix = claim("can-uncomplicated-appendicitis-be-treated-without-surgery");
		assert.match(appendix.bottomLine, /urgent assessment/u);
		assert.match(appendix.stableCore.join(" "), /different denominators/u);
		assert.match(claim("does-fiber-improve-hemorrhoid-symptoms").bottomLine, /other possible causes/u);
	});
	it("keeps follow-up associations separate from causal and individual timing claims", () => {
		const entry = claim("do-delays-after-a-positive-stool-screening-test-matter");
		assert.match(entry.bottomLine, /observational findings/u);
		assert.match(entry.bottomLine, /does not itself mean cancer/u);
		assert.match(entry.exclusionRules!.join(" "), /no care anywhere/u);
		assert.match(
			entry.sources.find(source => source.doi === "10.1001/jama.2017.3634")!.note!,
			/does not measure mortality/u
		);
	});
});
