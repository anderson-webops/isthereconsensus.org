export const CONTENT_COVERAGE_TARGET = Object.freeze({
	minimumReviewedClaims: 500,
	minimumActiveTopics: 25
});

interface CoverageClaim {
	topicSlug: string;
	status: string;
}

interface CoverageTopic {
	slug: string;
	title: string;
	order: number;
}

export interface TopicCoverage {
	slug: string;
	title: string;
	reviewedClaimCount: number;
}

export interface ContentCoverageSnapshot {
	reviewedClaimCount: number;
	activeTopicCount: number;
	definedTopicCount: number;
	claimGap: number;
	activeTopicGap: number;
	targetReached: boolean;
	topics: TopicCoverage[];
	unlistedTopicSlugs: string[];
}

export function summarizeContentCoverage(
	claims: readonly CoverageClaim[],
	topics: readonly CoverageTopic[]
): ContentCoverageSnapshot {
	const reviewedClaims = claims.filter(claim => claim.status === "published");
	const reviewedClaimsByTopic = new Map<string, number>();

	for (const claim of reviewedClaims) {
		reviewedClaimsByTopic.set(
			claim.topicSlug,
			(reviewedClaimsByTopic.get(claim.topicSlug) ?? 0) + 1
		);
	}

	const topicSlugs = new Set(topics.map(topic => topic.slug));
	const topicCoverage = topics
		.toSorted((left, right) => left.order - right.order)
		.map(topic => ({
			slug: topic.slug,
			title: topic.title,
			reviewedClaimCount: reviewedClaimsByTopic.get(topic.slug) ?? 0
		}));
	const activeTopicCount = topicCoverage.filter(topic => topic.reviewedClaimCount > 0).length;
	const unlistedTopicSlugs = [...reviewedClaimsByTopic.keys()]
		.filter(slug => !topicSlugs.has(slug))
		.toSorted();

	return {
		reviewedClaimCount: reviewedClaims.length,
		activeTopicCount,
		definedTopicCount: topics.length,
		claimGap: Math.max(0, CONTENT_COVERAGE_TARGET.minimumReviewedClaims - reviewedClaims.length),
		activeTopicGap: Math.max(0, CONTENT_COVERAGE_TARGET.minimumActiveTopics - activeTopicCount),
		targetReached:
			reviewedClaims.length >= CONTENT_COVERAGE_TARGET.minimumReviewedClaims
			&& activeTopicCount >= CONTENT_COVERAGE_TARGET.minimumActiveTopics
			&& unlistedTopicSlugs.length === 0,
		topics: topicCoverage,
		unlistedTopicSlugs
	};
}
