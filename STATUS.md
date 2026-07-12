# STATUS

## Current state
- Project lives at `/Users/cherrynet/life/projects/beck-personal-site`
- A new React + Vite version of the personal site now exists in this repo
- The new homepage pulls from both the current Squarespace nav/content structure and the earlier local prototype direction
- Local production build passes with `npm run build`
- The current live `beckcherry.com` still redirects to `https://www.beckcherry.com/` and is still served by Squarespace
- No current project-level Vercel linkage was found (`.vercel` missing, no Vercel auth available on this machine)
- No Surge deployment matching `beckcherry.com` was found in the logged-in Surge account

## Blockers
- GitHub Pages repo / preview URL still needs to be created and connected
- Squarespace content like blog/recipes/contact still needs migration or replacement before domain cutover

## Next steps
- Choose deployment target for the React site
- Add any missing pages/content that must exist before replacing Squarespace
- Cut over `beckcherry.com` after deployment is ready and approved
