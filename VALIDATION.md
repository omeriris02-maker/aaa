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

## 2026-10-15 — Cloudflare and free-model comparison

- Added server-only Cloudflare Workers AI credentials (encrypted token + 32-hex Account ID); separate explicit Workers Free/no purchased credits confirmation. Account billing tier is asserted by the owner, not remotely inspected by this token.
- Fixed host/account route, strict inference allowlist: Llama 3.3 70B Instruct FP8 Fast and Mistral Small 3.1 24B Instruct. Paid-required frontier model IDs rejected at call time, even if a DB row is incorrectly labeled free.
- Added persistent comparison worker: up to 12 unique free model identities, 3 calls each, no DeepSeek. Records raw replies, heuristic check results and elapsed time in model metadata. Failed comparisons disable a model; successful results influence selection. Scores are limited automated checks, not model intelligence rankings.
- 33 automated tests passed. Mobile form browser fixture passed, including cleared token/no localStorage/no overflow. Real local PostgreSQL worker integration with MOCK inference passed: 2 models × 3 calls, saved quality results, zero paid calls or cost rows. No user API credentials used in local tests.
- Live Cloudflare authentication/inference and real comparison results remain unverified until the owner connects an account and starts the comparison from their authenticated app session. No user password/session is available to this coding environment.
- Official provider research: research/2026-10-15-provider-audit.md. GitHub Models retired and Ollama free access conditional; neither newly enabled.

## OpenCode free DeepSeek integration

Official OpenCode repository documentation confirms `deepseek-v4.1-flash-free`, free input/output, direct inference API, and anonymous access for free chat models. Added only this model, fixed endpoint, no Authorization header or credential lookup, no paid OpenCode IDs. It joins panel/benchmark selection as a distinct identity; paid direct DeepSeek remains the referee. First production startup after adding this provider performs one anonymous small health call if the owner already confirmed free usage. A model is enabled only after a complete visible response. Local environment direct OpenCode requests returned HTTP 403; this is not a successful live inference test. Runtime logs record whether the Render health call succeeds. Mock provider and real local Postgres integration cover the keyless route and zero paid costs.

Sources: https://github.com/anomalyco/opencode/blob/dev/services/www/src/docs/content/console/models.mdx and https://github.com/anomalyco/opencode/blob/dev/services/www/src/docs/content/console/api/inference.mdx . Free offer is temporary; no expiration date guaranteed.

## Correction: OpenCode free tier restriction and quality-first roles

Further investigation obtained the actual API error through the official `/zen/v1/chat/completions` compatibility endpoint, with an honest CouncilAI User-Agent and no credentials. The response was HTTP 403 JSON: `FreeTierError: OpenCode's free tier can only be used from within OpenCode. Download it at https://opencode.ai and keep building.` This overrides the earlier inference that anonymous availability in the documentation made the free model usable by Council AI. No attempts to impersonate OpenCode or bypass this restriction were made. Removed the startup probe and provider from discovery/benchmarks; production initialization disables the old model row and marks it unsupported. The UI now gives the application-use restriction explicitly. Paid direct DeepSeek referee integration is unchanged.

The owner selected quality-first controlled model reuse. Eight or more roles now use a pool of up to four distinct eligible models, ranked by measured precheck results when available and documented candidate preference otherwise. At least two distinct models are required. Shared models are reported honestly and not independent evidence. A strict unique-model option remains in referee settings. Canonical identity is stored on new messages for consistent counts across providers. Existing studies retain their original policy.

39 automated tests passed; mobile chat/Cloudflare browser fixtures and local Postgres benchmark with MOCK inference passed. No real model quality score is claimed from those fixtures. OpenCode free integration is not operational in Council AI by provider policy, rather than merely an unexplained network failure.
