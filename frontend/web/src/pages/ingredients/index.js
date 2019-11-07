import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import api from "../../services/api";
import "./styles.css";

export default function Ingredients() {
  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    async function loadIngredients() {
      // const user_id = localStorage("user")
      const response = await api.get("/ingredients");

      setIngredient(response.data);
    }
    loadIngredients();
  }, []);

  return (
    <div id="alingIngredients">
      <NavBar />
      <div id="containerIngredients">
        <div className="list sidenav">
          <label className="title">Lista de Ingredients</label>
          <ul className="ingredient-list">
            <li>
              <span>{ingredient.name}</span>
              <button>
                <img src="" alt="direction" />
              </button>
            </li>
          </ul>
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
