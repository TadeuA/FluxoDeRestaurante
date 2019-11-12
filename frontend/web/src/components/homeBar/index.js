import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import bgProfile from "../../assets/profile.jpg";

export default function HomeBar() {
  const [thumb, setThumb] = useState("");
  const [user, setUser] = useState("");
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

  return (
    <div id="homeBar">
      <Link to="profile">
        <header style={{ backgroundImage: `url(${thumb})` }} />
      </Link>
    </div>
  );
}
