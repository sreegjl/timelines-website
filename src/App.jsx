import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Download from './pages/Download'
import Changelog from './pages/Changelog'
import Gallery from './pages/Gallery'
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
