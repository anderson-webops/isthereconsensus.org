# Back End

Express API for `isthereconsensus.org`. The backend owns persistence, auth, community intake, editorial claim/source data, setup diagnostics, and evidence-search proxying. Nuxt pages should not call third-party evidence providers directly.

## Responsibilities

- MongoDB-backed users, sessions, questions, claims, topics, expert applications, and source records.
- Editorial APIs for claim review, source stacks, source counts, and review metadata.
- Community APIs for asking questions, flagging, sentiment signals, and moderation state.
- Internal diagnostics for launch and deployment readiness.
- Evidence-provider access through backend utilities and, over time, the provider gateway described in `../docs/evidence-api-integration-roadmap.md`.

## Local Setup

Copy the example environment file and fill in the values needed for the task:

```bash
cp back-end/.env.example back-end/.env
npm ci
npm run -w back-end server
```

Minimum local development environment:

- `MONGODB_URI`
- `SESSION_SECRET`
- `PORT=3011`
- `PUBLIC_API_BASE`

Production also needs the deployment variables documented in `../DEPLOYMENT.md`.

## Scripts

```bash
npm run -w back-end server
npm run -w back-end server:once
npm run -w back-end lint
npm run -w back-end typecheck
npm run -w back-end build
npm run -w back-end test
```

Run root-level validation before shipping a backend change:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm test
npm audit
```

## Diagnostics

`GET /api/setup/status` is for internal launch and deployment checks. In production, callers must supply `x-internal-diagnostics-key` matching `INTERNAL_DIAGNOSTICS_KEY`. Do not expose that key to browser runtime config or public logs.

## Evidence Boundary

Provider metadata can help discover, normalize, monitor, and enrich sources. It must not automatically decide:

- the consensus conclusion
- the certainty label
- the public bottom line
- whether a medical, safety, or public-health claim is safe to publish
