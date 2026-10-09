# Complete model search regression assessment

The complete exposed development assessment now recovers all three covered
agency-FAQ destinations and declines all nine outside administrative requests
on both actual local search APIs. The original covered score remains 38 of 42.
These are development regressions, not fresh-reader certification, additional
publicly published reviews, or approval to activate the model worker.

The assessment ran October 9, 2026, 00:08:56-00:33:00 UTC, which is October 8
in America/New_York. Its source baseline was v1.38.25 at
`466165f751cfc7deffd366781e782322f4ac0c36`, with an explicitly uncommitted
worker candidate. All earlier reports and failures remain unchanged.

## General retrieval corrections

The corrected ranking combines the native index and admitted paragraph results
with equal-weight reciprocal rank fusion, using the original paper's fixed
`k=60`: each channel contributes `1 / (60 + rank)`. Exact and close native
priorities remain ahead of that fusion. The former two-semantic/one-native
ordering could discard a relevant second native answer from the top three.
The method comes from [Cormack, Clarke and Buettcher's primary paper](https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf);
the site's measured results below, not the paper's results, establish this
candidate's observed development performance.

Paragraph nominations for functional questions now require the requested actor
and outcome within the same allowed source clause. A topical mention or a
provider's name in a consensus statement is not sufficient paragraph evidence.
Native related matches retain their existing scope-qualified behavior, not an
entailment guarantee. Generic information
access, update-subscription and unspecified publication-catalog requests are
declined instead of presented as scientific answers. Scientific outcome and
data-quality questions remain eligible. No complete question string or agency
name was added as a retrieval rule.

The original parent five-result semantic ceiling is applied before corrected
scope verification, without replenishing rejected rows. Existing cosine and
relevance floors, numeric qualifiers, direction and requested-negation checks,
public-field eligibility, model weights and dependency locks remain unchanged.
Paragraph-backed results retain their actual semantic provenance when a slug
also appears in the native ranking. Ranking scores are not scientific confidence.

## Complete assessment results

The same three immutable inputs retain all 168 original questions, body-based
classifications and preassigned canonical destinations. Both compiled backend
routes, real pinned network-denied models and the actual rendered frontend are
used together. Every checked destination must have a readable article API,
visible heading and bottom line. The source-only disposable fixture contains
1,001 schema-validated reviews and 3,295 citations, not production publication.

| Exposed set | Covered | Partial | Gaps | Outside | Directory covered hits | Suggestion covered hits | Outside empty on each API |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Original sixty | 42 | 3 | 3 | 12 | 38/42 | 38/42 | 12/12 |
| Original seventy-two | 0 | 15 | 32 | 25 | No denominator | No denominator | 25/25 |
| Agency FAQ thirty-six | 3 | 11 | 13 | 9 | 3/3 | 3/3 | 9/9 |

There are zero unavailable responses and zero unreadable checked destinations
in all three sets. The seventy-two-question mechanical gate remains false:
zero covered questions cannot certify search usefulness. Partial destinations
remain partial; they are not promoted into the covered denominator.

The preceding v1.38.25 full-model run reached two of the three covered agency
answers and kept only five of nine outside requests empty. This candidate
recovers the global-temperature-data destination and removes all four observed
administrative false matches. The sixty-question score remains 90.48%, with
the same unresolved canonical misses `q04`, `q13`, `q22` and `q45`.
Neither that exposed percentage nor the small agency denominator proves the
goal's genuinely unfamiliar everyday-question acceptance. The agency sample
still falls below its original twelve-covered-question acquisition floor; its
provenance and full sample-acceptance failures remain unchanged.

The run records 335 worker requests, 334 successful responses and 288 actual
native scoring batches. Its one rejected request is the explicitly asserted
initial cold-corpus control. Warm-up takes 308,238 milliseconds on local macOS
ARM64. This is not deployed latency or Linux ARM64 resource acceptance.
All owned children exited and the disposable database/socket scratch was
removed; retained result files and earlier failures were not overwritten.

## Functional source compatibility

A subsequent compatibility correction accepts the same functional frames in
source clauses as in queries. Otherwise a functional source title without a
causal predicate could be excluded even when its paraphrase requests the same
actor and outcome. Synthetic tests exercise real paragraph nomination for all
three source-title forms, while rejecting unknown actors, inverted roles,
unsupported numeric qualifiers and unsupported requested negation.

The retained full-model assessment precedes this final source-format extension.
A separate structural comparison verifies unchanged parent and corrected role
outputs for all 11,455 actual source clauses, and unchanged query roles and
native preparation for all 168 exposed questions. It establishes regression
equivalence for this corpus, not new native model predictions, a final-release
actual-API rehearsal or activation approval.

## Evidence identity

The model assessment binds twelve source/runtime/lock inputs and asserts their
hashes and all three question-file hashes remain unchanged through completion.
The corpus fingerprint is
`8daaf2280cc582f4e0d2756f0c6e338290a0dfd6a17ca8a7be8785632a5e76fa`.
Retained SHA-256 identities are:

| Evidence | SHA-256 |
| --- | --- |
| Predeclared protocol | `95fa7085ac9d20c4a52aebdf8114f0d45a62a9433bc85188dc6498d83888ecf5` |
| Complete assessment summary | `118662248e342a512686f9012dad797283262137ee7d3265a244cd56e40a1304` |
| Original sixty result | `07fbb616ac419ad319685d72d74440833d3e5eb9575e8bbe438525d00fb2fec1` |
| Original seventy-two result | `d15ba104a61aed5341a34d98cf242c50bac9205c101f7705e5b421dddf0fe62a` |
| Complete agency result | `9f671478ac8abc7f5aa53a7a51348f97049fd05acf994b72c692e3884275d3ff` |
| Functional source equivalence | `6126cbb8f4f561e56f9034adc4a97a6a883c6dd5a87bdbcd311b2c9beef65cd1` |

The assessed pipeline SHA-256 is
`e51a00380ea3a7a2bfc17ba0bfed94424c17e67a86f3f7dcc99bc9580d1933c4`;
the final functional-source pipeline is
`35821442e167cd8c578167788aab0bb3ed85af32ce5cbe9cd772c96dfe83e058`.
The first synthetic test failure exposed incorrect result provenance and the
first lint pass exposed a missing brace pair; both were repaired and retained.
Neither failure was hidden or used to change scientific content or labels.

## Final local engineering checks

All 998 native tests pass: 435 frontend, 509 backend, 31 worker and 23 helpers.
Full lint, all workspace typechecks and builds, compiled backend runtime and
SSR asset/route checks pass. The browser search regression and all 256
light/dark accessibility cases also pass. Browser fixtures exercise ordinary
search and presentation, not model activation or real reader comprehension.
Install-script/native-lock policy checks pass; root and standalone backend
full/production audits report zero findings. Dependency locks are unchanged.
An independent network-denied local secret scan passes for the owned source
and documentation. Unrelated instruction changes are excluded from delivery.

## Remaining acceptance requirements

Keep model activation unapproved. The subsequent final-source original-210,
eight scope and 1,001 title controls now pass through the complete local service
and both actual APIs, with all six browser inference-cancellation cases passing.
See [the final service acceptance](search-service-acceptance-2026-10-09.md) for
the separate actual-model evidence, source identity and cleanup. This does not
retroactively change the earlier study or its structural-proof boundary.
The previously sealed seventy-two-question set is now
exposed development material and cannot be reused as fresh certification.
A separately frozen, genuinely unfamiliar and adequately covered sample is
required after protected publication, with human explanation-usefulness evidence
collected separately. Linux ARM64 numerical, capacity, whole-service latency,
real typing and retained-artifact activation/rollback checks also remain required.

Protected publication and public readback of the 201 prepared expansion reviews
remain separate from source retrieval engineering. No production login, data
mutation, deployment, model activation, private reader submission or other-chat
message occurred in this assessment. The full reader-expansion goal is unfinished.
