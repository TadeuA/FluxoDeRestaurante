import React, { useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar";
import "./styles.css";
import bgProfile from "../../assets/profile.jpg";
import imgConfig from "../../assets/button/config.svg";

export default function Profile() {
  const [user, setUser] = useState("");
  const [thumb, setThumb] = useState("");

  async function loadUser() {
    const user_id = localStorage.getItem("user");
    const response = await api.get(`/users/${user_id}`);
    setUser(response.data);
    loadThumbnail();
  }
  function loadThumbnail() {
    !user.thumbnail === "" ? setThumb(user.thumbnail) : setThumb(bgProfile);
  }

  loadUser();

  return (
    <div id="containerProfile">
      <NavBar />
      <div id="panel">
        <div id="frist">
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
  );
}
