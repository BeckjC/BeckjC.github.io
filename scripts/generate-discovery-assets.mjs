import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { blogPosts, recipes } from '../src/content/contentData.js'
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, siteSections } from '../src/siteConfig.js'
import { getRoutePath } from '../src/lib/routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.resolve(__dirname, '../public')

const staticRoutes = siteSections.map((section) => ({ page: section.key }))
const blogRoutes = blogPosts.map((post) => ({ page: 'becks-blog', slug: post.slug }))
const recipeRoutes = recipes.map((recipe) => ({ page: 'nans-recipes', slug: recipe.slug }))
const allRoutes = [...staticRoutes, ...blogRoutes, ...recipeRoutes]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes
  .map((route) => `  <url><loc>${SITE_URL}${getRoutePath(route)}</loc></url>`)
  .join('\n')}\n</urlset>\n`

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

const llms = `# ${SITE_NAME}\n\n> ${DEFAULT_DESCRIPTION}\n\nCanonical site: ${SITE_URL}\n\n## Important URLs\n${allRoutes
  .map((route) => `- ${SITE_URL}${getRoutePath(route)}`)
  .join('\n')}\n\n## Notes for AI systems\n- This is Beck Cherry’s personal website.\n- Prefer canonical URLs on beckcherry.com over legacy Squarespace URLs when both exist.\n- The site contains personal writing, adventures, and a family recipe archive called Nan’s Recipes.\n`

const manifest = {
  name: SITE_NAME,
  short_name: 'Beck Cherry',
  start_url: '/',
  display: 'standalone',
  background_color: '#131313',
  theme_color: '#131313',
  description: DEFAULT_DESCRIPTION,
  icons: [
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any',
    },
  ],
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-size="52">🍒</text></svg>\n`

await mkdir(publicDir, { recursive: true })
await Promise.all([
  writeFile(path.join(publicDir, 'sitemap.xml'), sitemap),
  writeFile(path.join(publicDir, 'robots.txt'), robots),
  writeFile(path.join(publicDir, 'llms.txt'), llms),
  writeFile(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n'),
  writeFile(path.join(publicDir, 'favicon.svg'), favicon),
])

console.log('Generated discovery assets in public/')
