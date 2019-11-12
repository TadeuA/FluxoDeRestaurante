import React, { useState, useEffect } from "react";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";
import "./styles.css";

export default function Menu() {
  const [dishs, setDishs] = useState([]);
  useEffect(() => {
    setDishs(JSON.parse(localStorage.getItem("dishs")));
  }, []);
  return (
    <>
      <HomeBar />
      <div id="containerMenu">
        <NavBar />
        <ul>
          {dishs.map(dish => (
            <li key={dish._id} id="one">
              <header className="title">
                <strong>{dish.name}</strong>
              </header>

              <ul>
                {dish.ingredients &&
                  dish.ingredients.map(ingredient => (
                    <li key={ingredient._id}>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
              </ul>
              <span>R$ {dish.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
