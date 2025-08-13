"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hola, soy <span className="text-emerald-600">Santiago Rodríguez</span>
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-700 mb-6">
              Desarrollador Full Stack con 6+ años de experiencia
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Especializado en crear soluciones web robustas y escalables con tecnologías modernas como .NET Core,
              React, Next.js y TypeScript.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                onClick={() => scrollToSection("proyectos")}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Ver mis proyectos
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection("contacto")}>
                Contactarme
              </Button>
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/santiago197"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Github className="h-6 w-6 text-gray-700" />
              </a>
              <a
                href="https://www.linkedin.com/in/santiago-rodriguezp/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Linkedin className="h-6 w-6 text-gray-700" />
              </a>
              <button
                onClick={() => scrollToSection("contacto")}
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Mail className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-400 to-emerald-600">
              <img
                src="/FotoCv1.png?height=400&width=400"
                alt="Santiago Rodríguez - Desarrollador Full Stack"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
