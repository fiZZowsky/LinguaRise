import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMsal } from '@azure/msal-react';

const UserContext = createContext({ oid: null });

export const UserProvider = ({ children }) => {
  const { accounts } = useMsal();
  const account = accounts[0];

  const [oid, setOid] = useState(() => {
    return sessionStorage.getItem('oid') || null;
  });

  useEffect(() => {
    const newOid = account?.idTokenClaims?.oid || null;
    if (newOid) {
      sessionStorage.setItem('oid', newOid);
      setOid(newOid);
    } else {
      sessionStorage.removeItem('oid');
      setOid(null);
    }
  }, [account]);

  return (
    <UserContext.Provider value={{ oid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
