# Exercise and blood pressure milestone

Part of the active [practical evidence goal](practical-evidence-goal.md).
Source now contains seven of twelve comparisons and 25 of fifty genuinely new
canonical reviews: 775 reviews, 35 topics and twelve reading guides. This is
not completion of the full goal; source delivery and public acceptance remain
separate gates.

## Reader experience

- `/compare/exercise-and-blood-pressure` compares six exercise categories on
  systolic and diastolic pressure, with a separate qualitative ambulatory context.
- Five new canonical questions address sustained resting effects, isometric
  superiority claims, clinic versus ambulatory inference, dose-model limits and
  exercise-specific measurement timing. Adjacent general exercise and home
  monitoring reviews are preserved, with the gaps explicitly documented.
- `/guides/exercise-and-blood-pressure` connects the interpretation questions.
- Shared registries supply topic, search, guide and review discovery, saved
  comparisons, public substantive history and private reader feedback.
- The interval model distinguishes Bayesian credible intervals from confidence
  intervals. Legacy confidence intervals retain their existing label. Detailed
  numerical cards receive the same readable widths as qualitative evidence cards.
- No personal dose, medication change, event-risk prediction, consensus
  percentage or universal exercise winner is produced.

## Primary evidence and access boundaries

Hu et al., Sports Medicine (18 August 2026),
[DOI 10.1007/s40279-026-02521-5](https://link.springer.com/article/10.1007/s40279-026-02521-5):
main full text and Table 2 checked, including visual PDF inspection. The
English-language search ends in May 2025. Eligibility is **study-level mean
age at least 45**, not every individual aged at least 45 or diagnosed with
hypertension. Programs last 4–48 weeks, median twelve. The review includes
159 trials and 10,821 baseline participants; 152 trials contribute to the
systolic network and 147 to the diastolic network. All eleven isometric studies
used handgrip, not wall squats. Table 2 mean differences in change versus
control, with **95% Bayesian credible intervals**, are transcribed unchanged:

| Exercise | Systolic mmHg | Diastolic mmHg |
| --- | --- | --- |
| Continuous aerobic | -5.06 (-6.71 to -3.43) | -2.82 (-3.74 to -1.88) |
| High-intensity intervals | -5.79 (-8.10 to -3.51) | -3.17 (-4.49 to -1.86) |
| Dynamic resistance | -4.95 (-7.02 to -2.87) | -2.95 (-4.12 to -1.76) |
| Isometric handgrip | -4.18 (-8.31 to -0.06) | -2.77 (-5.06 to -0.49) |
| Combined aerobic and resistance | -7.72 (-9.99 to -5.43) | -3.79 (-5.08 to -2.49) |
| Circuit-based | -13.52 (-18.59 to -8.44) | -6.87 (-9.79 to -3.97) |

Circuit training's primary rank is sensitive to study quality and sample-size
restrictions. Authors rate no network comparison high confidence. Their
CINeMA results are reported, not independently reproduced. Modeled exercise
dose uses compendium assignments and protocol assumptions; a fitted peak is
not a tested individual optimum. The paper is CC BY 4.0; attribution and the
adapted-explanation boundary accompany the data. Authors declare no competing
interests. The full supplement was not independently appraised.

Schneider et al., BJSM 2026,
[DOI 10.1136/bjsports-2025-111474](https://pubmed.ncbi.nlm.nih.gov/42120187/):
primary abstract and disclosures checked, not full methods. The separate
ambulatory network addresses adults with hypertension. Its qualitative
findings do not inherit Hu's resting numbers or imply definitive superiority.
The circuit category is not assumed equivalent to combined training.

Pinto et al., JAGS 2025 issue, first online October 2024,
[DOI 10.1111/jgs.19213](https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.19213):
abstract, disclosures and eight-page supplement checked; main full report not
appraised. The distinction between within-group change and between-group
effects is retained, as are analyzed denominators and LSP's ownership of
P3-EX LLC. The trial is not evidence that every exercise has no ambulatory effect.

Official AHA [measurement](https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home)
and [activity](https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/getting-active-to-control-high-blood-pressure)
guidance was checked separately as clinical context, not as another measurement
source. Source checks were targeted, not exhaustive or independent expert review.

## Verification

Local validation passed: root clean installation with zero reported audit
vulnerabilities; standalone install-script parity; 31 Linux native lock entries;
repository lint, frontend/backend types and production build; 525 tests
(323 frontend, 202 backend, no failures or skips); all 152 accessibility
route/theme checks; backend runtime, SSR assets and route privacy checks; and
the isolated real-database library, account-isolation, update and private-feedback
browser suite. Manifests, lockfiles and backend npm configuration are unchanged.

Light/dark desktop and mobile screenshots were visually checked. This caught
overly narrow six-column cards; the final detailed-card layout uses three
columns at 1280 pixels and one at phone widths without horizontal overflow.

Numerical regressions check all twelve point estimates and intervals against
the source, default CI labeling, unsupported-context non-transfer, stable
announcements, search and canonical links. Deployment-schema validation covers
all five reviews and source stacks. Browser checks cover both outcomes,
ambulatory/unsupported/empty states, reload and history, keyboard controls,
source anchors, six review/guide discovery paths, 320-pixel width, 200% text,
light/dark themes and three-column desktop readability.

Release notes record final native checks, protected-branch CI and the boundary
between source publication and verified public deployment. The optional
guarded Oxlint preflight refused version drift (installed 1.82.0 versus
approved 1.78.0); it was not substituted for repository lint or bypassed.
