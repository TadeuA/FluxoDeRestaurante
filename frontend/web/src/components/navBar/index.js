import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

//importar imagens dos botões
import menu from "../../assets/button/menu.svg";
import ingredients from "../../assets/button/ingredients.svg";
import order from "../../assets/button/order.svg";
import dish from "../../assets/button/dish.svg";
import table from "../../assets/button/table.svg";
import store from "../../assets/button/store.svg";

export default function navBar() {
  return (
    <>
    <div id="space"></div>
    <div id="navBar">
      <Link to="/restaurant">
        <button id="restaurant" className="btn">
          <img src={store} alt="order" />
        </button>
      </Link>
      <Link to="/orders">
        <button id="order" className="btn">
          <img src={order} alt="order" />
        </button>
      </Link>
      <Link to="/menu">
        <button id="menu" className="btn">
          <img src={menu} alt="menu" />
        </button>
      </Link>
      <Link to="/dish">
        <button id="dish" className="btn">
          <img src={dish} alt="dish" />
        </button>
      </Link>
      <Link to="ingredients">
        <button id="ingredients" className="btn">
          <img src={ingredients} alt="ingredients" />
        </button>
      </Link>
      <Link to="/table">
        <button id="table" className="btn">
          <img src={table} alt="table" />
        </button>
      </Link>
    </div>
    </>
  );
}
