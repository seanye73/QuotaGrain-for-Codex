'use client';

import { localize, useSiteLanguage } from '../site-language';
import { sitePath } from '../site-path';
export default function Privacy() {
  const { language, toggleLanguage } = useSiteLanguage('privacy');
  return localize(<main className="privacy-document"><article>
    <div className="privacy-topbar">
    <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={language === 'zh' ? 'Switch to English' : '切换为中文'}>中文 / EN</button>
    <a className="text-link" href={sitePath('/#privacy')}>← 返回 QuotaGrain for Codex</a>
    </div><header className="privacy-intro"><p className="kicker">QuotaGrain for Codex / Privacy</p><h1>隐私说明</h1>
    <p>QuotaGrain for Codex 是本地优先的 macOS 菜单栏 App。下面说明它为查询额度、统计用量和支持解锁而读取、保存与发送的数据。</p>
    </header><div className="privacy-reading-layout"><nav className="privacy-toc" aria-label="页内目录"><p>数据去向</p><a href="#privacy-1">账号额度查询</a><a href="#privacy-2">外部 API 账号</a><a href="#privacy-3">支持与解锁</a><a href="#privacy-4">保存在本机的数据</a><a href="#privacy-5">反馈问题</a></nav><div className="privacy-sections">
    <section className="privacy-detail" id="privacy-1"><span className="privacy-number">01</span><h2>账号额度查询</h2>
    <p>QuotaGrain for Codex 从账号本地的 auth.json 读取必要认证字段，向 ChatGPT 的额度与账号接口发起只读请求，获取额度、重置时间及账号显示信息。认证信息仅保存在本机。</p>
    </section><section className="privacy-detail" id="privacy-2"><span className="privacy-number">02</span><h2>外部 API 账号</h2>
    <p>发现模型时，API Key 会发送到你指定服务商的 /models 接口。服务商按自己的隐私政策处理请求。账号的 API 配置和凭据保存在对应的 Codex 账号目录中；原生文件凭据仅限本机用户访问。</p><p>如果模型发现无法确认所选模型，刷新时会自动向同一服务商的 /responses 接口发送少量连接测试请求，可能产生服务商费用。请求只使用固定输入 Reply OK.，最多生成 32 个 Token，不发送聊天正文或工具；使用 stream=false 和 store=false，但服务商如何保留数据以其隐私政策为准。这些测试不计入 App 显示的本地 Token 汇总。</p>
    </section><section className="privacy-detail" id="privacy-3"><span className="privacy-number">03</span><h2>支持与解锁</h2>
    <p>付款由 Waffo 托管页面处理。作者的交付服务使用订单信息和购买邮箱核验付款并发送激活码；本站不收集支付信息。</p><p>激活及后续授权验证时，App 将激活码、设备绑定标识、电脑名称、机型与系统版本加密发送给激活服务，用于验证授权状态。授权保存在本机，本地读取已保存的授权无需联网。</p><p>新授权成功保存后，App 还会向同一激活服务发送该凭证的 SHA-256 摘要，确认本机已保存；失败时会重试。摘要回传不包含账号凭据或聊天内容。</p>
    </section><section className="privacy-detail" id="privacy-4"><span className="privacy-number">04</span><h2>保存在本机的数据</h2>
    <p>账号登记、顺序、设置、额度快照和 Token 汇总保存在本机。各账号使用独立的 Codex 数据目录。Codex 在对应账号目录中保存会话数据；QuotaGrain for Codex 的用量统计只解析 Token 计数，统计记录不包含聊天正文。</p>
    </section><section className="privacy-detail"><h2>检查应用更新</h2><p>点击检查更新时，App 会读取 GitHub 托管的公开版本清单，在本机比较版本。GitHub 会接收包括 IP 地址在内的普通网络请求；App 不附带账号凭据、激活码、设备绑定或用量数据。有新版时提供 GitHub 下载页入口，不自动下载或安装。</p>
    </section><section className="privacy-detail" id="privacy-5"><span className="privacy-number">05</span><h2>反馈问题</h2>
    <p>有问题或建议，欢迎通过邮箱联系作者，请简要说明问题发生的情况、当前 App 版本（含“关于”页面中的构建号），并附上相关截图或凭证，方便排查处理。</p>
    <a className="text-link" href="mailto:x73.sean.ye@outlook.com">x73.sean.ye@outlook.com</a>
  </section><section className="privacy-detail"><h2>{language === 'en' ? 'Website & privacy' : '网站与隐私'}</h2><p>{language === 'en' ? 'Your language preference is saved in this browser and can be removed by clearing site data.' : '语言偏好保存在浏览器中，可通过清除站点数据删除。'}</p><p>{language === 'en' ? 'We keep records only as needed for the purposes above or by law. To request access, correction or deletion, email the author.' : '记录仅按上述用途或法律要求保留；如需访问、更正或删除，请联系作者邮箱。'}</p><a className="text-link" href="https://www.waffo.ai/en/privacy">Waffo Privacy Policy ↗</a><p><a className="text-link" href={sitePath('/terms/')}>{language === 'en' ? 'Usage, delivery & refunds →' : '使用、交付与退款说明 →'}</a></p></section></div></div></article><footer className="terms-footer"><div className="terms-footer-contact"><span className="terms-footer-label">{language === 'en' ? 'Contact' : '联系与支持'}</span><a href="mailto:x73.sean.ye@outlook.com">x73.sean.ye@outlook.com</a></div><nav className="terms-footer-links" aria-label="Privacy and terms"><a href={sitePath('/privacy/')}>{language === 'en' ? 'Privacy policy' : '隐私政策'}</a><a href={sitePath('/terms/')}>{language === 'en' ? 'Terms' : '使用条款'}</a></nav></footer></main>, language);
}
