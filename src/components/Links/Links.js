import React from "react";
import { Link } from "react-router-dom";
import "./Links.css";

const Links = () => {
  return (
    <div className="store__linksWrapper">
      <div className="store__links">
        <Link to={"/category/shirt"}>
          <div id="store__link" className="links__underline">
            Shirts
          </div>
        </Link>
        <Link to={"/category/pants"}>
          <div id="store__link" className="links__underline">
            Pants
          </div>
        </Link>
        <Link to={"/category/shoes"}>
          <div id="store__link" className="links__underline">
            Shoes
          </div>
        </Link>
        <Link to={"/category/technology"}>
          <div id="store__link" className="links__underline">
            More
          </div>
        </Link>
        <Link to="/sale">
          <div id="links__sale" className="links__underline">
            Sale
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Links;
