# Reader feedback and editorial priorities

The public review page offers explanation-usefulness feedback and an expandable
missing-evidence form. `/ask` offers a separate private topic suggestion. These
are not public questions, scientific votes or automated publication requests.
The forms do not read or copy query text, use browser storage, or attach an
account identity. Input is retained in the open form after an uncertain failure;
it is cleared after confirmed receipt. Registration is not required.

## Private collection and abuse controls

- `POST /api/reader-feedback` accepts one strict, bounded shape: `usefulness`
  (review and boolean), `missing_evidence` (review, gap category, explanation and
  optional public source), or `content_gap` (title, explanation and optional
  topic/source). Unknown fields are rejected.
- The current publication and actual source-readiness checks gate review
  references. Missing topics are rejected; expired or removed content is never
  treated as a valid new review target.
- Free-text suggestions require the existing Turnstile check in production.
  The frontend loads it only when the explicit form is open. A missing runtime
  CAPTCHA secret fails closed in production. Tokens are never stored.
- All submissions have a 30-request/hour network limit in addition to existing
  API limits. It is an abuse control, not a promise to identify unique people.
  This deployment has one API process; scaling to multiple processes would
  require a shared rate-limit store.
- A keyed SHA-256 code over namespace, UTC day, network, kind, target and (for
  suggestions) normalized message is the document's unique ID. The network is
  normalized with the rate limiter's IPv6 helper. Usefulness is deduplicated
  once per network/review/day even when the boolean changes. Duplicate retries
  receive an acknowledgement without overwriting the first submission.
- The hash input uses a namespaced server secret; the raw address, account
  identity, cookies, auth headers and bot-check tokens are not written to the
  feedback collection or application logs. A code does not correlate a reader
  across targets or days. Existing infrastructure access-log policy is separate.
- Text is intentionally submitted to admins, not automatically captured. The
  form explicitly asks readers not to supply personal health details, contacts
  or private links. HTTP(S) source links with embedded credentials are rejected;
  submitted links are not fetched automatically. Vue renders text as text.
- Records and their last 50 triage decisions expire two years after submission.
  MongoDB TTL cleanup is asynchronous; API reads and edits exclude expired rows
  immediately. Review activity never extends the expiry.

## Admin workflow

`/account/editorial/reader-feedback` is linked only in the admin portion of the
editorial workspace. It shows a paginated queue filtered by type, status and
priority, ordered high-priority first and newest first within a priority. Each
submission links its original review where available and preserves its title.
It distinguishes useful/not-yet-useful explanations from evidence gaps.

Admins can set New, Reviewing, Planned, Resolved or Dismissed, select Low/Normal/
High priority, search for a claim or topic to link, and record a required reason
or next action. The original feedback is immutable through this API. Every
triage write records the admin, date, reason, disposition and links. Revision
checks reject stale writes, including ambiguous network retries. No triage
operation mutates a claim, its scientific conclusion or publication state.

- `GET /api/admin/reader-feedback` supports bounded `page`, `limit`, `kind`,
  `status`, `priority`, `claimId` and `topicId` filters.
- `GET /api/admin/reader-feedback/targets?query=...` searches bounded claim/topic
  titles for linking, including drafts. Its result is admin-only.
- `PATCH /api/admin/reader-feedback/:id` requires the current revision, explicit
  status/priority/link values and a 10-1,000-character reason. Destination
  existence is checked. Invalid references fail without writing.
- Every route uses the real admin middleware, rejecting anonymous users,
  ordinary users, verified experts and disabled/stale admin sessions. All
  feedback responses and the admin page are private/no-store; the page is
  noindex/nofollow and contains no feedback in SSR output.

## Verification and rollout

Unit tests cover strict fields, URL safety, limits, keyed deduplication, schema
secrets rejection, client no-query-capture and private UI contracts. The existing
disposable MongoDB/signed-cookie/built-browser harness now invokes
`scripts/reader-feedback-smoke.mjs`. It verifies concurrent deduplication,
admin-only pagination/filters/linking, expiry, stale-write rejection, scientific
state isolation, failed-form preservation, explicit anonymous suggestions,
real admin triage, sign-out and responsive light/dark accessibility. It never
uses production accounts or writes to the production database.

The normal install/lock, test, lint, typecheck, build, SSR, accessibility and
search/guide regression gates still apply. Deploy both services together.
This adds one collection and indexes; no content synchronization, backfill or
new secret is required. Preserve `SEED_CONTENT_MODE=insert`. The existing CAPTCHA
runtime configuration must be present for free-text submissions.

Release and public acceptance are pending. A successful local test or a GitHub
release alone is not proof that the public site is running the change.

### Local acceptance, September 11, 2026

Root clean installation, standalone backend install policy, native lock parity,
lint, both typechecks, backend/frontend tests and the production build passed.
The isolated database/browser harness passed, including restart persistence,
concurrent deduplication, ordinary-user and verified-expert denial, linked topic
resolution, stale-write rejection, retained failed submissions, real admin triage,
sign-out, request limits, mobile layouts and 200% text. Both modes passed axe;
the public form and populated admin queue screenshots were visually inspected.
The runtime, SSR assets/routes, search/guide browser and site-wide accessibility
regressions also passed. Dependencies and all lock/configuration files are unchanged.

After deployment, run `scripts/live-reader-feedback-smoke.mjs` with the approved
40-character `LIVE_SMOKE_EXPECT_COMMIT`. It verifies public forms, production
bot-check container, private headers and anonymous admin denial in a disposable
browser that rejects application writes. It never submits feedback, solves a
CAPTCHA, uses production credentials or creates accounts. Successful authenticated
triage, persistence and CAPTCHA fail-closed behavior are verified in isolated
tests; public form visibility is not claimed as a production write test.
