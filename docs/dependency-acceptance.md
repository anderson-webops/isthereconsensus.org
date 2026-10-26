# Dependency acceptance

Nuxt 4.6.2 temporarily uses `unimport@7.0.1` through a version-scoped override.
The npm registry advertises provenance for 7.0.2 but its attestation endpoint
returns 404; 7.0.1 provides retrievable provenance. Nuxt's security fixes remain
at 4.6.2, and the full vulnerability and package-signature gates remain required.

The upstream 7.0.1-to-7.0.2 change fixes duplicate declaration-file class exports
and an unused TypeScript parameter. Validate the existing Nuxt auto-imports with
clean installation, typechecking, tests and the production build. Reevaluate the
scoped override when a compatible successor has verifiable registry provenance.
