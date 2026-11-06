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
further reviews to reach the objective before the urban cohort below. Publication is verified separately
against the public APIs; a source definition is not a publication receipt.

## Urban heat and stormwater cohort

`catalog-1501-urban-2026-11-06` adds ten reviews and 25 citations covering street
trees, parks, reflective roofs, green-roof energy use, pedestrian comfort around
cool pavements, green-roof runoff, permeable paving, pavement maintenance,
rain-garden pollution removal and catchment-scale flood risk.

This brings the source catalog to 1,019 distinct reviews, 482 short of the
1,501-entry objective. Public availability remains a separate measurement.
The ten reviews use 18 distinct
DOIs, all checked against Crossref on November 6 with no registered updates.

The urban cohort has its own fixed research-check time. The learning cohort's
original time and seal remain unchanged. Narrative reviews and building models
are identified as technical references, with their actual limitations. The
reflective-roof review uses its 2022 journal year, rather than the 2021 year
embedded in its DOI. The pedestrian-comfort review preserves the disagreement
between field results; stormwater reviews distinguish concentrations from total
pollutant loads and site retention from neighborhood flood protection.

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

The isolated production-startup rehearsal covers all 219 new and previously
approved reviews, exact public article and citation payloads, restart stability,
and human moderation across cohorts. The end goal remains open until the live
catalog contains 1,501 distinct self-reviewed canonical reviews.
