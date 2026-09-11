# Reader search quality

## September 11, 2026 development benchmark

The local catalog contains 750 reviews in 35 topics. The fixed query set contains 100 covered questions spanning 28 topics, plus a separate 20-question unsupported/mixed-subject set. Each covered question has one manually chosen relevant destination. Relevance means that the review addresses the question, not that it agrees with the question's premise.

| Check | Previous suggestions | Previous directory | Shared ranking |
| --- | ---: | ---: | ---: |
| Expected review in first three, out of 100 | 92 | 90 | 100 |
| Correctly empty unsupported searches, out of 20 | 13 | 13 | 20 |

The old endpoint implementations are reproduced from `d5a5543`, using the same catalog and September 11 reference date. The directory included topic descriptions; suggestions did not. Both included topic titles and misconception tags. The earlier shorthand baseline omitted some of that context, so the two endpoint-specific figures above are the authoritative comparison.

This is a development regression set authored before ranking changes and used while tuning them. It is **not** a blind evaluation, a random sample, a traffic-weighted sample, or evidence of a 100% visitor success rate. Seven topics have no paraphrased question in this set. The negative set includes deliberately implausible combinations as well as ordinary non-library requests. It does not prove the absence of misleading matches in unrestricted language.

Additional regression checks preserve the first result for all 750 catalog titles (subject to the API's 160-character query cap), reject six further uncovered questions, and ensure vaccine/autism matching preserves the review's actual negative answer. Newly added content can legitimately require reviewing negative fixtures if it starts covering those questions.

## What changed

- Suggestions and directory results use the same public-ready catalog ranker. Publication and source-readiness checks remain before ranking.
- Word and phrase equivalents, accent normalization, and unambiguous bounded typo correction support ordinary wording.
- Title relevance and distinctive subject coverage outweigh incidental mentions in longer summaries. A small, expiring demand signal only breaks close ties.
- Results link to existing reviews; matching does not generate answers or alter scientific conclusions.
- Directory searches preserve server order and put matching reviews before compact related-topic links. Blank searches still expose the entire catalog, with topics first and reviews progressively displayed.
- Loading, unavailable service, and genuine empty results are separate states. Old suggestion responses are canceled and ignored when the reader changes the question.

## Reproduce

Use the Node/npm versions pinned by the repository. From the repository root:

```sh
node --test --import tsx back-end/test/search-benchmark.test.ts
node --import tsx back-end/test/search-benchmark-report.ts
npm run build
node --import tsx scripts/search-browser-smoke.mjs
```

The report prints endpoint-specific baseline results and every included topic's denominator and score. Index construction took about 48 ms on the development machine in one run; this is not an API latency benchmark and excludes database reads.

The browser smoke uses the built frontend, real source-controlled catalog, shared ranker, and a local read-only API fixture with the production-style same-origin API path. It verifies SSR query rendering, hydration, delayed response races, empty results, failed requests and retry, full-catalog counts, pagination, prefilled Ask questions, early homepage submission, browser back/forward, and mobile overflow. It does not substitute for backend route authorization/readiness tests or live deployment checks.

Set `SEARCH_SMOKE_SCREENSHOT_DIR` to save desktop and mobile screenshots. The smoke is also included in the CI accessibility job. No production credentials, user search history, or database changes are involved.

## Release acceptance

Local validation and CI/live deployment verification are recorded in the pull request and release notes. The broader reader-experience goal remains open: this search milestone does not deliver the ten new reading guides, saved reviews, followed-topic updates, or editorial feedback workflow.
