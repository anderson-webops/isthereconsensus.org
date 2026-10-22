# Catalog editorial completion

This follow-up implements Jacob's request to finish the article-by-article
editorial pass after v1.38.31. The pass screens all 1,001 existing lead answers
and questions, revises 275 leads, and prepares 467 source-bound article or
maintenance corrections. It adds no topics and does not count metadata changes
as new reviews.

## Changes

- The answer card no longer repeats the preparation disclosure. AI assistance,
  source provenance and the absence of recorded expert review remain in the
  accessible, collapsed Review status panel and its linked policy.
- All 12 remaining titles flagged for joining separate questions now have one
  main question. Important secondary outcomes and safety limits remain in the
  answer and evidence sections.
- Leading empirical questions are reframed without changing agreement bands,
  certainty ratings or source conclusions. Mathematical quantifiers and real
  measurement or safety limits remain where removing them changes the question.
- U.S. regulatory questions identify their jurisdiction, including medicines,
  generics and the earned income tax credit. The audit now correctly recognizes
  the punctuated abbreviation `U.S.`.
- The 13 remaining source-catalog revision summaries become substantive evidence
  points. Original change history is retained.
- Three unsupported recorded-appraisal lists are cleared. Public presentation
  also removes exact generic scope and appraisal items appended to custom lists,
  preserving the custom criteria rather than hiding the entire list.
- Clinical articles without a living-maintenance classification receive one.
  Known source-record default schedules can move to a first follow-up after
  90 days. Custom schedules, review dates and private surveillance specifications
  remain protected. A maintenance deadline is not a completed scientific review.
- Two old-source flags were missing dates on existing guidance: CDC's childhood
  vaccination guidance is dated December 20, 2024, and the American Cancer
  Society's abortion and breast-cancer page was revised June 7, 2024. These are
  publication/revision years, not new study dates or access dates.
- The indirect-vaccination article gains the PSERENADE surveillance analysis,
  preserving the distinction between indirect effects in a specific program and
  a universal herd-immunity threshold. Its journal issue is April 2025, although
  its online publication and copyright are 2024.
- The two wind-turbine pages retain their URLs but now distinguish cancer from
  the proposed infrasound syndrome. Neither question is treated as proof that
  audible noise or disrupted sleep never burdens residents.

## Citation identity correction

Anonymous readback of all 1,001 articles found two missing references where a
different publisher used the same title: WHO's `Radon` and NHLBI's `DASH Eating
Plan`. The seeder looked up citations by title alone. The local regression
reproduces the collision, then verifies separate, restart-stable identities.

Seeding now identifies a reference by its DOI, PMID, PMCID or URL. Order fallback
requires compatible identity rather than allowing a different publication to
overwrite an existing citation. The approved batch restores the two named
references with new identities, preserving every existing citation identity and
notice. Restored/new references have no invented integrity-check date or formal
appraisal. The public baseline is not a private database backup.

## Evidence and no-change decisions

The copy pass is not an independent expert review or a new systematic search for
every article. The recorded heuristic mean lead grade falls from about 12.6 to
11.3. Some technical leads remain above grade ten; no reader-comprehension
certification is inferred from these numbers. Source conditions, definitions and
worked quantities are not removed solely to satisfy a formula.

Low citation counts, old foundational references, absent DOIs and undated
reference pages are not automatic defects. No redundant citations are added to
meet a quota, no publication year is inferred from access time, and no evidence
landscape or independent expert approval is fabricated. Existing sleep-duration,
screen-light, class-size, caffeine and other overlapping coverage is retained.
New-topic suggestions and commissioning human expert reviews are separate from
closing this editorial pass; neither is claimed delivered here.

`editorialCompletionReview(2026)` records a disposition and before/after source
fingerprint for every catalog row. `prepareEditorialCompletion.ts` emits the
immutable 467-target proposal only from committed, clean source. Older 201-review
and five-correction approval digests and the original 20-target refresh registry
remain unchanged.

## Original-source checks

- [CDC: Multiple Vaccines at Once](https://www.cdc.gov/vaccine-safety/about/multiples.html).
- [NCI: Reproductive History and Cancer Risk](https://www.cancer.gov/about-cancer/causes-prevention/risk/hormones/reproductive-history-fact-sheet).
- [American Cancer Society: Abortion and Breast Cancer Risk](https://www.cancer.org/cancer/risk-prevention/medical-treatments/abortion-and-breast-cancer-risk.html).
- [PSERENADE author abstract and publication metadata, UKHSA](https://researchportal.ukhsa.gov.uk/en/publications/global-impact-of-ten-valent-and-13-valent-pneumococcal-conjugate-/), DOI `10.1016/S1473-3099(24)00665-0`.
- [WHO: Radon](https://www.who.int/news-room/fact-sheets/detail/radon-and-health).
- [NHLBI: DASH Eating Plan](https://www.nhlbi.nih.gov/health/dash-eating-plan).

Consensus was used for discovery and underlying records were fetched. The
PSERENADE year was resolved using the author publication record, not its generated
takeaway. These selected checks are not a comprehensive citation-notice clearance
or independent risk-of-bias appraisal.

## Publication and recovery boundaries

Normal protected deployment runs the separate immutable completion release after
the older five-correction release. Exact canonical or specifically registered
anonymous legacy baselines are required. Later scientific or scope edits,
archived records, changed citations and independent assessments are preserved.
Private transaction receipts retain before/after article and source snapshots.
Replays preserve later human edits and do not duplicate history.

The isolated rehearsal represents known historical magnitude strings exceeding
today's unchanged schema limit. Only that exact legacy field/type exception is
allowed in fixture creation. Production validation is not relaxed, and unchanged
legacy evidence is not truncated. Authenticated published-edit restrictions stay
enabled.

A source-code rollback alone does not restore database content. Content recovery
requires an authorized operator to review the private receipt and intervening
changes. No source agent accesses production credentials, logs in, restores a
database or changes services. Public activation and complete anonymous content
acceptance must be verified separately from source delivery.
