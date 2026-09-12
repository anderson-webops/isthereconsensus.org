# Food storage and safety evidence

The final planned content set in the [practical evidence goal](practical-evidence-goal.md)
adds five canonical reviews and comparison twelve. Source totals become
**800 reviews, 36 topics, 17 guides and 12 comparisons**: fifty genuinely new
canonical questions beyond the 750-review baseline. These are implementation
counts; the goal remains active until validation and exact public acceptance.

## Scope and integration

The preceding 795-review runtime catalog had no title/slug matching leftovers,
refrigeration, food freezing, reheating, sensory food safety, vacuum packaging
or food storage. The five explicit gaps address refrigeration duration,
survival during freezing, reheating after unsafe storage, sensory checks and
vacuum sealing. Comparison and guide pages do not count as additional reviews.

The Agriculture & food systems topic gains a collection, reading guide and
`/compare/food-storage-and-safety`. Ten qualitative findings distinguish five
methods across roles and limits. They are combinable steps, not interchangeable
treatments on a common scale. Individual-meal and power-outage contexts withhold
findings. Shared registries connect search, Ask, topic/review discovery, saved
content, substantive history, private feedback and sitemap URLs.

No personal illness estimate, common kill percentage, home preservation recipe,
universal number of storage days or invented measured consensus is supplied.
Food composition, organism, temperature, history and jurisdiction remain
explicit. Source-specific uncertainties are part of the public records.

## Primary evidence checked September 12, 2026 UTC

- **FDA consumer storage guidance:** storage, refrigeration and freezer sections
  read. Safe continued frozen storage assumes proper previous handling and
  conditions. Sensory spoilage and pathogenic contamination differ. The page's
  regional date-label usage, power-outage wording and broad mold wording are
  not republished as worldwide rules. No legal or individual food assessment.
- **EFSA BIOHAZ 2021**, DOI 10.2903/j.efsa.2021.6510: primary full text obtained
  from Europe PMC after the normal PMC browser route presented a challenge.
  Scope, expert-led literature selection, uncertainty method, opening-package
  conclusions, freezing/thawing survival and thermal-processing sections read.
  Selection uses expert knowledge and reference screening, not a reproducible
  systematic search or pooled household trial. Injured-organism detection and
  thawing behavior are limitations; decision-tree uncertainty can overestimate
  some risks. No survival percentage, model risk score or table estimate used.
  The panel discloses a competing-interest waiver for one working-group expert;
  individual declarations and minutes were not independently audited.
- **FSA chilling/freezing guidance and UK date-label guidance:** current official
  destinations reached through former FSA URLs. Chilling/freezing and the full
  date-label guidance read. Regional time advice and label definitions are kept
  separate from US advice. No combination of a US refrigerator threshold and
  a UK time limit is presented as a validated universal rule.
- **Yang et al., Foods 2023**, DOI 10.3390/foods12040833: primary full text via
  Europe PMC. Introduction, toxin characterization, temperature, precautions,
  conclusions, conflicts and funding read. Narrative review; no reproducible
  systematic search identified. Heat-stable cereulide differs from heat-sensitive
  diarrheal enterotoxins. No extreme laboratory heating recipe, toxin dose,
  predicted symptom or broad claim that all strains stop growing at one
  refrigerator temperature adopted. Funded by Chinese National Key R&D
  international cooperation grant 2019YFE0103800; no competing financial
  interests declared. No independent appraisal of all cited experiments.
- **Jovanovic et al., Toxins 2022**, DOI 10.3390/toxins14040289: primary sampling,
  enrichment, gene-screening, cold-culture and toxin methods/results read.
  Selected products came from Belgian, Dutch and Serbian retail markets in
  2019. Cold-growth experiments used enriched communities on laboratory medium,
  not a trial of household food storage. The abstract says no toxin at 4°C;
  section 2.4 reports one trace detection. Some prevalence percentages and
  denominators also disagree. No prevalence percentage, toxin quantity or
  zero-risk assertion is used. This source is contextual, not an anchor.
  Ghent University BOF funding and no conflicts declared. No raw-data
  replication or formal correction resolution performed.
- **FSA vacuum-packaging guidance:** current official page and linked primary
  December 2020 PDF checked for intended audience, product exclusions, hazards,
  controlling factors, predictive-model limits and rewrapping. The PDF has a
  past planned review date; its legal references were not independently audited.
  Commercial guidance's ten-day framework is not a universal home allowance.
  No shelf-life chart, decision-tree calculation or preservation recipe adopted.
  Removing oxygen and introducing oxygen are both insufficient on their own
  to certify a food free of botulism risk. The cited original industry and
  committee evidence was not independently reappraised.

One Consensus Pro search returned twenty records; five were fetched for
discovery, including the subsequently checked EFSA, cereulide and laboratory
papers. No Deep Review was used. USDA direct pages returned access errors;
the AESAN original PDF returned 404 and the 2021 Jovanovic review was not
verified in full. Those records are not adopted as checked primary anchors.
No source's summary was substituted for unavailable methods. Primary checking
is targeted and AI-assisted, not an exhaustive systematic review or independent
expert approval. No source correction status beyond the stated checks is
represented as independently resolved.

## Validation and rollout

Local validation passed on Node 24.18.1 / npm 12.0.2:

- Clean root installation, zero audit vulnerabilities, standalone backend
  lock/install policy and all 31 Linux native lock entries.
- Lint, both typechecks, both production builds and **576 tests**
  (349 frontend, 227 backend), with no failures or skips.
- **216 accessibility route/theme checks**, including both outcomes, withheld
  contexts, empty selection and guide. Desktop/mobile views were inspected;
  both themes passed phone widths and 200% text without horizontal overflow.
- Built browser checks verified all ten finding fields and source links,
  topic/collection/review/guide/search/Ask discovery, share/reload/history,
  canonical URLs, keyboard/reset and complete dynamic sitemap coverage.
- Isolated MongoDB and built-browser saved-content, publication-history and
  private-feedback checks; compiled fail-closed runtime and SSR assets/privacy.
- Native syntax checks for the new goal-wide read-only acceptance script.
  A pre-release probe exercised its parsing against all eleven comparisons and
  45 new reviews already live on v1.32.0. It caught and fixed handling of Vue's
  scoped HTML attributes on numeric-value paragraphs, then passed every context,
  outcome, source stack and all 795 sitemap review URLs. This subset probe is
  not the final twelve-comparison/fifty-review acceptance.

Initial failures exposed unsupported uncertainty labels, duplicate source order
and ordinary-language search gaps. Those were fixed, and the complete relevant
checks were rerun successfully. No search thresholds or safety-context
assertions were weakened.

CI, source delivery and exact public acceptance remain separate gates.
Normal insert-only backend startup adds five
reviews and stable idempotent announcements. There is no dependency, schema,
configuration or credential migration. Use matching frontend/backend artifacts;
rolling code back does not delete seeded content.

The goal-wide read-only checker is `scripts/practical-evidence-live-acceptance.mjs`.
Run it from the expected release checkout with Node 24 and the repo's `tsx`
loader, passing the full commit and annotated tag. It rejects a different local
commit or modified relevant sources, verifies public identity before and after,
checks every comparison context/outcome and all fifty new review/source stacks,
and reconciles the full topic/review sitemap with the API catalog. It performs
no production writes.
