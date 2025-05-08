import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ParkingMap from "./pages/ParkingMap";
import Account from "./pages/Account";
import AccountPage from './pages/Account';
import AdminUsers from './pages/AdminUsers';
import AdminSpots from './pages/AdminSpots';
import AdminStats from './pages/AdminStats';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from "./pages/Bookings";
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
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/map" element={isAuthenticated ? <ParkingMap /> : <Navigate to="/login" />} />
        <Route path="/account" element = {<Account />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/spots" element={<AdminSpots />} />
        <Route path="/admin/stats" element={<AdminStats />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
