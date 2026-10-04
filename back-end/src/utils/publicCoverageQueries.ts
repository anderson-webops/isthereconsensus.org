import type { IClaim } from "../models/schemas/Claim.js";
import { CoverageRequest } from "../models/schemas/CoverageRequest.js";
import { Topic } from "../models/schemas/Topic.js";
import { publicCoverageRequest } from "./coverageRoadmap.js";
import { loadVisibleLibraryClaims } from "./publicClaimQueries.js";

export const publicCoverageFields = "title summary status topicId claimId publicUpdatedAt publicHistory";
type CoverageRow = Parameters<typeof publicCoverageRequest>[0] & { topicId?: unknown; claimId?: unknown };
type VisibleClaims = (ids: string[]) => Promise<IClaim[]>;

export async function publicCoverageRows(rows: CoverageRow[], loadVisibleClaims: VisibleClaims = loadVisibleLibraryClaims) {
	const [topics, claims] = await Promise.all([
		Topic.find({ _id: { $in: rows.flatMap(row => row.topicId ? [String(row.topicId)] : []) } }).select("title slug").maxTimeMS(5000).lean(),
		loadVisibleClaims([...new Set(rows.flatMap(row => row.status === "published" && row.claimId ? [String(row.claimId)] : []))])
	]);
	const topicMap = new Map(topics.map(topic => [String(topic._id), topic]));
	const claimMap = new Map(claims.flatMap(claim => typeof claim.topic === "object" && "slug" in claim.topic
		? [[String(claim._id), { title: claim.title, slug: claim.slug, topic: { slug: claim.topic.slug } }] as const]
		: []));
	return {
		requests: rows.map(row => publicCoverageRequest(row, topicMap.get(String(row.topicId)) ?? null, claimMap.get(String(row.claimId)) ?? null)),
		answerIds: [...new Set(rows.flatMap(row => row.status === "published" && row.claimId && claimMap.has(String(row.claimId)) ? [String(row.claimId)] : []))]
	};
}

export async function loadPublicCoverageSelection(ids: string[], loadVisibleClaims: VisibleClaims = loadVisibleLibraryClaims) {
	if (!ids.length) return { requests: [], answerIds: [] };
	const rows = await CoverageRequest.find({ _id: { $in: ids }, visibility: "public" }).select(publicCoverageFields).maxTimeMS(5000).lean();
	return publicCoverageRows(rows, loadVisibleClaims);
}
