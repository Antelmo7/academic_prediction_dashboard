import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './app/login/login';
import Dashboard from './app/dashboard/dashboard';
import History from './app/dashboard/history';
import AddPage from './app/dashboard/add';
import { AuthProvider } from "./app/auth-context";
import { RequireAuth } from "./app/require-auth";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/add" element={<RequireAuth><AddPage /></RequireAuth>} />
        <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
