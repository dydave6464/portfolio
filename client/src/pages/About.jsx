export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24">
      <div className="flex items-center gap-3 mb-10 rise rise-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          About
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-12 lg:col-span-4 rise rise-2">
          <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)] mb-2">
            Profile
          </p>
          <p className="font-display font-medium text-2xl text-[color:var(--color-accent)] tracking-tight">
            Student. Builder. Cebuano.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 rise rise-3 space-y-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          <p className="font-display font-semibold text-3xl lg:text-4xl text-[color:var(--color-ink)] leading-snug tracking-tight">
            I'm Dave — a Bachelor of Science in Information Technology student at the
            <span className="text-[color:var(--color-accent)]"> University of Cebu, Main Campus</span>.
          </p>

          <p>
            I'm at the start of my journey as a developer. No professional experience
            yet, but I'm driven by curiosity, late nights spent learning, and a small but growing
            collection of personal projects. What I lack in years, I try to make up for in
            care: writing code that's readable, designing interfaces that feel
            considered, and shipping things end-to-end.
          </p>

          <p>
            I'm most at home where frontend craft meets backend logic, moving
            comfortably between markup, type-safe JavaScript, and C# / .NET on the
            server. I'm currently sharpening fundamentals, contributing to small
            client work, and looking for opportunities to learn from people who
            build at a higher level than I do today.
          </p>

          <p className="text-[color:var(--color-ink)] font-medium">
            Open to internships, collaborations, and freelance projects in the
            Philippines and remote.
          </p>
        </div>
      </div>

      {/* Quick facts */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-rule)] border hairline rise rise-4">
        {[
          ['Education', 'BSIT, UC Main'],
          ['Based in', 'Cebu City, PH'],
          ['Status', 'Student / Open to work'],
          ['Focus', 'Web · Mobile'],
        ].map(([k, v]) => (
          <div key={k} className="bg-[color:var(--color-bg)] p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">{k}</p>
            <p className="mt-2 font-display font-medium text-xl tracking-tight">{v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
