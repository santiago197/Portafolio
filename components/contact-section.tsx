"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Crear el mensaje para WhatsApp
    const mensaje =
      `*Nuevo mensaje desde el portafolio*%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Asunto:* ${formData.asunto}%0A%0A` +
      `*Mensaje:*%0A${formData.mensaje}`

    // Número de WhatsApp (sin el +)
    const numeroWhatsApp = "573158824024"

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank")

    // Limpiar formulario
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    })
  }

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Contacto</h2>
          <p className="text-lg text-gray-600">¿Tienes un proyecto en mente? ¡Hablemos!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">santiago.rodriguez19@outlook.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Teléfono</h4>
                  <p className="text-gray-600">+57 (315) 882-4024</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ubicación</h4>
                  <p className="text-gray-600">Bogotá D.C., Colombia</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Sígueme en redes</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/santiago197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Github className="h-6 w-6 text-gray-700" />
                </a>
                <a
                  href="https://www.linkedin.com/in/santiago-rodriguezp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-gray-700" />
                </a>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Envíame un mensaje</CardTitle>
              <p className="text-sm text-gray-600">Se abrirá WhatsApp con tu mensaje</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <Input
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    placeholder="Asunto del mensaje"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Enviar por WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
