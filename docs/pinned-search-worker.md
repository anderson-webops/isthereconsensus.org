# Pinned, independent search worker

This is an optional source implementation, not an activated public feature.
Keep the API's `SEARCH_WORKER_SOCKET` unset until every machine-readable
`search-worker/deployment-contract.json` requirement passes. The API remains
independently usable with native search, its existing 384 MiB soft and 512 MiB
hard reference limits, and its unchanged eight-second transport ceiling.
No model library or inference child belongs in the API's dependency tree or
service cgroup. A source release never grants production administrative access.

## Immutable inference inputs

`search-worker/models.lock.json` pins seven complete files by size and SHA-256,
two repository revisions and the exact tokenizer, inference and language runtimes.
Provision public assets outside the running service, verify them, and retain
their provenance. Runtime downloads are forbidden; the child disables `fetch`.
Native optional-package installation never authorizes installer downloads:
ONNX Runtime's optional CUDA installer and protobuf's version-warning installer
are explicitly denied. Root clean installs and the standalone runtime lock
remain strict. The backend standalone lock and policy are unchanged.

- Nomination: `Xenova/bge-small-en-v1.5`, revision
  `ea104dacec62c0de699686887e3f920caeb4f3e3`,
  `onnx/model_quantized.onnx`, through the accepted single-thread WASM backend.
- Paired relevance: `Alibaba-NLP/gte-reranker-modernbert-base`, revision
  `f7481e6055501a30fb19d090657df9ec1f79ab2c`, `onnx/model.onnx`, FP32 CPU,
  two intra-operation threads and one inter-operation thread.

Every nonempty actual bottom-line, editor-summary and stable-core paragraph is
represented in full with its title, in source-field order. Misconceptions do not
become affirmative evidence. Oversized complete paragraphs fail warming rather
than being truncated. Query inputs, paired special tokens, masks, right padding,
CLS pooling and normalization preserve the declared reference.

The port preserves the original parent nomination, admission and five-semantic
result ceiling before corrected V4 source-scope filtering. It then assembles
corrected native results with the original channel diversity and demand coefficient.
No expected destinations, benchmark strata, question identifiers or scientific
status labels enter model features. Scores indicate retrieval relevance, not
scientific confidence or a generated answer.

## Request and process lifetime

The transport accepts only a normalized private Unix socket under a protected
directory. It never creates a TCP listener, replaces an existing socket-path file
or reads application credentials. Socket mode is 0660; the server owns user,
group and directory policy. Headers, account state and private editorial fields
are not forwarded. The strict protocol rejects extra fields, draft rows,
unsorted or duplicate slugs and incorrect corpus/query/date fingerprints.

`/healthz` means transport liveness. `/readyz` stays unavailable until the complete
public corpus warms. A cold request starts public-only warming and immediately
falls back; its query is not sent to the model child. The memory-only cache holds
at most 20,000 complete public passage vectors and is invalidated on corpus change.
The worker admits one active query, never an unbounded queue. The inference child
has a 512 MiB JavaScript heap ceiling, but native model memory is additional:
this heap setting is not a service-memory budget or an acceptance result.

Cancelling active inference kills that exact owned child and waits for actual
exit before replacement. Only public vectors survive. Cancelled typing while a
replacement initializes is discarded without replay; the final settled query is
the only admitted wording. Repeated faults stop automatic retries for the same
corpus. Rank work is bounded to 7.5 seconds and cold warming to ten minutes.
Private scoring-start events carry only an internal job number and owned PID;
the public response and probes never expose them or query diagnostics.

## Build and exact-artifact checks

Use the repository's pinned Node and npm. Models must already be provisioned in
an explicitly selected directory. These commands prepare local source artifacts,
not a server deployment:

```sh
npm ci
npm run build
SEARCH_MODEL_DIR=/absolute/verified/models npm run artifact:worker:build
npm run artifact:worker:verify
npm run artifact:worker:smoke
```

The standalone production-only lock installs the six reviewed runtime packages.
The builder copies only the seven allowlisted models, compiled entrypoints and
pure transitive search helpers, with no compiler, source application, private
configuration, accounts or database. Its archive receipt binds archive, manifest,
content inventory and source identity. The independent verifier checks entrypoints,
native addon and shared library outside the archive inventory, exact model pins,
deployment contract, complete hashes, permissions and dependency presence.
`SEARCH_WORKER_REQUIRE_CLEAN=true` and `SEARCH_WORKER_EXPECT_COMMIT` enforce clean,
exact source identity when verifying a release artifact. Dirty local rehearsals
are not production artifacts.

