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
