import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.jsx';
import Wishlist from './pages/wishlist.jsx';
import LoginPage from './pages/login.jsx';
import React, { useState, useEffect, useContext } from 'react';


function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}
export default App;