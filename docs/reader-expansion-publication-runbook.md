# Protected reader-expansion publication

This is an operator handoff for the full 201-review source expansion, not
authorization, an executable publisher or a production receipt. Source authoring
and disposable fixture publication do not establish public availability. Obtain
separate permission for coordination, production deployment and actual editorial
publication. Do not repeat the already completed twenty-review living-evidence
refresh.

## Prepare a source-bound proposal

Use a verified, committed source checkout, its pinned toolchain and root clean
installation. Do not load production `.env` or start application services merely
to prepare the file. From the repository root, run:

```sh
node --import tsx back-end/src/scripts/prepareReaderExpansion.ts --output /private/evidence/reader-expansion-source-proposal.json
```

Replace the example output location with an existing operator-owned private
evidence directory outside served web roots. The tool requires committed backend
source, dependency and toolchain inputs, writes exclusively with mode 0600, does not overwrite a file or accept
origin/credential options, and performs no HTTP request, authentication or database
connection. Only source identities, counts and digests are printed. Run it again
with a new output name if the source changes; never relabel an old plan with a new
commit.

The proposal includes all 201 explicit canonical paths, exact draft payloads,
all 461 ordered citation payloads and independent content/citation digests. It
preserves the 277 narrative items longer than the former 280-character bound.
Generation time is not a source-check, editorial-review or publication date.
Seed status, legacy change logs, planned announcements and production IDs are not
copied into the draft payload. Actual IDs and publication timestamps must come
from the authenticated workflow. The source baseline count is not a current
production count. A source hash does not establish live citation status, scientific
agreement, independent expert review or successful publication.

## Gates before any production mutation

1. Record actual deployed backend/frontend identities, selected source and exact
   artifact/contract verification. Frontend `/deployment.json` alone does not
   establish backend compatibility. Preserve current services, host-owned paths,
   credentials, ports, IPv4 and IPv6. Source release notes do not authorize a
   deployment or adapter/configuration change.
2. Take a fresh complete database backup. Restore-test every actual collection
   and its indexes into isolated, access-restricted infrastructure. Include users,
   admins, sessions, account activity, feedback, libraries, revisions, citations
   and internal state; do not assume an old collection count still applies.
   Retain digests, inventory comparisons and recovery instructions privately.
   A local backup is not an off-site backup.
3. Read current targets through the authenticated editorial workflow. Resolve
   each canonical path to its observed ID and status. Missing records may be
   proposed as drafts. Matching already-published records are read-only acceptance,
   not candidates for another publication. Existing drafts, citation notices,
   reviews or conflicting public records require explicit reconciled proposals;
   never overwrite divergence, manufacture IDs or approve it through seeding.
4. Recheck citation provenance and notices with authoritative sources. Preserve
   provider labels separately from notice URLs and retain valid existing IDs,
   order and metadata. Provider failure is unknown coverage, not a clean scan.
5. Rehearse the complete reconciled batch against the restored snapshot using
   authenticated HTTP and isolated services/providers. Exercise actual existing
   records as well as new drafts, exact full-text round trips, legacy labels,
   readiness rejection, revision actors, canonical slugs, notices, rollback and
   private-state preservation. Account for only explicitly expected audit/revision
   events and normal expiration; review every other difference. Do not drop failed
   targets or loosen a guard to get a passing subset.

The repository's `node scripts/reader-library-smoke.mjs` is a regression check,
not this production-snapshot rehearsal. It deliberately owns and deletes fixtures
in its disposable database and refuses remote/non-owned destinations. Never aim
that fixture runner at production or bypass its destination checks.

## Explicit promotion and actual acceptance

Promote only the exact reconciled, fully rehearsed proposal with an authorized
administrator session and the existing editorial endpoints:

- `POST /api/editorial/claims` creates a draft with the explicit canonical slug.
- `POST /api/editorial/claims/:id/sources` adds validated, ordered citations.
- `PATCH /api/editorial/claims/:id` edits the observed draft without silent
  truncation or unrelated field changes.
- `POST /api/editorial/claims/:id/publish` requires admin authorization and
  readiness. Supply an honest revision note and review date based on the actual
  editorial assessment, not the proposal's generation time. Do not imply an
  independent expert review that did not occur.

Stop on conflicts or unconfirmed mutations. An observation timeout is not proof
that a write failed; read back before considering another write. Honor bounded
rate limits without changing server limits. Never log passwords, signed cookies,
raw authorization headers, tokens or private documents. Do not create a duplicate
admin, reset credentials, mutate the database directly or modify compiled output.

Record observed claim/citation/revision/update IDs privately. Verify every target
anonymously through its article API and rendered canonical page, comparing full
paragraphs, ordered citations, scope and uncertainty. Verify at least 1,001 distinct
public canonical reviews, with unrelated and private state preserved. Only actual
public coverage can enable whole-library `1000+` wording; filtered and operational
counts remain exact. Retain a sanitized receipt that distinguishes newly published,
already matching, failed, pending and withdrawn records. Never publish raw backups,
inventories, credentials or the private reconciliation proposal.

The full expansion goal also requires all intended guides, separately approved
public roadmap summaries and follow-to-answer/update acceptance. Do not invent
reader submissions or demand to populate a roadmap. Fresh search relevance and
separate explanation-usefulness evidence remain their own unfinished gates, not
facts established by publishing this batch.
