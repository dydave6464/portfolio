import { Link } from 'react-router-dom'
import { FaLinkedinIn } from 'react-icons/fa6'

const stack = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'C#' },
  { name: '.NET' },
  { name: 'MySQL' },
]

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24">
      {/* Eyebrow row */}
      <div className="flex items-center gap-3 mb-10 rise rise-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Portfolio
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Cebu, PH
        </span>
      </div>

      {/* Hero grid */}
      <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
        {/* Headline */}
        <div className="col-span-12 lg:col-span-8 rise rise-2">
          <h1 className="font-display font-semibold leading-[1] tracking-[-0.03em] text-[clamp(3rem,9vw,7.5rem)]">
            Dave —
            <br />
            <span className="text-[color:var(--color-accent)]">building</span> things
            <br />
            for the web.
          </h1>
          <p className="mt-8 max-w-xl text-[color:var(--color-ink-soft)] text-lg leading-relaxed">
            BSIT student at the University of Cebu — Main Campus. I design and ship
            considered web experiences, with a quiet bias for craft, clarity, and
            calm interfaces.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-[color:var(--color-ink)] text-[color:var(--color-bg)] rounded-full text-sm tracking-wide hover:bg-[color:var(--color-accent)] transition-colors"
            >
              View projects
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 border hairline rounded-full text-sm tracking-wide hover:border-[color:var(--color-ink)] transition-colors"
            >
              Get in touch
            </Link>
            <a
              href="https://www.linkedin.com/in/john-dave-villasan-9515a23b4/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="h-11 w-11 grid place-items-center rounded-full border hairline hover:bg-[color:var(--color-bg-elev)] transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="col-span-12 lg:col-span-4 rise rise-3">
          <figure className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[4px] border hairline bg-[color:var(--color-bg-elev)]">
              {/* Placeholder portrait — replace /portrait.jpg in /public */}
              <img
                src="/portrait.jpg"
                alt="Dave"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.querySelector('[data-fallback]').style.display = 'flex'
                }}
              />
              <div
                data-fallback
                style={{ display: 'none' }}
                className="w-full h-full items-center justify-center font-display font-semibold text-6xl text-[color:var(--color-muted)]"
              >
                D.
              </div>
            </div>
          </figure>
        </div>
      </div>

      {/* Tech stack */}
      <div className="mt-24 lg:mt-32 rise rise-4">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="font-display font-semibold text-2xl lg:text-3xl tracking-tight">Tech stack</h2>
          <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)] hidden sm:inline">
            Tools I reach for
          </span>
        </div>

        <ul className="divide-y divide-[color:var(--color-rule)] border-y hairline">
          {stack.map((s) => (
            <li
              key={s.name}
              className="group grid grid-cols-12 items-center py-5 px-1 hover:bg-[color:var(--color-bg-elev)]/60 transition-colors"
            >
              <span className="col-span-9 font-display font-medium text-2xl sm:text-3xl tracking-tight group-hover:text-[color:var(--color-accent)] transition-colors">
                {s.name}
              </span>
              <span className="col-span-3 text-right text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
                {s.name === 'C#' || s.name === '.NET' || s.name === 'MySQL' ? 'Backend' : 'Frontend'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
