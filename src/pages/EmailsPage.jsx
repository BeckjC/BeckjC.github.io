export default function EmailsPage({ emails, getEntryHref, onInternalNavigate }) {
  return (
    <section className="section page-section page-motion-shell">
      <div className="section-heading page-motion-intro">
        <h1>Emails</h1>
        <p>An archive of the emails I’ve sent.</p>
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
