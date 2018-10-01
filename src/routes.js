import React from "react";
import { Switch, Route } from "react-router-dom";
import Store from "./components/Store/Store";
import Cart from "./components/Cart/Cart";

export default (
  <Switch>
    <Route path="/store" component={Store} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
