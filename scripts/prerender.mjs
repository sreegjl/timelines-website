import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')

const wikiPages = readdirSync(resolve(__dirname, '..', 'src', 'data', 'wiki'))
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
      let filePath = resolve(dir, req.url === '/' ? 'index.html' : req.url.slice(1))
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
}

prerender().catch((err) => {
  console.error(err)
  process.exit(1)
})
