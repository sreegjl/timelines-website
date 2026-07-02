import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import parchmentTheme from '../data/themes/parchment_v2.json'
import logoLight from '../assets/branding/logo-light.png'
import logoDark from '../assets/branding/logo-dark.png'
import logoLightMode from '../assets/branding/logo-light-mode.png'
import logoDarkMode from '../assets/branding/logo-dark-mode.png'
import lightBanner from '../assets/branding/light-banner.png'
import darkBanner from '../assets/branding/dark-banner.png'

const palette = Object.entries(parchmentTheme.colors).map(([name, hex]) => ({ name, hex }))

const logos = [
  { src: logoLight, name: 'Parchment v2 logo', file: 'timelines-logo-parchment-v2.png' },
  { src: logoDark, name: 'Parchment v2 dark logo', file: 'timelines-logo-parchment-v2-dark.png' },
  { src: logoLightMode, name: 'Light logo', file: 'timelines-logo-light.png' },
  { src: logoDarkMode, name: 'Dark logo', file: 'timelines-logo-dark.png' },
]

const banners = [
  { src: lightBanner, name: 'Parchment v2 banner', file: 'timelines-banner-parchment-v2.png' },
  { src: darkBanner, name: 'Parchment v2 dark banner', file: 'timelines-banner-parchment-v2-dark.png' },
]

function AssetCard({ asset, wide = false }) {
  return (
    <div className={`brand-asset${wide ? ' brand-asset-wide' : ''}`}>
      <div className="brand-asset-preview">
        <img src={asset.src} alt={asset.name} />
      </div>
      <div className="brand-asset-meta">
        <span>{asset.name}</span>
        <a href={asset.src} download={asset.file} className="brand-asset-download">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          PNG
        </a>
      </div>
    </div>
  )
}

function Swatch({ color }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button className="brand-swatch" onClick={copy} title={`Copy ${color.hex}`}>
      <span className="brand-swatch-chip" style={{ background: color.hex }} />
      <span className="brand-swatch-info">
        <strong>{color.name}</strong>
        <code>{copied ? 'Copied!' : color.hex}</code>
      </span>
    </button>
  )
}

function Brand() {
  usePageMeta({
    title: 'Brand',
    description: 'Logos, colors, and guidelines for using the Timelines brand.',
  })

  return (
    <div className="page brand">
      <h1 className="page-title">Brand guidelines</h1>
      <p className="page-subtitle">
        Assets and guidelines for blogs, videos, and anywhere else you mention Timelines.
      </p>

      <section className="brand-section">
        <h2>The name</h2>
        <p>
          The app is called <strong>Timelines</strong>. The full project
          name is <strong>Timelines Studio</strong>, and the website is{' '}
          <a href="https://timelines.studio">timelines.studio</a>. In logos and wordmarks the
          name appears lowercase, but in writing please capitalize it.
        </p>
      </section>

      <section className="brand-section">
        <h2>Logo</h2>
        <p>
          The mark is a branching timeline, a track that splits in two. Use the Parchment v2
          versions wherever possible; the neutral light and dark versions are for contexts
          where the Parchment v2 palette clashes.
        </p>
        <div className="brand-asset-grid">
          {logos.map((asset) => (
            <AssetCard key={asset.file} asset={asset} />
          ))}
        </div>
        <div className="brand-asset-grid brand-asset-grid-wide">
          {banners.map((asset) => (
            <AssetCard key={asset.file} asset={asset} wide />
          ))}
        </div>
      </section>

      <section className="brand-section">
        <h2>Colors</h2>
        <p>
          The brand palette comes from Parchment v2, the default Timelines theme: warm paper
          tones with dark ink. Click a swatch to copy its hex value.
        </p>
        <div className="brand-swatch-grid">
          {palette.map((color) => (
            <Swatch key={color.name} color={color} />
          ))}
        </div>
      </section>

      <section className="brand-section">
        <h2>Typography</h2>
        <p>
          Parchment v2 uses{' '}
          <a href="https://fonts.google.com/specimen/Lexend" target="_blank" rel="noopener noreferrer">Lexend</a>{' '}
          for everything in the app; other themes have their own fonts.{' '}
          <a href="https://fonts.google.com/specimen/Spectral" target="_blank" rel="noopener noreferrer">Spectral</a>{' '}
          is only used on the website and promotional material. Both are free on Google Fonts.
        </p>
        <div className="brand-type-samples">
          <div className="brand-type-sample">
            <span className="brand-type-label">Lexend</span>
            <p className="brand-type-lexend">Chart every era, every world.</p>
          </div>
          <div className="brand-type-sample">
            <span className="brand-type-label">Spectral</span>
            <p className="brand-type-spectral">Chart every era, every world.</p>
          </div>
        </div>
      </section>

      <section className="brand-section">
        <h2>Usage</h2>
        <div className="brand-usage">
          <div className="brand-usage-col">
            <h3>Please do</h3>
            <ul>
              <li>Use the logo to link to timelines.studio or the GitHub repo</li>
              <li>Use the logo in articles, videos, and posts about Timelines</li>
              <li>Give the logo breathing room with clear space of at least half its width</li>
            </ul>
          </div>
          <div className="brand-usage-col">
            <h3>Please don&rsquo;t</h3>
            <ul>
              <li>Stretch, rotate, recolor, or add effects to the logo</li>
              <li>Use the logo as your own app or product icon</li>
              <li>Imply endorsement by or affiliation with Timelines</li>
            </ul>
          </div>
        </div>
        <p className="brand-contact">
          Questions about brand usage? Open an issue on{' '}
          <a href="https://github.com/sreegjl/timelines/issues" target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
          or email <a href="mailto:sree@timelines.studio">sree@timelines.studio</a>.
        </p>
      </section>
    </div>
  )
}

export default Brand
