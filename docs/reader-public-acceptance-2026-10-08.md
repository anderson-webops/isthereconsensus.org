# Public reader-library readback, October 8, 2026

## Outcome

An anonymous, complete public readback ran from 20:01:54 to 20:21:41 UTC.
The public frontend identified itself consistently as v1.38.23, source
`39ab72622b9e68bd5e8ca2ae84444c2ae6d3dc67`, build
`80051164-5dbd-492d-8738-b1fd19945789`. This is frontend delivery evidence,
not backend/worker activation evidence or an editorial publication receipt.

| Public acceptance check | Observed result |
| --- | --- |
| Complete catalog, eight pages of 100 | 800 distinct published canonical reviews |
| Every proposed expansion API | 0 public; all 201 returned HTTP 404 |
| Complete sourced guide bodies | 31 of 31 readable and discoverable |
| Guide paragraphs | 372 full paragraphs, 29,897 words |
| Guide source entries | 343, with paragraph citations and full qualifications |
| Connected-review references | 277: 77 published links and 200 unlinked not-published references |
| Unique advertised existing reviews | 74 API/page pairs returned HTTP 200 |
| Approved public roadmap summaries | 0 |
| Requests unavailable or rate-limited | 0 of 395 |
| Whole-library marketing | No premature `1000+ reviewed claims` claim |

There are fourteen public guides above the original seventeen-guide baseline.
The complete-guide delivery check exceeds the eight-guide minimum. It does not
complete the whole goal: the 201 proposed new reviews, public roadmap activity,
fresh covered-question search acceptance, and genuine explanation-usefulness
evidence remain pending. A 404 proves that a review is not publicly available,
not its private database status or editorial readiness.

## Method and limits

The readback used sequential, paced, same-origin HTTPS GETs without credentials,
cookies, redirects, editorial calls, private feedback access, or site-script
execution. HTML parsing examined actual article paragraphs and citation anchors,
not just serialized hydration data. Ten synthetic controls preceded the readback.
Guide checks covered full text, takeaways, scope, limits, recorded dates,
paragraph citation IDs, source URLs, canonical/Article metadata, directory links,
sitemap entries, connected-review guards, and an unknown-guide 404 control.
Every guide exceeded 500 rendered paragraph words. This checks delivery of
recorded evidence, not a new literature or correction/retraction search.

All 201 expansion routes were checked separately from the public catalog.
All 74 distinct existing reviews advertised by the guides had both their API
and rendered route checked. The audit made no production changes and returned
a failed overall acceptance result. No failed or missing review was excluded
to make the goal appear complete.

The original report remains unchanged, SHA-256
`6506e76f68348f08dfadee88c131091ffa5c8ff32d03f06716c892dcdec68ebc`.
Its HTML parser remains unchanged, SHA-256
`e60516f6b8944a6ab39da7d48450367b3f2fb1e38735e1d6750a6b3fe401d56e`.
Retained local evidence is indexed under the owning public-library-audit run.

## Review-scope omission and verifier limitation

The original existing-review text check reported 0 of 74 complete matches.
This must not be presented as proof that all 74 articles lack their bottom lines:
the verifier joins adjacent block paragraphs without adding a separator, while
the page intentionally renders the lead answer and supporting context in
separate paragraphs. Its old field checklist also used `activeDebates`, rather
than the public API's `openQuestions`, and was not a complete article-body audit.
Those limitations are preserved alongside the failed result, not silently
reclassified as successful full-text acceptance.

A separate source/API/rendering diagnosis confirmed a genuine omission:
`inclusionRules` and `exclusionRules` were returned by the public API but never
rendered by the claim page. The reviewed water-filter example returned two
included and two excluded criteria; none appeared in the page's visible body.
The bottom-line lead/context split itself is not an application defect.

The focused source correction exposes these existing criteria as **Scope of
this review**, with separate **Included evidence** and **Excluded evidence**
lists before the uncertainty section. It does not change conclusions, scientific
content, source dates, ranking, publication status, or private-data boundaries.
Missing legacy criteria produce no invented scope statement. Full long criteria
remain plain text rather than executable HTML or shortened summaries.

Native regression coverage includes missing/blank criteria, ordering, repeated
rules, input immutability, full long/markup-containing criteria, server-rendered
and hydrated visibility, legacy absence, and 320-pixel/200-percent text layout.
The existing complete 201-review disposable browser workflow now compares both
full scope lists against the canonical source for every review. Local fixture
publication remains distinct from protected production publication.

## Source validation

The focused correction passes a genuine strict root clean install, install-script
policy, full and production dependency audits (zero advisories), lint, typecheck,
all 986 native tests (435 frontend, 502 backend, 26 worker and 23 helpers), build,
31 native-lock checks, backend runtime and both SSR smoke checks. All 256
light/dark accessibility route cases pass; the scope fixtures additionally check
320-pixel/200-percent text, full SSR criteria, hydrated criteria and escaped text.
Initial sandbox attempts failed DNS access during installation and local listener
permission during tests. The same canonical commands passed after access was
authorized; failed attempts were retained, not counted as passing or replaced
with an install fallback. Source/CI integration and public activation are
separate checks; this record does not establish delivery of the scope correction.

## Next protected action

Use the existing [publication runbook](reader-expansion-publication-runbook.md)
for the full 201-review batch, retaining its backup, restore test, authenticated
editing, full rehearsal, integrity safeguards, and complete public readback.
Do not republish the already-completed twenty-review living-evidence refresh.
Source agents must not connect administratively to production or publish its
data. The roadmap must contain only deliberately approved summaries; the empty
public roadmap is not permission to fabricate reader requests.
