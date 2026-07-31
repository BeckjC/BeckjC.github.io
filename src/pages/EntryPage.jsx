export default function EntryPage({ entry, parentHref, parentLabel, onInternalNavigate }) {
  return (
    <section className="section article-shell">
      <a className="back-link" href={parentHref} onClick={(event) => onInternalNavigate(event, parentHref)}>
        ← {parentLabel}
      </a>

      <article className="article-entry">
        <header className="article-header">
          {entry.kind === 'blog' && entry.displayDate && (
            <p className="article-date">
              <time dateTime={entry.date}>Published {entry.displayDate}</time>
            </p>
          )}
          <h1>{entry.title}</h1>
        </header>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: entry.body }} />
      </article>
    </section>
  )
}
