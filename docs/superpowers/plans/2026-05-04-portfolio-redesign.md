# Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar el portafolio de nivel "generado por IA" a nivel editorial profesional "Technical Dark Editorial" con paleta oscura, tipografía contrastante y animaciones con framer-motion, usando un approach foundation-first incremental.

**Architecture:** Foundation-first — primero cimientos (CSS vars, fuentes, globals), luego cada componente se construye en su propio archivo nuevo. Los componentes viejos (`header.tsx`, `hero-section.tsx`, etc.) se mantienen intactos hasta Task 12 donde se hace el swap final en `page.tsx`. El sitio queda deployable en todo momento.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS · framer-motion · next-themes · puppeteer (dev) · next/font/google

---

## File Map

| Acción | Archivo |
|---|---|
| Modify | `package.json` — add framer-motion, puppeteer |
| Modify | `tailwind.config.ts` — brand colors + font families |
| Modify | `app/globals.css` — brand CSS variables, grain overlay, cursor styles |
| Modify | `app/layout.tsx` — next/font, metadata, ThemeProvider, CustomCursor, lang |
| Create | `components/CustomCursor.tsx` |
| Create | `components/Navigation.tsx` |
| Create | `components/Hero.tsx` |
| Create | `components/About.tsx` |
| Create | `components/Experience.tsx` |
| Create | `components/Projects.tsx` |
| Create | `scripts/capture-screenshots.ts` |
| Create | `public/screenshots/` (populated by Puppeteer script) |
| Create | `public/cv/CV_Santiago_Rodriguez_2026.pdf` (manual upload) |
| Create | `components/Skills.tsx` |
| Create | `components/Certifications.tsx` |
| Create | `components/Contact.tsx` |
| Modify | `app/page.tsx` — swap old components for new ones |

---

## Task 1: Instalar dependencias

**Files:** `package.json`

- [ ] **Instalar framer-motion y puppeteer**

```bash
cd "C:/Users/santi/Desktop/DESARROLLOS/Portafolio"
pnpm add framer-motion
pnpm add -D puppeteer
```

Expected: `node_modules/framer-motion` y `node_modules/puppeteer` presentes.

- [ ] **Verificar que el servidor de dev levanta sin errores**

```bash
pnpm dev
```

Expected: `✓ Ready in Xs` sin errores en consola.

- [ ] **Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add framer-motion and puppeteer dependencies"
```

---

## Task 2: Extender Tailwind con brand tokens y fuentes

**Files:** `tailwind.config.ts`

- [ ] **Reemplazar el contenido de `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        // shadcn/ui existing tokens — NO TOCAR
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // brand tokens — dark/light via CSS vars
        brand: {
          bg: "var(--brand-bg)",
          surface: "var(--brand-surface)",
          cyan: "var(--brand-cyan)",
          blue: "#1D6FA0",
          text: "var(--brand-text)",
          muted: "var(--brand-muted)",
          border: "var(--brand-border)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

- [ ] **Confirmar que TypeScript no reporta errores en el config**

```bash
pnpm tsc --noEmit
```

Expected: Sin errores.

- [ ] **Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: extend tailwind with brand tokens and font families"
```

---

## Task 3: CSS global — variables de marca, grain overlay, cursor

**Files:** `app/globals.css`

- [ ] **Reemplazar el contenido de `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Brand tokens ─────────────────────────────────────────── */
:root {
  /* shadcn/ui — light */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
  --sidebar-background: 0 0% 98%;
  --sidebar-foreground: 240 5.3% 26.1%;
  --sidebar-primary: 240 5.9% 10%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 240 4.8% 95.9%;
  --sidebar-accent-foreground: 240 5.9% 10%;
  --sidebar-border: 220 13% 91%;
  --sidebar-ring: 217.2 91.2% 59.8%;

  /* brand — light mode */
  --brand-bg: #F4F6F9;
  --brand-surface: #FFFFFF;
  --brand-cyan: #1D6FA0;
  --brand-text: #0A0A0F;
  --brand-muted: #4A5568;
  --brand-border: rgba(29, 111, 160, 0.15);
}

.dark {
  /* shadcn/ui — dark */
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
  --sidebar-background: 240 5.9% 10%;
  --sidebar-foreground: 240 4.8% 95.9%;
  --sidebar-primary: 224.3 76.3% 48%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 240 3.7% 15.9%;
  --sidebar-accent-foreground: 240 4.8% 95.9%;
  --sidebar-border: 240 3.7% 15.9%;
  --sidebar-ring: 217.2 91.2% 59.8%;

  /* brand — dark mode */
  --brand-bg: #0A0A0F;
  --brand-surface: #0F0F18;
  --brand-cyan: #00E5FF;
  --brand-text: #E8EDF2;
  --brand-muted: #7A8899;
  --brand-border: rgba(0, 229, 255, 0.12);
}

/* ── Base ─────────────────────────────────────────────────── */
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans;
    background-color: var(--brand-bg);
    color: var(--brand-text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  html {
    scroll-behavior: smooth;
  }
}

/* ── Grain overlay ────────────────────────────────────────── */
.grain-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9990;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* ── Custom cursor — ocultar cursor nativo en desktop ─────── */
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}

/* ── Utilities ───────────────────────────────────────────── */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Verificar en el navegador** que `pnpm dev` carga y el fondo es blanco (light mode default)

