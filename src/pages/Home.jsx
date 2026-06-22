import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getThemeById } from '../data/themes'
import usePageMeta from '../hooks/usePageMeta'

function Home({ activeThemeId, onThemeSelect }) {
  usePageMeta()
  const [checklist, setChecklist] = useState([true, true, false])
  const toggleCheck = (i) => setChecklist((prev) => prev.map((v, j) => (j === i ? !v : v)))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page home">
      {/* ── Hero ── */}
      <section className="hero">
        <span className="hero-eyebrow">Free &amp; Open Source</span>
        <h1>
          Visualize your <span className="accent">Notes.</span>
        </h1>
        <p className="hero-subtitle">
          Create interactive timelines for worldbuilding and history. Local&#8209;first and fully open source.
        </p>
        <div className="hero-buttons">
          <Link to="/download" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Alpha
          </Link>
          <a href="https://github.com/sreegjl/timelines" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            View on GitHub
          </a>
        </div>

        <div className="hero-demo" aria-hidden="true">
          <img className="hero-demo-img" src={`${import.meta.env.BASE_URL}timeline.webp`} alt="Timelines app screenshot" />
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
                  <div className="hero-sidebar-item"><span className="sidebar-indicator" style={{ background: '#8f7ea5' }}></span><span className="sidebar-item-name">Megara</span><span className="sidebar-item-year">745–146 BCE</span></div>
                  <div className="hero-sidebar-item"><span className="sidebar-indicator" style={{ background: '#ac6969' }}></span><span className="sidebar-item-name">Lycurgus&apos; Reforms</span><span className="sidebar-item-year">700 BCE</span></div>
                  <div className="hero-sidebar-item"><span className="sidebar-indicator" style={{ background: '#7898b7' }}></span><span className="sidebar-item-name">Draco&apos;s Legislation</span><span className="sidebar-item-year">621 BCE</span></div>
                  <div className="hero-sidebar-item active"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Battle of Marathon</span><span className="sidebar-item-year">490 BCE</span></div>
                  <div className="hero-sidebar-item"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Peloponnesian War</span><span className="sidebar-item-year">431 BCE</span></div>
                </div>
                <div className="hero-sidebar-group">
                  <div className="hero-sidebar-group-head" style={{ color: '#8f7260' }}>
                    <svg className="hero-sidebar-group-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                    <span className="hero-sidebar-group-name">Hellenistic</span>
                    <span className="hero-sidebar-group-count">4</span>
                  </div>
                  <div className="hero-sidebar-item"><span className="sidebar-dot" style={{ background: '#6d7d97' }}></span><span className="sidebar-item-name">Macedon</span><span className="sidebar-item-year">808–146 BCE</span></div>
                  <div className="hero-sidebar-item"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Alexander&apos;s Campaign</span><span className="sidebar-item-year">334 BCE</span></div>
                  <div className="hero-sidebar-item"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Death of Alexander</span><span className="sidebar-item-year">323 BCE</span></div>
                  <div className="hero-sidebar-item"><span className="sidebar-indicator"></span><span className="sidebar-item-name">Fall of Corinth</span><span className="sidebar-item-year">146 BCE</span></div>
                </div>
                </div>
              </div>
              <div className="hero-timeline-inner">
            {/* Events — scale: 0%=800 BCE, 100%=100 BCE (700yr range) */}
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

            {/* Spans — same scale */}
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

            {/* Grid lines — every 100 years from 800 to 100 BCE */}
            <div className="hero-gridline" style={{ left: '0%' }}></div>
            <div className="hero-gridline hero-gridline-minor" style={{ left: '14%' }}></div>
            <div className="hero-gridline" style={{ left: '29%' }}></div>
            <div className="hero-gridline hero-gridline-minor" style={{ left: '43%' }}></div>
            <div className="hero-gridline" style={{ left: '57%' }}></div>
            <div className="hero-gridline hero-gridline-minor" style={{ left: '71%' }}></div>
            <div className="hero-gridline" style={{ left: '86%' }}></div>
            <div className="hero-gridline hero-gridline-minor" style={{ left: '100%' }}></div>

            {/* Axis — 0%=800, 29%=600, 57%=400, 86%=200 */}
            <div className="hero-axis">
              <div className="hero-axis-line"></div>
              <span className="hero-tick" style={{ left: '0%' }}>800 BCE</span>
              <span className="hero-tick" style={{ left: '29%' }}>600 BCE</span>
              <span className="hero-tick" style={{ left: '57%' }}>400 BCE</span>
              <span className="hero-tick" style={{ left: '86%' }}>200 BCE</span>
            </div>

            {/* Eras — Archaic ~800-480, Classical 480-323, Hellenistic 323-100 */}
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
                      <img className="hero-panel-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Les_H%C3%A9ros_de_Marathon_Georges_Rochegrosse_1859.jpg/500px-Les_H%C3%A9ros_de_Marathon_Georges_Rochegrosse_1859.jpg" alt="The Heroes of Marathon" />
                      <h4 className="hero-panel-heading">Background</h4>
                      <p>
                        The first Persian invasion was a response to Athenian support for the <a href="#">Ionian Revolt</a>. Darius I sent a naval expedition across the Aegean, sacking <em>Naxos</em> and <em>Eretria</em> before landing at Marathon.
                      </p>
                      <h4 className="hero-panel-heading">The Battle</h4>
                      <p>
                        The Athenian general <strong>Miltiades</strong> led roughly 10,000 hoplites against a larger Persian force. The Greek wings enveloped the Persian center in a double-envelopment. Herodotus records 6,400 Persian casualties against just 192 Athenian dead.
                      </p>
                      <blockquote className="hero-panel-quote">
                        &ldquo;The Athenians at Marathon, fighting for the freedom of Greece, overthrew the might of the barbarians.&rdquo;
                      </blockquote>
                      <h4 className="hero-panel-heading">Aftermath</h4>
                      <p>
                        The victory proved that Persian forces could be defeated, emboldening the Greek city-states for the <a href="#">second Persian invasion</a> a decade later. The legendary run of <a href="#">Pheidippides</a> from the battlefield to Athens gave rise to the modern marathon race.
                      </p>
                    </div>
                  </div>

                  <div className="hero-panel-sources">
                    <div className="hero-panel-sources-head">
                      <div className="hero-panel-sources-label">
                        <svg className="hero-panel-sources-icon" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
                          <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
                        </svg>
                        <span>Sources</span>
                      </div>
                      <div className="hero-panel-sources-meta">
                        <span>3</span>
                        <svg className="hero-panel-sources-chevron" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="m7 10 5 5 5-5" />
                        </svg>
                      </div>
                    </div>
                    <div className="hero-panel-source-list">
                      <div className="hero-panel-source-row">
                        <div className="hero-panel-source-type">T</div>
                        <div className="hero-panel-source-copy">
                          <div className="hero-panel-source-title">Histories, Book VI</div>
                          <div className="hero-panel-source-subtitle">Herodotus</div>
                        </div>
                      </div>
                      <div className="hero-panel-source-row">
                        <div className="hero-panel-source-type">T</div>
                        <div className="hero-panel-source-copy">
                          <div className="hero-panel-source-title">Life of Aristides</div>
                          <div className="hero-panel-source-subtitle">Plutarch</div>
                        </div>
                        <svg className="hero-panel-source-link" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M14 5h5v5" /><path d="M10 14 19 5" /><path d="M19 14v5h-14v-14h5" />
                        </svg>
                      </div>
                      <div className="hero-panel-source-row">
                        <div className="hero-panel-source-type">T</div>
                        <div className="hero-panel-source-copy">
                          <div className="hero-panel-source-title">Description of Greece</div>
                          <div className="hero-panel-source-subtitle">Pausanias</div>
                        </div>
                      </div>
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
      </section>

      {/* ── Features ── */}
      <section className="features scroll-reveal" id="features">
        <div className="features-heading">
          <span className="features-eyebrow">The Building Blocks</span>
          <h2>Events, Spans, and Eras.</h2>
          <p className="features-intro">
            Place a moment at a single point, stretch a period across centuries, and layer broad eras behind it all
            {' '}with three primitives that compose into any timeline you can imagine. Tags and groups make it easy
            {' '}to filter and organize everything.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-demo feature-demo-events" aria-hidden="true">
              <div className="events-demo-stack">
                <div className="event-preview-item event-preview-item-left">
                  <div className="promo-event event promo-event-secondary">
                    <div className="event-text-content">
                      <div className="event-title">Socrates is sentenced to death in Athens</div>

                      <div className="event-date">
                        <span className="event-year">399 BCE</span>
                        <span className="pinned-tag">Athens</span>
                        <span className="pinned-tag">Philosophy</span>
                      </div>
                    </div>
                  </div>
                  <div className="event-connector"></div>
                </div>

                <div className="event-preview-item event-preview-item-right">
                  <div className="promo-event event">
                    <div className="event-text-content">
                      <div className="event-title">Alexander the Great begins his Persian campaign</div>

                      <div className="event-date">
                        <span className="event-year">334 BCE</span>
                        <span className="pinned-tag">Macedon</span>
                        <span className="pinned-tag">War</span>
                      </div>
                    </div>
                  </div>
                  <div className="event-connector"></div>
                </div>
              </div>
            </div>
            <div className="feature-card-body">
              <h3>Events</h3>
              <p>Pin a dated moment, parent it to a span, and customize it with thumbnail images and icons so key moments stand out at a glance.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-demo feature-demo-spans" aria-hidden="true">
              <div className="promo-span-frame">
                <div className="promo-span-demo">
                  <div className="connectors-layer">
                    <div className="span-connector-branch-rise"></div>
                    <div className="span-connector-branch-run"></div>
                    <div className="span-connector-sparta-drop"></div>
                    <div className="span-connector-sparta-run"></div>
                  </div>

                  <div className="spans-layer">
                    <div className="span-item span-athens">
                      <span className="span-title">Athens</span>
                      <span className="span-years">1068 - 146 BCE</span>
                    </div>

                    <div className="span-item span-delian">
                      <span className="span-title">Delian League</span>
                      <span className="span-years">478 - 404 BCE</span>
                    </div>

                    <div className="span-item span-sparta">
                      <span className="span-title">Sparta</span>
                      <span className="span-years">900 - 146 BCE</span>
                    </div>

                    <div className="span-item span-peloponnesian">
                      <span className="span-title">Peloponnesian League</span>
                      <span className="span-years">550 - 366 BCE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-card-body">
              <h3>Spans</h3>
              <p>Draw a period that runs from one date to another. Spans can branch from or merge into other spans to show how timelines split and converge.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-demo feature-demo-eras" aria-hidden="true">
              <div className="era-demo-frame">
                <div className="era-layer era-layer-top">
                  <div className="demo-era demo-era-archaic">Archaic</div>
                  <div className="demo-era demo-era-classical">Classical</div>
                  <div className="demo-era demo-era-hellenistic">Hellenistic</div>
                </div>
                <div className="era-layer era-layer-middle">
                  <div className="demo-era demo-era-greece">Ancient Greece</div>
                </div>
              </div>
            </div>
            <div className="feature-card-body">
              <h3>Eras</h3>
              <p>Wrap stretches of time into named eras that wash across the whole canvas, giving structure and rhythm to even the busiest timeline.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="notes-section scroll-reveal" id="notes">
        <div className="notes-copy">
          <span className="notes-eyebrow">Linked Notes</span>
          <h2>Keep your research beside the timeline.</h2>
          <p className="notes-intro">
            Attach .md notes, sources, and MediaWiki content to any timeline element in the right panel. Set your
            notes folder to an existing vault to keep your research, lore, and context right alongside your
            timeline.
          </p>
        </div>
        <div className="notes-panel-demo" aria-hidden="true">
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
                    <path d="M10 4v6H4" />
                    <path d="M14 20v-6h6" />
                    <path d="M10 10 3 3" />
                    <path d="M14 14l7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="notes-panel-body">
              <div className="notes-props">
                <div className="notes-prop">
                  <span className="notes-prop-key">name</span>
                  <span className="notes-prop-dots"></span>
                  <span className="notes-prop-value strong">Death of Alexander the Great</span>
                </div>
                <div className="notes-prop">
                  <span className="notes-prop-key">date</span>
                  <span className="notes-prop-dots"></span>
                  <span className="notes-prop-value mono">323 BCE</span>
                </div>
                <div className="notes-prop">
                  <span className="notes-prop-key">parent</span>
                  <span className="notes-prop-dots"></span>
                  <span className="notes-prop-value link">Kingdom of Macedon</span>
                </div>
              </div>

              <details className="notes-collapse" open>
                <summary className="notes-section-head">
                  <svg className="notes-section-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M14 3v6h6" />
                  </svg>
                  <span>Note</span>
                  <span className="notes-section-meta">markdown · 521 words</span>
                  <svg className="notes-section-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
                </summary>
                <div className="notes-article-body">
                  <p>
                    <strong>Alexander the Great</strong> died in <a href="#">Babylon</a> in June 323 BC after a
                    brief but severe illness. Ancient sources describe fever, weakness, and an inability to speak
                    in his final days. The exact cause remains <em>uncertain</em>, with possibilities including
                    infection, typhoid, malaria, or complications from wounds.
                  </p>
                  <h3 className="mt">Proposed Causes</h3>
                  <ul>
                    <li><a href="#">Typhoid fever</a> complicated by bowel perforation</li>
                    <li>Acute <em>malaria</em>, possibly falciparum strain</li>
                    <li>Complications from chronic <strong>battle wounds</strong> and heavy drinking</li>
                  </ul>
                  <blockquote>
                    &ldquo;When asked to whom he left his empire, Alexander replied: <em>to the strongest.</em>&rdquo;
                    {' '}— Diodorus Siculus
                  </blockquote>
                  <p>
                    His body was initially placed in a gold sarcophagus, later transferred
                    to <a href="#">Alexandria</a> by <a href="#">Ptolemy I</a>, where it remained a site of
                    pilgrimage for centuries. Both <a href="#">Julius Caesar</a> and <a href="#">Augustus</a> visited
                    the tomb. Its location has been lost since late antiquity.
                  </p>
                  <div className="notes-embed">
                    <div className="notes-embed-thumb">
                      <img src={`${import.meta.env.BASE_URL}yt-crash-course-thumb.jpg`} alt="YouTube video" />
                      <div className="notes-embed-top">
                        <img className="notes-embed-pfp" src={`${import.meta.env.BASE_URL}yt-crash-course-pfp.jpg`} alt="Crash Course" />
                        <div className="notes-embed-top-text">
                          <div className="notes-embed-title">Alexander the Great: Crash Course World History #8</div>
                          <div className="notes-embed-channel">Crash Course</div>
                        </div>
                      </div>
                      <div className="notes-embed-play">
                        <svg viewBox="0 0 68 48" aria-hidden="true">
                          <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
                          <path d="M45 24 27 14v20" fill="#fff" />
                        </svg>
                      </div>
                      <div className="notes-embed-bar">
                        <div className="notes-embed-progress">
                          <div className="notes-embed-progress-fill"></div>
                        </div>
                        <div className="notes-embed-controls">
                          <div className="notes-embed-controls-left">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21" fill="#fff" /></svg>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 4 15 12 5 20" fill="#fff" /><line x1="19" y1="5" x2="19" y2="19" stroke="#fff" strokeWidth="2" /></svg>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19" fill="#fff" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" strokeWidth="1.5" fill="none" /></svg>
                            <span className="notes-embed-time">0:00 / 11:01</span>
                          </div>
                          <div className="notes-embed-controls-right">
                            <a className="notes-embed-yt-btn" href="https://youtu.be/0LsrkWDCvxg" target="_blank" rel="noopener noreferrer">
                              <svg viewBox="0 0 68 48" aria-hidden="true">
                                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
                                <path d="M45 24 27 14v20" fill="#fff" />
                              </svg>
                              Watch on YouTube
                            </a>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="#fff" strokeWidth="1.5" fill="none" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt">Aftermath</h3>
                  <p>
                    His sudden death at age 32 left no clear successor and triggered
                    the <a href="#">Wars of the Diadochi</a>, a forty-year struggle among his generals to
                    divide the empire. <mark>Perdiccas initially held the regency</mark>, but was assassinated
                    within two years. By 281 BC the empire had fractured into the <a href="#">Ptolemaic</a>,{' '}
                    <a href="#">Seleucid</a>, and <a href="#">Antigonid</a> kingdoms.
                  </p>
                  <h3 className="mt">Reading List</h3>
                  <ul className="notes-checklist">
                    {['The Campaigns of Alexander, Arrian', 'Alexander of Macedon, Peter Green', 'Ghost on the Throne, James Romm'].map((item, i) => (
                      <li key={i} className={checklist[i] ? 'checked' : ''} onClick={() => toggleCheck(i)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="notes-collapse" open>
                <summary className="notes-section-head">
                  <svg className="notes-section-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                  </svg>
                  <span>Wiki</span>
                  <span className="notes-section-meta">
                    Linked Article
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5" /><path d="M10 14 19 5" /><path d="M19 14v5h-14v-14h5" /></svg>
                  </span>
                  <svg className="notes-section-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
                </summary>
                <div className="notes-wiki-body">
                  <div className="notes-wiki-infobox">
                    <div className="notes-wiki-infobox-title">Death of Alexander the Great</div>
                    <figure className="notes-wiki-figure">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Dying_Alexander.jpg/250px-Dying_Alexander.jpg" alt="Dying Alexander" />
                      <figcaption>Dying Alexander, copy of a 2nd&#8209;century BC sculpture<br />Photo: <a href="https://commons.wikimedia.org/wiki/File:Dying_Alexander.jpg" target="_blank" rel="noopener noreferrer">Urek Meniashvili</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a></figcaption>
                    </figure>
                    <div className="notes-wiki-infobox-row">
                      <span className="notes-wiki-infobox-label">Date</span>
                      <span className="notes-wiki-infobox-data">10 or 11 June 323 BC</span>
                    </div>
                    <div className="notes-wiki-infobox-row">
                      <span className="notes-wiki-infobox-label">Location</span>
                      <span className="notes-wiki-infobox-data"><a href="#">Palace of Nebuchadnezzar II</a>, <a href="#">Babylon</a></span>
                    </div>
                    <div className="notes-wiki-infobox-row">
                      <span className="notes-wiki-infobox-label">Cause</span>
                      <span className="notes-wiki-infobox-data">Disputed (<a href="#">typhoid</a>, <a href="#">malaria</a>, <a href="#">poisoning</a>)</span>
                    </div>
                    <div className="notes-wiki-infobox-row">
                      <span className="notes-wiki-infobox-label">Buried</span>
                      <span className="notes-wiki-infobox-data"><a href="#">Alexandria</a>, Egypt</span>
                    </div>
                  </div>
                  <p>
                    The <strong>death of Alexander the Great</strong> and subsequent related events have been the
                    subjects of debates. According to a <a href="#">Babylonian astronomical diary</a>, Alexander
                    died in the palace of <a href="#">Nebuchadnezzar II</a> in <a href="#">Babylon</a> between
                    the evening of 10 June and the evening of 11 June 323 BC, at the age of 32.
                  </p>
                  <p>
                    Macedonians and local residents wept at the news of the death, while <a href="#">Achaemenid</a> subjects
                    were forced to shave their heads. The mother of <a href="#">Darius III</a>, <a href="#">Sisygambis</a>,
                    upon learning of Alexander's death, refused to eat and died five days later.
                  </p>
                  <h4>Background</h4>
                  <p>
                    In February 323 BC, Alexander ordered his armies to prepare for the march
                    to <a href="#">Babylon</a>. According to <a href="#">Arrian</a>, <a href="#">Chaldean</a> astrologers
                    warned Alexander against entering the city, claiming their deity <a href="#">Bel</a> had
                    cautioned that doing so would prove fatal.
                  </p>
                  <h4>Account of his final days</h4>
                  <p>
                    According to <a href="#">Plutarch</a>, Alexander held a banquet for his companion <a href="#">Medius of Larissa</a>.
                    After drinking heavily he was seized with a fever. Over the next eleven days his condition
                    steadily worsened. By June 9 he could no longer speak, and his soldiers were admitted one by
                    one to file past his bed. He reportedly acknowledged each with a slight movement of his eyes.
                  </p>
                  <h4>Succession</h4>
                  <p>
                    When asked to whom he left his empire, he is said to have whispered
                    {' '}<em>&ldquo;to the strongest.&rdquo;</em> His generals, the <a href="#">Diadochi</a>, immediately
                    began positioning themselves for power. <a href="#">Perdiccas</a> assumed the regency, while
                    {' '}<a href="#">Ptolemy</a> seized Egypt, <a href="#">Seleucus</a> took Mesopotamia, and
                    {' '}<a href="#">Antigonus</a> claimed Anatolia. Their conflicts lasted over forty years.
                  </p>
                </div>
              </details>

              <details className="notes-collapse" open>
                <summary className="notes-section-head">
                  <svg className="notes-section-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
                    <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
                  </svg>
                  <span>Sources</span>
                  <span className="notes-section-meta">2</span>
                  <svg className="notes-section-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
                </summary>

                <div className="notes-source-list">
                  <div className="notes-source-row">
                    <div className="notes-source-type">T</div>
                    <div className="notes-source-copy">
                      <div className="notes-source-title">Ancient Greece</div>
                      <div className="notes-source-subtitle">Thomas R. Martin</div>
                    </div>
                  </div>

                  <div className="notes-source-row">
                    <div className="notes-source-type">T</div>
                    <div className="notes-source-copy">
                      <div className="notes-source-title">Alexander the Great</div>
                      <div className="notes-source-subtitle">Robin Lane Fox</div>
                    </div>
                    <svg className="notes-source-link" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 5h5v5" />
                      <path d="M10 14 19 5" />
                      <path d="M19 14v5h-14v-14h5" />
                    </svg>
                  </div>
                </div>
              </details>
            </div>
        </div>
      </section>

      {/* ── Marketplace ── */}
      <section className="views-section scroll-reveal" id="views">
        <div className="views-heading">
          <span className="views-eyebrow">Multiple Views</span>
          <h2>More than a timeline.</h2>
          <p className="views-intro">
            Access the same timeline data through multiple interfaces, with map view available now, spreadsheet
            view planned next, and additional views to follow.
          </p>
        </div>

        <div className="views-grid">
          <div className="views-card">
            <div className="views-demo views-demo-map" aria-hidden="true">
              <div className="views-demo-canvas">
                <div className="views-map-scene">
                  <img
                    className="views-map-image"
                    src={`${import.meta.env.BASE_URL}map.webp`}
                    alt=""
                  />
                  <div className="views-map-pin">
                    <div className="views-map-event">
                      <div className="event-text-content">
                        <div className="views-map-event-head">
                          <div className="views-map-event-kind">Event</div>
                          <span className="event-year">490 BCE</span>
                        </div>
                        <div className="event-title">Battle of Marathon</div>
                        <div className="event-date">
                          <span className="pinned-tag">Athens</span>
                          <span className="pinned-tag">War</span>
                        </div>
                      </div>
                    </div>
                    <div className="views-map-marker"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="views-card-body">
              <h3>Map View</h3>
              <p>
                Give any event or span coordinates and watch your timeline unfold across geography, with campaigns, trade
                routes, and migrations traced where they actually happened.
              </p>
            </div>
          </div>

          <div className="views-card">
            <SpreadsheetDemo />
            <div className="views-card-body">
              <div className="views-card-head">
                <h3>Spreadsheet View</h3>
                <span className="views-card-badge">Coming Soon</span>
              </div>
              <p>
                Flip the whole canvas into a sortable table to edit dates, rename entries, and bulk-fix details,
                then jump straight back to the timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="marketplace scroll-reveal" id="marketplace">
        <div className="marketplace-copy">
          <span className="marketplace-eyebrow">Fully Customizable</span>
          <h2>A marketplace for themes.</h2>
          <p className="marketplace-intro">
            Recolor the entire app or set different themes for each timeline with 100+ community themes. One tap
            to install, one tap to enable.
          </p>
          <a
            href="https://github.com/sreegjl/timelines-marketplace"
            className="marketplace-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse the marketplace
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="marketplace-panel">
          <div className="marketplace-grid">
            <MarketplaceThemeCard
              themeId="parchment_v2"
              isActive={activeThemeId === 'parchment_v2'}
              onSelect={onThemeSelect}
              name="Parchment"
              meta="by Timelines · light"
              colors={['#6B5038', '#A9754B', '#D9C1A0', '#EADBC2', '#F6ECDD']}
            />
            <MarketplaceThemeCard
              themeId="nebula"
              isActive={activeThemeId === 'nebula'}
              onSelect={onThemeSelect}
              name="Nebula"
              meta="by Timelines · light"
              action="Enable"
              colors={['#1F365B', '#466F9E', '#8BB6D9', '#C0D5E7', '#D8E5F0']}
            />
            <MarketplaceThemeCard
              themeId="light"
              isActive={activeThemeId === 'light'}
              onSelect={onThemeSelect}
              name="Regal"
              meta="by Timelines · warm"
              action="Enable"
              colors={['#8D2E26', '#B84B31', '#D99C2B', '#E6D7AC', '#F1E7D3']}
            />
            <MarketplaceThemeCard
              themeId="dark"
              isActive={activeThemeId === 'dark'}
              onSelect={onThemeSelect}
              name="Pixel Quest"
              meta="by Timelines · dark"
              action="Enable"
              colors={['#3340B5', '#546BCB', '#F2C33A', '#C3CCE8', '#DDE2F1']}
            />
          </div>
        </div>
      </section>


      {/* ── Open Source ── */}
      <section className="open-source">
        <div className="open-source-inner">
          <div className="open-source-text">
            <span className="open-source-label">Open Source, Forever</span>
            <h2>Built in the open.</h2>
            <p>Timelines is GPL-3.0 licensed and local-first. Timelines are stored as .timeline JSON files and notes as .md files. By default these live in your system app data folder, but you can point to a custom directory in app settings.</p>
            <div className="open-source-buttons">
              <a href="https://github.com/sreegjl/timelines" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58 0-.29-.01-1.24-.02-2.25-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.19.7.8.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
              <a href="https://github.com/sreegjl/timelines/wiki" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Read the docs
              </a>
            </div>
          </div>
          <div className="open-source-stats">
            <div className="open-source-stat">
              <span className="open-source-stat-value">GPL-3.0</span>
              <span className="open-source-stat-desc">Free and open-source, always</span>
            </div>
            <div className="open-source-stat">
              <span className="open-source-stat-value">100%</span>
              <span className="open-source-stat-desc">Local-first, your notes stay on device</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

const spreadsheetRows = [
  { type: 'Span', name: 'Athens', parent: 'Ancient Greece', tags: 'polis', start: '1068 BCE', end: '146 BCE' },
  { type: 'Event', name: 'First Olympic Games', parent: 'Olympia', tags: 'sport', start: '776 BCE', end: '—' },
  { type: 'Era', name: 'Classical Period', parent: 'Ancient Greece', tags: 'culture', start: '480 BCE', end: '323 BCE' },
  { type: 'Event', name: 'Battle of Marathon', parent: 'Athens', tags: 'war', start: '490 BCE', end: '—' },
  { type: 'Span', name: 'Macedon', parent: 'Ancient Greece', tags: 'kingdom', start: '808 BCE', end: '146 BCE' },
  { type: 'Event', name: 'Death of Alexander', parent: 'Macedon', tags: 'succession', start: '323 BCE', end: '—' },
  { type: 'Span', name: 'Delian League', parent: 'Athens', tags: 'alliance', start: '478 BCE', end: '404 BCE' },
  { type: 'Event', name: 'Battle of Thermopylae', parent: 'Sparta', tags: 'war', start: '480 BCE', end: '—' },
  { type: 'Span', name: 'Sparta', parent: 'Ancient Greece', tags: 'polis', start: '900 BCE', end: '146 BCE' },
  { type: 'Era', name: 'Hellenistic Period', parent: 'Ancient Greece', tags: 'culture', start: '323 BCE', end: '31 BCE' },
  { type: 'Event', name: 'Peloponnesian War', parent: 'Ancient Greece', tags: 'war', start: '431 BCE', end: '404 BCE' },
]

function SpreadsheetDemo() {
  const [sortKey, setSortKey] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const parseDate = (str) => {
    if (str === '—') return Infinity
    const num = parseInt(str)
    return str.includes('BCE') ? -num : num
  }

  const sorted = sortKey
    ? [...spreadsheetRows].sort((a, b) => {
        let cmp
        if (sortKey === 'start' || sortKey === 'end') {
          cmp = parseDate(a[sortKey]) - parseDate(b[sortKey])
        } else {
          cmp = a[sortKey].localeCompare(b[sortKey])
        }
        return sortAsc ? cmp : -cmp
      })
    : spreadsheetRows

  const sortIcon = (key) =>
    sortKey === key ? (sortAsc ? '▲' : '▼') : '▲'

  return (
    <div className="views-demo views-demo-table" aria-hidden="true">
      <div className="views-demo-canvas">
        <div className="views-table-demo">
          <div className="views-table-inner">
            <div className="views-table-head">
              <span className={`views-table-sortable${sortKey === 'type' ? ' is-sorted' : ''}`} onClick={() => handleSort('type')}>Type <span className="views-table-sort-icon">{sortIcon('type')}</span></span>
              <span className={`views-table-sortable${sortKey === 'name' ? ' is-sorted' : ''}`} onClick={() => handleSort('name')}>Name <span className="views-table-sort-icon">{sortIcon('name')}</span></span>
              <span className={`views-table-sortable${sortKey === 'tags' ? ' is-sorted' : ''}`} onClick={() => handleSort('tags')}>Tags <span className="views-table-sort-icon">{sortIcon('tags')}</span></span>
              <span className={`views-table-sortable${sortKey === 'start' ? ' is-sorted' : ''}`} onClick={() => handleSort('start')}>Start <span className="views-table-sort-icon">{sortIcon('start')}</span></span>
              <span className={`views-table-sortable${sortKey === 'end' ? ' is-sorted' : ''}`} onClick={() => handleSort('end')}>End <span className="views-table-sort-icon">{sortIcon('end')}</span></span>
            </div>
            <div className="views-table-scroll">
              {sorted.map((row) => (
                <div key={row.name} className="views-table-row">
                  <span className="views-table-type">{row.type}</span>
                  <span className="views-table-name">{row.name}</span>
                  <span className="views-table-tags">{row.tags}</span>
                  <span className="views-table-date">{row.start}</span>
                  <span className="views-table-date">{row.end}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketplaceThemeCard({ themeId, isActive = false, onSelect, name, meta, colors }) {
  const theme = themeId ? getThemeById(themeId) : null
  const displayName = theme?.name ?? name
  const displayMeta = theme ? `by ${theme.author} · ${theme.type}` : meta
  const displayAction = isActive ? 'Enabled' : 'Enable'
  const displayActive = isActive
  const fontFamily = theme?.font?.family
  const fontCssUrl = theme?.font?.cssUrl
  const previewColors = theme
    ? [
        theme.colors['text-primary'],
        theme.colors['ui-muted'],
        theme.colors['accent-color'],
        theme.colors['surface'],
        theme.colors['inset-bg'],
      ]
    : colors

  useEffect(() => {
    if (!fontCssUrl) return
    const linkId = `theme-card-font-${themeId}`
    if (document.getElementById(linkId)) return
    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = fontCssUrl
    document.head.appendChild(link)
  }, [fontCssUrl, themeId])

  return (
    <div
      className="mp-card"
      onClick={() => {
        if (themeId && onSelect) onSelect(themeId)
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && themeId && onSelect) {
          event.preventDefault()
          onSelect(themeId)
        }
      }}
    >
      <div className="mp-card-preview">
        <div className="mp-card-swatches">
          {previewColors.map((color) => (
            <div key={color} style={{ background: color }}></div>
          ))}
        </div>
      </div>
      <div className="mp-card-body">
        <span className="mp-card-name" style={fontFamily ? { fontFamily: `"${fontFamily}", sans-serif` } : undefined}>{displayName}</span>
        <span className="mp-card-meta">{displayMeta}</span>
        <button type="button" className={`mp-card-action${displayActive ? ' is-active' : ''}`}>
          {displayActive ? (
            <svg className="mp-card-action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 12 5 5L20 7" />
            </svg>
          ) : null}
          {displayAction}
        </button>
      </div>
    </div>
  )
}


export default Home
