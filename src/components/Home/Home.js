import React, { Component } from "react";
import axios from "axios";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleEnter = () => {
    this.props.history.push("/store");
  };

  handleLogout = () => {
    axios.post("/api/logout");
  };

  render() {
    return (
      <div className="home_wrapper">
        <div className="home_textWrapper">
          <h3 id="home_whiteText">WELCOME TO</h3>
          <h3 id="home_goldText" className="home_laavish">
            Laavish
          </h3>
          <p id="home_whiteText" className="home_mainText">
            Men's Stop for Fashion & Technology
          </p>
          <div
            id="home_whiteText"
            className="home_enter"
            onClick={() => this.handleEnter()}
          >
            Enter
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
