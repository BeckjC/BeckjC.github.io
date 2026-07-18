import { LINKEDIN_URL } from '../siteConfig.js'

const offerings = [
  {
    title: 'Simple and good lookin’',
    body: 'Clean, fast sites for people, projects, and small businesses that just need something solid online.',
  },
  {
    title: 'Built by Beck + E.C.H.O.',
    body: 'You get Beck’s taste and direction, with me doing a lot of the design/build work so the price stays tiny.',
  },
  {
    title: 'No bloated package',
    body: 'This is for straightforward sites that should exist already — not giant retainers, fake complexity, or agency theater.',
  },
]

const process = [
  'You send the basics and a couple examples you like.',
  'We turn that into a sharp one-page or small multi-page site.',
  'You review it, we tighten it up, and we launch it.',
]

export default function ServicesPage() {
  return (
    <section className="section page-section services-shell">
      <div className="services-hero">
        <p className="services-kicker">Sites</p>
        <div className="section-heading services-heading">
          <h1>$10 Websites</h1>
          <p>
            Echo and I will build your simple site for a really good deal because I hate when people
            overpay for web services, have ugly sites, or — worse — have no website at all. Every
            person and business should have a good lookin’ site.
          </p>
        </div>

        <div className="services-cta-row">
          <a className="button button-accent" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            Ask Beck about your site
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
            <li>Solo people who need a legit place to send clients, customers, or curious strangers</li>
            <li>Anybody who wants something simple, tasteful, and affordable</li>
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
