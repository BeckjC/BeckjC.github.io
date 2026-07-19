# DECISIONS

## 2026-07-09 — Rebuild personal site in React
- Decision: The personal site will be rebuilt and maintained as a React app in this repo.
- Why: Beck wants a code-owned site we can evolve directly.

## 2026-07-09 — Keep `beckcherry.com` as the production domain
- Decision: The rebuilt site should continue using `beckcherry.com`.
- Why: Existing brand/domain continuity matters more than changing URLs.

## 2026-07-09 — Avoid ongoing site-builder fees
- Decision: Hosting should stay cheap and simple without a paid site-builder dependency.
- Why: The goal is full control with minimal recurring cost.

## 2026-07-12 — Reuse live-site copy and structure selectively
- Decision: Reuse content from the live site where it still serves the project, while dropping sections Beck has already rejected.
- Why: The rebuild should stay grounded in real source material instead of invented copy.

## 2026-07-14 — Standardize around Vercel + Vite dist output
- Decision: The deploy target is Vercel, with standard Vite `dist/` output and SPA rewrites for canonical paths.
- Why: This matches the current app architecture and removes stale GitHub Pages assumptions.

## 2026-07-14 — Keep email signup lightweight
- Decision: Email signup should stay simple and inexpensive, with the current implementation forwarding to Google Apps Script / Google Sheets.
- Why: Beck prefers a reliable, self-owned, low-overhead path over extra platform complexity.

## 2026-07-19 — Use a linear main-only workflow for this repo
- Decision: `beck-personal-site` should use one-update-at-a-time work directly on `main`, followed by push to GitHub and deploy to production.
- Why: Beck wants one unambiguous source of truth with no confusion from extra local branches, worktrees, or parallel in-progress states.
- Guardrail: Keep changes bounded and verified before each push. If a future change is unusually risky or large enough to justify isolation, stop and ask Beck before deviating.
