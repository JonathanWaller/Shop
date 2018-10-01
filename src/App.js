import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import NavBar from "./components/NavBar/NavBar";
import routes from "./routes";

import "./Reset.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            {routes}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
