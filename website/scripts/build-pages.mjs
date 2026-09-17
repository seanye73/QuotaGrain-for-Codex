import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const options = { '--base-path': '', '--site-url': 'http://localhost:3000', '--indexable': 'false', '--checkout-mode': 'contact', '--checkout-url': '' };
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (!(args[i] in options) || args[i + 1] === undefined) throw new Error('Use --base-path, --site-url, --indexable, --checkout-mode and --checkout-url only.');
  options[args[i]] = args[i + 1];
}
if (!['true', 'false'].includes(options['--indexable'])) throw new Error('--indexable must be true or false.');
const indexable = options['--indexable'] === 'true';
const checkoutMode = options['--checkout-mode'];
if (!['contact', 'test', 'live'].includes(checkoutMode)) throw new Error('Invalid checkout mode.');
if (indexable && checkoutMode === 'test') throw new Error('Public exports cannot use Test checkout.');
if (checkoutMode === 'live' && !options['--checkout-url']) throw new Error('Live mode requires a verified --checkout-url.');
if (checkoutMode !== 'live' && options['--checkout-url']) throw new Error('--checkout-url is only for Live mode.');
const basePath = options['--base-path'];
if (basePath && !/^\/[A-Za-z0-9][A-Za-z0-9_-]*$/.test(basePath)) throw new Error('Invalid repository path.');
const siteURL = new URL(options['--site-url']);
if (siteURL.username || siteURL.password || siteURL.search || siteURL.hash ||
    !((siteURL.protocol === 'https:' && !siteURL.port) ||
      (siteURL.protocol === 'http:' && siteURL.hostname === 'localhost'))) throw new Error('Invalid public site URL.');
if (siteURL.pathname.replace(/\/$/, '') !== basePath) throw new Error('Site URL must include the same repository path.');

if (indexable && siteURL.protocol !== 'https:') throw new Error('Indexable exports require HTTPS.');

// Reuse the installed Next compiler for its static export. The ordinary
// Vinext/Sites build stays unchanged; neither path deploys anything here.
const build = spawnSync(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], {
  cwd: root, stdio: 'inherit', env: { ...process.env, QG_PAGES_BUILD: '1', QG_PAGES_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteURL.href, NEXT_PUBLIC_QG_CHECKOUT_MODE: checkoutMode,
    NEXT_PUBLIC_QG_LIVE_CHECKOUT_URL: options['--checkout-url'], QG_SEARCH_INDEXABLE: indexable ? '1' : '0', NEXT_TELEMETRY_DISABLED: '1' },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const exported = path.join(root, 'out');
for (const route of ['index.html', 'privacy/index.html', 'download/index.html', 'terms/index.html']) {
  if (!(await stat(path.join(exported, route))).isFile()) throw new Error(`Missing static route: ${route}`);
}
const sitemapURL = siteURL.href.replace(/\/$/, '') + '/sitemap.xml';
const urls = ['', 'download/', 'privacy/', 'terms/'].map(route => new URL(route, siteURL.href.replace(/\/$/, '') + '/').href);
await writeFile(path.join(exported, 'robots.txt'), indexable
  ? `User-agent: *\nAllow: /\nSitemap: ${sitemapURL}\n`
  : 'User-agent: *\nDisallow: /\n');
await writeFile(path.join(exported, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(url => `<url><loc>${url.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</loc></url>`).join('') + '</urlset>\n');
const images = new Set(['favicon-v4.png', 'favicon-v3.ico', 'favicon.ico', 'quotagrain-icon-256.png', 'quotagrain-hourglass.png', 'quotagrain-cover-en.png', 'quotagrain-overview-en.png',
  'quotagrain-grid-en.png', 'quotagrain-add-api-en.png', 'quotagrain-settings-en.png']);
const legacyImages = new Set(['og.png', 'codex-quota-wide.jpeg']);
const files = [];
async function collect(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error('Symlinks are not public artifacts.');
    if (entry.isDirectory()) { await collect(path.join(directory, entry.name), relative + '/'); continue; }
    if (!entry.isFile()) throw new Error('Unexpected export entry.');
    if (legacyImages.has(relative)) continue;
    const permitted = ['robots.txt', 'sitemap.xml'].includes(relative) || images.has(relative) ||
      /^(?:(?:privacy|download|terms|404|_not-found)\/)?(?:index|404)\.html$/.test(relative) ||
      /^(?:(?:privacy|download|terms|_not-found)\/)?(?:index|__next\.[A-Za-z0-9_.-]+)\.txt$/.test(relative) ||
      /^_next\/static\/[A-Za-z0-9_./-]+\.(?:js|css|woff2?|png|svg)$/.test(relative);
    if (!permitted || relative.endsWith('.map')) throw new Error(`Unreviewed public artifact: ${relative}`);
    files.push(relative);
  }
}
await collect(exported);
const stageRoot = path.resolve(root, '..', '.build');
await mkdir(stageRoot, { recursive: true });
const stage = await mkdtemp(path.join(stageRoot, 'github-pages-preview-'));
const publicDirectory = path.join(stage, 'public');
await mkdir(publicDirectory);
const manifest = [];
for (const relative of files.sort()) {
  const destination = path.join(publicDirectory, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(exported, relative), destination, { errorOnExist: true, force: false });
  const bytes = await readFile(destination);
  manifest.push({ path: relative, size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
}
await writeFile(path.join(publicDirectory, '.nojekyll'), '', { flag: 'wx' });
const verification = spawnSync('python3', [path.join(root, 'scripts/verify-pages.py'), publicDirectory, basePath, siteURL.href, String(indexable), checkoutMode, options['--checkout-url']], { stdio: 'inherit' });
if (verification.status !== 0) process.exit(verification.status ?? 1);
await writeFile(path.join(stage, 'manifest.json'), JSON.stringify({ purpose: 'release-copy', notarizationVerified: false, publishingAuthorized: false, basePath,
  siteURL: siteURL.href, indexable, checkoutMode, publicDirectory, files: manifest }, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
console.log(JSON.stringify({ status: 'static-artifacts-verified', publicDirectory, files: files.length + 1 }));
