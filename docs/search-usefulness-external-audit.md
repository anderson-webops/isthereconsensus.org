# External question coverage audit

October 8, 2026. Source baseline:
`97ac1660270390ad8b63c9506376ba3fcf132685`.

## Classification before retrieval

All 72 original externally authored questions have a frozen coverage decision.
The original title-only sample remains unchanged: twelve questions for each of
six predeclared tags, with original identifiers, wording, source links, dates,
license declarations and title fingerprints retained in private evaluation
staging. No question was shortened, substituted or removed after inspection.

[The complete classification record](search-usefulness-external-classification.json)
contains assistant-authored reasons and related canonical review identifiers,
not copied question titles, authors, answers or private reader submissions.
Its UTF-8 SHA-256 is:

`4a328edf5c7c6ca220cbf405b3849fab2f7b62786bd67e363155362419c034b1`

The original question-file SHA-256 remains:

`dcac84936cf7aae9c365c957cea638912d1feae877d4650883058eb11d5d0c8b`

The strict evaluator input, derived without changing any original query, has
SHA-256:

`cc2364eb3fef7972bbcae45142324e59778243306ee3ab8bea114f83b640ab1e`

Labels were frozen before any fresh retrieval request. Search development,
the original development questions, complete title and scope gates, and the
settled-typing browser checks finished before the fresh titles were exposed.
No source body, ranking, admission rule, model pin or query wording was changed
to improve this sample's outcome.

| Sampling tag   | Covered | Partial | Gap    | Outside | Total  |
| -------------- | ------- | ------- | ------ | ------- | ------ |
| Nutrition      | 0       | 2       | 7      | 3       | 12     |
| Climate change | 0       | 8       | 4      | 0       | 12     |
| Environment    | 0       | 2       | 7      | 3       | 12     |
| Education      | 0       | 0       | 6      | 6       | 12     |
| Energy         | 0       | 3       | 5      | 4       | 12     |
| Technology     | 0       | 0       | 3      | 9       | 12     |
| **Total**      | **0**   | **15**  | **32** | **25**  | **72** |

Source-only navigation identified plausible related reviews. Their complete
scientific bodies, including uncertainty, misconceptions, evidence summaries
and inclusion/exclusion boundaries, were inspected before labels were frozen.
The private freeze receipt retains exact body fingerprints for all fifteen
partial destinations. A probiotic treatment review was also inspected and
rejected as an answer to a different product-identity question.

A partial destination is useful context, not a complete answer. For example,
an inflammation review does not answer a cognitive-outcome question; a
fire-weather review does not establish a global burned-area trend; and a
grid-planning review does not calculate the electricity needed by an entire
national vehicle fleet. Numerical qualifiers and named contexts were not
dropped to turn such cases into covered successes.

Empirical questions about population measurements, environmental inventories,
clinical outcomes and engineering performance remain gaps when the needed
evidence is absent. They were not moved outside merely because a number or
proper noun made matching difficult. Outside decisions concern historical
attribution, particular incidents, administrative records, undefined cultural
referents or normative judgments as phrased. Ambiguity and missing context
remain explicit in the individual reasons. No biological, intrusion or
military operational instructions are supplied by this audit.

## Public availability boundary

Anonymous IPv6 GETs at 13:16 UTC observed frontend `v1.38.22` with the source
baseline above. Two public catalog pages contained 800 unique review slugs.
Every public slug was in the prepared source library, while 201 prepared
reviews were absent from that public catalog. All fifteen partial destinations
were present in the catalog. The public coverage endpoint reported zero rows.

This verifies only the recorded frontend identity and public catalog snapshot.
It does not verify backend or worker release identity, IPv4 availability,
optional model activation, guide completeness, private editorial state or a
protected publication operation. No production mutation, authentication,
host administration or deployment was performed.

## First complete public evaluation

The unchanged evaluator finished at `2026-10-08T13:38:57.283Z`. It retained all
72 original questions on both actual public APIs, with three seconds between
questions, ordinary per-request pacing and an IPv6-first client preference.
No DNS record or server limit was changed. All 175 anonymous GETs returned
HTTP 200, with no unavailable search rows or unreadable expected destinations.
All fifteen related reviews passed both their public article API and rendered
heading/bottom-line check. This is text availability, not human comprehension.

| Surface     | Covered score             | Related partial destination in top three | Outside empty | Unavailable |
| ----------- | ------------------------- | ---------------------------------------- | ------------- | ----------- |
| Directory   | Not computable: 0 covered | 0 / 15                                   | 25 / 25       | 0           |
| Suggestions | Not computable: 0 covered | 0 / 15                                   | 25 / 25       | 0           |

All 32 gap questions also returned no results on each surface. The partial
diagnostic does not enter the covered score, and the outside-control result
does not compensate for the absence of a covered denominator. The evaluator
correctly reported `mechanicalGatePassed: false` and exited with status 1;
this is a complete nonpassing assessment, not an interrupted run or tool error.

[The sanitized complete result](search-usefulness-external-result.json)
retains all identifiers, query fingerprints, classifications, expected
destinations, actual top-three observations and endpoint reasons without
redistributing raw question text. The owner-only first raw report is retained
unchanged with SHA-256:

`f309f8cdc6b21b0c4ef979c1d8afd288d856cda68be4535a473994c1512bc853`

The existing evaluator's thirteen focused tests passed, including zero-covered
rejection, both API thresholds, unavailable-versus-empty handling, actual
synthetic HTTP/CLI behavior and secret-field exclusion. These tool tests are
not fresh usefulness successes. No new application release is warranted by
this documentation-only audit.

## Interpretation and retained scope

There are no covered questions under the predeclared complete-answer rule.
Consequently there is no covered top-three denominator and no possible passing
90-percent usefulness result from this sample. Zero divided by zero is not a
perfect score. Retrieving a partial destination cannot repair this missing
denominator or become a covered success.

The sample is useful coverage evidence, but not an acceptance benchmark for
retrieval of already-covered everyday questions. It disproportionately asks
about precise statistics, named products, historical events and omitted
referents. That reflects the predeclared external sampling method, not measured
visitor demand. Keep every original row and the first complete public result;
do not replace questions, relax scope or relabel them after seeing ranks.

External question authorship does not make assistant relevance grading
independent human judgment. Title-only scope cannot substitute for the full
original question, and no human comprehension, visual accessibility or
training-data exclusion has been established. The original collector retained
reported licensing metadata; raw-title redistribution still requires a separate
attribution review. No raw-title benchmark is published here.

Any later content or retrieval development informed by these rows must retain
this first result as exposed development evidence. A new acceptance sample
requires a separately declared collection rule and genuinely fresh questions,
not a selected subset of this set or paraphrases of existing review titles.

The full reader-driven expansion goal remains unchanged: 1,001 genuinely public
substantial sourced reviews, eight additional substantial guides, approved
public roadmap summaries, follow-to-answer/update behavior, a qualifying fresh
usefulness check and separate explanation-usefulness evidence. Prepared source
counts, catalog presence and tool tests cannot replace those acceptance gates.