The exact-unpacked smoke starts the production entrypoint without development
dependencies or provider access. It checks cold readiness, synthetic ranking,
graceful shutdown, a deliberately missing runtime module and restored artifact
integrity. No synthetic review becomes production content. Linux ARM64 glibc
cross-install checks verify genuine ELF addon/shared-library presence; they do
not run native inference or establish capacity. Musl remains covered for the
existing frontend install, not accepted as a model-service target.

## Evidence and remaining gates

The October 8 source port matches all 5,164 complete reference passages, 210
saved admitted predictions, 1,001 title priorities and the original scope/grammar
preparation controls. This is parity evidence, not a fresh quality evaluation.
The actual pinned runtime matches all 1,519 complete paired input IDs/masks and
255 padded batches. Three independent publisher FP32 examples and fifteen
single-versus-batched comparisons meet their unchanged numerical bounds.

A real macOS ARM64 child warmed 1,001 prepared fixture reviews and 5,164 complete
paragraphs in approximately 300 seconds. A real native batch was cancelled and
the child reaped in approximately 100 milliseconds; recovery from public vectors
took approximately 3.5 seconds. These are local observations, not Linux ARM64,
deployed latency, visitor success or a guarantee of a particular memory budget.
The first actual-route rehearsal was rejected: its disposable fixture omitted
explicit canonical slugs, changed the corpus fingerprint and exercised safe
native fallback. It also reached the existing suggestion rate limit. Retain that
failure; repair the fixture, verify corpus identity and pace real requests rather
than weakening validation or rate limits.

The original 210 development rows, eight scope controls and all 1,001 title
controls have now completed through the final local service and both actual APIs
on v1.38.26. The six actual browser typing cases also pass. See the
[final-source service acceptance](search-service-acceptance-2026-10-09.md) for
complete denominators, unchanged input identities and cleanup evidence.
The previously sealed seventy-two-question set is now exposed development
material with no covered denominator. It cannot certify fresh usefulness.
Only then assess a separately frozen, genuinely unfamiliar and adequately covered
everyday-question set, independently classified before scoring, with real human
comprehension measured separately. Native Linux ARM64 numerical,
capacity, whole-service latency and real typing checks, host-approved memory/CPU
allocation, and retained-artifact activation/rollback rehearsal are still mandatory.
The worker contract does not invent a host user, port, model directory or budget.
Protected server automation owns installation, activation and rollback.

The [complete exposed model regression assessment](search-model-regression-2026-10-08.md)
records the subsequent ranking/scope correction, all three immutable development
sets and the final functional-source compatibility boundary. Its original study
and structural proof remain distinct from the subsequent final-release full
local controls. Neither assessment establishes activation acceptance.

### Explicit actual-surface acceptance harness

The homepage, directory and Ask inputs share a 250 ms quiet-period policy.
Continuous typing no longer forces an intermediate lookup every 600 ms. The
directory now passes one owned abort signal to every pagination fetch and
cancels immediately on changed intent or page disposal, like the suggestion
surfaces. Returning to the same previously requested wording explicitly retries
the cancelled directory request instead of leaving its unchanged data key stuck.
Client debounce alone does not prove that a deployed reverse proxy propagates
an abort to the model process.

After building the three workspaces, `scripts/pinned-search-acceptance.mjs`
tests the complete 1,001-review prepared fixture library through the compiled
backend and both public search APIs. Select an already provisioned, verified
model directory, installed native MongoDB and installed browser explicitly.
The private evidence directory must be a new run inside this repository's
`.ai-work/runs/`; symlink parents and reuse of an existing run are refused:

```sh
SEARCH_GATE_MODEL_DIR=/absolute/verified/models \
SEARCH_GATE_OUTPUT_DIR="$PWD/.ai-work/runs/pinned-search-acceptance" \
SEARCH_GATE_MONGOD=/absolute/path/to/mongod \
PUPPETEER_EXECUTABLE_PATH=/absolute/path/to/installed/browser \
node scripts/pinned-search-acceptance.mjs
```

The harness creates its own fresh loopback database and private socket, never
uses an existing database URI, and never logs generated session credentials.
Models are verified before use; no model or browser is downloaded. An optional
`SEARCH_GATE_CHILD_NETWORK_GUARD` executable can deny model-child networking at
the operating-system boundary. It is invoked directly with the selected Node
executable and its arguments, not through an interpolated shell command.

