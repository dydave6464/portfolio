import { Link } from 'react-router-dom'

const projects = [
  {
    title: 'Nailsthetic',
    role: 'Client website · Frontend build',
    year: '2026',
    href: 'https://nailsthetic.vercel.app',
    caseStudy: '/projects/nailsthetic',
    blurb:
      'A polished marketing site for a Cebu-based nail studio. Services, gallery, and booking-friendly contact paths — built to translate the studio’s calm in-person experience into a clean, mobile-first web presence.',
    tags: ['React', 'Tailwind', 'Vite', 'Vercel'],
  },
]

export default function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24">
      <div className="flex items-center gap-3 mb-10 rise rise-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Projects
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Selected work
        </span>
      </div>

      <h1 className="font-display font-semibold leading-[1] tracking-[-0.03em] text-[clamp(2.5rem,7vw,5.5rem)] mb-16 rise rise-2">
        Things I've
        <span className="text-[color:var(--color-accent)]"> shipped</span>.
      </h1>

      <div className="space-y-px bg-[color:var(--color-rule)] border-y hairline rise rise-3">
        {projects.map((p) => (
          <article
            key={p.title}
            className="group bg-[color:var(--color-bg)] p-6 lg:p-10 grid grid-cols-12 gap-6 hover:bg-[color:var(--color-bg-elev)] transition-colors"
          >
            <div className="col-span-12 lg:col-span-2">
              <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
                {p.year}
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <h2 className="font-display font-semibold text-4xl lg:text-5xl tracking-[-0.02em] group-hover:text-[color:var(--color-accent)] transition-colors">
                {p.title}
              </h2>
              <p className="text-sm text-[color:var(--color-muted)] mt-1">{p.role}</p>
              <p className="mt-5 text-[color:var(--color-ink-soft)] leading-relaxed max-w-prose">
                {p.blurb}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="text-xs tracking-wide px-3 py-1 border hairline rounded-full text-[color:var(--color-muted)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-3 flex flex-col lg:items-end items-start gap-3">
              <Link
                to={p.caseStudy}
                className="inline-flex items-center gap-3 px-5 py-3 bg-[color:var(--color-ink)] text-[color:var(--color-bg)] rounded-full text-sm tracking-wide hover:bg-[color:var(--color-accent)] transition-colors"
              >
                Read case study →
              </Link>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 border hairline rounded-full text-sm tracking-wide hover:border-[color:var(--color-ink)] transition-colors"
              >
                Visit live site ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-12 text-sm text-[color:var(--color-muted)] rise rise-4">
        More projects in progress — check back soon.
      </p>
    </section>
  )
}
