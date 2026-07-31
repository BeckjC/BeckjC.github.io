# Beck Personal Site

## Hot

- On July 27, 2026, Beck set the next `beckcherry.com` workstream direction as an ultra-minimal playful push-up tracker with a mostly visual lifetime push-up tracker and a visual “ripping fifty” streak tracker.
- On July 27, 2026, before the push-up tracker UI work, the repo was re-verified on the linear `main`-only workflow and a restore checkpoint was pushed as commit `701f924` with backup tag `pre-ripping-fifty-ui-2026-07-28`.
- On July 26, 2026, Beck found a cross-page signup dedupe bug: submitting the same email on the home page and the `/email` page created duplicate rows in the spreadsheet.
- The durable fix rule for `beckcherry.com` signup capture is now server-side global dedupe in Google Apps Script using `email.trim().toLowerCase()` as the unique key across the whole sheet; duplicate submits should not append a second row.
- Active project at `/Users/cherrynet/life/projects/beck-personal-site` for the React-based `beckcherry.com` site.
- On July 19, 2026, Beck made linear `main`-only development the default workflow for this repo: one bounded change, verify locally, push to GitHub `main`, then deploy to production; branches/worktrees now require explicit justification.
- On July 19, 2026, the `/sites` regression recovery settled on a Safari-safe sticky rail structure: keep the rail in normal flow, use an inner `position: -webkit-sticky; position: sticky;` wrapper with a plain `top` offset, and use `overflow-x: clip` plus fallback instead of global `overflow-x: hidden`.
- On July 19, 2026, the top `/sites` marquee moved off the CSS reset loop and onto a measured `requestAnimationFrame` loop to eliminate visible restart glitches and tile flashing.
- On July 19, 2026, the approved Adventures content set added AST La Barra, AST Las Flores, Playa Negra, and Club Marena to Beck’s surf-trips data.
- On July 19, 2026, a deploy regression showed that releases touching `/sites` and `adventuresData.js` must ship from the exact approved working-tree files and be re-verified on both `/sites` and `/becks-adventures` before the deploy is called done.
- `beckcherry.com` now resolves to the Vercel deployment of the rebuilt site.
- On July 24, 2026, the approved branded newsletter template baseline was saved at `/Users/cherrynet/life/projects/beck-personal-site/resend-newsletter-template.html` for reuse in Resend.
- The current outbound newsletter path is Resend on a sending subdomain, with own-branding only, no inbound replies, and no need for a real `@beckcherry.com` mailbox.
- Email signup capture stays in its current lightweight flow for now.

## Warm

- The approved direction is personal, visual, and less wordy.
- Keep Blog, Nan’s Recipes, About, YouTube, and LinkedIn; X and Occupy Greenland stay out.
- The July 14 performance pass substantially shrank the initial JS bundle before redeploying the live site.

## Context

This project lives under `~/life/projects/beck-personal-site`. Durable project memory belongs in `summary.md` and `items.json`, while execution should continue from repo state and the canonical docs in this folder.
