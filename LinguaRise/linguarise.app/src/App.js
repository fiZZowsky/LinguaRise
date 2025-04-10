import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './assets/styles/App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routing/Router';
import { useLoading } from './context/LoadingContext';
import Loader from './components/Loader';

function App() {
  const location = useLocation();
  const { isLoading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container'>
          <AppRoutes />
        </div>
      )}
    </>
  );
}

export default App;