import type { SearchClaimMatch, SearchTopicMatch } from "~/types/board";

export interface SearchRouteLocation {
	path: string;
	query?: Record<string, string>;
}

interface SearchRouteInput {
	claims: SearchClaimMatch[];
	explainerSlug?: string;
	preferExplainer: boolean;
	query: string;
	topics: SearchTopicMatch[];
}

export function resolveHomeSearchRoute({
	claims,
	explainerSlug,
	preferExplainer,
	query,
	topics
}: SearchRouteInput): SearchRouteLocation {
	const normalizedQuery = query.trim();
	if (!normalizedQuery) return { path: "/consensus" };

	const exactClaims = claims.filter((claim) => claim.matchStrength === "exact");
	if (exactClaims.length === 1 && exactClaims[0]?.topic?.slug) {
		return { path: `/consensus/${exactClaims[0].topic.slug}/${exactClaims[0].slug}` };
	}

	const exactTopics = topics.filter((topic) => topic.matchStrength === "exact");
	if (!claims.length && exactTopics.length === 1 && exactTopics[0]?.slug) {
		return { path: `/consensus/${exactTopics[0].slug}` };
	}

	if (preferExplainer && explainerSlug) {
		return { path: `/explainers/${explainerSlug}` };
	}

	if (claims.length || topics.length) {
		return {
			path: "/consensus",
			query: { q: normalizedQuery }
		};
	}

	return {
		path: "/ask",
		query: { question: normalizedQuery }
	};
}
