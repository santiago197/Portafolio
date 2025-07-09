import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      company: "SINCO ERP",
      position: "Desarrollador",
      duration: "Mar. 2024 - Actualidad · 1 año 5 meses",
      type: "Jornada completa",
      description: "Desarrollador en SRM / Adproveedor",
      current: true,
    },
    {
      company: "SINCO ERP",
      position: "Desarrollador Full Stack",
      duration: "Sept. 2021 - May. 2024 · 2 años 9 meses",
      type: "Jornada completa",
      description:
        "Desarrollador FullStack en el equipo de trabajo GoldenBerry, manejo de Figma, diseño y desarrollo de páginas web HTML5, CSS3, Javascript, Typescript, JSX, React, .NET Framework, ASP Classic, API Web, bases de datos SQL Server.",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        ".NET Framework",
        "ASP Classic",
        "SQL Server",
        "Figma",
      ],
    },
    {
      company: "SINCO ERP",
      position: "Desarrollador Junior",
      duration: "Sept. 2019 - Sept. 2021 · 2 años 1 mes",
      type: "Jornada completa",
      description: "Desarrollador del sub módulo de contabilidad de Maquinaria y Equipos M&E de SINCO ERP.",
      technologies: [
        "ASP.NET",
        ".NET",
        "SQL Server 2014",
        "Web API",
        "JavaScript",
        "CSS",
        "HTML5",
        "Team Foundation Server",
      ],
    },
    {
      company: "MQA Suramérica",
      position: "Desarrollador",
      duration: "Mar. 2019 - Sept. 2019 · 7 meses",
      location: "Bogotá D.C., Colombia",
      description: "Desarrollador de páginas web en Angular, servicios de Rollbase, app móviles en NativeScript",
      technologies: ["Angular", "Rollbase", "NativeScript"],
    },
    {
      company: "TopGroup S.A.",
      position: "Analista Desarrollador",
      duration: "Dic. 2018 - Mar. 2019 · 4 meses",
      location: "Bogotá D.C., Colombia",
      description: "Manejo de base de datos MySQL, lenguaje de programación 4GL, Informix, ShellScript.",
      technologies: ["MySQL", "4GL", "Informix", "ShellScript"],
    },
    {
      company: "Plastitec",
      position: "Practicante",
      duration: "Jun. 2018 - Dic. 2018 · 7 meses",
      type: "Contrato de prácticas",
      description: "Desarrollo de aplicaciones y soporte técnico durante el período de prácticas profesionales.",
    },
  ]

  return (
    <section id="experiencia" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Experiencia Profesional</h2>
          <p className="text-lg text-gray-600">Más de 6 años desarrollando soluciones tecnológicas innovadoras</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className={`${exp.current ? "ring-2 ring-emerald-500" : ""}`}>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-gray-900">{exp.position}</CardTitle>
                      <p className="text-lg font-semibold text-emerald-600 mt-1">{exp.company}</p>
                    </div>
                    <div className="flex flex-col lg:items-end gap-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      )}
                      {exp.type && (
                        <Badge variant="secondary" className="w-fit">
                          {exp.type}
                        </Badge>
                      )}
                      {exp.current && <Badge className="w-fit bg-emerald-600">Actual</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{exp.description}</p>
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
