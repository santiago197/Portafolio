import type { Metadata } from 'next'
import { DM_Sans, Space_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CustomCursor } from '@/components/CustomCursor'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Santiago Rodríguez — Full Stack Developer | TypeScript · React · Node.js · .NET',
  description:
    'Full Stack Developer con 6+ años de experiencia en TypeScript, React, Node.js y .NET 8. Desarrollo de software con agentes de IA, ERPs empresariales y proyectos en producción. Estudiante de la Maestría en Inteligencia Artificial. Bogotá, Colombia.',
  keywords: [
    'full stack developer colombia',
    'react developer bogota',
    'node.js developer bogota',
    'desarrollador .net bogota',
    'ai engineer colombia',
    'desarrollo con agentes de ia',
  ],
  openGraph: {
    title: 'Santiago Rodríguez — Full Stack Developer',
    description:
      '6+ años en TypeScript, React, Node.js y .NET 8. Desarrollo con agentes de IA. Bogotá, Colombia.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${spaceMono.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="grain-overlay" aria-hidden="true" />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
