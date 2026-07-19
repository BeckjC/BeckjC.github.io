import { LINKEDIN_URL, YOUTUBE_URL } from '../siteConfig.js'

export default function AboutPage() {
  return (
    <section className="section page-section contact-shell page-motion-shell">
      <div className="section-heading page-motion-intro">
        <h1>About me</h1>
        <p>A little about me, plus the corners of the internet I actually use.</p>
      </div>

      <div className="contact-row motion-button-row">
        <a className="button motion-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer">
          YouTube
        </a>
        <a className="button motion-button" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
