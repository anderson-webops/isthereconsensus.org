# Moderated coverage roadmap

`/roadmap` and `/roadmap/:id` expose separately approved research questions,
their planned/researching/published status and deliberately public progress
explanations. `/ask` links to the roadmap. The admin workspace at
`/account/editorial/roadmap` creates private drafts, previews public copy,
approves summaries, links reviewed answers and withdraws questions.

## Publication and privacy

The `CoverageRequest` collection is distinct from `ReaderFeedback`. An optional
private `feedbackId` references a live suggestion without copying its original
message, title, source URL, account details or tracking fields. The reader
feedback queue links to an empty draft form with only this private reference.
Expired or unavailable suggestions cannot become new references.

Creation always produces a private draft. Approval and every subsequent public
edit require explicit public-summary confirmation and a separately written
10-500-character public progress explanation. A private audit rationale is
required on every write and is never reused as a public explanation. Public
serialization and database projections explicitly whitelist safe fields.
Drafts and withdrawn records return 404 on public detail lookup.

Only enabled, session-current administrators can create, edit, approve or
withdraw. Client-supplied actor, visibility, audit and secret fields are refused.
Writes use a revision-checked atomic update, so stale and racing requests fail
with 409 instead of overwriting another editor. Unconfirmed UI writes require
a queue reload; POST and PATCH are not automatically retried. Private audit
and public progress history each retain the latest 100 entries.

Published status requires a currently public, source-ready review. Public reads
recheck readiness rather than exposing a draft or withdrawn answer. If a linked
answer becomes unavailable, its URL is omitted and readers see an explicit
unavailable state. Administrators can still withdraw the request in that state.
Roadmap operations never publish or alter the scientific review itself.

## API

- `GET /api/coverage`: public approved rows, bounded page/limit and status filter.
- `GET /api/coverage/:id`: one public question and approved progress history.
- `GET /api/admin/coverage`: admin-only private/public/withdrawn moderation queue.
- `POST /api/admin/coverage`: create a private draft, optionally linked to a
  still-active private evidence suggestion.
- `PATCH /api/admin/coverage/:id`: revision-checked save, approve or withdraw,
  with independent private and public notes.

All responses are private/no-store, including errors and authentication denial.
Admin pages are private/no-store and noindex/nofollow. Inputs are rendered as
text, with no raw HTML or automatic fetching of submitted links.

## Validation and rollout

The existing owned MongoDB/backend/built-browser harness invokes
`scripts/coverage-roadmap-smoke.mjs`. It exercises actual signed sessions,
approval, public field isolation, revision races, restart persistence,
readiness changes, withdrawal, private blank draft inputs and the browser
publication flow. Unit tests cover strict validators, DTO fields and defaults;
the accessibility fixture includes roadmap list/detail and anonymous admin
access. These complement, rather than replace, authenticated runtime checks.

No content backfill or startup publication is added. The additive collection
and indexes use normal model initialization. Deploy the matching backend before exposing
the new frontend. Existing private suggestions are unchanged, and rollback
does not require deleting the additive collection. Request following now extends
the shared reader library with browser-local and optional account selections;
see `reader-library.md` for compatibility, privacy and update-feed behavior.
Substantive content expansion and public deployment acceptance remain separate
milestones in `reader-driven-expansion-goal.md`.

### Local acceptance, October 4, 2026

Root clean installation, both lock-policy checks, lint, frontend/backend
typechecks and production builds passed. All 360 frontend, 292 backend and six
dependency-compatibility tests passed without skips. The accessibility suite
passed 224 route/theme cases, including roadmap list/detail and anonymous admin
access. Runtime module loading, public assets and private route headers passed.

The new roadmap's actual signed-session/database/browser checks passed approval,
withdrawal, answer readiness, race rejection, restart persistence, private
serialization, empty suggestion-linked draft inputs, public preview confirmation
and both-theme mobile/enlarged-text accessibility. Desktop/mobile screenshots
were inspected. The complete combined library/editorial regression and built
search-browser suites also passed. CI remains a separate delivery check.
No new scientific reviews, guides, request following or production publication
are claimed by this milestone.
