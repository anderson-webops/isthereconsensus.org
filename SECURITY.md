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
- Vault, MongoDB, Resend, CAPTCHA, analytics, and provider API keys
- deployment scripts, nginx/systemd config, and environment handling

## Operational Expectations

- Production diagnostics require `INTERNAL_DIAGNOSTICS_KEY` and must not be exposed through browser runtime config.
- Public browser config should use `PUBLIC_API_BASE=/api` in same-origin production deployments.
- Do not commit `.env` files, secret screenshots, database dumps, raw user exports, or private incident logs.
- Treat third-party evidence-provider responses as untrusted input. Normalize and display them safely.

## Supported Branch

Routine work currently targets the stable `v1.x` line on `main`.
