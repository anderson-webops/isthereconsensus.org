# Hearing-protection evidence and sitemap repair

Part of the [practical evidence expansion goal](practical-evidence-goal.md).
This milestone adds comparison ten and five genuinely new canonical reviews.
Source totals become **790 reviews, 35 topics, 15 guides and ten comparisons**:
**10/12 comparisons and 40/50 new reviews**. These are source counts; the full
goal remains active until its remaining content and public acceptance finish.

## Coverage and reader experience

`/compare/hearing-protection` compares foam plugs, preformed/custom plugs,
protective muffs, dual protection and ordinary ANC headphones. Ten qualitative
findings cover protection/fit and use/maintenance. Personal exposure-time and
hearing-loss-risk contexts withhold findings instead of borrowing general
evidence or calculating a false personal safety margin.

Five new canonical questions address package ratings versus individual fit,
immediate instruction effects, retained skill and refreshers, ANC labeling,
and non-additive dual protection. The gap registry distinguishes these from
existing hearing-loss/dementia coverage. A substantial four-section guide and
one collection connect them through the shared discovery, saved-content,
substantive-history and private-feedback paths. No commercial brand ranking,
universal injury-prevention percentage or personalized treatment is supplied.

## Source verification and limitations

Primary sources checked September 12, 2026 UTC:

- [NIOSH January 2025 policy](https://www.cdc.gov/niosh/docs/2025-104/pdfs/2025-104.pdf):
  both pages read and the recommendation visually inspected. It supersedes
  NIOSH's 1998 derating recommendation with individual quantitative fit testing.
  The referenced ANSI standard was not independently inspected.
- [NIOSH protector guidance](https://www.cdc.gov/niosh/noise/prevent/ppe.html):
  full relevant sections checked for control hierarchy, device roles, ANC,
  compatibility, communication and fit. Historical derating language is read
  with the 2025 policy. An absolute training-guarantees-best-fit caption is not
  adopted. US labeling guidance is not generalized into global legal advice.
- [Morata et al. 2024 Cochrane review](https://pmc.ncbi.nlm.nih.gov/articles/PMC11099959/),
  DOI 10.1002/14651858.CD015066.pub2: full methods, results, findings tables,
  limitations and declarations read. The publisher PDF hosted by CDC was
  also checked visually at PDF pages 7 and 34. Three RCTs, 756 participants;
  17 uncontrolled studies inform discussion, not the causal conclusions.
  The extensive/simple instruction comparison is 8.62 dB (95% CI 6.31–10.93),
  321 participants, moderate certainty; extensive/no instruction is a distinct
  100-participant comparison, 8.34 dB (7.32–9.36), low certainty. These are
  source grades and estimates, not a new appraisal, pooled estimate or injury
  percentage. Overlapping authorship and funding are disclosed.
- [Federman et al.](https://www.tandfonline.com/doi/full/10.1080/14992027.2025.2568647),
  DOI 10.1080/14992027.2025.2568647: online October 2025, June 2026 issue.
  Primary indexed methods, results, attrition and disclosures checked; direct
  publisher PDF access was unavailable. Of 390 recruits, 59 missed scheduled
  follow-up and 331 were included in the 12-month analysis (207 control,
  124 experimental). Failure ended quarterly follow-up. No booster instruction
  was tested. Crude proportions and survival estimates are not combined into
  a same-denominator decay curve. Raw tables/figures and data were not
  independently verified; no numeric pass-rate chart is published.
- [Gong et al. 2026 synthesis](https://pmc.ncbi.nlm.nih.gov/articles/PMC12927255/),
  DOI 10.1080/15459624.2025.2602758: primary manuscript methods, results,
  limitations and funding checked. Twenty-three uncontrolled studies, 5,575
  workers; serious bias and very-low-certainty evidence. Abstract/results
  counts and several interval/test-statistic pairs disagree. For example, a
  six-month interval crosses zero while its adjacent test claims very strong
  significance. The figures and supplement were not independently checked;
  no numerical estimates from this source are adopted. Different follow-up
  pools are not a single cohort. A targeted correction search found no formal
  notice; it neither resolves these issues nor establishes exhaustive clearance.
  The source remains contextual, not an anchor or decision-weight estimate.
- [Murphy et al. 2022](https://stacks.cdc.gov/view/cdc/209127/cdc_209127_DS1.pdf),
  DOI 10.1121/10.0013418: primary methods, convenience-sample limitations and
  conclusions checked. Four available datasets are not an exhaustive review
  or independent replication of one product. Historical market/regulatory
  descriptions are not adopted as current guidance.
- [Byrne and Michael, 2021 technical chapter](https://stacks.cdc.gov/view/cdc/226371/cdc_226371_DS1.pdf):
  sections 8.6–8.8, pages 133–134, checked for combined attenuation and
  communication. Its rule of thumb is not used as a personal exposure
  calculator. No underlying experimental reanalysis was performed.

One Consensus search returned 20 records; four were fetched for discovery.
No Deep Review was used. Source checking is targeted and AI-assisted, not an
exhaustive systematic review or independent expert approval. Source counts do
not establish independent replication or measured expert agreement.

## Sitemap defect found during public acceptance

Mosquito release v1.30.0 publicly reports commit
`c3d2f80022f35d887714f732b22d16c1f05ab73f`, build
`840573e5-77cc-43bf-94ec-0e8f92da4226`. Readiness, all twelve comparison
findings, unsupported contexts, five review/source stacks, guide and collection
passed. Full acceptance stopped because the public sitemap omitted dynamic
topics and reviews while retaining static routes, guides and comparisons.

The route concatenated `/topics` directly onto `apiInternalBase`, although the
normalizer deliberately stores a backend origin without `/api`. It now uses
the existing `buildApiUrl` helper for both topic and claim requests. The built
browser fixture now uses that default origin form, and checks every topic and
canonical review in the sitemap. Previously its runtime `/api` suffix masked
the defect. Existing static-guide fallback behavior on backend failure remains
covered. No production configuration or credential change is required.

## Validation and delivery

Local validation passed: clean root installation with no audit findings,
standalone lock/install-script parity, 31 native lock entries, lint, both
typechecks and production builds. All 556 tests passed (339 frontend and
217 backend). Runtime, SSR asset/route, real-database library/history/private
feedback and full search/comparison/guide browser checks passed. Accessibility
passed all 190 route/theme checks. Desktop and mobile renders were inspected
in both themes, with overflow and 200% text checks also passing.

The sitemap regression failed against the old build at its first topic, then
passed against the repaired build for all 35 topics and 790 canonical reviews.
The intentional static fallback with an unavailable backend also passed.
Source integration, CI, source release and exact public acceptance remain
separate gates.

Normal startup seeding adds five canonical records and idempotent reader
announcements. No dependency or database-schema migration is required. Use
matching frontend/backend artifacts; a code rollback does not delete seeded
reviews. The sitemap fix also restores discovery of earlier reviews.
