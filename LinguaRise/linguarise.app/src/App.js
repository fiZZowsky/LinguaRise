import React, { useEffect } from "react";
import { useLocation, Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import FAQ from './pages/FAQ';
import LoginRegister from './pages/LoginRegister';
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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/about' element={<About />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/login-register' element={<LoginRegister />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;