import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'

import { homePortraitUrl } from './content/siteAssets.js'
import { applyRouteMetadata } from './lib/metadata.js'
import { getRoutePath, parseLocation, shouldNormalizeLegacyHash } from './lib/routes.js'
import { navItems, pageKeys } from './siteConfig.js'
import AboutPage from './pages/AboutPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import EntryPage from './pages/EntryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import RecipesPage from './pages/RecipesPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'

const AdventuresPage = lazy(() => import('./AdventuresPage.jsx'))

function canHandleClientNavigation(event) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
}

function createRouteState(nextRoute) {
  return {
    ...nextRoute,
    canonicalPath: getRoutePath(nextRoute),
  }
}

function getRouteForCurrentLocation() {
  return createRouteState(parseLocation(window.location))
}

function LoadingPage() {
  return <section className="section page-section" aria-live="polite" />
}

function App() {
  const [route, setRoute] = useState(() => getRouteForCurrentLocation())
  const [menuOpen, setMenuOpen] = useState(false)
  const [contentData, setContentData] = useState({ blogPosts: [], recipes: [], loaded: false })
  const contentImportRef = useRef(null)

  const loadContentData = async () => {
    if (!contentImportRef.current) {
      contentImportRef.current = import('./content/contentData.js').then((module) => {
        const nextData = {
          blogPosts: module.blogPosts,
          recipes: module.recipes,
          loaded: true,
        }
        setContentData(nextData)
        return nextData
      })
    }

    return contentImportRef.current
  }

  useEffect(() => {
    if (shouldNormalizeLegacyHash(window.location)) {
      const normalizedRoute = getRouteForCurrentLocation()
      window.history.replaceState({}, '', normalizedRoute.canonicalPath)
      setRoute(normalizedRoute)
    }

    const handleLocationChange = () => {
      setRoute(getRouteForCurrentLocation())
      setMenuOpen(false)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  useEffect(() => {
    const needsContentData = route.page === pageKeys.blog || route.page === pageKeys.recipes

    if (needsContentData && !contentData.loaded) {
      loadContentData()
    }
  }, [contentData.loaded, route.page])

  useEffect(() => {
    const preload = () => {
      void loadContentData()
      void import('./AdventuresPage.jsx')
    }

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(preload, { timeout: 1500 })
      return () => window.cancelIdleCallback?.(idleId)
    }

    const timeoutId = window.setTimeout(preload, 600)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const selectedBlogPost = route.slug
    ? contentData.blogPosts.find((post) => post.slug === route.slug)
    : null
  const selectedRecipe = route.slug
    ? contentData.recipes.find((recipe) => recipe.slug === route.slug)
    : null
  const selectedEntry = selectedBlogPost || selectedRecipe || null

  useEffect(() => {
    applyRouteMetadata(route, selectedEntry)
  }, [route, selectedEntry])

  const activePage = useMemo(() => {
    if (route.page === pageKeys.blog && route.slug) return pageKeys.blog
    if (route.page === pageKeys.recipes && route.slug) return pageKeys.recipes
    return route.page
  }, [route])

  const navigateToRoute = (nextRoute, { replace = false } = {}) => {
    const nextState = createRouteState(nextRoute)
    const method = replace ? 'replaceState' : 'pushState'

    window.history[method]({}, '', nextState.canonicalPath)
    setRoute(nextState)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const handleInternalNavigate = (event, href) => {
    if (!canHandleClientNavigation(event)) {
      return
    }

    const nextUrl = new URL(href, window.location.origin)

    if (nextUrl.origin !== window.location.origin) {
      return
    }

    event.preventDefault()
    navigateToRoute(parseLocation(nextUrl))
  }

  const getSectionHref = (page) => getRoutePath({ page })
  const getBlogEntryHref = (slug) => getRoutePath({ page: pageKeys.blog, slug })
  const getRecipeEntryHref = (slug) => getRoutePath({ page: pageKeys.recipes, slug })

  return (
    <div className="site-shell">
      <header className="topbar">
        <a
          className="brand brand-button"
          href={getSectionHref(pageKeys.home)}
          onClick={(event) => handleInternalNavigate(event, getSectionHref(pageKeys.home))}
          aria-label="Go to homepage"
        >
          <img className="nav-logo" src={homePortraitUrl} alt="Beck Cherry" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>

        <nav id="site-nav" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Primary">
          {navItems.map((item) => {
            const href = getSectionHref(item.key)

            return (
              <a
                key={item.key}
                className={activePage === item.key ? 'nav-link nav-link-active' : 'nav-link'}
                href={href}
                onClick={(event) => handleInternalNavigate(event, href)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </header>

      <main id="top">
        {route.page === pageKeys.home && <HomePage />}
        {route.page === pageKeys.services && <ServicesPage />}
        {route.page === pageKeys.adventures && (
          <Suspense fallback={<LoadingPage />}>
            <AdventuresPage />
          </Suspense>
        )}
        {route.page === pageKeys.blog && !route.slug && contentData.loaded && (
          <BlogPage
            posts={contentData.blogPosts}
            getEntryHref={getBlogEntryHref}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.blog && !route.slug && !contentData.loaded && <LoadingPage />}
        {route.page === pageKeys.blog && route.slug && selectedBlogPost && (
          <EntryPage
            entry={selectedBlogPost}
            parentLabel="Beck’s Blog"
            parentHref={getSectionHref(pageKeys.blog)}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.blog && route.slug && !selectedBlogPost && <LoadingPage />}
        {route.page === pageKeys.recipes && !route.slug && contentData.loaded && (
          <RecipesPage
            recipes={contentData.recipes}
            getEntryHref={getRecipeEntryHref}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.recipes && !route.slug && !contentData.loaded && <LoadingPage />}
        {route.page === pageKeys.recipes && route.slug && selectedRecipe && (
          <EntryPage
            entry={selectedRecipe}
            parentLabel="Nan’s Recipes"
            parentHref={getSectionHref(pageKeys.recipes)}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.recipes && route.slug && !selectedRecipe && <LoadingPage />}
        {route.page === pageKeys.about && <AboutPage />}
      </main>
    </div>
  )
}

export default App
