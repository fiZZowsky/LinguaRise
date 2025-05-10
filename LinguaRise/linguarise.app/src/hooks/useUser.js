import api from '../services/Api';
import { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext';

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