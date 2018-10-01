import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav_wrapper">
      <div className="nav_linksWrapper">
        <Link to="/">
          <div id="nav_link">Home</div>
        </Link>
        <Link to="/store">
          <div id="nav_link">Shop</div>
        </Link>
        <Link to="/cart">
          <div id="nav_link">Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
