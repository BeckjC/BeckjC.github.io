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

## Email signup → Google Sheets
1. Create a Google Sheet.
2. Create a Google Cloud service account with Google Sheets API enabled.
3. Share the sheet with the service account email as an editor.
4. Add these env vars in Vercel and locally in `.env.local`:

```bash
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_SHEET_NAME=Signups
```

5. The homepage form posts to `/api/subscribe`, which appends each signup to the sheet.
