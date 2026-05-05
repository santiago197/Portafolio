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
