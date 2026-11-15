import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUp, FiMessageCircle, FiX } from 'react-icons/fi'

const WELCOME = "Hi! Ask me anything about Dave's work, projects, or how to get in touch."
const SUGGESTIONS = ['What does Dave build?', 'Tell me about Nailsthetic', 'How can I hire Dave?']
const MAX_CHARS = 1000

// URLs, email addresses, and paths of pages on this site.
const TOKEN =
  /(https?:\/\/[^\s<>()]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|(?<![\w/])\/(?:about|projects\/nailsthetic|projects|services|contact)(?![\w/]))/g

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const launcherRef = useRef(null)
  const inputRef = useRef(null)
  const logRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, pending, error, open])

  function close() {
    setOpen(false)
    launcherRef.current?.focus()
  }

  async function ask(history) {
    setPending(true)
    setError(null)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.reply) throw new Error(data.error)
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setPending(false)
    }
  }

  function send(text) {
    const content = text.trim()
    if (!content || pending) return
    const history = [...messages, { role: 'user', content }]
    setMessages(history)
    setInput('')
    if (inputRef.current) inputRef.current.style.height = ''
    ask(history)
  }

  function onInputChange(e) {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`
  }

  function onInputKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      send(input)
    }
  }

  function onLinkClick() {
    // On phones the panel covers the page, so get out of the way.
    if (window.matchMedia('(max-width: 639px)').matches) setOpen(false)
  }

  function reset() {
    setMessages([])
    setError(null)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <>
      {open && (
        <section
          id="chat-panel"
          role="dialog"
          aria-label="Portfolio assistant"
          onKeyDown={(e) => e.key === 'Escape' && close()}
          className="chat-in dot-grid fixed z-40 inset-x-4 bottom-20 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px] h-[min(620px,calc(100dvh-7rem))] flex flex-col rounded-2xl border hairline bg-[color:var(--color-bg)] shadow-[0_24px_60px_-20px_rgba(15,19,24,0.35)] overflow-hidden"
        >
          {/* Header */}
          <header className="px-5 pt-5 pb-4 border-b hairline bg-[color:var(--color-bg)]/90 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
                Assistant
              </span>
              <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close assistant"
                className="h-8 w-8 -mr-1.5 grid place-items-center rounded-full hover:bg-[color:var(--color-bg-elev)] transition-colors"
              >
                <FiX />
              </button>
            </div>
            <p className="mt-3 font-display font-semibold text-2xl leading-tight tracking-[-0.02em]">
              Ask about <span className="text-[color:var(--color-accent)]">Dave</span>.
            </p>
          </header>

          {/* Conversation */}
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5"
          >
            <BotMessage text={WELCOME} onLinkClick={onLinkClick} />

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="px-3.5 py-1.5 border hairline rounded-full text-sm bg-[color:var(--color-bg)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <p
                  key={i}
                  className="chat-in ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[color:var(--color-ink)] text-[color:var(--color-bg)] px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words"
                >
                  {m.content}
                </p>
              ) : (
                <BotMessage key={i} text={m.content} onLinkClick={onLinkClick} />
              ),
            )}

            {pending && (
              <div className="flex items-center gap-1.5 pl-[18px] h-6" aria-label="Assistant is typing">
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              </div>
            )}

            {error && (
              <div className="chat-in flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[color:var(--color-muted)]">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => ask(messages)}
                  className="link-underline text-[color:var(--color-ink)]"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="px-5 pt-3 pb-4 border-t hairline bg-[color:var(--color-bg)]"
          >
            <div className="flex items-end gap-3">
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_CHARS}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
                placeholder="Ask about Dave's work…"
                className="flex-1 resize-none bg-transparent border-b hairline py-2 text-[15px] leading-relaxed placeholder:text-[color:var(--color-muted)] focus:outline-none focus:border-[color:var(--color-ink)] transition-colors"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send"
                className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors disabled:opacity-35 disabled:hover:bg-[color:var(--color-ink)]"
              >
                <FiArrowUp />
              </button>
            </div>
            <p className="mt-2.5 text-[11px] text-[color:var(--color-muted)]">
              AI answers can be wrong. For anything important, email Dave directly.
            </p>
          </form>
        </section>
      )}

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close assistant' : 'Ask my assistant'}
        className="fixed z-40 right-4 bottom-4 sm:right-6 sm:bottom-6 h-12 w-12 sm:w-auto inline-flex items-center justify-center gap-3 sm:pl-4 sm:pr-5 rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-bg)] text-sm tracking-wide shadow-[0_12px_30px_-10px_rgba(15,19,24,0.45)] hover:bg-[color:var(--color-accent)] transition-colors"
      >
        {open ? (
          <>
            <FiX className="text-lg sm:text-base" />
            <span className="hidden sm:inline">Close</span>
          </>
        ) : (
          <>
            {/* Phones: a compact icon button. Larger screens: status dot and label. */}
            <FiMessageCircle className="text-lg sm:hidden" />
            <span className="relative hidden sm:grid place-items-center h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[color:var(--color-accent-soft)] animate-ping opacity-60 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-[color:var(--color-accent-soft)]" />
            </span>
            <span className="hidden sm:inline">Ask my assistant</span>
          </>
        )}
      </button>
    </>
  )
}

function BotMessage({ text, onLinkClick }) {
  return (
    <p className="chat-in border-l-2 border-[color:var(--color-accent)] pl-4 text-[15px] leading-relaxed text-[color:var(--color-ink)] whitespace-pre-wrap break-words">
      <RichText text={text} onLinkClick={onLinkClick} />
    </p>
  )
}

// Turns URLs, emails, and site paths in plain text into links.
function RichText({ text, onLinkClick }) {
  const linkClass = 'link-underline text-[color:var(--color-accent)]'

  return text.split(TOKEN).map((part, i) => {
    if (i % 2 === 0) return part

    if (part.startsWith('/')) {
      return (
        <Link key={i} to={part} onClick={onLinkClick} className={linkClass}>
          {part}
        </Link>
      )
    }
    if (part.includes('@') && !part.startsWith('http')) {
      return (
        <a key={i} href={`mailto:${part}`} className={linkClass}>
          {part}
        </a>
      )
    }

    const url = part.replace(/[.,;:!?'"]+$/, '')
    return (
      <Fragment key={i}>
        <a href={url} target="_blank" rel="noreferrer" className={linkClass}>
          {url}
        </a>
        {part.slice(url.length)}
      </Fragment>
    )
  })
}
