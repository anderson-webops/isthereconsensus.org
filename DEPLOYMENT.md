# Production Deployment

`isthereconsensus.org` is a two-service deployment:

- `front-end/`: Nuxt 4 SSR app
- `back-end/`: Express API with MongoDB-backed auth and questions

## Recommended topology

- Run the Nuxt SSR server as one systemd service.
- Run the Express API as a separate systemd service on port `3011`.
- Terminate TLS in nginx.
- Serve the public site at the main origin.
- Proxy `/api/`, `/healthz`, and `/readyz` from nginx to the backend.
- Keep `/_dbinfo`, `/api/setup/status`, and `/api/setup-prompt` off the public reverse proxy; use them over a host-local listener when diagnostics are explicitly enabled.
- Prefer same-origin browser API access by setting `NUXT_PUBLIC_API_BASE=/api` in the frontend service.
- Keep the backend's private address server-only by setting `NUXT_API_INTERNAL_BASE`; never put it in a `NUXT_PUBLIC_*` variable.

## Required environment

Install the pinned Node `24.18.1` and npm `12.0.2` toolchain before building or starting the host services.

Backend/runtime:

- `NODE_ENV=production`
- `SESSION_SECRET` (a unique value of at least 32 characters)
- `HOST=127.0.0.1`
- `PORT=3011`
- `TRUST_PROXY_IPS=loopback` when nginx connects over loopback; otherwise list only the exact trusted proxy addresses
- `PUBLIC_SITE_URL`
- `CAPTCHA_SECRET`
- `PUBLIC_CAPTCHA_SITEKEY`

Frontend/runtime (`/etc/isthereconsensus/web.env`):

- `NODE_ENV=production`
- `NUXT_PUBLIC_SITE_URL=https://isthereconsensus.org`
- `NUXT_PUBLIC_API_BASE=/api`
- `NUXT_API_INTERNAL_BASE=http://127.0.0.1:3011`
- `NUXT_PUBLIC_CAPTCHA_SITE_KEY`

Choose exactly one database-secret path:

- Vault: set `VAULT_ADDR`, `VAULT_ROLE_ID`, and `VAULT_SECRET_ID` together. A configured Vault failure stops startup; it does not silently fall back.
- Environment: leave both AppRole variables unset and set `MONGODB_URI`.

Optional:

- `CORS_ORIGIN`, as an exact comma-separated origin allowlist when a browser frontend is hosted separately
- `SOURCE_COMMIT`, `SOURCE_TAG`, or `RELEASE_VERSION` to expose non-secret frontend build identity through `/deployment.json`
- `CROSS_SITE=true`
- `ENABLE_TOPIC_CREATION=true`
- `SEED_CONTENT_MODE=insert` (the safe default), which adds missing source-controlled records without overwriting editorial database changes
- Backend diagnostics: `ENABLE_INTERNAL_DIAGNOSTICS=true` plus a unique `INTERNAL_DIAGNOSTICS_KEY` of at least 32 characters
- Frontend diagnostics proxy: `ENABLE_INTERNAL_DIAGNOSTICS=true` plus a matching server-only `NUXT_INTERNAL_DIAGNOSTICS_KEY`

`SEED_CONTENT_MODE=sync` is an explicit content-promotion operation: it synchronizes existing seeded claims and sources and archives source-controlled retirements. Take a database backup, review the source diff, use `sync` for the controlled promotion, and return the service to `insert` afterward. Do not leave restart-time synchronization enabled as a substitute for the authenticated editorial workflow.

## Build and start

```bash
npm ci --include=optional --strict-allow-scripts
npm run verify:native-lock
npm run build
npm run smoke:ssr-assets
npm run smoke:ssr-routes
npm run -w front-end start
npm run -w back-end start
```

The frontend build never reads `back-end/.env`. Supply public build metadata explicitly when needed, and supply secrets only to the running service through the protected frontend or backend environment file. Nuxt runtime overrides use the `NUXT_*` names shown above.

After the public reverse proxy is serving the new build, run:

```bash
npm run smoke:live
```

`smoke:ssr-routes` verifies built-output redirect and indexing headers for deprecated, private, and low-profile routes. `smoke:live` verifies the public homepage, deployment metadata, crawler metadata, security reporting metadata, install manifest, health routes, hidden setup UI, and protected setup diagnostics. For a non-production origin, set `LIVE_SMOKE_BASE_URL` and `LIVE_SMOKE_PROFILE=frontend`. To prove the public origin is running a specific build, also set `LIVE_SMOKE_EXPECT_COMMIT` to the expected commit prefix.

The hardened reference units and reverse-proxy configuration live in `deploy/systemd/` and `deploy/nginx/`. Install the code under `/srv/isthereconsensus.org`, create a dedicated unprivileged `isthereconsensus` account, keep environment files under `/etc/isthereconsensus/` with owner-only permissions, and validate nginx/systemd configuration before promotion.

If `/deployment.json` returns `404`, `smoke:live` also fetches `/_nuxt/builds/latest.json` and reports the live Nuxt build id/timestamp. Use that fallback to distinguish a stale frontend deploy from a backend/source-stack problem.

The same check is available from GitHub Actions as the manual `Live smoke` workflow. Use it after deploys when shell access to the deployment host is unavailable.

Frontend deployment metadata is served at `/deployment.json` with non-secret fields only. It should report `service: "front-end"`, `runtime: "nuxt-ssr"`, Nuxt's build ID, and the build commit/ref when `SOURCE_COMMIT`, `SOURCE_TAG`, GitHub Actions metadata, or a checked-out `.git` directory is available at build time.

Security reporting metadata is served by Nuxt SSR middleware at `/.well-known/security.txt` and `/security.txt`. Do not depend on nginx or `/var/www` static copies for those paths; `npm run smoke:ssr-assets` verifies the built Nitro server returns them as `text/plain`.

## Health checks

- Frontend readiness: load the homepage over HTTPS.
- Backend liveness: `GET /healthz`
- Backend readiness: `GET /readyz`
- Setup diagnostics: `GET /api/setup/status`

Production diagnostics are disabled unless `ENABLE_INTERNAL_DIAGNOSTICS=true`. The `/setup` UI is development-only and should return not-found in production. When diagnostics are enabled, requests require a strong `INTERNAL_DIAGNOSTICS_KEY` supplied as `x-internal-diagnostics-key`; loopback addresses and forwarded headers are not authorization.

## Deployment notes

- Cookie auth expects HTTPS in production.
- If frontend and backend live on different public origins, configure `CORS_ORIGIN` precisely and keep secure cookie settings aligned.
- Credential changes increment the account session version. Existing cookies without the current version and all older cookies are rejected, so users may need to sign in again after this release.
- Interactive claim publication, review, update requests, archival, restoration, evidence approval, and evidence publication use explicit admin-only state transitions with recorded reasons. Generic edits cannot mutate published or archived claims.
- Admin creation and evidence migrations use the same fail-closed Vault-or-environment database selection as the API. A configured Vault failure never falls back to `MONGODB_URI`.
- Never copy the repository’s ignored `back-end/.env` into an image or source bundle. Keep production environment files mode `0600`.
- The frontend setup page at `/setup` exposes live readiness data plus a launch prompt only in development. Use the protected setup APIs for production diagnostics.
