<p align="center"><img src="assets/quotagrain-icon.png" alt="QuotaGrain for Codex" width="144"></p>

<h1 align="center">QuotaGrain for Codex</h1>

<p align="center"><strong>多个 Codex 账号，额度一眼看清。</strong></p>

<p align="center"><a href="README.md">English</a> · 中文</p>

<p align="center">
  <a href="https://github.com/seanye73/QuotaGrain-for-Codex/releases/latest"><img src="https://img.shields.io/github/v/release/seanye73/QuotaGrain-for-Codex?label=release" alt="Latest release"></a>
  <img src="https://img.shields.io/badge/macOS-13%2B-7250B5" alt="macOS 13+">
  <img src="https://img.shields.io/badge/chip-Apple%20Silicon-7250B5" alt="Apple Silicon">
</p>

<p align="center"><a href="https://seanye73.github.io/QuotaGrain-for-Codex/">官网</a> · <a href="#功能">功能</a> · <a href="#安装">安装</a> · <a href="#使用">使用</a> · <a href="#隐私">隐私</a> · <a href="#support">支持并解锁</a> · <a href="#反馈">反馈</a></p>

---

## 功能

QuotaGrain for Codex 是独立的 macOS 菜单栏工具，让你在一个面板查看多个 Codex 账号的额度，并打开各自独立的客户端。

<p align="center">
  <img src="https://raw.githubusercontent.com/seanye73/QuotaGrain-for-Codex/main/assets/quotagrain-overview-light-en.png" alt="单栏额度与用量" width="340">
</p>

- **额度一眼看清**：集中查看剩余额度、重置时间和账号异常。
- **多个客户端并行**：添加、命名、排序账号，从卡片打开各自独立的 Codex 客户端，配置和会话数据分别保存。
- **外部 API 与本地模型**：配置服务地址和模型，查看本地累计 Token。服务需兼容 OpenAI Responses；统计不代表服务商余额、剩余额度或账单。
- **自动刷新与提醒**：自动更新额度，按需开启低额度提醒，也可手动刷新。
- **适合你的界面**：单栏、双栏布局，浅色、深色或跟随系统；首次默认跟随系统语言，也可选择中文或英文。

## 双栏查看多个账号

<p align="center">
  <img src="https://raw.githubusercontent.com/seanye73/QuotaGrain-for-Codex/main/assets/quotagrain-grid-light-en.png" alt="双栏账号布局" width="360">
</p>

## 安装

需要 **Apple Silicon Mac、macOS 13 或更高版本**，登录账号和打开客户端需要安装 Codex。

1. 从 [GitHub Releases](https://github.com/seanye73/QuotaGrain-for-Codex/releases/latest) 下载 DMG。
2. 打开安装包，将 **QuotaGrain for Codex** 拖进 **Applications（应用程序）**。
3. 从应用程序打开，再推出安装磁盘。

安装包已使用 Developer ID 签名，并通过 Apple 公证和 Gatekeeper 验证。可在 App 中“检查更新”，发现新版后前往 GitHub 下载并手动安装。

QuotaGrain for Codex 依赖 Codex 与 macOS 的现有机制。上游变更或限制可能导致部分功能不可用；后续版本与系统兼容性以实际发行情况为准。

## 使用

添加账号 → 登录或配置外部 API → 查看额度或 Token → 从账号卡片打开 Codex。

QuotaGrain for Codex 使用独立的 App、进程与菜单栏图标。多个客户端可并行运行，各自保留配置、认证信息与会话数据。

## 隐私

账号登记、设置、额度快照和 Token 汇总保存在本机。通过软件新建的账号保存在 `~/.codex/accounts/` 下各自的目录，客户端数据保存在该目录的 `desktop/` 子目录。原有 `~/.codex` 默认账号数据保持原样。

额度查询以只读请求访问 ChatGPT；外部 API 的模型发现和连接检查访问你指定的服务商，必要的连接测试可能产生服务商费用。账号凭据不发送给作者，也不写入用量日志。详见[隐私说明](SECURITY.md)。

<a id="support"></a>

[支持并解锁 — US$9.99，一次性购买](https://pancake.waffo.ai/store/x73-sean-g4egu1yo/product/PROD_6GpPKyX4WD8sRXevvY38cz?type=onetime&currency=USD)

[权益与购买条款](https://seanye73.github.io/QuotaGrain-for-Codex/terms/)

## 反馈

欢迎[通过邮箱联系 Sean Ye（@seanye73）](mailto:x73.sean.ye@outlook.com)。请简要说明问题、当前 App 版本及“关于”中的构建号，并附上相关截图或凭证。

QuotaGrain for Codex 是独立开发的第三方工具。相关产品名称的商标归各自权利人所有。
