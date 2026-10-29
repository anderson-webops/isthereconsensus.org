# Dependency acceptance

Nuxt 4.6.3 temporarily uses `unimport@7.0.1` through a version-scoped override.
The npm registry advertises provenance for 7.0.2 but its attestation endpoint
returns 404; 7.0.1 provides retrievable provenance. Nuxt's security fixes remain
at 4.6.3, and the full vulnerability and package-signature gates remain required.

The upstream 7.0.1-to-7.0.2 change fixes duplicate declaration-file class exports
and an unused TypeScript parameter. Validate the existing Nuxt auto-imports with
clean installation, typechecking, tests and the production build. Reevaluate the
scoped override when a compatible successor has verifiable registry provenance.

Build and source validation use Node 24.22.1 and npm 12.2.1. Runtime host policy
remains independent; the declared `consensus-native` Node runtime remains
24.22.1, with protected migration, rollback and activation gates preserved.

TypeScript remains on maintained 6.0.3. The current `vue-tsc@3.3.13` requires
`typescript/lib/tsc`, which TypeScript 7 no longer exports; the current
typescript-eslint integration also declares support below 6.1. Reevaluate the
compiler major when both integrations support it, preserving typechecking.

The reviewed local deepmerge fork fixes destination prototype poisoning in both
published entrypoints. Its source and compatibility contract are recorded in
`vendor/deepmerge/UPSTREAM.md`. Regressions cover hostile target/source keys,
recursive/array merges and ordinary options; an installed-consumer check proves
the Rollup resolver loads that fork. No request-controlled merge path is claimed.

Both workspace and independent backend graphs use the reviewed canonical
qs 6.17.2-webops.1 package. Regression tests
exercise hostile comma serialization and preserve ordinary serialization and
repeated, bracketed and dotted query parsing. The independent worker graph
retains its own lockfile and exact dependency declarations. Full and production
audits apply independently to the root, backend, worker-runtime and vendored graphs.

Backend typechecking covers both production source and test fixtures. Synthetic
fixtures retain runtime presence checks and explicit request boundaries rather
than weakening strict types or substituting unchecked values.

## Preserved scientific prose

The prose-style exception binds the 28 scientific data snapshots in
`scripts/lib/approved-data-prose.mjs` to exact SHA-256 digests. Only unchanged
snapshots bypass the em-dash rule; changed input, including editor or stdin
content, receives the original rule. All other lint rules remain enabled.
Snapshot changes require scientific-data review, not automatic lint repair.
These style snapshots do not grant editorial, publication or deployment approval.
