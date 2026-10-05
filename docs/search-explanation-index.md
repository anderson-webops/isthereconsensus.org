# Public explanations in claim search

The claim index includes the canonical title, bottom line, editor summary,
stable-core paragraphs, misconceptions and public misconception tags. Both
public claim-directory and question-suggestion endpoints use this index only
after published status and source readiness checks. Private editorial notes,
submission identifiers and arbitrary document properties are not indexed.
Search results still link to the original reviewed claim and do not generate
an answer, change its scientific conclusion or modify its review dates.

Legacy records without the optional arrays remain searchable. Exact-title
priority, spelling tolerance, existing conceptual coverage checks and
unsupported-question protections are retained. No external model, remote query
service, dependency, query capture or new database field is introduced.
Personal requests to start, stop, switch or otherwise alter prescribed treatment
are declined rather than linked to incidental population-level evidence. General
treatment information and nonclinical personal questions remain searchable.

## Evaluation boundary

Eight focused index tests cover explanation/tag retrieval, legacy records,
unindexed private properties, exact-title priority and immutable source records.
The isolated compiled-backend reader rehearsal also exercises a stable-core-only
concept and rejection of personal treatment decisions through both real public
search endpoints, with unchanged serialization.

This is a necessary indexing correction, not completion of everyday-language
search. The first frozen development evaluation failed at three relevant
canonical top-three matches among 42 independently source-classified covered
questions. A controlled full-explanation probe improved that to only four,
while preserving the existing hundred-question regression benchmark and
unsupported controls. It does not meet the goal's 90% usefulness target.
The same probe also surfaced an unrelated prescribing-policy review for one
personal treatment-change request. That regression is retained in the probe
evidence and addressed by the general clinical-decision scope gate, not by
changing the question, its classification or the scientific review.

Two separate weighting probes were rejected: neutralizing unknown words or
capping their weights still missed most covered questions and incorrectly
returned reviews for a local weather-forecast request. Neither experimental
weighting change is included. The original frozen questions, classifications
and first failed result remain unchanged; those questions are now exposed
regression material, not a fresh held-out evaluation or a visitor study.

Further ordinary-language retrieval work and a separate genuinely fresh frozen
evaluation remain required. Source search tests also do not establish actual
public availability of the new library or its real reader workflows.
