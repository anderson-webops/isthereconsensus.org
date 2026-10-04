# Saved reviews, comparisons and followed questions

## Reader experience

`/library` collects saved reviews, saved evidence comparisons, followed topics
and approved requested questions. Review, comparison, topic and public roadmap
pages expose compact Save/Follow controls. The update feed distinguishes
editorial question progress from substantive published scientific changes.
Registration is optional: **This browser** stores selections in the current
browser profile; **My account** stores them on the server for the authenticated
user or admin. Signing in never uploads browser selections automatically.
Copying the browser library to an account requires an explicit action.

The two libraries remain separate. Readers can remove individual selections or
confirm clearing the selected library. A library holds up to 200 reviews, 50
comparisons, 100 topics and 100 requested questions. Clearing browser site data removes its local library. Anyone sharing
that browser profile can see browser-local selections.

Account libraries are keyed by the authenticated role and account ID. Client
requests cannot choose an owner. Account contents are not cached in browser
storage, and an identity/scope change aborts outstanding reads and clears the
previous account's state. Revision-checked writes prevent silent overwrites;
uncertain saves require reloading before another write. Clearing an account
library is never automatically retried against a newer revision.

Unavailable reviews, comparisons and questions remain removable references. A request failure does not
remove saved references or mislabel them as withdrawn. Corrupt local storage is
preserved until the reader explicitly clears it.

## API and privacy

All `/api/library/*` responses use `Cache-Control: private, no-store`.
The `/library` page is also private/no-store and noindex/nofollow; its server
render contains no personal selections.

- `GET /api/library/account`: authenticated account's revision and selections.
  Reading an empty library does not create a database record.
- `PATCH /api/library/account`: replace selections using the current revision.
  Unknown fields, duplicate/invalid IDs and excessive lists are rejected.
  New references must resolve to public content. Conflicts return 409.
  `savedComparisonSlugs` contains canonical comparison slugs, not arbitrary URLs
  or review IDs. Omitting this field preserves existing comparisons for older
  clients; an explicit empty array clears them.
  `followedCoverageRequestIds` contains public roadmap IDs. Omitting it preserves
  existing followed questions for older clients; an empty array explicitly
  clears them. New private or withdrawn questions cannot be added. Existing
  unavailable references can be kept or removed without disclosing their copy.
- `POST /api/library/resolve`: read-only public titles/topics for the supplied
  selection. No anonymous library is created.
- `POST /api/library/updates`: read-only public announcements for selected
  reviews **or** followed topics, using a bounded cursor and 30-row pages.
  `includeComparisons: true` explicitly opts into comparison rows for saved
  comparisons or their followed topics. Omitted/false stays review-only, even
  when an older client sends `savedComparisonSlugs`. Rows have exactly one
  `review`, `comparison` or `coverageRequest` target. Setting
  `includeCoverageRequests: true` independently opts into approved question progress and available answer
  announcements; it also selects scientific updates for the currently linked
  reviewed answer. Omitted/false leaves existing review/comparison selection
  behavior unchanged. The new library opts into both extensions.

Selection bodies contain IDs and comparison slugs, not raw search text. POST keeps interests out of
URL query strings. Do not add request-body logging, interest events to account
activity logs, email notifications or third-party analytics for these selections.
The existing same-origin, signed-session and request-size protections apply.
Account-deletion operators must remove the corresponding `ReaderLibrary`
record along with routine account data; browser-only selections are cleared on
the reader's device. No new automatic account-deletion workflow is introduced.

## What enters the feed

Only explicit announcements enter the feed. Neither old `changeLog` entries nor
legacy publication/review dates are backfilled as new activity. The feed covers
the last 90 days, retains at most 100 announcements per review, comparison or question and rechecks the
current publication state and source readiness on every request. Draft,
needs-update, archived and source-unready content is excluded.

Comparison history is an explicit, source-controlled list on each public
comparison. Every event has a stable UUID, fixed UTC date, substantive summary,
kind (`new_comparison`, `evidence_update`, `correction`), bottom-line impact and
source IDs belonging to that comparison. New comparison pairs with impact
`new`; later changes must use changed, unchanged or not assessed. Invalid,
duplicate and future entries are omitted safely; catalog tests reject invalid
data, overlong histories and IDs reused by canonical review announcements.
Removing a comparison from the public registry also removes it from the feed.

