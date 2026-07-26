import { emailArchiveEntries } from '../content/emailArchive.js'
import EmailSignupForm from '../components/EmailSignupForm.jsx'

function formatSentDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderParagraphHtml(paragraph) {
  return escapeHtml(paragraph)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
}

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

      <div className="emails-list">
        {emailArchiveEntries.map((entry) => {
          const introSection = entry.sections.find((section) => section.title === 'Intro')
          const bodySections = entry.sections.filter((section) => section.title !== 'Intro')

          return (
            <article key={entry.slug} className="article-entry emails-entry motion-card">
              <header className="article-header emails-entry-header">
                <p className="muted-utility">Sent {formatSentDate(entry.sent)}</p>
                <h2>{entry.title}</h2>
                {entry.preview && entry.preview !== entry.title ? (
                  <p className="emails-entry-preview">{entry.preview}</p>
                ) : null}
              </header>

              <div className="article-body emails-entry-body">
                {introSection?.paragraphs.map((paragraph, index) => (
                  <p
                    key={`intro-${entry.slug}-${index}`}
                    className="emails-entry-intro"
                    dangerouslySetInnerHTML={{ __html: renderParagraphHtml(paragraph) }}
                  />
                ))}

                {bodySections.map((section) => (
                  <section key={`${entry.slug}-${section.title}`} className="emails-entry-section">
                    <h3>{section.title}</h3>
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={`${entry.slug}-${section.title}-${index}`}
                        dangerouslySetInnerHTML={{ __html: renderParagraphHtml(paragraph) }}
                      />
                    ))}
                  </section>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
