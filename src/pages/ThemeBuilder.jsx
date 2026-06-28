import { useEffect, useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'

const defaultColors = {
  'text-primary': '#3A2E22',
  'ui-muted': '#90816D',
  'accent-color': '#DFD2B6',
  'surface-active': '#DFD2B6',
  'surface': '#EADFC8',
  'inset-bg': '#FBF3E1',
  'app-bg': '#FEF7E8',
  'text-muted': '#918C85',
  'text-subtle': '#807C76',
  'era-label': '#141414',
  'selection-color': '#87C6FA',
  'link-color': '#C66F3D',
  'highlight-color': '#F6D66A',
  'light-bg': '#F3EDE3',
  'border-color': '#D4CAB8',
  'secondary-text': '#807C76',
}

const colorGroups = [
  {
    title: 'Backgrounds',
    items: [
      { key: 'app-bg', label: 'app-bg', hint: 'App/timeline view background, inputs, and modal backgrounds' },
      { key: 'light-bg', label: 'light-bg', hint: 'Default era background color (fallback when an era has no custom color)' },
      { key: 'surface', label: 'surface', hint: 'Panels, cards, context menus, and secondary backgrounds' },
      { key: 'inset-bg', label: 'inset-bg', hint: 'Tertiary/inset backgrounds (wiki tables, export background option, homepage base)' },
    ],
  },
  {
    title: 'Text',
    items: [
      { key: 'text-primary', label: 'text-primary', hint: 'Primary text, icons, timeline line, and primary borders/fills' },
      { key: 'text-muted', label: 'text-muted', hint: 'Muted text (event dates, descriptions, subtle titles)' },
      { key: 'text-subtle', label: 'text-subtle', hint: 'Secondary/placeholder text, muted labels' },
      { key: 'era-label', label: 'era-label', hint: 'Era item label text color' },
    ],
  },
  {
    title: 'UI Chrome',
    items: [
      { key: 'border-color', label: 'border-color', hint: 'General borders (search bar, cards, pills, buttons)' },
      { key: 'ui-muted', label: 'ui-muted', hint: 'Muted/secondary icons, section labels, subtle borders and fills' },
      { key: 'surface-active', label: 'surface-active', hint: 'Active/selected state backgrounds (tabs, pills, toggles, primary buttons)' },
      { key: 'accent-color', label: 'accent-color', hint: 'General borders, dividers, and accent backgrounds (buttons, panels, hovers)' },
    ],
  },
  {
    title: 'Accents',
    items: [
      { key: 'link-color', label: 'link-color', hint: 'Link text and underline color' },
      { key: 'highlight-color', label: 'highlight-color', hint: 'Markdown highlight background (==highlight==)' },
      { key: 'selection-color', label: 'selection-color', hint: 'Selection outlines and highlight rings' },
      { key: 'secondary-text', label: 'secondary-text', hint: 'Default span fill/background color (fallback when a span has no custom color)' },
    ],
  },
]

function buildPreviewStyle(colors, fontFamily) {
  return {
    '--color-bg': colors['app-bg'],
    '--color-bg-alt': colors['light-bg'],
    '--color-surface': colors['surface'],
    '--color-card': colors['inset-bg'],
    '--color-border': colors['border-color'],
    '--color-ui-muted': colors['ui-muted'],
    '--color-surface-active': colors['surface-active'],
    '--color-text': colors['text-primary'],
    '--color-text-muted': colors['text-muted'],
    '--color-text-subtle': colors['text-subtle'],
    '--color-accent': colors['link-color'],
    '--color-accent-hover': `color-mix(in srgb, ${colors['link-color']} 88%, ${colors['text-primary']})`,
    '--color-accent-surface': colors['accent-color'],
    '--color-link': colors['link-color'],
    '--color-highlight': colors['highlight-color'],
    '--color-selection': colors['selection-color'],
    '--color-era-label': colors['era-label'],
    '--font-sans': fontFamily
      ? `"${fontFamily}", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
      : "'Lexend', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: colors['text-primary'],
    backgroundColor: colors['app-bg'],
    isolation: 'isolate',
  }
}

function ColorRow({ label, hint, value, onChange }) {
  return (
    <div className="tb-color-row">
      <label className="tb-color-label">
        <span className="tb-color-name">{label}</span>
        <span className="tb-color-hint">{hint}</span>
      </label>
      <div className="tb-color-input-wrap">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="tb-color-input"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="tb-color-hex"
          maxLength={7}
        />
      </div>
    </div>
  )
}

function ThemeBuilder() {
  usePageMeta({ title: 'Theme Builder', description: 'Design a custom theme for Timelines and download it as JSON.' })

  const [colors, setColors] = useState(defaultColors)
  const [fontFamily, setFontFamily] = useState('')
  const [fontCssUrl, setFontCssUrl] = useState('')
  const [showExport, setShowExport] = useState(false)
  const [themeName, setThemeName] = useState('')
  const [themeType, setThemeType] = useState('light')
  const [collection, setCollection] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const linkId = 'theme-builder-font'
    if (!fontCssUrl) {
      const el = document.getElementById(linkId)
      if (el) el.remove()
      return
    }
    let link = document.getElementById(linkId)
    if (link) {
      link.href = fontCssUrl
    } else {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      link.href = fontCssUrl
      document.head.appendChild(link)
    }
  }, [fontCssUrl])

  const updateColor = (key, value) => {
    setColors((prev) => ({ ...prev, [key]: value }))
  }

  const handleExport = () => {
    if (!themeName.trim() || !author.trim()) return
    const theme = {
      name: themeName.trim(),
      type: themeType,
      collection: collection.trim() || 'custom',
      author: author.trim(),
      colors: { ...colors },
    }
    if (fontFamily || fontCssUrl) {
      theme.font = {}
      if (fontFamily) theme.font.family = fontFamily
      if (fontCssUrl) theme.font.cssUrl = fontCssUrl
    }
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${themeName.trim().toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShowExport(false)
  }

  const previewStyle = buildPreviewStyle(colors, fontFamily)

  return (
    <div className="page theme-builder">
      <div className="tb-header">
        <h1>Theme Builder</h1>
        <p className="tb-subtitle">Design a custom theme for Timelines and download it as JSON.</p>
      </div>
      <div className="tb-layout">
        <div className="tb-preview-col">
          <div className="tb-preview" style={previewStyle}>
            <div className="hero-timeline">
              <div className="hero-titlebar">
                <div className="hero-titlebar-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="hero-titlebar-title">Ancient Greece — Timelines</span>
              </div>
              <div className="hero-timeline-body">
                <div className="hero-actionbar">
                  <button className="hero-actionbar-btn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                  </button>
                  <button className="hero-actionbar-btn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>
                  </button>
                  <div className="hero-actionbar-divider"></div>
                  <button className="hero-actionbar-btn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
                  </button>
                  <button className="hero-actionbar-btn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                  </button>
                </div>
                <div className="hero-sidebar">
                  <div className="hero-sidebar-file">
                    <div className="hero-sidebar-file-info">
                      <span className="hero-sidebar-file-name">ancient-greece.timeline <svg className="hero-sidebar-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span>
                      <span className="hero-sidebar-file-meta">Ancient Greece</span>
                    </div>
                  </div>
                  <div className="hero-sidebar-toolbar">
                    <div className="hero-sidebar-toolbar-icons">
                      <span className="hero-sidebar-toolbar-btn">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                      </span>
                      <span className="hero-sidebar-toolbar-btn">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                      </span>
                      <span className="hero-sidebar-toolbar-btn">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                      </span>
                    </div>
                    <span className="hero-sidebar-new-btn">+ New</span>
                  </div>
                  <div className="hero-sidebar-search">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                    <span>Search spans, events, eras...</span>
                    <svg className="hero-sidebar-search-sort" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5h10M11 9h7M11 13h4M3 17l3 3 3-3M6 18V4" /></svg>
                  </div>
                  <div className="hero-sidebar-filters">
                    <span className="hero-sidebar-filter active">All</span>
                    <span className="hero-sidebar-filter">politics</span>
                    <span className="hero-sidebar-filter">war</span>
                    <span className="hero-sidebar-filter">culture</span>
                  </div>
                  <div className="hero-sidebar-scroll">
                    <div className="hero-sidebar-group">
                      <div className="hero-sidebar-group-head" style={{ color: '#a08850' }}>
                        <svg className="hero-sidebar-group-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                        <span className="hero-sidebar-group-name">Classical</span>
                        <span className="hero-sidebar-group-count">8</span>
                      </div>
                      <div className="hero-sidebar-item"><span className="sidebar-dot" style={{ background: '#7898b7' }}></span><span className="sidebar-item-name">Athens</span><span className="sidebar-item-year">1068–146 BCE</span></div>
                      <div className="hero-sidebar-item"><span className="sidebar-dot" style={{ background: '#d28f51' }}></span><span className="sidebar-item-name">Corinth</span><span className="sidebar-item-year">900–146 BCE</span></div>
                      <div className="hero-sidebar-item"><span className="sidebar-dot" style={{ background: '#ac6969' }}></span><span className="sidebar-item-name">Sparta</span><span className="sidebar-item-year">900–146 BCE</span></div>
                      <div className="hero-sidebar-item"><span className="sidebar-indicator"></span><span className="sidebar-item-name">First Olympic Games</span><span className="sidebar-item-year">776 BCE</span></div>
                      <div className="hero-sidebar-item active"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Battle of Marathon</span><span className="sidebar-item-year">490 BCE</span></div>
                    </div>
                    <div className="hero-sidebar-group">
                      <div className="hero-sidebar-group-head" style={{ color: '#8f7260' }}>
                        <svg className="hero-sidebar-group-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                        <span className="hero-sidebar-group-name">Hellenistic</span>
                        <span className="hero-sidebar-group-count">4</span>
                      </div>
                      <div className="hero-sidebar-item"><span className="sidebar-dot" style={{ background: '#6d7d97' }}></span><span className="sidebar-item-name">Macedon</span><span className="sidebar-item-year">808–146 BCE</span></div>
                      <div className="hero-sidebar-item"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Death of Alexander</span><span className="sidebar-item-year">323 BCE</span></div>
                    </div>
                  </div>
                </div>
                <div className="hero-timeline-inner">
                  <div className="hero-event hero-event-lane-1" style={{ left: '3%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">First Olympic Games</div>
                        <div className="event-date">
                          <span className="event-year">776 BCE</span>
                          <span className="pinned-tag">Sport</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-0 hero-event-to-sparta" style={{ left: '14%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Lycurgus&apos; Reforms</div>
                        <div className="event-date">
                          <span className="event-year">700 BCE</span>
                          <span className="pinned-tag">Sparta</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-1 hero-event-to-athens" style={{ left: '26%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Draco&apos;s Legislation</div>
                        <div className="event-date">
                          <span className="event-year">621 BCE</span>
                          <span className="pinned-tag">Law</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-0 hero-event-selected" style={{ left: '44%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Battle of Marathon</div>
                        <div className="event-date">
                          <span className="event-year">490 BCE</span>
                          <span className="pinned-tag">War</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-1" style={{ left: '53%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Peloponnesian War</div>
                        <div className="event-date">
                          <span className="event-year">431 BCE</span>
                          <span className="pinned-tag">War</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-0" style={{ left: '67%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Alexander&apos;s Campaign</div>
                        <div className="event-date">
                          <span className="event-year">334 BCE</span>
                          <span className="pinned-tag">Macedon</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-1" style={{ left: '78%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Death of Alexander</div>
                        <div className="event-date">
                          <span className="event-year">323 BCE</span>
                          <span className="pinned-tag">Succession</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>
                  <div className="hero-event hero-event-lane-0" style={{ left: '93%' }}>
                    <div className="hero-event-card">
                      <div className="event-text-content">
                        <div className="event-title">Fall of Corinth</div>
                        <div className="event-date">
                          <span className="event-year">146 BCE</span>
                          <span className="pinned-tag">Rome</span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-event-connector"></div>
                    <div className="hero-event-dot"></div>
                  </div>

                  <div className="hero-span hero-span-athens" style={{ left: '0%', width: '93%' }}>
                    <span className="span-title">Athens</span>
                    <span className="span-years">1068 – 146 BCE</span>
                  </div>
                  <div className="hero-span hero-span-corinth" style={{ left: '0%', width: '93%' }}>
                    <span className="span-title">Corinth</span>
                    <span className="span-years">900 – 146 BCE</span>
                  </div>
                  <div className="hero-branch-connector" style={{ left: '8%' }}></div>
                  <div className="hero-span hero-span-megara" style={{ left: '8%', width: '85%' }}>
                    <span className="span-title">Megara</span>
                    <span className="span-years">745 – 146 BCE</span>
                  </div>
                  <div className="hero-span hero-span-sparta" style={{ left: '0%', width: '93%' }}>
                    <span className="span-title">Sparta</span>
                    <span className="span-years">900 – 146 BCE</span>
                  </div>
                  <div className="hero-span hero-span-macedon" style={{ left: '0%', width: '67%' }}>
                    <span className="span-title">Macedon</span>
                    <span className="span-years">808 – 334 BCE</span>
                  </div>

                  <div className="hero-gridline" style={{ left: '0%' }}></div>
                  <div className="hero-gridline hero-gridline-minor" style={{ left: '14%' }}></div>
                  <div className="hero-gridline" style={{ left: '29%' }}></div>
                  <div className="hero-gridline hero-gridline-minor" style={{ left: '43%' }}></div>
                  <div className="hero-gridline" style={{ left: '57%' }}></div>
                  <div className="hero-gridline hero-gridline-minor" style={{ left: '71%' }}></div>
                  <div className="hero-gridline" style={{ left: '86%' }}></div>
                  <div className="hero-gridline hero-gridline-minor" style={{ left: '100%' }}></div>

                  <div className="hero-axis">
                    <div className="hero-axis-line"></div>
                    <span className="hero-tick" style={{ left: '0%' }}>800 BCE</span>
                    <span className="hero-tick" style={{ left: '29%' }}>600 BCE</span>
                    <span className="hero-tick" style={{ left: '57%' }}>400 BCE</span>
                    <span className="hero-tick" style={{ left: '86%' }}>200 BCE</span>
                  </div>

                  <div className="hero-era hero-era-archaic" style={{ left: '0%', width: '46%' }}>Archaic</div>
                  <div className="hero-era hero-era-classical" style={{ left: '46%', width: '22%' }}>Classical</div>
                  <div className="hero-era hero-era-hellenistic" style={{ left: '68%', width: '32%' }}>Hellenistic</div>
                </div>
                <div className="hero-panel">
                  <div className="notes-panel-head">
                    <span>Event</span>
                    <div className="notes-panel-actions">
                      <span className="notes-action-button">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 20h8" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                        </svg>
                      </span>
                      <span className="notes-action-button">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="hero-panel-body">
                    <div className="notes-props">
                      <div className="notes-prop">
                        <span className="notes-prop-key">name</span>
                        <span className="notes-prop-dots"></span>
                        <span className="notes-prop-value strong">Battle of Marathon</span>
                      </div>
                      <div className="notes-prop">
                        <span className="notes-prop-key">date</span>
                        <span className="notes-prop-dots"></span>
                        <span className="notes-prop-value mono">490 BCE</span>
                      </div>
                      <div className="notes-prop">
                        <span className="notes-prop-key">parent</span>
                        <span className="notes-prop-dots"></span>
                        <span className="notes-prop-value link">Athens</span>
                      </div>
                    </div>
                    <div className="notes-article">
                      <div className="notes-article-head">
                        <svg className="notes-article-icon" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                          <path d="M14 3v6h6" />
                        </svg>
                        <span>Note</span>
                        <span className="notes-article-meta">markdown · 312 words</span>
                      </div>
                      <div className="notes-article-body">
                        <p>
                          The <strong>Battle of Marathon</strong> took place in 490 BC during the first <a href="#">Persian invasion of Greece</a>. It was fought between the citizens of <a href="#">Athens</a>, aided by <a href="#">Plataea</a>, and a Persian force commanded by Datis and Artaphernes.
                        </p>
                        <h4 className="hero-panel-heading">Background</h4>
                        <p>
                          The first Persian invasion was a response to Athenian support for the <a href="#">Ionian Revolt</a>. Darius I sent a naval expedition across the Aegean, sacking <em>Naxos</em> and <em>Eretria</em> before landing at Marathon.
                        </p>
                        <blockquote className="hero-panel-quote">
                          &ldquo;The Athenians at Marathon, fighting for the freedom of Greece, overthrew the might of the barbarians.&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero-scrollbar">
                  <div className="hero-scrollbar-track">
                    <div className="hero-scrollbar-play">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 3 20 12 6 21" /></svg>
                    </div>
                    <div className="hero-scrollbar-rail">
                      <div className="hero-scrollbar-thumb"></div>
                    </div>
                    <div className="hero-scrollbar-year">500 BCE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tb-settings-col">
          <div className="tb-settings">
            <h3 className="tb-section-title">Font</h3>
            <div className="tb-field">
              <label>Font Family</label>
              <input type="text" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} placeholder="e.g. Inter" />
            </div>
            <div className="tb-field">
              <label>CSS URL</label>
              <input type="text" value={fontCssUrl} onChange={(e) => setFontCssUrl(e.target.value)} placeholder="https://fonts.googleapis.com/css2?family=..." />
            </div>

            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 className="tb-section-title">{group.title}</h3>
                {group.items.map((item) => (
                  <ColorRow
                    key={item.key}
                    label={item.label}
                    hint={item.hint}
                    value={colors[item.key]}
                    onChange={(v) => updateColor(item.key, v)}
                  />
                ))}
              </div>
            ))}

            <button className="tb-download" onClick={() => setShowExport(true)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Theme
            </button>
          </div>
        </div>
      </div>

      {showExport && (
        <div className="tb-modal-overlay" onClick={() => setShowExport(false)}>
          <div className="tb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tb-modal-head">
              <h3>Export Theme</h3>
              <button className="tb-modal-close" onClick={() => setShowExport(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="tb-modal-body">
              <div className="tb-field">
                <label>Theme Name <span className="tb-required">*</span></label>
                <input type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} placeholder="My Theme" autoFocus />
              </div>
              <div className="tb-field-row">
                <div className="tb-field">
                  <label>Type</label>
                  <select value={themeType} onChange={(e) => setThemeType(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="tb-field">
                  <label>Author <span className="tb-required">*</span></label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
                </div>
              </div>
              <div className="tb-field">
                <label>Collection <span className="tb-optional">(Optional)</span></label>
                <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} placeholder="custom" />
              </div>
            </div>
            <div className="tb-modal-footer">
              <button className="tb-modal-cancel" onClick={() => setShowExport(false)}>Cancel</button>
              <button className="tb-download" onClick={handleExport} disabled={!themeName.trim() || !author.trim()}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="survey-callout">
        <p>Help shape the future of Timelines. Takes under 2 minutes.</p>
        <a href="https://forms.gle/Bbe74yyrZ7zhKeFL8" className="btn btn-primary survey-callout-btn" target="_blank" rel="noopener noreferrer">
          Take the Survey <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}

export default ThemeBuilder
