import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <div className="nav_linksWrapper">
        <div id="nav_link">Home</div>
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
