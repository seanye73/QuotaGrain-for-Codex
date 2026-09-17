import { latestDownloadURL } from './product-links';

const siteURL = `${(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seanye73.github.io/QuotaGrain-for-Codex').replace(/\/$/, '')}/`;
const authorURL = 'https://github.com/seanye73';

const faqs = [
  {
    question: 'Is QuotaGrain for Codex an official Codex product?',
    answer: 'No. QuotaGrain for Codex is an independent third-party tool, unaffiliated with and not endorsed by OpenAI. “For Codex” only identifies the client it works with.',
  },
  {
    question: 'Who is QuotaGrain for Codex for?',
    answer: 'QuotaGrain for Codex is a standalone macOS menu bar tool for people who use multiple Codex accounts and want quota and reset times in one place. It also shows locally recorded token usage for external API accounts.',
  },
  {
    question: 'Can I run multiple Codex clients and use external APIs?',
    answer: 'Yes. Open independent Codex clients for multiple accounts at once. You can also configure an external API endpoint, key, and model for its own client. Services must support OpenAI Responses; Chat Completions compatibility alone is not sufficient.',
  },
  {
    question: 'Where are isolated account files stored?',
    answer: 'New accounts live in ~/.codex/accounts/<account-name>/ on your Mac. Each has its own configuration, authentication, and session data, with desktop client data in its desktop/ subfolder. Your existing default account data in ~/.codex is left unchanged.',
  },
  {
    question: 'Can Codex updates affect QuotaGrain for Codex?',
    answer: 'They can. QuotaGrain for Codex depends on current Codex, ChatGPT, and provider interfaces and local data formats. Upstream changes may temporarily affect quota checks, client launching, or usage tracking.',
  },
  {
    question: 'What does support unlock?',
    answer: 'Use up to two accounts for free, or make a one-time purchase that supports the developer and unlocks unlimited accounts. Automatic refresh, quota alerts, and privacy are the same. Both Codex and external API accounts count toward the limit.',
  },
  {
    question: 'Does API token usage show my remaining balance?',
    answer: 'No. External API and local-model token totals come from local usage records and do not represent provider balances, remaining quota, or billed amounts.',
  },
  {
    question: 'What does QuotaGrain for Codex require?',
    answer: 'It requires an Apple Silicon Mac running macOS 13 or later, with Codex installed for account sign-in and client launching. External API or local-model services must support OpenAI Responses.',
  },
];

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteURL}#website`,
      url: siteURL,
      name: 'QuotaGrain for Codex',
      description: 'A macOS menu bar app for monitoring multiple Codex accounts and opening independent Codex clients.',
      publisher: { '@id': `${authorURL}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${authorURL}#person`,
      name: 'Sean Ye',
      url: authorURL,
      sameAs: [authorURL],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteURL}#software`,
      name: 'QuotaGrain for Codex',
      url: siteURL,
      description: 'A third-party macOS menu bar app for monitoring quota across multiple Codex accounts, opening independent clients, and tracking locally recorded token usage.',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'macOS 13 or later',
      processorRequirements: 'Apple Silicon',
      isAccessibleForFree: true,
      downloadUrl: latestDownloadURL,
      image: `${siteURL}quotagrain-cover-en.png`,
      author: { '@id': `${authorURL}#person` },
      publisher: { '@id': `${authorURL}#person` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteURL}#faq`,
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};
