import type { Types } from "mongoose";
import type { PublicClaimSourceReadinessCounts } from "./publicClaimReadiness.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import {
	emptyPublicClaimSourceReadinessCounts,
	getPublicClaimReadiness,
	summarizeClaimSourceReadiness
} from "./publicClaimReadiness.js";

export async function loadClaimSourceReadinessCountMap(claimIds: Types.ObjectId[]) {
	if (!claimIds.length) return new Map<string, PublicClaimSourceReadinessCounts>();
	const sources = await ClaimSource.find({ claim: { $in: claimIds } }).lean();
	const sourcesByClaim = new Map<string, typeof sources>();
	for (const source of sources) {
		const key = source.claim.toString();
		sourcesByClaim.set(key, [...(sourcesByClaim.get(key) ?? []), source]);
	}
	const sourceCountMap = new Map<string, PublicClaimSourceReadinessCounts>();
	for (const [claimId, claimSources] of sourcesByClaim)
		sourceCountMap.set(claimId, summarizeClaimSourceReadiness(claimSources));
	return sourceCountMap;
}

export async function loadVisibleLibraryClaims(claimIds: string[]) {
	if (!claimIds.length) return [];
	const claims = await Claim.find({ _id: { $in: claimIds }, status: "published" })
		.populate("topic")
		.lean();
	const counts = await loadClaimSourceReadinessCountMap(claims.map(claim => claim._id));
	return claims.filter(
		claim =>
			claim.topic
			&& getPublicClaimReadiness(claim, counts.get(String(claim._id)) ?? emptyPublicClaimSourceReadinessCounts)
				.isReady
	);
}
