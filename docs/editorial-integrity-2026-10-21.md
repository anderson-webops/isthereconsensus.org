# Editorial integrity and targeted maintenance

## Scope

Jacob approved implementation of the catalog audit recommendations on October
21, 2026. This milestone improves provenance and answer presentation across the
existing library and prepares five specific editorial corrections. It does not
represent an independent expert review of 1,001 articles.

The source catalog is not an inventory of the mutable production database.
Published status, release acceptance, source screening, human editorial approval,
and independent expert review remain separate facts.

## Shared corrections

- Organizational article authorship replaces a prose byline typed as a Person
  in structured data. A named expert author is never inferred from free text.
- Explicit Yes/No answers are labeled separately from agreement strength.
  Conditional answers retain their qualifications; absence of evidence is not
  automatically converted to No.
- Recorded AI assistance is disclosed in a compact line beside the answer.
  Missing historical preparation records are identified as missing, not
  rewritten to imply either a human author or a verified research tool.
- The default generic reviewer and conflict-assessment assertions are replaced
  with accurate descriptions of missing records.
- Exact legacy topic-template scope and appraisal lists are no longer presented
  as work completed for an individual article. Individually recorded criteria
  and explicit assessment limitations remain available.
- Editor summaries no longer appear under the public answer. Original records
  and dated change history are preserved.
- FDA approval questions receive a United States regulatory-context label.
- The preparation policy now distinguishes content-first assistant screening,
  subsequent human moderation, and independent expert review. It no longer
  claims that every summary passed a human review before publication.

These public presentation corrections also handle existing legacy records,
without writing to the database or altering private editorial decisions.
Canonical source definitions receive the same metadata corrections for future
creation. The legacy definitions remain available only for compatibility with
previously approved, fingerprint-bound refresh operations.

## Five source-prepared corrections

Canonical slugs remain unchanged.

1. **Community water fluoridation:** narrow the title to cavity prevention,
   separate developmental uncertainty, classify the NTP monograph as a
   systematic review, and add the 2025 Taylor meta-analysis. Contemporary dental
   benefit and developmental associations are not given one blanket safety
   verdict.
2. **Nicotine e-cigarettes:** focus the question on adult smoking cessation,
   distinguish that outcome from long-term safety, update the Cochrane version,
   and add explicitly England-specific NHS guidance.
3. **Childhood vaccines and autism:** make the existing negative answer explicit,
   retaining its vaccine-specific qualifications and source set.
4. **Dietary supplements:** identify the United States in the question itself.
5. **Minimum wage:** remove the leading absolute and preserve the finding's
   limits across groups, places, sectors, and sizes of increase.

The two clinical updates use targeted discovery and selected original-source
verification, not a claimed systematic search, independent GRADE assessment,
complete conflicts audit, or fresh integrity clearance. They declare a
90-day surveillance cadence, but no live review schedule is created here.

### Source verification

