import { PanelIcon as Icon } from './panel-icon';
import { sitePath } from './site-path';

const accounts = [
  { name: 'Pro 20×', quota: 83, primaryWindow: 'weekly', hours: 100, plan: '20X' },
  { name: 'Pro', quota: 58, primaryWindow: 'weekly', hours: 100, plan: 'Pro' },
  { name: 'Plus-01', quota: 72, primaryWindow: 'weekly', hours: 77, plan: 'Plus' },
  { name: 'Plus-02', quota: 46, primaryWindow: 'weekly', hours: 61, plan: 'Plus' },
  { name: 'Free', quota: 61, primaryWindow: 'five-hour', hours: null, plan: 'Free' },
];
// Fixed, non-interactive sample data; this illustration never reads user accounts.
export function AccountsShowcase({ language }: { language: 'en' | 'zh' }) {
  const en = language === 'en';
  return <div className="accounts-showcase">
    <div className="grid-preview" role="img" aria-label={en ? 'Six sample accounts in a two-column quota panel' : '六个示例账号的双栏额度面板'}>
      <header className="grid-preview-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sitePath('/quotagrain-icon-256.png')} width={56} height={56} alt="" />
        <div><strong>QuotaGrain for Codex</strong><p>{en ? '6 accounts synced' : '6 个账号 · 已更新'}</p></div>
        <span className="grid-preview-control"><Icon name="grid" /></span><span className="grid-preview-control"><Icon name="refresh" /></span>
      </header>
      <div className="grid-preview-cards">
        {accounts.map(account => <div className="grid-preview-card" key={account.name}>
          <h3><i />{account.name}</h3>
          <div className="grid-preview-quota"><span>{account.primaryWindow === 'five-hour' ? (en ? '5-hour' : '5 小时') : (en ? 'Weekly' : '每周额度')}</span><strong>{account.quota}%<small>{en ? 'left' : '剩余'}</small></strong></div>
          <div className="grid-preview-track"><span style={{ width: `${account.quota}%` }} /></div>
          <p className="grid-preview-reset"><Icon name="calendar" />{account.primaryWindow === 'five-hour' ? (en ? 'Resets in 3h 35m' : '3 小时 35 分后重置') : (en ? 'Resets in 3d 8h' : '3 天 8 小时后重置')}</p>
          <div className="grid-preview-hour">{account.hours !== null && <><span>{en ? '5-hour' : '5 小时'}</span><div className="grid-preview-track"><span style={{ width: `${account.hours}%` }} /></div><strong>{account.hours}%</strong></>}<span className="grid-preview-plan">{account.plan}</span></div>
        </div>)}
        <div className="grid-preview-card grid-preview-api"><h3><i />{en ? 'Local API' : '本地 API'}</h3><p>{en ? 'Token total' : '累计 Token'}</p><strong>177,474</strong></div>
      </div>
      <div className="grid-preview-footer" aria-hidden="true"><span className="grid-preview-add"><Icon name="account" />{en ? 'Account' : '账号'}<span>⌄</span></span><span className="grid-preview-control grid-preview-heart"><Icon name="heart" /></span><div className="grid-preview-tools"><span className="grid-preview-control"><Icon name="settings" /></span><span className="grid-preview-control"><Icon name="pin" /></span><span className="grid-preview-quit"><Icon name="power" />{en ? 'Quit' : '退出'}</span></div></div>
    </div>
  </div>;
}
