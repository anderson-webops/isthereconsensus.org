# Catalog expansion to 1,501 reviews

The November 6, 2026 baseline contains 1,001 published canonical reviews in
36 topics. The objective is 1,501 distinct, self-reviewed reviews. Guides,
topics, drafts and alternate URLs do not increase that count.

## Learning cohort

`catalog-1501-learning-2026-11-06` adds eight reviews and 20 citations:

- Flipped classrooms
- Gamification
- Worked examples in mathematics
- Self-explanation
- Concept maps
- Interleaved practice
- Handwritten and typed lecture notes
- Peer assessment

The source catalog contains 1,009 reviews after this addition, leaving 492
further reviews to reach the objective. Publication is verified separately
against the public APIs; a source definition is not a publication receipt.

## Self-review record

The cohort was screened for overlap with existing questions. Research discovery
used Consensus, followed by fetched paper records and publisher or institutional
records. Final journal versions replace preprint metadata where applicable.
Online-first dates and journal-volume dates are distinguished in citation notes.
All 17 cited DOIs were checked for Crossref-registered updates on November 6;
none returned a registered correction or retraction. This check cannot establish
that every possible integrity concern has been reported to Crossref.

Answers distinguish learning, motivation, satisfaction and note volume, preserve
comparator and population limits, and describe variation across studies. Related
reviews can contain overlapping experiments. No comprehensive systematic search,
formal GRADE appraisal or independent expert review is claimed.

## Publication invariants

`catalogExpansion.ts` records an immutable content seal for each self-reviewed
cohort. Validation binds definitions to the canonical catalog, validates the
complete cohort before database work, and applies existing schema, URL,
narrative and public-readiness rules. The original 201-review release retains
its independent seal and acceptance checks.

Existing scientific copy and citation literals remain byte-identical. Only the
catalog import and aggregation exports change in `claims.ts`; its exact-byte
prose-preservation pin is renewed for those mechanical changes. The existing
editorial-completion and reader-expansion content seals remain unchanged.

Production startup uses the existing publication journal with a separate cohort
identity. Replays preserve published rows, human withdrawals, unowned drafts,
source identities and private state. Failed validation leaves existing services
available. Publication and review dates retain their separate meanings.

The isolated production-startup rehearsal covers all 209 new and previously
approved reviews, exact public article and citation payloads, restart stability,
and human moderation in both cohorts. The end goal remains open until the live
catalog contains 1,501 distinct self-reviewed canonical reviews.
