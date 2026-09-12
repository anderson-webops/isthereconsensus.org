import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { accountProtectionClaims, accountProtectionGaps, accountProtectionSlugs, accountProtectionSources } from "../src/data/claim-expansion-practical-account.js";
import { defaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: keyof typeof accountProtectionSlugs) => accountProtectionClaims.find(claim => claim.slug === accountProtectionSlugs[key])!;
describe("practical account-protection evidence", () => {
	it("adds a populated topic and five distinct canonical questions", () => {
		assert.equal(defaultTopics.filter(topic => topic.slug === "digital-security-and-privacy").length, 1);
		assert.equal(accountProtectionClaims.length, 5);
		assert.deepEqual(accountProtectionGaps.map(gap => gap.slug), accountProtectionClaims.map(claim => claim.slug));
		for (const claim of accountProtectionClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.deepEqual(getAtlasCollectionMemberships(claim.topicSlug, claim.slug).map(item => item.slug), ["account-protection"]);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
		}
	});
	it("separates phishing resistance from replay resistance and all-account guarantees", () => {
		assert.match(claimFor("codes").bottomLine, /one use.*relayed/);
		assert.match(claimFor("passkeys").bottomLine, /not a promise.*compromised device.*recovery/);
		assert.match(claimFor("passkeys").stableCore.join(" "), /User presence and user verification are different/);
		assert.match(accountProtectionSources.webauthn.url!, /REC-webauthn-3-20260825/);
	});
	it("keeps installation, password replacement and study applicability distinct", () => {
		assert.match(claimFor("manager").bottomLine, /Installation alone does not remove reused passwords/);
		assert.match(claimFor("manager").stableCore.join(" "), /476.*170.*2017/);
		assert.match(claimFor("manager").uncertaintySummary!, /fully malicious cloud servers/);
		assert.match(accountProtectionSources.vaults.note, /No current brand ranking/);
	});
	it("retains recovery and expiry exceptions without turning survey belief into efficacy", () => {
		assert.match(claimFor("recovery").misconceptions.join(" "), /Backup eligible and successfully backed up are not interchangeable/);
		assert.match(accountProtectionSources.adoption.note, /prose\/table disagree.*No ratings/);
		assert.match(claimFor("expiry").bottomLine, /known or suspected compromise calls for action/);
		assert.match(claimFor("expiry").misconceptions.join(" "), /does not prove expiry always causes weaker passwords/);
	});
	it("finds the new questions from ordinary reader searches", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [key, query] of Object.entries({ passkeys: "passkeys phishing", codes: "authenticator codes", manager: "password manager reuse", recovery: "lost device passkeys", expiry: "monthly password changes" })) {
			assert.ok(search(query).some(result => result.claim.slug === accountProtectionSlugs[key as keyof typeof accountProtectionSlugs]), query);
		}
	});
});
