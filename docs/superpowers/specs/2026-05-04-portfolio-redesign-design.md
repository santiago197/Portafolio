# Portfolio Redesign — Design Spec
**Date:** 2026-05-04  
**Author:** Santiago Rodríguez  
**Status:** Approved

---

## Objetivo

Llevar el portafolio de nivel "generado por IA" a nivel editorial profesional competitivo con desarrolladores senior internacionales. El resultado debe transmitir seniority real, no una plantilla.

---

## Decisiones de diseño aprobadas

### Enfoque de implementación
**Opción B — Foundation-first incremental.** Los cimientos (CSS variables, fuentes, dark mode, navegación) se despliegan primero. Luego cada sección se reemplaza en orden. El sitio es deployable en Vercel en todo momento.

### Estética: "Technical Dark Editorial"
- Fondo principal: `#0A0A0F`
- Superficie de cards: `#0F0F18`
- Acento cian (uso quirúrgico): `#00E5FF`
- Azul profundo: `#1D6FA0`
- Texto principal: `#E8EDF2`
- Texto secundario: `#7A8899`

### Sistema tipográfico
| Fuente | Uso |
|---|---|
| `Playfair Display` italic | Nombre en hero, headlines grandes |
| `DM Sans` | Cuerpo, UI, subtítulos |
| `Space Mono` | Labels, tags, números, código |

Carga vía `next/font/google` para evitar FOUT.

### Tema claro / oscuro
Se mantiene el toggle dark/light. El dark es el modo por defecto. En modo claro el acento principal cambia de `#00E5FF` a `#1D6FA0` para mantener contraste WCAG AA.

### Contacto
Se mantiene la integración WhatsApp existente. **No se implementa EmailJS** en esta iteración. El formulario redirige a `wa.me/573158824024` con el mensaje pre-llenado.

### Bot de agendamiento WhatsApp
Proyecto privado sin URL pública. La card muestra el link de prueba: `https://api.whatsapp.com/send/?phone=%2B573505130893`.

---

## Arquitectura de componentes

```
app/
  layout.tsx          ← fuentes next/font, metadata SEO, ThemeProvider, CustomCursor
  page.tsx            ← composición de secciones
  globals.css         ← CSS vars dark/light, grain overlay, cursor styles, dot grid
components/
  Navigation.tsx      ← scroll spy con IntersectionObserver, blur backdrop, mobile hamburger
  Hero.tsx            ← Playfair Display, dot grid, code block flotante, CV download
  About.tsx           ← 60/40 layout, texto fijo, stats con CountUp
  Experience.tsx      ← timeline vertical, click/hover expande, stack chips
  Projects.tsx        ← grid cards, browser frame, screenshots /public/screenshots/
  Skills.tsx          ← barras animadas por categoría, bloque "en proceso"
  Certifications.tsx  ← grid 3 columnas, link a diploma Platzi
  Contact.tsx         ← 2 columnas, datos + form WhatsApp
  Footer.tsx
  CustomCursor.tsx    ← dot 4px + ring 32px con lerp rAF, oculto en mobile
components/ui/        ← shadcn/ui existente (Badge, Button, Input, Textarea)
public/
  screenshots/        ← capturas generadas con Puppeteer
    seleccionadm.png
    buhos-co.png
    buhos-com.png
    iedbagazal.png
    bot-whatsapp.png  ← placeholder (proyecto privado)
  cv/
    CV_Santiago_Rodriguez_2026.pdf
scripts/
  capture-screenshots.ts   ← Puppeteer, viewport 1280×800
```

---

## Secciones — detalle

### 00 · Navigation
- Posición: fixed top, z-50
- Fondo: `rgba(10,10,15,0.85)` + `backdrop-filter: blur(12px)`
- Logo: `SR.` en Space Mono, punto en cian
- Links: scroll spy via `IntersectionObserver` — link activo en cian con underline
- CTA: botón outline "Contactar →"
- Mobile: hamburger → menú fullscreen overlay
- Toggle dark/light en el extremo derecho

