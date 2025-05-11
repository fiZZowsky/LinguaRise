import { useMsal } from "@azure/msal-react";
import api from '../services/Api';
import { useEffect, useState, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';

export const useUserLogin = (isAuthenticated) => {
  const { instance } = useMsal();
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { showLoader, hideLoader } = useLoading();
  const prevAuthRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginSuccess(false);
      setLoginError(null);
    }
    else if (isAuthenticated && !prevAuthRef.current) {
      const registerAtBackend = async () => {
        showLoader();
        try {
          await api.post('user/log-in');
          setLoginSuccess(true);
        } catch (error) {
          setLoginError(error);
          instance.logoutRedirect();
        } finally {
          hideLoader();
        }
      };
      registerAtBackend();
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, instance, showLoader, hideLoader]);

  return { loginError, loginSuccess };
};

export const useLoggedUserData = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        showLoader();
        const data = await api.get(`user`);
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
      finally{
        hideLoader();
      }
    };

    fetchUser();
  });

  return user;
};