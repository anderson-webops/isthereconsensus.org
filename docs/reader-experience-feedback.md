# Private answer and explanation feedback

Readers can separately report whether an explanation was easy to follow and
whether the review or comparison answered the question they came with. The
existing binary usefulness buttons and API payload remain compatible. The
optional form is initially closed, makes no selection for the reader and sends
only after explicit submission. Browsing without a question is a separate
answer-coverage choice, not silently counted as failure or success.

`POST /api/reader-feedback` accepts the additional `reader_experience` kind with
exactly one public canonical review ID or comparison slug, `clarity` and
`answerCoverage`. Both choices are bounded enums; no free text, question,
search query, identity, credentials or bot token is accepted in this kind.
The existing anonymous rate limit, daily keyed target/kind deduplication,
730-day retention and admin-only no-store queue apply. An experience rating
does not overwrite a legacy usefulness rating, and changing choices does not
allow repeated votes for the same target and day on one network.

Administrators see both choices separately and can filter by the new kind.
Ratings cannot be used as a private suggestion when creating a coverage-roadmap
entry, and no rating is automatically published or changes a scientific
conclusion. Shared networks may contribute only one signal per target/kind/day.
These are self-selected reader reports, not a comprehension test, representative
visitor-success rate, independent assessment or proof of search relevance.

No database migration or index change is needed: existing records remain valid,
and the new fields are additive and optional at the model level. Deploy backend
and frontend together before using the new form. Older clients continue to send
legacy usefulness payloads. Rolling back leaves the new private records intact;
the older client/API do not offer or accept the new submission kind. Do not
erase feedback merely to roll back. Existing public content is unchanged.

The expansion goal still requires the full public reviewed library, public
guides, moderated roadmap and follow-to-answer/update workflows, plus a passing
fresh retrieval evaluation and separate explanation-usefulness evidence. Adding
collection controls does not fabricate observations or complete those gates.
