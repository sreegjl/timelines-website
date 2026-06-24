import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const defaults = {
  title: 'Timelines',
  description: 'A free, open-source app for creating interactive timelines for worldbuilding and history.',
  siteUrl: 'https://timelines.studio',
}

export default function usePageMeta({ title, description } = {}) {
  const { pathname } = useLocation()

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

    return () => {
      document.title = defaults.title
      setMeta('name', 'description', defaults.description)
      setMeta('property', 'og:title', defaults.title)
      setMeta('property', 'og:description', defaults.description)
      setMeta('property', 'og:url', defaults.siteUrl)
      setLink('canonical', defaults.siteUrl)
    }
  }, [title, description, pathname])
}

function setMeta(attr, key, value) {
  const el = document.querySelector(`meta[${attr}="${key}"]`)
  if (el) el.setAttribute('content', value)
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
