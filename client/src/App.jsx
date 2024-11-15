<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './pages/Home';
import Store from './pages/Store';
=======
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Account from './Account';
import Contact from './Contact';
import Successful from './Successful';
import Successful2 from './Successful2';
import Store from './Store';
import Sensor from './Sensor';
import Microboard from './Microboard';
import Tools from './Tools'
import Battery from './Battery';
import Droneparts from './Droneparts';
import Printing from './Printing';
import Cart from './Cart';

>>>>>>> 0cf79065794ed5810c50a46c9764f6b94a36c3d0
import './App.css'

function App() {

<<<<<<< HEAD
  return (
    
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </Router>
=======


  return (
    <>
        
      
       <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Successful" element={<Successful/>} />
        <Route path="srcSensor.jsx" element={<Sensor/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="Microboard.jsx" element={<Microboard/>} />
        <Route path="Printing.jsx" element={<Printing/>} />
        <Route path="Droneparts.jsx" element={<Droneparts/>} />
        <Route path="Battery.jsx" element={<Battery/>} />
        <Route path="Tools.jsx" element={<Tools/>} />
        <Route path="store" element={<Store/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/Account/Successful2" element={<Successful2/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Router>
        
    </>
>>>>>>> 0cf79065794ed5810c50a46c9764f6b94a36c3d0
  )
}

export default App
