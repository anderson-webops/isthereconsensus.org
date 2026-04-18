# Is There Consensus?

Marketing site for isthereconsensus.org. This repo is a small monorepo with a Nuxt 4 front-end and a Node back-end.

## Stack

- Nuxt 4 + Vue 3
- Pinia
- UnoCSS

## Repo layout

- `front-end/` - Nuxt app (SSR)
- `back-end/` - API/server utilities

## Docs

- [`docs/evidence-api-integration-roadmap.md`](./docs/evidence-api-integration-roadmap.md) - repo-specific plan for evidence-provider integration, normalization, and monitoring

## Getting started

```bash
npm ci
npm run dev
```

This starts the front-end in dev mode at `http://localhost:3000`.

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
```

For workspace-specific scripts:

```bash
npm run -w front-end dev
npm run -w front-end build
npm run -w front-end serve
npm run -w back-end server
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

- `/setup` in the frontend now surfaces live readiness checks plus a copyable server-agent prompt.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) documents the recommended production topology and required environment variables.
- In production same-origin mode, set `PUBLIC_API_BASE=/api` so browser runtime config never leaks `127.0.0.1`, `localhost`, or an internal port.
