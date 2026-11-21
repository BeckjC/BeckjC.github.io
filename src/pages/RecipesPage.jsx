import { useRef, useState } from 'react'
import { findRecipes } from '../lib/recipeSearch.js'

export default function RecipesPage({ recipes, getEntryHref, onInternalNavigate }) {
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('original')
  const searchRef = useRef(null)
  const visibleRecipes = findRecipes(recipes, query, order)
  const reset = () => {
    setQuery('')
    setOrder('original')
    searchRef.current?.focus()
  }

  return (
    <section className="section page-section page-motion-shell">
      <div className="section-heading page-motion-intro">
        <h1>Nan’s Recipes</h1>
        <p>found in Nan’s recipe drawer</p>
      </div>

      <div className="recipe-finder" role="search" aria-label="Recipe finder">
        <div className="recipe-finder-controls">
          <div className="recipe-finder-field recipe-finder-search">
            <label htmlFor="recipe-search">Search recipes</label>
            <input
              ref={searchRef}
              id="recipe-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try chocolate cake…"
              aria-describedby="recipe-search-hint"
            />
          </div>
          <div className="recipe-finder-field">
            <label htmlFor="recipe-sort">Sort recipes</label>
            <select id="recipe-sort" value={order} onChange={(event) => setOrder(event.target.value)}>
              <option value="original">Original order</option>
              <option value="az">Name: A–Z</option>
            </select>
          </div>
          <button className="recipe-finder-reset" type="button" onClick={reset} disabled={!query && order === 'original'}>
            Reset
          </button>
        </div>
        <div className="recipe-finder-caption">
          <p id="recipe-search-hint">Find a recipe by name.</p>
          <p role="status" aria-live="polite" aria-atomic="true">{visibleRecipes.length} of {recipes.length} recipes</p>
        </div>
      </div>

      {visibleRecipes.length === 0 ? (
        <div className="recipe-finder-empty">
          <h2>No recipes found</h2>
          <p>Try another recipe name, or reset to see the whole collection.</p>
        </div>
      ) : null}

      <div className="list-grid recipes-grid">
        {visibleRecipes.map((recipe) => (
          <article key={recipe.slug} className="entry-card text-entry motion-card">
            <div className="entry-copy">
              <h2>
                <a
                  className="title-link"
                  href={getEntryHref(recipe.slug)}
                  onClick={(event) => onInternalNavigate(event, getEntryHref(recipe.slug))}
                >
                  {recipe.title}
                </a>
              </h2>
              {recipe.excerpt ? <p>{recipe.excerpt}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
