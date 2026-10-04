import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">timelines</Link>
            <p>Free, open-source timelines for worldbuilding and history.</p>
            <a
              href="https://www.producthunt.com/products/timelines-studio?utm_source=badge-find-us&utm_medium=badge&utm_campaign=badge-timelines-studio"
              className="footer-ph-badge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find Timelines Studio on Product Hunt"
            >
              <svg className="footer-ph-logo" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 31 31" aria-hidden="true">
                <circle className="footer-ph-logo-circle" cx="15.5" cy="15.5" r="15.5" />
                <path className="footer-ph-logo-p" d="M17.43 15.96h-4.34v-4.65h4.34a2.3 2.3 0 0 1 0 4.65m0-7.75h-7.4v15.5h3.06v-4.65h4.34a5.42 5.42 0 0 0 0-10.85" />
              </svg>
              <span className="footer-ph-text">
                <span className="footer-ph-eyebrow">Find us on</span>
                <span className="footer-ph-name">Product Hunt</span>
              </span>
            </a>
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
