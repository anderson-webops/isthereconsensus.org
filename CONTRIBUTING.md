# Contributing

Thanks for wanting to improve `isthereconsensus.org`. This project is public-facing and evidence-sensitive, so contributions need to preserve reader trust before they optimize for speed or reach.

## What Helps

- Fixes that make reviewed claim pages clearer, more inspectable, or more accessible.
- Source-stack improvements that add durable identifiers such as DOI, PMID, PMCID, or official URLs.
- Backend evidence-provider work that keeps discovery and metadata separate from editorial judgment.
- Tests, accessibility fixes, and deployment reproducibility improvements.
- Plain-language copy edits that reduce overclaiming, medical advice risk, or false certainty.

## Evidence And Editorial Boundaries

- Do not use external APIs, LLMs, or community voting to automatically decide the consensus conclusion, certainty label, or public bottom line.
- Prefer guidelines, consensus statements, regulator reviews, assessment reports, systematic reviews, and meta-analyses before isolated papers.
- Mark live debate and thin evidence directly instead of forcing a false answer.
- Keep medical, safety, legal, and public-health claims conservative; if in doubt, narrow the claim or require expert review.
- Disclose conflicts, advocacy roles, funding ties, or institutional interests when they could reasonably affect trust.

## Development Workflow

Use Node and npm from the root workspace:

```bash
npm ci
npm run dev
```

Run the backend separately when working on API-backed flows:

```bash
npm run -w back-end server
```

Before opening a pull request, run:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run smoke:ssr-assets
npm run smoke:ssr-routes
npm run a11y
npm test
npm audit
```

## Pull Request Expectations

- Explain the user-facing or operational problem being fixed.
- Include validation commands and results.
- Keep `package-lock.json` synchronized with any dependency or workspace package changes.
- Avoid bundling unrelated copy, design, dependency, and backend changes into one PR.
- Do not include secrets, production data exports, private diagnostics keys, or unpublished user/community submissions.

## Copy Style

- Lead with the bottom line, then show uncertainty and source context.
- Avoid preachy, adversarial, or culture-war framing.
- Avoid saying “science says” when the stronger claim is “the current evidence base supports.”
- Say what is unknown when uncertainty matters.
- Keep public discussion separate from reviewed consensus judgments.
