# Controlled publication of existing evidence reviews

Ordinary releases use `SEED_CONTENT_MODE=insert`. The command below is an
operator-run alternative to the authenticated editorial workflow for a bounded
batch of registered source-controlled refreshes. It is never invoked by startup,
a timer, deployment, or the source-integrity monitor. It does not replace the
required backup, restore check, content review, or public acceptance.

## Preconditions

1. Review the release diff and the refresh's primary-source record. Verify the
   selected topic/claim keys against `living-evidence-baseline.json` and
   `living-evidence-refreshes.json`. A prepared source file is not publication.
2. Confirm the intended database using its protected runtime configuration.
   Keep credentials out of command arguments, notes, plans, and task output.
3. Take a fresh full database backup using the site's existing backup procedure.
   Restore it into an isolated database and verify the selected claims, sources,
   revisions, source-notice decisions, monitoring history, schedules, and reader
   records. Record the backup artifact's SHA-256 and the actual restore-check
   result in the operator record. Hashing a file does not verify its contents or
   establish that restoration succeeded.
4. Applying this command requires MongoDB transaction support (a replica set or
   supported sharded deployment). Preview works on a standalone server; apply
   stops before writing. Do not change production database topology to satisfy
   this command without separate infrastructure authorization. The authenticated
   editorial workflow remains available under the existing reviewed procedure.
5. Avoid simultaneous editorial or administrative raw-database writes during
   promotion. Normal published-source editing is already restricted by the app.
   The command checks current snapshots and revisions, and a transaction detects
   concurrent writes to its selected documents. This does not prevent a privileged
   external process from adding unrelated or duplicate documents after a read.

## Preview and review

Use the compiled command from the candidate release with the same protected
MongoDB environment as the backend. It does not load a working-directory `.env`.
The destination must be a new file in an operator-owned private directory.

```sh
node back-end/dist/scripts/promoteClaimRefreshes.js \
  --preview \
  --review nutrition-and-diet/are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk \
  --review nutrition-and-diet/does-saturated-fat-still-raise-ldl-and-heart-risk \
  --plan /private/operator/claim-refresh-plan.json
```

Preview reads only the explicit selection (1 to 20 registered reviews). It creates
no database collections or indexes. Its owner-only JSON contains the selected
claim/source snapshots, private monitoring state, the proposed field changes,
appended history, citation IDs, new citations, and announcement definitions.
Treat the plan as private operator material, not a public report or a backup.
Review all proposed text, outcome qualifications, citation identity, warnings,
and date provenance. The output includes the canonical JSON plan SHA-256.

The preview refuses scientific fields or citations that differ from the recorded
pre-refresh source baseline, duplicate or missing citation identities, source
removals, hidden claims, unaddressed stronger live warnings, and active landscape
or reviewed evidence-extraction approvals. Use the authenticated editorial workflow to
reconcile these cases; there is no `--force` option. Draft extraction and existing
human decision records are preserved. No source is matched by list position.

## Apply the reviewed batch

After the backup restore check and plan review, supply the exact reviewed plan
digest, backup artifact and its reviewed digest, and a short operator record
reference. The example placeholders below must be replaced with actual evidence.

```sh
node back-end/dist/scripts/promoteClaimRefreshes.js \
  --apply \
  --plan /private/operator/claim-refresh-plan.json \
  --plan-sha256 <reviewed-plan-sha256> \
  --backup-file /private/operator/fresh-database-backup.archive \
  --backup-sha256 <reviewed-backup-sha256> \
  --operator-note 'Reference to the completed backup restore check and content review'
```

The plan expires after 24 hours. The command rebuilds the proposal from the current
source definitions and database state inside the transaction and compares it with
the reviewed digest. Any changed text, private source progress, revision, timestamp
or schedule requires a fresh preview and review. It never executes arbitrary
updates supplied in a plan file.

Claim text, source changes, appended history, reader announcements and the private
`ClaimRefreshPromotion` receipt commit together. A late validation or concurrency
failure rolls back the whole batch. Original review dates and their provenance,
publication dates, review schedules, extraction, human decisions, source IDs and
private provider progress remain intact. Source notice links accumulate and check
dates never move backward. The public source-record history retains its actual
preparation date; the reader announcement records the successful promotion time.
The receipt records a system operation and an operator-supplied note, not an
authenticated admin identity or completed expert review.

Retry the same reviewed plan and digest after an uncertain response. An existing
receipt returns `already_applied` without overwriting later editorial changes.
After successful publication, use a newly reviewed correction or restoration
procedure to undo a change; there is no unattended reverse synchronization.

## Acceptance and retention

Verify the exact public release identity, both selected texts, six ordered
citations per nutrition review, correction links, public history and announcement
IDs. Verify unrelated records and private editorial state against the backup or
pre-promotion snapshots. Inspect rendered pages and accessibility in the existing
themes and mobile/desktop layouts. Only then mark the selected registry entries
publicly verified with actual evidence, rather than crediting a source release.

Retain the backup and private receipt under the site's existing backup/retention
policy. Retain or securely remove the local plan according to that same policy;
do not commit it. The public app exposes no receipt endpoint.

The database smoke uses owned standalone and replica-set instances to verify
read-only preview, standalone refusal, stale/altered plans, late rollback,
concurrent monitor changes, simultaneous apply, private-state preservation and
idempotent retry after later editorial changes. Run after the backend build:

```sh
node scripts/claim-refresh-promotion-smoke.mjs
# CI uses owned development-only MongoDB containers:
node scripts/claim-refresh-promotion-smoke.mjs --docker
```

Transaction implementation follows the official
[Mongoose session guidance](https://mongoosejs.com/docs/transactions.html) and
[MongoDB transaction guarantees](https://www.mongodb.com/docs/manual/core/transactions/).
Operations within each transaction are sequential; independent caller transactions
are deliberately exercised concurrently in the integration check.
