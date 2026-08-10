// JSON-LD graphs, injected per route by usePageMeta.
//
// SoftwareApplication belongs only on pages that are about the app itself
// (home and download). Wiki pages describe themselves as TechArticle and
// carry a breadcrumb trail instead.

const siteUrl = 'https://timelines.studio'

const author = { '@type': 'Person', name: 'sreegjl' }

const site = { '@type': 'WebSite', name: 'Timelines Studio', url: siteUrl }

export const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Timelines Studio',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Windows, macOS, Linux',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'A free, open-source desktop app for creating interactive timelines for worldbuilding and history.',
  url: siteUrl,
  downloadUrl: `${siteUrl}/download`,
  license: 'https://opensource.org/licenses/GPL-3.0',
  author,
}

function breadcrumb(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.url,
    })),
  }
}

export const wikiIndexLd = [
  breadcrumb([
    { name: 'Home', url: siteUrl },
    { name: 'Wiki', url: `${siteUrl}/wiki` },
  ]),
]

export function wikiArticleLd({ slug, label, description }) {
  const url = `${siteUrl}/wiki/${slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: label,
      description,
      url,
      isPartOf: site,
      inLanguage: 'en',
      author,
    },
    breadcrumb([
      { name: 'Home', url: siteUrl },
      { name: 'Wiki', url: `${siteUrl}/wiki` },
      { name: label, url },
    ]),
  ]
}
