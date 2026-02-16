import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          timelines
          <svg
            className="navbar-logo"
            width="67"
            height="25"
            viewBox="0 0 67 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect y="8.89844" width="28.2656" height="6.80469" fill="currentColor" />
            <rect x="35.0703" width="31.9297" height="7.32812" fill="currentColor" />
            <rect x="35.0703" y="16.75" width="31.9297" height="7.32812" fill="currentColor" />
            <path
              d="M28.2656 5C28.2656 2.23858 30.5042 0 33.2656 0H35.0703V24.0781H33.2656C30.5042 24.0781 28.2656 21.8395 28.2656 19.0781V5Z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <div className="navbar-links">
          <Link to="/download" className={location.pathname === '/download' ? 'active' : ''}>Download</Link>
          <Link to="/changelog" className={location.pathname === '/changelog' ? 'active' : ''}>Changelog</Link>
          <a href="https://ko-fi.com/sreegjl" className="btn-donate" target="_blank" rel="noopener noreferrer">
            <svg
              className="btn-donate-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path className="btn-donate-heart-fill" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z" />
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z" />
            </svg>
            Donate
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
