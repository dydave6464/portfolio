// Runs at the end of `vite build` (see vite.config.js).
//
// Writes one HTML file per page (dist/about.html, dist/projects/nailsthetic.html, ...)
// with that page's own title, description, canonical URL, link-preview tags, and
// structured data, so search engines and link previews get the right details without
// running JavaScript. React still renders the page as usual.
//
// vercel.json uses "cleanUrls", so /about serves about.html, and any path not listed
// here gets 404.html with a real 404 status (React then shows the "not found" page).
//
// When you add a page to the app, add it to ROUTES below.

import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://portfolio-debdev.vercel.app' // update this if you add a custom domain
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const PERSON = {
  '@type': 'Person',
  name: 'John Dave Villasan',
  alternateName: 'Dave',
  jobTitle: 'Web Developer',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/portrait.webp`,
  address: { '@type': 'PostalAddress', addressLocality: 'Cebu City', addressCountry: 'PH' },
  affiliation: { '@type': 'CollegeOrUniversity', name: 'University of Cebu' },
  knowsAbout: ['Web development', 'React', 'Tailwind CSS', 'Node.js', 'TypeScript', 'C#', '.NET', 'MySQL'],
  sameAs: [
    'https://www.linkedin.com/in/john-dave-villasan-9515a23b4/',
    'https://github.com/dydave6464',
  ],
}

const ROUTES = [
  {
    path: '/',
    file: 'index.html',
    title: 'Dave Villasan · Web Developer in Cebu',
    description:
      'Portfolio of John Dave Villasan, a BSIT student and web developer in Cebu City building calm, considered websites with React, Tailwind CSS, and Node.js.',
    jsonLd: { '@context': 'https://schema.org', ...PERSON },
  },
  {
    path: '/about',
    file: 'about.html',
    title: 'About · Dave Villasan',
    description:
      'About Dave Villasan, a BSIT student at the University of Cebu, Main Campus, open to internships, collaborations, and freelance web projects.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: PERSON },
  },
  {
    path: '/projects',
    file: 'projects.html',
    title: 'Projects · Dave Villasan',
    description:
      'Selected work by Dave Villasan, including Nailsthetic, a mobile-first marketing site for a Cebu-based nail studio.',
  },
  {
    path: '/projects/nailsthetic',
    file: 'projects/nailsthetic.html',
    title: 'Nailsthetic case study · Dave Villasan',
    description:
      'How Dave Villasan built Nailsthetic, a calm, mobile-first marketing site for a Cebu-based nail studio, with React, Tailwind CSS, and Vite.',
  },
  {
    path: '/services',
    file: 'services.html',
    title: 'Services · Dave Villasan',
    description:
      'Web and mobile development services from Dave Villasan in Cebu City: marketing sites, landing pages, and small web apps.',
  },
  {
    path: '/contact',
    file: 'contact.html',
    title: 'Contact · Dave Villasan',
    description: 'Get in touch with Dave Villasan by email, phone, LinkedIn, or the contact form.',
  },
]

const NOT_FOUND = {
  file: '404.html',
  title: 'Page not found · Dave Villasan',
  description: 'This page could not be found.',
  noindex: true,
}

const START = '<!-- route-meta:start -->'
const END = '<!-- route-meta:end -->'

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headTags(page) {
  const url = page.path ? `${SITE_URL}${page.path}` : null
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    page.noindex
      ? '<meta name="robots" content="noindex" />'
      : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Dave Villasan, web developer in Cebu" />',
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    page.jsonLd &&
      `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

export function prerenderRoutes(distDir) {
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
  const start = template.indexOf(START)
  const end = template.indexOf(END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`prerender-routes: ${START} / ${END} markers not found in dist/index.html`)
  }
  const render = (page) =>
    template.slice(0, start) + `${START}\n    ${headTags(page)}\n    ` + template.slice(end)

  for (const page of [...ROUTES, NOT_FOUND]) {
    const out = path.join(distDir, page.file)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, render(page))
  }

  const urls = ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc></url>`).join('\n')
  fs.writeFileSync(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  )

  return ROUTES.length + 1
}
