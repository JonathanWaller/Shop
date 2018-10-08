import React, { Component } from "react";
import axios from "axios";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleEnter = () => {
    // axios.get("/api/store").then(response => {
    //   console.log(response);
    // });
    // axios.post("/api/post").then(response => {
    //   console.log(response);
    // });
    this.props.history.push("/store");
  };

  handleLogout = () => {
    axios.post("/api/logout");
  };

  render() {
    // console.log(this.props);
    return (
      <div className="home_wrapper">
        <h3 id="home_whiteText">WELCOME TO</h3>
        <h3 id="home_goldText">SHOP</h3>
        <p id="home_whiteText">Men's Stop for Fashion and Technology</p>
        <button onClick={() => this.handleEnter()}>Enter</button>
        <button onClick={() => this.handleLogout()}>Logout</button>
      </div>
    );
  }
}

export default Home;
