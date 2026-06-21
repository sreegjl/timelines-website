import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getThemeById } from '../data/themes'

function Home({ activeThemeId, onThemeSelect }) {
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

        <div className="hero-demo">
          <img src={`${import.meta.env.BASE_URL}timeline.png`} alt="Timelines app screenshot" />
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
              <p>Draw a period that runs from one date to another, which can branch from or merge them into other spans to show how timelines split and converge.</p>
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

              <div className="notes-article">
                <div className="notes-article-head">
                  <svg className="notes-article-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M14 3v6h6" />
                  </svg>
                  <span>Note</span>
                  <span className="notes-article-meta">markdown · 521 words</span>
                </div>
                <div className="notes-article-body">
                  <p>
                    Alexander the Great died in Babylon in June 323 BC after a brief but severe illness. Ancient
                    sources describe fever, weakness, and an inability to speak in his final days. The exact cause
                    remains uncertain, with possibilities including infection, typhoid, malaria, or complications
                    from wounds. His sudden death at age 32 ended his empire at its peak and triggered the Wars of
                    the Diadochi.
                  </p>
                  <h3 className="mt">
                    Background (
                    <a href="https://en.wikipedia.org/wiki/Death_of_Alexander_the_Great">Wikipedia</a>
                    )
                  </h3>
                  <p>
                    The death of Alexander the Great and subsequent related events have been the subjects of debates.
                    According to a Babylonian astronomical diary, Alexander died in the palace of Nebuchadnezzar II
                    in Babylon between the evening of 10 June and the evening of 11 June 323 BC, at the age of 32.
                  </p>
                  <p>
                    Macedonians and local residents wept at the news of the death, while Achaemenid subjects were
                    forced to shave their heads. The mother of Darius III, Sisygambis, having learned of Alexander's
                    death, became depressed and killed herself later. Historians vary in their assessments of primary
                    sources about Alexander's death, which has resulted in different views about its cause and
                    circumstances.
                  </p>
                </div>
              </div>

              <div className="notes-sources">
                <div className="notes-sources-head">
                  <div className="notes-sources-label">
                    <svg className="notes-sources-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
                      <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
                    </svg>
                    <span>Sources</span>
                  </div>
                  <div className="notes-sources-meta">
                    <span>2</span>
                    <svg className="notes-sources-chevron" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m7 10 5 5 5-5" />
                    </svg>
                  </div>
                </div>

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
              </div>
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
                    src={`${import.meta.env.BASE_URL}map.png`}
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
              <h3>Map view</h3>
              <p>
                Give any event or span coordinates and watch your timeline unfold across geography, with campaigns, trade
                routes, and migrations traced where they actually happened.
              </p>
            </div>
          </div>

          <div className="views-card">
            <div className="views-demo views-demo-table" aria-hidden="true">
              <div className="views-demo-canvas">
                <div className="views-table-demo">
                  <div className="views-table-inner">
                    <div className="views-table-head">
                    <span>Type</span>
                    <span>Name</span>
                    <span>Parent</span>
                    <span>Tags</span>
                    <span>Start</span>
                    <span>End</span>
                  </div>

                  <div className="views-table-row">
                    <span className="views-table-type">
                      Span
                    </span>
                    <span className="views-table-name">Athens</span>
                    <span className="views-table-parent">Ancient Greece</span>
                    <span className="views-table-tags">polis</span>
                    <span className="views-table-date">1068 BCE</span>
                    <span className="views-table-date">146 BCE</span>
                  </div>

                  <div className="views-table-row">
                    <span className="views-table-type">
                      Event
                    </span>
                    <span className="views-table-name">First Olympic Games</span>
                    <span className="views-table-parent">Olympia</span>
                    <span className="views-table-tags">sport</span>
                    <span className="views-table-date">776 BCE</span>
                    <span className="views-table-date">—</span>
                  </div>

                  <div className="views-table-row">
                    <span className="views-table-type">
                      Era
                    </span>
                    <span className="views-table-name">Classical Period</span>
                    <span className="views-table-parent">Ancient Greece</span>
                    <span className="views-table-tags">culture</span>
                    <span className="views-table-date">480 BCE</span>
                    <span className="views-table-date">323 BCE</span>
                  </div>

                  <div className="views-table-row">
                    <span className="views-table-type">
                      Event
                    </span>
                    <span className="views-table-name">Battle of Marathon</span>
                    <span className="views-table-parent">Athens</span>
                    <span className="views-table-tags">war</span>
                    <span className="views-table-date">490 BCE</span>
                    <span className="views-table-date">—</span>
                  </div>

                  <div className="views-table-row">
                    <span className="views-table-type">
                      Span
                    </span>
                    <span className="views-table-name">Macedon</span>
                    <span className="views-table-parent">Ancient Greece</span>
                    <span className="views-table-tags">kingdom</span>
                    <span className="views-table-date">808 BCE</span>
                    <span className="views-table-date">146 BCE</span>
                  </div>

                  <div className="views-table-row">
                    <span className="views-table-type">
                      Event
                    </span>
                    <span className="views-table-name">Death of Alexander</span>
                    <span className="views-table-parent">Macedon</span>
                    <span className="views-table-tags">succession</span>
                    <span className="views-table-date">323 BCE</span>
                    <span className="views-table-date">—</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="views-card-body">
              <div className="views-card-head">
                <h3>Spreadsheet view</h3>
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
