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
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/1743257291446-L3O8ROPKWLSDZQ8AFS24/IMG_3823.jpeg?format=1500w',
  },
  {
    title: 'How I Keep Myself On-Task',
    date: '8/26/24',
    href: 'https://www.beckcherry.com/becks-blog/keeping-myself-on-task',
    excerpt:
      'I’m thinking of this because my 24th birthday is tomorrow, and the only thing I really want is more time.',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/1724034889373-OAUY7HEAU2SEDWR2U79J/Icon+2024_01_23.png?format=1500w',
  },
  {
    title: 'Don’t be a little bitch.',
    date: '8/18/24',
    href: 'https://www.beckcherry.com/becks-blog/dont-be-a-little-bitch',
    excerpt:
      'Imagine training your whole life, every second, to prepare for three hours of opportunity.',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/1724034889373-OAUY7HEAU2SEDWR2U79J/Icon+2024_01_23.png?format=1500w',
  },
]

const recipes = [
  {
    title: 'Cheesecake',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/yngm0r7fef27lotte0athejyz3hfmn',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/2f7847aa-329c-4dc5-b084-76e83ed7c156/IMG_5207.jpg?format=1000w',
  },
  {
    title: 'Sauerbraten',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/m0fmw7fjs8l76uc0gtkqlntp2nxmqf',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/84c3b36e-8055-4d5a-b92b-6c378e783da0/IMG_5205.jpeg?format=1000w',
  },
  {
    title: 'Potato Pancakes with Applesauce',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/6xlz5bbxmtqslqg4xzcpc7fnwew1ak',
    excerpt:
      'Pa would blend everything together, then add chopped potatoes and blend coarsely with everything else in the blender',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/064024b1-df77-46a7-b150-3c489b33b76e/IMG_5204.jpg?format=1000w',
  },
  {
    title: 'Stollen',
    date: '3/16/24',
    href: 'https://www.beckcherry.com/nans-recipes/um46b4mn4xdifp5pg8yijjbm76mjki',
    excerpt: 'Pa’s Christmas classic He used Nan’s candied tangerine peel',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/abe43e3f-43e8-4356-9c07-a0b7bb176524/IMG_5203.jpg?format=1000w',
  },
  {
    title: 'Calabacitas',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/rqw8pu54i07mgnox41fapw7m3tx7y3',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/5608fea3-2c53-4dc6-968d-641ed6efa384/IMG_5201.jpg?format=1000w',
  },
  {
    title: 'Mushroom Salad Dressing',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/4ufbm1lhj5z94qq0iad31tgr9v4u03',
    excerpt: 'really good -Nan',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/c3447774-4a28-4e49-a230-19dbf41a1f1c/IMG_5200.jpg?format=1000w',
  },
  {
    title: 'Plumb Barbecue Sauce',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/hyjqiyljvxemc4mkij1ev71cl08mso',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/735f6993-38a4-4191-bbec-1be989cc04a5/IMG_5199.jpg?format=1000w',
  },
  {
    title: 'Watercress + Pear Salad',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/thmw92e5f0o2e5ubpnvgq47wx5hv60',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/487d7118-7498-4b04-8fd4-07e7043fa04c/IMG_5198.jpg?format=1000w',
  },
  {
    title: 'Candied Pecans',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/4fpz4ph7twthy5943jlp3tisv7dptk',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/c1ad49bf-c3ad-43a6-beb8-98a5da029129/IMG_5197.jpg?format=1000w',
  },
  {
    title: 'Persimmon + Walnut Salad with Blue Cheese Croutons',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/uv3kbu951k7yqn6b7kf9dldc5zom12',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/5f2017c0-d350-48c2-ac3b-48206d909119/IMG_5195.jpg?format=1000w',
  },
  {
    title: 'Nan’s EPIC Pickles',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/5h067u2ufyubvhycm7qy2s88zhvdqz',
    excerpt: 'This recipes was passed down from Nan’s grandmother to bless us with culinary delight.',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/2b44f173-a664-4097-ab4b-2b6f38ff6561/IMG_5193.jpg?format=1000w',
  },
  {
    title: 'Orange Liqueur',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/tggizz8spkfu727qcvid4opz8uqwnf',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/ad977436-76d8-468a-ba24-ebabf6b2b3b4/IMG_5192.jpg?format=1000w',
  },
  {
    title: 'Nan’s Lamb',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/t2kgtdw0g1ltrd0ohso7xkxn1113hc',
    excerpt:
      'This one is Bryce’s favorite. Ingredients lamb onion garam masala red wine (Charles Shaw is good)',
  },
  {
    title: 'Kahlua Cake',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/9sl1u1v1xouyhyixgj2tavjy2idhg7-8n7pd',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/54704b22-a3c4-46c2-b501-4d814e857881/IMG_5191.jpg?format=1000w',
  },
  {
    title: 'Gateau Rolla',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/9sl1u1v1xouyhyixgj2tavjy2idhg7',
    excerpt: '“Once I made this for Cassidy and Bryce, it was all over.” -Nan',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/5b2eb7f0-816c-43ee-aab2-472f9be8e236/IMG_5190.jpg?format=1000w',
  },
  {
    title: 'Chocolate Praline Layer Cake',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/zuqtd2z6987jzrr5qiudzsrznx2ruk',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/3eb73f38-0e4e-4e66-ac1e-166304eaf43a/IMG_5186.jpg?format=1000w',
  },
  {
    title: 'Mini Cornbread Muffins',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/mini-cornbread-muffins',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/33be23cc-aeae-4876-b948-b62c528743a5/IMG_5185.jpg?format=1000w',
  },
  {
    title: 'Cornmeal Buttermilk Waffles',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/cornmeal-buttermilk-waffles',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/da6cea9f-5308-49ed-a204-a36f36be2114/IMG_5184.jpg?format=1000w',
  },
  {
    title: 'New Orleans Fizz',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/new-orleans-fizz',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/6d933d0f-8ad4-4ccc-806c-8fcb22b6fc4d/IMG_5178.jpg?format=1000w',
  },
  {
    title: 'Irish Cream Liqueur',
    date: '3/15/24',
    href: 'https://www.beckcherry.com/nans-recipes/irish-cream-liqueur',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/778c066b-f3a9-4c59-93f2-eadde52ce31c/IMG_5177.jpg?format=1000w',
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
      <img className="hero-logo" src={logoUrl} alt="Beck Cherry" />

      <div className="feature-grid">
        <button className="feature-card" onClick={() => navigate(pages.blog)}>
          <img src={blogPosts[0].image} alt="" />
          <div>
            <p className="feature-label">Beck’s Blog</p>
            <h2>{blogPosts[0].title}</h2>
          </div>
        </button>

        <button className="feature-card" onClick={() => navigate(pages.recipes)}>
          <img src={recipes[0].image} alt="" />
          <div>
            <p className="feature-label">Nan’s Recipes</p>
            <h2>{recipes[0].title}</h2>
          </div>
        </button>
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

      <div className="list-grid blog-grid">
        {blogPosts.map((post) => (
          <article key={post.href} className="entry-card image-card">
            <img src={post.image} alt="" />
            <div className="entry-copy">
              <p className="meta-row">Beck Cherry · {post.date}</p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a className="text-link" href={post.href} target="_blank" rel="noreferrer">
                Read More
              </a>
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
          <article key={recipe.href} className="entry-card image-card">
            {recipe.image ? <img src={recipe.image} alt="" /> : null}
            <div className="entry-copy">
              <p className="meta-row">Beck Cherry · {recipe.date}</p>
              <h2>{recipe.title}</h2>
              {recipe.excerpt ? <p>{recipe.excerpt}</p> : null}
              <a className="text-link" href={recipe.href} target="_blank" rel="noreferrer">
                Read More
              </a>
            </div>
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
