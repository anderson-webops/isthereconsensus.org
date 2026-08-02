# Is There Consensus?

Public-interest evidence-literacy site for [isthereconsensus.org](https://isthereconsensus.org/). The product helps readers inspect whether a public scientific claim reflects broad expert agreement, active debate, weak evidence, or a misleading single-study headline.

The site is deliberately not a truth oracle, medical-advice tool, or automated consensus engine. Source discovery, metadata enrichment, and monitoring can be automated; consensus conclusions, certainty labels, and public bottom lines stay editorial.

## Stack

- Nuxt 4 + Vue 3
- Pinia
- UnoCSS
- Express
- MongoDB / Mongoose
- Node test runner
- Axe smoke checks

## Repo layout

- `front-end/` - Nuxt app (SSR)
- `back-end/` - API/server utilities
- `docs/` - launch, accessibility, and evidence-provider planning notes
- `scripts/` - repo-level validation and maintenance scripts

## Docs

- [`docs/evidence-api-integration-roadmap.md`](./docs/evidence-api-integration-roadmap.md) - repo-specific plan for evidence-provider integration, normalization, and monitoring
- [`docs/accessibility-qa.md`](./docs/accessibility-qa.md) - manual and automated accessibility QA checklist
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - production topology, environment variables, and diagnostics notes
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) - contribution rules for code, copy, evidence, and review boundaries
- [`SECURITY.md`](./SECURITY.md) - vulnerability reporting and operational security expectations

## Getting started

Use Node `24.18.1` and npm `12.0.2`; `.node-version`, `.nvmrc`, package engines, CI, and the direct systemd deployment all pin that production toolchain.

```bash
npm ci --include=optional --strict-allow-scripts
npm run dev
```

This starts the front-end in dev mode at `http://localhost:3000`.

For API-backed local work, copy `back-end/.env.example` to `back-end/.env`, set `MONGODB_URI`, and run the backend separately:

```bash
npm run -w back-end server
```

## Common scripts

```bash
# Front-end dev
npm run dev

# Front-end SSR build + serve
npm run build
npm run serve

# Lint + typecheck
npm run lint
npm run typecheck

# Unit tests and built-app accessibility smoke checks
npm test
npm run build
npm run a11y
```

For workspace-specific scripts:

```bash
npm run -w front-end dev
npm run -w front-end build
npm run -w front-end serve
npm run -w back-end server
```

## Launch quality gates

Run these from the repository root before shipping a meaningful change:

```bash
npm ci --include=optional --strict-allow-scripts
npm run verify:native-lock
npm run lint
npm run typecheck
npm run build
npm run smoke:ssr-assets
npm run smoke:ssr-routes
npm run a11y
npm test
npm audit
npm audit --omit=dev
npm audit signatures
```

After production deploys, run the live contract smoke:

```bash
npm run smoke:live
```

The same check is also available as the manual GitHub Actions workflow `Live smoke`. Pass the expected commit when you need to prove production is running the current build:

```bash
LIVE_SMOKE_EXPECT_COMMIT=$(git rev-parse --short=12 HEAD) npm run smoke:live
```

If `/deployment.json` is missing, the live smoke also reports the Nuxt build id from `/_nuxt/builds/latest.json`. A stale build id there means the public frontend service has not picked up the latest deployment artifact yet.

To check a locally running built SSR server instead, point the smoke at that origin and use the frontend profile:

```bash
LIVE_SMOKE_BASE_URL=http://127.0.0.1:4068 LIVE_SMOKE_PROFILE=frontend npm run smoke:live
```

## Direct production deployment

Production runs without Docker or a container registry. Each release is a clean Git checkout under `/srv/isthereconsensus.org/releases/<release>`, prepared as the unprivileged deployment user and then atomically promoted through `/srv/isthereconsensus.org/current`.

Two hardened systemd services run the compiled Nuxt SSR frontend and Express API from that immutable release. Nginx terminates dual-stack TLS and proxies the public site and API to their loopback listeners. `/var/www/isthereconsensus.org` is intentionally unused because this is an SSR application.

Preparation runs the clean-install, dependency, security, native-binding, test, build, SSR, and accessibility gates before replacing the dependency tree with a clean production-only install. Promotion verifies both service readiness and the exact public source identity, and restores the prior release if any check fails. See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the host setup and commands.

## Launch coordination

- `/setup` is a development-only diagnostics page. In production, use the protected diagnostics APIs instead of rendering an operational UI.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) documents the recommended production topology and required environment variables.
- In production same-origin mode, set `NUXT_PUBLIC_API_BASE=/api` and keep the private backend address in `NUXT_API_INTERNAL_BASE`, so browser runtime config never leaks `127.0.0.1`, `localhost`, or an internal port.
