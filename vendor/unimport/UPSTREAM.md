# Maintained Unimport distribution

`7.0.2+webops.1` is a locally maintained distribution of Unimport, derived from the
publisher-attested `unimport@7.0.1` archive and the authenticated upstream fix
`525ea7c5b6c39a2d1d6835f2b5ed7c4702b588a3`. It retains the original license, entrypoints, types and dependencies.

The upstream fix deduplicates declarations from `.d.ts` files when an equivalent
class or enum declaration is present in a non-declaration file. It preserves
classes and enums declared only by the declaration file. The additional unused
`id` parameter matches the upstream 7.0.2 compiled Acorn entrypoint.

The package and exported version identify this maintained distribution. Build
metadata keeps the original Nuxt `^7.0.2` API floor satisfied. Unchanged upstream
files remain byte-identical; `UPSTREAM.json` records the complete original and
maintained inventories. The original chunk path is retained for compatibility.

Publisher provenance authenticates the original 7.0.1 archive. The local patch,
packaging source and verified exact-source application build identify the maintained output.
The npm attestation for the upstream 7.0.2 archive remains unavailable; this
package makes no claim that such an attestation was obtained or repaired.

Replace this distribution when a reviewed, API-compatible upstream release has
verifiable publisher provenance and passes the same consumer regressions.
