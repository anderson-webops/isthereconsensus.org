# Production Deployment

`isthereconsensus.org` is a two-service deployment:

- `front-end/`: Nuxt 4 SSR app
- `back-end/`: Express API with MongoDB-backed auth and questions

## Recommended topology

- Run the Nuxt SSR server as one systemd service.
- Run the Express API as a separate systemd service on port `3011`.
- Terminate TLS in nginx.
- Serve the public site at the main origin.
- Proxy `/api/`, `/healthz`, `/readyz`, and `/_dbinfo` from nginx to the backend.
- Prefer same-origin API access by setting `PUBLIC_API_BASE=/api`.
- If the backend is only reachable on an internal address, keep that value private by setting `INTERNAL_API_BASE` or `API_INTERNAL_BASE` instead of exposing it to the browser.

## Required environment

Backend/runtime:

- `NODE_ENV=production`
- `SESSION_SECRET`
- `PUBLIC_SITE_URL`
- `PUBLIC_API_BASE`
- `INTERNAL_API_BASE` or `API_INTERNAL_BASE` if the frontend should reach the backend through a private server-side origin
- `INTERNAL_DIAGNOSTICS_KEY`
- `CAPTCHA_SECRET`
- `PUBLIC_CAPTCHA_SITEKEY`
- `VAULT_ADDR`, `VAULT_ROLE_ID`, `VAULT_SECRET_ID`

If Vault is not being used:

- `MONGODB_URI`

Optional:

- `CORS_ORIGIN`
- `CROSS_SITE=true`
- `ENABLE_TOPIC_CREATION=true`
- `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`

## Build and start

```bash
npm ci
npm run build
npm run smoke:ssr-assets
npm run -w front-end start
npm run -w back-end start
```

## Health checks

- Frontend readiness: load the homepage over HTTPS.
- Backend liveness: `GET /healthz`
- Backend readiness: `GET /readyz`
- Setup diagnostics: `GET /api/setup/status`

Production diagnostics are private. The `/setup` UI is development-only and should return not-found in production. Requests to `/api/setup/status` and `/api/setup-prompt` require the configured `INTERNAL_DIAGNOSTICS_KEY` supplied as `x-internal-diagnostics-key`.

## Deployment notes

- Cookie auth expects HTTPS in production.
- If frontend and backend live on different public origins, configure `CORS_ORIGIN` precisely and keep secure cookie settings aligned.
- The frontend setup page at `/setup` exposes live readiness data plus a launch prompt only in development. Use the protected setup APIs for production diagnostics.
