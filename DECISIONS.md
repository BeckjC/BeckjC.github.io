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

## 2026-07-19 — Run this repo linearly on main
- Decision: The default workflow for `beck-personal-site` is a single up-to-date `main` branch locally and on GitHub.
- Why: This site is small, production-facing, and easier to manage with one verified source of truth instead of routine branch churn.
- Operating rule: Make changes on `main`, verify locally, then push `main` and deploy the exact approved working tree.
