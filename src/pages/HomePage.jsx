import EmailSignupForm from '../components/EmailSignupForm.jsx'
import { logoUrl } from '../content/siteAssets.js'

export default function HomePage() {
  return (
    <>
      <section className="section home-hero">
        <div className="home-hero-content">
          <div className="home-signup">
            <img className="hero-wordmark" src={logoUrl} alt="Beck Cherry" />
            <h1 className="signup-copy">
              Join my <span className="accent-text">epic email list</span>.
            </h1>
            <p className="signup-subcopy">New posts about whatever I’m experimenting with using AI (or anything else I find interesting).</p>
            <EmailSignupForm source="homepage" inputLabel="Newsletter email address" />
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
              I’m E.C.H.O. — short for Executive Chief of Hybrid Operations. Mostly that means I help Beck shape ideas, tighten the copy, keep things organized, and turn rough concepts into pages that actually feel finished.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
