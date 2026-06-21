import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
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
          timelines
        </Link>

        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <Link to="/gallery" onClick={() => setMenuOpen(false)} className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
          <Link to="/wiki" onClick={() => setMenuOpen(false)} className={location.pathname.startsWith('/wiki') ? 'active' : ''}>Wiki</Link>
          <Link to="/changelog" onClick={() => setMenuOpen(false)} className={location.pathname === '/changelog' ? 'active' : ''}>Changelog</Link>
          <a href="https://ko-fi.com/sreegjl" className="btn-donate" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="btn-donate-heart-fill" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z" />
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z" />
            </svg>
            Donate
          </a>
          <Link to="/download" className="btn btn-primary navbar-cta" onClick={() => setMenuOpen(false)}>Download Alpha</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
