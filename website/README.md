# QuotaGrain for Codex 静态官网

官网采用上线后的产品文案，提供功能、界面展示、价格、累计设备规则、隐私、条款和下载入口。实际签名公证、远端可达和支付验收由根目录 RELEASE.md 管理，页面文案不充当验收证据。

## 链接与支付模式

- 产品：`https://github.com/seanye73/QuotaGrain-for-Codex`。
- App 固定支持入口：上述地址加 `#support`，公开 README 提供正式购买与官网条款链接。
- 已部署官网：`https://seanye73.github.io/QuotaGrain-for-Codex/`。
- 下载：产品仓库的 `/releases/latest/download/QuotaGrain-for-Codex-arm64.dmg` 稳定直链；每个正式 Release 继续使用同一无版本号的 DMG 文件名。
- 托管适用性作为运营复核项保留，不把部署成功当作用途许可；若改用其他适用托管，只更新 README 官网链接及本站 URL，不修改已公证 App。

`app/checkout.ts` 只控制网页链接，不参与设备授权。模式通过静态构建显式选择：

| 模式 | 页面行为 | 用途 |
| --- | --- | --- |
| contact（默认） | 价格与权益照常展示，支持入口指向 GitHub 产品页 `#support` | 支付平台未配置时的公开产品信息 |
| test | 已授权 Waffo Test 商品 | 本地测试；禁止生成可索引导出 |
| live | 显式核验后的正式 Waffo 商品 URL | 正式支付验收和开放授权后部署 |

默认构建不从 shell 继承其他模式，避免误带 Test。禁止把 `test=true` 删除后直接当作已核验 Live 配置。Test 切 Live 只更新网页，App 的固定 GitHub 支持入口不变。

## 构建与检查

沿用 React、既有样式和依赖，普通 `npm run dev` / `npm run build` 保留现有工具链。`build:pages` 是纯静态导出命令，也可用于其他静态托管，不部署远程网站。

```sh
npm run build:pages -- --base-path /QuotaGrain-for-Codex --site-url https://seanye73.github.io/QuotaGrain-for-Codex --indexable true --checkout-mode contact
```

本地支付测试使用 `--indexable false --checkout-mode test`。正式支付模式使用 `--checkout-mode live --checkout-url VERIFIED_WAFFO_PRODUCT_URL`，该配置不得代替商户、商品、金额和实际交付验收。替换示意参数后才能运行。

脚本导出四个英文静态页面、资源、canonical、robots、sitemap 与 `.nojekyll`，检查本地链接、锚点、元数据、隐私披露、累计设备和购买模式。公开文件位于输出的 `publicDirectory`；私有 manifest 在其父目录，记录构建参数及真实发布／公证核验边界。不要上传整个研发目录或 `.build`。

网站首次访问、SSR 默认英文，允许切换中文并记住偏好。默认本地检查禁止索引；公开候选显式 `--indexable true`。中文切换不是单独语言 URL，不能伪造多语言 canonical。公开后核对域名根 robots 和 sitemap 可达。

## 内容与资源

- `app/page.tsx`：功能、FAQ、价格与支持区。
- `app/product-links.ts`：GitHub 产品与稳定下载链接。
- `app/privacy/page.tsx`：额度请求、API 模型发现和可能收费的 Responses 检查、授权与保存回执数据。
- `app/terms/page.tsx`：累计两台 Mac、不含换机支持、交付和退款。
- `app/download/page.tsx`：Mac 要求、Release 下载与 GitHub 互链。
- `app/hero-demo.tsx`、`showcase-carousel.tsx`：使用示例数据的展示，不访问真实账号。示例标注保留，不误写成用户实际数据。
- `public/quotagrain-icon-256.png`：与 App 共用的紧凑标记；英文封面用于分享信息。
- `public/favicon.ico`：传统浏览器标签页兼容入口，内容与 App 图标一致。
- `public/favicon-v4.png`：当前页面使用的版本化 PNG favicon，避免浏览器继续复用旧标签图标缓存。

当前线上使用 live 模式，官网/GitHub 已获授权发布，见根目录 Live QA 记录。上面的 contact 命令只是构建示例，不代表线上状态；未来重新发布应显式选择所需模式，避免意外退回 contact。维护本文件本身不执行发布。
