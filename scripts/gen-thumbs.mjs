import sharp from 'sharp'
import { readdirSync, mkdirSync, statSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const galleryDir = resolve(root, 'src', 'gallery')
const thumbDir = resolve(galleryDir, 'thumbs')
const manifest = resolve(galleryDir, 'thumbs.json')

const THUMB_WIDTH = 640
const THUMB_QUALITY = 72

async function genThumbs() {
  mkdirSync(thumbDir, { recursive: true })

  const files = readdirSync(galleryDir).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
  const dims = {}

  for (const file of files) {
    const input = resolve(galleryDir, file)
    const name = basename(file, extname(file))
    const output = resolve(thumbDir, `${name}.webp`)

    const meta = await sharp(input).metadata()
    dims[name] = { width: meta.width, height: meta.height }

    // Skip regeneration when the thumb is already newer than its source.
    if (existsSync(output) && statSync(output).mtimeMs >= statSync(input).mtimeMs) {
      continue
    }

    const info = await sharp(input)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(output)

    console.log(`${file} → thumbs/${name}.webp  (${Math.round(info.size / 1024)}KB)`)
  }

  writeFileSync(manifest, JSON.stringify(dims, null, 2) + '\n')
  console.log(`Wrote thumbs.json with ${Object.keys(dims).length} entries`)
}

genThumbs().catch((err) => {
  console.error(err)
  process.exit(1)
})
