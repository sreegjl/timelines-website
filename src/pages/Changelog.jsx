import usePageMeta from '../hooks/usePageMeta'

function Changelog() {
  usePageMeta({
    title: 'Changelog',
    description: 'See what\'s new in each release of Timelines.',
  })
  const releases = [
    {
      version: '0.6.0-alpha.2',
      date: 'July 5, 2026',
      changes: [
        'Web viewer for .timeline files, including GitHub-hosted share links',
        'Packaged .timeline exports with linked images and notes included',
        'Touch pan and pinch-zoom controls',
        'Spreadsheet sorting, bulk editing, and a richer chip-based filter menu',
        'Drag-and-drop timeline import, custom install folders, faster marketplace bulk actions',
        'Fixed rename/save data loss cases and web viewer panel overlap',
      ],
      solid: true,
    },
    {
      version: '0.5.0-alpha.3',
      date: 'June 15, 2026',
      changes: [
        'Reworked theme color variables (renamed keys, added theme type/collection metadata)',
        'Event overlap issue resolved when thumbnails enabled',
      ],
      solid: false,
    },
    {
      version: '0.5.0-alpha.2',
      date: 'June 2, 2026',
      changes: [
        'Web image URLs as event thumbnails',
        'Portable asset paths, enhanced video in notes',
        'Fixed thumbnail drag-and-drop, overlapping thumbnails',
      ],
      solid: false,
    },
    {
      version: '0.5.0-alpha.1',
      date: 'June 1, 2026',
      changes: [
        'Image thumbnails for events',
        'Source citations with links',
        'Customizable event colors, video embeds in notes',
      ],
      solid: true,
    },
    {
      version: '0.4.0-alpha.4',
      date: 'May 15, 2026',
      changes: [
        'Notes reorganized into a .notes folder',
        'Fixed timeline creation in subfolders and search',
      ],
      solid: false,
    },
    {
      version: '0.4.0-alpha.3',
      date: 'May 13, 2026',
      changes: [
        'Folder and sub-folder support on the homepage',
        'New Parchment v2 theme',
        'Homepage sorting, event group inheritance',
      ],
      solid: false,
    },
    {
      version: '0.4.0-alpha.2',
      date: 'April 28, 2026',
      changes: [
        'Tick density controls for year label spacing',
        'Full MediaWiki support, calendar input, OSM attribution',
        'Grouping customization for eras and spans',
      ],
      solid: false,
    },
    {
      version: '0.4.0-alpha.1',
      date: 'April 20, 2026',
      changes: [
        'Add coordinates to elements and the seem in map view',
        'Smoother zoom and pan with momentum/inertia effects',
      ],
      solid: true,
    },
    {
      version: '0.3.0-alpha.1',
      date: 'April 12, 2026',
      changes: [
        'Groups events and spans',
        'Search overlay for quick element discovery',
        'Video export, customizable keyboard shortcuts, Wikipedia integration',
      ],
      solid: true,
    },
    {
      version: '0.2.0-alpha.1',
      date: 'February 10, 2026',
      changes: [
        'Link Existing .md Notes',
        'Improved .png Export',
      ],
      solid: true,
    },
    {
      version: '0.1.0-alpha.1',
      date: 'February 7, 2026',
      changes: [
        'Add events, eras, and spans.',
        'Custom theme/font support',
      ],
      solid: true,
    },
    {
      version: 'First Push',
      date: 'November 9, 2025',
      solid: false,
    },
  ]

  return (
    <div className="page changelog">
      <h1 className="page-title">Changelog</h1>
      <p className="page-subtitle">See what&apos;s new in each release.</p>

      <div className="changelog-list">
        {releases.map((release) => (
          <div key={release.version} className={`changelog-entry${release.solid ? ' solid' : ''}`}>
            {/^\d/.test(release.version) && (
              <a className="changelog-link" href={`https://github.com/sreegjl/timelines/releases/tag/v${release.version}`} target="_blank" rel="noopener noreferrer" aria-label="View release on GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5" /><path d="M10 14 19 5" /><path d="M19 14v5h-14v-14h5" /></svg>
              </a>
            )}
            <div className="changelog-header">
              <h2>{/^\d/.test(release.version) ? 'v' : ''}{release.version}</h2>
              <span className="changelog-date">{release.date}</span>
            </div>
            {release.changes && (
              <div className="changelog-body">
                <ul>
                  {release.changes.map((change, i) => (
                    <li key={i}>{change}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
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

export default Changelog
