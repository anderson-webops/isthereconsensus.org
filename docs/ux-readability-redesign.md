# UX readability redesign

Branch: `claude/ux-readability-redesign`

Goal: readers should get the answer first, see how sure it is without reading, and only open depth when they want it. The site should never feel like "a load of text you'll never get to read".

## What the audit found

Measured on the local build against the public API (desktop, 1280px):

| Page | Before | Problem |
| --- | --- | --- |
| Claim review (statins) | 4,900px, ~950 words | Verdict shown only as a small uppercase meta line. Title capped at 20ch, so it wraps to 4 lines and pushes the bottom line below the fold. Hero summary and bottom line repeat each other in two separate cards. No way to jump between sections. |
| Topic (health & medicine) | 14,965px, ~1,900 words | All 14 subtopic lists expanded at once, each with its own heading block, plus a duplicate index of the same 14 subtopics. |
| Home | 1,990px, ~170 words | Already concise. Verdict labels have no visual signal, and topics are a long single-column list. |
| Global | | Body text set in Space Grotesk, a display grotesk that tires the eye in long paragraphs. Header scrolls away on long pages. No skip link. |

## Design principles

1. **Answer first.** Question, verdict and bottom line share one card above the fold.
2. **Show certainty, don't describe it.** Verdicts get a colour and an icon. Certainty gets a four-step meter.
3. **Depth on demand.** Long lists collapse by default and show a summary (count, verdict mix) while closed.
4. **Always know where you are.** Sticky header, an "On this page" rail on claim pages, and deep links that open the right section.
5. **Readable type.** Public Sans for reading, Fraunces kept for headings, a 17px base on desktop, `text-wrap: balance`/`pretty`.

## Implemented on this branch

### Shared foundation
- `src/utils/verdict-tone.ts` maps every consensus label to one of five tones: strong, broad, debate, unclear, against. Tested in `test/verdict-tone.test.ts`.
- `app.vue` adds `--verdict-*` colour tokens for light and dark, plus shared `.verdict-pill`, `.verdict-dot` and `.certainty-meter` styles. The body font is now Public Sans. Anchor targets clear the sticky header via `scroll-padding-top`.
- Both layouts get a sticky, translucent header on tablet and desktop, an "=" brand mark matching the favicon, and a skip-to-content link.

### Claim review page
- **One answer card:** eyebrow, question (wider 30ch measure), verdict pill with icon, certainty meter, then the bottom line with the lead sentence emphasised. The card's top edge and tint follow the verdict colour.
- Save, Ask a follow-up and Edit sit inside the card. "Back to topic" is gone because the breadcrumb already does that job.
- Source count (linking to Sources), review date and the existing Review status disclosure move into a quiet card footer.
- **"On this page" navigation:** a sticky right rail at ≥1080px that highlights the current section. Below 1080px it becomes a horizontal chip row.
- Evidence blocks get icons: settled (check), open (question), traps (warning), change threshold (renew).
- Review scope stays fully visible, but Included and Excluded now sit side by side instead of as one long column.
- The uncertainty heading shows the certainty meter. Related reviews show verdict dots.

### Topic page
- Subtopics are now collapsible lanes. Each closed lane shows its title, a one-line description, a **verdict-mix bar** (how its claims split across tones) and a review count.
- "Expand all / Collapse all" control.
- `#collection-…` links, including the ones from claim pages, open and scroll to the right lane.
- Follow topic sits beside Ask in the header. Reading guides and comparisons move below the claim directory.
- Result: about 3,600px instead of about 15,000px.

### Home
- One-line verdict legend under the search, so the colours used everywhere are learned once.
- Recent reviews carry verdict dots. Topics are a responsive card grid.

### Test contract changes
Layout tests that pinned the old structure were updated to the new one, keeping their intent:
- `topic-page-layout.test.ts` asserts collapsible lanes, hash opening and the verdict mix, instead of the removed duplicate index nav.
- `claim-detail-layout.test.ts` and `home-entry-layout.test.ts` loosen exact-string anchors where a class or `id` was added, and update the mobile lead size (1.02rem → 1.14rem, so the answer is no longer smaller than its supporting text).

## Round 2: type, labels and organisation

A follow-up audit measured contrast, font sizes and weights, all-caps labels, line length and page height on 11 pages, in light and dark, at 1280px and 390px. Contrast already passed everywhere (≥5.06:1 light, ≥7.6:1 dark). The remaining problems were hierarchy, label noise and page organisation.

