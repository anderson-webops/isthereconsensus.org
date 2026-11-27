# Dependency acceptance

Nuxt 4.7 and the explicit-import module use the reviewed signed-source
Unimport 7.0.3 build. The gate verifies the source and compiler recipe, rebuilds
the compiler, audits both independent graphs, and checks all installed Unimport
7 consumers against the exact archive. The separate Unimport 6 consumer stays
on its compatible line.

Nuxt and Vite require different Rolldown lines. Preserve each consumer's
compatible locked Rolldown and native bindings, and keep the frontend's
strict import, component, and server checks enabled.

Build and source validation use Node 26.13.1 and npm 12.2.3. The
`consensus-native` host must admit the exact candidate runtime independently.
Retain the prior release's Node 24 runtime for its verified rollback, with
protected migration and activation gates preserved.

TypeScript remains on maintained 6.0.3. The current `vue-tsc@3.3.14` requires
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

## Vitesse Nuxt upstream integration

Review covers upstream `29c1296`, `bca9f86`, and
`a5bb2968ff3562be8d7a01921572a2021c122852` from the shared base
`a8c8345f75cc45f522c15a13e1b1b7397fd970f2`. The default branch
requires linear history.

- Apply upstream's explicit-import module and strict checks to Consensus's own
  frontend and server. Preserve the site's routes, layouts, and components
  rather than importing the template's demo pages and page-view endpoint.
- Use the reviewed workspace lock for the corresponding dependency upgrades.
  Preserve npm, strict install-script admission, and the existing site-specific
  CI. Its pinned checkout and Node setup actions already use upstream's major
  versions. Upstream's pnpm catalog and lock are specific to the template.
- Keep the enabled anti-slop rules and their existing approved-source boundary.
  The template's PWA dependencies are outside the application; keep the stable
  Nuxt DevTools metadata instead of adopting the template's prerelease.

## Preserved scientific prose

The prose-style exception binds the 28 scientific data snapshots in
`scripts/lib/approved-data-prose.mjs` to exact SHA-256 digests. Only unchanged
snapshots bypass the em-dash rule; changed input, including editor or stdin
content, receives the original rule. All other lint rules remain enabled.
Snapshot changes require scientific-data review, not automatic lint repair.
These style snapshots do not grant editorial, publication or deployment approval.
