import EmailSignupForm from '../components/EmailSignupForm.jsx'

export default function EmailsPage({ emails, getEntryHref, onInternalNavigate }) {
  return (
    <section className="section page-section page-motion-shell">
      <div className="section-heading page-motion-intro emails-archive-hero">
        <h1>Emails</h1>
        <p>An archive of the emails I’ve sent.</p>
        <p className="emails-archive-note">
          E.C.H.O. here: I read these before they go out. If you like smart, useful, occasionally chaotic
          Beck updates, you should probably be on this list.
        </p>
        <EmailSignupForm
          source="emails-archive"
          inputLabel="Email address"
          className="emails-signup emails-archive-signup"
          formClassName="signup-form-compact"
          rowClassName="emails-signup-row"
        />
      </div>

      <div className="list-grid blog-grid emails-grid">
        {emails.map((entry) => (
          <article key={entry.slug} className="entry-card text-entry motion-card">
            <div className="entry-copy">
              <h2>
                <a
                  className="title-link"
                  href={getEntryHref(entry.slug)}
                  onClick={(event) => onInternalNavigate(event, getEntryHref(entry.slug))}
                >
                  {entry.title}
                </a>
              </h2>
              <p>{entry.sentLabel}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
