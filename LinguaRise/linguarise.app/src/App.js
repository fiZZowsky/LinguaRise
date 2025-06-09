import React, { useEffect } from "react";
import { useLocation, Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import FAQ from './pages/FAQ';
import { useLoading } from './context/LoadingContext';
import Loader from './components/Loader';
import CourseCategory from './pages/CourseCategory';
import Profile from './pages/Profile';
import ListeningRepetitionLesson from './pages/ListeningRepetitionLesson';
import LessonSummary from './pages/LessonSummary';
import WritingByEarLesson from './pages/WritingByEarLesson';
import WritingLesson from "./pages/WritingLesson";

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
          <Route path='/courses/:langId/categories' element={<CourseCategory />} />
          <Route path='/courses/:langId/listening-repetition' element={<ListeningRepetitionLesson />} />
          <Route path='/courses/:langId/writing-by-ear' element={<WritingByEarLesson />} />
          <Route path='/courses/:langId/writing' element={<WritingLesson />} />
          <Route path='/about' element={<About />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/courses/listening-repetition/summary' element={<LessonSummary />} />
        </Routes>
      </div>
      {isLoading && <Loader />}
    </>
  );
}

export default App;