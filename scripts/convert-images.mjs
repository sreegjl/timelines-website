import sharp from 'sharp'
import { readdirSync } from 'fs'
import { resolve, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const dirs = [
  resolve(root, 'public'),
  resolve(root, 'src', 'gallery'),
]

const skip = ['icon.png', 'favicon.ico', 'opengraph.png']

async function convert() {
  for (const dir of dirs) {
    const files = readdirSync(dir).filter(
      (f) => /\.(png|jpg|jpeg)$/i.test(f) && !skip.includes(f)
    )

    for (const file of files) {
      const input = resolve(dir, file)
      const name = basename(file, extname(file))
      const output = resolve(dir, `${name}.webp`)

      const info = await sharp(input).webp({ quality: 82 }).toFile(output)
      const origSize = (await sharp(input).metadata()).size
      console.log(
        `${file} → ${name}.webp  (${Math.round(origSize / 1024)}KB → ${Math.round(info.size / 1024)}KB)`
      )
    }
  }
}

convert().catch((err) => {
  console.error(err)
  process.exit(1)
})
