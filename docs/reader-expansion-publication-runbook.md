# Protected reader-expansion publication

## Owner-approved content-first release

On October 9, 2026, the owner accepted the prepared material and explicitly
requested publication after assistant screening, with human moderation afterward.
The next protected deployment therefore publishes the fixed 201-review source
batch automatically after the backend starts listening, without blocking login
or health checks. Shutdown stops new import work, leaving interrupted records
resumable on the next start. No source agent connects to production
or obtains an administrator session. The previous requirement for a separate
human pre-publication promotion is superseded for this unchanged approved batch.

The publisher validates every review and citation before writes, stages missing
reviews as drafts, adds their complete citations, and applies the unchanged public
readiness checks before publication. A separate system journal reserves stable
claim/citation/roadmap identities so interrupted imports can resume. It does not
invent human reviewers, refresh source-check dates, truncate paragraphs or label
assistant assessment as independent expert review. Public roadmap entries identify
coverage-audit selections, not fictional reader submissions.

Existing records are never synchronized, republished, unarchived or overwritten.
Previously completed imports remain read-only, including later human corrections
and withdrawn roadmap entries. Divergent drafts and editorial revisions are left
for normal moderation. Failures leave incomplete work private and do not crash the
backend or reset accounts. MongoDB without replica-set transactions can leave
partial drafts or an incomplete journal; owned IDs and explicit readiness prevent
them from being mistaken for completed publication. Server backup, artifact,
resource, deployment and rollback safeguards remain in force.

The owner also accepts the current development evidence without requiring fresh
benchmark or real-reader comprehension certification for this release. Preserve
those failed/unscored records and treat future evaluation as follow-up, never as a
passed score. The optional model worker remains unactivated unless its own host
acceptance succeeds. Verify actual public publication after deployment before
claiming that the library has reached 1,001 or displaying `1000+`.

## Manual reconciliation workflow

The following remains available for conflicting records or later editorial batches.
It is an operator handoff for the full 201-review source expansion, not
authorization or a production receipt. The guarded operator runner described
below uses the existing authenticated editorial APIs. Source authoring
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

Use this source entrypoint only. A compiled or copied script could contain older
definitions while observing a newer repository commit, so the tool rejects those
locations rather than claiming a false source binding. Run it from the original
verified checkout after the clean install, not from a runtime artifact or copied
staging subtree.

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

## Guarded operator runner

Run this only within the separately authorized protected operator workflow or
an owned isolated rehearsal. Source-workspace agents must not run it against
production, obtain sessions, deploy services or mutate production records. The
runner neither logs in nor loads `.env`, seeds records, connects to MongoDB,
resets accounts, edits compiled files or changes service configuration.

Use the same committed source checkout and pinned installation used to generate
the proposal. All input files must be absolute paths to operator-owned regular
files with no group/world permissions. Outputs require an existing private
directory, are created exclusively with mode 0600 and are never overwritten.
Keep the existing signed administrator cookie pair in an authorized private
credential mount, not in command arguments, source, chat or release assets.

Prepare a private JSON options file with these fields:

```json
{
  "adminOrigin": "http://127.0.0.1:3011",
  "publicOrigin": "https://isthereconsensus.org",
  "cookieFile": "/private/operator/session-cookie",
  "proposalFile": "/private/evidence/reader-expansion-source-proposal.json",
  "outputFile": "/private/evidence/reader-expansion-editorial-plan.json"
}
```

The port is illustrative. Use the actual operator-owned loopback listener,
never change the host configuration to fit the example. In an isolated rehearsal,
both origins must identify the owned loopback fixture. Authenticated traffic is
restricted to numeric loopback addresses; redirects are refused. The configured
public origin supplies the existing CSRF origin check without disabling it.
Anonymous readback never receives cookies or other authentication headers.

```sh
node --import tsx back-end/src/scripts/runReaderExpansionPublication.ts --mode preview --options /private/operator/preview-options.json
```

Preview is read-only and checks all 201 source-bound paths. It refuses conflicting
content, status, notice URLs, ordered citations and duplicate identities. Existing
provider labels are preserved without allowing arbitrary new labels. Matching
already-published reviews must also match anonymous full-content readback.
Existing matching drafts are allowed only when their complete citations and
content match; partial drafts need a separately reconciled editorial repair.

For explicit publication, create a new options file with a new `outputFile` and
add `planFile`, `approvalFile`, `journalFile`, and `evidenceFiles`. The latter
maps each of `backupSha256`, `restoreVerificationSha256`,
`rehearsalReceiptSha256`, and `backendArtifactSha256` to the exact private
evidence file. The runner streams and verifies these file hashes before any HTTP
write. The private approval JSON must contain:

- `sourceCommit`: the exact source proposal and executing checkout commit.
- `planSha256`: the canonical plan digest printed by preview.
- The four evidence SHA-256 values named above.
- `operatorApprovalRef`: a non-sensitive reference to explicit protected approval.
- `reviewedAt`: the honest completed editorial assessment date, not a future
  timestamp or the proposal generation time.

These digest bindings do **not** certify that a backup is complete, its restoration
passed, citations were freshly checked, the deployed artifact matches, or the
actual-snapshot rehearsal succeeded. The protected operator must inspect those
results and grant explicit promotion after every preceding gate passes. Synthetic
fixture hashes cannot serve as production evidence. Source search/citation dates
remain unchanged; the actual editorial assessment is a distinct recorded date.

```sh
node --import tsx back-end/src/scripts/runReaderExpansionPublication.ts --mode publish --options /private/operator/publish-options.json
```

The plan must be no more than 24 hours old. The runner rechecks the whole plan,
source and authenticated actor before the first write, then preserves existing
matching identities. It journals and flushes each pending operation **before**
sending it, followed by confirmed observed IDs and anonymous readback. Missing
records go through create, ordered source addition, full-content edit and publish.
Already-matching publications are never rewritten or republished. No approval
file contents or private approval reference are copied into a public revision note.

Keep an exclusive editorial window. These endpoints do not provide a whole-batch
transaction or atomic compare-and-swap, so preview is not a lock against concurrent
editing. A confirmed HTTP 429 with an integer `Retry-After` from 1 to 60 seconds
gets at most one bounded retry. No timeout, redirect, parse error, failed journal,
other HTTP refusal or uncertain write is retried automatically. A stopped batch
can leave completed publications or partial drafts. Preserve its journal, read
back each pending operation and reconcile before a new plan; do not blindly rerun,
delete rows or presume rollback.

The result verifies the 201 anonymous article API bodies and their 461 distinct
ordered citations, and observes a catalog total of at least 1,001. It explicitly
leaves rendered-page acceptance and full private-state preservation unverified.
The operator must still complete the following full acceptance checks. Do not
interpret a batch receipt as proof of every public canonical page or the entire
expansion goal.

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
