import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
