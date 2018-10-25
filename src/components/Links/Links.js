import React from "react";
import { Link } from "react-router-dom";
import "./Links.css";

const Links = () => {
  return (
    <div className="store__linksWrapper">
      <div className="store__links">
        <Link to={"/category/shirt"}>
          <div id="store__link">Shirts</div>
        </Link>
        <Link to={"/category/pants"}>
          <div id="store__link">Pants</div>
        </Link>
        <Link to={"/category/shoes"}>
          <div id="store__link">Shoes</div>
        </Link>
        <Link to={"/category/technology"}>
          <div id="store__link">More</div>
        </Link>
        <Link to="/sale">
          <div id="links__sale">Sale</div>
        </Link>
      </div>
    </div>
  );
};

export default Links;
