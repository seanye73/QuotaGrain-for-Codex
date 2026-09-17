"use client";

import { useState } from 'react';

export function ShareButton({ language }: { language: 'zh' | 'en' }) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const label = language === 'zh' ? '分享网页' : 'Share';
  async function share() {
    const url = location.href;
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
    const note = local ? (language === 'zh' ? '此预览链接仅在本机可访问。' : 'This preview link only works on this Mac.') : '';
    setStatus('');
    setBusy(true);
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: 'QuotaGrain for Codex', text: note || 'QuotaGrain for Codex', url });
          setStatus(note);
          return;
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') return;
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        setStatus((language === 'zh' ? '链接已复制。' : 'Link copied. ') + note);
      } catch {
        setStatus((language === 'zh' ? '请复制浏览器地址栏中的链接。' : 'Copy the link from your browser’s address bar. ') + note);
      }
    } finally { setBusy(false); }
  }
  return <div className="share-control">
    <button type="button" className="language-toggle share-button" onClick={share} disabled={busy} aria-label={label} title={label}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <span className="share-status" role="status" aria-live="polite">{status}</span>
  </div>;
}
