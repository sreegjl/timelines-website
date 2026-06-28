import { useState, useEffect } from 'react'
import usePageMeta from '../hooks/usePageMeta'

const allImages = Object.entries(
  import.meta.glob('../gallery/*.{jpg,jpeg,png,gif,webp,svg,avif,PNG,JPG,JPEG,WEBP}', { eager: true })
).map(([path, mod]) => ({
  src: mod.default,
  name: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
  ext: path.split('.').pop().toLowerCase(),
}))

const imageMap = new Map()
for (const img of allImages) {
  const existing = imageMap.get(img.name)
  if (!existing || img.ext === 'webp') {
    imageMap.set(img.name, img)
  }
}
const images = [...imageMap.values()]

function Gallery() {
  usePageMeta({
    title: 'Gallery',
    description: 'Screenshots and visuals from Timelines.',
  })

  const [selectedIndex, setSelectedIndex] = useState(null)

  const prev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setSelectedIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex])

  const selected = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <div className="page gallery">
      <h1 className="page-title">Gallery</h1>
      <p className="page-subtitle">Screenshots and visuals from Timelines.</p>

      {images.length === 0 ? (
        <p className="gallery-empty">No images yet.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img, i) => (
            <button key={i} className="gallery-item" onClick={() => setSelectedIndex(i)}>
              <img src={img.src} alt={img.name} />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="gallery-lightbox" onClick={() => setSelectedIndex(null)}>
          <button className="gallery-nav gallery-nav-prev" onClick={(e) => { e.stopPropagation(); prev() }}>&#8249;</button>
          <img src={selected.src} alt={selected.name} onClick={(e) => e.stopPropagation()} />
          <button className="gallery-nav gallery-nav-next" onClick={(e) => { e.stopPropagation(); next() }}>&#8250;</button>
        </div>
      )}

      <div className="survey-callout">
        <p>Help shape the future of Timelines. Takes under 2 minutes.</p>
        <a href="https://forms.gle/Bbe74yyrZ7zhKeFL8" className="btn btn-primary survey-callout-btn" target="_blank" rel="noopener noreferrer">
          Take the Survey <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}

export default Gallery
