# Security Policy

`isthereconsensus.org` handles accounts, sessions, community submissions, editorial workflow data, and deployment diagnostics. Please report security issues privately instead of opening a public issue.

## Reporting A Vulnerability

Use GitHub private vulnerability reporting if it is available for this repository. The deployed site also exposes the standard reporting pointer at `https://isthereconsensus.org/.well-known/security.txt`. If GitHub private reporting is not available, email `consensus@isthereconsensus.org` or contact the maintainer through the GitHub profile associated with this repository and include:

- affected route, endpoint, package, or workflow
- impact and likely severity
- reproduction steps or a minimal proof of concept
- whether any data exposure, account access, or secret leakage occurred

Do not include exploit details in public issues, pull requests, Reddit posts, or community discussion threads before a fix is available.

## Sensitive Areas

- session cookies and auth routes
- admin/editorial claim and source APIs
- expert-application and community-submission data
- development-only `/setup` UI and protected `/api/setup/status` / `/api/setup-prompt` diagnostics
- Vault, MongoDB, CAPTCHA, analytics, and provider API keys
- deployment scripts, nginx/systemd config, and environment handling

## Operational Expectations

- Production diagnostics are disabled by default. Enabling them requires a strong `INTERNAL_DIAGNOSTICS_KEY`; neither loopback access nor forwarded IP headers are authorization.
- Public API reads, writes, authentication attempts, evidence searches, and search suggestions are rate-limited independently so expensive discovery paths cannot bypass the general API limits.
- Public browser config should use `PUBLIC_API_BASE=/api` in same-origin production deployments.
- Do not commit `.env` files, secret screenshots, database dumps, raw user exports, or private incident logs.
- Treat third-party evidence-provider responses as untrusted input. Normalize and display them safely.
- Account email/password changes are self-service only, require the current password, and revoke older signed sessions.
- Admin logins ignore the user-facing remember option and expire after eight hours; new CLI-created admin passwords require at least 16 characters.
- Verified experts may prepare drafts and submit them for review. Admin authentication is required for final approval, publication, review completion, update requests, archival, restoration, evidence demotion, and topic creation.
- Public claim change summaries and private evidence-workflow notes are separate fields. Moderation and demotion actions require a rationale, and private notes are not serialized through public APIs.
- Question removal erases public content and publicly exposed account attribution, archives the question, and preserves restricted moderation flags and audit history rather than allowing an account owner to erase safety records.
- Restart-time source seeding is insert-only by default. Synchronizing existing editorial content requires an explicit, backup-protected `SEED_CONTENT_MODE=sync` promotion.
- CLI administration, migrations, and the API share the same fail-closed database-secret path: partial or unavailable configured Vault credentials never trigger an environment fallback.

## Supported Branch

Routine work currently targets the stable `v1.x` line on `main`.
