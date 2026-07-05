import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">timelines</Link>
            <p>Free, open-source timelines for worldbuilding and history.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <Link to="/download">Download</Link>
              <Link to="/viewer-landing">Web Viewer</Link>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <Link to="/gallery">Gallery</Link>
              <Link to="/wiki">Wiki</Link>
              <Link to="/changelog">Changelog</Link>
              <Link to="/brand">Brand</Link>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <a href="https://github.com/sreegjl/timelines" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://github.com/sreegjl/timelines/issues" target="_blank" rel="noopener noreferrer">Report a Bug</a>
              <a href="https://ko-fi.com/sreegjl" target="_blank" rel="noopener noreferrer">Donate</a>
              <a href="mailto:sreegjl@gmail.com">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Timelines. GPL-3.0 License.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
