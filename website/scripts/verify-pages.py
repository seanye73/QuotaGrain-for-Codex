"""Check actual static artifacts and links, including a project Pages prefix."""
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit

root = Path(sys.argv[1]).resolve()
prefix = sys.argv[2]


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.references = []
        self.social_images = []
        self.ids = set()
        self.language = None
        self.canonical = None
        self.robots = None
        self.robot_rules = []
        self.description = None
        self.title = ""
        self.in_title = False
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        values = dict(attributes)
        if tag == 'title': self.in_title = True
        if tag == 'link' and values.get('rel') == 'canonical': self.canonical = values.get('href')
        if tag == 'meta' and values.get('name') == 'robots':
            self.robots = values.get('content')
            self.robot_rules.extend(value.strip() for value in (self.robots or '').split(','))
        if tag == 'meta' and values.get('name') == 'description': self.description = values.get('content')
        if 'id' in values:
            self.ids.add(values['id'])
        if tag == 'html':
            self.language = values.get('lang')
        if tag == 'meta' and (values.get('property') == 'og:image' or values.get('name') == 'twitter:image'):
            self.social_images.append(values.get('content', ''))
        for attribute in ('href', 'src'):
            if values.get(attribute):
                self.references.append(values[attribute])

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False

    def handle_data(self, data):
        if self.in_title: self.title += data


documents = {p: Document(p.read_text()) for p in root.rglob('*.html')}
checked = 0
for page in tuple(root / name for name in ('index.html', 'privacy/index.html', 'download/index.html', 'terms/index.html')):
    if page not in documents or documents[page].language != 'en':
        raise SystemExit('Missing English static page')
    if len(documents[page].social_images) < 2:
        raise SystemExit('Missing social preview images')
    for image in documents[page].social_images:
        if urlsplit(image).path != prefix + '/quotagrain-cover-en.png':
            raise SystemExit('Incorrect social-image repository prefix')
    for reference in documents[page].references:
        url = urlsplit(reference)
        if url.scheme or url.netloc:
            continue
        if not url.path:
            target = page
        else:
            if not url.path.startswith(prefix + '/'):
                raise SystemExit(f'Unprefixed local URL: {url.path}')
            local = unquote(url.path[len(prefix):]).lstrip('/')
            target = (root / local).resolve()
            if not target.is_relative_to(root):
                raise SystemExit('Path escaped static root')
            if target.is_dir():
                target /= 'index.html'
        if not target.is_file():
            raise SystemExit(f'Missing static target: {target.relative_to(root)}')
        if url.fragment and target in documents and unquote(url.fragment) not in documents[target].ids:
            raise SystemExit(f'Missing anchor: {url.fragment}')
        checked += 1
home = (root / 'index.html').read_text()
# Contact-only public exports must never inherit a Test checkout from the shell.
mode = sys.argv[5] if len(sys.argv) > 5 else 'contact'
checkout_links = [ref for ref in documents[root / 'index.html'].references if 'pancake.waffo.ai' in ref]
if mode == 'contact':
    assert not checkout_links, 'Contact mode contains a checkout link'
    assert 'https://github.com/seanye73/QuotaGrain-for-Codex#support' in home
    assert 'Support and unlock' in home
    assert 'Contact the developer' not in home
elif mode == 'test':
    assert sys.argv[4] != 'true', 'Public export contains Test checkout'
    assert checkout_links == ['https://pancake.waffo.ai/store/x73-sean-g4egu1yo/product/PROD_6LLeD2gqABEfgjJfl3vG8j?type=onetime&currency=USD&test=true']
elif mode == 'live':
    assert checkout_links == [sys.argv[6]], 'Live checkout differs from explicit build configuration'
    assert 'test=' not in checkout_links[0].lower()
else:
    raise SystemExit('Unknown checkout mode')
for page in tuple(root / name for name in ('index.html', 'privacy/index.html', 'download/index.html', 'terms/index.html')):
    if 'development preview' in page.read_text().lower() or '开发预览' in page.read_text():
        raise SystemExit('Retired preview copy still present')
# User requested final release copy in this unpublished draft. This does not
# attest to notarization; the private build manifest retains that release gate.
if 'Developer ID signed' not in home or 'Apple notarized' not in home:
    raise SystemExit('Expected final release badge copy is missing')
if not (root / '.nojekyll').is_file():
    raise SystemExit('Missing .nojekyll')
