# Reader experience acceptance audit

## Application acceptance: passed

On September 11, 2026, production identified **v1.19.0**, commit
`44b299a1803243140eef91c7b18b148d077794bd`, build
`45b3b001-cdfc-4fd2-b3cd-9933c31c2790`. The complete public search/guide audit,
reader-library check, reader-feedback check and standard live-site smoke passed
against that exact application commit. Authenticated persistence and editorial
behavior passed with the real backend and a disposable database in CI and the
isolated local harness. The boundaries of those different checks are below.

The full objective and its acceptance requirements remain unchanged in
[reader-experience-goal.md](reader-experience-goal.md).

## Requirement-specific evidence

| Requirement | Evidence inspected | Assessment |
| --- | --- | --- |
| Shared, relevant search with 100 representative questions and a 90% top-three target | The shared ranker, both endpoint integrations, fixed 100-question fixture and baseline report; actual public endpoint queries returned the expected review in the first three for 100/100 questions. Earlier suggestions scored 92/100 and directory search 90/100 on that same catalog. | Passed the stated development target. The fixture spans 28 of 35 topics, was used during tuning, and is not blind or traffic-weighted visitor evidence. |
| Unsupported questions and misleading matches | All 20 fixed unsupported questions returned empty results in the public API. The vaccine/autism search preserves the review's negative answer. Tests also cover incidental matches, six further unsupported questions, all 750 exact catalog titles, delayed responses, loading, retry, history and empty-directory browsing. | Passed these bounded checks; not a claim that every possible query is free of misleading matches. |
| Ten substantive, sourced reading guides | All ten named subjects are implemented. Source-check notes and qualifications are in `reading-guide-evidence.md`. Public checks read every complete guide body, paragraph citation mapping, source note, question, exact citation URL, Article/canonical metadata, checked date, reference/contents anchor and connected-review link. Mobile and enlarged text passed. | Delivered in v1.17.0 and reverified on v1.19.0. Structural tests complement, not replace, the recorded source review. |
| Guide discovery and robust routing | All 48 unique connected review/topic pages have their expected guide backlinks; the guide and explainer indexes link all ten guides. Sitemap entries and unknown/prototype-property 404s passed. Built-browser tests cover actual review-guide-review journeys, history and backend-independent rendering. | Passed. The prior shorthand of 50 discovery pages includes the 48 destinations and two indexes. |
| Anonymous and account libraries, removal and persistence | Public browser-local save/follow/reload/removal passed with actual resolved review/topic links. The isolated MongoDB/signed-session/built-browser harness tests account ownership, concurrent writes, restart persistence, explicit copying, removal, clearing, sign-out, storage errors and revoked sessions. | Delivered in v1.18.0 and reverified on v1.19.0. Real production accounts were not used for testing. |
| Substantive followed-topic updates without unsolicited email | Source and isolated tests cover actual publication announcements, explicit changes and bottom-line impact, cosmetic/draft exclusion, readiness rechecks, withdrawals, a bounded 90-day feed, pagination, seed deduplication and stale editor conflicts. No email path was added. | Implemented and passed populated-feed tests; historical content is not backfilled as fabricated new activity. |
| Private feedback and admin editorial priorities | v1.19.0 adds usefulness, missing-evidence and topic suggestions, bounded collection, explicit private input, deduplication and expiry. Real isolated API/browser tests cover persistence, duplicate races, anonymous/user/expert denial, admin pagination/filters/linking, required notes, revision conflicts and scientific-state isolation. | Local, CI and public acceptance passed. Public checks verify empty forms, private headers, noindex, anonymous admin denial and the production bot-check container, not a CAPTCHA-protected production write. |
| Clean install, locks, lint, typecheck, tests, build, runtime, accessibility and CI | Local gates passed. PR #57 CI `34625984379` and merged-main CI `34626302006` passed at the approved source, including audit, ARM64 installation, real database/browser checks, SSR and search/guide accessibility regressions. | Passed for the released application source and paired with exact-commit public feature acceptance. The audit-only follow-up changes documentation and a repeatable public verifier, not application behavior or dependencies. |

## Deployment boundary

The earlier v1.18.0 observation was superseded by direct HTTPS identity and
feature checks of v1.19.0. Promotion occurred outside this local task. A prior
non-interactive read-only SSH attempt was rejected before any remote command
ran; it is not the basis for the deployment claim. No credentials were requested,
services restarted, environment files changed, or production test records created.

The public application remains the annotated v1.19.0 release. An audit-only
documentation/verifier commit does not need another application release or tag.
For later releases, follow [DEPLOYMENT.md](../DEPLOYMENT.md), preserve the existing
CAPTCHA configuration and `SEED_CONTENT_MODE=insert`, and repeat feature acceptance
against the explicitly approved public commit. Do not infer promotion from a
GitHub release or restart a service just because an observation window ended.

## Repeatable public checks

Run from the source checkout with its pinned toolchain and an already installed
browser. The checks below are read-only against production, with disposable
browser-local selections for the library test:

```sh
export LIVE_SMOKE_EXPECT_COMMIT=44b299a1803243140eef91c7b18b148d077794bd
npm run smoke:live
node --import tsx scripts/live-reader-content-smoke.mjs
node scripts/live-reader-library-smoke.mjs
node scripts/live-reader-feedback-smoke.mjs
```

The content check verifies identity before and after, the 100/20 public search
benchmark, all ten rendered guides and paragraph citation mappings, 48 connected
review/topic destinations, two discovery indexes, sitemap and unknown routes.
It is not a substitute for the library or feedback checks. The feedback check
does not solve a CAPTCHA or submit a production suggestion; positive persistence
and authenticated triage are covered by the isolated harness and CI.

The recorded result is 100/100 covered questions in the first three results,
20/20 unsupported queries empty, all ten complete guides, 48 unique connected
review/topic pages and two discovery indexes. The content verifier closes its
browser and checks the exact release identity again at completion. The library,
feedback and standard live-site checks also passed at the commit above.

## Evidence and limits

- [Search benchmark](search-quality-benchmark.md): the 100-question set covers
  28 of 35 topics and was used during development. It is not a blind evaluation
  or a measured visitor-success rate; negative cases prove only bounded checks.
- [Guide source review](reading-guide-evidence.md): all ten named subjects,
  actual sources, abstract-only limitations, corrected publications and explicit
  hypothetical exercises. The guides are curated syntheses, not new systematic
  reviews or independent expert reviews. They do not inflate the claim count.
- [Library acceptance](reader-library.md): real account persistence, ownership,
  revision conflicts, browser/account separation, sign-out and publication feed
  tests. The public browser test verifies anonymous selections without creating
  accounts or writing to production. No unsolicited email or fake historical
  announcements were added.
- [Feedback acceptance](reader-feedback.md): real authenticated submission and
  triage checks in an isolated database, plus read-only public checks. Public
  bot-check visibility is not proof of a successful production CAPTCHA exchange.
- [Released-application CI](https://github.com/anderson-webops/isthereconsensus.org/actions/runs/34626302006)
  passed every job, including the database/browser harness that invokes both
  library and feedback checks. [PR #57 CI](https://github.com/anderson-webops/isthereconsensus.org/actions/runs/34625984379)
  also passed. The audit follow-up must follow the normal commit, push and CI
  workflow; these application results do not pre-claim its separate CI result.
