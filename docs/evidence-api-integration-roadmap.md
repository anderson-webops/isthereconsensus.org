# Evidence API Integration Roadmap

Last updated: 2026-04-18

This note preserves the external API shortlist and maps it onto the current `isthereconsensus.org` codebase so the next implementation pass can start from concrete repo context instead of re-deriving the plan from chat history.

## Priority APIs

Primary wave:

1. `Crossref`
2. `NCBI / PubMed / PMC`
3. `OpenAlex`
4. `Europe PMC`
5. `ClinicalTrials.gov`
6. `ROR`
7. `Unpaywall`

Second wave:

1. `WHO GHO OData API`
2. `NOAA NCEI Climate Data Online`
3. `openFDA`

Use these APIs for discovery, metadata, surveillance, and context. Do not let them auto-decide the public consensus conclusion, certainty label, or bottom line.

## Current Repo Fit

The codebase already has most of the editorial data model needed for Phase 1.

- `back-end/src/utils/evidence.ts` currently does a single-provider `OpenAlex` search.
- `back-end/src/server.ts` exposes `GET /api/evidence/search` and most editorial claim/source routes.
- `back-end/src/models/schemas/ClaimSource.ts` already stores `doi`, `pmid`, `pmcid`, `citationStatus`, `citationCheckedAt`, and `statusSources`.
- `back-end/src/models/schemas/Claim.ts` already stores `searchDatabases`, `searchCutoffAt`, `surveillanceSpec`, `evidenceSummaries`, `institutionalAnchors`, and `lastRetractionCheckAt`.
- `front-end/src/components/EvidenceExplorer.vue` already provides a basic editorial literature search UI backed by `/api/evidence/search`.
- `front-end/src/pages/account/editorial/claims/[id].vue` is the correct place to add source hydration and identifier-resolution actions.
- `front-end/src/pages/account/editorial/index.vue` already computes operational review pressure from claim/source metadata and is the right place for an evidence-event inbox.

## Architecture For This Repo

Do not call external evidence APIs directly from Nuxt pages.

Build a backend evidence gateway and keep the initial route surface small. In this repo, the first practical step is not a route rewrite. It is extracting provider logic out of `back-end/src/server.ts` and `back-end/src/utils/evidence.ts` into a service layer that `server.ts` can delegate to.

Recommended backend structure:

- `back-end/src/services/evidence/index.ts`
- `back-end/src/services/evidence/providers/openalex.ts`
- `back-end/src/services/evidence/providers/crossref.ts`
- `back-end/src/services/evidence/providers/pubmed.ts`
- `back-end/src/services/evidence/providers/europepmc.ts`
- `back-end/src/services/evidence/providers/clinicaltrials.ts`
- `back-end/src/services/evidence/providers/ror.ts`
- `back-end/src/services/evidence/providers/unpaywall.ts`
- `back-end/src/services/evidence/monitor.ts`
- `back-end/src/services/evidence/types.ts`

Keep `back-end/src/server.ts` as the route host for now, but make it call the evidence service instead of embedding provider behavior inline.

## Provider Responsibilities

`Crossref`

- DOI hydration
- publisher and journal normalization
- funding and license metadata
- post-publication update metadata

`PubMed / PMC`

- DOI <-> PMID <-> PMCID resolution
- biomedical search
- medical citation normalization

`OpenAlex`

- cross-disciplinary literature search
- related-paper discovery
- citation graph metadata
- author and institution metadata
- newer-evidence discovery after a claim cutoff date

`Europe PMC`

- biomedical enrichment
- fallback or complement to PubMed

`ClinicalTrials.gov`

- relevant-trial lookup for treatment claims
- completion/status monitoring
- surveillance triggers when major trials complete or update

`ROR`

- institutional affiliation normalization
- stronger institutional anchor consistency

`Unpaywall`

- open-access and full-text link discovery

`WHO`, `NOAA`, `openFDA`

- public context blocks and charts
- never a verdict engine

## Recommended Persistence Additions

Add these as separate collections instead of overloading `ClaimSource`.

`SourceSnapshot`

- normalized external metadata keyed by DOI, PMID, PMCID, or provider-native id
- last fetched timestamp
- provider name
- raw payload excerpt or hash
- normalized title, journal, year, identifiers, URL, publisher, and open-access fields

