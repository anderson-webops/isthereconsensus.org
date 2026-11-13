import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberKidneyUrinaryClaims } from "../src/data/claim-expansion-2026-11-kidney-urinary.js";
import { novemberOralHealthClaims, novemberOralHealthResearchCheckedAt } from "../src/data/claim-expansion-2026-11-oral-health.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

function claim(slug: string) {
	const entry = novemberOralHealthClaims.find(candidate => candidate.slug === slug);
	assert.ok(entry, slug);
	return entry;
}

describe("oral and dental health catalog", () => {
	it("seals twenty distinct reviews and preserves the prior cohort", () => {
		assert.equal(novemberOralHealthClaims.length, 20);
		assert.equal(readerExpansionValueHash(novemberOralHealthClaims), "55668c54e8d6035624e1d8f6281616fb631a57acfbc76aa16f909dda0d1cdcb6");
		assert.equal(novemberOralHealthResearchCheckedAt, "2026-11-13T17:36:54.749Z");
		assert.equal(readerExpansionValueHash(novemberKidneyUrinaryClaims), "cbfd023b68d2eff72e67f662b913dfdb8a0d27341c4daa186d5b1ea15447544b");
		assert.equal(catalogExpansionReleases.find(release => release.claims === novemberOralHealthClaims)?.id, "catalog-1501-oral-health-2026-11-13");
		assert.equal(defaultClaims.length, 1458);
		assert.equal(defaultTopics.length, 46);
		assert.equal(defaultTopics.find(topic => topic.slug === "oral-and-dental-health")?.order, 46);
		assert.equal(new Set(novemberOralHealthClaims.map(entry => entry.slug)).size, 20);
		assert.equal(new Set(novemberOralHealthClaims.map(entry => JSON.stringify(entry.exclusionRules))).size, 20);
	});
	it("records actual discovery and uncertainty without claiming expert review", () => {
		assert.equal(novemberOralHealthClaims.filter(entry => entry.consensusBand === "mixed").length, 5);
		assert.equal(novemberOralHealthClaims.filter(entry => entry.consensusBand === "unclear").length, 3);
		assert.equal(novemberOralHealthClaims.filter(entry => entry.evidenceCertainty === "low").length, 12);
		for (const entry of novemberOralHealthClaims) {
			assert.match(entry.reviewerLine!, /independent expert review not completed/u);
			assert.equal(entry.searchCutoffAt, novemberOralHealthResearchCheckedAt);
			assert.ok(entry.searchDatabases!.includes("PubMed targeted paper search"));
			assert.ok(entry.searchDatabases!.every(database => !database.includes("Consensus")));
			assert.ok(entry.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("retains canonical references and leaves unresolved notices outside the manuscript", () => {
		const sources = novemberOralHealthClaims.flatMap(entry => entry.sources);
		assert.equal(sources.length, 75);
		const used = new Set(sources.flatMap(source => source.doi
			? [source.doi]
			: []));
		assert.equal(used.size, 55);
		assert.equal(new Set(sources.filter(source => !source.doi).map(source => source.url)).size, 9);
		assert.ok(sources.every(source => source.citationStatus === "current"));
		assert.ok(sources.every(source => source.kind !== "landmark_study"));
		assert.equal(sources.find(source => /Scoping Review/u.test(source.title))?.kind, "context");
		for (const doi of ["10.1016/j.heliyon.2024.e25833", "10.1016/j.jobcr.2023.02.015", "10.1016/s2213-8587(18)30038-x"]) assert.equal(used.has(doi), false);
		for (const source of sources) {
			assert.equal(new URL(source.url!).protocol, "https:");
			assert.ok(source.statusSources!.every(url => new URL(url).protocol === "https:"));
			if (/\/oral-health-topics\/(?:floss|mouthrinse-mouthwash|whitening)$/u.test(source.url!)) assert.equal(source.year, undefined);
		}
	});
	it("distinguishes laboratory teeth and markers from clinical outcomes", () => {
		assert.match(claim("does-charcoal-toothpaste-whiten-teeth-better-than-regular-toothpaste").stableCore.join(" "), /rather than measured rates/u);
		assert.match(claim("does-whitening-toothpaste-remove-surface-stains").sources.find(source => /49 premolars/u.test(source.note!))!.note!, /not 49 patients/u);
		assert.match(claim("does-tongue-cleaning-reduce-bad-breath").misconceptions.join(" "), /within a treatment group/u);
		assert.equal(claim("does-oil-pulling-improve-dental-health").consensusBand, "unclear");
	});
	it("keeps cavity arrest, tooth-level outcomes and active treatment bundles distinct", () => {
		const entry = claim("can-silver-diamine-fluoride-arrest-cavities-in-childrens-baby-teeth");
		assert.match(entry.bottomLine, /darkens treated decayed areas/u);
		assert.match(entry.stableCore.join(" "), /does not isolate SDF alone/u);
		assert.match(entry.misconceptions.join(" "), /percentage of arrested lesions/u);
		assert.match(claim("do-xylitol-products-help-prevent-cavities").sources.find(source => /co-funding/u.test(source.note!))!.note!, /teeth, not people/u);
	});
	it("preserves selected recall populations and separates cleaning from treatment", () => {
		const recall = claim("do-all-adults-need-a-dental-checkup-every-six-months");
		assert.match(recall.bottomLine, /only in adults a dentist considered suitable/u);
		assert.match(recall.bottomLine, /New symptoms/u);
		assert.match(recall.stableCore.join(" "), /same trial/u);
		assert.match(claim("do-routine-scale-and-polish-cleanings-improve-gum-health-in-regular-dental-attenders").bottomLine, /do not apply to treatment of established periodontal disease/u);
	});
	it("retains glucose-marker units and conflicting trial results", () => {
		const entry = claim("does-treating-gum-disease-improve-blood-sugar-in-people-with-type-2-diabetes");
		assert.match(entry.stableCore.join(" "), /0\.43 percentage points/u);
		assert.match(entry.stableCore.join(" "), /without a clear six-month HbA1c benefit/u);
		assert.match(entry.bottomLine, /has not been shown here to cure diabetes/u);
		assert.match(entry.sources.find(source => source.doi === "10.1001/jama.2013.282431")!.note!, /514 people/u);
	});
	it("preserves cosmetic, orthodontic and disease-free wisdom-tooth limits", () => {
		assert.match(claim("do-home-tooth-bleaching-products-whiten-teeth").bottomLine, /Fillings, crowns and veneers/u);
		assert.match(claim("are-clear-aligners-as-effective-as-fixed-braces").bottomLine, /selected cases/u);
		assert.equal(claim("are-fixed-retainers-better-than-removable-retainers-after-braces").evidenceCertainty, "low");
		assert.equal(claim("should-disease-free-impacted-wisdom-teeth-be-removed-to-prevent-future-problems").consensusBand, "unclear");
		assert.match(claim("does-chlorhexidine-mouthwash-improve-gum-inflammation").bottomLine, /staining, altered taste and irritation/u);
	});
});
