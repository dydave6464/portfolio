import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24">
      <title>Page not found · Dave Villasan</title>

      <div className="flex items-center gap-3 mb-10 rise rise-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Error 404
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
      </div>

      <h1 className="font-display font-semibold leading-[1] tracking-[-0.03em] text-[clamp(2.5rem,7vw,5.5rem)] rise rise-2">
        This page
        <span className="text-[color:var(--color-accent)]"> wandered off</span>.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink-soft)] rise rise-3">
        The link may be old or mistyped. One of these should get you back on track.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3 rise rise-4">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-[color:var(--color-ink)] text-[color:var(--color-bg)] rounded-full text-sm tracking-wide hover:bg-[color:var(--color-accent)] transition-colors"
        >
          Back to home
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center px-6 py-3 border hairline rounded-full text-sm tracking-wide hover:border-[color:var(--color-ink)] transition-colors"
        >
          View projects
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 border hairline rounded-full text-sm tracking-wide hover:border-[color:var(--color-ink)] transition-colors"
        >
          Contact
        </Link>
      </div>
    </section>
  )
}
