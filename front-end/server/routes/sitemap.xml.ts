function xmlEscape(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll("\"", "&quot;")
		.replaceAll("'", "&apos;");
}

function unique<T>(values: T[]) {
	return Array.from(new Set(values));
}

function resolveApiBase(event: Parameters<typeof defineEventHandler>[0]) {
	const config = useRuntimeConfig(event);
	const requestOrigin = getRequestURL(event).origin;
	const configured = String(config.apiInternalBase || config.public.apiBase || "/api");

	if (/^https?:\/\//.test(configured))
		return configured.replace(/\/$/, "");

	return new URL(configured.replace(/^\//, ""), `${requestOrigin}/`).toString().replace(/\/$/, "");
}

export default defineEventHandler(async (event) => {
	const origin = getRequestURL(event).origin;
	const apiBase = resolveApiBase(event);
	const staticRoutes = [
		"/",
		"/ask",
		"/consensus",
		"/explainers",
		"/how",
		"/methods",
		"/privacy",
		"/standards",
		"/terms"
	];

	let dynamicRoutes: string[] = [];

	try {
		const topicsResponse = await $fetch<{ topics?: Array<{ slug: string }> }>(`${apiBase}/topics`);
		const topics = topicsResponse.topics ?? [];
		const topicRoutes = topics.map(({ slug }) => `/consensus/${slug}`);
		const claimRouteGroups = await Promise.all(
			topics.map(async ({ slug }) => {
				const claimsResponse = await $fetch<{ claims?: Array<{ slug: string }> }>(`${apiBase}/topics/${slug}/claims`);
				return (claimsResponse.claims ?? []).map(({ slug: claimSlug }) => `/consensus/${slug}/${claimSlug}`);
			})
		);

		dynamicRoutes = [...topicRoutes, ...claimRouteGroups.flat()];
	} catch {
		dynamicRoutes = [];
	}

	const body = unique([...staticRoutes, ...dynamicRoutes])
		.map((route) => {
			const loc = new URL(route, `${origin}/`).toString();
			return `<url><loc>${xmlEscape(loc)}</loc></url>`;
		})
		.join("");

	setHeader(event, "content-type", "application/xml; charset=utf-8");

	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
});
