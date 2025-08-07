import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"

const variables = [
  { key: "study_hours_per_day", label: "Study Hours/Day" },
  { key: "social_media_hours", label: "Social Media Hours" },
  { key: "netflix_hours", label: "Netflix Hours" },
  { key: "sleep_hours", label: "Sleep Hours" },
  { key: "exercise_frequency", label: "Exercise Frequency" },
  { key: "mental_health_rating", label: "Mental Health Rating" },
  { key: "previous_gpa", label: "Previous GPA" },
  { key: "stress_level", label: "Stress Level" },
  { key: "social_activity", label: "Social Activity" },
  { key: "screen_time", label: "Screen Time (hrs)" },
  { key: "motivation_level", label: "Motivation Level" },
  { key: "exam_anxiety_score", label: "Exam Anxiety Score" },
]

export function SectionCards() {
  const [means, setMeans] = React.useState({})
  const [attendance, setAttendance] = React.useState("-")
  React.useEffect(() => {
    import("@/app/dashboard/data.json")
      .then((module) => {
        const data = module.default
        const result = {}
        variables.forEach((v) => {
          const arr = data
            .map((d) => Number(d[v.key]))
            .filter((n) => !isNaN(n))
          result[v.key] = arr.length
            ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
            : "-"
        })
        setMeans(result)
        // Calcular porcentaje de asistencia
        const attended = data.filter((d) => d.attended === true).length
        setAttendance(
          data.length ? ((attended / data.length) * 100).toFixed(0) : "-"
        )
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error)
      })
  }, [])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Asistencia (%)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {attendance}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Porcentaje de asistencia
          </div>
        </CardFooter>
      </Card>
      {variables.map((v, i) => (
        <Card className="@container/card" key={v.key}>
          <CardHeader>
            <CardDescription>{v.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {means[v.key] ?? "-"}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {i % 2 === 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Media de la variable
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
