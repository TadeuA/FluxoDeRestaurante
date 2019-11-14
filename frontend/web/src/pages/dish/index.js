import React, { useState, useEffect, useMemo } from "react";
import useForm from "react-hook-form";
import NavBar from "../../components/navBar";
import HomeBar from "../../components/homeBar";

import api from "../../services/api";

import "./styles.css";

export default function Dish() {
  const [dishs, setDishs] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [operation, setOperation] = useState("");
  const [classifications, setClassifications] = useState([]);

  const [dish, setDish] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    const { name, price, classification } = data;
    delete data.name;
    delete data.price;
    delete data.classification

    for (let prop in data) {
      if (data[prop] === false) {
        delete data[prop];
      }
    }
    const arr = Object.values(data);

   const response = await api.post("/dish", {
      name,
      price,
      ingredients: arr,
      classification
    });

    dishs.push(response.data)
    localStorage.setItem("dishs",JSON.stringify(dishs))
    setDishs(JSON.parse(localStorage.getItem("dishs")))
  };

  const preview = useMemo(() => {
    return operation === "1" ? (
      <select onChange={event => setDish(event.target.value)}>
        <option value="">Escolha um prato</option>
        {dishs.map(item => (
          <option key={item._id} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
    ) : (
      <span />
    );
  }, [operation]);
  useEffect(() => {
    setDishs(JSON.parse(localStorage.getItem("dishs")));
    setIngredients(JSON.parse(localStorage.getItem("ingredients")));
    setClassifications(JSON.parse(localStorage.getItem("classification")))
    setOperation("0");
  }, []);

  return (
    <>
      <HomeBar />
      <div id="containerDish">
        <NavBar />
        <section>
          <div className="frist">
            <span>NOVO</span>

            <input
              className="range"
              type="range"
              id="range"
              max="1"
              min="0"
              value={operation}
              onChange={event => setOperation(event.target.value)}
            />
            <span>EDITAR</span>
            {preview}
          </div>
          <div className="second">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <legend>Nome</legend>
                <input
                  type="text"
                  placeholder="Nome"
                  name="name"
                  ref={register({ required: true })}
                />
              </fieldset>
              <fieldset>
                <legend>Preço</legend>
                <input
                  type="number"
                  placeholder="Preço"
                  name="price"
                  ref={register({ required: true, min: 0 })}
                />
              </fieldset>
              <fieldset>
                <legend>Classificação</legend>
                <select name="classification" ref={register({ required: true})}>
                  <option value=""></option>
                  {classifications.map(item => {
                    if(item.section === "dish"){
                      return(
                        <option key={item._id}value={item._id}>{item.classification}</option>
                      )
                    }
                  })}
                </select>
              </fieldset>
              <fieldset>
                <legend>ingredientes</legend>
                <div id="listIngredient">
                  {ingredients.map(ingre => (
                    <section  key={ingre._id}>
                      <input

                        type="checkbox"
                        placeholder={ingre._id}
                        name={ingre._id}
                        value={ingre._id}
                        ref={register}
                      />

                      <label htmlFor={ingre._id}>{ingre.name}</label>
                    </section>
                  ))}
                </div>
              </fieldset>
              <input type="submit" />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
