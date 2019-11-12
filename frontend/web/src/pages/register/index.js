import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function Register({ history }) {
  const user_id = localStorage.getItem("user");

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [phName, setPhName] = useState("");
  const [phDoc, setPhDoc] = useState("");

  async function loadRegister() {
    const response = api.get(`/user/${user_id}`);
    !response.data.name === null || !response.data.name === undefined
      ? setPhName(response.data.name)
      : setPhName("Seu Nome");

    !response.data.document === null || !response.data.document === undefined
      ? setPhDoc(response.data.document)
      : setPhDoc("000.000.000-00");
  }
  loadRegister();
  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.put(
      `/users/${user_id}`,
      {
        name,
        document,
        thumbnail: ""
      },
      { headers: { classification: "single" } }
    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

    history.push("/profile");
  }

  return (
    <div id="containerSingIn">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>nome</legend>
          <input
            type="text"
            placeholder={phName}
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>Documento</legend>
          <input
            type="text"
            placeholder={phDoc}
            required
            value={document}
            onChange={event => setDocument(event.target.value)}
          />
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
