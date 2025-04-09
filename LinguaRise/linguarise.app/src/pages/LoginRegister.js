import React, { useEffect } from 'react';
import { useAuth } from "../context/AuthContext";

const LoginRegister = () => {
  const { login } = useAuth();

  useEffect(() => {
    login(); // Zainicjuj proces logowania
  }, [login]);

  return (
    <div>
      <h2>Login/Register</h2>
      {/* Tutaj możesz wyświetlić formularz logowania lub komunikat */}
    </div>
  );
};

export default LoginRegister;
