# Reading guide evidence and delivery

## First three guides, September 11, 2026

This is an incremental delivery toward the ten-guide reader-experience goal, not completion of that goal. The first subjects are caffeine, supplements, and energy choices. Sleep, exercise, vaccines, nutrition, climate attribution, evolution, and interpreting medical evidence remain to be written and validated as substantive guides.

Guide narratives live alongside the existing frontend explainers, in `front-end/src/data/reading-guides/`. They synthesize and link to the canonical API-backed claim reviews; they do not create duplicate claim records or inflate the 750-claim count. Small discovery metadata is separate from lazily loaded article bodies. Dates are explicit source-check dates, not fabricated expert-review dates or database restart timestamps.

## Evidence checks

- Caffeine: Consensus Pro discovery and fetched records were cross-checked against primary publication abstracts in PubMed/Europe PMC. Carvalho 2022 (PMID 35536449, 60-study synthesis), Khodadadi 2025 (PMID 39905628, 80 initially inactive men), Gardiner 2023 (PMID 36870101, 24-study sleep synthesis), and Juliano/Griffiths 2004 (PMID 15448977, withdrawal review). FDA adult safety guidance was read directly. Abstract-only review is disclosed; no full-text review or systematic new literature search is claimed. Between-study habitual-use comparisons and longitudinal habituation are distinguished. No universal caffeine-reset duration, dosing escalation, or individualized sleep-loss estimate is recommended.
- Supplements: FDA regulatory questions and answers; NIH Office of Dietary Supplements' general consumer and exercise-performance fact sheets; USPSTF's 2022 vitamin/mineral recommendation and clinician summary. These were checked for population, purpose, product-quality limits, and safety context. Prevention findings do not replace deficiency treatment or pregnancy guidance. Creatine evidence is outcome- and population-specific. No brand, purchase, or personal regimen is recommended.
- Energy: IPCC AR6 WGIII Chapter 6 energy-system/storage/transmission material; NREL's 2021 lifecycle update; IEA's 2024 integration overview, framework, and executive-summary findings; the abstract of Markandya/Wilkinson 2007 (PMID 17876910). The historical and largely European health evidence is explicitly qualified. The storage arithmetic is labeled hypothetical and excludes losses; no current universal price or mortality ranking is invented.

Paragraph citation IDs point to the source list. Source entries explain the kind of evidence and its limitations. Original reading exercises are labeled as such instead of being presented as experimental findings. This is a curated synthesis, not a new systematic review or a claim of independent expert review.

The NREL report's old `www.nrel.gov` address failed DNS during the link check. The laboratory's current research catalog identifies the same 2021 report at `https://docs.nlr.gov/docs/fy21osti/80580.pdf`; that PDF returned HTTP 200. The guide uses the working institutional document URL while preserving the report's original attribution and year.

## Verification scope

- Guide tests check discovery uniqueness, valid claim/topic links in both directions, source anchors, HTTPS sources, explicit review scope, substantive content, future dates, and rejection of unknown/prototype-property slugs.
- The existing built-browser smoke additionally checks every guide's SSR body, canonical and Article metadata, citations/contents anchors, navigation and browser history, mobile widths, text enlargement, linked review/topic/Explainers discovery, 404 behavior, and guide/sitemap availability without the backend. The API fixture uses the real source catalog; it is not production database integration.
- All three detail pages and the guide index are included in the light/dark accessibility checks.
- Source correctness requires editorial review of the cited material. Passing structural tests or a minimum word count is not proof of scientific accuracy.
- Release acceptance also requires CI and checks of the public release identity, guides, connected review links, and sitemap. Release publication alone is not deployment proof.
