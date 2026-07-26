import EmailSignupForm from '../components/EmailSignupForm.jsx'

export default function NewslettersPage() {
  return (
    <section className="section newsletters-shell page-motion-shell">
      <div className="newsletters-hero page-motion-intro">
        <div className="newsletters-copy">
          <p className="services-kicker">Newsletter</p>
          <h1>Emails from Beck, in one place.</h1>
          <p className="newsletters-lead">
            Subscribe here for new notes, experiments, and whatever else Beck decides is worth sending.
          </p>
          <p className="newsletters-support">
            This page is also where the archive will live, so every newsletter has a home on beckcherry.com.
          </p>
        </div>

        <div className="newsletters-signup-card motion-card">
          <div className="newsletters-signup-card-inner">
            <p className="newsletters-card-label">Get the next one</p>
            <EmailSignupForm
              source="newsletters-page"
              inputLabel="Newsletter email address"
              placeholder="your email here"
              className="newsletters-signup"
              formClassName="signup-form-compact"
              rowClassName="signup-row-inline"
            />
          </div>
        </div>
      </div>

      <div className="newsletters-archive-block motion-card">
        <div className="entry-copy newsletters-archive-copy">
          <p className="muted-utility">Archive</p>
          <h2>First newsletter coming next.</h2>
          <p>
            The page shell is ready. Once you send over the first newsletter, I can drop it in here as the
            first published entry without changing the rest of the structure.
          </p>
        </div>
      </div>
    </section>
  )
}
