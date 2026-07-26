import { useRef, useState } from 'react'

export default function EmailEntryPage({ entry, parentHref, parentLabel, onInternalNavigate }) {
  const frameRef = useRef(null)
  const [frameHeight, setFrameHeight] = useState(1400)

  const syncHeight = () => {
    const frame = frameRef.current
    const doc = frame?.contentDocument

    if (!doc) return

    const nextHeight = Math.max(
      doc.body?.scrollHeight || 0,
      doc.documentElement?.scrollHeight || 0,
      900,
    )

    setFrameHeight(nextHeight)
  }

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

        <div className="email-html-shell">
          <iframe
            ref={frameRef}
            title={entry.title}
            srcDoc={entry.originalHtml}
            className="email-html-frame"
            style={{ height: `${frameHeight}px` }}
            onLoad={() => {
              syncHeight()
              window.setTimeout(syncHeight, 60)
            }}
          />
        </div>
      </article>
    </section>
  )
}
