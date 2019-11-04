import React from "react";
import NavBar from "../../components/navBar";

import "./styles.css";

export default function Dish() {
  return (
    <div id="containerDish">
      <NavBar />
      <div id="alingDish">
        <div className="list">
          <label className="title">
            Selecione um item ou crie um
            <button>NOVO</button>
          </label>
          <form action="" id="select">
            <input type="text" placeholder="Busca por nome" />
            <button>SELECIONAR</button>
          </form>
        </div>
        <div className="list">
          <label className="title">Laboratório</label>
          <form action="" id="labDish">
            <fieldset>
              <legend>Nome</legend>
              <input type="text" placeholder="Nome" />
            </fieldset>
            <fieldset>
              <legend>Preço</legend>
              <input type="number" placeholder="Preço" />
            </fieldset>
            <fieldset>
              <legend>Ingredientes</legend>
              <input type="text" placeholder="Ingredients" />
              <button>+</button>
            </fieldset>

            <ul></ul>

            <button id="newDish">SALVAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}
