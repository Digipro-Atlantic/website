// Writes a static HTML file for every public page after `vite build`, so
// search engines and link previews (WhatsApp, LinkedIn, X) get each page's
// content and head tags without running JavaScript. Also writes 404.html and
// a sitemap generated from the same page list.
//
// Expects the client build in dist/ and the server build in dist/server/.

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const serverDir = path.join(dist, 'server')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const { render, pageSeo, pageHead, siteHead, site } = await import(
    pathToFileURL(path.join(serverDir, 'entry-server.js')).href
)

const escape = (value) =>
    String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')

// `data-prerender` marks these so main.tsx can drop them once the router's own tags take over.
const tag = (name, attributes) =>
    `<${name} data-prerender ${Object.entries(attributes)
        .map(([key, value]) => `${key}="${escape(value)}"`)
        .join(' ')} />`

/** The same tags the router adds in the browser, as static HTML. */
const headTags = ({ meta, links = [] }) =>
    [
        ...meta.map((entry) =>
            'title' in entry
                ? `<title data-prerender>${escape(entry.title)}</title>`
                : tag('meta', entry),
        ),
        ...links.map((entry) => tag('link', entry)),
    ]
        .map((line) => `        ${line}`)
        .join('\n')

const organisation = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/favicon.png`,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: '6 Asabi Cole Street, Alausa Central Business District',
        addressLocality: 'Ikeja',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
    },
}

// React 19 renders the router's <title>/<meta>/<link> inline; they are baked into <head> instead.
const stripHeadTags = (html) =>
    html
        .replace(/<title>[\s\S]*?<\/title>/g, '')
        .replace(/<meta [^>]*?\/?>/g, '')
        .replace(/<link rel="canonical"[^>]*?\/?>/g, '')

const page = (head, body, extraHead = '') =>
    template
        .replace(
            /^\s*<!-- Title, description and preview tags[^>]*-->\n/m,
            `${headTags(head)}\n${extraHead}`,
        )
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

const write = (file, html) => {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, html)
}

const paths = Object.keys(pageSeo)
for (const url of paths) {
    const head = pageHead(url)
    const merged = { meta: [...siteHead.meta, ...head.meta], links: head.links }
    const jsonLd =
        url === '/'
            ? `        <script type="application/ld+json">${JSON.stringify(organisation)}</script>\n`
            : ''
    const body = stripHeadTags(await render(url))
    const file =
        url === '/'
            ? path.join(dist, 'index.html')
            : path.join(dist, url.slice(1), 'index.html')
    write(file, page(merged, body, jsonLd))
    console.log(`prerendered ${url}`)
}

// Unknown addresses: the host serves this with a real 404 status.
const notFoundBody = stripHeadTags(await render('/__not-found__'))
write(
    path.join(dist, '404.html'),
    page(
        {
            meta: [
                { title: `Page not found | ${site.name}` },
                { name: 'robots', content: 'noindex' },
                ...siteHead.meta,
            ],
        },
        notFoundBody,
    ),
)
console.log('prerendered 404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
    .filter((url) => !pageSeo[url].noindex)
    .map(
        (url) =>
            `  <url>\n    <loc>${site.url}${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log(`sitemap.xml: ${paths.length} pages`)

fs.rmSync(serverDir, { recursive: true, force: true })
