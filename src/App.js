import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import routes from "./routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Reacttt</h1>
            </header>
            {routes}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
