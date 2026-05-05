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
          🔄&nbsp; En proceso: AWS · RabbitMQ / Kafka · Inglés B1 (mejora activa)
        </motion.div>
      </div>
    </section>
  )
}
