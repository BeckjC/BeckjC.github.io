import { legacyHashAliases, pageKeys, siteSections } from '../siteConfig.js'

const sectionPathMap = new Map(siteSections.map((section) => [section.key, section.path]))

function normalizePageKey(rawPage) {
  if (!rawPage) return pageKeys.home
  return legacyHashAliases[rawPage] || rawPage
}

export function getRoutePath(route) {
  const page = normalizePageKey(route?.page)

  if (page === pageKeys.blog && route?.slug) {
    return `/becks-blog/${route.slug}`
  }

  if (page === pageKeys.recipes && route?.slug) {
    return `/nans-recipes/${route.slug}`
  }

  if (page === pageKeys.emails && route?.slug) {
    return `/emails/${route.slug}`
  }

  return sectionPathMap.get(page) || '/'
}

export function getLegacyHash(route) {
  const page = normalizePageKey(route?.page)

  if (page === pageKeys.home) return '#top'
  if (page === pageKeys.about) return '#contact'
  if ((page === pageKeys.blog || page === pageKeys.recipes || page === pageKeys.emails) && route?.slug) {
    return `#${page}/${route.slug}`
  }

  return `#${page}`
}

function parseHash(hash) {
  const value = hash.replace(/^#/, '')
  const [rawPage, slug] = value.split('/')
  const page = normalizePageKey(rawPage)

  if (!value || page === pageKeys.home) {
    return { page: pageKeys.home, source: 'hash' }
  }

  if ((page === pageKeys.blog || page === pageKeys.recipes || page === pageKeys.emails) && slug) {
    return { page, slug, source: 'hash' }
  }

  if (sectionPathMap.has(page)) {
    return { page, source: 'hash' }
  }

  return null
}

function parsePathname(pathname) {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)

  if (segments.length === 0) {
    return { page: pageKeys.home, source: 'path' }
  }

  const [page, slug] = segments

  if ((page === pageKeys.blog || page === pageKeys.recipes || page === pageKeys.emails) && slug) {
    return { page, slug, source: 'path' }
  }

  if (sectionPathMap.has(page)) {
    return { page, source: 'path' }
  }

  return { page: pageKeys.home, source: 'path', notFound: true }
}

export function parseLocation(locationLike) {
  const hashRoute = locationLike.hash ? parseHash(locationLike.hash) : null

  if (hashRoute) {
    return hashRoute
  }

  return parsePathname(locationLike.pathname || '/')
}

export function getCanonicalUrl(route, siteUrl) {
  return `${siteUrl}${getRoutePath(route)}`
}

export function shouldNormalizeLegacyHash(locationLike) {
  return Boolean(locationLike.hash && parseHash(locationLike.hash))
}
