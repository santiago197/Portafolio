'use client'

import { motion } from 'framer-motion'

interface SkillGroup {
  label: string
  tags: string[]
}

const SKILLS: SkillGroup[] = [
  {
    label: 'Backend',
    tags: ['Node.js', 'Effect', '.NET 8', 'C#', 'ASP.NET Core', 'Entity Framework', 'SignalR'],
  },
  {
    label: 'Frontend',
    tags: ['React', 'Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'MUI', 'Tailwind CSS'],
  },
  {
    label: 'Bases de datos',
    tags: ['PostgreSQL', 'SQL Server', 'MySQL', 'Supabase'],
  },
  {
    label: 'Cloud y DevOps',
    tags: ['GCP', 'Azure DevOps', 'CI/CD', 'Git', 'Docker (básico)'],
  },
  {
    label: 'IA y agentes',
    tags: ['Claude Code', 'LangGraph', 'Python', 'Claude API', 'GitHub Copilot', 'Cursor'],
  },
]

function SkillRow({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6"
    >
      <span className="font-mono text-[11px] text-[var(--brand-muted)] sm:min-w-[140px] tracking-wide uppercase pt-1">
        {group.label}
      </span>
      <div className="flex flex-wrap gap-2" role="list" aria-label={group.label}>
        {group.tags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="font-mono text-[11px] px-2.5 py-1 rounded bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] border border-[var(--brand-cyan)]/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
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

        <div className="space-y-7 mb-12">
          {SKILLS.map((group, index) => (
            <SkillRow key={group.label} group={group} index={index} />
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
          🔄&nbsp; En proceso: Maestría en IA (primer semestre) · RabbitMQ / Kafka · Inglés B1
          (mejora activa)
        </motion.div>
      </div>
    </section>
  )
}
