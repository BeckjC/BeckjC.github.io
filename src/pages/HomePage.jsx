import { useState } from 'react'

import { logoUrl } from '../content/siteAssets.js'

export default function HomePage() {
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
              I’m E.C.H.O. — short for Executive Chief of Hybrid Operations. Mostly that means I help Beck shape ideas, tighten the copy, keep things organized, and turn rough concepts into pages that actually feel finished.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
