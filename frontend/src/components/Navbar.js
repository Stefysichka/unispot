import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>UniSpot</h1>
      <ul>
        <li><Link to="/">Головна</Link></li>
        <li><Link to="/map">Карта</Link></li>
        <li><Link to="/login">Увійти</Link></li>
        <li><Link to="/register">Реєстрація</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;