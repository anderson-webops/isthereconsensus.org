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
- Eight new guides and integrated discovery: source now contains thirty
  substantial sourced guides, thirteen beyond the seventeen-guide baseline.
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
  the full compiled-backend/browser rehearsal also passes. Protected integration
  of this follow-up remains pending.
  On the exposed original set, only four of 42 covered questions match, 9.52%,
  with all twelve out-of-scope questions correctly empty. This is regression
  evidence, not a fresh evaluation or visitor success; the 90% goal is unchanged.
  Neutralizing or capping unknown-word weights was rejected after false matches.
- Full release and independent public acceptance: pending.
- Authenticated publication fidelity: a read-only source audit found that the
  existing create/update narrative item cap would silently truncate 277 items
  across 135 of the 201 expansion reviews: 258 stable-core paragraphs and
  nineteen what-would-change-minds items. The longest paragraph has 651
  characters; both authenticated paths currently slice each item at 280.
  The isolated seeded-catalog tests do not prove faithful authenticated creation.
  Fix these bounded narrative inputs and verify exact full-text preservation
  through authenticated creation, editing and publication before real publication.
  This must not weaken source URL validation or alter existing published state.

## Current boundary

The prior living-evidence refresh batch is complete and must not be republished.
This goal starts with a clean source checkout at `7fea640`. No private production
feedback or reader analytics have been inspected, and no production mutations
are authorized merely by this planning record.

Anonymous checks on October 5 at 21:53 UTC, after the v1.38.13 source release,
found healthy frontend v1.38.12,
800 publicly readable reviews and no approved public roadmap entries. The new
economic review APIs and guide were unavailable. This observed public state,
not source totals or isolated fixture publication, controls publication claims.
