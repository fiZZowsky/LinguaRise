import React, { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/msalConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchProfile = async () => {
    const account = instance.getActiveAccount() || accounts[0];
    if (!account) return;

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });

      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Błąd pobierania profilu:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [accounts]);

  const logout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);