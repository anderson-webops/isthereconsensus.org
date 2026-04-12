import type { H3Event } from "h3";

const httpPattern = /^https?:\/\//;
const trailingSlashPattern = /\/$/;
const leadingSlashPattern = /^\//;

function xmlEscape(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function formatLastmod(value?: string) {
	if (!value) return "";
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) return "";
	return parsed.toISOString();
}

function resolveApiBase(event: H3Event) {
	const config = useRuntimeConfig(event);
	const requestOrigin = getRequestURL(event).origin;
	const configured = String(config.apiInternalBase || config.public.apiBase || "/api");

	if (httpPattern.test(configured)) return configured.replace(trailingSlashPattern, "");

	return new URL(configured.replace(leadingSlashPattern, ""), `${requestOrigin}/`)
		.toString()
		.replace(trailingSlashPattern, "");
}

export default defineEventHandler(async (event) => {
	const origin = getRequestURL(event).origin;
	const apiBase = resolveApiBase(event);
	const staticRoutes: Array<{ path: string; lastmod?: string }> = [
		{ path: "/" },
		{ path: "/account-deletion-and-retention" },
		{ path: "/ask" },
		{ path: "/automation-and-ai" },
		{ path: "/claim-roadmap" },
		{ path: "/conflicts-and-funding" },
		{ path: "/consensus" },
		{ path: "/copyright-and-trademark" },
		{ path: "/corrections" },
		{ path: "/evidence-ops" },
		{ path: "/expert-review-program" },
		{ path: "/explainers" },
		{ path: "/future-roadmap" },
		{ path: "/governance" },
		{ path: "/how" },
		{ path: "/methods" },
		{ path: "/misconceptions" },
		{ path: "/moderation-and-appeals" },
		{ path: "/policy-center" },
		{ path: "/privacy" },
		{ path: "/search-demand" },
		{ path: "/source-standards" },
		{ path: "/standards" },
		{ path: "/terms" }
	];

	let dynamicRoutes: Array<{ path: string; lastmod?: string }> = [];

	try {
		const topicsResponse = await $fetch<{ topics?: Array<{ slug: string; updatedAt?: string }> }>(
			`${apiBase}/topics`
		);
		const topics = topicsResponse.topics ?? [];
		const topicRoutes = topics.map(({ slug, updatedAt }) => ({
			path: `/consensus/${slug}`,
			lastmod: updatedAt
		}));
		const claimRouteGroups = await Promise.all(
			topics.map(async ({ slug, updatedAt }) => {
				const claimsResponse = await $fetch<{
					claims?: Array<{ slug: string; updatedAt?: string; lastReviewedAt?: string }>;
				}>(`${apiBase}/topics/${slug}/claims`);
				return (claimsResponse.claims ?? []).map(
					({ slug: claimSlug, updatedAt: claimUpdatedAt, lastReviewedAt }) => ({
						path: `/consensus/${slug}/${claimSlug}`,
						lastmod: claimUpdatedAt || lastReviewedAt || updatedAt
					})
				);
			})
		);

		dynamicRoutes = [...topicRoutes, ...claimRouteGroups.flat()];
	} catch {
		dynamicRoutes = [];
	}

	const seen = new Set<string>();
	const body = [...staticRoutes, ...dynamicRoutes]
		.filter((entry) => {
			if (seen.has(entry.path)) return false;
			seen.add(entry.path);
			return true;
		})
		.map((entry) => {
			const loc = new URL(entry.path, `${origin}/`).toString();
			const lastmod = formatLastmod(entry.lastmod);
			return `<url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}</url>`;
		})
		.join("");

	setHeader(event, "content-type", "application/xml; charset=utf-8");

	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
});
