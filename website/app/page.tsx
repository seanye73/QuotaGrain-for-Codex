'use client';

import { useSiteLanguage, localize } from './site-language';
import { sitePath } from './site-path';
import { checkoutURL } from './checkout';
import { HeroDemo } from './hero-demo';
import { ShowcaseCarousel } from './showcase-carousel';
import { ShareButton } from './share-button';
import { homeStructuredData } from './structured-data';

const features = [
  { index: '01', title: '额度与重置时间，一起看清', body: '集中查看多个 Codex 账号的剩余额度、重置时间和异常状态，快速判断接下来用哪个账号。' },
  { index: '02', title: '从卡片打开对应账号', body: '账号使用各自独立的配置和客户端数据。从面板进入对应的 Codex，继续手上的工作。' },
  { index: '03', title: '自动刷新，及时提醒', body: '自动刷新额度，并可开启低额度提醒，也能随时手动刷新。这些功能免费使用时同样完整。' },
  { index: '04', title: '外部 API、本地模型，都能接入 Codex', body: '自定义 API 地址和模型，为不同服务打开独立的 Codex 客户端。支持提供 OpenAI Responses 兼容接口的云端服务与本机模型服务，并可查看本地累计 Token 用量。' },
];
const faqs = [
  { question: 'QuotaGrain for Codex 是 Codex 官方产品吗？', answer: '不是。QuotaGrain for Codex 是独立开发的第三方工具，与 OpenAI 无隶属或合作关系。' },
  { question: 'QuotaGrain for Codex 是什么，适合谁？', answer: "QuotaGrain for Codex 适合同时使用多个 Codex 账号，或希望在独立 Codex 客户端中使用外部 API 和本地模型的 Mac 用户。它集中展示额度、重置时间和本地 Token 用量。" },
  { question: '它也是 Codex 多开器吗？可以使用外部 API 吗？', answer: '是的。除了查看额度，QuotaGrain for Codex 也能为不同账号打开各自独立的 Codex 客户端，让多个账号同时使用。你还可以配置外部 API 服务、API Key 和模型，在对应的 Codex 客户端中使用。外部服务需要兼容 OpenAI Responses 接口。' },
  { question: '隔离出来的账号信息存在哪里？', answer: '通过我们的软件新建的独立账号保存在你 Mac 的 ~/.codex/accounts/目录下。每个账号各有自己的配置、认证信息和会话数据，客户端数据保存在该账号目录下的 desktop/ 中。原有 ~/.codex 中的默认账号数据保持原样。' },
  { question: 'Codex 更新后，功能会受影响吗？', answer: '可能会。QuotaGrain for Codex 依赖 Codex 与 macOS 的现有机制。上游变更或限制可能导致部分功能不可用。' },
  { question: '免费使用与支持解锁有什么区别？', answer: "免费使用最多 2 个账号，支持后解锁不限账号；Codex 与外部 API 账号都计入数量。自动刷新、额度提醒和隐私保护相同。解锁增加的是可管理的账号数量，不增加 OpenAI 或 API 服务商提供的额度。" },
  { question: "API Token 用量是否代表服务商余额？", answer: "不是。外部 API 与本地模型的 Token 汇总来自本机用量记录，不代表服务商余额、剩余额度或账单金额。" },
  { question: "使用 QuotaGrain for Codex 需要什么？", answer: "需要 Apple Silicon Mac、macOS 13 或更高版本，以及用于登录和打开客户端的 Codex。外部 API 或本地模型服务需要兼容 OpenAI Responses 接口。" },
];
const productFacts = [
  {
    title: { en: 'Platform', zh: '运行环境' },
    value: { en: 'Apple Silicon Mac · macOS 13+', zh: 'Apple Silicon Mac · macOS 13+' },
    detail: { en: 'Codex is required for account sign-in and client launching.', zh: '登录账号和打开客户端需要安装 Codex。' },
  },
  {
    title: { en: 'Core task', zh: '核心任务' },
    value: { en: 'Check quota, then open Codex', zh: '查看额度，再打开 Codex' },
    detail: { en: 'See remaining quota, reset times, and account status in one panel.', zh: '在一个面板查看剩余额度、重置时间和账号状态。' },
  },
  {
    title: { en: 'Account separation', zh: '账号隔离' },
    value: { en: 'Independent settings and sessions', zh: '配置与会话各自独立' },
    detail: { en: 'Each account opens its own Codex client with separate local data.', zh: '每个账号打开独立的 Codex 客户端，使用独立本地数据。' },
  },
  {
    title: { en: 'External services', zh: '外部服务' },
    value: { en: 'OpenAI Responses-compatible APIs', zh: '兼容 OpenAI Responses 的 API' },
    detail: { en: 'Use cloud endpoints or local model services in separate clients.', zh: '可在独立客户端中使用云端接口或本地模型服务。' },
  },
  {
    title: { en: 'Local usage', zh: '本地用量' },
    value: { en: 'Token totals stay on your Mac', zh: 'Token 汇总保存在本机' },
    detail: { en: 'Recorded token totals are not provider balances or billing amounts.', zh: '记录的 Token 汇总不代表服务商余额或账单金额。' },
  },
  {
    title: { en: 'Privacy boundary', zh: '隐私边界' },
    value: { en: 'No chat content in usage records', zh: '用量记录不包含聊天正文' },
    detail: { en: 'QuotaGrain reads token counts without storing or indexing chat content.', zh: 'QuotaGrain 只读取 Token 计数，不保存或索引聊天正文。' },
  },
];
function Mark() {
  // Use the same hourglass artwork as the macOS app.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="brand-icon" src={sitePath("/quotagrain-icon-256.png")} width={36} height={36} alt="" />;
}
export default function Home() {
  const { language, toggleLanguage } = useSiteLanguage();
  const en = language === 'en';
  return localize(<main id="top" lang={language === "en" ? "en" : "zh-CN"}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }} />
    <a className="skip-link" href="#features">跳到产品功能</a>
    <div className="hero-stage">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="QuotaGrain for Codex 首页"><Mark /><span>QuotaGrain for Codex</span></a>
      <nav className="site-nav" aria-label="主要导航"><a href="#features">功能</a><a href="#privacy">隐私</a><a href={sitePath("/download/")}>下载说明</a></nav>
      <div className="header-actions"><button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={language === "zh" ? "Switch to English" : "切换为中文"}><span lang="zh-CN" className={language === "zh" ? "is-active" : ""}>中文</span><span aria-hidden="true">/</span><span lang="en" className={language === "en" ? "is-active" : ""}>EN</span></button><ShareButton language={language} /></div>
    </header>
    <section className="hero">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-copy">
        <h1>多个 Codex 账号，<br /><em>额度一眼看清。</em></h1>
        <p className="hero-lede">QuotaGrain for Codex 是独立的 macOS 菜单栏工具，集中监控多个 Codex 账号的额度，并同时运行各自独立的桌面客户端。支持通过兼容 OpenAI Responses 的服务接入外部 API 和本地模型，记录本地累计 Token 用量。</p>
        <div className="hero-actions">
          {/* Wire to the verified Release DMG before publication. */}
          <a className="button button-primary download-button" href={sitePath("/download/")}>
            <span className="hero-button-title"><span>下载 Mac 版</span><span aria-hidden="true">↓</span></span>
            <span className="hero-button-detail">macOS 13+ · Apple Silicon</span>
          </a>
          <a className="button button-secondary" href="#support">
            <span className="hero-button-title">支持并解锁</span>
            <span className="hero-button-detail">支持 · 解锁不限账号</span>
          </a>
        </div>
        {/* Use a notarization badge only after the distributed artifact passes Apple notarization. */}
        <p className="platform-note signing-status"><span className="signing-status-dot" aria-hidden="true" />苹果公证已通过 · Developer ID 签名</p>
      </div>
      <HeroDemo language={language} />
    </section>
    </div>
    <div className="trust-strip" aria-label="产品特点"><div><strong>多开 Codex</strong><span>多个账号同时使用</span></div><div><strong>账号隔离</strong><span>配置与会话各自独立</span></div><div><strong>接入外部 API</strong><span>云端与本地模型</span></div><div><strong>数据本地保存</strong><span>保存在你的 Mac</span></div></div>
    <section className="section" id="features"><div className="section-heading"><div><p className="kicker">少一点来回查看</p><h2>看额度，打开账号，<br />继续工作。</h2></div><p>把分散的账号状态放在一起。需要的时候打开面板，知道还有多少额度、什么时候重置。</p></div><div className="feature-grid">{features.map(feature => <article className="feature-card" key={feature.index}><span className="feature-index">{feature.index}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div></section>
    <section className="section screenshot-section" id="screenshots" aria-labelledby="screenshots-title">
      <div className="section-heading">
        <div><p className="kicker">更多账号，一起看清</p><h2 id="screenshots-title">页面能展示更多，<br />以适配多账号额度观看需求。</h2></div>
      </div>
      <ShowcaseCarousel language={language} />
    </section>
    <section className="section facts-section" id="facts" aria-labelledby="facts-title">
      <div className="section-heading">
        <div><p className="kicker">{en ? 'Product facts' : '产品事实'}</p><h2 id="facts-title">{en ? <>Know how it works.<br />Then decide if it fits.</> : <>先了解它怎么工作，<br />再判断是否适合你。</>}</h2></div>
        <p>{en ? 'A compact reference for the platform, workflow, compatibility, local usage records, and privacy boundary.' : '用一组简短事实说明运行环境、工作方式、兼容范围、本地用量与隐私边界。'}</p>
      </div>
      <div className="facts-grid" role="list">
        {productFacts.map(fact => <article className="fact-card" key={fact.title.en} role="listitem"><p className="fact-label">{en ? fact.title.en : fact.title.zh}</p><h3>{en ? fact.value.en : fact.value.zh}</h3><p>{en ? fact.detail.en : fact.detail.zh}</p></article>)}
      </div>
    </section>
    <section className="section privacy-section" id="privacy"><div className="privacy-summary"><p className="kicker">数据去向</p><h2>数据留在本机，<br /><span>联网去向透明。</span></h2><p>账号登记、设置和本地 Token 汇总保存在你的 Mac 上。</p></div><div className="privacy-copy"><h3>只为必要的功能联网</h3><p>额度查询使用必要认证信息访问官方接口。外部 API 的模型发现访问你指定的服务商。</p><ul className="check-list"><li><span>✓</span> 用量统计仅解析 Token 计数，不包含聊天正文</li><li><span>✓</span> 不在日志中记录账号凭据</li></ul><a className="text-link" href={sitePath("/privacy/")}>查看完整隐私说明 <span aria-hidden="true">→</span></a></div></section>
    <section className="section support-section" id="support">
      <div><p className="kicker">支持作者</p><h2>如果它帮到了你，<br />欢迎请作者喝杯咖啡。</h2><p>你可以免费管理 2 个账号。如果需要更多账号，也欢迎支持作者并解锁不限账号。感谢你的使用与支持。</p><p>安装后，从菜单栏添加账号，查看额度与重置时间；外部 API 账号可填写服务地址和模型。</p><p>已有激活码的用户可在 App 中完成激活。</p></div>
      <div className="support-card"><h3>支持并解锁</h3><div className="support-row"><span>价格</span><strong>US$9.99</strong></div><div className="support-row"><span>免费使用</span><strong>最多 2 个账号</strong></div><div className="support-row"><span>支持后</span><strong>不限账号</strong></div><p>免费版不设试用期限。自动刷新、额度提醒和隐私保护，两者相同。</p><a className="button support-unlock-button" href={checkoutURL}>支持并解锁 <span aria-hidden="true">↗</span></a><p>一份激活码最多累计激活 2 台 Mac，最终金额及适用税费以结账页为准。</p><p>激活码通常在付款成功后几分钟内发送至购买邮箱，最迟不超过 24 小时。</p><a className="text-link" href={sitePath("/terms/")}>使用、交付与退款说明 →</a><br /><a className="text-link" href={sitePath("/privacy/#privacy-5")}>联系与隐私说明 <span aria-hidden="true">→</span></a></div>
    </section>
    <section className="section faq-section" id="faq"><div className="faq-heading"><p className="kicker">常见问题</p><h2>你可能还想知道。</h2></div><div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    <footer><div className="footer-brand"><Mark /><div><strong>QuotaGrain for Codex</strong><p>管理多个 Codex 账号，额度一眼看清。</p><p>Created by <a href="https://github.com/seanye73">x73_Seanye</a></p></div></div><div className="footer-links"><a href="#features">功能</a><a href={sitePath("/privacy/")}>隐私</a><a href={sitePath("/download/")}>下载说明</a><a href="#faq">常见问题</a><a href={sitePath("/terms/")}>使用与购买条款</a><a href={sitePath("/terms/#refunds")}>退款说明</a></div><p className="legal"><a href="mailto:x73.sean.ye@outlook.com">x73.sean.ye@outlook.com</a><br />独立软件，与 OpenAI 无隶属或合作关系。</p></footer>
  </main>, language);
}
