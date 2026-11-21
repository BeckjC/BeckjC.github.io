import test from 'node:test'
import assert from 'node:assert/strict'
import { findRecipes } from '../src/lib/recipeSearch.js'

const recipes = Object.freeze([
  Object.freeze({ slug: 'stollen', title: 'Stollen', excerpt: 'Chocolate filling' }),
  Object.freeze({ slug: 'creme', title: 'Nan’s Crème Brûlée' }),
  Object.freeze({ slug: 'apple', title: 'Apple Cake' }),
  Object.freeze({ slug: 'apple-two', title: 'Apple Cake' }),
])
const slugs = (results) => results.map(({ slug }) => slug)

test('blank and whitespace searches preserve the original order', () => {
  assert.deepEqual(slugs(findRecipes(recipes)), ['stollen', 'creme', 'apple', 'apple-two'])
  assert.deepEqual(findRecipes(recipes, ' \t\n '), recipes)
})
test('search is case, diacritic and apostrophe tolerant', () => {
  for (const query of ["NAN'S creme", 'nans CRÈME', 'nan’s brûlée']) {
    assert.deepEqual(slugs(findRecipes(recipes, query)), ['creme'])
  }
})
test('all words must match the name, regardless of word order or spacing', () => {
  assert.deepEqual(slugs(findRecipes(recipes, 'cake  APPLE')), ['apple', 'apple-two'])
  assert.deepEqual(findRecipes(recipes, 'apple stollen'), [])
})
test('search does not imply ingredient or excerpt search', () => {
  assert.deepEqual(findRecipes(recipes, 'chocolate'), [])
  assert.deepEqual(findRecipes(recipes, 'xyz'), [])
})
test('A–Z sorting is stable and never mutates recipes or entries', () => {
  assert.deepEqual(slugs(findRecipes(recipes, '', 'az')), ['apple', 'apple-two', 'creme', 'stollen'])
  assert.deepEqual(slugs(findRecipes(recipes, 'cake', 'az')), ['apple', 'apple-two'])
  assert.deepEqual(slugs(recipes), ['stollen', 'creme', 'apple', 'apple-two'])
  assert.equal(findRecipes(recipes, 'stollen')[0], recipes[0])
})
test('an empty collection stays empty for either order', () => {
  assert.deepEqual(findRecipes([], '', 'az'), [])
  assert.deepEqual(findRecipes([], 'cake'), [])
})
