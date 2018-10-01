import React from "react";
import { Switch, Route } from "react-router-dom";
import Store from "./components/Store/Store";

export default (
  <Switch>
    <Route path="/store" component={Store} />
  </Switch>
);
