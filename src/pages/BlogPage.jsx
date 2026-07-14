export default function BlogPage({ posts, getEntryHref, onInternalNavigate }) {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <h1>Beck’s Blog</h1>
      </div>

      <div className="list-grid blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="entry-card text-entry">
            <div className="entry-copy">
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