`SourceMonitorEvent`

- claim id
- optional source id
- event type such as `retraction`, `correction`, `expression_of_concern`, `trial_update`, `guideline_update`
- provider
- severity
- summary
- external URL
- detected at
- resolved at
- resolution note

`EvidenceSearchCache`

- query fingerprint
- provider
- normalized query
- topic or claim scope
- fetched at
- cached result payload

## Phase 1 Build Order

This is the shortest high-value sequence for the current repo.

1. Extract `OpenAlex` into `back-end/src/services/evidence/providers/openalex.ts` without changing the public API shape.
2. Add `Crossref` provider support for DOI hydration and citation-status enrichment.
3. Add `PubMed / PMC` provider support for DOI, PMID, and PMCID normalization.
4. Add a backend source-hydration service that merges provider results into one normalized source shape.
5. Add claim-editor actions in `front-end/src/pages/account/editorial/claims/[id].vue` to hydrate a draft source row from DOI, PMID, PMCID, or title query.
6. Add `SourceSnapshot` persistence.
7. Add `SourceMonitorEvent` persistence plus a simple editorial inbox on `front-end/src/pages/account/editorial/index.vue`.
8. Add `ClinicalTrials.gov` monitoring for medical and treatment claims.

## Suggested Backend Endpoints

These fit the existing `server.ts` route style and can be added incrementally.

`GET /api/evidence/search`

- keep the current route
- upgrade it to accept `provider`, `topic`, and `claimId`
- default to a provider blend later, but keep `OpenAlex` as the first implementation

`POST /api/evidence/normalize-source`

- input: DOI, PMID, PMCID, URL, title, and optional topic
- output: normalized source metadata plus provider provenance

`POST /api/editorial/claims/:id/sources/hydrate`

- input: DOI, PMID, PMCID, title query, or URL
- output: a hydrated source draft ready for insertion or merge into `ClaimSource`

`POST /api/editorial/claims/:id/sources/:sourceId/check`

- run integrity checks and refresh `citationStatus`, `citationCheckedAt`, and `statusSources`

`GET /api/editorial/evidence-events`

- list unresolved and recent `SourceMonitorEvent` rows

`POST /api/editorial/evidence-events/:id/resolve`

- resolve an ops item after editorial review

## Frontend Changes

`front-end/src/pages/account/editorial/claims/[id].vue`

- add a source hydration panel above the manual source list
- allow hydrate-by-DOI, hydrate-by-PMID, hydrate-by-PMCID, and title search
- allow importing a result into a source row instead of retyping it
- surface identifier conflicts and citation-status warnings inline

`front-end/src/components/EvidenceExplorer.vue`

- reuse this as the search shell instead of building a second explorer
- extend result cards with DOI, PMID, PMCID, open-access link, provider badges, and an `Add to sources` action

`front-end/src/pages/account/editorial/index.vue`

- add an evidence-event inbox backed by `SourceMonitorEvent`
- group by severity and event type
- link directly back to the affected claim editor

## Environment Variables

These names fit the current repo style and keep provider config explicit.

- `OPENALEX_EMAIL`
- `OPENALEX_API_KEY`
- `CROSSREF_MAILTO`
- `NCBI_API_KEY`
- `UNPAYWALL_EMAIL`
- `NOAA_API_TOKEN`

Optional later:

- `WHO_GHO_BASE_URL`
- `OPENFDA_BASE_URL`
- `CLINICALTRIALS_BASE_URL`

## Implementation Rules

- Keep provider calls on the backend only.
- Store normalized identifiers even when the source was discovered by title search.
- Treat provider metadata as fallible input, not final editorial truth.
- Separate discovery from judgment.
- Prefer cached normalization and monitoring reads over re-fetching live metadata on every page load.
- Record provenance whenever provider data changes a source row or triggers an ops event.

## Immediate Next Step

The best first build slice for this repo is:

1. extract `OpenAlex` into `back-end/src/services/evidence/providers/openalex.ts`
2. add `Crossref`
3. add `PubMed / PMC`
4. ship source hydration inside `front-end/src/pages/account/editorial/claims/[id].vue`
5. follow with an evidence-event inbox

That sequence matches the current schema, route style, and editorial UI without forcing a larger backend rewrite first.
