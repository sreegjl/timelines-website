import darkTheme from './dark.json'
import lightTheme from './light.json'
import nebulaTheme from './nebula.json'
import parchmentV2Theme from './parchment_v2.json'

export const themeStorageKey = 'timelines-website-theme'
export const defaultThemeId = 'parchment_v2'

export const themeCatalog = [
  { id: 'parchment_v2', ...parchmentV2Theme },
  { id: 'nebula', ...nebulaTheme },
  { id: 'light', ...lightTheme },
  { id: 'dark', ...darkTheme },
]

export function getThemeById(themeId) {
  return themeCatalog.find((theme) => theme.id === themeId) ?? themeCatalog[0]
}

export function applyThemeToDocument(theme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const { colors } = theme
  const themeFontLinkId = 'timelines-theme-font'
  const existingThemeFontLink = document.getElementById(themeFontLinkId)
  const fallbackSans = "'Lexend', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"

  root.style.setProperty('--color-bg', colors['app-bg'])
  root.style.setProperty('--color-bg-alt', colors['light-bg'])
  root.style.setProperty('--color-surface', colors.surface)
  root.style.setProperty('--color-card', colors['inset-bg'])
  root.style.setProperty('--color-border', colors['border-color'])
  root.style.setProperty('--color-ui-muted', colors['ui-muted'])
  root.style.setProperty('--color-surface-active', colors['surface-active'])

  root.style.setProperty('--color-text', colors['text-primary'])
  root.style.setProperty('--color-text-muted', colors['text-muted'])
  root.style.setProperty('--color-text-subtle', colors['text-subtle'])

  root.style.setProperty('--color-accent', colors['link-color'])
  root.style.setProperty(
    '--color-accent-hover',
    `color-mix(in srgb, ${colors['link-color']} 88%, ${colors['text-primary']})`
  )
  root.style.setProperty('--color-accent-surface', colors['accent-color'])
  root.style.setProperty('--color-link', colors['link-color'])
  root.style.setProperty('--color-highlight', colors['highlight-color'])
  root.style.setProperty('--color-selection', colors['selection-color'])
  root.style.setProperty('--color-era-label', colors['era-label'])

  if (theme?.font?.family) {
    root.style.setProperty('--font-sans', `"${theme.font.family}", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`)
  } else {
    root.style.setProperty('--font-sans', fallbackSans)
  }

  const fallbackSerif = "'Spectral', 'Georgia', serif"
  if (theme?.font?.serifFamily) {
    root.style.setProperty('--font-serif', `"${theme.font.serifFamily}", serif`)
  } else {
    root.style.setProperty('--font-serif', fallbackSerif)
  }

  if (theme?.font?.cssUrl) {
    if (existingThemeFontLink instanceof HTMLLinkElement) {
      if (existingThemeFontLink.href !== theme.font.cssUrl) {
        existingThemeFontLink.href = theme.font.cssUrl
      }
    } else {
      const link = document.createElement('link')
      link.id = themeFontLinkId
      link.rel = 'stylesheet'
      link.href = theme.font.cssUrl
      document.head.appendChild(link)
    }
  } else if (existingThemeFontLink) {
    existingThemeFontLink.remove()
  }

  const serifFontLinkId = 'timelines-theme-serif-font'
  const existingSerifFontLink = document.getElementById(serifFontLinkId)
  if (theme?.font?.serifCssUrl) {
    if (existingSerifFontLink instanceof HTMLLinkElement) {
      if (existingSerifFontLink.href !== theme.font.serifCssUrl) {
        existingSerifFontLink.href = theme.font.serifCssUrl
      }
    } else {
      const link = document.createElement('link')
      link.id = serifFontLinkId
      link.rel = 'stylesheet'
      link.href = theme.font.serifCssUrl
      document.head.appendChild(link)
    }
  } else if (existingSerifFontLink) {
    existingSerifFontLink.remove()
  }
}
