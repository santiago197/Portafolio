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
