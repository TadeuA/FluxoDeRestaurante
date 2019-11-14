import React, { useState, useEffect } from "react";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";
import "./styles.css";

export default function Menu() {
  const [dishs, setDishs] = useState([]);
  const [classifications, setClassifications] = useState([]);
  useEffect(() => {
    setDishs(JSON.parse(localStorage.getItem("dishs")));
    setClassifications(JSON.parse(localStorage.getItem("classification")));
  }, []);
  return (
    <>
      <HomeBar />
      <div id="containerMenu">
        <NavBar />
        <ul>
          {classifications.map(item => {
            if(item.section === "dish"){
              return (
                <li key={item._id}>
                  <h2>{item.classification}</h2>
                  <ul>
                    {dishs.map(dish => {
                      if(dish.classification._id === item._id){
                        return (

                          <li key={dish._id} id="one">
                            <header className="title">
                              <strong>{dish.name}</strong>
                            </header>
                            {dish.ingredients &&
                            dish.ingredients.map(ingredient => (
                              <li key={ingredient._id}>
                                <span>{ingredient.name}</span>
                              </li>
                            ))}
                            <span>R$ {dish.price}</span>
                          </li>

                    )}})}
                  </ul>
                </li>
          )}})}
        </ul>


      </div>
    </>
  );
}
