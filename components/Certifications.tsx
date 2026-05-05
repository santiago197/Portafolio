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
