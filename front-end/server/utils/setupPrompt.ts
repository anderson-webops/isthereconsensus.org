import type { LaunchTask } from "~/types/setup";

const trailingSlashPattern = /\/+$/;

function trimTrailingSlash(value: string) {
	return value.replace(trailingSlashPattern, "");
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
- Product features now include expert-review applications, community sentiment polling, moderation queues, and live literature search via OpenAlex

Your job:
1. Audit the existing server state, repo checkout, env files, services, and nginx configuration.
2. Install any missing runtime dependencies needed for a stable production deploy.
3. Build both workspaces and configure two restart-on-boot services:
   - isthereconsensus-frontend: runs the Nuxt SSR server from front-end/.output/server/index.mjs
   - isthereconsensus-backend: runs the compiled backend from back-end/dist/server.js
4. Configure nginx and TLS so the public site serves the Nuxt frontend and proxies /api/, /healthz, /readyz, and /_dbinfo to the backend.
5. Prefer same-origin deployment. Set PUBLIC_API_BASE=/api unless you intentionally want an absolute public API origin instead.
6. Verify secure cookies, CORS behavior, Mongo connectivity, captcha configuration, OpenAlex integration, and health endpoints.
7. Enable automatic restart on failure and restart on boot for both services.
8. Leave the server in a working, verified state and report the exact files changed plus the final validation output.

Required environment/config checks:
- NODE_ENV=production
- SESSION_SECRET set to a long random value
- PUBLIC_API_BASE set to /api for same-origin proxying, or to an intentional absolute public API origin
- CAPTCHA_SECRET and PUBLIC_CAPTCHA_SITEKEY configured for production posting
- OPENALEX_EMAIL set for polite-pool literature lookups; OPENALEX_API_KEY optional but recommended for higher limits
- VAULT_ADDR / VAULT_ROLE_ID / VAULT_SECRET_ID or MONGODB_URI configured
- Any frontend env needed by Nuxt must be available at build time

Validation you must run before stopping:
- curl the public homepage and confirm a 200 response
- curl the backend /healthz and /readyz endpoints through nginx
- confirm login/register requests can set cookies successfully
- confirm a topic list request succeeds from the public site origin
- confirm expert-application, topic-sentiment, question-flag, and evidence-search API endpoints respond correctly through the public origin
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
		body: "Set NODE_ENV, SESSION_SECRET, PUBLIC_API_BASE, any private internal API base, Mongo/Vault credentials, Turnstile keys, and OpenAlex credentials before opening the site."
	},
	{
		title: "Observability",
		body: "Confirm journalctl access, rotate logs, and keep health checks exposed for deployment verification."
	},
	{
		title: "Product integrations",
		body: "Ensure the API can reach OpenAlex outbound, and keep Mongo collections for expert applications, sentiment votes, flags, and questions backed up together."
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
		title: "Review flows",
		body: "Expert applications, question flags, and sentiment votes should all persist correctly and be visible to the correct user role."
	},
	{
		title: "Evidence search",
		body: "The literature search endpoint should return results from OpenAlex through the backend without mixed-origin or outbound-network issues."
	},
	{
		title: "Recovery path",
		body: "Restart both services once to confirm they come back cleanly and keep serving traffic."
	}
];
