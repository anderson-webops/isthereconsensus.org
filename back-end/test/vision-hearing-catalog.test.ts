import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberSchoolsFamilyClaims } from "../src/data/claim-expansion-2026-11-schools-family.js";
import { novemberVisionHearingClaims, novemberVisionHearingResearchCheckedAt } from "../src/data/claim-expansion-2026-11-vision-hearing.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

function claim(slug: string) {
	const entry = novemberVisionHearingClaims.find(candidate => candidate.slug === slug);
	assert.ok(entry, slug);
	return entry;
}

describe("vision and hearing catalog", () => {
	it("seals twenty reviews and preserves the prior family cohort", () => {
		assert.equal(novemberVisionHearingClaims.length, 20);
		assert.equal(readerExpansionValueHash(novemberVisionHearingClaims), "0d212302027866d630bc6e1ae874bd7d3b617e91ee9ad22ad26a9fa792a5b7f6");
		assert.equal(novemberVisionHearingResearchCheckedAt, "2026-11-08T20:46:31.833Z");
		assert.equal(catalogExpansionReleases.find(release => release.claims === novemberVisionHearingClaims)?.id, "catalog-1501-vision-hearing-2026-11-08");
		assert.equal(readerExpansionValueHash(novemberSchoolsFamilyClaims), "7c21e6675cf129043572e177aa6af71b367ee3de82d55a25aa78d64407f62b69");
		assert.equal(defaultClaims.length, 1438);
		assert.equal(defaultTopics.length, 45);
		assert.equal(defaultTopics.find(topic => topic.slug === "vision-and-hearing")?.order, 44);
		assert.ok(novemberVisionHearingClaims.every(entry => entry.topicSlug === "vision-and-hearing"));
		assert.equal(new Set(novemberVisionHearingClaims.map(entry => JSON.stringify(entry.exclusionRules))).size, 20);
	});
	it("preserves uncertainty and the actual primary-source discovery method", () => {
		assert.equal(novemberVisionHearingClaims.filter(entry => entry.consensusBand === "mixed").length, 4);
		assert.equal(novemberVisionHearingClaims.filter(entry => entry.consensusBand === "unclear").length, 1);
		assert.equal(novemberVisionHearingClaims.filter(entry => entry.evidenceCertainty === "low").length, 6);
		for (const entry of novemberVisionHearingClaims) {
			assert.match(entry.reviewerLine!, /independent expert review not completed/u);
			assert.equal(entry.searchCutoffAt, novemberVisionHearingResearchCheckedAt);
			assert.ok(entry.searchDatabases!.includes("PubMed targeted paper search"));
			assert.ok(entry.searchDatabases!.every(database => !database.includes("Consensus")));
			assert.ok(entry.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("retains verified notice URLs and distinct source identities", () => {
		const sources = novemberVisionHearingClaims.flatMap(entry => entry.sources);
		assert.equal(sources.length, 72);
		assert.equal(new Set(sources.filter(source => source.doi).map(source => source.doi)).size, 65);
		assert.equal(sources.filter(source => !source.doi).length, 7);
		const notices = new Map([
			["10.1001/jama.2013.4997", "10.1001/jama.2013.6403"],
			["10.1044/2017_aja-16-0111", "10.1044/2019_aja-19-0087"],
			["10.1177/0194599816671491", "10.1177/0194599817725542"]
		]);
		assert.equal(sources.filter(source => source.citationStatus === "corrected").length, 3);
		for (const source of sources) {
			assert.equal(new URL(source.url!).protocol, "https:");
			assert.ok(source.statusSources!.every(url => new URL(url).protocol === "https:"));
			if (notices.has(source.doi!)) {
				assert.equal(source.citationStatus, "corrected");
				assert.ok(source.statusSources!.includes(`https://doi.org/${notices.get(source.doi!)}`));
			}
		}
		assert.ok(!sources.some(source => ["10.1002/14651858.cd012023.pub2", "10.1002/14651858.cd014758.pub2"].includes(source.doi!)));
	});
	it("separates myopia prevention, association and design-specific treatment", () => {
		assert.match(claim("does-outdoor-time-help-prevent-childhood-nearsightedness").bottomLine, /preventing new cases.*sun protection/u);
		assert.match(claim("is-screen-time-linked-to-childhood-nearsightedness").bottomLine, /not established a safe daily screen-time cutoff/u);
		assert.match(claim("can-myopia-control-glasses-slow-childhood-nearsightedness").bottomLine, /lens design.*decades later remain uncertain/u);
		assert.match(claim("does-patching-improve-childhood-amblyopia").exclusionRules!.join(" "), /bundles including near activities or atropine/u);
	});
	it("preserves disease stage and prevention versus restoration", () => {
		assert.match(claim("does-lowering-eye-pressure-slow-glaucoma").bottomLine, /does not restore sight/u);
		assert.match(claim("can-areds2-supplements-slow-macular-degeneration").bottomLine, /disease stage.*current and former smokers/u);
		assert.match(claim("does-cataract-surgery-improve-everyday-vision").bottomLine, /other eye disease.*risks/u);
	});
	it("keeps satisfaction denominators and contact-infection scope distinct", () => {
		assert.match(claim("how-satisfied-are-people-after-lasik").exclusionRules!.join(" "), /symptom-free subgroup percentages/u);
		assert.match(claim("does-sleeping-in-contact-lenses-increase-infection-risk").exclusionRules!.join(" "), /Acanthamoeba-specific.*six selected cases/u);
		assert.match(claim("do-multifocal-cataract-lenses-reduce-glasses-use").bottomLine, /halos or glare/u);
	});
	it("keeps communication, clinical eligibility and equivalence separate", () => {
		assert.match(claim("do-hearing-aids-improve-everyday-communication").exclusionRules!.join(" "), /cognitive-decline/u);
		assert.match(claim("do-self-fitting-hearing-aids-match-professional-fitting").bottomLine, /too uncertain to establish general equivalence.*US over-the-counter/u);
		assert.match(claim("do-cochlear-implants-improve-adult-speech-understanding").bottomLine, /appropriately selected adults.*Surgery/u);
	});
	it("preserves modest antibiotic benefits, harms and earwax limits", () => {
		assert.match(claim("how-much-do-antibiotics-help-childrens-middle-ear-infections").bottomLine, /20 children.*one extra child.*14 treated/u);
		assert.match(claim("do-ear-drops-clear-impacted-earwax").exclusionRules!.join(" "), /nonintact eardrums.*home instrumentation/u);
	});
	it("distinguishes tinnitus distress from sound and control comparisons", () => {
		assert.match(claim("does-cbt-help-with-tinnitus-distress").exclusionRules!.join(" "), /perceived sound loudness/u);
		assert.equal(claim("does-sound-therapy-help-tinnitus").consensusBand, "unclear");
		assert.match(claim("does-sound-therapy-help-tinnitus").exclusionRules!.join(" "), /within-period p values/u);
		assert.match(claim("do-repositioning-maneuvers-help-positional-vertigo").exclusionRules!.join(" "), /rare cupulolithiasis.*unsupervised movements/u);
	});
});
