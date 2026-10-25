# Runtime artifact contract

The application has separate Nuxt SSR and Express API entrypoints. Production
uses direct Node services behind the existing dual-stack edge.

## Source and artifact identity

Stable releases come from clean annotated `v1.x.y` tags on reviewed main.
The Linux ARM64/glibc build uses Node 24.18.1 and npm 12.0.2. The application
host profile is declared separately in `deploy/host-contract.json`; it retains
Node 24.22.1 and the `consensus-native` adapter boundary.

A complete immutable release contains:

- `isthereconsensus-<12-character-commit>-linux-arm64-runtime.tar.gz`
- `runtime-manifest.json`
- `acceptance.json`
- `SHA256SUMS`
- `attestation-bundle.jsonl`

The first four assets are subjects of GitHub-hosted build provenance from this
repository's `.github/workflows/ci.yml`. Verification binds their exact digests,
repository, annotated tag, source commit, workflow and signer commit.
Self-authored inventories and checksums establish integrity, not source provenance.

The external manifest equals the archive's `.runtime-manifest.json` byte for byte.
The runtime inventory includes compiled services, production dependencies, native
bindings, public assets and the host-contract marker. Credentials, databases,
sessions, content mutations and other durable state remain external.

## Acceptance boundaries

The standalone tree verifier is `scripts/verify-runtime-artifact.mjs`. Its API
uses `RUNTIME_ARTIFACT_EXPECT_COMMIT`, `RUNTIME_ARTIFACT_EXPECT_TARGET` and
`RUNTIME_ARTIFACT_REQUIRE_CLEAN`. It does not authenticate build provenance.
The packaged archive undergoes the same isolated runtime and missing-module
checks as the assembled tree.

Legacy source preparation, promotion and host installation entrypoints return
78 before inspecting candidates. The artifact-only contract remains held for
protected adapter acceptance. Existing host-owned service identities, listeners,
configuration and retained rollback controls are independent of repository defaults.
Database-aware recovery and exact-prior-runtime acceptance remain separate from
source checks and publication; database compatibility is not yet asserted.

The frontend's public API base is distinct from its private SSR API address.
`NUXT_INTERNAL_DIAGNOSTICS_KEY` remains private and is not embedded in browser assets.
