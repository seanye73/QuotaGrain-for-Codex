# Security and Privacy

QuotaGrain for Codex is a local-first macOS app. This document describes the data the current app reads, stores, and sends.

## Data flows

### 1. ChatGPT quota requests

For each registered ChatGPT/Codex account, QuotaGrain for Codex reads the account's local `auth.json` only to obtain the authentication fields required for read-only requests to:

- `https://chatgpt.com/backend-api/wham/usage`
- `https://chatgpt.com/backend-api/wham/profiles/me`

Those credentials are sent to ChatGPT as part of the request. They are not sent to the QuotaGrain for Codex author or included in logs and documentation.

QuotaGrain for Codex reads quota windows, reset information, plan metadata, and the account display name returned by these endpoints. It does not use this path to modify the account or redeem quota resets.

### 2. External API model discovery and connection verification

When a user adds an OpenAI-compatible API instance, QuotaGrain for Codex sends the supplied API Key to that provider's configured `/models` endpoint to retrieve the model list. During refresh, it also uses the account's saved API Key (if present) at the same endpoint to check whether the configured model is listed, for both local and remote providers. Discovery itself is read-only.

If the model is absent, the list is empty, or discovery returns HTTP 404/405, refresh automatically verifies the original model at the configured `/responses` endpoint. This inference request uses only the fixed input `Reply OK.`, a 32-output-token limit, `stream=false`, and `store=false`. It sends no user conversation or tools, refuses redirects, and may incur a small provider charge. Success is cached in memory for 30 minutes and failure for 60 seconds per endpoint, model, and credential fingerprint; concurrent probes are combined. Raw credentials and response bodies are not logged by this check. The provider receives these requests under its own privacy policy; `store=false` is a request parameter, not a guarantee about provider retention. These probes do not enter Codex session logs and are not included in the local cumulative Token counter. A green indicator is connection evidence, not a provider balance measurement or a guarantee that future requests will succeed.

The revised implementation stores each managed account's API Key in that account's native Codex `auth.json`, with owner-only file permissions (`0600`). Provider and model configuration lives beside it in `config.toml`. Import reuses an existing local API credential when available. Non-secret registration metadata remains in Application Support. Legacy accounts may still use macOS Keychain until migrated.

### 3. Local token counting for external instances

QuotaGrain for Codex calculates external-instance token totals by read-only scanning that isolated Codex home's:

- `sessions/`
- `archived_sessions/`
- thread records in `state_5.sqlite`

It parses token-count fields only. It does not parse, display, index, or save chat message text. The resulting aggregate token totals stay on the Mac.

### 4. Activation and licensing

Waffo Pancake handles payment on its hosted checkout. The app opens the product’s GitHub support section, which links to the current website and purchase information. It supports encrypted purchase-code redemption through the configured activation service and direct import of device-bound signed license artifacts from X73 Workbench. Verification uses public keys compiled into the app, checks the product and current Mac binding, and verifies the signed validity period. No merchant or signing private key is bundled in the app or static website.

New device credentials and the original code needed for renewal are saved together in one dedicated, non-synchronizing, device-only macOS Keychain entry through the bundled helper. The app verifies saved credentials locally and periodically contacts the activation service to validate and renew authorization. Activation and renewal send the original code, product ID, product-scoped device binding, and device name/model/system information to the configured activation service over the encrypted activation protocol. An authenticated signed revocation disables the entitlement; ordinary network errors retain it until the saved credential expires. After successfully saving a new managed credential, the app sends its SHA-256 digest with the same activation fields to the same configured service to acknowledge storage. A failed acknowledgement is retried separately and does not change authorization or the saved expiry. The pending acknowledgement is stored in the same device-only Keychain entry and removed after a matching reply. This also applies to a managed permanent conversion; it does not impose renewal on that permanent credential. Historical permanent credentials retain their original validity. A device request contains a product-scoped SHA-256 digest of the platform UUID; the raw UUID is not exported. The internal local test-clear command deletes only the activation artifact, preserving account data and device identity. It does not release an issuer-side device allocation or invalidate copies of an issued artifact.


Waffo handles checkout and payment data; QuotaGrain for Codex will not receive or store card details. Payment completion alone does not unlock the app.

### 5. Checking for app updates

When you choose Check for updates, the app fetches the public version manifest from `https://raw.githubusercontent.com/seanye73/QuotaGrain-for-Codex/main/update.json`. GitHub receives the normal network request, including your IP address. The app does not attach account credentials, license keys, device binding, or usage data. It compares versions locally. A newer release offers a link to this product’s GitHub Releases page; the app does not download or install updates automatically.

## Local storage

QuotaGrain for Codex stores only the local data required for its features, including:

- registered account order and non-secret account metadata;
- display, refresh, alert, and launch preferences;
- redacted quota snapshots and local token totals;
- API Keys in each managed Codex account directory (legacy Keychain credentials remain during migration);
- Activation records in macOS Keychain.

Quota history contains quota values and timestamps, not chat text. Failure to read or write history does not block live quota refresh.

## Process and profile isolation

Each managed Codex account uses its own `CODEX_HOME` and browser profile. QuotaGrain for Codex opens or focuses that isolated client without copying credentials between accounts.

QuotaGrain for Codex is an independent menu bar app with its own Bundle ID, process, and status item. Its visibility does not depend on ChatGPT, Codex, or another app.

## Logs and QA evidence

Logs, screenshots, issue reports, and QA records must not contain `auth.json` contents, API Keys, License Keys, order details, customer information, device identifiers, or private filesystem paths. QA evidence is redacted before it is retained.

## Reporting a security issue

Report security issues privately to [x73.sean.ye@outlook.com](mailto:x73.sean.ye@outlook.com). Include the app version and the minimum steps needed to reproduce the issue.

Do not include credentials, License Keys, order records, or chat content in a report.

## Authorization recovery

Some signed credentials include a one-time recovery grace period. Its use is recorded locally in Keychain and retained when local activation is cleared; this introduces no additional uploaded fields. When authorization expires, the app retries the existing activation service more frequently to restore access. Historical permanent credentials retain their original validity.
