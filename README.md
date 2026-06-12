# Is There Consensus?

Public-interest evidence-literacy site for [isthereconsensus.org](https://isthereconsensus.org/). The product helps readers inspect whether a public scientific claim reflects broad expert agreement, active debate, weak evidence, or a misleading single-study headline.

The site is deliberately not a truth oracle, medical-advice tool, or automated consensus engine. Source discovery, metadata enrichment, and monitoring can be automated; consensus conclusions, certainty labels, and public bottom lines stay editorial.

## Stack

- Nuxt 4 + Vue 3
- Pinia
- UnoCSS
- Express
- MongoDB / Mongoose
- Vitest
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

```bash
npm ci
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

# Unit tests and accessibility smoke checks
npm test
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
npm ci
npm run lint
npm run typecheck
npm run build
npm run smoke:ssr-assets
npm run smoke:ssr-routes
npm test
npm audit
```

If public route structure, headings, forms, or claim pages changed, also run:

```bash
npm run a11y
```

After production deploys, run the live contract smoke:

```bash
npm run smoke:live
```

The same check is also available as the manual GitHub Actions workflow `Live smoke`.

To check a locally running built SSR server instead, point the smoke at that origin and use the frontend profile:

```bash
LIVE_SMOKE_BASE_URL=http://127.0.0.1:4068 LIVE_SMOKE_PROFILE=frontend npm run smoke:live
```

## Deployment note: static vs SSR and /var/www

The deploy script treats static and SSR Nuxt sites differently:

- Static mode (`FE_MODE="static"`):
  - Build output is `front-end/dist/` (copied from `.output/public` during build).
  - Deploy step rsyncs `front-end/dist/` into `/var/www/<site>/`.
  - Nginx serves files directly from `/var/www/<site>/`.

- SSR mode (`FE_MODE="nuxt-ssr"`):
  - Build output is the Nitro server plus public assets under `front-end/.output/`.
  - Deploy step rsyncs `front-end/.output/` into `/srv/<site>/front-end/.output/`.
  - The systemd frontend service serves the site; `/var/www/<site>/` is not used and remains empty.

Why this matters: if you see `/var/www/stridewithus.co` populated but `/var/www/isthereconsensus.org` empty, that is expected for SSR sites unless `/var/www` was filled manually or via a custom step. Dates on `/var/www` files often reveal that they were copied long ago and are not part of the current SSR deploy path.

Options if you want `/var/www/<site>/` populated for an SSR site:

1) Keep SSR and leave `/var/www/<site>/` empty (recommended).
   - Most correct for SSR: Nginx should proxy to the frontend service.
2) Keep SSR and mirror public assets into `/var/www/<site>/`.
   - Add a deploy step to rsync `front-end/.output/public/` into `/var/www/<site>/`.
   - Useful if you want Nginx to serve static assets directly.
3) Keep SSR and make `/var/www/<site>/` a symlink or bind mount.
   - Point it at `/srv/<site>/front-end/.output/public/`.
   - Keeps a single source of truth for public assets.
4) Switch the site to static (`FE_MODE="static"`).
   - `/var/www/<site>/` will be populated from `front-end/dist/`.
   - Loses server-side rendering; SSR-only routes or APIs must move to the backend.

## Launch coordination

- `/setup` is a development-only diagnostics page. In production, use the protected diagnostics APIs instead of rendering an operational UI.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) documents the recommended production topology and required environment variables.
- In production same-origin mode, set `PUBLIC_API_BASE=/api` so browser runtime config never leaks `127.0.0.1`, `localhost`, or an internal port.
