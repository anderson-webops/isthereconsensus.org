import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { readerPrivacyClaims, readerPrivacySlugs, readerPrivacySources } from "../src/data/claim-expansion-reader-privacy.js";
import { readerExpansionClaims, readerExpansionGaps } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { buildSeedClaimUpdate, seedReviewDates } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";
import { seedReaderAnnouncementSchema } from "../src/utils/seedReaderAnnouncement.js";

describe("reader-driven canonical expansion", () => {
	it("adds distinct questions without counting guides, comparisons or old refreshes", () => {
		const newSlugs = new Set(readerExpansionClaims.map(claim => claim.slug));
		assert.equal(readerPrivacyClaims.length, 4);
		assert.equal(newSlugs.size, readerExpansionClaims.length);
		assert.equal(defaultClaims.filter(claim => !newSlugs.has(claim.slug)).length, 800);
		assert.deepEqual(readerExpansionGaps.map(gap => gap.slug), readerExpansionClaims.map(claim => claim.slug));
		for (const gap of readerExpansionGaps) {
			assert.equal(defaultClaims.filter(claim => claim.slug === gap.slug).length, 1);
			assert.ok(gap.gap.length > 70);
			for (const related of gap.relatedExistingSlugs) {
				assert.ok(!newSlugs.has(related));
				assert.equal(defaultClaims.filter(claim => claim.slug === related).length, 1);
			}
		}
	});

	it("validates real schema constraints and stable source-record dates", async () => {
		const announcementIds = new Set<string>();
		for (const entry of readerExpansionClaims) {
			const seed = defaultClaims.find(claim => claim.slug === entry.slug)!;
			const claim = new Claim({ topic: new mongoose.Types.ObjectId(), slug: seed.slug, ...buildSeedClaimUpdate({}, seed).$set });
			await claim.validate();
			for (const source of seed.sources) await new ClaimSource({ claim: claim._id, ...source }).validate();
			const announcement = seedReaderAnnouncementSchema.parse(seed.readerAnnouncement);
			assert.equal(announcement.kind, "new_review");
			assert.equal(announcement.bottomLineImpact, "new");
			assert.ok(!announcementIds.has(announcement.id));
			announcementIds.add(announcement.id);
			assert.equal(announcement.date, seed.searchCutoffAt);
			assert.ok(Date.parse(seed.searchCutoffAt) <= Date.now());
			assert.equal(seedReviewDates(seed).lastReviewedAt!.toISOString(), seed.searchCutoffAt);
			assert.equal(seedReviewDates(seed).reviewDateBasis, "source_record");
			assert.equal(new Set(seed.sources.map(source => source.url)).size, seed.sources.length);
			assert.ok(seed.sources.every(source => source.citationCheckedAt === seed.searchCutoffAt && source.appraisal === "not_appraised"));
			assert.ok(seed.sources.every(source => source.statusSources.includes(source.url!) && !source.url!.includes("consensus.app")));
			assert.match(seed.reviewerLine, /independent expert review not completed/);
			assert.match(seed.independenceSummary, /editorial, not a measured fraction/);
		}
	});

	it("preserves technical, empirical and current-product boundaries", () => {
		const claimFor = (slug: string) => readerPrivacyClaims.find(claim => claim.slug === slug)!;
		assert.match(claimFor(readerPrivacySlugs.privateBrowsing).stableCore.join(" "), /460.*13.*20/);
		assert.match(claimFor(readerPrivacySlugs.privateBrowsing).uncertaintySummary!, /ISP can read every encrypted/);
		assert.match(claimFor(readerPrivacySlugs.https).bottomLine, /scam site can use HTTPS/);
		assert.match(claimFor(readerPrivacySlugs.passwordRules).misconceptions.join(" "), /does not justify abandoning.*blocklist/);
		assert.match(claimFor(readerPrivacySlugs.passwordRules).uncertaintySummary!, /Model estimates and short recall tests are indirect/);
		assert.match(claimFor(readerPrivacySlugs.vpn).stableCore.join(" "), /283.*2015.*150/);
		assert.match(claimFor(readerPrivacySlugs.vpn).bottomLine, /HTTPS-encrypted content does not automatically become readable/);
		assert.match(readerPrivacySources.vpnStudy.note, /Historical Android snapshot/);
		assert.match(readerPrivacySources.disclosures.note, /not an exhaustive integrity guarantee/);
		assert.match(readerPrivacySources.passwordAppendix.note, /not an independent third study/);
	});

	it("places the new questions deliberately without repurposing existing reviews", () => {
		for (const claim of readerPrivacyClaims) {
			const expected = claim.slug === readerPrivacySlugs.passwordRules ? "account-protection" : "browsing-privacy";
			assert.deepEqual(getAtlasCollectionMemberships(claim.topicSlug, claim.slug).map(collection => collection.slug), [expected]);
		}
	});

	it("retrieves the additions through diagnostic keywords without tuning the ranker", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ privateBrowsing: "incognito browser history", https: "HTTPS website trust", passwordRules: "password character classes", vpn: "VPN provider trust" })) {
			assert.ok(search(query).some(result => result.claim.slug === readerPrivacySlugs[key as keyof typeof readerPrivacySlugs]), query);
		}
	});
});
