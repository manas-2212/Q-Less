"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      window.location.href = "/login";
    }
  }, [loading, token]);

  if (loading) return null;
  if (!token) return null;

  return children;
}
