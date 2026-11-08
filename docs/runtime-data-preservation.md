# Runtime and retained database state

Production startup serves the retained database without publishing source content,
backfilling questions, creating collections or creating indexes. The same invariant
applies to restarts and shutdown. Existing uniqueness constraints and other indexes
remain in place. Development seeding and its routing backfill remain development-only.

## Explicit data operations

Content publication is a separate owner-authorized data transition. The existing
assistant-screened publication functions retain source seals, publication journals,
human withdrawals and conflict checks. Owner editorial corrections and completion
also remain separately callable. Starting the runtime does not invoke any of them.

The existing one-shot `back-end/dist/scripts/seedContent.js` entrypoint remains
available for explicit initialization. It completes model initialization before
returning. Insert-only and explicit synchronization modes retain their prior
meaning. Its database changes belong to an initialization or migration transition,
separate from runtime acceptance.

A protected publication transition uses the exact released source and an isolated
copy of retained data, with a reviewed bounded document/schema diff. Preserve
private records, human decisions and recoverable prior data alongside the retained
runtime. Genuine prior-runtime/data recovery acceptance remains part of the
operator's existing process. The unchanged `candidate_changed_protected_data_or_schema`
check continues to protect ordinary runtime promotion.

## Regression evidence

`scripts/content-first-smoke.mjs` compares every collection's document fingerprints,
collection metadata/options and index definitions before and after production
startup and repeated restarts. It includes a legacy question without a routing
field, private data, a custom validator and an independent index. Negative controls
prove detection of document, collection, validator-option and index changes.

The same rehearsal explicitly invokes the publication functions outside startup,
then retains complete article/citation, partial-journal recovery, replay stability,
human-withdrawal and private-state checks. This preserves publication coverage
without making publication an implicit consequence of runtime health checks.

The public search-worker rehearsal also publishes its fixtures explicitly and
verifies the complete retained database before exercising production API transport.

`scripts/runtime-artifact-smoke.mjs` independently fingerprints the synthetic
database around the actual unpacked backend entrypoint, health/readiness probes
and graceful shutdown, using the packaged database driver. Fingerprints expose
hashes and counts rather than private document contents. CI supplies its isolated
database; acceptance without one remains explicitly deferred rather than passed.

The host contract, production-access boundaries and existing rollback guards are
unchanged. Source-local fixtures prove the source/runtime behavior; the protected
operator verifies the exact successor against retained production-copy state.

