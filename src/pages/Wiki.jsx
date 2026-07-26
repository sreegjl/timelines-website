import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import usePageMeta from '../hooks/usePageMeta'
import { wikiIndexLd, wikiArticleLd } from '../data/structuredData'

const pages = Object.entries(
  import.meta.glob('../data/wiki/*.md', { eager: true, query: '?raw', import: 'default' })
).map(([path, content]) => {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  return { slug, content }
})

const slugSet = new Set(pages.map((p) => p.slug))

const slugLabel = (slug) => slug.replace(/-/g, ' ')

function resolveWikiLinks(content) {
  return content.replace(/\[\[([^\]]+)\]\]/g, (_, target) => {
    const [rawSlug, alias] = target.split('|')
    const slug = rawSlug.trim()
    const label = (alias ?? slug).trim().replace(/-/g, ' ')
    if (slugSet.has(slug)) {
      return `[${label}](/wiki/${slug})`
    }
    return label
  })
}

// Search-result snippets, one per wiki page. Keep each roughly 140-160
// characters so Google shows it whole instead of rewriting it.
const descriptions = {
  Home: 'Documentation for Timelines Studio, the free open-source timeline app. Covers installation, the editor, elements, dates, notes, themes, and exporting.',
  Installation: 'Install Timelines Studio on Windows or macOS from the latest release, or build it from source with Node.js. Early alpha, free and open-source.',
  Interface: 'A tour of the Timelines Studio editor: the sidebar with timeline, tag, and group tabs, the central canvas, and the right-hand details panel.',
  Elements: 'Events, spans, and eras are the three building blocks of a timeline. Learn what each one does, its properties, and how to create and edit them.',
  Dates: 'How to write dates in Timelines Studio: years, months, full calendar dates, negative years for dates before year 0, and keywords that track the present.',
  Organization: 'Use tags and groups to manage large timelines. Color-code, spotlight, hide, and label elements, and reorder grouped tracks on the canvas.',
  Notes: 'Attach a Markdown note and a MediaWiki article to any element. Covers the built-in editor, underline and highlight syntax, and linking existing files.',
  Searching: 'Search timelines by title or use filter syntax for tags, dates, and element types, from the sidebar search bar or the Ctrl+F global overlay.',
  Files: 'Where Timelines Studio stores your data: .timeline JSON files, note folders, and image assets, plus how saving, renaming, and deleting work.',
  'Git-Sync': 'Connect your library to a Git repo for cross-device sync, version history, and shareable viewer links. Experimental, and your data goes only to your repo.',
  Themes: 'Set an app theme and per-timeline themes in Timelines Studio, or install and build custom .json themes with your own colors and Google Fonts.',
  Exporting: 'Export a timeline as a PNG, video, JSON, or packaged .timeline file that bundles images and notes for sharing or opening in the web viewer.',
}

const sidebar = [
  'Home',
  'Installation',
  'Interface',
  'Elements',
  'Dates',
  'Organization',
  'Notes',
  'Searching',
  'Files',
  'Git-Sync',
  'Themes',
  'Exporting',
]

function Wiki() {
  const { page } = useParams()
  const navigate = useNavigate()
  const activeSlug = page || 'Home'
  const activePage = pages.find((p) => p.slug === activeSlug)

  const label = slugLabel(activeSlug)
  const pageDescription =
    descriptions[activeSlug] || `Timelines Studio wiki: ${label}.`

  usePageMeta({
    title: activeSlug === 'Home' ? 'Wiki' : label,
    description: pageDescription,
    jsonLd:
      activeSlug === 'Home'
        ? wikiIndexLd
        : wikiArticleLd({ slug: activeSlug, label, description: pageDescription }),
  })

  return (
    <div className="page wiki">
      <div className="wiki-layout">
        <aside className="wiki-sidebar">
          <nav>
            {sidebar.map((name) => (
              <Link
                key={name}
                to={name === 'Home' ? '/wiki' : `/wiki/${name}`}
                className={`wiki-sidebar-link${activeSlug === name ? ' active' : ''}`}
              >
                {slugLabel(name)}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="wiki-mobile-nav">
          <select
            value={activeSlug}
            onChange={(e) => navigate(e.target.value === 'Home' ? '/wiki' : `/wiki/${e.target.value}`)}
          >
            {sidebar.map((name) => (
              <option key={name} value={name}>{slugLabel(name)}</option>
            ))}
          </select>
        </div>
        <article className="wiki-content">
          {activePage ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children, ...props }) => {
                  if (href && href.startsWith('/')) {
                    return <Link to={href}>{children}</Link>
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
                },
                img: ({ src, alt, ...props }) => (
                  <img src={src} alt={alt} loading="lazy" {...props} />
                ),
              }}
            >
              {resolveWikiLinks(activePage.content)}
            </ReactMarkdown>
          ) : (
            <div className="wiki-not-found">
              <h2>Page not found</h2>
              <p>The page &ldquo;{activeSlug}&rdquo; doesn&apos;t exist yet.</p>
              <Link to="/wiki">Back to Wiki Home</Link>
            </div>
          )}
        </article>
      </div>

      <div className="survey-callout">
        <p>Help shape the future of Timelines. Takes under 2 minutes.</p>
        <a href="https://forms.gle/Bbe74yyrZ7zhKeFL8" className="btn btn-primary survey-callout-btn" target="_blank" rel="noopener noreferrer">
          Take the Survey <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}

export default Wiki
