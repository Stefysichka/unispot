import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components.scss";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [isSuperuser, setIsSuperuser] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://127.0.0.1:8000/api/auth/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          console.log('USER DATA:', data);
          if (data.username) setUserName(data.username);
          if (data.is_superuser) setIsSuperuser(data.is_superuser);
        });
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="user-logo">
        <img src="/uploads/img/logo.png" alt="logo" />
        <p>{userName}</p>
      </div>

      <ul>
        <li><Link to="/">Головна сторінка</Link></li>
        <li><Link to="/map">Карта</Link></li>
        <li><Link to="/bookings">Мої бронювання</Link></li>
        <li><Link to="/account">Аккаунт</Link></li>
        {isSuperuser && (  
          <li><Link to="/admin">Адмін</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
