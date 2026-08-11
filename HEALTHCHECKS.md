# Health Checks

Use these endpoints for monitoring. They do not require auth and do not redirect.

## Front-end (Nuxt SSR)
- `GET` or `HEAD /healthz`
  - returns `200` with exactly `{"ok":true}` for `GET` and an empty body for `HEAD`
- `GET` or `HEAD /readyz`
  - returns `200` with exactly `{"ok":true}` for `GET` and an empty body for `HEAD`
  - the frontend has no external runtime dependency; public routing normally sends these paths to the backend

## Back-end (Express API)
- `GET` or `HEAD /healthz`
  - returns `200` with exactly `{"ok":true}` for `GET` and an empty body for `HEAD`
- `GET` or `HEAD /readyz`
  - returns `200` with exactly `{"ok":true}` when required dependencies are ready
  - returns `503` with exactly `{"ok":false}` when they are unavailable
  - `HEAD` returns the same status with an empty body
- `GET /_dbinfo`
  - internal diagnostics only
  - returns non-secret database metadata when allowed
  - returns `403 {"ok":false,"error":"forbidden"}` for public requests without internal access

Every probe sets `Cache-Control: no-store` and returns no cookies, redirects,
authentication challenges, secrets, dependency names, host details, process
metrics, or environment information. Use `/healthz` and `/readyz` for monitors.
Do not use `/`, login pages, or `/_dbinfo`.