- [Cochrane water-fluoridation review](https://doi.org/10.1002/14651858.CD010856.pub3).
- [NTP assessment](https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/fluoride).
- [Taylor et al., 2025](https://jamanetwork.com/journals/jamapediatrics/fullarticle/2828425).
- [Cochrane cessation review, August 2026](https://www.cochrane.org/evidence/CD010216_can-electronic-cigarettes-help-people-stop-smoking-and-do-they-have-any-unwanted-effects-when-used).
- [NHS England vaping guidance](https://www.nhs.uk/better-health/quit-smoking/ready-to-quit-smoking/vaping-to-quit-smoking/).

Consensus was used for discovery and its underlying records were fetched.
The Taylor record's generated takeaway reversed the exposure direction stated
in its abstract. That takeaway was not adopted. Interpretation was checked
against the original article and NTP assessment. Linked research alone does not
validate an automatically generated summary.

## Repeatable catalog audit

From the repository root:

    node --import tsx back-end/src/scripts/auditEditorialCatalog.ts 2026

The report includes every source-controlled article and flags candidate wording,
readability, jurisdiction, source-date, source-coverage, and clinical-maintenance
work. It uses an explicit reference year and makes no production or network
changes. Reading grades use heuristic syllable counts, not comprehension tests.

Flags are not automatic failures. Two excellent sources can suffice; missing
DOIs are not a defect for many reference types; old foundational physics
references need different treatment from old clinical evidence. No consensus
band is changed merely to create a more balanced distribution.

### No-change and follow-up findings

- Adult sleep duration, evening screen light, smaller classes, and daylight-saving
  clock changes already have dedicated source records. They must not be
  counted as missing solely because a different keyword was used.
- The two turbine-infrasound pages overlap, but one also addresses cancer.
  They are not interchangeable duplicates. Neither URL is deleted; a future
  consolidation requires a reviewed scope decision and redirect/identity plan.
- Evidence-landscape fields remain unpopulated where no actual coded
  assessment exists. No distribution, expert-agreement percentage, or formal
  appraisal is fabricated to make a panel appear.
- The owner-supplied analytics snapshot has no measurement window. It is not
  sufficient to claim current popularity or validate new reader demand.
- Further candidates include coffee outcomes beyond caffeine performance,
  autism diagnosis trends, BMI limitations, prolonged sitting, multivitamins,
  cold exposure and sauna outcomes, young children's screen use, wind/bird
  impacts, offset effectiveness, tariffs, drug decriminalization, trigger
  warnings, and implicit-bias measures. These require scoped questions and
  source verification, not automatic publication from a keyword gap.
- New and revised high-stakes material should be prioritized by potential harm,
  changing evidence, and actual reader questions, rather than by citation-count
  quotas or a target number of contested articles.

## Owner-approved automatic publication

Jacob subsequently instructed that content should publish first without a
separate protected editorial approval step. The five corrections therefore
ship as an explicitly approved, immutable source-bound release, not as a
manual moderation handoff.

After the complete source is committed and the working tree is clean:

    node --import tsx back-end/src/scripts/prepareEditorialAuditProposal.ts

This produces a source-bound, five-target proposal with a content digest,
expected source baselines, proposed fields, and citation changes. It contains
no production IDs, credentials, private records, backup claim, or publication
receipt. It refuses a dirty source tree.

The normal deployment enables the shared presentation corrections and runs
the narrowly scoped automatic publisher. Each article must match its known
scientific baseline. Divergent editorial content, archived records, and active
independent assessments are preserved instead of being overwritten.
Exact legacy uncertainty-template variants observed through anonymous public
readback are included in the bound baseline. Other wording is not accepted.

Application uses MongoDB transactions, preserves existing source IDs, notice
labels and URLs, check dates, publication and review dates, schedules, and
the existing private surveillance specification and unrelated private state.
A private ContentRelease receipt records the actual
system operation and before/after snapshots for recovery. Replays are read-only
and preserve later human edits. Existing authenticated edit protections remain
enabled; this release is not a general bypass for arbitrary source changes.

No manual editorial approval or production login by a source agent is needed.
Protected server-side deployment still owns activation. Public readback must
confirm the actual five corrections; a source release alone is not proof.

The existing 201-article approval digest and original 20-target transaction
registry remain unchanged. The new batch has its own approval identifier and
immutable content digest. A source cadence is not a completed review, and
existing follow-up dates are not silently replaced.

## Validation

Required checks include native lint, typecheck, frontend/backend/worker tests,
builds, source/public compatibility checks, and built-site desktop/mobile
accessibility, keyboard disclosure, and structured-data checks. The automatic
release rehearsal uses an isolated replica-set fixture and verifies signed
admin access, unchanged published-edit restrictions, complete citation identity
and notice preservation, rollback after an injected late transaction failure,
repeat application, and later human edits.

The guarded Oxlint preflight reports installed-version drift and is not used
as acceptance evidence. Native ESLint remains authoritative.

The existing dependency adapter test constructs a filesystem path with
URL.pathname, which retains percent-encoded spaces in this physical checkout.
Its local failure is recorded separately; it is not suppressed and unrelated
dependency source or test code is not changed. Exact-revision Linux CI must
run the full suite on its normal checkout path before integration.
