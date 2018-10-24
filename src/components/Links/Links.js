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
          <div>Pants</div>
        </Link>
        <Link to={"/category/shoes"}>
          <div>Shoes</div>
        </Link>
        <Link to={"/category/technology"}>
          <div>More</div>
        </Link>
        <Link to="/sale">
          <div>Sale</div>
        </Link>
      </div>
    </div>
  );
};

export default Links;
