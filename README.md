# Beck Personal Site

> Project entrypoint. Start here before searching deeper in this project.

## Current app
- React + Vite personal-site rebuild for `beckcherry.com`
- Main source: `src/App.jsx`, `src/pages/*`, `src/styles.css`, `src/lib/*`
- Discovery assets are generated into `public/` before each build

## Run locally
```bash
npm install
npm run dev
```

## Verify
```bash
npm test
npm run build
```

## Publishing
- Vercel serves the current preview/build
- Production build output is standard Vite `dist/`
- `vercel.json` rewrites app routes to the SPA entry so canonical page paths work on the custom domain

## Workflow
- This project uses a linear `main`-only workflow.
- Do not create or keep multiple local branches or worktrees for normal project updates.
- Make one bounded change at a time, verify it locally, push it to GitHub `main`, then deploy it to production.
- Keep the repo clean between updates so there is no ambiguity about what is live or ready to ship.
- If a future change is unusually risky or large enough to need isolation, stop and get Beck’s approval before using any branch-based workflow.

## Email signup → Google Sheets via Google Apps Script
1. Create a Google Sheet with a tab named `Signups`.
2. In that sheet, open Extensions → Apps Script.
3. Paste a small `doPost` handler that appends rows to the sheet.
4. Deploy the script as a web app.
5. Add these env vars in Vercel and locally in `.env.local`:

```bash
GOOGLE_APPS_SCRIPT_URL=
GOOGLE_APPS_SCRIPT_SECRET=
```

6. The homepage form posts to `/api/subscribe`, which forwards each signup to your Apps Script web app.
