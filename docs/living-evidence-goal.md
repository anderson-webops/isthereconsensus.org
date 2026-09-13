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

## Second milestone: admin review priorities

The [review-priority workflow](review-priority.md) combines explicit deadlines,
unhandled source notices, requests for updates, active reader evidence requests
and inconsistent dates in a bounded admin queue. Schedule and source decisions
have private, revision-protected audit histories. A source handling decision
applies only to its assessed notice snapshot; changed notices return to the queue.
The existing feedback workflow provides scoped resolution without copying private
messages into public reviews. This feature does not count as any of the twenty
substantive refreshes. Release notes record its validation and public acceptance.

## Third milestone: complementary source monitoring

The [complementary monitor](complementary-source-monitor.md) adds Europe PMC with
independent provider coverage, bounded persistent caching, throttling, cooldowns
and an applying-run lease. Failed/unindexed responses do not manufacture check
dates, and repeated observations preserve warnings and editorial dispositions.
Operational validation and exact public acceptance are recorded separately in
release notes. This feature does not count as a substantive article refresh.

## Substantive refresh progress

The [refresh registry](living-evidence-refreshes.json) tracks prepared content
separately from public completion. The first two nutrition refreshes add current
guidance, explicit clinical-outcome limits, quantitative evidence and correction
provenance. Their [source and promotion record](research/nutrition-refresh-2026-09-12.md)
documents access limits and the need to preserve editorial/source state during
controlled promotion. They do not increase the catalog count, and source delivery
alone does not count them as publicly completed.

The [scoped promotion command](claim-refresh-promotion.md) prepares a private,
reviewable snapshot and publishes a selected batch transactionally after the
operator's backup and content review. It refuses editorial divergence and active
scientific approvals, preserves private source state and existing review dates,
and records a system receipt. Implementing or testing this command does not count
as publicly completing any refresh.

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

The next two [recorded refreshes](research/gmo-amr-refresh-2026-09-12.md) address
commercial GMO food safety and antibiotic overuse/resistance. Their concrete
assessment and intervention examples include contrary findings, measured-outcome
boundaries and access limits. Four baseline reviews are now source-prepared;
public completion remains governed by the registry's verified-promotion rule.

Two further [vaccine refreshes](research/vaccine-refresh-2026-09-12.md) distinguish
the broad childhood-vaccine question from direct MMR evidence, add the newer US
cohort, correct the WHO review's scope, and preserve a linked aluminium-study
correction. Six baseline reviews are now source-prepared. Public completion still
requires controlled promotion and exact content/history verification.

Three [foundations refreshes](research/foundations-refresh-2026-09-12.md) distinguish
evidence convergence from panel agreement, clarify what scientific debate means,
and improve interpretation of individual studies. They add concrete methodological
and replication examples while preserving the Ioannidis correction. Nine baseline
reviews are source-prepared. Their actual database publication and public content
acceptance remain separate requirements.

The [pregnancy and breastfeeding refresh](research/pregnancy-refresh-2026-09-12.md)
adds newer first-trimester evidence, explains a reported postpartum-bleeding
signal alongside a larger cohort, and distinguishes neonatal outcomes and
breast-milk antibodies from broader developmental or clinical claims. Ten
baseline reviews are now source-prepared. Controlled public content promotion
and exact content/history acceptance remain outstanding.

The [learning-styles refresh](research/learning-styles-refresh-2026-09-12.md)
adds a positive meta-analysis and a concrete school-age comparison, distinguishes
matching tests from correlations and belief surveys, and corrects source
classifications. Eleven baseline reviews are source-prepared; controlled public
content publication remains outstanding.

The [brain-activity refresh](research/brain-activity-refresh-2026-09-12.md)
adds primary imaging examples and distinguishes baseline activity, task contrasts
and model performance. Twelve baseline reviews are now source-prepared; none
has yet completed controlled public content publication.

The [supplements refresh](research/supplements-refresh-2026-09-12.md) replaces a
blanket answer with outcome-specific evidence, retains positive cognitive and
cancer findings, and distinguishes dementia, biomarkers and infection outcomes.
Thirteen baseline reviews are source-prepared; controlled publication remains
outstanding for all thirteen.

The [fertility refresh](research/fertility-refresh-2026-09-12.md) specifies
platform-specific evidence, separates spontaneous conception from assisted
reproduction, and retains a treatment-specific adverse signal alongside a
different cohort. Fourteen baseline reviews are source-prepared; controlled
publication remains outstanding.

The [DNA-claim refresh](research/dna-refresh-2026-09-13.md) replaces an absolute
mechanism statement with an evidence-qualified answer. It separates cell-study
findings, manufacturing-residue measurements and demonstrated human outcomes,
retaining contrary results and access limitations without laboratory instructions.
Fifteen baseline reviews are source-prepared; controlled publication remains
outstanding for all fifteen.

The [nuclear-energy refresh](research/nuclear-refresh-2026-09-13.md) compares
specific outcomes and replacement scenarios without dismissing accident harms.
It adds phase-out studies, a cancer-proximity association and two linked
corrections. Sixteen baseline reviews are source-prepared; all still require
controlled public content publication and exact content/history verification.
