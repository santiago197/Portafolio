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
