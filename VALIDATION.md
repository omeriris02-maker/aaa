# Council AI — validation and deployment status

2026-10-14. Independent migration from Floot to Render.

Live initial deployment: https://council-ai-omer.onrender.com
Source branch: https://github.com/omeriris02-maker/aaa/tree/council-ai-platform

## Verified

- Node syntax checks and 9 core tests pass.
- Actual local PostgreSQL integration: owner bootstrap, cookie session, unauthorized access, CSRF, encrypted credential save/remove, no credential values in status, demo history (24 events), logout.
- Actual Chromium at 412×915: no horizontal page overflow, 8 role cards, hotel demo gives 97.37 and 97.88, 24 debate records.
- MOCK provider integration: 8 research + 8 critique + 8 revision + DeepSeek dispatch, injected HTTP503 retry and FREE-model fallback, source distribution, recorded budget/usage and persistent history. NOT real inference.
- Initial Render deployment reported live and root returned HTTP200.

## Not yet verified on Render

- DATABASE_URL is not connected. Database created separately; connected tools do not expose its credential URL. User must set it in Render's secure Environment screen.
- User must activate their account using the private bootstrap link and enter provider keys in the app's HTTPS connection forms. Floot secrets were not exported.
- No live panel, Tavily, or DeepSeek requests have run on this new server yet. Earlier successful real provider tests were on Floot and are not counted as Render tests.
- Latest source updates were queued in Render's automatic deployment, not yet reported live at the last check.

## Hosting limits

The current service is FREE trial hosting, not always-on production. It sleeps when idle. Free PostgreSQL expires 2026-11-13. No paid hosting plan was authorized or enabled. DeepSeek monthly default limit is $5; token/tariff calculations are not an invoice reconciliation.

## Security

Opaque HttpOnly/Secure/SameSite session cookies, per-IP persisted login attempt controls, CSRF origin checks, owner-only single-use bootstrap, AES-256-GCM credential encryption bound to provider, root key in Render secret environment, no client-returned secret values, parameterized SQL, fixed provider URLs, free-only panel and no paid fallback, bounded turns and 14-minute run limit, conservative reservation for unknown paid timeout.

Test mocks exist only in ignored local artifacts; normal production start does not import them.
