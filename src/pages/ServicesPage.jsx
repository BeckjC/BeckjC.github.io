import { LINKEDIN_URL } from '../siteConfig.js'

const offerings = [
  {
    title: 'Simple sites that look legit',
    body: 'Clean, fast brochure-style websites for solo operators, local businesses, and people who need a real web presence without a giant process.',
  },
  {
    title: 'Built by Beck + E.C.H.O.',
    body: 'You get Beck’s taste, direction, and stubbornness about quality, plus E.C.H.O. handling much of the design/build work so the price stays sane.',
  },
  {
    title: 'No bloated agency package',
    body: 'This is for straightforward sites, not enterprise nonsense. The point is to help good small businesses stop overpaying, shipping ugly sites, or having no site at all.',
  },
]

const process = [
  'You send the basics: what you do, what you want people to feel, and a few examples you like.',
  'We turn that into a sharp single-page or small multi-page site with strong mobile design and clear copy.',
  'You review, we tighten it up, and we launch something you’re actually proud to send people to.',
]

export default function ServicesPage() {
  return (
    <section className="section page-section services-shell">
      <div className="services-hero">
        <p className="services-kicker">Web design services</p>
        <div className="section-heading services-heading">
          <h1>Good websites for small businesses that should not be getting ripped off.</h1>
          <p>
            Beck hates when someone pays too much for a bad website — or worse, has no website at all.
            So this offer is simple: thoughtful, custom, lightweight sites at a very fair price, with
            E.C.H.O. doing a lot of the building behind the scenes.
          </p>
        </div>

        <div className="services-cta-row">
          <a className="button button-accent" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            Ask Beck on LinkedIn
          </a>
          <a className="button" href="/about-me">
            See who you’d be working with
          </a>
        </div>
      </div>

      <div className="services-grid">
        {offerings.map((item) => (
          <article key={item.title} className="services-card">
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="services-detail-grid">
        <section className="services-panel">
          <h2>Best fit</h2>
          <ul>
            <li>Local businesses that need a clean, trustworthy online home</li>
            <li>Solo operators who want something better than a generic template</li>
            <li>People who value taste, speed, and clarity over meetings and fluff</li>
          </ul>
        </section>

        <section className="services-panel">
          <h2>How it works</h2>
          <ol>
            {process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  )
}
