import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import {
	CONTENT_DEMAND_SNAPSHOT,
	contentDemandSnapshotIsFresh,
	getClaimDemandBoost,
	getDemandAdjustedClaimSearchScore
} from "../src/data/contentDemand.js";

const snapshotDate = new Date("2026-09-10T12:00:00.000Z");

describe("aggregate content demand", () => {
	it("contains unique, privacy-safe references to seeded claims", () => {
		const seededClaimKeys = new Set(defaultClaims.map(claim => `${claim.topicSlug}/${claim.slug}`));
		const seen = new Set<string>();
		assert.equal(CONTENT_DEMAND_SNAPSHOT.claims.length, 46);

		for (const signal of CONTENT_DEMAND_SNAPSHOT.claims) {
			const key = `${signal.topicSlug}/${signal.claimSlug}`;
			assert.ok(seededClaimKeys.has(key), `${key} should reference a seeded claim`);
			assert.ok(!seen.has(key), `${key} should appear only once`);
			assert.ok(signal.visitors >= 2, `${key} should meet the documented signal floor`);
			assert.ok(signal.visits >= signal.visitors);
			assert.ok(signal.views >= signal.visits || signal.views >= signal.visitors);
			seen.add(key);
		}

		assert.equal(CONTENT_DEMAND_SNAPSHOT.measurementWindow, "not supplied");
		assert.ok(!JSON.stringify(CONTENT_DEMAND_SNAPSHOT).includes("@"));
	});

	it("uses fresh aggregate demand only as a bounded relevance boost", () => {
		const popularScore = getDemandAdjustedClaimSearchScore(
			64,
			"climate-and-environment",
			"is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
			snapshotDate
		);
		const unknownScore = getDemandAdjustedClaimSearchScore(
			64,
			"climate-and-environment",
			"can-planting-trees-alone-solve-climate-change",
			snapshotDate
		);

		assert.ok(popularScore > unknownScore);
		assert.ok(popularScore <= 70);
		assert.ok(getClaimDemandBoost("missing", "missing", snapshotDate) === 0);
	});

	it("expires an unrefreshed demand snapshot after six months", () => {
		const staleDate = new Date("2027-04-01T00:00:00.000Z");

		assert.equal(contentDemandSnapshotIsFresh(snapshotDate), true);
		assert.equal(contentDemandSnapshotIsFresh(staleDate), false);
		assert.equal(
			getClaimDemandBoost(
				"climate-and-environment",
				"is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
				staleDate
			),
			0
		);
	});
});
