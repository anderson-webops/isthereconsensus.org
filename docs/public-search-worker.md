# Isolated public-search transport

The optional transport now has a separately compiled, pinned model service in
`search-worker/`. It remains disabled by default. Shipping its source or building
its artifact is not search-quality acceptance, native host acceptance, model
installation or production activation. See [the service runbook](pinned-search-worker.md).

The API's reference service keeps its existing 384 MiB soft and 512 MiB hard
memory limits. The full-precision development model alone exceeds the hard
limit. Do not import an inference runtime into the API, spawn an inference
child inside its service, or raise that limit to accommodate the prototype.
A separately bounded service still needs capacity, latency, native-platform,
numerical-reference and complete search-quality acceptance before activation.

## Default and optional behavior

Leave `SEARCH_WORKER_SOCKET` unset. Both `/api/claims?q=...` and
`/api/search/suggestions?q=...` retain the actual native search by default.
An explicitly configured, normalized absolute `.sock` path selects the private
Unix-socket transport. No HTTP/TCP URL or remote inference endpoint is accepted.
This setting remains reserved for isolated testing until the complete acceptance
contract passes. No deployment unit enables it in this milestone.

Queries keep their bounded original casing. Native normalization is unchanged.
Exact-title matches remain native without contacting the worker. Individual
requests to change prescribed treatment retain the existing refusal boundary.
One active request is shared across the two search surfaces; concurrent readers
use native search instead of joining a queue. Requests are limited to 4 MiB,
responses to 512 KiB, and transport time to eight seconds. An absent, warming,
disconnected, malformed, stale or timed-out worker falls back to native results.

Reader disconnection or cancellation closes that request's private socket and
releases the shared transport slot. It does not return an obsolete prediction,
run a fallback for a departed reader, or cancel another reader's request.
Normal completion of an incoming GET request is not treated as cancellation.
If cancellation arrives during an already-running publication check, the
transport slot is released without waiting for that check. The underlying
database operation may finish independently, but its result or failure is
discarded and cannot unlock a later reader's RPC. Request lifecycle listeners
are removed on every route exit. The separate service kills and reaps only its
owned inference child on cancellation and retains bounded public passage vectors.
Queries are never retained for replay. Unit typing checks and an actual native
in-flight cancellation rehearsal are separate evidence from public latency or
native Linux ARM64 capacity; API transport cancellation alone is not sufficient.

## Public-state and privacy boundary

Only currently published reviews passing the existing public-readiness and
source-stack checks enter the request. The allowlist contains title, slug,
topic slug, published status, bottom line, editor summary, stable-core bullets,
public misconceptions and misconception tags. Drafts, private submissions,
editorial notes, account fields, cookies, authorization headers and request
identifiers are not forwarded. Reader queries are not durably cached or logged
by the transport. Complete allowed text is sent without silent truncation; an
oversized corpus keeps native search.

The versioned response contains only ranked slugs, row kinds and bounded
retrieval diagnostics. It must match the exact corpus hash, original query
hash, reference timestamp and candidate identifier. Unknown or duplicate slugs,
extra fields, invalid scores and falsely claimed native results reject the
whole response. Ranking diagnostics are not scientific confidence percentages.

After every non-cancelled worker attempt, including a failed attempt, the API rechecks the
current published corpus and source readiness. Changed wording, withdrawals
and invalidated source stacks reject the old prediction. Results are hydrated
from current public database objects, never worker-supplied article text.
If current publication state cannot be verified, the API returns a safe 503
instead of stale content or a misleading successful empty search.

## Verification and remaining acceptance

The backend unit suite tests protocol, privacy, membership, freshness, bounds,
concurrency and native fallback using synthetic local peers. After a normal
build, run `node scripts/public-search-worker-smoke.mjs`. This owns a new random
database with a schema-validated canonical fixture and a temporary private socket;
it starts the compiled API in production mode only on disposable loopback
services and never reads an existing environment file or remote database URI.
CI may supply `SEARCH_WORKER_SMOKE_MONGO_PORT` for its disposable loopback MongoDB
service. Ownership is checked before application startup; cleanup drops only
that exact database and stops only the harness's children.

The smoke exercises both compiled API routes, private and unready records,
withdrawal, changed public wording, invalidated sources, stale responses,
reader cancellation and shared concurrency. Its simulated rankings prove transport integration only,
not answer relevance, comprehension or a publicly deployed improvement.

Before real activation, retain the frozen development gates, run the complete
model through both actual surfaces, and perform the separately preclassified
fresh-question and comprehension evaluation. Keep the existing protected
publication workflow for the 201 prepared reviews separate from source delivery.
