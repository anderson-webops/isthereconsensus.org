# Security and runtime audit, September 22, 2026

## Scope and boundary

This source audit covered authentication, session revocation, administrator status, expert application promotion and demotion, protected diagnostics, request and provider bounds, health/readiness behavior, dependency integrity, native Linux packages, direct systemd deployment, rollback, and long-running process memory. It did not mutate production, DNS, Nginx, certificates, credentials, MongoDB records, or external provider state.

The review treated users, experts, administrators, browser input, upstream HTTP responses, package tarballs, release archives, and concurrent requests as separate trust boundaries. Existing tests and source were inspected before changes. A Daybreak Deep Security worker was also requested, but the available parent task did not provide the managed read-only filesystem permission profile that the scanner requires. No Daybreak result was produced, and that limitation is not recorded as a passing scan.

## Confirmed findings and remediation

1. Concurrent stale account and expert-review documents could overwrite a newer privilege decision. User, administrator, and expert-application schemas now use Mongoose optimistic concurrency. Tests require these guards.
2. Expert reapplication used an atomic application update that bypassed document-version checks and happened before existing expert access was revoked. Reapplication now saves the user demotion and session-version revocation first, then saves the version-checked application. Review approval continues to record the application before granting access; rejection and demotion revoke access first. Every partial failure is fail-closed.
3. Production API startup retained the large source seed catalog for the lifetime of the process. Production seeding now runs through a compiled one-shot entrypoint before the API starts and disconnects afterward. Development retains automatic insert-only seeding. Synchronizing existing editorial content remains explicit and backup-protected.
4. Releases were built correctly but did not prove that the exact copied production tree was complete. The release workflow now creates an immutable runtime artifact with independently checked required paths, complete file and symlink inventory, modes, sizes, hashes, native bindings, source identity, and no writable release paths. The artifact is copied outside the checkout and exercised without source or development dependencies. A missing-module regression proves verification fails closed.
5. Frontend `HEAD /healthz` and `HEAD /readyz` returned 204 under the built Nitro runtime. Explicit bodyless handlers now return 200. Both GET endpoints return only `{ "ok": true }`; all probe responses use `Cache-Control: no-store` and set no cookies.
6. Public deployment metadata exposed the process environment class, and the protected setup prompt described stale service names, a public diagnostics path, and placeholder credentials. The environment field was removed, the prompt now matches the reviewed artifact-only services, and it requires missing protected values to block rather than be fabricated.
7. The dependency graph contained a vulnerable transitive `devalue`, stale compatible direct packages, and an invalid shallow-workspace `cac` peer classification. The graph is updated, `devalue` is constrained to the patched release, `@bomb.sh/tab` is constrained to its compatible peer-fixed patch, unused direct packages are removed, and Linux ARM64 glibc/musl native packages are exact and simulated from clean installs.
8. Long-running Node units had no resource accounting. The API, web, and bounded source-integrity units now declare memory accounting, soft and hard memory limits, and task limits. These are ceilings, not a substitute for measuring the deployed working set.
9. Dependabot could create a large review backlog. npm updates are limited to two open grouped proposals and Actions to one. The normal repository policy remains direct validated delivery; any automation-created proposal must be reviewed, merged when safe, and its branch removed.

## Controls revalidated without a new finding

- Production cookies remain `__Host-`, secure, HTTP-only, path-scoped, and same-site unless explicitly configured for a separately reviewed cross-site deployment.
- Unsafe authenticated requests require an allowed origin or same-site browser context; exact HTTPS origins and exact trusted proxy addresses are required in production.
- Ambiguous user/admin sessions, stale session versions, disabled administrators, weak or reused production secrets, public listeners, incomplete Vault configuration, missing production captcha configuration, and unauthorized diagnostics all fail closed.
- Administrator sessions remain capped at eight hours. Email and password changes require the current password and revoke older sessions. Disabling an administrator revokes sessions and cannot leave the system with no enabled administrator.
- Editorial publication, archival, restoration, evidence decisions, expert review, and moderation remain explicit role-gated state transitions with bounded rationale fields and separated public/private records.
- Request bodies, search routes, rate limits, source-monitor batches, upstream response sizes, retry intervals, and provider deadlines remain bounded.
- Production remains direct systemd/Nginx deployment with loopback listeners, hardened service units, exact readiness and public source-identity acceptance, atomic promotion, and retained rollback. No production container contract was added.

## Verification record

The reviewed source passed the repository-pinned Node 24.18.1/npm 12.0.2 clean install, install-script policy, complete dependency-tree validation, Linux native lock validation, Linux ARM64 glibc and musl install simulations, lint, type checks, 356 frontend tests, 285 backend tests, production builds, backend runtime loading, SSR asset and route checks, 218 both-theme accessibility checks, isolated artifact verification and smoke tests, and full/production vulnerability audits. All registry packages had verified signatures; available attestations were also reported by npm.

CI additionally supplies a synthetic MongoDB instance so the copied artifact can exercise the one-shot seed process plus dependency-ready API health, readiness, and graceful shutdown without real credentials or provider messages. That CI result, source push, tag, GitHub release, and any later production deployment are separate delivery stages and must be reported separately.

## Residual decisions

- Oxfmt Linux bindings remain on the compatible line required by the installed formatter graph rather than forcing an unrelated major. Node type declarations remain on Node 24, matching production. VueUse, dotenv, and TypeScript major upgrades are intentionally deferred until their consumers declare compatibility and the full suite can be reviewed again.
- The systemd memory ceilings require post-deployment observation before being tightened. A limit breach must trigger rollback or a reviewed sizing change, not disabled readiness checks.
- Daybreak analysis remains unavailable in this task because its managed read-only worker could not be created. The manual and automated source audit above is complete within the available execution boundary, but it is not represented as a Daybreak result.
