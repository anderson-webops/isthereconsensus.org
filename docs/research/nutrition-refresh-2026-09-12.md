# Nutrition refresh source record

Two existing baseline targets receive substantive changes in
`back-end/src/data/claim-refreshes-living-evidence.ts`. Catalog size remains 800.
This is a targeted narrative update, not a systematic literature search, formal
GRADE assessment or independent expert approval. The original change-log record
is retained. An `update` entry records the actual additions and qualifications.
Stable reader-announcement IDs distinguish the unchanged broad cholesterol
distinction from the more qualified saturated-fat conclusion.

## Primary material inspected

| Source | Access and use | Limits |
| --- | --- | --- |
| [AHA 2026 official summary](https://professional.heart.org/en/science-news/2026-dietary-guidance-to-improve-cardiovascular-health/top-things-to-know), DOI 10.1161/CIR.0000000000001435 | Full professional summary, dated March 31, 2026 | Full statement/supplement not assessed; attribute guidance to the official summary. |
| [WHO 2023 guideline chapter](https://www.ncbi.nlm.nih.gov/books/NBK594769/) | Recommendations and supporting rationale, including strength and certainty distinctions | No independent formal guideline appraisal. |
| [AHA cholesterol advisory](https://pubmed.ncbi.nlm.nih.gov/31838890/), DOI 10.1161/CIR.0000000000000743 | Original abstract and indexed primary-PDF methods excerpts | The professional “top things” page returned unrelated geriatric-care text on the final check and is not used. No detailed pooled lipid number is quoted from incomplete access. |
| [Cochrane 2020](https://www.cochrane.org/evidence/CD011737_effect-cutting-down-saturated-fat-we-eat-our-risk-heart-disease), DOI 10.1002/14651858.CD011737.pub3 | Complete official abstract and public summary | Full review supplement not assessed. Its literature cutoff is October 2019, not this page's access date. |
| [Carter 2025 original journal PDF](https://www.newswise.com/pdf_docs/175274111014388_Journal%20article.pdf), DOI 10.1016/j.ajcnut.2025.05.001 | Methods, results, discussion, funding/data sections; Table 3 visually inspected | Public copy is hosted outside the journal. Protocol details and participant data not inspected; older copy retains some erroneous units. |
| [Carter correction](https://www.sciencedirect.com/science/article/abs/pii/S0002916525006136), DOI 10.1016/j.ajcnut.2025.10.009 | Full short publisher notice in indexed text; DOI relation verified independently | Direct publisher fetch failed. Units follow the notice and original table, not the erroneous abstract. |
| [Steen review](https://pubmed.ncbi.nlm.nih.gov/41397264/), DOI 10.7326/ANNALS-25-02229 | Full original-paper copy, methods, limitations and visually inspected risk table | [Reading copy](https://9d993b3b-34ac-4362-aba2-e1bbcc51d343.filesusr.com/ugd/fb4ca6_2e070fe4be734b56a49f51ba6b410a21.pdf) is not publisher-hosted; metadata matches the indexed paper. Supplements and individual disclosure forms were not assessed. |

Consensus was used for candidate discovery earlier in this goal; findings were
traced to the original material above. These updates do not represent new trials
conducted in 2026. Editorial certainty labels summarize the scoped synthesis;
source appraisal fields remain `not_appraised` to avoid implying completed formal
instruments.

## Integrity observations

[Dated derived observations](nutrition-integrity-2026-09-12.json) preserve the
query URLs, DOI identities, provider versions, record IDs, notice links and
actual observation times for eight unique DOIs. Both providers were queried
sequentially with bounded requests and pauses. No production database or monitor
was used. Empty notice results only describe registered metadata at that time.

Both providers linked the Carter units correction. They also linked a 2017
correction, DOI 10.1161/CIR.0000000000000529, to the historical AHA fats advisory.
That advisory remains context with a corrected flag; the correction's detailed
scope was not assessed and its conclusions are not the current guidance anchor.
The WHO chapter has no DOI-provider coverage; its date records a manual page
inspection. Source-specific dates do not assert a new expert review.

## Content promotion requirements

Ordinary `insert` deployment preserves existing production reviews, so this
source change alone does not publish the refreshes. The registry remains
`prepared` until delivery and public verification are recorded.

Do not run the existing full-catalog `sync` for this batch. Inspection found that
`buildSeedSourceUpdate` can overwrite status, notice links and checked dates,
and its order fallback can reuse a different citation's row. Full sync also
replaces scientific fields and change logs on unrelated seeded reviews.

Prepare a scoped promotion against a fresh database backup and the exact live
claim/source revisions. Compare each of these two reviews with its pre-change
source version; any editorial divergence requires review, not automatic overwrite.
Match existing sources by stable identity, preserve source IDs, private monitoring
progress, evidence extraction, reviewer records, human decisions, stronger warning
flags and accumulated notice links. Add the new citations without repurposing
existing rows. Append public history rather than replacing it. Existing review
dates/schedules retain their basis unless an authorized editorial review explicitly
changes them. Publish announcements only after the complete reviewed content is
promoted. The authenticated editorial workflow is also a valid promotion route.

Acceptance must verify both public texts and their six ordered sources, corrections,
actual history/announcement IDs, unchanged unrelated records, preserved private
editorial state, rendered page accessibility and exact release identity. A prepared
artifact or database backup is not evidence that these steps have occurred.
