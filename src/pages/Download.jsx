import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import { softwareApplication } from '../data/structuredData'

const MAC_FIX_COMMAND = 'xattr -cr /Applications/Timelines.app'

function Download() {
  const [copied, setCopied] = useState(false)

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(MAC_FIX_COMMAND)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable; the command is still selectable on the page
    }
  }

  usePageMeta({
    title: 'Download',
    description: 'Download Timelines for Windows, macOS, or GNU / Linux. Free, open-source, and local-first.',
    jsonLd: softwareApplication,
  })

  return (
    <div className="page download">

      <span className="download-version-badge">Free &amp; Open-Source &middot; v0.7.0-alpha.2</span>
      <h1 className="download-title">Download Timelines.</h1>
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
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.7.0-alpha.2/Timelines-0.7.0-alpha.2-Setup.exe" className="btn btn-primary download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
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
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.7.0-alpha.2/Timelines-0.7.0-alpha.2-Setup.dmg" className="btn btn-primary download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </a>
          <span className="download-meta">.dmg &middot; Universal</span>
        </div>
        <div className="download-card">
          <div className="download-card-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <h3>GNU&nbsp;/&nbsp;Linux</h3>
          <p className="download-card-req">64-bit distributions</p>
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.7.0-alpha.2/Timelines-0.7.0-alpha.2-Setup.AppImage" className="btn btn-primary download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </a>
          <span className="download-meta">.AppImage &middot; 64-bit</span>
        </div>
      </div>

      <section className="download-mac-guide" id="macos-install">
        <h2>macOS: &ldquo;Timelines is damaged and can&rsquo;t be opened&rdquo;</h2>
        <p>
          Timelines isn&rsquo;t notarized by Apple yet, so macOS may block it on first launch. The download isn&rsquo;t actually damaged. Until the app is signed and notarized, follow these steps:
        </p>
        <ol>
          <li>Open the <code>.dmg</code> and drag <strong>Timelines</strong> into your <strong>Applications</strong> folder.</li>
          <li>Open <strong>Terminal</strong> and run:</li>
        </ol>
        <div className="download-mac-command">
          <code>{MAC_FIX_COMMAND}</code>
          <button type="button" onClick={copyCommand} aria-label="Copy command">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <ol start={3}>
          <li>Launch Timelines from Applications as usual.</li>
        </ol>
        <p className="download-mac-note">
          This clears the quarantine flag macOS adds to downloaded files. Prefer not to? You can also <a href="https://github.com/sreegjl/timelines" target="_blank" rel="noopener noreferrer">build from source</a>. Track progress on notarization in <a href="https://github.com/sreegjl/timelines/issues/57" target="_blank" rel="noopener noreferrer">issue #57</a>.
        </p>
        <div className="download-mac-goal">
          <p>
            <strong>Help fix this for good.</strong> Apple charges $99/year for the Developer license needed to sign and notarize the Mac app. Funding it removes this warning and unlocks automatic in-app updates.
          </p>
          <a href="https://ko-fi.com/sreegjl/goal?g=30" className="btn btn-primary btn-donate-cta" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="btn-donate-heart-fill" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z" />
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z" />
            </svg>
            Support on Ko-fi
          </a>
        </div>
      </section>

      <div className="download-footer-info">
        <span>Version <strong>0.7.0-alpha.2</strong></span>
        <span>Released <strong>Aug 9, 2026</strong></span>
        <span>License <strong>GPL-3.0</strong></span>
        <span>Local-first &middot; <strong>offline</strong></span>
      </div>

      <a href="https://github.com/sreegjl/timelines/releases" className="download-older-link" target="_blank" rel="noopener noreferrer">
        Older versions &amp; build from source on GitHub <span aria-hidden="true">&rarr;</span>
      </a>

      <div className="survey-callout">
        <p>Help shape the future of Timelines. Takes under 2 minutes.</p>
        <a href="https://forms.gle/Bbe74yyrZ7zhKeFL8" className="btn btn-primary survey-callout-btn" target="_blank" rel="noopener noreferrer">
          Take the Survey <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}

export default Download
