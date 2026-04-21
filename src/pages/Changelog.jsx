function Changelog() {
  const releases = [
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
      <h1>Changelog</h1>
      <p className="page-subtitle">See what&apos;s new in each release.</p>

      <div className="changelog-list">
        {releases.map((release) => (
          <div key={release.version} className={`changelog-entry${release.solid ? ' solid' : ''}`}>
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
    </div>
  )
}

export default Changelog
