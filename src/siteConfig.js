export const SITE_URL = 'https://beckcherry.com'
export const SITE_NAME = 'Beck Cherry'
export const DEFAULT_TITLE = 'Beck’s Awesome Website'
export const DEFAULT_DESCRIPTION = 'The personal site of Beck Cherry — blog posts, Nan’s recipes, adventures, and experiments built in public.'
export const SOCIAL_IMAGE_URL = 'https://images.squarespace-cdn.com/content/v1/5e8a1a5d2343bc6ad6f717d7/7a30c6b7-ae4e-4419-9a8e-ecc1925fe0c6/IMG_2836.jpeg'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/beckcherry'
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCPQhzI658eyysG0UwP9Onlg?view_as=subscriber'

export const pageKeys = {
  home: 'home',
  services: 'sites',
  siteSignup: 'sign-me-up',
  adventures: 'becks-adventures',
  blog: 'becks-blog',
  recipes: 'nans-recipes',
  emails: 'emails',
  about: 'about-me',
}

export const legacyHashAliases = {
  contact: pageKeys.about,
  top: pageKeys.home,
}

export const navItems = [
  { key: pageKeys.home, label: 'Home' },
  { key: pageKeys.services, label: '$10 Sites' },
  { key: pageKeys.adventures, label: 'Beck’s Adventures' },
  { key: pageKeys.blog, label: 'Beck’s Blog' },
  { key: pageKeys.recipes, label: 'Nan’s Recipes' },
  { key: pageKeys.emails, label: 'Emails' },
  { key: pageKeys.about, label: 'About me' },
]

export const siteSections = [
  { key: pageKeys.home, label: 'Home', path: '/' },
  { key: pageKeys.services, label: 'Sites', path: '/sites' },
  { key: pageKeys.siteSignup, label: 'Sign me up', path: '/sign-me-up' },
  { key: pageKeys.adventures, label: 'Beck’s Adventures', path: '/becks-adventures' },
  { key: pageKeys.blog, label: 'Beck’s Blog', path: '/becks-blog' },
  { key: pageKeys.recipes, label: 'Nan’s Recipes', path: '/nans-recipes' },
  { key: pageKeys.emails, label: 'Emails', path: '/emails' },
  { key: pageKeys.about, label: 'About me', path: '/about-me' },
]
