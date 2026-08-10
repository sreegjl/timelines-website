import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import usePageMeta from '../hooks/usePageMeta'
import { wikiIndexLd, wikiArticleLd } from '../data/structuredData'

const headingId = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Pull the h2s out of a page so the sidebar can list them. Fenced code blocks
// are skipped so a commented-out "## foo" inside a snippet never shows up.
function extractHeadings(markdown) {
  const headings = []
  let inFence = false
  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const match = /^##\s+(.+?)\s*$/.exec(line)
    if (!match) continue
    const text = match[1]
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, slug, alias) => alias ?? slug)
      .replace(/[*_`]/g, '')
    headings.push({ id: headingId(text), text })
  }
  return headings
}

// The rendered h2 gets its id from the same text the TOC slugified, so the
// anchors always line up.
const nodeText = (node) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (node && typeof node === 'object' && node.props) return nodeText(node.props.children)
  return ''
}

const pages = Object.entries(
  import.meta.glob('../data/wiki/*.md', { eager: true, query: '?raw', import: 'default' })
).map(([path, content]) => {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  return { slug, content, headings: extractHeadings(content) }
})

const slugSet = new Set(pages.map((p) => p.slug))

// Stable identity so the scroll-spy effect doesn't re-run every render on a
// page that has no headings.
const NO_HEADINGS = []

// Matches the h2 scroll-margin-top in App.css: a heading at or above this line
// counts as scrolled past.
const HEADING_OFFSET = 88

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
  Dates: 'How to write dates in Timelines Studio: years, months, full calendar dates, era labels like BCE, circa markers for approximate dates, and dynamic keywords.',
  Organization: 'Use tags and groups to manage large timelines. Color-code, spotlight, hide, and label elements, and reorder grouped tracks on the canvas.',
  Notes: 'Attach a Markdown note and a MediaWiki article to any element. Covers the built-in editor, underline and highlight syntax, and linking existing files.',
  Searching: 'Search timelines by title or use filter syntax for tags, dates, element types, and span families. Shift-click a span to focus it and its children.',
  Files: 'Where Timelines Studio stores your data: .timeline JSON files, note folders, and image assets, plus how saving, renaming, and deleting work.',
  'Git-Sync': 'Connect your library to a Git repo for cross-device sync, version history, and shareable viewer links. Experimental, and your data goes only to your repo.',
  Themes: 'Set an app theme and per-timeline themes in Timelines Studio, or install and build custom .json themes with your own colors and Google Fonts.',
  Exporting: 'Export a timeline as a PNG, video, JSON, or packaged .timeline file that bundles images and notes for sharing or opening in the web viewer.',
}

// The Clipboard API is unavailable outside secure contexts and can be denied
// by permission policy, so fall back to a throwaway selection.
async function writeToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const scratch = document.createElement('textarea')
      scratch.value = text
      scratch.setAttribute('readonly', '')
      scratch.style.position = 'fixed'
      scratch.style.top = '0'
      scratch.style.opacity = '0'
      document.body.appendChild(scratch)
      scratch.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(scratch)
      return ok
    } catch {
      return false
    }
  }
}

function CodeBlock({ children, ...props }) {
  const preRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    const text = preRef.current?.textContent ?? ''
    if (!text) return
    // Only confirm a copy that actually happened.
    if (await writeToClipboard(text)) setCopied(true)
  }

  return (
    <div className="wiki-code">
      <pre ref={preRef} {...props}>{children}</pre>
      <button
        type="button"
        className={`wiki-code-copy${copied ? ' copied' : ''}`}
        onClick={copy}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
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
  const headings = activePage?.headings ?? NO_HEADINGS
  // Tagged with the page it belongs to, so a stale id from the previous page
  // can't highlight a same-named section on this one.
  const [activeHeading, setActiveHeading] = useState(null)
  // Before the first scroll, the reader is above every heading, so the opening
  // section is the one they're looking at.
  const activeHeadingId =
    activeHeading?.slug === activeSlug ? activeHeading.id : (headings[0]?.id ?? '')

  // Landing on /wiki/Files#saving: the markdown renders after mount, so the
  // browser's own hash scroll has nothing to aim at yet.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, [activeSlug])

  // Follow the reader down the page: the active section is the last heading
  // they have scrolled past. An IntersectionObserver leaves gaps here, since a
  // short page's final heading may never reach the middle of the viewport.
  useEffect(() => {
    if (!headings.length) return
    const onScroll = () => {
      const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean)
      if (!els.length) return
      // Anything left unreachable at the bottom of the page belongs to the
      // last section, so pin it there once the reader hits the end.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = els[0]
      if (atBottom) {
        current = els[els.length - 1]
      } else {
        for (const el of els) {
          if (el.getBoundingClientRect().top <= HEADING_OFFSET) current = el
        }
      }
      setActiveHeading({ slug: activeSlug, id: current.id })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headings, activeSlug])

  const handleSectionClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
    setActiveHeading({ slug: activeSlug, id })
  }

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
              <div key={name}>
                <Link
                  to={name === 'Home' ? '/wiki' : `/wiki/${name}`}
                  className={`wiki-sidebar-link${activeSlug === name ? ' active' : ''}`}
                >
                  {slugLabel(name)}
                </Link>
                {activeSlug === name && headings.length > 0 && (
                  <div className="wiki-sidebar-sections">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`wiki-sidebar-section${activeHeadingId === h.id ? ' active' : ''}`}
                        onClick={(e) => handleSectionClick(e, h.id)}
                      >
                        {h.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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
                h2: ({ children, ...props }) => (
                  <h2 id={headingId(nodeText(children))} {...props}>{children}</h2>
                ),
                pre: CodeBlock,
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
