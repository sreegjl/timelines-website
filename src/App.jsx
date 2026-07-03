import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Download from './pages/Download'
import Changelog from './pages/Changelog'
import Gallery from './pages/Gallery'
import ThemeBuilder from './pages/ThemeBuilder'
import Wiki from './pages/Wiki'
import Brand from './pages/Brand'
import Viewer from './pages/Viewer'
import {
  applyThemeToDocument,
  defaultThemeId,
  getThemeById,
  themeStorageKey,
} from './data/themes'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

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
      <ScrollToTop />
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
            <Route path="/brand" element={<Brand />} />
            <Route path="/viewer-landing" element={<Viewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
