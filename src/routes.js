import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Store from "./components/Store/Store";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import Confirmation from "./components/Confirmation/Confirmation";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/store" component={Store} />
    <Route path="/cart" component={Cart} />
    <Route path="/product/:id" component={Product} />
    <Route path="/confirmation" component={Confirmation} />
    <Route
      path="*"
      render={() => (
        <img src="https://cdn.dribbble.com/users/26599/screenshots/2849884/404.gif" />
      )}
    />
  </Switch>
);
