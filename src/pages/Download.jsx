function Download() {
  return (
    <div className="page download">

      <div className="download-notice">
        This is an early testing build. Expect bugs, missing features, and breaking changes. Please report issues on <a href="https://github.com/sreegjl/timelines/issues" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </div>

      <div className="download-cards">
        <div className="download-card">
          <img src={`${import.meta.env.BASE_URL}icon.png`} alt="Timelines app icon" className="download-card-icon" />
          <h3>Windows</h3>
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.2.0-alpha.1/Timelines-0.2.0-alpha.1-Setup.exe" className="btn btn-primary">Download for Windows</a>
          <span className="download-meta">.exe &middot; 64-bit</span>
        </div>
        <div className="download-card">
          <img src={`${import.meta.env.BASE_URL}icon.png`} alt="Timelines app icon" className="download-card-icon" />
          <h3>macOS</h3>
          <a href="https://github.com/sreegjl/timelines/releases/download/v0.2.0-alpha.1/Timelines-0.2.0-alpha.1-Setup.dmg" className="btn btn-primary">Download for Mac</a>
          <span className="download-meta">.dmg &middot; Universal</span>
        </div>
      </div>
    </div>
  )
}

export default Download
