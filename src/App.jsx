import { useMemo, useState } from 'react'

const logoUrl =
  'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/a0b2ba3b-4341-41c7-a7ad-d6cac44e9105/Watermark+2024_01_23.png'

const blogPosts = [
  {
    title: 'You’re already a leader.',
    date: '3/29/25',
    href: 'https://www.beckcherry.com/becks-blog/youre-already-a-leader',
    excerpt:
      'I knew they’d be watching as I rounded the corner, so I let out a cheer and pumped my bloody fist in the air.',
  },
  {
    title: 'How I Keep Myself On-Task',
    date: '8/26/24',
    href: 'https://www.beckcherry.com/becks-blog/keeping-myself-on-task',
    excerpt:
      'I’m thinking of this because my 24th birthday is tomorrow, and the only thing I really want is more time.',
  },
  {
    title: 'Don’t be a little bitch.',
    date: '8/18/24',
    href: 'https://www.beckcherry.com/becks-blog/dont-be-a-little-bitch',
    excerpt:
      'Imagine training your whole life, every second, to prepare for three hours of opportunity.',
  },
]

const recipes = [
  {
    title: 'Cheesecake',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/yngm0r7fef27lotte0athejyz3hfmn',
  },
  {
    title: 'Sauerbraten',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/m0fmw7fjs8l76uc0gtkqlntp2nxmqf',
  },
  {
    title: 'Potato Pancakes with Applesauce',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/6xlz5bbxmtqslqg4xzcpc7fnwew1ak',
    excerpt:
      'Pa would blend everything together, then add chopped potatoes and blend coarsely with everything else in the blender',
  },
  {
    title: 'Stollen',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/um46b4mn4xdifp5pg8yijjbm76mjki',
    excerpt: 'Pa’s Christmas classic He used Nan’s candied tangerine peel',
  },
  {
    title: 'Calabacitas',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/rqw8pu54i07mgnox41fapw7m3tx7y3',
  },
  {
    title: 'Mushroom Salad Dressing',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/4ufbm1lhj5z94qq0iad31tgr9v4u03',
    excerpt: 'really good -Nan',
  },
  {
    title: 'Plumb Barbecue Sauce',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/hyjqiyljvxemc4mkij1ev71cl08mso',
  },
  {
    title: 'Watercress + Pear Salad',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/thmw92e5f0o2e5ubpnvgq47wx5hv60',
  },
  {
    title: 'Candied Pecans',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/4fpz4ph7twthy5943jlp3tisv7dptk',
  },
  {
    title: 'Persimmon + Walnut Salad with Blue Cheese Croutons',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/uv3kbu951k7yqn6b7kf9dldc5zom12',
  },
  {
    title: 'Nan’s EPIC Pickles',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/5h067u2ufyubvhycm7qy2s88zhvdqz',
    excerpt: 'This recipes was passed down from Nan’s grandmother to bless us with culinary delight.',
  },
  {
    title: 'Orange Liqueur',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/tggizz8spkfu727qcvid4opz8uqwnf',
  },
]

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

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={page === item.key ? 'nav-link nav-link-active' : 'nav-link'}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main id="top">
        {page === pages.home && <HomePage navigate={navigate} />}
        {page === pages.blog && <BlogPage />}
        {page === pages.recipes && <RecipesPage />}
        {page === pages.contact && <ContactPage />}
      </main>
    </div>
  )
}

function HomePage({ navigate }) {
  return (
    <section className="section home-shell">
      <div className="home-card">
        <img className="hero-logo" src={logoUrl} alt="Beck Cherry" />

        <div className="menu-grid">
          {navItems.map((item) => (
            <button key={item.key} className="menu-card" onClick={() => navigate(item.key)}>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <h1>Beck’s Blog</h1>
      </div>

      <div className="list-grid">
        {blogPosts.map((post) => (
          <article key={post.href} className="content-card entry-card">
            <p className="meta-row">Beck Cherry · {post.date}</p>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <a className="text-link" href={post.href} target="_blank" rel="noreferrer">
              Read More
            </a>
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

      <div className="list-grid">
        {recipes.map((recipe) => (
          <article key={recipe.href} className="content-card entry-card">
            <p className="meta-row">Beck Cherry · {recipe.date}</p>
            <h2>{recipe.title}</h2>
            {recipe.excerpt ? <p>{recipe.excerpt}</p> : null}
            <a className="text-link" href={recipe.href} target="_blank" rel="noreferrer">
              Read More
            </a>
          </article>
        ))}
      </div>

      <a
        className="older-link"
        href="https://www.beckcherry.com/nans-recipes?offset=1710531421856"
        target="_blank"
        rel="noreferrer"
      >
        Older Posts
      </a>
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
        <a
          className="button button-secondary"
          href="https://www.youtube.com/channel/UCPQhzI658eyysG0UwP9Onlg?view_as=subscriber"
          target="_blank"
          rel="noreferrer"
        >
          YouTube
        </a>
      </div>
    </section>
  )
}

export default App
