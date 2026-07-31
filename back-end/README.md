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

Production refuses to start without a strong session secret and captcha secret. Vault AppRole credentials must be supplied as a complete pair; once Vault is configured, a Vault outage fails closed rather than falling back to another database URI.

`SEED_CONTENT_MODE=insert` is the safe startup default. It creates missing source-controlled records but does not overwrite editorial database changes. Use `SEED_CONTENT_MODE=sync` only as a reviewed, backup-protected content promotion, then return the service to `insert`.

Admin creation and evidence migrations use the same Vault-or-`MONGODB_URI` selection as the API:

```bash
npm run -w back-end build
npm run -w back-end create-admin
npm run -w back-end migrate:evidence-landscape:v1
```

Interactive publication and demotion are stateful workflows. Verified experts edit drafts; admins explicitly publish, record completed reviews, request updates, archive or restore claims, approve or demote evidence landscapes, and provide the required public or private rationale.

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
npm ci --include=optional --strict-allow-scripts
npm run verify:native-lock
npm run lint
npm run typecheck
npm run build
npm test
npm audit
```

## Diagnostics

`GET /api/setup/status` is for internal launch and deployment checks. In production it is disabled unless `ENABLE_INTERNAL_DIAGNOSTICS=true`; enabled callers must supply `x-internal-diagnostics-key` matching a strong `INTERNAL_DIAGNOSTICS_KEY`. Loopback and forwarded addresses never grant access. Do not expose that key to browser runtime config, the public proxy, or logs.

## Evidence Boundary

Provider metadata can help discover, normalize, monitor, and enrich sources. It must not automatically decide:

- the consensus conclusion
- the certainty label
- the public bottom line
- whether a medical, safety, or public-health claim is safe to publish
