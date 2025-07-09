import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Búhos Nocturnos (.co)",
      description:
        "Sitio web corporativo desarrollado con tecnologías modernas, enfocado en una experiencia de usuario optimizada y diseño responsivo.",
      url: "https://buhosnocturnos.co/",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      type: "Sitio Web Corporativo",
    },
    {
      title: "Búhos Nocturnos (.com)",
      description:
        "Plataforma web con funcionalidades avanzadas y integración de servicios, desarrollada con stack completo de tecnologías modernas.",
      url: "https://buhosnocturnos.com/",
      technologies: ["React", "Next.js", ".NET Core", "SQL Server"],
      type: "Aplicación Web",
    },
    {
      title: "IED Bagazal",
      description:
        "Portal educativo institucional con sistema de gestión de contenidos, diseñado para facilitar la comunicación entre la institución y la comunidad educativa.",
      url: "https://iedbagazal.edu.co/",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      type: "Portal Educativo",
    },
  ]

  return (
    <section id="proyectos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-gray-600">Algunos de los proyectos en los que he trabajado</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{project.title}</CardTitle>
                    <Badge variant="outline" className="mb-3">
                      {project.type}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver sitio
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Encuentra más proyectos en mis repositorios</h3>
            <p className="text-gray-600 mb-6">
              Explora mi trabajo y contribuciones en GitHub, donde comparto código y colaboro en proyectos open source.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="https://github.com/santiago197" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  Ver GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://www.linkedin.com/in/santiago-rodriguezp/" target="_blank" rel="noopener noreferrer">
                  Ver LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
