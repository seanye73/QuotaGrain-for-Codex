import type { Metadata } from 'next';
import './globals.css';
import { sitePath } from './site-path';
import { pageMetadata } from './seo';

const home = pageMetadata('home');
const favicon = {
  url: sitePath('/favicon-v4.png'),
  type: 'image/png',
  sizes: '256x256',
} as const;
const appIcon = {
  url: sitePath('/quotagrain-icon-256.png?v=3'),
  type: 'image/png',
  sizes: '256x256',
} as const;

export const metadata: Metadata = {
  ...home,
  other: { "waffo-verify": "1776443e0e63f11a95521b4fe2b76112" },
  icons: {
    icon: [favicon, appIcon],
    shortcut: favicon,
    apple: appIcon,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
