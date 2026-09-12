# Living evidence library

Started September 12, 2026 after completion of the practical-evidence expansion.
Baseline: v1.33.0, commit cbabd72516f84f984b41e7fdcdd465d221cad605;
800 public reviews, 36 topics, 17 guides and 12 comparisons.

The exact public [baseline](living-evidence-baseline.json) records the twenty
initial refresh targets. At capture, 281 stored cutoff timestamps were later
than review timestamps; 75 were on a later UTC calendar day. Same-day differences
do not trigger the reader chronology warning. None of the stored follow-up
deadlines was due yet, illustrating why the queue needs more than deadline age.

## Completion criteria

1. Reader-facing review status separates scientific/editorial review, imported
   content records, literature cutoff, source checks and cosmetic updates.
   Unknown provenance and inconsistent dates remain explicit. Review age and
   absence of a publication warning are never presented as validity scores.
2. An admin-only, paginated review-priority workflow combines scheduled review,
   unresolved source notices and private reader evidence requests. Scheduling
   and resolution are auditable and do not silently change scientific conclusions.
3. Complementary Europe PMC integrity checks extend the existing bounded
   Crossref monitor with provider provenance, caching, throttling and explicit
   failure/coverage states. Automated observations cannot clear warnings or
   publish conclusions without editorial review.
4. Twenty existing priority reviews receive substantive primary-source-backed
   updates, selected from a recorded baseline. Actual changes and source limits
   are documented. No fabricated check dates, expert approval or cosmetic edits
   count toward the twenty.

Each milestone requires native install/lock checks, lint, typechecks, tests,
builds, applicable real database and browser checks, accessibility, all CI jobs,
reviewed source integration and exact public acceptance. The goal remains active
until all four criteria are delivered. Source releases and public deployment
are verified separately.

## First milestone: truthful review dates

Inspection found that `seedClaims` assigned import time to `lastReviewedAt` and
filled missing review dates with the current time during explicit synchronization.
The publish route also refreshed dates when republishing a formatting-only edit.

The implementation replaces import-time review dates with dated source records
and marks their basis `source_record`. Review/publication records take precedence;
legacy update-only records use their earliest dated entry, explicitly as a content
record rather than an asserted completed scientific review. Missing/invalid records
remain undated. The 180-day follow-up default starts from the record date.
Existing database dates and schedules are preserved; unknown provenance is not
retroactively upgraded. Explicit editorial publish/review actions record their
basis, while formatting-only republication preserves dates and schedules.

The public status disclosure exposes safe dates, chronology issues, explicit due
dates and partial source-check coverage. It does not expose editor identifiers.
Imported citation dates may also lack provenance, so displayed coverage is
labelled as recorded dates, not verified monitoring coverage. A source warning is
not automatically described as unresolved: existing data records citation status,
not a definitive editorial disposition.

Citation exports carry the same provenance qualification and never substitute a
publication date for a missing review date. Publication and access dates retain
their distinct meanings. A free-text reviewer disclosure is not emitted as a
verified Person identity in structured metadata; it remains visible to readers.

This milestone does not change scientific content, overwrite existing production
records, run a source monitor, or complete any of the twenty refreshes. Source
and live verification results will be recorded in its release notes.

## Source-monitor design references

- [Crossref post-publication updates](https://www.crossref.org/documentation/register-maintain-records/maintaining-your-metadata/registering-updates/): notices are distinct records; metadata must be interpreted in relation to the original work.
- [Europe PMC web services](https://europepmc.org/RestfulWebService): verify the current API contract and response semantics before implementing the complementary provider.

## Delivery boundaries

Keep `SEED_CONTENT_MODE=insert` for ordinary releases. Refreshing existing
source-controlled production records requires the documented reviewed backup and
explicit synchronization/promotion procedure, or the authenticated editorial
workflow. Do not enable unattended synchronization or infer a completed expert
review from imported timestamps. Public tests never create production accounts
or submit feedback.
