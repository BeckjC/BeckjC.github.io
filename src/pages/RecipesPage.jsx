export default function RecipesPage({ recipes, getEntryHref, onInternalNavigate }) {
  return (
    <section className="section page-section page-motion-shell">
      <div className="section-heading page-motion-intro">
        <h1>Nan’s Recipes</h1>
        <p>found in Nan’s recipe drawer</p>
      </div>

      <div className="list-grid recipes-grid">
        {recipes.map((recipe) => (
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
