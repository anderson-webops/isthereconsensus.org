# Practical evidence expansion

Started September 11, 2026 following the request to review all PRs for production and start a new website enhancement goal. At the preflight, no PRs remained open; production v1.19.0 contained all application changes on main. The remaining main-only changes were acceptance documentation and its read-only verifier.

## Goal and baseline

Deliver twelve substantive, sourced practical comparisons and fifty genuinely new canonical claim reviews. Baseline: 750 canonical published reviews, 35 topics, ten reading guides. Comparisons synthesize and connect reviews; they do not count as additional canonical reviews. Republishing, rewording, metadata edits, or moving existing reviews do not count toward fifty.

Start with electricity options, strength-training supplements, and caffeine timing. Choose the other nine from documented content gaps and explicit reader feedback. Do not infer demand from unobserved analytics or publish placeholder pages to meet a count.

## Acceptance

1. Twelve complete comparisons with useful outcome/context selection, sources attached to findings, explicit units, population or technology scope, time horizons, uncertainty and unavailable/non-comparable states. Avoid universal winners, made-up consensus percentages, cross-study arithmetic and personalized treatment advice.
2. Fifty additional canonical reviews, registered through the backend's claim catalog and validated against the published schema. Record each new question and how it differs from existing coverage. Source discovery is not source verification: check primary research, syntheses and institutional guidance directly, distinguish abstracts from full text, and preserve corrections and qualifications.
3. Integrate comparisons into search, relevant topics/reviews/guides, sitemap, saved content, substantive updates and private reader feedback. Preserve account isolation, explicit-consent boundaries and the site's compact design.
4. Validate source values and transformations, canonical uniqueness and coverage, frontend/backend tests, clean root installation and standalone lock policy, lint, typecheck, production build, browser navigation and both-theme accessibility.
5. Commit and push coherent validated milestones. Source delivery, CI and public deployment are separate states. Keep the goal active until all twelve comparisons and fifty new reviews are publicly verified against the exact release.

## First milestone: electricity benchmark pilot

The first slice adds `/compare` and `/compare/electricity-emissions`, with five technologies and two outcomes. It connects the new page to the energy guide, two existing claims, two topics and the explainers index. The whole-grid context deliberately does not reuse generator values as a system-level prediction. There is no account, database or deployment configuration change.

