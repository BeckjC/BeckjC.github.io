import { useEffect, useMemo, useState } from 'react'
import { blogPosts, logoUrl, recipes, youtubeUrl } from './content'

const pages = {
  home: 'home',
  blog: 'becks-blog',
  recipes: 'nans-recipes',
  contact: 'contact',
}

const navItems = [
  { key: pages.home, label: 'Home' },
  { key: pages.blog, label: 'Beck’s Blog' },
  { key: pages.recipes, label: 'Nan’s Recipes' },
  { key: pages.contact, label: 'Contact' },
]

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '')

  if (!hash || hash === 'top') {
    return { page: pages.home }
  }

  const [page, slug] = hash.split('/')

  if (page === pages.blog && slug) {
    return { page, slug }
  }

  if (page === pages.recipes && slug) {
    return { page, slug }
  }

  if (Object.values(pages).includes(page)) {
    return { page }
  }

  return { page: pages.home }
}

function App() {
  const [route, setRoute] = useState(() => parseRoute())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute())
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const activePage = useMemo(() => {
    if (route.page === pages.blog && route.slug) return pages.blog
    if (route.page === pages.recipes && route.slug) return pages.recipes
    return route.page
  }, [route])

  const navigate = (nextPage) => {
    setMenuOpen(false)
    window.location.hash = nextPage === pages.home ? 'top' : nextPage
  }

  const selectedBlogPost = route.slug
    ? blogPosts.find((post) => post.slug === route.slug)
    : null
  const selectedRecipe = route.slug ? recipes.find((recipe) => recipe.slug === route.slug) : null

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand brand-button" onClick={() => navigate(pages.home)}>
          <img className="nav-logo" src={logoUrl} alt="Beck Cherry" />
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>

        <nav id="site-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={activePage === item.key ? 'nav-link nav-link-active' : 'nav-link'}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main id="top">
        {route.page === pages.home && <HomePage />}
        {route.page === pages.blog && !route.slug && <BlogPage />}
        {route.page === pages.blog && route.slug && selectedBlogPost && (
          <EntryPage entry={selectedBlogPost} parentLabel="Beck’s Blog" parentHref={`#${pages.blog}`} />
        )}
        {route.page === pages.recipes && !route.slug && <RecipesPage />}
        {route.page === pages.recipes && route.slug && selectedRecipe && (
          <EntryPage
            entry={selectedRecipe}
            parentLabel="Nan’s Recipes"
            parentHref={`#${pages.recipes}`}
          />
        )}
        {route.page === pages.contact && <ContactPage />}
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <section className="section home-shell">
      <div className="home-signup">
        <h1 className="signup-copy">
          Read my <span className="accent-text">FREE newsletter</span>.
        </h1>
        <p className="signup-subcopy">New posts, recipes, and whatever I’m working on.</p>
        <form className="signup-form" onSubmit={(event) => event.preventDefault()}>
          <div className="signup-row">
            <input
              id="email-list"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your email here"
            />
            <button type="submit" className="button button-accent">
              send me the good stuff →
            </button>
          </div>
        </form>
      </div>

      <section className="home-intro">
        <p>
          Hello and welcome to beckcherry.com, my experimental website. I’m testing out:
        </p>
        <ul>
          <li>a blog</li>
          <li>a recipe repository where all my cousins can access our Nan’s recipes</li>
          <li>an email list</li>
          <li>&amp; more</li>
        </ul>
        <p>
          My OpenClaw agent named E.C.H.O. and I built it together. Here’s what he has to say:
        </p>
        <p className="echo-intro">
          I’m E.C.H.O. — Beck’s chief-of-staff style agent — helping turn experiments, projects, and half-finished ideas into something real.
        </p>
        <p className="signoff">✌🏼,<br />Beck</p>
      </section>
    </section>
  )
}

function BlogPage() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <h1>Beck’s Blog</h1>
      </div>

      <div className="list-grid blog-grid">
        {blogPosts.map((post) => (
          <article key={post.slug} className="entry-card text-entry">
            <div className="entry-copy">
              <h2>
                <a className="title-link" href={`#becks-blog/${post.slug}`}>
                  {post.title}
                </a>
              </h2>
              <p>{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function RecipesPage() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <h1>Nan’s Recipes</h1>
        <p>found in Nan’s recipe drawer</p>
      </div>

      <div className="list-grid recipes-grid">
        {recipes.map((recipe) => (
          <article key={recipe.slug} className="entry-card text-entry">
            <div className="entry-copy">
              <h2>
                <a className="title-link" href={`#nans-recipes/${recipe.slug}`}>
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

function EntryPage({ entry, parentHref, parentLabel }) {
  return (
    <section className="section article-shell">
      <a className="back-link" href={parentHref}>
        ← {parentLabel}
      </a>

      <article className="article-entry">
        <header className="article-header">
          <h1>{entry.title}</h1>
        </header>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: entry.body }} />
      </article>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="section page-section contact-shell">
      <div className="section-heading">
        <h1>Contact</h1>
        <p>Get in touch.</p>
      </div>

      <div className="contact-row">
        <a className="button" href={youtubeUrl} target="_blank" rel="noreferrer">
          YouTube
        </a>
      </div>
    </section>
  )
}

export default App
