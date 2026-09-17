# Changelog

User-facing version notes for QuotaGrain for Codex.

## 1.0.0 (build 40)

- The in-app Support & unlock action opens the verified Waffo Live checkout directly.
- Merchant credentials remain outside the signed app.

## 1.0.0

- Native macOS quota monitoring without a bundled Python runtime or developer-tool installation.
- Developer ID-signed and Apple-notarized distribution with a drag-to-Applications DMG for Apple Silicon Macs running macOS 13 or later.
- Interface language defaults to Follow System, with Chinese and English choices in a dedicated settings page.
- Improved empty-account layout and activation loading at startup.
- Prevented interactive Keychain password prompts during activation checks while preserving inaccessible existing credentials.
- Retained the free two-account limit and signed device-bound authorization for unlimited accounts.

## 0.4.0

### Added

- External API and local-model accounts through Responses-compatible services, with model discovery, connection checks and local token totals.
- Account archiving, with account settings and session data preserved for later use.
- An included runtime for quota checks, without requiring users to install Python or developer tools.

### Changed

- Unified the product name as QuotaGrain for Codex while preserving its independent menu bar identity and existing local data.
- Free use supports 2 accounts. Support unlocks unlimited accounts, with a cumulative limit of 2 Macs per license key. Deactivation does not reset the total; device replacement support is not included.
- Automatic refresh, quota alerts and privacy protections remain the same for everyone.
- The support button opens the product’s GitHub support section, linking to current purchase information.
- Clarified provider connection tests and potential charges in the privacy notice. Local token totals do not represent provider balances or bills.

### Fixed

- Kept registered accounts when authorization becomes unavailable, limiting only the currently usable account count.
- Improved activation storage, recovery after temporary service failures and reuse of the same device’s activation.
- Improved account cards, English labels and panel layout.
- Corrected external API reasoning settings for supported provider configurations.

## 0.3.1 — 2026-09-02

### Added

- Added browser-based Codex sign-in for isolated accounts and direct account-card launch actions.
- Added 15-minute automatic refresh, optional quota alerts, English/Chinese UI, and single/two-column layouts.
- Added settings and an About view.

### Changed

- Improved card hierarchy, drag reordering, inline renaming, scrolling, and detached-panel behavior.
- Used service-returned quota windows instead of inferring missing windows from plan names.

### Fixed

- Restored the independent menu bar status item and stable autosave identity.
- Marked cached fast-refresh data as stale after failures.
- Fixed notification text, rename behavior, layout switching, clipping, and build coverage for the App launch path.

## 0.3.0 — 2026-08-23

### Added

- Added drag reordering, local account names, startup settings, detached-panel mode, and a maintained changelog.

### Changed

- Parsed quota windows dynamically, refreshed accounts concurrently while preserving order, and retained redacted quota history locally.
- Refined compact layouts, typography, card balance, and scrolling.

### Fixed

- Unified version metadata, enforced build signature checks, and fixed several card-drag and panel-layout issues.

## 0.2.0

- Rebuilt the app as a multi-account Codex quota menu bar panel.
- Added default and isolated `CODEX_HOME` discovery, manual account import, startup behavior, scaling, and detached-panel mode.
- Kept quota reads read-only and excluded project and chat content.
