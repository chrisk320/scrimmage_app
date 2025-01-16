import React from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoggedInHomePage from './pages/LoggedInHomePage.jsx';
import CreateGamePage from './pages/CreateGamePage.jsx';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
    navigate('/'); // Rediret to the home page
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={user ? <LoggedInHomePage user={user} /> : <LoginPage setUser={setUser} />} />
        <Route
          path="/home/create"
          element={
            <ProtectedRoute>
              <CreateGamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;