print(f'Pages static check passed: 4 English pages, {checked} local references and anchors.')

if len(sys.argv) > 4:
    import xml.etree.ElementTree as ET
    site = sys.argv[3].rstrip('/')
    indexable = sys.argv[4] == 'true'
    titles = set()
    descriptions = set()
    expected_urls = []
    for route in ('', 'download/', 'privacy/', 'terms/'):
        doc = documents[root / route / 'index.html']
        expected = site + '/' + route
        assert doc.canonical == expected, (route, doc.canonical, expected)
        assert doc.robots == ('index, follow' if indexable else 'noindex, nofollow'), (route, doc.robots)
        assert doc.description and doc.title
        titles.add(doc.title)
        descriptions.add(doc.description)
        expected_urls.append(expected)
    assert len(titles) == len(descriptions) == 4, 'Each route needs distinct metadata'
    tree = ET.parse(root / 'sitemap.xml')
    assert [loc.text for loc in tree.findall('.//{*}loc')] == expected_urls
    robots = (root / 'robots.txt').read_text()
    assert ('Allow: /' in robots) if indexable else ('Disallow: /' in robots)
    assert 'Does API token usage show my remaining balance?' in home
    print('Search metadata passed: four unique titles/descriptions, canonical URLs, robots, sitemap and English FAQ.')

for relative in ('404.html', '404/index.html', '_not-found/index.html'):
    error_file = root / relative
    if error_file.is_file():
        doc = documents[error_file]
        assert doc.title == 'Page not found — QuotaGrain for Codex', doc.title
        assert doc.canonical is None, doc.canonical
        assert 'noindex' in doc.robot_rules and 'index' not in doc.robot_rules, doc.robot_rules
        assert not doc.social_images, 'Error page inherited product sharing images'
        assert prefix + '/' in doc.references, 'Error page needs a home link'
assert 'with Codex installed for account sign-in and client launching' in (root / 'download/index.html').read_text()
assert 'including the build number shown in About' in (root / 'privacy/index.html').read_text()
assert 'mailto:x73.sean.ye@outlook.com?' not in (root / 'privacy/index.html').read_text(), 'Retired feedback template'
assert '/quotagrain-hourglass.png' not in home, 'Oversized brand image still requested'
import struct
icon = (root / 'quotagrain-icon-256.png').read_bytes()
assert struct.unpack('>II', icon[16:24]) == (256, 256)
assert len(icon) < 65536
assert (root / 'favicon.ico').is_file()
assert (root / 'favicon-v3.ico').is_file()
assert (root / 'favicon-v4.png').is_file()
assert prefix + '/favicon-v4.png' in {urlsplit(ref).path for ref in documents[root / 'index.html'].references}
print('SEO follow-up passed: error-page metadata, compact icon, installation requirements and brief feedback.')

assert 'https://github.com/seanye73/QuotaGrain-for-Codex/releases/latest/download/QuotaGrain-for-Codex-arm64.dmg' in documents[root / 'download/index.html'].references
assert 'View the product on GitHub' not in (root / 'download/index.html').read_text()
privacy = (root / 'privacy/index.html').read_text()
assert '/responses' in privacy and 'may incur provider charges' in privacy
assert 'SHA-256' in privacy
assert 'cumulative total of 2 Macs' in home
assert 'device unbinding and transfers to replacement macs are not offered' in (root / 'terms/index.html').read_text().lower()
print('Release copy passed: cumulative devices, Responses disclosure, stable download and checkout mode.')

# Public review requirements: every product page exposes legal/contact links.
import re
for public_page in ['index.html', 'privacy/index.html', 'terms/index.html', 'download/index.html']:
    page_html = (root / public_page).read_text()
    footer = re.search(r'<footer\b[^>]*>(.*?)</footer>', page_html, re.S)
    assert footer, f'Missing footer: {public_page}'
    assert 'mailto:x73.sean.ye@outlook.com' in footer.group(1), f'Missing footer support: {public_page}'
    assert re.search(r'href="[^"]*/privacy/"', footer.group(1)), f'Missing full privacy link: {public_page}'
terms_html = (root / 'terms/index.html').read_text()
assert 'Disclaimer and responsibility' in terms_html
assert 'Licence violations and termination' in terms_html
print('Waffo precheck coverage: privacy/contact footers and licence responsibility sections passed.')