Expected: Fondo `#F4F6F9`, texto oscuro. El toggle dark/light aún no funciona porque ThemeProvider no está en layout.tsx todavía — esto se corrige en Task 4.

- [ ] **Commit**

```bash
git add app/globals.css
git commit -m "feat: add brand CSS variables, grain overlay and cursor base styles"
```

---

## Task 4: Actualizar `layout.tsx` — fuentes, metadata, ThemeProvider, CustomCursor

**Files:** `app/layout.tsx`

- [ ] **Reemplazar `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { DM_Sans, Space_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CustomCursor } from '@/components/CustomCursor'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Santiago Rodríguez — Desarrollador Full Stack Senior | .NET · React',
  description:
    'Desarrollador Full Stack con 6+ años en .NET 8 y React. Especializado en ERPs empresariales, CI/CD con Azure DevOps y proyectos en producción. Bogotá, Colombia.',
  keywords: [
    'desarrollador .net bogota',
    'full stack developer colombia',
    'react developer bogota',
    'desarrollador senior colombia',
  ],
  openGraph: {
    title: 'Santiago Rodríguez — Desarrollador Full Stack Senior',
    description: '6 años en .NET 8 y React. Proyectos en producción. Bogotá, Colombia.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${spaceMono.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="grain-overlay" aria-hidden="true" />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Nota: `suppressHydrationWarning` en `<html>` es requerido por next-themes para evitar mismatch al cambiar la clase `dark`.

- [ ] **Verificar que `CustomCursor` todavía no existe — el servidor de dev dará error de módulo. Continuar con Task 5 de inmediato.**

- [ ] **NO commitear hasta que CustomCursor exista (Task 5)**

---

## Task 5: Componente `CustomCursor`

**Files:** `components/CustomCursor.tsx`

- [ ] **Crear `components/CustomCursor.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const addInteractiveListeners = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => { hovering.current = true })
        el.addEventListener('mouseleave', () => { hovering.current = false })
      })
    }

    const loop = () => {
      const { x: mx, y: my } = mouse.current
      const lerp = 0.1

      // dot: follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 2}px, ${my - 2}px)`
      }

      // ring: lerp toward mouse
      ring.current.x += (mx - ring.current.x) * lerp
      ring.current.y += (my - ring.current.y) * lerp

      if (ringRef.current) {
        const size = hovering.current ? 48 : 32
        const half = size / 2
        ringRef.current.style.transform = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.backgroundColor = hovering.current
          ? 'rgba(0, 229, 255, 0.1)'
          : 'transparent'
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    addInteractiveListeners()
    rafRef.current = requestAnimationFrame(loop)

    // Re-add listeners when DOM changes (e.g. after navigation)
    const observer = new MutationObserver(addInteractiveListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full bg-[var(--brand-cyan)]"
        style={{ width: 4, height: 4, willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block rounded-full border border-[var(--brand-cyan)]/50 transition-[width,height,background-color] duration-150"
        style={{ width: 32, height: 32, willChange: 'transform' }}
      />
    </>
  )
}
```

- [ ] **Verificar en el navegador**:
  - Cursor nativo desaparece en desktop
  - Punto cian sigue al mouse exactamente
  - Ring de 32px sigue con delay suave
  - Ring se expande a 48px al pasar sobre links/buttons
  - En mobile (o emulación móvil en DevTools) el cursor custom no aparece

- [ ] **Commit** (incluye layout.tsx y CustomCursor.tsx)

```bash
git add app/layout.tsx components/CustomCursor.tsx
git commit -m "feat: add custom cursor with dot+ring lerp animation"
```

---

## Task 6: Componente `Navigation`

**Files:** `components/Navigation.tsx`

- [ ] **Crear `components/Navigation.tsx`**

```tsx
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
```

- [ ] **Verificar en el navegador** (el componente aún no está en page.tsx — verificar importándolo temporalmente o proceder directo a task 7)

- [ ] **Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: add Navigation with scroll spy, dark/light toggle and mobile menu"
```

---

## Task 7: Componente `Hero`

**Files:** `components/Hero.tsx`

- [ ] **Crear `components/Hero.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[var(--brand-bg)]"
    >
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--brand-cyan) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--brand-cyan)] mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-6 h-px bg-[var(--brand-cyan)]" />
              DISPONIBLE PARA PROYECTOS · BOGOTÁ, CO
            </motion.p>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-playfair italic text-[72px] lg:text-[96px] leading-[0.9] text-[var(--brand-text)] mb-6 tracking-tight"
            >
              Santiago
              <br />
              Rodríguez
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-lg text-[var(--brand-muted)] mb-10 leading-relaxed"
            >
              Desarrollador Full Stack Senior
              <br />
              <span className="text-[var(--brand-text)] font-medium">
                .NET 8 · React · TypeScript · Azure DevOps
              </span>
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('proyectos')}
                className="px-8 py-3 rounded-md bg-[var(--brand-cyan)] text-[#0A0A0F] font-semibold text-sm hover:opacity-90 transition-opacity"
                aria-label="Ver proyectos"
              >
                → Ver proyectos
              </button>
              <a
                href="/cv/CV_Santiago_Rodriguez_2026.pdf"
                download
                className="px-8 py-3 rounded-md border border-[var(--brand-text)]/20 text-[var(--brand-text)] font-medium text-sm hover:bg-[var(--brand-text)]/5 transition-colors text-center"
                aria-label="Descargar CV en PDF"
              >
                ↓ Descargar CV
              </a>
            </motion.div>
          </div>

          {/* Right: code block — hidden on mobile */}
          <motion.div
            {...fadeUp(0.4)}
            className="hidden lg:block"
            style={{ rotate: -2 }}
          >
            <div className="bg-[#0D1117] border border-[var(--brand-cyan)]/15 rounded-xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,229,255,0.06)] font-mono text-[13px] leading-[1.9]">
              {/* window chrome */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 text-[10px] text-[#444] tracking-wide">migration.cs</span>
              </div>
              <pre className="whitespace-pre-wrap overflow-hidden">
                <span className="text-[#6A737D]">{'// Migración paralela con SignalR\n'}</span>
                <span className="text-[#F97583]">await </span>
                <span className="text-[#B392F0]">Parallel</span>
                <span className="text-[#E8EDF2]">.</span>
                <span className="text-[#B392F0]">ForEachAsync</span>
                <span className="text-[#E8EDF2]">{'(proveedores,\n'}</span>
                <span className="text-[#E8EDF2]">{'  '}</span>
                <span className="text-[#F97583]">new </span>
                <span className="text-[#79B8FF]">ParallelOptions</span>
                <span className="text-[#E8EDF2]">{' {\n'}</span>
                <span className="text-[#E8EDF2]">{'    MaxDegreeOfParallelism = '}</span>
                <span className="text-[#79B8FF]">8</span>
                <span className="text-[#E8EDF2]">{'\n  },\n'}</span>
                <span className="text-[#F97583]">{'  async '}</span>
                <span className="text-[#E8EDF2]">{'(proveedor, ct) => {\n'}</span>
                <span className="text-[#F97583]">{'    await '}</span>
                <span className="text-[#B392F0]">MigrarProveedorAsync</span>
                <span className="text-[#E8EDF2]">{'(proveedor, ct);\n'}</span>
                <span className="text-[#F97583]">{'    await '}</span>
                <span className="text-[#E8EDF2]">{'_hub.Clients.All\n'}</span>
                <span className="text-[#E8EDF2]">{'      .'}</span>
                <span className="text-[#B392F0]">SendAsync</span>
                <span className="text-[#E8EDF2]">{'(\n        '}</span>
                <span className="text-[#9ECBFF]">"ProgresoActualizado"</span>
                <span className="text-[#E8EDF2]">{',\n        '}</span>
                <span className="text-[#00E5FF]">++procesados</span>
                <span className="text-[#E8EDF2]">{', total, ct);\n'}</span>
                <span className="text-[#E8EDF2]">{'  });\n'}</span>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with code block, dot grid and framer-motion animations"
```

---

## Task 8: Componente `About`

**Files:** `components/About.tsx`

- [ ] **Crear `components/About.tsx`**

```tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface StatProps {
  value: number
  suffix?: string
  label: string
}

function AnimatedStat({ value, suffix = '', label }: StatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: 1500, bounce: 0 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, motionVal, value])

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v).toString()))
  }, [spring])

  return (
    <div className="text-center p-6 border border-[var(--brand-border)] rounded-xl bg-[var(--brand-surface)]">
      <div className="font-mono text-4xl font-bold text-[var(--brand-cyan)] mb-1">
        <span ref={ref}>{display}</span>
        {suffix}
      </div>
      <p className="text-sm text-[var(--brand-muted)]">{label}</p>
    </div>
  )
}

export function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-[var(--brand-bg)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[var(--brand-cyan)] tracking-widest uppercase mb-3"
        >
          // 02
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-playfair italic text-4xl lg:text-5xl text-[var(--brand-text)] mb-16"
        >
          Sobre mí
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Text — 60% */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-5 text-[var(--brand-muted)] text-lg leading-relaxed"
          >
            <p>
              Construyo software que resuelve{' '}
              <span className="text-[var(--brand-text)] font-medium">
                problemas reales de negocio
              </span>{' '}
              —no solo features.
            </p>
            <p>
              Con 6 años en el ERP empresarial{' '}
              <span className="text-[var(--brand-text)] font-medium">SINCO</span> he aprendido
              que el código de calidad se mide en impacto: migrar{' '}
              <span className="text-[var(--brand-cyan)] font-mono text-base">
                1.500 proveedores en 20 minutos
              </span>{' '}
              en lugar de 60, o construir desde cero el módulo de cumplimiento que hoy evalúa a
              cientos de proveedores bajo normativa SAGRILAFT.
            </p>
            <p>
              Trabajo con el stack que domino —
              <span className="text-[var(--brand-text)] font-medium">
                .NET 8, React, TypeScript
              </span>
              — y con las herramientas que aceleran la entrega: Cursor, GitHub Copilot, Azure
              DevOps CI/CD.
            </p>
          </motion.div>

          {/* Stats — 40% */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            <AnimatedStat value={6} suffix="+" label="años de experiencia" />
            <AnimatedStat value={3} label="proyectos en producción" />
            <AnimatedStat value={67} suffix="%" label="reducción en tiempo de ejecución" />
            <AnimatedStat value={5} label="certificaciones activas" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About section with animated stat counters"
```

---

## Task 9: Componente `Experience` — Timeline interactivo

**Files:** `components/Experience.tsx`

- [ ] **Crear `components/Experience.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExperienceItem {
  id: string
  company: string
  period: string
  role: string
  bullets: string[]
  stack: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'sinco-srm',
    company: 'Sincosoft — SRM / Adproveedor',
    period: 'May 2024 – Abr 2026',
    role: 'Desarrollador Full Stack Senior',
    bullets: [
      'Migración paralela (−67% tiempo): Rediseñé el proceso de migración de 1.500+ proveedores desde CSV, reemplazando ejecución síncrona por procesamiento paralelo en .NET. Tiempo: de 60 → 20 minutos. Implementé SignalR para progreso en tiempo real, eliminando el polling.',
      'Módulo de cumplimiento SAGRILAFT (end-to-end): Diseñé y desarrollé desde el análisis del requerimiento hasta producción: dashboard de control, alertas por vencimiento, notificaciones email e integraciones con APIs externas (TusDatos, Inspektor, Compliance).',
      'Integraciones con proveedores externos: Implementé consumo de APIs REST para verificación de datos, cubriendo autenticación, normalización de respuestas y trazabilidad.',
    ],
    stack: ['.NET 8', 'C#', 'ASP.NET Core', 'Entity Framework', 'SignalR', 'React', 'TypeScript', 'Zustand', 'TanStack Query', 'Material-UI', 'SQL Server', 'Azure DevOps'],
  },
  {
    id: 'sinco-goldenberry',
    company: 'Sincosoft — GoldenBerry',
    period: 'Sep 2021 – May 2024',
    role: 'Desarrollador Full Stack',
    bullets: [
      'Diseño e implementación de interfaces web desde prototipos Figma con React, TypeScript y Material-UI.',
      'Desarrollo y mantenimiento de APIs .NET Framework y ASP Classic para el ERP empresarial.',
      'Optimización de queries SQL complejos y estabilización de funcionalidades en producción.',
    ],
    stack: ['.NET Framework', 'ASP Classic', 'React', 'TypeScript', 'SQL Server', 'Git'],
  },
  {
    id: 'sinco-maquinaria',
    company: 'Sincosoft — Maquinaria y Equipos',
    period: 'Sep 2019 – Sep 2021',
    role: 'Desarrollador Junior → Mid',
    bullets: [
      'Desarrollo del submódulo contable del ERP SINCO con ASP.NET y Web API.',
      'Evolución progresiva de páginas ASP Server hacia arquitecturas modernas.',
    ],
    stack: ['ASP.NET', '.NET Framework', 'SQL Server', 'Web API', 'JavaScript'],
  },
  {
    id: 'mqa',
    company: 'MQA Suramérica',
    period: 'Mar – Sep 2019',
    role: 'Desarrollador',
    bullets: ['Angular, servicios Rollbase, apps móviles con NativeScript.'],
    stack: ['Angular', 'NativeScript', 'Rollbase'],
  },
  {
    id: 'topgroup',
    company: 'TopGroup S.A.',
    period: 'Dic 2018 – Mar 2019',
    role: 'Desarrollador',
    bullets: ['MySQL, Informix, 4GL, ShellScript.'],
    stack: ['MySQL', 'Informix', '4GL', 'ShellScript'],
  },
]

export function Experience() {
  const [activeId, setActiveId] = useState<string>('sinco-srm')

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? '' : id))

  return (
    <section id="experiencia" className="py-24 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[var(--brand-cyan)] tracking-widest uppercase mb-3"
        >
          // 03
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-playfair italic text-4xl lg:text-5xl text-[var(--brand-text)] mb-16"
        >
          Experiencia
        </motion.h2>

        <div className="relative">
          {/* vertical line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--brand-cyan)] to-transparent hidden md:block"
          />

          <div className="space-y-8 md:pl-10">
            {EXPERIENCES.map((exp, index) => {
              const isActive = activeId === exp.id
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                >
                  {/* timeline dot — desktop */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[41px] top-[6px] w-3.5 h-3.5 rounded-full border-2 hidden md:block transition-all duration-300 ${
                      isActive
                        ? 'border-[var(--brand-cyan)] bg-[var(--brand-cyan)] shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                        : 'border-[var(--brand-muted)] bg-[var(--brand-bg)]'
                    }`}
                  />

                  {/* Header — clickable */}
                  <button
                    className="w-full text-left group"
                    onClick={() => toggle(exp.id)}
                    onKeyDown={(e) => e.key === 'Enter' && toggle(exp.id)}
                    aria-expanded={isActive}
                    aria-label={`${exp.company} — ${exp.role}. ${isActive ? 'Colapsar' : 'Expandir'}`}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <span
                        className={`font-semibold text-base transition-colors ${
                          isActive
                            ? 'text-[var(--brand-text)]'
                            : 'text-[var(--brand-muted)] group-hover:text-[var(--brand-text)]'
                        }`}
                      >
                        {exp.company}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--brand-muted)] tracking-wide shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <p
                      className={`text-sm transition-colors ${
                        isActive ? 'text-[var(--brand-cyan)]' : 'text-[var(--brand-muted)]'
                      }`}
                    >
                      {exp.role}
                    </p>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 pb-2">
                          <ul className="space-y-3 mb-5" role="list">
                            {exp.bullets.map((bullet, i) => (
                              <li
                                key={i}
                                className="flex gap-3 text-sm text-[var(--brand-muted)] leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="text-[var(--brand-cyan)] mt-0.5 shrink-0 text-[10px] font-mono"
                                >
                                  ▸
                                </span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2" role="list" aria-label="Stack tecnológico">
                            {exp.stack.map((tech) => (
                              <span
                                key={tech}
                                role="listitem"
                                className="font-mono text-[10px] px-2 py-1 rounded bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] border border-[var(--brand-cyan)]/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Verificar manualmente** al integrar en Task 12:
  - Click en hito expande/colapsa con animación suave
  - Solo un hito está expandido a la vez
  - El primer hito está expandido por defecto
  - Dot del hito activo tiene glow cian
  - Tab key navega entre hitos, Enter los expande
  - En mobile la línea vertical desaparece

- [ ] **Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: add Experience interactive timeline with framer-motion accordion"
```

---

## Task 10: Componente `Projects` + script de capturas

**Files:** `components/Projects.tsx`, `scripts/capture-screenshots.ts`

- [ ] **Crear `scripts/capture-screenshots.ts`**

```ts
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const PROJECTS = [
  { slug: 'seleccionadm', url: 'https://v0-sistema-de-administracion-de-pro.vercel.app/' },
  { slug: 'buhos-co',     url: 'https://buhosnocturnos.co/' },
  { slug: 'buhos-com',    url: 'https://buhosnocturnos.com/' },
  { slug: 'iedbagazal',   url: 'https://iedbagazal.edu.co/' },
]

async function capture() {
  const outDir = path.join(process.cwd(), 'public', 'screenshots')
  fs.mkdirSync(outDir, { recursive: true })

  const browser = await puppeteer.launch({ headless: true })

  for (const { slug, url } of PROJECTS) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30_000 })
      // Wait for visual settle
      await new Promise((r) => setTimeout(r, 2000))
      await page.screenshot({
        path: path.join(outDir, `${slug}.png`) as `${string}.png`,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
      })
      console.log(`✓ ${slug}`)
    } catch (e) {
      console.error(`✗ ${slug}:`, e)
    } finally {
      await page.close()
    }
  }

  await browser.close()
}

capture()
```

- [ ] **Ejecutar el script** (requiere conexión a internet)

```bash
npx ts-node --esm scripts/capture-screenshots.ts
```

Si `ts-node` no está disponible:
```bash
pnpm add -D ts-node
npx ts-node scripts/capture-screenshots.ts
```

Expected: 4 archivos PNG en `public/screenshots/`. Si alguna URL falla, el error se imprime pero el script continúa.

- [ ] **Crear placeholder para el bot de WhatsApp**

El proyecto 5 es privado — crear `public/screenshots/bot-whatsapp.png` como imagen de placeholder. La forma más rápida es hacer una captura de pantalla del chat de WhatsApp al abrir el link de prueba, o usar una imagen verde 1280×800. Para este paso: copiar manualmente cualquier imagen PNG y renombrarla a `bot-whatsapp.png`.

```bash
# Alternativa: crea un SVG placeholder convertido a PNG, o copia una imagen existente
ls public/screenshots/
```

Expected: 5 archivos `.png` en `public/screenshots/`.

- [ ] **Crear `components/Projects.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface Project {
  slug: string
  title: string
  type: string
  description: string
  url: string
  stack: string[]
  accent: string
}

const PROJECTS: Project[] = [
  {
    slug: 'seleccionadm',
    title: 'Sistema Selección Admins PH',
    type: 'Aplicación web · SaaS',
    description:
      'Plataforma que digitaliza la selección de administradores para conjuntos residenciales colombianos según Ley 675 de 2001. Evaluación ponderada automática, votación individual por consejero, resultados en tiempo real con semáforo visual, exportación PDF y Excel.',
    url: 'https://v0-sistema-de-administracion-de-pro.vercel.app/',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: '#2563EB',
  },
  {
    slug: 'buhos-co',
    title: 'Búhos Nocturnos .co',
    type: 'E-commerce · Geolocalización',
    description:
      'Sitio corporativo de licorería nocturna con cobertura en Bogotá y Soacha. Selector de zona por mapa interactivo, catálogo de productos, integración directa con WhatsApp Business, SEO optimizado para búsquedas locales y Google Tag Manager.',
    url: 'https://buhosnocturnos.co/',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GTM', 'WhatsApp API'],
    accent: '#7C3AED',
  },
  {
    slug: 'buhos-com',
    title: 'Búhos Nocturnos .com',
    type: 'Plataforma web full stack',
    description:
      'Plataforma web con funcionalidades avanzadas de gestión para la operación interna del negocio, desarrollada con stack completo .NET Core + React + SQL Server.',
    url: 'https://buhosnocturnos.com/',
    stack: ['React', 'Next.js', '.NET Core', 'SQL Server'],
    accent: '#7C3AED',
  },
  {
    slug: 'iedbagazal',
    title: 'IED Bagazal',
    type: 'Portal educativo · Pro-bono',
    description:
      'Portal educativo para institución pública de Bogotá. Sistema de gestión de contenidos, comunicación con la comunidad educativa y publicación de información institucional. Proyecto de impacto social.',
    url: 'https://iedbagazal.edu.co/',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    accent: '#059669',
  },
  {
    slug: 'bot-whatsapp',
    title: 'Bot Agendamiento WhatsApp',
    type: 'Bot · Automatización · Privado',
    description:
      'Bot conversacional integrado con la API oficial de WhatsApp Business para automatización de agendamiento de citas. Manejo de flujos conversacionales, persistencia de estado y respuestas automáticas con lógica de negocio configurable.',
    url: 'https://api.whatsapp.com/send/?phone=%2B573505130893&text&type=phone_number&app_absent=0',
    stack: ['Node.js', 'NestJS', 'WhatsApp Cloud API'],
    accent: '#16A34A',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group flex flex-col bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-xl overflow-hidden hover:border-[var(--brand-cyan)]/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
    >
      {/* Browser frame + screenshot */}
      <div className="relative aspect-video bg-[#0D1117] overflow-hidden">
        {/* Browser chrome */}
        <div className="absolute top-0 left-0 right-0 z-10 h-7 bg-[#1a1a2e] border-b border-white/5 flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
          <div className="ml-2 flex-1 h-4 bg-white/5 rounded-full" aria-hidden="true" />
        </div>

        {/* Screenshot */}
        <Image
          src={`/screenshots/${project.slug}.png`}
          alt={`Preview de ${project.title}`}
          fill
          className="object-cover object-top mt-7"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <span className="font-mono text-xs text-white tracking-widest uppercase">
            Ver proyecto ↗
          </span>
        </div>

        {/* Type badge */}
        <div
          className="absolute top-9 left-3 z-10 font-mono text-[9px] px-2 py-0.5 rounded tracking-wider uppercase text-white"
          style={{ backgroundColor: project.accent }}
          aria-label={`Tipo: ${project.type}`}
        >
          {project.type}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-semibold text-[var(--brand-text)] text-base leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--brand-muted)] leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Stack tecnológico">
          {project.stack.map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--brand-muted)] border border-white/8"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-cyan)] hover:underline mt-1"
          aria-label={`Ver proyecto ${project.title} en nueva pestaña`}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Ver proyecto
        </a>
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-[var(--brand-bg)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[var(--brand-cyan)] tracking-widest uppercase mb-3"
        >
          // 04
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-playfair italic text-4xl lg:text-5xl text-[var(--brand-text)] mb-16"
        >
          Proyectos
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**

```bash
git add components/Projects.tsx scripts/capture-screenshots.ts public/screenshots/
git commit -m "feat: add Projects section with browser frame cards and screenshot capture script"
```

---

## Task 11: Componente `Skills`

**Files:** `components/Skills.tsx`

- [ ] **Crear `components/Skills.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
  label: string
  percent: number
  tags: string
}

const SKILLS: Skill[] = [
  { label: 'Backend',        percent: 92, tags: '.NET 8 · C# · ASP.NET · Entity Framework · SignalR · Node.js' },
  { label: 'Frontend',       percent: 88, tags: 'React · Next.js · TypeScript · Zustand · TanStack Query · MUI' },
  { label: 'Bases de datos', percent: 80, tags: 'SQL Server · MySQL · Supabase' },
  { label: 'DevOps',         percent: 65, tags: 'Azure DevOps · CI/CD · Git · Docker (básico)' },
  { label: 'IA Tools',       percent: 65, tags: 'Cursor · GitHub Copilot · Claude · V0' },
]

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="font-mono text-[11px] text-[var(--brand-muted)] min-w-[120px] tracking-wide">
        {skill.label}
      </span>
      <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--brand-cyan)] to-[#1D6FA0]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percent}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.08 }}
          aria-valuenow={skill.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`${skill.label}: ${skill.percent}%`}
        />
      </div>
      <span className="text-[11px] text-[var(--brand-muted)] hidden lg:block max-w-[240px] truncate">
        {skill.tags}
      </span>
    </div>
  )
}

export function Skills() {
  return (
    <section id="habilidades" className="py-24 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[var(--brand-cyan)] tracking-widest uppercase mb-3"
        >
          // 05
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-playfair italic text-4xl lg:text-5xl text-[var(--brand-text)] mb-16"
        >
          Habilidades
        </motion.h2>

        <div className="space-y-6 mb-12">
          {SKILLS.map((skill, index) => (
            <SkillBar key={skill.label} skill={skill} index={index} />
          ))}
        </div>

        {/* Learning block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-mono text-sm text-[var(--brand-muted)] px-5 py-4 bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-lg"
        >
          🔄&nbsp; En proceso: AWS · RabbitMQ / Kafka · Inglés B2 (mejora activa)
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: add Skills section with animated progress bars"
```

---

## Task 12: Componente `Certifications`

**Files:** `components/Certifications.tsx`

- [ ] **Crear `components/Certifications.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface Cert {
  name: string
  date: string
  url: string
}

const CERTS: Cert[] = [
  {
    name: 'Azure DevOps: CI/CD',
    date: 'Dic 2025',
    url: 'https://platzi.com/p/SantiagoR019/curso/3275-course/diploma/detalle/',
  },
  {
    name: 'Código Limpio en C#',
    date: 'Dic 2025',
    url: 'https://platzi.com/p/SantiagoR019/curso/4788-course/diploma/detalle/',
  },
  {
    name: 'Principios SOLID en C# y .NET',
    date: 'Dic 2025',
    url: 'https://platzi.com/p/SantiagoR019/curso/4761-solid-csharp-net/diploma/detalle/',
  },
  {
    name: 'React.js',
    date: 'Jul 2023',
    url: 'https://platzi.com/p/SantiagoR019/curso/7395-course/diploma/detalle/',
  },
  {
    name: 'TypeScript Fundamentos',
    date: 'Ene 2023',
    url: 'https://platzi.com/p/SantiagoR019/curso/2878-typescript/diploma/detalle/',
  },
]

export function Certifications() {
  return (
    <section className="py-24 bg-[var(--brand-bg)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[var(--brand-cyan)] tracking-widest uppercase mb-3"
        >
          // 06
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-playfair italic text-4xl lg:text-5xl text-[var(--brand-text)] mb-16"
        >
          Certificaciones
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTS.map((cert, index) => (
            <motion.a
              key={cert.url}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group flex flex-col gap-3 p-5 bg-[var(--brand-surface)] border border-[var(--brand-border)] rounded-xl hover:border-[var(--brand-cyan)]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.06)] transition-all duration-300"
              aria-label={`Ver diploma de ${cert.name} en Platzi`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--brand-muted)] tracking-wider uppercase">
                  Platzi
                </span>
                <span className="font-mono text-[10px] text-[var(--brand-cyan)]">{cert.date}</span>
              </div>
              <p className="text-sm font-medium text-[var(--brand-text)] leading-snug flex-1">
                {cert.name}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--brand-muted)] group-hover:text-[var(--brand-cyan)] transition-colors">
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                Ver diploma
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**

```bash
git add components/Certifications.tsx
git commit -m "feat: add Certifications section with Platzi diploma links"
```

---

## Task 13: Componente `Contact`

**Files:** `components/Contact.tsx`

- [ ] **Crear `components/Contact.tsx`**

```tsx
'use client'

import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react'

interface FormState {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

const ASUNTO_OPTIONS = ['Trabajo', 'Freelance', 'Consultoría', 'Otro']

export function Contact() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    asunto: 'Trabajo',
    mensaje: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text =
      `*Nuevo mensaje desde el portafolio*%0A%0A` +
      `*Nombre:* ${encodeURIComponent(form.nombre)}%0A` +
      `*Email:* ${encodeURIComponent(form.email)}%0A` +
      `*Asunto:* ${encodeURIComponent(form.asunto)}%0A%0A` +
      `*Mensaje:*%0A${encodeURIComponent(form.mensaje)}`
    window.open(`https://wa.me/573158824024?text=${text}`, '_blank', 'noopener,noreferrer')
    setForm({ nombre: '', email: '', asunto: 'Trabajo', mensaje: '' })
  }

  const inputClass =
    'w-full bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-md px-4 py-2.5 text-sm text-[var(--brand-text)] placeholder-[var(--brand-muted)] focus:outline-none focus:border-[var(--brand-cyan)]/60 transition-colors'

  return (
    <section id="contacto" className="py-24 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[var(--brand-cyan)] tracking-widest uppercase mb-3"
        >
          // 07
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair italic text-4xl lg:text-5xl text-[var(--brand-text)] mb-10 leading-tight">
              ¿Tienes un proyecto?
              <br />
              Hablemos.
            </h2>

            <ul className="space-y-5" role="list">
              {[
                {
                  icon: <Mail className="h-4 w-4" aria-hidden="true" />,
                  label: 'EMAIL',
                  value: 'santiago.rodriguez19@outlook.com',
                  href: 'mailto:santiago.rodriguez19@outlook.com',
                },
                {
                  icon: <Linkedin className="h-4 w-4" aria-hidden="true" />,
                  label: 'LINKEDIN',
                  value: '/in/santiago-rodriguezp/',
                  href: 'https://www.linkedin.com/in/santiago-rodriguezp/',
                },
                {
                  icon: <Github className="h-4 w-4" aria-hidden="true" />,
                  label: 'GITHUB',
                  value: '/santiago197',
                  href: 'https://github.com/santiago197',
                },
                {
                  icon: <MessageCircle className="h-4 w-4" aria-hidden="true" />,
                  label: 'WHATSAPP',
                  value: '+57 315 882 4024',
                  href: 'https://wa.me/573158824024',
                },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--brand-cyan)]/10 border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-cyan)] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-widest text-[var(--brand-muted)] uppercase mb-0.5">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--brand-text)] hover:text-[var(--brand-cyan)] transition-colors"
                      aria-label={`${item.label}: ${item.value}`}
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block font-mono text-[10px] text-[var(--brand-muted)] uppercase tracking-wider mb-1.5">
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] text-[var(--brand-muted)] uppercase tracking-wider mb-1.5">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="block font-mono text-[10px] text-[var(--brand-muted)] uppercase tracking-wider mb-1.5">
                  Asunto
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  value={form.asunto}
                  onChange={handleChange}
                  className={inputClass}
                  aria-label="Tipo de consulta"
                >
                  {ASUNTO_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block font-mono text-[10px] text-[var(--brand-muted)] uppercase tracking-wider mb-1.5">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto..."
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[var(--brand-cyan)] text-[#0A0A0F] font-mono text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
                aria-label="Enviar mensaje por WhatsApp"
              >
                ENVIAR POR WHATSAPP →
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact section with two-column layout and WhatsApp form"
```

---

## Task 14: Swap final — actualizar `page.tsx` + subir CV

**Files:** `app/page.tsx`, `public/cv/CV_Santiago_Rodriguez_2026.pdf`

- [ ] **Subir el CV al proyecto**

Copiar el archivo PDF al directorio:
```
public/cv/CV_Santiago_Rodriguez_2026.pdf
```

Verificar que existe:
```bash
ls public/cv/
```

Expected: `CV_Santiago_Rodriguez_2026.pdf`

- [ ] **Reemplazar `app/page.tsx`**

```tsx
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Certifications } from '@/components/Certifications'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
```

Nota: `Footer` se mantiene en `components/footer.tsx` existente. Se actualizará visualmente en el sweep de Task 15 si es necesario.

- [ ] **Verificar en el navegador** que el sitio completo se ve correctamente:
  - Fondo oscuro `#0A0A0F` en dark mode
  - Cursor custom funcional
  - Navegación fixed con scroll spy
  - Hero: nombre en Playfair italic, bloque de código a la derecha
  - About: texto + counters animados
  - Experience: primer hito expandido, click para otros
  - Projects: 5 cards con browser frame
  - Skills: barras animadas al scroll
  - Certifications: 3 columnas, link al diploma
  - Contact: dos columnas, form funcional
  - Toggle dark/light funcional

- [ ] **Verificar en mobile** (DevTools → iPhone 14 Pro):
  - Nav: hamburger abre overlay fullscreen
  - Hero: centrado, code block oculto
  - Experience: timeline sin línea vertical, expande como acordeón
  - Projects: 1 columna

- [ ] **Commit**

```bash
git add app/page.tsx public/cv/
git commit -m "feat: swap all components to new design, add CV download"
```

---

## Task 15: Sweep de responsive y accesibilidad

**Files:** Ajustes menores en componentes existentes según lo que se encuentre.

- [ ] **Verificar contraste en modo claro**

En DevTools → toggle al modo claro. Verificar que:
- El acento azul `#1D6FA0` sobre fondo `#F4F6F9` tiene ratio ≥ 4.5:1
- El texto `#0A0A0F` sobre `#F4F6F9` tiene ratio ~16:1 ✓

- [ ] **Verificar navegación por teclado**

Presionar Tab repetidamente desde el inicio de la página:
1. Deben ser accesibles: logo, links de nav, toggle de tema, botón CTA
2. En Experience: Tab llega a cada hito, Enter lo expande/colapsa
3. Links de proyectos y certificaciones accesibles con Tab

- [ ] **Verificar que `next/image` no genera errores de dominio**

Las imágenes en `public/screenshots/` son locales — no requieren configuración adicional en `next.config.mjs`. Si aparece un error de dominio para imágenes externas, agregar en `next.config.mjs`:

```js
const nextConfig = {
  images: {
    unoptimized: true,  // ya estaba en el config original
  },
}
```

- [ ] **Actualizar el Footer** para que respete el tema oscuro

Abrir `components/footer.tsx` y reemplazar cualquier color hardcodeado (como `bg-gray-*`) por variables de marca:

```tsx
// Buscar clases como bg-gray-900, text-white, etc.
// Reemplazar por: bg-[var(--brand-surface)] text-[var(--brand-muted)]
```

- [ ] **Commit final**

```bash
git add -A
git commit -m "fix: responsive and a11y sweep, update Footer to brand theme"
```

---

## Self-Review — Cobertura del spec

| Requisito del spec | Task que lo implementa |
|---|---|
| Estética dark editorial (`#0A0A0F`, cian, fuentes) | Task 2, 3, 4 |
| Grain overlay | Task 3 |
| Dark/light toggle | Task 4, 6 |
| CustomCursor dot+ring con lerp | Task 5 |
| Navigation scroll spy + mobile hamburger | Task 6 |
| Hero: Playfair italic 80px, code block rotado −2°, dot grid | Task 7 |
| Hero: CV download | Task 7, 14 |
| About: texto exacto + stats CountUp con framer-motion | Task 8 |
| Experience: timeline interactivo, hito activo por defecto | Task 9 |
| Proyectos: 5 cards con browser frame y screenshots Puppeteer | Task 10 |
| Skills: barras animadas + bloque "en proceso" | Task 11 |
| Certifications: 3 columnas + links Platzi | Task 12 |
| Contact: 2 columnas, form → WhatsApp con dropdown asunto | Task 13 |
| SEO metadata + lang="es" | Task 4 |
| Framer-motion tree-shaking | Tasks 7-13 (importaciones nombradas) |
| WCAG AA accesibilidad | Task 15 |
| Responsive mobile | Tasks 6-13 + Task 15 |

---

**Plan completo guardado en `docs/superpowers/plans/2026-05-04-portfolio-redesign.md`.**

**Dos opciones de ejecución:**

**1. Subagent-Driven (recomendado)** — despacho un subagente por task, reviso entre tasks, iteración rápida.

**2. Inline Execution** — ejecuto los tasks en esta misma sesión con checkpoints de revisión.

¿Cuál preferís?
