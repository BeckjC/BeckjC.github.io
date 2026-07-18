import { useEffect, useRef, useState } from 'react'

const heroPills = [
  'simple static sites',
  '$10 build',
  '$10/mo maintenance',
  'you own the files',
  'free hosting path',
  'good-lookin’ by default',
]

const heroPricing = [
  { label: 'Build', value: '$10 one time' },
  { label: 'Maintenance', value: '$10/mo if you want it' },
  { label: 'Ownership', value: 'You host it. You keep it.' },
]

const steps = [
  {
    number: '01',
    title: 'You provide information, preferences, and $10.',
    body: 'Send the basics, tell us what you like, and point us at anything you want us to reference.',
  },
  {
    number: '02',
    title: 'Echo and I AI up a static site to your liking.',
    body: 'We turn your direction into a simple, good-lookin’ static site that feels like you.',
  },
  {
    number: '03',
    title: 'We send you your files and free-hosting instructions.',
    body: 'That includes the site files, a free hosting path, and clear directions for pointing your domain at the new site.',
  },
  {
    number: '04',
    title: 'You pay $10/mo for maintenance and updates.',
    body: 'If you cancel (and you shouldn’t), the site is still yours. You host it, you keep the files, and you stay in full control.',
  },
]

export default function ServicesPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [railMode, setRailMode] = useState('static')
  const [railStyle, setRailStyle] = useState({})
  const stepRefs = useRef([])
  const columnsRef = useRef(null)
  const railSlotRef = useRef(null)
  const railRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveStep(Number(visibleEntries[0].target.dataset.stepIndex || 0))
        }
      },
      {
        rootMargin: '-18% 0px -42% 0px',
        threshold: [0.25, 0.5, 0.75],
      },
    )

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateRailPosition = () => {
      const columns = columnsRef.current
      const railSlot = railSlotRef.current
      const rail = railRef.current

      if (!columns || !railSlot || !rail) return

      if (window.innerWidth <= 720) {
        setRailMode('static')
        setRailStyle({})
        return
      }

      const offset = Math.max(32, Math.round(window.innerHeight * 0.24))
      const columnsRect = columns.getBoundingClientRect()
      const slotRect = railSlot.getBoundingClientRect()
      const railHeight = rail.offsetHeight
      const columnsTop = window.scrollY + columnsRect.top
      const columnsBottom = columnsTop + columns.offsetHeight
      const start = columnsTop - offset
      const end = columnsBottom - railHeight - offset

      if (window.scrollY <= start) {
        setRailMode('static')
        setRailStyle({})
        return
      }

      if (window.scrollY >= end) {
        setRailMode('bottom')
        setRailStyle({})
        return
      }

      setRailMode('fixed')
      setRailStyle({
        top: `${offset}px`,
        left: `${slotRect.left}px`,
        width: `${slotRect.width}px`,
      })
    }

    updateRailPosition()
    window.addEventListener('scroll', updateRailPosition, { passive: true })
    window.addEventListener('resize', updateRailPosition)

    return () => {
      window.removeEventListener('scroll', updateRailPosition)
      window.removeEventListener('resize', updateRailPosition)
    }
  }, [])

  return (
    <section className="section page-section services-shell">
      <section className="services-hero" aria-labelledby="sites-hero-title">
        <div className="services-hero-marquee services-hero-marquee-full" aria-hidden="true">
          <div className="services-hero-marquee-track">
            {[...heroPills, ...heroPills].map((pill, index) => (
              <span key={`${pill}-${index}`} className="services-hero-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="services-hero-layout">
          <div className="services-hero-copy">
            <p className="services-kicker">Sites</p>
            <h1 id="sites-hero-title" className="services-hero-title">$10 Websites</h1>
            <p className="services-hero-lead">
              Good-lookin’ simple sites for people and small businesses that should already have a
              real corner of the internet.
            </p>
            <p className="services-hero-support">
              Echo and I will build your site for a really good deal because I hate when people
              overpay for web services, have ugly sites, or — worse — have no website at all.
              Every person and business should have a site that feels sharp, clear, and legit.
            </p>

            <div className="services-hero-pricing" aria-label="Offer details">
              {heroPricing.map((item) => (
                <article key={item.label} className="services-price-chip">
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="services-hero-actions">
              <a className="button button-accent" href="/sign-me-up">Sign me up!</a>
            </div>
          </div>
        </div>
      </section>

      <section className="services-workflow" aria-labelledby="services-how-it-works-title">
        <div className="services-workflow-heading">
          <p className="services-kicker">How it works</p>
          <h2 id="services-how-it-works-title">A tiny deal, start to finish.</h2>
        </div>

        <div ref={columnsRef} className="services-workflow-columns">
          <div ref={railSlotRef} className="services-rail-slot">
            <div
              ref={railRef}
              className={`services-rail services-rail-${railMode}`}
              style={railStyle}
            >
              <ol className="services-step-nav">
                {steps.map((step, index) => {
                  const isActive = index === activeStep

                  return (
                    <li key={step.number} className={isActive ? 'services-step-nav-item is-active' : 'services-step-nav-item'}>
                      <span className="services-step-number">{step.number}</span>
                      <p className="services-step-title">{step.title}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          <div className="services-scroll-list">
            {steps.map((step, index) => {
              const isActive = index === activeStep

              return (
                <article
                  key={step.number}
                  ref={(node) => {
                    stepRefs.current[index] = node
                  }}
                  data-step-index={index}
                  className={isActive ? 'services-step-card is-active' : 'services-step-card'}
                >
                  <div className="services-step-card-copy">
                    <span className="services-step-card-number">{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                </article>
              )
            })}

            <div className="services-workflow-cta">
              <a className="button button-accent" href="/sign-me-up">Okay, make me look legit</a>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
