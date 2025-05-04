import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.scss";

const AccountPage = () => {
  //const [profile, setProfile] = useState({ email: "", username: "" });
  //const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      //setProfile(data);
      setNewEmail(data.email);
      setNewName(data.username);
    };
    fetchProfile();
  }, []);

  //const handleVerifyPassword = () => {
  //  setIsVerified(true); 
  //  setError("");
 // };

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
      alert("Дані оновлені!");
      navigate("/home");
    } else {
      setError("Помилка при оновленні профілю");
    }
  };

  return (
    <div className="account-page">
        <>
          <p>Зміни дані:</p>
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
        </>
      
    </div>
  );
};

export default AccountPage;
