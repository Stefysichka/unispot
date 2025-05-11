import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import "../styles/pages.scss";

const AccountPage = ({ setIsAuthenticated }) => {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNewEmail(response.data.email);
        setNewName(response.data.username);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!newEmail || !newName) {
      setError("Заповни всі поля!");
      return;
    }
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: newEmail,
        username: newName,
        password: newPassword,
      }),
    });
    if (response.ok) {
      //alert("Дані оновлені!");
      navigate("/home");
    } else {
      setError("Помилка при оновленні профілю");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  
    setIsAuthenticated(false);
    navigate("/login");
};
 
  

  return (
    <div className="account-page">
      <>
        <h2>Зміни свої дані:</h2>
        <input
          type="text"
          placeholder="Нове ім'я"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Новий email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Новий пароль (не обов'язково)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleUpdate}>Зберегти зміни</button>
        {error && <p className="error">{error}</p>}

        <button onClick={handleLogout}>Вийти з аккаунту</button>
        <Link to="/home">Повернутись на головну</Link>
      </>
    </div>
  );
};

export default AccountPage;
