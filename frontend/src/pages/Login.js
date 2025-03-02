import React from "react";
import "../styles/pages.scss";

const Login = () => {
  return (
    <div className="login">
      <h2>Вхід</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Пароль" required />
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;