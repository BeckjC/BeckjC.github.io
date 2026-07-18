const steps = [
  'You provide information, preferences, and $10.',
  'Echo and I AI up a static site to your liking.',
  'We send you your site files and instructions on how to host it for free, including how to point your domain at your new site.',
  'You pay $10/mo for maintenance and monthly updates when you want them. If you cancel (and you shouldn’t), the site is still yours. You host it, and you’re in full control.',
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
      </div>

      <section className="services-panel services-how-it-works">
        <h2>How it works</h2>
        <ol>
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </section>
  )
}
