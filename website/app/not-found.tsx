import type { Metadata } from 'next';
import { sitePath } from './site-path';

export const metadata: Metadata = {
  title: 'Page not found — QuotaGrain for Codex',
  description: 'This page could not be found. Return to QuotaGrain for Codex.',
  robots: { index: false, follow: true },
  alternates: null,
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return <main className="privacy-document"><article>
    <header className="privacy-intro"><p className="kicker">404</p><h1>Page not found</h1>
      <p>This page may have moved, or the address may be incorrect.</p></header>
    <a className="text-link" href={sitePath('/')}>← Back to QuotaGrain for Codex</a>
  </article></main>;
}
