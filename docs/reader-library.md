# Saved reviews, comparisons and followed-topic updates

## Reader experience

`/library` collects saved reviews, saved evidence comparisons, followed topics
and a feed of substantive published review changes. Review, comparison and topic
pages expose compact Save/Follow controls.
Registration is optional: **This browser** stores selections in the current
browser profile; **My account** stores them on the server for the authenticated
user or admin. Signing in never uploads browser selections automatically.
Copying the browser library to an account requires an explicit action.

The two libraries remain separate. Readers can remove individual selections or
confirm clearing the selected library. A library holds up to 200 reviews, 50
comparisons and 100 topics. Clearing browser site data removes its local library. Anyone sharing
that browser profile can see browser-local selections.

Account libraries are keyed by the authenticated role and account ID. Client
requests cannot choose an owner. Account contents are not cached in browser
storage, and an identity/scope change aborts outstanding reads and clears the
previous account's state. Revision-checked writes prevent silent overwrites;
uncertain saves require reloading before another write. Clearing an account
library is never automatically retried against a newer revision.

Unavailable reviews and comparisons remain removable references. A request failure does not
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
- `POST /api/library/resolve`: read-only public titles/topics for the supplied
  selection. No anonymous library is created.
- `POST /api/library/updates`: read-only public announcements for selected
  reviews **or** followed topics, using a bounded cursor and 30-row pages.

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
the last 90 days, retains at most 100 announcements per review and rechecks the
current publication state and source readiness on every request. Draft,
needs-update, archived and source-unready content is excluded.

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

Browser storage retains the existing key and reads legacy version 1 in memory.
It writes version 2 only after the reader explicitly changes their library. An
older browser client rejects version 2 instead of silently dropping comparison
saves; it can resume after refreshing to the new application. Corrupt or unknown
versions are preserved until an explicit clear. Account data is never cached in
browser storage or automatically copied on sign-in.

Deploy the backend and frontend from the same release, with the backend ready
before serving the new client. New clients fail closed against an old account
response that lacks comparison selections. For rollback, keep the additive
backend support or expect comparison-aware account writes to be unavailable;
do not reset browser libraries or strip stored selections to make them appear
compatible. Old clients talking to the new backend preserve comparisons when
they replace reviews/topics without the new field.

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
