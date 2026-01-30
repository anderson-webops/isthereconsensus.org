# Is There Consensus?

Marketing site for isthereconsensus.org. This repo is a small monorepo with a Nuxt 4 front-end and a Node back-end.

## Stack

- Nuxt 4 + Vue 3
- Pinia
- UnoCSS

## Repo layout

- `front-end/` - Nuxt app (SSR)
- `back-end/` - API/server utilities

## Getting started

```bash
npm install
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