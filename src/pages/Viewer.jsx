import { useRef, useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'

const VIEWER_PAYLOAD_KEY = 'timelines-viewer-payload'

function hasTimelineExtension(name) {
  const lower = name.toLowerCase()
  return lower.endsWith('.timeline') || lower.endsWith('.json')
}

// Accepts github.com blob URLs and raw.githubusercontent.com URLs pointing at
// a .timeline file. Returns [user, repo, branch, ...pathParts] or null.
function parseGitHubUrl(input) {
  let url
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }

  const parts = url.pathname.split('/').filter(Boolean)
  let segments

  if (url.hostname === 'github.com') {
    // /{user}/{repo}/blob/{branch}/{path}
    if (parts.length < 5 || parts[2] !== 'blob') return null
    segments = [parts[0], parts[1], ...parts.slice(3)]
  } else if (url.hostname === 'raw.githubusercontent.com') {
    // /{user}/{repo}/{branch}/{path}
    if (parts.length < 4) return null
    segments = parts
  } else {
    return null
  }

  // Strip the refs/heads/ prefix some raw URLs carry before the branch name
  if (segments[2] === 'refs' && segments[3] === 'heads') {
    segments = [segments[0], segments[1], ...segments.slice(4)]
  }

  if (segments.length < 4) return null
  if (!segments[segments.length - 1].toLowerCase().endsWith('.timeline')) return null

  return segments.map(decodeURIComponent)
}

function Viewer() {
  usePageMeta({
    title: 'Viewer',
    description: 'View a timeline in your browser. Nothing is uploaded, files stay on your device.',
  })

  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState('')
  const [ghUrl, setGhUrl] = useState('')
  const [ghError, setGhError] = useState('')

  async function openFile(file) {
    if (!file) return
    if (!hasTimelineExtension(file.name)) {
      setFileError('That doesn’t look like a timeline. Choose a .timeline or .json file.')
      return
    }
    setFileError('')
    const text = await file.text()
    sessionStorage.setItem(VIEWER_PAYLOAD_KEY, text)
    window.location.href = '/viewer/'
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragActive(false)
    openFile(e.dataTransfer.files[0])
  }

  function handleGhLoad(e) {
    e.preventDefault()
    if (!ghUrl.trim()) {
      setGhError('Paste a GitHub link to a .timeline file.')
      return
    }
    const segments = parseGitHubUrl(ghUrl)
    if (!segments) {
      setGhError('That link didn’t work. Use a github.com or raw.githubusercontent.com link to a .timeline file.')
      return
    }
    setGhError('')
    window.location.href = '/viewer/#gh/' + segments.map(encodeURIComponent).join('/')
  }

  return (
    <div className="page viewer-landing">
      <h1 className="page-title">Timeline <em>Viewer.</em></h1>
      <p className="page-subtitle">
        View a timeline in your browser: nothing is uploaded, files stay on your device.
      </p>

      <div
        className={`viewer-drop-zone${dragActive ? ' drag-active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Open a timeline file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
        <p className="viewer-drop-title">Drop a timeline here</p>
        <p className="viewer-drop-hint">or click to choose a .timeline or .json file</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".timeline,.json"
          className="viewer-file-input"
          onChange={(e) => {
            openFile(e.target.files[0])
            e.target.value = ''
          }}
        />
      </div>
      {fileError && <p className="viewer-error" role="alert">{fileError}</p>}

      <div className="viewer-divider" aria-hidden="true"><span>or</span></div>

      <form className="viewer-gh" onSubmit={handleGhLoad}>
        <label className="viewer-gh-label" htmlFor="viewer-gh-url">
          Load a .timeline file from GitHub
        </label>
        <div className="viewer-gh-row">
          <input
            id="viewer-gh-url"
            type="text"
            placeholder="https://github.com/user/repo/blob/main/my-world.timeline"
            value={ghUrl}
            onChange={(e) => { setGhUrl(e.target.value); setGhError('') }}
            spellCheck={false}
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">Load</button>
        </div>
        {ghError && <p className="viewer-error" role="alert">{ghError}</p>}
      </form>
    </div>
  )
}

export default Viewer
