'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const addInteractiveListeners = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => { hovering.current = true })
        el.addEventListener('mouseleave', () => { hovering.current = false })
      })
    }

    const loop = () => {
      const { x: mx, y: my } = mouse.current
      const lerp = 0.1

      // dot: follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 2}px, ${my - 2}px)`
      }

      // ring: lerp toward mouse
      ring.current.x += (mx - ring.current.x) * lerp
      ring.current.y += (my - ring.current.y) * lerp

      if (ringRef.current) {
        const size = hovering.current ? 48 : 32
        const half = size / 2
        ringRef.current.style.transform = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.backgroundColor = hovering.current
          ? 'rgba(0, 229, 255, 0.1)'
          : 'transparent'
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    addInteractiveListeners()
    rafRef.current = requestAnimationFrame(loop)

    // Re-add listeners when DOM changes (e.g. after navigation)
    const observer = new MutationObserver(addInteractiveListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full bg-[var(--brand-cyan)]"
        style={{ width: 4, height: 4, willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block rounded-full border border-[var(--brand-cyan)]/50 transition-[width,height,background-color] duration-150"
        style={{ width: 32, height: 32, willChange: 'transform' }}
      />
    </>
  )
}
