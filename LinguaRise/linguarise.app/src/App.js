import React, { useEffect } from "react";
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
import './assets/styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import FAQ from './pages/FAQ';
import LoginRegister from './pages/LoginRegister';
import Profile from './pages/Profile';
import { useLoading } from './context/LoadingContext';
import Loader from './components/Loader';
import { useIsAuthenticated } from "@azure/msal-react";

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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/courses' element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            } />
            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/about' element={<About />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/login-register' element={<LoginRegister />} />
          </Routes>
        </div>
      )}
    </>
  );
}

function PrivateRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login-register" />;
}

export default App;