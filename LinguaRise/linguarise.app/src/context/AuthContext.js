import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMsal, useAccount } from '@azure/msal-react';
import { loginRequest } from '../lib/authConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {}) || null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (account) {
        instance.acquireTokenSilent({
            scopes: ["User.Read"],
                account
            }).then(graphResp => {
                fetch("https://graph.microsoft.com/v1.0/me", {
                    headers: { Authorization: `Bearer ${graphResp.accessToken}` }
                }).then(res => res.json())
                .then(profile => setUser(profile));
            });
    } else {
      setUser(null);
    }
  }, [account, instance]);

  const login = () => {
    instance.loginRedirect(loginRequest);
  };
  const logout = () => {
    instance.logoutRedirect(); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, account }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
