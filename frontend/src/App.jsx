import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
