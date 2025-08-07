import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  { name: "exercise_frequency", label: "Frecuencia de ejercicio", type: "number" },
  { name: "mental_health_rating", label: "Salud mental (1-10)", type: "number" },
  { name: "previous_gpa", label: "GPA previo", type: "number", step: "0.01" },
  { name: "stress_level", label: "Nivel de estrés", type: "number" },
  { name: "social_activity", label: "Actividad social", type: "number" },
  { name: "screen_time", label: "Tiempo de pantalla (hrs)", type: "number", step: "0.1" },
  { name: "motivation_level", label: "Nivel de motivación", type: "number" },
  { name: "exam_anxiety_score", label: "Ansiedad ante exámenes", type: "number" }
];

export default function AddPage() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí podrías guardar en backend o localStorage
    navigate("/history");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-bold text-2xl mb-2">Agregar nuevo registro</h2>
          {fields.map(field => (
            <div key={field.name} className="flex flex-col gap-1">
              <Label htmlFor={field.name}>{field.label} <span className="text-xs text-muted-foreground">({field.name})</span></Label>
              {field.type === "checkbox" ? (
                <Input id={field.name} name={field.name} type="checkbox" checked={form[field.name]} onChange={handleChange} />
              ) : (
                <Input id={field.name} name={field.name} type={field.type} step={field.step} value={form[field.name]} onChange={handleChange} required />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full">Agregar registro</Button>
        </form>
      </Card>
    </div>
  );
}
