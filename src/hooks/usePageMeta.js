import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const defaults = {
  title: 'Timelines Studio | Open-Source Timeline App for Worldbuilding',
  description: 'A free, open-source app for creating interactive timelines for worldbuilding and history.',
  siteUrl: 'https://timelines.studio',
}

export default function usePageMeta({ title, description, jsonLd = null } = {}) {
  const { pathname } = useLocation()

  // jsonLd is usually built inline by the caller, so a fresh object arrives on
  // every render. Depend on its serialized form to keep the effect stable.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} — Timelines Studio` : defaults.title
    const desc = description || defaults.description
    const canonical = `${defaults.siteUrl}${pathname === '/' ? '' : pathname}`

    document.title = fullTitle

    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', canonical)
    setLink('canonical', canonical)
    setJsonLd(jsonLdKey)

    return () => {
      document.title = defaults.title
      setMeta('name', 'description', defaults.description)
      setMeta('property', 'og:title', defaults.title)
      setMeta('property', 'og:description', defaults.description)
      setMeta('property', 'og:url', defaults.siteUrl)
      setLink('canonical', defaults.siteUrl)
      setJsonLd('')
    }
  }, [title, description, pathname, jsonLdKey])
}

function setMeta(attr, key, value) {
  const el = document.querySelector(`meta[${attr}="${key}"]`)
  if (el) el.setAttribute('content', value)
}

// Replaces the managed JSON-LD block. An empty string removes it, so pages
// that are not about the app do not inherit the homepage's SoftwareApplication.
function setJsonLd(serialized) {
  const el = document.getElementById('ld-json')
  if (!serialized) {
    if (el) el.remove()
    return
  }
  if (el) {
    el.textContent = serialized
    return
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'ld-json'
  script.textContent = serialized
  document.head.appendChild(script)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
