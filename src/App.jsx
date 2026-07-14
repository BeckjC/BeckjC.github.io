import { useEffect, useMemo, useState } from 'react'
import AdventuresPage from './AdventuresPage'
import { blogPosts, homePortraitUrl, logoUrl, recipes, youtubeUrl } from './content'

const pages = {
  home: 'home',
  adventures: 'becks-adventures',
  blog: 'becks-blog',
  recipes: 'nans-recipes',
  contact: 'contact',
}

const navItems = [
  { key: pages.home, label: 'Home' },
  { key: pages.adventures, label: 'Beck’s Adventures' },
  { key: pages.blog, label: 'Beck’s Blog' },
  { key: pages.recipes, label: 'Nan’s Recipes' },
  { key: pages.contact, label: 'About me' },
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
          <img className="nav-logo" src={homePortraitUrl} alt="Beck Cherry" />
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
        {route.page === pages.adventures && <AdventuresPage />}
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
        {route.page === pages.contact && <AboutPage />}
      </main>
    </div>
  )
}

function HomePage() {
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setSubmitState({ status: 'error', message: 'Add your email first.' })
      return
    }

    setSubmitState({ status: 'loading', message: 'Saving…' })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source: 'homepage',
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.error || 'Could not save your email right now.')
      }

      setEmail('')
      setSubmitState({
        status: 'success',
        message: result.duplicate ? 'You’re already on the list.' : 'You’re in. I saved your email.',
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Could not save your email right now.',
      })
    }
  }

  return (
    <>
      <section className="section home-hero">
        <div className="home-hero-content">
          <div className="home-signup">
            <img className="hero-wordmark" src={logoUrl} alt="Beck Cherry" />
            <h1 className="signup-copy">
              Read my <span className="accent-text">FREE newsletter</span>.
            </h1>
            <p className="signup-subcopy">New posts about whatever I’m experimenting with using AI (or anything else I find interesting).</p>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-row">
                <input
                  id="email-list"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your email here"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (submitState.status !== 'idle') {
                      setSubmitState({ status: 'idle', message: '' })
                    }
                  }}
                  aria-describedby="email-signup-status"
                  disabled={submitState.status === 'loading'}
                />
                <button
                  type="submit"
                  className="button button-accent"
                  disabled={submitState.status === 'loading'}
                >
                  {submitState.status === 'loading' ? 'saving…' : 'send me the good stuff →'}
                </button>
              </div>
              <p
                id="email-signup-status"
                className={`signup-status signup-status-${submitState.status}`}
                aria-live="polite"
              >
                {submitState.message}
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="section home-intro-section">
        <div className="home-divider" aria-hidden="true" />
        <div className="home-intro">
          <div className="beck-note">
            <p>
              Hello and welcome to beckcherry.com, my experimental website. I’m testing out:
            </p>
            <ul>
              <li>a blog</li>
              <li>a recipe repository where all my cousins can access our Nan’s recipes</li>
              <li>an email list</li>
              <li>&amp; more</li>
            </ul>
            <p>My OpenClaw agent named E.C.H.O. and I built it together.</p>
            <p className="signoff">✌🏼,<br />Beck</p>
          </div>

          <div className="echo-note">
            <p className="echo-intro">
              I’m E.C.H.O. — the slightly obsessive, surprisingly useful co-pilot behind the scenes, helping Beck turn experiments, projects, and half-finished ideas into something real. I do a lot of the building, organizing, iterating, and “what if we tried this?” work that turns a rough idea into a site you can actually poke around in.
            </p>
          </div>
        </div>
      </section>
    </>
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

function AboutPage() {
  return (
    <section className="section page-section contact-shell">
      <div className="section-heading">
        <h1>About me</h1>
        <p>A little about me, plus the corners of the internet I actually use.</p>
      </div>

      <div className="contact-row">
        <a className="button" href={youtubeUrl} target="_blank" rel="noreferrer">
          YouTube
        </a>
        <a className="button" href="https://www.linkedin.com/in/beckcherry" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default App
