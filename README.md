<p align="center"><img src="assets/quotagrain-icon.png" alt="" width="96"></p>

<h1 align="center">QuotaGrain for Codex</h1>

<p align="center">English · <a href="README.zh-CN.md">中文</a></p>

QuotaGrain for Codex is a Mac menu bar app. See remaining quota and reset times for multiple Codex accounts in one panel, and open a separate desktop client from each account card.

**Version 1.0.4 is free to download. You can manage up to two accounts with no time limit.**

<p><strong><a href="https://github.com/seanye73/QuotaGrain-for-Codex/releases/latest/download/QuotaGrain-for-Codex-arm64.dmg">Free Mac download (DMG)</a></strong> · Apple Silicon · macOS 13 or later<br><a href="https://seanye73.github.io/QuotaGrain-for-Codex/">Website</a> · <a href="CHANGELOG.md">Release notes</a></p>

## See your accounts in one place

<p align="center">
  <img src="assets/quotagrain-overview-light-en.png" alt="Quota and usage in a single column" width="340">
</p>

- **Quota and reset times.** See remaining percentages, quota windows, reset times, and account errors in one panel.
- **Separate Codex clients.** Add, name, reorder, and open accounts with their own settings and session data. Keep multiple clients running side by side, including those configured for external APIs or local models.
- **Cloud APIs and local models.** Set an external API endpoint and model for its Codex client, and view locally recorded token totals.
- **Automatic refresh and alerts.** Refresh automatically, receive optional low-quota alerts, or refresh on demand.
- **An appearance that fits.** Use a light or dark appearance, or follow your Mac’s system setting. The interface follows your system language by default, with English and Chinese options. Choose a single-column or two-column panel.

External services must support **OpenAI Responses**. External API token totals come from local usage records and do not represent provider balances or remaining quota.

## More accounts at a glance

<p align="center">
  <img src="assets/quotagrain-grid-light-en.png" alt="Two-column account layout" width="360">
</p>

## Requirements and compatibility

- Apple Silicon Mac
- macOS 13 or later
- Codex installed for account sign-in and client launching

Use **Check for updates** in the app to look for a newer version. When one is available, open its GitHub download page and install the update manually.

QuotaGrain for Codex relies on existing Codex and macOS mechanisms. Upstream changes or restrictions may make some features unavailable. Future versions and system compatibility depend on actual releases.

QuotaGrain for Codex is distributed as a Developer ID-signed Mac app that has passed Apple notarization and Gatekeeper verification.

## Install

1. Download the DMG from [GitHub Releases](https://github.com/seanye73/QuotaGrain-for-Codex/releases/latest).
2. Open it and drag **QuotaGrain for Codex** into **Applications**.
3. Open the app from Applications, then eject the installation disk.

## Your data

### Stored on your Mac

Account registrations, settings, quota snapshots, and token totals stay on your Mac. Each account created through QuotaGrain for Codex has a separate directory under `~/.codex/accounts/`:

- **Account data.** Each directory holds that account’s configuration, authentication information, and session data.
- **Desktop client data.** Each client stores its data in the account directory’s `desktop/` subfolder.

Your existing default account data in `~/.codex` stays unchanged.

### Connections to your services

Quota checks send the necessary authentication information to ChatGPT in read-only requests. API model discovery and connection checks contact the provider you configure. Connection checks may make small test requests that incur provider charges.

Account credentials are not sent to the developer or written to usage logs. [Security and privacy](SECURITY.md)

<a id="support"></a>

## Accounts and activation

If you already have a key, open Support in the app, paste your key, and choose **Verify & Unlock**. [Existing orders and refunds](TERMS.md#refunds-and-order-help)

## Feedback

Questions? [Get in touch](mailto:x73.sean.ye@outlook.com).

QuotaGrain for Codex is an independently developed third-party tool. Codex, ChatGPT, and other product names are trademarks of their respective owners.
