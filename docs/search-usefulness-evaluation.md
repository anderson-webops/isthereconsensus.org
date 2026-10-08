# Public search usefulness evaluation

This read-only evaluator checks both reader search surfaces against frozen
questions and preassigned canonical destinations. It uses the actual public
APIs and verifies each returned or expected review through its anonymous API
and rendered page. A source-only review, missing page, unrelated destination,
redirect, transport failure, or rate limit cannot become a successful answer.

Run from the repository root with the pinned Node runtime:

```sh
npm exec -w back-end -- tsx src/scripts/evaluateSearchUsefulness.ts --dataset /absolute/path/questions.json --origin https://isthereconsensus.org --output /absolute/path/result.json
```

For an isolated synthetic server, use an explicit loopback origin and optionally
`--interval-ms 0`. Public runs require at least three seconds between questions;
individual HTTP requests are also paced. Requests are GET-only, omit
credentials, do not follow redirects, have a ten-second timeout, and reject
responses larger than two MiB. Do not run concurrent public evaluations or
reduce server rate limits. HTTP errors remain unavailable observations.

## Frozen dataset format

Use only deliberately approved public or synthetic questions, never copied
private submissions, credentials, reset links, or personal account data.
`publicQueries: true` records that choice; it is not an automatic privacy scan.
Unknown fields are rejected. Keep the original frozen file and its checksum.

```json
{
	"schemaVersion": 1,
	"publicQueries": true,
	"provenance": {
		"kind": "development",
		"author": "assistant",
		"contextExposure": "development",
		"frozenAt": "2026-10-06T00:00:00Z",
		"baselineSourceCommit": "fae8ee8fb3bc8782ce9800ee88a8af742074b307"
	},
	"questions": [
		{
			"id": "covered-example",
			"query": "Does coffee stop working with regular use?",
			"classification": "covered",
			"expected": [
				{
					"topicSlug": "nutrition-and-diet",
					"claimSlug": "does-caffeine-become-less-effective-with-regular-daily-use"
				}
			]
		},
		{
			"id": "outside-example",
			"query": "Which train should I board this afternoon?",
			"classification": "outside",
			"expected": []
		}
	]
}
```

Keep covered, partial, gap, and outside questions in the same report. Covered
questions require expected destinations. Partial questions can record a
related destination but never count as covered successes. Gap and outside
questions cannot contain expected answers. Duplicate identifiers or wording,
overlong queries, and unsafe origins are rejected rather than silently altered.

## Interpret the result

- The mechanical gate requires at least 90% canonical top-three matches on
  **both** search surfaces, all outside controls empty, and no unavailable
  searches or unreadable expected/returned destinations. Repeated results keep
  their actual rank positions; they do not promote a fourth result into third.
- Counts, original wording, misses, partial coverage, gaps, publication failures,
  and both denominators stay visible. Operational evaluation counts are not
  whole-library marketing claims.
- The report hashes the validated dataset; the CLI also hashes the original file
  bytes. It records declared provenance and, when available, independently
  observed frontend release identity. That does not establish backend identity.
  `fresh-candidate` requires `contextExposure: unexposed`; neither declaration
  certifies independent authorship or freshness. Once inspected for tuning,
  freeze that set as development material and use a genuinely new set later.
- A matching title and bottom-line paragraph in rendered HTML checks delivery,
  not scientific correctness, human comprehension, responsive layout, or
  accessibility. Those require separate source/body assessment and reader
  review. A passed mechanical gate alone does not complete the site goal.
- Exit 0 means the mechanical gate passed, exit 1 means it did not, and exit 2
  means invalid input or a tool failure. Reports omit raw API bodies, response
  headers, cookies, and private extra fields. An explicit output file is created
  with owner-only permissions and must not already exist. Existing files and
  symbolic links are never overwritten.

The original exposed question set and failed scores remain development
evidence. Semantic search experiments are not deployed search and do not
replace this end-to-end check or the separate fresh-usefulness requirement.

See [the development and fresh-question record](search-usefulness-development-record.md)
for rejected approaches and retained numerical-reference failures. The
[external coverage audit](search-usefulness-external-audit.md) now records all
72 pre-scoring classifications. Its strict input is validated, but none of
the questions has a complete covered answer under the unchanged scope rule.
There is therefore no covered-score denominator: this sample cannot certify
the 90-percent goal, and partial destinations cannot be counted as successes.
Its first complete public run is retained separately: both APIs completed all
72 rows without unavailable or unreadable observations, but neither found a
preassigned partial destination. No relabeling or denominator replacement was
used to turn that result into a passing assessment.
