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
