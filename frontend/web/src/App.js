import React from "react";
import "./App.css";

import menu from "./assets/button/menu.svg";
import ingredients from "./assets/button/ingredients.svg";
import order from "./assets/button/order.svg";
import dish from "./assets/button/dish.svg";

const App = () => (
  <div className="App">
    <div id="navBar">
      <button id="profile" className="btn"></button>
      <button className="btn">
        <img src={order} alt="menu" />
      </button>
      <button className="btn">
        <img src={menu} alt="menu" />
      </button>
      <button className="btn">
        <img src={dish} alt="menu" />
      </button>
      <button className="btn">
        <img src={ingredients} alt="menu" />
      </button>
    </div>
  </div>
);

export default App;
