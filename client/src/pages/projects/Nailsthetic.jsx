import { Link } from 'react-router-dom'

export default function Nailsthetic() {
  return (
    <article className="mx-auto max-w-5xl px-6 lg:px-10 pt-12 lg:pt-16 pb-24">
      {/* Back link */}
      <Link
        to="/projects"
        className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors rise rise-1"
      >
        ← All projects
      </Link>

      {/* Header */}
      <header className="mt-8 grid grid-cols-12 gap-6 lg:gap-10 items-end rise rise-2">
        <div className="col-span-12 lg:col-span-8">
          <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)] mb-3">
            Client Project · 2026
          </p>
          <h1 className="font-display font-semibold leading-[1] tracking-[-0.03em] text-[clamp(2.5rem,7vw,5rem)]">
            Nailsthetic
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-[color:var(--color-ink-soft)] max-w-2xl leading-relaxed">
            A polished marketing site for a Cebu-based nail studio — built to
            translate the studio's calm, refined in-person experience into a
            web presence that converts walk-by interest into bookings.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
          <a
            href="https://nailsthetic.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-[color:var(--color-ink)] text-[color:var(--color-bg)] rounded-full text-sm tracking-wide hover:bg-[color:var(--color-accent)] transition-colors"
          >
            Visit live site ↗
          </a>
        </div>
      </header>

      {/* Cover */}
      <figure className="mt-12 rise rise-3 overflow-hidden border hairline rounded-[6px]">
        <img
          src="/projects/nailsthetic/cover.jpg"
          alt="Nailsthetic — site preview"
          className="w-full aspect-[16/9] object-cover"
        />
      </figure>

      {/* Meta strip */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-rule)] border hairline rise rise-4">
        {[
          ['Role', 'Frontend Developer'],
          ['Stack', 'React · Tailwind · Vite'],
          ['Deployed', 'Vercel'],
          ['Timeline', '2026'],
        ].map(([k, v]) => (
          <div key={k} className="bg-[color:var(--color-bg)] p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
              {k}
            </p>
            <p className="mt-2 font-display font-medium text-base lg:text-lg tracking-tight">{v}</p>
          </div>
        ))}
      </div>

      {/* Body sections */}
      <Section heading="The brief">
        <p>
          The studio needed a digital presence that matched the considered
          aesthetic of their physical space — a place where every detail is
          chosen. The existing approach was scattered across social posts and
          DMs, which made it hard for new clients to find services, prices, and
          how to book.
        </p>
      </Section>

      <Section heading="What I built">
        <ul className="space-y-3">
          {[
            'A clean, mobile-first marketing site with a calm visual rhythm.',
            'A services and gallery section with image-driven layouts.',
            'Studio photos and brand-aligned typography across pages.',
            'Direct booking-friendly contact paths (call, message, social).',
            'Payment QR section so walk-ins and remote clients can settle quickly.',
          ].map((line) => (
            <li
              key={line}
              className="flex items-baseline gap-3 text-[color:var(--color-ink-soft)]"
            >
              <span className="text-[color:var(--color-accent)]">—</span>
              {line}
            </li>
          ))}
        </ul>
      </Section>

      {/* Visual gallery */}
      <div className="mt-16 grid grid-cols-12 gap-4 rise">
        <figure className="col-span-12 md:col-span-7 overflow-hidden border hairline rounded-[6px]">
          <img
            src="/projects/nailsthetic/studio.jpg"
            alt="Nailsthetic — studio"
            className="w-full aspect-[4/3] object-cover"
          />
        </figure>
        <figure className="col-span-6 md:col-span-5 overflow-hidden border hairline rounded-[6px]">
          <img
            src="/projects/nailsthetic/gallery-1.jpg"
            alt="Nailsthetic — gallery 1"
            className="w-full aspect-[4/5] object-cover"
          />
        </figure>
        <figure className="col-span-6 md:col-span-12 overflow-hidden border hairline rounded-[6px]">
          <img
            src="/projects/nailsthetic/gallery-2.jpg"
            alt="Nailsthetic — gallery 2"
            className="w-full aspect-[16/9] object-cover"
          />
        </figure>
      </div>

      <Section heading="What I learned">
        <ul className="space-y-3">
          {[
            'Working with a real client teaches you that scope is a conversation, not a spec.',
            'Restraint reads as quality — fewer, more deliberate choices outperformed more features.',
            'Performance and image discipline matter on mobile data plans (a real constraint here in PH).',
            'Shipping a small thing that works beats a big thing that almost does.',
          ].map((line) => (
            <li
              key={line}
              className="flex items-baseline gap-3 text-[color:var(--color-ink-soft)]"
            >
              <span className="text-[color:var(--color-accent)]">—</span>
              {line}
            </li>
          ))}
        </ul>
      </Section>

      {/* Footer CTA */}
      <div className="mt-20 border-t hairline pt-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between rise">
        <p className="text-[color:var(--color-ink-soft)]">
          Have a project in mind?{' '}
          <Link to="/contact" className="link-underline text-[color:var(--color-ink)]">
            Get in touch
          </Link>
          .
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-3 px-5 py-3 border hairline rounded-full text-sm tracking-wide hover:border-[color:var(--color-ink)] transition-colors"
        >
          ← All projects
        </Link>
      </div>
    </article>
  )
}

function Section({ heading, children }) {
  return (
    <section className="mt-16 grid grid-cols-12 gap-6 lg:gap-10 rise">
      <h2 className="col-span-12 lg:col-span-3 text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
        {heading}
      </h2>
      <div className="col-span-12 lg:col-span-9 text-lg leading-relaxed text-[color:var(--color-ink-soft)] max-w-2xl">
        {children}
      </div>
    </section>
  )
}
