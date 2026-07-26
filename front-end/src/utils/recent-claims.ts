export interface ClaimReviewDate {
	lastReviewedAt?: string;
	publishedAt?: string;
	updatedAt?: string;
}

export interface RecentClaimCandidate extends ClaimReviewDate {
	_id: string;
	title: string;
	confidenceScore: number;
	sourceCount?: number;
	topic: {
		slug: string;
	};
}

export function claimReviewTimestamp(claim: ClaimReviewDate) {
	const value = claim.lastReviewedAt || claim.publishedAt || claim.updatedAt;
	if (!value) return 0;
	const timestamp = Date.parse(value);
	return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function selectRecentClaims<T extends RecentClaimCandidate>(claims: readonly T[], limit = 5) {
	if (limit <= 0) return [];

	const uniqueClaims = [...new Map(claims.map((claim) => [claim._id, claim])).values()].sort(
		(left, right) =>
			claimReviewTimestamp(right) - claimReviewTimestamp(left) ||
			(right.sourceCount ?? 0) - (left.sourceCount ?? 0) ||
			right.confidenceScore - left.confidenceScore ||
			left.title.localeCompare(right.title)
	);
	const selected: T[] = [];
	const selectedIds = new Set<string>();
	const seenTopics = new Set<string>();

	for (const claim of uniqueClaims) {
		if (selected.length >= limit) break;
		if (seenTopics.has(claim.topic.slug)) continue;
		selected.push(claim);
		selectedIds.add(claim._id);
		seenTopics.add(claim.topic.slug);
	}

	for (const claim of uniqueClaims) {
		if (selected.length >= limit) break;
		if (selectedIds.has(claim._id)) continue;
		selected.push(claim);
	}

	return selected;
}
