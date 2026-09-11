import type { Types } from "mongoose";
import { z } from "zod";
import { Claim } from "../models/schemas/Claim.js";
import { loadVisibleLibraryClaims } from "./publicClaimQueries.js";

export const seedReaderAnnouncementSchema = z.object({
	id: z.uuid(),
	date: z.iso.datetime(),
	kind: z.enum(["new_review", "evidence_update", "correction"]),
	summary: z.string().trim().min(1).max(2000),
	bottomLineImpact: z.enum(["new", "changed", "unchanged", "not_assessed"])
}).strict().refine(value => (value.kind === "new_review") === (value.bottomLineImpact === "new"));

export async function recordSeedReaderAnnouncement(claimId: Types.ObjectId, value: unknown) {
	if (!value) return;
	const update = seedReaderAnnouncementSchema.parse(value);
	// This runs only after the released content and its sources are synchronized.
	// The live feed independently checks readiness again when it is requested.
	if (!(await loadVisibleLibraryClaims([String(claimId)])).length) return;
	await Claim.updateOne({ "_id": claimId, "status": "published", "readerUpdates.id": { $ne: update.id } }, {
		$push: { readerUpdates: { $each: [{ ...update, date: new Date(update.date) }], $position: 0, $slice: 100 } },
		$inc: { __v: 1 }
	}, { runValidators: true });
}
