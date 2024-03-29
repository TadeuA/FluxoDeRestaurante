import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Importar Pages
import Dish from "./pages/dish";
import Menu from "./pages/menu";
import Ingredients from "./pages/ingredients";
import Table from "./pages/table";
import Orders from "./pages/orders";
import Profile from "./pages/profile";
import Login from "./pages/login";
import SingIn from "./pages/singIn";
import Register from "./pages/register";
import Restaurant from "./pages/restaurant";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dish" component={Dish} />
        <Route path="/menu" component={Menu} />
        <Route path="/ingredients" component={Ingredients} />
        <Route path="/table" component={Table} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/singin" component={SingIn} />
        <Route path="/register" component={Register} />
        <Route path="/restaurant" component={Restaurant} />
      </Switch>
    </BrowserRouter>
  );
}
