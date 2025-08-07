import React, { useState } from "react";

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

export default function AddRecord({ onAdd }) {
  const [form, setForm] = useState(initialState);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ ...form, id: Date.now(), study_hours_per_day: Number(form.study_hours_per_day), social_media_hours: Number(form.social_media_hours), netflix_hours: Number(form.netflix_hours), sleep_hours: Number(form.sleep_hours), exercise_frequency: Number(form.exercise_frequency), mental_health_rating: Number(form.mental_health_rating), previous_gpa: Number(form.previous_gpa), stress_level: Number(form.stress_level), social_activity: Number(form.social_activity), screen_time: Number(form.screen_time), motivation_level: Number(form.motivation_level), exam_anxiety_score: Number(form.exam_anxiety_score) });
    setForm(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded bg-white max-w-xl mx-auto mt-4">
      <h3 className="font-bold text-lg">Agregar nuevo registro</h3>
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="event" placeholder="Evento" value={form.event} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="study_hours_per_day" type="number" step="0.1" placeholder="Horas de estudio" value={form.study_hours_per_day} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="social_media_hours" type="number" step="0.1" placeholder="Horas en redes" value={form.social_media_hours} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="netflix_hours" type="number" step="0.1" placeholder="Horas Netflix" value={form.netflix_hours} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <label className="flex items-center gap-2"><input name="attended" type="checkbox" checked={form.attended} onChange={handleChange} /> Asistió</label>
      <input name="sleep_hours" type="number" step="0.1" placeholder="Horas de sueño" value={form.sleep_hours} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="exercise_frequency" type="number" placeholder="Frecuencia ejercicio" value={form.exercise_frequency} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="mental_health_rating" type="number" placeholder="Salud mental" value={form.mental_health_rating} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="previous_gpa" type="number" step="0.01" placeholder="GPA previo" value={form.previous_gpa} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="stress_level" type="number" placeholder="Estrés" value={form.stress_level} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="social_activity" type="number" placeholder="Actividad social" value={form.social_activity} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="screen_time" type="number" step="0.1" placeholder="Tiempo de pantalla" value={form.screen_time} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="motivation_level" type="number" placeholder="Motivación" value={form.motivation_level} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <input name="exam_anxiety_score" type="number" placeholder="Ansiedad examen" value={form.exam_anxiety_score} onChange={handleChange} className="border px-2 py-1 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
    </form>
  );
}
