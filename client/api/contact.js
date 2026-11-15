// Vercel serverless function: POST /api/contact
// Validates the contact form and emails it to the site owner through Brevo.
//
// Required environment variables (set them in Vercel → Settings → Environment Variables):
//   BREVO_API_KEY       Brevo API key (SMTP & API → API Keys)
//   CONTACT_FROM_EMAIL  A sender address verified in Brevo
//   CONTACT_TO_EMAIL    Where contact messages should be delivered

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 254, message: 4000 }

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])

function readBody(req) {
  try {
    const body = req.body
    return body && typeof body === 'object' ? body : {}
  } catch {
    // Vercel throws when the request body is not valid JSON.
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const body = readBody(req)
  if (!body) {
    return res.status(400).json({ ok: false, error: 'Invalid request body.' })
  }

  // Spam trap: the form has a hidden "company" field that people never see.
  // If it is filled in, report success so the bot moves on, but send nothing.
  if (String(body.company ?? '').trim()) {
    console.log('[contact] Spam trap triggered; message dropped')
    return res.status(200).json({ ok: true })
  }

  const name = String(body.name ?? '').trim().replace(/\s+/g, ' ')
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Please fill in your name, email, and message.' })
  }
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  }
  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return res.status(400).json({ ok: false, error: 'Your message is too long (4,000 characters max).' })
  }

  const { BREVO_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env
  if (!BREVO_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error('[contact] Missing BREVO_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL')
    return res.status(500).json({ ok: false, error: 'Contact form is not configured.' })
  }

  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) }

  try {
    const brevoRes = await fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Portfolio contact form', email: CONTACT_FROM_EMAIL },
        to: [{ email: CONTACT_TO_EMAIL }],
        replyTo: { email, name },
        subject: `Portfolio message from ${name}`,
        textContent: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        htmlContent:
          `<p><strong>Name:</strong> ${safe.name}<br>` +
          `<strong>Email:</strong> ${safe.email}</p>` +
          `<p>${safe.message.replace(/\r?\n/g, '<br>')}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!brevoRes.ok) {
      const detail = await brevoRes.text().catch(() => '')
      console.error('[contact] Brevo rejected the email', brevoRes.status, detail)
      return res.status(502).json({ ok: false, error: 'Could not send message.' })
    }
  } catch (err) {
    console.error('[contact] Brevo request failed', err)
    return res.status(502).json({ ok: false, error: 'Could not send message.' })
  }

  return res.status(200).json({ ok: true })
}
