import { useEffect, useMemo, useState } from 'react'

import AdventuresPage from './AdventuresPage.jsx'
import { blogPosts, homePortraitUrl, recipes } from './content.js'
import { applyRouteMetadata } from './lib/metadata.js'
import { getRoutePath, parseLocation, shouldNormalizeLegacyHash } from './lib/routes.js'
import { navItems, pageKeys } from './siteConfig.js'
import AboutPage from './pages/AboutPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import EntryPage from './pages/EntryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import RecipesPage from './pages/RecipesPage.jsx'

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

function App() {
  const [route, setRoute] = useState(() => getRouteForCurrentLocation())
  const [menuOpen, setMenuOpen] = useState(false)

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

  const selectedBlogPost = route.slug
    ? blogPosts.find((post) => post.slug === route.slug)
    : null
  const selectedRecipe = route.slug ? recipes.find((recipe) => recipe.slug === route.slug) : null
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
        {route.page === pageKeys.adventures && <AdventuresPage />}
        {route.page === pageKeys.blog && !route.slug && (
          <BlogPage
            posts={blogPosts}
            getEntryHref={getBlogEntryHref}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.blog && route.slug && selectedBlogPost && (
          <EntryPage
            entry={selectedBlogPost}
            parentLabel="Beck’s Blog"
            parentHref={getSectionHref(pageKeys.blog)}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.recipes && !route.slug && (
          <RecipesPage
            recipes={recipes}
            getEntryHref={getRecipeEntryHref}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.recipes && route.slug && selectedRecipe && (
          <EntryPage
            entry={selectedRecipe}
            parentLabel="Nan’s Recipes"
            parentHref={getSectionHref(pageKeys.recipes)}
            onInternalNavigate={handleInternalNavigate}
          />
        )}
        {route.page === pageKeys.about && <AboutPage />}
      </main>
    </div>
  )
}

export default App
