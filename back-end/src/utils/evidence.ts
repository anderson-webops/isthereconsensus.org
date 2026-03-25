import { env } from "node:process";

export interface EvidenceResult {
	id: string;
	title: string;
	year?: number;
	journal?: string;
	url?: string;
	doi?: string;
	citedByCount?: number;
	type?: string;
	authors: string[];
}

interface OpenAlexWork {
	id?: string;
	display_name?: string;
	publication_year?: number;
	type?: string;
	cited_by_count?: number;
	doi?: string;
	primary_location?: {
		landing_page_url?: string;
		source?: {
			display_name?: string;
		};
	};
	authorships?: Array<{
		author?: {
			display_name?: string;
		};
	}>;
}

export async function searchEvidence(query: string) {
	const normalizedQuery = query.trim();
	if (!normalizedQuery) {
		return {
			provider: "openalex",
			configured: Boolean(env.OPENALEX_API_KEY || env.OPENALEX_EMAIL),
			results: [] as EvidenceResult[]
		};
	}

	const url = new URL("https://api.openalex.org/works");
	url.searchParams.set("search", normalizedQuery);
	url.searchParams.set("per-page", "6");
	url.searchParams.set("sort", "cited_by_count:desc");
	url.searchParams.set("filter", "is_retracted:false");
	url.searchParams.set(
		"select",
		"id,display_name,publication_year,type,cited_by_count,doi,primary_location,authorships"
	);
	if (env.OPENALEX_EMAIL) {
		url.searchParams.set("mailto", env.OPENALEX_EMAIL);
	}
	if (env.OPENALEX_API_KEY) {
		url.searchParams.set("api_key", env.OPENALEX_API_KEY);
	}

	const response = await fetch(url.toString(), {
		headers: {
			Accept: "application/json"
		}
	});
	if (!response.ok) {
		throw new Error(`OpenAlex request failed with ${response.status}`);
	}

	const data = (await response.json()) as { results?: OpenAlexWork[] };
	const results = (data.results || []).map(work => ({
		id: work.id || "",
		title: work.display_name || "Untitled work",
		year: work.publication_year,
		journal: work.primary_location?.source?.display_name,
		url: work.primary_location?.landing_page_url || work.doi || work.id,
		doi: work.doi,
		citedByCount: work.cited_by_count,
		type: work.type,
		authors: (work.authorships || [])
			.map(authorship => authorship.author?.display_name || "")
			.filter(Boolean)
			.slice(0, 5)
	}));

	return {
		provider: "openalex",
		configured: Boolean(env.OPENALEX_API_KEY || env.OPENALEX_EMAIL),
		results
	};
}
