import React from "react";
import "../styles/pages.scss";

const Register = () => {
  return (
    <div className="register">
      <h2>Реєстрація</h2>
      <form>
        <input type="text" placeholder="Ім'я" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Пароль" required />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;