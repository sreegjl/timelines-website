import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { resolve, dirname, relative, isAbsolute } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import { execFileSync } from 'child_process'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')
const siteUrl = 'https://timelines.studio'

const wikiPages = readdirSync(resolve(rootDir, 'src', 'data', 'wiki'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace('.md', ''))

const routes = [
  '/',
  '/download',
  '/changelog',
  '/gallery',
  '/brand',
  '/viewer-landing',
  '/wiki',
  ...wikiPages.filter((p) => p !== 'Home').map((p) => `/wiki/${p}`),
]

// Sitemap priority per route. Wiki articles fall through to the default.
const priorities = {
  '/': '1.0',
  '/download': '0.9',
  '/wiki': '0.8',
  '/gallery': '0.7',
  '/viewer-landing': '0.7',
  '/wiki/Installation': '0.7',
  '/changelog': '0.5',
  '/brand': '0.4',
}
const defaultPriority = '0.6'

// The file whose last commit date represents each route's content.
const sourceFiles = {
  '/': 'src/pages/Home.jsx',
  '/download': 'src/pages/Download.jsx',
  '/changelog': 'src/pages/Changelog.jsx',
  '/gallery': 'src/pages/Gallery.jsx',
  '/brand': 'src/pages/Brand.jsx',
  '/viewer-landing': 'src/pages/Viewer.jsx',
  '/wiki': 'src/data/wiki/Home.md',
}

function sourceFor(route) {
  if (sourceFiles[route]) return sourceFiles[route]
  if (route.startsWith('/wiki/')) return `src/data/wiki/${route.slice('/wiki/'.length)}.md`
  return null
}

// Last commit date for a file, as YYYY-MM-DD. Returns null when git history is
// unavailable (shallow clone, no repo), so the caller can fall back.
function lastCommitDate(file) {
  if (!file) return null
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null
  } catch {
    return null
  }
}

function writeSitemap() {
  const fallback = new Date().toISOString().slice(0, 10)
  let missingHistory = 0

  const entries = routes.map((route) => {
    const lastmod = lastCommitDate(sourceFor(route))
    if (!lastmod) missingHistory++
    const loc = `${siteUrl}${route === '/' ? '/' : route}`
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod || fallback}</lastmod>`,
      `    <priority>${priorities[route] || defaultPriority}</priority>`,
      '  </url>',
    ].join('\n')
  })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync(resolve(distDir, 'sitemap.xml'), xml)

  if (missingHistory > 0) {
    console.warn(
      `Sitemap: no git history for ${missingHistory}/${routes.length} routes, used build date. ` +
        'Set fetch-depth: 0 on actions/checkout for accurate lastmod.'
    )
  }
  console.log(`Wrote sitemap.xml with ${routes.length} urls`)
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

function serve(dir, port) {
  return new Promise((res) => {
    const server = createServer((req, res2) => {
      const filePath = resolveRequestPath(dir, req.url || '/')
      if (!filePath) {
        res2.writeHead(404, { 'Content-Type': 'text/plain' })
        res2.end('Not found')
        return
      }
      try {
        const data = readFileSync(filePath)
        const ext = '.' + filePath.split('.').pop()
        res2.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res2.end(data)
      } catch {
        const fallback = readFileSync(resolve(dir, 'index.html'))
        res2.writeHead(200, { 'Content-Type': 'text/html' })
        res2.end(fallback)
      }
    })
    server.listen(port, () => res(server))
  })
}

function resolveRequestPath(dir, requestUrl) {
  try {
    const { pathname } = new URL(requestUrl, 'http://localhost')
    const relativePath = pathname === '/'
      ? 'index.html'
      : decodeURIComponent(pathname.replace(/^\/+/, ''))
    const filePath = resolve(dir, relativePath)
    const dirRelativePath = relative(dir, filePath)

    if (dirRelativePath.startsWith('..') || isAbsolute(dirRelativePath)) {
      return null
    }

    return filePath
  } catch {
    return null
  }
}

async function prerender() {
  const port = 4173
  const server = await serve(distDir, port)

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()

  for (const route of routes) {
    const url = `http://localhost:${port}${route}`
    console.log(`Prerendering ${route}`)

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })
    const html = await page.content()

    const filePath = route === '/'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, route.slice(1), 'index.html')

    mkdirSync(dirname(filePath), { recursive: true })
    writeFileSync(filePath, html)
  }

  await browser.close()
  server.close()
  console.log(`Prerendered ${routes.length} routes`)

  writeSitemap()
}

prerender().catch((err) => {
  console.error(err)
  process.exit(1)
})
