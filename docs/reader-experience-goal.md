# Reader experience goal

Make the evidence atlas easier to search, understand, and revisit by improving search relevance, publishing ten substantive reading guides, adding saved reviews and followed-topic updates, and connecting reader feedback to editorial priorities. Validate search against 100 representative questions, targeting a relevant result in the top three for at least 90% of covered questions, with separate checks for unsupported questions and misleading matches.

## Acceptance and delivery

The starting release is v1.15.72, with 750 published claims in 35 topics. This goal remains open until every deliverable below is implemented, tested, released, and checked on the public site.

1. Search: one ranking path for suggestions and directory results; everyday vocabulary and bounded typo tolerance; title and subject relevance ahead of incidental mentions; honest handling of unsupported questions. Freeze 100 covered questions and expected destinations before tuning. Report the old and new top-three success rates, per-topic coverage, and separate negative checks. Do not present the development benchmark as measured visitor success or a blind evaluation.
2. Reading guides: ten substantive, sourced guides that explain a subject, connect existing claims, distinguish evidence from uncertainty, and add research where the existing coverage is insufficient. Initial subjects: caffeine, sleep, supplements, exercise, vaccines, nutrition, climate attribution, energy choices, evolution, and interpreting medical evidence. Verify source support and current guidance, links, metadata, responsive reading, and discovery from relevant claims and topics.
3. Saved reviews and followed topics: bookmarks and follows usable without registration, optional account synchronization, clear removal controls, persistence across reloads, and an in-site update feed describing substantive revisions. Verify anonymous use, account isolation, sign-out behavior, and revision freshness. Do not send email without an explicit opt-in flow.
4. Reader feedback: answer-usefulness feedback and structured missing-evidence suggestions, bounded abuse controls, and admin-only prioritization that links feedback to claims or content gaps. Avoid retaining raw sensitive search text automatically. Feedback must not change scientific conclusions or publication state automatically.
5. Verification: required clean install, lock policy, lint, typecheck, tests, production build, applicable runtime and accessibility checks, GitHub CI, and live release identity plus feature behavior. Keep completed changes committed and pushed in coherent milestones.

## Progress

- Search benchmark and ranking: implemented, with the 100-question benchmark, 20 negative queries, full-catalog title checks, and built-browser navigation/error checks recorded in [search-quality-benchmark.md](search-quality-benchmark.md). CI and live release acceptance are tracked in PR #53 and its release notes.
- Ten reading guides: pending.
- Saved reviews and topic updates: pending.
- Reader feedback and editorial priorities: pending.
- Final full-goal acceptance audit: pending.
