import React, { useEffect, useState, useMemo } from "react";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";

import api from "../../services/api";
import "./styles.css";
import direction from "../../assets/button/direction.svg";
import destroy from "../../assets/button/destroy.svg";

export default function Ingredients() {
  const [ingredient, setIngredient] = useState([]);
  const [dishs, setDishs] = useState([]);
  const [name, setName] = useState("");

  //listar ingredientes
  const listIngredients = (
    <ul className="ingredient-list">
      {ingredient.map(ingre => (
        <li key={ingre._id}>
          <h5>{ingre.name}</h5>
          <button className="direction" onClick={() => handleDishs(ingre._id)}>
            <img src={direction} alt="direction" />
          </button>
          <button className="destroy" onClick={() => handleDestroy(ingre)}>
            <img src={destroy} alt="destroy" />
          </button>
        </li>
      ))}
    </ul>
  );

  //atualizar lista de contidos em
  const preview = useMemo(() => {
    return dishs ? (
      <ul className="ingredient-list">
        {dishs.map(dish => (
          <li key={dish._id}>
            <h5>{dish.name}</h5>
          </li>
        ))}
      </ul>
    ) : (
      <spam>Não pertence a nenhum prato</spam>
    );
  }, [dishs]);
  //atualizar a lista de pratos por ingredientes
  async function handleDishs(idIngre) {
    const response = await api.get(`/foringredient/${idIngre}`);
    setDishs(response.data);
  }

  //criar novo ingrediente
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post(`/ingredients`, { name });
    ingredient.push(response.data)
    setIngredient(ingredient);
    window.alert(`${name} adicionado a lista de ingredientes!`);
    setName("");
  }
  //atualizar lista de ingredientes
  function loadIngredients() {
    setIngredient(JSON.parse(localStorage.getItem("ingredients")));
  }
  useEffect(() => {
    loadIngredients();
  }, []);

  //apagar ingrediente
  async function handleDestroy(ingre) {
    const response = await api.get(`/foringredient/${ingre._id}`);
    const conflits = response.data;

    if (conflits) {
      const response = window.confirm(
        `A esclusão de ${ingre.name} irá alterar os seguintes pratos
      ${conflits.map(conflit => `${conflit.name} `)}
        deseja continuar?`
      );
      if (response) {
        const Dishs = JSON.parse(localStorage.getItem("dishs"));
        conflits.map(async dish => {
          const { _id, name, price } = dish;
          let { ingredients } = dish;
          let index = ingredients.indexOf(ingre);
          ingredients.splice(index, 1);

          const Dish = await api.put(`/dish/${_id}`, {
            name,
            price,
            ingredients
          });
          index = Dishs.indexOf(Dish);
          Dishs[index] = Dish;
        });
        await api.delete(`/ingredients/${ingre._id}`);
        const index = ingredient.indexOf(ingre);
        ingredient.splice(index, 1)
        localStorage.setItem(
          "ingredients",
          JSON.stringify(ingredient)
        );
        localStorage.setItem("dishs", JSON.stringify(Dishs));

        loadIngredients();
      }
    }
  }

  return (
    <>
      <HomeBar />
      <div id="alingIngredients">
        <NavBar />
        <div id="containerIngredients">
          <div className="list sidenav">
            <label className="title">Lista de Ingredients</label>
            {listIngredients}
          </div>
          <div className="list advert">
            <label className="title">Contem em: </label>
            <header>{preview}</header>
          </div>
          <div className="list footer ">
            <label className="title">Novo </label>
            <form onSubmit={handleSubmit}>
              <fieldset onSubmit={handleSubmit}>
                <legend>Ingrediente</legend>
                <input
                  type="text"
                  placeholder="Ingrediente"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </fieldset>
              <button type="submit">Adicionar Novo</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
