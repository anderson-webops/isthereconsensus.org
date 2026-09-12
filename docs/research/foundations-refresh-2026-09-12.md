# Consensus, debate and single-study interpretation

Three existing targets from the living-evidence baseline receive substantive
revisions in `back-end/src/data/claim-refreshes-foundations.ts`:

- `consensus-foundations/how-does-scientific-consensus-form`
- `active-debates/what-counts-as-an-active-scientific-debate`
- `media-misinformation/why-does-one-study-rarely-change-everything`

The formation review now distinguishes evidence convergence from formal panel
agreement, adds empirical Delphi reporting examples and explains reproducibility,
replicability and generalization. The debate review now includes disputes about
an effect's existence and separates conflicting evidence from different questions,
uncertain estimates and decision preferences. The single-study review retains its
central conclusion while explaining consequential exceptions, inference limits
and the differing criteria used by a replication project.

The timestamp records source preparation, not expert approval. Original
publication/review dates, source identities and existing history are retained.
Actual changes have separate history entries and unique reader announcements.
The constructed interval example is explicitly hypothetical, not invented study
data. Numerical panel thresholds and replication criteria are never presented as
probabilities of truth or representative expert-agreement percentages.

## Primary access and limits

| Source | Material assessed | Limits |
| --- | --- | --- |
| [National Academies 2019, chapter 3](https://www.ncbi.nlm.nih.gov/books/NBK547546/) | Definitions, measurement, rigor and transparency sections | Selected chapter text; not the entire report, visual figures or an empirical survey. |
| [Scientific Progress](https://plato.stanford.edu/entries/scientific-progress/) | Sections 2.4-3.2 | Philosophical context with competing accounts, not a quantitative consensus measure. |
| [Diamond 2014](https://pubmed.ncbi.nlm.nih.gov/24581294/) | Complete original indexed abstract and publisher introduction | Full methods, supplements and disclosures not appraised. A sampled reporting study, not an accuracy test. |
| [ACCORD 2024](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1004326) | Scope, selected methods/results, funding/interests and all 35 checklist items in the [original XML](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10805282/fullTextXML) | A healthcare reporting guideline, explicitly not method-design advice or intended for all fields. Supplements and visual figures not independently appraised. |
| [Delphi scoping review 2025](https://pubmed.ncbi.nlm.nih.gov/39810238/) | Complete original indexed abstract | Its 287-study sample ends in April 2021, with language and keyword restrictions. Full methods/results/disclosures not appraised. |
| [Cochrane 6.5 chapter 10](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-10), [chapter 14](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-14) and [chapter 15](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-15) | Selected heterogeneity/pooling, outcome-certainty and interpretation sections, including MECIR C72 | Intervention-review guidance, not a universal hierarchy for every field. No complete handbook or visual forest-plot appraisal. |
| [GRADE Handbook](https://gdt.gradepro.org/app/handbook/handbook.html) | Overview, replacement notice and separation of evidence certainty from recommendation strength | Retains the original 2013 handbook identity as historical methods context. The replacement GRADE Book's rendered chapter text was inaccessible; no claim to have assessed that edition. |
| [ASA 2016 original release](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf) | Complete six-principle list and release text | The journal statement's elaborations were inaccessible. Plain-text reading, not a visual PDF appraisal. |
| [ASA president's task force 2021](https://magazine.amstat.org/blog/2021/08/01/task-force-statement-p-value/) | Full statement as republished by the official magazine | Attributed task-force position, not unanimous agreement or a current representative poll. Reader comments are not evidence. |
| [Open Science Collaboration 2015](https://pubmed.ncbi.nlm.nih.gov/26315443/) | Complete original abstract retrieved through Europe PMC; DOI/PMID verified | PubMed page extraction returned no text. The sample covers three psychology journals; full methods, data, disclosures and later comment-response analyses were not appraised. |
| [Ioannidis 2005](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124) and [2022 correction](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1004085) | Selected mathematical examples/corollaries and the full correction notice | The notice identifies missing parentheses in a Table 2 expression. The corrected table image and independent mathematical recalculation were not assessed. The original is a theoretical argument, not a census of false findings. |

These are targeted narrative assessments, not an exhaustive systematic search or
an independent GRADE assessment. The site-level certainty label is an editorial
judgment; individual methodological summaries are left unrated. No percentage of
experts was measured. Source appraisal fields remain `not_appraised`. ACCORD's
reported professional interests and employer support are described with their
limits rather than used to accept or dismiss its recommendations.

## Source notices and provenance

[Fourteen retained provider observations](foundations-integrity-2026-09-12.json)
cover seven DOIs and include actual times, query URLs, provider coverage and notice
identities. Both providers identify the Ioannidis correction. It is retained on
the original source, with the publisher notice and Europe PMC MED 36007233 links.
Linked comments on the psychology replication paper are not retractions.

The extra discovery check for the ASA journal statement returned `not_indexed`
from Europe PMC. The release cited here instead reproduces the original six
principles. That unindexed result does not create a successful check date.
The formation and single-study pages use the last successful observation for
their cited DOI sources. The debate page preserves its existing recorded
retraction-check date; reading webpages does not manufacture DOI monitoring
coverage. Access dates and notice checks remain distinct from scientific review.

No metadata observations were written to production. Ordinary release seeding
remains insert-only. The promoter retains stronger live warnings or refuses
divergence, preserving source IDs, private monitoring, editorial decisions and
existing scientific review dates.

## Publication

All three registry entries are `prepared`, with `publicVerification: null`.
Nine baseline reviews are now source-prepared; none is credited as publicly
completed until the [backup and scoped publication procedure](../claim-refresh-promotion.md)
and exact public content/history verification succeed. The catalog remains at
800 reviews. Verify all nine registered refreshes against their preserved
baseline and sources, including the Ioannidis correction and the illustrative
example label. Source delivery and live deployment alone do not publish these
existing editorial records.
