import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, LINKEDIN_URL, pageKeys, SITE_NAME, SITE_URL, SOCIAL_IMAGE_URL, YOUTUBE_URL } from '../siteConfig.js'

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function trimDescription(text = '', maxLength = 160) {
  const clean = text.trim()
  if (!clean) return DEFAULT_DESCRIPTION
  if (clean.length <= maxLength) return clean
  return `${clean.slice(0, maxLength - 1).trim()}…`
}

export function getMetadataForRoute(route, entry) {
  const canonicalPath = route?.canonicalPath || '/'
  const canonicalUrl = `${SITE_URL}${canonicalPath}`

  const pageMetadata = {
    [pageKeys.home]: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      type: 'website',
    },
    [pageKeys.services]: {
      title: 'Sites',
      description: 'Simple, affordable websites from Beck and E.C.H.O. for people and small businesses that need a good-looking site without overpaying.',
      type: 'website',
    },
    [pageKeys.siteSignup]: {
      title: 'Sign me up!',
      description: 'Site intake form for Beck and E.C.H.O.’s simple website offer.',
      type: 'website',
    },
    [pageKeys.adventures]: {
      title: 'Beck’s Adventures — Beck Cherry',
      description: 'A zoomable world map of Beck Cherry’s adventures, routes, and places that matter.',
      type: 'website',
    },
    [pageKeys.blog]: {
      title: 'Beck’s Blog — Beck Cherry',
      description: 'Blog posts from Beck Cherry about experiments, AI, work, travel, and the things worth sharing.',
      type: 'website',
    },
    [pageKeys.recipes]: {
      title: 'Nan’s Recipes — Beck Cherry',
      description: 'A family recipe collection from Nan’s recipe drawer, preserved on beckcherry.com.',
      type: 'website',
    },
    [pageKeys.about]: {
      title: 'About me — Beck Cherry',
      description: 'A little about Beck Cherry, plus the corners of the internet he actually uses.',
      type: 'profile',
    },
  }

  if ((route?.page === pageKeys.blog || route?.page === pageKeys.recipes) && entry) {
    return {
      title: `${entry.title} — ${route.page === pageKeys.blog ? 'Beck’s Blog' : 'Nan’s Recipes'} | ${SITE_NAME}`,
      description: trimDescription(entry.excerpt || stripHtml(entry.body)),
      type: route.page === pageKeys.blog ? 'article' : 'article',
      canonicalUrl,
      image: entry.image || SOCIAL_IMAGE_URL,
    }
  }

  const metadata = pageMetadata[route?.page] || pageMetadata[pageKeys.home]

  return {
    ...metadata,
    canonicalUrl,
    image: SOCIAL_IMAGE_URL,
  }
}

export function buildStructuredData(route, entry) {
  const baseWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  }

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [LINKEDIN_URL, YOUTUBE_URL],
  }

  if (route?.page === pageKeys.blog && entry) {
    return [{
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: entry.title,
      description: trimDescription(entry.excerpt || stripHtml(entry.body)),
      image: entry.image || SOCIAL_IMAGE_URL,
      url: `${SITE_URL}${route.canonicalPath}`,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
      },
      mainEntityOfPage: `${SITE_URL}${route.canonicalPath}`,
      datePublished: entry.date,
    }, baseWebsite, person]
  }

  if (route?.page === pageKeys.recipes && entry) {
    return [{
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: entry.title,
      description: trimDescription(entry.excerpt || stripHtml(entry.body)),
      image: entry.image || SOCIAL_IMAGE_URL,
      url: `${SITE_URL}${route.canonicalPath}`,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
      },
    }, baseWebsite, person]
  }

  return [baseWebsite, person]
}

export function applyRouteMetadata(route, entry) {
  const metadata = getMetadataForRoute(route, entry)

  document.title = metadata.title

  const metaMap = {
    description: metadata.description,
    'og:type': metadata.type,
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:url': metadata.canonicalUrl,
    'og:image': metadata.image,
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    'twitter:image': metadata.image,
  }

  Object.entries(metaMap).forEach(([name, value]) => {
    const selector = name.startsWith('og:')
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`

    const element = document.head.querySelector(selector)
    if (element) {
      element.setAttribute('content', value)
    }
  })

  const canonicalLink = document.head.querySelector('link[rel="canonical"]')
  if (canonicalLink) {
    canonicalLink.setAttribute('href', metadata.canonicalUrl)
  }

  let structuredDataScript = document.getElementById('structured-data')
  if (!structuredDataScript) {
    structuredDataScript = document.createElement('script')
    structuredDataScript.id = 'structured-data'
    structuredDataScript.type = 'application/ld+json'
    document.head.appendChild(structuredDataScript)
  }

  structuredDataScript.textContent = JSON.stringify(buildStructuredData(route, entry))
}
