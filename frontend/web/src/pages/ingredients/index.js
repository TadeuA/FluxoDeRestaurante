import React, { useEffect, useState, useMemo } from "react";
import NavBar from "../../components/navBar";
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
        {dishs &&
          dishs.map(dish => (
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
    await api.post(`/ingredients`, { name });
    loadIngredients();
    window.alert(`${name} adicionado a lista de ingredientes!`);
    setName("");
  }
  //atualizar lista de ingredientes
  async function loadIngredients() {
    // const user_id = localStorage("user")
    const response = await api.get("/ingredients");

    setIngredient(response.data);
  }
  useEffect(() => {
    loadIngredients();
  }, []);

  //apagar ingrediente
  async function handleDestroy(ingre) {
    const response = await api.get(`/foringredient/${ingre._id}`);
    const conflits = response.data;
    console.log(conflits);
    if (conflits) {
      const response = window.confirm(
        `A esclusão de ${ingre.name} irá alterar os seguintes pratos
      ${conflits.map(conflit => `${conflit.name} `)}
        deseja continuar?`
      );
      if (response) {
        conflits.map(async dish => {
          const { _id, name, price } = dish;
          let { ingredients } = dish;
          let ingredient = [];
          ingredients.map(ingred => {
            if (ingred !== ingre) {
              ingredient.push(ingred);
            }
          });
          ingredients = ingredient;
          await api.put(`/dish/${_id}`, {
            name,
            price,
            ingredients
          });
        });
        await api.delete(`/ingredients/${ingre._id}`);
        loadIngredients();
      }
    }
  }

  return (
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
  );
}
