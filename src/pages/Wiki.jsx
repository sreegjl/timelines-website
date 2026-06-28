import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import usePageMeta from '../hooks/usePageMeta'

const pages = Object.entries(
  import.meta.glob('../data/wiki/*.md', { eager: true, query: '?raw', import: 'default' })
).map(([path, content]) => {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  return { slug, content }
})

const slugSet = new Set(pages.map((p) => p.slug))

function resolveWikiLinks(content) {
  return content.replace(/\[\[([^\]]+)\]\]/g, (_, slug) => {
    const label = slug.replace(/-/g, ' ')
    if (slugSet.has(slug)) {
      return `[${label}](/wiki/${slug})`
    }
    return label
  })
}

const sidebar = [
  'Home',
  'Installation',
  'Interface',
  'Elements',
  'Organization',
  'Notes',
  'Searching',
  'Themes',
  'Exporting',
]

function Wiki() {
  const { page } = useParams()
  const navigate = useNavigate()
  const activeSlug = page || 'Home'
  const activePage = pages.find((p) => p.slug === activeSlug)

  usePageMeta({
    title: activeSlug === 'Home' ? 'Wiki' : activeSlug,
    description: `Timelines wiki — ${activeSlug.replace(/-/g, ' ')}`,
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
                {name}
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
              <option key={name} value={name}>{name}</option>
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
