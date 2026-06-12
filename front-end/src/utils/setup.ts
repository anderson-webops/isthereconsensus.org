import type { SetupCheck, SetupDashboardResponse } from "~/types/setup";

const trailingSlashPattern = /\/+$/;
const localUrlPattern = /localhost|127\.0\.0\.1|0\.0\.0\.0/i;

function trimTrailingSlash(value: string) {
	return value.replace(trailingSlashPattern, "");
}

export function isLocalUrl(value: string) {
	return localUrlPattern.test(value);
}

export function buildFrontendSetupChecks(dashboard: SetupDashboardResponse): SetupCheck[] {
	const siteAndApiMatch = trimTrailingSlash(dashboard.siteUrl) === trimTrailingSlash(dashboard.apiBase);
	const sameOriginApiPath = dashboard.apiBase === "/api";

	return [
		{
			id: "frontend-health",
			label: "Nuxt frontend",
			ok: dashboard.frontend.ok,
			severity: "critical",
			detail: dashboard.frontend.detail,
			action: "Ensure the frontend service is running and nginx points traffic at it."
		},
		{
			id: "backend-health",
			label: "Backend reachability",
			ok: dashboard.backendHealth.ok,
			severity: "critical",
			detail: dashboard.backendHealth.detail,
			action: "Confirm the backend process is listening and reachable from the frontend host."
		},
		{
			id: "backend-ready",
			label: "Backend readiness",
			ok: dashboard.backendReady.ok,
			severity: "critical",
			detail: dashboard.backendReady.detail,
			action: "Fix Mongo connectivity or any startup issue before going live."
		},
		{
			id: "origin-alignment",
			label: "Public origin alignment",
			ok: sameOriginApiPath || siteAndApiMatch || !isLocalUrl(dashboard.apiBase),
			severity: "warning",
			detail: sameOriginApiPath
				? "The frontend is pointing at /api, which is the preferred same-origin production setup."
				: siteAndApiMatch
					? "The frontend is pointing at the same public origin."
					: `The frontend is targeting ${dashboard.apiBase}; make sure proxy and CORS settings match that choice.`,
			action: "For the simplest production setup, proxy the API through the site origin and set PUBLIC_API_BASE=/api."
		}
	];
}
