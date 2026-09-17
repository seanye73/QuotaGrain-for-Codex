import type { Metadata } from 'next';
import { pageTitles } from './page-titles';
import { sitePath } from './site-path';

const descriptions = {
  home: 'Monitor Codex quota, run multiple desktop clients side by side, and track external API token usage from your Mac menu bar. Free for two accounts.',
  download: 'Get started with QuotaGrain for Codex on Apple Silicon and macOS 13 or later. Requirements, installation workflow, and release availability.',
  privacy: 'How QuotaGrain for Codex stores account data on your Mac and handles quota requests, API credentials, local token usage, and license verification.',
  terms: 'Free account limits, support and unlocking, license terms, payment, activation code delivery, refunds, and contact details for QuotaGrain for Codex.',
};

export function pageMetadata(page: keyof typeof pageTitles, route = ''): Metadata {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const site = configured ? new URL(configured.replace(/\/$/, '') + '/') : undefined;
  const index = process.env.QG_SEARCH_INDEXABLE === '1';
  if (index && (!site || site.protocol !== 'https:')) throw new Error('Indexable pages require an explicit HTTPS site URL.');
  const canonical = site ? new URL(route, site).href : undefined;
  const image = site ? new URL('quotagrain-cover-en.png', site).href : sitePath('/quotagrain-cover-en.png');
  const title = pageTitles[page].en;
  const description = descriptions[page];
  return {
    title, description,
    ...(site ? { metadataBase: new URL(site.origin), alternates: { canonical } } : {}),
    robots: { index, follow: index },
    openGraph: { title, description, type: 'website', locale: 'en_US',
      siteName: 'QuotaGrain for Codex', images: [{ url: image, width: 1738, height: 905, alt: 'QuotaGrain for Codex — Multiple accounts. Your quota at a glance.' }], ...(canonical ? { url: canonical } : {}) },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
