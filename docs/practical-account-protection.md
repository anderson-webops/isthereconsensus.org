# Account protection evidence

Part of the [practical evidence goal](practical-evidence-goal.md). This
implementation adds comparison eleven and five canonical reviews: **11/12
comparisons and 45/50 new reviews**. Source totals become **795 reviews,
36 topics and 16 guides**. Source counts are separate from public acceptance.

## Coverage and integration

A search of the preceding 790 canonical titles/slugs found no authentication,
passkey, phishing, password or cybersecurity review. The new Digital security
& privacy topic starts with five distinct questions: passkey phishing resistance,
one-time code relay, manager-supported reduction of reuse, synced credential
recovery and routine password expiry. They are registered as explicit gaps,
not counted again as their comparison and guide.

`/compare/account-protection` provides twelve qualitative findings across six
options and two outcomes. Passwords, managers and second factors can be
combined; they are not presented as mutually exclusive treatments. The
personal-risk and compromised-account contexts withhold findings. A four-section
guide, collection and shared discovery/library/history/private-feedback paths
connect the content. No site's authentication code, credentials or account
configuration is changed by this content work.

## Primary evidence checked September 12, 2026 UTC

- **NIST SP 800-63B-4**, DOI 10.6028/NIST.SP.800-63b-4: the final July 2025
  status was verified on its CSRC record. Password, out-of-band, OTP and
  phishing-resistance sections plus the full syncable-authenticator appendix
  were read. The guide's normative government-system scope is retained.
  Backup eligibility differs from backup state; user presence differs from
  user verification. Exportability precludes AAL3. The appendix's awkward
  replay-resistance example wording is not copied literally.
- **W3C WebAuthn Level 3**, August 25, 2026 Recommendation: status, relying-party
  identifier, credential scope, origin-validation and biometric-privacy
  passages checked. This establishes specified behavior, not conformity of
  every real product. No complete implementation or errata audit performed.
- **NCSC guidance**: current password policy, password-manager selection and
  recommended MFA-method pages checked in relevant sections. MFA guidance
  is version 2.0, reviewed September 26, 2024, with corporate-use scope.
  Its partial-phishing-resistance terminology for challenge apps is not
  silently equated with NIST's protocol definition. Password-expiry guidance
  retains its compromise exception; its categorical harm wording is not
  substituted for the more nuanced empirical findings.
- **Lyastani et al., USENIX Security 2018**: primary PDF methods, findings,
  validity limits and funding checked. The survey included 476 US MTurk
  participants; a Chrome follow-up included 170, using 2017 data. Generation
  strategy matters, but the observational association is not a causal estimate
  of reduced compromise. Historical browser or vendor findings are not adopted
  as current rankings. BMBF/CISPA support disclosed; no raw-data reanalysis.
- **Habib et al., SOUPS 2018**: primary PDF methods, results, limitations and
  funding checked. Two surveys, 695 analyzed participants in total. Self-report,
  recall and convenience-sample limits retained. It did not detect several
  feared behavior changes, but did not establish stronger replacements or
  reduced takeover rates. NATO/CyLab and fellowship support disclosed.
- **Matzen et al., Applied Sciences 2025**, DOI 10.3390/app15084414: primary
  university-hosted publisher PDF methods, findings, limits and disclosures
  checked. November 2024 search, access/language restrictions and snowballing;
  105 papers, with enterprise/university emphasis and limited longitudinal
  evidence. Flow diagram and score page were visually inspected (PDF pages
  12 and 27). The importance ratings are author judgments; the prose assigns
  usability improvement two while Table 6 and Figure 6 show three. All ratings
  and adoption percentages are withheld. No formal correction was checked to
  resolve that discrepancy; this is contextual rather than anchor evidence.
  Authors report no external funding or conflicts. Underlying papers and
  repository analyses were not independently reappraised.
- **Daffalla et al., USENIX Security 2025**: primary PDF research-account
  methods, scope, conclusions and funding checked. Nineteen services and four
  providers, including 2024 testing. This is an implementation/threat-model
  analysis, not a population harm survey. Historical findings are not asserted
  to remain unfixed. Baldwin Wisconsin Idea Grant, NSF and Google Cyber NYC
  support disclosed. No exploit reproduction or current service testing.
- **Scarlata et al., USENIX Security 2026 / ePrint 2026/058**: August 12 full
  version verified, now titled *Four Cloud-based Password Managers*, unlike
  older three-vendor coverage. Primary PDF threat model, selection and
  disclosure discussion checked. Assumes a fully malicious vault server;
  analysis depth differs across vendors and remediation is version-dependent.
  No exploit reproduction, current fix verification, prevalence estimate or
  brand ranking. Attack counts and changing market-share figures are not
  reused as a common security score.

One Consensus Pro search returned 20 records, with three fetched for discovery.
No Deep Review was used. CISA pages/PDFs were unavailable directly and are not
used as primary verified anchors. Discovery-only papers from Alsharaya and
Clarke/Furnell were not adopted without primary verification. The source
checking was targeted and AI-assisted, not an exhaustive systematic review,
formal security audit or independent expert approval. Links and source-specific
access/appraisal limits are retained in the published source records.

## Validation and delivery

Local validation passed with Node 24.18.1 / npm 12.0.2:

- Clean root installation with zero audit vulnerabilities; standalone backend
  lock/install policy and all 31 Linux native lock entries verified.
- Lint, both typechecks, both production builds and **566 tests** passed
  (344 frontend, 222 backend), without failures or skips.
- **204 accessibility route/theme checks** passed, including the new topic,
  comparison outcomes, withheld contexts, empty selection and reading guide.
- Built browser checks verified all twelve finding fields and source links,
  discovery from the topic, five reviews, guide, search and Ask, shared
  selections, reload/history, canonical URL, keyboard/reset and sitemap.
  Both themes passed at desktop and phone widths and 200% text; rendered
  desktop/mobile views were inspected.
- Isolated MongoDB and built-browser checks passed saved-content persistence,
  account isolation, substantive announcements and private reader feedback.
  Compiled backend fail-closed startup, SSR assets and route privacy passed.

The new-topic starter regression now tests the composed seed catalog rather
than parsing source text, so shared slug constants are covered. The new topic
has no invented numerical consensus score. Initial search-title and missing
starter-link failures were fixed before the final complete checks.

PR #72 passed all eight CI jobs and the secret scan, then merged at
`61f54061ee3958a0a060515ab2a0d807566ca1db`, with the same tree as its reviewed
head. All eight main CI jobs passed (34670387829). Annotated release **v1.32.0**
was publicly accepted at that commit, build
`a2af9287-db19-45e1-89f6-8570e57b8c2e`. Identity matched before and after
readiness, twelve findings, withheld contexts, five exact review/source stacks,
new topic, guide and collection checks. All 36 topics and 795 reviews appear
in the sitemap. Fully accepted progress is 11/12 comparisons and 45/50 reviews.

Normal startup seeding adds one topic, five reviews and idempotent reader
announcements. There is no dependency or database-schema migration. Use
matching frontend/backend artifacts. Code rollback does not delete seeded
content. The full goal remains active with one comparison and five reviews
still to deliver after this milestone.
