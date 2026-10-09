# Reader-driven evidence expansion

Started October 4, 2026. The accepted objective is to expand the reviewed library
to 1,001 claims, add eight substantial guides, publish a moderated coverage
roadmap, let readers follow requested questions, and evaluate answer usefulness.
The earlier proposal's 150-review minimum is superseded by the larger total:
the verified source baseline is 800 published claims, so at least 201 genuinely
new canonical reviews are required. Existing refreshes, guides, comparisons,
rewordings and duplicate questions do not count as new reviews.

## Acceptance

1. At least 1,001 distinct, substantive, source-backed canonical reviews are
   published and independently readable on the public site. Each new review
   records verified citations, population/context limits, uncertainty and honest
   source-check dates. No implied independent expert review or invented demand.
2. Eight additional substantial sourced reading guides connect the new and
   existing evidence. The source baseline has 17 guides; completion requires at
   least 25, with full bodies, paragraph citations, discovery and accessibility.
3. A public coverage roadmap shows separately approved question summaries and
   planned, researching or published status. Raw reader feedback, internal notes,
   submitter details and draft material never become public automatically.
   Approval, editing, withdrawal and answer linking are admin-only and audited.
4. Requested questions can be followed in both browser-local and optional
   account libraries. Followed requests resolve to published answers and expose
   meaningful updates, with removal, identity isolation and backward compatibility.
5. A fresh question benchmark is frozen before search tuning. Cover unfamiliar
   everyday wording and unsupported questions; target at least 90% relevant
   top-three matches for covered questions. Record denominators and limits.
   Explicit explanation-usefulness feedback complements this development test;
   neither is described as measured visitor success without real evidence.
6. Public whole-library quantity copy uses `1000+` once the publicly available
   catalog reaches the threshold, without hard-coded exact totals. Before that,
   use nonnumeric copy rather than falsely advertising a larger library. Search
   results, pagination, individual source counts and private operational reports
   remain truthful; `1000+` must never describe a small filtered subset.
7. Each milestone passes root clean install, lock policy, lint, typecheck,
   backend/frontend tests, build, relevant database/browser/accessibility checks
   and CI. Commit/push source changes. Public deployment and exact public
   acceptance are separate gates; source delivery alone cannot complete the goal.

## Coverage selection

The October 4 source audit finds especially shallow coverage in digital security,
human origins, mental health, reproductive health, aging, cancer care, heart/
metabolic/kidney health and substance use. These are coverage gaps, not measured
reader demand. Existing private suggestions can inform admin priorities, but
research planning must use deliberately approved summaries and never disclose
raw messages. A per-question novelty/source record will precede content batches.

## Milestones

- Public coverage roadmap and moderated publication workflow: source-delivered
  in v1.38.0. Public release identity and health observed separately; this is
  not evidence of a production editorial mutation or approved reader demand.
- Browser/account request following and update resolution: source-delivered in
  v1.38.2 after signed-session, database and built-browser acceptance. Public
  deployment remains a separate gate.
- Source-verified expansion: authoring reaches 1,001 distinct canonical reviews,
  including 201 additions beyond the 800-review baseline. The final eighteen
  economic-measurement reviews and the public-quantity gate are integrated and
  source-released as v1.38.13 at `3f74de6`. The per-cohort novelty, original-source
  and qualification
  records are retained under `research/reader-*.md`. Existing refreshes and guide
  pages do not count as additions. Actual public publication remains pending.
- Eight new guides and integrated discovery: source now contains thirty-one
  substantial sourced guides, fourteen beyond the seventeen-guide baseline.
  Their full bodies, paragraph citations, canonical links and public-availability
  guards are retained. Source counts do not establish public guide availability.
- Whole-library quantity copy: implemented for the public catalog, not the source
  seed. Below a thousand, on unavailable data, or on incomplete/invalid counts,
  use nonnumeric wording. Once distinct valid public topic counts reach the
  threshold, use `1000+`; do not display an exact whole-library or topic total.
  Individual topic/source counts and filtered result pagination remain exact.
  Source delivery and actual public rendering remain separate gates.
- First fresh usefulness evaluation: sixty agent-authored questions frozen on
  October 4 were first scored against the complete source catalog on October 5.
  Canonical source bodies were audited before retrieval: 42 covered questions,
  three partial, three gaps and twelve out-of-scope requests. Only three of the
  42 covered questions reached a relevant top-three review, 7.14%, below the
  required 90%. No failures were dropped or reworded, and no visitor success or
  independent expert assessment is claimed. Sentence-word coverage rejection
  and omitted searchable explanation fields require further search work. The
  now-exposed set must remain a regression record; subsequent tuning also needs
  a separate genuinely fresh frozen evaluation. The usefulness gate is not met.
- Searchable explanations: a follow-up correction indexes existing public
  stable-core paragraphs and misconception tags rather than omitting them.
  Private notes and identifiers stay outside the index. A general scope gate
  declines personal requests to alter prescribed treatment while preserving
  population-level information. Focused checks and all 838 native tests pass;
  the full compiled-backend/browser rehearsal also passes. This correction is
  integrated at `2262965` and source-released as v1.38.14 after all eight
  exact-head and exact-main checks passed.
  On the exposed original set, only four of 42 covered questions match, 9.52%,
  with all twelve out-of-scope questions correctly empty. This is regression
  evidence, not a fresh evaluation or visitor success; the 90% goal is unchanged.
  Neutralizing or capping unknown-word weights was rejected after false matches.
