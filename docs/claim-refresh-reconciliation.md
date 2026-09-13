# Reconciling the production refresh baseline

## September 13, 2026 finding

The operator reported that the v1.37.7 preview stopped without publishing any
refreshes. Before preview, the operator made a local full database backup and
restore-tested 18 collections and 3,611 documents, including private state and
indexes. That is operator-provided evidence, not an independent restoration
performed from the source checkout, and it is not an off-site backup.

The first conflict was `active-debates/what-counts-as-an-active-scientific-debate`,
field `appraisalTools`. The stored public record used older generic GRADE-style,
risk-of-bias and shared-baseline descriptions. The source-generated pre-refresh
definition instead used evidence-maturity, directness and competing-hypothesis
descriptions. The proposed final refresh describes a narrative assessment,
explicitly not an independent GRADE or formal risk-of-bias assessment. Neither
older template list proves that a formal appraisal was performed.

A read-only comparison found other public metadata differences in all twenty
targets. Uncertainty drivers differed throughout the batch; most uncertainty
summaries also differed. Several reviews additionally differed in tags, search
resources, inclusion/exclusion rules, appraisal descriptions or institutional
anchors. Those values were already present in the retained pre-release public
snapshot. Date values were normalized to ISO strings and nested document IDs
excluded; date serialization alone was not counted as divergence. This comparison
does not establish compatibility of private fields, source rows or approvals.

The source-generated fixtures used by the promotion tests were not a complete
snapshot of production editorial metadata. Those tests establish strict guard
behavior and preservation for matching fixtures, not universal compatibility
with live records. Matching public bottom lines and source counts is insufficient.

## Preserve the safeguard

Do not reset live metadata to a template just to make preview pass. Do not remove
the comparison, expand accepted baselines without review, add a force option or
enable overwrite seeding. A regression test reproduces the observed appraisal
conflict while leaving the bottom line and source set unchanged, and verifies
that rejection does not mutate the snapshot.

Review the full batch rather than repairing the first reported field and
discovering subsequent conflicts one at a time. Use authenticated editorial
access to compare complete current records and source sets with proposed final
content and its primary-source assessments. Record explicit retain/replace
decisions. Preserve valid live qualifications, stronger source warnings,
source identities, private state and history. Keep protected snapshots and
operator notes out of public reports.

## Rehearse the actual publication path

The existing authenticated editor is not interchangeable with the strict CLI:

- Published records require the request-update, save and publish workflow.
- A substantive publication records an editorial review and creates its own
  reader-announcement ID. The CLI instead preserves recorded review dates and
  uses the registered announcement ID.
- Content edits invalidate applicable prior evidence-workflow approvals. Source
  edits clear prior source-review attribution; these effects require review and
  must not be described as unchanged private state.
- The API normalizes field sizes. Successful responses do not establish exact
  content preservation.

The prepared pregnancy and three foundations reviews had search descriptions
longer than the editor's 120-character limit. They are shortened without removing
their targeted-search qualification or claiming an exhaustive systematic search.
Eight limitation blocks across five other reviews also exceeded the editor's
240-character item limit. They are split into complete bullets without removing
any of their wording. A regression checks all twenty prepared reviews against
both fields' count and length limits. These changes fix those text-boundary
issues, not the production baseline conflicts or every possible workflow effect.

Before any production write, rehearse the reviewed changes in the existing
isolated restoration with outbound side effects disabled. Compare complete
scientific content, ordered citations and notices, source IDs, history, private
state, review-date provenance, schedules and generated announcement IDs against
the approved proposal. Stop on unexpected truncation, discarded decisions or
unintended date changes. Do not backdate a newly completed review or treat an
import as independent expert approval.

After a successful rehearsal and backup-freshness check, publish only approved
reconciled changes through the authenticated workflow. Record actual actions,
dates and announcement IDs, rather than claiming a CLI receipt was created.
If any requirement cannot be met by that workflow, keep publication stopped
and resolve the specific incompatibility first.

The [controlled promotion procedure](claim-refresh-promotion.md) remains the
strict CLI path for records matching their reviewed source baseline. Whichever
approved path is used, mark registry entries publicly verified only after exact
article-level acceptance and protected unrelated/private-state checks succeed.
Source delivery alone does not publish these existing articles.
