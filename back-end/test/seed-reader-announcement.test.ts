import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { seedReaderAnnouncementSchema } from "../src/utils/seedReaderAnnouncement.js";

describe("source-controlled reader announcements", () => {
	const event = {
		id: "a697f757-9c57-45f7-9fd0-dc76d61a0368",
		date: "2026-09-11T12:00:00Z",
		kind: "evidence_update",
		summary: "A substantive, source-checked update.",
		bottomLineImpact: "unchanged"
	};
	it("requires stable ids, explicit dates, significance, public summary and matching impact", () => {
		assert.equal(seedReaderAnnouncementSchema.safeParse(event).success, true);
		for (const invalid of [
			{ ...event, id: "random-on-every-start" },
			{ ...event, date: "today" },
			{ ...event, kind: "review" },
			{ ...event, summary: " " },
			{ ...event, kind: "new_review", bottomLineImpact: "changed" },
			{ ...event, password: "must never be retained" }
		]) assert.equal(seedReaderAnnouncementSchema.safeParse(invalid).success, false);
	});
	it("validates every declared catalog announcement before deployment", () => {
		const ids = new Set<string>();
		for (const claim of defaultClaims) {
			if (!claim.readerAnnouncement) continue;
			const parsed = seedReaderAnnouncementSchema.parse(claim.readerAnnouncement);
			assert.equal(ids.has(parsed.id), false, "Announcement ids must be globally unique.");
			ids.add(parsed.id);
		}
	});
	it("keeps insert-only restarts unchanged and records only after source synchronization", () => {
		const source = readFileSync(new URL("../src/data/seedClaims.ts", import.meta.url), "utf8");
		assert.match(source, /existingClaim && !synchronizeExisting[\s\S]*continue;/);
		assert.ok(source.indexOf("await recordSeedReaderAnnouncement") > source.indexOf("await ClaimSource.updateOne"));
		assert.match(source, /\$set: missingFields, \$inc: \{ __v: 1 \}/);
	});
});
