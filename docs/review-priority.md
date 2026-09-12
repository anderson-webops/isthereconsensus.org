# Review priorities

Admins can open **Editorial workspace → Review priorities** to manage follow-up
work on published reviews. The default queue orders unhandled retractions and
expressions of concern first, then other source notices, explicit update requests,
due reviews, active reader evidence requests, and inconsistent recorded dates.
Several reasons can apply to one review. This order is an operational aid, not a
ranking of scientific validity. Missing monitoring coverage is not a clean bill
of health.

Use **All published reviews** to find a review that is not currently flagged.
Search is a literal title search. The queue is paginated in the database, with a
default of 25 rows and an API maximum of 50. Source notices have separate pages of
ten rows. Query and database execution limits bound each request.

## Scheduling and handling

Scheduling requires a reason and a UTC date, or an empty date to remove the
deadline. It changes only the follow-up deadline, the private audit trail and
concurrency metadata. It does not establish a completed review, update the
literature cutoff, create a reader-facing content update, or change conclusions.
Dates beyond five years are rejected; a past deadline intentionally places a
review in the due queue. Concurrent or stale writes fail with a reload message.

Source decisions apply to the exact notice flags, identifiers, links and notes
the admin assessed. Marking a notice handled does not clear its public warning or
alter the scientific review. New or changed notice content reopens the queue item;
a routine check timestamp or reordered duplicate links does not. Admins can also
reopen a decision manually. The history includes the assessed notice snapshot.

Schedule and source histories retain the most recent 100 actions with a revision,
timestamp, responsible admin identifier and reason. Names are resolved from the
current admin directory; a deleted account retains its identifier. These are
bounded operational histories, not an indefinite compliance archive.

Reader requests use the existing private feedback workflow. The queue counts
unexpired `missing_evidence` and `content_gap` submissions in new, reviewing or
planned states, whether submitted against the review or subsequently linked to it.
A submission matching both paths counts once. The scoped feedback link includes
resolved requests so an admin can inspect their handling history.

## API and privacy

All routes require a current enabled admin and return `private, no-store`:

- `GET /api/admin/review-priority`: `page`, `limit`, `reason`, `query`, optional `topicId`.
- `GET /api/admin/review-priority/:id`: optional `sourcePage`.
- `PATCH /api/admin/review-priority/:id/schedule`: revision, expected deadline, replacement deadline and reason.
- `PATCH /api/admin/review-priority/:id/sources/:sourceId`: revision, current notice fingerprint, decision and reason.

Strict input schemas reject unknown fields. The existing mutation-origin policy
and admin authorization apply. Private maintenance fields are excluded from
ordinary claim queries and public/expert serializers. The browser clears private
data when authorization changes or a refresh is denied. Source links use the
existing safe external-link policy. Reader messages, login credentials and
session data are not copied into maintenance records.

## Rollout and validation

The new private `SourceNoticeReview` collection and optional claim `maintenance`
field are additive. Existing deadlines and warnings are preserved. Normal
insert-only content seeding is sufficient; there is no bulk content migration,
new environment setting, provider call, or unattended publication step.

Unit tests validate bounded input, notice identity and serializer privacy.
`scripts/reader-library-smoke.mjs` invokes the review-priority checks against its
own disposable loopback MongoDB, compiled server and built frontend. They exercise
permissions, queue/source pagination, concurrent writes, stale editorial saves,
notice reopening, feedback linkage and expiration, private history after restart,
actual admin browser saves, revoked-session clearing and responsive accessibility.
Production acceptance remains read-only; authenticated behavior is verified with
local fixture accounts, not newly created production accounts.
