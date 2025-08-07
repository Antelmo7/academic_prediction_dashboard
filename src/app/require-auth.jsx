import React from "react";
import { useAuth } from "./auth-context";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
