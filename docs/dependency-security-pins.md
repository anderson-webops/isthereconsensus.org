# Reviewed dependency security pins

The October 2026 editorial-preservation release was held after its exact-main
checks reported newly available dependency advisories. The fixes use narrowly
selected transitive overrides, not a forced framework downgrade or an audit
exception. Advisory applicability is not evidence that the site was exploited.

| Dependency | Reviewed version | Authoritative advisory |
| --- | --- | --- |
| `simple-git` | Upstream `4.0.2`, resolving `@simple-git/argv-parser` to `2.0.1` | [Argument parser](https://github.com/advisories/GHSA-v5rq-49vh-5v5c), [unsafe configuration guard](https://github.com/advisories/GHSA-x6jw-m9v5-85vh) |
| `katex` | `0.18.2` | [Conditional prototype-pollution gadget](https://github.com/advisories/GHSA-238p-pmpm-9mq7) |
| `source-map-js` | `1.2.2` | [Prototype pollution](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) |
| `tinypool` | `2.1.2` | [Worker options](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3), [task options](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) |
| `proxy-addr` | `2.0.8` | [Proxy trust handling](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) |

The root and standalone backend manifests both override `proxy-addr`, and both
committed locks resolve it to the same reviewed version. A root workspace
install alone is insufficient: runtime artifacts install from the standalone
backend lock, which previously retained `2.0.7` while the root used `2.0.8`.

`back-end/test/dependency-security-pins.test.ts` checks every locked occurrence
of the affected toolchain packages against its override, plus root/standalone
proxy parity. Fresh audits remain necessary because those checks establish
install consistency, not freedom from future advisories. Existing native
binary pins and install-script approvals are unchanged.

Nuxt DevTools `3.4.2` still imports a default Git factory. Upstream `simple-git`
`4.0.2` exports only named factories, which caused the first clean install to
fail during `nuxt prepare`. `vendor/simple-git` supplies that legacy ESM default
and callable CommonJS export while forwarding the actual implementation to the
ordinary registry dependency `simple-git` at exactly `4.0.2`. The adapter has its
own package name, `simple-git-compat`, to avoid importing itself. The root
explicitly installs it. The override uses that file dependency
for consumers and an explicit nested exception for the adapter's real upstream
dependency. It does not copy Git internals,
change configuration, enable unsafe operations or weaken upstream guards.
The regression test verifies the underlying parser and implementation locks,
both import styles and read-only repository/status operations. This keeps the
stable DevTools line without introducing its beta replacement. Remove the
adapter when stable DevTools supports the upstream named exports.

The regression checks that DevTools and the frontend resolve the same adapter.
It also rejects incomplete or noncanonical Git lock entries. npm's generated
nonexistent transitive-link placeholders are removed; consumers resolve the
root's canonical adapter instead. The committed graph must pass a fresh root
`npm ci` and the install-policy check without any install fallback.
An npm alias was rejected by the package manager's remote-fetch safeguard, so
the final adapter uses an ordinary registry dependency instead. No remote-fetch
or install-script protection is relaxed.

Before delivery, run root `npm ci`, install-policy/native-lock verification,
lint, typecheck, all tests, the full build, compiled runtime and SSR checks.
Audit both root and standalone backend installs with and without development
dependencies. Hosted verification additionally checks signatures, Linux ARM64
installs, accessibility, runtime-artifact installation and the complete
authenticated editorial rehearsal. Check the exact merged commit as well as
the pull-request head before cutting the source release.

These dependency changes require no content migration and do not authorize
production deployment, editorial publication or automatic rewriting of stored
reviews. Release and publication evidence must remain separate.
