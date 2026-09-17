import { PanelIcon } from './panel-icon';

export function ApiShowcase({ language }: { language: 'en' | 'zh' }) {
  const en = language === 'en';
  return <figure className="api-showcase">
    <div className="api-preview" role="img" aria-label={en ? 'Sample external API account setup' : '外部 API 账号添加示意'}>
      <div className="api-preview-heading"><span className="api-preview-icon"><PanelIcon name="account" /></span><div><h3>{en ? 'Add External API Account' : '添加外部 API 账号'}</h3><p>{en ? 'Create a separate account for your preferred service.' : '为你选择的服务创建独立账号。'}</p></div></div>
      <div className="api-preview-service"><strong>{en ? 'Service' : '服务'}</strong><span>{en ? 'Custom API' : '自定义 API'}<span>⌄</span></span></div>
      <div className="api-preview-field"><strong>{en ? 'API endpoint' : 'API 地址'}</strong><div className="api-preview-input is-focused">https://api.example.com/v1</div><p>{en ? 'Use HTTPS for remote services. HTTP is allowed for local services.' : '远程服务使用 HTTPS，本地服务可以使用 HTTP。'}</p></div>
      <div className="api-preview-field"><strong>API Key</strong><div className="api-preview-input">{en ? 'Paste API key' : '粘贴 API Key'}</div></div>
      <div className="api-preview-notes"><p>{en ? 'The name and model list sync automatically. Choose a model in Codex.' : '名称与模型列表自动同步，在 Codex 中选择模型。'}</p><p>{en ? 'Your API key is stored in this account’s auth.json.' : 'API Key 保存在该账号的 auth.json 中。'}</p></div>
      <div className="api-preview-actions" aria-hidden="true"><span>{en ? 'Cancel' : '取消'}</span><span>{en ? 'Connect & Add' : '连接并添加'}</span></div>
    </div>
    <figcaption><h3>{en ? 'Connect your preferred service' : '接入你选择的服务'}</h3><p>{en ? 'Configure a separate Codex client for a Responses-compatible API or local model.' : '为兼容 Responses 的 API 或本地模型配置独立的 Codex 客户端。'}</p></figcaption>
  </figure>;
}
