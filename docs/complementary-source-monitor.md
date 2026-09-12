# Complementary source-integrity monitoring

Crossref and Europe PMC checks observe publication metadata. They do not perform
scientific review, change conclusions, clear warnings, approve experts or alter
review schedules. Open notice snapshots feed the admin review-priority queue.
DOI sources on published or needs-update reviews are eligible; missing DOI,
non-journal and unindexed sources still require other editorial checks.

## Provider contract

Crossref queries `works?filter=updates:<DOI>` with at most 100 results and accepts
only relationships directed at the normalized target DOI. Europe PMC queries an
exact quoted DOI with `resultType=core`, up to 100 records, and verifies every
returned DOI. An empty Europe PMC result means `not_indexed`, not a successful
negative integrity check. Incomplete, malformed or over-limit results fail
explicitly rather than reporting an absence of updates.

Europe PMC incoming `Retraction in`, `Erratum in`, and `Expression of concern in`
relationships concern the queried work. Outgoing `of`/`for` links describe what a
notice affects and cannot be inverted. `Retracted Publication` is a signal on
the work itself; a retraction-notice publication type alone is not. Corrected or
retracted republication links are also incoming notices. Identity, relationships,
provider version, query URL and actual retrieval time are retained without storing
full upstream bodies. Verified, minimal API 6.9 fixtures captured September 12,
2026 are in `back-end/test/fixtures/europepmc-integrity.json` with retrieval URLs.

References:
- [Europe PMC web services](https://europepmc.org/RestfulWebService)
- [NLM correction relationships](https://dtd.nlm.nih.gov/ncbi/pubmed/doc/out/230101/el-CommentsCorrections.html)
- [Crossref post-publication updates](https://www.crossref.org/documentation/register-maintain-records/maintaining-your-metadata/registering-updates/)

## Bounds, caching and recovery

The default batch selects at most 100 sources, with two provider attempts per
source; `--limit` accepts 1–500. Use `--provider crossref`, `--provider europepmc`,
or `--provider all` (default). Validated integers are required. `--stale-days`
accepts 1–3650, defaults to 30, and applies independently to successful provider
coverage. Existing generic/imported citation dates never suppress a provider's
first attempt. DOI edits invalidate that source's provider identity.

Each HTTP request has a 12-second deadline, a 2 MiB body bound and no redirects.
HTTP failures are classified before JSON parsing, including HTML error pages.
Applying runs share an expiring 60-second database lease, renewed during the
bounded work; overlapping runs stop rather than perform competing writes.
Network requests are sequential with at least one second between requests to
each provider. A provider failure defers that provider's remaining batch while
the other can continue. Retry delay starts at 15 minutes and doubles to one day;
HTTP Retry-After (seconds or date) is honored up to one day. Cooldowns survive
process restarts. The CLI does not wait out a long cooldown. It stops starting new work after
20 minutes and reports `deadlineReached`, leaving remaining sources eligible for
the next batch; this fits within the reference service's 25-minute deadline.

Parsed observations are cached per provider, normalized DOI and parser version:
one day for successful metadata and seven days for not-indexed results. Duplicate
DOIs reuse one lookup. Cache reuse preserves the original observation time;
recording another source's application is not a new upstream check. Cached
failures preserve their cooldown. Cache records expire after 90 days without
refresh; detailed source check history expires after two years. Persistent
source warnings, notice links and review dispositions have no such TTL.

Dry runs read existing cache/cooldowns, bound and throttle their own requests,
and do not write database records. They refuse to overlap an active applying
run. Separate simultaneous dry-run processes do not reserve a shared lease;
operators should run one preview at a time. Applying runs enforce shared leases.

## Editorial and privacy boundaries

Errors, invalid DOIs and not-indexed results record attempts/retry state without
advancing successful coverage dates. Independent correction, concern and
retraction flags are retained; a stronger signal does not erase other flags.
Human integrity notes are never replaced. Actual notice links are appended in
stable order; routine query URLs stay in private check history. More than 200
persistent links on a source fails with `notice_capacity_requires_review` and
retains existing data instead of silently dropping notices.

The monitor reloads after upstream requests and uses a conditional source update
to avoid overwriting concurrent edits. Changed DOI/deleted sources are skipped;
a race at application is recorded as unapplied. Database/write errors abort the
run rather than being mislabeled as provider errors. A new notice changes the
review queue's assessed snapshot; repeating the same observation does not reopen
an addressed notice. No automatic schedule changes occur.

Provider progress and operational history are private. The admin page separates
recorded attempts, metadata retrieval, cache reuse, outcome and provider coverage.
Anonymous, ordinary and verified-expert readers cannot access it. No requests to
providers include accounts, reader feedback, authentication tokens or claim text.

## Rollout

Build and deploy source normally with `SEED_CONTENT_MODE=insert`. This feature
does not synchronize production content or refresh any of the twenty goal
articles. Preview a bounded batch, inspect it, then explicitly apply or use the
existing opt-in timer. Existing generic check dates remain unassigned to a
provider. New collections are additive; no destructive migration is required.
Keep the previous release as the source/runtime rollback point. Do not delete
new warning/provenance records when rolling back.

Run the native install/lock checks, lint, types, tests and build. The existing
reader-library smoke harness now includes provider cache/cooldown/lease recovery,
independent coverage, notice and schedule preservation, edit races, private API
pagination, persistence, authenticated browser behavior and accessibility.
Public acceptance is read-only; it never runs the monitor or creates accounts.
Release notes record exact validation and deployment evidence.
