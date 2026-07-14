const REQUIRED_ENV_VARS = ['GOOGLE_APPS_SCRIPT_URL']

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
  const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      secret: process.env.GOOGLE_APPS_SCRIPT_SECRET || '',
      timestamp: new Date().toISOString(),
      email,
      source,
      referrer,
      userAgent,
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok || result?.ok !== true) {
    const error = new Error(result?.error || 'Apps Script request failed.')
    error.code = result?.code || 'script_error'
    throw error
  }

  return result
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const missingEnvVars = getMissingEnvVars()

  if (missingEnvVars.length > 0) {
    return res.status(500).json({
      error: 'Google Apps Script is not configured yet.',
      missing: missingEnvVars,
    })
  }

  const body = parseBody(req)
  const email = body?.email?.trim().toLowerCase()

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email.' })
  }

  try {
    const result = await appendSignupRow({
      email,
      source: body?.source || 'homepage',
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
    })

    return res.status(200).json({ ok: true, duplicate: result?.duplicate === true })
  } catch (error) {
    console.error('Newsletter signup failed:', error)
    return res.status(500).json({ error: 'Could not save your email right now.' })
  }
}
