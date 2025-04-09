import React, { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/MsalConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sprawdzamy, czy logowanie zostało zakończone (w przypadku przekierowania)
    instance.handleRedirectPromise().then((response) => {
      if (response) {
        console.log("Logowanie zakończone:", response);
        const account = response.account;
        instance.setActiveAccount(account);
        setIsAuthenticated(true);
        setUser(account);
        navigate("/"); // lub jakąkolwiek stronę, na którą chcesz przekierować po logowaniu
      }
    }).catch((error) => {
      console.error("Błąd podczas obsługi przekierowania:", error);
    });
  }, [instance, navigate]);

  const login = async () => {
    try {
      await instance.loginRedirect(loginRequest); // Zainicjuj proces logowania
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  const logout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
    console.log("❌ Wylogowano"); // Informacja o wylogowaniu
  };

  const fetchProfile = async () => {
    const account = instance.getActiveAccount();
    if (!account) return;

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      const res = await fetch("https://localhost:7049/api/user/profile", {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });

      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
      console.log("✅ Zalogowano jako:", data);
      navigate("/"); // przekierowanie po zalogowaniu
    } catch (err) {
      console.error("❌ Błąd pobierania profilu:", err);
    }
  };

  useEffect(() => {
    fetchProfile(); // Pobranie profilu po zalogowaniu
  }, [accounts]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
