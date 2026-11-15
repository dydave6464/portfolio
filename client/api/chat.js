// Vercel serverless function: POST /api/chat
// Sends the visitor's conversation to an AI model and returns the assistant's reply.
// Groq answers first (fastest); if it fails or hits its free-tier limit, Gemini answers instead.
//
// Environment variables (Vercel → Settings → Environment Variables).
// At least one key is required; set both for the automatic fallback.
//   GROQ_API_KEY    https://console.groq.com/keys
//   GEMINI_API_KEY  https://aistudio.google.com/apikey
//   GROQ_MODEL      Optional. Defaults to DEFAULT_GROQ_MODEL below.
//   GEMINI_MODEL    Optional. Defaults to DEFAULT_GEMINI_MODEL below.
// Change a model with the optional variables when a provider retires one.

import { SYSTEM_PROMPT } from './_prompt.js'

const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b'
const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite'

const MAX_HISTORY = 12 // most recent messages sent to the model
const MAX_USER_CHARS = 1000
const MAX_ASSISTANT_CHARS = 4000
const MAX_REPLY_TOKENS = 600
const TEMPERATURE = 0.2 // low = sticks closely to the facts in _prompt.js

const FALLBACK_REPLY =
  "Sorry — I couldn't answer that one. Try rephrasing, or reach Dave through the contact page: /contact"

// Tried in this order. Providers without an API key are skipped.
const PROVIDERS = [
  { name: 'groq', keyVar: 'GROQ_API_KEY', ask: askGroq },
  { name: 'gemini', keyVar: 'GEMINI_API_KEY', ask: askGemini },
]

async function askGroq(messages, apiKey) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: TEMPERATURE,
      max_completion_tokens: MAX_REPLY_TOKENS,
      reasoning_effort: 'low', // gpt-oss "thinks" briefly before answering; keep it short
      include_reasoning: false,
    }),
    // Short timeout so a slow Groq hands over to Gemini quickly.
    signal: AbortSignal.timeout(8_000),
  })
  if (!res.ok) throw await httpError(res)

  const data = await res.json()
  return data?.choices?.[0]?.message?.content ?? ''
}

async function askGemini(messages, apiKey) {
  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: TEMPERATURE, maxOutputTokens: MAX_REPLY_TOKENS },
      }),
      signal: AbortSignal.timeout(20_000),
    },
  )
  if (!res.ok) throw await httpError(res)

  const data = await res.json()
  const parts = data?.candidates?.[0]?.content?.parts ?? []
  return parts
    .filter((p) => typeof p.text === 'string' && !p.thought)
    .map((p) => p.text)
    .join('')
}

// The site avoids em dashes; the prompt asks for none, and this catches any that slip through.
function noEmDashes(text) {
  return text.replace(/\s*—\s*/g, ', ')
}

async function httpError(res) {
  const err = new Error(`HTTP ${res.status}`)
  err.status = res.status
  err.detail = await res.text().catch(() => '')
  return err
}

function readBody(req) {
  try {
    const body = req.body
    return body && typeof body === 'object' ? body : {}
  } catch {
    return null
  }
}

// Returns a cleaned copy of the conversation, or null if it is malformed.
function cleanMessages(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return null

  const messages = []
  for (const m of raw) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return null
    const content = typeof m.content === 'string' ? m.content.trim() : ''
    const limit = m.role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS
    if (!content || content.length > limit) return null
    messages.push({ role: m.role, content })
  }

  if (messages.at(-1).role !== 'user') return null

  // Keep the latest messages, starting the window on a visitor message.
  const recent = messages.slice(-MAX_HISTORY)
  while (recent[0].role !== 'user') recent.shift()
  return recent
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const body = readBody(req)
  const messages = body && cleanMessages(body.messages)
  if (!messages) {
    return res.status(400).json({ ok: false, error: 'Invalid message.' })
  }

  const available = PROVIDERS.filter((p) => process.env[p.keyVar])
  if (available.length === 0) {
    console.error('[chat] Set GROQ_API_KEY and/or GEMINI_API_KEY')
    return res.status(500).json({ ok: false, error: 'The assistant is not configured yet.' })
  }

  let rateLimited = false
  let emptyReply = false

  for (const provider of available) {
    try {
      const reply = noEmDashes((await provider.ask(messages, process.env[provider.keyVar])).trim())
      if (reply) return res.status(200).json({ ok: true, reply })
      emptyReply = true
      console.error(`[chat] ${provider.name} returned an empty reply`)
    } catch (err) {
      if (err.status === 429) rateLimited = true
      console.error(`[chat] ${provider.name} failed`, err.status ?? '', err.detail || err.message)
    }
  }

  // Every provider failed.
  if (emptyReply) return res.status(200).json({ ok: true, reply: FALLBACK_REPLY })
  if (rateLimited) {
    return res
      .status(429)
      .json({ ok: false, error: 'The assistant is busy right now. Please try again in a minute.' })
  }
  return res.status(502).json({ ok: false, error: 'The assistant could not reply. Please try again.' })
}
