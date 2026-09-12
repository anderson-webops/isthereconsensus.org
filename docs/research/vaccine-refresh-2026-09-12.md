# Childhood vaccines and MMR refresh record

Two existing targets from the recorded living-evidence baseline are updated in
`back-end/src/data/claim-refreshes-vaccines.ts`. The catalog stays at 800 reviews.
The preparation timestamp records this source check and synthesis, not an
independent expert review. Existing publication/review dates and source identities
are retained, with distinct substantive history entries and reader announcements.

The broad review qualifies blanket institutional agreement, distinguishes vaccine
products and ingredients, and corrects the scope of WHO's vaccine/thiomersal review.
The MMR review adds a newer US cohort, quantitative comparisons and limits on
subgroup claims. A confidence interval that includes no association is not proof
of exactly zero effect; an estimate below one is not evidence of autism prevention.

## Primary access record

| Source | Material inspected | Limits |
| --- | --- | --- |
| [WHO GACVS statement](https://www.who.int/news/item/11-12-2025-statement-gacvs-vaccines-autism) and [release](https://www.who.int/news/item/11-12-2025-who-expert-group-s-new-analysis-reaffirms-there-is-no-link-between-vaccines-and-autism) | Original statements and quality-weighted conclusions | These summarize evidence; they are not additional independent studies. |
| [WHO vaccine/thiomersal review](https://www.who.int/publications/m/item/update-vaccines-thimerosal-autism) | Executive summary and selected methods/synthesis passages of the December 2025 advance proof: pages 13-16, 18-20 and 27-29 | Not a full-report or visual-table appraisal. The later final publication was not assessed. Aluminium-adjuvant studies were excluded from this review and considered separately by WHO. |
| [Taylor 2014](https://pubmed.ncbi.nlm.nih.gov/24814559/) | Complete indexed original abstract | Full methods, individual studies, supplements and disclosures not independently appraised. The cohort autism estimate is distinct from broader ASD and case-control estimates. |
| [Hviid 2019](https://pubmed.ncbi.nlm.nih.gov/30831578/) | Original indexed abstract, funding statement and linked notices | Full methods/supplements and individual records not reviewed here. The linked retraction concerns a separate comment, not this cohort. |
| [Burstain 2026](https://pubmed.ncbi.nlm.nih.gov/42520244/) | Complete original abstract through PubMed and Europe PMC, plus indexed funding/conflict statement | Full methods and supplements inaccessible. Prespecified age landmarks and a negative-control exposure probe bias without eliminating every possible confounder. |
| [BMJ aluminium review](https://www.bmj.com/content/393/bmj-2025-088921) | Original full-text methods, selected outcome results, limitations and disclosures through [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13147496/fullTextXML) | Supplements and subsequent rapid responses not assessed. Outcome-specific trial counts must not be inferred from the total number of trials. |
| [Danish aluminium cohort](https://pubmed.ncbi.nlm.nih.gov/40658954/) and [correction](https://pubmed.ncbi.nlm.nih.gov/40674587/) | Complete indexed original abstract; correction identity and relationship | Correction DOI 10.7326/ANNALS-25-03233 is verified, but notice full text and corrected supplement were inaccessible. Correction scope remains unknown; no detailed subgroup reinterpretation is claimed. |
| [CDC current autism page](https://www.cdc.gov/vaccine-safety/about/autism.html) | Full page, marked July 22, 2026, including the MMR section | Agency communication is distinguished from new experimental evidence. Its detailed Danish supplementary-table claims were not independently verified. |

The MMR draft uses the reported **99%** interval for the US cohort and **95%**
interval for the Danish cohort. The BMJ review's autism evidence consists of two
ecological studies and one cohort, rather than eleven randomized autism trials.
Its appraisal judgments are attributed to the authors. Local injection-site
reactions concern a separate outcome and are not erased by the autism conclusion.

These are targeted narrative checks, not an exhaustive systematic review or an
independent GRADE assessment. Source appraisal fields remain `not_appraised`.
Individual-study certainty labels are moderate editorial judgments; the MMR
review's overall high certainty reflects convergence rather than a formal GRADE
upgrade of either cohort. No expert approval, representative expert poll or
independent dataset reanalysis is claimed. Disclosures are reported with their
access limits, not treated as proof for or against a finding.

Consensus was used for earlier discovery in this batch, followed by primary-source
checks. Known cumulative goal use remains six searches, fifteen fetched records
and zero Deep Reviews; the connector did not expose a remaining quota. This
integration did not add another Consensus call.

## Integrity and identity

[Provider observations](vaccine-integrity-2026-09-12.json) retain ten actual bounded
queries across five DOIs on September 12, 2026, including timestamps, query URLs,
provider versions and record identities. Europe PMC linked a correction to the
Danish aluminium cohort while Crossref returned no registered update. The stronger
corrected flag and notice URL are retained. No notices were returned for the other
four DOIs; that is limited metadata coverage, not validation of the research.

Existing citations keep their DOI/URL identity. Source notes now describe exactly
what was inspected. New citations bring the broad review to seven sources and the
MMR review to five. No metadata observation was written to production. The scoped
promoter preserves stronger live warnings and private source state or refuses
divergent records.

## Delivery and public acceptance

Both registry entries remain `prepared` with `publicVerification: null`. The broad
review's qualified wording is marked as a changed bottom line; the MMR review
retains its central conclusion. Neither counts toward the twenty publicly completed
refreshes until controlled promotion and public acceptance succeed.

Use the [backup and scoped promotion procedure](../claim-refresh-promotion.md) for
these exact keys:

- `health-and-medicine/do-childhood-vaccines-cause-autism`
- `health-and-medicine/does-the-mmr-vaccine-cause-autism`

Verify exact text, evidence summaries, ordered citations, correction links,
preserved review/publication dates, appended history and announcement identities.
Compare unrelated records and private editorial/source state against the backup
and preview. Inspect rendered pages in both themes and mobile/desktop layouts.
Ordinary releases remain insert-only and cannot silently overwrite existing
editorial records.
