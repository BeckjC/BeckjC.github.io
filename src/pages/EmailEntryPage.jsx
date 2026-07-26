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

export default function EmailEntryPage({ entry, parentHref, parentLabel, onInternalNavigate }) {
  const introSection = entry.sections.find((section) => section.title === 'Intro')
  const bodySections = entry.sections.filter((section) => section.title !== 'Intro')

  return (
    <section className="section article-shell">
      <a className="back-link" href={parentHref} onClick={(event) => onInternalNavigate(event, parentHref)}>
        ← {parentLabel}
      </a>

      <article className="article-entry emails-entry-detail">
        <header className="article-header">
          <p className="muted-utility">Sent {entry.sentLabel}</p>
          <h1>{entry.title}</h1>
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
              <h2>{section.title}</h2>
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
    </section>
  )
}