### Type scale and colour roles (`app.vue`)
- **Inverted hierarchy fixed.** The UnoCSS preflight resets headings, so any section `h2` a page did not size fell back to 17px regular, smaller than the 20px card titles under it. `.site-main` now gives h1, h2 and h3 defaults: page title, then `--type-section` (26px), then `--type-card` (18px), all Fraunces semibold. Page-specific rules still win.
- **Sentence-case labels.** `.eyebrow` and every reader-facing uppercase rule (verdict labels, meta rows, "Bottom line", the footer) are now sentence case at 13.5–14px, with no letter-spacing.
- **Fewer labels.** Eyebrows that only repeated the heading below them were removed: "Evidence" over "What the evidence says", "Common mistake" on every card, and others.
- **Lighter weights.** Navigation and metadata use 500. 600 is kept for titles, and 700 for the answer and the verdict.
- **Body colour.** `--consensus-body` is a darker reading tone mixed from ink and muted. It is used for long reading text: claim evidence points, bottom-line context, uncertainty, policy prose and standards lists. Grey is now for metadata only.
- **Measure.** Paragraphs and list items in `.site-main` default to `max-width: 72ch`.
- **Small text.** Counts and tags on claim pages were raised from 12–12.8px to 13.5px.

### Organisation
- **Learn hub.** `LearnNav` links Explainers, Reading guides, Comparisons and Common mistakes, and appears on all four pages. The header's "Explainers" item became **Learn**, which stays active on all four sections.
- **Header search** on every page except home, which already has a search hero. It routes to `/consensus?q=`.
- **Explainers** now start with the explainers. The ~20 guides and the comparisons list before them moved to their own pages (6,030px → 1,309px).
- **Guides and comparisons** are left-aligned like every other page and shown as compact card grids with two-line summaries (guides 6,408px → 2,717px, compare 2,723px → 1,712px).
- **Browse** shows topics as a card grid with a description and the verdict-mix bar (4,615px → 2,740px).
- **Consistent page headers.** Card-style headers on topic, explainers, misconceptions, standards, policy, terms, privacy, corrections, guidelines, source standards, explainer detail and account pages are now the same plain title-and-lead header.
- **Claim evidence lists** longer than four points show the first three, with a "Show all N points" button.
- `ReadingGuideLinks` and `ComparisonLinks` render as compact cards with near-black titles. Teal is kept for inline links and arrows.

### Verified
Lint, typecheck, 447 front-end unit tests (including a new `learn-navigation.test.ts`), production build, the axe accessibility smoke on every route in light and dark, and the SSR route and asset smokes.

## Round 3: glanceability limits

Applied the working limits from an evidence review of at-a-glance reading: about 3–4 decision-relevant facts per card, one main action plus one secondary, about 6–10 cards per labelled desktop group, critical content within the first two screens, and an overview that stays available. These are design rules of thumb, not proven cognitive constants.

- **Claim answer card trimmed** from about 8 facts and 6 controls to the question, one verdict line (verdict and certainty), the lead answer, one line of context, **Save** and an **Ask a follow-up** text link. The footer keeps one "Based on N sources" link and the review-status panel, which already holds the review date. The editor summary moved to introduce "What the evidence says". `LibraryAction` gained a `compact` option that drops its library link and scope label.
- **Browse topics and reading guides are grouped** into six labelled families (`src/data/topicFamilies.ts`): Health & medicine, Food, fitness & sleep, Earth & environment, Life & physical sciences, Society & policy, How science works. No family holds more than 9 topics.
- **Sticky section overview below 1080px.** The wrapping chip rows became one sticky "On this page" bar that names the current section, opens into the full list, and closes on selection. Section tracking is now scroll-based, so jumping straight to a section labels it correctly.
- **Header height is measured** while the header is sticky, so `--consensus-header-height` (used for anchor offsets and the sticky bar) stays correct when the header wraps. The tagline hides below 1080px, and the tablet header is tightened so it usually fits on one row.

## Still open
1. A keyboard search shortcut (⌘K) on top of the header search.
2. Show a one-line "strongest source" in the claim answer card, and collapse Tier 2+ source notes.
3. Animate `<details>` open and close where `interpolate-size` is supported, and add a reading-progress line on claim pages.
4. Apply verdict tones to search suggestions and the library page.
