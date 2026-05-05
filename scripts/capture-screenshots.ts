import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const PROJECTS = [
  { slug: 'seleccionadm', url: 'https://v0-sistema-de-administracion-de-pro.vercel.app/' },
  { slug: 'buhos-co',     url: 'https://buhosnocturnos.co/' },
  { slug: 'buhos-com',    url: 'https://buhosnocturnos.com/' },
  { slug: 'iedbagazal',   url: 'https://iedbagazal.edu.co/' },
]

async function capture() {
  const outDir = path.join(process.cwd(), 'public', 'screenshots')
  fs.mkdirSync(outDir, { recursive: true })

  const browser = await puppeteer.launch({ headless: true })

  for (const { slug, url } of PROJECTS) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30_000 })
      // Wait for visual settle
      await new Promise((r) => setTimeout(r, 2000))
      await page.screenshot({
        path: path.join(outDir, `${slug}.png`) as `${string}.png`,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
      })
      console.log(`✓ ${slug}`)
    } catch (e) {
      console.error(`✗ ${slug}:`, e)
    } finally {
      await page.close()
    }
  }

  await browser.close()
}

capture()
