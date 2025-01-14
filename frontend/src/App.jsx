import React from 'react';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoggedInHomePage from './pages/LoggedInHomePage.jsx';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
    navigate('/'); // Rediret to the home page
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={user ? <LoggedInHomePage user={user} /> : <LoginPage setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App;
