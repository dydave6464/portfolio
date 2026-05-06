const services = [
  {
    title: 'Web Development',
    summary:
      'Custom marketing sites, landing pages, and small web apps. Modern stack — React, Tailwind, Node — built for speed, clarity, and easy handoff.',
    deliverables: ['Responsive design', 'Hand-coded components', 'Deploy on Vercel / Netlify', 'Light CMS integration'],
  },
  {
    title: 'Mobile Development',
    summary:
      'Cross-platform mobile experiences with a native-feeling UI. Lean scope, careful interactions, and clean codebases that are easy to extend.',
    deliverables: ['iOS & Android (cross-platform)', 'API integration', 'Push & auth flows', 'App-store readiness'],
  },
]

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24">
      <div className="flex items-center gap-3 mb-10 rise rise-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Services
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          What I offer
        </span>
      </div>

      <h1 className="font-display font-semibold leading-[1] tracking-[-0.03em] text-[clamp(2.5rem,7vw,5.5rem)] mb-4 rise rise-2">
        Quietly
        <span className="text-[color:var(--color-accent)]"> useful</span> work.
      </h1>
      <p className="max-w-2xl text-[color:var(--color-ink-soft)] text-lg leading-relaxed mb-16 rise rise-3">
        Two focused offerings. Honest scoping, transparent pricing, and a calm
        process from first conversation to launch.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {services.map((s, i) => (
          <article
            key={s.title}
            className={`group relative border hairline p-8 lg:p-10 bg-[color:var(--color-bg)] hover:bg-[color:var(--color-bg-elev)] transition-colors rise rise-${3 + i}`}
          >
            <h2 className="font-display font-semibold text-3xl lg:text-4xl tracking-[-0.02em] group-hover:text-[color:var(--color-accent)] transition-colors">
              {s.title}
            </h2>
            <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
              {s.summary}
            </p>

            <ul className="mt-6 space-y-2">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-baseline gap-3 text-sm text-[color:var(--color-ink-soft)]"
                >
                  <span className="text-[color:var(--color-accent)] font-display">—</span>
                  {d}
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 link-underline text-sm tracking-wide"
            >
              Start a conversation →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
