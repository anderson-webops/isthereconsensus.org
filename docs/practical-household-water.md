# Household water-treatment evidence

Part of the active [practical evidence goal](practical-evidence-goal.md).
This milestone adds comparison eight of twelve and five genuinely new canonical
reviews, bringing the source implementation to 780 reviews and 30 of fifty new
reviews. The new guide brings the guide count to thirteen; topics remain 35.
These source counts are not proof of production acceptance or goal completion.

## New questions and reader experience

`/compare/household-water-treatment` compares six named treatment stages on
microbial control, chemical reduction, and water use/upkeep. It uses eighteen
qualitative findings, not invented common removal scores. Personal safety and
active-emergency contexts do not inherit general treatment findings. Sources,
limitations and operating scope remain attached to each finding.

Five new canonical reviews distinguish ordinary boiling from chemical removal;
claim-specific certification from universal protection; UV inactivation from
chemical removal; RO water efficiency from contaminant reduction; and hardness
control from disinfection. The gap registry connects these to existing municipal
treatment history and PFAS health reviews without renaming or counting those
older reviews again. `/guides/household-water-treatment` connects the questions.

The five reviews form one curated household-water topic collection, with no
orphan or multiply assigned reviews. Shared registries supply topic/review/Ask/search discovery, sitemap, saved
comparisons, substantive history and private feedback. No new account interests,
public comments, recommendation profiling or production database operations
are introduced. The existing responsive comparison design is preserved.

## Primary evidence and access boundaries

Checked September 12, 2026 UTC:

- CDC [home treatment](https://www.cdc.gov/drinking-water/about/about-home-water-treatment-systems.html)
  and [filter selection](https://www.cdc.gov/drinking-water/prevention/about-choosing-home-water-filters.html):
  full official April 2024 pages. The home-treatment page's inconsistent
  nanofiltration approximate pore size/range is not copied into the site.
- CDC [emergency water guidance](https://www.cdc.gov/water-emergency/about/index.html),
  September 2024: full page, preserving the fuel/toxic-chemical/radioactive
  contamination exclusion. No chemical-disinfection recipe is reproduced.
- EPA [treatment guide](https://www.epa.gov/system/files/documents/2025-01/ws-products-home-water-treatment-guide_v2_508.pdf):
  November 2024 document despite the January 2025 file path. Treatment-goal,
  softening, technology table, certification and maintenance sections checked.
  Broad technology descriptions do not override product-specific limitations.
- NSF [contaminant directory](https://www.nsf.org/consumer-resources/articles/contaminant-reduction-claims-guide):
  certifier's primary reference, not a clinical study or site brand endorsement.
- Mulhern et al., [DOI 10.1002/aws2.1262](https://www.rti.org/publication/longitudinal-assessment-point-use-carbon-filters-removal-per-polyfluoroalkyl-substances-private-well):
  Consensus record fetched, institutional abstract and published PDF methods,
  Table 3, applicability limits and disclosures checked. Table 3 visually
  verified. The published copy is linked in Sullivan County's public records
  under `departments/BOL/Autoclave Proposal`, with the full article title.
  No independent reanalysis or formal appraisal completed.
- EPA [RO specification](https://www.epa.gov/system/files/documents/2024-11/ws-products-watersense-ro-systems-specification.pdf):
  complete eight-page November 2024 specification checked, including the
  efficiency page visually. Read alongside the current clarifications below.
- EPA [clarification workbook](https://www.epa.gov/system/files/documents/2021-12/ws_technical_clarifications.xlsx):
  updated August 20, 2026. `Active Clarification Detail` rows 33–35,
  RO-0826-1 and RO-0826-2, inspected read-only. The former aligns efficiency
  testing with the 2025 NSF/ANSI 58 revision, including tank back-pressure
  and flushing; the latter permits alternative packaging text. The 30%
  minimum remains. The full underlying NSF standard was not appraised.

No current drinking-water legal limit or product price is inferred from an old
paper or dated agency example. The separate EPA PFAS-filter page still includes
an explicitly April 2024 certification caveat and a different generic RO
water-use example. These are not combined into a single current universal ratio.

## Numerical interpretation

The RO review uses a transparent illustration of the verified threshold:
`100 / 30 - 1 = 70 / 30 = 2.333...` reject units per treated unit, rounded to
2.3 as in EPA's consumer description. This is not an exact 2.3 upper bound, a
market mean, a contaminant-removal fraction or a predicted household saving.
No cross-study arithmetic, health benefit or consensus percentage is derived.

The field-study result retains its source uncertainty and limitations in the
canonical certification review rather than becoming a score for every carbon
filter. Missing data and practical failures are not erased by a favorable
chemical-removal estimate. Source authors' findings are not independent expert
review or formal evidence grading by this site.

## Validation and release boundary

Local validation passed September 12, 2026 UTC:

- Clean root installation, with zero audit vulnerabilities; standalone backend
  install-script parity and all 31 Linux native lock entries passed. Manifests,
  both locks and npm configuration remain unchanged.
- All 536 tests passed: 329 frontend and 207 backend, with no skips or failures.
  New regressions cover treatment boundaries, the field-study denominator and
  limitations, the updated efficiency method, claim uniqueness, schema limits,
  source integrity, exact collection membership and search discovery.
- Native lint, frontend/backend typechecks and production build passed after
  the final editorial changes. The optional guarded Oxlint preflight declined
  a version mismatch; it was not bypassed or counted as a pass.
- All 166 accessibility route/theme checks passed. The built-app browser suite
  verified all eighteen findings and their source anchors, unsupported
  contexts, shared selections, history, empty-state recovery, keyboard use,
  metadata, guide/review/topic/search/Ask discovery and sitemap. Desktop and
  mobile screenshots were visually inspected; both themes passed 320-pixel
  and 200% text checks without horizontal overflow.
- The isolated real-database library/history/private-feedback browser suite,
  backend fail-closed runtime, SSR assets and route privacy checks passed.

Source delivery, remote CI and exact public verification remain separate
gates. These local results do not imply production acceptance or completion
of the full twelve-comparison, fifty-review goal.

Normal startup seeding adds the five new records. No dependency, configuration,
secret or schema migration is required. Rolling back application code does not
delete already seeded reviews. No destructive data rollback is included.
