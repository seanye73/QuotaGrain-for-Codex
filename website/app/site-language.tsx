'use client';

import { Children, cloneElement, isValidElement, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { english } from './translations';
import { pageTitles } from './page-titles';

type Language = 'zh' | 'en';
let fallbackLanguage: Language = 'en';
const languageEvent = 'quotagrain-language-change';
function readLanguage(): Language {
  try {
    const stored = localStorage.getItem('quotagrain-language');
    return stored === 'zh' || stored === 'en' ? stored : fallbackLanguage;
  }
  catch { return fallbackLanguage; }
}
function subscribeLanguage(notify: () => void) {
  window.addEventListener('storage', notify);
  window.addEventListener(languageEvent, notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener(languageEvent, notify);
  };
}
export function useSiteLanguage(page: keyof typeof pageTitles = 'home') {
  const language = useSyncExternalStore(subscribeLanguage, readLanguage, () => 'en' as Language);
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = pageTitles[page][language];
  }, [language, page]);
  function toggleLanguage() {
    const next = language === 'zh' ? 'en' : 'zh';
    fallbackLanguage = next;
    try { localStorage.setItem('quotagrain-language', next); } catch { /* Optional. */ }
    window.dispatchEvent(new Event(languageEvent));
  }
  return { language, toggleLanguage };
}

// Translate the shared element tree so both languages use the same layout.
export function localize(node: ReactNode, language: Language): ReactNode {
  if (language === 'zh') return node;
  if (typeof node === 'string') {
    const text = node.trim();
    return english[text] ? node.replace(text, english[text]) : node;
  }
  if (Array.isArray(node)) return Children.map(node, child => localize(child, language));
  if (!isValidElement<Record<string, unknown>>(node)) return node;
  const props: Record<string, unknown> = {};
  for (const name of ['aria-label', 'title', 'alt']) {
    const value = node.props[name];
    if (typeof value === 'string' && english[value]) props[name] = english[value];
  }
  if ('children' in node.props) props.children = localize(node.props.children as ReactNode, language);
  return cloneElement(node, props);
}
