import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATALOG_ENTRY_GOAL, catalogExpansionClaims, catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberDigestiveHealthClaims } from "../src/data/claim-expansion-2026-11-digestive-health.js";
import {
	novemberFamilyCreativeLearningClaims,
	novemberFamilyCreativeLearningResearchCheckedAt
} from "../src/data/claim-expansion-2026-11-family-creative-learning.js";
import { defaultClaims, legacyDefaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

function claim(slug: string) {
	const entry = novemberFamilyCreativeLearningClaims.find(candidate => candidate.slug === slug);
	assert.ok(entry, slug);
	return entry;
}

describe("family, creative practice and learning catalog", () => {
	it("reaches the source target while preserving earlier reviewed content", () => {
		assert.equal(CATALOG_ENTRY_GOAL, 1501);
		assert.equal(defaultClaims.length, 1501);
		assert.equal(catalogExpansionClaims.length, 500);
		assert.equal(defaultTopics.length, 47);
		assert.deepEqual(defaultClaims.slice(0, 1001), legacyDefaultClaims);
		assert.equal(novemberFamilyCreativeLearningClaims.length, 23);
		assert.equal(catalogExpansionReleases.length, 30);
		assert.equal(
			readerExpansionValueHash(novemberFamilyCreativeLearningClaims),
			"810f7a60a9ee93dd1cb99fa8a5a81d2211eb9df3528a21bd2a9ace0ee92c656c"
		);
		assert.equal(
			readerExpansionValueHash(novemberDigestiveHealthClaims),
			"34c287fb221326474cd6007a32ab9bf1ea6a7851ce213878fde10d507bf1c8a7"
		);
		assert.equal(catalogExpansionReleases.at(-1)?.claims, novemberFamilyCreativeLearningClaims);
	});
	it("retains honest methods, source types and article-specific scope", () => {
		const citations = novemberFamilyCreativeLearningClaims.flatMap(entry => entry.sources);
		assert.equal(citations.length, 61);
		assert.equal(new Set(citations.flatMap(source => (source.doi
			? [source.doi]
			: []))).size, 58);
		assert.equal(new Set(citations.filter(source => !source.doi).map(source => source.url)).size, 1);
		assert.ok(
			citations.every(
				source =>
					![
						"landmark_study",
						"technical_reference",
						"guideline",
						"consensus_statement"
					].includes(source.kind)
			)
		);
		assert.equal(
			new Set(novemberFamilyCreativeLearningClaims.map(entry => JSON.stringify(entry.exclusionRules))).size,
			23
		);
		for (const entry of novemberFamilyCreativeLearningClaims) {
			assert.equal(entry.status, "draft");
			assert.equal(entry.searchCutoffAt, novemberFamilyCreativeLearningResearchCheckedAt);
			assert.ok(entry.bottomLine.split(/\s+/u).length <= 70);
			assert.ok(!entry.searchDatabases?.some(database => /consensus\.app/iu.test(database)));
			assert.match(entry.reviewerLine!, /independent expert review not completed/u);
			assert.match(entry.appraisalTools!.join(" "), /no formal GRADE/u);
			assert.ok(entry.sources.every(source => source.appraisal === "not_appraised"));
		}
		assert.ok(
			!novemberFamilyCreativeLearningClaims.some(entry =>
				/marshmallow|cooperative-video-game/u.test(entry.slug)
			)
		);
	});
	it("preserves contrary auditory findings and task-specific AI judgments", () => {
		const music = claim("does-repeated-listening-make-music-more-likable");
		assert.match(music.stableCore.join(" "), /visual stimuli, but not for auditory stimuli/u);
		assert.equal(music.sources.find(source => source.doi === "10.1037/bul0000085")?.stance, "debate");
		assert.equal(music.consensusBand, "mixed");
		const classification = claim("can-people-tell-ai-generated-art-from-human-made-art");
		assert.match(classification.stableCore.join(" "), /356 viewers and six painting pairs/u);
		assert.match(classification.bottomLine, /depends strongly on the pictures and the test/u);
		assert.match(
			classification.sources.find(source => source.doi === "10.1007/s11301-025-00494-9")!.note,
			/September 2024/u
		);
	});
	it("distinguishes visual art, dance proxies and assisted writing from lasting benefits", () => {
		assert.match(
			claim("does-making-art-help-reduce-stress").stableCore.join(" "),
			/37 arts studies, 11 of them involving visual art/u
		);
		assert.equal(claim("does-making-art-help-reduce-stress").consensusBand, "unclear");
		assert.match(
			claim("does-dancing-improve-balance-in-older-adults").bottomLine,
			/do not automatically mean fewer falls/u
		);
		assert.match(
			claim("does-ai-help-people-write-more-creative-stories").bottomLine,
			/has learned to write better without it/u
		);
	});
	it("retains corrected childcare funding and disclosed bedtime industry relationships", () => {
		const childcare = claim("is-childcare-quality-linked-to-childrens-learning");
		const corrected = childcare.sources.find(source => source.doi === "10.1371/journal.pone.0285985")!;
		assert.equal(corrected.citationStatus, "corrected");
		assert.ok(corrected.statusSources?.includes("https://doi.org/10.1371/journal.pone.0293056"));
		assert.match(corrected.note, /funding and funder-role disclosures/u);
		assert.match(childcare.stableCore.join(" "), /later observational follow-up/u);
		const bedtime = claim("do-bedtime-routines-help-young-children-sleep");
		assert.match(bedtime.coiSummary!, /Johnson/u);
		assert.match(
			bedtime.sources.find(source => source.doi === "10.1093/sleep/32.5.599")!.note,
			/company-employed coauthors/u
		);
	});
	it("keeps parenting responsiveness, food insecurity and observational causation separate", () => {
		const video = claim("does-video-feedback-help-parents-respond-to-young-childrens-needs");
		assert.match(video.stableCore.join(" "), /does not find a clear pooled effect on child externalizing/u);
		assert.match(video.coiSummary!, /involvement in an included trial/u);
		assert.match(
			claim("is-food-insecurity-linked-to-childrens-mental-health").bottomLine,
			/do not isolate food insecurity as the cause/u
		);
		const monitoring = claim("is-parental-monitoring-linked-to-less-teen-substance-use");
		assert.match(monitoring.stableCore.join(" "), /571 studies.*both directions/u);
		assert.ok(
			monitoring.sources.some(
				source => source.doi === "10.1080/10826084.2025.2505142" && source.kind === "meta_analysis"
			)
		);
	});
});
