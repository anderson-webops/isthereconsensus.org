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

## Additional rejected answer-coverage filters

A separately pinned `cross-encoder/qnli-electra-base` full-precision model
(`c7dea87c98b2269a935686c31336e97e837cbbeb`, artifact SHA-256
`595b37541289472b7b784ed2af05bcad6000991a2657aeee4f92f68b42ae61d9`)
passed eight predeclared synthetic checks but failed the complete original
covered stratum. Bottom-line passages reached 19 of 42 and longer review-body
passages 17 of 42 at the unchanged zero-logit filter. They also returned
candidates for two and one original outside questions, respectively. The
planned 210-row study was stopped after rejection; 120 scored rows were retained
at the decision. Its unscored remainder is not a passing result. Publisher byte
verification and synthetic labels are not independent numerical-reference
agreement. The rejected model was not integrated.

A local numeric-feature classifier also failed. Canonical-group development
folds reached 12 of 42 covered questions without class balancing. Balancing
increased that to 34 of 42 but returned candidates for nineteen outside
questions. Neither variant changes the application or consumes the fresh set.

## Broader scope studies after v1.38.16

The following studies use source commit
`f65a01bd4c946e3efc42c7489688ee49c17ba7cb`, not a newly deployed search.
Their specifications were fixed before predictions. The complete first two
studies retain all 210 exposed development rows, including every outside,
partial and gap control. Expected destinations, query identifiers and topic
labels are not prediction features. Unknown subjects are not silently dropped.

### Same-synset lexical coverage

The [Open English WordNet 2025 release](https://github.com/globalwordnet/english-wordnet/releases/tag/2025-edition)
was verified against the publisher's archive digest:
`7d749f6e2c39e6970e4997839dcf6e42fd281f3c2fae0171d2192bae8cfa4b51`.
The exact archive has 128,009 top-level headwords. An invented minimum-count
assertion caused the first attempt to exit before predictions; the original
failure was retained and the count corrected without changing study thresholds
or question labels. Matching uses shared synsets, not broad parent classes or
definition-keyword expansion. The original license notices were retained.

| Predeclared variant | Original covered hits / 42 | Outside controls returning results / 62 |
| --- | --- | --- |
| Semantic nomination without the added lexical guard | 38 | 17 |
| Require every nongeneric noun | 17 | 2 |
| Require every nongeneric noun and adjective | 11 | 1 |
| Weighted lexical coverage with a literal title anchor | 6 | 2 |

All four variants preserve the 100 older covered regressions and all 1,001
native title priorities, but none passes. A shared word sense anywhere in a
review does not establish support for the relationship a question asks about.

### Corpus-contrastive concept coverage

This study compares each informative query concept with the title and bottom
line of every source review. A candidate must contain that concept literally
or meet both an absolute similarity threshold and a fixed margin from the
corpus's strongest concept match. No outcome labels select the comparisons.
Inference ran inside an explicit network-denied sandbox.

| Predeclared variant | Original covered hits / 42 | Outside controls returning results / 62 |
| --- | --- | --- |
| Nouns, maximum contrastive gap 0.08 | 17 | 1 |
| Nouns, maximum contrastive gap 0.12 | 21 | 4 |
| Nouns and modifiers, maximum gap 0.08 | 10 | 0 |
| Nouns and modifiers, maximum gap 0.12 | 18 | 3 |
| Content words, maximum gap 0.08 | 6 | 0 |
| Content words, maximum gap 0.12 | 12 | 2 |

Every variant again preserves the 100 older covered regressions and 1,001
native title priorities. None meets the unfamiliar-question target. The safe
variants still reject too much ordinary wording; the broader variants can
connect subjects and outcomes that the nominated review does not cover.

### Stronger passage reranker, stopped after a decisive prefix failure

A separate [BGE passage reranker](https://huggingface.co/BAAI/bge-reranker-base)
was tested using the [publisher's ONNX conversion](https://huggingface.co/Xenova/bge-reranker-base)
at revision `280bcc27a84e0b898c251e06fddb25171bd9b101`. Its quantized artifact
matches the publisher's 279,301,077-byte size and SHA-256:
`dd98f3e67837d23210a6b7550c08cced4f61845b940ac45be3565840a10f3244`.
Local inference had outbound network access denied. Two exact tokenizer-pair
checks, model input/output shape checks and four synthetic relevance-order
checks passed. These do not constitute an independent numerical reference.

The fixed candidate pool contains thirty semantic nominations, with native
exact/close lexical priority and four raw-logit thresholds: -2, 0, 2 and 4.
Passages include the title, bottom line, editor summary and stable core, not
incidental misconception tags or private editorial state.

The retained ten-question prefix contains seven covered questions and three
partial/gap questions. It reaches only two covered hits at threshold -2 and
one at each other threshold. Even perfect results on the remaining 35 covered
questions could therefore reach only 37 or 36 of 42, below the
predeclared minimum of 38. Only the verified owned evaluator process was
stopped, rather than spending resources on an already impossible acceptance.
The retained prefix records 308 inference calls, no passage truncation and
approximately five minutes of execution. This is not a completed 210-row
study: no result is claimed for its unretained remainder or outside controls.
The larger reproducible model is removable after retaining its exact provenance
and rejection evidence.

All three approaches remain unshipped. Their specifications and failure records
are retained without post-score relabeling or a new favorable denominator.
None opened or scored the frozen external question set, changed reviewed
content, established reader comprehension or performed public publication.

## Narrow wording correction, not usefulness acceptance

The earlier v1.38.16 application increment expands common contractions before
tokenization while retaining negation, recognizes grouped integer digits,
corrects selected regular plural and doubled-letter stems, and prevents numeric
values from being changed by spelling tolerance. Exact-title comparison,
unknown-subject coverage requirements, personal-treatment guards and public-only
index fields remain intact. Ambiguous `ches` endings retain the existing behavior
so that roots such as `cache` are not damaged by the plural correction.

Seven synthetic regression tests cover these cases. All 100 older covered
questions and all 1,001 source titles retain their expected destinations; all
62 declared outside controls and six partial/gap controls remain empty. However,
the exposed unfamiliar covered result remains only four of 42. These concrete
wording fixes do not establish the 90% unfamiliar-question goal, fresh reader
comprehension, public availability of the prepared additions or completed
production publication.

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
