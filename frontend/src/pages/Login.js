import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages.scss";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access); // JWT токен
        setIsAuthenticated(true);
        navigate("/"); 
      } else {
        alert("Неправильний пароль чи email");
      }
    } catch (error) {
      console.error("Помилка входу:", error);
    }
  };

  return (
    <div className="login">
      <h2>Вхід в аккаунт</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ввійти в аккаунт</button>
      </form>
      <p>Не маєш аккаунта? <Link to="/register">Зареєструватись</Link></p>
    </div>
  );
};

export default Login;
