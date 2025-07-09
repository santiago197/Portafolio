"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">Santiago Rodríguez</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("acerca")}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Acerca de mí
            </button>
            <button
              onClick={() => scrollToSection("experiencia")}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Experiencia
            </button>
            <button
              onClick={() => scrollToSection("proyectos")}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-left text-gray-700 hover:text-gray-900 transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("acerca")}
                className="text-left text-gray-700 hover:text-gray-900 transition-colors"
              >
                Acerca de mí
              </button>
              <button
                onClick={() => scrollToSection("experiencia")}
                className="text-left text-gray-700 hover:text-gray-900 transition-colors"
              >
                Experiencia
              </button>
              <button
                onClick={() => scrollToSection("proyectos")}
                className="text-left text-gray-700 hover:text-gray-900 transition-colors"
              >
                Proyectos
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-left text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contacto
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
