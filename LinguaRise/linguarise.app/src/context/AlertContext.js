import React, { createContext, useState, useCallback } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    visible: false,
    type: 'info',
    message: '',
    onConfirm: null,
  });

  const showAlert = useCallback((type, message) => {
    return new Promise(resolve => {
      setAlert({
        visible: true,
        type,
        message,
        onConfirm: resolve,
      });
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => {
      if (prev.onConfirm) prev.onConfirm();
      return {
        ...prev,
        visible: false,
        onConfirm: null,
      };
    });
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
