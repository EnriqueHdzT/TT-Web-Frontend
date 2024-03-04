import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Homepage';
import Login from './Login';
import StudentRegister from './StudentRegister';
import ListStudents from './ListStudents';

import './App.scss'

export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<StudentRegister />}/>

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}