import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api' })
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email.' })
  }
  if (String(message).length > 4000) {
    return res.status(400).json({ ok: false, error: 'Message too long.' })
  }

  console.log('[contact]', { name, email, at: new Date().toISOString() })

  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`portfolio-api listening on http://localhost:${PORT}`)
})
