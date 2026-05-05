# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start development server
pnpm build     # Production build
pnpm start     # Run production server
pnpm lint      # Run Next.js ESLint
```

No test suite is configured.

## Architecture

Single-page portfolio built with **Next.js 15 App Router**, **TypeScript**, and **Tailwind CSS**. All content lives on a single route (`app/page.tsx`) that composes 8 section components stacked vertically. Navigation uses smooth scroll via `document.getElementById().scrollIntoView()` — there is no multi-page routing.

### Key architectural decisions

- **No backend.** The contact form constructs a WhatsApp Web URL with the encoded message and opens it in the browser — no API routes, no email service.
- **Build errors suppressed.** `next.config.mjs` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`. TypeScript and lint errors will not fail builds.
- **CSS variable theming.** `tailwind.config.ts` maps Tailwind color tokens (e.g. `bg-background`, `text-foreground`) to HSL CSS variables defined in `app/globals.css`. Dark mode is class-based (`darkMode: ["class"]`), toggled by `ThemeProvider` in `components/theme-provider.tsx`.
- **shadcn/ui component model.** UI primitives live in `components/ui/` and are owned by this repo (not node_modules). Edit them directly to customize.
- **`@/` path alias** maps to the project root (configured in `tsconfig.json`).

### Component layout

| File | Role |
|---|---|
| `app/layout.tsx` | Root layout, metadata, ThemeProvider wrapper |
| `app/page.tsx` | Composes all section components |
| `components/header.tsx` | Fixed nav with mobile hamburger menu (`"use client"`) |
| `components/hero-section.tsx` | Profile photo, social links, CTA (`"use client"`) |
| `components/about-section.tsx` | Bio and skill cards |
| `components/experience-section.tsx` | Career timeline |
| `components/skills-section.tsx` | Grouped technical skills |
| `components/projects-section.tsx` | 3 featured projects |
| `components/contact-section.tsx` | Form → WhatsApp redirect (`"use client"`) |
| `components/footer.tsx` | Footer |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |

### When to use `"use client"`

Only components that use browser APIs (`document`, `window`), React state/hooks, or event handlers need the `"use client"` directive. Pure display components should remain Server Components.

## Project context

- **Owner:** Santiago Rodríguez — Full Stack Developer based in Bogotá, Colombia
- **Origin:** Generated and synced via [v0.dev](https://v0.dev); deployed to Vercel
- **Stack focus:** .NET Core, React, Next.js, TypeScript, SQL Server
