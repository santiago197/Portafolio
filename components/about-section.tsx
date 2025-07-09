import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="acerca" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Acerca de mí</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ingeniero de Sistemas apasionado por crear soluciones tecnológicas innovadoras
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Mi experiencia profesional</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Soy un <strong>Ingeniero de Sistemas con 6+ años de experiencia</strong> en desarrollo Full Stack,
                especializado en la creación de soluciones web robustas y escalables.
              </p>
              <p>
                Tengo amplia experiencia en tecnologías como{" "}
                <strong>.NET Core, React, Next.js, TypeScript, JavaScript, Entity Framework, LINQ y Material-UI</strong>
                . Me destaco en el desarrollo de APIs RESTful, diseño de interfaces modernas y eficientes, e integración
                de herramientas de control de versiones como Git, GitHub y Azure DevOps.
              </p>
              <p>
                Estoy acostumbrado a trabajar en <strong>equipos ágiles bajo la metodología Scrum</strong>, con enfoque
                en CI/CD para garantizar entregas continuas y de alta calidad. Me caracterizo por ser proactivo, con
                excelentes habilidades de comunicación, resolución de problemas y rápida adaptación a nuevos retos
                tecnológicos.
              </p>
              <p>
                Estoy enfocado en aportar valor a proyectos innovadores que impulsen el desarrollo tecnológico y
                aprovechen al máximo mis habilidades. Me motiva trabajar en entornos dinámicos y desafiantes, donde
                pueda seguir creciendo profesionalmente y contribuir activamente al éxito del equipo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Code className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Full Stack</h4>
                <p className="text-sm text-gray-600">Desarrollo completo frontend y backend</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Database className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Bases de Datos</h4>
                <p className="text-sm text-gray-600">SQL Server, MySQL, Entity Framework</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Web Modernas</h4>
                <p className="text-sm text-gray-600">React, Next.js, TypeScript</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Metodologías</h4>
                <p className="text-sm text-gray-600">Scrum, CI/CD, DevOps</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
