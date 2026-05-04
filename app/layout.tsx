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
  title: 'Santiago Rodríguez — Desarrollador Full Stack Senior | .NET · React',
  description:
    'Desarrollador Full Stack con 6+ años en .NET 8 y React. Especializado en ERPs empresariales, CI/CD con Azure DevOps y proyectos en producción. Bogotá, Colombia.',
  keywords: [
    'desarrollador .net bogota',
    'full stack developer colombia',
    'react developer bogota',
    'desarrollador senior colombia',
  ],
  openGraph: {
    title: 'Santiago Rodríguez — Desarrollador Full Stack Senior',
    description: '6 años en .NET 8 y React. Proyectos en producción. Bogotá, Colombia.',
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
