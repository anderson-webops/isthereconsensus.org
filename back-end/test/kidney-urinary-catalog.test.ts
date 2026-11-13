import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberKidneyUrinaryClaims, novemberKidneyUrinaryResearchCheckedAt } from "../src/data/claim-expansion-2026-11-kidney-urinary.js";
import { novemberVisionHearingClaims } from "../src/data/claim-expansion-2026-11-vision-hearing.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

function claim(slug: string) {
	const entry = novemberKidneyUrinaryClaims.find(candidate => candidate.slug === slug);
	assert.ok(entry, slug);
	return entry;
}

describe("kidney and urinary catalog", () => {
	it("seals twenty distinct reviews and preserves the prior cohort", () => {
		assert.equal(novemberKidneyUrinaryClaims.length, 20);
		assert.equal(readerExpansionValueHash(novemberKidneyUrinaryClaims), "cbfd023b68d2eff72e67f662b913dfdb8a0d27341c4daa186d5b1ea15447544b");
		assert.equal(novemberKidneyUrinaryResearchCheckedAt, "2026-11-13T16:11:24.949Z");
		assert.equal(readerExpansionValueHash(novemberVisionHearingClaims), "0d212302027866d630bc6e1ae874bd7d3b617e91ee9ad22ad26a9fa792a5b7f6");
		assert.equal(catalogExpansionReleases.find(release => release.claims === novemberKidneyUrinaryClaims)?.id, "catalog-1501-kidney-urinary-2026-11-13");
		assert.equal(defaultClaims.length, 1478);
		assert.equal(defaultTopics.length, 47);
		assert.equal(defaultTopics.find(topic => topic.slug === "kidney-and-urinary-health")?.order, 45);
		assert.equal(new Set(novemberKidneyUrinaryClaims.map(entry => entry.slug)).size, 20);
		assert.equal(new Set(novemberKidneyUrinaryClaims.map(entry => JSON.stringify(entry.exclusionRules))).size, 20);
	});
	it("records actual discovery and uncertainty without claiming expert review", () => {
		assert.equal(novemberKidneyUrinaryClaims.filter(entry => entry.consensusBand === "mixed").length, 3);
		assert.equal(novemberKidneyUrinaryClaims.filter(entry => entry.consensusBand === "unclear").length, 1);
		assert.equal(novemberKidneyUrinaryClaims.filter(entry => entry.evidenceCertainty === "low").length, 7);
		for (const entry of novemberKidneyUrinaryClaims) {
			assert.match(entry.reviewerLine!, /independent expert review not completed/u);
			assert.equal(entry.searchCutoffAt, novemberKidneyUrinaryResearchCheckedAt);
			assert.ok(entry.searchDatabases!.includes("PubMed targeted paper search"));
			assert.ok(entry.searchDatabases!.every(database => !database.includes("Consensus")));
			assert.ok(entry.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("preserves canonical references, issue year and verified correction notice", () => {
		const sources = novemberKidneyUrinaryClaims.flatMap(entry => entry.sources);
		assert.equal(sources.length, 76);
		assert.equal(new Set(sources.flatMap(source => source.doi
			? [source.doi]
			: [])).size, 58);
		assert.equal(new Set(sources.filter(source => !source.doi).map(source => source.url)).size, 5);
		assert.equal(sources.filter(source => source.citationStatus === "corrected").length, 1);
		const corrected = sources.find(source => source.doi === "10.1038/s41598-024-61977-5")!;
		assert.equal(corrected.citationStatus, "corrected");
		assert.ok(corrected.statusSources!.includes("https://doi.org/10.1038/s41598-024-63406-z"));
		assert.match(corrected.note!, /switched legends/u);
		assert.equal(claim("does-d-mannose-prevent-recurrent-urinary-tract-infections").sources.find(source => /Small three-arm/u.test(source.note!))?.year, 2026);
		for (const source of sources) {
			assert.equal(new URL(source.url!).protocol, "https:");
			assert.ok(source.statusSources!.every(url => new URL(url).protocol === "https:"));
			assert.ok(!["10.1001/jama.2011.1364", "10.1016/j.eururo.2009.09.035", "10.1371/journal.pone.0250257"].includes(source.doi!));
		}
	});
	it("keeps stone outcomes, treatment bundles and conflicting thiazide findings distinct", () => {
		assert.match(claim("does-a-low-calcium-diet-prevent-calcium-kidney-stones").stableCore.join(" "), /cannot be assigned to calcium alone/u);
		assert.equal(claim("do-thiazide-medicines-prevent-repeat-calcium-kidney-stones").consensusBand, "mixed");
		assert.match(claim("do-thiazide-medicines-prevent-repeat-calcium-kidney-stones").bottomLine, /no clear overall recurrence benefit/u);
		assert.match(claim("do-alpha-blockers-help-ureteral-stones-pass").bottomLine, /infected or persistently blocked/u);
	});
	it("keeps prevention, noninferiority and population-specific exceptions visible", () => {
		assert.match(claim("can-methenamine-prevent-recurrent-urinary-tract-infections").bottomLine, /does not mean the treatments are identical/u);
		assert.match(claim("do-antibiotics-help-nonpregnant-adults-with-asymptomatic-bacteriuria").bottomLine, /Pregnancy.*invasive urinary procedures/u);
		assert.match(claim("does-vaginal-estrogen-prevent-recurrent-urinary-infections-after-menopause").bottomLine, /oral estrogen has not shown/u);
		assert.match(claim("does-drinking-more-water-prevent-recurrent-urinary-tract-infections").bottomLine, /fluid restriction/u);
	});
	it("preserves observational limits, regulatory scope and functional outcomes", () => {
		assert.match(claim("do-antimuscarinic-medicines-help-overactive-bladder").bottomLine, /does not prove/u);
		assert.match(claim("does-saw-palmetto-improve-urinary-symptoms-from-an-enlarged-prostate").bottomLine, /weak recommendation.*particular extract/u);
		assert.match(claim("do-alpha-blockers-improve-urinary-symptoms-from-an-enlarged-prostate").bottomLine, /do not reliably prevent/u);
		assert.match(claim("do-finasteride-and-dutasteride-reduce-enlarged-prostate-progression").bottomLine, /frequency is unknown/u);
		assert.match(claim("does-reducing-salt-lower-blood-pressure-in-chronic-kidney-disease").bottomLine, /do not establish.*kidney failure/u);
		assert.match(claim("does-exercise-improve-fitness-in-nondialysis-chronic-kidney-disease").bottomLine, /not receiving dialysis/u);
	});
});
