import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Download from './pages/Download'
import Changelog from './pages/Changelog'
import Gallery from './pages/Gallery'
import ThemeBuilder from './pages/ThemeBuilder'
import Wiki from './pages/Wiki'
import {
  applyThemeToDocument,
  defaultThemeId,
  getThemeById,
  themeStorageKey,
} from './data/themes'
import './App.css'

function App() {
  const [activeThemeId, setActiveThemeId] = useState(() => {
    if (typeof window === 'undefined') return defaultThemeId
    return window.localStorage.getItem(themeStorageKey) ?? defaultThemeId
  })

  useEffect(() => {
    const activeTheme = getThemeById(activeThemeId)
    applyThemeToDocument(activeTheme)
    window.localStorage.setItem(themeStorageKey, activeTheme.id)
  }, [activeThemeId])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  activeThemeId={activeThemeId}
                  onThemeSelect={setActiveThemeId}
                />
              }
            />
            <Route path="/download" element={<Download />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/wiki/:page" element={<Wiki />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/theme-builder" element={<ThemeBuilder />} />
          </Routes>
        </main>
        <div className="survey-callout">
          <p>Help shape the future of Timelines. Takes under 2 minutes.</p>
          <a href="https://forms.gle/Bbe74yyrZ7zhKeFL8" className="btn btn-primary survey-callout-btn" target="_blank" rel="noopener noreferrer">
            Take the Survey <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
