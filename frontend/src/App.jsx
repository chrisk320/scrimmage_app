import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App;
