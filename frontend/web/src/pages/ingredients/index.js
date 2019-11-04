import React from "react";
import NavBar from "../../components/navBar";

import "./styles.css";

export default function Ingredients() {
  return (
    <div id="alingIngredients">
      <NavBar />
      <div id="containerIngredients">
        <div className="list sidenav">
          <label className="title">Lista de Ingredients</label>
        </div>
        <div className="list advert">
          <label className="title">Contem em: </label>
        </div>
        <div className="list footer ">
          <label className="title">Novo </label>
        </div>
      </div>
    </div>
  );
}
