import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { execFileSync } from 'child_process'

const wikiDir = resolve(import.meta.dirname, 'src', 'data', 'wiki')

// Commit date for a file as YYYY-MM-DD, or null without git history.
function gitDate(args, file) {
  try {
    const out = execFileSync('git', ['log', ...args, '--format=%cs', '--', file], {
      cwd: import.meta.dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim().split('\n')
    // --follow lists newest first, so the creation commit is the last line.
    const date = args.includes('--follow') ? out[out.length - 1] : out[0]
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null
  } catch {
    return null
  }
}

// Exposes `virtual:wiki-dates`: { [slug]: { published, modified } } from git,
// so wiki pages can show a last-updated date that matches the sitemap.
function wikiDates() {
  const id = 'virtual:wiki-dates'
  const resolved = '\0' + id
  return {
    name: 'wiki-dates',
    resolveId: (source) => (source === id ? resolved : null),
    load(loadId) {
      if (loadId !== resolved) return null
      const dates = {}
      for (const file of readdirSync(wikiDir).filter((f) => f.endsWith('.md'))) {
        const path = `src/data/wiki/${file}`
        dates[file.replace(/\.md$/, '')] = {
          published: gitDate(['--follow'], path),
          modified: gitDate(['-1'], path),
        }
      }
      return `export default ${JSON.stringify(dates)}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wikiDates()],
  base: '/',
})