- Full release and independent public acceptance: pending.
- Independent model-service implementation: the pinned paragraph candidate now
  has a separate worker workspace, strict public-only protocol, owned inference
  cancellation, bounded public vectors and a production-only artifact contract.
  The source port and numerical/tokenizer references pass; the exact unpacked
  local artifact passes readiness, synthetic ranking, shutdown and deliberately
  missing-module checks. This is engineering progress, not fresh usefulness,
  Linux ARM64 capacity, public activation or additional published reviews.
  Leave the worker unset until the complete original actual-route, sealed fresh,
  comprehension and host acceptance gates pass. See [pinned-search-worker.md](pinned-search-worker.md).
- Authenticated publication fidelity: a read-only source audit found that the
  former create/update narrative item cap would silently truncate 277 items
  across 135 of the 201 expansion reviews: 258 stable-core paragraphs and
  nineteen what-would-change-minds items. The longest paragraph has 651
  characters. Both authenticated paths now use shared narrative-specific bounds
  with explicit HTTP 400 rejection instead of shortening text, and preserve
  unchanged legacy content. Global citation URL validation is unchanged.
  The first complete HTTP attempt also exposed a full-content save deriving a
  different slug from an unchanged title. Unchanged titles now retain their
  canonical URL; explicit slug edits and actual title changes retain the
  existing behavior. The rehearsal keeps an exact canonical-path assertion.
  The added full-batch HTTP rehearsal creates, edits and publishes the 201
  canonical expansion records only in an owned disposable database; seeded
  fixtures alone are not sufficient. Exact full-text authenticated acceptance
  and source delivery must be verified before real production publication.
  See `claim-narrative-preservation.md`; no production article is rewritten by
  this input-validation change.

## Current boundary

The prior living-evidence refresh batch is complete and must not be republished.
This goal starts with a clean source checkout at `7fea640`. No private production
feedback or reader analytics have been inspected, and no production mutations
are authorized merely by this planning record.

Anonymous checks on October 5 at 22:58 UTC, after the v1.38.14 source release,
found healthy frontend v1.38.13,
800 publicly readable reviews and no approved public roadmap entries. The new
economic review canary was unavailable; the guide route returned HTTP 200,
without proving every guide's full public acceptance. This observed public state,
not source totals or isolated fixture publication, controls publication claims.

A complete anonymous public readback on October 8, 20:01-20:21 UTC, independently
verified all thirty-one guide bodies, citations, directory/sitemap discovery and
connected-review guards. The public frontend was v1.38.23 at `39ab726`. The
catalog still contained 800 canonical reviews; all 201 expansion APIs returned
404 and the approved roadmap remained empty. The overall goal is not complete.
The readback also identified missing visible evidence-selection criteria in
review pages, alongside a block-paragraph separator limitation in the verifier.
See [the complete public acceptance record](reader-public-acceptance-2026-10-08.md)
for denominators, retained failures, source correction and verification limits.

A separate 21:33-21:40 UTC anonymous readback verified the delivered v1.38.24
scope correction at `8a51db8`: all 74 advertised existing reviews displayed their
376 full recorded scope criteria and selected substantive narratives. Twelve
synthetic parser controls preceded the 150 requests. Exact-main CI run
37845485369 also completed with all eight jobs passing. This closes the specific
scope-delivery gate, not the full publication, freshness or usefulness gates.
The earlier failed public report and parser remain unchanged.

A separate agency-FAQ assessment retained all 36 acquired questions, frozen
before body labels and retrieval: three covered, eleven partial, thirteen gaps
and nine outside administrative requests. Both actual public search APIs reached
a preassigned readable answer for one of the three covered questions and kept
all nine outside controls empty. All 72 search responses were available, but
three prepared partial CPI destinations remained HTTP 404. The native mechanical
gate failed. The complete twelve-case covered floor and four-source acquisition
also failed; prior BLS source exposure is not independently excluded, so native
provenance explicitly remains development. This cannot certify fresh usefulness,
representative demand or real reader comprehension. No query, body label or
destination was changed after predictions, and the original failures remain.
See [the complete agency assessment](external-faq-coverage-2026-10-08.md) for all
36 classifications, source attribution, hashes and the remaining acceptance work.

A subsequent general source correction separates comparison intent from its
subjects, retrieves coherent public paragraphs without requiring title wording,
and normalizes agreement forms while retaining scope and privacy controls. The
complete exposed development sets were preserved and rerun on both source
cohorts. The agency subset improves to three of three covered destinations in
each cohort, while the original sixty-question set remains four of forty-two.
These are source-only development regressions, not fresh or public acceptance.
The [retrieval follow-up](external-faq-coverage-2026-10-08.md#subsequent-source-only-retrieval-correction)
records complete denominators, input hashes, retained failures and actual local
API controls. The full goal and all remaining publication/usefulness gates are
unchanged.

A complete actual-model development assessment subsequently retained all 168
exposed questions and rendered destinations. A general ranking/scope correction
recovers all three covered agency destinations and keeps all nine outside
requests empty on both local APIs, while retaining 38/42 original covered hits.
The seventy-two-question set still has no covered denominator and cannot pass.
The final functional-source compatibility extension has separate structural
equivalence evidence, not a new full-model run. These are development results,
not fresh certification, human comprehension or production publication. See
[the complete model regression assessment](search-model-regression-2026-10-08.md).
Original full-service controls, a new genuinely unfamiliar adequately covered
evaluation and protected publication remain required; activation is unapproved.

A subsequent complete final-source acceptance on October 9 at `ec63de54`
closes the original local service controls: all 210 regression questions retain
their unchanged thresholds, all sixteen scope HTTP rows and all 2,002 new title
HTTP rows pass, and all six actual browser typing/inference-cancellation cases
pass. The full source/runtime/input hashes remained unchanged and every owned
process exited. See [the final local service record](search-service-acceptance-2026-10-09.md).
This closes an engineering gate, not the genuinely fresh public evaluation,
human explanation feedback, native-host acceptance or protected publication.
The full goal and public `1000+` availability condition remain unchanged.
