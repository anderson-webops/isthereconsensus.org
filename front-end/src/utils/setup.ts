import type { SetupCheck, SetupDashboardResponse } from "~/types/setup";

export interface LaunchTask {
	title: string;
	body: string;
}

const trailingSlashPattern = /\/+$/;
const localUrlPattern = /localhost|127\.0\.0\.1|0\.0\.0\.0/i;

function trimTrailingSlash(value: string) {
	return value.replace(trailingSlashPattern, "");
}

export function isLocalUrl(value: string) {
	return localUrlPattern.test(value);
}

export function buildServerAgentPrompt({ siteUrl, apiBase }: { siteUrl: string; apiBase: string }) {
	const normalizedSiteUrl = trimTrailingSlash(siteUrl);
	const normalizedApiBase = trimTrailingSlash(apiBase);

	return `You are finishing production deployment for isthereconsensus.org.

Project facts:
- Repo root: /srv/isthereconsensus.org
- Frontend: Nuxt 4 SSR app in front-end/
- Backend: Express API in back-end/
- Frontend runtime should ultimately serve ${normalizedSiteUrl}
- Frontend is currently configured to call ${normalizedApiBase || normalizedSiteUrl}
- Backend default port is 3011
- Auth uses secure cookies, so reverse proxy and environment settings must support that
- MongoDB is required; Vault AppRole is preferred, MONGODB_URI fallback is supported

Your job:
1. Audit the existing server state, repo checkout, env files, services, and nginx configuration.
2. Install any missing runtime dependencies needed for a stable production deploy.
3. Build both workspaces and configure two restart-on-boot services:
   - isthereconsensus-frontend: runs the Nuxt SSR server from front-end/.output/server/index.mjs
   - isthereconsensus-backend: runs the compiled backend from back-end/dist/server.js
4. Configure nginx and TLS so the public site serves the Nuxt frontend and proxies /api/, /healthz, /readyz, and /_dbinfo to the backend.
5. Prefer same-origin deployment. If possible, set PUBLIC_API_BASE=${normalizedSiteUrl} so browser requests do not depend on a separate public API origin.
6. Verify secure cookies, CORS behavior, Mongo connectivity, captcha configuration, and health endpoints.
7. Enable automatic restart on failure and restart on boot for both services.
8. Leave the server in a working, verified state and report the exact files changed plus the final validation output.

Required environment/config checks:
- NODE_ENV=production
- SESSION_SECRET set to a long random value
- PUBLIC_API_BASE set to the public site origin or an intentional public API origin
- CAPTCHA_SECRET and PUBLIC_CAPTCHA_SITEKEY configured for production posting
- VAULT_ADDR / VAULT_ROLE_ID / VAULT_SECRET_ID or MONGODB_URI configured
- Any frontend env needed by Nuxt must be available at build time

Validation you must run before stopping:
- curl the public homepage and confirm a 200 response
- curl the backend /healthz and /readyz endpoints through nginx
- confirm login/register requests can set cookies successfully
- confirm a topic list request succeeds from the public site origin
- confirm both services are enabled and active in systemd

Constraints:
- Do not stop at analysis; make the changes.
- Do not rewrite application logic unless a minimal deployment fix is required.
- If you find a mismatch between frontend origin, API origin, and cookie/CORS settings, fix it rather than just reporting it.
- If a secret value is missing, create a clear placeholder only when necessary and report exactly what still must be supplied manually.`;
}

export const serverPreparationTasks: LaunchTask[] = [
	{
		title: "System services",
		body: "Run the Nuxt SSR app and Express API as separate systemd services with restart-on-failure and boot persistence."
	},
	{
		title: "Reverse proxy",
		body: "Terminate TLS in nginx, serve the frontend at the site origin, and proxy /api plus health routes to the backend."
	},
	{
		title: "Environment",
		body: "Set NODE_ENV, SESSION_SECRET, PUBLIC_API_BASE, Mongo/Vault credentials, and Turnstile keys before opening the site."
	},
	{
		title: "Observability",
		body: "Confirm journalctl access, rotate logs, and keep health checks exposed for deployment verification."
	}
];

export const launchValidationTasks: LaunchTask[] = [
	{
		title: "Homepage render",
		body: "The public site should render over HTTPS without mixed-content errors or missing assets."
	},
	{
		title: "Backend health",
		body: "Through the public proxy, /healthz should return ok and /readyz should confirm Mongo readiness."
	},
	{
		title: "Auth and posting",
		body: "Register/login should set cookies successfully, and posting a question should work without CORS or captcha misconfiguration."
	},
	{
		title: "Recovery path",
		body: "Restart both services once to confirm they come back cleanly and keep serving traffic."
	}
];

export function buildFrontendSetupChecks(dashboard: SetupDashboardResponse): SetupCheck[] {
	const siteAndApiMatch = trimTrailingSlash(dashboard.siteUrl) === trimTrailingSlash(dashboard.apiBase);

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
			ok: siteAndApiMatch || !isLocalUrl(dashboard.apiBase),
			severity: "warning",
			detail: siteAndApiMatch
				? "The frontend is pointing at the same public origin."
				: `The frontend is targeting ${dashboard.apiBase}; make sure proxy and CORS settings match that choice.`,
			action: "For the simplest production setup, proxy the API through the site origin and set PUBLIC_API_BASE to that origin."
		}
	];
}
