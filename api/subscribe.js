import { google } from 'googleapis'

const REQUIRED_ENV_VARS = [
  'GOOGLE_SHEETS_CLIENT_EMAIL',
  'GOOGLE_SHEETS_PRIVATE_KEY',
  'GOOGLE_SHEETS_SPREADSHEET_ID',
]

function getMissingEnvVars() {
  return REQUIRED_ENV_VARS.filter((key) => !process.env[key])
}

function parseBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }

  return req.body ?? null
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function appendSignupRow({ email, source, userAgent, referrer }) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const range = `${process.env.GOOGLE_SHEETS_SHEET_NAME || 'Signups'}!A:E`

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[new Date().toISOString(), email, source, referrer, userAgent]],
    },
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const missingEnvVars = getMissingEnvVars()

  if (missingEnvVars.length > 0) {
    return res.status(500).json({
      error: 'Google Sheets is not configured yet.',
      missing: missingEnvVars,
    })
  }

  const body = parseBody(req)
  const email = body?.email?.trim().toLowerCase()

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email.' })
  }

  try {
    await appendSignupRow({
      email,
      source: body?.source || 'homepage',
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Newsletter signup failed:', error)
    return res.status(500).json({ error: 'Could not save your email right now.' })
  }
}
