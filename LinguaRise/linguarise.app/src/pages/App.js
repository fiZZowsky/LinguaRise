import React from 'react';
import '../assets/styles/App.css';
import Navbar from '../components/Navbar';
import Home from './Home';
import Courses from './Courses';
import About from './About';
import FAQ from './FAQ';
import LoginRegister from './LoginRegister';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
  <>
    <Navbar />
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
  </>) 
}

export default App;