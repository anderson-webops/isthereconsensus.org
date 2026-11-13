import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberSchoolsFamilyClaims, novemberSchoolsFamilyResearchCheckedAt } from "../src/data/claim-expansion-2026-11-schools-family.js";
import { novemberWeatherForecastingClaims } from "../src/data/claim-expansion-2026-11-weather-forecasting.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

function claim(slug: string) {
	const entry = novemberSchoolsFamilyClaims.find(candidate => candidate.slug === slug);
	assert.ok(entry, slug);
	return entry;
}

describe("schools and family catalog", () => {
	it("seals twenty distinct reviews and preserves the prior weather cohort", () => {
		assert.equal(novemberSchoolsFamilyClaims.length, 20);
		assert.equal(readerExpansionValueHash(novemberSchoolsFamilyClaims), "7c21e6675cf129043572e177aa6af71b367ee3de82d55a25aa78d64407f62b69");
		assert.equal(novemberSchoolsFamilyResearchCheckedAt, "2026-11-08T19:14:17.253Z");
		assert.equal(catalogExpansionReleases.find(release => release.claims === novemberSchoolsFamilyClaims)?.id, "catalog-1501-schools-family-2026-11-08");
		assert.equal(readerExpansionValueHash(novemberWeatherForecastingClaims), "95f35883a45414bdcd8ceb81e50409bba462355c892f56d57be30a3e0c92415d");
		assert.equal(defaultClaims.slice(0, 1398).filter(entry => !novemberSchoolsFamilyClaims.some(candidate => candidate.slug === entry.slug && candidate.topicSlug === entry.topicSlug)).length, 1378);
		assert.equal(new Set(novemberSchoolsFamilyClaims.map(entry => JSON.stringify(entry.exclusionRules))).size, 20);
	});
	it("uses the new family topic and preserves the other subject boundaries", () => {
		assert.equal(defaultTopics.length, 45);
		assert.equal(defaultTopics.find(topic => topic.slug === "family-and-child-development")?.order, 43);
		assert.equal(novemberSchoolsFamilyClaims.filter(entry => entry.topicSlug === "family-and-child-development").length, 9);
		assert.equal(novemberSchoolsFamilyClaims.filter(entry => entry.topicSlug === "education-and-learning").length, 8);
		assert.equal(claim("does-mindfulness-at-school-improve-pupils-mental-health").topicSlug, "mental-health-and-treatment");
	});
	it("retains qualified certainty and uncompleted independent review", () => {
		assert.equal(novemberSchoolsFamilyClaims.filter(entry => entry.consensusBand === "mixed").length, 10);
		assert.equal(novemberSchoolsFamilyClaims.filter(entry => entry.consensusBand === "unclear").length, 1);
		assert.equal(novemberSchoolsFamilyClaims.filter(entry => entry.evidenceCertainty === "low").length, 10);
		for (const entry of novemberSchoolsFamilyClaims) {
			assert.match(entry.reviewerLine!, /independent expert review not completed/u);
			assert.equal(entry.searchCutoffAt, novemberSchoolsFamilyResearchCheckedAt);
			assert.ok(entry.sources.length >= 3);
			assert.ok(entry.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("distinguishes primary-only discovery from Consensus-assisted research", () => {
		const primary = novemberSchoolsFamilyClaims.filter(entry => !entry.searchDatabases!.some(database => database.includes("Consensus")));
		assert.equal(primary.length, 6);
		assert.ok(primary.every(entry => entry.searchDatabases!.includes("PubMed targeted paper search")));
		assert.equal(novemberSchoolsFamilyClaims.filter(entry => entry.searchDatabases!.includes("Consensus.app targeted paper search")).length, 14);
		assert.ok(claim("does-more-time-in-childcare-cause-behavior-problems").searchDatabases!.every(database => !database.includes("Consensus")));
	});
	it("keeps the real calendar correction and strict citation URLs", () => {
		const citations = novemberSchoolsFamilyClaims.flatMap(entry => entry.sources);
		assert.equal(citations.length, 76);
		assert.equal(new Set(citations.map(source => source.doi)).size, 76);
		const corrected = citations.filter(source => source.citationStatus === "corrected");
		assert.equal(corrected.length, 1);
		assert.equal(corrected[0].doi, "10.1002/cl2.1053");
		assert.ok(corrected[0].statusSources?.includes("https://doi.org/10.1002/cl2.1114"));
		assert.match(corrected[0].note!, /not causal/u);
		for (const source of citations) {
			assert.ok(source.url);
			assert.equal(new URL(source.url).protocol, "https:");
			assert.ok(source.statusSources!.every(url => new URL(url).protocol === "https:"));
		}
	});
	it("separates maintained treatment gains from a null treatment effect", () => {
		const entry = claim("do-parenting-programs-reduce-disruptive-child-behavior");
		assert.match(entry.sources.find(source => source.doi === "10.1016/j.cpr.2016.11.006")!.note!, /not zero benefit versus a control/u);
		assert.match(entry.exclusionRules!.join(" "), /maintenance separate from improvement/u);
		assert.match(entry.bottomLine, /parenting alone caused/u);
	});
	it("preserves exploratory praise findings and canonical DOI aliases", () => {
		const entry = claim("is-praising-effort-better-than-praising-intelligence");
		assert.equal(entry.sources[0].doi, "10.1037/0022-3514.75.1.33");
		assert.match(entry.sources.find(source => source.doi === "10.1016/j.jecp.2024.106032")!.note!, /no primary difference.*exploratory/u);
		assert.match(entry.sources.find(source => source.doi === "10.1037/dev0000444")!.note!, /53 children.*not randomly assigned/u);
	});
	it("preserves family selection, care safety and outcome-specific comparisons", () => {
		assert.match(claim("does-shared-physical-custody-improve-child-wellbeing").exclusionRules!.join(" "), /abuse/u);
		assert.match(claim("can-children-catch-up-after-adoption-or-foster-placement").sources.find(source => source.doi === "10.1073/pnas.2119318119")!.note!, /not compare foster care with safe birth-family/u);
		assert.match(claim("how-do-children-with-same-sex-parents-fare").exclusionRules!.join(" "), /household composition/u);
		assert.match(claim("does-nature-play-support-child-development").sources[0].note!, /positive, null and negative/u);
	});
	it("distinguishes acute breakfast tasks, funding and school-meal context", () => {
		const entry = claim("does-eating-breakfast-help-children-think-and-learn");
		assert.match(entry.sources.find(source => source.doi === "10.1007/s00394-021-02506-2")!.note!, /retrospective registration.*Kellogg funding/u);
		assert.match(entry.sources.find(source => source.doi === "10.1002/14651858.cd014794.pub2")!.note!, /not breakfast alone/u);
		assert.match(entry.exclusionRules!.join(" "), /meal participation/u);
	});
});
