import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ParkingMap from "./pages/ParkingMap";
import Logout from "./pages/Logout";
import Account from "./pages/Account";
import "./styles/main.scss";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {/* Якщо користувач авторизований, показуємо Navbar */}
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Якщо користувач авторизований, перенаправляємо на головну */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/map" element={isAuthenticated ? <ParkingMap /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Logout setIsAuthenticated = {setIsAuthenticated}/>} />
        <Route path="/account" element = {<Account />} />
        <Route path="/home" element = {<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