Requested-question events use `coverage_progress` or `requested_answer` and
never imply a scientific bottom-line change. Every deliberate public approval
or changed public progress explanation receives a stable UUID and fixed date.
Unchanged saves and private-note-only edits do not create public activity. Old
approved history remains readable with deterministic IDs derived exclusively
from its public request ID, date, status and explanation, without rewriting
history or using private audit data. History is capped at 100 entries.

An answer-linked event appears only while the current approved question links
an available, source-ready published answer. Its subsequent scientific
announcements are selected automatically without requiring a separate review
save. Draft or source-unready answers expose neither a review URL nor their
announcements. Private or withdrawn questions expose no title, summary,
history or answer through either resolver or feed. The feed rechecks public
selection before serialization; a withdrawn reference stays removable through
a generic unavailable placeholder. All three row types use the same frozen
90-day date/UUID cursor ordering and bounded 30-row pages.

The first three entries preserve original source-release timestamps: electricity
v1.20.0 at 2026-09-11T19:27:39Z, caffeine v1.21.0 at 20:12:32Z and strength
supplements v1.22.0 at 20:50:09Z. These are not claims about public deployment
time or publication dates of the underlying studies. Never bump them on rebuild,
deployment or cosmetic edits. Comparison pages expose this source-release history
and its evidence links. Pagination merges both content types by descending date
and binary UUID with a fixed 90-day snapshot; saved-plus-followed matches appear
once. Source-unready reviews are removed without making pagination unbounded.

The first administrative publication creates a `new_review` event. On
republication, the admin must choose no announcement, `evidence_update`, or
`correction`. Substantive updates require a public change summary and an explicit
bottom-line impact: changed, unchanged or not assessed. Cosmetic edits and
review-check timestamps do not create announcements. The approved publication
and announcement are saved together in the claim document. Optimistic
concurrency prevents a stale editor from overwriting a newer publication.

### Source-controlled releases

For new or substantively revised canonical content, add an optional
`readerAnnouncement` to that claim in `back-end/src/data/claims.ts`:

```ts
readerAnnouncement: {
  id: "a697f757-9c57-45f7-9fd0-dc76d61a0368", // Example only; create a unique UUID.
  date: "2026-09-11T12:00:00Z", // Actual, fixed publication timestamp.
  kind: "evidence_update",
  summary: "Explain the substantive reader-visible change and its evidence.",
  bottomLineImpact: "unchanged"
}
```

Use a new globally unique UUID for each new announcement and retain that UUID
and date across retries. Never generate them at startup or bump them merely to
make content look fresh. `new_review` must pair with impact `new`; an update or
correction must not. Omit the announcement for cosmetic edits.

The seed workflow records an announcement only after content and source
synchronization and a public-readiness check. Existing insert-only restarts
remain unchanged. Updating an existing canonical record still requires the
repository's explicit `SEED_CONTENT_MODE=sync` release workflow. This feature
does not enable that mode or alter production environment configuration. The
bounded event history deduplicates retained UUIDs, and seed writes advance the
claim version so stale editors cannot silently undo the synchronization.

## Verification and rollout

Unit tests cover browser-storage failures, scope and identity changes,
conflicting/uncertain account writes, publication classification, cursor
validation and every declared seed announcement.

After the production build, `node scripts/reader-library-smoke.mjs` runs the real
backend and built frontend with signed test sessions and a fresh local MongoDB
database. It verifies ownership, first-write races, persistence after restart,
publication/readiness filtering, pagination, real save/follow/sign-out flows,
storage recovery, and populated-library accessibility. It creates only isolated
test data and cleans up its own servers and database. CI supplies a disposable
loopback MongoDB service through `READER_SMOKE_MONGO_PORT`; local runs may use
`MONGOD_BINARY`. Remote database URLs and application `.env` files are not used.

Run the repository's clean install, lock-policy checks, tests, lint, typecheck,
build, SSR/runtime smoke, search/guide browser checks and accessibility suite.
MongoDB adds the reader-library collection on first account write and the claim
feed index through the existing model initialization. There is no content
backfill or destructive migration. Older application versions ignore the
additive database fields and collection, subject to the browser compatibility
notes below. Verify the public release identity and library
route/API after deployment without creating test accounts in production.

