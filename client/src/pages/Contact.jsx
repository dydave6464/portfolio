import { useState } from 'react'
import { FaLinkedinIn } from 'react-icons/fa6'

const details = [
  { label: 'Email', value: 'dave.uc.main.it@gmail.com', href: 'mailto:dave.uc.main.it@gmail.com' },
  { label: 'Phone', value: '+63 943 666 7671', href: 'tel:+639436667671' },
  { label: 'Location', value: 'Cebu City, Philippines' },
]

export default function Contact() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
    }
    setStatus({ state: 'sending', msg: 'Sending…' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus({ state: 'sent', msg: 'Thanks — I’ll get back to you soon.' })
      e.target.reset()
    } catch {
      setStatus({ state: 'error', msg: 'Could not send. Email me directly instead.' })
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24">
      <div className="flex items-center gap-3 mb-10 rise rise-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Contact
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
      </div>

      <h1 className="font-display font-semibold leading-[1] tracking-[-0.03em] text-[clamp(2.5rem,7vw,5.5rem)] mb-12 rise rise-2">
        Let's
        <span className="text-[color:var(--color-accent)]"> talk</span>.
      </h1>

      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        {/* Details */}
        <div className="col-span-12 lg:col-span-5 rise rise-3">
          <ul className="space-y-6">
            {details.map((d) => (
              <li key={d.label} className="border-b hairline pb-5">
                <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
                  {d.label}
                </p>
                {d.href ? (
                  <a
                    href={d.href}
                    className="font-display font-medium text-2xl lg:text-3xl tracking-tight link-underline"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="font-display font-medium text-2xl lg:text-3xl tracking-tight">{d.value}</p>
                )}
              </li>
            ))}
          </ul>

          <a
            href="https://www.linkedin.com/in/john-dave-villasan-9515a23b4/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 border hairline rounded-full text-sm hover:border-[color:var(--color-ink)] transition-colors"
          >
            <FaLinkedinIn />
            Connect on LinkedIn
          </a>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="col-span-12 lg:col-span-7 rise rise-4 space-y-6"
        >
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Message" name="message" textarea required />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status.state === 'sending'}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[color:var(--color-ink)] text-[color:var(--color-bg)] rounded-full text-sm tracking-wide hover:bg-[color:var(--color-accent)] transition-colors disabled:opacity-60"
            >
              {status.state === 'sending' ? 'Sending…' : 'Send message'} →
            </button>
            {status.msg && (
              <p
                className={`text-sm ${
                  status.state === 'error'
                    ? 'text-[color:var(--color-warm)]'
                    : 'text-[color:var(--color-muted)]'
                }`}
              >
                {status.msg}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', textarea, required }) {
  const base =
    'w-full bg-transparent border-b hairline pt-2 pb-3 text-lg focus:outline-none focus:border-[color:var(--color-ink)] transition-colors'
  return (
    <label className="block">
      <span className="block text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)] mb-1">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={base} />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  )
}
