# Search usefulness: development evidence and fresh-question boundary

Recorded October 6, 2026 against source commit
`799ba59d13b88377c9d23175be3e433661b6a75b`. All eight checks for its
merged-main CI run `37416825803` passed. This record does not certify a new
search implementation, production publication or completion of the expansion
goal.

## Actual public state

Anonymous observations at 05:28 UTC found frontend `v1.38.15` at
`fae8ee8fb3bc8782ce9800ee88a8af742074b307`, 800 public reviews and zero approved
public coverage-roadmap rows. Frontend metadata does not prove backend source
identity. The source-authored total and isolated publication rehearsals must
not be substituted for actual publicly readable reviews.

The earlier public development evaluation retained all sixty questions: 42
source-classified covered, three partial, three gaps and twelve outside.
Both actual search surfaces returned a relevant canonical top-three destination
for only four of the 42 covered questions. Six expected digital-security
destinations were unavailable. The original question and classification files
remain unchanged; these exposed questions are not a fresh acceptance set.

## Rejected retrieval shortcuts

The following are offline experiments against the complete source catalog,
not public-site improvements. Their controls are development material, not
measured visitor behavior. The broader experiment contains the original sixty
questions, one hundred existing covered regressions, twenty existing outside
controls and thirty additional assistant-authored controls. All strata remain
visible, including partial coverage and gaps.

- Requiring each proposed destination to contain all query nouns produced only
  16 of 42 original covered hits, despite retaining all one hundred older
  covered hits and empty results for all 62 declared outside controls. Requiring
  every modifier was worse. This rejects useful unfamiliar wording and is not
  an acceptable replacement for the 90% goal.
- A contextual-retrieval cutoff of 0.65 combined with the original lexical
  result reached 38 of 42 covered hits, but returned candidates for seventeen
  declared outside controls. Raising that cutoff to 0.8 emptied all 62 controls
  while reducing covered hits to six. Neither setting passes. These cutoffs are
  retrieval filters, not calibrated relevance probabilities or scientific
  confidence. Other tested cutoffs remain development failures, not a means
  to choose a favorable denominator.
- Semantic alignment of individual query concepts did not resolve the tradeoff.
  The variant that emptied all 62 controls still reached only 16 of 42 covered
  hits. An unrelated compound question cannot become supported merely because
  its separate words occur somewhere in the library.
- Full-precision reranking of shorter title/bottom-line passages reached only
  eighteen of 42 covered hits at the unchanged zero-logit filter and returned
  three candidates for additional declared outside controls. Without that
  filter, its original covered top-three result was 37 of 42. This remains a
  diagnostic, not an application-accepted alternative.

None of these experiments changes the shipped search, scientific conclusions,
citations, review dates, clinical scope boundaries or publication controls.
Preserving an easy older benchmark does not establish the requested unfamiliar
everyday-question usefulness.

## Numerical-reference boundary

The pinned reranker revision is
`a09144355adeed5f58c8ed011d209bf8ee5a1fec`. Its quantized artifact has SHA-256
`e9d8ebf845c413e981c175bfe49a3bfa9b3dcce2a3ba54875ee5df5a58639fbe`;
the independently downloaded full-precision artifact has SHA-256
`c623d0bcb99f4622beb413eaef00cfbe5db20df9f1dd982da4b4f26022881870`.
Both downloads were checked against the publisher's pinned size and digest.
Inference used local files with network calls disabled.

Full precision reproduced the two exact examples and scores printed in the
[original author's model card](https://huggingface.co/cross-encoder/ms-marco-MiniLM-L6-v2)
within 0.000002. However, the earlier fixed positive reference remained outside
its original 0.03 tolerance for both artifacts. That failure was retained, not
replaced by the newer passing examples or a wider tolerance. Numerical agreement
on other examples does not accept this model for application integration, prove
answer coverage or turn its ranking scores into scientific confidence. The
earlier reference provenance still needs reconciliation.

## New external questions, frozen but not evaluated

A separate title-only sample of 72 publicly authored Skeptics Stack Exchange
questions was frozen at `2026-10-06T05:36:47.863Z`. Its original UTF-8 file has
SHA-256:

`dcac84936cf7aae9c365c957cea638912d1feae877d4650883058eb11d5d0c8b`

The predeclared sampling rule selected twelve unique eligible titles per tag:
nutrition, climate-change, environment, education, energy and technology.
Titles were ordered by creation date, limited to contributions between May 2,
2018 and October 3, 2026, and retained with their public source links and
reported CC BY-SA 4.0 licenses. The only wording transformation was HTML entity
decoding; no title was truncated, paraphrased or selected using search results.
Duplicate, invalid and credential-like inputs were excluded before freezing,
with counts retained separately. The publisher's
[questions API](https://api.stackexchange.com/docs/questions) and
[field-filter API](https://api.stackexchange.com/docs/create-filter) allowed
collection without owner identities, raw question bodies or answers.

Question text was not printed to the search developer and has not been scored
or used for tuning. The owner-only question file remains local evaluation
staging, not a published benchmark, approved roadmap or set of site visitor
requests. Retain the original file, source links, licensing evidence and
checksum until an audited evaluation record supersedes this staging material.
The publisher's [licensing information](https://stackoverflow.com/help/licensing)
must accompany any later redistribution or attribution review.

Before its first retrieval score:

1. Finish the candidate search implementation without inspecting these titles.
2. Audit every title against complete source bodies, assigning covered, partial,
   gap or outside status and canonical expected destinations before retrieval.
   Record ambiguous scope, privacy and licensing limitations; do not silently
   replace questions to make scoring easier.
3. Check actual public availability separately. An unpublished source review
   cannot be a public success. Preserve original wording, all strata and both
   search-surface denominators in the report.
4. Run the anonymous end-to-end evaluator once at the recorded source state,
   then assess scientific relevance and explanation usefulness separately.
   External authorship does not certify independent relevance grading, reader
   comprehension, representative visitor demand or exclusion from pretrained
   model data.
5. If the score prompts further tuning, retain the first result and mark this
   set exposed. A later acceptance attempt requires another genuinely fresh
   frozen set, not a relabeling of this one.

The full goal still requires the public reviewed total, substantial public
guides, moderated roadmap and follow-to-answer/update workflows, and a passing
fresh usefulness evaluation. A frozen candidate file or green tool tests do
not complete those requirements.
