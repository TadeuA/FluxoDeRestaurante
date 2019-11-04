import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Importar Pages
import Dish from "./pages/dish";
import Menu from "./pages/menu";
import Ingredients from "./pages/ingredients";
import Table from "./pages/table";
import Orders from "./pages/orders";
import Profile from "./pages/profile";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dish" component={Dish} />
        <Route path="/menu" component={Menu} />
        <Route path="/ingredients" component={Ingredients} />
        <Route path="/table" component={Table} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
