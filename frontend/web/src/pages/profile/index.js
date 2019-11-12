import React, { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import HomeBar from "../../components/homeBar";

import "./styles.css";
import bgProfile from "../../assets/profile.jpg";
import imgConfig from "../../assets/button/config.svg";

export default function Profile({ history }) {
  const [user, setUser] = useState("");
  const [thumb, setThumb] = useState("");

  useEffect(() => {
    async function loadUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }

    loadUser();
  }, []);
  useMemo(() => {
    !user.thumbnail === "" ? setThumb(user.thumbnail) : setThumb(bgProfile);
  }, [thumb]);
  async function handleOpen() {
    const dishs = await api.get("/dish");
    const ingredients = await api.get("/ingredients");
    const tables = await api.get("/table");
    localStorage.setItem("dishs", JSON.stringify(dishs.data));
    localStorage.setItem("ingredients", JSON.stringify(ingredients.data));
    localStorage.setItem("tables", JSON.stringify(tables.data));
    history.push("/restaurant");
  }
  return (
    <>
      <HomeBar />
      <div id="containerProfile">
        <div id="panel">
          <div id="frist">
            <button className="open" onClick={handleOpen}>
              Entrar no restaurante
            </button>

            <header style={{ backgroundImage: `url(${thumb})` }} />
            <h1>{user.name}</h1>
            <Link to="/register">
              <img src={imgConfig} alt="edit profile" />
            </Link>
          </div>
          <div>
            <label>Restaurantes com Fidelização</label>
            <ul></ul>
          </div>
        </div>
      </div>
    </>
  );
}
