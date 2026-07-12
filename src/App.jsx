import { useMemo, useState } from 'react'

const blogPosts = [
  {
    title: 'What I’m working on',
    meta: 'Projects, experiments, and updates',
    body: 'A running look at what has my attention right now and what I’m learning along the way.',
  },
  {
    title: 'Things worth sharing',
    meta: 'Useful ideas and internet finds',
    body: 'Notes on tools, interesting links, and the occasional thing I think is genuinely worth your time.',
  },
  {
    title: 'Build notes',
    meta: 'Process without the fluff',
    body: 'Short updates on what changed, what worked, and what I want to improve next.',
  },
]

const recipes = [
  {
    title: 'Family favorites',
    meta: 'The recipes that keep getting made',
    body: 'A small, durable collection of the meals and desserts that actually stick around.',
  },
  {
    title: 'Nan’s classics',
    meta: 'The reason this exists',
    body: 'The recipes worth preserving, sharing, and making easy to come back to.',
  },
  {
    title: 'Recipe box',
    meta: 'Organized and easy to grow',
    body: 'A simple home for the staples, experiments, and future additions.',
  },
]

const contactLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/beckcherry' },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCPQhzI658eyysG0UwP9Onlg?view_as=subscriber',
  },
]

const pages = {
  home: 'home',
  who: 'who',
  recipes: 'recipes',
  blog: 'blog',
  contact: 'contact',
}

function App() {
  const initialPage = useMemo(() => {
    const hash = window.location.hash.replace('#', '')
    return Object.values(pages).includes(hash) ? hash : pages.home
  }, [])

  const [page, setPage] = useState(initialPage)

  const navigate = (nextPage) => {
    setPage(nextPage)
    window.history.replaceState(null, '', nextPage === pages.home ? '#top' : `#${nextPage}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand brand-button" onClick={() => navigate(pages.home)}>
          Beck Cherry
        </button>

        <nav className="nav">
          <button onClick={() => navigate(pages.who)}>Who I am</button>
          <button onClick={() => navigate(pages.recipes)}>Nan&apos;s Recipes</button>
          <button onClick={() => navigate(pages.blog)}>Blog</button>
          <button onClick={() => navigate(pages.contact)}>Contact</button>
        </nav>
      </header>

      <main id="top">
        {page === pages.home && <HomePage navigate={navigate} />}
        {page === pages.who && <WhoPage />}
        {page === pages.recipes && <RecipesPage />}
        {page === pages.blog && <BlogPage />}
        {page === pages.contact && <ContactPage />}
      </main>
    </div>
  )
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Beck Cherry</p>
          <h1>Personal. Creative. Actually mine.</h1>
          <p className="hero-text">
            A home for my work, writing, recipes, and the parts of the internet I want to keep close.
          </p>

          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigate(pages.who)}>
              Who I am
            </button>
            <button className="button button-secondary" onClick={() => navigate(pages.blog)}>
              Read the blog
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-card visual-card-large">
            <span>WHO I AM</span>
          </div>
          <div className="visual-grid">
            <div className="visual-card"><span>RECIPES</span></div>
            <div className="visual-card"><span>BLOG</span></div>
            <div className="visual-card"><span>YOUTUBE</span></div>
            <div className="visual-card"><span>CONTACT</span></div>
          </div>
        </div>
      </section>

      <section className="section quick-grid-section">
        <div className="tile-grid">
          <button className="content-card tile-card tile-button" onClick={() => navigate(pages.who)}>
            <strong>Who I am</strong>
            <span>Builder, experimenter, internet person.</span>
            <span className="text-link">Open</span>
          </button>
          <button className="content-card tile-card tile-button" onClick={() => navigate(pages.recipes)}>
            <strong>Nan&apos;s Recipes</strong>
            <span>Warm, simple, worth keeping.</span>
            <span className="text-link">Open</span>
          </button>
          <button className="content-card tile-card tile-button" onClick={() => navigate(pages.blog)}>
            <strong>Blog</strong>
            <span>Updates, ideas, and useful things.</span>
            <span className="text-link">Open</span>
          </button>
          <button className="content-card tile-card tile-button" onClick={() => navigate(pages.contact)}>
            <strong>Contact</strong>
            <span>LinkedIn, YouTube, and the direct paths.</span>
            <span className="text-link">Open</span>
          </button>
        </div>
      </section>
    </>
  )
}

function WhoPage() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <p className="eyebrow">Who I am</p>
        <h2>Builder, experimenter, internet person.</h2>
      </div>

      <div className="content-card content-card-wide">
        <p>
          I like useful things, interesting ideas, and making the internet feel a little more human.
        </p>
        <p>
          My work tends to live somewhere between product, creativity, and curiosity. I like making things that are clear, memorable, and worth coming back to.
        </p>
      </div>

      <p className="credit-note">Built with ECHO.</p>
    </section>
  )
}

function RecipesPage() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <p className="eyebrow">Nan&apos;s Recipes</p>
        <h2>Warm, simple, worth keeping.</h2>
      </div>

      <div className="tile-grid">
        {recipes.map((recipe) => (
          <article key={recipe.title} className="content-card tile-card">
            <strong>{recipe.title}</strong>
            <span>{recipe.meta}</span>
            <p>{recipe.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function BlogPage() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <p className="eyebrow">Blog</p>
        <h2>Updates, thoughts, and useful things.</h2>
      </div>

      <div className="tile-grid">
        {blogPosts.map((post) => (
          <article key={post.title} className="content-card tile-card">
            <strong>{post.title}</strong>
            <span>{post.meta}</span>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="section page-section footer-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Find me here.</h2>
      </div>

      <div className="contact-row">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            className="button button-secondary"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default App
