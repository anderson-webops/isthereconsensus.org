# Guarded braces fork

This local package is based on upstream `braces@3.0.3` (MIT; see `LICENSE`). It exists because upstream has not published a patched release for [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

The fork limits structural nesting in the parser and checks directly supplied ASTs before the recursive compile, expand, and stringify walkers. The root npm override makes transitive `micromatch` consumers use this fork. `scripts/test-braces-compat.mjs` checks the lockfile, the reported exhaustion patterns, direct AST entry points, and ordinary expansion behavior.

The second local patch also bounds shallow expansion to 10,000 cumulative items
and 1 MiB of generated UTF-8 text, including intermediate products and ranges
whose caller disables the ordinary range limit. Existing nesting checks and
ordinary compile, stringify and expansion behavior remain covered by regressions.
The third local patch checks descending and signed steps before generation,
keeps explicit range steps separate from limit arguments, and rejects
unsafe-integer endpoints that cannot advance reliably.
Compiled stepped ranges use the same per-pattern cumulative item and projected
byte budgets before allocation; ordinary compact, unstepped numeric regex ranges
remain supported without enumerating their members.
Range projections include original padding widths and character-range sizes
before either walker allocates their results.

Replace this fork only after upstream publishes a verified fix and the same compatibility and audit checks pass against it.
