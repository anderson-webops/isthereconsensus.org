# GMO food safety and antibiotic resistance refresh record

Two existing targets from `living-evidence-baseline.json` are updated in
`back-end/src/data/claim-refreshes-gmo-amr.ts`. Both retain the broad conclusion,
while replacing generic evidence summaries with specific findings and limitations.
The GMO review now distinguishes product assessment from authorization and examines
contrary findings. The antibiotic review distinguishes prescribing, bacterial
carriage and resistant infection outcomes. Both retain publication history and
review-date provenance. The catalog remains 800 reviews.

This is a targeted narrative source check, not a systematic search, formal risk-of-bias
assessment or independent expert approval. Source appraisal fields are
`not_appraised`; certainty labels are editorial judgments. The source record time
and provider observation times describe actual checks, not new expert reviews or
newly conducted experiments.

## Primary access record

| Source | Material inspected | Access limits |
| --- | --- | --- |
| [WHO GMO Q&A](https://www.who.int/news-room/questions-and-answers/item/food-genetically-modified) | Food-safety and assessed-product passages | Dated 2014; not current experimental evidence. |
| [National Academies health chapter](https://www.ncbi.nlm.nih.gov/books/NBK424534/) | Comparative assessment, human-data limitations and conclusions; complete [Box 5-5](https://www.ncbi.nlm.nih.gov/books/NBK424534/box/box_5_5/?report=objectonly) | Full report not read. The box establishes that the criticized 2012 data were reused in the 2014 republication; no claim of fraud is made. |
| [EFSA DP202216](https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2024.8655) | Intended uses, applicant provenance, sections 3.5 and Appendix C | Supplements, sponsor datasets and individual declarations not audited. Statistical differences and one lymphoma were reported and assessed as not treatment-related; the page does not claim that no adverse observations occurred. |
| [Shen 2022](https://link.springer.com/article/10.1186/s12302-021-00578-9) | Methods, main results, adverse-event accounting, limitations and competing-interest declaration | Underlying studies and supplement not independently appraised. The authors' risk-of-bias judgments and harms claims are attributed, not adopted as causal findings. |
| [EFSA 2012 critique](https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2012.2986) | Complete official abstract | Full technical report/supplement not assessed. This is an agency evaluation, not the criticized paper or a notice retracting it. |
| [EFSA current overview](https://www.efsa.europa.eu/en/topics/genetically-modified-organisms) | Assessment workflow and scientific-advice versus authorization roles; page marked last reviewed July 9, 2026 | Individual newer opinions were not appraised; no claim to cover every recent application. |
| [CDC AMR overview](https://www.cdc.gov/antimicrobial-resistance/about/index.html) | Overview, selection, transmission and stewardship sections | The January 2025 page is institutional framing, not a newly conducted trial. |
| [WHO AMR fact sheet](https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance) | Overview and drivers, including access and prevention | Used for broad public-health context, not individual treatment advice. |
| [Cochrane prescribing review](https://www.cochrane.org/evidence/CD003543_improving-how-physicians-working-hospital-settings-prescribe-antibiotics) | Complete official summary and abstract | Full review/supplement not assessed. Outcome-specific trial counts follow the abstract, which differs slightly from the short summary. |
| [Costelloe 2010](https://pubmed.ncbi.nlm.nih.gov/20483949/) | Original indexed abstract | Publisher access returned 403. No full-text, underlying-data or disclosure review claimed. The association estimate is expressed as odds, not absolute risk. |
| [Mo 2023](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1004013) | Methods, main results and declarations | Models were not reproduced; supplement and individual trials not reanalysed. No universal per-day risk estimate or recommended course length is inferred. |
| [WHO surveillance report overview](https://www.who.int/publications/i/item/9789240116337) | Complete official overview | Report download and summary retrieval failed. Statistical adjustments, full report tables and surveillance representativeness were not independently assessed. |

Consensus discovery used one search and three fetched records in this batch;
GMO discovery and two fetches occurred during the prior promotion-tool work.
Findings were checked against the primary material above. The additional Baur
stewardship meta-analysis was fetched for discovery but is not a citation here.
Known goal usage is now five searches, twelve fetches and zero Deep Reviews;
the connector did not expose remaining monthly searches.

## Integrity and identity

[Derived provider observations](gmo-amr-integrity-2026-09-12.json) record fourteen
bounded, sequential queries across seven DOIs, with actual timestamps, query URLs,
provider versions and record IDs. Neither provider returned linked notices in
this check. Europe PMC did not index the National Academies DOI, Shen review or
EFSA 2012 critique. Their source dates use the Crossref observation; this does not
assert comprehensive coverage or scientific validity.

The existing Cochrane citation has a URL identity without a DOI field. Its DOI
was used for the provider query but is not added to the source identity during
promotion. This preserves the existing citation row. Existing source identities
are retained for both reviews, and all six sources per review have an explicit
access note. The scoped promoter still preserves stronger live warnings and
private source records, or refuses divergent state.

## Delivery and public acceptance

Registry entries remain `prepared`, with `publicVerification: null`. Ordinary
insert-only seeding does not update these existing public reviews. Source delivery
must not be counted toward the twenty public refreshes.

Use the [existing backup and scoped promotion procedure](../claim-refresh-promotion.md)
for the two exact topic/claim keys. Verify the prepared text, evidence summaries,
six ordered citations, preserved publication/review dates, appended history and
announcement IDs against the approved plan. Confirm unrelated records and private
editorial/source state remain intact, and check rendered desktop/mobile pages and
release identity. There is no automatic content synchronization or expert approval.
