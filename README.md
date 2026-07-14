# Beck Personal Site

> Project entrypoint. Start here before searching deeper in this project.

## Current app
- React + Vite personal-site rebuild for `beckcherry.com`
- Main source: `src/App.jsx`, `src/styles.css`

## Run locally
```bash
npm install
npm run dev
```

## Verify
```bash
npm run build
```

## Publishing
- Vercel serves the current preview/build

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
