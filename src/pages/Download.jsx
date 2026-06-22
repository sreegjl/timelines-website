import usePageMeta from '../hooks/usePageMeta'

function Download() {
  usePageMeta({
    title: 'Download',
    description: 'Download Timelines for Windows or macOS. Free, open-source, and local-first.',
  })

  return (
    <div className="page download">

      <span className="download-version-badge">Free &amp; Open-Source &middot; Alpha v0.5.0-alpha.3</span>
      <h1 className="download-title">Download <em>Timelines.</em></h1>
      <p className="download-subtitle">Local-first and free forever. Pick your platform.</p>

      <div className="download-notice">
        This is an early testing build. Expect bugs, missing features, and breaking changes. Please report issues on <a href="https://github.com/sreegjl/timelines/issues" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </div>

      <div className="download-cards">
        <div className="download-card">
          <div className="download-card-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
          </div>
          <h3>Windows</h3>
          <p className="download-card-req">Windows 10 &amp; 11</p>
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.5.0-alpha.3/Timelines-0.5.0-alpha.3-Setup.exe" className="btn btn-primary download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download for Windows
          </a>
          <span className="download-meta">.exe &middot; 64-bit</span>
        </div>
        <div className="download-card">
          <div className="download-card-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>
          <h3>macOS</h3>
          <p className="download-card-req">macOS 12 Monterey or later</p>
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.5.0-alpha.3/Timelines-0.5.0-alpha.3-Setup.dmg" className="btn btn-primary download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download for Mac
          </a>
          <span className="download-meta">.dmg &middot; Universal</span>
        </div>
      </div>

      <div className="download-footer-info">
        <span>Version <strong>0.5.0-alpha.3</strong></span>
        <span>Released <strong>Jun 2026</strong></span>
        <span>License <strong>GPL-3.0</strong></span>
        <span>Local-first &middot; <strong>offline</strong></span>
      </div>

      <a href="https://github.com/sreegjl/timelines/releases" className="download-older-link" target="_blank" rel="noopener noreferrer">
        Older versions &amp; build from source on GitHub <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  )
}

export default Download
