import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

export const useAlert = () => {
  const { alert, showAlert, hideAlert } = useContext(AlertContext);
  return { alert, showAlert, hideAlert };
};
