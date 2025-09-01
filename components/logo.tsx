import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'text'
  className?: string
}

export function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} aspect-square ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fondo circular con gradiente */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#logoGradient)"
            filter="url(#shadow)"
          />
          
          {/* Iniciales SR estilizadas */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            className="fill-white font-bold"
            style={{ fontSize: '32px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            SR
          </text>
          
          {/* Elementos decorativos de código */}
          <circle cx="25" cy="25" r="2" fill="white" opacity="0.6" />
          <circle cx="75" cy="25" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="75" r="2" fill="white" opacity="0.6" />
          <circle cx="75" cy="75" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>
    )
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center ${className}`}>
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
          Santiago Rodríguez
        </span>
        <span className={`ml-2 text-emerald-600 ${textSizeClasses[size]} font-light`}>
          .dev
        </span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={sizeClasses[size]}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#logoGradient)"
            filter="url(#shadow)"
          />
          
          <text
            x="50"
            y="58"
            textAnchor="middle"
            className="fill-white font-bold"
            style={{ fontSize: '32px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            SR
          </text>
          
          <circle cx="25" cy="25" r="2" fill="white" opacity="0.6" />
          <circle cx="75" cy="25" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="75" r="2" fill="white" opacity="0.6" />
          <circle cx="75" cy="75" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold text-gray-900 leading-tight ${textSizeClasses[size]}`}>
          Santiago Rodríguez
        </span>
        <span className="text-emerald-600 text-sm font-medium leading-tight">
          Full Stack Developer
        </span>
      </div>
    </div>
  )
}

export function LogoVariations() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Variaciones del Logo</h2>
      
      <div className="space-y-12">
        {/* Logo completo en diferentes tamaños */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Logo Completo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <Logo size="sm" />
              <p className="text-sm text-gray-600 mt-2">Pequeño</p>
            </div>
            <div className="text-center">
              <Logo size="md" />
              <p className="text-sm text-gray-600 mt-2">Mediano</p>
            </div>
            <div className="text-center">
              <Logo size="lg" />
              <p className="text-sm text-gray-600 mt-2">Grande</p>
            </div>
            <div className="text-center">
              <Logo size="xl" />
              <p className="text-sm text-gray-600 mt-2">Extra Grande</p>
            </div>
          </div>
        </div>

        {/* Solo icono */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Solo Icono</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <Logo variant="icon" size="sm" />
              <p className="text-sm text-gray-600 mt-2">Pequeño</p>
            </div>
            <div className="text-center">
              <Logo variant="icon" size="md" />
              <p className="text-sm text-gray-600 mt-2">Mediano</p>
            </div>
            <div className="text-center">
              <Logo variant="icon" size="lg" />
              <p className="text-sm text-gray-600 mt-2">Grande</p>
            </div>
            <div className="text-center">
              <Logo variant="icon" size="xl" />
              <p className="text-sm text-gray-600 mt-2">Extra Grande</p>
            </div>
          </div>
        </div>

        {/* Solo texto */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Solo Texto</h3>
          <div className="space-y-4">
            <Logo variant="text" size="sm" />
            <Logo variant="text" size="md" />
            <Logo variant="text" size="lg" />
            <Logo variant="text" size="xl" />
          </div>
        </div>

        {/* Sobre fondos oscuros */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Sobre Fondos Oscuros</h3>
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <Logo size="md" className="[&_span]:text-white" />
                <p className="text-sm text-gray-400 mt-2">Logo completo</p>
              </div>
              <div className="text-center">
                <Logo variant="icon" size="md" />
                <p className="text-sm text-gray-400 mt-2">Solo icono</p>
              </div>
              <div className="text-center">
                <Logo variant="text" size="md" className="[&_span]:text-white" />
                <p className="text-sm text-gray-400 mt-2">Solo texto</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guía de uso */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Guía de Uso</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">Colores Principales</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-600 rounded"></div>
                  <span>Emerald 600 (#059669)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span>Emerald 500 (#10b981)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-900 rounded"></div>
                  <span>Gray 900 (#111827)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recomendaciones</h4>
              <ul className="space-y-1">
                <li>• Usar logo completo en headers y presentaciones</li>
                <li>• Usar solo icono en espacios reducidos</li>
                <li>• Mantener espacio libre alrededor del logo</li>
                <li>• Preferir fondo claro para mejor contraste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}