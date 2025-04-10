import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Korzystamy z AuthContext

  if (!isAuthenticated) {
    // Jeśli nie jest zalogowany, przekierowujemy do logowania
    return <Navigate to="/login-register" />;
  }

  return children;
}