All 1,001 canonical titles must place their own review first on **both** actual
APIs. Exact titles intentionally retain the production native-search shortcut;
these checks do not imply that every title runs neural inference. The original
eight scope queries and expected ordering are also checked on both APIs. Their
three synthetic titles are repeated verbatim in the minimum searchable review
fields, with separately declared readiness dates, synthetic evidence summaries
and `example.test` references. This explicit actual-API fixture adaptation does
not replace the unchanged title-only model-child controls or scientific review.

The complete library is warmed before browser testing. The built frontend sits
behind a real local, abort-propagating reverse proxy. Directory, Ask and the
additional homepage search each start
genuine native inference, cancel it by typing eight prefixes at both 35 ms and
100 ms intervals, verify actual owned-child exit, and check that only the
final settled query is forwarded and displays the expected review. These are
explicit automated typing cadences, not measured reader comprehension or
real-world typing distributions. A local proxy test does not verify the deployed
proxy or establish native Linux ARM64 performance.

The original `coffee stopped working` query remains a displayed-answer control.
It correctly takes a native-priority path without a GTE batch, so it cannot prove
interruption of that batch. The inference-cancellation probe is the already
exposed development question `My afternoon cuppa no longer perks me up. Do people
get used to it?`, with the unchanged caffeine-review destination. Its final
native reply must complete in the replacement process; a correct fallback alone
does not count as that inference check. This fixture correction changes no
ranking threshold, original scope/title control or usefulness denominator.

Suggestion requests are paced below the existing 30-per-minute limit; other
limits are unchanged. Any failed case stops the gate and retains its exact
prefix as incomplete. The run is bounded to 75 minutes. `SIGINT`, `SIGTERM` and
deadline expiry abort the run rather than turning a partial prefix into a pass.
The private ownership ledger records only typed process identities, phase and
scratch location. Cleanup attempts each owned resource even if another step
fails, and scratch is removed only after every owned process exits. A final pass
requires successful cleanup; unique success/failure evidence remains in the
selected private output directory. A forced external kill can still prevent
cleanup; inspect the ledger and physical process state before removing scratch
or starting a replacement run.
No fixture count is public publication, no original control is fresh evaluation,
and the harness never opens the sealed fresh question set.

After a complete actual title gate succeeds but a later browser step fails,
`SEARCH_GATE_PRIOR_TITLES` may point to that private run directory and
`SEARCH_GATE_PRIOR_RUNTIME_PROOF` to its private frozen source-input receipt.
Both are required. Every original slug and first result on both routes is
rechecked against the retained actual HTTP rows. API/worker source, compiled
entrypoints, pipeline, locks and install policy must be unchanged, and the
rewarmed corpus must match. Incomplete prefixes cannot be reused. The original
failed whole-run result stays failed; new receipts explicitly separate reused
actual title observations from new scope and browser requests. This is not a
cached prediction replay or a fresh-question evaluation.

The 201 source-prepared reviews and guides still require their separate protected
publication workflow. No inference implementation, fixture count or source release
is evidence that they are public, and none changes the whole-library quantity gate.

### Completed October 8 local acceptance

All 2,002 actual HTTP title observations placed the canonical review first on
both APIs. The eight original scope controls passed on each API with the declared
fixture scaffolding. The complete corpus fingerprint was
`8daaf2280cc582f4e0d2756f0c6e338290a0dfd6a17ca8a7be8785632a5e76fa`.
Two browser attempts retained their failure because the original coffee control
did not start a GTE batch. The completed follow-up reused only the verified full
title component against unchanged backend, worker and corpus inputs, and made
new actual scope and browser requests. Neither failed whole-run was relabeled.

All six real browser cases passed: three surfaces at both declared cadences,
eight prefixes with zero prefix forwards, exact cancelled-child exit, one final
settled-query forward and a completed native reply from the replacement process.
Observed local recovery was 3.48 to 4.22 seconds. Each case retained the original
coffee displayed-answer control. Real-process signal interruption also produced
an incomplete, nonzero result with successful cleanup. All owned acceptance
processes exited and their synthetic databases and scratch were removed.
These checks do not open the fresh questions, measure comprehension, accept a
Linux host, prove deployed proxy cancellation, or publish prepared reviews.
