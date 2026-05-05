'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
]

export function Navigation() {
  const [activeId, setActiveId] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--brand-border)] bg-[var(--brand-bg)]/85 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('inicio')}
            className="font-mono text-base font-bold text-[var(--brand-text)]"
            aria-label="Ir al inicio"
          >
            SR<span className="text-[var(--brand-cyan)]">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`text-sm transition-colors ${
                    activeId === id
                      ? 'text-[var(--brand-cyan)] border-b border-[var(--brand-cyan)] pb-0.5'
                      : 'text-[var(--brand-muted)] hover:text-[var(--brand-text)]'
                  }`}
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark/light toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* CTA desktop */}
            <button
              onClick={() => scrollTo('contacto')}
              className="hidden md:inline-flex font-mono text-xs text-[var(--brand-cyan)] border border-[var(--brand-cyan)]/30 px-4 py-2 rounded hover:bg-[var(--brand-cyan)]/10 transition-colors"
              aria-label="Ir a contacto"
            >
              Contactar →
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 text-[var(--brand-muted)]"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--brand-bg)] flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-playfair italic text-3xl text-[var(--brand-text)] hover:text-[var(--brand-cyan)] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