Source: NREL, *Life Cycle Greenhouse Gas Emissions from Electricity Generation: Update*, September 2021, [report 80580](https://docs.nlr.gov/docs/fy21osti/80580.pdf). Checked September 11, 2026: report methods and visually rendered Table 1 on PDF page 3. Underlying studies were not individually re-reviewed. These are historical literature medians, not 2026 measurements or uncertainty intervals.

| Technology | Total life cycle | One-time upstream | Scope |
| --- | ---: | ---: | --- |
| Coal | 1,001 | <5 | Coal generation |
| Natural gas | 486 | 0.8 | Natural gas generation |
| Solar PV | 43 | ≈28 | Thin-film and crystalline silicon |
| Wind | 13 | 12 | Land-based and offshore |
| Nuclear | 13 | 2 | Light-water reactors only |

Both columns use g CO₂e/kWh. The report explicitly warns that phase and total medians can draw from different study pools. No phase additions, subtractions, percentages, cost conversions or composite rankings are performed. The tests pin each displayed figure and qualifier to this manual transcription check.

Progress at the first milestone: one comparison implemented and locally validated; **zero new canonical reviews**. Search/library/update/feedback integration and the other eleven comparisons remained pending. Do not mark the whole goal complete on delivery of a pilot.

## Pilot validation, September 11, 2026

- Clean root `npm ci`: passed, with zero audit vulnerabilities. No manifests, lockfiles or npm configuration changed.
- `npm run verify:install-scripts` and `npm run verify:native-lock`: passed, including standalone backend parity and 31 Linux native lock entries.
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`: passed. Frontend: 289 tests; backend: 170 tests; no skips or failures. Eight frontend tests specifically cover comparison definitions, source/reference integrity, source transcription, precision, URL selection and invalid inputs.
- `node --import tsx scripts/search-browser-smoke.mjs`: passed using the built app, real source-controlled catalog and read-only local API fixture. The new helper checks discovery from seven existing pages, exact figures, contexts, browser history, shared URLs, reload, keyboard controls, empty selection/recovery, canonical metadata, source anchors, sitemap and unknown-slug 404s. Existing search and guide regression checks also passed.
- `npm run a11y`: all 78 route/theme checks passed, including five comparison routes/states in both light and dark modes.
- Backend-runtime, SSR-public-asset and SSR-route-rule smoke checks: passed.
- Visual inspection: desktop and mobile, light/dark; built-browser overflow checks at 1280, 390 and 320 pixels, and 200% text at 320 pixels. Source-table transcription was separately checked from the rendered original PDF.
- `npm run content:coverage`: confirmed the unchanged baseline of 750 reviewed claims in 35 topics. Its previous target is not the new goal's completion counter.

These are local checks, not proof of production deployment. The protected branch requires the appearance-controls CI check; with this workflow it must be obtained through a PR before integration. PR checks, merged-main CI, a release and exact public acceptance remain separate delivery steps. No production account, database record, secret or service was changed for the pilot.

## Second milestone: caffeine timing and a new canonical question

Adds `/compare/caffeine-dose-and-sleep`: 100 mg and 400 mg test doses, 4/8/12 hours before bedtime, total sleep and stage N3 sleep. A separate population/schedule context deliberately withholds estimates. Outcomes remain placebo contrasts, not a ranking or an inferred head-to-head significance test. Context-specific lookup never falls back to another timing's numbers.

Source: Gardiner et al., [DOI 10.1093/sleep/zsae230](https://academic.oup.com/sleep/article/48/4/zsae230/7815486), published online October 8, 2024, in the April 2025 issue of *Sleep*. Checked September 11, 2026: publisher methods, results and limitations, plus the publisher's supplementary DOCX Table S4. Rendered supplement pages 9–10 were inspected against the extracted cells. The twelve TST/N3 placebo estimates, twelve standardized effects, their adjusted intervals, and p-values are pinned by regression tests. No raw-data reanalysis or calculation of minute-scale confidence intervals was performed.

The interface distinguishes the headline difference in minutes from the reported Cohen's d interval. It retains nonsignificant estimates and their uncertainty rather than replacing them with zero. The protocol prominently notes the usual morning caffeine in every condition, so placebo is not presented as a caffeine-free day. Single-night observations in 23 healthy men are not individualized safety cutoffs.

The canonical addition is **Does delaying morning caffeine for 90 minutes prevent an afternoon crash?** Its scope is the claimed benefit of a fixed post-waking delay, not the already-covered daily-tolerance or six-hour-bedtime questions. It adds no measured expert percentage or claimed independent expert review. A targeted Consensus search plus direct source checking did not establish the specific benefit; the review does not claim equivalence or that immediate caffeine is superior.

Sources checked for that review:

- [2024 narrative caffeine review, section 15 and disclosures](https://pmc.ncbi.nlm.nih.gov/articles/PMC10930107/): full relevant text, including supplement-industry relationships. Not characterized as a systematic review.
- [Lovallo et al. 1996 physiological crossover experiment](https://pubmed.ncbi.nlm.nih.gov/8951977/): abstract only; explicitly indirect hormone evidence, not an afternoon-fatigue timing trial.
- [FDA consumer caffeine guidance](https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much): sensitivity and general safety context, not endorsement of the waiting rule.

`practicalEvidenceClaims` and `practicalEvidenceGaps` record genuinely new questions separately from the original 750. The new review is connected to the circadian collection, existing search, comparison links, and the existing saved-review and private-feedback surfaces. Its stable `new_review` announcement uses the existing idempotent publication mechanism; no startup-derived timestamp or bulk historical announcement is introduced.

Implemented total: **2 of 12 comparisons; 1 of 50 new canonical reviews**. Catalog total: **751 reviews, 35 topics, ten guides**. This is not completion of the full goal. The strength-training pilot, remaining comparisons and new reviews, comparison-specific search/saving/updates/feedback, and exact public release acceptance remain unfinished.

### Second-milestone validation, September 11, 2026

- Clean root `npm ci`, standalone backend install-script policy, and all 31 Linux native lock entries passed. No dependency manifests, lockfiles or npm configuration changed; the clean install reported zero audit vulnerabilities.
- Root lint, typecheck, production build and all **468 tests** passed: 294 frontend and 174 backend, without failures or skips. New checks cover all twelve source-table contrasts and their uncertainty, context isolation, rapid selection changes, new-review schema validation, genuine-new-content accounting, explicit source limitations, and search discovery.
- All **86 accessibility route/theme checks** passed. Built-browser checks passed for source/discovery links, dose/outcome/context changes, unsupported contexts, empty selection and recovery, keyboard controls, shared URLs/reload/history, metadata, sitemap and 404s, plus the existing search and guide regression suite.
- The browser regression found a real rapid-selection race: changing outcome and context together could lose the first change. Navigation now composes each selection against the last completed URL, with delayed-navigation and rejection-recovery unit coverage. The browser test deliberately retains back-to-back selections.
- Mobile/desktop visual checks include both themes and open uncertainty disclosures. Overflow checks cover 320, 390 and 1280 pixels, plus 200% text at 320 pixels. Screenshot capture waits for the existing theme color transition to finish.
- Backend-runtime, SSR-public-asset and SSR-route-rule smoke checks passed. The optional guarded Oxlint preflight did not run because its expected version differed from the installed version; the repository's authoritative ESLint checks passed.

These are source/local validation results, not production acceptance. The public deployment marker still identified **v1.19.0**, commit `44b299a1803243140eef91c7b18b148d077794bd`, at this milestone's preflight. Source integration, CI and release publication are tracked separately. Normal insert-only seeding adds the new canonical review and its stable announcement; no existing-content synchronization mode, schema migration, credential reset or production write was performed.

## Third milestone: strength supplements and three new reviews

Adds `/compare/strength-training-supplements`, covering protein, creatine monohydrate and BCAAs for strength and muscle growth. These evidence bodies differ in populations, controls, measurements and duration. The interface therefore presents study-specific findings, not a common-scale ranking. Expandable evidence retains numbers, units, uncertainty, source scope and funding limitations. Without-training and clinical contexts explicitly withhold unmatched findings; neither means an effect of zero.

New canonical questions, each with its own gap record, sources, uncertainty and stable announcement:

1. **Is a loading phase necessary to raise muscle creatine stores?** Separates accumulation speed from the existing general efficacy/safety review. Store increases are not strength increases, and protocol doses are descriptive rather than personal advice.
2. **Does extra lean mass measured after creatine mean extra muscle tissue?** Separates DXA lean mass from direct muscle imaging. The wash-in study does not establish that all creatine benefits are water or that higher doses are necessary.
3. **Does buffered creatine outperform creatine monohydrate?** Addresses a directly tested formulation claim without treating a nonsignificant difference as equivalence or generalizing to every alternative formulation.

Source-access record, checked September 11, 2026:

- [Morton et al. 2018 protein-supplementation meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC5867436/): relevant full methods/results, sensitivity analysis and disclosures via Europe PMC. Preserve 1RM +2.49 kg (95% CI 0.64–4.33), mid-femur cross-sectional area +7.2 mm² (0.20–14.30), and fat-free mass +0.30 kg (0.09–0.52) as separate analyses, not head-to-head supplement results. Dairy-industry relationships disclosed. No claim that every outcome contains all 49 trials or that a modeled intake breakpoint is a universal cutoff.
- [Burke et al. 2023 direct-imaging synthesis](https://pmc.ncbi.nlm.nih.gov/articles/PMC10180745/): relevant full methods, results, discussion and disclosures via Europe PMC. Ten trials, 44 regional outcomes, 6–52 weeks. SMD 0.11, 95% **Bayesian credible interval** −0.02–0.25. Not kilograms, a confidence interval, or expert agreement. Industry relationships disclosed.
- [Desai et al. 2025 wash-in trial](https://pmc.ncbi.nlm.nih.gov/articles/PMC11944689/): relevant full methods/results/discussion/disclosures via Europe PMC. No placebo, hydration not measured, single dose, measurement-error qualification. The 0.51 kg early DXA difference is not directly measured contractile tissue; subsequent nonsignificance is not equivalence. Prior supplier sponsorship disclosed.
- [Hultman et al. 1996 loading experiment](https://pubmed.ncbi.nlm.nih.gov/8828669/): PubMed abstract and complete Consensus paper record, not full trial methods. No claim of randomized strength equivalence or verified funding independence.
- [Jagim et al. 2012 buffered-creatine trial](https://pmc.ncbi.nlm.nih.gov/articles/PMC3479057/): relevant full design, participants, protocols, results and funding via Europe PMC. 36 trained men, 28 days, three formulation/dose arms; usable muscle biopsies in 25. Manufacturer funding and absence of an inactive placebo remain explicit.
- [ISSN 2017 position statement](https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/): relevant full protocol, bioavailability, ergogenic-value and competing-interest sections. A position statement with industry relationships, not an independent replication.
- [Jackman et al. 2017 acute BCAA experiment](https://pubmed.ncbi.nlm.nih.gov/28638350/): abstract and protocol figure. Ten young men, four-hour synthesis outcome, no complete-protein comparator. A 22% higher synthesis rate is not 22% more muscle.
- [NIH exercise-supplement fact sheet](https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/): full relevant creatine, protein and BCAA sections, updated April 1, 2024. Independent general context, not individualized treatment guidance.

These were targeted source checks, not a registered systematic review, completed formal GRADE/RoB assessment, or independent expert review. Direct source access is distinguished from Consensus discovery. No Deep Review was used for this milestone.

Implemented total: **3 of 12 comparisons; 4 of 50 new canonical reviews**. Catalog: **754 reviews, 35 topics, ten guides**. Existing claim search, topic collections, review saving, stable updates and private feedback cover the new reviews. Comparison-specific search/saving/updates/feedback, nine more comparisons, 46 more reviews and exact public acceptance remain unfinished. This pilot does not complete the active goal.

### Third-milestone validation, September 11, 2026

- Clean root installation passed with zero audit vulnerabilities. Root and standalone backend lock/install-script policy and 31 Linux native lock entries passed; manifests, both lockfiles and npm configuration are unchanged.
- Root lint, typecheck, production build and all **472 tests** passed: 296 frontend, 176 backend, no failures or skips. New checks cover source-specific findings, context isolation, schema validation, unique review/gap accounting and discoverability.
- Built-browser comparison, search and guide checks passed. The three new reviews expose the comparison through their normal reading pages; outcome/context changes, source anchors, shared URLs, reload, history, keyboard toggles, empty selections, sitemap and metadata were verified.
- All **96 accessibility route/theme checks** passed, including the five strength comparison states in light and dark. Visual inspection of both themes and mobile/desktop followed the automated checks.
- Visual review caught a layout problem that simple overflow checks missed: prose findings could fit in two excessively narrow phone columns. Findings now use wider minimum cards, with a browser assertion requiring one column at 320 and 390 pixels. Expanded disclosures also pass overflow checks at 1280 pixels and at 200% text on a 320-pixel viewport.
- Backend-runtime, SSR-public-asset and SSR-route-rule smoke checks passed. A local preview remains available on port 3000; no additional browser window was opened during the background continuation.

These are local/source results. At the final local check, public identity remained **v1.19.0**, commit `44b299a1803243140eef91c7b18b148d077794bd`. The normal insert-only seed path adds the three new reviews and idempotent announcements on authorized deployment. No schema migration, account action, existing-content synchronization mode or production write was performed. PR CI, merge, source release and exact public acceptance remain separate steps.

## Fourth milestone: comparison discovery and saving

Comparisons are now a distinct result group in home search, the claim directory
and Ask. Option names and everyday retrieval variants can find the appropriate
comparison, while exact canonical-review routing and review counts are unchanged.
Matching words retrieve a page, not a scientific verdict or an invented ranking.
The small development fixture checks electricity options, protein/creatine/BCAAs,
coffee/sleep, exact titles and unsupported subjects; it is not a measured visitor
success rate or a blind search evaluation.

Each comparison has a compact Save control using the existing library's browser
or account scope. The library displays saved comparisons separately, supports
removal, explicit browser-to-account copying, account conflicts and sign-out,
and preserves unavailable references. Bookmarks save the canonical page; copied
page addresses retain the reader's chosen outcome, context and options.

The source-controlled public definitions move to
`back-end/src/data/comparisons/` and are re-exported by Nuxt. The standalone
backend validates new account selections against this same catalog. The model
adds a bounded array of comparison slugs, with no new credentials, external
storage, collection, interest logging or destructive migration. Older account
clients cannot silently erase that new field. Browser version 1 upgrades on an
explicit mutation, and version 2 fails closed in older clients. Rollout and
rollback limits are documented in `docs/reader-library.md`.

This is a useful-feature milestone, **not additional scientific content**.
Progress remains **3 of 12 comparisons and 4 of 50 genuinely new reviews**;
the catalog remains **754 reviews, 35 topics and ten guides**. Comparison-specific
substantive updates and feedback, nine more comparisons, 46 more reviews and
exact public acceptance remain unfinished. The full goal stays active.

### Fourth-milestone validation, September 11, 2026

- Clean root installation, standalone backend install-script policy and all 31
  Linux native lock entries passed. The install reported zero audit
  vulnerabilities; manifests, both lockfiles and npm configuration are unchanged.
- Root lint, typecheck, production build and all **481 tests** passed: 302
  frontend and 179 backend, with no failures or skips.
- All **100 accessibility route/theme checks** passed, including comparison
  results in the directory and Ask. The populated saved-comparison library also
  passed accessibility in both themes, overflow checks at 320/390/1440 pixels
  and 200% text, plus mobile/desktop visual inspection.
- The isolated MongoDB/built-browser harness passed published-slug validation,
  anonymous access denial, account separation, old-client field preservation,
  explicit clearing, withdrawn-reference removal, persistence after restart,
  browser save/reload, account copying/removal and sign-out. Existing substantive
  update and reader-feedback flows passed their regression checks.
- Built comparison/search/guide checks passed, preserving source numbers,
  canonical routing/counts, unsupported-query handling, outcomes, contexts,
  keyboard controls, URL/history behavior, sitemap and metadata. Backend-runtime,
  SSR asset and route-header checks also passed.
- The optional guarded Oxlint preflight did not run because its installed
  version differs from the approved version. Native ESLint passed. The existing
  local preview was restored on port 3000 after the clean install; no additional
  user-facing browser window was opened during this continuation.

These are local/source results, not production acceptance. The public deployment
marker still reported **v1.19.0**, commit
`44b299a1803243140eef91c7b18b148d077794bd`, during this milestone. No production
accounts, credentials, database records, services or deployment configuration
were changed. CI, source integration/release and exact live acceptance are
separate gates.

## Comparison updates and private feedback milestone

The library now explicitly opts into mixed review/comparison announcements,
including comparison-only libraries and comparisons within followed topics.
Older clients continue receiving review-only rows. Comparison histories record
the original source releases with stable IDs, evidence links and explicit
bottom-line impact; cosmetic changes do not manufacture new scientific activity.

Comparison pages offer the existing private usefulness and missing-evidence
forms, with canonical server-resolved targets and titles. The admin queue can
filter and triage comparison feedback. Anonymous submissions do not attach an
account, cookie, raw network address or bot-check token to stored feedback.
Feedback never changes scientific findings or publication state automatically.

This is feature integration, **not new scientific content**. Progress remains
**3 of 12 comparisons and 4 of 50 new canonical reviews**, or 754 total reviews
across 35 topics. Nine comparisons, 46 genuinely new reviews and exact public
release acceptance remain required. No production deployment is performed by
this milestone; the matching backend must be ready before the new frontend.

### Local validation

- Clean root installation reported zero audit vulnerabilities. Standalone
  backend install-script parity and all 31 Linux native lock entries passed;
  both lockfiles, manifests and npm configuration are unchanged.
- Repository lint, frontend/backend typechecks, production build and all
  **487 tests** passed: 303 frontend and 184 backend, no failures or skips.
- The real isolated database/browser suite passed mixed-feed pagination,
  old-client compatibility, comparison-only libraries, saved/followed
  deduplication, target validation, admin-only feedback filters and triage,
  secret-field exclusion, restart persistence and retained failed forms.
- Comparison/search/guide browser regressions, runtime fail-closed behavior,
  SSR assets and route privacy headers passed. All **100 accessibility
  route/theme checks** passed; populated feedback and library views also passed
  both themes, 320-pixel layout and 200% text checks. Mobile feedback and admin
  triage screenshots were visually inspected.
- History is distinct from outcome uncertainty. Unsupported result cards do
  not expose borrowed findings or citations, while the separate history keeps
  its source links. Invalid dates, malformed UUIDs and future events are tested.
- The optional Oxlint preflight remained unavailable because its installed
  version differs from the reviewed version; native repository lint passed.

These are local results. Protected-branch CI, integration, a source release and
exact public acceptance remain separate gates. The full expansion goal remains
active; this milestone must not be counted as additional canonical reviews.
