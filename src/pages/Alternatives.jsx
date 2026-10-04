import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { alternativesLd } from '../data/structuredData'

// Competitor facts come from the vendors' own pages listed under Sources,
// checked on the date below. Prices move, so re-check before editing.
const CHECKED = 'October 2026'

const apps = ['Timelines Studio', 'Aeon Timeline', 'World Anvil', 'Campfire']

const rows = [
  {
    label: 'Price',
    values: [
      'Free',
      '$65 one-time, includes a year of updates; $35/year for more updates',
      'Free plan with limits; paid plans',
      'Free plan with limits; paid plans from $12/month',
    ],
  },
  {
    label: 'Free option',
    values: [
      'Everything, no limits',
      '14-day trial',
      'Yes, limited',
      'Yes; timeline module capped at 20 events',
    ],
  },
  {
    label: 'Open-source',
    values: ['Yes, GPL-3.0', 'No', 'No', 'No'],
  },
  {
    label: 'Works offline',
    values: ['Yes', 'Yes, desktop app', 'No, runs in the browser', 'Desktop app only'],
  },
  {
    label: 'Platforms',
    values: [
      'Windows, macOS, Linux; web viewer for sharing',
      'Mac, Windows, iOS',
      'Web browser',
      'Web, Mac, Windows, iOS, Android',
    ],
  },
  {
    label: 'Your data',
    values: [
      'Plain .timeline and Markdown files on your computer',
      'Files on your devices',
      'Stored on World Anvil',
      'Stored in Campfire’s cloud',
    ],
  },
  {
    label: 'Focus',
    values: [
      'Timelines only',
      'Timelines for writers and project planning',
      'Full worldbuilding wiki; timelines are one feature',
      'Full writing suite; timelines are one module',
    ],
  },
]

const sources = [
  { label: 'Aeon Timeline pricing', href: 'https://aeontimeline.com/pricing' },
  { label: 'World Anvil Chronicles', href: 'https://www.worldanvil.com/learn/chronicles' },
  { label: 'Campfire pricing', href: 'https://www.campfirewriting.com/pricing' },
  { label: 'Campfire apps', href: 'https://www.campfirewriting.com/apps' },
]

function Alternatives() {
  usePageMeta({
    title: 'Alternatives: Aeon Timeline, World Anvil, Campfire',
    description:
      'How Timelines Studio compares to Aeon Timeline, World Anvil, and Campfire on price, offline use, platforms, and data ownership. A free, open-source alternative.',
    jsonLd: alternativesLd,
  })

  return (
    <div className="page alternatives">
      <h1 className="page-title">Timelines Studio vs the alternatives</h1>
      <p className="page-subtitle">
        A free, open-source alternative to Aeon Timeline, World Anvil, and Campfire for building timelines.
      </p>

      <section className="alt-section">
        <h2>The short version</h2>
        <p>
          Timelines Studio is a free, open-source desktop app that does one thing: timelines. It works
          offline, needs no account, and saves your work as plain files on your computer. Aeon Timeline
          is a paid desktop timeline app. World Anvil and Campfire are larger worldbuilding and writing
          platforms where timelines are one feature among many.
        </p>
      </section>

      <section className="alt-section">
        <h2>Side by side</h2>
        <div className="alt-table-wrap">
          <table className="alt-table">
            <thead>
              <tr>
                <th scope="col"><span className="visually-hidden">Feature</span></th>
                {apps.map((app) => (
                  <th scope="col" key={app}>{app}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={apps[i]}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="alt-note">
          Last checked {CHECKED}. Prices and plans change, so confirm on each product&rsquo;s site
          before you buy.
        </p>
      </section>

      <section className="alt-section">
        <h2>Switching to Timelines Studio</h2>
        <p>
          Timelines are built from events, spans, and eras, organized with tags and groups, with a
          Markdown note on any element. The <Link to="/wiki/Elements/">Elements guide</Link> covers the
          building blocks and the <Link to="/wiki/Dates/">Dates guide</Link> covers BCE, approximate,
          and calendar dates.
        </p>
        <div className="alt-cta">
          <Link to="/download/" className="btn btn-primary">Download Timelines</Link>
          <Link to="/gallery/" className="btn btn-secondary">See example timelines</Link>
        </div>
      </section>

      <section className="alt-section alt-sources">
        <h2>Sources</h2>
        <ul>
          {sources.map(({ label, href }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Alternatives
