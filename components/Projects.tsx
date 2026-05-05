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
