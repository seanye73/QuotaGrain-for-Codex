'use client';
import { useSiteLanguage } from '../site-language';
import { sitePath } from '../site-path';
import { latestDownloadURL } from '../product-links';
export default function Download() {
  const { language, toggleLanguage } = useSiteLanguage('download');
  const en = language === 'en';
  return <main className="privacy-document"><article>
    <div className="privacy-topbar"><a className="text-link" href={sitePath('/')}>← QuotaGrain for Codex</a><button className="language-toggle" onClick={toggleLanguage}>中文 / EN</button></div>
    <header className="privacy-intro"><p className="kicker">QuotaGrain for Codex</p><h1>{en ? 'Download for Mac' : '下载 Mac 版'}</h1><p>{en ? 'Requires an Apple Silicon Mac running macOS 13 or later, with Codex installed for account sign-in and client launching.' : '需要 Apple Silicon Mac、macOS 13 或更高版本，并安装 Codex 以登录账号和打开客户端。'}</p></header>
    <section className="support-card"><h2>{en ? 'Start with two accounts, for free.' : '从两个账号开始，免费使用。'}</h2><p>{en ? 'Free use has no trial deadline. Automatic refresh, quota alerts, and privacy protections are included.' : '免费版不设试用期限，包含自动刷新、额度提醒和隐私保护。'}</p><p>{en ? 'Download the latest Mac installer for Apple Silicon.' : '下载适用于 Apple Silicon 的最新版 Mac 安装包。'}</p><a className="button button-primary" href={latestDownloadURL}>{en ? 'Download for Mac ↗' : '下载 Mac 版 ↗'}</a></section>
    <section className="privacy-detail"><h2>{en ? 'After installation' : '安装后开始使用'}</h2><p>{en ? 'Add accounts from the menu bar to view quota and reset times. For external API accounts, enter your service endpoint and model.' : '安装后，从菜单栏添加账号，查看额度与重置时间；外部 API 账号可填写服务地址和模型。'}</p><p>{en ? 'Already have an activation code? Activate it in the app.' : '已有激活码的用户可在 App 中完成激活。'}</p><a className="text-link" href={sitePath('/#support')}>{en ? 'Support and unlock unlimited accounts →' : '支持并解锁不限账号 →'}</a></section>
  </article><footer className="terms-footer"><div className="terms-footer-contact"><span className="terms-footer-label">{language === 'en' ? 'Contact' : '联系与支持'}</span><a href="mailto:x73.sean.ye@outlook.com">x73.sean.ye@outlook.com</a></div><nav className="terms-footer-links" aria-label="Privacy and terms"><a href={sitePath('/privacy/')}>{language === 'en' ? 'Privacy policy' : '隐私政策'}</a><a href={sitePath('/terms/')}>{language === 'en' ? 'Terms' : '使用条款'}</a></nav></footer></main>;
}
