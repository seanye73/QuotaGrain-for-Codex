'use client';

import { useRef, useState } from 'react';
import { AccountsShowcase } from './accounts-showcase';
import { ApiShowcase } from './api-showcase';

export function ShowcaseCarousel({ language }: { language: 'en' | 'zh' }) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const en = language === 'en';
  const slides = [
    { title: en ? 'More accounts, one clear view' : '更多账号，一起看清', body: en ? 'An expanded grid view of six sample accounts: Pro 20×, Pro, two Plus accounts, a free account, and a local API.' : '展开的双栏视图，展示 Pro 20×、Pro、两个 Plus、普通账号和本地 API 六个示例账号。', label: en ? 'Accounts overview' : '账号总览' },
    { title: en ? 'Connect your preferred service' : '接入你选择的服务', body: en ? 'Configure a separate Codex client for a Responses-compatible API or local model.' : '为兼容 Responses 的 API 或本地模型配置独立的 Codex 客户端。', label: en ? 'External API' : '外部 API' },
  ];
  function go(index: number) {
    const next = (index + slides.length) % slides.length;
    const node = track.current;
    if (node) node.scrollTo({ left: next * node.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <div className="showcase-carousel" role="region" aria-label={en ? 'Product views' : '产品界面展示'} aria-roledescription="carousel">
    <div className="showcase-track" ref={track} tabIndex={0}
      onScroll={() => { const node = track.current; if (node) setActive(Math.round(node.scrollLeft / node.clientWidth)); }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
      <div className="showcase-slide" role="group" aria-label="1 / 2"><AccountsShowcase language={language} /></div>
      <div className="showcase-slide" role="group" aria-label="2 / 2"><ApiShowcase language={language} /></div>
    </div>
    <aside className="showcase-description">
      <div className="showcase-tabs" aria-label={en ? 'Choose a view' : '选择界面'}>{slides.map((slide, index) => <button key={index} type="button" aria-pressed={active === index} onClick={() => go(index)}>{slide.label}</button>)}</div>
      <div className="showcase-copy" aria-live="polite" aria-atomic="true"><span className="showcase-count">0{active + 1} / 02</span><h3>{slides[active]?.title}</h3><p>{slides[active]?.body}</p></div>
      <div className="showcase-navigation"><button type="button" onClick={() => go(active - 1)} aria-label={en ? 'Previous view' : '上一张'}>←</button><button type="button" onClick={() => go(active + 1)} aria-label={en ? 'Next view' : '下一张'}>→</button><span>{en ? 'Swipe or click to explore' : '左右滑动或点击切换'}</span></div>
    </aside>
  </div>;
}
