import { LINKEDIN_URL, YOUTUBE_URL } from '../siteConfig.js'

export default function AboutPage() {
  return (
    <section className="section page-section contact-shell">
      <div className="section-heading">
        <h1>About me</h1>
        <p>A little about me, plus the corners of the internet I actually use.</p>
      </div>

      <div className="contact-row">
        <a className="button" href={YOUTUBE_URL} target="_blank" rel="noreferrer">
          YouTube
        </a>
        <a className="button" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