### Comparison compatibility and rollout

The public comparison catalog lives in `back-end/src/data/comparisons/`, inside
the standalone backend deployment boundary. Nuxt re-exports the same pure data;
there is no duplicate publication list or database lookup for comparison bodies.
Library resolution returns only the requested published titles, slugs and
descriptions. Unknown references can remain saved, but new account additions
must belong to the current catalog. No new collection or destructive migration
is needed.

Browser storage retains the existing key and reads legacy versions 1 and 2 in
memory, defaulting followed questions to an empty array. It writes version 3
only after the reader explicitly changes their library. Older browser clients
reject version 3 instead of silently dropping comparison saves or question
follows; they can resume after refreshing to the new application. Corrupt or unknown
versions are preserved until an explicit clear. Account data is never cached in
browser storage or automatically copied on sign-in.

Deploy the backend and frontend from the same release, with the backend ready
before serving the new client. New clients fail closed against an old account
response that lacks comparison selections. For rollback, keep the additive
backend support or expect comparison-aware account writes to be unavailable;
do not reset browser libraries or strip stored selections to make them appear
compatible. Old clients talking to the new backend preserve comparisons when
they replace reviews/topics without the new field.

The following extension adds only a default-empty array and optional public
history IDs; no destructive migration or automatic browser upload is needed.
Deploy the matching backend before exposing the new client. For rollback,
retain the additive backend support rather than removing stored selections.
Request following sends no email notifications, and following never approves
a question, publishes an answer or alters scientific content.

### Requested-question acceptance, October 4, 2026

Root clean installation, both lock-policy checks, lint, frontend/backend
typechecks, production build and all 677 unit/compatibility tests passed without
skips or failures. Built backend module loading, public assets and private
route headers passed. Dependencies and both deployment lockfiles are unchanged.

The complete disposable signed-session/database/built-browser workflow passed
legacy PATCH omission, browser version migration, account isolation, explicit
browser copying, stale-write recovery, actual approved progress and editorial
answer publication, subsequent scientific updates, source readiness, restart
stability, withdrawal privacy and unavailable-reference removal. Sixty-four
same-date legacy events paginated over three pages without duplicate IDs or a
database backfill; later events stayed outside the frozen page window. Both
themes passed 320px/200%-text accessibility checks and screenshots were inspected.
An initial run timed out navigating an unrelated existing priority page; the
complete serial rerun passed without weakening checks or changing rate limits.
CI and independent public deployment remain separate delivery gates.

Saved comparisons open the default comparison view. A page address carries a
particular outcome/context/option selection and can be copied separately. This
milestone does not add comparison announcements to the review-update feed or
comparison-specific feedback; both remain tracked in the practical-evidence goal.

### Local acceptance, September 11, 2026

Clean install and both lock-policy checks passed without dependency changes.
Lint, frontend/backend typechecks and the production build passed. All 278
frontend and 164 backend tests passed. The real database/browser integration,
backend runtime, SSR assets and route headers passed. Search/guide browser
checks and accessibility across 33 routes in light and dark modes passed;
populated-library accessibility was checked separately in both modes. The
fixed development search set remains 100/100 top-three matches and 20/20 honest
empty results, not a blind evaluation or a measured visitor-success rate.

Workflow syntax validation passed. The optional guarded local Actions-security
scanner did not run because its installed version differs from the approved
version; it is not counted as a passed check. Public release acceptance remains
separate from these local results.

### Public acceptance, September 11, 2026

Release v1.18.0 and merged-main CI identify
`f146045bcaa071935fb91bde394b4b2663dcd726`. The public `/deployment.json`
reports that exact commit and tag. `scripts/live-reader-library-smoke.mjs`
passed against it: private/no-store library headers, noindex, anonymous account
API denial, actual resolver content and browser-local save/follow/reload/removal.
The production-profile live smoke also passed, including readiness and hidden
setup diagnostics. No production accounts or database records were created;
account persistence and signed-session isolation were exercised in the isolated
MongoDB/browser harness and CI, not by manipulating a real reader's account.
