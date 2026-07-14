# PRD — React rebuild of beckcherry.com

## Completed foundation loop
- [x] Replace the old static prototype with a new React-based personal site in this repo
- [x] Use the current `beckcherry.com` content and the existing project folder content as source material
- [x] Ship a polished, responsive homepage that can become the replacement for the current Squarespace homepage
- [x] Build verification completed with `npm run build`

## Current loop — professional structure + SEO/AI pass

### Outcome
- [x] Merge the current production-worthy site work into `main`
- [x] Clean up stale GitHub Pages-era output paths and repo clutter so the codebase feels intentional and professional
- [x] Improve SEO and AI discoverability without changing the human-facing UX or core site behavior

### Scope boundaries
- [x] In scope: code organization, routing internals, metadata, structured data, crawl/discovery files, build config cleanup, Vercel-ready deploy config
- [x] In scope: preserve the current visual design and functional UX for visitors
- [x] Out of scope: redesigning page layouts, changing copy direction materially, replacing the signup backend, or migrating to a new framework

### Key context
- [x] Production domain is now `https://beckcherry.com/` on Vercel
- [x] The repo still contains GitHub Pages-era `docs/` output assumptions and `.nojekyll` artifacts
- [x] The current app is a React + Vite SPA with internal page navigation for Home, Adventures, Blog, Recipes, and About Me

### Implementation checklist
- [x] Normalize build/deploy paths around the standard Vite `dist/` output and remove stale output artifacts from source control where appropriate
- [x] Refactor oversized app logic into a cleaner professional structure without changing visitor-facing behavior
- [x] Preserve backward compatibility for existing hash URLs while improving canonical route handling
- [x] Add deterministic route metadata handling for title, description, canonical, Open Graph, and Twitter tags
- [x] Add structured data for person/website pages and AI-readable discovery files (`robots.txt`, `sitemap.xml`, `llms.txt`, manifest, favicon assets) where appropriate
- [x] Keep the cherry favicon and current live domain configuration intact

### Verification
- [x] `npm test`
- [x] `npm run build`
- [x] Inspect generated `dist/` output for metadata and crawl files
- [x] Deploy preview/prod on Vercel and confirm `https://beckcherry.com/` serves the updated build

### Done condition
- [x] `main` contains the verified cleanup + SEO/AI pass
- [x] The repo no longer depends on stale GitHub Pages deployment structure
- [x] The site exposes stronger machine-readable metadata/discovery while looking and behaving the same to human visitors
