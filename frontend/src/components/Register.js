import { React, useState } from "react";
import { Link } from "react-router-dom";


function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>

      <Link className="auth__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </section>
    </>
  );
}

export default Register;
