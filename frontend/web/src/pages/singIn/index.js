import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function SingIn({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/users", {
      email,
      password,
      confirm
    });
    response.data.hasOwnProperty("badComparison")
      ? window.alert("As senhas não são idênticas!")
      : response.data.hasOwnProperty("badEmail")
      ? window.alert("Esse email possui cadastro!")
      : handleRegister(response.data);
  }

  function handleRegister(newUser) {
    const { _id } = newUser;
    localStorage.setItem("user", _id);
    history.push("/register");
  }

  return (
    <div id="containerSingIn">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Email</legend>
          <input
            type="email"
            placeholder="Seu melhor email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>Senha</legend>
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>Confirmar</legend>
          <input
            type="password"
            placeholder="Confirmar senha"
            required
            value={confirm}
            onChange={event => setConfirm(event.target.value)}
          />
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
