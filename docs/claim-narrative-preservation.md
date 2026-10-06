# Faithful authenticated claim narratives

Authenticated claim creation and editing share narrative-specific validation
for `stableCore`, `openQuestions`, `whatWouldChangeMinds` and `misconceptions`.
New content permits at most twelve nonblank items per field and a thousand
JavaScript string characters per item. Newly supplied text is trimmed; blank
entries are removed. Exceeding either bound, submitting a non-list or including
non-text items returns HTTP 400 before saving a claim or creating its revision.
The error names the field and bound without echoing submitted text.

These four fields previously used a generic normalizer that silently cut each
item at 280 characters. Source inspection identified 277 affected items across
135 of the 201 expansion reviews. The longest explanation has 651 characters.
The new bounds preserve all authored paragraphs without removing the existing
request-size, permission, draft/update-status or publication-readiness guards.
Other scalar/list normalizers and global citation URL validation are unchanged.

A full-content edit that resubmits an unchanged title also retains the stored
canonical slug. Previously the editor could silently derive a different URL
from that same title, even though the draft had been created with an explicit
canonical slug. An explicitly submitted slug still takes precedence; an actual
title change without a slug retains the existing automatic derivation behavior.

## Legacy records

An omitted field retains its stored list. An exact round trip retains a legacy
list even when it exceeds today's count or length limits, including its existing
whitespace. A known oversized item can remain beside a changed bounded item;
new oversized text is rejected. A changed list must respect the twelve-item
bound. An explicit empty list clears only the submitted field.

This is an authenticated input compatibility repair, not a database migration.
No stored article is rewritten automatically. The editor can display the API's
validation error while retaining the unsaved form. Existing scientific
conclusions, source-check dates and independent-review qualifications do not
change merely because narrative validation changes.

## Acceptance scope

`back-end/test/claim-narratives.test.ts` covers all four fields in every authored
expansion review, exact bounds, malformed input, rejection without shortening,
immutable inputs and legacy preservation. Unit normalization is not sufficient
proof of authenticated creation or actual public availability.

`scripts/claim-narrative-smoke.mjs` runs inside the existing isolated reader
rehearsal. It rejects non-loopback origins and non-owned disposable database
names. After the seeded-content checks, it removes only that disposable
database's expansion seed rows, then creates all 201 canonical drafts, adds all
461 citations, edits and publishes each through authenticated HTTP endpoints.
It compares complete submitted content and citation metadata against editorial
and anonymous API responses, checks actual revision actors, and verifies IDs,
paragraphs, dates and announcements after backend restart. Separate scenarios
cover authorization, malformed/oversized rejection without writes, legacy
round trips, unchanged-title URL stability, explicit/renamed slugs, strict
citation URLs and incomplete-publication rejection. Private
collections and unrelated claims/citations must remain unchanged.

The client honors bounded HTTP 429 retry delays without changing server limits.
Unexpected authentication or mutation responses stop the rehearsal, rather than
retrying a potentially completed write. Failure diagnostics expose only
whitelisted authentication-error categories and child exit/signal states, not
raw child logs, passwords, cookies or private documents.

Run the repository's full native checks and build, then
`node scripts/reader-library-smoke.mjs`. The runner owns fixture accounts,
fresh database state and loopback services; it does not read production `.env`
or accept a remote database URI. Production publication still needs its
separately authorized, backed-up editorial workflow and public readback. Fixture
publication, authored source totals and a source release are not production
acceptance or proof of the separate search-usefulness goal.
