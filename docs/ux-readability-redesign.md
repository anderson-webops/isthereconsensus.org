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

## Proposed next phases (not built yet)

1. **Explainers and guides indexes** (~1,000 and ~750 words, 14 and 31 `h2`s). Apply the same collapsible lane pattern, or a filterable card grid with category chips.
2. **Header search.** A compact search field or command palette (⌘K) in the sticky header, so readers can jump to another claim from any page, not just the home page.
3. **Claim page sources.** Show a one-line "strongest source" in the answer card, and collapse Tier 2+ source notes to the title and publisher.
4. **Policy and standards pages.** Lead with a three-item summary card and move the full text below a "Read the full policy" disclosure.
5. **Verdict tone everywhere.** Apply `verdictTone` in `consensus/index.vue`, search suggestions and the library page so colour meaning stays consistent.
6. **Motion and polish.** Animate the open and close of `<details>` (using `interpolate-size` where supported), and add a subtle reading-progress line under the sticky header on claim pages.
