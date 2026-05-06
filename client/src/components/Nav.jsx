import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b hairline sticky top-0 z-30 bg-[color:var(--color-bg)]/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl tracking-tight font-semibold">
          dave
          <span className="text-[color:var(--color-accent)]">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-[color:var(--color-ink)]'
                    : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="h-10 w-10 grid place-items-center"
        >
          <span className="block w-5 h-px bg-[color:var(--color-ink)] relative before:content-[''] before:absolute before:w-5 before:h-px before:bg-[color:var(--color-ink)] before:-top-1.5 after:content-[''] after:absolute after:w-5 after:h-px after:bg-[color:var(--color-ink)] after:top-1.5" />
        </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t hairline bg-[color:var(--color-bg)]">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b hairline ${
                  isActive ? 'text-[color:var(--color-ink)]' : 'text-[color:var(--color-muted)]'
                }`
              }
            >
              <span className="font-display text-lg">{l.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
