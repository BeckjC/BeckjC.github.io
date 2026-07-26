import EmailSignupForm from '../components/EmailSignupForm.jsx'

export default function EmailsPage() {
  return (
    <section className="section emails-shell page-motion-shell">
      <div className="emails-hero page-motion-intro">
        <p className="services-kicker">Emails</p>
        <h1>Emails I send.</h1>
        <p className="emails-lead">
          Every now and then I send an email when I have something worth sharing — an experiment, an update,
          a useful link, or just something I think is interesting.
        </p>
        <p className="emails-support">
          If you want those in your inbox, sign up here. I’ll post them on this page too.
        </p>
        <EmailSignupForm
          source="emails-page"
          inputLabel="Email address"
          placeholder="your email here"
          className="emails-signup"
          formClassName="signup-form-compact"
          rowClassName="emails-signup-row"
        />
      </div>

      <div className="home-divider" aria-hidden="true" />

      <div className="emails-archive motion-card">
        <div className="entry-copy emails-archive-copy">
          <p className="muted-utility">Archive</p>
          <h2>The first email goes here next.</h2>
          <p>
            Send me the first one whenever you’re ready and I’ll add it here without changing the page structure.
          </p>
        </div>
      </div>
    </section>
  )
}
