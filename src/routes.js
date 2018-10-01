import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Store from "./components/Store/Store";
import Cart from "./components/Cart/Cart";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/store" component={Store} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
