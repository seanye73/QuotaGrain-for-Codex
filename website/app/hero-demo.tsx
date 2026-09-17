import { PanelIcon } from './panel-icon';
import { localize } from './site-language';
import { sitePath } from './site-path';

// The original website illustration, rendered as HTML with fixed sample data.
// These visual controls do not connect to accounts or launch applications.
export function HeroDemo({ language }: { language: 'en' | 'zh' }) {
  return localize(<div className="hero-visual">
    <div className="demo-panel" role="img" aria-label="QuotaGrain for Codex 额度面板示意，所有账号及数值均为演示数据">
      <div className="demo-toolbar">
        <div className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-icon" src={sitePath('/quotagrain-icon-256.png')} width={28} height={28} alt="" />
          <span>QuotaGrain for Codex</span>
        </div>
        <div className="demo-controls" aria-hidden="true">
          <span><PanelIcon name="grid" /></span>
          <span><PanelIcon name="refresh" /></span>
        </div>
        <p className="demo-sync">4 个账号 · 已更新</p>
      </div>
      <div className="demo-account-row is-revealed">
        <div className="demo-account">
          <div className="account-heading"><div><h3><i className="demo-account-dot"/>Plus-01</h3><p>每周额度</p></div><strong className="demo-remaining">56%<small>剩余</small></strong></div>
          <div className="quota-track"><span style={{ width: '56%' }}/></div>
          <div className="demo-hour-row"><span>5 小时</span><div className="demo-hour-track"><span style={{ width: '77%' }}/></div><strong>77%</strong><span className="demo-plan">Plus</span></div>
        </div>
        <div className="demo-client-action"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="3"/><rect x="7" y="8" width="15" height="13" rx="3" fill="#f2eafb"/><path d="M11 12h1m2 0h1m2 0h1"/></svg><span>打开 Codex</span></div>
      </div>
      <div className="demo-account-row"><div className="demo-account">
        <div className="account-heading"><div><h3><i className="demo-account-dot"/>Pro-20×</h3><p>每周额度</p></div><strong className="demo-remaining">82%<small>剩余</small></strong></div>
        <div className="quota-track"><span style={{ width: '82%' }}/></div>
        <div className="demo-hour-row"><span className="demo-plan">Pro 20×</span></div>
      </div></div>
      <div className="demo-account-row"><div className="demo-account demo-api-account">
        <div className="account-heading"><div><h3><i className="demo-account-dot"/>外部 API</h3><p>自定义模型 · 云端服务</p></div></div>
        <div className="demo-token-total"><span>累计 Token</span><strong>1,284,560</strong></div>
      </div></div>
      <div className="demo-account-row"><div className="demo-account demo-api-account">
        <div className="account-heading"><div><h3><i className="demo-account-dot"/>本地模型</h3><p>本机模型 · localhost</p></div></div>
        <div className="demo-token-total"><span>累计 Token</span><strong>177,474</strong></div>
      </div></div>
      <div className="demo-bottom"><span>＋ 添加账号</span><span className="demo-utilities">设置 · 固定面板</span></div>
    </div>
    <p className="preview-caption">布局与刷新操作示意</p>
  </div>, language);
}
