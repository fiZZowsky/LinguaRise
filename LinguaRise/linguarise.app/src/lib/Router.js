import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Courses from '../pages/Courses';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import LoginRegister from '../pages/LoginRegister';
import Profile from '../pages/Profile';
import { PrivateRoute } from './PrivateRoute'; // Zaimportuj PrivateRoute

export default function AppRoutes() {
  return (
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
  );
}