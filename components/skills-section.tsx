import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Material-UI",
        "Tailwind CSS",
        "Angular",
      ],
    },
    {
      title: "Backend",
      skills: [".NET Core", ".NET Framework", "ASP.NET", "Web API", "Entity Framework", "LINQ", "Node.js"],
    },
    {
      title: "Bases de Datos",
      skills: ["SQL Server", "MySQL", "Entity Framework", "LINQ", "Informix"],
    },
    {
      title: "Herramientas & DevOps",
      skills: ["Git", "GitHub", "Azure DevOps", "Team Foundation Server", "CI/CD", "Figma"],
    },
    {
      title: "Metodologías",
      skills: ["Scrum", "Metodologías Ágiles", "Control de Versiones", "Desarrollo Full Stack"],
    },
    {
      title: "Móvil & Otros",
      skills: ["NativeScript", "Rollbase", "4GL", "ShellScript", "ASP Classic"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Habilidades Técnicas</h2>
          <p className="text-lg text-gray-600">Tecnologías y herramientas con las que trabajo</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-600">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
