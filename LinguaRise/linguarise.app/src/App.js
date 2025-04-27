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
import CourseCategory from './pages/CourseCategory';

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
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:langCode/categories' element={<CourseCategory />} />
          <Route path='/about' element={<About />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/login-register' element={<LoginRegister />} />
        </Routes>
      </div>
      {isLoading && <Loader />}
    </>
  );
}


export default App;