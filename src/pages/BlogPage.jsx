export default function BlogPage({ posts, getEntryHref, onInternalNavigate }) {
  return (
    <section className="section page-section page-motion-shell">
      <div className="section-heading page-motion-intro">
        <h1>Beck’s Blog</h1>
      </div>

      <div className="list-grid blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="entry-card text-entry motion-card">
            <div className="entry-copy">
              {post.displayDate && (
                <p className="entry-date">
                  <time dateTime={post.date}>{post.displayDate}</time>
                </p>
              )}
              <h2>
                <a
                  className="title-link"
                  href={getEntryHref(post.slug)}
                  onClick={(event) => onInternalNavigate(event, getEntryHref(post.slug))}
                >
                  {post.title}
                </a>
              </h2>
              <p>{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
