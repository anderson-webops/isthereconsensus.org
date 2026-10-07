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

## Causal-language reranker: stopped at numerical preflight

On October 7, a separate study at source commit
`efa0aef05e7a3546373c1cbeeecdf163ce8cdbf2` tested the
[Qwen3 0.6B reranker](https://huggingface.co/Qwen/Qwen3-Reranker-0.6B/blob/e61197ed45024b0ed8a2d74b80b4d909f1255473/README.md)
using the [publisher's pinned int8 ONNX conversion](https://huggingface.co/onnx-community/Qwen3-Reranker-0.6B-ONNX/tree/9995c50e2310679108a55f5ccd16ba8be9f17c20).
Its 1,219,344,796-byte artifact matches the published SHA-256
`c9428382bb48bb31e01a6034647c86d6270761781735cafbf6d5cb4a396d0450`.
Original and converted tokenizer bytes also match. Inference used audited
ONNX Runtime 1.30.0, two CPU threads and an explicit network-denied sandbox.

The specification was fixed before inference, with raw-logit absolute tolerance
0.5 and probability absolute tolerance 0.03. Two original publisher examples
produce these results using the retained original chat template:

| Reference example | Published logit difference | Observed difference | Absolute difference |
| --- | --- | --- | --- |
| Relevant capital-city passage | 7.625 | 5.566754 | 2.058246 |
| Unrelated gravity passage | -11.375 | -11.958987 | 0.583987 |

Both probability differences are small and pass their separate bound, but both
raw-logit differences fail. The run stops after two inference calls: zero
development or fresh questions and zero synthetic relevance controls are scored.
No prompt, precision or tolerance retry is performed. The original structured
scope failure also remains unchanged, not converted into a pass.

This is a failure of the declared numerical acceptance check, not evidence that
this model is generally inaccurate or that it fails the site's question benchmark.
Rounded publisher examples are not a full independent numerical reference suite;
quantization, runtime and formatting differences are not isolated by these two
observations. The lightweight prompt renderer was not independently compared
with the publisher's template/tokenizer library, so matched reference inputs
are not established merely by matching template and tokenizer file bytes.
No search implementation or application dependency changes result.
The verified large model and private runtime are disposable after retaining
their provenance, original failure and reproducible specification. The frozen
72-question input remains unopened and unscored. Fresh public usefulness and
the complete expansion goal remain unfinished.

## Independent reference-input diagnosis

A separate October 7 input-only diagnostic at source commit
`6256ae439f52f7e6fd0e21db63451a924f3ee7e2` compares the actual publisher
template through Transformers 5.19.0, Tokenizers 0.23.2 and Jinja 3.1.6 against
the retained original renderer and `@huggingface/tokenizers` 0.2.0. All twelve
fixed publisher/synthetic fixtures remain present, including contractions,
composed/decomposed accents, non-Latin text, emoji, literal template markers,
multiline text and trailing whitespace. Execution is explicitly network-denied;
no model weights, inference, development relevance controls or fresh questions
are involved. The diagnostic specification SHA-256 is
`0d56e22384a91c965a55fae8a11433d1a49e9b2a217ce4170149bee9833125c7`;
the fixture SHA-256 is
`452c15cd32bcad07e8eec0c36f60d80ef8d8c25545dcf676119abe8de1488c30`.

The original renderer matches zero of twelve official prompts by bytes or token
IDs. In contrast, both tokenizer implementations produce identical IDs for all
twelve cases when given the identical official rendered text. Three specific
input-handling problems are observed:

- The official Jinja environment has `keep_trailing_newline=False`, producing
  two final newlines. The manual renderer retains three, changing the final
  input tokens even in both publisher examples.
- Sequential placeholder replacements consume a placeholder appearing inside
  query data. Its remaining-brace assertion also rejects legitimate literal
  template-marker text rather than merely detecting unresolved template syntax.
- The publisher tokenizer declares NFC normalization. Both implementations
  normalize the decomposed-accent fixture identically, so an exact decode-to-raw
  assertion rejects valid input even in the official library. Eleven other
  fixtures round-trip exactly; this observation is retained, not discarded.

A separately declared static-template correction removes exactly one final
newline from the verified template, never from query/document data, and replaces
its three placeholders in one callback pass. This is not a general Jinja engine.
It matches all twelve official prompts byte-for-byte and all twelve token-ID
sequences; every decoded result also matches the official decoder, including its
NFC-normalized result. The correction specification SHA-256 is
`b83d2fabc1c49d0daf9e75c05460594efa7ff5c41a328ac56a8cd6574b80a03c`;
the retained corrected comparison SHA-256 is
`e31358eea819445d3d91af41a316d1a112f8736f3dcc237a40a7caad6ce1bcea`.

The private reference runtime is hash-locked and has no Torch, TensorFlow or
Flax. Thirty pinned-package PyPI metadata lookups disclose no advisories, with
zero lookup failures. This is not a successful OSV scan: guarded OSV and Ruff
commands stop on installed-version drift, and their original failures remain
retained. No guarded-tool version policy is bypassed or changed.

The original numerical specification, scorer and failed result remain unchanged.
No model inference is retried and no tolerance is loosened. These observations
establish a concrete input mismatch and a bounded fixture-level correction,
not its contribution to the earlier numerical differences, historical publisher
environment parity, general model quality or passing search usefulness. No
application search, dependency, content or production changes result. Fresh
public usefulness and the complete expansion goal remain unfinished.

## Bounded retrieval fallback and cache-runtime diagnosis

A subsequent October 7 study at source commit
`38af697be0dd4eaee92eb7f1ebe9a928bae9252e` replaces repeated large paired-model
scoring with the retained pinned BGE `full.cls` retrieval vectors. Native
exact/close ranking stays first, with at most five semantic fallback results
from thirty nominations above a fixed cosine floor of 0.65. Cosine is retrieval
similarity, never scientific confidence. Reliable subject/outcome frames require
both roles in a single public source clause. Positive questions do not require
affirmative answers; public misconceptions provide retrieval context, not
affirmative source-role evidence. Operational filters distinguish personal
decisions and service requests from population-level evidence and cost questions.

Before ranking, the actual JavaScript tokenizer matches the retained encoder's
IDs for 2,213 bounded inputs: 2,002 source short/full passages, all 210
development questions, three synthetic titles and eight synthetic questions.
This extends the earlier bounded input comparison; it is not an independent
publisher-tokenizer or whole-model numerical reference.

The initial native-CPU runtime is rejected before any benchmark predictions.
One of three cached query vectors differs by approximately 0.000108434 per
normalized CLS component, exceeding the declared absolute bound of 0.00001;
the other two comparisons pass. Its original specification, program and failed
result remain intact. A separately declared same-backend check uses the exact
WASM runtime that produced both caches. All three vectors then reproduce exactly
at the unchanged bound. This does not make the failed cross-backend comparison
pass or establish historical publisher parity.

The first same-backend scope trial passes seven of eight controls and stops
before development scoring: its POS reliability check treats a numeric subject
as unparsed and loses the numeric qualifier. A separately declared conformance
correction requires exact normalized numeric terms independently of parsing.
The original seven-of-eight result remains rejected; no threshold, tolerance,
question or destination changes. The corrected trial passes all eight controls
and all 1,001 canonical first-title priorities, then completes all 210 rows:

| Stratum | Questions | Canonical top-three matches | Questions returning results |
| --- | --- | --- | --- |
| Original covered | 42 | 36 | 37 |
| Original partial or gap | 6 | Not counted as covered | 5 |
| Original outside | 12 | Not applicable | 1 |
| Legacy covered | 100 | 96 | 96 |
| Legacy outside | 20 | Not applicable | 6 |
| Additional outside | 30 | Not applicable | 6 |

The method is rejected, independently failing original coverage, legacy
regressions and thirteen outside controls. Unparsed relationships still permit
irrelevant matches, including an unsupported cross-topic relationship and a
personal-treatment question without explicit prescription wording. A noun-phrase
POS check is not complete relationship parsing or coverage proof.

A separate current native-source control retains 100 of 100 legacy matches,
all 1,001 title priorities and empty results for all 62 outside controls, but
only four of 42 original covered matches. All four lost legacy answers were
valid native `related` explanation/body matches. Preserving only exact/close
results therefore does not preserve the actual native compatibility contract;
a subsequent architecture must retain these public explanation matches too.

The corrected study makes fourteen encoder calls and takes approximately 2.39
seconds, using precomputed document and development-query vectors. This is not
fresh-query latency, an end-to-end runtime benchmark or a deployment acceptance.
Its specification SHA-256 is
`74dbb2a54265799759e9b684ec9903b0b4d0ec356814ac9bdc4e5edf580fc894`,
and its complete result SHA-256 is
`16d5a2abd284437eef1f0f48ce8aa41ad6751e7e5971e43c488c000becf7908b`.
No application, dependency, reviewed-content or production change results.
The seventy-two-question fresh file remains sealed and unscored; neither study
finishes the fresh usefulness or independently understandable-answer requirement.

## Paired encoder relevance and literal source-scope checks

A separately declared October 7 study at source commit
`6a09557f85deb4459d3559893b75f0e3faed856e` tests the publisher-pinned
[ModernBERT relevance reranker](https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base/tree/f7481e6055501a30fb19d090657df9ec1f79ab2c).
Its FP32 ONNX artifact has 598,803,940 bytes and SHA-256
`c6d3226502addbcd4d2cf273802957ebf8a2a6bf94037dcb9b1d95bfc01e5d93`.
All five retained configuration/tokenizer/model-card files also match their
publisher Git blob identities. The private ONNX Runtime 1.30.0 installation has
zero npm audit findings and sixteen verified registry signatures. This is a
different architecture, not a prompt, precision or tolerance retry of the failed
causal-language study.

The official paired AutoTokenizer API and independent JavaScript tokenizer match
all input IDs and attention-mask elements in fifteen fixed fixtures: the twelve
unchanged public/synthetic input cases plus three publisher examples. Three
publisher FP32 raw logits also match within their predeclared absolute bound of
0.01; the largest observed difference is approximately 0.00000143. All three
separate probability bounds pass. These three examples are not a full numerical
reference suite or proof of historical publisher-environment parity. The final
specification SHA-256 is
`6cfbfa19e91abf36ad641fc51d13ac319ed78bb2ff674cb49a71844dd1e577f1`.
An initially mistyped existing nomination-artifact hash was corrected before
any input comparison or model prediction. The original specification and the
explicit pre-inference transcription-correction record remain retained.

Input and numerical acceptance do not establish source-scope correctness. With
the declared 0.8 relevance threshold, the relevance-only pipeline passes five of
the eight unchanged title-only synthetic scope controls. It returns candidates
for an unsupported outcome, reversed subject/outcome roles and an unknown
subject qualifier. Sixteen relevance calls are made; zero development or fresh
questions are scored in that original stage. Its failed result SHA-256 remains
`12c3d5dee9f7c65dcc6a94fa74030c93d94b406561d89b17ddce5ac8e4146d7f`.
Neither threshold tuning nor rewritten fixtures convert this failure into a
pass. Relevance scores never represent scientific confidence.

A separate literal relational verifier is declared before predictions, with
specification SHA-256
`0d78f23e0201e4f9ae066c9052ce62d21ae87cc43702eec0c4537d1a3dc4fa86`.
It keeps subject and outcome roles separate within one actual public title or
source sentence, preserves literal qualifiers and numbers, checks a named
predicate and matches explicit negative polarity. It reuses the real native
normalization, contractions and demand boost. It does not invent aliases from
expected destinations, combine unrelated sentences or claim complete English
entailment; unparsed questions retain the original relevance-only behavior.
Replaying all eight original predictions through this layer passes all eight
controls without repeating model inference. The original five-of-eight failure
and its unchanged scorer remain separate and unaccepted.

The mandatory whole-corpus title-priority check then fails: the combined trial
preserves 999 of 1,001 canonical first results. Its operational intent filter
rejects these two genuine population/scientific questions before exact-title
matching:

| Canonical review | Trial rejection | Actual native result |
| --- | --- | --- |
| Are intensive behavioral interventions effective for children with obesity, and does dose matter? | Individual dosing | Correct canonical review first |
| Are small modular reactors already proven cheaper and faster at commercial scale? | Shopping service | Correct canonical review first |

An independent source-only comparison verifies all 1,001 first-title priorities
in the unchanged real native search, with zero model calls. Thus the regression
is in the experimental intent filter, not evidence of a new application search
bug. Matching the words `dose` with `children`, or `cheaper` alone, is too broad
to distinguish a reviewed population/economic question from an individual
decision or shopping request. A subsequent candidate must correct that general
distinction without weakening the unsupported-question gates or rewriting this
failure.

The full 210-row exposed development run completed on October 7 at
16:14:14.734 UTC and is rejected. Every original, legacy, additional-outside
and partial/gap row remains in the report, with unchanged destinations:

| Stratum | Questions | Canonical top-three matches | Questions returning results |
| --- | --- | --- | --- |
| Original covered | 42 | 32 | 34 |
| Original partial or gap | 6 | Not counted as covered | 3 |
| Original outside | 12 | Not applicable | 0 |
| Legacy covered | 100 | 81 | 81 |
| Legacy outside | 20 | Not applicable | 1 |
| Additional outside | 30 | Not applicable | 2 |

The three false positives concern business opening hours, headphones reversing
climate change, and a request to diagnose a current headache. They do not become
covered questions because a related review exists. The unchanged base pipeline
within this run reaches 36 of 42 original covered and 98 of 100 legacy covered;
these are diagnostic comparisons, not replacements for the failed scope trial
or the separately retained five-of-eight synthetic failure.

There are 5,348 actual relevance calls and 4,304 seconds of offline execution.
This is study duration, not measured deployed request latency. The completed
result SHA-256 is
`f046768139a989b2b7aacd3e05f7000d0bfc69a298eb3701938a14e5e1aeae26`.
Its
unchanged cached `full.cls` nomination field uses the original bounded BGE
encoder, capped at 510 content tokens plus two special tokens. The field name
does not mean every source paragraph was encoded. Final relevance scoring uses
the complete public title, bottom line, editor summary and every stable-core
paragraph, rejecting oversized paired inputs rather than truncating them.
The failed mandatory title gate, covered-question gates and outside controls
each independently prevent application integration. No application dependency,
search, content or production changes result. The frozen seventy-two-question
input remains unopened and unscored; the full expansion goal remains active.
