import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/usersnp", {
      email,
      password
    });

    response.data.hasOwnProperty("badEmail")
      ? window.alert("Email não cadastrado")
      : response.data.hasOwnProperty("badPassword")
      ? window.alert("Senha incorreta")
      : handleLogin(response.data);
  }

  function handleLogin(logUser) {
    localStorage.setItem("user", JSON.stringify(logUser));
    history.push("/profile");
  }
  return (
    <div id="containerLogin">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <input
            type="text"
            placeholder="Seu  email"
            required
            onChange={event => setEmail(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>Senha</legend>
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={event => setPassword(event.target.value)}
          />
        </fieldset>
        <button className="btn" type="submit">
          ENTRAR
        </button>
      </form>
      <Link id="goToSingIn" to="/singin">
        <button className="btn">Cadatrar</button>
      </Link>
    </div>
  );
}
