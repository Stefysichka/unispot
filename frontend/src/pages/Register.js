import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages.scss";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: name, password }),
      });

      if (response.ok) {
        alert("Реєстрація пройшла успішно!");
        navigate("/login");
      } else {
        alert("Помилка при реєстрації");
      }
    } catch (error) {
      console.error("Помилка реєстрації:", error);
    }
  };

  return (
    <div className="register">
      <h2>Реєстрація</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ім'я користувача"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Зареєструватись</button>
        <p>Вже маєш акаунт? <Link to="/login">Увійти</Link></p>
      </form>
    </div>
  );
};

export default Register;
