const normalizeName = (value) => value
  .normalize('NFD')
  .replace(/\p{M}/gu, '')
  .replace(/['’‘ʼ]/g, '')
  .toLowerCase()

const nameOrder = new Intl.Collator('en', { sensitivity: 'base' })

// Match names only: many recipes are image scans, not searchable ingredients.
export function findRecipes(recipes, query = '', order = 'original') {
  const words = normalizeName(query).trim().split(/\s+/).filter(Boolean)
  const matches = recipes.filter(({ title }) => {
    const name = normalizeName(title)
    return words.every((word) => name.includes(word))
  })
  return order === 'az'
    ? matches.sort((a, b) => nameOrder.compare(a.title, b.title))
    : matches
}