### 01 · Hero
Layout dos columnas (desktop): texto izquierda, code block derecha.

**Contenido exacto:**
```
[Space Mono, cian, 11px]  DISPONIBLE PARA PROYECTOS · BOGOTÁ, CO

[Playfair Display italic, 80px]
Santiago
Rodríguez

[DM Sans, 17px, muted]
Desarrollador Full Stack Senior
.NET 8 · React · TypeScript · Azure DevOps

[Botones]
→ Ver proyectos    ↓ Descargar CV
```

**Elementos decorativos:**
- Dot grid en el fondo: `radial-gradient` CSS puro, 32px de separación, `opacity: 0.25`
- Bloque de código real (C# SignalR), rotado `−2deg`, con syntax highlighting manual
- `box-shadow` para efecto de profundidad flotante

**Código del hero (literal):**
```csharp
// Migración paralela de proveedores con SignalR
await Parallel.ForEachAsync(proveedores,
  new ParallelOptions { MaxDegreeOfParallelism = 8 },
  async (proveedor, ct) => {
    await MigrarProveedorAsync(proveedor, ct);
    await _hub.Clients.All.SendAsync(
      "ProgresoActualizado",
      ++procesados, total, ct);
  });
```

**CV:** link a `/cv/CV_Santiago_Rodriguez_2026.pdf` con `download` attribute.

**Animación:** `framer-motion` stagger reveal — tag → nombre → rol → botones → código.

**Mobile:** texto centrado, code block oculto (`hidden md:block`).

### 02 · About
Layout 60/40 (desktop), stack en mobile.

**Texto (literal):**
> Construyo software que resuelve problemas reales de negocio —no solo features.
>
> Con 6 años en el ERP empresarial SINCO he aprendido que el código de calidad se mide en impacto: migrar 1.500 proveedores en 20 minutos en lugar de 60, o construir desde cero el módulo de cumplimiento que hoy evalúa a cientos de proveedores bajo normativa SAGRILAFT.
>
> Trabajo con el stack que domino —.NET 8, React, TypeScript— y con las herramientas que aceleran la entrega: Cursor, GitHub Copilot, Azure DevOps CI/CD.

**Stats (columna derecha, con CountUp al entrar viewport):**
| Número | Label |
|---|---|
| 6+ | años de experiencia |
| 3 | proyectos en producción |
| 67% | reducción en tiempo de ejecución |
| 5 | certificaciones activas |

CountUp animado con `framer-motion`: `useMotionValue` + `useSpring` para el número, `useInView` para disparar la animación al entrar en viewport. Sin librería CountUp externa.

### 03 · Experiencia — Timeline interactivo
Línea vertical a la izquierda con gradiente cian→transparente. Cada hito tiene punto circular; el activo tiene glow cian.

**Click/hover en hito:** expande descripción y stack con animación `framer-motion` (height: 0 → auto).
**Hito activo por defecto:** posición más reciente (Sincosoft SRM).
**Mobile:** colapsa a acordeón, la línea vertical desaparece.

**Contenido de posiciones (literal):**

**Sincosoft — SRM / Adproveedor** | May 2024 – Abr 2026 | Full Stack Senior
- Migración paralela (−67% tiempo): de 60 → 20 minutos. SignalR para progreso en tiempo real.
- Módulo de cumplimiento SAGRILAFT end-to-end: dashboard, alertas, notificaciones, APIs externas (TusDatos, Inspektor, Compliance).
- Integraciones REST con verificación de datos, autenticación, normalización y trazabilidad.
- Stack: `.NET 8` `C#` `ASP.NET Core` `Entity Framework` `SignalR` `React` `TypeScript` `Zustand` `TanStack Query` `Material-UI` `SQL Server` `Azure DevOps`

**Sincosoft — GoldenBerry** | Sep 2021 – May 2024 | Full Stack
- Interfaces desde prototipos Figma con React, TypeScript y Material-UI.
- APIs .NET Framework y ASP Classic para el ERP.
- Optimización de queries SQL complejos.
- Stack: `.NET Framework` `ASP Classic` `React` `TypeScript` `SQL Server` `Git`

**Sincosoft — Maquinaria y Equipos** | Sep 2019 – Sep 2021 | Junior → Mid
- Submódulo contable del ERP SINCO con ASP.NET y Web API.
- Evolución de páginas ASP Server hacia arquitecturas modernas.
- Stack: `ASP.NET` `.NET Framework` `SQL Server` `Web API` `JavaScript`

**MQA Suramérica** | Mar – Sep 2019
- Angular, servicios Rollbase, apps móviles NativeScript.

**TopGroup S.A.** | Dic 2018 – Mar 2019
- MySQL, Informix, 4GL, ShellScript.

### 04 · Proyectos — Cards con browser frame

Grid: 3 columnas desktop, 2 tablet, 1 mobile.

Cada card tiene:
1. **Browser frame** (barra con 3 dots de colores + URL bar) sobre screenshot vía `next/image`
2. **Badge de tipo** (top-left sobre imagen)
3. **Título + descripción**
4. **Stack chips**
5. **Botón "Ver proyecto ↗"** — abre en nueva pestaña
6. **Hover:** elevación (`translateY(-4px)` + `box-shadow`), borde cian iluminado, overlay oscuro con "Ver proyecto" centrado

**Los 5 proyectos:**

| # | Título | URL | Tipo | Accent |
|---|---|---|---|---|
| 1 | Sistema Selección Admins PH | `https://v0-sistema-de-administracion-de-pro.vercel.app/` | SaaS | `#2563EB` |
| 2 | Búhos Nocturnos .co | `https://buhosnocturnos.co/` | E-commerce | `#7C3AED` |
| 3 | Búhos Nocturnos .com | `https://buhosnocturnos.com/` | Plataforma full stack | `#7C3AED` |
| 4 | IED Bagazal | `https://iedbagazal.edu.co/` | Portal educativo | `#059669` |
| 5 | Bot Agendamiento WhatsApp | `https://api.whatsapp.com/send/?phone=%2B573505130893` | Bot / Privado | `#16A34A` |

Screenshots generados con `scripts/capture-screenshots.ts` (Puppeteer, 1280×800). El proyecto 5 usa placeholder con logo de WhatsApp.

### 05 · Habilidades — Barras animadas

```
Backend       ████████████  .NET 8 · C# · ASP.NET · Entity Framework · SignalR · Node.js
Frontend      ███████████░  React · Next.js · TypeScript · Zustand · TanStack Query · MUI
Bases de datos ██████████░░  SQL Server · MySQL · Supabase
DevOps        ████████░░░░  Azure DevOps · CI/CD · Git · Docker (básico)
IA Tools      ████████░░░░  Cursor · GitHub Copilot · Claude · V0
```

Barras animadas de 0 al valor final con `framer-motion` y `useInView`. Easing: `easeOut`.

Bloque adicional "En proceso":
```
🔄 AWS · RabbitMQ / Kafka · Inglés B2 (mejora activa)
```

### 06 · Certificaciones

Grid 3 columnas (desktop), 1 columna (mobile). Cada card:
- Logo/nombre de Platzi
- Nombre del curso
- Fecha
- Link al diploma (opens in new tab)
- Hover: glow cian + underline "Ver diploma →"

| Curso | Fecha | Link |
|---|---|---|
| Azure DevOps: CI/CD | Dic 2025 | https://platzi.com/p/SantiagoR019/curso/3275-course/diploma/detalle/ |
| Código Limpio en C# | Dic 2025 | https://platzi.com/p/SantiagoR019/curso/4788-course/diploma/detalle/ |
| Principios SOLID en C# y .NET | Dic 2025 | https://platzi.com/p/SantiagoR019/curso/4761-solid-csharp-net/diploma/detalle/ |
| React.js | Jul 2023 | https://platzi.com/p/SantiagoR019/curso/7395-course/diploma/detalle/ |
| TypeScript Fundamentos | Ene 2023 | https://platzi.com/p/SantiagoR019/curso/2878-typescript/diploma/detalle/ |

### 07 · Contacto

Dos columnas (desktop), stack en mobile.

**Columna izquierda:**
- Headline en Playfair Display italic: "¿Tienes un proyecto? Hablemos."
- Email: `santiago.rodriguez19@outlook.com`
- LinkedIn: `/in/santiago-rodriguezp/`
- GitHub: `/santiago197`
- WhatsApp: `+57 315 882 4024`

**Columna derecha — Form → WhatsApp:**
- Campos: Nombre, Email, Asunto (dropdown: Trabajo / Freelance / Consultoría / Otro), Mensaje
- Submit: abre `wa.me/573158824024` con mensaje codificado
- Botón: "ENVIAR POR WHATSAPP →" en cian

### CustomCursor
- Punto: `4px`, fondo cian, sigue exactamente al mouse
- Ring: `32px`, borde cian 1px, delay suave (lerp `0.1` en rAF)
- Hover sobre `a`, `button`: ring expande a `48px`, relleno cian `20% opacidad`
- Oculto con `@media (pointer: coarse)` (móviles)
- Solo activo en desktop (`hidden md:block` wrapper)

---

## SEO y Metadata

```tsx
export const metadata: Metadata = {
  title: 'Santiago Rodríguez — Desarrollador Full Stack Senior | .NET · React',
  description: 'Desarrollador Full Stack con 6+ años en .NET 8 y React. Especializado en ERPs empresariales, CI/CD con Azure DevOps y proyectos en producción. Bogotá, Colombia.',
  keywords: ['desarrollador .net bogota', 'full stack developer colombia', 'react developer bogota', 'desarrollador senior colombia'],
  openGraph: {
    title: 'Santiago Rodríguez — Desarrollador Full Stack Senior',
    description: '6 años en .NET 8 y React. Proyectos en producción. Bogotá, Colombia.',
    type: 'website',
  },
}
```

`lang="es"` en `<html>`.

---

## Performance

- `next/image` con `priority` en proyectos above-fold, `loading="lazy"` en el resto. El hero no usa imágenes — la columna derecha es el code block.
- Fuentes: `next/font/google` con `display: 'swap'`
- `framer-motion`: usar tree-shaking — importar sólo lo necesario: `motion`, `useInView`, `useMotionValue`, `useSpring`, `AnimatePresence`

---

## Accesibilidad

- Todos los íconos interactivos: `aria-label`
- Contraste texto/fondo: mínimo WCAG AA (ya garantizado por #E8EDF2 sobre #0A0A0F = ratio ~14:1)
- Timeline navegable con teclado (`tabIndex`, `onKeyDown`)
- `<html lang="es">`

---

## Dependencias nuevas a instalar

```bash
pnpm add framer-motion
pnpm add -D puppeteer
```

No se requiere EmailJS. No se instala CountUp como librería — se implementa con `framer-motion` + `useMotionValue` + `useSpring`.

---

## Orden de implementación (foundation-first incremental)

1. **Cimientos:** instalar deps, fuentes en `layout.tsx`, CSS variables en `globals.css`, grain overlay
2. **CustomCursor.tsx** + integrar en layout
3. **Navigation.tsx** con scroll spy
4. **Hero.tsx**
5. **About.tsx**
6. **Experience.tsx**
7. **Projects.tsx** + script de capturas Puppeteer
8. **Skills.tsx**
9. **Certifications.tsx**
10. **Contact.tsx**
11. **SEO**: metadata en `layout.tsx`
12. **Responsive + a11y** sweep final
13. **Subir CV** a `/public/cv/`

---

## Fuera de alcance (esta iteración)

- EmailJS / backend de email
- Dominio propio (mantener `.vercel.app` hasta tener dominio)
- Radar chart (se usa barras — más legible y accesible)
- Dark mode en code block (es siempre dark por diseño)
