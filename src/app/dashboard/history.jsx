import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DataTable } from "@/components/data-table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button as MenuButton } from "@/components/ui/button";

const initialState = {
  date: "",
  event: "",
  study_hours_per_day: 0,
  social_media_hours: 0,
  netflix_hours: 0,
  attended: false,
  sleep_hours: 0,
  exercise_frequency: 0,
  mental_health_rating: 0,
  previous_gpa: 0,
  stress_level: 0,
  social_activity: 0,
  screen_time: 0,
  motivation_level: 0,
  exam_anxiety_score: 0
};

const fields = [
  { name: "date", label: "Fecha", type: "date" },
  { name: "event", label: "Evento", type: "text" },
  { name: "study_hours_per_day", label: "Horas de estudio por día", type: "number", step: "0.1" },
  { name: "social_media_hours", label: "Horas en redes sociales", type: "number", step: "0.1" },
  { name: "netflix_hours", label: "Horas en Netflix", type: "number", step: "0.1" },
  { name: "attended", label: "¿Asistió?", type: "checkbox" },
  { name: "sleep_hours", label: "Horas de sueño", type: "number", step: "0.1" },
  { name: "exercise_frequency", label: "¿Hizo ejercicio?", type: "checkbox" },
  { name: "mental_health_rating", label: "Salud mental (1-10)", type: "number" },
  { name: "stress_level", label: "Nivel de estrés", type: "number" },
  { name: "social_activity", label: "Actividad social", type: "number" },
  { name: "screen_time", label: "Tiempo de pantalla (hrs)", type: "number", step: "0.1" },
  { name: "motivation_level", label: "Nivel de motivación", type: "number" },
  { name: "exam_anxiety_score", label: "Ansiedad ante exámenes", type: "number" }
];

// Definir columnas para DataTable
function getColumns(previousGpa, handleDelete) {
  return [
    { accessorKey: "date", header: "Fecha" },
    { accessorKey: "event", header: "Evento" },
    { accessorKey: "study_hours_per_day", header: "Estudio" },
    { accessorKey: "social_media_hours", header: "Redes" },
    { accessorKey: "netflix_hours", header: "Netflix" },
    { accessorKey: "attended", header: "Asistió", cell: ({ row }) => row.original.attended ? "Sí" : "No" },
    { accessorKey: "sleep_hours", header: "Sueño" },
    { accessorKey: "exercise_frequency", header: "Ejercicio", cell: ({ row }) => row.original.exercise_frequency ? "Sí" : "No" },
    { accessorKey: "mental_health_rating", header: "Salud mental" },
    { accessorKey: "previous_gpa", header: "GPA", cell: () => previousGpa },
    { accessorKey: "stress_level", header: "Estrés" },
    { accessorKey: "social_activity", header: "Social" },
    { accessorKey: "screen_time", header: "Pantalla" },
    { accessorKey: "motivation_level", header: "Motivación" },
    { accessorKey: "exam_anxiety_score", header: "Ansiedad examen" },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuButton variant="ghost" size="icon">
              ⋮
            </MenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)} className="text-red-600">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}

export default function History() {
  const [history, setHistory] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialState)
  const [previousGpa, setPreviousGpa] = useState(0)

  // Cargar datos de localStorage o del archivo json
  React.useEffect(() => {
    const local = localStorage.getItem("academic_history")
    const localGpa = localStorage.getItem("previous_gpa")
    if (local) {
      setHistory(JSON.parse(local))
      setLoading(false)
    } else {
      import("./data.json").then(module => {
        setHistory(module.default)
        if (module.default.length > 0) setPreviousGpa(module.default[0].previous_gpa || 0)
        setLoading(false)
      })
    }
    if (localGpa) setPreviousGpa(localGpa)
  }, [])

  // Guardar en localStorage cuando cambia el historial
  React.useEffect(() => {
    if (!loading) localStorage.setItem("academic_history", JSON.stringify(history))
  }, [history, loading])

  React.useEffect(() => {
    if (!loading) localStorage.setItem("previous_gpa", previousGpa)
  }, [previousGpa, loading])

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "number") {
      // Solo permite números válidos y vacíos
      if (value === "" || /^-?\d*(\.|,)?\d*$/.test(value)) {
        setForm(f => ({ ...f, [name]: value.replace(/,/g, ".") }));
      }
    } else {
      setForm(f => ({
        ...f,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validar que todos los campos numéricos sean realmente números
    for (const field of fields) {
      if (field.type === "number") {
        const val = form[field.name];
        if (val === "" || isNaN(Number(val))) {
          alert(`El campo "${field.label}" debe ser un número válido.`);
          return;
        }
      }
    }
    setHistory(h => [...h, { ...form, ...Object.fromEntries(fields.filter(f=>f.type==="number").map(f=>[f.name, Number(form[f.name])])), id: Date.now(), previous_gpa: previousGpa }]);
    setForm(initialState);
    setOpen(false);
  }

  function handleDelete(id) {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      setHistory(h => h.filter(row => row.id !== id));
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-2">Historial académico</h2>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="previous_gpa" className="font-medium text-sm text-foreground">GPA previo <span className="text-xs text-muted-foreground">(previous_gpa)</span></Label>
                <Input id="previous_gpa" name="previous_gpa" type="number" step="0.01" value={previousGpa} onChange={e => setPreviousGpa(e.target.value)} className="border rounded px-2 py-1 bg-background w-32" />
              </div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button>Agregar registro</Button>
                </SheetTrigger>
                <SheetContent side="right" className="max-w-md w-full p-6 flex flex-col gap-2 overflow-y-auto max-h-screen">
                  <SheetHeader>
                    <SheetTitle>Agregar nuevo registro</SheetTitle>
                  </SheetHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                      <div key={field.name} className="flex flex-col gap-1">
                        <Label htmlFor={field.name} className="font-medium text-sm text-foreground">{field.label} <span className="text-xs text-muted-foreground">({field.name})</span></Label>
                        {field.type === "checkbox" ? (
                          <div className="flex items-center gap-2">
                            <Input id={field.name} name={field.name} type="checkbox" checked={form[field.name]} onChange={handleChange} className="size-4" />
                            <span className="text-muted-foreground text-xs">Marcar si aplica</span>
                          </div>
                        ) : (
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            step={field.step}
                            value={form[field.name]}
                            onChange={handleChange}
                            inputMode={field.type === "number" ? "decimal" : undefined}
                            pattern={field.type === "number" ? "[0-9.\-]*" : undefined}
                            required
                            className="border rounded px-2 py-1 bg-background"
                          />
                        )}
                      </div>
                    ))}
                    <Button type="submit" className="w-full mt-2">Agregar registro</Button>
                  </form>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable data={history.slice().sort((a, b) => {
                const da = new Date(a.date)
                const db = new Date(b.date)
                if (isNaN(db) && isNaN(da)) return 0;
                if (isNaN(db)) return -1;
                if (isNaN(da)) return 1;
                return db - da;
              })} columns={getColumns(previousGpa, handleDelete)} />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
