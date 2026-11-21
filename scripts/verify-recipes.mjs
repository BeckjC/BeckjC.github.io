// Local UI acceptance. Uses an already installed Playwright + Chromium.
// Run: node scripts/verify-recipes.mjs http://127.0.0.1:4173
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { recipes } from '../src/content/contentData.js'

const base = process.argv[2] || 'http://127.0.0.1:4173'
const url = new URL(base)
assert.ok(['127.0.0.1', 'localhost'].includes(url.hostname), 'Acceptance must target local development only')
const artifactDir = new URL('../tests/artifacts/', import.meta.url)
await mkdir(artifactDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = []
const errors = []
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  page.on('pageerror', (error) => errors.push(error.message))
  // No API writes: test navigation/filtering, never newsletter/intake submissions.
  await page.route('**/api/**', (route) => route.abort())
  await page.goto(`${base}/nans-recipes`)
  const cards = page.locator('.recipes-grid article')
  const search = page.getByRole('searchbox', { name: 'Search recipes', exact: true })
  const sort = page.getByRole('combobox', { name: 'Sort recipes', exact: true })
  await search.waitFor()
  assert.equal(await cards.count(), 20)
  const originalLinks = recipes.map((r) => `/nans-recipes/${r.slug}`)
  assert.deepEqual(await cards.locator('h2 a').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href'))), originalLinks)
  results.push('All20 original recipes and canonical links preserved')

  await search.fill('  cAkE  ')
  assert.equal(await cards.count(), 4)
  assert.deepEqual(await cards.locator('h2').allTextContents(), ['Cheesecake', 'Potato Pancakes with Applesauce', 'Kahlua Cake', 'Chocolate Praline Layer Cake'])
  await search.fill('salad pear')
  assert.equal(await cards.count(), 1)
  assert.equal(await cards.locator('h2').innerText(), 'Watercress + Pear Salad')
  await search.fill("NAN'S")
  assert.equal(await cards.count(), 2)
  results.push('Case, whitespace, multiword and straight/curly apostrophe search work in UI')

  await search.fill('zzzz-no-recipe')
  assert.equal(await cards.count(), 0)
  assert.match(await page.locator('main').innerText(), /no recipes|no matches/i)
  // Locate an explicit reset control without coupling the test to copy.
  const recovery = page.getByRole('button', { name: /clear|reset|all recipes/i }).last()
  await recovery.click()
  assert.equal(await cards.count(), 20)
  assert.equal(await search.evaluate((el) => el === document.activeElement), true)
  results.push('No-results state recovers to the full collection and returns keyboard focus')

  const options = await sort.locator('option').evaluateAll((nodes) => nodes.map((n) => ({ value: n.value, text: n.textContent })))
  const alphabetic = options.find((o) => /A.?Z|alphabet/i.test(o.text))
  assert.ok(alphabetic, 'Alphabetical option present')
  await sort.selectOption(alphabetic.value)
  assert.deepEqual(await cards.locator('h2').allTextContents(), recipes.map((r) => r.title).sort((a, b) => a.localeCompare(b)))
  await sort.selectOption(options[0].value)
  assert.deepEqual(await cards.locator('h2 a').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href'))), originalLinks)
  results.push('A–Z sorting and original order restoration work without data mutation')

  await search.focus()
  await page.keyboard.type('stollen')
  await page.keyboard.press('Tab')
  assert.notEqual(await page.evaluate(() => document.activeElement?.tagName), 'BODY')
  await page.getByRole('link', { name: 'Stollen', exact: true }).click()
  assert.equal(new URL(page.url()).pathname, `/nans-recipes/${recipes.find((r) => r.title === 'Stollen').slug}`)
  await page.getByRole('heading', { name: 'Stollen', exact: true }).waitFor()
  await page.getByRole('link', { name: /← Nan/ }).click()
  await search.waitFor()
  assert.equal(await cards.count(), 20)
  results.push('Keyboard entry, recipe navigation and back link work')

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await search.fill('')
    const bounds = await page.locator('main').evaluate((main) => {
      const viewport = document.documentElement.clientWidth
      return [...main.querySelectorAll('input, select, button, article')].map((el) => {
        const r = el.getBoundingClientRect()
        return { tag: el.tagName, left: r.left, right: r.right, viewport }
      })
    })
    assert.ok(bounds.every((b) => b.left >= -1 && b.right <= b.viewport + 1), `Controls/cards stay inside viewport at ${width}px`)
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: new URL(`recipes-after-${width}.png`, artifactDir).pathname, fullPage: true })
    }
  }
  results.push('No control/card overflow at320,390,768,1440px; real screenshots captured')
  await page.setViewportSize({ width: 1440, height: 900 })
  await search.fill('cake')
  await page.screenshot({ path: new URL('recipes-search-desktop.png', artifactDir).pathname, fullPage: true })
  assert.deepEqual(errors, [])
  results.push('No browser JavaScript errors')
  await writeFile(new URL('recipes-browser-results.json', artifactDir), JSON.stringify({ checkedAt: new Date().toISOString(), base, results, errors }, null, 2) + '\n')
  console.log(JSON.stringify({ passed: results.length, results }, null, 2))
} finally {
  await browser.close()
}
