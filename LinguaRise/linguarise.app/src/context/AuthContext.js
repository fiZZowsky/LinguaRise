import React, { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/MsalConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Sprawdzanie, czy użytkownik jest zalogowany na podstawie tokenu w localStorage
  useEffect(() => {
    const checkAuthStatus = async () => {
      const account = instance.getActiveAccount();

      if (!account) {
        const storedToken = localStorage.getItem("msalToken");
        if (storedToken) {
          try {
            // Próba ponownego ustawienia aktywnego konta
            const tokenResponse = await instance.acquireTokenSilent({
              ...loginRequest,
              account: account,
            });

            if (tokenResponse) {
              setIsAuthenticated(true);
              setUser(account);
            }
          } catch (error) {
            console.error("Błąd podczas autoryzacji:", error);
          }
        }
      } else {
        setIsAuthenticated(true);
        setUser(account);
      }
    };

    checkAuthStatus();
  }, [instance]);

  const login = async () => {
    const activeAccount = instance.getActiveAccount();
    if (activeAccount) {
      console.log("✅ Użytkownik już zalogowany:", activeAccount);
      return;
    }

    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("❌ Błąd logowania:", error);
    }
  };

  const logout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
    console.log("❌ Wylogowano");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);