# PRD — React rebuild of beckcherry.com

## Outcome
- [x] Replace the old static prototype with a new React-based personal site in this repo
- [x] Use the current `beckcherry.com` content and the existing project folder content as source material
- [x] Ship a polished, responsive homepage that can become the replacement for the current Squarespace homepage

## Scope boundaries
- [x] In scope: React scaffold, homepage, navigation, blog/recipes/contact structure, responsive styling, metadata, build verification
- [x] In scope: preserve the `beckcherry.com` brand/domain direction and mirror the current live-site structure minus rejected pages
- [x] In scope: reuse existing copy from `beckcherry.com` rather than inventing new copy
- [x] Out of scope for this loop: final production deployment, DNS cutover, full migration of every Squarespace subpage, CMS/blog infrastructure

## Source context
- [x] Current live site has lightweight nav/content around Home, Occupy Greenland T-Shirt, Beck's Blog, Nan's Recipes, Contact
- [x] Existing prototype repo content centers on Beck Cherry, AI projects, building in public, and contact/social links
- [x] Beck explicitly wants React and wants to replace the Squarespace site builder with a code-owned site

## Design direction
- [x] Editorial dark-mode founder site with sharp typography, restrained motion, and product-forward cards
- [x] Feels bespoke rather than template-like
- [x] Mobile-first and accessible

## Implementation tasks
- [x] Create React + Vite app structure in the existing repo
- [x] Build a homepage with: hero, currently building, ecosystem/content, about, connect/footer
- [x] Carry forward useful content from the current live site and existing prototype
- [x] Add clear placeholders or status treatment for content not yet migrated from Squarespace
- [x] Keep the code simple to maintain and extend

## Verification
- [x] `npm install`
- [x] `npm run build`

## Done condition
- [x] Repo contains a working React site build
- [x] Build passes locally
- [x] Site is visually strong enough to serve as the new direction for `beckcherry.com`
