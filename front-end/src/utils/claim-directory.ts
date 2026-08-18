import type { ClaimsResponse, ClaimSummary } from "~/types/board";

type ClaimsPageLoader = (page: number, pageSize: number) => Promise<ClaimsResponse>;

export async function loadCompleteClaimDirectory(loadPage: ClaimsPageLoader, pageSize = 500) {
	const firstPage = await loadPage(1, pageSize);
	const totalPages = firstPage.pagination?.totalPages ?? 1;
	if (totalPages <= 1) return firstPage;

	const remainingPages = await Promise.all(
		Array.from({ length: totalPages - 1 }, (_, index) => loadPage(index + 2, pageSize))
	);
	const claims = [firstPage, ...remainingPages].flatMap((response) => response.claims);

	return {
		claims,
		pagination: {
			page: 1,
			pageSize: claims.length,
			total: firstPage.pagination?.total ?? claims.length,
			totalPages: 1,
			hasMore: false
		}
	};
}

function reviewTime(claim: ClaimSummary) {
	const parsed = Date.parse(claim.lastReviewedAt ?? claim.publishedAt ?? "");
	return Number.isNaN(parsed) ? 0 : parsed;
}

export function interleaveClaimsByTopic(sourceClaims: ClaimSummary[], preferredTopicOrder: string[] = []) {
	const groups = new Map<string, ClaimSummary[]>();
	for (const claim of sourceClaims) {
		const topicSlug = claim.topic?.slug ?? "other-questions";
		groups.set(topicSlug, [...(groups.get(topicSlug) ?? []), claim]);
	}

	for (const group of groups.values()) {
		group.sort((left, right) => reviewTime(right) - reviewTime(left) || left.title.localeCompare(right.title));
	}

	const topicSlugs = [...groups.keys()].sort((left, right) => {
		const leftIndex = preferredTopicOrder.indexOf(left);
		const rightIndex = preferredTopicOrder.indexOf(right);
		const leftRank = leftIndex === -1 ? preferredTopicOrder.length : leftIndex;
		const rightRank = rightIndex === -1 ? preferredTopicOrder.length : rightIndex;
		return leftRank - rightRank || left.localeCompare(right);
	});
	const interleaved: ClaimSummary[] = [];
	let addedClaim = true;

	while (addedClaim) {
		addedClaim = false;
		for (const topicSlug of topicSlugs) {
			const nextClaim = groups.get(topicSlug)?.shift();
			if (!nextClaim) continue;
			interleaved.push(nextClaim);
			addedClaim = true;
		}
	}

	return interleaved;
}
