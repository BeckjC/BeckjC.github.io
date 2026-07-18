import { useState } from 'react'

export default function SitesSignupPage() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('The intake page is live. Next step is wiring this form to delivery.')
  }

  return (
    <section className="section page-section site-intake-shell">
      <div className="section-heading">
        <h1>Sign me up!</h1>
        <p>
          Tell Beck and E.C.H.O. what you need and what you like. This is the intake page for the
          $10 website offer.
        </p>
      </div>

      <form className="site-intake-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input type="text" name="name" placeholder="Your name" required />
        </label>

        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>

        <label>
          <span>What’s this site for?</span>
          <input type="text" name="purpose" placeholder="Business, personal brand, event, project..." required />
        </label>

        <label>
          <span>What do you want it to feel like?</span>
          <textarea name="style" rows="4" placeholder="Clean, playful, trustworthy, weird, minimal..." required />
        </label>

        <label>
          <span>Links or references</span>
          <textarea name="references" rows="4" placeholder="Drop any examples, current site links, or notes here." />
        </label>

        <button className="button button-accent" type="submit">Send my site intake</button>
        <p className="site-intake-status" aria-live="polite">{status}</p>
      </form>
    </section>
  )
}
