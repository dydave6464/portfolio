import { FaLinkedinIn, FaGithub } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10 flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-medium leading-tight tracking-tight">
            Made in Cebu —
            <span className="text-[color:var(--color-accent)]"> with intent.</span>
          </p>
          <p className="text-sm text-[color:var(--color-muted)] mt-2">
            © {new Date().getFullYear()} Dave. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/john-dave-villasan-9515a23b4/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="h-10 w-10 grid place-items-center rounded-full border hairline hover:bg-[color:var(--color-bg-elev)] transition-colors"
          >
            <FaLinkedinIn className="text-[color:var(--color-ink)]" />
          </a>
          <a
            href="https://github.com/dydave6464"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="h-10 w-10 grid place-items-center rounded-full border hairline hover:bg-[color:var(--color-bg-elev)] transition-colors"
          >
            <FaGithub className="text-[color:var(--color-ink)]" />
          </a>
        </div>
      </div>
    </footer>
  )
}
